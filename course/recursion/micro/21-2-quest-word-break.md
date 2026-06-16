<!-- hand-authored -->
# ⚔ Quest: Word Break

> **Day 21** · [Word Break #139](https://leetcode.com/problems/word-break/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Break on LeetCode](https://leetcode.com/problems/word-break/)**

> ⚔ **Hunter's rule:** Draw `wb(i)` on paper for `"leetcode"`. Mark memo entries at each index. No code until you can point to where overlap would happen on a longer string.

---

## The Problem

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Note:** The same word in the dictionary may be reused.

```
Input:  s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: "leetcode" = "leet" + "code"

Input:  s = "applepenapple", wordDict = ["apple","pen"]
Output: true

Input:  s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

---

## 💡 Hints

**Hint 1:** Define `dfs(i)` — *can the suffix `s[i..]` be segmented?* Base case: `i == len(s)` → `true`.

**Hint 2:** Loop `j` from `i+1` to `n`. If `s[i..j]` is in the dictionary **and** `dfs(j)` is true, return true immediately.

**Hint 3:** Put dictionary words in a `set` for O(1) lookup.

**Hint 4:** **Memo on index.** Before exploring cuts, check `memo[i]`. After exploring, store `memo[i] = false` if nothing worked — caching failures matters.

**Hint 5:** No path array needed. This is return-value recursion with overlap at the same start index.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Index Memoization (Boolean) — overlap recognition

| Clue in the problem | What it signals |
|---|---|
| "segmented into dictionary words" | Cut loop from index `i`, recurse from `j` |
| "true/false" (not list all) | Boolean return; short-circuit on first success |
| Same suffix reachable from different cuts | Memo key = start index `i` |
| Reusable dictionary words | Cut length varies; same index still overlaps |

**Contrast with Day 14 (Palindrome Partitioning):**

| Palindrome Partitioning | Word Break I |
|---|---|
| Generate all partitions | Existential — any one path suffices |
| Push/pop path segments | No path — return bool |
| Record at `i == n` | Return true at `i == n` |
| Optional memo | **Memo required** for efficiency |

**How a strong solver thinks before coding:**
1. *"State = start index i. What suffix remains?"*
2. *"Try every word-length cut. Dict check, then dfs(j)."*
3. *"Circle repeated i on the tree → memo[i]."*
4. *"Cache false answers too."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **dfs(i) without memo** | Exponential — `wb(j)` recomputed for many paths to `j` |
| **Generate all sentences, check if list non-empty** | WB II work when you only need bool |
| **Greedy longest match** | Fails — `"cars"` with dict `{car, cars}` needs wrong greedy choice |
| **Nested loops over all 2^(n-1) split positions** | Same tree, but no cache on overlapping suffixes |

**The insight brute force misses:** Two different prefix cuts can leave the **same suffix** starting at index `j`. Answer `wb(j)` once, reuse everywhere.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Word Break II #140](https://leetcode.com/problems/word-break-ii/) | Today's next quest — list memo + combine |
| [Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/) | Min cuts — DP table, not generate-all |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | A-Rank Day 23 — index memo with count |

---

## 📖 Walkthrough

`s = "leetcode"`, dict = `{leet, code}`:

```
dfs(0)
  j=4: "leet" in dict → dfs(4)
    j=8: "code" in dict → dfs(8)
      i==8 → true ✓
    memo[4] = true
  memo[0] = true

Answer: true
```

Overlap example — `s = "aaaaaaa"`, dict = `{a, aa}`:

```
dfs(0) reaches dfs(2) via "a"+"a" prefix cuts
dfs(1) also reaches dfs(2) via "a" cut
→ memo[2] saves recomputing the suffix "aaaaa"
```

---

## Solution

### C++
```cpp
class Solution {
    unordered_set<string> dict;
    vector<int> memo;
    bool dfs(string& s, int i) {
        if (i == (int)s.size()) return true;
        if (memo[i] != -1) return memo[i];
        for (int j = i + 1; j <= (int)s.size(); j++) {
            if (dict.count(s.substr(i, j - i)) && dfs(s, j))
                return memo[i] = true;
        }
        return memo[i] = false;
    }
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        for (auto& w : wordDict) dict.insert(w);
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};
```

### Python
```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        memo = {}
        def dfs(i):
            if i == len(s): return True
            if i in memo: return memo[i]
            for j in range(i + 1, len(s) + 1):
                if s[i:j] in words and dfs(j):
                    memo[i] = True; return True
            memo[i] = False; return False
        return dfs(0)
```

### Java
```java
class Solution {
    private Set<String> dict;
    private Boolean[] memo;
    public boolean wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        memo = new Boolean[s.length()];
        return dfs(s, 0);
    }
    private boolean dfs(String s, int i) {
        if (i == s.length()) return true;
        if (memo[i] != null) return memo[i];
        for (int j = i + 1; j <= s.length(); j++) {
            if (dict.contains(s.substring(i, j)) && dfs(s, j))
                return memo[i] = true;
        }
        return memo[i] = false;
    }
}
```

**Complexity:** O(n^2) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Segment string with dictionary"** → index cut loop, same skeleton as partition backtracking.
- **"Just true/false"** → return bool, no path push/pop.
- **`memo[i]`** → the suffix `s[i..]` was answered before; don't re-walk the tree.
- **Cache false** → a dead-end index stays dead; prevents exponential retry.

> 🎯 **Pattern Unlocked:** Index Memoization (Boolean)

---

*One quest down. Next: generate every sentence — memo stores lists, not just yes/no. →*
