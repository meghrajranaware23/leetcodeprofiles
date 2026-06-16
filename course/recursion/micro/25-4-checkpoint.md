<!-- hand-authored -->
# ✅ Day 25 Checkpoint

> **Recursive Counting** · 2 quests completed · ⭐ 115 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "unique BSTs" / Catalan structures | `G(n) = Σ G(i-1)*G(n-i)` | Root loop, multiply, sum |
| Empty subtree count | `G(0) = 1` | One valid empty shape |
| "add parentheses" / all eval results | Split at each operator | D&C + Cartesian combine |
| No operator in substring | Base `[value]` | Single-element list |
| Split/combine on data (Day 7) | Same trust-subcalls | Multiple split points here |
| Count vs enumerate | #96 scalar memo | #241 list of results |

### 🧠 Quick Recognition Test

1. *"How many unique BSTs for 1..n?"* → **Catalan root loop. G(0)=G(1)=1. Memo on n.**

2. *"All results from parenthesizing 2-1-1"* → **Split at each `-`, combine left×right lists.**

3. *"Generate all BSTs (not just count)"* → **#95 backtracking build — not today's count-only.**

4. *"Sort array via merge sort"* → **Day 7 — one mid, merge combine, not operator loop.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"How many valid parentheses strings of n pairs?"*

Which pattern? **Catalan — same recurrence as G(n).** Can also use dp on length.

**Scenario 2:** *"Insert operators into digits to reach target (Expression Add Operators)."*

Which pattern? **Day 20 backtracking + multiply carry.** Different from #241 — insert ops, not regroup existing ones.

**Scenario 3:** *"Different ways to split array into two parts minimizing sum difference."*

Which pattern? **Partition / subset DP — not Catalan root loop.** No multiply of independent subtree counts.

> **Answer key:** Scenario 1 → Catalan (today). Scenario 2 → Day 20. Scenario 3 → different family.

---

## ⚠ Common Mistakes

1. **Catalan as Fibonacci** — Wrong recurrence; need root loop product-sum.
2. **Forgetting G(0)=1** — Breaks root at smallest value.
3. **Parentheses: single int return** — Must return list; base is `[val]`.
4. **Parentheses: operator included in substring** — Left `[0..i)`, right `[i+1..]`.
5. **Only first operator split** — Must loop all `+`, `-`, `*`.

---

## 🏋️ Mini Challenge

Write G(4) by hand using the root formula. Should get **14**.

From memory, write the operator loop skeleton for #241 (base case + split + combine).

> 💡 **Self-check:** G(3)=5 and diffWays("2-1-1")=[0,2]?

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/) | Medium | Catalan recursion |
| [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) | Medium | D&C enumeration |
| [Unique BSTs II #95](https://leetcode.com/problems/unique-binary-search-trees-ii/) | Medium | Generate all trees |

---

## 🔭 A-Rank Preview

Day 26 synthesizes backtracking patterns across harder variants. Days 28–30 move toward interview simulation, regex matching, and capstone grid + board problems. The counting and split habits from today reappear whenever a problem asks *"how many structures?"* or *"all ways to group?"*

---

*Day 25 complete. Tomorrow: backtracking synthesis continues. →*
