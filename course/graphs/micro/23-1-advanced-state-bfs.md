<!-- hand-authored -->
# 📝 Complex State-Space BFS

> **Day 23** · Advanced State BFS · 20 XP · 15 min read

---

Day 10 taught **abstract state BFS**: `(state, steps)` on string configurations with dead-end sets. Day 23 scales that idea to **three implicit-graph families** you'll see in today's quests — each with a different way to generate neighbors, but the same BFS skeleton.

> **Bridge to Day 10:** Same queue shape `(node, steps)`, same "first visit = shortest" rule. **Different neighbor generators** — not lock wheels, not gene banks. Today: **word mutations**, **board squares**, and **position + constraint** states.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Complex state-space BFS** — the graph is often **never built explicitly**. You discover edges on the fly:

| Variant | Node | Edge (one step) | Visited |
|---|---|---|---|
| **Word ladder** | Dictionary word | Change one letter → valid word | `set` / shrink dict |
| **Snakes & ladders** | Board square 1..n² | Roll 1–6, apply snake/ladder | `dist[]` array |
| **Position + flag** (Day 27 preview) | `(pos, justMovedBack)` | +a forward, −b backward (once) | 2D dist or tuple set |

All three: **unweighted** → BFS, not Dijkstra.

### 2. Simple explanation

**Word ladder:** Words are nodes. Two words share an edge if they differ by exactly one letter. You don't pre-build the graph — from `"hit"`, try all 26 letters at each position; keep hits in the dictionary.

**Snakes & ladders:** Square numbers are nodes. From square `s`, edges go to `s+1..s+6` (capped at n²), then teleport if a snake/ladder sits on that cell. One BFS from square 1.

**Day 10 vs Day 23:** Day 10 = fixed move rules on a **configuration string** (twist wheel `i`). Day 23 = **domain-specific** neighbor rules (dictionary, dice, forbidden coordinate).

### 3. Visual — word ladder (implicit graph)

```
wordList = {hot, dot, dog, lot, log, cog}
begin=hit  end=cog

        hit
       / | \
     hot dot lot     (one letter changed, in dict)
      |    |    |
     ...  dog  log
           \  /
            cog  ← target

BFS layers:
  (hit, 1) → (hot,2), (dot,2), (lot,2) → ... → (cog, 5)

No adjacency list — generate neighbors per dequeue.
```

### 4. Visual — snakes & ladders (board as graph)

```
Squares 1..36, roll d ∈ {1..6}:

From square 6, d=4 → land on 10
  if board[10] has ladder to 25 → next state = 25
  else next state = 10

queue = [1], dist[1] = 0
while queue:
  s = pop
  for d in 1..6:
    ns = min(s+d, n*n)
    apply snake/ladder at ns
    if dist[ns] == -1: dist[ns] = dist[s]+1; push ns
```

**Not** Day 4 grid BFS — nodes are **square indices**, not `(r,c)` unless you map via zigzag label.

### 5. The universal template

```
function implicitBFS(start, isGoal, generateNeighbors):
    queue = [(start, 0)]
    visited = {start}   // or dist[start] = 0

    while queue not empty:
        (state, steps) = queue.dequeue()
        if isGoal(state): return steps + 1  // or steps, per problem

        for next in generateNeighbors(state):
            if next not in visited:
                visited.add(next)
                queue.enqueue((next, steps + 1))

    return -1 / 0   // unreachable
```

**Word ladder:** `generateNeighbors` = mutate each char; check dict.  
**Snakes & ladders:** `generateNeighbors` = six dice outcomes + teleport.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| **Pre-build full word adjacency list** | O(n² · L) pairs — generate on the fly is O(26·L) per word |
| **DFS for minimum transformations** | First path ≠ shortest |
| **BFS on board without dist[]** | Revisit squares via snakes — infinite loop |
| **Model word ladder as grid** | Letters aren't coordinates |
| **Copy Day 10 lock template blindly** | Neighbor function differs per problem |

### 7. Day 10 vs Day 23

| | **Day 10 — Lock / Gene** | **Day 23 — Today's quests** |
|---|---|---|
| State | Fixed-format string | Word, square index, (pos, flag) |
| Neighbors | Twist wheel / mutate gene | Dict check, dice roll, ±jump |
| Blocked | `deadends` / `bank` | Missing from dict, forbidden square |
| Build graph? | Never — generate moves | Never — generate moves |

Same **BFS discipline**; different **domain encoding**.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "shortest transformation sequence" + word list | Word-ladder implicit BFS |
| "minimum moves" on board + dice/snakes | Square-index BFS |
| "beginWord / endWord" not in grid | Implicit graph, not matrix |
| "minimum jumps" + forbidden position | State = `(pos, constraint)` — Day 27 |
| "combination lock" / "deadends" | **Day 10** — not today's quest prose |

**Keywords:** `implicit graph` · `generate neighbors` · `(state, steps)` · `dict.erase on visit` · `dist[square]`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| End word not in wordList | Return 0 immediately |
| Forget to remove word on enqueue | `dict.erase` / `set.remove` prevents re-queue |
| Wrong zigzag square → (r,c) mapping | Test label function on small board |
| Count beginWord as length 0 vs 1 | LC #127 expects sequence **length** including start |
| Use grid dirs on word problem | One-letter mutation, not 4-directional |

### 10. Recognition drill

Read this problem aloud:

> *"Transform beginWord to endWord changing one letter at a time; each intermediate must be in wordList."*

Before coding, say:

> *"Implicit word graph — BFS (word, steps), generate 26·L neighbors, erase from dict when visited. NOT Day 10 lock. NOT grid BFS."*

---

*Three implicit graphs, one BFS skeleton. First quest: word ladder. →*
