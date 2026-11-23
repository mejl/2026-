// ===== CALVARY + TOMB, VOID PROPS (hand / scroll / chain / crown), GLOBE =====
const CAL={};
(function(){
  const R=rng(23);
  CAL.h=(x,z)=>{ const r2=(x*x+(z-40)*(z-40)); return 15*Math.exp(-r2/700)+Math.sin(x*.21+z*.17)*.35+Math.sin(x*.5-z*.4)*.12; };
  const tg=new THREE.PlaneGeometry(260,260,90,90); tg.rotateX(-Math.PI/2); const tp=tg.attributes.position; for(let i=0;i<tp.count;i++) tp.setY(i,CAL.h(tp.getX(i),tp.getZ(i))); tg.computeVertexNormals();
  const terrain=new THREE.Mesh(tg,M(0x1c1814,{r:.95}));
  const cross=(par,x,z,hh,sc=1)=>{ const y=CAL.h(x,z); const g=grp([x,y,z],par); const cm=M2(0x0b0907,{r:.9}); box(.38*sc,hh,.38*sc,cm,[0,hh/2,0],g); box(2.1*sc,.34*sc,.34*sc,cm,[0,hh*.78,0],g); g.userData.cm=cm; return g; };
  CAL.crosses=[];
  const rock=(par)=>{ const g=grp([60,0,-24],par);
    const rm=M(0x5e5246,{r:.96,f:true}), rm2=M(0x7a6c56,{r:.95,f:true}), stoneM=M(0x8a7b64,{r:.9,f:true}), rimM=M(0x4e443a,{r:.95,f:true});
    // faceted limestone hill with the tomb carved into its face
    const hg=new THREE.IcosahedronGeometry(1,3), hp=hg.attributes.position; for(let i=0;i<hp.count;i++){ const x=hp.getX(i), y=hp.getY(i), z=hp.getZ(i); const k=1+Math.sin(x*3.1+z*2.3)*.07+Math.sin(y*5.2+x*2.1)*.05+Math.sin(z*4.3-y*3.3)*.05; hp.setXYZ(i,x*k,y*k,z*k); } hg.computeVertexNormals();
    mesh(hg,rm,[0,1.0,-12],g,m=>m.scale.set(23,12,13.5));
    for(const [x,z,s,c] of [[-15,-2,5,rm],[16,-4,4.6,rm],[-9,2.5,2.6,rm2],[10.5,1.5,2.4,rm2],[-19,4,2.2,rm2],[20,3,2.6,rm]]) mesh(new THREE.IcosahedronGeometry(1,1),c,[x,s*.4,z],g,m=>{ m.scale.set(s*1.25,s*.85,s); m.rotation.y=x; });
    const sh=new THREE.Shape(); sh.moveTo(-6.6,0); sh.lineTo(6.6,0); sh.lineTo(6.4,7.1); sh.lineTo(3.2,7.6); sh.lineTo(-2.2,7.4); sh.lineTo(-6.5,7.8); sh.closePath();
    const ho=new THREE.Path(); ho.moveTo(-2.3,.35); ho.lineTo(2.3,.35); ho.lineTo(2.3,3.7); ho.absarc(0,3.7,2.3,0,Math.PI,false); ho.lineTo(-2.3,.35); sh.holes.push(ho);
    mesh(new THREE.ExtrudeGeometry(sh,{depth:1.7,bevelEnabled:false}),rm2,[0,0,2.9],g);
    box(9,.3,2.6,rimM,[0,.15,5.4],g); box(6.2,.2,1.6,rm2,[0,.1,6.6],g);
    // the rolled-away stone: a lighter weathered disc in its groove
    const stone=cyl(2.95,2.95,1.1,stoneM,[9.4,2.95,6.2],g,m=>{ m.rotation.x=Math.PI/2; m.rotation.z=.2; },28); CAL.stone=stone; cyl(3.1,3.1,.8,rimM,[9.4,3.0,5.95],g,m=>{ m.rotation.x=Math.PI/2; m.rotation.z=.2; },28); box(10,.4,1.5,rimM,[6,.2,6.0],g);
    // light pouring out of the opening
    const gt=ctex(256,256,(x,w,h)=>{ const gr=x.createRadialGradient(128,150,4,128,150,150); gr.addColorStop(0,'#ffffff'); gr.addColorStop(.35,'#ffe8b8'); gr.addColorStop(1,'#a8743a'); x.fillStyle=gr; x.fillRect(0,0,w,h); });
    const gm=M2(0xffe6b0,{e:0xffe6b0,ei:0,fog:false}); gm.emissiveMap=gt; pln(4.6,7.4,gm,[0,3.7,3.3],g); CAL.tombGlow=gm; CAL.tombHalo=halo(0xffd9a0,40,[60,4,-18],par,0); CAL.tombG=g;
    for(const sd of [-1,1]) cyl(.02,1.05,8.5,M(0x0e1a10,{r:1}),[sd*11.5,4.25,8.5],g,null,8);
    for(let i=0;i<7;i++){ const x=30+R()*60-10, z=-4+R()*30; const t=grp([x+(i%2?25:-25),0,z],par); cyl(.35,.55,3,M(0x14100c),[0,1.5,0],t,null,6); sph(2.4,M(0x0d1710,{r:1}),[0,3.7,0],t,m=>m.scale.y=.75); } };
  CAL.rays=[];
  const wo=world('calvary',o=>{ o.r.add(terrain); for(const x of [-6,0,6]){ CAL.crosses.push(cross(o.r,x,40,x===0?9:7.4,x===0?1.2:1)); } rock(o.r); for(let i=0;i<40;i++){ const x=(R()-.5)*160, z=-40+R()*120; const rr=new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),M(0x1a1612,{r:.95,f:true})); rr.position.set(x,CAL.h(x,z)+.2,z); rr.scale.set(.4+R()*1.4,.3+R()*.8,.4+R()*1.4); rr.rotation.set(R()*3,R()*3,R()*3); o.r.add(rr); }
    for(let i=0;i<9;i++){ const rm=new THREE.MeshBasicMaterial({map:GT,color:0xffe0a0,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,fog:false,side:THREE.DoubleSide}); const p=new THREE.Mesh(new THREE.PlaneGeometry(6,70),rm); p.position.set(60+(i-4)*1.6,6,-10); p.userData.i=i; o.r.add(p); CAL.rays.push(p); } });
  CAL.setRays=(op,t,cam_)=>{ CAL.rays.forEach((p,i)=>{ const a=(i-4)/4*.9; p.position.set(60,5,-18+40); p.position.set(60+Math.sin(a)*1,4,-12); p.rotation.set(-1.5,0,0); p.rotation.set(0,0,0); p.lookAt(cam_.x,cam_.y,cam_.z); p.rotateZ(a); p.material.opacity=op*(.35+.25*Math.sin(t*1.3+i*2)); p.scale.set(.5+(i%3)*.3,1,1); }); };
})();
// ---------- close-up props in the void ----------
const VOID={};
(function(){
  const floorM=M(0x05060a,{r:.12,m:.5,t:true,o:.7}); const mk=(par,mir)=>{ if(!mir) pln(200,200,floorM,[0,0,0],par,m=>{ m.rotation.x=-Math.PI/2; m.renderOrder=-5; }); };
  // hand
  const tfin=(r0,r1,l)=>GEO(`tf${r0}_${r1}_${l}`,()=>{ const g=loft(limbSecs(l,[[0,r0,r0*.9],[1,r1,r1*.85]]),{seg:10}); g.rotateZ(Math.PI); return g; });
  const mkHand=(par)=>{ const g=grp(null,par); const sk=M(0x2a1a12,{r:.7}); const wm=M2(0xffdca0,{e:0xffdca0,ei:1.5,r:.4}); caps(.036,.05,sk,[0,-.14,0],g,m=>m.scale.set(1.1,1,.8),3,10); caps(.05,.05,sk,[0,.035,0],g,m=>m.scale.set(1.18,1,.5),3,12);
    const fs=[]; [[-.04,.095,.036,.04,.036],[-.014,.11,.04,.044,.038],[.014,.108,.04,.043,.037],[.04,.095,.036,.04,.034]].forEach(([x,y,l1,l2,l3],i)=>{ const f=grp([x,y,0],g); mesh(tfin(.0125,.0098,l1+.012),sk,[0,.0,0],f); const f2=grp([0,l1+.012,0],f); mesh(tfin(.0105,.0088,l2+.01),sk,[0,-.004,0],f2); const f3=grp([0,l2+.01,0],f2); mesh(tfin(.0092,.0064,l3+.01),sk,[0,-.004,0],f3); fs.push([f,f2,f3]); });
    const th=grp([-.06,.0,.005],g); th.rotation.z=.9; caps(.0125,.042,sk,[0,.03,0],th,null,2,8); const th2=grp([0,.062,0],th); caps(.011,.04,sk,[0,.02,0],th2,null,2,8);
    const wound=mesh(GEO('wnd',()=>new THREE.CircleGeometry(.0085,18)),wm,[0.004,.026,.0145],g); const wh=halo(0xffd29a,.2,[.004,.026,.025],g,0); g.userData={fs,th,th2,wound,wm,wh}; return g; };
  VOID.hand=mkHand(GS); hide(VOID.hand);
  VOID.handPose=(curl,open)=>{ const u=VOID.hand.userData; u.fs.forEach(([a,b,c],i)=>{ a.rotation.x=-curl*.35+(i-1.5)*.0; a.rotation.z=(i-1.5)*-.07*open; b.rotation.x=-curl*.55; c.rotation.x=-curl*.5; }); u.th.rotation.x=-curl*.2; u.th2.rotation.x=-curl*.3; };
  // scroll with Hebrew letters
  const sg=grp(null,GS); hide(sg); VOID.scroll=sg; const parch=ctex(1024,512,(x,w,h)=>{ const g=x.createLinearGradient(0,0,w,0); g.addColorStop(0,'#6a5430'); g.addColorStop(.5,'#9a7e4a'); g.addColorStop(1,'#6a5430'); x.fillStyle=g; x.fillRect(0,0,w,h); x.fillStyle='rgba(40,25,10,.88)'; x.direction='rtl'; x.textAlign='right'; x.font='46px FreeSerif, "DejaVu Serif", serif'; const L=['בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת','הַשָּׁמַיִם וְאֵת הָאָרֶץ','וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר','וַיְהִי אוֹר וַיַּרְא אֱלֹהִים','אֶת הָאוֹר כִּי טוֹב','שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ']; L.forEach((l,i)=>x.fillText(l,w-60,70+i*72)); });
  const pm=M2(0xffffff,{map:parch,r:.9,e:0xffc070,ei:0}); pm.emissiveMap=parch; box(1,.02,.55,pm,[0,0,0],sg); VOID.parchM=pm; for(const s of [-1,1]) cyl(.035,.035,.62,M(0x3a2a1a,{r:.7}),[s*.5,.03,0],sg,m=>m.rotation.x=Math.PI/2,12);
  VOID.letters=[]; const lt=['אוֹר','שָׁלוֹם','אַהֲבָה','חַיִּים','אֱמֶת','חֶסֶד','יְשׁוּעָה','תִּקְוָה','אוֹר','שָׁלוֹם','אַהֲבָה','אוֹר']; lt.forEach((w,i)=>{ const t=ctex(256,128,(x,ww,hh)=>{ x.fillStyle='rgba(0,0,0,0)'; x.clearRect(0,0,ww,hh); x.font='900 84px FreeSerif, "DejaVu Serif"'; x.textAlign='center'; x.textBaseline='middle'; x.shadowColor='#ffb860'; x.shadowBlur=24; x.fillStyle='#fff1cf'; x.fillText(w,ww/2,hh/2); }); const m=new THREE.Mesh(new THREE.PlaneGeometry(.3,.15),new THREE.MeshBasicMaterial({map:t,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,fog:false,opacity:0})); m.userData={i,x:(hash(i*7)-.5)*.9,z:(hash(i*3)-.5)*.3,ph:hash(i*11)}; GS.add(m); hide(m); VOID.letters.push(m); });
  // chain
  VOID.chain=[]; const cg=grp(null,GS); hide(cg); VOID.chainG=cg; const cmat=M2(0x1c1c22,{r:.4,m:.8,e:0xffb860,ei:0}); VOID.chainM=cmat; for(let i=0;i<16;i++){ const m=mesh(GEO('link',()=>new THREE.TorusGeometry(.05,.0125,8,16)),cmat,null,cg); m.userData.i=i; VOID.chain.push(m); }
  VOID.block=box(.5,.4,.5,M(0x1a1a20,{r:.9}),[0,.2,0],GS); hide(VOID.block);
  // crown (gold, discarded)
  const cr=grp(null,GS); hide(cr); VOID.crown=cr; const gold=M(0xc89a30,{r:.3,m:.9,e:0xffb030,ei:.15}); mesh(GEO('crr',()=>new THREE.TorusGeometry(.11,.016,8,28)),gold,[0,.02,0],cr,m=>m.rotation.x=Math.PI/2); for(let i=0;i<7;i++){ const a=i/7*TAU; mesh(GEO('crp',()=>new THREE.ConeGeometry(.02,.1,6)),gold,[Math.cos(a)*.11,.09,Math.sin(a)*.11],cr); sph(.012,M(0xff4060,{e:0xff4060,ei:.5}),[Math.cos(a)*.11,.025,Math.sin(a)*.11],cr,null,6,5); }
  world('void',o=>{ mk(o.r,false); mk(o.m,true); });
  // lion constellation (stars + lines)
  const LP=[[0,0],[1,.4],[2,.2],[3.1,.5],[3.9,.1],[5,.0],[5.8,-.5],[5.3,-1.4],[4.2,-1.6],[3.6,-1.1],[2.6,-1.5],[1.8,-1.7],[2.5,-.7],[1.2,-.9],[-.2,-1.2],[-.8,-.5],[-1.4,.3],[-1.1,1.1],[-.2,1.4],[.7,1.0],[6.8,.7],[7.4,1.3],[6.4,1.5]];
  const LL=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,2],[11,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,0],[14,0],[16,0],[5,20],[20,21],[21,22]];
  const LZ=LP.map((p,i)=>Math.sin(i*2.3)*1.1+Math.cos(i*.9)*.8); const lg=grp(null,GS); hide(lg); VOID.lion=lg; const lp=new Float32Array(LL.length*6); const lgeo=new THREE.BufferGeometry(); lgeo.setAttribute('position',new THREE.BufferAttribute(lp,3)); const lm=new THREE.LineSegments(lgeo,new THREE.LineBasicMaterial({color:0xffe0a8,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,fog:false,depthWrite:false})); lm.frustumCulled=false; lg.add(lm); VOID.lionStars=LP.map((p,i)=>halo(0xfff0c8,.5,[p[0],p[1],LZ[i]],lg,0));
  VOID.lionSet=(prog)=>{ LL.forEach((e,i)=>{ const a=LP[e[0]], b=LP[e[1]], u=clamp(prog*LL.length-i); const k=i*6; lp[k]=a[0]; lp[k+1]=a[1]; lp[k+2]=LZ[e[0]]; lp[k+3]=lerp(a[0],b[0],u); lp[k+4]=lerp(a[1],b[1],u); lp[k+5]=lerp(LZ[e[0]],LZ[e[1]],u); }); lgeo.attributes.position.needsUpdate=true; VOID.lionStars.forEach((h,i)=>{ h.material.opacity=clamp(prog*LL.length-i*1.1+1)*(.7+.3*Math.sin(TT*3+i)); }); lm.material.opacity=.55; };
})();
// ---------- globe: land mask + city lights, light front spreads from Jerusalem ----------
const GLOBE={};
(function(){
  const lm=mkc(2048,1024), lx=lm.getContext('2d'); lx.fillStyle='#000'; lx.fillRect(0,0,2048,1024); lx.fillStyle='#fff'; for(const c of WORLD) for(const r of c[1]){ lx.beginPath(); for(let i=0;i<r.length;i+=2){ const X=(r[i]+180)/360*2048, Y=(90-r[i+1])/180*1024; i?lx.lineTo(X,Y):lx.moveTo(X,Y); } lx.closePath(); lx.fill(); }
  const land=new THREE.CanvasTexture(lm); const ld=lx.getImageData(0,0,2048,1024).data; const lights=mkc(2048,1024), llx=lights.getContext('2d'); llx.fillStyle='#000'; llx.fillRect(0,0,2048,1024); const R=rng(77); let n=0; while(n<5200){ const X=(R()*2048)|0, Y=(R()*1024)|0; if(ld[(Y*2048+X)*4]<128) continue; const lat=90-Y/1024*180; const w=Math.exp(-Math.pow((lat-38)/22,2))+.25*Math.exp(-Math.pow((lat+20)/20,2)); if(R()>w) continue; const a=.35+R()*.65; const gr=llx.createRadialGradient(X,Y,0,X,Y,2+R()*3); gr.addColorStop(0,`rgba(255,${200+R()*40|0},${120+R()*60|0},${a})`); gr.addColorStop(1,'rgba(255,160,60,0)'); llx.fillStyle=gr; llx.fillRect(X-6,Y-6,12,12); n++; }
  const lt=new THREE.CanvasTexture(lights); land.colorSpace=lt.colorSpace=THREE.SRGBColorSpace; land.anisotropy=lt.anisotropy=4;
  const jl=[35.21,31.77]; const lat0=jl[1]*Math.PI/180, lon0=jl[0]*Math.PI/180; const org=new THREE.Vector3(Math.cos(lat0)*Math.cos(lon0)*-1,Math.sin(lat0),Math.cos(lat0)*Math.sin(lon0)); // matches three's sphere uv mapping
  const mat=new THREE.ShaderMaterial({uniforms:{land:{value:land},lights:{value:lt},org:{value:new THREE.Vector3(0,0,1)},front:{value:0},warm:{value:0},time:{value:0}},
    vertexShader:'varying vec2 vUv; varying vec3 vN; varying vec3 vP; void main(){ vUv=uv; vN=normalize(normalMatrix*normal); vP=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader:`uniform sampler2D land; uniform sampler2D lights; uniform vec3 org; uniform float front; uniform float warm; uniform float time; varying vec2 vUv; varying vec3 vN; varying vec3 vP;
      void main(){ float l=texture2D(land,vUv).r; vec3 L=texture2D(lights,vUv).rgb; float ang=acos(clamp(dot(vP,org),-1.,1.)); float lit=0.; float edge=0.;
        vec3 ocean=vec3(.012,.03,.06); vec3 ground=vec3(.045,.06,.085); vec3 c=mix(ocean,ground,l);
        lit=1.-smoothstep(front-.35,front,ang); edge=smoothstep(front-.5,front-.02,ang)*(1.-smoothstep(front-.02,front+.12,ang)); c+=lit*(l*vec3(.38,.22,.08)*.55+vec3(.06,.035,.015)*.5); c+=L*lit*2.4; c+=edge*vec3(1.,.72,.38)*.9;
        float fr=pow(1.-max(0.,dot(normalize(vN),vec3(0.,0.,1.))),2.6); c+=fr*mix(vec3(.08,.16,.4),vec3(1.,.62,.28),warm)*.9; gl_FragColor=vec4(c,1.); }`});
  const sph_=new THREE.Mesh(new THREE.SphereGeometry(5,96,64),mat); const gg=grp(null,GS); gg.add(sph_); hide(gg); GLOBE.g=gg; GLOBE.sph=sph_; GLOBE.mat=mat; GLOBE.org=org;
  const ring=halo(0xffc880,16,[0,0,0],gg,0); GLOBE.halo=ring; GLOBE.pin=halo(0xfff0c0,1.2,[0,0,0],sph_,0);
  GLOBE.set=(front,warm,t,lon=35,lat=28)=>{ mat.uniforms.front.value=front; mat.uniforms.warm.value=warm; GG(sph_,lon,lat); mat.uniforms.org.value.copy(JER_DIR); GLOBE.pin.position.copy(JER_DIR).multiplyScalar(5.02); GLOBE.pin.material.opacity=sm(.05,.3,front)*(.6+.4*Math.sin(t*5)); GLOBE.halo.material.opacity=0; };
})();
// three SphereGeometry maps u (0..1) from -x around +z... derive direction of (lon,lat) in object space
function lonlat2v(lon,lat){ const phi=(lon+180)/360*TAU, th=(90-lat)/180*Math.PI; return new THREE.Vector3(-Math.cos(phi)*Math.sin(th),Math.cos(th),Math.sin(phi)*Math.sin(th)); }
const JER_DIR=lonlat2v(35.21,31.77);
function GG(sph_,lon,lat){ const v=lonlat2v(lon,lat); const ay=-Math.atan2(v.x,v.z), ax=Math.atan2(v.y,Math.hypot(v.x,v.z)); sph_.rotation.set(ax,ay,0,'XYZ'); }
