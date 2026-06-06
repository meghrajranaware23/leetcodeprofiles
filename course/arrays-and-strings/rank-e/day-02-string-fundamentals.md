---
# ⚔ Day 2: String Fundamentals & Manipulation

**Rank:** E-Rank | **Difficulty:** ★☆☆☆☆ | **XP:** 50 | **Time:** 45 min

---

## 🎯 Mission
Understand strings as character arrays and master the core manipulation patterns that appear in 40%+ of interview problems.

## 📝 Concept

Here's the truth most courses won't tell you upfront: **a string is just an array with a restricted alphabet.** Every technique you learned on Day 1 — forward traversal, backward traversal, read-write pointers, in-place modification — applies directly to strings.

The difference? Strings come with language-specific baggage: immutability rules, encoding quirks, and built-in methods that can either save you or silently tank your time complexity. Today, you'll learn to see through the abstraction.

### Strings as Character Arrays

At the hardware level, a string is a contiguous block of characters in memory — exactly like an integer array, but each element is a character (typically 1 byte for ASCII, up to 4 bytes for Unicode).

```
String:  "HELLO"

Memory:  [H] [E] [L] [L] [O]
Index:    0    1    2    3    4
```

You can index into it. You can iterate over it. You can apply two-pointer techniques. The only catch is whether your language lets you *modify* it in place.

### Mutability: The Critical Difference

This is where C++, Python, and Java diverge sharply — and where performance bugs hide.

```
┌────────────┬───────────┬────────────────────────────────┐
│  Language  │  Mutable? │  How to build strings          │
├────────────┼───────────┼────────────────────────────────┤
│  C++       │  YES      │  Modify std::string directly   │
│  Python    │  NO       │  Use list + ''.join()          │
│  Java      │  NO       │  Use StringBuilder             │
└────────────┴───────────┴────────────────────────────────┘
```

**C++ — Strings are mutable:**
```cpp
string s = "hello";
s[0] = 'H';        // ✓ Direct modification, O(1)
s += " world";     // ✓ Append, amortized O(1)
```

**Python — Strings are immutable:**
```python
s = "hello"
s[0] = 'H'         # ✗ TypeError! Strings are immutable

# WRONG (O(n²) for n concatenations):
result = ""
for ch in some_list:
    result += ch       # Creates a NEW string every time

# RIGHT (O(n)):
chars = []
for ch in some_list:
    chars.append(ch)
result = ''.join(chars)
```

**Java — Strings are immutable:**
```java
String s = "hello";
s = s + " world";     // ✗ Creates a NEW String object (old one is garbage)

// WRONG (O(n²)):
String result = "";
for (char ch : arr) {
    result += ch;       // New String object every iteration
}

// RIGHT (O(n)):
StringBuilder sb = new StringBuilder();
for (char ch : arr) {
    sb.append(ch);
}
String result = sb.toString();
```

**Why does immutability cause O(n²)?**

Each `+=` operation on an immutable string creates a brand-new string. If the string has length `k`, that's O(k) work to copy all existing characters plus the new one. Over `n` operations, the total work is `1 + 2 + 3 + ... + n = O(n²)`.

This is the single most common performance bug in string interview problems. Interviewers *will* ask about it.

### Character-Level Operations

Strings are fundamentally sequences of characters, and many problems require you to inspect or transform individual characters. Know these operations cold:

**ASCII Value Awareness:**
```
'A' = 65    'Z' = 90     (uppercase letters: 65–90)
'a' = 97    'z' = 122    (lowercase letters: 97–122)
'0' = 48    '9' = 57     (digit characters: 48–57)

Uppercase to lowercase: ch + 32  (or ch | 32 for bit trick)
Lowercase to uppercase: ch - 32  (or ch & ~32 for bit trick)
Char to digit:          ch - '0' (e.g., '7' - '0' = 7)
```

