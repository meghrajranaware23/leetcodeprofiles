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

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Two Pointers (Opposing Ends) with Skip Logic

**How to identify this from the problem statement:**
- "palindrome" → compare characters from **both ends** moving inward
- "alphanumeric only" → skip invalid characters instead of cleaning the string first
- "case-insensitive" → normalize case at comparison time

| Keyword / phrase | What it signals |
|---|---|
| "palindrome" / "reads same backward" | Two pointers: left++ and right-- |
| "ignore non-alphanumeric" | Skip logic inside the pointer loop |
| "case-insensitive" | Compare `tolower(s[L])` vs `tolower(s[R])` |
| "return true/false" | Early exit on first mismatch |

**Why this pattern works:** A palindrome is symmetric around the center. Two pointers meet in the middle — no reversal, no extra string, O(1) space.

**How a strong solver thinks before coding:**
1. *"Palindrome → two pointers from both ends."*
2. *"Skip junk characters on the fly — don't build a cleaned copy."*
3. *"Mismatch → return false immediately."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build cleaned string, then compare** | O(n) extra space + two passes — works but misses the pattern |
| **Reverse the cleaned string, compare to original** | Same — allocates memory unnecessarily |
| **Single pointer from left only** | Can't check symmetry without a right pointer |
| **Regex replace all non-alphanumeric, then check** | Still builds a new string; interviewers want O(1) space |

**The insight brute force misses:** A palindrome is symmetric around the center. Two pointers meet in the middle — skip junk **inside the loop**, compare lowercase at both ends, exit early on mismatch.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Valid Palindrome II #680](https://leetcode.com/problems/valid-palindrome-ii/) | Allow one character removal | Two pointers + one allowed skip |
| [Reverse String #344](https://leetcode.com/problems/reverse-string/) | Swap instead of compare | Two pointers converging |
| [Reverse Vowels of a String #345](https://leetcode.com/problems/reverse-vowels-of-a-string/) | Skip non-vowels, swap vowels | Two pointers + skip logic |

Master the skip-and-compare skeleton here — it appears in harder palindrome variants.

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

---

## 💭 What Should Have Clicked in Your Mind?

- **"Palindrome"** → Two pointers. Not reverse-and-compare.
- **"Alphanumeric only"** → Skip, don't filter into a new string.
- **"Case-insensitive"** → Lowercase both sides at compare time.

If you built a cleaned string first, you solved it — but you missed the O(1) space pattern that appears in dozens of follow-up problems.

> 🎯 **Pattern Unlocked:** Two pointers with skip logic for filtering characters in-place. No need to clean the string first.

---

*Next quest: reversing words requires a familiar trick from Day 1. →*
