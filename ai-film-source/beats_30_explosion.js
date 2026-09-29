// ======= Chapters VI (2023–2025 explosion) and VII (Today, 2026) =======
function aiBG(){ X.fillStyle=grad(['#04060e','#0a1224','#101a34']); X.fillRect(-60,-60,W+120,H+120); }
function aiLogoChip(x,y,name,col,t,k=1){ X.save(); X.globalAlpha=k; X.fillStyle='rgba(8,14,26,.92)'; rr(x-120,y-46,240,92,16); X.fill(); X.strokeStyle=col; X.lineWidth=3; X.shadowColor=col; X.shadowBlur=18; X.stroke(); X.shadowBlur=0; aiText(name,x,y+12,34,'#fff'); X.restore(); }
function aiLetter(x,y,w,h,title,t,k){ aiDoc(x,y,w,h,title,t,k); }
function aiTicker(label,val,x,y,col,t){ aiText(label,x,y-46,22,'#8aa0c0'); aiText(val,x,y+10,64,col,'center',col); }
function aiBigNum(str,y,col,sz=120){ aiText(str,W/2,y,sz,'#fff','center',col); }

BEATS_AI.a25=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('2023',W/2,H*.14,64,'#7ee3ff'); const n=Math.floor(kwP(B,'hundred million users',3)*100); aiBigNum(n+' million',H*.5,'#46e6b0',110); aiText('users in about two months',W/2,H*.5+56,28,'#9fd8c8'); aiChart(W*.2,H*.62,W*.6,H*.24,[1,2,4,9,18,36,60,100],kwP(B,'hundred million users',3),'#46e6b0'); },FD(1)],
 ['Bard',(u,t,d,B)=>{ aiBG(); aiLogoChip(W*.3,H*.4,'Bard','#ffcf60',t,kwP(B,'Bard',.6)); aiLogoChip(W*.7,H*.4,'ChatGPT','#46e6b0',t,1); aiText('the rush begins',W/2,H*.7,40,'#c8d4e8'); },FD(1)],
 ['G P T four',(u,t,d,B)=>{ aiBG(); aiLogoChip(W*.3,H*.42,'GPT-4','#46e6b0',t,1); aiLogoChip(W*.7,H*.42,'Claude','#e8a070',t,kwP(B,'Claude',.6)); aiText('March 2023',W/2,H*.16,44,'#ffcf60'); },FD(1)],
 ['bar exam',(u,t,d,B)=>{ aiBG(); aiDoc(W*.3,H*.14,W*.4,H*.7,'SIMULATED BAR EXAM',t,1); const k=kwP(B,'bar exam',2.4); X.save(); X.translate(W/2,H*.58); X.rotate(-.1); X.globalAlpha=k; X.strokeStyle='#1a8a4a'; X.lineWidth=8; rr(-170,-60,340,110,10); X.stroke(); aiText('TOP 10%',0,26,58,'#1a8a4a'); X.restore(); },MO(W*.3,H*.14,W*.4,H*.7,1.2)]];

BEATS_AI.a26=[
 [0,(u,t,d,B)=>{ X.fillStyle=grad(['#1a1418','#2a1c22','#3a2830']); X.fillRect(-60,-60,W+120,H+120); aiLetter(W*.32,H*.14,W*.36,H*.68,'PAUSE GIANT AI EXPERIMENTS',t,kwP(B,'letter',2.4)); for(let i=0;i<14;i++) aiText('✎',W*(.34+hash(i)*.32),H*(.56+Math.floor(i/5)*.06),24,'#3a5aa0'); aiText('over 1,000 signatures · March 2023',W/2,H*.84,28,'#ffd0b0'); },FD(1)],
 ['Geoffrey Hinton',(u,t,d,B)=>{ X.fillStyle=grad(['#0c0c14','#1a1a28','#2a2a3a']); X.fillRect(-60,-60,W+120,H+120); glow(W*.5,H*.45,400,'rgba(255,220,160,.2)'); aiPerson(W*.5,H*.94,330,t,{pose:'stand',ph:410,glasses:true,suit:'#3a3a4a'}); aiText('May 2023',W/2,H*.12,40,'#ffcf60'); },FD(1)],
 ['one line statement',(u,t,d,B)=>{ aiBG(); const s='Mitigating the risk of extinction from AI should be a global priority.'; const k=kwP(B,'one line statement',4); aiText(s.slice(0,Math.floor(s.length*k)),W/2,H*.5,34,'#ffffff','center','#ff6a5a'); },FD(1)]];

