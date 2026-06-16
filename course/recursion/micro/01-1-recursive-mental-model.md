<!-- hand-authored -->
# 📝 The Recursive Mental Model

> **Day 1** · Call Stack & Base Cases · ★☆☆☆☆ · 10 XP · 10 min read

---

Your mission today: **see recursion as a call stack** before you touch any code. Every quest shrinks the problem, hits a base case, then unwinds. Trace frames on paper first — the code is just the trace in syntax.

---

## Part 1 — The Call Stack

### 1. What is recursion?

A function that **calls itself** on a **smaller version** of the same problem.

Three pieces appear in every correct recursive solution:

- **Base case** — smallest input you can answer directly (stops the calls)
- **Recursive case** — one step of work + a call on smaller input
- **Unwind** — when the base case returns, each waiting frame finishes its step

### 2. Simple explanation

You are not solving the whole problem at once. You do **one local step**, then hand the rest to a smaller copy of yourself.

The **call stack** is the waiting line: each frame sits paused until the frame below it returns a value.

```
You:     "I'll swap the outer letters — YOU reverse the middle."
Friend:  "I'll swap the next pair — YOU reverse what's left."
...
Smallest: "Nothing left to reverse." → returns
Friends unwind: each finishes the swap they started
```

### 3. Visual — Reverse String call stack

`reverse("hello")` with indices `l=0, r=4`:

```
CALL STACK (grows downward):

┌──────────────────────┐
│ rev(l=0, r=4)        │  swap s[0]↔s[4]  →  "oellh"
│   waiting for rev(1,3)│
├──────────────────────┤
│ rev(l=1, r=3)        │  swap s[1]↔s[3]  →  "olleh"
│   waiting for rev(2,2)│
├──────────────────────┤
│ rev(l=2, r=2)        │  BASE: l >= r → return (no swap)
└──────────────────────┘

UNWIND: middle done → outer swaps already applied → "olleh" ✓
```

**What shrinks?** The window `(l, r)` — `l` moves right, `r` moves left until they meet.

### 4. Visual — Power of Two: divide by 2

`isPowerOfTwo(16)` — each call checks parity, then recurses on `n / 2`:

```
isPowerOfTwo(16)
  │ 16 % 2 == 0 ✓  →  call isPowerOfTwo(8)
  │
  ├─ isPowerOfTwo(8)
  │    │ 8 % 2 == 0 ✓  →  call isPowerOfTwo(4)
  │    │
  │    ├─ isPowerOfTwo(4)
  │    │    │ 4 % 2 == 0 ✓  →  call isPowerOfTwo(2)
  │    │    │
  │    │    ├─ isPowerOfTwo(2)
  │    │    │    │ 2 % 2 == 0 ✓  →  call isPowerOfTwo(1)
  │    │    │    │
  │    │    │    └─ isPowerOfTwo(1)  →  BASE: n == 1 → return true
  │    │    │         ↑ returns true
  │    │    │    return true
  │    │    │         ↑
  │    │    return true
  │    │         ↑
  │    return true
  │         ↑
  return true  ✓

Contrast: isPowerOfTwo(6)
  6 % 2 == 0 → isPowerOfTwo(3)
  3 % 2 != 0 → return false immediately (no deeper calls)
```

**What shrinks?** `n` is halved each level — O(log n) depth, not O(n).

### 5. The universal template

```
function solve(input):
    if base_case(input):
        return direct_answer          // STOP — pop this frame

    do_one_local_step(input)          // optional: swap, check, etc.
    return solve(smaller_input)       // trust the smaller call
```

Day 1 quests use two flavors:

| Flavor | Shrinks by | Example |
|---|---|---|
| **Two-pointer shrink** | Narrow `(l, r)` inward | Reverse String |
| **Divide shrink** | `n → n / 2` | Power of Two |

### 6. Why "just use a loop" misses the point

| Approach | Problem on today's quests |
|---|---|
| **Manual index juggling without a stack mental model** | Easy to lose track of which swaps happened when |
| **Recursing without a base case** | Infinite calls → stack overflow |
| **Checking every power of 2 up to n** | O(n) — ignores the halving structure |
| **Reversing with extra array** | Works, but misses the in-place recursive shrink pattern |

Recursion forces you to name **what gets smaller** and **where it stops**. That discipline carries into every later pattern in this pack.

### 7. The key observation

**The base case is not an afterthought — define it first.**

- Reverse String: `l >= r` → nothing left to swap
- Power of Two: `n <= 0` → false; `n == 1` → true; odd `n > 1` → false

If you can state the base case in one sentence, the recursive case usually writes itself.

### 8. Pattern signals for Day 1

| When the problem says… | Think… |
|---|---|
| "reverse" / "mirror" / shrink from both ends | Two-pointer recursion — swap, then recurse inward |
| "power of two" / "halve until" / divide by 2 | Recursive reduction — check parity, recurse on `n/2` |
| "smallest input" / "when empty" / "when l meets r" | Base case — return directly |
| "in-place" + structural shrink | Work locally, delegate the middle |

**Keywords:** `base case` · `call stack` · `recurse` · `smaller subproblem` · `return`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| No base case | Write the stopping condition before the recursive call |
| Wrong shrink direction | Reverse String shrinks `(l,r)`; Power of Two shrinks `n` by half |
| Trying to simulate the whole stack in your head | Trace on paper — one frame per line |
| Extra work after base case | Return immediately at base — don't fall through |
| Confusing "void" vs "return value" recursion | Reverse String mutates in place (void); Power of Two returns bool up the stack |

### 10. Recognition drill

Read this problem aloud:

> *"Reverse a character array in-place using recursion."*

Before coding, say:

> *"Base case: l >= r. Local step: swap s[l] and s[r]. Shrink: recurse on (l+1, r-1). Trace the call stack on paper first."*

---

*You understand the call stack. Your first quest puts it into practice. →*
