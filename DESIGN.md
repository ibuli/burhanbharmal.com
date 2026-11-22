---
name: Burhan Bharmal
description: Cinematic engineering portfolio with real project screenshots and calm reading surfaces.
colors:
  bg: '#efeeea'
  surface: '#e4e3de'
  text: '#22241f'
  muted: '#62635b'
  line: '#cbc9c0'
  accent: '#944528'
  accent-ink: '#fff9f3'
  input: '#f7f6f2'
  dark-bg: '#171917'
  dark-surface: '#242722'
  dark-text: '#eeeee6'
  dark-muted: '#b0b1a6'
  dark-line: '#3e4239'
  dark-accent: '#e5ad84'
  dark-accent-ink: '#221b13'
  dark-input: '#20231e'
  viewer-backdrop: '#111510d9'
typography:
  display:
    fontFamily: 'Syne, sans-serif'
    fontSize: 'clamp(4rem, 7.4vw, 6rem)'
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Syne, sans-serif'
    fontSize: 'clamp(2.3rem, 4.6vw, 4.5rem)'
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: '-0.04em'
  title:
    fontFamily: 'Syne, sans-serif'
    fontSize: '1.65rem'
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: '-0.04em'
  body:
    fontFamily: 'Public Sans, Arial, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.65
  prose:
    fontFamily: 'Public Sans, Arial, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.85
  action:
    fontFamily: 'Public Sans, Arial, sans-serif'
    fontSize: '1rem'
    fontWeight: 500
    lineHeight: 1.65
  navigation:
    fontFamily: 'Public Sans, Arial, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  footer-action:
    fontFamily: 'Syne, sans-serif'
    fontSize: '2rem'
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: '-0.03em'
  wordmark:
    fontFamily: 'Syne, sans-serif'
    fontSize: '1.4rem'
    fontWeight: 650
    lineHeight: 1
    letterSpacing: '-0.04em'
  wordmark-footer:
    fontFamily: 'Syne, sans-serif'
    fontSize: '2rem'
    fontWeight: 650
    lineHeight: 1
    letterSpacing: '-0.04em'
  resume-name:
    fontFamily: 'Syne, sans-serif'
    fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: '-0.04em'
  resume-role:
    fontFamily: 'Public Sans, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.65
  small:
    fontFamily: 'Public Sans, Arial, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
rounded:
  control: '3px'
  circle: '50%'
spacing:
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  grid: '48px'
  wide: '64px'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-ink}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '12px 24px'
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.text}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '12px 24px'
  search-input:
    backgroundColor: '{colors.input}'
    textColor: '{colors.text}'
    rounded: '{rounded.control}'
    padding: '12px 16px'
    width: '100%'
  topic-filter:
    backgroundColor: transparent
    textColor: '{colors.text}'
    rounded: '{rounded.control}'
    padding: '8px 15px'
  topic-filter-active:
    backgroundColor: '{colors.text}'
    textColor: '{colors.bg}'
    rounded: '{rounded.control}'
    padding: '8px 15px'
  theme-toggle:
    backgroundColor: transparent
    textColor: '{colors.text}'
    rounded: '{rounded.circle}'
    width: '44px'
    height: '44px'
  gallery-control:
    backgroundColor: transparent
    textColor: '{colors.text}'
    rounded: '{rounded.circle}'
    width: '48px'
    height: '48px'
  image-viewer:
    backgroundColor: '{colors.bg}'
    textColor: '{colors.text}'
    padding: '24px'
    width: 'min(1440px, calc(100vw - 48px))'
    height: 'calc(100dvh - 48px)'
  viewer-control:
    backgroundColor: transparent
    textColor: '{colors.text}'
    rounded: '{rounded.circle}'
    width: '48px'
    height: '48px'
  resume-download-disabled:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.muted}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '12px 24px'
  enquiry-field:
    backgroundColor: '{colors.input}'
    textColor: '{colors.text}'
    rounded: '{rounded.control}'
    padding: '12px 14px'
    width: '100%'
  enquiry-result:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    padding: '22px'
  navigation-link:
    textColor: '{colors.muted}'
    typography: '{typography.navigation}'
    rounded: '{rounded.control}'
    padding: '10px 16px'
  navigation-indicator:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.control}'
  footer-email:
    textColor: '{colors.text}'
    typography: '{typography.footer-action}'
  copy-email:
    backgroundColor: transparent
    textColor: '{colors.text}'
    rounded: '{rounded.control}'
    width: '44px'
    height: '44px'
