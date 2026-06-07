# ⚔ Quest: Longest Substring Without Repeating Characters

> **Day 10** · [Longest Substring Without Repeating Characters #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Substring Without Repeating Characters on LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string `s`, find the length of the **longest substring** without duplicate characters.

```
Input:  s = "abcabcbb"
Output: 3
        ("abc")

Input:  s = "bbbbb"
Output: 1
        ("b")

Input:  s = "pwwkew"
Output: 3
        ("wke")
```

---

## 💡 Hints

This is a **variable sliding window** — expand right to grow the substring. When you see a duplicate, shrink from the left until the duplicate is gone.

You need O(1) duplicate detection. A **hash set** tracking characters currently in the window does exactly that — your first **pattern combo**: sliding window + hash set.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Variable Sliding Window + Hash Set (Pattern Combo)

**How to identify this from the problem statement:**
- "longest substring" → variable window, maximize length
- "without duplicate characters" / "without repeating" → set tracks window membership
- expand right, shrink left when duplicate found → classic longest-valid window

| Keyword / phrase | What it signals |
|---|---|
| "longest substring" / "maximum length" | Variable window, track max |
| "without repeating" / "all unique" / "no duplicates" | Hash set for O(1) membership |
| "contiguous characters" | Two pointers, not sorting |

**Why this pattern works:** The set holds exactly the characters in `[left..right]`. Adding `s[right]` that's already in the set means shrink `left` until it's removed. Each character enters and exits the set once — O(n).

**How a strong solver thinks before coding:**
1. *"Longest substring, no repeats → variable window + set."*
2. *"Expand: add s[right] to set. If duplicate, shrink left until removed."*
3. *"Track max window size at each valid state."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring [i..j], verify uniqueness** | O(n³) or O(n²) — too slow for n = 10⁵ |
| **Sliding window without a set** | Checking uniqueness by scanning the window is O(k) per step → O(n²) |
| **Sort characters and look for runs** | Substring must be **contiguous** in the original string — sorting destroys position |

**The insight brute force misses:** You only need to know if `s[right]` is **already in the current window** — not the entire history. A hash set scoped to `[left..right]` answers that in O(1).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Substring Without Repeating Characters #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Set tracks chars in window | Window + set |
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Allow k replacements | Window + frequency count |
| [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) | Cover all target chars | Window + frequency map (C-Rank) |
| [Contains Duplicate II #219](https://leetcode.com/problems/contains-duplicate-ii/) | Duplicate within distance k | Set + fixed-distance window |

This is your **first pattern combo** — two E-Rank tools (hash set from Day 4 + sliding window from Day 10) working together. C-Rank adds frequency maps to the same skeleton.

---

## 📖 Walkthrough

```
s = "abcabcbb"

right=0 'a': set={a}           len=1  max=1
right=1 'b': set={a,b}         len=2  max=2
right=2 'c': set={a,b,c}       len=3  max=3
right=3 'a': 'a' in set! → shrink
  left=1 remove 'a': set={b,c}  add 'a': set={b,c,a}  len=3  max=3
right=4 'b': 'b' in set! → shrink
  left=2 remove 'b': set={c,a}  add 'b': set={c,a,b}  len=3  max=3
right=5 'c': 'c' in set! → shrink
  left=3 remove 'c': set={a,b}  add 'c': set={a,b,c}  len=3  max=3
right=6 'b': 'b' in set! → shrink
  left=4 remove 'a': set={b,c}  add 'b' — 'b' still in set!
  left=5 remove 'b': set={c}    add 'b': set={c,b}    len=2
right=7 'b': 'b' in set! → shrink
  left=6 remove 'c': set={b}    add 'b' — 'b' in set!
  left=7 remove 'b': set={}    add 'b': set={b}       len=1

max = 3 ✓
```

> 💡 **The insight:** The set is a live snapshot of the window. Duplicate at `right` → evict from `left` until the duplicate is gone.

---

## Solution

### C++
```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> window;
        int left = 0, maxLen = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            while (window.count(s[right])) {
                window.erase(s[left]);                  // SHRINK
                left++;
            }
            window.insert(s[right]);                    // EXPAND
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

### Python
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        window = set()
        left = max_len = 0

        for right in range(len(s)):
            while s[right] in window:
                window.remove(s[left])                  # SHRINK
                left += 1
            window.add(s[right])                        # EXPAND
            max_len = max(max_len, right - left + 1)

        return max_len
```

### Java
```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            while (window.contains(s.charAt(right))) {
                window.remove(s.charAt(left));          // SHRINK
                left++;
            }
            window.add(s.charAt(right));                // EXPAND
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

**Complexity:** O(n) time · O(min(n, alphabet)) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Longest substring without repeating"** → Variable window + hash set. First pattern combo.
- **"Without repeating"** → Set membership check in O(1). Same tool as Contains Duplicate (Day 4).
- **Shrink when invalid** (duplicate found) → Opposite shrink condition from Minimum Subarray Sum.
- **"I don't need to check the whole string history"** → Only characters in `[left..right]` matter.

If you checked every substring for uniqueness, you found O(n²). The signal was "longest contiguous unique characters" — window breathes, set tracks contents.

> 🎯 **Pattern Combo Unlocked:** Sliding window + hash set. Expand right, shrink left, set mirrors the window. This combo appears in dozens of Medium/Hard problems.

---

*Next: checkpoint — prove the variable window instinct is yours. →*
