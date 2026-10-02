// ===================== THE FIVE LEVELS: visuals (data driven from window.AGI) =====================
const AGI_LABS=[{n:'OpenAI',f:'GPT',c:'#46e6b0'},{n:'Anthropic',f:'Claude',c:'#e8a070'},{n:'Google',f:'Gemini',c:'#7ab0ff'},{n:'xAI',f:'Grok',c:'#c8d4e8'}];
const AGI_LV=['','Chatbots','Reasoners','Agents','Innovators','Organizations','ASI'];
const AGI_LC=['#6a7488','#7ee3ff','#a58bff','#46e68c','#ffcf60','#ff9a50','#ff4a6a'];
const AGI_DESC=['','talks like a person','solves problems step by step','acts for days on your behalf','invents new things','runs an entire company','beyond every human mind'];
const AGI_ERA={real:['#060a18','#0c1430','#142046'],pred:['#140a05','#2a1608','#3c2610'],asi:['#0a0414','#1c0a34','#2c1050']};
function kwS(s,word){ const c=(s.caps||[]).find(c=>(c.raw||c.text).toLowerCase().includes(String(word).toLowerCase())); return c?c.start:(s.vo+s.vodur*.5); }
function agiFit(str,x,y,maxw,size,col,align,glowc,weight){ X.save(); let sz=size; X.font=`${weight||600} ${sz}px Georgia, serif`; while(X.measureText(str).width>maxw&&sz>11){ sz-=1; X.font=`${weight||600} ${sz}px Georgia, serif`; } X.textAlign=align||'left'; if(glowc){ X.shadowColor=glowc; X.shadowBlur=sz*.5; } X.fillStyle=col; X.fillText(str,x,y); X.restore(); }
// event key times + order
Object.keys(AGI.shots).forEach(id=>{ const q=AGI.shots[id], s=SCH.scenes.find(x=>x.id===id); if(!s||!q.events) return; q.events.forEach(e=>{ e.kt=kwS(s,e.key); }); q.events.sort((a,b)=>a.kt-b.kt); });
function agiStateAt(sid,t){ const q=AGI.shots[sid]; const base=(q.kind==='outro'?q.end:(q.start||[])); const st=base.map(a=>({model:a[0],note:a[1],lvl:a[2],pred:a[3]||0,age:99,up:99}));
  (q.events||[]).forEach(e=>{ if(t>=e.kt){ const s=st[e.lab]; s.model=e.model; s.note=e.note; s.pred=e.pred?1:0; s.age=t-e.kt; if(e.lvl){ s.up=t-e.kt; s.lvl=e.lvl; } } }); return st; }
