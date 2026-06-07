# ⚔ Quest: Happy Number

> **Day 8** · [Happy Number #202](https://leetcode.com/problems/happy-number/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Happy Number on LeetCode](https://leetcode.com/problems/happy-number/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Write an algorithm to determine if a number `n` is happy.

A happy number is defined by this process:
- Start with any positive integer
- Replace the number by the **sum of the squares of its digits**
- Repeat until the number equals `1` (happy) or loops endlessly in a cycle that does **not** include `1` (not happy)

```
Input:  n = 19
Output: true
Explanation: 1² + 9² = 82 → 68 → 100 → 1 ✓

Input:  n = 2
Output: false
Explanation: enters cycle 4 → 16 → 37 → ... → 4
```

---

## 💡 Hints

You could track every seen number in a hash set — but the pattern is **fast and slow pointers** on the sequence itself.

Define `next(n)` = sum of squares of digits. Run slow and fast through the chain. If they meet at `1`, happy. If they meet elsewhere, it's a cycle — not happy.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fast & Slow Pointers — Floyd's Cycle Detection on a Sequence

**How to identify this from the problem statement:**
- "repeat until … or loops endlessly" → cycle detection signal
- each step transforms the number deterministically → functional graph (one next per state)
- no extra space mentioned → Floyd beats hash set

| Keyword / phrase | What it signals |
|---|---|
| "loops endlessly" / "cycle" | Floyd's tortoise and hare |
| "repeat process" / "transform until" | Define `next(state)`, walk the chain |
| "does it reach X" | If X is outside cycle → detect cycle first |
| sequence of states, not array indices | Same Floyd logic on implicit linked list |

**Why this pattern works:** The digit-square sequence has finite states (numbers eventually shrink or cycle). Two pointers at different speeds meet inside any cycle — or fast reaches `1` and you check slow.

**How a strong solver thinks before coding:**
1. *"Repeat a transform until 1 or cycle → Floyd's cycle detection."*
2. *"Define getNext(n) — sum of squared digits."*
3. *"Slow moves 1 step, fast moves 2. Meeting ≠ 1 → unhappy."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Hash set of all seen values** | Works but O(n) space — Floyd is O(1) space |
| **Hard-coded cycle list** | Fragile; Floyd handles any cycle generically |
| **Infinite loop with no termination check** | Unhappy numbers loop forever without detection |
| **Only checking if current == 1 each step** | Doesn't detect cycle — wastes time re-visiting |

**The insight brute force misses:** You don't need to remember every number. If slow and fast meet **and** the meeting point isn't `1`, you're in a non-happy cycle. O(1) space.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Linked List Cycle #141](https://leetcode.com/problems/linked-list-cycle/) | Explicit linked list | Classic Floyd |
| [Find the Duplicate Number #287](https://leetcode.com/problems/find-the-duplicate-number/) | Array-as-linked-list | Floyd Phase 1 + 2 (next quest) |
| [Circular Array Loop #457](https://leetcode.com/problems/circular-array-loop/) | Direction + length constraints | Floyd with extra checks (checkpoint) |

Happy Number is the gentlest introduction — the "linked list" is an implicit sequence, not an array index jump.

---

## 📖 Walkthrough

`n = 19`:

```
getNext(19)  = 1 + 81 = 82
getNext(82)  = 64 + 4 = 68
getNext(68)  = 36 + 64 = 100
getNext(100) = 1 + 0 + 0 = 1  ✓

Floyd trace:
  slow: 19 → 82 → 68 → 1
  fast: 19 → 68 → 1 → 1
  fast == 1 → happy ✓
```

`n = 4` (unhappy):

```
Chain: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 → ...

  slow: 4 → 16 → 37 → 58 → ...
  fast: 4 → 37 → 89 → 20 → 16 → ...
  slow == fast at 16 (not 1) → unhappy ✗
```

> 💡 **The insight:** The sequence is a linked list where each node has exactly one `next`. Floyd detects the cycle without storing history.

---

## Solution

### C++
```cpp
class Solution {
    int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }

public:
    bool isHappy(int n) {
        int slow = n, fast = n;
        do {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        } while (slow != fast);

        return slow == 1;
    }
};
```

### Python
```python
class Solution:
    def get_next(self, n: int) -> int:
        total = 0
        while n:
            n, digit = divmod(n, 10)
            total += digit * digit
        return total

    def isHappy(self, n: int) -> bool:
        slow = fast = n
        while True:
            slow = self.get_next(slow)
            fast = self.get_next(self.get_next(fast))
            if slow == fast:
                return slow == 1
```

### Java
```java
class Solution {
    private int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }

    public boolean isHappy(int n) {
        int slow = n, fast = n;
        do {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        } while (slow != fast);

        return slow == 1;
    }
}
```

**Complexity:** O(log n) time per step · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

- **"Repeat a process until loop or target"** → Implicit linked list → Floyd's cycle detection.
- **"Loops endlessly"** → Not a simulation problem — a **cycle detection** problem.
- **"Sum of squares of digits"** → Helper function `getNext(n)`; the pattern lives in how you walk the chain.

If you used a hash set first, that's fine — but the O(1)-space upgrade is recognizing the **sequence as a linked list**.

> 🎯 **Pattern Unlocked:** Fast/slow on an implicit sequence. Define `next(state)`, run tortoise and hare, interpret the meeting point.

---

*One quest down. Next: the array that secretly is a linked list. →*
