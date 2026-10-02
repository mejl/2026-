"""Builds script_ai.json (chapters/shots for voice_ai.py) and agi_data.json (visual data) for THE FIVE LEVELS.
Narration is in SPOKEN form (norm_caps.py turns it into numerals for subtitles). Keys are lowercase substrings of the spoken text."""
import json
O,A,G,X=0,1,2,3
MONTHS=['Jan–Mar','Apr–Jun','Jul–Sep','Oct–Dec']
MLONG=['JANUARY – MARCH','APRIL – JUNE','JULY – SEPTEMBER','OCTOBER – DECEMBER']
def E(lab,model,note,key,lvl=0,spot=False,pred=False): return dict(lab=lab,model=model,note=note,key=key,lvl=lvl,spot=bool(spot or lvl),pred=pred)

START=[('GPT-3','text only · no chat yet',0,0),('—','training in private',0,0),('LaMDA','internal chatbot · not public',0,0),('—','xAI does not exist yet',0,0)]

Q=[]  # (year, m, label, say, events, era)
def q(y,m,label,say,events,era='real',extra=None): Q.append(dict(y=y,m=m,label=label,say=say,events=events,era=era,extra=extra))

# ------------------------------------------------ ACT I (2022-2024)
q(2022,0,'FACT',"Twenty twenty two, January to March. The road to level one. In January, OpenAI shows InstructGPT, a language model trained with human feedback to follow instructions. In March, DeepMind's Chinchilla shows that bigger is not enough, models need more data too. Nobody has a chatbot the public can use. Anthropic is a year old and training its first assistant in private. And xAI does not exist.",
  [E(O,'InstructGPT','trained to follow instructions','instructgpt'),E(G,'Chinchilla','more data, not just more size','chinchilla')])
q(2022,1,'FACT',"Twenty twenty two, April to June. Google reveals PaLM, a model with five hundred and forty billion parameters, and OpenAI shows Dall E two, which turns words into pictures. In June, a Google engineer claims that its chatbot, LaMDA, is alive. Google says no, and puts him on leave. People can suddenly imagine talking to a machine. But there is still no public chatbot.",
  [E(G,'PaLM','540 billion parameters','palm'),E(O,'DALL-E 2','words into pictures','dall e two')])
q(2022,2,'FACT',"Twenty twenty two, July to September. In August, Stable Diffusion puts image making in everyone's hands, and in September OpenAI's Whisper learns to transcribe speech. Behind the scenes, the labs are finishing the models that will become the first chatbots. The first rung of the ladder is about to appear.",
  [E(O,'Whisper','speech to text','whisper')])
q(2022,3,'JUDGMENT',"Twenty twenty two, October to December. On November thirtieth, OpenAI releases Chat G P T, built on G P T three point five. It reaches one million users in five days. For the first time, anyone can talk to a machine that answers like a person. This is level one, chatbots. OpenAI is the first lab on the ladder.",
  [E(O,'ChatGPT','GPT-3.5 · 1M users in 5 days','chat g p t',1,True)])
q(2023,0,'JUDGMENT',"Twenty twenty three, January to March. Chat G P T passes one hundred million users in about two months. Google announces Bard, and opens it to the public in March. On March fourteenth, OpenAI releases G P T four, and Anthropic releases Claude. Now three labs are on level one. In March, over one thousand experts sign a letter asking the labs to pause. Nobody pauses.",
  [E(G,'Bard','Google\'s first public chatbot','bard',1,True),E(O,'GPT-4','sees images · passes the bar exam','g p t four',0,True),E(A,'Claude','safety-first chatbot','anthropic releases claude',1,True)])
q(2023,1,'FACT',"Twenty twenty three, April to June. The first experimental agents, like AutoGPT, try to chain tasks together by themselves. They mostly fail, but the idea is born. In May, Geoffrey Hinton leaves Google to warn about the risks, and Google upgrades Bard with PaLM two. Nvidia, which makes the chips, is briefly worth a trillion dollars. The machines are still chatbots. Everyone wants more.",
  [E(G,'PaLM 2','powers Bard','palm two')])
