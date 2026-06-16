<!-- hand-authored -->
# ⚔ Quest: Knight Dialer

> **Day 24** · [Knight Dialer #935](https://leetcode.com/problems/knight-dialer/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Knight Dialer on LeetCode](https://leetcode.com/problems/knight-dialer/)**

> ⚔ **Hunter's rule:** 10 digit-states on the phone pad. `dp[d]` = paths ending at digit d. Each step: sum predecessors mod 10⁹+7.

---

## The Problem

See the full problem statement on LeetCode: **[Knight Dialer #935](https://leetcode.com/problems/knight-dialer/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **State Machine on Graph** — 10 nodes, knight-move edges.

Draw the pad. Digit **5** has **no incoming** knight moves — never visited after step 1.

Predecessors (who can jump TO this digit):
- 0←{4,6}, 1←{6,8}, 2←{7,9}, 3←{4,8}, 4←{0,3,9}, 6←{0,1,7}, 7←{2,6}, 8←{1,3}, 9←{2,4}

Start: all digits = 1 (length-1 sequences). After n-1 transitions, sum all `dp[d]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State Machine on Graph

**How to identify this from the problem statement:**
- Fixed finite states (10 phone keys)
- Transition rules from graph structure (knight moves)
- Count distinct paths of length n

| Keyword / phrase | What it signals |
|---|---|
| "knight move" / "chess knight" | Graph adjacency, not grid |
| "phone pad" / "0-9" | 10-state machine |
| "distinct phone numbers length n" | Sum dp after n-1 steps |

**Day 20 contrast:** Stock FSM optimizes profit (max). Knight dialer **counts** paths (sum mod MOD).

**How a strong solver thinks before coding:**
1. *"Build predecessor map for each digit 0-9."*
2. *"dp[d]=1 initially (any starting digit)."*
3. *"Repeat n-1 times: ndp[d] = sum dp[prev] for prev in preds[d]."*
4. *"Return sum(dp) % MOD."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS all paths length n** | O(10^n) — n up to 5000 |
| **Matrix without mod** | Integer overflow |
| **Successor instead of predecessor loop** | Works either way — pick one direction consistently |

**The insight brute force misses:** After each step, only **10 values** matter — how many paths end at each digit. Transitions are fixed forever.

```
n=2: start anywhere (10 choices)
Step 1: from 1, can only go to 6 or 8
  dp[6] gets paths from {0,1,7}
  ...
Total = sum of 10 dp values
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Dice Rolls #1155](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/) | Sum states not digits | Today's other quest |
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | 2 states (steps) | Simpler FSM |
| [Paint House #256](https://leetcode.com/problems/paint-house/) | Min cost FSM | max vs sum |

---

## 📖 Walkthrough

**n = 3** (phone numbers of length 3)

```
Initial: dp = [1,1,1,1,1,1,1,1,1,1]  (10 digits)

After move 1 (paths of length 2):
  ndp[0] = dp[4]+dp[6]
  ndp[1] = dp[6]+dp[8]
  ndp[5] = 0  (no predecessors)
  ...

After move 2 (paths of length 3):
  repeat transition

Answer = sum(ndp) % 1e9+7
```

Draw the pad once — the predecessor table never changes.

> 💡 **The insight:** 10-state machine with fixed edges. Each step = matrix-vector multiply (mod MOD).

---

## Solution

### C++
```cpp
class Solution {
public:
    int knightDialer(int n) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> jumps = {{4,6},{6,8},{7,9},{4,8},{0,3,9},{},{0,1,7},{2,6},{1,3},{2,4}};
        vector<long> dp(10, 1);
        for (int step = 1; step < n; step++) {
            vector<long> ndp(10, 0);
            for (int d = 0; d < 10; d++)
                for (int prev : jumps[d])
                    ndp[d] = (ndp[d] + dp[prev]) % MOD;
            dp = ndp;
        }
        long ans = 0;
        for (long v : dp) ans = (ans + v) % MOD;
        return ans;
    }
};
```

### Python
```python
class Solution:
    def knightDialer(self, n: int) -> int:
        MOD = 10**9 + 7
        jumps = {0:[4,6],1:[6,8],2:[7,9],3:[4,8],4:[0,3,9],5:[],6:[0,1,7],7:[2,6],8:[1,3],9:[2,4]}
        dp = [1] * 10
        for _ in range(n - 1):
            ndp = [0] * 10
            for d in range(10):
                for prev in jumps[d]:
                    ndp[d] = (ndp[d] + dp[prev]) % MOD
            dp = ndp
        return sum(dp) % MOD
```

### Java
```java
class Solution {
    public int knightDialer(int n) {
        final int MOD = 1_000_000_007;
        int[][] jumps = {{4,6},{6,8},{7,9},{4,8},{0,3,9},{},{0,1,7},{2,6},{1,3},{2,4}};
        long[] dp = new long[10];
        Arrays.fill(dp, 1);
        for (int step = 1; step < n; step++) {
            long[] ndp = new long[10];
            for (int d = 0; d < 10; d++)
                for (int prev : jumps[d])
                    ndp[d] = (ndp[d] + dp[prev]) % MOD;
            dp = ndp;
        }
        long ans = 0;
        for (long v : dp) ans = (ans + v) % MOD;
        return (int) ans;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"10 digit states"** — not a 2D grid.
- **"Predecessor sum"** — ndp[d] = Σ dp[prev].
- **"Mod every add"** — mandatory for n up to 5000.
- **"5 is dead"** — zero incoming knight moves.

If you tried brute force first, that's fine — the breakthrough is **graph FSM with mod-10 transitions**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** State Machine on Graph

---

*Both quests complete. Head to the checkpoint. →*
