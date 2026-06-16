<!-- hand-authored -->
# ✅ Day 4 Checkpoint

> **Grids as Graphs** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 4 is **4-direction grid graphs**: perimeter edge math and **restart flood** for island counting.

| When you see... | Think... | Why |
|---|---|---|
| "island perimeter" / "boundary length" | +4/−2 or +1 per water edge | Local arithmetic |
| "number of islands" | Scan + `count++` + dfs sink | Component restart on grid |
| Binary `m×n` grid | DIRS + bounds | Standard grid graph |
| Land cells share edge | Subtract 2 in perimeter formula | Internal edge not on boundary |
| `'1'`/`'0'` or `1`/`0` | Match type in code | Char vs int grids |
| "4-directionally connected" | No diagonals | Corner-touch ≠ connected |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 4 pattern fires first?

1. *"Return perimeter of shapes in a binary grid"* → **Boundary counting (+4/−2)**
2. *"How many separate land regions in the grid?"* → **Restart flood from each `1`**
3. *"Single land cell in 1×1 grid perimeter?"* → **4**
4. *"Two horizontally adjacent land cells — shared edge?"* → **Subtract from perimeter, not counted twice**

---

## 🎯 Transfer to Unseen Problems

You've done Island Perimeter and Number of Islands. Can you apply **grid patterns** to new problems?

**Scenario 1:** *"Return the area of the largest island in a binary grid."*

Which pattern? **Restart flood + accumulate size** — Day 5 Max Area (#695) formalizes this.

**Scenario 2:** *"Flip all `'O'` surrounded by `'X'` to `'X'`."*

Which pattern? **Border DFS first** — E-Rank Test #130; flood from boundary `'O'`s, flip interior.

**Scenario 3:** *"Count land cells in each island and return the distribution."*

Which pattern? **Same as #200** — each flood returns a size count.

> **Answer key:** All three use **4-dir grid traversal**; perimeter is the odd one out ( arithmetic not flood).

---

## ⚠ Common Mistakes

1. **Perimeter: land × 4 without −2** — Shared edges inflate the answer.

2. **Islands: count cells not components** — One island, many cells → count is 1.

3. **Diagonal connectivity** — Unless problem says 8-dir, corners don't connect.

4. **Forget to mark visited during flood** — Revisit → infinite DFS or wrong count.

5. **Perimeter DFS when scan formula suffices** — O(m·n) scan is simpler than flood for #463.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

**[Max Area of Island #695](https://leetcode.com/problems/max-area-of-island/)** — tomorrow's quest; try it early if #200 felt easy.

**Before you code:** Same restart loop — but dfs **returns** cell count instead of void.

> 💡 **Hint:** Re-read the sink walkthrough in Number of Islands if restart timing is unclear.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Island Perimeter #463](https://leetcode.com/problems/island-perimeter/) | Easy | Grid Boundary Counting |
| [Number of Islands #200](https://leetcode.com/problems/number-of-islands/) | Medium | Grid DFS/BFS Components |

---

*Day 4 complete! Tomorrow: measure components and clone a graph node-by-node. →*
