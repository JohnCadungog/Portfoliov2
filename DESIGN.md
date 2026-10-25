# Design system — Swatch fan deck

The portfolio is a printer's swatch book. Each career is one ink; choosing a career fans its card forward and floods the hero with that ink.

## Color
| Token | Value | Use |
|---|---|---|
| `--ink` (engineer) | `#2B3BE5` | Ultramarine field, white text |
| `--ink` (design) | `#D4006E` | Process magenta field, white text |
| `--ink` (automation) | `#C6E400` | Chartreuse field, `#11140A` text |
| `--paper` | `#F2F3F0` | Cool white stock for reading sections |
| `--paper-2` | `#E7E8E4` | Image wells, scrollbar track |
| `--strip` | `#FBFBF9` | Label strips on swatch chips and cards |
| `--text` / `--text-2` | `#15161A` / `#4C4F57` | Body and secondary text |
| `--line` | `rgb(21 22 26 / .12)` | Rules |

Strategy: drenched. Hero and contact are the full ink; work and experience sit on paper with ink in chips, markers, selection and scrollbar.

## Type
- Display: Bricolage Grotesque Variable, weight 700, `font-stretch: 88%` (80% on card words), tracking -0.035em, line-height 0.95. Max 6rem.
- Text: Geist Sans, 16px / 1.55.
- Code: Geist Mono 12px, only for ink codes, numbers, dates and labels.

## Components
- **Swatch chip**: color/image field over a `--strip` label (name, kind, "No. 0X"). Radius 6px, soft two-layer shadow. Missing images show a hatched ink placeholder with initials and "Screenshot coming".
- **Deck card**: tall 1:1.55 swatch with ink field, career word, label strip and a rivet at the pivot (transform-origin 50% 93%). Fan angles 0°, -12°, -24°.
- **Proof plate** (deck card image): the lead project image is never shown raw under the career word. It is printed as a one-ink proof in a window on the ink field: grayscale multiplied onto a pale tint (`ink 42%` + white), with shadows lifted to deep ink (`ink 78%` + black, `lighten`). A mono caption names the project; the career word sits below on solid ink. Hovering or focusing the front card develops the proof to full color over 0.6s. Any new image therefore lands in the card's palette automatically. Careers with no image show their project list instead.
- **Segmented switch**: pill rides between options on a spring (`layoutId`). Ink tone in hero, dark floating dock after scroll.
- **Sheet**: bottom sheet on mobile, centered panel on desktop; drag down to dismiss; cover morphs from the chip.
- **Buttons**: 48px pill; solid (on-ink fill) and ghost (outline).

## Motion
- Springs everywhere: deck `stiffness 210 / damping 22`, pill `420 / 34`, default `300 / 32`.
- Signature: ink flood, a circular clip-path growing from the touch point over 0.85s, interruptible.
- Headline words rise from blur with a 45ms stagger; grid chips re-deal with popLayout and a 50ms stagger.
- Reduced motion: no flood, no transforms (MotionConfig `reducedMotion="user"`), CSS transitions near zero.

## Spacing
Gutter `clamp(1rem, 4vw, 3.5rem)`, max width 1440px, section padding `clamp(4.5rem, 10vw, 8rem)`.

## Dark mode
Follows the device setting, with a sun/moon toggle in the hero bar (choice saved in `localStorage`, applied before first paint). Inks stay at full strength; only the stock changes.

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#F2F3F0` | `#0E0F12` |
| `--paper-2` | `#E7E8E4` | `#1A1B20` |
| `--strip` | `#FBFBF9` | `#17181C` |
| `--text` / `--text-2` | `#15161A` / `#4C4F57` | `#ECEDEF` / `#A4A7AF` |
| `--line` | `rgb(21 22 26 / .12)` | `rgb(255 255 255 / .12)` |

The theme change is a View Transition that grows as a circle from the toggle; reduced motion swaps instantly.

## Hero details
- **Tint bar**: six chips stepping the active ink from 100% to 10% toward `--on-ink`, with mono step labels and the ink code beside a slowly turning registration mark. Chips re-deal with a 45ms spring stagger on every career switch.
- **Crop marks**: 1px L-marks at the hero's top corners and bottom-left, `--on-ink` at 45%.
- **Dark stock** is mixed from the active ink: `color-mix(in oklab, var(--ink) 13%, #15161D)` for paper (navy, plum, olive), with strips, lines and secondary text tinted the same way.
