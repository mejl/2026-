// ===== people: sculpted figures (lofted smooth limbs, hands, faces, hair, cloth), posable rig, baked crowds, Jesus =====
const SKINC=0xa4744c, LITE=0xffe3b0;
const ROBET=ctex(64,128,(x,w,h)=>{ const g=x.createLinearGradient(0,0,0,h); g.addColorStop(0,'#f1dcae'); g.addColorStop(.5,'#e0b576'); g.addColorStop(1,'#b98040'); x.fillStyle=g; x.fillRect(0,0,w,h); for(let i=0;i<w;i++){ const a=.12+.12*Math.sin(i*1.7)*Math.sin(i*.43); x.fillStyle=`rgba(80,40,0,${Math.max(0,a)*.8})`; x.fillRect(i,0,1,h); } });
// loft: stack of elliptical rings (top -> bottom) skinned into one smooth mesh. s:{y,rx,rz,cx,cz,gap|a0,a1}
function loft(S,o={}){ const seg=o.seg||12, sc=o.scale||1, ns=S.length, fn=o.fn, full=!S.some(s=>s.a0!==undefined||s.gap);
  const P=[],U=[],I=[];
  for(let i=0;i<ns;i++){ const s=S[i], a0=s.a0!==undefined?s.a0:(s.gap||0), a1=s.a1!==undefined?s.a1:(TAU-(s.gap||0));
    for(let j=0;j<=seg;j++){ const a=a0+(a1-a0)*j/seg, f=fn?fn(a,s.y,i):1; P.push(((s.cx||0)+Math.sin(a)*s.rx*f)*sc,s.y*sc,((s.cz||0)+Math.cos(a)*s.rz*f)*sc); U.push(j/seg,1-i/(ns-1)); } }
  for(let i=0;i<ns-1;i++) for(let j=0;j<seg;j++){ const a=i*(seg+1)+j,b=a+1,c=a+seg+1,d=c+1; I.push(a,c,b,b,c,d); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2)); g.setIndex(I); g.computeVertexNormals();
  if(full){ const n=g.attributes.normal; for(let i=0;i<ns;i++){ const a=i*(seg+1), b=a+seg, x=n.getX(a)+n.getX(b), y=n.getY(a)+n.getY(b), z=n.getZ(a)+n.getZ(b), l=Math.hypot(x,y,z)||1; n.setXYZ(a,x/l,y/l,z/l); n.setXYZ(b,x/l,y/l,z/l); } }
  return g; }
// limb: profile [[t,rx,rz,cx,cz]] along length (downward from y=0), optional rounded end caps
function limbSecs(len,prof,c0=true,c1=true){ const S=[], f=prof[0], l=prof[prof.length-1];
  if(c0){ const m=Math.min(f[1],f[2]); for(let k=0;k<3;k++){ const a=(1-k/3)*Math.PI/2; S.push({y:Math.sin(a)*m*.62,rx:Math.cos(a)*f[1]+.0008,rz:Math.cos(a)*f[2]+.0008,cx:f[3]||0,cz:f[4]||0}); } }
  for(const p of prof) S.push({y:-p[0]*len,rx:p[1],rz:p[2],cx:p[3]||0,cz:p[4]||0});
  if(c1){ const m=Math.min(l[1],l[2]); for(let k=1;k<=3;k++){ const a=k/3*Math.PI/2; S.push({y:-len-Math.sin(a)*m*.8,rx:Math.cos(a)*l[1]+.0008,rz:Math.cos(a)*l[2]+.0008,cx:l[3]||0,cz:l[4]||0}); } }
  return S; }
