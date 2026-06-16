<!-- hand-authored -->
# ⚔ Quest: Decode Ways

> **Day 7** · [Decode Ways #91](https://leetcode.com/problems/decode-ways/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Decode Ways on LeetCode](https://leetcode.com/problems/decode-ways/)**

> ⚔ **Hunter's rule:** Fill **dp[0..n]** for the example — at each `i`, add ways from 1-char and 2-char steps. This is **sum**, not Day 6 take/skip.

---

## The Problem

See the full problem statement on LeetCode: **[Decode Ways #91](https://leetcode.com/problems/decode-ways/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 7 **String Prefix Counting** — `dp[i]` = ways to decode `s[0..i-1]`.

- **1-digit step** ending at `i`: if `s[i-1] != '0'` → `dp[i] += dp[i-1]`
- **2-digit step** ending at `i`: if `10 ≤ int(s[i-2:i]) ≤ 26` → `dp[i] += dp[i-2]`
- **Base:** `dp[0] = 1` (empty string)

Not `max(take, skip)` — **add** every valid last piece.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** String Decomposition DP

**How to identify this from the problem statement:**
- "How many ways" → **count**, not optimize
- Process string **left to right** by prefix length
- Each step consumes 1 or 2 characters with validity rules

| Keyword / phrase | What it signals |
|---|---|
| "number of ways to decode" | Prefix sum DP |
| "1–26" mapping | Validate 2-digit chunk 10–26 |
| leading `'0'` | Zero ways through that branch |

**Why this pattern works:** Every decoding of prefix `i` ends with either a valid 1-char or 2-char letter — partition by last step, sum predecessors.

**How a strong solver thinks before coding:**
1. *"dp[i] = ways for first i chars."*
2. *"Add dp[i-1] if last 1-char valid."*
3. *"Add dp[i-2] if last 2-char in 10..26."*
4. *"Roll to prev2/prev1 — same as Fibonacci shape with zero guards."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every split recursively** | O(2^n) — exponential |
| **Day 6 max logic** | Wrong operator — need **sum** |
| **Forgetting leading zero rule** | `"06"` → 0 ways for 2-digit `"06"` |
| **dp[0] = 0** | Empty prefix must be 1 way |

**The insight brute force misses:** Only two predecessor lengths matter — identical overlap to Fibonacci, but with validation gates.

```
s = "226"
dp: 1 → 1 → 2 → 3
     ∅   "2" "22"/"2|2"  + "6"/"26"
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Unique Paths #62](https://leetcode.com/problems/unique-paths/) | 2D grid, R/D moves | Sum from two neighbors |
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | Steps 1 or 2 | Same 1D sum (no zero trap) |
| [House Robber #198](https://leetcode.com/problems/house-robber/) | **max**, not sum | Day 6 contrast |

---

## 📖 Walkthrough

**Example:** `s = "12"`

```
i :  0   1   2
s :      1   2
dp:  1   1   2

i=1: '1' valid → dp[1] += dp[0] = 1
i=2: '2' valid → += dp[1] = 1
     "12" in 10..26 → += dp[0] = 1
     dp[2] = 2  ("1|2" and "12")
```

**Trap example:** `s = "30"` → at i=2, `'0'` alone invalid, `"30"` > 26 → dp[2]=0.

> 💡 **The insight:** You're counting partitions of the prefix — each valid tail length pulls from an earlier dp cell.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        int prev2 = 1, prev1 = s[0] != '0' ? 1 : 0;
        for (int i = 2; i <= n; i++) {
            int curr = 0;
            if (s[i - 1] != '0') curr += prev1;
            int two = (s[i - 2] - '0') * 10 + (s[i - 1] - '0');
            if (two >= 10 && two <= 26) curr += prev2;
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
};
```

### Python
```python
class Solution:
    def numDecodings(self, s: str) -> int:
        prev2, prev1 = 1, int(s[0] != '0')
        for i in range(2, len(s) + 1):
            curr = 0
            if s[i - 1] != '0':
                curr += prev1
            two = int(s[i - 2:i])
            if 10 <= two <= 26:
                curr += prev2
            prev2, prev1 = prev1, curr
        return prev1
```

### Java
```java
class Solution {
    public int numDecodings(String s) {
        int prev2 = 1, prev1 = s.charAt(0) != '0' ? 1 : 0;
        for (int i = 2; i <= s.length(); i++) {
            int curr = 0;
            if (s.charAt(i - 1) != '0') curr += prev1;
            int two = Integer.parseInt(s.substring(i - 2, i));
            if (two >= 10 && two <= 26) curr += prev2;
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"How many ways"** → sum transitions, not Day 6 max.
- **"Prefix dp[i]"** → last step 1 or 2 chars with validation.
- **"dp[0]=1"** → empty prefix baseline.
- **"Leading zero"** → kills 1-digit and most 2-digit paths.

> 🎯 **Pattern Unlocked:** String Decomposition DP

---

*One quest down. Next: same counting idea on a grid. →*
