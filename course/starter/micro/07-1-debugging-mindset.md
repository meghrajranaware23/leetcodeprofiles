<!-- hand-authored -->
# 📝 Guide: The Debugging Mindset

> **Day 7** · Systematic Debugging · 10 XP · 8 min read

---

**Your mission today:** *Debug with evidence, not guesses.*

**Learning objective:** Debug systematically with small inputs, print statements, and diff-checking

**Bridge from Day 6:** Yesterday you learned that getting stuck is data. Today you turn Wrong Answers into **evidence** — reproduce, narrow, fix, verify.

---

## Part 1 — Systematic Debugging

### 1. Why debugging is a skill

Random edits feel productive but waste time. A four-step protocol turns every Wrong Answer into a lesson you can journal and avoid repeating.

### 2. The skill in one sentence

> **Reproduce → Narrow → Fix → Re-run the same test** — in that order, every time.

### 3. Debug Protocol

```
REPRODUCE → NARROW → FIX → RE-RUN SAME TEST
```

| Step | Action |
|------|--------|
| **Reproduce** | Find smallest input that fails (n=1, Example 2) |
| **Narrow** | Print key variables mid-loop |
| **Fix** | One change at a time |
| **Verify** | Re-run the failing case first |

### 4. Print-trace example (Missing Number)

```
nums = [3,0,1], n = 3
expected: 0+1+2+3 = 6
sum(nums) = 4
missing = 6 - 4 = 2  ✓
```

If your formula gives 3 instead of 2 → off-by-one in n or sum range.

### 5. Test trio before every submit

| Test | Why |
|------|-----|
| `n = 1` (or minimum length) | Catches empty/single-element bugs |
| `n = 2` | Catches off-by-one in loops |
| Max constraint sample | Catches overflow or edge bounds |

### 6. What strong debuggers do

| Weak habit | Strong habit |
|---|---|
| Change three things at once | One fix, one re-run |
| Guess for 20 minutes | Print mid-loop values |
| Submit without re-testing the failing case | Re-run the exact WA input first |
| Skip n=1 before submit | Test trio every time |

### 7. The key insight

> **Wrong Answer is a gift** — it tells you exactly which input broke your logic. Reproduce that input before you touch your code.

### 8. Common Day 7 mistakes

| Mistake | Fix |
|---|---|
| Random code edits without reproducing failure | Find smallest failing input first |
| No print/debug output — guessed for 20 minutes | Print key variables mid-loop |
| Skipped n=1 before submit | Run test trio on every quest |
| Fixed code but didn't re-run the failing case | Verify the exact WA input passes |

### 9. Try it now (60 seconds)

Pick your last Wrong Answer (or imagine one). Write: *What was the smallest input that failed? What would you print mid-loop to narrow it?*

---

*Evidence beats guessing. Today's quests reward the protocol. →*
