<!-- hand-authored -->
# ⚔ Quest: Regular Expression Matching

> **Day 29** · [Regular Expression Matching #10](https://leetcode.com/problems/regular-expression-matching/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Regular Expression Matching on LeetCode](https://leetcode.com/problems/regular-expression-matching/)**

> ⚔ **Hunter's rule:** Draw the `p[j+1]=='*'` branch diagram for every call. Fill the `(i,j)` memo table on `"aab"` / `"c*a*b"`. No code until cases are on paper.

---

## The Problem

Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*`.

- `.` matches any single character
- `*` matches zero or more of the **preceding** element

The matching should cover the **entire** input string (not partial).

```
Input:  s = "aa", p = "a"     → false
Input:  s = "aa", p = "a*"    → true
Input:  s = "ab", p = ".*"    → true
Input:  s = "aab", p = "c*a*b" → true
Input:  s = "mississippi", p = "mis*is*ip*." → true
```

---

## 💡 Hints

**Hint 1:** State: `dp(i,j)` = does `s[i..]` match `p[j..]`? Base: `j==n` → return `i==m`.

**Hint 2:** `match = i<m && (s[i]==p[j] || p[j]=='.')`.

**Hint 3:** If `p[j+1]=='*'`: return `dp(i,j+2) || (match && dp(i+1,j))`. Branch A skips `x*`. Branch B eats one char and keeps star active.

**Hint 4:** Else if match: `dp(i+1,j+1)`. Else false. Memoize every `(i,j)`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Recursive Pattern Matching + `(i,j)` Memo

| Clue | Signal |
|---|---|
| "regex" / "pattern matching" | 2D dp on text + pattern indices |
| `.` and `*` | case split on `p[j+1]=='*'` |
| full string match | base requires both consumed |
| Hard | star branch diagram — zero vs one+ |

**How a strong solver thinks before coding:**
1. *"Write the 4-case matrix before coding."*
2. *"Star binds to p[j], not p[j+1]."*
3. *"Memo (i,j) — same cell from zero-star and multi-star paths."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate with nested loops** | `*` repetition breaks linear scan |
| **No memo on (i,j)** | Exponential — `"aaa..."` with `"a*a*a*..."` |
| **Check p[j]=='*' for regex** | Star is always at j+1; char before star is at j |
| **dp(i+1,j+2) after one match** | Star may match more — stay at j |

**The insight brute force misses:** Each `(i,j)` is a unique subproblem. The `*` operator creates overlapping paths to the same cell.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) | `*` matches any chars — today's quest 2 |
| [Regular Expression Matching #10](https://leetcode.com/problems/regular-expression-matching/) | `x*` binds to preceding char |
| [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) | `?` ≡ `.` but `*` is global |

---

## 📖 Walkthrough

### Example 1: `s = "aa"`, `p = "a*"`

```
dp(0,0): p[0]='a', p[1]='*' → star case
  Branch A: dp(0,2) → j==n, i==0 → i≠m → false
  Branch B: match s[0]='a' → dp(1,0)
    dp(1,0): star again
      Branch A: dp(1,2) → j==n, i==1 → false
      Branch B: match s[1]='a' → dp(2,0)
        dp(2,0): star
          Branch A: dp(2,2) → j==n, i==m → TRUE ✓
```

### Example 2: `s = "aab"`, `p = "a*b"`

Pattern: `a` + `*` + `b` — star binds to `a`.

```
dp(0,0): a* at j=0
  Branch A: dp(0,2) — skip "a*", match "aab" with "b" → s[0]='a'≠'b' → false
  Branch B: eat s[0]='a' → dp(1,0)
    dp(1,0): a* still active
      Branch A: dp(1,2) — skip "a*", match "ab" with "b" → s[1]='a'≠'b' → false
      Branch B: eat s[1]='a' → dp(2,0)
        dp(2,0): a* at end of usable star
          Branch A: dp(2,2) — skip "a*", match "b" with "b" → TRUE ✓
```

Path: `a*` eats `"aa"`, then literal `b` matches `s[2]='b'`.

### Example 3: `s = "ab"`, `p = ".*"`

```
dp(0,0): '.' followed by '*'
  Branch A: dp(0,2) → pattern empty, text "ab" left → false
  Branch B: '.' matches 'a' → dp(1,0)
    dp(1,0): '.*' still
      Branch A: dp(1,2) → false (text left)
      Branch B: '.' matches 'b' → dp(2,0)
        dp(2,0): Branch A: dp(2,2) → both empty → TRUE ✓
```

`.*` eats the entire string — classic "any string" pattern.

### `(i,j)` memo table fragment for `s="aa"`, `p="a*"`

```
        j=0(a*)  j=2(end)
i=0(aa)   T        F
i=1(a)    T        F
i=2(∅)    T        T
```

Cell `(0,0)` reaches `(2,2)` via repeated Branch B then Branch A — memo stores `true` once computed.

---

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
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Four cases only."** → base, memo hit, star, plain match.
- **`p[j+1]=='*'` not `p[j]=='*'`.** → Star sits one ahead; char before it is `p[j]`.
- **Zero branch: `dp(i,j+2)`. Consume branch: `dp(i+1,j)`.** → Star stays active.
- **Memo (i,j).** → Same cell from skip-star and eat-char paths.

If you tried brute force first, that's fine — the breakthrough is **the branch diagram**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Recursive Pattern Matching

---

*One quest down. Next: Wildcard #44 — same memo, different `*`. →*
