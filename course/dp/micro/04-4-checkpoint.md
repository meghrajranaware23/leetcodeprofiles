<!-- hand-authored -->
# ✅ Day 4 Checkpoint

> **The DP Framework** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 4 = **state checklist + space optimization**:

| When you see... | Think... | Why |
|---|---|---|
| New DP problem | Run 7-step checklist first | State before code |
| "return row k of triangle" | 1-row rolling Pascal | O(k) not O(k²) |
| "generated array" with rules | Formula tabulation + answer type | max vs last cell |
| In-place row update | **Right-to-left** inner loop | Preserve row[j-1] |
| "optimize space" follow-up | Checklist step 7 | Roll rows / vars |

### 🧠 Quick Recognition Test

1. *"Max in generated array with even/odd rules"* → **Tabulate nums[i]; track max; bases 0,1**
2. *"Pascal row k only"* → **One row; j from i-1 down to 1; row[j]+=row[j-1]**
3. *"Why right-to-left?"* → **Left-to-right overwrites parent before use**
4. *"Checklist step 6 for generated array?"* → **max(nums), not nums[n]**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Return only the final row of a grid DP path-count triangle."*

Same as Pascal II — if only last row needed, roll.

**Scenario 2:** *"Array where a[i] = a[i-1] + a[i-2] for i≥2, return max in first n terms."*

Checklist: state clear; answer is **max**, not a[n] — like Generated Array.

**Scenario 3:** *"Interviewer asks optimize Pascal I space."*

Generate row-by-row, keep previous row only — don't store res[][].

> **Answer key:** Day 4 = **checklist discipline** + **rolling when only recent row matters**.

---

## ⚠ Common Mistakes

1. **Skipping state sentence** — Leads to wrong transition copied from another problem.

2. **Left-to-right Pascal II update** — Classic wrong fill order.

3. **Returning nums[n] on max problems** — Answer extraction error.

4. **Building full triangle for row-only query** — Correct but fails space interview follow-up.

5. **Forgetting even/odd branch** — Generated array needs both transitions.

---

## 🏋️ Mini Challenge

Solve **Pascal's Triangle II #119** twice:

1. Using Day 3 full triangle — return last row.
2. Using Day 4 rolling row — compare memory.

Write the 7-step checklist for both — steps 5 and 7 differ.

> 💡 **Hint:** If inner loop direction feels wrong, trace row 3 on paper with arrows.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Get Maximum in Generated Array #1646](https://leetcode.com/problems/get-maximum-in-generated-array/) | Easy | Formula-Driven Tabulation |
| [Pascal's Triangle II #119](https://leetcode.com/problems/pascals-triangle-ii/) | Easy | Space-Optimized Tabulation |

---

*Day 4 complete! Tomorrow: decisions at each step — running min and Kadane. →*
