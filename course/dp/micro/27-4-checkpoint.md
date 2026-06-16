<!-- hand-authored -->
# ✅ Day 27 Checkpoint

> **Interview Simulation** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 27 = **60-second classification** — greedy vs dp, calendar vs index.

| When you see... | Think... | Why |
|---|---|---|
| "minimum jumps" + always reachable | Greedy layers (curEnd/farthest) | #45 |
| "jump range nums[i]" | BFS layers or greedy | O(n) greedy |
| "travel days" / "pass types" | dp[day] + 3 look-backs | #983 |
| "7-day / 30-day pass" | min(dp[d-1]+c0, dp[d-7]+c1, ...) | Pass overlap |
| "interval DP / burst balloons" | **Day 30** preview | Hard synthesis |

### 🧠 Quick Recognition Test

1. *"Min jumps to last index?"* → **Greedy:** farthest + curEnd layers, O(n).
2. *"Min ticket cost for travel days?"* → **dp[d]** calendar loop, 3 pass min on travel days.
3. *"Can you reach last index (yes/no)?"* → **Jump Game I** — farthest only, no jump count.
4. *"Burst balloons max coins?"* → **Day 30** — interval dp[i][j].

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum refueling stops on highway."*

Which pattern? Greedy layers like Jump II — reach farthest on current fuel, stop when needed.

**Scenario 2:** *"Hotel cost minimization for trip days with weekly/monthly rates."*

Which pattern? Same as #983 — calendar dp with multi-duration pass options.

**Scenario 3:** *"Word break minimum segments."*

Which pattern? **Day 15** prefix dp — different from today's calendar model.

> **Answer key:** Jump min = greedy layers. Pass cost = calendar dp. Hard interval = Day 30.

---

## ⚠ Common Mistakes

1. **O(n²) DP for Jump II when greedy suffices** — interview time cost.
2. **dp on trip index not calendar day** — breaks pass overlap logic.
3. **Forget non-travel inherit** — dp[d]=dp[d-1].
4. **Missing max(0, d-7) clamp** — index underflow.
5. **Greedy max jump per step** — not minimum jumps.

---

## 🏋️ Mini Challenge

**days = [1,2], costs = [3,7,15]** — min cost?

> 💡 **Hint:** Day 1+2: one 7-day (7) beats two 1-day (6)? 2+3=6 vs 7 → dp[2]=6 with two 1-day passes.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/) | Medium | Greedy/DP Dual Approach |
| [Minimum Cost for Tickets #983](https://leetcode.com/problems/minimum-cost-for-tickets/) | Medium | Multi-Option Decision DP |

---

*Day 27 complete! Day 30 Final Ascension next — interval DP on matrices and balloons. →*
