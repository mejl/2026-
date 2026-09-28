// ===== story-synced scenes: visual beats keyed to the narrator's words =====
// BT('word') -> seconds into the shot when the caption containing that word starts.
function BT(word, fallback){ const s=window.__shot; if(!s||!s.caps) return fallback||0; const c=s.caps.find(c=>c.text.toLowerCase().includes(word.toLowerCase())); return c? c.start-(s.start+s.card) : (fallback||0); }
function after(lt,word,dur,fb){ return smooth(0,dur||1.5,lt-BT(word,fb)); }
function quad(x,y,s,t,o={}){ // simple four-legged animal (sheep/ox/lion/camel-ish), walking
  const col=o.col||'#2a1c12', walk=o.walk||0, ph=o.ph||0, dir=o.dir||1, c=t*6*walk+ph;
  X.save(); X.translate(x,y); X.scale(dir*s,s); X.fillStyle=col; X.strokeStyle=col; X.lineCap='round';
  X.lineWidth=3.2; for(const [lx,o2] of [[-11,0],[-6,Math.PI],[8,Math.PI],[13,0]]){ const a=Math.sin(c+o2)*.35*walk; X.beginPath(); X.moveTo(lx,-12); X.lineTo(lx+Math.sin(a)*10,-1); X.stroke(); }
  X.beginPath(); X.ellipse(0,-16,16,8,0,0,TAU); X.fill();
  X.beginPath(); X.moveTo(12,-20); X.quadraticCurveTo(18,-30,22,-28); X.lineTo(25,-24); X.quadraticCurveTo(20,-20,15,-14); X.fill();
  X.beginPath(); X.ellipse(24,-27,5,3.5,.3,0,TAU); X.fill();
  if(o.horns){ X.lineWidth=1.6; X.beginPath(); X.moveTo(22,-30); X.quadraticCurveTo(20,-36,25,-37); X.stroke(); }
  X.lineWidth=2; X.beginPath(); X.moveTo(-15,-18); X.quadraticCurveTo(-21,-14+Math.sin(t*3+ph)*2,-20,-8); X.stroke();
  X.restore(); }
function birds(t,n,seed,y0,a=1){ X.save(); X.globalAlpha=a; X.strokeStyle='rgba(30,25,20,.8)'; X.lineWidth=2; for(let i=0;i<n;i++){ const x=(hash(seed+i)*W*1.4+t*(40+hash(seed+i*3)*30))%(W*1.4)-150, y=y0+hash(seed+i*5)*80+Math.sin(t*1.5+i)*8, f=Math.sin(t*9+i*2)*5; X.beginPath(); X.moveTo(x-9,y-f); X.quadraticCurveTo(x-3,y-2,x,y); X.quadraticCurveTo(x+3,y-2,x+9,y-f); X.stroke(); } X.restore(); }
function risingSea(level,t,c1,c2){ water(level,t,c1,c2,10); }

