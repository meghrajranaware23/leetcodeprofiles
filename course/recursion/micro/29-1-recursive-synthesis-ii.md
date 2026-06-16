<!-- hand-authored -->
# 📝 Recursive Synthesis II

> **Day 29** · Recursive Synthesis II · ★★★★★ · 25 XP · 18 min read

---

Day 23 introduced **memoization on `(index, state)`**. Today you apply that to **two-dimensional string matching** — the hardest recursive case analysis in the entire pack.

Two problems, one skeleton: `dp(i, j)` = *does `s[i..]` match `p[j..]`?*

- **Regular Expression Matching #10** — `.` matches any char; `x*` matches zero or more of `x`
- **Wildcard Matching #44** — `?` matches one char; `*` matches zero or more of **anything**

The difference is subtle. The state machine is not. Read every case before you code.

---

## Part 1 — The `(i, j)` Memo Framework

### 1. State definition

```
dp(i, j) → bool
  i = current index in text s  (0 .. m)
  j = current index in pattern p (0 .. n)

Base: j == n  →  return (i == m)     // pattern consumed ↔ text consumed
```

**Subproblem shrinks:** each recursive call advances `i`, or `j`, or both. Memo on `(i, j)` because the same pair is reached from different `*` branches — without memo, exponential blowup.

### 2. The `(i, j)` memo table — what it stores

For `s = "aa"`, `p = "a*"` (m=2, n=2):

```
        j=0   j=1   j=2
        'a'   '*'   (end)
i=0 'a'  ?     ?     ?
i=1 'a'  ?     ?     ?
i=2(end) ?     ?    T/F
```

Fill bottom-up mentally or top-down with cache. Each cell answers: *"If I'm at text[i] and pattern[j], can the rest match?"*

```
dp(0,0): s="aa", p="a*"  → true (entire "aa" eaten by a*)
dp(2,2): j==n, i==m      → true  (both empty — success)
dp(2,0): j==0, i==2       → false (text left, pattern gone)
```

**Memo table rule:** if `memo[i][j]` already computed, return it. Same `(i,j)` reached when `*` tries 0 chars vs 1 char vs 2 chars — that's why memo is mandatory.

### 3. Case analysis — when `p[j+1] != '*'`

Two subcases only:

```
match = (i < m) && (s[i] == p[j] || p[j] == '.')

if match:
    return dp(i+1, j+1)      // consume one char from both
else:
    return false             // can't match this pattern char
```

**Example:** `s="ab"`, `p="a.b"`, at `(i=0,j=0)`:
- `s[0]='a'`, `p[0]='a'` → match → `dp(1,1)`
- at `(1,1)`: `s[1]='b'`, `p[1]='.'` → match → `dp(2,2)` → base true ✓

**Example:** `s="ac"`, `p="ab"`, at `(0,0)`:
- `'a'=='a'` → `dp(1,1)` → `'c'!='b'` → false ✗

### 4. Case analysis — when `p[j+1] == '*'`  (THE HARD PART)

When pattern has `x*` at positions `j` and `j+1`, **always look at `p[j]` (the char before `*`)**, not `p[j+1]`.

```
match = (i < m) && (s[i] == p[j] || p[j] == '.')

if p[j+1] == '*':
    return dp(i, j+2)                    // Branch A: * matches ZERO x's
        || (match && dp(i+1, j))         // Branch B: * matches ONE OR MORE
```

**Branch diagram for `p[j]=='x'` followed by `*':**

```
                    dp(i, j)   pattern: ... x * ...
                   /          \
                  /            \
         Branch A              Branch B
    skip "x*" entirely      s[i] matches x (or '.')
    dp(i, j+2)              consume s[i], keep pattern at j
                            dp(i+1, j)
                            (star still active — can eat more)