**Character Classification:**
```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│   Check          │   C++            │   Python         │   Java           │
├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Is letter?       │ isalpha(ch)      │ ch.isalpha()     │ Character.       │
│                  │                  │                  │   isLetter(ch)   │
│ Is digit?        │ isdigit(ch)      │ ch.isdigit()     │ Character.       │
│                  │                  │                  │   isDigit(ch)    │
│ Is alphanumeric? │ isalnum(ch)      │ ch.isalnum()     │ Character.       │
│                  │                  │                  │   isLetterOr     │
│                  │                  │                  │   Digit(ch)      │
│ To lowercase     │ tolower(ch)      │ ch.lower()       │ Character.       │
│                  │                  │                  │   toLowerCase(ch)│
│ To uppercase     │ toupper(ch)      │ ch.upper()       │ Character.       │
│                  │                  │                  │   toUpperCase(ch)│
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

These functions show up in almost every string problem. Memorize them.

### Reversal Patterns and Palindrome Checking

String reversal is the foundation of palindrome problems, and palindrome checking is everywhere in interviews.

**A palindrome** reads the same forward and backward: `"racecar"`, `"madam"`, `"level"`.

The two-pointer approach is the gold standard:

```
"racecar"
 L→   ←R

Compare s[L] with s[R]:
  'r' == 'r' ✓  →  L++, R--
  'a' == 'a' ✓  →  L++, R--
  'c' == 'c' ✓  →  L++, R--
  L >= R → stop → palindrome confirmed ✓
```

This is O(n) time, O(1) space — far better than reversing the string and comparing (which uses O(n) space).

### String Comparison Subtleties

String comparison isn't as simple as `==` in every language:

- **C++:** `==` compares content (overloaded for `std::string`). Safe.
- **Python:** `==` compares content. `is` compares identity (same object). Use `==` for value comparison.
- **Java:** `==` compares **references**, not content! Use `.equals()` for value comparison. This is a classic Java trap.

```java
String a = new String("hello");
String b = new String("hello");
a == b;        // false! Different objects in memory
a.equals(b);   // true — compares actual characters
```

**Lexicographic (dictionary) ordering** is how strings are compared character by character. `"apple" < "banana"` because `'a' < 'b'`. If one string is a prefix of another, the shorter one is "less": `"app" < "apple"`.

## 🔍 Pattern Recognition

**When to use this pattern:**
- The problem involves checking or transforming individual characters
- You need to compare a string with its reverse (or a modified version of itself)
- The problem asks you to build a new string from an existing one (watch for O(n²) traps)
- Two-pointer techniques apply naturally (palindromes, partitioning characters)
- You need to filter, clean, or normalize a string before processing

**Keywords in interview questions:**
- "case-insensitive"
- "alphanumeric only" / "ignore non-alphanumeric"
- "reverse"
- "palindrome"
- "anagram"
- "in-place"
- "without extra space"
- "words in a string"

**Common traps:**
- String immutability in Python/Java causing O(n²) concatenation in loops
- Forgetting to handle uppercase vs. lowercase when the problem says "case-insensitive"
- Using `==` instead of `.equals()` in Java for string comparison
- Not stripping/filtering non-alphanumeric characters when the problem requires it
- Assuming ASCII when the input might contain Unicode (clarify with interviewer)
- Off-by-one errors when extracting substrings: `s.substring(start, end)` in Java is `[start, end)` — end is exclusive

**What beginners miss:**
- Strings *are* arrays. If you can solve it for an integer array, you can likely adapt it for strings
- The O(n²) concatenation trap is the most common performance bug — interviewers actively look for it
- Many "string problems" are just "array problems with characters" — don't overthink the string aspect
- Python's string slicing `s[::-1]` is convenient but creates a new string (O(n) space)
- `StringBuilder` (Java) and `''.join()` (Python) are not optimizations — they are *requirements* for correct complexity

**How stronger coders think:**
- They immediately ask: "Is the string mutable in this language?" before writing any modification code
- They convert strings to character arrays when in-place modification is needed (Python/Java)
- They use two pointers for palindrome/reversal problems instead of creating reversed copies
- They recognize "word reversal" as a variant of the three-reverse trick from array problems
- They clarify character set assumptions early: ASCII only? Letters only? Alphanumeric?
- They think about empty strings, single characters, and strings with all identical characters as edge cases

## 💻 Code Example 1: Valid Palindrome

**Problem:** A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise. *(LeetCode #125)*

```
Input:  "A man, a plan, a canal: Panama"
Output: true
Explanation: After cleaning → "amanaplanacanalpanama" → palindrome ✓

Input:  "race a car"
Output: false
Explanation: After cleaning → "raceacar" → not a palindrome
```

### Visual Walkthrough

```
Original:  "A man, a plan, a canal: Panama"

