// ---------- transitions: draw from BA (old) and BB (new) into X ----------
function img(c,dx=0,dy=0,sc=1,rot=0,a=1){ X.save(); X.globalAlpha=a; X.translate(CX+dx,CY+dy); X.rotate(rot); X.scale(sc,sc); X.drawImage(c,-CX,-CY); X.restore(); }
const TR={
 cut:(p)=>img(BB),
 flash:(p)=>{ img(BB,0,0,1+.08*(1-p)); X.fillStyle=`rgba(255,255,255,${1-p})`; X.fillRect(0,0,W,H); },
 whipL:(p)=>{ const e=ease(p); for(let g=0;g<5;g++){ const o=g*.035*Math.sin(p*Math.PI); img(BA,-(e+o)*W,0,1,0,g?.25:1); img(BB,(1-e-o)*W,0,1,0,g?.25:1); } },
 whipU:(p)=>{ const e=ease(p); for(let g=0;g<5;g++){ const o=g*.035*Math.sin(p*Math.PI); img(BA,0,-(e+o)*H,1,0,g?.25:1); img(BB,0,(1-e-o)*H,1,0,g?.25:1); } },
 zoom:(p)=>{ const e=ease(p); img(BB,0,0,.35+.65*e,0,1); img(BA,0,0,1+e*5,0,1-e); },
 zoomOut:(p)=>{ const e=ease(p); img(BA,0,0,1-.6*e,0,1-e); img(BB,0,0,3-2*e,0,e); },
 star:(p)=>{ const e=ease(p); img(BA); const r=e*Math.hypot(W,H)*1.15; X.save(); starPath(CX,CY,r,e*1.2); X.clip(); img(BB); X.restore(); X.save(); starPath(CX,CY,r,e*1.2); X.lineWidth=26*U*(1-e)+2; X.strokeStyle=WHITE; X.stroke(); X.restore(); },
 stripes:(p)=>{ const n=6, bh=H/n; if(p<.5){ img(BA); const e=ease(p*2); for(let i=0;i<n;i++){ X.fillStyle=i%2?WHITE:BLUE; const w=e*W; X.fillRect(i%2?W-w:0,i*bh,w,bh+1); } } else { img(BB); const e=ease((p-.5)*2); for(let i=0;i<n;i++){ X.fillStyle=i%2?WHITE:BLUE; const w=(1-e)*W; X.fillRect(i%2?0:W-w,i*bh,w,bh+1); } } },
 spin:(p)=>{ const e=ease(p); img(BB,0,0,2.4-1.4*e,(e-1)*1.6,e); img(BA,0,0,1+e*1.6,e*1.6,1-e); },
 glitch:(p)=>{ img(BA); const n=14, fr=Math.floor(p*12); for(let k=0;k<n;k++){ const y0=Math.floor(k*H/n), hh=Math.ceil(H/n), nx=hash(k*13+fr)<p, off=(hash(k*7+fr*3)-.5)*W*.22*Math.sin(p*Math.PI); X.drawImage(nx?BB:BA,0,y0,W,hh,off,y0,W,hh); if(hash(k+fr)>.82){ X.fillStyle=k%2?'rgba(0,56,184,.5)':'rgba(255,255,255,.4)'; X.fillRect(0,y0,W,hh*.4); } } },
 blinds:(p)=>{ img(BA); const n=VERT?7:12, e=ease(p), w=W/n; for(let i=0;i<n;i++){ const ww=w*clamp(e*1.6-i/n*.6); X.drawImage(BB,i*w,0,ww,H,i*w,0,ww,H); } },
 slash:(p)=>{ img(BB); const e=ease(p), d=e*W*.7; X.save(); X.beginPath(); X.moveTo(0,0); X.lineTo(W*.62,0); X.lineTo(W*.38,H); X.lineTo(0,H); X.clip(); img(BA,-d,-d*.3); X.restore(); X.save(); X.beginPath(); X.moveTo(W,0); X.lineTo(W*.62,0); X.lineTo(W*.38,H); X.lineTo(W,H); X.clip(); img(BA,d,d*.3); X.restore(); if(p<.3){ X.strokeStyle=WHITE; X.lineWidth=30*U*(1-p/.3); X.beginPath(); X.moveTo(W*.64,-20); X.lineTo(W*.36,H+20); X.stroke(); } },
 shutter:(p)=>{ if(p<.5){ img(BA); const e=ease(p*2); X.fillStyle='#000'; X.fillRect(0,0,W,H/2*e); X.fillRect(0,H-H/2*e,W,H/2*e); } else { img(BB); const e=ease((p-.5)*2); X.fillStyle='#000'; X.fillRect(0,0,W,H/2*(1-e)); X.fillRect(0,H-H/2*(1-e),W,H/2*(1-e)); X.fillStyle=`rgba(255,255,255,${(1-e)*.9})`; X.fillRect(0,0,W,H); } } };
