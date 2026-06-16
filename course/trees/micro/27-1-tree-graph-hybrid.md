<!-- hand-authored -->
# 📝 Tree + Graph Hybrid Patterns

> **Day 27** · Tree + Graph Hybrid · ★★★★★ · 20 XP · 15 min read

---

Binary trees have **one parent** — but many problems need to go **upward** (infection spread from internal node, nodes at distance k from target). Solution: **temporarily treat the tree as an undirected graph** via parent map or adjacency list, then run BFS. For path directions between two nodes, combine **Day 13 LCA thinking** with **root-to-node path strings** (U/L/R).

> **Contrast (Day 13 / C-Rank Distance K):** LCA = split detection. Today = **parent-map multi-source BFS** + **LCA via path prefix + U/L/R construction**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Tree-graph hybrid — two techniques:**

| Technique | When | Steps |
|---|---|---|
| Parent-map BFS | Spread / distance from non-root start | Build undirected graph → BFS from source |
| LCA + path strings | Directions from node A to node B | DFS paths with L/R → strip common prefix → U + suffix |

### 2. Simple explanation

**Why parent map:** Tree edges only go parent→child. To BFS from an internal node "in all directions," add **parent as neighbor**. One DFS from root fills `parent[node]` or builds `graph[u].push_back(v)` both ways. Then standard level-order BFS counts minutes / collects distance-k nodes.

**LCA + path strings:** Find path from root to `start` as string of `L`/`R` moves. Same for `dest`. Common prefix = path through **LCA**. Drop prefix from both: go **up** from start (`U` × remaining start length) then follow **dest suffix** (`L`/`R`). No explicit LCA node needed — prefix match finds the split.

Bridges: [Day 13 LCA](13-1-lca-pattern.md), [C-Rank Distance K #863](c-test-2-distance-k.md).

### 3. Visual — Parent-map multi-source BFS (infection)

```
Tree:     1
         / \
        2   3
           / \
          4   5

Infection starts at node 4.

Build undirected adjacency:
  1: [2,3]
  2: [1]
  3: [1,4,5]
  4: [3]
  5: [3]

BFS from 4:
  minute 0: {4}
  minute 1: {3}
  minute 2: {1,5}
  minute 3: {2}

Answer: 3 minutes to infect all

  ┌──────────────────────────────────────────────────┐
  │  buildGraph(node, par): add bidirectional edges  │
  │  BFS from start with visited set                 │
  │  count levels until queue empty                  │
  └──────────────────────────────────────────────────┘
```

### 4. Visual — LCA + path string U/L/R

```
Tree:     7
         / \
        2   5
       / \   \
      1   4   6

start=2, dest=5

Path root→2: "L"     (7→2 left)
Path root→5: "R"     (7→5 right)
Common prefix length 0 → LCA is 7

Answer: go up from 2 to 7 → "U"
        then 7→5 right → "R"
        = "UR"

start=1, dest=4:
  root→1: "LL"
  root→4: "LR"
  common prefix "L" → LCA is 2

  start remainder: "L" → "U"
  dest remainder: "R" → "R"
  = "UR"
```

### 5. The universal template

**Parent-map BFS:**
```
buildGraph(node, par):
    if not node: return
    if par valid: add edge node↔par
    buildGraph(node.left, node)
    buildGraph(node.right, node)

BFS from start:
    queue = [start], visited = {start}, time = -1
    while queue:
        time++
        for each level: expand to unvisited neighbors in graph
    return time
```

**LCA + path construction:**
```
find(node, target, path):  // append L/R, backtrack
    if not node: return false
    if node.val == target: return true
    path += 'L'; if find(left): return true; path.pop()
    path += 'R'; if find(right): return true; path.pop()
    return false

sp = path to start, dp = path to dest
i = common prefix length
return 'U' * (len(sp)-i) + dp[i:]
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS from root only downward | Can't reach parent of start |
| Find LCA node then three paths | Heavier than prefix strip on two strings |
| DFS infection without visited | Infinite loops when going up |
| Store full tree as explicit graph first without need | Parent DFS during build is O(n) once |

**The insight:** One O(n) preprocessing (parent map) unlocks **graph algorithms on trees**. Path strings encode LCA implicitly via longest common prefix.

### 7. Day 27 vs Day 13 vs C-Rank

| | **Day 13 LCA** | **C-Rank #863** | **Day 27** |
|---|---|---|---|
| Goal | Find split node | Nodes at distance k | Minutes to infect all / path directions |
| Upward movement | Implicit in post-order | Parent map BFS | Same parent map |
| Output | LCA node | Value list | Time count / U/L/R string |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "infection" / "spread to adjacent" | Undirected BFS from start |
| "minutes" / "time" until all visited | Level-order BFS count |
| "distance from target node" (not root) | Parent map — C-Rank #863 |
| "directions from node A to B" | Two path strings + U/L/R |
| "step-by-step" L/R/U | Path prefix + ups then suffix |

**Keywords:** `parent map` · `bidirectional edge` · `visited set` · `common prefix` · `'U' * n`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BFS without visited on tree-as-graph | Parent↔child ping-pong infinite loop |
| Forgetting to count initial minute=-1 or 0 | Match problem: infect start at time 0 |
| Path string: not backtracking on failed DFS | pop after recursive fail |
| Using LCA explicit then three walks | Prefix strip is simpler |
| Directed edges only in graph build | Add both u→v and v→u |

### 10. Recognition drill

Read this problem aloud:

> *"Amount of time for infection to spread from node X to entire tree."*

Before coding, say:

> *"Build undirected adjacency from tree. BFS from X level by level. Return level count - 1 or last level index per problem convention."*

---

*Trees become graphs when you need to go up. First quest: infection time. →*
