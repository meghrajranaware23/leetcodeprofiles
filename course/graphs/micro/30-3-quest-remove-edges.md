<!-- hand-authored -->
# ⚔ Quest: Remove Max Edges

> **Day 30** · [Remove Max Number of Edges to Keep Graph Fully Traversable #1579](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove Max Number of Edges to Keep Graph Fully Traversable on LeetCode](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/)**

> ⚔ **Hunter's rule:** Two players, two UF structures. Process type-3 edges first, then type-1 (Alice), then type-2 (Bob). Trace unions on paper.

---

## The Problem

See the full problem statement on LeetCode: **[Remove Max Number of Edges to Keep Graph Fully Traversable #1579](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Dual Union-Find** — separate `alice` and `bob` DSU.

- Type 3 edge: usable by **both** — `alice.unite(u,v) | bob.unite(u,v)`; count if either succeeds.
- Type 1: **Alice only** — `alice.unite(u,v)`.
- Type 2: **Bob only** — `bob.unite(u,v)`.
- **Order matters:** all type 3 first, then type 1, then type 2.
- Answer: `total_edges - used`; return -1 if either UF not one component.

Greedy — shared edges first maximize edges you can keep for both.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dual Union-Find

**How to identify this from the problem statement:**
- Two subgraphs must each stay connected (Alice type 1∪3, Bob type 2∪3)
- Maximize edges **removed** ⟺ minimize edges **kept** that satisfy both
- Edge types determine which UF(s) may use it
- Kruskal-like processing order — but two parallel UF structures

| Keyword / phrase | What it signals |
|---|---|
| "Alice" / "Bob" / two traversals | Two UF instances |
| "type 1, 2, 3" edges | Route to correct UF(s) |
| "fully traversable" | Each UF must have comps == 1 |
| "remove maximum edges" | Greedy keep — subtract from total |

**Why this pattern works:** Type-3 edges are the most valuable (serve both players). Processing them first in Kruskal style keeps connectivity while minimizing used edges. Separate UFs track each player's connectivity independently.

**How a strong solver thinks before coding:**
1. *"Two connectivity requirements?"* → two UF structures.
2. *"Type 3 helps both — process first."*
3. *"Count edge as used if unite returns true (new merge)."*
4. *"Final check: both connected?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Single UF for all edges** | Ignores Alice/Bob type restrictions |
| **Try all subsets of edges** | Exponential |
| **Process type 1 before type 3** | Wastes type-3 shared capacity |
| **BFS connectivity per trial** | O(E) per check — UF is O(E α(n)) |
| **Keep all type-3 without unite check** | Redundant edges shouldn't count as "used" |

**The insight:** Greedy edge order + dual UF = maximize removable edges while preserving both connectivities.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Remove Max Edges #1579](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) | Alice/Bob types | Dual UF + order |
| [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) | Single UF cycle | Day 17 cousin |
| [Connecting Cities #1135](https://leetcode.com/problems/connecting-cities-with-minimum-cost/) | MST single UF | Day 21 |

---

## 📖 Walkthrough

```
n=4, edges: [3,1,2], [3,2,3], [1,1,3], [2,2,3]

Pass 1 (type 3):
  (3,1,2): alice✓ bob✓ → used++
  (3,2,3): alice✓ bob✓ → used++

Pass 2 (type 1): (1,1,3) — alice already connected → skip
Pass 3 (type 2): (2,2,3) — bob already connected → skip

Both connected with 2 edges kept → remove 4-2=2
```

> 💡 **The insight:** Type-3 pass builds both spanning structures simultaneously — cheapest shared investment.

---

## Solution

### C++
```cpp
class UF {
    vector<int> p, r;
    int comps;
public:
    UF(int n) : p(n + 1), r(n + 1), comps(n) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        comps--;
        return true;
    }
    bool connected() { return comps == 1; }
};
class Solution {
public:
    int maxNumEdgesToRemove(int n, vector<vector<int>>& edges) {
        UF alice(n), bob(n);
        int used = 0;
        for (auto& e : edges)
            if (e[0] == 3 && (alice.unite(e[1], e[2]) | bob.unite(e[1], e[2]))) used++;
        for (auto& e : edges)
            if (e[0] == 1 && alice.unite(e[1], e[2])) used++;
        for (auto& e : edges)
            if (e[0] == 2 && bob.unite(e[1], e[2])) used++;
        if (!alice.connected() || !bob.connected()) return -1;
        return (int)edges.size() - used;
    }
};
```

### Python
```python
class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: List[List[int]]) -> int:
        class UF:
            def __init__(self, n):
                self.p = list(range(n + 1))
                self.comps = n
            def find(self, x):
                while self.p[x] != x:
                    self.p[x] = self.p[self.p[x]]
                    x = self.p[x]
                return x
            def unite(self, a, b):
                ra, rb = self.find(a), self.find(b)
                if ra == rb: return False
                self.p[rb] = ra
                self.comps -= 1
                return True
        alice, bob = UF(n), UF(n)
        used = 0
        for t, u, v in edges:
            if t == 3 and (alice.unite(u, v) or bob.unite(u, v)):
                used += 1
        for t, u, v in edges:
            if t == 1 and alice.unite(u, v):
                used += 1
        for t, u, v in edges:
            if t == 2 and bob.unite(u, v):
                used += 1
        if alice.comps != 1 or bob.comps != 1:
            return -1
        return len(edges) - used
```

### Java
```java
class Solution {
    public int maxNumEdgesToRemove(int n, int[][] edges) {
        UF alice = new UF(n), bob = new UF(n);
        int used = 0;
        for (int[] e : edges)
            if (e[0] == 3 && alice.unite(e[1], e[2]) | bob.unite(e[1], e[2])) used++;
        for (int[] e : edges)
            if (e[0] == 1 && alice.unite(e[1], e[2])) used++;
        for (int[] e : edges)
            if (e[0] == 2 && bob.unite(e[1], e[2])) used++;
        if (!alice.connected() || !bob.connected()) return -1;
        return edges.length - used;
    }
    static class UF {
        int[] p, r; int comps;
        UF(int n) { p = new int[n + 1]; r = new int[n + 1]; comps = n; for (int i = 0; i <= n; i++) p[i] = i; }
        int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
        boolean unite(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (r[a] < r[b]) { int t = a; a = b; b = t; }
            p[b] = a; if (r[a] == r[b]) r[a]++; comps--; return true;
        }
        boolean connected() { return comps == 1; }
    }
}
```

**Complexity:** O(E · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Alice and Bob each need full connectivity"** → two UF structures.
- **"Type 3 edges first"** — greedy shared investment before single-type edges.
- **"Remove maximum"** → minimize `used`, answer = `len(edges) - used`.
- **Day 17 UF + Day 21 Kruskal order** — capstone fusion.

> 🎯 **Pattern Unlocked:** Dual Union-Find

---

*Both quests complete. Head to the checkpoint. →*
