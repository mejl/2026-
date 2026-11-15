// ===== 3D world: renderer, lights, materials, character rig, sets =====
const GW=window.GWOVR||1600, GH=GW*9/16;
const GLC=document.createElement('canvas'); GLC.width=GW; GLC.height=GH;
const GR=new THREE.WebGLRenderer({canvas:GLC,antialias:true,alpha:true,preserveDrawingBuffer:true}); GR.setSize(GW,GH,false); GR.setClearColor(0x000000,0); GR.shadowMap.enabled=true; GR.shadowMap.type=THREE.PCFSoftShadowMap; GR.toneMapping=THREE.ACESFilmicToneMapping; GR.toneMappingExposure=.9;
const GS=new THREE.Scene(), GC=new THREE.PerspectiveCamera(35,16/9,.1,400);
(function(){ const c=document.createElement('canvas'); c.width=512; c.height=256; const x=c.getContext('2d'); const g=x.createLinearGradient(0,0,0,256); g.addColorStop(0,'#ffffff'); g.addColorStop(.45,'#cfd8e2'); g.addColorStop(.55,'#8d96a2'); g.addColorStop(1,'#3a404a'); x.fillStyle=g; x.fillRect(0,0,512,256); x.fillStyle='#fff'; x.fillRect(40,30,120,70); x.fillRect(300,20,90,90); const t=new THREE.CanvasTexture(c); t.mapping=THREE.EquirectangularReflectionMapping; t.colorSpace=THREE.SRGBColorSpace; GS.environment=t; })();
const HEMI=new THREE.HemisphereLight(0xffffff,0x8090a8,.6), KEY=new THREE.DirectionalLight(0xfff2dc,2), FILL=new THREE.DirectionalLight(0xbfd4ff,.5), SPOT=new THREE.SpotLight(0xfff0cc,0,40,.5,.5,1.2);
KEY.castShadow=true; KEY.shadow.mapSize.set(2048,2048); KEY.shadow.radius=5; KEY.shadow.bias=-.0004; KEY.shadow.normalBias=.03; SPOT.castShadow=true; SPOT.shadow.mapSize.set(1024,1024); SPOT.shadow.radius=6; SPOT.shadow.bias=-.0004;
GS.add(HEMI,KEY,KEY.target,FILL,SPOT,SPOT.target); GS.fog=new THREE.Fog(0xffffff,60,200);
const _m={}; const MT=(c,r=.85,m=0,e=0)=>{ const k=c+'_'+r+'_'+m+'_'+e; return _m[k]||(_m[k]=new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m,emissive:e?c:0,emissiveIntensity:e,envMapIntensity:.45})); };
const add=(g,p,par,sh=true)=>{ const o=g.isObject3D?g:null; return o; };
function mesh(geo,mat,p,par,cb){ const o=new THREE.Mesh(geo,mat); o.castShadow=true; o.receiveShadow=true; if(p) o.position.set(p[0],p[1],p[2]); if(cb) cb(o); if(par) par.add(o); return o; }
const _g={}; const GEO=(k,f)=>_g[k]||(_g[k]=f());
const box=(w,h,d,c,p,par,cb)=>mesh(GEO('b'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),typeof c==='number'?MT(c):c,p,par,cb);
const cyl=(rt,rb,h,c,p,par,cb,seg=24)=>mesh(GEO('c'+rt+'_'+rb+'_'+h+'_'+seg,()=>new THREE.CylinderGeometry(rt,rb,h,seg)),typeof c==='number'?MT(c):c,p,par,cb);
const sph=(r,c,p,par,cb)=>mesh(GEO('s'+r,()=>new THREE.SphereGeometry(r,28,20)),typeof c==='number'?MT(c):c,p,par,cb);
const caps=(r,l,c,p,par,cb)=>mesh(GEO('k'+r+'_'+l,()=>new THREE.CapsuleGeometry(r,l,8,20)),typeof c==='number'?MT(c):c,p,par,cb);
const grp=(p,par)=>{ const g=new THREE.Group(); if(p) g.position.set(p[0],p[1],p[2]); if(par) par.add(g); return g; };
function ctex(w,h,draw,rep){ const c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d'); draw(x,w,h); const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=8; if(rep){ t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(rep[0],rep[1]); } t.userData={c,x}; return t; }
const TM=(tex,r=.85)=>new THREE.MeshStandardMaterial({map:tex,roughness:r,envMapIntensity:.4});
const pln=(w,h,m,p,par,cb)=>{ const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m); o.receiveShadow=true; if(p) o.position.set(p[0],p[1],p[2]); if(cb) cb(o); if(par) par.add(o); return o; };
// ---------- character rig ----------
const SKIN=0xe6b990;
function mkChar(o){ const g=new THREE.Group(), u={o}, coat=o.coat, legc=o.leg||0x2b2a2e, skin=MT(SKIN,.62), dk=MT(0x1b1a1a,.45), hc=o.hair, cd=new THREE.Color(coat).multiplyScalar(.78).getHex();
  for(const sd of [-1,1]){ const hip=grp([sd*.115,.98,0],g); caps(.088,.32,legc,[0,-.21,0],hip); const kn=grp([0,-.46,0],hip); caps(.076,.32,legc,[0,-.2,0],kn); sph(.095,dk,[0,-.455,.065],kn,m=>m.scale.set(1,.55,1.95)); u[sd<0?'legL':'legR']=hip; u[sd<0?'knL':'knR']=kn; }
  const body=grp([0,0,0],g); u.body=body; caps(.215,.34,coat,[0,1.27,0],body,m=>m.scale.set(1.06,1,.64)); for(const sd of [-1,1]) sph(.098,coat,[sd*.275,1.47,0],body);
  const long=o.kind==='guy'; if(long){ const sk=grp([0,1.13,0],body); cyl(.235,.3,.52,coat,[0,-.26,0],sk,m=>m.scale.z=.66); u.skirt=sk; u.lap=sph(.1,coat,[0,.985,.19],body,m=>{ m.scale.set(2.8,1.2,2.35); m.visible=false; }); } else cyl(.235,.26,.2,coat,[0,1.0,0],body,m=>m.scale.z=.66); 
  box(.13,.15,.03,0xfbf8f0,[0,1.5,.125],body); for(const sd of [-1,1]) box(.075,.3,.02,cd,[sd*.075,1.39,.142],body,m=>m.rotation.z=sd*.3);
  if(o.kind==='guy'){ for(let i=0;i<4;i++) sph(.02,0x3b2616,[.035,1.24-i*.15,.165-(i>1?-.02*(i-1):0)],body); box(.3,.07,.26,0x8a3a2c,[0,1.57,0],body); box(.09,.2,.035,0x8a3a2c,[.06,1.46,.15],body,m=>m.rotation.z=-.2); }
  if(o.kind==='suit'){ box(.04,.26,.02,0xb8432f,[0,1.4,.15],body); sph(.022,0xd9372b,[-.13,1.42,.15],body); sph(.018,0x111111,[.02,1.2,.16],body); }
  if(o.kind==='waiter'){ box(.11,.045,.03,0x111111,[0,1.545,.145],body); box(.15,.34,.02,0xfbf8f0,[0,1.33,.14],body); for(let i=0;i<3;i++) sph(.012,0x111111,[0,1.42-i*.1,.153],body); }
  if(o.kind==='off'){ cyl(.238,.238,.06,0x33362b,[0,1.06,0],body,m=>m.scale.z=.67); box(.06,.07,.02,0xd9a441,[0,1.06,.165],body); for(let i=0;i<3;i++) sph(.018,0xd9a441,[0,1.4-i*.11,.155],body); for(const sd of [-1,1]) box(.12,.03,.1,0xb8432f,[sd*.25,1.565,0],body); box(.08,.022,.015,0xd9a441,[-.12,1.38,.15],body); box(.08,.022,.015,0xb8432f,[-.12,1.35,.15],body); box(.1,.1,.02,cd,[.12,1.36,.145],body); }
  for(const sd of [-1,1]){ const sh=grp([sd*.3,1.47,0],body); caps(.064,.2,coat,[0,-.15,0],sh); const el=grp([0,-.31,0],sh); caps(.057,.19,coat,[0,-.13,0],el); cyl(.062,.062,.035,o.kind==='off'?cd:0xfbf8f0,[0,-.255,0],el); const hd=sph(.068,skin,[0,-.33,0],el,m=>m.scale.set(.72,1.12,.95)); sph(.026,skin,[0,-.31,.055],el); u[sd<0?'shL':'shR']=sh; u[sd<0?'elL':'elR']=el; u[sd<0?'hdL':'hdR']=hd; }
  cyl(.068,.078,.14,skin,[0,1.6,0],body); const head=grp([0,1.64,0],body); u.head=head; sph(.215,skin,[0,.23,0],head,m=>m.scale.set(.97,1.1,1)); for(const sd of [-1,1]){ sph(.045,skin,[sd*.205,.215,-.01],head,m=>m.scale.set(.55,1,.8)); const e=sph(.024,MT(0x17120f,.3),[sd*.078,.25,.192],head); u[sd<0?'eyeL':'eyeR']=e; sph(.007,MT(0xffffff,.3),[sd*.078+.009,.259,.211],head,m=>m.castShadow=false); u[sd<0?'brL':'brR']=box(.075,.015,.015,hc,[sd*.08,.312,.198],head,m=>{ m.rotation.z=-sd*(o.brow||0); }); }
  sph(.03,MT(0xd9a67e,.65),[0,.2,.213],head,m=>m.scale.set(.85,1,1)); u.mouth=box(.062,.011,.012,0x7a3b30,[0,.128,.2],head);
  const hcap=(th,rx)=>mesh(new THREE.SphereGeometry(.223,36,24,0,Math.PI*2,0,th),MT(hc,.7),[0,.238,-.01],head,m=>{ m.rotation.x=rx; m.scale.set(1,1.1,1.02); });
  if(o.kind==='guy'){ hcap(1.34,-.5); const hm=MT(hc,.75); sph(.2,hm,[0,.345,-.035],head,m=>m.scale.set(1.08,.62,1.1)); sph(.1,hm,[-.05,.418,.09],head,m=>{ m.scale.set(1.5,.55,1.2); m.rotation.z=.2; m.rotation.x=.3; }); sph(.08,hm,[.1,.413,.085],head,m=>{ m.scale.set(1.2,.55,1.2); m.rotation.z=-.25; m.rotation.x=.3; }); for(const sd of [-1,1]) sph(.09,hm,[sd*.165,.33,-.03],head,m=>m.scale.set(.75,1.1,1.3));
    sph(.12,0x2f55a4,[0,.452,-.07],head,m=>{ m.scale.set(1,.42,1); m.rotation.x=-.3; });
    for(const sd of [-1,1]){ mesh(GEO('tor2',()=>new THREE.TorusGeometry(.054,.0075,10,32)),MT(0x17120f,.35),[sd*.078,.25,.208],head); box(.01,.01,.2,0x17120f,[sd*.168,.253,.11],head); } box(.05,.01,.01,0x17120f,[0,.253,.208],head); }
  else { hcap(1.3,-.5);
    if(o.kind==='off'){ cyl(.228,.222,.075,coat,[0,.405,0],head); cyl(.23,.23,.03,0xb8432f,[0,.385,0],head); cyl(.275,.228,.085,coat,[0,.485,0],head); cyl(.275,.275,.012,cd,[0,.53,0],head); cyl(.19,.19,.014,0x15160f,[0,.368,.13],head,m=>m.scale.set(1.05,1,.8)); sph(.026,0xd9a441,[0,.445,.228],head,m=>m.scale.set(1,1.2,.5)); }
    else { const fx=o.kind==='waiter'?1:-1; sph(.1,MT(hc,.7),[fx*.035,.405,.085],head,m=>{ m.scale.set(1.75,.5,1.25); m.rotation.z=-fx*.16; m.rotation.x=.25; }); sph(.07,MT(hc,.7),[-fx*.12,.385,.09],head,m=>m.scale.set(1.1,.5,1.2)); } }
  u.kind=o.kind; g.userData=u; g.visible=false; GS.add(g); return g; }
