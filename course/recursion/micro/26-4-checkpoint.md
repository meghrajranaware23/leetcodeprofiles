<!-- hand-authored -->
# ✅ Day 26 Checkpoint

> **Backtracking Synthesis I** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Synthesis Recognition — Two Trees, One Template

Day 26 revisited Day 8. Before you move on, prove you can **name the tree in under 10 seconds**:

| When you see... | Tree type | State | Branch rule |
|---|---|---|---|
| "phone keypad" / "letter combinations" / digits → letters | **Multi-branch index** | `i`, path | Loop all letters on `digits[i]` |
| "well-formed parentheses" / "n pairs" / balanced | **Constrained open/close** | `open`, `close`, path | `(` if `open > 0`; `)` if `open > close` |
| "generate all" + no prefix rule | Multi-branch | varies | All choices valid |
| "generate all" + prefix validity | Constrained | counters | Prune invalid branches |

### 🧠 Quick Synthesis Test

Read each mini-problem. Which **Day 8 tree** fires first?

1. *"Given digits `'79'`, return all letter combinations"* → **Multi-branch index** (`i` + KEYS table, 4 branches on `'7'`)
2. *"Given n=3, generate all valid parenthesis strings"* → **Constrained open/close** (base at length 6, prune `)`)
3. *"Given `'234'`, how many combinations?"* → **Multi-branch index** (product of branch sizes: 3×3×3 = 27)
4. *"Why not generate all 2^(2n) strings and filter?"* → **Parentheses prunes at generation** — most strings never exist in the tree

---

## 🎯 Side-by-Side Transfer

You've coded both trees. Can you explain the **difference** without looking at solutions?

**Scenario 1:** *"Letter combinations on `'2'` — how many branches at root?"*

**Answer:** 3 branches (`a`, `b`, `c`). All valid. No pruning.

**Scenario 2:** *"Generate parentheses n=2 — how many branches at root?"*

**Answer:** 1 branch (`(`). `)` is invalid at root because `open > close` fails (0 > 0).

**Scenario 3:** *"Both use push/dfs/pop. What is the only structural difference?"*

**Answer:** Branch **gate**. Phone pad: gate is always open. Parentheses: gate checks `open`/`close` counters.

> **Synthesis key:** Same skeleton. Different state. Different gate.

---

## ⚠ Common Mistakes (Day 8 Déjà Vu)

1. **Pop forgotten** — Sibling branches inherit wrong prefix (both trees).
2. **Nested loops on phone pad** — Index `i` generalizes; loops don't.
3. **Generate-then-filter on parentheses** — Invalid strings should never be built.
4. **Wrong close rule** — Use `open > close`, not `close < n`.
5. **Empty digits** — Return `[]`, not `[""]`.

---

## 🏋️ Mini Challenge — Code Both Cold

Set a **5-minute timer**. Without notes:

1. Implement Letter Combinations #17 from the multi-branch index tree.
2. Implement Generate Parentheses #22 from the open/close tree.

**Pass criteria:** Both compile and pass LeetCode examples. You can draw each tree in 30 seconds.

> 💡 **Hint:** If you fail, re-read today's concept page side-by-side diagram — not Day 8 from scratch.

---

## 📚 Practice Queue

| Problem | Difficulty | Tree Type |
|---|---|---|
| [Letter Combinations of a Phone Number #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Medium | Multi-branch index |
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | Medium | Constrained open/close |

---

*Day 26 complete! Tomorrow: interview-speed memo recognition. →*
