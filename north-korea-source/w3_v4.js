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
const SKIN=0xe8bf9a;
function mkChar(o){ const g=new THREE.Group(), u={o}, coat=o.coat, legc=o.leg||0x2b2a2e, skin=MT(SKIN,.7);
  for(const sd of [-1,1]){ const hip=grp([sd*.13,.8,0],g); caps(.095,.5,legc,[0,-.36,0],hip); sph(.11,0x1b1a1a,[0,-.74,.07],hip,m=>m.scale.set(1,.6,1.7)); u[sd<0?'legL':'legR']=hip; }
  const body=grp([0,0,0],g); u.body=body; caps(.26,.42,coat,[0,1.14,0],body,m=>m.scale.set(1,1,.74));
  if(o.kind==='guy'){ cyl(.27,.33,.42,coat,[0,.84,0],body,m=>m.scale.z=.76); for(let i=0;i<3;i++) sph(.028,0x3b2616,[.05,1.3-i*.16,.2],body); box(.16,.1,.04,0xfbf8f0,[0,1.5,.14],body); box(.36,.1,.3,0x8a3a2c,[0,1.52,0],body); }
  if(o.kind==='suit'){ cyl(.265,.29,.2,coat,[0,.86,0],body,m=>m.scale.z=.76); box(.14,.22,.03,0xfbf8f0,[0,1.4,.185],body); box(.05,.3,.03,0xb8432f,[0,1.32,.2],body); sph(.03,0xd9372b,[-.14,1.38,.19],body); }
  if(o.kind==='waiter'){ cyl(.265,.28,.16,coat,[0,.86,0],body,m=>m.scale.z=.76); box(.2,.42,.03,0xfbf8f0,[0,1.26,.185],body); box(.14,.06,.04,0x111111,[0,1.5,.2],body); }
  if(o.kind==='off'){ cyl(.27,.31,.3,coat,[0,.86,0],body,m=>m.scale.z=.76); cyl(.275,.275,.07,0x33362b,[0,.98,0],body,m=>m.scale.z=.76); box(.07,.08,.03,0xd9a441,[0,.98,.215],body); for(let i=0;i<3;i++) sph(.024,0xd9a441,[0,1.4-i*.13,.2],body); for(const sd of [-1,1]) box(.14,.035,.12,0xb8432f,[sd*.25,1.47,0],body); box(.09,.03,.02,0xd9a441,[-.13,1.34,.19],body); box(.09,.03,.02,0xb8432f,[-.13,1.3,.19],body); }
  for(const sd of [-1,1]){ const sh=grp([sd*.31,1.42,0],body); caps(.075,.2,coat,[0,-.16,0],sh); const el=grp([0,-.33,0],sh); caps(.068,.2,coat,[0,-.14,0],el); const hd=sph(.085,skin,[0,-.32,0],el); u[sd<0?'shL':'shR']=sh; u[sd<0?'elL':'elR']=el; u[sd<0?'hdL':'hdR']=hd; }
  cyl(.085,.09,.14,skin,[0,1.56,0],body); const head=grp([0,1.6,0],body); u.head=head; sph(.27,skin,[0,.27,0],head,m=>m.scale.set(1,1.06,.96)); for(const sd of [-1,1]){ sph(.055,skin,[sd*.265,.26,0],head); const e=sph(.034,0x1a1614,[sd*.1,.3,.235],head); u[sd<0?'eyeL':'eyeR']=e; sph(.011,0xffffff,[sd*.1+.012,.312,.262],head); box(.1,.022,.02,o.hair,[sd*.1,.39,.24],head,m=>{ m.rotation.z=-sd*(o.brow||0); }); sph(.05,0xe39a86,[sd*.17,.2,.2],head,m=>{ m.scale.set(1,.6,.35); m.material=MT(0xe7a892,.9); }); }
  sph(.042,0xdcae88,[0,.23,.265],head); u.mouth=sph(.05,0x4a211c,[0,.13,.24],head,m=>m.scale.set(1,.16,.4));
  const hc=o.hair;
  if(o.kind==='guy'){ for(let i=0;i<22;i++){ const a=i/22*Math.PI*2, r=.2; sph(.085,hc,[Math.cos(a)*r*(1+.1*Math.sin(i*5)),.44+.03*Math.sin(i*3),Math.sin(a)*r*.95-.03],head); } for(let i=0;i<9;i++){ const a=Math.PI*(.15+i*.0875); sph(.08,hc,[Math.cos(a)*.24,.34+.04*Math.sin(i*2),-Math.sin(a)*.22-.02],head); } sph(.17,0x2f55a4,[0,.47,-.02],head,m=>m.scale.set(1,.42,1)); cyl(.168,.168,.02,0xe9edf5,[0,.475,-.02],head);
    for(const sd of [-1,1]){ mesh(GEO('tor',()=>new THREE.TorusGeometry(.072,.011,10,32)),MT(0x1a1614,.4),[sd*.1,.3,.262],head); } box(.06,.014,.014,0x1a1614,[0,.3,.262],head); for(const sd of [-1,1]) box(.014,.014,.24,0x1a1614,[sd*.2,.3,.15],head); }
  else { mesh(GEO('haircap',()=>new THREE.SphereGeometry(.29,28,20,0,Math.PI*2,0,1.72)),MT(hc),[0,.285,-.012],head,m=>{ m.rotation.x=-.5; m.scale.set(1,1.04,1); }); if(o.kind==='off'){ cyl(.3,.27,.13,coat,[0,.52,0],head); cyl(.31,.3,.035,0xb8432f,[0,.46,0],head); cyl(.3,.3,.02,0x1c1d18,[0,.445,.13],head,m=>m.scale.set(1,1,.75)); sph(.035,0xd9a441,[0,.52,.28],head); } else { sph(.1,hc,[o.kind==='waiter'?.1:-.1,.5,.14],head,m=>m.scale.set(1.6,.55,1)); } }
  u.kind=o.kind; g.userData=u; g.visible=false; GS.add(g); return g; }
