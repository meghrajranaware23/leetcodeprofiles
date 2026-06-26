<!-- hand-authored -->
# 📝 Grid Backtracking

> **Day 16** · Grid Backtracking · 20 XP · 15 min read

---

Every backtracking pattern so far walked an **array or string index**. Today the state lives on a **2D grid**: you move cell by cell, mark visited spots, and unmark on retreat.

The rhythm is unchanged — **choose, explore, unchoose** — but "unchoose" means **restore the cell** you temporarily destroyed.

---

## Part 1 — Learn the Pattern

### 1. Grid DFS backtracking template

```
dfs(board, r, c, step):
    if step == target_length: return true     // found path
    if out of bounds or cell used or mismatch: return false

    mark cell as visited (e.g. board[r][c] = '#')
    found = dfs(neighbors...)                  // EXPLORE 4 directions
    unmark cell (restore original char)        // UNCHOOSE
    return found
```

**Mark/unmark** replaces `path.push/pop` when the path is implicit in `(r,c,step)`.

For problems that build a string path (Letter Case Permutation), push/pop still applies on the index.

### 2. Word Search (#79)

Find if `word` exists as a path of adjacent cells (4-direction, no reuse per path).

```
board = A B C E
        S F C S
        A D E E

word = "ABCCED" → true (path exists)
word = "SEE"    → true
word = "ABCB"   → false (would reuse B)
```

**State:** current cell `(i,j)` + index `k` into `word`.

**Mark:** save `board[i][j]`, set to `'#'`.
**Unmark:** restore saved char before returning to parent.

Why mark? Without it, the same cell appears twice in one path — `"ABCB"` would incorrectly return true.

### 3. Letter Case Permutation (#784)

Not a grid — but completes Day 16 as **binary choice backtracking** on a string:

```
s = "a1b2"

At each letter: branch lowercase OR uppercase
At each digit: only one choice

"a1b2" → "a1B2", "A1b2", "A1B2", "a1b2"
2 letters → 2² = 4 permutations
```

```cpp
if (isalpha(s[i])) {
    path.push_back(tolower(s[i])); dfs(i+1);   // branch 1
    path.back() = toupper(s[i]);   dfs(i+1);   // branch 2 (reuse slot)
    path.pop_back();
} else {
    path.push_back(s[i]); dfs(i+1); path.pop_back();
}
```

Same push/pop as Day 11 — two branches per letter instead of a loop over candidates.

### 4. Mark/unmark vs used[][]

| Approach | When |
|---|---|
| **In-place mark** (`'#'`) | Mutable board, save space — Word Search |
| **Separate visited[][]** | Board must stay unchanged |
| **path push/pop on index** | Building a string — Letter Case |

All three follow choose → explore → unchoose.

### 5. Word Search walkthrough

```
board[0][0]='A', word="ABCCED", k=0

dfs(0,0,k=0): match 'A', mark → '#'
  dfs(0,1,k=1): 'B' ✓ mark
    dfs(0,2,k=2): 'C' ✓
      dfs(1,2,k=3): 'C' ✓
        dfs(2,2,k=4): 'E' ✓
          dfs(2,1,k=5): 'D' ✓
            k==6 → return true
          unmark each level on way back
```

Try every cell as start — outer double loop calls `dfs(i,j,0)`.

### 6. Pattern signals

| When the problem says… | Think… |
|---|---|
| "word search" / "path in grid" | Grid DFS + mark/unmark |
| "4-directionally adjacent" | Explore up/down/left/right |
| "cannot use same cell twice" | Must mark visited |
| "letter case permutation" | Binary branch per alpha char |
| "islands" / "count connected" | DFS without unmark (Day 24+) |

### 7. Common beginner mistakes

| Mistake | Fix |
|---|---|
| No unmark after dfs | `'#'` leaks — other paths blocked |
| Only 2 directions | Use all 4 neighbors |
| Forget outer start loop (Word Search) | Word can start anywhere |
| Mark but never save original char | Can't restore — board corrupted |

### 8. Recognition drill

> *"Search a word in a 2D board of characters."*

Say: *"Grid DFS from each cell. Match word[k]. Mark with '#', explore 4 dirs, unmark. Base: k==len(word)."*

> *"All strings from changing letter cases."*

Say: *"Index backtracking. Alpha → lower/upper branch. Digit → single branch. push/pop."*

---

## Part 2 — What's Next

1. **Word Search #79** — grid mark/unmark
2. **Letter Case Permutation #784** — binary string branching

C-Rank ends where exploration meets spatial state. Same push/pop discipline — new surface to mark.

---

*The board is a decision tree laid flat. First quest →*
