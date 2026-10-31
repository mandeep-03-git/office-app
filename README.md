# Staff Tenure Tracker

A fast, lightweight, client-side web application for tracking employee service tenures, appointment dates, and termination dates with full dual-calendar support (**Bikram Sambat (B.S.)** and **Gregorian (A.D.)**).

**100% Website — No Backend, No API, No Installation Required.**  
Runs entirely in your web browser using HTML, CSS, and modern JavaScript. All data is persisted privately and securely in your browser's `localStorage`.

---

## Quick Start

Simply open [**`index.html`**](file:///c:/Users/Lenovo/Desktop/office-app/index.html) in any modern web browser (Chrome, Edge, Firefox, Safari):

- **Double-click** `index.html` directly on your computer.

### Sign In Credentials (Universal / Master)

- **Username ID:** `ops`
- **Password:** `password`

Runs completely offline. No web server, Python, Node.js, databases, or network connection required.

---

## Features

- **Dual Calendar Support (B.S. & A.D.)**:
  - Full Bikram Sambat calendar engine covering years 2000 B.S. through 2086 B.S.
  - One-click global toggle between A.D. and B.S.
  - Real-time date conversion while typing appointment and termination dates.
  - Impossible dates (e.g. Day 32 in a 31-day month) are automatically caught and flagged.

- **Level / Position**:
  - Teaching staff: Pre Primary, Primary, Lower Secondary, Secondary, ECA.
  - Administrative staff: Executive Director, Principal, Vice Principal, Finance Director, Admin Director, IT Incharge, Accounts Officer.
  - Non-Teaching staff: Receptionist, Librarian, Office Assistant, Driver, Canteen Staff, Support Staff, Security Guard, Counselor.
  - The dropdown changes automatically with the selected Department.

- **Automated Tenure & Status Tracking**:
  - **Status Categories**: Active, Upcoming, Ending Soon (within 30 days), Ends Today, Ended.
  - **Service Time Calculation**: Accurate calendar-aware differences (Years, Months, Days).
  - Customizable service time display: Full (Y, M, D), Years only, Months only, or Days only.

- **Multiple Views**:
  - **Dashboard**: Modern executive overview featuring 5 KPI metric cards (Total, Active, Upcoming, Ending Soon, Ended), attention alert banners, and 2 SVG vertical bar graphs ("Staff by Status" and "Service Tenure Distribution").
  - **Staff Directory**: Filterable and searchable table with real-time status badges, sorting by name/dates, and inline actions.
  - **Mini Excel in Browser**: Interactive spreadsheet view with formula bar, cell coordinate indicator (`fx`), and auto-saving inline editing.

- **Import from Excel / CSV**:
  - Upload `.csv` files or paste copied cells directly from Excel / Google Sheets (`Ctrl+V`).
  - Auto-detects delimiters (tab, comma, semicolon) and column headers.
  - Supports both **B.S.** and **A.D.** dates with instant validation and error highlighting.
  - Choose between **Append** (add to existing staff) or **Replace** (overwrite all).
  - One-click sample Excel CSV template download.

- **Export & Print**:
  - **CSV / Excel Export**: One-click export formatted with UTF-8 BOM so it opens seamlessly in Microsoft Excel with all columns intact (S.N., Name, Date of Appointment, Service Time, Date of Termination, Status).
  - **Clean Print Mode**: Print or Save to PDF in landscape with headers, clean borders, and clutter-free formatting.

- **Themes & Customization**:
  - 4 Built-in Themes: Default Notion, Black & White, Green Ledger, and Vanilla Old School (Calibri classic).
  - Adjustable text size (12px - 18px slider).
  - Selectable typography (Sans-serif, Calibri, Segoe UI, Serif, Mono).

- **Data Privacy & Management**:
  - Data is stored locally on your machine in browser `localStorage`.
  - Soft delete with instant "Undo" recovery.
  - Protected database purge with administrator password (`ops@123`).

---

## File Structure

```text
office-app/
├── index.html        # Main webpage
├── app.css           # Styling, themes, responsive layout, and print styles
├── app.js            # Pure client-side JavaScript (B.S. calendar, tenure math, storage, UI)
├── fonts/            # Offline bundled web fonts
└── README.md         # Documentation
```
