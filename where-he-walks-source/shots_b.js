// ===== VERSE 1 (Galilee) + CHORUS 2 (the village) =====
const SHORE_X=-5.4;
function galilee(o={}){ stage('sea'); base({hemi:o.hemi??.5,moon:o.moon??.7,fog:0x0a1420,fd:o.fd??.007,mc:0x7f9bd0}); DOME.show(true); DOME.set(o.top??'#03060c',o.mid??'#0a1420',o.hor??'#1c2e40',o.stars??.5,o.moonOp??.8,[160,75,-110]); MOON.position.set(160,60,-90); MOON.intensity=o.moon??1.1; MOON.color.set(0xa8c0f0); GLIT.visible=(o.moonOp??.8)>.2; GLIT.material.opacity=.5*(o.moonOp??.8); }
const GLIT=(()=>{ const m=halo(0xbcd0ff,1,[150,1.5,-95],GS,.5); m.scale.set(26,70,1); m.center.set(.5,1); hide(m); return m; })();
const SKYG=(()=>{ const a=[[-60,80,-120,0x4a5aa8,260],[40,120,-160,0x7a4aa8,300],[0,50,-200,0x3a8ac8,320]].map(([x,y,z,c,s])=>halo(c,s,[x,y,z],GS,0)); hide(...a); return a; })();
const JZ3=t=>20-JV*(t-57.5);
SC.v1a=function(lt,len,t){ galilee({}); const u=lt/len, jz=JZ3(t); SEA.update(t,.3); SEA.boatSet(55,-24,t,.3); jes(SHORE_X,jz,Math.PI,t); jlight(SHORE_X,1.5,jz-.5,28); footprints(t,57.5,SHORE_X,20,JV,-1,3); rain(t,.5,-8,jz,[[SHORE_X,1.4,jz,5,[1,.78,.42],1.2]]);
  camMove(u,[-16,2.2,jz+14,-5,1.5,jz-6,42],[-12,1.7,jz+8,-5,1.5,jz-8,38],'lin'); return {bloom:.6,warm:.12,rays:[W*.55,H*.55,.3]}; };
SC.v1b=function(lt,len,t){ galilee({stars:.7}); const u=lt/len, jz=JZ3(t); SEA.update(t,.25); SEA.boatSet(52,jz-30,t,.25); jes(SHORE_X,jz,Math.PI,t); jlight(SHORE_X+.6,1.4,jz-.2,28); footprints(t,57.5,SHORE_X,20,JV,-1,3); rain(t,.25,-6,jz,[[SHORE_X,1.4,jz,5,[1,.78,.42],1.2]]);
  camMove(u,[-14,1.3,jz+3,-3,1.6,jz-1.5,38],[-13,1.5,jz+0,3,2.0,jz-3,34],'lin'); return {bloom:.6,warm:.15,rays:[W*.5,H*.5,.3]}; };
function voidBase(o={}){ stage('void'); base({hemi:o.hemi??.15,moon:0,fill:0,fd:.01,fog:0x03040a,hc:0x405070}); GS.fog.density=o.fd??.01; }
SC.v1c=function(lt,len,t){ voidBase({}); const u=lt/len, sc=VOID.scroll; sc.visible=true; sc.position.set(0,.03,0); VOID.parchM.emissiveIntensity=.12+.35*sm(.1,.9,u); jlight(0,.7,.25,1.1*(.5+.5*sm(0,.6,u)),0xffd9a0);
  VOID.letters.forEach(m=>{ m.visible=true; const d=m.userData, p=((t*.28+d.ph)%1), y=.05+p*1.25, a=Math.sin(p*Math.PI); m.position.set(d.x*.55*(1+p*.5)+Math.sin(t*1.3+d.i)*.03,y*.8,d.z*.8+.02+p*.15); m.lookAt(GC.position); m.material.opacity=a*sm(.0,.5,u)*.95; m.scale.setScalar(.9+p*.9); });
  camMove(u,[.0,.95,.62,0,.12,0,34],[.08,.78,.52,0,.22,0,30]); rain(t,0,0,0,null); return {bloom:.9,warm:.35,rays:[W*.5,H*.45,.25],grain:.1}; };
