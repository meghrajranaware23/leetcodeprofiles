<!-- hand-authored -->
# ✅ Day 2 Checkpoint

> **BFS — Breadth-First Search** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 2 is **grid BFS on `(r,c)`** and **multi-source level timelines**. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| `m×n` grid + 4-adjacent | Queue of `(r,c)` + DIRS | Cells are nodes |
| "minimum minutes" / "shortest steps" | BFS with `len(q)` batches | First visit = shortest time |
| Multiple sources spreading together | Enqueue all sources first | Multi-source BFS |
| "flood fill" / same-color region | Expand from seed, 4-dir | Component on grid |
| Trees "level order" (Day 3) | Same batch loop | Different neighbor rule |
| Unweighted distance on grid | BFS, not Dijkstra | Unit cost per step |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 2 pattern fires first?

1. *"Paint bucket tool — recolor connected same-color pixels"* → **Grid flood from `(sr,sc)`**
2. *"All rotten oranges spread simultaneously each minute"* → **Multi-source BFS + minute batch**
3. *"Shortest path in binary maze from (0,0) to (m-1,n-1)"* → **Single-source BFS on grid**
4. *"Why `for _ in range(len(q))`?"* → **One level / one minute per batch**

---

## 🎯 Transfer to Unseen Problems

You've done Flood Fill and Rotting Oranges. Can you apply **grid BFS** to new problems?

**Scenario 1:** *"Every 0 in a grid should store its Manhattan distance to the nearest 1."*

Which pattern? **Multi-source BFS** — enqueue all `1`s, BFS outward; first visit sets distance.

**Scenario 2:** *"Can you reach the bottom-right cell from top-left through 0-cells?"*

Which pattern? **Single-source BFS** — queue from `(0,0)`, 4-dir through passable cells.

**Scenario 3:** *"Return the number of enclave 1-cells not touching the border."*

Which pattern? **Grid flood** (DFS/BFS) from border `1`s first — preview of Surrounded Regions test.

> **Answer key:** All three use **`(r,c)` + DIRS + bounds** — same skeleton as Day 2 quests.

---

## ⚠ Common Mistakes

1. **Stack instead of queue for minimum time** — DFS doesn't guarantee earliest minute.

2. **No `len(q)` batch for simultaneous spread** — Rotting Oranges requires parallel minutes.

3. **Missing bounds check** — `0 <= nr < m and 0 <= nc < n` every neighbor.

4. **8-direction when problem says 4** — Diagonal doesn't count unless stated.

5. **Forgetting fresh / impossible check** — Return `-1` when BFS ends with fresh left.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem and solve without the walkthrough:

**[01 Matrix #542](https://leetcode.com/problems/01-matrix/)** — multi-source BFS from all `0`s (same init pattern as rotten oranges, inverted sources).

**Before you code:** Say *"multi-source BFS, batch optional, distance on first visit."*

> 💡 **Hint:** Re-read the minute batch trace in Rotting Oranges if timeline problems confuse you.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Flood Fill #733](https://leetcode.com/problems/flood-fill/) | Easy | BFS on Grid |
| [Rotting Oranges #994](https://leetcode.com/problems/rotting-oranges/) | Medium | Multi-Source BFS Preview |

---

*Day 2 complete! Tomorrow: DFS — go deep first, and restart for each new component. →*
