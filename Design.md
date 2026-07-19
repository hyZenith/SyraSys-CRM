# LeadNest — CRM Dashboard Design Specification

A complete visual and structural spec for recreating this CRM dashboard UI.
Product name shown in UI: **LeadNest**

---

## 1. Brand & Typography

**Typeface:** Urbanist (Google Font)
- Use for ALL text in the UI — headings, body, labels, numbers.
- Font weights used: Regular (400), Medium (500), SemiBold (600), Bold (700).
- Large display headings (e.g. section titles like "New customers", "Activity") use a lighter/regular weight at larger size — clean, minimal, geometric sans feel.
- Numbers/stats (e.g. "76", "$12,076") are set large and bold for emphasis.

```css
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap');
font-family: 'Urbanist', sans-serif;
```

---

## 2. Color Palette

| Name | Hex | Usage |
|---|---|---|
| Primary Blue | `#5880DA` | Primary accent, chart fill (top layer), links, active states |
| Lime Green | `#C9F17E` | Positive-trend badges (+6%, +12%), "New lead" tag, chart fill (bottom layer), some heatmap cells |
| Light Blue | `#BCDBFA` | Secondary chart fill (middle layer), heatmap light cells, subtle backgrounds |
| Off-white / Cream | `#F7F9F5` | Card backgrounds, page background base |

### Extended / supporting colors (derived from screenshots)
| Name | Hex (approx) | Usage |
|---|---|---|
| App background | `#B8B7B2` / warm grey | Outer canvas behind the dashboard card |
| Card / panel white | `#F7F9F5` – `#FFFFFF` | Sidebar, top bar, chart cards, kanban cards |
| Ink / Near-black | `#1A1A1A` | Sidebar logo circle, "Add customer" button, "Priority" tag, headings, primary text |
| Muted grey text | `#8A8A87` | Secondary text, placeholder text ("Search customer"), descriptions |
| Border grey | `#E6E5E1` | Hairline dividers between kanban columns, card outlines |
| Tag – Returning (blue) | `#5880DA` on `#DCE6FB` bg | "Returning" status pill |
| Tag – Follow-up (yellow/amber) | `#F5C242` approx | "Follow-up" status pill |
| Tag – New lead (lime) | `#C9F17E` | "New lead" status pill, dark text on top |
| Tag – Priority (black) | `#1A1A1A` bg, white text | "Priority" status pill |
| Success badge green | `#C9F17E` bg, dark green/black text | "+6%", "+12%" trend chips |

**Overall palette mood:** soft, muted, pastel-tech. Cool blues + a single lime-green pop color against warm off-white cards, on a warm grey canvas. High contrast only used sparingly (pure black for primary CTA + priority tag).

---

## 3. Layout & Structure

### 3.1 Page shell
- Entire UI sits as a **rounded card** (large radius, ~24–32px) centered on a warm grey/taupe background (`#B8B7B2`), giving a "framed app" presentation feel — like a product mockup, not edge-to-edge.
- Inside that frame: a two-column app layout — **fixed left sidebar** + **fluid main content area**.

### 3.2 Left Sidebar (~260px wide)
Background: white/cream (`#F7F9F5`), full height, contains:
1. **Logo row (top):** circular dark badge with an abstract swirl/eye icon (white on black) + wordmark "LeadNest" in bold.
2. **Primary nav list** (icon + label each, generous vertical spacing ~16–20px between items):
   - Dashboard (grid icon)
   - Tasks (clipboard icon)
   - Activity (line/trend icon)
   - Customers (people icon) — appears as active/selected item
   - Settings (gear icon)
3. **"Members" section** below nav, with section label + list of team members:
   - Circular avatar photo + full name, stacked vertically
   - Members: Scarlett Floyd, Aysha Hayes, Lawrence Patterson, Mateo Petty
4. **Priority deal callout card** pinned near the bottom of sidebar:
   - Dark/near-black rounded card
   - Bold white heading "Priority deal"
   - Grey/white supporting text: "The lead is already in the pipeline. Assign a manager and continue."
   - White pill button labeled **"Assign"** with dark text

