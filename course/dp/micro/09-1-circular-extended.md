<!-- hand-authored -->
# 📝 Circular & Extended Decisions

> **Day 9** · Circular & Extended Decisions · ★★★☆☆ · 15 XP · 15 min read

---

Day 6's take/skip assumed a **line with endpoints**. Today the line **wraps** — first and last houses are neighbors. You can't run one pass; you **split the circle into two linear problems**. The second quest keeps a line but **negative numbers flip the story** — track **both** max and min product at every index.

> **Preview contrast (Day 6 vs Day 9):** Day 6 = one linear `max(skip, take)`. Day 9a = **two rob passes** (exclude first OR exclude last). Day 9b = **two rolling values** `(maxProd, minProd)` — not take/skip at all.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Variant Decision DP** — same recurrence as an earlier day, but the **constraint changes** (circle, sign) so you extend the state or run multiple passes.

**Branch A — Circular constraint (House Robber II):**
- Circle = first and last **both** can't be taken if adjacent rule applies
- **Two-pass reduction:** `max( rob(0..n-2), rob(1..n-1) )`
- Each pass is Day 6 take/skip unchanged

**Branch B — Dual-state tracking (Maximum Product Subarray):**
- Negative × negative → positive product surprise
- **`maxProd[i]`** = best product ending at `i`
- **`minProd[i]`** = worst (most negative) product ending at `i`
- At each step: extend or restart; **swap max/min before multiply** when `nums[i] < 0`

### 2. Simple explanation

**Circle:** If you rob house 0, you can't rob house n−1. So either the optimal set includes house 0 and excludes n−1, or excludes 0 and maybe includes n−1. Run the street robber twice on those two ranges and take the better total.

**Product:** A huge negative product ending at `i-1` becomes a huge **positive** after multiplying a negative `nums[i]`. If you only track max, you miss this. Keep the min product too — it's tomorrow's comeback.

### 3. Visual — circular two-pass

```
Circle:  [2] — [3] — [2]
          ↑               ↑
       house 0         house n-1  (neighbors!)

Pass 1: rob houses 0 .. n-2   (forbid last)
Pass 2: rob houses 1 .. n-1   (forbid first)

Answer: max(pass1, pass2)

Example [2,3,2]: pass1 on [2,3]=5, pass2 on [3,2]=5 → 5
Example [1,2,3,1]: pass1 on [1,2,3]=4, pass2 on [2,3,1]=4 → 4
Single house: just return nums[0]
```

### 4. Visual — (maxProd, minProd) dual arrays

```
nums:  [2, 3, -2, 4]

At each i, track best AND worst product ENDING here:

  i=0: maxP=2,  minP=2
  i=1: max(3, 2*3)=6,  min(3, 2*3)=6
  i=2: max(-2, 6*(-2))=6→-2? 6*(-2)=-12, max(-2,-12)=-2
       min( -2, 6*(-2) ) = -12
       (with swap-on-negative pattern in code)
  i=3: extending from -12 * 4 = -48 vs fresh 4 → maxP=4

Global ans = max over all maxP

Key idea:
  maxP = max(nums[i], maxP*nums[i], minP*nums[i])
  minP = min(nums[i], maxP*nums[i], minP*nums[i])
  (swap maxP/minP when nums[i] < 0 before update — equivalent form)
```

### 5. Templates

**Circular robber:**
```
if n == 1: return nums[0]
return max( robRange(0, n-2), robRange(1, n-1) )

robRange(lo, hi):  // Day 6 inside
    prev2, prev1 = 0, 0
    for i in lo..hi:
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    return prev1
```

**Dual product:**
```
ans = maxP = minP = nums[0]
for i = 1..n-1:
    if nums[i] < 0: swap(maxP, minP)
    maxP = max(nums[i], maxP * nums[i])
    minP = min(nums[i], minP * nums[i])
    ans = max(ans, maxP)
return ans
```

### 6. Day 6 vs Day 9 — side by side

| | **Day 6 Linear** | **Day 9 Circular** | **Day 9 Product** |
|---|---|---|---|
| Constraint | no adjacent on line | no adjacent on **circle** | subarray product |
| State count | 1 scalar (prev1) | 2 linear passes | **2 scalars** max+min |
| Transition | max skip/take | same inside range | max/min extend or reset |
| Trick | prev2/prev1 | split range | swap on negative |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "circular array" / "first and last adjacent" | Two-pass robber |
| "maximum product subarray" | Dual max/min product |
| "linear rob houses" | Day 6 — one pass |
| "all positive nums" | Product = Kadane on logs; dual state optional |
| "circular subarray max sum" | **D-Rank test** — Kadane + total−min (bridge from E5) |

**Keywords:** `two pass` · `robRange` · `maxProd minProd` · `swap on negative` · `circle split`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| One rob pass on circle | Must exclude first **or** last |
| Forgetting `n==1` | Return sole element |
| Product: only track max | Keep **minProd** for sign flip |
| Product: not resetting at nums[i] | `max(nums[i], maxP*nums[i])` — start fresh at i |
| Applying circle split to product | Product is **not** two-pass — dual state instead |

### 9. Recognition drill

Read this problem aloud:

> *"Houses in a circle — max loot without robbing adjacent houses."*

Before coding, say:

> *"Day 9 circular: max( rob(0..n-2), rob(1..n-1) ). Each rob is Day 6. Not one pass."*

Read this one:

> *"Maximum product of any contiguous subarray."*

Before coding, say:

> *"Day 9 dual: track maxP and minP ending at i; swap on negative; ans = max maxP."*

---

*Break the line's assumptions. First quest: the circular street. →*
