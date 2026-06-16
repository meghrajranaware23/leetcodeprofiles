<!-- hand-authored -->
# ✅ Day 11 Checkpoint

> **Cycle Detection & Topological Sort** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 11 is **directed** dependency graphs — cycles block ordering.

| When you see... | Think... | Why |
|---|---|---|
| "prerequisites" / "must take B before A" | Directed graph, edge B→A | Dependency direction matters |
| "can you finish all courses" | Cycle detection (Kahn or 3-color DFS) | Cycle = impossible |
| "return valid ordering" | Topological sort | Record Kahn peel |
| "grid" / "islands" | **Not Day 11** — undirected components | Wrong day |
| "two groups" / "bipartite" | **Not Day 11** — Day 13 | Undirected 2-color |

### 🧠 Quick Recognition Test

1. *"Can you finish all courses given prerequisites?"* → **Cycle detection** — peel in-degree 0
2. *"Return course order or empty if impossible"* → **Topological sort** — same peel, record order
3. *"Count islands in a grid"* → **Not Day 11** — undirected flood fill
4. *"DFS hits a GRAY node"* → **Directed cycle** — back-edge on active path

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Build order of tasks with dependencies; some tasks may be parallel."*

Which pattern? **Kahn's peel.** Optional: track layer size per queue generation for parallel batches.

**Scenario 2:** *"Detect if a linked list has a cycle."*

Which pattern? **Not graph Kahn** — Floyd's tortoise/hare. Different "cycle" — no in-degree table.

**Scenario 3:** *"Alien dictionary — deduce character order from sorted words."*

Which pattern? **Build char graph + Kahn.** Compare adjacent words for first differing letter → edge. Cycle → "".

> **Answer key:** Scenarios 1 & 3 = directed topo. Scenario 2 = different technique entirely.

---

## ⚠ Common Mistakes

1. **Reversing prereq edge** — `[a,b]` means b→a, not a→b.
2. **Using 2-color for directed cycle** — bipartite is Day 13.
3. **DFS visited-only** — need gray/black to catch directed back-edges.
4. **Returning partial order on cycle** — must return empty / false when peel stalls.
5. **Confusing with Day 12 reverse peel** — forward = sources; reverse = sinks (safe states).

---

## 🏋️ Mini Challenge

### [Parallel Courses #1136](https://leetcode.com/problems/parallel-courses/)

**[→ Try Parallel Courses on LeetCode](https://leetcode.com/problems/parallel-courses/)**

Kahn's peel, but count **semesters** = number of queue layers processed.

**Before you code:** Draw a 4-node prereq DAG. How many peel rounds until empty?

> 💡 **Hint:** `while q: sz=len(q); process sz nodes; semesters++`

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Course Schedule #207](https://leetcode.com/problems/course-schedule/) | Medium | Cycle Detection |
| [Course Schedule II #210](https://leetcode.com/problems/course-schedule-ii/) | Medium | Topological Sort |

---

*Day 11 complete! Tomorrow: Kahn's algorithm deep dive — forward peel and reverse peel. →*
