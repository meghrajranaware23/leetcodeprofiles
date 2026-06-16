<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 3

> [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Matchsticks to Square on LeetCode](https://leetcode.com/problems/matchsticks-to-square/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Sort sticks descending. Assign each stick to one of 4 buckets — prune early.

---

## The Problem

You are given an integer array `matchsticks` where each element is the length of a matchstick. Return `true` if you can use **all** matchsticks to make a square. Each matchstick must be used exactly once — no breaking allowed.

```
Input:  matchsticks = [1,1,2,2,2]
Output: true
Explanation: square with sides 1+2=3 using sticks 1+2, 1+2, 2, 2

Input:  matchsticks = [3,3,3,3,4]
Output: false

Input:  matchsticks = [1,1]
Output: false
```

---

## 💡 Hints

> 🎯 **What's being tested:** Partition backtracking + pruning (Day 19) — assign sticks to 4 equal-sum buckets.

**Hint 1:** If `sum(matchsticks) % 4 != 0`, return false immediately. Each side must equal `target = sum / 4`.

**Hint 2:** **Sort descending** — try large sticks first to fail fast (Day 17 pruning).

**Hint 3:** State: `dfs(i, sides[])` — assign stick `i` to one of 4 buckets. Base: `i == n` → all sides equal `target`.

**Hint 4:** Loop bucket `j` from 0 to 3. Skip if `sides[j] + matchsticks[i] > target`. Add stick, recurse, subtract (backtrack).

**Hint 5:** **Symmetry prune:** if `sides[j] == sides[j-1]`, skip — assigning to an empty bucket identical to the previous empty bucket duplicates work.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Partition Backtracking — 4 buckets, equal target

| Clue | Signal |
|---|---|
| "form a square" / "4 equal sides" | 4 buckets summing to target |
| "use every stick exactly once" | Index `i` walks sticks in order |
| "return true/false" | Short-circuit on first valid assignment |
| small n (≤ 15 sticks) | Backtrack with pruning suffices |

**Contrast with Target Sum (#494, Day 17):**

| Target Sum | Matchsticks to Square |
|---|---|
| +/- each number → one sum | Partition into 4 groups |
| 2 branches per index | 4 bucket choices per index |
| Count ways or reach target | All buckets == target |

**How a strong solver thinks before coding:**
1. *"sum % 4 → target side length."*
2. *"Sort desc — big sticks first."*
3. *"dfs(i): try each bucket, prune overflow + symmetry."*
4. *"i==n: check all sides == target."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **4 nested loops choosing subsets** | Doesn't map to sequential stick assignment |
| **No sort** | Explores many doomed branches late |
| **Ignore symmetry prune** | 4! duplicate bucket orderings for empty buckets |
| **Greedy: fill largest bucket first without backtrack** | Fails — need to undo bad assignments |

**The insight brute force misses:** Sequential assignment with backtrack + sort + symmetry skip collapses the search space enough for n ≤ 15.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Partition array into k equal-sum subsets."* (LeetCode #698)

Same template — k buckets instead of 4. Same symmetry prune on equal bucket sums.

**Scenario:** *"Can sticks form a rectangle with 2 pairs of equal sides?"*

Different geometry — not today's 4-equal-sides partition.

**30-second check:** *"target=sum/4, sort desc, dfs(i), 4 buckets, overflow prune, symmetry skip."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

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

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **Day 19 partition family** — assign each item to a bucket, backtrack on failure.
- **`target = sum / 4`** — early exit if not divisible.
- **Sort descending** — Day 17 pruning; large sticks expose dead ends sooner.
- **Symmetry skip** — `sides[j] == sides[j-1]` avoids duplicate bucket assignments.

---

*3 of 3 test problems. Continue to the next. →*

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
