<!-- hand-authored -->
# 📝 Multi-Constraint Backtracking

> **Day 22** · Advanced Constraint Backtracking · 25 XP · 15 min read

---

Backtracking always asks: *at this level, which choices are valid?* Most days use **one** constraint type — board conflicts (Day 18), bucket sums (Day 19), or a partition validator (Day 14).

Today teaches **two different constraint flavors** on the **same push/pop skeleton**. The quests look unrelated; the recursion shape is identical.

---

## Part 1 — Flavor A: Divisibility Constraint Permutation

### 1. Beautiful Arrangement (#526)

Count permutations of `1..n` where at position `pos` (1-indexed), **either** `perm[pos] % pos == 0` **or** `pos % perm[pos] == 0`.

This is **permutation backtracking** (Day 12) with an extra guard in the loop:

```
dfs(pos):
    if pos > n: count++; return
    for each unused number i:
        if i % pos == 0 OR pos % i == 0:   // CONSTRAINT
            used[i] = true
            dfs(pos + 1)
            used[i] = false
```

**State:** `pos` (which slot you're filling) + `used[]` (which numbers are taken).  
**Shrink:** `pos` increases by 1 each level.  
**Constraint:** checked **before** choose — invalid numbers never enter the tree.

### 2. Visual — n = 3

```
pos=1: can pick 1,2,3 (all divide)
  pick 1 → pos=2: need i%2==0 or 2%i==0 → only 2 works
    pick 2 → pos=3: need i%3==0 or 3%i==0 → only 3 works
      pick 3 → valid arrangement [1,2,3] ✓

pos=1: pick 2 → pos=2: 1 and 2 work (2%2, 2%1)
  ...
```

Pruning happens **inside the for-loop** — not after placement. Compare to N-Queens (Day 18): constraint checked before `dfs(row+1)`.

### 3. Why not generate all permutations and filter?

| All permutations then filter | Constraint-in-loop |
|---|---|
| Explores dead branches deep in tree | Prunes at current level |
| O(n!) always | Far fewer branches for small n |
| Same final count | Same answer, less work |

**Pattern name:** Divisibility Constraint Permutation — `used[]` + positional divisibility guard.

---

## Part 2 — Flavor B: Cantor / Diagonal Binary String

### 4. Find Unique Binary String (#1980)

Given `n` distinct binary strings each of length `n`, construct a binary string of length `n` **different from all of them**.

**Key insight (Cantor diagonal):** Build `ans` bit by bit. At position `i`, pick `'0'` or `'1'` such that `ans[i] != nums[k][i]` for **at least one** string `k` — actually: pick a bit that differs from **all** strings at that column.

Simpler construction (works for this problem size):

```
At index i, try bit b in {'0','1'}:
    if no input string has s[i] == b at position i:
        choose b, recurse to i+1
```

If `'0'` fails (some string matches at `i`), try `'1'`. For `n` strings of length `n`, one bit always works — pigeonhole on the diagonal argument.

### 5. Visual — diagonal intuition

```
nums = ["01", "10"]

Build s bit by bit:
i=0: try '0' → nums[0][0]='0' matches → reject
     try '1' → nums[0][0]='0' ≠ '1' ✓, nums[1][0]='1' ≠ '1'? matches nums[1] → reject
     
Actually for n=2, try:
i=0: '0' → check all strings column 0
     '1' → ...
```

The **backtracking skeleton:**

```
dfs(i):
    if i == n: return true
    for bit in {'0', '1'}:
        s[i] = bit
        if not any(nums[k][i] == s[i] for all k):  // at least one differs
            if dfs(i+1): return true
    return false
```

Equivalently: **reject** if **every** input string matches your chosen bit at position `i`.

### 6. Cantor diagonal vs permutation constraint

| Beautiful Arrangement | Find Unique Binary String |
|---|---|
| Constraint between **number and position** | Constraint against **external set** of strings |
| `used[]` tracks chosen numbers | No `used[]` — build string left to right |
| Count all valid (return count) | Find one valid (return early) |
| Prune: divisibility fails | Prune: bit matches all strings at column |
| Positions 1..n | Indices 0..n-1 |

Same code shape:

```
for each choice:
    if valid(choice):
        apply choice
        if dfs(next): ...
        undo choice
```

---

## Part 3 — Unified Template

### 7. Multi-constraint backtracking checklist

```
1. What am I building?     permutation / string / path
2. What is the level?      pos / index i / row
3. What choices at level?  unused nums / bits 0,1 / columns
4. What constraint?        divisibility / column mismatch / board attack
5. When to record?         count at leaf / return true at leaf / collect all
6. What to undo?           used[i] / s[i] / board mark
```

### 8. Pattern signals

| When the problem says… | Think… |
|---|---|
| "permutation" + numeric rule at position | Divisibility constraint permutation |
| "count arrangements" + `used[]` | Backtrack + increment at `pos > n` |
| "different from all given strings" | Cantor / column-wise bit choice |
| "construct string" + length n + n inputs | Diagonal backtrack — one bit at a time |
| "find any" vs "count all" | Early return true vs global counter |

**Keywords:** `pos` · `used[]` · `divisibility` · `diagonal` · `column check` · `constraint before choose`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Check divisibility after placement | Guard **before** `used[i]=true` |
| `i % pos && pos % i` in Python without `== 0` | Use `not (i % pos == 0 or pos % i == 0)` for skip |
| Generate all 2^n strings, filter | Prune at each bit — column check first |
| Confusing "differ from one" vs "differ from all" | Must differ from **every** given string (at least one column where you pick unmatched bit) |
| Forgetting to undo `used[i]` | pop/unmark after dfs returns |

### 10. Recognition drill

Read aloud:

> *"Count permutations of 1..n where each number at position i satisfies a divisibility rule."*

Say:

> *"Permutation backtracking with used[]. Loop i, skip if neither divides. dfs(pos+1). Count at pos>n."*

Read:

> *"Given n binary strings of length n, return a binary string not in the set."*

Say:

> *"Build ans[i] left to right. Try 0/1. Skip bit if every input matches at column i. Return first complete string."*

---

## Part 2 — What's Next

Two quests, two constraint types — same skeleton:

1. **Beautiful Arrangement #526** — divisibility + `used[]` permutation
2. **Find Unique Binary String #1980** — Cantor diagonal bit building

Trace one full path on paper for each before coding.

---

*Two constraint flavors, one backtracking spine. First quest: count beautiful permutations. →*
