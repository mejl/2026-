// ===================== AI FILM ENGINE (Stage B2) =====================
const BEATS_AI={};
const PAL={gold:'#d4a437',cyan:'#38d6ff',mag:'#ff3ea5',red:'#ff4a3a',green:'#46e68c',purple:'#a58bff',ink:'#05060c'};
const LABELS={FACT:['FACT','#46e68c'],BIBLE:['BIBLE','#d4a437'],INTERPRETATION:['INTERPRETATION','#a58bff'],FICTION:['FICTION · NOT A PREDICTION','#ff5a4a'],JUDGMENT:['MY JUDGMENT','#a58bff'],PREDICTION:['PREDICTION · NOT A FACT','#ffb347']};
const MOODC={bible:'#d4a437',glory:'#ffd98a',machine:'#38d6ff',fiction:'#ff5a4a'};
// ---- transition constructors (used in beat definitions) ----
const FD=(dur=1.0)=>({type:'fade',dur});
const Z=(fx=W/2,fy=H/2,dur=1.6,k=10)=>({type:'zoom',f:[fx,fy],dur,k});
const IR=(fx=W/2,fy=H/2,dur=1.4,col='#ffe9b0')=>({type:'iris',f:[fx,fy],dur,col});
const MO=(x,y,w,h,dur=1.5,rad=18)=>({type:'morph',a:[x,y,w,h],dur,rad});
const GL=(dur=.9)=>({type:'glitch',dur});
// ---- helpers ----
function aiText(str,x,y,size,col,align='center',glowc){ X.save(); X.textAlign=align; X.font=`600 ${size}px Georgia, serif`; if(glowc){ X.shadowColor=glowc; X.shadowBlur=size*.6; } X.fillStyle=col; X.fillText(str,x,y); X.restore(); }
function aiMono(str,x,y,size,col,align='left'){ X.save(); X.textAlign=align; X.font=`${size}px "Courier New", monospace`; X.fillStyle=col; X.fillText(str,x,y); X.restore(); }
function rr(x,y,w,h,r){ X.beginPath(); X.moveTo(x+r,y); X.arcTo(x+w,y,x+w,y+h,r); X.arcTo(x+w,y+h,x,y+h,r); X.arcTo(x,y+h,x,y,r); X.arcTo(x,y,x+w,y,r); X.closePath(); }
// keyword timing inside a beat: progress (0..1 over dur) since the caption containing `word` began
function kwT(B,word){ const s=B.shot; const c=(s.caps||[]).find(c=>(c.raw||c.text).toLowerCase().includes(word.toLowerCase())); return c?c.start:(B.start+(B.end-B.start)*.5); }
function kwP(B,word,dur=1.2,off=0){ return smooth(0,dur,(window.__t||0)-kwT(B,word)-off); }

