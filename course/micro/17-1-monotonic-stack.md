# 📝 Monotonic Stack

> **Day 17** · Monotonic Stack Fundamentals · ★★★★☆ · 25 XP · 15 min read

---

Welcome to B-Rank. On C-Rank Day 16 you made **greedy local choices** — move the shorter line, abandon a doomed gas-station start, track the farthest reachable index. Today you add a structure that encodes the same instinct: a **stack that only grows in one direction**, discarding elements that can never matter again.

The monotonic stack answers the question every array problem secretly asks: *"For this element, what is the nearest useful neighbor to my left or right?"*

---

## Part 1 — Learn the Pattern

### 1. What is a monotonic stack?

A **monotonic stack** maintains elements in strictly increasing or strictly decreasing order. When a new element violates the order, you **pop** until the invariant is restored — and each pop often **resolves an answer** for the popped index.

```
Monotonic stack template (decreasing — "next greater"):

stack = empty (stores INDICES, not values)
for i in 0..n-1:
    while stack not empty AND nums[i] > nums[stack.top()]:
        j = stack.pop()
        answer[j] = i - j          // j found its next greater at i
    stack.push(i)
```

Two variants:

| Stack order | Stores | Finds |
|---|---|---|
| **Decreasing** (top is smallest) | Indices of "unresolved" elements waiting for a greater neighbor | Next Greater Element to the **right** |
| **Increasing** (top is largest) | Indices waiting for a smaller neighbor | Next Smaller Element to the **right** |

The stack is a **waiting room** — elements sit until a newcomer proves they can't be the answer for anyone still waiting.

### 2. Stack state evolution — next greater to the right

```
nums = [73, 74, 71, 69, 72, 76, 73]

Goal: for each index, how many days until a warmer temperature?

i=0 (73): stack=[0]                    waiting: [73]
i=1 (74): 74 > 73 → pop 0, ans[0]=1   stack=[1]     73 resolved ✓
i=2 (71): 71 < 74 → push              stack=[1,2]   waiting: [74,71]
i=3 (69): 69 < 71 → push              stack=[1,2,3] waiting: [74,71,69]
i=4 (72): 72 > 69 → pop 3, ans[3]=1
          72 > 71 → pop 2, ans[2]=1   stack=[1,4]   69,71 resolved ✓
i=5 (76): 76 > 72 → pop 4, ans[4]=1
          76 > 74 → pop 1, ans[1]=4   stack=[5]     72,74 resolved ✓
i=6 (73): 73 < 76 → push              stack=[5,6]

End: indices still on stack have no warmer day → ans = 0

Result: [1, 4, 1, 1, 1, 0, 0] ✓
```

Each element is **pushed once** and **popped at most once** → O(n) total.

### 3. Cross-rank bridge — C-Rank Day 16 greedy

**C-Rank Day 16 — Greedy on Arrays** taught you to discard doomed choices without reconsidering them:

| Day 16 Greedy | Monotonic Stack |
|---|---|
| Jump Game: if `i > farthest`, stuck — prior positions can't help | Stack: if `nums[i]` is greater than `stack.top()`, the top can never be "next greater" for anyone to its right — pop it |
| Gas Station: if tank < 0 at `i`, restart at `i+1` — starts in `[s..i)` were doomed | Pop resolves the answer; no backtracking to re-check popped indices |
| Container With Most Water: move shorter line — keeping it while width shrinks can't win | Pop shorter/unusable bars — they can't bound a better rectangle to the right |

Both patterns share one rule: **once an option is provably dead, abandon it immediately.**

```
Greedy:     "This start / pointer / frontier can't win → discard, move on."
Monotonic:  "This index can't be next-greater for anyone still waiting → pop, record answer."
```

Day 16's farthest-reachable tracks a **monotonic frontier** (only moves forward). The monotonic stack tracks a **monotonic sequence of candidate indices** — same forward-only commitment, different data structure.

**D-Rank Day 6 — Converging Two Pointers** also pruned search space with a move rule. The monotonic stack is the array-scan equivalent: instead of two boundaries meeting in the middle, one pass from left to right resolves all "nearest greater" relationships.

