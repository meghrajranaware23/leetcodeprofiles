---
# ⚔ Day 3: Frequency Counting & Character Maps

**Rank:** E-Rank | **XP:** 75 | **Time:** 50 min

---

## 🎯 Mission

Master the frequency counting pattern — the foundation of at least 15% of all array and string interview problems.

## 📝 Concept

Frequency counting is one of the most versatile patterns in all of DSA. The idea is deceptively simple: instead of comparing elements one-by-one, you *summarize* the data by counting how often each element appears. Once you have those counts, comparisons, lookups, and decisions become trivial.

Think of it like a warehouse inventory. You don't check every shelf every time someone asks "do you have 5 red widgets?" — you check the inventory sheet. Frequency counting *is* building that inventory sheet for your data.

### The Frequency Array (Fixed-Size)

When your input is constrained — say, lowercase English letters only — you don't need a full hash map. You can use a simple integer array of size 26, where index 0 maps to `'a'`, index 1 to `'b'`, and so on.

```
Character:  a  b  c  d  e  f  ... z
Index:      0  1  2  3  4  5  ... 25
```

To map a character to its index, subtract the ASCII value of `'a'`:

```
index = char - 'a'
'c' - 'a' = 2  →  freq[2]++
```

This gives you **O(1) access** with zero overhead — no hashing, no collision resolution, no dynamic memory allocation. Competitive programmers almost always reach for `int freq[26]` before they reach for a hash map.

### The Frequency Map (Hash Map)

When the element domain is large or unknown — integers, Unicode characters, words, arbitrary objects — you use a hash map (dictionary, unordered_map).

```
Input:  ["apple", "banana", "apple", "cherry", "banana", "apple"]

freq_map = {
    "apple"  → 3,
    "banana" → 2,
    "cherry" → 1
}
```

The tradeoff: hash maps have slightly higher constant factors (hashing, collision handling, dynamic resizing) but support any key type.

### Comparing Frequencies: The Anagram Test

Two strings are anagrams if and only if they have *identical character frequencies*. This is the core insight behind dozens of interview problems.

**Approach 1: Two frequency arrays, then compare.**

```
s = "listen"    → freq_s = [0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0]
t = "silent"    → freq_t = [0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0]
                                                                              
freq_s == freq_t  →  TRUE → anagram!
```

**Approach 2: Single frequency array with increment/decrement.**

Build one array using the first string (increment), then consume it with the second string (decrement). If all entries end at zero, the strings are anagrams.

```
Step 1: Process "listen"
  freq[l]++ → freq[e]++ → freq[i]++ → freq[s]++ → freq[t]++ → freq[n]++

         e  i        l  n     s  t
  freq: [0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0]

Step 2: Process "silent"  
  freq[s]-- → freq[i]-- → freq[l]-- → freq[e]-- → freq[n]-- → freq[t]--

  freq: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         All zeros → anagram confirmed!
```

This single-array approach uses half the space and is slightly faster because you avoid a final comparison loop.

### The Frequency Difference Technique

Sometimes you don't need exact equality — you need to know *how* the frequencies differ. This shows up in problems like:

- "Minimum deletions to make two strings equal"
- "Can you rearrange string s to contain string t?"
- "Find the extra character"

Build a frequency difference array: increment for one string, decrement for the other. Non-zero entries reveal the discrepancies.

### When to Use `array[26]` vs `HashMap`

| Criteria | `int[26]` | HashMap |
|----------|-----------|---------|
| Input is lowercase a-z only | ✅ Best choice | Overkill |
| Input includes uppercase | Use `int[52]` or `int[128]` | Fine |
| Input is Unicode | ❌ Not practical | ✅ Required |
| Input is integers (any range) | ❌ Not practical | ✅ Required |
| Input is words/objects | ❌ Impossible | ✅ Required |
| Speed priority | ✅ Faster (no hashing) | Slightly slower |
| Memory | ✅ Fixed, tiny | Dynamic allocation |
| Code clarity | ✅ Very clean | Slightly more verbose |

**Rule of thumb:** If the problem says "lowercase English letters," use `int[26]`. For everything else, use a hash map.

## 🔍 Pattern Recognition

**When to use this pattern:**
- You need to check if two collections have the same elements (possibly in different order)
- The problem asks about character/element frequencies, counts, or occurrences
- You need to determine if one string/array is a rearrangement of another
- You're asked to find the most frequent, least frequent, or unique elements
- The problem involves comparing multisets (sets with duplicates)
- You need to build a histogram of data before making decisions

