<!-- hand-authored -->
# ⚔ Quest: Recover BST

> **Day 26** · [Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Recover Binary Search Tree on LeetCode](https://leetcode.com/problems/recover-binary-search-tree/)**

> ⚔ **Hunter's rule:** Inorder must be sorted — find where `prev.val > node.val`. First dip: `first=prev`. Every dip: `second=node`. Goes deeper than C-Rank #99 — trace adjacent AND non-adjacent swaps. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Inorder anomaly detection** — one pass comparing each node to `prev`. Two swapped nodes → one dip (adjacent) or two dips (non-adjacent).

Optional A-Rank extension: Morris traversal for O(1) space instead of recursion stack.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Inorder Anomaly Detection

**How to identify this from the problem statement:**
- "Recover BST" / "two nodes swapped" → inorder sorted property broken
- In-place fix → swap two values, don't rebuild tree
- Follow-up O(1) space → Morris (Day 26 concept)

| Keyword / phrase | What it signals |
|---|---|
| "recover binary search tree" | Inorder violation scan |
| "two nodes swapped" | Exactly two values wrong |
| "without changing structure" | Swap vals only |
| C-Rank #99 baseline | first=prev on first dip |

**Why this pattern works:** BST inorder is strictly increasing. Swapping two values creates at most two adjacent out-of-order pairs in the sequence — constant-space tracking of `first` and `second` suffices.

**How a strong solver thinks before coding:**
1. *"Inorder DFS with prev pointer."*
2. *"If prev.val > node.val → violation."*
3. *"First violation: first=prev. Always: second=node."*
4. *"Swap first.val and second.val."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Collect values, sort, reassign** | O(n log n) — inorder O(n) works |
| **Validate then search** | Two passes |
| **Rebuild BST from sorted array** | Changes structure unnecessarily |
| **Track all violations in array** | Only two nodes — two pointers enough |

**The insight brute force misses:** The two wrong nodes are exactly the endpoints of the inorder dips — no global search needed.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [C-Rank Recover BST #99](https://leetcode.com/problems/recover-binary-search-tree/) | Same problem — test | Baseline inorder |
| [Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/) | Day 11 — detect not fix | Same inorder compare |
| [Kth Smallest #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Day 12 | Same walk, different stop |

Same skeleton: inorder = sorted order on BST.

---

## 📖 Walkthrough

**Tree with 2 and 4 swapped:**

```
      3
     / \
    1   4
       / \
      2   5

Inorder: 1, 4, 2, 5
              ↑ dip (prev=4 > 2)
  first=4? → first=prev=4 on first dip... wait first dip at 4:
  Visit 1: ok
  Visit 4: ok, prev=4
  Visit 2: 4>2 → first=4, second=2
  Swap 4↔2 → inorder 1,2,3,5 ✓
```

> 💡 **The insight:** C-test teaches the scan; A-Rank connects it to Morris for O(1) and adjacent vs non-adjacent case analysis.

---

## Solution

### C++
```cpp
class Solution {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev && prev->val > node->val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        inorder(node->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
};
```

### Python
```python
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        self.first = self.second = self.prev = None
        def inorder(node):
            if not node: return
            inorder(node.left)
            if self.prev and self.prev.val > node.val:
                if not self.first: self.first = self.prev
                self.second = node
            self.prev = node
            inorder(node.right)
        inorder(root)
        self.first.val, self.second.val = self.second.val, self.first.val
```

### Java
```java
class Solution {
    private TreeNode first, second, prev;
    public void recoverTree(TreeNode root) {
        inorder(root);
        int tmp = first.val; first.val = second.val; second.val = tmp;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && prev.val > node.val) {
            if (first == null) first = prev;
            second = node;
        }
        prev = node;
        inorder(node.right);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two swapped in BST"** → inorder dip detection.
- **"first = prev"** on first violation — not current node.
- **"second always updated"** on every violation — handles non-adjacent pair.
- **"C-Rank #99"** → same code; Morris optional for O(1) space.

If you sorted all values, refactor to one inorder pass.

> 🎯 **Pattern Unlocked:** Inorder anomaly detection — find dips, swap two vals.

---

*One quest down. Next: sorted list to balanced BST via bisect. →*
