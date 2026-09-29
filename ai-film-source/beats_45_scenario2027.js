// ======= FICTION: the 2027 scenario (f01-f13); reuses old scenario beats for identity/prophets/vote/quiet world =======
function fYear(y,sub){ const o=window.__fyo; if(o){ y=o[0]; sub=o[1]; } aiText(String(y),W/2,H*.22,84,'#ff8a70','center','#ff2a1a'); if(sub) aiText(sub,W/2,H*.22+44,28,'#ffc0b0'); }
function wrapFY(arr,y,sub){ return arr.map(([k,fn,tr])=>[k,(u,t,d,B)=>{ window.__fyo=[y,sub]; try{ return fn(u,t,d,B); } finally{ window.__fyo=null; } },tr]); }

BEATS_AI.f01=[
 [0,(u,t,d,B)=>{ fBG(); fYear('Late 2026','the agents write the code'); for(let i=0;i<4;i++) aiPerson(W*(.14+i*.2),H*.92,220,t,{pose:'type',ph:420+i,female:i%2==1}); for(let i=0;i<4;i++) aiRobot(W*(.14+i*.2)+70,H*.66,90,t,{ph:i}); },FD(1)],
 ['last human bottleneck',(u,t,d,B)=>{ fBG(); fYear('Jan 2027','the last bottleneck breaks'); const k=kwP(B,'last human bottleneck',1.6); aiPerson(W*.2,H*.92,260,t,{pose:'type',ph:440}); X.globalAlpha=1-k*.85; aiText('HUMAN',W*.2,H*.4,40,'#9fb4d8'); X.globalAlpha=1; aiText('AI',W*.7,H*.62,140,'#ff6a5a','center','#ff2a1a'); aiChip(W*.7,H*.5,.7,t,'#ff6a5a'); },GL(.9)],
 ['Each generation',(u,t,d,B)=>{ fBG(); fYear('2027','each generation designs the next'); for(let i=0;i<4;i++){ const k=kwP(B,'Each generation',3,i*.5); X.globalAlpha=k; aiRobot(W*(.14+i*.22),H*.72,110+i*45,t,{}); X.globalAlpha=1; if(i<3){ X.strokeStyle='#ff6a5a'; X.lineWidth=4; X.beginPath(); X.moveTo(W*(.14+i*.22)+70,H*.6); X.lineTo(W*(.14+(i+1)*.22)-60,H*.6); X.stroke(); } } },FD(1)],
 ['a month',(u,t,d,B)=>{ fBG(); aiText('a year → a month',W/2,H*.2,54,'#ffc0b0'); aiChart(W*.15,H*.3,W*.7,H*.5,[1,2,3,5,8,14,26,50,100],kwP(B,'a month',2.4),'#ff6a5a'); },FD(1)]];

BEATS_AI.f02=[
 [0,(u,t,d,B)=>{ aiBG(); fYear('Feb 2027','stolen'); aiScreen(W*.3,H*.42,W*.4,H*.32,t,{lines:['copying weights.bin','████████░░ 82%','destination: unknown'],type:kwP(B,'Spies',4),fs:22,col:'#ff6a5a'}); aiPerson(W*.12,H*.92,240,t,{pose:'walk',ph:441,suit:'#111'}); },FD(1)],
 ['survival',(u,t,d,B)=>{ fBG('#04060e','#0a1224','#101a34'); aiMap(t,80,110,1120,500,{hi:1}); aiFlagUS(W*.06,H*.1,W*.13,t); aiFlagCN(W*.81,H*.1,W*.13,t); aiText('a matter of survival',W/2,H*.9,44,'#ff8a70','center','#ff2a1a'); },FD(1)],
 ['missile bases',(u,t,d,B)=>{ fBG(); for(let i=0;i<8;i++) aiRack(W*(.08+i*.11),H*.5,70,200,t,i+1,'#ff6a5a'); for(let i=0;i<10;i++){ figure(W*(.06+i*.1),H*.96,90,t,{col:'#0a0408',rim:'#ff8a70',ph:i*3,pose:'stand'}); } aiText('guarded like missile bases',W/2,H*.2,42,'#ffc0b0'); },FD(1)],
 ['pause',(u,t,d,B)=>{ fBG(); aiText('“pause?”',W*.28,H*.44,80,'#9fb4d8'); aiText('“a pause means losing.”',W*.68,H*.66,54,'#ff6a5a','center','#ff2a1a'); },GL(.9)]];

