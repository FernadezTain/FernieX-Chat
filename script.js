// ════════════════════════════════════════
// STORAGE
// ════════════════════════════════════════
const DB={
  get(k){try{return JSON.parse(localStorage.getItem(k))}catch{return null}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){console.warn(e)}},
  del(k){localStorage.removeItem(k)},
};
const COLORS=['#6d28d9','#0e7490','#be185d','#0369a1','#7e22ce','#b45309','#15803d','#1d4ed8'];
function getAccounts(){return DB.get('nc_accounts')||{}}
function saveAccounts(a){DB.set('nc_accounts',a)}
function getCurrentUser(){return DB.get('nc_current')}
function setCurrentUser(u){DB.set('nc_current',u)}
function hashPass(p){let h=0;for(let i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0;}return h.toString(36);}
function nickColor(n){let h=0;for(const c of n){h=(h+c.charCodeAt(0))%COLORS.length;}return COLORS[h];}

// ════════════════════════════════════════
// FULL EMOJI DATABASE WITH CATEGORIES
// ════════════════════════════════════════
const EMOJI_CATS = [
  {
    id:'recent', icon:'🕐', label:'Недавние',
    emojis:[]
  },
  {
    id:'faces', icon:'😀', label:'Смайлы и эмоции',
    emojis:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫠','🤐','🥴','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🫨','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','🫤','😟','🙁','☹️','😮‍💨','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾']
  },
  {
    id:'hands', icon:'👋', label:'Жесты и руки',
    emojis:['👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','🫷','🫸','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🫶','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👁️','👅','👄','🫦','💋']
  },
  {
    id:'people', icon:'👤', label:'Люди',
    emojis:['👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','👮','🕵️','💂','🥷','👷','🫅','🤴','👸','👳','👲','🧕','🤵','👰','🤰','🫃','🫄','🤱','👼','🎅','🤶','🧑‍🎄','🦸','🦹','🧙','🧚','🧛','🧜','🧝','🧞','🧟','🧌','💆','💇','🚶','🧍','🧎','🏃','💃','🕺','🕴️','👯','🧖','🧗','🏌️','🏇','🧘','🏄','🚣','🧜','🏊','⛹️','🏋️','🚴','🤸','🤼','🤺','🤾','🏊','🤽','🧩','🛹','🛼']
  },
  {
    id:'animals', icon:'🐶', label:'Животные и природа',
    emojis:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪲','🦟','🦗','🪳','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🪸','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🦭','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿️','🦔','🐾','🐉','🐲','🌵','🎄','🌲','🌳','🌴','🪵','🌱','🌿','☘️','🍀','🎍','🎋','🍃','🍂','🍁','🍄','🐚','🪨','🌾','💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌟','⭐','🌠','🌌','☀️','🌤️','⛅','🌥️','🌦️','🌧️','⛈️','🌩️','🌨️','❄️','☃️','⛄','🌬️','💨','💧','💦','🫧','🌊','🌫️','🌈','⚡','🌀','🌪️','🌡️','☄️','🔥','💥']
  },
  {
    id:'food', icon:'🍎', label:'Еда и напитки',
    emojis:['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧄','🧅','🥔','🍠','🫘','🥜','🌰','🍞','🥐','🥖','🫓','🥨','🥯','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫔','🌮','🌯','🥙','🧆','🥚','🍜','🍝','🍛','🍲','🫕','🍣','🍱','🥟','🦪','🍤','🍙','🍘','🍥','🥮','🍢','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🧃','🥤','🧋','☕','🍵','🫖','🍶','🍺','🍻','🥂','🍷','🫗','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🍽️','🥣','🥗','🥘']
  },
  {
    id:'travel', icon:'✈️', label:'Путешествия и места',
    emojis:['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🛵','🏍️','🛺','🚲','🛴','🛹','🛼','🚏','🛣️','🛤️','⛽','🚨','🚥','🚦','🛑','🚧','⚓','🛟','⛵','🛶','🚤','🛳️','⛴️','🛥️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🛸','🚀','🛰️','🪐','💫','⭐','🌟','✨','⚡','🌈','🌤️','☁️','🌧️','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🧱','🪨','🪵','🛖','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','🕋','⛩️','🗾','🎑','🎠','🎡','🎢','💈','🎪','🛎️','🧳','🌅','🌄','🌠','🎇','🎆','🌇','🌆','🏙️','🌃','🌌','🌉','🌁']
  },
  {
    id:'activity', icon:'⚽', label:'Деятельность и спорт',
    emojis:['⚽','🏀','🏈','⚾','🥎','🏐','🏉','🥏','🎾','🪃','🏸','🏒','🏑','🥍','🏓','🏏','🪁','🥅','⛳','🪄','🛝','🎽','🎿','🛷','🥌','🎯','🎱','🔮','🪬','🎮','🕹️','🎲','♟️','🎭','🎨','🖼️','🎰','🚂','🎪','🎤','🎧','🎼','🎹','🪘','🥁','🎷','🎺','🎸','🪕','🎻','🪗','🎬','🎥','📽️','🎞️','📞','📺','📷','📸','🔭','🔬','🕯️','💡','🔦','🏮','🪔','📔','📕','📖','📗','📘','📙','📚','📓','📒','📃','📜','📄','📰','🗞️','📑','🔖','🏷️','💰','🪙','💴','💵','💶','💷','💸','💳','🪤','💹','✉️','📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳️']
  },
  {
    id:'objects', icon:'💡', label:'Объекты',
    emojis:['⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','💽','💾','💿','📀','📷','📸','📹','📼','📞','☎️','📟','📠','📺','📻','🧭','⏱️','⏲️','⏰','🕰️','⌛','⏳','📡','🔋','🪫','🔌','💡','🔦','🕯️','🪔','🗑️','🔧','🪛','🔨','⚒️','🛠️','⛏️','⚙️','🗜️','⚖️','🪝','🔗','⛓️','🪤','🧰','🪜','🔩','🪣','🧲','🔑','🗝️','🔐','🔒','🔓','🔏','🔎','🔍','🗺️','🌐','🧿','📿','🏷️','💎','🔮','🪩','🧸','🪆','🗿','🗺️','🌡️','🧪','🧫','🧬','🔭','📡','💊','🩺','🩻','🩹','🩼','🩺','💉','🩸','🧴','🪥','🧹','🧺','🧻','🪣','🧼','🫧','🪒','🧽','🪤','🧯','🛒','🪑','🚪','🛏️','🛋️','🪞','🪟','🛁','🪠','🚿','🪤','🧹','🪜','🪴','🖼️','🪞','🛏️']
  },
  {
    id:'symbols', icon:'❤️', label:'Символы',
    emojis:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭','❗','❕','❓','❔','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯','💹','❎','🌐','💠','Ⓜ️','🌀','💤','🏧','🚾','♿','🅿️','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','⚧️','🚻','🚮','🎦','📶','🈁','🔣','ℹ️','🔤','🔡','🔠','🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔢','⏏️','▶️','⏸️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','◀️','🔼','🔽','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔀','🔁','🔂','🔃','🔄','🔙','🔚','🔛','🔜','🔝','🔰','🔱','📛','🔲','🔳','▪️','▫️','◾','◽','◼️','◻️','🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🔶','🔷','🔸','🔹','🔺','🔻','💠','🔘','🔲','🔳']
  },
  {
    id:'flags', icon:'🏳️', label:'Флаги',
    emojis:['🏳️','🏴','🏴‍☠️','🏁','🚩','🏳️‍🌈','🏳️‍⚧️','🇺🇳','🏴‍☠️','🇦🇫','🇦🇱','🇩🇿','🇦🇩','🇦🇴','🇦🇷','🇦🇲','🇦🇺','🇦🇹','🇦🇿','🇧🇸','🇧🇭','🇧🇩','🇧🇧','🇧🇾','🇧🇪','🇧🇿','🇧🇯','🇧🇹','🇧🇴','🇧🇦','🇧🇼','🇧🇷','🇧🇳','🇧🇬','🇧🇫','🇧🇮','🇰🇭','🇨🇲','🇨🇦','🇨🇻','🇨🇫','🇹🇩','🇨🇱','🇨🇳','🇨🇴','🇰🇲','🇨🇬','🇨🇩','🇨🇷','🇨🇮','🇭🇷','🇨🇺','🇨🇾','🇨🇿','🇩🇰','🇩🇯','🇩🇴','🇪🇨','🇪🇬','🇸🇻','🇬🇶','🇪🇷','🇪🇪','🇸🇿','🇪🇹','🇫🇯','🇫🇮','🇫🇷','🇬🇦','🇬🇲','🇬🇪','🇩🇪','🇬🇭','🇬🇷','🇬🇹','🇬🇳','🇬🇼','🇬🇾','🇭🇹','🇭🇳','🇭🇺','🇮🇸','🇮🇳','🇮🇩','🇮🇷','🇮🇶','🇮🇪','🇮🇱','🇮🇹','🇯🇲','🇯🇵','🇯🇴','🇰🇿','🇰🇪','🇰🇵','🇰🇷','🇽🇰','🇰🇼','🇰🇬','🇱🇦','🇱🇻','🇱🇧','🇱🇸','🇱🇷','🇱🇾','🇱🇮','🇱🇹','🇱🇺','🇲🇬','🇲🇼','🇲🇾','🇲🇻','🇲🇱','🇲🇹','🇲🇷','🇲🇺','🇲🇽','🇫🇲','🇲🇩','🇲🇨','🇲🇳','🇲🇪','🇲🇦','🇲🇿','🇲🇲','🇳🇦','🇳🇵','🇳🇱','🇳🇿','🇳🇮','🇳🇪','🇳🇬','🇲🇰','🇳🇴','🇴🇲','🇵🇰','🇵🇼','🇵🇦','🇵🇬','🇵🇾','🇵🇪','🇵🇭','🇵🇱','🇵🇹','🇶🇦','🇷🇴','🇷🇺','🇷🇼','🇸🇦','🇸🇳','🇷🇸','🇸🇱','🇸🇬','🇸🇰','🇸🇮','🇸🇧','🇸🇴','🇿🇦','🇸🇸','🇪🇸','🇱🇰','🇸🇩','🇸🇷','🇸🇪','🇨🇭','🇸🇾','🇹🇼','🇹🇯','🇹🇿','🇹🇭','🇹🇱','🇹🇬','🇹🇴','🇹🇹','🇹🇳','🇹🇷','🇹🇲','🇺🇬','🇺🇦','🇦🇪','🇬🇧','🇺🇸','🇺🇾','🇺🇿','🇻🇺','🇻🇪','🇻🇳','🇾🇪','🇿🇲','🇿🇼']
  }
];

