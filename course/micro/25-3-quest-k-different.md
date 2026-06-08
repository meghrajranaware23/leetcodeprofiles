# ⚔ Quest: Subarrays with K Different Integers

> **Day 25** · [Subarrays with K Different Integers #992](https://leetcode.com/problems/subarrays-with-k-different-integers/) · Hard · 50 XP · 25 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Subarrays with K Different Integers on LeetCode](https://leetcode.com/problems/subarrays-with-k-different-integers/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums` and an integer `k`, return **the number of good subarrays**.

A **good subarray** is one where the number of **different integers** in it is exactly `k`.

```
Input:  nums = [1, 2, 1, 2, 3], k = 2
Output: 7
        ([1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2])

Input:  nums = [1, 2, 1, 3, 4], k = 3
Output: 3
        ([1,2,1,3], [2,1,3], [1,3,4])

Input:  nums = [1, 1, 1, 1, 1], k = 1
Output: 15
        (all 15 subarrays have exactly 1 distinct integer)
```

---

## 💡 Hints

**Hint 1 — Exactly k is awkward to shrink toward:** Sliding until `len(map) == k` is messy — you overshoot and undershoot. The Day 25 decomposition avoids this entirely.

**Hint 2 — The decomposition:** `exactly(k) = atMost(k) − atMost(k − 1)`. Count subarrays with at most k distinct, subtract those with at most k−1. What remains has exactly k.

**Hint 3 — atMost counting template:** Expand `right`, add `nums[right]` to freq map. Shrink `left` while `len(map) > k`. Each valid position contributes `(right − left + 1)` subarrays ending at `right`.

**Hint 4 — Why (right − left + 1)?** If the window `[left..right]` has at most k distinct, then `[left..right]`, `[left+1..right]`, ..., `[right..right]` are all valid endings at `right`. Count them all at once.

**Hint 5 — Edge case k=0:** If k=0, no subarray has exactly 0 distinct (every subarray has at least 1). Return 0. For k=1 on all-same array, atMost(1) − atMost(0) = 15 − 0 = 15.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** atMost(K) − atMost(K−1) Decomposition + Sliding Window Frequency Map

**How to identify this from the problem statement:**
- "exactly k different" / "exactly k distinct" → decomposition trigger
- "number of subarrays" → counting, not max/min length
- integer array → standard freq map (not 26-char array)
- Hard but O(n) — signals trick, not nested loops

| Keyword / phrase | What it signals |
|---|---|
| "exactly k different integers" | atMost(k) − atMost(k−1) |
| "number of good subarrays" | Counting template with (right − left + 1) |
| "different integers" | `len(freq_map)` after erasing zero-count keys |
| subarray (contiguous) | Sliding window, not subsequence |
| Hard + counting | Decomposition trick — don't brute-force distinct per subarray |

**Why this pattern works:** atMost(k) is easy — expand until too many distinct, shrink until valid, accumulate. Exactly k partitions the subarray space cleanly: everything with ≤k distinct minus everything with ≤(k−1) distinct leaves exactly those with k.

**How a strong solver thinks before coding:**
1. *"Exactly k distinct → atMost(k) − atMost(k−1). Day 25 decomposition."*
2. *"Write countAtMost(nums, bound) once."*
3. *"Shrink while len(map) > bound; add (right − left + 1) per step."*
4. *"Return countAtMost(k) − countAtMost(k−1)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each subarray, count distinct with a set** | O(n²) — each subarray rebuilt from scratch |
| **Shrink until len(map) == k** | Window can have k distinct but adding next element gives k+1 — hard to count all exactly-k windows |
| **Sliding window only for atMost, forget subtraction** | Counts ≤k, not exactly k — off by all subarrays with fewer distinct |
| **Not erasing zero-count keys** | `len(map)` overcounts distinct — shrink logic breaks |

**The insight brute force misses:** You don't need to maintain a window with *exactly* k distinct. Count the easier "at most" version twice and subtract. Same freq map, same shrink rule, different bound.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Subarrays with K Different Integers #992](https://leetcode.com/problems/subarrays-with-k-different-integers/) | Exactly k distinct | atMost(k) − atMost(k−1) |
| [Subarray Product Less Than K #713](https://leetcode.com/problems/subarray-product-less-than-k/) | Product constraint | Same counting shape, different shrink rule |
| [Longest Substring with At Most K Distinct #340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | Maximize length | atMost(k) without counting |
| [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) | At most 2 types | atMost(2) for max length |

#992 is the canonical exactly-k problem — the decomposition appears in dozens of counting variants.

---

## 📖 Walkthrough

```
nums = [1, 2, 1, 2, 3],  k = 2

─── countAtMost(2) ───
left=0, count=0, freq={}

right=0 (1): freq={1:1}, len=1≤2 → count += 1  (subarrays: [1])
right=1 (2): freq={1:1,2:1}, len=2≤2 → count += 2  ([1,2],[2])
right=2 (1): freq={1:2,2:1}, len=2≤2 → count += 3  ([1,2,1],[2,1],[1])
right=3 (2): freq={1:2,2:2}, len=2≤2 → count += 4  ([1,2,1,2]..[2])
right=4 (3): freq={1:2,2:2,3:1}, len=3>2 → shrink left
  remove nums[0]=1: freq={1:1,2:2,3:1}, len=3>2 → shrink
  remove nums[1]=2: freq={1:1,2:1,3:1}, len=3>2 → shrink
  remove nums[2]=1: freq={2:1,3:1}, len=2≤2, left=3
  count += (4-3+1) = 2  ([2,3],[3])

countAtMost(2) = 1+2+3+4+2 = 12

─── countAtMost(1) ───
right=0 (1): count += 1
right=1 (2): len=2>1 → shrink, left=1, count += 1
right=2 (1): shrink, left=2, count += 1
right=3 (2): shrink, left=3, count += 1
right=4 (3): shrink, left=4, count += 1

countAtMost(1) = 5

exactly(2) = 12 − 5 = 7 ✓
```

> 💡 **The insight:** You never chase "exactly 2" directly. atMost(2) generously counts 1- and 2-distinct subarrays; atMost(1) peels off the 1-distinct ones. The difference is precisely the 2-distinct subarrays.

---

## Solution

### C++
```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

private:
    int atMost(vector<int>& nums, int k) {
        if (k < 0) return 0;
        unordered_map<int, int> freq;
        int left = 0, count = 0;

        for (int right = 0; right < (int)nums.size(); right++) {
            freq[nums[right]]++;
            while ((int)freq.size() > k) {
                freq[nums[left]]--;
                if (freq[nums[left]] == 0) freq.erase(nums[left]);
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
};
```

### Python
```python
class Solution:
    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:
        return self._at_most(nums, k) - self._at_most(nums, k - 1)

    def _at_most(self, nums: list[int], k: int) -> int:
        if k < 0:
            return 0
        freq = {}
        left = count = 0

        for right in range(len(nums)):
            freq[nums[right]] = freq.get(nums[right], 0) + 1
            while len(freq) > k:
                freq[nums[left]] -= 1
                if freq[nums[left]] == 0:
                    del freq[nums[left]]
                left += 1
            count += right - left + 1

        return count
```

### Java
```java
class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int k) {
        if (k < 0) return 0;
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0, count = 0;

        for (int right = 0; right < nums.length; right++) {
            freq.merge(nums[right], 1, Integer::sum);
            while (freq.size() > k) {
                int key = nums[left];
                freq.merge(key, -1, Integer::sum);
                if (freq.get(key) == 0) freq.remove(key);
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}
```

**Complexity:** O(n) time · O(k) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Exactly k different"** → atMost(k) − atMost(k−1). Day 25 decomposition.
- **"Number of subarrays"** → Counting template: add `(right − left + 1)` each step.
- **"At most k"** → Shrink while `len(map) > k` — Day 11 window.
- **Erase zero-count keys** → Otherwise distinct count is wrong.
- **k=0 edge case** → atMost(−1) returns 0; exactly(0) = 0.

If you nested loops counting distinct per subarray, you found O(n²). The signal was "exactly k" + "count subarrays" — decomposition, not direct pursuit.

> 🎯 **Pattern:** exactly(k) = atMost(k) − atMost(k−1). One helper, two calls, O(n) total.

---

*Checkpoint: minimum window substring — coverage constraint capstone. →*
