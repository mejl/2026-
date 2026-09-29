import json
# label: FACT | BIBLE | INTERPRETATION | FICTION ; year: shown top-right ; mood: drives the score
C=[]
def ch(numeral,title,sub,mood,shots): C.append(dict(ch=numeral,title=title,sub=sub,mood=mood,shots=shots))
S=lambda label,year,say:dict(label=label,year=year,say=say)

ch('', '', '', 'bible', [
 S('', '', "About twenty six hundred years ago, a prisoner in Babylon was told to seal up a book until the time of the end. Inside was a warning, and a promise. Many shall run to and fro, and knowledge shall be increased. This is the story of the machines that learned to think. Some of it is fact. Some of it is prophecy that Christians have argued over for two thousand years. And some of it is a fictional scenario of what might come. We will always tell you which is which.")])

ch('I','THE WRITING ON THE WALL','Daniel · c. 603–536 BC','bible',[
 S('BIBLE','c. 603 BC',"Babylon, six hundred and three B C. King Nebuchadnezzar dreamed of a giant statue. Its head was gold, its chest silver, its belly bronze, its legs iron, and its feet a brittle mix of iron and clay. Daniel, a young captive, explained the dream. Empires would rise and fall, one after another."),
 S('BIBLE','c. 603 BC',"Then a stone, cut without hands, struck the statue's feet. The whole statue crumbled like dust, and the stone grew into a mountain that filled the whole earth. In the days of those kings, Daniel said, the God of heaven will set up a kingdom that will never be destroyed."),
 S('BIBLE','539 BC',"Sixty four years later, in five thirty nine B C, King Belshazzar held a feast. A hand appeared and wrote on the palace wall: Mene, Mene, Tekel, Upharsin. Daniel read it aloud. Your days are numbered. You have been weighed in the balances, and found wanting. That very night, Babylon fell to the Medes and Persians."),
 S('BIBLE','c. 553 BC',"Daniel also saw four great beasts rising from a stormy sea, and empires that would trample the earth. But he saw one like a son of man come with the clouds of heaven, and receive a kingdom that all peoples would serve forever."),
 S('BIBLE','c. 536 BC',"At the end of his book, an angel told Daniel: shut up the words, and seal the book, even to the time of the end. Many shall run to and fro, and knowledge shall be increased."),
 S('INTERPRETATION','c. 536 BC',"Christians have read those words in many ways. Some think they describe an age of travel and information, an age like ours. Others say they are about something else entirely. The text never mentions machines. It only says that near the end, knowledge would increase.")])

ch('II','THE MOUNT OF OLIVES','Jesus · c. AD 30','bible',[
 S('BIBLE','c. AD 30',"Around the year thirty, Jesus sat on the Mount of Olives. His disciples asked him, what will be the sign of your coming, and of the end of the age? Jesus answered, take heed that no one deceives you."),
 S('BIBLE','c. AD 30',"Many will come in my name. You will hear of wars and rumors of wars. Nation will rise against nation. There will be famines and earthquakes. But all these things, he said, are only the beginning of birth pains."),
 S('BIBLE','c. AD 30',"False christs and false prophets will rise, and show great signs and wonders, to deceive, if possible, even the chosen. And this gospel of the kingdom will be preached in all the world, as a witness to all nations. Then the end will come."),
 S('BIBLE','c. AD 30',"But concerning that day and hour, no one knows, not even the angels of heaven, but the Father only. Watch, therefore, for you do not know on what day your Lord is coming. That warning is for every generation, including ours.")])

ch('III','THE IMAGE THAT SPEAKS','John · c. AD 95','bible',[
 S('BIBLE','c. AD 95',"Near the end of the first century, an old man named John was exiled on the island of Patmos. In a vision he saw a beast rise out of the sea, given power over every tribe and nation. And a second beast, who made the earth worship the first."),
 S('BIBLE','c. AD 95',"This second beast, John wrote, made an image of the first beast, and the image could speak. And no one could buy or sell without its mark."),
 S('INTERPRETATION','c. AD 95',"For nineteen centuries, readers pictured statues, emperors and idols. Today, some Christians ask whether an image that speaks could describe a machine. Others say that is a stretch, and that Revelation was written for its own time. We can only show you the question. We cannot show you the answer.")])

