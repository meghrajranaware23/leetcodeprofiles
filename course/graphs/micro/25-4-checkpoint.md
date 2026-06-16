<!-- hand-authored -->
# ✅ Day 25 Checkpoint

> **Advanced Shortest Paths** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 25 extends Day 19 Dijkstra — **same PQ relax loop**, different output aggregation.

| When you see... | Think... | Why |
|---|---|---|
| "Number of ways" + "minimum time" | Dijkstra + `ways[]` | Add on `nd == dist[v]` |
| "Within threshold" from **each** city | All-pairs (Floyd) | Row count in dist matrix |
| "Network delay" / max time from source | **Day 19** | dist only, no ways |
| "Max probability path" | **Day 19** | max product Dijkstra |
| Unweighted minimum steps | **BFS** | Not Dijkstra |

### 🧠 Quick Recognition Test

1. *"Count shortest paths from 0 to n-1 on weighted roads"* → **Dijkstra + ways, mod 1e9+7**
2. *"City with fewest neighbors within distance T"* → **Floyd, count dist[i][j]≤T, tie max i**
3. *"Time for signal to reach all nodes"* → **Day 19 Dijkstra max dist**
4. *"Relax u→v, nd equals dist[v]"* → **`ways[v] += ways[u]`** — Day 25 signature

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count shortest paths in DAG with edge weights (already topo sorted)."*

Which pattern? **DP on DAG** — or Dijkstra+ways if graph general. Same equal-dist accumulation idea.

**Scenario 2:** *"How many pairs of cities have distance ≤ K?"*

Which pattern? **All-pairs Floyd** then double loop count — same matrix as #1334.

**Scenario 3:** *"Cheapest flight with at most k stops."*

Which pattern? **Day 20 Bellman-Ford / k-layer** — not Day 25.

> **Answer key:** Scenarios 1–2 = Day 25 matrix/count extensions. Scenario 3 = Day 20.

---

## ⚠ Common Mistakes

1. **Plain Dijkstra without ways** on #1976 — missing the `else if nd == dist[v]` branch.
2. **Single-source on #1334** — need every row of dist matrix.
3. **Wrong tie-break** — largest city index, not smallest.
4. **BFS on weighted roads** — breaks optimality.
5. **Adding ways when nd > dist[v]** — only reset or accumulate on equal.

---

## 🏋️ Mini Challenge

Fill in the relax logic:

```
if (nd < dist[v])  → dist[v]=___ ; ways[v]=___
else if (nd == dist[v]) → ways[v]=___
```

Answer: `nd`; `ways[u]`; `(ways[v]+ways[u])%MOD`

Then: for n=4 Floyd, what does row 2 count if threshold=5?

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Number of Ways to Arrive at Destination #1976](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/) | Medium | Dijkstra + DP Count |
| [Find the City With the Smallest Number of Neighbors at a Threshold Distance #1334](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) | Medium | All-Pairs Threshold Count |

---

*Day 25 complete! Tomorrow: DAG memo and tree bottleneck BFS. →*
