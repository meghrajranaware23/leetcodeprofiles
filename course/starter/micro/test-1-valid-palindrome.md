<!-- hand-authored -->
# 🎯 Phase 1 Proof — Valid Palindrome

> [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) · Easy · 50 XP

---

You've completed **Setup & Mindset**. Prove you can apply Days 2–4 together: **reading → tracing → edge cases**.

**[→ Open Valid Palindrome on LeetCode](https://leetcode.com/problems/valid-palindrome/)**

> ⚔ **Phase proof rule:** 10-minute honest attempt. Full workflow. Hints only after.

---

## The Problem

Given string `s`, return `true` if it is a palindrome after converting to lowercase and removing non-alphanumeric characters.

**Example 1:** `"A man, a plan, a canal: Panama"` → `true`

**Example 2:** `"race a car"` → `false`

**Example 3:** `" "` → `true` (empty after cleanup)

**Constraints:** `1 <= s.length <= 2 * 10^5`

---

## 💡 Hints

> 🎯 **What's being tested:** Phase 1 synthesis — **Day 2** reading (output boolean, cleanup rules), **Day 3** trace Example 1 letters only, **Day 4** edge case empty string after cleanup.

**Hint 1 (Day 2 — reading):** Ignore punctuation and spaces; compare lowercase letters only. Example 2 fails because `"raceacar"` ≠ reverse.

**Hint 2 (Day 3 — trace):** Strip Example 1 to `amanaplanacanalpanama` — reads same both ways.

**Hint 3 (Day 4 — edge cases):** `" "` → empty string → true. Single char → true.

**Hint 4 (approach):** Two pointers from both ends, skip non-alphanumeric, compare lowercase.

---

## 🔍 Strategy Breakdown

**Skills synthesized:**

| Day | Skill applied |
|-----|---------------|
| Day 2 | Read cleanup rules before coding |
| Day 3 | Trace cleaned string on paper |
| Day 4 | Edge case: empty after cleanup |
| Day 5 | Two-pointer plan on paper first |

**Two-pointer cleanup trace (Example 1 excerpt):**
```
cleaned mental model: a ... panama
l→ 'a'  r→ 'a'  match, move inward
... skip ',' ' ' ':' ...
```

---

## ❌ Why Jumping to Code Fails

| Mistake | Phase 1 skill violated |
|---------|------------------------|
| Compare raw string with punctuation | Day 2 reading |
| Forget `" "` → true | Day 4 edge cases |
| No paper trace of cleaned chars | Day 3 tracing |

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

- *"This felt like Day 2 reading + Day 3 tracing on one problem — that's the point."*
- *"Two pointers are just tracing from both ends — I planned on paper first (Day 5)."*

---

*Phase 1 proof complete. Claim phase completion. →*

## Solution

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
