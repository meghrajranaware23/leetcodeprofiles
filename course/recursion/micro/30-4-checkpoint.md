<!-- hand-authored -->
# ✅ Day 30 Checkpoint

> **The Final Ascension** · 2 quests completed · ⭐ 170 XP earned

---

## 🔍 Pattern Signals — Capstone Recognition Drill

Day 30 closes the pack. Route each signal through the **full decision tree**:

| When you see... | Think... | Key day |
|---|---|---|
| multiple words on grid | Trie + mark/unmark dfs | 16 + 30 |
| single word on grid | Grid dfs, word index k | 16 |
| N-Queens / all boards | Row dfs + cols/d1/d2 + snapshot | 18 + 30 |
| N-Queens count only | Same dfs, ans++ | 18 |
| regex / wildcard match | (i,j) memo, star branches | 29 |
| partition + optimize check | isPal precompute / length prune | 28 |
| generate all + prefix shared | Trie or sort+dedupe | 30, 15 |

### 🧠 Quick Recognition Test

1. *"Find all dictionary words in a grid"* → **Trie + Day 16 grid backtrack.**

2. *"Return all N-Queens configurations"* → **Day 18 constraints + board snapshot.**

3. *"Count N-Queens solutions"* → **Same dfs, increment counter — no board storage.**

4. *"Match regex with `.` and `a*`*" → **Day 29 — NOT backtracking.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Word Search II with wildcards in dictionary."*

Trie nodes + modified match — still grid mark/unmark core.

**Scenario 2:** *"Place k knights on board without attacking."*

Same CSP backtrack as N-Queens — different constraint function.

**Scenario 3:** *"You have 30 seconds — name the pattern."*

Run the capstone decision tree from Day 30 concept. That's the S-Rank skill.

> **Answer key:** You have seen every branch. The interview tests **routing speed**, not new algorithms.

---

## ⚠ Common Mistakes

1. **Word Search II without trie** — TLE on large word lists.
2. **Forget grid unmark** — `'#'` leaks (Day 16 rule still applies).
3. **N-Queens: scan board for attacks** — use sets (Day 18).
4. **Confuse #51 generate vs #52 count** — same dfs, different output.
5. **Skip pattern naming** — decision tree before code, always.

---

## 🏋️ Mini Challenge

Without notes:
1. Draw the capstone decision tree (4 levels).
2. Write trie+grid dfs pseudocode (8 lines).
3. Write N-Queens dfs pseudocode with cols/d1/d2 (10 lines).

Then take the S-Rank tests.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Word Search II #212](https://leetcode.com/problems/word-search-ii/) | Hard | Trie + grid |
| [N-Queens #51](https://leetcode.com/problems/n-queens/) | Hard | Full CSP generation |
| S-Rank tests | Hard | Pattern recognition under pressure |

---

## 🏆 You Are at the Summit

Thirty days. Every pattern in the decision tree is yours.

> *"I alone level up." — Trace first. Name second. Code third. Legend confirmed after the S-Rank tests.*

---

*Day 30 complete. Take the S-Rank tests to confirm Legend status. →*
