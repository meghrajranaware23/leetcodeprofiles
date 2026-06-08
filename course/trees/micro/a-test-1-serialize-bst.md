# ⚔ A-Rank Test — Problem 1

> [Serialize and Deserialize BST #449](https://leetcode.com/problems/serialize-and-deserialize-bst/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Serialize and Deserialize BST on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-bst/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Serialize and Deserialize BST #449](https://leetcode.com/problems/serialize-and-deserialize-bst/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Codec {
    int i = 0;
    long read(const string& s) {
        long sign = 1, val = 0;
        if (s[i] == '-') { sign = -1; ++i; }
        while (i < (int)s.size() && isdigit(s[i])) val = val * 10 + (s[i++] - '0');
        return sign * val;
    }
    TreeNode* build(const string& s, long lo, long hi) {
        if (i >= (int)s.size()) return nullptr;
        int start = i;
        long val = read(s);
        if (val <= lo || val >= hi) { i = start; return nullptr; }
        TreeNode* node = new TreeNode((int)val);
        node->left = build(s, lo, val);
        node->right = build(s, val, hi);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        return to_string(root->val) + serialize(root->left) + serialize(root->right);
    }
    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        i = 0;
        return build(data, LONG_MIN, LONG_MAX);
    }
};
```

### Python
```python
class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        def pre(node):
            if not node:
                return ''
            return str(node.val) + pre(node.left) + pre(node.right)
        return pre(root)
    def deserialize(self, data: str) -> Optional[TreeNode]:
        self.i = 0
        def build(lo, hi):
            if self.i >= len(data):
                return None
            if data[self.i] == '-':
                j = self.i + 1
                while j < len(data) and data[j].isdigit():
                    j += 1
                val = int(data[self.i:j])
                self.i = j
            else:
                val = int(data[self.i])
                self.i += 1
            if not (lo < val < hi):
                self.i -= len(str(val))
                return None
            node = TreeNode(val)
            node.left = build(lo, val)
            node.right = build(val, hi)
            return node
        return build(float('-inf'), float('inf'))
```

### Java
```java
public class Codec {
    int i = 0;
    public String serialize(TreeNode root) {
        if (root == null) return "";
        return root.val + serialize(root.left) + serialize(root.right);
    }
    public TreeNode deserialize(String data) {
        i = 0;
        return build(data, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    TreeNode build(String s, long lo, long hi) {
        if (i >= s.length()) return null;
        int start = i;
        if (s.charAt(i) == '-') i++;
        while (i < s.length() && Character.isDigit(s.charAt(i))) i++;
        long val = Long.parseLong(s.substring(start, i));
        if (val <= lo || val >= hi) { i = start; return null; }
        TreeNode node = new TreeNode((int) val);
        node.left = build(s, lo, val);
        node.right = build(s, val, hi);
        return node;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