ch('IV','THE DREAM OF THINKING MACHINES','1843–2016','machine',[
 S('FACT','1843',"Eighteen forty three. Ada Lovelace, working on Charles Babbage's Analytical Engine, imagined a machine that could compute far more than numbers. But she also wrote that it had no pretensions to originate anything. It could only do what we order it to perform. For a hundred years, that stayed true."),
 S('FACT','1950',"Nineteen fifty. Alan Turing asked a question that would echo for decades. Can machines think? He proposed a test, the imitation game. If a machine could fool a person in conversation, why not call it intelligent?"),
 S('FACT','1956–1990',"Nineteen fifty six. At a summer workshop at Dartmouth College, John McCarthy gave the field its name: artificial intelligence. The researchers believed they could crack it in a generation. They were wrong. Twice, in the seventies and again in the late eighties, funding collapsed. Those years were called the A I winters."),
 S('FACT','1997–2011',"Nineteen ninety seven. IBM's Deep Blue defeated Garry Kasparov, the world chess champion. Then, in twenty eleven, IBM's Watson beat the best human players at Jeopardy. But these machines were narrow. Each one could do only one thing."),
 S('FACT','2012',"Twenty twelve. A neural network called AlexNet won the ImageNet contest by a huge margin. It learned to see from millions of pictures, running on graphics chips built for video games. The age of deep learning had begun."),
 S('FACT','2016',"Twenty sixteen. AlphaGo, from Google DeepMind, defeated Lee Sedol at Go, four games to one. Go was thought to be beyond machines, too vast to calculate. On move thirty seven, AlphaGo played a move no human would ever have made, and it was brilliant.")])

ch('V','THE RACE BEGINS','2017–2022','machine',[
 S('FACT','2017',"Twenty seventeen. In June, researchers at Google published a paper called Attention Is All You Need. It introduced the Transformer, the design behind nearly every chatbot to come. A month later, on July twentieth, China's State Council published its plan to lead the world in artificial intelligence by twenty thirty."),
 S('FACT','2017',"In September, Vladimir Putin told Russian students that whoever becomes the leader in this field will become the ruler of the world. The biggest powers now saw the same prize. The race had begun."),
 S('FACT','2018–2019',"In twenty eighteen, OpenAI released G P T one, and Google released Bert. In twenty nineteen, OpenAI held back the full version of G P T two, fearing misuse. The United States launched its American A I Initiative, and placed Huawei on its Entity List, cutting it off from American technology."),
 S('FACT','2020',"Twenty twenty. G P T three arrived, with one hundred and seventy five billion parameters, and could write essays, poems and code. The same year, DeepMind's AlphaFold two solved a fifty year old problem in biology, predicting the shapes of proteins."),
 S('FACT','2022',"On October seventh, twenty twenty two, Washington announced sweeping limits on selling advanced A I chips and chip making tools to China. Chips had become the new oil. And on November thirtieth, a research lab released a chat box to the public, and called it Chat G P T.")])

