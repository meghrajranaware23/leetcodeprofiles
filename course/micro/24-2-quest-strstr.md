# ⚔ Quest: Find the Index of the First Occurrence

> **Day 24** · [Find the Index of the First Occurrence in a String #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) · Medium · 30 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find the Index of the First Occurrence on LeetCode](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given two strings `haystack` and `needle`, return the index of the **first occurrence** of `needle` in `haystack`, or `-1` if `needle` is not a substring of `haystack`.

```
Input:  haystack = "sadbutsad", needle = "sad"
Output: 0

Input:  haystack = "leetcode", needle = "leeto"
Output: -1

Input:  haystack = "abc", needle = "abc"
Output: 0
```

---

## 💡 Hints

This is the **canonical KMP application** — build the prefix function π for `needle`, then scan `haystack`.

Maintain `j` = number of needle characters matched so far. For each `haystack[i]`:
- If `haystack[i] == needle[j]`, increment `j`.
- On mismatch, fall back: `j = π[j-1]` (while `j > 0` and still mismatched).
- When `j == len(needle)`, you found a match at index `i - j + 1`.

The text index `i` **never decreases** — that's the O(n+m) guarantee.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** KMP Pattern Matching — Prefix Function Search

**How to identify this from the problem statement:**
- "first occurrence of needle in haystack" → substring search
- return index or -1 → stop at first full match
- classic intro to KMP — no tricks, direct application

| Keyword / phrase | What it signals |
|---|---|
| "first occurrence" / "index of" | Pattern matching, stop at first hit |
| "needle in haystack" | Build π on needle, scan haystack |
| "not a substring" → return -1 | Full scan with no match found |
| two strings, one is pattern | π array length = \|needle\| |

**Why this pattern works:** π encodes all salvageable borders. On mismatch, KMP shifts the pattern to the longest viable overlap instead of restarting — each haystack character is compared at most once.

**How a strong solver thinks before coding:**
1. *"Pattern in text → Day 24 KMP. Build π on needle."*
2. *"j tracks match length. Mismatch → j = π[j-1]. i never goes back."*
3. *"j == m → return i - m + 1. O(n+m)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each start index in haystack, compare all of needle** | O(n·m) — KMP is O(n+m) |
| **On mismatch, restart needle from beginning at i+1** | Re-compares already-matched characters |
| **Built-in `find()` / `indexOf()`** | Valid on LeetCode, but the learning goal is KMP mechanics |
| **Rolling hash without verify** | Works, but KMP is collision-free and deterministic |

**The insight brute force misses:** A partial match of length `j` tells you something about the text suffix. π tells you exactly how much of that match can be reused — no backtracking in the haystack.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Find the Index of the First Occurrence #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Return first index | Standard KMP search |
| [Repeated Substring Pattern #459](https://leetcode.com/problems/repeated-substring-pattern/) | Is s a repeat of a unit? | KMP π on s itself |
| [Shortest Palindrome #214](https://leetcode.com/problems/shortest-palindrome/) | Prepend to make palindrome | KMP on s + "#" + reverse(s) |
| [Implement strStr() #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Same problem | π build + scan |

Today's quest is the **canonical KMP introduction** — direct pattern matching, no string concatenation trick.

---

## 📖 Walkthrough

```
haystack = "sadbutsad"
needle   = "sad"
π        = [0, 0, 0]   (no borders in "sad")

i=0: h='s' n[0]='s' → j=1
i=1: h='a' n[1]='a' → j=2
i=2: h='d' n[2]='d' → j=3 = len(needle)
     MATCH at i - j + 1 = 2 - 3 + 1 = 0 ✓

Return 0
```

```
haystack = "leetcode"
needle   = "leeto"
π        = [0, 0, 0, 0, 0]

i=0..3: "leet" matches, j=4
i=4: h='c' n[4]='o' → mismatch
     j = π[3] = 0
     h='c' n[0]='l' → mismatch, j stays 0
... scan continues, no full match ...

Return -1
```

```
Mismatch recovery trace:

haystack = "ababcababc"
needle   = "ababc"
π        = [0, 0, 1, 2, 0]

i=0..4: full match "ababc" at index 0, j=5
        j = π[4] = 0  (seek overlap)

i=5: h='a' n[0]='a' → j=1
i=6: h='b' n[1]='b' → j=2
i=7: h='a' n[2]='a' → j=3
i=8: h='b' n[3]='b' → j=4
i=9: h='c' n[4]='c' → j=5
     MATCH at index 5 ✓  (overlapping match found efficiently)
```

> 💡 **The insight:** Brute force restarts the pattern. KMP asks π: *"Given what I already matched, what's the longest prefix I can keep?"*

---

## Solution

### C++
```cpp
class Solution {
    vector<int> buildPi(const string& p) {
        int m = p.size();
        vector<int> pi(m, 0);
        int j = 0;
        for (int i = 1; i < m; i++) {
            while (j > 0 && p[i] != p[j])
                j = pi[j - 1];
            if (p[i] == p[j])
                j++;
            pi[i] = j;
        }
        return pi;
    }

public:
    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0;
        int n = haystack.size(), m = needle.size();
        vector<int> pi = buildPi(needle);
        int j = 0;

        for (int i = 0; i < n; i++) {
            while (j > 0 && haystack[i] != needle[j])
                j = pi[j - 1];
            if (haystack[i] == needle[j])
                j++;
            if (j == m)
                return i - m + 1;
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if not needle:
            return 0

        m = len(needle)
        pi = [0] * m
        j = 0
        for i in range(1, m):
            while j > 0 and needle[i] != needle[j]:
                j = pi[j - 1]
            if needle[i] == needle[j]:
                j += 1
            pi[i] = j

        j = 0
        for i in range(len(haystack)):
            while j > 0 and haystack[i] != needle[j]:
                j = pi[j - 1]
            if haystack[i] == needle[j]:
                j += 1
            if j == m:
                return i - m + 1

        return -1
```

### Java
```java
class Solution {
    private int[] buildPi(String p) {
        int m = p.length();
        int[] pi = new int[m];
        int j = 0;
        for (int i = 1; i < m; i++) {
            while (j > 0 && p.charAt(i) != p.charAt(j))
                j = pi[j - 1];
            if (p.charAt(i) == p.charAt(j))
                j++;
            pi[i] = j;
        }
        return pi;
    }

    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        int n = haystack.length(), m = needle.length();
        int[] pi = buildPi(needle);
        int j = 0;

        for (int i = 0; i < n; i++) {
            while (j > 0 && haystack.charAt(i) != needle.charAt(j))
                j = pi[j - 1];
            if (haystack.charAt(i) == needle.charAt(j))
                j++;
            if (j == m)
                return i - m + 1;
        }
        return -1;
    }
}
```

**Complexity:** O(n + m) time · O(m) space (π array)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"First occurrence of needle in haystack"** → KMP — Day 24 prefix function on needle.
- **Build π first** → Encodes border structure before scanning.
- **Mismatch → j = π[j-1]** → Text pointer never retreats.
- **j == len(needle)** → Match at `i - m + 1`.

If you restarted the pattern from scratch on every mismatch, you found O(n·m) brute force. The signal was "pattern matching" — KMP with π fallback.

> 🎯 **Pattern:** KMP search. Build π on pattern; scan text with O(1) amortized mismatch recovery.

---

*Next: KMP goes creative — concatenate strings to find palindromic borders. →*
