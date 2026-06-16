<!-- hand-authored -->
# ⚔ Quest: Last Stone Weight II

> **Day 19** · [Last Stone Weight II #1049](https://leetcode.com/problems/last-stone-weight-ii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Last Stone Weight II on LeetCode](https://leetcode.com/problems/last-stone-weight-ii/)**

> ⚔ **Hunter's rule:** Minimize smash difference → maximize one pile near **half the total**. Same boolean table as Partition #416.

---

## The Problem

See the full problem statement on LeetCode: **[Last Stone Weight II #1049](https://leetcode.com/problems/last-stone-weight-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Knapsack in Disguise — **partition min-diff**.

- Assign stones to pile A or pile B; repeated smash = final `|sumA - sumB|`
- Minimize difference → make `sumA` as close to `total/2` as possible
- `target = total / 2`; boolean `dp[j]` = can we make sum `j`?
- Standard 0/1 reverse loop on stone weights
- Find **largest** `j ≤ target` with `dp[j] == true`
- Answer: **`total - 2*j`**

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Knapsack in Disguise

**How to identify this from the problem statement:**
- Split items into two groups
- Optimize **difference**, not existence of equal partition
- Stone-smash story hides subset sum

| Keyword / phrase | What it signals |
|---|---|
| "minimize difference" / "last stone weight" | Best subset ≤ total/2 |
| "split into two piles" | 0/1 partition |
| "equal subset" | **#416** — return bool |
| "maximize sum ≤ half" | This problem's extraction |

**Why brute force fails:** Try all pile assignments — 2^n; same overlapping subset sums.

**How a strong solver thinks before coding:**
1. *"total = sum(stones), target = total/2."*
2. *"Boolean dp like partition."*
3. *"Scan j from target down to 0, first dp[j] true."*
4. *"Return total - 2*j."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate smashing with priority queue** | Works but misses DP insight; exponential without memo |
| **Return dp[target] only** | Equal partition not required — best **≤ target** |
| **Forward loop** | 0/1 violation |
| **Greedy largest first** | Wrong pile splits |

**The insight:** Algebra reduces smashing to **one knapsack fill** + one line of math.

```
stones = [2,7,4,1,8], total=22
Best j=10 → answer 22-20=2
Piles 10 vs 12 smash to 2
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | Exact half? | `dp[target]` |
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | Count signed | Day 17 |
| [Ones and Zeroes #474](https://leetcode.com/problems/ones-and-zeroes/) | 2D max | Earlier today |

---

## 📖 Walkthrough

**Example:** `stones = [31, 26, 33, 21, 40]`, total = 151, target = 75

```
Boolean dp fill (reverse each stone)

Largest reachable j ≤ 75: e.g. 73 or 75 depending on set
If j=73: answer = 151 - 146 = 5

Trace: subset summing to 73 exists → piles 73 and 78 → diff 5
```

> 💡 **The insight:** Same table as partition — only the **answer line** changes.

---

## Solution

### C++
```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int total = 0;
        for (int s : stones) total += s;
        int target = total / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int s : stones) {
            for (int j = target; j >= s; j--) {
                dp[j] = dp[j] || dp[j - s];
            }
        }
        for (int j = target; j >= 0; j--) {
            if (dp[j]) return total - 2 * j;
        }
        return total;
    }
};
```

### Python
```python
class Solution:
    def lastStoneWeightII(self, stones: list[int]) -> int:
        total = sum(stones)
        target = total // 2
        dp = {0}
        for s in stones:
            dp = {x + s for x in dp} | dp
        return min(abs(total - 2 * x) for x in dp if x <= target + 1)
```

### Java
```java
class Solution {
    public int lastStoneWeightII(int[] stones) {
        int total = 0;
        for (int s : stones) total += s;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int s : stones) {
            for (int j = target; j >= s; j--) {
                dp[j] = dp[j] || dp[j - s];
            }
        }
        for (int j = target; j >= 0; j--) {
            if (dp[j]) return total - 2 * j;
        }
        return total;
    }
}
```

**Complexity:** O(n · sum) time · O(sum) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Smash → |A-B| min → fill half knapsack."** → Disguise peeled off.
- **"Boolean dp, reverse j."** → Day 17 / #416 engine.
- **"Largest j ≤ target."** → Not require exact equal.
- **"Knapsack in Disguise"** → `total - 2*j` extraction.

If you simulated smashing, the breakthrough is seeing **pile assignment = subset sum**.

> 🎯 **Pattern Unlocked:** Knapsack in Disguise

---

*Both quests complete. Head to the checkpoint. →*
