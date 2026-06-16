<!-- hand-authored -->
# ⚔ Quest: Wildcard Matching

> **Day 29** · [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Wildcard Matching on LeetCode](https://leetcode.com/problems/wildcard-matching/)**

> ⚔ **Hunter's rule:** Same `(i,j)` memo as Regex #10 — but `*` is checked at `p[j]`, not `p[j+1]`. Contrast the branch diagrams side-by-side before coding.

---

## The Problem

Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for `?` and `*`.

- `?` matches any single character
- `*` matches zero or more of **any** characters (not just the preceding one)

The matching should cover the **entire** input string.

```
Input:  s = "aa", p = "a"   → false
Input:  s = "aa", p = "*"   → true
Input:  s = "cb", p = "?a"  → false
Input:  s = "adceb", p = "*a*b" → true
Input:  s = "acdcb", p = "*a*b" → false
```

---

## 💡 Hints

**Hint 1:** Same state: `dp(i,j)` with memo. Base: `j==n` → return `i==m`.

**Hint 2:** If `p[j]=='*'`: return `dp(i,j+1) || (i<m && dp(i+1,j))`. Zero chars OR eat one any-char.

**Hint 3:** Else: `match = i<m && (p[j]=='?' || s[i]==p[j])`. If match → `dp(i+1,j+1)`.

**Hint 4:** No `p[j+1]=='*'` check — wildcard star is at `j` itself.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Memoized String Matching (Wildcard variant)

| Clue | Signal |
|---|---|
| "wildcard" / `?` and `*` | 2D memo on (text, pattern) |
| `?` | same role as regex `.` |
| `*` | global — not bound to previous char |
| vs Regex #10 | star check at `p[j]` not `p[j+1]` |

**Regex vs Wildcard star — side by side:**

| | Regex #10 `x*` | Wildcard #44 `*` |
|---|---|---|
| Star position | `p[j+1]=='*'` | `p[j]=='*'` |
| Zero match | `dp(i, j+2)` | `dp(i, j+1)` |
| Consume | `match && dp(i+1, j)` | `i<m && dp(i+1, j)` |
| Char guard | must match `x` or `.` | any char — no guard |

**How a strong solver thinks before coding:**
1. *"Copy regex skeleton — swap star branch."*
2. *"`*` at j, not j+1."*
3. *"Consume branch: no match check needed."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Use regex #10 code unchanged** | Wrong star detection — misses wildcard semantics |
| **No memo** | `"aaaa..."/"***..."` exponential |
| **Greedy consume `*` without zero branch** | Misses match when star eats zero |
| **Partial match OK** | Must consume entire string |

**The insight brute force misses:** Wildcard `*` is simpler than regex `x*` — no char guard on consume — but still needs both zero and one+ branches.

---

## 🔗 Same Pattern, Other Problems

| Problem | Star semantics |
|---|---|
| [Regular Expression Matching #10](https://leetcode.com/problems/regular-expression-matching/) | `x*` — bound to preceding char |
| [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) | `*` — matches any sequence |
| [Wildcard Matching #44](https://leetcode.com/problems/wildcard-matching/) | `?` ≡ regex `.` |

---

## 📖 Walkthrough

### Example 1: `s = "adceb"`, `p = "*a*b"`

```
dp(0,0): p[0]='*'
  Branch A: dp(0,1) — star eats zero, pattern "a*b"
    dp(0,1): 'a' matches 'a'? s[0]='a' ✓ → dp(1,2)
      dp(1,2): p[2]='*'
        Branch A: dp(1,3) — pattern "b", text "dceb" → 'd'≠'b' ✗
        Branch B: eat 'd' → dp(2,2) ... eventually
        Branch B path: eat "dce" via repeated * → dp(4,3)
          dp(4,3): 'b' matches s[4]='b' → dp(5,4) → both done → TRUE ✓
```

Leading `*` ate `"adc"`, then `'a'` matched `'a'`, `*` ate `"ce"`, `'b'` matched `'b'`.

### Example 2: `s = "aa"`, `p = "*"`

```
dp(0,0): p[0]='*'
  Branch A: dp(0,1) → j==n, i==2 → false (text not empty)
  Branch B: eat s[0] → dp(1,0)
    dp(1,0): star
      Branch A: dp(1,1) → false
      Branch B: eat s[1] → dp(2,0)
        dp(2,0): Branch A: dp(2,1) → i==m,j==n → TRUE ✓
```

Single `*` eats entire `"aa"`.

### Example 3: `s = "cb"`, `p = "?a"`

```
dp(0,0): '?' matches 'c' → dp(1,1)
dp(1,1): 'a' vs 'b' → no match → FALSE ✗
```

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> memo;
    bool dp(int i, int j, string& s, string& p) {
        if (j == (int)p.size()) return i == (int)s.size();
        if (memo[i][j] != -1) return memo[i][j];
        bool match = i < (int)s.size() && (p[j] == '?' || s[i] == p[j]);
        bool ans = false;
        if (p[j] == '*')
            ans = dp(i, j + 1, s, p) || (i < (int)s.size() && dp(i + 1, j, s, p));
        else if (match)
            ans = dp(i + 1, j + 1, s, p);
        return memo[i][j] = ans;
    }
public:
    bool isMatch(string s, string p) {
        memo.assign(s.size() + 1, vector<int>(p.size() + 1, -1));
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
            match = i < len(s) and (p[j] == '?' or s[i] == p[j])
            if p[j] == '*':
                ans = dp(i, j + 1) or (i < len(s) and dp(i + 1, j))
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
        boolean match = i < s.length() && (p.charAt(j) == '?' || s.charAt(i) == p.charAt(j));
        boolean ans;
        if (p.charAt(j) == '*')
            ans = dp(i, j + 1, s, p) || (i < s.length() && dp(i + 1, j, s, p));
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

- **"Same memo table as regex."** → `(i,j)` state unchanged.
- **"Star at p[j], not p[j+1]."** → the one-line diff from quest 1.
- **"Zero: dp(i,j+1). Eat: dp(i+1,j)."** → no char guard on eat.
- **`?` ≡ `.`** → single-char wildcard.

If you tried regex code verbatim, that's fine — the breakthrough is **one branch diagram difference**, not a new algorithm.

> 🎯 **Pattern Unlocked:** Memoized String Matching

---

*Both quests complete. Head to the checkpoint. →*
