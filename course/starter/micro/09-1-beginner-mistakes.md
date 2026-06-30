<!-- hand-authored -->
# 📝 Guide: Beginner Mistakes to Avoid

> **Day 9** · Mistake Identification · 10 XP · 8 min read

---

**Your mission today:** *Name the bug pattern so you don't repeat it.*

**Learning objective:** Recognize in-place index bugs, off-by-one errors, and wrong return values before they ship

**Bridge from Day 8:** Remove Dup, Move Zeroes, Remove Element — same **in-place write index** family. Today you label the bugs so they stop hiding in new problems.

---

## Part 1 — Mistake Identification

### 1. Why naming bugs matters

The same three bug patterns cause most Wrong Answers on Easy array problems. If you can name the pattern, you can trace for it on paper before coding.

### 2. The skill in one sentence

> **Trace slow/fast on paper, then code** — and know which mistake family you're in.

### 3. In-place index bug pattern

```
for r in 0..n-1:
  if should_keep(nums[r]):
    nums[w] = nums[r]
    w++   ← forgot to increment w? wrote to same slot twice?
return w  ← returned r instead of w?
```

### 4. Mistake catalog

| Pattern | Where it shows up |
|---------|-------------------|
| Wrong write index | Move Zeroes, Remove Element |
| Off-by-one loop bounds | Missing Number, binary search |
| Not returning prefix length | Remove Dup, Remove Element |

### 5. What strong beginners do

| Weak habit | Strong habit |
|---|---|
| Code the loop, debug WA later | Trace w and r on paper first |
| Return array length instead of unique count | Return `w` — the write pointer |
| Treat each problem as brand new | Tag: "same family as Day 8 Remove Dup" |
| Fix without naming the bug | Journal: "wrong write index again" |

### 6. The key insight

> **Most in-place array bugs are the same bug** — wrong `w`, forgotten increment, or returning `r` instead of `w`. Name it once, catch it forever.

### 7. Common Day 9 mistakes

| Mistake | Fix |
|---|---|
| Incremented `r` when should increment `w` | Trace: which pointer moves when you write? |
| Returned array length instead of unique count | Return `w` after the scan loop |
| Didn't connect bug to Day 8 two-pointer family | Tag problem before coding |
| Skipped paper trace on Move Zeroes | Draw w/r after each non-zero |

### 8. Try it now (60 seconds)

For `[0,1,0,3,12]`, predict `w` after processing each non-zero **on paper** — no editor.

---

*Trace slow/fast on paper before coding. →*
