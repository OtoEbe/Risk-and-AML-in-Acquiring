# Understanding Scheme Fees · Training Simulation

A three-day cohort simulation for payments professionals, built by **The Payment School · intreensic**. Participants take over the scheme-fee line at a fictional wallet-first card programme: ten decision calls each morning, real budget moving on every one, daily standings, and a cumulative podium after Day 3.

**Live simulation:** https://otoebe.github.io/Understanding-Scheme-Fees/

## What is in this repository

| Path | Purpose |
|---|---|
| `index.html` | The entire simulation engine, a single self-contained file (no build step, no dependencies). Served by GitHub Pages. |
| `supabase/migrations/` | The database schema as code, matching the live Supabase project exactly: tables, row-level security policies, grants, leaderboard views and the facilitator delete function. |
| `supabase/config.toml` | Supabase CLI configuration for local development and dashboard integration. |
| `.nojekyll` | Tells GitHub Pages to serve the file as-is. |

## Architecture

The engine runs entirely in the browser. Participants register with real names and teams; progress, scores and telemetry sync to a Supabase backend (project: Understanding Scheme Fees) through its REST API, guarded by row-level security. If the network drops, the simulation continues locally on the device and uploads results when the connection returns. Facilitators have a gated console for day codes, cohort standings, programme records and final training reports.

Everything course-specific lives in a delimited content pack at the top of `index.html` (PACK:BEGIN to PACK:END): brand tokens, rank ladder, day codes, cast and all thirty scenario nodes. The engine reads only from the pack, so repurposing the simulation for another programme means swapping the pack and the backend block, then rerunning the verification harness.

Content covers the scheme-fee curriculum: the four-party model and who actually gets billed, scheme fees against interchange, the four fee charging logics, billing triggers, the thirteen-category fee taxonomy, the Visa fee schedule hierarchy from category down to billing line, tiered switching economics on low average tickets, residency and authentication cost control, the behavioural penalty families (minimum approval rate, generic response codes, excessive reattempts, unmatched clearing, settlement non-compliance), sponsor pass-through visibility, the seven fee families of a sponsored issuer, unit economics, the monthly operating rhythm and the renewal negotiation levers. Fee rates and thresholds follow the July 2026 workshop materials; reverify against the live scheme fee schedule before acting commercially.

## Updating the deployment

Replace `index.html` on the `main` branch and commit. GitHub Pages redeploys automatically within a minute or two. Hard-refresh the live URL after deploying (Ctrl+F5) to bypass the browser cache.

## Database changes

Schema changes are applied to the Supabase project as migrations and mirrored in `supabase/migrations/`. The migration files in this repository correspond one-to-one with the applied migration history.

---

© The Payment School · intreensic. Training content for facilitated delivery.