Step 1: Use two pointers, skip non-alphanumeric, compare lowercase

 "A man, a plan, a canal: Panama"
  L                            R

  L='A' → alnum → lowercase → 'a'
  R='a' → alnum → lowercase → 'a'
  'a' == 'a' ✓ → L++, R--

 "A man, a plan, a canal: Panama"
    L                        R

  L='m' → alnum → 'm'
  R='m' → alnum → 'm'
  'm' == 'm' ✓ → L++, R--

  ... (skip non-alnum characters, keep comparing) ...

  All pairs match → return true ✓
```

**Key insight:** Don't create a cleaned string first. Use two pointers and skip non-alphanumeric characters on the fly. This avoids O(n) extra space.

### C++
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        
        while (left < right) {
            // Skip non-alphanumeric from the left
            while (left < right && !isalnum(s[left])) {
                left++;
            }
            // Skip non-alphanumeric from the right
            while (left < right && !isalnum(s[right])) {
                right--;
            }
            // Compare lowercase versions
            if (tolower(s[left]) != tolower(s[right])) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        
        while left < right:
            # Skip non-alphanumeric from the left
            while left < right and not s[left].isalnum():
                left += 1
            # Skip non-alphanumeric from the right
            while left < right and not s[right].isalnum():
                right -= 1
            # Compare lowercase versions
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        
        return True
```

### Java
```java
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            // Skip non-alphanumeric from the left
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            // Skip non-alphanumeric from the right
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            // Compare lowercase versions
            if (Character.toLowerCase(s.charAt(left)) != 
                Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

### Why This Works
Two pointers start at opposite ends and move inward. At each step, both pointers skip any characters that aren't letters or digits. Then they compare the lowercase versions of the characters they land on. If any pair doesn't match, the string is not a palindrome. If the pointers cross without a mismatch, it is.

This approach processes the original string directly — no need to create a cleaned or reversed copy.

### Complexity Analysis
- **Time:** O(n) — each pointer moves at most n steps total
- **Space:** O(1) — only two integer variables, no extra string created

---

## 💻 Code Example 2: Reverse Words in a String

**Problem:** Given an input string `s`, reverse the order of the **words**. A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. *(LeetCode #151)*

```
Input:  "  the sky   is blue  "
Output: "blue is sky the"

Input:  "hello world"
Output: "world hello"
```

### Visual Walkthrough

**Approach 1: Split → Reverse → Join (clean and universal)**
```
Input:   "  the sky   is blue  "

Step 1:  Split on whitespace (skip empty entries)
         → ["the", "sky", "is", "blue"]

Step 2:  Reverse the list
         → ["blue", "is", "sky", "the"]

Step 3:  Join with single space
         → "blue is sky the"
```

**Approach 2: In-place (C++ — exploits mutability)**
```
"  the sky   is blue  "

Step 1: Remove extra spaces → "the sky is blue"
Step 2: Reverse entire string → "eulb si yks eht"
Step 3: Reverse each word     → "blue is sky the"  ✓
```

This is the three-reverse trick from Day 1, adapted for words instead of array halves.

### C++
```cpp
class Solution {
public:
    string reverseWords(string s) {
        // Step 1: Remove leading, trailing, and extra spaces
        int write = 0;
        int n = s.size();
        for (int read = 0; read < n; read++) {
            if (s[read] != ' ') {
                if (write > 0) s[write++] = ' '; // Add space between words
                while (read < n && s[read] != ' ') {
                    s[write++] = s[read++];
                }
            }
        }
        s.resize(write); // Trim to actual content
        
        // Step 2: Reverse entire string
        reverse(s.begin(), s.end());
        
        // Step 3: Reverse each individual word
        int start = 0;
        for (int i = 0; i <= s.size(); i++) {
            if (i == s.size() || s[i] == ' ') {
                reverse(s.begin() + start, s.begin() + i);
                start = i + 1;
            }
        }
        
        return s;
    }
};
```

### Python
```python
class Solution:
    def reverseWords(self, s: str) -> str:
        # split() with no arguments splits on any whitespace
        # and automatically handles leading/trailing/multiple spaces
        words = s.split()
        
        # Reverse the list of words and join with single space
        return ' '.join(words[::-1])
        
        # Alternative — more explicit:
        # words.reverse()
        # return ' '.join(words)
