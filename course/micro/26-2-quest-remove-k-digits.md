# ⚔ Quest: Remove K Digits

> **Day 26** · [Remove K Digits #402](https://leetcode.com/problems/remove-k-digits/) · Medium · 30 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove K Digits on LeetCode](https://leetcode.com/problems/remove-k-digits/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given string `num` representing a non-negative integer and integer `k`, remove `k` digits from `num` so that the remaining digits form the **smallest possible integer**.

Return the result as a string. The result must not contain leading zeros. If all digits are removed, return `"0"`.

```
Input:  num = "1432219", k = 3
Output: "1219"

Input:  num = "10200", k = 1
Output: "200"
        (remove the '1')

Input:  num = "10", k = 2
Output: "0"
```

---

## 💡 Hints

**Lexicographically smallest number** → **increasing monotonic stack**. When a smaller digit `c` arrives and the top of the stack is larger, pop the top (spend one removal) — the smaller digit leads to a better number.

Maintain a **removal budget** `k`. Pop while `c < stack.top()` and `k > 0`. Push `c` after pops stop.

If `k` remains after processing all digits, remove from the **end** of the stack (the suffix digits are already in increasing order — trailing digits are the largest).

Strip **leading zeros** from the result. If the stack is empty, return `"0"`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Increasing Stack + Greedy Removal Budget

**How to identify this from the problem statement:**
- "smallest possible integer" → lexicographic minimization
- "remove k digits" → bounded number of deletions — removal budget
- order preserved for remaining digits → stack, not sort
- string of digits → character-by-character greedy

| Keyword / phrase | What it signals |
|---|---|
| "smallest possible integer" | Increasing stack — pop larger leading digits |
| "remove k digits" | Budget k — pop at most k times |
| "remaining digits" / order preserved | Stack construction left to right |
| "leading zeros" | Post-process: strip prefix zeros |
| Medium + greedy + string | Day 17 increasing stack + Day 16 greedy |

**Why this pattern works:** A larger digit before a smaller one can always be improved by removing the larger digit. The increasing stack catches these inversions in one pass — each digit pushed once, popped at most once.

**How a strong solver thinks before coding:**
1. *"Smallest number after k removals → increasing monotonic stack."*
2. *"Pop top while c < top and k > 0."*
3. *"Trim remaining k from end. Strip leading zeros."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all C(n,k) subsets of digits to keep** | Exponential — O(C(n,k)) |
| **Sort digits and take smallest n−k** | Violates original order — subsequence, not subsequence-with-order |
| **Remove leftmost large digit without stack** | Misses earlier inversions — stack catches all in one pass |
| **Pop without budget check** | May remove more than k digits |

**The insight brute force misses:** Only **inversions** (a larger digit before a smaller one) need fixing. The increasing stack removes exactly those, spending one budget per pop, in O(n).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Remove K Digits #402](https://leetcode.com/problems/remove-k-digits/) | k removals, smallest number | Increasing stack + budget |
| [Remove Duplicate Letters #316](https://leetcode.com/problems/remove-duplicate-letters/) | All chars once, smallest | Stack + freq + seen |
| [Smallest Subsequence of Distinct Characters #1081](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/) | Distinct subsequence | Same as #316 |
| [Create Maximum Number #321](https://leetcode.com/problems/create-maximum-number/) | Maximize, not minimize | Decreasing stack variant |

#402 is the purest greedy-string stack — budget + increasing order, no frequency map needed.

---

## 📖 Walkthrough

```
num = "1432219",  k = 3
stack = []

'1': push → [1]
'4': 4 > 1 → push → [1,4]
'3': 3 < 4, k=3 → pop 4, k=2
     3 > 1 → push → [1,3]
'2': 2 < 3, k=2 → pop 3, k=1
     2 > 1 → push → [1,2]
'2': 2 ≥ 2 → push → [1,2,2]
'1': 1 < 2, k=1 → pop 2, k=0
     1 < 2, k=0 → stop popping
     push → [1,2,1]
'9': push → [1,2,1,9]

k=0. Result = "1219" ✓
```

```
num = "10200",  k = 1
'1': [1]
'0': 0 < 1, k=1 → pop 1, k=0 → push 0 → [0]
'2': push → [0,2]
'0': push → [0,2,0]
'0': push → [0,2,0,0]

Strip leading zeros → "200" ✓
```

> 💡 **The insight:** The stack is the number under construction. Every pop replaces a larger leading digit with a smaller one — the exchange argument from Day 16 guarantees optimality.

---

## Solution

### C++
```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string stack;
        for (char c : num) {
            while (!stack.empty() && k > 0 && c < stack.back()) {
                stack.pop_back();
                k--;
            }
            stack.push_back(c);
        }
        while (k-- > 0) stack.pop_back();

        int start = 0;
        while (start < (int)stack.size() - 1 && stack[start] == '0') start++;
        string result = stack.substr(start);
        return result.empty() ? "0" : result;
    }
};
```

### Python
```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stack = []
        for c in num:
            while stack and k > 0 and c < stack[-1]:
                stack.pop()
                k -= 1
            stack.append(c)

        stack = stack[:len(stack) - k]

        result = ''.join(stack).lstrip('0')
        return result if result else '0'
```

### Java
```java
class Solution {
    public String removeKdigits(String num, int k) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : num.toCharArray()) {
            while (!stack.isEmpty() && k > 0 && c < stack.peek()) {
                stack.pop();
                k--;
            }
            stack.push(c);
        }

        while (k-- > 0) stack.pop();

        StringBuilder sb = new StringBuilder();
        for (char c : stack) sb.append(c);

        int start = 0;
        while (start < sb.length() - 1 && sb.charAt(start) == '0') start++;

        String result = sb.substring(start);
        return result.isEmpty() ? "0" : result;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Smallest possible integer"** → Increasing monotonic stack — Day 26 greedy string.
- **"Remove k digits"** → Removal budget — pop while `c < top` and `k > 0`.
- **Order preserved** → Stack builds left to right — not sorting.
- **Remaining k after scan** → Pop from end — suffix is already increasing.
- **Leading zeros** → Strip prefix; empty → `"0"`.

If you tried all subsets, you found exponential brute force. The signal was "smallest" + "remove k" — increasing stack with budget.

> 🎯 **Pattern:** Increasing monotonic stack + removal budget. Pop larger leading digits when a smaller digit arrives.

---

*Next: smallest string with each letter once — stack + freq + seen. →*
