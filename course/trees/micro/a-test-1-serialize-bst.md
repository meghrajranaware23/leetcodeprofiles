<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 1

> [Serialize and Deserialize BST #449](https://leetcode.com/problems/serialize-and-deserialize-bst/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Serialize and Deserialize BST on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-bst/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. BST preorder + bounds rebuild is the A-Rank payoff from Days 11–23. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Serialize and Deserialize BST #449](https://leetcode.com/problems/serialize-and-deserialize-bst/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **BST-aware serialize** — preorder alone works for BST (not general binary tree). Deserialize with **min/max bounds** — no null markers needed.

- **Serialize:** preorder values comma-separated (skip nulls — BST structure recoverable).
- **Deserialize:** queue/iterator of values; `build(lo, hi)` — if front not in `(lo, hi)`, return null; else consume as root, recurse `(lo, val-1)` and `(val+1, hi)`.
- Faster/smaller than general tree codec (#297) because BST ordering constrains rebuild.
- Connects Day 11 validate-BST bounds + Day 23 inorder ordering.

**Pattern name before coding:** *Preorder serialize + bounded queue rebuild.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Serialize/deserialize **BST**" → use ordering — not full #297 with null tokens
- Preorder first value = root; all left subtree values < root in queue order
- Design class `Codec` with two methods

**How a strong solver thinks before coding:**
1. *"Preorder string — no nulls for BST."*
2. *"Deserialize: peek queue front, check lo ≤ val ≤ hi."*
3. *"Left build(lo, val-1), right build(val+1, hi)."*
4. *"Same bounds idea as Validate BST #98."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **General tree serialize with nulls (#297)** | Works but longer string — BST bounds omit nulls |
| **Inorder only serialize** | Can't rebuild unique BST from inorder alone |
| **Level order without BST property** | Needs null markers — heavier |
| **Sort deserialized values and rebuild** | O(n log n) — bounds linear rebuild |

---

## 🎯 Transfer to Unseen Problems

Same **bounded build** as validate BST and construct-from-preorder. If you mastered Day 11 range checks, deserialize is validate-in-reverse: consume values that fit current range.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Codec {
    TreeNode* build(queue<int>& q, int lo, int hi) {
        if (q.empty() || q.front() < lo || q.front() > hi) return nullptr;
        int val = q.front(); q.pop();
        TreeNode* node = new TreeNode(val);
        node->left  = build(q, lo, val - 1);
        node->right = build(q, val + 1, hi);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        string res = to_string(root->val);
        if (root->left)  res += "," + serialize(root->left);
        if (root->right) res += "," + serialize(root->right);
        return res;
    }
    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        queue<int> q;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) q.push(stoi(token));
        return build(q, INT_MIN, INT_MAX);
    }
};
```

### Python
```python
class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        if not root: return ''
        parts = []
        def pre(node):
            if not node: return
            parts.append(str(node.val))
            pre(node.left); pre(node.right)
        pre(root)
        return ','.join(parts)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data: return None
        vals = iter(map(int, data.split(',')))
        def build(lo, hi):
            v = next(vals, None)
            if v is None or not (lo <= v <= hi): return None
            node = TreeNode(v)
            node.left  = build(lo, v - 1)
            node.right = build(v + 1, hi)
            return node
        # Need to peek; use a queue approach
        from collections import deque
        q = deque(map(int, data.split(',')))
        def build2(lo, hi):
            if not q or not (lo <= q[0] <= hi): return None
            v = q.popleft()
            node = TreeNode(v)
            node.left  = build2(lo, v - 1)
            node.right = build2(v + 1, hi)
            return node
        return build2(float('-inf'), float('inf'))
```

### Java
```java
public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        preorder(root, sb);
        return sb.substring(0, sb.length()-1);
    }
    private void preorder(TreeNode node, StringBuilder sb) {
        if (node == null) return;
        sb.append(node.val).append(',');
        preorder(node.left, sb); preorder(node.right, sb);
    }
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Deque<Integer> q = new ArrayDeque<>();
        for (String s : data.split(",")) q.offer(Integer.parseInt(s));
        return build(q, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    private TreeNode build(Deque<Integer> q, int lo, int hi) {
        if (q.isEmpty() || q.peek() < lo || q.peek() > hi) return null;
        int val = q.poll();
        TreeNode node = new TreeNode(val);
        node.left  = build(q, lo, val-1);
        node.right = build(q, val+1, hi);
        return node;
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Serialize BST"** → preorder without nulls — ordering carries structure.
- **"Deserialize with bounds"** → Validate BST #98 ranges on a value queue.
- **"Not #297"** → BST special case is leaner.
- **"Day 23 augmentation"** → inorder order implicit in rebuild.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Codec {
    TreeNode* build(queue<int>& q, int lo, int hi) {
        if (q.empty() || q.front() < lo || q.front() > hi) return nullptr;
        int val = q.front(); q.pop();
        TreeNode* node = new TreeNode(val);
        node->left  = build(q, lo, val - 1);
        node->right = build(q, val + 1, hi);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        string res = to_string(root->val);
        if (root->left)  res += "," + serialize(root->left);
        if (root->right) res += "," + serialize(root->right);
        return res;
    }
    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        queue<int> q;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) q.push(stoi(token));
        return build(q, INT_MIN, INT_MAX);
    }
};
```

### Python
```python
class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        if not root: return ''
        parts = []
        def pre(node):
            if not node: return
            parts.append(str(node.val))
            pre(node.left); pre(node.right)
        pre(root)
        return ','.join(parts)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data: return None
        vals = iter(map(int, data.split(',')))
        def build(lo, hi):
            v = next(vals, None)
            if v is None or not (lo <= v <= hi): return None
            node = TreeNode(v)
            node.left  = build(lo, v - 1)
            node.right = build(v + 1, hi)
            return node
        # Need to peek; use a queue approach
        from collections import deque
        q = deque(map(int, data.split(',')))
        def build2(lo, hi):
            if not q or not (lo <= q[0] <= hi): return None
            v = q.popleft()
            node = TreeNode(v)
            node.left  = build2(lo, v - 1)
            node.right = build2(v + 1, hi)
            return node
        return build2(float('-inf'), float('inf'))
```

### Java
```java
public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        preorder(root, sb);
        return sb.substring(0, sb.length()-1);
    }
    private void preorder(TreeNode node, StringBuilder sb) {
        if (node == null) return;
        sb.append(node.val).append(',');
        preorder(node.left, sb); preorder(node.right, sb);
    }
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Deque<Integer> q = new ArrayDeque<>();
        for (String s : data.split(",")) q.offer(Integer.parseInt(s));
        return build(q, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    private TreeNode build(Deque<Integer> q, int lo, int hi) {
        if (q.isEmpty() || q.peek() < lo || q.peek() > hi) return null;
        int val = q.poll();
        TreeNode node = new TreeNode(val);
        node.left  = build(q, lo, val-1);
        node.right = build(q, val+1, hi);
        return node;
    }
}
```

**Complexity:** undefined