SC.v1d=function(lt,len,t){ galilee({top:'#02030a',mid:'#080e18',hor:'#14202e',stars:0,moonOp:0}); const u=lt/len, calm=sm(1.6,3,lt), A=lerp(1.4,.03,calm); SEA.update(t,A); const bx=44+Math.sin(t*.5)*2; SEA.boatSet(bx,-12,t,A);
  const fl=(Math.sin(t*5.3)>.8&&calm<1)?1:0; SEA.bolt(Math.floor(t*5.3),fl*(1-calm)); HEMI.intensity=.5+fl*3*(1-calm); GS.fog.color.set(fl?0x405a78:0x0a1420);
  jes(SHORE_X,0,Math.PI/2,t,{walk:0,wa:0,aR:[1.0+1.4*sm(1.2,2,lt),.5,.3],aL:[.1,.08,.15]}); JES.set(SHORE_X,.1,0,Math.PI/2,{aR:[lerp(.2,2.9,sm(1,1.8,lt)),.15,.1],aL:[.1,.08,.15]},t); jlight(SHORE_X+1,1.8,0,lerp(20,70,calm)); DOME.set('#02030a',lt>2?'#13213a':'#080e18',lt>2?'#2a4a6a':'#14202e',calm*.9,calm*.9,[160,75,-110]);
  rain(t,1-calm,-6,0,[[SHORE_X,1.5,0,6,[1,.78,.42],1.2]]); camMove(u,[-9.5,1.3,-4.5,-2,2.6,2,40],[-9.5,1.4,-2.5,3,2.2,-3,36],'lin'); return {bloom:.7,warm:.1+.3*calm,rays:[W*.5,H*.5,.2+.5*calm],flare:[W*.45,H*.5,.4*calm]}; };
SC.v1e1=function(lt,len,t){ voidBase({hemi:.18}); const u=lt/len; VOID.crown.visible=true; VOID.crown.position.set(0,.01,0); VOID.crown.rotation.set(.1,.6,0); const jx=lerp(-3.2,3.4,u); JES.set(jx,0,-1.3,Math.PI/2,{walk:WK(t),wa:1},t); jlight(jx+.3,1.2,-1,22);
  camMove(u,[.45,.3,2.6,0,.55,-.4,34],[-.3,.3,2.4,.1,.6,-.3,32]); rain(t,0,0,0,null); return {bloom:.8,warm:.15,rays:[W*.6,H*.5,.2]}; };
SC.v1e2=function(lt,len,t){ galilee({stars:.2+.8*(lt/len),top:'#02040c',mid:'#0a1630',hor:'#1c3050',moonOp:.9}); const u=lt/len, jz=-8-1.5*lt; SEA.update(t,.12); SEA.boatSet(52,-26,t,.12); jes(SHORE_X,jz,Math.PI,t); jlight(SHORE_X,1.5,jz-.5,24); SKYG.forEach((h,i)=>{ h.visible=true; h.material.opacity=.32*sm(0,.8,u); }); rain(t,.15*(1-u),-8,jz,null);
  camMove(u,[-12,1.2,jz+7,-5,1.4,jz-2,40],[-12,1.2,jz+7,-5,28,jz-26,50]); return {bloom:.7,warm:.2,rays:[W*.5,H*.4,.2]}; };
SC.v1f=function(lt,len,t){ voidBase({}); DOME.show(true); DOME.set('#000206','#050a18','#0a1430',1,0); const u=lt/len; VOID.lion.visible=true; VOID.lion.position.set(0,20,-46); VOID.lion.scale.setScalar(5); VOID.lion.rotation.y=0; VOID.lionSet(clamp(u*1.15)); SKYG.forEach(h=>{ h.visible=true; h.material.opacity=.2; });
  camMove(u,[0,1.8,0,2.6,16,-46,46],[0,1.8,0,2.8,17,-46,40],'lin'); const roar=sm(.82,.95,u); return {bloom:.8+roar,warm:.1+.4*roar,flare:[W*.5,H*.48,.6*roar],grain:.09}; };
