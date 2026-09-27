'use strict';

const http = require('http');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 8787);
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 6;
const SESSION_TTL_MS = 6 * 60 * 60 * 1000;
const sessions = new Map();

const SCORING_RULES={
  quiz:{base:100,maxSpeedBonus:50,maxRankBonus:30,windowMs:30000},
  fastest:{rankPoints:[100,75,50,25],defaultPoints:10},
  restaurant:{correctPoints:100,incorrectPoints:0}
};
function clamp(n,min,max){return Math.min(max,Math.max(min,n));}
function calculateRoundPoints(activity, input){
  const mode=String(activity||'').toLowerCase();
  if(mode==='quiz'){
    if(input.correct!==true) return {points:0,breakdown:{correct:0,speed:0,rank:0}};
    const elapsed=Number(input.elapsedMs);
    const windowMs=SCORING_RULES.quiz.windowMs;
    const speed=Number.isFinite(elapsed) ? Math.round(SCORING_RULES.quiz.maxSpeedBonus*clamp(1-(elapsed/windowMs),0,1)) : 0;
    const rank=Number.isFinite(Number(input.rank)) && Number(input.rank)>0 ? Math.max(0,SCORING_RULES.quiz.maxRankBonus-Math.max(0,Number(input.rank)-1)*10) : 0;
    return {points:SCORING_RULES.quiz.base+speed+rank,breakdown:{correct:SCORING_RULES.quiz.base,speed,rank}};
  }
  if(mode==='fastest'){
    const rank=Math.max(1,Number(input.rank)||1);
    const points=SCORING_RULES.fastest.rankPoints[rank-1] ?? SCORING_RULES.fastest.defaultPoints;
    return {points,breakdown:{rank,rankPoints:points}};
  }
  if(mode==='restaurant'){
    return {points:input.correct===true?SCORING_RULES.restaurant.correctPoints:SCORING_RULES.restaurant.incorrectPoints,breakdown:{correct:input.correct===true}};
  }
  return {points:0,breakdown:{}};
}
function leaderboardFor(s){
  return [...s.scores.entries()].map(([participantId,score])=>({participantId,name:s.participants.get(participantId)?.name||'Participant',score:Number(score)||0})).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
}

function randomCode(){
  while(true){
    const bytes = crypto.randomBytes(CODE_LENGTH);
    let code = '';
    for(const b of bytes) code += CODE_ALPHABET[b % CODE_ALPHABET.length];
    if(!sessions.has(code)) return code;
  }
}
function id(){ return crypto.randomUUID(); }
function json(res,status,payload){
  const body = JSON.stringify(payload);
  res.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*','access-control-allow-headers':'content-type, x-session-token, x-participant-token','access-control-allow-methods':'GET,POST,OPTIONS'});
  res.end(body);
}
function publicSession(s){
  return {sessionId:s.sessionId,code:s.code,activity:s.activity,status:s.status,createdAt:s.createdAt};
}
function readBody(req){
  return new Promise((resolve,reject)=>{
    let data='';
    req.on('data',chunk=>{ data+=chunk; if(data.length>1e6) req.destroy(); });
    req.on('end',()=>{ try{ resolve(data?JSON.parse(data):{}); }catch(e){ reject(e); } });
    req.on('error',reject);
  });
}
function auth(req,s){ return req.headers['x-session-token'] === s.teacherToken; }
function broadcast(s,event,payload){
  const message=`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  for(const client of s.clients){ try{ client.write(message); }catch{} }
}
function broadcastRole(s,event,payload,role){
  const message=`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  for(const client of s.clients){
    try{
      if(client._halloweenRole===role) client.write(message);
    }catch{}
  }
}
function stateSnapshot(s){
  return {session:publicSession(s),activityState:s.activityState,participantCount:s.participants.size,answers:[...s.answers.values()].map(a=>({...a})),scores:Object.fromEntries(s.scores),leaderboard:leaderboardFor(s)};
}
function requireTeacher(req,s){ return auth(req,s); }
function requireParticipant(req,s,participantId){ const p=s.participants.get(participantId); const token=String(req.headers['x-participant-token']||''); return p && token===p.participantToken ? p : null; }
function clearActivityTimer(s){ if(s.activityTimer){ clearTimeout(s.activityTimer); s.activityTimer=null; } }
function scheduleActivityTimer(s){
  clearActivityTimer(s);
  if(!['quiz','fastest'].includes(s.activity)) return;
  const timerPhase=s.activity==='quiz'?'question':'round';
  if(s.activityState.phase!==timerPhase || !Number.isFinite(s.activityState.endsAt)) return;
  const delay=Math.max(0,s.activityState.endsAt-Date.now());
  s.activityTimer=setTimeout(()=>{
    const expectedPhase=s.activity==='quiz'?'question':'round';
    if(s.status!=='active' || s.activityState.phase!==expectedPhase) return;
    s.activityState={...s.activityState,phase:'results',endsAt:null,revealed:true};
    broadcast(s,'activity-state',s.activityState);
    s.activityTimer=null;
  },delay);
}
function closeSession(s){
  if(s.status==='ended') return;
  clearActivityTimer(s);
  s.status='ended';
  broadcast(s,'session-ended',publicSession(s));
  for(const client of s.clients){ try{ client.end(); }catch{} }
  s.clients.clear();
}
function cleanup(){
  const now=Date.now();
  for(const [code,s] of sessions){
    if(now-s.createdAt>SESSION_TTL_MS) { closeSession(s); sessions.delete(code); }
  }
}
setInterval(cleanup, 60_000).unref();

