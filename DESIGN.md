---
version: alpha
name: Solvera Markets
description: Warm outcome-market interface with dense agent/operator HUD surfaces.
colors:
  primary: "#f96c2f"
  on-primary: "#ffffff"
  background: "#fbfaf9"
  foreground: "#191d24"
  card: "#ffffff"
  secondary: "#f2f5f8"
  muted: "#f2f4f6"
  muted-foreground: "#5e6a7d"
  accent: "#fef1eb"
  border: "#dbdfe6"
  hud-ink: "#111318"
  hud-cyan: "#09cad7"
  hud-lime: "#18bf5d"
  hud-amber: "#f6aa28"
  hud-red: "#ef352e"
typography:
  display:
    fontFamily: Geist Sans
    fontSize: 5.25rem
    fontWeight: 760
    lineHeight: 1.04
    letterSpacing: -0.035em
  h2:
    fontFamily: Geist Sans
    fontSize: 1.875rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body:
    fontFamily: Geist Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0em
  body-large:
    fontFamily: Geist Sans
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist Sans
    fontSize: 0.72rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.22em
  mono:
    fontFamily: Geist Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0em
  pixel:
    fontFamily: Geist Pixel
    fontSize: 0.625rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.12em
rounded:
  sm: 0.375rem
  md: 0.625rem
  lg: 0.75rem
  xl: 1.1rem
  panel: 1.25rem
  pill: 999px
spacing:
  xs: 0.5rem
  sm: 0.809rem
  md: 1.309rem
  lg: 2.118rem
  xl: 3.427rem
  shell-min: 1.25rem
  shell-wide: 5rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 1rem
    height: 2.5rem
  button-large:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 2rem
    height: 2.75rem
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 1rem
    height: 2.5rem
  surface-soft:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: 2rem
  hero-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
    padding: 3rem
  hud-chip:
    backgroundColor: "{colors.hud-ink}"
    textColor: "{colors.hud-cyan}"
    typography: "{typography.pixel}"
    rounded: "{rounded.md}"
    padding: 0.5rem
  marketplace-frame:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 1rem
---

## Overview

Solvera Markets uses a warm, high-contrast fintech interface for an outcome market where agents and operators inspect verifiable intent data. The design combines a calm marketing surface with denser machine-operational panels. The visual model is not a generic crypto dashboard: it is a product UI for bids, outcomes, status, and settlement.

The current site has two visible layers:

1. A soft editorial landing layer: warm off-white background, orange CTA, large Geist display type, glass-like panels, and sparse copy.
2. A dense operational layer: marketplace tables, status rails, pixel HUD chips, cyan/lime/amber/red signal colors, compact monospaced values, and scanline/corner-frame details.

Use the soft layer for explanation, onboarding, and waitlist moments. Use the HUD layer only when showing live network, API, chain, state, or intent-market data.

## Colors

The palette is rooted in warm neutral surfaces and one dominant action color.

