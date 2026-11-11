// ===== Stained-glass music video engine (written from scratch) =====
const W=1920,H=1080,TAU=Math.PI*2,cv=document.getElementById('c'),ART=cv.getContext('2d'); let X=ART;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,sm=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)},ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const hash=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
const hx=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const mix=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
const css=(c,k=1)=>`rgb(${clamp(c[0]*k,0,255)|0},${clamp(c[1]*k,0,255)|0},${clamp(c[2]*k,0,255)|0})`;
const LEAD='#0a0910';
let PA=1,AS=1,LIGHT=1,pc=0,SEED=0,BP=0,T=0;
// ---------- glass piece ----------
function G(pts,col,o={}){ const c=typeof col==='string'?hx(col):col; pc++; let al=PA,sc=1;
  if(AS<1){ const k=hash(pc*7.13+SEED)*.72; const q=sm(k,k+.28,AS); al*=q; sc=.55+.45*q; } if(al<=.01) return;
  let cx=0,cy=0; for(const p of pts){cx+=p[0];cy+=p[1];} cx/=pts.length; cy/=pts.length;
  const v=(o.flat?1:.86+.28*hash(pc*3.7+SEED))*(o.glow?1.1+.5*BP:LIGHT);
  X.save(); X.globalAlpha=al*(o.a??1); X.beginPath(); pts.forEach((p,i)=>{ const x=cx+(p[0]-cx)*sc,y=cy+(p[1]-cy)*sc; i?X.lineTo(x,y):X.moveTo(x,y); }); X.closePath();
  X.fillStyle=css(c,v); X.fill(); const g=X.createLinearGradient(cx-60,cy-80,cx+60,cy+80); g.addColorStop(0,'rgba(255,255,255,.22)'); g.addColorStop(.5,'rgba(255,255,255,0)'); g.addColorStop(1,'rgba(0,0,0,.18)'); X.fillStyle=g; X.fill();
  X.lineJoin='round'; X.lineWidth=o.lw??5; X.strokeStyle=LEAD; X.stroke(); X.restore(); }
const rect=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
const circ=(x,y,r,n=14,ry=r,a0=0)=>Array.from({length:n},(_,i)=>[x+Math.cos(a0+i/n*TAU)*r,y+Math.sin(a0+i/n*TAU)*ry]);
const rot=(pts,cx,cy,a)=>pts.map(([x,y])=>[cx+(x-cx)*Math.cos(a)-(y-cy)*Math.sin(a),cy+(x-cx)*Math.sin(a)+(y-cy)*Math.cos(a)]);
const C=(x,y,r,col,o)=>G(circ(x,y,r,o&&o.n||14),col,o);
function wedge(cx,cy,r1,r2,a1,a2,col,o){ const p=[],n=5; for(let i=0;i<=n;i++){const a=lerp(a1,a2,i/n);p.push([cx+Math.cos(a)*r2,cy+Math.sin(a)*r2]);} for(let i=n;i>=0;i--){const a=lerp(a1,a2,i/n);p.push([cx+Math.cos(a)*r1,cy+Math.sin(a)*r1]);} G(p,col,o); }
function line(x1,y1,x2,y2,w,col){ X.save(); X.globalAlpha=PA*sm(0,.5,AS); X.strokeStyle=col; X.lineWidth=w; X.lineCap='round'; X.beginPath(); X.moveTo(x1,y1); X.lineTo(x2,y2); X.stroke(); X.restore(); }
// ---------- background tessellation ----------
const GX=26,GY=15,PT=[],TRI=[];
for(let j=0;j<=GY;j++) for(let i=0;i<=GX;i++){ const e=(i===0||j===0||i===GX||j===GY)?0:1; PT.push([i*W/GX+(hash(i*13+j*7)-.5)*46*e, j*H/GY+(hash(i*5+j*17+3)-.5)*46*e]); }
for(let j=0;j<GY;j++) for(let i=0;i<GX;i++){ const a=PT[j*(GX+1)+i],b=PT[j*(GX+1)+i+1],c=PT[(j+1)*(GX+1)+i+1],d=PT[(j+1)*(GX+1)+i]; const f=hash(i*3+j*11)>.5; for(const t of (f?[[a,b,c],[a,c,d]]:[[a,b,d],[b,c,d]])) TRI.push({p:t,cx:(t[0][0]+t[1][0]+t[2][0])/3,cy:(t[0][1]+t[1][1]+t[2][1])/3,h:hash(TRI.length*1.7)}); }
function bgcol(s,x,y,t){ const hor=s.hor??720; let c;
  if(y<hor||s.g1==null){ const hh=s.g1==null?H:hor; c=mix(s._top,s._bot,clamp(y/hh)); }
  else { c=mix(s._g1,s._g2,clamp((y-hor)/(H-hor))); if(s.water){ const w=.5+.5*Math.sin(x*.012+t*1.8+y*.06); c=mix(c,[255,255,255],.14*w); } }
  if(s.sun){ const u=s.sun, dx=x-u.x, dy=y-u.y, d=Math.hypot(dx,dy)/u.r; if(y<hor||s.g1==null||u.all){ const k=Math.pow(clamp(1-d),1.4); c=mix(c,u._c,k*.9); if(u.nr){ const a=Math.atan2(dy,dx)+t*(u.spin??.08); const ray=(Math.floor(a/TAU*u.nr*2+1000)%2)?1:0; c=mix(c,u._c,ray*.3*clamp(1.6-d*.8)); } } }
  return c; }
