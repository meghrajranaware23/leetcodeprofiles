# ✅ Day 8 Checkpoint

> **Fast & Slow Pointers** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "detect cycle" / "loops forever" | Floyd's fast & slow | Tortoise and hare meet inside any cycle |
| "n+1 integers in [1, n]" / "find duplicate" | Array-as-linked-list + Floyd | Pigeonhole → cycle; entrance = duplicate |
| "repeat transform until …" | Implicit sequence + Floyd | Each state has one deterministic next |
| "O(1) space" + cycle/duplicate + no modify | Pointer chase, not hash set | Floyd's whole purpose |
| "find middle of linked list" | Fast moves 2, slow moves 1 | When fast hits end, slow at midpoint |
| "cycle entrance" / "where loop begins" | Floyd Phase 2 | Reset one pointer to head, walk both at speed 1 |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Does a linked list have a cycle?"* → **Floyd Phase 1 only** (meet or fast reaches null)
2. *"Will this digit-square process reach 1?"* → **Floyd on implicit sequence** (Happy Number)
3. *"Find duplicate in array without extra space"* → **Array-as-graph + Floyd Phase 1 & 2**

---

## 🎯 Transfer to Unseen Problems

You've seen Happy Number and Find the Duplicate. Can you recognize fast/slow on problems you've never studied?

**Scenario 1:** *"Given the head of a linked list, return the middle node. If two middles, return the second."*

Which pattern? **Fast/slow — no cycle needed.** Slow advances 1, fast advances 2. When fast reaches the end, slow is at the middle. Same pointer mechanics, different exit condition.

**Scenario 2:** *"Given a linked list, return the node where the cycle begins. Return null if no cycle."*

Which pattern? **Floyd Phase 1 + 2.** After meeting inside the cycle, reset slow to head; advance both one step at a time until they meet — that node is the cycle entrance.

**Scenario 3:** *"An array of distinct integers, each in [-n, n]. A jump from index i goes to i + nums[i]. Detect if there's a cycle that spans more than one index and moves in the same direction each step."*

Which pattern? **Floyd with extra constraints** — direction must stay consistent and cycle length must exceed 1. (Circular Array Loop — mini challenge below.)

> **Answer key:** Scenario 1 → fast/slow for middle. Scenario 2 → full Floyd. Scenario 3 → Floyd + direction/length validation.

---

## ⚠ Common Mistakes

1. **Moving fast only one step** — Fast must advance **twice** per iteration. One step defeats the lap guarantee.

2. **Wrong start positions (linked list)** — Some implementations start `fast = head.next` to avoid false meeting at head. With do-while (array problems), starting both at `nums[0]` is correct.

3. **Skipping Phase 2 on duplicate finding** — Meeting point is inside the cycle, not necessarily the duplicate. Reset slow to `nums[0]` and walk both at speed 1.

4. **Using Floyd when next isn't unique** — Floyd requires a **functional graph** (each node has exactly one next). Trees with branching need different tools.

5. **Confusing value with index** — In Find Duplicate, you follow **values as indices**: `i → nums[i]`, not `i → i + 1`.

---

## 🏋️ Mini Challenge

### [Circular Array Loop #457](https://leetcode.com/problems/circular-array-loop/)

**[→ Try Circular Array Loop on LeetCode](https://leetcode.com/problems/circular-array-loop/)**

Given an array of **non-zero** integers, each element `nums[i]` represents a jump: forward if positive, backward if negative, with length `|nums[i]|`. Index `i` jumps to `(i + nums[i]) % n`.

Return `true` if there is a **cycle** in this array that:
- spans more than one index, AND
- moves in the **same direction** the whole time

```
Input:  nums = [2, -1, 1, 2, 2]
Output: true   (cycle 0 → 2 → 3 → 0, all forward)

Input:  nums = [-1, 2]
Output: false  (cycle would be single-index or direction flip)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "cycle in array" / "jumps from index to index" | Fast & slow (Floyd) |
| "same direction" | Track sign; abort if direction flips |
| "more than one index" | Cycle length > 1 — self-loop doesn't count |
| non-zero integers | Valid jumps always exist |

**Before you code:** *"Floyd on index jumps — but validate direction consistency and reject cycles of length 1."*

> 💡 **Hint:** Define `next(i)` that returns the next index or `-1` if direction conflicts. Run slow/fast on valid jumps. On meeting, walk the cycle to count length — return true only if length > 1.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Linked List Cycle #141](https://leetcode.com/problems/linked-list-cycle/) | Easy | Floyd Phase 1 |
| [Linked List Cycle II #142](https://leetcode.com/problems/linked-list-cycle-ii/) | Medium | Floyd Phase 1 + 2 |
| [Middle of the Linked List #876](https://leetcode.com/problems/middle-of-the-linked-list/) | Easy | Fast/slow, no cycle |
| [Linked List Random Node #382](https://leetcode.com/problems/linked-list-random-node/) | Medium | Reservoir sampling (different family) |

---

*Day 8 complete! You can detect cycles, find duplicates, and partition three ways — D-Rank pointer mastery is taking shape. →*