---

# Design System: Burhan Bharmal

## Overview

**Creative North Star: "The Project Screening Room"**

Editorial film stills frame real engineering work. Oversized, tightly tracked Syne titles establish a distinctive voice; Public Sans keeps navigation, descriptions, and long reading direct. Warm neutral daylight and charcoal dark mode share muted copper accents and the same restrained control vocabulary.

Cinematic depth belongs to the project screenshots. Generous spacing and asymmetric showcases give actual product pixels room to lead. Reading and career surfaces remain flat and calm. The chosen direction was implemented in code without a visual comp; the source, rather than an imagined reference, defines this record.

**Key Characteristics:**

- Actual project screenshots as the central visual material.
- Distinctive display typography paired with quiet, readable body text.
- Warm neutral and charcoal themes with copper accents.
- Native scrolling with restrained screenshot motion.
- Flat reading surfaces, fine rules, and small control corners.

## Colors

### Primary

Copper (`accent`) identifies primary actions, reading links, selected text, focus outlines, and small identity details. Its dark-theme counterpart is a lighter warm copper. `accent-ink` is the corresponding foreground, not a general background.

### Neutral

`bg` is the page canvas; `surface` supports media, code, and hover fills. `text` carries headings and primary content; `muted` carries supporting descriptions and metadata. `line` defines fine dividers and control borders; `input` separates search fields from the canvas. The `dark-` entries replace their unprefixed counterparts when dark mode is active. All values in the frontmatter are extracted from `src/styles.css`.

Project stages additionally use image-specific sage, charcoal, and slate backdrops. Those local art-direction colors remain contextual, rather than becoming additional global brand accents.

**The Theme Pair Rule.** Use the live semantic CSS variables so foregrounds, backgrounds, borders, and focus treatments change together. Follow the system preference until an explicit theme is selected; preserve that selection when storage is available.

## Typography

**Display Font:** self-hosted Syne, falling back to sans-serif. **Body Font:** self-hosted Public Sans, falling back to Arial and sans-serif. Both use variable WOFF2 files and `font-display: swap`.

### Hierarchy

- **Display:** the frontmatter display role is the desktop homepage name. At the narrow breakpoint its size becomes `clamp(3.5rem, 14vw, 5.5rem)`. The secondary name line uses muted ink.
- **Headline:** balanced section headings use the headline role. Generic page titles use `clamp(3rem, 6vw, 6rem)`; route introductions, articles, and project titles refine that size to their available width.
- **Title:** the title role is the base third-level heading. Project titles grow to `clamp(2rem, 3vw, 3rem)`; article and post titles use smaller, locally adjusted sizes and line heights.
- **Body:** the default body and substantial descriptions use `--text-body` (`1.125rem`, ordinarily `18px`). Paragraphs generally cap at `70ch`; compact project descriptions cap at `47ch`.
- **Prose:** long articles and project narratives retain the body-sized prose role across viewport sizes, with `1.85` line height. Inline code uses `0.95em` relative to the surrounding text.
- **Action / Small:** controls, navigation, tags, dates, labels, metadata, hints, and compact descriptions use `--text-small` (`1rem`, ordinarily `16px`). Navigation retains this readable size at narrow breakpoints. Dates use tabular numerals where career alignment benefits.

These two source tokens establish the readable interface floor: ordinary UI text stays at least small-sized, while body reading uses the larger role. Preserve the heading scale and Syne/Public Sans pairing; avoid shrinking supporting text to create hierarchy. Use weight, spacing, and semantic color instead. Print retains its dedicated typographic rules.

**The Two Voices Rule.** Use Syne for identity and headings, Public Sans for reading and controls. Preserve tight heading tracking and balanced wrapping without applying display styling to paragraphs.

## Layout

The shared container is `min(1320px, calc(100% - 112px))`, centered. At widths up to `1000px`, total horizontal inset becomes `64px`; at widths up to `650px`, it becomes `40px`. Section padding decreases from `124px` to `88px` to `72px`. Fine bottom rules establish continuity between sections.