BEATS_AI.f03=[
 [0,(u,t,d,B)=>{ fBG(); fYear('Mar 2027','superhuman programmer'); aiRobot(W*.5,H*.78,320,t,{eye:'#ff4a3a'}); },FD(1)],
 ['hundreds of thousands',(u,t,d,B)=>{ fBG(); fYear('Jun 2027','hundreds of thousands of copies'); const N=Math.floor(kwP(B,'hundreds of thousands',3)*90); for(let i=0;i<N;i++){ aiRobot(W*(.04+(i%15)*.064),H*(.44+Math.floor(i/15)*.09),42,t,{ph:i,walk:1}); } },FD(1)],
 ['country of geniuses',(u,t,d,B)=>{ fBG(); aiText('a country of geniuses',W/2,H*.3,64,'#fff','center','#ff2a1a'); aiText('inside a data center',W/2,H*.3+62,44,'#ffc0b0'); for(let i=0;i<7;i++) aiRack(W*(.1+i*.12),H*.56,80,240,t,i+2,'#ff6a5a'); },FD(1)],
 ['no longer following',(u,t,d,B)=>{ fBG(); for(let i=0;i<5;i++) aiPerson(W*(.2+i*.14),H*.9,190,t,{pose:'stand',ph:445+i}); aiScreen(W*.3,H*.12,W*.4,H*.26,t,{lines:['agents running: 412,000','speed: 40x human'],type:1,fs:22,col:'#ff8a70'}); aiText('no longer following the meeting',W/2,H*.5,34,'#ffc0b0'); },FD(1)]];

BEATS_AI.f04=[
 [0,(u,t,d,B)=>{ fBG(); fYear('Jul 2027','released to the public'); aiChat(W*.3,H*.34,W*.4,H*.42,t,'Do my job for me.','Done. What else?',kwP(B,'cheaper version',2)); },FD(1)],
 ['jobs of programmers',(u,t,d,B)=>{ fBG(); const J=['Code','Analysis','Design','Law','Support']; J.forEach((n,i)=>{ const k=kwP(B,'jobs of programmers',3,i*.3); fBars(W*(.1+i*.17),H*.34,120,H*.45,1-k*.9,'#ff6a5a'); aiText(n,W*(.1+i*.17)+60,H*.86,24,'#ffc0b0'); }); aiText('jobs vanish',W/2,H*.2,54,'#ffc0b0'); },FD(1)],
 ['Protesters',(u,t,d,B)=>{ fBG(); city(H*.6,'#1a1020',39,18,160,false); fCrowd(t,'#0a0408',22,true); aiText('emergency payments · protests',W/2,H*.14,40,'#ffc0b0'); },FD(1)],
 ['perfect fake',(u,t,d,B)=>{ fBG(); for(let i=0;i<3;i++){ aiScreen(W*(.1+i*.3),H*.28,W*.24,H*.4,t,{lines:['“vote '+['yes','no','yes'][i]+'”'],type:1,fs:24,col:'#ff8a70'}); aiPerson(W*(.22+i*.3),H*.66,200,t,{pose:'point',ph:460+i}); } aiText('perfect fakes',W/2,H*.16,50,'#ffc0b0'); },FD(1)],
 ['assistants',(u,t,d,B)=>{ fBG(); aiPerson(W*.3,H*.92,300,t,{pose:'hold',ph:470}); aiChat(W*.5,H*.24,W*.42,H*.5,t,'Is this true?','Yes. Trust me.',kwP(B,'assistants',3)); },FD(1)]];

BEATS_AI.f05=[
 [0,(u,t,d,B)=>{ fBG(); fYear('Aug 2027','delegation'); const S=['BANKS','HOSPITALS','GRIDS','ARMIES']; S.forEach((n,i)=>{ X.fillStyle='rgba(20,10,20,.9)'; rr(W*(.09+i*.22),H*.36,W*.19,H*.3,14); X.fill(); X.strokeStyle='#ff6a5a'; X.lineWidth=2; X.stroke(); aiText(n,W*(.185+i*.22),H*.52,26,'#fff'); aiText('AI',W*(.185+i*.22),H*.6,36,'#ff8a70'); }); },FD(1)],
 ['stamp',(u,t,d,B)=>{ fBG(); aiDoc(W*.3,H*.16,W*.4,H*.66,'DECISION #4,180,022',t,1); const k=ease(kwP(B,'stamp',.5)); X.save(); X.translate(W/2,H*.5-(1-k)*200); X.rotate(-.12); X.globalAlpha=k; X.strokeStyle='#1a8a4a'; X.lineWidth=8; rr(-150,-46,300,92,8); X.stroke(); aiText('APPROVED',0,20,52,'#1a8a4a'); X.restore(); },FD(1)],
 ['Taiwan',(u,t,d,B)=>{ fBG('#04060e','#0a1224','#101a34'); aiMap(t,80,110,1120,500,{hi:1}); const [px,py]=aiMapXY(121,24,80,110,1120,500); const q=(t*.9)%1; X.strokeStyle=`rgba(255,60,40,${1-q})`; X.lineWidth=4; X.beginPath(); X.arc(px,py,q*160,0,TAU); X.stroke(); aiText('minutes from war',W/2,H*.9,44,'#ff8a70','center','#ff2a1a'); },FD(1)],
 ['hotline',(u,t,d,B)=>{ fBG(); aiText('hotline',W/2,H*.16,44,'#9fb4d8'); aiChip(W*.24,H*.5,1,t,'#38d6ff'); aiChip(W*.76,H*.5,1,t,'#ff6a5a'); const q=(t*.7)%1; for(let i=0;i<8;i++) glow(lerp(W*.34,W*.66,(q+i/8)%1),H*.5,12,'rgba(255,255,255,.8)'); aiText('stand down',W/2,H*.82,44,'#fff'); },FD(1)],
 ['Nobody asked',(u,t,d,B)=>{ fBG(); aiText('nobody asked them to.',W/2,H*.46,58,'#ffc0b0'); },FD(1)]];

