<!-- hand-authored -->
# ⚔ Quest: Count Unreachable Pairs

> **Day 22** · [Count Unreachable Pairs of Nodes in an Undirected Graph #2316](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Unreachable Pairs of Nodes in an Undirected Graph on LeetCode](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/)**

> ⚔ **Hunter's rule:** UF to get component sizes. Formula: sum `size × (n − size)` over roots, then divide by 2.

---

## The Problem

See the full problem statement on LeetCode: **[Count Unreachable Pairs of Nodes in an Undirected Graph #2316](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Component size math** — union all edges, count nodes per root. Pairs across different components: each node in size-c component can't reach n−c others.

Don't double-count: divide total by 2.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Component Size Math

**How to identify this from the problem statement:**
- Undirected graph — count pairs (a,b) with no path
- Complement of "pairs in same component"
- Need component sizes, not BFS from every pair

| Keyword / phrase | What it signals |
|---|---|
| "unreachable pairs" / "pairs in different components" | UF + size formula |
| "undirected graph" | Union all edges |
| "count pairs" | Algebra on sizes |
| "shortest path" | BFS — not needed for counting |

**Why this pattern works:** Nodes in component of size c contribute c×(n−c) ordered cross pairs; each unordered pair counted twice → halve.

**How a strong solver thinks before coding:**
1. *"UF union all edges."*
2. *"Count size[find(i)] for each i."*
3. *"ans = sum(c * (n-c)) / 2."*
4. *"No O(n²) pair check."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check reachability for every pair** | O(n² · (V+E)) |
| **BFS from each node counting unreachable** | O(n · (V+E)) — UF faster |
| **Forget to divide by 2** | Double-counts pairs |
| **Count components only without sizes** | Need sizes for formula |

**The insight brute force misses:** One UF pass + arithmetic replaces all-pairs reachability.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Operations to Make Network Connected #1319](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) | Spare cable count | UF components |
| [Min Score Path #2492](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/) (B-test) | Min edge in component | UF + scan |
| Provinces count | Count roots | UF size variant |

Same UF — **formula differs per question.**

---

## 📖 Walkthrough

```
n=5, components sizes 3 and 2

Component A (3 nodes): each can't reach 2 others → 3×2 = 6 ordered
Component B (2 nodes): 2×3 = 6 ordered
Sum = 12; /2 = 6 unreachable pairs
```

> 💡 **The insight:** You're not walking the graph — you're counting after merging.

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
    long long countPairs(int n, vector<vector<int>>& edges) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges) unite(e[0], e[1]);
        unordered_map<int, long long> size;
        for (int i = 0; i < n; i++) size[find(i)]++;
        long long unreachable = 0;
        for (auto& [root, cnt] : size)
            unreachable += cnt * (n - cnt);
        return unreachable / 2;
    }
};
```

### Python
```python
class Solution:
    def countPairs(self, n: int, edges: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            p[find(b)] = find(a)
        from collections import Counter
        sizes = Counter(find(i) for i in range(n))
        unreachable = sum(c * (n - c) for c in sizes.values())
        return unreachable // 2
```

### Java
```java
class Solution {
    private int[] p;
    public long countPairs(int n, int[][] edges) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] e : edges) unite(e[0], e[1]);
        Map<Integer, Long> size = new HashMap<>();
        for (int i = 0; i < n; i++) size.merge(find(i), 1L, Long::sum);
        long unreachable = 0;
        for (long cnt : size.values()) unreachable += cnt * (n - cnt);
        return unreachable / 2;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(E · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Pairs in different components"** → UF sizes + formula.
- **"c × (n−c) per component"** → cross-component pairs.
- **"Divide by 2"** → unordered pair correction.
- **"Not BFS from each node"** → math after UF.

If you nested loops over all pairs, switch to the size formula.

> 🎯 **Pattern Unlocked:** Component Size Math

---

*One quest down. Next: state BFS with alternating colors. →*
