<!-- hand-authored -->
# ⚔ Quest: Reverse String

> **Day 1** · [Reverse String #344](https://leetcode.com/problems/reverse-string/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reverse String on LeetCode](https://leetcode.com/problems/reverse-string/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this **in-place** with O(1) extra memory.

```
Input:  s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

```
Input:  s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Two-pointer recursion** — swap the outer characters, then trust a recursive call to reverse the middle.

If you're stuck after 5 minutes: draw the call stack for `s = ["h","e","l","l","o"]`. Mark when `l` and `r` meet — that's your base case.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Linear Recursion (Two-Pointer Shrink)

**How to identify this from the problem statement:**
- "Reverse in-place" → mutate the array; no second buffer
- The middle sub-array is the **same problem** on a smaller range
- One local action (swap ends) + one recursive call on `(l+1, r-1)`

| Keyword / phrase | What it signals |
|---|---|
| "reverse in-place" | Swap from both ends — two pointers |
| "array of characters" | Index-based recursion on `(l, r)` |
| "O(1) extra memory" | Recursion depth O(n) — no auxiliary array |
| "modify input" | Void helper — side effect, not return value |
| "smaller subproblem" | Recurse on strictly smaller window |

**Why this pattern works:** Each call handles exactly one pair of swaps at the boundary. The base case `l >= r` means zero or one character left — already reversed.

**How a strong solver thinks before coding:**
1. *"Base case: l >= r → return."*
2. *"Local step: swap s[l] and s[r]."*
3. *"Shrink: recurse on l+1, r-1."*
4. *"Trace the stack before writing syntax."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy to a new array, reverse, copy back** | Violates in-place / O(1) extra space requirement |
| **Single loop swapping without recursion insight** | Works iteratively — but misses the call-stack pattern Day 1 teaches |
| **Recursive call on full `(l, r)` without shrinking** | Infinite recursion — never reaches base case |
| **Swap only once (outer pair only)** | Returns `"oellh"` — middle never reversed |

**The insight brute force misses:** Reversing is **self-similar**. After swapping the ends, *reversing the rest* is the identical problem on a smaller window.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Reverse Linked List #206](https://leetcode.com/problems/reverse-linked-list/) | Node pointers instead of indices | Shrink problem — delegate the tail |
| [Reverse String II #541](https://leetcode.com/problems/reverse-string-ii/) | Reverse every 2k chunk | Same swap-ends idea per chunk |
| [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) | Compare instead of swap | Two pointers shrinking inward |
| [Swap Nodes in Pairs #24](https://leetcode.com/problems/swap-nodes-in-pairs/) | Linked list pairs | Local swap + recurse on remainder |

If you recognized Reverse String, you already have the skeleton for inward-shrinking recursion.

---

## 📖 Walkthrough

Use **two-pointer recursion**. Swap `s[l]` and `s[r]`, then recurse on the middle.

```
s = ["h", "e", "l", "l", "o"]     l=0, r=4

CALL STACK:
┌─────────────────────────────────────────┐
│ rev(0,4): swap s[0]↔s[4]                │
│   ["o", "e", "l", "l", "h"]             │
│   waiting for rev(1,3)...               │
├─────────────────────────────────────────┤
│ rev(1,3): swap s[1]↔s[3]                │
│   ["o", "l", "l", "e", "h"]             │
│   waiting for rev(2,2)...               │
├─────────────────────────────────────────┤
│ rev(2,2): l >= r → BASE CASE → return   │
└─────────────────────────────────────────┘

UNWIND: all frames done → ["o","l","l","e","h"] ✓
```

Single character edge case:

```
s = ["a"]     l=0, r=0
rev(0,0): l >= r → return immediately (no swap needed) ✓
```

> 💡 **The insight:** You never think about the whole string — only one swap and a smaller `(l, r)`. The call stack remembers the rest.

---

## Solution

### C++
```cpp
class Solution {
    void rev(vector<char>& s, int l, int r) {
        if (l >= r) return;
        swap(s[l], s[r]);
        rev(s, l + 1, r - 1);
    }
public:
    void reverseString(vector<char>& s) { rev(s, 0, s.size() - 1); }
};
```

### Python
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        def rev(l, r):
            if l >= r: return
            s[l], s[r] = s[r], s[l]
            rev(l + 1, r - 1)
        rev(0, len(s) - 1)
```

### Java
```java
class Solution {
    public void reverseString(char[] s) { rev(s, 0, s.length - 1); }
    private void rev(char[] s, int l, int r) {
        if (l >= r) return;
        char tmp = s[l]; s[l] = s[r]; s[r] = tmp;
        rev(s, l + 1, r - 1);
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Reverse in-place"** → Two pointers from both ends — swap and shrink.
- **"Same problem, smaller window"** → Recurse on `(l+1, r-1)`.
- **"When do I stop?"** → `l >= r` — zero or one character left.
- **"This is the call stack from the concept page"** → One frame per swap pair.

If you tried a new array first, that's fine — the breakthrough is **naming the shrink direction**, not memorizing swap syntax.

> 🎯 **Pattern Unlocked:** Linear recursion with two-pointer shrink — swap locally, delegate the middle.

---

*One quest down. The next one shrinks by dividing instead of swapping. →*
