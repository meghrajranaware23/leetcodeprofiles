# ⚔ Quest: Valid Parentheses

> **Day 14** · [Valid Parentheses #20](https://leetcode.com/problems/valid-parentheses/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Valid Parentheses on LeetCode](https://leetcode.com/problems/valid-parentheses/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Stack Intro**. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement, examples, and constraints on LeetCode.

**[Valid Parentheses #20](https://leetcode.com/problems/valid-parentheses/)**

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Stack Intro

**Why this problem:** Classic stack problem; common interview question at Easy

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about stack intro."*
2. *"Let me trace Example 1 on paper first."*
3. *"What's my brute force? Does it fit the constraints?"*
4. *"Only then do I open my editor."*

---

## ❌ Why Jumping to Code Fails

| Approach | Problem |
|---|---|
| Open editor immediately | You code before understanding — bugs multiply |
| Skip example tracing | You miss edge cases the examples reveal |
| Copy without understanding | You can't re-solve tomorrow without the editorial |
| Give up before 5 minutes | You never build the "attempt first" habit |

> **The insight:** Speed comes from **process**, not from skipping steps.

---

## 🔗 Problems That Build the Same Skill

| Problem | Difficulty | Skill |
|---|---|---|
| [Valid Parentheses #20](https://leetcode.com/problems/valid-parentheses/) | Easy | Stack Intro |

---

## 📖 Walkthrough

Trace Example 1 on paper step by step. Write your brute force in plain English (3 lines). Only then translate to code.

> 💡 **The code is just the paper trace written in syntax.**

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

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Stack Intro

---

*One quest down. The next one builds on this skill. →*
