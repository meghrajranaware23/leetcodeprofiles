# ⚔ Quest: Valid Anagram

> **Day 3** · [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Valid Anagram on LeetCode](https://leetcode.com/problems/valid-anagram/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s` (uses all original letters exactly once).

```
Input:  s = "anagram", t = "nagaram"
Output: true

Input:  s = "rat", t = "car"
Output: false
```

---

## 💡 Hints

You could sort both strings and compare — but that's O(n log n). Can you do it in O(n) using the frequency pattern from the concept lesson?

Try the increment/decrement trick with a single `int[26]` array. Different lengths → instant `false`.

---

## 📖 Walkthrough

Use the **increment/decrement trick** with a single `int[26]` array:

```
Process "anagram":  a:3 n:1 g:1 r:1 m:1
Consume "nagaram":  a:0 n:0 g:0 r:0 m:0  →  All zeros!  ✓
```

> 💡 **The insight:** Different lengths → instant `false`. Skip the counting entirely.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int freq[26] = {0};
        for (int i = 0; i < s.size(); i++) {
            freq[s[i] - 'a']++;
            freq[t[i] - 'a']--;
        }
        for (int i = 0; i < 26; i++) {
            if (freq[i] != 0) return false;
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        freq = [0] * 26
        for i in range(len(s)):
            freq[ord(s[i]) - ord('a')] += 1
            freq[ord(t[i]) - ord('a')] -= 1
        return all(f == 0 for f in freq)
```

### Java
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int count : freq) {
            if (count != 0) return false;
        }
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space (fixed 26-element array)

> 🎯 **Pattern Unlocked:** Single-array increment/decrement to compare two collections in O(n). Beats sorting every time.

---

*Next quest: finding the first character that appears only once. →*