const server=http.createServer(async (req,res)=>{
  if(req.method==='OPTIONS') return json(res,204,{});
  const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
  const path=url.pathname;
  try{
    if(req.method==='GET' && path==='/health') return json(res,200,{ok:true,service:'halloween-classroom-realtime'});

    if(req.method==='POST' && path==='/api/sessions'){
      const body=await readBody(req);
      const activity=String(body.activity||'quiz');
      const s={sessionId:id(),code:randomCode(),activity,status:'active',createdAt:Date.now(),teacherToken:crypto.randomBytes(32).toString('hex'),participants:new Map(),clients:new Set(),answers:new Map(),scores:new Map(),scoreEvents:[],activityState:{phase:'waiting',questionIndex:0,startedAt:null,endsAt:null,revealed:false},activityTimer:null};
      sessions.set(s.code,s);
      return json(res,201,{session:publicSession(s),teacherToken:s.teacherToken});
    }

    const match=path.match(/^\/api\/sessions\/([A-Z0-9]{6})$/);
    if(req.method==='POST' && match){
      const code=match[1]; const s=sessions.get(code);
      if(!s || s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      const body=await readBody(req);
      const role=body.role==='teacher'?'teacher':'student';
      if(role==='teacher'){
        if(!auth(req,s)) return json(res,403,{error:'INVALID_TEACHER_TOKEN'});
        return json(res,200,{session:publicSession(s)});
      }
      const name=String(body.name||'').trim().slice(0,40);
      if(!name) return json(res,400,{error:'NAME_REQUIRED'});
      const participantId=id();
      const participantToken=crypto.randomBytes(32).toString('hex');
      s.participants.set(participantId,{id:participantId,name,participantToken,joinedAt:Date.now(),lastSeen:Date.now()});
      broadcast(s,'participant-joined',{participantId,name,joinedAt:s.participants.get(participantId).joinedAt});
      return json(res,201,{participantId,participantToken,session:publicSession(s)});
    }

    const stateMatch=path.match(/^\/api\/sessions\/([A-Z0-9]{6})\/state$/);
    if(req.method==='GET' && stateMatch){
      const s=sessions.get(stateMatch[1]); if(!s||s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      const token=String(url.searchParams.get('token')||''); const participantId=String(url.searchParams.get('participantId')||'');
      if(token===s.teacherToken) return json(res,200,stateSnapshot(s));
      if(requireParticipant({headers:{'x-participant-token':token}},s,participantId)) {
        return json(res,200,{session:publicSession(s),activityState:s.activityState,participantCount:s.participants.size});
      }
      return json(res,403,{error:'INVALID_STATE_TOKEN'});
    }
    if(req.method==='POST' && stateMatch){
      const s=sessions.get(stateMatch[1]); if(!s||s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      if(!requireTeacher(req,s)) return json(res,403,{error:'INVALID_TEACHER_TOKEN'});
      const body=await readBody(req);
      const incoming=body.activityState||{};
      const next={...s.activityState,...incoming};
      next.activity=s.activity;
      if(['quiz','fastest'].includes(s.activity) && next.phase===(s.activity==='quiz'?'question':'round')){
        const now=Date.now();
        const requestedEnds=Number(next.endsAt);
        const minimumEnds=now+30000;
        next.startedAt=Number(next.startedAt)||now;
        next.endsAt=Number.isFinite(requestedEnds) ? Math.max(requestedEnds,minimumEnds) : minimumEnds;
        next.revealed=false;
      }
      if(next.phase==='results' || next.revealed===true) next.endsAt=null;
      s.activityState=next;
      scheduleActivityTimer(s);
      broadcast(s,'activity-state',s.activityState); return json(res,200,stateSnapshot(s));
    }
    const answerMatch=path.match(/^\/api\/sessions\/([A-Z0-9]{6})\/answers$/);
    if(req.method==='POST' && answerMatch){
      const s=sessions.get(answerMatch[1]); if(!s||s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      const body=await readBody(req); const participantId=String(body.participantId||''); const p=requireParticipant(req,s,participantId);
      if(!p) return json(res,403,{error:'INVALID_PARTICIPANT_TOKEN'});
      const key=`${participantId}:${String(body.questionId||s.activityState.questionIndex)}`;
      if(s.answers.has(key)) return json(res,409,{error:'ANSWER_ALREADY_SUBMITTED'});
      const answer={answerId:id(),participantId,name:p.name,questionId:String(body.questionId??s.activityState.questionIndex),answer:body.answer,submittedAt:Date.now(),elapsedMs:Number(body.elapsedMs)||null};
      s.answers.set(key,answer); broadcastRole(s,'answer-submitted',answer,'teacher'); return json(res,201,{answerId:answer.answerId});
    }
    const scoreMatch=path.match(/^\/api\/sessions\/([A-Z0-9]{6})\/scores$/);
    if(req.method==='POST' && scoreMatch){
      const s=sessions.get(scoreMatch[1]); if(!s||s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      if(!requireTeacher(req,s)) return json(res,403,{error:'INVALID_TEACHER_TOKEN'});
      const body=await readBody(req); const participantId=String(body.participantId||''); if(!s.participants.has(participantId)) return json(res,404,{error:'PARTICIPANT_NOT_FOUND'});
      const activity=String(body.activity||s.activity).toLowerCase();
      let points,breakdown;
      if(body.manual===true){ points=clamp(Number(body.score)||0,0,1000); breakdown={manual:true}; }
      else { const result=calculateRoundPoints(activity,body); points=result.points; breakdown=result.breakdown; }
      const previous=Number(s.scores.get(participantId)||0); const total=previous+points; s.scores.set(participantId,total);
      const scoreEvent={participantId,activity,points,total,breakdown,questionId:body.questionId??null,recordedAt:Date.now()};
      if(!s.scoreEvents) s.scoreEvents=[]; s.scoreEvents.push(scoreEvent);
      const leaderboard=leaderboardFor(s); broadcastRole(s,'score-update',{...scoreEvent,leaderboard},'teacher'); return json(res,200,{scoreEvent,leaderboard});
    }
    const streamMatch=path.match(/^\/api\/sessions\/([A-Z0-9]{6})\/stream$/);
    if(req.method==='GET' && streamMatch){
      const code=streamMatch[1]; const s=sessions.get(code);
      if(!s || s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      const token=String(url.searchParams.get('token')||'');
      const participantId=String(url.searchParams.get('participantId')||'');
      const authorisedTeacher=token && token===s.teacherToken;
      const participant=participantId ? s.participants.get(participantId) : null;
      const authorisedStudent=participant && token===participant.participantToken;
      if(!authorisedTeacher && !authorisedStudent) return json(res,403,{error:'INVALID_STREAM_TOKEN'});
      res.writeHead(200,{'content-type':'text/event-stream; charset=utf-8','cache-control':'no-cache, no-transform','connection':'keep-alive','access-control-allow-origin':'*'});
      res._halloweenRole=authorisedTeacher?'teacher':'student';
      res.write(`event: connected\ndata: ${JSON.stringify({...publicSession(s),participantCount:s.participants.size})}\n\n`);
      res.write(`event: activity-state\ndata: ${JSON.stringify(s.activityState)}\n\n`);
      if(authorisedTeacher){
        res.write(`event: participant-snapshot\ndata: ${JSON.stringify({participantCount:s.participants.size,participants:[...s.participants.values()].map(p=>({participantId:p.id,name:p.name,joinedAt:p.joinedAt,lastSeen:p.lastSeen}))})}\n\n`);
        res.write(`event: score-snapshot\ndata: ${JSON.stringify({leaderboard:leaderboardFor(s)})}\n\n`);
      }
      s.clients.add(res);
      const keepAlive=setInterval(()=>{ try{res.write(': keep-alive\\n\\n');}catch{} },25000);
      req.on('close',()=>{clearInterval(keepAlive);s.clients.delete(res);});
      return;
    }

    const participantMatch=path.match(/^\/api\/sessions\/([A-Z0-9]{6})\/participants\/([^/]+)\/heartbeat$/);
    if(req.method==='POST' && participantMatch){
      const s=sessions.get(participantMatch[1]);
      if(!s || s.status!=='active') return json(res,404,{error:'SESSION_NOT_FOUND'});
      const p=s.participants.get(participantMatch[2]);
      if(!p) return json(res,404,{error:'PARTICIPANT_NOT_FOUND'});
      const token=String(req.headers['x-participant-token']||'');
      if(token!==p.participantToken) return json(res,403,{error:'INVALID_PARTICIPANT_TOKEN'});
      p.lastSeen=Date.now();
      return json(res,200,{ok:true,lastSeen:p.lastSeen});
    }

    const endMatch=path.match(/^\/api\/sessions\/([A-Z0-9]{6})\/end$/);
    if(req.method==='POST' && endMatch){
      const s=sessions.get(endMatch[1]);
      if(!s) return json(res,404,{error:'SESSION_NOT_FOUND'});
      if(!auth(req,s)) return json(res,403,{error:'INVALID_TEACHER_TOKEN'});
      closeSession(s); sessions.delete(s.code);
      return json(res,200,{ok:true,session:publicSession(s)});
    }

    return json(res,404,{error:'NOT_FOUND'});
  }catch(err){
    return json(res,500,{error:'SERVER_ERROR'});
  }
});

server.listen(PORT,()=>console.log(`Halloween realtime server listening on port ${PORT}`));
