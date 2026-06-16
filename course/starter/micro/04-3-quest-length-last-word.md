<!-- hand-authored -->
# ⚔ Quest: Length of Last Word

> **Day 4** · [Length of Last Word #58](https://leetcode.com/problems/length-of-last-word/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Length of Last Word on LeetCode](https://leetcode.com/problems/length-of-last-word/)**

---

## The Problem

Return length of last word in string (words separated by spaces).

**Example 1:** `"Hello World"` → `5`

**Example 2:** `"   fly me   to   the moon  "` → `4` ("moon")

**Example 3:** `"luffy is still joyboy"` → `6` ("joyboy")

**Constraints:** At least one word; string contains English letters and spaces

**Edge case from constraints:** **Trailing spaces** — last word is not at `s.length()-1`

---

## 💡 Hints

1. Walk from the **end** — skip trailing spaces first
2. Count characters until next space or start
3. Example 2 exists solely for trailing-space trap
4. `"a"` alone → return 1

---

## 📖 Walkthrough — Example 2

```
"   fly me   to   the moon  "
                              ↑ start at end, skip spaces
                    moon      → length 4
```

---

## Solution

### C++
```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        int i = s.size() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        int end = i;
        while (i >= 0 && s[i] != ' ') i--;
        return end - i;
    }
};
```

### Python
```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        words = s.split()
        return len(words[-1]) if words else 0
```

### Java
```java
class Solution {
    public int lengthOfLastWord(String s) {
        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') i--;
        int end = i;
        while (i >= 0 && s.charAt(i) != ' ') i--;
        return end - i;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"I almost counted trailing spaces — Example 2 saved me."*
- *"Boundary case: start from the end when the trap is at the end."*

> 🎯 **Skill practiced:** Boundary Cases

---

*Two quests down. Move to today's checkpoint. →*
