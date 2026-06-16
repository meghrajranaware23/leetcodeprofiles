<!-- hand-authored -->
# ⚔ Quest: Clone Graph

> **Day 5** · [Clone Graph #133](https://leetcode.com/problems/clone-graph/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Clone Graph on LeetCode](https://leetcode.com/problems/clone-graph/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw 3–4 nodes with neighbor lists. Trace how each old node maps to a new copy. The hints below are for *after* your attempt.

---

## The Problem

Given a reference to a node in a **connected** undirected graph, return a **deep copy** of the graph.

Each node has an integer `val` and a list `neighbors`.

```
Input:  adjList = [[2,4],[1,3],[2,4],[1,3]]
        Node 1 connects to 2 and 4; etc.

Output: A new graph with identical structure and values.
```

---

## 💡 Hints

Which pattern from today's concept applies? **Graph copy via DFS/BFS + old→new map**.

**Hint 1:** `map = {}` from original `Node*` → cloned `Node*`.

**Hint 2:** Function `clone(node)`: if `node in map`, return `map[node]` (handles cycles).

**Hint 3:** Create `copy = Node(node.val)`, store `map[node]=copy`, then for each neighbor `n`: `copy.neighbors.append(clone(n))`.

**Hint 4:** BFS alternative: queue nodes, create copies on first sight, wire neighbors when dequeuing.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Graph Copy via BFS/DFS

**How to identify this from the problem statement:**
- "Clone" / "copy graph" → traverse + duplicate nodes
- `Node` objects with `neighbors` → explicit adjacency lists
- Undirected edges appear twice in neighbor lists
- Cycles possible → map prevents infinite recursion

| Keyword / phrase | What it signals |
|---|---|
| "clone" / "deep copy" | New objects, same topology |
| `neighbors` list | DFS/BFS over graph |
| Reference input node | Start traversal from given node |
| "same structure" | Map old→new while walking |
| Connected graph | One traversal reaches all nodes |

**Why this pattern works:** First visit creates the copy and registers it. Revisiting via cycle returns existing copy — neighbor links stay consistent.

**How a strong solver thinks before coding:**
1. *"map[old] = new before recursing neighbors."*
2. *"If already mapped, return immediately."*
3. *"Clone val, then clone each neighbor and append."*
4. *"Square cycle 1-2-3-4: when 4→1, map[1] exists."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Clone without map on cycle** | Infinite recursion |
| **JSON serialize/deserialize** | Works but hides graph traversal skill |
| **Copy only val, reuse same neighbor pointers** | Shallow copy — wrong |
| **Create all nodes first without wiring edges** | Need map to link neighbors correctly |
| **Forget null input** | Return None/null if node is null |

**The insight brute force misses:** The map is both **visited set** and **identity registry** — old node always maps to exactly one new node.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Copy List with Random Pointer | Linked list + random map | old→new while walking |
| Clone N-ary Tree | Tree not graph | Same map idea, no cycles |
| Graph valid tree | Verify structure | Traversal without copy |

Clone Graph is the interview template for **any** old→new graph walk.

---

## 📖 Walkthrough

**Map before expand — cycles reuse existing copy.**

```
Nodes: 1—2—3—1 (triangle)

clone(1):
  copy1 created, map[1]=copy1
  clone(2):
    copy2, map[2]=copy2
    clone(3):
      copy3, map[3]=copy3
      neighbor 1: map[1] exists → append copy1
    append copy3 to copy2
  append copy2 to copy1

All new nodes; edges mirror original ✓
```

> 💡 **The insight:** Register `map[old]` **before** cloning neighbors so back-edges find the copy already built.

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

- **"Clone graph"** → traverse + `map[old]=new`.
- **Check map before creating** → cycle safety.
- **Create copy, register, then neighbors** → order matters.
- **DFS in solution; BFS equivalent** → pick one, keep map.

E-Rank capstone: you've built, crossed, flooded, counted, sized, and now duplicated graphs.

> 🎯 **Pattern Unlocked:** Old→new map clone — register node before wiring neighbors.

---

*Both quests complete. Head to the checkpoint — then E-Rank tests. →*
