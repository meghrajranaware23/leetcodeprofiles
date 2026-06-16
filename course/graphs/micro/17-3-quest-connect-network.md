<!-- hand-authored -->
# ⚔ Quest: Connect Network

> **Day 17** · [Number of Operations to Make Network Connected #1319](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Operations to Make Network Connected on LeetCode](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)**

> ⚔ **Hunter's rule:** Count components with UF. Each merge needs one spare cable. Check if you have enough cables before counting.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Operations to Make Network Connected #1319](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Component counting with UF** — union all existing cables, count how many separate components remain.

Key formula: need `components − 1` merges to connect everyone. Each merge consumes one redundant cable. If `cables.size() < n − 1`, impossible (`-1`).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Component Counting with UF

**How to identify this from the problem statement:**
- "Make network connected" → merge all UF components into one
- Each operation moves one cable between computers — effectively merges two components
- Count spare cables vs merges needed

| Keyword / phrase | What it signals |
|---|---|
| "minimum operations" / "connect all computers" | UF component count |
| "return -1 if impossible" | Need at least n−1 cables total |
| "existing connections" | Union them first; count roots |
| "shortest path" | **Not this** — connectivity only |

**Why this pattern works:** n nodes connected → 1 component. Starting with `comps` components needs `comps − 1` unions. Each spare cable beyond `(n − comps)` is wasted — answer = `cables − (n − comps)`.

**How a strong solver thinks before coding:**
1. *"If len(connections) < n−1 → return -1."*
2. *"UF: union every edge; track comps starting at n, decrement on successful union."*
3. *"Need comps−1 merges; spare = cables − (n − comps)."*
4. *"Return spare cables (or ops count)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS count components from each node** | O(n · (V+E)) — UF one pass |
| **Try all cable reassignment combos** | Exponential — formula suffices |
| **Ignore cable count feasibility** | Must check ≥ n−1 cables first |
| **Count edges instead of components** | Components matter, not edge count alone |

**The insight brute force misses:** `components − 1` merges needed; each extra cable beyond wiring the forest is one valid operation.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) | Detect cycle edge | UF find before union |
| [Count Unreachable Pairs #2316](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/) | Size math on components | UF count per root |
| [Min Score Path #2492](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/) (B-test) | Min edge in component | UF + scan edges |

Same skeleton: **union all edges → read component structure.**

---

## 📖 Walkthrough

**n=4, connections=[[0,1],[0,2],[1,2],[3,4]]** — wait, example may vary. Generic trace:

```
n=6, 3 components after unions, 4 cables given

Need n−1=5 cables minimum → if only 4, return -1

If 7 cables, comps=3:
  merges needed = 3−1 = 2
  cables used in forest = n − comps = 6 − 3 = 3
  spare ops = 7 − 3 = 4  (each spare cable can merge two components)
```

```
UF trace:
  start comps=6
  union(0,1): comps=5
  union(1,2): comps=4  ... until done
  final comps → apply formula
```

> 💡 **The insight:** You're not moving cables optimally in simulation — UF counts components; arithmetic gives the answer.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
public:
    int makeConnected(int n, vector<vector<int>>& connections) {
        if ((int)connections.size() < n - 1) return -1;
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        int comps = n;
        for (auto& c : connections)
            if (find(c[0]) != find(c[1])) { unite(c[0], c[1]); comps--; }
        return connections.size() - (n - comps);
    }
};
```

### Python
```python
class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        if len(connections) < n - 1: return -1
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        comps = n
        for a, b in connections:
            ra, rb = find(a), find(b)
            if ra != rb:
                p[rb] = ra
                comps -= 1
        return len(connections) - (n - comps)
```

### Java
```java
class Solution {
    private int[] p, r;
    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) return -1;
        p = new int[n]; r = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        int comps = n;
        for (int[] c : connections)
            if (find(c[0]) != find(c[1])) { unite(c[0], c[1]); comps--; }
        return connections.length - (n - comps);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) { int t = a; a = b; b = t; }
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
}
```

**Complexity:** O(E · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Connect all computers"** → one component; count how many you have.
- **"Not enough cables"** → need ≥ n−1 edges in any connected graph.
- **"Each op uses one spare cable"** → `extras = cables − (n − comps)`.
- **"UF not BFS"** → merge existing edges; count roots.

If you simulated cable moves, the formula is faster and equivalent.

> 🎯 **Pattern Unlocked:** Component Counting with UF

---

*Both quests complete. Head to the checkpoint. →*
