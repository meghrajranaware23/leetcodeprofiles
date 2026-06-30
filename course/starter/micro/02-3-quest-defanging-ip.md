<!-- hand-authored -->
# ⚔ Quest: Defanging an IP Address

> **Day 2** · [Defanging an IP Address #1108](https://leetcode.com/problems/defanging-an-ip-address/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Defanging an IP Address on LeetCode](https://leetcode.com/problems/defanging-an-ip-address/)**

> ⚔ **Mentor's rule:** Part ④ today is **output format** — read the expected string character-by-character before coding.

---

## The Problem

Given a valid IPv4 `address`, replace every `.` with `"[.]"`.

**Example 1:**
```
Input: address = "1.1.1.1"
Output: "1[.]1[.]1[.]1"
```

**Example 2:**
```
Input: address = "255.100.50.0"
Output: "255[.]100[.]50[.]0"
```

**Constraints:** Valid IPv4 string (no leading zeros games — guaranteed valid input)

**Output format audit:** Each dot becomes **three characters**: `[`, `.`, `]` — not `"[.]"` as one magic token unless your language has replace.

---

## 💡 Hints

1. Read the output literally: `"1[.]1[.]1[.]1"` has brackets around each dot only
2. Loop character-by-character: if `c == '.'`, append `"[.]"`, else append `c`
3. String replace (Python/Java) is acceptable — but trace Example 1 on paper first
4. No edge-case tricks — valid IPv4 only; focus on exact output string

---

## 🔍 Strategy Breakdown

**Skill practiced today:** Output Format Reading

**Why this problem:** Obvious I/O — rewards careful reading of punctuation in the output spec

---

## ❌ Why Jumping to Code Fails

| Approach | Problem |
|---|---|
| Output `"1.1.1.1"` unchanged | Misread — dots must be defanged |
| Output `"1[.]1.1.1"` (one dot) | Partial transform — trace all four dots |
| Extra spaces in output | LeetCode compares exact strings |
| Skip Example 2 | Longer IP confirms same rule on every dot |

---

## 🔗 Problems That Build the Same Skill

| Problem | Difficulty | Skill |
|---|---|---|
| [Goal Parser Interpretation #1678](https://leetcode.com/problems/goal-parser-interpretation/) | Easy | String output rules |
| [License Key Formatting #482](https://leetcode.com/problems/license-key-formatting/) | Easy | Transform string to spec |
| [Reformat Phone Number #1694](https://leetcode.com/problems/reformat-phone-number/) | Easy | Walk chars, build output |

---

## 📖 Walkthrough

**Example 1:** `"1.1.1.1"`

| char | action | result so far |
|------|--------|---------------|
| 1 | append | `1` |
| . | append `[.]` | `1[.]` |
| 1 | append | `1[.]1` |
| ... | repeat | `1[.]1[.]1[.]1` |

**Plain English:** Walk the string; every `.` becomes `[.]`.

---

## Solution

### C++
```cpp
class Solution {
public:
    string defangIPaddr(string address) {
        string res;
        for (char c : address) res += (c == '.') ? "[.]" : string(1, c);
        return res;
    }
};
```

### Python
```python
class Solution:
    def defangIPaddr(self, address: str) -> str:
        return address.replace('.', '[.]')
```

### Java
```java
class Solution {
    public String defangIPaddr(String address) {
        return address.replace(".", "[.]");
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"This problem looks trivial — that's the point. I practiced reading exact output."*
- *"Tracing one character at a time prevented a half-defanged string."*
- *"Tomorrow I trace numbers; today I trace punctuation."*

> 🎯 **Skill practiced:** Output Format Reading

---

*Two quests down. Move to today's checkpoint. →*
