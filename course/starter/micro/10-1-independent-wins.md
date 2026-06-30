<!-- hand-authored -->
# 📝 Guide: Independent Wins

> **Day 10** · Independent Solving · 10 XP · 8 min read

---

**Your mission today:** *Trust your workflow — minimal hints.*

**Learning objective:** Solve Easy problems with the full Starter Path workflow and no hints until 10 minutes

**Bridge from Day 9:** You can name bug patterns. Today you prove the **whole system** works without hand-holding — Phase 2 ends with an independent proof quest.

---

## Part 1 — Independent Solving

### 1. Why independence matters now

Days 1–9 built habits. Day 10 is where you discover you don't need the guide open while coding. Minimal hints = real fluency check.

### 2. The skill in one sentence

> **4-part read → paper trace → edge cases → 5-min attempt → debug if WA** — same loop, less scaffolding.

### 3. Independent solve checklist

- [ ] 4-part read
- [ ] Paper trace
- [ ] Edge cases
- [ ] 5-min attempt
- [ ] Debug if WA

### 4. Prefix sum trace (Pivot Index)

`nums = [1,7,3,6,5,6]`, index 3: left=1+7+3=11, right=5+6=11 → pivot

| i | left sum | right sum | pivot? |
|---|----------|-----------|--------|
| 0 | 0 | 21 | no |
| 3 | 11 | 11 | **yes** |

### 5. Binary search intro (Search Insert)

Sorted array + "where would target go?" → eliminate half each step.

```
nums = [1,3,5,6], target = 2
lo=0 hi=4 → mid=2 (5>2) → search left
lo=0 hi=2 → mid=1 (3>2) → search left
lo=0 hi=1 → insert at index 1
```

### 6. What strong independent solvers do

| Weak habit | Strong habit |
|---|---|
| Open hints at 2 minutes | Full 10-minute honest attempt first |
| Skip paper trace "I know this one" | Trace Example 1 before editor |
| No stuck-point log on Phase 2 proof | Log where you stuck — that's growth data |
| Panic when timer feels long | Trust the workflow; pace ≠ panic |

### 7. The key insight

> **Independence isn't zero hints forever** — it's proving your workflow works before you ask for help. Phase 2 proof (Stock #121) is the real test.

### 8. Common Day 10 mistakes

| Mistake | Fix |
|---|---|
| Opened hints before independent 10-minute attempt | Timer first, hints second |
| Skipped paper trace on binary search bounds | Trace `target=2` on paper — answer index 1 |
| No stuck-point log on Phase 2 hardest quest | Write: stuck at ___, tried ___ |
| Rushed to Submit without Example 2 | Run all given examples |

### 9. Try it now (60 seconds)

Open Pivot Index or Search Insert — do the 4-part read and one paper trace **before** clicking hints.

---

*Phase 2 proof: Best Time to Buy and Sell Stock — running min, no hints until 10 min. →*
