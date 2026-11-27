// ===== Jesus full figure (long robe, shawl to the knees, one hand reaching out), drawn through the same head rig =====
function jesusFull(X,v,P,S,o={}){ const pt=(x,y,z=0)=>{ const p=P(x,y-.26,z); return [p[0],p[1]]; }; const INK='#3a2a3a', reach=o.reach??1;
  // robe (tunic) to the feet
  const RB=[pt(-1.7,2.08),pt(-2.2,2.5),pt(-2.3,4.5),pt(-2.5,9),pt(-2.9,13.5),pt(-3.1,16.4),pt(3.1,16.4),pt(2.9,13.5),pt(2.5,9),pt(2.3,4.5),pt(2.2,2.5),pt(1.7,2.08),pt(.56,1.86),pt(-.56,1.86)];
  fillS(X,RB,'#efe2c4'); inside(X,RB,()=>{ fillS(X,[pt(.6,1.8),pt(3.4,2),pt(3.4,16.6),pt(1.2,16.6),pt(1.0,8)],'#c9bdd4'); for(const x of [-1.6,-.4,.9]) fillS(X,[pt(x,9.5),pt(x+.35,9.5),pt(x+.6,16.4),pt(x-.2,16.4)],'rgba(150,140,180,.45)'); });
  inkC(X,RB,.03*S,INK);
  // sash
  const SA=[pt(-2.35,6.0),pt(2.35,6.0),pt(2.36,6.6),pt(-2.36,6.6)]; fillS(X,SA,'#8a5a2a'); inkC(X,SA,.025*S,INK);
  // shawl over the shoulders, open at the front, to the knees, blue stripes near the hem, tassels
  for(const sd of [-1,1]){ const SH=[pt(2.3*sd,2.6),pt(1.75*sd,2.1),pt(.62*sd,1.9),pt(.42*sd,2.6),pt(.6*sd,6),pt(.9*sd,10.6),pt(2.6*sd,10.8),pt(2.5*sd,6)];
    fillS(X,SH,sd<0?'#fbf7ec':'#dcd8ea'); inside(X,SH,()=>{ for(const y of [9.4,9.9]) fillS(X,[pt(.5*sd,y),pt(2.8*sd,y),pt(2.8*sd,y+.26),pt(.5*sd,y+.26)],'#2d5fd8'); fillS(X,[pt(.5*sd,2.2),pt(.62*sd,2.2),pt(.8*sd,10.8),pt(.66*sd,10.8)],'#2d5fd8'); });
    inkC(X,SH,.026*S,INK);
    for(let i=0;i<4;i++){ const a=pt((2.45-.12*i)*sd,10.8), b=pt((2.5-.12*i)*sd,12.2); ink(X,[a,b],.03*S,'#f4efe2',[.05,.3]); } }
  // arms: the near arm reaches out (palm open, toward the one who is sitting), the far arm hangs
  const sdR=o.reachSide||-1;
  const sh=pt(2.05*sdR,2.5), el=pt(lerp(2.4,3.3,reach)*sdR,lerp(6.2,5.2,reach)), hd=pt(lerp(2.5,4.6,reach)*sdR,lerp(8.6,6.6,reach));
  ink(X,[sh,el,hd],.95*S,'#e8dcc0',[.0,.12]); ink(X,[sh,el,hd],.95*S+3,INK,[.0,.12]); ink(X,[sh,el,hd],.95*S-3,'#efe2c4',[.0,.12]);
  X.fillStyle='#d9a37e'; X.beginPath(); X.ellipse(hd[0]+sdR*S*.2,hd[1]+S*.1,S*.34,S*.24,sdR*.5,0,7); X.fill(); X.lineWidth=.03*S; X.strokeStyle='#3a1e14'; X.stroke();
  const sf=pt(-2.05*sdR,2.5), ef=pt(-2.55*sdR,6), hf=pt(-2.6*sdR,8.8); ink(X,[sf,ef,hf],.9*S+3,INK,[0,.12]); ink(X,[sf,ef,hf],.9*S-3,'#d6cadf',[0,.12]);
  X.fillStyle='#c48e6e'; X.beginPath(); X.ellipse(hf[0],hf[1]+S*.25,S*.24,S*.3,0,0,7); X.fill(); X.stroke();
  // feet in sandals
  for(const sd of [-1,1]){ const f=pt(.9*sd,16.5); X.fillStyle='#c48e6e'; X.beginPath(); X.ellipse(f[0],f[1],S*.5,S*.2,0,0,7); X.fill(); X.lineWidth=.03*S; X.strokeStyle='#3a1e14'; X.stroke(); } }
