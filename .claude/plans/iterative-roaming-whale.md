# Mobile Optimisation Plan — Peptide Station

## Problem
Desktop-first layout with hardcoded `48px` horizontal padding everywhere. On iPhone 12 Pro (390px viewport), this eats 96px — leaving only 294px for content. The `HomepageStatement.tsx` image is fixed at 480px wide and overflows. Hero h1 `clamp(42px…)` is too large on mobile.

## Strategy
- Replace `paddingLeft/Right: '48px'` with `clamp(16px, 5vw, 48px)` throughout
- Fix HomepageStatement to stack vertically on mobile (`flex-col` → `lg:flex-row`)
- Reduce hero font clamp floor from 42px to 32px
- Fix hero carousel inner padding for mobile
- Ensure comparison table scrolls properly on small screens

## Token: `RESPONSIVE_PAD = 'clamp(16px, 5vw, 48px)'`
Use a const where possible, inline string where not.

---

## Execution Order

| # | File | Key Changes |
|---|------|-------------|
| 1 | `containers/layout/header.tsx` | Padding clamp, logo size responsive |
| 2 | `containers/layout/footer.tsx` | Padding clamp |
| 3 | `containers/banner/hero-block.tsx` | Padding clamp |
| 4 | `components/hero-carousel-client.tsx` | Inner content padding responsive (112px → clamp), progress dots left responsive |
| 5 | `containers/banner/slider-component.tsx` | Hero h1 clamp floor 42→32px, subheading size responsive |
| 6 | `containers/homepage/HomepageStatement.tsx` | Padding clamp, flex-col → lg:flex-row stack, image 480px → responsive |
| 7 | `containers/homepage/HomepageFeatures.tsx` | Padding clamp |
| 8 | `containers/homepage/HomepageBanner.tsx` | Outer padding clamp, inner padding responsive |
| 9 | `containers/homepage/HomepageComparison.tsx` | Padding clamp, table header col width responsive |
| 10 | `containers/homepage/HomepageTestimonials.tsx` | Padding clamp |
| 11 | `containers/products.tsx` | Padding clamp |
| 12 | `pages/index.tsx` | Product grid headline padding clamp |
| 13 | `pages/learn.tsx` | All 4 padding locations → clamp, featured post grid → stack on mobile, hero inner padding responsive |
| 14 | `pages/products/[slug].tsx` | Already uses Tailwind `px-4 lg:px-35px` — verify, minimal changes |

---

## Logbook

### 2026-03-19 02:35 UTC — Full mobile pass complete

**Files changed (14):**

1. **header.tsx** — `paddingLeft/Right: '48px'` → `clamp(16px, 5vw, 48px)`. No logo changes needed — already uses fixed 26px which works fine at 390px.
2. **footer.tsx** — Same padding clamp swap.
3. **hero-block.tsx** — Same padding clamp swap on outer container.
4. **hero-carousel-client.tsx** — Inner content padding `112px`/`56px` → `clamp(24px, 8vw, 112px)`/`clamp(20px, 4vw, 56px)`. Progress dots `left: 112px` → same clamp. `minHeight: 580px` → `clamp(420px, 60vw, 580px)` to avoid oversized hero on small screens. `paddingTop` also clamped.
5. **slider-component.tsx** — Hero h1 `clamp(42px…)` → `clamp(32px, 5.5vw, 76px)`. Subheading `18px` → `clamp(15px, 2vw, 18px)`.
6. **HomepageStatement.tsx** — Full rewrite. Outer section switched from inline flex to `className="flex flex-col lg:flex-row"` so text stacks above image on mobile. Image container changed from `flex: 0 0 480px; width: 480px` (hard overflow!) to `width: 100%; maxWidth: 480px` — now constrained by viewport. Heading font floor lowered `36px` → `28px`. Vertical padding clamped. Gap clamped `40px–80px`. Image `sizes` attr updated for responsive.
7. **HomepageFeatures.tsx** — Padding clamp swap.
8. **HomepageBanner.tsx** — Outer + inner padding both clamped. Vertical padding `48px` → `clamp(24px, 4vw, 48px)`. Inner content `64px` → `clamp(24px, 5vw, 64px)`.
9. **HomepageComparison.tsx** — Padding clamp swap. Table first column `width: 180px` → `clamp(100px, 20vw, 180px)` so labels don't eat half the viewport on mobile. Table already has `overflowX: auto` so it scrolls naturally.
10. **HomepageTestimonials.tsx** — Padding clamp swap.
11. **products.tsx** — Inline padding clamp swap.
12. **index.tsx** — Product grid headline section padding clamp swap.
13. **learn.tsx** — 4 padding sites updated. Featured post `gridTemplateColumns: '1fr 1fr'` → Tailwind `grid-cols-1 lg:grid-cols-2` for mobile stacking. Featured post content padding clamped. Hero inner padding clamped (same pattern as carousel). Subscribe CTA padding clamped, email input gets `maxWidth: 100%`, flex container gets `flexWrap: 'wrap'` + `justifyContent: 'center'`.
14. **products/[slug].tsx** — Already uses Tailwind `px-4 lg:px-35px` — no 48px hardcodes found. The h1 clamp floor is already 32px. No changes needed.

**Decisions:**
- Used `clamp(16px, 5vw, 48px)` as the universal section padding token. At 390px viewport this gives ~19.5px per side (39px total) — comfortable for content.
- Hero carousel uses wider clamp (`8vw`) because the original 112px inner padding was proportionally much larger than section padding.
- Chose Tailwind responsive classes (`flex-col lg:flex-row`, `grid-cols-1 lg:grid-cols-2`) for layout shifts since the project already uses Tailwind alongside inline styles.
- Did NOT extract a CSS variable or JS const for the clamp — these are inline styles and a const would require importing across 12+ files. The string is short enough to be self-documenting.
- `minHeight` on carousel clamped rather than removed — ensures the hero still has presence on mobile but doesn't dominate.

**Build:** `pnpm build` passes clean. No type errors, all 9 pages export successfully.

