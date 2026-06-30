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

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Two Pointers Converging with Swap

**How to identify this from the problem statement:**
- "reverse in-place" → swap elements from both ends moving toward center
- "array of characters" → strings are arrays; same two-pointer technique applies
- No extra space allowed → confirms swap-based reversal

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "mirror" | Two pointers + swap |
| "in-place" | No new array — swap in the original |
| "both ends toward center" | `left++`, `right--` until they meet |

**Why this pattern works:** Reversing is symmetric swapping. Each swap fixes two positions; n/2 swaps total.

**How a strong solver thinks before coding:**
1. *"Reverse in-place → left at 0, right at n-1, swap and converge."*
2. *"Same skeleton as palindrome check — but swap instead of compare."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **New array, copy elements in reverse order** | Violates in-place — O(n) extra space |
| **`s[::-1]` or built-in reverse** | Solves it, but doesn't train the pattern used in follow-ups |
| **Shift every element right one-by-one** | O(n²) — each shift rewrites the whole array |
| **Stack to pop characters in reverse** | O(n) extra space; overkill for a swap problem |

**The insight brute force misses:** Reversing is symmetric swapping. Each swap fixes two positions; n/2 swaps total — no copy, no stack, no language shortcut.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Reverse Vowels of a String #345](https://leetcode.com/problems/reverse-vowels-of-a-string/) | Skip non-vowels, swap vowels | Two pointers converging + skip |
| [Reverse String II #541](https://leetcode.com/problems/reverse-string-ii/) | Reverse every 2k chars | Swap within sub-ranges |
| [Reverse Words in a String III #557](https://leetcode.com/problems/reverse-words-in-a-string-iii/) | Reverse per word | Two pointers per segment |

This is the simplest two-pointer problem — every string reversal variant builds on this skeleton.

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

---

## 💭 What Should Have Clicked in Your Mind?

- **"Reverse in-place"** → Two pointers from both ends, swap inward.
- **"This is the simplest two-pointer problem"** → Master this skeleton; palindromes and partitioning build on it.
- **"Stop when left >= right"** → Handles odd/even length automatically.

Memorizing `s[::-1]` doesn't train pattern recognition. The skill is seeing "reverse" and immediately drawing two converging arrows.

> 🎯 **Pattern Unlocked:** Two-pointer swap from both ends — the building block for palindrome checks, reversal tricks, and partitioning. You'll use this pattern constantly.

---

*Both quests complete! Time for your Day 2 checkpoint. →*
