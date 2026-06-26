<!-- hand-authored -->
# 📝 The DP Framework

> **Day 4** · The DP Framework · 10 XP · 10 min read

---

You know overlap (Day 1), memo (Day 2), and tabulation (Day 3). Day 4 gives you a **checklist** so every new problem starts the same way: define state, write transition, set bases, pick fill order, extract answer — then optimize space. Pascal's Triangle II is the lab: same recurrence as Day 3, but only **one rolling row** instead of the full triangle.

> **Preview contrast (Day 3 vs Day 4):** Day 3 = fill the whole 2D triangle. Day 4 = *"Do I need all rows?"* → update one row right-to-left.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**State Definition & Recurrence Design** — a repeatable checklist before any code.

```
□ 1. STATE     — "dp[i] / dp[i][j] is ___"  (one sentence)
□ 2. CHOICES   — what moves at each state?
□ 3. TRANSITION — formula from prior state(s)
□ 4. BASE CASE — smallest states, numeric values
□ 5. FILL ORDER — direction that respects dependencies
□ 6. ANSWER    — which cell / max / min to return
□ 7. SPACE     — full table or rolling row/vars?
```

Miss step 1 and everything else wobbles. Day 4 quests reward completing all seven.

### 2. Simple explanation

Interview DP is not "memorize 50 problems." It's **fill in the checklist** in under two minutes. Generated Array #1646 looks weird until you write: *"nums[i] = value at index i in generated sequence"* and read the parity rules as transitions.

Space optimization is step 7, not step 1 — get correctness on the full table mental model first.

### 3. Visual — State-design checklist in action

```
Problem: Pascal's Triangle II — return row k only

□ STATE:     row[j] = j-th coefficient in row k
□ CHOICES:   built from two above (conceptually)
□ TRANSITION: row[j] += row[j-1]  (after init row=1s)
□ BASE:      row = [1,1,...,1] length k+1
□ FILL ORDER: process row index i=2..k; update j RIGHT-TO-LEFT
□ ANSWER:    row after k iterations
□ SPACE:     O(k) one row — not O(k²) full triangle ✓
```

### 4. Visual — 1-row rolling Pascal (right-to-left)

```
Want row 4: [1, 4, 6, 4, 1]

Start: [1, 1, 1, 1, 1]

Build row 2 from row 1 logic on one array:
i=2: j=1: row[1]+=row[0] → [1,2,1,1,1]
     j=2: row[2]+=row[1] → [1,2,3,1,1]  ... continue pattern

Key: j goes RIGHT-TO-LEFT so row[j-1] isn't overwritten early

After processing i=k:
  row = [1, 4, 6, 4, 1] ✓

Day 3 stored all rows; Day 4 keeps one row alive.
```

### 5. The universal checklist (copy to scratch paper)

| Step | Question | Bad answer example |
|---|---|---|
| State | What does dp represent? | "dp[i] = something" (vague) |
| Choices | What can I do at i? | Skipping — leads to wrong transition |
| Transition | Formula? | Copying wrong problem's formula |
| Base | dp[0]=? | Empty table |
| Order | Which direction? | Left-to-right when need right-to-left |
| Answer | Return what? | dp[n-1] when answer is max(dp) |
| Space | Need full table? | Always O(n²) when O(n) suffices |

### 6. Formula-driven tabulation (Generated Array preview)

Some problems **give you the recurrence in the statement**:

```
nums[0]=0, nums[1]=1
if i even:  nums[i] = nums[i/2]
if i odd:   nums[i] = nums[i/2] + nums[i/2+1]
answer: max(nums)
```

Checklist still applies — state is `nums[i]`, fill i=2..n left-to-right.

### 7. When to roll vs keep full table

| Keep full table | Roll to one row / few vars |
|---|---|
| Need random access to old rows | Only need latest row (Pascal II) |
| 2D where row i needs several prior rows | Transition uses only previous row |
| Debugging — visualize | Production / follow-up "optimize space" |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "return row index k" | Space-opt Pascal — one row |
| "generated array" / explicit formula | Formula-driven tabulation |
| "optimize space" / follow-up | Checklist step 7 |
| "maximum of generated values" | Tabulate + track running max |

**Keywords:** `state definition` · `fill order` · `right-to-left` · `rolling array` · `answer extraction`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Skipping state sentence | Write it before transition |
| Left-to-right on in-place Pascal row | **Right-to-left** inner loop |
| Wrong answer cell | Re-read: max? last? dp[n]? |
| Optimizing before correct full-table logic | Full table on paper first |
| Mixing up row index vs numRows | Off-by-one on triangle |

### 10. Recognition drill

Read this problem aloud:

> *"Given an integer rowIndex, return the rowIndex-th row of Pascal's triangle."*

Before coding, say:

> *"Checklist: state=row[j] coefficient; transition=sum two above via in-place add; fill i=2..rowIndex, j right-to-left; base=all 1s; answer=row; space=O(rowIndex)."*

---

*Checklist loaded. First quest: formula-driven tabulation on a generated array. →*