function refine(S,n){ const R=[]; for(let i=0;i<S.length-1;i++){ const a=S[i], b=S[i+1]; for(let q=0;q<n;q++){ const t=q/n; R.push({y:lerp(a.y,b.y,t),rx:lerp(a.rx,b.rx,t),rz:lerp(a.rz,b.rz,t),cx:lerp(a.cx||0,b.cx||0,t),cz:lerp(a.cz||0,b.cz||0,t)}); } } R.push(S[S.length-1]); return R; }
function mkRig(o){
  const lo=!!o.lo, st=o.style||'coat', sc=o.scale||1, seg=lo?10:16, jes=st==='jesus', robe=jes||st==='robe', hoodie=st==='hood', coat=st==='coat';
  const cloth=o.cloth??0x1c2333, cloth2=o.cloth2??0x141a28, skin=o.skin??SKINC, hair=o.hair??0x14100e;
  const em=o.em||null; const mc=(c,extra={})=>M(c,Object.assign({r:.88},em?{e:em[0],ei:em[1]}:{},extra));
  const DS=THREE.DoubleSide;
  const mats={cloth:jes?M(0xe9dcbc,{r:.85,e:0xffe2b0,ei:.1}):mc(cloth), cloth2:jes?M(0xe0c690,{r:.85,e:0xffd08a,ei:.09}):mc(cloth2), skin:jes?M(0xa5724a,{r:.6,e:0xe0a064,ei:.13}):mc(skin,{r:.72}), hair:jes?M(0x2b1a10,{r:.6,side:DS}):mc(hair,{r:.8,side:DS}), pants:mc(o.pants??0x0e121b), shoe:mc(0x0a0b10,{r:.6}), eye:M(0x120d0b,{r:.4}), lip:jes?M(0x8a4a3e,{r:.55}):M(0x77443a,{r:.65}), sclera:M(0xd6cfc2,{r:.35}), beard:jes?M(0x3a2315,{r:.62,side:DS}):mc(hair,{r:.8,side:DS}), iris:M(0x2a170c,{r:.3}), catch:M(0xffffff,{e:0xffffff,ei:.9}), lid:M(jes?0x6e4630:new THREE.Color(skin).multiplyScalar(.72).getHex(),{r:.7}), nost:M(0x2a140c,{r:.8}), mouth:M(0x55261f,{r:.7})};
  const root=new THREE.Group(); const hips=grp([0,.93*sc,0],root); const R={root,hips,st,sc,mats,o}; const k=x=>x*sc;
  const L=(n,S,opt,mat,p,par,cb)=>mesh(GEO(`${n}|${st}|${sc}|${seg}`,()=>loft(S,Object.assign({seg,scale:sc},opt))),mat,p?[k(p[0]),k(p[1]),k(p[2])]:null,par,cb);
  // ---- torso (chest, waist, shoulders slope) ----
  const torso=grp([0,0,0],hips); R.torso=torso; const bk=hoodie?1.1:coat?1.08:jes?.94:1; const b=(x)=>x*bk;
  const TS=[{y:.585,rx:.004,rz:.004},{y:.572,rx:.062,rz:.056},{y:.55,rx:.125,rz:.078},{y:.525,rx:.19,rz:.096},{y:.495,rx:b(.212),rz:b(.112)},{y:.42,rx:b(.192),rz:b(.122)},{y:.3,rx:b(.172),rz:b(.116)},{y:.18,rx:b(.152),rz:b(.102)},{y:.06,rx:b(.162),rz:b(.106)},{y:-.04,rx:b(.172),rz:b(.112)}];
  if(robe){ TS.push({y:-.17,rx:.19,rz:.126},{y:-.171,rx:.002,rz:.002}); }
  else if(hoodie){ TS.push({y:-.12,rx:b(.178),rz:b(.122)},{y:-.2,rx:b(.182),rz:b(.126)},{y:-.201,rx:.002,rz:.002}); }
  else { TS.push({y:-.14,rx:b(.19),rz:b(.13)},{y:-.24,rx:b(.205),rz:b(.145)},{y:-.34,rx:b(.22),rz:b(.155)},{y:-.341,rx:.002,rz:.002}); }
  L('torso',TS,{},mats.cloth,[0,0,0],torso);
  if(hoodie||coat){ L('collar',[{y:.63,rx:.1,rz:.095},{y:.585,rx:.128,rz:.118},{y:.53,rx:.17,rz:.135},{y:.5,rx:.2,rz:.14}],{},mats.cloth,[0,0,0],torso); }
  // pelvis (trousered styles)
  if(!robe) L('pelvis',[{y:.07,rx:.15,rz:.1},{y:-.02,rx:.17,rz:.11},{y:-.1,rx:.165,rz:.11},{y:-.16,rx:.12,rz:.09},{y:-.185,rx:.004,rz:.004}],{},mats.pants,[0,0,0],hips);
  if(jes){ L('sash',[{y:.075,rx:.163,rz:.108},{y:.068,rx:.178,rz:.12},{y:-.02,rx:.18,rz:.122},{y:-.027,rx:.163,rz:.108}],{},M(0x8a5a2a,{r:.6,e:0x8a5a2a,ei:.35}),[0,0,0],torso); }
  if(jes){ const sw=M(0xf6f1e4,{r:.92,e:0xffe8c0,ei:.08,side:DS}), bl=M(0x1c3d86,{r:.7,e:0x4a78d8,ei:.12,side:DS}); mats.shawl=sw; mats.blue=bl;
    const wv=(a,y)=>1+.02*Math.sin(a*9+y*14);
    const SW=[[.584,.074,.068,.95],[.572,.092,.078,.9],[.55,.146,.097,.85],[.525,.207,.114,.8],[.495,.214,.128,.85],[.42,.205,.138,1.0],[.3,.192,.132,1.15],[.18,.178,.12,1.3],[.08,.18,.122,1.45],[.06,.18,.122,1.48]];
    L('shawl',SW.map(([y,rx,rz,g])=>({y,rx,rz,gap:g})),{fn:wv},sw,[0,0,0],torso);
    for(const [y0,y1] of [[.09,.108],[.066,.079]]) L('shb'+y0,[{y:y1,rx:.1815,rz:.1235,gap:1.46},{y:y0,rx:.1815,rz:.1235,gap:1.47}],{fn:wv},bl,[0,0,0],torso);
    for(const sd of [1,-1]) L('she'+sd,SW.map(([y,rx,rz,g])=>sd>0?{y,rx:rx+.002,rz:rz+.002,a0:g-.015,a1:g+.05}:{y,rx:rx+.002,rz:rz+.002,a0:TAU-g-.05,a1:TAU-g+.015}),{fn:wv},bl,[0,0,0],torso);
    for(const sd of [-1,1]){ const tg=grp([k(sd*.18),k(.06),k(.012)],torso); for(let i=0;i<5;i++) cyl(.0016*sc,.0016*sc,.1*sc,sw,[(i-2)*.004*sc,-.05*sc,(i%2?.003:-.003)*sc],tg,m=>{ m.rotation.z=(i-2)*.05; },4); sph(.0065*sc,sw,[0,.002*sc,0],tg); } }
  // ---- neck + head ----
  L('neck',limbSecs(.16,[[0,.05,.05],[1,.054,.054]],false,false),{},mats.skin,[0,.68,0],torso);
  const head=grp([0,k(.6),0],torso); head.scale.setScalar(1.04); R.head=head;
  L('head',[{y:.272,rx:.002,rz:.002,cz:-.012},{y:.262,rx:.05,rz:.062,cz:-.014},{y:.24,rx:.08,rz:.092,cz:-.012},{y:.21,rx:.094,rz:.104,cz:-.01},{y:.18,rx:.1,rz:.108,cz:-.006},{y:.15,rx:.098,rz:.106,cz:-.002},{y:.12,rx:.088,rz:.099,cz:.002},{y:.09,rx:.072,rz:.09,cz:.006},{y:.062,rx:.054,rz:.076,cz:.012},{y:.038,rx:.038,rz:.056,cz:.02},{y:.02,rx:.02,rz:.036,cz:.026},{y:.012,rx:.002,rz:.003,cz:.028}],{},mats.skin,[0,0,0],head);
  const dot=(r,m,p,s,ws=8,hs=6)=>mesh(GEO(`d${r}|${ws}|${sc}`,()=>new THREE.SphereGeometry(r*sc,ws,hs)),m,[k(p[0]),k(p[1]),k(p[2])],head,mm=>mm.scale.set(s[0],s[1],s[2]));
  // ---- face: nose, eyes (sclera + iris + lids), brows, ears, lips ----
  { const nose=(x,y,z,r,sv)=>dot(r,mats.skin,[x,y,z],sv);
    nose(0,.146,.098,.0122,[.7,1.9,1.1]); nose(0,.114,.1035,.0108,[.9,.9,1.0]);
    for(const sd of [-1,1]){ nose(sd*.0095,.111,.0975,.0066,[1,.8,.9]); }
    if(lo){ for(const sd of [-1,1]) dot(.0115,mats.eye,[sd*.034,.166,.092],[1.25,.85,.7],5,4); }
    else { for(const sd of [-1,1]){
        dot(.0128,mats.sclera,[sd*.034,.166,.0905],[1.3,.78,.62],10,8);
        dot(.0072,mats.iris,[sd*.034,.166,.0985],[1,1,.45],10,8);
        dot(.0026,mats.catch,[sd*.0316,.1685,.1008],[1,1,.6],6,4);
        box(k(.031),k(.0042),k(.0075),mats.lid,[k(sd*.034),k(.1755),k(.0945)],head,m=>{ m.rotation.z=sd*-.06; });
        box(k(.036),k(.006),k(.0085),mats.hair,[k(sd*.037),k(.1925),k(.097)],head,m=>{ m.rotation.z=sd*-.17; });
        dot(.014,mats.skin,[sd*.099,.138,-.008],[.6,1.8,1.25]); }
      dot(.0105,mats.lip,[0,.0745,.0885],[1.9,.48,.7]); dot(.0115,mats.lip,[0,.0585,.083],[1.75,.55,.75]);
      box(k(.032),k(.0028),k(.005),mats.mouth,[0,k(.066),k(.0925)],head); } }
  const CAP=e=>[{y:.288+e,rx:.002,rz:.002,cz:-.012},{y:.272+e,rx:.052+e,rz:.068+e,cz:-.016},{y:.246+e,rx:.082+e,rz:.1+e,cz:-.016},{y:.215+e,rx:.094+e,rz:.114+e,cz:-.014,gap:.5},{y:.186+e,rx:.098+e,rz:.113+e,cz:-.017,gap:1.15},{y:.15,rx:.1+e,rz:.108+e,cz:-.022,gap:1.95}];
  if(jes){
    // long, wavy, centre-parted dark-brown hair (two halves) + trimmed full beard and moustache
    const hw=(a,y)=>1+.06*Math.sin(y*30+a*2.5)*clamp((.2-y)/.3)+.04*Math.sin(a*8-y*14);
    const HS=[[.29,.002,.002,-.012,0],[.276,.058,.072,-.014,.12],[.25,.088,.1,-.016,.26],[.22,.102,.114,-.014,.55],[.19,.107,.119,-.014,1.0],[.16,.108,.118,-.02,1.4],[.12,.112,.122,-.03,1.62],[.075,.118,.124,-.045,1.75],[.025,.126,.122,-.06,1.85],[-.03,.138,.124,-.07,1.95],[-.09,.148,.118,-.076,2.1],[-.15,.156,.108,-.068,2.3],[-.2,.158,.096,-.05,2.55],[-.225,.14,.075,-.035,2.85],[-.245,.08,.04,-.02,3.05],[-.255,.02,.01,0,3.1]];
    for(const sd of [1,-1]) L('hair'+(sd>0?'R':'L'),HS.map(([y,rx,rz,cz,a0])=>sd>0?{y,rx,rz,cz,a0,a1:Math.PI}:{y,rx,rz,cz,a0:-Math.PI,a1:-a0}),{fn:hw},mats.hair,[0,0,0],head);
    const hb=y=>{ let i=0; while(i<HS.length-2&&y<HS[i+1][0]) i++; const A=HS[i], B=HS[i+1], t=clamp((A[0]-y)/(A[0]-B[0])); return {rx:lerp(A[1],B[1],t),rz:lerp(A[2],B[2],t),cz:lerp(A[3],B[3],t)}; };
    const lock=(nm,sd,y0,y1,a0,a1,off,ph,flare)=>{ const S=[]; const n=7; for(let i=0;i<=n;i++){ const t=i/n, y=lerp(y0,y1,t), q=hb(y), e=1-Math.pow(Math.max(0,(t-.78)/.22),2)*.6; S.push({y,rx:(q.rx+off)*e+flare*t*t*.02,rz:(q.rz+off)*e+flare*t*t*.012,cz:q.cz+(flare?t*t*.025:0),a0:sd>0?a0:-a1,a1:sd>0?a1:-a0}); } L(nm+sd,S,{fn:(a,y)=>1+.05*Math.sin(y*26+a*3+ph)+.035*Math.sin(a*10+ph)},mats.hair,[0,0,0],head); };
    for(const sd of [1,-1]){ lock('lkA',sd,.16,-.27,1.5,2.35,.014,0,1); lock('lkB',sd,.12,-.3,2.3,3.1,.012,2,1); lock('lkC',sd,.2,-.2,1.05,1.7,.01,4,0); }
    { const hcs=[0x2b1a10,0x36231a,0x24150d,0x3d281c].map(c=>M(c,{r:.6,side:DS}));
      for(let i=0;i<13;i++){ const aC=2.15+i*(2.0/12), w=.34, y0=.2, y1=-.23-.14*Math.abs(Math.sin(i*2.7+1)), S=[], n=7;
        for(let j=0;j<=n;j++){ const t=j/n, y=lerp(y0,y1,t), q=hb(y), e=1-Math.pow(Math.max(0,(t-.72)/.28),2)*.7;
          const et=clamp(t/.32), of=(.016+(i%3)*.007)*et; S.push({y,rx:(q.rx+of)*e,rz:(q.rz+of)*e,cx:.012*Math.sin(y*22+i*1.3),cz:q.cz+t*t*.03*(i%2?1:.6),a0:aC-w/2,a1:aC+w/2}); }
        L('bst'+i,S,{fn:(a,y)=>1+.03*Math.sin(a*14+y*30+i)},hcs[i%4],[0,0,0],head); } }
    const BS=[[.13,.096,.106,0,.95,2.15],[.1,.09,.102,.004,.8,2.0],[.085,.082,.098,.006,.36,1.95],[.06,.07,.09,.012,.34,1.85],[.04,.056,.078,.02,0,1.75],[.015,.05,.07,.028,0,1.65],[-.01,.045,.062,.036,0,1.5],[-.03,.036,.052,.042,0,1.25],[-.044,.025,.038,.046,0,.9],[-.052,.014,.022,.048,0,.5],[-.056,.004,.008,.048,0,.15]];
    for(const sd of [1,-1]) L('beard'+(sd>0?'R':'L'),BS.map(([y,rx,rz,cz,g,e])=>sd>0?{y,rx,rz,cz,a0:g,a1:e}:{y,rx,rz,cz,a0:-e,a1:-g}),{seg:26,fn:(a,y)=>1+.035*Math.sin(a*11+y*40)+.02*Math.sin(a*4.3-y*25)},mats.beard,[0,0,0],head);
    for(const sd of [-1,1]) dot(.0098,mats.beard,[sd*.0145,.0845,.0945],[2.0,.6,.8],8,6).rotation.z=sd*.2;
  } else if(hoodie&&o.hood!==false){
    L('hood',[{y:.315,rx:.002,rz:.002,cz:-.03},{y:.3,rx:.075,rz:.088,cz:-.03},{y:.262,rx:.116,rz:.138,cz:-.03,gap:.3},{y:.2,rx:.134,rz:.154,cz:-.036,gap:.85},{y:.12,rx:.13,rz:.15,cz:-.032,gap:1.0},{y:.04,rx:.122,rz:.13,cz:-.03,gap:.8},{y:-.03,rx:.124,rz:.108,cz:-.02,gap:.25}],{},mc(cloth,{side:DS}),[0,0,0],head);
  } else if(hoodie||coat){ const hf=(a,y)=>1+.05*Math.sin(a*9+y*30)*clamp((y-.1)/.2)+.02*Math.sin(a*5-y*22);
    L('hair',CAP(.013),{fn:hf},mats.hair,[0,0,0],head);
    L('hairback',[{y:.2,rx:.106,rz:.116,cz:-.014,gap:1.55},{y:.12,rx:.11,rz:.12,cz:-.03,gap:1.75},{y:.05,rx:.1,rz:.104,cz:-.04,gap:1.95},{y:0,rx:.07,rz:.06,cz:-.04,gap:2.2},{y:-.02,rx:.02,rz:.02,cz:-.04,gap:2.6}],{fn:hf},mats.hair,[0,0,0],head); }
  else if(robe){ const wm=M(o.wrap??0x2b2a33,{r:.9,side:DS}); const wf=(a,y)=>1+.07*Math.sin(a*6+y*22)*clamp((.25-y)/.3)+.035*Math.sin(a*11-y*15);
    L('wrap',CAP(.018).map((s,i)=>i>=3?Object.assign({},s,{gap:s.gap-.12}):s),{fn:wf},wm,[0,0,0],head);
    L('wrapback',[{y:.21,rx:.118,rz:.13,cz:-.016,gap:1.42},{y:.12,rx:.128,rz:.138,cz:-.03,gap:1.5},{y:.03,rx:.148,rz:.134,cz:-.05,gap:1.62},{y:-.05,rx:.17,rz:.118,cz:-.06,gap:1.85},{y:-.11,rx:.188,rz:.1,cz:-.055,gap:2.15},{y:-.15,rx:.17,rz:.07,cz:-.04,gap:2.55},{y:-.165,rx:.08,rz:.035,cz:-.03,gap:2.9}],{fn:wf},wm,[0,0,0],head); }
  // ---- arms ----
  R.sh=[]; R.el=[]; R.hd=[]; const sl=jes?1.04:robe?1.0:1;
  for(const sd of [-1,1]){ const sh=grp([sd*k(jes?.205:.2),k(.485),0],torso);
    L('uarm',limbSecs(.3,[[0,.057*sl,.057*sl],[.5,.048*sl,.048*sl],[1,.041*sl,.041*sl]]),{},mats.cloth,[0,0,0],sh);
    const el=grp([0,k(-.3),0],sh);
    L('farm',limbSecs(.27,jes?[[0,.042*sl,.042*sl],[.4,.05*sl,.05*sl],[1,.058,.05]]:[[0,.041*sl,.041*sl],[.3,.045*sl,.045*sl],[1,.031*sl,.031*sl]]),{},mats.cloth,[0,0,0],el);
    const hd=grp([0,k(-.285),0],el);
    L('palm',limbSecs(.085,[[0,.03,.016],[.5,.034,.0175],[1,.029,.014]],true,false),{},mats.skin,[0,0,0],hd);
    if(!lo){ L('fing',limbSecs(.085,[[0,.029,.0125,0,0],[.45,.027,.0115,0,.012],[1,.02,.009,0,.03]]),{},mats.skin,[0,-.085,0],hd);
      L('thumb',limbSecs(.05,[[0,.0115,.0115],[1,.008,.008]]),{},mats.skin,[-sd*.032,-.012,.012],hd,m=>{ m.rotation.x=-.45; m.rotation.z=sd*.25; }); }
    else L('fing',limbSecs(.07,[[0,.03,.011],[1,.02,.008]]),{},mats.skin,[0,-.085,.008],hd);
    R.sh.push(sh); R.el.push(el); R.hd.push(hd); }
  // ---- legs ----
  R.lg=[]; R.kn=[]; R.ft=[]; const lm=robe?mats.cloth2:mats.pants;
  for(const sd of [-1,1]){ const lg=grp([sd*k(.095),0,0],hips);
    L('thigh',limbSecs(.44,robe?[[0,.07,.072],[.3,.064,.066],[1,.055,.057]]:[[0,.086,.088],[.3,.077,.08],[1,.058,.06]]),{},lm,[0,0,0],lg);
    const kn=grp([0,k(-.44),0],lg);
    L('calf',limbSecs(.43,[[0,.058,.06],[.22,.066,.07],[.7,.045,.05],[1,.034,.036]]),{},lm,[0,0,0],kn);
    const ft=grp([0,k(-.43),0],kn); const sm_=robe?mats.skin:mats.shoe;
    mesh(GEO(`shoe|${sc}|${seg}`,()=>{ const g=loft([{y:.13,rx:.004,rz:.004},{y:.118,rx:.03,rz:.022},{y:.07,rx:.043,rz:.032},{y:.0,rx:.041,rz:.037,cz:.0},{y:-.05,rx:.034,rz:.04},{y:-.076,rx:.022,rz:.03},{y:-.086,rx:.003,rz:.004}],{seg:Math.max(8,seg*.75|0),scale:sc}); g.rotateX(Math.PI/2); return g; }),sm_,[0,k(-.018),k(.045)],ft);
    R.lg.push(lg); R.kn.push(kn); R.ft.push(ft); }
  // ---- long robe skirt (deformable, swings as he walks) ----
  if(robe){ const rseg=lo?12:30, bt=jes?1:.82;
    const S=refine([{y:.42,rx:.205,rz:.14},{y:.3,rx:.205,rz:.145},{y:.1,rx:.22,rz:.16},{y:-.1,rx:.24+.0*bt,rz:.185},{y:-.3,rx:.27*bt+.03,rz:.22*bt+.03},{y:-.42,rx:.3*bt+.02,rz:.25*bt+.02}],lo?1:3);
    const fn=(a,y)=>1+(jes?.05:.035)*Math.sin(a*7+y*2.2)*(.35+.65*clamp((.42-y)/.84))+(jes?.03:.02)*Math.sin(a*13-y*3)*clamp((.3-y)/.7);
    const g=loft(S,{seg:rseg,scale:sc,fn}); const rm=mesh(g,jes?M(0xffffff,{r:.85,map:ROBET,em:ROBET,e:0xffffff,ei:.2,side:DS}):M(o.robe??cloth,{r:.9,side:DS,e:em?em[0]:0,ei:em?em[1]:0}),[0,k(-.46),0],hips); R.robe=rm; R.robeBase=Float32Array.from(g.attributes.position.array); }
  if(o.umb){ const ug=grp([0,k(-.04),k(.012)],R.hd[1]); mesh(GEO('umbc',()=>new THREE.ConeGeometry(.62*sc,.26*sc,16)),M(o.umb,{r:.7,side:DS}),[0,k(.93),0],ug); cyl(.011*sc,.011*sc,.93*sc,M(0x111111),[0,k(.465),0],ug,null,5); R.umb=ug; }
  if(o.staff){ R.staff=cyl(.02,.02,1.5,M(0x3a2a1a,{r:.8}),[.42,.75,.28],root,null,6); }
  if(o.crutch){ R.staff=cyl(.022,.022,1.25,M(0x3a2a1a,{r:.8}),[-.3,.62,.12],root,null,6); box(.22,.03,.03,M(0x3a2a1a),[0,.6,0],R.staff); }
  if(o.extra) o.extra(R);
  return R;
}
// pose: {walk:phase,wa:amount, y, sit:0..1, lean, tr:[pitch,roll,yaw], hd:[pitch,yaw,roll], aL:[fwd,out,elbow] (side x<0), aR, lgL:[hip,knee], lgR, robe:scaleY, sway:t}
const SPQ1=new THREE.Quaternion(), SPQ2=new THREE.Quaternion(), SPQF=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI);
function setPose(R,p,t=0){
  const sc=R.sc, wk=p.walk||0, wa=p.wa||0, sit=p.sit||0, kneel=p.kneel||0;
  R.root.position.y=(p.y||0)*1; const hy=.93*sc;
  R.hips.position.y=hy-(sit?((p.cross?(hy-.15*sc):.5*sc)*sit):0)-(kneel?.42*sc*kneel:0)-(p.crouch?(p.crouch*.28*sc):0);
  R.hips.position.y-=.02*wa*Math.abs(Math.cos(wk))*(sit||kneel?0:1); R.hips.rotation.x=0; R.hips.rotation.y=.07*wa*Math.sin(wk)*(sit||kneel?0:1);
  const sA=Math.sin(wk), cA=Math.cos(wk);
  let thL=-.5*wa*sA, thR=.5*wa*sA, knL=Math.max(0,cA)*.9*wa, knR=Math.max(0,-cA)*.9*wa;
  if(sit){ const s=sit; thL=thR=lerp(thL,-1.5,s); knL=knR=lerp(knL,1.5,s); if(p.cross){ thL=-1.0; thR=-1.0; knL=2.3; knR=2.3; } }
  if(kneel){ thL=lerp(thL,-.15,kneel); thR=lerp(thR,-1.45,kneel); knL=lerp(knL,2.3,kneel); knR=lerp(knR,1.5,kneel); }
  if(p.crouch){ thL=thR=-p.crouch*1.1; knL=knR=p.crouch*1.7; }
  const spr=p.spread||(sit&&p.cross?.45*sit:0); R.lg[0].rotation.z=-spr; R.lg[1].rotation.z=spr;
  if(p.lgL){ thL=p.lgL[0]; knL=p.lgL[1]; } if(p.lgR){ thR=p.lgR[0]; knR=p.lgR[1]; }
  R.lg[0].rotation.x=thL; R.kn[0].rotation.x=knL; R.lg[1].rotation.x=thR; R.kn[1].rotation.x=knR; if(R.ft){ const fl=(th,kn)=>clamp(-(th+kn)*.55+(wa&&!sit&&!kneel?.12:0),-.65,.55); R.ft[0].rotation.x=fl(thL,knL); R.ft[1].rotation.x=fl(thR,knR); }
  const tr=p.tr||[0,0,0]; R.torso.rotation.set(tr[0]+(p.lean||0),(tr[2]||0)-.09*wa*sA*(sit||kneel?0:1),tr[1]||0);
  const hd=p.hd||[0,0,0]; R.head.rotation.set(hd[0],hd[1],hd[2]);
  let aL=p.aL||[0,.06,.12], aR=p.aR||[0,.06,.12];
  if(wa&&!p.aL) aL=[wa*.45*sA,.06,.18+.2*wa]; if(wa&&!p.aR) aR=[-wa*.45*sA,.06,.18+.2*wa];
  R.sh[0].rotation.set(-aL[0],0,-aL[1]); R.el[0].rotation.x=-aL[2]; R.sh[1].rotation.set(-aR[0],0,aR[1]); R.el[1].rotation.x=-aR[2];
  if(R.staff){ const f=p.sf||0; R.staff.position.set(R.staff.userData.x0??(R.staff.userData.x0=R.staff.position.x)+0,0,0); const x0=R.staff.userData.x0; R.staff.position.set(x0+(x0>0?.35:-.2)*f,lerp(R.staff.geometry.parameters.height/2,.03,f),.28); R.staff.rotation.z=(x0>0?-1:1)*f*1.5; }
  if(R.umb){ const u=p.umb??1; R.umb.scale.set(.1+.9*u,.9+u*.1,.1+.9*u); R.root.updateMatrixWorld(true); const q1=SPQ1, q2=SPQ2; R.umb.parent.getWorldQuaternion(q1); R.root.getWorldQuaternion(q2); R.umb.quaternion.copy(q1.invert().multiply(q2)); if(u<.5) R.umb.quaternion.multiply(SPQF); else if(p.umbT) R.umb.rotateZ(p.umbT); }
  if(R.ft&&R.robe) R.ft.forEach(f=>f.visible=!(p.sit&&p.cross));
  if(R.robe){ R.robe.rotation.x=0; const ry=p.robe??1; R.robe.scale.y=lerp(1,ry,1); R.robe.position.y=-.46*sc*ry+(1-ry)*0; if(p.sit&&p.cross){ R.robe.scale.set(1.6,.36,1.45); R.robe.position.y=-.03*sc; } else if(p.kneel&&R.st==='jesus'){ const sy=.64, th=.45, half=.42*sc*sy; R.robe.scale.set(1.1,sy,1.2); R.robe.rotation.x=th; R.robe.position.set(0,.04*sc-half*Math.cos(th),-half*Math.sin(th)); } else if(p.sit&&!p.cross&&R.st==='jesus'){ const sy=.72, th=-1.15, half=.42*sc*sy; R.robe.scale.set(1.05,sy,1.12); R.robe.rotation.x=th; R.robe.position.set(0,.04*sc-half*Math.cos(th),-half*Math.sin(th)); }
    const pa=R.robe.geometry.attributes.position, b=R.robeBase, amp=(R.st==='jesus'?.1:.05)*(.3+(wa||0)), n=pa.count, h=.84*sc;
    for(let i=0;i<n;i++){ const bx=b[i*3], by=b[i*3+1], bz=b[i*3+2], d=clamp((h/2-by)/h); const sw=Math.sin(wk*1+by*3.1+t*1.7)*amp*d*d, sw2=Math.cos(wk*.5+by*2.3+t*1.1)*amp*.6*d*d; pa.array[i*3]=bx*(1+sw*.8)+sw2*.5; pa.array[i*3+2]=bz*(1+sw*.8)-sw*.6-(wa?amp*d*d*.8:0); }
    pa.needsUpdate=true; }
}
class Donkey{ constructor(){ const mk=(par)=>{ const g=grp(null,par);
    const hide=M(0x74685e,{r:.92}), belly=M(0xb4a999,{r:.92}), dark=M(0x37312c,{r:.9}), hoof=M(0x201d1a,{r:.8}), cloth=M(0x8c3a2e,{r:.9}), trim=M(0xd0a24a,{r:.8});
    const S=(r,c,p,sx,sy,sz,rx=0,rz=0)=>sph(r,c,p,g,m=>{ m.scale.set(sx,sy,sz); m.rotation.x=rx; m.rotation.z=rz; },22,16);
    S(.3,hide,[0,.97,.02],.92,.98,2.1); S(.31,hide,[0,.99,.44],1,1.02,1.08); S(.3,hide,[0,.99,-.45],1,1.04,1.02); S(.22,belly,[0,.8,.02],1.05,.62,2.1);
    box(.06,.025,1.2,dark,[0,1.285,0],g); box(.5,.025,.06,dark,[0,1.27,.4],g);
    caps(.135,.36,hide,[0,1.3,.72],g,m=>m.rotation.x=.82);
    S(.17,hide,[0,1.52,1.02],.92,.95,1.55,.42); S(.105,belly,[0,1.43,1.26],.95,.85,1.3,.6); S(.03,dark,[0,1.4,1.37],1.2,.8,.9);
    for(const sd of [-1,1]){ cyl(.012,.052,.34,hide,[sd*.082,1.74,.94],g,m=>{ m.rotation.x=-.12; m.rotation.z=sd*-.3; },8); cyl(.006,.03,.26,dark,[sd*.082,1.72,.955],g,m=>{ m.rotation.x=-.12; m.rotation.z=sd*-.3; },8); sph(.022,dark,[sd*.125,1.54,1.05],g); }
    for(let i=0;i<7;i++) box(.035,.11,.05,dark,[0,1.62-i*.065,.86-i*.1],g,m=>m.rotation.x=.78);
    caps(.026,.46,dark,[0,.86,-.74],g,m=>m.rotation.x=-.28); sph(.055,dark,[0,.58,-.84],g,m=>m.scale.set(1,1.6,1));
    // saddle blanket draped over the back
    box(.66,.045,.7,cloth,[0,1.3,.02],g); for(const sd of [-1,1]){ box(.045,.4,.7,cloth,[sd*.325,1.12,.02],g,m=>m.rotation.z=sd*.2); box(.05,.06,.72,trim,[sd*.355,.93,.02],g,m=>m.rotation.z=sd*.2); }
    box(.68,.05,.05,trim,[0,1.3,.38],g); box(.68,.05,.05,trim,[0,1.3,-.34],g);
    const L=[]; for(const [sx,sz] of [[-1,1],[1,1],[-1,-1],[1,-1]]){ const lg=grp([sx*.17,.85,sz*.43],g); cyl(.095,.06,.44,hide,[0,-.2,0],lg); cyl(.052,.04,.42,hide,[0,-.58,0],lg); cyl(.056,.062,.075,hoof,[0,-.82,0],lg); L.push(lg); } g.userData.L=L; return g; }; this.r=mk(GS); this.m=mk(MIRG); this.show(false); ACTORS.push(this); }
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

// keep Jesus from clipping to white when the shot's exposure is pushed high
function dimJes(k){ for(const R of [JES.r,JES.m]){ const ms=[R.mats.cloth,R.mats.cloth2,R.mats.skin,R.mats.hair,R.mats.shawl,R.mats.blue,R.mats.lip,R.mats.sclera,R.robe&&R.robe.material]; for(const m of ms){ if(!m) continue; const b=m.userData.jb||(m.userData.jb={c:m.color.clone(),e:m.emissiveIntensity}); m.color.copy(b.c).multiplyScalar(k); m.emissiveIntensity=b.e*k; } } }
