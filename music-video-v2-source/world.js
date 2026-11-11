// ===== 3D cathedral world (three.js) + compositor =====
const glc=document.getElementById('gl'), out=document.getElementById('out'), O=out.getContext('2d',{willReadFrequently:true});
const B1=document.createElement('canvas'); B1.width=240; B1.height=135; const B1x=B1.getContext('2d'); const B2=document.createElement('canvas'); B2.width=60; B2.height=34; const B2x=B2.getContext('2d');
const R=new THREE.WebGLRenderer({canvas:glc,antialias:true,preserveDrawingBuffer:true}); R.setSize(W,H,false); R.setClearColor(0x030308);
const SCN=new THREE.Scene(); SCN.fog=new THREE.Fog(0x030308,18,60); const CAM=new THREE.PerspectiveCamera(46,W/H,.1,200);
const artTex=new THREE.CanvasTexture(cv); artTex.colorSpace=THREE.SRGBColorSpace; artTex.anisotropy=8;
const WY=5.3, win=new THREE.Mesh(new THREE.PlaneGeometry(16,9),new THREE.MeshBasicMaterial({map:artTex,toneMapped:false})); win.position.set(0,WY,0); SCN.add(win);
const refl=new THREE.Mesh(new THREE.PlaneGeometry(16,9),new THREE.MeshBasicMaterial({map:artTex,toneMapped:false,transparent:true,opacity:.42})); refl.scale.y=-1; refl.position.set(0,-WY+1.5,0); SCN.add(refl);
const stone=new THREE.MeshStandardMaterial({color:0x4a4658,roughness:.85}), dark=new THREE.MeshStandardMaterial({color:0x1a1822,roughness:.9});
function box(w,h,d,x,y,z,m=stone){ const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m); b.position.set(x,y,z); SCN.add(b); return b; }
box(17.4,.7,.9,0,WY+4.85,.1); box(17.4,.7,.9,0,WY-4.85,.1); box(.7,10.4,.9,-8.35,WY,.1); box(.7,10.4,.9,8.35,WY,.1);
box(60,30,.4,-38.7,12,-.2,dark); box(60,30,.4,38.7,12,-.2,dark); box(18,20,.4,0,WY+15.2,-.2,dark);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(70,90),new THREE.MeshStandardMaterial({color:0x0a0910,roughness:.35,metalness:.3,transparent:true,opacity:.8})); floor.rotation.x=-Math.PI/2; floor.position.set(0,.75,30); SCN.add(floor);
for(let i=0;i<6;i++) for(const sd of [-1,1]){ const z=3+i*6; const c=new THREE.Mesh(new THREE.CylinderGeometry(.6,.72,13,18),stone); c.position.set(sd*11,7.2,z); SCN.add(c); box(1.9,.5,1.9,sd*11,13.9,z); box(2,.6,2,sd*11,1,z); if(sd>0){ const a=new THREE.Mesh(new THREE.TorusGeometry(11,.35,8,40,Math.PI),stone); a.position.set(0,14,z); SCN.add(a); }
  const sw=new THREE.Mesh(new THREE.PlaneGeometry(2.4,6),new THREE.MeshBasicMaterial({color:[0xc8323a,0x2f5fc8,0xf0b838,0x3a9a5a,0x7a3aa8,0xe87a2a][i],transparent:true,opacity:.5})); sw.position.set(sd*17,7,z+3); sw.rotation.y=-sd*Math.PI/2; SCN.add(sw); }
