<!-- hand-authored -->
# ✅ Day 9 Checkpoint

> **Direction-Aware Traversal** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 9 is **directed DFS** — path backtrack or edge-flip counting, not BFS layers.

| When you see... | Think... | Why |
|---|---|---|
| "all paths" in DAG | DFS push/pop + `path[:]` | Enumerate, not shortest |
| "reorder routes" / "flip edges toward 0" | DFS tree + cost 0/1 | Misdirected edge count |
| "shortest path only" | **Day 8** BFS | One answer, not all |
| "undirected grid BFS" | Earlier days | Not direction-aware |
| "save path without pop" | **Bug** | Sibling contamination |

### 🧠 Quick Recognition Test

1. *"All paths from 0 to n-1 in DAG"* → **DFS path backtrack** (#797)
2. *"Minimum edge reversals so all cities reach 0"* → **DFS with flip costs** (#1466)
3. *"Shortest path in binary matrix"* → **Day 8** — BFS layers
4. *"Course schedule / prerequisites"* → **Later ranks** — topo sort, not Day 9 template

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Return all root-to-leaf paths in a binary tree as lists of node values."*

Which pattern? **Same push/pop backtrack** as All Paths — tree is a DAG with no cross edges.

**Scenario 2:** *"Given one-way streets, minimum reversals so everyone can drive to city 0."*

Which pattern? **Reorder Routes** — adjacency with directional cost, DFS from 0.

**Scenario 3:** *"Count paths from top-left to bottom-right with exactly k turns."*

Which pattern? **Harder** — may need DFS with extra state — still not BFS-for-shortest unless optimizing.

> **Answer key:** Scenarios 1–2 = Day 9 DFS variants. Path list vs edge cost encoding.

---

## ⚠ Common Mistakes

1. **Forgetting `path.pop()`** — All Paths returns wrong/shared routes.
2. **BFS for all paths** — Finds one shortest path, misses others.
3. **Global visited in DAG all-paths** — Blocks valid alternate routes unnecessarily.
4. **Wrong cost orientation in reorder** — `(a,b): a→(b,1), b→(a,0)` is the standard encoding.
5. **No parent parameter in reorder DFS** — Infinite loop on undirected adjacency view.

---

## 🏋️ Mini Challenge

### [Keys and Rooms #841](https://leetcode.com/problems/keys-and-rooms/)

**[→ Try Keys and Rooms on LeetCode](https://leetcode.com/problems/keys-and-rooms/)**

Can you visit all rooms? Directed graph reachability DFS from room 0 — simpler Day 9 cousin (no backtrack collection).

**Before you code:** How is this easier than All Paths?

> 💡 **Hint:** One boolean visited array — no path list needed.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [All Paths From Source to Target #797](https://leetcode.com/problems/all-paths-from-source-to-target/) | Medium | DFS Path Recording |
| [Reorder Routes to Make All Paths Lead to the City Zero #1466](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/) | Medium | Edge Direction Reasoning |

---

*Day 9 complete! Tomorrow: abstract states — locks and genes, not grids. →*
