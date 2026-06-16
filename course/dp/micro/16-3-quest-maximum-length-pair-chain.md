<!-- hand-authored -->
# ⚔ Quest: Maximum Length of Pair Chain

> **Day 16** · [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Length of Pair Chain on LeetCode](https://leetcode.com/problems/maximum-length-of-pair-chain/)**

> ⚔ **Hunter's rule:** **Sort by pair end** (second value). Greedy: take next pair if `start > prev_end`. Day 12 LIS spirit on a timeline.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Interval Selection DP** — sort by `pairs[i][1]`, chain where `pairs[i][0] > end`.

Greedy scan after sort matches O(n log n) sort + O(n) scan — same optimal structure as activity selection.

If you're stuck after 5 minutes: sort `[[1,2],[2,3],[3,4]]` — can you take both [1,2] and [3,4]?

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Interval Selection DP

**How to identify this from the problem statement:**
- Pairs `[start, end]` — chain if `start_next > end_prev`
- Maximize count of pairs in chain
- Sort unlocks greedy/DP scan

| Keyword / phrase | What it signals |
|---|---|
| "pair chain" / "pairs[i][1]" | Sort by end, greedy chain |
| "a < b" in each pair | Interval `[a,b]` |
| "maximum length of chain" | Activity selection / LIS on ends |

**Day 12 bridge:** After sort by end, picking non-overlapping intervals = increasing chain on end times with start constraint — LIS cousin.

**How a strong solver thinks before coding:**
1. *"Sort by second coordinate (end)."*
2. *"end = MIN, ans = 0."*
3. *"If start > end, take pair, update end."*
4. *"Return ans."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all subsets of pairs** | O(2^n) |
| **Sort by start only** | Greedy by start doesn't minimize blocking |
| **O(n²) DP without sort** | Works but sort+greedy is simpler |

**The insight brute force misses:** Sorting by **end** lets greedy maximize room for future pairs — classic interval scheduling.

```
[[1,2],[2,3],[3,4]] sorted by end:
  take [1,2], skip [2,3] (2 not > 2), take [3,4] → 2
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) | One array, no intervals | Day 12 |
| [Non-overlapping Intervals #435](https://leetcode.com/problems/non-overlapping-intervals/) | Min removals | Same sort-by-end greedy |
| [Wiggle Subsequence #376](https://leetcode.com/problems/wiggle-subsequence/) | Directional subsequence | Today's other quest |

---

## 📖 Walkthrough

**pairs = [[1,2], [2,3], [3,4]]**

```
Sort by end: [[1,2],[2,3],[3,4]]
end = MIN
[1,2]: 1>MIN → take, ans=1, end=2
[2,3]: 2>2? no → skip
[3,4]: 3>2 → take, ans=2, end=4
```

> 💡 **The insight:** Sort by end + `start > end` is the interval version of "pick increasing chain."

---

## Solution

### C++
```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
        int ans = 0, end = INT_MIN;
        for (auto& p : pairs)
            if (p[0] > end) { ans++; end = p[1]; }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda x: x[1])
        ans = 0
        end = float('-inf')
        for a, b in pairs:
            if a > end:
                ans += 1
                end = b
        return ans
```

### Java
```java
class Solution {
    public int findLongestChain(int[][] pairs) {
        Arrays.sort(pairs, (a, b) -> a[1] - b[1]);
        int ans = 0, end = Integer.MIN_VALUE;
        for (int[] p : pairs)
            if (p[0] > end) { ans++; end = p[1]; }
        return ans;
    }
}
```

**Complexity:** O(n log n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Sort by end, not start"** — Frees earliest finish for rest.
- **"start > end" strict** — Chain requires gap between intervals.
- **"Greedy = optimal"** — Activity selection proof.
- **"Day 12 LIS cousin"** — Monotone chain after sort.

> 🎯 **Pattern Unlocked:** Interval Selection DP — sort by end, greedy chain.

---

*Both quests complete. Head to the checkpoint. →*
