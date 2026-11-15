import json
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8')
segs,info=m.transcribe('song.wav',language='en',word_timestamps=True,vad_filter=True,condition_on_previous_text=False,temperature=0,no_repeat_ngram_size=4)
out=[]
for s in segs:
    out.append(dict(start=round(s.start,2),end=round(s.end,2),text=s.text.strip(),words=[[round(w.start,2),round(w.end,2),w.word] for w in (s.words or [])]))
    print(round(s.start,1),round(s.end,1),s.text.strip(),flush=True)
json.dump(out,open('tr.json','w'))
