<!-- hand-authored -->
# 📝 Expression Generation

> **Day 20** · Expression Generation · ★★★★☆ · 25 XP · 15 min read

---

Day 14 cut strings into **segments** (palindromes, IP octets). Today you cut digit strings into **numbers** and insert **operators** between them — or validate that a string follows an **additive sequence**.

The skeleton is still backtracking on a string index. What changes is the **state you carry**: running totals, a multiply undo trick, or a pair of seed numbers that define the next required term.

---

## Part 1 — Learn the Pattern

### 1. String-building backtracking skeleton

Day 14 pushed segments onto a `path`. Expression problems build a **`path` string** (or track numeric state) while trying **cut lengths** from index `i`:

```
dfs(num, i, ...state..., path):
    if i == len(num):
        check success condition
        return
    for j from i to n-1:              // try every next number num[i..j]
        if leading zero rule violated: break
        val = parse(num[i..j])
        branch on operator / rule
        dfs(num, j+1, updated_state, updated_path)
```

**No push/pop on a vector** — the path is a string appended with `+`, `-`, `*`, or extended by the next valid number. State travels in parameters (`curr`, `prev`, `a`, `b`).

### 2. Expression Add Operators (#282) — the setup

**Problem:** Insert `+`, `-`, or `*` between digits of `"123"` so the expression equals `target`. Return all valid expressions.

```
num = "123", target = 6

Valid: "1+2+3" = 6
       "1*2*3" = 6
Invalid: "12+3" = 15, "1+23" = 24
```

At each step you choose:
1. **How many digits** form the next number (`1`, `12`, `123`…)
2. **Which operator** precedes it (`+`, `-`, `*` — except the first number has no operator)

### 3. The multiply carry trick

`+` and `-` are easy: `curr = curr + val` or `curr = curr - val`.

`*` is the trap. It binds tighter than the last operation:

```
path so far: "1+2"   curr = 3
Next: *3

Wrong: curr = 3 * 3 = 9        ← treats * like left-to-right
Right: curr = 1 + 2*3 = 7       ← undo last term, apply *

Formula: curr = curr - prev + prev * val
          prev = prev * val      ← for next * undo
```

Trace `"1+2*3"` with target 7:

```
First number: val=1, curr=1, prev=1, path="1"
  +2: curr=3, prev=2, path="1+2"
    *3: curr = 3 - 2 + 2*3 = 7, prev = 6, path="1+2*3"
        i==3, curr==7 ✓
```

**Why `prev`?** It stores the **last operand** so `*` can replace `...+ prev` with `...+ prev*val` without reparsing the string.

### 4. Inline walkthrough — num = "123", target = 6

```
dfs(i=0, curr=0, prev=0, path="")
  j=0: val=1 (first num) → dfs(i=1, curr=1, prev=1, "1")
    j=1: val=2
      +: dfs(2, 3, 2, "1+2")
        j=2: val=3 → +(3): curr=6 ✓ → record "1+2+3"
        *3: curr=1+2*3=7 ✗
      -: dfs(2, -1, -2, "1-2") ...
      *: dfs(2, 2, 2, "1*2")
        j=2: val=3 → +(3): curr=5 ✗
                      *3: curr=1*2*3=6 ✓ → record "1*2*3"
    j=2: val=23 → "1+23"=24, "1-23"=-22, "1*23"=23 ✗
  j=1: val=12 → "12+3"=15 ✗
  j=2: val=123 → too big ✗
```

Two answers: `"1+2+3"` and `"1*2*3"`.

### 5. Leading zero rule

If `num[i] == '0'` and you take more than one digit (`j > i`), **break** the loop — `"05"` is not a valid number.

```
num = "105", cannot use "05" as a term
Only valid cut from i=1: "0" alone, then continue from i=2
```

Same rule as Restore IP (Day 14) and Additive Number below.

### 6. Additive Number (#306) — first-two-seed validation

**Problem:** Is `num` an additive number? An additive sequence: each term after the first two equals the sum of the two before it.

