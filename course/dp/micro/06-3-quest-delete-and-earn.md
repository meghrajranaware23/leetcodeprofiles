<!-- hand-authored -->
# ⚔ Quest: Delete and Earn

> **Day 6** · [Delete and Earn #740](https://leetcode.com/problems/delete-and-earn/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Delete and Earn on LeetCode](https://leetcode.com/problems/delete-and-earn/)**

> ⚔ **Hunter's rule:** Before take/skip, **compress** — bucket each value `v` into `earn[v] = sum of all v's in nums`. Then run House Robber on `earn[1..maxVal]`.

---

## The Problem

See the full problem statement on LeetCode: **[Delete and Earn #740](https://leetcode.com/problems/delete-and-earn/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Two phases:**

1. **Freq compression** — `earn[v] += v` for every `num` in `nums`. Picking value `v` deletes *all* copies and forbids `v-1` and `v+1`.
2. **Take/skip on values** — treat `earn[1], earn[2], ... earn[maxVal]` like houses on a street. Adjacent **values** cannot both be taken.

`dp[i] = max(dp[i-1], dp[i-2] + earn[i])` — same as House Robber on the compressed array.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** House Robber in Disguise

**How to identify this from the problem statement:**
- Sounds like "delete elements" — actually **pick values**, not indices
- Deleting `v` removes **all** `v` and blocks `v±1`
- That's **non-adjacent on the value line** → robber on `earn[]`

| Keyword / phrase | What it signals |
|---|---|
| "delete all occurrences of v" | Bucket by value |
| "cannot pick v-1 or v+1" | Adjacency on **values**, not indices |
| "maximum points" | `max` take/skip after compression |

**Why compression matters:** Raw `nums` order is irrelevant — only how much total points each value contributes.

**How a strong solver thinks before coding:**
1. *"Build earn[v] = v × count(v)."*
2. *"Run robber on earn[1..maxVal]."*
3. *"dp[i] = max(skip earn[i], take earn[i] + dp[i-2])."*
4. *"Edge: if maxVal=0 only, handle earn[0]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Take/skip on original index order** | Wrong — value 3 at index 0 and value 2 at index 1 aren't "neighbors" in the problem's sense |
| **Try all subsets of distinct values** | O(2^k) — still exponential in distinct count |
| **Greedy: take largest value first** | Blocked neighbors may make skipping better |
| **Skip compression** | Misses that the state is **value**, not position |

**The insight brute force misses:** Map the problem onto a **short 1D array of totals** — then Day 6 applies unchanged.

```
nums = [3,4,3]  →  earn[3]=6, earn[4]=4
                  rob earn[1..4]: max non-adjacent values
                  can't take 3 and 4 together
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Compression step | Then |
|---|---|---|
| [House Robber #198](https://leetcode.com/problems/house-robber/) | None — nums is already the street | Take/skip |
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Circular split | Two rob passes |
| Sort + unique adjacency problems | Bucket or sort by key | Take/skip on compressed keys |

---

## 📖 Walkthrough

**Example:** `nums = [3, 4, 2]`

```
Compression:
  earn[2]=2, earn[3]=3, earn[4]=4

Take/skip on values 1..4 (earn[1]=0):

  i :  1   2   3   4
  earn: 0   2   3   4
  dp :  0   2   3   6

  i=2: max(0, 0+2)=2
  i=3: max(2, 0+3)=3   (can't take 2 and 3)
  i=4: max(3, 3+4)=6   (take 4 + dp[2]=2 → 6)
```

> 💡 **The insight:** Recognize the disguise → compress → run the Day 6 template you already know.

---

## Solution

### C++
```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int maxVal = *max_element(nums.begin(), nums.end());
        vector<int> earn(maxVal + 1, 0);
        for (int num : nums) earn[num] += num;
        int prev2 = 0, prev1 = earn[1];
        for (int i = 2; i <= maxVal; i++) {
            int curr = max(prev1, prev2 + earn[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
};
```

### Python
```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        max_val = max(nums)
        earn = [0] * (max_val + 1)
        for num in nums:
            earn[num] += num
        prev2, prev1 = 0, earn[1]
        for i in range(2, max_val + 1):
            prev2, prev1 = prev1, max(prev1, prev2 + earn[i])
        return prev1
```

### Java
```java
class Solution {
    public int deleteAndEarn(int[] nums) {
        int maxVal = 0;
        for (int num : nums) maxVal = Math.max(maxVal, num);
        int[] earn = new int[maxVal + 1];
        for (int num : nums) earn[num] += num;
        int prev2 = 0, prev1 = earn[1];
        for (int i = 2; i <= maxVal; i++) {
            int curr = Math.max(prev1, prev2 + earn[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}
```

**Complexity:** O(n + k) time · O(k) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Delete v blocks v±1"** → adjacency on **values**, not indices.
- **"Compress first"** → `earn[v]` = total points for value `v`.
- **"Then House Robber"** → identical take/skip recurrence.
- **"Order of nums doesn't matter"** → freq compression is the unlock.

> 🎯 **Pattern Unlocked:** House Robber in Disguise

---

*Both quests complete. Head to the checkpoint. →*
