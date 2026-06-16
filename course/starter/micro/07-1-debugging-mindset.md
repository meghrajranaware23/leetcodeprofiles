<!-- hand-authored -->
# 📝 Guide: The Debugging Mindset

> **Day 7** · Systematic Debugging · ★☆☆☆☆ · 10 XP · 8 min read

---

**Mission:** *Debug with evidence, not guesses.*

**Objective:** Debug systematically with small inputs, print statements, and diff-checking

---

## Debug Protocol

```
REPRODUCE → NARROW → FIX → RE-RUN SAME TEST
```

| Step | Action |
|------|--------|
| **Reproduce** | Find smallest input that fails (n=1, Example 2) |
| **Narrow** | Print key variables mid-loop |
| **Fix** | One change at a time |
| **Verify** | Re-run the failing case first |

---

## Print-trace example (Missing Number)

```
nums = [3,0,1], n = 3
expected: 0+1+2+3 = 6
sum(nums) = 4
missing = 6 - 4 = 2  ✓
```

If your formula gives 3 instead of 2 → off-by-one in n or sum range.

---

## Test trio before every submit

- `n = 1` (or minimum length)
- `n = 2`
- Max constraint sample from statement

---

*Evidence beats guessing. →*
