<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 2

> [Word Search #79](https://leetcode.com/problems/word-search/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Word Search on LeetCode](https://leetcode.com/problems/word-search/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Mark cells `#` on enter, restore on exit. Trace `"ABCCED"` on the classic board.

---

## The Problem

Given an `m×n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells (horizontal or vertical neighbors). **The same cell may not be used more than once** in a path.

```
Input:  board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

Input:  board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

Input:  board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

---

## 💡 Hints

> 🎯 **What's being tested:** Grid DFS backtracking with mark/unmark (Day 16).

**Hint 1:** Outer double loop — try starting dfs from **every** cell `(i,j)` with `k=0`.

**Hint 2:** State inside dfs: `(i, j, k)` where `k` is index into `word`. Base: `k == len(word)` → true.

**Hint 3:** Fail fast: out of bounds, cell already visited, or `board[i][j] != word[k]`.

**Hint 4:** **Mark:** save `board[i][j]`, set to `'#'`. Explore 4 neighbors with `k+1`. **Unmark:** restore saved char before returning to parent.

**Hint 5:** Why mark? Without it, `"ABCB"` would reuse `B` and incorrectly return true. Mark/unmark replaces `used[][]` when you mutate the board in place.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Backtracking — mark/unmark DFS

| Clue | Signal |
|---|---|
| "2D grid" + "search word" | DFS from each start cell |
| "adjacent cells" / "no reuse" | Mark visited; restore on backtrack |
| "return true/false" | Short-circuit on first successful path |
| character match at step k | `board[i][j] == word[k]` guard |

**Contrast with path-building backtrack:**

| Subsets / Permutations | Word Search |
|---|---|
| `path` push/pop on array | Implicit path via `(i,j,k)` |
| shared `path` vector | mark/unmark on grid cell |
| generate all | exist — stop at first find |

**How a strong solver thinks before coding:**
1. *"Try every start cell."*
2. *"dfs(i,j,k): match char, mark, 4 directions, unmark."*
3. *"k==len(word) → true."*
4. *"Restore cell before return — siblings need clean grid."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS without visited tracking per path** | Reuses cells in same path |
| **Global visited[][] across all starts** | Blocks valid paths from other starts |
| **Forget to unmark** | `'#'` leaks; later paths see blocked cells |
| **8-direction movement** | Problem allows 4-direction only |

**The insight brute force misses:** Each dfs path needs its **own** visited set — in-place mark/unmark on backtrack gives that without copying the board.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Word Search II — find all words from a dictionary in the grid."*

Day 30 / Trie + backtrack — multiple words, prune with trie. Same mark/unmark core.

**Scenario:** *"Is there a path visiting every cell exactly once?"*

Hamiltonian path on grid — same mark/unmark, different success condition.

**30-second check:** *"Grid dfs, k index into word, mark #, 4 neighbors, unmark."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int m, n;
    bool dfs(vector<vector<char>>& b, string& w, int i, int j, int k) {
        if (k == (int)w.size()) return true;
        if (i < 0 || j < 0 || i >= m || j >= n || b[i][j] != w[k]) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        bool found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1) ||
                     dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
        b[i][j] = tmp;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        m = board.size(); n = board[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
};
```

### Python
```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(i, j, k):
            if k == len(word): return True
            if i < 0 or j < 0 or i >= m or j >= n or board[i][j] != word[k]: return False
            tmp, board[i][j] = board[i][j], '#'
            found = any(dfs(i + di, j + dj, k + 1) for di, dj in ((1,0),(-1,0),(0,1),(0,-1)))
            board[i][j] = tmp
            return found
        return any(dfs(i, j, 0) for i in range(m) for j in range(n))
```

### Java
```java
class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
    private boolean dfs(char[][] b, String w, int i, int j, int k) {
        if (k == w.length()) return true;
        if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] != w.charAt(k)) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        boolean found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1) ||
                        dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
        b[i][j] = tmp;
        return found;
    }
}
```

**Complexity:** O(m · n · 4^L) time · O(L) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **Day 16 grid template** — choose cell, explore 4 dirs, unchoose restore.
- **`k` index tracks word progress** — no separate path string needed.
- **Mark with `#`** — O(1) visited; restore before returning to parent.
- **Start from every cell** — outer loops + dfs.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int m, n;
    bool dfs(vector<vector<char>>& b, string& w, int i, int j, int k) {
        if (k == (int)w.size()) return true;
        if (i < 0 || j < 0 || i >= m || j >= n || b[i][j] != w[k]) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        bool found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1) ||
                     dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
        b[i][j] = tmp;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        m = board.size(); n = board[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
};
```

### Python
```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(i, j, k):
            if k == len(word): return True
            if i < 0 or j < 0 or i >= m or j >= n or board[i][j] != word[k]: return False
            tmp, board[i][j] = board[i][j], '#'
            found = any(dfs(i + di, j + dj, k + 1) for di, dj in ((1,0),(-1,0),(0,1),(0,-1)))
            board[i][j] = tmp
            return found
        return any(dfs(i, j, 0) for i in range(m) for j in range(n))
```

### Java
```java
class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
    private boolean dfs(char[][] b, String w, int i, int j, int k) {
        if (k == w.length()) return true;
        if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] != w.charAt(k)) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        boolean found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1) ||
                        dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
        b[i][j] = tmp;
        return found;
    }
}
```

**Complexity:** O(m · n · 4^L) time · O(L) space
