<!-- hand-authored -->
# 📝 Combination Generation

> **Day 13** · Combinations · ★★★☆☆ · 20 XP · 15 min read

---

Day 11 generated **all subset sizes**. Day 12 filled **all orderings**. Today you pick **exactly k elements** from a range — order still doesn't matter, so we're back to the **start index** from Day 11.

The new twist in Combination Sum (#39): sometimes you **reuse the same index** instead of advancing.

---

## Part 1 — Learn the Pattern

### 1. Combinations vs subsets vs permutations

| Pattern | Record when | Index rule |
|---|---|---|
| Subsets (Day 11) | Every node | Forward: `j+1` |
| Permutations (Day 12) | Leaf only (`path.size()==n`) | Any unused: `used[]` |
| **Combinations (Day 13)** | Leaf only (`path.size()==k`) | Forward: `j+1` |

Combinations #77 is subsets with a **size filter**: only record when `path.size() == k`.

### 2. Start index — why it prevents duplicates

```
combine(n=4, k=2) → pairs from {1,2,3,4}

start=1: pick 1 → start=2: pick 2→[1,2], pick 3→[1,3], pick 4→[1,4]
         pick 2 → start=3: pick 3→[2,3], pick 4→[2,4]
         pick 3 → start=4: pick 4→[3,4]

[2,1] never appears — we never go backward
```

Same push/pop skeleton as Day 11:

```cpp
void dfs(int n, int k, int start, vector<int>& path, vector<vector<int>>& res) {
    if (path.size() == k) { res.push_back(path); return; }
    for (int i = start; i <= n; i++) {
        path.push_back(i);
        dfs(n, k, i + 1, path, res);   // always forward
        path.pop_back();
    }
}
```

### 3. Combination Sum — reuse the same index

Combination Sum (#39): candidates may be **reused unlimited times**, but `[2,2,3]` and `[2,3,2]` are the same combo — still no reordering.

**Two branches at each index `i`:**

```
INCLUDE nums[i]:  dfs(i, rem - nums[i])    ← same i, reuse allowed
EXCLUDE nums[i]:  dfs(i + 1, rem)          ← move on
```

```cpp
void dfs(vector<int>& c, int i, int rem, vector<int>& path, vector<vector<int>>& res) {
    if (rem == 0) { res.push_back(path); return; }
    if (i == c.size() || rem < 0) return;
    path.push_back(c[i]);
    dfs(c, i, rem - c[i], path, res);      // REUSE: stay at i
    path.pop_back();
    dfs(c, i + 1, rem, path, res);         // SKIP: advance
}
```

The include branch keeps `i`; the exclude branch uses `i+1`. This generates combinations with repetition without permutations.

### 4. Visual — candidates = [2,3,6], target = 7

```
dfs(i=0, rem=7, [])
  include 2: dfs(i=0, rem=5, [2])
    include 2: dfs(i=0, rem=3, [2,2])
      include 2: rem=1 — dead
      skip 2: dfs(i=1, rem=3, [2,2])
        include 3: rem=0 → record [2,2,3] ✓
    skip 2: dfs(i=1, rem=5, [2])
      include 3: ... → [2,3,2] never — start index prevents reorder
  skip 2: dfs(i=1, rem=7, [])
    ...
```

### 5. What problem does this pattern solve?

- **Combinations C(n,k)** — fixed count, no reuse (#77)
- **Combination Sum** — target, unlimited reuse (#39)
- **Combination Sum II/III** — add single-use or fixed digit constraints (Days 15–16)

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Permutation + filter by sum | Generates `[3,2,2]` and `[2,2,3]` — duplicate combos |
| Nested loops for each combo size | Doesn't extend to reuse or target pruning |
| Always `i+1` on include (Combination Sum) | Can't reuse — misses `[2,2,3]` |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "combine k numbers from 1..n" | Start index, record at size k |
| "combination sum" + "reuse unlimited" | Include stays at `i`, exclude goes `i+1` |
| "order doesn't matter" | Start index — never backward |
| "each number used once" | Always `i+1` after include (Day 15) |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `used[]` on combinations | Overkill — start index suffices |
| `i+1` on include for Combination Sum | Use `i` to allow reuse |
| Recording at every node (Combinations) | Only record when `path.size()==k` |
| No early exit when `rem < 0` | Prune dead branches |

### 9. Recognition drill

> *"Return all k-combinations of 1..n."*

Say: *"Start index like Day 11. Record only when path.size()==k. push → dfs(i+1) → pop."*

> *"Find combos that sum to target, elements reusable."*

Say: *"Include: dfs(i, rem-c[i]). Exclude: dfs(i+1, rem). push/pop on include only."*

---

## Part 2 — What's Next

1. **Combinations #77** — pure start index, fixed k
2. **Combination Sum #39** — same family + reuse via staying at `i`

Day 11's push/pop returns. The only new idea is **when to advance the index**.

---

*Combinations = filtered subsets. Combination Sum = subsets with reuse. First quest →*
