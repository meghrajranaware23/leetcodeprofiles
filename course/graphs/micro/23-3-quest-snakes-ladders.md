# ⚔ Quest: Snakes and Ladders

> **Day 23** · [Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Snakes and Ladders on LeetCode](https://leetcode.com/problems/snakes-and-ladders/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Implicit Graph BFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Implicit Graph BFS

**How to identify this from the problem statement:**
- Look for graph structure keywords — "node", "edge", "connected", "adjacent", "grid"
- Ask: do I need **BFS** (shortest/levels), **DFS** (connectivity/cycles), or **Dijkstra** (weighted)?
- Check if the input is explicit graph, implicit grid, or abstract state space

| Keyword / phrase | What it signals |
|---|---|
| "shortest path" / "minimum steps" | BFS with visited set |
| "connected" / "reachable" | DFS/BFS from source |
| "grid" / "island" / "matrix" | Grid-as-graph traversal |
| "prerequisites" / "dependencies" | Topological sort |
| "bipartite" / "two teams" | Graph 2-coloring |
| "union" / "merge" / "equivalent" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |

**Why this pattern works:** Graphs model relationships. The pattern names how you explore those relationships — wavefront (BFS), deep dive (DFS), or group merging (UF).

**How a strong solver thinks before coding:**
1. *"What are my nodes? What are my edges?"*
2. *"BFS, DFS, Dijkstra, or Union-Find?"*
3. *"Draw a small example graph and trace by hand."*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all paths without pruning** | Exponential time — visited set is essential |
| **DFS for shortest unweighted path** | BFS guarantees minimum steps |
| **Dijkstra on unweighted graph** | BFS is simpler and equally correct |
| **Nested loops for connectivity** | O(n²) when O(n) BFS/DFS works |

**The insight brute force misses:** Name the exploration strategy. BFS for shortest, DFS for connectivity, Dijkstra for weighted — then add a visited set.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small graph before reading the code:

```
Graph:  A — B — C
        |       |
        D — E   F

Apply Implicit Graph BFS step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    int snakesAndLadders(vector<vector<int>>& board) {
        int n = board.size();
        auto label = [&](int s) {
            int r = (s - 1) / n, c = (s - 1) % n;
            if (r % 2) c = n - 1 - c;
            return make_pair(n - 1 - r, c);
        };
        vector<int> dist(n * n + 1, -1);
        queue<int> q;
        q.push(1); dist[1] = 0;
        while (!q.empty()) {
            int s = q.front(); q.pop();
            if (s == n * n) return dist[s];
            for (int d = 1; d <= 6; d++) {
                int ns = s + d;
                if (ns > n * n) break;
                auto [r, c] = label(ns);
                if (board[r][c] != -1) ns = board[r][c];
                if (dist[ns] == -1) { dist[ns] = dist[s] + 1; q.push(ns); }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        def label(s):
            r, c = divmod(s - 1, n)
            if r % 2: c = n - 1 - c
            return n - 1 - r, c
        dist = [-1] * (n * n + 1)
        q = deque([1])
        dist[1] = 0
        while q:
            s = q.popleft()
            if s == n * n: return dist[s]
            for d in range(1, 7):
                ns = s + d
                if ns > n * n: break
                r, c = label(ns)
                if board[r][c] != -1: ns = board[r][c]
                if dist[ns] == -1:
                    dist[ns] = dist[s] + 1
                    q.append(ns)
        return -1
```

### Java
```java
class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        int[] dist = new int[n * n + 1];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(1); dist[1] = 0;
        while (!q.isEmpty()) {
            int s = q.poll();
            if (s == n * n) return dist[s];
            for (int d = 1; d <= 6; d++) {
                int ns = s + d;
                if (ns > n * n) break;
                int r = (ns - 1) / n, c = (ns - 1) % n;
                if (r % 2 == 1) c = n - 1 - c;
                r = n - 1 - r;
                if (board[r][c] != -1) ns = board[r][c];
                if (dist[ns] == -1) { dist[ns] = dist[s] + 1; q.offer(ns); }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n²) time · O(n²) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Implicit Graph BFS"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Implicit Graph BFS

---

*Both quests complete. Head to the checkpoint. →*
