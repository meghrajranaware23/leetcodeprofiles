<!-- hand-authored -->
# ⚔ Quest: Unique Paths

> **Day 7** · [Unique Paths #62](https://leetcode.com/problems/unique-paths/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Paths on LeetCode](https://leetcode.com/problems/unique-paths/)**

> ⚔ **Hunter's rule:** Fill a small **2D dp grid** by hand — each cell = sum of cell above + cell left. Not take/skip; not min-cost (Day 8).

---

## The Problem

See the full problem statement on LeetCode: **[Unique Paths #62](https://leetcode.com/problems/unique-paths/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 7 **Grid Path Counting** — `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.

- Only moves: **right** and **down**
- **Base:** first row and first column all `1` (only one way along each edge)
- **Answer:** `dp[m-1][n-1]`
- Space: one row rolling left-to-right works

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Path Counting

**How to identify this from the problem statement:**
- "How many unique paths" → **count** with `+`
- Grid from top-left to bottom-right
- Fixed move set (R/D) — no obstacles here

| Keyword / phrase | What it signals |
|---|---|
| "count paths" / "how many ways" | Sum DP on grid |
| "only right and down" | Two predecessors per cell |
| "minimum path sum" | **Day 8** — use `min`, not sum of counts |

**Why this pattern works:** Every path to `(i,j)` either arrives from above or from the left — disjoint last steps, so counts add.

**How a strong solver thinks before coding:**
1. *"dp[i][j] = paths to (i,j)."*
2. *"Edge cells = 1."*
3. *"Interior: top + left."*
4. *"1D rolling row if space matters."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS enumerating every path** | O(C(m+n,m)) paths — exponential in grid size |
| **Using min like Minimum Path Sum** | Wrong operator — today is **count** |
| **Day 6 take/skip on rows** | No skip/take decision — sum neighbors |
| **Leaving dp[0][0] unset** | Must be 1 |

**The insight brute force misses:** Path count satisfies the same recurrence as Pascal's triangle — each cell only needs two neighbors.

```
3×3 dp table:
  1 1 1
  1 2 3
  1 3 6  → 6 paths
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | 1D prefix instead of 2D | Sum smaller states |
| [Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/) | Cell costs, use **min** | Day 8 — same grid shape |
| [Unique Paths II #63](https://leetcode.com/problems/unique-paths-ii/) | Obstacles → 0 ways | Same recurrence where open |

---

## 📖 Walkthrough

**Example:** `m=3, n=3`

```
Fill order (row by row):

     j=0  j=1  j=2
i=0   1    1    1
i=1   1    2    3
i=2   1    3    6

(1,1): 1+1=2
(1,2): 1+2=3
(2,1): 1+2=3
(2,2): 3+3=6
```

Rolling 1D: `dp[j] += dp[j-1]` each row reproduces the same answer.

> 💡 **The insight:** Grid counting is 2D prefix summation — every cell aggregates **all** routes, not the best one.

---

## Solution

### C++
```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];
        return dp[n - 1];
    }
}
```

**Complexity:** O(m · n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Count grid paths R/D"** → sum top + left.
- **"Not Day 6"** — no take/skip fork visual.
- **"Not Day 8"** — no cell costs, no `min`.
- **"First row/col = 1"** — edge base cases.

> 🎯 **Pattern Unlocked:** Grid Path Counting

---

*Both quests complete. Head to the checkpoint. →*
