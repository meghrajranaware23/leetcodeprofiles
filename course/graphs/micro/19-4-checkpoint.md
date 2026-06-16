<!-- hand-authored -->
# ✅ Day 19 Checkpoint

> **Dijkstra's Algorithm** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 19 = **min-heap `(dist, node)` + relax + stale skip** — B-Rank highest-priority pattern.

| When you see... | Think... | Why |
|---|---|---|
| "network delay" / weighted shortest from source | Dijkstra min-heap | Non-negative edge weights |
| "maximum probability" / multiply edge weights | Modified Dijkstra max-heap | Max product, same skeleton |
| "minimum steps" unweighted | **BFS** — Day 8 | No heap needed |
| "at most K stops" | **Day 20** Bellman-Ford layers | Stop limit breaks plain Dijkstra |
| "minimum effort max height diff" | **Day 20** grid Dijkstra | Bottleneck relax |

### 🧠 Quick Recognition Test

1. *"Signal time to reach all nodes from source k"* → **Dijkstra** — answer = max dist
2. *"Max probability path start→end"* → **Modified Dijkstra** — × and max-heap
3. *"Shortest path in 0/1 matrix"* → **BFS** — unweighted
4. *"Cheapest flight with ≤K layovers"* → **Day 20** — not plain Dijkstra

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given road network with travel times, minimum time from A to all cities."*

Which pattern? **Dijkstra** — identical to Network Delay Time.

**Scenario 2:** *"Maximize reliability (product of link success rates) from server A to B."*

Which pattern? **Modified Dijkstra** — prob[start]=1, max-heap, multiply relax.

**Scenario 3:** *"Minimum number of flights with at most 2 transfers."*

Which pattern? **Day 20 K-stop BF** — layered relax, not Day 19 heap.

> **Answer key:** Weight + no extra constraint = Day 19. K stops or max-edge grid = Day 20.

---

## ⚠ Common Mistakes

1. **FIFO queue on weighted graph** — must use min-heap by dist.
2. **Skipping stale skip** — `if d > dist[u]: continue` is required.
3. **prob init 0 for max probability** — start at 1.0 at source.
4. **Using Dijkstra with negative weights** — broken; use Bellman-Ford.
5. **Returning dist[target] when all nodes must be reached** — Network Delay needs **max** dist.

---

## 🏋️ Mini Challenge

### [Path with Maximum Probability #1514](https://leetcode.com/problems/path-with-maximum-probability/)

Re-implement from memory after #743. What three things change?

**Before you code:** Say "max not min, multiply not add, max-heap not min-heap."

> 💡 **Hint:** Same stale skip and adjacency build — only compare and combine differ.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | Medium | Dijkstra's Algorithm |
| [Path with Maximum Probability #1514](https://leetcode.com/problems/path-with-maximum-probability/) | Medium | Modified Dijkstra |

---

*Day 19 complete! Tomorrow: shortest path with extra constraints. →*
