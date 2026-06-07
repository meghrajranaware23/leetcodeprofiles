# ✅ Day 9 Checkpoint

> **Fixed Sliding Window** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "subarray of length k" / "window size k" | Fixed sliding window | Size never changes — enter/exit |
| "maximum average" / "max sum" of length-k subarray | Running sum + track max | Max average = max sum ÷ k |
| "every contiguous subarray of size k" | Enter/exit slide | O(n) total, O(1) space |
| "flip at most k" / "at most k zeros" | Budget window + counter | Count bad elements, shrink when > k |
| "enter new / exit old" / "slide one step" | `+= nums[right]`, `-= nums[left]` | Only two elements change per step |
| "same as prefix sum for fixed k" | Either works; window streams | `prefix[R+1]-prefix[L]` vs enter/exit |
| running aggregate over contiguous elements | Sliding window family | Fixed (Day 9) or variable (Day 10) |

### 🧠 Quick Recognition Test

1. *"Find max sum of any subarray of exactly length 4"* → **Fixed window enter/exit**
2. *"Longest stretch of 1's if you can flip at most 2 zeros"* → **Budget window, count zeros ≤ 2**
3. *"Average of each length-3 subarray, return the maximum"* → **Fixed window, track max sum**
4. *"How many windows of size k have sum ≥ target?"* → **Fixed window + condition check per slide**

---

## 🎯 Transfer to Unseen Problems

You've studied Maximum Average Subarray and Max Consecutive Ones III. Can you recognize fixed-window thinking on problems you've never walked through?

**Scenario 1:** *"A bookstore owner knows which minutes customers are unhappy. If the owner can be 'not grumpy' for exactly k consecutive minutes, what's the maximum extra customers they can satisfy?"*

Which pattern? **Fixed window of size k.** Compute `gain[i] = satisfied[i] if grumpy[i] else 0`. Find the k-minute window with maximum sum of gains — pure enter/exit.

**Scenario 2:** *"Given a binary array, find the length of the longest contiguous subarray containing at most one zero."*

Which pattern? **Budget window with k = 1.** Same skeleton as Max Consecutive Ones III — count zeros, shrink when count > 1.

**Scenario 3:** *"Given an array and k, return the maximum sum among all subarrays of length exactly k."*

Which pattern? **Classic fixed sliding window.** Build first window, slide with enter/exit, track max. Identical to quest #643 without the division.

> **Answer key:** All three → sliding window family. Scenario 1 uses fixed size k (enter/exit). Scenarios 2 and 3 use budget or fixed-length variants of the same enter/exit mechanic.

---

## ⚠ Common Mistakes

1. **Re-summing the whole window each slide** — Only two elements change. Use enter/exit, not an inner loop.

2. **Off-by-one on window start** — First window is `nums[0..k-1]`. Slide loop starts `right` at `k`, exit index is `right - k`.

3. **Dividing inside the loop** — For max average, compare integer sums. Divide by `k` once at the end.

4. **Forgetting to shrink in budget windows** — When `zeroCount > k`, you must advance `left` until valid. An infinite window isn't the answer.

---

## 🏋️ Mini Challenge

### [Grumpy Bookstore Owner #1052](https://leetcode.com/problems/grumpy-bookstore-owner/)

**[→ Try Grumpy Bookstore Owner on LeetCode](https://leetcode.com/problems/grumpy-bookstore-owner/)**

The owner is grumpy for some minutes. Being not grumpy for `k` consecutive minutes gains extra satisfied customers. Return the maximum total satisfied customers.

```
customers = [1, 0, 1, 2, 1, 1, 7, 5], grumpy = [0, 1, 0, 1, 0, 1, 0, 0], minutes = 3
Output: 16
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "not grumpy for exactly k consecutive minutes" | Fixed window of size k |
| maximize extra satisfied customers | Sum gains in the k-window |
| grumpy array marks which minutes benefit | Transform: gain = customers[i] if grumpy[i] else 0 |

**Before you code:** *"Fixed k-minute window on gain array. Base answer = customers where grumpy[i]==0. Add max window sum of gains."*

> 💡 **Hint:** `base = sum(customers[i] where grumpy[i]==0)`. `gain[i] = grumpy[i] ? customers[i] : 0`. Answer = `base + maxSum(gain, k)`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Max Consecutive Ones #485](https://leetcode.com/problems/max-consecutive-ones/) | Easy | Simple run-length count (k = 0) |
| [Grumpy Bookstore Owner #1052](https://leetcode.com/problems/grumpy-bookstore-owner/) | Medium | Fixed k-window on gain array |
| [Maximum Sum of Distinct Subarrays With Length K #2461](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/) | Medium | Fixed window + hash set |
| [Frequency of the Most Frequent Element #1838](https://leetcode.com/problems/frequency-of-the-most-frequent-element/) | Medium | Sort + fixed budget window |

---

*Day 9 complete! Tomorrow: the window grows and shrinks on demand. →*
