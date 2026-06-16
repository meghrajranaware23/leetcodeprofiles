<!-- hand-authored -->
# 📝 Permutation Generation

> **Day 12** · Permutations · ★★★☆☆ · 20 XP · 15 min read

---

Yesterday you walked a **start-index tree** — each element picked at most once, only forward. Today **order matters**: `[1,2]` and `[2,1]` are different answers. That changes the decision model completely.

Permutations use a **`used[]` tree**: at each level, pick **any unused** element, not just indices after `start`.

---

## Part 1 — Learn the Pattern

### 1. Include/exclude vs pick-unused

| Day 11 — Subsets / Combinations | Day 12 — Permutations |
|---|---|
| **Start index** — only pick forward | **`used[]`** — pick any unused slot |
| `[2,1]` never appears | `[2,1]` and `[1,2]` both appear |
| Record at many nodes | Record only when `path.size() == n` |
| Combination: order doesn't matter | Permutation: order is the point |

Day 11 asks *"which elements are in the set?"* Day 12 asks *"in what order?"*

### 2. The used[] tree

```
nums = [1, 2, 3]

Level 0 (pick 1st):  choices = {1, 2, 3}
Level 1 (pick 2nd):  choices = remaining unused
Level 2 (pick 3rd):  only one left → leaf

                []
         /       |       \
       [1]       [2]       [3]
      /   \     /   \       |
   [1,2] [1,3][2,1][2,3]  [3,1]
     |     |    |     |      ...
  [1,2,3] ...  ...  ...   [3,1,2]
                           [3,2,1]

6 leaves = 3! permutations
```

At each level, loop **all indices** `i`, skip if `used[i]`.

### 3. The push/pop skeleton (permutation version)

```cpp
void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
    if (path.size() == nums.size()) { res.push_back(path); return; }  // leaf only
    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;
        used[i] = true;
        path.push_back(nums[i]);          // CHOOSE
        dfs(nums, path, used, res);       // EXPLORE
        path.pop_back();                  // UNCHOOSE
        used[i] = false;                  // UNCHOOSE (both path AND used!)
    }
}
```

**Two undo steps:** pop the path **and** unmark `used[i]`. Both must revert before the next sibling.

### 4. Dedup — Permutations II (#47)

When `nums` has duplicates, the `used[]` tree generates duplicate permutations unless you prune.

**Sort first.** Skip index `i` when:
```
i > 0 && nums[i] == nums[i-1] && !used[i-1]
```

**Why `!used[i-1]`?** Among siblings at the same level, if the previous identical value wasn't used, using this one repeats a subtree already explored at the same depth.

Contrast with Day 11 dedup:

| Context | Skip condition | Meaning |
|---|---|---|
| Subsets II (Day 11) | `j > start && nums[j]==nums[j-1]` | Skip duplicate **index** at same level |
| Permutations II (Day 12) | `i>0 && nums[i]==nums[i-1] && !used[i-1]` | Skip if duplicate **and** earlier copy unused at this level |

Same philosophy — **sort + skip duplicate siblings** — different guard because permutations track `used[]` instead of `start`.

### 5. Visual trace — nums = [1, 2, 3]

```
dfs(path=[], used=[F,F,F])
  i=0: used[0]=T, path=[1]
    i=1: used[1]=T, path=[1,2]
      i=2: path=[1,2,3] → record ✓
      pop, used[2]=F
    pop, used[1]=F
    i=2: path=[1,3] → ... → [1,3,2] ✓
  pop, used[0]=F
  i=1: ... produces [2,1,3], [2,3,1]
  i=2: ... produces [3,1,2], [3,2,1]
```

### 6. What problem does this pattern solve?

- **All permutations** — unique elements (#46)
- **Unique permutations** — with duplicates (#47)
- **Next permutation** — different technique (Day 26+); today's focus is generate-all
- **Arrangement problems** — assign n items to n slots with constraints

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| `next_permutation` in a loop | Works for listing, but interview expects backtracking |
| Start-index loop (Day 11 style) | Misses `[2,1]` — wrong pattern entirely |
| Forgetting to reset `used[i]` | Element appears twice in one path |
| No dedup on Permutations II | Duplicate permutations in output |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "all permutations" / "all arrangements" | `used[]` + push/pop |
| "order matters" / "rearrange" | Not start-index — pick any unused |
| "unique permutations" + duplicates | Sort + `!used[i-1]` skip |
| "fixed length path using all elements" | Base case: `path.size() == n` |

**Keywords:** `permutation` · `arrangement` · `used array` · `all orders`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using start index from Day 11 | Permutations need `used[]` |
| Only popping path, not unmarking used | Undo both mutations |
| Recording at every node | Permutations record at leaves only |
| Subsets dedup rule on permutations | Use `!used[i-1]` variant |

### 10. Recognition drill

> *"Return all permutations of distinct integers."*

Say: *"`used[]` tree. Loop all i, skip used. push → dfs → pop + unmark. Record when path full."*

> *"Return all **unique** permutations when nums has duplicates."*

Say: *"Same + sort + skip when `nums[i]==nums[i-1] && !used[i-1]`."*

---

## Part 2 — What's Next

1. **Permutations #46** — pure `used[]` backtracking
2. **Permutations II #47** — add Day 11-style dedup adapted for `used[]`

The push/pop rhythm is identical to Day 11. Only the **choice set** changed: any unused, not forward-only.

---

*You see the contrast: subsets pick forward, permutations pick unused. First quest →*
