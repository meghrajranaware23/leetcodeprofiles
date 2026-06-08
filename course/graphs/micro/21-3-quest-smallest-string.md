# ⚔ Quest: Smallest String With Swaps

> **Day 21** · [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Smallest String With Swaps on LeetCode](https://leetcode.com/problems/smallest-string-with-swaps/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **UF for Connected Components**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** UF for Connected Components

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

Apply UF for Connected Components step by step on this graph.
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
    void unite(int a, int b) { p[find(a)] = find(b); }
public:
    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
        int n = s.size();
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& pr : pairs) unite(pr[0], pr[1]);
        vector<string> buckets(n);
        for (int i = 0; i < n; i++) buckets[find(i)].push_back(s[i]);
        for (auto& b : buckets) sort(b.rbegin(), b.rend());
        string res(n, ' ');
        for (int i = 0; i < n; i++) {
            int root = find(i);
            res[i] = buckets[root].back();
            buckets[root].pop_back();
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        n = len(s)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        for a, b in pairs:
            unite(a, b)
        buckets = defaultdict(list)
        for i, ch in enumerate(s):
            buckets[find(i)].append(ch)
        for b in buckets.values():
            b.sort(reverse=True)
        res = []
        for i in range(n):
            root = find(i)
            res.append(buckets[root].pop())
        return ''.join(res)
```

### Java
```java
class Solution {
    private int[] p;
    public String smallestStringWithSwaps(String s, int[][] pairs) {
        int n = s.length();
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] pr : pairs) unite(pr[0], pr[1]);
        List<List<Character>> buckets = new ArrayList<>();
        for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
        for (int i = 0; i < n; i++) buckets.get(find(i)).add(s.charAt(i));
        for (List<Character> b : buckets) b.sort(Collections.reverseOrder());
        char[] res = new char[n];
        for (int i = 0; i < n; i++) {
            int root = find(i);
            res[i] = buckets.get(root).remove(buckets.get(root).size() - 1);
        }
        return new String(res);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(a)] = find(b); }
}
```

**Complexity:** O(n log n + k · α(n)) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"UF for Connected Components"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** UF for Connected Components

---

*Both quests complete. Head to the checkpoint. →*
