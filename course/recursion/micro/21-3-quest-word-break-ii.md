<!-- hand-authored -->
# ⚔ Quest: Word Break II

> **Day 21** · [Word Break II #140](https://leetcode.com/problems/word-break-ii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Break II on LeetCode](https://leetcode.com/problems/word-break-ii/)**

> ⚔ **Hunter's rule:** Solve WB I mentally first. Then ask: *"What if I need every sentence?"* Draw the branch tree for `"catsanddog"`. Circle where `dfs(7)` would be called twice.

---

## The Problem

Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where every word is a valid dictionary word. Return **all such possible sentences** in any order.

```
Input:  s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]

Input:  s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]

Input:  s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

---

## 💡 Hints

**Hint 1:** Same cut loop as WB I — `dfs(i)` returns **all valid sentences** for suffix `s[i..]`, not just bool.

**Hint 2:** Base case: `i == n` → return `[""]` (one empty tail — lets you append the last word cleanly).

**Hint 3:** For each valid word `w = s[i..j]`, get `tails = dfs(j)`. For each tail in `tails`, push `w` or `w + " " + tail` into result.

**Hint 4:** **Memo[i] = list of suffix sentences** from index `i`. If already computed, return the list — don't re-explore the subtree.

**Hint 5:** Pure backtracking without memo TLEs on overlapping suffixes. The tree is real; the memo collapses duplicate `(i)` work.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Backtracking + Index Memo Hybrid

| Clue | Signal |
|---|---|
| "return all possible sentences" | Generate-all on cut tree |
| Same index, many prefix paths | Memo list at each index |
| Dictionary segmentation | Identical cut loop to WB I |
| Empty output when impossible | `dfs(0)` returns `[]` if no valid cuts |

**WB I vs WB II side-by-side:**

| | Word Break I | Word Break II |
|---|---|---|
| Return type | `bool` | `List<String>` |
| Base at `i==n` | `true` | `[""]` |
| On success | Short-circuit | Collect all combos |
| Memo value | true/false | list of suffix sentences |
| Combine step | none | `w + " " + tail` for each tail |

**How a strong solver thinks before coding:**
1. *"Copy WB I cut loop — change return to list."*
2. *"Empty tail at base lets last word stand alone."*
3. *"memo[i] stores every sentence from s[i..] — reuse on second visit."*
4. *"This is backtracking's tree with memo pruning duplicate subtrees."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Pure backtrack, no memo** | Regenerates identical suffix sentences from every path |
| **Run WB I first, one backtrack pass** | Misses memo benefit on suffix generation |
| **Iterative BFS of paths** | Works but hides the index-memo insight |
| **Building full strings before checking dict** | Wasteful — validate cut, then combine cached tails |

**The insight brute force misses:** `"cat sand dog"` and `"cats and dog"` both need **all completions from index 7** (`"dog"`). Compute once at `memo[7]`, prepend different prefixes.

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant |
|---|---|
| [Word Break #139](https://leetcode.com/problems/word-break/) | Boolean memo — today's prerequisite |
| [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) | Pure backtrack generate-all (no index overlap) |
| [Word Break II — follow-up with max words](https://leetcode.com/problems/word-break-ii/) | Same memo; optional pruning |

---

## 📖 Walkthrough

`s = "catsanddog"`, dict = `{cat, cats, and, sand, dog}`:

```
dfs(10) → [""]                          // base
dfs(7):  "dog" valid → tails = dfs(10)
         → ["dog"]
         memo[7] = ["dog"]

dfs(3):  "sand" → tails = memo[7] → ["sand dog"]
         "and"  → dfs(6) ... (no valid continuation here)
         memo[3] = ["sand dog"]

dfs(0):  "cat"  → memo[3] → ["cat sand dog"]
         "cats" → dfs(4)
           "and" → memo[7] → ["and dog"] → ["cats and dog"]
         memo[0] = ["cat sand dog", "cats and dog"]
```

Second call to `dfs(7)` anywhere in the tree → instant return of `["dog"]`.

---

## Solution

### C++
```cpp
class Solution {
    unordered_set<string> dict;
    unordered_map<int, vector<string>> memo;
    vector<string> dfs(string& s, int i) {
        if (i == (int)s.size()) return {""};
        if (memo.count(i)) return memo[i];
        vector<string> res;
        for (int j = i + 1; j <= (int)s.size(); j++) {
            string w = s.substr(i, j - i);
            if (!dict.count(w)) continue;
            for (auto& tail : dfs(s, j)) {
                if (tail.empty()) res.push_back(w);
                else res.push_back(w + " " + tail);
            }
        }
        return memo[i] = res;
    }
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        for (auto& w : wordDict) dict.insert(w);
        return dfs(s, 0);
    }
};
```

### Python
```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        words = set(wordDict)
        memo = {}
        def dfs(i):
            if i == len(s): return ['']
            if i in memo: return memo[i]
            res = []
            for j in range(i + 1, len(s) + 1):
                w = s[i:j]
                if w not in words: continue
                for tail in dfs(j):
                    res.append(w if not tail else w + ' ' + tail)
            memo[i] = res
            return res
        return dfs(0)
```

### Java
```java
class Solution {
    private Set<String> dict;
    private Map<Integer, List<String>> memo = new HashMap<>();
    public List<String> wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        return dfs(s, 0);
    }
    private List<String> dfs(String s, int i) {
        if (i == s.length()) return List.of("");
        if (memo.containsKey(i)) return memo.get(i);
        List<String> res = new ArrayList<>();
        for (int j = i + 1; j <= s.length(); j++) {
            String w = s.substring(i, j);
            if (!dict.contains(w)) continue;
            for (String tail : dfs(s, j)) {
                res.add(tail.isEmpty() ? w : w + " " + tail);
            }
        }
        memo.put(i, res);
        return res;
    }
}
```

**Complexity:** O(n · 2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Same cut loop as WB I** — only the return type and combine step changed.
- **`[""]` base case** — elegant spacer for `"word" + tail`.
- **memo[i] is a list** — backtracking tree, but suffix subtrees cached.
- **Pure backtrack vs hybrid** — generate-all + overlap → memo on index.

> 🎯 **Pattern Unlocked:** Backtracking + Index Memo Hybrid

---

*Both quests complete. Head to the checkpoint. →*
