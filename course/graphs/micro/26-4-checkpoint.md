<!-- hand-authored -->
# ✅ Day 26 Checkpoint

> **DFS + Memoization** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 26 = **memo on DAG structure** OR **BFS then per-node bottleneck**.

| When you see... | Think... | Why |
|---|---|---|
| "Strictly increasing" path in matrix | DFS + memo | Implicit DAG |
| "Longest path" + increasing constraint | Memo from each cell | Not BFS |
| "Network idle" / "patience" on tree | BFS dist + max formula | Not simulation |
| "Shortest path in matrix" | **Day 8 BFS** | Opposite objective |
| Explicit prerequisites | **Day 14 topo** | Different DAG source |

### 🧠 Quick Recognition Test

1. *"Longest increasing path in grid"* → **dfs+memo, neighbor value strictly greater**
2. *"When tree network goes idle"* → **BFS from 0, lastSend+roundTrip max**
3. *"Can I use visited[] on LIP matrix?"* → **Memo suffices — DAG**
4. *"roundTrip = ?"* → **`2 * dist[i]`**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Longest decreasing path in matrix."*

Which pattern? **Same DFS+memo** — edges to strictly smaller neighbors. Still a DAG.

**Scenario 2:** *"Time to inform all employees in tree with inform times."*

Which pattern? **Day 15** — DFS max depth + inform[i], not patience formula.

**Scenario 3:** *"Swim in rising water"* — threshold BFS.

Which pattern? **Day 28** — not Day 26.

> **Answer key:** Scenario 1 = Day 26 memo. Scenario 2 = Day 15. Scenario 3 = Day 28.

---

## ⚠ Common Mistakes

1. **BFS for longest increasing path** — wrong optimization direction.
2. **Allow equal-value moves** — creates cycles.
3. **Visited set blocking memo** — use dp[][] only.
4. **Forget `return ans+1` on idle problem** — off-by-one.
5. **Dijkstra on unit-weight tree** — BFS is correct and simpler.

---

## 🏋️ Mini Challenge

Write the two formulas from memory:

- LIP combine: `dp[r][c] = 1 + max(...)` when neighbor **___** current.
- Idle node finish: `lastSend + ___` where `lastSend = ((rt-1)/p)*p`.

Answers: **greater than**; **roundTrip** (2×dist).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Increasing Path in a Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | Hard | DFS + Memo on DAG |
| [The Time When the Network Becomes Idle #2039](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/) | Medium | Tree BFS + Bottleneck |

---

*Day 26 complete! Tomorrow: pattern decision — forbidden states and rank math. →*
