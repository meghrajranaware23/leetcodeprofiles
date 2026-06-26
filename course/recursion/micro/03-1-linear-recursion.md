<!-- hand-authored -->
# 📝 Index-Based Recursion on Linked Lists

> **Day 3** · Index-Based Recursion · 10 XP · 10 min read

---

Days 1–2 taught you recursion on **indices** — shrink an array by moving `i` forward. Today the same idea moves to **linked lists**: shrink the problem by advancing to `node.next`.

The list has no `length` and no random access. Your "index" is simply **how many nodes remain** in the current sublist. Each recursive call owns one node and trusts the call on the tail.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Index-based recursion on linked lists** — treat the head as "position 0" and recurse on the rest of the list.

Every call answers one local question, then delegates the tail:

- **Base case** — empty list (`null` / `None`) or a single node
- **Recursive case** — do your one step on the current head, call on `head.next`, combine
- **Trust** — assume `solve(tail)` is correct; you only wire your node to that result

### 2. Simple explanation

Imagine a chain of people holding hands. You stand at the front. You make **one decision** (pick the smaller value, or rewire one pointer), then shout: *"Someone handle everyone behind me."* When they return the finished tail, you connect your node and hand the answer back.

You never simulate the whole list — only the current node and what the sub-call returns.

### 3. Visual walkthrough — shrinking the list

```
mergeTwoLists(1→4→5, 1→3→4):

CALL STACK (list shrinks left to right):
┌──────────────────────────────┐
│ merge(1→4→5, 1→3→4)          │  pick min head: 1 from l1
│   l1=1, l2=1                   │  recurse on l1.next
├──────────────────────────────┤
│ merge(4→5, 1→3→4)             │  pick 1 from l2
│   l1=4, l2=1                   │
├──────────────────────────────┤
│ merge(4→5, 3→4)                │  pick 3 from l2
├──────────────────────────────┤
│ merge(4→5, 4)                  │  pick 4 from l1
├──────────────────────────────┤
│ merge(5, 4)                    │  pick 4 from l2
├──────────────────────────────┤
│ merge(5, null)                 │  BASE → return 5→
└──────────────────────────────┘

RETURNS (rewire as we unwind):
merge(5, null) → 5→
merge(5, 4)    → 4→5→
merge(4→5, 4)  → 4→4→5→
...
final          → 1→1→3→4→4→5→
```

### 4. How the pattern works

```
function solve(head):
    if head is null:
        return base_answer
    tail_result = solve(head.next)   // trust this
    return combine(head, tail_result)
```

Two flavors you'll use today:

| Flavor | Your job on current node | Sub-call handles |
|---|---|---|
| **Pick & link** (merge) | Choose smaller head, set `.next` | Sorted merge of remainders |
| **Rewire** (reverse) | Point `next.next` back to you | Reversed tail + new head |

### 5. What problem does this solve?

| Problem family | How index-based list recursion helps |
|---|---|
| Merge sorted lists | One comparison per node; tail is already merged |
| Reverse linked list | Tail returns new head; you fix one backward link |
| Add two numbers (lists) | Carry propagates up from shorter tail |
| Palindrome list (with helper) | Compare front vs returned-from-tail |

### 6. Why brute force fails here

| Brute force | Problem |
|---|---|
| Copy list to array, recurse on indices | O(n) extra space; misses pointer skill |
| Iterative merge with dummy node only | Works, but hides the recursive structure you'll need on trees |
| Reverse by building a new list | O(n) space; in-place rewire is one line per frame |
| Loop without clear base case on `null` | Null pointer crashes or infinite recursion |

### 7. The key observation

**The recursive "index" on a linked list is `head.next`.** Each frame removes exactly one node from the subproblem. Empty list is the universal base case — same as `i == n` on an array.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "merge two sorted linked lists" | Pick min head, recurse on rest |
| "reverse linked list" | Recurse to tail, rewire one pointer on return |
| "linked list" + "recursion" | Shrink by `head.next`, base = `null` |
| "in-place" on a list | Combine step mutates pointers, not values |
| "return the head of…" | Return value may bubble from deep in the list |

**Keywords:** `ListNode` · `head.next` · `null` base · `return head`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting `null` base case | Always handle empty list first |
| Losing the returned head (reverse) | Save `newHead = reverse(head.next)` before rewiring |
| Creating cycles when reversing | Set `head.next = null` after `next.next = head` |
| Comparing after advancing wrong pointer | Pick winner first, then recurse on *that* list's `.next` |
| Assuming O(1) space | Recursion uses O(n) call stack — still valid for E-Rank |

### 10. Recognition drill

Read this problem aloud:

> *"Merge two sorted linked lists into one sorted list."*

Before coding, say:

> *"Base: either list empty → return the other. Recursive: compare heads, attach smaller to merge(rest). Trust the sub-call returns a sorted tail."*

---

*You understand shrinking a list by one node. Your first quest: pick the minimum head at every step. →*
