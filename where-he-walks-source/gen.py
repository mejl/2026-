import json,re
PH=.1776; PER=.50736
def T(n): return round(PH+n*PER,3)
SH=[(0,'i1'),(14,'i2'),(28,'c1a'),(44,'c1b'),(52,'c1c'),(60,'c1d'),(68,'c1e'),(76,'c1f'),(92,'c1g'),(113,'v1a','flash'),(121,'v1b'),(129,'v1c'),(136,'v1d'),(144,'v1e1'),(152,'v1e2'),(161,'v1f'),(172,'c2a','flash'),(180,'c2b'),(188,'c2c'),(196,'c2d'),(204,'c2e'),(212,'c2f'),(221,'c2g'),(228,'c2h'),(239,'v2a'),(247,'v2b'),(255,'v2c'),(263,'v2d1'),(267,'v2d2'),(271,'v2e','flash'),(286,'v2f','flash'),(304,'b1','black'),(312,'b2'),(319,'b3'),(327,'b4'),(345,'b5'),(364,'f1','flash'),(372,'f2'),(380,'f3'),(388,'f4'),(396,'f5'),(404,'f6'),(412,'f7'),(420,'f8'),(428,'f9'),(444,'f10'),(452,'f11'),(460,'f12'),(468,'o1'),(478,'o2'),(491,'o3')]
TL=[]
for s in SH:
    n,name=s[0],s[1]; e=dict(t0=0 if n==0 else T(n),s=name)
    if len(s)>2: e['tr']=s[2]; e['td']=.7 if s[2]=='flash' else .9
    TL.append(e)
srt=open('sub.srt').read().strip().split('\n\n')
def ts(s):
    h,m,r=s.split(':'); sec,ms=r.split(','); return int(h)*3600+int(m)*60+int(sec)+int(ms)/1000
L=[]
for b in srt:
    p=b.split('\n'); a,e=p[1].split(' --> '); txt=' '.join(p[2:])
    if txt.startswith('[') or txt.startswith('('): continue
    L.append([ts(a),txt])
TR=[]
for seg in json.load(open('tr.json')):
    for s,e,w in seg['words']:
        n=re.sub(r'[^a-z0-9]','',w.lower())
        if n: TR.append((max(s,e-0.4)+0.05,n))
def norm(w): return re.sub(r'[^a-z0-9]','',w.lower())
def same(a,b): return a==b or (len(a)>2 and len(b)>2 and a[:3]==b[:3])
LY=[]
for i,(a,txt) in enumerate(L):
    nxt=L[i+1][0] if i+1<len(L) else a+5
    b=min(nxt-.05,a+4.6)
    ws=txt.split(' '); cand=[(t,n) for t,n in TR if a-.9<=t<=a+5]; wt=[None]*len(ws); j=0
    for k,w in enumerate(ws):
        nw=norm(w)
        for q in range(j,min(len(cand),j+3)):
            if same(nw,cand[q][1]): wt[k]=cand[q][0]; j=q+1; break
    known=[k for k in range(len(ws)) if wt[k] is not None]
    dur=min(b-a-.25,max(1.2,.42*len(ws)))
    for k in range(len(ws)):
        if wt[k] is None:
            p=[q for q in known if q<k]; nx=[q for q in known if q>k]
            if p and nx: wt[k]=wt[p[-1]]+(wt[nx[0]]-wt[p[-1]])*(k-p[-1])/(nx[0]-p[-1])
            elif p: wt[k]=wt[p[-1]]+.3*(k-p[-1])
            elif nx: wt[k]=wt[nx[0]]-.3*(nx[0]-k)
            else: wt[k]=a+dur*k/len(ws)
    # anchor: first word never before the srt line start - .15, monotonic
    wt[0]=max(wt[0],a-.15)
    for k in range(1,len(ws)): wt[k]=max(wt[k],wt[k-1]+.08)
    LY.append(dict(a=round(wt[0]-.03,2),b=round(b,2),s=txt,wt=[round(x,2) for x in wt]))
json.dump(dict(TL=TL,LY=LY,total=254.36),open('data.json','w'))
for l in LY[:12]+LY[-6:]: print(l['a'],l['b'],l['s'],l['wt'])