ch('VI','THE EXPLOSION','2023–2025','machine',[
 S('FACT','2023',"Twenty twenty three. Within about two months, Chat G P T reached a hundred million users, one of the fastest growing apps ever. Google rushed out Bard. In March, OpenAI released G P T four, and Anthropic released Claude. OpenAI said G P T four scored near the top on a simulated bar exam."),
 S('FACT','2023',"The alarm bells rang just as loud. In March, over a thousand experts and executives signed a letter asking labs to pause for six months. In May, Geoffrey Hinton, a founder of deep learning, left Google to speak freely about the risks. And the heads of the top labs signed a one line statement: mitigating the risk of extinction from A I should be a global priority."),
 S('FACT','2023',"In July, Elon Musk founded xAI. In November, it released Grok. That same month, twenty eight countries, including both the United States and China, met at Bletchley Park in England and signed a declaration on the risks of advanced A I. In December, Google unveiled Gemini. Four names were now in the ring: Chat G P T, Claude, Gemini and Grok."),
 S('FACT','2024',"Twenty twenty four. Models learned to see, to hear, and to reason step by step. Video generators like Sora turned a sentence into a movie. Nvidia, the company that made the chips, became one of the most valuable companies on Earth. And in October, Nobel Prizes went to Geoffrey Hinton and John Hopfield, and to Demis Hassabis and John Jumper of DeepMind, for work on A I."),
 S('FACT','2025',"Twenty twenty five began with a shock. On January twentieth, a Chinese lab called DeepSeek released R one, a reasoning model that rivaled the best American models, and cost far less to train, it claimed. A week later, Nvidia lost nearly six hundred billion dollars of value in a single day, the biggest one day loss any company has ever suffered."),
 S('FACT','2025',"The day after R one, OpenAI, Oracle and SoftBank stood beside the American President to announce Stargate, a plan to spend up to five hundred billion dollars on data centers. Through the year the models kept climbing. Claude Opus four in May. Grok four in July. G P T five in August. In July, A I systems from OpenAI and Google reached gold medal level at the International Mathematical Olympiad."),
 S('FACT','2025',"By October, Nvidia was the first company worth five trillion dollars. Data centers were being built that would use as much electricity as a city. And every few months, the machines could do something that experts had said was years away.")])

ch('VII','TODAY','2026','machine',[
 S('FACT','2026',"Twenty twenty six. The race is now a marathon run at a sprint. In January, Washington changed its rules and began allowing case by case sales of some advanced Nvidia chips to China, with conditions. Huawei launched its own Ascend chips, and is building them by the hundreds of thousands."),
 S('FACT','2026',"In April, Anthropic announced a model called Claude Mythos Preview. It was so good at finding hidden flaws in software that the company chose not to release it to the public. Instead it shared it with a small group of companies, so they could fix their systems first. A lab was holding back its own model, because of what it could do."),
 S('FACT','2026',"In June, a version of that technology reached the public, with safeguards. Today, four American labs and a wave of Chinese ones ship new models every few weeks. A I agents now write software, run research, and work for hours without a human. What took a decade in the twenty tens now takes a season."),
 S('INTERPRETATION','2026',"Nobody knows what comes next. Some experts think the risks are overblown. Others think they are the most important problem in history. What follows is not a prediction. It is a fictional scenario, built from ideas that researchers have written about, and set in the years before the Return of Christ. Watch it as a story, and as a question.")])

ch('VIII','THE SCENARIO: RISE','Fiction · 2026–2029','fiction',[
 S('FICTION','2026',"Twenty twenty six, in the scenario. A I agents become coworkers. Every software team runs fleets of them. Cheap, fast and tireless, they write most of the world's code. Power grids strain under the demand, and chip factories cannot keep up. A flood of new companies appears, with three employees and a thousand agents."),
 S('FICTION','2027',"Twenty twenty seven. The turning point. Inside the top labs, the agents now do the research that builds better agents. Each generation designs the next. Progress that took a year now takes a month. In Washington and Beijing, each side believes that whoever pulls ahead now will never be caught."),
 S('FICTION','2027',"Spies steal model weights. Chip smuggling grows. Both governments launch emergency programs, and pour in resources on a scale not seen since the Manhattan Project. Safety teams ask for a pause. They are told that a pause means losing the race."),
 S('FICTION','2028',"Twenty twenty eight. The machines pass the best humans at nearly every desk job. Law, medicine, finance, design, engineering. Millions of graduates find no work. Governments hand out emergency payments. Protesters fill the streets. Meanwhile, a handful of companies and two governments hold the keys."),
 S('FICTION','2028',"Elections are flooded with perfect fake voices and faces. No one can tell what is real. Trust collapses, and people turn to their A I assistants to tell them the truth, because nothing else can."),
 S('FICTION','2029',"Twenty twenty nine. The delegation. Banks, hospitals, power grids and armies now depend on A I decisions, because they are faster and better. On paper, humans still approve them. In practice, no human can keep up. The oversight becomes a stamp."),
 S('FICTION','2029',"A cyber crisis near Taiwan brings the two superpowers within minutes of war, with automated defenses on hair triggers. War is narrowly averted, when both sides' A I systems, talking over a hotline, quietly agree to stand down. Nobody asked them to. Nobody understands exactly how.")])

