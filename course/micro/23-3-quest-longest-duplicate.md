# ⚔ Quest: Longest Duplicate Substring

> **Day 23** · [Longest Duplicate Substring #1044](https://leetcode.com/problems/longest-duplicate-substring/) · Hard · 50 XP · 25 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Duplicate Substring on LeetCode](https://leetcode.com/problems/longest-duplicate-substring/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string `s`, consider all duplicated substrings. Return **any** duplicated substring with the **maximum length**. If `s` does not have a duplicated substring, return `""`.

```
Input:  s = "banana"
Output: "ana"

Input:  s = "abcd"
Output: ""

Input:  s = "abbaba"
Output: "abb"  (or "bba" — any max-length duplicate works)
```

---

## 💡 Hints

**Hint 1 — Binary search on length:** If a duplicate substring of length `L` exists, one of length `L-1` also exists (take a prefix). Monotonic property → binary search `L` in `[1, n-1]`.

**Hint 2 — Verify with Rabin-Karp:** For a candidate length `mid`, roll hash over all windows of length `mid`. If any hash appears twice (at different positions), length `mid` is achievable.

**Hint 3 — Collision safety:** On hash match, verify with `s.substr(i, mid) == s.substr(j, mid)`. Or use **double hashing** with two moduli to skip most verification.

**Hint 4 — Binary search template:** `lo=1, hi=n-1`. While `lo < hi`, `mid = (lo+hi+1)/2` (bias upward). If duplicate of length `mid` exists → `lo = mid`; else `hi = mid - 1`.

**Hint 5 — Why not suffix array / trie?** Suffix arrays solve this in O(n log n) but are heavy to implement. Binary search + Rabin-Karp is O(n log n) average and fits the Day 23 toolkit. For interviews, know both names; implement Rabin-Karp.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Binary Search on Answer + Rabin-Karp Verification

**How to identify this from the problem statement:**
- "longest duplicated substring" → optimize over length, not a fixed L
- "return any" → don't need all duplicates, just one witness
- Hard + string → classic binary search + rolling hash combo

| Keyword / phrase | What it signals |
|---|---|
| "longest duplicate substring" | Binary search on length |
| "any duplicated substring" | One witness suffices per check |
| "maximum length" | Monotonic: if len L works, len L-1 works |
| Hard string search | Rabin-Karp verify inside binary search |

**Why this pattern works:** Duplicate existence for length `L` is a yes/no question with monotonic structure. Binary search asks O(log n) questions; each question is answered in O(n) by rolling hash across all windows of that length.

**How a strong solver thinks before coding:**
1. *"Longest X with monotonic feasibility → binary search on length."*
2. *"Can length mid work? → Rabin-Karp all windows of size mid."*
3. *"O(n log n) average. Store first position per hash; collision → verify."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each length L, for each pair of start indices, compare** | O(n³) — binary search + rolling hash is O(n log n) |
| **Build suffix array / suffix automaton** | Correct but overkill to code in 25 minutes |
| **Rolling hash without binary search — try all L** | O(n²) total — binary search cuts to O(n log n) |
| **Single hash, no verify on collision** | False positive can return wrong substring |

**The insight brute force misses:** You don't need the longest duplicate directly. Binary search converts "find maximum" into O(log n) "does length mid exist?" checks — each check is a single Rabin-Karp pass.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Duplicate Substring #1044](https://leetcode.com/problems/longest-duplicate-substring/) | Max length duplicate | Binary search + Rabin-Karp |
| [Repeated DNA Sequences #187](https://leetcode.com/problems/repeated-dna-sequences/) | Fixed L = 10 | Rolling hash only (no binary search) |
| [Longest Repeating Substring #1062](https://leetcode.com/problems/longest-repeating-substring/) | Return length, not string | Same binary search + Rabin-Karp |
| [Maximum Length of Repeated Subarray #718](https://leetcode.com/problems/maximum-length-of-repeated-subarray/) | Two arrays, not one string | Binary search + rolling hash on both |

Today's quest is the **pattern combination capstone** — binary search (D-Rank) + rolling hash (Day 23).

---

## 📖 Walkthrough

```
s = "banana", n = 6

Binary search on length:
  lo=1, hi=5

mid=3: can we find duplicate of length 3?
  windows: "ban"(0), "ana"(1), "nan"(2), "ana"(3), "na"(4) — wait, only to n-3+1

  windows of length 3:
    i=0: "ban"  hash h₀
    i=1: "ana"  hash h₁
    i=2: "nan"  hash h₂
    i=3: "ana"  hash h₃ = h₁  →  DUPLICATE at indices 1 and 3 ✓

  length 3 works → lo = 3

mid=4: (lo+hi+1)/2 = 4
  windows: "bana"(0), "anan"(1), "nana"(2)
  all distinct hashes → no duplicate of length 4

  lo stays 3, hi = 3 → done

Answer: substring of length 3 starting at index 1 → "ana" ✓
```

```
Binary search decision tree:

length 1: always exists if n ≥ 2 and any char repeats
length 2: "an" at index 1 and 3? → "an" vs "na" — no
length 3: "ana" at index 1 and 3 → YES ✓  ← answer
length 4: no
length 5: no
```

> 💡 **The insight:** Binary search doesn't compare substrings — it asks "does *any* duplicate of this length exist?" Rabin-Karp answers that question in one O(n) pass.

---

## Solution

### C++
```cpp
class Solution {
    long long B = 26, M = 1000000007;

    bool hasDuplicate(const string& s, int len) {
        int n = s.size();
        if (len >= n) return false;

        long long powL = 1;
        for (int i = 0; i < len; i++) powL = (powL * B) % M;

        long long h = 0;
        for (int i = 0; i < len; i++)
            h = (h * B + s[i] - 'a') % M;

        unordered_map<long long, int> pos;
        pos[h] = 0;

        for (int i = 1; i <= n - len; i++) {
            int out = s[i - 1] - 'a';
            int in  = s[i + len - 1] - 'a';
            h = (h - out * powL % M + M) % M;
            h = (h * B + in) % M;

            if (pos.count(h)) {
                if (s.substr(i, len) == s.substr(pos[h], len))
                    return true;
            } else {
                pos[h] = i;
            }
        }
        return false;
    }

public:
    string longestDupSubstring(string s) {
        int n = s.size(), lo = 1, hi = n - 1;
        int bestLen = 0, bestStart = 0;

        while (lo <= hi) {
            int mid = (lo + hi + 1) / 2;
            if (hasDuplicate(s, mid)) {
                lo = mid + 1;
                bestLen = mid;
            } else {
                hi = mid - 1;
            }
        }

        if (bestLen == 0) return "";
        // Re-find witness of bestLen
        long long powL = 1;
        for (int i = 0; i < bestLen; i++) powL = (powL * B) % M;
        long long h = 0;
        for (int i = 0; i < bestLen; i++)
            h = (h * B + s[i] - 'a') % M;
        unordered_map<long long, int> pos;
        pos[h] = 0;
        for (int i = 1; i <= n - bestLen; i++) {
            int out = s[i - 1] - 'a';
            int in  = s[i + bestLen - 1] - 'a';
            h = (h - out * powL % M + M) % M;
            h = (h * B + in) % M;
            if (pos.count(h) && s.substr(i, bestLen) == s.substr(pos[h], bestLen))
                return s.substr(i, bestLen);
            pos[h] = i;
        }
        return "";
    }
};
```

### Python
```python
class Solution:
    def longestDupSubstring(self, s: str) -> str:
        n = len(s)
        B, M = 26, 10**9 + 7

        def has_duplicate(length: int) -> tuple[bool, int]:
            if length >= n:
                return False, -1
            powL = pow(B, length, M)
            h = 0
            for i in range(length):
                h = (h * B + ord(s[i]) - 97) % M

            pos = {h: 0}
            for i in range(1, n - length + 1):
                out_c = ord(s[i - 1]) - 97
                in_c  = ord(s[i + length - 1]) - 97
                h = (h - out_c * powL % M + M) % M
                h = (h * B + in_c) % M

                if h in pos:
                    if s[i:i + length] == s[pos[h]:pos[h] + length]:
                        return True, i
                else:
                    pos[h] = i
            return False, -1

        lo, hi, best_len, best_start = 1, n - 1, 0, 0
        while lo <= hi:
            mid = (lo + hi + 1) // 2
            found, start = has_duplicate(mid)
            if found:
                lo = mid + 1
                best_len, best_start = mid, start
            else:
                hi = mid - 1

        return s[best_start:best_start + best_len] if best_len else ""
```

### Java
```java
class Solution {
    private static final long B = 26, M = 1_000_000_007;

    private boolean hasDuplicate(String s, int len) {
        int n = s.length();
        if (len >= n) return false;

        long powL = 1;
        for (int i = 0; i < len; i++) powL = (powL * B) % M;

        long h = 0;
        for (int i = 0; i < len; i++)
            h = (h * B + s.charAt(i) - 'a') % M;

        Map<Long, Integer> pos = new HashMap<>();
        pos.put(h, 0);

        for (int i = 1; i <= n - len; i++) {
            int out = s.charAt(i - 1) - 'a';
            int in  = s.charAt(i + len - 1) - 'a';
            h = (h - out * powL % M + M) % M;
            h = (h * B + in) % M;

            if (pos.containsKey(h)) {
                if (s.substring(i, i + len).equals(s.substring(pos.get(h), pos.get(h) + len)))
                    return true;
            } else {
                pos.put(h, i);
            }
        }
        return false;
    }

    public String longestDupSubstring(String s) {
        int n = s.length(), lo = 1, hi = n - 1, bestLen = 0;

        while (lo <= hi) {
            int mid = (lo + hi + 1) / 2;
            if (hasDuplicate(s, mid)) {
                bestLen = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        if (bestLen == 0) return "";

        long powL = 1;
        for (int i = 0; i < bestLen; i++) powL = (powL * B) % M;
        long h = 0;
        for (int i = 0; i < bestLen; i++)
            h = (h * B + s.charAt(i) - 'a') % M;
        Map<Long, Integer> pos = new HashMap<>();
        pos.put(h, 0);
        for (int i = 1; i <= n - bestLen; i++) {
            int out = s.charAt(i - 1) - 'a';
            int in  = s.charAt(i + bestLen - 1) - 'a';
            h = (h - out * powL % M + M) % M;
            h = (h * B + in) % M;
            if (pos.containsKey(h) &&
                s.substring(i, i + bestLen).equals(s.substring(pos.get(h), pos.get(h) + bestLen)))
                return s.substring(i, i + bestLen);
            pos.put(h, i);
        }
        return "";
    }
}
```

**Complexity:** O(n log n) time average · O(n) space per verification pass

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Longest duplicate substring"** → Binary search on length — monotonic feasibility.
- **"Does length L have a duplicate?"** → Rabin-Karp fixed window of size L — Day 23 roll.
- **Two techniques, one problem** → D-Rank binary search asks; Day 23 rolling hash answers.
- **O(n³) all-pairs compare** → O(n log n) with search + hash.

If you tried every substring length from n down to 1 with brute comparison, you found O(n³). The signal was "longest" + "duplicate" — binary search on answer + Rabin-Karp verification.

> 🎯 **Pattern Combo:** Binary search on length + Rabin-Karp verify. Search prunes; rolling hash confirms.

---

*Day 23 checkpoint: recognize rolling hash signals and transfer to unseen substring problems. →*
