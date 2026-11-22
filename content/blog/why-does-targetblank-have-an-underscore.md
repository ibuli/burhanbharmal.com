---
title: Ever Wondered Why Does target="_blank" Have an Underscore?
date: '2025-03-06'
description: The history behind a familiar HTML attribute and its special reserved values.
topic: Engineering
status: published
---

Ever wondered why you need an underscore in `target="_blank"` to open a link in a new tab?

Before HTML5, developers used `<frameset>` to split a window into different sections, each with its own name.

The `<frameset>` element was used in older versions of HTML to divide a web page into multiple sections, each capable of displaying a different document. This allowed for a layout with separate frames, like a sidebar and a main content area. However, `<frameset>` is now deprecated in HTML5 because it was replaced by more flexible and accessible layout techniques using CSS and JavaScript.

When you clicked a link, the browser needed to know which section to load the new content into. That's where the `target` attribute came in. For example, clicking a link in the sidebar could load new content in the content section:

```php-template
<a href="/dashboard" target="content"></a>
```

If you had a section named "blank" and used:

```php-template
<a href="/" target="blank"></a>
```

the content would load in that section. But if there was no section named "blank," the browser would open a new window (not a tab, as tabs didn't exist back then) and name it "blank." Clicking the same link again wouldn't open another window.

So, why the underscore in `target="_blank"`?

It's simple. Developers needed a way to tell the browser to open the link in a new tab, not in any named section. The underscore means it's a special value, not a section name.

P.S. Don't use `<frameset>`. It's outdated in HTML5.
