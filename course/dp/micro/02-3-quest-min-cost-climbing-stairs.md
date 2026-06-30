<!-- hand-authored -->
# ⚔ Quest: Min Cost Climbing Stairs

> **Day 2** · [Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Min Cost Climbing Stairs on LeetCode](https://leetcode.com/problems/min-cost-climbing-stairs/)**

> ⚔ **Hunter's rule:** You can **start** at index 0 or 1 for free. Trace `cost = [10,15,20]` — which path is cheaper? Then write the min recurrence.

---

## The Problem

See the full problem statement on LeetCode: **[Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Decision + Cost Memoization — same 2-step skeleton as Climbing Stairs, but **min** replaces **sum**.

**Hint 1:** `dp[i]` = minimum cost to **reach step i** (pay `cost[i]` when you land on i). You may start at 0 or 1 with no upfront payment.

**Hint 2:** Transition: `dp[i] = cost[i] + min(dp[i-1], dp[i-2])` — pick the cheaper predecessor.

**Hint 3:** Answer is **beyond** the last index: min cost to finish = `min(dp[n-1], dp[n-2])` where n = cost.length — or extend dp to index n with cost 0.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Decision + Cost Memoization

**How to identify this from the problem statement:**
- Same movement rules as Climbing Stairs (1 or 2 steps)
- Optimize **minimum cost**, not count ways
- Cost paid on the step you **land on**

| Keyword / phrase | What it signals |
|---|---|
| "minimum cost" | min over choices |
| "climb one or two steps" | Two predecessors |
| "can start at index 0 or 1" | dp[0]=0, dp[1]=0 or free start |
| "reach the top" past last index | Answer at n, not n-1 |

**Why brute force fails:** Try all 2^n path combinations — same exponential tree as Climbing Stairs, but min merge instead of sum.

**How a strong solver thinks before coding:**
1. *"Same graph as Climbing Stairs — edge costs on nodes."*
2. *"min instead of + for combining subproblems."*
3. *"Free start → dp[0]=dp[1]=0 before loop."*
4. *"Return min to step n (top beyond array)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all paths** | O(2^n) paths |
| **Greedy: always take cheaper neighbor** | Fails — cheap step now may force expensive step later |
| **Memo on min cost to i** | O(n) — optimal substructure ✓ |

```
cost = [10, 15, 20]
dp[0]=0, dp[1]=0
dp[2]=10+min(0,0)=10
Top: min(dp[1], dp[2]) = min(0+15?, 10) → pay from step 2 only = 15? 

Trace carefully: dp[2]=10, finish from 1: cost[1]+0=15, from 2: 10 → answer 15
Example output: 15 ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Combine with | Transition |
|---|---|---|
| [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) | **sum** | dp[i-1]+dp[i-2] |
| [House Robber #198](https://leetcode.com/problems/house-robber/) | **max** | max(dp[i-1], dp[i-2]+nums[i]) |
| [Pascal's Triangle #118](https://leetcode.com/problems/pascals-triangle/) | **sum** | cell = sum of two prior values |

---

## 📖 Walkthrough

**cost = [1, 100, 1, 1, 100, 1]**

```
dp[0] = 0   (free start)
dp[1] = 0   (free start)
dp[2] = 1 + min(0,0) = 1
dp[3] = 100 + min(0,1) = 100
dp[4] = 1 + min(1,100) = 2      ← cheap route via step 2
dp[5] = 1 + min(100,2) = 3
Finish: min(dp[4], dp[5]) = min(2, 3) = 2

Path: start 0 → step 2 (cost 1) → step 4 (cost 1) → top = 2 ✓
Avoided the 100-cost steps.
```

> 💡 **The insight:** Memo/tabulate the **same indices** as Climbing Stairs — only the merge operator changes (+ vs min).

---

## Solution

### C++
```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int a = 0, b = 0;
        for (int i = 2; i <= (int)cost.size(); i++) {
            int c = min(b + cost[i - 1], a + cost[i - 2]);
            a = b; b = c;
        }
        return b;
    }
};
```

### Python
```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        a = b = 0
        for i in range(2, len(cost) + 1):
            a, b = b, min(b + cost[i - 1], a + cost[i - 2])
        return b
```

### Java
```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int a = 0, b = 0;
        for (int i = 2; i <= cost.length; i++) {
            int c = Math.min(b + cost[i - 1], a + cost[i - 2]);
            a = b; b = c;
        }
        return b;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Same stairs, min not count"** → min merge on same recurrence graph.
- **"Free start at 0 or 1"** → dp[0]=dp[1]=0; loop from i=2.
- **"Answer past last index"** → rolling `b` at i=n is min cost to top.
- **"Memo would cache minCost(i)"** → Top-down works; solution shows bottom-up roll.

> 🎯 **Pattern Unlocked:** Decision + Cost Memoization

---

*Both quests complete. Head to the checkpoint. →*