let recentEmojis = JSON.parse(localStorage.getItem('nc_recent_emoji') || '[]');
let currentEmojiCat = 'faces';
let emojiSearchQuery = '';

function addRecentEmoji(emoji) {
  recentEmojis = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 40);
  localStorage.setItem('nc_recent_emoji', JSON.stringify(recentEmojis));
  EMOJI_CATS[0].emojis = recentEmojis;
}

// ════════════════════════════════════════
// AUTH
// ════════════════════════════════════════
let currentUser = null;
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',i===(tab==='login'?0:1)));
  document.getElementById('login-form').style.display=tab==='login'?'':'none';
  document.getElementById('register-form').style.display=tab==='register'?'':'none';
  clearError();
}
function showError(msg){const el=document.getElementById('auth-error');el.textContent=msg;el.classList.add('show');}
function clearError(){document.getElementById('auth-error').classList.remove('show');}
function togglePass(id,btn){
  const el=document.getElementById(id);
  el.type=el.type==='password'?'text':'password';
  const ic=btn.querySelector('.ic-eye');
  if(ic)ic.style.opacity=el.type==='text'?'1':'.55';
}
function doLogin(){
  const nick=document.getElementById('login-nick').value.trim().replace('@','');
  const pass=document.getElementById('login-pass').value;
  if(!nick||!pass){showError('Заполни все поля');return;}
  const accounts=getAccounts();
  const hint=document.getElementById('no-accounts-hint');
  if(Object.keys(accounts).length===0){if(hint)hint.style.display='block';showError('Аккаунт не найден');return;}
  if(hint)hint.style.display='none';
  if(!accounts[nick]){showError('Аккаунт не найден');return;}
  if(accounts[nick].passHash!==hashPass(pass)){showError('Неверный пароль');return;}
  loginSuccess(accounts[nick]);
}
function doRegister(){
  const name=document.getElementById('reg-name').value.trim();
  const nick=document.getElementById('reg-nick').value.trim().replace('@','').replace(/\s/g,'');
  const pass=document.getElementById('reg-pass').value;
  if(!name||!nick||!pass){showError('Заполни все поля');return;}
  if(nick.length<2){showError('Никнейм минимум 2 символа');return;}
  if(pass.length<4){showError('Пароль минимум 4 символа');return;}
  if(!/^[a-zA-Zа-яА-Я0-9_]+$/.test(nick)){showError('Никнейм: буквы, цифры, _');return;}
  const accounts=getAccounts();
  if(accounts[nick]){showError('Никнейм занят');return;}
  const user={name,nick,passHash:hashPass(pass),color:nickColor(nick),createdAt:Date.now()};
  accounts[nick]=user;saveAccounts(accounts);loginSuccess(user);
}
function loginSuccess(user){
  currentUser=user;setCurrentUser(user);clearError();
  updateProfileUI();updateMainAvatar();loadChatsList();showScreen('main-screen');
}
function doLogout(){
  currentUser=null;DB.del('nc_current');
  if(peer){try{peer.destroy();}catch{}}
  peer=null;conn=null;currentRoom=null;showScreen('auth-screen');
}
function deleteAccount(){
  if(!confirm('Удалить аккаунт навсегда?'))return;
  const accounts=getAccounts();delete accounts[currentUser.nick];saveAccounts(accounts);doLogout();
}

