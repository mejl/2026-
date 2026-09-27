// ===== feature-length additions =====
function tree(x,y,s,col,leaf){ X.fillStyle=col; X.beginPath(); X.moveTo(x-6*s,y); X.quadraticCurveTo(x-3*s,y-40*s,x-10*s,y-70*s); X.lineTo(x+8*s,y-70*s); X.quadraticCurveTo(x+3*s,y-40*s,x+6*s,y); X.fill();
  X.fillStyle=leaf||col; for(let i=0;i<7;i++){ X.beginPath(); X.ellipse(x+Math.cos(i*1.3)*26*s,y-78*s+Math.sin(i*2.1)*14*s,24*s,14*s,i,0,TAU); X.fill(); } }
function olive(x,y,s,col){ X.strokeStyle=col; X.lineWidth=7*s; X.lineCap='round'; X.beginPath(); X.moveTo(x,y); X.bezierCurveTo(x-10*s,y-30*s,x+14*s,y-50*s,x-4*s,y-80*s); X.moveTo(x+2*s,y-40*s); X.quadraticCurveTo(x+30*s,y-55*s,x+40*s,y-75*s); X.stroke();
  X.fillStyle=col; for(let i=0;i<9;i++){ X.beginPath(); X.ellipse(x+(hash(i+s*9)*90-40)*s,y-(80+hash(i+7)*30)*s,22*s,10*s,hash(i)*3,0,TAU); X.fill(); } }
