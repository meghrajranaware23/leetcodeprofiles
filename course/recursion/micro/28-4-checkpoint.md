<!-- hand-authored -->
# ✅ Day 28 Checkpoint

> **Recursive Synthesis I** · 2 quests completed · ⭐ 150 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 28 revisited **Day 14 string partition** with S-Rank upgrades. Hear the signal:

| When you see... | Think... | S-Rank upgrade |
|---|---|---|
| "partition string" + palindrome parts | Cut loop + pal check | `isPal[i][j]` precompute |
| "restore IP" / exactly 4 octets | Cut max 3 + octet valid | remaining-length bounds prune |
| "minimum palindrome cuts" (#132) | Same `isPal` table | DP not generate-all |
| "split into words" (dictionary) | Cut loop + dict (Day 21) | trie or hash set lookup |

### 🧠 Quick Recognition Test

1. *"All palindrome partitions — optimize validation"* → **`isPal[i][j]` table, O(1) per cut.**

2. *"Restore IP from `25525511135`"* → **Two answers. Length prune + octet check.**

3. *"Combination sum to target"* → **Day 13 — not string partition.**

4. *"Generate all, pal check is bottleneck"* → **Precompute before dfs.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Split a string into dictionary words (Word Break II)."*

Same cut loop — validator becomes `word in dict`. Optional trie for O(1) prefix prune.

**Scenario 2:** *"Minimum cuts for palindrome partition (#132)."*

Same `isPal[i][j]` — but DP: `dp[i] = min cuts for s[i..]`. Different output, same precompute.

**Scenario 3:** *"Split digits into Fibonacci sequence."*

C-Rank test — cut loop + segment must extend Fibonacci sum rule.

> **Answer key:** All three start with Day 14's cut skeleton. The **validator layer** and **prune hooks** change.

---

## ⚠ Common Mistakes

1. **Fill `isPal` in wrong order** — extend from length-1 substrings upward.
2. **IP: skip length prune** — wastes frames on impossible suffix lengths.
3. **IP: record when parts==4 but i≠n** — leftover digits invalid.
4. **Palindrome: forget pop** — stale segments in sibling branches.
5. **Confuse #131 (generate) with #132 (min cuts)** — same `isPal`, different algorithm.

---

## 🏋️ Mini Challenge

From memory, write:
1. The `isPal[i][j]` recurrence (one line).
2. The IP remaining-length bounds check (one line).
3. The Day 14 partition dfs pseudocode (5 lines: choose, explore, unchoose).

Then solve one revisit quest on LeetCode without notes.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | Medium | 4 octets + length prune |
| [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) | Medium | cut + `isPal` precompute |
| [Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/) | Hard | same `isPal`, min-cuts DP |

---

*Day 28 complete. Tomorrow: recursive pattern matching — the hardest prose in the pack. →*
