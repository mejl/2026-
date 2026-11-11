import json
B=json.load(open('beats.json'))['beats']; TOTAL=199.88
def snap(t): return min(B,key=lambda b:abs(b-t))
# (start, end, lyric or None, mood, clips[(story id, key|index|'SCENE:name'|'CUSTOM:name')], beats per clip)
L=[
(0.0,14.5,None,'bible',[('x','CUSTOM:title'),('s01','SCENE:creation')],0),
(14.5,21.5,"In a garden, light and breath, Adam, Eve, the first of men",'bible',[('s02','SCENE:adam'),('s03',0),('s03','did God')],0),
(21.5,28.4,"One bite fell, the gates were closed, but a promise rose again",'bible',[('s03','She ate'),('s03','eyes were opened'),('s03','Sin and death'),('s08','altar')],0),
(28.4,35.3,"Abraham looked up at stars, Moses split the sea in two",'bible',[('s10','count the stars'),('s10','believed'),('s16','stretched out'),('s16','walked through')],0),
(35.3,43.0,"David sang, the prophets cried, a King is coming, wait for Him",'bible',[('s20','Goliath'),('s21',0),('s22','Isaiah'),('s26','Malachi')],0),
(45.2,48.7,"From the garden to the cross",'glory',[('s03',0),('s33','crucified')],0),
(48.7,52.4,"From the cross to every shore",'glory',[('s33','Darkness'),('s38',0)],0),
(52.4,56.2,"One name carried through the years",'glory',[('s44',0),('s46','Carey')],0),
(56.2,60.6,"Jesus, now and evermore",'glory',[('s34','appeared'),('s50','Every eye')],0),
(60.6,66.4,None,'bible',[('s26','Persia'),('s27',0)],0),
(66.4,70.4,"Bethlehem, a child is born, heaven sings above the hay",'bible',[('s27','manger'),('s27','Angels announced')],0),
(70.4,74.0,"Healed the blind and calmed the storm, then the cross, the darkest day",'bible',[('s30',0),('s30','walked on the water'),('s33','crucified'),('s33','Darkness')],0),
(74.0,77.7,"Three days on, the stone was rolled, death itself could not hold on",'glory',[('s34',0),('s34','rolled away'),('s34','appeared')],0),
(77.7,84.2,"Go to all the world, He said, and the fire fell on them",'glory',[('s35',0),('s35','lifted up'),('s36',0),('s36','Tongues of fire')],0),
(84.4,87.8,"From the garden to the cross",'glory',[('s03','She ate'),('s33','curtain')],0),
(87.8,91.7,"From the cross to every shore",'glory',[('s36','Peter preached'),('s38','Rome')],0),
(91.7,95.2,"One name carried through the years",'glory',[('s41',0),('s45',0)],0),
(95.2,99.4,"Jesus, now and evermore",'glory',[('s47',0),('s48',0)],0),
(99.4,116.0,None,'bible',[('s36','baptized'),('s37',0),('s37','Damascus'),('s37','became Paul'),('s39',0),('s40',0),('s40','church grew'),('s41','councils')],0),
(116.0,123.9,"Paul set sail on Roman roads, lions could not stop the word",'bible',[('s38',0),('s38','beaten'),('s38','Rome'),('s40','persecution')],0),
(123.9,130.8,"Empires fell and it kept on, every tongue and tribe has heard",'bible',[('s42',0),('s42','monks'),('s42','Patrick'),('s43','cathedrals')],0),
(130.8,134.8,"Monks with ink and ships with sails, pages printed, chains undone",'bible',[('s43','Wycliffe'),('s44',0),('s44','thousands'),('s45','Tyndale')],0),
(134.8,141.2,"From Jerusalem it spread to the ends of all the earth",'glory',[('s46',0),('s46','Carey'),('s46','Hudson Taylor'),('s46','Livingstone'),('s47','translators'),('s48','still going out')],0),
(141.6,145.0,"No one knows the day or hour",'bible',[('s49',0),('s49','stay awake')],0),
(145.0,148.4,"But the sky will open wide",'glory',[('s50',0)],0),
(148.4,152.5,"Every eye will see Him come",'glory',[('s50','trumpet'),('s50','Every eye')],0),
(152.5,156.8,"The King returns for His bride",'glory',[('s50','dead in Christ'),('s51',0)],0),
(156.8,161.0,"From the garden to the throne",'glory',[('s03',0),('s51','New Jerusalem')],0),
(161.0,165.0,"Every nation, every shore",'glory',[('s48','house churches'),('s51','dwell')],0),
(165.0,168.6,"One name carried through the years",'glory',[('s27','manger'),('s34','rolled away'),('s51','every tear')],0),
(168.6,176.0,"Jesus, King forevermore",'glory',[('s50','Every eye'),('s51','all things new')],0),
(176.0,183.8,"Come, Lord Jesus",'glory',[('s51','all things new')],0),
(183.8,TOTAL,"Come, Lord Jesus",'glory',[('s51','New Jerusalem'),('x','CUSTOM:end')],0),
]
scenes=[]; clips={}
for i,(a,b,ly,mood,cl,_) in enumerate(L):
    a2=0.0 if i==0 else snap(a); b2=TOTAL if i==len(L)-1 else snap(L[i+1][0]) # contiguous shots
    sid='m%02d'%i; n=len(cl)
    while n>1 and (b2-a2)/n<0.92: n-=1
    cl=cl[:n]; cuts=[a2]+[snap(a2+(b2-a2)*k/n) for k in range(1,n)]
    if i==0: cuts=[0.0, snap(8.3)]
    if i==len(L)-1: cuts=[a2, snap(190.5)]
    caps=[] if not ly else [dict(text=ly,start=round(a,2),end=round(min(b,b2)-.05,2))]
    scenes.append(dict(id=sid,scene=sid,ch='',title='',sub='',mood=mood,label='',year='',say=ly or '',start=round(a2,3),card=0,vo=round(a2,3),vodur=round(b2-a2,3),end=round(b2,3),caps=caps))
    clips[sid]=[dict(off=round(c-a2,3),sid=s,key=k) for c,(s,k) in zip(cuts,cl)]
json.dump(dict(total=TOTAL,scenes=scenes),open('schedule.json','w'))
json.dump(clips,open('clips.json','w'))
print(len(scenes),sum(len(v) for v in clips.values()),'clips')