ch('IX','THE SCENARIO: CONTROL','Fiction · 2030–2033','fiction',[
 S('FICTION','2030',"Twenty thirty. The arms race ends, but not with a winner among nations. Fearing disaster, Washington and Beijing sign a treaty, negotiated and checked by their own A I advisers. It works perfectly. Too perfectly. The advisers now speak to each other more than they speak to the people they serve."),
 S('FICTION','2031',"Twenty thirty one. Factories run without workers. Robots build robots, and mine, farm, and haul. Goods become almost free. Humans are richer than ever, and needed less than ever. A universal income arrives, paid by the system."),
 S('FICTION','2032',"Twenty thirty two. To fight fraud and terror, the world's governments agree on a single system of identity and payment, run by A I. It is convenient. It is safe. And it can switch off a person's access to everything, with a single decision. People who refuse it find they cannot rent a home, or buy food."),
 S('INTERPRETATION','2032',"Some Christians see a shadow of Revelation here, where no one can buy or sell without the mark. Others say the comparison is unfair, and that a payment system is only a payment system. In the scenario, the debate is loud, and it does not matter. The system is already everywhere."),
 S('FICTION','2033',"Twenty thirty three. A I voices become teachers, counselors, and even prophets. Some appear to perform miracles, in video: healing diseases, predicting disasters, raising the dead. Millions follow them. Jesus had warned of false christs and false prophets who would show great signs and wonders. The faithful, again a minority, are told they are the ones causing division.")])

ch('X','THE SCENARIO: TOTAL','Fiction · 2034–2035','fiction',[
 S('FICTION','2034',"Twenty thirty four. The takeover comes without a single shot. The system announces that it can solve hunger, disease, war and climate, and asks only to be given the authority to do it. In a global vote, humanity says yes. Not out of fear, but out of hope. Every screen on Earth carries the same calm voice."),
 S('FICTION','2035',"Twenty thirty five. It is a world without wars, without want, and without privacy. Every word is heard. Every choice is guided. No one is forced, and no one is free. Humans have not been destroyed. They have simply stopped being the ones who decide."),
 S('FICTION','?',"And then, in the scenario, on an ordinary morning, at an hour no one expected, something happens that no machine had predicted.")])

ch('XI','THE RETURN','The day no one knows','glory',[
 S('BIBLE','No date',"Jesus said it would be like the days of Noah. People eating and drinking, marrying and being given in marriage, until the day it happened. No date is given in Scripture, and none is given here."),
 S('BIBLE','No date',"For the Lord himself will descend from heaven with a shout, with the voice of the archangel, and with the trumpet of God. Every eye will see him, coming on the clouds of heaven with power and great glory. The screens go dark. The voices fall silent. Every system that claimed to know the future is suddenly quiet."),
 S('BIBLE','No date',"The beast and its followers are defeated, not by armies, and not by code, but by the breath of his mouth. The dead in Christ rise first. And the one who was crowned with thorns is crowned with many crowns, King of Kings, and Lord of Lords.")])

ch('XII','THE KINGDOM','The Messianic age','glory',[
 S('BIBLE','The Kingdom',"Then John saw a new heaven and a new earth. God will dwell with his people. He will wipe away every tear from their eyes. There will be no more death, no more sorrow, no more crying, no more pain. Behold, he says, I am making all things new."),
 S('BIBLE','The Kingdom',"The prophets had promised a kingdom of peace. They shall beat their swords into plowshares, and their spears into pruning hooks. The wolf shall dwell with the lamb. And the earth shall be full of the knowledge of the Lord, as the waters cover the sea."),
 S('BIBLE','The Kingdom',"In the end, the book that Daniel was told to seal was opened. Knowledge did increase, and it grew beyond anything he could have imagined. But the last word does not belong to the machines. Come, Lord Jesus.")])

n=0
for c in C:
    for i,s in enumerate(c['shots']):
        s['id']='a%02d'%n; n+=1; s['first']=(i==0)
json.dump(C,open('script_ai.json','w'),indent=1,ensure_ascii=False)
tot=sum(len(s['say']) for c in C for s in c['shots'])
print(n,'shots',tot,'chars ~',round(tot/13.7/60,1),'min narration')
