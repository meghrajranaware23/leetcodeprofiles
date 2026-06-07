# ⚔ Quest: Move Zeroes

> **Day 1** · LeetCode #283 · Easy · 10 min

---

## The Mission

Given an integer array `nums`, move all `0`s to the end while maintaining the relative order of non-zero elements. Do this **in-place**.

```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

> 🤔 **Before you scroll:** Which pattern from the concept lesson applies here? The array needs in-place modification... Try for 5 minutes.

---

## Approach

Use the **read-write pointer pattern**. The write pointer marks where the next non-zero should go. Swap non-zeros forward, and zeros accumulate at the end naturally.

```
Initial:    [0, 1, 0, 3, 12]
             w
             r

r=0: arr[0]=0 → skip
            [0, 1, 0, 3, 12]
             w     r

r=1: arr[1]=1 → swap(arr[0], arr[1]) → w++
            [1, 0, 0, 3, 12]
                w     r

r=2: arr[2]=0 → skip
            [1, 0, 0, 3, 12]
                w        r

r=3: arr[3]=3 → swap(arr[1], arr[3]) → w++
            [1, 3, 0, 0, 12]
                   w         r

r=4: arr[4]=12 → swap(arr[2], arr[4]) → w++
            [1, 3, 12, 0, 0]  ✓
```

> 💡 **The insight:** When `write == read` (no zeros yet), the swap is a no-op. The pattern handles this naturally — no special cases needed.

---

## Solution

### C++
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int write = 0;
        for (int read = 0; read < nums.size(); read++) {
            if (nums[read] != 0) {
                swap(nums[write], nums[read]);
                write++;
            }
        }
    }
};
```

### Python
```python
class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        write = 0
        for read in range(len(nums)):
            if nums[read] != 0:
                nums[write], nums[read] = nums[read], nums[write]
                write += 1
```

### Java
```java
class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                int temp = nums[write];
                nums[write] = nums[read];
                nums[read] = temp;
                write++;
            }
        }
    }
}
```

**Complexity:** O(n) time · O(1) space

> 🎯 **Pattern Unlocked:** Read-write pointer for in-place element rearrangement. The write pointer defines the boundary between "processed" and "unprocessed."

---

*One quest down. The next one introduces an elegant trick. →*
