// ===== v3 character model: filled, proportioned, robed figures =====
function seg(x1,y1,x2,y2,w1,w2){ const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
  X.beginPath(); X.moveTo(x1+nx*w1,y1+ny*w1); X.lineTo(x2+nx*w2,y2+ny*w2); X.arc(x2,y2,w2,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI,false);
  X.lineTo(x1-nx*w1,y1-ny*w1); X.arc(x1,y1,w1,Math.atan2(-ny,-nx),Math.atan2(-ny,-nx)+Math.PI,false); X.closePath(); X.fill(); }
function armPath(sx,sy,a1,a2,L1,L2){ const ex=sx+Math.sin(a1)*L1, ey=sy+Math.cos(a1)*L1, hx=ex+Math.sin(a1+a2)*L2, hy=ey+Math.cos(a1+a2)*L2;
  seg(sx,sy,ex,ey,3.6,2.8); seg(ex,ey,hx,hy,2.8,2.1); X.beginPath(); X.ellipse(hx,hy,2.6,3.2,a1+a2,0,TAU); X.fill(); return [hx,hy]; }
function hx2rgb(h){ h=h.replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join(''); const n=parseInt(h,16); return [n>>16&255,n>>8&255,n&255]; }
function mixc(a,b,t){ const A=hx2rgb(a),B=hx2rgb(b); return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')+')'; }
function lum(h){ const [r,g,b]=hx2rgb(h); return (0.3*r+0.59*g+0.11*b)/255; }
const ROBES=['#8a6a48','#6a4a36','#a08a66','#5a4a66','#7a3a2a','#4a5a6a','#9a7a50','#6a5a3a'], MANTLES=['#4a2a20','#2a3a4a','#6a2a2a','#3a4a2a','#5a3a5a','#7a5a2a'], SKINS=['#b27a52','#8e5c3c','#c48c62','#a06a46'];
figure=function(x,y,h,t,o={}){
  const col=o.col||'#07070d', rim=o.rim||null, pose=o.pose||'stand', dir=o.dir||1, ph=o.ph||0, walk=o.walk||0;
  const female=o.female!=null?o.female:hash(Math.floor(ph*97)+11)>.6;
  const glowing=lum(col)>.55; const k=Math.floor(Math.abs(ph)*7.3)+(female?3:0), rimc=rim&&rim[0]==='#'?rim:'#ffe8c0';
  const scr=Math.abs(h*X.getTransform().d); const detail=!glowing&&scr>55;
  const robe=glowing?col:mixc(ROBES[k%ROBES.length],col,.35), mantle=glowing?col:mixc(MANTLES[k%MANTLES.length],col,.35);
  const skin=glowing?col:mixc(SKINS[k%SKINS.length],col,.3), hair=glowing?col:mixc('#1e140c',col,.2);
  const shade=(c)=>{ if(!detail) return col; const g=X.createLinearGradient(-14,0,14,0); g.addColorStop(0,col); g.addColorStop(.45,c); g.addColorStop(1,mixc(c.startsWith('rgb')?'#'+c.match(/\d+/g).map(v=>(+v).toString(16).padStart(2,'0')).join(''):c,rimc,.35)); return g; };
  const br=Math.sin(t*1.7+ph), wind=Math.sin(t*1.1+ph*.7);
  const cyc=t*5.2*walk+ph, sw=Math.sin(cyc), bob=walk?Math.abs(Math.cos(cyc))*1.6:0;
  const look=Math.sin(t*.45+ph*2)*.12;           // slow head turn
  const gest=(Math.sin(t*.9+ph*1.3)+1)/2;         // slow gesture cycle 0..1
  X.save(); X.translate(x,y); X.scale(dir*h/100*.86,h/100); X.translate(0,-bob);
  X.fillStyle=col; X.strokeStyle=col;
  const kneel=pose==='kneel'||pose==='pray';
  const drop=kneel?24:0;                            // body lowers when kneeling
  const shY=-80+drop+br*.25, hipY=-48+drop, hemY=kneel?-4:-5;
  // --- feet stepping under the hem ---
  if(!kneel){ const fA=walk?sw*9:0, fB=-fA;
    seg(-4+fA*.5,hemY-6,-5+fA,-1.5,2.6,2.4); X.beginPath(); X.ellipse(-3+fA,-1.2,5,2,0,0,TAU); X.fill();
    seg(4+fB*.5,hemY-6,5+fB,-1.5,2.6,2.4); X.beginPath(); X.ellipse(6+fB,-1.2,5,2,0,0,TAU); X.fill(); }
  else { X.beginPath(); X.ellipse(-12,-2,14,4,0,0,TAU); X.fill(); }
  // --- robe: shoulders -> waist -> flared hem that swings with walk and wind ---
  const hemSw=(walk?sw*5:0)+wind*2.2;
  X.fillStyle=shade(robe); X.beginPath(); X.moveTo(-9,shY+2.5);
  X.bezierCurveTo(-10.5,shY+12,-7.2,hipY-6,-7.8,hipY+2);        // chest to waist
  X.bezierCurveTo(-9,hipY+20,-11+hemSw*.4,hemY-8,-12.5+hemSw,hemY);  // gentle flare
  X.quadraticCurveTo(0,hemY+2,12.5+hemSw,hemY);                   // hem
  X.bezierCurveTo(11+hemSw*.4,hemY-8,9,hipY+20,7.8,hipY+2);
  X.bezierCurveTo(7.2,hipY-6,10.5,shY+12,9,shY+2.5);
  X.quadraticCurveTo(5,shY-1.5,0,shY-1); X.quadraticCurveTo(-5,shY-1.5,-9,shY+2.5); X.closePath(); X.fill();
  // mantle/cloak in wind
  X.fillStyle=shade(mantle); X.beginPath(); X.moveTo(7,shY+1); X.bezierCurveTo(14+wind*3,shY+18,16+wind*5,hipY+10,17+wind*7+hemSw,hemY+1); X.lineTo(10,hemY); X.bezierCurveTo(10,hipY,10,shY+16,5,shY+3); X.closePath(); X.globalAlpha=.94; X.fill(); X.globalAlpha=1;
  if(detail){ X.save(); X.fillStyle=mixc(MANTLES[(k+2)%MANTLES.length],col,.3); X.fillRect(-8,hipY-3,16,3.2); X.fillRect(2,hipY-1,2.4,10);
    X.globalAlpha=.35; X.fillStyle=col; X.beginPath(); X.moveTo(-12.5+hemSw,hemY); X.quadraticCurveTo(0,hemY+2,12.5+hemSw,hemY); X.lineTo(11.5+hemSw*.9,hemY-4); X.quadraticCurveTo(0,hemY-2,-11.5+hemSw*.9,hemY-4); X.fill();
    X.strokeStyle=col; X.lineWidth=.7; X.globalAlpha=.4; for(const fx of [-4,1,5]){ X.beginPath(); X.moveTo(fx,hipY+3); X.quadraticCurveTo(fx+hemSw*.3,hipY+20,fx*1.3+hemSw*.6,hemY-3); X.stroke(); } X.restore(); }
  // --- neck + head (slightly turned) ---
  X.fillStyle=detail?skin:col;
  seg(0,shY-1,look*6,shY-7,3.1,2.8);
  const hx=look*8, hy=shY-14.5;
  X.beginPath(); X.ellipse(hx,hy,5.6,6.8,look*.4,0,TAU); X.fill();
  if(female){ // head covering draping to shoulders
    X.fillStyle=detail?shade(mantle):col; X.beginPath(); X.moveTo(hx-7.5,hy-2); X.quadraticCurveTo(hx,hy-11,hx+7.5,hy-2); X.bezierCurveTo(hx+9,hy+8,hx+11+wind*2,shY+6,hx+12+wind*3,shY+12); X.lineTo(hx-11,shY+10); X.bezierCurveTo(hx-9,shY+2,hx-9,hy+6,hx-7.5,hy-2); X.fill(); }
  else { // hair + beard
    X.fillStyle=detail?hair:col; X.beginPath(); X.moveTo(hx-6.4,hy-1); X.quadraticCurveTo(hx-5,hy-9.5,hx+1,hy-8.8); X.quadraticCurveTo(hx+7,hy-8,hx+6.6,hy-1); X.quadraticCurveTo(hx+7.4,hy+3,hx+5.2,hy+3); X.lineTo(hx-6,hy+1); X.closePath(); X.fill();
    X.beginPath(); X.ellipse(hx+.8,hy+5,4.6,4.4,0,0,TAU); X.fill(); }
  if(detail&&scr>80){ X.save(); X.fillStyle='#1a100a'; const ex=hx+2+look*6; X.beginPath(); X.ellipse(ex-2.2,hy-1,.75,.9,0,0,TAU); X.ellipse(ex+1.9,hy-1,.75,.9,0,0,TAU); X.fill();
    X.strokeStyle=hair; X.lineWidth=.7; X.beginPath(); X.moveTo(ex-3.4,hy-3); X.lineTo(ex-1,hy-3.3); X.moveTo(ex+.8,hy-3.3); X.lineTo(ex+3.2,hy-3); X.stroke(); X.restore(); }
  // --- arms by pose (animated) ---
  X.fillStyle=detail?shade(robe):col;
  const sL=[-9.5,shY+3], sR=[9.5,shY+3]; const aSw=walk?sw*.45:0;
  let staffHand=null;
  if(pose==='arms'){ const up=.62+gest*.18; armPath(...sL,Math.PI-up,-.1,15,13); armPath(...sR,Math.PI+up,.1,15,13); }
  else if(pose==='staff'){ armPath(...sL,.15-aSw,-.35,15,13); staffHand=armPath(...sR,-.55,-1.25,15,12); }
  else if(pose==='sling'){ armPath(...sL,.35,-.3,15,13); const a=t*13; const hd=armPath(...sR,Math.PI+.55,.25,15,13); X.lineWidth=1.3; X.beginPath(); X.moveTo(hd[0],hd[1]); X.lineTo(hd[0]+Math.cos(a)*15,hd[1]+Math.sin(a)*15); X.stroke(); }
  else if(pose==='pray'||pose==='kneel'){ armPath(...sL,.45,2.15,14,12); armPath(...sR,.3,2.35,14,12); }
  else if(pose==='point'){ armPath(...sL,.12,-.2,15,13); armPath(...sR,Math.PI*.55+gest*.15,.05,15,14); }
  else if(pose==='bless'){ armPath(...sL,.3+gest*.2,-.4,15,13); armPath(...sR,Math.PI*.62+gest*.25,-.3,15,13); }
  else { // natural standing: arms relaxed, gentle talking gesture or walk swing
    const g=walk?0:gest*.35; armPath(...sL,.1+aSw,-.18,15,13); armPath(...sR,-.1-aSw-g,.18+g*1.4,15,13); }
  if(staffHand){ X.lineWidth=2.6; X.lineCap='round'; X.beginPath(); X.moveTo(staffHand[0]+1,-118+drop); X.quadraticCurveTo(staffHand[0]+5,-121+drop,staffHand[0]+4,-114+drop); X.moveTo(staffHand[0]+1,-118+drop); X.lineTo(staffHand[0]+1,0); X.stroke(); }
  // --- rim light along the lit edge (robe, head) ---
  if(rim){ X.save(); X.strokeStyle=rim; X.shadowColor=rim; X.shadowBlur=8; X.globalAlpha=.9; X.lineWidth=1.2; X.lineCap='round';
    X.beginPath(); X.ellipse(hx,hy,6.1,7.3,look*.4,-1.8,.2); X.stroke();
    X.beginPath(); X.moveTo(10.5,shY+2); X.bezierCurveTo(12,shY+14,9.5,hipY-4,11,hipY+4); X.bezierCurveTo(13,hipY+22,15+hemSw*.4,hemY-8,16+hemSw,hemY); X.stroke();
    X.restore(); }
  X.restore(); };
