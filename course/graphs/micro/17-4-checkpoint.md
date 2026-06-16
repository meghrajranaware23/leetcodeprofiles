<!-- hand-authored -->
# ✅ Day 17 Checkpoint

> **Union-Find Fundamentals** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 17 is **merge groups, don't walk** — first B-Rank concept without a BFS queue.

| When you see... | Think... | Why |
|---|---|---|
| "redundant edge" / "edge forming cycle" | UF cycle detect | find(u)==find(v) before union |
| "connect all computers" / spare cables | UF component count | comps−1 merges needed |
| "same connected component?" | find(a)==find(b) | Near O(1) with compression |
| "shortest path unweighted" | **BFS** — not UF | Traversal, not merging |
| "minimum network delay" | **Dijkstra** — Day 19 | Weighted paths |

### 🧠 Quick Recognition Test

1. *"Return edge that completes a cycle in a tree+n graph"* → **UF** — first same-root edge
2. *"Minimum ops to connect all machines with spare cables"* → **UF** — count components + formula
3. *"Shortest path in binary matrix"* → **Day 8 BFS** — not Day 17
4. *"Merge accounts sharing emails"* → **Day 18** UF modeling — preview tomorrow

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given edges one by one, return the first edge that connects two already-connected nodes."*

Which pattern? **Union-Find cycle detection** — identical to Redundant Connection.

**Scenario 2:** *"Can you connect n nodes with k existing edges and spare edge insertions?"*

Which pattern? **UF component count** — need ≥ n−1 edges; count merges from spares.

**Scenario 3:** *"Find shortest path between two nodes in unweighted graph."*

Which pattern? **BFS** — UF doesn't give paths, only same/different group.

> **Answer key:** Day 17 = parent[] + find/union. No queue, no dist matrix.

---

## ⚠ Common Mistakes

1. **Using BFS for cycle in edge list** — UF one-pass is cleaner for undirected incremental edges.
2. **Skipping path compression** — degenerate chains slow find.
3. **Forgetting 1-indexed nodes** — size parent[1..n] when problem uses 1..n labels.
4. **Union without checking roots** — same root = cycle or already connected.
5. **Confusing with MST** — Day 21 uses UF to *skip* cycle edges while building tree.

---

## 🏋️ Mini Challenge

### [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/)

Re-solve without looking at the walkthrough. Trace parent[] on paper for edges [[1,2],[1,3],[2,3]].

**Before you code:** Say "find before union; same root = answer."

> 💡 **Hint:** Appears again in B-test Min Score Path — UF finds the component, then scan edges.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) | Medium | Union-Find Cycle Detection |
| [Number of Operations to Make Network Connected #1319](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) | Medium | Component Counting with UF |

---

*Day 17 complete! Tomorrow: model real objects as UF nodes. →*
