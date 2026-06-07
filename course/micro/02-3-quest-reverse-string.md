# ⚔ Quest: Reverse String

> **Day 2** · [Reverse String #344](https://leetcode.com/problems/reverse-string/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reverse String on LeetCode](https://leetcode.com/problems/reverse-string/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Write a function that reverses a string in-place. The input is given as an array of characters.

```
Input:  ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Input:  ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```

---

## 💡 Hints

This is the most fundamental two-pointer problem on strings. Use pointers from both ends, swapping toward the center.

Stop when the left pointer meets or crosses the right pointer.

---

## 📖 Walkthrough

Two pointers start at opposite ends and swap their way inward:

```
["h", "e", "l", "l", "o"]
  L                    R

Swap h ↔ o:  ["o", "e", "l", "l", "h"]
              L++              R--

Swap e ↔ l:  ["o", "l", "l", "e", "h"]
                   L++    R--

L >= R → done ✓
```

> 💡 **The insight:** This is the same two-pointer converge pattern used for palindrome checking — but instead of comparing, you swap.

---

## Solution

### C++
```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};
```

### Python
```python
class Solution:
    def reverseString(self, s: list[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
```

### Java
```java
class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}
```

**Complexity:** O(n) time · O(1) space

> 🎯 **Pattern Unlocked:** Two-pointer swap from both ends — the building block for palindrome checks, reversal tricks, and partitioning. You'll use this pattern constantly.

---

*Both quests complete! Time for your Day 2 checkpoint. →*
