<!-- hand-authored -->
# ✅ Day 10 Checkpoint

> **State-Space BFS** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 10 is **abstract states** — NOT grid `(r,c)` BFS.

| When you see... | Think... | Why |
|---|---|---|
| "combination lock" / digit wheels | State = full string; `(state, steps)` | Open the Lock |
| "gene mutation" / "bank of valid" | State = gene; bank = allowed set | Genetic Mutation |
| "deadends" | Dead-end set — never enqueue | Permanent blocked states |
| "grid" / "matrix" / "4-directional" | **Days 2–8** — not Day 10 | Spatial vs configuration |
| "shortest path in maze" | Day 8 grid BFS | Coordinates, not strings |

### 🧠 Quick Recognition Test

1. *"Minimum turns on 4-wheel lock with banned combos"* → **State-space BFS** `(lock, steps)` + deadends
2. *"Minimum mutations from startGene to endGene using bank"* → **State graph BFS** — bank filter
3. *"Shortest path in binary matrix"* → **Day 8** — grid layers, not strings
4. *"01 matrix distance to nearest 0"* → **Day 6** — multi-source on grid

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum moves to solve sliding puzzle 2×3."*

Which pattern? **State-space BFS** — board as string `"123450"`, generate slide neighbors, `(state, steps)`.

**Scenario 2:** *"Word ladder: change one letter at a time to reach end word."*

Which pattern? **State BFS on words** — same skeleton as Genetic Mutation; dictionary replaces bank.

**Scenario 3:** *"Rotting oranges in a grid."*

Which pattern? **Day 6 multi-source grid BFS** — has `(r,c)`, not abstract string states.

> **Answer key:** Scenarios 1–2 = Day 10. Scenario 3 = grid — wrong tool if you use string states.

---

## ⚠ Common Mistakes

1. **Using grid `dirs` array on lock/gene problems** — Generate string neighbors, not `(r,c)`.
2. **DFS for minimum moves** — BFS required for shortest transformation.
3. **Forgetting start in deadends / end not in bank** — Early -1 checks.
4. **No visited on states** — Revisit same string → infinite queue growth.
5. **Confusing with Day 8 `(r,c,steps)`** — Same tuple **shape**, different **state type**.

---

## 🏋️ Mini Challenge

### [Word Ladder #127](https://leetcode.com/problems/word-ladder/)

**[→ Try Word Ladder on LeetCode](https://leetcode.com/problems/word-ladder/)**

BeginWord → endWord changing one letter; wordList = bank. Pure Day 10 extension — often seen in C-Rank but you have the skeleton now.

**Before you code:** List what's identical to Open the Lock vs what changes.

> 💡 **Hint:** State = word string; dead-end = not in wordList; same BFS queue.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) | Medium | State-Space BFS |
| [Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/) | Medium | State Graph BFS |

---

*Day 10 complete! D-Rank tests next — prove Days 6–8 on unseen problems. →*
