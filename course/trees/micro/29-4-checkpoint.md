<!-- hand-authored -->
# ✅ Day 29 Checkpoint

> **Tree Synthesis II** · 2 quests completed · ⭐ 150 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 29 threaded **Day 19/24 trie design** with **Day 8 spatial construction**. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "dictionary" + "prefix" | Trie insert/search | Day 19 |
| "`.` wildcard" in query | Trie DFS — try all children | Day 24 |
| "exactly one char different" | Mismatch count == 1 | Magic Dictionary |
| "same length" on search | Filter before compare | Magic Dictionary |
| "construct quad tree" | 4-way divide on grid | Day 29 |
| "uniform subgrid" | Leaf base case | Unify |
| "topLeft, topRight, bottomLeft, bottomRight" | Fixed quadrant order | #427 convention |

### 🧠 Quick Recognition Test

1. *"Add words; search with `.` matching any letter"* → **Day 24 WordDictionary** — trie DFS wildcard
2. *"Search word differs by exactly one character from a stored word"* → **Magic Dictionary** — length filter + diff count
3. *"Build tree representing equal-value grid regions"* → **Quad-tree** — unify or 4-way split
4. *"Merge four identical leaf quadrants"* → **Unify optimization** — collapse after build

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Design a dictionary where search allows at most 2 character mismatches."*

Which pattern? **Magic Dictionary + higher threshold** — return true when `diff <= 2`. Trie DFS tracks `used` budget.

**Scenario 2:** *"Given an image (2^n × 2^n), compress uniform blocks into a quad-tree."*

Which pattern? **Same as #427** — scan region, leaf if uniform, else recurse four quadrants.

**Scenario 3:** *"Insert words into trie; count words with given prefix."*

Which pattern? **Day 19 trie** — store count at end nodes; prefix search walks to node and reads subtree count.

> **Answer key:** Character tree → trie thread (Days 19/24/29). Spatial grid tree → divide/unify thread (Days 8/29).

---

## ⚠ Common Mistakes

1. **Magic: accept exact match (diff=0)** — Must be exactly **one** mismatch.

2. **Magic: compare different lengths** — Skip immediately.

3. **Quad-tree: wrong `(r,c)` for bottom-right** — Origin is `(r+half, c+half)`.

4. **Quad-tree: binary split** — Four children, not two.

5. **Confusing Magic Dictionary with WordDictionary** — Wildcard in query vs mismatch count.

---

## 🏋️ Mini Challenge

### [Add and Search Word #211](https://leetcode.com/problems/add-and-search-word-data-structure-design/)

**[→ Try Add and Search Word on LeetCode](https://leetcode.com/problems/add-and-search-word-data-structure-design/)**

Day 24 core — trie with `.` wildcard. Compare to today's Magic Dictionary: unlimited `.` vs exactly-one diff.

**Before you code:** Draw trie for `["bad", "dad", "mad"]`. Trace `search(".ad")`.

> 💡 **Hint:** On `.`, recurse into **every** non-null child.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Implement Magic Dictionary #676](https://leetcode.com/problems/implement-magic-dictionary/) | Medium | Trie + Wildcard Design |
| [Construct Quad Tree #427](https://leetcode.com/problems/construct-quad-tree/) | Medium | Divide and Conquer Tree Build |

---

*Day 29 complete! Tomorrow: capstone — the full pattern decision tree. →*
