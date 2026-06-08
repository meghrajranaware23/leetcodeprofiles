# ⚔ B-Rank Test — Problem 2

> [Sum of Subarray Minimums #907](https://leetcode.com/problems/sum-of-subarray-minimums/) · **Medium** · 200 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Sum of Subarray Minimums on LeetCode](https://leetcode.com/problems/sum-of-subarray-minimums/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given an array of integers `arr`, find the sum of `min(b)` for every **(contiguous) subarray** `b` of `arr`. Since the answer may be large, return it **modulo 10⁹ + 7**.

```
Input:  arr = [3, 1, 2, 4]
Output: 17
Explanation:
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4].
Minimums are  3,  1,  2,  4,   1,    1,    2,     1,       1,        1.
Sum = 3 + 1 + 2 + 4 + 1 + 1 + 2 + 1 + 1 + 1 = 17.

Input:  arr = [11, 81, 94, 1, 5, 4, 79, 16, 5, 2, 81, 45, 0, 27, 11, 0, 27, 15, 1, 30, 35, 0, 30, 11, 5, 2, 3, 1]
Output: 50849999

Input:  arr = [1, 2, 3, 4, 5]
Output: 35
```

---

## 💡 Hints

> 🎯 **What's being tested:** Monotonic stack (Day 17–18) + **contribution counting** — each element is the minimum of some subarrays; count how many, multiply by its value.

**Hint 1 — Contribution, not enumeration:** Don't list every subarray. For each `arr[i]`, ask: *in how many subarrays is `arr[i]` the minimum?* Add `arr[i] × count` to the answer.

**Hint 2 — Boundaries via stack:** Use a monotonic stack to find, for each index `i`:
- `left` = index of the **previous strictly smaller** element (or −1 if none)
- `right` = index of the **next smaller or equal** element (or n if none)

Handle equal elements carefully — use **strictly smaller on the left, smaller-or-equal on the right** (or the symmetric variant) to avoid double-counting duplicates.

**Hint 3 — Count formula:** Subarrays where `arr[i]` is the minimum and `i` is the chosen representative:
`count = (i - left) × (right - i)`
Left choices: any start in `(left, i]` → `i - left` options. Right choices: any end in `[i, right)` → `right - i` options.

**Hint 4 — Two passes or one clever pass:** Classic approach — one increasing stack pass for `left` boundaries, one decreasing (or reversed) pass for `right`. Or compute both in two monotonic stack sweeps.

**Hint 5 — Modulo arithmetic:** Sum contributions with `% (10⁹ + 7)` at each addition. Values and counts can overflow 64-bit if you skip mod.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Stack + Contribution Counting (Day 17–18)

| Clue in the problem | What it signals |
|---|---|
| "sum over all subarrays" | Too many subarrays O(n²) — count per-element contributions instead |
| "minimum of each subarray" | Each element is min of subarrays where it's the smallest |
| duplicates in array | Tie-breaking rule for equal values — strict vs non-strict boundaries |
| modulo 10⁹ + 7 | Large combinatorial count — contribution formula is the intended path |
| Medium + array aggregation | Monotonic stack for nearest smaller boundaries |

**How to identify from the statement:** "Sum of X over all subarrays" where X is min/max → **contribution counting** with monotonic stack boundaries. Never enumerate subarrays.

**How a strong solver thinks before coding:**
1. *"Sum of mins over all subarrays → each element contributes arr[i] × (# subarrays where it's min)."*
2. *"Count subarrays where i is min → left boundary × right boundary."*
3. *"Find boundaries with monotonic stack — previous smaller, next smaller-or-equal."*
4. *"Mod at every step."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate every subarray, find its min** | O(n²) subarrays × O(n) min scan = O(n³) — TLE |
| **Generate every subarray with min tracked in O(1) per extension** | O(n²) time still — n ≈ 3×10⁴ gives ~10⁹ operations |
| **Use `<` on both sides for equal elements** | Double-counts duplicates — answer too large |
| **Use `<=` on both sides for equal elements** | Under-counts — answer too small |
| **Multiply without modulo** | Integer overflow on large arrays |

**The insight brute force misses:** An element `arr[i]` is the minimum of exactly `(i - left) × (right - i)` subarrays — the stack finds `left` and `right` in O(n) total, turning O(n²) counting into O(n).

---

## 🎯 Transfer to Unseen Problems

Can you spot contribution counting without the word "subarray minimum"?

**Scenario 1:** *"Return the sum of the maximum element of every contiguous subarray."*

Which pattern? **Monotonic stack + contribution** — same formula, but find previous **greater** and next **greater-or-equal** (mirror of this problem).

**Scenario 2:** *"Given an array, how many subarrays have sum exactly k?"*

Which pattern? **Prefix sum + hash map** (C-Rank, Day 13). Not a stack — counting by complement, not by element contribution.

**Scenario 3:** *"For each element, return how far the next warmer temperature is."*

Which pattern? **Monotonic increasing stack** (Day 17). Stack finds next greater index — same machinery, different output.

> **Answer key:** Scenarios 1 and 3 → monotonic stack (Day 17–18). Scenario 2 → prefix sum + hash map. Signal: **"sum of min/max over all subarrays"** → contribution counting with stack boundaries.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
arr = [3, 1, 2, 4]
```

| i | arr[i] | left (prev <) | right (next ≤) | count = (i−left)×(right−i) | contribution |
|---|--------|---------------|----------------|------------------------------|--------------|
| 0 | 3 | −1 | 1 | (0−(−1))×(1−0) = 1×1 = 1 | 3×1 = 3 |
| 1 | 1 | −1 | 4 | (1−(−1))×(4−1) = 2×3 = 6 | 1×6 = 6 |
| 2 | 2 | 1 | 4 | (2−1)×(4−2) = 1×2 = 2 | 2×2 = 4 |
| 3 | 4 | 2 | 4 | (3−2)×(4−3) = 1×1 = 1 | 4×1 = 4 |

**Sum = 3 + 6 + 4 + 4 = 17** ✓

**Why `1` gets count 6:** It's the minimum of subarrays starting at index 0 or 1 (2 choices) and ending at index 1, 2, or 3 (3 choices): `[1]`, `[3,1]`, `[1,2]`, `[3,1,2]`, `[1,2,4]`, `[3,1,2,4]`.

### Tie-breaking for duplicates

When values repeat, pick one consistent rule so each subarray's minimum is counted exactly once. Standard fix:
- Previous **strictly smaller** (`<`) on the left
- Next **smaller or equal** (`<=`) on the right

This assigns duplicate minimums to the leftmost occurrence in each equal run.

### C++
```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        const int MOD = 1'000'000'007;
        int n = arr.size();
        vector<int> left(n), right(n);
        vector<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[st.back()] >= arr[i]) st.pop_back();
            left[i] = st.empty() ? -1 : st.back();
            st.push_back(i);
        }
        st.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.empty() && arr[st.back()] > arr[i]) st.pop_back();
            right[i] = st.empty() ? n : st.back();
            st.push_back(i);
        }

        long long ans = 0;
        for (int i = 0; i < n; i++) {
            long long count = (long long)(i - left[i]) * (right[i] - i);
            ans = (ans + (long long)arr[i] * count) % MOD;
        }
        return (int)ans;
    }
};
```

### Python
```python
class Solution:
    def sumSubarrayMins(self, arr: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        left, right = [-1] * n, [n] * n
        stack = []

        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            left[i] = stack[-1] if stack else -1
            stack.append(i)

        stack.clear()
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            right[i] = stack[-1] if stack else n
            stack.append(i)

        ans = 0
        for i in range(n):
            count = (i - left[i]) * (right[i] - i)
            ans = (ans + arr[i] * count) % MOD
        return ans
```

### Java
```java
class Solution {
    public int sumSubarrayMins(int[] arr) {
        final int MOD = 1_000_000_007;
        int n = arr.length;
        int[] left = new int[n], right = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) stack.pop();
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }

        long ans = 0;
        for (int i = 0; i < n; i++) {
            long count = (long) (i - left[i]) * (right[i] - i);
            ans = (ans + (long) arr[i] * count) % MOD;
        }
        return (int) ans;
    }
}
```

**Complexity:** O(n) time · O(n) space for boundary arrays and stack

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Sum of minimums over all subarrays"** → Contribution counting — each `arr[i]` adds `value × count`.
- **"How many subarrays is arr[i] the min?"** → Monotonic stack for previous-smaller and next-smaller-or-equal boundaries (Day 17–18).
- **`(i - left) × (right - i)`** → Combinatorial count from independent start/end choices.

If the stack boundary hunt felt like Next Greater Element turned inward, your B-Rank training is working. The Medium label is the duplicate tie-breaking — not the stack itself.

---

*Problem 2 complete. Proceed to Problem 3. →*
