# ✅ Day 3 Checkpoint

> **Frequency Counting** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals

| When you see... | Think... |
|---|---|
| "anagram" / "permutation" | Frequency array + increment/decrement |
| "count occurrences" / "frequency" | `int[26]` or HashMap |
| "first non-repeating" / "unique" | Two-pass frequency count |
| "most frequent" / "least frequent" | Frequency count + scan for max/min |
| "can you form / construct" | Frequency subset check |

---

## ⚠ Common Mistakes

1. **Using HashMap when `int[26]` works** — For lowercase-only problems, `int[26]` is faster, simpler, and impresses interviewers more.

2. **Iterating the freq array instead of the string** — For "first unique" problems, iterate the *string* to preserve order.

3. **Forgetting the length check** — If `len(s) != len(t)`, they can't be anagrams. This O(1) check avoids unnecessary work.

---

## 🏋️ Mini Challenge

### [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) — Unicode variant

**[→ Try Valid Anagram on LeetCode](https://leetcode.com/problems/valid-anagram/)**

Start with the standard lowercase version, then extend: what if the strings contain any Unicode character, not just lowercase? Switch from `int[26]` to a HashMap. The *pattern* is identical — only the container changes.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Ransom Note #383](https://leetcode.com/problems/ransom-note/) | Easy | Frequency subset check |
| [Find the Difference #389](https://leetcode.com/problems/find-the-difference/) | Easy | Frequency difference |
| [Jewels and Stones #771](https://leetcode.com/problems/jewels-and-stones/) | Easy | Set lookup per character |
| [Check if Pangram #1832](https://leetcode.com/problems/check-if-the-sentence-is-pangram/) | Easy | Frequency/set completeness |

---

*Day 3 complete! Tomorrow: hash maps — the Swiss Army knife of DSA. →*
