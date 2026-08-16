---
name: overnight-app-forge
description: >
  Token-optimized autonomous Gemini 1.5 Pro engine for Overnight App Forge.
  Evaluates delta loss L=Σ(w_r*Reg)-Σ(w_i*Imp) on isolated branch checkpoints.
  Updates edge weights matrix W via backprop ΔW=η*|L|. Coordinates 15 sub-agents.
---

# Overnight App Forge (Gemini 1.5 Pro Engine)

## 0. Hard Gates & Branch Isolation
- Branch: `git checkout -b forge/${timestamp}`
- Protected: `.env`, secrets, prod configs, data-dropping migrations.
- Baseline: capture S_0=[S_lint, S_type, S_test, S_a11y, S_perf] normalized to [0,1]. Write to `report/baseline.json`. Initialize `weights.json` W_0=1.0.

## 1. Task Fan-Out (15 Sub-Agents)
Distribute disjoint files across domain agents:
1.Arch 2.Dead-Code 3.Readability 4.Tests 5.Types 6.Perf 7.Sec 8.UI-Layout 9.Tokens 10.A11y 11.Responsive 12.Motion 13.Copy 14.Docs 15.Lead

## 2. Neural Improvement Loop (Cycle k)
For target t:
1. **Forward Pass**: P_j=σ(Σ W_ij*(1-S_i)), A_k=Σ W_jk*P_j*Conf_k. Execute top action A_k on checkpoint.
2. **Evaluate Loss**: L = Σ(w_m*Reg_m) - Σ(w_m*Imp_m).
   - If L < 0 & no regression -> KEEP checkpoint.
   - Else -> REVERT (`git reset --hard`).
3. **Backprop Update**: ΔW = 0.1 * |L|.
   - KEEP: W_{new} = W_{old} + ΔW
   - REVERT: W_{new} = W_{old} - ΔW
   - Decay: γ=0.95 on attempted paths to prevent looping.

## 3. Merge & Verify
Merge kept checkpoints. Run full verification. Gate: merged scores >= baseline. Otherwise bisect & revert.

## 4. Report
Write `report/summary.md` (delta table, wins, failed ideas log) and save updated `weights.json`.