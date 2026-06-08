# 📝 Multi-Pattern Array Synthesis

> **Day 28** · Pattern Combination · ★★★★★★ · 25 XP · 15 min read

---

Welcome to S-Rank. You have 27 days of patterns — fixed windows, variable windows, prefix sums, monotonic stacks. **None of today's problems introduce a new technique.** They ask whether you can **recognize which two or three patterns stack together** and execute them in one pass.

The unlock is not a new algorithm. It is a **synthesis mindset**: read the problem, name the patterns, assign each one a role, then wire them together.

---

## Part 1 — Learn the Meta-Strategy

### 1. What is pattern synthesis?

**Pattern synthesis** means combining techniques you already know so each handles one sub-problem:

| Role | Who plays it | Example |
|---|---|---|
| **Frame** | Defines the moving range | Fixed window (Day 9), variable window (Day 10) |
| **Index engine** | Maintains candidates in O(1) | Monotonic deque (Day 17) |
| **Aggregate** | Converts range queries to point differences | Prefix sum (Day 5) |
| **Budget** | Tracks validity of the frame | Frequency map, distinct count |

Single-pattern problems map 1:1 to one Day. Synthesis problems map **1:2 or 1:3** — the hard part is the **wiring diagram**, not the code.

```
Synthesis decision tree:

Read problem
    │
    ├─ "contiguous subarray/substring" → window family (Day 9 or 10)
    │
    ├─ "max/min in sliding range" → window + monotonic deque (Day 9 + 17)
    │
    ├─ "sum ≥ k" with negatives allowed → prefix sum + deque (Day 5 + 17)
    │
    └─ "shortest/longest with constraint" → variable window + auxiliary structure
```

### 2. The pattern combination table — today's two archetypes

