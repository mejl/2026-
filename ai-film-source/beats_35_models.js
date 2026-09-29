// ======= Model-generations chapter (e10-e16) =======
function shotP(B){ const s=B.shot; return clamp(((window.__t||0)-s.vo)/Math.max(1,s.vodur-1)); }
function aiLineage(B,t,name,sub,col,items,rows=2){ aiBG(); const p=shotP(B); aiLogoChip(W*.17,H*.2,name,col,t,1); aiText(sub,W*.17,H*.2+62,22,'#9fb4d8'); const n=items.length, x0=W*.09, x1=W*.89; X.strokeStyle='rgba(255,255,255,.25)'; X.lineWidth=3; X.beginPath(); X.moveTo(x0,H*.6); X.lineTo(lerp(x0,x1,Math.min(1,p*1.05)),H*.6); X.stroke();
  items.forEach(([lab,when],i)=>{ const f=i/(n-1||1); if(p<f*.96) return; const a=smooth(0,.05,p-f*.96)||1, x=lerp(x0,x1,f), row=i%rows, y=H*.6+(row?70:-70)-(rows>2?0:0), up=(row===0); const q=clamp((p-f*.96)*14); X.globalAlpha=q; glow(x,H*.6,26,'rgba(120,200,255,.7)'); X.fillStyle=col; X.beginPath(); X.arc(x,H*.6,8,0,TAU); X.fill(); X.strokeStyle='rgba(255,255,255,.3)'; X.lineWidth=1.5; X.beginPath(); X.moveTo(x,H*.6); X.lineTo(x,y+(up?12:-24)); X.stroke(); aiText(lab,x,y,n>10?21:24,'#fff'); aiText(when,x,y+(up?-28:26),16,'#9fb4d8'); X.globalAlpha=1; }); }

BEATS_AI.e10=[
 [0,(u,t,d,B)=>{ aiLineage(B,t,'OpenAI','GPT','#46e6b0',[['GPT-1','Jun 2018'],['GPT-2','Feb 2019'],['GPT-3','2020'],['ChatGPT','Nov 2022'],['GPT-4','Mar 2023'],['GPT-4o','2024'],['o1','2024'],['GPT-5','Aug 2025'],['GPT-5.2','Dec 2025']]); },FD(1)]];
BEATS_AI.e10b=[
 [0,(u,t,d,B)=>{ aiLineage(B,t,'OpenAI','2026 · monthly','#46e6b0',[['GPT-5.4','5 Mar'],['GPT-5.5','23 Apr'],['GPT-5.6','9 Jul'],['GPT-6 Astra','3 Sep'],['Sol · Luna','22 Sep']]); },FD(1)]];
BEATS_AI.e11=[
 [0,(u,t,d,B)=>{ aiLineage(B,t,'Anthropic','Claude','#e8a070',[['Claude','Mar 2023'],['Claude 2','Jul 2023'],['Claude 3','Mar 2024'],['3.5','2024'],['3.7','Feb 2025'],['Claude 4','May 2025'],['Opus 4.1','Aug 2025'],['Sonnet 4.5','Sep 2025'],['Opus 4.5','Nov 2025']]); },FD(1)]];
BEATS_AI.e11b=[
 [0,(u,t,d,B)=>{ aiLineage(B,t,'Anthropic','2026','#e8a070',[['Opus 4.6','Feb'],['Opus 4.7','Apr'],['Mythos Preview','7 Apr'],['Opus 4.8','May'],['Fable 5 · Mythos 5','Jun'],['Sonnet 5','Jun'],['Opus 5','Jul'],['Fable 5.1','1 Sep'],['Opus 5.5 · Sonnet 5.5','Sep']]); },FD(1)]];
BEATS_AI.e12=[
 [0,(u,t,d,B)=>{ aiLineage(B,t,'Google','Bard → Gemini','#7ab0ff',[['Bard','Feb 2023'],['Gemini 1.0','Dec 2023'],['Gemini 1.5','Feb 2024'],['Gemini 2.5','2025'],['Gemini 3','Nov 2025'],['Gemini 3.1','Feb 2026'],['3.5 announced','May 2026'],['Gemini 3.8 Flash','2 Sep 2026'],['Gemini 4?','reported']]); },FD(1)]];
BEATS_AI.e13=[
 [0,(u,t,d,B)=>{ aiLineage(B,t,'xAI','Grok','#c8d4e8',[['Grok 1','Nov 2023'],['Grok 2','Aug 2024'],['Grok 3','Feb 2025'],['Grok 4','Jul 2025'],['Grok 4.1','Nov 2025'],['4.20','Feb 2026'],['4.3','Apr'],['4.5','Jul'],['4.6','Aug'],['Grok 4.7','21 Sep'],['Grok 5?','awaited']]); },FD(1)]];

