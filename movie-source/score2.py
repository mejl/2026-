"""Orchestral-style score v2: band-limited wavetable strings, horn melody, formant choir,
harp, timpani, synthesized concert-hall convolution reverb, gentle mastering."""
import json, numpy as np
from functools import lru_cache
from scipy.signal import butter, sosfilt, oaconvolve
from scipy.io import wavfile

SR = 44100
sch = json.load(open('schedule.json')); scenes = sch['scenes']
TOTAL = sch['total']; N = int(TOTAL * SR) + 4 * SR
dry = np.zeros((N, 2), np.float32)
rng = np.random.default_rng(3)
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)
def hp(x, f): return sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)
def add(sig, t0, pan=0.0, g=1.0):
    i = int(t0 * SR)
    if i >= N or len(sig) == 0: return
    sig = sig[:N - i] * g
    dry[i:i + len(sig), 0] += (sig * np.sqrt(.5 * (1 - pan))).astype(np.float32)
    dry[i:i + len(sig), 1] += (sig * np.sqrt(.5 * (1 + pan))).astype(np.float32)
def adsr(n, a, d, s, r):
    e = np.full(n, s, np.float32); a, d, r = int(a * SR), int(d * SR), int(r * SR)
    a = min(a, n); e[:a] = np.linspace(0, 1, a)
    dd = min(d, n - a); e[a:a + dd] = np.linspace(1, s, dd)
    r = min(r, n); e[n - r:] *= np.linspace(1, 0, r)
    return e

# ---- band-limited wavetables (no aliasing) ----
TL = 4096
def table(kind, f0):
    h = np.arange(1, 64); h = h[h * f0 < 9000]
    ph = np.arange(TL) / TL * 2 * np.pi
    if kind == 'saw':  amp = 1 / h ** 1.15
    elif kind == 'horn': amp = np.where(h % 2 == 1, 1 / h ** 1.3, .55 / h ** 1.6)
    elif kind == 'ah':   # choir "ah": boost harmonics near vowel formants 700/1200/2600 Hz
        f = h * f0; amp = (np.exp(-((f - 700) / 180) ** 2) + .6 * np.exp(-((f - 1200) / 220) ** 2) + .25 * np.exp(-((f - 2600) / 300) ** 2) + .05) / h ** .3
    t = (amp[:, None] * np.sin(h[:, None] * ph[None, :])).sum(0)
    return (t / np.max(np.abs(t))).astype(np.float32)
@lru_cache(None)
def tab(kind, m): return table(kind, midi(m))
def osc(kind, m, n, detune=0.0, vib=0.0, vr=5.0):
    t = np.arange(n) / SR
    f = midi(m) * (1 + detune) * (1 + vib * np.sin(2 * np.pi * vr * t + rng.random() * 6))
    ph = (np.cumsum(f) / SR + rng.random()) % 1.0
    return tab(kind, m)[(ph * TL).astype(np.int32)]

@lru_cache(None)
def strings(chord, dur, bright):
    n = int(dur * SR); out = np.zeros(n, np.float32)
    for m in chord:
        for dt in (-.006, -.003, 0, .0025, .005):
            out += osc('saw', m, n, dt, .0035, 5 + rng.random())
        out += .6 * osc('saw', m - 12, n, .001, .002)
    out = lp(out, bright) * adsr(n, min(1.4, dur / 3), .5, .9, min(1.6, dur / 3))
    return (out / (len(chord) * 5)).astype(np.float32)
@lru_cache(None)
def choir(chord, dur):
    n = int(dur * SR); out = np.zeros(n, np.float32)
    for m in chord[1:]:
        for dt in (-.004, 0, .004): out += osc('ah', m + 12, n, dt, .006, 5.3)
    return (out * adsr(n, min(2.2, dur / 2.5), .5, .9, min(1.8, dur / 3)) / (len(chord) * 3)).astype(np.float32)
def horn(m, dur):
    n = int(dur * SR); x = osc('horn', m, n, 0, .004, 5.2) + .5 * osc('horn', m, n, .003, .004, 5.6)
    return lp(x, 2600) * adsr(n, .18, .3, .8, min(.6, dur / 2)) * .5
def harp(m):
    n = int(2.5 * SR); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * midi(m) * k * t) * np.exp(-t * (2.5 + k * 1.5)) / k ** 1.5 for k in range(1, 7))
    return (x * (1 - np.exp(-t * 400)) * .35).astype(np.float32)
