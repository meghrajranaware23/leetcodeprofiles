<!-- hand-authored -->
# 📝 Tree Serialization & Deserialization

> **Day 16** · Serialization · 15 XP · 15 min read

---

Day 15 placed nodes on a coordinate grid. Today flatten a tree to a **string** and rebuild it — two encodings: **preorder with `#` null markers** for any binary tree, and **monotonic upper-bound stack** for BST from preorder alone.

> **Contrast (Day 8 construction):** Day 8 split preorder + inorder arrays. Day 16 encodes **structure explicitly** with `#` — or exploits **BST order** to decode preorder without a second array.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Encode structure, decode in same order:**

| Tree type | Encode | Decode |
|---|---|---|
| General binary tree | Preorder + `#` for null | Consume tokens left-to-right recursively |
| BST from preorder | Preorder alone (no `#`) | Monotonic stack / upper-bound recursion |

### 2. Simple explanation

**Preorder-with-null:** Visit root, then left subtree, then right — but **record `#` when a child is missing**. The `#` tokens preserve shape. String `"1,2,#,#,#,3,#,#"` says: root 1, left subtree is node 2 with no children, right subtree is node 3 with no children.

**BST from preorder:** Preorder of a BST is **not** arbitrary — each value must be `<` an upper bound inherited from ancestors. Read next value; if it exceeds bound, return null (that subtree ended). Left child gets bound = parent value; right keeps parent's bound. A **monotonic stack** tracks these bounds iteratively.

### 3. Visual — Preorder-with-null encoding

```
Tree:     1
         /
        2
         \
          3

Preorder with # (node, left, right):

  visit 1  → "1"
  visit 2  → "1,2"
  null left → "1,2,#"
  null right of 2... wait, 2 has right 3

Correct tree:
     1
    / \
   2   3

Serialization walk:
  1 → "1"
  2 → "1,2"
  # (2's left) → "1,2,#"
  # (2's right) → "1,2,#,#"  — if 2 is leaf

Standard example:
     1
    / \
   2   3
  / \
 #   #

Encode:
  1, 2, #, #, 3, #, #
  │  │  │  │  │  │  └─ 3's right null
  │  │  │  │  │  └──── 3's left null
  │  │  │  │  └─────── node 3
  │  │  │  └────────── 2's right null
  │  │  └───────────── 2's left null
  │  └──────────────── node 2
  └─────────────────── node 1

String: "1,2,#,#,#,3,#,#"

Decode (consume queue left-to-right):
  build() → reads 1 → left=build() reads 2 → left=# null, right=# null
         → right=build() reads 3 → left=#, right=#  ✓
```

### 4. Visual — Monotonic stack upper-bound for BST preorder

```
BST preorder: [8, 5, 1, 7, 10, 12]

Recursive upper-bound build:

  build(bound=∞): val=8, node 8
    left: build(bound=8): val=5, node 5
      left: build(5): val=1 ✓
      left: build(5): val=7 ✓
      left: build(5): val=10 > 5 → null (left done for 5)
    right: build(∞): val=10, node 10
      left: build(10): val=12 > 10 → null
      ...

Stack view (each step pushes val, pops while top > current):

  i=0 val=8:  stack [8]           root=8
  i=1 val=5:  5<8 → left of 8     stack [8,5]
  i=2 val=1:  1<5 → left of 5     stack [8,5,1]
  i=3 val=7:  pop while >7 → pop 1, pop 5; 7<8 → right of 5  stack [8,5,7]
  ...

  ┌─────────────────────────────────────────────┐
  │  if next val > bound → null (subtree ends)  │
  │  left child bound  = node.val               │
  │  right child bound = inherited bound        │
  │  Stack: pop while stack.top > current val   │
  └─────────────────────────────────────────────┘
```

### 5. The universal template

**Serialize / deserialize general tree:**
```
serialize(node):
    if null: return "#"
    return str(val) + "," + serialize(left) + "," + serialize(right)

deserialize(tokens):
    val = next token
    if val == "#": return null
    node = TreeNode(val)
    node.left = deserialize()
    node.right = deserialize()
    return node
```

**BST from preorder (upper-bound):**
```
build(bound):
    if i >= n or preorder[i] > bound: return null
    node = TreeNode(preorder[i++])
    node.left = build(node.val)
    node.right = build(bound)
    return node
```

### 6. Why encoding choices matter

| Wrong encoding | Problem |
|---|---|
| Preorder **without** `#` on general tree | Ambiguous — can't tell missing children |
| Level-order only | Harder recursive decode; needs length metadata |
| BST: sort preorder then build | O(n log n) — upper-bound is O(n) |
| JSON with nested arrays | Works but `#` preorder is interview standard |

### 7. Day 16 vs Day 8

| | **Day 8** | **Day 16** |
|---|---|---|
| Input | Two traversals | One string or BST preorder |
| Split | Inorder index | `#` tokens or upper bound |
| Tree type | General | General + BST special case |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "serialize/deserialize binary tree" | Preorder + `#` |
| "construct BST from preorder" | Upper-bound recursion / stack |
| "codec" class | Paired encode + decode |
| "single traversal" + BST | Monotonic bound — no inorder needed |

**Keywords:** `#` null marker · `preorder[i] > bound` · `consume token` · `stack pop while >`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Deserialize: not advancing token index | Strict left-to-right consume — left before right |
| Forgetting `#` for null child in serialize | Both null children → `#,#` |
| BST build: same bound for left and right | Left bound = node.val; right = inherited |
| Using inorder for BST #1008 | Overkill — upper-bound O(n) |
| Split on comma but values are negative | Tokenizer handles sign; or use queue of strings |

### 10. Recognition drill

Read this problem aloud:

> *"Design an algorithm to serialize and deserialize a binary tree."*

Before coding, say:

> *"Preorder with `#` for null. Deserialize: read token, if `#` return null, else make node, attach deserialize() left then right."*

---

*Structure in a string; BST order collapses the encoding. First quest: full serialize/deserialize. →*
