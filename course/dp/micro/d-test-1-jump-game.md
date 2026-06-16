<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 1

> [Jump Game #55](https://leetcode.com/problems/jump-game/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Jump Game on LeetCode](https://leetcode.com/problems/jump-game/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Can you reach index n−1? Track farthest reachable. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Jump Game #55](https://leetcode.com/problems/jump-game/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Greedy reachability** (primary) with **DP reachability** as the same idea tabulated — not Day 6 take/skip, not Day 7 counting.

- `farthest` = max index reachable so far
- At index `i`, if `i > farthest` → stuck, return false
- Update `farthest = max(farthest, i + nums[i])`
- If `farthest >= n-1` → true

**DP view:** `dp[i]` = can reach i; `dp[i+j]` for all j in 1..nums[i] — greedy collapses this to one scalar.

**Pattern name before coding:** *Farthest-reach greedy / boolean reachability DP.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Can you reach the last index?" → reachability, not optimization
- Each step has **variable jump length** up to `nums[i]`
- No need to count ways (Day 7) or minimize cost (Day 8)

**How a strong solver thinks before coding:**
1. *"If I can't reach i, game over."*
2. *"From i, extend farthest to i+nums[i]."*
3. *"O(n) single pass — no inner loop over jumps."*
4. *"Not House Robber — must **use** forward progress."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS trying every jump length** | O(n²) or worse — redundant |
| **Day 6 max/skip** | Wrong model — must move forward |
| **Day 7 count paths** | Only need yes/no |
| **Greedy: always jump max distance** | This problem asks *possibility*, not path choice — farthest tracking suffices |

---

## 🎯 Transfer to Unseen Problems

Same family as reachability with ranges. [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/) adds **minimum jumps** — BFS layers or greedy jump count (later rank).

Reference: **Day 10** multi-option is different — here one **farthest** scalar replaces inner loops.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farthest = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (i > farthest) return false;
            farthest = max(farthest, i + nums[i]);
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        farthest = 0
        for i in range(len(nums)):
            if i > farthest:
                return False
            farthest = max(farthest, i + nums[i])
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
        }
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Can reach last index?"** → farthest reach greedy.
- **"i > farthest"** → dead zone — return false.
- **"Not Day 6/7/8"** — boolean reach, not max/count/min.
- **"DP alternative"** — dp[i] true if any prior j reaches i — greedy is enough.

---

*1 of 3 test problems. Continue to the next. →*

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
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        farthest = 0
        for i in range(len(nums)):
            if i > farthest:
                return False
            farthest = max(farthest, i + nums[i])
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
        }
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space
