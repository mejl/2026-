import json,subprocess,re,os
from concurrent.futures import ThreadPoolExecutor
os.chdir(os.path.dirname(os.path.abspath(__file__)))
MODEL='/tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/movie/voices/en_US-ryan-high.onnx'
AF='highpass=f=70,lowshelf=g=3:f=180,equalizer=f=3000:t=q:w=1:g=2,acompressor=threshold=-18dB:ratio=3:attack=10:release=200,aecho=0.8:0.5:40|75:0.12|0.08,volume=1.3'
GAP=0.4
# pronunciation helpers (speech only; subtitles keep the normal spelling)
SAY={'xAI':'x A I','OpenAI':'Open A I','DeepMind':'Deep Mind','DeepSeek':'Deep Seek','AlexNet':'Alex Net','AlphaGo':'Alpha Go','AlphaFold':'Alpha Fold','SoftBank':'Soft Bank','Nvidia':'En vidia','Huawei':'Wah way','Anthropic':'An thropic','ImageNet':'Image Net','Nebuchadnezzar':'Neb uh kad nezzer','Belshazzar':'Bel shazzer','Upharsin':'Oo far seen','Tekel':'Tea kel','Mene':'Mee nee','Mythos':'My thos','Sora':'Soar uh','PaLM':'Palm','Llama':'Lama','InstructGPT':'Instruct G P T','AutoGPT':'Auto G P T','LaMDA':'Lam da','Chinchilla':'Chin chilla','Hugging Face':'Hugging Face','Grok':'Grock'}
def speak(t):
    for k,v in SAY.items(): t=t.replace(k,v)
    return t
def dur(f): return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
os.makedirs('sent',exist_ok=True)
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','lavfi','-i','anullsrc=r=44100:cl=stereo','-t',str(GAP),'sent/gap.wav'],check=True)
C=json.load(open('script_ai.json'))
shots=[(c,s) for c in C for s in c['shots']]
def tts(job):
    key,i,text=job; raw=f'sent/{key}_{i}_raw.wav'; wav=f'sent/{key}_{i}.wav'
    tf=f'sent/{key}_{i}.txt'
    if os.path.exists(wav) and os.path.exists(tf) and open(tf).read()==text: return wav
    subprocess.run(['piper','-m',MODEL,'--length_scale','1.1','-f',raw],input=speak(text).encode(),check=True,capture_output=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',raw,'-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,'+AF,'-ar','44100','-ac','2',wav],check=True)
    open(tf,'w').write(text)
    return wav
jobs=[]
for c,s in shots:
    s['sents']=[x.strip() for x in re.findall(r'[^.!?]+[.!?]+',s['say'])]
    jobs+=[(s['id'],i,t) for i,t in enumerate(s['sents'])]
with ThreadPoolExecutor(4) as ex: list(ex.map(tts,jobs))
t=5.0; sch=[dict(id='presents',scene='presents',start=0,card=0,vo=None,end=5.0,label='',year='',mood='bible')]
for c,s in shots:
    tt=0; caps=[]; files=[]
    for i,sent in enumerate(s['sents']):
        f=f"sent/{s['id']}_{i}.wav"; dd=dur(f)
        parts=[p.strip() for p in re.split(r'(?<=,)\s+',sent)] if len(sent)>80 else [sent]
        merged=[]
        for p in parts:
            if merged and len(merged[-1])+len(p)<60: merged[-1]+=' '+p
            else: merged.append(p)
        tot=sum(len(p) for p in merged); acc=0
        for p in merged: caps.append(dict(text=p,start=tt+acc/tot*dd,end=tt+(acc+len(p))/tot*dd)); acc+=len(p)
        files+=[f,'sent/gap.wav']; tt+=dd+GAP
    with open('sent/l.txt','w') as L:
        for f in files[:-1]: L.write(f"file '{os.path.abspath(f)}'\n")
    subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i','sent/l.txt','-c:a','pcm_s16le',f"v_{s['id']}.wav"],check=True)
    vd=dur(f"v_{s['id']}.wav")
    card=3.0 if (s['first'] and c['ch']) else 0.6
    last=(s is shots[-1][1]); tail=7.0 if last else 1.0
    e=dict(id=s['id'],scene=s['id'],ch=c['ch'] if s['first'] else '',title=c['title'],sub=c['sub'],mood=c['mood'],label=s['label'],year=s['year'],say=s['say'],start=t,card=card,vo=t+card,vodur=vd,end=t+card+vd+tail,last=last)
    e['caps']=[dict(text=k['text'],start=round(k['start']+e['vo'],3),end=round(k['end']+e['vo'],3)) for k in caps]
    sch.append(e); t=e['end']
json.dump(dict(total=t,scenes=sch),open('schedule.json','w'),indent=1,ensure_ascii=False)
print('TOTAL seconds',round(t,1),'=',round(t/60,1),'min; shots',len(shots))
