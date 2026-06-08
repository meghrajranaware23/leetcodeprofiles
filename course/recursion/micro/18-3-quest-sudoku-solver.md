# ⚔ Quest: Sudoku Solver

> **Day 18** · [Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sudoku Solver on LeetCode](https://leetcode.com/problems/sudoku-solver/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Cell Assignment Backtracking**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Cell Assignment Backtracking

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Draw the decision tree. Trace choose / explore / unchoose.

```
Apply Cell Assignment Backtracking step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool valid(vector<vector<char>>& b, int r, int c, char d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d) return false;
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (b[br + i][bc + j] == d) return false;
        return true;
    }
    bool dfs(vector<vector<char>>& b, int idx) {
        if (idx == 81) return true;
        int r = idx / 9, c = idx % 9;
        if (b[r][c] != '.') return dfs(b, idx + 1);
        for (char d = '1'; d <= '9'; d++) {
            if (!valid(b, r, c, d)) continue;
            b[r][c] = d;
            if (dfs(b, idx + 1)) return true;
            b[r][c] = '.';
        }
        return false;
    }
public:
    void solveSudoku(vector<vector<char>>& board) { dfs(board, 0); }
};
```

### Python
```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def valid(r, c, d):
            for i in range(9):
                if board[r][i] == d or board[i][c] == d: return False
            br, bc = (r // 3) * 3, (c // 3) * 3
            for i in range(3):
                for j in range(3):
                    if board[br + i][bc + j] == d: return False
            return True
        def dfs(idx):
            if idx == 81: return True
            r, c = divmod(idx, 9)
            if board[r][c] != '.': return dfs(idx + 1)
            for d in '123456789':
                if not valid(r, c, d): continue
                board[r][c] = d
                if dfs(idx + 1): return True
                board[r][c] = '.'
            return False
        dfs(0)
```

### Java
```java
class Solution {
    public void solveSudoku(char[][] board) { dfs(board, 0); }
    private boolean dfs(char[][] b, int idx) {
        if (idx == 81) return true;
        int r = idx / 9, c = idx % 9;
        if (b[r][c] != '.') return dfs(b, idx + 1);
        for (char d = '1'; d <= '9'; d++) {
            if (!valid(b, r, c, d)) continue;
            b[r][c] = d;
            if (dfs(b, idx + 1)) return true;
            b[r][c] = '.';
        }
        return false;
    }
    private boolean valid(char[][] b, int r, int c, char d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d) return false;
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (b[br + i][bc + j] == d) return false;
        return true;
    }
}
```

**Complexity:** O(9^m) time · O(9) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Cell Assignment Backtracking"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Cell Assignment Backtracking

---

*Both quests complete. Head to the checkpoint. →*
