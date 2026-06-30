<!-- hand-authored -->
# ⚔ Quest: Kth Smallest in BST

> **Day 12** · [Kth Smallest Element in a BST #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Kth Smallest Element in a BST on LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Write the inorder visit sequence. Mark where k decrements to 0. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Kth Smallest Element in a BST #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Inorder early termination** — left, visit (k--), right; stop when k hits 0.

If you're stuck after 5 minutes: iterative version — push all left nodes, pop one (that's an inorder step), move to right child and repeat. Same early-stop logic.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Inorder Early Termination

**How to identify this from the problem statement:**
- "kth smallest **in BST**" → sorted order = inorder traversal
- Don't need full array — count visits and **stop**
- k is 1-indexed on LeetCode — decrement after processing each node

| Keyword / phrase | What it signals |
|---|---|
| "kth smallest in BST" | Inorder with counter |
| "without extra space" (follow-ups) | Morris traversal (advanced) or iterative stack |
| "BST" + rank/order statistic | Never sort all values — walk inorder |
| "early termination" | Return as soon as k == 0 |

**Why this pattern works:** BST inorder produces globally sorted sequence. The kth element in that sequence is the answer — visit until count reaches k.

**How a strong solver thinks before coding:**
1. *"Inorder = left, node, right."*
2. *"After visiting node, k--. If k==0, record answer."*
3. *"Don't recurse right if already found."*
4. *"Iterative stack = same order, O(h) space."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Inorder into array, return arr[k-1]** | O(n) time and space always — no early stop |
| **Sort all node values** | O(n log n) — destroys BST structure benefit |
| **Heap / priority queue** | Overkill for BST with natural ordering |
| **Decrement k before visiting node** | Off-by-one — process node first, then k-- |

**The insight brute force misses:** You only need the **first k** inorder elements. Small k on a large tree should touch far fewer than n nodes.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/) | C-Rank test — lazy one-at-a-time | Stack of left spines |
| [Kth Largest in Stream #703](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Not a tree — heap | Different structure, same "kth order" idea |
| [Minimum Absolute Difference in BST #530](https://leetcode.com/problems/minimum-absolute-difference-in-bst/) | Track best on consecutive inorder visits | Same left-visit-right walk |

Same skeleton: inorder order unlocks rank queries.

---

## 📖 Walkthrough

**k = 3 on tree from concept page:**

```
        5
       / \
      3   7
     / \   \
    2   4   8

Inorder: 2 → 3 → 4 → 5 → 7 → 8

  Visit 2: k 3→2
  Visit 3: k 2→1
  Visit 4: k 1→0  → ans = 4, STOP ✓

Nodes 5, 7, 8 never visited.
```

> 💡 **The insight:** Inorder is the BST's sorted iterator. k is just "advance k steps and read."

---

## Solution

### C++
```cpp
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top(); st.pop();
            if (--k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack, curr = [], root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0: return curr.val
            curr = curr.right
        return -1
```

### Java
```java
class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.pop();
            if (--k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"kth smallest in BST"** → inorder, not sort.
- **"Early stop"** → return when k hits 0; don't finish traversal.
- **"Stack iterative"** → push left spine, pop, go right — same as recursive order.
- **"Preview of BST Iterator"** → C-Rank test uses this lazy inorder.

If you collected all values first, refactor — the counter during inorder is the point.

> 🎯 **Pattern Unlocked:** Inorder Early Termination — sorted walk with k counter.

---

*One quest down. Next: delete with the three-case diagram. →*