BEATS_AI.a27=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('July 2023',W/2,H*.14,44,'#ffcf60'); aiLogoChip(W/2,H*.44,'xAI · Grok','#c8d4e8',t,1); aiChat(W*.28,H*.58,W*.44,H*.3,t,'Hello Grok','',kwP(B,'Grok',2)); },FD(1)],
 ['Bletchley Park',(u,t,d,B)=>{ sky(['#5a6a8a','#a8b4c8','#e0d8c8']); X.fillStyle='#4a6a3a'; X.fillRect(-60,H*.78,W+120,H*.3); X.fillStyle='#8a4a3a'; X.fillRect(W*.2,H*.44,W*.6,H*.36); X.fillStyle='#5a2a20'; X.beginPath(); X.moveTo(W*.18,H*.44); X.lineTo(W*.5,H*.28); X.lineTo(W*.82,H*.44); X.fill(); for(let i=0;i<8;i++){ X.fillStyle='#f0e0a0'; X.fillRect(W*(.24+i*.07),H*.54,W*.03,H*.1); } aiText('Bletchley Park · November 2023',W/2,H*.16,36,'#fff','center','#3a4a6a'); aiText('28 countries · including the US and China',W/2,H*.84,28,'#fff','center','#3a4a6a'); },FD(1)],
 ['Gemini',(u,t,d,B)=>{ aiBG(); aiLogoChip(W*.5,H*.3,'Gemini','#7ab0ff',t,kwP(B,'Gemini',.6)); aiText('December 2023',W/2,H*.14,36,'#ffcf60'); },FD(1)],
 ['Four names',(u,t,d,B)=>{ aiBG(); const N=[['ChatGPT','#46e6b0'],['Claude','#e8a070'],['Gemini','#7ab0ff'],['Grok','#c8d4e8']]; N.forEach(([n,c],i)=>aiLogoChip(W*(.18+i*.21),H*.5,n,c,t,kwP(B,'Four names',.5,i*.3))); aiText('four names in the ring',W/2,H*.78,36,'#c8d4e8'); },FD(1)]];

BEATS_AI.a28=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('2024',W/2,H*.13,64,'#7ee3ff'); aiScreen(W*.06,H*.24,W*.28,H*.5,t,{lines:['see','hear','reason','step by step'],type:kwP(B,'Models learned',3),fs:22}); aiScreen(W*.38,H*.24,W*.56,H*.5,t,{lines:['prompt: a woolly mammoth','walks through snow...'],type:kwP(B,'Sora',3),fs:22,col:'#ffcf60'}); },FD(1)],
 ['Nvidia',(u,t,d,B)=>{ aiBG(); aiChip(W*.5,H*.46,1.4,t,'#7fe07f'); aiText('NVIDIA',W/2,H*.86,50,'#9fe89f','center','#46b046'); },Z(W*.5,H*.46,1.2,8)],
 ['Nobel',(u,t,d,B)=>{ X.fillStyle=grad(['#1a1408','#2a2010','#3a2c18']); X.fillRect(-60,-60,W+120,H+120); glow(W/2,H*.44,360,'rgba(255,215,110,.5)'); disc(W/2,H*.44,120,'#d4a437'); aiText('NOBEL',W/2,H*.46,44,'#3a2408'); aiText('October 2024 · Hinton · Hopfield · Hassabis · Jumper',W/2,H*.86,26,'#ffe9a8'); },FD(1)]];

