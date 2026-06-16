<!-- hand-authored -->
# 📝 String Recursion & Generation

> **Day 8** · Choose · Extend · Backtrack · ★★★☆☆ · 15 XP · 15 min read

---

Your mission today: **build strings one character at a time** along a decision tree. Each recursive call **chooses** a next character, **extends** the path, explores deeper, then **undoes** the choice. Parentheses add open/close constraints; phone digits branch into 3–4 letters per digit.

> **Foreshadow:** This is the spine of **backtracking** (Days 11+). Today you generate all valid strings; later you'll prune harder and collect subsets, permutations, and grid paths with the same choose → explore → unchoose rhythm.

---

## Part 1 — Choose and Extend

### 1. What is string generation recursion?

**Choose and extend** — maintain a **path** (current string or list). At each step:

1. **Choose** — append one valid option
2. **Explore** — recurse on the next index / smaller state
3. **Unchoose** — remove the append (pop) so sibling branches see a clean path

Base case: path length equals target (or index reaches end) → record path in results.

### 2. Simple explanation

You're typing on a phone keypad. For `"23"`, at digit `2` you branch into `a`, `b`, or `c`. Each branch continues to digit `3` with `d`, `e`, `f`. The recursion tree **is** the set of outputs.

For parentheses, you don't branch freely — you only append `(` when opens remain, and `)` only when closes can balance opens.

### 3. Visual — parentheses open/close tree (n=2)

```
                        ""  open=2 close=0
                       /
                     "("  open=1 close=0
                    /         \
                 "(("         "()"  ← can add ) when open>close
               open=0         open=0 close=1
                  |              |
               "(())"          "()()"  ← BASE length=4 ✓
               "(()"           (done)
```

Valid branches only:
- Add `(` if `open > 0`
- Add `)` if `open > close` (more opens placed than closes)

### 4. Visual — phone pad branching (`"23"`)

```
index=0 digit='2' → branch a,b,c
  "a" → index=1 digit='3' → ad, ae, af
  "b" → bd, be, bf
  "c" → cd, ce, cf

6 leaves = 3 × 2 choices per digit
```

Each digit fans out to `len(KEYS[digit])` children — **multi-branch** generation.

### 5. The universal template

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

Parentheses: `state = (open, close)`. Phone: `state = index i`.

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **Generate all binary strings, filter valid** | `(2n)` candidates — wastes work on invalid `")("`-style strings |
| **Nested loops per position** | Hard to generalize variable branch count (3 vs 4 letters) |
| **Append without pop** | Sibling branches inherit wrong prefix — wrong answers |
| **BFS without path copy** | Need snapshot of path at base case |

**The insight brute force misses:** **Prune at generation** — never place `)` when `close >= open`. Same tree shape as backtracking later.

### 7. Pattern signals for Day 8

| When the problem says… | Think… |
|---|---|
| "generate all" / "all combinations of" | DFS generation tree |
| "parentheses" / "balanced" | open/close counters, prune invalid `)` |
| "phone keypad" / "letter combinations" | Multi-branch per digit |
| "append and remove" / "backtrack" | Pop after recurse |
| "path length == n" | Base case at target size |

**Keywords:** `choose` · `extend` · `backtrack` · `path` · `open` · `close` · `dfs`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forget `path.pop()` | Unchoose after each explore |
| Add `)` whenever `close < n` | Need `open > close` |
| Store path reference, not copy | `''.join(path)` or `path.toString()` at base |
| Empty digits input | Return `[]` immediately |
| Confuse with Day 6 pow | Generation **branches**; pow **halves** |

### 9. Recognition drill

Read this problem aloud:

> *"Generate all combinations of well-formed parentheses for n pairs."*

Before coding, say:

> *"DFS(open=n, close=0). Base: len==2n. Choose '(' if open>0. Choose ')' if open>close. Pop after each branch."*

---

*You see the generation tree. First quest: parentheses. →*
