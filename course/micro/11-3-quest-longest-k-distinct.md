# ⚔ Quest: Longest Substring with At Most K Distinct Characters

> **Day 11** · [Longest Substring with At Most K Distinct Characters #340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) · Medium · 25 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Substring with At Most K Distinct Characters on LeetCode](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string `s` and an integer `k`, return the length of the **longest substring** that contains **at most `k` distinct** characters.

```
Input:  s = "eceba", k = 2
Output: 3
        ("ece")

Input:  s = "aa", k = 1
Output: 2
        ("aa")

Input:  s = "aabbcc", k = 1
Output: 2
        ("aa" or "bb" or "cc")
```

Note: This is a LeetCode Premium problem. The same pattern appears in [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) (at most 2 distinct) and [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) (budget variant).

---

## 💡 Hints

This is a **variable sliding window** with a **frequency map** as window state — the C-Rank upgrade from Day 10's hash set.

Expand `right` and add `s[right]` to the map. When `len(map) > k`, shrink from the left until at most k distinct characters remain. Track maximum window length.

**Critical:** When decrementing a count to zero, **remove the key** from the map. Otherwise `len(map)` overcounts distinct characters.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Variable Sliding Window + Hash Map (Distinct Budget)

**How to identify this from the problem statement:**
- "longest substring" → variable window, maximize length
- "at most k distinct" → budget on unique character types
- shrink **when invalid** (distinct > k), not while valid

| Keyword / phrase | What it signals |
|---|---|
| "longest substring" / "maximum length" | Variable window, track max |
| "at most k distinct" / "at most two types" | `len(map) ≤ k` validity check |
| "contiguous characters" | Two pointers, not sorting |
| "fruit into baskets" (k = 2) | Same pattern, different story |

**Why this pattern works:** The map holds exact counts for `[left..right]`. Distinct count = number of keys (with zero-count keys removed). Expand until budget breaks, shrink until valid, record max length at each valid state.

**How a strong solver thinks before coding:**
1. *"Longest + at most k distinct → variable window + map."*
2. *"Distinct = len(map). Shrink when len(map) > k."*
3. *"Erase key when count hits zero — same rule as today's concept."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring [i..j], count distinct with a set** | O(n² × alphabet) — too slow for n = 10⁵ |
| **Sliding window without removing zero-count keys** | `len(map)` stays inflated → never shrinks correctly |
| **Hash set instead of map** | Can't distinguish "one 'a'" from "three 'a's" — but more importantly, set size ≠ distinct when you forget to remove |
| **Fixed window** | Optimal length is unknown — window must grow and shrink |

**The insight brute force misses:** Only `s[right]` enters and `s[left]` exits per step. Maintain distinct count incrementally — O(1) per pointer move.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Substring with At Most K Distinct #340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | General k | Window + map, shrink when distinct > k |
| [Fruit Into Baskets #904](https://leetcode.com/problems/fruit-into-baskets/) | k = 2, array not string | Identical skeleton |
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Budget on replacements, not distinct | Window + frequency, different validity formula |
| [Subarrays with K Different Integers #992](https://leetcode.com/problems/subarrays-with-k-different-integers/) | Exactly k distinct | Window + map with count-of-windows trick (Hard) |

Fruit Into Baskets (#904) is this exact problem with `k = 2` and an array instead of a string.

---

## 📖 Walkthrough

```
s = "eceba",  k = 2

right=0 'e': map={e:1}           distinct=1  len=1  max=1
right=1 'c': map={e:1,c:1}       distinct=2  len=2  max=2
right=2 'e': map={e:2,c:1}       distinct=2  len=3  max=3
right=3 'b': map={e:2,c:1,b:1}   distinct=3  → INVALID (> 2), shrink
  left=1 remove 'e': map={e:1,c:1,b:1}  distinct=3  shrink
  left=2 remove 'c': map={e:1,b:1}      distinct=2  len=2  max=3
right=4 'a': map={e:1,b:1,a:1}   distinct=3  → shrink
  left=3 remove 'b': map={e:1,a:1}      distinct=2  len=2  max=3

max = 3  ("ece") ✓
```

```
s = "aa",  k = 1

right=0 'a': map={a:1}  distinct=1  len=1  max=1
right=1 'a': map={a:2}  distinct=1  len=2  max=2

max = 2 ✓
```

> 💡 **The insight:** Longest valid window → shrink **when invalid** (distinct > k). Same shrink direction as Longest Substring Without Repeating Characters (Day 10), but validity uses map size instead of set membership.

---

## Solution

### C++
```cpp
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        if (k == 0) return 0;

        unordered_map<char, int> freq;
        int left = 0, maxLen = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            freq[s[right]]++;                              // EXPAND

            while ((int)freq.size() > k) {                 // SHRINK when invalid
                freq[s[left]]--;
                if (freq[s[left]] == 0) freq.erase(s[left]);
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
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        if k == 0:
            return 0

        freq = {}
        left = max_len = 0

        for right in range(len(s)):
            freq[s[right]] = freq.get(s[right], 0) + 1   # EXPAND

            while len(freq) > k:                            # SHRINK when invalid
                freq[s[left]] -= 1
                if freq[s[left]] == 0:
                    del freq[s[left]]
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
```

### Java
```java
class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (k == 0) return 0;

        Map<Character, Integer> freq = new HashMap<>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            freq.merge(s.charAt(right), 1, Integer::sum);  // EXPAND

            while (freq.size() > k) {                      // SHRINK when invalid
                char c = s.charAt(left);
                freq.put(c, freq.get(c) - 1);
                if (freq.get(c) == 0) freq.remove(c);
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

**Complexity:** O(n) time · O(k) space (at most k+1 keys in map)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Longest substring, at most k distinct"** → Variable window + hash map. Day 10 skeleton, Day 11 state.
- **"Distinct"** → Count keys in map, not values. Erase at zero.
- **Shrink when invalid** → Opposite of Minimum Subarray Sum (Day 10). Same as Longest Substring Without Repeating.
- **Fruit Into Baskets** → Same pattern with k = 2 — if you've seen #904, you already know this.

If you counted distinct characters by scanning the whole window each step, you found O(n²). The signal was "at most k distinct" — map tracks the inventory, pointers do the rest.

> 🎯 **Pattern Combo Mastered:** Variable window + frequency map for budget constraints. The map replaces the set whenever counts or distinct types matter.

---

*Next: checkpoint — prove the window + map instinct is yours. →*
