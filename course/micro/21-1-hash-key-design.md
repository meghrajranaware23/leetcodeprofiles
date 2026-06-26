# 📝 Hash Key Design

> **Day 21** · Hash Key Design · 15 XP · 14 min read

---

Welcome to B-Rank. On E-Rank Day 3 you counted characters. On Day 4 you stored `value → index` in a hash map. Today you design the **key itself** — a canonical fingerprint that makes equivalent items collide in the same bucket.

Group anagrams, shifted strings, isomorphic pairs, and encode/decode problems all reduce to one question: *"What string or tuple should I hash so that equal things share a key?"*

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Hash key design** means choosing a **canonical representation** of each item so that:

```
equivalent items  →  same key  →  same hash map bucket
distinct items    →  different keys  →  different buckets
```

The map still stores `key → value`. The upgrade is **what you use as the key**:

```
naive key:   the raw string itself        →  "eat" and "tea" land in different buckets ✗
designed key: sorted("eat") = "aet"      →  "eat" and "tea" both map to "aet" ✓
```

You are not changing the hash map — you are changing **what you hash**.

### 2. Why not hash the raw input?

| Problem | Raw string as key | Designed key |
|---|---|---|
| Group Anagrams (#49) | `"eat"` ≠ `"tea"` — no grouping | Sort letters → `"aet"` for both |
| Group Shifted Strings (#249) | `"abc"` ≠ `"bcd"` — no grouping | Difference tuple → `(0,1,2)` for both |
| Isomorphic Strings (#205) | Compare char-by-char | Pattern key: first-seen mapping |
| Encode and Decode (#271) | Delimiter collisions break parsing | Length-prefixed encoding |

**Rule of thumb:** If the problem asks you to **group equivalent** items (not find exact matches), you need a key that **normalizes away** the irrelevant differences.

### 3. Cross-rank bridge — E-Rank Day 3 & Day 4

**E-Rank Day 3 — Frequency Counting:** Valid Anagram compared two multisets by tallying characters. A sorted string key is the **compressed fingerprint** of that same multiset:

```
"eat":  freq = {a:1, e:1, t:1}   →  sorted letters = "aet"
"tea":  freq = {a:1, e:1, t:1}   →  sorted letters = "aet"  ✓ same key
```

For lowercase English letters, sorting 26 slots is equivalent to comparing frequency arrays — pick whichever is cleaner to code.

**E-Rank Day 4 — Hash Maps:** Two Sum used `complement → index`. Group Anagrams uses `canonical key → list of strings`:

```
map = {}
for word in words:
    key = canonical(word)       // DESIGN THIS
    map[key].append(word)
return all values in map
```

Day 4 taught you *when* to reach for a map. Day 21 teaches you *what to store as the key* when equivalence is **structural**, not literal.

**C-Rank Day 11 — Sliding Window + Hash Map:** The window map tracked `character → count in range`. Hash key design is the same frequency idea, but applied to **whole strings** as grouping keys — not a moving window.

### 4. Canonical key technique #1 — sorted string

When equivalence is **same multiset of characters** (anagrams):

```
words = ["eat", "tea", "tan", "ate", "nat", "bat"]

key("eat") = sort("eat") = "aet"   →  group: ["eat", "tea", "ate"]
key("tan") = sort("tan") = "ant"   →  group: ["tan", "nat"]
key("bat") = sort("bat") = "abt"   →  group: ["bat"]
```

```
map:
  "aet" → ["eat", "tea", "ate"]
  "ant" → ["tan", "nat"]
  "abt" → ["bat"]
```

**Time:** O(k log k) per word of length k. **Space:** O(n × k) for n words.

**When to use:** Anagrams, permutations, any "same letters, different order" grouping.

### 5. Canonical key technique #2 — difference encoding

When equivalence is **same relative shifts** (Caesar-shifted strings):

```
"abc" → differences from first char: (0, 1, 2)    // a→a, b→a+1, c→a+2
"bcd" → differences from first char: (0, 1, 2)    // b→b, c→b+1, d→b+2
"ace" → differences from first char: (0, 2, 4)    // different pattern
```

```
diff[i] = (s[i] - s[0] + 26) % 26    for i = 1..len-1
key = tuple of diffs, prefixed with length
```

```
"abc"  →  key = (3, 0, 1, 2)
"bcd"  →  key = (3, 0, 1, 2)   ✓ same group
"ace"  →  key = (3, 0, 2, 4)   ✗ different group
```

**Why modulo 26?** Negative differences from wrap-around (`"az"` → diff is 25, not -1) must normalize consistently.

**When to use:** Shifted strings, strings with constant offset between corresponding characters.

### 6. Canonical key technique #3 — pattern mapping

For **isomorphism** (structure-preserving relabeling):

```
s = "egg",  t = "add"

Pattern for s: e→a, g→b  →  pattern key captures relative roles
Pattern for t: a→?, d→?  →  same structural key if isomorphic
```

Build a key by replacing each character with its **first-occurrence rank**:

```
"egg" → e is 1st new → '0', g is 2nd new → '1', g repeats → '1'  →  "011"
"add" → a is 1st new → '0', d is 2nd new → '1', d repeats → '1'  →  "011"  ✓
```

**When to use:** Isomorphic strings, word pattern matching, any "same shape, different labels" problem.

### 7. Canonical key technique #4 — length-prefixed encoding

When you must **serialize a list of strings** for later decoding without delimiter ambiguity:

```
words = ["hello", "world"]

delimiter encoding:  "hello#world"     →  breaks if a word contains '#'
length-prefixed:      "5#hello5#world"  →  decoder reads 5 chars, then 5 chars  ✓
```

```
encode:  for each word, append str(len) + '#' + word
decode:  read digits until '#', read that many chars, repeat
```

**When to use:** Encode and Decode Strings (#271), any serialization where delimiters can appear in data.

### 8. What problem does this pattern solve?

- **Group equivalent items** — anagrams, shifted strings, isomorphic pairs
- **Deduplicate by structure** — same pattern, different surface form
- **Serialize/deserialize** — length-prefixed strings, custom encodings
- **O(1) average lookup** of "have I seen this equivalence class before?"

### 9. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Compare every pair of strings for anagram | O(n² × k) — key design is O(n × k log k) |
| Sort each pair to check shifted equivalence | O(n² × k log k) — difference key is O(n × k) |
| Use raw string as hash key for anagrams | No grouping at all — defeats the purpose of the map |
| Delimiter-based encoding with ambiguous chars | Decode breaks on edge cases — length prefix is safe |

### 10. The key observation

The hash map is a **grouping machine**. Its power depends entirely on key quality:

```
bad key  →  every item isolated  →  map is just a list
good key →  equivalents collide  →  map does the grouping for you
```

Before coding, ask: *"What property makes two inputs equivalent? How do I encode only that property?"*

| Equivalence type | Canonical key |
|---|---|
| Same character multiset | Sorted string or freq tuple |
| Same shift pattern | Difference tuple from first char |
| Same structural mapping | First-occurrence rank string |
| Lossless list serialization | Length-prefixed concat |

### 11. Pattern signals & recognition clues

| When the problem says… | Think hash key design |
|---|---|
| "group anagrams" / "same letters" | Sorted string key |
| "shifted strings" / "same shift sequence" | Difference encoding key |
| "isomorphic" / "same pattern" | Rank/mapping key |
| "encode and decode" a string list | Length-prefixed serialization |
| "group by equivalence" + strings | Design canonical key, then hash map |

**Keywords:** `group` · `anagram` · `shifted` · `isomorphic` · `encode` · `decode` · `equivalent` · `canonical` · `fingerprint`

### 12. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Hashing the raw string for anagrams | Sort letters (or count frequencies) to build the key |
| Forgetting modulo on difference keys | `(s[i] - s[0] + 26) % 26` handles wrap-around |
| Not including string length in shift key | `"ab"` and `"abc"` can share partial diffs — prefix with length |
| Using a delimiter that appears in input | Length-prefixed encoding avoids ambiguity |
| Building key with O(k log k) sort when k ≤ 26 | Sort is fine; or use `int[26]` freq as tuple key for O(k) |

### 13. Recognition drill

Read this problem aloud:

> *"Given an array of strings, group the anagrams together."*

Before coding, say:

> *"Anagram = same multiset → canonical key = sorted letters. Hash map: key → list of words. Return all groups."*

---

## Part 2 — What's Next

Today you'll apply hash key design to two classic grouping problems:

1. **Sorted key** — Group Anagrams (#49)
2. **Difference encoding** — Group Shifted Strings (#249)

The map from Day 4 doesn't change. The key you feed it does.

---

*You understand canonical fingerprints. First quest: group anagrams by sorted key. →*
