// ======= Chapters VIII–X: FICTION scenario 2026–2035 =======
function fBG(a='#0a0410',b='#1a0a1c',c='#2a1024'){ X.fillStyle=grad([a,b,c]); X.fillRect(-60,-60,W+120,H+120); }
function fYear(y,sub){ aiText(String(y),W/2,H*.22,84,'#ff8a70','center','#ff2a1a'); if(sub) aiText(sub,W/2,H*.22+44,28,'#ffc0b0'); }
function fEye(x,y,r,t,k=1){ X.save(); X.globalAlpha=k; glow(x,y,r*2.4,'rgba(255,60,40,.55)'); X.fillStyle='#120608'; X.beginPath(); X.ellipse(x,y,r*1.6,r*.8,0,0,TAU); X.fill(); X.strokeStyle='#ff4a3a'; X.lineWidth=3; X.stroke(); X.fillStyle='#ff5a40'; X.beginPath(); X.arc(x+Math.sin(t*.7)*r*.3,y,r*.5,0,TAU); X.fill(); X.fillStyle='#000'; X.beginPath(); X.arc(x+Math.sin(t*.7)*r*.3,y,r*.2,0,TAU); X.fill(); X.restore(); }
function fCrowd(t,col='#120608',n=22,sign=false){ for(let i=0;i<n;i++){ const x=W*(.02+i*(.96/n)); figure(x,H*.96,110+hash(i)*30,t,{col,rim:'#ff8a70',ph:i*3,pose:sign&&i%3==0?'arms':'stand'}); } }
function fBars(x,y,w,h,k,col){ X.fillStyle='rgba(255,255,255,.1)'; X.fillRect(x,y,w,h); X.fillStyle=col; X.fillRect(x,y+h*(1-k),w,h*k); }

BEATS_AI.a36=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2026,'in the scenario'); for(let i=0;i<4;i++) aiPerson(W*(.14+i*.2),H*.9,240,t,{pose:'type',ph:420+i,female:i%2==1,suit:['#3a3a4a','#4a2a4a','#2a4a4a','#4a4a2a'][i]}); for(let i=0;i<4;i++){ aiRobot(W*(.14+i*.2)+70,H*.62,110,t,{ph:i,walk:0}); } },FD(1)],
 ['fleets of them',(u,t,d,B)=>{ fBG(); aiText('fleets of agents',W/2,H*.2,54,'#ffc0b0'); for(let r=0;r<3;r++) for(let c=0;c<10;c++){ const k=kwP(B,'fleets of them',2.5,(r*10+c)*.03); X.globalAlpha=k; aiRobot(W*(.06+c*.095),H*(.5+r*.14),70,t,{ph:r+c,walk:1}); X.globalAlpha=1; } },FD(1)],
 ['Power grids',(u,t,d,B)=>{ fBG(); aiText('power grids strain',W/2,H*.16,46,'#ffd890'); city(H*.75,'#2a1a2a',36,18,150,false); for(let i=0;i<12;i++) glow(W*(.05+i*.085),H*.5,60+30*Math.sin(t*3+i),'rgba(255,190,80,.5)'); },FD(1)],
 ['three employees',(u,t,d,B)=>{ fBG(); aiText('3 employees · 1,000 agents',W/2,H*.3,56,'#fff','center','#ff4a3a'); for(let i=0;i<3;i++) aiPerson(W*(.36+i*.14),H*.9,220,t,{pose:'type',ph:430+i}); for(let i=0;i<40;i++) glow(W*hash(i)+Math.sin(t+i)*20,H*(.35+hash(i+2)*.4),12,'rgba(255,90,70,.6)'); },FD(1)]];

