<!-- hand-authored -->
# ✅ Day 13 Checkpoint

> **Bipartite Graphs** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 13 is **undirected 2-coloring** — two groups, no same-color edges.

| When you see... | Think... | Why |
|---|---|---|
| "bipartite" / "two groups/teams" | 2-color BFS/DFS | Partition = color assignment |
| "dislikes" / "can't be together" | Build conflict graph, then 2-color | Modeling step first |
| "is graph bipartite" | Direct 2-color on given adj list | #785 template |
| "prerequisites" / "course order" | **Day 11–12** — directed Kahn | Wrong edge direction |
| "safe states" / "dependencies" | **Day 12** — peel | Not coloring |

### 🧠 Quick Recognition Test

1. *"Split people into two groups; dislikes can't share"* → **Conflict graph + 2-color**
2. *"Is this undirected graph 2-colorable?"* → **BFS with XOR flip**
3. *"Can you finish all courses?"* → **Not Day 13** — directed cycle
4. *"Same color on an edge during BFS"* → **Odd cycle** — not bipartite

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Assign departments so conflicting projects are in different buildings."*

Which pattern? **Conflict graph from project pairs → 2-color.**

**Scenario 2:** *"Checkerboard coloring of a grid (4-neighbor)."*

Which pattern? **Implicit bipartite** — `(r+c) % 2` gives the two colors without BFS.

**Scenario 3:** *"3-color a graph with fewest colors."*

Which pattern? **Not Day 13** — NP-hard general case. Day 13 is specifically 2-color.

> **Answer key:** Scenarios 1–2 = bipartite. Scenario 3 = beyond this day's scope.

---

## ⚠ Common Mistakes

1. **Directed edges for mutual conflict** — dislikes are undirected.
2. **Skipping graph construction (#886)** — half the problem is modeling.
3. **Using 3-color DFS from Day 11** — directed tool, wrong problem class.
4. **Single-component BFS when graph disconnected** — loop all starts.
5. **Off-by-one on 1-indexed people** — array size n+1.

---

## 🏋️ Mini Challenge

### [Flower Planting With No Adjacent #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/)

**[→ Preview C-Rank Test 1 on LeetCode](https://leetcode.com/problems/flower-planting-with-no-adjacent/)**

Adjacent gardens can't share a type — conflict edges. Trees need only 2 colors; general graphs need up to 4. Greedy neighbor-check works here.

**Before you code:** Why are 4 flower types always enough for any garden graph?

> 💡 **Hint:** Appears in C-Rank test — revisit after Day 16.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Is Graph Bipartite? #785](https://leetcode.com/problems/is-graph-bipartite/) | Medium | BFS/DFS Two-Coloring |
| [Possible Bipartition #886](https://leetcode.com/problems/possible-bipartition/) | Medium | Conflict Graph Coloring |

---

*Day 13 complete! Tomorrow: DAG reasoning — sources, sinks, and ancestor accumulation. →*
