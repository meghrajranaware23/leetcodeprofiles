<!-- hand-authored -->
# ✅ Day 21 Checkpoint

> **Minimum Spanning Tree** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 21 = **connect ALL nodes min cost (MST)** or **UF group + sort (swaps)**.

| When you see... | Think... | Why |
|---|---|---|
| "min cost connect all points/nodes" | Kruskal/Prim MST | n−1 edges, UF skip cycles |
| "Manhattan distance complete graph" | MST on implicit edges | Heap or sort O(n²) edges |
| "smallest string with swaps" | UF components + char sort | Not MST weights |
| "shortest path A to B" | **Dijkstra** | Single pair, not span all |
| "redundant edge" | **Day 17** cycle | Detect, not build MST |

### 🧠 Quick Recognition Test

1. *"Minimum wire cost connecting all cities"* → **MST** — Kruskal sorted edges + UF
2. *"Reorder indices via swap pairs for lex-min string"* → **UF + sort chars** per component
3. *"Fastest route from home to office"* → **Dijkstra** — not MST
4. *"Count unreachable node pairs"* → **Day 22** size formula — preview

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Connect n workstations with minimum total cable length (any pair can connect)."*

Which pattern? **MST** — same as Connect All Points with different distance metric.

**Scenario 2:** *"Given swap pairs on a string, produce lexicographically smallest result."*

Which pattern? **UF on indices** — sort characters within each root bucket.

**Scenario 3:** *"Minimum time for signal from one router to all others."*

Which pattern? **Day 19 Dijkstra** — spanning **path** from source, not MST.

> **Answer key:** MST wires everyone cheaply; UF+sort permutes within swap components.

---

## ⚠ Common Mistakes

1. **Dijkstra instead of MST for "connect all"** — wrong problem family.
2. **Adding MST edge without UF check** — creates cycle.
3. **Sorting chars ascending then taking front** — use descending bucket + pop for left-to-right.
4. **Confusing Connect Points with shortest path** — total spanning cost, not pair distance.
5. **Forgetting n−1 MST edges** — stop when tree has n−1 edges.

---

## 🏋️ Mini Challenge

### [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/)

After UF unions, why sort each bucket **descending**?

**Before you code:** Say "MST = wire all; swaps = group + greedy char placement."

> 💡 **Hint:** Related to B-test Equivalent String — UF with custom merge rule.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Min Cost to Connect All Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Medium | Kruskal's MST |
| [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) | Medium | UF for Connected Components |

---

*Day 21 complete! Tomorrow: combine UF math + state BFS. →*