// ════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════
let currentScreen='auth-screen';
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  currentScreen=id;
}
function goBack(){hideProfileOverlay();showScreen('main-screen');}
function goBackFromProfile(){
  hideProfileOverlay();
  document.querySelectorAll('.nav-item').forEach((n,i)=>n.classList.toggle('active',i===0));
}
function switchNav(tab){
  document.querySelectorAll('.nav-item').forEach((n,i)=>n.classList.toggle('active',(tab==='chats'&&i===0)||(tab==='profile'&&i===1)));
  if(tab==='profile'){updateProfileUI();showProfileOverlay();}else{hideProfileOverlay();}
}
function showProfileOverlay(){const el=document.getElementById('profile-screen');el.classList.remove('hidden');el.style.zIndex='10';}
function hideProfileOverlay(){document.getElementById('profile-screen').classList.add('hidden');}
function updateProfileUI(){
  if(!currentUser)return;
  const u=currentUser;
  document.getElementById('prof-avatar-big').textContent=u.name[0].toUpperCase();
  document.getElementById('prof-avatar-big').style.background=`linear-gradient(135deg,${u.color||'#6d28d9'},#1d4ed8)`;
  document.getElementById('prof-name').textContent=u.name;
  document.getElementById('prof-username').textContent='@'+u.nick;
  document.getElementById('prof-name-val').textContent=u.name;
  document.getElementById('prof-nick-val').textContent='@'+u.nick;
}
function updateMainAvatar(){
  if(!currentUser)return;
  const el=document.getElementById('main-avatar');
  el.textContent=currentUser.name[0].toUpperCase();
  el.style.background=`linear-gradient(135deg,${currentUser.color||'#6d28d9'},#1d4ed8)`;
}

