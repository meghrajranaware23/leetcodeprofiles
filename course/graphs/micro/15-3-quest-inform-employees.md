<!-- hand-authored -->
# ⚔ Quest: Time Needed to Inform Employees

> **Day 15** · [Time Needed to Inform All Employees #1376](https://leetcode.com/problems/time-needed-to-inform-all-employees/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Time Needed to Inform All Employees on LeetCode](https://leetcode.com/problems/time-needed-to-inform-all-employees/)**

> ⚔ **Hunter's rule:** Build manager → subordinates adjacency. DFS from head: time = informTime[u] + max(child times). Subtrees run in parallel.

---

## The Problem

See the full problem statement on LeetCode: **[Time Needed to Inform All Employees #1376](https://leetcode.com/problems/time-needed-to-inform-all-employees/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Each employee has exactly one manager (or -1 for head) — a **tree-DAG**. Not BFS levels: after head informs two managers, their subtrees proceed simultaneously. Answer = longest weighted root-to-leaf path.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree-DAG Time Bubble (max path DFS)

**How to identify this from the problem statement:**
- Single head, unique manager per employee
- informTime[i] = duration of i's call to direct reports
- All employees must be informed → entire tree covered

| Keyword / phrase | What it signals |
|---|---|
| "manager[i]" / hierarchy | Build parent → children adj |
| "time to inform all" | Max depth path, not sum |
| "parallel" implicit | Max over children, not sum |

**Why this pattern works:** Manager waits for each direct report call sequentially, but different branches don't block each other — bottleneck is the slowest branch.

**How a strong solver thinks before coding:**
1. *"adj[manager].push(employee)."*
2. *"dfs(u) = informTime[u] + max(dfs(v) for v in children)."*
3. *"Leaf returns 0 (no inform time spent below)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sum all informTime values** | Overcounts — parallel branches |
| **BFS level count only** | Ignores varying informTime weights |
| **Simulate minute-by-minute** | Unnecessary — DFS max suffices |

**The insight:** Classic tree DP — return max child completion + own inform cost.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/) | Min quiet in reachable | C-test — DAG DFS |
| [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Tree path sum | Similar max-path bubble |
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | General weighted graph | Dijkstra — later rank |

---

## 📖 Walkthrough

```
n=6, head=2, manager=[2,2,-1,2,2,2], informTime=[0,0,1,0,0,0]

        2 (inform=1)
    / / | \ \ \
   0 1  3 4  5  (all direct reports)

Each child leaf: dfs=0
dfs(2) = 1 + max(0,0,0,0,0) = 1
```

> 💡 **The insight:** Star graph from head — answer is just head's informTime.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    int dfs(int u, vector<int>& informTime) {
        int best = 0;
        for (int v : adj[u])
            best = max(best, informTime[u] + dfs(v, informTime));
        return best;
    }
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        adj.assign(n, {});
        for (int i = 0; i < n; i++)
            if (manager[i] != -1) adj[manager[i]].push_back(i);
        return dfs(headID, informTime);
    }
};
```

### Python
```python
class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        adj = [[] for _ in range(n)]
        for i, m in enumerate(manager):
            if m != -1:
                adj[m].append(i)
        def dfs(u):
            return max((informTime[u] + dfs(v) for v in adj[u]), default=0)
        return dfs(headID)
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < n; i++)
            if (manager[i] != -1) adj.get(manager[i]).add(i);
        return dfs(headID, informTime);
    }
    private int dfs(int u, int[] informTime) {
        int best = 0;
        for (int v : adj.get(u)) best = Math.max(best, informTime[u] + dfs(v, informTime));
        return best;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"One manager each → tree."**
- **"Parallel subtrees → max not sum."**
- **"informTime[u] added once per child path."**
- **"Not multi-hop reachability — weighted tree bubble."**

> 🎯 **Pattern Unlocked:** Tree-DAG Time Bubble

---

*Both quests complete. Head to the checkpoint. →*
