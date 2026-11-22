cd "$(dirname "$0")"
for ex in 1.0 .85 .8; do bash meterall.sh >/dev/null 2>&1; EXPO=$ex python3 mkexp.py > exp_iter_$ex.txt; done
bash meterall.sh >/dev/null 2>&1; cp meter.json meter_final.json
echo EXPDONE