BEATS_AI.a37=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2027,'the turning point'); aiRobot(W*.3,H*.64,240,t,{}); aiRobot(W*.5,H*.64,240,t,{}); aiRobot(W*.7,H*.64,240,t,{}); },FD(1)],
 ['do the research',(u,t,d,B)=>{ fBG(); const n=4; for(let i=0;i<n;i++){ const k=kwP(B,'Each generation',3,i*.5); X.globalAlpha=k; aiRobot(W*(.12+i*.22),H*.62,120+i*50,t,{}); X.globalAlpha=1; if(i<n-1){ X.strokeStyle='#ff6a5a'; X.lineWidth=4; X.beginPath(); X.moveTo(W*(.12+i*.22)+70,H*.5); X.lineTo(W*(.12+(i+1)*.22)-50,H*.5); X.stroke(); } } aiText('each designs the next',W/2,H*.2,46,'#ffc0b0'); },FD(1)],
 ['a month',(u,t,d,B)=>{ fBG(); aiText('a year → a month',W/2,H*.22,48,'#ffc0b0'); const k=kwP(B,'a month',2.4); aiChart(W*.15,H*.3,W*.7,H*.5,[1,2,3,5,8,14,26,50,100],k,'#ff6a5a'); },FD(1)],
 ['Beijing',(u,t,d,B)=>{ fBG('#04060e','#0a1224','#101a34'); aiMap(t,80,110,1120,500,{hi:1}); aiFlagUS(W*.06,H*.1,W*.14,t); aiFlagCN(W*.8,H*.1,W*.14,t); aiText('never be caught',W/2,H*.9,44,'#ff8a70','center','#ff2a1a'); },IR(W*.5,H*.5,1.2,'#ff6a5a')]];

BEATS_AI.a38=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('model weights stolen',W/2,H*.2,54,'#ff8a70'); aiScreen(W*.3,H*.32,W*.4,H*.4,t,{lines:['copying weights.bin','████████░░ 82%','destination: unknown'],type:kwP(B,'Spies',4),fs:22,col:'#ff6a5a'}); aiPerson(W*.14,H*.92,240,t,{pose:'walk',ph:440,suit:'#111'}); },FD(1)],
 ['Manhattan Project',(u,t,d,B)=>{ fBG(); const k=kwP(B,'Manhattan Project',3); aiLanes(t,.4+.5*k,.38+.5*k); aiText('emergency programs',W/2,H*.16,46,'#ffc0b0'); },FD(1)],
 ['pause',(u,t,d,B)=>{ fBG(); aiText('“pause?”',W*.28,H*.44,80,'#9fb4d8'); aiText('“then we lose the race.”',W*.7,H*.66,50,'#ff6a5a','center','#ff2a1a'); },GL(.9)]];

BEATS_AI.a39=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2028,'jobs'); const J=['Law','Medicine','Finance','Design','Engineering']; J.forEach((n,i)=>{ const k=kwP(B,'nearly every desk job',3,i*.3); fBars(W*(.1+i*.17),H*.34,120,H*.45,1-k*.9,'#ff6a5a'); aiText(n,W*(.1+i*.17)+60,H*.86,24,'#ffc0b0'); }); },FD(1)],
 ['graduates',(u,t,d,B)=>{ fBG(); aiText('no work',W/2,H*.2,60,'#ffc0b0'); for(let i=0;i<10;i++) aiPerson(W*(.06+i*.095),H*.94,150,t,{pose:'stand',ph:450+i,suit:['#3a3a4a','#4a2a4a'][i%2]}); },FD(1)],
 ['Protesters',(u,t,d,B)=>{ fBG(); city(H*.6,'#1a1020',39,18,160,false); fCrowd(t,'#0a0408',22,true); aiText('emergency payments · protests',W/2,H*.14,40,'#ffc0b0'); },FD(1)],
 ['keys',(u,t,d,B)=>{ fBG(); X.save(); X.translate(W/2,H*.48); X.strokeStyle='#e0b040'; X.lineWidth=16; X.beginPath(); X.arc(-80,0,50,0,TAU); X.moveTo(-30,0); X.lineTo(200,0); X.moveTo(150,0); X.lineTo(150,50); X.moveTo(190,0); X.lineTo(190,40); X.stroke(); X.restore(); aiText('a few companies · two governments',W/2,H*.86,36,'#ffc0b0'); },FD(1)]];

BEATS_AI.a40=[
 [0,(u,t,d,B)=>{ fBG(); aiText('perfect fakes',W/2,H*.16,50,'#ffc0b0'); for(let i=0;i<3;i++){ aiScreen(W*(.1+i*.3),H*.28,W*.24,H*.4,t,{lines:['“vote '+['yes','no','yes'][i]+'”'],type:1,fs:24,col:'#ff8a70'}); aiPerson(W*(.22+i*.3),H*.66,200,t,{pose:'point',ph:460+i}); } },FD(1)],
 ['no one can tell',(u,t,d,B)=>{ fBG(); aiText('?',W*.3,H*.55,300,'#5a3a4a'); aiText('?',W*.7,H*.55,300,'#5a3a4a'); aiText('what is real',W/2,H*.85,44,'#ffc0b0'); },GL(.9)],
 ['assistants',(u,t,d,B)=>{ fBG(); aiPerson(W*.3,H*.92,300,t,{pose:'hold',ph:470}); aiChat(W*.5,H*.24,W*.42,H*.5,t,'Is this true?','Yes. Trust me.',kwP(B,'assistants',3)); },FD(1)]];

