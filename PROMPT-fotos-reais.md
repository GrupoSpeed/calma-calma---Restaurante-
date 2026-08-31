# Calma Calma — swap the drawn plate + fork for the real photographs

> Paste into Claude Code in the `calma-calma` folder. The two cut-outs are already in `assets/`.

---

The hero centrepiece and the PRANZO carousel are currently **generated SVG drawings** built by `main.js` (the `.pd-*` plate, the `.fk`/`.pa*` forkful, and the `.po__*` porchetta). The restaurant has now supplied real photographs. Replace the drawn plate and forkful with the photos. **Keep the animation exactly as it is** — the hero→carousel handoff, the pin/scrub timeline, the continuous rotation, the bob, the reduced-motion fallbacks. Only the artwork changes.

## The assets

Both are cut out with transparent backgrounds, from the restaurant's own photography. Use the `.webp` and keep the `.png` as a fallback in a `<picture>`.

| file | size | what it is |
|---|---|---|
| `assets/plate.webp` / `.png` | 1006 × 1006 | The empty plate, shot from directly overhead. **Perfect circle, centred in the square.** |
| `assets/fork.webp` / `.png` | 398 × 707 | The forkful of spaghetti, handle at the top, nest at the bottom. |

**Geometry you need:**

- **plate**: the disc is dead-centre and fills 77% of the square. Rotate it about `transform-origin: 50% 50%` with no correction — it will spin true. Do not crop it.
- **fork**: the pasta nest's centre sits at **x 49.6%, y 70.1%** of the image. When you compose the forkful over the plate, line *that* point up with the plate's centre, not the image's centre — otherwise the nest hangs low and the composition looks wrong.

## What to change

**1. Replace the plate.** Swap the generated plate `<svg>` for the plate image, in both places it appears (the hero centrepiece and the PRANZO carousel dial — remember they are the same element handed off between sections). Delete the now-dead `.pd-*` rules from `styles.css` and the plate-drawing code from `main.js`.

**2. Replace the forkful.** Same treatment for the `.fk` / `.pa*` artwork.

**3. The plate is white porcelain, and the page ground is cream — they will merge.** This is the one real problem the swap creates. Give the plate a soft shadow so it lifts off the page:
```css
filter: drop-shadow(0 18px 26px color-mix(in srgb, var(--ink) 24%, transparent));
```
Check it on both the hero and the cream PRANZO ground and tune until the plate reads as an object sitting on the page.

**4. The dial text must stay dark.** The carousel copy (PRANZO / APERITIVO / CENA / PARA LEVAR, the description, the 01/04 pager) now sits on white porcelain, so it must be `var(--ink)`. Verify contrast — anything that was light-on-coloured needs flipping. Never put peach text there; peach on white is about 1.6:1.

**5. Keep the sauce splatters.** The plate has two small sauce splatters on it. Leave them — they are what make the rotation readable. A plain white disc turning looks static; the splatters give the eye something to track. Just make sure the dial text does not land on top of them at any rotation, and nudge the text block if it does.

**6. Do not rotate the forkful.** The plate spins; the fork must not. If they currently share a transform, separate them.

## Leave alone

The porchetta slice in its own section stays as the generated SVG — there is no photograph for it.

## When done

Show me the hero at rest, the hero mid-handoff, and the PRANZO carousel — at 1440px and at 390px.
