<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 2

> [Divisor Game #1025](https://leetcode.com/problems/divisor-game/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Divisor Game on LeetCode](https://leetcode.com/problems/divisor-game/)**

> ⚔ **Hunter's rule:** Alice and Bob alternate; Alice starts. Model *"can current player force a win?"* — game DP with memo on pile size `n`.

---

## The Problem

See the full problem statement on LeetCode: **[Divisor Game #1025](https://leetcode.com/problems/divisor-game/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Game memoization** — Day 2 top-down style. State: `win(n)` = can current player win starting with n?

**Hint 1:** From pile `n`, try every proper divisor `x` (1 ≤ x < n, n % x == 0). Subtract x → opponent faces `n - x`.

**Hint 2:** Current player wins if **any** move leaves opponent in a losing state: `win(n) = any(!win(n-x))` for valid x.

**Hint 3:** Base: `win(1)` = false (no valid move). Fill memo bottom-up from 2..n or recurse with cache — same overlap as climbing stairs family.

**Bonus insight:** After memo analysis, `win(n) = (n % 2 == 0)` — but derive via game DP first.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Game Theory Memo / Win-Lose DP

**How to identify from the statement:**
- Two players, optimal play, win/lose boolean
- State = pile size `n`; moves reduce n
- Overlap: same pile sizes from different game paths

**How a strong solver thinks before coding:**
1. *"State: dp[n] = current player wins?"*
2. *"Try all divisors x; if opponent loses on n-x, I win."*
3. *"Day 2 memo on n — cache before recurse."*
4. *"Pattern: dp[n] = OR over moves of NOT dp[n-x]."*

**E-Rank connection:** Day 2 memoization — `memo[n]` cache hits when same pile size revisited in game tree.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate all games without memo** | Exponential game tree |
| **Greedy pick largest divisor** | Optimal play requires considering all moves |
| **Memo on win(n)** | O(n²) divisors work — tractable ✓ |

**The insight:** Game trees overlap on pile size — identical to Day 1 overlap detection, Day 2 cache fix.

---

## 🎯 Transfer to Unseen Problems

*"Two players, finite state, perfect play, return if first player wins."*

Define `dp[state]` = win for player to move. Transition: win if **any** move to opponent lose state.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    bool divisorGame(int n) {
        return n % 2 == 0;
    }
};
```

### Python
```python
class Solution:
    def divisorGame(self, n: int) -> bool:
        return n % 2 == 0
```

### Java
```java
class Solution {
    public boolean divisorGame(int n) {
        return n % 2 == 0;
    }
}
```

**Complexity:** O(1) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Alternating players"** → win(n) depends on win(n-x) for opponent.
- **"Day 2 memo on pile size"** → Game DP before math shortcut.
- **"Even n wins"** → After tabulating small n, parity pattern emerges.
- **"Any move to losing state"** → OR over transitions, not AND.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    bool divisorGame(int n) {
        return n % 2 == 0;
    }
};
```

### Python
```python
class Solution:
    def divisorGame(self, n: int) -> bool:
        return n % 2 == 0
```

### Java
```java
class Solution {
    public boolean divisorGame(int n) {
        return n % 2 == 0;
    }
}
```

**Complexity:** O(1) time · O(1) space
