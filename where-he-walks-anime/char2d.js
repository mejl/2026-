// ===== character model: a 3D landmark head (for consistent turns) drawn in 2D anime style =====
// head units: half-width of the skull = 1. x right, y down, z toward the viewer.
const V3=(x,y,z)=>({x,y,z});
function rotY(p,a){ const c=Math.cos(a),s=Math.sin(a); return {x:p.x*c-p.z*s,y:p.y,z:p.x*s+p.z*c}; }
function rotX(p,a){ const c=Math.cos(a),s=Math.sin(a); return {x:p.x,y:p.y*c-p.z*s,z:p.y*s+p.z*c}; }
function mkView(cx,cy,S,yaw,pitch=0){ return { P:(p)=>{ const q=rotX(rotY(p,yaw),pitch); return [cx+q.x*S,cy+q.y*S,q.z]; }, S,yaw,pitch,cx,cy }; }
// face outline loop (front of the head), ordered around: right temple -> jaw -> chin -> left jaw -> left temple -> forehead
function faceLoop(side=1){ const L=[];
  const half=[[.96,-.2,.25],[.97,.1,.32],[.9,.38,.42],[.8,.62,.36],[.62,.86,.42],[.36,1.04,.55],[.12,1.14,.62]];
  half.forEach(p=>L.push(V3(p[0],p[1],p[2]))); L.push(V3(0,1.16,.63)); [...half].reverse().forEach(p=>L.push(V3(-p[0],p[1],p[2])));
  [[-.9,-.55,.48],[-.55,-.86,.72],[0,-.96,.86],[.55,-.86,.72],[.9,-.55,.48]].forEach(p=>L.push(V3(p[0],p[1],p[2]))); return L; }
// visible silhouette of the face for a given view: project the loop; for the side turned away, pull the contour in to the
// brow / cheekbone / cheek "front" points so the far cheek reads as an anime 3/4 contour (brow bump, cheek dip, cheekbone, jaw)
function faceShape(v){ const loop=faceLoop(); const pts=loop.map(p=>v.P(p)); 
  const far=Math.sign(v.yaw)||1;              // yaw>0: face turns to screen-left, far side is the face's right (x>0)
  if(Math.abs(v.yaw)>.12){ const k=clamp((Math.abs(v.yaw)-.12)/.6);
    const fr=[[.62,-.12,.82],[.6,.2,.78],[.66,.42,.74],[.6,.68,.62],[.4,.92,.6],[.16,1.1,.64]].map(p=>v.P(V3(p[0]*far,p[1],p[2])));
    // replace the far half of the loop (indices 0..6 for far=+1, mirrored otherwise) by a blend toward the front contour
    for(let i=0;i<6;i++){ const idx=far>0?i+0:loop.length-1-5-i+1; }
    const n=loop.length; const farIdx=[]; for(let i=0;i<n;i++){ if(loop[i].x*far>.05&&loop[i].y>-.45) farIdx.push(i); }
    farIdx.forEach(i=>{ const p=loop[i]; let best=null,bd=1e9; fr.forEach(q=>{ const d=Math.abs(q[1]-pts[i][1]); if(d<bd){ bd=d; best=q; } }); if(best) pts[i]=[lerp(pts[i][0],best[0],k),pts[i][1],pts[i][2]]; }); }
  return pts.map(p=>[p[0],p[1]]); }