function agiBG(era,t){ const c=AGI_ERA[era]||AGI_ERA.real; X.fillStyle=grad(c); X.fillRect(-60,-60,W+120,H+120); for(let i=0;i<70;i++){ const x=(hash(i)*W+t*(4+hash(i+3)*8))%W, y=hash(i+9)*H; X.fillStyle=`rgba(180,200,255,${.05+.1*hash(i+5)})`; X.fillRect(x,y,2,2); } X.strokeStyle='rgba(120,150,220,.05)'; X.lineWidth=1; for(let g=0;g<W;g+=64){ X.beginPath(); X.moveTo(g,0); X.lineTo(g,H); X.stroke(); } for(let g=0;g<H;g+=64){ X.beginPath(); X.moveTo(0,g); X.lineTo(W,g); X.stroke(); } }
// ---------- level icons ----------
function agiIcon(lv,x,y,r,t,c){ X.save(); X.translate(x,y); X.strokeStyle=c; X.fillStyle=c; X.lineWidth=Math.max(2,r*.06); X.lineJoin='round';
  if(lv===0){ X.globalAlpha=.9; rr(-r*.5,-r*.5,r,r,r*.1); X.stroke(); for(let i=-2;i<=2;i++){ X.beginPath(); X.moveTo(i*r*.2,-r*.5); X.lineTo(i*r*.2,-r*.7); X.moveTo(i*r*.2,r*.5); X.lineTo(i*r*.2,r*.7); X.moveTo(-r*.5,i*r*.2); X.lineTo(-r*.7,i*r*.2); X.moveTo(r*.5,i*r*.2); X.lineTo(r*.7,i*r*.2); X.stroke(); } X.globalAlpha=.25; X.fillRect(-r*.3,-r*.3,r*.6,r*.6); }
  else if(lv===1){ X.globalAlpha=.9; rr(-r*.8,-r*.6,r*1.0,r*.6,r*.14); X.stroke(); X.beginPath(); X.moveTo(-r*.5,0); X.lineTo(-r*.6,r*.2); X.lineTo(-r*.3,0); X.stroke(); rr(-r*.1,-r*.1,r*.9,r*.6,r*.14); X.globalAlpha=.35; X.fill(); X.globalAlpha=.9; X.stroke(); for(let k=0;k<3;k++){ X.globalAlpha=.4+.6*(.5+.5*Math.sin(t*5-k)); X.beginPath(); X.arc(r*.1+k*r*.22,r*.2,r*.05,0,TAU); X.fill(); } }
  else if(lv===2){ X.font=`600 ${r*1.4}px Georgia`; X.textAlign='center'; X.textBaseline='middle'; X.fillText('Σ',0,0); for(let k=0;k<3;k++){ const a=t*1.4+k*TAU/3; X.globalAlpha=.8; X.beginPath(); X.arc(Math.cos(a)*r*.85,Math.sin(a)*r*.85,r*.07,0,TAU); X.fill(); } }
  else if(lv===3){ X.restore(); aiRobot(x,y+r*.95,r*1.9,t,{eye:c,walk:1}); return; }
  else if(lv===4){ glowIcon(0,-r*.1,r*.9,c); X.beginPath(); X.arc(0,-r*.15,r*.45,Math.PI*.8,Math.PI*.2+TAU); X.stroke(); X.beginPath(); X.moveTo(-r*.2,r*.28); X.lineTo(-r*.2,r*.5); X.lineTo(r*.2,r*.5); X.lineTo(r*.2,r*.28); X.stroke(); for(let k=0;k<7;k++){ const a=-Math.PI/2+(k-3)*.45; X.beginPath(); X.moveTo(Math.cos(a)*r*.62,-r*.15+Math.sin(a)*r*.62); X.lineTo(Math.cos(a)*r*.82,-r*.15+Math.sin(a)*r*.82); X.stroke(); } }
  else if(lv===5){ X.globalAlpha=.9; rr(-r*.7,-r*.6,r*.6,r*1.2,4); X.stroke(); rr(-r*.05,-r*.9,r*.7,r*1.5,4); X.stroke(); for(let a=0;a<4;a++) for(let b=0;b<4;b++){ X.globalAlpha=.25+.5*hash(a*4+b+Math.floor(t*1.5)); X.fillRect(r*.03+b*r*.15,-r*.8+a*r*.3,r*.09,r*.14); X.fillRect(-r*.6+(b%2)*r*.25,-r*.5+a*r*.25,r*.12,r*.14); } }
  else { for(let k=0;k<4;k++){ X.globalAlpha=.8-k*.15; X.beginPath(); X.arc(0,0,r*(.25+k*.2)+Math.sin(t*2+k)*r*.03,0,TAU); X.stroke(); } X.globalAlpha=1; glowIcon(0,0,r*.5,c); X.beginPath(); X.arc(0,0,r*.16,0,TAU); X.fill(); }
  X.restore(); }