// ---------- post: soft bloom + directional light ----------
const SMc=document.createElement('canvas'); SMc.width=W/8; SMc.height=H/8; const SMx=SMc.getContext('2d'); const TNc=document.createElement('canvas'); TNc.width=W/32; TNc.height=H/32; const TNx=TNc.getContext('2d');
function post(){ SMx.drawImage(cv,0,0,SMc.width,SMc.height); TNx.drawImage(SMc,0,0,TNc.width,TNc.height); X.save(); X.imageSmoothingQuality='high'; X.globalCompositeOperation='screen'; X.globalAlpha=.16; X.drawImage(SMc,0,0,W,H); X.globalAlpha=.2; X.drawImage(TNc,0,0,W,H); X.restore(); const g=X.createLinearGradient(0,0,W,H); g.addColorStop(0,'rgba(255,244,220,.10)'); g.addColorStop(.5,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(10,20,40,.16)'); X.fillStyle=g; X.fillRect(0,0,W,H); }
D.TL.forEach((c,i)=>c.i=i);
// ---------- main ----------
function sceneAt(t){ let i=0; for(let k=0;k<D.TL.length;k++) if(D.TL[k].t0<=t) i=k; const c=D.TL[i], t1=i+1<D.TL.length?D.TL[i+1].t0:D.total; return {i,c,len:t1-c.t0,lt:t-c.t0}; }
function drawScene(ctx,c,lt,len,t){ X=ctx; X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.globalCompositeOperation='source-over'; X.clearRect(0,0,W,H); TT=t; LT=lt; const u=lt/len, k0=c.kb??.06, dir=(c.i%2?1:-1); PARX=k0?dir*(u-.5)*46:0; const z=1.035+k0*u+BP*.018*(c.punch??1); X.translate(CX,CY); X.scale(z,z); X.translate(-CX-PARX*.6,-CY+(k0?(u-.5)*-10:0)); SC[c.s](lt,len,t,c); X.setTransform(1,0,0,1,0,0); }
window.renderAt=function(t){ const fr=(((t-PH)%PER)+PER)%PER; BP=Math.exp(-7*fr); BI=Math.floor((t-PH)/PER); const q=sceneAt(t), c=q.c; drawScene(BX,c,q.lt,q.len,t); const td=Math.min(c.td??.3,q.len*.6), p=q.lt/td;
  X=MAIN; X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.fillStyle='#000'; X.fillRect(0,0,W,H);
  if(q.i>0&&p<1&&c.tr&&c.tr!=='cut'){ const pv=D.TL[q.i-1]; drawScene(AX,pv,t-pv.t0,c.t0-pv.t0,t); X=MAIN; TR[c.tr](clamp(p)); } else { const sh=(c.shake??0)*BP*14*U; img(BB,(hash(BI*3)-.5)*sh,(hash(BI*5)-.5)*sh); }
  X=MAIN; if(c.s!=='black'){ post(); hud(t,c); lyrics(t); const vg=X.createRadialGradient(CX,CY,Math.min(W,H)*.45,CX,CY,Math.hypot(W,H)*.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.5)'); X.fillStyle=vg; X.fillRect(0,0,W,H); }
  if(t<.5){ X.fillStyle=`rgba(0,0,0,${1-t/.5})`; X.fillRect(0,0,W,H); } };
