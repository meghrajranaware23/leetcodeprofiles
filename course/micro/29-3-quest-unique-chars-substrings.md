# ⚔ Quest: Count Unique Characters of All Substrings

> **Day 29** · [Count Unique Characters of All Substrings #828](https://leetcode.com/problems/count-unique-characters-of-all-substrings/) · Hard · 60 XP · 28 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Unique Characters of All Substrings on LeetCode](https://leetcode.com/problems/count-unique-characters-of-all-substrings/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Let's define `unique(s)` as the number of **unique characters** in string `s`.

Given a string `s`, return the sum of `unique(t)` over all substrings `t` of `s`.

```
Input:  s = "ABC"
Output: 10
        substrings and unique counts:
        "A"→1, "B"→1, "C"→1, "AB"→2, "BC"→2, "ABC"→3
        total = 1+1+1+2+2+3 = 10

Input:  s = "ABA"
Output: 8

Input:  s = "LEETCODE"
Output: 92
```

---

## 💡 Hints

**Hint 1 — Don't enumerate substrings:** There are O(n²) substrings. B-Rank Day 18 taught contribution counting — invert the loop. Sum **each character's contribution** to the global total.

**Hint 2 — When does position i contribute?** Character `s[i]` counts toward `unique(t)` in substring `t` iff `s[i]` appears **exactly once** in `t`. That means `t` starts after the previous `s[i]` and ends before the next `s[i]`.

**Hint 3 — Contribution formula:** With `prev` = previous index of same char (or −1) and `next` = next index of same char (or n):
```
contribution(i) = (i - prev) × (next - i)
```

**Hint 4 — Two passes for boundaries:** Forward pass with `last[c]` gives `prev`. Backward pass with `last[c]` gives `next` for each index. Or compute `next` in one reverse scan, then `prev` in forward scan.

**Hint 5 — Cross-rank link:** B-Rank Day 18 (#907) counted subarrays where `arr[i]` is the minimum. Here you count substrings where `s[i]` is the **sole** occurrence of its character — same contribution inversion, different boundary rule.

---

## 🔍 Pattern Recognition Breakdown

**Patterns used:** Contribution Counting (B-Rank Day 18) + Character Position Tracking (E-Rank Day 3/4)

**How to identify this from the problem statement:**
- "sum over all substrings" → O(n²) if enumerated — contribution inversion required
- "unique characters" → per-character, per-occurrence analysis
- Hard + aggregate over all substrings → Day 18 contribution pattern
- need prev/next occurrence → Day 3/4 position tracking

| Keyword / phrase | What it signals |
|---|---|
| "sum over all substrings" | Contribution counting — never enumerate |
| "unique characters" | Each occurrence contributes 0 or 1 per substring |
| "exactly once in substring" | Bounded by prev and next same character |
| Hard + combinatorial aggregate | O(n) boundary formula |
| uppercase / lowercase letters | 26 or 52 tracking arrays, or hash map |

**Why this pattern works:** Each substring's unique count is the sum of indicators "does char c appear exactly once?" Summing over all substrings and all positions collapses to `(i − prev) × (next − i)` per occurrence.

**How a strong solver thinks before coding:**
1. *"Sum unique over all substrings → contribution counting (Day 18)."*
2. *"Position i contributes when it's the only s[i] in the substring."*
3. *"Start choices: (i − prev). End choices: (next − i)."*
4. *"Two passes for prev/next boundaries (Day 3/4)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all substrings, count unique with a set** | O(n²) substrings × O(n) count = O(n³) |
| **Generate all substrings, use 26-array for unique** | O(n²) × O(26) = O(n²) still too slow at n = 10⁵ |
| **Nested loops without contribution formula** | Misses the O(n) boundary insight |
| **Wrong prev boundary (i−1 instead of prevSame)** | Overcounts substrings where char appears twice |

**The insight brute force misses:** You're not asking "how many unique in this substring?" You're asking "how many substrings does **this occurrence** contribute exactly 1 to?" — a combinatorial count, not a scan.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Count Unique Characters of All Substrings #828](https://leetcode.com/problems/count-unique-characters-of-all-substrings/) | Unique char count per substring | Contribution + prev/next |
| [Sum of Subarray Minimums #907](https://leetcode.com/problems/sum-of-subarray-minimums/) | Min per subarray | Contribution + monotonic boundaries |
| [Sum of Subarray Ranges #2104](https://leetcode.com/problems/sum-of-subarray-ranges/) | Max − min per subarray | Two contribution passes |

#828 is the string counterpart to Day 18's #907 — contribution inversion with character boundaries instead of monotonic stack.

---

## 📖 Walkthrough

```
s = "ABA"   (n = 3)

─── Backward pass: next occurrence ───
i=2 'A': next[2]=3,  last['A']=2
i=1 'B': next[1]=3,  last['B']=1
i=0 'A': next[0]=2,  last['A']=0
next = [2, 3, 3]

─── Forward pass: prev + contribution ───
i=0 'A': prev=-1, next=2  →  (0-(-1)) × (2-0) = 1×2 = 2
i=1 'B': prev=-1, next=3  →  (1-(-1)) × (3-1) = 2×2 = 4
i=2 'A': prev=0,  next=3  →  (2-0)   × (3-2) = 2×1 = 2

Total = 2 + 4 + 2 = 8 ✓
```

> 💡 **The insight:** Each occurrence is a "representative" for exactly `(i − prev) × (next − i)` substrings. Sum representatives — never sum substrings.

---

## Solution

### C++
```cpp
class Solution {
public:
    int uniqueLetterString(string s) {
        int n = s.size();
        vector<int> next(n, n);
        vector<int> last(26, -1);

        for (int i = n - 1; i >= 0; i--) {
            next[i] = last[s[i] - 'A'];
            last[s[i] - 'A'] = i;
        }

        fill(last.begin(), last.end(), -1);
        long long total = 0;

        for (int i = 0; i < n; i++) {
            int prev = last[s[i] - 'A'];
            total += (long long)(i - prev) * (next[i] - i);
            last[s[i] - 'A'] = i;
        }
        return (int)total;
    }
};
```

### Python
```python
class Solution:
    def uniqueLetterString(self, s: str) -> int:
        n = len(s)
        next_occ = [n] * n
        last = {}

        for i in range(n - 1, -1, -1):
            next_occ[i] = last.get(s[i], n)
            last[s[i]] = i

        last.clear()
        total = 0

        for i, ch in enumerate(s):
            prev = last.get(ch, -1)
            total += (i - prev) * (next_occ[i] - i)
            last[ch] = i

        return total
```

### Java
```java
class Solution {
    public int uniqueLetterString(String s) {
        int n = s.length();
        int[] next = new int[n];
        int[] last = new int[26];
        Arrays.fill(last, -1);

        for (int i = n - 1; i >= 0; i--) {
            next[i] = last[s.charAt(i) - 'A'];
            last[s.charAt(i) - 'A'] = i;
        }

        Arrays.fill(last, -1);
        long total = 0;

        for (int i = 0; i < n; i++) {
            int prev = last[s.charAt(i) - 'A'];
            total += (long)(i - prev) * (next[i] - i);
            last[s.charAt(i) - 'A'] = i;
        }
        return (int) total;
    }
}
```

**Complexity:** O(n) time · O(n) space (next array + last map)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Sum over all substrings"** → O(n²) enumeration dies — contribution counting (B-Rank Day 18).
- **"Unique characters per substring"** → Each occurrence at index `i` contributes 1 to some substrings, 0 to others.
- **"Exactly once in substring"** → Start after previous same char, end before next same char.
- **"prev and next occurrence"** → Character position tracking (E-Rank Day 3/4).
- **Formula:** `contribution(i) = (i − prev) × (next − i)` — sum over all `i`.

If you nested loops over all substrings, you found brute force. The signal was **aggregate over all substrings** — same inversion as Sum of Subarray Minimums (#907).

> 🎯 **Pattern combo:** B-Rank Day 18 (contribution counting) + E-Rank Day 3/4 (character position tracking). String synthesis — array contribution logic with prev/next boundaries.

---

*Day 29 checkpoint: frequency analysis meets divide-and-conquer. →*
