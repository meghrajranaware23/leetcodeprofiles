<!-- hand-authored -->
# 📝 Guide: Trace the Examples

> **Day 3** · Example Tracing & Custom Test Cases · 10 XP · 8 min read

---

**Your mission today:** *The examples are free answers — use them.*

**Learning objective:** Use given examples and create your own test cases on paper

**Bridge from Day 2:** You learned to **read** problems. Today you **execute** the examples by hand — the examples are the spec made concrete.

---

## Part 1 — Example Tracing & Custom Test Cases

### 1. Why tracing beats guessing

Code is a paper trace in syntax. If you can't trace Example 1 by hand, your code won't be right either.

### 2. The skill in one sentence

> **Trace every given example on paper, then invent one custom test case before coding.**

### 3. Running Sum hand-trace template

```
nums = [1, 2, 3, 4]

index i │ nums[i] before │ add nums[i-1] │ nums[i] after
────────┼────────────────┼───────────────┼──────────────
   1    │       2        │  + nums[0]=1  │     3
   2    │       3        │  + nums[1]=3  │     6
   3    │       4        │  + nums[2]=6  │    10

Output: [1, 3, 6, 10]  ✓ matches Example 1
```

### 4. Nested-loop trace (Richest Customer)

```
accounts = [[1,2,3], [3,2,1]]

Customer 0: 1+2+3 = 6
Customer 1: 3+2+1 = 6
max(6, 6) = 6
```

For 2D input: outer loop = rows, inner loop = columns. Trace **one row completely** before moving to the next.

### 5. Custom test case rule

After tracing given examples, add **one** case the statement doesn't show:
- Running Sum: `[5]` (single element — output equals input)
- Richest Customer: `[[0],[0]]` (ties — still return 0)

### 6. What strong tracers do

| Weak habit | Strong habit |
|---|---|
| "I get it" without writing | Fill trace table row-by-row |
| Trace only Example 1 | Trace ALL examples + one custom |
| Skip 2D structure | Draw outer/inner loop on paper |
| Code when trace fails | Fix trace first — bug is in understanding |

### 7. Try it now (60 seconds)

Trace Running Sum for `nums = [3, 1, 2]` on paper. Predict output before looking at hints.

---

*Trace first. Code second. →*
