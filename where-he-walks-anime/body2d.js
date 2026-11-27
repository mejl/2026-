// ===== Jesus' clothes: cream tunic with a V neck, white prayer shawl (tallit) with blue stripes, cel shaded =====
function jesusBody(X,v,P,S){ const pt=(x,y,z=0)=>{ const p=P(x,y-.26,z); return [p[0],p[1]]; };   // shoulders sit a little higher: shorter neck
  const TUN=[pt(-2.5,5,0),pt(-2.46,3.5,.1),pt(-2.4,2.86,.1),pt(-2.16,2.32,.15),pt(-1.7,2.08,.2),pt(-.56,1.86,.4),pt(.56,1.86,.4),pt(1.7,2.08,.2),pt(2.16,2.32,.15),pt(2.4,2.86,.1),pt(2.46,3.5,.1),pt(2.5,5,0)];   // rounded shoulder caps, arms going down
  fillS(X,TUN,'#efe2c4');
  inside(X,TUN,()=>{ fillS(X,[pt(.4,1.8,.4),pt(3,1.8,0),pt(3,5.2,0),pt(.9,5.2,.3),pt(1.0,3.2,.3)],'#cbbfd2');          // shade side (away from the key light)
    fillS(X,[pt(-.52,1.86,.42),pt(0,2.62,.5),pt(.52,1.86,.42)],'#e2ac86'); fillS(X,[pt(.05,1.9,.5),pt(.52,1.86,.42),pt(0,2.62,.5)],'#b97d66'); });
  ink(X,[pt(-.52,1.86,.42),pt(0,2.62,.5),pt(.52,1.86,.42)],.03*S,'#3a2a3a',[.1,.1]);
  for(const sd of [-1,1]){ const SH=[pt(2.43*sd,2.86,.1),pt(2.19*sd,2.33,.15),pt(1.75*sd,2.1,.2),pt(.62*sd,1.9,.42),pt(.42*sd,2.5,.5),pt(.5*sd,3.4,.45),pt(.62*sd,5,.4),pt(2.56*sd,5,.0),pt(2.5*sd,3.5,.1)];
    fillS(X,SH,sd<0?'#fbf7ec':'#e2dfec');
    inside(X,SH,()=>{ for(const o of [.12,.3]){ const st=[pt((.42+o)*sd,2.2,.5),pt((.52+o)*sd,2.0,.45),pt((.66+o)*sd,5,.4),pt((.56+o)*sd,5,.4)]; X.save(); pathOf(X,st); X.fillStyle=sd<0?'#2d62dc':'#2552bd'; X.fill(); X.restore(); }
      const st2=[pt(2.0*sd,2.45,.15),pt(2.12*sd,2.55,.12),pt(2.5*sd,5,.0),pt(2.36*sd,5,.0)]; pathOf(X,st2); X.fillStyle=sd<0?'#2d62dc':'#2552bd'; X.fill();
      if(sd>0) fillS(X,[pt(1.0,1.9,.4),pt(3,2,0),pt(3,5.2,0),pt(1.5,5.2,.2)],'rgba(120,110,170,.35)'); });
    inside(X,SH,()=>{ fillS(X,[pt(2.5*sd,2.8,.1),pt(1.9*sd,2.3,.2),pt(1.7*sd,2.9,.2),pt(1.95*sd,3.8,.1),pt(2.2*sd,5,.0),pt(2.8*sd,5,0)],sd<0?'rgba(150,140,185,.55)':'rgba(110,100,160,.6)');
      fillS(X,[pt(.62*sd,1.9,.42),pt(.42*sd,2.5,.5),pt(.5*sd,3.4,.45),pt(.6*sd,5,.4),pt(.72*sd,5,.4),pt(.6*sd,3.4,.45),pt(.53*sd,2.5,.5),pt(.72*sd,1.95,.42)],'rgba(120,110,165,.55)');
      // fold shadows: long soft V shapes falling from the shoulder
      for(const [x0,x1,y0] of [[1.35,1.15,2.35],[.98,.86,2.7]]) fillS(X,[pt(x0*sd,y0,.2),pt((x0+.08)*sd,y0+1.2,.2),pt((x1+.12)*sd,5,.2),pt((x1-.05)*sd,5,.2),pt((x0-.06)*sd,y0+1.1,.2)],'rgba(120,110,170,.4)'); });
    inside(X,SH,()=>fillS(X,[pt(1.8*sd,2.9,.2),pt(1.86*sd,5,.2),pt(2.6*sd,5,0),pt(2.5*sd,3.2,0)],sd<0?'rgba(140,130,180,.35)':'rgba(100,90,150,.45)'));
    ink(X,[pt(1.76*sd,2.95),pt(1.8*sd,3.9),pt(1.84*sd,4.9)],.022*S,'rgba(70,56,80,.75)',[.3,.2]);
    [[pt(1.4*sd,2.5),pt(1.3*sd,3.4),pt(1.36*sd,4.6)],[pt(.95*sd,2.9),pt(.9*sd,3.8),pt(.96*sd,4.8)]].forEach(f=>ink(X,f,.02*S,'rgba(70,56,80,.7)',[.25,.25]));
    inkC(X,SH,.026*S,'#3a2a3a'); }
  inkC(X,TUN,.026*S,'#3a2a3a'); }
