<!-- hand-authored -->
# ✅ Day 13 Checkpoint

> **Two-Sequence DP — LCS** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 13 is the **canonical home** for the LCS 2D table — match ↖, else max(↑, ←).

| When you see... | Think... | Why |
|---|---|---|
| "longest common subsequence" | `dp[i][j]` 2D table | #1143 |
| "two strings" / "two arrays" | Prefix pair state | Two indices |
| "uncrossed lines" / "non-crossing matches" | LCS disguise | #1035 |
| "increasing subsequence" one array | **Day 12** 1D trace | Not 2D LCS |
| "repeated subarray" / contiguous | `dp[i][j]` but match extends only if adjacent | Different recurrence |
| "palindrome" | **Day 14** expand / interval | Not LCS |

### 🧠 Quick Recognition Test

1. *"LCS of two strings"* → **2D fill**, match diagonal +1 (#1143)
2. *"Max lines connecting equal values without crossing"* → **LCS on arrays** (#1035)
3. *"LIS in one array"* → **Day 12** — 1D, not this table
4. *"Longest common substring (contiguous)"* → Match only if `dp[i-1][j-1]+1` **and** chars equal; reset on mismatch — not plain LCS

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum deletions to make two strings equal."*

What's the state? **LCS length L** → answer = `m + n - 2*L` (delete non-LCS chars from both).

**Scenario 2:** *"Longest repeated subarray (contiguous block in both)."*

What's different? **Contiguous** — `dp[i][j] = dp[i-1][j-1]+1` only on match; else **0**, not max(up,left).

**Scenario 3:** *"Wiggle subsequence in one array."*

Which day? **Day 16** — directional states, not two-sequence LCS.

> **Answer key:** Two sequences + order-preserving skip = LCS. One sequence = Day 12.

---

## ⚠ Common Mistakes

1. **Using LIS 1D for two strings** — Need `dp[i][j]`.
2. **+1 on mismatch** — Only add 1 when characters **match**.
3. **Confusing LCS with longest common substring** — Substring resets on mismatch.
4. **Wrong answer cell** — `dp[m][n]` with (m+1)×(n+1) padding.
5. **Drawing LCS grid on Day 12** — Canonical visual is **Day 13 only**.

---

## 🏋️ Mini Challenge

Without code: LCS length of `nums1=[1,2,3]`, `nums2=[2,3,1]` — fill the 2D table on paper.

> 💡 **Hint:** Answer is 2 (`2,3` or `1` pairs depending on order — trace the table).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) | Medium | Classic LCS DP |
| [Uncrossed Lines #1035](https://leetcode.com/problems/uncrossed-lines/) | Medium | LCS in Visual Disguise |

---

*Day 13 complete! Tomorrow: palindrome DP — expand or interval, not LCS. →*