// corrected limb capsule (the older seg() has inward-curving end caps)
function segF(x1,y1,x2,y2,w1,w2){ const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L; X.beginPath(); X.moveTo(x1+nx*w1,y1+ny*w1); X.lineTo(x2+nx*w2,y2+ny*w2); X.lineTo(x2-nx*w2,y2-ny*w2); X.lineTo(x1-nx*w1,y1-ny*w1); X.closePath(); X.fill(); X.beginPath(); X.arc(x1,y1,w1,0,TAU); X.fill(); X.beginPath(); X.arc(x2,y2,w2,0,TAU); X.fill(); }
function armF(sx,sy,a1,a2,L1,L2){ const ex=sx+Math.sin(a1)*L1, ey=sy+Math.cos(a1)*L1, hx=ex+Math.sin(a1+a2)*L2, hy=ey+Math.cos(a1+a2)*L2; segF(sx,sy,ex,ey,3.6,2.9); segF(ex,ey,hx,hy,2.9,2.3); return [hx,hy]; }
// ---- modern person (suit / dress / hoodie), walking, sitting, typing, pointing ----
function aiPerson(x,y,h,t,o={}){
  const dir=o.dir||1, ph=o.ph||0, walk=o.walk||0, pose=o.pose||'stand';
  const female=o.female!=null?o.female:hash(Math.floor(ph*53)+7)>.55;
  const skins=['#f0c8a0','#d9a273','#b57a4e','#8a5a3a','#f4d6b8'], suits=['#1d2433','#2a2f3a','#3a2f2a','#243a3a','#5a5f6a','#3a2a4a'], hairs=['#15100c','#3a2a1c','#6a4a2a','#a09080','#0c0c10'];
  const skin=o.skin||skins[Math.floor(hash(ph*13+2)*5)], suit=o.suit||suits[Math.floor(hash(ph*17+3)*6)], hair=o.hair||hairs[Math.floor(hash(ph*19+5)*5)];
  const shirt=o.shirt||(o.hoodie?suit:'#e8ecf2'), tie=o.tie===false?null:(o.tie||['#a02a3a','#2a4a8a','#3a8a5a','#8a6a2a'][Math.floor(hash(ph*23+1)*4)]);
  const rim=o.rim||'#9fd8ff', sit=(pose==='sit'||pose==='type');
  const cyc=t*5.2*walk+ph, sw=Math.sin(cyc), bob=walk?Math.abs(Math.cos(cyc))*1.4:0, br=Math.sin(t*1.7+ph)*.4;
  X.save(); X.translate(x,y); X.scale(dir*h/100*.9,h/100); X.translate(0,-bob);
  const shY=-80+(sit?14:0)+br*.2, hipY=sit?-34:-48;
  X.fillStyle=o.pants||mixc(suit,'#000000',.15); X.strokeStyle=X.fillStyle; X.lineCap='round';
  // legs
  const leg=(s2,a1,a2)=>{ const hx=s2*4.2, hy=hipY; if(sit){ segF(hx,hy,hx+18,hy+1,4,3.6); segF(hx+18,hy+1,hx+19,-2,3.6,3); X.fillStyle='#0c0c10'; X.beginPath(); X.ellipse(hx+23,-1.5,6,2.4,0,0,TAU); X.fill(); X.fillStyle=o.pants||mixc(suit,'#000000',.15); return; }
    const kx=hx+Math.sin(a1)*24, ky=hy+Math.cos(a1)*24, ax=kx+Math.sin(a1+a2)*24, ay=ky+Math.cos(a1+a2)*24; segF(hx,hy,kx,ky,4,3.5); segF(kx,ky,ax,ay,3.5,2.8); X.fillStyle='#0c0c10'; X.beginPath(); X.ellipse(ax+3,ay+1,6,2.4,0,0,TAU); X.fill(); X.fillStyle=o.pants||mixc(suit,'#000000',.15); };
  if(walk){ leg(-1,sw*.5,Math.max(0,-sw)*.6); leg(1,-sw*.5,Math.max(0,sw)*.6); } else { leg(-1,.04,0); leg(1,-.04,0); }
  // skirt for some female figures
  if(female&&o.skirt!==false&&!sit){ X.fillStyle=mixc(suit,'#000000',.05); X.beginPath(); X.moveTo(-9,hipY-2); X.lineTo(9,hipY-2); X.lineTo(12+(walk?sw*2:0),-20); X.lineTo(-12+(walk?sw*2:0),-20); X.closePath(); X.fill(); }
  // torso / jacket
  const bw=female?9.6:11.2;
  X.fillStyle=suit; X.beginPath(); X.moveTo(-bw,shY+2); X.quadraticCurveTo(-bw-1,shY+14,-8,hipY+3); X.lineTo(8,hipY+3); X.quadraticCurveTo(bw+1,shY+14,bw,shY+2); X.quadraticCurveTo(0,shY-3,-bw,shY+2); X.fill();
  if(!o.hoodie){ X.fillStyle=shirt; X.beginPath(); X.moveTo(-3.6,shY); X.lineTo(3.6,shY); X.lineTo(0,shY+22); X.closePath(); X.fill(); if(tie){ X.fillStyle=tie; X.beginPath(); X.moveTo(-1.3,shY+3); X.lineTo(1.3,shY+3); X.lineTo(1.9,shY+18); X.lineTo(0,shY+21); X.lineTo(-1.9,shY+18); X.closePath(); X.fill(); } }
  else { X.fillStyle=mixc(suit,'#ffffff',.12); X.beginPath(); X.ellipse(0,shY+3,6.4,3.2,0,0,TAU); X.fill(); }
  // arms
  X.fillStyle=suit; const sL=[-bw+.6,shY+3], sR=[bw-.6,shY+3], aS=walk?sw*.45:0, g=(Math.sin(t*.9+ph*1.3)+1)/2;
  const hand=(cx,cy)=>{ X.fillStyle=skin; X.beginPath(); X.ellipse(cx,cy,2.5,3,0,0,TAU); X.fill(); X.fillStyle=suit; };
  const arm=(p,a1,a2)=>{ const r=armF(p[0],p[1],a1,a2,14,13); X.fillStyle=skin; X.beginPath(); X.ellipse(r[0],r[1],2.6,3.2,0,0,TAU); X.fill(); X.fillStyle=suit; };
  if(pose==='type'){ const k=Math.sin(t*14)*.08; arm(sL,1.05+k,.7); arm(sR,1.1-k,.65); }
  else if(pose==='sit'){ arm(sL,.7,.9); arm(sR,.75,.85); }
  else if(pose==='point'){ arm(sL,.1,-.2); arm(sR,Math.PI*.5+.15,.05); }
  else if(pose==='arms'){ arm(sL,Math.PI-.55,-.1); arm(sR,Math.PI+.55,.1); }
  else if(pose==='hold'){ arm(sL,.9,.95); arm(sR,.9,.95); }
  else { arm(sL,.1+aS,-.18); arm(sR,-.1-aS-(walk?0:g*.2),.2+(walk?0:g*.9)); }
  // neck + head (long hair goes behind the face, fringe in front)
  X.fillStyle=skin; segF(0,shY-1,0,shY-6,3,2.8); const hy=shY-13.5, look=Math.sin(t*.45+ph*2)*.1, hx=look*6;
  if(female){ X.fillStyle=hair; X.beginPath(); X.moveTo(hx-6.8,hy-1); X.quadraticCurveTo(hx-7.2,hy-9.4,hx+1,hy-9); X.quadraticCurveTo(hx+7.8,hy-8.4,hx+6.8,hy-1); X.lineTo(hx+8.6,hy+15); X.lineTo(hx-8.6,hy+15); X.closePath(); X.fill(); }
  X.fillStyle=skin; X.beginPath(); X.ellipse(hx,hy,5.6,6.8,0,0,TAU); X.fill();
  X.fillStyle=hair; X.beginPath(); X.moveTo(hx-6,hy-1.5); X.quadraticCurveTo(hx-5.4,hy-9,hx+1,hy-8.6); X.quadraticCurveTo(hx+6.6,hy-8,hx+6,hy-1.5); X.quadraticCurveTo(hx+4,hy-4.4,hx,hy-4.8); X.quadraticCurveTo(hx-4,hy-4.2,hx-6,hy-1.5); X.fill();
  if(h>=105){ X.fillStyle='#1a1410'; X.beginPath(); X.ellipse(hx-2,hy-.6,.75,1,0,0,TAU); X.ellipse(hx+2.2,hy-.6,.75,1,0,0,TAU); X.fill(); X.strokeStyle='#2a1c14'; X.lineWidth=.55; X.beginPath(); X.moveTo(hx-1,hy+3.2); X.quadraticCurveTo(hx+.5,hy+3.9,hx+2,hy+3.2); X.stroke(); }
  if(o.glasses){ X.strokeStyle='#111'; X.lineWidth=.9; X.beginPath(); X.arc(hx-2.3,hy-.4,2.1,0,TAU); X.arc(hx+2.5,hy-.4,2.1,0,TAU); X.stroke(); }
  X.restore(); }
