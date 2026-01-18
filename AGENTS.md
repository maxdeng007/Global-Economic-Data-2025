# AGENTS.md - Global Economic Reports Project

## Project Overview
Static HTML economic reports for 29 countries worldwide. Each report contains interactive charts, bilingual support (Chinese/English), and responsive design. Features a main landing page (index.html) that links to all country reports.

## Build/Test/Lint Commands
This is a **static HTML project with no build system**.
- No build command required
- No tests configured
- No linting configured
- Simply open HTML files directly in browser

## Project Structure

```
Economic-Reports-Project/
├── index.html                  # Main landing page (29 countries overview)
├── AGENTS.md                   # This file - guidelines for agents
├── reports/                    # All country economic report HTML files
│   ├── Argentina-2025-Economic-Report.html
│   ├── Australia-2025-Economic-Report.html
│   ├── Austria-2025-Economic-Report.html
│   ├── Belgium-2025-Economic-Report.html
│   ├── Brazil-2025-Economic-Report.html
│   ├── Canada-2025-Economic-Report.html
│   ├── China-2025-Economic-Report.html
│   ├── Finland-2025-Economic-Report.html
│   ├── France-2025-Economic-Report.html
│   ├── Germany-2025-Economic-Report.html
│   ├── India-2025-Economic-Report.html
│   ├── Iraq-2025-Economic-Report.html
│   ├── Israel-2025-Economic-Report.html
│   ├── Italy-2025-Economic-Report.html
│   ├── Japan-2025-Economic-Report.html
│   ├── Mexico-2025-Economic-Report.html
│   ├── Netherlands-2025-Economic-Report.html
│   ├── Portugal-2025-Economic-Report.html
│   ├── Russia-2025-Economic-Report.html
│   ├── Singapore-2025-Economic-Report.html
│   ├── South-Korea-2025-Economic-Report.html
│   ├── Spain-2025-Economic-Report.html
│   ├── Sweden-2025-Economic-Report.html
│   ├── Switzerland-2025-Economic-Report.html
│   ├── Thailand-2025-Economic-Report.html
│   ├── UK-2025-Economic-Report.html
│   ├── USA-2025-Economic-Report.html
│   ├── Ukraine-2025-Economic-Report.html
│   └── Vietnam-2025-Economic-Report.html
├── sources/                    # Source markdown/txt files for data
│   ├── Argentina around 2025.txt
│   ├── Australia around 2025.md
│   ├── Austria around 2025.md
│   ├── Belgium around 2025.md
│   ├── Brazil around 2025.md
│   ├── Canada around 2025.md
│   ├── China 2025 around.md
│   ├── Finland around 2025.md
│   ├── France vers 2025.md
│   ├── Germany around 2025.md
│   ├── India around 2025.md
│   ├── Iraq around 2025.md
│   ├── Israel around 2025.md
│   ├── Italy around 2025.md
│   ├── Japan around 2025.md
│   ├── Mexico around 2025.md
│   ├── Netherlands around 2025.md
│   ├── Portugal around 2025.md
│   ├── Russia around 2025.md
│   ├── Singapore around 2025.md
│   ├── South Korea around 2025.md
│   ├── Spain around 2025.md
│   ├── Sweden around 2025.md
│   ├── Switzerland around 2025.md
│   ├── Thailand around 2025.md
│   ├── UK around 2025.md
│   ├── Ukraine around 2025.md
│   ├── United States around 2025.md
│   └── Vietnam around 2025.md
└── assets/                     # Shared assets (currently empty)
```

## Tech Stack
- **HTML5**: Semantic markup with data-i18n attributes for i18n
- **CSS**: Inline styles with CSS custom properties (variables)
- **JavaScript**: Inline, ES5+ syntax (var, function)
- **External Dependencies** (via CDN):
  - Chart.js 4.4.1: `https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js`
  - Font Awesome 6.4.0: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

## Code Style Guidelines

### HTML Structure
- **DOCTYPE & Language**: `<!DOCTYPE html>`, `<html lang="zh-CN">` (default Chinese)
- **Meta Tags**: Include viewport with user-scalable disabled
- **Section Comments**: Use uppercase commented dividers: `<!-- NAVBAR -->`, `<!-- FOOTER -->`
- **ID Naming**: lowercase, kebab-case: `mobileLangBtn`, `pcLangBtn`, `hamburger`
- **Data Attributes**: Use `data-i18n` for all translatable text
- **Semantics**: Use `<nav>`, `<section>`, `<footer>` for structure
- **Landing Page**: index.html uses simpler structure without Chart.js

