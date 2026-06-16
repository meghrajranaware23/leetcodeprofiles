<!-- hand-authored -->
# ⚔ Quest: Find Eventual Safe States

> **Day 12** · [Find Eventual Safe States #802](https://leetcode.com/problems/find-eventual-safe-states/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find Eventual Safe States on LeetCode](https://leetcode.com/problems/find-eventual-safe-states/)**

> ⚔ **Hunter's rule:** A safe node reaches a dead end on *every* path. Build the **reverse graph**. Peel from **out-degree 0** (sinks), not in-degree 0.

---

## The Problem

See the full problem statement on LeetCode: **[Find Eventual Safe States #802](https://leetcode.com/problems/find-eventual-safe-states/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Reverse Kahn:** Node with no outgoing edges is trivially safe. When you mark `u` safe, its predecessors might become safe if all their successors are safe — peel when `outdeg[p]` hits 0.

Alternative from Day 11: 3-color DFS — gray in cycle = unsafe. Reverse Kahn avoids recursion depth issues.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Reverse Topological Sort (out-degree peel)

**How to identify this from the problem statement:**
- Directed graph given as adjacency list
- "Eventual safe" = every path from node terminates
- Nodes in cycles are **not** safe

| Keyword / phrase | What it signals |
|---|---|
| "eventual safe states" | Reverse peel from sinks |
| "every path leads to terminal" | Sink = out-degree 0 |
| Nodes in cycle unsafe | Never become outdeg 0 in reverse peel |

**Why this pattern works:** Working backward from known-safe sinks, a node becomes safe only when all nodes it points to are safe — exactly decrementing out-degree on the reverse graph.

**How a strong solver thinks before coding:**
1. *"Build rev[v] = predecessors of v."*
2. *"outdeg[u] = len(graph[u])."*
3. *"Queue outdeg==0, mark safe, peel rev edges."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Forward Kahn (Day 11 style)** | Finds sources, not safe sinks |
| **Simulate every path** | Exponential |
| **3-color DFS only** | Works but reverse Kahn is cleaner here |
| **BFS from each node** | O(n · (V+E)) redundant |

**The insight:** Reverse the dependency — "safe" propagates from terminal nodes upward.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Course Schedule #207](https://leetcode.com/problems/course-schedule/) | Forward peel | Day 11 — indeg 0 |
| [Find All Possible Recipes #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) | Forward with string nodes | Next quest |
| [Minimum Height Trees #310](https://leetcode.com/problems/minimum-height-trees/) | Peel degree-1 leaves | Day 16 cousin |

---

## 📖 Walkthrough

```
graph = [[1,2],[2,3],[5],[0],[5],[],[]]

Node 6: no outgoing → safe, outdeg=0 → queue
Node 5: no outgoing → safe
Peel rev: from 5, node 4's outdeg→0 → safe
... nodes 0,1,2 in cycle never fully peel → unsafe

Safe: [2,4,5,6] (example-dependent — trace yours!)
```

> 💡 **The insight:** Cycle nodes keep outdeg > 0 forever — they never enter the safe set.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<vector<int>> rev(n);
        vector<int> outdeg(n);
        for (int u = 0; u < n; u++)
            for (int v : graph[u]) {
                rev[v].push_back(u);
                outdeg[u]++;
            }
        queue<int> q;
        vector<bool> safe(n);
        for (int i = 0; i < n; i++)
            if (!outdeg[i]) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            safe[u] = true;
            for (int p : rev[u])
                if (--outdeg[p] == 0) q.push(p);
        }
        vector<int> res;
        for (int i = 0; i < n; i++) if (safe[i]) res.push_back(i);
        return res;
    }
};
```

### Python
```python
class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        rev = [[] for _ in range(n)]
        outdeg = [0] * n
        for u in range(n):
            for v in graph[u]:
                rev[v].append(u)
                outdeg[u] += 1
        q = deque(i for i in range(n) if outdeg[i] == 0)
        safe = [False] * n
        while q:
            u = q.popleft()
            safe[u] = True
            for p in rev[u]:
                outdeg[p] -= 1
                if outdeg[p] == 0:
                    q.append(p)
        return [i for i in range(n) if safe[i]]
```

### Java
```java
class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        List<List<Integer>> rev = new ArrayList<>();
        int[] outdeg = new int[n];
        for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
        for (int u = 0; u < n; u++)
            for (int v : graph[u]) { rev.get(v).add(u); outdeg[u]++; }
        Queue<Integer> q = new ArrayDeque<>();
        boolean[] safe = new boolean[n];
        for (int i = 0; i < n; i++) if (outdeg[i] == 0) q.offer(i);
        while (!q.isEmpty()) {
            int u = q.poll(); safe[u] = true;
            for (int p : rev.get(u)) if (--outdeg[p] == 0) q.offer(p);
        }
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) if (safe[i]) res.add(i);
        return res;
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Safe = always reaches terminal."** → start from terminals (outdeg 0).
- **"Reverse graph + outdeg peel."** → Day 12's flip of Day 11 Kahn.
- **"Cycle nodes stuck with outdeg > 0."** → never marked safe.
- **"Could use 3-color DFS"** → yes, but reverse Kahn matches today's theme.

> 🎯 **Pattern Unlocked:** Reverse Topological Sort

---

*One quest down. Next: forward Kahn with string nodes and supplies. →*