const MP=aiPerson;

// ---- tech props ----
function aiRack(x,y,w,h,t,seed=1,col='#38d6ff'){ X.fillStyle='#0c1018'; X.fillRect(x,y,w,h); X.strokeStyle='#1c2636'; X.lineWidth=1; X.strokeRect(x+.5,y+.5,w-1,h-1); const rows=Math.max(4,Math.floor(h/9)); for(let r=0;r<rows;r++){ const yy=y+3+r*(h-6)/rows; X.fillStyle='#141c2a'; X.fillRect(x+3,yy,w-6,(h-6)/rows-2); for(let k=0;k<3;k++){ const on=hash(seed*97+r*7+k+Math.floor(t*(2+hash(r+seed)*4)))>.45; X.fillStyle=on?(k==2?'#ff7a3a':col):'#1a2436'; X.fillRect(x+6+k*5,yy+2,3,Math.max(1.5,(h-6)/rows-6)); } } }
function aiCorridor(t,col='#38d6ff',speed=.6){ X.fillStyle='#04060c'; X.fillRect(-60,-60,W+120,H+120); const vx=W/2, vy=H*.48; const g=X.createRadialGradient(vx,vy,10,vx,vy,H*.6); g.addColorStop(0,'rgba(80,160,255,.28)'); g.addColorStop(1,'rgba(0,0,0,0)'); X.fillStyle=g; X.fillRect(0,0,W,H);
  const off=(t*speed)%1; for(let i=16;i>=0;i--){ const z=i-off; if(z<.15) continue; const s=1/(z*.55+.35), ww=W*.09*s, hh=H*.7*s, xo=W*.18*s; const y0=vy-hh*.5; aiRack(vx-xo-ww,y0,ww,hh,t,i+Math.floor(t*speed-off)+1,col); aiRack(vx+xo,y0,ww,hh,t,i+40+Math.floor(t*speed-off)+1,col); X.fillStyle='rgba(56,214,255,.10)'; X.fillRect(vx-xo,y0+hh*.98,xo*2,hh*.06); }
  X.strokeStyle='rgba(56,214,255,.25)'; X.lineWidth=2; X.beginPath(); X.moveTo(vx,vy); X.lineTo(0,H); X.moveTo(vx,vy); X.lineTo(W,H); X.moveTo(vx,vy); X.lineTo(0,0); X.moveTo(vx,vy); X.lineTo(W,0); X.stroke(); }