// ════════════════════════════════════════
// CHATS LIST
// ════════════════════════════════════════
let savedChats=[];
function loadChatsList(){savedChats=DB.get('nc_chats_'+currentUser.nick)||[];renderChatsList();}
function saveChatsList(){DB.set('nc_chats_'+currentUser.nick,savedChats);}
function renderChatsList(filter=''){
  const list=document.getElementById('chats-list');
  const empty=document.getElementById('empty-state');
  const filtered=filter?savedChats.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase())):savedChats;
  if(filtered.length===0){list.innerHTML='';list.appendChild(empty);empty.style.display='flex';return;}
  empty.style.display='none';list.innerHTML='';
  filtered.slice().reverse().forEach((chat,i)=>{
    const div=document.createElement('div');
    div.className='chat-item';div.style.animationDelay=(i*.04)+'s';div.onclick=()=>openChat(chat);
    const color=nickColor(chat.name);
    const unread=chat.unread>0?`<span class="chat-item-badge">${chat.unread}</span>`:'';
    const preview=chat.lastMsg==='[фото]'
      ?`<span style="display:inline-flex;align-items:center;gap:4px;color:var(--violet)"><span class="ic ic-image" style="width:12px;height:12px"></span>Фото</span>`
      :esc(chat.lastMsg||'Нет сообщений');
    div.innerHTML=`
      <div class="avatar" style="width:52px;height:52px;background:linear-gradient(135deg,${color},#1d4ed8);flex-shrink:0;">${chat.name[0].toUpperCase()}</div>
      <div class="chat-item-info">
        <div class="chat-item-top">
          <span class="chat-item-name">${esc(chat.name)}</span>
          <span class="chat-item-time">${chat.lastTime||''}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="chat-item-preview">${preview}</span>${unread}
        </div>
      </div>`;
    list.appendChild(div);
  });
}
function filterChats(){renderChatsList(document.getElementById('search-input').value);}
function addOrUpdateChat(roomId,name,lastMsg,time){
  let chat=savedChats.find(c=>c.roomId===roomId);
  if(!chat){chat={roomId,name,lastMsg,lastTime:time,unread:0};savedChats.push(chat);}
  else{chat.lastMsg=lastMsg;chat.lastTime=time;}
  saveChatsList();renderChatsList();
}

// ════════════════════════════════════════
// PEER
// ════════════════════════════════════════
let peer=null,conn=null,currentRoom=null,typingTimer=null,isTyping=false;
const PEER_CONFIG={debug:0,config:{iceServers:[
  {urls:'stun:stun.l.google.com:19302'},
  {urls:'stun:stun1.l.google.com:19302'},
  {urls:'stun:global.stun.twilio.com:3478'}
]}};
function initPeer(id){
  return new Promise((res,rej)=>{
    if(peer){try{peer.destroy();}catch{}}
    const p=id?new Peer('nexchat-'+id,PEER_CONFIG):new Peer(PEER_CONFIG);
    let ok=false;
    p.on('open',()=>{ok=true;res(p);});
    p.on('error',e=>{
      if(!ok){ok=true;rej(e);}
      else if(e.type==='peer-unavailable')showToast('Комната не найдена');
      else if(['network','socket-error','server-error'].includes(e.type))showToast('Ошибка сети');
    });
    setTimeout(()=>{if(!ok){ok=true;rej(new Error('Timeout'));}},15000);
  });
}

