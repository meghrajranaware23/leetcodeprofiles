# ⚔ Quest: Substring with Concatenation of All Words

> **Day 25** · [Substring with Concatenation of All Words #30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) · Hard · 50 XP · 28 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Substring with Concatenation of All Words on LeetCode](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are given a string `s` and an array of strings `words`. All strings in `words` have the **same length**. Concatenated in any order, they form a concatenated string whose length is `words.length × words[i].length`.

Return **all starting indices** in `s` where a substring is a concatenation of each word in `words` **exactly once**, in any order, without any intervening characters.

```
Input:  s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0, 9]
        (0: "barfoo", 9: "foobar")

Input:  s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []

Input:  s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6, 9, 12]
```

---

## 💡 Hints

**Hint 1 — Unit of expansion:** Each word has length `L`. A valid window spans `words.length × L` characters. Don't slide character-by-character inside a word — treat `s[i:i+L]` as one token.

**Hint 2 — Frequency map over words:** Build `need[word]` = count of each word in `words`. As the window slides, add/remove whole words and compare counts — same multiset logic as Day 11 anagrams, but keys are substrings.

**Hint 3 — Aligned start positions:** Only indices `0, L, 2L, ...` (or run `L` separate passes with offsets `0..L-1`) can begin a valid concatenation. A window starting at index 1 in `"barfoo"` misaligns word boundaries.

**Hint 4 — Sliding window on word count:** Expand by one word at a time. When `matched_words == words.length`, record the start index. Shrink from the left by one word when the window has too many of some word (count exceeds `need`).

**Hint 5 — Offset trick:** Run the sliding window `L` times — once for each starting offset `0, 1, ..., L-1`. Each pass only checks word-aligned positions within that offset. Covers all valid starts without missing misaligned cases.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Word-Level Sliding Window + Frequency Map

**How to identify this from the problem statement:**
- "concatenation of all words" → every word used exactly once, any order
- "same length" → fixed chunk size L — word is the atomic unit
- "all starting indices" → collect positions, not a single answer
- "without intervening characters" → contiguous window of exact total length

| Keyword / phrase | What it signals |
|---|---|
| "concatenation of all words" | Word-level freq map, fixed window size |
| "same length" | Step by L, not by 1 |
| "exactly once" / "each word" | Multiset equality on word counts |
| "starting indices" | Record left boundary when window valid |
| Hard + string + array of words | Day 11 map pattern at word granularity |

**Why this pattern works:** The window always spans a whole number of words. Adding/removing one word updates the freq map in O(1). Comparing window word counts to `need` is the same anagram check from Day 11 — keys are just length-L substrings.

**How a strong solver thinks before coding:**
1. *"Same-length words → chunk size L, map word → count."*
2. *"Valid window length = numWords × L. Slide one word at a time."*
3. *"Run L offset passes OR only check aligned indices."*
4. *"When all word counts match, record start index."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring of length numWords × L** | O(n × L) per check × O(n) positions — acceptable but slow; window slide is O(n) total |
| **Generate all permutations of words, search each** | O(w!) × n — factorial explosion |
| **Character-level sliding window** | Misaligns word boundaries — "arfo" is not a word |
| **Recount all words from scratch each shift** | O(numWords) per step — incremental map update is O(1) |

**The insight brute force misses:** Words are indivisible chunks. Once you align to a word boundary, the sliding window map from Day 11 handles the rest — expand one word, shrink one word, check multiset equality.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Substring with Concatenation of All Words #30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | Word-level tokens | Freq map + sliding window |
| [Find All Anagrams in a String #438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Character-level tokens | Same map, unit = char |
| [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) | Coverage constraint | Expand/shrink with freq map |
| [Permutation in String #567](https://leetcode.com/problems/permutation-in-string/) | Fixed window size | Map equality at each position |

#30 is Day 11's anagram finder with words instead of characters and variable window size.

---

## 📖 Walkthrough

```
s = "barfoothefoobarman",  words = ["foo","bar"]
L = 3,  numWords = 2,  windowLen = 6
need = {bar:1, foo:1}

Offset pass starting at left=0:

left=0, right word at index 0: "bar"
  window={bar:1},  matched=1,  not complete (need 2 words)

right word at index 3: "foo"
  window={bar:1, foo:1},  matched=2  → record start 0 ✓

slide: remove "bar" at left, add next word at index 6: "the"
  window={foo:1, the:1},  no match

slide: remove "foo", add word at 9: "foo"
  window={the:1, foo:1},  no match

slide: remove "the", add word at 12: "boo"
  ...continue...

Eventually at left=9:
  words at 9,12: "foo","bar" → window={foo:1,bar:1} → record 9 ✓

Answer: [0, 9] ✓
```

> 💡 **The insight:** You're not matching a fixed string — you're matching a **multiset of words**. The freq map doesn't care about order; "barfoo" and "foobar" both satisfy `{bar:1, foo:1}`.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        if (s.empty() || words.empty()) return {};
        int L = words[0].size(), n = s.size(), m = words.size();
        if (n < L * m) return {};

        unordered_map<string, int> need;
        for (auto& w : words) need[w]++;

        vector<int> result;
        for (int offset = 0; offset < L; offset++) {
            unordered_map<string, int> window;
            int left = offset, count = 0;

            for (int right = offset; right + L <= n; right += L) {
                string word = s.substr(right, L);
                if (!need.count(word)) {
                    window.clear();
                    count = 0;
                    left = right + L;
                    continue;
                }
                window[word]++;
                count++;

                while (window[word] > need[word]) {
                    string leftWord = s.substr(left, L);
                    window[leftWord]--;
                    count--;
                    left += L;
                }

                if (count == m) result.push_back(left);
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def findSubstring(self, s: str, words: list[str]) -> list[int]:
        if not s or not words:
            return []
        L, m = len(words[0]), len(words)
        if len(s) < L * m:
            return []

        need = {}
        for w in words:
            need[w] = need.get(w, 0) + 1

        result = []
        for offset in range(L):
            window = {}
            left = offset
            count = 0

            for right in range(offset, len(s) - L + 1, L):
                word = s[right:right + L]
                if word not in need:
                    window.clear()
                    count = 0
                    left = right + L
                    continue

                window[word] = window.get(word, 0) + 1
                count += 1

                while window[word] > need[word]:
                    left_word = s[left:left + L]
                    window[left_word] -= 1
                    count -= 1
                    left += L

                if count == m:
                    result.append(left)

        return result
```

### Java
```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> result = new ArrayList<>();
        if (s.isEmpty() || words.length == 0) return result;

        int L = words[0].length(), m = words.length;
        if (s.length() < L * m) return result;

        Map<String, Integer> need = new HashMap<>();
        for (String w : words) need.merge(w, 1, Integer::sum);

        for (int offset = 0; offset < L; offset++) {
            Map<String, Integer> window = new HashMap<>();
            int left = offset, count = 0;

            for (int right = offset; right + L <= s.length(); right += L) {
                String word = s.substring(right, right + L);
                if (!need.containsKey(word)) {
                    window.clear();
                    count = 0;
                    left = right + L;
                    continue;
                }
                window.merge(word, 1, Integer::sum);
                count++;

                while (window.get(word) > need.get(word)) {
                    String leftWord = s.substring(left, left + L);
                    window.merge(leftWord, -1, Integer::sum);
                    count--;
                    left += L;
                }

                if (count == m) result.add(left);
            }
        }
        return result;
    }
}
```

**Complexity:** O(n × L) time · O(m) space (map size)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Concatenation of all words"** → Word-level sliding window + freq map (Day 11 at word granularity).
- **"Same length"** → Atomic unit is L characters; slide by L, not by 1.
- **"Exactly once, any order"** → Multiset match — same as anagram detection.
- **"All starting indices"** → Record `left` when `count == words.length`.
- **Misaligned starts** → Run L offset passes starting at `0, 1, ..., L-1`.

If you tried every permutation of `words`, you found factorial brute force. The signal was "same-length words" + "concatenation" — freq map window from Day 11.

> 🎯 **Pattern:** Word-level sliding window. Freq map keys are length-L substrings. L offset passes cover all alignments.

---

*Next: count subarrays with exactly k distinct — the atMost decomposition. →*
