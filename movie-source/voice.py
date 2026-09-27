import json,subprocess,re,os
from gtts import gTTS
from concurrent.futures import ThreadPoolExecutor
AF='asetrate=24000*0.88,aresample=44100,atempo=1.02,aecho=0.8:0.7:60|120:0.25|0.15,volume=1.6'
GAP=0.4
def dur(f): return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
os.makedirs('sent',exist_ok=True)
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','lavfi','-i','anullsrc=r=44100:cl=stereo','-t',str(GAP),'sent/gap.wav'],check=True)
d=json.load(open('shots.json'))
shots=[]
for ci,c in enumerate(d):
    for si,s in enumerate(c['shots']):
        s['key']=f"s{len(shots):02d}"; s['chi']=ci; s['first']=(si==0); shots.append(s)
def tts(job):
    key,i,text=job; mp3=f'sent/{key}_{i}.mp3'; wav=f'sent/{key}_{i}.wav'
    for attempt in range(4):
        try: gTTS(text,tld='co.uk').save(mp3); break
        except Exception as e: import time; time.sleep(2*(attempt+1))
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',mp3,'-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,'+AF,'-ar','44100','-ac','2',wav],check=True)
    return wav
jobs=[]
for s in shots:
    s['sents']=[x.strip() for x in re.findall(r'[^.!?]+[.!?]+',s['say'])]
    jobs+=[(s['key'],i,t) for i,t in enumerate(s['sents'])]
with ThreadPoolExecutor(6) as ex: list(ex.map(tts,jobs))
for s in shots:
    t=0; caps=[]; files=[]
    for i,sent in enumerate(s['sents']):
        f=f"sent/{s['key']}_{i}.wav"; dd=dur(f)
        parts=[p.strip() for p in re.split(r'(?<=,)\s+',sent)] if len(sent)>80 else [sent]
        merged=[]
        for p in parts:
            if merged and len(merged[-1])+len(p)<60: merged[-1]+=' '+p
            else: merged.append(p)
        tot=sum(len(p) for p in merged); acc=0
        for p in merged: caps.append({"text":p,"start":t+acc/tot*dd,"end":t+(acc+len(p))/tot*dd}); acc+=len(p)
        files+=[f,'sent/gap.wav']; t+=dd+GAP
    with open('sent/l.txt','w') as L:
        for f in files[:-1]: L.write(f"file '{os.path.abspath(f)}'\n")
    subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i','sent/l.txt','-c:a','pcm_s16le',f"v_{s['key']}.wav"],check=True)
    s['dur']=dur(f"v_{s['key']}.wav"); s['caps']=caps
t=5.0; sch=[{"id":"presents","scene":"presents","start":0,"card":0,"vo":None,"end":5.0,"sfx":"wind"}]
for s in shots:
    c=d[s['chi']]; card=3.0 if (s['first'] and c['ch']) else 0.6
    tail=1.0 if s['scene']!='outro' else 7.0
    e=dict(id=s['key'],scene=s['scene'],p=s.get('p',[0,1]),sfx=s['sfx'],ch=c['ch'] if s['first'] else '',title=c['title'],sub=c['sub'],say=s['say'],start=t,card=card,vo=t+card,vodur=s['dur'],end=t+card+s['dur']+tail)
    e['caps']=[dict(text=k['text'],start=round(k['start']+e['vo'],3),end=round(k['end']+e['vo'],3)) for k in s['caps']]
    sch.append(e); t=e['end']
json.dump({"total":t,"scenes":sch},open('schedule.json','w'),indent=1)
print('TOTAL',round(t,1),'shots',len(shots))