// pose: shoulder [fwd, out], elbow bend. No mouth flapping: a speaker only nods slightly.
function act(ch,t,p={}){ const u=ch.userData, ph=ch.id*1.7, br=Math.sin(t*1.9+ph); let wk=p.walk?Math.sin(t*TAU/PER/2+ph):0; const dn=p.dance, sit=(p.y||0)<0; let bob=0, aL=p.aL||[0,.07,.18], aR=p.aR||[0,.07,.18], hy=p.hy||0, hp=p.hp||0, sway=0, ry=p.ry;
  if(dn){ const b=(t-PH)/PER, k=Math.floor(b), f=b-k, hit=Math.exp(-5*f), s=Math.sin(b*Math.PI), odd=k%2; bob=.5+.5*Math.cos(b*Math.PI*2); sway=.1*Math.sin(b*Math.PI);
    if(dn===1){ aR=[odd?-1.2:-2.7,.2,odd?.3:1.3]; aL=[odd?-2.7:-1.2,.2,odd?1.3:.3]; hy=odd?.35:-.35; }
    else if(dn===2){ aR=[-1.05,.45,2.35]; aL=[.2*s,.1,.2]; hy=.25*s; hp=-.05; }
    else if(dn===3){ const up=odd?1:0; aR=[-2.9*up-.2,.3,.25]; aL=[-2.9*(1-up)-.2,.3,.25]; }
    else if(dn===4){ aR=[-1.3,-.5,1.95]; aL=[-1.3,-.5,1.95]; hy=.45*s; bob*=.5; }
    else if(dn===5){ aR=[-3.0,.45+.25*s,.1]; aL=[-3.0,.45-.25*s,.1]; }
    else if(dn===6){ aR=[-1.5+.9*hit,.1,.4+1.2*hit]; aL=[.1,.1,.2]; hp=.12*hit; } }
  const kb=dn?bob*.32:0; ch.position.y=(p.y||0)-(dn?(1-Math.cos(kb))*.9:0)+(p.walk?Math.abs(wk)*.025:0); ch.rotation.z=sway*.22; if(ry!==undefined) ch.rotation.y=ry;
  if(u.skirt){ u.skirt.scale.y=sit?.4:1; u.lap.visible=sit; }
  if(sit){ u.legL.rotation.x=u.legR.rotation.x=-1.5; u.knL.rotation.x=u.knR.rotation.x=1.5; }
  else { u.legL.rotation.x=wk*.5-kb+(dn?sway*.4:0); u.legR.rotation.x=-wk*.5-kb-(dn?sway*.4:0); u.knL.rotation.x=Math.max(0,-wk)*.7+kb*2; u.knR.rotation.x=Math.max(0,wk)*.7+kb*2; }
  u.body.scale.y=1+br*.005; u.body.rotation.x=p.lean||0;
  if(p.walk){ aL=[-wk*.45,.07,.3]; aR=[wk*.45,.07,.3]; if(p.aR) aR=p.aR; if(p.aL) aL=p.aL; }
  u.shL.rotation.set(aL[0],0,-aL[1]); u.elL.rotation.x=-aL[2]; u.shR.rotation.set(aR[0],0,aR[1]); u.elR.rotation.x=-aR[2];
  const nod=p.talk?Math.sin(t*6.5+ph)*.035+Math.sin(t*2.3)*.02:0; u.head.rotation.set(hp+nod+Math.sin(t*.8+ph)*.012,hy,(p.tilt||0)+sway*-.3+(p.talk?Math.sin(t*3.1+ph)*.02:0));
  const bl=p.blink??(((t*.29+ph*.37)%1)<.035); u.eyeL.scale.y=u.eyeR.scale.y=bl?.12:1; const sm_=p.smile||0; u.mouth.scale.set(1+sm_*.5,1+sm_*.6,1); u.mouth.position.y=.128+sm_*.006; }
