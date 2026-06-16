<!-- hand-authored -->
# ⚔ Quest: Triangle

> **Day 8** · [Triangle #120](https://leetcode.com/problems/triangle/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Triangle on LeetCode](https://leetcode.com/problems/triangle/)**

> ⚔ **Hunter's rule:** Copy the **bottom row** into dp, then walk **upward** — each cell picks min of the two cells below. Not top-down grid fill.

---

## The Problem

See the full problem statement on LeetCode: **[Triangle #120](https://leetcode.com/problems/triangle/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 8 **Bottom-Up Min-Cost DP**.

- `dp[j]` after processing row `i` = min path sum from `(i,j)` to bottom
- Init: `dp = triangle[last row]`
- For `i` from `n-2` down to `0`: `dp[j] = triangle[i][j] + min(dp[j], dp[j+1])`
- Answer: `dp[0]` at apex

Top-down recursion works with memo — bottom-up 1D row is the clean tabulation.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Min-Cost DP

**How to identify this from the problem statement:**
- Triangle structure — each cell has two children below
- **Minimum path sum** top to bottom
- Natural base case: **bottom row** costs known

| Keyword / phrase | What it signals |
|---|---|
| "minimum total" on triangle | Bottom-up min |
| "adjacent row below" | Two successors → min of both |
| "grid path sum" | **Min Path Sum** — top-left fill, not triangle |

**Why bottom-up:** Every cell only needs answers from row `i+1` — process from base upward.

**How a strong solver thinks before coding:**
1. *"dp[j] = min sum from (i,j) to base."*
2. *"Seed bottom row."*
3. *"Loop i upward; j left to right."*
4. *"Return dp[0]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every root-to-leaf path** | O(2^n) paths |
| **Top-down without memo** | Exponential recomputation |
| **Grid min formula on triangle** | Wrong topology — children are `j` and `j+1` below |
| **min without adding triangle[i][j]** | Must add current cell cost |

**The insight brute force misses:** Only one row of dp needed — each upward step merges two bottom values.

```
     2
    3 4
   6 5 7
  4 1 8 1

Bottom-up dp row evolves: [4,1,8,1] → [7,6,10] → [9,10] → [11]
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Fill direction | Pattern |
|---|---|---|
| [Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/) | Top-down grid | Grid min-cost |
| [Falling Path Sum #931](https://leetcode.com/problems/falling-path-sum/) | Bottom-up or top-down | Min on staggered grid |
| [Unique Paths #62](https://leetcode.com/problems/unique-paths/) | Count, not min | Day 7 |

---

## 📖 Walkthrough

**Example triangle:**

```
    2
   3 4
  6 5 7
 4 1 8 1

Row 3 (base): dp = [4, 1, 8, 1]
Row 2: dp[0]=6+min(4,1)=7, dp[1]=5+min(1,8)=6, dp[2]=7+min(8,1)=8 → [7,6,8] → keep [7,6,8] for j=0,1,2
Actually j only 0..2: [7, 6, 10] after full row 2
Row 1: [3+min(7,6), 4+min(6,10)] = [9, 10]
Row 0: 2+min(9,10) = 11
```

> 💡 **The insight:** Triangle min-cost is grid min-cost with a **different fill order** — start at the base, merge upward.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle.back();
        for (int i = n - 2; i >= 0; i--)
            for (int j = 0; j <= i; j++)
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
        return dp[0];
    }
};
```

### Python
```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = triangle[-1][:]
        for i in range(len(triangle) - 2, -1, -1):
            for j in range(i + 1):
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])
        return dp[0]
```

### Java
```java
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int j = 0; j < n; j++) dp[j] = triangle.get(n - 1).get(j);
        for (int i = n - 2; i >= 0; i--)
            for (int j = 0; j <= i; j++)
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
        return dp[0];
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Triangle min path"** → bottom-up 1D dp.
- **"min(dp[j], dp[j+1])"** → two children below.
- **"Not Unique Paths"** → optimize cost, not count.
- **"Fill upward"** → opposite direction from Min Path Sum grid.

> 🎯 **Pattern Unlocked:** Bottom-Up Min-Cost DP

---

*Both quests complete. Head to the checkpoint. →*
