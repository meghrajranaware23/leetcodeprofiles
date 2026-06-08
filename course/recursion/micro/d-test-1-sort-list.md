# ⚔ D-Rank Test — Problem 1

> [Sort List #148](https://leetcode.com/problems/sort-list/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Sort List on LeetCode](https://leetcode.com/problems/sort-list/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Sort List #148](https://leetcode.com/problems/sort-list/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    ListNode* merge(ListNode* a, ListNode* b) {
        ListNode dummy(0); ListNode* tail = &dummy;
        while (a && b) {
            if (a->val <= b->val) { tail->next = a; a = a->next; }
            else { tail->next = b; b = b->next; }
            tail = tail->next;
        }
        tail->next = a ? a : b;
        return dummy.next;
    }
    pair<ListNode*,ListNode*> split(ListNode* head) {
        ListNode* slow = head; ListNode* fast = head; ListNode* prev = nullptr;
        while (fast && fast->next) { prev = slow; slow = slow->next; fast = fast->next->next; }
        if (prev) prev->next = nullptr;
        return {head, slow};
    }
    ListNode* sort(ListNode* head) {
        if (!head || !head->next) return head;
        auto [left, right] = split(head);
        return merge(sort(left), sort(right));
    }
public:
    ListNode* sortList(ListNode* head) { return sort(head); }
};
```

### Python
```python
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        slow, fast, prev = head, head, None
        while fast and fast.next:
            prev, slow = slow, slow.next
            fast = fast.next.next
        prev.next = None
        return self.merge(self.sortList(head), self.sortList(slow))
    def merge(self, a, b):
        dummy = ListNode(0); tail = dummy
        while a and b:
            if a.val <= b.val: tail.next, a = a, a.next
            else: tail.next, b = b, b.next
            tail = tail.next
        tail.next = a or b
        return dummy.next
```

### Java
```java
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow; slow = slow.next; fast = fast.next.next;
        }
        prev.next = null;
        return merge(sortList(head), sortList(slow));
    }
    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}
```

**Complexity:** O(n log n) time · O(log n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