**Keywords in interview questions:**
- "anagram" or "permutation"
- "rearrange"
- "count occurrences" or "frequency"
- "most frequent" or "least frequent"
- "unique character" or "first non-repeating"
- "can you form" or "can you construct"
- "same characters"

**Common traps:**
- Assuming all inputs are lowercase when the problem says "letters" (could include uppercase)
- Not handling Unicode or extended character sets when the problem doesn't restrict to ASCII
- Forgetting that spaces, punctuation, and digits may be valid characters
- Off-by-one errors when mapping characters to array indices
- Using `char - 'a'` when the input might contain characters outside `a-z`, causing negative indices or buffer overflows
- Not checking string lengths first — if lengths differ, they can never be anagrams

**What beginners miss:**
- The single-array increment/decrement technique is almost always better than two separate arrays
- Frequency counting can replace sorting in many problems — and it's O(n) vs O(n log n)
- A frequency array IS a hash map, just a perfect one with zero collisions for a known domain
- Early termination: check `len(s) != len(t)` before doing any counting work
- Frequency arrays can be used as hash keys (for grouping anagrams) by converting them to tuples or strings

**How stronger coders think:**
- "Can I reduce this comparison to a frequency signature?" — this one question unlocks dozens of problems
- They see "anagram" and immediately think `int[26]`, not sorting
- They treat frequency arrays as canonical representations — two strings have the same frequency array if and only if they're anagrams
- They recognize that frequency counting generalizes: it works for characters, words, numbers, objects — anything countable
- Competitive programmers use frequency arrays as keys in hash maps to group anagrams in O(n·k) time instead of O(n·k·log(k)) with sorting

## 💻 Code Example 1: Valid Anagram (LeetCode #242)

**Problem:** Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram uses all original letters exactly once.

```
Input:  s = "anagram", t = "nagaram"

Building frequency array from s (increment):
  a:3  n:1  g:1  r:1  m:1

Consuming with t (decrement):
  Step: n→a→g→a→r→a→m
  After: a:0  n:0  g:0  r:0  m:0  →  All zeros!

Output: true
```

```
Input:  s = "rat", t = "car"

freq after s:  r:1  a:1  t:1
freq after t:  r:0  a:0  t:1  c:-1  →  Not all zeros!

Output: false
```

### C++

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        // Quick length check — different lengths can never be anagrams
        if (s.size() != t.size()) return false;

        // Fixed-size frequency array for lowercase letters
        int freq[26] = {0};

        // Single pass: increment for s, decrement for t
        for (int i = 0; i < s.size(); i++) {
            freq[s[i] - 'a']++;
            freq[t[i] - 'a']--;
        }

        // If all entries are zero, it's an anagram
        for (int i = 0; i < 26; i++) {
            if (freq[i] != 0) return false;
        }
        return true;
    }
};
```

### Python

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Quick length check — different lengths can never be anagrams
        if len(s) != len(t):
            return False

        # Fixed-size frequency array for lowercase letters
        freq = [0] * 26

        # Single pass: increment for s, decrement for t
        for i in range(len(s)):
            freq[ord(s[i]) - ord('a')] += 1
            freq[ord(t[i]) - ord('a')] -= 1

        # If all entries are zero, it's an anagram
        return all(f == 0 for f in freq)
```

### Java

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        // Quick length check — different lengths can never be anagrams
        if (s.length() != t.length()) return false;

        // Fixed-size frequency array for lowercase letters
        int[] freq = new int[26];

        // Single pass: increment for s, decrement for t
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        // If all entries are zero, it's an anagram
        for (int count : freq) {
            if (count != 0) return false;
        }
        return true;
    }
}
```

### Why This Works

Instead of sorting both strings (O(n log n)) and comparing, we build a frequency fingerprint in O(n) time. By incrementing for `s` and decrementing for `t` in a single array, we reduce the problem to checking if all counts return to zero. This is the textbook frequency counting pattern.

### Complexity Analysis

- **Time:** O(n) where n is the length of the strings. One pass through both strings, one pass through the 26-element array (constant).
- **Space:** O(1) — the frequency array is always exactly 26 integers, regardless of input size.

## 💻 Code Example 2: First Unique Character in a String (LeetCode #387)

**Problem:** Given a string `s`, find the first non-repeating character and return its index. If no such character exists, return `-1`.

```
Input:  s = "leetcode"