```

### Java
```java
class Solution {
    public String reverseWords(String s) {
        // Trim leading/trailing spaces, split on one or more spaces
        String[] words = s.trim().split("\\s+");
        
        // Reverse the array of words
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) {
                sb.append(' ');
            }
        }
        
        return sb.toString();
    }
}
```

### Why This Works

The split-reverse-join approach is the cleanest and most readable. It leverages built-in string splitting to extract words (ignoring extra spaces), reverses the word order, and joins them back with a single space.

The C++ in-place approach uses the three-reverse trick: reversing the entire string flips the word order *and* each word's characters. Then reversing each word individually restores the correct character order within each word. The result: words in reverse order, each spelled correctly.

Note that Python's `split()` (no arguments) is particularly powerful — it handles leading spaces, trailing spaces, and multiple consecutive spaces all at once.

### Complexity Analysis
- **Time:** O(n) — each character is processed a constant number of times
- **Space:** O(n) for Python/Java (the word list and result string); O(1) extra for C++ in-place approach (beyond the mutable string itself)

## ⚠️ Common Mistakes

1. **O(n²) string concatenation in Python/Java** — This is the #1 string performance trap. Every `result += char` creates a new string object and copies all previous characters. Over `n` iterations, that's `1 + 2 + 3 + ... + n = O(n²)` total work. **Fix:** Use `list` + `''.join()` in Python, `StringBuilder` in Java. In interviews, if an interviewer sees `result += char` in a loop, they *will* call it out.

2. **Not handling empty strings and single-character strings** — An empty string `""` is a valid palindrome. A single character `"a"` is always a palindrome. Your two-pointer loop should handle these naturally (the `while left < right` condition fails immediately), but verify it does. Also check: what if the input is all spaces? `"   ".split()` returns `[]` in Python — does your code handle that?

3. **Confusing character vs. string comparison** — In Java, `'a'` is a `char` (primitive) and `"a"` is a `String` (object). Comparing `char` with `==` is fine. Comparing `String` with `==` checks reference equality, not content. In Python, `'a'` and `"a"` are both strings — there's no separate char type. Single characters are just strings of length 1. Know the difference in your target language.

4. **Forgetting to normalize case** — "Racecar" is a palindrome when case-insensitive, but not when case-sensitive. If the problem says "case-insensitive," convert *both* characters to lowercase (or uppercase) before comparing. Don't convert just one.

5. **Not filtering non-alphanumeric characters properly** — In Valid Palindrome, spaces, punctuation, and special characters are ignored. A common bug: filtering them into a new string (O(n) space) instead of skipping them with two pointers (O(1) space). Another bug: forgetting that digits are alphanumeric — `'0'` through `'9'` should be included.

## 🏋️ Mini Challenge

**Problem:** Reverse Only Vowels of a String (LeetCode #345)

Given a string `s`, reverse only all the vowels in the string and return it. The vowels are `'a'`, `'e'`, `'i'`, `'o'`, `'u'`, and they can appear in both cases.

```
Input:  "IcesCreamed"
Output: "ecesCrIamid"
```

**Hint:** Use two pointers converging from both ends. Skip non-vowel characters. When both pointers land on vowels, swap them.

**Expected approach:** Two-pointer technique. Left pointer moves right, skipping non-vowels. Right pointer moves left, skipping non-vowels. When both point to vowels, swap and continue. Store vowels in a set for O(1) lookup: `{'a','e','i','o','u','A','E','I','O','U'}`.

## 📚 Practice Problems

| Problem | Difficulty | Platform | Key Pattern |
|---------|-----------|----------|-------------|
| [Reverse String](https://leetcode.com/problems/reverse-string/) | Easy | LeetCode #344 | Two-pointer swap, in-place reversal |
| [Reverse String II](https://leetcode.com/problems/reverse-string-ii/) | Easy | LeetCode #541 | Reversal with step/interval logic |
| [Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/) | Easy | LeetCode #557 | Per-word reversal, preserving spaces |
| [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) | Easy | LeetCode #680 | Two-pointer palindrome with one skip |
| [Is Subsequence](https://leetcode.com/problems/is-subsequence/) | Easy | LeetCode #392 | Two-pointer traversal across two strings |
