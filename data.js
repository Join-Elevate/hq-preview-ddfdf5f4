/* ============================================================
   ELEVATE HQ — EDIT THIS FILE TO UPDATE THE SITE
   Everything marked sample:true is PLACEHOLDER data, not real stats.
   Replace names/numbers here (or later, feed from Nidus/Hawx).
   ============================================================ */
window.HQ = {
  org: {
    name: "Elevate", tagline: "Change lives. Build leaders.",
    mission: "Help like-minded people realize their potential — spiritually, mentally, physically, and financially — and inspire others to achieve larger goals than ever imagined.",
    commissionsPaid: "$28M+", vision: "Ten $3M offices. The premier place to work in D2D.",
    season: "Off-season (Nov–Apr): recruiting + retention. Team production scored starting summer."
  },
  // Weekly standard per leader. Scale: each KPI scored 1–5 vs target.
  standards: [
    { key:"days",   label:"Recruiting days",        target:6,  unit:"/wk",  per:"week" },
    { key:"leads",  label:"New leads",              target:10, unit:"/day", per:"day" },
    { key:"intros", label:"Intro calls",            target:10, unit:"/day", per:"day" },
    { key:"touch",  label:"Retention touchpoints",  target:5,  unit:"/day", per:"day" },
    { key:"signed", label:"Reps signed (Nidus)",    target:2,  unit:"/wk",  per:"week" }
  ],
  path: [
    { title:"Rep", req:"Learn the craft. Knock, close, serve." },
    { title:"Team Lead", req:"Recruit and lead your first reps." },
    { title:"Area Manager", req:"$150K serviced + 5 reps, or $1M serviced" },
    { title:"Regional Manager", req:"$6M serviced" }
  ],
  meIndex: 1, // which leader below is "you" on the Home screen
  // SAMPLE leaders — replace with real people + numbers. week = daily averages this week.
  leaders: [
    { name:"Leader A", role:"Area Manager", sample:true, office:"Orem", serviced:1000000, reps:9,
      week:{days:6,leads:11,intros:10,touch:5,signed:3}, academy:8 },
    { name:"Leader B", role:"Team Lead", sample:true, office:"Orem", serviced:150000, reps:4,
      week:{days:5,leads:8,intros:7,touch:4,signed:1}, academy:5 },
    { name:"Leader C", role:"Team Lead", sample:true, office:"Provo", serviced:90000, reps:3,
      week:{days:6,leads:10,intros:9,touch:2,signed:2}, academy:6 },
    { name:"Leader D", role:"Team Lead", sample:true, office:"Lehi", serviced:60000, reps:2,
      week:{days:3,leads:5,intros:4,touch:3,signed:0}, academy:2 },
    { name:"Leader E", role:"Rep", sample:true, office:"Orem", serviced:40000, reps:0,
      week:{days:6,leads:12,intros:11,touch:5,signed:1}, academy:9 }
  ],
  // Academy. Fiber lessons come from the existing Elevate Fiber Academy site.
  academy: [
    { track:"Leadership", modules:[
      { t:"The Elevate Standard", d:"6 days. 10 leads. 10 intros. 5 touches. Why the scale matters." },
      { t:"Recruiting Conversations", d:"Run an intro call that books an interview." },
      { t:"Retention & Culture", d:"The 5 daily touchpoints that keep reps through the off-season." },
      { t:"Coaching in the Field", d:"Ride-alongs, feedback, and turning experience into teammates." },
      { t:"Unreasonable Hospitality", d:"Will Guidara + Giftology: make every rep feel seen." } ]},
    { track:"Fiber — Rookie", url:"https://elevate-fiber-academy-1028.creamy-eel-8799.chatgpt.site/#Rookie%20Training", modules:[
      { t:"Smokescreens: Deflect & Plow", d:"Acknowledge (“Totally makes sense”) then continue. Respect a clear no." },
      { t:"ARAC", d:"Acknowledge. Resolve. Ace (add value). Close." },
      { t:"Like. Listen. Believe. Buy.", d:"Personable → earn attention → back up claims → ask clearly." },
      { t:"8 Mile", d:"Address the recurring objection before they raise it." },
      { t:"Brightspeed Fiber Script", d:"Intro → discovery → transition → custom value → assumptive close → lock-in." },
      { t:"Tayson’s Fiber Pitch", d:"Watch the full pitch on video." } ]},
    { track:"Fiber — Veteran", modules:[
      { t:"Advanced Objections", d:"Build on ARAC with verified provider details." },
      { t:"Sales Breakdowns", d:"Live audio: Tayson’s Live Sale, Spectrum Switch 1 & 2, Verizon Switch." },
      { t:"Soft Selling", d:"" }, { t:"Prospecting Essentials", d:"" } ]}
  ],
  // SAMPLE blitzes — replace with real ones.
  blitzes: [
    { name:"Sample Blitz — Market 1", sample:true, status:"Live", dates:"Nov 9–14", isp:"Brightspeed", lead:"Leader A", reps:8, goal:120, sold:47, housing:"Airbnb" },
    { name:"Sample Blitz — Market 2", sample:true, status:"Upcoming", dates:"Nov 30–Dec 5", isp:"TBD", lead:"Leader C", reps:6, goal:90, sold:0, housing:"Airbnb" },
    { name:"Sample Blitz — Market 3", sample:true, status:"Done", dates:"Oct 26–31", isp:"Brightspeed", lead:"Leader B", reps:5, goal:80, sold:84, housing:"Airbnb" }
  ],
  blitzPrep: ["Check the weather; bring a jacket","Nice polos, pants, shorts — plain shirts","Portable charger + iPad if you have one","Pickup: “dark thirty” — 30 min after dark, within local knocking hours","Airbnb: do your dishes, keep it clean, respect teammates’ sleep"],
  // Nidus: SAMPLE pipeline. Replace with live data once connected (see README).
  nidus: { connected:false, lastSync:null, sample:true,
    pipeline:[ {stage:"Sent", n:6}, {stage:"Viewed", n:4}, {stage:"Signed", n:9}, {stage:"Onboarded", n:7} ] },
  resources: [
    { t:"Elevate Fiber Academy", u:"https://elevate-fiber-academy-1028.creamy-eel-8799.chatgpt.site/", d:"Videos, script, live sales" },
    { t:"Book an interview (Tayson)", u:"https://calendly.com/taysonllew/new-meeting", d:"Recruiting link" },
    { t:"Join Elevate", u:"https://join-elevate.github.io", d:"Recruiting site" },
    { t:"Unreasonable Hospitality — Will Guidara", u:"https://www.unreasonablehospitality.com/", d:"Leadership read" },
    { t:"Giftology — John Ruhlin", u:"https://giftologygroup.com/", d:"Gratitude & giving" }
  ]
};
