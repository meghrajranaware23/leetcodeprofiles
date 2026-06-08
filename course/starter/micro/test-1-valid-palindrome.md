# 🎯 Phase 1 Proof — Valid Palindrome

> [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) · Easy · 50 XP

---

You've completed **Setup & Mindset**. Now prove you can apply the skills independently.

**[→ Open Valid Palindrome on LeetCode](https://leetcode.com/problems/valid-palindrome/)**

> ⚔ **Phase proof rule:** Spend at least 10 minutes attempting this on your own. Use your full workflow: read → trace → plan → code. No hints until you've tried.

---

## The Problem

**[Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/)** — see full statement on LeetCode.

**What's being tested:** Phase 1 Synthesis — Combines reading + examples + edge cases from Days 2–4

---

## 💡 Hints

1. Apply the workflow from this phase — don't skip steps
2. Trace all examples on paper first
3. Brute force is acceptable if it passes constraints

---

## 🔍 Strategy Breakdown

**Skill tested:** Phase 1 Synthesis

**Mentor thinking:**
1. *"I've practiced this skill for 5 days — I know the workflow."*
2. *"Read constraints first. List edge cases."*
3. *"Plan on paper. Code second."*

---

<details>
<summary>📖 Solution & Walkthrough</summary>

### C++
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum(): l += 1
            while l < r and not s[r].isalnum(): r -= 1
            if s[l].lower() != s[r].lower(): return False
            l += 1; r -= 1
        return True
```

### Java
```java
class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What a Mentor Would Tell You

- *"Getting this wrong after an honest attempt is fine — note what broke in your workflow."*
- *"Getting this right proves your **process** works, not just your memory."*

---

*1 of 1 phase proof. Claim your phase completion. →*
