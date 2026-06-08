# ⚔ Quest: Accounts Merge

> **Day 18** · [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Accounts Merge on LeetCode](https://leetcode.com/problems/accounts-merge/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Accounts Merge #721](https://leetcode.com/problems/accounts-merge/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Equivalence Class Union**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Equivalence Class Union

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

Apply Equivalence Class Union step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string, string> owner;
        unordered_map<string, int> id;
        int n = 0;
        for (auto& acc : accounts) {
            owner[acc[1]] = acc[0];
            for (int i = 1; i < (int)acc.size(); i++) {
                if (!id.count(acc[i])) id[acc[i]] = n++;
            }
        }
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& acc : accounts)
            for (int i = 2; i < (int)acc.size(); i++)
                unite(id[acc[1]], id[acc[i]]);
        unordered_map<int, set<string>> groups;
        for (auto& [email, idx] : id)
            groups[find(idx)].insert(email);
        vector<vector<string>> res;
        for (auto& [root, emails] : groups) {
            vector<string> row = {owner[*emails.begin()]};
            for (auto& e : emails) row.push_back(e);
            res.push_back(row);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        owner = {}
        p = {}
        def find(x):
            p.setdefault(x, x)
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]
        def unite(a, b):
            p[find(b)] = find(a)
        for acc in accounts:
            owner[acc[1]] = acc[0]
            for i in range(1, len(acc)):
                if i > 1:
                    unite(acc[1], acc[i])
        groups = defaultdict(set)
        for acc in accounts:
            for i in range(1, len(acc)):
                groups[find(acc[i])].add(acc[i])
        return [[owner[next(iter(emails))]] + sorted(emails) for emails in groups.values()]
```

### Java
```java
class Solution {
    private Map<String, String> owner = new HashMap<>();
    private Map<String, String> parent = new HashMap<>();
    private String find(String x) {
        parent.putIfAbsent(x, x);
        if (!parent.get(x).equals(x)) parent.put(x, find(parent.get(x)));
        return parent.get(x);
    }
    private void unite(String a, String b) { parent.put(find(b), find(a)); }
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        for (List<String> acc : accounts) {
            owner.put(acc.get(1), acc.get(0));
            for (int i = 2; i < acc.size(); i++) unite(acc.get(1), acc.get(i));
        }
        Map<String, TreeSet<String>> groups = new HashMap<>();
        for (List<String> acc : accounts)
            for (int i = 1; i < acc.size(); i++)
                groups.computeIfAbsent(find(acc.get(i)), k -> new TreeSet<>()).add(acc.get(i));
        List<List<String>> res = new ArrayList<>();
        for (var e : groups.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(owner.get(e.getValue().first()));
            row.addAll(e.getValue());
            res.add(row);
        }
        return res;
    }
}
```

**Complexity:** O(n · k · α(n) + n · k log k) time · O(n · k) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Equivalence Class Union"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Equivalence Class Union

---

*One quest down. The next one builds on this pattern. →*