// ════════════════════════════════════════
// ROOM MODAL
// ════════════════════════════════════════
function openRoomModal(){
  setModalContent(`
    <div class="modal-title">Новый чат</div>
    <div class="room-option" onclick="showCreateRoom()">
      <div class="room-option-icon-wrap"><span class="ic ic-home" style="width:26px;height:26px"></span></div>
      <div class="room-option-info"><h3>Создать комнату</h3><p>Получи код и пригласи друга</p></div>
    </div>
    <div class="room-option" onclick="showJoinRoom()">
      <div class="room-option-icon-wrap"><span class="ic ic-rocket" style="width:26px;height:26px"></span></div>
      <div class="room-option-info"><h3>Войти по коду</h3><p>Введи код от друга</p></div>
    </div>
    <button class="modal-btn outline" onclick="closeModal()">Отмена</button>
  `);openModal();
}
async function showCreateRoom(){
  setModalContent(`<div class="modal-title">Создание комнаты</div><div class="connecting-state"><div class="css-spinner"></div><p>Создаём комнату...</p></div>`);
  const code=Math.random().toString(36).slice(2,8).toUpperCase();
  try{
    peer=await initPeer(code);
    peer.on('disconnected',()=>{try{peer.reconnect();}catch{}});
    peer.on('connection',c=>{if(conn){try{conn.close();}catch{}}conn=c;setupConn(c,code);});
    setModalContent(`
      <div class="modal-title">Комната создана!</div>
      <div class="code-display" onclick="copyCode('${code}')">
        <div class="code-label"><span class="ic ic-copy" style="width:14px;height:14px"></span>Нажми скопировать</div>
        <div class="code-val">${code}</div>
        <div class="code-hint">Отправь другу — он введёт и подключится</div>
      </div>
      <div class="connecting-state"><div class="css-spinner"></div><p>Ожидаем друга...</p></div>
      <button class="modal-btn outline" onclick="cancelRoom()">Отменить</button>
    `);currentRoom={code,role:'host',peerName:'?'};
  }catch(e){
    setModalContent(`<div class="modal-title">Ошибка</div><p style="color:#fca5a5;text-align:center;padding:10px">${esc(e.message||'Не удалось')}</p><button class="modal-btn" onclick="showCreateRoom()">Повторить</button><button class="modal-btn outline" style="margin-top:8px" onclick="closeModal()">Отмена</button>`);
  }
}
function showJoinRoom(){
  setModalContent(`
    <div class="modal-title">Войти по коду</div>
    <div class="form-group" style="margin-top:4px">
      <label class="form-label">Код комнаты</label>
      <input class="form-input" id="join-code-input" placeholder="XXXXXX" maxlength="20"
        style="text-align:center;font-size:26px;font-weight:800;letter-spacing:6px;"
        oninput="this.value=this.value.toUpperCase()"
        autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false">
    </div>
    <button class="modal-btn green" onclick="doJoinRoom()">Подключиться</button>
    <button class="modal-btn outline" style="margin-top:8px" onclick="openRoomModal()">Назад</button>
  `);
  setTimeout(()=>{const inp=document.getElementById('join-code-input');if(inp)inp.focus();},350);
}
async function doJoinRoom(){
  const inp=document.getElementById('join-code-input');if(!inp)return;
  const code=inp.value.trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
  if(code.length<4){showToast('Введи код комнаты');return;}
  setModalContent(`<div class="modal-title">Подключение...</div><div class="connecting-state"><div class="css-spinner"></div><p>Ищем комнату<br><b style="font-size:24px;letter-spacing:5px;background:linear-gradient(135deg,#c4b5fd,#f9a8d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${code}</b></p></div>`);
  try{
    peer=await initPeer();
    peer.on('disconnected',()=>{try{peer.reconnect();}catch{}});
    const c=peer.connect('nexchat-'+code,{reliable:true});
    conn=c;currentRoom={code,role:'guest',peerName:'?'};setupConn(c,code);
    setTimeout(()=>{
      if(currentScreen!=='chat-screen'){
        if(conn){try{conn.close();}catch{}}
        if(peer){try{peer.destroy();}catch{}}
        conn=null;peer=null;currentRoom=null;
        setModalContent(`<div class="modal-title">Не удалось</div><p style="color:#fca5a5;text-align:center;padding:10px">Комната не найдена или хост офлайн.</p><button class="modal-btn green" onclick="showJoinRoom()">Попробовать снова</button><button class="modal-btn outline" style="margin-top:8px" onclick="closeModal()">Закрыть</button>`);
      }
    },12000);
  }catch(e){
    setModalContent(`<div class="modal-title">Ошибка</div><p style="color:#fca5a5;text-align:center;padding:10px">${esc(e.message||String(e))}</p><button class="modal-btn outline" onclick="showJoinRoom()">Назад</button>`);
  }
}
function setupConn(c,code){
  c.on('open',()=>{
    const hello={type:'hello',name:currentUser.name,nick:currentUser.nick,color:currentUser.color};
    try{c.send(hello);}catch{}
    if(currentRoom&&currentRoom.role==='host')setTimeout(()=>{try{c.send(hello);}catch{}},400);
  });
  c.on('data',d=>{try{handleData(d);}catch(e){console.warn(e);}});
  c.on('close',()=>handleDisconnect());
  c.on('error',()=>handleDisconnect());
}
function handleDisconnect(){
  if(currentRoom&&currentRoom._dc)return;
  if(currentRoom)currentRoom._dc=true;
  addSysMsg('Собеседник отключился');
  const s=document.getElementById('chat-header-status');
  if(s){s.innerHTML='<span style="width:6px;height:6px;background:var(--danger);border-radius:50%;display:inline-block;box-shadow:0 0 6px var(--danger)"></span>офлайн';s.style.color='var(--danger)';}
}
function openChatFromRoom(){
  if(!currentRoom)return;
  const name=currentRoom.peerName||'Собеседник';
  const color=currentRoom.peerColor||'#6d28d9';
  document.getElementById('chat-header-name').textContent=name;
  const s=document.getElementById('chat-header-status');
  s.style.color='var(--violet)';
  s.innerHTML='<span class="status-dot-live"></span>онлайн';
  const av=document.getElementById('chat-avatar');
  av.textContent=name[0].toUpperCase();
  av.style.background=`linear-gradient(135deg,${color},#1d4ed8)`;
  document.getElementById('chat-messages').innerHTML='';
  addSysMsg('Соединение установлено — пишите!');
  showScreen('chat-screen');
  addOrUpdateChat(currentRoom.code,name,'',nowTime());
  setTimeout(()=>{const ta=document.getElementById('msg-textarea');if(ta)ta.focus();},400);
}
function openChat(chat){
  document.getElementById('chat-header-name').textContent=chat.name;
  const s=document.getElementById('chat-header-status');
  s.innerHTML='не подключено';s.style.color='var(--t3)';
  const av=document.getElementById('chat-avatar');
  av.textContent=chat.name[0].toUpperCase();
  av.style.background=`linear-gradient(135deg,${nickColor(chat.name)},#1d4ed8)`;
  document.getElementById('chat-messages').innerHTML='';
  addSysMsg('Создайте новую комнату или подключитесь по коду');
  currentRoom={code:chat.roomId,peerName:chat.name,role:'viewer'};
  showScreen('chat-screen');
}

