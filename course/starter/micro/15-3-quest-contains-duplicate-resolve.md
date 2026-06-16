<!-- hand-authored -->
# ⚔ Quest: Contains Duplicate (Re-solve)

> **Day 15** · [Contains Duplicate #217](https://leetcode.com/problems/contains-duplicate/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/contains-duplicate/)**

> ⚔ **Growth proof** — you solved this on **Day 5**. Compare honestly.

---

## Growth Rubric (Day 5 vs Today)

| Check | Your Day 5 | Today |
|-------|------------|-------|
| Approach | | |
| Minutes to AC | | |
| Hints used? | | |
| Cleaner code? | | |

---

## The Problem

Return `true` if any value appears at least twice.

**Example:** `[1,2,3,1]` → `true`

---

## 💡 Hints

1. You know this problem — **no hints until 5 min** unless stuck same as Day 5
2. Set scan: O(n) one pass
3. Journal one sentence: what improved since Day 5?

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

- *"Faster than Day 5 — that's measurable growth."*
- *"Same bug as Day 5? That's the one to journal."*

> 🎯 **Skill practiced:** Growth Proof

---

*Two quests down. Move to today's checkpoint. →*
