// ===== music video: clips of the Bible-film story beats, cut on the beat =====
const MVT='FABLE 5.2 MUSIC VIDEO 2026', MVS='CHRISTIAN TIMELINE';
function mvTitle(u,t,d){ sky(['#000','#07061a','#120a24']); stars(260,11,t,smooth(0,.4,u)); glow(W/2,H*.5,lerp(10,520,ease(u)),'rgba(255,220,160,.8)',u); rays(W/2,H*.5,28,t,'rgba(255,220,160,.4)',smooth(.3,1,u));
  const a=smooth(.08,.3,u)*(1-smooth(.88,1,u)); X.save(); X.globalAlpha=a; aiText(MVS,W/2,H*.48,84,'#fff','center','#ffb347'); aiText(MVT,W/2,H*.48+62,30,'#ffe9b0'); aiText('from Eden to the Return',W/2,H*.48+108,24,'#c8b890'); X.restore(); }
function mvEnd(u,t,d){ sky(['#3a70b0','#c89a6a','#e8c48a']); glow(W/2,H*.42,lerp(300,900,u),'rgba(255,252,240,.9)'); rays(W/2,H*.3,40,t,'rgba(255,245,210,.5)',1); particles('sparkle',t,70,909,1);
  const a=smooth(.05,.3,u); X.save(); X.globalAlpha=a; aiText('Come, Lord Jesus',W/2,H*.4,92,'#3a2408','center','#fff'); aiText(MVS+' · '+MVT,W/2,H*.56,26,'#3a2408'); aiText('Animation: Claude Fable 5.2 · Music made with Suno',W/2,H*.64,20,'#5a4020'); X.restore(); }
const MV_YEAR={title:'',end:'Eternity',creation:'The Beginning',adam:'The Beginning'};
function mvFn(c){ if(String(c.key).startsWith('CUSTOM:')){ const n=c.key.slice(7); return [n==='title'?mvTitle:mvEnd, MV_YEAR[n]]; }
  if(String(c.key).startsWith('SCENE:')){ const n=c.key.slice(6); return [(u,t,d)=>SCENES[n](u*d*.9+d*.05, d), MV_YEAR[n]||YEARS[c.sid]||'']; }
  const st=STORY[c.sid]; let b=typeof c.key==='number'?st[c.key]:st.find(x=>x[0]===c.key); if(!b){ console.error('missing beat',c.sid,c.key); b=st[0]; } return [b[1], YEARS[c.sid]||'']; }
Object.keys(MV).forEach((id,si)=>{ BEATS_AI[id]=MV[id].map((c,k)=>{ const [fn,yr]=mvFn(c), n=si*3+k;
  const TR=[Z(W/2,H*.5,.5,5),IR(W/2,H*.5,.5,'#ffe9b0'),FD(.35),GL(.4),IR(W*.5,H*.4,.5,'#fff'),FD(.4)][n%6];
  return [c.off,(u,t,d,B)=>{ B.shot.year=yr; fn(u,t-B.start,d); if(yr==='Future') B.shot.year='No one knows the day'; },TR]; }); });
BEATS_AI.presents=undefined;
