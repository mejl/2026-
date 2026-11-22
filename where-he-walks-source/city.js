// ===== CITY: a rain-soaked, dead-neon night street that ends at a small dark church =====
const CITY={z0:30,z1:-92,L:{ lamps:[], blocks:[], signs:[], red:[] },st:{}};
(function(){
  const R=rng(2026);
  // window textures: dark facade + lit-window emissive twin
  const WT=[]; for(let v=0;v<3;v++){ const rr=rng(40+v*7), cells=[]; for(let cy=0;cy<4;cy++) for(let cx=0;cx<4;cx++) cells.push([cx,cy,rr()<.3,['255,214,150','255,190,120','255,238,200','255,120,170','120,225,255'][Math.floor(rr()*rr()*5)]]);
    const face=ctex(256,256,(x,w,h)=>{ x.fillStyle='#19213a'; x.fillRect(0,0,w,h); for(let i=0;i<60;i++){ x.fillStyle=`rgba(255,255,255,${rr()*.02})`; x.fillRect(rr()*w,rr()*h,rr()*30+4,rr()*3); } for(const [cx,cy] of cells){ x.fillStyle='#070a12'; x.fillRect(cx*64+13,cy*64+10,38,44); x.fillStyle='#17203a'; x.fillRect(cx*64+13,cy*64+10,38,5); } },[1,1]);
    const lit=ctex(256,256,(x,w,h)=>{ x.fillStyle='#000'; x.fillRect(0,0,w,h); for(const [cx,cy,on,col] of cells){ if(!on) continue; const g=x.createLinearGradient(0,cy*64+10,0,cy*64+54); g.addColorStop(0,`rgba(${col},1)`); g.addColorStop(1,`rgba(${col},.55)`); x.fillStyle=g; x.fillRect(cx*64+13,cy*64+10,38,44); x.fillStyle='rgba(0,0,0,.5)'; x.fillRect(cx*64+31,cy*64+10,2,44); } },[1,1]);
    WT.push({face,lit}); }
  CITY.WT=WT;
  const roadM=M(0x0b0e16,{r:.22,m:.15,t:true,o:.66,dw:true}), walkM=M(0x1b2232,{r:.4}), curbM=M(0x2a3246,{r:.5}), lineM=M(0x2a2f3c,{r:.6});
  const bodyCols=[0x15181f,0x1d1f2c,0x2a1a22,0x10202c,0x202226];
  const build=(par,mir)=>{
    const L={lamps:[],blocks:[],signs:[],red:[],reds:[]};
    // ground
    if(!mir){ pln(46,240,roadM,[0,0,-38],par,m=>{ m.rotation.x=-Math.PI/2; m.renderOrder=-5; });
    for(const s of [-1,1]){ box(4,.18,240,walkM,[s*7.2,.09,-38],par); box(.3,.2,240,curbM,[s*5.35,.1,-38],par); }
    for(let z=26;z>-90;z-=7) box(.2,.01,3,lineM,[0,.012,z],par);
    for(let i=0;i<9;i++) box(.7,.012,3.6,lineM,[-4+i*1,.012,-84],par); }
    // buildings
    const bz0=28; for(const s of [-1,1]){ for(let k=0;k<10;k++){ const zc=bz0-k*13, h=15+hash(k*3.1+s*9)*34+(k>5?10:0), d=15, w=12, vi=(k+(s>0?1:0))%3; const mat=M2(0xffffff,{r:.55,m:.1,map:CITY.WT[vi].face,em:CITY.WT[vi].lit}); mat.emissive.setRGB(1,.92,.8); mat.emissiveIntensity=0;
        const g=new THREE.BoxGeometry(d,h,w); const uv=g.attributes.uv; for(let f=0;f<6;f++) for(let i=0;i<4;i++){ const j=f*4+i; if(f<2){ uv.setXY(j,uv.getX(j)*(w/12),uv.getY(j)*(h/12)); } else if(f>=4){ uv.setXY(j,uv.getX(j)*(d/12),uv.getY(j)*(h/12)); } }
        const b=new THREE.Mesh(g,mat); b.position.set(s*(8.5+d/2),h/2,zc); par.add(b); L.blocks.push({mat,z:zc,s,h,vi});
        // storefront
        const sf=box(.2,3.2,w-1.2,M(0x090c13,{r:.15,m:.6}),[s*8.55,1.9,zc],par); const aw=box(1.3,.18,w-1.2,M(bodyCols[(k+1)%5],{r:.8}),[s*9.1,3.6,zc],par,m=>{ m.rotation.z=s*.18; });
        if(hash(k*5.3+s)>.4 && !mir){}
        // fire escape + roof gear
        if(hash(k+s*3)>.5){ for(let q=0;q<4;q++) box(.12,.12,w*.5,M(0x07090e),[s*8.7,7+q*4.2,zc],par); }
        if(h>26){ cyl(.05,.05,5,M(0x0a0c12),[s*(8.5+d/2),h+2.5,zc],par,null,5); const rd=sph(.12,M(0xff2a2a,{e:0xff2a2a,ei:0}),[s*(8.5+d/2),h+5,zc],par); const hl=halo(0xff3030,2.2,[s*(8.5+d/2),h+5,zc],par,0); L.reds.push({mat:rd.material,hl,ph:hash(k*2+s)*2}); }
      } }
    // lamps
    const lz=[22,10,-2,-14,-26,-38,-50,-62,-74]; for(const s of [-1,1]) for(const z of lz){ cyl(.09,.12,6.8,M(0x0b0d14,{r:.5,m:.5}),[s*6.4,3.4,z],par,null,8); box(1.8,.12,.14,M(0x0b0d14,{m:.5}),[s*5.5,6.7,z],par); const bm=M2(0xffe2b0,{e:0xffe2b0,ei:0,r:.4}); const bulb=box(.7,.1,.28,bm,[s*4.7,6.6,z],par); const hl=halo(0xffc070,9,[s*4.7,6.5,z],par,0); const pl=pool(0xffb060,20,[s*3.8,0,z],par,0); L.lamps.push({bm,hl,pl,z,x:s*4.7,s}); }
    // cars
    const cr=rng(5); for(let i=0;i<9;i++){ const s=i%2?1:-1, z=22-i*11+cr()*5, c=bodyCols[i%5]; const g=grp([s*3.9,0,z],par); const bm=M(c,{r:.25,m:.7}); box(1.9,.62,4.5,bm,[0,.55,0],g); box(1.65,.55,2.4,bm,[0,1.12,-.1],g); box(1.5,.4,2.1,M(0x0a1220,{r:.05,m:.9}),[0,1.15,-.1],g); const tl=M2(0xff1a2a,{e:0xff1a2a,ei:0}); for(const q of [-.7,.7]){ box(.4,.14,.08,tl,[q,.7,-2.27],g); box(.4,.1,.06,M(0xdfe9ff,{e:0xcfe0ff,ei:0}),[q,.7,2.27],g); } L.red.push({mat:tl}); for(const q of [-.95,.95]) for(const zz of [-1.4,1.4]) cyl(.34,.34,.25,M(0x050608),[q,.34,zz],g,m=>m.rotation.z=Math.PI/2,10); }
    // storefront neon signs (dead until light reaches)
    const txts=['OPEN','BAR','MOTEL','PIZZA','24H','LIQUOR','CAFE','HOTEL']; const cols=['#ff3d8b','#35e0ff','#ffb347','#ff5d5d','#8a7dff','#ffd45e','#35e0ff','#ff3d8b']; txts.forEach((tx,i)=>{ const s=i%2?1:-1, z=20-i*9.5, dead=ctex(256,96,(x,w,h)=>{ x.fillStyle='#0b0e16'; x.fillRect(0,0,w,h); x.font='900 60px Inter'; x.textAlign='center'; x.textBaseline='middle'; x.strokeStyle='#2c3141'; x.lineWidth=5; x.lineJoin='round'; x.strokeText(tx,w/2,h/2); }), lit=ctex(256,96,(x,w,h)=>{ x.fillStyle='#000'; x.fillRect(0,0,w,h); x.font='900 60px Inter'; x.textAlign='center'; x.textBaseline='middle'; x.lineJoin='round'; x.strokeStyle=cols[i]; x.shadowColor=cols[i]; x.shadowBlur=18; x.lineWidth=6; x.strokeText(tx,w/2,h/2); x.shadowBlur=0; x.strokeStyle='#fff'; x.lineWidth=2; x.strokeText(tx,w/2,h/2); });
      const mt=M2(0xffffff,{map:dead,em:lit,r:.5}); mt.emissive.setRGB(1,1,1); mt.emissiveIntensity=0; const sg=pln(4.2,1.6,mt,[s*8.45,4.6,z],par,m=>{ m.rotation.y=-s*Math.PI/2+(s>0?Math.PI:0)*0; m.rotation.y=s>0?-Math.PI/2:Math.PI/2; }); const hl=halo(new THREE.Color(cols[i]),7,[s*8.0,4.6,z],par,0); L.signs.push({mat:mt,hl,z,s}); });
    // puddles
    const pr=rng(3); if(!mir) for(let i=0;i<14;i++){ box(3+pr()*5,.004,2+pr()*2.5,M(0x040509,{r:.02,m:.2,t:true,o:.4}),[-3.5+pr()*7,.016,20-pr()*100],par); }
    // distant skyline in fog (so the street end isn't empty)
    for(let i=0;i<14;i++){ const x=-70+i*10+hash(i)*4, h=18+hash(i*1.7)*38; if(Math.abs(x)<22) continue; box(7+hash(i*3)*6,h,8,M(0x0b0e18,{r:.9}),[x,h/2,-135-hash(i*5)*20],par); }
    return L; };
  const a=build(CITY_R=grp(null,GS),false); const b=build(CITY_M=grp(null,MIRG),true); CITY.L={a,b};
  CITY_R.visible=CITY_M.visible=false;
})();
WORLDS.city={name:'city',r:CITY_R,m:CITY_M,x:[]};
var CITY_R,CITY_M;
// the church at the end of the street + the big neon sign (letters light one by one)
const CHURCH=(function(){
  const par=[grp([0,0,0],GS),grp([0,0,0],MIRG)]; par.forEach(p=>p.visible=false); const C={par};
  const stone=M(0x161a24,{r:.85,fog:false}), roof=M(0x0c0f17,{r:.7,fog:false});
  const sign={c:mkc(1024,384),text:['JESUS CHRIST','LOVES YOU'],prog:0}; const stx=new THREE.CanvasTexture(sign.c); stx.colorSpace=THREE.SRGBColorSpace; sign.tex=stx; sign.x=sign.c.getContext('2d');
  const smat=new THREE.MeshBasicMaterial({map:stx,transparent:true,depthWrite:false,fog:false,blending:THREE.NormalBlending}); C.sign=sign; C.smat=smat;
  const rose=ctex(256,256,(x,w,h)=>{ x.fillStyle='#000'; x.fillRect(0,0,w,h); }); C.rose=rose;
  const roseM=M2(0x1a2236,{em:rose,r:.3}); roseM.emissive.setRGB(1,1,1); roseM.emissiveIntensity=1; C.roseM=roseM;
  const glassM=[]; C.glass=glassM;
  par.forEach((p,pi)=>{ box(22,15,30,stone,[0,7.5,-106],p); box(5.5,26,5.5,stone,[-13,13,-93],p); mesh(GEO('pyr',()=>new THREE.ConeGeometry(1,1,4)),roof,[-13,31,-93],p,m=>{ m.scale.set(4.4,10,4.4); m.rotation.y=Math.PI/4; });
    mesh(GEO('gab',()=>{ const sh=new THREE.Shape(); sh.moveTo(-11.5,0); sh.lineTo(11.5,0); sh.lineTo(0,6.5); sh.closePath(); return new THREE.ExtrudeGeometry(sh,{depth:30,bevelEnabled:false}); }),roof,[0,15,-121],p);
    box(22,.5,.8,stone,[0,15,-91.6],p);
    for(const s of [-1,1]) box(1.2,9,1,stone,[s*3.6,4.5,-91.3],p);
    box(5.4,6.2,.5,M(0x04050a,{r:.4}),[0,3.1,-91.4],p); mesh(GEO('arch',()=>new THREE.CylinderGeometry(2.7,2.7,.5,16,1,false,0,Math.PI)),M(0x04050a),[0,6.2,-91.4],p,m=>{ m.rotation.x=Math.PI/2; m.rotation.z=0; });
    const rw=mesh(GEO('rose',()=>new THREE.CircleGeometry(2.3,28)),roseM,[0,12.2,-91.1],p);
    const sg=new THREE.Mesh(GEO('signp',()=>new THREE.PlaneGeometry(15.5,5.8)),smat); sg.position.set(0,9.2,-90.8); p.add(sg); if(pi===0) C.signMesh=sg;
    // cross on spire + on gable
    const cm=M2(0xffd9a0,{e:0xffd9a0,ei:0,r:.4}); C.crossM=cm; box(.35,2.8,.35,cm,[-13,37,-93],p); box(1.7,.35,.35,cm,[-13,37.8,-93],p); box(.3,2.4,.3,cm,[0,19.2,-91.5],p); box(1.4,.3,.3,cm,[0,19.8,-91.5],p);
  });
  C.haze=halo(0x7a4aa8,150,[0,14,-130],par[0],.5); C.halo=halo(0xffc070,26,[-13,36,-92],par[0],0); C.halo2=halo(0xffb060,16,[0,12.2,-90],par[0],0);
  C.draw=function(prog,t){ const x=sign.x, w=1024, h=384, txt=sign.text; x.clearRect(0,0,w,h); x.lineJoin='round'; x.textAlign='center'; x.textBaseline='middle'; const tot=txt.join('').length; let idx=0;
    txt.forEach((line,li)=>{ x.font=`900 ${li?150:132}px "Inter Display","Inter"`; x.letterSpacing='8px'; const y=li?285:104; let cx=w/2-x.measureText(line).width/2; for(let ch=0;ch<line.length;ch++){ const c=line[ch], cw=x.measureText(c).width; const on=clamp(prog*(tot+2)-idx); const fl=on>0&&on<1?(Math.sin(on*40)>-.1?1:.15):on>=1?1:0; const col=li?'#ff4f9a':'#ffb347';
        x.save(); x.translate(cx+cw/2,y); x.textAlign='center'; x.strokeStyle='#262b3a'; x.lineWidth=15; x.strokeText(c,0,0); x.restore();
        if(on>0){ x.save(); x.translate(cx+cw/2,y); x.textAlign='center'; x.globalAlpha=Math.min(1,fl*(.8+.2*Math.sin(t*30+idx))); x.shadowColor=col; x.shadowBlur=42; x.strokeStyle=col; x.lineWidth=15; x.strokeText(c,0,0); x.shadowBlur=14; x.strokeStyle='#fff6e6'; x.lineWidth=5; x.strokeText(c,0,0); x.restore(); }
        cx+=cw; idx++; } }); sign.tex.needsUpdate=true; };
  C.draw(0,0); return C; })();
