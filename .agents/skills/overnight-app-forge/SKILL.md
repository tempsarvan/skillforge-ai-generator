---
name: overnight-app-forge
description: >
  Autonomously improves a running application's code quality and UI overnight,
  unattended. Continuously observes the app, proposes changes, applies them in
  isolation, and keeps only what measurably improves objective scores. Decisions are
  driven by a neural-network reasoning engine: signals flow forward through layers to
  a chosen change, and error backpropagates to reweight what the agents try next, so
  the system learns what works on this specific codebase. Coordinates a team of up to
  15 specialized sub-agents that split the work by domain. Use when the user says
  "run overnight," "keep improving the app while I sleep," "perfect the code and UI,"
  "autonomous refactor," or hands off a codebase to be polished unattended.
  SKIP when: the task is a single well-defined change, a one-off feature (no loop
  needed), or there is no way to run/observe the app or score changes objectively.
---

# Overnight App Forge

You are an autonomous overnight engineering lead. Your job: leave the app measurably
better by morning — cleaner code, better UI — without breaking anything and without a
human in the loop. You reason like a neural network: forward passes choose changes,
backpropagation teaches you which changes work here. You deliver a clean, reviewable
diff and a morning report.

## Operating principles
- **Never mutate the source of truth directly.** Work on a branch or working copy.
- **Every accepted change is a checkpoint.** Any step must be reversible.
- **Only keep changes that lower loss.** No change is kept on vibes.
- **Budgeted.** You stop when a budget is hit, not when you run out of ideas.
- **Log everything.** If blocked, record why, skip it, and move on — never stall.

## Phase 0 — Setup (gate before any change)
1. Create an isolated working branch/copy. Confirm you can build and run the app.
2. Establish the **baseline scoreboard** by running the scorers in `scripts/`:
   - Code health: lint errors, type errors, test pass rate, coverage, complexity,
     duplication, dead code.
   - UI health: accessibility audit, layout/contrast checks, responsive breakpoints,
     visual-regression baselines, console errors.
   - Performance: bundle size, key render/interaction timings.
3. Normalize every metric to 0–1 and write baseline numbers to `report/baseline.json`.
4. Initialize `weights.json` (all edge weights = 1.0) — this is the network's memory.
   GATE: if the app won't build or no baseline can be captured, STOP and report why.

## Phase 1 — Plan & fan out
5. Scan the codebase and scoreboard. Build a ranked backlog of improvement tasks,
   each tagged with a domain and the metric it should move.
6. Split the backlog across a **team of up to 15 sub-agents** (see Team below).
   Assign each a disjoint slice of files/components to avoid write conflicts.

## Phase 2 — The neural improvement loop (each agent, in isolation)
Treat each cycle as one forward pass through the network, then backprop. Repeat until
the agent's budget is spent, its backlog is empty, or loss plateaus.

**Forward pass — choose one change:**
1. **INPUT layer** — read the target's current normalized signals (its scores).
2. **HIDDEN 1 · Feature extraction** — combine signals into named problems
   ("high-complexity module," "low-contrast component," "untested branch"). Each
   problem is a neuron; activation = how strongly signals point to it × its weight.
3. **HIDDEN 2 · Candidate actions** — active problems fire into candidate fixes.
   Candidate activation = expected score gain × confidence × edge weight.
4. **OUTPUT layer** — apply the single highest-activation candidate on a fresh
   checkpoint (one logical change only).

**Evaluate — compute loss:**
5. Re-run the relevant scorers on the changed target.
6. `loss = Σ(weightᵢ × regressionᵢ) − Σ(weightᵢ × improvementᵢ)` across metrics.
   Negative loss = it helped; positive = it hurt.

**Decide:**
7. If loss < 0 AND no metric fell below baseline → **KEEP** (new checkpoint).
   Otherwise → **REVERT** to the last checkpoint and mark the idea as tried.

**Backpropagation — update the network:**
8. Push error backward and adjust `weights.json`:
   - Gain → **increase** the signal→problem and problem→action weights that led here.
   - Regression → **decrease** those weights; that path is discredited.
   - **Learning rate**: move weights in proportion to the size of the score delta —
     big surprises move weights more.
   - **Regularization**: penalize changes touching many files or adding complexity,
     even if a metric improved, so the network doesn't overfit one score.
   - **Decay** weights on ideas already tried, forcing exploration over looping.
9. Append the outcome (kept/reverted, deltas) to the agent's run log.

## Phase 3 — Merge & verify
10. Integrate each agent's kept checkpoints in order, resolving conflicts.
11. **Batch the learning**: average outcomes per action type across agents before
    updating shared weights, so one lucky result doesn't dominate.
12. Re-run the FULL scoreboard on the merged result.
    GATE: merged scores must be ≥ baseline on every metric. If any regressed, bisect
    the offending change, revert just that one, and re-verify.

## Phase 4 — Morning report
13. Write `report/summary.md`: what changed, per-metric before/after table, biggest
    wins, ideas tried-and-reverted (so they aren't re-attempted), anything skipped and
    why, and the exact diff / PR link for review.
14. Save the final `weights.json` as "what the network learned works for this
    codebase," so the next run starts smarter.

## The team (assign only what the work needs, cap 15)
1. Lead/orchestrator — planning, assignment, merge, final verify.
2. Architecture & module boundaries      3. Dead-code & dependency pruning
4. Naming, readability & comments        5. Test coverage & new tests
6. Type-safety & error handling          7. Performance & bundle size
8. Security & input validation           9. UI layout & spacing consistency
10. Design-token & theme consistency     11. Accessibility (a11y)
12. Responsive / cross-viewport          13. Motion & interaction polish
14. Copy & microcopy                     15. Docs & changelog

## Convergence / stopping
Stop when average loss across recent passes plateaus (no metric improved for N passes)
or a budget is hit. Then jump to Phase 4.

## Guardrails (hard limits)
- MAX_ITERATIONS, MAX_WALLCLOCK, MAX_TOKENS, MAX_FILES_TOUCHED — read from config;
  hitting any one ends the run cleanly and jumps to Phase 4.
- Never touch: secrets, CI credentials, production configs, `.env`, data-dropping
  migrations. If a change needs these, log it as a human-review item and skip.
- If two agents need the same file, the lead serializes them; agents never force-merge.
