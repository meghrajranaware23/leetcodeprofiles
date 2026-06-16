<!-- hand-authored -->
# ✅ Day 21 Checkpoint

> **Backtracking + Memoization Bridge** · 2 quests completed · ⭐ 70 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "segment string" / "word break" / dict cuts | Index recursion `dfs(i)` | Loop `j`, check `s[i..j]`, recurse `dfs(j)` |
| "true/false" + same suffix revisited | Boolean index memo | `memo[i] = true/false`; cache failures |
| "all sentences" / "all partitions" + overlap | List index memo | `memo[i] = [...]`; combine word + cached tails |
| "partition" without dict overlap worry | Pure backtrack (Day 14) | push/pop path; each `i` advances |
| "how many ways" + index overlap | Count memo (Day 23 preview) | `memo[i] += dfs(j)` |

### 🧠 Quick Recognition Test

1. *"Can `s` be segmented using dictionary words?"* → **WB I.** Bool memo on index. Base `i==n` → true.

2. *"Return every valid spaced sentence."* → **WB II.** List memo. Base → `[""]`. Combine `w + tail`.

3. *"Return all palindrome partitions of a string."* → **Day 14 backtrack.** push/pop segments. No index memo needed for correctness.

4. *"Decode ways — count segmentations by digit rules."* → **Day 23.** Index memo with integer count.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given `s` and word list, return the minimum number of words needed to segment `s`."*

Which pattern? **Index memo / bottom-up DP.** Same cut loop as WB I, but store min word count at each index instead of bool. Overlap identical.

**Scenario 2:** *"Given `s`, return one valid segmentation (not all)."*

Which pattern? **WB I bool dfs** — stop at first success. No list memo needed.

**Scenario 3:** *"Concatenate words from a list to form a string — find all starting indices."*

Which pattern? **Different problem** — sliding window + hash, not index memo. Don't force WB template.

> **Answer key:** Scenarios 1–2 → index memo family from today. Scenario 3 → different technique.

---

## ⚠ Common Mistakes

1. **Memo key = path of words** — Key is start index `i` only. Suffix determines the subproblem.

2. **Not caching false (WB I)** — Dead suffixes get recomputed exponentially without `memo[i]=false`.

3. **WB II base case `[]` instead of `[""]`** — Empty tail breaks the combine step for the final word.

4. **Using push/pop path for WB I** — Return-value recursion; no shared mutable path.

5. **Skipping memo on WB II** — Correct but TLE; the whole point of today is overlap recognition.

---

## 🏋️ Mini Challenge

On paper, draw the tree for `s = "catsanddog"` with dict `{cat,cats,and,sand,dog}`.

Label `memo[7]`, `memo[3]`, `memo[0]`. Say aloud what each stores before coding WB II from memory.

> 💡 **Check:** `memo[7]=["dog"]`, `memo[3]=["sand dog"]`, `memo[0]=["cat sand dog","cats and dog"]`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Word Break #139](https://leetcode.com/problems/word-break/) | Medium | Boolean index memo |
| [Word Break II #140](https://leetcode.com/problems/word-break-ii/) | Medium | List index memo + combine |

---

## 🔭 A-Rank Preview

Tomorrow (Day 22) stays in backtracking. Day 23 generalizes today's memo idea to **top-down DP** — House Robber, Decode Ways. The habit you're building: **trace the tree, circle repeated states, cache them.**

---

*Day 21 complete. Tomorrow: two constraint flavors on the same backtracking skeleton. →*