function aiChip(x,y,s,t,col='#38d6ff'){ X.save(); X.translate(x,y); X.scale(s,s); X.fillStyle='#10161f'; rr(-120,-120,240,240,14); X.fill(); X.strokeStyle='#243244'; X.lineWidth=3; X.stroke(); for(let i=0;i<14;i++){ const p=-105+i*15; X.fillStyle='#8a94a4'; X.fillRect(p,-134,6,14); X.fillRect(p,120,6,14); X.fillRect(-134,p,14,6); X.fillRect(120,p,14,6); }
  X.fillStyle='#0a0f16'; rr(-78,-78,156,156,8); X.fill(); X.strokeStyle=col; X.lineWidth=2.2; X.shadowColor=col; X.shadowBlur=14; for(let i=0;i<9;i++){ const y0=-70+i*17.5; X.beginPath(); X.moveTo(-70,y0); let cx=-70; while(cx<70){ const step=10+hash(i*5+Math.floor(cx))*30; X.lineTo(cx+step*.5,y0); X.lineTo(cx+step,y0+(hash(i+cx)>.5?9:-9)); cx+=step; } X.globalAlpha=.35+.65*(.5+.5*Math.sin(t*3+i)); X.stroke(); } X.globalAlpha=1; X.shadowBlur=0; X.fillStyle=col; X.globalAlpha=.16+.1*Math.sin(t*4); X.fillRect(-78,-78,156,156); X.globalAlpha=1; X.restore(); }
function aiScreen(x,y,w,h,t,o={}){ X.save(); X.fillStyle=o.bezel||'#0b0e14'; rr(x-6,y-6,w+12,h+12,10); X.fill(); X.fillStyle=o.bg||'#05101c'; X.fillRect(x,y,w,h); if(o.lines){ const n=o.lines.length; X.font=`${o.fs||14}px "Courier New", monospace`; X.fillStyle=o.col||'#5fe8b0'; const shown=(o.type??1)*o.lines.join('').length; let used=0; o.lines.forEach((ln,i)=>{ const k=clamp(shown-used,0,ln.length); X.fillText(ln.slice(0,k|0),x+12,y+22+i*((o.fs||14)+6)); used+=ln.length; }); if(Math.sin(t*6)>0){ X.fillRect(x+12+ (o.lines[n-1].length*(o.fs||14)*.6),y+10+(n-1)*((o.fs||14)+6),8,(o.fs||14)); } } if(o.glow!==false){ const g=X.createLinearGradient(x,y,x+w,y+h); g.addColorStop(0,'rgba(255,255,255,.06)'); g.addColorStop(1,'rgba(255,255,255,0)'); X.fillStyle=g; X.fillRect(x,y,w,h); } X.restore(); }
function aiChat(x,y,w,h,t,q,a,u,o={}){ X.save(); X.fillStyle='#0f141d'; rr(x,y,w,h,16); X.fill(); X.strokeStyle='#243244'; X.lineWidth=2; X.stroke();
  const qw=Math.min(w*.7,q.length*10+40); X.fillStyle='#2a3a56'; rr(x+w-qw-16,y+18,qw,40,12); X.fill(); X.fillStyle='#e8f0ff'; X.font='17px Georgia'; X.textAlign='left'; X.fillText(q,x+w-qw-4,y+44);
  const k=clamp(u)*a.length; const lines=[]; let cur=''; for(const wd of a.slice(0,k|0).split(' ')){ if((cur+' '+wd).length>(w-70)/9.6){ lines.push(cur); cur=wd; } else cur=(cur+' '+wd).trim(); } lines.push(cur);
  X.fillStyle='#e8f0ff'; X.font='17px Georgia'; lines.slice(-Math.floor((h-100)/26)).forEach((ln,i)=>X.fillText(ln,x+18,y+94+i*26)); if(Math.sin(t*7)>0){ X.fillStyle=o.col||'#38d6ff'; X.fillRect(x+18+ (lines[lines.length-1]||'').length*9.4,y+94+(Math.min(lines.length,Math.floor((h-100)/26))-1)*26-15,9,20); } X.restore(); }
