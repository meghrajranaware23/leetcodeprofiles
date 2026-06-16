<!-- hand-authored -->
# 📝 Advanced Trie Applications

> **Day 24** · Advanced Trie · ★★★★☆ · 20 XP · 15 min read

---

Day 19 built the **prefix tree** — insert, search exact words, prefix checks. Today you extend that structure for **wildcard search** (`'.'` matches any letter) and **greedy prefix replacement** (shortest dictionary root wins). Both reuse the same 26-child node from [Implement Trie #208](https://leetcode.com/problems/implement-trie-prefix-tree/) — only the **walk logic** changes.

> **Contrast (Day 19 / B-Rank):** Yesterday = exact match insert/search. Today = **branching DFS on '.'** + **stop at first word marker on prefix walk**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Advanced trie walks — two variants on the same tree:**

| Variant | Operation | Key behavior |
|---|---|---|
| Wildcard search | `search("..e")` with `'.'` | DFS: letter → one child; dot → try all 26 |
| Prefix replace | Shortest root for each word in sentence | Insert roots; walk until `#`/word marker, stop early |

### 2. Simple explanation

**Trie recap (Day 19):** Each node = one character prefix. `children[c]` = next letter. `isEnd` / `'#'` = complete word lives here. Insert = walk and create. Exact search = walk or fail.

**Wildcard `.`:** At a dot, you don't know which branch — **try every non-null child**. If any branch succeeds for the rest of the pattern, return true. Backtracking is natural DFS. Worst case explores many paths; still bounded by trie size.

**Prefix replace (greedy):** Build trie from dictionary. When inserting, **stop extending** if a shorter word already marks this node as end — longer words can't steal a shorter root's prefix. When processing each sentence word, walk the trie char by char; **the moment you hit a word marker, replace** with that root (shortest wins because you never skipped an earlier marker).

### 3. Visual — Wildcard DFS on '.'

```
Trie after addWord("bad"), addWord("dad"), addWord("mad"):

(root) --b--> [a] --d--> [# end "bad"]
      \--d--> [a] --d--> [# end "dad"]
      \--m--> [a] --d--> [# end "mad"]

search(".ad"):
  i=0, c='.' at root → try b, d, m children
    branch 'b': i=1 c='a' → go to [a]
              i=2 c='d' → go to [d] end → match ✓

search("b.."):
  i=0 'b' → [a]
  i=1 '.' → try all children of [a] (only 'd')
  i=2 '.' → at [d], try children (none) → fail on 'b' branch? only 'd' leaf → end check

  ┌─────────────────────────────────────────────┐
  │  if c != '.':  one child path               │
  │  if c == '.':  for each child: dfs(i+1)     │
  │  base: i == len(word) → return node.isEnd   │
  └─────────────────────────────────────────────┘
```

### 4. Visual — Prefix replace greedy

```
Dictionary: ["cat", "bat", "rat"]
Sentence word: " cattle"

Trie roots (stop insert early if marker exists):
  c--a--t--[# "cat"]   (don't need "cattle" path for replace)
  b--a--t--[#]
  r--a--t--[#]

Walk "cattle":
  c → a → t → [# found "cat"] STOP → replace with "cat"
  Result: "cat tle" → "cat" (whole token replaced)

Dictionary: ["a", "aa"]
Insert "a" first → mark root path 'a' as end
Insert "aa": when reaching node after 'a', marker exists → break insert
  Ensures "a" beats "aa" for word "aa..." 

Greedy walk: first end-marker on path = shortest prefix root ✓
```

### 5. The universal template

**Insert (Day 19 base):**
```
function addWord(word):
    node = root
    for c in word:
        node = node.children[c] or create
    node.isEnd = true
```

**Wildcard search DFS:**
```
function dfs(word, i, node):
    if not node: return false
    if i == len(word): return node.isEnd
    c = word[i]
    if c != '.':
        return dfs(word, i+1, node.children[c])
    for child in node.children:
        if child and dfs(word, i+1, child): return true
    return false
```

**Prefix replace insert (shortest root wins):**
```
for w in dictionary:
    node = root
    for c in w:
        node = node.children[c] or create
        if node.isEnd: break    // shorter root already here
    node.word = w               // mark at end of this prefix
```

**Prefix replace query:**
```
for c in word:
    if c not in children: break
    node = children[c]
    if node.word: return node.word   // greedy stop
return original word
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Scan dictionary for each word prefix | O(dict × word len) per token |
| Regex / backtracking on raw list | No prefix sharing — slow |
| Wildcard: generate all 26^k strings | Exponential — DFS prunes by trie structure |
| Replace: sort dictionary by length each query | Rebuild logic every sentence — trie insert once |

**The insight:** Trie **shares prefixes** across words. Wildcard branches only where trie has edges. Replace stops at first stored root — O(word len) per token.

### 7. Day 24 vs Day 19

| | **Day 19** | **Day 24** |
|---|---|---|
| Match type | Exact / prefix exists | Wildcard + shortest root |
| Search | Single path | DFS multi-branch on '.' |
| Insert nuance | Always full word | Early break if shorter root marked |
| Problems | Implement Trie | Word Dictionary, Replace Words |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "search with '.' wildcard" | Trie + DFS all children at dot |
| "add and search words" | Design class — insert path + search DFS |
| "replace with root" / "shortest prefix" | Greedy trie walk, stop at first marker |
| "dictionary of roots" | Batch insert into trie first |
| "prefix tree" / "trie" | Day 19 structure — extend walk |

**Keywords:** `'.' → all children` · `isEnd / '#'` · `break insert if marker` · `stop at first word`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Wildcard: only trying one child on '.' | Must loop all 26 (or all non-null) |
| Wildcard: forgetting null node check | Base case before index access |
| Replace: insert full long words after short root marked | Break insert when `isEnd` already set |
| Replace: not stopping walk at first marker | Continue past shortest root |
| Using hash set for prefix replace | Loses greedy shortest-prefix-on-path property |

### 10. Recognition drill

Read this problem aloud:

> *"Design a structure to add words and search with '.' matching any letter."*

Before coding, say:

> *"Day 19 trie insert. Search = DFS: dot branches all children, letter = one child. Base i==len → isEnd."*

---

*Same trie as Day 19 — new walk rules for wildcards and greedy roots. First quest: Word Dictionary. →*
