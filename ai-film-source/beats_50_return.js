// ======= Chapters XI (the Return) and XII (the Kingdom) =======
function rSky(k=1){ sky(['#0a0a1c','#3a3a6a','#c8b890']); stars(160,77,window.__t||0,.6,H*.5); }
function rGlory(t,k){ glow(W/2,H*.1,lerp(60,700,k),'rgba(255,250,230,1)',k*.7); rays(W/2,H*.08,50,t,'rgba(255,245,210,.4)',k*.8); }

BEATS_AI.a51=[
 [0,(u,t,d,B)=>{ sky(['#5a78a0','#a8c0d8','#e8e4d0']); X.fillStyle='#5a7a4a'; X.fillRect(-60,H*.8,W+120,H*.3); for(let i=0;i<8;i++) aiPerson(W*(.08+i*.11),H*.94,170,t,{pose:'stand',ph:520+i,suit:['#3a5a8a','#8a4a3a','#4a7a4a','#7a6a3a'][i%4],female:i%2==0}); aiText('ordinary days',W/2,H*.18,54,'#fff','center','#3a5a8a'); },FD(1)],
 ['Noah',(u,t,d,B)=>{ sky(['#7a8aa0','#b8c4d0','#e8e4d0']); X.fillStyle='#5a7a4a'; X.fillRect(-60,H*.8,W+120,H*.3); X.fillStyle='#e8dcc0'; rr(W*.3,H*.62,W*.4,H*.06,4); X.fill(); for(let i=0;i<5;i++){ X.fillStyle='#c0402a'; rr(W*(.33+i*.07),H*.58,26,30,3); X.fill(); } aiText('“like the days of Noah”',W/2,H*.2,50,'#fff','center','#3a4a6a'); aiText('Matthew 24:37–39',W/2,H*.2+44,26,'#eef'); },FD(1)],
 ['no date',(u,t,d,B)=>{ fBG('#0a0a1c','#1a1a34','#2a2a4a'); aiText('?',W/2,H*.62,300,'#5a5a8a'); aiText('NO DATE IS GIVEN',W/2,H*.86,50,'#ffe9a8','center','#d4a437'); },FD(1)]];

BEATS_AI.a52=[
 [0,(u,t,d,B)=>{ rSky(); const k=ease(kwP(B,'shout',2.5)); rGlory(t,k); X.save(); X.globalAlpha=.5+.5*k; for(let i=0;i<10;i++){ const x=W*(.1+i*.09); aiWing(x,H*.2+Math.sin(i*2)*50,.8,i%2?1:-1,t,'#fffaf0'); } X.restore(); },FD(1)],
 ['trumpet',(u,t,d,B)=>{ rSky(); rGlory(t,1); ANGEL&&ANGEL(W*.5,H*.4,220,t,{}); particles('sparkle',t,90,5252,1); aiText('the trumpet of God',W/2,H*.9,40,'#fff','center','#d4a437'); },FD(1)],
 ['clouds',(u,t,d,B)=>{ rSky(); const k=ease(kwP(B,'Every eye',3)); rGlory(t,.7+.3*k); JESUS(W/2,lerp(H*.4,H*.72,k),260,t,{pose:'arms'}); for(let i=0;i<9;i++){ glow(W*(.1+i*.1),H*(.78+.03*Math.sin(i)),140,'rgba(255,255,255,.55)'); } aiText('every eye will see him',W/2,H*.9,44,'#fff','center','#d4a437'); },FD(1)],
 ['screens go dark',(u,t,d,B)=>{ const k=kwP(B,'screens go dark',1.6); fBG('#000','#0a0410','#12081a'); for(let i=0;i<12;i++){ X.fillStyle=k>(i%6)*.15?'#000':'#101828'; rr(W*(.03+(i%6)*.16),H*(.16+Math.floor(i/6)*.36),W*.14,H*.3,8); X.fill(); if(k<(i%6)*.15) fEye(W*(.1+(i%6)*.16),H*(.31+Math.floor(i/6)*.36),18,t); } aiText('every system falls silent',W/2,H*.9,40,'#c8d4e8'); },GL(1)]];

BEATS_AI.a53=[
 [0,(u,t,d,B)=>{ rSky(); rGlory(t,1); JESUS(W/2,H*.72,270,t,{pose:'arms'}); X.fillStyle='rgba(60,10,10,.6)'; X.fillRect(0,H*.82,W,H*.2); aiText('by the breath of his mouth',W/2,H*.9,40,'#fff','center','#d4a437'); },FD(1)],
 ['rise first',(u,t,d,B)=>{ rSky(); rGlory(t,.8); X.fillStyle='#1a2a14'; X.fillRect(-60,H*.82,W+120,H*.3); for(let i=0;i<10;i++){ const k=kwP(B,'rise first',2.4,i*.1); figure(W*(.06+i*.095),H*.98-k*H*.1,120,t,{col:'#fff8e8',rim:'#fff',ph:i*4,pose:'arms'}); } aiText('the dead in Christ rise first',W/2,H*.16,42,'#fff','center','#d4a437'); },FD(1)],
 ['many crowns',(u,t,d,B)=>{ rSky(); rGlory(t,1); JESUS(W/2,H*.78,300,t,{pose:'arms'}); for(let i=0;i<7;i++){ const a=-Math.PI/2+(i-3)*.28; glow(W/2+Math.sin((i-3)*.28)*90,H*.32-Math.cos((i-3)*.28)*40,26,'rgba(255,215,90,.95)'); } aiText('KING OF KINGS · LORD OF LORDS',W/2,H*.92,40,'#ffe9a8','center','#d4a437'); },FD(1.2)]];

