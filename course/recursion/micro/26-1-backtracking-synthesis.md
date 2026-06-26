<!-- hand-authored -->
# 📝 Backtracking Synthesis I

> **Day 26** · Backtracking Synthesis I · 20 XP · 15 min read

---

Day 8 taught **choose → explore → unchoose** on two generation trees: phone-pad letters (#17) and balanced parentheses (#22). You already know both templates. Today is **synthesis** — not a re-lesson. You revisit those two problems side-by-side and learn to **name which tree you're in** before you write a single line of code.

Your mission: see the **same skeleton, different constraints** — multi-branch vs pruned binary — and code both from memory.

---

## Part 1 — Day 8 Revisit: Two Trees, One Template

### 1. What you already know

Both problems from Day 8 share the backtracking rhythm:

```
function dfs(state, path):
    if done(state):
        results.add(copy(path))
        return
    for each valid choice c:
        path.append(c)           // CHOOSE
        dfs(next_state, path)    // EXPLORE
        path.pop()               // UNCHOOSE
```

**What changes between problems is not the rhythm — it's the state and the branch rule.**

| | Letter Combinations #17 | Generate Parentheses #22 |
|---|---|---|
| **State** | index `i` into `digits` | `(open, close)` counters |
| **Branch rule** | Every letter on current digit | `(` if `open > 0`; `)` if `open > close` |
| **Branch count** | 3–4 per level (variable) | At most 2 (pruned) |
| **Base case** | `i == len(digits)` | `len(path) == 2n` |
| **Constraint type** | None — all branches valid | Balance — invalid `)` pruned |

You solved both on Day 8. Today you prove you can **switch trees instantly**.

### 2. Side-by-side — phone pad vs open/close

**Phone pad (`digits = "23"`)** — unconstrained multi-branch:

```
                    dfs(i=0, path="")
                   /    |    \
                  a     b     c          ← 3 branches (digit '2')
                 /      |      \
           dfs(i=1)  dfs(i=1)  dfs(i=1)
            /|\      /|\      /|\
          ad ae af  bd be bf  cd ce cf   ← 3 branches each (digit '3')

9 leaves = 3 × 3. Every branch is valid. No pruning.
```

**Parentheses (`n = 2`)** — constrained binary tree:

```
                        ""  open=2 close=0
                       /
                     "("  open=1 close=0
                    /         \
                 "(("         "()"  ← ')' only when open > close
               open=0         open=0 close=1
                  |              |
               "(())" ✓        "()()" ✓

Invalid branches like ")(" never exist — pruned at generation.
```

**The synthesis insight:** Same push/dfs/pop. Phone pad fans out freely; parentheses gates each branch behind `open`/`close`.

### 3. Recognition in 10 seconds

Before coding, say one sentence:

| Problem signal | Your one-liner |
|---|---|
| "phone keypad" / "letter combinations" / digits 2–9 | *"Index DFS — loop all letters on digit `i`, recurse `i+1`, pop."* |
| "well-formed parentheses" / "n pairs" / balanced | *"Open/close counters — `(` if opens remain, `)` if `open > close`, base at length `2n`."* |

If you reach for nested loops on phone pad or generate-all-strings-then-filter on parentheses, you've forgotten Day 8. **Draw the tree first.**

### 4. What differs in the revisit quests

Today's quests are the **same LeetCode problems** (#17 and #22). The skill being tested:

1. **Recall** — implement from the template without re-reading Day 8 notes
2. **Contrast** — explain why phone pad needs no pruning but parentheses does
3. **Transfer** — spot "multi-branch index" vs "constrained counter" on unseen problems

This is not new material. It's **muscle memory** for A-Rank interviews.

### 5. Common synthesis mistakes (Day 8 déjà vu)

| Mistake | Which tree? | Fix |
|---|---|---|
| Append without pop | Both | Sibling branches inherit wrong prefix |
| Nested loops per digit length | Phone pad | Index `i` generalizes to any length |
| Generate all `(` `)` strings, filter | Parentheses | Prune with `open > close` during DFS |
| `close < n` instead of `open > close` | Parentheses | Allows invalid prefixes like `())` |
| Skip empty `digits` check | Phone pad | Return `[]`, not `[""]` |

### 6. Pattern signals — synthesis drill

| When the problem says… | Tree type | State |
|---|---|---|
| "letter combinations" / "keypad" / digits → letters | Multi-branch index | `i`, path |
| "generate parentheses" / "balanced" / n pairs | Constrained binary | `open`, `close`, path |
| "generate all" + **no constraint** | Multi-branch | varies |
| "generate all" + **validity rule on prefix** | Constrained | counters or bounds |

**Keywords:** `synthesis` · `revisit` · `choose` · `explore` · `unchoose` · `open` · `close` · `index`

### 7. Recognition drill

Read each problem aloud. Name the tree **before** the template:

> *"Given digits on a phone, return all letter combinations."*
>
> → **Multi-branch index tree.** Base `i == n`. Loop `KEYS[digit[i]]`, dfs(`i+1`), pop.

> *"Given n, generate all well-formed parenthesis strings."*
>
> → **Constrained open/close tree.** Base `len == 2n`. `(` if `open > 0`; `)` if `open > close`; pop both.

---

*You know both trees. Quest 1 revisits phone pad — code it cold. →*
