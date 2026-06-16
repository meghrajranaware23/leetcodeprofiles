<!-- hand-authored -->
# 📝 BST Operations: Insert, Delete, Kth

> **Day 12** · BST Operations · ★★★☆☆ · 15 XP · 15 min read

---

Day 11 read the BST — search and validate. Today you **modify** it: walk to the kth sorted value without visiting every node, and surgically remove a key while preserving order. Both lean on **inorder = sorted** and the **three delete cases**.

> **Contrast (Day 11):** Yesterday = read-only walks. Today = inorder early-stop + structural surgery on delete.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BST modification via inorder + targeted rewire:**

- **Kth smallest:** inorder visits values in sorted order — count and **stop early** at k
- **Delete:** search to target, then apply one of **three child-count cases**

| Operation | Core idea | Early exit? |
|---|---|---|
| Kth smallest | Left → node → right; decrement k at node | Yes — stop when k hits 0 |
| Delete | Search like Day 11, then rewire | Stop when key removed |

### 2. Simple explanation

**Inorder on a BST** prints values smallest-to-largest. The 1st node you fully process (after left subtree) is the smallest; the 2nd is next — so the kth **visit** after finishing left children is your answer. No need to collect all values.

**Delete** finds the node, then:
- **0 children:** snip it — return null to parent
- **1 child:** bypass — return the non-null child
- **2 children:** replace value with **inorder successor** (leftmost of right subtree), then delete that successor

### 3. Visual — Inorder kth with early stop

```
BST:        5
           / \
          3   7
         / \   \
        2   4   8

Inorder visit order: 2, 3, 4, 5, 7, 8

Find k = 3 (3rd smallest):

  dfs(5): go left first
  dfs(3): go left
  dfs(2): left null → visit 2, k=3→2
  dfs(2): right null
  back dfs(3): visit 3, k=2→1
  dfs(4): visit 4, k=1→0  ← STOP, ans = 4

Never visited 5, 7, 8. Early termination saved half the tree.
```

### 4. Visual — Delete: three cases

```
CASE 0 — Leaf (0 children):
    parent → [X]  becomes  parent → null

CASE 1 — One child:
    parent → [X] → [C]  becomes  parent → [C]

CASE 2 — Two children:
    Before:          After (successor swap):
        8                9
       / \              / \
      3   10    →      3   10
         / \              / \
        9   11           8   11

    Step 1: Find leftmost of right subtree (9)
    Step 2: Copy 9's value into node 8
    Step 3: Delete 9 from right subtree (now Case 0 or 1)

  ┌─────────────────────────────────────────────────┐
  │  0 children → return null                       │
  │  1 child    → return the sole child             │
  │  2 children → copy successor val, delete succ   │
  └─────────────────────────────────────────────────┘
```

### 5. The universal template

**Kth smallest (recursive early-stop):**
```
function dfs(node):
    if not node: return
    dfs(node.left)
    k -= 1
    if k == 0: ans = node.val; return
    dfs(node.right)
```

**Kth smallest (iterative — same order):**
```
push all left spine onto stack
pop → process → if k==0 return val → push left spine of right
```

**Delete (returns new subtree root):**
```
function delete(node, key):
    if not node: return null
    if key < node.val: node.left = delete(node.left, key)
    elif key > node.val: node.right = delete(node.right, key)
    else:  // found
        if no left: return node.right
        if no right: return node.left
        succ = leftmost(node.right)
        node.val = succ.val
        node.right = delete(node.right, succ.val)
    return node
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Collect all values, sort, pick kth | O(n log n) — ignores BST order |
| Full inorder without early stop | O(n) always — wasteful when k is small |
| Delete by rebuilding tree | O(n) — unnecessary |
| Swap with predecessor AND successor | Pick one convention (successor is standard) |

**The insight:** BST structure **is** the sorted index. Inorder is the iterator; delete cases preserve that index with local rewires.

### 7. Day 12 vs Day 11

| | **Day 11** | **Day 12** |
|---|---|---|
| Goal | Find / validate | Rank (kth) / remove |
| Traversal | Single-path search | Inorder with counter |
| Mutates tree? | No | Delete yes |
| Key skill | Range bounds | Three delete cases |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "kth smallest in BST" | Inorder early-stop |
| "delete node in BST" | Search + 0/1/2 case rewire |
| "successor" / "predecessor" | Leftmost-right or rightmost-left |
| "BST iterator" (C-Rank test) | Lazy inorder — stack of left spines |

**Keywords:** `inorder` · `k--` · `successor` · `return new root` · `early termination`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Not stopping inorder after kth found | Check k after processing node; return immediately |
| Delete Case 2: physically swap nodes | Copy **value** only; delete successor node structurally |
| Forgetting to assign `node.left = delete(...)` | Delete returns updated subtree root — capture it |
| Off-by-one on k (0-index vs 1-index) | LeetCode #230 is 1-indexed — decrement after visiting |
| Using predecessor and successor interchangeably | Pick successor (leftmost of right) — stay consistent |

### 10. Recognition drill

Read this problem aloud:

> *"Delete a node with two children from a BST."*

Before coding, say:

> *"Find node. Two children → copy inorder successor value, delete successor from right subtree. Return updated root from every recursive call."*

---

*Inorder ranks; delete rewires. First quest: stop early at the kth visit. →*
