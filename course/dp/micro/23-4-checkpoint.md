<!-- hand-authored -->
# ✅ Day 23 Checkpoint

> **Advanced String DP** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 23 = **2D string grid** with two distinct meanings. Don't use a generic decision tree — pick the right cell logic.

| When you see... | Think... | Why |
|---|---|---|
| "interleaving" / "formed from s1 and s2" | `dp[i][j]` boolean OR | #97 — must use all chars |
| "delete to make equal" | LCS → `m+n-2*LCS` | #583 — delete-only |
| "edit distance" with replace | **Day 21** #72 | Three-way min |
| "longest common subsequence" | **Day 13** #1143 | Building block for #583 |
| "can s3 be built" | Reachability, not max | OR not max |

### 🧠 Quick Recognition Test

1. *"Is s3 an interleaving of s1 and s2?"* → **`dp[i][j]`** = can prefixes form s3[:i+j]? OR if s1[i-1] or s2[j-1] matches s3[i+j-1].
2. *"Min deletions to make two strings equal (delete only)?"* → **LCS table**, answer `m+n-2*dp[m][n]`.
3. *"Min operations to convert word1 to word2 (insert/delete/replace)?"* → **Day 21** — not Day 23.
4. *"Longest common subsequence length?"* → **Day 13** — max on match, not boolean.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum ASCII delete sum for two strings."*

Which pattern? **LCS variant** — same 2D grid but add/delete costs on mismatch instead of counting ops. Still two-sequence DP.

**Scenario 2:** *"Can you form target by interleaving words from two lists?"*

Which pattern? Same **interleaving OR** logic — boolean reachability on two sources.

**Scenario 3:** *"Shortest common supersequence of two strings."*

Which pattern? **Day 13 bridge** — `m + n - LCS` gives length of supersequence containing both.

> **Answer key:** Interleaving = boolean OR grid. Delete-only equalize = LCS formula. Edit with replace = Day 21.

---

## ⚠ Common Mistakes

1. **Edit distance for #583** — Delete-only means LCS, not three-way min.
2. **max instead of OR for #97** — Interleaving is reachability, not optimization.
3. **Skipping length check on s3** — `m+n != len(s3)` → false immediately.
4. **Generic pattern tree instead of specific grid** — Day 23 has concrete 2D templates.
5. **Confusing interleaving with LCS** — LCS skips chars; interleaving uses all of both strings.

---

## 🏋️ Mini Challenge

**word1 = "park", word2 = "spare"** — what's the LCS length? Min deletions?

> 💡 **Hint:** LCS = "pare" (4). Deletions = 4 + 5 - 8 = 1? Wait: 4+5=9, 2*4=8, answer = 1. One side deletes one extra char.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Interleaving String #97](https://leetcode.com/problems/interleaving-string/) | Medium | Two-String Interleave DP |
| [Delete Operation for Two Strings #583](https://leetcode.com/problems/delete-operation-for-two-strings/) | Medium | LCS-Based String DP |

---

*Day 23 complete! Tomorrow: counting with state machines. →*
