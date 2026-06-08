# ⚔ Quest: Longest Repeating Character Replacement

> **Day 29** · [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) · Medium · 40 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Repeating Character Replacement on LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English letter.

Return the length of the **longest substring** containing the same letter after performing at most `k` operations.

```
Input:  s = "ABAB", k = 2
Output: 4
        (replace both 'A's with 'B' or both 'B's with 'A')

Input:  s = "AABABBA", k = 1
Output: 4
        (replace one 'A' → "AABBBBA", substring "BBBB" has length 4)

Input:  s = "ABAA", k = 0
Output: 2
```

---

## 💡 Hints

**Variable window (D-Rank Day 10):** Expand `right`, shrink `left` when the window becomes invalid. Track the **maximum valid length** seen.

**Frequency map (E-Rank Day 3):** Maintain `count[c]` for each character in the window. Track `maxFreq` = highest count of any single character in the window.

**The budget rule:** Window `[left..right]` is valid when:
```
(right - left + 1) - maxFreq ≤ k
```
Non-dominant characters need replacement — count them as `windowLen − maxFreq`.

---

## 🔍 Pattern Recognition Breakdown

**Patterns used:** Variable Sliding Window (D-Rank Day 10) + Character Frequency Budget (E-Rank Day 3)

**How to identify this from the problem statement:**
- "longest substring" → variable window, maximize length
- "at most k operations" / "replace k characters" → budget constraint
- "containing the same letter" → one dominant char; rest must be replaced
- uppercase English letters → 26-element freq array works

| Keyword / phrase | What it signals |
|---|---|
| "longest substring" | Variable window — expand/shrink |
| "replace at most k characters" | Budget: `len − maxFreq ≤ k` |
| "same letter" / "repeating character" | Track max frequency in window |
| Medium + string + k budget | Day 10 frame + Day 3 freq map |

**Why this pattern works:** If the window has `maxFreq` copies of the dominant character, at most `windowLen − maxFreq` other characters need replacement. Keep expanding while that count ≤ k.

**How a strong solver thinks before coding:**
1. *"Longest valid substring → variable window (Day 10)."*
2. *"k replacements → valid when len − maxFreq ≤ k."*
3. *"Update freq on expand/shrink. Track global maxLen."*
4. *"maxFreq doesn't need to decrease on shrink — maxLen still correct."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every substring, check if k replacements suffice** | O(n²) — TLE on n = 10⁵ |
| **Try every target character (26) with sliding window** | O(26n) works but freq budget is O(n) and cleaner |
| **Reset window after each invalid step** | Wastes work — only shrink left incrementally |
| **Decrement maxFreq on every shrink** | Unnecessary — answer is max over all valid states |

**The insight brute force misses:** You don't need to know **which** character becomes uniform — only that `maxFreq` of *some* character covers the rest with ≤ k replacements.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | k replacements | Window + freq budget |
| [Max Consecutive Ones III #1004](https://leetcode.com/problems/max-consecutive-ones-iii/) | Binary array, flip k zeros | Same budget: `len − ones ≤ k` |
| [Longest Substring with At Most K Distinct #340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | Distinct count budget | Window + `len(map) ≤ k` |
| [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) | At most 2 types | Window + distinct budget |

#424 is the canonical **freq budget** string window — same skeleton as Max Consecutive Ones III.

---

## 📖 Walkthrough

```
s = "AABABBA",  k = 1
maxLen = 0,  left = 0,  maxFreq = 0,  count = {}

right=0 'A': count={A:1}, maxF=1, len=1, 1−1=0≤1 ✓  maxLen=1
right=1 'A': count={A:2}, maxF=2, len=2, 2−2=0≤1 ✓  maxLen=2
right=2 'B': count={A:2,B:1}, maxF=2, len=3, 3−2=1≤1 ✓  maxLen=3
right=3 'A': count={A:3,B:1}, maxF=3, len=4, 4−3=1≤1 ✓  maxLen=4
right=4 'B': count={A:3,B:2}, maxF=3, len=5, 5−3=2>1 ✗  shrink

  left=0 'A': remove, count={A:2,B:2}, maxF=3, len=4, 4−3=1≤1 ✓  maxLen=4
right=5 'B': count={A:2,B:3}, maxF=3, len=5, 5−3=2>1 ✗  shrink
  left=1 'A': ... continue shrinking until valid

right=6 'A': eventually maxLen stays 4

Answer: 4 ✓
```

> 💡 **The insight:** `maxFreq` can lag after shrinking — that's fine. We only ever **record** length, never rely on current `maxFreq` for a future expand decision beyond validity.

---

## Solution

### C++
```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            count[s[right] - 'A']++;
            maxFreq = max(maxFreq, count[s[right] - 'A']);

            while (right - left + 1 - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

### Python
```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = [0] * 26
        left = max_freq = max_len = 0

        for right, ch in enumerate(s):
            count[ord(ch) - ord('A')] += 1
            max_freq = max(max_freq, count[ord(ch) - ord('A')])

            while right - left + 1 - max_freq > k:
                count[ord(s[left]) - ord('A')] -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
```

### Java
```java
class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);

            while (right - left + 1 - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

**Complexity:** O(n) time · O(1) space (26-letter count array)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Longest substring"** → Variable sliding window (D-Rank Day 10) — expand right, shrink left.
- **"Replace at most k characters"** → Budget constraint, not brute-force try-all-replacement.
- **"Same letter after replacement"** → Keep the dominant character; replace the rest → `len − maxFreq ≤ k`.
- **"Track character counts"** → Frequency map (E-Rank Day 3) — 26-array for uppercase.
- **Cross-domain:** Same skeleton as Max Consecutive Ones III — binary freq budget.

If you checked every substring, you found O(n²). The signal was **longest window + k budget + freq** — Day 10 + Day 3 synthesis.

> 🎯 **Pattern combo:** D-Rank Day 10 (variable window) + E-Rank Day 3 (frequency budget). Valid when `windowLen − maxFreq ≤ k`.

---

*Next: sum unique characters across all substrings — contribution counting on strings. →*
