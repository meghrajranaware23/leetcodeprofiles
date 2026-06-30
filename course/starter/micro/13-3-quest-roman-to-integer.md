<!-- hand-authored -->
# ⚔ Quest: Roman to Integer

> **Day 13** · [Roman to Integer #13](https://leetcode.com/problems/roman-to-integer/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Roman to Integer on LeetCode](https://leetcode.com/problems/roman-to-integer/)**

> ⚔ **Mentor's rule:** Tag **string-parse** before coding. Trace `"IV"` and `"MCMXCIV"` on paper.

---

## The Problem

Given a Roman numeral string `s`, convert it to an integer.

**Example 1:**
```
Input: s = "III"
Output: 3
```

**Example 2:**
```
Input: s = "IV"
Output: 4
```

**Example 3:**
```
Input: s = "IX"
Output: 9
```

**Example 4:**
```
Input: s = "LVIII"
Output: 58
```

**Constraints:** `1 <= s.length <= 15`, `s` contains only `'I','V','X','L','C','D','M'`, guaranteed valid Roman numeral in range `[1, 3999]`

---

## 💡 Hints

1. Map letter → value (I=1, V=5, X=10, ...)
2. If current < next, subtract; else add
3. Trace `"IV"`: I=1, V=5, 1<5 → -1+5=4
4. Walk left to right — one pass

---

## 📖 Walkthrough

**Example 2:** `"IV"`

| i | char | next | rule | running sum |
|---|------|------|------|-------------|
| 0 | I (1) | V (5) | 1<5 → subtract | -1 |
| 1 | V (5) | — | add | -1+5=4 |

**Example 4:** `"LVIII"` → L=50, V=5, III=3 → 58

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
- *"string-parse family — walk chars with a simple rule."*
- *"IV and IX both use subtract — tracing one example fixed the pattern."*

> 🎯 **Skill practiced:** Careful Implementation

---

*Two quests down. Move to today's checkpoint. →*
