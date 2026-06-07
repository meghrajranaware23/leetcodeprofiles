# ✅ Day 2 Checkpoint

> **String Manipulation** · 2 quests completed · ⭐ 30 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "palindrome" / "reads same backward" | Two pointers from both ends | Symmetry check |
| "reverse" / "swap in-place" | Two pointers converging with swap | Mirror positions |
| "case-insensitive" | Lowercase both before comparing | Normalize at compare time |
| "alphanumeric only" | Two pointers with skip logic | Filter on the fly |
| "build a string" | StringBuilder / list+join | Avoid O(n²) concatenation |
| "swap" / "mirror" / "flip" | Two pointers converging with swap | Each swap fixes two positions |
| "skip" / "ignore" / "only consider X" | Two pointers + advance past invalid | Filter on the fly, no cleaned copy |

### 🧠 Quick Recognition Test

1. *"Reverse only the vowels in a string"* → **Two pointers + skip non-vowels**
2. *"Is this a palindrome after removing one character?"* → **Two pointers + one allowed skip**
3. *"Reverse each word in a sentence"* → **Two pointers per word** (or split + reverse)

---

## 🎯 Transfer to Unseen Problems

You've seen Valid Palindrome and Reverse String. Can you pick the right two-pointer variant on unfamiliar problems?

**Scenario 1:** *"Given a string, determine if it reads the same forward and backward after ignoring spaces and punctuation. Comparison is case-insensitive."*

Which pattern? **Two pointers from both ends with skip logic.** Don't clean the string — advance past non-alphanumeric, compare lowercase at L and R.

**Scenario 2:** *"Given a character array, reverse it in-place. You must use O(1) extra memory."*

Which pattern? **Two pointers converging with swap.** Left at 0, right at n−1, swap and move inward until they meet.

**Scenario 3:** *"Given a string, reverse only the vowels in-place. Consonants stay in place."*

Which pattern? **Two pointers + skip non-vowels + swap.** Same skeleton as Reverse String, but both pointers skip consonants before swapping.

> **Answer key:** All three → two pointers from both ends. Scenario 1 = compare + skip; Scenario 2 = swap; Scenario 3 = skip + swap.

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
