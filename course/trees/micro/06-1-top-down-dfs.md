<!-- hand-authored -->
# 📝 Top-Down DFS: Passing State Downward

> **Day 6** · Top-Down DFS · ★★★☆☆ · 10 XP · 15 min read

---

Days 1–5 asked *"What do my subtrees return?"* Today the question flips: **what state do I carry as I descend?**

Root-to-leaf problems don't know their prefix from below. You pass a **running total**, **remaining target**, or **path list** down each edge. Children inherit your budget; leaves report success; internal nodes merge with `||` or collect results. When you need to explore sibling branches, **backtrack**: push → recurse → pop.

> **Preview contrast (Day 7):** Today = *state travels down*. Tomorrow = *heights bubble up + global best*. Same tree, opposite data flow.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Top-down DFS** — pass parameters downward; decide at leaves or merge branch results on the way back.

- **Base case** — `null` → return sentinel (`false`, `0`, empty)
- **Leaf case** — check accumulated state against the goal
- **Internal node** — update state, recurse left/right, optionally undo (backtrack)
- **No subtree aggregation** — children don't return "the answer"; they explore with your state

### 2. Simple explanation

You're hiking a mountain trail (root to leaf). At each fork you write your **current altitude** on a sign and hand a copy to each path. At a dead end (leaf), you check if you hit the target elevation. You can't ask a valley below *"what was my starting point?"* — only the downward walk knows the prefix.

When collecting **all** valid paths, you share one path list: add the node, explore both children, then **remove** the node so the sibling branch starts clean.

### 3. Visual — running sum flows down

```
target = 22

              5   rem=22
             / \
        rem=17   rem=17
          4       8
         / \     / \
    rem=13 rem=9 ...
     11     2

Path 5→4→11→2:
  22 → 17 → 13 → 2
  Leaf 2: rem == 2?  YES ✓

State travels DOWN — never computed from child returns alone.
```

### 4. Visual — Path Sum II backtrack (push / recurse / pop)

```
Tree:        5
            / \
           4   8
          /   / \
         11  13  4
        /  \      \
       7    2      1

At node 5:  path = [5]
  → left to 4:  path = [5,4]
    → left to 11: path = [5,4,11]
      → leaf 7: sum=22? check...
      → right 2: path = [5,4,11,2] → MATCH → save copy
      ← POP → path = [5,4,11]
    ← POP → path = [5,4]
  → right to 8: path = [5,8]  (4 is gone — sibling branch clean)
    ...

BACKTRACK CYCLE at each node:
  push(node.val)
  dfs(left); dfs(right)
  pop()                    ← undo before sibling explores
```

### 5. The universal template

```
function dfs(node, state, ...shared):
    if node is null: return

    update state with node.val          // rem -= val, path.push, cur*10+val
    if leaf:
        check / record result
    else:
        dfs(node.left,  state, ...)
        dfs(node.right, state, ...)

    undo state if backtracking          // path.pop()
```

Two flavors today:

| Flavor | State carried | Undo? | Example |
|---|---|---|---|
| **Remainder / accumulation** | Running number down | No | Sum Root to Leaf Numbers |
| **Backtracking collection** | Path list + remainder | Yes — pop after children | Path Sum II |

### 6. Why top-down beats bottom-up here

| Bottom-up attempt | Problem |
|---|---|
| `return leftSum + rightSum` for path existence | Counts partial paths through internal nodes |
| Ask children "any path summing to target?" without prefix | Subtree doesn't know root-to-here values |
| Global path array without pop | Sibling branches inherit wrong prefix |
| BFS for root-to-leaf collection | Works but loses natural DFS backtrack template |

For **root-to-leaf**, the question is *"Can I finish the budget from here?"* — not *"What do my subtrees aggregate?"*

### 7. Day 6 vs Day 7 — the contrast

| | **Day 6 — Top-Down** | **Day 7 — Bottom-Up** |
|---|---|---|
| Data flow | Parameters **down** the tree | Returns **up** from leaves |
| Who knows the prefix? | Current frame + ancestors | Nobody — path may bend at any node |
| Typical question | "Root-to-leaf path equals X?" | "Longest path / max sum anywhere?" |
| Combine | `\|\|` or collect at leaf | `max(left, right)` + **global update** |
| Backtrack? | Often yes (path list) | No — heights are returned, not shared |

If you catch yourself writing `1 + max(left, right)` on a root-to-leaf problem, stop — that's Day 7.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "root-to-leaf path" | Top-down state; leaf-only check |
| "all paths" / "return list of paths" | Top-down + **backtrack** (push/pop) |
| "sum along path from root" | Running total downward |
| "digits form a number" | `cur = cur * 10 + val` top-down |
| "has / exists a path" | `left \|\| right` with remainder |
| "diameter" / "max path anywhere" | **Not today** — Day 7 bottom-up |

**Keywords:** `remaining` · `path.push` · `path.pop` · `leaf` · `root-to-leaf` · `backtrack`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Checking target at internal nodes | Leaf-only success for exact path sum |
| Forgetting `path.pop()` after recursion | Sibling inherits wrong prefix |
| Using `path` reference without copy on save | `res.append(path[:])` in Python |
| Bottom-up subtree sum for root-to-leaf | Pass remainder **down**, not up |
| `&&` instead of `\|\|` for existence | One good path is enough |

### 10. Recognition drill

Read this problem aloud:

> *"Find all root-to-leaf paths where node values sum to target."*

Before coding, say:

> *"Top-down remainder + backtrack. push val, rem -= val, at leaf if rem==0 save path[:], recurse both, pop. Not Day 7 — no height returns."*

---

*State flows down the tree. First quest: collect every winning path. →*
