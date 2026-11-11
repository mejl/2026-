import json
B=json.load(open('beats.json'))['beats']; TOTAL=199.88
def snap(t): return min(B,key=lambda b:abs(b-t))
# (start,end,lyric,[ (scene,year) ... ])
L=[
(0.0,14.5,None,[('title',''),('light','The Beginning')]),
(14.5,21.5,"In a garden, light and breath, Adam, Eve, the first of men",[('eden','The Beginning'),('serpent','The Beginning')]),
(21.5,28.4,"One bite fell, the gates were closed, but a promise rose again",[('bite','The Fall'),('gate','The Fall'),('rainbow','The Flood')]),
(28.4,35.3,"Abraham looked up at stars, Moses split the sea in two",[('abraham','c. 2100 BC'),('sea','c. 1446 BC')]),
(35.3,43.0,"David sang, the prophets cried, a King is coming, wait for Him",[('david','c. 1000 BC'),('prophet','c. 700 BC')]),
(45.2,48.7,"From the garden to the cross",[('diptych','Eden → AD 30')]),
(48.7,52.4,"From the cross to every shore",[('ship','AD 30 → today')]),
(52.4,56.2,"One name carried through the years",[('book','through the years')]),
(56.2,60.6,"Jesus, now and evermore",[('christ','now and evermore')]),
(60.6,66.4,None,[('bethstar','c. 5 BC')]),
(66.4,70.4,"Bethlehem, a child is born, heaven sings above the hay",[('manger','c. 5 BC'),('angels','c. 5 BC')]),
(70.4,74.0,"Healed the blind and calmed the storm, then the cross, the darkest day",[('storm','c. AD 28'),('cross3','c. AD 30')]),
(74.0,77.7,"Three days on, the stone was rolled, death itself could not hold on",[('tomb','c. AD 30'),('risen','c. AD 30')]),
(77.7,84.2,"Go to all the world, He said, and the fire fell on them",[('commission','c. AD 30'),('pentecost','c. AD 30')]),
(84.4,87.8,"From the garden to the cross",[('diptych','Eden → AD 30')]),
(87.8,91.7,"From the cross to every shore",[('ship','AD 30 → today')]),
(91.7,95.2,"One name carried through the years",[('book','through the years')]),
(95.2,99.4,"Jesus, now and evermore",[('christ','now and evermore')]),
(99.4,116.0,None,[('roads','AD 30 – 60'),('globe1','AD 60 – 300'),('rose','')]),
(116.0,123.9,"Paul set sail on Roman roads, lions could not stop the word",[('paulship','c. AD 46 – 60'),('lions','AD 64 – 300')]),
(123.9,130.8,"Empires fell and it kept on, every tongue and tribe has heard",[('ruins','AD 476'),('cathedral','AD 500 – 1300')]),
(130.8,134.8,"Monks with ink and ships with sails, pages printed, chains undone",[('monk','c. AD 800'),('press','AD 1455 – 1517')]),
(134.8,141.2,"From Jerusalem it spread to the ends of all the earth",[('sails','AD 1700 – 1900'),('globe2','AD 2026')]),
(141.6,145.0,"No one knows the day or hour",[('watch','No one knows the day')]),
(145.0,148.4,"But the sky will open wide",[('skyopen','No one knows the day')]),
(148.4,152.5,"Every eye will see Him come",[('return','No one knows the day')]),
(152.5,156.8,"The King returns for His bride",[('king','No one knows the day')]),
(156.8,161.0,"From the garden to the throne",[('diptych2','Eden → Eternity')]),
(161.0,165.0,"Every nation, every shore",[('nations','Every nation')]),
(165.0,168.6,"One name carried through the years",[('book','through the years')]),
(168.6,176.0,"Jesus, King forevermore",[('king','Forevermore'),('city','Eternity')]),
(176.0,183.8,"Come, Lord Jesus",[('city','Eternity')]),
(183.8,TOTAL,"Come, Lord Jesus",[('end','Eternity')]),
]
TL=[];LY=[]
for i,(a,b,ly,sc) in enumerate(L):
    a2=0.0 if i==0 else snap(a); b2=TOTAL if i==len(L)-1 else snap(L[i+1][0]); n=len(sc)
    cuts=[a2]+[snap(a2+(b2-a2)*k/n) for k in range(1,n)]
    if i==0: cuts=[0.0,snap(8.3)]
    if sc[0][0]=='roads': cuts=[a2,snap(104.5),snap(110.0)]
    for c,(s,y) in zip(cuts,sc):
        if TL and TL[-1]['s']==s: continue
        TL.append(dict(t0=round(c,3),s=s,y=y))
    if ly: LY.append(dict(text=ly,a=round(a,2),b=round(min(b,b2),2)))
json.dump(dict(TL=TL,LY=LY,total=TOTAL,per=B[1]-B[0] if False else (B[-1]-B[0])/(len(B)-1),ph=B[0]),open('data.json','w'))
print(len(TL),'scenes',sorted(set(x['s'] for x in TL)))
