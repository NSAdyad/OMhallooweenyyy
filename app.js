/* Halloween Interactive World — presentation-first flat GitHub build
   All files live at repository root. No nested asset directories are required.
   This front end contains the classroom UI. The realtime backend is built; public deployment and physical-device verification remain pending.
*/
const state={view:'home',history:0,vocab:0,restaurant:0,quiz:0,quizSelected:null,quizRevealed:false,quizOrders:[],fastest:0,fastSession:null,fastRoundActive:false,fastRoundStartedAt:0,fastResponses:[],fastCurrentCorrect:null,fastStudentName:'',restaurantReveal:false,game:0,gameSelected:[],gameRevealed:false,gameOrders:[],gameSession:null,gameScore:0,gameSubmitted:false,experience:0,scenario:0,team:{name:'',members:2,names:[],roles:[],responsibilities:[],scenario:0,saved:false,editing:false},teams:[],teamEditIndex:-1,assessments:{},assessmentTeamIndex:0,scores:Array(10).fill(0),session:null,presentation:false,projector:false,quizStarted:false,quizTime:30,buildStep:0,roleplayStep:0,roleplayStarted:false,teacherActivity:'quiz',teacherSessionActive:false,teacherSessionStartedAt:0,studentJoined:false,studentCode:'',studentName:'',studentLocalPreview:false,studentQuizSelected:null,studentQuizSubmitted:false,realtimeBackend:false,realtimeParticipantCount:0,realtimeAnswers:[],realtimeScores:{},realtimeLeaderboard:[],realtimeQuizEndsAt:null,realtimeFastEndsAt:null,fastRoundTime:30};

const historySlides=[
['Samhain','001_samhain.jpg'],['Christianity and All Saints’ Day','002_christianity-and-all-saints-day.jpg'],['Halloween – The Name','003_halloween-the-name.jpg'],['Legend of Jack-o’-Lanterns','004_legend-of-jack-o-lanterns.jpg'],['Pumpkins','005_pumpkins.jpg'],['Halloween Celebrations','006_halloween-celebrations.jpg'],['Trick or Treating','007_trick-or-treating.jpg'],['Halloween Events','008_halloween-events.jpg'],['Pumpkin Records','009_pumpkin-records.jpg'],['2010 World Record Pumpkin Pie','010_2010-world-record-pumpkin-pie.jpg'],['Most Lit Pumpkins','011_most-lit-pumpkins.jpg'],['Fastest Pumpkin Carver','012_fastest-pumpkin-carver.jpg']];

const vocab=[
['Pumpkin','013_pumpkin.jpg'],['Jack-o’-lantern','014_jack-o-lantern.jpg'],['Candle','015_candle.jpg'],['Lantern','016_lantern.jpg'],['Broomstick','017_broomstick.jpg'],['Cauldron','018_cauldron.jpg'],['Magic wand','019_magic-wand.jpg'],['Potion','020_potion.jpg'],['Tombstone','021_tombstone.jpg'],['Coffin','022_coffin.jpg'],['Haunted house','023_haunted-house.jpg'],['Ghost','024_ghost.jpg'],['Witch','025_witch.jpg'],['Vampire','026_vampire.jpg'],['Zombie','027_zombie.jpg'],['Skeleton','028_skeleton.jpg'],['Mummy','029_mummy.jpg'],['Frankenstein Monster','030_frankenstein-monster.jpg'],['Devil','031_devil.jpg'],['Demon','032_demon.jpg'],['Bat','033_bat.jpg'],['Spider','034_spider.jpg'],['Spider web','035_vocab-24-spider-web.jpg'],['Owl','036_owl.jpg'],['Raven','037_raven.jpg'],['Rat','038_rat.jpg'],['Wolf','039_wolf.jpg'],['Full moon','040_full-moon.jpg'],['Shadow','041_shadow.jpg'],['Bonfire','042_bonfire.jpg'],['Scarecrow','043_scarecrow.jpg'],['Skull','044_skull.jpg'],['Bones','045_bones.jpg'],['Witch hat','046_witch-hat.jpg'],['Mask','047_mask.jpg'],['Cape','048_cape.jpg'],['Fangs','049_fangs.jpg'],['Horns','050_horns.jpg'],['Claws','051_claws.jpg'],['Wings','052_wings.jpg'],['Tail','053_tail.jpg'],['Costume','054_costume.jpg'],['Caramel apple','055_caramel-apple.jpg'],['Candy corn','056_candy-corn.jpg'],['Sweets','057_sweets.jpg'],['Chocolate','058_chocolate.jpg'],['Lollipop','059_lollipop.jpg'],['Jelly beans','060_jelly-beans.jpg'],['Marshmallows','061_marshmallows.jpg'],['Brownie','062_brownie.jpg'],['Cake','063_cake.jpg'],['Popcorn','064_popcorn.jpg'],['Maze','065_maze-halloween.jpg']
];

/* Restaurant mapping: all 54 required terms have mapped project assets.
   Semantic asset review remains a deployment/content-quality check; filenames alone are not treated as proof of visual correctness. */
const restaurant=[
['Waiter','066_waiter.jpg'],['Waitress','067_waitress.jpg'],['Chef','068_chef.webp'],['Customer','069_waiter-service.jpg'],['Restaurant','070_restaurant.jpg'],['Kitchen','071_kitchen.webp'],['Bar','072_bar.jpg'],['Dining room','073_dining-room.webp'],['Menu','074_menu.webp'],['Plate','075_plate.webp'],['Soup','076_pumpkin-soup.jpg'],['Glass','077_glass.webp'],['Knife','078_knife.jpg'],['Fork','079_fork.webp'],['Spoon','080_spoon.jpg'],['Cutlery','081_cutlery.webp'],['Cow','082_cow.jpg'],['Beef','083_beef.webp'],['Steak','084_beef-steak.jpg'],['Fillet','085_img-0070.jpg'],['Pig','086_pig.jpg'],['Pork','087_pork.webp'],['Sheep','088_sheep.webp'],['Mutton','089_mutton.webp'],['Lamb','090_lamb-animal.webp'],['Lamb meat','091_roast-lamb.jpg'],['Calf','092_calf.jpg'],['Veal','093_img-0094.jpg'],['Chicken','094_chicken.jpg'],['Turkey','095_roast-turkey.jpg'],['Duck','096_duck.jpg'],['Raw','085_img-0070.jpg'],['Grilled','097_grilled.jpg'],['Fried','098_fried-food.jpg'],['Baked','099_baked.webp'],['Roasted','100_roasted.jpg'],['Boiled','101_boiled.jpg'],['Steamed','102_steamed-dumplings.jpg'],['Spicy','103_spicy.jpg'],['Sweet','104_sweet.webp'],['Salty','105_salty.jpg'],['Vegetarian','106_vegan-salad.jpg'],['Vegan','107_vegan-salad.jpg'],['Gluten-free','108_gluten-free.webp'],['Fish','109_fish.jpg'],['Salmon','110_salmon.jpg'],['Prawns','111_prawns.webp'],['Mussels','112_mussels.jpg'],['Squid','113_squid.jpg'],['Octopus','114_octopus.webp'],['Lobster','115_lobster.webp'],['Crab','116_crab.webp'],['Sauce','117_sauce.jpg'],['Side dish','118_side-dish.webp']
];

const quiz=[
['What was Samhain?',['A medieval Halloween game','An ancient Celtic festival','A pumpkin competition','A Christian feast'],1],
['Historically, what does “Halloween” mean?',['The evening before All Saints’ Day','The first day of winter','The pumpkin harvest','A Roman holiday'],0],
['Before pumpkins became common, what was traditionally carved into lanterns?',['Apples','Turnips','Potatoes','Corn'],1],
['Which vegetable became strongly associated with modern Halloween?',['Pumpkin','Carrot','Cucumber','Onion'],0],
['What happens in trick-or-treating?',['Children visit homes for treats','People light candles in churches','People carve wooden masks','People watch fireworks'],0],
['Which celebration is connected with 1 November?',['All Saints’ Day','Samhain Eve','Pumpkin Day','Harvest Night'],0],
['Halloween is traditionally celebrated on which date?',['30 October','31 October','1 November','2 November'],1],
['Which activity appears in the History presentation?',['Pumpkin carving','Ice skating','Beach racing','Snowboarding'],0],
['What do pumpkin records measure?',['Different pumpkin achievements','Weather forecasts','School grades','Restaurant prices'],0],
['What was the 2010 record connected with?',['A giant pumpkin pie','A haunted castle','A costume parade','A candle display'],0],
['Which record involved illuminated pumpkins?',['Most lit pumpkins','Fastest pumpkin meal','Largest costume','Longest parade'],0],
['Which skill appears on the final History slide?',['Fastest pumpkin carving','Fastest candy eating','Fastest costume sewing','Fastest ghost drawing'],0],
['What helped Halloween become a major community celebration?',['Community celebrations','Winter sports','Spring festivals','Summer fairs'],0],
['Which is a classic Halloween symbol?',['A pumpkin','A sunflower','A snowflake','A seashell'],0],
['Which tradition involves children visiting homes?',['Trick-or-treating','Caroling at Easter','Maypole dancing','Bonfire racing'],0]
];

const situations=[
['Taking an order','You are the waiter. The customer says: “I’d like the grilled salmon, please.” Which responses are appropriate?',['Certainly. Would you like anything to drink?','Of course. I’ll put that on your order.','What colour is your table?','Would you like to hear today’s dessert options?'],[0,1,3]],
['Dietary request','A customer says: “I am vegan.” Which dishes or statements are appropriate?',['A salad made without animal products','A dish containing beef','A vegetable dish prepared without meat, fish, eggs or dairy','A sauce made with butter'],[0,2]],
['Gluten-free request','A customer needs a gluten-free meal. Which responses are appropriate?',['Ask the kitchen which dishes are gluten-free','Offer a dish only if its ingredients are suitable','Tell the customer that every dish is automatically gluten-free','Check the sauce and other ingredients too'],[0,1,3]],
['Cooking method','A customer orders a steak and asks for it to be cooked on a grill. Which words describe the requested cooking method?',['Grilled','Fried','Grilling','Steamed'],[0,2]],
['Flavour','A customer says: “I don’t like very hot food.” Which dishes should you avoid recommending if they contain chilli?',['A spicy curry','A chilli sauce','A mild vegetable soup with no chilli','A very spicy steak sauce'],[0,1,3]],
['Restaurant vocabulary','Which pairs correctly connect an animal with its common meat term?',['Cow — beef','Pig — pork','Sheep — mutton','Chicken — salmon'],[0,1,2]],
['Restaurant vocabulary','Which pairs correctly connect a meat term with the animal it comes from?',['Beef — cow','Pork — pig','Mutton — sheep','Veal — turkey'],[0,1,2]],
['Service sequence','A customer has just been seated. What would normally come next in the service sequence?',['Offer or ask about drinks','Give the customer the menu','Take the final payment immediately','Welcome the customer and check the reservation before seating'],[0,1]],
['Taking an order','Which questions are natural when taking a food order?',['“What would you like for your main course?”','“Would you like a starter?”','“How many windows are in your house?”','“Would you like a side dish?”'],[0,1,3]],
['Confirming an order','You want to check that you understood the customer correctly. Which phrases are appropriate?',['“So that’s one steak and one soup, correct?”','“Let me repeat your order to make sure.”','“You definitely ordered this, so don’t change it.”','“Is everything correct with your order?”'],[0,1,3]],
['Serving food','You are carrying a customer’s meal to the table. Which actions are appropriate?',['Place the correct dish at the correct place','Say “Here is your meal. Enjoy!”','Throw the plate onto the table','Check that the order matches the dish before serving'],[0,1,3]],
['Checking the meal','A few minutes after serving, you return to the table. Which phrases are appropriate?',['“Is everything all right with your meal?”','“Can I get you anything else?”','“You must finish everything.”','“How is everything?”'],[0,1,3]],
['Dessert','The customers have finished their main course. Which offers are appropriate?',['“Would you like to see the dessert menu?”','“Would you like coffee?”','“You are not allowed to have dessert.”','“Would you like anything sweet?”'],[0,1,3]],
['Bill and payment','The customer asks for the bill. Which responses are appropriate?',['“Certainly. I’ll bring it over.”','“Here is your bill.”','“You have to leave immediately.”','“Would you like to pay by card or cash?”'],[0,1,3]],
['Polite language','Which expressions are polite in a restaurant?',['“Could I take your order?”','“Would you like something to drink?”','“Give me your order now.”','“May I help you?”'],[0,1,3]],
['Restaurant equipment','Which items are normally used at a dining table?',['Fork','Knife','Spoon','Broomstick'],[0,1,2]],
['Food categories','Which are seafood items?',['Salmon','Prawns','Mussels','Chicken'],[0,1,2]],
['Cooking methods','Which methods are genuine cooking methods used in restaurant vocabulary?',['Baked','Boiled','Steamed','Raw'],[0,1,2]],
['Meal components','Which can be parts of a restaurant meal or menu?',['Starter','Main course','Dessert','Broomstick'],[0,1,2]],
['Customer problem','A customer says: “Excuse me, I ordered grilled chicken, but this is fried.” What should the waiter do?',['Apologise politely','Check the order','Offer to correct the mistake with the kitchen','Tell the customer to eat it anyway'],[0,1,2]],
['Special request','A customer asks whether a soup contains dairy. Which actions are appropriate?',['Check the ingredients','Ask the kitchen if necessary','Guess if the soup looks dairy-free','Give accurate information before the customer decides'],[0,1,3]],
['Restaurant roles','A customer asks: “Who is the person who serves the food and takes the order?” Which answer is correct?',['Waiter','Chef','Customer','Menu'],[0]],
['Menu components','Which of these can all appear as sections or items on a restaurant menu?',['Starter','Main course','Dessert','Side dish'],[0,1,2,3]],
['Taste vocabulary','Which words describe taste or flavour?',['Sweet','Salty','Spicy','Grilled'],[0,1,2]],
['Final customer service','The meal, dessert and payment are finished. Which expressions are appropriate?',['“Thank you for coming.”','“Have a lovely evening.”','“We hope to see you again.”','“Never come back.”'],[0,1,2]]
];

