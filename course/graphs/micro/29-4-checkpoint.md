<!-- hand-authored -->
# ✅ Day 29 Checkpoint

> **Advanced Graph Algorithms** · 2 quests completed · ⭐ 160 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 29 is **edge-centric DFS** — Hierholzer consumes edges; Tarjan classifies them.

| When you see... | Think... | Why |
|---|---|---|
| "use all tickets/edges exactly once" | Hierholzer edge stack | Post-order when out of edges |
| "lex smallest itinerary" | Hierholzer + sorted adj | Pick smallest unused neighbor |
| "critical connection" / "bridge" | Tarjan low-link | `low[v] > disc[u]` on tree edge |
| "if edge removed, disconnected" | Tarjan bridges | One DFS, O(V+E) |
| "shortest path" / "minimum hops" | **Not Day 29** | BFS / Dijkstra |

### 🧠 Quick Recognition Test

1. *"Reconstruct flight path using every ticket once from JFK"* → **Hierholzer — erase edges, reverse stack**
2. *"Find network links whose failure splits the network"* → **Tarjan bridges — disc/low**
3. *"Can two nodes reach each other?"* → **Day 17 UF or Day 3 DFS** — not bridge hunt
4. *"Course schedule ordering"* → **Day 12 Kahn** — not Euler trail

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Valid arrangement of pairs (a,b) using each pair once in a chain."*

Which pattern? **Hierholzer** on directed graph of pairs — same as #332 with integer nodes.

**Scenario 2:** *"Which roads are the only connection between two regions?"*

Which pattern? **Tarjan bridges** — critical edges in road network.

**Scenario 3:** *"Find shortest path using all edges at least once."*

Which pattern? **Not standard Euler** — different problem (Chinese Postman territory). Day 29 = each edge **exactly once**.

> **Answer key:** Scenarios 1–2 = Day 29. Scenario 3 = beyond this lesson.

---

## ⚠ Common Mistakes

1. **BFS for itinerary (#332)** — must consume every edge; Hierholzer only.
2. **Not erasing used edges** — infinite recursion / invalid trail.
3. **Tarjan: forget parent check** — `(u,parent)` is tree edge, not back edge.
4. **Tarjan: `low[u] = min(low[u], low[v])` on back edge** — use `disc[v]` for back edges.
5. **Reverse route before returning (Hierholzer)** — stack is built post-order.

---

## 🏋️ Mini Challenge

Trace on paper (no BFS):

| Problem | Trace target |
|---|---|
| Itinerary #332 | Edge erasure order + final reversed route |
| Critical #1192 | disc/low values; mark each bridge |

**Say "Hierholzer" or "Tarjan" before coding.**

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Reconstruct Itinerary #332](https://leetcode.com/problems/reconstruct-itinerary/) | Hard | Hierholzer's Algorithm |
| [Critical Connections in a Network #1192](https://leetcode.com/problems/critical-connections-in-a-network/) | Hard | Tarjan's Bridges |

---

*Day 29 complete! Tomorrow: Graph Legend capstone — the full decision flowchart. →*
