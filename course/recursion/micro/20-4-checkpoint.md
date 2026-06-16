<!-- hand-authored -->
# ✅ Day 20 Checkpoint

> **Expression Generation** · 2 quests completed · ⭐ 70 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "insert +, -, *" into digit string | Operator insertion dfs | curr/prev + multiply carry |
| "expression equals target" | Track curr, record at i==n | Don't eval path string |
| "additive number" / sum of prior two | First-two-seed + validation dfs | prefix check for a+b |
| digit string + cut lengths | Inner loop j from i | Leading zero → break |
| `*` in expression | `curr - prev + prev*val` | NOT `curr * val` |

### 🧠 Quick Recognition Test

1. *"Insert operators in '123' to reach target 6"* → **Operator insertion.** First num seeds curr/prev. Three branches per cut.

2. *"Is '112358' an additive number?"* → **Seed (1,1), dfs checks 2,3,5,8.** Slide window (a,b)→(b,a+b).

3. *"Partition string into palindromes"* → **Day 14 — validator swap, not operators.**

4. *"Assign array to k equal buckets"* → **Day 19 — numeric buckets, not string cuts.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Split string into Fibonacci sequence — return the list if possible."*

Which pattern? **Additive Number + path collection (#842).** Same double-loop seed and dfs prefix check; push terms to a vector instead of returning boolean.

**Scenario 2:** *"Insert operators to reach target — but only + and -, no multiply."*

Which pattern? **Simpler operator insertion.** Drop prev; only `curr + val` and `curr - val` branches.

**Scenario 3:** *"Evaluate expression with parentheses — return all results."*

Which pattern? **Divide and conquer (#241), not insertion.** Split at each operator, recurse both halves, combine — different skeleton.

> **Answer key:** Scenarios 1–2 → Day 20 family. Scenario 3 → divide & conquer (Day 7 territory).

---

## ⚠ Common Mistakes

1. **`curr *= val` for multiply** — Use carry undo: `curr - prev + prev*val`.
2. **`continue` on leading zero** — Must `break`; longer cuts all invalid.
3. **Single loop for additive seeds** — First two numbers need nested loops.
4. **Evaluating path string mid-dfs** — Incremental curr/prev is O(1) per step.
5. **int overflow** — Use long; LeetCode tests large digit strings.
6. **Forgetting `prev = -val` on subtract** — Next multiply undo needs signed prev.

---

## 🏋️ Mini Challenge

Trace `num = "232", target = 8` by hand. List both valid expressions before checking the solution.

Then: what is `curr` after `"2+3"` with `prev = 3` when you apply `*2`?

> 💡 **Answer:** `"2*3+2"` and `"2+3*2"`. After `"2+3"`: curr=5, prev=3. Apply `*2`: curr = 5 - 3 + 3*2 = **8**.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Expression Add Operators #282](https://leetcode.com/problems/expression-add-operators/) | Medium | Operator insertion + multiply carry |
| [Additive Number #306](https://leetcode.com/problems/additive-number/) | Medium | First-two-seed validation |
| [Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/) | Medium | Additive + collect path |

---

*Day 20 complete. Tomorrow: backtracking meets memoization — Word Break II. →*
