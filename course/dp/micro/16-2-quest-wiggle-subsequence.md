<!-- hand-authored -->
# ⚔ Quest: Wiggle Subsequence

> **Day 16** · [Wiggle Subsequence #376](https://leetcode.com/problems/wiggle-subsequence/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Wiggle Subsequence on LeetCode](https://leetcode.com/problems/wiggle-subsequence/)**

> ⚔ **Hunter's rule:** Track **two states** — `up` and `down`. A rise extends from `down`, a fall extends from `up`. Day 12 LIS with direction.

---

## The Problem

See the full problem statement on LeetCode: **[Wiggle Subsequence #376](https://leetcode.com/problems/wiggle-subsequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Directional Subsequence DP** — `up` / `down` lengths.

If `nums[i] > nums[i-1]`: `up = down + 1`. If `nums[i] < nums[i-1]`: `down = up + 1`. Flat: skip.

If you're stuck after 5 minutes: trace `[1,7,4,9,2,3]` from the concept page — answer 6.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Directional Subsequence DP

**How to identify this from the problem statement:**
- Subsequence (skip elements)
- Alternating increase/decrease
- Maximize length

| Keyword / phrase | What it signals |
|---|---|
| "wiggle" / "alternating" | `up` / `down` state machine |
| "up and down" | Direction memory — not plain LIS |
| "subsequence" | Can skip — not contiguous |

**Day 12 bridge:** LIS = always increase. Wiggle = sign must alternate.

**How a strong solver thinks before coding:**
1. *"up = best ending with rise at i."*
2. *"Rise needs previous down → up = down+1."*
3. *"Fall needs previous up → down = up+1."*
4. *"Start up=down=1, return max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **O(n²) check all subsequences** | Exponential |
| **Plain LIS on nums** | Ignores alternation requirement |
| **Greedy take every local peak/valley** | Subsequence allows skips — greedy on full array can work but state DP is cleaner proof |

**The insight brute force misses:** Only need last **direction** — two scalars, not full `dp[i]` array.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) | Single direction | Day 12 LIS |
| [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Interval chain | Today's second quest |
| [Wiggle Sort II #324](https://leetcode.com/problems/wiggle-sort-ii/) | Rearrange array | Different problem — sorting |

---

## 📖 Walkthrough

**nums = [1,7,4,9,2,3]**

```
up=1, down=1
i=1: 7>1 → up=2
i=2: 4<7 → down=3
i=3: 9>4 → up=4
i=4: 2<9 → down=5
i=5: 3>2 → up=6
max(up,down)=6
```

> 💡 **The insight:** Two counters replace O(n²) LIS scan — direction is the only extra memory.

---

## Solution

### C++
```cpp
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int up = 1, down = 1;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] > nums[i - 1]) up = down + 1;
            else if (nums[i] < nums[i - 1]) down = up + 1;
        }
        return max(up, down);
    }
};
```

### Python
```python
class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        up = down = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]: up = down + 1
            elif nums[i] < nums[i - 1]: down = up + 1
        return max(up, down)
```

### Java
```java
class Solution {
    public int wiggleMaxLength(int[] nums) {
        int up = 1, down = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) up = down + 1;
            else if (nums[i] < nums[i - 1]) down = up + 1;
        }
        return Math.max(up, down);
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Not plain LIS"** — Alternation constraint.
- **"up from down, down from up"** — Swap source state on direction change.
- **"Flat does nothing"** — `==` skips both updates.
- **"Day 12 cousin"** — Subsequence on one array, extra state.

> 🎯 **Pattern Unlocked:** Directional Subsequence DP — wiggle up/down states.

---

*One quest down. Next: sort pairs + chain. →*