Pass 1 — Build frequency array:
  l:1  e:3  t:1  c:1  o:1  d:1

  Index:  0  1  2  3  4  5  6  7
  Char:   l  e  e  t  c  o  d  e
  Freq:   1  3  3  1  1  1  1  3

Pass 2 — Find first with freq == 1:
  Index 0: 'l' → freq = 1 → FOUND!

Output: 0
```

```
Input:  s = "aabb"

freq: a:2  b:2
Pass 2: No character has freq == 1

Output: -1
```

### C++

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        // Pass 1: Count frequency of each character
        int freq[26] = {0};
        for (char c : s) {
            freq[c - 'a']++;
        }

        // Pass 2: Find first character with frequency 1
        for (int i = 0; i < s.size(); i++) {
            if (freq[s[i] - 'a'] == 1) {
                return i;
            }
        }

        return -1;  // No unique character found
    }
};
```

### Python

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        # Pass 1: Count frequency of each character
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord('a')] += 1

        # Pass 2: Find first character with frequency 1
        for i, c in enumerate(s):
            if freq[ord(c) - ord('a')] == 1:
                return i

        return -1  # No unique character found
```

### Java

```java
class Solution {
    public int firstUniqChar(String s) {
        // Pass 1: Count frequency of each character
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }

        // Pass 2: Find first character with frequency 1
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }

        return -1;  // No unique character found
    }
}
```

### Why This Works

This is the classic two-pass frequency pattern. The first pass counts every character. The second pass walks the string in order and returns the first character whose count is exactly 1. We iterate the original string (not the frequency array) in the second pass to preserve positional order — this is a subtle but critical detail beginners often miss.

### Complexity Analysis

- **Time:** O(n) — two passes through the string, both linear.
- **Space:** O(1) — fixed 26-element array regardless of input size.

## ⚠️ Common Mistakes

1. **Using a hash map when `int[26]` would be faster and cleaner** — When the problem explicitly states "lowercase English letters," there's no reason to pay the overhead of a hash map. The frequency array is faster, uses less memory, and produces cleaner code. Interviewers notice when you choose the right tool. A hash map isn't wrong here, but it signals that you may not be thinking about optimization.

2. **Forgetting to handle case sensitivity** — The problem says "letters" but you assume lowercase. `'A' - 'a'` gives you `-32`, which is a negative index — instant undefined behavior in C++ and `ArrayIndexOutOfBoundsException` in Java. Always read the constraints carefully. If mixed case is possible, either normalize with `tolower()` / `toLowerCase()` first, or use `int[128]` to cover all ASCII characters.

3. **Not considering the frequency of ALL characters (including spaces and punctuation)** — Some problems include spaces, digits, or special characters in the input. If you use `int[26]`, you'll silently miss these characters. When in doubt, use `int[128]` for ASCII or a hash map for Unicode. The key is to read the problem constraints before choosing your data structure.

4. **Iterating the frequency array instead of the string in "first unique" problems** — If you iterate `freq[0]` through `freq[25]` looking for count 1, you'll find a unique character — but it won't necessarily be the *first* one in the string. You must iterate the string to preserve order.

5. **Not checking lengths before comparing** — If `len(s) != len(t)`, the strings cannot possibly be anagrams. This O(1) check saves you from doing unnecessary work and is a good habit that interviewers appreciate.

## 🏋️ Mini Challenge

**Problem:** Given two strings `s` and `t`, determine if `t` is an anagram of `s`, but this time the strings may contain *any* Unicode character — not just lowercase English letters. (This is the follow-up to LeetCode #242.)

**Hint:** You can no longer use `int[26]`. What data structure handles arbitrary keys with O(1) lookup?

**Expected approach:** Use a hash map (Python `Counter`, C++ `unordered_map`, Java `HashMap`) to count character frequencies. Increment for `s`, decrement for `t`, then verify all values are zero. The logic is identical to the array approach — only the container changes. This is why understanding the *pattern* matters more than memorizing the *implementation*.

## 📚 Practice Problems

| Problem | Difficulty | Platform | Key Pattern |
|---------|-----------|----------|-------------|
| [Ransom Note](https://leetcode.com/problems/ransom-note/) | Easy | LeetCode #383 | Frequency counting with subset check |
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Medium | LeetCode #49 | Frequency array as hash key for grouping |
| [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) | Medium | LeetCode #451 | Frequency count + bucket sort or priority queue |
| [Find the Difference](https://leetcode.com/problems/find-the-difference/) | Easy | LeetCode #389 | Frequency difference to find extra character |
| [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Easy | LeetCode #242 | Core frequency counting pattern |
