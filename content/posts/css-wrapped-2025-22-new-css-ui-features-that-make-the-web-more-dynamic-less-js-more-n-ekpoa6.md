---
title: >-
  CSS Wrapped 2025: 22 new CSS & UI features that make the web more dynamic—less
  JS,…
description: >-
  This year’s wrap showcases a wave of platform-native capabilities for
  components, interactions, and developer ergonomics—crafted by the Chrome
  DevRel team and shipped to the Web Platform. Highlights I’m excited about (as
  a fronten
topic: Shared reading
status: published
order: 7920
---

This year’s wrap showcases a wave of platform-native capabilities for components, interactions, and developer ergonomics—crafted by the Chrome DevRel team and shipped to the Web Platform.

**Highlights I’m excited about (as a frontend engineer):**

- **Declarative UI controls**: _Invoker commands_ (commandfor) to open dialogs/popovers without JS, plus _Dialog light dismiss_ (closedby) and _popover="hint"_ for layered, ephemeral UI.

- **Customizable <select>**: Style the button, dropdown, and options with appearance: base-select, ::picker(select), and even reflect option markup via <selectedcontent>.

- **Native carousel toolkit**: Build accessible carousels with ::scroll-button() and ::scroll-marker()—and wire up your own TOC/“scroll‑spy” via scroll-target-group + :target-current.

- **Anchored container queries**: Make tooltips and callouts “aware” of anchor fallbacks (e.g., auto‑flip arrows when position changes).

- **Next‑gen interactions**: _Scroll‑state queries_ (stuck/snapped/scrollable) let you style based on scroll behavior; _tree counting functions_ (sibling-index(), sibling-count()) enable clean staggered animations; and scrollIntoView({ container: 'nearest' }) tames nested scrollers.

- **View transitions**: Improvements like _Nested View Transition Groups_ help preserve 3D/clipping effects during page-to-page animations.

These features cut boilerplate JS, improve accessibility and performance by leaning on native primitives, and streamline workflow with more declarative, composable UI patterns.

**Full article & demos:** [https://chrome.dev/css-wrapped-2025/](https://chrome.dev/css-wrapped-2025/)
