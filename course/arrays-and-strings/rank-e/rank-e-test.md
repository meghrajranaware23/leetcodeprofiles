---
# ⚔ E-RANK TEST — Prove Your Foundation

**Rank:** E-Rank | **XP Available:** 300 bonus XP | **Time Limit:** 90 minutes

---

You've completed 5 days of E-Rank training. You've learned array traversal, frequency counting, hash maps, string manipulation, and prefix sums. Now it's time to prove you deserve to ascend.

**Rules:**
- Solve all 3 problems.
- No hints. No peeking at solutions until you've attempted each for at least 20 minutes.
- Time limit: 90 minutes total.
- Passing score: Solve at least 2 of 3.
- Write clean, interview-ready code — variable names matter, edge cases matter.

**What's being tested:**
| Problem | XP | Core Skill |
|---------|-----|------------|
| Product of Array Except Self | 100 | Prefix/suffix product thinking |
| Group Anagrams | 100 | Frequency counting + hash map grouping |
| Contiguous Array | 100 | Prefix sum + hash map combo |

> If you can solve all three without hints, you're ready. If you struggle with any, revisit the relevant day before moving to D-Rank.

---

## 📝 Problem 1: Product of Array Except Self (LeetCode #238)

**XP:** 100 | **Difficulty:** Medium | **Tests:** Prefix/Suffix Product Thinking

### Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

You must write an algorithm that runs in O(n) time and **without using the division operator**.

### Constraints

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

### Examples

```
Example 1:
Input:  nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
Explanation: 
  answer[0] = 2*3*4 = 24
  answer[1] = 1*3*4 = 12
  answer[2] = 1*2*4 = 8
  answer[3] = 1*2*3 = 6

Example 2:
Input:  nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
```

### Why This Tests E-Rank Skills

This problem directly tests whether you understand prefix/suffix precomputation — the logical extension of prefix sums to prefix products. The "no division" constraint forces you to think in terms of two passes: one building products from the left, one from the right. It's the ultimate test of the precomputation mindset you developed on Day 5.

---

### ⏱ Attempt this problem for at least 20 minutes before revealing the solution.

---

<details>
<summary><strong>🔓 Reveal Solution Approach</strong></summary>

### Approach

The key insight: `answer[i] = (product of all elements to the LEFT of i) × (product of all elements to the RIGHT of i)`.

1. **Left pass:** Build a prefix product array where `left[i]` = product of `nums[0..i-1]`.
2. **Right pass:** Build a suffix product array where `right[i]` = product of `nums[i+1..n-1]`.
3. **Combine:** `answer[i] = left[i] * right[i]`.

To achieve O(1) extra space (excluding the output array), you can build the left products into the answer array first, then multiply in the right products using a running variable.

```
nums:    [ 1,  2,  3,  4 ]

Left products (prefix product):
left[0] = 1 (nothing to the left)
left[1] = 1
left[2] = 1 * 2 = 2
left[3] = 1 * 2 * 3 = 6

left:    [ 1,  1,  2,  6 ]

Right products (suffix product):
right[3] = 1 (nothing to the right)
right[2] = 4
right[1] = 3 * 4 = 12
right[0] = 2 * 3 * 4 = 24

right:   [ 24, 12, 4,  1 ]

answer[i] = left[i] * right[i]:
answer:  [ 24, 12, 8,  6 ]  ✓
```

### C++

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, 1);

        // Left pass: answer[i] = product of all elements to the left of i
        int left_product = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = left_product;
            left_product *= nums[i];
        }

        // Right pass: multiply by product of all elements to the right of i
        int right_product = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= right_product;
            right_product *= nums[i];
        }

        return answer;
    }
};
```

### Python

```python
class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        answer = [1] * n

        # Left pass: answer[i] = product of all elements to the left of i
        left_product = 1
        for i in range(n):
            answer[i] = left_product
            left_product *= nums[i]

        # Right pass: multiply by product of all elements to the right of i
        right_product = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= right_product
            right_product *= nums[i]

        return answer
```

### Java

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, 1);

        // Left pass: answer[i] = product of all elements to the left of i
        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = leftProduct;
            leftProduct *= nums[i];
        }

        // Right pass: multiply by product of all elements to the right of i
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }

        return answer;
    }
}
```

### Complexity Analysis

- **Time:** O(n) — two linear passes
- **Space:** O(1) extra space — the output array doesn't count as extra space per the problem statement

</details>

---

## 📝 Problem 2: Group Anagrams (LeetCode #49)

**XP:** 100 | **Difficulty:** Medium | **Tests:** Frequency Counting + Hash Map Grouping

### Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.

### Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters

### Examples

```
Example 1:
Input:  strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

Example 2:
Input:  strs = [""]
Output: [[""]]

Example 3:
Input:  strs = ["a"]
Output: [["a"]]
```

### Why This Tests E-Rank Skills

