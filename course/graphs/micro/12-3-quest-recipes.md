# ⚔ Quest: Find All Possible Recipes

> **Day 12** · [Find All Possible Recipes from Given Supplies #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find All Possible Recipes from Given Supplies on LeetCode](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Find All Possible Recipes from Given Supplies #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Topological Dependency Chain**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Topological Dependency Chain

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

Apply Topological Dependency Chain step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {
        unordered_set<string> have(supplies.begin(), supplies.end());
        unordered_map<string, vector<string>> adj;
        unordered_map<string, int> indeg;
        for (int i = 0; i < (int)recipes.size(); i++) {
            indeg[recipes[i]] = 0;
            for (auto& ing : ingredients[i]) {
                if (!have.count(ing)) {
                    adj[ing].push_back(recipes[i]);
                    indeg[recipes[i]]++;
                }
            }
        }
        queue<string> q;
        for (auto& [r, d] : indeg)
            if (!d) q.push(r);
        vector<string> res;
        while (!q.empty()) {
            string u = q.front(); q.pop();
            res.push_back(u);
            have.insert(u);
            for (auto& v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def findAllRecipes(self, recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:
        have = set(supplies)
        adj = defaultdict(list)
        indeg = {r: 0 for r in recipes}
        for r, ings in zip(recipes, ingredients):
            for ing in ings:
                if ing not in have:
                    adj[ing].append(r)
                    indeg[r] += 1
        q = deque(r for r in recipes if indeg[r] == 0)
        res = []
        while q:
            u = q.popleft()
            res.append(u)
            have.add(u)
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return res
```

### Java
```java
class Solution {
    public List<String> findAllRecipes(String[] recipes, List<List<String>> ingredients, String[] supplies) {
        Set<String> have = new HashSet<>(Arrays.asList(supplies));
        Map<String, List<String>> adj = new HashMap<>();
        Map<String, Integer> indeg = new HashMap<>();
        for (int i = 0; i < recipes.length; i++) {
            indeg.put(recipes[i], 0);
            for (String ing : ingredients.get(i)) {
                if (!have.contains(ing)) {
                    adj.computeIfAbsent(ing, k -> new ArrayList<>()).add(recipes[i]);
                    indeg.merge(recipes[i], 1, Integer::sum);
                }
            }
        }
        Queue<String> q = new ArrayDeque<>();
        for (String r : recipes) if (indeg.get(r) == 0) q.offer(r);
        List<String> res = new ArrayList<>();
        while (!q.isEmpty()) {
            String u = q.poll();
            res.add(u);
            have.add(u);
            for (String v : adj.getOrDefault(u, List.of()))
                if (indeg.merge(v, -1, Integer::sum) == 0) q.offer(v);
        }
        return res;
    }
}
```

**Complexity:** O(R + I) time · O(R + I) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Topological Dependency Chain"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Topological Dependency Chain

---

*Both quests complete. Head to the checkpoint. →*
