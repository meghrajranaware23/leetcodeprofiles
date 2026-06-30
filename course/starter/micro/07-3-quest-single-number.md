<!-- hand-authored -->
# ⚔ Quest: Single Number

> **Day 7** · [Single Number #136](https://leetcode.com/problems/single-number/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Single Number on LeetCode](https://leetcode.com/problems/single-number/)**

> ⚔ **Mentor's rule:** Try hash-set brute force first — print set contents on `[2,2,1]` before hints.

---

## The Problem

Every element appears twice except one. Find that one.

**Example 1:** `[2,2,1]` → `1`

**Example 2:** `[4,1,2,1,2]` → `4`

**Constraints:** Linear runtime; try hash set brute force first for debugging practice

---

## 💡 Hints

1. Brute: hash set — add if absent, remove if present; last remaining wins
2. XOR: `a^a=0`, `a^0=a` — cancel pairs automatically
3. Debug with print on `[2,2,1]` — watch set size

---

## Solution

### C++
```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int x = 0;
        for (int n : nums) x ^= n;
        return x;
    }
};
```

### Python
```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        x = 0
        for n in nums: x ^= n
        return x
```

### Java
```java
class Solution {
    public int singleNumber(int[] nums) {
        int x = 0;
        for (int n : nums) x ^= n;
        return x;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Hash set brute force taught the problem; XOR is the editorial upgrade."*
- *"Debug protocol: reproduce on Example 1 before changing approach."*
- *"Pairs cancel — XOR is just the compact version of add/remove from set."*

> 🎯 **Skill practiced:** Isolate & Fix

---

*Two quests down. Move to today's checkpoint. →*
