# Instructions: Resolve All Issues in Owen McGrath's Portfolio Page

## Source File

The input is a single `index.html` file — a static personal portfolio page. All CSS is inline. There is no JavaScript. Preserve the existing design intent, visual hierarchy, and aesthetic exactly. These changes are surgical fixes, not a redesign.

---

## 1. Performance

### 1.1 — Clamp the heading font size

The `.name` class uses a fixed `164px` on desktop and `96px` below 1068px, with nothing in between. Replace the fixed desktop `font-size` with a `clamp()` that scales smoothly and prevents overflow on mid-range viewports.

```css
/* BEFORE */
.name {
  font-size: 164px;
}

/* AFTER */
.name {
  font-size: clamp(96px, 12vw, 164px);
}
```

Then remove the `font-size: 96px` override inside the `max-width: 1068px` media query, since `clamp()` now handles the lower bound.

### 1.2 — Prevent content clipping on short viewports

The body has `overflow: hidden`. On very short mobile screens, content can be silently clipped. Add a `min-height` to the body so that if the viewport is shorter than the content, the page becomes scrollable instead of clipping.

```css
/* BEFORE */
body {
  overflow: hidden;
}

/* AFTER */
body {
  overflow: hidden;
  min-height: 100dvh;
}
```

Then, inside the `max-width: 1068px` media query, override to allow scrolling on mobile:

```css
@media screen and (max-width: 1068px) {
  body {
    overflow: auto;
  }
}
```

### 1.3 — Modernize the favicon reference

Replace the current favicon line with a more robust declaration. If an SVG favicon is available, prefer it. Otherwise, add `sizes` for clarity:

```html
<!-- BEFORE -->
<link rel="icon" href="favicon.ico" type="image/x-icon">

<!-- AFTER — if an SVG version exists -->
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="32x32" type="image/x-icon">

<!-- AFTER — if no SVG version exists, just add sizes -->
<link rel="icon" href="favicon.ico" sizes="32x32" type="image/x-icon">
```

If no SVG favicon is present in the project, use the second variant and leave a `<!-- TODO: add favicon.svg for high-DPI -->` comment.

---

## 2. Security

### 2.1 — Add `rel="noopener noreferrer"` to all external links

Every `<a>` tag with `target="_blank"` must include `rel="noopener noreferrer"`. This is eight links total. Example:

```html
<!-- BEFORE -->
<p><a href="https://cmd-find.app/" target="_blank">cmd-find</a></p>

<!-- AFTER -->
<p><a href="https://cmd-find.app/" target="_blank" rel="noopener noreferrer">cmd-find</a></p>
```

Apply this to all eight links in both `.column` divs.

### 2.2 — Add a Content Security Policy meta tag

Insert the following inside `<head>`, immediately after the `<meta name="viewport">` tag:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self';">
```

This locks the page to only load resources from its own origin, with an exception for inline styles (which the page requires). No external scripts, stylesheets, or resources will be permitted.

### 2.3 — Add a Referrer-Policy meta tag

Insert immediately after the CSP tag:

```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

This ensures the full URL path is never leaked to third-party sites.

---

## 3. Accessibility

### 3.1 — Wrap link sections in a `<nav>` with an aria-label

Replace the outer `.columns` div with a `<nav>` element:

```html
<!-- BEFORE -->
<div class="columns">
  <div class="column">...</div>
  <div class="column">...</div>
</div>

<!-- AFTER -->
<nav class="columns" aria-label="Projects and profiles">
  <div class="column">...</div>
  <div class="column">...</div>
</nav>
```

No CSS changes are needed; the `.columns` selector applies to any element with that class.

### 3.2 — Convert link groups to unordered lists

Inside each `.column`, replace the `<p>` wrappers with a `<ul>` / `<li>` structure. This gives screen readers an accurate count ("list, 4 items").

```html
<!-- BEFORE -->
<div class="column">
  <p><a href="...">cmd-find</a></p>
  <p><a href="...">hrml</a></p>
  <p><a href="...">am2web</a></p>
  <p><a href="...">github</a></p>
</div>

<!-- AFTER -->
<div class="column">
  <ul>
    <li><a href="...">cmd-find</a></li>
    <li><a href="...">hrml</a></li>
    <li><a href="...">am2web</a></li>
    <li><a href="...">github</a></li>
  </ul>
</div>
```

