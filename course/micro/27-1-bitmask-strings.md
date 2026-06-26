# 📝 Bitmask Strings

> **Day 27** · Bitmask Character Sets · 20 XP · 15 min read

---

On E-Rank Day 4 you used a **hash set** to track which characters appear — O(1) membership, but each lookup touches the heap. Today you pack the same information into a single integer: **26 bits, one per lowercase letter**. Membership becomes a bitwise AND. Union becomes OR. "No shared characters" becomes `(maskA & maskB) == 0`.

Bitmasks turn set operations into arithmetic — fast, cache-friendly, and elegant.

---

## Part 1 — Learn the Pattern

### 1. What is a character bitmask?

A **bitmask** uses the bits of an integer to represent a set. For lowercase English letters, bit `i` is 1 iff character `'a' + i` is present:

```
Character → bit position:

  a b c d e f g h i j k l m n o p q r s t u v w x y z
  0 1 2 3 4 5 6 7 8 9 ...

Example: "abc"

  bit:  ... 2 1 0  (c=2, b=1, a=0)
  mask: ... 1 1 1  = 0b111 = 7

  zyxwvutsrqponmlkjihgfedcba
  00000000000000000000000111  ← "abc"
```

```
Bitmask diagram — building "cat":

  Start: mask = 0
         00000000000000000000000000

  'c' (bit 2): mask |= (1 << 2)
         00000000000000000000000100

  'a' (bit 0): mask |= (1 << 0)
         00000000000000000000000101

  't' (bit 19): mask |= (1 << 19)
         00000000010000000000000101
                              ^    ^
                              a    c
                    t ─────────────┘
```

**Build a mask from a string:**
```
mask = 0
for each char c in s:
    mask |= (1 << (c - 'a'))
```

### 2. Core bitmask operations

| Set operation | Bitmask code | Meaning |
|---|---|---|
| Add char `c` | `mask \|= (1 << (c - 'a'))` | Turn on bit for c |
| Has char `c`? | `mask & (1 << (c - 'a'))` | Is bit on? |
| Union of A and B | `maskA \| maskB` | All chars in either |
| Intersection | `maskA & maskB` | Chars in both |
| No overlap? | `(maskA & maskB) == 0` | Disjoint character sets |
| Count bits (popcount) | `__builtin_popcount(mask)` / `bin(mask).count('1')` | Number of distinct chars |

All operations are **O(1)** — a single integer, no hash table overhead.

### 3. XOR tricks — the self-inverse property

**XOR (⊕)** is bitmask's secret weapon:

```
Properties:
  a ^ a = 0        (self-inverse — cancel pairs)
  a ^ 0 = a        (identity)
  a ^ b ^ b = a    (order doesn't matter for pairs)

Example — Single Number (#136):
  nums = [4, 1, 2, 1, 2]
  xor  = 4 ^ 1 ^ 2 ^ 1 ^ 2
       = 4 ^ (1 ^ 1) ^ (2 ^ 2)
       = 4 ^ 0 ^ 0
       = 4  ✓  (the lone element)
```

```
XOR cancellation trace:

  4  1  2  1  2
  ↓
  4  5  7  6  4   (running XOR)
     ↑     ↑
     pair cancels at second 1
           pair cancels at second 2
  Final: 4
```

**When to reach for XOR:**
- "Every element appears twice except one" → XOR all elements
- "Find the missing number" (1..n with one gap) → XOR indices and values
- "Swap without temp variable" → `a ^= b; b ^= a; a ^= b`

### 4. Cross-rank bridge — E-Rank Day 4 hash set

**E-Rank Day 4 — Hash Maps & Sets** tracked membership with `set` or `map`:

| Hash Set (Day 4) | Bitmask |
|---|---|
| `set.add(c)` | `mask \|= (1 << (c - 'a'))` |
| `c in set` | `mask & (1 << (c - 'a'))` |
| `len(set)` | `popcount(mask)` |
| `setA & setB empty` | `(maskA & maskB) == 0` |
| Works for any hashable type | **Lowercase letters only** (26 bits) |
| O(1) average, heap allocation | O(1) true, single register |

```
Day 4:   "Is 'x' in the set?" → hash lookup
Day 27:  "Is 'x' in the set?" → one AND with a power of 2
```

