<!-- hand-authored -->
# 🎯 Phase 2 Proof — Best Time to Buy and Sell Stock

> [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Easy · 50 XP

---

Prove **Phase 2 independent workflow**: read → trace → attempt → debug — minimal hints.

**[→ Open on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)**

> ⚔ 10-minute honest attempt before hints.

---

## The Problem

One buy, one sell. Max profit. Must buy before sell.

**Example:** `[7,1,5,3,6,4]` → `5` (buy 1, sell 6)

**Example 2:** `[7,6,4,3,1]` → `0`

---

## 💡 Hints

> 🎯 **Synthesizes Days 6–10:** attempt rule (Day 6), debug trace (Day 7), editorial-style insight without copying (Day 8), independent checklist (Day 10).

**Hint 1 (Day 6):** Log stuck point if brute force TLE — that's data.

**Hint 2 (Day 7):** Trace `[7,1,5,3,6,4]` — track min price seen so far and best profit.

**Hint 3 (Day 10):** One pass: update `minPrice`, `best = max(best, price - minPrice)`.

**Hint 4 (seed only):** Full **Kadane** / DP stock series lives in **Arrays & DP Ascension** — today: running minimum is enough.

---

## 📖 Running-min trace

```
price: 7  1  5  3  6  4
min:   7  1  1  1  1  1
profit:0  0  4  4  5  5  → answer 5
```

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

- *"Independent workflow worked — I traced running min before coding."*
- *"I'll learn Kadane properly in a topic pack; today was process proof."*

---

*Phase 2 proof complete. →*

## Solution

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
