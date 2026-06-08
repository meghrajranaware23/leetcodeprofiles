# ⚔ Quest: Shortest Palindrome

> **Day 24** · [Shortest Palindrome #214](https://leetcode.com/problems/shortest-palindrome/) · Hard · 50 XP · 25 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Palindrome on LeetCode](https://leetcode.com/problems/shortest-palindrome/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are given a string `s`. In one step, you can prepend any character to `s`.

Return **the shortest palindrome** you can obtain by performing this procedure **exactly once** (prepending zero or more characters).

```
Input:  s = "aacecaaa"
Output: "aaacecaaa"

Input:  s = "abcd"
Output: "dcbabcd"

Input:  s = "abb"
Output: "bbabb"
```

---

## 💡 Hints

**Hint 1 — Reduce to longest palindromic prefix:** Prepending the minimum means finding the **longest prefix of s that is already a palindrome**. Prepend the reverse of the remaining suffix.

**Hint 2 — KMP trick string:** Build `combined = s + "#" + reverse(s)`. The `#` separator prevents false matches across the boundary. Compute π on `combined`.

**Hint 3 — Read π at the end:** `π[len(combined) - 1]` equals the length of the longest border of `combined` — which corresponds to the longest palindromic prefix of `s`.

**Hint 4 — Construct answer:** Let `k = π[last]`. Prepend `reverse(s[k:])` to `s`. Example: `s = "aacecaaa"`, longest palindromic prefix = `"aacecaa"` (length 7), prepend reverse of `"a"` → `"a"`.

**Hint 5 — Why not expand from center?** Center-expansion finds longest palindromic **substring**, not necessarily a **prefix**. The KMP concatenation trick targets prefix palindromes specifically — O(n) vs O(n²) expansion.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** KMP Creative Application — Prefix Palindrome via Concatenation

**How to identify this from the problem statement:**
- "shortest palindrome by prepending" → minimize prepended chars
- equivalent to: find longest palindromic prefix, mirror the rest
- Hard + string construction → KMP on concatenated string

| Keyword / phrase | What it signals |
|---|---|
| "prepend characters" / "shortest palindrome" | Longest palindromic prefix of s |
| "exactly once" / one procedure | Prepend reverse of non-palindromic suffix once |
| palindrome construction | KMP on `s + "#" + reverse(s)` |
| minimize prepended length | Maximize palindromic prefix length |

**Why this pattern works:** In `s + "#" + reverse(s)`, a border of length `k` means `s[0..k-1]` reads the same forward and backward — exactly a palindromic prefix. π gives the longest such `k` in O(n).

**How a strong solver thinks before coding:**
1. *"Shortest palindrome by prepending → longest palindromic prefix."*
2. *"KMP on s + '#' + reverse(s). π[last] = prefix palindrome length."*
3. *"Answer = reverse(s[k:]) + s. O(n)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every prefix, check if palindrome** | O(n²) — KMP gives longest in O(n) |
| **Center expansion for all centers** | Finds substrings, not prefix palindromes — wrong target |
| **Brute prepend all 26 letters recursively** | Exponential — one KMP pass solves it |
| **Reverse entire s and prepend** | Works but over-prepends — not shortest |

**The insight brute force misses:** The longest palindromic prefix of `s` equals the longest border of `s + "#" + reverse(s)`. KMP's π array computes borders in one pass.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Shortest Palindrome #214](https://leetcode.com/problems/shortest-palindrome/) | Prepend to make palindrome | KMP on s + "#" + reverse(s) |
| [Repeated Substring Pattern #459](https://leetcode.com/problems/repeated-substring-pattern/) | Is s a repeat? | KMP π: check if `π[n-1] > 0` and `n % (n - π[n-1]) == 0` |
| [Longest Happy Prefix #1392](https://leetcode.com/problems/longest-happy-prefix/) | Longest proper prefix = suffix | Direct π[n-1] on s |
| [Palindrome Pairs #336](https://leetcode.com/problems/palindrome-pairs/) | Pair words into palindromes | KMP/trie variant — harder |

Today's quest is the **creative KMP capstone** — concatenation extracts palindrome structure from border math.

---

## 📖 Walkthrough

```
s = "aacecaaa"

Step 1: reverse(s) = "aaacecaa"
Step 2: combined = "aacecaaa#aaacecaa"

Build π on combined:

The longest border of combined corresponds to longest palindromic prefix of s.

π[last] = 7  →  s[0..6] = "aacecaa" is a palindrome ✓

Remaining suffix: s[7..] = "a"
Prepend reverse("a") = "a"

Answer: "a" + "aacecaaa" = "aaacecaaa" ✓
```

```
s = "abcd"

combined = "abcd#dcba"
π[last] = 1  →  only "a" is palindromic prefix (length 1)

Remaining: s[1..] = "bcd"
Prepend reverse("bcd") = "dcb"

Answer: "dcb" + "abcd" = "dcbabcd" ✓
```

```
Why "#" separator?

Without separator: s="aba", reverse="aba"
  combined = "abaaba" — border "aba" spans s and reverse falsely

With separator: "aba#aba"
  "#" blocks cross-boundary false borders
  π correctly finds longest palindromic prefix of original s
```

> 💡 **The insight:** KMP doesn't just match patterns — it finds border structure. A palindromic prefix of `s` is a border of `s` glued to `reverse(s)`.

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
    string shortestPalindrome(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        string combined = s + "#" + rev;
        vector<int> pi = buildPi(combined);
        int k = pi.back();

        string prefix = rev.substr(0, s.size() - k);
        return prefix + s;
    }
};
```

### Python
```python
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        rev = s[::-1]
        combined = s + "#" + rev

        pi = [0] * len(combined)
        j = 0
        for i in range(1, len(combined)):
            while j > 0 and combined[i] != combined[j]:
                j = pi[j - 1]
            if combined[i] == combined[j]:
                j += 1
            pi[i] = j

        k = pi[-1]
        return rev[:len(s) - k] + s
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

    public String shortestPalindrome(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        String combined = s + "#" + rev;
        int[] pi = buildPi(combined);
        int k = pi[pi.length - 1];

        return rev.substring(0, s.length() - k) + s;
    }
}
```

**Complexity:** O(n) time · O(n) space (combined string + π)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Shortest palindrome by prepending"** → Find longest palindromic prefix; mirror the rest.
- **KMP creative trick** → `s + "#" + reverse(s)` — π[last] = palindrome prefix length.
- **"#" separator** → Blocks false cross-boundary borders.
- **Answer** → `reverse(s[k:]) + s` where `k = π[last]`.

If you checked every prefix for palindrome in O(n²), you found brute force. The signal was "shortest prepend palindrome" — KMP border on concatenated string.

> 🎯 **Pattern Combo:** KMP prefix function + string concatenation trick. Border math becomes palindrome geometry.

---

*Day 24 checkpoint: recognize KMP signals and transfer to periodicity and border problems. →*