crowd=function(x0,x1,y,h,t,walk,col,n,seed){ for(let i=0;i<n;i++){ const s=hash(seed+i); const x=lerp(x0,x1,i/n)+s*20+(walk?t*walk:0); const hh=h*(.78+s*.3);
  const idleWalk=!walk && s>.75; const ix=idleWalk?Math.sin(t*.3+i)*30:0;
  figure(((x+ix)%(W+200)+W+200)%(W+200)-100,y+s*10,hh,t,{col,ph:i*1.7,pose:s>.85?'staff':(s<.12?'point':'stand'),walk:walk||idleWalk?1:0,dir:walk?(walk<0?-1:1):(idleWalk?(Math.cos(t*.3+i)>0?1:-1):(s>.5?1:-1))}); } };

// ===== camera with parallax =====
// Each shot gets a move; sky/ridges read CAM to move less than the foreground.
window.CAM={s:1,tx:0,ty:0};
function camFor(s,u){ const kind=Math.floor(hash(parseInt((s.id||'s0').slice(1))*13+5)*5); const e=ease(clamp(u));
  if(s.scene==='presents'||s.scene==='intro'||s.scene==='outro') return {s:lerp(1.0,1.12,e),tx:0,ty:0};
  if(kind===0) return {s:1.18,tx:lerp(-90,90,e),ty:0};            // pan right
  if(kind===1) return {s:1.18,tx:lerp(90,-90,e),ty:0};            // pan left
  if(kind===2) return {s:lerp(1.02,1.32,e),tx:0,ty:lerp(0,-20,e)}; // push in
  if(kind===3) return {s:lerp(1.3,1.04,e),tx:0,ty:0};              // pull out
  return {s:1.2,tx:lerp(-30,30,e),ty:lerp(60,-50,e)};              // crane up
}
function applyCam(k){ const c=window.CAM; const s=lerp(1,c.s,k); X.setTransform(1,0,0,1,0,0); X.translate(W/2,H/2); X.scale(s,s); X.translate(-W/2+c.tx*k,-H/2+c.ty*k); }
const __sky2=sky; sky=function(stops){ X.save(); applyCam(.15); __sky2(stops); X.restore(); };
const __stars=stars; stars=function(...a){ X.save(); applyCam(.1); __stars(...a); X.restore(); };
const __ridge2=ridge; ridge=function(seed,base,amp,col,rough,sharp){ X.save(); applyCam(clamp(.25+(base/H-.55)*1.6,.2,.9)); __ridge2(seed,base,amp,col,rough,sharp); X.restore(); };
