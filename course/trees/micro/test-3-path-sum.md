<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 3

> [Path Sum #112](https://leetcode.com/problems/path-sum/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Path Sum on LeetCode](https://leetcode.com/problems/path-sum/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace root-to-leaf paths. Subtract as you go down. No peeking until you've genuinely tried.

---

## The Problem

Given the root of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that the sum of node values equals `targetSum`.

```
Input:  root = [5,4,8,11,null,13,4,7,2,null,null,null,1],  targetSum = 22

Output: true
Explanation: Path 5 → 4 → 11 → 2 sums to 22.

Input:  root = [1,2,3],  targetSum = 5
Output: false
```

A valid path must start at the root and end at a **leaf** (no children).

---

## 💡 Hints

> 🎯 **What's being tested:** Day 1 **↓ top-down** compass — carry remaining sum downward (preview of path problems in higher ranks).

**Hint 1:** This is **not** bottom-up like Max Depth. Pass **`targetSum - node.val`** to children.

**Hint 2:** Base at **leaf**: if no left and no right, check `targetSum == node.val`.

**Hint 3:** Empty tree (`null` root) → false.

**Hint 4:** Return **`hasPath(left) || hasPath(right)`** — either branch can win.

**Hint 5:** Don't collect all paths — short-circuit on first success. Boolean OR, not list generation.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Top-Down Target Reduction (↓ compass — Day 1 preview)

| Clue in the problem | What it signals |
|---|---|
| "root-to-leaf path" | Must end at leaf — check both children null |
| "sum equals target" | Subtract node.val going down |
| "return true if any path" | OR of left and right results |
| "path sum" | Top-down state, not ↑ bubble |
| Contrast "max depth" | Depth combines up; path carries down |

**Contrast with Max Depth #104:**

| Max Depth (↑) | Path Sum (↓) |
|---|---|
| Children return depths | Parent passes reduced target |
| `1 + max(L, R)` | `OR` on children |
| null → 0 | null → false |
| Any node answer | Leaf-only success check |

**How a strong solver thinks before coding:**
1. *"null → false."*
2. *"At leaf: targetSum == node.val?"*
3. *"rem = targetSum - node.val."*
4. *"hasPath(left, rem) || hasPath(right, rem)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Collect all root-to-leaf paths, then search** | O(n²) paths on skewed trees |
| **Bottom-up sum bubble** | Path direction is root-to-leaf, not subtree aggregate |
| **Check sum at every node, not just leaves** | Internal nodes don't count as path ends |
| **Forget to subtract current node before recursing** | Double-count or wrong remainder |
| **AND instead of OR on children** | Only one branch needs to succeed |

**The insight brute force misses:** Path problems usually **carry state down** (↓). Property problems (**depth**, **balance**) **combine up** (↑). Name the compass first.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Return all root-to-leaf paths where sum equals target."*

Same ↓ walk — collect path list at leaves (Path Sum II — later rank).

**Scenario:** *"Any node-to-node path sum?"*

Different problem — not root-to-leaf. Don't reuse #112 blindly.

**30-second check:** *"Subtract going down, leaf check, OR children."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return targetSum == root->val;
        return hasPathSum(root->left, targetSum - root->val) || hasPathSum(root->right, targetSum - root->val);
    }
};
```

### Python
```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False
        if not root.left and not root.right:
            return targetSum == root.val
        rem = targetSum - root.val
        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)
```

### Java
```java
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return targetSum == root.val;
        int rem = targetSum - root.val;
        return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
    }
}
```

**Complexity:** O(n) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Root-to-leaf"** → ↓ top-down — subtract, don't bubble sum up.
- **"Leaf check"** → Both children null before declaring success.
- **"OR not AND"** → Either subtree can contain the winning path.
- **Compass complete** → ↑ depth/balance, ↔ BFS, ⇄ parallel, ↓ path sum.

E-Rank tests all four directions. Path Sum is your **↓** exam question.

---

*3 of 3 test problems. E-Rank foundation complete. →*

## Solution

### C++
```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return root->val == targetSum;
        return hasPathSum(root->left,  targetSum - root->val) ||
               hasPathSum(root->right, targetSum - root->val);
    }
};
```

### Python
```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root: return False
        if not root.left and not root.right: return root.val == targetSum
        rem = targetSum - root.val
        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)
```

### Java
```java
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        int rem = targetSum - root.val;
        return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
    }
}
```

**Complexity:** undefined
