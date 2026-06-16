<!-- hand-authored -->
# ⚔ Quest: Richest Customer Wealth

> **Day 3** · [Richest Customer Wealth #1672](https://leetcode.com/problems/richest-customer-wealth/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Richest Customer Wealth on LeetCode](https://leetcode.com/problems/richest-customer-wealth/)**

> ⚔ **Mentor's rule:** Trace the **nested loops** on paper — outer = customer, inner = bank accounts.

---

## The Problem

`accounts[i][j]` = wealth in bank j for customer i. Return maximum total wealth across customers.

**Example 1:**
```
Input: accounts = [[1,2,3],[3,2,1]]
Output: 6
```

**Example 2:**
```
Input: accounts = [[1,5],[7,3],[3,5]]
Output: 10
```

**Constraints:** `1 <= accounts.length, accounts[i].length <= 50`

---

## 💡 Hints

1. For each row, sum all values in that row
2. Track the maximum row sum seen
3. Trace Example 2: row sums 6, 10, 8 → max = 10 (second customer: 7+3)
4. Nested trace: finish inner loop before advancing outer

---

## 📖 Walkthrough (nested trace)

**Example 1:** `[[1,2,3],[3,2,1]]`

```
Customer 0: inner j=0,1,2 → 1+2+3 = 6   best = 6
Customer 1: inner j=0,1,2 → 3+2+1 = 6   best = 6
Return 6
```

**Plain English:** Sum each row; return the largest sum.

---

## 🔗 Related

| Problem | Skill |
|---|---|
| [Running Sum #1480](https://leetcode.com/problems/running-sum-of-1d-array/) | 1D trace (today) |
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Final stretch (Day 15 phase) |

---

## Solution

### C++
```cpp
class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts) {
        int best = 0;
        for (auto& row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            best = max(best, sum);
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        return max(sum(row) for row in accounts)
```

### Java
```java
class Solution {
    public int maximumWealth(int[][] accounts) {
        int best = 0;
        for (int[] row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            best = Math.max(best, sum);
        }
        return best;
    }
}
```

**Complexity:** O(m·n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Nested loops are just an outer trace with an inner table per row."*
- *"I traced one full row before writing any code."*

> 🎯 **Skill practiced:** Nested Loop Tracing

---

*Two quests down. Move to today's checkpoint. →*
