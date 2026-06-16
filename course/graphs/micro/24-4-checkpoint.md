<!-- hand-authored -->
# ✅ Day 24 Checkpoint

> **Graph Modeling** · 2 quests completed · ⭐ 100 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 24 = **construct the graph from non-graph input**, then traverse.

| When you see... | Think... | Why |
|---|---|---|
| "Detonate / blast radius / chain" | O(n²) overlap → directed DFS | Build edges from geometry |
| "Collect apples on tree / return to start" | Post-order return-cost DFS | +2 per apple-bearing child |
| "Points + radius" | Pairwise distance test | long long for dist² |
| "Shortest path in given graph" | **Day 8/19** | Graph already explicit |
| "Word transformation" | **Day 23** | Implicit BFS, not build-first |

### 🧠 Quick Recognition Test

1. *"Max bombs in chain detonation"* → **Build overlap graph, DFS from each start**
2. *"Min time to collect all apples on tree"* → **Subtree DFS, +2 if subtree has apples**
3. *"Connect points within distance d"* → **Union-Find or geometric edges** — related build step
4. *"Network delay from source"* → **Day 19 Dijkstra** — not modeling day

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given circles, find if any chain of overlaps connects circle A to circle B."*

Which pattern? **Geometric graph + reachability** — same build as bombs, undirected if mutual overlap.

**Scenario 2:** *"Tree with coins on nodes — min edges to collect all and return to root."*

Which pattern? **Same return-cost DFS** as apples quest.

**Scenario 3:** *"Minimum genetic mutation with bank."*

Which pattern? **Day 10/23 implicit BFS** — no explicit graph build.

> **Answer key:** Scenarios 1–2 = Day 24 modeling. Scenario 3 = implicit state BFS.

---

## ⚠ Common Mistakes

1. **Wrong bomb trigger threshold** — use problem's radius rule with long long.
2. **Visiting all tree nodes** — prune empty subtrees.
3. **Forgetting +2 return leg** — each used child edge is round-trip.
4. **Building graph then using Dijkstra unnecessarily** — bomb quest is unweighted reachability.
5. **Confusing with MST/connect points** — different objective (Day 21).

---

## 🏋️ Mini Challenge

Name the **build step** and **traverse step** for each:

| Problem | Build | Traverse |
|---|---|---|
| Detonate Bombs #2101 | overlap adjacency | DFS max component |
| Collect Apples #1443 | tree adj | return-cost DFS |
| Evaluate Division #399 | weighted ratio edges | path multiply DFS |

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Detonate Maximum Bombs #2101](https://leetcode.com/problems/detonate-maximum-bombs/) | Medium | Geometric Graph Construction |
| [Minimum Time to Collect All Apples in a Tree #1443](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/) | Medium | Tree DFS + Return Cost |

---

*Day 24 complete! Tomorrow: Dijkstra with counting and all-pairs thresholds. →*
