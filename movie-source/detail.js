// ===== environment detail: grass, rocks, flowers on near ridges; windows/doors on buildings =====
function ridgeY(seed,base,amp,rough,sharp,x){ let y=base; for(let k=1;k<=4;k++) y-=amp/k*Math.sin(x*.004*k*(rough||1)+hash(seed+k)*TAU); if(sharp) y-=amp*.35*Math.abs(Math.sin(x*.013+seed)); return y; }
const __ridgeD=ridge; ridge=function(seed,base,amp,col,rough=1,sharp=false){ __ridgeD(seed,base,amp,col,rough,sharp);
  if(base<H*.66||!col||col[0]!=='#') return;
  X.save(); applyCam(clamp(.25+(base/H-.55)*1.6,.2,.9)); const t=window.__t||0, lite=mixc(col,'#ffffff',.18), dark=mixc(col,'#000000',.35);
  // rocks
  for(let i=0;i<14;i++){ const x=hash(seed*7+i)*W, y=ridgeY(seed,base,amp,rough,sharp,x)+8+hash(seed+i*3)*30, r=3+hash(seed+i*5)*9; X.fillStyle=dark; X.beginPath(); X.ellipse(x,y,r*1.4,r,0,0,TAU); X.fill(); X.fillStyle=lite; X.beginPath(); X.ellipse(x-r*.3,y-r*.35,r*.6,r*.35,0,0,TAU); X.fill(); }
  // grass blades swaying in the wind along the ridge line
  X.lineWidth=1.3; X.lineCap='round';
  for(let x=-40;x<W+40;x+=5){ const y=ridgeY(seed,base,amp,rough,sharp,x)+2, hh=5+hash(seed+x)*11, sw=Math.sin(t*1.6+x*.03)*3+2;
    X.strokeStyle=hash(seed+x*3)>.5?lite:dark; X.beginPath(); X.moveTo(x,y); X.quadraticCurveTo(x+sw*.4,y-hh*.6,x+sw,y-hh); X.stroke();
    if(hash(seed+x*7)>.975){ X.fillStyle=['#e8d8a0','#e0a0a0','#f0f0e0'][Math.floor(hash(x)*3)]; X.beginPath(); X.arc(x+sw,y-hh,2,0,TAU); X.fill(); } }
  X.restore(); };
const __cityD=city; city=function(base,col,seed,n=26,maxh=120,domes=true){ __cityD(base,col,seed,n,maxh,domes); if(!col||col[0]!=='#') return;
  const t=window.__t||0, night=lum(col)<.25;
  for(let i=0;i<n;i++){ const w=30+hash(seed+i)*50, x=i*(W/n)-10+hash(seed+i+5)*20, h=30+hash(seed+i+9)*maxh;
    for(let r=0;r<h/22-1;r++) for(let c=0;c<Math.floor(w/14);c++){ const on=hash(seed*31+i*97+r*13+c)>(night?.55:.8);
      X.fillStyle=on?(night?`rgba(255,${190+(hash(i+r)*50|0)},120,${.65+.3*Math.sin(t*.8+i+r+c)})`:mixc(col,'#000000',.4)):mixc(col,'#000000',.25);
      X.fillRect(x+5+c*14,base-h+8+r*22,5,8); }
    X.fillStyle=mixc(col,'#000000',.5); X.fillRect(x+w/2-4,base-14,8,14); } };