function glowIcon(x,y,r,c){ const g=X.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,c+'66'); g.addColorStop(1,c+'00'); X.save(); X.fillStyle=g; X.fillRect(x-r,y-r,r*2,r*2); X.restore(); }
// ---------- HUD ladder ----------
const agiRY=l=>l===0?640:600-(l-1)*84;
function aiHud(s,t){ const q=AGI.shots[s.id]; if(!q||q.kind==='intro') return; if(s.ch&&t-s.start<s.card) return; const st=agiStateAt(s.id,t);
  X.save(); X.setTransform(1,0,0,1,0,0); X.globalAlpha=smooth(0,.6,t-s.start)*.96; X.fillStyle='rgba(3,6,16,.80)'; rr(10,62,184,600,14); X.fill(); X.strokeStyle='rgba(255,255,255,.14)'; X.lineWidth=1.2; X.stroke();
  X.textAlign='center'; X.font='700 12px Georgia'; X.fillStyle='#9fb4d8'; X.fillText('OPENAI AGI LEVELS',102,82);
  for(let i=0;i<4;i++){ X.fillStyle=AGI_LABS[i].c; X.beginPath(); X.arc(92+i*26,98,4,0,TAU); X.fill(); }
  for(let l=1;l<=6;l++){ const y=agiRY(l); X.strokeStyle='rgba(255,255,255,.16)'; X.lineWidth=1.2; X.beginPath(); X.moveTo(22,y); X.lineTo(182,y); X.stroke(); X.textAlign='left'; X.font='700 13px Georgia'; X.fillStyle=AGI_LC[l]; X.fillText(l<6?String(l):'★',24,y-10); X.font='600 11px Georgia'; X.fillStyle='rgba(220,230,255,.75)'; X.fillText(AGI_LV[l],40,y-10); }
  X.textAlign='left'; X.font='600 10px Georgia'; X.fillStyle='rgba(180,195,230,.5)'; X.fillText('before level 1',24,agiRY(0)+22);
  for(let i=0;i<4;i++){ const S=st[i]; let l=S.lvl; if(S.up<1.4) l=S.lvl-1+ease(clamp(S.up/1.4)); const y=agiRY(l), x=92+i*26; const moving=S.up<1.4; glow(x,y,moving?30:14,AGI_LABS[i].c+(moving?'cc':'66')); X.fillStyle=AGI_LABS[i].c; X.beginPath(); X.arc(x,y,7,0,TAU); X.fill(); X.strokeStyle='#fff'; X.lineWidth=moving?2.4:1.2; X.stroke(); }
  X.restore(); }
// ---------- lane scene ----------
function agiFrontier(st){ let m=0; st.forEach(s=>{ m=Math.max(m,s.lvl); }); return m; }
function agiLane(i,S,t,q){ const L=AGI_LABS[i], y=136+i*118, X0=206, Wd=1040, dead=(S.model==='—'); X.save(); X.globalAlpha=dead?.5:1;
  X.fillStyle='rgba(8,14,30,.88)'; rr(X0,y,Wd,108,16); X.fill();
  if(S.age<1.8){ X.globalAlpha=(dead?.5:1)*(1-S.age/1.8)*.55; X.fillStyle=L.c; rr(X0,y,Wd,108,16); X.fill(); glow(X0+Wd/2,y+54,420,L.c+'88'); X.globalAlpha=dead?.5:1; }
  X.strokeStyle=L.c; X.lineWidth=2.4; if(S.pred) X.setLineDash([10,7]); rr(X0,y,Wd,108,16); X.stroke(); X.setLineDash([]);
  X.fillStyle=L.c; rr(X0,y,9,108,4); X.fill();
  X.textAlign='left'; X.font='700 24px Georgia'; X.fillStyle=L.c; X.fillText(L.n,X0+26,y+50); X.font='600 15px Georgia'; X.fillStyle='rgba(190,205,235,.7)'; X.fillText(L.f+' family',X0+26,y+76);
  agiFit(S.model,X0+190,y+60,560,40,S.pred?'#ffd6a0':'#ffffff','left');
  if(S.note) agiFit(S.note,X0+190,y+90,560,18,'#9fb4d8','left',null,500);
  if(S.pred){ X.font='700 12px Georgia'; X.fillStyle='#ffb347'; X.textAlign='right'; X.fillText('PREDICTED',X0+Wd-20,y+20); }
  const bx=X0+Wd-248, by=y+26; X.fillStyle=S.lvl?AGI_LC[S.lvl]+'22':'rgba(100,110,130,.15)'; rr(bx,by,228,60,12); X.fill(); X.strokeStyle=AGI_LC[S.lvl]; X.lineWidth=1.6; X.stroke(); X.textAlign='center';
  if(S.lvl){ X.font='700 13px Georgia'; X.fillStyle=AGI_LC[S.lvl]; X.fillText(S.lvl<6?('LEVEL '+S.lvl):'BEYOND LEVEL 5',bx+114,by+22); X.font='700 24px Georgia'; X.fillStyle='#fff'; X.fillText(AGI_LV[S.lvl],bx+114,by+48); } else { X.font='600 15px Georgia'; X.fillStyle='#8a94aa'; X.fillText('not on the ladder yet',bx+114,by+36); }
  X.restore(); }
