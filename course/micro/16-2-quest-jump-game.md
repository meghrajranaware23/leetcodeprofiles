# ⚔ Quest: Jump Game

> **Day 16** · [Jump Game #55](https://leetcode.com/problems/jump-game/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Jump Game on LeetCode](https://leetcode.com/problems/jump-game/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums` where each element represents your **maximum jump length** at that position, return `true` if you can reach the **last index**, starting at index `0`.

```
Input:  nums = [2, 3, 1, 1, 4]
Output: true
Explanation: Jump 1 step from 0 → 1, then 3 steps to the last index.

Input:  nums = [3, 2, 1, 0, 4]
Output: false
Explanation: You always arrive at index 3. Its max jump is 0 — stuck.

Input:  nums = [0]
Output: true
```

---

## 💡 Hints

You don't need to simulate every jump path. Track one number: **`farthest`** — the maximum index reachable from any position you've visited so far.

At each index `i`:
- If `i > farthest`, you're stuck → return `false`
- Update `farthest = max(farthest, i + nums[i])`
- If `farthest >= last index`, return `true`

One pass. O(n) time, O(1) space.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy — Farthest Reachable (Day 16)

**How to identify this from the problem statement:**
- "can you reach the last index" → reachability, not minimum steps
- each position gives a **maximum** jump range → extends a frontier
- boolean answer → yes/no, not counting paths
- non-negative jump lengths → monotonic frontier (farthest only increases or stays)

| Keyword / phrase | What it signals |
|---|---|
| "can you reach" / "is it possible" | Greedy feasibility — track frontier |
| "maximum jump length" | From index `i`, reachable up to `i + nums[i]` |
| "starting at first index" | Forward-only scan from 0 |
| "return true/false" | No need to count jumps (that's Jump Game II) |

**Why this pattern works:** At each step, the best you can do is extend the reachable frontier. If index `i` is within the frontier (`i <= farthest`), all positions up to `farthest` are reachable. Any path that reaches further than `farthest` would have already been captured. If `i > farthest`, no prior path reached `i`.

**How a strong solver thinks before coding:**
1. *"Reachability, not min jumps → farthest reachable greedy."*
2. *"If current index > farthest → stuck."*
3. *"Update farthest = max(farthest, i + nums[i])."*
4. *"Early exit when farthest >= n - 1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS/BFS exploring every jump choice** | O(2^n) or O(n²) — farthest greedy is O(n) |
| **DP: dp[i] = can reach i?** | O(n²) — check all j that can jump to i. Works but overkill |
| **Simulate every path with backtracking** | Exponential — greedy frontier captures all paths at once |
| **Greedy on jump count instead of reachability** | Wrong problem — that's Jump Game II (#45) |

**The insight brute force misses:** You don't care **how** you reached a position — only whether it's reachable. `farthest` compresses all paths into one number.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Jump Game #55](https://leetcode.com/problems/jump-game/) | Can reach end? | Farthest reachable |
| [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/) | Minimum jumps | Greedy layer / range edge |
| [Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/) | Left/right jumps, cycle | BFS or DP — different shape |
| [Maximum Score from Performing Multiplications #1770](https://leetcode.com/problems/maximum-score-from-performing-multiplications/) | Pick left or right | DP — greedy fails here |

Jump Game I is pure frontier greedy. Jump Game II adds **counting** — today's checkpoint.

---

## 📖 Walkthrough

```
nums = [2, 3, 1, 1, 4]

i=0: farthest = max(0, 0+2) = 2    (can reach 0, 1, 2)
i=1: 1 <= 2 ✓  farthest = max(2, 1+3) = 4
     4 >= 4 (last index) → return true ✓
```

```
nums = [3, 2, 1, 0, 4]

i=0: farthest = 0+3 = 3
i=1: 1 <= 3 ✓  farthest = max(3, 1+2) = 3
i=2: 2 <= 3 ✓  farthest = max(3, 2+1) = 3
i=3: 3 <= 3 ✓  farthest = max(3, 3+0) = 3
i=4: 4 > 3 ✗  STUCK — can't reach index 4

Return false ✓
```

> 💡 **The insight:** `farthest` is the frontier of all reachable indices. If the current index falls outside the frontier, every path is blocked.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farthest = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (i > farthest) return false;
            farthest = max(farthest, i + nums[i]);
            if (farthest >= (int)nums.size() - 1) return true;
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        farthest = 0
        for i, jump in enumerate(nums):
            if i > farthest:
                return False
            farthest = max(farthest, i + jump)
            if farthest >= len(nums) - 1:
                return True
        return True
```

### Java
```java
class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) return false;
            farthest = Math.max(farthest, i + nums[i]);
            if (farthest >= nums.length - 1) return true;
        }
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Can you reach the last index?"** → Farthest reachable greedy, not BFS.
- **`i > farthest`** → Stuck. No path reached this index.
- **`farthest = max(farthest, i + nums[i])`** → Extend the frontier at every reachable step.
- **Jump Game II is different** → Minimum jumps uses layer counting, not boolean reachability.

If you explored every jump path with DFS, you found the answer with exponential or O(n²) work. The signal was "can you reach?" — one frontier number answers it in O(n).

> 🎯 **Pattern Unlocked:** Greedy farthest reachable. Track the frontier; if you ever step outside it, you're stuck.

---

*Next: circular greedy restart at the gas station. →*
