# 📝 The Frequency Counting Pattern

> **Day 3** · Frequency Counting · ★★☆☆☆ · 8 min read

---

Instead of comparing elements one-by-one, you **count how many times each element appears** — then answer questions from the tally.

Think of it like an inventory sheet: you don't inspect every shelf repeatedly; you check the counts once.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

Maintain a tally — how many times each character or value has appeared — using:

- **`int[26]`** when input is lowercase letters only
- **Hash map** when keys can be anything (integers, words, Unicode)

Then answer questions by reading the tally, not by re-scanning the data.

### 2. Simple explanation

If someone asks "do these two bags have the same fruit?", you don't compare fruit one-by-one in nested loops. You count each type in both bags and compare the counts.

Frequency counting turns **pairwise comparison** into **tally comparison**.

### 3. Small visual example

Count letters in `"hello"`:

```
char:   h   e   l   l   o
index:  7   4  11  11  14   (h=7, e=4, l=11, o=14 in a-z)

freq[7]++  → 1
freq[4]++  → 1
freq[11]++ → 1, then 2
freq[14]++ → 1

Result: h:1  e:1  l:2  o:1
```

Compare `"listen"` and `"silent"` with **one array** — increment for the first string, decrement for the second:

```
After "listen":  l:1  i:1  s:1  t:1  e:1  n:1
After "silent":  all counts → 0  ✓  (anagram!)
```

### 4. How the pattern works

**Build counts (one pass):**
```
for each character c:
    freq[index(c)]++
```

**Compare two strings (increment/decrement):**
```
for i in range(len(s)):
    freq[s[i]]++
    freq[t[i]]--
check all freq values are 0
```

**Find "first unique" (two passes):**
```
Pass 1: build counts
Pass 2: walk original string, return first char with count == 1
```

### 5. What problem does this pattern solve?

- Are two strings **anagrams**? (same multiset of characters)
- Which character appears **most/least** often?
- What is the **first non-repeating** character?
- Do two collections share the **same composition**?

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Nested loops comparing every pair | O(n²) |
| Sort both strings, then compare | O(n log n) — counting is O(n) |
| Re-scan the array for each query | Redundant recounting |

### 7. The key observation

When the question is about **what's inside** a collection (not the order), order doesn't matter. Count once, answer many times.

For lowercase letters, `int[26]` is a perfect hash map with zero collisions.

### 8. Pattern signals & recognition clues

| When the problem says… | Think frequency counting |
|---|---|
| "anagram" / "permutation" / "same characters" | Increment/decrement one array |
| "count occurrences" / "how many times" | Build freq map, scan for max/min |
| "first unique" / "non-repeating" | Two-pass: count, then scan in order |
| "most frequent" / "majority" | Count, then find peak |

**Keywords:** `anagram` · `permutation` · `count` · `frequency` · `first unique` · `most common`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Sorting when counting works | Counting is O(n) vs O(n log n) sort |
| Using HashMap for lowercase-only input | `int[26]` is simpler and faster |
| Scanning freq array for "first unique" | Walk the **original string** in Pass 2 to preserve order |
| Forgetting length check on anagrams | Different lengths → instant false |

### 10. Recognition drill

Read this problem aloud:

> *"Given two strings, determine if one is an anagram of the other."*

Before coding, say:

> *"Same multiset, order irrelevant → increment/decrement freq array, check all zeros."*

---

## Part 2 — Choosing Your Container

| Scenario | Use | Why |
|---|---|---|
| Lowercase letters only | `int[26]` | O(1) access, no hashing overhead |
| Mixed ASCII | `int[128]` | Covers full ASCII range |
| Arbitrary keys (words, ints) | Hash map | Flexible key types |

> 💡 A frequency array **is** a hash map — a perfect one when the key space is small and known.

---

*You understand the pattern. First quest: detecting anagrams. →*