### CSS Organization
- **Section Comments**: Uppercase with equals: `/* ========== NAVBAR ========== */`
- **CSS Variables**: Define in `:root` with country-specific colors first, then generic palette
  ```css
  :root {
      --de-black: #000000;   /* Country-specific */
      --de-yellow: #ffcc00;
      --gray-100: #f3f4f6;  /* Generic */
  }
  ```
- **Ordering**:
  1. Reset & Base
  2. CSS Variables
  3. Components (Navbar, Hero, etc.)
  4. Sections
  5. Responsive Media Queries (at end of style block)
- **Units**: Use `px` for precise sizing, `rem` for typography
- **Responsive**: Use `@media (min-width: 768px)` and `@media (min-width: 1024px)`
- **Color Palette**: Use CSS variables, never hardcode colors

### JavaScript Conventions
- **Variable Declaration**: Use `var` consistently (ES5 compatibility)
- **Naming**: camelCase for variables/functions: `switchLanguage()`, `renderAllCharts()`
- **Comment Sections**: Uppercase with equals: `// ========== LANGUAGE SWITCH FUNCTION ==========`
- **DOM Ready**: Wrap initialization in `document.addEventListener('DOMContentLoaded', ...)`
- **Event Listeners**: Always prevent default on button clicks
  ```javascript
  button.addEventListener('click', function(e) {
      e.preventDefault();
      // ...
  });
  ```
- **Chart Configuration** (country reports only):
  - Define all chart data objects before render functions
  - Use `labels.zh` and `labels.en` for bilingual labels
  - Define `chartColors` object for consistent colors
  - Call `renderAllCharts()` after DOM loads (300ms delay for mobile)
- **Language State**:
  - Initialize `var isZh = true` at top of script
  - Save to `localStorage` on switch
  - Update `document.documentElement.lang` on language change

### Bilingual (i18n) Pattern
1. **HTML Elements**: Add `data-i18n="keyName"` attribute
2. **Translations Object**: Define at top of script
   ```javascript
   var translations = {
       zh: { keyName: '中文文本' },
       en: { keyName: 'English text' }
   };
   ```
3. **Language Switch**: Update all `[data-i18n]` elements and re-render charts
4. **Chart Data**: Use nested labels object:
   ```javascript
   var data = {
       labels: {
           zh: ['标签1', '标签2'],
           en: ['Label 1', 'Label 2']
       },
       values: [10, 20]
   };
   ```

### Mobile Responsive Rules
- **Mobile-First**: Write base styles for mobile, override with media queries
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Navigation**: Hamburger menu on mobile, PC nav links on desktop
- **Charts**: Responsive height (250px mobile, 340px desktop)
- **Font Sizes**: Scale up on larger screens
- **Critical**: Use 300ms timeout before rendering charts for mobile performance

### Country-Specific Configuration
- **CSS Variables**: Add country color vars (e.g., `--jp-red: #BC002D` for Japan)
- **HTML Title**: Update title with country name
- **Flag Icon**: Use emoji in hero and navbar
- **Chart Data**: Update with country-specific economic data
- **Translations**: Update all text content in translations object

### File Naming
- **Source files**: `CountryName around 2025.md` (or .txt) in `sources/` directory
- **HTML reports**: `CountryName-2025-Economic-Report.html` in `reports/` directory
- **Landing page**: `index.html` in root directory

## Development Workflow
1. **Add new country**:
   - Create source file in `sources/` (e.g., `NewCountry around 2025.md`)
   - Generate HTML report following existing template in `reports/`
   - Update index.html to include new country card

2. **Update existing report**:
   - Edit markdown file in `sources/`
   - Regenerate HTML or manually update data sections
   - Update translations object with new text

3. **Test changes**:
   - Open index.html in browser
   - Verify all 29 country links work
   - Check language toggle functionality
   - Verify responsive design at different viewport sizes

## Landing Page (index.html) Features
- Hero section with animated background
- 4 featured countries (USA, China, Japan, Germany)
- 25 additional countries in grid layout
- Bilingual support (zh/en)
- Navbar with language toggle
- Responsive grid layout (1/2/3 columns based on viewport)
- Smooth hover animations on cards
- Footer with project description

## Country Report Features
- Navbar with navigation links and language toggle
- Hero section with country flag and stats
- Multiple sections: Salary, Household Income, GDP, Poverty/Benchmarks
- Interactive Chart.js visualizations (bar charts, etc.)
- Bilingual support with language switch
- Responsive design (mobile-first)
- Footer with data sources

## Notes
- No build step: changes are immediate
- Charts must re-render on language switch
- LocalStorage persists language preference across sessions
- Font Awesome used for icons (globe, hamburger, etc.)
- Chart.js configured for responsive design
- index.html serves as the main entry point with links to all reports
