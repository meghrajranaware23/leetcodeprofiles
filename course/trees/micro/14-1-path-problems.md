# 📝 Path Problems: Root-to-Leaf & Any-to-Any

> **Day 14** · Path Problems · ★★★★☆ · 15 XP · 15 min read

---

Your mission today: **understand Path Sum Patterns visually** before you touch any code. Trace the tree on paper. Watch information flow. Then the recursion becomes obvious.

---

## Part 1 — Why Does This Work?

### 1. What is the pattern?

**Path Sum Patterns** — the core technique you'll use in today's quests.

Every tree problem reduces to one question: *Where does information flow?*
- **Down** (top-down): carry state as you descend
- **Up** (bottom-up): ask children, combine at parent
- **Across** (BFS): process level by level with a queue
- **Side-by-side** (parallel): compare or merge two trees

### 2. Simple explanation

Think of a tree like a family tree. You start at the root (the ancestor). To visit everyone, you either:
- Go **deep first** (DFS) — finish one branch before the next
- Go **wide first** (BFS) — visit all children before grandchildren

Recursion is just: *"I'll handle my part, and trust my children to handle theirs."*

### 3. Visual walkthrough

```
        1
       / \
      2    3
     / \    \
    4    5    6

Step 1: Start at root [1]
Step 2: Go left to [2]
Step 3: Go left to [4] (leaf — return)
Step 4: Back to [2], go right to [5] (leaf — return)
Step 5: Back to [1], go right to [3]
Step 6: Go right to [6] (leaf — return)
```

### 4. How the pattern works

```
function solve(node):
    if node is null: return base_case
    left_result  = solve(node.left)   // trust left subtree
    right_result = solve(node.right)  // trust right subtree
    return combine(node, left_result, right_result)
```

The magic: you never need to think about the whole tree — just the current node and what your children return.

### 5. What problem does this solve?

| Problem family | How this pattern helps |
|---|---|
| Traversals | Visit every node in a specific order |
| Properties (height, depth, count) | Combine child results at each node |
| Path problems | Carry running state down or gather up |
| Tree comparison | Mirror recursion on two trees |
| Construction | Split and rebuild from traversal orders |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Store all paths in an array | O(n²) space — most nodes aren't on the answer path |
| BFS when DFS suffices | Unnecessary queue overhead |
| Global traversal without recursion | You lose the natural subtree structure |
| Iterating without understanding order | Wrong visit order = wrong answer |

### 7. The key observation

**A tree is defined by its subtrees.** Every node is the root of its own smaller tree. Recursion exploits this: solve the big tree by solving two smaller trees and combining.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "traverse" / "visit all nodes" | DFS or BFS |
| "depth" / "height" / "max depth" | Bottom-up recursion |
| "path from root to leaf" | Top-down with running state |
| "diameter" / "longest path" | Bottom-up + global update |
| "same tree" / "symmetric" / "subtree" | Parallel recursion |
| "level order" / "each level" | BFS with queue |
| "BST" / "sorted" / "validate" | BST invariant + inorder |
| "lowest common ancestor" | Split detection recursion |

**Keywords:** `binary tree` · `subtree` · `root-to-leaf` · `depth` · `traverse` · `recursive`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting null base case | Always check `if not node: return` |
| Confusing depth vs height | Depth = distance from root; height = distance to deepest leaf |
| Not returning child results | Bottom-up MUST return combined value |
| Mixing up traversal orders | Draw the tree and trace by hand first |
| Using global when return works | Prefer returning values over globals when possible |

### 10. Recognition drill

Read this problem aloud:

> *"Given a binary tree, find its maximum depth."*

Before coding, say:

> *"Depth = 1 + max(left depth, right depth) → bottom-up recursion, base case null returns 0."*

---

*You understand the pattern. Your first quest puts it into practice. →*
