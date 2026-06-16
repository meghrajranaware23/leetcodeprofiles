<!-- hand-authored -->
# ✅ Day 14 Checkpoint

> **Palindrome DP** · 2 quests completed · ⭐ 85 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 14 = **palindrome on one string** — expand or symmetric interval. **Not** LCS 2D table.

| When you see... | Think... | Why |
|---|---|---|
| "palindromic substring" | Expand around center | #5, #647 |
| "count palindromic substrings" | Expand + count radii | #647 |
| "palindromic subsequence" | **Day 15** `dp[i][j]` LPS | Can skip chars |
| "longest common subsequence" | **Day 13** LCS grid | Two sequences |
| "substring" vs "subsequence" | Contiguous vs skip allowed | Day 14 vs 15 |

### 🧠 Quick Recognition Test

1. *"Longest palindromic substring"* → **Expand** from centers (#5)
2. *"Count palindromic substrings"* → **Same expand**, increment (#647)
3. *"Longest palindromic subsequence"* → **Day 15** — `dp[i][j]` interval, skip middle
4. *"LCS of two strings"* → **Day 13** — not palindrome

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Is s a palindrome?"*

Which pattern? **Two pointers** from ends — O(n), no DP table needed.

**Scenario 2:** *"Longest palindromic subsequence in s."*

Which day? **Day 15 #516** — `dp[i][j]`: match → `dp[i+1][j-1]+2`, else `max(dp[i+1][j], dp[i][j-1])`.

**Scenario 3:** *"Count palindromic subsequences (not substrings)."*

Which pattern? **Different problem** — often harder; not Day 14 expand. Don't confuse with #647.

> **Answer key:** Substring palindrome = expand. Subsequence palindrome = interval DP Day 15.

---

## ⚠ Common Mistakes

1. **LCS grid for palindrome** — Wrong visual — use expand or symmetric interval.
2. **Substring vs subsequence** — #5/#647 contiguous; #516 can delete chars.
3. **Forgetting even-length centers** — Expand `(i, i+1)` not just `(i, i)`.
4. **LPS code on substring problem** — `max(dp[i+1][j], dp[i][j-1])` allows gaps — wrong for #5.
5. **O(n³) all substrings** — Expand achieves O(n²).

---

## 🏋️ Mini Challenge

Without code: how many palindromic substrings in `"aba"`? List them, then verify with expand logic.

> 💡 **Hint:** `a`, `b`, `a`, `aba` → 4.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Palindromic Substring #5](https://leetcode.com/problems/longest-palindromic-substring/) | Medium | Palindrome Expansion/DP |
| [Palindromic Substrings #647](https://leetcode.com/problems/palindromic-substrings/) | Medium | Palindrome Counting DP |

---

*Day 14 complete! Tomorrow: string partition + LPS subsequence. →*