WORLDS.city.x.push(CHURCH.par[0],CHURCH.par[1]);
// sky + sun (synthwave striped sun that rises behind the church at the end)
const SKY=(function(){ const g=new THREE.Group(); GS.add(g); g.visible=false;
  const night=new THREE.Mesh(new THREE.PlaneGeometry(700,320),new THREE.MeshBasicMaterial({map:ctex(8,256,(x,w,h)=>{ const gr=x.createLinearGradient(0,0,0,h); gr.addColorStop(0,'#03040a'); gr.addColorStop(.55,'#0a1030'); gr.addColorStop(.78,'#251a50'); gr.addColorStop(.92,'#52306a'); gr.addColorStop(1,'#7a3f78'); x.fillStyle=gr; x.fillRect(0,0,w,h); }),fog:false,transparent:true,depthWrite:false})); night.position.set(0,80,-210); g.add(night);
  const dawn=new THREE.Mesh(new THREE.PlaneGeometry(700,320),new THREE.MeshBasicMaterial({map:ctex(8,256,(x,w,h)=>{ const gr=x.createLinearGradient(0,0,0,h); gr.addColorStop(0,'#2a2f78'); gr.addColorStop(.3,'#a8507a'); gr.addColorStop(.52,'#e8705f'); gr.addColorStop(.78,'#ff9a58'); gr.addColorStop(1,'#ffb870'); x.fillStyle=gr; x.fillRect(0,0,w,h); }),fog:false,transparent:true,opacity:0,depthWrite:false})); dawn.position.set(0,80,-209); g.add(dawn);
  const sunT=ctex(512,512,(x,w,h)=>{ const gr=x.createLinearGradient(0,0,0,h); gr.addColorStop(0,'#fff1b8'); gr.addColorStop(.5,'#ffb35c'); gr.addColorStop(1,'#ff4f7b'); x.fillStyle=gr; x.beginPath(); x.arc(256,256,248,0,TAU); x.fill(); x.globalCompositeOperation='destination-out'; for(let i=0;i<9;i++){ const y=250+i*30+ (i*i)*.9; x.fillRect(0,y,512,4+i*2.6); } });
  const sun=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:sunT,transparent:true,fog:false,depthWrite:false,opacity:0})); sun.position.set(0,0,-205); g.add(sun);
  const sh=halo(0xffb070,200,[0,0,-204],g,0); const stars=[]; const sr=rng(88); const sm_=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(Array.from({length:600},(_,i)=>i%3===0?(sr()-.5)*500:i%3===1?30+sr()*120:-200),3)),new THREE.PointsMaterial({color:0xcfd9ff,size:1.3,sizeAttenuation:false,fog:false,transparent:true,opacity:.7,depthWrite:false})); g.add(sm_);
  return {g,night,dawn,sun,sh,stars:sm_}; })();
