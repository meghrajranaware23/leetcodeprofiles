<!-- hand-authored -->
# ⚔ Quest: Jump Game II

> **Day 27** · [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Jump Game II on LeetCode](https://leetcode.com/problems/jump-game-ii/)**

> ⚔ **Hunter's rule:** Greedy **layers** — `curEnd` = frontier of current jump, `farthest` = max reach. When `i == curEnd`, jump++ and extend frontier.

---

## The Problem

See the full problem statement on LeetCode: **[Jump Game II #45](https://leetcode.com/problems/jump-game-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Greedy/DP Dual Approach** — greedy wins in interviews.

You **can** DP (`dp[i]` = min jumps to i), but greedy is O(n) one pass:
- `farthest` = max index reachable from any position in current jump range
- When index `i` hits `curEnd` (end of current jump range), increment `jumps` and set `curEnd = farthest`
- Loop to `n-2` only (last index doesn't need another jump)

Assumption: always reachable (unlike Jump Game I).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy/DP Dual Approach

**How to identify this from the problem statement:**
- Minimum jumps on array with variable jump length
- Reach last index — optimization problem
- Greedy optimal when always reachable

| Keyword / phrase | What it signals |
|---|---|
| "minimum jumps" | Layer BFS or greedy farthest |
| "nums[i] max jump length" | Extend farthest in current layer |
| "guaranteed reachable" | Greedy OK — no unreachable check |

**Interview tip:** State greedy first. Mention DP exists but greedy is faster to code and explain.

**How a strong solver thinks before coding:**
1. *"jumps=0, curEnd=0, farthest=0."*
2. *"For i in 0..n-2: farthest=max(farthest, i+nums[i])."*
3. *"If i==curEnd: jumps++, curEnd=farthest."*
4. *"Return jumps."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS on all positions** | O(n²) or worse — works but slow |
| **DP try all jump lengths** | O(n²) — acceptable but not interview-optimal |
| **Greedy pick max jump always** | Wrong — need minimum jumps, not max reach per step |

**The insight brute force misses:** Jumps come in **layers**. All positions reachable in k jumps form one layer. Track the boundary (`curEnd`) and the next boundary (`farthest`).

```
nums = [2,3,1,1,4]

Layer 0→1: from 0 reach {1,2}, farthest=2
Layer 1→2: from {1,2} reach up to 4, jumps=2
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Jump Game #55](https://leetcode.com/problems/jump-game/) | Can reach? boolean | farthest only |
| [Minimum Cost for Tickets #983](https://leetcode.com/problems/minimum-cost-for-tickets/) | Day pass min cost | Today's other quest |
| [Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/) | Forward/backward | Graph BFS |

---

## 📖 Walkthrough

**nums = [2,3,1,1,4]**

```
i=0: farthest=2
     i==curEnd(0) → jumps=1, curEnd=2
i=1: farthest=max(4,4)=4
i=2: i==curEnd(2) → jumps=2, curEnd=4

Answer: 2 jumps (0→1→4 or 0→2→4)
```

**nums = [2,1,1,1,1]**

```
Careful layering still gives minimum — not always jump max distance.
```

> 💡 **The insight:** `curEnd` marks "must jump by here." `farthest` precomputes next layer boundary.

---

## Solution

### C++
```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < (int)nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            if (i == curEnd) { jumps++; curEnd = farthest; }
        }
        return jumps;
    }
};
```

### Python
```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        jumps = cur_end = farthest = 0
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == cur_end:
                jumps += 1
                cur_end = farthest
        return jumps
```

### Java
```java
class Solution {
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) { jumps++; curEnd = farthest; }
        }
        return jumps;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Greedy layers, not DP table"** — interview speed.
- **"curEnd = current jump boundary"** — when exhausted, jump++.
- **"farthest = next boundary"** — track while scanning layer.
- **"Loop to n-2"** — last index needs no outgoing jump.

If you tried DP first, that's fine — the breakthrough is **layered farthest greedy**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Greedy/DP Dual Approach

---

*One quest down. The next one builds on this pattern. →*
