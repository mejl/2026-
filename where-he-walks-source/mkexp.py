import json,os
m=json.load(open('meter.json')); old=json.load(open('exp.json')) if os.path.exists('exp.json') else {}
def target(s):
    if s=='i2': return 10
    if s[0]=='i': return 22
    if s.startswith('c1') or s.startswith('v1'): return 34
    if s.startswith('c2'): return 38
    if s.startswith('v2') or s[0]=='b': return 40
    if s[0]=='f': return 56
    if s[0]=='o': return 54
    return 36
def at(tab,u):
    if not tab: return 1.0
    if not isinstance(tab[0],list): tab=[[i/(len(tab)-1),v] for i,v in enumerate(tab)]
    if u<=tab[0][0]: return tab[0][1]
    for i in range(len(tab)-1):
        if u<=tab[i+1][0]: return tab[i][1]+(tab[i+1][1]-tab[i][1])*(u-tab[i][0])/max(1e-9,tab[i+1][0]-tab[i][0])
    return tab[-1][1]
new={}; rows=[]
for s,r in m.items():
    T=target(s); e=[]; prev=old.get(s)
    for (mean,p98,p10,u) in r:
        e0=at(prev,u)
        if prev and isinstance(prev[0],list) is False: pass
        g=(T/max(mean,2.0))**float(os.environ.get('EXPO','.8')); ej=min(6.0,max(.5,e0*g))
        if p98>225 and ej>e0: ej=e0
        e.append([round(u,3),round(ej,3)])
    # smooth: 3-tap
    sm=[[e[i][0],round(sum(e[j][1] for j in (i-1,i,i+1) if 0<=j<len(e))/len([j for j in (i-1,i,i+1) if 0<=j<len(e)]),3)] for i in range(len(e))]
    new[s]=sm; rows.append((s,[round(x[0]) for x in r],[round(x[1]) for x in r],[x[1] for x in sm]))
json.dump(new,open('exp.json','w'))
for r in rows: print('%-5s mean %-22s p98 %-20s exp %s'%r)
