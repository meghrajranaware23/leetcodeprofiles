# 📝 Fast & Slow Pointers

> **Day 8** · Fast & Slow Pointers · ★★★☆☆ · 10 min read

---

Some arrays aren't just data — they secretly behave like **linked lists**. Each index points to another index via `nums[i]`. When you follow these jumps, you either reach an exit or enter a **cycle**.

**Fast and slow pointers** (Floyd's tortoise and hare) detect and analyze those cycles without extra memory.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

Maintain two pointers moving through a sequence at different speeds:

- **Slow** moves **1 step** per iteration
- **Fast** moves **2 steps** per iteration

If the sequence has a cycle, fast eventually **laps** slow inside the loop. If there's no cycle, fast reaches the end (`null`, out of bounds, or terminal state).

On arrays, treat `nums[i]` as "the next node" — index `i` jumps to index `nums[i]`.

### 2. Simple explanation

Imagine two runners on a circular track. One runs twice as fast. If the track loops, the faster runner will eventually catch the slower one from behind.

If the track is a straight line with an end, the faster runner falls off first — no meeting.

For **Happy Number**, each number generates the next by squaring its digits — that's the "track." Cycle detection tells you if you'll loop forever or reach 1.

For **Find Duplicate**, each index `i` points to `nums[i]` — that's a linked list of n+1 nodes with n edges, so a duplicate **must** create a cycle.

### 3. Small visual example

**Array as linked list:** `nums = [1, 3, 4, 2, 2]` (indices 0..4)

```
Follow from index 0:
  0 → nums[0]=1 → nums[1]=3 → nums[3]=2 → nums[2]=4 → nums[4]=2 → nums[2]=4 → ...

       0 ──→ 1 ──→ 3 ──→ 2 ──→ 4
                     ↑         │
                     └──── 2 ←─┘   (cycle: 2 ↔ 4)

Slow: 0 → 1 → 3 → 2 → 4 → 2 → ...
Fast: 0 → 3 → 4 → 2 → 4 → 2 → ...  (meets slow inside cycle ✓)
```

**Happy Number path for 19:**

```
19 → 1²+9²=82 → 68 → 100 → 1 ✓ (happy)

Unhappy example 4:
4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4  (cycle — not happy)
```

### 4. How the pattern works

**Cycle detection (Floyd's Phase 1 — find meeting point):**
```
slow = head, fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: cycle found
```

**On arrays (Find Duplicate):**
```
slow = nums[0], fast = nums[0]
do:
    slow = nums[slow]
    fast = nums[nums[fast]]
while slow != fast
```

**Phase 2 (optional — find cycle start):**
```
slow = head, fast = meeting_point
while slow != fast:
    slow = slow.next
    fast = fast.next
// slow == cycle entrance
```

For duplicate-finding, Phase 2 locates the repeated value directly.

### 5. What problem does this pattern solve?

- Does a sequence **enter a cycle**? (Happy Number)
- Find a **duplicate** in array-of-indices graph (Find Duplicate)
- Find the **middle** of a linked list (slow moves 1, fast moves 2 — fast at end when slow at middle)
- Detect **cycle in linked list** (#141)
- Find **cycle entrance** (#142)

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Hash set of visited states/indices | O(n) space — Floyd uses O(1) |
| Mark visited in-place (modify array) | Destructive; not always allowed |
| Simulate every step with array copy | O(n) space and time per query |
| Nested loops for duplicate | O(n²) — graph view + Floyd is O(n) |

### 7. The key observation

**n+1 numbers in range [1, n] → pigeonhole → duplicate → cycle.**

When you treat `index → nums[index]` as edges, you're walking a functional graph (each node has exactly one outgoing edge). A duplicate means two indices point to the same next node — a **branch merges into a cycle**.

Floyd's algorithm finds the meeting point inside the cycle, then a second pass finds the entrance — which equals the duplicate value.

### 8. Pattern signals & recognition clues

| When the problem says… | Think fast & slow |
|---|---|
| "detect cycle" / "infinite loop" / "repeats" | Floyd's tortoise and hare |
| "find duplicate" in [1, n] array, O(1) space | Array-as-linked-list + Floyd |
| "happy number" / digit transformation | Sequence cycle detection |
| "without modifying array" + cycle/duplicate | Pointer chase, not marking |
| "linked list" + middle / cycle | Fast moves 2, slow moves 1 |

**Keywords:** `cycle` · `duplicate` · `Floyd` · `tortoise` · `hare` · `slow` · `fast` · `nums[i] as next`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Starting fast at `head` instead of `head.next` (linked list) | Or use do-while; ensure they don't start equal incorrectly |
| Moving fast only once per loop iteration | Fast must advance **twice** per slow step |
| Using Floyd on unsuitable graph (multiple next pointers) | Floyd needs **functional graph** — one next per node |
| Forgetting index bounds in array-as-list | Ensure `nums[i]` stays in valid range (problem guarantees it) |
| Confusing "duplicate value" with "duplicate index" | Follow **values as next indices**, not index+1 |

### 10. Recognition drill

Read this problem aloud:

> *"An array of n+1 integers where each integer is between 1 and n. Find the duplicate. O(1) extra space, don't modify the array."*

Before coding, say:

> *"Values are nodes, nums[i] is the next pointer — pigeonhole guarantees a cycle. Floyd's fast/slow finds the duplicate."*

---

## Part 2 — Array-as-Graph Mental Model

| View | Node | Edge | Cycle means… |
|---|---|---|---|
| Linked list | List node | `node.next` | Loop in chain |
| Array duplicate | Index `i` | `i → nums[i]` | Duplicate value at cycle entrance |
| Happy number | Current number | `n → sumSquares(n)` | Not happy — loops forever |

> 💡 **The array isn't always an array.** Sometimes it's a hidden linked list. Reframing the data structure unlocks O(1)-space cycle algorithms you already know from linked lists.

---

*You understand fast and slow pointers. First quest: the classic cycle-in-a-sequence problem. →*
