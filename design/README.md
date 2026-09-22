# Handoff: Personal landing — Daniel Valle Millares

## Overview
One-page bilingual (EN default / ES) personal site. Two audiences on the same page: tech-bio
recruiters and labs/companies who might hire services. Ships as a static site on GitHub Pages at
`https://daniel-vm.github.io`.

## About the files in this bundle
`Landing Daniel Valle Millares.dc.html` is a **design reference written in HTML** — a prototype of the
intended look, copy and behaviour. It is NOT production code. It runs on a bespoke component runtime
(`support.js`, `<x-dc>`, `<sc-for>`, `{{ holes }}`) that must NOT be carried into the repo. Open it in a
browser to see the target; read its source for exact values and for all the content.

`assets/` holds the real images and the one video — copy these straight into the site's `public/`.
`industry/styles.css` is the design system's token sheet — port its `:root` variables.

## Fidelity
**High fidelity.** Colours, type, spacing, copy (both languages) and interactions are final. The
prototype hard-codes no hex values: everything resolves through `var(--color-*)` / `var(--font-*)` from
`industry/styles.css`. Keep it that way.

## Recommended stack
**Astro + Tailwind CSS**, deployed to GitHub Pages via GitHub Actions.
- Content collections: one Markdown file per project card (`src/content/projects/*.md`) so Daniel adds
  projects without touching components. Same for `courses`, `talks`, `opensource`, `roadmap`.
- Astro i18n: `/` (English, default, no prefix) and `/es/`. Persist the choice in `localStorage`
  (`dvm-lang`) and set `<html lang>`; add `hreflang` alternates.
- **View Transitions** (`<ClientRouter />`) for the language switch.
- Project filtering: a small vanilla `<script>` on that section — no framework island.
- Scroll reveals: CSS `animation-timeline: view()` with an IntersectionObserver fallback under
  `@supports not (animation-timeline: view())`.
- `prefers-reduced-motion: reduce` disables every animation and transition.
- `astro.config.mjs`: `site: 'https://daniel-vm.github.io'`, `base: '/'` (user site — NOT `/repo/`).

## Page order (single page, sticky nav)
Header · Hero · **01 Projects** · **02 Services** (dark band) · **03 My path** · **04 Open source** ·
**05 Community** · **06 Stack** · Footer.
Services sits second on purpose: a client sees "you can hire me" within a screen and a half of scroll,
while a recruiter has already passed the project grid.

### Header
Sticky, `rgba(242,242,243,.86)` + `backdrop-filter: blur(10px)`, 1px bottom rule. A 2px accent
**scroll-progress bar** pinned to that bottom edge. Left: brand `■ DANIEL VALLE MILLARES PhD`
(9px accent square, name, mono "PhD"). Centre: 6 anchors, uppercase `--font-heading` 15px, `.03em`,
hover → accent + bottom border. Active section tracked by IntersectionObserver
(`rootMargin: -45% 0px -45% 0px`) → `aria-current="page"`. Right: EN/ES segmented control (`.seg`).

### Hero
Two columns, `repeat(auto-fit, minmax(min(100%,330px),1fr))`, gap 44, `align-items:end`.
- Kicker: mono 11px, `.18em`, uppercase, accent — "Bioinformatics Engineer · Madrid".
- H1 `clamp(40px,5.4vw,70px)`, line-height .98, `-.02em`; line 1 ink, line 2 accent:
  EN "Genomics at scale / needs a system behind it."
- Paragraph max 52ch, 16.5px/1.6: "I build that system: pipelines, infrastructure and data models that
  take a lab from a handful of samples to thousands without breaking — in surveillance, clinics and
  research."
- Three buttons, `align-items:stretch`, each `white-space:nowrap; height:auto`: primary (accent fill +
  blueprint marks) → **LinkedIn, new tab**; secondary → `#servicios`; secondary → `#trayectoria`.