Desktop compositions use split headings, paired project descriptions, and two- or three-column content grids. The featured writing grid begins at `1.4fr 1fr 1fr`; article and post libraries begin at three columns. Most paired sections and library grids collapse to one column at the narrow breakpoint. At intermediate widths the libraries use two columns. Shared chrome has its own breakpoint at `760px`: navigation occupies a full-width second row and remains visible rather than moving behind a menu. The sticky header occupies `85px` including its bottom rule on desktop and `117px` on narrow screens; anchor scroll padding is `112px` and `144px`, respectively. At `420px` and below the contact action becomes a circular icon-only control with its accessible name intact. Footer contact content stacks at the chrome breakpoint, and its directory becomes two link columns beneath a full-width identity row.

Project scenes form a vertically spaced sequence. Above `1000px`, the second and third scenes occupy `88%` and `91%` of the shared width, respectively, producing deliberate asymmetry. Project detail galleries show one full-width screenshot at a time in a native horizontal scroll-snap track at all widths. Case narratives use a centered `70ch` block with the heading above the reading text, separated by a fine bottom rule; the story margin is `88px` vertically, reducing to `56px` at the narrow breakpoint. Reading pages cap at `960px`, notes at `820px`, and prose at `70ch`.

Business surfaces extend the same editorial grid: the introduction uses `1.65fr 1fr`, home services use `1fr 1.1fr`, and service rows, process, proof, and enquiry sections use paired columns with generous gaps and fine rules. The introduction and enquiry stack at `760px`; remaining service/process rows stack at `650px`. Paired name/email fields stack at `650px`. Case-study role and context use a semantic definition list with three columns (`1fr 1fr 1.3fr`), becoming two columns with a full-width final entry at `760px`. Related-reading cards use two columns before stacking at `650px`. These surfaces add no new palette or motion vocabulary.

The professional resume caps its container at `1120px`, with `72px` top and `56px` bottom padding. Its compact header pairs the name, role, and factual summary with a `230px` action column; the full-width contact list follows. Main experience and qualifications use `minmax(0, 1fr) 280px` columns with a `64px` gap and a fine sidebar rule. At `1000px` the sidebar becomes `250px` with a `40px` gap. At `800px` and below both header and body stack, top padding becomes `48px`, and a top rule replaces the sidebar’s vertical divider.

The retained general print stylesheet is unchanged. This resume introduces no dedicated print action or new resume-specific print rules.

## Elevation & Depth

The interface is predominantly flat: page divisions, cards, and controls use fine lines and tonal separation. Soft, offset shadows lift product screenshots within their stages; this is cinematic image depth rather than a general floating-card system. The exact screenshot shadow vocabulary is recorded in the sidecar.

**The Image Depth Rule.** Keep text surfaces flat. Reserve offset image shadows for real screenshots and gallery media, where they separate product pixels from the surrounding stage.

## Shapes

Controls and many image edges have very small corners using the control radius. The theme switch is circular. Project stages and reading cards are rectangular, with clipping used to frame imagery. Tags are plain text separated by tiny dots; topic filters are small rectangular controls rather than pills. Do not generalize loading skeleton rounding into content-card styling.

## Components

### Buttons

Primary buttons use copper with the matching accent foreground; secondary buttons are transparent with a fine neutral border. Both use the frontmatter padding and corner token with a minimum height of `48px`. Pressing scales them to `0.97` over `160ms` with the shared ease-out curve. The implementation has no separate primary-button hover fill. Keyboard focus uses a copper outline (`2px`, offset `6px`). Text actions are underlined, padded vertically, and shift to copper on fine-pointer hover.

### Inputs / Fields

Search fields use the input surface, neutral border, small corners, and a minimum height of `48px`. Labels sit above the field. Placeholder text uses muted ink; the caret uses copper. Search is combined with a topic choice, with a polite result count and a clear-filters empty state. This library search has no special validation or disabled visual variant.

Project enquiries reuse the same field language for native inputs, select, and vertically resizable textarea: small corners, input surface, fine neutral border, `48px` minimum height, and `12px 14px` padding. Textareas have a `144px` minimum height and `1.7` line height. Field text is small-sized on desktop and remains `16px` at the narrow breakpoint. Labels, optional status, and hints use the same readable small-text baseline. Labels sit above fields, optional status aligns alongside the label, and hints sit below. Native required/email/length constraints validate the name, email, and project description; service choice and timing are optional. There is no custom error-color palette.

