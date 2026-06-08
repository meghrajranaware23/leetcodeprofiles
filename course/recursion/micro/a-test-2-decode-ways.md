# ⚔ A-Rank Test — Problem 2

> [Decode Ways #91](https://leetcode.com/problems/decode-ways/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Decode Ways on LeetCode](https://leetcode.com/problems/decode-ways/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Decode Ways #91](https://leetcode.com/problems/decode-ways/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Name the pattern before you code.

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
    vector<int> memo;
    int dfs(string& s, int i) {
        if (i == (int)s.size()) return 1;
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < (int)s.size()) {
            int two = stoi(s.substr(i, 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
public:
    int numDecodings(string s) {
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};
```

### Python
```python
class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {}
        def dfs(i):
            if i == len(s): return 1
            if s[i] == '0': return 0
            if i in memo: return memo[i]
            ans = dfs(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i+2]) <= 26:
                ans += dfs(i + 2)
            memo[i] = ans
            return ans
        return dfs(0)
```

### Java
```java
class Solution {
    private int[] memo;
    public int numDecodings(String s) {
        memo = new int[s.length()];
        Arrays.fill(memo, -1);
        return dfs(s, 0);
    }
    private int dfs(String s, int i) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < s.length()) {
            int two = Integer.parseInt(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
