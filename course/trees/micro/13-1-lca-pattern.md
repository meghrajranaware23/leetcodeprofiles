<!-- hand-authored -->
# 📝 Lowest Common Ancestor

> **Day 13** · Lowest Common Ancestor · ★★★☆☆ · 15 XP · 15 min read

---

Days 11–12 mastered BST reads and writes. Today: **where do two paths diverge?** On a general tree, children **report** whether `p` or `q` lives below; the current node is the LCA when **both** sides report found. On a BST, ordering collapses this to a **range walk** — descend while both targets sit in the current node's interval.

> **Contrast (Day 12):** Yesterday = modify structure. Today = read-only **split detection** — no global, no path lists.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**LCA = first split point** — two implementations:

| Tree type | Mechanism | Return signal |
|---|---|---|
| Binary tree | Post-order bubble: child returns node if target found below | Non-null = "found in this subtree" |
| BST | Range walk while `p` and `q` straddle current val | Stop when they diverge left/right |

### 2. Simple explanation

**General binary tree:** Ask each subtree: *"Do you contain p or q?"* If **left says yes** AND **right says yes**, **I am the split** — I'm the LCA. If only one side says yes, bubble that answer up. If I **am** p or q, report myself immediately.

**BST shortcut:** If both targets are smaller → go left. Both larger → go right. Otherwise I'm between them (or one is me) → **stop here**.

### 3. Visual — Split-node: both sides return non-null

```
Tree:          3
              / \
             5   1
            / \
           6   2
              /
             7
              \
               4

Find LCA(5, 4):

Post-order returns bubble UP:

  dfs(6): null (neither target)
  dfs(2): null from left; dfs(4) returns 4 → right returns 4
  dfs(5): left=null, right=4 → return 5 (only one side — bubble 5)
  dfs(1): null
  dfs(3): left=5, right=null → return 5

Wait — trace p=5, q=4 carefully:

  At node 5: root==p → return 5 immediately (base case)
  Actually for LCA(5,4): p=5 is ancestor of q=4

  dfs(4): return 4 (node==q)
  dfs(2): l=null, r=4 → return 4
  dfs(5): hit p → return 5  (before checking children? order matters)

Standard algorithm:
  if root==p or root==q: return root
  l = dfs(left), r = dfs(right)
  if l and r: return root   ← SPLIT NODE
  return l or r

For LCA(5, 4):
  dfs(3): l=dfs(5) returns 5, r=dfs(1)=null → return 5 ✓

For LCA(5, 1) on extended tree — SPLIT at 3:

  dfs(5): returns 5
  dfs(1): returns 1
  dfs(3): l=5, r=1 → BOTH non-null → return 3 ✓  ← SPLIT NODE

  ┌────────────────────────────────────────────┐
  │  l && r  →  current node IS the LCA        │
  │  l || r  →  bubble the non-null side up    │
  │  root==p||q → return root (found anchor)   │
  └────────────────────────────────────────────┘
```

### 4. Visual — BST LCA: range walk

```
BST:        6
           / \
          2   8
         / \ / \
        0  4 7  9
          / \
         3   5

LCA(2, 8):
  [6]: 2<6 and 8>6 → straddle → return 6 ✓

LCA(2, 4):
  [6]: both left → go left
  [2]: 2==2 or 4>2 → straddle → return 2 ✓

LCA(3, 5):
  [6] → left  [2] → right  [4]: 3<4 and 5>4 → return 4 ✓

While both targets on same side → keep walking.
When they diverge (or one is current) → stop.
O(h) — no post-order needed.
```

### 5. The universal template

**Binary tree — split detection:**
```
function lca(node, p, q):
    if not node or node==p or node==q: return node
    l = lca(node.left, p, q)
    r = lca(node.right, p, q)
    if l and r: return node      // split!
    return l if l else r
```

**BST — range walk:**
```
function lca(node, p, q):
    while node:
        if p.val < node.val and q.val < node.val: node = node.left
        elif p.val > node.val and q.val > node.val: node = node.right
        else: return node
```

### 6. Why path-list approaches fail

| Brute force | Problem |
|---|---|
| Store root-to-p and root-to-q paths | O(h) space × two arrays + compare |
| Parent map + ascend from p | Two-pass; split detection is one-pass |
| Full tree search for both nodes first | Redundant — combine in one dfs |

**The insight:** LCA is the **deepest node where searches diverge**. Post-order naturally detects divergence via non-null returns from both children.

### 7. Day 13 vs Day 11–12

| | **BST search (Day 11)** | **LCA (Day 13)** |
|---|---|---|
| Targets | One value | Two nodes |
| Walk | Until match or null | Until straddle or split |
| General tree | Doesn't apply | Split detection required |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "lowest common ancestor" + binary tree | Split detection post-order |
| "LCA" + BST | Range walk — O(h), O(1) space |
| "both nodes exist in tree" | Return guarantees find |
| "parent pointers" (variants) | Different technique — not today's core |

**Keywords:** `l && r` · `split node` · `straddle` · `bubble up` · `return node if p or q`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Checking `p==q` specially | Algorithm still works — returns that node |
| Returning parent when only one child non-null | Bubble the non-null result — LCA may be deeper |
| Using BST walk on general tree | Ordering required for range walk |
| Confusing "first node where one target found" with LCA | Need **both** subtrees to report (or anchor hit) |
| Null check after p/q match | Return p/q node immediately — it's a valid answer upward |

### 10. Recognition drill

Read this problem aloud:

> *"Find the lowest common ancestor of two nodes in a binary tree."*

Before coding, say:

> *"Post-order: if I'm p or q, return me. If left and right both non-null, I'm the split — return me. Else return whichever side found something."*

---

*Split detection on general trees; range walk on BSTs. First quest: the binary tree LCA. →*
