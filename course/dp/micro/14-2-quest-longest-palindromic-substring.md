<!-- hand-authored -->
# ⚔ Quest: Longest Palindromic Substring

> **Day 14** · [Longest Palindromic Substring #5](https://leetcode.com/problems/longest-palindromic-substring/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Palindromic Substring on LeetCode](https://leetcode.com/problems/longest-palindromic-substring/)**

> ⚔ **Hunter's rule:** **Substring** = contiguous. Expand from each center outward — not the LCS table, not LPS subsequence (Day 15).

---

## The Problem

See the full problem statement on LeetCode: **[Longest Palindromic Substring #5](https://leetcode.com/problems/longest-palindromic-substring/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Palindrome Expansion/DP** — `expand(l,r)` while `s[l]==s[r]`.

Try center `i` (odd) and pair `(i, i+1)` (even). Track longest substring found.

If you're stuck after 5 minutes: on `"babad"`, expand from center index 2 — you should find `"aba"` length 3.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Palindrome Expansion/DP

**How to identify this from the problem statement:**
- **Substring** — contiguous characters
- Palindrome — symmetric around a center
- Return the actual substring (not just length)

| Keyword / phrase | What it signals |
|---|---|
| "palindromic substring" | Expand around center |
| "contiguous" / "substring" | Not subsequence — Day 15 LPS differs |
| "longest" palindrome in one string | O(n²) expand, O(1) space |

**Day 14 vs Day 15:** This is **substring** (#5). LPS #516 on Day 15 allows skipping — different recurrence.

**How a strong solver thinks before coding:**
1. *"For each center, spread while matching."*
2. *"Odd center (i,i) and even (i,i+1)."*
3. *"Update start + maxLen when r-l-1 grows."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring O(n³)** | Redundant — expand reuses symmetry |
| **LCS on s and reverse(s)** | Gives **subsequence** length, not substring |
| **Interval dp[i][j] without length tracking** | Works but needs return string — expand is simpler |

**The insight brute force misses:** Each palindrome has a unique center — O(n) centers, O(n) expand each → O(n²) total.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Palindromic Substrings #647](https://leetcode.com/problems/palindromic-substrings/) | Count all, don't track max | Same expand, increment counter |
| [Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/) | **Subsequence** — Day 15 | `dp[i][j]` interval, skip allowed |
| [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) | Check whole string | Two pointers, not DP |

---

## 📖 Walkthrough

**s = "babad"**

```
i=1 center 'a': expand(1,1)→"a"; expand(1,2)→"aba" len 3
i=2 center 'b': expand(2,2)→"a"; expand(2,3)→"aba" len 3
Answer: "aba" or "bab" (both length 3)
```

```
expand(l,r):
  while l>=0 and r<n and s[l]==s[r]: l--; r++
  if r-l-1 > maxLen: update start, maxLen
```

> 💡 **The insight:** Radial expansion — not a 2D LCS grid. Symmetry from the center out.

---

## Solution

### C++
```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 0, n = s.size();
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
            if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
        };
        for (int i = 0; i < n; i++) { expand(i, i); expand(i, i + 1); }
        return s.substr(start, maxLen);
    }
};
```

### Python
```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        start = maxLen = 0
        n = len(s)
        def expand(l, r):
            nonlocal start, maxLen
            while l >= 0 and r < n and s[l] == s[r]:
                l -= 1; r += 1
            if r - l - 1 > maxLen:
                start, maxLen = l + 1, r - l - 1
        for i in range(n):
            expand(i, i)
            expand(i, i + 1)
        return s[start:start + maxLen]
```

### Java
```java
class Solution {
    int start = 0, maxLen = 0;
    public String longestPalindrome(String s) {
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return s.substring(start, start + maxLen);
    }
    private void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
    }
}
```

**Complexity:** O(n²) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Substring, not subsequence"** → Expand, not Day 15 LPS dp.
- **"Not LCS grid"** → Single string symmetry.
- **"Two center types"** → Odd and even length palindromes.
- **"Track start + length"** → Must return string, not int only.

> 🎯 **Pattern Unlocked:** Palindrome Expansion/DP — expand from each center.

---

*One quest down. Next: count every palindromic substring. →*