// dot-matrix world map with US (blue) and China (red) glowing, plus data arcs
const AI_LAND={NA:[[-168,66],[-140,70],[-95,72],[-60,60],[-55,48],[-70,42],[-80,25],[-97,18],[-105,22],[-118,32],[-125,48],[-140,60]],SA:[[-80,10],[-60,10],[-35,-6],[-40,-22],[-58,-38],[-72,-54],[-75,-20],[-81,-5]],EU:[[-10,36],[-9,44],[0,50],[10,56],[28,70],[40,66],[40,45],[28,36]],AF:[[-17,20],[-10,35],[10,37],[33,31],[43,12],[51,11],[40,-15],[20,-35],[12,-18],[9,4],[-8,5]],AS:[[28,70],[100,78],[140,72],[180,66],[160,50],[142,44],[122,30],[110,20],[100,10],[80,8],[70,22],[55,25],[35,32],[40,45]],AU:[[114,-22],[130,-12],[146,-19],[153,-28],[140,-38],[116,-34]]};
function inPoly(px,py,pl){ let c=false; for(let i=0,j=pl.length-1;i<pl.length;j=i++){ const [xi,yi]=pl[i],[xj,yj]=pl[j]; if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi)) c=!c; } return c; }
const AI_DOTS=[]; for(let lon=-170;lon<=178;lon+=3.2) for(let lat=-56;lat<=76;lat+=3.2){ for(const k in AI_LAND) if(inPoly(lon,lat,AI_LAND[k])){ const us=(lon>-125&&lon<-67&&lat>25&&lat<49), cn=(lon>74&&lon<135&&lat>20&&lat<53); AI_DOTS.push([lon,lat,us?1:(cn?2:0)]); break; } }
function aiMapXY(lon,lat,mx,my,mw,mh){ return [mx+(lon+180)/360*mw, my+(80-lat)/140*mh]; }
function aiMap(t,mx=80,my=110,mw=1120,mh=500,o={}){ const hi=o.hi??1; for(const [lon,lat,k] of AI_DOTS){ const [px,py]=aiMapXY(lon,lat,mx,my,mw,mh); const tw=.6+.4*Math.sin(t*2+lon*.3+lat*.2); if(k===1){ X.fillStyle=`rgba(80,160,255,${(.55+.45*tw)*hi})`; } else if(k===2){ X.fillStyle=`rgba(255,80,70,${(.55+.45*tw)*hi})`; } else X.fillStyle=`rgba(150,170,200,${.28*tw})`; X.fillRect(px-1.6,py-1.6,3.2,3.2); }
  if(o.arcs){ const us=aiMapXY(-98,38,mx,my,mw,mh), cn=aiMapXY(104,35,mx,my,mw,mh); for(let a=0;a<(o.arcs|0);a++){ const off=a*24; X.strokeStyle=a%2?'rgba(255,80,70,.6)':'rgba(80,160,255,.6)'; X.lineWidth=2; X.beginPath(); X.moveTo(us[0],us[1]); X.quadraticCurveTo(W/2,us[1]-160-off,cn[0],cn[1]); X.stroke(); const u=((t*.3+a*.25)%1), qx=(1-u)*(1-u)*us[0]+2*(1-u)*u*(W/2)+u*u*cn[0], qy=(1-u)*(1-u)*us[1]+2*(1-u)*u*(us[1]-160-off)+u*u*cn[1]; glow(qx,qy,18,a%2?'rgba(255,90,70,.9)':'rgba(90,170,255,.9)'); } } }
function aiFlagUS(x,y,w,t){ const h=w*.53; X.save(); X.translate(x,y); for(let i=0;i<13;i++){ X.fillStyle=i%2?'#f4f4f4':'#c0283a'; X.beginPath(); for(let k=0;k<=12;k++){ const px=k/12*w, py=i*h/13+Math.sin(t*3+k*.6)*2; k?X.lineTo(px,py):X.moveTo(px,py); } for(let k=12;k>=0;k--){ const px=k/12*w, py=(i+1)*h/13+Math.sin(t*3+k*.6)*2; X.lineTo(px,py); } X.fill(); } X.fillStyle='#2a3a7a'; X.fillRect(0,0,w*.4,h*.54); X.fillStyle='#fff'; for(let r=0;r<4;r++) for(let c=0;c<5;c++) X.fillRect(6+c*w*.075,6+r*h*.12,2.5,2.5); X.restore(); }
function aiFlagCN(x,y,w,t){ const h=w*.667; X.save(); X.translate(x,y); X.fillStyle='#d8262a'; X.beginPath(); for(let k=0;k<=12;k++){ const px=k/12*w, py=Math.sin(t*3+k*.6)*2; k?X.lineTo(px,py):X.moveTo(px,py); } for(let k=12;k>=0;k--){ const px=k/12*w, py=h+Math.sin(t*3+k*.6)*2; X.lineTo(px,py); } X.fill(); const star=(cx,cy,r)=>{ X.fillStyle='#ffd83a'; X.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr2=i%2?r*.4:r; X.lineTo(cx+Math.cos(a)*rr2,cy+Math.sin(a)*rr2); } X.closePath(); X.fill(); }; star(w*.17,h*.24,w*.09); [[.34,.1],[.4,.2],[.4,.34],[.34,.44]].forEach(([a,b])=>star(w*a,h*b,w*.03)); X.restore(); }
function aiLanes(t,pu,pc,o={}){ // USA vs CHINA race lanes; pu,pc = progress 0..1
  const x0=140,x1=W-140; for(const [ly,name,col,p] of [[H*.36,'USA','#5aa8ff',pu],[H*.62,'CHINA','#ff5a50',pc]]){ X.fillStyle='rgba(255,255,255,.06)'; X.fillRect(x0,ly-26,x1-x0,52); X.strokeStyle='rgba(255,255,255,.25)'; X.setLineDash([14,12]); X.beginPath(); X.moveTo(x0,ly); X.lineTo(x1,ly); X.stroke(); X.setLineDash([]); X.fillStyle=col; X.font='bold 22px Georgia'; X.textAlign='right'; X.fillText(name,x0-16,ly+8); const px=lerp(x0,x1,p); glow(px,ly,60,name==='USA'?'rgba(90,170,255,.6)':'rgba(255,90,80,.6)'); X.fillStyle=col; X.beginPath(); X.arc(px,ly,15,0,TAU); X.fill(); X.strokeStyle='#fff'; X.lineWidth=2; X.stroke(); for(let k=1;k<=6;k++){ const tx=px-k*22; X.fillStyle=col; X.globalAlpha=.4/k*1.5; X.beginPath(); X.arc(tx,ly,10-k,0,TAU); X.fill(); } X.globalAlpha=1; }
  X.fillStyle='rgba(255,255,255,.6)'; X.fillRect(x1,H*.26,4,H*.46); }
