# ⚔ Quest: Additive Number

> **Day 20** · [Additive Number #306](https://leetcode.com/problems/additive-number/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Additive Number on LeetCode](https://leetcode.com/problems/additive-number/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Additive Number #306](https://leetcode.com/problems/additive-number/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Sequence Validation Backtracking**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sequence Validation Backtracking

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
Apply Sequence Validation Backtracking step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(string& s, int i, long long a, long long b) {
        if (i == (int)s.size()) return true;
        string nxt = s.substr(i);
        if (nxt.size() > 1 && nxt[0] == '0') return false;
        long long sum = a + b;
        if (nxt.size() > to_string(sum).size()) return false;
        if (nxt.substr(0, to_string(sum).size()) != to_string(sum)) return false;
        return dfs(s, i + to_string(sum).size(), b, sum);
    }
public:
    bool isAdditiveNumber(string num) {
        int n = num.size();
        for (int i = 1; i < n; i++) {
            if (num[0] == '0' && i > 1) break;
            for (int j = i + 1; j < n; j++) {
                if (num[i] == '0' && j > i + 1) break;
                long long a = stoll(num.substr(0, i));
                long long b = stoll(num.substr(i, j - i));
                if (dfs(num, j, a, b)) return true;
            }
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        def dfs(i, a, b):
            if i == len(num): return True
            nxt = num[i:]
            if len(nxt) > 1 and nxt[0] == '0': return False
            s = str(a + b)
            if not nxt.startswith(s): return False
            return dfs(i + len(s), b, a + b)
        n = len(num)
        for i in range(1, n):
            if num[0] == '0' and i > 1: break
            for j in range(i + 1, n):
                if num[i] == '0' and j > i + 1: break
                if dfs(j, int(num[:i]), int(num[i:j])): return True
        return False
```

### Java
```java
class Solution {
    public boolean isAdditiveNumber(String num) {
        for (int i = 1; i < num.length(); i++) {
            if (num.charAt(0) == '0' && i > 1) break;
            for (int j = i + 1; j < num.length(); j++) {
                if (num.charAt(i) == '0' && j > i + 1) break;
                if (dfs(num, j, Long.parseLong(num.substring(0, i)), Long.parseLong(num.substring(i, j))))
                    return true;
            }
        }
        return false;
    }
    private boolean dfs(String s, int i, long a, long b) {
        if (i == s.length()) return true;
        String nxt = s.substring(i);
        if (nxt.length() > 1 && nxt.charAt(0) == '0') return false;
        long sum = a + b;
        String sumStr = String.valueOf(sum);
        if (!nxt.startsWith(sumStr)) return false;
        return dfs(s, i + sumStr.length(), b, sum);
    }
}
```

**Complexity:** O(n^2) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Sequence Validation Backtracking"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Sequence Validation Backtracking

---

*Both quests complete. Head to the checkpoint. →*
