cd "$(dirname "$0")"; python3 build.py
for k in 0 1 2 3; do python3 meter.py $k 4 m_$k.json > m_$k.log 2>&1 & done; wait
python3 - <<'PY'
import json
r={}
for k in range(4): r.update(json.load(open(f'm_{k}.json')))
json.dump(r,open('meter.json','w'))
print(len(r),'shots metered')
PY
