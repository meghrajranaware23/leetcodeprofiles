<!-- hand-authored -->
# ⚔ Quest: Number of Longest Increasing Subsequence

> **Day 12** · [Number of Longest Increasing Subsequence #673](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Longest Increasing Subsequence on LeetCode](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)**

> ⚔ **Hunter's rule:** You need **two parallel arrays** — `len[i]` and `cnt[i]`. Fill them together in the same `j < i` loop as LIS length. Tails+binary search won't count ways.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Longest Increasing Subsequence #673](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **LIS + Counting** — extend the Day 12 `dp[i]` trace with `cnt[i]`.

When `nums[j] < nums[i]`:
- If `len[j]+1 > len[i]`: reset `len[i]`, `cnt[i] = cnt[j]`
- If `len[j]+1 == len[i]`: `cnt[i] += cnt[j]`

Answer: sum `cnt[i]` where `len[i] == maxLen`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** LIS + Counting

**How to identify this from the problem statement:**
- "Number of" + "longest increasing" → count at optimal length
- Same monotonic rule as #300
- Cannot use O(n log n) tails alone — need explicit path counts

| Keyword / phrase | What it signals |
|---|---|
| "number of longest" | `len` + `cnt` parallel arrays |
| "how many" + subsequence | Sum `cnt` at max length |
| "increasing subsequence" | Same `j < i`, `nums[j] < nums[i]` scan |

**How a strong solver thinks before coding:**
1. *"len[i] = LIS length ending at i (same as dp[i])."*
2. *"cnt[i] = ways to achieve len[i] ending at i."*
3. *"Better length → replace cnt; tie length → add cnt."*
4. *"Sum cnt where len == global max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all LIS, count them** | Exponential subsequences |
| **tails + binary search from #300** | Gives length only — no count aggregation |
| **Count all increasing subsequences** | Problem asks only **longest** ones |

**The insight brute force misses:** When extending from `j` to `i`, the count at `i` accumulates from every `j` that achieves the same optimal `len[j]+1`.

```
nums = [1,3,5,4,7]:
  len: [1,2,3,3,4]
  cnt: [1,1,1,1,2]  at i=4: cnt from j=2 and j=3 both give len 4
  answer: cnt[4] = 2
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) | Length only | `len[i]` without `cnt` |
| [Coin Change 2 #518](https://leetcode.com/problems/coin-change-2/) | Sum ways | Different state — counting DP |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | String partition count | 1D counting, not LIS |

---

## 📖 Walkthrough

**nums = [1,3,5,4,7]** — fill `len` and `cnt` together:

```
i=0: len=1 cnt=1
i=1 (3): j=0 → len=2 cnt=1
i=2 (5): j=0 → len=2; j=1 → len=3 cnt=1
i=3 (4): j=0 → len=2; j=1 → len=3 cnt=1 (tie with i=2 path)
i=4 (7): j=2 → len=4 cnt=1; j=3 → len=4 cnt+=1 → cnt=2

maxLen=4, answer = sum cnt where len=4 = 2
```

```
if nums[j] < nums[i]:
  if len[j]+1 > len[i]:  len[i]=len[j]+1; cnt[i]=cnt[j]
  elif len[j]+1 == len[i]: cnt[i] += cnt[j]
```

> 💡 **The insight:** Counting is a sidecar on the LIS scan — same loop, second array.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size(), maxLen = 1;
        vector<int> len(n, 1), cnt(n, 1);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
                    else if (len[j] + 1 == len[i]) cnt[i] += cnt[j];
                }
            }
            maxLen = max(maxLen, len[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++)
            if (len[i] == maxLen) ans += cnt[i];
        return ans;
    }
};
```

### Python
```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        length = [1] * n
        count = [1] * n
        for i in range(1, n):
            for j in range(i):
                if nums[j] < nums[i]:
                    if length[j] + 1 > length[i]:
                        length[i] = length[j] + 1
                        count[i] = count[j]
                    elif length[j] + 1 == length[i]:
                        count[i] += count[j]
        max_len = max(length)
        return sum(c for l, c in zip(length, count) if l == max_len)
```

### Java
```java
class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length, maxLen = 1;
        int[] len = new int[n], cnt = new int[n];
        Arrays.fill(len, 1); Arrays.fill(cnt, 1);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
                    else if (len[j] + 1 == len[i]) cnt[i] += cnt[j];
                }
            }
            maxLen = Math.max(maxLen, len[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++) if (len[i] == maxLen) ans += cnt[i];
        return ans;
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Can't reuse tails from #300"** → Counting needs O(n²) `len`/`cnt` scan.
- **"Tie on length → add counts"** → Multiple `j` can extend to same `len[i]`.
- **"New best length → replace count"** → Don't add to old shorter-path counts.
- **"Sum at maxLen"** → Not `cnt[n-1]` — any index can hold max LIS.

> 🎯 **Pattern Unlocked:** LIS + Counting — parallel `len` and `cnt` in one backward loop.

---

*Both quests complete. Head to the checkpoint. →*
