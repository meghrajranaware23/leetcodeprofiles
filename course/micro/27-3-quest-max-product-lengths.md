# ⚔ Quest: Maximum Product of Word Lengths

> **Day 27** · [Maximum Product of Word Lengths #318](https://leetcode.com/problems/maximum-product-of-word-lengths/) · Medium · 50 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Product of Word Lengths on LeetCode](https://leetcode.com/problems/maximum-product-of-word-lengths/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string array `words`, find the maximum value of `length(word[i]) × length(word[j])` where the two words share **no common letters**. If no such pair exists, return 0.

Both words could be the same, but they must be at different indices.

```
Input:  words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
        ("abcw" × "xtfn" = 4 × 4, or "abcw" × "foo" = 4 × 3, etc.)

Input:  words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
        ("ab" × "cd" = 2 × 2)

Input:  words = ["a","aa","aaa","aaaa"]
Output: 0
        (all words share 'a')
```

---

## 💡 Hints

**Hint 1 — Character set, not string comparison:** You only need to know which **letters** each word contains — not their order or frequency. A bitmask with 26 bits captures this in O(word length) per word.

**Hint 2 — Build masks:** For each word, `mask |= (1 << (c - 'a'))` for each character `c`. Store masks in an array alongside word lengths.

**Hint 3 — Disjoint check:** Two words share no letters iff `(maskA & maskB) == 0`. One bitwise AND replaces nested character loops.

**Hint 4 — Pair iteration:** For each pair `(i, j)` with `i < j`, if masks are disjoint, update `max(len[i] × len[j])`. O(n²) pairs, O(1) per check.

**Hint 5 — Skip duplicates in mask?** Words with identical character sets have the same mask — still check pairs (different indices). Words with overlapping masks always fail the AND test.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bitmask Character Sets — Disjoint Check via AND

**How to identify this from the problem statement:**
- "no common letters" → disjoint set check → bitmask AND == 0
- lowercase English words → 26-bit mask fits in int
- maximize product of lengths → pair enumeration
- string array → precompute per word, compare pairs

| Keyword / phrase | What it signals |
|---|---|
| "no common letters" | `(maskA & maskB) == 0` |
| "maximum product of lengths" | Pair iteration, track max product |
| lowercase words | 26-bit bitmask per word |
| "different indices" | Allow same mask, different i, j |
| array of words + set constraint | Precompute masks, O(n²) pairs |

**Why this pattern works:** Building a mask is O(L) per word. Checking disjointness is O(1) — one AND operation. For n words, O(n²) pair checks with O(1) each beats character-by-character comparison.

**How a strong solver thinks before coding:**
1. *"No shared letters → bitmask per word."*
2. *"Disjoint: maskA & maskB == 0."*
3. *"All pairs, track max len[i] × len[j]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each pair, check every char of A against every char of B** | O(L²) per pair — bitmask reduces to O(1) |
| **Hash set per word, intersect for each pair** | Works but heavier — bitmask is one integer |
| **Sort by length, greedy pair** | Greedy doesn't guarantee max product — need all pairs or smarter pruning |
| **Rebuild character set on every comparison** | Wastes work — precompute masks once |

**The insight brute force misses:** You don't need the actual characters for comparison — only whether **any bit overlaps**. One AND tells you instantly.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Product of Word Lengths #318](https://leetcode.com/problems/maximum-product-of-word-lengths/) | Max product, disjoint | Bitmask + pair check |
| [Longest Word in Dictionary #720](https://leetcode.com/problems/longest-word-in-dictionary/) | Subset of chars | Bitmask subset check |
| [Maximum Length of a Concatenated String with Unique Characters #1239](https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/) | Concatenate many | Bitmask union + backtrack |
| [Find All Anagrams in a String #438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Character multiset | Hash map instead of bitmask |

#318 is the cleanest bitmask disjoint-set problem — one AND per pair.

---

## 📖 Walkthrough

```
words = ["abcw","baz","foo","bar","xtfn","abcdef"]

Masks:
  "abcw"   → a,b,c,w → bits 0,1,2,22 → mask = 0b...1000000000000000000111
  "baz"    → b,a,z   → shares bits with abcw → AND ≠ 0
  "foo"    → f,o     → bits 5,14
  "bar"    → b,a,r   → shares with abcw
  "xtfn"   → x,t,f,n → bits 23,19,5,13
  "abcdef" → a-f     → shares with almost everything

Check "abcw"(4) vs "foo"(3):
  mask_abcw & mask_foo = 0  → disjoint! product = 12

Check "abcw"(4) vs "xtfn"(4):
  mask_abcw & mask_xtfn = 0  → disjoint! product = 16 ✓

Check "foo"(3) vs "xtfn"(4):
  share bit 5 (f) → AND ≠ 0 → skip

Max product = 16 ✓
```

> 💡 **The insight:** The bitmask is a fingerprint of each word's character set. Disjoint fingerprints → valid pair. One AND replaces nested character loops.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProduct(vector<string>& words) {
        int n = words.size();
        vector<int> masks(n, 0);

        for (int i = 0; i < n; i++) {
            for (char c : words[i])
                masks[i] |= (1 << (c - 'a'));
        }

        int result = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if ((masks[i] & masks[j]) == 0)
                    result = max(result, (int)(words[i].size() * words[j].size()));
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def maxProduct(self, words: list[str]) -> int:
        n = len(words)
        masks = [0] * n

        for i in range(n):
            for c in words[i]:
                masks[i] |= (1 << (ord(c) - ord('a')))

        result = 0
        for i in range(n):
            for j in range(i + 1, n):
                if masks[i] & masks[j] == 0:
                    result = max(result, len(words[i]) * len(words[j]))

        return result
```

### Java
```java
class Solution {
    public int maxProduct(String[] words) {
        int n = words.length;
        int[] masks = new int[n];

        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray())
                masks[i] |= (1 << (c - 'a'));
        }

        int result = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if ((masks[i] & masks[j]) == 0)
                    result = Math.max(result, words[i].length() * words[j].length());
            }
        }
        return result;
    }
}
```

**Complexity:** O(n² × L) time · O(n) space (masks)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"No common letters"** → Bitmask disjoint check: `maskA & maskB == 0`.
- **"Lowercase words"** → 26-bit mask — Day 27 bitmask.
- **"Maximum product of lengths"** → Check all pairs, track max.
- **Precompute masks** → Build once per word, reuse for every pair.
- **E-Rank Day 4 hash set** → Bitmask replaces set for 26-letter alphabet.

If you compared characters with nested loops, you found O(L²) per pair. The signal was "no common letters" + lowercase alphabet — bitmask AND.

> 🎯 **Pattern:** Bitmask per word. Disjoint pair: `maskA & maskB == 0`. Maximize `len[i] × len[j]`.

---

*Checkpoint: two lone numbers — XOR to split, then partition. →*
