// ===== people: posable rig, baked crowd figures with morph-target poses, Jesus as a figure of light =====
const SKINC=0xb98a66, LITE=0xffe3b0;
const ROBET=ctex(64,128,(x,w,h)=>{ const g=x.createLinearGradient(0,0,0,h); g.addColorStop(0,'#fff6e0'); g.addColorStop(.5,'#f6d49a'); g.addColorStop(1,'#d99a52'); x.fillStyle=g; x.fillRect(0,0,w,h); for(let i=0;i<w;i++){ const a=.1+.1*Math.sin(i*1.7)*Math.sin(i*.43); x.fillStyle=`rgba(80,40,0,${Math.max(0,a)*.7})`; x.fillRect(i,0,1,h); } });
function mkRig(o){
  const lo=!!o.lo, cs=lo?2:4, rs=lo?7:12, st=o.style||'coat', sc=o.scale||1;
  const cloth=o.cloth??0x1c2333, cloth2=o.cloth2??0x141a28, skin=o.skin??SKINC, hair=o.hair??0x14100e, jes=st==='jesus';
  const em=o.em||null; const mc=(c,extra={})=>M(c,Object.assign({r:.88},em?{e:em[0],ei:em[1]}:{},extra));
  const mats={cloth:jes?M(0xffe2b0,{r:.85,e:0xffc47a,ei:.5}):mc(cloth), cloth2:jes?M(0xf0cf98,{r:.85,e:0xffb866,ei:.4}):mc(cloth2), skin:jes?M(0xd9a678,{r:.7,e:0xffc890,ei:.1}):mc(skin,{r:.7}), hair:mc(hair,{r:.8}), pants:mc(o.pants??0x0e121b), shoe:mc(0x0a0b10)};
  const root=new THREE.Group(); const hips=grp([0,.93*sc,0],root); const R={root,hips,st,sc,mats,o};
  const k=(x)=>x*sc;
  // pelvis + torso
  const torso=grp([0,0,0],hips); R.torso=torso;
  const tm=(st==='robe'||jes)?mats.cloth:st==='hood'?mats.cloth:mats.cloth;
  caps(k(.15),k(.30),tm,[0,k(.27),0],torso,m=>m.scale.set(jes?1.3:1.12,1,.74),cs,rs);
  caps(k(.15),k(.12),(st==='robe'||jes)?mats.cloth2:mats.pants,[0,k(.02),0],hips,m=>m.scale.set(1.2,1,.8),cs,rs);
  if(st==='hood'||st==='coat'){ cyl(k(.19),k(.2),k(.2),mats.cloth,[0,k(.0),0],torso,m=>m.scale.z=.78,rs); }
  if(st==='coat'){ cyl(k(.2),k(.25),k(.34),mats.cloth,[0,k(-.14),0],torso,m=>m.scale.z=.8,rs); }
  if(jes){ cyl(k(.2),k(.21),k(.035),M(0x8a5a2a,{r:.6,e:0x8a5a2a,ei:.5}),[0,k(.03),0],torso,m=>m.scale.z=.74,rs); }
  // neck + head
  cyl(k(.048),k(.055),k(.1),mats.skin,[0,k(.6),0],torso,null,8);
  const head=grp([0,k(.62),0],torso); R.head=head;
  sph(k(.12),mats.skin,[0,k(.125),0],head,m=>m.scale.set(.92,1.1,1),lo?10:18,lo?8:14);
  sph(k(.02),mats.skin,[0,k(.105),k(.108)],head,m=>m.scale.set(1,1.2,1),6,5);        // nose: tells which way the face looks
  if(st==='hood'&&o.hood!==false){ sph(k(.138),mats.cloth,[0,k(.135),k(-.02)],head,m=>m.scale.set(1.0,1.08,1.05),lo?10:16,lo?8:12);
    sph(k(.09),mats.cloth,[0,k(.0),k(-.1)],head,m=>m.scale.set(1.2,1,1),8,6); }
  else if(st==='hood'||st==='coat'){ mesh(GEO('hc'+rs,()=>new THREE.SphereGeometry(1,lo?10:16,lo?6:10,0,TAU,0,1.75)),mats.hair,[0,k(.13),k(-.01)],head,m=>{ m.scale.setScalar(k(.118)); m.rotation.x=-.28; m.scale.y=k(.13); }); }
  if(st==='robe'){ mesh(GEO('hc'+rs,()=>new THREE.SphereGeometry(1,lo?10:16,lo?6:10,0,TAU,0,1.75)),M(o.wrap??0x2b2a33,{r:.9}),[0,k(.13),k(-.018)],head,m=>{ m.scale.setScalar(k(.128)); m.rotation.x=-.3; m.scale.y=k(.14); });
    box(k(.2),k(.2),k(.05),M(o.wrap??0x2b2a33,{r:.9}),[0,k(.02),k(-.1)],head); }
  if(jes){ mesh(GEO('hc'+rs,()=>new THREE.SphereGeometry(1,16,10,0,TAU,0,1.9)),mats.hair,[0,k(.125),k(-.012)],head,m=>{ m.scale.setScalar(k(.13)); m.rotation.x=-.2; m.scale.y=k(.145); });
    caps(k(.1),k(.3),mats.hair,[0,k(-.1),k(-.07)],head,m=>m.scale.set(1.5,1,.7),3,8); }
  // arms
  R.sh=[]; R.el=[];
  for(const sd of [-1,1]){ const sh=grp([sd*k(jes?.225:.2),k(.5),0],torso); const sl=jes?.058:.056; caps(k(sl),k(.2),(st==='robe'||jes)?mats.cloth:mats.cloth,[0,k(-.15),0],sh,m=>{ if(jes) m.scale.set(1.05,1,1.05); },cs,rs);
    const el=grp([0,k(-.3),0],sh); caps(k(sl*.92),k(.19),(jes)?mats.cloth:mats.cloth,[0,k(-.14),0],el,m=>{ if(jes) m.scale.set(1.25,1,1.25); },cs,rs); sph(k(.048),mats.skin,[0,k(-.3),0],el,m=>m.scale.set(.8,1.15,.9),8,6); R.sh.push(sh); R.el.push(el); }
  // legs
  R.lg=[]; R.kn=[];
  for(const sd of [-1,1]){ const lg=grp([sd*k(.095),0,0],hips); caps(k(.075),k(.34),(st==='robe'||jes)?mats.cloth2:mats.pants,[0,k(-.22),0],lg,null,cs,rs); const kn=grp([0,k(-.44),0],lg); caps(k(.065),k(.34),(st==='robe'||jes)?mats.cloth2:mats.pants,[0,k(-.22),0],kn,null,cs,rs); box(k(.1),k(.07),k(.24),(st==='robe'||jes)?mats.skin:mats.shoe,[0,k(-.46),k(.05)],kn); R.lg.push(lg); R.kn.push(kn); }
  // robe skirt (covers legs) – deformable
  if(st==='robe'||jes){ const g=new THREE.CylinderGeometry(k(jes?.215:.19),k(jes?.27:.34),k(.84),lo?10:18,lo?3:9,true); const rm=mesh(g,jes?M(0xffffff,{r:.85,map:ROBET,em:ROBET,e:0xffffff,ei:.6,side:THREE.DoubleSide}):M(o.robe??cloth,{r:.9,side:THREE.DoubleSide,e:em?em[0]:0,ei:em?em[1]:0}),[0,k(-.46),0],hips); R.robe=rm; R.robeBase=Float32Array.from(g.attributes.position.array); }
  if(jes){ sph(k(.05),mats.hair,[0,k(.095),k(.095)],head,m=>m.scale.set(1.1,1.2,.8),8,6); }
  if(o.umb){ const ug=grp([0,k(1.12),0],torso); mesh(GEO('umbc',()=>new THREE.ConeGeometry(.62,.26,16)),M(o.umb,{r:.7,side:THREE.DoubleSide}),[0,.0,0],ug); cyl(.012,.012,.5,M(0x111111),[0,-.25,0],ug,null,5); R.umb=ug; }
  if(o.staff){ R.staff=cyl(.02,.02,1.5,M(0x3a2a1a,{r:.8}),[.42,.75,.28],root,null,6); }
  if(o.crutch){ R.staff=cyl(.022,.022,1.25,M(0x3a2a1a,{r:.8}),[-.3,.62,.12],root,null,6); box(.22,.03,.03,M(0x3a2a1a),[0,.6,0],R.staff); }
  if(o.extra) o.extra(R);
  return R;
}
// pose: {walk:phase,wa:amount, y, sit:0..1, lean, tr:[pitch,roll,yaw], hd:[pitch,yaw,roll], aL:[fwd,out,elbow] (side x<0), aR, lgL:[hip,knee], lgR, robe:scaleY, sway:t}
function setPose(R,p,t=0){
  const sc=R.sc, wk=p.walk||0, wa=p.wa||0, sit=p.sit||0, kneel=p.kneel||0;
  R.root.position.y=(p.y||0)*1; const hy=.93*sc;
  R.hips.position.y=hy-(sit?(.5*sc*sit):0)-(kneel?.42*sc*kneel:0)-(p.crouch?(p.crouch*.28*sc):0);
  R.hips.rotation.x=0;
  const sA=Math.sin(wk), cA=Math.cos(wk);
  let thL=-.5*wa*sA, thR=.5*wa*sA, knL=Math.max(0,cA)*.9*wa, knR=Math.max(0,-cA)*.9*wa;
  if(sit){ const s=sit; thL=thR=lerp(thL,-1.5,s); knL=knR=lerp(knL,1.5,s); if(p.cross){ thL=-1.0; thR=-1.0; knL=2.3; knR=2.3; } }
  if(kneel){ thL=lerp(thL,-.15,kneel); thR=lerp(thR,-1.45,kneel); knL=lerp(knL,2.3,kneel); knR=lerp(knR,1.5,kneel); }
  if(p.crouch){ thL=thR=-p.crouch*1.1; knL=knR=p.crouch*1.7; }
  R.lg[0].rotation.z=-(p.spread||0); R.lg[1].rotation.z=(p.spread||0);
  if(p.lgL){ thL=p.lgL[0]; knL=p.lgL[1]; } if(p.lgR){ thR=p.lgR[0]; knR=p.lgR[1]; }
  R.lg[0].rotation.x=thL; R.kn[0].rotation.x=knL; R.lg[1].rotation.x=thR; R.kn[1].rotation.x=knR;
  const tr=p.tr||[0,0,0]; R.torso.rotation.set(tr[0]+(p.lean||0),tr[2]||0,tr[1]||0);
  const hd=p.hd||[0,0,0]; R.head.rotation.set(hd[0],hd[1],hd[2]);
  let aL=p.aL||[0,.06,.12], aR=p.aR||[0,.06,.12];
  if(wa&&!p.aL) aL=[wa*.45*sA,.06,.18+.2*wa]; if(wa&&!p.aR) aR=[-wa*.45*sA,.06,.18+.2*wa];
  R.sh[0].rotation.set(-aL[0],0,-aL[1]); R.el[0].rotation.x=-aL[2]; R.sh[1].rotation.set(-aR[0],0,aR[1]); R.el[1].rotation.x=-aR[2];
  if(R.staff){ const f=p.sf||0; R.staff.position.set(R.staff.userData.x0??(R.staff.userData.x0=R.staff.position.x)+0,0,0); const x0=R.staff.userData.x0; R.staff.position.set(x0+(x0>0?.35:-.2)*f,lerp(R.staff.geometry.parameters.height/2,.03,f),.28); R.staff.rotation.z=(x0>0?-1:1)*f*1.5; }
  if(R.umb){ const u=p.umb??1; R.umb.scale.set(.1+.9*u,.9+u*.1,.1+.9*u); R.umb.rotation.z=(p.umbT||0); }
  if(R.robe){ const ry=p.robe??1; R.robe.scale.y=lerp(1,ry,1); R.robe.position.y=-.46*sc*ry+(1-ry)*0; if(p.sit&&p.cross){ R.robe.scale.set(1.35,.5,1.35); R.robe.position.y=-.2*sc; }
    const pa=R.robe.geometry.attributes.position, b=R.robeBase, amp=(R.st==='jesus'?.1:.05)*(.3+(wa||0)), n=pa.count, h=.84*sc;
    for(let i=0;i<n;i++){ const bx=b[i*3], by=b[i*3+1], bz=b[i*3+2], d=clamp((h/2-by)/h); const sw=Math.sin(wk*1+by*3.1+t*1.7)*amp*d*d, sw2=Math.cos(wk*.5+by*2.3+t*1.1)*amp*.6*d*d; pa.array[i*3]=bx*(1+sw*.8)+sw2*.5; pa.array[i*3+2]=bz*(1+sw*.8)-sw*.6-(wa?amp*d*d*.8:0); }
    pa.needsUpdate=true; }
}
class Donkey{ constructor(){ const mk=(par)=>{ const g=grp(null,par); const c=M(0x34302b,{r:.9}); caps(.27,.7,c,[0,.95,0],g,m=>m.rotation.x=Math.PI/2); caps(.12,.38,c,[0,1.2,.62],g,m=>m.rotation.x=.75); caps(.1,.24,c,[0,1.42,.93],g,m=>m.rotation.x=1.25); for(const sd of [-1,1]) caps(.03,.18,c,[sd*.07,1.62,.84],g,m=>{ m.rotation.x=.2; m.rotation.z=sd*-.15; }); caps(.025,.45,c,[0,.85,-.62],g,m=>m.rotation.x=-.35); const L=[]; for(const [sx,sz] of [[-1,1],[1,1],[-1,-1],[1,-1]]){ const lg=grp([sx*.17,.76,sz*.42],g); caps(.05,.55,c,[0,-.35,0],lg); L.push(lg); } g.userData.L=L; return g; }; this.r=mk(GS); this.m=mk(MIRG); this.show(false); ACTORS.push(this); }
  show(v){ this.r.visible=this.m.visible=v; }
  set(x,y,z,ry,t,amt=1){ this.show(true); for(const g of [this.r,this.m]){ g.position.set(x,y,z); g.rotation.y=ry; const w=WKd(t); g.userData.L.forEach((l,i)=>{ l.rotation.x=Math.sin(w+(i===0||i===3?0:Math.PI))*.4*amt; }); } } }
