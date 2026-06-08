# ⚔ Quest: Gas Station

> **Day 16** · [Gas Station #134](https://leetcode.com/problems/gas-station/) · Medium · 25 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Gas Station on LeetCode](https://leetcode.com/problems/gas-station/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

There are `n` gas stations in a circle. `gas[i]` is fuel available at station `i`. `cost[i]` is fuel needed to reach the next station. You start with an empty tank at one station. Return the **starting station index** if you can complete the circuit once clockwise; otherwise return `-1`. If a solution exists, it is **unique**.

```
Input:  gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]
Output: 3
Explanation: Start at index 3 → tank never goes negative, returns to start.

Input:  gas = [2, 3, 4], cost = [3, 4, 3]
Output: -1
Explanation: Total gas < total cost — impossible.

Input:  gas = [5, 1, 2, 3, 4], cost = [4, 4, 1, 5, 1]
Output: 4
```

---

## 💡 Hints

**Step 1 — Feasibility:** If `sum(gas) < sum(cost)`, no solution exists → return `-1`.

**Step 2 — Greedy restart:** Scan stations once. Track `tank` (current fuel) and candidate start `start`.

- At station `i`, add `gas[i] - cost[i]` to `tank`.
- If `tank < 0`, starting anywhere from `start` through `i` fails → set `start = i + 1` and reset `tank = 0`.

If total gas ≥ total cost, the final `start` is guaranteed correct.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy Circular Restart (Day 16)

**How to identify this from the problem statement:**
- "circle" / "complete the circuit" → circular array — can't try all O(n²) starts naively
- "starting station index" → find one valid start, not simulate full trip from every index
- "unique solution if exists" → greedy single-pass works
- fuel gain/loss per station → prefix-style running sum with restart

| Keyword / phrase | What it signals |
|---|---|
| "gas station" / "circular route" | Greedy restart on circle |
| "empty tank at start" | Running tank balance |
| "return -1 if impossible" | Check total gas ≥ total cost first |
| "unique solution" | One pass suffices — no need to verify all starts |

**Why this pattern works (proof sketch):** Suppose you start at `s` and `tank` goes negative at station `i`. Any start in `[s, i]` also fails: starting later means you skip stations that contributed positive fuel to the tank before the failure point, so you arrive at the failure with **less or equal** fuel. Therefore `start = i + 1` is safe. Combined with `sum(gas) >= sum(cost)`, some start must work — and greedy finds it.

**How a strong solver thinks before coding:**
1. *"Circle + find start → greedy restart, not O(n²) simulation."*
2. *"If total gas < total cost → impossible."*
3. *"When tank < 0, abandon start..i, restart at i+1."*
4. *"If feasible, final start is the answer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try each station as start, simulate full circuit** | O(n²) — greedy restart is O(n) |
| **Skip total gas vs cost check** | Wastes work when impossible — O(1) filter |
| **Restart from index 0 instead of i+1** | Wrong — doomed range is `[start..i]`, not all prior stations |
| **Greedy pick station with most surplus only** | Local surplus doesn't guarantee completing the circle |

**The insight brute force misses:** Failure at station `i` eliminates an entire **range** of starting points at once. One restart per failure compresses O(n) starts into one pass.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Gas Station #134](https://leetcode.com/problems/gas-station/) | Circular fuel circuit | Greedy restart |
| [Boats to Save People #881](https://leetcode.com/problems/boats-to-save-people/) | Pair light + heavy | Greedy pairing (D-Rank) |
| [Candy #135](https://leetcode.com/problems/candy/) | Two-pass greedy | Different greedy — rating neighbors |
| [Minimum Number of Refueling Stops #871](https://leetcode.com/problems/minimum-number-of-refueling-stops/) | Maximize distance with stops | Max-heap greedy (B-Rank) |

Gas Station connects to Boats: both abandon choices that can't lead to an optimal global outcome.

---

## 📖 Walkthrough

```
gas  = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]

Total gas = 15, total cost = 15 → feasible

start=0, tank=0:
  i=0: tank += 1-3 = -2  < 0 → start=1, tank=0
  i=1: tank += 2-4 = -2  < 0 → start=2, tank=0
  i=2: tank += 3-5 = -2  < 0 → start=3, tank=0
  i=3: tank += 4-1 = 3   ✓
  i=4: tank += 5-2 = 6   ✓

start = 3 ✓
Verify: 3→4 (tank 3) → 0 (tank 6) → 1 (tank 5) → 2 (tank 3) → 3 (tank 1) ✓
```

```
gas  = [2, 3, 4], cost = [3, 4, 3]

Total gas = 9, total cost = 10 → return -1 immediately ✓
```

> 💡 **The insight:** Negative tank means "every start from `start` to `i` fails." Skip them all in one move: `start = i + 1`.

---

## Solution

### C++
```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalGas = 0, totalCost = 0;
        int tank = 0, start = 0;

        for (int i = 0; i < (int)gas.size(); i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            tank += gas[i] - cost[i];

            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return totalGas >= totalCost ? start : -1;
    }
};
```

### Python
```python
class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        total_gas = total_cost = tank = start = 0

        for i in range(len(gas)):
            total_gas += gas[i]
            total_cost += cost[i]
            tank += gas[i] - cost[i]

            if tank < 0:
                start = i + 1
                tank = 0

        return start if total_gas >= total_cost else -1
```

### Java
```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        int tank = 0, start = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            tank += gas[i] - cost[i];

            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return totalGas >= totalCost ? start : -1;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Circular route, find start"** → Greedy restart, not try-all O(n²).
- **`sum(gas) < sum(cost)`** → Impossible — return -1 immediately.
- **Tank goes negative at i** → Every start in `[start..i]` fails → `start = i + 1`.
- **Unique solution** → If feasible, greedy start is correct without re-verification.

If you simulated from every index, you found the answer with O(n²) work. The signal was "circle + unique answer" — that unlocks the one-pass restart.

> 🎯 **Pattern Unlocked:** Greedy circular restart. One failure eliminates a whole range of starts. Pair with total feasibility check.

---

*Next: checkpoint — minimum jumps, not just reachability. →*
