# ⚔ D-Rank Test — Problem 2

> [Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Construct Binary Tree from Preorder and Inorder Traversal on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    unordered_map<int,int> idx;
    int pre;
    TreeNode* build(vector<int>& preorder, int l, int r) {
        if (l > r) return nullptr;
        int val = preorder[pre++];
        TreeNode* node = new TreeNode(val);
        node->left  = build(preorder, l, idx[val] - 1);
        node->right = build(preorder, idx[val] + 1, r);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        pre = 0;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
};
```

### Python
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        self.pre = 0
        def build(l, r):
            if l > r: return None
            val = preorder[self.pre]; self.pre += 1
            node = TreeNode(val)
            node.left  = build(l, idx[val] - 1)
            node.right = build(idx[val] + 1, r)
            return node
        return build(0, len(inorder) - 1)
```

### Java
```java
class Solution {
    private Map<Integer,Integer> idx = new HashMap<>();
    private int pre = 0;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] preorder, int l, int r) {
        if (l > r) return null;
        int val = preorder[pre++];
        TreeNode node = new TreeNode(val);
        node.left  = build(preorder, l, idx.get(val) - 1);
        node.right = build(preorder, idx.get(val) + 1, r);
        return node;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