function agiLaneScene(B,t){ const s=B.shot, q=AGI.shots[s.id], st=agiStateAt(s.id,t); agiBG(q.era||'real',t);
  agiFit(q.title||'',726,104,980,32,'#eaf1ff','center','#38d6ff',700);
  const fr=agiFrontier(st); agiFit(fr?('Frontier: level '+(fr<6?fr:'5+')+' · '+AGI_LV[fr]):'Frontier: the road to level 1',726,126,700,17,'#8aa0c8','center',null,500);
  for(let i=0;i<4;i++) agiLane(i,st[i],t,q);
  // level-up banner
  for(let i=0;i<4;i++){ const S=st[i]; if(S.up<3.4){ const k=smooth(0,.25,S.up)*(1-smooth(2.7,3.4,S.up)); X.save(); X.globalAlpha=k; X.fillStyle='rgba(0,0,0,.80)'; rr(300,282,860,140,20); X.fill(); X.strokeStyle=AGI_LC[S.lvl]; X.lineWidth=3; X.shadowColor=AGI_LC[S.lvl]; X.shadowBlur=24; X.stroke(); X.shadowBlur=0; agiFit(S.lvl<6?('LEVEL '+S.lvl+' REACHED'):'SUPERINTELLIGENCE',730,350,780,54,'#fff','center',AGI_LC[S.lvl]); agiFit(AGI_LABS[i].n+' · '+S.model+' · '+AGI_LV[S.lvl],730,396,780,26,AGI_LABS[i].c,'center'); X.restore(); } } }
// ---------- spotlight ----------
function agiSpot(B,t,e){ const s=B.shot, q=AGI.shots[s.id], L=AGI_LABS[e.lab], lt=t-e.kt, a=smooth(0,.4,lt); agiBG(q.era||'real',t);
  const col=e.lvl?AGI_LC[e.lvl]:L.c; glow(730,330,560,col+'55'); for(let k=0;k<3;k++){ const p=((lt*.5+k/3)%1); X.strokeStyle=col+Math.floor((1-p)*90+10).toString(16).padStart(2,'0'); X.lineWidth=2; X.beginPath(); X.arc(730,330,90+p*420,0,TAU); X.stroke(); }
  agiIcon(e.lvl||0,730,168,70,t,col);
  X.save(); X.globalAlpha=a; agiFit(L.n.toUpperCase()+' · '+L.f.toUpperCase(),730,262,700,22,L.c,'center'); agiFit(e.model,730,346,900,e.model.length>16?72:92,e.pred?'#ffd6a0':'#ffffff','center',col);
  if(e.note) agiFit(e.note,730,398,900,28,'#b8c8e8','center',null,500);
  if(e.lvl){ X.fillStyle='rgba(0,0,0,.7)'; rr(380,440,700,84,16); X.fill(); X.strokeStyle=col; X.lineWidth=2.4; X.stroke(); agiFit((e.lvl<6?'LEVEL '+e.lvl+' REACHED':'SUPERINTELLIGENCE')+' · '+AGI_LV[e.lvl],730,494,660,36,'#fff','center',col); agiFit(e.pred?'PREDICTION':'MY JUDGMENT',730,458,300,13,e.pred?'#ffb347':'#a58bff','center',null,700); }
  else { X.fillStyle=e.pred?'rgba(255,179,71,.18)':'rgba(70,230,180,.15)'; rr(560,448,340,40,20); X.fill(); agiFit(e.pred?'EXPECTED · NOT RELEASED':'NEW MODEL',730,475,320,16,e.pred?'#ffb347':'#7ee3c0','center',null,700); }
  X.restore(); }
