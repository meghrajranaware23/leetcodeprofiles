# ⚔ Quest: Shortest Subarray with Sum at Least K

> **Day 28** · [Shortest Subarray with Sum at Least K #862](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) · Hard · 60 XP · 28 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Subarray with Sum at Least K on LeetCode](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums` and an integer `k`, return **the length of the shortest non-empty subarray** whose sum is at least `k`. If there is no such subarray, return `-1`.

```
Input:  nums = [1], k = 1
Output: 1

Input:  nums = [1, 2], k = 4
Output: -1

Input:  nums = [2, -1, 2], k = 3
Output: 3
```

---

## 💡 Hints

**Hint 1 — Running sum fails:** D-Rank Day 10's variable window needs **positive** elements so sum is monotonic. This array has negatives — shrink-from-left breaks. Switch to **prefix sums** (E-Rank Day 5).

**Hint 2 — Prefix reframing:** Subarray sum `nums[i+1..j] = prefix[j] − prefix[i]`. Need `prefix[j] − prefix[i] ≥ k` → `prefix[i] ≤ prefix[j] − k`. For fixed `j`, want the **smallest** valid `i`.

**Hint 3 — Monotonic deque of indices (B-Rank Day 17):** Maintain indices with **increasing** `prefix` values. Pop back while `prefix[back] ≥ prefix[right]` — larger prefix at earlier index is never a better left boundary.

**Hint 4 — Variable window shrink (D-Rank Day 10):** After pushing `right`, pop front while `prefix[right] − prefix[dq.front()] ≥ k`. Record `right − dq.front()`. Shorter left index = shorter subarray.

**Hint 5 — Empty prefix:** Start with `prefix[0] = 0` and index `0` in deque — subarrays starting at index 0 use `prefix[0]` as left boundary.

---

## 🔍 Pattern Recognition Breakdown

**Patterns used:** Prefix Sum (E-Rank Day 5) + Monotonic Increasing Deque (B-Rank Day 17) + Variable Window Shrink (D-Rank Day 10)

**How to identify this from the problem statement:**
- "shortest subarray" → minimize length — variable window instinct
- "sum at least k" → sum constraint
- integers may be **negative** → running sum shrink unsafe; prefix sums required
- Hard + shortest + sum → classic three-pattern synthesis

| Keyword / phrase | What it signals |
|---|---|
| "shortest subarray" | Minimize length — Day 10 shrink |
| "sum at least k" | prefix[j] − prefix[i] ≥ k |
| negative numbers allowed | Prefix sum, NOT running-sum window |
| "non-empty subarray" | Answer ≥ 1; handle empty case as −1 |
| Hard + sum constraint | Deque of candidate left indices — Day 17 |

**Why this pattern works:** For each `right`, the deque holds candidate left indices in increasing prefix order. Front gives the smallest prefix value → best chance to satisfy `prefix[j] − prefix[i] ≥ k` with smallest `j − i`.

**How a strong solver thinks before coding:**
1. *"Negatives → can't use Day 10 running sum. Prefix sums (Day 5)."*
2. *"Need smallest i with prefix[i] ≤ prefix[j] − k → increasing deque of indices (Day 17)."*
3. *"Pop front while sum ≥ k → shortest valid (Day 10 shrink role)."*
4. *"Track min length. Return −1 if never found."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray [i..j], compute sum** | O(n²) — TLE at n = 5×10⁴ |
| **Variable window with running sum** | Fails with negatives — shrinking doesn't guarantee smaller sum |
| **Prefix sum + linear scan for each j** | O(n²) — deque reduces left search to O(1) amortized |
| **Hash map prefix → earliest index only** | Works for sum == k, not sum ≥ k with shortest length |

**The insight brute force misses:** When `prefix[j]` is fixed, you want the **smallest** `prefix[i]` among valid left indices — monotone increasing deque keeps those candidates at the front without rescanning.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Shortest Subarray with Sum at Least K #862](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) | Sum ≥ k, negatives OK | Prefix + deque + shrink |
| [Subarray Sum Equals K #560](https://leetcode.com/problems/subarray-sum-equals-k/) | Exact sum k | Prefix + hash map (Day 5 only) |
| [Minimum Size Subarray Sum #209](https://leetcode.com/problems/minimum-size-subarray-sum/) | Positive only | Variable window alone (Day 10) |
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Max sum, not shortest | Kadane (Day 12) — different tool |

#862 is the flagship **three-pattern** synthesis — prefix, deque, and shrink each play a distinct role.

---

## 📖 Walkthrough

```
nums = [2, -1, 2],  k = 3
prefix = [0, 2, 1, 3]
         index: 0  1  2  3

deque = [0]   (index 0, prefix 0)
minLen = ∞

right=1 (prefix=2):
  pop back: prefix[0]=0 < 2 → keep
  push 1                         deque=[0,1]
  prefix[1]-prefix[0]=2 < 3      no shrink

right=2 (prefix=1):
  pop back: prefix[1]=2 ≥ 1 → pop 1
  push 2                         deque=[0,2]
  prefix[2]-prefix[0]=1 < 3      no shrink

right=3 (prefix=3):
  pop back: prefix[2]=1 < 3 → keep
  push 3                         deque=[0,2,3]
  prefix[3]-prefix[0]=3 ≥ 3 ✓   minLen = 3-0 = 3, pop front → deque=[2,3]
  prefix[3]-prefix[2]=2 < 3      stop

Answer: 3 ✓  (subarray [2,-1,2])
```

> 💡 **The insight:** Three patterns, one scan. Prefix (Day 5) computes sum. Deque (Day 17) tracks best left candidates. Shrink (Day 10) extracts shortest valid length.

---

## Solution

### C++
```cpp
class Solution {
public:
    int shortestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];

        deque<int> dq;
        dq.push_back(0);
        int minLen = INT_MAX;

        for (int right = 1; right <= n; right++) {
            while (!dq.empty() && prefix[right] <= prefix[dq.back()])
                dq.pop_back();
            dq.push_back(right);

            while (!dq.empty() && prefix[right] - prefix[dq.front()] >= k) {
                minLen = min(minLen, right - dq.front());
                dq.pop_front();
            }
        }
        return minLen == INT_MAX ? -1 : minLen;
    }
};
```

### Python
```python
class Solution:
    def shortestSubarray(self, nums: list[int], k: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        dq = collections.deque([0])
        min_len = float('inf')

        for right in range(1, n + 1):
            while dq and prefix[right] <= prefix[dq[-1]]:
                dq.pop()
            dq.append(right)

            while dq and prefix[right] - prefix[dq[0]] >= k:
                min_len = min(min_len, right - dq[0])
                dq.popleft()

        return min_len if min_len != float('inf') else -1
```

### Java
```java
class Solution {
    public int shortestSubarray(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];

        Deque<Integer> dq = new ArrayDeque<>();
        dq.offer(0);
        int minLen = Integer.MAX_VALUE;

        for (int right = 1; right <= n; right++) {
            while (!dq.isEmpty() && prefix[right] <= prefix[dq.peekLast()])
                dq.pollLast();
            dq.offerLast(right);

            while (!dq.isEmpty() && prefix[right] - prefix[dq.peekFirst()] >= k) {
                minLen = Math.min(minLen, right - dq.peekFirst());
                dq.pollFirst();
            }
        }
        return minLen == Integer.MAX_VALUE ? -1 : minLen;
    }
}
```

**Complexity:** O(n) time · O(n) space (prefix + deque)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Shortest subarray, sum ≥ k"** → Variable window shrink instinct (D-Rank Day 10) — but check for negatives first.
- **Negative numbers in array** → Running sum window breaks — switch to prefix sums (E-Rank Day 5).
- **prefix[j] − prefix[i] ≥ k** → For fixed j, need smallest prefix[i] → monotonic increasing deque of indices (B-Rank Day 17).
- **Pop front while valid** → Shrink role (Day 10) — track minimum `right − front`.
- **Three patterns named** → This is S-Rank synthesis, not a single Day.

If you used #209's running-sum window, negatives broke your logic. The signal was **shortest + sum ≥ k + negatives allowed** — prefix + deque + shrink.

> 🎯 **Pattern combo:** E-Rank Day 5 (prefix sum) + B-Rank Day 17 (monotonic increasing deque) + D-Rank Day 10 (shrink while valid). Three ranks, one O(n) scan.

---

*Day 28 checkpoint: recognize combination signals under pressure. →*