const buildSteps=[
['Restaurant name','Choose a memorable name that fits your restaurant concept.','074_menu.webp','Example: The Haunted Lantern — a candlelit Halloween restaurant.'],
['Restaurant type','Decide what kind of restaurant you are creating and who it is for.','070_restaurant.jpg','Example: Gothic family restaurant for families, friends and Halloween visitors.'],
['Theme & concept','Choose the main idea, atmosphere and story behind your restaurant.','073_dining-room.webp','Example: An old haunted manor where every table has a candle and every dish has a spooky name.'],
['Description','Write a short description explaining what makes your restaurant special.','069_waiter-service.jpg','Example: A warm but mysterious restaurant with dark wood, candles and seasonal Halloween dishes.'],
['Starters','Create at least two starters and give each one a name and price.','076_pumpkin-soup.jpg','Example: Pumpkin Soup with Haunted Herb Oil — €6.50.'],
['Main courses','Create main dishes and decide how they are cooked.','119_steak.webp','Example: Midnight Garlic Steak, grilled medium — €16.90.'],
['Side dishes','Add smaller dishes that can accompany the main course.','118_side-dish.webp','Example: Roasted Halloween Vegetables — €4.50.'],
['Desserts','Create themed desserts with memorable names and prices.','063_cake.jpg','Example: Midnight Chocolate Cake — €6.00.'],
['Drinks','Create drinks and at least one Halloween special drink.','077_glass.webp','Example: Moonlight Mocktail — €5.50.'],
['Ingredients & dietary options','List important ingredients and identify vegetarian, vegan and gluten-free choices where appropriate.','108_gluten-free.webp','Example: Pumpkin soup: pumpkin, onion, stock and herbs. Mark a gluten-free option clearly.'],
['Cooking methods','Choose suitable cooking methods for your dishes.','097_grilled.jpg','Example: Grilled steak, baked pumpkin, roasted vegetables and steamed vegetables.'],
['Flavour profile','Decide how your dishes taste and use restaurant vocabulary accurately.','103_spicy.jpg','Example: Spicy, sweet and salty options should be clearly described on the menu.'],
['Prices','Set realistic prices for every menu item and create a clear price structure.','074_menu.webp','Example: Starter €6.50 • Main €16.90 • Dessert €6.00 • Drink €5.50.'],
['Service roles','Assign the people who will run the restaurant and define what each person does.','068_chef.webp','Example: Chef prepares food • Waiter takes orders and serves • Manager welcomes customers.'],
['Final restaurant presentation','Put everything together, including your Halloween identity, decorations, signature dishes, themed names, prices and special offer/event.','008_halloween-events.jpg','Final example: The Haunted Lantern — Gothic family restaurant • Halloween tasting menu €29.90 • Costume Night special.']
];

const experience=[
['Customer Arrives','Customers enter the restaurant and are greeted warmly. The host or waiter checks the reservation or party size and welcomes them.','120_experience-1-arrival-welcome.webp','“Good evening. Welcome to The Haunted Table. Do you have a reservation?”'],
['Welcome','Make a friendly first impression, confirm how many people are dining and prepare to seat them.','120_experience-1-arrival-welcome.webp','“Welcome. How many people are in your party?”'],
['Seating','Show the customers to their table, check that the table is suitable and help them get seated.','121_experience-3-seating.webp','“This way, please. Here is your table. Is this table OK for you?”'],
['Drinks & Menu','Offer drinks first. Bring the drinks, then let customers look at the menu while they drink and decide what they would like to eat.','122_experience-4-drinks-menu.webp','“Would you like something to drink while you look at the menu?”'],
['Taking & Confirming the Order','Take the food order, answer questions or special requests, then repeat the order to confirm it is correct.','123_experience-5-taking-confirming.webp','“So that is one steak and one pumpkin soup. Is that correct?”'],
['Serving','Bring the food and drinks to the correct customers, check that they have what they need and invite them to enjoy the meal.','124_experience-6-serving.webp','“Here is your meal. Do you need anything else? Enjoy!”'],
['Checking the Meal','After the customers begin eating, check that everything is OK and respond to requests or problems politely.','125_experience-7-checking-meal.webp','“How is everything? Are you enjoying your meal?”'],
['Dessert & Coffee','Offer desserts and coffee after the meal, explain the options briefly and take the order.','126_experience-8-dessert-coffee.webp','“Would you like to see the dessert menu? Would you like some coffee?”'],
['The Bill','Bring the bill when requested, explain the total if necessary and answer any questions.','127_experience-9-10-bill-payment.webp','“Of course. Here is the bill. The total is €28.50.”'],
['Payment','Take the payment by cash or card, process it correctly and provide the receipt or change.','127_experience-9-10-bill-payment.webp','“Would you like to pay by card or cash? Here is your receipt.”'],
['Goodbye','Thank the customers, say goodbye warmly and invite them to return.','128_experience-11-goodbye.webp','“Thank you for coming. Have a lovely evening. We hope to see you again!”']
];

const scenarios=[
['Child’s Birthday','A family is celebrating a child’s birthday. Welcome them, help them choose food, and handle the birthday moment professionally.','129_scenario-child-birthday.jpg',['Parent 1','Parent 2','Child','Waiter/Waitress'],'Make the family feel welcome, take the order, and organise the birthday moment.','“Happy birthday!” • “Would you like anything special for the celebration?” • “Is everything OK?”'],
['Friends’ Dinner','A group of friends is enjoying a Halloween dinner together. Keep the conversation friendly while taking and serving the order.','130_scenario-friends-dinner.jpg',['Friend 1','Friend 2','Friend 3','Waiter/Waitress'],'Take several different orders accurately and keep the service friendly and organised.','“Are you ready to order?” • “What would you like?” • “Anything else?”'],
['Difficult Customer','A customer is unhappy with the service or meal. The team must stay calm, polite and professional.','131_scenario-difficult-customer.jpg',['Customer','Waiter/Waitress','Manager'],'Listen to the complaint, apologise appropriately, clarify the problem and offer a practical solution.','“I’m sorry about that.” • “Could you explain the problem?” • “Let me see what I can do.”'],
['Romantic Dinner','A couple is celebrating a special occasion and wants a pleasant, attentive dining experience.','132_scenario-romantic-dinner.jpg',['Customer 1','Customer 2','Waiter/Waitress'],'Provide attentive service without interrupting the customers unnecessarily.','“Would you like a recommendation?” • “Would you like some more wine?” • “Enjoy your evening.”'],
['Rude Vegan Customer','A vegan customer is unhappy about the available options and speaks rudely to the waiter. The waiter must remain professional.','133_scenario-rude-vegan.jpg',['Customer','Waiter/Waitress','Manager'],'Handle the customer respectfully, identify suitable vegan options and resolve the situation without arguing.','“Let me check the ingredients for you.” • “We can offer…” • “I understand your concern.”'],
['Birthday Surprise','The restaurant is preparing a surprise birthday celebration without revealing the secret to the guest.','134_scenario-birthday-surprise.jpg',['Customer 1','Customer 2','Waiter/Waitress','Chef'],'Coordinate the surprise, keep the secret and serve the special birthday item at the right moment.','“Please keep this a surprise.” • “Everything is ready.” • “Surprise!”'],
['Wrong Order','A customer receives the wrong dish. The waiter must identify the mistake and correct it professionally.','135_scenario-wrong-order.jpg',['Customer','Waiter/Waitress','Chef'],'Listen to the customer, check the original order, apologise and arrange the correct dish.','“I’m sorry, this isn’t what I ordered.” • “Let me check the order.” • “We’ll replace it.”'],
['Dietary Request','A customer has a dietary restriction and needs clear information before ordering.','136_scenario-dietary-request.jpg',['Customer','Waiter/Waitress','Chef'],'Ask about ingredients, check with the kitchen and recommend safe suitable options.','“Does this contain…?” • “Let me check with the chef.” • “This option is suitable for you.”'],
['Busy Halloween Night','The restaurant is extremely busy on Halloween. The team must maintain good service under pressure.','137_scenario-busy-halloween.jpg',['Customer','Waiter/Waitress','Chef','Manager'],'Prioritise tasks, communicate with the team and remain polite even when service is delayed.','“Thank you for waiting.” • “Your order is on its way.” • “I’ll check with the kitchen.”'],
['Special Celebration / Tourists','Tourists are celebrating a special evening and need friendly assistance with the menu and restaurant service.','138_scenario-special-celebration-tourists.jpg',['Tourist 1','Tourist 2','Waiter/Waitress'],'Welcome the tourists, explain the menu clearly and help them enjoy a memorable Halloween meal.','“Welcome to our restaurant.” • “May I recommend…?” • “I hope you enjoy your evening.”']
];

const assessment=['Sequence','Restaurant vocabulary','Useful language','English accuracy','Interaction','Role performance','Customer service','Menu use','Creativity','Preparation & teamwork'];

