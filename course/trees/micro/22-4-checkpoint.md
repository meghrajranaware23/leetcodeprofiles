<!-- hand-authored -->
# ✅ Day 22 Checkpoint

> **Advanced BFS** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 22 is **metadata-rich BFS** — parent, depth, level sums.

| When you see... | Think... | Why |
|---|---|---|
| "cousins" | Same depth, different parent | #993 |
| "(node, parent, depth)" queue | Day 22 NEW vs Day 17 | Parent required |
| "deepest leaves sum" | Sum last BFS wave | #1302 |
| "bottom-left value" | **Day 17** — first of last level | One node, not sum |
| "level order traversal" | **Day 3 / Day 9** | Full level lists |

### 🧠 Quick Recognition Test

1. *"Are x and y cousins?"* → **Parent + depth tracking**
2. *"Sum of all nodes at maximum depth"* → **BFS level accumulation**
3. *"Leftmost node in last row"* → **Day 17 level-end first**
4. *"Vertical column grouping"* → **Day 17 column map**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"All nodes at distance k from root."*

Which pattern? **BFS with depth** — stop or collect at depth k (Day 3 extension).

**Scenario 2:** *"Check if two nodes are siblings."*

Which pattern? **Same depth + same parent** — inverse of cousins.

**Scenario 3:** *"Product of deepest level nodes."*

Which pattern? **Same as #1302** — multiply instead of sum in last wave.

> **Answer key:** All three use BFS level/metadata from Days 3, 9, 22.

---

## ⚠ Common Mistakes

1. **Cousins: depth match only** — Siblings share parent.
2. **Missing parent on enqueue** — Push `(child, node, d+1)`.
3. **Deepest sum: first node only** — Sum entire last level.
4. **Not resetting level_sum** — Must zero each batch.
5. **Confusing with Day 17 column BFS** — Different metadata.

---

## 🏋️ Mini Challenge

Draw a tree with cousins (e.g. nodes under different parents at depth 3). Trace BFS queue with parent pointers. Then compute deepest level sum on the same tree.

**Before the B-Rank test:** Say how Day 22 BFS differs from Day 17 in one phrase.

> 💡 **Hint:** Day 22 tracks **relationships** (parent); Day 17 tracks **views** (column / first-node).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Cousins in Binary Tree #993](https://leetcode.com/problems/cousins-in-binary-tree/) | Easy | BFS Parent Tracking |
| [Deepest Leaves Sum #1302](https://leetcode.com/problems/deepest-leaves-sum/) | Medium | BFS Depth Accumulation |

---

*Day 22 complete! B-Rank test next — trie+grid, stack iterator, camera DP. →*