const CH={}; function put(ch,x,z,ry=0,y=0){ ch.visible=true; ch.position.set(x,y,z); ch.rotation.set(0,ry,0); return ch; }
// ---------- sets / stage ----------
const SETS={}; let CURSET=null;
function stage(name){ for(const k in SETS) SETS[k].visible=(k===name); for(const k in CH){ if(Array.isArray(CH[k])) CH[k].forEach(c=>c.visible=false); else CH[k].visible=false; } for(const k in PROP) PROP[k].visible=false; CURSET=name; SPOT.intensity=0; if(SETS.rest&&SETS.rest.userData.mc) SETS.rest.userData.mc.visible=false; }
const PROP={};
function mood(m,o={}){ const M={nice:[0xfff1dc,2.2,[6,12,8],0xffffff,0x9aa7b8,.75,.95,0xbfd4ff,.45],cold:[0xdfe8ff,1.5,[-5,11,7],0xdfe6f2,0x556070,.6,.82,0x9fb4ff,.5],dark:[0xdfe8ff,.0,[4,10,6],0x445066,0x10141c,.22,.9,0x6f86c8,.12],gold:[0xffe2b0,2.6,[-7,10,7],0xfff4dc,0xb89a70,.8,1.0,0xffd9a0,.4],stage:[0xffffff,2.0,[3,10,8],0xffffff,0x555566,.5,.95,0xffffff,.3]}[m];
  KEY.color.set(m==='stage'&&o.key?o.key:M[0]); KEY.intensity=M[1]; KEY.position.set(...M[2]); if(o.at){ KEY.position.x+=o.at[0]; KEY.position.z+=o.at[2]; KEY.target.position.set(...o.at); } else KEY.target.position.set(0,0,0); const s=o.sh||9; Object.assign(KEY.shadow.camera,{left:-s,right:s,top:s,bottom:-s,near:.5,far:60}); KEY.shadow.camera.updateProjectionMatrix();
  HEMI.color.set(M[3]); HEMI.groundColor.set(M[4]); HEMI.intensity=M[5]; GR.toneMappingExposure=M[6]*(o.exp||1); FILL.color.set(M[7]); FILL.intensity=M[8]; FILL.position.set(-6,4,6); GS.fog.color.set(o.fog||0xffffff); GS.fog.near=o.fn||80; GS.fog.far=o.ff||300; }
function spot(x,y,z,tx,ty,tz,i=260,ang=.42,col=0xfff0cc){ SPOT.intensity=i; SPOT.angle=ang; SPOT.color.set(col); SPOT.position.set(x,y,z); SPOT.target.position.set(tx,ty,tz); }
const cam3=(x,y,z,tx=0,ty=0,tz=0,fov=35)=>{ GC.fov=fov; GC.updateProjectionMatrix(); GC.position.set(x,y,z); GC.up.set(0,1,0); GC.lookAt(tx,ty,tz); };
// eased camera move: a,b = [x,y,z,tx,ty,tz,fov]
function camMove(u,a,b,lin){ const e=lin?clamp(u):ease(clamp(u)), v=a.map((q,i)=>lerp(q,b[i],e)); cam3(v[0],v[1],v[2],v[3],v[4],v[5],v[6]||35); }
function g3draw(){ GR.render(GS,GC); X.drawImage(GLC,0,0,W,H); }
const proj=v=>{ const p=v.clone().project(GC); return [(p.x*.5+.5)*W,(-p.y*.5+.5)*H,p.z]; };
