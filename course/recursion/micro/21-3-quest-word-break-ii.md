# ⚔ Quest: Word Break II

> **Day 21** · [Word Break II #140](https://leetcode.com/problems/word-break-ii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Break II on LeetCode](https://leetcode.com/problems/word-break-ii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Word Break II #140](https://leetcode.com/problems/word-break-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Backtracking + Memo Hybrid**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Backtracking + Memo Hybrid

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Draw the decision tree. Trace choose / explore / unchoose.

```
Apply Backtracking + Memo Hybrid step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

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

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Backtracking + Memo Hybrid"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Backtracking + Memo Hybrid

---

*Both quests complete. Head to the checkpoint. →*