The form and its controls stay disabled until hydration, preventing native GET submission before client handling is ready. Disabled controls and submit use `0.6` opacity and a waiting cursor. Preparing a draft keeps the values in the page, reveals a flat surface-colored result with a fine border, and moves focus to the explicit “Open email draft” action. Editing any field clears the stale draft. Only activating that link opens the encoded mailto draft in the visitor’s email application; sending remains a separate action there. A visible direct email address and copy button remain available as fallback, including when JavaScript is unavailable.

### Chips

Topic filters have a minimum height of `44px`, a fine border, and small corners. Active filters invert primary text and page colors and expose `aria-pressed`. Inactive filters gain the surface color on fine-pointer hover. Technology tags are a separate, unboxed wrapping text list with small dot separators.

### Cards / Containers

Article cards have no encompassing box, shadow, or filled card shell. An optional cover image precedes a Syne heading, followed by metadata, description, and reading action. Covers use `object-fit: cover`; fine-pointer hover scales their image to `1.035` over `600ms`. Post cards are text-led with a top rule, heading-first metadata order, and bottom-aligned reading action. Article and post metadata begins below the title with a `16px` top margin. Project detail galleries use neutral surfaces and contained screenshots, preserving the underlying product imagery.

### Navigation

The sticky, opaque page-colored header uses the shared full-name Syne wordmark, four persistent navigation links, a separate Work with me route action, and a theme switch. Links use muted ink; the active parent section uses primary text and retains a thin copper underline, including when viewing a nested project, article, or post. A small-corner surface-colored indicator follows mouse hover and keyboard focus before returning to the current section. Keyboard focus takes priority over hover. Shared-layout movement lasts `240ms` with the established ease-out curve; keyboard focus and reduced-motion updates are instant. The underline continues to identify the current section while another item is hovered. A keyboard-revealed skip link precedes the header.

The theme switch is a `44px` circular icon button with Lucide Sun and Moon glyphs, sized `17px` with a `1.5px` stroke. It shows the action available for the opposite theme and exposes a descriptive accessible name. Icons crossfade and rotate/scale over `180ms`; button pressing retains the shared `160ms` scale response. Reduced-motion preferences remove those transitions. The Work with me action links to `/work-with-me` and exposes its active route in copper. The contact arrow nudges diagonally by `2px` over `200ms` on fine-pointer hover.

### Wordmark

Header and footer share a stacked “Burhan / Bharmal.” wordmark rather than a monogram. Syne at weight `650`, tight tracking (`-0.04em`), unit line height, and a `2px` line gap preserve the full name at compact sizes. The header uses the wordmark typography role; the footer uses its larger footer variant. The terminal dot uses copper. The visual wordmark is hidden from assistive technology inside a home link with a full descriptive accessible name.

### Footer and contact

The footer is a broad, flat closing surface with a two-column contact invitation and prominent Syne “Let’s talk” action leading to `/work-with-me`. The direct email address remains a mailto link. The action ends in a bordered circular arrow (`58px` desktop, `50px` at the chrome breakpoint), rotating `45deg` over `220ms` on fine-pointer hover. The real email address remains visible and selectable below, alongside a small-corner `44px` copy button. Clipboard success swaps the Copy icon for a copper Check; a polite live output reports success or provides a manual-selection fallback on failure, then clears after `3000ms`. Icon swapping and the pressed response use `160ms` transitions; the idle copy button gains a surface fill on fine-pointer hover.

One original fine-pencil landscape spans the entire footer, including the copyright row, replacing the earlier abstract print. The non-interactive decorative background uses `/assets/images/footer-sketch.webp`, centered at the bottom with cover sizing and a top fade mask. Light mode uses `42%` opacity, including mobile; dark mode uses `30%` with `invert(1) hue-rotate(180deg)`. Mobile shifts its horizontal position to `65%`. Footer supporting text resolves its local muted color to primary text to maintain contrast over the continuous artwork, in both themes. Asset provenance and generation details are recorded in `docs/asset-provenance.md`. Each directory navigation keeps its links in one column; at `650px` and below the signature stacks with left-aligned location copy. Fine rules separate contact, a directory with meaningful Explore and Elsewhere group headings, and final metadata. Explore includes Work with me as well as the original portfolio and reading routes. Directory links provide `44px` minimum targets; external links retain new-tab announcements and small diagonal arrows. The identity and location anchor the first directory column. A visible Back-to-top link targets the page-top anchor; its arrow rises `3px` on fine-pointer hover. Directory arrows move diagonally by `2px`, both over `180ms`. Reduced motion removes these decorative transforms. Footer content has `100px` top padding on desktop and `72px` at the chrome breakpoint; the final credit is hidden on narrow screens while copyright and Back-to-top remain available.

