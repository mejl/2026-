"""Score for the AI-timeline film: orchestral for biblical scenes, synth pulse for the machine age,
dark drones for the fiction chapters, choir + horns for the Return. Whooshes on illusion transitions."""
import json, os, numpy as np
from functools import lru_cache
from scipy.signal import butter, sosfilt, oaconvolve
from scipy.io import wavfile
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR=44100
sch=json.load(open('schedule.json')); scenes=sch['scenes']; TOTAL=sch['total']
TL=json.load(open('tl.json')) if os.path.exists('tl.json') else []
END=float(os.environ.get('END',TOTAL)); N=int(END*SR)+4*SR
dry=np.zeros((N,2),np.float32); rng=np.random.default_rng(11)
def midi(m): return 440.0*2**((m-69)/12)
def lp(x,f): return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f): return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
def bp(x,a,b): return sosfilt(butter(2,[a,b],'band',fs=SR,output='sos'),x)
def add(sig,t0,pan=0.,g=1.,bus=None):
    bus=dry if bus is None else bus; i=int(t0*SR)
    if i>=N or len(sig)==0 or i<0: return
    sig=sig[:N-i]*g; bus[i:i+len(sig),0]+=(sig*np.sqrt(.5*(1-pan))).astype(np.float32); bus[i:i+len(sig),1]+=(sig*np.sqrt(.5*(1+pan))).astype(np.float32)
def adsr(n,a,d,s,r):
    e=np.full(n,s,np.float32); a,d,r=int(a*SR),int(d*SR),int(r*SR); a=min(a,n); e[:a]=np.linspace(0,1,a); dd=min(d,n-a); e[a:a+dd]=np.linspace(1,s,dd); r=min(r,n); e[n-r:]*=np.linspace(1,0,r); return e
TL_=4096
def table(kind,f0):
    h=np.arange(1,64); h=h[h*f0<9000]; ph=np.arange(TL_)/TL_*2*np.pi
    if kind=='saw': amp=1/h**1.15
    elif kind=='horn': amp=np.where(h%2==1,1/h**1.3,.55/h**1.6)
    elif kind=='ah': f=h*f0; amp=(np.exp(-((f-700)/180)**2)+.6*np.exp(-((f-1200)/220)**2)+.25*np.exp(-((f-2600)/300)**2)+.05)/h**.3
    elif kind=='sq': amp=np.where(h%2==1,1/h,0)
    t=(amp[:,None]*np.sin(h[:,None]*ph[None,:])).sum(0); return (t/np.max(np.abs(t))).astype(np.float32)
@lru_cache(None)
def tab(kind,m): return table(kind,midi(m))
def osc(kind,m,n,detune=0.,vib=0.,vr=5.):
    t=np.arange(n)/SR; f=midi(m)*(1+detune)*(1+vib*np.sin(2*np.pi*vr*t+rng.random()*6)); ph=(np.cumsum(f)/SR+rng.random())%1.
    return tab(kind,m)[(ph*TL_).astype(np.int32)]
@lru_cache(None)
def strings(chord,dur,bright):
    n=int(dur*SR); out=np.zeros(n,np.float32)
    for m in chord:
        for dt in (-.006,-.003,0,.0025,.005): out+=osc('saw',m,n,dt,.0035,5+rng.random())
        out+=.6*osc('saw',m-12,n,.001,.002)
    return (lp(out,bright)*adsr(n,min(1.4,dur/3),.5,.9,min(1.6,dur/3))/(len(chord)*5)).astype(np.float32)
@lru_cache(None)
def choir(chord,dur):
    n=int(dur*SR); out=np.zeros(n,np.float32)
    for m in chord[1:]:
        for dt in (-.004,0,.004): out+=osc('ah',m+12,n,dt,.006,5.3)
    return (out*adsr(n,min(2.2,dur/2.5),.5,.9,min(1.8,dur/3))/(len(chord)*3)).astype(np.float32)
def horn(m,dur):
    n=int(dur*SR); x=osc('horn',m,n,0,.004,5.2)+.5*osc('horn',m,n,.003,.004,5.6); return lp(x,2600)*adsr(n,.18,.3,.8,min(.6,dur/2))*.5
def harp(m):
    n=int(2.5*SR); t=np.arange(n)/SR; x=sum(np.sin(2*np.pi*midi(m)*k*t)*np.exp(-t*(2.5+k*1.5))/k**1.5 for k in range(1,7)); return (x*(1-np.exp(-t*400))*.35).astype(np.float32)
