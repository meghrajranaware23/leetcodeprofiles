# 📝 The Prefix Sum Pattern

> **Day 5** · Prefix Sums · ★★☆☆☆ · 5 min read

---

Every time you find yourself summing a subarray inside a loop — stop. You're doing redundant work. Prefix sums exist to eliminate exactly this waste.

## Building a Prefix Sum Array

Precompute cumulative sums so any range query becomes a single subtraction:

```
nums:     [ 2,  4,  1,  3,  5 ]
index:      0   1   2   3   4

prefix[0] = 0
prefix[1] = 0 + 2  = 2
prefix[2] = 2 + 4  = 6
prefix[3] = 6 + 1  = 7
prefix[4] = 7 + 3  = 10
prefix[5] = 10 + 5 = 15

prefix:   [ 0,  2,  6,  7, 10, 15 ]
```

> 💡 **Key Insight:** `prefix` has length `n + 1`, and `prefix[0] = 0` always. This extra zero isn't a quirk — it eliminates edge cases.

## The Range Sum Formula

**Sum from index L to R (inclusive):**

```
sum(L, R) = prefix[R + 1] - prefix[L]
```

```
sum(1, 3) = prefix[4] - prefix[1] = 10 - 2 = 8
Verify:    nums[1] + nums[2] + nums[3] = 4 + 1 + 3 = 8  ✓
```

O(n) to build, **O(1) per query** after that.

## Beyond Basic Prefix Sums

Prefix sums can also find **balance points** — positions where the left half and right half have equal sums. You'll practice this in the next quest.

In D-Rank, you'll learn how to combine prefix sums with hash maps to solve more advanced subarray problems in O(n). For now, focus on mastering the basics: building the prefix array, the range sum formula, and understanding how precomputation trades space for speed.

> ⚡ **Pattern Signal:** "subarray sum", "range query", "cumulative", "running total", "left vs right sum" → prefix sums.

---

*Time to put this to work. Your first quest handles range queries. →*
