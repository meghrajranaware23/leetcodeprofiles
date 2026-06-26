# 📝 Kadane's Algorithm

> **Day 12** · Kadane's Algorithm · 15 XP · 12 min read

---

Day 5 taught you prefix sums: precompute once, query any range in O(1). Kadane's asks a different question — *"What is the maximum sum of any contiguous subarray?"* — and answers it in **one pass** with a single running decision: **extend or restart**.

No prefix array needed. Just one variable tracking the best sum ending at each position.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Kadane's algorithm** finds the maximum sum subarray by walking left to right, maintaining:

```
currentSum = best sum of any subarray ENDING at the current index
globalMax  = best sum seen anywhere so far
```

At each element, one decision:

```
currentSum = max(nums[i], currentSum + nums[i])
globalMax  = max(globalMax, currentSum)
```

Either **extend** the previous subarray (add `nums[i]`) or **restart** fresh at `nums[i]`.

```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

 i=0  num=-2   extend or restart? → restart at -2     currentSum=-2  globalMax=-2
 i=1  num= 1   extend (-2+1=-1) or restart (1)? → 1   currentSum= 1  globalMax= 1
 i=2  num=-3   extend (1-3=-2) or restart (-3)? → -2   currentSum=-2  globalMax= 1
 i=3  num= 4   extend (-2+4=2) or restart (4)? → 4     currentSum= 4  globalMax= 4
 i=4  num=-1   extend (4-1=3) or restart (-1)? → 3     currentSum= 3  globalMax= 4
 i=5  num= 2   extend (3+2=5) or restart (2)? → 5     currentSum= 5  globalMax= 5
 i=6  num= 1   extend (5+1=6) or restart (1)? → 6     currentSum= 6  globalMax= 6  ← answer subarray [4,-1,2,1]
 i=7  num=-5   extend (6-5=1) or restart (-5)? → 1     currentSum= 1  globalMax= 6
 i=8  num= 4   extend (1+4=5) or restart (4)? → 5     currentSum= 5  globalMax= 6

globalMax = 6 ✓
```

### 2. Extend or restart — the core decision

Think of `currentSum` as a subarray that **must end at index i**. Two choices:

| Choice | Meaning | When it wins |
|---|---|---|
| **Extend** | `currentSum + nums[i]` | Previous subarray is worth carrying forward |
| **Restart** | `nums[i]` | Previous subarray is a liability — start fresh |

```
nums = [1, -5, 4, 3]

At index 2 (value 4):
  extend:  currentSum was -4,  -4 + 4 = 0
  restart: start at 4
  → restart wins (4 > 0)

At index 3 (value 3):
  extend:  4 + 3 = 7
  restart: 3
  → extend wins (7 > 3)
```

The subarray `[4, 3]` with sum 7 is the answer — the `-5` poisoned the earlier run, so Kadane's correctly restarted at `4`.

### 3. Bridge from Day 5 — Prefix Sums

Day 5 answered: *"What is the sum from index L to R?"* with `prefix[R+1] - prefix[L]`.

Kadane's answers: *"Which L and R maximize that sum?"* without building a prefix array:

| Day 5 — Prefix Sums | Day 12 — Kadane's |
|---|---|
| Precompute cumulative totals | Single pass, no extra array |
| Query any range sum in O(1) | Find optimal range in O(n) |
| Works with negatives | Works with negatives |
| "Sum from L to R" | "Best sum for some L..R" |

**Connection:** The max subarray ending at `i` equals `max(nums[i], prefix[i+1] - prefix[L])` for some L — Kadane's collapses that search into one recurrence.

When you need **many range-sum queries** on a static array → prefix sums. When you need the **single best contiguous subarray** → Kadane's.

Day 9 noted that variable sliding windows fail for max subarray with negatives — that's Kadane's territory.

### 4. Small visual example — all negative except one

```
nums = [-2, -3, -1, -5, -4]

Every element is negative. Best subarray = single largest element.

 i=0  num=-2   currentSum=-2  globalMax=-2
 i=1  num=-3   extend (-5) or restart (-3)? → -3   globalMax=-2
 i=2  num=-1   extend (-4) or restart (-1)? → -1   globalMax=-1  ← answer
 i=3  num=-5   extend (-6) or restart (-5)? → -5   globalMax=-1
 i=4  num=-4   extend (-9) or restart (-4)? → -4   globalMax=-1

Answer: -1 (subarray [-1]) ✓
```

When all values are negative, Kadane's correctly picks the **least negative single element** — never an empty subarray.

### 5. What problem does this pattern solve?

- **Maximum subarray sum** — classic Kadane's (#53)
- **Maximum product subarray** — extend/restart with min AND max tracking (#152)
- **Maximum circular subarray** — Kadane's + total sum trick (#918)
- **Best time to buy and sell stock** — running min + max profit (variant)
- Any "optimal contiguous segment" where local extend/restart decisions compose globally

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Check every subarray [i..j], sum each | O(n²) or O(n³) |
| Prefix sum + nested loops over L, R | O(n²) — Kadane's is O(n) |
| Sliding window for max sum with negatives | Window sum isn't monotonic — two pointers fail |
| Greedy: always extend, never restart | Carries poisoned sums — wrong answer |

**Example where sliding window fails:**

```
nums = [5, -10, 5]
Sliding window can't "skip" the -10 without restarting.
Kadane's: extend to 5, restart at -10, extend to 5 → max = 5 ✓
```

### 7. The key observation

**Optimal substructure:** The best subarray ending at index `i` depends only on the best subarray ending at `i-1` and `nums[i]`. No need to remember where the subarray started — only its sum.

```
currentSum(i) = max(nums[i], currentSum(i-1) + nums[i])
```

If `currentSum(i-1) < 0`, extending adds a negative anchor — restart is always better. If `currentSum(i-1) ≥ 0`, extending is at least as good as restarting.

One pass. O(n) time. O(1) space.

### 8. Pattern signals & recognition clues

| When the problem says… | Think Kadane's |
|---|---|
| "maximum subarray sum" / "maximum sum contiguous" | Classic extend/restart |
| "maximum product subarray" | Kadane's with min AND max (sign flips) |
| "best contiguous segment" with negatives allowed | Not sliding window — Kadane's |
| "array contains negative numbers" + max subarray | Confirms Kadane's, not two-pointer window |
| "circular array" max subarray | Kadane's + wrap-around trick |

**Keywords:** `maximum subarray` · `contiguous` · `sum` · `product` · `negative numbers allowed` · `best segment`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Initializing `globalMax = 0` when all negatives exist | Use `nums[0]` or `-∞` — answer may be negative |
| Using sliding window for max sum with negatives | Window sum isn't monotonic — use Kadane's |
| Only tracking max, not min (product variant) | Negative × negative = positive — track both |
| Returning empty subarray for all-negative arrays | Kadane's returns the single largest element |
| Confusing with prefix sums | Prefix = query any range. Kadane = find best range. |

### 10. Recognition drill

Read this problem aloud:

> *"Given an integer array, find the contiguous subarray with the largest sum and return its sum."*

Before coding, say:

> *"Maximum subarray sum with negatives → Kadane's. One pass: extend if currentSum ≥ 0, else restart. Track globalMax."*

---

## Part 2 — What's Next

Today you'll apply extend-or-restart to two Medium classics:

1. **Maximum Subarray** (#53) — pure Kadane's
2. **Maximum Product Subarray** (#152) — Kadane's with min/max tracking for sign flips

The decision stays the same. The state variable grows when products can flip signs.

---

*You understand extend or restart. First quest: maximum subarray sum. →*