| Synthesis | Pattern A | Pattern B | Pattern C (optional) | Canonical problem |
|---|---|---|---|---|
| **Window + Deque** | Fixed sliding window (Day 9) | Monotonic deque for range max (Day 17) | — | Sliding Window Maximum (#239) |
| **Prefix + Deque** | Prefix sum array (Day 5) | Monotonic deque of indices (Day 17) | Variable window shrink (Day 10) | Shortest Subarray with Sum ≥ K (#862) |

**Window + Deque:** The window defines *which* elements matter. The deque stores *candidate indices* for the answer inside that window — never rescan the window for max.

**Prefix + Deque:** Prefix sums turn "subarray sum = prefix[j] − prefix[i]" into a point lookup. The deque stores *candidate left indices* with increasing prefix values — never rescan all prior indices.

### 3. ASCII — monotonic deque inside a sliding window

```
nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3

Fixed window slides right ─────────────────────────────────────────►

Step 1: window [1, 3, -1]     indices 0..2
        deque (decreasing values, store INDICES):
        ┌─────────────────────────────┐
        │  front → 1 (val 3) → 2 (-1) │   max = nums[1] = 3
        └─────────────────────────────┘
        (index 0 dropped — value 1 < 3, useless as max)

Step 2: window [3, -1, -3]     indices 1..3
        exit index 0, enter index 3
        pop back while nums[3] ≥ nums[back]  →  pop 2 (-1)
        deque: [1 (val 3)]
        max = 3 ✓

Step 3: window [-1, -3, 5]     indices 2..4
        enter 5 — dominates -1 and -3
        deque: [4 (val 5)]
        max = 5 ✓

Invariant:
  • deque front = index of current window maximum
  • pop front when index leaves window (index ≤ right − k)
  • pop back while new element ≥ back value (useless candidates)
```

The **window** moves the frame. The **deque** is the engine that answers "who is max?" without scanning k elements each step.

### 4. ASCII — prefix sum + monotonic deque

```
nums = [2, -1, 2],  k = 3
prefix = [0, 2, 1, 3]

For each right index j, find smallest i where prefix[j] − prefix[i] ≥ k
Equivalently: prefix[i] ≤ prefix[j] − k

right=2 (prefix[2]=1): need prefix[i] ≤ 1−3 = −2 — none yet
right=3 (prefix[3]=3): need prefix[i] ≤ 0
        deque stores candidate i with INCREASING prefix[i]

        deque of indices:  [0, 1, 2]
        prefix values:     [0, 2, 1]  ← NOT increasing! pop back 1 (prefix 2 > 1)
        check front: prefix[3] − prefix[0] = 3 ≥ 3 ✓  length = 3 − 0 = 3

Deque maintains increasing prefix values → front is best (smallest) left index
Variable window shrink: pop front while sum ≥ k → shortest subarray
```

Three patterns, three roles:
- **Prefix sum (Day 5):** O(1) subarray sum via difference
- **Monotonic deque (Day 17):** O(1) amortized candidate left indices
- **Variable window (Day 10):** shrink from front while valid → minimize length

### 5. Cross-rank bridges

**D-Rank Day 9 — Fixed Sliding Window** gave you enter/exit mechanics and fixed-size frames. Day 28's first quest (#239) keeps the frame size constant — only the *question inside the frame* changes from "sum" to "maximum."

**D-Rank Day 10 — Variable Sliding Window** gave you expand/shrink for shortest valid subarray. Day 28's second quest (#862) shrinks the left boundary once sum ≥ k — but finds that sum via prefix differences, not a running total (negatives break monotonic sum).

**B-Rank Day 17 — Monotonic Stack/Deque** gave you decreasing/increasing order maintenance. In synthesis, the deque is **embedded inside** another pattern — not standalone next-greater, but *range max* or *best left index*.

**E-Rank Day 5 — Prefix Sum** gave you `prefix[j] − prefix[i]` for range sums. Combined with deque, it converts "find i such that sum(i+1..j) ≥ k" into "find smallest prefix[i] in a monotone queue."

```
Rank journey for #239 (Sliding Window Maximum):

Day 9:   "Slide a fixed window, update a running sum"     → frame mechanics
Day 17:  "Maintain decreasing candidates in a deque"       → max without rescan
Day 28:  "Put the deque INSIDE the sliding window"          → synthesis

Rank journey for #862 (Shortest Subarray Sum ≥ K):

Day 5:   "Prefix[j] − prefix[i] = subarray sum"            → sum as difference
Day 10:  "Shrink left while valid, track minimum length"   → shortest window
Day 17:  "Deque of indices with increasing prefix values"  → best i in O(1)
Day 28:  "All three roles in one scan"                       → synthesis
```

### 6. The synthesis checklist — before you code

For every S-Rank array problem, run this aloud:

```
1. What is the FRAME?        → fixed k, variable valid/invalid, or implicit range
2. What is the QUERY?        → max, min, sum ≥ k, count, shortest length
3. What STRUCTURE helps?     → deque, prefix array, freq map, two pointers
4. Who EVICTS whom?          → window evicts old index; deque evicts useless candidates
5. Brute force cost?         → O(n×k) or O(n²) — synthesis target is O(n)
```

### 7. Why brute force fails on synthesis problems

| Brute force | Why synthesis wins |
|---|---|
| Rescan each window for max | O(n×k) — deque gives O(1) max per step |
| Check every subarray sum | O(n²) — prefix + deque finds best left in O(1) amortized |
| Separate passes for each pattern | Correct but slow — one synchronized scan is O(n) |
| Running sum with negative nums | Breaks monotonic shrink — prefix sums fix this |

### 8. Pattern signals — combination recognition

| When the problem says… | Combine… |
|---|---|
| "maximum in each sliding window of size k" | Fixed window (Day 9) + decreasing deque (Day 17) |
| "shortest subarray with sum at least k" (negatives OK) | Prefix sum (Day 5) + increasing deque (Day 17) + shrink (Day 10) |
| "subarray sum equals k" (any signs) | Prefix sum + hash map — **not** deque (Day 5 alone) |
| "max in range" without sliding | Sparse table / segment tree — deque needs sequential scan |
| "longest subarray with abs diff ≤ limit" | Fixed window on sorted window + deque (checkpoint) |

**Keywords:** `sliding window maximum` · `sum at least k` · `shortest subarray` · `monotonic deque` · `prefix sum` · `combine` · `negative numbers`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Storing values in deque instead of indices | Store indices — detect window boundary and compare nums[i] |
| Forgetting to pop front when index leaves window | Pop while `deque.front() ≤ right − k` (fixed) or while sum ≥ k (variable) |
| Using running sum for #862 with negatives | Prefix difference — running sum shrink fails with negatives |
| Deque order wrong for max vs min | Max → decreasing deque; min left prefix → increasing deque |
| Treating synthesis as "new pattern" | Name each role from an existing Day — wiring is the only new skill |

### 10. Recognition drill

Read this problem aloud:

> *"You are given an integer array and an integer k. There is a sliding window of size k moving from left to right. Return the maximum value in each window position."*

Before coding, say:

> *"Fixed window (Day 9) slides the frame. Decreasing monotonic deque (Day 17) tracks max inside the frame. Pop front when index leaves window; pop back when new element dominates. O(n)."*

---

## Part 2 — What's Next

Today you'll synthesize patterns on two Hard classics:

1. **Window + Deque** — Sliding Window Maximum (#239): fixed frame, deque engine
2. **Prefix + Deque + Shrink** — Shortest Subarray with Sum at Least K (#862): three-pattern stack

The checkpoint combines deque + sorted multiset for absolute difference limits.

---

*You know the wiring diagram. First quest: max in every sliding window. →*