### 3.3 Top Bar (within main content)
Single row, all elements vertically centered:
- **Search input** (pill/rounded rectangle, left-aligned magnifying-glass icon, placeholder "Search customer"), light background, occupies largest width.
- **"Sort by"** control with a sort/filter-lines icon, plain text button (no fill).
- **"Filters"** control with a funnel icon, plain text button (no fill).
- **"Add customer"** button — solid black/near-black pill button, white "+" icon and white bold text — the single high-contrast CTA on the page.

### 3.4 Stats Row (below top bar) — 3 cards side by side (uneven widths)

**Card A — "New customers" (widest, ~40%)**
- Title top-left: "New customers"
- Stacked/layered area chart, no visible axis lines except a faint left y-axis (0, 10, 20) and bottom x-axis labels Mon–Sun.
- Two/three overlapping filled area series in Blue / Light-blue / Lime, semi-transparent, layered to show volume composition over the week, trending upward toward the weekend.
- A vertical marker line (dark) intersects the chart on "Thu" revealing a **dark tooltip/popover**:
  - Small colored dot + label + value per line: "Website – 6", "Ads – 13", "Referral – 4"
  - Tooltip background near-black, white text, rounded corners.

**Card B — "Activity" (middle, ~35%)**
- Title top-left: "Activity"
- **Heatmap grid**: rows = hours (2 PM, 3 PM, 4 PM, 5 PM, 6 PM, 7 PM), columns = days of month (1–13, labeled "June" on the axis).
- Each cell is a small rounded square colored in one of 3 palette tones (dark blue `#5880DA`, light blue `#BCDBFA`, lime `#C9F17E`) at varying opacity to represent activity intensity — random/varied distribution, no strict gradient.

**Card C — Two stacked stat tiles (narrowest, ~25%)**
- **Tile 1: "Tasks in progress"**
  - Small label top
  - Big bold number: **76**
  - Small green pill badge to the right: **+6%**
- **Tile 2: "Prepayments"**
  - Small label top
  - Big bold number: **$12,076**
  - Small green pill badge to the right: **+12%**
- Both tiles same card style as chart cards (rounded corners, cream/white fill), stacked vertically with a gap.

### 3.5 Kanban / Pipeline Board (bottom section) — 4 columns

Column headers: each is a title + a small dark rounded "count" badge circle beside it.
1. **Contacted** — 16
2. **Negotiation** — 18
3. **Offer sent** — 12
4. **Deal closed** — 12

Each column contains **deal cards** stacked vertically. Card anatomy (rounded rectangle, white/cream bg, subtle border, one card per column highlighted with a blue-tinted background to denote "selected/priority" — e.g. PulseWorks card):

- Top row: **status pill tag** (left) + **"⋯" more-options icon** (right)
  - Pill tag colors/labels used: `New lead` (lime bg, dark text), `Returning` (blue bg/blue-tinted, dark/blue text), `Priority` (black bg, white text), `Follow-up` (amber/yellow bg, dark text)
- **Company name** — bold, larger text (e.g. "Aster Labs", "BrightPath Legal", "PulseWorks", "Bloom Market")
- **Description line(s)** — small muted grey text, 1–2 lines, describing the client/industry and project scope (e.g. "Healthcare startup. CRM implementation and lead automation.")
- **Assignee row** — circular avatar photo + name (bold) + role/title (muted grey, smaller, below name) e.g. "Mateo Petty / Lead Manager"
- **Footer meta row** (bottom of card, icons + numbers, muted grey):
  - 📅 calendar icon + due date (e.g. "13 May")
  - 🔗 link icon + count (e.g. "2")
  - 💬 comment icon + count (e.g. "4")