function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove('show'),2600)}
function go(v){state.view=v;render();window.scrollTo(0,0)}
function togglePresentation(){state.presentation=!state.presentation;document.body.classList.toggle('presentation-mode',state.presentation);if(state.presentation&&document.documentElement.requestFullscreen){document.documentElement.requestFullscreen().catch(()=>toast('Browser fullscreen was blocked. Use the browser full-screen command.'));}else if(!state.presentation&&document.fullscreenElement){document.exitFullscreen().catch(()=>{});}render()}
function shell(title,body,crumb='Halloween Interactive World'){
 const isStudentView=['student','student-quiz','fastest-student','restaurant-game-student'].includes(state.view);
 const actions=isStudentView
  ? `<button onclick="go('student')">Student Home</button><button class="audio-btn" onclick="toggleAmbient()">Play Atmosphere</button><button class="home-btn" onclick="go('home')">Home</button>`
  : `<button onclick="go('teacher')">Teacher Mode</button><button onclick="go('student')">Student Mode</button><button class="audio-btn" onclick="toggleAmbient()">Play Atmosphere</button><button onclick="togglePresentation()">${state.presentation?'Exit Presentation':'Present Full Screen'}</button><button class="home-btn" onclick="go('home')">Home</button>`;
 document.getElementById('app').innerHTML=`<div class="app-bg"><div class="shell ${isStudentView?'student-shell':''}"><header class="top"><button class="brand" onclick="go('${isStudentView?'student':'home'}')"><span>${crumb}</span></button><div class="top-actions">${actions}</div></header><main>${body}</main><audio id="ambientAudio" loop preload="auto" src="139_halloween-ambient.wav"></audio></div></div>`;
}
function titleBlock(kicker,title,sub=''){return `<div class="title-block"><span class="kicker">${kicker}</span><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div>`}
function nav(prev,next){return `<div class="pager"><button class="gold-btn" onclick="${prev}">Previous</button><div class="page-dots" aria-hidden="true"></div><button class="gold-btn" onclick="${next}">Next</button></div>`}
function toggleAmbient(){const a=document.getElementById('ambientAudio');if(!a)return;if(a.paused){a.volume=0.28;a.play().then(()=>toast('Halloween atmosphere playing.')).catch(()=>toast('Tap the atmosphere button again to start audio.'));}else{a.pause();toast('Halloween atmosphere paused.');}}
function home(){document.getElementById('app').innerHTML=`<div class="home"><img src="140_landing-background.jpg" alt="Halloween Interactive World" class="landing"><button class="hot h-teacher" onclick="go('teacher')" aria-label="Enter Teacher Mode"></button><button class="hot h-student" onclick="go('student')" aria-label="Join as a Student"></button>${[[1,'history','h1world'],[2,'quiz','h2world'],[3,'vocab','h3world'],[4,'fastest','h4world'],[5,'restaurant','h5world'],[6,'build','h6world'],[7,'experience','h7world'],[8,'scenarios','h8world']].map(x=>`<button class="hot ${x[2]}" onclick="go('${x[1]}')" aria-label="Open ${x[1]}"></button>`).join('')}</div>`}
function historyView(){const s=historySlides[state.history];shell('Halloween History',`${titleBlock('WORLD 1 • HISTORY',s[0],`Slide ${state.history+1} of ${historySlides.length}`)}<section class="history-slide"><img src="${s[1]}" alt="${esc(s[0])}"></section>${nav(`state.history=(state.history+${historySlides.length-1})%${historySlides.length};render()`,`state.history=(state.history+1)%${historySlides.length};render()`)}`,'Halloween History')}
function vocabView(){
 const v=vocab[state.vocab];
 const pct=((state.vocab+1)/vocab.length)*100;
 const prev=`state.vocab=(state.vocab+${vocab.length-1})%${vocab.length};state.vocabReveal=false;render()`;
 const next=`state.vocab=(state.vocab+1)%${vocab.length};state.vocabReveal=false;render()`;
 shell('Vocabulary World',`${titleBlock('WORLD 3 • VOCABULARY','Halloween Vocabulary World',`Picture → Guess → Say → Reveal Word • ${state.vocab+1} of ${vocab.length}`)}
 <section class="vocab-stage">
   <div class="vocab-progress" aria-label="Vocabulary progress"><div style="width:${pct}%"></div></div>
   <div class="vocab-stage-head"><span>Vocabulary ${state.vocab+1} / ${vocab.length}</span><span>Look first. Guess. Say it aloud.</span></div>
   <div class="teaching-card lively vocab-card">
     <div class="image-frame vocab-image-frame"><img src="${v[1]}" alt="${esc(v[0])}" onerror="this.style.display='none';this.parentElement.classList.add('image-error');this.parentElement.querySelector('.image-error-text').textContent='Image could not be loaded';"><div class="image-error-text" aria-live="polite"></div></div>
     <div class="parchment vocab-teacher-panel">
       <span class="question-label">Look at the picture</span>
       <h2>What is this?</h2>
       <div class="word-reveal ${state.vocabReveal?'revealed':''}">${state.vocabReveal?esc(v[0]):'Hidden until reveal'}</div>
       <p><strong>Teacher:</strong> Give students time to identify the picture and say the English word. Reveal only after they have guessed.</p>
       <button class="gold-btn vocab-reveal-btn" onclick="state.vocabReveal=!state.vocabReveal;render()">${state.vocabReveal?'Hide Word':'Reveal Word'}</button>
     </div>
   </div>
 </section>
 <div class="vocab-quick"><span>Current word</span><strong>${esc(v[0])}</strong><span>•</span><span>${state.vocab+1} / ${vocab.length}</span></div>
 ${nav(prev,next)}`,'Vocabulary World')
}