BEATS_AI.a54=[
 [0,(u,t,d,B)=>{ sky(['#3a70b0','#c89a6a','#e8c48a']); rays(W*.5,H*.1,30,t,'rgba(255,240,200,.3)',1); city(H*.7,'#f6e2a8',5454,22,200,true); aiText('a new heaven and a new earth',W/2,H*.16,46,'#fff','center','#d4a437'); },FD(1)],
 ['wipe away',(u,t,d,B)=>{ sky(['#3a70b0','#c89a6a','#e8c48a']); city(H*.72,'#f6e2a8',5454,22,200,true); aiPerson(W*.5,H*.95,300,t,{pose:'stand',ph:530,female:true}); particles('sparkle',t,60,5455,1); aiText('every tear wiped away',W/2,H*.16,46,'#fff','center','#d4a437'); },FD(1)],
 ['no more death',(u,t,d,B)=>{ sky(['#3a70b0','#c89a6a','#e8c48a']); city(H*.72,'#f6e2a8',5454,22,200,true); ['death','sorrow','crying','pain'].forEach((n,i)=>{ const k=kwP(B,'no more death',.6,i*.6); X.globalAlpha=k; aiText('no more '+n,W/2,H*(.26+i*.12),46,'#fff','center','#a06a20'); X.globalAlpha=1; }); },FD(1)],
 ['all things new',(u,t,d,B)=>{ sky(['#8ec8ff','#ffd9a8','#fff2dc']); glow(W/2,H*.4,lerp(200,900,kwP(B,'all things new',3)),'rgba(255,252,240,.9)'); city(H*.74,'#f6e2a8',5454,22,200,true); aiText('“Behold, I am making all things new.”',W/2,H*.2,44,'#3a2408','center','#fff'); particles('petal',t,50,5456,1); },FD(1.2)]];

BEATS_AI.a55=[
 [0,(u,t,d,B)=>{ BG.hill?BG.hill(t):sky(['#8ec8ff','#ffd9a8','#fff2dc']); X.fillStyle='#7aba82'; X.fillRect(-60,H*.78,W+120,H*.3); for(let i=0;i<5;i++){ X.save(); X.translate(W*(.12+i*.18),H*.8); const k=kwP(B,'swords',2.4,i*.1); X.strokeStyle='#8a8a94'; X.lineWidth=10; X.beginPath(); X.moveTo(0,0); X.lineTo(0,-200*(1-k*.5)); X.stroke(); X.fillStyle='#5a7a3a'; X.beginPath(); X.ellipse(0,-200*(1-k*.5)-20,30*k+8,14,0,0,TAU); X.fill(); X.restore(); } aiText('swords into plowshares',W/2,H*.16,46,'#3a2408','center','#fff'); },FD(1)],
 ['wolf',(u,t,d,B)=>{ sky(['#8ec8ff','#ffd9a8','#fff2dc']); X.fillStyle='#7aba82'; X.fillRect(-60,H*.78,W+120,H*.3); X.fillStyle='#8a8a94'; X.beginPath(); X.ellipse(W*.36,H*.84,90,42,0,0,TAU); X.fill(); X.beginPath(); X.arc(W*.26,H*.8,32,0,TAU); X.fill(); X.fillStyle='#f4f0e8'; X.beginPath(); X.ellipse(W*.62,H*.86,54,28,0,0,TAU); X.fill(); X.beginPath(); X.arc(W*.56,H*.83,20,0,TAU); X.fill(); aiText('the wolf shall dwell with the lamb',W/2,H*.2,44,'#3a2408','center','#fff'); },FD(1)],
 ['waters cover the sea',(u,t,d,B)=>{ sky(['#8ec8ff','#ffd9a8','#fff2dc']); water(H*.6,t,'#5aa0d8','#1a4a88',6); glow(W/2,H*.3,500,'rgba(255,250,220,.6)'); aiText('the earth full of the knowledge of the Lord',W/2,H*.2,42,'#3a2408','center','#fff'); },FD(1.2)]];

BEATS_AI.a56=[
 [0,(u,t,d,B)=>{ fBG('#0a0a1c','#1a1a34','#2a2a4a'); aiText('📖',W/2,H*.56,220,'#ffe9a8'); X.save(); X.globalAlpha=.9; aiText('the sealed book, opened',W/2,H*.2,50,'#ffe9a8','center','#d4a437'); X.restore(); },FD(1)],
 ['grew beyond',(u,t,d,B)=>{ fBG('#0a0a1c','#1a1a34','#2a2a4a'); aiChart(W*.15,H*.24,W*.7,H*.5,[1,1,2,2,3,5,8,14,30,70,150],kwP(B,'grew beyond',3),'#ffe9a8'); aiText('knowledge shall be increased',W/2,H*.86,42,'#ffe9a8','center','#d4a437'); },FD(1)],
 ['last word',(u,t,d,B)=>{ rSky(); const k=kwP(B,'last word',5); rGlory(t,.3+.7*k); aiText('Come, Lord Jesus.',W/2,H*.5,100,'#fff','center','#d4a437'); particles('sparkle',t,60,5657,k); },FD(2)]];
