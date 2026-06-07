# 📝 The Array Mental Model

> **Day 1** · Array Traversal · ★☆☆☆☆ · 5 min read

---

Your mission: understand *why* arrays work the way they do — and how to choose the right traversal direction for any problem.

## Arrays = Contiguous Memory

An array stores elements in adjacent memory slots. This isn't trivia — it's the reason every pattern in this course works.

```
Memory Address:  [100] [104] [108] [112] [116] [120]
Array Elements:  [ 3 ] [ 7 ] [ 1 ] [ 9 ] [ 4 ] [ 2 ]
Index:             0     1     2     3     4     5
```

When you access `arr[3]`, the CPU calculates the address instantly: `base + (3 × size)`. That's **O(1) random access** — no traversal, no pointer chasing, just math.

> 💡 **Key Insight:** O(1) random access is WHY array patterns like two pointers and binary search work. You can jump to any index for free.

This also means sequential traversal is blazingly fast — when the CPU fetches `arr[0]`, neighboring elements are already in the cache.

---

## Choosing Your Traversal Direction

Most beginners always go left to right. Stronger coders **choose direction based on the problem.**

**Forward** (left → right):
```
Index:  0 → 1 → 2 → 3 → 4
        ──────────────────→
```
Use when building results left-to-right or processing in order.

**Backward** (right → left):
```
Index:  4 → 3 → 2 → 1 → 0
        ←──────────────────
```
Use when modifying elements without overwriting unprocessed data.

**Bidirectional** (two pointers converging):
```
Index:  0 →             ← 4
        L →             ← R
```
Use for palindromes, partitioning, or when both ends interact.

> ⚡ **Rule of Thumb:** If processing element `i` would overwrite data that element `j > i` still needs — iterate backward.

---

## The Read-Write Pointer Pattern

The most powerful in-place technique. Two pointers, one job each:

```
Read pointer (r):   scans every element
Write pointer (w):  marks where the next "kept" element goes

Array:  [0, 1, 0, 3, 12]
         r
         w

r=0: 0 → skip         → w stays at 0
r=1: 1 → write to w   → arr[0]=1, w → 1
r=2: 0 → skip         → w stays at 1
r=3: 3 → write to w   → arr[1]=3, w → 2
r=4: 12 → write to w  → arr[2]=12, w → 3
Fill remaining with 0s

Result: [1, 3, 12, 0, 0]
```

This pattern solves Move Zeroes, Remove Element, Remove Duplicates — and a dozen more.

> 🎯 **Pattern Signal:** When you see "in-place", "without extra space", or "modify the array" → think **read-write pointer**.

---

*Ready to put this into practice? Your first quest awaits. →*
