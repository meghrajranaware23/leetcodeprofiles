# ⚔ Quest: Clone Graph

> **Day 5** · [Clone Graph #133](https://leetcode.com/problems/clone-graph/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Clone Graph on LeetCode](https://leetcode.com/problems/clone-graph/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Clone Graph #133](https://leetcode.com/problems/clone-graph/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Graph Copy via BFS/DFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Graph Copy via BFS/DFS

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

Apply Graph Copy via BFS/DFS step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<Node*, Node*> mp;
    Node* clone(Node* node) {
        if (!node) return nullptr;
        if (mp.count(node)) return mp[node];
        Node* copy = new Node(node->val);
        mp[node] = copy;
        for (Node* nei : node->neighbors)
            copy->neighbors.push_back(clone(nei));
        return copy;
    }
public:
    Node* cloneGraph(Node* node) { return clone(node); }
};
```

### Python
```python
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node: return None
        mp = {}
        def clone(n):
            if n in mp: return mp[n]
            copy = Node(n.val)
            mp[n] = copy
            for nei in n.neighbors:
                copy.neighbors.append(clone(nei))
            return copy
        return clone(node)
```

### Java
```java
class Solution {
    private Map<Node, Node> mp = new HashMap<>();
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (mp.containsKey(node)) return mp.get(node);
        Node copy = new Node(node.val);
        mp.put(node, copy);
        for (Node nei : node.neighbors) copy.neighbors.add(cloneGraph(nei));
        return copy;
    }
}
```

**Complexity:** O(V + E) time · O(V) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Graph Copy via BFS/DFS"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Graph Copy via BFS/DFS

---

*Both quests complete. Head to the checkpoint. →*
