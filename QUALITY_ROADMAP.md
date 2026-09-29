# QUALITY ROADMAP: fix cut-off text + higher quality (all videos)

**Problem confirmed:** text near the top (year, titles, chapter/label text, headlines) is sometimes clipped. Cause: 58 px black letterbox bars cover the top and bottom of the 1280x720 canvas, and much text sits inside that zone. Also the video is only 720p at low bitrate.

## Stage Q1: Safe area (fix clipping) - AI film
- [x] Shrink bars (top 36 px, tags inside the bar; text safe) instead of 58 px bars from the frame; keep subtitles on a soft gradient at the bottom
- [ ] Define SAFE area (60 px side, 70 px top, 110 px bottom) and audit every aiText/headline against it
- [ ] Automated check: render one frame per beat and detect text pixels touching the top/bottom edge
## Stage Q2: Resolution (1080p)
- [x] Canvas backing store 1920x1080 (scale 1.5) with sharper text, offscreens included
- [ ] Verify transitions (zoom/iris/morph/glitch) still work at 1080p
## Stage Q3: Encode quality
- [x] CRF 17 slow, ~4 Mbps video, 192k audio; split parts under 30 MB for delivery, keep master
## Stage Q4: Re-render AI film, audit, deliver
## Stage Q5: SKIPPED (Christian film already uploaded by the user)
## Stage Q6: SKIPPED
## Stage Q7: Tick, commit, push (repo file-size limit: master over 100 MB is not committed; keep sources only)

## Standing rule (user request): subtitles always use numerals
GPT-1, GPT-4, ChatGPT, AI, R1, 2017, 175 billion, July 20, 539 BC. Implemented in `ai-film-source/norm_caps.py` (spoken text -> display text, audio unchanged; beat keys still match the raw spoken text).
