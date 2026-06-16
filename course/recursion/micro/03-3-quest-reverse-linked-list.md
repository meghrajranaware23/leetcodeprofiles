<!-- hand-authored -->
# ⚔ Quest: Reverse Linked List

> **Day 3** · [Reverse Linked List #206](https://leetcode.com/problems/reverse-linked-list/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reverse Linked List on LeetCode](https://leetcode.com/problems/reverse-linked-list/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw arrows. On each return from the stack, mark which pointer gets flipped. The hints below are for *after* your attempt.

---

## The Problem

Given the head of a singly linked list, reverse the list and return the new head.

```
Input:  1 → 2 → 3 → 4 → 5 → null
Output: 5 → 4 → 3 → 2 → 1 → null
```

---

## 💡 Hints

Which pattern from today's concept applies? **Pointer rewire recursion** — recurse to the tail first, then fix one backward link on the way up.

If you're stuck after 5 minutes: base case is one node (or empty). Save `newHead = reverse(head.next)`, then set `head.next.next = head` and `head.next = null`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Pointer Rewire Recursion (Reverse on Unwind)

**How to identify this from the problem statement:**
- "Reverse" a **linked list** in-place → change `.next` directions, not values
- Single chain → recurse on `head.next`; combine step runs **after** the sub-call returns
- "Return new head" → new head is the old tail, bubbled up from the deepest base case

| Keyword / phrase | What it signals |
|---|---|
| "reverse linked list" | Recurse to end, rewire one pointer per frame |
| "in-place" | Mutate `.next`; no new nodes |
| "return head" | Deepest node becomes new head; pass it back unchanged |
| "recursively" | Work happens on **return**, not before the call |

**Why this pattern works:** The tail of the original list becomes the head of the reversed list. Every node on the unwind makes its former `next` point back to itself.

**How a strong solver thinks before coding:**
1. *"Base: null or single node → return head."*
2. *"Recurse first — `newHead = reverse(head.next)`."*
3. *"Rewire: `head.next.next = head`, then `head.next = null`."*
4. *"Return `newHead`, not `head` — head moved to the middle/end."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy values to array, reverse array, copy back** | O(n) space; doesn't practice pointer manipulation |
| **Build new list with push-front loop** | Works iteratively, but extra nodes if you're not careful |
| **Rewire before recursive call** | You haven't reached the tail yet — links break mid-list |
| **Return `head` instead of `newHead`** | You return the old head (now the tail), wrong answer |

**The insight brute force misses:** Reversal is **one pointer flip per node**, done on the way **up** the stack. The recursive call fully reverses the tail before you touch your single link.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Reverse Linked List II #92](https://leetcode.com/problems/reverse-linked-list-ii/) | Reverse a subrange | Rewire segment; connect boundaries |
| [Swap Nodes in Pairs #24](https://leetcode.com/problems/swap-nodes-in-pairs/) | Swap adjacent pairs | Recurse + two pointer flips per frame |
| [K Reverse (hard variants)](https://leetcode.com/problems/reverse-nodes-in-k-group/) | Reverse k at a time | Chunk + same rewire template |

The iterative three-pointer version (`prev`, `curr`, `next`) is equivalent — recursion just stores `prev` implicitly in the call stack.

---

## 📖 Walkthrough

**Recurse down to the last node, rewire on the way back.**

```
Original: 1 → 2 → 3 → null

── GO DOWN ──
reverse(1):  call reverse(2)
reverse(2):  call reverse(3)
reverse(3):  call reverse(null)
reverse(null): BASE → return null

── COME UP ──
reverse(3):  newHead = null... wait, 3.next is null
             Base: 3 has no next → return 3  (newHead = 3)

reverse(2):  newHead = reverse(3) = 3
             2.next is 3, so 3.next = 2     →  3 → 2
             2.next = null                   →  3 → 2 → null
             return 3

reverse(1):  newHead = 3
             1.next is 2, so 2.next = 1     →  3 → 2 → 1
             1.next = null                   →  3 → 2 → 1 → null
             return 3  ✓
```

Pointer picture at the `reverse(2)` frame:

```
Before rewire:   3 → null     (2 → 3, about to fix)
After rewire:    3 → 2 → null  (1 still → 2, fixed on next frame)
```

> 💡 **The insight:** `head.next.next = head` makes the former next node point backward. `head.next = null` prevents cycles. Always return `newHead` from the deepest node.

---

## Solution

### C++
```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
```

### Python
```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head
```

### Java
```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Reverse linked list recursively"** → Work on unwind, not before the call.
- **"Base: one node"** → That node is already the reversed tail; it's the new head.
- **"Flip one link"** → `next.next = me`, then `me.next = null`.
- **"Merge was pick-min going down; reverse is rewire coming up"** → Same shrink-by-`next`, different combine step.

If you tried iterative `prev/curr/next` first, map each iteration to one stack frame — same logic, different storage.

> 🎯 **Pattern Unlocked:** Pointer rewire on return — trust the reversed tail, then fix one backward link.

---

*Both quests complete. Head to the checkpoint. →*
