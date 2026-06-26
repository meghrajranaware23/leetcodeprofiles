# 📝 Converging Two Pointers on Sorted Data

> **Day 6** · Converging Two Pointers · 10 min read

---

Welcome to D-Rank. You've already met converging pointers on **strings** and complement hunting with a **hash map**. Today you fuse those instincts: when data is **sorted** (or has a monotonic structure), two pointers from opposite ends replace nested loops — and often replace the hash map entirely.

---

## Part 1 — From Palindrome to Pair Sum

### Day 2: Converging on Strings

On Day 2 you learned two pointers moving **inward** from both ends:

```
"racecar"
 L     R
 compare → L++, R-- → meet in the middle
```

**Compare mode** checked symmetry. **Swap mode** reversed in place. The skeleton was always `while left < right`.

That was converging pointers on **character order** — not on numeric value.

### Day 4: Complement Hunting with a Hash Map

On Day 4, Two Sum asked: *"Find two numbers that add to `target`."*

```
nums = [2, 7, 11, 15], target = 9

i=0: need 7 → not in map → store {2:0}
i=1: need 2 → FOUND at index 0 → return [0, 1]
```

The hash map remembered **past** values so you could find complements in O(1). That works on **any** array — sorted or not.

### Day 6: When Sorted Changes Everything

Now imagine the array is **sorted**:

```
nums = [2, 7, 11, 15], target = 9
        L              R

sum = 2 + 15 = 17  → too big  → move R left
sum = 2 + 11 = 13  → too big  → move R left
sum = 2 + 7  = 9   → match!   → return [1, 2]  (1-indexed)
```

Because values increase left to right:

| Situation | What it means | Move |
|---|---|---|
| `nums[L] + nums[R] < target` | Sum too small | `L++` (need a bigger left value) |
| `nums[L] + nums[R] > target` | Sum too big | `R--` (need a smaller right value) |
| Equal to `target` | Found the pair | Return indices |

No hash map. No nested loops. One pass from both ends.

> ⚡ **The upgrade:** Same "hunt the complement" instinct as Day 4 — but sorted order lets **geometry** do the lookup. Left pointer only moves right; right pointer only moves left. Every element is visited at most once.

### Sorted vs Unsorted — Pick Your Weapon

```
┌────────────────────┬─────────────────────────┬──────────────────────────┐
│ Array state        │ Best tool               │ Why                      │
├────────────────────┼─────────────────────────┼──────────────────────────┤
│ Unsorted           │ Hash map (Day 4)        │ No order → must remember │
│ Sorted             │ Converging pointers     │ Order tells you which way│
│ Need original idx  │ Hash map                │ Sorting loses positions  │
│ 1-indexed sorted   │ Converging pointers     │ Classic Two Sum II       │
└────────────────────┴─────────────────────────┴──────────────────────────┘
```

---

## Part 2 — The Converging Two Pointers Pattern (Sorted)

### 1. What is the pattern?

Two indices — **left** at the start, **right** at the end — moving **toward each other**:

- **Pair-sum mode** — hunt two values that satisfy a target equation
- **Optimization mode** — evaluate a function over every valid window and track the best (e.g., max area)

Both use `while left < right`, but the **move rule** depends on what you're optimizing.

### 2. Simple explanation

Picture two scouts at opposite ends of a **sorted** line of numbers. They report the sum of the two values they're pointing at.

- Sum too low? The left scout steps right (only way to increase the sum without breaking the pairing logic).
- Sum too high? The right scout steps left.

They never pass each other. They never revisit a pair. The sorted order is what makes each decision safe.

### 3. Small visual example

**Two Sum II** — `nums = [1, 2, 3, 4, 6], target = 6`:

```
Start:  [1,  2,  3,  4,  6]
         L               R
         1 + 6 = 7 > 6  → R--

        [1,  2,  3,  4,  6]
         L           R
         1 + 4 = 5 < 6  → L++

        [1,  2,  3,  4,  6]
             L       R
             2 + 4 = 6 ✓  → return [2, 4]  (1-indexed)
```

**Container With Most Water** — move the **shorter** line inward:

```
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
          L                          R
area = min(1,7) × 8 = 7  → move L (shorter side)

          L                       R
area = min(8,7) × 7 = 49 → move R (shorter side)

... continue tracking max area ...
```

### 4. How the pattern works

**Pair sum on sorted array:**
```
left = 0, right = n - 1
while left < right:
    sum = nums[left] + nums[right]
    if sum == target: return [left+1, right+1]   // 1-indexed
    elif sum < target: left++
    else: right--
```

**Maximize area (greedy move):**
```
left = 0, right = n - 1, maxArea = 0
while left < right:
    maxArea = max(maxArea, min(h[left], h[right]) * (right - left))
    if h[left] < h[right]: left++
    else: right--
return maxArea
```

One pass. O(n) time. O(1) extra space.

### 5. What problem does this pattern solve?

Any task where **two boundaries** define a candidate answer and you can **eliminate half the remaining pairs** with each move:

- **Two Sum II** — pair summing to target on sorted input
- **Container With Most Water** — widest container with bounded height
- **3Sum** (Day 9 preview) — fix one element, two-pointer scan on the remainder
- **Valid Palindrome** (Day 2) — same skeleton, compare instead of sum

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Nested loops checking every pair `(i, j)` | O(n²) — converging pointers cut to O(n) |
| Hash map on already-sorted data | Works, but ignores order — extra space for no reason |
| Try every `(L, R)` window for max area | O(n²) — greedy shorter-line move proves you can skip widths safely |
| Sort + hash map when indices must stay original | Sorting destroys original positions |

### 7. The key observation

On **sorted** data, increasing the left pointer **always** increases the sum; decreasing the right pointer **always** decreases it. That monotonicity is what lets you discard entire regions of the search space with one comparison.

For **area** problems, width shrinks every step — so you only move the shorter height. A taller inner line can't beat the current area with a narrower width. You're not exploring every pair — you're **pruning** provably worse candidates.

### 8. Pattern signals & recognition clues

| When the problem says… | Think converging pointers |
|---|---|
| "sorted array" / "non-decreasing order" | Pair-sum mode — move L or R based on sum |
| "two numbers add up to target" + sorted | Two Sum II — hash map is overkill |
| "1-indexed" + sorted | Confirms Two Sum II variant |
| "maximum area" / "container" / "two lines" | Optimization mode — track best, move shorter |
| "pair with given sum" after sorting | Sort first, then converge (3Sum family) |

**Keywords:** `sorted` · `two sum` · `pair` · `opposite ends` · `left and right` · `container` · `maximize area`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Moving the wrong pointer on sum compare | Too small → `L++`; too big → `R--` |
| Returning 0-indexed on Two Sum II | Problem uses 1-indexed — return `[L+1, R+1]` |
| Moving the taller line in Container With Most Water | Always move the **shorter** line — width only shrinks |
| Using converging pointers on unsorted Two Sum | Need hash map (Day 4) unless you sort first and don't need original indices |
| `while left <= right` causing same-element pair | Use `left < right` — prevents using one index twice |

### 10. Recognition drill

Read this problem aloud:

> *"Given a 1-indexed sorted array, find two numbers that add up to a target. Exactly one solution exists."*

Before coding, say:

> *"Sorted + pair sum → converging pointers from both ends. Too small → L++. Too big → R--. Return 1-indexed."*

---

*You understand the pattern. Your first D-Rank quest puts pair-sum mode into practice. →*
