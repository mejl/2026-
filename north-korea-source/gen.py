import json
PER=60/151.78; TOTAL=227.6
TL=[(0,'title','cut',{'hud':0}),(3.7,'name','whipU',{}),(9.0,'map','whipL',{}),(13.5,'cal','whipU',{})]
for i in range(7): TL.append((round(19.09+i*4*PER,3),'pc',['flash','whipL','whipU','whipL','whipU','whipL','whipU'][i],{'k':i,'td':.22}))
TL+=[(30.16,'monday','whipL',{}),(33.5,'tuesday','whipL',{}),(36.9,'wednesday','whipL',{}),(40.0,'kosher','cut',{}),(41.55,'wait','cut',{'kb':0,'punch':0}),(43.1,'waiter','cut',{'punch':0}),(46.0,'kim','cut',{'punch':0}),(49.3,'jewish','cut',{'punch':0}),(52.0,'spoonfall','cut',{'punch':0,'kb':.1})]
def chorus(ts,v,fin=False):
    for i,t in enumerate(ts): TL.append((t,'ch','flash' if i%4==0 else ['whipL','glitch','slash'][i%4-1],{'k':i%4,'v':v if i>=4 else 0,'td':.14 if i%4==0 else .2,'shake':1.4,'punch':1.5,'kb':.03,'hud':0,**({'fin':1} if fin and i%4==3 else {})}))
chorus([55.0,57.05,58.7,60.28,61.84,63.42,64.98,66.65],1)
TR=['glitch','whipL','cut','whipU','glitch','slash','cut','blinds']
for i in range(16): TL.append((round(68.3+i*2*PER,3),'drop',TR[i%8],{'k':i,'td':.16,'shake':1.2,'punch':1.4}))
TL+=[(80.95,'office','shutter',{'td':.4}),(83.9,'whosent','cut',{'punch':0}),(86.9,'passport','cut',{}),(88.65,'plans','cut',{}),(90.35,'watch','cut',{'kb':0,'punch':0}),(93.65,'breakfast','cut',{}),(96.95,'waitnum','cut',{}),(100.4,'approved','cut',{}),(102.7,'delayed','cut',{})]
chorus([105.55,107.7,109.4,111.05,112.7,114.3,115.9,117.5],1)
for i in range(17): TL.append((round(119.2+i*2*PER,3),'drop',TR[(i+3)%8],{'k':i+5,'td':.16,'shake':1.2,'punch':1.4}))
TL+=[(132.64,'friday','shutter',{'td':.6,'punch':0}),(135.9,'notarrest','cut',{'punch':0}),(139.0,'excellent','cut',{'punch':0}),(140.2,'notleave','cut',{'punch':0}),(143.9,'lessex','cut',{'punch':0}),
(146.6,'saturday','whipL',{}),(149.95,'airport','whipL',{}),(152.5,'leave','cut',{}),(154.15,'disagree','cut',{}),(155.85,'argue','cut',{'shake':1}),(157.25,'idback','flash',{'td':.15})]
chorus([158.75,161.65,163.05,164.7,166.28,167.75,169.3,170.9],0,True)
for i in range(7): TL.append((round(172.5+i*4*PER,3),'fl',['whipL','whipU','zoom','whipL','spin','whipU','zoomOut'][i],{'k':i,'td':.25,'shake':.6}))
TL+=[(183.57,'arrive','zoomOut',{'td':.6,'punch':0}),(191.8,'cafe','whipL',{'punch':0}),(194.0,'ask','cut',{'punch':0}),(199.8,'bring','cut',{'punch':0}),(202.2,'noq','cut',{'punch':0}),(205.8,'noinv','cut',{'punch':0}),(207.4,'justsand','flash',{'td':.2,'punch':0}),(210.3,'verynice','cut',{'punch':0}),(212.8,'credits','whipU',{'hud':0}),(226.9,'black','cut',{})]
TLj=[dict(t0=a,s=s,tr=tr,**o) for a,s,tr,o in TL]
assert all(TLj[i]['t0']<TLj[i+1]['t0'] for i in range(len(TLj)-1)), [ (TLj[i]['t0'],TLj[i]['s']) for i in range(len(TLj)-1) if TLj[i]['t0']>=TLj[i+1]['t0']]
SAY=[(3.89,8.7,'My name is Yekutiel Zelig Finkelkrantz.',2.6),(9.07,13.3,'I went to North Korea',1.4),(13.66,15.9,'for 7 days.',.8),(16.09,19.0,'The first 2 were very nice.',1.6),
(133.27,135.7,'Friday evening.',.8),(135.96,138.8,'They told me I was not under arrest.',1.5),(139.0,140.15,'I said: "Excellent."',.8),(140.26,143.8,'They said I was not allowed to leave.',2.6),(144.0,146.4,'I said: "Less excellent."',1.3),
(185.0,190.6,'I finally arrived in Israel.',3.2),(191.91,193.9,'I went to a restaurant.',.9),(194.2,199.6,'I asked for something kosher.',1.6),(199.86,202.1,'The waiter brought me a sandwich.',1.1),(202.26,205.6,'No questions.',.8),(205.88,207.3,'No investigation.',.7),(207.5,210.1,'Just a sandwich.',1.2),(210.4,212.7,'Very nice.',.7)]
SUB=[(30.2,'Monday in Pyongyang,'),(31.87,'everything was fine.'),(33.59,'Tuesday at the museum,'),(34.73,'standing in a line.'),(36.97,'Wednesday at the restaurant,'),(38.69,'chicken on the plate.'),(40.07,'I asked for something kosher,'),(41.59,'then everybody wait.'),(43.17,'The waiter stopped writing.'),(46.09,'Mister Kim stopped too.'),(49.4,"I said I'm Jewish."),(52.04,'He put down his spoon.'),(54.9,None),
(81.0,'Thursday at the office,'),(82.67,'questions all day long.'),(83.93,'They asked me who had sent me,'),(85.63,'then said nothing was wrong.'),(86.95,'They took away my passport,'),(88.71,'they cancelled all my plans.'),(90.4,'One man watched the doorway,'),(92.0,'another watched the man.'),(93.72,'I asked for some breakfast.'),(97.02,'They told me to wait.'),(100.5,'The food was approved,'),(102.78,'but the spoon was delayed.'),(105.5,None),
(146.66,'Saturday morning,'),(148.34,'ready at 5.'),(150.0,'Waiting at the airport,'),(151.32,'hoping for a flight.'),(152.58,'One man said I could leave,'),(154.22,'another disagreed.'),(155.9,'They argued for an hour,'),(157.32,'then returned my ID.'),(158.7,None)]
LY=[dict(a=a,b=b,s=s,k='say',d=d) for a,b,s,d in SAY]
for i,(a,s) in enumerate(SUB):
    if s: LY.append(dict(a=a,b=SUB[i+1][0]-.04,s=s,k='sub'))