def timp(g=1.0, f=62):
    n = int(2.2 * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * np.cumsum(f * (1 + .25 * np.exp(-t * 20))) / SR) * np.exp(-t * 2.2)
    x += lp(rng.standard_normal(n), 700) * np.exp(-t * 25) * .35
    return (np.tanh(x * 1.5) * g).astype(np.float32)
def swell(dur, g):
    n = int(dur * SR); t = np.arange(n) / SR
    x = lp(rng.standard_normal(n), 2500) * (t / dur) ** 2.5
    return (x * g).astype(np.float32)

# ---- harmony per mood ----
DARK = {'c7','martyrs','middle','c11','flood','expel','cain','plagues','gethsemane','ship','c6','c9'}
EPIC = {'c1','flood','c3','plagues','c4','c5','c11','c12','reform','return','ship','bush','ascend','c14','intro'}
HOPE = {'c2','c10','missions','today','outro','c8','baptism','sermon','supper','joseph','eden'}
P_EPIC = [(50,57,62,65),(46,53,58,62),(53,57,60,65),(48,55,60,64)]   # Dm Bb F C
P_DARK = [(50,57,62,65),(46,53,58,62),(45,52,57,61),(50,57,62,65)]   # Dm Bb A Dm
P_HOPE = [(53,60,65,69),(50,57,62,65),(46,53,58,62),(48,55,60,64)]   # F Dm Bb C
MOTIF = [(62,1.0),(69,1.0),(67,.5),(65,.5),(64,1.0),(62,2.0)]          # heroic horn line
HOPE_MOTIF = [(65,1.0),(69,1.0),(72,1.5),(70,.5),(69,1.0),(65,2.0)]

