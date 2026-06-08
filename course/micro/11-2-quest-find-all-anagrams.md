# ⚔ Quest: Find All Anagrams in a String

> **Day 11** · [Find All Anagrams in a String #438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find All Anagrams in a String on LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given two strings `s` and `p`, return **all start indices** of `p`'s anagrams in `s`. An anagram is a permutation — same characters, same counts.

```
Input:  s = "cbaebabacd", p = "abc"
Output: [0, 6]
        ("cba" at index 0, "bac" at index 6)

Input:  s = "abab", p = "ab"
Output: [0, 1, 2]
        ("ab", "ba", "ab")

Input:  s = "aaaaaaa", p = "aaa"
Output: [0, 1, 2, 3, 4]
```

You may return the answer in any order.

---

## 💡 Hints

An anagram of `p` has **exactly the same character counts** as `p`. Every valid window has length `len(p)`.

Build a frequency map for `p`. Slide a window of size `len(p)` across `s`, maintaining a matching frequency map. When the window map equals `p`'s map, record the start index.

Track how many character types are "fully matched" to avoid comparing entire maps every step.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed Sliding Window + Hash Map (Pattern Combo)

**How to identify this from the problem statement:**
- "anagram" / "permutation" → compare multisets via frequency map
- window size is fixed at `len(p)` → fixed window (Day 9), not variable
- "all start indices" → record every valid position

| Keyword / phrase | What it signals |
|---|---|
| "anagram" / "permutation of p" | Frequency map comparison |
| "all starting indices" | Collect every valid window start |
| "substring of s" | Contiguous window — sliding, not sorting |
| fixed length implied by anagram | Window size = `len(p)` |

**Why this pattern works:** Only two characters change per slide — one enters, one exits. Increment/decrement the window map in O(1). Compare to `p`'s map without rebuilding from scratch.

**How a strong solver thinks before coding:**
1. *"Anagram → frequency map. Same pattern as Valid Anagram (Day 3), but on a sliding window."*
2. *"Window size = len(p). Fixed window enter/exit from Day 9."*
3. *"Track matched character types to detect full anagram in O(1)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring of length len(p), sort and compare** | O(n × k log k) — sorting each window is wasteful |
| **Rebuild frequency map from scratch for each start index** | O(n × k) — ignores that adjacent windows share k−1 characters |
| **Use a hash set instead of frequency map** | `"aab"` and `"abb"` have the same set {a,b} but different counts |
| **Variable window when size is fixed** | An anagram of `p` always has length `len(p)` — fixed window is simpler |

**The insight brute force misses:** Adjacent windows differ by exactly two characters. Update counts incrementally — same enter/exit mechanic as Max Average Subarray (Day 9).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Find All Anagrams in a String #438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Collect all start indices | Fixed window + freq map |
| [Permutation in String #567](https://leetcode.com/problems/permutation-in-string/) | Return true if any anagram exists | Same window + map, early exit |
| [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) | Variable window, cover all chars | Window + map, shrink while valid |
| [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) | Full strings, no window | Same frequency comparison (Day 3) |

Day 9's Permutation in String (#567) is nearly identical — today you collect **all** indices instead of returning a boolean.

---

## 📖 Walkthrough

```
s = "cbaebabacd",  p = "abc"
pCount = {a:1, b:1, c:1}    window size = 3

right=0: enter 'c'  win={c:1}           start=0  [cba] no match
right=1: enter 'b'  win={c:1,b:1}       start=0  [cba] matched=3 ✓ → record 0
right=2: enter 'a'  win={c:1,b:1,a:1}   start=0  (already recorded)
right=3: exit 'c', enter 'e'
         win={b:1,a:1,e:1}              start=1  [bae] no match
right=4: exit 'b', enter 'b'
         win={b:1,a:1,e:1}              start=2  [aeb] no match
right=5: exit 'a', enter 'a'
         win={b:1,a:1,e:1}              start=3  [eba] no match
right=6: exit 'e', enter 'b'
         win={b:2,a:1}                  start=4  [bab] no match
right=7: exit 'b', enter 'a'
         win={b:1,a:2}                  start=5  [aba] no match
right=8: exit 'a', enter 'c'
         win={b:1,a:1,c:1}              start=6  [bac] matched=3 ✓ → record 6
right=9: exit 'b', enter 'd'
         win={a:1,c:1,d:1}              start=7  [acd] no match

Answer: [0, 6] ✓
```

> 💡 **The insight:** Fixed window of size `len(p)`. Enter `s[right]`, exit `s[right - len(p)]`. When window counts match `p`'s counts, record `right - len(p) + 1`.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        if (s.size() < p.size()) return {};

        vector<int> pCount(26, 0), winCount(26, 0);
        for (char c : p) pCount[c - 'a']++;

        vector<int> result;
        int matched = 0, k = p.size();

        for (int right = 0; right < (int)s.size(); right++) {
            int idx = s[right] - 'a';
            if (winCount[idx] < pCount[idx]) matched++;
            winCount[idx]++;

            if (right >= k) {
                int leftIdx = s[right - k] - 'a';
                winCount[leftIdx]--;
                if (winCount[leftIdx] < pCount[leftIdx]) matched--;
            }

            if (matched == 26) result.push_back(right - k + 1);
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        if len(s) < len(p):
            return []

        p_count = [0] * 26
        win_count = [0] * 26
        for c in p:
            p_count[ord(c) - ord('a')] += 1

        result = []
        matched = 0
        k = len(p)

        for right in range(len(s)):
            idx = ord(s[right]) - ord('a')
            if win_count[idx] < p_count[idx]:
                matched += 1
            win_count[idx] += 1

            if right >= k:
                left_idx = ord(s[right - k]) - ord('a')
                win_count[left_idx] -= 1
                if win_count[left_idx] < p_count[left_idx]:
                    matched -= 1

            if matched == 26:
                result.append(right - k + 1)

        return result
```

### Java
```java
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (s.length() < p.length()) return result;

        int[] pCount = new int[26], winCount = new int[26];
        for (char c : p.toCharArray()) pCount[c - 'a']++;

        int matched = 0, k = p.length();

        for (int right = 0; right < s.length(); right++) {
            int idx = s.charAt(right) - 'a';
            if (winCount[idx] < pCount[idx]) matched++;
            winCount[idx]++;

            if (right >= k) {
                int leftIdx = s.charAt(right - k) - 'a';
                winCount[leftIdx]--;
                if (winCount[leftIdx] < pCount[leftIdx]) matched--;
            }

            if (matched == 26) result.add(right - k + 1);
        }
        return result;
    }
}
```

**Complexity:** O(n) time · O(1) space (26-letter alphabet)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Anagram"** → Frequency map from Day 3. Compare multisets, not sorted strings.
- **"All starting indices"** → Fixed window of size `len(p)` — Day 9 enter/exit.
- **"Same counts as p"** → Track `matched` types instead of comparing 26 slots every step.
- **Set won't work** → `"aab"` vs `"abb"` need counts, not just presence.

If you sorted each substring, you found O(n × k log k). The signal was "permutation of p" — fixed window + frequency inventory.

> 🎯 **Pattern Combo:** Fixed sliding window + frequency map. Day 9's enter/exit meets Day 3's anagram logic.

---

*Next: longest substring with a distinct-character budget. →*
