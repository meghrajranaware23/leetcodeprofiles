# 📝 Strings as Character Arrays

> **Day 2** · String Manipulation · ★☆☆☆☆ · 8 min read

---

A string is an array of characters with a restricted alphabet. Day 1's pointer ideas apply directly — today you learn **two pointers on strings**.

---

## Part 1 — String Basics (Read This First)

### Mutability: The Critical Difference

```
┌──────────┬──────────┬───────────────────────────┐
│ Language │ Mutable? │ How to build strings      │
├──────────┼──────────┼───────────────────────────┤
│ C++      │ YES      │ Modify std::string direct │
│ Python   │ NO       │ Use list + ''.join()      │
│ Java     │ NO       │ Use StringBuilder         │
└──────────┴──────────┴───────────────────────────┘
```

> ⚠ In Python/Java, `result += char` in a loop is **O(n²)** — it copies the whole string every time. Use a list or StringBuilder instead.

### Character-Level Operations

```
ASCII:  'A'=65  'a'=97  '0'=48
Lowercase:  ch + 32  (or tolower / .lower())
Digit:      ch - '0'
```

---

## Part 2 — Two Pointers on Strings

### 1. What is the pattern?

Two indices on a string — one at the **left**, one at the **right** — moving toward each other:

- **Compare mode** — check if left and right characters match (palindrome)
- **Swap mode** — exchange left and right characters (reverse)

Both use the same skeleton: `while left < right`.

### 2. Simple explanation

Many string problems are **symmetric** — what happens at the start mirrors what happens at the end. Instead of copying or reversing the whole string, you work from both ends inward, one pair at a time.

### 3. Small visual examples

**Reverse (swap mode):**
```
["h", "e", "l", "l", "o"]
  L                    R

Swap h↔o → ["o", "e", "l", "l", "h"]
       L         R

Swap e↔l → ["o", "l", "l", "e", "h"]
          L  R

L >= R → done ✓
```

**Palindrome (compare mode):**
```
"racecar"
 L     R

'r' == 'r' ✓ → L++, R--
'a' == 'a' ✓ → L++, R--
... until L >= R → palindrome ✓
```

**Skip junk characters (compare + filter):**
```
"A man, a plan..."
 L              R

Skip ',' and spaces by advancing L or R until both hit letters, then compare.
```

### 4. How the pattern works

```
left = 0, right = len - 1
while left < right:
    skip invalid chars at left/right (if needed)
    compare OR swap s[left] and s[right]
    left++, right--
```

One pass. O(n) time. O(1) extra space when comparing or swapping in place.

### 5. What problem does this pattern solve?

- **Palindromes** — symmetric character comparison
- **In-place reversal** — mirror the string without a copy
- **Filtered comparison** — skip spaces/punctuation while checking symmetry

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Reverse a copy, then compare | Extra O(n) space and two passes |
| Build a cleaned string first | Allocates memory; two passes |
| Single pointer left-to-right only | Cannot check symmetry without a right pointer |

### 7. The key observation

Palindromes and reversals only care about **pairs of symmetric positions**. Two indices from opposite ends handle both in one walk — no preprocessing required.

### 8. Pattern signals & recognition clues

| When the problem says… | Two-pointer mode |
|---|---|
| "palindrome" / "reads same backward" | Compare from both ends |
| "reverse" / "mirror in-place" | Swap from both ends |
| "alphanumeric only" / "ignore punctuation" | Compare + skip logic |
| "case-insensitive" | Lowercase both sides at compare time |

**Keywords:** `palindrome` · `reverse` · `in-place` · `both ends` · `alphanumeric`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `result += char` in Python/Java loops | Use list + join or StringBuilder |
| Building a cleaned copy before checking | Skip invalid chars inside the loop |
| Comparing with `==` on Java strings incorrectly | Use `.equals()` for string objects |
| Forgetting to lowercase both sides | Normalize both characters before compare |

### 10. Recognition drill

Read this problem aloud:

> *"Check if a phrase is a palindrome, ignoring non-alphanumeric characters and case."*

Before coding, say:

> *"Symmetric compare from both ends, skip junk on the fly, lowercase at compare time."*

---

*You understand the pattern. Your first string quest awaits. →*
