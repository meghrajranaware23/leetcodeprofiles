# ✅ Day 26 Checkpoint

> **Greedy Strings** · 2 quests completed · ⭐ 100 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "smallest possible integer" + "remove k digits" | Increasing stack + removal budget | Pop larger leading digits when smaller arrives |
| "smallest lexicographical" + "each letter once" | Stack + freq + seen | Three-pattern combo |
| "remove duplicate letters" | Increasing stack, pop when safe | Freq gates pops — char must reappear |
| "distinct characters" + "smallest subsequence" | Same as Remove Duplicate Letters (#1081) | Identical pattern |
| pop without checking freq | Only pop if freq[top] > 0 | Otherwise lose character forever |
| sort unique characters | Stack construction instead | Order must respect original positions |
| decreasing stack for smallest string | Wrong direction | Smallest → increasing stack, pop when c < top |

### 🧠 Quick Recognition Test

1. *"Remove k digits for smallest number"* → **Increasing stack + budget (#402)**
2. *"Smallest string where each letter appears once"* → **Stack + freq + seen (#316)**
3. *"Smallest subsequence of distinct characters"* → **Same as #316 (#1081)**
4. *"Remove adjacent duplicates until none left"* → **Stack with run-count (#1209) — different variant**

---

## 🎯 Transfer to Unseen Problems

You've studied Remove K Digits and Remove Duplicate Letters. Can you recognize greedy string thinking on problems you've never walked through?

**Scenario 1:** *"Given a string, find the lexicographically smallest subsequence containing all distinct characters."*

Which pattern? **Stack + freq + seen (#1081).** Identical to Remove Duplicate Letters — today's checkpoint.

**Scenario 2:** *"Given num and k, remove k digits to form the largest possible number."*

Which pattern? **Decreasing monotonic stack** — mirror of #402. Pop while `c > stack.top()` and budget > 0.

**Scenario 3:** *"Given a string, remove all adjacent duplicate characters recursively until no adjacent duplicates remain."*

Which pattern? **Simple stack** — push c, if `c == stack.top()` pop top. Not the greedy-string pattern (no freq/seen needed).

> **Answer key:** Scenario 1 → #1081 combo. Scenario 2 → decreasing stack (maximize). Scenario 3 → adjacent-duplicate stack (#1047/#1209).

---

## ⚠ Common Mistakes

1. **Wrong stack direction** — Smallest string → **increasing** stack. Largest → decreasing.

2. **Popping without freq check** — Remove Duplicate Letters: only pop if the top character appears later (`freq[top] > 0`).

3. **No seen set** — Pushing a character already in the stack creates duplicates.

4. **Forgetting end-trim in Remove K Digits** — If budget remains after the scan, pop from the end.

5. **Sorting instead of stacking** — Order is constrained by original positions. Stack respects subsequence order.

---

## 🏋️ Mini Challenge

### [Smallest Subsequence of Distinct Characters #1081](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)

**[→ Try Smallest Subsequence of Distinct Characters on LeetCode](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)**

Given a string `s`, return the **lexicographically smallest subsequence** of `s` that contains all the distinct characters of `s` exactly once.

```
Input:  s = "bcabc"
Output: "abc"

Input:  s = "cbacdcbc"
Output: "acdb"
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "smallest subsequence" | Increasing stack — pop larger chars when safe |
| "all distinct characters exactly once" | Seen set + must include every unique char |
| "lexicographically smallest" | Greedy stack construction |
| Same examples as #316 | Identical algorithm |

**Before you code:** *"This is Remove Duplicate Letters with different wording. Stack + freq + seen. Pop while c < top and freq[top] > 0. Skip if c in seen."*

> 💡 **Hint:** Precompute frequency of each character. For each `c`: decrement freq, skip if seen, pop stack top while `c < top` and `freq[top] > 0`, then push `c` and mark seen.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Smallest Subsequence of Distinct Characters #1081](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/) | Medium | Stack + freq + seen |
| [Remove All Adjacent Duplicates in String II #1209](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/) | Medium | Stack with run-count |
| [Create Maximum Number #321](https://leetcode.com/problems/create-maximum-number/) | Hard | Decreasing stack + merge |
| [Remove All Adjacent Duplicates In String #1047](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/) | Easy | Simple stack |
| [Remove K Digits #402](https://leetcode.com/problems/remove-k-digits/) | Medium | Increasing stack + budget |

---

*Day 26 complete! Tomorrow: bitmasks — pack 26 letters into one integer. →*