for s in scenes:
    sc = s.get('scene', ''); t0, t1 = s['start'], s['end']; dur = t1 - t0
    if s['id'] == 'presents':
        add(choir((50,57,62,65), dur + 1), t0, 0, .5); add(swell(2.5, .15), t1 - 2.5); continue
    prog = P_DARK if sc in DARK else (P_HOPE if sc in HOPE else P_EPIC)
    epic = sc in EPIC; bright = 2600 if epic else 1600
    if s.get('ch') or sc in ('intro', 'outro'):
        add(timp(1.0, 55), t0, -.2); add(timp(.8, 62), t0 + .05, .2); add(timp(.6, 55), t0 + .5, 0)
    cl = 4.0; k = 0; tt = t0
    while tt < t1:
        d = round(min(cl + .8, t1 - tt + .8), 1); ch = prog[k % 4]
        add(strings(ch, d, bright), tt, -.35, .9 if epic else .7)
        add(strings(tuple(m + 12 for m in ch), d, bright), tt, .35, .35)
        add(choir(ch, d), tt, .1, .55 if epic else .35)
        if sc in HOPE:   # harp arpeggio
            for j in range(8): add(harp(ch[j % 4] + 12 * (j // 4)), tt + j * .5, rng.uniform(-.4, .4), .5)
        tt += cl; k += 1
    # horn melody once per shot (twice if long) for epic/hope scenes
    if sc in EPIC or sc in HOPE:
        mot = MOTIF if sc in EPIC else HOPE_MOTIF; beat = .75
        starts = [s['vo'] + 1.0] + ([s['vo'] + dur / 2] if dur > 22 else [])
        for st in starts:
            tt = st
            for m, b in mot: add(horn(m - (0 if sc in EPIC else 0), b * beat + .1), tt, .15, .55 if epic else .35); tt += b * beat
    if epic:   # soft timpani pulse
        tt = s['vo']
        while tt < t1 - 1:
            add(timp(.25, 55), tt, rng.uniform(-.3, .3)); tt += 1.25
    add(swell(2.2, .06 if epic else .035), t1 - 2.2)

# ---- sound effects (same kinds as before, softer and filtered) ----
def noise(n): return rng.standard_normal(n).astype(np.float32)
def fx(kind, n):
    t = np.arange(n) / SR
    if kind == 'rain': return lp(hp(noise(n), 1200), 7000) * .06
    if kind == 'wind': return hp(lp(noise(n), 700), 120) * (.5 + .5 * np.sin(2 * np.pi * .07 * t + rng.random() * 6)) * .08
    if kind == 'sea':  return lp(noise(n), 700) * (.3 + .7 * np.clip(np.sin(2 * np.pi * .11 * t), 0, 1) ** 2) * .16
    if kind == 'fire':
        x = lp(noise(n), 900) * .04
        for _ in range(int(n / SR * 18)):
            i = rng.integers(0, max(1, n - 600)); x[i:i + 300] += hp(noise(300), 2500) * np.exp(-np.arange(300) / 50) * rng.uniform(.05, .25)
        return x
    if kind == 'crowd':
        x = np.zeros(n, np.float32)
        for f in (320, 520, 850): x += sosfilt(butter(2, [f * .8, f * 1.25], 'band', fs=SR, output='sos'), noise(n)) * (.5 + .5 * np.sin(2 * np.pi * rng.uniform(1.5, 3) * t + rng.random() * 6))
        return x * .025
    if kind == 'birds':
        x = fx('wind', n) * .5; tt = np.arange(int(.15 * SR)) / SR
        for _ in range(int(n / SR)):
            i = rng.integers(0, max(1, n - len(tt))); f0 = rng.uniform(2800, 4200)
            x[i:i + len(tt)] += np.sin(2 * np.pi * (f0 + 1200 * np.sin(2 * np.pi * 16 * tt)) * tt) * np.sin(np.pi * tt / tt[-1]) * .02
        return x
    return np.zeros(n, np.float32)
def thunder():
    n = int(5 * SR); t = np.arange(n) / SR
    x = lp(noise(n), 220) * np.exp(-t * .9) * (1 - np.exp(-t * 30)) + lp(noise(n), 1500) * np.exp(-t * 6) * .3
    return np.tanh(x * 2.5) * .45
sfx_bus = np.zeros((N, 2), np.float32)
def addfx(sig, t0, pan):
    i = int(t0 * SR); sig = sig[:N - i]
    sfx_bus[i:i + len(sig), 0] += sig * np.sqrt(.5 * (1 - pan)); sfx_bus[i:i + len(sig), 1] += sig * np.sqrt(.5 * (1 + pan))
for s in scenes:
    k = s.get('sfx'); t0 = s['start']; n = int((s['end'] - t0) * SR)
    if not k: continue
    if k == 'storm':
        y = fx('rain', n) + fx('wind', n)
        for j in range(max(1, int((s['end'] - t0) / 8))): addfx(thunder(), t0 + 1.5 + j * 8 + rng.uniform(0, 2), rng.uniform(-.5, .5))
    else: y = fx(k, n)
    e = np.ones(n, np.float32); r = int(.8 * SR); e[:r] = np.linspace(0, 1, r); e[-r:] = np.linspace(1, 0, r)
    addfx(y * e * 1.4, t0, rng.uniform(-.25, .25))

# ---- concert hall reverb (synthetic stereo impulse response) ----
irn = int(3.2 * SR); t = np.arange(irn) / SR
ir = np.stack([lp(rng.standard_normal(irn), 5000) * np.exp(-t * 2.1), lp(rng.standard_normal(irn), 5000) * np.exp(-t * 2.1)], 1)
ir[:int(.02 * SR)] *= np.linspace(0, 1, int(.02 * SR))[:, None]
ir /= np.sqrt((ir ** 2).sum(0))
wet = np.stack([oaconvolve(dry[:, 0], ir[:, 0])[:N], oaconvolve(dry[:, 1], ir[:, 1])[:N]], 1)
music = .55 * dry + .45 * wet * 1.2
music = hp(music.T, 35).T
out = music + sfx_bus * 1.0 + .2 * np.stack([oaconvolve(sfx_bus[:, 0], ir[:, 0])[:N], oaconvolve(sfx_bus[:, 1], ir[:, 1])[:N]], 1)
# gentle glue compression + limiter
peak = np.max(np.abs(out)) + 1e-9; out = out / peak
env = np.abs(out).max(1); env = lp(env, 3.0); gain = 1 / np.maximum(1, (env / .35) ** .5)
out = out * gain[:, None]; out = np.tanh(out / np.max(np.abs(out)) * 1.1) * .88
fi, fo = int(1.5 * SR), int(6 * SR); out[:fi] *= np.linspace(0, 1, fi)[:, None]; out[-fo:] *= np.linspace(1, 0, fo)[:, None]
wavfile.write('score.wav', SR, (out * 32767).astype(np.int16))
print('score seconds', len(out) / SR)
