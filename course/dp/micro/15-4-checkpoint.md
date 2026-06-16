<!-- hand-authored -->
# ✅ Day 15 Checkpoint

> **String Decision DP** · 2 quests completed · ⭐ 85 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 15 = **prefix partition** OR **interval LPS subsequence** — not Day 14 expand.

| When you see... | Think... | Why |
|---|---|---|
| "word break" / "segment into words" | Prefix `dp[i]`, try cuts `j` | #139 |
| "palindromic subsequence" | Interval `dp[i][j]`, skip ends | #516 |
| "palindromic substring" | **Day 14** expand | Contiguous |
| "prefix reachable" / "can segment" | Boolean `dp[i]` | Word Break |
| "LCS two strings" | **Day 13** | Two sequences |

### 🧠 Quick Recognition Test

1. *"Can s be built from dictionary words?"* → **dp[i] prefix**, `dp[j]+word` (#139)
2. *"Longest palindromic subsequence"* → **dp[i][j] interval**, i descending (#516)
3. *"Longest palindromic substring"* → **Day 14 expand** — not LPS recurrence
4. *"bbbab" — substring vs subsequence max?"* → Substring 3 (`bbb`), subsequence 4 (`bbbb`)

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum cuts to partition s into palindrome substrings."*

Which pattern? **Prefix DP + palindrome precheck** — `dp[i]` = min cuts for prefix; combine with `isPalin[j..i]`.

**Scenario 2:** *"Decode ways for digit string 1-26 mapping."*

Which pattern? **Prefix counting** — like Word Break but count ways, fixed 1-2 char splits.

**Scenario 3:** *"Longest palindromic substring."*

Which day? **Day 14 #5** — expand, not Day 15 LPS.

> **Answer key:** Partition = prefix `dp[i]`. LPS = interval `dp[i][j]` with skip. Substring palindrome = Day 14.

---

## ⚠ Common Mistakes

1. **Expand for LPS** — Subsequence needs max of one-end-shorter intervals.
2. **LPS recurrence on substring problem** — Skipping chars breaks contiguity.
3. **Word Break: forget dp[0]=true** — Empty prefix base case.
4. **Wrong LPS fill order** — `i` must descend so `dp[i+1][j-1]` is ready.
5. **Confusing Day 14 vs 15 on "palindrome"** — Read substring vs subsequence in statement.

---

## 🏋️ Mini Challenge

State the Day 14 vs Day 15 difference in one sentence using `"bbbab"` as the example.

> 💡 **Hint:** Substring max length 3; subsequence max length 4 — skipping `'a'` is allowed only in subsequence.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Word Break #139](https://leetcode.com/problems/word-break/) | Medium | String Partition DP |
| [Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/) | Medium | 2D Palindrome DP |

---

*Day 15 complete! Tomorrow: sequence variants — wiggle and pair chains. →*
