<!-- hand-authored -->
# 📝 The Final Ascension

> **Day 30** · Final Ascension · 25 XP · 18 min read

---

Twenty-nine days. One forest. Today's concept is the **Pattern Decision Tree** — the capstone flowchart that routes any new tree problem to the right template from Days 1–29. Today's quests are **post-order excess/deficit** (#979) and **subtree gene-set aggregation** (#2003) — two bottom-up patterns that look unrelated until you run the decision tree.

This is not new theory. It is **Forest Legend synthesis**.

---

## Part 1 — The Capstone Pattern Decision Tree

### 1. The master flowchart

When a new tree problem lands, run this tree **before** coding:

```
                         NEW TREE PROBLEM
                                │
              ┌─────────────────┴─────────────────┐
              │ Is input a BINARY TREE / BST /     │
              │ N-ARY TREE node structure?         │
              └─────────────────┬─────────────────┘
                           NO  │  YES
                                ↓
              ┌─────────────────────────────┐
              │ GRID / TRIE / DESIGN?       │
              │ → Day 19/24 trie            │
              │ → Day 29 quad-tree / magic    │
              │ → Day 16 serialize            │
              └─────────────────────────────┘
                                │
              (YES — binary/N-ary tree) ──────┐
                                              ↓
              ┌─────────────────────────────┐
              │ Need ALL nodes at each      │
              │ depth / level?              │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
              ┌─────────────────────────────┐
              │ BFS + QUEUE                 │
              │ Days 3, 9, 15, 17           │
              └─────────────────────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Compare TWO trees / mirror  │
              │ subtrees at once?           │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
              ┌─────────────────────────────┐
              │ PARALLEL RECURSION          │
              │ Days 5, 21                  │
              └─────────────────────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ BUILD tree from traversals  │
              │ or split array?             │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
              ┌─────────────────────────────┐
              │ DIVIDE & CONQUER BUILD      │
              │ Days 8, 29                  │
              └─────────────────────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Information flows DOWN      │
              │ (parent gives child context)│
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
              ┌─────────────────────────────┐
              │ TOP-DOWN DFS                │
              │ Days 6, 11 (range), 28      │
              │ path sum, remainder, streak │
              └─────────────────────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Children REPORT values UP;  │
              │ parent COMBINES?            │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Single      │   │ Multi-value  │   │ Global update│
  │ return      │   │ tuple return│   │ at each node │
  │ Days 4, 13  │   │ Days 20, 28  │   │ Days 7, 14   │
  │ height,count│   │ BST tuple    │   │ diameter     │
  └─────────────┘   │ (sum,count)  │   └──────────────┘
                    │ Day 30 gene  │
                    └──────────────┘
                            │
              ┌─────────────┴───────────────┐
              │ Greedy / min moves / excess │
              │ bubbling through edges?     │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
              ┌─────────────────────────────┐
              │ POST-ORDER EXCESS/DEFICIT   │
              │ Day 30 Distribute Coins     │
              └─────────────────────────────┘
                            │
              ┌─────────────┴───────────────┐
              │ Coverage / placement /      │
              │ 3-state child report?       │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
              ┌─────────────────────────────┐
              │ MULTI-STATE BOTTOM-UP       │
              │ S-Test: Tree Cameras #968   │
              └─────────────────────────────┘
```

### 2. Route to the right day

| Problem shape | Reach for | Example days |
|---|---|---|
| Max depth / count / height | Single bottom-up return | 1, 4 |
| Level order / right side / zigzag | BFS queue | 3, 9, 17 |
| Path sum / root-to-leaf collect | Top-down + backtrack | 6, 14 |
| Same tree / symmetric / subtree | Parallel recursion | 5, 21 |
| Diameter / max path sum | Bottom-up + global | 7, 14 |
| Construct from pre+in / post+in | Divide build | 8 |
| Validate / search BST | Range descent or inorder | 11, 12 |
| LCA | Split detection | 13 |
| Serialize / deserialize | Preorder + null | 16 |
| Morris / O(1) space inorder | Threaded traversal | 26 |
| Tree as graph / distance K | Graph BFS from tree | 22, 25, 27 |
| Trie / prefix / dictionary | Char-indexed tree | 19, 24, 29 |
| BST validity + optimize subtree | 4-tuple combine | 28 |
| Consecutive parent-child streak | Running state down | 28 |
| Quad-tree from grid | 4-way unify/split | 29 |
| Coin redistribution moves | Post-order excess | 30 |
| Subtree gene / value set MEX | Set aggregation up path | 30 |
| Camera / coverage placement | 3-state child DP | S-Test |

### 3. Today's two capstone patterns

**Distribute Coins #979** — post-order **excess/deficit**:

```
dfs(node) → returns net excess coins to push UP to parent
  excess = node.coins + dfs(left) + dfs(right) - 1
  ans += abs(excess)        // every coin crossing an edge = one move
  return excess
```

Each node keeps 1 coin; surplus or deficit flows through the edge to parent. Moves accumulate on `abs(excess)` — greedy because any excess must cross the parent edge exactly once.

**Smallest Missing Genetic Value #2003** — **subtree gene-set aggregation** on the path to root:

```
Only nodes on path from unique "1" node up to root matter.
Walk cur = node_with_1, then cur = parent[cur]:
  DFS-collect all values in subtree(cur) into global set
  MEX = smallest positive integer not in set
  ans[cur] = mex; increment mex while in set
```

Brute force DFS every subtree for every node is O(n²). The insight: only ancestors of the `1`-node need non-trivial answers; all others stay `1`.

### 4. The Forest Legend workflow

Every S-Rank interview problem:

1. **Draw** — sketch the tree or grid
2. **Route** — run the decision tree → name the day/pattern
3. **Trace** — one example on paper (post-order unwind or top-down state)
4. **Code** — template first, special cases second
5. **Prune** — can a subtree be skipped? (gene problem: only path to root)

> 💡 **The S-Rank skill:** Draw the tree first. Name the pattern second. Code third.

### 5. Full pack map — where you learned each branch

```
Days  1–2:  compass + DFS visit orders (in/pre/post)
Days  3–4:  BFS level-order + bottom-up combine
Days  5–6:  parallel compare + top-down path state
Days  7–8:  global update + construction divide
Days  9–10: BFS variants + iterative DFS stack
Days 11–13: BST range, operations, LCA split
Days 14–18: path/diameter, views, serialize, manipulate
Days 19–24: trie + n-ary + advanced trie design
Days 20–21: tree DP tuples + subtree patterns
Days 22–27: tree-as-graph, distance, Morris, hybrid
Days 28–29: synthesis — streak + BST tuple, trie + quad-tree
Day  30:    capstone — excess post-order + gene aggregation
S-Test:     cameras (3-state), good paths (DSU), avg subtree (sum,count)
```

### 6. Common capstone mistakes

| Mistake | Pattern | Fix |
|---|---|---|
| Distribute Coins: top-down moves | Day 30 | Post-order excess — moves count on unwind |
| Distribute Coins: count node.coins as moves | Day 30 | Only `abs(excess)` crossing edge |
| Gene MEX: DFS every node from scratch | Day 30 | Only path from `1`-node to root |
| Gene MEX: forget global visited set | Day 30 | Subtrees overlap — accumulate once |
| Skip decision tree, guess traversal | All days | Route first — direction follows dependency |
| Tree Cameras: greedy top-down | S-Test | 3-state bottom-up — place on uncovered child |

### 7. Recognition drill — capstone edition

Read each problem. Route through the tree:

> *"Minimum moves so every node has exactly one coin."*
>
> → **Post-order excess.** Day 30. `ans += abs(excess)`.

> *"Smallest missing genetic value in each subtree."*
>
> → **Gene set aggregation.** Day 30. Walk ancestors of node-with-1 only.

> *"Minimum cameras to monitor all nodes."*
>
> → **3-state bottom-up.** S-Test. Place camera when child uncovered.

> *"Count nodes where value equals subtree average."*
>
> → **Multi-value tuple `(sum, count)`.** S-Test. Bottom-up combine.

> *"Number of good paths (non-decreasing values)."*
>
> → **DSU + sort by value.** S-Test. Not pure tree DFS — graph on tree.

---

*You have the full decision tree. Quest 1: Distribute Coins — excess flows up. →*
