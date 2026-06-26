# 📝 The Variable Sliding Window

> **Day 10** · Variable Sliding Window · 10 min read

---

Yesterday you slid a frame of fixed size `k`. Today the frame **breathes** — it grows when things look promising and shrinks when a constraint breaks. This is the **variable sliding window**: expand right, shrink left.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **variable sliding window** maintains a contiguous subarray/substring whose size is **not fixed**. Two pointers `left` and `right` define the window:

- **Expand right** — include `nums[right]`, grow the window
- **Shrink left** — remove `nums[left]`, shrink until the window is valid again

```
Goal: smallest subarray with sum ≥ 7
nums = [2, 3, 1, 2, 4, 3]

right expands → window grows
right=3: [2, 3, 1, 2]  sum=8 ≥ 7  → record len=4
         shrink left while sum ≥ 7
left=1:  [3, 1, 2]     sum=6 < 7  → stop shrinking
right=5: [3, 1, 2, 4, 3] sum=13 ≥ 7 → shrink...
left=2:  [1, 2, 4, 3]  sum=10 ≥ 7 → shrink...
left=3:  [2, 4, 3]     sum=9 ≥ 7  → shrink...
left=4:  [4, 3]        sum=7 ≥ 7  → len=2  ← answer
```

The window size changes. The invariant is a **constraint** (sum, distinct chars, count of bad elements).

### 2. Expand right, shrink left

The universal template:

```
left = 0
answer = initial value (0, ∞, or -∞ depending on min vs max)

for right in 0..n-1:
    ADD nums[right] to window state        // EXPAND

    while window is INVALID (or can improve by shrinking):
        REMOVE nums[left] from window state // SHRINK
        left++

    UPDATE answer with window [left..right]
```

**Two flavors:**

| Goal | Shrink condition | Track |
|---|---|---|
| **Shortest** valid window | Shrink while still valid (sum ≥ target) | `min(right - left + 1)` |
| **Longest** valid window | Shrink when invalid (duplicates, budget exceeded) | `max(right - left + 1)` |

### 3. Fixed vs variable — when to use which

| | Fixed (Day 9) | Variable (Day 10) |
|---|---|---|
| **Window size** | Always `k` | Grows and shrinks |
| **Mechanic** | Enter one, exit one per slide | Expand right; shrink left when needed |
| **Typical ask** | Max/min/average of every k-window | Shortest/longest subarray meeting a condition |
| **Example** | Max average subarray (#643) | Min subarray sum ≥ k (#209) |

Day 9's Max Consecutive Ones III was a preview — variable length with a budget constraint.

### 4. Small visual example — shortest subarray

```
nums = [2, 3, 1, 2, 4, 3],  target = 7

Step 1: right=0  [2]           sum=2
Step 2: right=1  [2,3]         sum=5
Step 3: right=2  [2,3,1]       sum=6
Step 4: right=3  [2,3,1,2]     sum=8 ≥ 7 → shrink
        left=1   [3,1,2]       sum=6 < 7 → stop, len=3
Step 5: right=4  [3,1,2,4]     sum=10 ≥ 7 → shrink...
        left=4   [4]           sum=4
Step 6: right=5  [4,3]         sum=7 ≥ 7 → shrink
        left=5   [3]           sum=3

Shortest valid length = 2  ([4, 3])  ✓
```

Each element enters once (at `right`) and exits at most once (at `left`) → **O(n)** total.

### 5. What problem does this pattern solve?

- **Shortest** subarray with sum ≥ target
- **Longest** substring without repeating characters
- **Longest** subarray with at most k distinct elements (or k replacements)
- Any "find optimal contiguous range" where the size isn't given

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Check every subarray [i..j] | O(n²) or O(n³) with sum computation |
| Restart from scratch after each invalid window | Wastes work — `left` should only move forward |
| Binary search on answer without two pointers | Misses the O(n) two-pointer solution |

### 7. The key observation

`left` never moves backward. When `right` advances, the window only grows or stays; when invalid, `left` catches up. Each index is visited at most twice — once by `right`, once by `left`.

### 8. Pattern signals & recognition clues

| When the problem says… | Think variable sliding window |
|---|---|
| "shortest subarray with sum ≥ k" | Expand until valid, shrink while valid, track min |
| "longest substring without repeating" | Expand, shrink when duplicate appears |
| "minimum length" / "maximum length" contiguous | Variable window — size not fixed |
| "at most k distinct" / "at most k replacements" | Budget window — shrink when budget breaks |

**Keywords:** `shortest` · `longest` · `minimum length` · `subarray sum` · `substring` · `without repeating` · `at most k`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Shrinking before expanding | Always add `nums[right]` first, then shrink |
| Moving `left` backward | `left` only increases — never `left--` |
| Wrong shrink condition for min vs max | Min length: shrink **while valid**. Max length: shrink **when invalid**. |
| Updating answer before window is valid | For shortest, only update inside the "still valid" shrink loop |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of positive integers and a target, find the minimal length of a contiguous subarray whose sum is greater than or equal to target."*

Before coding, say:

> *"Positive integers + sum constraint → variable window. Expand right, shrink left while sum ≥ target, track minimum length."*

---

## Part 2 — What's Next

Today you'll combine variable windows with new tools:

1. **Sum constraint** — Minimum Size Subarray Sum (#209)
2. **Hash set + window** — Longest Substring Without Repeating Characters (#3) — your first **pattern combo**

The template stays the same. Only the window state (sum, set, frequency map) changes.

---

*You understand the breathing window. First quest: find the shortest valid subarray. →*