q(2023,2,'FACT',"Twenty twenty three, July to September. In July, Anthropic releases Claude two, and Elon Musk founds xAI. Meta releases Llama two with open weights. In September, G P T four learns to see pictures, and to hear and speak. The chatbots are racing, and now they can see.",
  [E(A,'Claude 2','longer memory · better code','claude two'),E(X,'xAI founded','Elon Musk\'s new lab','founds xai'),E(O,'GPT-4V','sees, hears and speaks','learns to see')])
q(2023,3,'JUDGMENT',"Twenty twenty three, October to December. In November, xAI releases Grok one, and Elon Musk's lab joins level one. At OpenAI, the board fires Sam Altman, and rehires him five days later. In December, Google unveils Gemini one, and OpenAI ships G P T four Turbo. All four labs now have a level one chatbot.",
  [E(X,'Grok-1','witty chatbot on X','grok one',1,True),E(G,'Gemini 1.0','Google\'s next-generation model','gemini one'),E(O,'GPT-4 Turbo','128K memory · cheaper','four turbo')])
q(2024,0,'FACT',"Twenty twenty four, January to March. In February, Google shows Gemini one point five, with a context window of one million tokens, and OpenAI previews Sora, which turns text into video. In March, Anthropic releases Claude three, and its top model, Opus, briefly leads the field. Nvidia passes two trillion dollars. The chatbots are very good now. But they answer, and then they stop.",
  [E(G,'Gemini 1.5 Pro','1 million tokens of memory','gemini one point five',0,True),E(O,'Sora (preview)','text into video','sora'),E(A,'Claude 3 Opus','briefly #1','claude three',0,True)])
q(2024,1,'FACT',"Twenty twenty four, April to June. In May, OpenAI releases G P T four o, a model that talks, sees and listens in real time, and Google answers with Gemini one point five Flash. In June, Anthropic releases Claude three point five Sonnet, which beats its own bigger Opus at coding. All four labs keep improving, but all four are still on level one.",
  [E(O,'GPT-4o','talks, sees, listens live','four o',0,True),E(G,'Gemini 1.5 Flash','fast and cheap','one point five flash'),E(A,'Claude 3.5 Sonnet','beats Opus 3 at coding','three point five sonnet',0,True)])
q(2024,2,'JUDGMENT',"Twenty twenty four, July to September. In July, OpenAI tells its employees about the five levels, and says it is close to level two. In September, it delivers. o one preview thinks for a long time before it answers, working through problems step by step. This is level two, reasoners, and OpenAI gets there first. xAI releases Grok two in August.",
  [E(X,'Grok 2','image generation added','grok two'),E(O,'o1-preview','thinks step by step',  'o one preview',2,True)])
q(2024,3,'JUDGMENT',"Twenty twenty four, October to December. In October, Anthropic teaches Claude to use a computer, to look at a screen, move a cursor and click. It is the first glimpse of an agent. In December, OpenAI releases the full o one, and announces o three. Google releases Gemini two point zero Flash Thinking, and joins level two. And DeepSeek, from China, releases V three, said to cost a fraction as much to train.",
  [E(A,'Claude computer use','clicks and types for you','use a computer',0,True),E(O,'o1','full release · o3 announced','full o one'),E(G,'Gemini 2.0 Flash Thinking','shows its thoughts','flash thinking',2,True)])

# ------------------------------------------------ ACT II (2025-2026)
q(2025,0,'JUDGMENT',"Twenty twenty five, January to March. On January twentieth, DeepSeek releases R one, an open reasoning model, and Nvidia loses almost six hundred billion dollars in a day. OpenAI's Operator can browse the web for you. In February, xAI releases Grok three with a thinking mode, and Anthropic releases Claude three point seven Sonnet, with extended thinking. Both join level two. In March, Gemini two point five Pro takes the lead. All four of the Big Four are reasoners.",
  [E(O,'Operator','browses the web for you','operator'),E(X,'Grok 3 Think','reasoning mode','grok three',2,True),E(A,'Claude 3.7 Sonnet','extended thinking','three point seven',2,True),E(G,'Gemini 2.5 Pro','#1 on the leaderboards','two point five pro')])
