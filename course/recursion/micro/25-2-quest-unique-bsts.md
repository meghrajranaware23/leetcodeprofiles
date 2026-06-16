<!-- hand-authored -->
# ⚔ Quest: Unique Binary Search Trees

> **Day 25** · [Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Binary Search Trees on LeetCode](https://leetcode.com/problems/unique-binary-search-trees/)**

> ⚔ **Hunter's rule:** Compute G(1), G(2), G(3) by hand using the root loop. Draw the five trees for n=3 before coding.

---

## The Problem

Given an integer `n`, return the number of **structurally unique** BSTs which store values `1` through `n` uniquely.

```
Input:  n = 3
Output: 5

Input:  n = 1
Output: 1
```

---

## 💡 Hints

**Hint 1:** Define `G(k)` — number of unique BSTs using values `1..k`.

**Hint 2:** Pick root `i` (where `1 <= i <= k`). Left subtree uses `1..i-1` → `G(i-1)`. Right uses `i+1..k` → `G(k-i)`.

**Hint 3:** `G(k) = sum over i=1..k of G(i-1) * G(k-i)`.

**Hint 4:** Base: `G(0) = 1` (empty tree), `G(1) = 1` (single node).

**Hint 5:** Memo on `k` — each size computed once → O(n²).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Catalan Recursion

| Clue in the problem | What it signals |
|---|---|
| "unique BSTs" / "structurally different" | Count tree shapes, not build trees |
| Values 1..n in order | BST ordering fixes left/right value ranges |
| "how many" + recursive sub-sizes | Root loop + multiply subcounts |
| Classic n ≤ 19 | O(n²) memo sufficient |

**Contrast with Day 7 (Divide and Conquer):**

| Merge Sort | Unique BSTs |
|---|---|
| Split array at mid | Split value range at each possible root |
| Two recursive calls | Many root choices in a loop |
| Combine via merge | Combine via **multiply** subcounts, **sum** over roots |
| Returns sorted data | Returns a single count |

**How a strong solver thinks before coding:**
1. *"Root i splits into left size i-1 and right size n-i."*
2. *"Independent choices → multiply G(left)*G(right)."*
3. *"Sum over all roots i."*
4. *"G(0)=1 for empty subtree."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all insert orders of 1..n** | O(n!) with deduplication — wasteful |
| **Fibonacci-style guess** | Catalan ≠ Fibonacci — wrong counts |
| **Hardcode [1,1,2,5,14,...]** | Fails for general n in one function |
| **Build every tree explicitly** | Correct count but TLE — need counting recurrence |
| **Forget G(0)=1** | Root=1 with empty left breaks multiply |

**The insight brute force misses:** You never need to construct trees — only count left × right for each root choice.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Unique BSTs II #95](https://leetcode.com/problems/unique-binary-search-trees-ii/) | Generate all trees — backtracking build |
| [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) | Today's next quest — D&C on operators |
| [Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/) | Day 10 — check one tree, not count |

---

## 📖 Walkthrough

`n = 3` — compute bottom-up:

```
G(0) = 1
G(1) = G(0)*G(0) = 1

G(2):
  root=1: G(0)*G(1) = 1*1 = 1
  root=2: G(1)*G(0) = 1*1 = 1
  G(2) = 2

G(3):
  root=1: G(0)*G(2) = 1*2 = 2
  root=2: G(1)*G(1) = 1*1 = 1
  root=3: G(0)*G(2) = 1*2 = 2
  G(3) = 5 ✓
```

Five trees (shapes only):

```
  1       1       2       3       3
   \       \     / \     /       /
    2       3    1   3   2       1
     \             /
      3           1
  (five distinct structures)
```

---

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(int n) {
        if (n <= 1) return 1;
        if (memo[n]) return memo[n];
        int total = 0;
        for (int i = 1; i <= n; i++)
            total += dfs(i - 1) * dfs(n - i);
        return memo[n] = total;
    }
public:
    int numTrees(int n) {
        memo.assign(n + 1, 0);
        return dfs(n);
    }
};
```

### Python
```python
class Solution:
    def numTrees(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 1: return 1
            if k in memo: return memo[k]
            total = sum(dfs(i - 1) * dfs(k - i) for i in range(1, k + 1))
            memo[k] = total
            return total
        return dfs(n)
```

### Java
```java
class Solution {
    private int[] memo;
    public int numTrees(int n) {
        memo = new int[n + 1];
        return dfs(n);
    }
    private int dfs(int n) {
        if (n <= 1) return 1;
        if (memo[n] != 0) return memo[n];
        int total = 0;
        for (int i = 1; i <= n; i++)
            total += dfs(i - 1) * dfs(n - i);
        return memo[n] = total;
    }
}
```

**Complexity:** O(n^2) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Unique BST count"** → Catalan root loop.
- **Root i** → left size `i-1`, right size `n-i`, multiply counts.
- **`G(0) = 1`** → empty subtree is one valid shape.
- **Sum over roots** → not Fibonacci.
- **Memo on n** → each size once, O(n²).

> 🎯 **Pattern Unlocked:** Catalan Recursion

---

*One quest down. Next: split expressions at operators — Day 7 combine on steroids. →*
