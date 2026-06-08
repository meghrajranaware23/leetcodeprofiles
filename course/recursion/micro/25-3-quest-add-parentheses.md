# ⚔ Quest: Different Ways to Add Parentheses

> **Day 25** · [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Different Ways to Add Parentheses on LeetCode](https://leetcode.com/problems/different-ways-to-add-parentheses/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Divide and Conquer Enumeration**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Enumeration

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the call stack on paper. Mark each frame push and pop.

```
Apply Divide and Conquer Enumeration step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> diffWaysToCompute(string expression) {
        vector<int> res;
        for (int i = 0; i < (int)expression.size(); i++) {
            char c = expression[i];
            if (c != '+' && c != '-' && c != '*') continue;
            vector<int> left  = diffWaysToCompute(expression.substr(0, i));
            vector<int> right = diffWaysToCompute(expression.substr(i + 1));
            for (int a : left)
                for (int b : right) {
                    if (c == '+') res.push_back(a + b);
                    else if (c == '-') res.push_back(a - b);
                    else res.push_back(a * b);
                }
        }
        if (res.empty()) res.push_back(stoi(expression));
        return res;
    }
};
```

### Python
```python
class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        res = []
        for i, c in enumerate(expression):
            if c not in '+-*': continue
            for a in self.diffWaysToCompute(expression[:i]):
                for b in self.diffWaysToCompute(expression[i + 1:]):
                    if c == '+': res.append(a + b)
                    elif c == '-': res.append(a - b)
                    else: res.append(a * b)
        return res if res else [int(expression)]
```

### Java
```java
class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c != '+' && c != '-' && c != '*') continue;
            for (int a : diffWaysToCompute(expression.substring(0, i)))
                for (int b : diffWaysToCompute(expression.substring(i + 1))) {
                    if (c == '+') res.add(a + b);
                    else if (c == '-') res.add(a - b);
                    else res.add(a * b);
                }
        }
        if (res.isEmpty()) res.add(Integer.parseInt(expression));
        return res;
    }
}
```

**Complexity:** O(4^n / √n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Divide and Conquer Enumeration"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Divide and Conquer Enumeration

---

*Both quests complete. Head to the checkpoint. →*
