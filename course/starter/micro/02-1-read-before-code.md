<!-- hand-authored -->
# 📝 Guide: Read Before You Code

> **Day 2** · 4-Part Problem Reading Framework · ★☆☆☆☆ · 10 XP · 8 min read

---

**Your mission today:** *Understand the problem completely before opening your editor.*

**Learning objective:** Apply the 4-part reading framework (title → constraints → examples → output)

**Bridge from Day 1:** Yesterday you learned the platform loop. Today you slow down the **Read** step — most Wrong Answers come from misreading, not bad logic.

---

## Part 1 — 4-Part Problem Reading Framework

### 1. Why reading is a skill

You can write perfect code for the wrong problem. The 4-part framework takes 90 seconds and prevents hours of debugging.

### 2. The skill in one sentence

> **Read title → constraints → examples → output format** — in that order, twice (fast, then slow).

### 3. The framework (annotated on Palindrome Number)

```
Palindrome Number #9
────────────────────────────────────────────────────────
① TITLE     "Is this integer a palindrome?"
            → No string conversion hint in title; think digits

② CONSTRAINTS
            -2^31 <= x <= 2^31 - 1
            → x can be NEGATIVE → -121 is NOT a palindrome
            → x = 0 is valid → single digit counts

③ EXAMPLES
            x = 121  → true   (reads same forward/backward as digits)
            x = -121 → false  (negative + ends in 1)
            x = 10   → false  (trailing zero — not same reversed)

④ OUTPUT     Return boolean true/false — not the reversed number
```

### 4. Read twice: fast scan, slow audit

| Pass | Goal | Time |
|------|------|------|
| **Fast** | One-sentence problem summary | 20 sec |
| **Slow** | Every constraint → one edge case | 60 sec |

### 5. What strong readers do

| Weak habit | Strong habit |
|---|---|
| Skim title and open editor | Write 4-part notes before coding |
| Ignore negative numbers in constraints | List "what if x < 0?" from Example 2 |
| Assume output format | Confirm: boolean vs array vs string |
| Read examples once | Ask: "Which example would break a lazy solution?" |
| Skip output-format problems | Defanging IP: exact punctuation matters |

### 6. The key insight

> **Examples are free test cases.** Example 3 (`x = 10`) exists because many solvers forget trailing zeros.

### 7. Common Day 2 mistakes

| Mistake | Fix |
|---|---|
| Treating negative numbers as palindromes | Example 2 exists — read it |
| Returning reversed integer instead of bool | Part ④ — output format |
| Ignoring string output punctuation | Defanging IP: `[.]` not `.` literally in output spec |
| Reading once at full speed | Fast pass + slow pass |

### 8. Try it now (60 seconds)

Open [Palindrome Number #9](https://leetcode.com/problems/palindrome-number/) — fill in the 4-part card on paper **without** coding.

---

*You've got the reading lens. Today's quests reward slow reading. →*
