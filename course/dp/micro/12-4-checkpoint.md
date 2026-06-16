<!-- hand-authored -->
# ✅ Day 12 Checkpoint

> **Subsequence DP — LIS** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 12 is **1D subsequence on one array** — `dp[i]` ending at `i`, scan `j < i`. **Not** the LCS 2D grid (that's Day 13).

| When you see... | Think... | Why |
|---|---|---|
| "longest increasing subsequence" | `dp[i]=max(dp[j]+1)`, `j<i`, strict `<` | Classic LIS |
| "number of longest increasing" | `len[i]` + `cnt[i]` parallel arrays | #673 |
| "subsequence" on **one** array | 1D backward scan | Day 12 |
| "two strings" / "common subsequence" | **Day 13** LCS table | Two indices |
| "substring" / "contiguous" | Often expand or interval DP | Day 14 |
| "grid paths" | **Day 11** | 2D cell DP |

### 🧠 Quick Recognition Test

1. *"LIS length in one array"* → **dp[i] ending at i**, answer `max(dp)` (#300)
2. *"How many LIS of max length?"* → **len + cnt**, sum cnt at maxLen (#673)
3. *"LCS of two strings"* → **Day 13** — `dp[i][j]`, not Day 12
4. *"Longest increasing — can you use tails?"* → **Length only** — yes O(n log n); **counting** — no, need O(n²)

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Longest decreasing subsequence in an array."*

What's the state? **Same as LIS** — flip comparison to `nums[j] > nums[i]`, or reverse array and run LIS.

**Scenario 2:** *"Count paths with strictly increasing values in a DAG."*

What's the state? **LIS-style on topological order** — `dp[v] = max/sum over predecessors with smaller value`.

**Scenario 3:** *"Longest common subsequence of two arrays."*

Which day? **Day 13** — `dp[i][j]` on two prefixes. Don't use Day 12's 1D trace.

> **Answer key:** One array + monotonic subsequence = Day 12. Two sequences = Day 13.

---

## ⚠ Common Mistakes

1. **Returning dp[n-1]** — LIS may peak before the last index.
2. **Using LCS 2D visual for LIS** — 1D `dp[i]` trace only on Day 12.
3. **tails+binary search for #673** — Cannot count ways; use `len`/`cnt` O(n²).
4. **Forgetting strict `<`** — Equal values don't extend increasing subsequence.
5. **On cnt tie: adding when length improved** — Replace cnt on better length; add only on **equal** length.

---

## 🏋️ Mini Challenge

On paper, fill `len` and `cnt` for `nums = [2,2,2,2,2]` without coding.

**Before you peek:** What's maxLen? What's the answer count?

> 💡 **Hint:** No strict increase possible beyond length 1 — five separate length-1 subsequences.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) | Medium | Classic LIS DP |
| [Number of Longest Increasing Subsequence #673](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) | Medium | LIS + Counting |

---

*Day 12 complete! Tomorrow: two-sequence DP — the LCS table's home. →*
