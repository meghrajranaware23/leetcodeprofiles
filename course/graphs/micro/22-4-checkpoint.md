<!-- hand-authored -->
# ✅ Day 22 Checkpoint

> **Combined Graph Techniques** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 22 = **UF arithmetic** + **state BFS (Day 10 bridge)** — pick the right combo.

| When you see... | Think... | Why |
|---|---|---|
| "unreachable pairs of nodes" | UF + c×(n−c)/2 | Component size formula |
| "alternating colors" shortest path | BFS (node, lastColor) | State beyond node id |
| "Open Lock minimum turns" | **Day 10** string state BFS | Same state idea |
| "merge accounts" | **Day 18** UF model | Not size formula |
| "network delay" | **Day 19** Dijkstra | Weighted |

### 🧠 Quick Recognition Test

1. *"Count pairs of nodes in different connected components"* → **Component size math**
2. *"Shortest path alternating red/blue edges"* → **State BFS** dist[node][2]
3. *"Can you finish all courses?"* → **Day 11 topo** — not Day 22
4. *"Minimum cost connect all points"* → **Day 21 MST**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"In a social network, how many friend pairs cannot reach each other?"*

Which pattern? **UF sizes + formula** — same as Unreachable Pairs.

**Scenario 2:** *"Shortest walk where edge types must strictly alternate."*

Which pattern? **BFS (node, lastType)** — Day 10 state pattern on graph.

**Scenario 3:** *"Minimum score of any path between city 1 and city n in one component."*

Which pattern? **UF + min edge in component** — B-test #2492 preview.

> **Answer key:** Counting across components → UF math. Path + side constraint → state BFS.

---

## ⚠ Common Mistakes

1. **O(n²) pair enumeration** — use size formula after UF.
2. **Forgetting divide by 2** — double-counts unordered pairs.
3. **visited[node] only for alternating paths** — need dist[node][0] and dist[node][1].
4. **Allowing same-color consecutive edges** — skip when edgeColor == prevColor.
5. **Using Dijkstra for unweighted alternating path** — BFS suffices.

---

## 🏋️ Mini Challenge

### [Shortest Path with Alternating Colors #1129](https://leetcode.com/problems/shortest-path-with-alternating-colors/)

Name the BFS state tuple and the Day 10 problem it mirrors.

**Before you code:** Say "(node, lastColor) — like Open Lock's string state."

> 💡 **Hint:** B-Rank test problems next — UF, greedy degree, and lex UF merge.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Count Unreachable Pairs of Nodes in an Undirected Graph #2316](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/) | Medium | Component Size Math |
| [Shortest Path with Alternating Colors #1129](https://leetcode.com/problems/shortest-path-with-alternating-colors/) | Medium | BFS with State (node, color) |

---

*Day 22 complete! B-Rank training done — take the rank test. →*
