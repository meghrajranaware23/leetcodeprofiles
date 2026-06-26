# 📝 Multi-Pointer Patterns

> **Day 7** · Multi-Pointer · 10 min read

---

Some problems need **more than two indices** moving in coordination — three pointers partitioning an array, or a fixed outer index plus an inner two-pointer sweep. These are the natural next step after basic two-pointer work.

Think of it like sorting mail into three bins at once, or hunting for a triple that sums to zero by fixing one envelope and scanning the rest with two fingers.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Multi-pointer** means coordinating **three or more indices** (or two indices plus a fixed anchor) to partition, sort, or search an array in one or two passes.

Two flagship variants in D-Rank:

- **3Sum pattern** — sort, fix one element, use **left/right** on the remainder to find pairs
- **Dutch National Flag** — **low / mid / high** pointers to partition into three groups in one pass

Both reduce brute-force nested loops to structured sweeps.

### 2. Simple explanation

**3Sum:** If you need three numbers that sum to zero, pick the first number and ask: *"Can the rest of the array form a pair that completes it?"* That's Two Sum on a slice — but you need to avoid counting the same triple twice, so you sort first and skip duplicates.

**Dutch National Flag:** You have three colors (0, 1, 2) scrambled in a line. Three pointers define three zones: "all 0s so far," "all 1s so far," and "unprocessed." Swap as you go — one pass, no extra array.

### 3. Small visual example

**3Sum on `[-1, 0, 1, 2, -1, -4]`** (after sorting: `[-4, -1, -1, 0, 1, 2]`):

```
Fix i=1 (value -1):  left=2, right=5

  -1 + (-1) + 2 = 0  ✓  → [-1, -1, 2]
  skip dup left/right, left=3, right=4
  -1 + 0 + 1 = 0  ✓  → [-1, 0, 1]

Fix i=2 (value -1): skip duplicate at i
```

**Dutch National Flag on `[2, 0, 2, 1, 1, 0]`:**

```
Zones:  [0..low-1 = 0s] [low..mid-1 = 1s] [mid..high = unknown] [high+1..end = 2s]

Start: low=0, mid=0, high=5

mid=0, val=2 → swap with high, high--     [0,0,2,1,1,2]  (don't advance mid)
mid=0, val=0 → swap with low, low++, mid++
             [0,0,2,1,1,2] → [0,0,...]
...continue until mid > high → sorted ✓
```

### 4. How the pattern works

**3Sum skeleton:**
```
sort(nums)
for i in 0..n-3:
    skip duplicate nums[i]
    left = i+1, right = n-1
    while left < right:
        sum = nums[i] + nums[left] + nums[right]
        if sum == 0: record; skip dup left/right; move both
        elif sum < 0: left++
        else: right--
```

**Dutch National Flag skeleton:**
```
low = 0, mid = 0, high = n-1
while mid <= high:
    if nums[mid] == 0: swap(low, mid); low++; mid++
    elif nums[mid] == 1: mid++
    else: swap(mid, high); high--   // don't mid++ — new value at mid unprocessed
```

### 5. What problem does this pattern solve?

- Find **all unique triplets** summing to a target (3Sum)
- **Sort three values** (0/1/2 or low/mid/high partitions) in O(n) time
- **K-sum generalization** — fix k−2 elements, two-pointer the rest
- **In-place multi-way partitioning** without counting sort or extra space

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Three nested loops for all triplets | O(n³) — misses duplicate handling |
| Count sort with extra arrays | Works for 3 values, but not general; Dutch flag is O(1) space |
| Fix one + nested loop for pair | O(n²) without duplicate skip — outputs repeats |
| Sort entire array each time | O(n² log n) when one sort + sweep is O(n²) |

### 7. The key observation

**Sorting unlocks two-pointer logic.** Once sorted, moving `left++` increases the sum; moving `right--` decreases it — a monotonic lever.

**Three zones beat three passes.** Dutch National Flag maintains invariants with three boundaries; each element is examined once.

For 3Sum: *fix one, two-pointer the rest, skip duplicates at every level.*

For three-way partition: *one unknown zone shrinks from both ends as 0s and 2s are settled.*

### 8. Pattern signals & recognition clues

| When the problem says… | Think multi-pointer |
|---|---|
| "all unique triplets" / "3Sum" / "three numbers sum to" | Sort + fix one + left/right |
| "sort array of 0s, 1s, and 2s" / "three colors" | Dutch National Flag |
| "partition into three groups" / "in-place" + small domain | low / mid / high |
| "closest sum to target" (k=3) | Same skeleton, track best (3Sum Closest) |
| "four sum" / "k sum" | Fix outer loop(s), two-pointer inner |

**Keywords:** `triplet` · `three sum` · `partition` · `0 1 2` · `Dutch flag` · `in-place sort` · `unique combinations`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Not sorting before 3Sum two-pointer | Unsorted array breaks the left/right monotonic move |
| Forgetting duplicate skip at `i`, `left`, and `right` | Same triplet reported multiple times |
| Advancing `mid` after swapping with `high` in Dutch flag | New value at `mid` must be re-examined |
| Using `while mid < high` instead of `mid <= high` | Last element in unknown zone never processed |
| Returning early on first 3Sum match | Problem asks for **all** unique triplets |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of 0s, 1s, and 2s, sort them in-place so all 0s come first, then 1s, then 2s."*

Before coding, say:

> *"Three values, in-place, one pass → Dutch National Flag with low, mid, high pointers."*

---

## Part 2 — Choosing Your Variant

| Scenario | Use | Why |
|---|---|---|
| Find triplets/pairs after sorting | Fix + left/right | O(n²) after O(n log n) sort |
| Partition into exactly 3 groups | Dutch National Flag | O(n) time, O(1) space |
| k-Sum (k > 3) | Fix k−2 outer loops + two-pointer | Same idea, deeper nesting |
| Unsorted + need original indices | Hash map (Two Sum), not 3Sum sweep | Sorting destroys index mapping |

> 💡 **3Sum is Two Sum with a fixed anchor.** **Sort Colors is Move Zeroes with three buckets instead of two.** If you know E-Rank read-write and two-pointer patterns, Day 7 is composition — not a new language.

---

*You understand multi-pointer coordination. First quest: the classic 3Sum. →*
