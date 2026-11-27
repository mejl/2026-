// ===== key frame 1: Jesus close-up, rainy neon street at night (3/4 view facing left) =====
function KF1(X){
  SEED=21;
  // ---------- background: blurred night street, neon bokeh ----------
  let g=X.createLinearGradient(0,0,0,H); g.addColorStop(0,'#090a2c'); g.addColorStop(.55,'#1e1450'); g.addColorStop(1,'#120c30'); X.fillStyle=g; X.fillRect(0,0,W,H);
  X.save(); X.filter='blur(9px)';
  for(let i=0;i<9;i++){ const x=i*230-60+R()*60, w=150+R()*120, h=420+R()*420; X.fillStyle=['#161a4e','#1b1658','#121646'][i%3]; X.fillRect(x,H*.62-h,w,h+300);
    for(let r=0;r<16;r++) for(let c=0;c<4;c++){ if(R()<.45) continue; const col=['#ffcf7a','#ff86c8','#7fdcff','#ffb35a'][(R()*4)|0]; X.globalAlpha=.55+R()*.45; X.fillStyle=col; X.fillRect(x+12+c*(w-24)/4,H*.62-h+20+r*26,(w-24)/4-10,13); } X.globalAlpha=1; }
  X.restore();
  // neon sign, out of focus, upper left
  X.save(); X.filter='blur(5px)'; X.font='900 64px "Inter Display","Inter",sans-serif'; X.textAlign='center'; X.letterSpacing='4px';
  X.shadowColor='#3a7bff'; X.shadowBlur=40; X.fillStyle='#9cc4ff'; X.fillText('JESUS CHRIST',470,250); X.shadowColor='#ff3fc0'; X.fillStyle='#ffa6e4'; X.fillText('LOVES YOU',470,330); X.restore();
  // bokeh circles
  for(let i=0;i<46;i++){ const x=R()*W, y=R()*H*.9, r=14+R()*60; const cols=['rgba(255,140,210,A)','rgba(120,220,255,A)','rgba(255,200,110,A)','rgba(170,140,255,A)']; const cc=cols[(R()*4)|0];
    X.save(); X.globalCompositeOperation='lighter'; X.globalAlpha=.12+R()*.22; X.fillStyle=cc.replace('A',1); X.beginPath(); X.arc(x,y,r,0,7); X.fill(); X.globalAlpha*=.9; X.lineWidth=2; X.strokeStyle=cc.replace('A',1); X.stroke(); X.restore(); }
  // soft holy glow behind the head
  glow(X,1180,470,520,'rgba(255,196,120,A)',.55); glow(X,1150,430,260,'rgba(255,232,180,A)',.35);
  // background rain (soft)
  X.save(); X.strokeStyle='rgba(190,215,255,.35)'; X.lineWidth=1.5; for(let i=0;i<260;i++){ const x=R()*W,y=R()*H,l=24+R()*40; X.beginPath(); X.moveTo(x,y); X.lineTo(x-l*.18,y+l); X.stroke(); } X.restore();

  // ---------- palette ----------
  const SK='#d6a079', SKS='#a8705a', SKL='#f2c49a', LN='#2a160e', HR='#2e1a10', HRS='#1a0d07', HRL='#6e4426', RIM='#9fc2ff';
  // ---------- back hair (behind neck and shoulders) ----------
  fillS(X,[[1070,330],[1110,262],[1185,238],[1262,262],[1312,330],[1330,430],[1338,560],[1356,680],[1388,790],[1330,800],[1300,760],[1250,730],[1150,720],[1060,736],[1010,770],[978,760],[1002,660],[1024,560],[1040,450]],HRS);
  // ---------- clothes: tunic + prayer shawl with blue stripes ----------
  const BODY=[[860,1080],[905,900],[990,800],[1100,742],[1150,712],[1236,708],[1320,742],[1430,800],[1520,900],[1570,1080]];
  fillS(X,BODY,'#efe2c6');
  inside(X,BODY,()=>{ fillS(X,[[1300,700],[1600,760],[1600,1080],[1330,1080],[1360,900]],'#c8c0d6'); });           // shade on the far-from-light side
  // shawl (tallit) over both shoulders, open at the front
  const SHL=[[880,1080],[920,915],[1000,810],[1090,756],[1140,730],[1130,800],[1100,900],[1080,1080]], SHR=[[1250,724],[1330,752],[1430,812],[1510,910],[1550,1080],[1310,1080],[1290,940],[1262,820]];
  fillS(X,SHL,'#fbf6ea'); fillS(X,SHR,'#e6e2ef');
  inside(X,SHL,()=>{ X.fillStyle='#2c5fd6'; for(const o of [0,26]){ X.save(); X.translate(o,0); fillS(X,[[1050,760],[1070,760],[1040,1080],[1018,1080]],'#2c5fd6'); X.restore(); } });
  inside(X,SHR,()=>{ for(const o of [0,26]){ X.save(); X.translate(o,0); fillS(X,[[1282,760],[1302,768],[1336,1080],[1314,1080]],'#2752c0'); X.restore(); } });
  // fold lines
  [[[960,880],[985,960],[992,1060]],[[1040,820],[1036,920],[1046,1040]],[[1380,820],[1400,930],[1420,1060]],[[1460,880],[1478,980],[1490,1070]]].forEach(p=>ink(X,p,5,'#5a4a5e'));
  inkC(X,SHL,4.5,'#3a2a3a'); inkC(X,SHR,4.5,'#3a2a3a');
  // ---------- neck ----------
  const NECK=[[1146,592],[1148,690],[1170,720],[1222,716],[1240,690],[1236,580]];
  fillS(X,NECK,SK); inside(X,NECK,()=>{ fillS(X,[[1140,580],[1250,580],[1250,665],[1196,650],[1160,640]],SKS); fillS(X,[[1206,580],[1250,580],[1250,730],[1214,730]],'#94604e'); });
  ink(X,[[1150,610],[1148,690]],5,LN,[.2,.3]); ink(X,[[1238,600],[1240,690]],5,LN,[.2,.3]);
  // ---------- face ----------
  const FACE=[[1084,330],[1064,380],[1058,428],[1067,452],[1061,492],[1071,540],[1092,588],[1118,618],[1160,624],[1208,602],[1244,560],[1262,500],[1262,420],[1240,350],[1170,316]];
  fillS(X,FACE,SK);
  inside(X,FACE,()=>{
    // light side wash + cel shadow on the side turned away from the light
    const lg=X.createLinearGradient(1060,0,1260,0); lg.addColorStop(0,'rgba(255,214,170,.55)'); lg.addColorStop(.6,'rgba(255,214,170,0)'); X.fillStyle=lg; X.fillRect(1040,300,240,340);
    fillS(X,[[1196,320],[1270,320],[1270,620],[1206,612],[1222,560],[1230,505],[1224,445],[1212,390]],SKS);
    fillS(X,[[1222,400],[1270,400],[1270,600],[1236,580],[1244,500]],'#95604c');
    // under-brow shadow band (hair shadow on the forehead)
    fillS(X,[[1060,380],[1250,372],[1250,404],[1180,412],[1120,408],[1060,416]],'rgba(150,96,76,.65)');
    // cheek blush
    X.save(); X.filter='blur(10px)'; X.fillStyle='rgba(230,120,110,.25)'; X.beginPath(); X.ellipse(1092,520,26,13,0,0,7); X.ellipse(1196,522,30,14,0,0,7); X.fill(); X.restore();
  });
  inkC(X,FACE,0); // (no full outline: anime keeps the face contour only on the silhouette side)
  ink(X,[[1066,392],[1058,430],[1066,454],[1060,494],[1070,542],[1092,588],[1118,616]],6,LN,[.05,.2]);
  // ---------- eyes ----------
  function eye(cx,cy,wd,ht,ix,iy,irx,iry,far){
    const E=[[cx-wd/2,cy+2],[cx-wd*.25,cy-ht*.42],[cx+wd*.15,cy-ht*.5],[cx+wd/2,cy-ht*.12],[cx+wd*.32,cy+ht*.42],[cx-wd*.2,cy+ht*.4]];
    fillS(X,E,'#fbf4ec');
    inside(X,E,()=>{ fillS(X,[[cx-wd,cy-ht],[cx+wd,cy-ht],[cx+wd,cy-ht*.12],[cx-wd,cy-ht*.05]],'#d9c8c4');
      const ig=X.createLinearGradient(0,iy-iry,0,iy+iry); ig.addColorStop(0,'#1c0e07'); ig.addColorStop(.45,'#5a3416'); ig.addColorStop(.85,'#c88a44'); ig.addColorStop(1,'#e7b468');
      X.fillStyle=ig; X.beginPath(); X.ellipse(ix,iy,irx,iry,0,0,7); X.fill(); X.lineWidth=2.5; X.strokeStyle='#1a0b05'; X.stroke();
      X.fillStyle='#120804'; X.beginPath(); X.ellipse(ix,iy-2,irx*.42,iry*.48,0,0,7); X.fill();
      X.fillStyle='rgba(255,220,160,.55)'; X.beginPath(); X.ellipse(ix,iy+iry*.55,irx*.7,iry*.25,0,0,7); X.fill();
      X.fillStyle='#ffffff'; X.beginPath(); X.ellipse(ix-irx*.38,iy-iry*.42,irx*.36,iry*.3,-.3,0,7); X.fill(); X.beginPath(); X.arc(ix+irx*.4,iy+iry*.32,irx*.16,0,7); X.fill(); });
    // upper lash line: thick, with a small flick at the outer corner
    const up=far?[[cx+wd/2+2,cy-ht*.1],[cx+wd*.15,cy-ht*.52],[cx-wd*.25,cy-ht*.44],[cx-wd/2-6,cy+4]]:[[cx-wd/2-2,cy+3],[cx-wd*.25,cy-ht*.44],[cx+wd*.15,cy-ht*.52],[cx+wd/2+8,cy-ht*.08],[cx+wd/2+14,cy+4]];
    ink(X,up,far?8:10,'#1a0b06',[.12,.3]);
    ink(X,[[cx-wd*.3,cy+ht*.42],[cx+wd*.05,cy+ht*.5],[cx+wd*.32,cy+ht*.4]],3,'#3a2016',[.3,.3]);
    ink(X,[[cx-wd*.2,cy-ht*.78],[cx+wd*.18,cy-ht*.82],[cx+wd*.42,cy-ht*.6]],2.5,'rgba(60,30,20,.6)',[.3,.3]);   // eyelid crease
  }
  eye(1180,470,78,44,1170,472,17,21,false);
  eye(1094,470,46,42,1099,472,11,20,true);
  // brows (kind, a little sorrowful: inner ends lifted)
  ink(X,[[1142,432],[1170,424],[1200,423],[1226,431]],9,'#24130b',[.08,.5]);
  ink(X,[[1114,432],[1094,428],[1072,434]],8,'#24130b',[.1,.5]);
  // nose: a bridge shadow and a small tip line (anime 3/4 nose)
  inside(X,FACE,()=>fillS(X,[[1128,474],[1134,516],[1126,532],[1110,532],[1120,520],[1124,492]],SKS));
  ink(X,[[1104,530],[1116,535],[1128,532]],4,LN,[.3,.3]);
  X.fillStyle='rgba(255,235,210,.8)'; X.beginPath(); X.ellipse(1112,518,4,7,0,0,7); X.fill();
  // ---------- beard + moustache ----------
  const BEARD=[[1246,505],[1254,556],[1236,604],[1200,640],[1156,662],[1124,658],[1100,638],[1086,606],[1094,586],[1110,600],[1128,606],[1160,604],[1180,594],[1200,577],[1218,548],[1230,515]];
  fillS(X,BEARD,HR); inside(X,BEARD,()=>{ fillS(X,[[1170,560],[1270,500],[1270,700],[1160,700]],HRS); for(let i=0;i<9;i++){ const x=1100+i*16; ink(X,[[x,606+R()*8],[x+4,632+R()*10],[x+2,652]],3,'#5a3420',[.3,.3]); } });
  // jagged beard tips
  inkC(X,BEARD,5,'#1a0b06');
  const MUS=[[1102,560],[1118,550],[1140,553],[1160,550],[1182,557],[1176,567],[1156,563],[1134,567],[1114,569]];
  fillS(X,MUS,HR); inkC(X,MUS,4,'#1a0b06');
  // mouth: a gentle, slightly open smile between moustache and beard
  ink(X,[[1118,580],[1134,584],[1156,582]],4,'#4a1e16',[.3,.3]);
  X.fillStyle='rgba(170,70,60,.6)'; X.beginPath(); X.ellipse(1136,589,13,3.5,0,0,7); X.fill();
  // ---------- front hair: centre part, long clumps framing the face ----------
  const HAIRTOP=[[1062,400],[1066,330],[1102,268],[1160,246],[1226,256],[1276,300],[1290,380],[1252,410],[1236,360],[1200,318],[1162,304],[1130,318],[1100,356],[1086,404]];
  fillS(X,HAIRTOP,HR);
  // far-side curtain over the temple and cheek, down past the jaw
  const FARL=[[1086,330],[1062,380],[1046,470],[1040,560],[1030,650],[1012,740],[1040,700],[1050,760],[1066,690],[1078,620],[1074,540],[1078,460],[1092,400],[1110,350]];
  fillS(X,FARL,HR);
  // near-side mass over the ear, falling on the shoulder in clumps
  const NEARR=[[1226,300],[1270,330],[1294,420],[1300,520],[1316,620],[1344,720],[1372,800],[1336,780],[1330,840],[1304,770],[1290,800],[1276,720],[1262,640],[1256,560],[1250,470],[1238,400]];
  fillS(X,NEARR,HR);
  inside(X,NEARR,()=>{ fillS(X,[[1260,330],[1320,330],[1380,820],[1300,820]],HRS); });
  inside(X,HAIRTOP,()=>{ fillS(X,[[1180,240],[1300,240],[1300,420],[1230,400],[1210,330]],HRS); });
  // angel-ring shine across the crown
  inside(X,HAIRTOP,()=>{ X.fillStyle=HRL; const sh=[[1090,312],[1118,286],[1150,276],[1186,278],[1214,290],[1206,300],[1194,296],[1186,306],[1170,296],[1150,304],[1136,296],[1120,312],[1104,318]]; pathOf(X,cr(sh,true)); X.fill(); });
  inside(X,FARL,()=>{ fillS(X,[[1058,420],[1070,420],[1062,560],[1050,560]],HRL); });
  // strand lines
  [[[1160,252],[1120,300],[1092,380],[1076,470]],[[1150,262],[1110,330],[1070,500],[1052,640]],[[1196,262],[1250,320],[1270,420],[1282,560]],[[1214,280],[1262,360],[1290,500],[1318,660]],[[1240,300],[1282,400],[1300,560],[1340,740]]].forEach(p=>ink(X,p,3.5,'#140904',[.2,.35]));
  inkC(X,HAIRTOP,6,'#140904'); inkC(X,FARL,6,'#140904'); inkC(X,NEARR,6,'#140904');
  // cool neon rim light on the far edge of hair and shoulder
  X.save(); X.globalCompositeOperation='lighter'; ink(X,[[1270,320],[1300,430],[1314,560],[1340,690],[1368,790]],6,'rgba(140,180,255,.85)',[.2,.3]); ink(X,[[1330,748],[1430,800],[1520,900]],7,'rgba(255,130,210,.6)',[.2,.3]); X.restore();
  // warm key-light rim on the near-light side of face/hair
  X.save(); X.globalCompositeOperation='lighter'; ink(X,[[1064,395],[1046,470],[1040,560],[1030,650]],5,'rgba(255,210,140,.75)',[.2,.3]); X.restore();
  // ---------- foreground: in-focus rain + sparkles + light ----------
  X.save(); X.strokeStyle='rgba(225,238,255,.75)'; for(let i=0;i<70;i++){ const x=R()*W,y=R()*H,l=40+R()*70; X.lineWidth=1.4+R()*1.4; X.beginPath(); X.moveTo(x,y); X.lineTo(x-l*.18,y+l); X.stroke(); } X.restore();
  [[980,300,18],[1400,420,14],[1330,240,22],[900,620,12],[1480,640,16]].forEach(s=>star4(X,...s,.9));
  glow(X,1000,330,180,'rgba(255,220,160,A)',.25);
  // colour script: cool shadows, warm light; soft vignette
  X.save(); X.globalCompositeOperation='soft-light'; X.fillStyle='rgba(90,70,200,.35)'; X.fillRect(0,0,W,H); X.restore();
  g=X.createRadialGradient(W*.58,H*.45,H*.3,W*.5,H*.5,H*1.05); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(6,4,24,.6)'); X.fillStyle=g; X.fillRect(0,0,W,H);
}