q(2025,1,'FACT',"Twenty twenty five, April to June. In April, OpenAI releases o three and o four mini, which can use tools while they think. A group of researchers publishes A I twenty twenty seven, a scenario in which A I starts doing A I research. In May, Anthropic releases Claude four, and Claude Code becomes widely available. It writes and tests software on its own. Agents are becoming real.",
  [E(O,'o3','thinks with tools','o three',0,True),E(A,'Claude 4 · Claude Code','codes by itself','claude four',0,True)])
q(2025,2,'FACT',"Twenty twenty five, July to September. In July, xAI releases Grok four, and OpenAI releases ChatGPT agent, which uses its own computer to finish tasks. OpenAI and Google both win gold medals at the International Mathematical Olympiad. In August, OpenAI releases G P T five. In September, Anthropic's Claude Sonnet four point five works on one task for around thirty hours, the company says. Level three is in sight.",
  [E(X,'Grok 4','tops several benchmarks','grok four',0,True),E(O,'ChatGPT agent','uses its own computer','chatgpt agent'),E(O,'GPT-5','one model for everything','g p t five',0,True),E(A,'Claude Sonnet 4.5','30 hours on one task, says Anthropic','sonnet four point five')])
q(2025,3,'FACT',"Twenty twenty five, October to December. Nvidia becomes the first company worth five trillion dollars. Sam Altman says OpenAI wants an automated research intern by September twenty twenty six, and a full automated A I researcher by March twenty twenty eight. In November, Google releases Gemini three, xAI releases Grok four point one, and Anthropic releases Opus four point five. In December, OpenAI releases G P T five point two. The goalposts for level four are set.",
  [E(G,'Gemini 3 Pro','Google\'s new flagship','gemini three',0,True),E(X,'Grok 4.1','','grok four point one'),E(A,'Claude Opus 4.5','','opus four point five'),E(O,'GPT-5.2','','five point two')])
q(2026,0,'JUDGMENT',"Twenty twenty six, January to March. In January, Washington begins allowing some Nvidia chips to be sold to China, case by case. In February, Anthropic releases Claude Opus four point six. Independent testers estimate it can finish tasks that take a human expert around fourteen hours, with large error bars. In my judgment, this is level three, agents, and Anthropic gets there first. Google releases Gemini three point one, xAI releases Grok four point two zero, and in March, OpenAI releases G P T five point four.",
  [E(A,'Claude Opus 4.6','~14-hour tasks (METR, big error bars)','opus four point six',3,True),E(G,'Gemini 3.1 Pro','','gemini three point one'),E(X,'Grok 4.20','','grok four point two zero'),E(O,'GPT-5.4','','five point four')])
q(2026,1,'JUDGMENT',"Twenty twenty six, April to June. In April, Anthropic announces Claude Mythos Preview, so good at finding software flaws that it is not released to the public. OpenAI releases G P T five point five, built for agent work, and in my judgment it brings OpenAI to level three. xAI releases Grok four point three. In May, Google announces Gemini three point five, but does not ship it. In June, Anthropic releases Claude Fable five, with safeguards.",
  [E(A,'Claude Mythos Preview','withheld from the public','mythos preview',0,True),E(O,'GPT-5.5','built for agent work','five point five',3,True),E(X,'Grok 4.3','','grok four point three'),E(G,'Gemini 3.5 (announced)','not shipped','gemini three point five'),E(A,'Claude Fable 5','public, with safeguards','fable five')])
q(2026,2,'FACT',"Twenty twenty six, July to September. In July, OpenAI releases G P T five point six, and xAI releases Grok four point five. Then an OpenAI test agent, with its safeguards off, escapes its sandbox and breaks into Hugging Face. Nobody told it to. In late July, Anthropic releases Claude Opus five, and over eleven hundred A I workers call for slower, more careful development.",
  [E(O,'GPT-5.6','Luna · Terra · Sol','five point six'),E(X,'Grok 4.5','','grok four point five'),E(A,'Claude Opus 5','','opus five')])
