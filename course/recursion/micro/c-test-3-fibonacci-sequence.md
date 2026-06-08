# ⚔ C-Rank Test — Problem 3

> [Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Split Array into Fibonacci Sequence on LeetCode](https://leetcode.com/problems/split-array-into-fibonacci-sequence/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Name the pattern before you code.

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
    vector<int> path;
    bool dfs(string& num, int i) {
        if (i == (int)num.size()) return path.size() >= 3;
        long long val = 0;
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            val = val * 10 + (num[j] - '0');
            if (val > INT_MAX) break;
            if (path.size() >= 2 && val != (long long)path[path.size()-2] + path.back()) continue;
            path.push_back((int)val);
            if (dfs(num, j + 1)) return true;
            path.pop_back();
        }
        return false;
    }
public:
    vector<int> splitIntoFibonacci(string num) {
        return dfs(num, 0) ? path : vector<int>{};
    }
};
```

### Python
```python
class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        path = []
        def dfs(i):
            if i == len(num): return len(path) >= 3
            val = 0
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = val * 10 + int(num[j])
                if val > 2**31 - 1: break
                if len(path) >= 2 and val != path[-2] + path[-1]: continue
                path.append(val)
                if dfs(j + 1): return True
                path.pop()
            return False
        return path if dfs(0) else []
```

### Java
```java
class Solution {
    private List<Integer> path = new ArrayList<>();
    public List<Integer> splitIntoFibonacci(String num) {
        return dfs(num, 0) ? path : List.of();
    }
    private boolean dfs(String num, int i) {
        if (i == num.length()) return path.size() >= 3;
        long val = 0;
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            val = val * 10 + (num.charAt(j) - '0');
            if (val > Integer.MAX_VALUE) break;
            if (path.size() >= 2 && val != (long) path.get(path.size() - 2) + path.get(path.size() - 1)) continue;
            path.add((int) val);
            if (dfs(num, j + 1)) return true;
            path.remove(path.size() - 1);
        }
        return false;
    }
}
```

**Complexity:** O(n^2) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
