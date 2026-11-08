# Elevate HQ
Static leadership site (no build step). Open `index.html` or host on GitHub Pages.

- **Edit content:** `data.js`. Everything with `sample:true` is placeholder data, not real stats.
- **Local edits:** Resources → Edit data (saves to this browser only).
- **Academy progress:** saved per device (localStorage).

## Nidus sync (not connected)
A live sync needs:
1. Nidus API credentials (or an admin-scheduled CSV/report export) with read access to agreements: rep name, recruiter/leader, status (sent/viewed/signed), timestamps.
2. A small scheduled job (e.g. GitHub Action on a cron) that pulls Nidus, maps each agreement to a leader, and writes `nidus.json` + `week.signed` per leader. Keep the API key in GitHub Secrets, never in the site.
3. Because GitHub Pages is public, either aggregate only (counts, no PII) or move the site behind auth (Cloudflare Access / Netlify password).
