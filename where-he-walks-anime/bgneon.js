// ===== painted background: rainy neon street at night, out of focus (shallow depth of field) =====
function bgNeon(X,o={}){ SEED=o.seed||21;
  let g=X.createLinearGradient(0,0,0,H); g.addColorStop(0,'#090a2c'); g.addColorStop(.55,'#1e1450'); g.addColorStop(1,'#120c30'); X.fillStyle=g; X.fillRect(0,0,W,H);
  X.save(); X.filter='blur(9px)';
  for(let i=0;i<9;i++){ const x=i*230-60+R()*60, w=150+R()*120, h=420+R()*420; X.fillStyle=['#161a4e','#1b1658','#121646'][i%3]; X.fillRect(x,H*.62-h,w,h+300);
    for(let r=0;r<16;r++) for(let c=0;c<4;c++){ if(R()<.45) continue; const col=['#ffcf7a','#ff86c8','#7fdcff','#ffb35a'][(R()*4)|0]; X.globalAlpha=.55+R()*.45; X.fillStyle=col; X.fillRect(x+12+c*(w-24)/4,H*.62-h+20+r*26,(w-24)/4-10,13); } X.globalAlpha=1; }
  X.restore();
  X.save(); X.filter='blur(5px)'; X.font='900 64px "Inter Display","Inter",sans-serif'; X.textAlign='center'; X.letterSpacing='4px';
  X.shadowColor='#3a7bff'; X.shadowBlur=40; X.fillStyle='#9cc4ff'; X.fillText('JESUS CHRIST',o.sx??470,250); X.shadowColor='#ff3fc0'; X.fillStyle='#ffa6e4'; X.fillText('LOVES YOU',o.sx??470,330); X.restore();
  for(let i=0;i<46;i++){ const x=R()*W, y=R()*H*.9, r=14+R()*60; const cols=['rgba(255,140,210,A)','rgba(120,220,255,A)','rgba(255,200,110,A)','rgba(170,140,255,A)']; const cc=cols[(R()*4)|0];
    X.save(); X.globalCompositeOperation='lighter'; X.globalAlpha=.1+R()*.18; X.fillStyle=cc.replace('A',1); X.beginPath(); X.arc(x,y,r,0,7); X.fill(); X.globalAlpha*=.9; X.lineWidth=2; X.strokeStyle=cc.replace('A',1); X.stroke(); X.restore(); }
  X.save(); X.strokeStyle='rgba(190,215,255,.32)'; X.lineWidth=1.5; for(let i=0;i<260;i++){ const x=R()*W,y=R()*H,l=24+R()*40; X.beginPath(); X.moveTo(x,y); X.lineTo(x-l*.18,y+l); X.stroke(); } X.restore(); }
function fgRain(X,n=70){ X.save(); X.strokeStyle='rgba(225,238,255,.7)'; for(let i=0;i<n;i++){ const x=R()*W,y=R()*H,l=40+R()*70; X.lineWidth=1.4+R()*1.4; X.beginPath(); X.moveTo(x,y); X.lineTo(x-l*.18,y+l); X.stroke(); } X.restore(); }
function grade(X){ X.save(); X.globalCompositeOperation='soft-light'; X.fillStyle='rgba(90,70,200,.3)'; X.fillRect(0,0,W,H); X.restore();
  const g=X.createRadialGradient(W*.58,H*.45,H*.3,W*.5,H*.5,H*1.05); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(6,4,24,.55)'); X.fillStyle=g; X.fillRect(0,0,W,H); }