**When to use bitmask over hash set:**
- Alphabet is small and fixed (26 lowercase letters)
- You need fast union/intersection/disjoint checks across many pairs
- Space matters — one `int` instead of a hash table

**When hash set wins:**
- Unicode, digits, mixed character types
- Need to store associated values (use map, not bitmask)

**E-Rank Day 3 — Frequency Counting** counted *how many* of each character. Bitmask only tracks *presence* (0 or 1). For frequency > 1, stay with a map or array — unless you shift to frequency bitmasks (advanced, beyond today).

### 5. Maximum Product of Word Lengths — the flagship pattern

Given an array of words, find the maximum `len(wordA) × len(wordB)` where the two words share **no letters**.

```
words = ["abcw","baz","foo","bar","xtfn","abcdef"]

Masks:
  "abcw"   → bits 0,1,2,22  (a,b,c,w)
  "baz"    → bits 1,0,25    (b,a,z)
  "foo"    → bits 5,14,14   (f,o,o) → bits 5,14
  "abcdef" → bits 0,1,2,3,4,5

"abcw" & "baz" = 0b...101 & 0b...1011 ≠ 0  (share a, b)
"abcw" & "foo" = 0                           (disjoint!) ✓
  product = 4 × 3 = 12

Best pair: "abcw"(4) × "xtfn"(4) or similar → track global max
```

**Algorithm shape:**
1. Convert each word to a bitmask.
2. For each pair (i, j), if `masks[i] & masks[j] == 0`, update max product.
3. O(n²) pairs — acceptable for n ≤ 1000.

### 6. What problems does this pattern solve?

- **Single Number** (#136) — XOR cancels pairs
- **Single Number II** (#137) — bit-counting per position (advanced)
- **Single Number III** (#260) — XOR to split, then two groups
- **Maximum Product of Word Lengths** (#318) — bitmask disjoint check
- **Counting Bits** (#338) — DP on bit patterns
- **Subsets** (#78) — iterate all 2^n subsets via bitmask

All share: *"Pack set membership or parity into bits; operate with AND/OR/XOR."*

### 7. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Compare every char pair between two words for overlap | O(L²) per pair — bitmask check is O(1) |
| Hash set per word, intersect for each pair | Works but slower constant — bitmask is one AND |
| Nested loops without precomputed masks | Rebuilds character set every comparison |
| Sorting + two pointers for Single Number | O(n log n) — XOR is O(n) O(1) space |

### 8. Pattern signals & recognition clues

| When the problem says… | Think bitmask |
|---|---|
| "every element appears twice except one" | XOR all elements |
| "no common letters" / "no shared characters" | Bitmask AND == 0 |
| "lowercase English letters only" | 26-bit mask fits in int |
| "maximum product of two words" with disjoint constraint | Precompute masks, O(n²) pairs |
| "find the single number" / "unique element" | XOR cancellation |

**Keywords:** `bitmask` · `XOR` · `single number` · `no common letters` · `lowercase letters` · `distinct characters` · `popcount`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using bitmask for uppercase + lowercase | 52 bits still fits, but shift correctly: `'A'` is different from `'a'` |
| Forgetting XOR is for pairs, not triples | "Except one" (appears once) → XOR. "Except one" (appears three times) → #137 bit-count |
| `maskA & maskB` when you want union | Union is `\|`, intersection is `&`, disjoint is `& == 0` |
| Not precomputing masks | Build once per word, reuse for all pairs |
| Using hash set when bitmask suffices | 26-letter constraint → bitmask is simpler and faster |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of words, pick two words whose concatenation has no duplicate letters. Return the maximum product of their lengths."*

Before coding, say:

> *"No shared letters → bitmask per word. Pair check: masks[i] & masks[j] == 0. Track max len[i] × len[j]. O(n²) pairs, O(1) per check."*

---

## Part 2 — What's Next

Today you'll apply bitmasks to two problems:

1. **XOR cancellation** — Single Number (#136): every element twice except one
2. **Bitmask disjoint sets** — Maximum Product of Word Lengths (#318): no shared letters

The checkpoint splits two lone numbers — XOR to find combined difference, then partition (#260).

---

*You know the bitmask. First quest: XOR your way to the unique element. →*
