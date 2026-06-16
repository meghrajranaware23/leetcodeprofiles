<!-- hand-authored -->
# ⚔ Quest: Reconstruct Itinerary

> **Day 29** · [Reconstruct Itinerary #332](https://leetcode.com/problems/reconstruct-itinerary/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reconstruct Itinerary on LeetCode](https://leetcode.com/problems/reconstruct-itinerary/)**

> ⚔ **Hunter's rule:** Draw directed edges as tickets. Trace Hierholzer by hand — eat edges, push airports when stuck, reverse the stack. Not BFS.

---

## The Problem

See the full problem statement on LeetCode: **[Reconstruct Itinerary #332](https://leetcode.com/problems/reconstruct-itinerary/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Hierholzer's algorithm** — Eulerian trail on a directed multigraph.

- Build adjacency: `g[from].insert(to)` — **sorted ascending** for lex-smallest route.
- `visit(u)`: while outgoing edges exist, pick smallest, **erase edge**, `visit(v)`.
- When stuck, `route.push_back(u)` (post-order).
- Start `visit("JFK")`; return `reverse(route)`.

Not BFS. Not Day 9 directed walk — must use **every** edge exactly once.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Hierholzer's Algorithm

**How to identify this from the problem statement:**
- "Use all tickets exactly once" → Eulerian trail — edge consumption problem
- Directed edges `(from, to)` → directed multigraph
- "Lexicographically smallest" → pick smallest neighbor at each step
- Fixed start "JFK" → single-source Hierholzer

| Keyword / phrase | What it signals |
|---|---|
| "reconstruct itinerary" | Build path, not shortest path |
| "all tickets used once" | Hierholzer — delete edges on traverse |
| "lex smallest" | Sorted multiset / priority queue per node |
| Multiple edges same pair | Multigraph — multiset, not single adj entry |

**Why this pattern works:** Hierholzer guarantees an Eulerian circuit/trail if one exists. Post-order stack captures the walk; reversing gives forward order. Sorting neighbors ensures lex-min among valid trails.

**How a strong solver thinks before coding:**
1. *"Every edge used once?"* → Hierholzer, not BFS/DFS visit count.
2. *"Erase edge when taken — or infinite loop."*
3. *"Push node when no edges left; reverse at end."*
4. *"Lex smallest → ascending neighbor order."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS / Dijkstra** | Optimizes hops/weight — doesn't enforce using all edges |
| **DFS without erasing edges** | Reuses tickets — invalid itinerary |
| **Backtrack all permutations** | Factorial — Hierholzer is O(E log E) |
| **Greedy always pick smallest without Hierholzer** | Can get stuck with unused edges (need post-order) |
| **Pre-sort tickets only, single pass** | Fails on multigraph dead-end cases |

**The insight:** Post-order edge stack resolves dead ends — backtrack is built into "push when stuck."

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Reconstruct Itinerary #332](https://leetcode.com/problems/reconstruct-itinerary/) | Lex smallest, start JFK | Hierholzer + sorted adj |
| Euler circuit (undirected) | Both directions | Same template, undirected erase |
| [Valid Arrangement of Pairs](https://leetcode.com/problems/valid-arrangement-of-pairs/) | Integer nodes | Identical Hierholzer |

---

## 📖 Walkthrough

```
Tickets: JFK→MUC, JFK→SFO, MUC→LHR, LHR→SFO, SFO→SAN

visit(JFK): take MUC → visit(MUC): take LHR → visit(LHR):
  take SFO → visit(SFO): take SAN → visit(SAN): push SAN
  push SFO → back JFK: take SFO (2nd edge) ... push JFK

Stack before reverse: [SAN, SFO, LHR, MUC, SFO, JFK]
Reverse: [JFK, MUC, LHR, SFO, SAN] ✓
```

> 💡 **The insight:** Airports enter the route when you **run out of tickets** from that airport — post-order on edges.

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

- **"Use every ticket exactly once"** → Euler trail → Hierholzer, not BFS.
- **"Lex smallest itinerary"** → sorted adjacency at each airport.
- **"Push when stuck, reverse"** → post-order edge stack.
- **Erase edge on use** — multigraph requires consumption.

> 🎯 **Pattern Unlocked:** Hierholzer's Algorithm

---

*One quest down. Next: Tarjan bridges — disc/low trace. →*
