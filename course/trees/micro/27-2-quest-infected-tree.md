<!-- hand-authored -->
# ⚔ Quest: Time to Infect Tree

> **Day 27** · [Amount of Time for Binary Tree to Be Infected #2385](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Amount of Time for Binary Tree to Be Infected on LeetCode](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/)**

> ⚔ **Hunter's rule:** Infection starts at an internal node — you must spread **up to parent** and down to children. Build undirected graph, BFS from start. Same family as C-Rank Distance K #863. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Amount of Time for Binary Tree to Be Infected #2385](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Parent-map multi-source BFS** — DFS builds bidirectional adjacency; BFS from `start` counts levels until all nodes visited.

If stuck: `minutes` starts at -1, increment at start of each BFS level (or adjust to match "0 minutes at start").

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Directional BFS (Parent Map)

**How to identify this from the problem statement:**
- Infection from given **start** node (not root)
- Spreads to parent and children each minute
- Return total minutes to infect entire tree

| Keyword / phrase | What it signals |
|---|---|
| "infected" / "spread" | Multi-direction BFS |
| "start node" not root | Need parent links |
| "minutes" / "time" | Level-order count |
| "adjacent nodes" | Undirected graph view |

**Why this pattern works:** Each minute infects all graph neighbors of currently infected set — classic BFS layering on tree treated as undirected graph.

**How a strong solver thinks before coding:**
1. *"buildGraph(root, par): add both directions."*
2. *"BFS queue from start, visited set."*
3. *"Process level by level, minutes++."*
4. *"Same as C-test Distance K but count levels to completion."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS downward from start only** | Misses nodes above start |
| **DFS without visited** | Cycles via parent edge |
| **Separate path to root then fan out** | Overcomplicated vs one graph BFS |
| **Simulate minute-by-minute on tree only** | Still need parent — graph is cleaner |

**The insight brute force misses:** C-Rank #863 already built parent map for distance-k — here count BFS **depth until queue exhausts**.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [All Nodes Distance K #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) | C-Rank — collect at k | Same parent BFS |
| [Word Ladder #127](https://leetcode.com/problems/word-ladder/) | General graph | BFS levels |
| [Rotting Oranges #994](https://leetcode.com/problems/rotting-oranges/) | Grid multi-source | Same level BFS |

Same skeleton: build graph, BFS with visited.

---

## 📖 Walkthrough

**Tree `[1,2,3,null,null,4,5]`, start=4**

```
      1
     / \
    2   3
       / \
      4   5

Graph edges (bidirectional):
  4↔3, 3↔1, 3↔5, 1↔2

BFS from 4:
  min -1→0: {4}
  min 0→1:  {3}
  min 1→2:  {1,5}
  min 2→3:  {2}

Return 3 ✓
```

> 💡 **The insight:** Tree + parent edges = graph. BFS time = infection minutes.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<int, vector<int>> graph;
    void buildGraph(TreeNode* node, int par) {
        if (!node) return;
        if (par != -1) {
            graph[node->val].push_back(par);
            graph[par].push_back(node->val);
        }
        buildGraph(node->left,  node->val);
        buildGraph(node->right, node->val);
    }
public:
    int amountOfTime(TreeNode* root, int start) {
        buildGraph(root, -1);
        unordered_set<int> visited;
        queue<int> q;
        q.push(start); visited.insert(start);
        int minutes = -1;
        while (!q.empty()) {
            minutes++;
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.front(); q.pop();
                for (int nb : graph[curr]) {
                    if (!visited.count(nb)) {
                        visited.insert(nb); q.push(nb);
                    }
                }
            }
        }
        return minutes;
    }
};
```

### Python
```python
from collections import defaultdict, deque
class Solution:
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        graph = defaultdict(list)
        def build(node, par):
            if not node: return
            if par is not None:
                graph[node.val].append(par)
                graph[par].append(node.val)
            build(node.left,  node.val)
            build(node.right, node.val)
        build(root, None)
        visited, q, minutes = {start}, deque([start]), -1
        while q:
            minutes += 1
            for _ in range(len(q)):
                curr = q.popleft()
                for nb in graph[curr]:
                    if nb not in visited:
                        visited.add(nb); q.append(nb)
        return minutes
```

### Java
```java
class Solution {
    private Map<Integer, List<Integer>> graph = new HashMap<>();
    public int amountOfTime(TreeNode root, int start) {
        buildGraph(root, -1);
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        q.offer(start); visited.add(start);
        int minutes = -1;
        while (!q.isEmpty()) {
            minutes++;
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.poll();
                for (int nb : graph.getOrDefault(curr, new ArrayList<>())) {
                    if (!visited.contains(nb)) { visited.add(nb); q.offer(nb); }
                }
            }
        }
        return minutes;
    }
    private void buildGraph(TreeNode node, int par) {
        if (node == null) return;
        if (par != -1) {
            graph.computeIfAbsent(node.val, k -> new ArrayList<>()).add(par);
            graph.computeIfAbsent(par, k -> new ArrayList<>()).add(node.val);
        }
        buildGraph(node.left,  node.val);
        buildGraph(node.right, node.val);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Infection from internal node"** → parent map + BFS.
- **"C-Rank Distance K"** → same graph build, different stop condition.
- **"visited mandatory"** → undirected edges cycle without it.
- **"Level BFS"** → minutes = layer count after start.

If you only infected downward, add parent edges and redo BFS.

> 🎯 **Pattern Unlocked:** Parent-map multi-source BFS — tree as undirected graph.

---

*One quest down. Next: step directions via LCA path strings. →*
