<!-- hand-authored -->
# ✅ Day 14 Checkpoint

> **Backtracking on Strings** · 2 quests completed · ⭐ 85 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Base case |
|---|---|---|
| "partition string" / palindrome parts | Cut loop + pal check | `i == n` |
| "restore IP" / fixed k segments | Cut loop + octet check | `parts == k && i == n` |
| "split into words" (dictionary) | Cut loop + dict check (Day 21) | `i == n` |
| "Fibonacci sequence split" | Cut loop + sum constraint (C-Rank test) | `i == n`, len ≥ 3 |

### 🧠 Quick Recognition Test

1. *"All palindrome partitions of a string"* → **Cut from i, pal-check, dfs(j+1).**

2. *"All valid IP addresses from digits"* → **4 parts, octet validation, max 3 chars per cut.**

3. *"Combination sum to target"* → **Day 13 — not string partition.**

4. *"Minimum palindrome cuts"* → **DP (#132), not generate-all.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Split a string into words from a dictionary."*

Word Break II — same cut loop, `valid = word in dict`.

**Scenario 2:** *"Split digits into a Fibonacci sequence."*

C-Rank test #3 — cut loop + each new segment must equal sum of previous two.

**Scenario 3:** *"Add operators to make an expression equal target."*

Different pattern — insert operators between chars (Day 20).

---

## ⚠ Common Mistakes

1. **Recurse with `i` not `j+1`** — Doesn't consume the segment.
2. **IP: record when parts==4 but i≠n** — Leftover digits or too-short string.
3. **Accept leading zeros in octets** — `"01"` invalid.
4. **Palindrome: forget to pop segment** — Stale path entries.

---

## 🏋️ Mini Challenge

Write the partition dfs pseudocode from memory (5 lines). Label: choose, explore, unchoose.

Then name the two validators for today's quests.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) | Medium | cut + palindrome |
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | Medium | 4 octets |

---

*Day 14 complete. Tomorrow: combination sum constraints tighten. →*