### Business rows and reading continuation

Service and process content uses open editorial rows, fine dividers, Syne headings, and muted supporting copy. Process steps retain native ordered-list numbering with copper tabular markers. Project evidence links lead with the actual project name; role/context lists identify the independent work without adding testimonial, performance-metric, or availability treatments. The homepage pairs its primary project-discussion action with a quieter route to the existing work, retaining the real screenshot stage.

Curated starting articles reuse the existing featured writing grid and article cards. Articles with at least three extracted section headings receive an “In this article” navigation box: a fine border, `24px` padding, and genuine heading-anchor links within the `70ch` reading measure. After the article, a ruled author block uses the existing illustrated avatar; engineering and AI/tool articles add a restrained project invitation. Related-reading cards continue the same card vocabulary, followed by an RSS link. These are reading and navigation actions; RSS does not imply a separate newsletter or automatic email delivery.

### Project detail gallery

Every project image remains available in a native horizontal track, with mandatory start-aligned scroll snapping and one slide per viewport. The focusable region supports native arrow-key scrolling and touch swiping; previous/next buttons scroll by the track width. Each original image retains a real source `href` as progressive fallback. With client handling available, selecting it opens the native image-viewer dialog in the same page, with an explicit accessible label and `aria-haspopup="dialog"`; it does not open a new tab. Images are contained rather than cropped, within a stage height of `clamp(280px, 52vw, 720px)` and padding of `clamp(12px, 3vw, 44px)`.

Circular previous/next controls use the gallery-control token, a muted border, and an inverted text/background hover treatment. Endpoint controls are disabled with `0.4` opacity. A polite, atomic counter reports the current slide using tabular numerals; its state follows native scroll position. Smooth scrolling respects the existing reduced-motion override, which restores automatic scrolling. Button color/fill transitions last `180ms` with the shared ease-out curve. At the narrow breakpoint the toolbar stacks its title above right-aligned controls. The neutral bordered track and visible scrollbar retain native affordances; this detail gallery does not inherit the homepage scroll-linked image transform.

### Image viewer

The native modal dialog keeps the selected original screenshot within the existing page palette, behind the viewer-backdrop overlay. Desktop dimensions and padding use the image-viewer tokens; at the narrow breakpoint it fills the viewport, uses `20px` padding, and removes its border. Body scrolling is locked while it is open, with stable scrollbar space retained. The title and screenshot position remain visible above a contained-image stage; a bottom row carries the image hint and previous/next controls.

Zoom toggles between fitting the image to the stage and showing its original dimensions in an independently scrollable region. Zoom, close, previous, and next buttons are circular `48px` controls with clear accessible names, neutral borders, and a surface hover fill. Endpoint navigation uses disabled state with `0.4` opacity. Zoom exposes `aria-pressed`. Native Escape cancellation uses the same close path as the close button; native dialog behavior manages modal focus. After native close, the carousel instantly aligns with the last viewed screenshot and explicitly focuses that screenshot’s source anchor using `preventScroll: true`, preserving the viewed context. Closing resets zoom; changing viewer images also resets zoom.

Opening, image changes, and closing use the guarded View Transition API with a single shared `project-image` name. A new request skips any running transition; skipped or unsupported animation does not block the state update. Shared-image transitions last `320ms` with the established ease-out curve. Reduced-motion preferences bypass the API and remove view-transition animations; the native dialog and all controls continue to work without animated transitions.

### Professional resume

The resume is a compact professional document within the same palette and type system. The full-name heading uses the resume-name role; the current profile role follows in copper (`1.4rem`, weight `500`), then a bounded factual summary using body-sized text with `1.75` line height. An unboxed wrapping contact list exposes location, email, LinkedIn, and GitHub; links retain `44px` minimum targets and external-link announcements.

