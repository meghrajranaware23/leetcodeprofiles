<!-- hand-authored -->
# ✅ Day 21 Checkpoint

> **Subtree Patterns** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 21 splits **subtree aggregate up** vs **path state down**.

| When you see... | Think... | Why |
|---|---|---|
| "subtree sum" / frequency | Postorder + hashmap | #508 |
| "most frequent subtree total" | Return sum, count side effect | Bubble up |
| "good on path from root" | Top-down maxSoFar | #1448 |
| "path sum from root" | **Day 6** remainder | Same direction down |
| "diameter / cross-subtree" | **Day 7** bottom-up global | Not path max |

### 🧠 Quick Recognition Test

1. *"Mode of all subtree sums"* → **Postorder + freq map**
2. *"Nodes ≥ all ancestors"* → **maxSoFar down**
3. *"All root-to-leaf paths with target"* → **Day 6 backtrack**
4. *"Sum of deepest level"* → **Day 22 BFS** — not subtree

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count subtrees with sum exactly k."*

Which pattern? **Postorder sum** — increment counter when `s == k`.

**Scenario 2:** *"Nodes where val equals min on path from root."*

Which pattern? **Top-down minSoFar** — mirror of good nodes.

**Scenario 3:** *"Average of all subtree sums."*

Which pattern? **Postorder sum** — accumulate sum and count of nodes visited.

> **Answer key:** Scenarios 1 & 3 = postorder aggregate. Scenario 2 = top-down min.

---

## ⚠ Common Mistakes

1. **Freq map before children return** — Postorder order matters.
2. **Good nodes: parent compare only** — Use maxSoFar.
3. **Good nodes bottom-up** — Path property needs top-down.
4. **Returning map from dfs instead of sum** — Return int sum.
5. **Forgetting tie handling in #508** — Return all max-freq keys.

---

## 🏋️ Mini Challenge

On one tree, compute subtree sums at every node and list freq map entries. On the same tree, mark good nodes with maxSoFar trace from root.

**Before coding:** When would you choose postorder vs top-down for a new problem?

> 💡 **Hint:** Subtree question → postorder. Root-to-here path question → top-down.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Most Frequent Subtree Sum #508](https://leetcode.com/problems/most-frequent-subtree-sum/) | Medium | Subtree Sum + Frequency |
| [Count Good Nodes in Binary Tree #1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) | Medium | Top-Down Max Tracking |

---

*Day 21 complete! Tomorrow: BFS with parent and depth metadata. →*
