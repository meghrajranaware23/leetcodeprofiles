<!-- hand-authored -->
# ⚔ Quest: Serialize & Deserialize

> **Day 16** · [Serialize and Deserialize Binary Tree #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) · Hard · 25 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Serialize and Deserialize Binary Tree on LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Write preorder-with-`#` for a 3-node tree. Decode by consuming tokens left-to-right. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Serialize and Deserialize Binary Tree #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Preorder with null markers** — encode `"1,2,#,#,#,3,#,#"`; decode recursively consuming tokens in order.

If you're stuck after 5 minutes: serialize always emits `val,left,right` — null children become `#`. Deserialize: first token is root; next builds left subtree entirely before right starts.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Preorder with Null Markers

**How to identify this from the problem statement:**
- "Serialize and deserialize" → paired Codec class
- General binary tree — no BST guarantee
- Must preserve exact shape — `#` marks missing links

| Keyword / phrase | What it signals |
|---|---|
| "serialize binary tree" | Preorder + `#` |
| "deserialize" | Recursive token consumer |
| "design an algorithm" | Codec with O(n) both ways |
| "null nodes" | Explicit `#` encoding |

**Why this pattern works:** Preorder visits root before subtrees; `#` tokens tell decoder when a branch absent — unambiguous reconstruction.

**How a strong solver thinks before coding:**
1. *"Serialize: val, serialize(left), serialize(right); null → '#'."*
2. *"Split string to queue/list of tokens."*
3. *"Deserialize: pop token; if '#' return null."*
4. *"Else node = val; node.left = deserialize(); node.right = deserialize()."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Preorder without `#`** | Can't distinguish leaf from missing child |
| **Level-order only** | Needs null padding count — fragile |
| **Store node values in array + rebuild as BST** | Wrong if not BST |
| **Deserialize with wrong token order** | Must build left subtree fully before right |

**The insight brute force misses:** `#` is the **shape metadata** — same role as null pointers in memory.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Construct BST from Preorder #1008](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/) | Today's second quest | Preorder decode — BST bounds |
| [Serialize BST (simpler)](https://leetcode.com/) | No `#` needed | Preorder alone if no nulls |
| [Find Duplicate Subtrees #652](https://leetcode.com/problems/find-duplicate-subtrees/) | Serialize subtrees as keys | Same `#` encoding for hash |

Same preorder walk — encode/decode or hash subtree shape.

---

## 📖 Walkthrough

**Tree → string → tree:**

```
     1
    / \
   2   3

Serialize: "1,2,#,#,3,#,#"

Deserialize queue: [1,2,#,#,3,#,#]
  build → 1
    left: build → 2
      left: # → null
      right: # → null
    right: build → 3
      left: # → null
      right: # → null

Tree restored ✓
```

> 💡 **The insight:** Left subtree consumes tokens **until fully built** — then right subtree starts. Preorder order guarantees this works.

---

## Solution

### C++
```cpp
class Codec {
    TreeNode* build(queue<string>& q) {
        string val = q.front(); q.pop();
        if (val == "#") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left  = build(q);
        node->right = build(q);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        if (!root) return "#";
        return to_string(root->val) + "," +
               serialize(root->left) + "," +
               serialize(root->right);
    }
    TreeNode* deserialize(string data) {
        queue<string> q;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) q.push(token);
        return build(q);
    }
};
```

### Python
```python
class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        if not root: return '#'
        return f'{root.val},{self.serialize(root.left)},{self.serialize(root.right)}'

    def deserialize(self, data: str) -> Optional[TreeNode]:
        vals = iter(data.split(','))
        def build():
            val = next(vals)
            if val == '#': return None
            node = TreeNode(int(val))
            node.left  = build()
            node.right = build()
            return node
        return build()
```

### Java
```java
public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "#";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }
    public TreeNode deserialize(String data) {
        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));
        return build(q);
    }
    private TreeNode build(Queue<String> q) {
        String val = q.poll();
        if (val.equals("#")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left  = build(q);
        node.right = build(q);
        return node;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Serialize general tree"** → preorder + `#` — no shortcuts.
- **"1,2,#,#,#,3,#,#"** → memorize the walk on paper once.
- **"Deserialize = build left fully first"** → token queue order is sacred.
- **"Not BST #1008"** → need `#` markers here.

If decode produced wrong shape, trace token consumption — right subtree started too early?

> 🎯 **Pattern Unlocked:** Preorder with Null Markers — `#` encodes shape.

---

*One quest down. Next: BST from preorder with upper-bound stack. →*