Apply to both columns. Then add CSS to strip default list styling and match the existing visual appearance:

```css
.column ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.column li {
  margin: 0 0 12px 0;
  font-family: "Manrope", sans-serif;
  font-size: 28px;
}

.column li:last-child {
  margin-bottom: 0;
}
```

Inside the `max-width: 1068px` media query, add:

```css
.column li {
  font-size: 24px;
}
```

Remove the existing `.column p` rules entirely, since `<p>` tags are no longer used.

### 3.3 — Add `aria-label` to every link

Each link's visible text is a short project name or platform name that has no inherent meaning to a screen reader user. Add descriptive `aria-label` attributes:

```html
<!-- Column 1: Projects -->
<a href="https://cmd-find.app/" target="_blank" rel="noopener noreferrer"
   aria-label="cmd-find — semantically search any webpage">cmd-find</a>

<a href="https://owencmcgrath.github.io/hrml/web/" target="_blank" rel="noopener noreferrer"
   aria-label="hrml — markup language with homerow syntax">hrml</a>

<a href="https://www.am2web.com/login" target="_blank" rel="noopener noreferrer"
   aria-label="am2web — convert Apple Music XML into rich statistics">am2web</a>

<a href="https://github.com/owencmcgrath" target="_blank" rel="noopener noreferrer"
   aria-label="Owen McGrath's GitHub profile">github</a>

<!-- Column 2: Work and profiles -->
<a href="https://fnbo.com" target="_blank" rel="noopener noreferrer"
   aria-label="FNBO — First National Bank of Omaha">fnbo</a>

<a href="https://sameral-khateeb.github.io/MobsModeling/index.html" target="_blank" rel="noopener noreferrer"
   aria-label="Mobs Modeling — mobs simulation research project">mobs</a>

<a href="https://patternlife.com/" target="_blank" rel="noopener noreferrer"
   aria-label="Pattern — disability and life insurance provider">pattern</a>

<a href="https://www.linkedin.com/in/owen-mcgrath-ocm/" target="_blank" rel="noopener noreferrer"
   aria-label="Owen McGrath's LinkedIn profile">linkedin</a>
```

The key requirement is that every link has an `aria-label` that gives a screen reader user enough context to decide whether to follow it.

### 3.4 — Add visible focus indicators for keyboard navigation

No `:focus-visible` styles exist. Add the following to the main stylesheet, placed immediately after the existing `a:hover::after` rule:

```css
.column a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
  border-radius: 2px;
}

.column a:focus-visible::after {
  width: 100%;
}
```

This gives keyboard users a clear visible ring when tabbing through links, and also triggers the underline animation so the visual feedback matches hover behavior.

### 3.5 — Add a skip-link (optional but recommended)

Since the page is simple, this is a low-priority enhancement. But for completeness, add a skip link as the first child of `<body>`:

```html
<a href="#main-content" class="skip-link">Skip to content</a>
<div class="hero" id="main-content">
  ...
</div>
```

With corresponding CSS:

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  padding: 8px 16px;
  background: currentColor;
  color: #FAF9F6;
  z-index: 1000;
  text-decoration: none;
}

.skip-link:focus {
  position: fixed;
  top: 16px;
  left: 16px;
  width: auto;
  height: auto;
}
```

In dark mode, the skip link colors will invert naturally via `currentColor`. Verify this looks correct in both modes.

---

## Verification Checklist

After applying all changes, confirm:

- [ ] Page loads with no console errors
- [ ] Both font files still load and render correctly
- [ ] Fade-in animations still play on load
- [ ] All eight links open in new tabs and function correctly
- [ ] `rel="noopener noreferrer"` is present on all eight `<a>` tags
- [ ] CSP meta tag is in `<head>`
- [ ] Referrer-Policy meta tag is in `<head>`
- [ ] Tabbing through all links shows a visible focus ring
- [ ] Screen reader announces "Projects and profiles, navigation" for the nav region
- [ ] Screen reader announces list items with counts ("list, 4 items")
- [ ] Each link's `aria-label` is read aloud with its description
- [ ] Layout does not clip on a 320x480 viewport (smallest common mobile)
- [ ] Dark mode still applies correctly via `prefers-color-scheme`
- [ ] `prefers-reduced-motion` still disables animations
- [ ] Heading scales smoothly between 96px and 164px across viewport widths