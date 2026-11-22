// ===== shared staging helpers =====
const JES=new Actor({style:'jesus',scale:1.0,hair:0x24160c});
const WAN=new Actor({style:'hood',cloth:0x232c40,pants:0x151a26,hair:0x1a1410,hood:true,em:[0x141b30,.3]});
const WANH=new Actor({style:'hood',cloth:0x232c40,pants:0x151a26,hair:0x1a1410,hood:false,em:[0x141b30,.2]});
function base(o={}){ HEMI.intensity=o.hemi??.5; HEMI.color.set(o.hc??0x5a6fa0); HEMI.groundColor.set(o.gc??0x0c1018); MOON.intensity=o.moon??.7; MOON.color.set(o.mc??0x7f9bd0); RIM.intensity=o.rim??0; RIM.color.set(o.rc??0xffb070); FILL.intensity=o.fill??.3; GS.fog.color.set(o.fog??0x070a16); GS.fog.density=o.fd??.014; JL.intensity=0; JL.color.set(o.jc??0xffc880); AUX.intensity=0; AUX.color.set(0x6a8ac8); GR.setClearColor(o.bg??0x05070d,1); GR.toneMappingExposure=o.exp??1; DOME.show(false); RAIN.o.visible=false; }
const WK=t=>t*TAU/(PER*2);
const JV=1.5;                                            // Jesus walks 1.5 m/s: one step per beat
function jes(x,z,ry,t,o={}){ JES.set(x,0,z,ry,Object.assign({walk:WK(t),wa:1},o),t); }
function jlight(x,y,z,I=30,col){ JL.position.set(x,y,z); JL.intensity=I; if(col) JL.color.set(col); }
// glowing footprints: one per beat, last N fade out
const FOOT=(()=>{ const a=[]; for(let i=0;i<10;i++){ const p=pool(0xffc070,1.4,[0,0,0],GS,0); a.push(p); } hide(...a); return a; })();
const FOOTM=[]; 
function footprints(t,t0,x0,z0,v,dir=-1,life=2.6,gain=.9){ const k0=Math.floor((t-t0)/PER); for(let j=0;j<FOOT.length;j++){ const k=k0-j, tk=t0+k*PER; const p=FOOT[j]; if(k<0){ p.visible=false; continue; } const age=t-tk; p.visible=true; p.position.set(x0+(k%2?.14:-.14),.03,z0+dir*v*(tk-t0)+dir*-.1); p.material.opacity=gain*Math.exp(-age/life*2.2)*sm(0,.12,age); p.scale.set(.9,1.6,1); } }
function litRain(t,amt,x,z,y=1.4,r=5,g=1.2,extra=[]){ rain(t,amt,x,z,[[x,y,z,r,[1,.78,.42],g]].concat(extra)); }
function sunDawn(d){ return d; }
const CITYDEF=(t,o)=>{ cityLight(Object.assign({jz:1e9,dir:-1,win:.12},o),t); };
function titleOv(ctx,t){ const a=sm(1.2,2.6,t)*(1-sm(5.4,6.8,t)); if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font='200 64px "Inter Display","Inter"'; ctx.letterSpacing='26px'; ctx.fillStyle='#efe3cb'; ctx.shadowColor='rgba(0,0,0,.8)'; ctx.shadowBlur=20; ctx.fillText('WHERE HE WALKS',W/2+13,215); ctx.shadowBlur=0; ctx.globalAlpha=a*.7; ctx.fillStyle='#d9a45a'; ctx.fillRect(W/2-90,262,180,2); ctx.restore(); }
function sitPose(h=.8){ return {sit:1,hd:[h,0,0],tr:[.62,0,0],aL:[.62,.1,1.45],aR:[.62,.1,1.45]}; }
function auxOn(x,y,z,I,col){ AUX.position.set(x,y,z); AUX.intensity=I; if(col) AUX.color.set(col); }
function wanderer(t,o={}){ const A=o.hood===false?WANH:WAN; A.set(o.x??-5.6,o.y??.12,o.z??-14,o.ry??Math.PI/2,Object.assign(sitPose(.8),o.pose||{}),t); }
