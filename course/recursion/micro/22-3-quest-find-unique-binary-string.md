<!-- hand-authored -->
# ⚔ Quest: Find Unique Binary String

> **Day 22** · [Find Unique Binary String #1980](https://leetcode.com/problems/find-unique-binary-string/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find Unique Binary String on LeetCode](https://leetcode.com/problems/find-unique-binary-string/)**

> ⚔ **Hunter's rule:** Draw a grid — rows are input strings, columns are bit positions. At column `i`, why can at least one of `{0,1}` differ from every row?

---

## The Problem

Given an array of `n` **distinct** binary strings `nums` where each string has length `n`, return a binary string of length `n` that **does not appear** in `nums`. If multiple answers exist, return any.

```
Input:  nums = ["01","10"]
Output: "11" or "00"

Input:  nums = ["00","01"]
Output: "11" or "10"

Input:  nums = ["111","011","001"]
Output: "101"
```

There are always `2^n` possible strings of length `n` but only `n` given — a missing string always exists.

---

## 💡 Hints

**Hint 1:** Build answer left to right: `dfs(i)` fills bit at index `i`.

**Hint 2:** At position `i`, try `'0'` then `'1'`. **Reject** a bit if **every** string in `nums` has that same bit at column `i`.

**Hint 3:** Helper `has(s, i)` — returns true if some `nums[k][i] == s[i]` for all k? Actually: skip bit if **all** strings match your choice at `i`. Equivalently: accept if **at least one** string differs — but simpler: reject when **every** input matches.

**Hint 4:** Base: `i == n` → return true (found a complete string). First successful path wins — no need to collect all.

**Hint 5:** **Cantor diagonal intuition:** pick bit `s[i]` that differs from `nums[i][i]` if you use the classic construction — backtracking generalizes this.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Cantor Diagonal Backtracking

| Clue | Signal |
|---|---|
| `n` strings of length `n`, all distinct | Pigeonhole — missing string exists |
| "construct" / "find any" | Early-return backtrack, not count-all |
| binary choices per level | Try `'0'`, `'1'` at each index |
| differ from given set | Column-wise mismatch check |

**Contrast with Beautiful Arrangement:**

| Beautiful Arrangement | Find Unique Binary String |
|---|---|
| `used[]` on numbers | No used — free bit choice |
| Divisibility vs position | Column match vs input strings |
| Count all | Return first valid |
| Levels = positions 1..n | Levels = indices 0..n-1 |

**How a strong solver thinks before coding:**
1. *"Fill s[i] one bit at a time."*
2. *"For each bit, if all nums match at column i, skip."*
3. *"First dfs reaching i==n wins — return true up the stack."*
4. *"Optional O(1) trick: ans[i] = nums[i][i]=='0'?'1':'0' — but learn backtrack version."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all 2^n strings, check set** | Works for small n but misses the diagonal insight |
| **Accept bit if any string differs** | Wrong — need string different from **all** inputs |
| **Only flip diagonal without backtrack** | One-line solution exists; backtrack teaches column constraint |
| **Forget to try both bits** | Sometimes `'0'` blocked at column, `'1'` works |

**The insight brute force misses:** You only need **one** string. Greedy diagonal (`s[i] != nums[i][i]`) always works — backtracking is the general "column constraint" template.

---

## 🔗 Same Pattern, Other Problems

| Problem | Connection |
|---|---|
| [Gray Code #89](https://leetcode.com/problems/gray-code/) | Binary string generation — different ordering rule |
| Cantor's diagonal argument (CS theory) | Classic proof there are uncountably many reals |
| [Beautiful Arrangement #526](https://leetcode.com/problems/beautiful-arrangement/) | Today's other quest — positional constraint variant |

---

## 📖 Walkthrough

`nums = ["01", "10"]`:

```
Greedy diagonal (O(n) insight):
  i=0: flip nums[0][0]='0' → pick '1'
  i=1: flip nums[1][1]='0' → pick '1'
  → "11" (not in nums) ✓

Backtrack equivalent at each column:
  i=0: try '0' → nums[0][0] matches → has() true → skip
       try '1' → no string has '1' at col 0 → recurse
  i=1: try '0' → no string has '0' at col 1 → complete → "10" is in nums!
       try '1' → no match at col 1 → "11" ✓
```

The diagonal trick always works; backtrack teaches the column-by-column constraint.

---

## Solution

### C++
```cpp
class Solution {
    bool has(string& s, int i, vector<string>& nums) {
        for (auto& t : nums) if (t[i] == s[i]) return true;
        return false;
    }
    bool dfs(string& s, int i, vector<string>& nums) {
        if (i == (int)s.size()) return true;
        s[i] = '0';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        s[i] = '1';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        return false;
    }
public:
    string findDifferentBinaryString(vector<string>& nums) {
        int n = nums.size();
        string s(n, '0');
        dfs(s, 0, nums);
        return s;
    }
};
```

### Python
```python
class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        n = len(nums)
        def has(s, i):
            return any(t[i] == s[i] for t in nums)
        def dfs(i, path):
            if i == n: return True
            for bit in '01':
                path.append(bit)
                if not has(path, i) and dfs(i + 1, path): return True
                path.pop()
            return False
        path = []
        dfs(0, path)
        return ''.join(path)
```

### Java
```java
class Solution {
    public String findDifferentBinaryString(String[] nums) {
        int n = nums.length;
        char[] s = new char[n];
        return dfs(s, 0, nums) ? new String(s) : "";
    }
    private boolean dfs(char[] s, int i, String[] nums) {
        if (i == s.length) return true;
        s[i] = '0';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        s[i] = '1';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        return false;
    }
    private boolean has(char[] s, int i, String[] nums) {
        for (String t : nums) if (t.charAt(i) == s[i]) return true;
        return false;
    }
}
```

**Complexity:** O(n^2) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Column constraint** — at index `i`, pick a bit that **no** input string has at column `i` (`!has`). Every string differs from your choice at that position.
- **Cantor diagonal shortcut** — `ans[i] = '1' if nums[i][i]=='0' else '0'` always works in O(n); backtrack teaches the general template.
- **Find any, not all** — return true at `i == n`; first complete path wins.
- **Same skeleton as bit-building backtrack** — try `'0'`, try `'1'`, constraint before recurse.

> 🎯 **Pattern Unlocked:** Cantor Diagonal Backtracking

---

*Both quests complete. Head to the checkpoint. →*
