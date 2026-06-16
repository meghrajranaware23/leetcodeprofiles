<!-- hand-authored -->
# ⚔ Quest: All Paths From Source to Target

> **Day 9** · [All Paths From Source to Target #797](https://leetcode.com/problems/all-paths-from-source-to-target/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open All Paths From Source to Target on LeetCode](https://leetcode.com/problems/all-paths-from-source-to-target/)**

> ⚔ **Hunter's rule:** Maintain a `path` list. push → recurse → pop. Save `path[:]` at node `n-1`. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[All Paths From Source to Target #797](https://leetcode.com/problems/all-paths-from-source-to-target/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **DFS Path Recording** — graph is a **DAG** (no cycles). Push current node; if `u == target`, append copy of path; else DFS each neighbor; pop before returning.

If you're stuck after 5 minutes: no BFS — you need **every** path, not shortest. No permanent visited set — backtrack handles branch isolation.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DFS Path Recording

**How to identify this from the problem statement:**
- "All paths" → enumerate, not optimize
- Input is adjacency list of DAG → DFS safe without cycle guard
- Source `0`, target `n-1` → fixed endpoints

| Keyword / phrase | What it signals |
|---|---|
| "all paths" | DFS + backtrack |
| "directed acyclic graph" | No visited set on nodes |
| "return list of paths" | Save `path[:]` at target |
| adjacency list `graph[u]` | Recurse neighbors in order |

**Why this pattern works:** Each root-to-target walk is independent. Push/pop ensures sibling branches don't contaminate each other's prefix.

**How a strong solver thinks before coding:**
1. *"cur = []; dfs(0)."*
2. *"push u; if u==n-1: res.append(cur[:])."*
3. *"else: for v in graph[u]: dfs(v)."*
4. *"pop u before return."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS** | Finds shortest path only — misses other routes |
| **Global visited set** | Blocks valid paths in DAG with multiple routes |
| **Save path reference without copy** | All entries point to same mutated list |
| **Skip pop after children** | Sibling paths include wrong prefix |

**The insight brute force misses:** Backtrack IS the visited mechanism for path enumeration.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/) | Tree, string paths | push/pop at nodes |
| [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) | Target filter at leaf | Same backtrack |
| [Reorder Routes #1466](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/) | Count flips, not paths | Day 9 DFS variant |

---

## 📖 Walkthrough

**Enumerate paths by backtracking.**

```
graph = [[1,2],[3],[3],[]]
       0→1, 0→2, 1→3, 2→3

dfs(0): path=[0]
  dfs(1): path=[0,1]
    dfs(3): path=[0,1,3] → save [0,1,3] ✓
    pop → [0,1]
  pop → [0]
  dfs(2): path=[0,2]
    dfs(3): path=[0,2,3] → save [0,2,3] ✓

Result: [[0,1,3],[0,2,3]]
```

> 💡 **The insight:** Same backtrack rhythm as tree path problems — graph is just adjacency list instead of left/right children.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj, path, cur;
    void dfs(int u, int target) {
        cur.push_back(u);
        if (u == target) path.push_back(cur);
        else for (int v : adj[u]) dfs(v, target);
        cur.pop_back();
    }
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        int n = graph.size();
        adj = graph;
        dfs(0, n - 1);
        return path;
    }
};
```

### Python
```python
class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        target = len(graph) - 1
        res, cur = [], []
        def dfs(u):
            cur.append(u)
            if u == target:
                res.append(cur[:])
            else:
                for v in graph[u]:
                    dfs(v)
            cur.pop()
        dfs(0)
        return res
```

### Java
```java
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> cur = new ArrayList<>();
    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        dfs(graph, 0, graph.length - 1);
        return res;
    }
    private void dfs(int[][] graph, int u, int target) {
        cur.add(u);
        if (u == target) res.add(new ArrayList<>(cur));
        else for (int v : graph[u]) dfs(graph, v, target);
        cur.remove(cur.size() - 1);
    }
}
```

**Complexity:** O(2^n · n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"All paths in DAG"** → DFS backtrack, not BFS.
- **"push / pop / copy"** → Three-line backtrack cycle.
- **"No visited set"** → DAG has no cycles to trap you.
- **"Not Day 8"** → Shortest vs enumerate all.

> 🎯 **Pattern Unlocked:** DFS Path Recording — push, save at target, pop.

---

*One quest down. Next: count misdirected edges in the DFS tree. →*
