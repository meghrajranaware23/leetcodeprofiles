# ✅ Day 27 Checkpoint

> **Bitmask Strings** · 2 quests completed · ⭐ 100 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "every element appears twice except one" | XOR all elements | a ^ a = 0, lone survivor |
| "no common letters" / "no shared characters" | Bitmask AND == 0 | Disjoint set in one operation |
| "lowercase English letters only" | 26-bit int mask | One bit per letter, O(1) set ops |
| "maximum product" + disjoint words | Precompute masks, O(n²) pairs | AND check per pair |
| "linear time" + "constant space" + pairs | XOR, not hash map | Constraints signal bitwise |
| two unique elements, rest paired | XOR all, split by diff bit (#260) | Combined XOR gives a ^ b |
| need frequency > 1 per char | Hash map, not bitmask | Bitmask tracks presence only |

### 🧠 Quick Recognition Test

1. *"Find element that appears once, rest twice"* → **XOR all (#136)**
2. *"Max product of two words with no shared letters"* → **Bitmask + pair check (#318)**
3. *"Two elements appear once, rest twice"* → **XOR then partition (#260)**
4. *"Find missing number in 0..n"* → **XOR indices and values (#268)**

---

## 🎯 Transfer to Unseen Problems

You've studied Single Number and Maximum Product of Word Lengths. Can you recognize bitmask thinking on problems you've never walked through?

**Scenario 1:** *"Given an array where every element appears three times except one, find the single element."*

Which pattern? **Not simple XOR** — XOR leaves the single element but triples contribute `x` not 0. Use bit-counting per position (#137) or sum modulo 3.

**Scenario 2:** *"Given a list of strings, find the longest string that can be formed by concatenating strings with no shared characters."*

Which pattern? **Bitmask union + backtracking** (#1239). Union via OR; invalid if `(maskA & maskB) != 0`.

**Scenario 3:** *"Given two integers a and b, swap them without a temporary variable."*

Which pattern? **XOR swap** — `a ^= b; b ^= a; a ^= b`. Classic bitwise trick.

> **Answer key:** Scenario 1 → bit-count (#137), not #136 XOR. Scenario 2 → bitmask + backtrack (#1239). Scenario 3 → XOR swap.

---

## ⚠ Common Mistakes

1. **XOR for triple appearances** — #136 XOR works for pairs. Three appearances each → use bit-counting (#137).

2. **Union vs intersection** — Disjoint check is `& == 0`. Union is `|`. Don't confuse them.

3. **Not precomputing masks** — Build bitmask once per word; don't rebuild on every pair comparison.

4. **Bitmask for mixed alphabets** — Uppercase + lowercase need 52 bits or a hash set. Bitmask assumes known small alphabet.

5. **Forgetting different indices** — Same word type at different indices can form a valid pair if masks are disjoint (rare but allowed).

---

## 🏋️ Mini Challenge

### [Single Number III #260](https://leetcode.com/problems/single-number-iii/)

**[→ Try Single Number III on LeetCode](https://leetcode.com/problems/single-number-iii/)**

Given an integer array `nums`, exactly **two** elements appear once and the rest appear twice. Return the two singletons in any order. Linear time, constant space.

```
Input:  nums = [1, 2, 1, 3, 2, 5]
Output: [3, 5]

Input:  nums = [-1, 0]
Output: [-1, 0]

Input:  nums = [0, 1]
Output: [1, 0]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "every element appears twice except two" | XOR all → combined = a ^ b |
| "find both single numbers" | Split into two groups by any differing bit |
| "linear time, constant space" | XOR + bit partition — no hash map |
| extends #136 | Two uniques instead of one |

**Before you code:** *"XOR all elements → diff = a ^ b. Find any set bit in diff. Partition nums by that bit — XOR each group separately. Each group yields one singleton."*

> 💡 **Hint:** `diff = xor_all(nums)`. Pick `bit = diff & (-diff)` (lowest set bit). For each num: if `num & bit`, XOR into groupA; else XOR into groupB. Return both groups.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Single Number III #260](https://leetcode.com/problems/single-number-iii/) | Medium | XOR + bit partition |
| [Missing Number #268](https://leetcode.com/problems/missing-number/) | Easy | XOR indices and values |
| [Maximum Length of a Concatenated String with Unique Characters #1239](https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/) | Medium | Bitmask union + backtrack |
| [Single Number II #137](https://leetcode.com/problems/single-number-ii/) | Medium | Bit-count per position |
| [Counting Bits #338](https://leetcode.com/problems/counting-bits/) | Easy | DP on bit patterns |

---

*Day 27 complete! A-Rank Days 25–27 mastered: multi-constraint windows, greedy strings, and bitmasks. →*
