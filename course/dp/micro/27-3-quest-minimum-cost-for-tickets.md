<!-- hand-authored -->
# ⚔ Quest: Minimum Cost for Tickets

> **Day 27** · [Minimum Cost for Tickets #983](https://leetcode.com/problems/minimum-cost-for-tickets/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Cost for Tickets on LeetCode](https://leetcode.com/problems/minimum-cost-for-tickets/)**

> ⚔ **Hunter's rule:** `dp[d]` = min cost through calendar day d. Travel day → min of 3 passes. Non-travel → `dp[d]=dp[d-1]`.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Cost for Tickets #983](https://leetcode.com/problems/minimum-cost-for-tickets/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Multi-Option Decision DP** — `(day, passType)` collapsed into day-only dp.

Loop `d` from 1 to `lastDay` (= `days.back()`). Use a set for travel days.

On travel day `d`:
- 1-day pass: `dp[d-1] + costs[0]`
- 7-day pass: `dp[max(0, d-7)] + costs[1]`
- 30-day pass: `dp[max(0, d-30)] + costs[2]`

Take min of three. Non-travel: `dp[d] = dp[d-1]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Option Decision DP

**How to identify this from the problem statement:**
- Calendar days 1..365, sparse travel days
- Three pass options with different durations/costs
- Min total cost covering all travel days

| Keyword / phrase | What it signals |
|---|---|
| "7-day pass" / "30-day pass" | Look-back dp[d-7], dp[d-30] |
| "days you travel" | Set membership check |
| "minimum cost" | min over 3 pass choices |

**State machine view:** At each travel day, choose pass type — each option jumps back a different number of days.

**How a strong solver thinks before coding:**
1. *"lastDay = days[-1], daySet = set(days)."*
2. *"dp[0..lastDay], dp[0]=0."*
3. *"Travel: min of 3 pass costs from look-back."*
4. *"Return dp[lastDay]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all pass combinations per trip** | Exponential — passes overlap days |
| **Greedy cheapest per trip** | Overlapping coverage — local choice fails |
| **DP on trip index not calendar** | Misses pass overlap across trips |

**The insight brute force misses:** A 7-day pass bought on day 4 covers days 4–10. Calendar `dp[d]` naturally captures overlapping coverage via look-back.

```
days = [1,4,6,7,8,20], costs = [2,7,15]

Day 4: 7-day from dp[0]+7=7 beats three 1-day passes
Day 20: new 7-day or 30-day from earlier dp
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/) | Greedy jumps | Today's other quest |
| [Coin Change #322](https://leetcode.com/problems/coin-change/) | Min coins unbounded | Similar min over options |
| [Painting a Grid With Three Different Colors #1931](https://leetcode.com/problems/painting-a-grid-with-three-different-colors/) | Hard state DP | Day 30 territory |

---

## 📖 Walkthrough

**days = [1,4,6,7,8,20], costs = [2,7,15]**

```
d=1 travel: dp[1]=min(0+2, 0+7, 0+15)=2
d=2: dp[2]=2
d=3: dp[3]=2
d=4 travel: dp[4]=min(2+2, 0+7, 0+15)=7
d=5: dp[5]=7
d=6 travel: dp[6]=min(7+2, 2+7, 0+15)=7  (7-day still active)
d=7 travel: dp[7]=7
d=8 travel: dp[8]=7
...
d=20 travel: min(9+2, 7+7, 0+15)=11 or similar

Answer: dp[20]=11
```

> 💡 **The insight:** Calendar dp with 3 look-backs — pass type is implicit in which dp offset you choose.

---

## Solution

### C++
```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int lastDay = days.back();
        unordered_set<int> daySet(days.begin(), days.end());
        vector<int> dp(lastDay + 1, 0);
        for (int d = 1; d <= lastDay; d++) {
            if (!daySet.count(d)) { dp[d] = dp[d - 1]; continue; }
            dp[d] = min({dp[d - 1] + costs[0],
                         dp[max(0, d - 7)] + costs[1],
                         dp[max(0, d - 30)] + costs[2]});
        }
        return dp[lastDay];
    }
};
```

### Python
```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        last_day = days[-1]
        day_set = set(days)
        dp = [0] * (last_day + 1)
        for d in range(1, last_day + 1):
            if d not in day_set:
                dp[d] = dp[d - 1]
            else:
                dp[d] = min(dp[d - 1] + costs[0],
                            dp[max(0, d - 7)] + costs[1],
                            dp[max(0, d - 30)] + costs[2])
        return dp[last_day]
```

### Java
```java
class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int lastDay = days[days.length - 1];
        Set<Integer> daySet = new HashSet<>();
        for (int d : days) daySet.add(d);
        int[] dp = new int[lastDay + 1];
        for (int d = 1; d <= lastDay; d++) {
            if (!daySet.contains(d)) { dp[d] = dp[d - 1]; continue; }
            dp[d] = Math.min(dp[d - 1] + costs[0],
                    Math.min(dp[Math.max(0, d - 7)] + costs[1],
                             dp[Math.max(0, d - 30)] + costs[2]));
        }
        return dp[lastDay];
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"dp[day] not dp[trip]"** — calendar handles pass overlap.
- **"Three look-backs"** — 1, 7, 30 day pass options.
- **"Non-travel inherit"** — dp[d]=dp[d-1].
- **"max(0, d-7)"** — clamp look-back at day 0.

If you tried brute force first, that's fine — the breakthrough is **`(day, passType)` min via calendar dp**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Multi-Option Decision DP

---

*Both quests complete. Head to the checkpoint. →*
