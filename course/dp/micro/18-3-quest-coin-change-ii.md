<!-- hand-authored -->
# ⚔ Quest: Coin Change II

> **Day 18** · [Coin Change II #518](https://leetcode.com/problems/coin-change-ii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Coin Change II on LeetCode](https://leetcode.com/problems/coin-change-ii/)**

> ⚔ **Hunter's rule:** **Combinations**, not permutations. Outer loop = **coins**, inner = amount **forward**.

---

## The Problem

See the full problem statement on LeetCode: **[Coin Change II #518](https://leetcode.com/problems/coin-change-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Count Combinations — unbounded, but **order of loops matters**.

- `dp[a]` = number of **combinations** (multiset) making amount `a`
- `dp[0] = 1`
- **`for c in coins: for a from c to amount: dp[a] += dp[a-c]`**
- Coin outer → `{1,2}` and `{2,1}` count once
- Amount outer first → would count **permutations** (wrong for this problem)

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Count Combinations

**How to identify this from the problem statement:**
- Unlimited coins
- Count **combinations** (problem says so explicitly)
- Not minimum — summing ways

| Keyword / phrase | What it signals |
|---|---|
| "combinations" / "order doesn't matter" | Coin outer loop |
| "permutations" / "order matters" | **Day 22 #377** — amount outer |
| "minimum coins" | **#322** min, amount outer |
| "each coin once" | **Day 17** reverse |

**Why brute force fails:** Enumerate all multisets — exponential overlap on `(amount, last coin index)`.

**How a strong solver thinks before coding:**
1. *"dp[0]=1."*
2. *"For each coin, update all amounts forward."*
3. *"+= dp[a-c]."*
4. *"Don't swap loop order."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Amount outer, coins inner for #518** | Counts permutations — too many |
| **Reverse loop from Day 17** | Wrong reuse semantics for counting |
| **Sets vs multisets confusion** | Unlimited copies allowed |
| **Forgetting dp[0]=1** | All sums stay 0 |

**The insight:** Processing coin `c` last among considered coins fixes combination order.

```
amount=3, coins=[1,2]
Combinations: 1+1+1, 1+2  → 2 ways

Coin outer:
  c=1: dp=[1,1,1,1]
  c=2: dp[2]+=dp[0], dp[3]+=dp[1] → dp[3]=2 ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Coin Change #322](https://leetcode.com/problems/coin-change/) | Min count | Amount outer |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Order matters | Amount outer, += |
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | 0/1 count | Reverse j |

---

## 📖 Walkthrough

**Example:** `amount = 5`, `coins = [1, 2, 5]`

```
dp[0]=1

c=1: dp = [1,1,1,1,1,1]
c=2: dp[2]+=1, dp[3]+=1, dp[4]+=2, dp[5]+=2
     → [1,1,2,2,3,3]
c=5: dp[5]+=dp[0] → 4

Combinations: 5, 2+2+1, 2+1+1+1, 1×5 → 4 ways
```

> 💡 **The insight:** Loop order is the difference between #518 and #377.

---

## Solution

### C++
```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int c : coins)
            for (int j = c; j <= amount; j++)
                dp[j] += dp[j - c];
        return dp[amount];
    }
};
```

### Python
```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for c in coins:
            for j in range(c, amount + 1):
                dp[j] += dp[j - c]
        return dp[amount]
```

### Java
```java
class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int c : coins)
            for (int j = c; j <= amount; j++)
                dp[j] += dp[j - c];
        return dp[amount];
    }
}
```

**Complexity:** O(n · amount) time · O(amount) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Combinations → coin outer."** → Lock order of coin types.
- **"Forward j, += transition."** → Unbounded counting.
- **"Not #377."** → Permutations swap loops.
- **"Count Combinations"** → dp[0]=1 base.

If you got 3 instead of 4 on the example, check **loop order** first.

> 🎯 **Pattern Unlocked:** Count Combinations

---

*Both quests complete. Head to the checkpoint. →*
