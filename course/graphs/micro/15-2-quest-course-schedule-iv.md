<!-- hand-authored -->
# ⚔ Quest: Course Schedule IV

> **Day 15** · [Course Schedule IV #1462](https://leetcode.com/problems/course-schedule-iv/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Course Schedule IV on LeetCode](https://leetcode.com/problems/course-schedule-iv/)**

> ⚔ **Hunter's rule:** Precompute `reach[u][v]` for all pairs. Query `[u,v]` → is u a (direct/indirect) prereq of v?

---

## The Problem

See the full problem statement on LeetCode: **[Course Schedule IV #1462](https://leetcode.com/problems/course-schedule-iv/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Same graph as Course Schedule: edge b→a for prereq `[a,b]`. DFS from each course `i`, mark all reachable courses in `reach[i][*]`. Query checks one matrix cell.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Transitive Closure (reachability matrix)

**How to identify this from the problem statement:**
- Prerequisite DAG + batch queries
- "Direct or indirect" = transitive reachability
- n ≤ 200 — O(n · (V+E)) precompute fits

| Keyword / phrase | What it signals |
|---|---|
| "is u prerequisite of v" | reach[u][v] |
| Multiple queries | Precompute, don't BFS per query |
| Same prereq format as #207 | Edge b → a |

**Why this pattern works:** All queries share one static graph — pay O(n·(V+E)) once, answer each query in O(1).

**How a strong solver thinks before coding:**
1. *"Build adj, reach[n][n] = false."*
2. *"For each i: dfs(i,i) marking reach[i][v]=true."*
3. *"Query [u,v]: return reach[u][v]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS/DFS per query** | O(Q · (V+E)) redundant |
| **Kahn peel per query** | Absurd — graph is static |
| **Union-Find** | Undirected — wrong |

**The insight:** Day 14's per-node DFS, stored in a matrix, reused for all queries.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [All Ancestors in DAG #2192](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/) | List not boolean | Day 14 |
| [Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/) | Pick min quiet in reachable set | C-test 3 |
| [Floyd Warshall](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm) | All-pairs shortest path | Related closure idea |

---

## 📖 Walkthrough

```
numCourses=3, prereqs=[[1,0],[2,1]]
Queries: [[0,1],[0,2],[1,2],[2,0]]

Graph: 0→1→2

reach[0]: [1,2]
reach[1]: [2]
reach[2]: []

[0,1]→false  [0,2]→false  [1,2]→true  [2,0]→false
```

> 💡 **The insight:** Query [u,v] asks "must u come before v?" → reach[u][v].

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<vector<bool>> reach;
    void dfs(int src, int u) {
        for (int v : adj[u]) {
            if (!reach[src][v]) {
                reach[src][v] = true;
                dfs(src, v);
            }
        }
    }
public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        adj.assign(numCourses, {});
        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
        reach.assign(numCourses, vector<bool>(numCourses));
        for (int i = 0; i < numCourses; i++) dfs(i, i);
        vector<bool> res;
        for (auto& q : queries) res.push_back(reach[q[0]][q[1]]);
        return res;
    }
};
```

### Python
```python
class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        adj = [[] for _ in range(numCourses)]
        for a, b in prerequisites:
            adj[b].append(a)
        reach = [[False] * numCourses for _ in range(numCourses)]
        def dfs(src, u):
            for v in adj[u]:
                if not reach[src][v]:
                    reach[src][v] = True
                    dfs(src, v)
        for i in range(numCourses):
            dfs(i, i)
        return [reach[u][v] for u, v in queries]
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private boolean[][] reach;
    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) adj.get(p[1]).add(p[0]);
        reach = new boolean[numCourses][numCourses];
        for (int i = 0; i < numCourses; i++) dfs(i, i);
        List<Boolean> res = new ArrayList<>();
        for (int[] q : queries) res.add(reach[q[0]][q[1]]);
        return res;
    }
    private void dfs(int src, int u) {
        for (int v : adj.get(u)) {
            if (!reach[src][v]) {
                reach[src][v] = true;
                dfs(src, v);
            }
        }
    }
}
```

**Complexity:** O(V² + V · E) time · O(V²) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Many queries, static graph."** → precompute closure.
- **"Same prereq graph as #207."** → edge b→a.
- **"reach[u][v] not reach[v][u]."** → direction matters.
- **"Day 14 ancestor DFS → boolean matrix."**

> 🎯 **Pattern Unlocked:** Transitive Closure

---

*One quest down. Next: weighted time bubble on a tree-DAG. →*
