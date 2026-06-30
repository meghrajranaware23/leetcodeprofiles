<!-- hand-authored -->
# ⚔ Quest: Reverse String

> **Day 6** · [Reverse String #344](https://leetcode.com/problems/reverse-string/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reverse String on LeetCode](https://leetcode.com/problems/reverse-string/)**

> ⚔ **Mentor's rule:** 5-minute attempt. Trace l/r swaps on paper — log stuck point before hints.

---

## The Problem

Reverse char array **in-place**.

**Example:** `["h","e","l","l","o"]` → `["o","l","l","e","h"]`

**Constraints:** `1 <= s.length <= 10^5`, O(1) extra space

---

## 💡 Hints

1. Two pointers: `l=0`, `r=n-1`, swap, move inward
2. Trace: swap h↔o, then e↔l, stop at middle
3. In-place means no second array

---

## 📖 Walkthrough

| step | l | r | after swap |
|------|---|---|------------|
| 1 | h | o | o l l e h |
| 2 | e | l | o l l e h |
| done | l>=r | | |

---

## Solution

### C++
```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) swap(s[l++], s[r--]);
    }
};
```

### Python
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        s.reverse()
```

### Java
```java
class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while (l < r) { char t = s[l]; s[l++] = s[r]; s[r--] = t; }
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Two pointers are just tracing from both ends — I attempted 5 min before hints."*
- *"I logged: stuck at swap loop condition — then fixed it."*
- *"In-place means no second array — O(1) space was in the constraints."*

> 🎯 **Skill practiced:** In-Place Manipulation

---

*One quest down. The next one builds on this skill. →*