function aiChart(x,y,w,h,pts,prog,col='#46e68c',o={}){ X.save(); X.strokeStyle='rgba(255,255,255,.2)'; X.lineWidth=1; for(let i=0;i<=4;i++){ X.beginPath(); X.moveTo(x,y+h*i/4); X.lineTo(x+w,y+h*i/4); X.stroke(); } X.strokeStyle='#8aa0c0'; X.lineWidth=2; X.beginPath(); X.moveTo(x,y); X.lineTo(x,y+h); X.lineTo(x+w,y+h); X.stroke();
  const n=pts.length, mx=Math.max(...pts), mn=Math.min(...pts,0); const P=i=>[x+i/(n-1)*w, y+h-(pts[i]-mn)/(mx-mn||1)*h]; X.strokeStyle=col; X.lineWidth=4; X.shadowColor=col; X.shadowBlur=14; X.beginPath(); const last=prog*(n-1); for(let i=0;i<=Math.floor(last);i++){ const [px,py]=P(i); i?X.lineTo(px,py):X.moveTo(px,py); } const fi=Math.floor(last); if(fi<n-1){ const a=P(fi), b=P(fi+1), f=last-fi; X.lineTo(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f); } X.stroke(); X.shadowBlur=0; X.restore(); }
function aiRobot(x,y,h,t,o={}){ const col=o.col||'#c8d4e4', eye=o.eye||'#38d6ff', walk=o.walk||0, c=t*4*walk+(o.ph||0), s=Math.sin(c); X.save(); X.translate(x,y); X.scale((o.dir||1)*h/100,h/100); X.fillStyle=col; X.strokeStyle=col; X.lineCap='round';
  segF(-5,-46,-5+Math.sin(s*.5)*8,-2,4.4,3.6); segF(5,-46,5-Math.sin(s*.5)*8,-2,4.4,3.6); X.fillStyle='#5a6678'; X.fillRect(-8,-4,7,4); X.fillRect(2,-4,7,4); X.fillStyle=col; rr(-13,-84,26,40,6); X.fill(); X.fillStyle='#3a4658'; X.fillRect(-9,-70,18,6); segF(-14,-80,-18-s*5,-52,3.8,3); segF(14,-80,18+s*5,-52,3.8,3); X.fillStyle=col; rr(-8,-100,16,15,4); X.fill(); X.fillStyle=eye; X.shadowColor=eye; X.shadowBlur=8; X.fillRect(-5,-95,10,3); X.shadowBlur=0; X.restore(); }
function aiWindowGlow(x,y,w,h,col){ const g=X.createLinearGradient(x,y,x,y+h); g.addColorStop(0,col); g.addColorStop(1,'rgba(0,0,0,0)'); X.fillStyle=g; X.fillRect(x,y,w,h); }