BEATS_AI.a29=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('January 20, 2025',W/2,H*.14,44,'#ffcf60'); aiLogoChip(W*.5,H*.42,'DeepSeek R1','#7aa0ff',t,1); aiText('rivals the best models · far cheaper, it claimed',W/2,H*.66,28,'#c8d4e8'); aiFlagCN(W*.06,H*.64,W*.16,t); },FD(1)],
 ['Nvidia lost',(u,t,d,B)=>{ X.fillStyle=grad(['#1a0808','#2a1010','#3a1818']); X.fillRect(-60,-60,W+120,H+120); const k=kwP(B,'Nvidia lost',2.4); const pts=[100,102,101,104,106,105,100,80,60,45]; aiChart(W*.12,H*.22,W*.76,H*.5,pts,k,'#ff4a3a'); const v=Math.floor(k*590); aiText('−$'+v+' billion',W/2,H*.86,80,'#ff6a5a','center','#ff2a1a'); },GL(.9)],
 ['biggest one day loss',(u,t,d,B)=>{ X.fillStyle=grad(['#1a0808','#2a1010','#3a1818']); X.fillRect(-60,-60,W+120,H+120); aiText('the biggest one-day loss',W/2,H*.44,60,'#fff','center','#ff2a1a'); aiText('of any company, ever',W/2,H*.44+70,44,'#ffb0a0'); },FD(1)]];

BEATS_AI.a30=[
 [0,(u,t,d,B)=>{ aiBG(); aiFlagUS(W*.08,H*.14,W*.2,t); aiText('STARGATE',W*.62,H*.4,90,'#fff','center','#38d6ff'); aiText('up to $500 billion',W*.62,H*.4+70,44,'#ffe28a'); for(let i=0;i<6;i++) aiRack(W*(.42+i*.08),H*.6,60,180,t,i+1); },FD(1)],
 ['Claude Opus four',(u,t,d,B)=>{ aiBG(); const L=[['May · Claude Opus 4','#e8a070'],['July · Grok 4','#c8d4e8'],['August · GPT-5','#46e6b0']]; L.forEach(([n,c],i)=>{ const k=kwP(B,['Claude Opus four','Grok four','G P T five'][i],.7); aiLogoChip(W*.5,H*(.28+i*.2),n,c,t,k); }); },FD(1)],
 ['Mathematical Olympiad',(u,t,d,B)=>{ X.fillStyle=grad(['#1a1408','#2a2010','#3a2c18']); X.fillRect(-60,-60,W+120,H+120); glow(W/2,H*.4,300,'rgba(255,215,110,.5)'); disc(W/2,H*.4,90,'#e6b840'); aiText('GOLD',W/2,H*.42,44,'#3a2408'); aiText('International Mathematical Olympiad · July 2025',W/2,H*.8,30,'#ffe9a8'); },FD(1)]];

BEATS_AI.a31=[
 [0,(u,t,d,B)=>{ aiBG(); const k=kwP(B,'five trillion',3); aiBigNum('$'+(k*5).toFixed(1)+' trillion',H*.46,'#7fe07f',100); aiText('Nvidia · October 2025',W/2,H*.62,32,'#9fe89f'); },FD(1)],
 ['electricity',(u,t,d,B)=>{ X.fillStyle=grad(['#0a0c14','#141a2a','#1e263c']); X.fillRect(-60,-60,W+120,H+120); city(H*.7,'#2a3a5a',31,18,150,false); for(let i=0;i<8;i++) aiRack(W*(.1+i*.11),H*.72,70,160,t,i+2); for(let i=0;i<10;i++) glow(W*(.1+i*.09),H*.5,60,'rgba(255,220,120,.4)'); aiText('as much electricity as a city',W/2,H*.16,42,'#ffe28a'); },FD(1)],
 ['years away',(u,t,d,B)=>{ aiBG(); aiText('“years away”',W/2,H*.44,90,'#8aa0c0'); aiText('…every few months',W/2,H*.44+80,48,'#fff','center','#38d6ff'); },GL(.9)]];

// ---- VII: TODAY ----
BEATS_AI.a32=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('2026',W/2,H*.2,120,'#7ee3ff','center','#38d6ff'); aiText('a marathon run at a sprint',W/2,H*.2+70,36,'#c8d4e8'); aiLanes(t,.55,.5); },FD(1)],
 ['January',(u,t,d,B)=>{ aiBG(); aiText('January 2026',W/2,H*.14,40,'#ffcf60'); aiFlagUS(W*.08,H*.3,W*.2,t); aiChip(W*.5,H*.46,1.1,t,'#7fe07f'); aiFlagCN(W*.72,H*.3,W*.2,t); for(let i=0;i<3;i++){ const q=(t*.5+i/3)%1; glow(lerp(W*.3,W*.7,q),H*.46,18,'rgba(127,224,127,.9)'); } aiText('case-by-case sales, with conditions',W/2,H*.86,28,'#c8d4e8'); },FD(1)],
 ['Huawei launched',(u,t,d,B)=>{ X.fillStyle=grad(['#3a0a0a','#5a1414','#7a1c1c']); X.fillRect(-60,-60,W+120,H+120); aiChip(W*.5,H*.46,1.3,t,'#ff6a5a'); aiText('HUAWEI ASCEND',W/2,H*.86,44,'#ffb0a0'); },FD(1)]];

