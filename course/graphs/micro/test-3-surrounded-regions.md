# ⚔ E-Rank Test — Problem 3

> [Surrounded Regions #130](https://leetcode.com/problems/surrounded-regions/) · Medium · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Surrounded Regions on LeetCode](https://leetcode.com/problems/surrounded-regions/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Surrounded Regions #130](https://leetcode.com/problems/surrounded-regions/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the E-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which graph technique does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for graph structure clues
- Determine exploration strategy
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example graph."*
2. *"What are my nodes and edges?"*
3. *"BFS, DFS, Dijkstra, or Union-Find?"*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

Graph problems have natural O(V+E) traversal solutions. Brute force typically means exponential path enumeration or missing visited sets. Trust the exploration strategy.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    int m, n;
    void dfs(vector<vector<char>>& board, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] != 'O') return;
        board[r][c] = '#';
        dfs(board, r + 1, c); dfs(board, r - 1, c);
        dfs(board, r, c + 1); dfs(board, r, c - 1);
    }
public:
    void solve(vector<vector<char>>& board) {
        m = board.size(); if (!m) return;
        n = board[0].size();
        for (int i = 0; i < m; i++) {
            dfs(board, i, 0); dfs(board, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(board, 0, j); dfs(board, m - 1, j);
        }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                board[i][j] = board[i][j] == '#' ? 'O' : (board[i][j] == 'O' ? 'X' : board[i][j]);
    }
};
```

### Python
```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board: return
        m, n = len(board), len(board[0])
        def dfs(r, c):
            if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != 'O': return
            board[r][c] = '#'
            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
        for i in range(m):
            dfs(i, 0); dfs(i, n - 1)
        for j in range(n):
            dfs(0, j); dfs(m - 1, j)
        for i in range(m):
            for j in range(n):
                board[i][j] = 'O' if board[i][j] == '#' else ('X' if board[i][j] == 'O' else board[i][j])
```

### Java
```java
class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) { dfs(board, i, 0); dfs(board, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(board, 0, j); dfs(board, m - 1, j); }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                board[i][j] = board[i][j] == '#' ? 'O' : (board[i][j] == 'O' ? 'X' : board[i][j]);
    }
    private void dfs(char[][] board, int r, int c) {
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != 'O') return;
        board[r][c] = '#';
        dfs(board, r + 1, c); dfs(board, r - 1, c);
        dfs(board, r, c + 1); dfs(board, r, c - 1);
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a E-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
