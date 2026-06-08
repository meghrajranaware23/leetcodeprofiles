# ⚔ Quest: Construct Quad Tree

> **Day 29** · [Construct Quad Tree #427](https://leetcode.com/problems/construct-quad-tree/) · Medium · 15 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Construct Quad Tree on LeetCode](https://leetcode.com/problems/construct-quad-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Quad Tree #427](https://leetcode.com/problems/construct-quad-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Divide and Conquer Tree Build**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Tree Build

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

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

Trace the pattern on a small tree before reading the code:

```
        3
       / \
      9    20
          /  \
         15   7

Apply Divide and Conquer Tree Build step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    Node* build(vector<vector<int>>& g, int r, int c, int y, int x) {
        bool same = true;
        int val = g[r][c];
        for (int i = r; i < y; ++i)
            for (int j = c; j < x; ++j)
                if (g[i][j] != val) { same = false; break; }
        if (same) return new Node(val == 1, true);
        int rm = (r + y) / 2, cm = (c + x) / 2;
        Node* node = new Node(true, false);
        node->topLeft = build(g, r, c, rm, cm);
        node->topRight = build(g, r, cm, rm, x);
        node->bottomLeft = build(g, rm, c, y, cm);
        node->bottomRight = build(g, rm, cm, y, x);
        return node;
    }
public:
    Node* construct(vector<vector<int>>& grid) {
        int n = grid.size();
        return build(grid, 0, 0, n, n);
    }
};
```

### Python
```python
class Solution:
    def construct(self, grid: List[List[int]]) -> Node:
        def build(r, c, y, x):
            val = grid[r][c]
            if all(grid[i][j] == val for i in range(r, y) for j in range(c, x)):
                return Node(val == 1, True)
            rm, cm = (r + y) // 2, (c + x) // 2
            node = Node(True, False)
            node.topLeft = build(r, c, rm, cm)
            node.topRight = build(r, cm, rm, x)
            node.bottomLeft = build(rm, c, y, cm)
            node.bottomRight = build(rm, cm, y, x)
            return node
        n = len(grid)
        return build(0, 0, n, n)
```

### Java
```java
class Solution {
    public Node construct(int[][] grid) {
        return build(grid, 0, 0, grid.length, grid.length);
    }
    Node build(int[][] g, int r, int c, int y, int x) {
        int val = g[r][c];
        for (int i = r; i < y; i++)
            for (int j = c; j < x; j++)
                if (g[i][j] != val) {
                    int rm = (r + y) / 2, cm = (c + x) / 2;
                    Node node = new Node(true, false);
                    node.topLeft = build(g, r, c, rm, cm);
                    node.topRight = build(g, r, cm, rm, x);
                    node.bottomLeft = build(g, rm, c, y, cm);
                    node.bottomRight = build(g, rm, cm, y, x);
                    return node;
                }
        return new Node(val == 1, true);
    }
}
```

**Complexity:** O(n log n) time · O(log n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Divide and Conquer Tree Build"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Divide and Conquer Tree Build

---

*Both quests complete. Head to the checkpoint. →*
