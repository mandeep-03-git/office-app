(() => {
  "use strict";

  // ============================================================
  //  B.S. CALENDAR MODULE (ported from bscal.py)
  // ============================================================

  const BS_MIN_YEAR = 2000;
  const BS_MAX_YEAR = 2086;
  // BS_EPOCH_AD = April 14, 1943 (= 2000-01-01 B.S.)
  // Note: JS month is 0-indexed, so April = 3
  const BS_EPOCH_AD = new Date(1943, 3, 14);

  const BS_MONTH_DAYS = {
    2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2085: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2086: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  };

  const BS_MONTHS = ["Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
                     "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
  const AD_MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                     "August", "September", "October", "November", "December"];

  // Build cumulative year-start offsets for O(1) conversion
  const _YEAR_START = {};
  let _running = 0;
  for (let y = BS_MIN_YEAR; y <= BS_MAX_YEAR; y++) {
    _YEAR_START[y] = _running;
    const months = BS_MONTH_DAYS[y];
    for (let i = 0; i < 12; i++) _running += months[i];
  }
  const _TOTAL_BS_DAYS = _running;

  // AD range supported
  const AD_MIN = new Date(BS_EPOCH_AD.getTime());
  const AD_MAX = new Date(BS_EPOCH_AD.getTime());
  AD_MAX.setDate(AD_MAX.getDate() + _TOTAL_BS_DAYS - 1);

  // ---- Helper: pure-date (no time) from y, m, d
  function makeDate(y, m, d) {
    // m is 1-indexed
    return new Date(y, m - 1, d);
  }

  // ---- Helper: day difference between two Date objects (date only)
  function dayDiff(a, b) {
    const msA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const msB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((msB - msA) / 86400000);
  }

  // ---- Helper: compare two pure dates
  function dateEqual(a, b) { return dayDiff(a, b) === 0; }
  function dateLt(a, b) { return dayDiff(a, b) > 0; }
  function dateLte(a, b) { return dayDiff(a, b) >= 0; }
  function dateGt(a, b) { return dayDiff(a, b) < 0; }
  function dateGte(a, b) { return dayDiff(a, b) <= 0; }

  // ---- Helper: add days to a date
  function addDays(dt, n) {
    const r = new Date(dt.getTime());
    r.setDate(r.getDate() + n);
    return r;
  }

  // ---- Helper: days in AD month
  function adDaysInMonth(y, m) {
    // m is 1-indexed
    return new Date(y, m, 0).getDate();
  }

  // DateError class
  class DateError extends Error {
    constructor(msg) { super(msg); this.name = "DateError"; }
  }

  function cal_days_in_month(cal, y, m) {
    if (cal === "bs") {
      if (!(y in BS_MONTH_DAYS)) {
        throw new DateError("B.S. year must be between " + BS_MIN_YEAR + " and " + BS_MAX_YEAR);
      }
      if (m < 1 || m > 12) throw new DateError("Month must be between 1 and 12");
      return BS_MONTH_DAYS[y][m - 1];
    }
    if (y < 1 || y > 9999) throw new DateError("Invalid A.D. year");
    if (m < 1 || m > 12) throw new DateError("Month must be between 1 and 12");
    return adDaysInMonth(y, m);
  }

  function bs_to_ad(y, m, d) {
    const dim = cal_days_in_month("bs", y, m);
    if (d < 1 || d > dim) {
      throw new DateError(BS_MONTHS[m - 1] + " " + y + " has only " + dim + " days");
    }
    let offset = _YEAR_START[y];
    const months = BS_MONTH_DAYS[y];
    for (let i = 0; i < m - 1; i++) offset += months[i];
    offset += (d - 1);
    return addDays(BS_EPOCH_AD, offset);
  }

  function ad_to_bs(dt) {
    if (dateLt(dt, AD_MIN) || dateGt(dt, AD_MAX)) {
      const minIso = isoDate(AD_MIN);
      const maxIso = isoDate(AD_MAX);
      throw new DateError("Date is outside the supported range (" + minIso + " to " + maxIso + ")");
    }
    let offset = dayDiff(BS_EPOCH_AD, dt);
    let y = BS_MIN_YEAR;
    while (y < BS_MAX_YEAR && offset >= _YEAR_START[y + 1]) {
      y++;
    }
    offset -= _YEAR_START[y];
    const months = BS_MONTH_DAYS[y];
    for (let m = 0; m < 12; m++) {
      if (offset < months[m]) {
        return [y, m + 1, offset + 1];
      }
      offset -= months[m];
    }
    throw new DateError("Conversion failed");
  }

  function to_triple(cal, dt) {
    if (cal === "ad") return [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()];
    return ad_to_bs(dt);
  }

  function from_triple(cal, y, m, d) {
    if (cal === "bs") return bs_to_ad(y, m, d);
    const dim = cal_days_in_month("ad", y, m);
    if (d < 1 || d > dim) {
      throw new DateError(AD_MONTHS[m - 1] + " " + y + " has only " + dim + " days");
    }
    const dt = makeDate(y, m, d);
    if (dateLt(dt, AD_MIN) || dateGt(dt, AD_MAX)) {
      throw new DateError("Date must be between " + isoDate(AD_MIN) + " and " + isoDate(AD_MAX));
    }
    return dt;
  }

  function _add_months_cal(cal, triple, n) {
    let [y, m, d] = triple;
    let idx = y * 12 + (m - 1) + n;
    let ny = Math.floor(idx / 12);
    let nm = (idx % 12) + 1;
    if (nm <= 0) { nm += 12; ny--; }
    return [ny, nm, Math.min(d, cal_days_in_month(cal, ny, nm))];
  }

  function tripleGt(a, b) {
    if (a[0] !== b[0]) return a[0] > b[0];
    if (a[1] !== b[1]) return a[1] > b[1];
    return a[2] > b[2];
  }

  function diff_ymd(cal, a, b) {
    // a and b are Date objects, b >= a
    if (dateGt(a, b)) throw new DateError("diff_ymd needs a <= b");
    const A = to_triple(cal, a);
    const B = to_triple(cal, b);
    let n = (B[0] - A[0]) * 12 + (B[1] - A[1]);
    let anchor = _add_months_cal(cal, A, n);
    if (tripleGt(anchor, B)) {
      n -= 1;
      anchor = _add_months_cal(cal, A, n);
    }
    const anchor_date = from_triple(cal, anchor[0], anchor[1], anchor[2]);
    const years = Math.floor(n / 12);
    const months = n % 12;
    const days = dayDiff(anchor_date, b);
    const total_days = dayDiff(a, b);
    return { years, months, days, total_days };
  }

  function format_date(cal, dt) {
    const [y, m, d] = to_triple(cal, dt);
    if (cal === "bs") return d + " " + BS_MONTHS[m - 1] + " " + y;
    return d + " " + AD_MONTHS[m - 1].substring(0, 3) + " " + y;
  }

  function iso_bs(dt) {
    const [y, m, d] = ad_to_bs(dt);
    return String(y).padStart(4, "0") + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
  }

  // ---- Helper: ISO date string from Date object
  function isoDate(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  // ---- Helper: parse ISO date string to Date
  function parseISODate(str) {
    if (!str) return null;
    const parts = str.split("-");
    return makeDate(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
  }

  // ---- Helper: current today as Date object
  function currentToday() {
    return new Date();
  }

  // ---- Helper: today as pure Date (no time)
  function todayDate() {
    const n = new Date();
    return makeDate(n.getFullYear(), n.getMonth() + 1, n.getDate());
  }

  // ============================================================
  //  LOGIC MODULE (ported from logic.py)
  // ============================================================

  const SOON_DAYS = 30;
  const STATUS_LABEL = {
    active: "Active",
    upcoming: "Upcoming",
    ends_today: "Ends today",
    ended: "Ended",
  };

  function _plural(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  function short_duration(d) {
    const parts = [];
    if (d.years) parts.push(d.years + "y");
    if (d.months) parts.push(d.months + "m");
    if (d.days || !parts.length) parts.push(d.days + "d");
    return parts.join(" ");
  }

  function long_duration(d) {
    const parts = [];
    if (d.years) parts.push(_plural(d.years, "year"));
    if (d.months) parts.push(_plural(d.months, "month"));
    if (d.days || !parts.length) parts.push(_plural(d.days, "day"));
    return parts.join(", ") + " (" + _plural(d.total_days, "day") + " total)";
  }

  function _relative(d, past) {
    if (d.total_days === 0) return "today";
    const s = short_duration(d);
    return past ? s + " ago" : "in " + s;
  }

  function _duration_obj(d, text) {
    return {
      years: d.years, months: d.months, days: d.days,
      total_days: d.total_days, text: text, long: long_duration(d),
    };
  }

  function date_view(dt, cal) {
    const other = cal === "ad" ? "bs" : "ad";
    const [ay, am, ad_] = to_triple("ad", dt);
    const [by, bm, bd] = ad_to_bs(dt);
    return {
      iso: isoDate(dt),
      ad: { y: ay, m: am, d: ad_ },
      bs: { y: by, m: bm, d: bd },
      label: format_date(cal, dt),
      alt: format_date(other, dt),
    };
  }

  function today_view(today) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const out = {
      iso: isoDate(today),
      weekday: weekdays[today.getDay()],
      ad_label: format_date("ad", today),
    };
    try {
      out.bs_label = format_date("bs", today);
      const [by, bm, bd] = ad_to_bs(today);
      out.bs = { y: by, m: bm, d: bd };
    } catch (e) {
      out.bs_label = null;
      out.bs = null;
    }
    return out;
  }

  function status_of(join, term, today) {
    if (dateGt(join, today)) return "upcoming";
    if (term === null || dateGt(term, today)) return "active";
    if (dateEqual(term, today)) return "ends_today";
    return "ended";
  }

  function employee_view(row, today, cal) {
    const join = parseISODate(row.join_date);
    const term = row.term_date ? parseISODate(row.term_date) : null;
    const status = status_of(join, term, today);

    // how long since joining (or until they start)
    let since_join;
    if (dateLte(join, today)) {
      const d = diff_ymd(cal, join, today);
      since_join = _duration_obj(d, _relative(d, true));
    } else {
      const d = diff_ymd(cal, today, join);
      since_join = _duration_obj(d, _relative(d, false));
    }

    // how long until termination (or since it happened)
    let until_term = null;
    if (term !== null) {
      if (dateGte(term, today)) {
        const d = diff_ymd(cal, today, term);
        until_term = _duration_obj(d, _relative(d, false));
      } else {
        const d = diff_ymd(cal, term, today);
        until_term = _duration_obj(d, _relative(d, true));
      }
    }

    // time served
    let tenure = null;
    if (dateLte(join, today)) {
      const end = (term !== null && dateLt(term, today)) ? term : today;
      const d = diff_ymd(cal, join, end);
      tenure = _duration_obj(d, short_duration(d));
    }

    const ending_soon = (status === "active" || status === "ends_today") &&
      term !== null && dayDiff(today, term) <= SOON_DAYS;

    return {
      id: row.id,
      name: row.name,
      join: date_view(join, cal),
      term: term ? date_view(term, cal) : null,
      status: status,
      status_label: STATUS_LABEL[status],
      ending_soon: ending_soon,
      since_join: since_join,
      until_term: until_term,
      tenure: tenure,
    };
  }

  function summarize(views) {
    return {
      total: views.length,
      active: views.filter(v => v.status === "active" || v.status === "ends_today").length,
      upcoming: views.filter(v => v.status === "upcoming").length,
      ended: views.filter(v => v.status === "ended").length,
      ending_soon: views.filter(v => v.ending_soon).length,
    };
  }

  // ============================================================
  //  DATA / DB MODULE (localStorage-based, ported from db.py)
  // ============================================================

  function _now() {
    return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  }

  function _loadEmployees() {
    try {
      const raw = localStorage.getItem("employees");
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function _saveEmployees(arr) {
    localStorage.setItem("employees", JSON.stringify(arr));
  }

  function _getNextId() {
    try {
      const v = localStorage.getItem("nextId");
      return v ? parseInt(v, 10) : 1;
    } catch (e) { return 1; }
  }

  function _setNextId(n) {
    localStorage.setItem("nextId", String(n));
  }

  function db_list_employees() {
    const all = _loadEmployees();
    return all
      .filter(e => !e.deleted_at)
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) || a.id - b.id);
  }

  function db_add_employee(name, join_iso, term_iso) {
    const all = _loadEmployees();
    const id = _getNextId();
    const now = _now();
    all.push({
      id: id,
      name: name,
      join_date: join_iso,
      term_date: term_iso || null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    });
    _saveEmployees(all);
    _setNextId(id + 1);
    return id;
  }

  function db_update_employee(id, name, join_iso, term_iso) {
    const all = _loadEmployees();
    const emp = all.find(e => e.id === id && !e.deleted_at);
    if (!emp) return false;
    emp.name = name;
    emp.join_date = join_iso;
    emp.term_date = term_iso || null;
    emp.updated_at = _now();
    _saveEmployees(all);
    return true;
  }

  function db_soft_delete(id) {
    const all = _loadEmployees();
    const emp = all.find(e => e.id === id && !e.deleted_at);
    if (!emp) return false;
    const now = _now();
    emp.deleted_at = now;
    emp.updated_at = now;
    _saveEmployees(all);
    return true;
  }

  function db_restore(id) {
    const all = _loadEmployees();
    const emp = all.find(e => e.id === id && e.deleted_at);
    if (!emp) return false;
    emp.deleted_at = null;
    emp.updated_at = _now();
    _saveEmployees(all);
    return true;
  }

  function db_purge() {
    const all = _loadEmployees();
    const count = all.length;
    _saveEmployees([]);
    return count;
  }

  // ============================================================
  //  VALIDATION (ported from app.py parse_employee)
  // ============================================================

  class ApiError extends Error {
    constructor(message, field) {
      super(message);
      this.name = "ApiError";
      this.field = field || null;
    }
  }

  function _int(value, label, field) {
    if (typeof value === "boolean") throw new ApiError(label + " is not a valid number.", field);
    const str = String(value).trim();
    const n = parseInt(str, 10);
    if (isNaN(n) || String(n) !== str) throw new ApiError(label + " is not a valid number.", field);
    return n;
  }

  function parse_date_field(obj, field, label, required) {
    if (obj == null || (typeof obj === "object" && [obj.y, obj.m, obj.d].every(v => v == null || v === ""))) {
      if (required) throw new ApiError(label + " is required.", field);
      return null;
    }
    if (typeof obj !== "object") throw new ApiError(label + " is not valid.", field);
    const cal = obj.cal;
    if (cal !== "ad" && cal !== "bs") throw new ApiError("Choose A.D. or B.S. for the " + label.toLowerCase() + ".", field);
    if ([obj.y, obj.m, obj.d].some(v => v == null || v === "")) {
      throw new ApiError("Fill in the year, month and day for the " + label.toLowerCase() + ".", field);
    }
    const y = _int(obj.y, label, field);
    const m = _int(obj.m, label, field);
    const d = _int(obj.d, label, field);
    try {
      return from_triple(cal, y, m, d);
    } catch (e) {
      if (e instanceof DateError) throw new ApiError(label + ": " + e.message, field);
      throw e;
    }
  }

  function parse_employee(payload) {
    if (typeof payload !== "object" || payload === null) throw new ApiError("Invalid request.");
    let name = payload.name;
    if (typeof name !== "string") throw new ApiError("Enter the employee's name.", "name");
    name = name.replace(/\s+/g, " ").trim();
    if (!name) throw new ApiError("Enter the employee's name.", "name");
    if (name.length > 120) throw new ApiError("Name is too long (120 characters at most).", "name");
    for (let i = 0; i < name.length; i++) {
      if (name.charCodeAt(i) < 32) throw new ApiError("Name contains characters that aren't allowed.", "name");
    }
    const join = parse_date_field(payload.join, "join", "Joining date", true);
    const term = parse_date_field(payload.term, "term", "Termination date", false);
    if (term !== null && dateLt(term, join)) {
      throw new ApiError("Termination date can't be before the joining date.", "term");
    }
    return { name, join_iso: isoDate(join), term_iso: term ? isoDate(term) : null };
  }

  // ============================================================
  //  EXPORT MODULE (CSV export, ported from export.py)
  // ============================================================

  function formatServiceTimeExport(tenure, serviceUnit) {
    if (!tenure) return "Not started";
    const totalDays = tenure.total_days;
    if (totalDays === 0) return "0 days";
    if (serviceUnit === "years") {
      const yrs = (totalDays / 365.25).toFixed(1);
      return yrs + " years (" + totalDays + "d)";
    }
    if (serviceUnit === "months") {
      const mos = Math.round(totalDays / 30.4375);
      return mos + " months (" + totalDays + "d)";
    }
    if (serviceUnit === "days") {
      return totalDays.toLocaleString() + " days";
    }
    return tenure.text || "";
  }

  function escapeCSV(val) {
    const str = String(val == null ? "" : val);
    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  function buildCSV(views, cal, serviceUnit) {
    const headers = ["S.N.", "Name", "Date of Appointment", "Service Time", "Date of Termination", "Status"];
    const rows = [headers.map(escapeCSV).join(",")];

    views.forEach((v, i) => {
      const join = parseISODate(v.join.iso);
      const term = v.term ? parseISODate(v.term.iso) : null;
      let joinStr, termStr;
      if (cal === "bs") {
        joinStr = iso_bs(join);
        termStr = term ? iso_bs(term) : "";
      } else {
        joinStr = v.join.iso;
        termStr = term ? v.term.iso : "";
      }
      const serviceStr = formatServiceTimeExport(v.tenure, serviceUnit);
      const statusStr = v.status_label || "";
      const row = [i + 1, v.name, joinStr, serviceStr, termStr, statusStr];
      rows.push(row.map(escapeCSV).join(","));
    });

    return rows.join("\r\n");
  }

  function downloadCSV(views, cal, serviceUnit) {
    const csv = buildCSV(views, cal, serviceUnit);
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const today = isoDate(todayDate());
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees-" + today + ".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


  // ============================================================
  //  DOM HELPERS
  // ============================================================

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }

  const storeUtil = {
    get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignored */ } },
  };

  const localISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const CAL_NAME = { ad: "A.D.", bs: "B.S." };
  const FILTERS = [
    ["all", "All"], ["active", "Active"], ["upcoming", "Upcoming"],
    ["soon", "Ending soon"], ["ended", "Ended"],
  ];

  // Build the static calendar object (replaces /api/calendar)
  const S_calendar = {
    bs_days: {},
    bs_months: BS_MONTHS,
    ad_months: AD_MONTHS,
    bs_range: [BS_MIN_YEAR, BS_MAX_YEAR],
    ad_range: [isoDate(AD_MIN), isoDate(AD_MAX)],
  };
  for (const y in BS_MONTH_DAYS) {
    S_calendar.bs_days[y] = BS_MONTH_DAYS[y].slice();
  }


  // ============================================================
  //  APP STATE
  // ============================================================

  const S = {
    cal: storeUtil.get("cal", "bs") === "ad" ? "ad" : "bs",
    activeTab: storeUtil.get("activeTab", "dashboard"),
    serviceUnit: storeUtil.get("serviceUnit", "full"),
    data: null,
    calendar: S_calendar,
    filter: storeUtil.get("filter", "all"),
    q: "",
    sort: { key: "name", dir: 1 },
    error: null,
  };


  // ============================================================
  //  SETTINGS & THEMES
  // ============================================================

  function initSettings() {
    let theme = storeUtil.get("theme", "default");
    if (theme === "notion") theme = "default";
    const font = storeUtil.get("font", "sans");
    const textSize = storeUtil.get("textSize", "14");

    document.body.dataset.theme = theme;
    document.body.dataset.font = font;
    document.documentElement.style.setProperty("--base-size", textSize + "px");

    const slider = $("#textSizeSlider");
    const valLabel = $("#textSizeVal");
    if (slider) slider.value = textSize;
    if (valLabel) valLabel.textContent = textSize + "px";

    syncSettingButtons();
  }

  function syncSettingButtons() {
    const theme = document.body.dataset.theme || "default";
    const font = document.body.dataset.font || "sans";
    const serviceUnit = S.serviceUnit;

    $$("#themeOptions .theme-btn").forEach(btn => {
      btn.setAttribute("aria-pressed", btn.dataset.theme === theme ? "true" : "false");
    });
    $$("#fontOptions .chip-btn").forEach(btn => {
      btn.setAttribute("aria-pressed", btn.dataset.font === font ? "true" : "false");
    });
    $$("#serviceFormatOptions .chip-btn").forEach(btn => {
      btn.setAttribute("aria-pressed", btn.dataset.serviceUnit === serviceUnit ? "true" : "false");
    });
  }

  // Theme switchers
  $$("#themeOptions .theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      document.body.dataset.theme = theme;
      storeUtil.set("theme", theme);
      syncSettingButtons();
    });
  });

  // Font switchers
  $$("#fontOptions .chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const font = btn.dataset.font;
      document.body.dataset.font = font;
      storeUtil.set("font", font);
      syncSettingButtons();
    });
  });

  // Service time format options
  $$("#serviceFormatOptions .chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const unit = btn.dataset.serviceUnit;
      S.serviceUnit = unit;
      storeUtil.set("serviceUnit", unit);
      syncSettingButtons();
      render();
    });
  });

  // Text size slider
  const sizeSlider = $("#textSizeSlider");
  if (sizeSlider) {
    sizeSlider.addEventListener("input", (e) => {
      const val = e.target.value;
      document.documentElement.style.setProperty("--base-size", val + "px");
      $("#textSizeVal").textContent = val + "px";
      storeUtil.set("textSize", val);
    });
  }

  // Settings Sidebar Drawer
  const sidebar = $("#sidebar");
  const sidebarBackdrop = $("#sidebarBackdrop");

  function openSidebar() {
    sidebar.hidden = false;
    sidebarBackdrop.hidden = false;
  }

  function closeSidebar() {
    sidebar.hidden = true;
    sidebarBackdrop.hidden = true;
  }

  $("#settingsBtn").addEventListener("click", openSidebar);
  $("#sidebarClose").addEventListener("click", closeSidebar);
  sidebarBackdrop.addEventListener("click", closeSidebar);

  // Remove Exit App button functionality (no app to exit)
  const exitAppBtn = $("#exitAppBtn");
  if (exitAppBtn) {
    exitAppBtn.style.display = "none";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !sidebar.hidden) {
      closeSidebar();
    }
  });


  // ============================================================
  //  TAB NAVIGATION
  // ============================================================

  function switchTab(tabName) {
    S.activeTab = tabName;
    storeUtil.set("activeTab", tabName);

    $$(".nav-tab").forEach(tab => {
      const isActive = tab.id === `tab-${tabName}`;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    $("#view-dashboard").hidden = tabName !== "dashboard";
    $("#view-directory").hidden = tabName !== "directory";
    $("#view-excel").hidden = tabName !== "excel";

    render();
  }

  $("#tab-dashboard").addEventListener("click", () => switchTab("dashboard"));
  $("#tab-directory").addEventListener("click", () => switchTab("directory"));
  $("#tab-excel").addEventListener("click", () => switchTab("excel"));

  const dashGoDir = $("#dashGoDirectory");
  if (dashGoDir) dashGoDir.addEventListener("click", () => switchTab("directory"));
  const dashGoExc = $("#dashGoExcel");
  if (dashGoExc) dashGoExc.addEventListener("click", () => switchTab("excel"));

  // Make stat cards clickable to jump to directory with that filter
  $$(".dash-stat-card[data-filter-target]").forEach(card => {
    card.addEventListener("click", () => {
      const targetFilter = card.dataset.filterTarget;
      if (targetFilter) {
        S.filter = targetFilter;
        store.set("filter", targetFilter);
        switchTab("directory");
      }
    });
  });


  // ============================================================
  //  DATA LOADING (localStorage-based refresh)
  // ============================================================

  function refresh(highlightId) {
    try {
      const today = todayDate();
      const rows = db_list_employees();
      const views = rows.map(r => employee_view(r, today, S.cal));
      const summary = summarize(views);
      const todayV = today_view(today);
      S.data = {
        today: todayV,
        cal: S.cal,
        employees: views,
        summary: summary,
      };
      S.error = null;
    } catch (e) {
      S.error = e.message;
    }
    render(highlightId);
  }


  // ============================================================
  //  SERVICE TIME FORMATTING
  // ============================================================

  function formatServiceTime(tenure) {
    if (!tenure) return "Not started";
    const totalDays = tenure.total_days;
    if (totalDays === 0) return "0 days";

    if (S.serviceUnit === "years") {
      const yrs = (totalDays / 365.25).toFixed(1);
      return `${yrs} years (${totalDays}d)`;
    }
    if (S.serviceUnit === "months") {
      const mos = Math.round(totalDays / 30.4375);
      return `${mos} months (${totalDays}d)`;
    }
    if (S.serviceUnit === "days") {
      return `${totalDays.toLocaleString()} days`;
    }
    return tenure.text;
  }


  // ============================================================
  //  STATUS & FILTERING
  // ============================================================

  function displayStatus(e) {
    if (e.status === "ended") return ["ended", "Ended"];
    if (e.status === "upcoming") return ["upcoming", "Upcoming"];
    if (e.status === "ends_today") return ["soon", "Ends today"];
    if (e.ending_soon) return ["soon", "Ending soon"];
    return ["active", "Active"];
  }

  function matchesFilter(e) {
    switch (S.filter) {
      case "active": return e.status === "active" || e.status === "ends_today";
      case "upcoming": return e.status === "upcoming";
      case "soon": return e.ending_soon;
      case "ended": return e.status === "ended";
      default: return true;
    }
  }

  function sortValue(e, key) {
    if (key === "name") return e.name.toLocaleLowerCase();
    if (key === "join") return e.join.iso;
    if (key === "term") return e.term ? e.term.iso : null;
    if (key === "served") return e.tenure ? e.tenure.total_days : null;
    return null;
  }

  function visibleRows() {
    if (!S.data || !S.data.employees) return [];
    const q = S.q.trim().toLocaleLowerCase();
    const rows = S.data.employees.filter(e => matchesFilter(e) && (!q || e.name.toLocaleLowerCase().includes(q)));
    const { key, dir } = S.sort;
    rows.sort((a, b) => {
      const va = sortValue(a, key), vb = sortValue(b, key);
      if (va === null && vb === null) return 0;
      if (va === null) return 1;
      if (vb === null) return -1;
      const c = typeof va === "string" ? va.localeCompare(vb) : va - vb;
      return c * dir || a.name.localeCompare(b.name);
    });
    return rows;
  }


  // ============================================================
  //  RENDER HELPERS
  // ============================================================

  function renderTodaySubtle() {
    const el = $("#todaySubtle");
    if (!el) return;
    if (!S.data || !S.data.today) {
      el.textContent = "";
      return;
    }
    const t = S.data.today;
    if (S.cal === "bs") {
      el.textContent = t.bs_label ? `Today: ${t.weekday}, ${t.bs_label} B.S.` : `Today: ${t.weekday}`;
    } else {
      el.textContent = `Today: ${t.weekday}, ${t.ad_label} A.D.`;
    }
  }

  function renderCalToggle() {
    const adBtn = $("#cal-ad");
    const bsBtn = $("#cal-bs");
    if (!adBtn || !bsBtn) return;
    adBtn.setAttribute("aria-checked", S.cal === "ad" ? "true" : "false");
    bsBtn.setAttribute("aria-checked", S.cal === "bs" ? "true" : "false");

    const exportLabel = $("#exportBtnLabel");
    if (exportLabel) {
      exportLabel.textContent = `Export (${S.cal.toUpperCase()})`;
    }
  }


  // ============================================================
  //  1. DASHBOARD VIEW (KPI METRICS + BAR GRAPHS)
  // ============================================================

  // Helper to create SVG elements
  function svgEl(tag, attrs = {}) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v != null) el.setAttribute(k, String(v));
    }
    return el;
  }

  // Vertical Bar Graph Generator (Real 2D Bar Graph with Y-Axis, Gridlines, Vertical Bars, X-Axis)
  function createVerticalBarChartSvg({ items, totalCount, onBarClick }) {
    const svgWidth = 440;
    const svgHeight = 210;
    const marginLeft = 38;
    const marginRight = 16;
    const marginTop = 26;
    const marginBottom = 44;
    const plotWidth = svgWidth - marginLeft - marginRight;
    const plotHeight = svgHeight - marginTop - marginBottom;
    const plotBottom = marginTop + plotHeight;

    const rawMax = Math.max(...items.map(it => it.count), 0);
    let yMax = Math.max(rawMax, 2);
    if (yMax <= 4) {
      yMax = Math.max(yMax, 2);
    } else if (yMax <= 10) {
      if (yMax % 2 !== 0) yMax += 1;
    } else {
      yMax = Math.ceil(yMax / 5) * 5;
    }

    const svg = svgEl("svg", {
      viewBox: `0 0 ${svgWidth} ${svgHeight}`,
      class: "v-bar-svg",
      role: "img"
    });

    // 4 Horizontal Grid Lines and Y-Axis Numerical Tick Labels
    const numTicks = 4;
    for (let i = 0; i <= numTicks; i++) {
      const val = Math.round((yMax / numTicks) * i);
      const y = plotBottom - (i / numTicks) * plotHeight;

      if (i > 0) {
        const line = svgEl("line", {
          x1: marginLeft,
          y1: y,
          x2: svgWidth - marginRight,
          y2: y,
          class: "v-grid-line"
        });
        svg.appendChild(line);
      }

      const text = svgEl("text", {
        x: marginLeft - 8,
        y: y + 4,
        "text-anchor": "end",
        class: "v-axis-text"
      });
      text.textContent = String(val);
      svg.appendChild(text);
    }

    // Base X-axis Line
    const axisLine = svgEl("line", {
      x1: marginLeft,
      y1: plotBottom,
      x2: svgWidth - marginRight,
      y2: plotBottom,
      class: "v-axis-line"
    });
    svg.appendChild(axisLine);

    // Vertical Bars
    const numItems = items.length;
    const slotWidth = plotWidth / numItems;
    const barWidth = Math.min(44, Math.max(24, slotWidth * 0.58));

    items.forEach((item, idx) => {
      const barX = marginLeft + (idx * slotWidth) + (slotWidth - barWidth) / 2;
      const ratio = item.count / yMax;
      const barHeight = Math.round(ratio * plotHeight);
      const barY = plotBottom - barHeight;
      const pct = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;

      const group = svgEl("g", {
        class: "v-bar-group",
        tabindex: "0",
        role: "button"
      });

      const titleEl = svgEl("title");
      titleEl.textContent = `${item.label}: ${item.count} staff (${pct}%)`;
      group.appendChild(titleEl);

      // Hit area target
      const target = svgEl("rect", {
        x: marginLeft + (idx * slotWidth),
        y: marginTop,
        width: slotWidth,
        height: plotHeight + marginBottom,
        class: "v-bar-target",
        rx: "4"
      });
      group.appendChild(target);

      // Vertical Bar Rect
      if (item.count > 0) {
        const bar = svgEl("rect", {
          x: barX,
          y: barY,
          width: barWidth,
          height: Math.max(barHeight, 3),
          rx: "4",
          ry: "4",
          class: `v-bar-rect ${item.rectClass}`
        });
        group.appendChild(bar);
      } else {
        const zeroBar = svgEl("rect", {
          x: barX,
          y: plotBottom - 2,
          width: barWidth,
          height: 2,
          rx: "1",
          class: "v-bar-rect",
          fill: "var(--line)"
        });
        group.appendChild(zeroBar);
      }

      // Value label on top of bar
      const valText = svgEl("text", {
        x: barX + barWidth / 2,
        y: item.count > 0 ? Math.min(barY - 6, plotBottom - 8) : plotBottom - 6,
        "text-anchor": "middle",
        class: `v-bar-val ${item.count === 0 ? "v-bar-val--zero" : ""}`
      });
      valText.textContent = String(item.count);
      group.appendChild(valText);

      // Category label below X-axis
      const labelText = svgEl("text", {
        x: barX + barWidth / 2,
        y: plotBottom + 18,
        "text-anchor": "middle",
        class: "v-bar-label"
      });
      labelText.textContent = item.label;
      group.appendChild(labelText);

      // Percentage below category label
      const pctText = svgEl("text", {
        x: barX + barWidth / 2,
        y: plotBottom + 32,
        "text-anchor": "middle",
        class: "v-bar-pct"
      });
      pctText.textContent = `${pct}%`;
      group.appendChild(pctText);

      if (onBarClick) {
        group.addEventListener("click", () => onBarClick(item));
        group.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onBarClick(item);
          }
        });
      }

      svg.appendChild(group);
    });

    const wrap = document.createElement("div");
    wrap.className = "v-bar-svg-wrap";
    wrap.appendChild(svg);
    return wrap;
  }

  // 3. Status Distribution Bar Graph
  function renderStatusChart(s) {
    const statusContainer = $("#statusChartBody");
    if (!statusContainer) return;
    statusContainer.replaceChildren();

    if (s.total === 0) {
      statusContainer.append(h("div", { class: "chart-empty", text: "No staff records added yet." }));
      return;
    }

    const statusItems = [
      { key: "active", label: "Active", count: s.active, rectClass: "v-bar-rect--active" },
      { key: "upcoming", label: "Upcoming", count: s.upcoming, rectClass: "v-bar-rect--upcoming" },
      { key: "soon", label: "Ending Soon", count: s.ending_soon, rectClass: "v-bar-rect--soon" },
      { key: "ended", label: "Ended", count: s.ended, rectClass: "v-bar-rect--ended" },
    ];

    const chart = createVerticalBarChartSvg({
      items: statusItems,
      totalCount: s.total,
      onBarClick: (item) => {
        S.filter = item.key;
        storeUtil.set("filter", item.key);
        switchTab("directory");
      }
    });

    statusContainer.appendChild(chart);
  }

  // 4. Service Tenure Distribution Bar Graph
  function renderTenureChart(employees) {
    const tenureContainer = $("#tenureChartBody");
    if (!tenureContainer) return;
    tenureContainer.replaceChildren();

    const activeStaff = employees.filter(e => e.status === "active" || e.status === "ends_today");

    if (activeStaff.length === 0) {
      tenureContainer.append(h("div", { class: "chart-empty", text: "No active staff records currently." }));
      return;
    }

    const buckets = [
      { label: "< 1 Yr", minDays: 0, maxDays: 365, count: 0, rectClass: "v-bar-rect--tenure" },
      { label: "1–3 Yrs", minDays: 365, maxDays: 1095, count: 0, rectClass: "v-bar-rect--tenure" },
      { label: "3–5 Yrs", minDays: 1095, maxDays: 1826, count: 0, rectClass: "v-bar-rect--tenure" },
      { label: "5–10 Yrs", minDays: 1826, maxDays: 3652, count: 0, rectClass: "v-bar-rect--tenure" },
      { label: "10+ Yrs", minDays: 3652, maxDays: Infinity, count: 0, rectClass: "v-bar-rect--tenure" },
    ];

    activeStaff.forEach(e => {
      const days = e.tenure ? e.tenure.total_days : 0;
      for (const b of buckets) {
        if (days >= b.minDays && days < b.maxDays) {
          b.count++;
          break;
        }
      }
    });

    const chart = createVerticalBarChartSvg({
      items: buckets,
      totalCount: activeStaff.length,
      onBarClick: () => {
        S.filter = "active";
        storeUtil.set("filter", "active");
        switchTab("directory");
      }
    });

    tenureContainer.appendChild(chart);
  }

  function renderDashboard() {
    if (!S.data) return;
    const s = S.data.summary;
    const employees = S.data.employees || [];

    // 1. KPI Metric numbers
    const totalEl = $("#dashTotal");
    const activeEl = $("#dashActive");
    const upcomingEl = $("#dashUpcoming");
    const soonEl = $("#dashSoon");
    const endedEl = $("#dashEnded");

    if (totalEl) totalEl.textContent = String(s.total);
    if (activeEl) activeEl.textContent = String(s.active);
    if (upcomingEl) upcomingEl.textContent = String(s.upcoming);
    if (soonEl) soonEl.textContent = String(s.ending_soon);
    if (endedEl) endedEl.textContent = String(s.ended);

    // Badges
    const chartTotalBadge = $("#chartTotalBadge");
    if (chartTotalBadge) chartTotalBadge.textContent = `${s.total} Staff`;
    const chartActiveBadge = $("#chartActiveBadge");
    if (chartActiveBadge) chartActiveBadge.textContent = `${s.active} Active`;

    // 2. Alert Banner (Staff Ending Soon / Today)
    const alertSection = $("#dashAlertSection");
    const alertList = $("#dashAlertList");
    if (alertSection && alertList) {
      const urgentStaff = employees.filter(e => e.status === "ends_today" || e.ending_soon);
      if (urgentStaff.length > 0) {
        alertSection.hidden = false;
        alertList.replaceChildren();
        urgentStaff.forEach(e => {
          const pill = h("div", {
            class: "dash-alert-pill",
            role: "button",
            tabindex: "0",
            title: `View ${e.name} in directory`,
            onclick: () => {
              S.filter = "soon";
              storeUtil.set("filter", "soon");
              switchTab("directory");
            }
          },
            h("div", { style: "display: flex; align-items: center; gap: 8px;" },
              h("span", { class: "dash-alert-pill__name", text: e.name }),
              e.term ? h("span", { class: "dash-alert-pill__date", text: `(Termination: ${e.term.label})` }) : null
            ),
            h("span", {
              class: "dash-alert-pill__tag",
              text: e.status === "ends_today" ? "Ends today" : (e.until_term ? e.until_term.text : "Ending soon")
            })
          );
          alertList.append(pill);
        });
      } else {
        alertSection.hidden = true;
      }
    }

    // 3. Status Distribution Vertical Bar Graph
    renderStatusChart(s);

    // 4. Service Tenure Distribution Vertical Bar Graph
    renderTenureChart(employees);
  }


  // ============================================================
  //  2. DIRECTORY VIEW
  // ============================================================

  function renderFilters() {
    const box = $("#filters");
    box.replaceChildren();
    if (!S.data) return;
    const s = S.data.summary;
    const counts = { all: s.total, active: s.active, upcoming: s.upcoming, soon: s.ending_soon, ended: s.ended };
    for (const [key, label] of FILTERS) {
      const btn = h("button", {
        class: "filter", type: "button", "aria-pressed": S.filter === key ? "true" : "false",
        onclick: () => {
          S.filter = key;
          storeUtil.set("filter", key);
          render();
        },
      }, label, h("span", { class: "filter__n", text: String(counts[key]) }));
      box.append(btn);
    }
  }

  function th_el(label, key, isNum) {
    const thEl = h("th", { scope: "col", class: isNum ? "th-num" : "" });
    if (!key) {
      thEl.textContent = label;
      return thEl;
    }
    const active = S.sort.key === key;
    thEl.setAttribute("aria-sort", active ? (S.sort.dir === 1 ? "ascending" : "descending") : "none");
    const btn = h("button", {
      class: "th-sort-btn", type: "button",
      onclick: () => {
        S.sort = { key, dir: active ? -S.sort.dir : 1 };
        render();
      },
    }, label);
    thEl.append(btn);
    return thEl;
  }

  function renderRow(e, index) {
    const [skey, slabel] = displayStatus(e);

    const tr = h("tr", { "data-id": e.id },
      // S.N.
      h("td", { class: "cell-sno" }, String(index + 1)),

      // Name
      h("td", { class: "cell-name" },
        h("span", { class: "cell-name-text", text: e.name })
      ),

      // Date of Appointment
      h("td", { class: "cell-date" },
        h("span", { class: "cell-date-main" }, e.join.label),
        e.since_join ? h("span", { class: "cell-date-sub" }, e.since_join.text) : null
      ),

      // Service Time
      h("td", { class: "cell-service" },
        h("span", { class: "cell-date-main" }, formatServiceTime(e.tenure))
      ),

      // Date of Termination
      h("td", { class: "cell-date" },
        e.term ? [
          h("span", { class: "cell-date-main" }, e.term.label),
          e.until_term ? h("span", { class: "cell-date-sub " + (e.ending_soon ? "is-soon" : "") }, e.until_term.text) : null
        ] : h("span", { class: "cell-muted" }, "None")
      ),

      // Status
      h("td", { class: "cell-status" },
        h("span", { class: `notion-tag notion-tag--${skey}`, text: slabel })
      ),

      // Actions
      h("td", { class: "cell-actions" },
        h("div", { class: "row-actions-group" },
          h("button", {
            class: "row-action-btn", type: "button",
            "aria-label": `Edit ${e.name}`,
            onclick: () => openDialog(e)
          }, "Edit"),
          h("button", {
            class: "row-action-btn row-action-btn--delete", type: "button",
            "aria-label": `Delete ${e.name}`,
            onclick: () => confirmDelete(e)
          }, "Delete")
        )
      )
    );
    return tr;
  }

  function renderSheet(highlightId) {
    const sheet = $("#sheet");
    sheet.replaceChildren();

    if (S.error && !S.data) {
      sheet.append(h("div", { class: "empty-state" },
        h("p", { class: "empty-state__title", text: "Error loading data" }),
        h("p", { class: "empty-state__desc", text: S.error })
      ));
      return;
    }

    if (!S.data || S.data.employees.length === 0) {
      sheet.append(h("div", { class: "empty-state" },
        h("p", { class: "empty-state__title", text: "No staff records" }),
        h("p", { class: "empty-state__desc", text: "Get started by adding your first staff record." }),
        h("button", { class: "btn btn--primary", type: "button", onclick: () => openDialog() }, "+ Add Staff")
      ));
      return;
    }

    const rows = visibleRows();
    if (rows.length === 0) {
      const q = S.q.trim();
      sheet.append(h("div", { class: "empty-state" },
        h("p", { class: "empty-state__title", text: "No matches found" }),
        h("p", { class: "empty-state__desc", text: q ? `No staff member matches "${q}".` : "No records match current filter." }),
        h("button", {
          class: "btn btn--subtle", type: "button",
          onclick: () => {
            S.q = ""; S.filter = "all"; storeUtil.set("filter", "all");
            $("#search").value = ""; updateSearchClear();
            render();
          }
        }, "Show all records")
      ));
      return;
    }

    const table = h("table", { class: "notion-tbl" },
      h("colgroup", {}, [
        h("col", { style: "width: 50px" }),  // S.N.
        h("col", { style: "width: 25%" }),   // Name
        h("col", { style: "width: 18%" }),   // Date of Appointment
        h("col", { style: "width: 17%" }),   // Service Time
        h("col", { style: "width: 18%" }),   // Date of Termination
        h("col", { style: "width: 12%" }),   // Status
        h("col", { class: "th-actions", style: "width: 120px" }),   // Actions
      ]),
      h("thead", {}, h("tr", {},
        th_el("S.N.", null, true),
        th_el("Name", "name"),
        th_el("Date of Appointment", "join"),
        th_el("Service Time", "served"),
        th_el("Date of Termination", "term"),
        th_el("Status", null),
        h("th", { class: "th-actions", scope: "col" }, "")
      )),
      h("tbody", {}, rows.map((e, idx) => renderRow(e, idx)))
    );

    sheet.append(table);

    if (highlightId) {
      const tr = table.querySelector(`tr[data-id="${highlightId}"]`);
      if (tr) {
        tr.classList.add("is-new");
        requestAnimationFrame(() => requestAnimationFrame(() => tr.classList.remove("is-new")));
      }
    }
  }


  // ============================================================
  //  3. MINI EXCEL IN BROWSER
  // ============================================================

  let _activeExcelCell = null;

  // Smart date parser accepting natural formats
  function parseAnyDate(str, cal) {
    if (!str) return null;
    str = str.trim();

    // Format 1: YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
    let m = str.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (m) {
      return { y: parseInt(m[1], 10), m: parseInt(m[2], 10), d: parseInt(m[3], 10) };
    }

    // Format 2: DD-MM-YYYY or DD/MM/YYYY or DD.MM.YYYY
    m = str.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (m) {
      return { y: parseInt(m[3], 10), m: parseInt(m[2], 10), d: parseInt(m[1], 10) };
    }

    // Format 3: DD MonthName YYYY (e.g. 15 Ashadh 2080 or 15 May 2012)
    const tokens = str.split(/\s+/);
    if (tokens.length === 3) {
      const d = parseInt(tokens[0], 10);
      const y = parseInt(tokens[2], 10);
      const names = cal === "bs" ? BS_MONTHS : AD_MONTHS;
      if (!isNaN(d) && !isNaN(y) && names) {
        const lower = tokens[1].toLowerCase();
        const foundIdx = names.findIndex(name => name.toLowerCase().startsWith(lower));
        if (foundIdx >= 0) {
          return { y, m: foundIdx + 1, d };
        }
      }
    }

    return null;
  }

  function renderMiniExcel() {
    const container = $("#excelGridContainer");
    if (!container) return;
    container.replaceChildren();

    if (!S.data || S.data.employees.length === 0) {
      container.append(h("div", { style: "padding: 32px; text-align: center; color: var(--ink-2);" },
        "No staff records to display in spreadsheet view.",
        h("div", { style: "margin-top: 10px;" },
          h("button", { class: "btn btn--primary", onclick: () => openDialog() }, "+ Add Staff")
        )
      ));
      return;
    }

    const emps = S.data.employees;

    const table = h("table", { class: "excel-grid-tbl" },
      h("colgroup", {}, [
        h("col", { style: "width: 44px" }),  // Row #
        h("col", { style: "width: 54px" }),  // A: S.N.
        h("col", { style: "width: 26%" }),   // B: Name
        h("col", { style: "width: 20%" }),   // C: Date of Appointment
        h("col", { style: "width: 18%" }),   // D: Service Time
        h("col", { style: "width: 20%" }),   // E: Date of Termination
        h("col", { style: "width: 12%" }),   // F: Status
      ]),
      h("thead", {},
        // Column Letters
        h("tr", {},
          h("th", { class: "excel-row-num" }, ""),
          h("th", {}, "A"),
          h("th", {}, "B"),
          h("th", {}, "C"),
          h("th", {}, "D"),
          h("th", {}, "E"),
          h("th", {}, "F")
        ),
        // Column Headers
        h("tr", {},
          h("th", { class: "excel-row-num" }, "1"),
          h("th", {}, "S.N."),
          h("th", {}, "Name"),
          h("th", {}, "Date of Appointment"),
          h("th", {}, "Service Time"),
          h("th", {}, "Date of Termination"),
          h("th", {}, "Status")
        )
      ),
      h("tbody", {}, emps.map((e, idx) => {
        const rowNum = idx + 2;
        const [_, slabel] = displayStatus(e);

        // Editable cells: Name (col B), Date of Appt (col C), Date of Term (col E)
        const cellB = h("td", {
          class: "excel-cell-editable",
          contenteditable: "true",
          spellcheck: "false",
          "data-coord": `B${rowNum}`,
          "data-id": e.id,
          "data-field": "name",
          onfocus: () => selectExcelCell(`B${rowNum}`, e.name, cellB),
          onblur: () => onExcelCellBlur(cellB, e, "name"),
          onkeydown: (ev) => onExcelCellKeyDown(ev, cellB)
        }, e.name);

        const joinVal = e.join[S.cal] ? `${e.join[S.cal].y}-${String(e.join[S.cal].m).padStart(2, "0")}-${String(e.join[S.cal].d).padStart(2, "0")}` : e.join.iso;
        const cellC = h("td", {
          class: "excel-cell-editable",
          contenteditable: "true",
          spellcheck: "false",
          "data-coord": `C${rowNum}`,
          "data-id": e.id,
          "data-field": "join",
          onfocus: () => selectExcelCell(`C${rowNum}`, joinVal, cellC),
          onblur: () => onExcelCellBlur(cellC, e, "join"),
          onkeydown: (ev) => onExcelCellKeyDown(ev, cellC)
        }, joinVal);

        const termVal = e.term ? (e.term[S.cal] ? `${e.term[S.cal].y}-${String(e.term[S.cal].m).padStart(2, "0")}-${String(e.term[S.cal].d).padStart(2, "0")}` : e.term.iso) : "";
        const cellE = h("td", {
          class: "excel-cell-editable",
          contenteditable: "true",
          spellcheck: "false",
          "data-coord": `E${rowNum}`,
          "data-id": e.id,
          "data-field": "term",
          onfocus: () => selectExcelCell(`E${rowNum}`, termVal, cellE),
          onblur: () => onExcelCellBlur(cellE, e, "term"),
          onkeydown: (ev) => onExcelCellKeyDown(ev, cellE)
        }, termVal);

        return h("tr", {},
          h("td", { class: "excel-row-num" }, String(rowNum)),
          h("td", { class: "excel-cell-readonly", style: "text-align: center;" }, String(idx + 1)),
          cellB,
          cellC,
          h("td", { class: "excel-cell-readonly" }, formatServiceTime(e.tenure)),
          cellE,
          h("td", { class: "excel-cell-readonly" }, slabel)
        );
      }))
    );

    container.append(table);
  }

  function selectExcelCell(coord, val, el) {
    _activeExcelCell = el;
    $("#excelCellCoords").textContent = coord;
    const fx = $("#excelFxInput");
    fx.value = val;
    fx.oninput = () => {
      if (_activeExcelCell) {
        _activeExcelCell.textContent = fx.value;
      }
    };
  }

  function onExcelCellKeyDown(ev, cell) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      cell.blur();
    }
  }

  function onExcelCellBlur(cell, emp, field) {
    const rawVal = cell.textContent.trim();
    const statusTag = $("#excelSaveStatus");

    try {
      if (field === "name") {
        if (!rawVal) {
          cell.textContent = emp.name;
          return;
        }
        if (rawVal === emp.name) return;

        statusTag.textContent = "Saving...";
        // Build body for update
        const body = {
          name: rawVal,
          join: emp.join[S.cal] ? { cal: S.cal, ...emp.join[S.cal] } : { cal: "ad", y: emp.join.ad.y, m: emp.join.ad.m, d: emp.join.ad.d },
          term: emp.term ? (emp.term[S.cal] ? { cal: S.cal, ...emp.term[S.cal] } : { cal: "ad", y: emp.term.ad.y, m: emp.term.ad.m, d: emp.term.ad.d }) : null
        };
        const parsed = parse_employee(body);
        db_update_employee(emp.id, parsed.name, parsed.join_iso, parsed.term_iso);
      } else if (field === "join" || field === "term") {
        if (field === "term" && !rawVal) {
          statusTag.textContent = "Saving...";
          const body = {
            name: emp.name,
            join: emp.join[S.cal] ? { cal: S.cal, ...emp.join[S.cal] } : { cal: "ad", y: emp.join.ad.y, m: emp.join.ad.m, d: emp.join.ad.d },
            term: null
          };
          const parsed = parse_employee(body);
          db_update_employee(emp.id, parsed.name, parsed.join_iso, parsed.term_iso);
        } else {
          const parsedDate = parseAnyDate(rawVal, S.cal);
          if (!parsedDate) {
            toast("Please enter a valid date (e.g. 2080-05-15 or 15/05/2080)");
            refresh();
            return;
          }

          statusTag.textContent = "Saving...";
          const body = {
            name: emp.name,
            join: field === "join" ? { cal: S.cal, ...parsedDate } : (emp.join[S.cal] ? { cal: S.cal, ...emp.join[S.cal] } : { cal: "ad", y: emp.join.ad.y, m: emp.join.ad.m, d: emp.join.ad.d }),
            term: field === "term" ? { cal: S.cal, ...parsedDate } : (emp.term ? (emp.term[S.cal] ? { cal: S.cal, ...emp.term[S.cal] } : { cal: "ad", y: emp.term.ad.y, m: emp.term.ad.m, d: emp.term.ad.d }) : null)
          };
          const parsed = parse_employee(body);
          db_update_employee(emp.id, parsed.name, parsed.join_iso, parsed.term_iso);
        }
      }

      statusTag.textContent = "Saved";
      setTimeout(() => { statusTag.textContent = "Auto-saving active"; }, 2000);
      refresh();
    } catch (e) {
      statusTag.textContent = "Error saving";
      toast(e.message);
      refresh();
    }
  }

  $("#excelAddRowBtn").addEventListener("click", () => openDialog());


  // ============================================================
  //  MAIN RENDER FUNCTION
  // ============================================================

  function render(highlightId) {
    renderTodaySubtle();
    renderCalToggle();

    if (S.activeTab === "dashboard") {
      renderDashboard();
    } else if (S.activeTab === "directory") {
      renderFilters();
      renderSheet(highlightId);
    } else if (S.activeTab === "excel") {
      renderMiniExcel();
    }

    renderFoot();
  }

  function renderFoot() {
    const foot = $("#foot");
    if (!foot) return;
    foot.textContent = "Staff records stored in your browser.";
  }


  // ============================================================
  //  CALENDAR SWITCH
  // ============================================================

  function setCal(cal) {
    if (cal === S.cal) return;
    S.cal = cal;
    storeUtil.set("cal", cal);
    refresh();
  }

  $("#cal-ad").addEventListener("click", () => setCal("ad"));
  $("#cal-bs").addEventListener("click", () => setCal("bs"));


  // ============================================================
  //  SEARCH
  // ============================================================

  function updateSearchClear() {
    const box = $("#searchBox");
    const val = $("#search").value;
    box.classList.toggle("search-box--has-value", !!val);
  }

  $("#search").addEventListener("input", (e) => {
    S.q = e.target.value;
    updateSearchClear();
    renderSheet();
  });

  $("#searchClear").addEventListener("click", () => {
    S.q = "";
    $("#search").value = "";
    updateSearchClear();
    renderSheet();
    $("#search").focus();
  });


  // ============================================================
  //  PRINT & EXPORT
  // ============================================================

  $("#printBtn").addEventListener("click", () => {
    window.print();
  });

  // Export as CSV instead of XLSX
  $("#exportBtn").addEventListener("click", () => {
    if (!S.data || !S.data.employees) return;
    downloadCSV(S.data.employees, S.cal, S.serviceUnit);
    toast(`Exported staff records (${S.cal.toUpperCase()}).`);
  });


  // ============================================================
  //  TOAST
  // ============================================================

  let toastTimer = null;
  function toast(message, action) {
    const box = $("#toast");
    box.replaceChildren(h("span", { text: message }));
    if (action) {
      box.append(h("button", {
        class: "toast-btn", type: "button",
        onclick: () => { hideToast(); action.run(); }
      }, action.label));
    }
    box.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, action ? 8000 : 3500);
  }
  function hideToast() { $("#toast").hidden = true; }


  // ============================================================
  //  DELETE CONFIRMATION
  // ============================================================

  const confirmDialog = $("#confirmDialog");
  let _deleteTarget = null;

  function confirmDelete(emp) {
    _deleteTarget = emp;
    $("#confirmMsg").textContent = `Are you sure you want to delete ${emp.name}? This action can be undone briefly.`;
    confirmDialog.showModal();
    $("#confirmCancel").focus();
  }

  $("#confirmCancel").addEventListener("click", () => {
    confirmDialog.close();
    _deleteTarget = null;
  });

  $("#confirmOk").addEventListener("click", () => {
    const emp = _deleteTarget;
    confirmDialog.close();
    _deleteTarget = null;
    if (!emp) return;
    removeEmployee(emp);
  });

  function removeEmployee(e) {
    try {
      const ok = db_soft_delete(e.id);
      if (!ok) {
        toast("That employee no longer exists.");
        refresh();
        return;
      }
    } catch (err) {
      toast(err.message);
      refresh();
      return;
    }
    refresh();
    toast(`Deleted ${e.name}.`, {
      label: "Undo",
      run: () => {
        try {
          db_restore(e.id);
          refresh(e.id);
          toast(`Restored ${e.name}.`);
        } catch (err) { toast(err.message); }
      },
    });
  }


  // ============================================================
  //  PURGE DATABASE (Password: ops@123)
  // ============================================================

  const purgeDialog = $("#purgeDialog");
  const purgeError = $("#purgeError");
  const purgePasswordInput = $("#purgePasswordInput");

  $("#purgeDataBtn").addEventListener("click", () => {
    closeSidebar();
    purgePasswordInput.value = "";
    purgeError.textContent = "";
    purgeDialog.showModal();
    purgePasswordInput.focus();
  });

  $("#purgeCancelBtn").addEventListener("click", () => {
    purgeDialog.close();
  });

  $("#purgeConfirmBtn").addEventListener("click", () => {
    const password = purgePasswordInput.value;
    if (!password) {
      purgeError.textContent = "Please enter the admin password.";
      purgePasswordInput.focus();
      return;
    }

    if (password !== "ops@123") {
      purgeError.textContent = "Incorrect password. Purge cancelled.";
      purgePasswordInput.focus();
      return;
    }

    const count = db_purge();
    purgeDialog.close();
    refresh();
    toast(`All staff records purged (${count} records deleted).`);
  });


  // ============================================================
  //  DIALOG & CLEAN DATE HANDLING
  // ============================================================

  const dlg = $("#dialog");
  const form = $("#form");
  const D = { mode: "add", id: null, cal: "bs", saving: false };
  const groups = {};

  function loadMonthOptions(selectEl, cal) {
    const names = cal === "bs" ? BS_MONTHS : AD_MONTHS;
    const currentVal = selectEl.value || "1";
    selectEl.replaceChildren();
    names.forEach((name, idx) => {
      const mNum = idx + 1;
      selectEl.append(h("option", { value: String(mNum) }, `${mNum} - ${name}`));
    });
    selectEl.value = currentVal;
  }

  function makeGroup(root, key) {
    const g = {
      key, root,
      d: $('[data-part="d"]', root),
      m: $('[data-part="m"]', root),
      y: $('[data-part="y"]', root),
      eq: $('[data-role="eq"]', root),
      err: $(".field__error", root),
      clear: $('[data-role="clear"]', root),
      token: 0, timer: null,
    };

    // Filter day & year to numbers
    for (const el of [g.d, g.y]) {
      el.addEventListener("input", () => {
        el.value = el.value.replace(/\D/g, "");
        liveCheck(g);
      });
    }

    // Month select change
    g.m.addEventListener("change", () => liveCheck(g));

    if (g.clear) {
      g.clear.addEventListener("click", () => {
        fillGroup(g, "", "1", "");
        g.err.textContent = "";
      });
    }

    return g;
  }

  groups.join = makeGroup($("#grp-join"), "join");
  groups.term = makeGroup($("#grp-term"), "term");

  function fillGroup(g, y, m, d) {
    g.y.value = y === "" ? "" : String(y);
    g.d.value = d === "" ? "" : String(d);
    g.m.value = m === "" ? "1" : String(m);

    g.eq.textContent = "";
    g.eq.classList.remove("is-bad");
    for (const el of [g.d, g.m, g.y]) el.removeAttribute("aria-invalid");
  }

  function getGroupParts(g) {
    return {
      y: g.y.value.trim(),
      m: g.m.value,
      d: g.d.value.trim(),
    };
  }

  const isGroupEmpty = (p) => !p.y && !p.d;
  const isGroupFull = (p) => p.y && p.m && p.d;

  function liveCheck(g) {
    clearTimeout(g.timer);
    g.err.textContent = "";
    for (const el of [g.d, g.m, g.y]) el.removeAttribute("aria-invalid");

    const p = getGroupParts(g);
    if (!isGroupFull(p)) {
      g.eq.textContent = "";
      g.eq.classList.remove("is-bad");
      return;
    }

    const my = ++g.token;
    g.timer = setTimeout(() => {
      try {
        const y = parseInt(p.y, 10);
        const m = parseInt(p.m, 10);
        const d = parseInt(p.d, 10);
        if (isNaN(y) || isNaN(m) || isNaN(d)) throw new DateError("Invalid date.");
        const dt = from_triple(D.cal, y, m, d);
        if (my !== g.token) return;
        const other = D.cal === "ad" ? "bs" : "ad";
        const otherLabel = format_date(other, dt);
        g.eq.textContent = `= ${otherLabel} ${CAL_NAME[other]}`;
        g.eq.classList.remove("is-bad");
      } catch (e) {
        if (my !== g.token) return;
        g.eq.textContent = e.message;
        g.eq.classList.add("is-bad");
      }
    }, 200);
  }

  function switchDialogCal(next) {
    if (next === D.cal) return;
    const prev = D.cal;

    for (const g of Object.values(groups)) {
      const p = getGroupParts(g);
      let conv = null;
      if (isGroupFull(p)) {
        try {
          const y = parseInt(p.y, 10);
          const m = parseInt(p.m, 10);
          const d = parseInt(p.d, 10);
          const dt = from_triple(prev, y, m, d);
          const [ny, nm, nd] = to_triple(next, dt);
          conv = { y: ny, m: nm, d: nd };
        } catch (e) { conv = null; }
      }
      loadMonthOptions(g.m, next);
      if (conv) {
        fillGroup(g, conv.y, conv.m, conv.d);
      }
    }

    D.cal = next;
    syncDialogCal();
    for (const g of Object.values(groups)) liveCheck(g);
  }

  function syncDialogCal() {
    $$("#dlgCal button").forEach(b => {
      const on = b.dataset.cal === D.cal;
      b.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  $$("#dlgCal button").forEach(b => {
    b.addEventListener("click", () => switchDialogCal(b.dataset.cal));
  });

  function clearErrors() {
    for (const id of ["err-name", "err-join", "err-term", "err-form"]) $("#" + id).textContent = "";
    $("#f-first-name").removeAttribute("aria-invalid");
    $("#f-last-name").removeAttribute("aria-invalid");
    for (const g of Object.values(groups)) {
      for (const el of [g.d, g.m, g.y]) el.removeAttribute("aria-invalid");
    }
  }

  function showError(field, message) {
    if (field === "name") {
      $("#err-name").textContent = message;
      $("#f-first-name").setAttribute("aria-invalid", "true");
      $("#f-first-name").focus();
    } else if (field === "join" || field === "term") {
      const g = groups[field];
      g.err.textContent = message;
      for (const el of [g.d, g.m, g.y]) el.setAttribute("aria-invalid", "true");
      g.d.focus();
    } else {
      $("#err-form").textContent = message;
    }
  }

  function openDialog(emp) {
    D.mode = emp ? "edit" : "add";
    D.id = emp ? emp.id : null;
    D.cal = S.cal;

    $("#dialogTitle").textContent = emp ? "Edit Staff Record" : "Add Staff Record";

    // Split name into first, middle, last
    let first = "", middle = "", last = "";
    if (emp && emp.name) {
      const parts = emp.name.trim().split(/\s+/);
      if (parts.length === 1) {
        first = parts[0];
      } else if (parts.length === 2) {
        first = parts[0];
        last = parts[1];
      } else if (parts.length >= 3) {
        first = parts[0];
        middle = parts.slice(1, -1).join(" ");
        last = parts[parts.length - 1];
      }
    }

    $("#f-first-name").value = first;
    $("#f-middle-name").value = middle;
    $("#f-last-name").value = last;

    clearErrors();

    loadMonthOptions(groups.join.m, D.cal);
    loadMonthOptions(groups.term.m, D.cal);

    const fill = (g, dv) => dv ? fillGroup(g, dv[D.cal].y, dv[D.cal].m, dv[D.cal].d) : fillGroup(g, "", "1", "");
    fill(groups.join, emp && emp.join);
    fill(groups.term, emp && emp.term);

    syncDialogCal();
    dlg.showModal();
    $("#f-first-name").focus();

    for (const g of Object.values(groups)) {
      if (isGroupFull(getGroupParts(g))) liveCheck(g);
    }
  }

  $("#addBtn").addEventListener("click", () => openDialog());
  const dashAdd = $("#dashAddBtn");
  if (dashAdd) dashAdd.addEventListener("click", () => openDialog());
  $("#cancelBtn").addEventListener("click", () => dlg.close());
  $("#dialogCloseX").addEventListener("click", () => dlg.close());

  // Form submission
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (D.saving) return;
    clearErrors();

    const firstName = $("#f-first-name").value.trim();
    const middleName = $("#f-middle-name").value.trim();
    const lastName = $("#f-last-name").value.trim();

    if (!firstName) return showError("name", "First name is required.");
    if (!lastName) return showError("name", "Last name is required.");

    const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

    const jp = getGroupParts(groups.join);
    const tp = getGroupParts(groups.term);

    if (!isGroupFull(jp)) return showError("join", "Enter valid appointment day, month, and year.");
    if (!isGroupEmpty(tp) && !isGroupFull(tp)) return showError("term", "Enter complete termination date or click Clear.");

    const body = {
      name: fullName,
      join: { cal: D.cal, ...jp },
      term: isGroupEmpty(tp) ? null : { cal: D.cal, ...tp },
    };

    D.saving = true;
    $("#saveBtn").disabled = true;
    try {
      const parsed = parse_employee(body);
      let resultId;
      if (D.mode === "edit") {
        const ok = db_update_employee(D.id, parsed.name, parsed.join_iso, parsed.term_iso);
        if (!ok) throw new ApiError("That employee no longer exists.");
        resultId = D.id;
      } else {
        resultId = db_add_employee(parsed.name, parsed.join_iso, parsed.term_iso);
      }
      dlg.close();
      refresh(resultId);
      toast(`Saved ${fullName}.`);
    } catch (e) {
      showError(e.field, e.message);
    } finally {
      D.saving = false;
      $("#saveBtn").disabled = false;
    }
  });


  // ============================================================
  //  FOCUS TRAP & ENTER NAV
  // ============================================================

  function trapFocus(dialogEl, event) {
    if (event.key !== "Tab") return;
    const focusables = Array.from(dialogEl.querySelectorAll(
      'input:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);

    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  dlg.addEventListener("keydown", (e) => trapFocus(dlg, e));
  confirmDialog.addEventListener("keydown", (e) => trapFocus(confirmDialog, e));
  purgeDialog.addEventListener("keydown", (e) => trapFocus(purgeDialog, e));
  const importDialog = $("#importDialog");
  if (importDialog) importDialog.addEventListener("keydown", (e) => trapFocus(importDialog, e));

  // Pressing Enter in inputs moves to the next form field
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT")) {
      e.preventDefault();
      const inputs = Array.from(form.querySelectorAll(
        'input:not([disabled]), select:not([disabled]), #saveBtn'
      )).filter(el => el.offsetParent !== null);

      const idx = inputs.indexOf(e.target);
      if (idx >= 0 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
        if (inputs[idx + 1].select) inputs[idx + 1].select();
      }
    }
  });


  // ============================================================
  //  IMPORT FROM EXCEL / CSV
  // ============================================================

  function initImport() {
    const importDialog = $("#importDialog");
    const importBtn = $("#importBtn");
    const closeBtn = $("#importDialogCloseX");
    const cancelBtn = $("#importCancelBtn");
    const confirmBtn = $("#importConfirmBtn");
    const templateBtn = $("#importDownloadTemplateBtn");
    const fileInput = $("#importFileInput");
    const dropzone = $("#importDropzone");
    const pasteInput = $("#importPasteInput");
    const previewSection = $("#importPreviewSection");
    const previewTbody = $("#importPreviewTbody");
    const validCountEl = $("#importValidCount");
    const errorCountEl = $("#importErrorCount");
    const clearBtn = $("#importClearBtn");
    const errorEl = $("#importError");
    const calBsBtn = $("#import-cal-bs");
    const calAdBtn = $("#import-cal-ad");
    const modeSelect = $("#importModeSelect");

    if (!importDialog || !importBtn) return;

    let currentImportCal = S.cal || "bs";
    let parsedRecords = [];

    function updateCalSegmented(cal) {
      currentImportCal = cal;
      if (calBsBtn) calBsBtn.setAttribute("aria-checked", cal === "bs" ? "true" : "false");
      if (calAdBtn) calAdBtn.setAttribute("aria-checked", cal === "ad" ? "true" : "false");
      if (pasteInput && pasteInput.value.trim()) {
        processInputText(pasteInput.value);
      }
    }

    if (calBsBtn) calBsBtn.addEventListener("click", () => updateCalSegmented("bs"));
    if (calAdBtn) calAdBtn.addEventListener("click", () => updateCalSegmented("ad"));

    // Template download
    if (templateBtn) {
      templateBtn.addEventListener("click", () => {
        let sampleCsv = "";
        if (currentImportCal === "bs") {
          sampleCsv = "\uFEFFS.N.,Name,Date of Appointment,Date of Termination\r\n" +
            "1,Aarav Sharma,2078-04-01,\r\n" +
            "2,Pooja Shrestha,2079-08-15,2083-08-14\r\n" +
            "3,Rohan Adhikari,2080-01-10,\r\n";
        } else {
          sampleCsv = "\uFEFFS.N.,Name,Date of Appointment,Date of Termination\r\n" +
            "1,Aarav Sharma,2021-07-16,\r\n" +
            "2,Pooja Shrestha,2022-12-01,2026-11-30\r\n" +
            "3,Rohan Adhikari,2023-04-24,\r\n";
        }
        const blob = new Blob([sampleCsv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `staff_template_${currentImportCal.toUpperCase()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast(`Downloaded Excel template (${currentImportCal.toUpperCase()}).`);
      });
    }

    function resetModal() {
      parsedRecords = [];
      if (fileInput) fileInput.value = "";
      if (pasteInput) pasteInput.value = "";
      if (previewSection) previewSection.hidden = true;
      if (previewTbody) previewTbody.replaceChildren();
      if (validCountEl) validCountEl.textContent = "0";
      if (errorCountEl) errorCountEl.textContent = "0";
      if (errorEl) errorEl.textContent = "";
      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Import Staff Records";
      }
      updateCalSegmented(S.cal || "bs");
    }

    importBtn.addEventListener("click", () => {
      resetModal();
      importDialog.showModal();
    });

    if (closeBtn) closeBtn.addEventListener("click", () => importDialog.close());
    if (cancelBtn) cancelBtn.addEventListener("click", () => importDialog.close());
    if (clearBtn) clearBtn.addEventListener("click", resetModal);

    // File Drop & Select
    if (dropzone) {
      ["dragenter", "dragover"].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add("import-dropzone--drag");
        });
      });
      ["dragleave", "drop"].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove("import-dropzone--drag");
        });
      });
      dropzone.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files[0]) {
          readFile(dt.files[0]);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          readFile(e.target.files[0]);
        }
      });
    }

    function readFile(file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result || "";
        if (pasteInput) pasteInput.value = text;
        processInputText(text);
      };
      reader.onerror = () => {
        if (errorEl) errorEl.textContent = "Failed to read file. Please ensure it is a valid CSV or TXT file.";
      };
      reader.readAsText(file, "UTF-8");
    }

    if (pasteInput) {
      pasteInput.addEventListener("input", () => {
        processInputText(pasteInput.value);
      });
    }

    // Delimited row parser handling quotes
    function splitLine(line, delim) {
      const parts = [];
      let cur = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          if (inQuotes && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (c === delim && !inQuotes) {
          parts.push(cur.trim());
          cur = "";
        } else {
          cur += c;
        }
      }
      parts.push(cur.trim());
      return parts;
    }

    function detectDelimiter(lines) {
      for (const line of lines) {
        if (!line.trim()) continue;
        if (line.includes("\t")) return "\t";
        const commaCount = (line.match(/,/g) || []).length;
        const semiCount = (line.match(/;/g) || []).length;
        if (commaCount > 0 || semiCount > 0) {
          return commaCount >= semiCount ? "," : ";";
        }
      }
      return ",";
    }

    function processInputText(raw) {
      if (errorEl) errorEl.textContent = "";
      if (!raw || !raw.trim()) {
        if (previewSection) previewSection.hidden = true;
        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.textContent = "Import Staff Records";
        }
        return;
      }

      const rawLines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      if (rawLines.length === 0) {
        if (previewSection) previewSection.hidden = true;
        return;
      }

      const delim = detectDelimiter(rawLines);
      const splitRows = rawLines.map(line => splitLine(line, delim));

      // Header check
      const firstRow = splitRows[0];
      const hasHeader = firstRow.some(cell => /(name|employee|staff|appointment|joining)/i.test(cell));

      let nameIdx = -1;
      let joinIdx = -1;
      let termIdx = -1;
      let startRow = 0;

      if (hasHeader) {
        startRow = 1;
        nameIdx = firstRow.findIndex(c => /(name|employee|staff)/i.test(c));
        joinIdx = firstRow.findIndex(c => /(appoint|join|start)/i.test(c));
        termIdx = firstRow.findIndex(c => /(terminat|end|leave|expir)/i.test(c));
      }

      // Fallback column positions if unmapped
      if (nameIdx === -1 || joinIdx === -1) {
        const looksLikeSN = /^\d+$/.test((splitRows[startRow] || [])[0] || "");
        if (looksLikeSN) {
          nameIdx = 1;
          joinIdx = 2;
          termIdx = 3;
        } else {
          nameIdx = 0;
          joinIdx = 1;
          termIdx = 2;
        }
      }

      parsedRecords = [];
      let validCount = 0;
      let errorCount = 0;

      for (let i = startRow; i < splitRows.length; i++) {
        const row = splitRows[i];
        if (!row || row.every(cell => !cell)) continue;

        const name = (row[nameIdx] || "").trim();
        const joinRaw = (row[joinIdx] || "").trim();
        const termRaw = termIdx >= 0 && row[termIdx] ? row[termIdx].trim() : "";

        const errors = [];
        let joinIso = null;
        let termIso = null;
        let joinDisplay = joinRaw || "—";
        let termDisplay = termRaw || "—";

        if (!name) {
          errors.push("Missing name");
        }

        if (!joinRaw) {
          errors.push("Missing appointment date");
        } else {
          const parsedJoin = parseAnyDate(joinRaw, currentImportCal);
          if (!parsedJoin) {
            errors.push(`Invalid appointment date "${joinRaw}"`);
          } else {
            try {
              const dt = from_triple(currentImportCal, parsedJoin.y, parsedJoin.m, parsedJoin.d);
              joinIso = isoDate(dt);
              joinDisplay = `${parsedJoin.y}-${String(parsedJoin.m).padStart(2, "0")}-${String(parsedJoin.d).padStart(2, "0")}`;
            } catch (e) {
              errors.push(e.message || "Invalid appointment date");
            }
          }
        }

        if (termRaw) {
          const parsedTerm = parseAnyDate(termRaw, currentImportCal);
          if (!parsedTerm) {
            errors.push(`Invalid termination date "${termRaw}"`);
          } else {
            try {
              const dt = from_triple(currentImportCal, parsedTerm.y, parsedTerm.m, parsedTerm.d);
              termIso = isoDate(dt);
              termDisplay = `${parsedTerm.y}-${String(parsedTerm.m).padStart(2, "0")}-${String(parsedTerm.d).padStart(2, "0")}`;
            } catch (e) {
              errors.push(e.message || "Invalid termination date");
            }
          }
        }

        if (joinIso && termIso && termIso < joinIso) {
          errors.push("Termination date cannot be before appointment date");
        }

        const isValid = errors.length === 0;
        if (isValid) validCount++;
        else errorCount++;

        parsedRecords.push({
          rowNum: i + 1,
          name: name || "—",
          joinDisplay,
          termDisplay,
          joinIso,
          termIso,
          isValid,
          errorMsg: errors.join("; ")
        });
      }

      renderPreview(parsedRecords, validCount, errorCount);
    }

    function renderPreview(records, validCount, errorCount) {
      if (!previewSection || !previewTbody) return;

      if (records.length === 0) {
        previewSection.hidden = true;
        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.textContent = "Import Staff Records";
        }
        return;
      }

      previewSection.hidden = false;
      if (validCountEl) validCountEl.textContent = String(validCount);
      if (errorCountEl) errorCountEl.textContent = String(errorCount);

      previewTbody.replaceChildren(...records.map(rec => {
        const tr = h("tr", { class: rec.isValid ? "import-row--valid" : "import-row--error" },
          h("td", { style: "text-align: center; color: var(--ink-2); font-variant-numeric: tabular-nums;" }, String(rec.rowNum)),
          h("td", { style: "font-weight: 500;" }, rec.name),
          h("td", {}, rec.joinDisplay),
          h("td", {}, rec.termDisplay),
          h("td", {},
            rec.isValid
              ? h("span", { class: "badge badge--active", title: "Record ready to import" }, "Valid")
              : h("span", { class: "badge badge--ended", title: rec.errorMsg }, rec.errorMsg || "Error")
          )
        );
        return tr;
      }));

      if (confirmBtn) {
        confirmBtn.disabled = validCount === 0;
        confirmBtn.textContent = `Import ${validCount} Staff Record${validCount === 1 ? "" : "s"}`;
      }
    }

    // Confirm import execution
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        const validRows = parsedRecords.filter(r => r.isValid);
        if (validRows.length === 0) return;

        const mode = modeSelect ? modeSelect.value : "append";
        if (mode === "replace") {
          if (!confirm(`Are you sure you want to replace all existing records with these ${validRows.length} new records?`)) {
            return;
          }
          db_purge();
        }

        let importedCount = 0;
        for (const row of validRows) {
          db_add_employee(row.name, row.joinIso, row.termIso);
          importedCount++;
        }

        importDialog.close();
        refresh();
        toast(`Successfully imported ${importedCount} staff records (${mode === "replace" ? "replaced all" : "appended"}).`);
      });
    }
  }


  // ============================================================
  //  AUTHENTICATION (SIGN IN / SIGN OUT)
  // ============================================================

  const MASTER_USER = "ops";
  const MASTER_PASS = "password";

  function isUserAuthenticated() {
    return sessionStorage.getItem("staff_auth") === "true" || localStorage.getItem("staff_auth") === "true";
  }

  function setUserAuthenticated(remember) {
    sessionStorage.setItem("staff_auth", "true");
    if (remember) {
      localStorage.setItem("staff_auth", "true");
    } else {
      localStorage.removeItem("staff_auth");
    }
  }

  function clearUserAuthenticated() {
    sessionStorage.removeItem("staff_auth");
    localStorage.removeItem("staff_auth");
  }

  function updateAuthUI() {
    const authScreen = $("#authScreen");
    const appLayout = $("#appLayout");
    const authed = isUserAuthenticated();

    if (authScreen) authScreen.hidden = authed;
    if (appLayout) appLayout.hidden = !authed;

    if (!authed) {
      const uInput = $("#authUsername");
      if (uInput) {
        setTimeout(() => uInput.focus(), 60);
      }
    } else {
      refresh();
      switchTab(S.activeTab);
    }
  }

  function initAuth() {
    const authForm = $("#authForm");
    if (authForm) {
      authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = ($("#authUsername").value || "").trim().toLowerCase();
        const password = $("#authPassword").value || "";
        const remember = $("#authRemember") ? $("#authRemember").checked : false;
        const errEl = $("#authError");

        if (!username || !password) {
          if (errEl) errEl.textContent = "Please enter both username and password.";
          return;
        }

        if (username === MASTER_USER && password === MASTER_PASS) {
          if (errEl) errEl.textContent = "";
          setUserAuthenticated(remember);
          $("#authPassword").value = "";
          updateAuthUI();
          toast("Signed in successfully as " + username + ".");
        } else {
          if (errEl) errEl.textContent = "Invalid username or password. Please try again.";
          const pInput = $("#authPassword");
          if (pInput) {
            pInput.value = "";
            pInput.focus();
          }
        }
      });
    }

    const signOut = () => {
      if (confirm("Are you sure you want to sign out?")) {
        clearUserAuthenticated();
        const pInput = $("#authPassword");
        if (pInput) pInput.value = "";
        const errEl = $("#authError");
        if (errEl) errEl.textContent = "";
        updateAuthUI();
        toast("Signed out.");
      }
    };

    const topbarSignOutBtn = $("#topbarSignOutBtn");
    if (topbarSignOutBtn) topbarSignOutBtn.addEventListener("click", signOut);

    const sidebarSignOutBtn = $("#sidebarSignOutBtn");
    if (sidebarSignOutBtn) {
      sidebarSignOutBtn.addEventListener("click", () => {
        closeSidebar();
        signOut();
      });
    }
  }


  // ============================================================
  //  APP INIT
  // ============================================================

  function start() {
    initSettings();
    initImport();
    initAuth();
    updateAuthUI();

    // Auto-refresh date checks
    setInterval(() => {
      if (isUserAuthenticated() && S.data && localISO() !== S.data.today.iso) refresh();
    }, 30000);

    document.addEventListener("visibilitychange", () => {
      if (isUserAuthenticated() && !document.hidden && !dlg.open && !purgeDialog.open) refresh();
    });
  }

  start();
})();
