<!-- hand-authored -->
# ✅ Day 9 Checkpoint

> **Circular & Extended Decisions** · 2 quests completed · ⭐ 65 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 9 extends Day 6 — **circle split** OR **dual rolling state**.

| When you see... | Think... | Why |
|---|---|---|
| "rob houses in circle" | `max(rob(0,n-2), rob(1,n-1))` | First/last can't both be taken |
| "max product subarray" | `(maxP, minP)` + swap on negative | Sign flip |
| "linear rob" | **Day 6** one pass | No circle |
| "circular max **subarray** sum" | **D-Rank #918** — Kadane + total−min | Not robber two-pass |
| "all positive product" | Kadane on values or dual state | Dual still safe |

### 🧠 Quick Recognition Test

1. *"Circle, non-adjacent max loot"* → **Two robRange passes**
2. *"Max product contiguous subarray with negatives"* → **maxP/minP dual track**
3. *"Linear non-adjacent max"* → **Day 6**
4. *"Count decode ways"* → **Day 7 sum**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Circular street of booths — max points, no adjacent picks."*

Which pattern? **House Robber II** — two linear passes on index ranges.

**Scenario 2:** *"Longest product subarray with at least one element."*

Which pattern? **Dual max/min product** — same as today's second quest.

**Scenario 3:** *"Paint houses in a circle with no adjacent same color."*

Which pattern? **Later rank** — often DP with colors, not robber; don't force two-pass rob unless loot/max-sum.

> **Answer key:** Circle + **non-adjacent pick** → split range. **Product** + negatives → dual state.

---

## ⚠ Common Mistakes

1. **One rob pass on circle** — Always two ranges.
2. **Product with only maxP** — minP required for negative flip.
3. **Confusing circle rob with circle Kadane** — Subarray sum (#918) uses total−minSubarray, not robRange.
4. **Take/skip on product** — Subarray is contiguous — extend/reset, not skip index.
5. **Forgetting n==1 on rob II** — Return single element.

---

## 🏋️ Mini Challenge

Before D-Rank tests: trace **both** Day 9 patterns on paper for `[1, -2, 3, -4]` (product) and `[3, 1, 2, 3]` (circle rob).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Medium | Circular Constraint DP |
| [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) | Medium | Dual-State Tracking DP |

---

*Day 9 complete! Tomorrow: many choices per state — inner loops. →*
