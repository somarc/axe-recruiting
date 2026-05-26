# DESIGN.md — Target Design Specification

## Dimensions
- Register: brand
- Tone: serious
- Density: balanced
- Expressive axis: committed
- Distinctiveness: distinctive

## Palette
Name: stark-white
Hue bias: none
Energy: pure

## Typography
Scale: fluid (clamp-based), min 1.25 ratio
Line length: 65–75ch for prose
Leading: 1.5× for body, 1.1× for display

## Color (Custom Properties)
:root {
  --color-brand-primary: /* fill from palette stark-white */;
  --color-brand-secondary: /* fill from palette */;
  --color-surface: #ffffff;
  --color-text: oklch(15% 0 0);
  --space-unit: 1rem;
  --type-scale-base: 1rem;
}

## Laws (impeccable)
- No gradient text
- No glassmorphism
- No layout transitions
- No bounce easing
- No pure #000 background
- No generic CTAs

## Generated
2026-05-26T13:58:14.016Z
