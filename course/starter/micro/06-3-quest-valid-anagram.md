<!-- hand-authored -->
# ⚔ Quest: Valid Anagram

> **Day 6** · [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Valid Anagram on LeetCode](https://leetcode.com/problems/valid-anagram/)**

> ⚔ **Mentor's rule:** 5-minute attempt. Brute force (sort compare) is valid — log stuck point before hints.

---

## The Problem

Return `true` if `t` is an anagram of `s`.

**Example 1:** `s = "anagram"`, `t = "nagaram"` → `true`

**Example 2:** `s = "rat"`, `t = "car"` → `false`

**Constraints:** Lowercase English letters

---

## 💡 Hints

1. Different lengths → immediate false
2. Brute force: sort both strings and compare
3. Better: count frequency of each letter (26 buckets)
4. Trace Example 2: letter counts don't match

---

## 📖 Walkthrough (frequency)

Count letters in `s`, subtract for `t`. Any negative → false.

---

## 🔗 Related

| Problem | Skill |
|---|---|
| [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) | Frequency |
| [Contains Duplicate #217](https://leetcode.com/problems/contains-duplicate/) | Set membership |

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int cnt[26] = {};
        for (char c : s) cnt[c-'a']++;
        for (char c : t) if (--cnt[c-'a'] < 0) return false;
        return true;
    }
};
```

### Python
```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)
```

### Java
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c-'a']++;
        for (char c : t.toCharArray()) if (--cnt[c-'a'] < 0) return false;
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Sorted compare worked; frequency table is the upgrade I'll learn from editorial."*
- *"Different lengths → immediate false — I checked that before sorting."*
- *"Example 2 (`rat` vs `car`) — letter counts don't match; trace caught it."*

> 🎯 **Skill practiced:** Frequency Counting

---

*Two quests down. Move to today's checkpoint. →*