// ---------- chorus 2 : the village ----------
const JZ2=t=>22-JV*(t-87.45);
const PEEP={ widow:new Actor({style:'robe',cloth:0x2a2a30,robe:0x2a2a30,wrap:0x3a3640}), blind:new Actor({style:'robe',cloth:0x3a3228,robe:0x3a3228,wrap:0x4a4236,staff:true}), child:new Actor({style:'robe',cloth:0x4a3a30,robe:0x4a3a30,wrap:0x4a3a30,scale:.55}), lame:new Actor({style:'robe',cloth:0x2e3430,robe:0x2e3430,wrap:0x3a4034,crutch:true}) };
const PZ={widow:14,blind:8,child:2,lame:-4}, PX={widow:-3.5,blind:3.3,child:-3.3,lame:3.3};
function peeps(t){ const jz=JZ2(t); const h=k=>sm(0,1.6,(PZ[k]+1.2-jz)/1.5);   // healed progress (after Jesus passed)
  const w=h('widow'), b=h('blind'), c=h('child'), l=h('lame');
  PEEP.widow.set(PX.widow,.12*(1-w),PZ.widow,Math.PI/2,{sit:1-w,robe:1,hd:[lerp(.9,-.3,w),0,0],tr:[lerp(.45,-.05,w),0,0],aL:[lerp(1.2,.7,w),lerp(.12,1,w),lerp(1.4,.3,w)],aR:[lerp(1.2,.7,w),lerp(.12,1,w),lerp(1.4,.3,w)]},t);
  PEEP.blind.set(PX.blind,0,PZ.blind,-Math.PI/2,{tr:[lerp(.22,-.04,b),0,0],hd:[lerp(.5,-.35,b),lerp(.5,0,b),0],aL:[lerp(.3,.9,b),lerp(.1,.9,b),lerp(.4,.3,b)],aR:[lerp(.5,.9,b),lerp(.1,.9,b),.3],sf:sm(.3,.9,b)},t);
  PEEP.child.set(PX.child,Math.abs(Math.sin(t*9))*.16*c,PZ.child,Math.PI/2,{tr:[lerp(.3,0,c),0,0],hd:[lerp(.6,-.3,c),0,0],aL:[lerp(.1,2.6,c),lerp(.1,.5,c),.1],aR:[lerp(.1,2.6,c),lerp(.1,.5,c),.1]},t);
  PEEP.lame.set(PX.lame,0,PZ.lame,-Math.PI/2,{tr:[lerp(.35,-.03,l),lerp(.18,0,l),0],hd:[lerp(.5,-.35,l),0,0],lgL:[lerp(0,0,l),lerp(.4,0,l)],aL:[lerp(.5,2.2,l),lerp(.2,.6,l),lerp(.4,.2,l)],aR:[lerp(.3,1.0,l),.2,.3],sf:sm(.3,.9,l)},t); }
const ANCZ=[]; for(let i=0;i<64;i++){ const s=i%2?1:-1, z=21-Math.floor(i/2)*2.15+(hash(i)-.5)*.8; ANCZ.push({s,z,x:s*(3.4+hash(i*3)*.7)}); }
function ancCrowd(t,jz,follow=1,t0pass=0){ crowdShow('anc',true); CROWD.anc.each((it,i)=>{ const a=ANCZ[i]; const passed=clamp((a.z-jz-.5)/3); const up=sm(0,1,passed), arm=sm(.5,1,passed)*(i%3?0:1)*.8; const walk=follow?sm(1.5,5,(a.z-jz)/1.5)*0:0; const dz=follow?Math.max(0,(a.z-jz-1.5)):0; const fz=follow&&passed>=1?jz+(a.z-ANCZ0(i,jz,t)):a.z; let x=a.x, z=a.z, ry=-a.s*Math.PI/2, bob=0;
    if(follow&&passed>=1){ const age=(a.z-jz-4)/JV; const k=clamp(age/2.5); x=lerp(a.x,a.s*1.3+(hash(i*7)-.5)*1.2,sm(0,1,k)); z=jz+4+(hash(i*5)*6)*1+k*0+ (a.z-jz-4)*0; ry=lerp(ry,Math.PI,sm(0,1,k)); bob=Math.abs(Math.sin(t*TAU/(PER*2)+i))*.04*k; z=Math.min(a.z,jz+4+(i%11)*1.1); }
    CROWD.anc.set(it,x,bob,z,ry,[up*.95,arm],up*.5); }); }