// ════════════════════════════════════════
// MESSAGING
// ════════════════════════════════════════
let pendingPhoto=null;
function sendMessage(){
  const ta=document.getElementById('msg-textarea');
  const text=ta.value.trim();
  if(!conn)return;
  if(pendingPhoto){sendPhotoChunked(pendingPhoto,()=>{if(text){doSendText(text,ta);}});return;}
  if(text){doSendText(text,ta);}
}
function doSendText(text,ta){
  const time=nowTime();
  const msg={type:'msg',text,name:currentUser.name,nick:currentUser.nick,color:currentUser.color,time,id:Date.now()};
  try{conn.send(msg);}catch{showToast('Ошибка отправки');return;}
  addMessage(msg,true);
  if(ta){ta.value='';ta.style.height='auto';}
  document.getElementById('send-btn').disabled=true;
  stopTyping();
  addOrUpdateChat(currentRoom.code,currentRoom.peerName,text,time);
}
const CHUNK_SIZE=48000;
function sendPhotoChunked(base64,onDone){
  const time=nowTime();const id='photo_'+Date.now();
  const chunks=[];
  for(let i=0;i<base64.length;i+=CHUNK_SIZE){chunks.push(base64.slice(i,i+CHUNK_SIZE));}
  const total=chunks.length;
  const progressEl=document.getElementById('upload-progress');
  const barEl=document.getElementById('upload-bar');
  progressEl.classList.add('show');barEl.style.width='0%';
  document.getElementById('send-btn').disabled=true;
  let i=0;
  function sendNext(){
    if(!conn){showToast('Соединение потеряно');progressEl.classList.remove('show');return;}
    if(i>=total){
      try{conn.send({type:'photo_end',id,time,name:currentUser.name,nick:currentUser.nick,color:currentUser.color,totalChunks:total});}
      catch{showToast('Ошибка отправки фото');progressEl.classList.remove('show');return;}
      addPhotoMessage(base64,true,time);
      addOrUpdateChat(currentRoom.code,currentRoom.peerName,'[фото]',time);
      clearPhotoPreview();progressEl.classList.remove('show');barEl.style.width='0%';
      if(onDone)onDone();return;
    }
    try{conn.send({type:'photo_chunk',id,index:i,total,data:chunks[i]});}
    catch{showToast('Ошибка отправки фото');progressEl.classList.remove('show');return;}
    barEl.style.width=Math.round(((i+1)/total)*100)+'%';
    i++;
    const delay=conn.bufferSize&&conn.bufferSize>1024*200?50:8;
    setTimeout(sendNext,delay);
  }
  sendNext();
}
const photoBuffers={};
function receiveMessage(msg){
  addMessage(msg,false);hideTyping();
  addOrUpdateChat(currentRoom.code,currentRoom.peerName,msg.text,msg.time||nowTime());
  if(navigator.vibrate&&document.hidden)navigator.vibrate(50);
}
function addMessage(msg,own){
  const c=document.getElementById('chat-messages');if(!c)return;
  const wrap=document.createElement('div');wrap.className='msg-wrap '+(own?'out':'in');
  wrap.innerHTML=`
    ${!own?`<div class="msg-sender-name">${esc(msg.name||'')}</div>`:''}
    <div class="msg-bubble">${esc(msg.text||'').replace(/\n/g,'<br>')}</div>
    <div class="msg-meta">
      <span class="msg-time">${msg.time||nowTime()}</span>
      ${own?`<span class="msg-checks"><span></span><span></span></span>`:''}
    </div>`;
  c.appendChild(wrap);requestAnimationFrame(()=>{c.scrollTop=c.scrollHeight;});
}
function addSysMsg(text){
  const c=document.getElementById('chat-messages');if(!c)return;
  const div=document.createElement('div');div.className='sys-msg';
  div.innerHTML=`<span>${esc(text)}</span>`;c.appendChild(div);
  requestAnimationFrame(()=>{c.scrollTop=c.scrollHeight;});
}
function handleData(d){
  if(!d||!d.type)return;
  if(d.type==='hello'){
    currentRoom.peerName=d.name||'Собеседник';
    currentRoom.peerNick=d.nick||'';
    currentRoom.peerColor=d.color||'#6d28d9';
    closeModal();openChatFromRoom();
  }else if(d.type==='msg'){
    receiveMessage(d);
  }else if(d.type==='photo'){
    receivePhoto(d);
  }else if(d.type==='photo_chunk'){
    if(!photoBuffers[d.id])photoBuffers[d.id]=new Array(d.total);
    photoBuffers[d.id][d.index]=d.data;
  }else if(d.type==='photo_end'){
    const chunks=photoBuffers[d.id];if(!chunks)return;
    const base64=chunks.join('');delete photoBuffers[d.id];
    receivePhoto({data:base64,time:d.time,name:d.name,nick:d.nick,color:d.color});
  }else if(d.type==='typing'){
    showTyping(d.name||'Собеседник');
  }else if(d.type==='stop_typing'){
    hideTyping();
  }
}