const WKd=t=>t*TAU/(PER*2);
class Actor{ constructor(o){ this.r=mkRig(o); this.m=mkRig(o); this.r.root.name='actor'; GS.add(this.r.root); MIRG.add(this.m.root); ACTORS.push(this); this.show(false); }
  show(v){ this.r.root.visible=this.m.root.visible=v; }
  set(x,y,z,ry,p,t=0){ this.show(true); for(const R of [this.r,this.m]){ R.root.position.set(x,y,z); R.root.rotation.y=ry; setPose(R,p||{},t); } }
  pos(){ return this.r.root.position; } }
// ---------- baked figures (one draw call, pose = morph targets) ----------
function bakeRig(R){ R.root.updateMatrixWorld(true); const P=[],N=[],C=[]; R.root.traverse(m=>{ if(!m.isMesh) return; const g=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone(); g.applyMatrix4(m.matrixWorld); const pa=g.attributes.position.array, na=g.attributes.normal.array, c=m.material.color; for(let i=0;i<pa.length;i+=3){ P.push(pa[i],pa[i+1],pa[i+2]); N.push(na[i],na[i+1],na[i+2]); C.push(c.r,c.g,c.b); } }); return {P,N,C}; }
function figGeom(o,poses){ const bk=poses.map(p=>{ const R=mkRig(Object.assign({lo:true},o)); setPose(R,p,0); return bakeRig(R); }); const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(bk[0].P,3)); g.setAttribute('normal',new THREE.Float32BufferAttribute(bk[0].N,3)); g.setAttribute('color',new THREE.Float32BufferAttribute(bk[0].C,3));
  g.morphAttributes.position=bk.slice(1).map(b=>new THREE.Float32BufferAttribute(b.P,3)); g.morphAttributes.normal=bk.slice(1).map(b=>new THREE.Float32BufferAttribute(b.N,3)); g.morphTargetsRelative=false; return g; }
// crowd: n members, each Mesh sharing geometry; mirrored copy optional
class Crowd{ constructor(geo,specs,par,mpar,tints){ this.items=[]; for(const s of specs){ const t=tints?tints[Math.floor(hash(s.id||0)*tints.length)]:0xffffff; const mat=new THREE.MeshStandardMaterial({vertexColors:true,color:t,roughness:.9,emissive:0xffb060,emissiveIntensity:0}); const a=new THREE.Mesh(geo,mat); a.morphTargetInfluences=new Array(geo.morphAttributes.position.length).fill(0); par.add(a); let b=null; if(mpar){ b=new THREE.Mesh(geo,mat); b.morphTargetInfluences=a.morphTargetInfluences; mpar.add(b); } this.items.push({a,b,s,mat}); } }
  each(f){ this.items.forEach((it,i)=>{ f(it,i); }); }
  set(it,x,y,z,ry,infl,em,sc=1){ for(const m of [it.a,it.b]){ if(!m) continue; m.position.set(x,y,z); m.rotation.y=ry; m.scale.setScalar(sc); } for(let j=0;j<infl.length;j++) it.a.morphTargetInfluences[j]=infl[j]; it.mat.emissiveIntensity=(em||0)*.1; } }
