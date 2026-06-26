<!-- hand-authored -->
# 📝 N-ary Trees and Trie Structures

> **Day 19** · N-ary Trees & Tries · 25 XP · 15 min read

---

Binary trees split **left/right**. Today expands the family: **N-ary trees** (children in a list) and **tries** (edges labeled by **characters**, not left/right). Tries power prefix search; N-ary recursion replaces two child calls with a loop over `children`.

> **Contrast (Day 1):** Binary nodes have `.left` / `.right`. Trie nodes have `children['a'..'z']` and an **`isEnd`** flag marking complete words.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Char-edge trie + N-ary postorder** — two structures:

| Structure | Edge meaning | Child access |
|---|---|---|
| **Trie** | One character per edge | `node.ch[c-'a']` or map |
| **N-ary tree** | Parent-child link | `for child in node.children` |

### 2. Simple explanation

A **trie** stores strings by shared prefixes. Insert `"cat"` and `"car"`: walk `c → a`, then branch `t` vs `r`. Each step follows the **character edge**. At the last character, set **`isEnd = true`** — that node marks a complete word, not just a prefix.

An **N-ary tree** generalizes depth: max depth = 1 + max depth among **all** children (loop, not left/right).

### 3. Visual — Trie: char-edge diagram + isEnd flag

```
Insert: "cat", "car", "dog"

                    (root)
                      |
          +-----------+-----------+
          c                         d
          |                         |
          a                         o
        /   \                       |
       t     r                      g
     isEnd  isEnd                 isEnd
      ✓      ✓                     ✓

Edges labeled by CHARACTER — not "left" or "right".

Node after 'a' on c-branch:
  child['t'] → word "cat"  (isEnd=true)
  child['r'] → word "car"  (isEnd=true)

search("ca")   → walk c,a → exists but isEnd=false → false
search("cat")  → walk c,a,t → isEnd=true → true
startsWith("ca") → walk c,a → true (prefix OK)
```

**Trie node fields:**
```
struct TrieNode {
    TrieNode* children[26];   // or map<char, TrieNode*>
    bool isEnd;               // true = complete word ends here
};
```

### 4. Visual — N-ary depth: bubble max from children

```
N-ary tree (NOT binary — no left/right):

           1
        /  |  \
       3   2   4
          /
         5
        / \
       6   7

POSTORDER bubble (each node asks all children):

dfs(6): return 1
dfs(7): return 1
dfs(5): max(1,1)+1 = 2
dfs(3): return 1
dfs(2): return 1
dfs(4): return 1
dfs(1): max(1,1,1,2)+1 = 3   ← depth 3

LOOP over children — not left/right DFS:
  best = 0
  for child in node.children:
      best = max(best, dfs(child))
  return best + 1
```

### 5. The universal template

**Trie insert / search:**
```
function insert(word):
    cur = root
    for c in word:
        if cur.next[c] is null: cur.next[c] = new Node()
        cur = cur.next[c]
    cur.isEnd = true

function search(word):
    cur = root
    for c in word:
        if cur.next[c] is null: return false
        cur = cur.next[c]
    return cur.isEnd          // prefix ≠ word without isEnd
```

**N-ary max depth:**
```
function maxDepth(node):
    if node is null: return 0
    best = 0
    for child in node.children:
        best = max(best, maxDepth(child))
    return best + 1
```

| Problem | Pattern | Key detail |
|---|---|---|
| Implement Trie #208 | Char-edge walk + isEnd | `startsWith` skips isEnd check |
| N-ary Max Depth #559 | Loop children, bubble max | `children` list, not `.left/.right` |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Store all strings in hash set only | No prefix queries; O(total chars) space anyway |
| Trie without isEnd | `"ca"` matches word incorrectly |
| Binary left/right on N-ary problem | Wrong API — use `children` vector |
| BFS depth when postorder is simpler | Both O(n); loop-recursion is cleaner |
| Array of all words for prefix search | O(nm) scan vs O(m) trie walk |

### 7. Bridge — B-Rank Word Search II (test preview)

Day 19 trie is the foundation for **Word Search II #212** (B-Rank test): build trie from dictionary, DFS grid following character edges, prune when edge missing.

| Today #208 | Word Search II #212 |
|---|---|
| insert / search / startsWith | Trie + grid backtracking |
| Char edges | Same edge walk on board |
| isEnd marks word | Collect word at isEnd, prune branch |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "prefix tree" / "trie" | Char edges + isEnd |
| "search prefix" vs "search word" | startsWith vs isEnd |
| "N-ary" / "children list" | Loop all children |
| "maximum depth" on Node* with `.children` | N-ary postorder max |
| "dictionary of words" on grid | Trie + DFS (test) |

**Keywords:** `isEnd` · `children[26]` · `for child in children` · `char edge`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Treating trie as binary tree | Edges = characters, up to 26 branches |
| Forgetting isEnd on insert | Last char node must flag word end |
| startsWith checks isEnd | Only search(word) needs isEnd |
| N-ary: hardcoding left/right | Iterate `node.children` |
| Empty children list on leaf | Leaf depth = 1, not 0 |

### 10. Recognition drill

Read this problem aloud:

> *"Implement a trie with insert, search, and startsWith."*

Before coding, say:

> *"Walk char by char. Create missing edges. isEnd on insert's last node. search requires isEnd; startsWith does not."*

---

*Tries for strings; N-ary loops for general trees. First quest: build the trie. →*