function ANCZ0(i,jz,t){ return 0; }
function village(o={}){ stage('ancient'); base({hemi:.3,moon:.25,fog:0x0a0c14,fd:.014,mc:0x7f8cb0}); DOME.show(true); DOME.set('#03050b','#0a1020','#16192a',.5,.5,[-120,80,-150]); }
SC.c2a=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,0); ancLight({jz,dir:-1,trail:1,palms:0},t); litRain(t,.45,.6,jz); footprints(t,87.45,.6,22,JV);
  camMove(u,[-1.6,2.6,jz+13,.6,1.4,jz-7,40],[-.4,2.0,jz+9,.6,1.4,jz-7,36],'lin'); return {bloom:.6,warm:.15,rays:[W*.52,H*.5,.4]}; };
function c2cam(zp,side,u,a,b){ const jz=JZ2(TT); return [a,b]; }
SC.c2b=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,0); ancLight({jz,dir:-1,trail:1},t); litRain(t,.45,.6,jz); footprints(t,87.45,.6,22,JV);
  camMove(u,[-1.4,1.1,PZ.widow+4.2,PX.widow,.95,PZ.widow,32],[-1.2,1.0,PZ.widow+3.0,PX.widow,1.0,PZ.widow-.5,30]); return {bloom:.65,warm:.2,rays:[W*.6,H*.5,.3]}; };
SC.c2c=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,0); ancLight({jz,dir:-1,trail:1},t); litRain(t,.45,.6,jz); footprints(t,87.45,.6,22,JV);
  camMove(u,[1.2,1.3,PZ.blind+4.4,PX.blind,1.2,PZ.blind,32],[1.4,1.4,PZ.blind+3.2,PX.blind,1.4,PZ.blind-.3,30]); return {bloom:.65,warm:.2,rays:[W*.45,H*.5,.3]}; };
SC.c2d=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,0); ancLight({jz,dir:-1,trail:1},t); litRain(t,.45,.6,jz); footprints(t,87.45,.6,22,JV);
  camMove(u,[-.9,1.0,PZ.child+4.4,PX.child,.7,PZ.child,34],[-1.4,.9,PZ.child+3.4,PX.child+.5,.85,PZ.child-.5,30]); return {bloom:.65,warm:.22,rays:[W*.5,H*.5,.3]}; };
SC.c2e=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,0); ancLight({jz,dir:-1,trail:1},t); litRain(t,.45,.6,jz); footprints(t,87.45,.6,22,JV);
  camMove(u,[1.0,1.2,PZ.lame+4.6,PX.lame,1.1,PZ.lame,32],[1.6,1.3,PZ.lame+3.4,PX.lame,1.2,PZ.lame-.4,30]); return {bloom:.65,warm:.25,rays:[W*.5,H*.5,.3]}; };
SC.c2f=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,1); ancLight({jz,dir:-1,trail:1},t); litRain(t,.35,.6,jz); footprints(t,87.45,.6,22,JV);
  camMove(u,[-1.8,1.5,jz-8.5,.6,1.5,jz+6,38],[1.6,1.9,jz-6.5,.6,1.5,jz+7,34],'lin'); return {bloom:.7,warm:.3,rays:[W*.5,H*.5,.4]}; };
SC.c2g=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.1,jz-.4,26); peeps(t); ancCrowd(t,jz,1); ancLight({jz,dir:-1,trail:1},t); litRain(t,.3,.6,jz,.6,4); footprints(t,87.45,.6,22,JV,-1,3.4,1.2);
  camMove(u,[2.0,.3,jz+2.8,.6,.12,jz-.6,30],[1.6,.35,jz+1.8,.6,.15,jz-1.1,30],'lin'); return {bloom:.75,warm:.3,rays:[W*.5,H*.5,.3]}; };
SC.c2h=function(lt,len,t){ village(); const jz=JZ2(t), u=lt/len; jes(.6,jz,Math.PI,t); jlight(.6,1.5,jz-.5,20); peeps(t); ancCrowd(t,jz,1); ancLight({jz,dir:-1,trail:1},t); DOME.set('#050a1c','#101a3a','#2a2a4a',.9,.8,[-120,80,-150]); litRain(t,.15*(1-u),.6,jz);
  camMove(u,[-2,2.2,jz-9,.6,1.5,jz+6,40],[-8,24,jz-24,.6,0,jz+10,50]); return {bloom:.75,warm:.35,rays:[W*.5,H*.5,.3]}; };
