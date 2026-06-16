<!-- hand-authored -->
# ⚔ Quest: Out of Boundary Paths

> **Day 25** · [Out of Boundary Paths #576](https://leetcode.com/problems/out-of-boundary-paths/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Out of Boundary Paths on LeetCode](https://leetcode.com/problems/out-of-boundary-paths/)**

> ⚔ **Hunter's rule:** State is `(row, col)` per move step. `dp[i][j]` = paths at cell after t moves. Walk off grid → add to `ans`. NOT knapsack.

---

## The Problem

See the full problem statement on LeetCode: **[Out of Boundary Paths #576](https://leetcode.com/problems/out-of-boundary-paths/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **3D State Grid DP** — third dimension is **move count** (outer loop).

Initialize `dp[startRow][startColumn] = 1`. For each of `maxMove` steps:
- From every cell with paths, try 4 directions
- In bounds → add to `ndp[ni][nj]`
- Out of bounds → add to `ans` (mod 10⁹+7)

Swap `dp = ndp` each step. Return `ans` — **not** a cell value.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 3D State Grid DP

**How to identify this from the problem statement:**
- Grid with 4-direction moves
- Fixed number of moves `maxMove`
- Count paths that **exit** the grid (not stay inside)

| Keyword / phrase | What it signals |
|---|---|
| "out of boundary" / "move off grid" | Accumulate exits in ans |
| "maxMove" / "exactly N moves" | Outer loop over steps |
| "number of paths" | Sum transitions, mod MOD |

**Day 11 contrast:** Unique paths **stay inside** grid until destination. Here paths **leave** — exits count toward answer.

**Day 17 contrast:** No items, no capacity — this is spatial + time counting.

**How a strong solver thinks before coding:**
1. *"dp[start]=1, ans=0."*
2. *"Loop maxMove times."*
3. *"4 dirs: in-bounds → ndp, else ans += dp[i][j]."*
4. *"Return ans % MOD."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS all paths length maxMove** | Exponential branching |
| **Return dp inside grid** | Question asks paths **leaving**, not staying |
| **3D array dp[m][n][move]** | Works but 2D rolling per step saves space |

**The insight brute force misses:** After each step, only the **distribution of paths across cells** matters. Exits accumulate in `ans` — you never need to track paths that already left.

```
m=2,n=2, maxMove=2, start=(0,0)

After move 1: paths at (1,0) and (0,1); exits from (0,0) going up/left
After move 2: more spread + more exits
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Unique Paths #62](https://leetcode.com/problems/unique-paths/) | Stay in grid to corner | Day 11 |
| [Longest String Chain #1048](https://leetcode.com/problems/longest-string-chain/) | Sort + word chain | Today's other quest |
| [Knight Probability in Chessboard #688](https://leetcode.com/problems/knight-probability-in-chessboard/) | Stay inside, probability | Inverse question |

---

## 📖 Walkthrough

**m=2, n=2, maxMove=2, startRow=0, startColumn=0**

```
Initial: dp[0][0]=1

Move 1:
  from (0,0): right→(0,1), down→(1,0), up→exit(+1), left→exit(+1)
  ndp[0][1]=1, ndp[1][0]=1, ans=2

Move 2:
  from (0,1): down→exit, left→(0,0), ...
  from (1,0): right→(1,1), up→(0,0), ...
  accumulate exits + ndp

Final ans = total exit paths mod 1e9+7
```

Third dimension = move index in outer loop.

> 💡 **The insight:** `(row, col, steps)` memoized by rolling 2D layer each step — exits tracked separately.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const int MOD = 1e9 + 7;
        vector<vector<long>> dp(m, vector<long>(n, 0));
        dp[startRow][startColumn] = 1;
        long ans = 0;
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        for (int move = 1; move <= maxMove; move++) {
            vector<vector<long>> ndp(m, vector<long>(n, 0));
            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++) {
                    if (!dp[i][j]) continue;
                    for (auto& d : dirs) {
                        int ni = i + d[0], nj = j + d[1];
                        if (ni >= 0 && ni < m && nj >= 0 && nj < n)
                            ndp[ni][nj] = (ndp[ni][nj] + dp[i][j]) % MOD;
                        else ans = (ans + dp[i][j]) % MOD;
                    }
                }
            dp = ndp;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * n for _ in range(m)]
        dp[startRow][startColumn] = 1
        ans = 0
        for _ in range(maxMove):
            ndp = [[0] * n for _ in range(m)]
            for i in range(m):
                for j in range(n):
                    if not dp[i][j]: continue
                    for di, dj in ((-1,0),(1,0),(0,-1),(0,1)):
                        ni, nj = i + di, j + dj
                        if 0 <= ni < m and 0 <= nj < n:
                            ndp[ni][nj] = (ndp[ni][nj] + dp[i][j]) % MOD
                        else:
                            ans = (ans + dp[i][j]) % MOD
            dp = ndp
        return ans
```

### Java
```java
class Solution {
    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        final int MOD = 1_000_000_007;
        long[][] dp = new long[m][n];
        dp[startRow][startColumn] = 1;
        long ans = 0;
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        for (int move = 0; move < maxMove; move++) {
            long[][] ndp = new long[m][n];
            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++) {
                    if (dp[i][j] == 0) continue;
                    for (int[] d : dirs) {
                        int ni = i + d[0], nj = j + d[1];
                        if (ni >= 0 && ni < m && nj >= 0 && nj < n)
                            ndp[ni][nj] = (ndp[ni][nj] + dp[i][j]) % MOD;
                        else ans = (ans + dp[i][j]) % MOD;
                    }
                }
            dp = ndp;
        }
        return (int) ans;
    }
}
```

**Complexity:** O(N · m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"(row, col, steps)"** — steps = outer loop, not 3D array required.
- **"Exits → ans"** — not dp inside grid.
- **"ndp each move"** — fresh layer per step.
- **"Not knapsack"** — no items or capacity.

If you tried brute force first, that's fine — the breakthrough is **rolling 2D grid with exit accumulator**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** 3D State Grid DP

---

*Both quests complete. Head to the checkpoint. →*
