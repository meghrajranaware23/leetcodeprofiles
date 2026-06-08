# 🎯 Phase 2 Proof — Best Time to Buy and Sell Stock

> [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Easy · 50 XP

---

You've completed **First Wins**. Now prove you can apply the skills independently.

**[→ Open Best Time to Buy and Sell Stock on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)**

> ⚔ **Phase proof rule:** Spend at least 10 minutes attempting this on your own. Use your full workflow: read → trace → plan → code. No hints until you've tried.

---

## The Problem

**[Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)** — see full statement on LeetCode.

**What's being tested:** Independent Solving — Classic interview problem; tests independent thinking + editorial learning

---

## 💡 Hints

1. Apply the workflow from this phase — don't skip steps
2. Trace all examples on paper first
3. Brute force is acceptable if it passes constraints

---

## 🔍 Strategy Breakdown

**Skill tested:** Independent Solving

**Mentor thinking:**
1. *"I've practiced this skill for 5 days — I know the workflow."*
2. *"Read constraints first. List edge cases."*
3. *"Plan on paper. Code second."*

---

<details>
<summary>📖 Solution & Walkthrough</summary>

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minP = INT_MAX, best = 0;
        for (int p : prices) {
            minP = min(minP, p);
            best = max(best, p - minP);
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_p, best = float('inf'), 0
        for p in prices:
            min_p = min(min_p, p)
            best = max(best, p - min_p)
        return best
```

### Java
```java
class Solution {
    public int maxProfit(int[] prices) {
        int minP = Integer.MAX_VALUE, best = 0;
        for (int p : prices) {
            minP = Math.min(minP, p);
            best = Math.max(best, p - minP);
        }
        return best;
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What a Mentor Would Tell You

- *"Getting this wrong after an honest attempt is fine — note what broke in your workflow."*
- *"Getting this right proves your **process** works, not just your memory."*

---

*1 of 1 phase proof. Claim your phase completion. →*
