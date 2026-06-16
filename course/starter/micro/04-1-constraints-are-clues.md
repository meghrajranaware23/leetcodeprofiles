<!-- hand-authored -->
# 📝 Guide: Constraints Are Clues

> **Day 4** · Constraint & Edge Case Analysis · ★☆☆☆☆ · 10 XP · 8 min read

---

**Your mission today:** *Constraints tell you what's possible — and what's a trap.*

**Learning objective:** Read constraints for edge cases, time limits, and valid input ranges

**Bridge:** Days 2–3 taught reading and tracing. Today constraints become your **edge-case checklist**.

---

## Constraint → Edge Case Checklist

For every problem, translate constraints into tests:

| Constraint clue | Edge case to test |
|-----------------|-------------------|
| Array of digits | All 9s → carry overflow |
| String with spaces | Trailing spaces only |
| `n = 1` allowed | Single element input |
| Values in range | Min and max values |
| No empty input | Still check first/last index |

---

## Plus One carry diagram

```
digits = [9, 9, 9]

Step from right:
  i=2: 9→0, carry continues
  i=1: 9→0, carry continues
  i=0: 9→0, carry continues
  insert 1 at front → [1, 0, 0, 0]
```

**The trap:** `[9]` → `[1,0]`, not `[0]` with no leading digit.

---

## Day 4 workflow

1. Read constraints → list 3 edge cases in journal (first comment: `// Edge cases: ...`)
2. Trace examples including the hardest constraint case
3. Code only after edge list is written

---

## Try it now

For Plus One, list three edge cases from constraints before opening LeetCode.

---

*Constraints are clues, not decoration. →*
