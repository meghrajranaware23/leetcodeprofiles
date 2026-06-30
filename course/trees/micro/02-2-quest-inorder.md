<!-- hand-authored -->
# ⚔ Quest: Inorder Traversal

> **Day 2** · [Binary Tree Inorder Traversal #94](https://leetcode.com/problems/binary-tree-inorder-traversal/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Inorder Traversal on LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)**

> ⚔ **Hunter's rule:** Draw the tree. Number the visit order 1–5 before coding. Inorder = **Left → Root → Right**. Hints are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, return the **inorder** traversal of its nodes' values.

```
Input:       1
              \
               2
              /
             3

Output: [1, 3, 2]

Input:       3
            / \
           9  20
             /  \
            15   7

Output: [9, 3, 15, 20, 7]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Inorder DFS** — recurse left, **record** node, recurse right. null adds nothing.

If stuck: on the 3-node tree above, you go left to 9, record 9, back to 3, record 3, then explore 20's left (15), record 15, record 20, record 7.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Inorder DFS (Left → Root → Right)

**How to identify this from the problem statement:**
- Problem name says **inorder** — order is non-negotiable
- Return list of values in visit sequence
- Binary tree → two recursive calls bracketing one record step

| Keyword / phrase | What it signals |
|---|---|
| "inorder traversal" | Left → Root → Right |
| "return list of values" | Append at process step |
| "binary tree" + named order | Match order name exactly |
| "left subtree first" | Recurse left before recording |
| "BST sorted" (related) | Inorder on BST = sorted |

**Why this pattern works:** Inorder always fully explores left, processes current, then explores right. Every node is recorded exactly once, in that fixed order.

**How a strong solver thinks before coding:**
1. *"null → return (add nothing)."*
2. *"inorder(left)"*
3. *"record node.val"*
4. *"inorder(right)"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Preorder or postorder instead** | Wrong list — same nodes, wrong order |
| **BFS level-order** | Completely different sequence |
| **Store all root-to-leaf paths** | O(n²) space; misses inorder definition |
| **Process node before left child** | That's preorder, not inorder |
| **Skip iterative when stack asked** | Morris/stack versions still follow Left-Root-Right |

**The insight brute force misses:** The problem specifies **when** to record, not **whether** to visit. One misplaced `record()` breaks the output.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/) | Check inorder is strictly increasing | Inorder visit order |
| [Kth Smallest Element in a BST #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Stop at kth record | Inorder with counter |
| [Binary Tree Postorder Traversal #145](https://leetcode.com/problems/binary-tree-postorder-traversal/) | Record **after** children | Same tree, different order |

Same DFS frame — only the record line moves.

---

## 📖 Walkthrough

**Inorder on the classic tree — Left → Root → Right.**

```
        3
       / \
      9  20
        /  \
       15   7

Step 1: inorder(3)
  → inorder(9): no left → record 9 → no right
     Output so far: [9]

Step 2: back at 3 → record 3
     Output: [9, 3]

Step 3: inorder(20)
  → inorder(15): record 15
     Output: [9, 3, 15]
  → record 20
     Output: [9, 3, 15, 20]
  → inorder(7): record 7
     Output: [9, 3, 15, 20, 7]  ✓

Compare preorder (tomorrow's quest): [3, 9, 20, 15, 7]
Same nodes — root recorded at different step.
```

> 💡 **The insight:** Inorder "waits" until left subtree finishes before recording the root. That's why 9 appears before 3.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top(); st.pop();
            res.push_back(curr->val);
            curr = curr->right;
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res, stack, curr = [], [], root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            res.append(curr.val)
            curr = curr.right
        return res
```

### Java
```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.pop();
            res.add(curr.val);
            curr = curr.right;
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Inorder"** → Left, **record**, Right — say it every time.
- **"Not preorder"** → Root is **middle**, not first.
- **"Stack iterative"** → Push all lefts, pop, record, go right — mimics recursion.
- **"Same tree as preorder quest"** → Compare outputs: [9,3,15,20,7] vs [3,9,20,15,7].

If your output starts with the root, you wrote preorder by accident.

> 🎯 **Pattern Unlocked:** Inorder DFS — record node between left and right subtrees.

---

*One quest down. Next: same tree, but record the root **first** — preorder. →*
