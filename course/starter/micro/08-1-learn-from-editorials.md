<!-- hand-authored -->
# 📝 Guide: Learn from Editorials

> **Day 8** · Productive Editorial Learning · 10 XP · 8 min read

---

**Mission:** *Editorials are teachers, not answer keys.*

**Objective:** Extract understanding from solutions without copy-pasting; compare approaches

---

## Editorial Protocol (memorize this)

```
① Attempt 5+ minutes (logged stuck point)
② Read editorial for IDEA only — not line-by-line
③ Close tab
④ Re-solve from memory within 24 hours
⑤ One-sentence lesson in journal
```

---

## Two-pointer intro (Remove Duplicates)

Sorted array — write unique values at front:

```
nums: 1 1 2 2 3
      w
      r→  skip dupes, write new value at w
```

**Slow (`w`):** next write position · **Fast (`r`):** scanner

---

## Compare approaches (Merge Sorted Array)

- Merge into new array (easy, extra space)
- Merge from **end** backward (in-place trick — editorial gold)

*Read for the idea. Code your own version. →*
