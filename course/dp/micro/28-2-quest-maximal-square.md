<!-- hand-authored -->
# ⚔ Quest: Maximal Square

> **Day 28** · [Maximal Square #221](https://leetcode.com/problems/maximal-square/) · Medium · 15 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximal Square on LeetCode](https://leetcode.com/problems/maximal-square/)**

> ⚔ **Hunter's rule:** At each `'1'`, ask: *"What's the side length of the largest square with bottom-right corner here?"* Draw the `dp` grid — min of top, left, diagonal + 1.

---

## The Problem

See the full problem statement on LeetCode: **[Maximal Square #221](https://leetcode.com/problems/maximal-square/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** **Grid side-length DP** (Day 28 concept) — not path counting, not LCS.

- `dp[i][j]` = side length of largest all-1 square ending at `(i,j)` (1-indexed with padding)
- Transition: `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1` when `matrix[i-1][j-1]=='1'`
- Track `maxSide`; return **`maxSide * maxSide`** (area)

If stuck: fill the 3×3 block in the concept page by hand.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 2D Grid DP Synthesis — side-length geometry

| Keyword / phrase | What it signals |
|---|---|
| "maximal square" / "largest square" | Side-length dp at each cell |
| "binary matrix" / "grid of 0 and 1" | 2D table, neighbor dependency |
| "area" / "number of cells" | Square side² — don't return side only |

**Day 11 bridge:** Unique paths sum neighbors; here **min** three neighbors (all sides must fit).

**How a strong solver thinks before coding:**
1. *"State = side length at (i,j), not area yet."*
2. *"Why min? Square needs top, left, and diagonal support."*
3. *"+1 padding row/col — skip boundary checks."*
4. *"Global maxSide → return maxSide²."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every square at every cell** | O(m²n²) — redundant rechecks |
| **DFS flood-fill per cell** | Recomputes same squares exponentially |
| **Use max instead of min of neighbors** | Overcounts — one short side breaks the square |
| **Return maxSide not area** | Off-by-interpretation — problem asks for cell count |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Count Square Submatrices #1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) | Count all sizes | Same min-neighbor +1; sum all dp |
| [Maximal Rectangle #85](https://leetcode.com/problems/maximal-rectangle/) | Rectangles not squares | Histogram stack — harder cousin |

---

## 📖 Walkthrough

**matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]**

```
dp side lengths (1-indexed interior):

  1 0 1 0 0
  1 0 1 1 2
  1 1 1 2 3   ← maxSide = 3
  1 0 0 1 0

At (3,5): min(2,2,3)+1 = 3 → 3×3 square exists
Answer = 3² = 9
```

> 💡 **The insight:** Each cell stores **one integer** — the side of the biggest square anchored there. The code is row-major table fill.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), maxSide = 0;
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]}) + 1;
                    maxSide = max(maxSide, dp[i][j]);
                }
            }
        return maxSide * maxSide;
    }
};
```

### Python
```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_side = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                    max_side = max(max_side, dp[i][j])
        return max_side * max_side
```

### Java
```java
class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length, maxSide = 0;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        return maxSide * maxSide;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Side length at (i,j)"** — not area until the final return.
- **"min of three neighbors"** — square needs all sides; one weak link caps size.
- **"Padding row/col of zeros"** — clean 1-indexed transition.
- **"2D Grid DP Synthesis"** — geometry on a grid, not interval split.

> 🎯 **Pattern Unlocked:** 2D Grid DP Synthesis — maximal square side-length

---

*One quest down. Next: 1D partition max-sum. →*
