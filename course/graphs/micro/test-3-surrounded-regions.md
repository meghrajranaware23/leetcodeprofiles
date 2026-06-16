<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 3

> [Surrounded Regions #130](https://leetcode.com/problems/surrounded-regions/) · Medium · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Surrounded Regions on LeetCode](https://leetcode.com/problems/surrounded-regions/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Mark border `'O'` cells first — which regions stay safe? No peeking until you've genuinely tried.

---

## The Problem

Given an `m×n` board of `'X'` and `'O'`, **capture** all `'O'` regions that are **not** connected to the border.

Replace surrounded `'O'` with `'X'`. Border-connected `'O'` regions survive.

```
Input:  board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
Output: [
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","O","X","X"]
]
Explanation: Corner (3,1) touches border — stays 'O'. Interior (1,1),(1,2),(2,2) flip to 'X'.
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 3/4 grid DFS — **multi-source flood from border**, invert the capture logic.

**Hint 1:** `'O'` on the **border** (first/last row or column) can never be surrounded — DFS from every border `'O'`.

**Hint 2:** During border dfs, temporarily mark safe cells `'#'` (or another marker) instead of `'X'`.

**Hint 3:** After border floods, scan the board: `'#'` → restore `'O'`; remaining `'O'` → flip to `'X'`.

**Hint 4:** 4-direction dfs — same DIRS as Flood Fill and Number of Islands.

**Hint 5:** Think **inverse**: find `'O'` that *escape* to border, not `'O'` to capture directly.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Border DFS + interior flip (Day 4 grid flood variant)

| Clue in the problem | What it signals |
|---|---|
| "surrounded" / "capture" | Interior vs border-connected |
| Flip `'O'` → `'X'` | In-place mutation |
| Border cells special | Multi-source dfs from edges |
| 4-direction | Standard grid graph |
| Don't return count | Modify board in place |

**Contrast with Day 4 quests:**

| Number of Islands #200 | Surrounded Regions #130 |
|---|---|
| Count `'1'` components | Classify `'O'` by border reachability |
| Sink all found land | Mark safe `'O'`, X the rest |
| Restart from every land | Start only from border `'O'` |

**How a strong solver thinks before coding:**
1. *"Flood from every border O — mark '#'."*
2. *"Second pass: # → O, O → X."*
3. *"Interior O never touched by border dfs → captured."*
4. *"Corner O on border survives — trace Example 1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Flood each interior O and check if flood touches border** | Repeated work — O(m·n) per region |
| **BFS from every O without border-first strategy** | Revisits; harder to reason |
| **8-direction connectivity** | Wrong — diagonal doesn't save an region |
| **Flip border O to X** | Border O must survive |
| **Copy entire board first** | Works but extra space; in-place marker is standard |

**The insight brute force misses:** Only **non-border-connected** `'O'` get captured — find the safe set first, flip everything else.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Count enclave 1-cells not touching grid boundary."*

Same border flood on land cells — count interior land not reached from border.

**Scenario:** *"Can you escape a maze if leaving the grid counts as success?"*

Border dfs models "can reach outside" — same reachability from edge.

**30-second check:** *"Border O flood → mark safe → X leftover O."*

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

- **"Surrounded"** → not connected to border → flip.
- **Inverse thinking** — save border-connected `'O'`, X the rest.
- **Day 2 multi-source idea** — enqueue/dfs all border `'O'` first.
- **Temp marker `'#'`** — in-place visited like sinking islands.

E-Rank complete: degrees, BFS time, DFS components, grid floods, sized clones — now border logic.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

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