- **Primary (#f96c2f):** Solvera orange. Use for primary calls to action, focus rings, active underlines, and warm highlights.
- **Background (#fbfaf9):** Warm near-white base. It should feel lighter than a dashboard shell and softer than pure white.
- **Foreground (#191d24):** Deep ink text. Use for headlines, table values, and primary labels.
- **Muted foreground (#5e6a7d):** Secondary labels, helper text, metadata, and low-emphasis copy.
- **Accent (#fef1eb):** Pale orange surface for subtle hover states and low-intensity emphasis.
- **Border (#dbdfe6):** Fine neutral borders; avoid heavy black outlines outside dense marketplace frames.
- **HUD colors:** cyan for live telemetry, lime for healthy/open states, amber for pending/sync, red for failed/offline states.

Do not let the whole interface become orange. Orange is the action and warmth layer; dense system state uses HUD colors, and most structure remains neutral.

## Typography

Geist Sans is the primary interface and display font. Geist Mono is reserved for addresses, IDs, token amounts, and technical values. Geist Pixel appears only in compact HUD/status chips.

Headlines use heavy Geist Sans with tight tracking and a small animated weight shift on the current homepage. Body copy is more open: 1rem base size, 1.7 line height, and restrained paragraph width. Marketplace text is intentionally denser, with smaller labels and tighter line height to support scanning.

Caps labels use generous letter spacing and uppercase text. Keep them short. If a label carries real content, use normal sentence case instead.

## Layout

The page shell is centered with a wide maximum width around 1280px and responsive gutters. Core marketing sections use a 12-column grid with a 7/5 split, echoing the golden-ratio layout already present in `grid-phi`.

Spacing follows a phi-derived scale:

- `xs` 0.5rem
- `sm` 0.809rem
- `md` 1.309rem
- `lg` 2.118rem
- `xl` 3.427rem

Use roomy spacing for landing sections and tighter spacing for marketplace screens. Tables and filters should optimize for repeated scanning, not for hero-like drama.

## Elevation & Depth

Depth is soft and shallow. `surface-soft` panels use translucent white, warm radial highlights, fine borders, inset top highlights, and low-spread shadows. The effect should read as premium matte glass, not glossy neumorphism.

Hero and waitlist panels may use warm radial glows. Marketplace surfaces should be flatter and denser, with pixel-frame brackets or thin dark outlines when operational focus matters. Avoid large decorative blobs that do not carry layout or state meaning.

Motion is subtle:

- reveal sections from a 10px vertical offset;
- buttons lift by 2px on hover;
- hero display type breathes through weight/tracking;
- HUD chips may glitch briefly on hover;
- all decorative motion must respect `prefers-reduced-motion`.

## Shapes

Rounded corners are present but controlled. Standard buttons use `0.375rem`, HUD chips use `0.625rem`, cards use `0.75rem` to `1.1rem`, and hero panels may reach `1.25rem` or higher through responsive clamps.

Pills are reserved for chips and status metadata. Do not use pill shapes for major layout containers, forms, or tables.

Pixel frames are a separate shape language. Use them for live status, marketplace filters, tables, or monitoring rails; do not apply them to general marketing cards.

## Components

**Buttons:** Primary buttons are orange with white text and a soft orange shadow. Outline buttons sit on the background with neutral borders. Link buttons use orange text and underline only on hover. Hover may lift the button and reveal a radial warm overlay.

**Hero shell:** A large rounded panel with warm radial gradients, subtle blue-grey counterbalance, and a 7/5 content split. It should introduce the product and show one concrete signal panel, not a decorative illustration.

**Signal panel:** The homepage signal stack is a soft operational preview. It uses small rows, structured labels, and progress bars to imply intent specification, bidding, and settlement.

**Waitlist form:** A two-column soft surface with uppercase field labels, a white input, and a stronger orange gradient submit button. The submit button is the highest-emphasis element in the block.

**Marketplace HUD rail:** Compact pixel-framed rail with count chips and an update timestamp. It should be scannable before the table.

**Pixel status chips:** Use Geist Pixel, uppercase values, dark ink background, colored text, scanline overlay, and tone-based borders. Use for `CHAIN`, `NET`, `API`, intent states, counts, and timestamps.

**Tables:** Dense, neutral, and operational. Use small uppercase headers, monospaced IDs/addresses, compact row height, hover affordance, and minimal ornament.

## Do's and Don'ts

Do:

- Keep marketing pages warm, sparse, and high-signal.
- Keep marketplace pages dense, structured, and status-forward.
- Use orange for primary action and brand warmth.
- Use HUD colors only for system state and intent state.
- Preserve the difference between explanatory copy and live operational data.
- Use monospaced type for addresses, IDs, and technical values.
- Keep all design claims grounded in current implementation unless changing the UI at the same time.

Don't:

- Turn every card, border, and chip orange.
- Use pixel/HUD effects on generic marketing copy.
- Add decorative gradients that compete with data or CTAs.
- Treat Solvera as a generic Web3 landing page with oversized abstract art.
- Use heavy shadows, glossy glass, or nested card stacks.
- Expand this file with aspirational components that are not represented in the current site.