### 4. Decreasing vs increasing — which stack when?

| Problem asks for… | Stack type | Pop when |
|---|---|---|
| Next **greater** to the right | Decreasing (values descend toward top) | `nums[i] > nums[stack.top()]` |
| Next **smaller** to the right | Increasing (values ascend toward top) | `nums[i] < nums[stack.top()]` |
| Previous greater to the left | Decreasing, scan left→right, answer on push | Pop smaller elements before pushing `i` |
| Daily temperatures / days until warmer | Decreasing | Current temp beats stack top → pop and record distance |

**Store indices, not values.** You need the index for distance (`i - j`) and to look up `nums[j]`.

### 5. What problems does this pattern solve?

- **Next greater element** — nearest larger value to the right (#496, #503)
- **Daily temperatures** — days until warmer (#739)
- **Stock span** — consecutive days price was ≤ today's (#901)
- **Largest rectangle in histogram** — width bounded by next smaller on each side (#84, Day 18)
- **Trapping rain water** — layer-by-layer fill between bars (#42, Day 18)

All share: *"For each position, find the nearest index where a comparison flips."*

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| For each `i`, scan right until `nums[j] > nums[i]` | O(n²) — monotonic stack is O(n) |
| For each `i`, scan left and right for rectangle bounds | O(n²) per bar — two-pass stack resolves both boundaries |
| Nested loops for "next greater" on every element | Each element enters and exits the stack once — amortized O(1) per index |
| Re-sorting or re-scanning after each pop | Stack already maintains sorted order — pop restores invariant in one pass |

### 7. The key observation

When `nums[i]` arrives, every index still on the stack has **no greater element between itself and `i`** — otherwise it would have been popped already. So if `nums[i]` is greater than `nums[stack.top()]`, then **`i` is the next greater element** for that top index.

```
Stack invariant (decreasing):
  nums[stack[0]] > nums[stack[1]] > ... > nums[stack[k]]
  (values increase toward the top — top is the "weakest" waiting candidate)

When nums[i] breaks the top:
  → top's next greater is i
  → pop top, repeat until stack is empty or order restored
```

Unpopped indices at the end have **no** next greater — leave answer as 0 or -1.

### 8. Pattern signals & recognition clues

| When the problem says… | Think monotonic stack |
|---|---|
| "next greater" / "next smaller" / "nearest larger to the right" | Decreasing or increasing stack |
| "number of days until a warmer temperature" | Next greater + distance = `i - j` |
| "how far back can this value extend as minimum/maximum" | Previous greater/smaller via stack |
| "for each element, find boundary where bars are shorter" | Histogram rectangle (Day 18) |
| "contiguous subarray" + "first element that breaks condition" | Stack encodes the break point |

**Keywords:** `next greater` · `next smaller` · `nearest` · `days until` · `warmer` · `span` · `histogram` · `boundary`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Storing values instead of indices | Push `i`, not `nums[i]` — you need index for distance and lookups |
| Wrong stack order (increasing vs decreasing) | Next **greater** → decreasing stack; next **smaller** → increasing |
| Forgetting unpopped indices at end | After the loop, remaining stack entries have no answer — set to 0 or -1 |
| Popping before recording answer | On pop, assign `answer[j]` **before** losing `j` |
| Using a stack for unsorted pair search | Two Sum on unsorted data → hash map. Stack is for **order-relative** neighbors |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of daily temperatures, return an array where answer[i] is the number of days you have to wait after day i for a warmer temperature. If there is no future day with a warmer temperature, answer[i] = 0."*

Before coding, say:

> *"Warmer = next greater to the right. Decreasing monotonic stack of indices. Pop when current temp beats stack top; distance = i − popped index. O(n)."*

---

## Part 2 — What's Next

Today you'll apply the monotonic stack to two classic forms:

1. **Linear next greater** — Daily Temperatures (#739): distance as the answer
2. **Circular next greater** — Next Greater Element II (#503): wrap the array

The stack template doesn't change. The second quest adds a circular scan.

---

*You understand the waiting-room stack. First quest: count days until warmth. →*
