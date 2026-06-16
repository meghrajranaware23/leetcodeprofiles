<!-- hand-authored -->
# ✅ Day 12 Checkpoint

> **Topological Sort Applications** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 12 is **Kahn's peel** — forward (in-degree) and reverse (out-degree).

| When you see... | Think... | Why |
|---|---|---|
| "unlock dependencies over time" | Forward Kahn, queue indeg 0 | Sources peel first |
| "eventual safe" / "always terminates" | Reverse Kahn, queue outdeg 0 | Sinks peel backward |
| "supplies / ingredients available" | Supplies seed the queue | Initial indeg-0 set |
| "detect cycle in directed graph" | **Day 11** — 3-color OR peel count | Both work; Kahn is today's focus |
| "two teams / coloring" | **Day 13** — not Kahn | Undirected bipartite |

### 🧠 Quick Recognition Test

1. *"Find all recipes craftable from supplies"* → **Forward Kahn** — string nodes
2. *"Nodes where every path reaches a terminal"* → **Reverse Kahn** — outdeg peel
3. *"Can you finish all courses?"* → **Forward Kahn** (Day 11 overlap) — peel count
4. *"Gray neighbor during DFS"* → **Day 11 3-color** — not today's primary tool

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum number of semesters to finish all courses."*

Which pattern? **Forward Kahn with layer counting** — each queue generation = one semester.

**Scenario 2:** *"Nodes that can reach a cycle."*

Which pattern? **Reverse of safe states** — or 3-color: nodes that are gray/black but lead to gray.

**Scenario 3:** *"Sort tasks with priority ties broken by ID."*

Which pattern? **Kahn with sorted queue** — use priority queue instead of FIFO for tie-breaking.

> **Answer key:** All three use Kahn variants — forward peel with optional layer/sort tweaks.

---

## ⚠ Common Mistakes

1. **Forward peel for safe states** — must reverse graph and track out-degree.
2. **Forgetting supplies as indeg-0** — recipes with all ings in supplies start ready.
3. **Not adding crafted items to `have`** — blocks downstream recipes.
4. **Enqueue before indeg hits 0** — same as Day 11.
5. **Confusing with leaf-peel (Day 16)** — undirected degree-1 removal is different.

---

## 🏋️ Mini Challenge

### [Sequence Reconstruction #444](https://leetcode.com/problems/sequence-reconstruction/)

**[→ Try Sequence Reconstruction on LeetCode](https://leetcode.com/problems/sequence-reconstruction/)**

Kahn's peel — but check that each step has **exactly one** indeg-0 node (unique order).

**Before you code:** When would two nodes share indeg 0? What does that mean for uniqueness?

> 💡 **Hint:** If queue size > 1 at any step → reconstruction impossible.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Find Eventual Safe States #802](https://leetcode.com/problems/find-eventual-safe-states/) | Medium | Reverse Topological Sort |
| [Find All Possible Recipes from Given Supplies #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) | Medium | Topological Dependency Chain |

---

*Day 12 complete! Tomorrow: bipartite graphs — two-color BFS on undirected edges. →*
