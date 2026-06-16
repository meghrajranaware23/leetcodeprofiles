<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 3

> [Ugly Number II #264](https://leetcode.com/problems/ugly-number-ii/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Ugly Number II on LeetCode](https://leetcode.com/problems/ugly-number-ii/)**

> ⚔ **Hunter's rule:** Build the sequence in order — **multi-pointer tabulation**, not inner-loop splits like Day 10. Three queues merged into one dp array.

---

## The Problem

See the full problem statement on LeetCode: **[Ugly Number II #264](https://leetcode.com/problems/ugly-number-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Multi-pointer DP tabulation** — generate sorted ugly numbers without recomputing or sorting all candidates.

- `dp[i]` = (i+1)-th ugly number; `dp[0] = 1`
- Three pointers `i2, i3, i5` — next ugly = min(`dp[i2]*2`, `dp[i3]*3`, `dp[i5]*5`)
- Assign `dp[i] = next`; advance **each** pointer whose product equals `next` (duplicates: 6 = 2×3)

**Not Day 10 inner j loop** — fixed three predecessors, pointer advance.

**Pattern name before coding:** *Multi-pointer merge tabulation (dp table + i2/i3/i5).*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Generate **sequence in sorted order** from fixed factors {2,3,5}
- Need nth term — build table once
- Merge pattern like merge k sorted lists

**How a strong solver thinks before coding:**
1. *"dp[0]=1; three indices into dp."*
2. *"next = min of three products."*
3. *"Advance all pointers that hit next."*
4. *"Return dp[n-1]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every integer for ugliness** | O(n log n) per check — too slow |
| **Priority queue of all products** | Duplicates, extra log factor |
| **Day 10 try all j at each i** | Wrong — only three fixed multipliers |
| **Sort all dp[i]*2, dp[i]*3, dp[i]*5 each step** | Pointer merge avoids sort |

---

## 🎯 Transfer to Unseen Problems

Same family: [Super Ugly Number #313](https://leetcode.com/problems/super-ugly-number/) — more primes, same pointer idea.

Reference: **Day 10** inner loops optimize over **variable splits**; here choices are **three fixed streams** merged by pointers.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> dp(n);
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = min({dp[i2] * 2, dp[i3] * 3, dp[i5] * 5});
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [0] * n
        dp[0] = 1
        i2 = i3 = i5 = 0
        for i in range(1, n):
            nxt = min(dp[i2] * 2, dp[i3] * 3, dp[i5] * 5)
            dp[i] = nxt
            if nxt == dp[i2] * 2: i2 += 1
            if nxt == dp[i3] * 3: i3 += 1
            if nxt == dp[i5] * 5: i5 += 1
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int nthUglyNumber(int n) {
        int[] dp = new int[n];
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = Math.min(dp[i2] * 2, Math.min(dp[i3] * 3, dp[i5] * 5));
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"nth ugly number"** → dp table + three pointers.
- **"min of three products"** → merge sorted streams.
- **"Advance all matching pointers"** → handle 6 = 2×3.
- **"Not Day 10 inner splits"** — fixed factors, pointer tabulation.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> dp(n);
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = min({dp[i2] * 2, dp[i3] * 3, dp[i5] * 5});
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [0] * n
        dp[0] = 1
        i2 = i3 = i5 = 0
        for i in range(1, n):
            nxt = min(dp[i2] * 2, dp[i3] * 3, dp[i5] * 5)
            dp[i] = nxt
            if nxt == dp[i2] * 2: i2 += 1
            if nxt == dp[i3] * 3: i3 += 1
            if nxt == dp[i5] * 5: i5 += 1
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int nthUglyNumber(int n) {
        int[] dp = new int[n];
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = Math.min(dp[i2] * 2, Math.min(dp[i3] * 3, dp[i5] * 5));
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(n) time · O(n) space
