cd "$(dirname "$0")"
for ex in .8 .8; do bash meterall.sh >/dev/null 2>&1; EXPO=$ex python3 mkexp.py > exp_iter2_$ex.txt; done
bash meterall.sh >/dev/null 2>&1; cp meter.json meter_final2.json; echo EXP2DONE