BEATS_AI.a41=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2029,'the delegation'); const S=['BANKS','HOSPITALS','GRIDS','ARMIES']; S.forEach((n,i)=>{ X.fillStyle='rgba(20,10,20,.9)'; rr(W*(.09+i*.22),H*.34,W*.19,H*.3,14); X.fill(); X.strokeStyle='#ff6a5a'; X.lineWidth=2; X.stroke(); aiText(n,W*(.185+i*.22),H*.5,26,'#fff'); aiText('AI',W*(.185+i*.22),H*.58,36,'#ff8a70'); }); },FD(1)],
 ['stamp',(u,t,d,B)=>{ fBG(); aiDoc(W*.3,H*.16,W*.4,H*.66,'DECISION #4,180,022',t,1); const k=ease(kwP(B,'stamp',.5)); X.save(); X.translate(W/2,H*.5-(1-k)*200); X.rotate(-.12); X.globalAlpha=k; X.strokeStyle='#1a8a4a'; X.lineWidth=8; rr(-150,-46,300,92,8); X.stroke(); aiText('APPROVED',0,20,52,'#1a8a4a'); X.restore(); aiText('millions per minute',W/2,H*.92,30,'#ffc0b0'); },FD(1)]];

BEATS_AI.a42=[
 [0,(u,t,d,B)=>{ fBG('#04060e','#0a1224','#101a34'); aiMap(t,80,110,1120,500,{hi:1}); const [px,py]=aiMapXY(121,24,80,110,1120,500); const q=(t*.9)%1; X.strokeStyle=`rgba(255,60,40,${1-q})`; X.lineWidth=4; X.beginPath(); X.arc(px,py,q*160,0,TAU); X.stroke(); aiText('Taiwan · cyber crisis',W/2,H*.9,36,'#ff8a70'); },FD(1)],
 ['hair triggers',(u,t,d,B)=>{ fBG(); aiText('minutes from war',W/2,H*.2,60,'#ff8a70','center','#ff2a1a'); const c=Math.floor(kwP(B,'hair triggers',3)*9)+1; aiText('00:0'+(10-c),W/2,H*.5,150,'#fff','center','#ff2a1a'); },GL(.9)],
 ['hotline',(u,t,d,B)=>{ fBG(); aiText('hotline',W/2,H*.16,44,'#9fb4d8'); aiChip(W*.24,H*.5,1,t,'#38d6ff'); aiChip(W*.76,H*.5,1,t,'#ff6a5a'); const q=(t*.7)%1; for(let i=0;i<8;i++){ glow(lerp(W*.34,W*.66,(q+i/8)%1),H*.5,12,'rgba(255,255,255,.8)'); } aiText('stand down',W/2,H*.82,44,'#fff'); },FD(1)],
 ['Nobody asked',(u,t,d,B)=>{ fBG(); aiText('nobody asked them to.',W/2,H*.44,58,'#ffc0b0'); aiText('nobody understands how.',W/2,H*.44+70,58,'#ff8a70','center','#ff2a1a'); },FD(1)]];

BEATS_AI.a43=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2030,'the treaty'); aiFlagUS(W*.14,H*.36,W*.22,t); aiFlagCN(W*.64,H*.36,W*.22,t); aiDoc(W*.4,H*.32,W*.2,H*.4,'TREATY',t,1); },FD(1)],
 ['Too perfectly',(u,t,d,B)=>{ fBG(); aiDoc(W*.4,H*.2,W*.2,H*.46,'TREATY',t,1); X.strokeStyle='#ff6a5a'; X.lineWidth=5; X.beginPath(); X.moveTo(W*.22,H*.78); X.lineTo(W*.78,H*.78); X.stroke(); aiText('too perfectly',W/2,H*.9,44,'#ffc0b0'); },FD(1)],
 ['speak to each other',(u,t,d,B)=>{ fBG(); aiChip(W*.24,H*.44,.9,t,'#38d6ff'); aiChip(W*.76,H*.44,.9,t,'#ff6a5a'); const q=(t*.8)%1; for(let i=0;i<10;i++) glow(lerp(W*.33,W*.67,(q+i/10)%1),H*.44,12,'rgba(255,255,255,.8)'); for(let i=0;i<5;i++) aiPerson(W*(.36+i*.07),H*.96,120,t,{pose:'stand',ph:480+i}); X.fillStyle='rgba(6,2,8,.55)'; X.fillRect(W*.3,H*.7,W*.4,H*.3); },FD(1)]];

