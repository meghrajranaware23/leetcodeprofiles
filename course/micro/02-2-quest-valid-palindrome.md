# ⚔ Quest: Valid Palindrome

> **Day 2** · [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Valid Palindrome on LeetCode](https://leetcode.com/problems/valid-palindrome/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Return `true` if it's a palindrome.

```
Input:  "A man, a plan, a canal: Panama"
Output: true   ("amanaplanacanalpanama" → palindrome ✓)

Input:  "race a car"
Output: false  ("raceacar" → not a palindrome)
```

---

## 💡 Hints

Don't create a cleaned string first. Can you use two pointers that skip non-alphanumeric characters on the fly?

Compare lowercase versions of characters at the left and right pointers after skipping invalid characters.

---

## 📖 Walkthrough

Two pointers converge from both ends, skipping non-alphanumeric characters and comparing lowercase versions:

```
"A man, a plan, a canal: Panama"
 L                            R

 L='A' → alnum → lowercase → 'a'
 R='a' → alnum → lowercase → 'a'
 'a' == 'a' ✓ → L++, R--
 ... skip spaces and punctuation ...
 All pairs match → true ✓
```

> 💡 **The insight:** Processing in-place with two pointers avoids O(n) extra space from creating a cleaned copy.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True
```

### Java
```java
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
                return false;
            left++;
            right--;
        }
        return true;
    }
}
```

**Complexity:** O(n) time · O(1) space

> 🎯 **Pattern Unlocked:** Two pointers with skip logic for filtering characters in-place. No need to clean the string first.

---

*Next quest: reversing words requires a familiar trick from Day 1. →*
