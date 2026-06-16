<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 1

> [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Combination Sum II on LeetCode](https://leetcode.com/problems/combination-sum-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Name the pattern before you code. No peeking until you've genuinely tried.

---

## The Problem

Given a collection of candidate numbers and a target, find all unique combinations where the candidate numbers sum to target. **Each number in the candidate set may only be used once.** The solution set must not contain duplicate combinations.

```
Input:  candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

Input:  candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2], [5]]
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 13 Combination Sum structure + Day 11/15 dedup — **not** unlimited reuse.

**Hint 1:** This is **not** Combination Sum (#39). After including `candidates[i]`, recurse with **`i + 1`** — each candidate used at most once.

**Hint 2:** **Sort** the array first. Duplicate combinations come from duplicate values at the same decision level — same fix as Subsets II (Day 11).

**Hint 3:** Two-branch structure at each index:
- **Include:** `path.push(c[i])` → `dfs(i+1, rem-c[i])` → `path.pop()`
- **Exclude duplicates, then skip:** `while (i+1 < n && c[i+1]==c[i]) i++` → `dfs(i+1, rem)`

**Hint 4:** Record when `rem == 0`. Prune when `rem < 0` or `i == n`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Single-Use Combination Sum + Sort-and-Skip Dedup (Days 13 + 15)

| Clue in the problem | What it signals |
|---|---|
| "sum to target" | Combination sum family — include/exclude branches |
| "each number used once" | Include branch uses **`i+1`**, not `i` (contrast #39) |
| "may contain duplicates" / "unique combinations" | Sort + while-skip between exclude branches |
| "order doesn't matter" | Start-index — `[1,2,5]` not `[2,1,5]` |

**How a strong solver thinks before coding:**
1. *"Combination Sum II — I've seen this on Day 15."*
2. *"Sort first. Include → i+1. while-skip dupes before exclude."*
3. *"Record at rem==0. Push/pop only on include branch."*
4. *"Trace [1,1,2,5,6,7,10] target 8 — verify [1,1,6] appears once."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Combination Sum #39 template (include stays at i)** | Reuses candidates — wrong problem |
| **Generate all combos, dedup with set** | Works but shows you didn't internalize branch pruning |
| **Subsets II skip inside a single for-loop only** | Include/exclude two-call structure needs while-skip between branches |
| **No sort before dedup** | Adjacent duplicate check never fires |

**The insight brute force misses:** Single-use + duplicates = Day 13 index rules + Day 11 dedup philosophy. Same push/pop skeleton you've drilled for six days.

---

## 🎯 Transfer to Unseen Problems

Can you spot this variant without the title "Combination Sum II"?

**Scenario:** *"Given coin denominations (with repeats in the list) and an amount, list every unique multiset of coins summing to amount, using each listed coin at most once."*

Same pattern — sort, include with i+1, while-skip on exclude.

**30-second check:** Say aloud: *"Single-use combo sum. Sort. Include dfs(i+1). while-skip. rem==0 record."* If that sentence flows, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    void dfs(vector<int>& c, int i, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (rem == 0) { res.push_back(path); return; }
        if (i == (int)c.size() || rem < 0) return;
        path.push_back(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.pop_back();
        while (i + 1 < (int)c.size() && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> path;
        dfs(candidates, 0, target, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def dfs(i, rem, path):
            if rem == 0: res.append(list(path)); return
            if i == len(candidates) or rem < 0: return
            path.append(candidates[i])
            dfs(i + 1, rem - candidates[i], path)
            path.pop()
            while i + 1 < len(candidates) and candidates[i + 1] == candidates[i]: i += 1
            dfs(i + 1, rem, path)
        dfs(0, target, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int i, int rem, List<Integer> path, List<List<Integer>> res) {
        if (rem == 0) { res.add(new ArrayList<>(path)); return; }
        if (i == c.length || rem < 0) return;
        path.add(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.remove(path.size() - 1);
        while (i + 1 < c.length && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
}
```

**Complexity:** O(2^n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Each number once"** → Include branch is `i+1`, not `i` — the #39 difference.
- **"Unique combinations" + duplicate candidates** → Day 11 sort + while-skip.
- **"Combination sum"** → Two branches per index, record at `rem==0`.
- **Push/pop on include only** → Exclude branch needs no path mutation.

This is the capstone of the combination-sum arc from Day 13. If you named the pattern in under 30 seconds, C-Rank backtracking is solid.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<int>& c, int i, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (rem == 0) { res.push_back(path); return; }
        if (i == (int)c.size() || rem < 0) return;
        path.push_back(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.pop_back();
        while (i + 1 < (int)c.size() && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> path;
        dfs(candidates, 0, target, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def dfs(i, rem, path):
            if rem == 0: res.append(list(path)); return
            if i == len(candidates) or rem < 0: return
            path.append(candidates[i])
            dfs(i + 1, rem - candidates[i], path)
            path.pop()
            while i + 1 < len(candidates) and candidates[i + 1] == candidates[i]: i += 1
            dfs(i + 1, rem, path)
        dfs(0, target, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int i, int rem, List<Integer> path, List<List<Integer>> res) {
        if (rem == 0) { res.add(new ArrayList<>(path)); return; }
        if (i == c.length || rem < 0) return;
        path.add(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.remove(path.size() - 1);
        while (i + 1 < c.length && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
}
```

**Complexity:** O(2^n) time · O(n) space
