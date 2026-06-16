<!-- hand-authored -->
# ⚔ Quest: N-ary Tree Depth

> **Day 19** · [Maximum Depth of N-ary Tree #559](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/) · Easy · 10 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Depth of N-ary Tree on LeetCode](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/)**

> ⚔ **Hunter's rule:** Draw an N-ary tree (children list — **no left/right**). Bubble max depth from leaves up. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Depth of N-ary Tree #559](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **N-ary recursion** — `for child in node.children: best = max(best, dfs(child))`; return `best + 1`. Empty/null → 0.

If you're stuck after 5 minutes: this is Day 4 max depth with **one loop** replacing left/right calls. No binary DFS visual applies.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** N-ary Recursion

**How to identify this from the problem statement:**
- `Node` has `children: List[Node]` — not binary
- "Maximum depth" → bottom-up from all children
- Single node with no children → depth 1

| Keyword / phrase | What it signals |
|---|---|
| "N-ary tree" / "children array" | Loop children |
| "maximum depth" | 1 + max child depth |
| "Node with val and children" | `#559` API |
| "general tree" | Not `.left` / `.right` |

**Why this pattern works:** Depth = longest path to any leaf. Each child reports its subtree depth; parent takes max over **all** siblings in the list.

**How a strong solver thinks before coding:**
1. *"null → 0."*
2. *"best = 0; for each child: best = max(best, dfs(child))."*
3. *"return best + 1."*
4. *"Empty children → return 1 (leaf)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Hardcode left/right on N-ary node** | Wrong API — compile error |
| **Sum children depths** | Want max, not sum |
| **BFS without need** | Works but postorder loop is simpler |
| **Return 0 for leaf** | Leaf node itself counts — depth 1 |

**The insight brute force misses:** Binary template becomes a for-loop — same bubble-up logic.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Max Depth Binary Tree #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Day 4 — two children | max(left,right)+1 |
| [N-ary Tree Level Order #429](https://leetcode.com/problems/n-ary-tree-level-order-traversal/) | BFS collect levels | Same `children` list |
| [Diameter of N-ary Tree](https://leetcode.com/problems/) | Global combine | Loop + max |

---

## 📖 Walkthrough

```
N-ary tree:

           1
        /  |  \
       3   2   4
          /
         5
        / \
       6   7

Bubble returns upward:

  6 → 1    7 → 1
  5 → max(1,1)+1 = 2
  3 → 1    2 → 1    4 → 1
  1 → max(1,1,1,2)+1 = 3  ✓

Loop all children — not left/right branches.
```

> 💡 **The insight:** Replace `max(dfs(left), dfs(right))` with `max over children loop`.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxDepth(Node* root) {
        if (!root) return 0;
        int best = 0;
        for (Node* child : root->children)
            best = max(best, maxDepth(child));
        return best + 1;
    }
};
```

### Python
```python
class Solution:
    def maxDepth(self, root: 'Node') -> int:
        if not root: return 0
        return 1 + max((self.maxDepth(c) for c in root.children), default=0)
```

### Java
```java
class Solution {
    public int maxDepth(Node root) {
        if (root == null) return 0;
        int best = 0;
        for (Node child : root.children)
            best = Math.max(best, maxDepth(child));
        return best + 1;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"children list"** → for-loop, not left/right.
- **"max + 1 bubble"** → same as Day 4 binary depth.
- **"default=0 on empty children"** → leaf returns 1.
- **"N-ary ≠ binary diagram"** → star-shaped nodes.

> 🎯 **Pattern Unlocked:** N-ary Recursion

---

*Both quests complete. Head to the checkpoint. →*
