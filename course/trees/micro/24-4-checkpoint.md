<!-- hand-authored -->
# ✅ Day 24 Checkpoint

> **Advanced Trie** · 2 quests completed · ⭐ 100 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 24 extends **Day 19 trie** with new walk rules. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "search with '.' wildcard" | Trie + DFS all children at dot | Branching not single path |
| "add and search words" | Insert + wildcard search helper | Design #211 |
| "replace with root" / "shortest prefix" | Greedy trie walk, first marker | #648 |
| "implement trie" (Day 19) | Exact insert/search | Base structure unchanged |
| "prefix tree" + dictionary batch | Insert all, then query many | Amortized build |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 24 pattern fires first?

1. *"Search word with '.' matching any letter"* → **Wildcard DFS** on trie
2. *"Replace each word with shortest dictionary root"* → **Prefix replace greedy**
3. *"Check if prefix exists"* → **Day 19** — walk without isEnd requirement |
4. *"Find all words on board matching trie"* → **Grid DFS + trie prune** (B-Rank Word Search II)

---

## 🎯 Transfer to Unseen Problems

You've done Word Dictionary and Replace Words. Can you extend **trie walks**?

**Scenario 1:** *"Longest word in dictionary that can be built one char at a time from prefix set."*

Which pattern? **Trie insert all + DFS/BFS** — only descend if every prefix on path is in dictionary.

**Scenario 2:** *"Map sum of keys with given prefix."*

Which pattern? **Trie with value at nodes** — walk prefix, sum stored weights in subtree.

**Scenario 3:** *"Search pattern with '*' matching any sequence."*

Which pattern? **Harder wildcard** — not Day 24's single-char dot; may need DP + trie combo.

> **Answer key:** Day 24 = **same trie node, different traversal rule** — branch on dot, stop on first root.

---

## ⚠ Common Mistakes

1. **Wildcard: single child on '.'** — must try all non-null children.

2. **Replace: not breaking insert when shorter root exists** — longer words break shortest-root guarantee.

3. **Replace: continuing walk after finding marker** — greedy requires immediate stop.

4. **Confusing prefix search with word search** — replace needs stored word at marker, not just isEnd flag without value.

5. **Using list scan instead of trie** — correct but misses O(m) per token target.

---

## 🏋️ Mini Challenge

### [Implement Trie (Prefix Tree) #208](https://leetcode.com/problems/implement-trie-prefix-tree/)

**[→ Try Implement Trie on LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/)**

Re-implement insert, search, startsWith without looking at Day 19 notes.

**Before you code:** Verify your insert works for both today's quests — addWord and dictionary build use the same path.

> 💡 **Hint:** Day 19 foundation — Day 24 only changes search/replace logic.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Design Add and Search Words Data Structure #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Medium | Trie + Wildcard DFS |
| [Replace Words #648](https://leetcode.com/problems/replace-words/) | Medium | Trie Prefix Matching |

---

*Day 24 complete! Tomorrow: tree distance and re-rooting. →*
