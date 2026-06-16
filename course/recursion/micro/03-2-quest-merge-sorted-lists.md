<!-- hand-authored -->
# ⚔ Quest: Merge Two Sorted Lists

> **Day 3** · [Merge Two Sorted Lists #21](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Merge Two Sorted Lists on LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw two list heads and ask at each step: *"Which node wins?"* The hints below are for *after* your attempt.

---

## The Problem

Merge two sorted linked lists into one sorted list. Return the head of the merged list.

Both lists are sorted in **non-decreasing** order.

```
Input:  l1 = 1→2→4,  l2 = 1→3→4
Output: 1→1→2→3→4→4
```

---

## 💡 Hints

Which pattern from today's concept applies? **Index-based recursion** — one comparison per node, then recurse on the tail.

If you're stuck after 5 minutes: handle empty lists first. Then compare `l1.val` and `l2.val`, attach the smaller node to the result of merging the rest.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Pick-Minimum Head Recursion (List Merge)

**How to identify this from the problem statement:**
- Two **sorted linked lists** → local decision at each head is enough; tails stay sorted
- "Merge" → combine two substructures of the same shape
- Return **head of new list** → recursive call returns the merged tail; you link your winner to it

| Keyword / phrase | What it signals |
|---|---|
| "merge two sorted lists" | Compare heads, recurse on remainder |
| "linked list" + "sorted" | Greedy pick-min at each frame |
| "return the head" | Winning node stays; `.next` = recursive result |
| "recursively" / "without iteration" | Base when either list is `null` |

**Why this pattern works:** Sorted order guarantees the globally smallest unmerged node is always one of the two current heads. Pick it, delegate the rest.

**How a strong solver thinks before coding:**
1. *"Base: if l1 or l2 is null, return the other."*
2. *"Smaller head wins — set its `.next` to merge(tails)."*
3. *"Return the winning head — that's the head of this subproblem."*
4. *"Trace pick-min on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy both lists to arrays, merge, rebuild** | O(n) extra space; ignores list structure |
| **Nested loops comparing every pair** | O(n·m) — sorted order already tells you the answer |
| **Iterative with dummy node only (no understanding)** | Works, but you miss the recursive template used on trees later |
| **Advance both pointers without attaching** | Orphan nodes — you must set `.next` to the sub-result |

**The insight brute force misses:** At every step there are only **two candidates** for the next node. Recursion makes that decision explicit: pick min, trust the tail.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Merge k Sorted Lists #23](https://leetcode.com/problems/merge-k-sorted-lists/) | k lists, divide-and-conquer | Repeated pick-min / merge pairs |
| [Merge Two Sorted Lists (iterative)](https://leetcode.com/problems/merge-two-sorted-lists/) | Dummy head + while loop | Same compare-and-advance logic |
| [Add Two Numbers #2](https://leetcode.com/problems/add-two-numbers/) | Sum + carry instead of min | Base on both null; combine digit + carry |

If you recognized merge, you already have the skeleton for any "two sorted sequences, one decision per step" problem.

---

## 📖 Walkthrough

**Pick-min at each frame.** The smaller head becomes the next node in the answer; its `.next` points to the merged remainder.

```
l1: 1 → 2 → 4
l2: 1 → 3 → 4

Frame 1: merge(1→2→4, 1→3→4)
         1 ≤ 1 → pick l1's 1
         1.next = merge(2→4, 1→3→4)  ← trust this

Frame 2: merge(2→4, 1→3→4)
         1 < 2 → pick l2's 1
         1.next = merge(2→4, 3→4)

Frame 3: merge(2→4, 3→4)
         2 < 3 → pick l1's 2
         2.next = merge(4, 3→4)

Frame 4: merge(4, 3→4)
         3 < 4 → pick l2's 3
         3.next = merge(4, 4)

Frame 5: merge(4, 4)
         4 ≤ 4 → pick l1's 4
         4.next = merge(null, 4)

Frame 6: merge(null, 4)
         BASE → return 4→

Unwind:
  merge(4,4)   → 4→4→
  merge(4,3→4) → 3→4→4→
  merge(2→4,…) → 2→3→4→4→
  merge(…,1→3→4) → 1→2→3→4→4→
  merge(1→2→4,…) → 1→1→2→3→4→4→  ✓
```

> 💡 **The insight:** You never re-sort. Each frame removes one node from the pool. When one list runs out, the base case appends the rest in one return.

---

## Solution

### C++
```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2;
        if (!l2) return l1;
        if (l1->val <= l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        }
        l2->next = mergeTwoLists(l1, l2->next);
        return l2;
    }
};
```

### Python
```python
class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        if not l1: return l2
        if not l2: return l1
        if l1.val <= l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        l2.next = self.mergeTwoLists(l1, l2.next)
        return l2
```

### Java
```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        if (l1.val <= l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        }
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}
```

**Complexity:** O(n + m) time · O(n + m) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two sorted lists"** → Only two heads matter; pick the smaller.
- **"Empty list base case"** → `null` means "return the other list as-is."
- **"Attach then return"** → `winner.next = merge(rest)`; return `winner`.
- **"Same as merge step in merge sort"** → One decision per node, trust the tail.

If you tried building a new list with a dummy node first, that's fine — the breakthrough is seeing **pick-min + recurse on remainder** as the list version of shrinking an index.

> 🎯 **Pattern Unlocked:** Pick-min head recursion — compare two fronts, link the winner to the merged tail.

---

*One quest down. Next: reverse a list by rewiring pointers on the way back up. →*
