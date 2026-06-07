# ⚔ Quest: First Unique Character

> **Day 3** · LeetCode #387 · Easy · 10 min

---

## The Mission

Given a string `s`, find the first non-repeating character and return its index. If none exists, return `-1`.

```
Input:  s = "leetcode"
Output: 0           (← 'l' is the first unique character)

Input:  s = "aabb"
Output: -1          (← no unique characters)
```

> 🤔 **Before you scroll:** This needs TWO passes. Why can't you find the answer in one pass?

---

## Approach

**Pass 1:** Build frequency counts. **Pass 2:** Walk the string and return the first character with count = 1.

```
s = "leetcode"

Pass 1 — Build frequencies:
  l:1  e:3  t:1  c:1  o:1  d:1

Pass 2 — Find first with freq == 1:
  Index 0: 'l' → freq = 1 → FOUND!
```

> 💡 **The insight:** In Pass 2, iterate the *string* (not the frequency array) to preserve positional order. This is a subtle but critical detail.

---

## Solution

### C++
```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        int freq[26] = {0};
        for (char c : s) freq[c - 'a']++;
        for (int i = 0; i < s.size(); i++) {
            if (freq[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord('a')] += 1
        for i, c in enumerate(s):
            if freq[ord(c) - ord('a')] == 1:
                return i
        return -1
```

### Java
```java
class Solution {
    public int firstUniqChar(String s) {
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++)
            freq[s.charAt(i) - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}
```

**Complexity:** O(n) time · O(1) space

> 🎯 **Pattern Unlocked:** Two-pass frequency counting — build counts first, then query in order. The order of the second pass determines what "first" means.

---

*Both quests done! Checkpoint time. →*
