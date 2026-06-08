# ✅ Day 29 Checkpoint

> **Multi-Pattern String Synthesis** · 2 quests completed · ⭐ 125 XP earned

---

## 🔍 Pattern Signals — String Combination Recognition

| When you see... | Combine... | Why |
|---|---|---|
| "longest substring after k replacements" | Variable window (Day 10) + freq budget (Day 3) | Valid when `len − maxFreq ≤ k` |
| "sum unique chars over all substrings" | Contribution counting (Day 18) + position tracking (Day 3/4) | `(i − prev) × (next − i)` per occurrence |
| "sum of X over all subarrays/substrings" | Contribution inversion — never enumerate | O(n) boundaries vs O(n²) enumeration |
| "at least k repeating characters" | Divide & conquer + freq pruning (#395) | Hard string freq — not pure sliding window |
| "max consecutive ones with k flips" | Window + binary freq budget | Same skeleton as #424 |
| "longest with at most k distinct" | Variable window + distinct map (Day 11) | Different budget — count keys, not maxFreq |

### 🧠 Quick Recognition Test

1. *"Longest substring with same letter after k replacements"* → **Window + freq budget (#424)**
2. *"Total unique characters across all substrings"* → **Contribution + prev/next (#828)**
3. *"Sum of minimums over all subarrays"* → **Contribution + monotonic stack (#907, Day 18)**
4. *"Longest substring where every char appears at least k times"* → **Divide & conquer (#395)**

---

## 🎯 Transfer to Unseen Problems

You've studied Longest Repeating Character Replacement and Count Unique Characters. Can you transfer string synthesis to new scenarios?

**Scenario 1:** *"Given a binary string and integer k, return the longest substring of 1s after flipping at most k zeros."*

Which combination? **Variable window (Day 10) + freq budget (Day 3)** — identical to #424 with `maxFreq` = count of 1s. Valid when `zeros ≤ k`.

**Scenario 2:** *"Given a string, count substrings that contain every vowel at least once."*

Which combination? **Variable window + coverage map (Day 11/12)** — expand until all vowels covered, count or shrink. Not contribution counting.

**Scenario 3:** *"Given a string, sum the number of palindromic substrings."*

Which combination? **Expand-around-center or Manacher (A-Rank string)** — not window or contribution. Recognize when synthesis doesn't apply.

> **Answer key:** Scenario 1 → #1004 (window + budget). Scenario 2 → coverage window (#76 family). Scenario 3 → palindrome-specific — different tool.

---

## ⚠ Common Mistakes

1. **Enumerating all substrings** — O(n²) generation for aggregate problems. Invert: contribution per index.

2. **Wrong validity for #424** — Using `distinct ≤ k` instead of `len − maxFreq ≤ k`. Replacements target one dominant char.

3. **Decrementing maxFreq on shrink** — Unnecessary and error-prone. Only track global `maxLen`.

4. **Confusing prev index** — `prev` is previous occurrence of **same character**, not `i − 1`.

5. **Forgetting cross-domain transfer** — String substring problems often map to array patterns first. Name the array pattern, then add char bookkeeping.

---

## 🏋️ Mini Challenge

### [Longest Substring with At Least K Repeating Characters #395](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/)

**[→ Try on LeetCode](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/)**

Given a string `s` and integer `k`, return the length of the **longest substring** where every character appears **at least** `k` times.

```
Input:  s = "aaabb", k = 3
Output: 3
        ("aaa" — 'a' appears 3 times)

Input:  s = "ababbc", k = 2
Output: 5
        ("ababb" — 'a' and 'b' each appear ≥ 2 times)

Input:  s = "ababacb", k = 2
Output: 2
        ("ba" or "ab")
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "longest substring" | Window instinct — but global validity is tricky |
| "every character at least k times" | All chars in window must have freq ≥ k |
| "at least k repeating" | Not maxFreq budget — **every** char must qualify |
| Hard + freq constraint | Divide & conquer OR sliding window over limited distinct count |

**Before you code:** *"Split on a character with freq < k — it can't be in the answer substring. Recursively solve left and right halves. Base: if distinct ≤ 26, try sliding window for each distinct count 1..26."*

> 💡 **Hint (Divide & Conquer):** For segment `[lo..hi]`, count frequencies. If any char has count `< k` in the segment, it **breaks** any valid substring — recurse on `[lo..mid]` and `[mid+1..hi]`. If all chars have count ≥ k, answer is `hi − lo + 1`.

> 💡 **Hint (Sliding Window variant):** For each target distinct count `d` from 1 to 26, slide a window maintaining exactly `d` distinct chars, check if all have freq ≥ k. O(26 × n).

---

## 📚 Practice Queue

| Problem | Difficulty | Pattern Combination |
|---|---|---|
| [Longest Substring with At Least K Repeating Characters #395](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/) | Medium | Divide & conquer + freq |
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Medium | Window + freq budget |
| [Count Unique Characters of All Substrings #828](https://leetcode.com/problems/count-unique-characters-of-all-substrings/) | Hard | Contribution + position |
| [Max Consecutive Ones III #1004](https://leetcode.com/problems/max-consecutive-ones-iii/) | Medium | Window + binary budget |
| [Sum of Subarray Minimums #907](https://leetcode.com/problems/sum-of-subarray-minimums/) | Medium | Contribution (array cousin) |

---

*Day 29 complete! Tomorrow: the final ascension — full pattern library review. →*
