<!-- hand-authored -->
# 📝 Guide: Beginner Mistakes to Avoid

> **Day 9** · Mistake Identification · 10 XP · 8 min read

---

**Mission:** Name the bug pattern so you don't repeat it.

**Bridge Day 8:** Remove Dup, Move Zeroes, Remove Element — same **in-place write index** family.

---

## In-place index bug pattern

```
for r in 0..n-1:
  if should_keep(nums[r]):
    nums[w] = nums[r]
    w++   ← forgot to increment w? wrote to same slot twice?
return w  ← returned r instead of w?
```

---

## Mistake catalog

| Pattern | Where it shows up |
|---------|-------------------|
| Wrong write index | Move Zeroes, Remove Element |
| Off-by-one loop bounds | Missing Number, binary search |
| Not returning prefix length | Remove Dup, Remove Element |

*Trace slow/fast on paper before coding. →*