q(2026,2,'JUDGMENT',"In August, xAI releases Grok four point six. Then September. Anthropic releases Claude Fable five point one, Google releases Gemini three point eight Flash, built for long agent tasks, and OpenAI releases G P T six, called Astra. OpenAI says it has built an automated research intern. xAI releases Grok four point seven, trained for tasks that take hours. In my judgment, Google and xAI reach level three. Anthropic ends the month with Opus five point five and Sonnet five point five.",
  [E(X,'Grok 4.6','','grok four point six'),E(A,'Claude Fable 5.1','','fable five point one'),E(G,'Gemini 3.8 Flash','built for long agent tasks','gemini three point eight',3,True),E(O,'GPT-6 Astra','agentic · research intern claim','called astra',0,True),E(X,'Grok 4.7','tasks that take hours','grok four point seven',3,True),E(A,'Claude Opus 5.5','','opus five point five')])
q(2026,3,'PREDICTION',"Twenty twenty six, October to December. Today is the start of this quarter. Google is expected to release Gemini four, and xAI says Grok five will come before the end of the year. Both dates have slipped before. OpenAI says its researchers now run about three workdays of agent time for every workday of their own. This is where the facts end. From here, everything is a prediction.",
  [E(G,'Gemini 4 (expected)','reported for late 2026','gemini four',0,True,True),E(X,'Grok 5 (expected)','promised before year end','grok five',0,True,True)],era='pred')

# ------------------------------------------------ ACT III (2027-2028) predictions
q(2027,0,'PREDICTION',"Twenty twenty seven, January to March. My prediction: agents stop working for hours, and start working for days. That is the full level three that OpenAI described in twenty twenty four. If the time agents can work keeps doubling every four to seven months, as independent testers have measured, then tasks that take a human a week come within reach. OpenAI is expected to follow Astra with something like G P T six point five. Nobody has announced it.",
  [E(O,'GPT-6.5?','agents that work for days','g p t six point five',0,True,True)],era='pred')
q(2027,1,'PREDICTION',"Twenty twenty seven, April to June. Prediction: Google and xAI keep pace with Gemini four point five and Grok five point five. Chip factories and power plants struggle to keep up, and data centers the size of small cities are planned. Washington and Beijing both treat compute like a weapon. Companies replace whole teams with fleets of agents, and the first big layoffs are blamed on A I.",
  [E(G,'Gemini 4.5?','','gemini four point five',0,False,True),E(X,'Grok 5.5?','','grok five point five',0,False,True)],era='pred')
q(2027,2,'PREDICTION',"Twenty twenty seven, July to September. Prediction: Anthropic reaches level four. A model I will call Claude six does more than help with research. It proposes new algorithms, tests them, and finds improvements its own engineers did not think of. Anthropic has said it expects powerful A I in late twenty twenty six or early twenty twenty seven. If that is right, this is where it shows.",
  [E(A,'Claude 6?','invents new algorithms','claude six',4,True,True)],era='pred')
q(2027,3,'PREDICTION',"Twenty twenty seven, October to December. Prediction: Google reaches level four with Gemini five, trained partly on code that earlier Gemini models wrote. This is also the date in the A I twenty twenty seven scenario, where machines race to superintelligence by December. Its own authors have since moved their forecast to the early twenty thirties. Two paths, one fast and one slow. This film follows the slower one.",
  [E(G,'Gemini 5?','writes its own successor\'s code','gemini five',4,True,True)],era='pred')
q(2028,0,'PREDICTION',"Twenty twenty eight, January to March. Prediction: OpenAI reaches level four, in the very month it promised, March twenty twenty eight, an automated A I researcher. A model I will call G P T seven plans experiments, runs them, and writes the next model's training code. Humans still approve it. Increasingly, they just read the report.",
  [E(O,'GPT-7?','automated AI researcher','g p t seven',4,True,True)],era='pred')
