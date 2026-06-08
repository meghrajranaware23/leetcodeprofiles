# ⚔ Quest: Minimum Jumps to Reach Home

> **Day 27** · [Minimum Jumps to Reach Home #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Jumps to Reach Home on LeetCode](https://leetcode.com/problems/minimum-jumps-to-reach-home/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Jumps to Reach Home #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **BFS with Forbidden States**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS with Forbidden States

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

Apply BFS with Forbidden States step by step on this graph.
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
    int minimumJumps(int forbidden, int a, int b, int x) {
        const int MAX = 6000;
        vector<int> dist(2 * MAX + 1, -1);
        queue<pair<int,int>> q;
        q.push({0, 0});
        dist[0] = 0;
        while (!q.empty()) {
            auto [pos, back] = q.front(); q.pop();
            if (pos == x) return dist[pos];
            int fwd = pos + a;
            if (fwd <= 2 * MAX && fwd != forbidden && dist[fwd] == -1) {
                dist[fwd] = dist[pos] + 1;
                q.push({fwd, 0});
            }
            if (!back) {
                int bwd = pos - b;
                if (bwd >= 0 && bwd != forbidden && dist[bwd] == -1) {
                    dist[bwd] = dist[pos] + 1;
                    q.push({bwd, 1});
                }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def minimumJumps(self, forbidden: int, a: int, b: int, x: int) -> int:
        MAX = 6000
        dist = [-1] * (2 * MAX + 1)
        q = deque([(0, 0)])
        dist[0] = 0
        while q:
            pos, back = q.popleft()
            if pos == x: return dist[pos]
            fwd = pos + a
            if fwd <= 2 * MAX and fwd != forbidden and dist[fwd] == -1:
                dist[fwd] = dist[pos] + 1
                q.append((fwd, 0))
            if not back:
                bwd = pos - b
                if bwd >= 0 and bwd != forbidden and dist[bwd] == -1:
                    dist[bwd] = dist[pos] + 1
                    q.append((bwd, 1))
        return -1
```

### Java
```java
class Solution {
    public int minimumJumps(int forbidden, int a, int b, int x) {
        final int MAX = 6000;
        int[] dist = new int[2 * MAX + 1];
        Arrays.fill(dist, -1);
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        dist[0] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == x) return dist[cur[0]];
            int fwd = cur[0] + a;
            if (fwd <= 2 * MAX && fwd != forbidden && dist[fwd] == -1) {
                dist[fwd] = dist[cur[0]] + 1;
                q.offer(new int[]{fwd, 0});
            }
            if (cur[1] == 0) {
                int bwd = cur[0] - b;
                if (bwd >= 0 && bwd != forbidden && dist[bwd] == -1) {
                    dist[bwd] = dist[cur[0]] + 1;
                    q.offer(new int[]{bwd, 1});
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(MAX) time · O(MAX) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"BFS with Forbidden States"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** BFS with Forbidden States

---

*One quest down. The next one builds on this pattern. →*