function prep(s){ if(s._p) return s; s._top=hx(s.top); s._bot=hx(s.bot); if(s.g1){ s._g1=hx(s.g1); s._g2=hx(s.g2||s.g1); } if(s.sun) s.sun._c=hx(s.sun.c); s._p=1; return s; }
function drawBg(A,Bg,p,ox,oy,t){ prep(A); if(Bg) prep(Bg); const maxd=Math.hypot(W,H); X.lineJoin='round';
  for(const tr of TRI){ let c=bgcol(A,tr.cx,tr.cy,t), fl=0; if(Bg){ const d=Math.hypot(tr.cx-ox,tr.cy-oy)/maxd; const m=clamp((p*1.7-d*1.1)/.5); if(m>0){ c=mix(c,bgcol(Bg,tr.cx,tr.cy,t),m); fl=Math.sin(m*Math.PI); } }
    const v=(.8+.26*tr.h)*LIGHT*(A.dark??1)+fl*.45; X.beginPath(); X.moveTo(tr.p[0][0],tr.p[0][1]); X.lineTo(tr.p[1][0],tr.p[1][1]); X.lineTo(tr.p[2][0],tr.p[2][1]); X.closePath(); X.fillStyle=css(c,v); X.fill(); X.lineWidth=3.2; X.strokeStyle=LEAD; X.stroke(); } }
// ---------- props ----------
function person(x,y,h,o={}){ const robe=hx(o.robe||'#7a3b2a'), skin=o.skin||'#d9a273', sw=h*.2, bw=h*.34, top=y-h*.8, lean=o.lean||0;
  if(o.halo) { C(x+lean,y-h*.9,h*.17,o.halo===true?'#ffd24a':o.halo,{glow:1}); }
  if(o.wings){ for(const sd of [-1,1]) for(let k=0;k<3;k++){ const a=(-.5-k*.32)+Math.sin(T*3)*.06; G([[x+sd*h*.06,top+h*.08],[x+sd*(h*.06+Math.cos(a)*h*(.62-k*.1)),top+h*.08+Math.sin(a)*h*(.62-k*.1)],[x+sd*(h*.1+Math.cos(a+.3)*h*(.5-k*.1)),top+h*.2+Math.sin(a+.3)*h*(.5-k*.1)]],k%2?'#fff3d0':'#ffffff',{glow:1}); } }
  const strips=3; for(let k=0;k<strips;k++){ const f0=k/strips,f1=(k+1)/strips; G([[x+lean-sw/2+sw*f0,top],[x+lean-sw/2+sw*f1,top],[x-bw/2+bw*f1,y],[x-bw/2+bw*f0,y]],mix(robe,[255,255,255],k===1?.12:0)); }
  if(o.sash) G([[x+lean-sw/2,top+h*.3],[x+lean+sw/2,top+h*.26],[x+lean+sw/2+h*.02,top+h*.33],[x+lean-sw/2-h*.02,top+h*.37]],o.sash);
  for(const [sd,ang] of [[-1,o.armL??.25],[1,o.armR??.25]]){ const sx=x+lean+sd*sw*.45, sy=top+h*.06, a=Math.PI/2-sd*ang*-1; const ex=sx+sd*Math.sin(ang)*h*.33, ey=sy+Math.cos(ang)*h*.33, nx=Math.cos(ang)*h*.04*sd, ny=-Math.sin(ang)*h*.04; G([[sx-nx,sy-ny],[sx+nx,sy+ny],[ex+nx,ey+ny],[ex-nx,ey-ny]],mix(robe,[0,0,0],.15)); C(ex,ey,h*.035,skin,{n:8,lw:3}); }
  C(x+lean,y-h*.9,h*.085,skin,{n:12}); if(o.hair!==0) G(circ(x+lean,y-h*.93,h*.09,9,h*.07).filter(p=>p[1]<y-h*.9),o.hair||'#2a1a10',{lw:3}); if(o.beard) G([[x+lean-h*.05,y-h*.845],[x+lean+h*.05,y-h*.845],[x+lean,y-h*.775]],o.beard,{lw:3}); for(const sd of [-1,1]){ X.save(); X.globalAlpha=PA*sm(.3,1,AS); X.fillStyle='#1a1008'; X.beginPath(); X.arc(x+lean+sd*h*.032,y-h*.9,Math.max(2,h*.011),0,TAU); X.fill(); X.restore(); }
  if(o.crown) G([[x+lean-h*.08,y-h*.98],[x+lean-h*.08,y-h*1.07],[x+lean-h*.04,y-h*1.02],[x+lean,y-h*1.09],[x+lean+h*.04,y-h*1.02],[x+lean+h*.08,y-h*1.07],[x+lean+h*.08,y-h*.98]],'#ffd24a',{glow:1,lw:3}); }