// ---------- intro ----------
function agiIntro(B,t){ const s=B.shot; agiBG('real',t); const ks=['level one','level two','level three','level four','level five','superintelligence']; const t0=kwS(s,'level one'); const k0=smooth(0,1,t-(t0-.3));
  const ty=lerp(330,104,ease(k0)), sz=lerp(78,40,ease(k0)); agiFit('THE FIVE LEVELS OF AGI',640,ty,1100,sz,'#fff','center','#38d6ff',700); agiFit('OpenAI · July 2024',640,ty+lerp(54,26,ease(k0)),700,lerp(28,18,ease(k0)),'#8aa0c8','center',null,500);
  ks.forEach((k,i)=>{ const kt=kwS(s,k), p=smooth(0,.7,t-kt); if(p<=0) return; const l=i+1, y=160+i*78, x=240+(1-ease(p))*160; X.save(); X.globalAlpha=p; X.fillStyle='rgba(8,14,30,.88)'; rr(x,y,860,68,14); X.fill(); X.strokeStyle=AGI_LC[l]; X.lineWidth=2; X.stroke(); X.fillStyle=AGI_LC[l]; X.beginPath(); X.arc(x+38,y+34,24,0,TAU); X.fill(); X.fillStyle='#050810'; X.textAlign='center'; X.font='700 26px Georgia'; X.fillText(l<6?String(l):'★',x+38,y+43); agiFit(AGI_LV[l]==='ASI'?'Superintelligence (ASI)':AGI_LV[l],x+80,y+32,330,30,'#fff','left'); agiFit(AGI_DESC[l],x+80,y+56,520,18,'#9fb4d8','left',null,500); X.restore(); agiIcon(l-1>=0?l:0,x+780,y+34,26,t,AGI_LC[l]); });
}
function agiTimelineBar(B,t){ const s=B.shot; agiBG('real',t); agiFit('2022 → 2032, three months at a time',640,110,1100,40,'#fff','center','#38d6ff',700); const p=smooth(0,2.2,t-kwS(s,'this film follows')); const x0=110,x1=1170,y=330; X.strokeStyle='rgba(255,255,255,.3)'; X.lineWidth=3; X.beginPath(); X.moveTo(x0,y); X.lineTo(lerp(x0,x1,p),y); X.stroke();
  for(let yr=2022;yr<=2032;yr++){ const f=(yr-2022)/10, x=lerp(x0,x1,f); if(f>p+.02) continue; const real=yr<2026, now=yr===2026; X.fillStyle=real?'#46e6b0':(now?'#a58bff':'#ffb347'); X.beginPath(); X.arc(x,y,9,0,TAU); X.fill(); agiFit(String(yr),x,y-24,80,24,'#fff','center'); for(let qq=1;qq<4;qq++){ X.fillStyle='rgba(255,255,255,.35)'; X.fillRect(x+qq*(lerp(x0,x1,.1)-x0)/4-1,y-6,2,12); } }
  const b=[['2022 – today','FACT','#46e6b0'],['which model hit which level','MY JUDGMENT','#a58bff'],['after today','PREDICTION','#ffb347']]; b.forEach(([a,l,c],i)=>{ const kk=smooth(0,.7,t-kwS(s,'this film follows')-2.2-i*.5); X.save(); X.globalAlpha=kk; X.fillStyle='rgba(8,14,30,.88)'; rr(150+i*360,430,320,110,16); X.fill(); X.strokeStyle=c; X.lineWidth=2.4; X.stroke(); agiFit(l,310+i*360,478,290,28,c,'center'); agiFit(a,310+i*360,516,290,18,'#b8c8e8','center',null,500); X.restore(); }); }
