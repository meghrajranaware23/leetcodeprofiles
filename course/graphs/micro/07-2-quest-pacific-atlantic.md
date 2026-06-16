<!-- hand-authored -->
# ⚔ Quest: Pacific Atlantic Water Flow

> **Day 7** · [Pacific Atlantic Water Flow #417](https://leetcode.com/problems/pacific-atlantic-water-flow/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Pacific Atlantic Water Flow on LeetCode](https://leetcode.com/problems/pacific-atlantic-water-flow/)**

> ⚔ **Hunter's rule:** Mark Pacific border cells (top + left) and Atlantic border (bottom + right). DFS **inward** only to neighbors with height ≥ current. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Pacific Atlantic Water Flow #417](https://leetcode.com/problems/pacific-atlantic-water-flow/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Boundary DFS** — two floods from ocean-touching edges. Move to neighbor `(nr,nc)` only if `heights[nr][nc] >= heights[r][c]` (reverse rain: ocean can "flow up" into the map). Answer = cells reachable in **both** sets.

If you're stuck after 5 minutes: don't pour water from each cell downhill — that's slow and tricky. Start at the oceans and walk uphill.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Boundary DFS

**How to identify this from the problem statement:**
- Two oceans on **border rows/cols** → natural DFS seeds
- "Can flow to both" → intersection of two reachability sets
- Height constraint on movement → only climb to equal/higher neighbor in reverse model

| Keyword / phrase | What it signals |
|---|---|
| "Pacific" / "Atlantic" / border | Seed all edge cells per ocean |
| "water can flow to" | Reverse: ocean reaches cell if path of non-decreasing height inward |
| "return coordinates" | Cells in `pac AND atl` |
| "heights[i][j]" | Edge weight = must be ≥ when walking from ocean |

**Why this pattern works:** Water flowing down from A to ocean means, reversed, ocean can walk "up" to A through non-decreasing heights. Border DFS captures exactly that.

**How a strong solver thinks before coding:**
1. *"Pacific seeds: top row + left column."*
2. *"Atlantic seeds: bottom row + right column."*
3. *"dfs(r,c, reach): reach[r][c]=true; neighbor if h[nr][nc] >= h[r][c]."*
4. *"Return (i,j) where pac[i][j] && atl[i][j]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS downhill from every cell to both oceans** | O(cells × path) — heavy per-cell work |
| **Check only paths that go strictly down** | Miss that flow can zigzag |
| **One combined flood** | Can't distinguish Pacific-only vs both |
| **Sort cells by height descending** | Overkill — two border DFS passes suffice |

**The insight brute force misses:** Oceans are the sources; **border inward** beats **cell outward**.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Enclaves #1020](https://leetcode.com/problems/number-of-enclaves/) | One border flood; count remaining land | Outside-in from edge |
| [Number of Closed Islands #1254](https://leetcode.com/problems/number-of-closed-islands/) | Border flood + count enclosed components | D-Rank test |
| [Surrounded Regions #130](https://leetcode.com/problems/surrounded-regions/) | Border flood on 'O', flip inner | Same outside-in idea |

---

## 📖 Walkthrough

**Two border floods; intersect.**

```
heights:     Pacific DFS from top+left:    Atlantic from bottom+right:
2 4          pac reaches {0,0,(0,1),(1,0)...}   atl reaches from opposite edges
1 3          Cells (0,1)=4 and (1,0)=1 often in BOTH
             → both oceans can "reach" them in reverse model
```

```
Border seed (Pac):  (0,j) for all j, (i,0) for all i
dfs(r,c):
  reach[r][c] = true
  for neighbor (nr,nc):
    if !reach[nr][nc] and heights[nr][nc] >= heights[r][c]:
      dfs(nr, nc)
```

> 💡 **The insight:** You're not simulating physics forward — you're asking which cells each ocean can **cover** walking uphill from its coastline.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& reach, int r, int c) {
        reach[r][c] = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && !reach[nr][nc] && h[nr][nc] >= h[r][c])
                dfs(h, reach, nr, nc);
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        m = heights.size(); n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n)), atl(m, vector<bool>(n));
        for (int i = 0; i < m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m - 1, j); }
        vector<vector<int>> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
        return res;
    }
};
```

### Python
```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])
        pac, atl = set(), set()
        def dfs(r, c, seen, prev):
            if (r, c) in seen or r < 0 or c < 0 or r >= m or c >= n or heights[r][c] < prev:
                return
            seen.add((r, c))
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                dfs(r + dr, c + dc, seen, heights[r][c])
        for i in range(m):
            dfs(i, 0, pac, heights[i][0]); dfs(i, n - 1, atl, heights[i][n - 1])
        for j in range(n):
            dfs(0, j, pac, heights[0][j]); dfs(m - 1, j, atl, heights[m - 1][j])
        return [[i, j] for i in range(m) for j in range(n) if (i, j) in pac and (i, j) in atl]
```

### Java
```java
class Solution {
    private int m, n;
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        m = heights.length; n = heights[0].length;
        boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];
        for (int i = 0; i < m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m - 1, j); }
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j]) res.add(List.of(i, j));
        return res;
    }
    private void dfs(int[][] h, boolean[][] reach, int r, int c) {
        reach[r][c] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && !reach[nr][nc] && h[nr][nc] >= h[r][c])
                dfs(h, reach, nr, nc);
        }
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two oceans on the border"** → Two separate border DFS passes.
- **"Flow to ocean" reversed** → Walk from ocean to cell with heights non-decreasing inward.
- **"Both oceans"** → Intersect reach sets — not one flood.
- **"Not Day 6 multi-source dist"** → Reachability bitsets, not layer distances.

> 🎯 **Pattern Unlocked:** Boundary DFS — oceans seed the flood; intersect for dual reach.

---

*One quest down. Next: enclaves = land the border flood never erased. →*
