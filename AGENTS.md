# AGENTS.md — Repository Context for AI Agents

Static personal homepage (GitHub Pages). No build tools, no npm, no test framework.

## Quick Start

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

Edit `contents/*.md` and `contents/config.yml` for content. Edit `static/css/main.css` for styles.

## Page Map

| File | JS File | Content Source | Behavior |
|------|----------|---------------|-----------|
| `index.html` | `scripts.js` | `contents/{section}.md` | Single-page: home, articles, experience, publications, achievements, awards, share, links |
| `article.html` | `article.js` | `?name=` URL param → `contents/{name}.md` | Blog post reader |
| `articles.html` | `page.js` | Auto: `contents/articles.md` | Standalone articles page |
| `experience.html` | `page.js` | Auto: `contents/experience.md` | Standalone experience page |
| `publications.html` | `page.js` | Auto: `contents/publications.md` | Standalone publications page |

`page.js` detects its own page name from `window.location.pathname` and loads the matching `.md` file into `#page-md`.

## JS Architecture

`common.js` exports (must load first via `<script>` tag):
- `initTheme()` / `toggleTheme()` — theme via `data-theme` attribute + localStorage
- `addCopyButtonsToCodeBlocks()` — adds header + copy button to all `.main-body pre` blocks

| JS File | Role |
|---------|------|
| `scripts.js` | Homepage: dynamic config injection (iterates all YAML keys → DOM IDs), loads `section_names` markdown files, scrollspy, nav scroll effect, mouse glow, typewriter |
| `article.js` | Article page: URL param `?name=`, config load, markdown render, scroll animation |
| `page.js` | Generic subpage: auto-detects HTML filename → loads matching `.md`, config load |

**Script load order in HTML (must preserve):**
```html
<script src="static/js/bootstrap.bundle.min.js"></script>
<script src="static/js/marked.min.js"></script>
<script src="static/js/js-yaml.min.js"></script>
<script src="static/js/common.js"></script>   <!-- MUST be before page-specific JS -->
<script src="static/js/{scripts|article|page}.js"></script>
```

## Config → DOM Mapping

`contents/config.yml` keys map to DOM element IDs. `scripts.js` does this dynamically:
```js
Object.keys(yml).forEach(key => document.getElementById(key).innerHTML = yml[key])
```

Always match config key names to element IDs. Current keys: `title`, `page-top-title`, `top-section-bg-text`, `home-subtitle`, `articles-subtitle`, `achievements-subtitle`, `share-subtitle`, `links-subtitle`, `copyright-text`.

**Gotcha**: `article.js` does NOT use dynamic mapping — it hardcodes only `title` and `copyright-text`. If `article.html` needs other config values populated, add them explicitly.

## CSS Rules

- `static/css/styles.css` — Bootstrap 5.2.3 + Start Bootstrap New Age theme. **DO NOT EDIT** (minified vendor file)
- `static/css/main.css` — All custom styles. `@import "./styles.css"` at top.
- Theme variables: `:root` (light) and `[data-theme="dark"]` (dark), all prefixed `--h-*`
- Dark/light toggle: `document.documentElement.setAttribute('data-theme', ...)`

## MathJax

Loaded via CDN: `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js`
Config block is inline `<script>` in each HTML `<head>`. Supports `$...$` inline and `$$...$$` display math.

**Gotcha**: `scripts.js` calls `MathJax.typeset()` directly without guard. `article.js` and `page.js` correctly guard with `if (window.MathJax && window.MathJax.typesetPromise)`. If modifying `scripts.js`, add the same guard.

## Navigation Conventions

- `index.html` uses `#section-id` for same-page anchors
- Standalone pages (`articles.html`, `experience.html`, `publications.html`) are separate HTML files, not anchors
- All pages share identical navbar structure; standalone pages have "← 返回主页" brand link
- Active nav state is set via `class="nav-link active"` in HTML (not JS)

## section_names Array

In `scripts.js`, this array controls which markdown files load on the homepage:
```js
const section_names = ['home', 'articles', 'experience', 'publications', 'achievements', 'awards', 'share', 'links'];
```
Each name maps to `contents/{name}.md` → injected into `#{name}-md`.

## Known Issues to Avoid Worsening

1. **`scripts.js` MathJax call unguarded** — `MathJax.typeset()` will throw if MathJax hasn't loaded. Match the guard pattern in `article.js`.
2. **`article.js` config incomplete** — Only sets `title` and `copyright-text`. Original version also set `page-top-title`, `top-section-bg-text`, `github-link`, `license-link`, `license-name`. Verify `article.html` still has those IDs before adding them back.
3. **`addCopyButtonsToCodeBlocks()` scans full DOM** — Called once per section in `scripts.js` (8 times). Each call scans all `.main-body pre` elements, but guards against duplicates with `if (pre.querySelector('.code-block-header')) return`.
4. **Unused functions in `common.js`** — `initParticles()`, `initScrollIndicator()`, `initProgressBar()`, `initBackToTop()`, `createTimeline()`, `createCardGrid()` are defined but never called. Safe to remove or use.

## File Creation Checklist

When adding a new page (e.g., `foobar.html`):
1. Copy `experience.html` as template
2. Update `<title>`, top section heading, `#page-subtitle`, `#top-section-bg-text`
3. `page.js` auto-loads `contents/foobar.md` → `#page-md`
4. Create `contents/foobar.md`
5. Add nav link in `index.html` AND all standalone pages' navbars
6. Add section name to `section_names` array in `scripts.js` if it should appear on homepage
