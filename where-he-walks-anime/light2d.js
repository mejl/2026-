// ===== character lighting compositor: the character is drawn on its own layer, then lit to sit in the scene =====
// ambient tint (night colour), warm key light pool, cool shadow side, and rim lights cut from the layer's own silhouette
function mkLayer(){ const c=document.createElement('canvas'); c.width=W; c.height=H; return c; }
function lightLayer(CH,o){ const C=CH.getContext('2d');
  // 1) ambient: multiply the whole figure toward the night colour
  { const T=mkLayer(), tx=T.getContext('2d'); tx.drawImage(CH,0,0); tx.globalCompositeOperation='source-in'; tx.fillStyle=o.ambient||'#8f86d0'; tx.fillRect(0,0,W,H);
    C.save(); C.globalCompositeOperation='multiply'; C.globalAlpha=o.ambientK??.35; C.drawImage(T,0,0); C.restore(); }   // multiply only where the figure is
  // restore alpha (multiply in canvas keeps destination alpha, but make sure we stay inside the figure)
  // 2) shadow side: a cool gradient darkening the side away from the key light
  if(o.shade){ const [x0,x1,col,a]=o.shade; C.save(); C.globalCompositeOperation='source-atop'; const g=C.createLinearGradient(x0,0,x1,0); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,col); C.globalAlpha=a; C.fillStyle=g; C.fillRect(0,0,W,H); C.restore(); }
  // 3) warm key light pool (screen blend, inside the figure only)
  if(o.key){ const [x,y,r,col,a]=o.key; const T=mkLayer(), tx=T.getContext('2d'); const g=tx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,col); g.addColorStop(1,'rgba(0,0,0,0)'); tx.fillStyle=g; tx.fillRect(0,0,W,H);
    tx.globalCompositeOperation='destination-in'; tx.drawImage(CH,0,0); C.save(); C.globalCompositeOperation='screen'; C.globalAlpha=a; C.drawImage(T,0,0); C.restore(); }
  // 4) rim lights: colour where the figure is, minus the figure shifted -> a thin band on the edges facing the light
  for(const rm of (o.rims||[])){ const T=mkLayer(), tx=T.getContext('2d'); tx.drawImage(CH,0,0); tx.globalCompositeOperation='source-in'; tx.fillStyle=rm.col; tx.fillRect(0,0,W,H);
    tx.globalCompositeOperation='destination-out'; tx.drawImage(CH,rm.dx,rm.dy);
    if(rm.mask){ tx.globalCompositeOperation='destination-in'; const g=tx.createLinearGradient(...rm.mask[0]); rm.mask[1].forEach(s=>g.addColorStop(s[0],s[1])); tx.fillStyle=g; tx.fillRect(0,0,W,H); }
    C.save(); C.globalCompositeOperation='lighter'; C.globalAlpha=rm.a??1; C.drawImage(T,0,0); C.restore(); } }
