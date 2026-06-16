<!-- hand-authored -->
# 📝 Tree Synthesis II: Design + Spatial Trees

> **Day 29** · Tree Synthesis II · ★★★★★ · 25 XP · 18 min read

---

Day 19 taught **trie basics** — each edge is a character; paths from root spell prefixes. Day 24 extended to **design problems** — `WordDictionary` with wildcard search and prefix replacement. Day 8 taught **divide-and-conquer construction** — split input, build subtrees, merge at parent.

Today is **design synthesis**: a trie that tolerates exactly one wildcard mismatch, and a **4-ary quad-tree** that unifies uniform regions or splits into four quadrants. Both are trees — but one is character-indexed, one is spatial.

---

## Part 1 — Trie Wildcard + Quad-Tree Split

### 1. Thread A — Day 19 → Day 24 → Magic Dictionary

**Day 19 skeleton** (Implement Trie):

```
insert(word):
    node = root
    for c in word:
        if c not in node.children: node.children[c] = new Node
        node = node.children[c]
    node.is_end = true

search(word):  // exact match
    node = root
    for c in word:
        if c not in node.children: return false
        node = node.children[c]
    return node.is_end
```

**Day 24 upgrade** — `WordDictionary` adds `'.'` wildcard:

```
search(word):
    return dfs(root, 0)

dfs(node, i):
    if i == len(word): return node.is_end
    c = word[i]
    if c == '.':
        for each child of node:
            if dfs(child, i+1): return true
        return false
    else:
        if c not in node.children: return false
        return dfs(node.children[c], i+1)
```

**Today's Magic Dictionary #676** — same wildcard idea, different constraint:

| | WordDictionary #211 | Magic Dictionary #676 |
|---|---|---|
| Build | Insert words into trie | Store word list (or trie) |
| Query | Match with `.` wildcards | Match with **exactly 1** char difference |
| Wildcard count | Any number of `.` | Precisely one mismatch |

**Trie design for exactly-one mismatch:**

```
search(word):
    return dfs(root, 0, mismatches_used=0)

dfs(node, i, used):
    if i == len(word): return node.is_end && used == 1
    c = word[i]
    // branch A: match current char (no new mismatch)
    // branch B: skip/exchange — try all other chars if used == 0
```

For interview speed, today's quest solution uses **O(n·L) word comparison** — acceptable for Medium constraints. The trie wildcard design is the S-Rank mental model when dictionary grows large.

### 2. Thread B — Quad-tree: unify or split

**Construct Quad Tree #427** — Day 8 construction logic on a **2D grid**:

```
build(grid, r, c, size):
    if all cells in [r..r+size)[c..c+size) are equal:
        return Leaf(allSameValue)
    half = size / 2
    return Internal(
        build(topLeft),
        build(topRight),
        build(bottomLeft),
        build(bottomRight)
    )
```

**Four quadrants** (fixed order — LeetCode convention):

```
┌─────────┬─────────┐
│ topLeft │ topRight│   row r, cols c .. c+half-1
│  (NW)   │  (NE)   │
├─────────┼─────────┤
│ bottomL │ bottomR │   row r+half ..
│  (SW)   │  (SE)   │
└─────────┴─────────┘
```

**Unify optimization (Python approach in quest):** Build four children first. If all four are leaves **with the same value**, collapse into one leaf — saves nodes.

```
if all(child.isLeaf && child.val == same):
    return Leaf(same)     // merge — don't keep 4 redundant leaves
else:
    return Internal(tl, tr, bl, br)
```

### 3. Visual — Magic Dictionary search trace

```
Dictionary: ["hello", "leetcode"]
Search: "hello"  → diff=0 → false (need exactly 1)
Search: "hallo"  → diff=1 at index 1 → true ✓
Search: "hell"   → wrong length → false
Search: "yello"  → diff=1 at index 0 → true ✓
Search: "helo"   → wrong length → false
```

Exactly-one constraint means you **count mismatches**, not maximize matches.

### 4. Visual — Quad-tree on 4×4 grid

```
grid:          quad-tree:
1 1 1 1        Internal
1 0 0 1          ├─ Leaf(1)     topLeft all 1s
1 0 0 1          ├─ Leaf(0)     topRight mixed → further split
1 1 1 1          ├─ Leaf(0)     bottomLeft
                 └─ Leaf(1)     bottomRight all 1s
```

When top-right quadrant is mixed, `build` recurses with `size=2` until cells unify or reach `size=1`.

### 5. Side-by-side recognition

| Signal | Reach for | Pack thread |
|---|---|---|
| "prefix" / "dictionary" / "search word" | Trie traversal | Day 19 |
| "`.` wildcard" / fuzzy match | Trie DFS with branch | Day 24 |
| "exactly one character different" | Mismatch counter or compare | Day 29 quest |
| "construct tree from grid" | 4-way divide + unify | Day 8 + Day 29 |
| "all values same in region" | Base case → leaf | Quad-tree |
| "merge identical leaf children" | Post-build collapse | S-Rank optimization |

### 6. Common synthesis mistakes

| Mistake | Fix |
|---|---|
| Magic: accept diff=0 or diff≥2 | Exactly **one** mismatch |
| Magic: different lengths | Skip immediately |
| Trie wildcard: forget to backtrack | DFS naturally unwinds — don't mutate trie |
| Quad-tree: wrong quadrant order | TL, TR, BL, BR — match LeetCode |
| Quad-tree: off-by-one in subgrid bounds | `r+half`, `c+half` for bottom-right origin |
| Quad-tree: internal node value | Internal nodes have `isLeaf=false`; value often ignored |

### 7. Recognition drill

> *"Search whether a word differs from exactly one dictionary word by one character."*
>
> → **Magic Dictionary** — length filter + mismatch count. Trie upgrade if dict is huge.

> *"Build a quad-tree to represent a 2^n × 2^n grid."*
>
> → **Unify or split** — if region uniform → leaf; else 4 recursive builds.

> *"Add and search words with `.` wildcard" (Day 24)*
>
> → **Trie DFS** — on `.`, try all 26 children.

---

*Design synthesis ready. Quest 1: Magic Dictionary — exactly-one mismatch. →*
