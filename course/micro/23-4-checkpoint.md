# ✅ Day 23 Checkpoint

> **Rabin-Karp Rolling Hash** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "repeated substring of fixed length L" | Fixed-window rolling hash | O(1) roll per slide; map hash → positions |
| "longest duplicate substring" | Binary search on length + Rabin-Karp verify | Monotonic: if len L works, len L−1 works |
| "search pattern in text" | Roll pattern hash vs text windows | Or KMP (Day 24) for guaranteed O(n+m) |
| "compare many equal-length substrings" | Rabin-Karp, not brute compare | O(n) rolls vs O(n² · L) pairs |
| hash collision on match | Verify with direct string compare | Collisions are rare but possible |
| `(H - left·B^L) mod M` goes negative | Add M before final mod | Modular subtraction needs `+ M` guard |
| substring fingerprint / rolling hash | Polynomial hash with base B, mod M | Precompute B^L for O(1) roll-out |

### 🧠 Quick Recognition Test

1. *"Find all 10-letter DNA sequences that appear more than once"* → **Fixed L=10 rolling hash + map (#187)**
2. *"Return the longest duplicated substring in s"* → **Binary search length + Rabin-Karp (#1044)**
3. *"Find first occurrence of needle in haystack"* → **Rolling hash match or KMP (#28)**
4. *"Longest repeating substring — return the length only"* → **Same binary search + hash, return lo (#1062)**

---

## 🎯 Transfer to Unseen Problems

You've studied Repeated DNA Sequences and Longest Duplicate Substring. Can you recognize rolling hash thinking on problems you've never walked through?

**Scenario 1:** *"Given two strings, find the length of the longest common substring."*

Which pattern? **Binary search on length + double rolling hash.** For candidate length `mid`, roll hash on both strings; if any hash value appears in both, length `mid` is feasible. Same skeleton as #1044 across two strings (#718).

**Scenario 2:** *"Given a string and a list of words (all same length), find all starting indices where a concatenation of all words appears."*

Which pattern? **Rolling hash per word length + frequency map.** Hash each word; slide a window of `wordLen` across `s`; check if the multiset of window hashes matches the word multiset (#30).

**Scenario 3:** *"Detect if a string has any repeated substring of any length."*

Which pattern? **Rabin-Karp with incremental window, or KMP on s + separator + s.** Rolling hash: for each length L, one pass — or use suffix array. Quick check: if `n > 26^k` for alphabet size k, pigeonhole guarantees repeat.

> **Answer key:** Scenario 1 → binary search + dual rolling hash (#718). Scenario 2 → fixed window per word + hash multiset (#30). Scenario 3 → Rabin-Karp sweep or KMP self-match. Signal: **"duplicate / repeated substring"** → rolling hash fingerprint.

---

## ⚠ Common Mistakes

1. **Negative modulo on roll-out** — `(H - c·powL) % M` can be negative. Use `(H - c·powL % M + M) % M`.

2. **Recomputing hash from scratch each slide** — Defeats O(1) roll. Precompute `powL = B^L mod M` once.

3. **Trusting hash equality blindly** — Always verify with string compare on collision, or use double hashing.

4. **Binary search bias direction** — "Longest" needs upper-mid: `mid = (lo + hi + 1) / 2`. Wrong bias stalls at L−1.

5. **Forgetting edge case `n < L`** — No window of length L exists. Return empty before rolling.

---

## 🏋️ Mini Challenge

### [Find the Index of the First Occurrence in a String #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)

**[→ Try Find the Index of the First Occurrence on LeetCode](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)**

Given two strings `haystack` and `needle`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

```
Input:  haystack = "sadbutsad", needle = "sad"
Output: 0

Input:  haystack = "leetcode", needle = "leeto"
Output: -1
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "first occurrence of needle in haystack" | Pattern matching — Rabin-Karp or KMP |
| "return index or -1" | Stop at first hash match (with verify) |
| two strings, one is pattern | Precompute pattern hash; roll over haystack |

**Before you code:** *"Hash the needle once. Roll hash over haystack windows of length |needle|. On match, verify and return index. O(n+m) average."*

> 💡 **Hint:** This is the Rabin-Karp pattern-matching form. You'll learn KMP tomorrow (Day 24) — a deterministic O(n+m) alternative with no collision risk. Both are valid for #28.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Find the Index of the First Occurrence #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Easy | Rabin-Karp or KMP pattern match |
| [Longest Repeating Substring #1062](https://leetcode.com/problems/longest-repeating-substring/) | Medium | Binary search + rolling hash |
| [Maximum Length of Repeated Subarray #718](https://leetcode.com/problems/maximum-length-of-repeated-subarray/) | Medium | Binary search + dual rolling hash |
| [Substring with Concatenation of All Words #30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | Hard | Rolling hash per word + multiset |
| [Distinct Echo Substrings #1316](https://leetcode.com/problems/distinct-echo-substrings/) | Medium | Rolling hash, count distinct repeats |

---

*Day 23 complete! Tomorrow: KMP — the failure function that never forgets what it already matched. →*
