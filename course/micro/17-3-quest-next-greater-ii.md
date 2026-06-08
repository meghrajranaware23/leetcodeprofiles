# ⚔ Quest: Next Greater Element II

> **Day 17** · [Next Greater Element II #503](https://leetcode.com/problems/next-greater-element-ii/) · Medium · 45 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Next Greater Element II on LeetCode](https://leetcode.com/problems/next-greater-element-ii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a **circular** integer array `nums` (the last element connects to the first), return an array `answer` of the same length where `answer[i]` is the **next greater element** of `nums[i]`.

The next greater element of `nums[i]` is `nums[j]` where `j` is the smallest index such that `j > i` (or `j` wraps to the beginning) and `nums[j] > nums[i]`. If no such element exists, `answer[i] = -1`.

```
Input:  nums = [1, 2, 1]
Output: [2, -1, 2]
        (index 0 → 2 at index 1; index 1 → none; index 2 → 2 at index 1 via wrap)

Input:  nums = [2, 1, 2, 4, 3]
Output: [4, 2, 4, -1, 4]

Input:  nums = [5, 4, 3, 2, 1]
Output: [-1, 5, 5, 5, 5]
```

---

## 💡 Hints

Daily Temperatures (#739) finds next greater in a **linear** array. Here the array is **circular** — after the last index, the search continues from index 0.

Two equivalent approaches:
1. **Scan `2n` indices** with `i % n` — the stack logic is identical to #739, but you return the **value** `nums[j]`, not the distance.
2. **Process right-to-left** with modulo indexing — push candidates onto a decreasing stack.

Only record an answer when `i < n` (the first pass covers all original positions; the second pass resolves wrap-around).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Decreasing Stack — Circular Next Greater

**How to identify this from the problem statement:**
- "circular array" / "last element connects to first" → wrap index with `% n`
- "next greater element" → decreasing stack (Day 17)
- return the **value**, not index or distance → `answer[i] = nums[popped]` on resolve... wait, on pop you assign `answer[popped] = nums[i]`

| Keyword / phrase | What it signals |
|---|---|
| "circular array" | Scan `2n` steps or use modulo |
| "next greater element" | Decreasing monotonic stack |
| "return -1 if none" | Unpopped indices after full circular scan |
| "smallest index j > i" (with wrap) | First greater in circular order |

**Why this pattern works:** Circling the array twice guarantees every element sees all candidates to its right (including wrap). The stack still ensures each index is pushed and popped once across both passes — O(n) total.

**How a strong solver thinks before coding:**
1. *"Next greater + circular → same decreasing stack, scan 2n with i % n."*
2. *"Only write answer when i < n — second lap resolves wrap."*
3. *"Return nums[i] at resolver, not distance — opposite of Daily Temperatures."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each i, scan i+1..n-1 then 0..i-1** | O(n²) — circular doesn't change the complexity trap |
| **Single pass without wrap** | Misses answers that lie before index i (e.g., `nums=[1,2,1]` index 2 needs index 1) |
| **Sort and binary search** | Destroys original order — next greater depends on position, not sorted rank |
| **Distance instead of value** | Daily Temperatures returns days; this returns the greater **element** |

**The insight brute force misses:** You don't need a separate wrap loop per index. One double scan with modulo lets the stack resolve all circular relationships in O(n).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Next Greater Element II #503](https://leetcode.com/problems/next-greater-element-ii/) | Circular + return value | Decreasing stack, 2n scan |
| [Daily Temperatures #739](https://leetcode.com/problems/daily-temperatures/) | Linear + return distance | Same pop logic |
| [Next Greater Element I #496](https://leetcode.com/problems/next-greater-element-i/) | Subset query via hash map | Stack on nums2, lookup nums1 |
| [Online Stock Span #901](https://leetcode.com/problems/online-stock-span/) | Streaming + span count | Decreasing stack, leftward look |

The circular variant is #739's stack with a **modulo lap** and **value output**.

---

## 📖 Walkthrough

```
nums = [2, 1, 2, 4, 3]   n = 5
answer = [-1, -1, -1, -1, -1]
stack = []

Scan i = 0..9 (2n - 1), idx = i % 5, push only when i < n

i=0 (idx 0, val 2): push 0
    stack=[0]

i=1 (idx 1, val 1): 1 < 2 → push 1
    stack=[0,1]

i=2 (idx 2, val 2): 2 > 1 → pop 1, answer[1] = 2
    2 not > 2 → push 2
    stack=[0,2]

i=3 (idx 3, val 4): 4 > 2 → pop 2, answer[2] = 4
    4 > 2 → pop 0, answer[0] = 4
    push 3
    stack=[3]

i=4 (idx 4, val 3): 3 < 4 → push 4
    stack=[3,4]

--- second lap (i >= n: no push, only pop) ---

i=5 (idx 0, val 2): 2 < 3, 2 < 4 → no pop
    stack=[3,4]

i=6 (idx 1, val 1): 1 < 3, 1 < 4 → no pop
    stack=[3,4]

i=7 (idx 2, val 2): 2 < 3, 2 < 4 → no pop
    stack=[3,4]

i=8 (idx 3, val 4): 4 > 3 → pop 4, answer[4] = 4
    4 not > 4 → no more pops
    stack=[3]

i=9 (idx 4, val 3): 3 < 4 → no pop
    stack=[3]

Unpopped: index 3 → answer[3] = -1

Answer: [4, 2, 4, -1, 4] ✓
```

> 💡 **The insight:** The first lap resolves most answers. The second lap lets index 4 (value 3) find index 3 (value 4) — the wrap-around case a single pass misses. Push only on the first lap so indices don't duplicate on the stack.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, -1);
        vector<int> stack;

        for (int i = 0; i < 2 * n; i++) {
            int idx = i % n;
            while (!stack.empty() && nums[idx] > nums[stack.back()]) {
                answer[stack.back()] = nums[idx];
                stack.pop_back();
            }
            if (i < n) stack.push_back(idx);
        }
        return answer;
    }
};
```

### Python
```python
class Solution:
    def nextGreaterElements(self, nums: list[int]) -> list[int]:
        n = len(nums)
        answer = [-1] * n
        stack = []

        for i in range(2 * n):
            idx = i % n
            while stack and nums[idx] > nums[stack[-1]]:
                answer[stack.pop()] = nums[idx]
            if i < n:
                stack.append(idx)

        return answer
```

### Java
```java
class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, -1);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < 2 * n; i++) {
            int idx = i % n;
            while (!stack.isEmpty() && nums[idx] > nums[stack.peek()]) {
                answer[stack.pop()] = nums[idx];
            }
            if (i < n) stack.push(idx);
        }
        return answer;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Circular array"** → Scan `2n` with `i % n`, or iterate backwards with modulo.
- **"Next greater element"** → Same decreasing stack as Daily Temperatures — Day 17 template.
- **Return the value, not distance** → On pop: `answer[j] = nums[i]`, not `i - j`.
- **Only push during first lap** → `if (i < n) stack.push(i)` avoids duplicate indices on stack.

If you ran a nested wrap loop per index, you found O(n²). The signal was "circular next greater" — double scan + monotonic stack.

> 🎯 **Pattern:** Decreasing stack + circular modulo. #739's mechanics with a second lap and value output.

---

*Day 17 checkpoint: prove you can spot next greater without a walkthrough. →*
