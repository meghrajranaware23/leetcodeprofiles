<!-- hand-authored -->
# ⚔ Quest: Palindrome Partitioning

> **Day 14** · [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Palindrome Partitioning on LeetCode](https://leetcode.com/problems/palindrome-partitioning/)**

> ⚔ **Hunter's rule:** Draw cut lines on `"aab"`. Every cut must land on a palindrome segment. push/pop each segment choice.

---

## The Problem

Given a string `s`, partition it such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning schemes.

```
Input:  s = "aab"
Output: [["a","a","b"], ["aa","b"]]

Input:  s = "a"
Output: [["a"]]
```

---

## 💡 Hints

**Hint 1:** `dfs(i, path)` — try every end index `j >= i`. If `s[i..j]` is palindrome, push it and recurse from `j+1`.

**Hint 2:** Base case: `i == len(s)` → record path (all characters consumed).

**Hint 3:** Palindrome check: two pointers `l = i, r = j` moving inward. Or precompute with DP — optional optimization.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** String Partition Backtracking + Palindrome Validator

| Clue | Signal |
|---|---|
| "partition" + "palindrome" | Cut loop + pal check |
| variable number of parts | Base case: index reaches end |
| all valid partitions | Generate all, don't stop at first |

**How a strong solver thinks before coding:**
1. *"Cut string from index i — same push/pop as array backtracking."*
2. *"Only recurse on palindrome segments — prune early."*
3. *"Record when i==n — entire string consumed."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all splits, then filter palindromes** | Same complexity but no early prune on bad cuts |
| **Recurse from i instead of j+1** | Infinite loop / stuck index |
| **Check palindrome by reversing string every time** | Fine for Medium; just know it's O(n) per check |

---

## 🔗 Same Pattern, Other Problems

| Problem | Validator change |
|---|---|
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | Octet 0–255 (today's quest 2) |
| [Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/) | Min cuts — DP, not generate-all |
| [Word Break II #140](https://leetcode.com/problems/word-break-ii/) | Dictionary membership (Day 21) |

---

## 📖 Walkthrough

`s = "aab"`:

```
dfs(i=0, [])
  j=0: "a" pal → dfs(1, ["a"])
    j=1: "a" pal → dfs(2, ["a","a"])
      j=2: "b" pal → dfs(3, ["a","a","b"]) → i==3 → record ✓
    j=2: "ab" not pal → skip
  j=1: "aa" pal → dfs(2, ["aa"])
    j=2: "b" pal → dfs(3, ["aa","b"]) → record ✓
  j=2: "aab" not pal → skip
```

---

## Solution

### C++
```cpp
class Solution {
    bool isPal(string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    }
    void dfs(string& s, int i, vector<string>& path, vector<vector<string>>& res) {
        if (i == (int)s.size()) { res.push_back(path); return; }
        for (int j = i; j < (int)s.size(); j++) {
            if (!isPal(s, i, j)) continue;
            path.push_back(s.substr(i, j - i + 1));
            dfs(s, j + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> path;
        dfs(s, 0, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        def pal(l, r):
            return all(s[k] == s[r - (k - l)] for k in range(l, (l + r + 1) // 2))
        def dfs(i, path):
            if i == len(s):
                res.append(list(path)); return
            for j in range(i, len(s)):
                if not pal(i, j): continue
                path.append(s[i:j + 1]); dfs(j + 1, path); path.pop()
        dfs(0, [])
        return res
```

### Java
```java
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        dfs(s, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(String s, int i, List<String> path, List<List<String>> res) {
        if (i == s.length()) { res.add(new ArrayList<>(path)); return; }
        for (int j = i; j < s.length(); j++) {
            if (!isPal(s, i, j)) continue;
            path.add(s.substring(i, j + 1));
            dfs(s, j + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
    private boolean isPal(String s, int l, int r) {
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
}
```

**Complexity:** O(n · 2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Cut loop from i** → Same backtracking rhythm as Day 11.
- **Validator before push** → Prune non-palindrome cuts early.
- **Advance to j+1** → Segment consumed; recurse on suffix.

> 🎯 **Pattern Unlocked:** Partition Backtracking

---

*One quest down. Next: exactly four numeric segments. →*