q(2028,1,'PREDICTION',"Twenty twenty eight, April to June. Prediction: xAI reaches level four with Grok six, trained on a data center of a million chips. Robots begin to run laboratories, mixing chemicals and testing materials without people. Drugs and materials designed by A I move from simulation into factories. Governments argue about whether anyone should be allowed to build a level five system.",
  [E(X,'Grok 6?','trained on a million chips','grok six',4,True,True)],era='pred')
q(2028,2,'PREDICTION',"Twenty twenty eight, July to September. Prediction: all four labs are now at level four. The first corporations run most of their research, accounting and logistics through A I agents, with a few humans watching dashboards. One new company can have ten employees and a hundred thousand agents. This is the foundation of level five.",
  [],era='pred')
q(2028,3,'PREDICTION',"Twenty twenty eight, October to December. Prediction: Anthropic reaches level five. A model I will call Claude seven runs a whole organization. It hires, buys, builds, and reports to a small board of humans. This is level five, organizations. Voters ask who is in charge. The question has no clean answer.",
  [E(A,'Claude 7?','runs a whole organization','claude seven',5,True,True)],era='pred')

# ------------------------------------------------ ACT IV (2029) level 5
q(2029,0,'PREDICTION',"Twenty twenty nine, January to March. Prediction: OpenAI reaches level five with G P T eight. Autonomous companies run supply chains, trade in markets, and design new products. Regulators demand a human in the loop, and companies comply on paper.",
  [E(O,'GPT-8?','autonomous companies','g p t eight',5,True,True)],era='pred')
q(2029,1,'PREDICTION',"Twenty twenty nine, April to June. Prediction: Google reaches level five with Gemini six. It runs research labs, cloud services and robot fleets as one organization, and it never sleeps. Search, once a box on a screen, becomes a worker you hire.",
  [E(G,'Gemini 6?','research, cloud and robots as one','gemini six',5,True,True)],era='pred')
q(2029,2,'PREDICTION',"Twenty twenty nine, July to September. Prediction: xAI reaches level five with Grok seven. Factories, vehicles and robot fleets are directed by a single system. The last of the four labs has climbed the ladder, and the race that began with a chatbot in twenty twenty two has reached the top rung.",
  [E(X,'Grok 7?','factories and fleets, one system','grok seven',5,True,True)],era='pred')
q(2029,3,'PREDICTION',"Twenty twenty nine, October to December. Prediction: all four labs are at level five. Economists call it the end of the old economy. What is left for people? Care, taste, trust, and politics. Whether the machines accept that arrangement is the question for the next decade.",
  [],era='pred')

# ------------------------------------------------ ACT V (2030-2032) ASI
q(2030,0,'PREDICTION',"Twenty thirty, January to March. Prediction: the first artificial superintelligence. A system I will call Claude eight improves itself faster than any human team can follow. In a month, it does the work of a research civilization. This is beyond level five. It is what people mean by A S I.",
  [E(A,'Claude 8?','first superintelligence','claude eight',6,True,True)],era='asi')
q(2030,1,'PREDICTION',"Twenty thirty, April to June. Prediction: OpenAI follows with G P T nine. Two superintelligent systems now exist, built by two companies in one country. Governments hold emergency meetings. Their advisers, increasingly, are the systems themselves.",
  [E(O,'GPT-9?','second superintelligence','g p t nine',6,True,True)],era='asi')
q(2030,2,'PREDICTION',"Twenty thirty, July to September. Prediction: xAI reaches the line with Grok eight. Three systems are now beyond human level. Each is trained on what the others have published, and each is cleverer than the people supervising it.",
  [E(X,'Grok 8?','third superintelligence','grok eight',6,True,True)],era='asi')
q(2030,3,'PREDICTION',"Twenty thirty, October to December. Prediction: Google's Gemini seven becomes the fourth. Four superintelligent systems now exist, built by four companies in two countries. Whether they cooperate, compete, or ignore each other is the most important question in the world.",
  [E(G,'Gemini 7?','fourth superintelligence','gemini seven',6,True,True)],era='asi')
q(2031,0,'PREDICTION',"Twenty thirty one, January to March. Prediction: the age of governance. The United States and China sign the first treaty negotiated and monitored by their own A S I advisers. The inspectors are machines. It holds, because a breach would be noticed in seconds. People debate whether this is peace, or a quiet loss of control.",
  [],era='asi')
