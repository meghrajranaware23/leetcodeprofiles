<!-- hand-authored -->
# 📝 Tree Distance and Diameter

> **Day 25** · Tree Distance · ★★★★★ · 20 XP · 15 min read

---

Day 7 computed **diameter** on binary trees — return height, global `leftH + rightH`. Today distances involve **every node as root** (re-rooting) and **N-ary trees with state** (adjacent chars must differ). Both use **two-pass tree DP**: gather subtree info down-up, then redistribute answers across the tree.

> **Contrast (Day 7):** Yesterday = one global path metric on a binary tree. Today = **all-node answers via reroot formula** + **N-ary top-two branches with letter filter**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Tree distance — two advanced families:**

| Family | Pass 1 (root fixed) | Pass 2 (reroot) |
|---|---|---|
| Sum of distances (#834) | `cnt[u]` = subtree size; `ans[0]` = sum from root | `ans[v] = ans[u] - cnt[v] + (n - cnt[v])` |
| N-ary longest path (#2246) | DFS returns best **downward** chain; global `top1+top2+1` | Filter child chains where `s[child] != s[node]` |

### 2. Simple explanation

**Re-rooting intuition:** Suppose you know the total distance sum from node 0 to all others (`ans[0]`). When you move the "root" across edge `0—v`:
- Nodes in `v`'s subtree (count `cnt[v]`) are **closer by 1** → subtract `cnt[v]` from the sum
- All other nodes (`n - cnt[v]`) are **farther by 1** → add `n - cnt[v]`

That's the entire Pass 2 formula. Pass 1 just computes `cnt` and `ans[0]` with a standard subtree DFS on the adjacency list.

**N-ary diameter with letter state:** Same Day 7 "top two branches" idea, but:
- Tree is given as **parent array** (build children adjacency)
- Only count a child chain if `s[child] != s[parent]` — same letter breaks the path
- Global best = `1 + top1 + top2` among valid child chains at each node

### 3. Visual — Re-rooting Pass 1: sizes and root sum

```
Tree (n=6):  0 — 1 — 2
                 |
                 3
             4 — 5

Edges: (0,1)(1,2)(1,3)(3,4)(3,5)

Pass 1 dfs1(0):
  dfs1(2): cnt[2]=1, ans[2]=0
  dfs1(3): cnt[3]=3 (nodes 3,4,5), ans[3]= (0+1)+(0+1)=2
  dfs1(1): cnt[1]=5, ans[1]= ans[2]+cnt[2] + ans[3]+cnt[3]
                        = 0+1 + 2+3 = 6
  dfs1(0): cnt[0]=6, ans[0]= ans[1]+cnt[1] = 6+5 = 11

Interpretation: sum of distances from node 0 to all others = 11

  ┌────────────────────────────────────────────────────┐
  │  Pass 1: post-order on tree as undirected graph    │
  │  cnt[u] += cnt[child]                              │
  │  ans[u] += ans[child] + cnt[child]                 │
  │  (each node in child subtree is +1 edge farther)   │
  └────────────────────────────────────────────────────┘
```

### 4. Visual — Re-rooting Pass 2: reroot formula

```
Same tree, ans[0] = 11 known.

Reroot 0 → 1:
  ans[1] = ans[0] - cnt[1] + (n - cnt[1])
         = 11 - 5 + (6 - 5) = 11 - 5 + 1 = 7 ✓

Reroot 1 → 3:
  ans[3] = ans[1] - cnt[3] + (n - cnt[3])
         = 7 - 3 + (6 - 3) = 7 - 3 + 3 = 7

Reroot 3 → 4:
  ans[4] = ans[3] - cnt[4] + (n - cnt[4])
         = 7 - 1 + (6 - 1) = 12

Pass 2 dfs2(parent): for each child v:
  ans[v] = ans[parent] - cnt[v] + (n - cnt[v])
  dfs2(v)

Total O(n) for both passes — no BFS-from-each-node O(n²).
```

### 5. Visual — N-ary diameter with letter state

```
parent = [-1,0,0,0], s = "abac"
Tree:     0(a)
         /|\
        1 2 3
      (b)(a)(c)

At node 0: children 1,2,3
  child 1 (b): dfs returns chain len 1 (valid, b≠a)
  child 2 (a): s[2]==s[0] → skip (len treated as 0)
  child 3 (c): dfs returns chain len 1 (valid, c≠a)
  top1=1, top2=1 → global = 1+1+1 = 3 (path 1–0–3)

At node 2 (a): leaf with letter a — returns 1 to parent
  But parent 0 skips it due to letter match

  ┌────────────────────────────────────────────────────┐
  │  if s[child] == s[node]: ignore child's length     │
  │  else: update top1, top2 like Day 7 diameter       │
  │  ans = max(ans, top1 + top2 + 1)                   │
  │  return top1 + 1  (best single downward chain)     │
  └────────────────────────────────────────────────────┘
```

### 6. The universal template

**Re-rooting (undirected tree as adjacency list):**
```
build graph from edges

Pass 1 — dfs1(u, par):
    for v in graph[u], v != par:
        dfs1(v, u)
        cnt[u] += cnt[v]
        ans[u] += ans[v] + cnt[v]

Pass 2 — dfs2(u, par):
    for v in graph[u], v != par:
        ans[v] = ans[u] - cnt[v] + (n - cnt[v])
        dfs2(v, u)
```

**N-ary longest path with letter filter:**
```
build children from parent array

dfs(node):
    top1 = top2 = 0
    for child in children[node]:
        len = dfs(child)
        if s[child] == s[node]: continue
        update top1, top2 with len
    ans = max(ans, top1 + top2 + 1)
    return top1 + 1
```

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS from every node for distance sum | O(n²) — reroot is O(n) |
| All-pairs shortest path (Floyd) | O(n³) on tree — overkill |
| N-ary: check every path explicitly | O(n²) paths |
| Re-root: recompute BFS for each root | Pass 2 formula avoids repeat |

**The insight:** Tree edges form a **parent-child relationship** once rooted. Subtree counts make rerooting a local +/− adjustment. N-ary diameter reuses Day 7 top-two tracking with a filter predicate.

### 8. Day 25 vs Day 7

| | **Day 7** | **Day 25** |
|---|---|---|
| Tree shape | Binary | General / N-ary |
| Output | One global diameter | Array per node OR filtered longest path |
| Technique | Height return + global | Reroot formula OR top-two + letter state |
| Graph view | Implicit in recursion | Explicit adjacency list |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "sum of distances from each node" | Re-root Pass 1 sizes + Pass 2 formula |
| "reroot" / "change root" | ans[child] from ans[parent] |
| "parent array" + tree | Build children adjacency |
| "longest path" + constraint on edges | Top-two DFS with filter |
| "different adjacent characters" | Skip child if same letter |

**Keywords:** `cnt[v]` · `ans[v] = ans[u] - cnt[v] + (n-cnt[v])` · `top1 top2` · `s[child]!=s[node]`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Pass 2 before Pass 1 | Need `cnt` and `ans[root]` first |
| Wrong reroot sign | Subtract subtree count, add complement |
| N-ary: using left/right | Build `children[i]` from parent array |
| Counting same-letter child in top-two | Must `continue` when letters match |
| Treating undirected edge as directed only | Build bidirectional graph for reroot |

### 11. Recognition drill

Read this problem aloud:

> *"Return sum of distances from every node to all other nodes in a tree."*

Before coding, say:

> *"Pass 1: cnt and ans from node 0. Pass 2: ans[v] = ans[u] - cnt[v] + (n - cnt[v]). O(n) two DFS."*

---

*Reroot with subtree counts; N-ary diameter with letter filter. First quest: sum of distances. →*
