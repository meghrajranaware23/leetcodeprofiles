<!-- hand-authored -->
# 📝 Pattern Decision Making

> **Day 27** · Multi-Pattern Synthesis · 20 XP · 15 min read

---

Day 27 is **pattern triage** — read the problem, pick the right graph tool in 30 seconds, then execute. No new algorithm; synthesis of A-Rank techniques with a preview of **S-Rank Day 30** decision flow.

Today's quests:
1. **BFS with forbidden positions** — state includes `(position, justMovedBackward)` to enforce "no two consecutive backward jumps."
2. **Adjacency intersection rank** — not traversal; **degree sum minus shared edge** for city pairs.

> **S30 preview:** Hard problems often ask *"Is this BFS on expanded state, weighted shortest path, or static graph property?"* Day 27 trains that fork before the final ascension.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Pattern decision checklist:**

| Signal | Tool |
|---|---|
| Min jumps/moves + **forbidden** cell + move rules | BFS on **expanded state** |
| "Cannot do X twice in a row" | Add flag bit to state tuple |
| "Maximum rank / count pairs" with degree definition | **Static** — O(n²) over pairs, no BFS |
| Weighted shortest + count ways | Day 25 Dijkstra + ways |
| Implicit word/board graph | Day 23 BFS |

### 2. Simple explanation

**Minimum jumps home (#1654):** You stand on a number line at `0`, want `x`. Each step: jump `+a` forward, or jump `-b` backward — but **not two backward jumps in a row**. Forbidden coordinate is never allowed. State is not just position — it's `(pos, backFlag)` where `backFlag=1` means last move was backward (so next cannot be backward). BFS on ~12000 states.

**Maximal network rank (#1615):** Rank of cities `(i,j)` = `deg[i]+deg[j]` minus 1 if direct road exists (double-counted). Answer = max over all pairs. Build `deg[]` and edge lookup; O(n²) scan. **No BFS** — pure graph metric.

### 3. Visual — BFS forbidden state expansion

```
position line: ... 0 ... forbidden ... x

State = (pos, back):
  from (0,0): forward +a → (a,0)
             backward -b → ( -b,1 )  only if back==0

Forbidden cell: never enqueue
Bound pos to [0, 6000] (problem guarantees x ≤ 6000)

queue (0,0) dist=0
goal: pos == x → return dist
```

Two consecutive backs blocked by requiring `back==0` before backward move.

### 4. Visual — network rank (static)

```
deg[0]=2, deg[1]=3, edge(0,1)? yes

rank(0,1) = 2 + 3 - 1 = 4   (road counted in both degrees)

No traversal — enumerate pairs (i,j), i<j
```

### 5. S30 pattern-decision preview

Before coding any hard graph problem, ask:

```
1. Nodes = ?  (cells, words, numbers, tuples?)
2. Edges = ?  (implicit or explicit?)
3. Weighted?  → Dijkstra / Floyd
4. State constraint?  → expand state (Day 10/23/27)
5. Static query on graph?  → build + formula (Day 27 rank)
6. Tree special case?  → DFS return-cost or BFS bottleneck
```

Day 30 quests (visit all nodes, remove edges) combine several — Day 27 is the **decision rehearsal**.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| **BFS on position only for #1654** | Allows illegal double-back sequences |
| **DFS for minimum jumps** | Not shortest |
| **BFS for network rank** | Rank is closed form from degrees |
| **Simulate all jump sequences without dist[]** | Revisit states — need visited on (pos,back) |
| **Dijkstra on unweighted jumps** | BFS sufficient |

### 7. Day 27 vs Day 23 state BFS

| | **Day 23 — Word/board** | **Day 27 — Jumps** |
|---|---|---|
| State | Word string / square | `(pos, backFlag)` |
| Neighbors | Letter change / dice | +a always; -b if back==0 |
| Blocked | Not in dict | forbidden coordinate |
| Goal | endWord / n² | pos == x |

Same BFS skeleton — different state encoding.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "Minimum jumps" + forbidden position | Expanded-state BFS |
| "Cannot jump backward twice in a row" | `(pos, back)` tuple |
| "Network rank" / "maximum rank of pair" | deg sum − edge |
| "Find city pair" static metric | O(n²) enumeration |
| "Shortest path" no extra constraint | Plain BFS/Dijkstra — don't over-expand state |

**Keywords:** `(pos, back)` · `forbidden` · `deg[i]+deg[j]-edge` · `pattern triage` · `S30 preview`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BFS only on `pos` | Track backward flag |
| Allow backward when `back==1` | Enforce in neighbor generation |
| Run BFS for rank problem | Use degree formula |
| Forget upper bound ~6000 on position | Problem guarantees solution in range |
| Double-subtract edge on rank | Subtract 1 only if road exists |

### 10. Recognition drill

Read this problem aloud:

> *"Minimum jumps from 0 to x; each step +a or -b; can't jump backward twice consecutively; one forbidden position."*

Before coding, say:

> *"BFS on (pos, back), skip forbidden, cap search space. NOT plain line BFS. NOT Dijkstra."*

Read:

> *"Maximum network rank of two cities connected by roads."*

Before coding, say:

> *"deg[] + edge matrix, max over pairs — no traversal."*

---

*Pick the pattern first. First quest: forbidden-position jump BFS. →*