This problem combines two fundamental E-Rank skills: character frequency counting (Day 3) and hash map usage for grouping (Day 4). You need to find a canonical representation of each anagram group — either by sorting or by frequency counting — and use it as a hash map key. It tests whether you can connect two patterns you learned separately into a single solution.

---

### ⏱ Attempt this problem for at least 20 minutes before revealing the solution.

---

<details>
<summary><strong>🔓 Reveal Solution Approach</strong></summary>

### Approach

Two words are anagrams if and only if they have the same character frequencies. You need a canonical key for each group.

**Option A — Sort each string:** Anagrams produce the same sorted string. Use the sorted string as a hash map key.
- Time: O(N × K log K) where K is max string length.

**Option B — Frequency count as key:** Build a frequency count of 26 characters. Use the tuple/array as a hash map key.
- Time: O(N × K) — no sorting needed.

Both are valid. Option B is more optimal and demonstrates deeper E-Rank mastery.

```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

Frequency keys:
  "eat" → (1,0,0,0,1,0,...,1,0,0,0,0,0)  — a:1, e:1, t:1
  "tea" → (1,0,0,0,1,0,...,1,0,0,0,0,0)  — same key!
  "ate" → (1,0,0,0,1,0,...,1,0,0,0,0,0)  — same key!

  "tan" → (1,0,0,0,0,0,...,1,0,0,1,0,0)  — a:1, n:1, t:1
  "nat" → (1,0,0,0,0,0,...,1,0,0,1,0,0)  — same key!

  "bat" → (1,1,0,0,0,0,...,1,0,0,0,0,0)  — a:1, b:1, t:1

Groups form naturally.
```

### C++

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Map: frequency signature → list of anagrams
        map<vector<int>, vector<string>> groups;

        for (const string& s : strs) {
            // Build frequency count as the key
            vector<int> freq(26, 0);
            for (char c : s) {
                freq[c - 'a']++;
            }
            groups[freq].push_back(s);
        }

        // Collect all groups
        vector<vector<string>> result;
        for (auto& [key, group] : groups) {
            result.push_back(group);
        }
        return result;
    }
};
```

### Python

```python
class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        # Map: frequency signature → list of anagrams
        groups = defaultdict(list)

        for s in strs:
            # Build frequency count as the key (tuple is hashable)
            freq = [0] * 26
            for c in s:
                freq[ord(c) - ord('a')] += 1
            groups[tuple(freq)].append(s)

        return list(groups.values())
```

### Java

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Map: frequency signature → list of anagrams
        Map<String, List<String>> groups = new HashMap<>();

        for (String s : strs) {
            // Build frequency count, convert to string key
            int[] freq = new int[26];
            for (char c : s.toCharArray()) {
                freq[c - 'a']++;
            }
            // Use Arrays.toString as a hashable key
            String key = Arrays.toString(freq);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }

        return new ArrayList<>(groups.values());
    }
}
```

### Complexity Analysis

- **Time:** O(N × K) where N = number of strings, K = max string length — building frequency counts is O(K) per string
- **Space:** O(N × K) — storing all strings in the hash map

</details>

---

## 📝 Problem 3: Contiguous Array (LeetCode #525)

**XP:** 100 | **Difficulty:** Medium | **Tests:** Prefix Sum + Hash Map Combo

### Problem Statement

Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of 0s and 1s.

### Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`

### Examples

```
Example 1:
Input:  nums = [0, 1]
Output: 2
Explanation: [0, 1] has equal 0s and 1s.

Example 2:
Input:  nums = [0, 1, 0]
Output: 2
Explanation: [0, 1] is the longest subarray with equal 0s and 1s.

Example 3:
Input:  nums = [0, 0, 1, 0, 0, 0, 1, 1]
Output: 6
Explanation: [0, 1, 0, 0, 1, 1] (indices 2-7) has 3 zeros and 3 ones.
```

### Why This Tests E-Rank Skills

This is the crown jewel of E-Rank. It requires you to:
1. **Transform the problem** — Replace 0s with -1s so "equal 0s and 1s" becomes "subarray sum = 0."
2. **Apply prefix sum + hash map** — The technique from Day 5, LeetCode #560.
3. **Adapt the pattern** — Instead of counting subarrays with sum K, find the longest one.

If you can solve this without hints, you have genuine E-Rank mastery. This problem tests not just technique, but the ability to reduce an unfamiliar problem to a known pattern — the defining skill of a strong competitive programmer.

---

### ⏱ Attempt this problem for at least 20 minutes before revealing the solution.

---

<details>
<summary><strong>🔓 Reveal Solution Approach</strong></summary>

### Approach

**The transformation insight:** Replace every `0` with `-1`. Now a subarray with equal 0s and 1s has a sum of 0.

The problem becomes: find the longest subarray with sum 0.

