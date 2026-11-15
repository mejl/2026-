import numpy as np, json
from scipy.io import wavfile
sr,x=wavfile.read('song.wav'); x=x.astype(np.float32).mean(1)/32768
hop=512; n=2048; w=np.hanning(n)
fr=np.lib.stride_tricks.sliding_window_view(x,n)[::hop]
S=np.abs(np.fft.rfft(fr*w,axis=1)); L=np.log1p(10*S)
flux=np.maximum(0,np.diff(L,axis=0)).sum(1); flux=(flux-flux.mean())/flux.std()
fps=sr/hop
ac=np.correlate(flux,flux,'full')[len(flux)-1:]
lo,hi=int(fps*60/180),int(fps*60/70); lag=lo+np.argmax(ac[lo:hi]); bpm=60*fps/lag
# refine period + phase by comb score
best=(-1,0,0)
for per in np.linspace(lag-1.5,lag+1.5,61):
    for ph in np.linspace(0,per,40,endpoint=False):
        idx=np.round(np.arange(ph,len(flux)-1,per)).astype(int); sc=flux[idx].mean()
        if sc>best[0]: best=(sc,per,ph)
_,per,ph=best
beats=[round(float(t),3) for t in np.arange(ph,len(flux),per)/fps]
rms=np.sqrt((fr**2).mean(1)); 
json.dump(dict(bpm=60*fps/per,beats=beats),open('beats.json','w'))
print('bpm',round(bpm,1),'refined',round(60*fps/per,2),'nbeats',len(beats),'first',beats[:4])
sec=int(len(x)/sr)
print(' '.join(str(int(10*np.sqrt((x[i*sr:(i+1)*sr]**2).mean()))) for i in range(0,sec,2)))
