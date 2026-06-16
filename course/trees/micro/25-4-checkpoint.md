<!-- hand-authored -->
# ✅ Day 25 Checkpoint

> **Tree Distance** · 2 quests completed · ⭐ 130 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 25 combines **graph-view trees** with **Day 7 diameter** extensions. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "sum of distances from each node" | Re-root Pass 1 + Pass 2 | #834 — O(n) not O(n²) |
| "reroot" / "answer for all roots" | ans[v] = ans[u] - cnt[v] + (n-cnt[v]) | Local edge adjustment |
| "parent array" tree | Build children adjacency | N-ary representation |
| "longest path" + letter constraint | Top-two + skip same s[child] | #2246 |
| "diameter" binary (Day 7) | top1 + top2, return height | Binary special case |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 25 pattern fires first?

1. *"Return sum of distances from every node to all others"* → **Re-rooting two-pass**
2. *"Longest path where adjacent nodes have different chars"* → **N-ary diameter + letter filter**
3. *"Diameter of binary tree"* → **Day 7** — left/right top-two
4. *"Count nodes in each subtree"* → **Pass 1 only** — cnt array from reroot Pass 1

---

## 🎯 Transfer to Unseen Problems

You've done Sum of Distances and Longest Path Different Chars. Can you extend **tree DP on graphs**?

**Scenario 1:** *"Find the minimum height of all root choices (centroids)."*

Which pattern? **Leaf trimming / topological** — not reroot, but same "all roots" theme. Two passes or peel leaves.

**Scenario 2:** *"Maximum score splitting tree at one edge."*

Which pattern? **Subtree counts from Pass 1** — score = cnt[v] × (n - cnt[v]) for edge parent-v.

**Scenario 3:** *"Longest path in N-ary tree without constraints."*

Which pattern? **Same top-two** as #2246 but no letter skip — pure Day 7 on children list.

> **Answer key:** Day 25 = **subtree counts unlock global metrics** + **filtered top-two combine**.

---

## ⚠ Common Mistakes

1. **BFS from every node for #834** — O(n²); use reroot formula.

2. **Wrong reroot sign** — subtract cnt[child], add (n - cnt[child]).

3. **Directed edges only in graph build** — undirected tree needs both directions.

4. **N-ary: binary left/right** — loop all children from parent array.

5. **Forgetting letter filter in top-two** — same char child must not contribute.

---

## 🏋️ Mini Challenge

### [Diameter of N-Ary Tree #1245](https://leetcode.com/problems/tree-diameter/)

**[→ Try Tree Diameter on LeetCode](https://leetcode.com/problems/tree-diameter/)**

Find longest path in an undirected tree (edge list, not parent array).

**Before you code:** Two BFS from farthest node, OR two-pass height like today's N-ary DFS without letter filter.

> 💡 **Hint:** Same top-two intuition as #2246 — constraint removed.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Sum of Distances in Tree #834](https://leetcode.com/problems/sum-of-distances-in-tree/) | Hard | Re-rooting Technique |
| [Longest Path With Different Adjacent Characters #2246](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/) | Hard | N-ary Diameter Variant |

---

*Day 25 complete! Tomorrow: Morris traversal and O(1)-space inorder. →*