Experience leads with three employer-level periods, summaries, and contribution lists sourced from `careerHighlights`. Employer headings use Syne (`1.5rem`, line height `1.3`) beside wrapping tabular dates. The current position uses the resume-role typography token. Summaries stay body-sized; contribution bullets and supporting dates use the readable small-text role. The multi-role employer adds a compact chronological progression list below its contributions, preserving the existing role titles and start dates behind fine row dividers. All six historical role records remain in the data; employer-level evidence is not repeated as generic bodies under each promotion. There are no accordions or separate technology-inventory blocks.

The sidebar begins with an “Areas of contribution” bullet list rather than a raw skills inventory. Small-sized text, `1.8` line height, and `10px` spacing between items retain a calm reading rhythm. Two education entries and three certifications follow unchanged. Qualification titles use Public Sans at weight `600`, small-sized text, and `1.6` line height. Section spacing and dividers establish hierarchy without reducing text size.

Career labels and evidence follow `docs/career-source.md`: the confirmed current title is Lead Engineer at Sequoia Group; employer-level contributions stay separate from promotion dates. The stated scope of 13 micro frontends is supplied experience, not a measured performance outcome. Do not infer additional results, metrics, or project-to-promotion assignments from the layout.

The header’s “Download resume” control is a disabled placeholder with a Download icon and the associated status “PDF coming soon.” It uses the resume-download-disabled token, a fine neutral border, full opacity, and a not-allowed cursor. It has no download URL or generated PDF; the retired PDF has been removed from the current source and public assets for privacy. Keep the status explicit until the user provides the intended PDF content. There is no Print action.

### Project screening sequence

The homepage identity and business introduction share a vertically centered two-column grid with a `64px` gap on wide screens. At `900px` and below they stack in reading order, keeping the name above the introduction rather than leaving an empty column. The identity includes the confirmed current role and location in `16px` supporting text. Mobile introduction text is `1.4rem`; supporting text remains at least `16px`.

Below the opening project stage, underlined Work, Writing, and About shortcuts use `44px` minimum targets and native fragment navigation. Service summaries are complete linked rows with a Lucide external-direction arrow and lead to their specific service on the collaboration page. Their restrained `240ms` arrow nudge respects the global reduced-motion override. The experience introduction includes three factual examples from the existing career evidence: test foundations across 13 micro frontends, product theming/shared components, and navigation across product experiences. No additional outcomes are inferred.

The homepage opening uses an actual Arkive screenshot, tilted on a sage stage. On fine-pointer hover its angle changes from `-6deg` to `-3deg` with an upward shift of `8px` over `800ms`. The name row and stage enter over `800ms` and `1100ms`, translating `16px` from an initial opacity of `0.55`; content is never initially hidden.

The three featured project images follow native scroll progress, translating through `32px`, `0`, and `-24px` while scaling through `0.96`, `1`, and `1.025`. The image is the moving layer; copy remains still. Project category metadata follows the project title, separated by a `12px` top margin. Next-project navigation likewise leads with the destination title and places its label below. The project action nudges upward by `5px` on fine-pointer hover. At the narrow breakpoint the scroll-linked image transform is suppressed. Reduced-motion preferences remove animations and transitions and suppress scroll-linked transforms. The resting screenshot tilt remains part of the composition; reduced motion does not replace it with a different layout.

## Do's and Don'ts

### Do:

- **Do** lead project surfaces with actual product screenshots and preserve their original pixels.
- **Do** use semantic theme variables for both themes and keep focus visible.
- **Do** keep long reading calm, with Public Sans, generous line height, and bounded line lengths.
- **Do** isolate scroll-linked motion to screenshot layers and suppress it on narrow screens and for reduced motion.
- **Do** retain visible navigation and stack complex layouts on narrow screens.
- **Do** lead cards and project navigation with the title, placing useful metadata below it.

### Don't:

- **Don't** manufacture product interfaces, outcomes, metrics, portraits, or missing dates.
- **Don't** introduce scroll hijacking or make content depend on an entrance animation.
- **Don't** turn image shadows into a floating-card treatment for reading surfaces.
- **Don't** replace the established Syne and Public Sans pairing with system display typography.
