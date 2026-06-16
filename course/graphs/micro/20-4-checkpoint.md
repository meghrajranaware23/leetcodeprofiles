<!-- hand-authored -->
# ✅ Day 20 Checkpoint

> **Shortest Path Variants** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 20 = **Day 19 Dijkstra with a twist** OR **K-stop layered relax** — know which.

| When you see... | Think... | Why |
|---|---|---|
| "minimum effort" / min max height diff on grid | Grid Dijkstra | Heap (effort,r,c); max relax |
| "at most K stops" / K layovers | Bellman-Ford k+1 layers | tmp=dist each round |
| "network delay" no stop cap | **Day 19** Dijkstra | Single dist[node] OK |
| "minimum steps" on grid | **BFS** | Unweighted |
| "connect all points min cost" | **Day 21 MST** | Not shortest path |

### 🧠 Quick Recognition Test

1. *"Path minimizing maximum absolute height jump"* → **Grid Dijkstra** — max edge relax
2. *"Cheapest ticket price with at most k layovers"* → **Layered BF** — not Day 19 heap
3. *"Weighted shortest path, no constraints"* → **Day 19** — (dist, node) heap
4. *"01 matrix nearest zero"* → **Day 6 multi-source BFS** — not Dijkstra

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Hiker wants path where the steepest single step is as small as possible."*

Which pattern? **Min Effort grid Dijkstra** — bottleneck path.

**Scenario 2:** *"Fly from NYC to LA using at most 1 stop, minimize fare."*

Which pattern? **Cheapest Flights** — k+1 relax rounds with tmp copy.

**Scenario 3:** *"Fastest route by total driving time, no stop limit."*

Which pattern? **Day 19 Dijkstra** — contrast with stop-limited flights.

> **Answer key:** Custom edge combine (max) or stop limit (layers) → Day 20, not plain Day 19.

---

## ⚠ Common Mistakes

1. **BFS for Min Effort** — need heap; edge costs differ.
2. **Sum height diffs instead of max** — wrong objective for #1631.
3. **Plain Dijkstra on K flights** — wrong answers on LeetCode.
4. **Forgetting tmp=dist.copy()** — allows multi-hop in one layer.
5. **Loop k times instead of k+1** — k stops = at most k+1 edges.

---

## 🏋️ Mini Challenge

### [Cheapest Flights Within K Stops #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

Explain in one sentence why Day 19 Dijkstra fails here.

**Before you code:** Say "layered relax, tmp copy, k+1 rounds."

> 💡 **Hint:** Contrast directly with Network Delay — no stop budget there.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Path With Minimum Effort #1631](https://leetcode.com/problems/path-with-minimum-effort/) | Medium | Dijkstra on Grid |
| [Cheapest Flights Within K Stops #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Medium | Bellman-Ford / Modified Dijkstra |

---

*Day 20 complete! Tomorrow: minimum spanning trees. →*
