# ⚔ Quest: Repeated DNA Sequences

> **Day 23** · [Repeated DNA Sequences #187](https://leetcode.com/problems/repeated-dna-sequences/) · Medium · 30 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Repeated DNA Sequences on LeetCode](https://leetcode.com/problems/repeated-dna-sequences/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

The DNA sequence is represented as a string of the letters `'A'`, `'C'`, `'G'`, and `'T'`.

Given a string `s` that represents a DNA sequence, return all the **10-letter-long sequences** (substrings) that occur more than once in `s`. You may return the answer in **any order**.

```
Input:  s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]

Input:  s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]
```

---

## 💡 Hints

Every sequence has **fixed length 10** — a classic fixed sliding window. You need to detect when two windows produce the same substring.

Use **Rabin-Karp rolling hash**: maintain hash of the current 10-letter window, roll O(1) per step. Store `hash → substring` (or `hash → seen`) in a hash map.

When a hash is seen again, add the substring to results (once). On hash collision, verify with direct string compare.

Base `B = 4` (map A=0, C=1, G=2, T=3) or `B = 256` with ASCII values. Modulus: `10⁹ + 7`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed-Window Rolling Hash — Rabin-Karp

**How to identify this from the problem statement:**
- "10-letter-long sequences" → fixed window length L = 10
- "occur more than once" → group by fingerprint, report duplicates
- DNA alphabet of 4 chars → small base works cleanly

| Keyword / phrase | What it signals |
|---|---|
| "10-letter-long sequences" | Fixed window L = 10 |
| "occur more than once" | Hash map: track seen fingerprints |
| DNA / A,C,G,T | Base-4 encoding or char-to-int map |
| return all such sequences | Collect on second (or later) sighting |

**Why this pattern works:** Each 10-letter window has a unique polynomial hash computable in O(1) from the previous window. One left-to-right pass builds all fingerprints; the map finds repeats without pairwise comparison.

**How a strong solver thinks before coding:**
1. *"Fixed length 10 → Day 23 rolling hash, not variable window."*
2. *"Map hash → seen. On re-sight, add substring to answer."*
3. *"O(n) rolls. Verify on collision. Done."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each i, for each j > i, compare 10 chars** | O(n² · 10) — rolling hash is O(n) |
| **Store every substring in a set (no rolling)** | O(n · L) to build each substring — rolling is O(1) per slide |
| **Sort all substrings** | O(n log n · L) — hash map is O(n) average |
| **Trust hash without verify** | Rare collisions can false-positive — cheap to verify |

**The insight brute force misses:** You don't compare windows pairwise. You fingerprint each window once, and the hash map tells you which fingerprints appeared before.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Repeated DNA Sequences #187](https://leetcode.com/problems/repeated-dna-sequences/) | L = 10, DNA alphabet | Fixed window + rolling hash |
| [Find the Index of the First Occurrence #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Match one pattern | Roll pattern hash vs text windows (or KMP, Day 24) |
| [Longest Duplicate Substring #1044](https://leetcode.com/problems/longest-duplicate-substring/) | Unknown length | Binary search length + Rabin-Karp verify |
| [Substring with Concatenation of All Words #30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | Multiple fixed-length words | Rolling hash per word length |

Today's quest is the **canonical fixed-window introduction** — constant L, constant roll.

---

## 📖 Walkthrough

```
s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
L = 10, B = 4, M = 10^9+7
map = {}, result = []

Initialize hash of s[0..9] = "AAAAACCCCC"
map["AAAAACCCCC"] = seen once

i=1: roll out s[0]='A', roll in s[10]='C'
     window = "AAAACCCCCA"
     new hash → not in map → store

i=2..4: continue rolling...
     windows slide through the A-block and C-block

Eventually window = "AAAAACCCCC" again (starting at index 15):
     hash matches stored entry from index 0
     → add "AAAAACCCCC" to result ✓

Similarly "CCCCCAAAAA" appears at two positions
     → add to result ✓

Result: ["AAAAACCCCC", "CCCCCAAAAA"] ✓
```

```
Roll trace — one step (conceptual):

window was: AAAAACCCCC  (indices 0..9)
slide to:   AAAACCCCCA  (indices 1..10)

H_new = ((H - 'A'·B^9) · B + 'A') mod M
      = hash of "AAAACCCCCA" in O(1)
```

> 💡 **The insight:** Fixed window + rolling hash is Day 9's sliding window with a single integer state instead of a frequency map. Same slide mechanics, different fingerprint.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        int n = s.size();
        if (n < 11) return {};

        const long long B = 4, M = 1000000007;
        vector<int> val = {'A', 'C', 'G', 'T'};
        auto encode = [&](char c) {
            if (c == 'A') return 0;
            if (c == 'C') return 1;
            if (c == 'G') return 2;
            return 3;
        };

        long long powL = 1;
        for (int i = 0; i < 10; i++) powL = (powL * B) % M;

        long long h = 0;
        for (int i = 0; i < 10; i++)
            h = (h * B + encode(s[i])) % M;

        unordered_map<long long, string> seen;
        unordered_set<string> result;
        seen[h] = s.substr(0, 10);

        for (int i = 1; i <= n - 10; i++) {
            int out = encode(s[i - 1]);
            int in  = encode(s[i + 9]);
            h = (h - out * powL % M + M) % M;
            h = (h * B + in) % M;

            string window = s.substr(i, 10);
            if (seen.count(h)) {
                if (seen[h] == window)
                    result.insert(window);
            } else {
                seen[h] = window;
            }
        }
        return vector<string>(result.begin(), result.end());
    }
};
```

### Python
```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        n = len(s)
        if n < 11:
            return []

        B, M, L = 4, 10**9 + 7, 10
        encode = {'A': 0, 'C': 1, 'G': 2, 'T': 3}

        powL = pow(B, L, M)
        h = 0
        for i in range(L):
            h = (h * B + encode[s[i]]) % M

        seen = {}
        result = set()
        seen[h] = s[:L]

        for i in range(1, n - L + 1):
            out_c = encode[s[i - 1]]
            in_c  = encode[s[i + L - 1]]
            h = (h - out_c * powL % M + M) % M
            h = (h * B + in_c) % M

            window = s[i:i + L]
            if h in seen:
                if seen[h] == window:
                    result.add(window)
            else:
                seen[h] = window

        return list(result)
```

### Java
```java
class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        int n = s.length();
        if (n < 11) return List.of();

        final long B = 4, M = 1_000_000_007;
        int[] enc = new int[128];
        enc['A'] = 0; enc['C'] = 1; enc['G'] = 2; enc['T'] = 3;

        long powL = 1;
        for (int i = 0; i < 10; i++) powL = (powL * B) % M;

        long h = 0;
        for (int i = 0; i < 10; i++)
            h = (h * B + enc[s.charAt(i)]) % M;

        Map<Long, String> seen = new HashMap<>();
        Set<String> result = new HashSet<>();
        seen.put(h, s.substring(0, 10));

        for (int i = 1; i <= n - 10; i++) {
            int out = enc[s.charAt(i - 1)];
            int in  = enc[s.charAt(i + 9)];
            h = (h - out * powL % M + M) % M;
            h = (h * B + in) % M;

            String window = s.substring(i, i + 10);
            if (seen.containsKey(h)) {
                if (seen.get(h).equals(window))
                    result.add(window);
            } else {
                seen.put(h, window);
            }
        }
        return new ArrayList<>(result);
    }
}
```

**Complexity:** O(n) time average · O(n) space (hash map)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"10-letter-long sequences"** → Fixed window L = 10 — Day 23 rolling hash.
- **"Occur more than once"** → Hash map groups fingerprints; report on re-sight.
- **"DNA alphabet"** → Base-4 encoding keeps hash compact.
- **Nested substring compare** → O(n²). One pass with O(1) rolls is O(n).

If you compared every pair of 10-letter windows, you found the brute force. The signal was "fixed length" + "repeated" — rolling hash with hash map grouping.

> 🎯 **Pattern:** Fixed-window Rabin-Karp. Roll hash O(1) per slide; map finds duplicates.

---

*Next: the window length is unknown — binary search meets rolling hash. →*
