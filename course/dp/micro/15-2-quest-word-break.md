<!-- hand-authored -->
# ⚔ Quest: Word Break

> **Day 15** · [Word Break #139](https://leetcode.com/problems/word-break/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Break on LeetCode](https://leetcode.com/problems/word-break/)**

> ⚔ **Hunter's rule:** Draw the **prefix dp** array — `dp[i]` = can first `i` chars be segmented? Try every cut `j` before `i`.

---

## The Problem

See the full problem statement on LeetCode: **[Word Break #139](https://leetcode.com/problems/word-break/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **String Partition DP** — `dp[i]` for prefix length `i`.

For each `i`, try `j` from `0` to `i-1`: if `dp[j]` and `s[j:i]` is in `wordDict`, set `dp[i]=true`.

If you're stuck after 5 minutes: trace `"leetcode"` with words `{leet, code}` — mark which `dp[i]` flip to true.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** String Partition DP

**How to identify this from the problem statement:**
- Segment entire string into dictionary words
- Order preserved, words concatenated
- Boolean — can we reach full length?

| Keyword / phrase | What it signals |
|---|---|
| "word break" / "segmented" | Prefix DP `dp[i]` |
| "dictionary" / "wordDict" | Check substring `s[j:i]` in set |
| "can be segmented" | Reachability — `dp[n]` |

**How a strong solver thinks before coding:**
1. *"dp[0]=true — empty string valid."*
2. *"For each end i, try every start j."*
3. *"Need dp[j] true AND word in dict."*
4. *"Return dp[n]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every partition of s** | O(2^n) splits |
| **Greedy: longest dict match from left** | `"cars"` vs `car+s` — greedy can fail |
| **DFS without memo on start index** | Exponential revisit of same prefix |

**The insight brute force misses:** Only `n+1` prefix states — each `dp[i]` solved once.

```
"catsandog" with dict — greedy "cat" first may block "cats" + "and" + "og" path
Prefix DP explores all valid cut points.
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Word Break II #140](https://leetcode.com/problems/word-break-ii/) | Return all segmentations | Prefix DP + backtrack |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Count partitions by digit rules | Prefix counting DP |
| [Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/) | Today's second quest — interval | Different state |

---

## 📖 Walkthrough

**s = "leetcode", dict = {leet, code}**

```
dp[0]=T
i=4: j=0, "leet" in dict, dp[0]=T → dp[4]=T
i=8: j=4, "code" in dict, dp[4]=T → dp[8]=T
Answer: true
```

```
for i in 1..n:
  for j in 0..i-1:
    if dp[j] and s[j:i] in words: dp[i]=true
```

> 💡 **The insight:** Prefix reachability — same skeleton as climbing stairs with variable step sizes (word lengths).

---

## Solution

### C++
```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && dict.count(s.substr(j, i - j))) { dp[i] = true; break; }
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[n]
```

### Java
```java
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && dict.contains(s.substring(j, i))) { dp[i] = true; break; }
        return dp[n];
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Prefix dp[i]"** — Not interval palindrome — partition cuts.
- **"dp[0]=true"** — Empty prefix always valid.
- **"Try all j before i"** — Word length variable.
- **"Not LPS"** — No `dp[i][j]` interval on Day 15 quest 1.

> 🎯 **Pattern Unlocked:** String Partition DP — prefix reachability via dictionary words.

---

*One quest down. Next: LPS — subsequence, not substring. →*
