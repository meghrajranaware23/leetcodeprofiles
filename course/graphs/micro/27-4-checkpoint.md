<!-- hand-authored -->
# ✅ Day 27 Checkpoint

> **Multi-Pattern Synthesis** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 27 = **choose the right tool in 30 seconds** — expanded BFS vs static degree math.

| When you see... | Think... | Why |
|---|---|---|
| Min jumps + forbidden + move rules | BFS `(pos, flag)` | History in state |
| "Cannot X twice in a row" | Expand state tuple | Day 10/27 family |
| "Network rank" of city pair | deg[i]+deg[j]−edge | No traversal |
| "Maximum over all pairs" static | O(n²) formula | Pattern triage |
| Weighted shortest path count | **Day 25** | Dijkstra + ways |

### 🧠 Quick Recognition Test

1. *"Jump +a/-b, no double back, forbidden cell"* → **BFS (pos, back)**
2. *"Max rank of two cities sharing roads"* → **Degree sum minus shared edge**
3. *"Should I BFS network rank?"* → **No — static formula**
4. *"S30 visit all nodes"* → **State-space preview — bitmask BFS coming**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Shortest path visiting all nodes in small graph (n≤12)."*

Which pattern? **S30 — bitmask state BFS** — Day 27 decision: expand state when constraint is "which nodes visited."

**Scenario 2:** *"Two users with friend lists — max common friend pair rank."*

Which pattern? **Similar to network rank** — set intersection size, not pathfinding.

**Scenario 3:** *"Minimum operations convert number with +/- nums."*

Which pattern? **Bounded BFS on integer state** — A-test #2059.

> **Answer key:** All three need pattern triage before coding — Day 27 skill.

---

## ⚠ Common Mistakes

1. **Position-only BFS on jump problem** — need back flag.
2. **BFS on rank problem** — use degrees.
3. **Forget subtract 1 for direct edge** — overcount rank.
4. **Dijkstra on unweighted jumps** — BFS only.
5. **Skip forbidden check on both move types** — hard block.

---

## 🏋️ Mini Challenge — S30 Preview

For each problem, write **one line**: traversal or static?

| Problem | Decision |
|---|---|
| Minimum Jumps #1654 | Expanded-state BFS |
| Maximal Network Rank #1615 | Static deg formula |
| Shortest Path Visiting All Nodes #847 | Bitmask state BFS (S30) |
| Ways to Arrive #1976 | Dijkstra + ways (Day 25) |

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Minimum Jumps to Reach Home #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/) | Medium | BFS with Forbidden States |
| [Maximal Network Rank #1615](https://leetcode.com/problems/maximal-network-rank/) | Medium | Adjacency Set Intersection |

---

*Day 27 complete! A-Rank tests next — prove your synthesis. →*