- **KPI plate**: one blueprint frame, `repeat(3,minmax(0,1fr))` = 3×2 cells, right hairline on every
  cell, top hairline on the second row. 6+ years in genomics · 10+ tools & platforms built ·
  4 national projects · 5 courses delivered · 8+ services for companies · 3 own projects deployed.
- Right column, max-width 300px, `margin-left:auto`: 1:1 `.duotone` portrait (`assets/profile.png`,
  `object-position: 50% 22%`) + a mono note with a 1px accent left border: "Now: leading the CIBERINFEC
  bioinformatics platform and building Omilinx. Open to projects and collaborations."

### 01 Projects
Heading block, filter `.seg` (8 options — All · AI · Platforms · Pipelines · Data & APIs · Open source ·
Research · Own & client — each with a superscript count), then
`repeat(auto-fill, minmax(var(--cardMin,316px),1fr))`, gap 20.
Card = `.card.blueprint`, transparent, 20px padding, 11px gap, `align-items:stretch` on the grid:
144px media box (four variants — see Media) → org kicker + years row → 20px title → 13.5px body →
optional mono **impact line** (accent `→` prefix, `margin-top:auto`) → tag row → optional accent link
with `↗`. Cards fade in on filter change (`@keyframes fd`, .45s). Hover: border → accent,
`box-shadow: var(--shadow-sm)`.

12 cards: BiPlat · HPC-CIBER · PathoCore/Pathoweb-core · backend-pathocore-apis ·
Nextflow bacterial assembly pipeline · PhD thesis (miRNA-seq HIV/HCV) · CORALIS · Omilinx ·
Retina & glycocalyx scRNA-seq · Bioinformatics e-learning platform · Local AI for the lab ·
AI agents in the cloud.

### 02 Services — dark band
Full-bleed `var(--color-accent-900)`, paper text, breaking out of the page container. Three bordered
cards (`rgba(242,242,243,.28)`, blueprint marks tinted `rgba(242,242,243,.65)`, tag row pinned with
`margin-top:auto`): 01 ENGINE "Nextflow, installed" · 02 ANALYSIS "Validated pipelines" ·
03 ACCESS "Omilinx". CTA row: paper-filled Calendly button, outlined `omilinx.io ↗`, outlined
`LinkedIn ↗`.

### 03 My path
Horizontal 6-column timeline, `min-width:1210px` inside an `overflow-x:auto` wrapper that is
`tabindex="0" role="group"` with an accessible name. Each column `grid-template-rows: 1fr 30px 1fr`;
odd items row 1 (`align-self:end`), even items row 3 (`align-self:start`). The middle band draws a
continuous 1px `var(--color-neutral-300)` rule with an accent node; cards use `margin: 0 11px` so the
rule never breaks. The last two nodes (E-learning, Omilinx) are 13px with a double halo.
2018–19 Barcelona (UAB MSc) · 2019–23 Madrid (ISCIII, PhD Cum Laude) · 2022 Geneva (SIB) ·
2023–now Madrid (CIBERINFEC BiPlat) · 2025–now E-learning · 2025–now Omilinx.

### 04 Open source
Intro column + `.table`, 4 rows: nf-core/bacass (maintainer) · relecov-tools · CORALIS ·
nf-core community (organiser, Madrid node). Link column 16%, `white-space:nowrap`.

### 05 Community
Four cards with 4:3 media, each showing kind · year, title, a mono venue line, then the blurb:
PathoCore talk (InCoB/ISCB-APAC 2026, Penang) · InCoB/ISCB-APAC 2026 · bu-hack-a-isciii nf-core
hackathon (CNM Majadahonda) · AIDS 2022 poster (Montreal).
Then a training block: intro + link to bioinformaticskillshub.com + a 5-row course `.table`
(R for clinical research · HPC basic/intermediate/advanced · Nextflow · Python packaging *in prep* ·
Retina & glycocalyx scRNA-seq with Scanpy *in prep*).

