# ⚔ Quest: Evaluate Division

> **Day 16** · [Evaluate Division #399](https://leetcode.com/problems/evaluate-division/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Evaluate Division on LeetCode](https://leetcode.com/problems/evaluate-division/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Evaluate Division #399](https://leetcode.com/problems/evaluate-division/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Weighted Graph Construction**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Weighted Graph Construction

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

Apply Weighted Graph Construction step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<string, unordered_map<string, double>> g;
    bool dfs(string& cur, string& target, unordered_set<string>& vis, double val, double& ans) {
        if (cur == target) { ans = val; return true; }
        vis.insert(cur);
        for (auto& [nxt, w] : g[cur])
            if (!vis.count(nxt) && dfs(nxt, target, vis, val * w, ans))
                return true;
        vis.erase(cur);
        return false;
    }
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        for (int i = 0; i < (int)equations.size(); i++) {
            g[equations[i][0]][equations[i][1]] = values[i];
            g[equations[i][1]][equations[i][0]] = 1.0 / values[i];
        }
        vector<double> res;
        for (auto& q : queries) {
            if (!g.count(q[0]) || !g.count(q[1])) { res.push_back(-1.0); continue; }
            unordered_set<string> vis;
            double ans = -1.0;
            dfs(q[0], q[1], vis, 1.0, ans);
            res.push_back(ans);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        g = defaultdict(dict)
        for (a, b), v in zip(equations, values):
            g[a][b] = v
            g[b][a] = 1 / v
        def dfs(cur, target, vis, val):
            if cur == target: return val
            vis.add(cur)
            for nxt, w in g[cur].items():
                if nxt not in vis:
                    res = dfs(nxt, target, vis, val * w)
                    if res != -1: return res
            vis.remove(cur)
            return -1
        out = []
        for a, b in queries:
            if a not in g or b not in g:
                out.append(-1.0)
            else:
                out.append(dfs(a, b, set(), 1.0))
        return out
```

### Java
```java
class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Map<String, Double>> g = new HashMap<>();
        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0), b = equations.get(i).get(1);
            g.computeIfAbsent(a, k -> new HashMap<>()).put(b, values[i]);
            g.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1.0 / values[i]);
        }
        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String a = queries.get(i).get(0), b = queries.get(i).get(1);
            if (!g.containsKey(a) || !g.containsKey(b)) res[i] = -1.0;
            else res[i] = dfs(g, a, b, new HashSet<>(), 1.0);
        }
        return res;
    }
    private double dfs(Map<String, Map<String, Double>> g, String cur, String target, Set<String> vis, double val) {
        if (cur.equals(target)) return val;
        vis.add(cur);
        for (var e : g.get(cur).entrySet())
            if (!vis.contains(e.getKey())) {
                double ans = dfs(g, e.getKey(), target, vis, val * e.getValue());
                if (ans != -1) return ans;
            }
        vis.remove(cur);
        return -1;
    }
}
```

**Complexity:** O(Q · (V + E)) time · O(V + E) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Weighted Graph Construction"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Weighted Graph Construction

---

*Both quests complete. Head to the checkpoint. →*
