<!-- hand-authored -->
# 📝 Boundary DFS / Outside-In Thinking

> **Day 7** · Boundary Traversal · 10 XP · 15 min read

---

Day 4 counted islands from the **inside out** (find a 1, flood it). Day 7 flips the camera: start from the **border** and ask *what can escape to the edge?* Flood from all boundary cells inward; whatever land **never** gets visited is trapped — an **enclave**.

> **Preview contrast (Day 4 vs Day 7):** Day 4 = DFS from each unvisited land component. Day 7 = one border flood marks "outside-connected" land; **enclave count = remaining 1s** — NOT generic BFS from water/0.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Boundary DFS / outside-in flood** — seed traversal from every **edge cell** of the grid; mark everything reachable; answer comes from what's **left unmarked**.

- **Border seed** — all cells on row 0, row m-1, col 0, col n-1
- **Condition** — Pacific Atlantic: move to neighbor with **height ≥ current** (water flows uphill in reverse)
- **Enclaves** — land connected to border gets erased; **sum remaining 1s** = enclave area
- **Two oceans** — run two border floods (Pacific edges, Atlantic edges); intersection = both reachable

### 2. Simple explanation

Picture a fortress on a map. Instead of asking "how big is each castle?" you ask "which rooms have a door to the outside wall?" Walk from every **outer wall tile** inward through connected rooms. Any room you never enter is a sealed inner chamber — an enclave. You don't start from empty cells (0) or from random land; you start from the **frame** of the grid.

### 3. Visual — border flood marks outside-connected land

```
grid:              After border DFS (mark 0):
1 1 1 0 0          0 0 0 0 0
1 1 1 0 0    →     0 0 0 0 0
1 1 1 0 0          0 0 0 0 0
1 1 1 1 1          0 0 0 1 1   ← bottom-right 1s NOT reached from border
0 0 0 1 1          0 0 0 1 1

Border land at (0,0) floods all top-left 1s.
Isolated block at (3,3)-(4,4) never touched → enclave count = 4
```

### 4. Visual — Pacific Atlantic (reverse flow from oceans)

```
Heights — oceans touch borders:

  Pac ←  1 2 2 3 5
         3 2 3 4 4
  Atl →  2 4 5 3 1

DFS from Pacific border cells (top row + left col) moving to ≥ height
DFS from Atlantic border (bottom row + right col) same rule
Cell in BOTH reach sets → water can drain to both oceans ✓
```

Don't simulate water downhill from each cell — **flood uphill from the ocean inward**.

### 5. The universal template

```
function borderFlood(grid):
    for each cell on the border:
        if cell qualifies (land / valid height):
            dfs(r, c)

    function dfs(r, c):
        mark visited (grid[r][c] = 0 or reach[r][c] = true)
        for each neighbor:
            if unvisited and passes condition:
                dfs(nr, nc)

    // Enclaves: return count of remaining 1s
    // Pacific Atlantic: return cells in both reach sets
```

### 6. Why inside-out island DFS fails for enclaves

| Count islands (Day 4) | Problem for enclaves |
|---|---|
| DFS from each unvisited 1 | Counts components, not border-trapped ones |
| BFS from all 0 cells | Wrong seed — 0 isn't the question |
| Check if component touches border during inner DFS | Works but border-first is cleaner and reusable |

| Brute force: for each land cell, BFS to border | O(cells²) — border flood is O(cells) once |

**The insight:** "Not connected to boundary" = **erase everything that IS connected**, count the rest.

### 7. Day 4 vs Day 7 — the contrast

| | **Day 4 — Inside-Out** | **Day 7 — Outside-In** |
|---|---|---|
| Start | First unvisited land cell | **All border** qualifying cells |
| Question | How many components? | What **can't** reach the edge? |
| Marking | Each component once | Border-connected region erased |
| Enclaves | Wrong tool | **Remaining land count** |
| Example | Number of Islands | Enclaves, Closed Islands (test) |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "enclave" / "not connected to border" | Border flood → count remaining land |
| "closed island" / "surrounded by water" | Border flood on 1s (D-Rank test) |
| "flow to Pacific and Atlantic" | Two border floods, intersect |
| "can reach the boundary" | Outside-in, not center-out |
| "surrounded region" (letter O) | Similar border trick — E-Rank cousin |

**Keywords:** `border` · `edge cells` · `outside-in` · `remaining 1s` · `reverse flow` · `reach set`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BFS from every 0 cell | Seed **border land**, not water |
| Simulate water flowing down from each cell | Flood **uphill from ocean** (Pacific Atlantic) |
| Count components instead of remaining cells | Enclaves = **sum of unvisited 1s** |
| Forget corner cells on border loop | Four edges: top, bottom, left, right |
| One ocean flood only | Pacific Atlantic needs **two** reach grids/sets |

### 10. Recognition drill

Read this problem aloud:

> *"Return the number of land cells that cannot reach the grid border."*

Before coding, say:

> *"Border DFS: flood from all edge 1s, mark 0; return sum of remaining 1s. Not island count — not BFS from water."*

---

*Start at the walls. First quest: which cells drain to both oceans? →*
