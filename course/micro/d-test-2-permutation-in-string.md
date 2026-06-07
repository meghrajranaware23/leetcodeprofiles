# ⚔ D-Rank Test — Problem 2

> [Permutation in String #567](https://leetcode.com/problems/permutation-in-string/) · Medium · 100 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Permutation in String on LeetCode](https://leetcode.com/problems/permutation-in-string/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given two strings `s1` and `s2`, return `true` if `s2` contains a **permutation** of `s1`. Otherwise, return `false`.

In other words, return `true` if one of `s1`'s permutations is a substring of `s2`.

```
Input:  s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: "ba" is a permutation of "ab" and a substring of s2.

Input:  s1 = "ab", s2 = "eidboaoo"
Output: false
```

---

## 💡 Hints

> 🎯 **What's being tested:** Fixed-size sliding window (Day 9) + frequency counting (Day 3) — slide a window of `len(s1)` across `s2` and check if window frequencies match `s1`.

Build a frequency map for `s1`. Slide a window of size `len(s1)` across `s2`. At each position, compare window character counts to `s1`'s counts. Use a `matches` counter to avoid re-scanning all 26 letters every step.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed-Size Sliding Window + Frequency Match (Day 9 + Day 3)

| Clue in the problem | What it signals |
|---|---|
| "permutation" / "rearrangement" | Character frequency must match — order doesn't matter |
| "substring of s2" | Contiguous window in the longer string |
| fixed window size = len(s1) | Fixed sliding window — not expand/shrink |
| "contains" / "exists within" | Scan every valid position, return on first match |
| two strings | Frequency array int[26] is ideal for lowercase English |

**How to identify from the statement:** "Permutation in string" = **anagram search in a sliding window**. You already solved anagrams on Day 3 — now the anagram must appear as a contiguous substring of fixed length.

**How a strong solver thinks before coding:**
1. *"Permutation = same character counts → frequency match."*
2. *"Substring of fixed length → fixed window of size len(s1)."*
3. *"Slide one char at a time: add right char, remove left char."*
4. *"Track how many of 26 letters currently match — O(1) check per slide."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all permutations of s1, check each as substring** | O(n! × m) — factorial explosion on s1 length |
| **Check every substring of s2 of length len(s1) by sorting** | O(m × k log k) — re-sorts every window |
| **Nested loops comparing every window char-by-char** | O(m × k) — works but misses the O(m) sliding window optimization |
| **Variable-size window expanding/shrinking** | Wrong window type — permutation length is fixed, not flexible |

**The insight brute force misses:** A permutation has a **fixed length** and **fixed character composition**. Slide a window of that exact size, update counts in O(1) per step, and check match in O(1) with a running counter. No regeneration, no re-sorting.

---

## 🎯 Transfer to Unseen Problems

Can you spot fixed-window frequency matching on unfamiliar wording?

**Scenario 1:** *"Given strings s and p, find all starting indices in s where an anagram of p begins."*

Which pattern? **Fixed sliding window + frequency match** (Find All Anagrams). Same skeleton — collect all indices instead of returning true on first hit.

**Scenario 2:** *"Given an array of integers and integer k, find the maximum sum of any contiguous subarray of length k."*

Which pattern? **Fixed sliding window** (Day 9, numeric). Sum instead of frequency — add new element, subtract leaving element.

**Scenario 3:** *"Given a string, find the length of the longest substring with at most k distinct characters."*

Which pattern? **Variable-size sliding window** (Day 10). Window size changes — different pattern family. "At most k" = expand/shrink, not fixed length.

> **Answer key:** Scenarios 1 and 2 → fixed window. Scenario 3 → variable window (Day 10). The signal is **fixed length** → slide without resizing; **at most / at least / minimum length** → variable window.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

Build a frequency map for `s1`. Slide a window of size `len(s1)` across `s2`. Track how many of the 26 character counts currently match.

```
s1 = "ab"  →  freq = {a:1, b:1}, need = 2 matches

s2 = "eidbaooo"
Window "ei" → no match
Window "id" → no match
Window "db" → no match
Window "ba" → a:1, b:1 match s1 → return true ✓
```

### C++
```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.size() > s2.size()) return false;
        vector<int> freq(26, 0), window(26, 0);
        for (char c : s1) freq[c - 'a']++;
        int k = s1.size(), matches = 0;
        for (int i = 0; i < 26; i++)
            if (freq[i] == 0) matches++;
        for (int i = 0; i < s2.size(); i++) {
            window[s2[i] - 'a']++;
            if (window[s2[i] - 'a'] == freq[s2[i] - 'a']) matches++;
            else if (window[s2[i] - 'a'] == freq[s2[i] - 'a'] + 1) matches--;
            if (i >= k) {
                window[s2[i - k] - 'a']--;
                if (window[s2[i - k] - 'a'] == freq[s2[i - k] - 'a']) matches++;
                else if (window[s2[i - k] - 'a'] == freq[s2[i - k] - 'a'] - 1) matches--;
            }
            if (matches == 26) return true;
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False
        freq = [0] * 26
        window = [0] * 26
        for c in s1:
            freq[ord(c) - ord('a')] += 1
        k = len(s1)
        matches = sum(1 for i in range(26) if freq[i] == 0)
        for i, c in enumerate(s2):
            idx = ord(c) - ord('a')
            window[idx] += 1
            if window[idx] == freq[idx]:
                matches += 1
            elif window[idx] == freq[idx] + 1:
                matches -= 1
            if i >= k:
                left = ord(s2[i - k]) - ord('a')
                window[left] -= 1
                if window[left] == freq[left]:
                    matches += 1
                elif window[left] == freq[left] - 1:
                    matches -= 1
            if matches == 26:
                return True
        return False
```

### Java
```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] freq = new int[26], window = new int[26];
        for (char c : s1.toCharArray()) freq[c - 'a']++;
        int k = s1.length(), matches = 0;
        for (int i = 0; i < 26; i++)
            if (freq[i] == 0) matches++;
        for (int i = 0; i < s2.length(); i++) {
            window[s2.charAt(i) - 'a']++;
            if (window[s2.charAt(i) - 'a'] == freq[s2.charAt(i) - 'a']) matches++;
            else if (window[s2.charAt(i) - 'a'] == freq[s2.charAt(i) - 'a'] + 1) matches--;
            if (i >= k) {
                window[s2.charAt(i - k) - 'a']--;
                if (window[s2.charAt(i - k) - 'a'] == freq[s2.charAt(i - k) - 'a']) matches++;
                else if (window[s2.charAt(i - k) - 'a'] == freq[s2.charAt(i - k) - 'a'] - 1) matches--;
            }
            if (matches == 26) return true;
        }
        return false;
    }
}
```

**Complexity:** O(m + n) time · O(1) space (fixed 26-element arrays)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Permutation"** → Same character counts — frequency match, not order.
- **"Substring of s2"** → Contiguous window — slide it across the longer string.
- **"Fixed length = len(s1)"** → Fixed-size sliding window (Day 9), not variable.

This combines your E-Rank frequency counting with D-Rank's fixed window. The `matches` counter is the optimization that keeps each slide O(1).

---

*2 of 3. One more to go. →*
