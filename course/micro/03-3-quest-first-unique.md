# ⚔ Quest: First Unique Character

> **Day 3** · [First Unique Character in a String #387](https://leetcode.com/problems/first-unique-character-in-a-string/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open First Unique Character on LeetCode](https://leetcode.com/problems/first-unique-character-in-a-string/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string `s`, find the first non-repeating character and return its index. If none exists, return `-1`.

```
Input:  s = "leetcode"
Output: 0           (← 'l' is the first unique character)

Input:  s = "aabb"
Output: -1          (← no unique characters)
```

---

## 💡 Hints

This needs TWO passes. Why can't you find the answer in one pass?

In Pass 2, iterate the *string* (not the frequency array) to preserve positional order.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Two-Pass Frequency Counting

**How to identify this from the problem statement:**
- "first non-repeating" → you need **position**, not just existence — order matters
- "find the index" → count first, then scan the original string in order
- one pass can't do both → you need Pass 1 (count) + Pass 2 (query in order)

| Keyword / phrase | What it signals |
|---|---|
| "first unique" / "non-repeating" | Two-pass frequency |
| "return index" | Second pass must walk the string, not the freq array |
| "appears only once" | freq[c] == 1 is the query |

**Why this pattern works:** The frequency array knows *how many* but not *where*. The second pass through the original string preserves left-to-right order.

**How a strong solver thinks before coding:**
1. *"First unique → count everything, then scan string left to right."*
2. *"Pass 2 iterates s, not freq — that's how 'first' is defined."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each character, count occurrences with inner loop** | O(n²) — re-counts the entire string for every position |
| **One pass: return first char you haven't seen** | Wrong — a char seen at index 0 may repeat later; you need full counts first |
| **Iterate freq array a→z for first count == 1** | Returns alphabetically first, not **leftmost in the string** |
| **Hash map only, no second pass** | Map doesn't preserve input order for "first" |

**The insight brute force misses:** "First" is defined by **position in the original string**, not by character value. Count everything, then walk the string in order.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) | Compare two strings by composition | Count then check all zeros |
| [Find the Difference #389](https://leetcode.com/problems/find-the-difference/) | One extra char in longer string | Count then query |
| [Majority Element #169](https://leetcode.com/problems/majority-element/) | Element appearing > n/2 times | Count then scan (or voting) |

Same skeleton: **Pass 1 count → Pass 2 query in original order**.

---

## 📖 Walkthrough

**Pass 1:** Build frequency counts. **Pass 2:** Walk the string and return the first character with count = 1.

```
s = "leetcode"

Pass 1 — Build frequencies:
  l:1  e:3  t:1  c:1  o:1  d:1

Pass 2 — Find first with freq == 1:
  Index 0: 'l' → freq = 1 → FOUND!
```

> 💡 **The insight:** In Pass 2, iterate the *string* (not the frequency array) to preserve positional order. This is a subtle but critical detail.

---

## Solution

### C++
```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        int freq[26] = {0};
        for (char c : s) freq[c - 'a']++;
        for (int i = 0; i < s.size(); i++) {
            if (freq[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord('a')] += 1
        for i, c in enumerate(s):
            if freq[ord(c) - ord('a')] == 1:
                return i
        return -1
```

### Java
```java
class Solution {
    public int firstUniqChar(String s) {
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++)
            freq[s.charAt(i) - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

- **"First"** → Order matters. You can't answer from the frequency array alone.
- **"Unique"** → freq[c] == 1. Build counts in Pass 1.
- **"Two-pass is OK"** → Still O(n). Don't overcomplicate with one-pass tricks at E-Rank.

The pattern family is: **count → query in original order**. This appears in "first missing positive," "first repeated," and more.

> 🎯 **Pattern Unlocked:** Two-pass frequency counting — build counts first, then query in order. The order of the second pass determines what "first" means.

---

*Both quests done! Checkpoint time. →*
