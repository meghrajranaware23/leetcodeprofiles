<!-- hand-authored -->
# ⚔ Quest: Word Search

> **Day 16** · [Word Search #79](https://leetcode.com/problems/word-search/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Search on LeetCode](https://leetcode.com/problems/word-search/)**

> ⚔ **Hunter's rule:** Trace one path on paper. Mark cells with `#` when entered — erase the mark when backing out. That's backtracking on a grid.

---

## The Problem

Given an `m × n` board of characters and a string `word`, return `true` if `word` exists in the grid.

The word must be constructed from letters of sequentially adjacent cells (horizontal or vertical). **Same cell may not be used twice in one path.**

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

**Hint 1:** `dfs(i, j, k)` — cell `(i,j)` must match `word[k]`.

**Hint 2:** Before exploring neighbors: save `board[i][j]`, set to `'#'`. After all 4 directions: restore saved char.

**Hint 3:** Outer loop: try starting dfs from **every** cell with `k=0`. Return true on first success.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid DFS Backtracking (mark/unmark)

| Clue | Signal |
|---|---|
| "adjacent cells" / "path in grid" | 4-direction DFS |
| "cannot reuse cell" | In-place mark |
| find existence (not all paths) | Return true early — still must unmark on failure |

**How a strong solver thinks before coding:**
1. *"Match word[k] at each step — k is path length."*
2. *"Mark before recurse, unmark after — even when returning false."*
3. *"Try every starting cell."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS without unmarking** | `'#'` cells block valid paths through other routes |
| **Global visited[][] not cleared per path** | Must unmark when backtracking, not only at end |
| **8-direction movement** | Problem specifies 4-direction only |
| **Single start at (0,0)** | Word may start anywhere |

---

## 🔗 Same Pattern, Other Problems

| Problem | Twist |
|---|---|
| [Word Search #79](https://leetcode.com/problems/word-search/) | Single word, existence |
| [Word Search II #212](https://leetcode.com/problems/word-search-ii/) | Multiple words + Trie (Day 30) |
| [Letter Case Permutation #784](https://leetcode.com/problems/letter-case-permutation/) | Today's quest 2 — index not grid |

---

## 📖 Walkthrough

Partial trace for `"SEE"` on the example board:

```
Start (1,3): 'S' k=0 ✓ → mark
  (1,2): 'E' k=1 ✓ → mark
    (2,2): 'E' k=2 ✓ → mark
      k=3 == len → return true ✓
```

For `"ABCB"`: path would need to revisit `B` at (0,1) — mark prevents reuse → false.

---

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
---

## 💭 What Should Have Clicked in Your Mind?

- **Mark/unmark** → Grid version of push/pop.
- **k indexes word** → Path length without storing coordinates.
- **Unmark on false paths too** → Siblings need clean board.

> 🎯 **Pattern Unlocked:** Grid DFS Backtracking

---

*One quest down. Next: binary branches on a string. →*
