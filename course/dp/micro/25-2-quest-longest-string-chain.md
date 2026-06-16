<!-- hand-authored -->
# ⚔ Quest: Longest String Chain

> **Day 25** · [Longest String Chain #1048](https://leetcode.com/problems/longest-string-chain/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest String Chain on LeetCode](https://leetcode.com/problems/longest-string-chain/)**

> ⚔ **Hunter's rule:** Sort by **word length**. LIS spirit: `dp[w]` = chain ending at w. Predecessor = delete one char from w — if in map, extend.

---

## The Problem

See the full problem statement on LeetCode: **[Longest String Chain #1048](https://leetcode.com/problems/longest-string-chain/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Sort + Subsequence DP** — NOT knapsack.

**Step 1:** Sort words by length ascending.

**Step 2:** `dp[w] = 1` for each word.

**Step 3:** For each char index in `w`, form `pred = w[:i] + w[i+1:]`. If `pred` in dp map: `dp[w] = max(dp[w], dp[pred]+1)`.

Only words one char shorter can be predecessors — sorting by length ensures predecessors are processed first.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sort + Subsequence DP

**How to identify this from the problem statement:**
- Chain where each word adds exactly one letter to previous
- Predecessor relation = subsequence with length diff 1
- Maximize chain length

| Keyword / phrase | What it signals |
|---|---|
| "predecessor" / "add one letter" | Delete-one-char backward lookup |
| "word chain" | Sort by length + hash map |
| "longest chain" | LIS-style max over predecessors |

**Day 12 bridge:** Same "extend from valid previous items" logic — but edge test is string predecessor, not `nums[j] < nums[i]`.

**Day 17 contrast:** No capacity, no weights — don't use knapsack table.

**How a strong solver thinks before coding:**
1. *"Sort words by len(words[i])."*
2. *"Hash map dp: word → chain length."*
3. *"For each w, try all single-char deletions as pred."*
4. *"Track global max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **O(n²) check every pair** | Works but misses sort optimization; still need correct predecessor test |
| **Knapsack dp[i][w]** | Wrong model — no capacity dimension |
| **Skip sorting** | May process long words before predecessors exist in map |

**The insight brute force misses:** Sorting by length guarantees when you process `w`, every valid predecessor (one char shorter) is already in the map.

```
words = ["a","b","ba","bca","bda","bdca"]

"a": dp=1
"ba": pred "a" → dp=2
"bca": pred "ca" no, pred "ba" yes → dp=3
"bdca": pred "bca" → dp=4
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) | Numeric order | Day 12 |
| [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Sort by end, greedy | Day 16 |
| [Out of Boundary Paths #576](https://leetcode.com/problems/out-of-boundary-paths/) | 3D grid steps | Today's other quest |

---

## 📖 Walkthrough

**words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]**

```
Sorted by length: xb, xbc, cxbc, pcxbc, pcxbcf

xb:   dp=1
xbc:  pred xb → dp=2
cxbc: pred cbc? no, pred xbc? no... pred cxbc delete c→xbc → dp=3
pcxbc: extends cxbc or xbc chain → dp=4
pcxbcf: extends pcxbc → dp=5

Answer: 5
```

For each word, only check deletions — O(L) per word.

> 💡 **The insight:** Sort + map = LIS on strings with O(1) predecessor lookup per deletion.

---

## Solution

### C++
```cpp
class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });
        unordered_map<string, int> dp;
        int ans = 1;
        for (const string& w : words) {
            dp[w] = 1;
            for (int i = 0; i < w.size(); i++) {
                string pred = w.substr(0, i) + w.substr(i + 1);
                if (dp.count(pred)) {
                    dp[w] = max(dp[w], dp[pred] + 1);
                }
            }
            ans = max(ans, dp[w]);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestStrChain(self, words: list[str]) -> int:
        words.sort(key=len)
        dp = {}
        ans = 1
        for w in words:
            dp[w] = 1
            for i in range(len(w)):
                pred = w[:i] + w[i+1:]
                if pred in dp:
                    dp[w] = max(dp[w], dp[pred] + 1)
            ans = max(ans, dp[w])
        return ans
```

### Java
```java
class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, (a, b) -> a.length() - b.length());
        Map<String, Integer> dp = new HashMap<>();
        int ans = 1;
        for (String w : words) {
            dp.put(w, 1);
            for (int i = 0; i < w.length(); i++) {
                String pred = w.substring(0, i) + w.substring(i + 1);
                if (dp.containsKey(pred)) {
                    dp.put(w, Math.max(dp.get(w), dp.get(pred) + 1));
                }
            }
            ans = Math.max(ans, dp.get(w));
        }
        return ans;
    }
}
```

**Complexity:** O(n · L²) time · O(n · L) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Sort by length first"** — predecessors are always shorter.
- **"Delete one char → pred"** — O(L) checks per word.
- **"LIS on words, not numbers"** — map not array index.
- **"Not knapsack"** — no capacity dimension.

If you tried brute force first, that's fine — the breakthrough is **sort + predecessor hash map**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Sort + Subsequence DP

---

*One quest down. The next one builds on this pattern. →*
