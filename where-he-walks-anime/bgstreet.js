// ===== painted background: the rainy neon street in one-point perspective (in focus, cel-shaded buildings) =====
function bgStreet(X,o={}){ SEED=o.seed||31; const VP=o.vp||[1100,500], INK='#120f2e';
  let g=X.createLinearGradient(0,0,0,VP[1]+60); g.addColorStop(0,'#0a0a2e'); g.addColorStop(.6,'#2a1c66'); g.addColorStop(1,'#8a3f8f'); X.fillStyle=g; X.fillRect(0,0,W,H);
  for(let i=0;i<90;i++){ X.fillStyle=`rgba(255,248,230,${.2+R()*.5})`; X.beginPath(); X.arc(R()*W,R()*VP[1]*.7,.7+R()*1.6,0,7); X.fill(); }
  // far warehouse + neon sign
  const fw=[[VP[0]-210,VP[1]+8],[VP[0]-210,VP[1]-80],[VP[0],VP[1]-150],[VP[0]+210,VP[1]-80],[VP[0]+210,VP[1]+8]];
  pathOf(X,fw); X.fillStyle='#19154a'; X.fill(); X.lineWidth=3; X.strokeStyle=INK; X.stroke();
  const neon=(t,x,y,sz,col,glow)=>{ X.save(); X.font=`900 ${sz}px "Inter Display","Inter",sans-serif`; X.textAlign='center'; X.textBaseline='middle'; X.letterSpacing='2px'; X.shadowColor=glow; X.shadowBlur=26; X.lineWidth=sz*.15; X.strokeStyle=col; X.lineJoin='round'; X.strokeText(t,x,y); X.shadowBlur=0; X.lineWidth=sz*.05; X.strokeStyle='#fff'; X.strokeText(t,x,y); X.restore(); };
  neon('JESUS CHRIST',VP[0],VP[1]-82,30,'#6aa6ff','#3a7bff'); neon('LOVES YOU',VP[0],VP[1]-44,36,'#ff6ad8','#ff2fb8');
  // buildings: several per side with different heights, window styles, balconies, shopfronts with awnings, vertical signs, rooftop tanks
  const side=(sd,x0,top0,bot0,xe,tope,bote,segs)=>{ const F=(u,v,hk)=>{ const x=lerp(x0,xe,u), yb=lerp(bot0,bote,u), yt=lerp(top0,tope,u); return [x,lerp(yb,yb+(yt-yb)*hk,v)]; };
    segs.forEach((b,bi)=>{ const [u0,u1,hk,base,style,sign]=b; const Q=(u,v)=>F(lerp(u0,u1,u),v,hk);
      pathOf(X,[Q(0,1),Q(1,1),Q(1,0),Q(0,0)]); X.fillStyle=base; X.fill();
      const cols=Math.max(2,Math.round((u1-u0)*(style==='strip'?7:14))), rows=Math.round(14*hk);
      for(let j=1;j<rows;j++){ const v0=j/rows+.18/rows, v1=(j+.72)/rows;
        if(style==='strip'){ const r=R(); const col=r>.6?'#ffcf86':r>.45?'#ff95cc':'#2a2964'; pathOf(X,[Q(.06,v0),Q(.94,v0),Q(.94,v1),Q(.06,v1)]); X.fillStyle=col; X.fill(); X.lineWidth=1.4; X.strokeStyle=INK; X.stroke(); continue; }
        for(let i=0;i<cols;i++){ const ua=(i+.2)/cols, ub=(i+.8)/cols, r=R(); const col=r>.76?'#ffc874':r>.64?'#ff86c6':r>.56?'#7ad8ff':'#24235c';
          pathOf(X,[Q(ua,v0),Q(ub,v0),Q(ub,v1),Q(ua,v1)]); X.fillStyle=col; X.fill(); if(r>.64&&R()>.5){ X.fillStyle='rgba(40,20,60,.45)'; pathOf(X,[Q(ua,v0),Q(ub,v0),Q(ub,lerp(v0,v1,.45)),Q(ua,lerp(v0,v1,.45))]); X.fill(); }
          X.lineWidth=1.2; X.strokeStyle=INK; pathOf(X,[Q(ua,v0),Q(ub,v0),Q(ub,v1),Q(ua,v1)]); X.stroke(); }
        if(style==='balcony'&&j%2===0){ X.lineWidth=2.4; X.strokeStyle='#8a84c8'; const a=Q(0,v0-.004), c=Q(1,v0-.004); X.beginPath(); X.moveTo(a[0],a[1]); X.lineTo(c[0],c[1]); X.stroke(); } }
      // shopfront: lit band at street level with an awning
      if(bi%2===0){ const aw=['#e04a6a','#3a8ae0','#e0a03a'][bi%3]; pathOf(X,[Q(.08,.12),Q(.92,.12),Q(.92,.0),Q(.08,.0)]); X.fillStyle='#ffd99a'; X.fill(); X.save(); X.globalCompositeOperation='lighter'; X.globalAlpha=.35; X.filter='blur(8px)'; X.fill(); X.restore();
        pathOf(X,[Q(.04,.165),Q(.96,.165),Q(.96,.12),Q(.04,.12)]); X.fillStyle=aw; X.fill(); X.lineWidth=2; X.strokeStyle=INK; X.stroke(); }
      // vertical neon sign sticking out from the wall
      if(sign){ const p0=Q(.82,.74), p1=Q(.82,.3), w=Math.max(20,Math.abs(Q(1,0)[0]-Q(0,0)[0])*.24); X.save(); X.fillStyle='#14123a'; X.fillRect(p0[0]-w/2,p0[1],w,p1[1]-p0[1]); X.lineWidth=2; X.strokeStyle=INK; X.strokeRect(p0[0]-w/2,p0[1],w,p1[1]-p0[1]);
        X.font=`900 ${Math.max(12,w*.7)}px "Inter Display","Inter",sans-serif`; X.textAlign='center'; X.textBaseline='middle'; X.shadowColor=sign[1]; X.shadowBlur=14; X.fillStyle='#fff';
        const ch=sign[0].split(''); ch.forEach((c,i)=>X.fillText(c,p0[0],lerp(p0[1],p1[1],(i+.5)/ch.length))); X.restore(); }
      // rooftop: water tank / antenna
      const rt=Q(.5,1); if(bi%2===1){ X.fillStyle='#120f30'; X.fillRect(rt[0]-14,rt[1]-26,28,22); X.fillRect(rt[0]-12,rt[1]-6,3,8); X.fillRect(rt[0]+9,rt[1]-6,3,8); } else { X.strokeStyle='#120f30'; X.lineWidth=3; X.beginPath(); X.moveTo(rt[0],rt[1]); X.lineTo(rt[0],rt[1]-40); X.moveTo(rt[0]-10,rt[1]-30); X.lineTo(rt[0]+10,rt[1]-30); X.stroke(); }
      // cel shadow on the far part of the face, ink edges
      pathOf(X,[Q(.6,1),Q(1,1),Q(1,0),Q(.6,0)]); X.fillStyle='rgba(8,6,36,.38)'; X.fill();
      X.lineWidth=4; X.strokeStyle=INK; pathOf(X,[Q(0,1),Q(1,1),Q(1,0),Q(0,0)]); X.stroke(); }); };
  side(-1,-40,-160,830,VP[0]-210,VP[1]-90,VP[1]+8,[[0,.26,1.0,'#1c1a50','grid',['2','4','H']],[.26,.46,.78,'#24205a','balcony',null],[.46,.66,.95,'#1a1748','strip',['C','A','F','E']],[.66,.84,.7,'#221e58','grid',null],[.84,1,.86,'#1d1a4e','grid',null]]);
  side(1,W+40,-160,830,VP[0]+210,VP[1]-90,VP[1]+8,[[0,.24,.92,'#201c56','balcony',['M','O','T','E','L']],[.24,.44,1.0,'#1b1a4e','grid',null],[.44,.62,.74,'#26215c','strip',null],[.62,.82,.9,'#1e1b52','grid',['2','4','H']],[.82,1,.8,'#221e58','grid',null]]);
  // cables strung across the street
  X.save(); X.strokeStyle='rgba(16,13,40,.85)'; X.lineWidth=2; for(const [y0,y1,sag] of [[220,250,60],[300,320,40],[380,390,26]]){ X.beginPath(); X.moveTo(0,y0); X.quadraticCurveTo(W/2,(y0+y1)/2+sag,W,y1); X.stroke(); } X.restore();
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
