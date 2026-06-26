<!-- hand-authored -->
# 📝 Recursion in Math & Counting

> **Day 25** · Recursive Counting · 20 XP · 15 min read

---

Day 7 taught **divide and conquer**: split at `mid`, solve both halves, combine (merge sort, max subarray cross-sum). Day 23 cached **linear index** overlap. Today you count **combinatorial structures** by trusting smaller sub-counts:

1. **Unique BSTs (#96)** — Catalan recurrence: pick root `i`, multiply left and right subtree counts
2. **Different Ways to Add Parentheses (#241)** — split at each operator, combine all left × right results (Day 7 split/combine on expressions)

Your mission: see **multiply-and-sum** counting before you touch code.

---

## Part 1 — Learn the Pattern

### 1. Recursive counting vs optimization

| Day 23 Top-Down DP | Day 25 Recursive Counting |
|---|---|
| `rob(i)` — max | `G(n)` — how many structures |
| `decode(i)` — sum paths | Split-and-combine products |
| State often linear index | State often **size** or **substring range** |
| Memo on overlap | Memo on `(n)` or `(lo, hi)` |

Both use: base case → recurse on smaller pieces → combine results.

### 2. Catalan BST count — `G(n)`

**Question:** How many structurally unique BSTs store values `1..n`?

**Key insight:** Pick root value `i`. Left subtree uses values `1..i-1` (count `G(i-1)`). Right subtree uses `i+1..n` (count `G(n-i)`). Root choice **independent** — multiply counts.

```
G(n) = sum over i=1..n of  G(i-1) * G(n-i)

Base: G(0) = G(1) = 1
```

**Visual — n = 3, root = 2:**

```
      2              G(1) * G(1) = 1
     / \
    1   3

Root=1:  G(0)*G(2) = 1*2 = 2
Root=2:  G(1)*G(1) = 1*1 = 1
Root=3:  G(0)*G(2) = 1*2 = 2
Total G(3) = 2+1+2 = 5
```

**Five distinct BST shapes for [1,2,3]:**

```
  1      1      2      3      3
   \      \    / \    /      /
    3      2   1   3  2      1
    ... (five unique structures)
```

**Memo:** `memo[n]` stores `G(n)`. Each `n` computed once → O(n²) total (inner loop over roots).

This is the **Catalan number** family — same recurrence as valid parentheses, mountain ranges, and many partition counts.

### 3. Link to Day 7 — divide at every operator

Day 7 split data at **midpoint** for sort/subarray. **Add Parentheses (#241)** splits at **every operator** in an expression:

```
"2-1-1"  with operators at indices 1 and 3:

Split at first '-':
  left ways  = diffWays("2")     → [2]
  right ways = diffWays("1-1")   → [0, 2]  (0 from 1-1, 2 from (1-1) if only one op...)
  combine: 2-0=2, 2-2=0 → [2, 0]

Split at second '-':
  left  = diffWays("2-1")  → [1, 0]
  right = diffWays("1")    → [1]
  combine: 1-1=0, 0-1=-1 → [0, -1]

Answer: [2, 0, 0, -1] (dedupe/sort per problem)
```

**Template:**

```
diffWays(expr):
    if no operator in expr: return [integer value]
    for each operator at index i:
        for each a in diffWays(left part):
            for each b in diffWays(right part):
                results.add(a op b)
    return results
```

**Day 7 parallel:**

| Merge Sort (Day 7) | Add Parentheses (Day 25) |
|---|---|
| Split at `mid` once | Split at **each** operator |
| Conquer left + right halves | Recurse on substring left/right |
| Combine via merge | Combine via `+`, `-`, `*` on result lists |
| One split point per call | Loop all split points |
| Returns sorted array | Returns list of eval results |

Both are **divide and conquer** — the difference is *where* you cut and *how* you merge.

### 4. Why multiply in Catalan but nested-loop in parentheses?

**Catalan (BST):** Choosing root `i` **fixes** left size `i-1` and right size `n-i`. One pair of subcounts per root — multiply and add over roots.

**Parentheses:** Each split produces **lists** of possible values from each half. Every left value pairs with every right value — Cartesian product (nested loops).

```
G(n):     sum_i  G(left_i) * G(right_i)        // scalars
Paren:    for op: for a in L: for b in R: a op b  // lists
```

### 5. Base cases

| Problem | Base case |
|---|---|
| Unique BSTs | `n <= 1 → 1` (empty tree or single node) |
| Add Parentheses | No operator in string → `[stoi(expr)]` |

Getting bases wrong propagates through every combine step.

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **Generate all BST insert orders, dedupe** | O(n!) — Catalan memo is O(n²) |
| **Enumerate all parenthesis insertions on full string** | Misses operator-split structure |
| **Add Parentheses: eval left-to-right only** | Must try every split precedence |
| **Catalan: hardcode sequence 1,1,2,5,14...** | Works for one n, not general/recurring |
| **No memo on repeated sub-expressions** | `"1-1"` recomputed from multiple parents |

### 7. Pattern signals

| When the problem says… | Think… |
|---|---|
| "unique BSTs" / "structurally distinct trees" | Catalan `G(n)` root loop |
| "how many ways" + recursive split on size | Multiply subcounts, sum over split point |
| "different ways to add parentheses" / eval all groupings | D&C on operators, Cartesian combine |
| "split at each operator" | Day 7 combine, multiple split points |
| Small n, counting structures | Memo on size or substring |

**Keywords:** `Catalan` · `G(n)` · `root loop` · `split operator` · `Cartesian combine` · `divide and conquer`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Catalan: `G(n) = G(n-1) + G(n-2)` (Fibonacci) | Wrong recurrence — need root loop product |
| Catalan: forget `G(0) = 1` | Empty subtree is one shape |
| Parentheses: only split at first operator | Loop **all** `+`, `-`, `*` indices |
| Parentheses: return int instead of list | Base returns `[value]`, combine produces list |
| Parentheses: split includes operator in substring | Left = `[0..i)`, right = `[i+1..n)` |
| Skipping memo on `#96` | Optional but standard — O(n²) vs exponential |

### 9. Recognition drill

Read aloud:

> *"Given n, how many structurally unique BSTs with values 1..n?"*

Before coding, say:

> *"`G(n) = sum_{i=1}^{n} G(i-1)*G(n-i)`. Base n<=1 → 1. Memo on n."*

Read aloud:

> *"Return all possible integer results from adding parentheses to an expression."*

Before coding, say:

> *"For each operator index, recurse left/right substrings, combine all pairs with that operator. Base: no op → [value]."*

---

## Part 2 — What's Next

Today's quests:

1. **Unique Binary Search Trees #96** — Catalan `G(n)` with root loop + memo
2. **Different Ways to Add Parentheses #241** — operator-split D&C (Day 7 cousin)

Compute `G(0)..G(4)` by hand: 1, 1, 2, 5, 14. Then trace `diffWays("2-1-1")` splits on paper.

---

*Count by splitting. First quest: how many BST shapes for 1..n? →*