```
"112358" → 1, 1, 2, 3, 5, 8   (Fibonacci-style) → true
"199100199" → 1, 99, 100, 199 → true
"102" → false
```

**Two-phase structure:**

**Phase 1 — seed the first two numbers** (double loop, not dfs):
```
for i in 1..n-1:           // end of first number
    for j in i+1..n-1:     // end of second number
        a = num[0..i-1]
        b = num[i..j-1]
        if leading zeros invalid: skip
        if dfs(j, a, b): return true
```

**Phase 2 — dfs validates the rest:**
```
dfs(i, a, b):
    if i == n: return true
    next must equal a + b as a string prefix of num[i..]
    if num[i..] starts with str(a+b):
        dfs(i + len(str(a+b)), b, a+b)   // shift window: (a,b) → (b, a+b)
    else: return false
```

Trace `"112358"`:

```
Seed a=1, b=1 → dfs from i=1
  need "2" at i=1 ✓ → dfs(2, 1, 2)
    need "3" at i=2 ✓ → dfs(3, 2, 3)
      need "5" at i=3 ✓ → dfs(4, 3, 5)
        need "8" at i=4 ✓ → dfs(5, 5, 8) → i==n ✓
```

### 7. Contrast: operator insertion vs additive validation

| | Expression Add Operators (#282) | Additive Number (#306) |
|---|---|---|
| **Goal** | Generate all expressions == target | Boolean: valid additive sequence? |
| **Choices** | +, -, * between parsed numbers | Next term fixed as a+b |
| **State** | `curr`, `prev`, `path` string | `a`, `b` (last two terms) |
| **First step** | First number seeds curr/prev | Double loop seeds first two |
| **Output** | List of strings | true/false |

Both iterate **cut lengths** from index `i`. Both reject leading zeros. Both use dfs on the remaining suffix.

### 8. Why brute force fails

| Brute force | Problem |
|---|---|
| Generate all operator placements, eval each | Works but misses the * carry trick — messy eval |
| Left-to-right eval for `*` | Wrong — `1+2*3` must be 7, not 9 |
| Reparse entire expression each step | Slow; `curr`/`prev` incremental eval is O(1) per branch |
| Single loop for additive seeds | First two numbers have no prior sum to guide cut |
| Allow `"01"` as a term | Leading zero violates spec — breaks early with `break` |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "insert operators" / "add operators" | Cut + `+`/`-`/`*`, carry `prev` for `*` |
| "expression equals target" | Track `curr`, record when `i==n && curr==target` |
| "additive number" / "sum of previous two" | Seed first two, dfs checks `startswith(a+b)` |
| digit string + generate all | Index `i`, inner loop `j` for cut length |
| leading zeros forbidden | `j > i && num[i]=='0'` → break |

**Keywords:** `add operators` · `expression` · `target` · `additive` · `digit string` · `multiply`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `curr = curr * val` for multiply | Use `curr - prev + prev * val` |
| Forgetting to update `prev` on `*` | `prev = prev * val` |
| `continue` instead of `break` on leading zero | All longer cuts also invalid |
| Evaluating with a stack/postfix | Incremental curr/prev is simpler |
| One loop for additive first two terms | Outer double loop seeds `(a, b)` |
| `int` overflow on long expressions | Use `long` / `long long` |

### 11. Recognition drill

Read this aloud:

> *"Given a string of digits, insert +, -, or * to reach a target. Return all expressions."*

Before coding, say:

> *"Cut loop from i. First number sets curr/prev. Then three branches: +, -, * with carry undo on multiply. Record when i==n && curr==target."*

Read this variant:

> *"Determine if a string is an additive number."*

Before coding, say:

> *"Double loop for first two numbers. dfs checks suffix starts with a+b, slide window to (b, a+b). Leading zero break."*

---

## Part 2 — What's Next

Today's quests:

1. **Expression Add Operators #282** — operator insertion + multiply carry
2. **Additive Number #306** — first-two-seed + sequence validation

Trace `"123"` → target 6 on paper with curr/prev columns before coding.

---

*Cut digits, carry state, build strings. First quest: make `"123"` equal six. →*
