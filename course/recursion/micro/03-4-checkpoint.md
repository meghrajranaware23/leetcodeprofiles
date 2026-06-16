<!-- hand-authored -->
# ✅ Day 3 Checkpoint

> **Index-Based Recursion** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "merge two sorted linked lists" | Pick-min head recursion | Smaller head wins; recurse on tails |
| "reverse linked list" | Pointer rewire on unwind | Fix one `.next` after sub-call returns |
| "linked list" + "recursion" | Shrink via `head.next` | No index — tail is the smaller subproblem |
| "return the head" | Return value may come from deep in list | Reverse: old tail; merge: current winner |
| "base case" on lists | `null` or single node | Empty tail needs no work |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Merge two sorted linked lists recursively"* → **Pick-min** — compare heads, link winner to merged rest
2. *"Reverse a singly linked list in-place"* → **Rewire on return** — `head.next.next = head`
3. *"Add two numbers represented as linked lists"* → **Parallel shrink** — recurse both, combine digit + carry
4. *"Find middle of linked list"* → **Not today's pattern** — fast/slow pointers (iterative)

---

## 🎯 Transfer to Unseen Problems

You've studied merge and reverse. Can you recognize list recursion on problems you've never seen?

**Scenario 1:** *"Given two sorted lists, merge them into one sorted list without creating new nodes."*

Which pattern? **Pick-min head recursion.** Same skeleton as today's merge quest — base when either list is empty.

**Scenario 2:** *"Reverse the links between nodes in pairs: 1→2→3→4 becomes 2→1→4→3."*

Which pattern? **Rewire after recursing on pairs.** Base: 0 or 1 nodes. Combine: swap two links, connect to reversed remainder.

**Scenario 3:** *"Copy a linked list with random pointer using O(1) extra space."*

Which pattern? **Not pure linear recursion** — interleave copies, then assign random (multi-pass). List shrink alone isn't enough.

> **Answer key:** Scenarios 1–2 use Day 3's shrink-by-`next` template. The *combine step* changes — pick-min vs flip pointers.

---

## ⚠ Common Mistakes

1. **Null base case skipped** — Always handle `head == null` first on any list recursion.

2. **Rewiring before the recursive call (reverse)** — The tail must be fully reversed before you flip your one link.

3. **Returning the wrong head** — After reverse, return `newHead` from the tail, not the original `head`.

4. **Losing the other list in merge** — When `l1` wins, recurse `(l1.next, l2)`, not `(l1, l2.next)`.

5. **Forgetting `head.next = null` in reverse** — Creates a cycle in the reversed segment.

---

## 🏋️ Mini Challenge

### [Merge Two Sorted Lists #21](https://leetcode.com/problems/merge-two-sorted-lists/) — trace only

Without opening the solution, trace merge on paper:

```
l1: 2 → 4
l2: 1 → 3 → 4
```

Write each frame: which head wins, what recursive call comes next, what gets returned on unwind.

**Before you code:** Say *"pick-min, attach `.next`, return winner"* out loud.

> 💡 **Hint:** Frame 1 picks 1 from l2. Frame 2 compares 2 vs 3. When one list empties, base case returns the rest.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Merge Two Sorted Lists #21](https://leetcode.com/problems/merge-two-sorted-lists/) | Easy | Pick-min head recursion |
| [Reverse Linked List #206](https://leetcode.com/problems/reverse-linked-list/) | Easy | Pointer rewire on unwind |
| [Reverse Linked List II #92](https://leetcode.com/problems/reverse-linked-list-ii/) | Medium | Subrange rewire |
| [Swap Nodes in Pairs #24](https://leetcode.com/problems/swap-nodes-in-pairs/) | Medium | Recurse + pair swap |

---

*Day 3 complete! Tomorrow: answers bubble **up** from the leaves of a tree. →*
