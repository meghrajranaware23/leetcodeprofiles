<!-- hand-authored -->
# 📝 Backtracking + Memoization Bridge

> **Day 21** · Backtracking + Memoization Bridge · 25 XP · 15 min read

---

Days 14–20 taught **backtracking**: choose, explore, unchoose on a decision tree. Today you meet a cousin problem that *looks* like string partition backtracking — but the same **starting index** gets asked again and again. That overlap is the bridge to **memoization**.

Your mission: see **index memo** as a cache on the recursion tree before you code Word Break I and II.

---

## Part 1 — Learn the Pattern

### 1. The shared skeleton — partition by index

Both Word Break problems share the same recursive shape from Day 14 (Palindrome Partitioning, Restore IP):

```
wb(i):  // can we segment s[i..] using the dictionary?
    if i == len(s): return success / collect answer
    for j from i+1 to len(s):
        if s[i..j] is a valid word:
            if wb(j) succeeds: ...
```

**What shrinks?** The start index `i` moves right after each word cut.  
**Base case:** `i == n` — entire string consumed.

This is **not** push/pop on a path for Word Break I. You're asking a yes/no question: *does the suffix starting at `i` break cleanly?*

### 2. Visual — index memo: wb(0) calls wb(3)

```
s = "leetcode"   dict = {leet, code}

wb(0)
  cut "l"     → not in dict
  cut "le"    → not in dict
  cut "lee"   → not in dict
  cut "leet"  ✓ → wb(4)
                  cut "c"   → no
                  cut "co"  → no
                  cut "cod" → no
                  cut "code" ✓ → wb(8) → BASE i==8 ✓

Return true: "leetcode" = "leet" + "code"
```

Now watch **overlap**. On a longer string, two different cut sequences can land on the **same index**:

```
s = "aaaaaab"  (bad dict, illustrative)

wb(0) tries cuts that eventually ask wb(3)
wb(1) tries cuts that also ask wb(3)   ← same subproblem!

Without memo: wb(3) recomputed from scratch every time → exponential
With memo:    wb(3) computed once, cached at memo[3]
```

**The memo key is the index `i`**, not the path of words chosen. State = *"what suffix remains?"*

```
memo[i] = can s[i..] be segmented?          (Word Break I)
memo[i] = all sentence strings from s[i..]  (Word Break II)
```

### 3. Word Break I (#139) — pure index memo

Question: **boolean** — does *any* valid segmentation exist?

```
function wb(i):
    if i == n: return true
    if memo[i] already known: return memo[i]

    for each cut j > i:
        if s[i..j] in dict AND wb(j):
            memo[i] = true; return true

    memo[i] = false; return false
```

No `path` push/pop. The recursion **returns** truth up the stack. Memo stores `-1/0/1` or `true/false` per index.

**Complexity intuition:** O(n²) cuts × O(1) memo lookup = O(n²) total subproblems.

### 4. Word Break II (#140) — backtracking tree + index memo

Question: **generate all** valid sentences.

The **decision tree** is real again — each valid word at `i` is a branch:

```
s = "catsanddog"  dict = {cat, cats, and, sand, dog}

wb(0)
├─ "cat"  → wb(3)
│   ├─ "sand" → wb(7)
│   │   └─ "dog" → wb(10) ✓  →  "cat sand dog"
│   └─ "and" → wb(6) ...
└─ "cats" → wb(4)
    └─ "and" → wb(7)
        └─ "dog" → wb(10) ✓  →  "cats and dog"
```

**Pure backtracking** (no memo) revisits the same index with the same suffix work:

```
wb(7) called from "cat sand | dog..."
wb(7) called again from "cats and | dog..."   ← different path, same index
```

**Hybrid:** memo[i] = list of all sentence completions from `s[i..]`. First visit computes; later visits return the cached list and **skip re-walking the subtree**.

