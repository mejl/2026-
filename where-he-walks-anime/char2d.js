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
    { const ls=(P(.5,0,.8)[0]<P(-.5,0,.8)[0])?1:-1; X.fillStyle='rgba(255,226,196,.32)'; for(const [x,y,rx,ry,r] of [[.32,-.5,.13,.045,-.2],[.56,.3,.1,.035,-.5]]){ const q=P(x*ls,y,.84); X.beginPath(); X.ellipse(q[0],q[1],S*rx,S*ry,r*ls,0,7); X.fill(); }
      const n0=P(.03*ls,.12,.95), n1=P(.03*ls,.42,1.0); ink(X,[[n0[0],n0[1]],[n1[0],n1[1]]],.02*S,'rgba(255,232,206,.85)',[.3,.3]); }
    X.save(); X.filter=`blur(${S*.05}px)`; X.fillStyle='rgba(220,120,105,.1)'; for(const sd of [-1,1]){ const q=P(.5*sd,.5,.78); X.beginPath(); X.ellipse(q[0],q[1],S*.15*(.4+.6*Math.max(.2,Math.cos(o.yaw+sd*.5))),S*.06,0,0,7); X.fill(); } X.restore(); });
  // silhouette ink on the far side + chin (anime leaves the light side mostly open)
  const sil=F.filter((p,i)=>true); ink(X,F.slice(0,15),.026*S,PAL.line,[.08,.08]);
  // near ear
  const earSide=-far; const ec=rotY(V3(1.0*earSide,.22,-.05),o.yaw); if(ec.z>-.2){ const e0=P(1.0*earSide,.05,-.05), e1=P(1.08*earSide,.22,-.1), e2=P(1.0*earSide,.44,-.02);
    const ear=[e0,[e1[0]+earSide*S*.03,e1[1]],e2,[lerp(e0[0],e2[0],.5)-earSide*S*.02,e1[1]]].map(p=>[p[0],p[1]]); fillS(X,ear,PAL.skinS); inkC(X,ear,.02*S,PAL.line); }
  // eyes, brows
  for(const sd of [-1,1]) drawEye(X,v,sd,{open:o.blink?0:1,lookX:o.lookX||0,lookY:o.lookY||0});
  for(const sd of [-1,1]){ const n=rotY(V3(.35*sd,0,.94),o.yaw); if(n.z<.1) continue; const a=P(.12*sd,-.17+(o.sad?-.03:0),.9), b=P(.42*sd,-.26,.88), c=P(.72*sd,-.17,.74); ink(X,sd*far<0?[[a[0],a[1]],[b[0],b[1]],[c[0],c[1]]]:[[a[0],a[1]],[b[0],b[1]],[c[0],c[1]]],.05*S*(.5+.5*n.z),'#2a160c',[.06,.7]); }
  // nose: bridge shadow on the shadow side, small tip line, nostril
  { const t=P(0,.5,1.0), b0=P(.05*far,.15,.92); fillS(X,[[b0[0],b0[1]],[t[0]+far*S*.05,t[1]-S*.04],[t[0]+far*S*.02,t[1]+S*.04],[t[0]-far*S*.03,t[1]+S*.04],[t[0]+far*S*.02,t[1]-S*.06]],PAL.skinS);
    ink(X,[[t[0]-far*S*.07,t[1]+S*.045],[t[0],t[1]+S*.065],[t[0]+far*S*.05,t[1]+S*.05]],.022*S,PAL.line,[.3,.3]);
    X.fillStyle='rgba(255,240,220,.85)'; X.beginPath(); X.ellipse(t[0]-far*S*.03,t[1]-S*.02,S*.018,S*.035,0,0,7); X.fill(); }
  // mouth
  { const m=P(0,.81,.86), ml=P(-.17,.79,.82), mr=P(.17,.79,.82); const sm=o.smile||0; { const lp=P(0,.86,.84); X.fillStyle='rgba(170,80,66,.45)'; X.beginPath(); X.ellipse(lp[0],lp[1],S*.09*(.5+.5*Math.cos(o.yaw)),S*.022,0,0,7); X.fill(); }
    ink(X,[[ml[0],ml[1]-sm*S*.02],[m[0],m[1]+S*.02+sm*S*.02],[mr[0],mr[1]-sm*S*.02]],.022*S,'#4c2018',[.25,.25]);
    if(o.open){ fillS(X,[[ml[0]+S*.05,ml[1]+S*.01],[m[0],m[1]+S*.1*o.open],[mr[0]-S*.05,mr[1]+S*.01]],'#5a1e1a'); } }
  // beard + moustache (short, shaped, follows the jaw)
  if(o.beard){ const bd=[[.94,.12,.36],[.94,.4,.36],[.86,.66,.38],[.7,.9,.46],[.54,1.04,.52],[.36,1.14,.58],[.22,1.24,.63],[.08,1.2,.65],[-.06,1.28,.66],[-.2,1.22,.64],[-.36,1.14,.58],[-.54,1.04,.52],[-.7,.9,.46],[-.86,.66,.38],[-.94,.4,.36],[-.94,.12,.36],[-.86,.2,.46],[-.8,.52,.56],[-.6,.78,.7],[-.36,.9,.82],[-.18,.95,.86],[0,.96,.87],[.18,.95,.86],[.36,.9,.82],[.6,.78,.7],[.8,.52,.56],[.86,.2,.46]].map(p=>P(p[0],p[1],p[2])).filter(p=>true);
    const bp=bd.map(p=>[p[0],p[1]]); fillS(X,bp,PAL.hair);
    inside(X,bp,()=>{ fillS(X,[P(.1*far,.5,.9),P(1.3*far,.4,.4),P(1.3*far,1.5,.3),P(.1*far,1.4,.6)].map(p=>[p[0],p[1]]),PAL.hairS); for(let i=-5;i<=5;i++){ const a=P(i*.13,.98+Math.abs(i)*.005,.8), b=P(i*.15,1.16-Math.abs(i)*.03,.66); ink(X,[[a[0],a[1]],[b[0],b[1]]],.013*S,'rgba(150,100,64,.6)',[.35,.35]); }
      { const ls=(P(.5,0,.8)[0]<P(-.5,0,.8)[0])?1:-1; const hb=[P(.78*ls,.5,.56),P(.6*ls,.86,.66),P(.4*ls,1.0,.74),P(.46*ls,.92,.72),P(.66*ls,.74,.62)].map(p=>[p[0],p[1]]); fillS(X,hb,'rgba(122,78,48,.75)'); } });
    inkC(X,bp,.02*S,PAL.hairLine);
    const mu=[P(-.32,.8,.83),P(-.22,.735,.89),P(-.09,.69,.94),P(0,.712,.95),P(.09,.69,.94),P(.22,.735,.89),P(.32,.8,.83),P(.19,.77,.9),P(0,.758,.95),P(-.19,.77,.9)].map(p=>[p[0],p[1]]);
    fillS(X,mu,PAL.hair); inside(X,mu,()=>fillS(X,[P(.02*far,.6,.95),P(.5*far,.6,.8),P(.5*far,.9,.8),P(.02*far,.9,.95)].map(p=>[p[0],p[1]]),PAL.hairS)); inkC(X,mu,.016*S,PAL.hairLine); }
  drawHairV3(X,v,o,S);
  return v; }