function table(x,y,w){ X.fillStyle='#1a0e06'; X.fillRect(x-w/2,y,w,14); X.fillRect(x-w/2+10,y+14,8,40); X.fillRect(x+w/2-18,y+14,8,40); }
function boat(x,y,s,t,col){ X.save(); X.translate(x,y); X.rotate(Math.sin(t*1.3)*.08); X.scale(s,s); X.fillStyle=col; X.beginPath(); X.moveTo(-120,0); X.quadraticCurveTo(0,40,120,0); X.lineTo(100,-10); X.lineTo(-100,-10); X.fill(); X.fillRect(-3,-170,6,160); X.fillStyle='rgba(230,220,200,.9)'; X.beginPath(); X.moveTo(0,-165); X.quadraticCurveTo(60+Math.sin(t*2)*8,-100,0,-30); X.fill(); X.restore(); }
Object.assign(SCENES,{
expel(lt,d){ const p=lt/d; sky(['#1a0a14','#4a1a24','#b0502a']);
  // gate of Eden with light behind
  glow(W*.7,H*.55,420,'rgba(255,200,120,.75)'); rays(W*.7,H*.55,24,lt,'rgba(255,220,160,.4)',1);
  tree(W*.62,H*.8,1.6,'#120608','#1e0c10'); tree(W*.8,H*.8,1.9,'#120608','#1e0c10');
  // cherub with flaming sword
  const cx=W*.7, cy=H*.72; glow(cx,cy-120,140,'rgba(255,240,210,.9)'); X.save(); X.globalCompositeOperation='lighter';
  for(const side of [-1,1]){ X.fillStyle='rgba(255,240,210,.55)'; X.beginPath(); X.moveTo(cx,cy-130); X.quadraticCurveTo(cx+side*140,cy-230+Math.sin(lt*2)*10,cx+side*190,cy-110); X.quadraticCurveTo(cx+side*90,cy-120,cx,cy-90); X.fill(); }
  X.restore(); figure(cx,cy,130,lt,{col:'#fff3dc',rim:'#fff',pose:'staff'});
  const sw=lt*2.2; X.save(); X.translate(cx+22,cy-110); X.rotate(Math.sin(sw)*.6-.3); X.globalCompositeOperation='lighter'; for(let k=0;k<14;k++) glow(0,-k*9,16-k*.6,'rgba(255,'+(140+k*8)+',40,.8)'); X.restore();
  particles('ember',lt,70,701,1); X.fillStyle='#0a0406'; X.fillRect(0,H*.8,W,H*.2);
  // Adam and Eve walking away
  const wx=lerp(W*.46,W*.12,p); figure(wx,H*.92,105,lt,{col:'#050203',rim:'#ffb070',walk:1,dir:-1}); figure(wx+36,H*.92,96,lt,{col:'#050203',rim:'#ffb070',walk:1,dir:-1,ph:1.3}); },
cain(lt,d){ const p=lt/d; sky(['#3a2a3a','#8a5a4a','#d8a070']); disc(W*.5,H*.55,60,'#ffe0b0'); glow(W*.5,H*.55,300,'rgba(255,210,150,.6)');
  ridge(711,H*.7,40,'#6a4a3a',.8); X.fillStyle='#4a3020'; X.fillRect(0,H*.78,W,H*.22);
  for(const [x,ok] of [[W*.3,1],[W*.7,0]]){ X.fillStyle='#3a2a1e'; X.fillRect(x-40,H*.72,80,40); for(let k=0;k<22;k++){ const u=(lt*.2+k/22)%1; const sx=x+Math.sin(u*6+k)*(ok?6:30)*u, sy=H*.72-u*(ok?420:160); glow(sx,sy,30+u*40,ok?'rgba(230,230,240,.35)':'rgba(90,80,70,.4)',1-u); } }
  figure(W*.36,H*.9,110,lt,{col:'#1a0e08',rim:'#ffe0b0',pose:p<.5?'arms':'kneel'}); figure(W*.64,H*.9,115,lt,{col:'#1a0e08',rim:'#ff9a60',dir:-1,pose:'stand'});
  if(p>.55){ const q=smooth(.55,.75,p); X.globalAlpha=q*.5; X.fillStyle='#3a0000'; X.fillRect(0,0,W,H); X.globalAlpha=1; } },
babel(lt,d){ const p=lt/d; sky(['#2a3a6a','#c07a5a','#f0c890']); glow(W*.2,H*.6,360,'rgba(255,210,150,.7)');
  X.fillStyle='#6a4a30'; X.fillRect(0,H*.8,W,H*.2);
  // ziggurat tower rising in tiers
  const tiers=Math.floor(lerp(3,9,smooth(0,.6,p))); for(let i=0;i<tiers;i++){ const w=520-i*52, y=H*.8-i*56; X.fillStyle=i%2?'#8a6040':'#9a6a46'; X.fillRect(W*.55-w/2,y-56,w,56); X.fillStyle='rgba(0,0,0,.25)'; X.fillRect(W*.55+w/2-40,y-56,40,56); for(let k=0;k<w/40;k++){ X.fillStyle='rgba(40,20,10,.5)'; X.fillRect(W*.55-w/2+10+k*40,y-40,12,18);} }
  // ramp and workers
  crowd(W*.05,W*.45,H*.93,55,lt,14,'#2a1a0e',16,721);
  if(p>.6){ const q=smooth(.6,.75,p); flash((smooth(.6,.62,p)-smooth(.62,.7,p))*.7); X.textAlign='center'; X.font='italic 28px Georgia'; ['?!','¿?','??','!!','…?','?'].forEach((s,i)=>{ X.globalAlpha=q*(.5+.5*Math.sin(lt*3+i)); X.fillStyle='#fff'; X.fillText(s,W*(.1+i*.15),H*.55-((lt*40+i*50)%120)); }); X.globalAlpha=1;
    X.globalAlpha=q; crowd(W*.1,W*.9,H*.97,60,lt,-60,'#1a0e06',10,722); crowd(W*.9,W*.1,H*.99,60,lt,60,'#1a0e06',10,723); X.globalAlpha=1; }
  particles('dust',lt,60,724,.7); },
joseph(lt,d){ const p=lt/d;
  if(p<.4){ sky(['#c0602a','#e89a4a','#ffd8a0']); glow(W*.5,H*.4,400,'rgba(255,200,130,.7)'); X.fillStyle='#b07a40'; X.fillRect(0,H*.78,W,H*.22);
    // well/cistern and the coat of many colors
    X.fillStyle='#5a3a20'; X.beginPath(); X.ellipse(W*.35,H*.8,70,20,0,0,TAU); X.fill(); X.fillStyle='#2a1a0c'; X.beginPath(); X.ellipse(W*.35,H*.8,55,14,0,0,TAU); X.fill();
    X.save(); X.translate(W*.55,H*.72); X.rotate(Math.sin(lt)*.05); ['#d33','#e90','#ed2','#3a4','#36c','#839'].forEach((c,i)=>{ X.fillStyle=c; X.fillRect(-60,-70+i*20,120,20); }); X.restore();
    for(let i=0;i<4;i++) figure(W*(.72+i*.06),H*.9,100,lt,{col:'#2a1608',rim:'#ffe0a0',dir:-1,ph:i});
    // caravan with camels leaving
    for(let i=0;i<3;i++){ const x=lerp(W*.1,-200,p/.4)+i*90; X.fillStyle='#3a220e'; X.beginPath(); X.ellipse(x,H*.8-40,40,20,0,0,TAU); X.fill(); X.fillRect(x-30,H*.8-30,6,30); X.fillRect(x+24,H*.8-30,6,30); X.fillRect(x+34,H*.8-80,8,40); X.beginPath(); X.ellipse(x+44,H*.8-82,12,7,0,0,TAU); X.fill(); X.beginPath(); X.arc(x-4,H*.8-60,14,Math.PI,0); X.fill(); } }
  else { const q=(p-.4)/.6; sky(['#1a1030','#6a3a4a','#e0a060']);
    // Egyptian palace hall with columns and Joseph in gold
    glow(W*.5,H*.4,480,'rgba(255,210,130,.6)'); for(let i=0;i<6;i++){ const x=W*(.1+i*.16); X.fillStyle='#c89a5a'; X.fillRect(x-24,H*.2,48,H*.6); X.fillStyle='#e0b870'; X.fillRect(x-34,H*.18,68,20); X.fillStyle='#2a6a8a'; X.fillRect(x-24,H*.3,48,8); X.fillStyle='#b0402a'; X.fillRect(x-24,H*.34,48,6); }
    X.fillStyle='#3a2410'; X.fillRect(0,H*.8,W,H*.2); X.fillStyle='#e0b24a'; X.fillRect(W*.44,H*.6,W*.12,H*.2);
    figure(W*.5,H*.62,120,lt,{col:'#e8c86a',rim:'#fff6d0',pose:q>.5?'arms':'stand'}); glow(W*.5,H*.5,80,'rgba(255,240,180,.6)');
    for(let i=0;i<5;i++) figure(W*(.2+i*.05),H*.94,90,lt,{col:'#140a04',rim:'#ffc070',pose:'kneel',ph:i});
    particles('sparkle',lt,50,731,.8); } },
bush(lt,d){ const p=lt/d; sky(['#1a0a08','#3a1a10','#6a3a1a']); ridge(741,H*.62,70,'#2a140a',.7,true); X.fillStyle='#1a0c06'; X.fillRect(0,H*.78,W,H*.22);
  const bx=W*.6, by=H*.78; glow(bx,by-60,lerp(200,420,(Math.sin(lt*3)+1)/2),'rgba(255,150,50,.8)'); rays(bx,by-60,20,lt,'rgba(255,190,90,.35)',1);
  // bush branches (not consumed)
  X.strokeStyle='#2a1a0a'; X.lineWidth=5; for(let i=0;i<9;i++){ X.beginPath(); X.moveTo(bx,by); X.quadraticCurveTo(bx+(i-4)*12,by-50,bx+(i-4)*22,by-90-hash(i+742)*30); X.stroke(); }
  X.save(); X.globalCompositeOperation='lighter'; for(let i=0;i<60;i++){ const u=(lt*1.4+hash(i+743))%1; glow(bx+(hash(i+744)-.5)*140*(1-u*.5)+Math.sin(lt*6+i)*6, by-20-u*150, 26*(1-u)+4, 'rgba(255,'+(120+u*120|0)+',40,.55)'); } X.restore();
  figure(W*.3,H*.9,130,lt,{col:'#0a0402',rim:'#ffb060',pose:p<.45?'staff':'kneel'}); particles('ember',lt,80,745,1);
  if(p>.55){ X.globalAlpha=smooth(.55,.7,p)*.9; X.textAlign='center'; X.font='italic 40px Georgia, serif'; X.fillStyle='#ffe0a0'; X.shadowColor='#ff8a30'; X.shadowBlur=30; X.fillText('I AM WHO I AM',W*.6,H*.22); X.shadowBlur=0; X.globalAlpha=1; } },
plagues(lt,d){ const p=lt/d; const k=Math.min(4,Math.floor(p*5)), q=(p*5)%1;
  if(k===0){ sky(['#2a0808','#6a1010','#a02020']); water(H*.62,lt,'#8a0a0a','#2a0000',8); X.fillStyle='#1a0404'; X.fillRect(0,H*.82,W,H*.18); }
  else if(k===1){ sky(['#101010','#2a2a30','#4a4a50']); for(let i=0;i<180;i++){ const x=hash(i+751)*W, y=(lt*500+hash(i+752)*H)%H; disc(x,y,3,'#e8f0ff'); } if(Math.sin(lt*4)>.9) flash(.4,'#dfe7ff'); ridge(753,H*.8,20,'#101012'); }
  else if(k===2){ sky(['#3a3010','#6a5a20','#9a8a40']); for(let i=0;i<500;i++){ const x=(hash(i+754)*W*1.2+lt*(200+hash(i)*200))%(W*1.2)-50, y=hash(i+755)*H*.8+Math.sin(lt*8+i)*10; X.fillStyle='#1a1406'; X.fillRect(x,y,5,2); } ridge(756,H*.8,20,'#2a2008'); }
  else if(k===3){ sky(['#000','#030305','#08080c']); glow(W*.5,H*.5,200,'rgba(40,40,60,.4)'); X.fillStyle='#fff'; X.globalAlpha=.3; X.textAlign='center'; X.font='italic 26px Georgia'; X.fillText('darkness that could be felt',W/2,H*.5); X.globalAlpha=1; }
  else { sky(['#05050e','#101428','#1a2040']); stars(200,757,lt,.7,H*.5); city(H*.8,'#0a0a14',758,14,120,false);
    // door marked with blood of the lamb, light inside
    const dx=W*.5; X.fillStyle='#1a1410'; X.fillRect(dx-80,H*.45,160,H*.35); X.fillStyle='rgba(255,200,120,.95)'; X.fillRect(dx-40,H*.55,80,H*.25); glow(dx,H*.66,140,'rgba(255,190,110,.6)');
    X.fillStyle='#a01010'; X.fillRect(dx-46,H*.52,92,8); X.fillRect(dx-46,H*.52,8,H*.28); X.fillRect(dx+38,H*.52,8,H*.28);
    X.fillStyle='#05050a'; X.fillRect(0,H*.8,W,H*.2); // passing shadow
    X.globalAlpha=.5; glow(lerp(-200,W+200,q),H*.3,260,'rgba(0,0,0,.9)'); X.globalAlpha=1; }
  flash(1-smooth(0,.08,q),'#000'); X.textAlign='center'; X.font='bold 22px Georgia'; X.fillStyle='rgba(255,220,180,.8)'; X.fillText(['BLOOD','HAIL','LOCUSTS','DARKNESS','PASSOVER'][k],W/2,90); },
baptism(lt,d){ const p=lt/d; sky(['#6aa8e0','#bfe0f0','#fff0d0']); ridge(761,H*.6,40,'#8aa870',.8); ridge(762,H*.68,30,'#5a8050',1.2);
  const open=smooth(.35,.55,p); glow(W*.5,-20,lerp(50,500,open),'rgba(255,255,240,1)',open); rays(W*.5,-40,30,lt,'rgba(255,255,230,.6)',open*.8,1400,.5);
  water(H*.7,lt,'#3a7aa0','#12384e',6);
  figure(W*.42,H*.9,140,lt,{col:'#2a3a4a',rim:'#fff8e0',pose:'staff'}); figure(W*.56,H*.9,145,lt,{col:'#e8e4d8',rim:'#fff',pose:open>.5?'arms':'stand'});
  X.fillStyle='rgba(40,90,120,.7)'; X.fillRect(0,H*.84,W,H*.16);
  if(open>.3){ const dy=lerp(H*.05,H*.62,smooth(.45,.7,p)); const x=W*.56, f=Math.sin(lt*10); X.fillStyle='#fff'; X.beginPath(); X.ellipse(x,dy,12,7,0,0,TAU); X.fill(); X.strokeStyle='#fff'; X.lineWidth=4; X.beginPath(); X.moveTo(x-30,dy-f*12); X.quadraticCurveTo(x-10,dy-6,x,dy); X.quadraticCurveTo(x+10,dy-6,x+30,dy-f*12); X.stroke(); glow(x,dy,60,'rgba(255,255,255,.8)'); }
  particles('sparkle',lt,40,763,open); },
sermon(lt,d){ const p=lt/d; sky(['#7ab0e0','#d0e6f0','#ffe8c8']); disc(W*.8,H*.25,50,'#fff8e0'); glow(W*.8,H*.25,260,'rgba(255,245,210,.7)');
  X.fillStyle='#6a9a5a'; X.beginPath(); X.moveTo(-20,H); X.quadraticCurveTo(W*.35,H*.35,W*.7,H*.62); X.quadraticCurveTo(W*.9,H*.72,W+20,H*.75); X.lineTo(W+20,H); X.fill();
  X.fillStyle='#4a7a42'; X.fillRect(0,H*.88,W,H*.12); tree(W*.08,H*.8,1.2,'#2a3a1a','#3a5a2a');
  figure(W*.36,H*.46,95,lt,{col:'#e8e4d8',rim:'#fff',pose:Math.sin(lt*.7)>0?'arms':'stand'}); glow(W*.36,H*.4,70,'rgba(255,250,230,.5)');
  for(let r=0;r<4;r++) for(let i=0;i<14;i++){ const x=W*(.3+i*.05)+r*20+hash(i*r+770)*16, y=H*(.62+r*.08); if(x<W) figure(x,y,40+r*14,lt,{col:'#2a3a2a',rim:'#fff0c0',pose:'kneel',ph:i+r,dir:-1}); }
  particles('petal',lt,20,771,.6); },
supper(lt,d){ const p=lt/d; X.fillStyle=grad(['#0e0804','#1e1208','#2a180a']); X.fillRect(0,0,W,H);
  // arched window + lamps
  X.fillStyle='#0a1430'; X.beginPath(); X.moveTo(W*.44,H*.5); X.lineTo(W*.44,H*.25); X.arc(W*.5,H*.25,W*.06,Math.PI,0); X.lineTo(W*.56,H*.5); X.fill(); stars(30,781,lt,.8,H*.5);
  for(const lx of [W*.25,W*.75]){ glow(lx,H*.5,260,'rgba(255,170,70,.45)'); X.globalCompositeOperation='lighter'; for(let k=0;k<4;k++) glow(lx+Math.sin(lt*8+k)*2,H*.48-k*5,16-k*3,'rgba(255,190,90,.7)'); X.globalCompositeOperation='source-over'; }
  table(W*.5,H*.66,W*.72);
  for(let i=0;i<13;i++){ const x=W*.16+i*W*.056; const me=i===6; figure(x,H*.66,me?120:105,lt,{col:me?'#e8e0cc':'#120a04',rim:me?'#fff':'#ffb060',pose:me&&p>.3?'arms':'stand',ph:i,dir:i<6?1:-1}); }
  // bread and cup
  X.fillStyle='#c89a5a'; X.beginPath(); X.ellipse(W*.47,H*.655,18,7,0,0,TAU); X.fill(); X.fillStyle='#9a7a3a'; X.fillRect(W*.53-6,H*.62,12,22); X.beginPath(); X.ellipse(W*.53,H*.62,12,5,0,0,TAU); X.fill(); X.fillStyle='#6a0a1a'; X.beginPath(); X.ellipse(W*.53,H*.62,9,3,0,0,TAU); X.fill();
  glow(W*.5,H*.55,120,'rgba(255,240,200,.35)'); },
gethsemane(lt,d){ const p=lt/d; sky(['#02030a','#08102a','#101c40']); disc(W*.78,H*.2,40,'#e8eeff'); glow(W*.78,H*.2,240,'rgba(200,215,255,.45)'); stars(150,791,lt,.8,H*.6);
  ridge(792,H*.72,30,'#050810'); for(let i=0;i<6;i++) olive(W*(.05+i*.18),H*.86,1.1+hash(i+793)*.4,'#03050a');
  X.fillStyle='#04060c'; X.fillRect(0,H*.84,W,H*.16); X.fillStyle='#1a1a24'; X.beginPath(); X.ellipse(W*.5,H*.86,70,18,0,0,TAU); X.fill();
  figure(W*.5,H*.86,120,lt,{col:'#0a0c18',rim:'#c8d4ff',pose:'kneel'}); glow(W*.5,H*.7,90,'rgba(200,215,255,.3)');
  if(p>.62){ const q=smooth(.62,.8,p); for(let i=0;i<8;i++){ const x=lerp(W+80,W*.62,q)+i*40; glow(x,H*.72,50,'rgba(255,160,60,.8)',q); figure(x,H*.9,100,lt,{col:'#050303',rim:'#ffa050',walk:1,dir:-1,ph:i}); } } },
ascend(lt,d){ const p=lt/d; sky(['#5aa0e8','#b8dcf4','#fff4dc']); ridge(801,H*.72,50,'#7a9a6a',.7); X.fillStyle='#5a7a4a'; X.fillRect(0,H*.82,W,H*.18);
  const rise=ease(smooth(.15,.75,p)); const y=lerp(H*.8,H*.1,rise); glow(W*.5,y-60,lerp(80,300,rise),'rgba(255,255,240,.95)'); rays(W*.5,y-60,30,lt,'rgba(255,255,230,.5)',rise);
  X.globalAlpha=1-smooth(.7,.85,p); figure(W*.5,y,130,lt,{col:'#f4f0e4',rim:'#fff',pose:'arms'}); X.globalAlpha=1;
  // cloud receiving him
  for(let i=0;i<8;i++) glow(W*.5+(i-3.5)*50,H*.12+Math.sin(i)*10,120,'rgba(255,255,255,.85)',smooth(.5,.8,p));
  for(let i=0;i<11;i++) figure(W*(.22+i*.052),H*.95,95,lt,{col:'#1a2230',rim:'#fff6d0',pose:'arms',ph:i,dir:i<5?1:-1});
  if(p>.8){ const q=smooth(.8,.92,p); X.globalAlpha=q; figure(W*.3,H*.9,125,lt,{col:'#fffdf5',rim:'#fff'}); figure(W*.7,H*.9,125,lt,{col:'#fffdf5',rim:'#fff',dir:-1}); X.globalAlpha=1; } },
ship(lt,d){ const p=lt/d; sky(['#05080c','#141c28','#243040']); particles('rain',lt,320,811,1);
  for(let i=0;i<12;i++) glow((hash(i+812)*W*1.4+lt*40)%(W*1.4)-200,H*.12+hash(i+813)*60,240,'rgba(40,48,60,.95)');
  if(Math.sin(lt*2.6)>.96) flash(.5,'#dfe7ff');
  water(H*.62,lt*1.8,'#16283a','#04080e',22);
  boat(W*.5+Math.sin(lt*.5)*40,H*.66+Math.sin(lt*1.7)*14,1.2,lt*1.6,'#1a0e06');
  water(H*.72,lt*2.2,'rgba(22,40,58,.9)','#04080e',26);
  for(let i=0;i<40;i++){ const x=hash(i+814)*W, y=H*.66+Math.sin(lt*3+i)*20; glow(x,y,14,'rgba(220,235,255,.4)'); }
  if(p>.7){ const q=smooth(.7,.85,p); X.globalAlpha=q; sky(['rgba(120,160,200,.9)','rgba(230,210,180,.9)','rgba(250,230,190,.9)']); X.globalAlpha=1; if(q>.5){ city(H*.78,'#6a5040',815,20,110,true); X.fillStyle='#4a3a2a'; X.fillRect(0,H*.78,W,H*.22); X.fillStyle='#e8d8b8'; X.font='bold 30px Georgia'; X.textAlign='center'; X.fillText('ROMA',W/2,H*.3); figure(W*.5,H*.95,120,lt,{col:'#1a1008',rim:'#fff0c8',walk:1}); } } }
});
