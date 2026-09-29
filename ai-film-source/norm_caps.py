"""Subtitle display normalizer: spoken words -> numerals (GPT-1, 2017, 175 billion...).
Reads schedule_raw.json (spoken form), writes schedule.json with caps[].text normalized.
Narration audio is untouched."""
import re, json, sys
ONES = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = {'twenty':20,'thirty':30,'forty':40,'fifty':50,'sixty':60,'seventy':70,'eighty':80,'ninety':90}
SCALE = {'hundred':100,'thousand':1000,'million':10**6,'billion':10**9,'trillion':10**12}
NUM = {w:i for i,w in enumerate(ONES)}; NUM.update(TENS)
ORD = {'first':1,'second':2,'third':3,'fourth':4,'fifth':5,'sixth':6,'seventh':7,'eighth':8,'ninth':9,'tenth':10,'eleventh':11,'twelfth':12,'twentieth':20,'thirtieth':30,
       'twenty first':21,'twenty second':22,'twenty third':23,'twenty fourth':24,'twenty fifth':25,'twenty sixth':26,'twenty seventh':27,'twenty eighth':28,'twenty ninth':29,'thirty first':31}
UNITS = set('games years months days countries percent dollars hours weeks centuries decades'.split())
YEAR_START = {'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'}
MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December'
WORD = re.compile(r"[A-Za-z']+")

def is_num(w): return w in NUM or w in SCALE

def value(ws):
    total = cur = 0
    for w in ws:
        if w == 'and': continue
        if w == 'hundred': cur = (cur or 1) * 100
        elif w in SCALE: total += (cur or 1) * SCALE[w]; cur = 0
        else: cur += NUM[w]
    return total + cur

def fmt(n):
    for name,sc in (('trillion',10**12),('billion',10**9),('million',10**6)):
        if n >= sc and n % sc == 0: return f'{n//sc} {name}'
    return f'{n:,}' if n >= 1000 else str(n)

def as_year(ws, following):
    """Return a year string if the run reads like a year, else None."""
    if any(w in SCALE for w in ws): return None
    if len(ws) >= 2 and (ws[0] in ONES[3:10] or (ws[0] in ('one','two') and following == 'B')) and ws[1] in TENS:   # "five thirty nine", "four seventy six" -> 539, 476
        return str(NUM[ws[0]]*100 + sum(NUM[w] for w in ws[1:]))
    if len(ws) >= 2 and ws[0] in YEAR_START and (ws[1] in TENS or 10 <= NUM[ws[1]] <= 19):
        return str(NUM[ws[0]]*100 + sum(NUM[w] for w in ws[1:]))
    return None

def convert_numbers(text):
    toks = re.findall(r"[A-Za-z']+|[^A-Za-z']+", text)
    out = []; i = 0
    def word(k): return toks[k].lower() if k < len(toks) and WORD.fullmatch(toks[k]) else None
    def next_word_after(k):        # next word token after index k, only across spaces
        j = k + 1
        if j < len(toks) and toks[j] == ' ': j += 1
        return word(j)
    while i < len(toks):
        w = word(i)
        starts = w is not None and (is_num(w) or (w == 'a' and next_word_after(i) in ('hundred','thousand')))
        if not starts: out.append(toks[i]); i += 1; continue
        run = []; j = i; last = i
        while j < len(toks):
            wj = word(j)
            if wj is not None and (is_num(wj) or (wj == 'a' and not run and next_word_after(j) in ('hundred','thousand'))
                                   or (wj == 'and' and run and next_word_after(j) is not None and is_num(next_word_after(j)) and run[-1] in SCALE)):
                run.append(wj); last = j; j += 1
            elif toks[j] == ' ' and run and j + 1 < len(toks) and word(j+1) is not None and (is_num(word(j+1)) or word(j+1) == 'and'):
                j += 1
            else: break
        end = last + 1
        ws = [x for x in run if x != 'a']
        following = next_word_after(last)
        following_up = (following or '').upper() if following == 'b' else following
        rep = as_year(ws, 'B' if following in ('b','bc') else following)
        if rep is None:
            v = value(ws)
            if len(ws) == 1 and v < 10: rep = str(v) if (following in UNITS and v > 1) else None
            elif len(ws) == 2 and ws[1] == 'hundred' and 10 <= NUM.get(ws[0], 0) <= 99: rep = fmt(v)
            elif len(ws) == 3 and ws[2] == 'hundred' and ws[0] in TENS and ws[1] in ONES[1:10]: rep = fmt(v)
            else: rep = fmt(v)
        if rep is None: out.append(''.join(toks[i:end]))
        else: out.append(rep)
        i = end
    return ''.join(out)

DW='zero one two three four five six seven eight nine'.split()
DWRE='(?:'+'|'.join(DW)+')'
def norm(text):
    s = text
    s = re.sub(r'\b(ten|'+DWRE+r') point ('+DWRE+r'(?: '+DWRE+r')*)\b', lambda m: str(NUM[m.group(1).lower()])+'.'+''.join(str(NUM[w]) for w in m.group(2).lower().split()), s, flags=re.I)
    s = re.sub(r'\bChat G P T\b', 'ChatGPT', s)
    s = re.sub(r'\bG P T (\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine)( o)?\b', lambda m: 'GPT-' + (m.group(1) if m.group(1)[0].isdigit() else str(NUM[m.group(1).lower()])) + ('o' if m.group(2) else ''), s, flags=re.I)
    s = re.sub(r'\bG P T\b', 'GPT', s); s = re.sub(r'\bA I\b', 'AI', s)
    s = re.sub(r'\bB C\b', 'B_C', s)
    s = re.sub(r'\bBert\b', 'BERT', s); s = re.sub(r'\bR one\b', 'R1', s); s = re.sub(r'\bo one\b', 'o1', s)
    s = re.sub(r'\b(Opus|Grok|Sonnet|Haiku|Claude|Gemini|Fable|Mythos) (one|two|three|four|five|six|seven|eight|nine)\b', lambda m: m.group(1) + ' ' + str(NUM[m.group(2).lower()]), s)
    s = re.sub(r'\b(Bard|Astra)\b', r'\1', s)
    s = re.sub(r'\b(' + MONTHS + r') (' + '|'.join(sorted(ORD, key=len, reverse=True)) + r')\b', lambda m: m.group(1) + ' ' + str(ORD[m.group(2)]), s)
    s = convert_numbers(s)
    s = s.replace('B_C','BC'); s = re.sub(r'\bA D\b', 'AD', s)
    s = s.replace('games to one','games to 1').replace('AlphaFold two','AlphaFold 2')
    s = s.replace('the 20 tens','the 2010s').replace('the seventies','the 1970s').replace('the late eighties','the late 1980s').replace('late eighties','late 1980s')
    return s

if __name__ == '__main__':
    sch = json.load(open('schedule_raw.json')); n = 0
    for sc in sch['scenes']:
        for c in sc.get('caps', []):
            new = norm(c['text'])
            if new != c['text']:
                n += 1
                if len(sys.argv) > 1: print(c['text'], ' => ', new)
            c['raw'] = c['raw'] if 'raw' in c else c['text']; c['text'] = new
    json.dump(sch, open('schedule.json', 'w'))
    print('changed', n)