```

**Why `dp(i+1, j)` not `dp(i+1, j+2)`?** The `*` can match multiple `x`'s. After eating one `s[i]`, the pattern stays at `j` (the `x` before `*`) so the star can fire again.

**Branch A — zero matches:**

`"aab"`, `p="c*a*b"` at `(i=0,j=0)`: `p[0]='c'`, `p[1]='*'` → try `dp(0,2)` — skip `c*` entirely. Text still at `'a'`, pattern now at `'a'`.

**Branch B — one or more:**

`"aaa"`, `p="a*"` at `(i=0,j=0)`: match `'a'=='a'` → `dp(1,0)` → match → `dp(2,0)` → match → `dp(3,0)` → `j==n, i==3` → true.

**Branch B then A:**

`"ab"`, `p="a*b"` at `(0,0)`: eat `'a'` → `dp(1,0)` → `'b' matches, eat → `dp(2,0)` → at `(2,0)` pattern `a*` — Branch A: `dp(2,2)` → `j==n, i==m` → true.

### 5. Full case matrix (Regex #10)

| Condition | Action |
|---|---|
| `j == n` | return `i == m` |
| `(i,j)` in memo | return cached |
| `p[j+1] == '*'` | `dp(i,j+2) \|\| (match && dp(i+1,j))` |
| else, match | `dp(i+1,j+1)` |
| else | `false` |

where `match = i < m && (s[i]==p[j] || p[j]=='.')`

### 6. Wildcard #44 — same skeleton, different `*`

| | Regex #10 | Wildcard #44 |
|---|---|---|
| `.` / `?` | `.` = any one char | `?` = any one char |
| `*` meaning | zero or more of **preceding** char | zero or more of **any** chars |
| `*` check | look at `p[j+1]=='*'`, act on `p[j]` | look at `p[j]=='*'` directly |
| zero-match branch | `dp(i, j+2)` skip `x*` | `dp(i, j+1)` skip `*` |
| one+-match branch | `match && dp(i+1, j)` | `i < m && dp(i+1, j)` |

**Wildcard `*` branch diagram:**

```
                dp(i, j)   pattern[j] == '*'
               /          \
              /            \
     dp(i, j+1)          dp(i+1, j)
   * matches 0 chars    * eats s[i] (any char)
                         pattern stays at j
```

No `match` guard on the consume branch — `*` matches anything.

**Example:** `s="adceb"`, `p="*a*b"`:
- Start `(0,0)`: `p[0]='*'` → try zero: `dp(0,1)` with pattern `"a*b"` ...
- Eventually `*` at front eats zero, `'a'` matches `'a'`, `*` eats `"dce"`, `'b'` matches `'b'` ✓

### 7. Why brute force fails

| Approach | Problem |
|---|---|
| Nested loops over all substrings | Doesn't handle `*` repetition |
| Recursion without memo | Same `(i,j)` recomputed exponentially |
| Treat regex `*` like wildcard `*` | Wrong branch — regex star binds to **previous** char |
| `dp(i+1, j+2)` after one `*` match | Star can match more — stay at `j` |

### 8. Common mistakes

| Mistake | Fix |
|---|---|
| Check `p[j]=='*'` in regex #10 | Check `p[j+1]=='*'`, operate on `p[j]` |
| Forget zero-match branch | Always `dp(i, j+2)` or `dp(i, j+1)` first |
| No memo | `(i,j)` table mandatory |
| Base case `j==n` returns true always | Must also have `i==m` |

### 9. Recognition drill

> *"Does text match pattern with `.` and `x*`?"*
>
> → **`dp(i,j)` memo. If `p[j+1]=='*'`: skip or consume loop. Else: char match → both advance.**

> *"Does text match pattern with `?` and `*`?"*
>
> → **Same memo. If `p[j]=='*'`: `dp(i,j+1)` or `dp(i+1,j)`. Else: `?` or equal → `dp(i+1,j+1)`.**

---

*This is the hardest case analysis in the pack. Quest 1 is Regex #10 — trace every branch on paper first. →*
