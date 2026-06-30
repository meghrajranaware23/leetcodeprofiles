# ⚔ Quest: Fruit Into Baskets

> **Day 11** · [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) · Medium · 25 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Fruit Into Baskets on LeetCode](https://leetcode.com/problems/fruit-into-baskets/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are visiting a farm with a row of fruit trees. Each tree produces one type of fruit (represented as an integer). You have **two baskets**, and each basket can only hold **one type** of fruit.

Starting from any tree, you pick exactly one fruit per tree moving right. You stop when you encounter a third type that won't fit in either basket.

Return the **maximum number of fruits** you can pick.

```
Input:  fruits = [1,2,1]
Output: 3
        (Pick all — types {1,2} fit in 2 baskets)

Input:  fruits = [0,1,2,2]
Output: 3
        (Pick [1,2,2] — types {1,2}. Starting at [0,1,2,2] would need 3 baskets)

Input:  fruits = [1,2,3,2,2]
Output: 4
        (Pick [2,3,2,2] — types {2,3})
```

This is the **distinct-budget pattern with k = 2** — longest contiguous subarray with at most 2 distinct values. Same skeleton as "at most k distinct characters," but on an integer array.

---

## 💡 Hints

This is a **variable sliding window** with a **frequency map** as window state — the C-Rank upgrade from Day 10's hash set.

Expand `right` and add `fruits[right]` to the map. When `len(map) > 2`, shrink from the left until at most 2 fruit types remain. Track maximum window length.

**Critical:** When decrementing a count to zero, **remove the key** from the map. Otherwise `len(map)` overcounts distinct types.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Variable Sliding Window + Hash Map (Distinct Budget, k = 2)

**How to identify this from the problem statement:**
- "maximum number of fruits" → variable window, maximize length
- "two baskets" / "two types" → budget on distinct types (`len(map) ≤ 2`)
- shrink **when invalid** (distinct > 2), not while valid

| Keyword / phrase | What it signals |
|---|---|
| "maximum fruits" / "longest subarray" | Variable window, track max |
| "two baskets" / "at most two types" | `len(map) ≤ 2` validity check |
| "contiguous" / "moving right" | Two pointers, not sorting |
| "stop when third type" | Shrink when `len(map) > 2` |

**Why this pattern works:** The map holds exact counts for `[left..right]`. Distinct count = number of keys (with zero-count keys removed). Expand until budget breaks, shrink until valid, record max length at each valid state.

**How a strong solver thinks before coding:**
1. *"Maximum contiguous + at most 2 types → variable window + map."*
2. *"Distinct = len(map). Shrink when len(map) > 2."*
3. *"Erase key when count hits zero — same rule as today's concept."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray [i..j], count distinct with a set** | O(n²) — too slow for n = 10⁵ |
| **Sliding window without removing zero-count keys** | `len(map)` stays inflated → never shrinks correctly |
| **Hash set instead of map** | Can't track when a type fully exits the window |
| **Fixed window** | Optimal length is unknown — window must grow and shrink |

**The insight brute force misses:** Only `fruits[right]` enters and `fruits[left]` exits per step. Maintain distinct count incrementally — O(1) per pointer move.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Budget on replacements, not distinct types | Window + frequency map, different validity formula |
| [Subarrays with K Different Integers #992](https://leetcode.com/problems/subarrays-with-k-different-integers/) | Exactly k distinct (count trick) | Window + map with atMost(k) − atMost(k−1) |
| [Longest Substring Without Repeating Characters #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | All unique (k = alphabet) | Day 10 — same variable window, set instead of map |

The distinct-budget skeleton is the same across all of these — only the **validity rule** and **answer aggregation** change.

---

## 📖 Walkthrough

```
fruits = [1,2,3,2,2],  baskets = 2

right=0  1: map={1:1}         distinct=1  len=1  max=1
right=1  2: map={1:1,2:1}     distinct=2  len=2  max=2
right=2  3: map={1:1,2:1,3:1} distinct=3  → INVALID (> 2), shrink
  left=0 remove 1: map={2:1,3:1}    count[1]=0 → erase key
                                     distinct=2  len=2  max=2
right=3  2: map={2:2,3:1}     distinct=2  len=3  max=3
right=4  2: map={2:3,3:1}     distinct=2  len=4  max=4

max = 4  ([2,3,2,2]) ✓
```

```
fruits = [0,1,2,2],  baskets = 2

right=0  0: map={0:1}         distinct=1  len=1  max=1
right=1  1: map={0:1,1:1}     distinct=2  len=2  max=2
right=2  2: map={0:1,1:1,2:1} distinct=3  → INVALID, shrink
  left=0 remove 0: map={1:1,2:1}    count[0]=0 → erase key
                                     distinct=2  len=2  max=2
right=3  2: map={1:1,2:2}     distinct=2  len=3  max=3

max = 3  ([1,2,2]) ✓
```

> 💡 **The insight:** Longest valid window → shrink **when invalid** (distinct > 2). Same shrink direction as Longest Substring Without Repeating Characters (Day 10), but validity uses map size instead of set membership.

---

## Solution

### C++
```cpp
class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> freq;
        int left = 0, maxLen = 0;

        for (int right = 0; right < (int)fruits.size(); right++) {
            freq[fruits[right]]++;                         // EXPAND

            while ((int)freq.size() > 2) {                 // SHRINK when invalid
                freq[fruits[left]]--;
                if (freq[fruits[left]] == 0) freq.erase(fruits[left]);
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

### Python
```python
class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        freq = {}
        left = max_len = 0

        for right in range(len(fruits)):
            freq[fruits[right]] = freq.get(fruits[right], 0) + 1  # EXPAND

            while len(freq) > 2:                                   # SHRINK when invalid
                freq[fruits[left]] -= 1
                if freq[fruits[left]] == 0:
                    del freq[fruits[left]]
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
```

### Java
```java
class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < fruits.length; right++) {
            freq.merge(fruits[right], 1, Integer::sum);    // EXPAND

            while (freq.size() > 2) {                      // SHRINK when invalid
                int f = fruits[left];
                freq.put(f, freq.get(f) - 1);
                if (freq.get(f) == 0) freq.remove(f);
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

**Complexity:** O(n) time · O(1) space (at most 3 keys in map during shrink)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Two baskets, maximum fruits"** → At most 2 distinct types → variable window + hash map. Day 10 skeleton, Day 11 state.
- **"Distinct"** → Count keys in map, not values. Erase at zero.
- **Shrink when invalid** → Opposite of Minimum Subarray Sum (Day 10). Same as Longest Substring Without Repeating.
- **"At most k distinct" generalization** → Replace `2` with `k` and you have the general template for any distinct-budget problem.

If you iterated every subarray counting distinct types, you found O(n²). The signal was "at most 2 types" — map tracks the inventory, pointers do the rest.

> 🎯 **Pattern Combo Mastered:** Variable window + frequency map for budget constraints. The map replaces the set whenever counts or distinct types matter.

---

*Next: checkpoint — prove the window + map instinct is yours. →*
