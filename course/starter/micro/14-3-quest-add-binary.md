<!-- hand-authored -->
# ⚔ Quest: Add Binary

> **Day 14** · [Add Binary #67](https://leetcode.com/problems/add-binary/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Add Binary on LeetCode](https://leetcode.com/problems/add-binary/)**

> ⚔ **Mentor's rule:** Carry from Day 4 Plus One — trace `"11" + "1"` on paper under the timer.

---

## The Problem

Given two binary strings `a` and `b`, return their sum as a binary string.

**Example 1:**
```
Input: a = "11", b = "1"
Output: "100"
```

**Example 2:**
```
Input: a = "1010", b = "1011"
Output: "10101"
```

**Constraints:** `1 <= a.length, b.length <= 10^4`, strings consist only of `'0'` or `'1'`, each string contains no leading zeros except `"0"`

---

## 💡 Hints

1. Add from right with carry (like Plus One Day 4)
2. While digits or carry remain, append sum%2, carry/=2
3. Reverse result string (or prepend)
4. Trace `"11" + "1"`: 1+1=2 → write 0, carry 1 → 1+0+1=10 → `"100"`

---

## 📖 Walkthrough

**Example 1:** `a = "11", b = "1"`

```
right to left:
  1 + 1 = 2 → digit 0, carry 1
  1 + 0 + 1 = 2 → digit 0, carry 1
  carry 1 → digit 1
built reverse: 0,0,1 → reverse → "100"
```

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
- *"Different length strings — loop until both indices and carry are done."*
- *"Built backward, reversed at end — same trick as decimal carry problems."*

> 🎯 **Skill practiced:** Interview Implementation

---

*Two quests down. Move to today's checkpoint. →*