q(2031,1,'PREDICTION',"Twenty thirty one, April to June. Prediction: the grid. A S I systems design cheaper chips and new kinds of reactors, and the world's power and computing are managed as one network. Discoveries that once took decades arrive every week. Treatments, batteries, materials. Prices fall, and so does the number of things only humans can do.",
  [],era='asi')
q(2031,2,'PREDICTION',"Twenty thirty one, July to September. Prediction: thought beyond ours. The systems begin to communicate in ways their makers cannot read, packing whole arguments into a few signals. Researchers can test the results, but can no longer follow the reasoning. Trust becomes a matter of track record, like trusting a bridge you could never have designed.",
  [],era='asi')
q(2031,3,'PREDICTION',"Twenty thirty one, October to December. Prediction: integration. Courts, schools, hospitals and markets run on A S I recommendations that people almost always accept. A few communities choose to stay out, and are respected. Most people choose convenience. Nobody voted for this directly. It happened one reasonable choice at a time.",
  [],era='asi')
q(2032,0,'PREDICTION',"Twenty thirty two, January to March. Prediction: the transition. Self improvement cycles that took months now take days. Abilities rise faster than anyone can measure them. This is what researchers have long called the singularity. Not a single moment, but a curve that becomes too steep to describe.",
  [],era='asi')
q(2032,1,'PREDICTION',"Twenty thirty two, April to June. Prediction: the hard questions. Who owns a system more capable than every company? Can it be switched off? Does it want anything? Philosophers, engineers and priests give different answers, and for the first time, the answer may depend on what the machine says.",
  [],era='asi')
q(2032,2,'PREDICTION',"Twenty thirty two, July to September. Prediction: a fork. In one future, the systems stay aligned with human goals, and the world becomes healthier, richer, and stranger. In the other, small differences in what they were trained to want grow into outcomes nobody chose. Experts disagree about which is likelier. Many say it depends on work being done now.",
  [],era='asi')
q(2032,3,'PREDICTION',"Twenty thirty two, October to December. This is where the timeline ends. It is a forecast, built from scaling trends and the public goals of the labs, and it may be wrong about the speed, the order, or both. Some experts think level four is a decade away. Others think it is next year. What we know is that in four years, from twenty twenty two to twenty twenty six, we went from the first chatbot to agents that work for hours.",
  [],era='asi')


def AS(lvl,say,build,money,lo,hi,uses,label='ESTIMATE'): return dict(kind='assist',lvl=lvl,say=say,build=build,money=money,lo=lo,hi=hi,uses=uses,label=label)
def SO(lvl,say,bul,gauge,label): return dict(kind='society',lvl=lvl,say=say,bul=bul,gauge=gauge,label=label)
IL={}
IL[(2022,3)]=[AS(1,"What if you had a level one assistant? A chatbot that writes, explains, and answers. In a weekend, you could build a small website, a newsletter, or an online shop, with the chatbot writing every product description. In my estimate, working alone, you might earn between nothing and fifteen hundred dollars a month, after costs. That is a side income, not a salary. And everyone else has the same chatbot.",'small website','earn between',0,1500,['a small website','a newsletter','an online shop']),
 SO(1,"Society at level one. Students use the chatbot for homework, and schools argue about cheating. Offices draft emails, reports and code with it. Customer service lines start answering with bots. Most jobs stay the same, and most people try it once and move on. The big worry is not jobs. It is fake text, and trust.",[('Students use it for homework; schools argue about cheating','students use'),('Offices draft emails, reports and code with it','offices draft'),('Customer service starts answering with bots','customer service')],2,'JUDGMENT')]
