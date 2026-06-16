<!-- hand-authored -->
# ✅ Day 24 Checkpoint

> **Disguised Backtracking** · 2 quests completed · ⭐ 115 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "max gold" / "collect on grid" + no reuse | Collect-and-backtrack | Mark 0, restore gold value |
| "visit every empty cell" + start/end | Coverage backtrack | `left` counter, ans at end if left==0 |
| Grid path + mark/unmark | Day 16 DNA | choose → 4 dirs → unchoose |
| Count valid complete walks/boards | Day 18 DNA | Global counter at leaf |
| Small grid, path-dependent state | Pure backtrack | Not Day 23 index memo |
| Word Search | Existential mark/unmark | Today's problems optimize or count |

### 🧠 Quick Recognition Test

1. *"Maximum gold path, no cell twice"* → **Mark 0, dfs from every gold cell, restore, track best.**

2. *"Count paths visiting all empties from 1 to 2"* → **`empty = zeros+1`, dfs(sr,sc,empty), ans++ at end if left==0.**

3. *"Unique paths top-left to bottom-right (right/down only)"* → **DP #62 — not today's backtrack.**

4. *"Find word in grid"* → **Day 16 Word Search — match chars, not coverage counter.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Shortest path to collect all keys in a grid (with keys and locks)."*

Which pattern? **BFS/state-space — not pure backtrack.** Keys add bitmask state; different from today's counter-only dfs.

**Scenario 2:** *"Number of islands in a grid."*

Which pattern? **Flood-fill DFS — no unmark.** Visit once globally, not path backtracking.

**Scenario 3:** *"Count Hamiltonian paths in a small graph from node A to B visiting all nodes."*

Which pattern? **Same as Unique Paths III.** Mark visited, decrement remaining, count at destination when all visited.

> **Answer key:** Scenario 3 → coverage backtrack (today). Scenarios 1–2 → different techniques.

---

## ⚠ Common Mistakes

1. **Gold: forget restore after dfs** — `0` cells leak into other start paths.
2. **Gold: single starting cell** — Must try every positive gold cell.
3. **Unique Paths: `empty` off by one** — Include start in initial `left`.
4. **Unique Paths: count at end without `left==0`** — Early arrival on `2` is invalid.
5. **Applying Day 23 memo on grid paths** — Visit sets differ per path; naive memo wrong.

---

## 🏋️ Mini Challenge

From memory, write the mark/unmark core (6 lines) for gold dfs. Then write the end-cell check for Unique Paths III.

Say aloud: *"take, best, zero, four dirs, restore"* and *"at end, left must be zero."*

> 💡 **Self-check:** Does your Unique Paths dfs restore `grid[r][c]=0` after exploring neighbors?

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Path with Maximum Gold #1219](https://leetcode.com/problems/path-with-maximum-gold/) | Medium | Collect-and-backtrack |
| [Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/) | Medium | Full grid coverage count |
| [Word Search #79](https://leetcode.com/problems/word-search/) | Medium | Day 16 — mark/unmark baseline |

---

## 🔭 A-Rank Preview

Day 25 shifts to **recursive counting** on abstract structures — Catalan numbers for BST shapes, divide-and-conquer splits for parenthesized expressions. Same trust-the-subcall spirit as Day 7 merge sort, but counting combinations instead of sorting.

---

*Day 24 complete. Tomorrow: Catalan splits and parenthesis D&C. →*