function quizOptions(index){
 const q=quiz[index];
 const seed=(index*9301+49297)%233280;
 const arr=q[1].map((text,i)=>({text,original:i}));
 let x=seed;
 for(let i=arr.length-1;i>0;i--){x=(x*9301+49297)%233280;const j=Math.floor((x/233280)*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
 return arr;
}
function quizView(){const q=quiz[state.quiz];const order=state.quizOrders[state.quiz]||quiz.map((_,i)=>i);const options=order.map(i=>({text:q[1][i],original:i}));shell('Spooky Quiz',`${titleBlock('WORLD 2 • SPOOKY QUIZ','Spooky Quiz',`Question ${state.quiz+1} of ${quiz.length} • 30-second question window`)}<section class="quiz-layout"><aside class="game-panel"><h3>Game Session</h3><div class="code">${state.session||'Not started'}</div><p>${state.session?'Students use this code to join this session.':'Start a new session before students join.'}</p><button class="small-btn" onclick="newSession();render()">Start New Quiz Session</button><div class="participant-status"><strong>Participants</strong><span>Live participant data is supplied by the realtime classroom service when connected.</span></div></aside><div class="question-card"><div class="timer">${String(state.quizTime).padStart(2,'0')} seconds</div><h2>${esc(q[0])}</h2><div class="answers">${options.map((o,i)=>`<button class="answer ${state.quizSelected===o.original?'selected':''} ${state.quizRevealed&&o.original===q[2]?'correct':''} ${state.quizRevealed&&state.quizSelected===o.original&&o.original!==q[2]?'wrong':''}" onclick="state.quizSelected=${o.original};render()"><b>${String.fromCharCode(65+i)}</b> ${esc(o.text)}</button>`).join('')}</div><div class="quiz-controls"><button class="gold-btn" onclick="clearInterval(window.quizClock);state.quizRevealed=true;state.quizTime=0;syncRealtimeActivity({phase:'results',questionIndex:state.quiz,startedAt:null,endsAt:null,revealed:true});render()">Reveal Correct Answer</button><button class="purple-btn" onclick="go('podium')">Show Results</button></div></div><aside class="game-panel"><h3>Teacher Controls</h3><p>Start game → question → answers → automatic close when everyone has answered or when 30 seconds expires → results → leaderboard → next.</p><button class="gold-btn" onclick="startQuizClock()">Start 30-Second Question</button></aside></section>${nav(`state.quiz=(state.quiz+${quiz.length-1})%${quiz.length};state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;render()`,`state.quiz=(state.quiz+1)%${quiz.length};state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;render()`)}`,'Spooky Quiz')}
async function startQuizClock(){clearInterval(window.quizClock);state.quizTime=30;state.quizRevealed=false;const startedAt=Date.now();const endsAt=startedAt+30000;await syncRealtimeActivity({phase:'question',questionIndex:state.quiz,startedAt,endsAt,revealed:false});const serverEndsAt=state.realtimeBackend&&state.realtimeQuizEndsAt?state.realtimeQuizEndsAt:endsAt;window.quizClock=setInterval(()=>{state.quizTime=Math.max(0,Math.ceil((serverEndsAt-Date.now())/1000));if(state.quizTime<=0){clearInterval(window.quizClock);state.quizRevealed=true;state.quizTime=0;toast('30 seconds finished. Results are ready.')}render()},250);render()}
function podiumView(){const rows=(state.realtimeLeaderboard||[]).slice(0,3);const order=[rows[1],rows[0],rows[2]];const cards=order.map((r,i)=>{const rank=i===1?1:i===0?2:3;return r?`<div class=\"pod ${rank===1?'first':rank===2?'second':'third'}\"><span>${rank}</span><h${rank===1?'2':'3'}>${esc(r.name||'Participant')}</h${rank===1?'2':'3'}><b>${Number(r.score)||0} points</b></div>`:`<div class=\"pod ${rank===1?'first':rank===2?'second':'third'} empty\"><span>${rank}</span><h3>Awaiting result</h3><b>No live result yet</b></div>`;}).join('');shell('Quiz Results',`${titleBlock('QUIZ RESULTS • PODIUM','Quiz Results','Live results from the current classroom session')}<section class=\"podium\">${cards}</section><div class=\"center-actions\"><button class=\"purple-btn\" onclick=\"go('leaderboard')\">View Full Leaderboard</button><button class=\"gold-btn\" onclick=\"state.quiz=0;state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;go('quiz')\">Play Again</button></div>`,'Spooky Quiz')}
async function fastNewRound(){clearInterval(window.fastRoundClock);state.fastRoundActive=true;state.fastRoundStartedAt=performance.now();state.fastRoundTime=30;state.fastResponses=[];state.fastCurrentCorrect=null;const startedAt=Date.now();const endsAt=startedAt+30000;await syncRealtimeActivity({phase:'round',questionIndex:state.fastest,startedAt,endsAt,revealed:false});const serverEndsAt=state.realtimeBackend&&state.realtimeFastEndsAt?state.realtimeFastEndsAt:endsAt;window.fastRoundClock=setInterval(()=>{state.fastRoundTime=Math.max(0,Math.ceil((serverEndsAt-Date.now())/1000));if(state.fastRoundTime<=0){clearInterval(window.fastRoundClock);state.fastRoundActive=false;state.fastRoundTime=0;syncRealtimeActivity({phase:'results',questionIndex:state.fastest,startedAt:null,endsAt:null,revealed:true});toast('30 seconds finished. The round is closed.')}render()},250);render();}
async function fastStudentTap(){if(!state.fastSession||!state.fastRoundActive)return toast('The teacher has not started this round.');const name=(state.studentName||state.fastStudentName||'').trim();if(!name)return toast('Enter your name first.');state.fastStudentName=name;if(state.fastResponses.some(r=>r.name===name))return toast('Your tap is already registered for this round.');const elapsed=(performance.now()-state.fastRoundStartedAt)/1000;state.fastResponses.push({name,time:elapsed});if(realtimeParticipantId)await submitRealtimeAnswer(state.fastest,{type:'fastest-finger',name},Math.round(elapsed*1000));render();}
async function fastMarkCorrect(){if(!state.fastResponses.length)return toast('No student has tapped yet.');state.fastCurrentCorrect=state.fastResponses[0].name;state.fastRoundActive=false;clearInterval(window.fastRoundClock);state.fastRoundTime=0;syncRealtimeActivity({phase:'results',questionIndex:state.fastest,startedAt:null,endsAt:null,revealed:true});toast(`${state.fastCurrentCorrect} marked correct.`);render();}
function fastMarkWrong(){if(!state.fastResponses.length)return toast('No student has tapped yet.');const removed=state.fastResponses.shift();toast(`${removed.name} was marked wrong. Next student can answer.`);render();}
function fastestView(){const v=vocab[state.fastest%vocab.length];const responses=state.fastResponses;const session=state.fastSession?.code||state.session||'Not started';shell('Fastest Finger First',`${titleBlock('WORLD 4 • SPEED GAME','Fastest Finger First',`Private session ${session} • Teacher controls the round`)}<section class="fast-layout fast-teacher-layout"><aside class="game-panel"><h3>Game Session</h3><div class="code">${session}</div><p>${state.fastSession?'Session created locally for this build. Realtime cross-device connection is built; physical-device verification remains pending until deployment.':'Create a fresh private speed-game session before students join.'}</p><button class="small-btn" onclick="newSession('fastest');render()">${state.fastSession?'New Speed Session':'Start Speed Session'}</button><div class="fast-status"><strong>Round status</strong><span>${state.fastRoundActive?'LIVE — accepting taps':'Waiting for teacher to start a round'}</span><b class="timer">${String(state.fastRoundTime).padStart(2,'0')} seconds</b></div><button class="gold-btn" onclick="fastNewRound()">Start Round</button><button class="purple-btn" onclick="go('fastest-student')">Open Student Phone Preview</button></aside><div class="fast-main"><div class="fast-image lively"><img src="${v[1]}" alt="${esc(v[0])}"></div><h2>Who knows this word?</h2><div class="waiting ${state.fastRoundActive?'live':''}">${state.fastRoundActive?'Tap now — fastest response goes first':'Start the round when the class is ready'}</div><div class="teacher-answer"><span>Correct word</span><strong>${esc(v[0])}</strong></div></div><aside class="game-panel"><h3>Answer Order</h3>${responses.length?`<ol class="response-list">${responses.map((r,i)=>`<li><b>${i+1}</b><span>${esc(r.name)}</span><small>${r.time.toFixed(2)}s</small></li>`).join('')}</ol>`:'<div class="empty-state">No taps registered yet.</div>'}<button class="correct-btn" onclick="fastMarkCorrect()">Correct — Award Points</button><button class="wrong-btn" onclick="fastMarkWrong()">Wrong — Next Student</button></aside></section>${nav(`state.fastest=(state.fastest+${vocab.length-1})%${vocab.length};state.fastResponses=[];state.fastCurrentCorrect=null;render()`,`state.fastest=(state.fastest+1)%${vocab.length};state.fastResponses=[];state.fastCurrentCorrect=null;render()`)}`,'Fastest Finger First')}
function fastestStudentView(){const v=vocab[state.fastest%vocab.length];const session=state.studentCode||state.fastSession?.code||state.session||'Waiting';shell('Student Phone — Fastest Finger First',`${titleBlock('STUDENT PHONE','Fastest Finger First',`Session ${session} • Tap once when you know the word`)}<section class="student-fast-phone"><div class="phone-session"><span>Class code</span><strong>${session}</strong></div><label>Your name<input value="${esc(state.studentName||state.fastStudentName)}" oninput="state.studentName=this.value;state.fastStudentName=this.value" placeholder="Your name" maxlength="40"></label><div class="student-fast-image"><img src="${v[1]}" alt="Halloween vocabulary image"></div><div class="student-fast-status">${!state.studentJoined?'Join the teacher’s session first.':state.fastRoundActive?`ROUND LIVE — ${String(state.fastRoundTime).padStart(2,'0')}s — TAP AS SOON AS YOU KNOW IT`:'Waiting for the teacher to start the round.'}</div><button class="tap-button student-tap" onclick="fastStudentTap()" ${!state.fastRoundActive||state.fastResponses.some(r=>r.name===(state.studentName||state.fastStudentName).trim())?'disabled':''}>TAP FIRST</button>${state.fastResponses.some(r=>r.name===(state.studentName||state.fastStudentName).trim())?'<div class="tap-confirmed">Tap registered for this round.</div>':''}<button class="phone-back" onclick="go('student')">Student Home</button></section>`,'Fastest Finger First')}

function restaurantView(){const r=restaurant[state.restaurant];shell('Restaurant World',`${titleBlock('WORLD 5 • RESTAURANT VOCABULARY','Restaurant World',`Picture → Guess → Say → Reveal Word • ${state.restaurant+1} of ${restaurant.length}`)}<section class="teaching-card lively"><div class="image-frame"><img src="${r[1]}" alt="${esc(r[0])}"></div><div class="parchment"><span class="question-label">What is this?</span><div class="word-reveal">${state.restaurantReveal?esc(r[0]):'?'}</div><p>Use the picture to teach restaurant English before revealing the term.</p><button class="gold-btn" onclick="state.restaurantReveal=!state.restaurantReveal;render()">${state.restaurantReveal?'Hide Word':'Reveal Word'}</button></div></section>${nav(`state.restaurant=(state.restaurant+${restaurant.length-1})%${restaurant.length};state.restaurantReveal=false;render()`,`state.restaurant=(state.restaurant+1)%${restaurant.length};state.restaurantReveal=false;render()`)}`,'Restaurant World')}
function createGameOrders(){state.gameOrders=situations.map(s=>shuffleArray(s[2].map((_,i)=>i)));}
function gameSessionStart(){
 newSession('restaurant-game');
 state.game=0;state.gameSelected=[];state.gameRevealed=false;state.gameSubmitted=false;state.gameScore=0;
 toast('New Restaurant Game session created: '+state.gameSession.code);
 render();
}
async function submitGame(){
 if(state.gameSubmitted)return;
 if(!state.gameSelected.length)return toast('Select at least one answer before submitting.');
 state.gameSubmitted=true;
 if(realtimeParticipantId)await submitRealtimeAnswer(state.game, {type:'restaurant-game',selected:[...state.gameSelected]});
 toast('Answer submitted. Waiting for the teacher to reveal the result.');
 render();
}
function revealGameAnswer(){
 if(!state.gameSubmitted)return toast('Wait for students to submit an answer first.');
 if(state.gameRevealed)return;
 state.gameRevealed=true;
 const s=situations[state.game];
 const exact=state.gameSelected.length===s[3].length&&s[3].every(x=>state.gameSelected.includes(x));
 if(exact)state.gameScore+=10;
 syncRealtimeActivity({phase:'results',questionIndex:state.game,startedAt:null,endsAt:null,revealed:true});
 render();
}
function nextGameQuestion(){
 state.game=(state.game+1)%situations.length;state.gameSelected=[];state.gameRevealed=false;state.gameSubmitted=false;syncRealtimeActivity({phase:'question',questionIndex:state.game,startedAt:null,endsAt:null,revealed:false});render();
}
function restaurantGame(){
 const s=situations[state.game];
 const order=state.gameOrders[state.game]||s[2].map((_,i)=>i);
 const options=order.map(i=>({text:s[2][i],original:i}));
 const exact=state.gameRevealed&&state.gameSelected.length===s[3].length&&s[3].every(x=>state.gameSelected.includes(x));
 const selectedWrong=state.gameRevealed&&state.gameSelected.some(x=>!s[3].includes(x));
 const session=state.gameSession?.code||'Not started';
 shell('Restaurant Game',`${titleBlock('WORLD 6 • RESTAURANT GAME','Restaurant Game',`Question ${state.game+1} of ${situations.length} • Select every answer that applies`)}
 <section class="restaurant-game-layout">
   <aside class="game-panel restaurant-game-side">
     <h3>Game Session</h3><div class="code">${session}</div>
     <p>${state.gameSession?'Students use this private code to join this Restaurant Game session.':'Create a new Restaurant Game session before students join.'}</p>
     <button class="small-btn" onclick="gameSessionStart()">${state.gameSession?'Start New Game Session':'Start Restaurant Game Session'}</button>
     <div class="participant-status"><strong>Classroom connection</strong><span>Live multi-device participation is provided by the realtime classroom backend.</span></div>
     <button class="purple-btn" onclick="go('restaurant-game-student')">Open Student Phone Preview</button>
   </aside>
   <div class="restaurant-game-main">
     <div class="game-question-card">
       <span class="kicker">${esc(s[0])}</span>
       <h2>${esc(s[1])}</h2>
       <p class="instruction">Choose every answer that applies. <strong>The number of correct answers is hidden.</strong></p>
     </div>
     <div class="multi-grid restaurant-options">${options.map((o,i)=>`<button class="multi game-option ${state.gameSelected.includes(o.original)?'picked':''} ${state.gameRevealed&&s[3].includes(o.original)?'right':''} ${state.gameRevealed&&state.gameSelected.includes(o.original)&&!s[3].includes(o.original)?'bad':''}" onclick="toggleGame(${o.original})" ${state.gameRevealed?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span>${esc(o.text)}</button>`).join('')}</div>
     <div class="game-action-row">
       <button class="gold-btn" onclick="submitGame()" ${state.gameSubmitted?'disabled':''}>Submit Answers</button>
       <button class="purple-btn" onclick="revealGameAnswer()" ${!state.gameSubmitted||state.gameRevealed?'disabled':''}>Reveal Correct Answers</button>
       <button class="purple-btn" onclick="nextGameQuestion()">Next Question</button>
     </div>
     ${state.gameRevealed?`<div class="game-result ${exact?'result-correct':'result-incorrect'}"><strong>${exact?'Correct selection':'Review the highlighted answers'}</strong><span>${exact?'10 points awarded.':'The correct answers are now highlighted. No points for this question.'}</span></div>`:''}
     <div class="game-progress"><span>Current score</span><strong>${state.gameScore} / ${situations.length*10}</strong></div>
   </div>
   <aside class="game-panel teacher-controls-panel">
     <h3>Teacher Controls</h3>
     <ol><li>Start a new session.</li><li>Display the situation.</li><li>Students select answers.</li><li>Students submit.</li><li>Reveal and discuss the correct answers.</li><li>Move to the next question.</li></ol>
     <div class="teacher-reveal-box"><strong>${state.gameRevealed?'Answers revealed':state.gameSubmitted?'Answer submitted — ready to reveal':'Answers hidden'}</strong><span>${state.gameRevealed?'Green = correct answer. Red = selected but incorrect.':'Students cannot see which answers are correct yet.'}</span></div>
   </aside>
 </section>`,'Restaurant Game')}
function restaurantGameStudentView(){
 const s=situations[state.game];
 const order=state.gameOrders[state.game]||s[2].map((_,i)=>i);
 const options=order.map(i=>({text:s[2][i],original:i}));
 shell('Student Phone — Restaurant Game',`${titleBlock('STUDENT PHONE','Restaurant Game',`Question ${state.game+1} of ${situations.length}`)}
 <section class="student-restaurant-phone">
   <div class="phone-session"><span>Class code</span><strong>${esc(state.studentCode||state.gameSession?.code||'Waiting')}</strong></div>
   <label>Your name<input value="${esc(state.studentName||state.fastStudentName||'')}" oninput="state.studentName=this.value;state.fastStudentName=this.value" placeholder="Your name" maxlength="40"></label>
   <div class="student-game-question"><span>${esc(s[0])}</span><h2>${esc(s[1])}</h2><p>Select every answer that applies. The number of correct answers is hidden.</p></div>
   <div class="student-game-options">${options.map((o,i)=>`<button class="student-game-option ${state.gameSelected.includes(o.original)?'picked':''}" onclick="toggleGame(${o.original})" ${state.gameRevealed?'disabled':''}><b>${String.fromCharCode(65+i)}</b>${esc(o.text)}</button>`).join('')}</div>
   <button class="tap-button restaurant-submit" onclick="submitGame()" ${state.gameSubmitted?'disabled':''}>${state.gameSubmitted?'ANSWER SUBMITTED':'SUBMIT ANSWERS'}</button>
   ${state.gameRevealed?`<div class="tap-confirmed">${state.gameSelected.length===s[3].length&&s[3].every(x=>state.gameSelected.includes(x))?'Answer correct.':'Answer submitted. Discuss the result with your teacher.'}</div>`:'<div class="student-note">The teacher controls the reveal and next question.</div>'}<button class="phone-back" onclick="go('student')">Student Home</button>
 </section>`,'Restaurant Game')}

function toggleGame(i){if(state.gameRevealed||state.gameSubmitted)return;state.gameSelected=state.gameSelected.includes(i)?state.gameSelected.filter(x=>x!==i):[...state.gameSelected,i];render()}
function studentQuizView(){
 const q=quiz[state.quiz];
 const order=state.quizOrders[state.quiz]||q[1].map((_,i)=>i);
 const options=order.map(i=>({text:q[1][i],original:i}));
 const session=state.studentCode||state.session||'Waiting';
 shell('Student Phone — Spooky Quiz',`${titleBlock('STUDENT PHONE','Spooky Quiz',`Question ${state.quiz+1} of ${quiz.length} • Session ${session}`)}<section class="student-quiz-phone"><div class="phone-session"><span>Class code</span><strong>${esc(session)}</strong></div><div class="student-quiz-question"><span>Halloween History</span><h2>${esc(q[0])}</h2><div class="student-quiz-timer">${String(state.quizTime).padStart(2,'0')} seconds remaining</div></div><div class="student-quiz-options">${options.map((o,i)=>`<button class="student-game-option ${state.studentQuizSelected===o.original?'picked':''}" onclick="if(!state.studentQuizSubmitted){state.studentQuizSelected=${o.original};render()}" ${state.studentQuizSubmitted?'disabled':''}><b>${String.fromCharCode(65+i)}</b><span>${esc(o.text)}</span></button>`).join('')}</div><button class="tap-button restaurant-submit" onclick="studentQuizSubmit()" ${state.studentQuizSelected===null||state.studentQuizSubmitted?'disabled':''}>${state.studentQuizSubmitted?'ANSWER SUBMITTED':state.studentQuizSelected===null?'SELECT AN ANSWER':'SUBMIT ANSWER'}</button><div class="student-note">Your teacher controls the question, reveal and next step. The correct answer is not shown on the student phone.</div><button class="phone-back" onclick="go('student')">Student Home</button></section>`,'Spooky Quiz')
}
async function studentQuizSubmit(){if(state.studentQuizSubmitted)return;if(state.studentQuizSelected===null)return toast('Select an answer first.');state.studentQuizSubmitted=true;const elapsed=state.quizTime<30?(30-state.quizTime)*1000:null;if(realtimeParticipantId)await submitRealtimeAnswer(state.quiz,state.studentQuizSelected,elapsed);toast('Answer submitted. Wait for the teacher.');render()}
function buildView(){const b=buildSteps[state.buildStep];shell('Build Your Own Restaurant',`${titleBlock('WORLD 7 • CREATION','Build Your Own Restaurant',`Instruction ${state.buildStep+1} of ${buildSteps.length} • Study the example, then create your restaurant physically.`)}<section class="build-card"><div class="build-image"><img src="${b[2]}" alt="Example for ${esc(b[0])}"></div><div class="parchment"><span class="question-label">${esc(b[0])}</span><h2>${esc(b[3])}</h2><p>Create this part of your restaurant using cards, paper, sketch pens, markers, coloured pencils and other classroom materials.</p><p class="build-example"><strong>What to make:</strong> ${esc(b[0])}</p></div></section>${nav(`state.buildStep=(state.buildStep+${buildSteps.length-1})%${buildSteps.length};render()`,`state.buildStep=(state.buildStep+1)%${buildSteps.length};render()`)}`,'Build Your Own Restaurant')}
function experienceView(){const e=experience[state.experience];shell('Complete Restaurant Experience',`${titleBlock('WORLD 8 • SERVICE SEQUENCE','Complete Restaurant Experience',`Step ${state.experience+1} of ${experience.length} • From arrival to goodbye`)}<section class="experience-card lively"><div class="exp-image"><img src="${e[2]}" alt="${esc(e[0])}"></div><div class="parchment"><h2>${esc(e[0])}</h2><p>${esc(e[1])}</p><div class="language-box"><b>Example language</b><br>${esc(e[3])}</div><div class="language-box"><b>Role-play rule</b><br>Use the stage naturally. Students may improvise, but keep the service sequence and customer-service language.</div></div></section><div class="step-strip">${experience.map((x,i)=>`<button class="step ${i===state.experience?'active':''}" onclick="state.experience=${i};render()" aria-label="Step ${i+1}: ${esc(x[0])}">${i+1}</button>`).join('')}</div>${nav(`state.experience=(state.experience+${experience.length-1})%${experience.length};render()`,`state.experience=(state.experience+1)%${experience.length};render()`)}`,'Complete Restaurant Experience')}
function scenarioImage(s){return `<div class="scenario-image"><img src="${s[2]}" alt="${esc(s[0])}"></div>`}
const roleplaySteps=[
 ['Prepare','Read the situation, understand the objective and agree on how the scene should begin.'],
 ['Assign Roles','Use the scenario roles: customer(s), waiter/waitress, chef or manager where required. Everyone must know their role before starting.'],
 ['Use Your Restaurant','Use the restaurant name, theme, menu, prices and special dishes created in Build Your Own Restaurant.'],
 ['Perform the Service','Follow the restaurant sequence naturally: welcome → seating → drinks & menu → order & confirmation → serving → checking → dessert/coffee → bill/payment → goodbye.'],
 ['Handle the Situation','Stay in character and respond to the specific problem, celebration or customer request in the scenario.'],
 ['Finish & Reflect','Complete the scene, thank the customers and briefly discuss what went well and what could be improved.']
];
function roleplayView(){
 const s=scenarios[state.scenario??0];
 const step=roleplaySteps[state.roleplayStep??0];
 const isLast=(state.roleplayStep??0)===roleplaySteps.length-1;
 shell('Scenarios & Role-Play',`${titleBlock('WORLD 10 • ROLE-PLAY','Scenarios & Role-Play',`Stage ${state.roleplayStep+1} of ${roleplaySteps.length} • ${esc(s[0])}`)}
 <section class="roleplay-layout">
   <div class="roleplay-hero"><img src="${s[2]}" alt="${esc(s[0])}"><div><span class="roleplay-kicker">SCENARIO ${state.scenario+1} OF ${scenarios.length}</span><h2>${esc(s[0])}</h2><p>${esc(s[1])}</p></div></div>
   <div class="roleplay-stepbar">${roleplaySteps.map((x,i)=>`<button class="roleplay-step ${i===state.roleplayStep?'active':''} ${i<(state.roleplayStep||0)?'done':''}" onclick="state.roleplayStep=${i};render()"><b>${i+1}</b><span>${esc(x[0])}</span></button>`).join('')}</div>
   <section class="roleplay-card"><div class="roleplay-stage"><span>STAGE ${state.roleplayStep+1}</span><h3>${esc(step[0])}</h3><p>${esc(step[1])}</p></div>
    <div class="roleplay-info-grid">
      <div><h3>Roles</h3><ul>${s[3].map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div>
      <div><h3>Your scenario task</h3><p>${esc(s[4])}</p></div>
      <div><h3>Useful language</h3><p>${esc(s[5])}</p></div>
      <div><h3>Performance rule</h3><p>Speak in English, stay in character, use your own menu and restaurant, and respond naturally rather than simply reading a script.</p></div>
    </div>
   </section>
   <div class="roleplay-actions">
    <button class="purple-btn" onclick="go('scenario-detail')">Back to Scenario</button>
    <button class="gold-btn" onclick="state.roleplayStarted=true;state.roleplayStep=${isLast?0:state.roleplayStep+1};render()">${isLast?'Restart Role-Play':'Next Stage'}</button>
   </div>
   ${isLast?`<div class="roleplay-finish"><strong>Role-play complete.</strong><span>Finish the performance, then move to Team Registration / Final Assessment when those stages are ready.</span></div>`:''}
 </section>`,'Scenarios & Role-Play')}

function scenariosView(){shell('Restaurant Scenarios',`${titleBlock('WORLD 9 • SCENARIOS','Restaurant Scenarios','Choose a situation, study the roles and prepare the restaurant role-play.')}<section class="scenario-grid">${scenarios.map((s,i)=>`<article class="scenario">${scenarioImage(s)}<div><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><div class="role-preview"><strong>Roles:</strong> ${s[3].map(esc).join(' • ')}</div><button class="select-btn" onclick="state.scenario=${i};state.team.scenario=${i};state.team.roles=[];go('scenario-detail')">Open Scenario</button></div></article>`).join('')}</section>`,'Restaurant Scenarios')}
function scenarioDetailView(){const s=scenarios[state.scenario??0];shell('Restaurant Scenario',`${titleBlock('WORLD 9 • SCENARIO BRIEF','Restaurant Scenario',`${state.scenario+1} of ${scenarios.length} • Prepare before performing`)}<section class="scenario-detail"><div class="scenario-detail-image"><img src="${s[2]}" alt="${esc(s[0])}"></div><div class="scenario-detail-content"><h2>${esc(s[0])}</h2><p class="scenario-brief"><strong>Situation:</strong> ${esc(s[1])}</p><div class="scenario-detail-grid"><div><h3>Your roles</h3><ul>${s[3].map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div><div><h3>Your task</h3><p>${esc(s[4])}</p></div><div><h3>Useful language</h3><p>${esc(s[5])}</p></div></div><div class="center-actions"><button class="gold-btn" onclick="state.team.scenario=state.scenario;state.team.roles=[];go('team')">Register Team for This Scenario</button><button class="gold-btn" onclick="state.roleplayStep=0;state.roleplayStarted=false;go('roleplay')">Start Role-Play</button><button class="purple-btn" onclick="go('scenarios')">Back to Scenarios</button></div></div></section>`,'Restaurant Scenarios')}

function resetTeamDraft(scenarioIndex=state.scenario??0){
 state.team={name:'',members:2,names:[],roles:[],responsibilities:[],scenario:scenarioIndex,saved:false,editing:false};
 state.teamEditIndex=-1;
}
function saveTeam(){
 const s=scenarios[state.team.scenario??state.scenario??0];
 const n=Math.max(1,Number(state.team.members)||1);
 const names=Array.from({length:n},(_,i)=>(state.team.names[i]||'').trim());
 const roles=Array.from({length:n},(_,i)=>(state.team.roles[i]||'').trim());
 const responsibilities=Array.from({length:n},(_,i)=>(state.team.responsibilities[i]||'').trim());
 const name=state.team.name.trim();
 if(!name)return toast('Enter a team name.');
 if(names.some(x=>!x))return toast('Enter every student name.');
 if(roles.some(x=>!x))return toast('Assign a role to every student.');
 if(responsibilities.some(x=>!x))return toast('Record what each student will do.');
 const duplicate=state.teams.some((t,i)=>i!==state.teamEditIndex&&t.name.toLowerCase()===name.toLowerCase());
 if(duplicate)return toast('Choose a different team name.');
 const record={name,members:n,names,roles,responsibilities,scenario:state.team.scenario??state.scenario??0};
 if(state.teamEditIndex>=0){state.teams[state.teamEditIndex]=record;}
 else{state.teams.push(record);}
 state.team={...record,saved:true,editing:false};
 state.teamEditIndex=-1;
 toast('Team registration saved for '+s[0]+'.');
 render();
}
function editTeam(index){
 const t=state.teams[index];
 if(!t)return;
 state.team={...t,names:[...t.names],roles:[...t.roles],responsibilities:[...t.responsibilities],saved:false,editing:true};
 state.scenario=t.scenario;
 state.teamEditIndex=index;
 render();
}
function newTeamRegistration(){resetTeamDraft(state.scenario??0);render();}
function teamView(){
 const draftScenario=state.team.scenario??state.scenario??0;
 const s=scenarios[draftScenario];
 const n=Math.max(1,Number(state.team.members)||2);
 const roleOptions=[...s[3],'Assistant / Support'];
 const rows=Array.from({length:n},(_,i)=>`<div class="member-row">
  <label>Member ${i+1}<input value="${esc(state.team.names[i]||'')}" oninput="state.team.names[${i}]=this.value" placeholder="Student name"></label>
  <label>Role<select onchange="state.team.roles[${i}]=this.value"><option value="">Choose role</option>${roleOptions.map(r=>`<option value="${esc(r)}" ${state.team.roles[i]===r?'selected':''}>${esc(r)}</option>`).join('')}</select></label>
  <label class="responsibility-field">What will this student do?<input value="${esc(state.team.responsibilities[i]||'')}" oninput="state.team.responsibilities[${i}]=this.value" placeholder="e.g. greet customers, take orders, serve food"></label>
 </div>`).join('');
 const totalStudents=state.teams.reduce((sum,t)=>sum+t.members,0);
 const teamList=state.teams.length?`<div class="registered-teams"><div class="section-heading"><h3>Registered Teams</h3><span>${totalStudents} student${totalStudents===1?'':'s'} registered</span></div>${state.teams.map((t,i)=>{const ts=scenarios[t.scenario??0];return `<article class="team-summary"><h3>${esc(t.name)}</h3><p><strong>${t.members} member${t.members===1?'':'s'}</strong> • <strong>Scenario:</strong> ${esc(ts[0])}</p><div class="registered-members">${t.names.map((nm,j)=>`<div class="registered-member"><strong>${esc(nm)}</strong><span>${esc(t.roles[j])}</span><small>${esc(t.responsibilities[j])}</small></div>`).join('')}</div><div class="center-actions"><button class="gold-btn" onclick="editTeam(${i})">Edit Team</button><button class="purple-btn" onclick="state.scenario=${t.scenario};state.roleplayStep=0;state.roleplayStarted=false;go('roleplay')">Start Role-Play</button><button class="gold-btn" onclick="state.team={...state.teams[${i}],saved:true,editing:false};state.assessmentTeamIndex=${i};state.scenario=${t.scenario};go('assessment')">Teacher Assessment</button></div></article>`}).join('')}</div>`:'';
 const form=`<section class="team-card"><div class="team-intro"><h3>${state.teamEditIndex>=0?'Edit Team':'Register a New Team'}</h3><p>Register as many teams and students as this class requires. Team size is flexible, and the selected scenario stays attached to each team.</p></div>
  <label>Team name<input value="${esc(state.team.name)}" oninput="state.team.name=this.value" placeholder="Team name"></label>
  <label>Number of members<input type="number" min="1" step="1" value="${n}" onchange="state.team.members=Math.max(1,Number(this.value)||1);render()" inputmode="numeric"></label>
  <label>Scenario<select onchange="state.team.scenario=Number(this.value);state.scenario=Number(this.value);state.team.roles=[];render()">${scenarios.map((x,i)=>`<option value="${i}" ${draftScenario===i?'selected':''}>${i+1}. ${esc(x[0])}</option>`).join('')}</select></label>
  <div class="members">${rows}</div>
  <div class="center-actions"><button class="gold-btn" onclick="saveTeam()">${state.teamEditIndex>=0?'Save Changes':'Save Team Registration'}</button><button class="purple-btn" onclick="newTeamRegistration()">Clear / New Team</button><button class="purple-btn" onclick="go('scenarios')">Back to Scenarios</button></div>
 </section>`;
 shell('Team Registration',`${titleBlock('WORLD 11 • TEAM REGISTRATION','Team Registration',`Register the teams and students required for this class and record who is doing what.`)}${teamList}${form}`,'Team Registration');
}

function loadAssessmentTeam(index){
 state.assessmentTeamIndex=Math.max(0,Math.min(state.teams.length-1,Number(index)||0));
 const t=state.teams[state.assessmentTeamIndex];
 state.scores=t&&state.assessments[state.assessmentTeamIndex]?[...state.assessments[state.assessmentTeamIndex].scores]:Array(10).fill(0);
 render();
}
function saveAssessment(){
 const i=state.assessmentTeamIndex;
 const t=state.teams[i];
 if(!t)return toast('Register a team before assessing it.');
 const scores=state.scores.map(v=>Math.max(0,Math.min(10,Number(v)||0)));
 const total=scores.reduce((a,b)=>a+b,0);
 state.assessments[i]={scores,total,savedAt:Date.now()};
 toast('Assessment saved for '+t.name+'. Total: '+total+' / 100');
 render();
}
function assessmentView(){
 const categories=['Sequence','Restaurant vocabulary','Useful language','English accuracy','Interaction','Role performance','Customer service','Menu use','Creativity','Preparation & teamwork'];
 if(!state.teams.length){shell('Final Assessment',`${titleBlock('WORLD 12 • FINAL ASSESSMENT','Final Assessment','Teacher-only scoring • 10 categories • 0–10 points each • Total 100')}<section class="empty-state"><h3>No teams registered yet</h3><p>Register the teams first. Each team can then be assessed separately.</p><button class="gold-btn" onclick="go('team')">Go to Team Registration</button></section>`,'Final Assessment');return;}
 const idx=Math.max(0,Math.min(state.teams.length-1,state.assessmentTeamIndex));
 const team=state.teams[idx];
 const total=state.scores.reduce((a,b)=>a+Number(b||0),0);
 const saved=state.assessments[idx];
 const teamOptions=state.teams.map((t,i)=>`<option value="${i}" ${i===idx?'selected':''}>${esc(t.name)} — ${t.members} member${t.members===1?'':'s'}</option>`).join('');
 shell('Final Assessment',`${titleBlock('WORLD 12 • FINAL ASSESSMENT','Final Assessment','Teacher-only scoring • 10 categories • 0–10 points each • Total 100')}<section class="assessment-wrap"><div class="assessment-head"><label>Team to assess<select onchange="loadAssessmentTeam(this.value)">${teamOptions}</select></label><div class="assessment-scenario"><strong>Scenario:</strong> ${esc(scenarios[team.scenario??0][0])}</div></div><section class="assessment">${categories.map((x,i)=>`<label><span>${i+1}. ${x}</span><input type="number" min="0" max="10" value="${state.scores[i]}" oninput="const v=Math.max(0,Math.min(10,Number(this.value)||0));state.scores[${i}]=v;this.value=v;document.getElementById('totalScore').textContent=state.scores.reduce((a,b)=>a+Number(b||0),0)+' / 100'" aria-label="${esc(x)} score"></label>`).join('')}</section><div class="total-score" id="totalScore">${total} / 100</div><p class="assessment-status">${saved?`Saved assessment: ${saved.total} / 100`:'Not saved yet.'}</p><div class="center-actions"><button class="gold-btn" onclick="saveAssessment()">Save Assessment</button><button class="purple-btn" onclick="go('leaderboard')">Show Leaderboard</button><button class="purple-btn" onclick="go('team')">Manage Teams</button></div></section>`,'Final Assessment');
}

function leaderboard(){
 if(!state.teams.length){shell('Final Leaderboard',`${titleBlock('RESULTS','Final Leaderboard','Teacher-controlled team results')}<section class="empty-state"><h3>No teams registered yet</h3><p>Register teams and complete their assessments before viewing the final leaderboard.</p><button class="gold-btn" onclick="go('team')">Go to Team Registration</button></section>`,'Final Assessment');return;}
 const assessed=state.teams.map((team,index)=>({team,index,result:state.assessments[index]})).filter(x=>x.result&&Array.isArray(x.result.scores)).sort((a,b)=>Number(b.result.total)-Number(a.result.total)||a.team.name.localeCompare(b.team.name));
 const pending=state.teams.filter((_,index)=>!state.assessments[index]);
 if(!assessed.length){shell('Final Leaderboard',`${titleBlock('RESULTS','Final Leaderboard','Teacher-controlled team results')}<section class="empty-state"><h3>No assessments saved yet</h3><p>Complete at least one team assessment to populate the leaderboard. No placeholder participants or scores are shown.</p><button class="gold-btn" onclick="go('assessment')">Go to Final Assessment</button></section>`,'Final Assessment');return;}
 let lastTotal=null,lastRank=0;
 const rows=assessed.map((x,pos)=>{const total=Number(x.result.total)||0;const rank=total===lastTotal?lastRank:pos+1;lastTotal=total;lastRank=rank;return `<article class="leaderboard-row"><div class="leaderboard-rank">${rank}</div><div class="leaderboard-team"><h3>${esc(x.team.name)}</h3><p>${x.team.members} member${x.team.members===1?'':'s'} • ${esc(scenarios[x.team.scenario??0][0])}</p><details><summary>View category scores</summary><div class="score-breakdown">${assessment.map((category,i)=>`<span><b>${i+1}. ${esc(category)}</b><em>${Number(x.result.scores[i]||0)} / 10</em></span>`).join('')}</div></details></div><div class="leaderboard-total">${total}<small>/ 100</small></div></article>`}).join('');
 const pendingBlock=pending.length?`<section class="pending-assessments"><h3>Not yet assessed</h3><div>${pending.map(t=>`<span>${esc(t.name)}</span>`).join('')}</div></section>`:'';
 shell('Final Leaderboard',`${titleBlock('RESULTS','Final Leaderboard',`${assessed.length} assessed team${assessed.length===1?'':'s'} • Scores are based only on saved teacher assessments`)}<section class="leaderboard-list">${rows}</section>${pendingBlock}<div class="center-actions"><button class="gold-btn" onclick="go('assessment')">Back to Final Assessment</button><button class="purple-btn" onclick="go('team')">Manage Teams</button></div>`,'Final Assessment');
}
function teacher(){const active=state.teacherSessionActive&&state.session;const activityNames={quiz:'Spooky Quiz',fastest:'Fastest Finger First','restaurant-game':'Restaurant Game',team:'Team Registration',assessment:'Final Assessment',leaderboard:'Final Leaderboard'};const activity=activityNames[state.teacherActivity]||'Spooky Quiz';const sessionAge=active&&state.teacherSessionStartedAt?Math.max(0,Math.floor((Date.now()-state.teacherSessionStartedAt)/60000)):0;const sessionPanel=active?`<section class="teacher-session active"><div><span class="kicker">ACTIVE CLASSROOM SESSION</span><h2>${esc(activity)}</h2><p>Students join using the session code shown below. Live participant data is supplied by the realtime classroom service. Physical-device verification remains pending until deployment.</p></div><div class="teacher-code"><span>SESSION CODE</span><strong>${esc(state.session)}</strong><small>${sessionAge} minute${sessionAge===1?'':'s'} active</small></div><div class="teacher-session-actions"><button class="gold-btn" onclick="go('${state.teacherActivity==='fastest'?'fastest':state.teacherActivity==='restaurant-game'?'restaurant-game':'quiz'}')">Open Activity</button><button class="purple-btn" onclick="go('projector')">Open Projector</button><button class="purple-btn" onclick="endSession()">End Session</button></div></section>`:`<section class="teacher-session"><div><span class="kicker">NO ACTIVE CLASSROOM SESSION</span><h2>Ready for the next class activity</h2><p>Create a new session when students are ready to join. Every new interactive session receives a fresh code.</p></div><div class="teacher-code idle"><span>SESSION CODE</span><strong>— — — — — —</strong><small>No session is active</small></div></section>`;const activities=[['quiz','Spooky Quiz','15-question Halloween history quiz','Start New Quiz Session'],['fastest','Fastest Finger First','Teacher-led vocabulary speed round','Start New Speed Session'],['restaurant-game','Restaurant Game','Select all applicable restaurant answers','Start New Restaurant Session'],['team','Team Registration','Create and manage as many teams and students as the class requires','Manage Teams'],['assessment','Final Assessment','Score each registered team across the 10 approved categories','Assess Teams'],['leaderboard','Final Leaderboard','View saved team assessment results','Open Leaderboard']];shell('Teacher Mode',`${titleBlock('TEACHER • PLAN • CONTROL • ASSESS','Teacher Mode','Teacher/projector workspace. Student phones use Student Mode and never see teacher controls.')}${sessionPanel}<section class="teacher-grid">${activities.map(x=>`<article class="teacher-card"><span class="teacher-index">${x[0]==='quiz'?'01':x[0]==='fastest'?'02':x[0]==='restaurant-game'?'03':x[0]==='team'?'04':x[0]==='assessment'?'05':'06'}</span><h3>${x[1]}</h3><p>${x[2]}</p><button class="gold-btn" onclick="teacherLaunch('${x[0]}')">${x[3]}</button></article>`).join('')}</section><section class="teacher-notice"><strong>Live classroom connection</strong><p>Session codes and teacher controls are prepared in this interface. Cross-device participants, live answers, timestamps and shared leaderboards are handled by the realtime backend. Physical-device verification remains pending until deployment.</p></section>`,'Teacher Mode')}
function projector(){
 const active=state.teacherSessionActive&&state.session;
 if(!active){shell('Projector',`${titleBlock('CLASSROOM PROJECTOR','Waiting for teacher','Start an interactive classroom session in Teacher Mode, then open the projector view.')}<section class="projector-empty"><div class="projector-mark">CLASSROOM</div><h2>No active session</h2><p>The projector will display the teacher-controlled activity here.</p><button class="gold-btn" onclick="go('teacher')">Open Teacher Mode</button></section>`,'Projector');return;}
 const activity=state.teacherActivity;
 let content='';
 if(activity==='quiz'){
  const q=quiz[state.quiz]; const order=state.quizOrders[state.quiz]||q[1].map((_,i)=>i); const options=order.map(i=>({text:q[1][i],original:i}));
  content=`<section class="projector-question"><div class="projector-meta"><span>QUESTION ${state.quiz+1} / ${quiz.length}</span><strong>${String(state.quizTime).padStart(2,'0')}s</strong></div><h1>${esc(q[0])}</h1><div class="projector-options">${options.map((o,i)=>`<div class="projector-option ${state.quizRevealed&&o.original===q[2]?'correct':''} ${state.quizRevealed&&state.quizSelected===o.original&&o.original!==q[2]?'wrong':''}"><b>${String.fromCharCode(65+i)}</b><span>${esc(o.text)}</span></div>`).join('')}</div>${state.quizRevealed?`<div class="projector-reveal">Correct answer: <strong>${esc(q[1][q[2]])}</strong></div>`:'<div class="projector-wait">Answers are hidden until the teacher reveals them.</div>'}</section><div class="projector-controls"><button class="gold-btn" onclick="startQuizClock()">Start / Restart 30 Seconds</button><button class="purple-btn" onclick="clearInterval(window.quizClock);state.quizRevealed=true;syncRealtimeActivity({phase:'results',questionIndex:state.quiz,startedAt:null,endsAt:null,revealed:true});render()">Reveal Answer</button><button class="purple-btn" onclick="clearInterval(window.quizClock);state.quiz=(state.quiz+1)%${quiz.length};state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;state.realtimeQuizEndsAt=null;state.studentQuizSelected=null;state.studentQuizSubmitted=false;syncRealtimeActivity({phase:'waiting',questionIndex:state.quiz,startedAt:null,endsAt:null,revealed:false});render()">Next Question</button></div>`;
 } else if(activity==='fastest'){
  const v=vocab[state.fastest%vocab.length];
  content=`<section class="projector-fast"><div class="projector-meta"><span>FASTEST FINGER FIRST</span><strong>${state.fastRoundActive?`ROUND LIVE • ${String(state.fastRoundTime).padStart(2,'0')}s`:'READY'}</strong></div><div class="projector-image"><img src="${v[1]}" alt="${esc(v[0])}"></div><h1>Who knows this word?</h1><div class="projector-word">${state.fastCurrentCorrect?`Correct: <strong>${esc(state.fastCurrentCorrect)}</strong>`:'Identify the picture.'}</div><div class="projector-wait">${state.fastRoundActive?'Tap now — fastest response goes first.':'The teacher starts the round when the class is ready.'}</div>${state.fastResponses.length?`<ol class="projector-responses">${state.fastResponses.map((r,i)=>`<li><b>${i+1}</b><span>${esc(r.name)}</span><small>${r.time.toFixed(2)}s</small></li>`).join('')}</ol>`:''}</section><div class="projector-controls"><button class="gold-btn" onclick="fastNewRound()">Start Round</button><button class="purple-btn" onclick="fastMarkCorrect()">Mark Fastest Correct</button><button class="purple-btn" onclick="clearInterval(window.fastRoundClock);state.fastRoundActive=false;state.fastRoundTime=30;state.fastest=(state.fastest+1)%${vocab.length};state.fastResponses=[];state.fastCurrentCorrect=null;state.realtimeFastEndsAt=null;syncRealtimeActivity({phase:'waiting',questionIndex:state.fastest,startedAt:null,endsAt:null,revealed:false});render()">Next Image</button></div>`;
 } else if(activity==='restaurant-game'){
  const s=situations[state.game]; const order=state.gameOrders[state.game]||s[2].map((_,i)=>i); const options=order.map(i=>({text:s[2][i],original:i}));
  content=`<section class="projector-question"><div class="projector-meta"><span>RESTAURANT GAME • QUESTION ${state.game+1} / ${situations.length}</span><strong>${state.gameSubmitted?'SUBMITTED':'OPEN'}</strong></div><h1>${esc(s[0])}</h1><p class="projector-situation">${esc(s[1])}</p><div class="projector-options">${options.map((o,i)=>`<div class="projector-option ${state.gameRevealed&&s[3].includes(o.original)?'correct':''} ${state.gameRevealed&&state.gameSelected.includes(o.original)&&!s[3].includes(o.original)?'wrong':''}"><b>${String.fromCharCode(65+i)}</b><span>${esc(o.text)}</span></div>`).join('')}</div>${state.gameRevealed?`<div class="projector-reveal">Correct answers have been revealed.</div>`:'<div class="projector-wait">Students select every answer that applies. The number of correct answers is hidden.</div>'}</section><div class="projector-controls"><button class="gold-btn" onclick="state.gameSubmitted=false;state.gameRevealed=false;state.gameSelected=[];render()">Open / Reset Question</button><button class="purple-btn" onclick="revealGameAnswer()">Reveal Answers</button><button class="purple-btn" onclick="nextGameQuestion()">Next Question</button></div>`;
 } else {
  content=`<section class="projector-empty"><div class="projector-mark">CLASSROOM</div><h2>${esc(activity)}</h2><p>Open the activity from Teacher Mode.</p></section>`;
 }
 shell('Projector',`${titleBlock('CLASSROOM PROJECTOR',activity==='quiz'?'Spooky Quiz':activity==='fastest'?'Fastest Finger First':'Restaurant Game',`Session ${esc(state.session)} • Teacher-controlled display`)}${content}<div class="projector-footer"><button class="gold-btn" onclick="togglePresentation()">${state.presentation?'Exit Full Screen':'Present Full Screen'}</button><button class="phone-back" onclick="go('teacher')">Teacher Mode</button></div>`,'Projector');
}
function student(){
 const activityNames={quiz:'Spooky Quiz',fastest:'Fastest Finger First','restaurant-game':'Restaurant Game'};
 if(state.studentJoined){
  const activity=activityNames[state.teacherActivity]||'Classroom Activity';
  const local=state.studentLocalPreview&&state.teacherSessionActive&&state.session===state.studentCode;
  shell('Student Mode',`${titleBlock('STUDENT • JOINED','Student Mode',`Welcome, ${esc(state.studentName)} • Session ${esc(state.studentCode)}`)}<section class="student-home-phone"><div class="student-phone-header"><span>JOINED SESSION</span><strong>${esc(state.studentCode)}</strong></div><div class="student-welcome"><span>Your name</span><h2>${esc(state.studentName)}</h2></div><div class="student-activity-card"><span>CLASSROOM ACTIVITY</span><h2>${esc(activity)}</h2><p>${local?'This is the local same-browser preview. A separate student phone receives the real live activity through the deployed realtime classroom service.':'You are ready. The teacher controls when the activity appears. Live cross-device activity appears here through the deployed realtime classroom service.'}</p>${local?`<div class="student-preview-actions"><button class="purple-btn" onclick="go('${state.teacherActivity==='fastest'?'fastest-student':state.teacherActivity==='restaurant-game'?'restaurant-game-student': 'student-quiz'}')">Open Activity Preview</button></div>`:''}</div><div class="student-status"><span class="status-dot"></span><strong>${local?'Ready for the teacher':'Waiting for classroom connection'}</strong><p>${local?'Follow the teacher’s instructions on the projector.':'Keep this page open. The realtime classroom service connects this phone to the teacher’s session when the application is deployed.'}</p></div><button class="phone-back" onclick="leaveStudentSession()">Leave Session</button></section>`,'Student Mode');
  return;
 }
 shell('Student Mode',`${titleBlock('JOIN • PARTICIPATE','Student Mode','Use the teacher’s current session code. This interface is designed specifically for student phones.')}<section class="student-join-phone"><div class="student-join-hero"><span>STUDENT PHONE</span><h2>Join your class</h2><p>Enter the code shown by your teacher and your name. Do not use a teacher control from this screen.</p></div><label>Class code<input id="joinCode" placeholder="6-character code" maxlength="6" inputmode="text" autocapitalize="characters" autocomplete="off"></label><label>Your name<input id="joinName" placeholder="Enter your name" maxlength="40" autocomplete="name"></label><button class="purple-btn student-join-btn" onclick="join()">Join Class</button><div class="student-status"><span class="status-dot"></span><strong>Waiting for a class session</strong><p>Enter the code provided by your teacher. Live cross-device joining is provided by the realtime classroom service.</p></div></section>`,'Student Mode')
}
function leaveStudentSession(){closeRealtimeStream();realtimeParticipantId='';realtimeParticipantToken='';state.realtimeBackend=false;state.studentJoined=false;state.studentCode='';state.studentName='';state.studentLocalPreview=false;state.studentQuizSelected=null;state.studentQuizSubmitted=false;state.fastStudentName='';toast('You left the student session.');render()}
function shuffleArray(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function createQuizOrders(){state.quizOrders=quiz.map(q=>shuffleArray(q[1].map((_,i)=>i)));}
const REALTIME_URL = (window.HALLOWEEN_REALTIME_URL || (location.hostname==='localhost' || location.hostname==='127.0.0.1' ? `${location.protocol}//${location.hostname}:8787` : ''));
let realtimeTeacherToken='';
let realtimeParticipantId='';
let realtimeParticipantToken='';
let realtimeStream=null;
let realtimeController=null;
let realtimeHeartbeatTimer=null;
async function realtimeRequest(path,options={}){
 if(!REALTIME_URL) throw new Error('REALTIME_BACKEND_NOT_CONFIGURED');
 const headers={'content-type':'application/json',...(options.headers||{})};
 const res=await fetch(REALTIME_URL+path,{...options,headers});
 const data=await res.json().catch(()=>({}));
 if(!res.ok) throw new Error(data.error||`HTTP_${res.status}`);
 return data;
}
function closeRealtimeStream(){
 if(realtimeController){try{realtimeController.abort()}catch{}}
 realtimeController=null; realtimeStream=null;
 if(realtimeHeartbeatTimer){clearInterval(realtimeHeartbeatTimer);realtimeHeartbeatTimer=null;}
}
async function connectRealtimeStream(code,token,participantId=''){
 closeRealtimeStream();
 if(!REALTIME_URL)return false;
 realtimeController=new AbortController();
 try{
  const url=`${REALTIME_URL}/api/sessions/${encodeURIComponent(code)}/stream?token=${encodeURIComponent(token)}${participantId?`&participantId=${encodeURIComponent(participantId)}`:''}`;
  const res=await fetch(url,{headers:{accept:'text/event-stream'},signal:realtimeController.signal});
  if(!res.ok || !res.body) throw new Error(`STREAM_${res.status}`);
  realtimeStream=res.body;
  (async()=>{
   const reader=res.body.getReader(); const decoder=new TextDecoder(); let buffer='';
   try{
    while(true){const {value,done}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});const chunks=buffer.split(/\n\n/);buffer=chunks.pop()||'';for(const chunk of chunks){const lines=chunk.split('\n');const type=(lines.find(x=>x.startsWith('event:'))||'').slice(6).trim();const raw=(lines.find(x=>x.startsWith('data:'))||'').slice(5).trim();if(!raw)continue;let payload;try{payload=JSON.parse(raw)}catch{continue}handleRealtimeEvent(type,payload);}}
   }catch(err){if(err.name!=='AbortError') console.warn('Realtime stream:',err.message);}
  })();
  return true;
 }catch(err){if(err.name!=='AbortError') console.warn('Realtime stream:',err.message);return false;}
}
function handleRealtimeEvent(type,payload){
 if(type==='connected' && payload && Number.isFinite(payload.participantCount)) state.realtimeParticipantCount=payload.participantCount;
 if(type==='participant-snapshot' && payload){state.realtimeParticipantCount=Number(payload.participantCount)||0;}
 if(type==='participant-joined'){state.realtimeParticipantCount=(state.realtimeParticipantCount||0)+1;render();}
 if(type==='activity-state' && payload){
  if(payload.activity==='fastest'){
    if(Number.isFinite(payload.questionIndex)) state.fastest=Number(payload.questionIndex)||0;
    state.fastRoundActive=payload.phase==='round';
    if(Number.isFinite(payload.endsAt)&&payload.endsAt>0){state.realtimeFastEndsAt=payload.endsAt;state.fastRoundTime=Math.max(0,Math.ceil((payload.endsAt-Date.now())/1000));}
    else {state.realtimeFastEndsAt=null;if(payload.phase==='results')state.fastRoundTime=0;}
  } else {
    if(Number.isFinite(payload.questionIndex)) state.quiz=Number(payload.questionIndex)||0;
    if(typeof payload.revealed==='boolean')state.quizRevealed=payload.revealed;
    if(Number.isFinite(payload.endsAt)&&payload.endsAt>0){state.realtimeQuizEndsAt=payload.endsAt;state.quizTime=Math.max(0,Math.ceil((payload.endsAt-Date.now())/1000));}
    else {state.realtimeQuizEndsAt=null;if(payload.phase==='results')state.quizTime=0;}
  }
  render();
}
 if(type==='answer-submitted'){ state.realtimeAnswers=[...(state.realtimeAnswers||[]),payload]; if(payload&&payload.name&&!state.fastResponses.some(r=>r.name===payload.name)&&payload.answer&&payload.answer.type==='fastest-finger'){state.fastResponses=[...state.fastResponses,{name:payload.name,time:(Number(payload.elapsedMs)||0)/1000}];} toast('A student submitted an answer.'); render(); }
 if(type==='score-update' && payload){ if(payload.participantId)state.realtimeScores={...(state.realtimeScores||{}),[payload.participantId]:Number(payload.score)||0}; state.realtimeLeaderboard=payload.leaderboard||[]; render(); }
 if(type==='session-ended'){state.teacherSessionActive=false;state.studentJoined=false;state.studentLocalPreview=false;toast('The teacher has ended this classroom session.');render();}
}
async function syncRealtimeActivity(activityState){
 if(!REALTIME_URL||!state.session||!realtimeTeacherToken)return;
 try{await realtimeRequest(`/api/sessions/${encodeURIComponent(state.session)}/state`,{method:'POST',headers:{'x-session-token':realtimeTeacherToken},body:JSON.stringify({activityState})});}catch(err){console.warn('Realtime activity state:',err.message);}
}
async function submitRealtimeAnswer(questionId,answer,elapsedMs=null){
 if(!REALTIME_URL||!state.studentCode||!realtimeParticipantId||!realtimeParticipantToken)return false;
 try{await realtimeRequest(`/api/sessions/${encodeURIComponent(state.studentCode)}/answers`,{method:'POST',headers:{'x-participant-token':realtimeParticipantToken},body:JSON.stringify({participantId:realtimeParticipantId,questionId,answer,elapsedMs})});return true;}catch(err){console.warn('Realtime answer:',err.message);return false;}
}
async function saveRealtimeScore(participantId,scoring={}){
 if(!REALTIME_URL||!state.session||!realtimeTeacherToken)return false;
 const payload={participantId,...scoring};
 try{await realtimeRequest(`/api/sessions/${encodeURIComponent(state.session)}/scores`,{method:'POST',headers:{'x-session-token':realtimeTeacherToken},body:JSON.stringify(payload)});return true;}catch(err){console.warn('Realtime score:',err.message);return false;}
}
async function createRealtimeSession(activity){
 if(!REALTIME_URL)return null;
 const data=await realtimeRequest('/api/sessions',{method:'POST',body:JSON.stringify({activity})});
 realtimeTeacherToken=data.teacherToken; state.realtimeBackend=true; state.realtimeParticipantCount=0; state.realtimeAnswers=[]; state.realtimeScores={}; state.realtimeLeaderboard=[];
 await connectRealtimeStream(data.session.code,realtimeTeacherToken);
 return data.session;
}
const SESSION_CODE_LENGTH=6;
const SESSION_CODE_ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const SESSION_CODE_MAX_ATTEMPTS=1000;
function sessionRegistry(){window.classroomSessions=window.classroomSessions||new Map();return window.classroomSessions;}
function secureRandomUint32(){const bytes=new Uint32Array(1);if(window.crypto&&typeof window.crypto.getRandomValues==='function'){window.crypto.getRandomValues(bytes);return bytes[0];}return Math.floor(Math.random()*0x100000000);}
function secureSessionCode(){let code='';for(let i=0;i<SESSION_CODE_LENGTH;i++)code+=SESSION_CODE_ALPHABET[secureRandomUint32()%SESSION_CODE_ALPHABET.length];return code;}
function createUniqueSessionCode(registry){for(let attempt=0;attempt<SESSION_CODE_MAX_ATTEMPTS;attempt++){const code=secureSessionCode();if(!registry.has(code))return code;}throw new Error('Unable to allocate a unique classroom session code.');}
function createSessionRecord(activity,registry){const code=createUniqueSessionCode(registry);const sessionId=(window.crypto&&typeof window.crypto.randomUUID==='function')?window.crypto.randomUUID():'local-'+Date.now()+'-'+secureRandomUint32().toString(36);const record={id:sessionId,code,activity,status:'active',createdAt:Date.now()};registry.set(code,record);return record;}
function resetSessionScopedState(){
 state.team={name:'',members:2,names:[],roles:[],responsibilities:[],scenario:0,saved:false,editing:false};
 state.teams=[];
 state.teamEditIndex=-1;
 state.assessments={};
 state.assessmentTeamIndex=0;
 state.scores=Array(10).fill(0);
 state.studentJoined=false;
 state.studentCode='';
 state.studentName='';
 state.studentLocalPreview=false;
 state.studentQuizSelected=null;
 state.studentQuizSubmitted=false;
}
async function newSession(activity='quiz'){
 const registry=sessionRegistry();
 if(state.session){const previous=registry.get(state.session);if(previous)previous.status='ended';registry.delete(state.session);}
 resetSessionScopedState();
 if(activity==='quiz')createQuizOrders();
 if(activity==='restaurant-game')createGameOrders();
 let record;
 try{
  const remote=await createRealtimeSession(activity);
  if(remote){ record={id:remote.sessionId,code:remote.code,activity:remote.activity,status:remote.status,createdAt:remote.createdAt}; registry.set(record.code,record); }
 }catch(err){
  state.realtimeBackend=false;
  const msg=err.message==='REALTIME_BACKEND_NOT_CONFIGURED'?'Realtime backend is not configured for this deployment. Using local preview.':'Realtime backend unavailable. Using local preview.';
  toast(msg);
 }
 if(!record){record=createSessionRecord(activity,registry);record.data={participants:[],answers:[],scores:{},teams:[],createdBy:'teacher-local-preview'};}
 const c=record.code;
 const sessionId=record.id;
 state.session=c;
 state.teacherActivity=activity;
 state.teacherSessionActive=true;
 state.teacherSessionStartedAt=record.createdAt;
 state.quiz=0;state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;
 state.fastStudentName='';state.fastRoundActive=false;state.fastResponses=[];state.fastCurrentCorrect=null;state.fastRoundTime=30;state.realtimeFastEndsAt=null;clearInterval(window.fastRoundClock);
 state.game=0;state.gameSelected=[];state.gameRevealed=false;state.gameSubmitted=false;state.gameScore=0;
 if(activity==='fastest'){state.fastSession={code:c,sessionId};}else{state.fastSession=null;}
 if(activity==='restaurant-game'){state.gameSession={code:c,sessionId};}else{state.gameSession=null;}
 toast('New classroom session created: '+c);render()
}
async function endSession(){
 const code=state.session;
 const registry=sessionRegistry();
 if(code){const record=registry.get(code);if(record)record.status='ended';registry.delete(code);if(REALTIME_URL&&realtimeTeacherToken){try{await realtimeRequest(`/api/sessions/${encodeURIComponent(code)}/end`,{method:'POST',headers:{'x-session-token':realtimeTeacherToken}})}catch(err){console.warn('Realtime end:',err.message);}}}
 closeRealtimeStream();realtimeTeacherToken='';state.realtimeBackend=false;state.realtimeParticipantCount=0;state.realtimeAnswers=[];state.realtimeScores={};state.realtimeLeaderboard=[];state.realtimeQuizEndsAt=null;state.session=null;state.teacherSessionActive=false;state.teacherSessionStartedAt=0;
 state.fastSession=null;state.fastRoundActive=false;state.fastResponses=[];state.fastCurrentCorrect=null;state.fastStudentName='';
 state.gameSession=null;state.gameSelected=[];state.gameRevealed=false;state.gameSubmitted=false;state.gameScore=0;
 state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;
 resetSessionScopedState();
 toast(code?'Classroom session ended: '+code:'No classroom session is active.');render()
}
async function teacherLaunch(activity){
 if(['quiz','fastest','restaurant-game','team'].includes(activity)){
  await newSession(activity);
  if(activity==='team')go('team');
  return;
 }
 if(activity==='assessment')go('assessment');
 else if(activity==='leaderboard')go('leaderboard')
}
async function join(){
 const c=(document.getElementById('joinCode').value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
 const n=(document.getElementById('joinName').value||'').trim();
 if(c.length!==6)return toast('Enter the 6-character class code.');
 if(!n)return toast('Enter your name.');
 let local=false;
 try{
  if(REALTIME_URL){
   const data=await realtimeRequest(`/api/sessions/${encodeURIComponent(c)}`,{method:'POST',body:JSON.stringify({role:'student',name:n})});
   realtimeParticipantId=data.participantId; realtimeParticipantToken=data.participantToken; state.realtimeBackend=true;
   const streamConnected=await connectRealtimeStream(c,realtimeParticipantToken,realtimeParticipantId);
   if(!streamConnected) throw new Error('STREAM_CONNECTION_FAILED');
   if(realtimeHeartbeatTimer) clearInterval(realtimeHeartbeatTimer);
   const heartbeat=async()=>{
    if(!REALTIME_URL||!realtimeParticipantId||!realtimeParticipantToken)return;
    try{await realtimeRequest(`/api/sessions/${encodeURIComponent(c)}/participants/${encodeURIComponent(realtimeParticipantId)}/heartbeat`,{method:'POST',headers:{'x-participant-token':realtimeParticipantToken}});}
    catch(err){console.warn('Realtime heartbeat:',err.message);}
   };
   await heartbeat();
   realtimeHeartbeatTimer=setInterval(heartbeat,25000);
  }else{
   const record=sessionRegistry().get(c);
   if(!record)throw new Error('SESSION_NOT_FOUND');
   if(record.status!=='active')throw new Error('SESSION_ENDED');
   local=Boolean(state.teacherSessionActive&&state.session===c);
   if(!local)throw new Error('WRONG_LOCAL_SESSION');
  }
 }catch(err){
  if(err.message==='SESSION_NOT_FOUND'||err.message==='SESSION_ENDED')return toast('That classroom session is not active. Ask the teacher for the current code.');
  if(err.message==='WRONG_LOCAL_SESSION')return toast('That code belongs to a different local classroom session.');
  return toast('Unable to join the realtime classroom. Check the code and connection.');
 }
 state.studentJoined=true;state.studentCode=c;state.studentName=n;state.fastStudentName=n;state.studentQuizSelected=null;state.studentQuizSubmitted=false;state.studentLocalPreview=local;
 toast(`${n} joined the ${local?'local classroom preview':'classroom session'}.`);
 render();
}
function render(){
 const views={
  home,
  history:historyView,
  quiz:quizView,
  vocab:vocabView,
  fastest:fastestView,
  'fastest-student':fastestStudentView,
  restaurant:restaurantView,
  'restaurant-game-student':restaurantGameStudentView,
  'restaurant-game':restaurantGame,
  build:buildView,
  experience:experienceView,
  scenarios:scenariosView,
  'scenario-detail':scenarioDetailView,
  roleplay:roleplayView,
  team:teamView,
  assessment:assessmentView,
  leaderboard,
  teacher,
  student,
  'student-quiz':studentQuizView,
  projector,
  podium:podiumView
 };
 const fn=views[state.view]||home;
 fn();
}

document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&state.presentation){state.presentation=false;document.body.classList.remove('presentation-mode');render();}});
document.addEventListener('keydown',e=>{if(!state.presentation)return;if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();nextSlide(1)}if(e.key==='ArrowLeft'){e.preventDefault();nextSlide(-1)}if(e.key==='Escape'){state.presentation=false;document.body.classList.remove('presentation-mode')}});
function nextSlide(dir){if(state.view==='history')state.history=(state.history+dir+historySlides.length)%historySlides.length;else if(state.view==='vocab'){state.vocab=(state.vocab+dir+vocab.length)%vocab.length;state.vocabReveal=false;}else if(state.view==='restaurant'){state.restaurant=(state.restaurant+dir+restaurant.length)%restaurant.length;state.restaurantReveal=false;}else if(state.view==='experience')state.experience=(state.experience+dir+experience.length)%experience.length;else if(state.view==='build')state.buildStep=(state.buildStep+dir+buildSteps.length)%buildSteps.length;else if(state.view==='quiz'){state.quiz=(state.quiz+dir+quiz.length)%quiz.length;state.quizSelected=null;state.quizRevealed=false;state.quizTime=30;}else if(state.view==='fastest')state.fastest=(state.fastest+dir+vocab.length)%vocab.length;else if(state.view==='restaurant-game'){state.game=(state.game+dir+situations.length)%situations.length;state.gameSelected=[];state.gameSubmitted=false;state.gameRevealed=false;}render()}
state.vocabReveal=false;state.restaurantReveal=false;render();
