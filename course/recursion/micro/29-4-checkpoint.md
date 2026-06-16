<!-- hand-authored -->
# ✅ Day 29 Checkpoint

> **Recursive Synthesis II** · 2 quests completed · ⭐ 170 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 29 is the **hardest case analysis in the pack**. Lock in the diff:

| When you see... | Think... | Star check |
|---|---|---|
| "regex" / `.` and `x*` | `dp(i,j)` memo | `p[j+1]=='*'`, act on `p[j]` |
| "wildcard" / `?` and `*` | same memo skeleton | `p[j]=='*'` directly |
| full string match | base `j==n → i==m` | both must be consumed |
| overlapping subproblems | `(i,j)` cache | mandatory — not optional |

### 🧠 Quick Recognition Test

1. *"Match with `.` and `a*`*" → **Regex #10. Zero: `dp(i,j+2)`. Eat: `match && dp(i+1,j)`.**

2. *"Match with `?` and `*`*" → **Wildcard #44. Zero: `dp(i,j+1)`. Eat: `i<m && dp(i+1,j)`.**

3. *"Same cell reached twice"* → **Memo — star branches overlap.**

4. *"Check p[j]=='*' for regex"* → **Wrong — check p[j+1] for regex, p[j] for wildcard.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Is interleaving string?"*

2D memo on `(i,j)` for two source strings — same table idea, different transition.

**Scenario 2:** *"Regex with + or ? modifiers"*

Extend case matrix — still `(i,j)` dp with more branches per pattern char.

**Scenario 3:** *"Wildcard — can `*` match empty at end?"*

Yes — `dp(i,j+1)` zero branch handles star eating nothing.

> **Answer key:** Both quests share one skeleton. Only the **star branch** differs.

---

## ⚠ Common Mistakes

1. **Regex: check `p[j]=='*'`** — star is always at `j+1`.
2. **Forget zero-match branch** — star can match empty.
3. **Regex consume: `dp(i+1,j+2)`** — stay at `j`, not skip star.
4. **No memo on (i,j)** — TLE on stress tests.
5. **Confuse wildcard `*` with regex `x*`** — different consume guards.

---

## 🏋️ Mini Challenge

Draw both star branch diagrams from memory:

```
Regex x* at (i,j):          Wildcard * at (i,j):
     /    \                       /    \
dp(i,j+2)  dp(i+1,j)         dp(i,j+1)  dp(i+1,j)
```

Then write the 4-case `dp(i,j)` pseudocode for regex in 8 lines.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Regular Expression Matching #10](https://leetcode.com/problems/regular-expression-matching/) | Hard | regex star at j+1 |
| [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) | Hard | wildcard star at j |
| [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) | Hard | S-Rank test #3 |

---

*Day 29 complete. Tomorrow: the Final Ascension — capstone decision tree. →*
