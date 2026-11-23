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
- **Hero & Page Titles:** Every page must feature the signature **Orange Topic Banner / Eyebrow**:
  - **Homepage Hero:** The animated eyebrow pill:
    ```html
    <div class="serk-hero-anim-eyebrow" style="margin-bottom: 20px;">
      <span class="wpr-anim-text wpr-anim-text-type-clip" data-anim-duration="1000,2000" data-anim-loop="yes" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 18px; background: rgba(227, 171, 114, 0.1); border: 1px solid rgba(227, 171, 114, 0.35); border-radius: 9999px;">
        <span class="wpr-anim-text-inner">
          <b data-full-text="Sovereign Digital Systems" style="color: #E3AB72; font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Sovereign Digital Systems</b>
        </span>
        <span class="wpr-anim-text-cursor" style="color: #E3AB72; font-size: 14px; font-weight: 300;">|</span>
      </span>
    </div>
    ```
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
