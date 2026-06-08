# ✅ Day 25 Checkpoint

> **Multi-Constraint Windows** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "exactly k distinct" / "exactly k different" | atMost(k) − atMost(k−1) | Subtract the ≤(k−1) bucket from the ≤k bucket |
| "at most k distinct" + count subarrays | atMost(k) with (right − left + 1) | Each valid end contributes a range of starts |
| "concatenation of all words" | Word-level freq map, step by L | Words are atomic units of fixed length |
| "minimum window containing all of t" | Expand until covered, shrink while covered | Variable window + coverage map |
| "all starting indices" where multiset matches | Record left when window valid | Same as anagram finder, collect positions |
| shrink while len(map) == k | Wrong approach for exactly k | Use decomposition instead |
| character-by-character in word problem | Step by wordLen or L offset passes | Word boundaries must align |

### 🧠 Quick Recognition Test

1. *"Number of subarrays with exactly 3 distinct integers"* → **atMost(3) − atMost(2) (#992)**
2. *"Find all indices where s contains concatenation of words"* → **Word-level sliding window + freq map (#30)**
3. *"Minimum substring of s containing all chars of t"* → **Variable window + need/window maps (#76)**
4. *"Number of subarrays with product < k"* → **atMost on product — shrink while product ≥ k (#713)**

---

## 🎯 Transfer to Unseen Problems

You've studied Concatenation of All Words and Subarrays with K Different Integers. Can you recognize multi-constraint window thinking on problems you've never walked through?

**Scenario 1:** *"Given an array, count subarrays where the maximum element appears exactly k times."*

Which pattern? **Sliding window with a max-frequency constraint.** Expand right, track count of maximum in window, shrink when max count exceeds k. For exactly k, use decomposition: atMost(k) − atMost(k−1) on max-element count.

**Scenario 2:** *"Given a string and a list of equal-length words, find the shortest substring containing all words in any order."*

Which pattern? **Word-level minimum window** — like #30 but minimize length instead of collecting all starts. Expand until all words matched, shrink while matched.

**Scenario 3:** *"Count subarrays with sum equal to k (array may have negatives)."*

Which pattern? **Not sliding window** — negatives break monotonicity. Use prefix sum + hash map (E-Rank). Don't force a window pattern where it doesn't apply.

> **Answer key:** Scenario 1 → atMost decomposition on max-count. Scenario 2 → word-level min window (#30 + #76 combo). Scenario 3 → prefix sums, not sliding window.

---

## ⚠ Common Mistakes

1. **Chasing exactly k directly** — Shrinking until `len(map) == k` is fragile. Write `atMost(bound)` and subtract.

2. **Forgetting (right − left + 1)** — For counting subarrays, each valid end position contributes a range of starts, not just 1.

3. **Not erasing zero-count keys** — `len(map)` overcounts distinct characters/words. Delete key when count hits 0.

4. **Word misalignment** — Checking every character index in a word-concatenation problem. Run L offset passes or step by wordLen.

5. **Using atMost(k) alone for exactly k** — Counts subarrays with ≤k distinct, including those with fewer. Must subtract atMost(k−1).

---

## 🏋️ Mini Challenge

### [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/)

**[→ Try Minimum Window Substring on LeetCode](https://leetcode.com/problems/minimum-window-substring/)**

Given two strings `s` and `t`, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return `""`.

```
Input:  s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Input:  s = "a", t = "a"
Output: "a"

Input:  s = "a", t = "aa"
Output: ""
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "minimum window substring" | Variable window — shrink to find smallest valid |
| "every character in t included" | Coverage constraint — frequency map |
| "including duplicates" | Count-based map, not boolean set |
| Hard + string matching | Day 12 variable window + Day 11 freq map |

**Before you code:** *"Build need[c] from t. Expand right until formed == required. Shrink left while valid, track minimum. formed counter for O(1) validity."*

> 💡 **Hint:** Track `formed` = how many unique chars in t have their required count satisfied. Expand until `formed == len(need)`. While valid, update answer and shrink from left. When `window[s[left]]` drops below `need[s[left]]`, decrement `formed`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) | Hard | Variable window + coverage map |
| [Permutation in String #567](https://leetcode.com/problems/permutation-in-string/) | Medium | Fixed window + freq match |
| [Subarray Product Less Than K #713](https://leetcode.com/problems/subarray-product-less-than-k/) | Medium | atMost counting on product |
| [Longest Substring with At Most K Distinct #340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | Medium | atMost(k) for max length |
| [Find All Anagrams in a String #438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Medium | Fixed window + freq equality |

---

*Day 25 complete! Tomorrow: greedy string construction with monotonic stacks. →*
