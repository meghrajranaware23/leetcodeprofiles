# 📝 The Frequency Counting Pattern

> **Day 3** · Frequency Counting · ★★☆☆☆ · 5 min read

---

Frequency counting is one of the most versatile patterns in DSA. Instead of comparing elements one-by-one, you **summarize data by counting occurrences** — then comparisons become trivial.

Think of it like an inventory sheet. You don't check every shelf — you check the counts.

## The Frequency Array (int[26])

When input is constrained to lowercase letters, skip the hash map. Use a simple integer array:

```
Character:  a  b  c  d  e  f  ... z
Index:      0  1  2  3  4  5  ... 25

Mapping:  index = char - 'a'
          'c' - 'a' = 2  →  freq[2]++
```

**O(1) access**, zero overhead — no hashing, no collisions, no memory allocation.

> 💡 **Key Insight:** A frequency array IS a hash map — just a perfect one with zero collisions for a known domain.

## The Hash Map (for everything else)

When elements can be anything — integers, Unicode, words — use a hash map:

```
Input: ["apple", "banana", "apple", "cherry", "banana", "apple"]
Map:   { "apple" → 3, "banana" → 2, "cherry" → 1 }
```

## When to Use Which?

| Scenario | Use | Why |
|---|---|---|
| Lowercase letters only | `int[26]` | Faster, simpler, cache-friendly |
| Mixed case / ASCII | `int[128]` | Covers all ASCII characters |
| Unicode / arbitrary keys | HashMap | Handles any element type |

## The Increment/Decrement Trick

To compare two strings, use **one** array: increment for string A, decrement for string B. If all entries are zero → match!

```
Process "listen":  freq[l]++ freq[e]++ freq[i]++ freq[s]++ freq[t]++ freq[n]++
Process "silent":  freq[s]-- freq[i]-- freq[l]-- freq[e]-- freq[n]-- freq[t]--
Result: all zeros → anagram confirmed ✓
```

> ⚡ **Pattern Signal:** Keywords like "anagram", "permutation", "count occurrences", "most frequent", "rearrange" → frequency counting.

---

*Time to apply this pattern. First quest: detecting anagrams. →*
