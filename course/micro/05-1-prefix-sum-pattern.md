# 📝 The Prefix Sum Pattern

> **Day 5** · Prefix Sums · 8 min read

---

If you find yourself summing the same range of numbers over and over — stop. **Prefix sums** let you precompute once and answer range questions instantly.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **prefix sum array** stores cumulative totals. Each entry answers: *"What is the sum of all elements before this index?"*

```
nums:     [ 2,  4,  1,  3,  5 ]
index:      0   1   2   3   4

prefix[0] = 0                          ← always start with 0
prefix[1] = 0 + 2  = 2
prefix[2] = 2 + 4  = 6
prefix[3] = 6 + 1  = 7
prefix[4] = 7 + 3  = 10
prefix[5] = 10 + 5 = 15

prefix:   [ 0,  2,  6,  7, 10, 15 ]
```

Length is **n + 1**. The extra zero at the start eliminates edge cases.

### 2. Simple explanation

Instead of adding `nums[2] + nums[3] + nums[4]` every time someone asks, you precompute running totals. Any range sum becomes **one subtraction**.

### 3. Small visual example

```
nums:    [ 2,  4,  1,  3,  5 ]
prefix:  [ 0,  2,  6,  7, 10, 15 ]

"What is the sum from index 1 to 3?"  (elements 4 + 1 + 3 = 8)

sum(1, 3) = prefix[4] - prefix[1]
          = 10 - 2
          = 8  ✓
```

The prefix array "grabs" everything up to the end of the range, then subtracts everything before the start.

### 4. How the pattern works

**Build (one pass):**
```
prefix[0] = 0
for i in 0..n-1:
    prefix[i+1] = prefix[i] + nums[i]
```

**Query (O(1) per question):**
```
sum(L, R) = prefix[R + 1] - prefix[L]
```

**Balance points (lighter version — no full array needed):**
```
total = sum of all elements
left_sum = 0
for each index i:
    right_sum = total - left_sum - nums[i]
    if left_sum == right_sum: return i
    left_sum += nums[i]
```

### 5. What problem does this pattern solve?

- **Range sum queries** — "What is the sum from index L to R?"
- **Multiple queries** on a fixed array — build once, answer fast
- **Balance / pivot points** — where left half sum equals right half sum
- **Product except self** (E-Rank test) — same idea with multiplication (prefix × suffix)

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Loop L→R for every query | O(n) per query — doesn't scale |
| Nested loops over all subarrays | O(n²) or worse |
| Recompute left/right sums at each index | Two inner loops per position |

### 7. The key observation

Every element's contribution to any range is **fixed**. Once you know the cumulative total up to any point, any range is just the difference between two prefix values.

### 8. Pattern signals & recognition clues

| When the problem says… | Think prefix sum |
|---|---|
| "sum from index L to R" / "range query" | Prefix subtraction |
| "multiple queries" on fixed array | Precompute prefix array |
| "left sum equals right sum" / "pivot" | Total − running left − current |
| "product except self" | Prefix × suffix products |

**Keywords:** `range sum` · `subarray sum` · `cumulative` · `running total` · `pivot` · `equilibrium`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using `prefix[R] - prefix[L]` | Correct formula: `prefix[R+1] - prefix[L]` |
| Forgetting `prefix[0] = 0` | Breaks queries starting at index 0 |
| Looping L→R inside every query | Build prefix once instead |
| Building full prefix array for pivot problems | Running sum + total is enough |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array, answer many queries: what is the sum of elements from index left to index right, inclusive?"*

Before coding, say:

> *"Fixed array, repeated range queries → build prefix array, answer with prefix[R+1] − prefix[L]."*

---

## Part 2 — What's Next

In D-Rank you'll combine prefix sums with hash maps for harder subarray problems. For now, master three things:

1. Building the prefix array (`prefix[0] = 0`, length n + 1)
2. The range formula: `prefix[R+1] - prefix[L]`
3. Balance points with running sum + total

---

*You understand the pattern. Your first quest handles range queries. →*