def timp(g=1.,f=62):
    n=int(2.2*SR); t=np.arange(n)/SR; x=np.sin(2*np.pi*np.cumsum(f*(1+.25*np.exp(-t*20)))/SR)*np.exp(-t*2.2)+lp(rng.standard_normal(n),700)*np.exp(-t*25)*.35; return (np.tanh(x*1.5)*g).astype(np.float32)
def kick(g=1.):
    n=int(.5*SR); t=np.arange(n)/SR; x=np.sin(2*np.pi*np.cumsum(50+110*np.exp(-t*28))/SR)*np.exp(-t*7); return (np.tanh(x*2)*g).astype(np.float32)
def hat(g=1.):
    n=int(.09*SR); t=np.arange(n)/SR; return (hp(rng.standard_normal(n),6000)*np.exp(-t*55)*.5*g).astype(np.float32)
def pluck(m,dur=.22,bright=4000):
    n=int(dur*SR); x=osc('saw',m,n,.002)+.6*osc('sq',m-12,n); return (lp(x,bright)*adsr(n,.004,.05,.35,.06)*.5).astype(np.float32)
def subbass(m,dur):
    n=int(dur*SR); t=np.arange(n)/SR; return (np.sin(2*np.pi*midi(m)*t)*adsr(n,.02,.1,.9,.2)*.55).astype(np.float32)
def swell(dur,g):
    n=int(dur*SR); t=np.arange(n)/SR; return (lp(rng.standard_normal(n),2500)*(t/dur)**2.5*g).astype(np.float32)
def whoosh(dur,g=1.,up=True):
    n=int(dur*SR); t=np.arange(n)/SR; x=np.zeros(n,np.float32); seg=int(.04*SR); noise=rng.standard_normal(n).astype(np.float32)
    for k in range(0,n,seg):
        u=k/n; f=300+5200*(u if up else 1-u)**1.6; c=noise[k:k+seg]; x[k:k+len(c)]=bp(c,f*.7,min(f*1.35,SR/2-100))
    return (x*np.sin(np.pi*t/dur)**1.5*g).astype(np.float32)
def glitchburst(dur=.5,g=1.):
    n=int(dur*SR); x=rng.standard_normal(n).astype(np.float32); step=int(.012*SR)
    for k in range(0,n,step): x[k:k+step]=np.round(x[k:k+step]*(2+rng.integers(0,4)))/4*(rng.random()>.35)
    return (hp(x,800)*np.exp(-np.arange(n)/SR*4)*.6*g).astype(np.float32)

