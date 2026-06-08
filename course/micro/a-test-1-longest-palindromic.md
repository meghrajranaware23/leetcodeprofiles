# ⚔ A-Rank Test — Problem 1

> [Longest Palindromic Substring #5](https://leetcode.com/problems/longest-palindromic-substring/) · **Medium** · 250 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Longest Palindromic Substring on LeetCode](https://leetcode.com/problems/longest-palindromic-substring/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **Your first A-Rank test.** This is a **pattern selection** problem — three elite string techniques can solve it. The skill is picking the right one for the constraints, not memorizing one approach.

---

## The Problem

Given a string `s`, return the **longest palindromic substring** in `s`.

```
Input:  s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Input:  s = "cbbd"
Output: "bb"

Input:  s = "a"
Output: "a"
```

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern selection among expand-around-center, KMP/LPS, and Rabin-Karp rolling hash — then executing the chosen approach cleanly.

**Hint 1 — Palindrome geometry:** A palindrome reads the same forward and backward. Every palindrome has a **center** — either a single character (odd length) or between two characters (even length). Expand outward from each center while characters match.

**Hint 2 — Expand around center:** For each index `i`, try two centers: `(i, i)` for odd and `(i, i+1)` for even. Expand `left` and `right` while `s[left] == s[right]`. Track the longest span seen. O(n²) time, O(1) space — the cleanest fit for this problem.

**Hint 3 — KMP / LPS alternative:** Build the string `T = s + "#" + reverse(s)` and compute the **longest prefix-suffix (LPS)** array on `T`. The LPS value at the last index gives the longest palindrome ending at the end of `s`. For the **longest anywhere**, you'd need LPS at every position or Manacher's — heavier than expand-around-center for this exact ask.

**Hint 4 — Rolling hash alternative:** Binary search the answer length `L`, then check every substring of length `L` with Rabin-Karp forward and reverse hashes. O(n log n) average — powerful when you need palindrome checks on many substrings, but overkill when you only need the single longest.

**Hint 5 — Edge cases:** Single character → return `s[0]`. All same character → entire string. Two characters → return the longer palindrome (`"aa"` or `"a"`). Tie on length → any valid longest substring is accepted.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Expand-Around-Center (primary) · KMP/LPS or Rabin-Karp (alternatives)

| Clue in the problem | What it signals |
|---|---|
| "longest palindromic substring" | Palindrome expansion from centers — not brute-force every substring |
| single string, find substring | Center-based expansion or LPS preprocessing |
| Medium + no pattern given | **Pattern selection test** — three valid families, pick by simplicity |
| return the substring itself | Must track start index and length, not just a number |
| O(n²) acceptable for Medium | Expand-around-center wins on clarity; hash/KMP for harder variants |

**How to identify from the statement:** "Longest palindromic substring" → **expand from every center** (odd + even). Reach for KMP when the problem ties palindromes to prefix-suffix structure (e.g., shortest palindrome by adding chars). Reach for rolling hash when you need many palindrome-length checks at scale.

**How a strong solver thinks before coding:**
1. *"Palindrome → symmetric around a center → expand left/right."*
2. *"n centers × O(n) expansion → O(n²) — fine for Medium."*
3. *"KMP? Only if LPS on s + reverse(s) is the natural formulation — not here."*
4. *"Rolling hash? Binary search length + hash compare — heavier setup for this ask."*
5. *"Pick expand-around-center — simplest correct solution."*

### Pattern Selection Matrix

| Approach | Time | Space | Best when... |
|---|---|---|---|
| **Expand around center** | O(n²) | O(1) | Find longest palindromic **substring** in one pass — **this problem** |
| **KMP / LPS** | O(n) | O(n) | Palindrome tied to prefix-suffix overlap — shortest palindrome, repeated pattern |
| **Rabin-Karp + binary search** | O(n log n) avg | O(n) | Many palindrome checks, longest duplicate substring, repeated DNA |
| **Brute force all substrings** | O(n³) | O(1) | Never — TLE on moderate inputs |

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring, verify palindrome** | O(n³) — TLE on strings of length 1000+ |
| **Reverse string, find longest common substring** | LCS ≠ longest palindromic substring — `"abcba"` vs `"abc"` trap |
| **KMP on raw `s` without the right construction** | LPS alone on `s` doesn't locate the longest palindrome anywhere in the string |
| **Rolling hash without reverse hash** | Forward hash match ≠ palindrome — must compare forward and backward fingerprints |
| **Expand from one center only** | Misses even-length palindromes like `"bb"` in `"cbbd"` |

**The insight brute force misses:** Every palindrome is fully determined by its center. Two expansions per index (odd + even) cover all candidates in O(n²) without building auxiliary strings or hash tables.

---

## 🎯 Transfer to Unseen Problems

Can you pick the right palindrome technique on unfamiliar wording?

**Scenario 1:** *"Given a string, return the shortest palindrome you can form by adding characters to the front only."*

Which pattern? **KMP / LPS** (Day 24). Build `s + "#" + reverse(s)`, LPS at end tells you how much of `s` is already a suffix-palindrome — prepend the reverse of the remainder.

**Scenario 2:** *"Given a string, find the longest duplicate substring that appears at least twice."*

Which pattern? **Rabin-Karp rolling hash** (Day 23). Binary search length + rolling hash to detect repeated substrings — not center expansion.

**Scenario 3:** *"Given a string, count how many palindromic substrings it contains."*

Which pattern? **Expand-around-center** (same as this problem). Every successful expansion at a center counts one palindrome — increment a counter instead of tracking max length.

> **Answer key:** Scenario 1 → KMP/LPS (Day 24). Scenario 2 → Rabin-Karp (Day 23). Scenario 3 → expand-around-center. Signal: **"longest palindromic substring"** → expand from centers; upgrade to KMP or hash only when the problem structure demands it.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
s = "babad"
```

Expand from each center. Key expansions:

| Center | Type | Expansion | Palindrome | Length |
|--------|------|-----------|------------|--------|
| index 0 | odd (0,0) | `b` | `"b"` | 1 |
| index 1 | odd (1,1) | `b-a-b` | `"bab"` | **3** ← max |
| index 2 | odd (2,2) | `a` | `"a"` | 1 |
| index 1 | even (1,2) | `ab` — stop | — | — |
| index 2 | even (2,3) | `ba` — stop | — | — |

**Answer: `"bab"`** (or `"aba"` — both valid) ✓

```
s = "cbbd"
```

| Center | Type | Expansion | Palindrome | Length |
|--------|------|-----------|------------|--------|
| index 1 | even (1,2) | `b-b` | `"bb"` | **2** ← max |

**Answer: `"bb"`** ✓

### Expand helper

```text
expand(left, right):
  while left >= 0 and right < n and s[left] == s[right]:
    left--, right++
  return (left + 1, right - 1)  // inclusive bounds of palindrome
```

### C++
```cpp
class Solution {
    pair<int,int> expand(const string& s, int l, int r) {
        while (l >= 0 && r < (int)s.size() && s[l] == s[r]) { l--; r++; }
        return {l + 1, r - 1};
    }
public:
    string longestPalindrome(string s) {
        int bestL = 0, bestLen = 1;
        for (int i = 0; i < (int)s.size(); i++) {
            auto [l1, r1] = expand(s, i, i);
            auto [l2, r2] = expand(s, i, i + 1);
            if (r1 - l1 + 1 > bestLen) { bestL = l1; bestLen = r1 - l1 + 1; }
            if (r2 - l2 + 1 > bestLen) { bestL = l2; bestLen = r2 - l2 + 1; }
        }
        return s.substr(bestL, bestLen);
    }
};
```

### Python
```python
class Solution:
    def expand(self, s: str, l: int, r: int) -> tuple[int, int]:
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1

    def longestPalindrome(self, s: str) -> str:
        best_l, best_len = 0, 1
        for i in range(len(s)):
            l1, r1 = self.expand(s, i, i)
            l2, r2 = self.expand(s, i, i + 1)
            if r1 - l1 + 1 > best_len:
                best_l, best_len = l1, r1 - l1 + 1
            if r2 - l2 + 1 > best_len:
                best_l, best_len = l2, r2 - l2 + 1
        return s[best_l:best_l + best_len]
```

### Java
```java
class Solution {
    private int[] expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        return new int[]{l + 1, r - 1};
    }

    public String longestPalindrome(String s) {
        int bestL = 0, bestLen = 1;
        for (int i = 0; i < s.length(); i++) {
            int[] odd = expand(s, i, i);
            int[] even = expand(s, i, i + 1);
            if (odd[1] - odd[0] + 1 > bestLen) { bestL = odd[0]; bestLen = odd[1] - odd[0] + 1; }
            if (even[1] - even[0] + 1 > bestLen) { bestL = even[0]; bestLen = even[1] - even[0] + 1; }
        }
        return s.substring(bestL, bestL + bestLen);
    }
}
```

**Complexity:** O(n²) time · O(1) extra space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Longest palindromic substring"** → Expand around every center — odd and even (pattern selection: simplest correct tool).
- **"Could I use KMP?"** → Only when LPS on a constructed string answers the question directly (shortest palindrome, prefix-suffix overlap).
- **"Could I use rolling hash?"** → When you need repeated substring detection or binary-search palindrome length at scale — not the first pick here.

A-Rank starts with judgment, not memorization. Three elite string patterns can touch palindromes — the test is knowing which one the problem is actually asking for.

---

*Problem 1 complete. Proceed to Problem 2. →*
