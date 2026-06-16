<!-- hand-authored -->
# ⚔ Quest: Decode Ways

> **Day 23** · [Decode Ways #91](https://leetcode.com/problems/decode-ways/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Decode Ways on LeetCode](https://leetcode.com/problems/decode-ways/)**

> ⚔ **Hunter's rule:** Trace `decode(i)` on `"226"`. Then trace `"06"` and confirm the `'0'` guard returns 0 before any branch.

---

## The Problem

A message containing letters `A–Z` is encoded to numbers: `A=1`, `B=2`, …, `Z=26`. Given a string `s` containing digits, return the **number of ways** to decode it.

```
Input:  s = "12"
Output: 2
Explanation: "AB" (1,2) or "L" (12).

Input:  s = "226"
Output: 3
Explanation: "2,2,6" | "22,6" | "2,26"

Input:  s = "06"
Output: 0
Explanation: No valid decoding — '0' cannot stand alone.
```

---

## 💡 Hints

**Hint 1:** Define `decode(i)` — *number of ways to decode suffix `s[i..]`*.

**Hint 2:** Base case: `i == len(s)` → return `1` (one way to decode empty suffix).

**Hint 3:** **Guard:** if `s[i] == '0'` → return `0` immediately. Zero cannot start a letter.

**Hint 4:** Branch 1: always take one digit → `decode(i+1)` (valid because of guard).

**Hint 5:** Branch 2: if `i+1 < n` and `10 <= int(s[i:i+2]) <= 26`, add `decode(i+2)`.

**Hint 6:** Memo on `i` — same overlap pattern as Word Break and House Robber.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** String Index Memoization (Count)

| Clue in the problem | What it signals |
|---|---|
| "how many ways" + left-to-right string | Count memo on index |
| Digit grouping (1 or 2 chars) | Two branches from each `i` |
| Leading zero invalid | `'0'` guard before branching |
| Two-digit must be 10–26 | Rejects `"06"`, `"07"`, … `"09"` |

**Contrast with Day 21 (Word Break):**

| Word Break I | Decode Ways |
|---|---|
| Cut lengths vary by dictionary | Cut lengths fixed: 1 or 2 |
| Dict membership check | Numeric range check 10–26 |
| Return bool | Return count (sum branches) |
| No char guard | **`'0'` guard essential** |

**How a strong solver thinks before coding:**
1. *"State = index i. How many decodings of suffix?"*
2. *"If s[i]=='0', dead end → 0."*
3. *"Add 1-digit path + optional 2-digit path."*
4. *"Memo[i] caches suffix count."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all binary split points** | Exponential — overlapping suffixes |
| **Skip `'0'` guard** | Counts paths through invalid decodings |
| **Two-digit check only `<= 26`** | Allows `"06"` as a "letter" |
| **Base `i==n` returns 0** | Empty suffix should contribute 1 way |
| **No memo on overlapping `i`** | TLE on long strings |

**The insight brute force misses:** `decode(j)` is identical whether you arrived via one-digit or two-digit steps — cache at `memo[j]`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Today's problem |
| [House Robber #198](https://leetcode.com/problems/house-robber/) | Today's prior quest — max instead of count |
| [Word Break #139](https://leetcode.com/problems/word-break/) | Day 21 — bool instead of count |

---

## 📖 Walkthrough

`s = "226"`:

```
decode(0)
├─ 1-digit '2' → decode(1)
│   ├─ 1-digit '2' → decode(2)
│   │   └─ 1-digit '6' → decode(3) → base 1
│   └─ 2-digit '26' → decode(3) → base 1     (path: 2, 26)
│   └─ 2-digit '22' invalid (>26)
└─ 2-digit '22' → decode(2)  (same subproblem as above)

Paths: (2,2,6), (22,6), (2,26) → 3 ways
memo[3]=1, memo[2]=1, memo[1]=2, memo[0]=3
```

`s = "06"` — guard fires:

```
decode(0): s[0]=='0' → return 0 immediately ✓
(no branch to decode(1) that wrongly returns 1)
```

`s = "11106"` — `'0'` in the middle:

```
... paths reaching index 4 with s[4]=='0' → decode(4)=0
Only valid splits avoid leaving a lone '0'
Answer: 0
```

---

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(string& s, int i) {
        if (i == (int)s.size()) return 1;
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < (int)s.size()) {
            int two = stoi(s.substr(i, 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
public:
    int numDecodings(string s) {
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};
```

### Python
```python
class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {}
        def dfs(i):
            if i == len(s): return 1
            if s[i] == '0': return 0
            if i in memo: return memo[i]
            ans = dfs(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i+2]) <= 26:
                ans += dfs(i + 2)
            memo[i] = ans
            return ans
        return dfs(0)
```

### Java
```java
class Solution {
    private int[] memo;
    public int numDecodings(String s) {
        memo = new int[s.length()];
        Arrays.fill(memo, -1);
        return dfs(s, 0);
    }
    private int dfs(String s, int i) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < s.length()) {
            int two = Integer.parseInt(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Count ways on a string"** → index memo with `+` combine.
- **`'0'` guard** → invalid prefix returns 0, not 1.
- **Two-digit 10–26** → `"1"` alone ok, `"06"` not ok.
- **Base `i==n → 1`** → empty suffix completes one decoding path.
- **Same overlap as WB / House Robber** → memo key is `i`.

> 🎯 **Pattern Unlocked:** String Memoization

---

*Both quests complete. Head to the checkpoint. →*
