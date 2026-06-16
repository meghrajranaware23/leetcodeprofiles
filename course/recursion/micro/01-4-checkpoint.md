<!-- hand-authored -->
# ✅ Day 1 Checkpoint

> **Call Stack & Base Cases** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 1 is about **one shrink step + one base case + call-stack tracing**. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "reverse in-place" / swap from both ends | Two-pointer recursion | Shrink `(l, r)` inward; base when `l >= r` |
| "power of two" / divide by 2 | Recursive reduction | Halve `n`; base at `1` or odd failure |
| "smallest input" / "when pointers meet" | Base case first | Stops infinite recursion |
| "return true/false" from recursion | Return-value stack | Answer bubbles up from base case |
| "modify in place" / void helper | Side-effect recursion | Work locally; no return to combine |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 1 pattern fires first?

1. *"Reverse a character array in-place using recursion"* → **Two-pointer shrink** — swap ends, recurse on middle
2. *"Is n a power of two?"* → **Divide by 2** — odd guard, recurse on `n/2`
3. *"Is n a power of three?"* → **Same skeleton** — divide by 3 instead of 2
4. *"Check if a string is a palindrome (ignore case)"* → **Two-pointer shrink** — compare instead of swap

---

## 🎯 Transfer to Unseen Problems

You've traced Reverse String and Power of Two. Can you apply the **call stack mindset** to new problems?

**Scenario 1:** *"Given a string, check if it is a palindrome using recursion. Compare characters from both ends."*

Which pattern? **Two-pointer shrink** — same frame structure as Reverse String, but compare `s[l]` and `s[r]` instead of swapping. Base: `l >= r` → true. Mismatch → false.

**Scenario 2:** *"Given integer n, return true if n is a power of four."*

Which pattern? **Recursive reduction** — if `n <= 0` false; if `n == 1` true; if `n % 4 != 0` false; else recurse on `n/4`. Same stack shape as Power of Two.

**Scenario 3:** *"Reverse only the first half of a string recursively."*

Which pattern? **Two-pointer shrink with a stop condition** — recurse while `l < mid`, swapping `s[l]` and `s[r]`. Base when `l >= mid`.

> **Answer key:** All three use **base case + smaller subproblem + stack unwind**. The local step changes (swap, compare, divide) — the skeleton does not.

---

## ⚠ Common Mistakes

1. **Base case after recursive call** — Write the stop condition first. Falling through past base causes infinite recursion.

2. **Wrong shrink direction** — Reverse String shrinks `(l, r)` inward; Power of Two shrinks `n` by halving. Mixing them up gives wrong depth or wrong answer.

3. **Skipping edge cases** — Power of Two: test `n = 0`, `n = 1`, `n = -8`. Reverse String: test `["a"]` (single char).

4. **Not tracing on paper** — If you cannot draw the call stack, you are not ready to code. One line per frame.

5. **Ignoring return vs void** — Reverse String mutates in place (void). Power of Two returns bool upward. Know which direction values flow.

---

## 🏋️ Mini Challenge

### [Power of Four #342](https://leetcode.com/problems/power-of-four/)

**[→ Try Power of Four on LeetCode](https://leetcode.com/problems/power-of-four/)**

Return `true` if `n` is a power of four.

```
Input:  n = 16
Output: true

Input:  n = 5
Output: false
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "power of four" | Divide by 4 each step |
| "return true/false" | Boolean recursion — same as #231 |
| "integer n" | Guard `n <= 0`, base `n == 1`, check `% 4` |

**Before you code:** Say the pattern name out loud. Trace `n = 64` on paper — how many frames until base?

> 💡 **Hint:** Same skeleton as Power of Two — change divisor from 2 to 4.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Reverse String #344](https://leetcode.com/problems/reverse-string/) | Easy | Two-pointer shrink |
| [Power of Two #231](https://leetcode.com/problems/power-of-two/) | Easy | Recursive reduction (÷2) |
| [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) | Easy | Two-pointer compare (stretch) |

---

*Day 1 complete! Tomorrow: trust the recursive call when one step splits into two. →*