```
for word w at cut (i, j):
    for each tail in memo[j]:          // cached suffix sentences
        combine w + tail into result
    store all combinations at memo[i]
```

| Word Break I | Word Break II |
|---|---|
| Return `bool` | Return `List<String>` |
| Short-circuit on first success | Must explore all branches once per index |
| Memo = reachable? | Memo = all completions from index |
| No path variable | Combines cached tails (implicit backtrack) |

### 5. Contrast — when memo helps vs pure backtrack

| Signal | Reach for |
|---|---|
| "Can it be done?" / "is it possible?" | Index memo with boolean (WB I) |
| "Return all ways" + same suffix revisited | Backtracking + memo on index (WB II) |
| "Return all ways" + no overlapping index states | Pure backtrack (Palindrome Partitioning — each `i` visited once per path) |
| Count ways with heavy overlap | Memo on index with count (Day 23+) |

**Palindrome Partitioning** also cuts by index, but every path strictly increases `i` — you never ask *"from index 3, what are all answers?"* from two unrelated branches with identical remaining suffix **unless** you structure it that way. Word Break II's combinatorial explosion makes index memo essential.

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| Try every split with nested loops | O(2^n) cuts, no structure |
| WB I without memo | Recomputes `wb(j)` exponentially many times |
| WB II without memo | Regenerates identical suffix sentences from every path |
| BFS/DP bottom-up for WB II | Valid — but today's goal is seeing **top-down memo** as backtracking's ally |

### 7. Foreshadow — A-Rank Day 23

Today is the **bridge**: you already know backtracking; you add a **cache keyed by subproblem state**.

Day 23 (A-Rank) generalizes this:

```
if state in memo: return memo[state]
... recurse ...
memo[state] = result
```

Word Break I is the cleanest intro — state = single index. House Robber, Decode Ways — state = index or (index, flag). Same picture: **overlap recognition → memo → top-down DP**.

> 💡 **B-Rank takeaway:** Draw the tree. Circle repeated `(i)` nodes. That's where memo lives.

### 8. Pattern signals

| When the problem says… | Think… |
|---|---|
| "word break" / "segment string" / dictionary cuts | Index loop `i..j`, recurse from `j` |
| "true/false" + same suffix asked many times | Boolean memo on index |
| "return all sentences" + suffix overlap | List memo on index + combine |
| "partition" without dict | Backtrack + validator (Day 14) |
| "how many ways" + overlap | Count memo (Day 23 preview) |

**Keywords:** `index memo` · `wb(i)` · `suffix` · `overlap` · `cache` · `combine tails`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Memoizing the path of words, not the index | Key = start index `i` only |
| Using push/pop path for WB I | Return bool — no shared path |
| Forgetting to store false in memo (WB I) | Cache failures too — prevents recomputation |
| WB II: building strings without memo[j] | Ask cached suffix first, then prepend word |
| Confusing WB II with Palindrome Partitioning push/pop | WB II memo replaces re-exploration; path is implicit in combine |

### 10. Recognition drill

Read this problem aloud:

> *"Given string `s` and a dictionary, determine if `s` can be segmented into dictionary words."*

Before coding, say:

> *"Index recursion wb(i). Base: i==n. Loop cuts, dict check, recurse wb(j). Memo[i] = bool. Overlap at same index → cache."*

Read the variant:

> *"Return every valid sentence."*

Before coding, say:

> *"Same cut loop, but memo[i] = list of suffix sentences. Combine word + each memo[j] tail. Cache before backtracking explodes."*

---

## Part 2 — What's Next

Today's quests are the pair that defines the bridge:

1. **Word Break #139** — boolean index memo (pure overlap recognition)
2. **Word Break II #140** — backtracking tree + index memo hybrid

Trace `wb(0)` on paper. Mark every call to `wb(j)`. Circle duplicates — that's your memo table.

---

*You see the overlap. First quest: cache yes/no at each index. →*