Using prefix sums: `prefix[j] - prefix[i] = 0` means `prefix[j] = prefix[i]`. So whenever two positions have the same prefix sum, the subarray between them has sum 0.

To find the **longest** such subarray, store the **first** occurrence of each prefix sum. When you see a prefix sum that's already in the map, the length is `current_index - first_occurrence`.

```
nums:          [ 0,  0,  1,  0,  0,  0,  1,  1 ]
transformed:   [-1, -1,  1, -1, -1, -1,  1,  1 ]

Running prefix sum:
┌──────────────────────────────────────────────────────┐
│ index:  -1   0   1   2   3   4   5   6   7          │
│ prefix:  0  -1  -2  -1  -2  -3  -4  -3  -2         │
│                                                      │
│ First time we see prefix = 0: index -1               │
│ First time we see prefix = -1: index 0               │
│ First time we see prefix = -2: index 1               │
│                                                      │
│ At index 2: prefix = -1, first seen at index 0       │
│   → length = 2 - 0 = 2                              │
│ At index 3: prefix = -2, first seen at index 1       │
│   → length = 3 - 1 = 2                              │
│ At index 7: prefix = -2, first seen at index 1       │
│   → length = 7 - 1 = 6  ← MAXIMUM                  │
└──────────────────────────────────────────────────────┘

Answer: 6 (subarray from index 2 to 7)
```

### C++

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        // Map: prefix_sum → first index where this sum occurred
        unordered_map<int, int> first_seen;
        first_seen[0] = -1;  // prefix sum 0 occurs "before" the array

        int prefix_sum = 0;
        int max_len = 0;

        for (int i = 0; i < nums.size(); i++) {
            // Transform: treat 0 as -1
            prefix_sum += (nums[i] == 1) ? 1 : -1;

            if (first_seen.count(prefix_sum)) {
                // Same prefix sum seen before → subarray between has sum 0
                max_len = max(max_len, i - first_seen[prefix_sum]);
            } else {
                // Record first occurrence only (we want longest subarray)
                first_seen[prefix_sum] = i;
            }
        }

        return max_len;
    }
};
```

### Python

```python
class Solution:
    def findMaxLength(self, nums: list[int]) -> int:
        # Map: prefix_sum → first index where this sum occurred
        first_seen = {0: -1}  # prefix sum 0 occurs "before" the array

        prefix_sum = 0
        max_len = 0

        for i, num in enumerate(nums):
            # Transform: treat 0 as -1
            prefix_sum += 1 if num == 1 else -1

            if prefix_sum in first_seen:
                # Same prefix sum seen before → subarray between has sum 0
                max_len = max(max_len, i - first_seen[prefix_sum])
            else:
                # Record first occurrence only (we want longest subarray)
                first_seen[prefix_sum] = i

        return max_len
```

### Java

```java
class Solution {
    public int findMaxLength(int[] nums) {
        // Map: prefix_sum → first index where this sum occurred
        Map<Integer, Integer> firstSeen = new HashMap<>();
        firstSeen.put(0, -1);  // prefix sum 0 occurs "before" the array

        int prefixSum = 0;
        int maxLen = 0;

        for (int i = 0; i < nums.length; i++) {
            // Transform: treat 0 as -1
            prefixSum += (nums[i] == 1) ? 1 : -1;

            if (firstSeen.containsKey(prefixSum)) {
                // Same prefix sum seen before → subarray between has sum 0
                maxLen = Math.max(maxLen, i - firstSeen.get(prefixSum));
            } else {
                // Record first occurrence only (we want longest subarray)
                firstSeen.put(prefixSum, i);
            }
        }

        return maxLen;
    }
}
```

### Complexity Analysis

- **Time:** O(n) — single pass through the array
- **Space:** O(n) — hash map stores at most n+1 distinct prefix sums

</details>

---

## 🏁 Scoring

| Result | Verdict |
|--------|---------|
| 3/3 solved | **Perfect score.** You're ready for D-Rank. No hesitation. |
| 2/3 solved | **Pass.** You can advance to D-Rank. Revisit the problem you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, then retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 1-5 with focus. Speed comes from understanding, not rushing. |

---

## 🎯 Self-Assessment

After completing the test, answer these honestly:

1. **Did you recognize the pattern before coding?** If you started coding without a clear approach, you need more pattern recognition practice.

2. **Did you handle edge cases?** Empty arrays, single elements, all zeros, all ones — did you think about these?

3. **Could you explain your solution to someone?** If you can solve it but can't articulate why it works, your understanding has gaps.

4. **How was your time?** Under 60 minutes for all 3 = strong. Under 90 = passing. Over 90 = more practice needed.

> Your honest self-assessment matters more than the score. The goal isn't to pass a test — it's to build a foundation strong enough that D-Rank problems feel like natural extensions of what you already know.

---

> **E-Rank Test Complete.** If you passed, proceed to the [E-Rank Completion](rank-e-complete.md) page to claim your rank-up.
