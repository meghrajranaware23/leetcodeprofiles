<!-- hand-authored -->
# ⚔ Quest: Course Schedule II

> **Day 11** · [Course Schedule II #210](https://leetcode.com/problems/course-schedule-ii/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Course Schedule II on LeetCode](https://leetcode.com/problems/course-schedule-ii/)**

> ⚔ **Hunter's rule:** Same graph as #207 — but record each course as you peel it. Empty order = cycle.

---

## The Problem

See the full problem statement on LeetCode: **[Course Schedule II #210](https://leetcode.com/problems/course-schedule-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Same peel as Course Schedule #207. **Difference:** append each popped course to `order`. If `len(order) < numCourses`, return `[]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Topological Sort (Kahn's algorithm)

**How to identify this from the problem statement:**
- Identical setup to #207
- Output: any valid take order, or empty if impossible
- Order of queue pops = valid schedule

| Keyword / phrase | What it signals |
|---|---|
| "return the ordering" | Record Kahn peel sequence |
| "if impossible return empty" | Cycle check via peel count |
| Same `[a,b]` prereq format | Edge b → a |

**Why this pattern works:** Each peeled node has no remaining prerequisites — safe to take now. Recording pops builds a valid topological order.

**How a strong solver thinks before coding:**
1. *"Copy #207 skeleton."*
2. *"On pop: order.append(u)."*
3. *"Return order if len==n else []."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS postorder reverse** | Works but easy to forget cycle flag |
| **Sort all permutations** | O(n!) |
| **Peel without recording** | Solves #207 only, not #210 |

**The insight:** Kahn's queue order *is* the topological sort. One loop does both cycle check and ordering.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Course Schedule #207](https://leetcode.com/problems/course-schedule/) | Boolean only | Same peel, no recording |
| [Sequence Reconstruction #444](https://leetcode.com/problems/sequence-reconstruction/) | Unique order check | Kahn + verify single choice |
| [Find All Possible Recipes #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) | String nodes, supplies as indeg-0 | Day 12 — same peel |

---

## 📖 Walkthrough

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

    0 ──→ 1 ──→ 3
    └──→ 2 ──→ 3

indeg: 0→0, 1→1, 2→1, 3→2
Queue: [0] → pop 0, order=[0]
Queue: [1,2] → pop 1,2, order=[0,1,2]
Queue: [3] → pop 3, order=[0,1,2,3] ✓
```

> 💡 **The insight:** Multiple valid orders exist — any peel order is accepted.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indeg[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (!indeg[i]) q.push(i);
        vector<int> order;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return (int)order.size() == numCourses ? order : vector<int>{};
    }
};
```

### Python
```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(numCourses)]
        indeg = [0] * numCourses
        for a, b in prerequisites:
            adj[b].append(a)
            indeg[a] += 1
        q = deque(i for i in range(numCourses) if indeg[i] == 0)
        order = []
        while q:
            u = q.popleft()
            order.append(u)
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return order if len(order) == numCourses else []
```

### Java
```java
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indeg[p[0]]++; }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.offer(i);
        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int u = q.poll(); order[idx++] = u;
            for (int v : adj.get(u)) if (--indeg[v] == 0) q.offer(v);
        }
        return idx == numCourses ? order : new int[0];
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"#207 + record pops."** → minimal diff from previous quest.
- **"Empty list = cycle."** → same seen-count check.
- **"Queue order is one valid topo."** → don't overthink uniqueness.

> 🎯 **Pattern Unlocked:** Topological Sort — Kahn's peel with recording

---

*Both quests complete. Head to the checkpoint. →*
