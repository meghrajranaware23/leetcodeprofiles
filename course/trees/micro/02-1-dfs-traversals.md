<!-- hand-authored -->
# 📝 DFS: Inorder, Preorder, Postorder

> **Day 2** · DFS Traversals · 10 XP · 10 min read

---

Your mission today: **learn visit order by name** — not a generic "walk the tree." Inorder and preorder visit the **same nodes** but in **different sequences**. Draw one tree. Trace both orders side by side. Then the quest code is just recording when you "process" each node.

---

## Part 1 — Visit Order Is the Pattern

### 1. What is DFS traversal?

**Depth-first search** on a tree: go as deep as possible before backtracking. The only difference between inorder, preorder, and postorder is **when you record the current node's value** relative to the two recursive calls:

| Order | When you visit (process) node | Mnemonic |
|---|---|---|
| **Preorder** | **Before** left and right | Root → Left → Right |
| **Inorder** | **Between** left and right | Left → Root → Right |
| **Postorder** | **After** left and right | Left → Right → Root |

Day 2 quests: **inorder** (#94) and **preorder** (#144). Same tree, different output lists.

### 2. The same tree — two numbered sequences

Use this tree for every trace today:

```
        3
       / \
      9  20
        /  \
       15   7
```

**Preorder #144 — process node FIRST:**

```
Visit order:  3 → 9 → 20 → 15 → 7

 1. Process 3       (root first)
 2. Process 9       (left subtree, leaf)
 3. Process 20      (right subtree root)
 4. Process 15      (20's left)
 5. Process 7       (20's right)

Output: [3, 9, 20, 15, 7]
```

**Inorder #94 — process node BETWEEN left and right:**

```
Visit order:  9 → 3 → 15 → 20 → 7

 1. Go left to 9     → process 9   (no left child)
 2. Back to 3        → process 3
 3. Go left of 20    → process 15
 4. Back to 20       → process 20
 5. Go right of 20   → process 7

Output: [9, 3, 15, 20, 7]
```

**Side-by-side:**

| Step | Preorder (Root first) | Inorder (Root middle) |
|---|---|---|
| 1 | **3** | 9 |
| 2 | 9 | **3** |
| 3 | **20** | 15 |
| 4 | 15 | **20** |
| 5 | 7 | 7 |

Same five nodes. Different order. **The pattern is the order, not "DFS" generically.**

### 3. Recursive skeletons — only the print moves

```python
# PREORDER: process BEFORE children
def preorder(node):
    if not node: return
    record(node.val)          # ← step 1 at each frame
    preorder(node.left)
    preorder(node.right)

# INORDER: process BETWEEN children
def inorder(node):
    if not node: return
    inorder(node.left)
    record(node.val)          # ← step 2 at each frame
    inorder(node.right)
```

**null base case:** empty subtree contributes nothing to the list.

### 4. Why order matters (not just "visit all")

| Problem type | Typical order |
|---|---|
| "Return nodes in inorder" | Inorder — Left, Root, Right |
| "Copy tree structure" / serialize root-first | Preorder |
| "Delete tree" / compute bottom-up | Postorder (Day 10 preview) |
| BST sorted output | Inorder gives sorted sequence |

Wrong order = wrong list, even if you visit every node.

### 5. Pattern signals — Day 2 only

| When the problem says… | Think… |
|---|---|
| "inorder traversal" | Left → Root → Right |
| "preorder traversal" | Root → Left → Right |
| "return list of node values" | DFS + record at correct position |
| "binary tree" + visit sequence named | Match the name exactly |
| "recursive or iterative" | Stack simulates call order |
| "BST" + sorted order (preview) | Inorder |
| "root first" | Preorder |
| "process before/after children" | Pre vs post/in |

**Keywords:** `inorder` · `preorder` · `left-root-right` · `root-left-right` · `visit order`

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS for inorder/preorder | Wrong algorithm family — order names are DFS |
| Visit nodes in arbitrary DFS order | Output won't match spec |
| Store all paths | O(n²) — only need one value per node once |
| Confuse inorder with preorder | Same tree, different answer list |
| Skip iterative when asked | Stack mimics call stack — know both |

### 7. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Mixing preorder and inorder | Trace both on the **same** tree before coding |
| Forgetting null base case | Empty subtree adds nothing |
| Processing node after both children (inorder) | Inorder = **between** left and right |
| Stack push order wrong (iterative preorder) | Push right first so left pops first |
| Assuming any DFS order works | Read the problem's order name |

### 8. Bridge from Day 1

Day 1 taught **where information flows** (↑ depth, swap mutate). Day 2 teaches **when you touch each node** during a DFS descent:

- Max Depth: combine on the **return** (postorder-like timing)
- Inorder/Preorder: **record** at a fixed point in the frame

Both use `if not node: return` — but traversal records values; property problems combine returns.

### 9. Recognition drill — today's quests

**Quest 1 — Inorder #94:**
> *"Left, then record, then right. On our tree: [9, 3, 15, 20, 7]."*

**Quest 2 — Preorder #144:**
> *"Record first, then left, then right. On our tree: [3, 9, 20, 15, 7]."*

Say both sequences from memory before opening LeetCode.

---

*You know the two visit orders. Quest 1 records inorder. →*