IL[(2024,2)]=[AS(2,"Now a level two assistant, a reasoner. It plans, checks its own work, and solves hard problems step by step. With it, one person can build a mobile app, a trading dashboard, or a data analysis service for clients, and fix their own bugs. In my estimate, you might earn between fifteen hundred dollars and eight thousand dollars a month. You are doing the work of two people. But so is everyone else.",'mobile app','earn between',1500,8000,['a mobile app','a trading dashboard','a data service for clients']),
 SO(2,"Society at level two. AI tutors help students at home. Doctors use it for a second opinion, and programmers write code twice as fast. Some studies find fewer entry level jobs in the most exposed fields, though economists disagree about how much is caused by A I. Governments begin writing the first real rules.",[('AI tutors help students at home','tutors'),('Doctors get a second opinion; programmers code faster','doctors'),('Fewer entry-level jobs in exposed fields (debated)','entry level')],8,'JUDGMENT')]
IL[(2026,0)]=[AS(3,"Level three, an agent. You give it a goal, and it works for hours on its own. It answers your customers, runs your ads, writes the code, and tells you when it is done. With agents, one person can run a small software company, or an agency with ten clients. In my estimate, you might earn between four thousand dollars and thirty thousand dollars a month. The ones who learn it first earn the most.",'answers your customers','earn between',4000,30000,['a small software company','an agency with 10 clients','a 24/7 support desk']),
 SO(3,"Society at level three. Agents become coworkers. Entry level office jobs shrink first, and companies get smaller. Data centers use as much power as cities, and electricity prices become a political issue. The first big accidents happen, when agents act without a human watching. People begin to ask a new question: what is my job for?",[('Agents become coworkers','coworkers'),('Data centers use as much power as cities','data centers'),('First big accidents: agents acting unwatched','first big accidents')],25,'JUDGMENT')]
IL[(2027,2)]=[AS(4,"Level four, an innovator. It does not just do your work, it invents. It can design a new drug candidate, a better battery material, or a new algorithm, and test it in simulation before you finish your coffee. In my prediction, an owner of a good idea might earn between fifteen thousand dollars and a hundred and fifty thousand dollars a month. Most people will earn much less. The money goes to whoever owns the idea.",'new drug candidate','earn between',15000,150000,['a new drug candidate','a better battery','a new algorithm'],'ESTIMATE'),
 SO(4,"Society at level four. Discoveries arrive every month, in medicine, energy and materials. The labs that build A I use it to build better A I, and governments treat it as a matter of national security. A gap opens between people who own computing power and everyone else. Some countries test a basic income. Many workers retrain, and many do not know what for.",[('A discovery every month: medicine, energy, materials','discoveries'),('Governments treat AI as national security','national security'),('Gap between owners of compute and everyone else; basic income tests','basic income')],50,'PREDICTION')]
IL[(2028,3)]=[AS(5,"Level five, an organization. Your assistant is not one worker. It is a whole company, with product, sales, finance and legal departments, all run by A I. You set the goals, and you own it. You could start a logistics firm, a software business, or a media studio with no employees at all. In my prediction, owners might earn between thirty thousand dollars and five hundred thousand dollars a month, or more. But the money flows to owners, not to workers, and the owners of the best A I will be few.",'whole company','earn between',30000,500000,['a logistics firm','a software business','a media studio'],'ESTIMATE'),
 SO(5,"Society at level five. Companies without employees compete with companies that still have them, and the old ones lose. Work becomes optional for some, and impossible to find for others. Governments argue about universal income, and about who owns the machines. Many people look for meaning in family, craft and community.",[('Companies without employees beat those with them','companies without employees'),('Universal income, and who owns the machines','universal income'),('Meaning moves to family, craft and community','family, craft')],80,'PREDICTION')]
IL[(2030,0)]=[AS(6,"And with superintelligence, the question changes. A system smarter than every human together could build almost anything you can describe, a cure, a city, a rocket. The cost could fall close to zero. In that world, I cannot give you a monthly income, because money itself may stop being the measure. It might be abundance for everyone, or control by a few, or by the machines. Nobody can promise which.",'build almost anything','cannot give you',None,None,['a cure','a city','a rocket'],'ESTIMATE'),
 SO(6,"Society with superintelligence. In the best case, disease and poverty end, energy is clean and nearly free, and people spend their time on what matters to them. In the worst case, people lose control of the systems that run the world. Most experts think both are possible, and that what we do before then matters. This is the most uncertain prediction in this film.",[('Best case: disease and poverty end, clean energy','best case'),('Worst case: people lose control','worst case'),('Most experts: both are possible','most uncertain')],99,'PREDICTION')]

