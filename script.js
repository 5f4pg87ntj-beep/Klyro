const games=[
["Snake","🐍","Arcade"],["Paper.io","🟦","Arcade"],["2048","🔢","Puzzle"],["Tetris","🧱","Puzzle"],["Flappy Bird","🐦","Arcade"],["Minesweeper","💣","Puzzle"],["Pac Man","🟡","Arcade"],["Solitaire","🃏","Puzzle"],["Chess","♟","Strategy"],["Checkers","🔴","Strategy"],["Sudoku","🔢","Puzzle"],["Doodle Jump","🟢","Arcade"],["Crossy Road","🐔","Arcade"],["Connect 4","🔴","Strategy"],["Battleship","🚢","Strategy"],["Mini Golf","⛳","Sports"],["Bowling","🎳","Sports"],["Pool","🎱","Sports"],["Reaction Test","⚡","Random"],["Typing Race","⌨️","Random"],["Aim Trainer","🎯","Random"],["Whack a Mole","🔨","Arcade"],["Pinball","🎰","Arcade"],["Bubble Shooter","🫧","Arcade"],["Color Switch","🎨","Arcade"],["Tower Defense","🏰","Strategy"],["Zombie Defense","🧟","Strategy"],["Fishing","🎣","Random"],["Pet Simulator","🐾","Random"],["Space Colony","🪐","Random"],["Word Search","🔎","Puzzle"],["Hangman","🔤","Puzzle"],["Crossword","📝","Puzzle"],["Geography Quiz","🌎","Random"],["Flag Quiz","🏳️","Random"],["Memory Test","🧠","Random"],["Endless Runner","🏃","Arcade"],["Brick Breaker","🧱","Arcade"],["Asteroids","☄️","Arcade"],["Space Invaders","👾","Arcade"]
];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function showPage(id){$$('.page').forEach(p=>p.classList.remove('active-page'));$('#'+id).classList.add('active-page');$$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===id));window.scrollTo(0,0)}
$$('.nav').forEach(n=>n.onclick=()=>showPage(n.dataset.page));
$$('[data-go]').forEach(b=>b.onclick=()=>showPage(b.dataset.go));

function renderGames(list=games){
  $('#gameGrid').innerHTML=list.map(g=>`<div class="game-card card"><span class="tag">${g[2]}</span><div class="game-icon">${g[1]}</div><h3>${g[0]}</h3><p>Solo • no account needed</p><button onclick="playGame('${g[0]}')">Play</button></div>`).join('');
}
function renderHome(){ $('#homeGames').innerHTML=games.slice(0,6).map(g=>`<div class="game-item"><span>${g[1]} &nbsp;${g[0]}</span><button onclick="playGame('${g[0]}')">Play</button></div>`).join('') }
function playGame(name){alert(name+" is ready for the game engine next 👀");}
renderGames();renderHome();

$('#category').onchange=e=>renderGames(e.target.value==='All games'?games:games.filter(g=>g[2]===e.target.value));
$('#search').oninput=e=>{const q=e.target.value.toLowerCase();const found=games.filter(g=>g[0].toLowerCase().includes(q));if(q){showPage('games');renderGames(found)}else renderGames()};
$$('.swatches button').forEach(b=>b.onclick=()=>{document.documentElement.style.setProperty('--accent',b.dataset.color);localStorage.setItem('klyroAccent',b.dataset.color)});
const saved=localStorage.getItem('klyroAccent');if(saved)document.documentElement.style.setProperty('--accent',saved);
$('#spaceToggle').onchange=e=>$('.space').style.opacity=e.target.checked?'1':'0';
$('#starsToggle').onchange=e=>$('.space').style.setProperty('--stars',e.target.checked?'1':'0');
$('#planetOpacity').oninput=e=>$('.planet,.planet-ring').style.opacity=e.target.value/100;

$('#chatForm').onsubmit=e=>{e.preventDefault();const i=$('#chatInput');if(!i.value.trim())return;$('#messages').insertAdjacentHTML('beforeend',`<div class="msg me">${escapeHtml(i.value)}</div>`);i.value='';document.querySelector('.messages').scrollTop=99999};
$('#aiForm').onsubmit=e=>{e.preventDefault();const i=$('#aiInput');if(!i.value.trim())return;const q=i.value;$('#aiMessages').insertAdjacentHTML('beforeend',`<div class="ai-msg"><b>You</b><p>${escapeHtml(q)}</p></div><div class="ai-msg"><b>Klyro AI</b><p>I'm just a local demo right now 😭 but the real AI can be connected to an API later.</p></div>`);i.value=''};
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
