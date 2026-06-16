<!-- hand-authored -->
# ⚔ Quest: Valid Parentheses

> **Day 14** · [Valid Parentheses #20](https://leetcode.com/problems/valid-parentheses/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/valid-parentheses/)**

> ⚔ Set a 20-minute timer. Full workflow under pressure.

---

## The Problem

Given string of `()[]{}`, determine if valid.

**Example:** `"()[]{}"` → `true`, `"(]"` → `false`

---

## 💡 Hints

1. Stack of open brackets
2. On close: stack must be non-empty and top matches
3. End: stack empty
4. Trace `"(]"` — `(` pushed, `]` mismatch

---

## 📖 Walkthrough `"()[]{}"`

```
( → push
) → pop match
[ → push
] → pop match
{ → push
} → pop match
stack empty → true
```

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty()) return false;
                char t = st.top(); st.pop();
                if ((c==')'&&t!='(')||(c==']'&&t!='[')||(c=='}'&&t!='{')) return false;
            }
        }
        return st.empty();
    }
};
```

### Python
```python
class Solution:
    def isValid(self, s: str) -> bool:
        st = []
        pairs = {')':'(', ']':'[', '}':'{'}
        for c in s:
            if c in '([{': st.append(c)
            elif not st or st.pop() != pairs[c]: return False
        return not st
```

### Java
```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> st = new ArrayDeque<>();
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        for (char c : s.toCharArray()) {
            if ("([{".indexOf(c) >= 0) st.push(c);
            else if (st.isEmpty() || st.pop() != pairs.get(c)) return false;
        }
        return st.isEmpty();
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"Timer didn't change workflow — read, trace, code."*

> 🎯 **Skill practiced:** Stack Intro

---

*One quest down. The next one builds on this skill. →*