// ===================== timeline of beats =====================
window.TL=[];
function buildTL(){ TL.length=0;
  for(const s of SCH.scenes){
    const list=BEATS_AI[s.id]||[[0,aiPlaceholder]];
    let prev=s.start;
    list.forEach((b,i)=>{ let st; if(i===0) st=s.start; else { const key=b[0]; const kwStart=(w)=>{ const c=(s.caps||[]).find(c=>(c.raw||c.text).toLowerCase().includes(String(w).toLowerCase())); return c?c.start:(s.vo+s.vodur*(i/list.length)); };
        if(typeof key==='number') st=s.vo+key; else if(Array.isArray(key)) st=kwStart(key[0])+key[1]; else st=kwStart(key); st=Math.max(st,prev+.8); }
      TL.push({shot:s,start:st,fn:b[1],tr:b[2]||null,i}); prev=st; });
  }
  for(let k=0;k<TL.length;k++){ TL[k].k=k; TL[k].end=k+1<TL.length?TL[k+1].start:SCH.total; }
}
function aiPlaceholder(u,t,d,B){ const s=B.shot; X.fillStyle=grad(['#0a1020','#141c34','#1e2a4a']); X.fillRect(-60,-60,W+120,H+120); stars(120,4242,t,.6,H*.5); aiText(s.year||'',W/2,H*.5,64,'#4a5a7a'); aiText(s.id,W/2,H*.62,22,'#3a4a6a'); }
function beatAt(t){ let lo=0,hi=TL.length-1; while(lo<hi){ const m=(lo+hi+1)>>1; if(TL[m].start<=t) lo=m; else hi=m-1; } return TL[lo]; }
const OFF1=document.createElement('canvas'); OFF1.width=W; OFF1.height=H; const OX1=OFF1.getContext('2d');
const OFF2=document.createElement('canvas'); OFF2.width=W; OFF2.height=H; const OX2=OFF2.getContext('2d');
const MAINCTX=cv.getContext('2d');
function camAI(B,u){ const e=ease(clamp(u)), id=B.k, dir=hash(id*7+1)>.5?1:-1; return {s:lerp(1.03,1.09,e),tx:dir*lerp(-24,24,e),ty:lerp(5,-5,e)}; }
function renderBeatTo(ctx,B,t){ const MX=X; X=ctx; try{ X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.globalCompositeOperation='source-over'; X.shadowBlur=0; X.fillStyle='#000'; X.fillRect(0,0,W,H); const d=Math.max(.5,B.end-B.start), u=clamp((t-B.start)/d); window.CAM=camAI(B,u); X.save(); applyCam(1); B.fn(u,t,d,B); X.restore(); } finally { X=MX; } }
function drawScaled(c,fx,fy,s,a){ X.save(); X.globalAlpha=a; X.translate(fx,fy); X.scale(s,s); X.translate(-fx,-fy); X.drawImage(c,0,0); X.restore(); }
function compose(tr,p,t){ const e=ease(clamp(p)); X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.globalCompositeOperation='source-over';
  if(tr.type==='zoom'){ const [fx,fy]=tr.f||[W/2,H/2], K=tr.k||10, s1=Math.exp(e*Math.log(K)), s2=Math.exp((e-1)*Math.log(K)); drawScaled(OFF2,W/2,H/2,1,smooth(.4,1,e)); drawScaled(OFF2,fx,fy,s2,1); drawScaled(OFF1,fx,fy,s1,1-smooth(.3,.95,e)); }
  else if(tr.type==='iris'){ const [fx,fy]=tr.f||[W/2,H/2]; X.drawImage(OFF1,0,0); const maxR=Math.hypot(Math.max(fx,W-fx),Math.max(fy,H-fy))*1.03, r=Math.max(1,e*maxR); X.save(); X.beginPath(); X.arc(fx,fy,r,0,TAU); X.clip(); X.drawImage(OFF2,0,0); X.restore(); X.save(); X.strokeStyle=tr.col||'#ffe9b0'; X.shadowColor=tr.col||'#ffe9b0'; X.shadowBlur=30; X.globalAlpha=1-smooth(.6,1,e); X.lineWidth=6*(1-e)+2; X.beginPath(); X.arc(fx,fy,r,0,TAU); X.stroke(); X.restore(); }
  else if(tr.type==='morph'){ const [ax,ay,aw,ah]=tr.a, x=lerp(ax,0,e), y=lerp(ay,0,e), w=lerp(aw,W,e), h=lerp(ah,H,e), rad=lerp(tr.rad||18,0,e); drawScaled(OFF1,ax+aw/2,ay+ah/2,1+e*.35,1-smooth(.7,1,e)); X.save(); rr(x,y,w,h,rad); X.clip(); X.translate(x,y); X.scale(w/W,h/H); X.drawImage(OFF2,0,0); X.restore(); X.save(); X.strokeStyle='rgba(255,255,255,.55)'; X.lineWidth=3*(1-e)+.5; rr(x,y,w,h,rad); X.globalAlpha=1-smooth(.5,1,e); X.stroke(); X.restore(); }
  else if(tr.type==='glitch'){ X.drawImage(OFF1,0,0); const n=18, gi=Math.sin(clamp(p)*Math.PI), fr=Math.floor(t*28); for(let k=0;k<n;k++){ const y0=k*H/n, useNext=hash(k*13+fr)<e; const off=(hash(k*7+fr*3)-.5)*160*gi; X.drawImage(useNext?OFF2:OFF1,0,y0,W,H/n+1,off,y0,W,H/n+1); if(hash(k+fr)>.8){ X.globalCompositeOperation='lighter'; X.globalAlpha=.35*gi; X.drawImage(useNext?OFF2:OFF1,0,y0,W,H/n+1,off+12,y0,W,H/n+1); X.globalAlpha=1; X.globalCompositeOperation='source-over'; } } X.fillStyle=`rgba(56,214,255,${.12*gi})`; X.fillRect(0,0,W,H); }
  else { X.drawImage(OFF1,0,0); X.globalAlpha=e; X.drawImage(OFF2,0,0); X.globalAlpha=1; } }

