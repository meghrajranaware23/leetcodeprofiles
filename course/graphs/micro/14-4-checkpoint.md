<!-- hand-authored -->
# ✅ Day 14 Checkpoint

> **DAG Reasoning** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 14 is **DAG structure** — acyclic, so sources and ancestors are well-defined.

| When you see... | Think... | Why |
|---|---|---|
| "DAG" / "directed acyclic" | Skip cycle detection | Graph is already valid |
| "minimum starts to reach all" | Count in-degree 0 | Sources only |
| "all ancestors of each node" | Forward DFS or topo merge | Reachability accumulation |
| "can you finish courses" | **Day 11** — cycle maybe | Not pure DAG reasoning |
| "two groups / bipartite" | **Day 13** | Undirected |

### 🧠 Quick Recognition Test

1. *"Smallest set of nodes to reach every node in a DAG"* → **In-degree-0 scan**
2. *"List all ancestors for every node in a DAG"* → **Per-source DFS or topo accumulate**
3. *"Detect cycle in prerequisites"* → **Not Day 14** — Day 11 Kahn
4. *"Node with indeg 0 in a disconnected DAG"* → **Mandatory start** for its component

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Longest path in a weighted DAG."*

Which pattern? **Topological sort + relax** — process in order, update dist[v] = max(dist[u]+w).

**Scenario 2:** *"Count paths from source to sink in DAG."*

Which pattern? **Topo DP** — paths[v] += paths[u] for each edge u→v.

**Scenario 3:** *"Is there a path from A to B?"* (many queries)

Which pattern? **Day 15 transitive closure** — precompute reachability matrix.

> **Answer key:** All exploit DAG ordering — Day 14 builds the structural intuition.

---

## ⚠ Common Mistakes

1. **Full BFS for min sources** — one indeg scan suffices.
2. **Including self in ancestor list** — ancestors are proper predecessors.
3. **Running cycle detection on stated DAG** — wasted work.
4. **Topo merge with wrong order** — parents must precede children.
5. **Confusing ancestors with descendants** — edge u→v means u is ancestor of v.

---

## 🏋️ Mini Challenge

### [Keys and Rooms #841](https://leetcode.com/problems/keys-and-rooms/)

**[→ Try Keys and Rooms on LeetCode](https://leetcode.com/problems/keys-and-rooms/)**

Not a DAG problem — but tests reachability from node 0. Contrast: Day 14 asks *who must you start from*; Keys and Rooms asks *can one start reach all*.

**Before you code:** How is this different from minimum vertices?

> 💡 **Hint:** Single source (room 0), not minimum source cover.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Minimum Number of Vertices to Reach All Nodes #1557](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/) | Medium | In-Degree Zero Source Scan |
| [All Ancestors of a Node in a Directed Acyclic Graph #2192](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/) | Medium | DAG Ancestor Accumulation |

---

*Day 14 complete! Tomorrow: reachability precomputation and tree-DAG propagation. →*
