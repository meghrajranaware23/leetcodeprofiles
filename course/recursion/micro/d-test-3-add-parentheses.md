# ⚔ D-Rank Test — Problem 3

> [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Different Ways to Add Parentheses on LeetCode](https://leetcode.com/problems/different-ways-to-add-parentheses/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

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

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
