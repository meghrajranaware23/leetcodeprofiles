# ⚔ Quest: Reconstruct Itinerary

> **Day 29** · [Reconstruct Itinerary #332](https://leetcode.com/problems/reconstruct-itinerary/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reconstruct Itinerary on LeetCode](https://leetcode.com/problems/reconstruct-itinerary/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Reconstruct Itinerary #332](https://leetcode.com/problems/reconstruct-itinerary/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Hierholzer's Algorithm**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Hierholzer's Algorithm

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

Apply Hierholzer's Algorithm step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<string, multiset<string>> g;
    vector<string> route;
    void visit(string u) {
        while (g[u].size()) {
            string v = *g[u].begin();
            g[u].erase(g[u].begin());
            visit(v);
        }
        route.push_back(u);
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& t : tickets) g[t[0]].insert(t[1]);
        visit("JFK");
        reverse(route.begin(), route.end());
        return route;
    }
};
```

### Python
```python
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        g = defaultdict(list)
        for a, b in tickets:
            g[a].append(b)
        for k in g:
            g[k].sort(reverse=True)
        route = []
        def visit(u):
            while g[u]:
                visit(g[u].pop())
            route.append(u)
        visit('JFK')
        return route[::-1]
```

### Java
```java
class Solution {
    private Map<String, PriorityQueue<String>> g = new HashMap<>();
    private LinkedList<String> route = new LinkedList<>();
    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> t : tickets)
            g.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).offer(t.get(1));
        visit("JFK");
        return new ArrayList<>(route);
    }
    private void visit(String u) {
        PriorityQueue<String> pq = g.getOrDefault(u, new PriorityQueue<>());
        while (!pq.isEmpty()) visit(pq.poll());
        route.addFirst(u);
    }
}
```

**Complexity:** O(E log E) time · O(E) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Hierholzer's Algorithm"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Hierholzer's Algorithm

---

*One quest down. The next one builds on this pattern. →*
