// ===== painted background: the rainy neon street in one-point perspective (in focus, cel-shaded buildings) =====
function bgStreet(X,o={}){ SEED=o.seed||31; const VP=o.vp||[1100,500], INK='#120f2e';
  let g=X.createLinearGradient(0,0,0,VP[1]+60); g.addColorStop(0,'#0a0a2e'); g.addColorStop(.6,'#2a1c66'); g.addColorStop(1,'#8a3f8f'); X.fillStyle=g; X.fillRect(0,0,W,H);
  for(let i=0;i<90;i++){ X.fillStyle=`rgba(255,248,230,${.2+R()*.5})`; X.beginPath(); X.arc(R()*W,R()*VP[1]*.7,.7+R()*1.6,0,7); X.fill(); }
  // far warehouse + neon sign
  const fw=[[VP[0]-210,VP[1]+8],[VP[0]-210,VP[1]-80],[VP[0],VP[1]-150],[VP[0]+210,VP[1]-80],[VP[0]+210,VP[1]+8]];
  pathOf(X,fw); X.fillStyle='#19154a'; X.fill(); X.lineWidth=3; X.strokeStyle=INK; X.stroke();
  const neon=(t,x,y,sz,col,glow)=>{ X.save(); X.font=`900 ${sz}px "Inter Display","Inter",sans-serif`; X.textAlign='center'; X.textBaseline='middle'; X.letterSpacing='2px'; X.shadowColor=glow; X.shadowBlur=26; X.lineWidth=sz*.15; X.strokeStyle=col; X.lineJoin='round'; X.strokeText(t,x,y); X.shadowBlur=0; X.lineWidth=sz*.05; X.strokeStyle='#fff'; X.strokeText(t,x,y); X.restore(); };
  neon('JESUS CHRIST',VP[0],VP[1]-82,30,'#6aa6ff','#3a7bff'); neon('LOVES YOU',VP[0],VP[1]-44,36,'#ff6ad8','#ff2fb8');
  // building faces in perspective (left and right), window grids, cel shadow wedge, ink edges
  const face=(x0,top0,bot0,xe,tope,bote,cols,rows,base)=>{ const P=(u,v)=>{ const x=lerp(x0,xe,u), yt=lerp(top0,tope,u), yb=lerp(bot0,bote,u); return [x,lerp(yt,yb,v)]; };
    pathOf(X,[P(0,0),P(1,0),P(1,1),P(0,1)]); X.fillStyle=base; X.fill();
    for(let i=0;i<cols;i++) for(let j=0;j<rows;j++){ const u0=(i+.18)/cols,u1=(i+.78)/cols,v0=(j+.2)/rows,v1=(j+.78)/rows; const r=R(); const col=r>.74?'#ffc874':r>.6?'#ff86c6':r>.52?'#7ad8ff':'#25245e';
      pathOf(X,[P(u0,v0),P(u1,v0),P(u1,v1),P(u0,v1)]); X.fillStyle=col; X.fill(); if(r>.52){ X.save(); X.globalCompositeOperation='lighter'; X.globalAlpha=.25; X.filter='blur(6px)'; X.fill(); X.restore(); }
      X.lineWidth=1.6; X.strokeStyle=INK; X.stroke(); }
    pathOf(X,[P(.55,0),P(1,0),P(1,1),P(.55,1)]); X.fillStyle='rgba(8,6,36,.42)'; X.fill();
    X.lineWidth=5; X.strokeStyle=INK; pathOf(X,[P(0,0),P(1,0),P(1,1),P(0,1)]); X.stroke(); };
  face(-40,-120,830,VP[0]-210,VP[1]-90,VP[1]+8,10,15,'#1c1a50');
  face(W+40,-120,830,VP[0]+210,VP[1]-90,VP[1]+8,10,15,'#201c56');
  // street: wet asphalt, kerbs, lane dashes
  g=X.createLinearGradient(0,VP[1],0,H); g.addColorStop(0,'#3a2a6a'); g.addColorStop(.45,'#241a52'); g.addColorStop(1,'#110c2e');
  const road=[[VP[0]-210,VP[1]+8],[VP[0]+210,VP[1]+8],[W+40,830],[W+40,H],[-40,H],[-40,830]]; pathOf(X,road); X.fillStyle=g; X.fill();
  // pavements (raised, lighter edge)
  for(const sd of [-1,1]){ const k=[[VP[0]+sd*210,VP[1]+8],[VP[0]+sd*170,VP[1]+10],[sd<0?380:1600,H],[sd<0?-40:W+40,H],[sd<0?-40:W+40,830]]; pathOf(X,k); X.fillStyle='#2c2464'; X.fill();
    X.lineWidth=4; X.strokeStyle='#8f7fd0'; X.beginPath(); X.moveTo(VP[0]+sd*170,VP[1]+10); X.lineTo(sd<0?380:1600,H); X.stroke(); }
  for(let k=0;k<10;k++){ const t=k/10,t2=(k+.45)/10, y1=lerp(VP[1]+12,H,Math.pow(t,1.8)), y2=lerp(VP[1]+12,H,Math.pow(t2,1.8)), w1=lerp(2,46,Math.pow(t,1.8)), w2=lerp(2,46,Math.pow(t2,1.8)), cx=VP[0];
    pathOf(X,[[cx-w1,y1],[cx+w1,y1],[cx+w2,y2],[cx-w2,y2]]); X.fillStyle='rgba(255,236,190,.75)'; X.fill(); }
  // reflections on the wet road (neon and windows), soft vertical smears
  X.save(); X.globalCompositeOperation='lighter'; for(let i=0;i<40;i++){ const x=VP[0]-420+R()*840, w=3+R()*10, y0=VP[1]+20+R()*40, y1=y0+80+R()*380; const cc=['#ff6ad8','#6fe0ff','#ffd27a','#a98cff'][(R()*4)|0]; X.globalAlpha=.16+R()*.18; X.filter='blur(3px)'; X.fillStyle=cc; X.fillRect(x,y0,w,y1-y0); } X.restore();
  // street lamps
  for(const [x,y,h] of [[560,700,520],[1640,700,520],[850,580,230],[1350,580,230]]){ X.fillStyle='#0f0d2a'; X.fillRect(x-4,y-h,8,h); X.fillRect(x-4,y-h,x<VP[0]?60*h/520:-60*h/520,6); glow(X,x+(x<VP[0]?56:-56)*h/520,y-h+10,90*h/520,'rgba(255,190,110,A)',.8); }
  // distance haze toward the vanishing point
  g=X.createRadialGradient(VP[0],VP[1],10,VP[0],VP[1],700); g.addColorStop(0,'rgba(150,110,200,.35)'); g.addColorStop(1,'rgba(150,110,200,0)'); X.fillStyle=g; X.fillRect(0,0,W,H); }
