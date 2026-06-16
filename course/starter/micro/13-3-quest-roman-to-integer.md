<!-- hand-authored -->
# ⚔ Quest: Roman to Integer

> **Day 13** · [Roman to Integer #13](https://leetcode.com/problems/roman-to-integer/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/roman-to-integer/)**

---

## The Problem

Convert Roman numeral to integer.

**Example:** `"III"` → `3`, `"IV"` → `4`, `"MCMXCIV"` → `1994`

---

## 💡 Hints

1. Map letter → value
2. If current < next, subtract; else add
3. Trace `"IV"`: I=1, V=5, 1<5 → -1+5=4

---

## Solution

### C++
```cpp
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char,int> m = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
        int ans = 0;
        for (int i = 0; i < s.size(); i++) {
            if (i + 1 < s.size() && m[s[i]] < m[s[i+1]]) ans -= m[s[i]];
            else ans += m[s[i]];
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def romanToInt(self, s: str) -> int:
        m = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
        ans = 0
        for i, ch in enumerate(s):
            if i + 1 < len(s) and m[ch] < m[s[i+1]]: ans -= m[ch]
            else: ans += m[ch]
        return ans
```

### Java
```java
class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> m = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
        int ans = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && m.get(s.charAt(i)) < m.get(s.charAt(i+1))) ans -= m.get(s.charAt(i));
            else ans += m.get(s.charAt(i));
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Left-to-right with subtract rule — careful implementation practice."*

> 🎯 **Skill practiced:** Careful Implementation

---

*Two quests down. Move to today's checkpoint. →*
