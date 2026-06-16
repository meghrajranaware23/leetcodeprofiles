<!-- hand-authored -->
# ⚔ Quest: Postorder Traversal

> **Day 10** · [Binary Tree Postorder Traversal #145](https://leetcode.com/problems/binary-tree-postorder-traversal/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Postorder Traversal on LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the **stack + last visited** pointer — when do you output vs pivot right? The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Postorder Traversal #145](https://leetcode.com/problems/binary-tree-postorder-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Iterative postorder** — push going left; at peek, if right exists and `last ≠ node.right`, go right; else output node, set `last = node`, pop.

If you're stuck after 5 minutes: popping immediately gives **preorder**. Postorder waits until both subtrees are done — `last` tracks what you just finished.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Iterative Postorder

**How to identify this from the problem statement:**
- **"Postorder" + "iterative"** → explicit stack, not recursion
- Visit order: left → right → node
- Classic interview stack simulation

| Keyword / phrase | What it signals |
|---|---|
| "iterative" / "without recursion" | Explicit stack |
| "postorder traversal" | Defer node until children done |
| "left, right, root" | `last` pointer guard |
| "follow-up: iterative" | Stack + cur pointer pattern |

**Why this pattern works:** The stack holds nodes whose left spine was pushed. `last` tells you whether the right subtree of `stack.top()` is already processed.

**How a strong solver thinks before coding:**
1. *"cur goes left, pushing each node."*
2. *"cur null → peek top."*
3. *"If right unvisited → cur = right."*
4. *"Else → output, last = node, pop."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Pop and output immediately** | Preorder, not postorder |
| **Two-stack reverse trick** | Valid for output-only, but miss the `last` learning for tree rewire |
| **BFS** | Wrong traversal family |
| **No `last` tracking** | Infinite loop re-processing right subtree |

**The insight brute force misses:** Postorder = "children first" — the stack must **peek**, not pop, until right is done.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Flatten BT to Linked List #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | Rewire instead of output | Reverse postorder order |
| [Preorder Traversal #144](https://leetcode.com/problems/binary-tree-preorder-traversal/) | Output on push/pop | Simpler stack |
| [Inorder Traversal #94](https://leetcode.com/problems/binary-tree-inorder-traversal/) | Go left, pop, go right | Stack variant |

Master postorder stack — it's the base for flatten and many iterative tree rewrites.

---

## 📖 Walkthrough

**Stack trace — when output fires.**

```
Tree:     1
         / \
        2   3
       /
      4

Target: [4, 2, 3, 1]

Push left spine: stack=[1,2,4], cur=null
Peek 4: no right → OUTPUT 4, last=4, pop   res=[4]
Peek 2: right? no → OUTPUT 2, last=2, pop  res=[4,2]
Peek 1: right=3, last≠3 → cur=3
Push 3: stack=[1,3], cur=null
Peek 3: OUTPUT 3, last=3, pop              res=[4,2,3]
Peek 1: right=3=last → OUTPUT 1, pop       res=[4,2,3,1] ✓
```

Decision at peek:

```
if node.right and last ≠ node.right:
    cur = node.right    ← children first
else:
    output node; last = node; pop
```

> 💡 **The insight:** Recursion's `left(); right(); node()` becomes explicit stack discipline — same order, you manage frames.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* prev = nullptr;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top();
            if (!curr->right || curr->right == prev) {
                res.push_back(curr->val);
                st.pop();
                prev = curr;
                curr = nullptr;
            } else {
                curr = curr->right;
            }
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res, stack, prev, curr = [], [], None, root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack[-1]
            if not curr.right or curr.right == prev:
                res.append(curr.val)
                stack.pop()
                prev = curr
                curr = None
            else:
                curr = curr.right
        return res
```

### Java
```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode prev = null, curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.peek();
            if (curr.right == null || curr.right == prev) {
                res.add(curr.val);
                stack.pop();
                prev = curr;
                curr = null;
            } else {
                curr = curr.right;
            }
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Iterative postorder"** → Stack + `last`, not pop-on-push.
- **"Right unvisited → go right"** → Defer parent output.
- **"last == node.right → done with children"** → Safe to output parent.
- **"Same visit order as recursion"** → left, right, node.

If you got `[1,2,4,3]` you implemented preorder stack behavior.

> 🎯 **Pattern Unlocked:** Iterative Postorder — peek, pivot right, output when children done.

---

*One quest down. Next: reverse postorder rewire for flatten. →*
