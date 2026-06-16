<!-- hand-authored -->
# 📝 The Backtracking Template

> **Day 11** · The Backtracking Template · ★★★☆☆ · 20 XP · 15 min read

---

Welcome to C-Rank. Days 1–10 taught you **linear recursion** — shrink the input, trust the sub-call, combine the result. Today you learn a different skeleton: **backtracking**, where you build a partial answer in a shared `path`, explore every valid branch, then **undo** each choice so sibling branches start clean.

This is not the generic `solve(smaller) → combine` pattern. Backtracking is a **decision tree walk** with explicit push/pop.

---

## Part 1 — Learn the Pattern

### 1. What is backtracking?

Backtracking generates all valid configurations by trying choices one at a time:

```
CHOOSE  → push choice onto path
EXPLORE → recurse deeper
UNCHOOSE → pop choice off path (backtrack)
```

The skeleton is always the same:

```
def dfs(state):
    record or check path                    // often at every node
    for each valid choice:
        path.push(choice)                   // CHOOSE
        dfs(next_state)                     // EXPLORE
        path.pop()                          // UNCHOOSE
```

**Critical distinction from linear recursion:** you mutate shared state (`path`), then **must undo** before trying the next sibling. Forgetting `path.pop()` is the #1 backtracking bug.

### 2. Subsets — the canonical template

Subsets (#78) is the cleanest introduction. At each index you **include** the element or **exclude** it — but the loop version is even simpler: try every element as the next pick, always moving forward.

```
nums = [1, 2, 3]

                    []
           /        |        \
         [1]       [2]       [3]
        / | \       | \        |
    [1,2][1,3][1] [2,3][2]   [3]
     ...  ... ...  ...  ...   []

Every node records its current path → 8 subsets total
```

Trace for `dfs([], start=0)`:

```
path=[]           → record []
pick 1: path=[1]  → record [1]
  pick 2: [1,2]   → record [1,2]
    pick 3: [1,2,3] → record [1,2,3]
    pop → [1,2]
  pop → [1]
  pick 3: [1,3]   → record [1,3]
  ...
```

Each `push` pairs with exactly one `pop`. The call stack depth equals `path.length()`.

### 3. Cross-rank bridge — linear recursion vs backtracking

| Linear recursion (Days 1–10) | Backtracking (Day 11+) |
|---|---|
| Return value bubbles up | Choices accumulate in `path` |
| One recursive call (usually) | Loop over choices at each node |
| Input shrinks automatically | You manage `path` + index/state |
| No undo needed | **Must pop after explore** |

Example contrast:

```
factorial(n):  return n * factorial(n-1)     // no shared mutable state
subsets:       path.push(x); dfs(...); path.pop()  // shared path, must undo
```

### 4. The push/pop skeleton (memorize this)

```cpp
void dfs(vector<int>& nums, int start, vector<int>& path, vector<vector<int>>& res) {
    res.push_back(path);                          // record current state
    for (int j = start; j < nums.size(); j++) {
        path.push_back(nums[j]);                  // CHOOSE
        dfs(nums, j + 1, path, res);              // EXPLORE (only forward picks)
        path.pop_back();                          // UNCHOOSE
    }
}
```

Three lines that repeat forever: **push → dfs → pop**. Every backtracking problem in C-Rank is a variation on this loop.

### 5. Dedup — sort + skip same at the same level

Subsets II (#90) has duplicates. Without dedup, `[1,2,2]` produces `[2]` twice — once from the first `2`, once from the second.

**The rule:** sort the array, then at loop index `j`:

```
if (j > start && nums[j] == nums[j-1]) continue;
```

Why `j > start` and not `j > 0`? You only skip duplicates **among siblings at the same tree level**. The first occurrence at each level is still valid; repeating the same value at the same level creates identical subtrees.

```
sorted [1, 2, 2]

At start=0: pick index 0 (1), index 1 (2), skip index 2 (second 2 — sibling of index 1)
At start=2: only index 2 remains — valid pick
```

This **sort + skip-same** trick appears again on Day 12 (permutations), Day 15 (combination sum variants), and the C-Rank test. Learn it once here.

### 6. What problem does this pattern solve?

- **All subsets** — include/exclude or start-index loop (#78)
- **All subsets with duplicates** — add sort + skip (#90)
- **All combinations** — start index + fixed count (Day 13)
- **All permutations** — `used[]` instead of start index (Day 12)

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Nested loops for every subset size | Hard to generalize; misses the tree structure |
| Generate all bitmasks, filter invalid | Works for subsets only — doesn't extend to constraints |
| Copy `path` on every branch instead of push/pop | O(n) copy per node — correct but wasteful; push/pop is the standard |
| Forget to pop after dfs | Duplicate elements leak into sibling branches |

### 8. Pattern signals & recognition clues

| When the problem says… | Think backtracking with… |
|---|---|
| "all subsets" / "power set" | Start-index loop, record at every node |
| "duplicates" / "unique subsets" | Sort + `j > start && nums[j]==nums[j-1]` |
| "include or exclude each element" | Decision tree — push/pop |
| "generate all" + no reuse constraint | Forward-only start index |

**Keywords:** `subsets` · `all combinations` · `generate` · `backtrack` · `push pop`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using return-value recursion skeleton | Backtracking uses shared `path` + push/pop |
| Recording only at leaf nodes (subsets) | Subsets records **every** node — empty subset matters |
| `j > 0` instead of `j > start` for dedup | Skip same value only among siblings, not across levels |
| No sort before dedup skip | Duplicates must be adjacent after sorting |
| Missing `path.pop()` | Always undo after `dfs` returns |

### 10. Recognition drill

Read this problem aloud:

> *"Given an integer array `nums` of unique elements, return all possible subsets."*

Before coding, say:

> *"Subset backtracking — push/pop skeleton. Record path at every node. Loop from `start`, recurse with `j+1`, pop after explore."*

Read this variant:

> *"Given an array that may contain duplicates, return all unique subsets."*

Before coding, say:

> *"Same skeleton + sort first. Skip `j` when `j > start && nums[j] == nums[j-1]`."*

---

## Part 2 — What's Next

Today's quests apply the push/pop template directly:

1. **Subsets #78** — pure start-index backtracking
2. **Subsets II #90** — same skeleton + dedup

Draw the tree before you code. If you can trace push/pop on paper, the implementation is ten lines.

---

*You understand choose / explore / unchoose. First quest: generate every subset. →*