// pose: all angles in radians. shoulder [fwd, out], elbow bend
function act(ch,t,p={}){ const u=ch.userData, ph=ch.id*1.7, br=Math.sin(t*1.9+ph); let wk=p.walk?Math.sin(t*TAU/PER/2+ph):0; const dn=p.dance; let bob=0, aL=p.aL||[0,.08,.15], aR=p.aR||[0,.08,.15], hy=p.hy||0, hp=p.hp||0, sway=0, ry=p.ry;
  if(dn){ const b=(t-PH)/PER, k=Math.floor(b), f=b-k, hit=Math.exp(-5*f), s=Math.sin(b*Math.PI), odd=k%2; bob=-.07*Math.abs(Math.sin(b*Math.PI)); sway=.1*Math.sin(b*Math.PI);
    if(dn===1){ aR=[-2.6+2.5*hit*0+ (odd?-1.2:-2.7)*1+0, .2, odd?.3:1.3]; aL=[odd?-2.7:-1.2,.2,odd?1.3:.3]; hy=odd?.35:-.35; }
    else if(dn===2){ aR=[-1.1,.5,2.3]; aL=[.2*s,.12,.2]; hy=.25*s; hp=-.05; }
    else if(dn===3){ const up=odd?1:0; aR=[-2.9*up-.2,.35,.25]; aL=[-2.9*(1-up)-.2,.35,.25]; hy=0; }
    else if(dn===4){ aR=[-1.35,-.55,1.9]; aL=[-1.35,-.55,1.9]; hy=.5*s; bob*=.5; }
    else if(dn===5){ aR=[-3.0,.5+.25*s,.1]; aL=[-3.0,.5-.25*s,.1]; }
    else if(dn===6){ aR=[-1.5+.9*hit,.1,.4+1.2*hit]; aL=[.1,.1,.2]; hp=.12*hit; } }
  ch.position.y=(p.y||0)+bob+(p.walk?Math.abs(wk)*.03:0); ch.rotation.z=sway*.25; if(ry!==undefined) ch.rotation.y=ry;
  u.legL.rotation.x=wk*.55+(dn?sway*.5:0); u.legR.rotation.x=-wk*.55-(dn?sway*.5:0); u.body.scale.y=1+br*.006; u.body.rotation.x=p.lean||0;
  if(p.walk){ aL=[-wk*.5,.08,.25]; aR=[wk*.5,.08,.25]; if(p.aR) aR=p.aR; if(p.aL) aL=p.aL; }
  u.shL.rotation.set(aL[0],0,-aL[1]); u.elL.rotation.x=-aL[2]; u.shR.rotation.set(aR[0],0,aR[1]); u.elR.rotation.x=-aR[2];
  u.head.rotation.set(hp+Math.sin(t*.8+ph)*.015,hy,(p.tilt||0)+sway*-.3);
  const bl=p.blink??(((t*.29+ph*.37)%1)<.035); u.eyeL.scale.y=u.eyeR.scale.y=bl?.12:1; const tk=p.talk?(.5+.5*Math.sin(t*16+ph))*(.6+.4*Math.sin(t*5.3)):0; u.mouth.scale.set(1-.25*tk+(p.smile||0)*.5,.16+tk*.75,.4); }
const CH={}; function put(ch,x,z,ry=0,y=0){ ch.visible=true; ch.position.set(x,y,z); ch.rotation.set(0,ry,0); return ch; }
// ---------- sets / stage ----------
const SETS={}; let CURSET=null;
function stage(name){ for(const k in SETS) SETS[k].visible=(k===name); for(const k in CH){ if(Array.isArray(CH[k])) CH[k].forEach(c=>c.visible=false); else CH[k].visible=false; } for(const k in PROP) PROP[k].visible=false; CURSET=name; SPOT.intensity=0; }
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
