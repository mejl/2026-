"""Synthesize an epic orchestral-style score: string pads, choir, taiko, braams, risers."""
import json, numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile

SR = 44100
sch = json.load(open('schedule.json'))
TOTAL = sch['total']
N = int(TOTAL * SR) + SR
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)

def lp(x, f, order=2):
    return sosfilt(butter(order, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, order=2):
    return sosfilt(butter(order, f, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def add(sig, t0, pan=0.0, gain=1.0):
    i = int(t0 * SR)
    if i >= N: return
    sig = sig[:N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt(0.5 * (1 - pan))
    R[i:i + len(sig)] += sig * np.sqrt(0.5 * (1 + pan))
def env(n, a, r):
    e = np.ones(n); a = int(a * SR); r = int(r * SR)
    if a: e[:a] = np.linspace(0, 1, a)
    if r: e[-r:] *= np.linspace(1, 0, r)
    return e
def saw(f, n, detune=0.0):
    t = np.arange(n) / SR
    ph = (f * (1 + detune)) * t + rng.random()
    return 2 * (ph % 1) - 1

# scene mood: (intensity 0..1, chord set)
DARK = {'exile','martyrs','middle','cross','flood'}
EPIC = {'eden','flood','exodus','king','cross','church','reform','return','martyrs'}
PROG_MINOR = [[50, 57, 62, 65], [46, 53, 58, 62], [53, 57, 60, 65], [48, 55, 60, 64]]   # Dm Bb F C
PROG_DARK = [[50, 57, 62, 65], [49, 56, 61, 64], [46, 53, 58, 62], [45, 52, 57, 61]]    # Dm C#dim-ish Bb A
PROG_HOPE = [[53, 60, 65, 69], [48, 55, 60, 64], [50, 57, 62, 65], [46, 53, 58, 65]]    # F C Dm Bb

def pad(chord, dur, gain):
    n = int(dur * SR); out = np.zeros(n)
    for m in chord:
        for dt in (-0.004, 0.0, 0.005):
            out += saw(midi(m), n, dt)
        out += 0.5 * saw(midi(m - 12), n, 0.002)
    out = lp(out, 1400) * env(n, min(1.2, dur / 3), min(1.2, dur / 3))
    t = np.arange(n) / SR
    out *= 0.85 + 0.15 * np.sin(2 * np.pi * 0.25 * t)
    return out / (len(chord) * 3.5) * gain
def choir(chord, dur, gain):
    n = int(dur * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for m in chord[1:]:
        f = midi(m + 12)
        vib = 1 + 0.004 * np.sin(2 * np.pi * 5.2 * t + rng.random() * 6)
        ph = np.cumsum(f * vib) / SR
        v = np.sin(2 * np.pi * ph) + 0.3 * np.sin(4 * np.pi * ph) + 0.15 * np.sin(6 * np.pi * ph)
        out += v
    out = bp(out, 300, 3000) * env(n, min(2.0, dur / 3), min(1.5, dur / 3))
    return out / len(chord) * gain
def taiko(gain=1.0):
    n = int(0.9 * SR); t = np.arange(n) / SR
    f = 55 + 90 * np.exp(-t * 18)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5)
    slap = lp(rng.standard_normal(n), 1800) * np.exp(-t * 40) * 0.6
    return np.tanh((body + slap) * 1.6) * gain
def braam(root, gain=1.0):
    n = int(5.5 * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for m in (root - 24, root - 12, root - 5, root):
        for dt in (-0.006, 0.0, 0.007):
            out += saw(midi(m), n, dt)
    cutoff_env = 200 + 1600 * np.exp(-t * 1.2)
    out = lp(out, 900) * (np.minimum(1, t / 0.05)) * np.exp(-t * 0.55)
    out = np.tanh(out * 0.35)
    return out * gain
def riser(dur, gain=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    out = np.zeros(n); seg = int(0.05 * SR)
    for k in range(0, n, seg):
        f = 300 + 7000 * (k / n) ** 2
        chunk = noise[k:k + seg]
        out[k:k + len(chunk)] = bp(chunk, f * 0.8, min(f * 1.25, SR / 2 - 100))
    return out * (t / dur) ** 2 * gain
def impact(gain=1.0):
    n = int(3.0 * SR); t = np.arange(n) / SR
    sub = np.sin(2 * np.pi * np.cumsum(40 + 60 * np.exp(-t * 8)) / SR) * np.exp(-t * 1.5)
    crash = hp(rng.standard_normal(n), 3000) * np.exp(-t * 2.2) * 0.25
    return np.tanh((sub + crash) * 1.5) * gain

scenes = sch['scenes']
for s in scenes:
    sid = s['id']; t0 = s['start']; t1 = s['end']; dur = t1 - t0
    if sid == 'presents':
        add(choir([50, 57, 62, 65], dur + 1, 0.35), t0)
        add(riser(2.2, 0.35), t1 - 2.2)
        continue
    prog = PROG_DARK if sid in DARK else (PROG_HOPE if sid in ('abraham','jesus','missions','today','outro') else PROG_MINOR)
    intense = sid in EPIC
    # chapter hit
    if s['ch'] or sid in ('intro', 'outro'):
        add(braam(prog[0][0], 0.55 if intense else 0.4), t0)
        add(impact(0.6), t0)
        add(taiko(0.9), t0, -0.2); add(taiko(0.7), t0 + 0.02, 0.2)
    # harmonic bed, 4 s per chord
    cl = 4.0; k = 0; tt = t0
    while tt < t1:
        d = min(cl + 0.6, t1 - tt + 0.6)
        ch = prog[k % 4]
        add(pad(ch, d, 0.55 if intense else 0.4), tt, -0.3)
        add(pad([m + 12 for m in ch], d, 0.18), tt, 0.3)
        add(choir(ch, d, 0.28 if intense else 0.18), tt, 0.1)
        tt += cl; k += 1
    # taiko ostinato
    bpm = 96 if intense else 72
    beat = 60 / bpm
    tt = t0 + s['card']; i = 0
    while tt < t1 - 0.5:
        accent = (i % 8 in (0, 3, 6))
        if intense or i % 2 == 0:
            add(taiko(0.35 if accent else 0.14), tt, rng.uniform(-0.5, 0.5))
        tt += beat / 2; i += 1
    # riser into next chapter
    add(riser(2.5, 0.25 if intense else 0.15), t1 - 2.5)

# finale swell
fin = [s for s in scenes if s['id'] == 'outro'][0]
add(choir([53, 60, 65, 69], fin['end'] - fin['start'] + 1, 0.5), fin['start'])

mix = np.stack([L, R], 1)
# simple stereo reverb: a few decaying delays
out = mix.copy()
for dl, g in ((0.037, 0.35), (0.061, 0.28), (0.089, 0.22), (0.131, 0.16), (0.197, 0.11)):
    d = int(dl * SR)
    out[d:, 0] += mix[:-d, 1] * g
    out[d:, 1] += mix[:-d, 0] * g
out = np.tanh(out / (np.max(np.abs(out)) + 1e-9) * 1.4) * 0.85
# fade in/out
n = len(out); fi = int(1.5 * SR); fo = int(5 * SR)
out[:fi] *= np.linspace(0, 1, fi)[:, None]
out[-fo:] *= np.linspace(1, 0, fo)[:, None]
wavfile.write('score.wav', SR, (out * 32767).astype(np.int16))
print('score seconds', n / SR)
