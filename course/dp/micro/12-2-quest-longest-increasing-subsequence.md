<!-- hand-authored -->
# ⚔ Quest: Longest Increasing Subsequence

> **Day 12** · [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Increasing Subsequence on LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/)**

> ⚔ **Hunter's rule:** Fill the **dp[i] trace** from today's concept on paper — one row, look back at `j < i`. Only then consider the O(n log n) shortcut.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Classic LIS DP** — `dp[i]` = length of LIS **ending at** index `i`.

O(n²) transition: `dp[i] = max(dp[j] + 1)` for `j < i` where `nums[j] < nums[i]`. Answer: `max(dp)`.

If you're stuck after 5 minutes: trace `[10,9,2,5,3,7,101,18]` from the concept page. Circle which `j` values each `i` looks at.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Classic LIS DP

**How to identify this from the problem statement:**
- Single array, pick a subsequence (not substring)
- **Strictly increasing** — each next element must be larger
- Optimize **length** — `max` over endings

| Keyword / phrase | What it signals |
|---|---|
| "increasing subsequence" | Backward scan `j < i`, compare values |
| "longest" on one array | `dp[i]` ending at i, then `max(dp)` |
| "subsequence" (not substring) | Can skip elements — not contiguous |

**Two valid implementations:**
1. **O(n²)** — pedagogical `dp[i]` trace (concept page visual)
2. **O(n log n)** — `tails` array + binary search (solution below)

**How a strong solver thinks before coding:**
1. *"State: length ending at each index."*
2. *"For i, best = 1 + max dp[j] where nums[j] < nums[i]."*
3. *"Answer is max over all i, not dp[n-1]."*
4. *"If only length needed, tails+binary search works."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all subsequences** | O(2^n) — check each for increasing |
| **Greedy: always pick next larger** | Fails — may skip a small value that enables longer tail |
| **Sort and take length** | Sorting destroys index order — subsequence must respect original positions |

**The insight brute force misses:** When extending to `i`, you only need the best answer at each **earlier** index — O(n²) states, or O(n log n) with tails structure.

```
All subsequences O(2^n)  vs  dp[i] filled once O(n²) or tails O(n log n)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest String Chain #1048](https://leetcode.com/problems/longest-string-chain/) | Sort by word length, check predecessor | Same `dp[i] = max(dp[j]+1)` with custom check |
| [Wiggle Subsequence #376](https://leetcode.com/problems/wiggle-subsequence/) | Up/down alternation | Day 16 — directional variant |
| [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Sort by end, chain on start | Day 16 — interval LIS cousin |

---

## 📖 Walkthrough

**nums = [10,9,2,5,3,7,101,18]**

```
dp[i] trace (length ending at i):

  i:  0  1  2  3  4  5   6   7
  v: 10  9  2  5  3  7 101  18
  dp: 1  1  1  2  2  3   4   4

max(dp) = 4  e.g. 2→3→7→18
```

**tails optimization (solution approach):**

```
Process each num; tails[k] = smallest tail of an increasing seq of length k+1
[10] → [9] → [2] → [2,5] → [2,3] → [2,3,7] → [2,3,7,101] → [2,3,7,18]
len(tails) = 4
```

> 💡 **The insight:** `dp[i]` trace teaches the state. `tails` compresses the same logic for length-only.

---

## Solution

### C++
```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int num : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), num);
            if (it == tails.end()) tails.push_back(num);
            else *it = num;
        }
        return tails.size();
    }
};
```

### Python
```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []
        for num in nums:
            lo, hi = 0, len(tails)
            while lo < hi:
                mid = (lo + hi) // 2
                if tails[mid] < num: lo = mid + 1
                else: hi = mid
            if lo == len(tails): tails.append(num)
            else: tails[lo] = num
        return len(tails)
```

### Java
```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int num : nums) {
            int pos = Collections.binarySearch(tails, num);
            if (pos < 0) pos = -(pos + 1);
            if (pos == tails.size()) tails.add(num);
            else tails.set(pos, num);
        }
        return tails.size();
    }
}
```

**Complexity:** O(n log n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Ending at i"** → Scan all `j < i`, not just `i-1`.
- **"Strictly increasing"** → Require `nums[j] < nums[i]`.
- **"max(dp), not dp[n-1]"** → LIS can end anywhere.
- **"1D trace, not LCS grid"** → Day 13 owns the 2D table.

> 🎯 **Pattern Unlocked:** Classic LIS DP — backward scan or tails for length.

---

*One quest down. Next: count how many LIS exist. →*