BEATS_AI.a33=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('April 2026',W/2,H*.13,40,'#ffcf60'); aiLogoChip(W*.5,H*.34,'Claude Mythos Preview','#e8a070',t,1); aiScreen(W*.3,H*.5,W*.4,H*.32,t,{lines:['scanning software...','hidden flaw found','hidden flaw found','hidden flaw found'],type:kwP(B,'hidden flaws',3),fs:20,col:'#ff8a70'}); },FD(1)],
 ['chose not to release',(u,t,d,B)=>{ aiBG(); aiChip(W*.5,H*.46,1.2,t,'#e8a070'); const k=kwP(B,'chose not to release',1.4); X.save(); X.globalAlpha=k; X.translate(W/2,H*.5); X.fillStyle='#c8a030'; rr(-70,-4,140,110,12); X.fill(); X.strokeStyle='#c8a030'; X.lineWidth=16; X.beginPath(); X.arc(0,-4,46,Math.PI,TAU); X.stroke(); X.restore(); },FD(1)],
 ['small group of companies',(u,t,d,B)=>{ aiBG(); aiLogoChip(W*.5,H*.4,'Mythos','#e8a070',t,1); for(let i=0;i<6;i++){ const a=i/6*TAU+t*.2; const k=kwP(B,'small group of companies',1.2,i*.15); X.strokeStyle=`rgba(232,160,112,${.5*k})`; X.lineWidth=2; X.beginPath(); X.moveTo(W*.5,H*.4); X.lineTo(W*.5+Math.cos(a)*300,H*.4+Math.sin(a)*190); X.stroke(); aiRack(W*.5+Math.cos(a)*300-25,H*.4+Math.sin(a)*190-40,50,80,t,i+3); } },FD(1)]];

BEATS_AI.a34=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('June 2026',W/2,H*.14,40,'#ffcf60'); aiChat(W*.24,H*.24,W*.52,H*.52,t,'Can you fix this bug?','Done. I found 3 issues and wrote tests.',kwP(B,'safeguards',3)); },FD(1)],
 ['four American labs',(u,t,d,B)=>{ aiBG(); aiLanes(t,.7,.66); aiText('a new model every few weeks',W/2,H*.16,42,'#fff','center','#38d6ff'); },FD(1)],
 ['agents',(u,t,d,B)=>{ aiBG(); for(let i=0;i<5;i++) aiRobot(W*(.14+i*.18),H*.62,170,t,{ph:i,walk:1}); aiScreen(W*.3,H*.12,W*.4,H*.14,t,{lines:['agents working · 6h 12m'],type:1,fs:22}); },FD(1)],
 ['a decade',(u,t,d,B)=>{ aiBG(); const k=kwP(B,'a decade',2.2); aiChart(W*.15,H*.2,W*.7,H*.5,[1,1,2,2,3,4,6,10,20,45,100],k,'#46e68c'); aiText('a decade → a season',W/2,H*.86,44,'#fff','center','#46e68c'); },FD(1)]];

BEATS_AI.a35=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('Nobody knows what comes next.',W/2,H*.4,56,'#fff','center','#38d6ff'); aiText('?',W/2,H*.68,150,'#5a8ac8'); },FD(1)],
 ['not a prediction',(u,t,d,B)=>{ X.fillStyle=grad(['#1a0808','#2a1010','#3a1818']); X.fillRect(-60,-60,W+120,H+120); aiText('NOT A PREDICTION',W/2,H*.44,80,'#ff6a5a','center','#ff2a1a'); aiText('a fictional scenario',W/2,H*.44+70,40,'#ffb0a0'); },GL(1)],
 ['Watch it as a story',(u,t,d,B)=>{ X.fillStyle=grad(['#1a0808','#2a1010','#3a1818']); X.fillRect(-60,-60,W+120,H+120); aiText('a story… and a question',W/2,H*.5,60,'#ffd0c0','center','#ff4a3a'); },FD(1.2)]];
