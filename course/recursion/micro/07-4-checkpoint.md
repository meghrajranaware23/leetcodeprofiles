<!-- hand-authored -->
# ✅ Day 7 Checkpoint

> **Divide and Conquer** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 7 is **split range → solve both halves → combine**. The combine step is problem-specific.

| When you see... | Think... | Why |
|---|---|---|
| "sort array" O(n log n) | Merge sort D&C | Split, sort halves, merge |
| "merge two sorted" | Merge combine step | Two-pointer compare |
| "maximum subarray" + recursion | max(left, right, **cross**) | Optimal may span mid |
| "split at midpoint" | `mid = lo + (hi-lo)/2` | Two disjoint subproblems |
| "combine results" | Merge or max-of-three | Work happens at combine |
| "suffix + prefix" at split | Cross sum helper | Max ending at mid + starting at mid+1 |

### 🧠 Quick Recognition Test

1. *"Sort using merge sort"* → **Split, recurse both, merge** — base `lo>=hi`
2. *"Max sum subarray recursively"* → **Three candidates** — never omit cross
3. *"Count reverse pairs in array"* → **D&C merge** with cross counting in merge
4. *"Binary search on sorted array"* → **Not D&C combine** — single half, no merge

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Find the k-th largest element by recursively partitioning like quickselect."*

Which pattern? **Divide on one half** — not classic merge D&C, but split-at-pivot DNA. One recursive call, not two.

**Scenario 2:** *"Maximum product subarray — find contiguous subarray with largest product."*

Which pattern? **D&C with cross** — cross tracks both max and min product (negative flip). Same three-way combine idea.

**Scenario 3:** *"Merge k sorted linked lists efficiently."*

Which pattern? **Merge sort on lists** — pair up lists, merge recursively. Combine = merge two sorted lists.

> **Answer key:** Scenarios 2–3 use **split + combine** like today. The combine logic changes (product vs sum vs list splice).

---

## ⚠ Common Mistakes

1. **Max subarray: no cross term** — Global max often straddles mid.

2. **Merge before children return** — Halves must be sorted first.

3. **Forget copy tmp → nums** — Merge writes to temp then must copy back.

4. **Single recursive call** — D&C on arrays needs **both** halves (except quickselect).

5. **Confuse with Day 6 binary pow** — Day 6: one halved exponent; Day 7: two halved **ranges**.

---

## 🏋️ Mini Challenge

### [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/)

**[→ Try Maximum Product Subarray on LeetCode](https://leetcode.com/problems/maximum-product-subarray/)**

Find contiguous subarray with **largest product**.

```
Input:  nums = [2, 3, -2, 4]
Output: 6
Explanation: [2, 3] has product 6.
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "maximum product" contiguous | Kadane-style OR D&C cross with min/max |
| "negative flips sign" | Track min product at cross — negatives matter |
| "contiguous subarray" | Same interval structure as #53 |

**Before you code:** Say *"cross combine — but track min and max product at suffix/prefix."* Or use O(n) Kadane-with-min variant.

> 💡 **Hint:** Same three-way split intuition as Maximum Subarray — product cross needs both extremes.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Sort an Array #912](https://leetcode.com/problems/sort-an-array/) | Medium | Merge sort recursion |
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Medium | D&C with cross sum |
| [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) | Medium | Cross combine variant |

---

*Day 7 complete! Tomorrow: grow strings by choosing and extending — generation trees. →*
