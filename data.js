/* ============================================================
   ELEVATE HQ — DATA (real numbers only; nothing invented)
   Sources (Peter's Google Drive):
   1. "Elevate Fiber" — blitz roster workbook (one tab per crew)
      https://docs.google.com/spreadsheets/d/1-iGD71edrxN1OAuHRZ5ODbNUYAQFjdHi9pAndLWvT5Q/edit
   2. "Nov 2026 Fiber Apps Forecast (Mon-Sat, Austin fallout Nov 5)" — built from #1
      https://docs.google.com/spreadsheets/d/1kEdarBa-Bg3kXSg9s0VVCu4qXsXutb_7LY9ViSf1TfA/edit
      Tabs: Crew Forecast, Daily Targets, Assumptions
   3. "Fiber Leaderboard Live Data" — rep apps today / WTD / MTD
      https://docs.google.com/spreadsheets/d/12V0yh32-FSS2QVjmiBEfMflx7MXk6p0WTlBspjMM0eE/edit
   Nidus: no connector, no export, no report emails found. Not connected.
   A value of null means "not tracked yet" and is shown that way.
   ============================================================ */
window.HQ = {
  asOf: { apps: "Nov 4, 11:49 PM", crews: "Nov 5 refresh" },
  goal: { label: "November Brightspeed fiber apps", target: 2000, mtd: 45, cumTargetAsOf: 47, asOfDate: "Nov 4",
    daily: [ {d:"Nov 1–2", actual:11, target:11}, {d:"Nov 3", actual:16, target:18}, {d:"Nov 4", actual:18, target:18} ],
    checkpoints: [ {d:"Nov 7",t:101},{d:"Nov 12",t:561},{d:"Nov 14",t:759},{d:"Nov 21",t:1773},{d:"Nov 25",t:1984},{d:"Nov 30",t:2000} ],
    standard: "2.0+ apps per rep per day" },
  // Rep apps from "Fiber Leaderboard Live Data"
  reps: [
    {name:"Trevis Leiser",today:4,wtd:7,mtd:7},{name:"Dayana Bernal",today:4,wtd:7,mtd:7},
    {name:"Tobias Staples",today:2,wtd:7,mtd:7},{name:"Maison Weekes",today:2,wtd:6,mtd:6},
    {name:"Brodie Stevens",today:2,wtd:5,mtd:5},{name:"Isaac Douglas",today:2,wtd:5,mtd:5},
    {name:"Kyler Lund",today:2,wtd:4,mtd:4},{name:"Levi Carlson",today:0,wtd:1,mtd:1},
    {name:"Gavin Roberts",today:0,wtd:1,mtd:1},{name:"Brandon Griffin",today:0,wtd:1,mtd:1}
  ],
  repTotals: {today:18,wtd:44,mtd:44},
  // Crews from "Crew Forecast" tab (heads = names on the roster tab). start/end are Nov 2026 knock windows.
  crews: [
    {leader:"Trevis", tab:"Trevis Nov 1-12", location:null, window:"Nov 3–12", start:"2026-11-03", end:"2026-11-12", heads:9, knockDays:9, repDays:77, forecast:155},
    {leader:"Jake Toth + Jaleel", tab:"Jake Toth + Jaleel NOV 8-22", location:"Dothan / Enterprise, AL", window:"Nov 8–22", start:"2026-11-08", end:"2026-11-22", heads:9, knockDays:12, repDays:108, forecast:217},
    {leader:"Johannes", tab:"Johannes NOV 8-22", location:"Kinston / Ayden / New Bern, NC", window:"Nov 8–22", start:"2026-11-08", end:"2026-11-22", heads:13, knockDays:12, repDays:156, forecast:314},
    {leader:"Pabu", tab:"Pabu NOV 8-22", location:"Hinesville, GA", window:"Nov 8–22", start:"2026-11-08", end:"2026-11-22", heads:12, knockDays:12, repDays:144, forecast:290},
    {leader:"Charly", tab:"Charly NOV 8-22", location:"Franklin / Whiteland / Fishers / Ingalls, IN", window:"Nov 8–22", start:"2026-11-08", end:"2026-11-22", heads:6, knockDays:12, repDays:72, forecast:145},
    {leader:"Mason & JJ", tab:"Mason&JJ Nov. 8-22", location:null, window:"Nov 8–22", start:"2026-11-08", end:"2026-11-22", heads:9, knockDays:12, repDays:108, forecast:217},
    {leader:"Devin G", tab:"Devin G Nov 15-25th", location:null, window:"Nov 15–25", start:"2026-11-15", end:"2026-11-25", heads:8, knockDays:9, repDays:72, forecast:145},
    {leader:"Ethan / Israel", tab:"Ethan Nov 15-25", location:null, window:"Nov 15–25", start:"2026-11-15", end:"2026-11-25", heads:4, knockDays:9, repDays:36, forecast:73},
    {leader:"Clayton", tab:"Clayton Nov 15-25th", location:null, window:"Nov 15–25", start:"2026-11-15", end:"2026-11-25", heads:9, knockDays:9, repDays:81, forecast:163},
    {leader:"Grady + Jeron", tab:"GradyJeron Nov 15th-25th", location:null, window:"Nov 15–25", start:"2026-11-15", end:"2026-11-25", heads:7, knockDays:9, repDays:63, forecast:127},
    {leader:"Maddox Preder", tab:"Maddox Preder NOV 15th-25th", location:null, window:"Nov 15–25", start:"2026-11-15", end:"2026-11-25", heads:7, knockDays:9, repDays:63, forecast:127},
    {leader:"Aaron Judd", tab:"Aaron Judd Nov 28- Dec 10", location:null, window:"Nov 28 – Dec 10", start:"2026-11-28", end:"2026-12-10", heads:2, knockDays:2, repDays:4, forecast:8},
    {leader:"Gage + Paul", tab:"GagePaul nov 29-dec 11", location:null, window:"Nov 29 – Dec 11", start:"2026-11-29", end:"2026-12-11", heads:3, knockDays:1, repDays:3, forecast:6},
    {leader:"Zack", tab:"Zack Nov 30th-Dec 12th", location:null, window:"Nov 30 – Dec 12", start:"2026-11-30", end:"2026-12-12", heads:1, knockDays:1, repDays:1, forecast:2}
  ],
  dropped: [{leader:"Austin + Avery", note:"Fell out Nov 5 (9 heads, 151 forecast apps removed)"}],
  // KPI standard. source:null = not tracked yet in any sheet or Nidus.
  kpis: [
    {label:"Fiber apps (MTD)", value:45, target:47, unit:"", source:"Forecast sheet · Daily Targets"},
    {label:"Reps in the field", value:9, target:null, unit:"", source:"Forecast sheet · Heads in field (Nov 3–7)"},
    {label:"Recruiting days", value:null, target:6, unit:"/wk", source:null},
    {label:"New leads", value:null, target:10, unit:"/day", source:null},
    {label:"Intro calls", value:null, target:10, unit:"/day", source:null},
    {label:"Retention touchpoints", value:null, target:5, unit:"/day", source:null},
    {label:"Reps signed (Nidus)", value:null, target:null, unit:"", source:null}
  ],
  path: [
    { title:"Rep", req:"Learn the craft" },{ title:"Team Lead", req:"Recruit and lead your first reps" },
    { title:"Area Manager", req:"$150K serviced + 5 reps, or $1M serviced" },{ title:"Regional Manager", req:"$6M serviced" }
  ],
  academy: [
    { track:"Leadership", modules:[ {t:"The Elevate Standard",d:"6 days. 10 leads. 10 intros. 5 touches."},{t:"Recruiting Conversations",d:"Run an intro call that books an interview."},{t:"Retention & Culture",d:"Daily touchpoints that keep reps."},{t:"Coaching in the Field",d:"Ride-alongs and feedback."},{t:"Unreasonable Hospitality",d:"Will Guidara + Giftology."} ]},
    { track:"Fiber Rookie", url:"https://elevate-fiber-academy-1028.creamy-eel-8799.chatgpt.site/#Rookie%20Training", modules:[ {t:"Smokescreens: Deflect & Plow",d:"Acknowledge, then continue. Respect a clear no."},{t:"ARAC",d:"Acknowledge. Resolve. Ace. Close."},{t:"Like. Listen. Believe. Buy.",d:"Personable, attentive, credible, clear ask."},{t:"8 Mile",d:"Address the recurring objection first."},{t:"Brightspeed Fiber Script",d:"Intro, discovery, value, assumptive close."},{t:"Tayson's Fiber Pitch",d:"Full pitch on video."} ]},
    { track:"Fiber Veteran", modules:[ {t:"Advanced Objections",d:"Build on ARAC."},{t:"Sales Breakdowns",d:"Tayson's live sales audio."},{t:"Soft Selling",d:""},{t:"Prospecting Essentials",d:""} ]}
  ],
  sources: [
    {t:"Elevate Fiber (rosters)", u:"https://docs.google.com/spreadsheets/d/1-iGD71edrxN1OAuHRZ5ODbNUYAQFjdHi9pAndLWvT5Q/edit"},
    {t:"Nov 2026 Fiber Apps Forecast", u:"https://docs.google.com/spreadsheets/d/1kEdarBa-Bg3kXSg9s0VVCu4qXsXutb_7LY9ViSf1TfA/edit"},
    {t:"Fiber Leaderboard Live Data", u:"https://docs.google.com/spreadsheets/d/12V0yh32-FSS2QVjmiBEfMflx7MXk6p0WTlBspjMM0eE/edit"},
    {t:"Elevate Fiber Academy", u:"https://elevate-fiber-academy-1028.creamy-eel-8799.chatgpt.site/"}
  ]
};
