# SERK Technologies Group — Brand Guidelines & Workspace Memory

## 1. Brand Color System (Strict Enforcement)
Whenever the user refers to "Company logo colors" or "Company brand", it ALWAYS means:
- **Base UI Theme:** Black (`#101513`), White (`#FFFFFF`).
- **Signature Topic & Eyebrow Color:** Brand Orange / Warm Amber (`#E3AB72` / `rgba(227, 171, 114, 0.1)`).
- **Primary Buttons & Actions:** Deep Forest Green (`#0D4634`, hover: `#2D735A`).
- **Surface / Cards:** `#FFFFFF` card surface with `1px solid #DEE6E0` border and `8px` rounded corners.
- **Body & Secondary Text:** `#5B6761` (Muted Slate / Deep Grey).
- **Backgrounds:** `#FCFCFE` or `#FFFFFF`.

## 2. The Orange Topic UI System
- **Hero & Page Titles:**
  - **Homepage Hero:** NO orange eyebrow topic banner above the headline. The headline "We Engineer the Systems Behind Better Business." starts directly at the top of the hero text column.
  - **Inner Pages Header:** Use `AnimatedHeaderBanner` with title in `#E3AB72` and typing cursor `|`.
  - **Category / Filter Pills:** Pill buttons have active/hover state with `background-color: rgba(227, 171, 114, 0.12)`, `color: #101513`, and `border-color: #E3AB72`.
  - **Maturity / Governance Badges:** Styled in warm brand amber (`background: rgba(227, 171, 114, 0.12)`, `color: #B26A25`, `border: 1px solid rgba(227, 171, 114, 0.35)`).

## 3. Responsive Layout Rules (Zero Mobile Overlap)
- On mobile ($\le 768\text{px}$):
  - Hero sections must ALWAYS render in a 1-column vertical stack (text on top, graphic card below).
  - Eyebrow topic banners must have normal document flow (`display: flex; position: relative; margin-bottom: 14px`) with no negative margins, ensuring zero overlap with headlines or graphics.
  - Background SVG illustrations behind text must be hidden on mobile so text remains 100% crisp and readable.

## 4. Admin Publishing & New Features
- Any content, venture, product, or AI initiative added or edited via `/admin` or in new prompts must strictly adhere to the Black, White & Brand Orange (`#E3AB72`) design tokens.
- Never use unstyled raw HTML or arbitrary colors.