// ---------- hair v3: layered clumps, each with a shadow half, root shade, angel-ring highlight and tapered ink edges ----------
const HC={ base:'#3b2213', shadow:'#24130b', deep:'#170b06', light:'#7e5130', shine:'#a8774c', line:'#140904', rim:'rgba(150,185,255,.85)' };
function hairClump(X,v,S,spine,w0,opt={}){
  const pts=spine.map(p=>{ const q=v.P(V3(p[0],p[1],p[2])); return [q[0],q[1]]; });
  const sp=cr(pts,false,10), n=sp.length, Lf=[], Rt=[];
  for(let i=0;i<n;i++){ const a=sp[Math.max(0,i-1)], b=sp[Math.min(n-1,i+1)]; let dx=b[0]-a[0], dy=b[1]-a[1]; const l=Math.hypot(dx,dy)||1; dx/=l; dy/=l; const t=i/(n-1);
    const w=w0*S*(t<.12?(.7+.3*t/.12):Math.pow(Math.max(0,1-(t-.12)/.88),.8))*.5;
    Lf.push([sp[i][0]-dy*w,sp[i][1]+dx*w]); Rt.push([sp[i][0]+dy*w,sp[i][1]-dx*w]); }
  const poly=Lf.concat(Rt.slice().reverse());
  pathOf(X,poly); X.fillStyle=opt.base||HC.base; X.fill();
  const mid=Math.floor(n/2), dark=(Lf[mid][0]>Rt[mid][0])?Lf:Rt, lit=dark===Lf?Rt:Lf;     // key light from screen-left: the right-hand half is in shadow
  X.save(); pathOf(X,poly); X.clip();
  // shadow half (crisp cel edge slightly off the spine), deeper shade near the scalp
  pathOf(X,sp.map((p,i)=>[lerp(p[0],dark[i][0],-.15),lerp(p[1],dark[i][1],-.15)]).concat(dark.slice().reverse())); X.fillStyle=opt.shadow||HC.shadow; X.fill();
  const r0=Math.floor(n*.14); pathOf(X,Lf.slice(0,r0).concat(Rt.slice(0,r0).reverse())); X.fillStyle=HC.deep; X.globalAlpha=.18; X.fill(); X.globalAlpha=1;
  // a second, thin long highlight streak lower down
  const st=[]; for(let i=Math.floor(n*.45);i<Math.floor(n*.75);i++) st.push([lerp(sp[i][0],lit[i][0],.55),lerp(sp[i][1],lit[i][1],.55)]);
  if(st.length>2) ink(X,st,.012*S,'rgba(140,96,60,.8)',[.4,.4]);
  X.restore();
  // ink: tapered lines along both edges (thicker on the shadow side), meeting at the tip
  ink(X,dark,.024*S,HC.line,[.08,.35]); ink(X,lit,.015*S,HC.line,[.08,.35]);
  if(opt.rim){ X.save(); X.globalCompositeOperation='lighter'; ink(X,dark.slice(Math.floor(n*.2)),.012*S,HC.rim,[.3,.4]); X.restore(); }
  return poly; }
