cd "$(dirname "$0")"; python3 build.py
for k in 0 1 2 3; do python3 probe.py $k 4 pr_$k.json > pr_$k.log 2>&1 & done; wait
python3 - <<'PY'
import json,math
r={}
for k in range(4): r.update(json.load(open(f'pr_{k}.json')))
json.dump(r,open('probe.json','w')); print(len(r),'shots probed')
PY
