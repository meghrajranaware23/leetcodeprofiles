# ⚔ Quest: Daily Temperatures

> **Day 17** · [Daily Temperatures #739](https://leetcode.com/problems/daily-temperatures/) · Medium · 35 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Daily Temperatures on LeetCode](https://leetcode.com/problems/daily-temperatures/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If there is no future day with a warmer temperature, `answer[i] = 0`.

```
Input:  temperatures = [73, 74, 71, 69, 72, 76, 73]
Output: [1, 4, 1, 1, 1, 0, 0]

Input:  temperatures = [30, 40, 50, 60]
Output: [1, 1, 1, 0]

Input:  temperatures = [30, 60, 90]
Output: [1, 1, 0]
```

---

## 💡 Hints

"Warmer temperature in the future" = **next greater element to the right**. You need the **distance** in days, not just the value.

Maintain a **decreasing monotonic stack** of indices. When today's temperature beats the index on top, that top index has found its answer — pop it and record `answer[popped] = i - popped`.

Indices left on the stack after the scan have no warmer day ahead — they stay at 0.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Decreasing Stack — Next Greater with Distance

**How to identify this from the problem statement:**
- "wait for a warmer temperature" → next greater element to the right
- answer is a **count of days** → distance between indices, not the temperature value
- single pass over array → stack, not nested loops

| Keyword / phrase | What it signals |
|---|---|
| "warmer temperature in the future" | Next greater to the right |
| "number of days to wait" | `answer[i] = j - i` when `j` is next greater |
| "if no such day, return 0" | Unpopped stack entries → 0 |
| "daily temperatures" / sequential array | Left-to-right scan with stack |

**Why this pattern works:** The stack holds indices whose next-greater hasn't been found yet, in decreasing temperature order. A warmer day resolves every shorter-waiting day on top — each index pushed once, popped once.

**How a strong solver thinks before coding:**
1. *"Warmer in the future → next greater. Day 17 decreasing stack."*
2. *"Store indices, not temperatures — answer is distance."*
3. *"Pop while current beats top; push current index. O(n)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each i, scan right until warmer day** | O(n²) — worst case strictly decreasing array |
| **Store temperatures on the stack** | Lose index — can't compute day distance |
| **Increasing stack instead of decreasing** | Pops on smaller temps — finds next smaller, not warmer |
| **Reset stack each day** | Wastes work — one global stack resolves all indices in one pass |

**The insight brute force misses:** When day `i` arrives, every day still waiting on the stack has no warmer day between itself and `i`. If `temperatures[i]` beats the top, that day just found its answer — no need to scan day-by-day.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Daily Temperatures #739](https://leetcode.com/problems/daily-temperatures/) | Distance as answer | Decreasing stack, next greater |
| [Next Greater Element I #496](https://leetcode.com/problems/next-greater-element-i/) | Return the value, not distance | Same pop logic, map value to answer |
| [Next Greater Element II #503](https://leetcode.com/problems/next-greater-element-ii/) | Circular array | Same stack, scan twice or modulo |
| [Online Stock Span #901](https://leetcode.com/problems/online-stock-span/) | Consecutive days ≤ today | Decreasing stack, span = `i - stack.top()` |

Today's quest is the **canonical introduction** — distance instead of value is the only twist.

---

## 📖 Walkthrough

```
temperatures = [73, 74, 71, 69, 72, 76, 73]
answer       = [ 0,  0,  0,  0,  0,  0,  0]
stack = []

i=0 (73): push 0
          stack=[0]                          (bottom→top: 73)

i=1 (74): 74 > 73 → pop 0, answer[0] = 1-0 = 1
          push 1
          stack=[1]                          (74)

i=2 (71): 71 < 74 → push 2
          stack=[1,2]                        (74, 71)

i=3 (69): 69 < 71 → push 3
          stack=[1,2,3]                      (74, 71, 69)

i=4 (72): 72 > 69 → pop 3, answer[3] = 4-3 = 1
          72 > 71 → pop 2, answer[2] = 4-2 = 1
          72 < 74 → push 4
          stack=[1,4]                        (74, 72)

i=5 (76): 76 > 72 → pop 4, answer[4] = 5-4 = 1
          76 > 74 → pop 1, answer[1] = 5-1 = 4
          push 5
          stack=[5]                          (76)

i=6 (73): 73 < 76 → push 6
          stack=[5,6]                        (76, 73)

End: indices 5,6 unpopped → answer[5]=0, answer[6]=0

Answer: [1, 4, 1, 1, 1, 0, 0] ✓
```

> 💡 **The insight:** The stack is a queue of "unresolved days." A warmer day clears everyone it dominates in one while-loop — same greedy discard instinct as Day 16's farthest reachable.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> answer(n, 0);
        vector<int> stack;

        for (int i = 0; i < n; i++) {
            while (!stack.empty() && temperatures[i] > temperatures[stack.back()]) {
                int prev = stack.back();
                stack.pop_back();
                answer[prev] = i - prev;
            }
            stack.push_back(i);
        }
        return answer;
    }
};
```

### Python
```python
class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        answer = [0] * n
        stack = []

        for i in range(n):
            while stack and temperatures[i] > temperatures[stack[-1]]:
                prev = stack.pop()
                answer[prev] = i - prev
            stack.append(i)

        return answer
```

### Java
```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prev = stack.pop();
                answer[prev] = i - prev;
            }
            stack.push(i);
        }
        return answer;
    }
}
```

**Complexity:** O(n) time · O(n) space (stack)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Warmer temperature in the future"** → Next greater element to the right — Day 17 decreasing stack.
- **"Number of days to wait"** → Store indices; answer is `i - popped_index`, not the temperature.
- **"No warmer day → 0"** → Indices still on the stack at the end stay 0.
- **Nested right-scan** → O(n²). One pass with a stack is O(n).

If you scanned right from every index, you found the brute force. The signal was "next warmer day" — monotonic stack with distance.

> 🎯 **Pattern:** Decreasing monotonic stack. Pop resolves next greater; distance is the answer.

---

*Next: the array wraps around — next greater goes circular. →*