Object.assign(SCENES,{
// Genesis 1 - each stage appears when the narrator says it
creation(lt,d){
  const light=after(lt,'let there be light',2.2,8), skyT=after(lt,'sky',2,16), sea=after(lt,'seas',2,17), land=after(lt,'land',3,18), sun=after(lt,'sun',2.5,19), starT=after(lt,'stars',2,21), life=after(lt,'creature',3,22);
  // the deep, before light
  X.fillStyle='#020306'; X.fillRect(-60,-60,W+120,H+120);
  if(light<1){ water(H*.55,lt*.6,'#05080e','#010204',16); X.globalAlpha=.25*(1-light); for(let i=0;i<8;i++) glow((hash(i+9100)*W+lt*30)%W,H*.45+Math.sin(lt+i)*20,140,'rgba(120,130,160,.5)'); X.globalAlpha=1; }
  // light breaks out
  if(light>0){ X.globalAlpha=light; sky([mixc('#020306','#3a5a9a',skyT),mixc('#1a1a2a','#9ac8f0',skyT),mixc('#2a2030','#ffe6c0',skyT)]); X.globalAlpha=1;
    glow(W*.5,H*.4,lerp(40,900,light)*(1-skyT*.6),'rgba(255,245,220,1)',1-skyT*.7); rays(W*.5,H*.4,40,lt,'rgba(255,240,210,.55)',light*(1-skyT*.8)); }
  // the seas separate and the dry land rises out of them
  if(sea>0||light>0){ const lvl=lerp(H*.55,H*.7,sea); water(lvl,lt,mixc('#0a1420','#2a6a9a',skyT),mixc('#02060a','#0c2a44',skyT),lerp(14,6,sea)); }
  if(land>0){ const rise=ease(land); X.save(); X.translate(0,(1-rise)*220);
    ridge(9201,H*.62,55,mixc('#1a2a1a','#6a9a6a',life*.6+.2),.7); ridge(9202,H*.7,35,mixc('#223018','#4a7a3a',life*.6+.2),1.1); X.restore(); }
  // sun, moon and stars
  if(sun>0){ const sy=lerp(H*.8,H*.2,ease(sun)); disc(W*.78,sy,48,'#fff6d8'); glow(W*.78,sy,300,'rgba(255,240,200,.75)',sun); }
  if(starT>0){ disc(W*.16,H*.16,20,'#e8eeff'); glow(W*.16,H*.16,90,'rgba(220,230,255,.5)',starT); stars(90,9203,lt,starT*.6,H*.35); }
  // plants, birds and animals
  if(life>0){ const g=ease(life); for(let i=0;i<6;i++){ const x=W*(.06+i*.17); X.save(); X.translate(x,H*.66); X.scale(g,g); tree(0,0,1+hash(i)*.4,'#2a3a1a','#3a6a2a'); X.restore(); }
    birds(lt,9,9204,H*.18,g); for(let i=0;i<5;i++){ quad(lerp(-60,W+60,((lt*.03+i*.2)%1)),H*.72+i*6,1.4+hash(i+9205)*.6,lt,{col:'#1e160e',walk:1,ph:i,horns:i%2==0}); } }
},
// Genesis 2 - man formed from dust, breath of life, the garden, Eve
adam(lt,d){
  const breath=after(lt,'breathed',2,6), placed=after(lt,'garden',2,10), eve=after(lt,'rib',2.5,14), walkT=after(lt,'walked',2,18);
  sky(['#8ec2ec','#cfe8f4','#fff0d4']); disc(W*.82,H*.2,44,'#fffbe8'); glow(W*.82,H*.2,260,'rgba(255,248,220,.7)');
  ridge(9301,H*.6,45,'#7aa0b8',.7); ridge(9302,H*.7,35,'#4e8a52',1.1);
  X.fillStyle='#3f7a44'; X.fillRect(-60,H*.8,W+120,H*.3);
  water(H*.83,lt,'#5aa0c8','#2a6a8a',3); X.fillStyle='#3f7a44'; X.fillRect(-60,H*.86,W+120,H*.2);
  for(let i=0;i<5;i++) tree(W*(.05+i*.22)+(i==2?60:0),H*.8,1.3+hash(i+9303)*.5,'#3a2a1a',i==2?'#2e7a3a':'#3a7038');
  // fruit on the tree of life
  for(let i=0;i<8;i++) disc(W*.5+60+Math.cos(i*1.3)*34,H*.8-110+Math.sin(i*2.1)*18,4,'#e8c040');
  birds(lt,6,9304,H*.15,.8); particles('petal',lt,24,9305,.7);
  const ax=lerp(W*.36,W*.46,placed), ay=H*.86;
  if(breath<1){ // dust gathering into a man lying on the ground
    const g=smooth(0,Math.max(.5,BT('breathed',6)),lt);
    for(let i=0;i<140;i++){ const a=hash(i+9310)*TAU, r=lerp(260,0,ease(clamp(g*1.2-hash(i+9311)*.3))); glow(ax+Math.cos(a+lt*.6)*r*1.4,ay-8+Math.sin(a+lt*.6)*r*.4,5,'rgba(190,150,100,.9)',1-breath); }
    X.globalAlpha=g; X.save(); X.translate(ax,ay); X.rotate(-Math.PI/2); figure(0,0,110,lt,{col:'#8a6a4a',pose:'stand',ph:1,female:false}); X.restore(); X.globalAlpha=1; }
  if(breath>0){ glow(ax,ay-60,lerp(200,60,breath),'rgba(255,255,240,.8)',1-placed*.8);
    if(breath<1){ X.save(); X.translate(ax,ay); X.rotate(-Math.PI/2*(1-breath)); figure(0,0,110,lt,{col:'#2a1c14',rim:'#fff4d0',pose:'kneel',ph:1,female:false}); X.restore(); }
    else figure(ax,ay,110,lt,{col:'#2a1c14',rim:'#fff4d0',pose:placed<1?'arms':'stand',ph:1,female:false,walk:placed>0&&placed<1?1:0}); }
  if(eve>0){ glow(ax+50,ay-60,120,'rgba(255,250,235,.7)',1-walkT); X.globalAlpha=eve; figure(ax+48,ay,102,lt,{col:'#2a1c14',rim:'#fff4d0',ph:3,female:true,dir:-1}); X.globalAlpha=1; }
  if(walkT>0){ rays(W*.8,-40,14,lt,'rgba(255,250,230,.35)',walkT,1400,.35); }
},
// Genesis 6 - wickedness, grace, and the building of the ark
arkbuild(lt,d){
  const grace=after(lt,'grace',2,9), build=after(lt,'build an ark',1.5,13);
  const dark=1-grace*.7;
  sky([mixc('#6a3a2a','#6a9ac8',grace),mixc('#8a4a3a','#b8d8ea',grace),mixc('#c07a4a','#f4e2c0',grace)]);
  ridge(9401,H*.66,50,'#6a5a3a',.8); X.fillStyle='#5a4a2c'; X.fillRect(-60,H*.8,W+120,H*.3);
  // violence: a city in smoke on the horizon, fighting silhouettes
  if(dark>.35){ X.globalAlpha=dark; city(H*.68,'#2a1a14',9402,16,90,false); for(let i=0;i<10;i++) glow(W*(.05+i*.1),H*.5-((lt*20+i*30)%120),60,'rgba(40,30,30,.6)');
    for(let i=0;i<6;i++){ const x=W*(.62+i*.06); figure(x,H*.88,78,lt*2,{col:'#140c08',rim:'#ff9a60',pose:i%2?'point':'sling',ph:i,dir:i%2?-1:1}); } X.globalAlpha=1; }
  // the ark rises plank by plank once God commands it
  const ax=W*.36, ay=H*.8, bp=ease(clamp((lt-BT('build an ark',13))/Math.max(3,d-BT('build an ark',13)-1)));
  X.strokeStyle='#4a2e18'; X.lineWidth=5; for(let i=0;i<14;i++){ if(i/14>bp*1.6) break; const x=ax-200+i*31; X.beginPath(); X.moveTo(x,ay-8); X.quadraticCurveTo(x+(i<7?-6:6),ay-60,x,ay-110); X.stroke(); }
  X.fillStyle='#6a4424'; const rows=Math.floor(bp*9); for(let r=0;r<rows;r++){ const y=ay-12-r*11; X.fillRect(ax-205+r*3,y,410-r*6,9); X.fillStyle=r%2?'#6a4424':'#5a3a1e'; }
  X.fillStyle='#3a2414'; X.fillRect(ax-220,ay-6,440,10);
  // Noah hammering, sons carrying planks
  const hit=Math.sin(lt*6)>.8; figure(ax+230,ay+30,120,lt,{col:'#2a1c12',rim:'#fff0c8',pose:hit?'point':'bless',ph:5,female:false});
  if(hit&&build>0){ glow(ax+200,ay-40,20,'rgba(255,240,200,.9)'); }
  for(let i=0;i<2;i++){ const x=((lt*40+i*260)%(W*.5))+W*.02; figure(x,ay+34,104,lt,{col:'#2a1c12',rim:'#ffe6c0',walk:1,ph:i*2}); X.fillStyle='#7a5430'; X.fillRect(x-30,ay+34-104*.72,60,5); }
  // animals arrive two by two near the end
  const ani=smooth(.7,.95,lt/d); if(ani>0){ for(let i=0;i<6;i++){ const x=lerp(W+80,ax+60+(i%3)*60,ani)+Math.floor(i/3)*28; quad(x,ay+40+(i%2)*10,1.1,lt,{col:'#2a1e12',walk:ani<1?1:0,ph:i,dir:-1,horns:i<2}); } }
},
// Genesis 7 - the fountains of the deep and the windows of heaven
deluge(lt,d){
  const fount=after(lt,'fountains',1.5,0), rain=after(lt,'windows',2,4), forty=after(lt,'forty',3,8), cover=after(lt,'covered',3,12);
  sky(['#0a0c12','#1a2030','#2a3242']); for(let i=0;i<12;i++) glow((hash(i+9500)*W*1.4+lt*50)%(W*1.4)-200,H*.12+hash(i+9501)*70,240,'rgba(34,40,52,.95)');
  if(Math.sin(lt*2.3)>.965) flash(.45,'#dfe7ff');
  ridge(9502,H*.5,90,'#1a2018',.6,true); ridge(9503,H*.66,50,'#161c14',.9);
  // fountains bursting from the ground
  if(fount>0&&cover<1) for(let i=0;i<7;i++){ const x=W*(.1+i*.13), hgt=lerp(0,160,fount)*(0.7+.3*Math.sin(lt*4+i)); for(let k=0;k<14;k++){ const u=k/14; glow(x+Math.sin(lt*6+k+i)*6*u,H*.72-hgt*u,14+u*10,'rgba(200,220,240,.55)',1-cover); } }
  particles('rain',lt,lerp(40,420,rain),9504,Math.max(.3,rain));
  // the water rises until even the mountains are gone
  const lvl=lerp(H*.95,H*.3,ease(clamp((forty*.6+cover*.4)))); water(lvl,lt*1.8,'#1c2e40','#04080e',16);
  const arkY=Math.min(H*.76,lvl)-6+Math.sin(lt*1.4)*6; X.save(); X.translate(W*.5+Math.sin(lt*.3)*30,arkY); X.rotate(Math.sin(lt*1.2)*.05);
  X.fillStyle='#3a2616'; X.beginPath(); X.moveTo(-190,-10); X.lineTo(190,-10); X.lineTo(150,40); X.lineTo(-150,40); X.fill(); X.fillStyle='#4d3320'; X.fillRect(-110,-60,220,52); X.fillStyle='#2b1c10'; X.beginPath(); X.moveTo(-125,-60); X.lineTo(0,-100); X.lineTo(125,-60); X.fill(); X.fillStyle='rgba(255,200,120,.85)'; X.fillRect(-20,-45,14,12); X.fillRect(30,-45,14,12); X.restore();
  water(lvl+30,lt*2.2,'rgba(22,40,58,.85)','#04080e',18);
},
// Exodus 1-2 - slavery in Egypt, then the baby in the basket on the Nile
slavery(lt,d){
  const nile=after(lt,'basket',2,9);
  sky(['#6a2a14','#c0602a','#f0b070']); disc(W*.7,H*.42,70,'#ffd8a0'); glow(W*.7,H*.42,360,'rgba(255,190,120,.7)');
  X.fillStyle='#5a2a14'; [[.18,190],[.44,270],[.82,220]].forEach(([k,h])=>{ X.beginPath(); X.moveTo(W*k-h,H*.74); X.lineTo(W*k,H*.74-h); X.lineTo(W*k+h,H*.74); X.fill(); });
  X.fillStyle='#8a5a30'; X.fillRect(-60,H*.74,W+120,H*.3);
  if(nile<1){ X.globalAlpha=1-nile;
    // slaves hauling a stone block on a sledge, taskmaster with a whip
    const bx=((lt*18)%(W+400))-200; X.fillStyle='#b89a70'; X.fillRect(bx,H*.86-70,120,70); X.fillStyle='#5a3a1a'; X.fillRect(bx-10,H*.86,140,8);
    X.strokeStyle='#3a2410'; X.lineWidth=2; X.beginPath(); X.moveTo(bx+120,H*.86-30); X.lineTo(bx+360,H*.86-60); X.stroke();
    for(let i=0;i<6;i++) figure(bx+150+i*40,H*.9,96,lt,{col:'#2a1608',rim:'#ffc080',walk:1,ph:i,pose:'stand'});
    const tx=bx+440; figure(tx,H*.9,120,lt,{col:'#1a0e06',rim:'#ffd090',dir:-1,pose:'point',ph:9}); const wa=Math.sin(lt*3); X.strokeStyle='#1a0e06'; X.lineWidth=1.5; X.beginPath(); X.moveTo(tx-20,H*.9-90); X.quadraticCurveTo(tx-60,H*.9-120+wa*20,tx-90,H*.9-80+wa*30); X.stroke();
    X.globalAlpha=1; }
  if(nile>0){ X.globalAlpha=nile; // the Nile, reeds, the basket, Pharaoh's daughter
    water(H*.72,lt,'#3a6a7a','#12303a',5); for(let i=0;i<40;i++){ const x=hash(i+9600)*W, h=30+hash(i+9601)*40, sw=Math.sin(lt*1.3+i)*4; X.strokeStyle='#3a5a2a'; X.lineWidth=3; X.beginPath(); X.moveTo(x,H*.95); X.quadraticCurveTo(x+sw,H*.95-h*.6,x+sw*2,H*.95-h); X.stroke(); }
    const bx=lerp(W*.2,W*.5,ease(nile))+Math.sin(lt*.5)*20, by=H*.8+Math.sin(lt*1.6)*3;
    X.fillStyle='#b08a4a'; X.beginPath(); X.ellipse(bx,by,34,13,0,0,TAU); X.fill(); X.strokeStyle='#7a5a2a'; X.lineWidth=1.5; for(let k=-2;k<3;k++){ X.beginPath(); X.moveTo(bx+k*12,by-12); X.lineTo(bx+k*12,by+12); X.stroke(); }
    glow(bx,by-8,40,'rgba(255,240,200,.4)');
    figure(W*.78,H*.93,130,lt,{col:'#2a1810',rim:'#ffe0b0',female:true,dir:-1,pose:'point',ph:4}); figure(W*.86,H*.93,118,lt,{col:'#2a1810',rim:'#ffe0b0',female:true,dir:-1,ph:6});
    X.globalAlpha=1; }
}
});