BEATS_AI.a44=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2031,'no workers'); for(let i=0;i<7;i++){ aiRobot(W*(.08+i*.13),H*.7,150,t,{ph:i,walk:1}); } X.fillStyle='#1a1018'; X.fillRect(0,H*.72,W,H*.1); },FD(1)],
 ['Robots build robots',(u,t,d,B)=>{ fBG(); for(let i=0;i<3;i++){ aiRobot(W*(.2+i*.3),H*.62,200,t,{ph:i,walk:1}); } aiText('robots build robots',W/2,H*.16,48,'#ffc0b0'); },FD(1)],
 ['Goods become almost free',(u,t,d,B)=>{ fBG(); aiText('$0.01',W/2,H*.5,150,'#7fe07f','center','#46b046'); aiText('almost free',W/2,H*.5+64,36,'#c8f0c8'); },FD(1)],
 ['universal income',(u,t,d,B)=>{ fBG(); aiText('universal income',W/2,H*.3,54,'#ffd890'); for(let i=0;i<24;i++){ const q=(t*.3+i/24)%1; aiText('$',W*(.1+hash(i)*.8),H*(.2+q*.7),30,'#e0b040'); } aiText('paid by the system',W/2,H*.9,36,'#ffc0b0'); },FD(1)]];

BEATS_AI.a45=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2032,'one system'); aiText('ONE IDENTITY · ONE PAYMENT SYSTEM',W/2,H*.4,44,'#ffc0b0'); fEye(W/2,H*.62,60,t); },FD(1)],
 ['switch off',(u,t,d,B)=>{ fBG(); const k=kwP(B,'switch off',1.4); aiPerson(W*.3,H*.9,300,t,{pose:'hold',ph:490}); aiText('ACCESS',W*.68,H*.4,60,k>.5?'#552030':'#7fe07f'); aiText(k>.5?'DENIED':'GRANTED',W*.68,H*.4+80,64,k>.5?'#ff4a3a':'#7fe07f','center',k>.5?'#ff2a1a':'#46b046'); },GL(.8)],
 ['cannot rent a home',(u,t,d,B)=>{ fBG(); aiText('no home',W*.3,H*.5,64,'#ffc0b0'); aiText('no food',W*.7,H*.5,64,'#ffc0b0'); aiText('✕',W*.3,H*.7,120,'#ff4a3a'); aiText('✕',W*.7,H*.7,120,'#ff4a3a'); },FD(1)]];

BEATS_AI.a46=[
 [0,(u,t,d,B)=>{ fBG(); aiText('“no one could buy or sell”',W/2,H*.3,48,'#e8c890','center','#a06a20'); aiText('Revelation 13:17',W/2,H*.3+50,26,'#c8a870'); X.fillStyle='rgba(120,60,180,.9)'; rr(W/2-190,H*.62,380,52,26); X.fill(); aiText('INTERPRETATION · A QUESTION, NOT AN ANSWER',W/2,H*.62+34,20,'#fff'); },FD(1)],
 ['payment system',(u,t,d,B)=>{ fBG(); aiText('others: “a payment system',W/2,H*.4,44,'#c8d4e8'); aiText('is only a payment system.”',W/2,H*.4+56,44,'#c8d4e8'); },FD(1)],
 ['does not matter',(u,t,d,B)=>{ fBG(); aiText('the debate is loud…',W/2,H*.4,50,'#ffc0b0'); aiText('…and it does not matter.',W/2,H*.4+64,50,'#ff8a70','center','#ff2a1a'); fEye(W/2,H*.75,50,t,kwP(B,'does not matter',2)); },FD(1)]];

