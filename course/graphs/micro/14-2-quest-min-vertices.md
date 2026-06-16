<!-- hand-authored -->
# ⚔ Quest: Minimum Number of Vertices

> **Day 14** · [Minimum Number of Vertices to Reach All Nodes #1557](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Number of Vertices to Reach All Nodes on LeetCode](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/)**

> ⚔ **Hunter's rule:** Which nodes have **no incoming edges**? That's your entire answer — no BFS needed.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Number of Vertices to Reach All Nodes #1557](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Mark `hasIn[v] = true` for every edge `[u, v]`. Return all `i` where `hasIn[i]` is false. DAG guarantee means every non-source has at least one incoming edge.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** In-Degree Zero Source Scan

**How to identify this from the problem statement:**
- Directed graph, guaranteed no cycle
- "Reach all nodes" from minimum starts
- Output: the actual source vertices

| Keyword / phrase | What it signals |
|---|---|
| "minimum vertices to reach all" | Count in-degree 0 |
| "smallest set of starting nodes" | Sources only |
| DAG implied by problem structure | No cycle detection step |

**Why this pattern works:** Any node with an incoming edge is reachable from some predecessor — you never need to start there. Only in-degree-0 nodes are mandatory.

**How a strong solver thinks before coding:**
1. *"Boolean hasIn[n] = false."*
2. *"For each edge u→v: hasIn[v] = true."*
3. *"Return all i where !hasIn[i]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS/DFS from every node, pick minimum cover** | O(n · (V+E)) — overkill |
| **Kahn's full peel** | Works but unnecessary — one pass suffices |
| **Union-Find** | Wrong tool — directed reachability |

**The insight:** O(V+E) scan beats any traversal. Structure of DAG makes sources obvious.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [All Ancestors in DAG #2192](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/) | Accumulate ancestors | Next quest |
| [Find Minimum Time #2039](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/) | Time on DAG | Different combine |
| Course Schedule sources | Peel from indeg 0 | Day 11 — dynamic peel |

---

## 📖 Walkthrough

```
n=6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]

    0 → 1    3 → 4
    ↓        ↓
    2 → 5    (4→2)

hasIn: 0✗ 1✓ 2✓ 3✗ 4✓ 5✓
Answer: [0, 3]
```

> 💡 **The insight:** Node 3 can't be reached from 0 — it's its own source component.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<bool> hasIn(n);
        for (auto& e : edges) hasIn[e[1]] = true;
        vector<int> res;
        for (int i = 0; i < n; i++)
            if (!hasIn[i]) res.push_back(i);
        return res;
    }
};
```

### Python
```python
class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        has_in = [False] * n
        for _, v in edges:
            has_in[v] = True
        return [i for i in range(n) if not has_in[i]]
```

### Java
```java
class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        boolean[] hasIn = new boolean[n];
        for (List<Integer> e : edges) hasIn[e.get(1)] = true;
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) if (!hasIn[i]) res.add(i);
        return res;
    }
}
```

**Complexity:** O(V + E) time · O(V) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Reach all from minimum starts."** → who has no predecessor?
- **"One pass over edges."** → no graph traversal needed.
- **"DAG = every non-source has indeg ≥ 1."** → trust the structure.
- **"Disconnected components each contribute sources."**

> 🎯 **Pattern Unlocked:** In-Degree Zero Source Scan

---

*One quest down. Next: accumulate all ancestors in a DAG. →*