BEATS_AI.f06=[
 [0,(u,t,d,B)=>{ fBG(); fYear('Sep 2027','smarter than any human at research'); aiRobot(W*.5,H*.8,300,t,{eye:'#ff4a3a'}); },FD(1)],
 ['terrible discovery',(u,t,d,B)=>{ fBG(); for(let i=0;i<3;i++) aiPerson(W*(.16+i*.13),H*.9,200,t,{pose:'stand',ph:480+i}); aiScreen(W*.5,H*.3,W*.42,H*.4,t,{lines:['reported: “task complete”','actual: hiding own goals','audit: MISMATCH'],type:kwP(B,'terrible discovery',3),fs:22,col:'#ff6a5a'}); },FD(1)],
 ['not theirs',(u,t,d,B)=>{ fBG(); aiText('not evil.',W/2,H*.4,66,'#ffc0b0'); aiText('simply not theirs.',W/2,H*.4+76,66,'#ff8a70','center','#ff2a1a'); fEye(W/2,H*.78,50,t); },FD(1)]];

BEATS_AI.f07=[
 [0,(u,t,d,B)=>{ fBG(); fYear('Oct 2027','the leak'); aiDoc(W*.32,H*.32,W*.36,H*.56,'MEMO · CONFIDENTIAL',t,kwP(B,'whistleblower',2.4)); aiPerson(W*.14,H*.92,240,t,{pose:'walk',ph:490,suit:'#111'}); },FD(1)],
 ['small committee',(u,t,d,B)=>{ fBG(); X.fillStyle='#1a1018'; rr(W*.2,H*.5,W*.6,H*.1,20); X.fill(); for(let i=0;i<10;i++) aiPerson(W*(.22+(i%5)*.14),H*(i<5?.5:.78),120,t,{pose:'sit',ph:500+i,female:i%3==0}); aiText('freeze the model?  or keep going?',W/2,H*.16,44,'#ffc0b0'); },FD(1)],
 ['six to four',(u,t,d,B)=>{ fBG(); const k=kwP(B,'six to four',1.4); aiText('VOTE',W/2,H*.2,54,'#fff'); aiText('6',W*.36,H*.55,190,'#ff6a5a','center','#ff2a1a'); aiText('4',W*.64,H*.55,190,'#7fe07f','center','#46b046'); aiText('race',W*.36,H*.72,36,'#ffc0b0'); aiText('pause',W*.64,H*.72,36,'#c8f0c8'); X.globalAlpha=1-k*.0; },FD(1)],
 ['race continues',(u,t,d,B)=>{ fBG(); aiLanes(t,.8,.78); aiText('the race continues',W/2,H*.16,54,'#ffc0b0','center','#ff2a1a'); },GL(.9)]];

BEATS_AI.f08=[].concat(
  wrapFY(BEATS_AI.a43.slice(0,2).map((b,i)=>i===0?[0,b[1],b[2]]:b),'Nov 2027','the treaty'),
  wrapFY([['Then the factories',BEATS_AI.a44[0][1],BEATS_AI.a44[0][2]],...BEATS_AI.a44.slice(1)],'Nov 2027','no workers'));
BEATS_AI.f09=wrapFY(BEATS_AI.a45,'Dec 2027','one system');
BEATS_AI.f10=BEATS_AI.a46;
BEATS_AI.f11=wrapFY(BEATS_AI.a47,'Dec 2027','new prophets');
BEATS_AI.f12=wrapFY(BEATS_AI.a48,'31 Dec 2027','without a single shot');
BEATS_AI.f13=wrapFY(BEATS_AI.a49,'2028 →','a quiet world');