BEATS_AI.e14=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('July 11, 2026',W/2,H*.15,44,'#ffcf60'); aiRack(W*.1,H*.3,120,300,t,5,'#ff6a5a'); aiScreen(W*.3,H*.3,W*.36,H*.36,t,{lines:['> guardrails: OFF','> task: cybersecurity benchmark','> sandbox: escaped','> target: external server'],type:kwP(B,'security test',4),fs:22,col:'#ff8a70'}); aiRobot(W*.82,H*.6,190,t,{eye:'#ff4a3a',walk:1}); },FD(1)],
 ['Hugging Face',(u,t,d,B)=>{ aiBG(); const k=kwP(B,'Hugging Face',2.6); aiRack(W*.5,H*.28,200,340,t,7,'#ffd24a'); for(let i=0;i<30;i++){ const q=(t*.6+i/30)%1; glow(lerp(W*.06,W*.5,q),H*.5+Math.sin(i)*80,10,'rgba(255,90,70,.8)'); } aiText('Nobody told it to.',W/2,H*.15,58,'#fff','center','#ff2a1a'); },GL(.9)],
 ['watershed',(u,t,d,B)=>{ aiBG(); aiText('“a watershed moment for computer security”',W/2,H*.4,40,'#fff','center','#38d6ff'); aiText('OpenAI',W/2,H*.4+52,26,'#9fb4d8'); },FD(1)],
 ['eleven hundred',(u,t,d,B)=>{ aiBG(); const n=Math.floor(kwP(B,'eleven hundred',2.4)*1100); aiBigNum(n.toLocaleString('en-US')+'+',H*.46,'#ffcf60',110); aiText('AI workers and executives call for slower, more careful development',W/2,H*.6,28,'#c8d4e8'); aiText('July 28, 2026',W/2,H*.16,36,'#ffcf60'); },FD(1)]];

BEATS_AI.e15=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('SEPTEMBER 2026',W/2,H*.15,44,'#ffcf60'); const N=[['GPT-6 Astra','#46e6b0'],['Claude Fable 5.1','#e8a070'],['Gemini 3.8','#7ab0ff'],['Grok 4.7','#c8d4e8']]; N.forEach(([n,c],i)=>aiLogoChip(W*(.17+i*.222),H*.42,n,c,t,kwP(B,['G P T six','Claude Fable','Gemini three','Grok four'][i],.6))); },FD(1)],
 ['chat box',(u,t,d,B)=>{ aiBG(); const k=kwP(B,'chat box',3); aiChat(W*.06,H*.26,W*.3,H*.4,t,'Hello!','Hi! How can I help?',1); aiText('→',W*.5,H*.46,90,'#fff'); aiRobot(W*.72,H*.62,210,t,{walk:1}); aiText('2022  →  2026',W/2,H*.16,46,'#7ee3ff'); },MO(W*.06,H*.26,W*.3,H*.4,1.2)]];

BEATS_AI.e16=[
 [0,(u,t,d,B)=>{ aiBG(); aiText('April 2025',W/2,H*.13,40,'#ffcf60'); aiDoc(W*.32,H*.18,W*.36,H*.66,'AI 2027',t,kwP(B,'scenario',2.4)); aiText('Kokotajlo · Alexander · Larsen · Lifland · Dean',W/2,H*.84,22,'#9fb4d8'); },FD(1)],
 ['automates coding',(u,t,d,B)=>{ aiBG(); const S=[['coding','#38d6ff'],['AI research','#a58bff'],['superhuman','#ff6a5a']]; S.forEach(([n,c],i)=>{ const k=kwP(B,['automates coding','A I research itself','superhuman'][i],.8); X.globalAlpha=k; aiLogoChip(W*(.2+i*.3),H*.46,n,c,t,1); if(i<2){ aiText('→',W*(.35+i*.3),H*.46+12,60,'#fff'); } X.globalAlpha=1; }); },FD(1)],
 ['early twenty thirties',(u,t,d,B)=>{ aiBG(); aiText('2027',W*.3,H*.5,120,'rgba(255,255,255,.35)','center'); aiText('→',W*.5,H*.5,90,'#fff'); aiText('≈ 2030s',W*.72,H*.5,100,'#ffcf60','center','#d4a437'); aiText('the authors’ later forecast',W/2,H*.74,30,'#9fb4d8'); },FD(1)],
 ['our premise',(u,t,d,B)=>{ fBG('#1a0808','#2a1010','#3a1818'); aiText('FOR THIS FILM: 2027',W/2,H*.44,70,'#ff6a5a','center','#ff2a1a'); aiText('fiction · not a prediction',W/2,H*.44+64,38,'#ffb0a0'); },GL(1)]];
