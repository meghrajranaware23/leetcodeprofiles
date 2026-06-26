<!-- hand-authored -->
# 📝 Recursion vs Iteration Trade-offs

> **Day 10** · Recursion vs Iteration · 10 XP · 15 min read

---

Ten days of recursive DFS — today you **simulate the call stack** explicitly. Same visit orders, same tree rewrites; different control structure. Knowing both lets you pick the tool and survive interviews that ban recursion.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Iterative DFS with stack** — the stack replaces the call frame. Push nodes, pop when ready to process, track a `last visited` pointer for postorder.

- **Preorder iterative** — push right then left (pop = left first)
- **Postorder iterative** — go left until stuck; if right unvisited, pivot right; else process node
- **In-place rewire** — reverse postorder (right → left → node) builds right-tail linked list

### 2. Simple explanation

Recursion = OS-managed stack of "where I was." Iteration = **you** manage that stack. Postorder is tricky because you must not print a node until both children are done — the `last` pointer remembers which subtree you just finished.

Flatten tree? Process **right subtree first**, then left, then attach current node to the growing right tail — that's reverse postorder with pointer rewiring.

### 3. Visual — Iterative postorder stack trace

```
Tree:     1
         / \
        2   3
       /
      4

Target postorder: [4, 2, 3, 1]

Stack evolution (cur, stack, last):

cur=1: push 1, go left
cur=2: push 2, go left
cur=4: push 4, go left
cur=null: peek 4 — no right / right done → POP 4, last=4, res=[4]
cur=null: peek 2 — right? no → POP 2, last=2, res=[4,2]
cur=null: peek 1 — right=3 ≠ last → cur=3
cur=3: push 3, go left
cur=null: peek 3 → POP 3, last=3, res=[4,2,3]
cur=null: peek 1 → POP 1, res=[4,2,3,1] ✓

Rule at peek:
  if node.right exists AND last ≠ node.right → cur = node.right
  else → process node, last = node, pop
```

### 4. Visual — Flatten: right-tail rewire (reverse postorder)

```
Before:      1                After (right-skewed list):
            / \                    1
           2   5                   \
              / \                    2
             3   4                    \
                                    3
                                     \
                                      4
                                       \
                                        5

Reverse postorder visit: 5 → 4 → 3 → 2 → 1

At each node (after children processed):
  node.right = prev    ← old tail becomes my right child
  node.left  = null
  prev = node          ← I am the new tail

Walk:
  dfs(5): prev=null → 5.right=null, prev=5
  dfs(4): 4.right=5, prev=4
  dfs(3): 3.right=4, prev=3
  dfs(2): 2.right=3, prev=2
  dfs(1): 1.right=2, prev=1  ✓
```

### 5. Recursion vs iteration — trade-offs

| | **Recursion** | **Iteration (stack)** |
|---|---|---|
| Code length | Shorter, mirrors definition | Longer, explicit state |
| Stack limit | O(h) call frames — deep trees risk overflow | Same O(h) — you control the stack |
| Postorder | Trivial: `left; right; node` | Needs `last` pointer logic |
| Interview | Default choice | Required when recursion banned |
| Flatten / Morris | Recursive reverse postorder is clean | Stack or O(1) Morris (later ranks) |

**When to prefer iterative:** explicit stack control, very deep trees, or problem asks "without recursion."

**When to prefer recursive:** clarity, bottom-up returns, construction — recursion matches the definition.

### 6. The universal templates

**Iterative postorder:**
```
while cur or stack not empty:
    if cur: push cur; cur = cur.left
    else:
        node = stack.top()
        if node.right and last ≠ node.right: cur = node.right
        else: output node; last = node; pop
```

**Flatten (recursive reverse postorder — also valid iteratively):**
```
prev = null
dfs(node):
    if null: return
    dfs(node.right)
    dfs(node.left)
    node.right = prev; node.left = null; prev = node
```

### 7. Why naive iteration fails

| Naive approach | Problem |
|---|---|
| Pop and immediately output (preorder stack) | Wrong order for postorder |
| Two-stack reverse preorder trick | Works for postorder output but not in-place rewire |
| BFS for postorder | Wrong traversal family |
| Flatten with preorder | Loses left-subtree nodes — need reverse postorder |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "postorder" + "iterative" | Stack + last visited |
| "without recursion" | Explicit stack simulation |
| "flatten to linked list" | Reverse postorder rewire |
| "follow right pointers only" | Postorder / reverse-postorder property |
| "morris traversal" | O(1) space — later rank (not today) |

**Keywords:** `stack` · `last visited` · `cur.left` · `prev` · `node.right = prev`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Output on pop (preorder behavior) | Postorder: peek, check right, defer pop |
| Forgetting `last ≠ node.right` | Re-process right subtree before parent |
| Flatten: process left before right | Reverse postorder: **right first** |
| Flatten: lose `prev` between calls | Class field or nonlocal `prev` |
| Stack overflow fear → BFS everywhere | Iterative DFS stack same depth as recursion |

### 10. Recognition drill

Read this problem aloud:

> *"Return the postorder traversal of a binary tree iteratively."*

Before coding, say:

> *"Stack + cur pointer. Drill left pushing. At peek: if right unvisited go right; else output and pop. Track last to avoid reprocessing."*

---

*The call stack, made explicit. First quest: iterative postorder. →*
