// ===== 2D anime drawing kit: smooth shapes, tapered ink, cel shadows clipped to shapes =====
const W=1920,H=1080;
let SEED=11; const R=()=>{ SEED=(SEED*16807)%2147483647; return SEED/2147483647; };
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
// Catmull-Rom through control points -> dense polyline
function cr(P,closed=false,n=14){ const out=[], m=P.length; const g=i=>closed?P[(i+m)%m]:P[Math.max(0,Math.min(m-1,i))];
  const segs=closed?m:m-1; for(let i=0;i<segs;i++){ const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2); for(let k=0;k<n;k++){ const t=k/n,t2=t*t,t3=t2*t;
    out.push([.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)]); } }
  if(!closed) out.push(P[m-1]); return out; }
function pathOf(X,pts){ X.beginPath(); pts.forEach((p,i)=>i?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1])); X.closePath(); }
// filled smooth shape
function fillS(X,P,fill,closed=true){ const pts=cr(P,closed); pathOf(X,pts); X.fillStyle=fill; X.fill(); return pts; }
// clip to a smooth shape and run fn (for cel shadows / highlights that stay inside a form)
function inside(X,P,fn){ X.save(); pathOf(X,cr(P,true)); X.clip(); fn(); X.restore(); }
// tapered hand-inked line along a smooth curve: width swells in the middle, thins at both ends
function ink(X,P,w,col='#2a160e',taper=[.15,.15],closed=false){ const pts=cr(P,closed,18); const n=pts.length; X.fillStyle=col;
  const L=[],Rr=[]; for(let i=0;i<n;i++){ const a=pts[Math.max(0,i-1)], b=pts[Math.min(n-1,i+1)]; let dx=b[0]-a[0], dy=b[1]-a[1]; const l=Math.hypot(dx,dy)||1; dx/=l; dy/=l;
    const t=i/(n-1); let k=1; if(!closed){ if(t<taper[0]) k=t/taper[0]; else if(t>1-taper[1]) k=(1-t)/taper[1]; k=Math.pow(clamp(k),.7); } const ww=w*(.25+.75*k)*.5;
    L.push([pts[i][0]-dy*ww,pts[i][1]+dx*ww]); Rr.push([pts[i][0]+dy*ww,pts[i][1]-dx*ww]); }
  X.beginPath(); L.forEach((p,i)=>i?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1])); for(let i=Rr.length-1;i>=0;i--) X.lineTo(Rr[i][0],Rr[i][1]); X.closePath(); X.fill(); }
// outline a closed shape with even ink
function inkC(X,P,w,col='#2a160e'){ const pts=cr(P,true,18); pathOf(X,pts); X.lineJoin='round'; X.lineWidth=w; X.strokeStyle=col; X.stroke(); }
function glow(X,x,y,r,col,a=1){ X.save(); X.globalCompositeOperation='lighter'; const g=X.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,col.replace('A',a)); g.addColorStop(1,col.replace('A',0)); X.fillStyle=g; X.fillRect(x-r,y-r,2*r,2*r); X.restore(); }
function star4(X,x,y,r,a,col='#fff8e6'){ X.save(); X.translate(x,y); X.globalAlpha=a; X.fillStyle=col; X.beginPath(); X.moveTo(0,-r); X.quadraticCurveTo(r*.1,-r*.1,r,0); X.quadraticCurveTo(r*.1,r*.1,0,r); X.quadraticCurveTo(-r*.1,r*.1,-r,0); X.quadraticCurveTo(-r*.1,-r*.1,0,-r); X.fill(); X.restore(); }
