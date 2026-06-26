# 📝 The Array Mental Model

> **Day 1** · Array Traversal · 8 min read

---

Your mission today: understand how arrays work, then learn your first core pattern — the **read-write pointer** — for in-place array problems.

---

## Part 1 — Array Foundations

### Arrays = Contiguous Memory

An array stores elements in adjacent memory slots:

```
Memory Address:  [100] [104] [108] [112] [116] [120]
Array Elements:  [ 3 ] [ 7 ] [ 1 ] [ 9 ] [ 4 ] [ 2 ]
Index:             0     1     2     3     4     5
```

When you access `arr[3]`, the CPU jumps there instantly — **O(1) random access**. That is why pointer-based patterns work: you can read and write any index without scanning from the start.

### Choosing Your Traversal Direction

Most beginners always go left to right. The direction should match the problem:

**Forward** (left → right) — build results in order:
```
Index:  0 → 1 → 2 → 3 → 4
        ──────────────────→
```

**Backward** (right → left) — modify without overwriting data you still need:
```
Index:  4 → 3 → 2 → 1 → 0
        ←──────────────────
```

**Bidirectional** (two pointers from both ends) — compare or swap from outside in:
```
Index:  0 →             ← 4
        L               R
```

> ⚡ **Rule of thumb:** If writing at index `i` would destroy data that index `j > i` still needs, go backward.

---

## Part 2 — The Read-Write Pointer Pattern

### 1. What is the pattern?

Two indices moving through the same array:

- **Read pointer** — visits every element (the scanner)
- **Write pointer** — marks where the next "kept" element should go (the builder)

The read pointer looks at each value. The write pointer only moves forward when you decide to **keep** something.

### 2. Simple explanation

Imagine sorting mail into "keep" and "discard" piles — but you must do it **inside one box**, in order, without a second box.

You scan each letter (read). When you want to keep one, you place it at the next open spot at the front (write). Everything you skip naturally gets pushed toward the back.

### 3. Small visual example

Move all zeros to the end while keeping `[1, 3, 12]` in order:

```
Start:  [0, 1, 0, 3, 12]
         w,r

Read 0 → skip (zero)
Read 1 → keep → write to w, w moves
        [1, 1, 0, 3, 12]
            w  r

Read 0 → skip
Read 3 → keep → write to w
        [1, 3, 0, 3, 12]
               w     r

Read 12 → keep → write to w
        [1, 3, 12, 3, 12]
                  w        r

Zeros fill the tail → [1, 3, 12, 0, 0] ✓
```

### 4. How the pattern works

```
for each element at read:
    if element should be KEPT:
        copy/swap to write position
        advance write
    advance read
```

One forward pass. The write pointer always counts how many elements you've kept so far.

### 5. What problem does this pattern solve?

Any task where you must **filter, move, or rearrange** elements **inside the original array** while **preserving the order** of kept elements:

- Move zeros to the end
- Remove a target value
- Remove duplicates from a sorted array

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Copy kept elements to a new array | Violates "in-place" / O(1) extra space |
| Nested loops bubbling each zero | O(n²) — re-scans after every move |
| Sort the array | Breaks relative order of non-target elements |

### 7. The key observation

You never need to track *where each discarded element goes*. You only need to know **where the next kept element belongs**. Discarded elements naturally accumulate after the write boundary.

### 8. Pattern signals & recognition clues

| When the problem says… | Think read-write pointer |
|---|---|
| "in-place" / "without extra space" | No second array allowed |
| "remove" / "filter" / "move to end" | Keep some, skip others |
| "maintain relative order" | Forward single pass |
| "sorted" + "remove duplicates" | Keep when value changes from previous kept |

**Keywords:** `in-place` · `filter` · `move to end` · `remove elements` · `return new length`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Building a new array | Use two pointers in the original |
| Returning `write` instead of `write + 1` for length | Write is 0-indexed; length is one more |
| Modifying while iterating without a write pointer | You'll skip elements — always separate read and write |
| Using backward traversal when order must be preserved | Forward read-write keeps order |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array, move all 0s to the end in-place. Keep the order of non-zero elements."*

Before coding, say:

> *"In-place filter, order matters → read-write pointer, forward pass."*

---

*You understand the pattern. Your first quest puts it into practice. →*
