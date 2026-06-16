<!-- hand-authored -->
# ⚔ Quest: Number of Dice Rolls with Target Sum

> **Day 24** · [Number of Dice Rolls with Target Sum #1155](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Dice Rolls with Target Sum on LeetCode](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/)**

> ⚔ **Hunter's rule:** State is `dp[s]` after each die — ways to reach sum `s`. Roll die `d`, add face `f`: `ndp[s] += dp[s-f]`.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Dice Rolls with Target Sum #1155](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Multi-Option Counting DP** — `dp[d][s]` rolled into 1D with fresh `ndp` each die.

Base: `dp[0] = 1` (zero dice, sum zero). Each of `n` dice: for sum `s`, try faces `f = 1..min(k, s)`.

Use a **new** `ndp` array each die — don't update in place (would reuse same die multiple times).

Mod 10⁹+7 on every addition.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Option Counting DP

**How to identify this from the problem statement:**
- Count **distinct sequences** of dice faces (order matters)
- Each die contributes 1..k to running sum
- Fixed number of dice `n`, target sum

| Keyword / phrase | What it signals |
|---|---|
| "number of dice rolls" / "target sum" | `dp[s]` after d dice |
| "k faces" | Inner loop f = 1..k |
| "return 0 if impossible" | e.g. target > n*k or target < n |

**Coin change contrast:** Coins can repeat freely in one "step"; here each die is exactly **one iteration** of the outer loop.

**How a strong solver thinks before coding:**
1. *"dp[0]=1, target array size target+1."*
2. *"Outer: n dice. Inner: s from 1..target, f from 1..min(k,s)."*
3. *"ndp[s] += dp[s-f] — fresh ndp each die."*
4. *"Return dp[target]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all k^n sequences** | Exponential — k=30, n=30 is huge |
| **In-place dp update** | Reuses same die multiple times in one pass |
| **Unbounded knapsack template** | Wrong — exactly n items (dice), not unlimited |

**The insight brute force misses:** State `(d, s)` = ways after `d` dice summing to `s`. Only O(n·target·k) cells — each filled once.

```
n=1, k=6, target=3
After 1 die: dp[3]=1 (face 3)
n=2: dp[3] = dp[2]+dp[1]+dp[0] = 1+1+1 = 3
  (1+2, 2+1, 3+0... actually faces 1..6:
   3 from (1,2),(2,1) and need dp after 2 dice summing to 3)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Coin Change 2 #518](https://leetcode.com/problems/coin-change-ii/) | Unlimited coins | Similar sum DP, different outer loop |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Order matters, unbounded | Counting on target |
| [Knight Dialer #935](https://leetcode.com/problems/knight-dialer/) | Graph states not sums | Today's other quest |

---

## 📖 Walkthrough

**n = 2, k = 6, target = 7**

```
Die 1:
  dp = [1, 1, 1, 1, 1, 1, 0, 0]  (indices 0..7)
  dp[0]=1 base, dp[1..6]=1

Die 2 (build ndp):
  s=1: f=1 → ndp[1]+=dp[0]=1
  s=2: ndp[2]+=dp[1]=1, ndp[2]+=dp[0]=1 → 2
  s=3: ndp[3]+=dp[2,1,0] → 3
  ...
  s=7: ndp[7]+=dp[6,5,4,3,2,1] → 6

Answer: 6 ways
```

> 💡 **The insight:** Outer loop = dice count. Inner = sum + face. Rolling `ndp` prevents double-counting within one die.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numRollsToTarget(int n, int k, int target) {
        const int MOD = 1e9 + 7;
        vector<int> dp(target + 1, 0);
        dp[0] = 1;
        for (int i = 0; i < n; i++) {
            vector<int> ndp(target + 1, 0);
            for (int j = 1; j <= target; j++) {
                for (int f = 1; f <= k && f <= j; f++) {
                    ndp[j] = (ndp[j] + dp[j - f]) % MOD;
                }
            }
            dp = ndp;
        }
        return dp[target];
    }
};
```

### Python
```python
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (target + 1)
        dp[0] = 1
        for _ in range(n):
            ndp = [0] * (target + 1)
            for j in range(1, target + 1):
                for f in range(1, min(k, j) + 1):
                    ndp[j] = (ndp[j] + dp[j - f]) % MOD
            dp = ndp
        return dp[target]
```

### Java
```java
class Solution {
    public int numRollsToTarget(int n, int k, int target) {
        int MOD = 1_000_000_007;
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int i = 0; i < n; i++) {
            int[] ndp = new int[target + 1];
            for (int j = 1; j <= target; j++) {
                for (int f = 1; f <= k && f <= j; f++) {
                    ndp[j] = (int)((ndp[j] + (long)dp[j - f]) % MOD);
                }
            }
            dp = ndp;
        }
        return dp[target];
    }
}
```

**Complexity:** O(n · k · target) time · O(target) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"State: dp[s] after d dice"** — ways to reach sum s.
- **"ndp each die"** — don't update in place.
- **"Faces 1..k"** — inner loop bounded by min(k, s).
- **"MOD on every add"** — counts explode otherwise.

If you tried brute force first, that's fine — the breakthrough is **`dp[d][s]` as dice × sum table**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Multi-Option Counting DP

---

*One quest down. The next one builds on this pattern. →*