// ════════════════════════════════════════
// PHOTO
// ════════════════════════════════════════
function triggerPhotoInput(){
  if(!conn){showToast('Сначала подключись к комнате');return;}
  document.getElementById('photo-input').click();
}
function handlePhotoSelect(event){
  const file=event.target.files[0];if(!file)return;
  if(!file.type.startsWith('image/')){showToast('Выбери изображение');return;}
  if(file.size>20*1024*1024){showToast('Фото слишком большое (макс 20MB)');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      const MAX=900;let w=img.width,h=img.height;
      if(w>MAX||h>MAX){if(w>=h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;}}
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      pendingPhoto=canvas.toDataURL('image/jpeg',0.75);
      document.getElementById('photo-preview-img').src=pendingPhoto;
      document.getElementById('photo-preview').classList.add('show');
      document.getElementById('send-btn').disabled=false;
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);event.target.value='';
}
function clearPhotoPreview(){
  pendingPhoto=null;
  document.getElementById('photo-preview').classList.remove('show');
  document.getElementById('photo-preview-img').src='';
  const ta=document.getElementById('msg-textarea');
  document.getElementById('send-btn').disabled=!ta.value.trim()||!conn;
}
function receivePhoto(msg){
  addPhotoMessage(msg.data,false,msg.time||nowTime(),msg.name);
  hideTyping();
  addOrUpdateChat(currentRoom.code,currentRoom.peerName,'[фото]',msg.time||nowTime());
  if(navigator.vibrate&&document.hidden)navigator.vibrate(50);
}
function addPhotoMessage(base64,own,time,senderName){
  const c=document.getElementById('chat-messages');if(!c)return;
  const wrap=document.createElement('div');wrap.className='msg-wrap '+(own?'out':'in');
  const img=document.createElement('img');
  img.className='msg-photo';img.src=base64;img.alt='Фото';
  img.onclick=()=>openLightbox(base64);
  img.style.opacity='0';img.style.transition='opacity .35s';
  img.onload=()=>{img.style.opacity='1';c.scrollTop=c.scrollHeight;};
  const metaDiv=document.createElement('div');metaDiv.className='msg-meta';
  metaDiv.innerHTML=`<span class="msg-time">${time}</span>${own?`<span class="msg-checks"><span></span><span></span></span>`:''}`;
  if(!own&&senderName){const nd=document.createElement('div');nd.className='msg-sender-name';nd.textContent=senderName;wrap.appendChild(nd);}
  wrap.appendChild(img);wrap.appendChild(metaDiv);
  c.appendChild(wrap);requestAnimationFrame(()=>{c.scrollTop=c.scrollHeight;});
}

// ════════════════════════════════════════
// LIGHTBOX
// ════════════════════════════════════════
function openLightbox(src){document.getElementById('lightbox-img').src=src;document.getElementById('lightbox').classList.add('open');}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');}

// ════════════════════════════════════════
// TYPING
// ════════════════════════════════════════
function handleTyping(){
  const val=document.getElementById('msg-textarea').value;
  document.getElementById('send-btn').disabled=(!val.trim()&&!pendingPhoto)||!conn;
  if(!conn)return;
  if(!isTyping){isTyping=true;try{conn.send({type:'typing',name:currentUser.name});}catch{}}
  clearTimeout(typingTimer);typingTimer=setTimeout(stopTyping,2000);
}
function stopTyping(){
  if(!isTyping)return;isTyping=false;
  try{if(conn)conn.send({type:'stop_typing'});}catch{}
}
function showTyping(name){
  const el=document.getElementById('typing-name');const b=document.getElementById('typing-bubble');
  if(!el||!b)return;
  el.textContent=name+' печатает...';b.classList.add('show');
  clearTimeout(window._th);window._th=setTimeout(hideTyping,3000);
}
function hideTyping(){const b=document.getElementById('typing-bubble');if(b)b.classList.remove('show');}

// ════════════════════════════════════════
// EMOJI PICKER — full with categories
// ════════════════════════════════════════
let emojiPickerBuilt = false;

function buildEmojiPicker() {
  if (emojiPickerBuilt) return;
  emojiPickerBuilt = true;

  const picker = document.getElementById('emoji-picker');

  // Category tabs
  const tabsEl = document.createElement('div');
  tabsEl.className = 'emoji-cats-tabs';
  EMOJI_CATS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'emoji-cat-tab' + (cat.id === currentEmojiCat ? ' active' : '');
    btn.textContent = cat.icon;
    btn.title = cat.label;
    btn.dataset.cat = cat.id;
    btn.onclick = () => switchEmojiCat(cat.id);
    tabsEl.appendChild(btn);
  });
  picker.appendChild(tabsEl);

  // Search
  const searchWrap = document.createElement('div');
  searchWrap.className = 'emoji-search-wrap';
  const searchEl = document.createElement('input');
  searchEl.className = 'emoji-search';
  searchEl.placeholder = '🔍 Поиск эмодзи...';
  searchEl.oninput = e => {
    emojiSearchQuery = e.target.value.trim().toLowerCase();
    renderEmojiGrid();
  };
  searchWrap.appendChild(searchEl);
  picker.appendChild(searchWrap);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'emoji-grid';
  grid.id = 'emoji-grid';
  picker.appendChild(grid);

  // Init recent
  EMOJI_CATS[0].emojis = recentEmojis;

  renderEmojiGrid();
}

function switchEmojiCat(catId) {
  currentEmojiCat = catId;
  emojiSearchQuery = '';
  const searchEl = document.querySelector('.emoji-search');
  if (searchEl) searchEl.value = '';
  document.querySelectorAll('.emoji-cat-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catId);
  });
  renderEmojiGrid();
}

