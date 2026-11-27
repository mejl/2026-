# Where He Walks — 2D anime version: progress log

All drawing is done in code (Canvas 2D in headless Chromium): no 3D, no image generation.

## Toolkit (built so far)
- `lib2d.js`: smooth shapes (Catmull-Rom), tapered hand-inked lines, cel shadows clipped inside shapes, glows, sparkles.
- `char2d.js`: character model rig. A landmark head that turns consistently (front, 3/4 left/right); anime eyes (thick lash line, tall iris, two highlights, blink), brows, 3/4 nose, mouth with smile/open, short beard and moustache, centre-parted long hair in clumps with pointed tips and an angel-ring shine; cel shadow on the side away from the key light.
- `body2d.js`: Jesus' tunic (V neck) and white prayer shawl with blue stripes, cel-shaded, with folds.
- `bgneon.js`: painted out-of-focus rainy neon street (bokeh, blurred sign, rain), foreground rain, colour grade.

## Stills
- `kf1.png`: first attempt, poor (head too small, eyes misaligned, blob moustache).
- `sheet1.png` / `sheet2.png`: model sheet (turnaround) v1/v2.
- `kf2b.png`: key frame v2, Jesus close-up in the rainy neon street.

## Session log
- 27 Nov, 12:20-12:45 CET: hair v3 (`hairClump` / `drawHairV3`): broad clumps from the centre part, each with a cel shadow half, soft root shade, tapered ink edges (thicker on the shadow side), a cool neon rim on the far side, hair falling over the near shoulder, loose strands and a single angel-ring shine. Removed the sawtooth highlights and the lump at the temple. Still: `kf3c.png`.

- 27 Nov, 13:20-13:50 CET: face pass: beard now grows from the sideburns along the jaw (trimmed, with strand texture and a lit band) instead of a chin strap; moustache is a shaped mass joining the beard at the mouth corners; kinder arched brows that thin outward; blush toned down for a grown man; subtle key-light highlights on forehead, cheekbone and nose bridge. Still: `kf4.png`.

- 27 Nov, 14:20-14:50 CET: lighting pass. New `light2d.js`: the character is drawn on its own layer and lit to sit in the night scene (night-colour ambient multiply, cool shade gradient on the side away from the light, warm key-light pool on the face, rim lights cut from the figure's own silhouette: cool neon on the far edge, warm on the near edge). Shawl got form shadows along the outer edges, inner-edge thickness at the neck opening and soft fold shadows falling from the shoulders. Still: `kf5.png`.

- 27 Nov, 15:20-15:45 CET: hairline + depth: the front curtains now sweep lower across the forehead (narrow centre-part V that frames the face), clumps further back are darker for depth, two stray strands across the forehead, forehead shadow follows the new curtain edge. Shoulders: rounded shoulder caps with arms going down, an arm crease and arm-side shading under the shawl. Still: `kf6.png`.

- 27 Nov, 16:20-16:50 CET: second character, the wanderer (sad young person), on the same rig: new rig options (younger shorter jaw `chinK`, bigger eyes `eyeK/eyeH`, iris colours, slimmer neck, sad brows + mouth, tear), short messy hair (`drawHairShort`: bangs to the brows with pointed tips, side clumps, crown shine, loose strands; back of the hair drawn behind the face), navy hoodie with the hood down rolled around the neck, drawstrings, seam and pocket (`hoodieBody`, slighter build). Model sheet: `sheet_wan3.png`.

- 27 Nov, 17:20-17:50 CET: first two-character key frame (`kf3.html` -> `kf7b.png`): new in-focus street background in one-point perspective (`bgstreet.js`: cel-shaded building faces with window grids, far warehouse with the neon sign, wet road with neon reflections, pavements, lamps, haze); Jesus as a full figure (`fullbody.js`: long robe, sash, shawl to the knees with blue stripes and tassels, one hand reaching out, sandals) lit warm with a soft light pool and reflection; the young person in the foreground framed from the chest up, cool light with a warm rim from His side, a tear.

- 27 Nov, 18:20-18:50 CET: Jesus full figure v2 (`fullbody.js`): sloped shoulders, shawl draped over the upper arms with rounder caps, bell sleeves, a reaching arm whose sleeve connects at the shawl edge and ends in an open hand (palm, four fingers, thumb), a relaxed far arm with its hand in the sleeve opening, A-line robe with a walking step (the front leg lifts the hem, a lit knee ridge, long folds), a hanging sash end, front foot forward. Turnaround test `fig2.png`; key frame re-rendered `kf7c.png`.

## Honest quality assessment (kf2b)
Reads as an anime-style illustration (webcomic / light TV-anime level). Not yet studio quality:
- hair is flat (needs more clumps, overlapping layers, light/shadow shapes, strands over the shoulder);
- face needs refinement (forehead/hairline, jaw shape, more expressive eyes, line weight variation on the silhouette);
- lighting is basic (needs a proper key/rim light pass, colour-tinted shadows, highlight shapes on hair and cloth);
- clothes are simple (folds, shawl drape, tassels).

## Next
1. kf7c weak points: the hand is still small and simple, shawl shoulders a bit square, tassels thin; the young person's head should bow more and their hood/shoulders need wet-cloth highlights; buildings are repetitive (vary heights, signs, balconies, AC units, cables).
2. Fix the far-side hair bulk of the short style in 3/4 views.
2. Model sheets for the wanderer (sad young person in a hoodie), villagers (men and women), the widow.
3. Backgrounds: street (wide), village, Sea of Galilee at night, hillside, tomb at dawn, cross on the hill, city at dawn.
4. Animation layer: limited animation (poses held on 2s/3s), blinks, mouth, hair sway, walk cycle, camera pans/zooms, FX (rain, light, sparkles, speed lines).
5. Shot-by-shot assembly to the song (51 shots, timings from ../mv6/data.json), render to video.
