<!-- hand-authored -->
# ⚔ Quest: Unique Binary Search Trees

> **Day 22** · [Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Binary Search Trees on LeetCode](https://leetcode.com/problems/unique-binary-search-trees/)**

> ⚔ **Hunter's rule:** Pick each **root** j; left and right subtree counts **multiply**. This is **Catalan**, not coin DP.

---

## The Problem

See the full problem statement on LeetCode: **[Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Catalan Number DP.

- `dp[i]` = number of unique BSTs with exactly `i` nodes (values 1..i)
- Try every root `j` from 1 to i:
  - Left has `j-1` nodes, right has `i-j` nodes
  - **`dp[i] += dp[j-1] * dp[i-j]`**
- Base: `dp[0] = 1` (empty tree), `dp[1] = 1`
- Answer: `dp[n]`

Not amount summing — **multiply** independent subtree counts.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Catalan Number DP

**How to identify this from the problem statement:**
- Count **structures** (trees), not sequences
- BST order fixed by values 1..n
- Optimal substructure on **size** parameter

| Keyword / phrase | What it signals |
|---|---|
| "unique BST" / "structurally unique" | Catalan recurrence |
| "n nodes labeled 1..n" | Root split multiply |
| "ways to sum to target" | **#377** amount DP |
| "coin combinations" | **Day 18** |

**Why brute force fails:** Generate all trees — Catalan grows fast; overlap on `(size)`.

**How a strong solver thinks before coding:**
1. *"dp[0]=dp[1]=1."*
2. *"For size i, try root j."*
3. *"Multiply left and right counts."*
4. *"Sum over j."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all binary trees** | Factorial/exponential |
| **Add dp[j-1]+dp[i-j]** | Should **multiply** |
| **Coin change loop** | Wrong recurrence family |
| **n=0 edge** | dp[0]=1 for empty |

**The insight:** Independent left and right choices → product; root choices → sum.

```
n=3: roots 1,2,3 → dp[3]=5 (Catalan)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Unique Binary Search Trees II #95](https://leetcode.com/problems/unique-binary-search-trees-ii/) | Generate all | Backtracking + Catalan |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Ordered sums | Today's second quest |
| [Coin Change II #518](https://leetcode.com/problems/coin-change-ii/) | Combinations | Day 18 |

---

## 📖 Walkthrough

**Example:** `n = 3`

```
dp[0]=1, dp[1]=1
dp[2] = dp[0]*dp[1] + dp[1]*dp[0] = 1+1 = 2
dp[3] = dp[0]*dp[2] + dp[1]*dp[1] + dp[2]*dp[0] = 2+1+2 = 5

5 unique BSTs on {1,2,3} ✓
```

> 💡 **The insight:** Product of subproblems — signature of **structural** counting.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j <= i; j++)
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i + 1):
                dp[i] += dp[j - 1] * dp[i - j]
        return dp[n]
```

### Java
```java
class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j <= i; j++)
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"BST → pick root, split sizes."** → Catalan.
- **"Multiply left×right."** → Independent subtrees.
- **"dp[0]=1 empty tree."** → Base case.
- **"Catalan Number DP"** → Not coin change.

If you used `+= dp[i-num]`, you're on **#377**, not #96.

> 🎯 **Pattern Unlocked:** Catalan Number DP

---

*One quest down. Next: ordered sums — amount outer. →*
