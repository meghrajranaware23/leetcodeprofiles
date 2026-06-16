<!-- hand-authored -->
# ⚔ Quest: Course Schedule

> **Day 11** · [Course Schedule #207](https://leetcode.com/problems/course-schedule/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Course Schedule on LeetCode](https://leetcode.com/problems/course-schedule/)**

> ⚔ **Hunter's rule:** Draw the prereq graph. For `[a, b]`, draw edge **b → a** ("b before a"). Trace Kahn's peel or 3-color DFS by hand.

---

## The Problem

See the full problem statement on LeetCode: **[Course Schedule #207](https://leetcode.com/problems/course-schedule/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Cycle detection** — can you peel every course, or does a cycle block you?

If stuck: build `indeg[]`, queue all courses with no prerequisites. Each pop frees dependents. If `seen < numCourses`, a cycle remains.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Cycle Detection (Kahn's / in-degree peel)

**How to identify this from the problem statement:**
- "Prerequisites" + "can you finish" → directed dependency graph
- Impossible ⟺ cycle exists
- No need to output order — only yes/no

| Keyword / phrase | What it signals |
|---|---|
| "prerequisites" / "must take B before A" | Edge B → A; count in-degrees |
| "can you finish all" | Cycle detection |
| `[a, b]` pair | b is prereq of a |
| Returns boolean | Peel count vs n |

**Why this pattern works:** A course waits on its in-degree. Zero in-degree = ready now. If peeling stalls before all nodes are processed, remaining nodes sit on a directed cycle.

**How a strong solver thinks before coding:**
1. *"Edge direction: prereq → course."*
2. *"Build adj + indeg."*
3. *"Queue indeg==0, peel, decrement neighbors."*
4. *"seen == numCourses?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every course ordering** | O(n!) |
| **DFS without gray/black** | Can't distinguish cycle from cross-edge |
| **Union-Find** | Undirected connectivity — wrong tool |
| **BFS from arbitrary start** | Doesn't detect global cycle |

**The insight:** Kahn's peel is O(V+E). If you can't remove all nodes, the leftover subgraph has a cycle.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Course Schedule II #210](https://leetcode.com/problems/course-schedule-ii/) | Return the order | Same peel, record queue pops |
| [Alien Dictionary #269](https://leetcode.com/problems/alien-dictionary/) | Build graph from words | Kahn + cycle check |
| [Parallel Courses #1136](https://leetcode.com/problems/parallel-courses/) | Count layers while peeling | Kahn with level tracking |

Same skeleton: in-degree table, queue of zeros, peel.

---

## 📖 Walkthrough

```
numCourses = 4
prerequisites = [[1,0],[2,1],[3,2],[1,3]]

Graph:  0 → 1 → 2 → 3
        ↑___________|     cycle!

indeg: 0→0, 1→2, 2→1, 3→1
Queue start: [0]
Peel 0 → indeg[1]=1
Queue empty, seen=1 < 4 → false ✗
```

> 💡 **The insight:** You don't need to find the cycle explicitly — stalled peel *is* the proof.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indeg[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (!indeg[i]) q.push(i);
        int seen = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            seen++;
            for (int v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return seen == numCourses;
    }
};
```

### Python
```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        indeg = [0] * numCourses
        for a, b in prerequisites:
            adj[b].append(a)
            indeg[a] += 1
        q = deque(i for i in range(numCourses) if indeg[i] == 0)
        seen = 0
        while q:
            u = q.popleft()
            seen += 1
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return seen == numCourses
```

### Java
```java
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indeg[p[0]]++; }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.offer(i);
        int seen = 0;
        while (!q.isEmpty()) {
            int u = q.poll(); seen++;
            for (int v : adj.get(u)) if (--indeg[v] == 0) q.offer(v);
        }
        return seen == numCourses;
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Prerequisites → directed graph."** → b before a means edge b→a.
- **"Can finish all?"** → no cycle ⟺ full peel succeeds.
- **"Kahn = queue of indeg 0."** → today's preview from the concept page.
- **"seen < n"** → cycle without finding it explicitly.

Alternative: 3-color DFS from concept page — gray neighbor = cycle. Kahn is cleaner when you also need ordering (#210 next).

> 🎯 **Pattern Unlocked:** Cycle Detection via In-Degree Peel

---

*One quest down. Next: return the actual course order. →*