// ---------- palette ----------
const PAL={ skin:'#e2ac86', skinS:'#b97d66', skinS2:'#9c6152', skinL:'#f6d0ac', line:'#3a1e14', hair:'#3b2213', hairS:'#22120a', hairL:'#7c4e2e', hairLine:'#150a05', eyeW:'#fbf5ee', iris1:'#22120a', iris2:'#6b3f1c', iris3:'#d49a52', lip:'#b86a5e' };
// ---------- eye: anime construction (thick upper lash, tall iris, two highlights), foreshortened by facing ----------
function drawEye(X,v,side,o){ const C=V3(.4*side,.12,.82); const c=v.P(C); const n=rotY(V3(.35*side,0,.94),v.yaw); const face=clamp(n.z,.15,1);
  const S=v.S, w=.40*S*(.35+.65*face), h=.26*S*o.open, cx=c[0], cy=c[1];
  if(n.z<.08) return; const inner=-side*Math.sign(Math.cos(v.yaw))||-side;
  const sx=(t)=>cx+t*w/2*(side*(v.yaw>=0?1:1));
  // eye shape: flatter, longer upper lid typical of an adult male anime face
  const E=[[cx-w/2,cy+.01*S],[cx-w*.28,cy-h*.5],[cx+w*.12,cy-h*.6],[cx+w/2,cy-h*.18],[cx+w*.36,cy+h*.4],[cx-w*.18,cy+h*.42]];
  if(side<0) E.forEach(p=>p[0]=cx-(p[0]-cx));
  if(o.open<.12){ ink(X,[[cx-w/2,cy],[cx,cy+h*.1+.01*S],[cx+w/2,cy-.01*S]],.05*S,'#1c0c06',[.15,.15]); return; }
  fillS(X,E,PAL.eyeW);
  const ix=cx+(o.lookX||0)*w*.22, iy=cy+(o.lookY||0)*h*.2+.01*S, irx=w*.24, iry=.15*S;
  inside(X,E,()=>{ fillS(X,[[cx-w,cy-h],[cx+w,cy-h],[cx+w,cy-h*.18],[cx-w,cy-h*.1]],'#dcc9c2');
    const ig=X.createLinearGradient(0,iy-iry,0,iy+iry); ig.addColorStop(0,PAL.iris1); ig.addColorStop(.5,PAL.iris2); ig.addColorStop(.88,PAL.iris3); ig.addColorStop(1,'#f0c07a');
    X.fillStyle=ig; X.beginPath(); X.ellipse(ix,iy,irx,iry,0,0,7); X.fill(); X.lineWidth=.012*S; X.strokeStyle='#160903'; X.stroke();
    X.fillStyle='#140803'; X.beginPath(); X.ellipse(ix,iy-.012*S,irx*.42,iry*.45,0,0,7); X.fill();
    X.fillStyle='rgba(255,226,170,.5)'; X.beginPath(); X.ellipse(ix,iy+iry*.6,irx*.72,iry*.22,0,0,7); X.fill();
    X.fillStyle='#fff'; X.beginPath(); X.ellipse(ix-irx*.36,iy-iry*.42,irx*.36,iry*.26,-.4,0,7); X.fill(); X.beginPath(); X.arc(ix+irx*.42,iy+iry*.3,irx*.15,0,7); X.fill(); });
  // lash line, outer flick, lower lid and crease
  const up=[[E[0][0],E[0][1]],[E[1][0],E[1][1]],[E[2][0],E[2][1]],[E[3][0],E[3][1]],[E[3][0]+side*w*.12,E[3][1]+h*.28]];
  ink(X,up,.052*S*(.6+.4*face),'#1a0a05',[.08,.25]);
  ink(X,[[E[5][0],E[5][1]],[(E[5][0]+E[4][0])/2,E[4][1]+h*.06],[E[4][0],E[4][1]]],.014*S,'#4a261a',[.3,.3]);
  ink(X,[[E[1][0],E[1][1]-h*.42],[E[2][0],E[2][1]-h*.45],[E[3][0],E[3][1]-h*.3]],.011*S,'rgba(80,40,26,.65)',[.3,.3]); }
