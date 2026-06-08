# ⚔ Quest: Satisfiability of Equality Equations

> **Day 18** · [Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equality-equations/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Satisfiability of Equality Equations on LeetCode](https://leetcode.com/problems/satisfiability-of-equality-equations/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equality-equations/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Constraint Union-Find**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Constraint Union-Find

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

Apply Constraint Union-Find step by step on this graph.
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
    void unite(char a, char b) { p[find(a)] = find(b); }
public:
    bool equationsPossible(vector<string>& equations) {
        p.resize(26);
        iota(p.begin(), p.end(), 0);
        for (auto& e : equations)
            if (e[1] == '=') unite(e[0] - 'a', e[3] - 'a');
        for (auto& e : equations)
            if (e[1] == '!' && find(e[0] - 'a') == find(e[3] - 'a')) return false;
        return true;
    }
};
```

### Python
```python
class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        p = list(range(26))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for e in equations:
            if e[1] == '=':
                p[find(ord(e[0]) - 97)] = find(ord(e[3]) - 97)
        return all(find(ord(e[0]) - 97) != find(ord(e[3]) - 97) for e in equations if e[1] == '!')
```

### Java
```java
class Solution {
    private int[] p;
    public boolean equationsPossible(String[] equations) {
        p = new int[26];
        for (int i = 0; i < 26; i++) p[i] = i;
        for (String e : equations)
            if (e.charAt(1) == '=') unite(e.charAt(0) - 'a', e.charAt(3) - 'a');
        for (String e : equations)
            if (e.charAt(1) == '!' && find(e.charAt(0) - 'a') == find(e.charAt(3) - 'a'))
                return false;
        return true;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(a)] = find(b); }
}
```

**Complexity:** O(n · α(26)) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Constraint Union-Find"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Constraint Union-Find

---

*Both quests complete. Head to the checkpoint. →*
