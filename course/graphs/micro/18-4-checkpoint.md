<!-- hand-authored -->
# ✅ Day 18 Checkpoint

> **Union-Find Applications** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 18 = **model entities → union positives → check negatives → group output**.

| When you see... | Think... | Why |
|---|---|---|
| "merge accounts" / shared email | UF on emails | Union star from acc[1] |
| "a==b" and "a!=b" equations | Two-pass UF | Union == first; verify != |
| "a/b = k" division | **Day 16 #399** weighted | Not plain equality UF |
| "smallest equivalent string" | UF + min char merge | B-test #1061 |
| "redundant edge" | **Day 17** cycle | Different flavor |

### 🧠 Quick Recognition Test

1. *"Merge accounts if any email overlaps"* → **Equivalence UF** — transitive closure
2. *"Can letter equations a==b, c!=d be satisfied?"* → **Constraint UF** — two passes
3. *"Evaluate division with given ratios"* → **Weighted graph / #399** — not #990
4. *"Count islands in grid"* → **DFS/BFS** — not UF modeling

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Groups of people linked by shared phone numbers — merge records."*

Which pattern? **UF on phone numbers** — same as Accounts Merge skeleton.

**Scenario 2:** *"Variables with equality and inequality constraints over small alphabet."*

Which pattern? **Two-pass UF** — union equals, then reject conflicting unequals.

**Scenario 3:** *"Given a/b=2 and b/c=3, is a/c=6?"*

Which pattern? **Evaluate Division #399** — weighted propagation, not Day 18 plain UF.

> **Answer key:** Equality = merge. Ratios = different tool. Order matters for != checks.

---

## ⚠ Common Mistakes

1. **Processing != before ==** — must union all positives first.
2. **Using weighted UF for #990** — plain merge only.
3. **Only unioning adjacent emails in row** — union first email with **all** in account.
4. **Confusing with bipartite** — != doesn't mean 2-color; means different UF roots after ==.
5. **Forgetting sorted output** — Accounts Merge requires sorted email lists.

---

## 🏋️ Mini Challenge

### [Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equality-equations/)

Trace equations `["a==b","b!=c","a==c"]` on paper. Which pass fails?

**Before you code:** Say "pass 1 union, pass 2 contradict check."

> 💡 **Hint:** Contrast with B-test Equivalent String — custom unite toward lex-smallest char.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) | Medium | Equivalence Class Union |
| [Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equality-equations/) | Medium | Constraint Union-Find |

---

*Day 18 complete! Tomorrow: weighted shortest paths with Dijkstra. →*
