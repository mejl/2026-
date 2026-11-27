// ===== Jesus' clothes: cream tunic with a V neck, white prayer shawl (tallit) with blue stripes, cel shaded =====
function jesusBody(X,v,P,S){ const pt=(x,y,z=0)=>{ const p=P(x,y-.26,z); return [p[0],p[1]]; };   // shoulders sit a little higher: shorter neck
  const TUN=[pt(-2.6,5,0),pt(-2.35,2.7,.1),pt(-1.7,2.1,.2),pt(-.56,1.86,.4),pt(.56,1.86,.4),pt(1.7,2.1,.2),pt(2.35,2.7,.1),pt(2.6,5,0)];
  fillS(X,TUN,'#efe2c4');
  inside(X,TUN,()=>{ fillS(X,[pt(.4,1.8,.4),pt(3,1.8,0),pt(3,5.2,0),pt(.9,5.2,.3),pt(1.0,3.2,.3)],'#cbbfd2');          // shade side (away from the key light)
    fillS(X,[pt(-.52,1.86,.42),pt(0,2.62,.5),pt(.52,1.86,.42)],'#e2ac86'); fillS(X,[pt(.05,1.9,.5),pt(.52,1.86,.42),pt(0,2.62,.5)],'#b97d66'); });
  ink(X,[pt(-.52,1.86,.42),pt(0,2.62,.5),pt(.52,1.86,.42)],.03*S,'#3a2a3a',[.1,.1]);
  for(const sd of [-1,1]){ const SH=[pt(2.4*sd,2.75,.1),pt(1.75*sd,2.12,.2),pt(.62*sd,1.9,.42),pt(.42*sd,2.5,.5),pt(.5*sd,3.4,.45),pt(.62*sd,5,.4),pt(2.7*sd,5,.0)];
    fillS(X,SH,sd<0?'#fbf7ec':'#e2dfec');
    inside(X,SH,()=>{ for(const o of [.12,.3]){ const st=[pt((.42+o)*sd,2.2,.5),pt((.52+o)*sd,2.0,.45),pt((.66+o)*sd,5,.4),pt((.56+o)*sd,5,.4)]; X.save(); pathOf(X,st); X.fillStyle=sd<0?'#2d62dc':'#2552bd'; X.fill(); X.restore(); }
      const st2=[pt(2.0*sd,2.45,.15),pt(2.12*sd,2.55,.12),pt(2.5*sd,5,.0),pt(2.36*sd,5,.0)]; pathOf(X,st2); X.fillStyle=sd<0?'#2d62dc':'#2552bd'; X.fill();
      if(sd>0) fillS(X,[pt(1.0,1.9,.4),pt(3,2,0),pt(3,5.2,0),pt(1.5,5.2,.2)],'rgba(120,110,170,.35)'); });
    [[pt(1.4*sd,2.5),pt(1.3*sd,3.4),pt(1.36*sd,4.6)],[pt(.95*sd,2.9),pt(.9*sd,3.8),pt(.96*sd,4.8)]].forEach(f=>ink(X,f,.022*S,'rgba(70,56,80,.8)',[.25,.25]));
    inkC(X,SH,.026*S,'#3a2a3a'); }
  inkC(X,TUN,.026*S,'#3a2a3a'); }
