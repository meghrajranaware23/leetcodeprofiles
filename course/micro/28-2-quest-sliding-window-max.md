# ⚔ Quest: Sliding Window Maximum

> **Day 28** · [Sliding Window Maximum #239](https://leetcode.com/problems/sliding-window-maximum/) · Hard · 40 XP · 22 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sliding Window Maximum on LeetCode](https://leetcode.com/problems/sliding-window-maximum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are given an array of integers `nums` and an integer `k`. There is a sliding window of size `k` moving from the very left to the very right of the array. Return the **max sliding window** — the maximum element in each window position.

```
Input:  nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
Output: [3, 3, 5, 5, 6, 7]

Input:  nums = [1], k = 1
Output: [1]
```

---

## 💡 Hints

**Fixed window (Day 9):** The frame always holds exactly `k` elements. When `right` advances, index `right − k` exits the window.

**Monotonic deque (Day 17):** Maintain a **decreasing** deque of **indices**. Front = current window max. Pop back while `nums[right] ≥ nums[back]` — those indices can never be the max while the newcomer lives.

**Evict from front:** Before reading the max, pop front while `deque.front() ≤ right − k` — that index left the window.

---

## 🔍 Pattern Recognition Breakdown

**Patterns used:** Fixed Sliding Window (D-Rank Day 9) + Monotonic Decreasing Deque (B-Rank Day 17)

**How to identify this from the problem statement:**
- "sliding window of size k" → fixed window frame
- "maximum in each window position" → range-max query at every step
- Hard but O(n) expected → deque, not rescan

| Keyword / phrase | What it signals |
|---|---|
| "sliding window of size k" | Fixed window — Day 9 enter/exit |
| "maximum in each window" | Monotonic deque — Day 17 |
| "return array of maxes" | Record `nums[deque.front()]` each step after window full |
| Hard + contiguous window | Two-pattern synthesis — not segment tree |

**Why this pattern works:** Each index is pushed once and popped at most once from the deque. The front always holds the index of the largest value still inside the window.

**How a strong solver thinks before coding:**
1. *"Fixed window k → Day 9 frame. Max each step → Day 17 decreasing deque of indices."*
2. *"Pop back while newcomer dominates. Pop front when index exits window."*
3. *"Start recording when right ≥ k − 1. O(n)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each window, scan all k elements for max** | O(n×k) — TLE when n, k ≤ 10⁵ |
| **Heap of size k** | O(n log k) — works but deque is O(n) and simpler |
| **Store values instead of indices in deque** | Can't detect when max leaves the window |
| **Increasing deque** | Finds minimum, not maximum |

**The insight brute force misses:** An element `nums[i]` is useless as a future max if a **later, larger** element arrives before `i` leaves the window. The decreasing deque discards those dead candidates instantly.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Sliding Window Maximum #239](https://leetcode.com/problems/sliding-window-maximum/) | Max in fixed window | Fixed window + decreasing deque |
| [Sliding Window Minimum](https://leetcode.com/problems/sliding-window-minimum/) | Min instead of max | Fixed window + increasing deque |
| [Jump Game VI #1696](https://leetcode.com/problems/jump-game-vi/) | Max in window of reach k | Same deque inside BFS/dp window |
| [Longest Continuous Subarray With Absolute Diff ≤ Limit #1438](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-difference-less-than-or-equal-to-limit/) | Max AND min in window | Two deques (checkpoint) |

#239 is the canonical window + deque synthesis — master it before #862.

---

## 📖 Walkthrough

```
nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
result = [],  deque = []

right=0 (1): push 0                    deque=[0]
right=1 (3): 3>1 → pop 0, push 1      deque=[1]
right=2 (-1): push 2                   deque=[1,2]   (front=1, val 3)

Window full at right=2:
  pop front if ≤ right−k=−1 → none
  max = nums[1] = 3                      result=[3]

right=3 (-3): push 3                   deque=[1,2,3]
  pop front: 1 ≤ 0? no
  max = nums[1] = 3                      result=[3,3]

right=4 (5): 5≥-3 pop 3, 5≥-1 pop 2, 5≥3 pop 1, push 4
             deque=[4]
  pop front: 4 ≤ 1? no
  max = nums[4] = 5                      result=[3,3,5]

right=5 (3): push 5                      deque=[4,5]
  pop front: 4 ≤ 2? no
  max = nums[4] = 5                      result=[3,3,5,5]

right=6 (6): 6≥3 pop 5, 6≥5 pop 4, push 6  deque=[6]
  max = nums[6] = 6                      result=[3,3,5,5,6]

right=7 (7): 7≥6 pop 6, push 7           deque=[7]
  pop front: 7 ≤ 4? no
  max = nums[7] = 7                      result=[3,3,5,5,6,7] ✓
```

> 💡 **The insight:** The deque is not the window — it's a **candidate list** for max. The window (Day 9) decides who must leave; the deque (Day 17) decides who was never going to win.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> result;
        deque<int> dq;

        for (int right = 0; right < (int)nums.size(); right++) {
            while (!dq.empty() && nums[dq.back()] <= nums[right])
                dq.pop_back();
            dq.push_back(right);

            if (dq.front() <= right - k)
                dq.pop_front();

            if (right >= k - 1)
                result.push_back(nums[dq.front()]);
        }
        return result;
    }
};
```

### Python
```python
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        result = []
        dq = deque()

        for right, val in enumerate(nums):
            while dq and nums[dq[-1]] <= val:
                dq.pop()
            dq.append(right)

            if dq[0] <= right - k:
                dq.popleft()

            if right >= k - 1:
                result.append(nums[dq[0]])

        return result
```

### Java
```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();

        for (int right = 0; right < n; right++) {
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[right])
                dq.pollLast();
            dq.offerLast(right);

            if (dq.peekFirst() <= right - k)
                dq.pollFirst();

            if (right >= k - 1)
                result[right - k + 1] = nums[dq.peekFirst()];
        }
        return result;
    }
}
```

**Complexity:** O(n) time · O(k) space (deque)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Sliding window of size k"** → Fixed sliding window (D-Rank Day 9) — frame slides, one element exits per step.
- **"Maximum in each window"** → Cannot rescan k elements — monotonic decreasing deque (B-Rank Day 17).
- **"Store indices, not values"** → Need to evict front when index leaves the window.
- **"Pop back while nums[right] ≥ nums[back]"** → Newcomer dominates old candidates forever.
- **O(n×k) scan** → Wrong. Two-pattern synthesis: O(n) one pass.

If you nested loops over each window, you found brute force. The signal was **fixed window + range max** — name both ranks before coding.

> 🎯 **Pattern combo:** D-Rank Day 9 (fixed window frame) + B-Rank Day 17 (monotonic decreasing deque). S-Rank Day 28 synthesis — no third pattern needed.

---

*Next: negatives enter the array — prefix sums join the deque. →*
