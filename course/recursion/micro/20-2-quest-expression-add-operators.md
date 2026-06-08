# ⚔ Quest: Expression Add Operators

> **Day 20** · [Expression Add Operators #282](https://leetcode.com/problems/expression-add-operators/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Expression Add Operators on LeetCode](https://leetcode.com/problems/expression-add-operators/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Expression Add Operators #282](https://leetcode.com/problems/expression-add-operators/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Operator Insertion Backtracking**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Operator Insertion Backtracking

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

Draw the decision tree. Trace choose / explore / unchoose.

```
Apply Operator Insertion Backtracking step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(string& num, int i, long target, long curr, long prev, string& path, vector<string>& res) {
        if (i == (int)num.size()) {
            if (curr == target) res.push_back(path);
            return;
        }
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            long val = stol(num.substr(i, j - i + 1));
            string nxt = num.substr(i, j - i + 1);
            if (i == 0) {
                dfs(num, j + 1, target, val, val, nxt, res);
            } else {
                dfs(num, j + 1, target, curr + val, val, path + "+" + nxt, res);
                dfs(num, j + 1, target, curr - val, -val, path + "-" + nxt, res);
                dfs(num, j + 1, target, curr - prev + prev * val, prev * val, path + "*" + nxt, res);
            }
        }
    }
public:
    vector<string> addOperators(string num, int target) {
        vector<string> res;
        string path;
        dfs(num, 0, target, 0, 0, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        def dfs(i, curr, prev, path):
            if i == len(num):
                if curr == target: res.append(path)
                return
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = int(num[i:j + 1])
                if i == 0:
                    dfs(j + 1, val, val, str(val))
                else:
                    dfs(j + 1, curr + val, val, path + '+' + str(val))
                    dfs(j + 1, curr - val, -val, path + '-' + str(val))
                    dfs(j + 1, curr - prev + prev * val, prev * val, path + '*' + str(val))
        dfs(0, 0, 0, '')
        return res
```

### Java
```java
class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> res = new ArrayList<>();
        dfs(num, 0, target, 0, 0, "", res);
        return res;
    }
    private void dfs(String num, int i, long target, long curr, long prev, String path, List<String> res) {
        if (i == num.length()) {
            if (curr == target) res.add(path);
            return;
        }
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            long val = Long.parseLong(num.substring(i, j + 1));
            if (i == 0) dfs(num, j + 1, target, val, val, String.valueOf(val), res);
            else {
                dfs(num, j + 1, target, curr + val, val, path + "+" + val, res);
                dfs(num, j + 1, target, curr - val, -val, path + "-" + val, res);
                dfs(num, j + 1, target, curr - prev + prev * val, prev * val, path + "*" + val, res);
            }
        }
    }
}
```

**Complexity:** O(4^n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Operator Insertion Backtracking"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Operator Insertion Backtracking

---

*One quest down. The next one builds on this pattern. →*
