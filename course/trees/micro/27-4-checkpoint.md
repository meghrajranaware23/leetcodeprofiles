<!-- hand-authored -->
# ✅ Day 27 Checkpoint

> **Tree + Graph Hybrid** · 2 quests completed · ⭐ 100 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 27 treats trees as **graphs** when upward movement matters. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "infection" / "spread from node X" | Parent-map BFS | #2385 |
| "distance K from target" | C-Rank #863 parent BFS | Same graph build |
| "directions between two nodes" | L/R paths + U prefix strip | #2096 |
| "LCA" (Day 13) | Split node OR common path prefix | Two views |
| "minutes until all visited" | BFS level count | Infection quest |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 27 pattern fires first?

1. *"Time to infect entire tree from start node"* → **Parent-map multi-source BFS**
2. *"Shortest path directions using U/L/R"* → **LCA + path string construction**
3. *"All nodes distance K from target"* → **C-Rank #863** — BFS stop at k
4. *"LCA of two nodes in binary tree"* → **Day 13 split detection**

---

## 🎯 Transfer to Unseen Problems

You've done Infection and Step Directions. Can you extend **tree-as-graph**?

**Scenario 1:** *"Find node closest to both start and dest (meeting point)."*

Which pattern? **LCA** — explicit or via path prefix on root paths.

**Scenario 2:** *"Burn tree from multiple fire sources simultaneously."*

Which pattern? **Multi-source BFS** — all sources in queue at time 0.

**Scenario 3:** *"Serialize tree with parent pointers for deserialization."*

Which pattern? **Parent map inverse** — different goal, same adjacency thinking.

> **Answer key:** Day 27 = **add parent edges when tree DFS isn't enough** + **path strings encode LCA**.

---

## ⚠ Common Mistakes

1. **BFS without visited** on undirected tree graph — infinite loop.

2. **Path DFS without backtracking** — wrong L/R strings.

3. **Confusing minutes index** — track whether start counts as minute 0.

4. **Explicit LCA when prefix suffices** — over-engineering #2096.

5. **Downward-only BFS from non-root start** — misses ancestors.

---

## 🏋️ Mini Challenge

### [All Nodes Distance K in Binary Tree #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

**[→ Try Distance K on LeetCode](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)**

C-Rank test — same parent-map BFS as infection, but collect values at distance k.

**Before you code:** Compare graph build to today's infection quest — identical preprocessing.

> 💡 **Hint:** C-test-2 — bridge from Day 27 concept.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Amount of Time for Binary Tree to Be Infected #2385](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) | Medium | Multi-Directional BFS |
| [Step-by-Step Directions from a Binary Tree Node to Another #2096](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/) | Medium | LCA + Path Construction |

---

*Day 27 complete! A-Rank tests ahead — serialize, count complete, delete forest. →*
