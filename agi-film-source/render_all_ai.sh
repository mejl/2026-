cd /tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/agifilm
rm -f part*.mp4; N=$(nproc)
for k in $(seq 0 $((N-1))); do python3 render_ai.py $k $N & done; wait
echo "RENDER DONE: $(ls part*.mp4 | wc -l) parts"