function tree(x,y,s,fruit){ G([[x-14*s,y],[x+14*s,y],[x+9*s,y-150*s],[x-9*s,y-150*s]],'#5a3a22'); [[0,-230,95],[-80,-180,70],[80,-180,70],[-45,-270,60],[45,-270,60]].forEach(([dx,dy,r],i)=>C(x+dx*s,y+dy*s,r*s,i%2?'#2f8a4a':'#3fa85a',{n:10})); if(fruit) [[-60,-200],[30,-250],[70,-170],[-20,-160],[0,-290]].forEach(([dx,dy])=>C(x+dx*s,y+dy*s,13*s,'#e03a2e',{n:8,lw:3,glow:1})); }
function hill(y,col,amp=60,ph=0){ const p=[[0,H]]; for(let i=0;i<=12;i++) p.push([i*W/12,y-Math.sin(i/12*Math.PI+ph)*amp]); p.push([W,H]); G(p,col); }
function stars(n,seed,ymax=600){ for(let i=0;i<n;i++){ const x=hash(i*3.1+seed)*W, y=hash(i*5.3+seed)*ymax, r=(5+hash(i+seed)*9)*(1+.6*BP*hash(i*2+seed)); G([[x,y-r],[x+r*.45,y],[x,y+r],[x-r*.45,y]],'#fff6d0',{lw:2,glow:1,flat:1}); } }
function star8(x,y,r,col='#fff3b0'){ const p=[]; for(let i=0;i<16;i++){ const a=i/16*TAU-Math.PI/2, rr=i%2?r*.36:(i%4===0?r:r*.62); p.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]); } G(p,col,{glow:1}); }
function cross(x,y,s,col='#5a3418'){ G(rect(x-16*s,y-300*s,32*s,300*s),col); G(rect(x-95*s,y-235*s,190*s,30*s),col); }
function boat(x,y,s,sail='#f4ead0'){ G([[x-150*s,y-40*s],[x+150*s,y-40*s],[x+105*s,y+18*s],[x-105*s,y+18*s]],'#6a3e1e'); G(rect(x-5*s,y-250*s,10*s,212*s),'#4a2a12'); G([[x+8*s,y-245*s],[x+125*s,y-70*s],[x+8*s,y-60*s]],sail); G([[x-8*s,y-225*s],[x-95*s,y-70*s],[x-8*s,y-62*s]],mix(hx(sail),[0,0,0],.12)); }
function cloud(x,y,s,col='#e8ecf6'){ [[0,0,70],[-80,20,52],[80,20,56],[-35,-34,48],[40,-38,50]].forEach(([dx,dy,r])=>C(x+dx*s,y+dy*s,r*s,col,{n:10})); }
function flame(x,y,s){ const f=1+.25*Math.sin(T*9+x); G([[x,y-70*s*f],[x+22*s,y-18*s],[x+14*s,y+10*s],[x-14*s,y+10*s],[x-22*s,y-18*s]],'#ff8a2a',{glow:1,lw:3}); G([[x,y-38*s*f],[x+10*s,y-6*s],[x,y+6*s],[x-10*s,y-6*s]],'#ffe26a',{glow:1,lw:2}); }
function column(x,y,h,w=44,a=0){ let p=[rect(x-w/2,y-h,w,h),rect(x-w*.75,y-h-22,w*1.5,22),rect(x-w*.7,y-16,w*1.4,16)]; p.forEach((q,i)=>G(a?rot(q,x,y,a):q,i?'#d8cdb4':'#efe6d0')); }
function rainbowArc(cx,cy,r,w,k=1){ const cols=['#e0352e','#f08a2a','#f5d43a','#3fae5a','#3a7fd8','#7a4ac8']; cols.forEach((c,b)=>{ const n=14, r2=r-b*w, r1=r2-w; for(let i=0;i<n;i++){ if(i/n>k) break; wedge(cx,cy,r1,r2,Math.PI+i/n*Math.PI,Math.PI+(i+1)/n*Math.PI,c,{lw:3}); } }); }
function rose(cx,cy,R,t,k=1){ const pal=['#c8323a','#2f5fc8','#f0b838','#3a9a5a','#7a3aa8','#e87a2a']; const rings=[[.08,.26,8],[.26,.5,12],[.5,.74,16],[.74,1,24]]; rings.forEach(([a,b,n],ri)=>{ if(ri/rings.length>k) return; for(let i=0;i<n;i++){ const a0=i/n*TAU+t*(ri%2?-.12:.12); wedge(cx,cy,a*R,b*R,a0,a0+TAU/n,pal[(i+ri*2)%pal.length]); } }); C(cx,cy,.08*R,'#fff3b0',{glow:1}); }
function scroll(x,y,w,h,k=1){ G(rect(x-w/2,y-h/2,w,h),'#f2e3b8'); for(const sd of [-1,1]) G(circ(x+sd*w/2,y,h*.56,10,h*.56).map(p=>[x+sd*w/2+(p[0]-x-sd*w/2)*.28,p[1]]),'#c89a4a'); const n=5; for(let i=0;i<n;i++){ if(i/n>k) break; X.save(); X.globalAlpha=PA*sm(0,.6,AS); X.fillStyle='#4a3018'; X.fillRect(x-w*.36,y-h*.32+i*h*.15,w*.72*(i%3===2?.6:1),h*.045); X.restore(); } }
function crownP(x,y,s){ G([[x-70*s,y],[x-70*s,y-70*s],[x-35*s,y-30*s],[x,y-90*s],[x+35*s,y-30*s],[x+70*s,y-70*s],[x+70*s,y]],'#ffcf3a',{glow:1}); [-45,0,45].forEach((d,i)=>C(x+d*s,y-14*s,9*s,['#e03a2e','#3a7fd8','#3fae5a'][i],{n:8,lw:2})); }
function church(x,y,s){ G(rect(x-150*s,y-300*s,300*s,300*s),'#8a8394'); for(const sd of [-1,1]){ G(rect(x+sd*150*s-(sd<0?0:90*s),y-460*s,90*s,460*s),'#7a7388'); G([[x+sd*150*s-(sd<0?0:90*s),y-460*s],[x+sd*150*s+(sd<0?90*s:0),y-460*s],[x+sd*(150*s-45*s)+(sd<0?90*s:-90*s)*0+ (sd<0?45*s:-45*s)*0 ,y-620*s]].map((p,i)=>i===2?[x+sd*195*s-(sd<0?-90*s:90*s)*0-(sd>0?90*s:0)+ (sd<0?-90*s:0)*0+ (sd<0?0:0),y-620*s]:p),'#5a5370'); }
  rose(x,y-200*s,62*s,T); G([[x-40*s,y],[x-40*s,y-90*s],[x,y-130*s],[x+40*s,y-90*s],[x+40*s,y]],'#3a2416'); }
