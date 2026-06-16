<!-- hand-authored -->
# ⚔ Quest: Evaluate Division

> **Day 16** · [Evaluate Division #399](https://leetcode.com/problems/evaluate-division/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Evaluate Division on LeetCode](https://leetcode.com/problems/evaluate-division/)**

> ⚔ **Hunter's rule:** `A/B=k` → edge A→B weight k, B→A weight 1/k. Query X/Y → DFS from X multiplying edge weights to reach Y.

---

## The Problem

See the full problem statement on LeetCode: **[Evaluate Division #399](https://leetcode.com/problems/evaluate-division/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Use `unordered_map<string, map<string, double>>` or nested hash maps. Unknown variable in query → -1.0. DFS with visited per query to avoid cycles.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Weighted Graph Construction + Path Query

**How to identify this from the problem statement:**
- Equations define ratios between variables
- Queries ask for ratio between two variables
- Transitive: a/b and b/c gives a/c

| Keyword / phrase | What it signals |
|---|---|
| "a/b=k" | Directed weighted edge a→b = k |
| "evaluate X/Y" | DFS multiply path from X to Y |
| Unknown variable | -1.0 |
| Transitive equations | Graph connects components |

**Why this pattern works:** Division chains multiply — exactly path product in a weighted graph.

**How a strong solver thinks before coding:**
1. *"For each eq: g[a][b]=k, g[b][a]=1/k."*
2. *"Per query: if X or Y missing → -1."*
3. *"DFS(X,Y,vis,product=1.0)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Union-Find without weights** | Loses ratio information |
| **Single direction edge only** | Can't traverse b→a |
| **Add ratios instead of multiply** | Wrong algebra |
| **Rebuild graph per query** | Wasteful — build once |

**The insight:** Graph build is O(E); each query is O(V+E) DFS.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) | UF not weighted | Different tool |
| [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) | UF connectivity | Later rank |
| [Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/) | Min on DAG | C-test 3 |

---

## 📖 Walkthrough

```
equations: a/b=2, b/c=3
queries: a/c, b/a, a/e

Graph: a→b(2), b→a(0.5), b→c(3), c→b(⅓)

a/c: 2 × 3 = 6 ✓
b/a: 0.5 ✓
a/e: e unknown → -1 ✓
```

> 💡 **The insight:** Build phase and query phase are separate — classic graph modeling.

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

- **"Equation → weighted directed edge both ways."**
- **"Query = path product."** → multiply, don't add.
- **"Missing variable → -1."**
- **"Build once, query many."**

> 🎯 **Pattern Unlocked:** Weighted Graph Construction + Path Query

---

*Both quests complete. Head to the checkpoint. →*