### 06 Stack + Footer
Stack: 6 groups in a 1px-gap grid that reads as a hairline table. Footer: top rule, copyright,
links GitHub · LinkedIn · nf-core.

## Media handling — four variants, pick per item
| Variant | Box | Use for |
| --- | --- | --- |
| `cover` | `object-fit:cover; object-position:top center` | UI screenshots, dashboards, the GIF |
| `contain` | `width:100%; height:100%; object-fit:contain` + 12px padding | logos, diagrams, posters-as-artwork |
| `duo` | same as cover, wrapped in `.duotone` | **real photographs only** |
| `video` | `object-fit:cover`, muted + loop + playsInline set **in JS**, autoplay | the service demo |
Note: `max-height:100%` on an `<img>` in a grid box does not constrain it — always size from the box
(`width:100%; height:100%`) or it overflows the card.

Asset → card:
`profile.png` duo · `biplat-logo.png` contain · `hpc-ciber.png` cover · `pathocore-web.gif` cover ·
`gen-backend-apis.png` contain · `bacass-metro-map.png` contain · `poster-aids2022.jpg` cover ·
`coralis.png` contain · `omilinx-dashboard.png` cover · `skillshub.jpg` duo ·
`gen-local-ai.png` contain · `agentic-lab.mp4` video · `talk-pathocore.jpg` duo ·
`talk-stage.jpg` duo · `hackathon-poster.jpeg` contain.
Unused but available: `bacass-logo.png`, `omilinx-mark.png`, `skillshub-logo.png`,
`pathocore-explorer.png`, `hackathon-flyers.jpeg`.
**Still missing:** a UMAP for the Retina & glycocalyx scRNA-seq card — it renders a visible
`[ SLOT ]` placeholder until one exists. Keep that placeholder pattern for future gaps.

## Privacy constraints (hard requirements)
- **No email address anywhere** — not in copy, not in a `mailto:`, not in metadata.
- **No downloadable CV.**
- All first contact runs through the LinkedIn button (hero primary CTA) or Calendly.

## Design tokens — take from `industry/styles.css`, never hard-code
`--color-bg` · `--color-surface` · `--color-text` · `--color-neutral-600/700/800/900` ·
`--color-accent` · `--color-accent-400/700/900` · `--color-neutral-100/200/300` ·
`--font-heading` (Barlow Condensed) · `--font-body` (Barlow) · `--shadow-sm`.
System mono is used for kickers, years, KPI labels, venues and impact lines.
Hairlines: `rgba(29,31,32,.16)` and `rgba(29,31,32,.12)`.
Background: two 1px `rgba(89,128,166,.07)` gradients at 64px, `position:fixed`, `pointer-events:none`.
Placeholder hatch: `repeating-linear-gradient(135deg, var(--color-neutral-200) 0 7px, var(--color-neutral-100) 7px 14px)`.
**Square corners everywhere.** Blueprint frame = 1px hairline + four `+` marks (`.blueprint` +
`<i class="corner tl|tr|bl|br">`). Cards and figures are transparent line drawings; the accent-filled
primary button is the single exception. Icons: Lucide, stroke-width 1.5.

## Content model
All copy lives in both languages inside the prototype's logic class — lift it from there:
`PROJECTS` (12), `OS` (4), `ROAD` (6), `TALKS` (4), `COURSES` (5), `STACK` (6 groups), `STATS` (6),
`T.en` / `T.es`, plus the `ORG_EN` / `TAG_EN` translation maps.
Project categories: `ai`, `plat`, `pipe`, `data`, `os`, `res`, `own` (a project may hold several).

## Accessibility
- Paragraph-size accent text uses `--color-accent-700`, never `--color-accent`.
- `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }` on everything
  interactive.
- The timeline scroll container keeps `tabindex="0"` + accessible name.
- Every decorative image gets `alt=""`; the portrait gets a real alt.

## Deploying
GitHub Pages **user site** — repo must be named `Daniel-VM.github.io`, served at the domain root.
This does not conflict with any other Pages site: each repo publishes independently.