# ---- word-level sync from the transcription (onset = late part of each detected word, never before the line anchor)
import re
TRW=[]
for seg in json.load(open('tr.json')):
    for s,e,w in seg['words']:
        n=re.sub(r'[^a-z0-9]','',w.lower())
        if n: TRW.append((max(s,e-0.4)+0.05,n))
NUM={'7':'seven','2':'two','5':'five'}
def norm(w):
    n=re.sub(r'[^a-z0-9]','',w.lower()); return NUM.get(n,n)
def same(a,b): return a==b or (len(a)>2 and len(b)>2 and a[:3]==b[:3])
def align(words,a,b,spread):
    cand=[(t,n) for t,n in TRW if a-0.45<=t<=b+0.2]; wt=[None]*len(words); j=0
    for i,w in enumerate(words):
        n=norm(w)
        for k in range(j,min(len(cand),j+4)):
            if same(n,cand[k][1]): wt[i]=cand[k][0]; j=k+1; break
    # fill gaps
    n=len(words); base=[a+spread*i/max(1,n) for i in range(n)]
    known=[i for i in range(n) if wt[i] is not None]
    for i in range(n):
        if wt[i] is None:
            p=[k for k in known if k<i]; q=[k for k in known if k>i]
            if p and q: wt[i]=wt[p[-1]]+(wt[q[0]]-wt[p[-1]])*(i-p[-1])/(q[0]-p[-1])
            elif p: wt[i]=wt[p[-1]]+0.26*(i-p[-1])
            elif q: wt[i]=max(a,wt[q[0]]-0.26*(q[0]-i))
            else: wt[i]=base[i]
    for i in range(n): wt[i]=max(wt[i],a,(wt[i-1]+0.06) if i else a); wt[i]=min(wt[i],b-0.25)
    return [round(x,2) for x in wt], len(known)
for l in LY:
    ws=l['s'].split(' '); l['wt'],k=align(ws,l['a'],l['b'],min(l.get('d') or (l['b']-l['a'])*.6,l['b']-l['a'])); l['a']=round(l['wt'][0]-0.03,2)
CHL=[['HE','PUT','DOWN','HIS','SPOON'],['HE','PICKED','UP','HIS','PHONE'],['I','ASKED','FOR','LUNCH'],['NOW','I',"CAN'T",'GO','HOME']]
chs=[i for i,c in enumerate(TLj) if c['s']=='ch']
for i in chs:
    c=TLj[i]; t1=TLj[i+1]['t0']; ws=CHL[c['k']] if not c.get('fin') else ['NOW',"I'M",'GOING','HOME']
    wt,k=align(ws,c['t0'],t1+0.2,(t1-c['t0'])*.62); c['wt']=[round(max(0,x-c['t0']),2) for x in wt]
    if k<len(ws)-1: c['wt']=[[.07,.3,.6,.95,1.31],[.1,.4,.63,.9,1.3],[.19,.59,.91,1.25],[.07,.35,.57,.89,1.29]][c['k']][:len(ws)] if not c.get('fin') else [.09,.33,.55,.81]
    print(c['t0'],k,c['wt'])
for l in LY[:6]+LY[17:23]: print(l['a'],l['s'],l['wt'])
json.dump(dict(TL=TLj,LY=LY,total=TOTAL),open('data.json','w')); print(len(TLj),'scenes',len(LY),'lines')
