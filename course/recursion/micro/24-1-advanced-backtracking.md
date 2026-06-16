<!-- hand-authored -->
# 📝 Advanced Backtracking Patterns

> **Day 24** · Disguised Backtracking · ★★★★☆ · 20 XP · 15 min read

---

Day 16's Word Search **marks cells** and unmarks on retreat. Day 18's N-Queens **counts** valid board assignments with constraint sets. Today's problems wear a different costume — they look like "grid DFS" or "path optimization" — but the engine is still **choose → explore → unchoose**.

Two disguises:

1. **Path with Maximum Gold (#1219)** — collect gold, mark cell `0`, explore 4 directions, **restore gold** (C-Rank grid backtracking)
2. **Unique Paths III (#980)** — visit **every empty cell exactly once**, start at `1`, end at `2`, **count** valid walks (B-Rank board constraints + full coverage)

Your mission: recognize mark/unmark under the disguise before you code.

---

## Part 1 — Learn the Pattern

### 1. What "disguised" means

These problems rarely say "backtrack." They say:

- *"Return maximum gold collected along a path"*
- *"Count paths visiting every empty square"*

But the template is identical to Word Search (#79):

```
mark cell → recurse neighbors → unmark cell
```

The **goal function** changes (max vs count), not the skeleton.

### 2. Gold collect-and-backtrack — Path Max Gold (#1219)

Grid cells hold gold amounts. From any cell with gold, walk 4-directionally. **Cannot revisit a cell on the same path.** Return max gold collected.

```
dfs(r, c, gold):
    if out of bounds or grid[r][c] == 0: return   // no gold / already taken
    take = grid[r][c]
    gold += take
    best = max(best, gold)           // record path total (leaf = any dead end)
    grid[r][c] = 0                   // CHOOSE — mark taken
    dfs 4 neighbors with gold
    grid[r][c] = take                // UNCHOOSE — restore
```

**Link to Day 16 (Word Search):**

| Word Search | Path Max Gold |
|---|---|
| Match `word[k]` at each step | Collect `grid[r][c]` into running sum |
| Mark with `'#'` | Mark with `0` |
| Return true on full word match | Track global `best` at every step |
| Try every starting cell | Try every cell with gold > 0 |
| Existential — stop early ok | Must explore all paths from each start for max |

**Why mark with `0`?** Same reason as `'#'` — prevents revisiting a cell on the current path. Restore before returning to parent so sibling branches can use the cell.

**No memo:** Each path is unique in visit order; states aren't overlapping index memo problems. Pure backtracking with pruning (dead cell = return).

### 3. Visual — gold path on a tiny grid

```
grid:          Step by step from (0,2)=9:

0 0 9         Start dfs(0,2, gold=0)
0 8 0         take 9, best=9, mark (0,2)=0
0 0 7           try (1,2): take 0 — skip (no gold)
                try (0,1): 0
                backtrack, restore (0,2)=9
              Try other starting cells with gold...
```

Every **dead end** (no unvisited gold neighbor) is a leaf where `best` was already updated. The path can stop anywhere — no fixed destination.

### 4. Full grid coverage — Unique Paths III (#980)

Board encoding:

| Value | Meaning |
|---|---|
| `1` | Start |
| `2` | End |
| `0` | Empty to visit |
| `-1` | Obstacle (never enter) |

Count paths from start that **visit every `0` exactly once** and **end at `2`**.

```
Preprocess:
  sr, sc = start position
  er, ec = end position
  empty = count of cells with value 0, PLUS 1
         (the +1 accounts for start cell consumed on first step)

dfs(r, c, left):
    if out of bounds or cell == -1: return
    if (r,c) == (er,ec):
        if left == 0: ans++     // all empties visited, landed on end
        return
    mark cell as -1
    dfs 4 neighbors with left - 1
    restore cell to 0
```

**The `left` counter:** Tracks how many **still-unvisited empty cells** (including the walk from start). Decrement on each move onto a visitable cell. Success only at end when `left == 0`.

**Link to Day 18 (N-Queens II):**

| N-Queens II | Unique Paths III |
|---|---|
| Fill board row by row | Walk grid cell by cell |
| Constraint sets (cols, diags) | Visit-once via mark `-1` |
| Count valid complete boards | Count valid complete walks |
| Fixed structure (one queen per row) | Fixed start/end + visit all empties |

**Link to Day 16:** Same 4-direction mark/unmark. Different success test — not "match a word" but "visit count hits zero at end cell."

### 5. Side-by-side — max gold vs count full paths

| | Path Max Gold | Unique Paths III |
|---|---|---|
| **Output** | Maximum sum | Count of paths |
| **Start** | Any gold cell | Fixed cell `1` |
| **End** | Any dead end | Fixed cell `2` |
| **Visit rule** | No reuse on path | Visit every `0` once |
| **Mark** | Set gold to `0` | Set to `-1` |
| **Global state** | `best` max | `ans` count |
| **Memo?** | No | No |

Both: **4-direction DFS + restore cell after exploring.**

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **Gold: BFS without unmarking** | Can't reuse cells within a path — need path-specific visited state |
| **Gold: memo on (r,c)** | Same cell can appear in different path contexts with different remaining grids — state is the whole grid, too big to memo naively |
| **Unique Paths: reach end without counting empties** | Visiting end early with unvisited zeros still counts — need `left` |
| **Unique Paths: separate visited[][] not cleared** | Must restore on backtrack, not global permanent mark |
| **Both: 8-direction movement** | Problem specifies 4-direction only |

### 7. Pattern signals

| When the problem says… | Think… |
|---|---|
| "maximum path" / "collect" on grid + no reuse | Mark/unmark DFS, track best |
| "visit every cell exactly once" + start/end | Coverage backtrack + counter |
| Grid with obstacles `-1` | Bounds + obstacle check before mark |
| "unique paths" on small grid (≤ 20 cells) | Exponential backtrack ok — no memo |
| Word Search (Day 16) | Same mark/unmark — different win condition |

**Keywords:** `disguised backtrack` · `mark/unmark` · `collect gold` · `visit all cells` · `left counter`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Gold: forget to restore `grid[r][c]` | Always unmark after 4-direction loop |
| Gold: only DFS from (0,0) | Start from **every** cell with gold > 0 |
| Unique Paths: wrong `empty` count | Count zeros + 1 for start consumption |
| Unique Paths: increment `ans` at end without `left==0` | Must visit all empties before counting |
| Unique Paths: mark start/end as `-1` permanently in prep | Only mark during DFS; restore to 0 |
| Treating as top-down DP (Day 23) | No overlapping subproblem — pure backtrack |

### 9. Recognition drill

Read aloud:

> *"Mine gold on a grid. Each cell once per path. Maximize total collected."*

Before coding, say:

> *"Try each gold cell as start. dfs: take gold, mark 0, 4 dirs, restore. Update global best."*

Read aloud:

> *"Count paths from start to end visiting every empty square exactly once."*

Before coding, say:

> *"Precompute empty count + 1. dfs(r,c,left): at end if left==0 ans++. Mark -1, 4 dirs left-1, restore 0."*

---

## Part 2 — What's Next

Today's quests:

1. **Path with Maximum Gold #1219** — collect-and-backtrack (Day 16 DNA)
2. **Unique Paths III #980** — full coverage count (Day 18 counting + Day 16 grid)

Draw one gold path with mark/unmark arrows. Then draw a 3×3 Unique Paths board and label `left` at each step toward end.

---

*Grid backtracking in a new costume. First quest: mine every gold vein. →*
