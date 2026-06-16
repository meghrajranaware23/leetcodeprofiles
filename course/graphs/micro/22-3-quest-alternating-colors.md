<!-- hand-authored -->
# ⚔ Quest: Shortest Path with Alternating Colors

> **Day 22** · [Shortest Path with Alternating Colors #1129](https://leetcode.com/problems/shortest-path-with-alternating-colors/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Path with Alternating Colors on LeetCode](https://leetcode.com/problems/shortest-path-with-alternating-colors/)**

> ⚔ **Hunter's rule:** State BFS — queue `(node, lastColor, steps)`. Bridge to Day 10: visited key is state, not node alone. Start `(0, -1, 0)`.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Path with Alternating Colors #1129](https://leetcode.com/problems/shortest-path-with-alternating-colors/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS with state `(node, lastColor)`** — `dist[node][0]` and `dist[node][1]` for path ending on red vs blue edge.

Skip edge if `edgeColor == prevColor`. Answer: `min(dist[i][0], dist[i][1])` or -1.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS with State (node, color)

**How to identify this from the problem statement:**
- Shortest path in unweighted graph with **alternating** edge color constraint
- Separate red and blue adjacency lists
- Node alone insufficient — need last edge color in state

| Keyword / phrase | What it signals |
|---|---|
| "alternating colors" / "alternate red and blue" | BFS `(node, lastColor)` |
| "shortest path" unweighted | BFS layers — not Dijkstra |
| "Open Lock" style | Day 10 state BFS — string vs (node,color) |
| "weighted" | Dijkstra — not this |

**Why this pattern works:** Path validity depends on previous edge color — enlarge state space; first visit to `(v, color)` = shortest steps (BFS).

**How a strong solver thinks before coding:**
1. *"Build red adj and blue adj (directed by color)."*
2. *"dist[n][2]=-1; queue (0,-1,0); dist[0][0]=dist[0][1]=0."*
3. *"Skip neighbor if same color as prev."*
4. *"Ans[i]=min of two colors or -1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS with visited[node] only** | Misses valid path arriving on different color |
| **DFS** | Doesn't guarantee shortest |
| **Dijkstra** | Unweighted — BFS sufficient |
| **Two separate BFS on red-only graph** | Must alternate — need paired state |

**The insight brute force misses:** Day 10 lesson — when "where you are" isn't enough, add state dimension. Here: `(node, lastColor)`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) (Day 10) | String state | BFS on abstract states |
| [Genetic Mutation](Day 10 quest) | String + bank | State BFS |
| [Shortest Path in Binary Matrix #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | No extra state | Plain Day 8 BFS |

Same queue skeleton — **state tuple grows.**

---

## 📖 Walkthrough

```
Node 0, prev=-1 (any first edge ok)
Red 0→1: dist[1][0]=1, queue (1,0,1)
From (1,0): skip red; blue 1→x if exists

Node 2 reachable on red ending OR blue ending?
  ans[2] = min(dist[2][0], dist[2][1]) if either != -1
```

> 💡 **The insight:** Two ways to arrive at node 5 — on red or blue — are different BFS states, like two different lock strings in Day 10.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<pair<int,int>>> adj(n);
        for (auto& e : redEdges) adj[e[0]].push_back({e[1], 0});
        for (auto& e : blueEdges) adj[e[0]].push_back({e[1], 1});
        vector<vector<int>> dist(n, vector<int>(2, -1));
        queue<tuple<int,int,int>> q;
        q.push({0, -1, 0});
        dist[0][0] = dist[0][1] = 0;
        while (!q.empty()) {
            auto [u, prev, d] = q.front(); q.pop();
            for (auto [v, color] : adj[u]) {
                if (color == prev) continue;
                if (dist[v][color] == -1) {
                    dist[v][color] = d + 1;
                    q.push({v, color, d + 1});
                }
            }
        }
        vector<int> ans(n);
        for (int i = 0; i < n; i++) {
            if (dist[i][0] == -1 && dist[i][1] == -1) ans[i] = -1;
            else if (dist[i][0] == -1) ans[i] = dist[i][1];
            else if (dist[i][1] == -1) ans[i] = dist[i][0];
            else ans[i] = min(dist[i][0], dist[i][1]);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in redEdges: adj[u].append((v, 0))
        for u, v in blueEdges: adj[u].append((v, 1))
        dist = [[-1, -1] for _ in range(n)]
        q = deque([(0, -1, 0)])
        dist[0][0] = dist[0][1] = 0
        while q:
            u, prev, d = q.popleft()
            for v, color in adj[u]:
                if color == prev: continue
                if dist[v][color] == -1:
                    dist[v][color] = d + 1
                    q.append((v, color, d + 1))
        ans = []
        for i in range(n):
            if dist[i][0] == -1 and dist[i][1] == -1: ans.append(-1)
            elif dist[i][0] == -1: ans.append(dist[i][1])
            elif dist[i][1] == -1: ans.append(dist[i][0])
            else: ans.append(min(dist[i][0], dist[i][1]))
        return ans
```

### Java
```java
class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<int[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : redEdges) adj[e[0]].add(new int[]{e[1], 0});
        for (int[] e : blueEdges) adj[e[0]].add(new int[]{e[1], 1});
        int[][] dist = new int[n][2];
        for (int[] row : dist) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, -1, 0});
        dist[0][0] = dist[0][1] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] e : adj[cur[0]]) {
                if (e[1] == cur[1]) continue;
                if (dist[e[0]][e[1]] == -1) {
                    dist[e[0]][e[1]] = cur[2] + 1;
                    q.offer(new int[]{e[0], e[1], cur[2] + 1});
                }
            }
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            if (dist[i][0] == -1 && dist[i][1] == -1) ans[i] = -1;
            else if (dist[i][0] == -1) ans[i] = dist[i][1];
            else if (dist[i][1] == -1) ans[i] = dist[i][0];
            else ans[i] = Math.min(dist[i][0], dist[i][1]);
        }
        return ans;
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Alternate colors"** → state is (node, lastColor), not node.
- **"prev=-1 at start"** → first edge unrestricted.
- **"Day 10 bridge"** → state-space BFS on graph with side constraint.
- **"dist[node][2]"** → two visit tracks per node.

If BFS marked only `visited[node]`, you'd reject valid alternating paths.

> 🎯 **Pattern Unlocked:** BFS with State (node, color)

---

*Both quests complete. Head to the checkpoint. →*