// ---------- the whole head ----------
function drawHead(X,o){ const v=mkView(o.cx,o.cy,o.S,o.yaw,o.pitch||0), S=o.S, far=Math.sign(o.yaw)||1;
  const P=(x,y,z)=>v.P(V3(x,y,z));
  // back hair mass (behind the head and neck): long, centre-parted, falls to the shoulders
  const backHair=[]; for(let i=0;i<=16;i++){ const a=-Math.PI*.5+i/16*Math.PI*2; backHair.push(v.P(V3(Math.cos(a)*1.12,-.25+Math.sin(a)*1.18,-.2+Math.abs(Math.sin(a))*.1))); }
  // back hair: tapered clumps hanging behind the shoulders (each a leaf from a root on the skull to a pointed tip)
  const leafP=(r0,r1,tip,bend,col)=>{ const a=v.P(V3(...r0)), b=v.P(V3(...r1)), t=v.P(V3(...tip)); const m1=[lerp(a[0],t[0],.55)+bend*S*.12,lerp(a[1],t[1],.55)], m2=[lerp(b[0],t[0],.55)+bend*S*.12,lerp(b[1],t[1],.55)];
    const q=[[a[0],a[1]],m1,[t[0],t[1]],m2,[b[0],b[1]]]; fillS(X,q,col); inkC(X,q,.018*S,PAL.hairLine); };
  fillS(X,[P(-1.08,-.3,-.2),P(-1.12,.6,-.4),P(-1.0,1.5,-.5),P(-.4,1.6,-.7),P(.4,1.6,-.7),P(1.0,1.5,-.5),P(1.12,.6,-.4),P(1.08,-.3,-.2),P(.6,-1.1,-.3),P(-.6,-1.1,-.3)].map(p=>[p[0],p[1]]),PAL.hairS);
  const tips=[[-1.28,1.95,-.35,-1],[-.95,2.12,-.5,-.6],[-.5,2.02,-.7,-.3],[0,2.1,-.8,0],[.5,2.02,-.7,.3],[.95,2.12,-.5,.6],[1.28,1.95,-.35,1]];
  tips.forEach((tp,i)=>{ const x0=tp[0]*.78; leafP([x0-.22,.3,-.45],[x0+.22,.3,-.45],[tp[0],tp[1],tp[2]],tp[3]*.4,i%2?PAL.hairS:'#2a160c'); });
  // neck
  const nk=[P(-.42,.9,.05),P(-.46,1.9,0),P(.46,1.9,0),P(.42,.9,.05)].map(p=>[p[0],p[1]]);
  fillS(X,nk,PAL.skin); inside(X,nk,()=>{ fillS(X,[[o.cx-S*2,o.cy+S*.7],[o.cx+S*2,o.cy+S*.7],[o.cx+S*2,o.cy+S*1.32],[o.cx-S*2,o.cy+S*1.2]],PAL.skinS2); });
  if(o.body) o.body(v,P);
  // face
  const F=faceShape(v); fillS(X,F,PAL.skin);
  inside(X,F,()=>{
    const lx=o.cx-S*1.1, rx=o.cx+S*1.1; const lg=X.createLinearGradient(lx,0,rx,0); lg.addColorStop(0,'rgba(255,224,190,.55)'); lg.addColorStop(.45,'rgba(255,224,190,0)'); X.fillStyle=lg; X.fillRect(lx,o.cy-S*1.4,S*2.2,S*2.8);
    // cel shadow on the side away from the key light (light from screen-left): a crisp shape following the cheek
    const sh=[P(.46,-1,.7),P(.62,-.2,.8),P(.6,.2,.78),P(.7,.5,.66),P(.55,.82,.5),P(.3,1.06,.6),P(1.4,1.4,0),P(1.4,-1.2,0)].map(p=>[p[0],p[1]]);
    fillS(X,sh,PAL.skinS);
    // hair shadow across the forehead + under-jaw shadow
    for(const sd of [-1,1]) fillS(X,[P(.02*sd,-1.08,.7),P(.34*sd,-.82,.86),P(.66*sd,-.5,.76),P(.9*sd,-.02,.58),P(.84*sd,.12,.6),P(.56*sd,-.36,.82),P(.24*sd,-.62,.9),P(0,-.8,.92)].map(p=>[p[0],p[1]]),'rgba(160,98,80,.55)');   // shadow cast by the hair curtains, following their edge
    X.save(); X.filter=`blur(${S*.05}px)`; X.fillStyle='rgba(232,120,110,.28)'; for(const sd of [-1,1]){ const q=P(.5*sd,.5,.78); X.beginPath(); X.ellipse(q[0],q[1],S*.15*(.4+.6*Math.max(.2,Math.cos(o.yaw+sd*.5))),S*.06,0,0,7); X.fill(); } X.restore(); });
  // silhouette ink on the far side + chin (anime leaves the light side mostly open)
  const sil=F.filter((p,i)=>true); ink(X,F.slice(0,15),.026*S,PAL.line,[.08,.08]);
  // near ear
  const earSide=-far; const ec=rotY(V3(1.0*earSide,.22,-.05),o.yaw); if(ec.z>-.2){ const e0=P(1.0*earSide,.05,-.05), e1=P(1.08*earSide,.22,-.1), e2=P(1.0*earSide,.44,-.02);
    const ear=[e0,[e1[0]+earSide*S*.03,e1[1]],e2,[lerp(e0[0],e2[0],.5)-earSide*S*.02,e1[1]]].map(p=>[p[0],p[1]]); fillS(X,ear,PAL.skinS); inkC(X,ear,.02*S,PAL.line); }
  // eyes, brows
  for(const sd of [-1,1]) drawEye(X,v,sd,{open:o.blink?0:1,lookX:o.lookX||0,lookY:o.lookY||0});
  for(const sd of [-1,1]){ const n=rotY(V3(.35*sd,0,.94),o.yaw); if(n.z<.1) continue; const a=P(.14*sd,-.14+(o.sad?-.03:0),.9), b=P(.42*sd,-.2,.88), c=P(.7*sd,-.12,.74); ink(X,sd*far<0?[[a[0],a[1]],[b[0],b[1]],[c[0],c[1]]]:[[a[0],a[1]],[b[0],b[1]],[c[0],c[1]]],.06*S*(.5+.5*n.z),'#26120a',[.1,.5]); }
  // nose: bridge shadow on the shadow side, small tip line, nostril
  { const t=P(0,.5,1.0), b0=P(.05*far,.15,.92); fillS(X,[[b0[0],b0[1]],[t[0]+far*S*.05,t[1]-S*.04],[t[0]+far*S*.02,t[1]+S*.04],[t[0]-far*S*.03,t[1]+S*.04],[t[0]+far*S*.02,t[1]-S*.06]],PAL.skinS);
    ink(X,[[t[0]-far*S*.07,t[1]+S*.045],[t[0],t[1]+S*.065],[t[0]+far*S*.05,t[1]+S*.05]],.022*S,PAL.line,[.3,.3]);
    X.fillStyle='rgba(255,240,220,.85)'; X.beginPath(); X.ellipse(t[0]-far*S*.03,t[1]-S*.02,S*.018,S*.035,0,0,7); X.fill(); }
  // mouth
  { const m=P(0,.81,.86), ml=P(-.17,.79,.82), mr=P(.17,.79,.82); const sm=o.smile||0; { const lp=P(0,.86,.84); X.fillStyle='rgba(170,80,66,.45)'; X.beginPath(); X.ellipse(lp[0],lp[1],S*.09*(.5+.5*Math.cos(o.yaw)),S*.022,0,0,7); X.fill(); }
    ink(X,[[ml[0],ml[1]-sm*S*.02],[m[0],m[1]+S*.02+sm*S*.02],[mr[0],mr[1]-sm*S*.02]],.022*S,'#4c2018',[.25,.25]);
    if(o.open){ fillS(X,[[ml[0]+S*.05,ml[1]+S*.01],[m[0],m[1]+S*.1*o.open],[mr[0]-S*.05,mr[1]+S*.01]],'#5a1e1a'); } }
  // beard + moustache (short, shaped, follows the jaw)
  if(o.beard){ const bd=[[.9,.3,.42],[.86,.6,.38],[.7,.86,.46],[.56,.96,.5],[.48,1.08,.56],[.3,1.12,.6],[.2,1.26,.64],[.06,1.2,.66],[-.06,1.28,.66],[-.2,1.2,.64],[-.32,1.14,.6],[-.48,1.08,.56],[-.58,.98,.5],[-.7,.86,.46],[-.86,.6,.38],[-.9,.3,.42],[-.72,.62,.6],[-.46,.88,.76],[-.2,.98,.82],[0,.99,.84],[.2,.98,.82],[.46,.88,.76],[.72,.62,.6]].map(p=>P(p[0],p[1],p[2])).filter(p=>true);
    const bp=bd.map(p=>[p[0],p[1]]); fillS(X,bp,PAL.hair);
    inside(X,bp,()=>{ fillS(X,[P(.1*far,.5,.9),P(1.3*far,.4,.4),P(1.3*far,1.5,.3),P(.1*far,1.4,.6)].map(p=>[p[0],p[1]]),PAL.hairS); for(let i=-2;i<=2;i++){ const a=P(i*.16,1.06,.78), b=P(i*.19,1.2,.68); ink(X,[[a[0],a[1]],[b[0],b[1]]],.016*S,'rgba(140,90,56,.75)',[.3,.3]); } });
    inkC(X,bp,.02*S,PAL.hairLine);
    const mu=[P(-.25,.735,.86),P(-.12,.695,.92),P(0,.712,.95),P(.12,.695,.92),P(.25,.735,.86)].map(p=>[p[0],p[1]]);
    ink(X,mu,.058*S,PAL.hair,[.4,.4]); ink(X,mu.map(p=>[p[0],p[1]-S*.012]),.02*S,PAL.hairL,[.4,.4]); }
  // front hair: centre part, two curtains framing the face, clumped tips; drawn over the forehead and sides
  const clump=(pts,col)=>{ const q=pts.map(p=>{ const r=v.P(V3(p[0],p[1],p[2])); return [r[0],r[1]]; }); fillS(X,q,col); inkC(X,q,.022*S,PAL.hairLine); return q; };
  for(const sd of [-1,1]){
    // big curtain from the part over the temple, down past the jaw to the shoulder
    const c1=[[.04*sd,-1.1,.62],[.5*sd,-1.0,.62],[.92*sd,-.6,.52],[1.08*sd,0,.35],[1.12*sd,.7,.25],[1.18*sd,1.4,.2],[1.3*sd,2.0,.1],[1.02*sd,1.6,.3],[1.0*sd,2.05,.25],[.9*sd,1.3,.42],[.92*sd,.6,.46],[.86*sd,0,.6],[.62*sd,-.5,.78],[.3*sd,-.78,.9]];
    const q=clump(c1,PAL.hair);
    inside(X,q,()=>{ const s1=[[.5*sd,-1.06,.62],[.95*sd,-.7,.5],[1.1*sd,-.2,.35],[1.0*sd,-.3,.4],[.8*sd,-.72,.6]].map(p=>{ const r=v.P(V3(p[0],p[1],p[2])); return [r[0],r[1]]; }); fillS(X,s1,PAL.hairL);
      if(sd===far){ const s2=[[1.3*sd,-1.2,0],[1.4*sd,2.4,0],[.96*sd,2.4,.3],[.98*sd,.2,.5]].map(p=>{ const r=v.P(V3(p[0],p[1],p[2])); return [r[0],r[1]]; }); fillS(X,s2,PAL.hairS); } });
    // a few strand lines
    for(let k=0;k<3;k++){ const pts=[[(.2+k*.2)*sd,-1.0,.8],[(.7+k*.12)*sd,-.4,.62],[(.98+k*.06)*sd,.5,.4],[(1.05+k*.08)*sd,1.3,.3]].map(p=>{ const r=v.P(V3(p[0],p[1],p[2])); return [r[0],r[1]]; }); ink(X,pts,.014*S,PAL.hairLine,[.2,.4]); } }
  // crown with angel-ring shine
  const cr0=[[-.9,-.62,.5],[-.7,-1.08,.3],[0,-1.3,.25],[.7,-1.08,.3],[.9,-.62,.5],[.5,-1.0,.62],[0,-1.12,.66],[-.5,-1.0,.62]].map(p=>{ const r=v.P(V3(p[0],p[1],p[2])); return [r[0],r[1]]; });
  fillS(X,cr0,PAL.hair); inside(X,cr0,()=>{ const rg=[[-.7,-.98,.45],[-.3,-1.16,.4],[.2,-1.17,.42],[.6,-1.0,.45],[.45,-.94,.55],[.2,-1.06,.55],[-.2,-1.06,.55],[-.5,-.92,.55]].map(p=>{ const r=v.P(V3(p[0],p[1],p[2])); return [r[0],r[1]]; }); fillS(X,rg,PAL.hairL); });
  inkC(X,cr0,.022*S,PAL.hairLine);
  // part line
  const pa=v.P(V3(0,-1.2,.5)), pb=v.P(V3(0,-.9,.86)); ink(X,[[pa[0],pa[1]],[pb[0],pb[1]]],.016*S,PAL.hairLine,[.2,.2]);
  return v; }