// ---- overlays ----
function aiChapterTitle(s,t){ const lt=t-s.start, d=s.card; if(!s.ch||lt>=d) return; const a=smooth(.15,.7,lt)*(1-smooth(d-.7,d,lt)); const c=MOODC[s.mood]||'#fff'; X.save(); X.setTransform(1,0,0,1,0,0); X.globalAlpha=.55*a; X.fillStyle='#000'; X.fillRect(0,0,W,H); X.globalAlpha=a; X.textAlign='center'; X.fillStyle=c; X.font='600 22px Georgia'; X.fillText(('CHAPTER  '+s.ch).split('').join(String.fromCharCode(8202)),W/2,H/2-70); const sc=lerp(1.12,1,ease(smooth(.1,.8,lt))); X.translate(W/2,H/2+10); X.scale(sc,sc); X.fillStyle='#fff'; X.shadowColor=c; X.shadowBlur=30; X.font='bold 78px Georgia'; const tw=X.measureText(s.title).width; if(tw>1120) X.scale(1120/tw,1120/tw); X.fillText(s.title,0,0); X.restore(); X.save(); X.globalAlpha=a; X.textAlign='center'; X.fillStyle='#c8cce0'; X.font='italic 24px Georgia'; X.fillText(s.sub,W/2,H/2+66); X.restore(); }
function aiTags(s,t){ X.save(); X.setTransform(1,0,0,1,0,0); const lab=LABELS[s.label]; if(lab){ X.font='700 14px Georgia'; const txt=lab[0], tw=X.measureText(txt).width+24; X.fillStyle='rgba(0,0,0,.6)'; rr(24,6,tw,24,12); X.fill(); X.strokeStyle=lab[1]; X.lineWidth=1.6; X.stroke(); X.fillStyle=lab[1]; X.textAlign='left'; X.fillText(txt,36,23); }
  if(s.year){ const c=(s.mood==='machine'||s.mood==='fiction')?'#7ee3ff':'#d4a437'; X.textAlign='right'; X.font='700 22px Georgia'; X.fillStyle=c; X.shadowColor=c; X.shadowBlur=10; X.fillText(s.year,W-28,26); } X.restore(); }
function aiScan(s){ if(s.mood!=='fiction'&&s.mood!=='machine') return; X.save(); X.setTransform(1,0,0,1,0,0); X.globalAlpha=s.mood==='fiction'?.07:.04; X.fillStyle='#000'; for(let y=0;y<H;y+=3) X.fillRect(0,y,W,1); if(s.mood==='fiction'){ X.globalAlpha=.06; X.fillStyle='#ff2a2a'; X.fillRect(0,0,W,H); } X.restore(); }

window.renderAt=function(t){ window.__t=t; X=MAINCTX; if(!TL.length) buildTL(); const B=beatAt(t), s=B.shot; X.setTransform(1,0,0,1,0,0); X.globalAlpha=1; X.globalCompositeOperation='source-over'; X.shadowBlur=0;
  const tr=B.tr, dur=tr?(tr.dur||1.2):0, p=tr?(t-B.start)/dur:2;
  if(tr&&B.k>0&&p>=0&&p<1){ renderBeatTo(OX1,TL[B.k-1],t); renderBeatTo(OX2,B,t); X=MAINCTX; compose(tr,p,t); }
  else renderBeatTo(MAINCTX,B,t);
  X=MAINCTX; X.setTransform(1,0,0,1,0,0);
  aiChapterTitle(s,t); aiScan(s);
  bloom(); bokeh(t,'rgba(120,190,255,.10)'); vignette(); grain(t);
  X.fillStyle='#000'; X.fillRect(0,0,W,36); X.fillRect(0,H-58,W,58);
  if(t<1.2) flash(1-t/1.2,'#000'); if(SCH.total-t<2.2) flash(1-(SCH.total-t)/2.2,'#000');
  subtitle(s,t); aiTags(s,t); if(window.aiHud) aiHud(s,t); };
