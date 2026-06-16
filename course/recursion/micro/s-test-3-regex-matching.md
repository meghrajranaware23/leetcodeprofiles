<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 3

> [Regular Expression Matching #10](https://leetcode.com/problems/regular-expression-matching/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Regular Expression Matching on LeetCode](https://leetcode.com/problems/regular-expression-matching/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the `p[j+1]=='*'` branch diagram. Fill the `(i,j)` memo table for `"aa"` / `"a*"` before coding.

---

## The Problem

Implement regular expression matching with support for `.` and `*`.

- `.` matches any single character
- `*` matches zero or more of the **preceding** element

The match must cover the **entire** input string.

```
Input:  s = "aa", p = "a"   → false
Input:  s = "aa", p = "a*"  → true
Input:  s = "ab", p = ".*"  → true
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 29 hardest case analysis — `(i,j)` memo + star branches.

**Hint 1:** State `dp(i,j)` = does `s[i..]` match `p[j..]`? Memoize all pairs.

**Hint 2:** Base: `j==n` → return `i==m`.

**Hint 3:** `match = i<m && (s[i]==p[j] || p[j]=='.')`.

**Hint 4:** If `p[j+1]=='*'`: `dp(i,j+2) || (match && dp(i+1,j))`. Zero OR consume loop.

**Hint 5:** Else: `match && dp(i+1,j+1)`. Not `p[j]=='*'` — that's Wildcard #44.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Recursive Pattern Matching + `(i,j)` Memo (Day 29)

| Clue | Signal |
|---|---|
| regex / `.` and `x*` | 2D memo on text + pattern |
| full string match | base requires both consumed |
| star operator | check `p[j+1]`, act on `p[j]` |
| overlapping paths | memo mandatory |

**The star branch diagram:**

```
         dp(i,j) when p[j+1]=='*'
        /                    \
   dp(i,j+2)            match && dp(i+1,j)
  zero x* matches       eat one char, star stays
```

**How a strong solver thinks before coding:**
1. *"Four cases: base, memo, star, plain."*
2. *"Star at j+1, not j."*
3. *"Consume stays at j — star can repeat."*
4. *"Memo (i,j) — same cell from skip and eat paths."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Linear scan with pointer** | `*` repetition breaks single-pass |
| **Recursion without memo** | Exponential on `"aaa..."/"a*a*a*..."` |
| **Wildcard star logic on regex** | Wrong branch structure |
| **`dp(i+1,j+2)` after one star match** | Star may match more chars |

**The insight brute force misses:** Each `(i,j)` is a unique subproblem — memo collapses overlapping star branches.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Wildcard matching with `?` and `*`."*

Same memo — star at `p[j]`, zero branch `dp(i,j+1)`, eat `dp(i+1,j)`.

**Scenario:** *"Interleaving string."*

2D memo, different transition — same table intuition.

**30-second check:** *"dp(i,j), base j==n, if p[j+1]=='*' then skip or eat, else match advance, memo."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int m, n;
    vector<vector<int>> memo;
    bool dp(int i, int j, string& s, string& p) {
        if (j == n) return i == m;
        if (memo[i][j] != -1) return memo[i][j];
        bool match = (i < m && (s[i] == p[j] || p[j] == '.'));
        bool ans = false;
        if (j + 1 < n && p[j + 1] == '*') {
            ans = dp(i, j + 2, s, p) || (match && dp(i + 1, j, s, p));
        } else if (match) {
            ans = dp(i + 1, j + 1, s, p);
        }
        return memo[i][j] = ans;
    }
public:
    bool isMatch(string s, string p) {
        m = s.size(); n = p.size();
        memo.assign(m + 1, vector<int>(n + 1, -1));
        return dp(0, 0, s, p);
    }
};
```

### Python
```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        memo = {}
        def dp(i, j):
            if (i, j) in memo: return memo[(i, j)]
            if j == len(p): return i == len(s)
            match = i < len(s) and (s[i] == p[j] or p[j] == '.')
            if j + 1 < len(p) and p[j + 1] == '*':
                ans = dp(i, j + 2) or (match and dp(i + 1, j))
            else:
                ans = match and dp(i + 1, j + 1)
            memo[(i, j)] = ans
            return ans
        return dp(0, 0)
```

### Java
```java
class Solution {
    Boolean[][] memo;
    public boolean isMatch(String s, String p) {
        memo = new Boolean[s.length() + 1][p.length() + 1];
        return dp(0, 0, s, p);
    }
    private boolean dp(int i, int j, String s, String p) {
        if (memo[i][j] != null) return memo[i][j];
        if (j == p.length()) return memo[i][j] = (i == s.length());
        boolean match = i < s.length() && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');
        boolean ans;
        if (j + 1 < p.length() && p.charAt(j + 1) == '*')
            ans = dp(i, j + 2, s, p) || (match && dp(i + 1, j, s, p));
        else
            ans = match && dp(i + 1, j + 1, s, p);
        return memo[i][j] = ans;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **Day 29 capstone** — hardest case analysis in the pack.
- **Star branch diagram** — zero at `dp(i,j+2)`, eat at `dp(i+1,j)`.
- **`p[j+1]=='*'`** — not `p[j]=='*'` (that's wildcard).
- **Memo (i,j)** — overlapping star paths collapse.

---

*3 of 3 test problems. Legend status awaits. →*

## Solution

### C++
```cpp
class Solution {
    int m, n;
    vector<vector<int>> memo;
    bool dp(int i, int j, string& s, string& p) {
        if (j == n) return i == m;
        if (memo[i][j] != -1) return memo[i][j];
        bool match = (i < m && (s[i] == p[j] || p[j] == '.'));
        bool ans = false;
        if (j + 1 < n && p[j + 1] == '*') {
            ans = dp(i, j + 2, s, p) || (match && dp(i + 1, j, s, p));
        } else if (match) {
            ans = dp(i + 1, j + 1, s, p);
        }
        return memo[i][j] = ans;
    }
public:
    bool isMatch(string s, string p) {
        m = s.size(); n = p.size();
        memo.assign(m + 1, vector<int>(n + 1, -1));
        return dp(0, 0, s, p);
    }
};
```

### Python
```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        memo = {}
        def dp(i, j):
            if (i, j) in memo: return memo[(i, j)]
            if j == len(p): return i == len(s)
            match = i < len(s) and (s[i] == p[j] or p[j] == '.')
            if j + 1 < len(p) and p[j + 1] == '*':
                ans = dp(i, j + 2) or (match and dp(i + 1, j))
            else:
                ans = match and dp(i + 1, j + 1)
            memo[(i, j)] = ans
            return ans
        return dp(0, 0)
```

### Java
```java
class Solution {
    Boolean[][] memo;
    public boolean isMatch(String s, String p) {
        memo = new Boolean[s.length() + 1][p.length() + 1];
        return dp(0, 0, s, p);
    }
    private boolean dp(int i, int j, String s, String p) {
        if (memo[i][j] != null) return memo[i][j];
        if (j == p.length()) return memo[i][j] = (i == s.length());
        boolean match = i < s.length() && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');
        boolean ans;
        if (j + 1 < p.length() && p.charAt(j + 1) == '*')
            ans = dp(i, j + 2, s, p) || (match && dp(i + 1, j, s, p));
        else
            ans = match && dp(i + 1, j + 1, s, p);
        return memo[i][j] = ans;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
