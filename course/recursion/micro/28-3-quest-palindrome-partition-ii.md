<!-- hand-authored -->
# ⚔ Quest: Palindrome Partitioning (Revisited)

> **Day 28** · [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) · Medium · 15 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Palindrome Partitioning on LeetCode](https://leetcode.com/problems/palindrome-partitioning/)**

> ⚔ **Hunter's rule:** Build `isPal[i][j]` first. Then run the Day 14 cut loop — every non-palindrome cut dies in O(1). Trace `"aab"`.

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

**Hint 1:** Day 14 template: `dfs(i, path)` — try every end index `j ≥ i`. If segment is palindrome, push and recurse from `j+1`.

**Hint 2:** Base case: `i == len(s)` → record path.

**Hint 3 (S-Rank):** Precompute `isPal[i][j]` in O(n²). Fill shorter substrings first: `isPal[i][j] = (s[i]==s[j]) && (j-i<2 || isPal[i+1][j-1])`.

**Hint 4:** Cut loop guard: `if !isPal[i][j]: continue` — skip the entire branch without a two-pointer scan.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Partition with Precomputed Palindrome Table (Day 14 + Day 17 prune mindset)

| Clue | Signal |
|---|---|
| "partition" + "palindrome" | cut loop + pal check |
| generate all valid partitions | record at `i == n` |
| S-Rank revisit | `isPal[i][j]` O(1) lookup |
| long strings | precompute beats per-cut scan |

**How a strong solver thinks before coding:**
1. *"Build isPal table once — O(n²) setup."*
2. *"Cut loop identical to Day 14 — only the check is O(1)."*
3. *"Non-pal cuts never enter dfs — that's the prune."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all splits, filter palindromes after** | Explores invalid branches fully |
| **Reverse substring on every cut** | O(n) per check → O(n³) total |
| **Recurse from i instead of j+1** | Infinite loop / stuck index |
| **Forget pop after explore** | Stale path leaks to siblings |

**The insight brute force misses:** `isPal[i][j]` turns every cut validation into O(1). The backtracking tree is the same — you just never descend into non-pal branches.

---

## 🔗 Same Pattern, Other Problems

| Problem | Validator change |
|---|---|
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | Octet + length prune (today's quest 1) |
| [Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/) | Same `isPal` — min cuts via DP |
| [Word Break II #140](https://leetcode.com/problems/word-break-ii/) | Dictionary membership (Day 21) |

---

## 📖 Walkthrough

**Step 1 — build `isPal` for `s = "aab"`:**

```
      j=0  j=1  j=2
i=0    T    T    F
i=1         T    F
i=2              T
```

**Step 2 — dfs with O(1) checks:**

```
dfs(i=0, [])
  j=0: isPal[0][0]=T → dfs(1, ["a"])
    j=1: isPal[1][1]=T → dfs(2, ["a","a"])
      j=2: isPal[2][2]=T → dfs(3, ["a","a","b"]) → record ✓
    j=2: isPal[1][2]=F → continue (no dfs!)
  j=1: isPal[0][1]=T → dfs(2, ["aa"])
    j=2: isPal[2][2]=T → dfs(3, ["aa","b"]) → record ✓
  j=2: isPal[0][2]=F → skip
```

Notice `j=1` at `i=0` for cut `"aab"`: one table lookup, zero recursive frames.

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

Before writing code, a strong solver's internal monologue sounds like this:

- **"Day 14 cut loop — unchanged."** → push/dfs/pop on palindrome segments.
- **`isPal[i][j]` precompute.** → One O(n²) pass, O(1) per cut forever.
- **Non-pal = prune.** → Same as Day 17 "cut branch early" on strings.
- **Two partitions for `"aab"`.** → `[["a","a","b"], ["aa","b"]]`.

If you tried brute force first, that's fine — the breakthrough is **separating precompute from backtrack**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Partition with Precomputed Palindrome Table

---

*Both quests complete. Head to the checkpoint. →*
