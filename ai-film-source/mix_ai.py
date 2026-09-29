import json,subprocess,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
END=float(os.environ.get('END','0')) or None
sch=json.load(open('schedule.json')); total=END or sch['total']
vo=[s for s in sch['scenes'] if s.get('vo') is not None and s['vo']<total-.5]
ins=[];flt=[]
for i,s in enumerate(vo):
    ins+=['-i',f"v_{s['id']}.wav"]; ms=int(round(s['vo']*1000)); flt.append(f"[{i}:a]adelay={ms}|{ms}[d{i}]")
n=len(vo)
flt+=[''.join(f'[d{i}]' for i in range(n))+f"amix=inputs={n}:normalize=0,volume=10dB,alimiter=limit=0.9:level=disabled,apad[voice]",f"[{n}:a]volume=0.6[mus]","[voice]asplit=2[vk][vm]",
 "[mus][vk]sidechaincompress=threshold=0.02:ratio=10:attack=40:release=800:makeup=1[duck]","[duck][vm]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-15:TP=-1.5:LRA=11[out]"]
subprocess.run(['ffmpeg','-y','-loglevel','error',*ins,'-i','score.wav','-filter_complex',';'.join(flt),'-map','[out]','-t',str(total),'-ar','44100','mix.wav'],check=True); print('mixed',round(total))
