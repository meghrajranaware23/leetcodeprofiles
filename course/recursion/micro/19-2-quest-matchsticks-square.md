<!-- hand-authored -->
# ⚔ Quest: Matchsticks to Square

> **Day 19** · [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Matchsticks to Square on LeetCode](https://leetcode.com/problems/matchsticks-to-square/)**

> ⚔ **Hunter's rule:** Draw four empty buckets labeled with target side length. Place each stick (largest first) into a bucket. Mark every add and undo. The hints below are for *after* your attempt.

---

## The Problem

Given an array `matchsticks` where each element is the length of a matchstick, return `true` if you can use **all** matchsticks to make a square.

```
Input:  matchsticks = [1,1,2,2,2]
Output: true
Explanation: four sides of length 2 — e.g. [2], [2], [1+1], [1+1]

Input:  matchsticks = [3,3,3,3,4]
Output: false
```

Every stick must be used exactly once. Each side of the square must have the same total length.

---

## 💡 Hints

This is **k-bucket assignment with k = 4** from today's concept.

**Hint 1:** `target = sum / 4`. If `sum % 4 != 0`, return false immediately.

**Hint 2:** Sort matchsticks **descending**. Place the longest sticks first to prune early.

**Hint 3:** `dfs(i, sides[4])` — at index `i`, try placing `matchsticks[i]` into each bucket `j` where `sides[j] + stick <= target`.

**Hint 4:** Skip bucket `j` when `j > 0 && sides[j] == sides[j-1]` — empty (or equal) buckets are interchangeable.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 4-Bucket Partition (k-bucket with k=4)

| Clue in the problem | What it signals |
|---|---|
| "form a square" | Four equal sides → 4 buckets |
| "use all matchsticks" | Every element assigned — not include/exclude |
| "same length" per side | Each bucket sum must equal `sum/4` |
| Medium, n ≤ 15 | Backtracking + pruning, not brute bitmask |

**Why this pattern works:** Each recursive call assigns one stick to a bucket. Overflow and duplicate-bucket prunes cut symmetric dead branches. Sorting desc fails bad layouts sooner.

**How a strong solver thinks before coding:**
1. *"Square → 4 buckets, target = sum/4."*
2. *"Sort desc, dfs with sides array."*
3. *"Skip bucket j if sides[j] == sides[j-1]."*
4. *"Same skeleton as Day 17 #698 with k=4."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **4 nested loops picking disjoint subsets** | Nightmare to ensure disjointness and cover all sticks |
| **Try all 4^n bucket assignments** | Explores overflow branches that `sides[j] + stick > target` would skip |
| **No duplicate-bucket skip** | Same partition found via bucket 0 vs bucket 1 — 4× redundant work |
| **Ascending sort** | Small sticks hide impossibility until deep in the tree |
| **Include/exclude subset logic** | Wrong model — every stick must land in some bucket |

**The insight brute force misses:** Buckets are **unlabeled**. Prune overflow and skip equal buckets — same code as Partition K Subsets with `k = 4`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Partition K Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | General k | Same dfs + sides[] |
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | ± signs, not buckets | Day 17 — different assignment model |
| [Fair Distribution of Cookies #2305](https://leetcode.com/problems/fair-distribution-of-cookies/) | Minimize max bucket | Same bucket loop, optimize not boolean |

---

## 📖 Walkthrough

`matchsticks = [1,1,2,2,2]` → sorted desc `[2,2,2,1,1]`, target = 2.

```
dfs(i=0, sides=[0,0,0,0])
  stick=2 → bucket0: [2,0,0,0]   ← side 0 full
    stick=2 → bucket1: [2,2,0,0]
      stick=2 → bucket2: [2,2,2,0]
        stick=1 → bucket3: [2,2,2,1] ✗ overflow
                  bucket0 full, bucket1 full... bucket3: [2,2,2,1] still ✗
                  backtrack → bucket3 with second 1 after reassignment...
        ... valid layout: buckets [2], [2], [1+1], [1+1] → return true ✓
```

Key moments:
- **Overflow prune:** `sides[j] + stick > 2` → skip bucket j
- **Duplicate skip:** when two buckets both hold 0, only try the leftmost
- **Base case:** `i == n` → check all four sides equal target

> 💡 **The insight:** You are not building a square shape — you are filling four equal-sum buckets. The geometry is irrelevant; the assignment is everything.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(vector<int>& ms, vector<int>& sides, int i, int target) {
        if (i == (int)ms.size()) {
            return sides[0] == target && sides[1] == target && sides[2] == target && sides[3] == target;
        }
        for (int j = 0; j < 4; j++) {
            if (sides[j] + ms[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += ms[i];
            if (dfs(ms, sides, i + 1, target)) return true;
            sides[j] -= ms[i];
        }
        return false;
    }
public:
    bool makesquare(vector<int>& matchsticks) {
        int sum = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (sum % 4) return false;
        sort(matchsticks.rbegin(), matchsticks.rend());
        vector<int> sides(4);
        return dfs(matchsticks, sides, 0, sum / 4);
    }
};
```

### Python
```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total = sum(matchsticks)
        if total % 4: return False
        target = total // 4
        matchsticks.sort(reverse=True)
        sides = [0] * 4
        def dfs(i):
            if i == len(matchsticks):
                return all(s == target for s in sides)
            for j in range(4):
                if sides[j] + matchsticks[i] > target: continue
                if j and sides[j] == sides[j - 1]: continue
                sides[j] += matchsticks[i]
                if dfs(i + 1): return True
                sides[j] -= matchsticks[i]
            return False
        return dfs(0)
```

### Java
```java
class Solution {
    public boolean makesquare(int[] matchsticks) {
        int sum = 0;
        for (int x : matchsticks) sum += x;
        if (sum % 4 != 0) return false;
        int target = sum / 4;
        Integer[] boxed = new Integer[matchsticks.length];
        for (int i = 0; i < matchsticks.length; i++) boxed[i] = matchsticks[i];
        Arrays.sort(boxed, Collections.reverseOrder());
        for (int i = 0; i < matchsticks.length; i++) matchsticks[i] = boxed[i];
        return dfs(matchsticks, new int[4], 0, target);
    }
    private boolean dfs(int[] ms, int[] sides, int i, int target) {
        if (i == ms.length) return sides[0] == target && sides[1] == target && sides[2] == target;
        for (int j = 0; j < 4; j++) {
            if (sides[j] + ms[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += ms[i];
            if (dfs(ms, sides, i + 1, target)) return true;
            sides[j] -= ms[i];
        }
        return false;
    }
}
```

**Complexity:** O(4 · 2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Square = four equal buckets"** → target = sum/4, not geometry.
- **"Same as Day 17 k-bucket"** → k is just hardcoded to 4.
- **"Sort descending"** → largest stick exposes dead branches early.
- **"Skip equal buckets"** → unlabeled buckets, not four distinct sides.

If you tried brute force first, that's fine — the breakthrough is seeing **Matchsticks #473 as Partition #698 with k=4**.

> 🎯 **Pattern Unlocked:** 4-Bucket Partition

---

*One quest down. Next: the general k version you already met on Day 17 — now it should feel trivial. →*
