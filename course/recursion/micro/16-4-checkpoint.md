<!-- hand-authored -->
# ✅ Day 16 Checkpoint

> **Grid Backtracking** · 2 quests completed · ⭐ 90 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Undo mechanism |
|---|---|---|
| "word search" / grid path | 4-dir DFS + mark cell | Restore char |
| "letter case permutation" | Binary branch per alpha | path.pop() |
| "same cell twice" forbidden | Must mark before recurse | Unmark after |
| "all subsets" | Day 11 — index not grid | path.pop() |

### 🧠 Quick Recognition Test

1. *"Find word in 2D character board"* → **Mark '#', dfs 4 dirs, unmark, try all starts.**

2. *"All case variations of a string"* → **Index dfs, lower/upper branch per letter.**

3. *"Count islands"* → **DFS without unmark — different problem (visited stays).**

4. *"Combination sum with reuse"* → **Day 13 — not grid.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Unique paths in grid with obstacles."*

DFS/backtrack or DP — if path can revisit, different from Word Search.

**Scenario 2:** *"Generate all strings from mapping digits to letters."*

Multiple branches per digit — like Letter Case but 3-4 branches (#17).

---

## ⚠ Common Mistakes

1. **No unmark on failed dfs** — Board permanently corrupted.
2. **8 directions on Word Search** — Only 4 allowed.
3. **Skip outer start loop** — Word can begin at any cell.
4. **Confuse mark/unmark with visited[][] that never clears** — Must backtrack visited state.

---

## 🏋️ Mini Challenge

Write Word Search dfs signature and the mark/unmark two-liner from memory.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Word Search #79](https://leetcode.com/problems/word-search/) | Medium | grid mark/unmark |
| [Letter Case Permutation #784](https://leetcode.com/problems/letter-case-permutation/) | Medium | binary index branch |

---

## 🏁 C-Rank Test Next

Three problems test everything from Days 11–16:

1. **Combination Sum II** — Day 13 + Day 15 dedup
2. **Letter Tile Possibilities** — permutation count with repeats
3. **Split Array into Fibonacci Sequence** — string partition + constraint

Say the pattern name before you code. Trace first.

---

*Day 16 complete. Take the C-Rank test when ready. →*