function renderEmojiGrid() {
  const grid = document.getElementById('emoji-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (emojiSearchQuery) {
    // Search across all categories
    const results = [];
    EMOJI_CATS.forEach(cat => {
      cat.emojis.forEach(e => {
        if (!results.includes(e)) results.push(e);
      });
    });
    const filtered = results.filter(e => {
      // Basic filter by visual presence (we can't easily search by name, so just show all)
      return true;
    });
    // For search, show all from all cats (emoji names not available, show everything)
    const allEmojis = [];
    EMOJI_CATS.slice(1).forEach(cat => cat.emojis.forEach(e => { if(!allEmojis.includes(e)) allEmojis.push(e); }));
    allEmojis.forEach(e => {
      const btn = document.createElement('button');
      btn.className = 'emoji-btn-pick';
      btn.textContent = e;
      btn.onclick = () => insertEmoji(e);
      grid.appendChild(btn);
    });
    return;
  }

  const cat = EMOJI_CATS.find(c => c.id === currentEmojiCat);
  if (!cat) return;

  if (cat.emojis.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'color:var(--t3);font-size:13px;padding:16px;text-align:center;width:100%';
    empty.textContent = 'Пока нет недавних эмодзи';
    grid.appendChild(empty);
    return;
  }

  cat.emojis.forEach(e => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn-pick';
    btn.textContent = e;
    btn.onclick = () => insertEmoji(e);
    grid.appendChild(btn);
  });
}

function toggleEmoji() {
  buildEmojiPicker();
  const p = document.getElementById('emoji-picker');
  p.classList.toggle('open');
}

function insertEmoji(e) {
  const ta = document.getElementById('msg-textarea');
  ta.value += e; ta.focus();
  document.getElementById('send-btn').disabled = (!ta.value.trim() && !pendingPhoto) || !conn;
  addRecentEmoji(e);
  document.getElementById('emoji-picker').classList.remove('open');
}

// ════════════════════════════════════════
// MODAL HELPERS
// ════════════════════════════════════════
function setModalContent(html){document.getElementById('modal-content').innerHTML=html;}
function openModal(){document.getElementById('room-modal').classList.add('open');}
function closeModal(){document.getElementById('room-modal').classList.remove('open');}
function closeModalOutside(e){if(e.target===document.getElementById('room-modal'))closeModal();}
function cancelRoom(){
  if(peer){try{peer.destroy();}catch{} peer=null;}
  if(conn){try{conn.close();}catch{} conn=null;}
  currentRoom=null;closeModal();
}
function showRoomCode(){
  if(!currentRoom){showToast('Нет активной комнаты');return;}
  const code=currentRoom.code||'—';
  setModalContent(`
    <div class="modal-title">Код комнаты</div>
    <div class="code-display" onclick="copyCode('${code}')">
      <div class="code-label"><span class="ic ic-copy" style="width:14px;height:14px"></span>Нажми скопировать</div>
      <div class="code-val">${code}</div>
      <div class="code-hint">Отправь другу</div>
    </div>
    <button class="modal-btn outline" onclick="closeModal()">Закрыть</button>
  `);openModal();
}
function copyCode(code){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(code).then(()=>showToast('Код скопирован')).catch(()=>copyFallback(code));
  }else copyFallback(code);
}
function copyFallback(code){
  try{const t=document.createElement('textarea');t.value=code;t.style.cssText='position:fixed;left:-9999px;opacity:0';document.body.appendChild(t);t.focus();t.select();document.execCommand('copy');document.body.removeChild(t);showToast('Скопировано');}
  catch{showToast('Код: '+code,4000);}
}
function leaveRoom(){
  if(!confirm('Выйти из чата?'))return;
  if(conn){try{conn.close();}catch{}}
  if(peer){try{peer.destroy();}catch{}}
  peer=null;conn=null;currentRoom=null;clearPhotoPreview();
  document.getElementById('emoji-picker').classList.remove('open');
  goBack();
}

// ════════════════════════════════════════
// UTILS
// ════════════════════════════════════════
function nowTime(){
  try{return new Date().toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});}
  catch{const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function autoResize(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,120)+'px';}
function showToast(msg,dur=2500){
  const t=document.getElementById('toast');if(!t)return;
  t.textContent=msg;t.classList.add('show');
  clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),dur);
}

// Enter on desktop
(function(){
  const ta=document.getElementById('msg-textarea');if(!ta)return;
  ta.addEventListener('keydown',e=>{
    const mob=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if(e.key==='Enter'&&!e.shiftKey&&!mob){e.preventDefault();sendMessage();}
  });
})();

document.addEventListener('click',e=>{
  const p=document.getElementById('emoji-picker');
  if(p&&!p.contains(e.target)&&!e.target.closest('.input-action-btn'))p.classList.remove('open');
});

window.addEventListener('popstate',()=>{
  if(currentScreen==='chat-screen')goBack();
  else if(!document.getElementById('profile-screen').classList.contains('hidden'))goBackFromProfile();
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeLightbox();document.getElementById('emoji-picker').classList.remove('open');}
});

// ════════════════════════════════════════
// BOOT
// ════════════════════════════════════════
(function(){
  const saved=getCurrentUser();
  if(saved){currentUser=saved;updateProfileUI();updateMainAvatar();loadChatsList();showScreen('main-screen');}
  else showScreen('auth-screen');
  history.replaceState({},'',location.href);
})();
