<!-- hand-authored -->
# ✅ Day 24 Checkpoint

> **Counting & State Machine Mastery** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 24 = **count ways** (sum, not max) with either **sum dimension** or **graph states**.

| When you see... | Think... | Why |
|---|---|---|
| "dice rolls" / "target sum" | `dp[s]` per die, ndp roll | #1155 |
| "k faces" / "n dice" | Outer die loop, inner face 1..k | Bounded counting |
| "knight dialer" / "phone pad" | 10-state graph FSM | #935 |
| "mod 10^9+7" | Counting DP — sum transitions | Overflow guard |
| "max profit" / "stock" | **Day 20** max FSM | Not counting |

### 🧠 Quick Recognition Test

1. *"Ways to roll n dice (faces 1..k) summing to target?"* → **`dp[s]`** after each die; `ndp[s]+=dp[s-f]`.
2. *"Distinct phone numbers length n on knight pad?"* → **`dp[digit]`**; predecessors sum mod MOD.
3. *"Max profit with stock cooldown?"* → **Day 20** — hold/sold/rest, max not sum.
4. *"Coin change: count combinations for amount?"* → Similar sum DP — unlimited vs n dice differs in outer loop.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Number of paths of length k on a directed graph with n nodes."*

Which pattern? **Knight dialer generalization** — dp[node] = sum of dp[predecessors]. Fixed transition matrix.

**Scenario 2:** *"Roll dice until sum exceeds target — count sequences."*

Which pattern? Same **dp[d][s]** but different stopping rule — still sum over faces.

**Scenario 3:** *"Decode ways on a phone keypad with custom move rules."*

Which pattern? Build predecessor map like knight dialer — graph FSM counting.

> **Answer key:** Sum target = dice DP. Graph moves = state machine counting. Stock = max FSM (Day 20).

---

## ⚠ Common Mistakes

1. **In-place dp for dice** — Reuses one die infinitely; need fresh `ndp` per die.
2. **Forgetting mod** — Knight dialer requires `% 10^9+7` on every add.
3. **Max instead of sum** — Day 24 counts paths, doesn't optimize.
4. **Wrong knight adjacency** — Draw pad; 5 has no incoming moves.
5. **Confusing with knapsack** — Dice = exactly n rolls; not unlimited item pick.

---

## 🏋️ Mini Challenge

**n=2 dice, k=6, target=4** — how many ways? List them.

> 💡 **Hint:** (1,3), (2,2), (3,1) → 3 ways. Verify with dp table.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Number of Dice Rolls with Target Sum #1155](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/) | Medium | Multi-Option Counting DP |
| [Knight Dialer #935](https://leetcode.com/problems/knight-dialer/) | Medium | State Machine on Graph |

---

*Day 24 complete! Tomorrow: multi-dimensional state. →*
