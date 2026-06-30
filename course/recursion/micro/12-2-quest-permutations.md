<!-- hand-authored -->
# ⚔ Quest: Permutations

> **Day 12** · [Permutations #46](https://leetcode.com/problems/permutations/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Permutations on LeetCode](https://leetcode.com/problems/permutations/)**

> ⚔ **Hunter's rule:** Draw the `used[]` tree for `[1,2,3]`. Contrast with yesterday's start-index tree — why does `[2,1,3]` appear here but not in subsets?

---

## The Problem

Given an array `nums` of **distinct** integers, return all possible permutations.

```
Input:  nums = [1, 2, 3]
Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]

Input:  nums = [0, 1]
Output: [[0,1], [1,0]]

Input:  nums = [1]
Output: [[1]]
```

---

## 💡 Hints

**Hint 1:** Day 11 used a **start index** (forward-only). Permutations need a **`used[]` boolean array** — at each level, try every index not yet used.

**Hint 2:** Base case: `path.size() == nums.size()` → record and return. Unlike subsets, don't record partial paths.

**Hint 3:** Undo **two** things after each dfs: `path.pop()` **and** `used[i] = false`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Used-Array Permutation Backtracking

| Clue | Signal |
|---|---|
| "all permutations" | Full-length paths, all orderings |
| distinct elements | No dedup needed |
| uses every element exactly once | `used[]` tracks what's left |

**Contrast with Day 11:**

| Subsets (#78) | Permutations (#46) |
|---|---|
| start index, forward picks | loop all `i`, skip if `used[i]` |
| record at every node | record at leaves only |
| `[1,2]` but not `[2,1]` as separate from start-2 branch | both `[1,2]` and `[2,1]` appear |

**How a strong solver thinks before coding:**
1. *"Order matters → used[], not start index."*
2. *"Leaf when path full → 3! = 6 permutations for n=3."*
3. *"push/dfs/pop + unmark used — twin undo."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Start-index loop (Day 11)** | Never generates `[2,1,3]` — treats combinations as permutations |
| **Record at every node** | Outputs `[1]`, `[1,2]` — partial paths aren't permutations |
| **Forget to reset used[i]** | Same element used twice in one path |
| **Heap's algorithm without understanding** | Correct but interviewers expect backtracking trace |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Letter Combinations of a Phone Number #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Branching per digit — same backtracking |
| [Next Permutation #31](https://leetcode.com/problems/next-permutation/) | Single next, not all — different algo |
| [Beautiful Arrangement #526](https://leetcode.com/problems/beautiful-arrangement/) | Add divisibility constraint in loop |

---

## 📖 Walkthrough

`nums = [1, 2, 3]`:

```
dfs([], used=[F,F,F])
  pick 1: dfs([1], [T,F,F])
    pick 2: dfs([1,2], [T,T,F])
      pick 3: [1,2,3] → record ✓
    pick 3: dfs([1,3], [T,F,T])
      pick 2: [1,3,2] → record ✓
  pick 2: dfs([2], [F,T,F])
    pick 1: [2,1,3] → record ✓
    ...
  pick 3: ... → [3,2,1] ✓

6 leaves recorded
```

> 💡 **The insight:** Same push/pop rhythm as Day 11. The loop bounds changed from `j >= start` to `all i where !used[i]`.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
        if (path.size() == nums.size()) { res.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true; path.push_back(nums[i]);
            dfs(nums, path, used, res);
            path.pop_back(); used[i] = false;
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size());
        dfs(nums, path, used, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        def dfs(path, used):
            if len(path) == len(nums):
                res.append(list(path)); return
            for i, x in enumerate(nums):
                if used[i]: continue
                used[i] = True; path.append(x)
                dfs(path, used)
                path.pop(); used[i] = False
        dfs([], [False] * len(nums))
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    private void dfs(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> res) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true; path.add(nums[i]);
            dfs(nums, path, used, res);
            path.remove(path.size() - 1); used[i] = false;
        }
    }
}
```

**Complexity:** O(n · n!) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Order matters"** → `used[]`, not start index.
- **Twin undo** → pop path AND unmark used.
- **Leaves only** → partial paths aren't valid permutations.
- **Same push/pop skeleton** → Day 11 muscle memory still applies.

> 🎯 **Pattern Unlocked:** Used-Array Permutations

---

*One quest down. Next: duplicates return with a new skip rule. →*
