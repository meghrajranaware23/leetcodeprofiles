<!-- hand-authored -->
# ⚔ Quest: Add Binary

> **Day 14** · [Add Binary #67](https://leetcode.com/problems/add-binary/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/add-binary/)**

---

## The Problem

Add two binary strings. Return sum as binary string.

**Example:** `a = "11", b = "1"` → `"100"`

---

## 💡 Hints

1. Add from right with carry (like Plus One Day 4)
2. While digits or carry remain, append sum%2, carry/=2
3. Reverse result string

---

## Solution

### C++
```cpp
class Solution {
public:
    string addBinary(string a, string b) {
        string res;
        int i = a.size()-1, j = b.size()-1, carry = 0;
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';
            res.push_back('0' + sum % 2);
            carry = sum / 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

### Python
```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        i, j, carry, res = len(a)-1, len(b)-1, 0, []
        while i >= 0 or j >= 0 or carry:
            s = carry
            if i >= 0: s += int(a[i]); i -= 1
            if j >= 0: s += int(b[j]); j -= 1
            res.append(str(s % 2))
            carry = s // 2
        return ''.join(reversed(res))
```

### Java
```java
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder res = new StringBuilder();
        int i = a.length()-1, j = b.length()-1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += a.charAt(i--) - '0';
            if (j >= 0) sum += b.charAt(j--) - '0';
            res.append(sum % 2);
            carry = sum / 2;
        }
        return res.reverse().toString();
    }
}
```

**Complexity:** O(max(m,n)) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Carry from Day 4 Plus One — interview-style careful implementation."*

> 🎯 **Skill practiced:** Interview Implementation

---

*Two quests down. Move to today's checkpoint. →*
