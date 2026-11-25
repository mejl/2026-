// ===== crowds: baked morph-target people =====
const POSE={
  sitSlump:{sit:1,cross:true,hd:[.55,0,0],tr:[.32,0,0],aL:[.55,.12,1.3],aR:[.55,.12,1.3]},
  sitUp:{sit:1,cross:true,hd:[-.08,0,0],tr:[0,0,0],aL:[.4,.12,1.2],aR:[.4,.12,1.2]},
  sitArms:{sit:1,cross:true,hd:[-.4,0,0],tr:[-.08,0,0],aL:[2.7,.35,.15],aR:[2.7,.35,.15]},
  stSlump:{tr:[.3,0,0],hd:[.55,0,0],aL:[.05,.04,.1],aR:[.95,.2,1.5]},
  stUp:{tr:[-.03,0,0],hd:[-.38,0,0],aL:[.05,.06,.1],aR:[.95,.2,1.5]},
  stArms:{tr:[-.08,0,0],hd:[-.45,0,0],aL:[2.7,.42,.15],aR:[2.7,.42,.15],umb:0},
  stClosed:{tr:[-.03,0,0],hd:[-.38,0,0],aL:[.05,.06,.1],aR:[.05,.06,.1],umb:0},
  stOpen:{tr:[-.06,0,0],hd:[-.4,0,0],aL:[.5,1.15,.2],aR:[.5,1.15,.2],umb:0}
};
const CROWD={};
// women: scarf-covered and long-haired variants (muted colours), picked per crowd member
const FV_ROBE=[{fem:'scarf',cloth:0x3a2c34,robe:0x3a2c34,wrap:0x5a4658,sash:0x4e3e34},{fem:'hair',cloth:0x3a3226,robe:0x3a3226,sash:0x4a3a2e},{fem:'scarf',cloth:0x2a3440,robe:0x2a3440,wrap:0x465a6e,sash:0x403830}];
const FV_CITY=[{fem:'hair',hood:false,cloth:0x4a2a38,hair:0x2a1810},{fem:'hair',hood:false,cloth:0x2a3a4a,hair:0x1a1210},{fem:'hood',cloth:0x3a2a48}];
function buildCrowd(name,rigOpts,poseKeys,n,spec,parent,mirror,tints,femVars,femFrac){ const PS=poseKeys.map(k=>POSE[k]); let geo=figGeom(rigOpts,PS); if(femVars) geo=[geo].concat(femVars.map(v=>figGeom(Object.assign({},rigOpts,v),PS))); const specs=[]; for(let i=0;i<n;i++){ const sp=Object.assign({id:i+1},spec(i)); sp.f=femVars&&hash((sp.id||i)*5.17+2.3)<femFrac?1+Math.floor(hash((sp.id||i)*3.3+.7)*femVars.length):0; specs.push(sp); } const c=new Crowd(geo,specs,parent,mirror,tints); c.name=name; CROWD[name]=c; return c; }
// hillside: sitting crowd by the lake
(function(){ const sp=SEA.crowdSpots; const r=rng(8); const par=WORLDS.sea.r; const c=buildCrowd('hill',{style:'robe',cloth:0x2a2622,robe:0x2a2622,wrap:0x2c2a2e},['sitSlump','sitUp','sitArms'],sp.length,i=>({p:sp[i],ry:Math.PI/2+(r()-.5)*.8+((sp[i][2]>0)?-.25:.25)}),par,null,[0x8a7a6a,0xaa9a8a,0x7a6a5a,0x6a6a7a,0x9a8470,0x6a5c52],FV_ROBE,.5); c.items.forEach((it,i)=>{ const p=it.s.p; c.set(it,p[0],p[1],p[2],it.s.ry,[0,0],0); it.a.visible=false; }); })();
// ancient street crowd (also Jerusalem)
(function(){ const r=rng(41); const par=WORLDS.ancient.r; const c=buildCrowd('anc',{style:'robe',cloth:0x2d2620,robe:0x2d2620,wrap:0x3a3328},['stSlump','stUp','stArms'],64,i=>({id:i+30}),par,null,[0x8a7a6a,0xaa9a8a,0x7a6a5a,0x6a6a7a,0x9a8470,0x7a5a4a,0x5a6a7a],FV_ROBE,.5); c.items.forEach(it=>{ it.a.visible=false; }); })();
// modern city crowd (hoodies, coats; umbrellas)
(function(){ const par=WORLDS.city.r, mp=WORLDS.city.m; const c=buildCrowd('city',{style:'hood',cloth:0x2a3040,pants:0x14161e,umb:0x1a1c28},['stSlump','stUp','stArms','stClosed'],54,i=>({id:i+80}),par,mp,[0x9a9aaa,0x7a8aa0,0xaa8a8a,0x8a9a8a,0xb0a08a,0x6a7a9a,0xaa9ab0],FV_CITY,.42); c.items.forEach(it=>{ it.a.visible=false; if(it.b) it.b.visible=false; }); })();
function crowdShow(name,v){ const c=CROWD[name]; c.items.forEach(it=>{ it.a.visible=v; if(it.b) it.b.visible=v; }); }
