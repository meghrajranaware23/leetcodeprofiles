<!-- hand-authored -->
# ⚔ Quest: Valid Parentheses

> **Day 14** · [Valid Parentheses #20](https://leetcode.com/problems/valid-parentheses/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Valid Parentheses on LeetCode](https://leetcode.com/problems/valid-parentheses/)**

> ⚔ **Mentor's rule:** Set a **20-minute timer**. Full workflow under pressure — read, trace, code.

---

## The Problem

Given a string `s` containing just `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```

**Example 3:**
```
Input: s = "(]"
Output: false
```

**Constraints:** `1 <= s.length <= 10^4`, `s` consists of parentheses only

---

## 💡 Hints

1. Stack of open brackets
2. On close: stack must be non-empty and top matches
3. End: stack must be empty
4. Trace `"(]"` — `(` pushed, `]` mismatch → false

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

**Failure trace `"(]"`:**
```
( → push
] → top is '(' but need ')' → false
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
- *"Empty stack at end — I almost returned true with unmatched opens."*
- *"string-parse + stack preview — full stack lesson in later packs."*

> 🎯 **Skill practiced:** Stack Intro

---

*One quest down. The next one builds on this skill. →*
