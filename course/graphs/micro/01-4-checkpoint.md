<!-- hand-authored -->
# ✅ Day 1 Checkpoint

> **The Graph Mental Model** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 1 is about **representation**: adjacency lists, in/out degrees, and connectivity as "same component." Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| `edges` + `n` nodes | Build `adj[u]` lists | Traverse neighbors in O(degree) |
| `trust [a,b]` directed | `out[a]++`, `in[b]++` | One-way arrows |
| "town judge" / "trusted by all" | in = n−1, out = 0 | Degree scan, no BFS |
| "path exists" / "can reach" | Same component | DFS, BFS, or Union-Find |
| Undirected edge `[u,v]` | Push both directions in `adj` | Missing half breaks traversal |
| Nodes labeled `1…n` | Size arrays `n+1` | Off-by-one on index 0 |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 1 pattern fires first?

1. *"Convert edge list to neighbor lists for n nodes"* → **Adjacency list build**
2. *"Who is trusted by everyone and trusts nobody?"* → **In/out degree scan**
3. *"Can node 0 reach node 5 in an undirected graph?"* → **Connectivity / same component**
4. *"Given trust pairs, count how many people trust person 4"* → **In-degree of 4**

---

## 🎯 Transfer to Unseen Problems

You've solved Town Judge and Path Exists. Can you apply **Day 1 storage patterns** to new problems?

**Scenario 1:** *"Return the number of people who trust exactly one person (out-degree 1)."*

Which pattern? **Degree counting** — same loop as Town Judge, different filter on `out[i]`.

**Scenario 2:** *"Given undirected edges, list all nodes reachable from node 0."*

Which pattern? **Adjacency list + DFS/BFS** (Day 3 formalizes DFS) — build `adj`, walk from 0 with visited.

**Scenario 3:** *"After adding one edge, do nodes 2 and 7 become connected?"*

Which pattern? **Union-Find** — unite all edges, compare `find(2)` and `find(7)`.

> **Answer key:** All three start with **reading edges into a structure** (adj, degrees, or UF). The local question changes — the setup does not.

---

## ⚠ Common Mistakes

1. **1-indexed nodes with 0-length arrays** — Town Judge uses `1…n`; allocate `n+1`.

2. **Directed vs undirected** — Trust is one-way; Path Exists edges go both ways in `adj`.

3. **Only in-degree for judge** — Must also verify `out == 0` (Example 2 fails otherwise).

4. **Checking only adjacent edge for path** — Multi-hop paths matter; think components.

5. **Skipping the drawing step** — Label nodes, draw arrows, count in/out by hand first.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Re-solve one Day 1 quest **without looking at the solution** — but write your edge-processing loop on paper first.

**Town Judge drill:** Given `n=5` and 4 trust pairs all pointing to person 2, predict the answer before coding.

**Path Exists drill:** Draw two disconnected triangles. Pick nodes in different triangles — path should be false.

> 💡 **Hint:** Re-read the degree table in Quest 1's walkthrough if Town Judge still feels fuzzy.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Find the Town Judge #997](https://leetcode.com/problems/find-the-town-judge/) | Easy | Degree Analysis |
| [Find if Path Exists in Graph #1971](https://leetcode.com/problems/find-if-path-exists-in-graph/) | Easy | Adjacency List + Connectivity |

---

*Day 1 complete! Tomorrow: explore grids and graphs with BFS — the queue goes wide. →*