function globe(x,y,r,lit,t){ C(x,y,r,'#2a5fa8',{n:28}); const land=[[[-.55,-.35],[-.2,-.55],[.0,-.4],[-.1,-.1],[-.4,.0]],[[.05,-.5],[.5,-.55],[.75,-.2],[.5,.05],[.2,-.1]],[[-.05,.0],[.25,.05],[.3,.45],[.1,.7],[-.1,.35]],[[-.8,.1],[-.55,.1],[-.5,.5],[-.65,.75],[-.8,.4]],[[.55,.35],[.8,.3],[.8,.55],[.6,.6]]]; land.forEach((p,i)=>G(p.map(([a,b])=>[x+a*r,y+b*r]),i%2?'#3f9a52':'#57b060',{lw:3}));
  const N=46; for(let i=0;i<N;i++){ const d=hash(i*9.1)*1.9; if(d/1.9>lit) continue; const a=hash(i*4.7)*TAU, rr=Math.min(.92,d*.5)*r; const px=x+.12*r+Math.cos(a)*rr, py=y-.2*r+Math.sin(a)*rr*.9; if(Math.hypot(px-x,py-y)>r*.95) continue; const q=6+5*BP*hash(i); G([[px,py-q],[px+q,py],[px,py+q],[px-q,py]],'#fff3b0',{lw:2,glow:1,flat:1}); } C(x+.12*r,y-.2*r,13,'#ffd24a',{glow:1,n:8}); }
