<!-- hand-authored -->
# 📝 BFS Shortest Path

> **Day 8** · Shortest Path (Unweighted) · ★★★☆☆ · 10 XP · 15 min read

---

Day 6 filled a **dist matrix** from many sources. Day 8 asks for **one shortest path length** — start to goal, minimum steps, each edge costs 1. The queue carries **`(r, c, steps)`** (or process level-by-level) so the first time you hit the target, you have the answer.

> **Preview contrast (Day 6 vs Day 8):** Day 6 = all sources, full grid distances. Day 8 = **one** (or phased) start, **one** numeric answer — often `(r,c,steps)` in the queue.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BFS shortest path (unweighted)** — expand wavefront; track steps explicitly; **first arrival at goal = minimum steps**.

- **State in queue** — `(row, col, steps)` or `(node, dist)` — steps baked into each entry
- **Level BFS variant** — `steps++` after processing entire queue layer (no tuple needed)
- **Visited on enqueue** — mark when adding to queue, not when popping
- **8-direction grids** — binary matrix path allows diagonals; still unweighted BFS

### 2. Simple explanation

You're in a maze counting footsteps. Every move costs exactly 1. BFS explores all positions reachable in 0 steps, then 1 step, then 2 — so the **first** time the exit appears in your search, you've used the fewest footsteps possible. Carrying `steps` in the queue (or counting layers) is how you know that number without a separate dist matrix for every cell.

### 3. Visual — `(r, c, steps)` BFS

```
Grid (0=open, 1=wall):     BFS from (0,0) to bottom-right:

0 0 0                      Queue layers:
0 1 0                      (0,0,0) → neighbors at steps=1
0 0 0                      ...
                           First time (2,2) dequeued with steps=4 → answer 4

Each entry: (r, c, steps)
On expand: if neighbor open and unvisited → push (nr, nc, steps+1)
Goal check: when (r,c) == target → return steps
```

### 4. Visual — level-by-level (same math, no tuple)

```
q = [(0,0)], steps = 1
while q:
    for _ in range(len(q)):   # freeze layer
        pop, expand
        if hit goal: return steps
    steps += 1
```

Both styles appear in today's quests — pick one and stay consistent.

### 5. Two-phase pattern preview (Shortest Bridge)

Some problems aren't pure point-to-point:

```
Phase 1 — DFS: find/mark entire island A (connected 1s)
Phase 2 — BFS: expand from all marked cells into 0s until you touch island B (1)

Phase 2 is multi-source BFS from the island boundary — but answer is still
"minimum steps to connect" = one number, like Day 8.
```

Day 8 pure shortest path = one start, one goal. Shortest Bridge = **find component + expand** — two phases, one BFS answer.

### 6. Why DFS or dist-matrix-for-all fails

| DFS to target | Problem |
|---|---|
| First path found may not be shortest | Need BFS layers |
| Backtracking all paths | Exponential |

| Day 6 multi-source dist matrix when only goal matters | Problem |
|---|---|
| Fills entire grid unnecessarily | Still works but `(r,c,steps)` to goal is simpler |
| Overkill for "steps from A to B" | Single-source BFS suffices |

| Dijkstra on unit weights | Problem |
|---|---|
| Correct but heavier | BFS queue is enough |

### 7. Day 6 vs Day 8 — the contrast

| | **Day 6 — Multi-Source Dist Matrix** | **Day 8 — Shortest Path Steps** |
|---|---|---|
| Queue init | All sources | One start (or phase-2 boundary) |
| Output | Full `dist[][]` | Single integer (or -1) |
| Steps tracking | `dist[r][c]+1` in matrix | `(r,c,steps)` or layer counter |
| Stop when | Queue empty | **Goal first reached** |
| Example | 01 Matrix | Binary Matrix Path, Nearest Exit (test) |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "shortest path" / "minimum steps" | BFS with step count |
| "in a binary matrix" + one start/end | `(r,c,steps)` or layer BFS |
| "shortest bridge between two islands" | DFS mark island + BFS expand |
| "nearest exit" from entrance | BFS; goal = border cell (not entrance) |
| "distance to nearest 0 for all cells" | **Day 6**, not Day 8 |

**Keywords:** `(r,c,steps)` · `steps++` · `first visit to goal` · `8-directional` · `two-phase`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| DFS for shortest path | BFS guarantees minimum steps |
| Mark visited on pop instead of push | Prevents duplicate queue entries |
| Off-by-one on steps (start counts as 0 vs 1) | Match problem: path **length** vs **moves** |
| Forget 8 neighbors in binary matrix | Include diagonals when problem allows |
| Skip phase 1 in Shortest Bridge | Must mark whole island before BFS expand |

### 10. Recognition drill

Read this problem aloud:

> *"Return the length of the shortest clear path from top-left to bottom-right in a binary matrix."*

Before coding, say:

> *"BFS (r,c,steps) or layer BFS from (0,0); 8 dirs; return steps when first hit (n-1,n-1). Not Day 6 dist matrix — one goal."*

---

*Count steps in the queue. First quest: 8-direction shortest path. →*
