<!-- hand-authored -->
# 📝 Combination Sum Variants

> **Day 15** · Combination Sum Variants · ★★★★☆ · 20 XP · 15 min read

---

Day 13's Combination Sum (#39) allowed **unlimited reuse** with `dfs(i, ...)` on include. Today the constraints tighten:

1. **Combination Sum II (#40)** — each candidate used **at most once**, array may have **duplicates**
2. **Combination Sum III (#216)** — exactly **k** digits from 1–9 summing to **n**

Both reference Day 13's start-index skeleton. Dedup reuses Day 11's **sort + skip**.

---

## Part 1 — Learn the Pattern

### 1. Combination Sum II — single use + dedup

Compared to #39:

| Combination Sum (#39) | Combination Sum II (#40) |
|---|---|
| Include → stay at `i` (reuse) | Include → **`i + 1`** (single use) |
| Distinct candidates | May have duplicates |
| No dedup | **Sort + skip** duplicate values at same level |

```cpp
// Include branch — always advance (single use)
path.push_back(c[i]);
dfs(c, i + 1, rem - c[i], path, res);
path.pop_back();

// Skip duplicates before exclude branch
while (i + 1 < c.size() && c[i + 1] == c[i]) i++;
dfs(c, i + 1, rem, path, res);
```

**Why the while-loop skip?** After choosing **not** to include `c[i]`, every sibling duplicate of `c[i]` would explore the same "skip this value" subtree. Advance `i` past all equal values.

This is the same dedup philosophy as Subsets II (Day 11): **sort first, skip duplicate siblings**.

Alternative equivalent guard (inside a for-loop):
```
if (i > 0 && c[i] == c[i-1] && !included_previous) continue;
```
The include/exclude two-call structure with while-skip is the standard interview form.

### 2. Combination Sum III — fixed k + digit range

Pick **exactly k** distinct digits from `{1..9}` that sum to `n`. Pure Day 13 Combinations (#77) + target check:

```cpp
void dfs(int k, int n, int start, vector<int>& path, vector<vector<int>>& res) {
    if (k == 0 && n == 0) { res.push_back(path); return; }
    if (k == 0 || n <= 0) return;
    for (int i = start; i <= 9; i++) {
        path.push_back(i);
        dfs(k - 1, n - i, i + 1, path, res);   // use k-1 digits, sum n-i, forward
        path.pop_back();
    }
}
```

Two stopping dimensions: **count** (`k`) and **sum** (`n`). Prune when either exhausts.

### 3. Decision tree comparison

```
#39 target=7, [2,3]:          #40 target=7, [2,2,3] sorted:
  include 2 → reuse 2            include first 2 → only i+1
  [2,2,3] ✓                      skip dup 2 with while
                                 [2,3] ✓ (not [2,2,3] twice)

#216 k=3, n=9:
  pick 1 → pick 2 → pick 6? sum=9 → [1,2,6] ✓
  pick 2 → pick 3 → pick 4 → [2,3,4] ✓
```

### 4. Reference map — Day 11 → Day 15

| Technique | First learned | Reused today |
|---|---|---|
| push/pop skeleton | Day 11 | All variants |
| sort + skip dedup | Day 11 Subsets II | Combination Sum II |
| start index | Day 11/13 | Combination Sum III |
| include→i, exclude→i+1 | Day 13 #39 | **Not** in #40 — always i+1 |
| record at target | Day 13 #39 | #40 same; #216 adds k==0 |

### 5. Pattern signals

| When the problem says… | Variant |
|---|---|
| "each number once" + target | Combination Sum II |
| "duplicates" in candidates | Sort + while-skip |
| "exactly k numbers" + sum to n | Combination Sum III |
| "unlimited reuse" | Day 13 #39 — include stays at i |

### 6. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Reuse `dfs(i,...)` on include for #40 | Single use → always `i+1` |
| No sort before dedup in #40 | Duplicates must be adjacent |
| Record when `n==0` but k≠0 in #216 | Both must hit zero |
| Subsets dedup `j > start` in combo sum | Use while-skip or equivalent |

### 7. Recognition drill

> *"Combination sum, each candidate once, may have duplicates."*

Say: *"Day 13 combo + Day 11 dedup. Include dfs(i+1). while-skip dupes. Sort first."*

> *"K numbers from 1-9 sum to n."*

Say: *"Combinations #77 + target. dfs(k-1, n-i, i+1). Record when k==0 && n==0."*

---

## Part 2 — What's Next

1. **Combination Sum II #40** — single-use + sort/skip (C-Rank test problem!)
2. **Combination Sum III #216** — fixed k digits

If Day 13 clicked, these are constraint edits — not new algorithms.

---

*Same tree, tighter rules. First quest →*
