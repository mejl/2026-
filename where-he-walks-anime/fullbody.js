// ===== Jesus full figure v2: sloped shoulders, draped shawl over the arms, bell sleeves, an open reaching hand, a walking step =====
function jesusFull(X,v,P,S,o={}){ const pt=(x,y,z=0)=>{ const p=P(x,y-.26,z); return [p[0],p[1]]; }; const INK='#3a2a3a', SK='#d9a37e', SKS='#b07c62';
  const R_=o.reachSide||-1, rk=o.reach??1, step=o.step??1;
  const ROBE='#efe2c4', ROBES='#cbbfd6', SHW='#fbf7ec', SHWS='#d9d4e8', BLUE='#2d5fd8';
  // --- far arm (hangs relaxed, bell sleeve), drawn first so the robe and shawl overlap it ---
  { const sd=-R_; const sh=pt(1.72*sd,2.25), el=pt(1.98*sd,5.0,.0), wr=pt(1.92*sd,7.3,.1);
    const SL=[pt(1.45*sd,2.3),pt(2.05*sd,2.3),pt(2.25*sd,4.8),pt(2.45*sd,7.6),pt(2.2*sd,7.95),pt(1.7*sd,7.85),pt(1.55*sd,5.0)];
    fillS(X,SL,ROBES); inside(X,SL,()=>fillS(X,[pt(1.95*sd,2.2),pt(2.6*sd,2.2),pt(2.6*sd,8.2),pt(2.1*sd,8.2)],'rgba(120,110,165,.45)')); inkC(X,SL,.03*S,INK);
    X.fillStyle=SKS; X.beginPath(); const h=pt(2.06*sd,8.05,.1); X.ellipse(h[0],h[1],S*.3,S*.38,0,0,7); X.fill(); X.lineWidth=.03*S; X.strokeStyle='#3a1e14'; X.stroke(); }
  // --- robe: A-line from the shoulders, waist, a stepping hem (front leg lifts the hem), folds ---
  const fr=R_; // the leg on the reaching side steps forward
  const RB=[pt(-.56,1.86),pt(-1.45,2.0),pt(-1.78,2.3),pt(-1.62,4.0),pt(-1.35,6.2),pt(-1.5,7.8),pt(-1.85,11),pt(-2.3,14.4),pt(-2.45,16.3+(fr<0?.25*step:0)),pt(-1.2,16.6+(fr<0?.35*step:0)),pt(0,16.4),pt(1.2,16.5+(fr>0?.35*step:0)),pt(2.4,16.2+(fr>0?.25*step:0)),pt(2.25,14.4),pt(1.85,11),pt(1.5,7.8),pt(1.35,6.2),pt(1.62,4.0),pt(1.78,2.3),pt(1.45,2.0),pt(.56,1.86)];
  fillS(X,RB,ROBE);
  inside(X,RB,()=>{ fillS(X,[pt(.35,1.8),pt(2.8,2),pt(2.8,16.8),pt(.9,16.8),pt(.75,9),pt(.6,6.2)],ROBES);
    // knee of the stepping leg pushes the cloth: a lit ridge with a shadow beside it, and long folds to the hem
    const kx=.65*fr; fillS(X,[pt(kx-.15,8.5),pt(kx+.35,8.5),pt(kx+.55*fr+.35,16.6),pt(kx-.05,16.6)],'rgba(255,250,236,.55)');
    for(const [x0,x1] of [[-1.05,-1.5],[.1,.05],[1.0,1.45]]) fillS(X,[pt(x0,8.2),pt(x0+.18,8.2),pt(x1+.3,16.6),pt(x1-.25,16.6)],'rgba(130,118,170,.42)');
    fillS(X,[pt(-2,6.05),pt(2,6.05),pt(2,7.0),pt(-2,7.0)],'rgba(120,108,160,.35)'); });
  inkC(X,RB,.032*S,INK);
  for(const [x0,y0,x1,y1] of [[-.9,7.2,-1.3,15.9],[.2,7.4,.1,16.1],[1.0,7.2,1.4,15.8],[-.4,2.6,-.5,5.6]]) ink(X,[pt(x0,y0),pt((x0+x1)/2+.08,(y0+y1)/2),pt(x1,y1)],.022*S,'rgba(80,66,96,.75)',[.25,.3]);
  // feet: the front foot forward and lower, the back foot half under the hem
  for(const sd of [-1,1]){ const fwd=sd===fr; const f=pt(.7*sd,fwd?16.95:16.45,fwd?.8:0); X.fillStyle=fwd?SK:SKS; X.beginPath(); X.ellipse(f[0],f[1],S*(fwd?.6:.48),S*(fwd?.24:.18),0,0,7); X.fill(); X.lineWidth=.03*S; X.strokeStyle='#3a1e14'; X.stroke(); X.strokeStyle='#5a3a24'; X.lineWidth=.05*S; X.beginPath(); X.moveTo(f[0]-S*.35,f[1]-S*.06); X.lineTo(f[0]+S*.35,f[1]-S*.06); X.stroke(); }
  // sash with a hanging end
  const SA=[pt(-1.36,6.0),pt(1.36,6.0),pt(1.38,6.6),pt(-1.38,6.6)]; fillS(X,SA,'#8a5a2a'); inkC(X,SA,.025*S,INK);
  const SE=[pt(-.5*R_,6.5),pt(-.2*R_,6.55),pt(-.25*R_,8.6),pt(-.55*R_,8.5)]; fillS(X,SE,'#7a4c22'); inkC(X,SE,.022*S,INK);
  // --- shawl: over the shoulders and upper arms, falling to the knees, blue stripes near the hem and along the front edge, tassels ---
  for(const sd of [-1,1]){ const SH=[pt(.62*sd,1.9),pt(1.35*sd,1.98),pt(1.78*sd,2.12),pt(2.06*sd,2.5),pt(2.18*sd,3.3),pt(2.06*sd,5.3),pt(1.92*sd,7.6),pt(1.88*sd,10.2),pt(1.45*sd,10.65),pt(.82*sd,10.45),pt(.62*sd,6.2),pt(.44*sd,2.7)];
    fillS(X,SH,sd===R_?SHW:SHWS);
    inside(X,SH,()=>{ for(const y of [9.2,9.62]) fillS(X,[pt(.4*sd,y),pt(2.4*sd,y),pt(2.4*sd,y+.24),pt(.4*sd,y+.24)],BLUE); fillS(X,[pt(.5*sd,2.3),pt(.66*sd,2.3),pt(.92*sd,10.6),pt(.76*sd,10.6)],BLUE);
      fillS(X,[pt(2.3*sd,2.4),pt(1.6*sd,3.4),pt(1.55*sd,6),pt(1.7*sd,10.7),pt(2.4*sd,10.7)],sd===R_?'rgba(170,160,205,.45)':'rgba(120,110,170,.5)');
      ink(X,[pt(1.25*sd,3.2),pt(1.22*sd,6.3),pt(1.35*sd,10.2)],.02*S,'rgba(90,76,110,.6)',[.3,.3]); });
    inkC(X,SH,.028*S,INK);
    for(let i=0;i<4;i++){ const a=pt((1.82-.12*i)*sd,10.5-.05*i), b=pt((1.86-.12*i)*sd,11.9); ink(X,[a,b],.035*S,'#f4efe2',[.05,.3]); ink(X,[a,b],.012*S,'rgba(80,66,96,.6)',[.05,.3]); } }
  // --- reaching arm: forearm comes out of a bell sleeve below the shawl, open hand palm up ---
  { const sd=R_; const ex=lerp(2.95,3.75,rk), ey=lerp(7.2,6.1,rk);
    const SL=[pt(1.92*sd,3.0,.2),pt(2.32*sd,3.05,.2),pt((ex+.3)*sd,ey-.55,.6),pt((ex+.5)*sd,ey+.25,.6),pt((ex-.25)*sd,ey+.55,.6),pt(1.95*sd,4.6,.3)];
    fillS(X,SL,ROBE); inside(X,SL,()=>fillS(X,[pt(1.6*sd,4.0),pt(4.8*sd,5.2),pt(4.8*sd,8.4),pt(1.6*sd,8.4)],'rgba(130,118,170,.38)')); inkC(X,SL,.03*S,INK);
    ink(X,[pt(2.2*sd,3.6),pt((ex+.05)*sd,ey-.1)],.02*S,'rgba(80,66,96,.7)',[.3,.3]);
    // hand: palm + four fingers + thumb, opening outward from the sleeve
    const h=pt((ex+.45)*sd,ey+.25,.8); X.save(); X.translate(h[0],h[1]); X.scale(sd<0?-1:1,1); X.rotate(.3);
    const hs=S*1.25; X.fillStyle=SK; X.strokeStyle='#3a1e14'; X.lineWidth=.03*S; X.beginPath(); X.ellipse(hs*.22,0,hs*.3,hs*.2,0,0,7); X.fill(); X.stroke();
    for(let i=0;i<4;i++){ const a=-.3+i*.2; ink(X,[[hs*.42,hs*(-.1+i*.07)],[hs*(.44+.36*Math.cos(a)),hs*(-.1+i*.07+.36*Math.sin(a)*.45)]],hs*.11,SK,[.05,.35]); }
    ink(X,[[hs*.12,-hs*.14],[hs*.28,-hs*.36]],hs*.11,SK,[.05,.35]);
    X.strokeStyle='rgba(60,30,20,.55)'; X.lineWidth=.02*S; X.beginPath(); X.moveTo(hs*.05,hs*.05); X.quadraticCurveTo(hs*.22,hs*.1,hs*.4,hs*.02); X.stroke(); X.restore(); } }
