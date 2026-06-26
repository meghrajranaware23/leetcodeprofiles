<!-- hand-authored -->
# 📝 The Final Ascension

> **Day 30** · The Final Ascension · 25 XP · 18 min read

---

Thirty days. One skill: **see the recursive skeleton before you write code.**

Today's concept is the **Pattern Decision Tree** — the capstone flowchart that routes any new problem to the right template from Days 1–29. Today's quests are the two hardest **multi-pattern** problems in the pack: Trie + grid (Day 16 + trie) and full board generation (Day 18 N-Queens II → generate all boards).

This is not new theory. It is **Legend-tier synthesis**.

---

## Part 1 — The Capstone Pattern Decision Tree

### 1. The master flowchart

When a new problem lands in an interview, run this tree **before** coding:

```
                    NEW PROBLEM
                         │
         ┌───────────────┴───────────────┐
         │ Can I define a SMALLER version │
         │ of the SAME problem?           │
         └───────────────┬───────────────┘
                    NO   │   YES
                         ↓
              ┌──────────────────────┐
              │ Need ALL valid       │
              │ choices / configs?   │
              └──────────┬───────────┘
                    YES  │  NO
                         ↓
              ┌──────────────────────┐
              │ BACKTRACKING         │
              │ choose→explore→undo  │
              └──────────┬───────────┘
                         │
         ┌───────────────┼───────────────┐
         ↓               ↓               ↓
    ┌─────────┐    ┌───────────┐   ┌────────────┐
    │ String  │    │ Grid/Board│   │ Assign/    │
    │ partition│   │ mark/unmark│  │ partition  │
    │ Day 14  │    │ Day 16/18 │   │ Day 17/19  │
    └─────────┘    └───────────┘   └────────────┘
                         │
              ┌──────────┴──────────┐
              │ Info flows UP from  │
              │ sub-results?        │
              └──────────┬──────────┘
                    YES  │  NO
                         ↓
              ┌──────────────────────┐
              │ RETURN recursion     │
              │ trust + combine      │
              │ Days 4, 7, 9         │
              └──────────┬───────────┘
                         │
              ┌──────────┴──────────┐
              │ Same (i,j) or state  │
              │ reached again?       │
              └──────────┬───────────┘
                    YES  │  NO
                         ↓
              ┌──────────────────────┐
              │ MEMOIZE              │
              │ Days 23, 29          │
              └──────────────────────┘
```

### 2. Route to the right day

| Problem shape | Reach for | Example days |
|---|---|---|
| Shrink by 1 element / index | Linear recursion | 1–3 |
| Tree / linked list structure | Return-value recursion | 4, 9, 10 |
| Include / exclude / pick k | Subset / combo backtrack | 11, 13, 15 |
| All orderings | Permutation backtrack | 12 |
| Cut string into valid segments | String partition | 14, 28 |
| Walk grid, mark cells | Grid DFS backtrack | 16 |
| Fill board with constraints | CSP backtrack | 18, 30 |
| +/- or k buckets | Pruning backtrack | 17, 19 |
| Count ways, overlapping states | Memo recursion | 23, 27 |
| Pattern vs text | `(i,j)` memo | 29 |
| Many words on grid | Trie + grid DFS | 30 |
| Generate all board configs | Full constraint generation | 30 |

### 3. Today's two capstone patterns

**Word Search II (#212)** — Day 16 grid backtrack **+ trie prefix prune**:

```
Build trie from dictionary
For each cell (r,c):
  dfs(r, c, trie_node):
    if node.is_word: collect; optionally remove to dedupe
    mark board[r][c] = '#'
    for 4 neighbors: dfs if trie has next char
    unmark board[r][c]
```

Why trie? Day 16 Word Search checks one word. Day 30 checks **thousands** — trie collapses shared prefixes so `"abc"`, `"ab"`, `"abd"` share the `"ab"` path.

**N-Queens (#51)** — Day 18 N-Queens II **+ store the board**:

```
dfs(row r):
  if r == n: snapshot board → res; return
  for col c in 0..n-1:
    if valid(r,c): mark constraints
      board[r][c] = 'Q'
      dfs(r+1)
      unmark; board[r][c] = '.'
```

Same constraint sets as Day 18 (`cols`, `d1`, `d2`). Output changes from **count** to **all boards**.

### 4. The Legend workflow

Every S-Rank interview problem:

1. **Read** — underline what shrinks and what "done" means
2. **Route** — run the decision tree → name the day/pattern
3. **Trace** — one example on paper (call stack or board)
4. **Code** — template first, special cases second
5. **Prune** — ask "can I cut this branch?" (Days 17, 28)

> 💡 **The S-Rank skill:** Trace the call stack first. Name the pattern second. Code third.

### 5. Full pack map — where you learned each branch

```
Days  1–3:  linear recursion (base + trust)
Days  4–6:  return-value + multi-call recursion
Days  7–10: divide & conquer + tree helpers
Days 11–15: backtracking generation (subset → combo → partition)
Days 16–18: grid + board constraint CSP
Days 19–22: advanced backtrack + multi-constraint
Days 23–25: memo + counting
Days 26–27: synthesis + interview speed
Days 28–29: optimized revisit + pattern matching
Day  30:    capstone — trie+grid + full N-Queens
```

### 6. Common capstone mistakes

| Mistake | Pattern | Fix |
|---|---|---|
| Run Word Search II without trie | Day 16 only | TLE — prefix tree mandatory |
| Forget to unmark grid cell | Day 16 | `'#'` leaks across paths |
| N-Queens: scan board for attacks | Day 18 | Use cols/d1/d2 sets — O(1) |
| N-Queens II vs #51 confusion | Day 18 vs 30 | Same dfs — count vs collect |
| Skip pattern naming | All days | Decision tree first |

### 7. Recognition drill — capstone edition

Read each problem. Route through the tree:

> *"Find all words from a dictionary in a 2D grid."*
>
> → **Backtrack → Grid → Trie prune.** Day 16 mark/unmark + trie from Day 30 concept.

> *"Return all N-Queens board configurations."*
>
> → **Backtrack → Board CSP → generate all.** Day 18 constraint sets + store board strings.

> *"Does text match regex with `.` and `*`?"*
>
> → **Not backtrack → `(i,j)` memo.** Day 29 — star branch diagram.

> *"Partition string into palindromes — all schemes."*
>
> → **Backtrack → String partition → isPal precompute.** Day 14 + Day 28.

---

*You have the full decision tree. Quest 1: Word Search II — trie meets grid. →*