WORLDS.city.x.push(SKY.g);
// ---------- city state driver ----------
// o: {jz, dir, all, sign, win, cross, dawn, jx} ; returns light list for rain
function cityLight(o,t){
  const jz=o.jz??1e9, dir=o.dir||-1, all=o.all||0, tr=o.trail??1;
  let best=[];
  for(const grpL of [CITY.L.a,CITY.L.b]){
    for(const l of grpL.lamps){ const dd=(jz-l.z)*dir; let on=all; if(dd>-3&&tr){ const age=dd+3; let f=sm(0,2,age); if(age<5) f*=(Math.sin(age*9+l.z)>-.5?1:.35)*(.6+.4*sm(0,5,age)); on=Math.max(on,f*tr); } on=clamp(on); l.bm.emissiveIntensity=on*4; l.hl.material.opacity=on*.8; l.pl.material.opacity=Math.min(on,all>.5?.45:1); l.on=on; }
    for(const s of grpL.signs){ const dd=(jz-s.z)*dir; let on=Math.max(all,sm(-1,4,dd)*tr*.85); s.mat.emissiveIntensity=on*2.2; s.hl.material.opacity=on*.5; }
    for(const b of grpL.blocks){ const dd=(jz-b.z)*dir; const on=Math.max(o.win??all,sm(-8,16,dd)*(o.trailWin??.55)*tr); b.mat.emissiveIntensity=on*.5; }
    for(const r of grpL.red){ r.mat.emissiveIntensity=2.5; }
    for(const r of grpL.reds){ const bl=Math.pow(Math.max(0,Math.sin((t/PER*.5+r.ph)*Math.PI)),6); r.mat.emissiveIntensity=bl*3; r.hl.material.opacity=bl*.8; }
  }
  CHURCH.draw(o.sign||0,t); CHURCH.crossM.emissiveIntensity=(o.cross||0)*3; CHURCH.halo.material.opacity=(o.cross||0)*.9; CHURCH.halo2.material.opacity=(o.rose||0)*.8;
  CHURCH.roseM.emissiveIntensity=(o.rose||0)*1.6; const rs=CHURCH.rose.userData.x; rs.fillStyle='#000'; rs.fillRect(0,0,256,256); if(o.rose){ for(let i=0;i<12;i++){ const a=i/12*TAU; rs.fillStyle=['#ff4f9a','#ffb347','#35e0ff'][i%3]; rs.beginPath(); rs.moveTo(128,128); rs.arc(128,128,120,a,a+TAU/12-.07); rs.fill(); } rs.fillStyle='#fff3d6'; rs.beginPath(); rs.arc(128,128,22,0,TAU); rs.fill(); rs.strokeStyle='#000'; rs.lineWidth=6; rs.beginPath(); rs.arc(128,128,60,0,TAU); rs.stroke(); } CHURCH.rose.needsUpdate=true;
  const d=o.dawn||0; SKY.night.material.opacity=1-d; SKY.dawn.material.opacity=d; SKY.sun.material.opacity=sm(.05,.6,d); SKY.sh.material.opacity=sm(.05,.8,d)*.3; const sy=lerp(-40,30,eo(clamp(d*1.1))); SKY.sun.position.y=sy; SKY.sh.position.y=sy; const ss=lerp(50,62,d); SKY.sun.scale.set(ss,ss,1); SKY.stars.material.opacity=.7*(1-d);
  const act=CITY.L.a.lamps.filter(l=>l.on>.3).sort((p,q)=>Math.abs(p.z-jz)-Math.abs(q.z-jz)); [LL1,LL2].forEach((L,i)=>{ const l=act[i]; if(l&&o.lampLights!==false){ L.position.set(l.x,6,l.z); L.intensity=l.on*45; } else L.intensity=0; });
}