function wave(y,col,amp=18,n=12,ph=0){ for(let i=0;i<n;i++){ const x0=i*W/n, x1=(i+1)*W/n, m=(x0+x1)/2; G([[x0,y+amp],[m,y-amp+Math.sin(T*2+i+ph)*8],[x1,y+amp],[x1,y+amp+46],[x0,y+amp+46]],col,{lw:3}); } }
function city(y,k=1){ for(let i=0;i<13;i++){ if(i/13>k) break; const x=120+i*140, h=160+hash(i*3.3)*260, w=96; G(rect(x-w/2,y-h,w,h),i%2?'#ffd86a':'#ffe9a0',{glow:1}); if(i%3===0) G([[x-w/2,y-h],[x,y-h-90],[x+w/2,y-h]],'#f0b030',{glow:1}); else G(circ(x,y-h,w/2,10).filter(p=>p[1]<=y-h+1),'#f0b030',{glow:1}); G(rect(x-12,y-h*.6,24,44),'#7ad0ff',{lw:2}); } }
function crowd(n,y,h,seed,o={}){ for(let i=0;i<n;i++){ const x=(i+.5)*W/n+(hash(i+seed)-.5)*40; person(x,y+hash(i*2+seed)*20,h*(.9+.2*hash(i*3+seed)),Object.assign({robe:['#7a3b2a','#2f5f8a','#6a2f6a','#3a7a4a','#a8752a'][i%5],skin:['#d9a273','#b57a4e','#8a5a3a','#f0c8a0'][i%4],armL:o.up?2.6:.2,armR:o.up?2.6:.2},o)); } }
// ---------- text ----------
function gold(str,x,y,size,o={}){ X.save(); X.globalAlpha=(o.a??1); X.font=`${o.w||700} ${size}px Georgia, 'Times New Roman', serif`; X.textAlign=o.align||'center'; X.textBaseline='alphabetic'; X.lineJoin='round'; X.lineWidth=size*.16; X.strokeStyle='rgba(8,6,14,.92)'; X.strokeText(str,x,y); const g=X.createLinearGradient(0,y-size,0,y+size*.2); g.addColorStop(0,o.c1||'#fff6c8'); g.addColorStop(.55,o.c2||'#f2c24a'); g.addColorStop(1,o.c3||'#b8781a'); X.fillStyle=g; X.shadowColor='rgba(255,200,90,.7)'; X.shadowBlur=size*.3*(o.glow??1); X.fillText(str,x,y); X.restore(); }
function lyric(t){ const L=D.LY.find(l=>t>=l.a-.15&&t<=l.b+.35); if(!L) return; const words=L.text.split(' '), n=words.length, dur=(L.b-L.a)*.92; X.save(); X.font=`700 46px Georgia, serif`; const ws=words.map(w=>X.measureText(w+' ').width), tot=ws.reduce((a,b)=>a+b,0); X.restore();
  const fade=sm(L.a-.15,L.a+.1,t)*(1-sm(L.b+.1,L.b+.35,t)); const g=X.createLinearGradient(0,H-190,0,H); g.addColorStop(0,'rgba(5,4,10,0)'); g.addColorStop(.55,'rgba(5,4,10,.78)'); g.addColorStop(1,'rgba(5,4,10,.92)'); X.fillStyle=g; X.globalAlpha=fade; X.fillRect(0,H-190,W,190); X.globalAlpha=1;
  let x=W/2-tot/2; words.forEach((w,i)=>{ const wt=L.a+dur*i/n, q=sm(wt-.02,wt+.16,t), cur=(t>=wt&&t<wt+dur/n); if(q>0) gold(w,x+ws[i]/2-6,H-66-(1-q)*14,46*(cur?1.08:1),{a:fade*q,glow:cur?2.2:.6,c1:cur?'#ffffff':'#fff6c8'}); else gold(w,x+ws[i]/2-6,H-66,46,{a:fade*.22,glow:0,c1:'#8a8068',c2:'#6a6048',c3:'#4a4030'}); x+=ws[i]; }); }
function yearPlate(y,a){ if(!y) return; X.save(); X.globalAlpha=a; X.font='700 34px Georgia, serif'; const w=X.measureText(y).width+56; X.fillStyle='rgba(8,6,14,.82)'; X.strokeStyle='#f2c24a'; X.lineWidth=3; X.beginPath(); X.roundRect(W-w-36,30,w,60,12); X.fill(); X.stroke(); X.restore(); gold(y,W-36-w/2,73,34,{a,glow:.8}); }
