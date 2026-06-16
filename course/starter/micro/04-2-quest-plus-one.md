<!-- hand-authored -->
# ⚔ Quest: Plus One

> **Day 4** · [Plus One #66](https://leetcode.com/problems/plus-one/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Plus One on LeetCode](https://leetcode.com/problems/plus-one/)**

> ⚔ Write `// Edge cases:` comment first — today's habit.

---

## The Problem

Large integer as digit array. Add 1. Return resulting array.

**Example 1:** `[1,2,3]` → `[1,2,4]`

**Example 2:** `[4,3,2,1]` → `[4,3,2,2]`

**Example 3:** `[9,9,9]` → `[1,0,0,0]`

**Constraints:** `1 <= digits.length <= 100`, digits valid, no leading zeros except `0` itself

**Edge cases from constraints:** all 9s; single digit; no carry (Example 1)

---

## 💡 Hints

1. Process from **right to left**
2. If digit < 9, increment and return immediately
3. If digit == 9, set to 0 and continue carry
4. If carry exits left side, insert 1 at front (Example 3)

---

## 📖 Walkthrough — Example 3

```
[9, 9, 9] + 1

i=2: 9→0 carry
i=1: 9→0 carry
i=0: 9→0 carry
prepend 1 → [1,0,0,0]
```

---

## 🔗 Related

| Problem | Skill |
|---|---|
| [Add Binary #67](https://leetcode.com/problems/add-binary/) | Carry (Day 14) |
| [Length of Last Word #58](https://leetcode.com/problems/length-of-last-word/) | Today's quest 2 |

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};
```

### Python
```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits)-1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits
```

### Java
```java
class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Example 3 is why I read constraints — all 9s is the classic trap."*
- *"I wrote edge cases before code and caught the prepend-1 case."*

> 🎯 **Skill practiced:** Edge Case Thinking

---

*One quest down. The next one builds on this skill. →*
