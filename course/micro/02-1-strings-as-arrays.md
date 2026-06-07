# 📝 Strings as Character Arrays

> **Day 2** · String Manipulation · ★☆☆☆☆ · 5 min read

---

Here's the truth: **a string is just an array with a restricted alphabet.** Every technique from Day 1 — traversal, two pointers, read-write patterns — applies directly.

The difference? Strings come with language-specific baggage that can silently tank your performance.

## Mutability: The Critical Difference

```
┌──────────┬──────────┬───────────────────────────┐
│ Language │ Mutable? │ How to build strings      │
├──────────┼──────────┼───────────────────────────┤
│ C++      │ YES      │ Modify std::string direct │
│ Python   │ NO       │ Use list + ''.join()      │
│ Java     │ NO       │ Use StringBuilder         │
└──────────┴──────────┴───────────────────────────┘
```

> ⚠ **Watch Out:** In Python/Java, `result += char` inside a loop is **O(n²)** — it creates a new string every iteration. This is the #1 string performance trap. Interviewers actively look for it.

**The fix:**
- **Python:** Build a list, then `''.join(chars)` at the end
- **Java:** Use `StringBuilder.append()`, then `.toString()`

---

## Character-Level Operations

Know these cold — they appear in almost every string problem:

```
ASCII values:
  'A'=65  'Z'=90   (uppercase)
  'a'=97  'z'=122  (lowercase)
  '0'=48  '9'=57   (digits)

Conversions:
  uppercase → lowercase:  ch + 32  (or tolower/lower())
  char → digit:           ch - '0'
```

---

## The Palindrome Pattern

A palindrome reads the same forward and backward. The two-pointer approach is the gold standard:

```
"racecar"
 L→   ←R

Compare s[L] with s[R]:
  'r' == 'r' ✓  →  L++, R--
  'a' == 'a' ✓  →  L++, R--
  'c' == 'c' ✓  →  L++, R--
  L >= R → palindrome confirmed ✓
```

O(n) time, O(1) space — much better than reversing and comparing.

> 🎯 **Pattern Signal:** Palindrome, reverse, case-insensitive, or "alphanumeric only" → two pointers on a string.

---

*Time to apply these concepts. Your first string quest awaits. →*
