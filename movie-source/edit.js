// ===== film editing: cut to new framings every few seconds, auto-framing the main character =====
window.__heroCur={h:0,x:W/2,y:H*.6}; window.__heroPrev={h:0,x:W/2,y:H*.6};
const __figV3=figure; figure=function(x,y,h,t,o={}){ try{ const m=X.getTransform(); const sx=m.a*x+m.c*y+m.e, sy=m.b*x+m.d*y+m.f, sh=h*Math.abs(m.d);
  if(sh>window.__heroCur.h){ const c=window.CAM, s=c.s; // convert screen -> world (undo camera)
    const wx=(sx-W/2)/s+W/2-c.tx, wy=(sy-sh*.55-H/2)/s+H/2-c.ty; window.__heroCur={h:sh,x:wx,y:wy}; } }catch(e){}
  return __figV3(x,y,h,t,o); };
camFor=function(s,u){
  const bodyT=u*window.__shotDur, id=parseInt((s.id||'s0').slice(1))||0;
  if(s.scene==='presents'||s.scene==='intro'||s.scene==='outro') return {s:lerp(1.0,1.12,ease(clamp(u))),tx:0,ty:0};
  // cut lengths 3.5-6s, deterministic per shot
  let t0=0, c=0; while(true){ const len=3.5+hash(id*31+c)*2.5; if(bodyT<t0+len||c>40) break; t0+=len; c++; }
  const len=3.5+hash(id*31+c)*2.5, v=clamp((bodyT-t0)/len);
  const kind=c===0?0:Math.floor(hash(id*57+c*13)*5);   // first cut of a shot is always the wide establishing shot
  const hero=window.__heroPrev; const drift=hash(id*7+c)>.5?1:-1;
  let sc,cx,cy;
  if(kind===0){ sc=lerp(1.04,1.14,v); cx=W/2+drift*lerp(-40,40,v); cy=H/2; }                 // wide, slow drift
  else if(kind===1){ sc=lerp(1.45,1.55,v); cx=hero.x+drift*lerp(-25,25,v); cy=hero.y; }     // medium on character
  else if(kind===2){ sc=lerp(1.9,2.1,v); cx=hero.x; cy=hero.y-10; }                         // close-up push
  else if(kind===3){ sc=1.35; cx=W/2+drift*lerp(-120,120,v); cy=H*.62; }                    // low tracking pan
  else { sc=lerp(1.6,1.25,v); cx=lerp(hero.x,W/2,v); cy=lerp(hero.y,H/2,v); }             // reveal pull-back
  const hw=W/(2*sc), hh=H/(2*sc); cx=clamp(cx,hw,W-hw); cy=clamp(cy,hh,H-hh);
  return {s:sc,tx:W/2-cx,ty:H/2-cy};
};
