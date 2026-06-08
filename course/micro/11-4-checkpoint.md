# ✅ Day 11 Checkpoint

> **Sliding Window + Hash Map** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "anagram" / "permutation of p" | Fixed window + frequency map | Same multiset → compare counts, window size = len(p) |
| "at most k distinct" / "at most two types" | Variable window + map | `len(map) ≤ k`; shrink when exceeded |
| "character count" / "frequency in window" | Hash map as window state | Set only tracks presence; map tracks counts |
| "find all starting indices" + composition match | Fixed window enter/exit | Record start when window map matches target |
| "longest substring" + multiset constraint | Variable window + map | Expand, shrink when invalid, track max |
| "cover all characters of t" | Variable window + map (preview) | Expand until covered, shrink while still covered |
| zero-count key still in map | Erase key on decrement to zero | Keeps `len(map)` = true distinct count |

### 🧠 Quick Recognition Test

1. *"Find all anagrams of 'abc' in a long string"* → **Fixed window len(p) + frequency map, record starts**
2. *"Longest substring with at most 3 distinct characters"* → **Variable window + map, shrink when distinct > 3**
3. *"Can you pick at most 2 types of fruit from a row of trees?"* → **Fruit Into Baskets — same as #340 with k = 2**
4. *"Is any permutation of 'ab' a substring of s?"* → **Fixed window + map, return true on first match (#567)**

---

## 🎯 Transfer to Unseen Problems

You've studied Find All Anagrams and Longest Substring with At Most K Distinct. Can you recognize window + map thinking on problems you've never walked through?

**Scenario 1:** *"Given strings s and t, find the minimum window substring of s such that every character in t (including duplicates) is included in the window."*

Which pattern? **Variable window + frequency map.** Expand until all target chars covered, shrink while still covered, track minimum length. (Minimum Window Substring #76.)

**Scenario 2:** *"Given a string s and integer k, find the length of the longest substring containing the same letter after replacing at most k characters."*

Which pattern? **Variable window + frequency map with a budget formula.** `replacements_needed = window_size - max_frequency`. Shrink when `replacements_needed > k`. (Longest Repeating Character Replacement #424.)

**Scenario 3:** *"Given an array of integers, find the number of subarrays that contain exactly k different integers."*

Which pattern? **Sliding window + map — Hard variant.** Count subarrays with *exactly* k by computing `atMost(k) - atMost(k-1)`. (Subarrays with K Different Integers #992.)

> **Answer key:** All three → sliding window + hash map. The *validity rule* changes (anagram match, distinct budget, replacement budget, exact-k trick) — the expand-right shrink-left skeleton does not.

---

## ⚠ Common Mistakes

1. **Using a set when counts matter** — Anagrams require frequency equality. `"aab"` and `"abb"` share the same set but are not anagrams.

2. **Forgetting to erase zero-count keys** — `map['a'] = 0` still counts as a distinct character. Delete the key so `len(map)` is accurate.

3. **Wrong window type** — Anagram of `p` always has length `len(p)` → fixed window. "Longest with at most k distinct" → variable window.

4. **Comparing full maps every step** — Use a `matched` counter or diff array for O(1) anagram detection instead of scanning 26 slots.

5. **Shrinking before expanding** — Always add `s[right]` first, then shrink. Same rule as Day 10.

---

## 🏋️ Mini Challenge

### [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/)

**[→ Try Longest Repeating Character Replacement on LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)**

Given a string `s` and integer `k`, find the length of the longest substring containing the same letter after replacing at most `k` characters.

```
Input:  s = "AABABBA", k = 1
Output: 4
        (replace one 'A' → "AAAA" or replace one 'B' → "AABB" — length 4)

Input:  s = "ABAB", k = 2
Output: 4
        (replace both 'A's or both 'B's)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "longest substring" | Variable window, maximize length |
| "at most k replacements" | Budget constraint — shrink when exceeded |
| "containing the same letter" | Track max character frequency in window |

**Before you code:** *"Window size − max frequency ≤ k means the window is fillable with at most k swaps. Shrink left when it exceeds k."*

> 💡 **Hint:** `replacements = (right - left + 1) - maxFreq`. While `replacements > k`, shrink from left and update frequency counts. You don't need to know *which* character to replace — only whether the budget allows it.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Medium | Window + frequency budget |
| [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) | Hard | Window + map, shortest cover |
| [Permutation in String #567](https://leetcode.com/problems/permutation-in-string/) | Medium | Fixed window + anagram check |
| [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) | Medium | At most 2 distinct (k = 2) |
| [Subarray Product Less Than K #713](https://leetcode.com/problems/subarray-product-less-than-k/) | Medium | Variable window on product (Day 10) |

---

*Day 11 complete! Tomorrow: Kadane's Algorithm — extend the running sum or restart. →*
