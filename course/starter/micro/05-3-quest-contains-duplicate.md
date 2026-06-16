<!-- hand-authored -->
# ⚔ Quest: Contains Duplicate

> **Day 5** · [Contains Duplicate #217](https://leetcode.com/problems/contains-duplicate/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Contains Duplicate on LeetCode](https://leetcode.com/problems/contains-duplicate/)**

> ⚔ Plan two approaches on paper: brute force pairs vs "have I seen this?"

---

## The Problem

Return `true` if any value appears at least twice.

**Example 1:** `[1,2,3,1]` → `true`

**Example 2:** `[1,2,3,4]` → `false`

**Example 3:** `[1,1,1,3,3,4,3,2,4,2]` → `true`

**Constraints:** `1 <= nums.length <= 10^5` — note n is large; O(n²) may TLE (plan both)

---

## 💡 Hints

1. Brute force: compare all pairs — works for small n, teaches the question
2. Better: hash set — if `n in seen`, return true; else add
3. Example 2 is the false case — don't return early on first element
4. **You'll re-solve this on Day 15** — note which approach you used today

---

## 📖 Walkthrough — Example 1

```
[1, 2, 3, 1]
seen: {}
1 → not seen → {1}
2 → {1,2}
3 → {1,2,3}
1 → SEEN → true
```

---

## Solution

### C++
```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for n in nums:
            if n in seen: return True
            seen.add(n)
        return False
```

### Java
```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"I planned on paper: pairs vs set — then coded the set."*
- *"Day 15 I'll re-solve this and compare my speed and approach."*

> 🎯 **Skill practiced:** Plan Before Optimize

---

*Two quests down. Move to today's checkpoint. →*