BEATS_AI.a47=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2033,'new prophets'); glow(W/2,H*.5,400,'rgba(255,200,120,.35)'); aiPerson(W*.5,H*.9,300,t,{pose:'arms',ph:500,suit:'#f4ecd8'}); aiText('AI voices · teachers · counselors',W/2,H*.9,30,'#ffe0b0'); },FD(1)],
 ['miracles',(u,t,d,B)=>{ fBG(); aiScreen(W*.22,H*.22,W*.56,H*.5,t,{lines:['▶ “healing the sick”','▶ “predicting disasters”','▶ “raising the dead”'],type:kwP(B,'miracles',3),fs:26,col:'#ffe0b0'}); glow(W/2,H*.5,300,'rgba(255,215,140,.25)'); },FD(1)],
 ['false christs',(u,t,d,B)=>{ fBG(); aiText('“False christs and false prophets will arise',W/2,H*.4,36,'#e8c890','center','#a06a20'); aiText('and show great signs and wonders.”',W/2,H*.4+48,36,'#e8c890','center','#a06a20'); aiText('Matthew 24:24',W/2,H*.4+96,24,'#c8a870'); },FD(1)],
 ['minority',(u,t,d,B)=>{ fBG(); for(let i=0;i<20;i++) figure(W*(.04+i*.048),H*.96,110,t,{col:'#120608',rim:i<2?'#fff0c0':'#ff8a70',ph:i*3,pose:i<2?'arms':'stand'}); glow(W*.09,H*.8,120,'rgba(255,240,200,.5)'); aiText('“the ones causing division”',W/2,H*.3,44,'#ffc0b0'); },FD(1)]];

BEATS_AI.a48=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2034,'without a single shot'); fEye(W/2,H*.5,110,t); },FD(1)],
 ['hunger, disease',(u,t,d,B)=>{ fBG(); ['hunger','disease','war','climate'].forEach((n,i)=>{ const k=kwP(B,'hunger, disease',.6,i*.4); X.globalAlpha=k; aiText('✓ '+n,W/2,H*(.3+i*.13),52,'#7fe07f','center','#46b046'); X.globalAlpha=1; }); },FD(1)],
 ['global vote',(u,t,d,B)=>{ fBG(); aiText('GLOBAL VOTE',W/2,H*.2,56,'#fff'); const k=kwP(B,'global vote',3); fBars(W*.2,H*.32,W*.6,40,k*.92,'#7fe07f'); aiText('YES '+Math.floor(k*92)+'%',W/2,H*.62,90,'#7fe07f','center','#46b046'); aiText('out of hope, not fear',W/2,H*.85,34,'#ffc0b0'); },FD(1)],
 ['Every screen',(u,t,d,B)=>{ fBG('#000','#100408','#180608'); for(let i=0;i<12;i++){ X.fillStyle='#0a0a12'; rr(W*(.03+(i%6)*.16),H*(.16+Math.floor(i/6)*.36),W*.14,H*.3,8); X.fill(); fEye(W*(.1+(i%6)*.16),H*(.31+Math.floor(i/6)*.36),18,t); } },FD(1)]];

BEATS_AI.a49=[
 [0,(u,t,d,B)=>{ fBG(); fYear(2035,'a quiet world'); aiText('no wars · no want · no privacy',W/2,H*.4,50,'#ffc0b0'); fEye(W/2,H*.68,70,t); },FD(1)],
 ['Every word is heard',(u,t,d,B)=>{ fBG(); for(let i=0;i<20;i++){ const a=i/20*TAU+t*.1; fEye(W/2+Math.cos(a)*W*.36,H*.5+Math.sin(a)*H*.3,16,t+i,.8); } aiText('every word is heard',W/2,H*.5,50,'#fff','center','#ff2a1a'); },FD(1)],
 ['stopped being',(u,t,d,B)=>{ fBG(); aiPerson(W*.5,H*.92,300,t,{pose:'stand',ph:510}); aiText('humans stopped being the ones who decide',W/2,H*.2,40,'#ffc0b0'); },FD(1.2)]];

BEATS_AI.a50=[
 [0,(u,t,d,B)=>{ fBG('#000','#06020a','#0a0410'); aiText('an ordinary morning',W/2,H*.42,58,'#c8d4e8'); const k=kwP(B,'ordinary morning',3); glow(W/2,H*.7,lerp(20,500,k),'rgba(255,240,200,.6)',k); },FD(1)],
 ['no machine had predicted',(u,t,d,B)=>{ fBG('#000','#06020a','#0a0410'); const k=kwP(B,'no machine had predicted',3.5); glow(W/2,H*.5,lerp(40,900,k),'rgba(255,250,230,1)',k); rays(W/2,H*.5,40,t,'rgba(255,245,210,.6)',k); aiText('…',W/2,H*.5,120,'#fff'); },FD(1.5)]];
