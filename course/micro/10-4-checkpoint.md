# ✅ Day 10 Checkpoint

> **Variable Sliding Window** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "shortest subarray" / "minimal length" with sum condition | Shrink **while valid** | Minimize window that still meets constraint |
| "longest substring" / "maximum length" with uniqueness | Shrink **when invalid** | Maximize window; evict until valid again |
| "sum ≥ target" + positive integers | Variable window, O(n) | Monotonic sum enables two pointers |
| "without repeating characters" | Window + hash set | O(1) duplicate detection in current window |
| "at most k replacements" / "at most k distinct" | Window + counter/map | Budget constraint — shrink when exceeded |
| window size not given | Variable (Day 10) | Expand right, shrink left |
| window size exactly k | Fixed (Day 9) | Enter/exit one element per slide |

### 🧠 Quick Recognition Test

1. *"Shortest subarray with sum ≥ 10, all positive"* → **Shrink while valid, track min length**
2. *"Longest substring with all unique characters"* → **Shrink when duplicate, window + set**
3. *"Longest subarray with at most 2 zeros"* → **Shrink when zeroCount > 2 (Day 9 preview)**
4. *"Longest substring after at most k character replacements"* → **Window + frequency, shrink when replacements needed > k**

---

## 🎯 Transfer to Unseen Problems

You've studied Minimum Size Subarray Sum and Longest Substring Without Repeating Characters. Can you recognize variable-window thinking on problems you've never walked through?

**Scenario 1:** *"Given a string and integer k, find the length of the longest substring you can build by replacing at most k characters with any letter so all characters in the substring are the same."*

Which pattern? **Variable window + frequency count.** For each window, `replacements_needed = window_size - max_char_frequency`. Shrink when `replacements_needed > k`. (Longest Repeating Character Replacement #424.)

**Scenario 2:** *"Given an array of positive integers, count the number of contiguous subarrays whose product is less than k."*

Which pattern? **Variable window on product.** Expand right (multiply), shrink left while product ≥ k. Each valid window ending at `right` contributes `right - left + 1` subarrays.

**Scenario 3:** *"Given a string, find the smallest window substring containing all characters of another string."*

Which pattern? **Variable window + frequency map (C-Rank preview).** Expand until all target chars covered, shrink while still covered, track minimum. Same skeleton as #209 but with character counts instead of sum.

> **Answer key:** All three → variable sliding window. The *state* changes (sum, set, frequency map, product) — the expand-right shrink-left structure does not.

---

## ⚠ Common Mistakes

1. **Wrong shrink direction** — Shortest valid: shrink **while** valid. Longest valid: shrink **when** invalid. Mixing these up gives wrong answers.

2. **`left` moving backward** — `left` only increases. If you ever decrement `left`, the O(n) guarantee breaks.

3. **Forgetting positive-integer constraint** — Minimum Subarray Sum's O(n) approach requires positive numbers. With negatives, use prefix sum + hash map.

4. **Set not synced with window** — When shrinking, remove `s[left]` from the set *before* incrementing `left`. The set must mirror `[left..right]` exactly.

---

## 🏋️ Mini Challenge

### [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/)

**[→ Try Longest Repeating Character Replacement on LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)**

Given a string `s` and integer `k`, find the length of the longest substring containing the same letter after replacing at most `k` characters.

```
Input:  s = "AABABBA", k = 1
Output: 4
        (replace one 'A' → "AAAA" or replace one 'B' → "AABB" — length 4)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "longest substring" | Variable window, maximize length |
| "at most k replacements" | Budget constraint — shrink when exceeded |
| "containing the same letter" | Track max character frequency in window |

**Before you code:** *"Window size − max frequency ≤ k means the window is fillable. Shrink left when it exceeds k."*

> 💡 **Hint:** `replacements = (right - left + 1) - maxFreq`. While `replacements > k`, shrink from left and update frequency counts.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Medium | Window + frequency budget |
| [Subarray Product Less Than K #713](https://leetcode.com/problems/subarray-product-less-than-k/) | Medium | Window on product |
| [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) | Medium | Window + at most 2 distinct |
| [Longest Substring with At Most K Distinct #340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | Medium | Window + frequency map |

---

*Days 9–10 complete! D-Rank sliding window mastery is yours. The D-Rank Test awaits. →*
