<!-- hand-authored -->
# 📝 The Graph Mental Model

> **Day 1** · The Graph Mental Model · ★☆☆☆☆ · 10 XP · 10 min read

---

Your mission today: **learn how graphs are stored and counted** before you traverse them. Draw nodes and edges. Build an adjacency list. Track in-degree and out-degree. Then today's quests become bookkeeping — not guessing.

---

## Part 1 — Nodes, Edges, and Adjacency Lists

### 1. What is a graph?

A **graph** is nodes (vertices) connected by **edges**.

| Input shape | Nodes | Edges |
|---|---|---|
| `edges = [[0,1],[1,2]]` | Integers `0…n-1` | Pairs in the list |
| `trust = [[a,b],…]` | People `1…n` | Directed: `a` trusts `b` |
| Grid cell `(r,c)` | Each cell | 4-neighbors (Day 4) |

Every graph problem starts with: *What are my nodes? How do I reach neighbors?*

### 2. Build an adjacency list from an edge list

Most LeetCode graphs give **edges**, not ready-made neighbor lists. Convert once, then traverse.

```
edges = [[0,1],[0,3],[1,2],[3,4]]   (undirected)

adj[0] = [1, 3]
adj[1] = [0, 2]
adj[2] = [1]
adj[3] = [0, 4]
adj[4] = [3]
```

**Undirected:** for `[u,v]`, push `v` into `adj[u]` **and** `u` into `adj[v]`.

**Directed:** only push `v` into `adj[u]` (trust flows one way).

```python
adj = [[] for _ in range(n)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)   # omit second line if directed
```

Quest 2 (#1971) asks *"can I walk from source to destination?"* — once you have `adj`, any traversal (DFS, BFS, or Union-Find) can answer it. Day 1's job is **building the list**, not picking the algorithm yet.

### 3. In-degree and out-degree (directed graphs)

For **directed** edges `a → b`:

| Counter | Meaning | Updated by |
|---|---|---|
| **out-degree[a]** | Edges leaving `a` | Each trust `[a,b]` |
| **in-degree[b]** | Edges entering `b` | Same trust pair |

```
trust: 1→3, 2→3, 4→3   (everyone trusts person 3)

in[3] = 3, out[3] = 0
Everyone else: out ≥ 1, in = 0
```

Quest 1 (#997 Town Judge): the judge must be trusted by **all** others (`in = n-1`) and trust **nobody** (`out = 0`). No traversal needed — just two arrays.

### 4. Path existence — the question DFS answers

*"Is there a walk from `source` to `destination`?"*

On paper: start at `source`, mark visited, follow edges to neighbors, stop when you hit `destination` or exhaust the component.

```
Graph:  0 — 1 — 2
        |
        3

Path 0 → 2?  Yes: 0 → 1 → 2
Path 3 → 2?  No:  {3} is its own component
```

Quest 2 merges components with Union-Find (also valid). The mental model is the same: **nodes in the same connected group can reach each other.**

### 5. Visual — adjacency list + degrees on one example

```
Directed trust in a town of 4:
  1 → 4,  2 → 4,  3 → 4

adj[1]=[4]  adj[2]=[4]  adj[3]=[4]  adj[4]=[]
in:  [0,0,0,3]   out: [1,1,1,0]

Node 4: in=3 (= n-1), out=0  →  town judge ✓
```

### 6. Pattern signals — Day 1 only

| When the problem says… | Think… |
|---|---|
| `edges` / `n` nodes | Build `adj` list first |
| `trust` pairs | Directed; count `in[]` and `out[]` |
| "find the judge" / "everyone trusts X" | Degree scan, not BFS |
| "path exists" / "can reach" | Connected component from source |
| "undirected" graph | Add edge both ways in `adj` |

**Keywords:** `adjacency list` · `in-degree` · `out-degree` · `edge list` · `connected` · `reachable`

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Re-scan all edges per query | O(E) per check; adjacency list is O(degree) per step |
| Nested loops for "who trusts whom" | O(n²); degree arrays are O(E) |
| Traverse without building structure | Re-parsing edges every call |
| Ignore direction on trust edges | Judge logic breaks — trust is one-way |
| Skip drawing the graph | Wrong mental model for path vs component |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| 1-indexed nodes, 0-sized arrays | Size arrays `n+1` when nodes are `1…n` |
| Undirected edge added one way only | Push both `(u,v)` and `(v,u)` |
| Confuse in vs out on `[a,b]` | `a` trusts `b` → `out[a]++`, `in[b]++` |
| Build adjacency but never use it | Day 1 quests: degrees OR connectivity |
| Jump to BFS on Day 1 | Representation first; wavefront is Day 2 |

### 9. Bridge to Day 2

Day 1: **store** the graph (adjacency list, degree counts).  
Day 2: **explore** it with a queue — grid BFS on `(r,c)` and level timelines.

You already know *what* neighbors are. Tomorrow you learn *in what order* to visit them.

### 10. Recognition drill — today's quests

**Quest 1 — Town Judge #997:**
> *"Scan trust pairs. Judge = in-degree n−1 and out-degree 0."*

**Quest 2 — Path Exists #1971:**
> *"Build graph from edges. Are source and destination in the same component?"*

---

*You can draw and store a graph. Quest 1 counts degrees; Quest 2 checks connectivity. →*