function drawHairV3(X,v,o,S){ const far=Math.sign(o.yaw)||1, P=(x,y,z)=>v.P(V3(x,y,z));
  // scalp base under the clumps
  const cr0=[[-.92,-.6,.5],[-.72,-1.08,.3],[0,-1.3,.25],[.72,-1.08,.3],[.92,-.6,.5],[.5,-.98,.66],[0,-1.08,.7],[-.5,-.98,.66]].map(p=>{ const r=P(p[0],p[1],p[2]); return [r[0],r[1]]; });
  fillS(X,cr0,HC.base); inkC(X,cr0,.02*S,HC.line);
  // clumps from the centre part, back ones first; the near side gets two that fall forward over the shoulder
  const H=(k)=>.5+.5*Math.sin(k*12.9898)*.5;
  const order=[]; for(const sd of [far,-far]) for(let k=5;k>=0;k--) order.push([sd,k]);
  for(const [sd,k] of order){ if(k%2===1&&k<5) continue; const t=k/5;
    const root=[.04*sd,lerp(-.98,-1.26,t),lerp(.8,.2,t)];
    const a=[sd*lerp(.5,.62,t),lerp(-1.02,-1.12,t),lerp(.72,.18,t)];
    const b=[sd*lerp(.92,1.0,t),lerp(-.5,-.55,t),lerp(.56,0,t)];
    const c=[sd*lerp(1.04,1.12,t),lerp(.35,.3,t),lerp(.42,-.12,t)];
    const tip=[sd*lerp(1.06,1.3,t)+sd*.06*Math.sin(k*2.1),lerp(1.35,1.75,t)+.18*Math.sin(k*3.7),lerp(.36,-.2,t)];
    hairClump(X,v,S,[root,a,b,c,tip],lerp(.46,.5,t),{rim:sd===far&&k<3});
  }
  // near side: hair over the front of the shoulder
  const nsd=-far; for(const [dx,ln] of [[0,0],[.16,.25]]){ hairClump(X,v,S,[[nsd*.9,-.6,.6],[nsd*(1.06+dx),.2,.5],[nsd*(1.1+dx),1.1,.62],[nsd*(1.18+dx),1.9+ln,.7],[nsd*(1.12+dx),2.6+ln,.72]],.4,{hiEnd:.25}); }
  // a few loose strands
  for(const sd of [-1,1]) ink(X,[P(.3*sd,-1.02,.8),P(.66*sd,-.7,.74),P(.94*sd,.0,.6),P(1.0*sd,.9,.5)].map(p=>[p[0],p[1]]),.01*S,HC.line,[.3,.4]);
  // angel-ring shine: tapered light strokes following the crown curve, a gap at the part, stronger on the lit side
  for(let i=0;i<5;i++){ const u0=-1+i*.42+.04, u1=u0+.3; if(Math.abs(u0+.15)<.12) continue; const pts=[]; for(let k=0;k<=6;k++){ const u=lerp(u0,u1,k/6); const ang=u*1.25; const p=P(Math.sin(ang)*.9,-1.04-.06*Math.cos(ang*1.6)+((i%2)?.025:0),Math.cos(ang)*.5); pts.push([p[0],p[1]]); }
    const litK=(Math.sin(u0*1.25)*far<0)?1:.55; ink(X,pts,.075*S*litK,`rgba(176,128,84,${.95*litK})`,[.45,.45]); }
  // part line
  const pa=P(0,-1.22,.45), pb=P(0,-.95,.84); ink(X,[[pa[0],pa[1]],[pb[0],pb[1]]],.014*S,HC.line,[.2,.2]); }
