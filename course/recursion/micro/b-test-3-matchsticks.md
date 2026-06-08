# ⚔ B-Rank Test — Problem 3

> [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Matchsticks to Square on LeetCode](https://leetcode.com/problems/matchsticks-to-square/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

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

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
