# ✅ Day 2 Checkpoint

> **String Manipulation** · 2 quests completed · ⭐ 30 XP earned

---

## 🔍 Pattern Signals

| When you see... | Think... |
|---|---|
| "palindrome" / "reads same backward" | Two pointers from both ends |
| "reverse" / "swap in-place" | Two pointers converging with swap |
| "case-insensitive" | Convert both chars to lowercase before comparing |
| "alphanumeric only" | Two pointers with skip logic |
| "build a string" | StringBuilder (Java) / list+join (Python) |

---

## ⚠ Common Mistakes

1. **O(n²) concatenation** — `result += char` in Python/Java creates a new string every time. Use `list + join()` or `StringBuilder`.

2. **Java string comparison** — `==` compares references, not content. Always use `.equals()` for string values.

3. **Forgetting case normalization** — Convert *both* characters to lowercase. Don't convert just one side.

4. **Edge cases** — Empty string `""`, single character `"a"`, all spaces `"   "`, all non-alphanumeric `"!@#"`.

---

## 🏋️ Mini Challenge

### [Reverse Vowels of a String #345](https://leetcode.com/problems/reverse-vowels-of-a-string/)

**[→ Try Reverse Vowels on LeetCode](https://leetcode.com/problems/reverse-vowels-of-a-string/)**

Two pointers that skip non-vowels and swap vowels in-place.

> 💡 **Hint:** Store vowels in a set `{'a','e','i','o','u','A','E','I','O','U'}` for O(1) lookup.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Reverse String II #541](https://leetcode.com/problems/reverse-string-ii/) | Easy | Reversal with step logic |
| [Reverse Words III #557](https://leetcode.com/problems/reverse-words-in-a-string-iii/) | Easy | Per-word reversal |
| [Valid Palindrome II #680](https://leetcode.com/problems/valid-palindrome-ii/) | Easy | Palindrome with one skip |
| [To Lower Case #709](https://leetcode.com/problems/to-lower-case/) | Easy | Character-level operations |

---

*Day 2 complete! Tomorrow: the frequency counting pattern opens a new world. →*
