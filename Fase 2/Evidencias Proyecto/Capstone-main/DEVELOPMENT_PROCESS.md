# Stock Management Webpage: Development Process

## Starting point

The project began as a clean webpage implementation. The repository contained a short project README and no existing application structure, framework, or stock-management code. To keep the first version easy to run and extend, the page was built with plain HTML, CSS, and JavaScript, without adding dependencies or a backend.

## Build steps

1. **Outlined the dashboard.** The page was organized around a sidebar, a dashboard header, inventory summary cards, a current-stock table, a quick-add form, a low-stock watchlist, and a recent-activity panel.
2. **Created the page structure.** `index.html` defines these sections, the form fields, and the element IDs used by the client-side behavior. It links the stylesheet and script and loads the Inter font from Google Fonts.
3. **Styled the interface.** `styles.css` establishes the color palette, typography, cards, table, status indicators, form controls, spacing, and responsive layouts for narrower screens.
4. **Added sample inventory and behavior.** `script.js` starts with five sample products. It renders the inventory table and watchlist, calculates total units, low-stock item count, and inventory value, filters products by name/category/SKU, and adds submitted items to the in-memory inventory list.
5. **Ran a local preview.** A lightweight Python HTTP server was started from the project directory and the page was opened at `http://localhost:8000` to inspect the rendered dashboard.
6. **Documented how to run it.** The README includes the local server command and a short feature overview.

## Current file responsibilities

- `index.html` — Dashboard markup and form fields.
- `styles.css` — Visual design and responsive behavior.
- `script.js` — Sample data, rendering, filtering, summary calculations, and quick-add interaction.
- `README.md` — Project overview and local run instructions.

## Current behavior and boundaries

The page is a front-end prototype. New items and changes exist only in the current browser page session; refreshing the page restores the sample inventory. There is no database, authentication, server-side validation, or persistent storage yet.

Some dashboard content is illustrative rather than connected to inventory data: monthly sales, warehouse health, navigation destinations, export, and the recent activity entries are currently static interface elements. The inventory search and quick-add form are functional in the browser.

## Run locally

From the project directory, run:

```bash
python -m http.server 8000 --directory public
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. Keep the server running while using the page.

## Possible next steps

1. Persist inventory between reloads, initially with browser storage or, for multi-user use, a backend and database.
2. Add edit, delete, and stock movement actions, with validation and an activity log based on actual changes.
3. Connect supplier, order, report, sales, and export interfaces to real data.
4. Add automated checks for inventory calculations, filtering, and form submission.