SCN.add(new THREE.AmbientLight(0x8080a0,.35)); const PL=new THREE.PointLight(0xffe0a0,300,70,1.6); PL.position.set(0,WY,3); SCN.add(PL); const PL2=new THREE.PointLight(0x8090ff,60,60,1.6); PL2.position.set(0,12,24); SCN.add(PL2);
// god rays
const rc=document.createElement('canvas'); rc.width=64; rc.height=256; { const g=rc.getContext('2d'), gr=g.createLinearGradient(0,0,0,256); gr.addColorStop(0,'rgba(255,255,255,.9)'); gr.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=gr; g.fillRect(0,0,64,256); const g2=g.createLinearGradient(0,0,64,0); g2.addColorStop(0,'rgba(0,0,0,1)'); g2.addColorStop(.5,'rgba(0,0,0,0)'); g2.addColorStop(1,'rgba(0,0,0,1)'); g.globalCompositeOperation='destination-out'; g.fillStyle=g2; g.fillRect(0,0,64,256); }
const rayTex=new THREE.CanvasTexture(rc), RAYS=[]; for(let i=0;i<9;i++){ const m=new THREE.Mesh(new THREE.PlaneGeometry(1.6+hash(i)*1.6,20),new THREE.MeshBasicMaterial({map:rayTex,transparent:true,opacity:.1,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})); m.position.set(-7+i*1.75,WY-1.2,6.8); m.rotation.x=-1.22; SCN.add(m); RAYS.push(m); }
// dust
const DN=1600, dg=new THREE.BufferGeometry(), dp=new Float32Array(DN*3), d0=[]; for(let i=0;i<DN;i++) d0.push([(hash(i*1.1)-.5)*26,hash(i*2.3)*13,hash(i*3.7)*30,hash(i*5.1)]); dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
const dust=new THREE.Points(dg,new THREE.PointsMaterial({color:0xffe6b0,size:.07,transparent:true,opacity:.75,blending:THREE.AdditiveBlending,depthWrite:false})); SCN.add(dust);
// globe
const ec=document.createElement('canvas'); ec.width=1024; ec.height=512; { const g=ec.getContext('2d'), im=g.createImageData(1024,512); for(let y=0;y<512;y++) for(let x=0;x<1024;x++){ const u=x/1024*TAU, v=y/512*Math.PI; const n=Math.sin(u*2+1)*Math.cos(v*3)+.6*Math.sin(u*5+v*4)+.4*Math.sin(u*9-v*7+2)+.3*Math.sin(u*17+v*13); const land=n>.35&&v>.25&&v<2.9, i=(y*1024+x)*4, ice=v<.2||v>2.95; const c=ice?[230,240,250]:land?[60+n*40,140+n*30,70]:[20,60+v*10,140+n*14]; im.data[i]=c[0]; im.data[i+1]=c[1]; im.data[i+2]=c[2]; im.data[i+3]=255; } g.putImageData(im,0,0); }
const GLB=new THREE.Group(); GLB.position.set(0,WY,3.4); SCN.add(GLB); const et=new THREE.CanvasTexture(ec); et.colorSpace=THREE.SRGBColorSpace; const earth=new THREE.Mesh(new THREE.SphereGeometry(2.8,64,40),new THREE.MeshStandardMaterial({map:et,roughness:.7,emissive:0x0a1a40,emissiveIntensity:.6})); GLB.add(earth);
const atm=new THREE.Mesh(new THREE.SphereGeometry(3.05,48,32),new THREE.MeshBasicMaterial({color:0x6aa8ff,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,side:THREE.BackSide,depthWrite:false})); GLB.add(atm);
const LN=1400, lp=[], Jv=new THREE.Vector3(1,.45,.2).normalize(); for(let i=0;i<LN;i++){ const u=hash(i*7.7)*2-1, th=hash(i*9.9)*TAU, r=Math.sqrt(1-u*u); const v=new THREE.Vector3(r*Math.cos(th),u*.85,r*Math.sin(th)).normalize(); lp.push([v.angleTo(Jv),v]); } lp.sort((a,b)=>a[0]-b[0]);
const lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(lp.flatMap(([_,v])=>[v.x*2.84,v.y*2.84,v.z*2.84])),3)); const lights=new THREE.Points(lg,new THREE.PointsMaterial({color:0xffe08a,size:.11,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); GLB.add(lights);
const gl2=new THREE.DirectionalLight(0xffffff,2.2); gl2.position.set(4,6,10); SCN.add(gl2);
// 3D cross
const goldM=new THREE.MeshStandardMaterial({color:0xffc44a,metalness:.85,roughness:.28,emissive:0x6a3a00,emissiveIntensity:.9}); const CRS=new THREE.Group(); CRS.add(new THREE.Mesh(new THREE.BoxGeometry(.5,4.4,.5),goldM)); const cb=new THREE.Mesh(new THREE.BoxGeometry(2.7,.5,.5),goldM); cb.position.y=.8; CRS.add(cb); CRS.position.set(0,WY,3.2); SCN.add(CRS);
const GLOBE_S={globe1:[0,.38],globe2:[.45,1],nations:[1,1]}, CROSS_S={title:1,rose:1,end:1};
function camPose(i,a,name,t){ const e=ease(a), L=(x,y)=>lerp(x,y,e);
  if(name==='title') return [[Math.sin(a*2)*1.2,L(2.6,4.8),L(40,12.6)],[0,WY,0]];
  if(name==='end') return [[0,L(5,7.5),L(11.5,27)],[0,WY+.6,0]];
  if(GLOBE_S[name]) return [[Math.sin(a*1.5-.75)*6.5,5.8,11.8],[0,WY,1.5]];
  if(name==='rose') return [[Math.sin(a*TAU)*3,5.3+Math.cos(a*TAU)*1.2,L(12.5,9.6)],[0,WY,0]];
  switch(i%5){ case 0: return [[0,4.9,L(13.6,11.3)],[0,WY,0]]; case 1: return [[L(-5.4,-2.2),3.9,11.9],[.4,WY,0]]; case 2: return [[L(4.8,1.8),L(6.9,5.5),11.9],[-.3,WY,0]]; case 3: return [[L(-.8,.8),L(2.3,3.7),12.4],[0,WY+.5,0]]; default: return [[L(-1.8,1.8),5.3,L(10.9,10.3)],[0,WY,0]]; } }
function sceneAt(t){ let i=0; for(let k=0;k<D.TL.length;k++) if(D.TL[k].t0<=t) i=k; const c=D.TL[i], t1=i+1<D.TL.length?D.TL[i+1].t0:D.total; return {i,c,len:t1-c.t0,lt:t-c.t0,a:clamp((t-c.t0)/(t1-c.t0))}; }
function drawArt(t,q){ X=ART; X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; const sc=S[q.c.s]; if(sc.pre) sc.pre(q.a); const TD=Math.min(.7,q.len*.4), p=q.lt/TD;
  if(q.i>0&&p<1){ const pv=D.TL[q.i-1], ps=S[pv.s]; if(ps.pre&&ps!==sc) ps.pre(1); const ox=hash(q.i*3.3)*W, oy=hash(q.i*5.5)*H; drawBg(ps.bg,sc.bg,p,ox,oy,t); PA=Math.pow(1-clamp(p*1.4),2); AS=1; pc=0; SEED=(q.i-1)*100; if(PA>.02) ps.d(1,t); }
  else drawBg(sc.bg,null,1,0,0,t);
  PA=1; AS=sm(0,1,q.lt/Math.min(1.1,q.len*.5)); pc=0; SEED=q.i*100; sc.d(q.a,t); PA=1; AS=1; }
window.renderAt=function(t){ T=t; BP=Math.exp(-5.5*((((t-D.ph)%D.per)+D.per)%D.per)); LIGHT=.9+.2*BP; const q=sceneAt(t); drawArt(t,q); artTex.needsUpdate=true;
  // camera with eased hand-over between scenes
  let [p,l]=camPose(q.i,q.a,q.c.s,t); if(q.i>0&&q.lt<.45){ const pv=D.TL[q.i-1], [pp,pl]=camPose(q.i-1,1,pv.s,t), k=ease(q.lt/.45); p=p.map((v,j)=>lerp(pp[j],v,k)); l=l.map((v,j)=>lerp(pl[j],v,k)); }
  CAM.position.set(p[0]+Math.sin(t*.7)*.08,p[1]+Math.sin(t*.9)*.05,p[2]-BP*.12); CAM.lookAt(l[0],l[1],l[2]); CAM.fov=46-BP*.9; CAM.updateProjectionMatrix();
  const sun=S[q.c.s].bg.sun; PL.color.set(sun?sun.c:'#ffe0a0'); PL.intensity=260+260*BP; RAYS.forEach((m,i)=>{ m.material.opacity=(.07+.06*hash(i+Math.floor(t/D.per)))*(1+1.2*BP); m.material.color.set(sun?sun.c:'#ffe0a0'); m.position.x=-7+i*1.75+Math.sin(t*.3+i)*.5; });
  for(let i=0;i<DN;i++){ const d=d0[i]; dp[i*3]=d[0]+Math.sin(t*.25+d[3]*20)*.8; dp[i*3+1]=(d[1]+t*(.12+d[3]*.25))%13+.8; dp[i*3+2]=d[2]+Math.cos(t*.2+d[3]*30)*.6; } dg.attributes.position.needsUpdate=true; dust.material.opacity=.5+.4*BP;
  const gs=GLOBE_S[q.c.s], vis=sm(0,.6,q.lt)*(1-sm(q.len-.35,q.len,q.lt)); GLB.visible=!!gs; if(gs){ GLB.scale.setScalar(.2+.8*ease(vis)); GLB.rotation.y=-1.25+t*.32; GLB.rotation.x=.18; lg.setDrawRange(0,Math.floor(LN*lerp(gs[0],gs[1],q.a))); lights.material.size=.1+.07*BP; }
  CRS.visible=!!CROSS_S[q.c.s]; if(CRS.visible){ CRS.scale.setScalar((.2+.8*ease(vis))*(q.c.s==='title'?1:1.15)*(1+.06*BP)); CRS.rotation.y=t*.9; goldM.emissiveIntensity=.7+1.2*BP; }
  R.render(SCN,CAM);
  // composite: sharp + bloom + vignette + HUD
  O.setTransform(1,0,0,1,0,0); O.globalAlpha=1; O.globalCompositeOperation='source-over'; O.filter='none'; O.drawImage(glc,0,0); B1x.drawImage(glc,0,0,240,135); B2x.drawImage(B1,0,0,60,34); O.imageSmoothingEnabled=true; O.imageSmoothingQuality='high'; O.globalCompositeOperation='lighter'; O.globalAlpha=.13+.1*BP; O.drawImage(B1,0,0,W,H); O.globalAlpha=.12+.1*BP; O.drawImage(B2,0,0,W,H); O.globalCompositeOperation='source-over'; O.globalAlpha=1;
  const vg=O.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,H*1.05); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.6)'); O.fillStyle=vg; O.fillRect(0,0,W,H);
  X=O; const fade=sm(0,.4,q.lt)*(1-sm(q.len-.25,q.len,q.lt)*(q.i+1<D.TL.length&&D.TL[q.i+1].y===q.c.y?0:1)); yearPlate(q.c.y,q.i>0&&D.TL[q.i-1].y===q.c.y?1:fade); lyric(t);
  if(q.c.s==='title'){ const k=sm(1.2,2.6,t)*(1-sm(7.2,8.2,t)); gold('CHRISTIAN TIMELINE',W/2,H*.86,112,{a:k}); gold('FABLE 5.2 MUSIC VIDEO 2026',W/2,H*.86+62,38,{a:k,w:400}); }
  if(q.c.s==='end'){ const k=sm(.8,2.4,q.lt); gold('CHRISTIAN TIMELINE',W/2,150,70,{a:k}); gold('Fable 5.2 Music Video 2026  ·  animation by Claude Fable 5.2  ·  music made with Suno',W/2,214,28,{a:k,w:400}); }
  const fb=1-sm(0,1.2,t)+sm(D.total-2.2,D.total-.2,t); if(fb>0){ O.globalAlpha=clamp(fb); O.fillStyle='#000'; O.fillRect(0,0,W,H); O.globalAlpha=1; } X=ART; };
