<!-- hand-authored -->
# 📝 State-Space BFS

> **Day 10** · State-Space BFS · ★★★☆☆ · 10 XP · 15 min read

---

This is **not** Day 2 grid BFS. There is no `(r, c)` matrix to draw — the graph is **abstract**. Each **node** is a full **configuration**: a lock string `"0000"`, a gene `"AACCGGTT"`. Each **edge** is one legal move (turn one wheel, mutate one letter). The queue holds **`(state, steps)`** — the state *is* the node identity.

> **Critical distinction:** Day 2/4/8 = cells on a grid. Day 10 = **states as nodes** + **dead-end set** + BFS for minimum moves between configurations.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**State-space BFS** — treat each configuration as a graph node; generate neighbors by applying moves; BFS for shortest transformation count.

- **Node** — tuple/string representing full state: `"0129"`, `(lock_string,)`
- **Edge** — one move: rotate wheel `i` by ±1, change position `j` to each of 4 letters
- **Queue entry** — `(state, steps)` — **steps live with the state**, like Day 8's `(r,c,steps)` but state is not coordinates
- **Visited / dead** — `set` of forbidden or already-seen states — **dead-end set** prunes permanently blocked configs
- **Goal** — `state == target` → return `steps`

### 2. Simple explanation

Forget the grid. You're playing a puzzle where the entire board position is one sentence of digits. From `"0000"` you can reach `"1000"`, `"0100"`, … by one twist. Some sentences are banned (deadends). You're asking: *fewest twists from start sentence to target sentence?* That's BFS on an invisible graph whose nodes are sentences — not cells.

### 3. Visual — lock states as nodes (NOT a grid)

```
4 wheels, 0-9 each → 10⁴ possible lock strings = nodes

        "0000"  (steps=0, START)
       /  |  \
 "1000" "0100" ... "0009"   (steps=1)
    |       |
  ...     "0101"            (steps=2)
              \
            "0201" → ... → "8888" (TARGET)

Edges: from each state, 4 wheels × 2 directions = up to 8 neighbors
Dead-end set: {"8887","8889",...} → never enqueue these
Visited set: don't revisit same string
```

**There is no 2D picture.** Draw a **state transition** diagram for 2 wheels only if you need intuition — then scale mentally to 4.

### 4. Visual — `(state, steps)` in the queue

```
queue = [("0000", 0)]
visited = {"0000"}
dead = {"0001", ...}  // forbidden

dequeue ("0000", 0):
  generate "1000", "0100", "0010", "0001" (±1 each wheel)
  for each nxt:
    if nxt in dead: skip
    if nxt in visited: skip
    if nxt == target: return steps+1
    visited.add(nxt)
    enqueue (nxt, steps+1)

First time target dequeued → minimum twists ✓
```

Same skeleton as Day 8 — but **state** replaces **(r,c)**.

### 5. The universal template

```
function stateSpaceBFS(start, target, deadends):
    if start in deadends: return -1
    queue = [(start, 0)]
    visited = {start}

    while queue not empty:
        (state, steps) = queue.dequeue()
        if state == target:
            return steps
        for each neighbor_state in generate_moves(state):
            if neighbor in deadends: continue
            if neighbor in visited: continue
            visited.add(neighbor)
            queue.enqueue((neighbor, steps + 1))

    return -1   // unreachable
```

**Gene mutation variant:** neighbors = change each of 8 positions to A/C/G/T; only enqueue if new gene in `bank` set (bank shrinks as visited).

### 6. Why grid BFS or DFS fails

| Treat as grid `(r,c)` | Problem |
|---|---|
| Lock digits aren't coordinates | No 2D adjacency — state is 4-char string |
| Day 2 flood fill | Wrong mental model entirely |

| DFS to target | Problem |
|---|---|
| First path not shortest | Need BFS layers on state graph |

| BFS without dead-end set | Problem |
|---|---|
| Revisit forbidden or explode search | Deadends are **permanent walls** |

| Build explicit 10⁴ adjacency list upfront | Problem |
|---|---|
| Generate neighbors **on the fly** | O(1) per move generation suffices |

### 7. Day 2 grid vs Day 10 state-space

| | **Day 2/8 — Grid BFS** | **Day 10 — State-Space BFS** |
|---|---|---|
| Node | Cell `(r, c)` | String / configuration |
| Neighbors | 4 or 8 grid dirs | Puzzle moves (twist, mutate) |
| Visited | `grid[r][c]=1` or dist matrix | `set` of seen **strings** |
| Blocked | Wall cell `1` | **Dead-end set** |
| Queue | `(r,c)` or `(r,c,steps)` | **`(state, steps)`** |
| Visual | Draw matrix | Draw **state transitions** |

If you catch yourself writing `dirs = {{1,0},...}` on Open the Lock, stop — that's the wrong graph.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum turns" / "minimum mutations" | State-space BFS |
| "deadends" / "bank of valid genes" | Forbidden or allowed set |
| "combination lock" / "gene string" | State = full string |
| "shortest transformation sequence" | BFS on implicit graph |
| "grid" / "matrix" / "island" | **Not Day 10** — earlier ranks |

**Keywords:** `(state, steps)` · `deadends` · `visited set of strings` · `generate neighbors` · `abstract node`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Modeling lock as 4 separate grid rows | One string node = one state |
| Forgetting start in deadends check | Return -1 immediately |
| DFS instead of BFS | Minimum moves = BFS |
| Not storing steps with state | Use tuple or level BFS |
| Re-enqueue without visited | String set at enqueue time |

### 10. Recognition drill

Read this problem aloud:

> *"Open a 4-wheel lock from '0000' to target with banned combinations — minimum turns?"*

Before coding, say:

> *"State-space BFS: node = 4-char string, queue (state, steps), dead-end set, generate 8 neighbors per state. NOT grid BFS — NOT Day 2 visual."*

---

*Configurations are nodes. First quest: twist the lock in fewest moves. →*