Example card data (for reference/dummy content):
| Column | Tag | Company | Assignee (role) | Date | Links | Comments |
|---|---|---|---|---|---|---|
| Contacted | New lead | Aster Labs | Mateo Petty (Lead Manager) | 13 May | 2 | 4 |
| Contacted | Returning | Nova Retail | — | 25 May | 1 | 2 |
| Negotiation | Returning | BrightPath Legal | Lawrence Patterson (Account Manager) | 29 May | 4 | 6 |
| Negotiation | New lead | NorthPeak Finance | — | 28 May | 5 | 12 |
| Offer sent | Priority (highlighted card) | PulseWorks | Aysha Hayes (Sales Manager) | 13 May | 2 | 4 |
| Offer sent | Returning | Greenline Logistics | — | 13 May | 2 | 4 |
| Deal closed | Follow-up | Bloom Market | Scarlett Floyd (Project Manager) | 1 May | 12 | 17 |
| Deal closed | Follow-up | Atlas Energy | — | 3 May | 6 | 14 |

---

## 4. Component Styling Details

- **Corner radius:** generously rounded throughout — cards ~16–20px, pills/buttons fully rounded (999px), small tags fully rounded, avatars perfectly circular, sidebar logo circular.
- **Shadows:** very soft/subtle, barely-there elevation on cards floating over the grey canvas — no harsh drop shadows.
- **Spacing:** generous padding inside cards (~20–24px), consistent gutter (~16–20px) between grid items.
- **Icons:** thin-stroke line icons (outline style, ~1.5px stroke), monochrome (grey or matching text color), simple geometric shapes (no filled icons except status dots in tooltip).
- **Buttons:**
  - Primary (Add customer / Assign): solid fill, fully rounded, bold white label, small icon if applicable.
  - Secondary (Sort by / Filters): text + icon only, no border/fill, grey/muted color.
- **Badges/Pills:** small, fully rounded, bold small-caps-like label text, colored background matched to semantic meaning (green = positive/new, blue = returning, black = priority/urgent, yellow = follow-up).
- **Avatars:** circular, photographic, ~32–40px diameter in cards, ~40px in sidebar member list.
- **Data viz:** flat, minimal, no gridlines except faint axis text; chart fills use palette colors at reduced opacity layered for depth; heatmap uses discrete color blocks, no borders between cells beyond corner rounding on each cell.

---

## 5. Tone / Design Language Summary

- Style: **modern SaaS / fintech-adjacent minimal dashboard**, soft pastel-on-neutral palette, high legibility, generous whitespace, rounded-everything aesthetic.
- Contrast strategy: mostly low-contrast neutrals (creams, greys, blues) with **black used sparingly** for the single primary CTA and top-priority tags, and **lime green used sparingly** as the "positive/growth" accent color.
- Overall feel: calm, clean, professional CRM — approachable rather than corporate-cold, thanks to the pastel palette and rounded shapes.

---

## 6. Build Notes for an AI Agent

When implementing this design (e.g., in React + Tailwind or plain HTML/CSS):

1. Import the **Urbanist** Google Font and set it as the default font-family.
2. Define the palette above as CSS variables / Tailwind theme colors:
   ```css
   --color-primary-blue: #5880DA;
   --color-lime: #C9F17E;
   --color-light-blue: #BCDBFA;
   --color-cream: #F7F9F5;
   --color-ink: #1A1A1A;
   --color-muted: #8A8A87;
   --color-canvas: #B8B7B2;
   ```
3. Build layout as: outer canvas (grey) → rounded app frame → flex row of [sidebar (fixed width)] + [main content (flex-1)].
4. Main content stacks vertically: top bar → 3-column stats row (chart, heatmap, stacked KPI tiles) → 4-column kanban board.
5. Use a charting library (e.g., Recharts) for the stacked area chart with a custom tooltip styled as a dark rounded popover.
6. Build the heatmap as a CSS grid of small rounded divs, colored via a helper function mapping a value/intensity to one of the 3 accent colors.
7. Kanban cards are simple rounded `div`s with the tag/company/description/assignee/footer structure above — no drag-and-drop functionality required unless requested, purely visual layout is enough to match the design.
8. Keep all corner radii generous and consistent; avoid sharp corners anywhere in the UI.