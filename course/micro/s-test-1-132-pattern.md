# ⚔ S-Rank Test — Problem 1

> [132 Pattern #456](https://leetcode.com/problems/132-pattern/) · **Medium** · 300 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open 132 Pattern on LeetCode](https://leetcode.com/problems/132-pattern/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **Your first S-Rank test.** This problem looks like a triplet search — but brute-force triple loops die at n = 2×10⁵. The synthesis is **prefix min from the left** + **monotonic stack from the right**.

---

## The Problem

Given an array of `n` integers `nums`, a **132 pattern** is a subsequence of three indices `i`, `j`, and `k` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`.

Return `true` if there is a 132 pattern in `nums`, otherwise return `false`.

```
Input:  nums = [3, 1, 4, 2]
Output: true
Explanation: (i,j,k) = (0, 2, 3): nums[0]=3, nums[2]=4, nums[3]=2 → 3 < 2 < 4 ✓

Input:  nums = [1, 2, 3, 4]
Output: false
Explanation: No index k exists with nums[k] between nums[i] and nums[j] when j > i.

Input:  nums = [-1, 3, 2, 0]
Output: true
Explanation: (i,j,k) = (0, 1, 3): −1 < 0 < 3.
```

---

## 💡 Hints

> 🎯 **What's being tested:** Prefix minimum (left scan) + monotonic decreasing stack (right scan) — finding `i < j < k` with `nums[i] < nums[k] < nums[j]` without O(n³) enumeration.

**Hint 1 — Name the roles:** In the 132 pattern, `j` is the **peak** (largest of the three). `i` is the smallest (left valley). `k` is the **middle** value — smaller than `nums[j]` but larger than `nums[i]`. You need `nums[i] < nums[k] < nums[j]`.

**Hint 2 — Scan from the right:** Traverse from `n−1` down to `0`. Maintain a **monotonic decreasing stack** of candidate `nums[j]` values (peaks). When `nums[i]` is greater than the stack top, pop — the popped value is a valid `nums[k]` candidate (middle element).

**Hint 3 — Track the best k candidate:** Variable `third` (or `middle`) holds the largest `nums[k]` found so far that could serve as the middle element. Each pop from the stack updates `third = max(third, popped)`.

**Hint 4 — Prefix min as nums[i]:** As you scan left, `nums[i]` is a candidate for the left valley. If `nums[i] < third`, you have found `i < j < k` with `nums[i] < nums[k] < nums[j]` — return true.

**Hint 5 — Stack invariant:** The stack stores decreasing values — each element is a potential peak `nums[j]`. Popping when `nums[i] > stack.top()` means `i` could be left of `j`, and the popped value becomes a `k` candidate between them.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Minimum + Monotonic Stack from Right (Day 16 + Day 17 synthesis)

| Clue in the problem | What it signals |
|---|---|
| "132 pattern" / three-index subsequence | Not subarray — O(n) greedy, not O(n³) triple loop |
| `nums[i] < nums[k] < nums[j]` with i < j < k | Middle element between valley and peak — stack from right |
| n up to 2×10⁵ | Must be O(n) — prefix + single stack pass |
| return true/false | Existence only — track best k candidate, not all triplets |
| Medium but synthesis-heavy | Two one-pass techniques combined |

**How to identify from the statement:** "132 pattern" or "nums[i] < nums[k] < nums[j]" → **scan from right with decreasing stack for k candidates**, compare against current `nums[i]` as valley.

**How a strong solver thinks before coding:**
1. *"j is the peak — stack decreasing values from right."*
2. *"Pop when nums[i] > stack.top → popped is k candidate."*
3. *"Track best third (middle). If nums[i] < third → 132 found."*
4. *"O(n) one pass from right."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Triple nested loop over i, j, k** | O(n³) — TLE on n = 2×10⁵ |
| **Fix j, scan for i and k** | O(n²) — still TLE |
| **Sort and binary search** | Destroys index order i < j < k |
| **Increasing stack from left** | Wrong direction — peak j must be to the left of k |
| **Only track min without stack** | Misses the middle element constraint nums[k] < nums[j] |

**The insight brute force misses:** Scanning from the **right**, the stack collects peak candidates. Each pop produces a valid `k` value. The current element is the best candidate for `i` — if it's smaller than the best `k` seen, the pattern exists.

---

## 🎯 Transfer to Unseen Problems

Can you spot 132-style thinking on unfamiliar wording?

**Scenario 1:** *"Given an array, determine if there exist indices i < j < k with nums[j] as the maximum of the three and nums[i] as the minimum."*

Which pattern? **132 pattern variant** — same stack-from-right + valley check.

**Scenario 2:** *"Find any triplet i < j < k where nums[i] < nums[j] < nums[k] (standard increasing triplet)."*

Which pattern? **Greedy first/second tracking (#334)** — not 132. No middle-between constraint.

**Scenario 3:** *"Count all 132 patterns in the array."*

Which pattern? **Harder variant** — may need careful stack accounting or different decomposition. Existence (#456) is the O(n) base case.

> **Answer key:** Scenario 1 → 132 / stack from right. Scenario 2 → greedy first/second (#334). Scenario 3 → extension of 132 stack logic.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
nums = [3, 1, 4, 2]
Scan right → left.  stack = [],  third = -inf

i=3 (2): stack empty → push 2.  stack=[2]
i=2 (4): 4 > 2 → pop 2, third=2.  push 4.  stack=[4]
i=1 (1): 1 < third(2) → return TRUE ✓
         (i=1, j=2, k=3): nums[1]=1 < nums[3]=2 < nums[2]=4)
```

```
nums = [1, 2, 3, 4]
i=3 (4): stack=[4]
i=2 (3): 3 < 4, push → [4,3]
i=1 (2): 2 < 3, push → [4,3,2]
i=0 (1): 1 < third → never updated from -inf... third still -inf, 1 < -inf? No.
         No pop ever happened → third stays -inf → return FALSE ✓
```

### C++
```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        int n = nums.size();
        if (n < 3) return false;

        stack<int> st;
        int third = INT_MIN;

        for (int i = n - 1; i >= 0; i--) {
            if (nums[i] < third) return true;
            while (!st.empty() && nums[i] > st.top()) {
                third = st.top();
                st.pop();
            }
            st.push(nums[i]);
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def find132pattern(self, nums: list[int]) -> bool:
        if len(nums) < 3:
            return False

        stack = []
        third = float('-inf')

        for x in reversed(nums):
            if x < third:
                return True
            while stack and x > stack[-1]:
                third = stack.pop()
            stack.append(x)

        return False
```

### Java
```java
class Solution {
    public boolean find132pattern(int[] nums) {
        if (nums.length < 3) return false;

        Deque<Integer> stack = new ArrayDeque<>();
        int third = Integer.MIN_VALUE;

        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] < third) return true;
            while (!stack.isEmpty() && nums[i] > stack.peek()) {
                third = stack.pop();
            }
            stack.push(nums[i]);
        }
        return false;
    }
}
```

**Complexity:** O(n) time · O(n) space for stack

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"132 pattern" / nums[i] < nums[k] < nums[j]** → j is peak, scan from right with decreasing stack.
- **"Subsequence with index order"** → One-pass greedy — not triple loop.
- **Pop when nums[i] > stack.top** → Popped value is k candidate; update `third`.
- **nums[i] < third** → Valley found left of a valid k — return true.

This is S-Rank synthesis: prefix thinking (current element as valley) plus monotonic stack (peak and middle from the right). If Day 17's stack felt natural, 132 is stack-as-candidate-generator.

---

*Problem 1 complete. Proceed to Problem 2. →*
