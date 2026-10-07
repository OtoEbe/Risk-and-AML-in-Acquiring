# Rail to Revenue: One Quarter at GhIPSS

Team simulation for the GhIPSS Commercial Enablement for Support Functions track, 21 and 22 October 2026. Built from the Rail to Revenue build pack v1.0. Every rule runs through the pack's `engine.js`, embedded byte for byte.

## Files

| File | Who opens it | What it is |
|---|---|---|
| `index.html` | Each team device | The team app. Holds the stripped scenario: no grades, debrief points, coach cues, CCP prompts or flags register. |
| `console.html` | Game operator, coaches | Facilitator console. Grades and coach cues are encrypted and open only with the facilitator PIN. |
| `console.html#screen` | Projector | Opened from the console with "Open projector". |
| `sw.js` | Browser | Keeps both pages working through a reload with no signal. |

## Addresses once deployed

- Teams: `https://tpssimulation.intreensic.com/rail-to-revenue/`
- Console: `https://tpssimulation.intreensic.com/rail-to-revenue/console.html`

## Facilitator PIN

The PIN is in the operator run sheet, not in this folder, because this folder is public once deployed. It unlocks the console and projector, starts a faculty practice run on a team device, and authorises an undo.

## Deploy (GitHub, Risk-and-AML-in-Acquiring repo)

1. Open the repo on github.com at its root.
2. Add file, then Upload files.
3. Drag the `rail-to-revenue` folder itself (not the folder that contains it) onto the page, so GitHub shows paths starting `rail-to-revenue/`.
4. Commit. Wait about ten minutes for Pages, then open the team address and check the build stamp under the join form.

For later updates, open the `rail-to-revenue` folder on GitHub and upload the changed files inside it.

## No live link in this build

There is no backend yet. Team devices save everything locally and never need the network after the first load. Rounds open with four-digit release codes, curveballs arrive by code, and the console collects each table's position by scanning the QR code on its screen. The sync seam (`SYNC` in the source) is where a live backend plugs in later.

All figures are illustrative until the Day Two II workbook validation (design document, section 13).
