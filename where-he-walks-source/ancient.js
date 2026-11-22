// ===== ANCIENT: stone village street that ends at the city gate of Jerusalem; palms, cloaks, lanterns =====
function lampUpdate(lamps,jz,dir,all,tr,gain=4){ for(const l of lamps){ const dd=(jz-l.z)*dir; let on=all; if(dd>-3&&tr){ const age=dd+3; let f=sm(0,2,age); if(age<5) f*=(Math.sin(age*9+l.z)>-.5?1:.35)*(.6+.4*sm(0,5,age)); on=Math.max(on,f*tr); } on=clamp(on); l.bm.emissiveIntensity=on*gain; l.hl.material.opacity=on*.85; l.pl.material.opacity=on*.5; l.on=on; } }
const ANC={L:{a:null,b:null}};
(function(){
  const stoneC=[0x2b241e,0x332a22,0x251f1b,0x2f2822,0x38302a], groundM=M(0x17130f,{r:.3,m:.1,t:true,o:.7});
  const build=(par,mir)=>{ const L={lamps:[],win:[]}; const R=rng(19);
    if(!mir){ pln(60,260,groundM,[0,0,-40],par,m=>{ m.rotation.x=-Math.PI/2; m.renderOrder=-5; }); const pm=M(0x241d17,{r:.9}); for(const s of [-1,1]) box(1.6,.2,260,pm,[s*4.2,.1,-40],par); }
    for(const s of [-1,1]) for(let k=0;k<12;k++){ const z=24-k*8.2, w=7.6+R()*.6, h=4.2+R()*3.2, d=8+R()*3, c=stoneC[(k+(s>0?2:0))%5]; const g=grp([s*(5+d/2),h/2,z],par); box(d,h,w,M(c,{r:.95}),[0,0,0],g); box(d+.3,.35,w+.3,M(c,{r:.95}),[0,h/2+.17,0],g);
      const dx=-s*(d/2+.02); box(.2,2.6,1.6,M(0x0a0806,{r:.9}),[dx,-h/2+1.3,w*.15],g); mesh(GEO('adr',()=>new THREE.CylinderGeometry(.8,.8,.2,14,1,false,0,Math.PI)),M(0x0a0806),[dx,-h/2+2.6,w*.15],g,m=>{ m.rotation.z=Math.PI/2; m.rotation.y=0; });
      const wm=M2(0xffc070,{e:0xffc070,ei:0}); box(.15,.8,.6,M(0x050403),[dx,h*.15,-w*.25],g); const wl=box(.1,.7,.5,wm,[dx*1.01,h*.15,-w*.25],g); L.win.push({wm,z,k});
      // hanging lantern
      const bm=M2(0xffd9a0,{e:0xffd9a0,ei:0,r:.4}); const lx=s*4.95, lz=z+w*.15+1.2; box(.12,.5,.12,M(0x0a0806),[lx,3.1,lz],par); sph(.16,bm,[lx,2.8,lz],par); const hl=halo(0xffc070,4.4,[lx,2.8,lz],par,0), pl=pool(0xffa850,10,[lx-s*1.2,0,lz],par,0); L.lamps.push({bm,hl,pl,z:lz}); }
    // palms
    const pg=new THREE.Group(); par.add(pg); L.palms=pg; for(let i=0;i<14;i++){ const s=i%2?1:-1, z=22-Math.floor(i/2)*11.5, x=s*(3.9+R()*.3); const p=grp([x,0,z],pg); const th=5+R()*1.5; for(let q=0;q<4;q++) cyl(.17-q*.012,.2-q*.012,th/4,M(0x2a2018,{r:.95}),[Math.sin(q*.4)*.12,q*th/4+th/8,0],p,m=>m.rotation.z=.05*q,8); const lm=M(0x0f2216,{r:.8,side:THREE.DoubleSide}); for(let f=0;f<9;f++){ const a=f/9*TAU, fr=mesh(GEO('frond',()=>{ const g=new THREE.PlaneGeometry(.55,3.3,1,5); const pp=g.attributes.position; for(let i2=0;i2<pp.count;i2++){ const y=pp.getY(i2)+1.65; pp.setZ(i2,-y*y*.12); pp.setY(i2,y); } g.computeVertexNormals(); return g; }),lm,[0,th,0],p); fr.rotation.set(-1.1,a,0,'YXZ'); fr.rotateY(0); fr.rotation.order='YXZ'; fr.rotation.y=a; fr.rotation.x=-Math.PI/2+.5+(f%2)*.2; } }
    // cloaks laid on the road
    const cg=new THREE.Group(); par.add(cg); L.cloaks=cg; const cc=[0x3a1a22,0x1a2a3a,0x4a3a1a,0x1f2f22,0x3a221a]; for(let i=0;i<22;i++){ const x=(R()-.5)*5.5, z=14-i*3.6; const m=mesh(GEO('cloak',()=>new THREE.PlaneGeometry(1.7,1.2)),M(cc[i%5],{r:.95}),[x,.03,z],cg,m=>{ m.rotation.x=-Math.PI/2; m.rotation.z=R()*3; }); }
    // gate of the city at the end of the street
    const gm=M(0x2b241e,{r:.9,fog:false}); for(const s of [-1,1]){ box(9,19,9,gm,[s*10.5,9.5,-82],par); box(10,1,10,gm,[s*10.5,19.5,-82],par); box(46,11,5,gm,[s*(15+23),5.5,-84],par); for(let q=0;q<9;q++) box(2,1.2,2,gm,[s*(16+q*5),11.6,-84],par); }
    box(12,6,9,gm,[0,16,-82],par); mesh(GEO('gate',()=>new THREE.CylinderGeometry(6,6,9,20,1,false,0,Math.PI)),gm,[0,11.5,-82],par,m=>{ m.rotation.x=Math.PI/2; m.rotation.z=0; m.scale.set(1,1,1); }); const gl=halo(0xffc070,50,[0,9,-90],par,0); L.gate=gl;
    // the city beyond (temple dome)
    const dm=M2(0xffd9a0,{e:0xffc070,ei:0,fog:false}); sph(9,dm,[0,13,-120],par,m=>m.scale.y=.8); box(30,8,14,gm,[0,4,-120],par); for(let i=0;i<10;i++) box(7,10+hash(i)*14,7,gm,[-40+i*9,6+hash(i)*7,-125-hash(i*3)*10],par); L.dome=dm;
    return L; };
  const a=build(ANC_R=grp(null,GS),false), b=build(ANC_M=grp(null,MIRG),true); ANC.L={a,b}; ANC_R.visible=ANC_M.visible=false; })();
var ANC_R,ANC_M; WORLDS.ancient={name:'ancient',r:ANC_R,m:ANC_M,x:[]};
function ancLight(o,t){ const A=ANC.L.a, B=ANC.L.b; for(const L of [A,B]){ lampUpdate(L.lamps,o.jz??1e9,o.dir||-1,o.all||0,o.trail??1,3.2); for(const w of L.win){ const dd=((o.jz??1e9)-w.z)*(o.dir||-1); w.wm.emissiveIntensity=Math.max(o.all||0,sm(-2,5,dd)*(o.trail??1)*.8)*3; }
    L.palms.visible=!!o.palms; L.cloaks.visible=!!o.cloaks;  L.gate.material.opacity=(o.gate||0)*.9; L.dome.emissiveIntensity=(o.gate||0)*2; } }
