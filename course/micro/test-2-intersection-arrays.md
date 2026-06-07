# ⚔ E-Rank Test — Problem 2

> **Intersection of Two Arrays II** · LeetCode #350 · Easy · 100 XP

---

## The Mission

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays. Return the result in any order.

```
Input:  nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output: [2, 2]

Input:  nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
Output: [4, 9]  (order doesn't matter)
```

> 🎯 **What's being tested:** Frequency counting (Day 3) + hash map lookup (Day 4) — build a frequency map from one array, then match against the other.

---

<details>
<summary><strong>🔓 Reveal Solution</strong></summary>

### Approach

Build a frequency map from `nums1`. Then iterate `nums2` — if the current element exists in the map with count > 0, add it to the result and decrement the count.

```
nums1 = [1, 2, 2, 1]  →  freq = {1:2, 2:2}

Scan nums2 = [2, 2]:
  2 → freq[2]=2 > 0 → add to result, freq[2]=1
  2 → freq[2]=1 > 0 → add to result, freq[2]=0

Result: [2, 2] ✓
```

### C++
```cpp
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> freq;
        for (int num : nums1) freq[num]++;
        vector<int> result;
        for (int num : nums2) {
            if (freq[num] > 0) {
                result.push_back(num);
                freq[num]--;
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        freq = {}
        for num in nums1:
            freq[num] = freq.get(num, 0) + 1
        result = []
        for num in nums2:
            if freq.get(num, 0) > 0:
                result.append(num)
                freq[num] -= 1
        return result
```

### Java
```java
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums1)
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        List<Integer> result = new ArrayList<>();
        for (int num : nums2) {
            if (freq.getOrDefault(num, 0) > 0) {
                result.add(num);
                freq.put(num, freq.get(num) - 1);
            }
        }
        return result.stream().mapToInt(i -> i).toArray();
    }
}
```

**Complexity:** O(n + m) time · O(n) space

</details>

---

*2 of 3. One more to go. →*
