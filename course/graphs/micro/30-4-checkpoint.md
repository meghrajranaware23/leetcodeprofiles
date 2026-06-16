<!-- hand-authored -->
# ✅ Day 30 Checkpoint

> **The Final Ascension** · 2 quests completed · ⭐ 160 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 30 is **Graph Legend capstone** — route through the decision tree, then execute.

| When you see... | Think... | Why |
|---|---|---|
| "visit all nodes" + small n | Bitmask BFS `(node, mask)` | Subset state; multi-source init |
| "Alice and Bob" / dual connectivity | Dual UF + edge type order | Type 3 → 1 → 2 |
| "remove max edges" + constraints | Greedy UF keep minimum | Answer = total - used |
| Any new graph problem | **Run decision tree first** | Days 1–29 route before code |
| n > 20 + visit all | Not plain bitmask | May need DP/heuristic — n≤12 for #847 |

### 🧠 Quick Recognition Test

1. *"Shortest walk visiting every node at least once, n=12"* → **Bitmask BFS — `(u, mask)`**
2. *"Max edges to delete; Alice types 1∪3, Bob types 2∪3, both connected"* → **Dual UF, type 3 first**
3. *"Use all airline tickets once"* → **Day 29 Hierholzer** — not Day 30
4. *"Minimum fuel for cities to report to capital (tree)"* → **S-Test #2477 post-order**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Shortest path collecting keys on a grid (state = pos + key mask)."*

Which pattern? **Bitmask BFS cousin** — `(r,c,mask)` like Day 30 #847 with spatial state.

**Scenario 2:** *"Two networks must stay connected using disjoint edge sets."*

Which pattern? **Dual UF** — same skeleton as Remove Max Edges #1579.

**Scenario 3:** *"Find shortest path in unweighted graph."*

Which pattern? **Day 8 BFS** — decision tree says unweighted before bitmask.

> **Answer key:** Scenario 1 = Day 30 extended. Scenario 2 = Day 30. Scenario 3 = Day 8.

---

## ⚠ Common Mistakes

1. **Visit All Nodes: single visited[node]** — need `dist[node][mask]`.
2. **Visit All Nodes: start only from 0** — multi-source all `(i, 1<<i)`.
3. **Remove Edges: one UF** — alice and bob are separate.
4. **Remove Edges: wrong processing order** — type 3 before 1 and 2.
5. **Skip decision tree on S-Tests** — name pattern in 30 seconds first.

---

## 🏋️ Mini Challenge

You are ready for **S-Rank tests**. Review the capstone map:

| Test | Pattern | Day link |
|---|---|---|
| Valid Path Cost #1368 | 0-1 BFS deque | Day 8 / 20 variant |
| Edge Length Limited #1697 | Offline sort + UF | Day 17–18 |
| Fuel Cost #2477 | Tree post-order subtree | Day 16 / tree agg |

**Before each test:** Run the decision tree. Say the day and pattern aloud.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Shortest Path Visiting All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | Hard | Bitmask BFS |
| [Remove Max Number of Edges to Keep Graph Fully Traversable #1579](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) | Hard | Dual Union-Find |

---

*Day 30 complete! S-Rank tests await — prove Graph Legend status. →*
