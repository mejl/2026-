import json,subprocess
from faster_whisper import WhisperModel
LYR=open('lyrics.txt').read().split('\n')
m=WhisperModel('small',device='cpu',compute_type='int8',local_files_only=True)
out=[]; t=0.0; L=24; step=18
while t<255:
    subprocess.run(['ffmpeg','-loglevel','error','-y','-ss',str(t),'-t',str(L),'-i','song.m4a','-map','0:a','-af','highpass=f=200,lowpass=f=5000','-ac','1','-ar','16000','sl.wav'],check=True)
    segs,_=m.transcribe('sl.wav',word_timestamps=True,language='en',initial_prompt='Jesus Christ loves you. Yeah, you know it\'s true. Every step you move. Yeshua loves you. Shalom.',vad_filter=False,condition_on_previous_text=False,temperature=0)
    ws=[]
    for s in segs:
        for w in (s.words or []):
            if (t==0 or w.start>=3) and w.start<3+step: ws.append([round(t+w.start,2),round(t+w.end,2),w.word])
    out.append(dict(start=t,words=ws)); print(t,' '.join('%s@%.1f'%(w[2].strip(),w[0]) for w in ws)[:400],flush=True)
    t+=step
json.dump(out,open('tr.json','w'))