function agiThree(B,t){ const s=B.shot; agiBG('asi',t); agiFit('THREE THINGS TO WATCH',640,120,1100,48,'#fff','center','#ff9a50',700); const L=[['How long agents can work without a human','how long agents',3],['Whether an AI can build the next AI','whether an a i',4],['Who decides when to slow down','who decides',5]]; L.forEach(([txt,k,lv],i)=>{ const p=smooth(0,.8,t-kwS(s,k)), y=190+i*130; if(p<=0) return; X.save(); X.globalAlpha=p; X.fillStyle='rgba(8,14,30,.88)'; rr(200+(1-ease(p))*120,y,880,100,16); X.fill(); X.strokeStyle=AGI_LC[lv]; X.lineWidth=2.4; X.stroke(); agiFit(String(i+1),260,y+66,60,54,AGI_LC[lv],'center'); agiFit(txt,320,y+62,720,34,'#fff','left'); X.restore(); }); }
// ---------- beats ----------
const AW=f=>(u,t,d,B)=>f(B,t);
function agiBeatsFor(id){ const q=AGI.shots[id], s=SCH.scenes.find(x=>x.id===id), vd=s.vodur, i=parseInt(id.slice(1)), col=q.era==='asi'?'#c28bff':(q.era==='pred'?'#ffb347':'#7ee3ff');
  if(q.kind==='intro') return [[0,AW(agiIntro),FD(1.4)],['this film follows',AW(agiTimelineBar),MO(240,146,860,68,1.2)],['every date up to today',AW(agiTimelineBar),FD(.9)]];
  if(q.kind==='outro') return [[0,AW(agiLaneScene),FD(1.2)],['how long agents',AW(agiThree),IR(640,360,1.3,'#ff9a50')]];
  const TR=[Z(726,360,1.2,6),IR(726,330,1.2,col),MO(206,136,1040,472,1.2),GL(.9),FD(1.0)][i%5];
  const beats=[[0,AW(agiLaneScene),TR]]; let last=-9, evs=q.events.filter(e=>e.spot).map(e=>({e,r:e.kt-s.vo}));
  evs.forEach((o,k)=>{ const r=o.r; if(r<1.6||r<last+.8) return; let D=3.4; const nx=evs[k+1]; if(nx) D=Math.min(D,nx.r-.9-r); if(D<1.8||r+D>vd-.9) return;
    const e=o.e, y=136+e.lab*118+54, c=e.lvl?AGI_LC[e.lvl]:AGI_LABS[e.lab].c;
    beats.push([r,(u,t,d,B)=>agiSpot(B,t,e),e.lvl?IR(726,y,1.1,c):Z(726,y,1.0,6)]);
    beats.push([r+D,AW(agiLaneScene),FD(.7)]); last=r+D; });
  return beats; }
Object.keys(AGI.shots).forEach(id=>{ BEATS_AI[id]=agiBeatsFor(id); });
BEATS_AI.presents=[[0,(u,t,d,B)=>{ X.fillStyle='#000'; X.fillRect(-60,-60,W+120,H+120); particles('sparkle',t,50,4711,.5); const a=smooth(.1,.3,u)*(1-smooth(.82,.98,u)); X.globalAlpha=a; aiText('C L A U D E   S O N N E T   5 . 5',W/2,H/2-40,22,'#d4a437'); aiText('EFFORT: ULTRACODE',W/2,H/2+18,46,'#ffffff','center','#38d6ff'); aiText('presents',W/2,H/2+70,20,'#8a8fa6'); X.globalAlpha=1; }]];
