# 📝 The Fixed Sliding Window

> **Day 9** · Fixed Sliding Window · 10 min read

---

Every subarray of length `k` overlaps with its neighbor by `k - 1` elements. Re-summing from scratch each time is wasteful. A **fixed sliding window** maintains a running aggregate and slides it one position at a time — **enter** the new element, **exit** the old one.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **fixed sliding window** tracks a subarray of exactly size `k`. Instead of recomputing the sum (or count, or max) for every window, you:

1. **Build** the first window (indices `0` to `k-1`)
2. **Slide** one step: add the element entering on the right, subtract the element leaving on the left
3. **Update** your answer at each step

```
nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3

Window 1: [1,  3, -1]  sum = 3
          enter → 5, exit → 1
Window 2: [3, -1, -3]  sum = 3 - 1 + 5 = -1   (not 3 + (-1) + (-3) from scratch)
          enter → 3, exit → 3
Window 3: [-1, -3,  5] sum = -1
```

The window size never changes. Only the endpoints move.

### 2. Enter / Exit mechanics

Think of the window as a frame with two edges:

```
         left                          right
          ↓                              ↓
nums:  [ ·,  ·,  ·,  ·,  ·,  ·,  ·,  · ]
        └──── window size k ────┘

Slide one step right:
  EXIT:  subtract nums[left]   ← element leaving the frame
  ENTER: add nums[right + 1]  ← element joining the frame
  left++, right++
```

**The template:**
```
window_sum = sum of nums[0..k-1]     // build first window
answer = update(window_sum)

for right from k to n-1:
    window_sum += nums[right]      // ENTER
    window_sum -= nums[right - k]  // EXIT (left = right - k)
    answer = update(window_sum)
```

> 💡 **Enter/exit** replaces an inner loop. Each slide is O(1) instead of O(k).

### 3. Bridge to Day 5 — Prefix Sums

You already know: `sum(L, R) = prefix[R+1] - prefix[L]`.

For a fixed window ending at index `right`, the window starts at `left = right - k + 1`:

```
window_sum = prefix[right + 1] - prefix[right - k + 1]
```

Prefix sums answer **any** range in O(1) after O(n) preprocessing. Fixed sliding window answers **every** length-`k` range in O(n) total with O(1) extra space — no prefix array needed.

| Approach | When to use |
|---|---|
| **Prefix sum subtraction** | Few queries on a fixed array, or variable window sizes |
| **Fixed sliding window (enter/exit)** | Scan **every** window of size `k`, track best/average/count |

Both compute the same sums. Sliding window is the streaming version — one pass, constant extra space.

### 4. Small visual example

```
nums = [4, 2, 1, 7, 8],  k = 2
Goal: maximum sum among all length-2 subarrays

Step 0: window [4, 2]     sum = 6   max = 6
Step 1: exit 4, enter 1   sum = 6 - 4 + 1 = 3   max = 6
Step 2: exit 2, enter 7   sum = 3 - 2 + 7 = 8   max = 8  ✓
Step 3: exit 1, enter 8   sum = 8 - 1 + 8 = 15  max = 15 ✓
```

Brute force checks 4 windows × 2 elements = 8 additions. Sliding window: 2 (initial) + 3 slides × 2 ops = 8 ops — same work here, but for `k=1000` and `n=100000`, brute force is O(n·k) while sliding window stays O(n).

### 5. What problem does this pattern solve?

- **Maximum/minimum** sum or average of every `k`-length subarray
- **Count** of elements satisfying a condition in each `k`-window
- **First/last** window where a condition holds (when combined with a check)
- Any problem asking for something about **all contiguous subarrays of length k**

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Nested loops: outer over start, inner over `k` elements | O(n·k) — dies when k is large |
| Recompute sum from `left` to `right` each slide | Redundant — only 2 elements change per step |
| Build full prefix array then query each window | Works, but O(n) space when enter/exit needs O(1) |

### 7. The key observation

Adjacent windows of size `k` share `k - 1` elements. Only **one enters, one exits** per slide. Update the aggregate incrementally — never rescan the whole window.

### 8. Pattern signals & recognition clues

| When the problem says… | Think fixed sliding window |
|---|---|
| "subarray of size k" / "window of length k" | Fixed window — enter/exit |
| "maximum average" / "max sum" of length-k subarray | Running sum + track max |
| "every contiguous subarray of size k" | Slide once, O(n) total |
| "at most k flips" / "k replacements" (with 0/1 arrays) | Count zeros in window, shrink when count > k |

**Keywords:** `size k` · `length k` · `contiguous subarray` · `window` · `maximum average` · `consecutive`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Rebuilding window sum in an inner loop | Use enter/exit: `+= nums[right]`, `-= nums[left]` |
| Off-by-one on window boundaries | First window ends at index `k-1`; loop `right` from `k` to `n-1` |
| Forgetting to initialize from first window | Build `sum(nums[0..k-1])` before the slide loop |
| Using sliding window with negative numbers for "max sum subarray" | Variable-length max subarray → Kadane's (C-Rank). Fixed k with negatives is fine. |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array and an integer k, find the contiguous subarray of length k with the largest average."*

Before coding, say:

> *"Fixed size k, scan every window → build first window, then enter/exit slide. Track max sum (divide by k at the end)."*

---

## Part 2 — What's Next

In D-Rank Day 10 you'll meet the **variable** sliding window — where the size grows and shrinks. For now, master three things:

1. **Enter/exit** — add right, subtract left, never rescan
2. **Build first** — initialize the window before sliding
3. **Prefix sum connection** — same math, different packaging; sliding window streams it in O(1) space

---

*You understand the frame. Your first quest finds the best average. →*
