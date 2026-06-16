<!-- hand-authored -->
# ⚔ Quest: Palindromic Substrings

> **Day 14** · [Palindromic Substrings #647](https://leetcode.com/problems/palindromic-substrings/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Palindromic Substrings on LeetCode](https://leetcode.com/problems/palindromic-substrings/)**

> ⚔ **Hunter's rule:** Same expand pattern as #5 — but **count** every valid expansion step instead of tracking max length.

---

## The Problem

See the full problem statement on LeetCode: **[Palindromic Substrings #647](https://leetcode.com/problems/palindromic-substrings/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Palindrome Counting DP** — identical expand to #5; `ans++` on each successful `(l,r)` pair while expanding.

Each single character is a palindrome — your loop should count at least `n` for `"aaa"`.

If you're stuck after 5 minutes: for `s="aaa"`, list all palindromic substrings by hand — should be 6.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Palindrome Counting DP

**How to identify this from the problem statement:**
- Count **substring** palindromes (contiguous)
- Single string symmetry
- Same expand mechanics as longest palindromic substring

| Keyword / phrase | What it signals |
|---|---|
| "count palindromic substrings" | Expand + increment counter |
| "how many" + palindrome + substring | Not LPS subsequence (Day 15) |
| "substring" | Contiguous — expand centers |

**How a strong solver thinks before coding:**
1. *"Same expand as #5."*
2. *"Inner while loop: ans++ each time l,r valid."*
3. *"Odd and even centers per index."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all substrings, check each** | O(n³) — expand is O(n²) |
| **Interval dp[i][j] boolean table** | Works O(n²) but expand is simpler |
| **Count LPS subsequences** | Wrong — subsequence ≠ substring |

**The insight brute force misses:** Every expansion step discovers exactly one new palindromic substring centered at that radius.

```
s = "aaa":
  centers give: a, a, a, aa, aa, aaa → 6
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Palindromic Substring #5](https://leetcode.com/problems/longest-palindromic-substring/) | Track max instead of count | Same expand |
| [Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/) | Subsequence — skip chars | Day 15 interval DP |

---

## 📖 Walkthrough

**s = "abc"** — expand and count:

```
i=0: 'a' →1; no even
i=1: 'b' →1; 'aba' not applicable
i=2: 'c' →1
Total: 3
```

**s = "aaa"**:

```
Each center radiates: 3 singles + 2 doubles + 1 triple = 6
```

> 💡 **The insight:** Counting is expand with `ans++` inside the while loop — no max tracking.

---

## Solution

### C++
```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int ans = 0, n = s.size();
        for (int i = 0; i < n; i++) {
            for (int l = i, r = i; l >= 0 && r < n && s[l] == s[r]; l--, r++) ans++;
            for (int l = i, r = i + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++) ans++;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countSubstrings(self, s: str) -> int:
        ans = 0
        n = len(s)
        for i in range(n):
            l = r = i
            while l >= 0 and r < n and s[l] == s[r]:
                ans += 1; l -= 1; r += 1
            l, r = i, i + 1
            while l >= 0 and r < n and s[l] == s[r]:
                ans += 1; l -= 1; r += 1
        return ans
```

### Java
```java
class Solution {
    public int countSubstrings(String s) {
        int ans = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            for (int l = i, r = i; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++) ans++;
            for (int l = i, r = i + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++) ans++;
        }
        return ans;
    }
}
```

**Complexity:** O(n²) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"#5 with a counter"** → Same expand, `ans++` per radius.
- **"Substring only"** → Not Day 15 LPS count.
- **"Not LCS table"** → Center expansion on one string.
- **"aaa → 6"** → Sanity check for counting.

> 🎯 **Pattern Unlocked:** Palindrome Counting DP — expand and count radii.

---

*Both quests complete. Head to the checkpoint. →*
