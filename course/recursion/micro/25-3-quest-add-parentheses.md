<!-- hand-authored -->
# ⚔ Quest: Different Ways to Add Parentheses

> **Day 25** · [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Different Ways to Add Parentheses on LeetCode](https://leetcode.com/problems/different-ways-to-add-parentheses/)**

> ⚔ **Hunter's rule:** Trace `diffWays("2-1-1")` — list left/right results for each operator split before coding.

---

## The Problem

Given a string `expression` of digits and operators `+`, `-`, `*`, return **all possible results** from adding parentheses in different ways. You may assume the expression is valid.

```
Input:  expression = "2-1-1"
Output: [0, 2]
Explanation:
  ((2-1)-1) = 0
  (2-(1-1)) = 2

Input:  expression = "2*3-4*5"
Output: [-34, -14, -10, -10, 10]
```

---

## 💡 Hints

**Hint 1:** If the string has **no operator**, return `[integer value]` — base case.

**Hint 2:** Loop index `i` over the string. Skip non-operators (`+`, `-`, `*` only).

**Hint 3:** Split: `left = diffWays(expression[0..i))`, `right = diffWays(expression[i+1..])`.

**Hint 4:** Combine: for every `a` in left, every `b` in right, apply operator at `i` → `a+b`, `a-b`, or `a*b`.

**Hint 5:** Collect all results in a list. Same split structure as Day 7 divide-and-conquer — multiple split points instead of one `mid`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Enumeration

| Clue in the problem | What it signals |
|---|---|
| "different ways to add parentheses" | Every operator is a potential split |
| "return all possible results" | List return, Cartesian combine |
| Digits and binary operators | Recurse on substrings |
| Valid expression, small length | Exponential results ok |

**Contrast with Day 7 (Merge Sort / Max Subarray):**

| Day 7 D&C | Add Parentheses |
|---|---|
| One split at `mid` | Split at **each** operator |
| Combine two sorted halves | Combine all pairs `(a, b)` with op |
| Returns one structure | Returns list of integers |
| Fixed divide point | Loop all divide points |

**Contrast with Day 25 Quest 1 (Unique BSTs):**

| Unique BSTs | Add Parentheses |
|---|---|
| Scalar multiply + sum | List Cartesian product |
| Root loop on size | Operator loop on index |
| Count structures | Enumerate eval values |

**How a strong solver thinks before coding:**
1. *"No operator → base list with one value."*
2. *"Each operator: recurse left string, recurse right string."*
3. *"Nested loop combine — every left with every right."*
4. *"Operator stays at split index — not included in substrings."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Insert parentheses at all positions blindly** | Hard to track valid groupings vs operator splits |
| **Left-to-right eval only** | Misses `(2-(1-1))` style regrouping |
| **Return single int from recurse** | Need list of all sub-expression values |
| **Include operator in left substring** | Split must be `[0..i)` and `[i+1..n)` |
| **Only split at first operator** | Must try every `+`, `-`, `*` |

**The insight brute force misses:** Splitting at operator `i` separates "how to parenthesize the left" from "how to parenthesize the right" — classic divide and conquer.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Unique BSTs #96](https://leetcode.com/problems/unique-binary-search-trees/) | Today's prior quest — scalar Catalan count |
| [Expression Add Operators #282](https://leetcode.com/problems/expression-add-operators/) | Day 20 — insert missing operators + target |
| [Sort an Array #912](https://leetcode.com/problems/sort-an-array/) | Day 7 — single mid split, merge combine |

---

## 📖 Walkthrough

`expression = "2-1-1"`:

```
Split at i=1 ('-'):
  left  = diffWays("2")     → [2]
  right = diffWays("1-1")
    split at i=1 ('-'): left=[1], right=[1] → 1-1=0
    right → [0]
  combine: 2-0 = 2, 2-0 = 2  → [2]

Split at i=3 ('-'):
  left  = diffWays("2-1")
    split at i=1 ('-'): left=[2], right=[1] → 2-1=1
    left → [1]
  right = diffWays("1") → [1]
  combine: 1-1=0

Results: [2, 0] → sorted [0, 2] ✓
```

`"2*3-4*5"` — multiple splits produce overlapping subproblems (memo optional for speed; base solution recurses cleanly).

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

- **"All parenthesizations"** → split at each operator, D&C.
- **Base: no operator** → single integer in a list.
- **Combine: nested loops** → every left eval × every right eval.
- **Operator at split index** — excluded from both substrings.
- **Day 7 cousin** — multiple split points, list merge instead of sorted merge.

> 🎯 **Pattern Unlocked:** Divide and Conquer Enumeration

---

*Both quests complete. Head to the checkpoint. →*
