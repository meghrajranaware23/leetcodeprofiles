# ⚔ E-Rank Test — Problem 2

> [Intersection of Two Arrays II #350](https://leetcode.com/problems/intersection-of-two-arrays-ii/) · Easy · 100 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Intersection of Two Arrays II on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays. Return the result in any order.

```
Input:  nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output: [2, 2]

Input:  nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
Output: [4, 9]  (order doesn't matter)
```

---

## 💡 Hints

> 🎯 **What's being tested:** Frequency counting (Day 3) + hash map lookup (Day 4) — build a frequency map from one array, then match against the other.

Build a frequency map from `nums1`. Then iterate `nums2` — if the current element exists in the map with count > 0, add it to the result and decrement the count.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Frequency Map + Consumption (Day 3 + Day 4 hybrid)

| Clue in the problem | What it signals |
|---|---|
| "intersection" / "common elements" | Match elements across two collections |
| "as many times as it shows in both" | Frequency map — not just a set |
| two arrays | Build map from one, scan the other |
| "each element in result must appear as many times" | Consumption/decrement — not boolean membership |
| "return in any order" | Order doesn't matter — map scan is fine |

**How to identify from the statement:** "Intersection with duplicates" means you need **counts**, not just presence. A set handles unique intersection; a frequency map handles repeated intersection.

**How a strong solver thinks before coding:**
1. *"Intersection with duplicates → frequency map from nums1."*
2. *"Scan nums2, consume counts, add to result when count > 0."*
3. *"Set won't work — 'as many times as in both' means counts, not just presence."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each element in nums2, scan all of nums1 and remove first match** | O(n × m) — re-scans nums1 for every element in nums2 |
| **Hash set from nums1 (no counts)** | Loses duplicates — `[2,2]` ∩ `[2,2]` becomes `[2]`, not `[2,2]` |
| **Sort both arrays, two pointers** | O(n log n + m log m) — works, but frequency map is O(n + m) with no sorting |

**The insight brute force misses:** Intersection with duplicates is a **consumption** problem. Build counts from one array, then **decrement** as you match — each element in nums2 "uses up" one count from the map.

---

## 🎯 Transfer to Unseen Problems

Can you recognize the frequency + hash map hybrid on unfamiliar wording?

**Scenario 1:** *"Given two arrays, return elements that appear in both — but only once each, even if they repeat in the input."*

Which pattern? **Hash set intersection** (not frequency map). "Only once each" = unique intersection → set, not counts.

**Scenario 2:** *"Can you construct string B using characters from string A? Each character in A can only be used once."*

Which pattern? **Frequency map + consumption** (Ransom Note). Build counts from A, decrement as you consume B — identical mechanics to intersection.

**Scenario 3:** *"Given two arrays, return how many elements from nums2 appear in nums1 (counting duplicates)."*

Which pattern? **Frequency map from nums1, scan nums2 and increment a counter** when `freq[num] > 0`, then decrement. Same consumption pattern, different output shape.

> **Answer key:** Scenarios 2 and 3 → frequency map + consumption. Scenario 1 → hash set (unique intersection). The signal is **"as many times as"** → counts; **"unique" / "once each"** → set.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

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

## 💭 What Should Have Clicked in Your Mind?

- **"Intersection"** → What do both arrays share?
- **"As many times as in both"** → Set isn't enough — need counts.
- **"Build from one, match against other"** → Standard frequency consumption pattern.

This combines Day 3 (counting) and Day 4 (hash map storage). Recognizing which container to use is the skill.

---

*2 of 3. One more to go. →*
