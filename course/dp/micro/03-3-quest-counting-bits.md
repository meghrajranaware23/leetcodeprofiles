<!-- hand-authored -->
# ⚔ Quest: Counting Bits

> **Day 3** · [Counting Bits #338](https://leetcode.com/problems/counting-bits/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Counting Bits on LeetCode](https://leetcode.com/problems/counting-bits/)**

> ⚔ **Hunter's rule:** Write dp[0..7] by hand. For each i, compare binary of i and i/2. Spot the rule before you code.

---

## The Problem

See the full problem statement on LeetCode: **[Counting Bits #338](https://leetcode.com/problems/counting-bits/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Bit-Based Tabulation — `dp[i] = dp[i >> 1] + (i & 1)`.

**Hint 1:** `i >> 1` drops the last binary digit. `i & 1` is that last digit (0 or 1).

**Hint 2:** Popcount of i = popcount of (i without last bit) + last bit. So dp[i] = dp[i/2] + (i&1).

**Hint 3:** Fill i=1..n left-to-right — i/2 < i always, so dp[i>>1] is ready.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bit-Based Tabulation

**How to identify this from the problem statement:**
- "Number of 1 bits" for **every** value 0..n
- Batch query — build array once
- Hidden structure: binary halving

| Keyword / phrase | What it signals |
|---|---|
| "for every number from 0 to n" | 1D dp array |
| "number of 1's in binary" | popcount / bit DP |
| Avoid O(n log n) per number | Single O(n) pass with recurrence |

**Why brute force fails:** Calling `__builtin_popcount(i)` per i is O(n log n). Bit DP is O(n) — each cell O(1).

**How a strong solver thinks before coding:**
1. *"How does popcount(i) relate to popcount(i/2)?"*
2. *"Last bit adds 0 or 1."*
3. *"dp[0]=0; loop i=1..n."*
4. *"Not Fib — dependency is i/2, not i-1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **popcount built-in per i** | O(n log n) — fine but misses the DP lesson |
| **Check each bit of each i** | Same — redundant work across numbers |
| **dp[i]=dp[i>>1]+(i&1)** | O(n) — reuse halving structure ✓ |

```
 i  bin  i>>1  i&1  dp[i]
 0   0    0     0    0
 1   1    0     1    1   = dp[0]+1
 2  10    1     0    1   = dp[1]+0
 3  11    1     1    2   = dp[1]+1
 4 100    2     0    1   = dp[2]+0
 5 101    2     1    2   = dp[2]+1
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Recurrence |
|---|---|
| **Counting Bits #338** | dp[i]=dp[i>>1]+(i&1) |
| dp[i]=dp[i&(i-1)]+1 | Clear lowest set bit variant |
| Bitmask DP (later ranks) | Build on bit structure |

---

## 📖 Walkthrough

**n=5 → return [0,1,1,2,1,2]**

```
dp[0] = 0
dp[1] = dp[0] + 1 = 1
dp[2] = dp[1] + 0 = 1   (10: drop last 0)
dp[3] = dp[1] + 1 = 2   (11: drop last 1)
dp[4] = dp[2] + 0 = 1
dp[5] = dp[2] + 1 = 2

Verify: 5 = 101 → two 1-bits ✓
```

> 💡 **The insight:** Day 3's second visual — dependency jumps to **half index**, not i-1. Still tabulation: fill small i first.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++)
            dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
};
```

### Python
```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp
```

### Java
```java
class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++)
            dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"dp[i>>1] + (i&1)"** → Day 3 bit recurrence — memorize the shape.
- **"Not Fib"** → Dependency i/2 breaks the i-1, i-2 habit.
- **"Left-to-right fill"** → i/2 always computed first.
- **"Pascal was 2D; bits are 1D with weird index"** → Read the dependency arrow.

> 🎯 **Pattern Unlocked:** Bit-Based Tabulation

---

*Both quests complete. Head to the checkpoint. →*
