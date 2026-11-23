// ===== "Where He Walks": engine — real 3D night world + cinematic 2D post, written from scratch =====
const W=1920,H=1080,TAU=Math.PI*2;
const cv=document.getElementById('c'), MAIN=cv.getContext('2d');
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)), lerp=(a,b,t)=>a+(b-a)*t, sm=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
const ease=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}, eo=x=>1-Math.pow(1-clamp(x),3), ei=x=>Math.pow(clamp(x),3), eio2=x=>{x=clamp(x);return x*x*(3-2*x)};
const hash=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
function rng(seed){ let s=(seed>>>0)||1; return ()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; }; }
const PER=.50736, PH=.1776; let BP=0, BI=0;           // beat period / phase of the song (118.26 BPM)
// ---------- renderer / scene ----------
const GW=window.GWOVR||1280, GH=Math.round(GW*9/16);
const GLC=document.createElement('canvas'); GLC.width=GW; GLC.height=GH;
const GR=new THREE.WebGLRenderer({canvas:GLC,antialias:window.AA!==0,preserveDrawingBuffer:true});
GR.setPixelRatio(1); GR.setSize(GW,GH,false); GR.toneMapping=THREE.ACESFilmicToneMapping; GR.toneMappingExposure=1; GR.shadowMap.enabled=true; GR.shadowMap.type=THREE.PCFSoftShadowMap; GR.setClearColor(0x05070d,1);
const GS=new THREE.Scene(), GC=new THREE.PerspectiveCamera(35,16/9,.1,700);
const HEMI=new THREE.HemisphereLight(0x5a6fa0,0x0c1018,.3);
const MOON=new THREE.DirectionalLight(0x7f9bd0,.4); MOON.position.set(-25,40,15);
const JL=new THREE.PointLight(0xffc880,0,60,1.5);          // the light that walks with Him
const RIM=new THREE.DirectionalLight(0xffb070,0); RIM.position.set(0,6,-30); const FILL=new THREE.DirectionalLight(0x5a78b8,.3); FILL.position.set(25,18,-10);   // dawn / back light
const LL1=new THREE.PointLight(0xffc27a,0,28,2), LL2=new THREE.PointLight(0xffc27a,0,28,2), AUX=new THREE.PointLight(0x6a8ac8,0,20,1.6); GS.add(HEMI,MOON,MOON.target,JL,RIM,RIM.target,FILL,LL1,LL2,AUX); GS.fog=new THREE.FogExp2(0x070a16,.02);
const MIRG=new THREE.Group(); MIRG.scale.y=-1; GS.add(MIRG);   // reflection copy of the world for wet ground / water
// ---------- helpers ----------
const MC={}; function M(c,o={}){ const k=c+JSON.stringify(o); if(MC[k]) return MC[k]; return MC[k]=M2(c,o); }
function M2(c,o={}){ const m=new THREE.MeshStandardMaterial({color:c,roughness:o.r??.8,metalness:o.m??0,emissive:o.e??0x000000,emissiveIntensity:o.ei??0,transparent:!!o.t,opacity:o.o??1,flatShading:!!o.f,side:o.side||THREE.FrontSide,vertexColors:!!o.vc}); if(o.map) m.map=o.map; if(o.em) m.emissiveMap=o.em; if(o.fog===false) m.fog=false; if(o.dw===false) m.depthWrite=false; return m; }
const _g={}; const GEO=(k,f)=>_g[k]||(_g[k]=f());
function mesh(geo,mat,p,par,cb){ const o=new THREE.Mesh(geo,mat); if(p) o.position.set(p[0],p[1],p[2]); if(cb) cb(o); if(par) par.add(o); return o; }
const box=(w,h,d,c,p,par,cb)=>mesh(GEO('b'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),typeof c==='number'?M(c):c,p,par,cb);
const cyl=(rt,rb,h,c,p,par,cb,seg=16)=>mesh(GEO('c'+rt+'_'+rb+'_'+h+'_'+seg,()=>new THREE.CylinderGeometry(rt,rb,h,seg)),typeof c==='number'?M(c):c,p,par,cb);
const sph=(r,c,p,par,cb,ws=20,hs=14)=>mesh(GEO('s'+r+'_'+ws,()=>new THREE.SphereGeometry(r,ws,hs)),typeof c==='number'?M(c):c,p,par,cb);
const caps=(r,l,c,p,par,cb,cs=4,rs=12)=>mesh(GEO('k'+r+'_'+l+'_'+rs,()=>new THREE.CapsuleGeometry(r,l,cs,rs)),typeof c==='number'?M(c):c,p,par,cb);
const grp=(p,par)=>{ const g=new THREE.Group(); if(p) g.position.set(p[0],p[1],p[2]); if(par) par.add(g); return g; };
const pln=(w,h,m,p,par,cb)=>{ const o=new THREE.Mesh(GEO('p'+w+'_'+h,()=>new THREE.PlaneGeometry(w,h)),m); if(p) o.position.set(p[0],p[1],p[2]); if(cb) cb(o); if(par) par.add(o); return o; };
function ctex(w,h,draw,rep){ const c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d'); draw(x,w,h); const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=4; if(rep){ t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(rep[0],rep[1]); } t.userData={c,x}; return t; }
// glow textures + sprites
const GT=ctex(256,256,(x)=>{ const g=x.createRadialGradient(128,128,0,128,128,128); g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(.1,'rgba(255,255,255,.6)'); g.addColorStop(.3,'rgba(255,255,255,.2)'); g.addColorStop(.65,'rgba(255,255,255,.04)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,256,256); });
const HALOM={}; function halo(col,size,p,par,op=1){ const k=col; const mat=new THREE.SpriteMaterial({map:GT,color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}); const s=new THREE.Sprite(mat); s.scale.set(size,size,1); if(p) s.position.set(p[0],p[1],p[2]); if(par) par.add(s); return s; }
function pool(col,size,p,par,op=1){ const m=new THREE.MeshBasicMaterial({map:GT,color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false,fog:true}); const o=new THREE.Mesh(GEO('pool',()=>new THREE.PlaneGeometry(1,1)),m); o.rotation.x=-Math.PI/2; o.scale.set(size,size,1); if(p) o.position.set(p[0],p[1]+.02,p[2]); if(par) par.add(o); return o; }
// ---------- camera ----------
// stereo: EYE = -1 (left) / +1 (right) / 0 (mono). separation b and convergence distance C come from a per-shot depth-probe table (STT)
let CURSHOT='', CURU=0;
function stereoAt(){ const T=window.STT&&STT[CURSHOT]; if(!T) return {b:.12,C:8}; const x=clamp(CURU)*(T.length-1), i=Math.min(T.length-2,Math.floor(x)), f=x-i; return {b:lerp(T[i][0],T[i+1][0],f),C:lerp(T[i][1],T[i+1][1],f)}; }
function cam(p,t,fov=35,roll=0){ GC.fov=fov; GC.updateProjectionMatrix(); GC.position.set(p[0],p[1],p[2]); GC.up.set(Math.sin(roll),Math.cos(roll),0); GC.lookAt(t[0],t[1],t[2]);
  if(window.EYE){ const S=stereoAt(), x=window.EYE*S.b/2; GC.translateX(x); GC.projectionMatrix.elements[8]=-GC.projectionMatrix.elements[0]*x/S.C; GC.projectionMatrixInverse.copy(GC.projectionMatrix).invert(); }
  GC.updateMatrixWorld(true); }
function camMove(u,a,b,mode){ const e=mode==='lin'?clamp(u):mode==='eo'?eo(u):ease(u); const v=a.map((q,i)=>lerp(q,b[i]??q,e)); cam([v[0],v[1],v[2]],[v[3],v[4],v[5]],v[6]||35,v[7]||0); }
// ---------- world registry ----------
const WORLDS={}; let CURW=null;
function world(name,build){ const r=grp(null,GS), m=grp(null,MIRG); const o={name,r,m,upd:null}; build(o); WORLDS[name]=o; r.visible=m.visible=false; return o; }
const HIDE=[]; const hide=(...a)=>a.forEach(o=>{ HIDE.push(o); o.visible=false; });
function stage(name){ HIDE.forEach(o=>o.visible=false); if(window.CROWD) for(const k in CROWD) CROWD[k].items.forEach(it=>{ it.a.visible=false; if(it.b) it.b.visible=false; }); for(const k in WORLDS){ const w=WORLDS[k], v=(k===name); w.r.visible=w.m.visible=v; if(w.x) w.x.forEach(o=>o.visible=v); } CURW=WORLDS[name]; for(const a of ACTORS) a.show(false); MIRG.visible=true; }
const ACTORS=[];
// ---------- rain ----------
const RAIN=(()=>{ const n=1700, pos=new Float32Array(n*6), col=new Float32Array(n*6), R=rng(7), seed=[]; for(let i=0;i<n;i++) seed.push([R(),R(),R(),.7+R()*.6]); const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(pos,3)); g.setAttribute('color',new THREE.BufferAttribute(col,3)); const m=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}); const o=new THREE.LineSegments(g,m); o.frustumCulled=false; GS.add(o); return {o,n,pos,col,seed,g}; })();
function rain(t,amt,cx,cz,lights,tone=[.5,.65,.95],wind=.12){        // amt 0..1; lights = [[x,y,z,r,col[3],gain]]
  const {n,pos,col,seed,g}=RAIN, X0=36, Y0=22, Z0=60; let c=0; const cnt=Math.floor(n*amt);
  for(let i=0;i<n;i++){ const s=seed[i], vis=i<cnt;
    const x=cx+(s[0]-.5)*X0*2, z=cz+(s[2]-.15)*Z0*1.0-Z0*.35, sp=22*s[3], y=((s[1]*Y0*2-t*sp)%(Y0)+Y0)%Y0, len=.55*s[3];
    const k=i*6; pos[k]=x; pos[k+1]=y; pos[k+2]=z; pos[k+3]=x+len*wind; pos[k+4]=y+len; pos[k+5]=z;
    let r=tone[0]*.07,gg=tone[1]*.09,b=tone[2]*.12; if(!vis){ r=gg=b=0; }
    else if(lights) for(const L of lights){ const dx=x-L[0],dy=y-L[1],dz=z-L[2], d2=dx*dx+dy*dy+dz*dz, f=Math.exp(-d2/(L[3]*L[3]))*L[5]; r+=L[4][0]*f; gg+=L[4][1]*f; b+=L[4][2]*f; }
    col[k]=col[k+3]=r; col[k+1]=col[k+4]=gg; col[k+2]=col[k+5]=b; }
  g.attributes.position.needsUpdate=true; g.attributes.color.needsUpdate=true; RAIN.o.visible=amt>0; }
// ---------- 2D post ----------
const mkc=(w,h)=>{ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; };
const BC1=mkc(960,540), BC2=mkc(240,135), RC=mkc(960,540), GRN=mkc(256,256), TX=mkc(W,H), SHC=mkc(W,H), SHX=SHC.getContext('2d');
(function(){ const s=document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('width','0'); s.setAttribute('height','0'); s.style.position='absolute'; s.innerHTML='<filter id="sharp" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feConvolveMatrix order="3" kernelMatrix="0 -.45 0 -.45 2.8 -.45 0 -.45 0" divisor="1" preserveAlpha="true"/></filter>'; document.body.appendChild(s); })();
const B1=BC1.getContext('2d'), B2=BC2.getContext('2d'), RX=RC.getContext('2d'), TXX=TX.getContext('2d');
(function(){ const x=GRN.getContext('2d'), d=x.createImageData(256,256), r=rng(99); for(let i=0;i<256*256;i++){ const v=r()*255; d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v; d.data[i*4+3]=255; } x.putImageData(d,0,0); })();
const VIG=(()=>{ const c=mkc(W,H), x=c.getContext('2d'), g=x.createRadialGradient(W/2,H/2,H*.38,W/2,H/2,Math.hypot(W,H)*.6); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,.72)'); x.fillStyle=g; x.fillRect(0,0,W,H); return c; })();
function screenPos(v){ const p=v.clone().project(GC); return [(p.x*.5+.5)*W,(-p.y*.5+.5)*H,p.z]; }
function present(o){      // o: {bloom, rays:[x,y,s], warm, flare:[x,y,s,col], grain, exp}
  const X=MAIN; X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.globalCompositeOperation='source-over'; X.filter='none'; X.imageSmoothingEnabled=true; X.imageSmoothingQuality='high';
  X.drawImage(GLC,0,0,W,H); dofApply(X);
  const bl=o.bloom??.5;
  B1.filter='brightness(1.1) contrast(1.35) saturate(1.2)'; B1.drawImage(cv,0,0,960,540); B1.filter='none';
  B2.drawImage(BC1,0,0,240,135);
  X.save(); X.globalCompositeOperation='screen'; X.globalAlpha=.22*bl; X.drawImage(BC1,0,0,W,H); X.globalAlpha=.34*bl; X.drawImage(BC2,0,0,W,H); X.restore();
  if(o.rays&&o.rays[2]>.01){ const [px,py,s]=o.rays; RX.filter='brightness(.75) contrast(2.4)'; RX.drawImage(cv,0,0,960,540); RX.filter='none';
    X.save(); X.globalCompositeOperation='lighter'; const n=18; for(let i=1;i<=n;i++){ const sc=1+i*.032; X.globalAlpha=s*.10*(1-i/(n+1)); X.drawImage(RC,0,0,960,540,px*(1-sc),py*(1-sc),W*sc,H*sc); } X.restore(); }
  if(o.flare&&o.flare[2]>.01){ const [px,py,s,col]=o.flare; X.save(); X.globalCompositeOperation='lighter'; X.translate(px,py); for(const [sx,sy,a,c2] of [[14,.5,.5,col||'255,196,120'],[4,.2,.9,'255,240,220']]){ X.save(); X.scale(sx,sy); const g=X.createRadialGradient(0,0,0,0,0,70); g.addColorStop(0,`rgba(${c2},${a*s})`); g.addColorStop(1,`rgba(${c2},0)`); X.fillStyle=g; X.beginPath(); X.arc(0,0,70,0,TAU); X.fill(); X.restore(); } X.restore(); }
  // colour grade: cool/teal shadows (sad) -> amber highlights (hope)
  const w=o.warm??0; X.save(); X.globalCompositeOperation='soft-light'; X.globalAlpha=.34; X.fillStyle=`rgb(${lerp(40,255,w)|0},${lerp(80,150,w)|0},${lerp(170,70,w)|0})`; X.fillRect(0,0,W,H); X.restore();
  X.save(); X.globalCompositeOperation='multiply'; X.globalAlpha=.55*(1-w*.6); X.fillStyle='rgb(150,172,235)'; X.fillRect(0,0,W,H); X.restore();
  X.save(); X.globalCompositeOperation='source-over'; X.globalAlpha=1; X.drawImage(VIG,0,0); X.restore();
  // film grain
  if((o.grain??.1)*(window.GRAINK??0)>0.002){ X.save(); X.globalCompositeOperation='overlay'; X.globalAlpha=(o.grain??.1)*(window.GRAINK??0); const gx=(hash(BI*3.1+TT*7)*256)|0, gy=(hash(BI*1.7+TT*3)*256)|0; for(let yy=-gy;yy<H;yy+=256) for(let xx=-gx;xx<W;xx+=256) X.drawImage(GRN,xx,yy); X.restore(); }
  if(window.SHARP!==0){ SHX.clearRect(0,0,W,H); SHX.drawImage(cv,0,0); X.save(); X.filter='url(#sharp)'; X.drawImage(SHC,0,0); X.restore(); }
}
let TT=0;
// ---------- captions ----------
function drawLyrics(t,mode){
  const X=MAIN; const lines=D.LY; let cur=-1; for(let i=0;i<lines.length;i++) if(t>=lines[i].a-.02) cur=i; if(cur<0) return; const l=lines[cur]; if(t>l.b+.5) return;
  const out=sm(l.b-.1,l.b+.45,t); const al=1-out; if(al<=.01) return;
  const size=mode==='big'?64:46; X.save(); X.textAlign='left'; X.textBaseline='middle'; X.font=`300 ${size}px "Inter Display","Inter",sans-serif`; X.letterSpacing=(size*.03)+'px';
  const ws=l.s.split(' '), sp=size*.3; let tot=0; const wd=ws.map(w=>X.measureText(w).width); wd.forEach(w=>tot+=w+sp); tot-=sp; let x=W/2-tot/2; const y=H-118;
  for(let i=0;i<ws.length;i++){ const tw=l.wt[i], a=sm(tw-.02,tw+.28,t); if(a>0){ const rise=(1-eo(clamp((t-tw)/.4)))*10, flash=Math.exp(-(t-tw)*3.2);
      X.globalAlpha=al*a; X.shadowColor='rgba(0,0,0,.85)'; X.shadowBlur=18; X.fillStyle=mode==='neon'?'#ffd9a0':'#f4ecdc'; X.fillText(ws[i],x,y+rise); X.shadowBlur=0;
      if(flash>.05){ X.globalAlpha=al*a*flash*.5; X.shadowColor='rgba(255,190,110,.9)'; X.shadowBlur=26; X.fillStyle='#fff3d6'; X.fillText(ws[i],x,y+rise); X.shadowBlur=0; } }
    x+=wd[i]+sp; }
  X.restore(); }
// ---------- timeline ----------
const SC={};   // shot functions: SC[name](lt,len,t,shot) -> post opts
function sceneAt(t){ let i=0; for(let k=0;k<D.TL.length;k++) if(D.TL[k].t0<=t) i=k; const c=D.TL[i], t1=i+1<D.TL.length?D.TL[i+1].t0:D.total; return {i,c,len:t1-c.t0,lt:t-c.t0}; }
const TC=mkc(W,H), TCX=TC.getContext('2d');
// ---- cast shadows: the moon / dawn key lights follow the action and shadow the figures, cars and buildings ----
let SHPREP=false;
function shadowPrep(){ SHPREP=true; GS.traverse(o=>{ if(!o.isMesh) return; let mir=false; for(let p=o;p;p=p.parent) if(p===MIRG){ mir=true; break; } const m=o.material;
    if(mir||!m||o.isSprite||m.blending===THREE.AdditiveBlending||!m.isMeshStandardMaterial||o.renderOrder<=-10||o.userData.noShadow){ o.castShadow=false; o.receiveShadow=false; return; }
    o.castShadow=!m.transparent; o.receiveShadow=true; }); }
function shadowFollow(){ if(!SHPREP) shadowPrep(); if(window.SHADOWS===0){ MOON.castShadow=RIM.castShadow=false; return; }
  const tgt=(typeof JES!=='undefined'&&JES.r.root.visible)?JES.r.root.position.clone():GC.position.clone().add(new THREE.Vector3(0,0,-1).applyQuaternion(GC.quaternion).multiplyScalar(14)).setY(0);
  for(const [L,off,ext] of [[MOON,new THREE.Vector3(-18,34,22),22],[RIM,new THREE.Vector3(2,9,-34),26]]){ const on=L.intensity>.08; L.castShadow=on; if(!on) continue;
    L.target.position.copy(tgt); L.position.copy(tgt).add(off); L.target.updateMatrixWorld(); const sc=L.shadow.camera; if(sc.right!==ext){ sc.left=-ext; sc.right=ext; sc.top=ext; sc.bottom=-ext; sc.near=1; sc.far=90; sc.updateProjectionMatrix(); L.shadow.mapSize.set(2048,2048); L.shadow.bias=-.0004; L.shadow.normalBias=.04; if(L.shadow.map){ L.shadow.map.dispose(); L.shadow.map=null; } } } }
// ---- depth of field: a depth pass drives two masked blur layers (soft foreground, gentle background) ----
let DOFRT=null, DOFHIDE=null; const DOFM=mkc(480,270), DOFMX=DOFM.getContext('2d'), DOFA=mkc(W,H), DOFAX=DOFA.getContext('2d'), DOFB=mkc(W,H), DOFBX=DOFB.getContext('2d'); let DOFON=0;
function dofPass(str){ DOFON=0; if(!(str>.01)||window.DOF===0) return; const w=480,h=270; if(!DOFRT) DOFRT=new THREE.WebGLRenderTarget(w,h,{type:THREE.FloatType,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter});
  if(!DOFHIDE){ DOFHIDE=[]; GS.traverse(o=>{ if(o.isSprite||o.isPoints||o.isLine) DOFHIDE.push(o); }); }
  const was=DOFHIDE.map(o=>o.visible); DOFHIDE.forEach(o=>o.visible=false);
  const cc=new THREE.Color(); GR.getClearColor(cc); const ca=GR.getClearAlpha(), tm=GR.toneMapping; GR.toneMapping=THREE.NoToneMapping; GR.setClearColor(0,0);
  GS.overrideMaterial=DOFMAT||(DOFMAT=new THREE.MeshDepthMaterial()); GR.setRenderTarget(DOFRT); GR.clear(); GR.render(GS,GC); GR.setRenderTarget(null); GS.overrideMaterial=null; GR.setClearColor(cc,ca); GR.toneMapping=tm; DOFHIDE.forEach((o,i)=>o.visible=was[i]);
  const buf=new Float32Array(w*h*4); GR.readRenderTargetPixels(DOFRT,0,0,w,h,buf); const n=GC.near,f=GC.far;
  // focus: on Jesus when he is on screen, otherwise the middle of the picture
  let foc=0; if(typeof JES!=='undefined'&&JES.r.root.visible){ const p=JES.r.root.position.clone(); p.y+=1.2; foc=p.distanceTo(GC.position); const v=p.clone().project(GC); if(Math.abs(v.x)>1.1||Math.abs(v.y)>1.1) foc=0; }
  const D=new Float32Array(w*h); for(let i=0;i<w*h;i++){ const k=i*4; let d=700; if(buf[k+3]>.5){ const zn=2*(1-buf[k])-1; d=2*n*f/((f+n)-zn*(f-n)); } D[((h-1-Math.floor(i/w))*w)+(i%w)]=d; }
  if(!foc){ const c=[]; for(let y=Math.floor(h*.3);y<h*.7;y+=3) for(let x=Math.floor(w*.35);x<w*.65;x+=3) c.push(D[y*w+x]); c.sort((a,b)=>a-b); foc=c[Math.floor(c.length*.4)]||10; }
  foc=Math.max(1,Math.min(foc,60)); str*=clamp(14/foc,.2,1); const im=DOFMX.createImageData(w,h), px=im.data; let any=0;
  for(let i=0;i<w*h;i++){ const d=D[i], r=Math.log(d/foc); let c; if(r<0) c=Math.min(.8,clamp((-r-.14)*1.1)); else c=Math.min(.12,clamp((r-.3)*.4)); c*=str; px[i*4]=px[i*4+1]=px[i*4+2]=0; px[i*4+3]=Math.round(c*255); if(c>.05) any=1; }
  if(!any) return; DOFMX.putImageData(im,0,0); DOFON=1; }
let DOFMAT=null;
function dofApply(X){ if(!DOFON) return; // soft layer
  DOFAX.clearRect(0,0,W,H); DOFAX.filter='blur(2.2px)'; DOFAX.drawImage(cv,0,0); DOFAX.filter='none'; DOFAX.globalCompositeOperation='destination-in'; DOFAX.drawImage(DOFM,0,0,W,H); DOFAX.globalCompositeOperation='source-over';
  // strong layer only where the mask is high (foreground)
  DOFBX.clearRect(0,0,W,H); DOFBX.filter='blur(7px)'; DOFBX.drawImage(cv,0,0); DOFBX.filter='none'; DOFBX.globalCompositeOperation='destination-in'; DOFBX.drawImage(DOFM,0,0,W,H); DOFBX.drawImage(DOFM,0,0,W,H); DOFBX.globalCompositeOperation='source-over';
  X.save(); X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.drawImage(DOFA,0,0); X.drawImage(DOFB,0,0); X.restore(); }
let EXB=1; const expAt=(s,u)=>{ const e=window.EXPT&&EXPT[s]; if(!e||!e.length) return 1; if(u<=e[0][0]) return e[0][1]; for(let i=0;i<e.length-1;i++) if(u<=e[i+1][0]) return lerp(e[i][1],e[i+1][1],(u-e[i][0])/(e[i+1][0]-e[i][0])); return e[e.length-1][1]; };
function frame3(c,lt,len,t){ TT=t; CURSHOT=c.s; CURU=lt/len; GR.toneMappingExposure=EXB; const o=SC[c.s](lt,len,t,c)||{}; shadowFollow(); EXB=GR.toneMappingExposure; const ex=expAt(c.s,lt/len); GR.toneMappingExposure=EXB*ex; if(ex>1) JL.intensity*=Math.pow(ex,-.75); if(typeof JES!=='undefined') dimJes(ex>1?Math.max(.2,Math.pow(ex,-.8)):1); GR.render(GS,GC); dofPass((o.dof??.9)*(window.DOFK??1)); return o; }
window.__meter=()=>{ const c=mkc(96,54), x=c.getContext('2d'); x.drawImage(cv,0,0,96,54); const d=x.getImageData(0,0,96,54).data, L=[]; let s=0; for(let i=0;i<d.length;i+=4){ const y=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2]; L.push(y); s+=y; } L.sort((p,q)=>p-q); const n=L.length; return [s/n,L[Math.floor(n*.98)],L[Math.floor(n*.1)]]; };
window.renderAt=function(t){
  const fr=(((t-PH)%PER)+PER)%PER; BP=Math.exp(-6*fr); BI=Math.floor((t-PH)/PER); TT=t;
  const q=sceneAt(t), c=q.c; let po;
  const td=c.td||0; const inTr=q.i>0&&c.tr==='dis'&&q.lt<td;
  if(inTr){ const pv=D.TL[q.i-1]; const po2=frame3(pv,t-pv.t0,c.t0-pv.t0,t); present(po2); TCX.drawImage(cv,0,0); po=frame3(c,q.lt,q.len,t); present(po); const a=ease(q.lt/td); MAIN.save(); MAIN.globalAlpha=1-a; MAIN.drawImage(TC,0,0); MAIN.restore(); }
  else { po=frame3(c,q.lt,q.len,t); present(po); }
  const X=MAIN; X.setTransform(1,0,0,1,0,0);
  if(po.hud!==false) { drawLyrics(t,po.lyr||(window.LYR?LYR(t):"soft")); }
  if(po.ov) po.ov(MAIN,t);
  // transitions: light-bloom / dip to black
  if(c.tr==='flash'&&q.lt<(td||.5)){ const a=1-ease(q.lt/(td||.5)); const g=X.createRadialGradient(W/2,H*.55,0,W/2,H*.55,Math.hypot(W,H)*(.25+.9*a)); g.addColorStop(0,`rgba(255,244,214,${a})`); g.addColorStop(1,`rgba(255,200,130,${a*.9})`); X.fillStyle=g; X.fillRect(0,0,W,H); }
  if(c.tr==='black'&&q.lt<(td||.6)){ X.fillStyle=`rgba(0,0,0,${1-ease(q.lt/(td||.6))})`; X.fillRect(0,0,W,H); }
  const nx=D.TL[q.i+1]; if(nx&&(nx.tr==='out'||nx.tr==='flash')){ const tl=nx.t0-t; const d=Math.min(.4,(nx.td||.8)*.6); if(tl<d){ const a=1-tl/d; const g=X.createRadialGradient(W/2,H*.5,0,W/2,H*.5,Math.hypot(W,H)*(.15+1.0*a)); g.addColorStop(0,`rgba(255,246,222,${Math.min(1,a*1.4)})`); g.addColorStop(1,`rgba(255,214,150,${a})`); X.fillStyle=g; X.fillRect(0,0,W,H); } }
  if(nx&&nx.tr==='fade'){ const tl=nx.t0-t, d=nx.td||.8; if(tl<d){ X.fillStyle=`rgba(0,0,0,${1-tl/d})`; X.fillRect(0,0,W,H); } }
  if(t<.8){ X.fillStyle=`rgba(0,0,0,${1-t/.8})`; X.fillRect(0,0,W,H); }
  if(t>D.total-1.2){ X.fillStyle=`rgba(0,0,0,${clamp((t-(D.total-1.2))/1.1)})`; X.fillRect(0,0,W,H); }
};
window.LYR=t=>(t>184.5&&t<238.5)?'neon':'soft';

let DRT=null;
window.__depth=()=>{ const w=128,h=72; if(!DRT) DRT=new THREE.WebGLRenderTarget(w,h,{type:THREE.FloatType,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter});
  const hid=[]; GS.traverse(o=>{ if((o.isSprite||o.isPoints||o.isLine)&&o.visible){ o.visible=false; hid.push(o); } });
  const cc=new THREE.Color(); GR.getClearColor(cc); const ca=GR.getClearAlpha(); const tm=GR.toneMapping; GR.toneMapping=THREE.NoToneMapping; GR.setClearColor(0x000000,0);
  GS.overrideMaterial=new THREE.MeshDepthMaterial(); GR.setRenderTarget(DRT); GR.clear(); GR.render(GS,GC); GR.setRenderTarget(null); GS.overrideMaterial=null; GR.setClearColor(cc,ca); GR.toneMapping=tm; hid.forEach(o=>o.visible=true);
  const buf=new Float32Array(w*h*4); GR.readRenderTargetPixels(DRT,0,0,w,h,buf); const n=GC.near,f=GC.far, D=[];
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){ const v=buf[((h-1-y)*w+x)*4]; let d=700; if(buf[((h-1-y)*w+x)*4+3]>0.5){ const fz=1-v, zn=2*fz-1; d=2*n*f/((f+n)-zn*(f-n)); } D.push([x,y,d]); }
  const body=D.filter(q=>q[1]<h*.92).map(q=>q[2]).sort((p,q)=>p-q), ctr=D.filter(q=>q[0]>w*.35&&q[0]<w*.65&&q[1]>h*.25&&q[1]<h*.7).map(q=>q[2]).sort((p,q)=>p-q);
  return {near:body[Math.floor(body.length*.04)],med:ctr[Math.floor(ctr.length*.5)],m0:GC.projectionMatrix.elements[0]}; };