P_BIBLE=[(50,57,62,65),(46,53,58,62),(45,52,57,61),(50,57,62,65)]
P_MACH=[(45,52,57,60),(41,48,53,57),(48,55,60,64),(43,50,55,59)]      # Am F C G, cool
P_FICT=[(38,45,50,53),(37,44,49,52),(41,48,53,56),(38,45,51,54)]     # dark minor with clusters
P_GLORY=[(53,60,65,69),(48,55,60,64),(50,57,62,65),(46,53,58,65)]
MOTIF=[(62,1.),(69,1.),(67,.5),(65,.5),(64,1.),(62,2.)]; GLORY_M=[(65,1.),(69,1.),(72,1.5),(70,.5),(69,1.),(65,2.)]
chidx={'IV':0,'V':1,'VI':2,'VII':3}
cur_ch=''
for s in scenes:
    t0,t1=s['start'],min(s['end'],END+2); dur=t1-t0
    if t0>=END: break
    if s['id']=='presents':
        add(choir((50,57,62,65),dur+1),t0,0,.5); add(swell(2.5,.15),t1-2.5); continue
    mood=s.get('mood','bible'); ch=s.get('ch','') or ''
    if ch: cur_ch=ch
    prog={'bible':P_BIBLE,'machine':P_MACH,'fiction':P_FICT,'glory':P_GLORY}[mood]
    inten={'bible':.7,'machine':.6+.12*chidx.get(cur_ch,3),'fiction':.9,'glory':1.0}[mood]
    if ch or s['id']=='a00': add(timp(1.,55),t0,-.2); add(timp(.8,62),t0+.05,.2); add(swell(min(2.5,dur),.06),t0)
    cl=4.0; k=0; tt=t0
    while tt<t1:
        d=round(min(cl+.8,t1-tt+.8),1); ch_=prog[k%4]
        add(strings(ch_,d,2600 if mood in('glory','bible') else 1800),tt,-.35,.9*inten)
        add(strings(tuple(m+12 for m in ch_),d,2600),tt,.35,.32*inten)
        if mood in('bible','glory'): add(choir(ch_,d),tt,.1,.5 if mood=='glory' else .32)
        if mood=='fiction': add(strings((ch_[0]-12,ch_[0]-11,ch_[1]-12),d,900),tt,0,.7)
        tt+=cl; k+=1
    if mood in('bible','glory') and s.get('vo'):
        mot=GLORY_M if mood=='glory' else MOTIF; st=s['vo']+1.0; b=.75
        if s['id'] in ('a00','a01','a04','a11','a48','a51','a52','a54','a55','a56') or mood=='glory':
            for m,bb in mot: add(horn(m,bb*b+.1),st,.15,.5 if mood=='glory' else .38); st+=bb*b
    if mood=='glory' and s.get('vo'):
        for j in range(8): add(harp(prog[0][j%4]+12*(j//4)),s['vo']+j*.5,rng.uniform(-.4,.4),.45)
    if mood=='machine':
        bpm=96+8*chidx.get(cur_ch,3); beat=60/bpm; tt=(s['vo'] or t0)
        while tt<t1-.5:
            b_=int(round((tt-t0)/beat)); root=prog[(b_//8)%4][0]
            add(subbass(root-12,beat*1.9),tt,0,.5*inten) if b_%2==0 else None
            if chidx.get(cur_ch,0)>=1: add(pluck(prog[(b_//8)%4][b_%3+1]+12,.2),tt,rng.uniform(-.5,.5),.35*inten)
            if chidx.get(cur_ch,0)>=2:
                if b_%4==0: add(kick(.7),tt,0,1)
                add(hat(.6),tt+beat/2,rng.uniform(-.3,.3),1)
            tt+=beat/2*2
    if mood=='fiction':
        bpm=int(46+12*max(0,float(s['id'][1:])-36)/13)  # heartbeat quickens through the scenario
        beat=60/bpm; tt=(s['vo'] or t0)
        while tt<t1-.5: add(kick(.75),tt,0,1); add(kick(.45),tt+.28,0,1); tt+=beat
        add(subbass(26,dur),t0,0,.5)
        if ch or s['id'] in ('a36','a37','a39','a41','a43','a44','a45','a47','a48','a49'): add(timp(1.,50),t0+.02,-.2)
    add(swell(min(2.2,dur),.05*inten),t1-2.2)
# whooshes on illusion transitions
sfx=np.zeros((N,2),np.float32)
for b in TL:
    tr=b.get('tr'); st=b.get('start',0)
    if not tr or st>=END: continue
    d=float(tr.get('dur',1.0))
    if tr['type'] in('zoom','iris','morph'): add(whoosh(d*1.1,.55,up=(tr['type']!='iris')),st-.05,0,1,sfx)
    elif tr['type']=='glitch': add(glitchburst(d*.9,.9),st,0,1,sfx)
    elif tr['type']=='fade': add(whoosh(d,.14,up=False),st,0,1,sfx)
# machine-age ambience: server hum (only under machine/fiction shots)
def hum(n):
    t=np.arange(n)/SR; x=sum(np.sin(2*np.pi*60*k*t)*(.5/k) for k in (1,2,3,4)); x=x+lp(hp(rng.standard_normal(n),300),2200)*.05; return (x*.05).astype(np.float32)
for s in scenes:
    if s.get('mood') in('machine','fiction') and s['start']<END:
        n=int((min(s['end'],END)-s['start'])*SR); e=np.ones(n,np.float32); r=int(.6*SR); e[:r]=np.linspace(0,1,r); e[-r:]=np.linspace(1,0,r)
        add(hum(n)*e,s['start'],0,.8,sfx)
# hall reverb
irn=int(3.2*SR); t=np.arange(irn)/SR
ir=np.stack([lp(rng.standard_normal(irn),5000)*np.exp(-t*2.1),lp(rng.standard_normal(irn),5000)*np.exp(-t*2.1)],1); ir[:int(.02*SR)]*=np.linspace(0,1,int(.02*SR))[:,None]; ir/=np.sqrt((ir**2).sum(0))
wet=np.stack([oaconvolve(dry[:,0],ir[:,0])[:N],oaconvolve(dry[:,1],ir[:,1])[:N]],1)
music=.55*dry+.45*wet*1.2; music=hp(music.T,35).T
out=music+sfx
peak=np.max(np.abs(out))+1e-9; out=out/peak; env=lp(np.abs(out).max(1),3.0); out=out/np.maximum(1,(env/.35)**.5)[:,None]; out=np.tanh(out/np.max(np.abs(out))*1.1)*.88
fi,fo=int(1.5*SR),int(6*SR); out[:fi]*=np.linspace(0,1,fi)[:,None]; out[-fo:]*=np.linspace(1,0,fo)[:,None]
wavfile.write('score.wav',SR,(out*32767).astype(np.int16)); print('score seconds',len(out)/SR)
