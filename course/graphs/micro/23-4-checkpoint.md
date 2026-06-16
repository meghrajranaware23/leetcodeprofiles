<!-- hand-authored -->
# ✅ Day 23 Checkpoint

> **Advanced State BFS** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 23 = **implicit graphs** — neighbors generated on the fly, same `(state, steps)` BFS as Day 10 but different domains.

| When you see... | Think... | Why |
|---|---|---|
| "One letter changed" + word list | Word-ladder BFS | Dict shrinks on visit |
| "Roll dice" + snakes/ladders | Square-index BFS | 6 edges per square |
| "Minimum transformations" | BFS not DFS | Unweighted shortest |
| "Combination lock / deadends" | **Day 10** | Wheel twists — different quest |
| "Grid island / 4-directional" | **Day 4** | Spatial grid, not abstract state |

### 🧠 Quick Recognition Test

1. *"Shortest word chain hit→cog with dictionary"* → **Implicit word BFS**, erase on enqueue
2. *"Minimum rolls to reach last square on board"* → **Square BFS + zigzag label + teleport**
3. *"Open lock from 0000 with deadends"* → **Day 10 state-space**, not Day 23 quest
4. *"endWord not in wordList"* → **Return 0** before BFS

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum mutations from start gene to end gene using bank."*

Which pattern? **Day 10 state-space BFS** — 8-char string, bank as allowed set. Same skeleton, gene neighbor function.

**Scenario 2:** *"Minimum operations: start number, add/subtract any of nums[] to reach goal."*

Which pattern? **Bounded implicit BFS** — node = integer in [0,1000], A-test #2059 cousin.

**Scenario 3:** *"Shortest path in binary matrix."*

Which pattern? **Day 8 grid BFS** — `(r,c,steps)`, not implicit word/board graph.

> **Answer key:** Scenarios 1–2 = state/implicit BFS family. Scenario 3 = explicit grid.

---

## ⚠ Common Mistakes

1. **Pre-building full word adjacency** — generate 26·L neighbors per word instead.
2. **Wrong zigzag square mapping** — trace label(1), label(n), label(n²) by hand.
3. **Forgetting teleport in same roll** — snake/ladder applies to landing square.
4. **DFS for minimum steps** — BFS guarantees shortest in unweighted implicit graphs.
5. **Confusing Day 10 lock prose with word ladder** — different neighbor generators.

---

## 🏋️ Mini Challenge

Before Day 24, say the pattern in 30 seconds for each:

| Problem | Pattern name |
|---|---|
| Word Ladder #127 | Implicit word graph BFS |
| Snakes and Ladders #909 | Square-index BFS + teleport |
| Open the Lock #752 | Day 10 state-space (review) |

**Draw:** 3-word mini ladder and 4-square board with one ladder. Trace BFS layers.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Word Ladder #127](https://leetcode.com/problems/word-ladder/) | Hard | Implicit Word Graph BFS |
| [Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/) | Medium | Implicit Board Graph BFS |

---

*Day 23 complete! Tomorrow: build graphs from geometry and trees. →*
