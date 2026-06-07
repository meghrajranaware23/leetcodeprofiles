# ⚔ Quest: Find the Duplicate Number

> **Day 8** · [Find the Duplicate Number #287](https://leetcode.com/problems/find-the-duplicate-number/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find the Duplicate Number on LeetCode](https://leetcode.com/problems/find-the-duplicate-number/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive, there is **only one repeated number**, which may appear more than once.

Return the duplicate number. Constraints:
- You must solve it **without modifying** the array
- Use **O(1)** extra space
- Expected time complexity less than O(n²)

```
Input:  nums = [1, 3, 4, 2, 2]
Output: 2

Input:  nums = [3, 1, 3, 4, 2]
Output: 3
```

---

## 💡 Hints

Binary search on the value range works — but the pointer pattern is stronger: treat the array as a **linked list** where index `i` points to index `nums[i]`.

Pigeonhole principle: n+1 values in [1, n] → duplicate → cycle. Use **Floyd's algorithm** — Phase 1 finds a meeting point inside the cycle; Phase 2 finds the cycle entrance (the duplicate).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fast & Slow Pointers — Floyd's Cycle Detection (Array-as-Graph)

**How to identify this from the problem statement:**
- "n+1 integers in range [1, n]" → pigeonhole → duplicate guaranteed
- "O(1) space, don't modify array" → rules out sort, hash set, marking
- "find duplicate" + index jumps → `i → nums[i]` is a functional graph with a cycle

| Keyword / phrase | What it signals |
|---|---|
| "duplicate in [1, n], n+1 elements" | Array-as-linked-list + Floyd |
| "O(1) space" / "don't modify" | Pointer chase, not hash set |
| "each integer in range [1, n]" | Valid index jumps — nums[i] always in bounds as index... wait, nums[i] can be n, indices are 0..n, so nums[i] in [1,n] works as index since max index is n |
| less than O(n²) | Floyd is O(n) |

**Why this pattern works:** Each index has exactly one outgoing edge to `nums[i]`. With n+1 nodes and n+1 values but only n distinct values, two indices share the same target → cycle forms. Floyd's Phase 2 entrance equals the duplicate value.

**How a strong solver thinks before coding:**
1. *"n+1 slots, n possible values → duplicate → cycle in index graph."*
2. *"Treat nums[i] as next pointer: node i → node nums[i]."*
3. *"Floyd Phase 1: meet inside cycle. Phase 2: find entrance = duplicate."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops comparing pairs** | O(n²) — violates time constraint |
| **Sort the array** | Modifies array — violates constraint |
| **Hash set of seen values** | O(n) space — violates constraint |
| **Mark nums[i] negative** | Modifies array — not allowed |

**The insight brute force misses:** The duplicate isn't just a value problem — it's a **graph problem**. Reframing `nums` as edge list `i → nums[i]` turns "find duplicate" into "find cycle entrance" — solvable with O(1) space.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Linked List Cycle II #142](https://leetcode.com/problems/linked-list-cycle-ii/) | Explicit list, find cycle start | Identical Floyd Phase 2 |
| [Happy Number #202](https://leetcode.com/problems/happy-number/) | Implicit sequence, not array | Floyd on transformed state |
| [Circular Array Loop #457](https://leetcode.com/problems/circular-array-loop/) | Must move forward, cycle length > 1 | Floyd + direction/length checks |

Find the Duplicate is the canonical **array-as-linked-list** problem — the one that cements the graph reframe.

---

## 📖 Walkthrough

`nums = [1, 3, 4, 2, 2]` — indices 0..4, values are next-index jumps:

```
Edges: 0→1  1→3  2→4  3→2  4→2

Graph:
  0 ──→ 1 ──→ 3 ──→ 2 ──→ 4
              ↑         │
              └──── 2 ←─┘   (cycle: 2 → 4 → 2)

Phase 1 — find meeting point:
  slow: start nums[0]=1 → nums[1]=3 → nums[3]=2 → nums[2]=4 → nums[4]=2 ...
  fast: start nums[nums[0]]=3 → nums[4]=2 → nums[2]=4 → nums[4]=2 ...
  slow == fast at index 2 (value 2)

Phase 2 — find cycle entrance:
  Reset slow to nums[0]=1, keep fast at meeting point (2)
  slow: 1 → 3 → 2
  fast: 2 → 4 → 2
  slow: 3 → 2
  fast: 4 → 2
  slow == fast at 2 → duplicate is 2 ✓
```

> 💡 **The insight:** Phase 2 works because the distance from head to cycle entrance equals the distance from meeting point to entrance (measured in steps within the cycle structure).

---

## Solution

### C++
```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0], fast = nums[0];

        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
```

### Python
```python
class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        slow = fast = nums[0]

        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]

        return slow
```

### Java
```java
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];

        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

- **"n+1 values in [1, n], find duplicate, O(1) space"** → Array is a linked list; duplicate = cycle entrance.
- **"Don't modify array"** → No sort, no marking. Pointer chase only.
- **"Two phases of Floyd"** → Phase 1: meet in cycle. Phase 2: reset one pointer to head, walk both at same speed to entrance.

If you tried binary search on [1, n] first, that also works — but the **fast/slow graph reframe** is the pattern this rank teaches.

> 🎯 **Pattern Unlocked:** Array-as-linked-list. Index `i` jumps to `nums[i]`. Floyd finds the duplicate at the cycle entrance.

---

*Two quests down. Checkpoint — transfer fast/slow to problems you haven't seen. →*
