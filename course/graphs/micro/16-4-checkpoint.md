<!-- hand-authored -->
# ✅ Day 16 Checkpoint

> **Graph Reduction** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 16 is **graph reduction and weighted modeling** — peel structure or build ratio edges.

| When you see... | Think... | Why |
|---|---|---|
| "minimum height tree" / "tree center" | Leaf-peel layers (deg 1) | Strip outer leaves to center |
| "a/b=k" equations + queries | Build a→b weight k, b→a 1/k | Path multiply |
| Undirected tree, optimal root | Peel not try-all-roots | O(n) vs O(n²) |
| Directed in-degree peel | **Day 12** — Kahn | Different peel direction |
| Prerequisite queries | **Day 15** — boolean closure | Not weighted |

### 🧠 Quick Recognition Test

1. *"Find roots minimizing tree height"* → **Leaf-peel to ≤2 centers**
2. *"Evaluate X/Y from division equations"* → **Weighted graph + DFS multiply**
3. *"Peel in-degree 0 nodes"* → **Day 12 Kahn**, not leaf peel
4. *"n=1 tree"* → **Return [0]** immediately

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Tree diameter — longest path between any two nodes."*

Which pattern? **Two BFS from arbitrary leaf** or related peel — not MHT but same tree structure intuition.

**Scenario 2:** *"Currency conversion with rates."*

Which pattern? **Same as Evaluate Division** — build weighted graph, query path product.

**Scenario 3:** *"Remove leaves until one node in a DAG."*

Which pattern? **Not standard** — leaf peel is for undirected trees. DAG uses Kahn.

> **Answer key:** Scenarios 1–2 = Day 16 family. Scenario 3 = wrong tool.

---

## ⚠ Common Mistakes

1. **In-degree peel on undirected MHT** — use degree.
2. **One-way edge for a/b=k** — must add reverse 1/k.
3. **Add weights on division path** — multiply ratios.
4. **Try all roots for MHT** — O(n²) when peel is O(n).
5. **Forgetting n=1** — answer is [0], not empty.

---

## 🏋️ Mini Challenge

You are ready for **C-Rank tests**. Review:

| Test | Pattern |
|---|---|
| Flower Planting #1042 | Greedy neighbor color (≤4 types) |
| Jump Game III #1306 | BFS reachability on implicit graph |
| Loud and Rich #851 | DAG DFS + memo, min quiet in richer set |

**Before each test:** Name the pattern in 30 seconds, then code.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Minimum Height Trees #310](https://leetcode.com/problems/minimum-height-trees/) | Medium | Leaf Peeling / Graph Reduction |
| [Evaluate Division #399](https://leetcode.com/problems/evaluate-division/) | Medium | Weighted Graph Construction |

---

*Day 16 complete! C-Rank tests await — prove your foundation. →*
