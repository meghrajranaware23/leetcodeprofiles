# ✅ Day 21 Checkpoint

> **Hash Key Design** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "group anagrams" / "same letters" | Sorted string key (or freq tuple) | Multiset fingerprint — all permutations share one key |
| "shifted strings" / "same Caesar shift" | Difference encoding key | Uniform shift preserves relative gaps, not absolute chars |
| "isomorphic" / "same pattern" | First-occurrence rank key | Structure-preserving relabeling |
| "encode and decode" a string list | Length-prefixed serialization | Delimiters in data break naive concat |
| "group by equivalence" | Design canonical key first | Raw input as key rarely groups correctly |
| negative char difference (z→a) | `(a - b + 26) % 26` | Wrap-around normalization |
| single-char strings in shift groups | Shared constant key | All length-1 strings are shifts of each other |

### 🧠 Quick Recognition Test

1. *"Group words that are anagrams of each other"* → **Sort letters → hash map bucket (#49)**
2. *"Group strings that are Caesar shifts of each other"* → **Difference tuple key (#249)**
3. *"Are s and t isomorphic?"* → **Rank/pattern key, not sorted letters (#205)**
4. *"Encode a list of strings for later decoding"* → **Length prefix: `len#word` (#271)**

---

## 🎯 Transfer to Unseen Problems

You've studied Group Anagrams and Group Shifted Strings. Can you recognize hash key design on problems you've never walked through?

**Scenario 1:** *"Given two strings s and t, determine if they are isomorphic. Characters in s can be replaced to get t, preserving order. No two chars map to the same char, and no char maps to two chars."*

Which pattern? **Pattern/rank key or bidirectional mapping.** Replace each char with its first-occurrence index to build a structural fingerprint. `"egg"` → `"011"`, `"add"` → `"011"`. (Isomorphic Strings #205.)

**Scenario 2:** *"Given an array of strings, encode them into a single string for transmission, then decode back to the original array. The encoded string must be unambiguous."*

Which pattern? **Length-prefixed encoding.** `"5#hello5#world"` — decoder reads length, then exactly that many chars. (Encode and Decode Strings #271 — mini challenge below.)

**Scenario 3:** *"Given a string s and string t, return true if t is an anagram of s."*

Which pattern? **Frequency counting (Day 3), not grouping.** Two strings, one comparison — sorted key or freq array, no hash map of groups needed. (Valid Anagram #242.)

> **Answer key:** Scenario 1 → pattern key (#205). Scenario 2 → length prefix (#271). Scenario 3 → freq compare (Day 3). Signal: **"group many items"** → hash map + designed key; **"compare two items"** → direct fingerprint compare.

---

## ⚠ Common Mistakes

1. **Using sorted key for shifted strings** — `"abc"` and `"bcd"` have different sorted forms but are shifted equivalents. Use difference encoding.

2. **Using difference key for anagrams** — `"abc"` and `"acb"` have the same differences but are anagrams, not shifts. Use sorted key or freq tuple.

3. **Forgetting modulo on differences** — `z - a` is -25, not 1. Always `(diff + 26) % 26`.

4. **Omitting length from shift key** — `"ab"` and `"abc"` can share partial difference prefixes. Include length or use tuple of all diffs with implicit length.

5. **Delimiter encoding without length prefix** — `"12#abc"` is ambiguous: is it `"12"` + `"#abc"` or `"12#"` + `"abc"`? Length prefix removes ambiguity.

---

## 🏋️ Mini Challenge

### [Encode and Decode Strings #271](https://leetcode.com/problems/encode-and-decode-strings/)

**[→ Try Encode and Decode Strings on LeetCode](https://leetcode.com/problems/encode-and-decode-strings/)**

Design an algorithm to encode a list of strings to a single string and decode it back. The encoded string should be unambiguous — any valid input list must decode correctly.

```
Input:  ["hello", "world"]
Encode: "5#hello5#world"
Decode: ["hello", "world"]

Input:  [""]
Encode: "0#"
Decode: [""]

Input:  ["a", "ab"]
Encode: "1#a2#ab"
Decode: ["a", "ab"]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "encode a list of strings" | Serialization — need reversible format |
| "decode back to original" | No information loss — bijective encoding |
| strings can contain any character | Delimiter-only schemes fail — use length prefix |

**Before you code:** *"For each word, write `str(len) + '#' + word`. To decode, read digits until '#', parse length, read exactly that many characters, repeat."*

> 💡 **Hint:** The `#` separator is safe because the decoder never scans for `#` inside a word — it reads a fixed count of characters after parsing the length. Words containing `#`, spaces, or digits all decode correctly.

### Encode / Decode Skeleton

```python
def encode(self, strs):
    return ''.join(f'{len(s)}#{s}' for s in strs)

def decode(self, s):
    result, i = [], 0
    while i < len(s):
        j = s.index('#', i)
        length = int(s[i:j])
        i = j + 1
        result.append(s[i:i + length])
        i += length
    return result
```

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Encode and Decode Strings #271](https://leetcode.com/problems/encode-and-decode-strings/) | Medium | Length-prefixed serialization |
| [Isomorphic Strings #205](https://leetcode.com/problems/isomorphic-strings/) | Easy | Pattern/rank key |
| [Find the Celebrity #277](https://leetcode.com/problems/find-the-celebrity/) | Medium | Graph + elimination (preview) |
| [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) | Easy | Freq compare — two-string variant (Day 3) |
| [Group Anagrams #49](https://leetcode.com/problems/group-anagrams/) | Medium | Sorted string key (review) |
| [Group Shifted Strings #249](https://leetcode.com/problems/group-shifted-strings/) | Medium | Difference encoding key (review) |

---

*Day 21 complete! Tomorrow: Advanced Sweep Line — events, heaps, and the skyline. →*