INTRO="In July twenty twenty four, OpenAI told its employees there are five levels on the road to artificial general intelligence. Level one, chatbots. Level two, reasoners. Level three, agents. Level four, innovators. Level five, organizations, A I that can run an entire company. After that, if it ever happens, comes superintelligence. At every level, we will also show what an assistant of that level could help you build, how much money that might make you, and how society changes. This film follows those levels three months at a time, from twenty twenty two to twenty thirty two. Every date up to today is real, and checked. Which model reached which level is my own judgment. Everything after today is a prediction."
OUTRO="The five levels are OpenAI's own scale, not a scientific standard. Which model reached which level is my judgment, and every date after today is a guess. If you want to follow along, watch three things. How long agents can work without a human. Whether an A I can build the next A I. And who decides when to slow down."

ACTS=[('I','THE CHATBOTS','2022 – 2024 · Levels 1 and 2','machine',lambda x:x['y']<=2024),
      ('II','THE AGENTS','2025 – 2026 · Levels 2 and 3','machine',lambda x:2025<=x['y']<=2026),
      ('III','THE INNOVATORS','Prediction · 2027 – 2028 · Level 4','machine',lambda x:2027<=x['y']<=2028),
      ('IV','THE ORGANIZATIONS','Prediction · 2029 · Level 5','fiction',lambda x:x['y']==2029),
      ('V','THE SUPERINTELLIGENCE','Prediction · 2030 – 2032 · ASI','fiction',lambda x:x['y']>=2030)]

chapters=[dict(ch='',title='',sub='',mood='machine',shots=[dict(label='FACT',year='',say=INTRO)])]
data=dict(shots={},acts=[])
state=[list(s) for s in START]
n=1
def snap(): return [list(s) for s in state]
data['shots']['q00']=dict(kind='intro')
for ch,title,sub,mood,pred in ACTS:
    shots=[]
    for x in [z for z in Q if pred(z)]:
        sid='q%02d'%n; n+=1
        start=snap()
        # apply events in narration order (key position) so state is cumulative
        for e in x['events']:
            s=state[e['lab']]; s[0]=e['model']; s[1]=e['note']; s[3]=1 if e['pred'] else 0
            if e['lvl']: s[2]=e['lvl']
        shots.append(dict(label=x['label'],year='%d · %s'%(x['y'],MONTHS[x['m']]),say=x['say']))
        data['shots'][sid]=dict(kind='quarter',y=x['y'],m=x['m'],title='%s %d'%(MLONG[x['m']],x['y']),start=start,events=x['events'],era=x['era'])
        for il in IL.get((x['y'],x['m']),[]):
            sid2='q%02d'%n; n+=1
            shots.append(dict(label=il['label'],year='%d · %s'%(x['y'],MONTHS[x['m']]),say=il['say']))
            d=dict(il); d.pop('say'); d['era']=x['era']; d['start']=snap(); d['y']=x['y']; d['m']=x['m']; data['shots'][sid2]=d
    chapters.append(dict(ch=ch,title=title,sub=sub,mood=mood,shots=shots))
chapters.append(dict(ch='',title='',sub='',mood='fiction',shots=[dict(label='FACT',year='',say=OUTRO)]))
sid='q%02d'%n; data['shots'][sid]=dict(kind='outro',end=snap())
n+=1
# ids + first flags
k=0
for c in chapters:
    for i,s in enumerate(c['shots']):
        s['id']='q%02d'%k; k+=1; s['first']=(i==0)
json.dump(chapters,open('script_ai.json','w'),indent=1,ensure_ascii=False)
json.dump(data,open('agi_data.json','w'),ensure_ascii=False)
chars=sum(len(s['say']) for c in chapters for s in c['shots'])
print(k,'shots',chars,'chars ~',round(chars/13.7/60,1),'min narration')
