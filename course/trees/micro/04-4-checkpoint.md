<!-- hand-authored -->
# ✅ Day 4 Checkpoint

> **Tree Properties** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 4 extends **↑ bottom-up** from Day 1 with **predicates** and **shape math**. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "balanced binary tree" | ↑ height + abs diff check | One pass; early exit |
| "height difference at most 1" | Combine at parent | Not separate height per node O(n²) |
| "complete binary tree" + count | Left/right spine heights | `2^h - 1` when equal |
| "count nodes" (general) | `1 + L + R` or BFS | Complete → O(log² n) shortcut |
| "return height" + bool | Height bubble + flag | Same frame as #104 |
| "perfect binary tree" | Both spines equal | Full level formula |
| "max depth" (Day 1) | `1 + max(L,R)` always | No predicate — contrast today |
| "level order" (Day 3) | BFS — not property bubble | Horizontal vs vertical combine |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 4 pattern fires first?

1. *"Check if binary tree is height-balanced"* → **↑ height + |L−R|≤1**
2. *"Count nodes in a complete binary tree"* → **Spine heights + `2^h−1` shortcut**
3. *"Max depth of any tree"* → **Day 1** — `1 + max(L,R)`, no balance check
4. *"Recompute maxDepth at every node for balance"* → **Brute force O(n²)** — avoid

---

## 🎯 Transfer to Unseen Problems

You've done Balanced and Count Complete. Can you extend **↑ bubble** with extra logic?

**Scenario 1:** *"Return the diameter of a binary tree (longest path between any two nodes)."*

Which pattern? **↑ height return + global max** — at each node, candidate diameter = `leftH + rightH`. Same postorder timing as balance check.

**Scenario 2:** *"Count nodes in a general (not complete) binary tree."*

Which pattern? **↑ `1 + count(L) + count(R)`** or simple DFS — O(n). No spine shortcut without complete guarantee.

**Scenario 3:** *"Check if subtree is a perfect binary tree."*

Which pattern? **Spine heights from Quest 2** — if `lh == rh` at root of subtree, it's perfect with `2^h - 1` nodes.

> **Answer key:** Day 4 = **combine child metrics at parent** + optional **early exit** or **math when shape guaranteed**.

---

## ⚠ Common Mistakes

1. **O(n²) balance check** — Don't call height function independently at every node.

2. **Confusing balanced with complete** — Balanced = height diff ≤ 1; Complete = left-filled levels.

3. **`2^h` vs `2^h - 1`** — Node count formula off-by-one.

4. **Using BFS for balance** — Recursive property check is natural.

5. **Forgetting Day 1 depth is simpler** — Max depth never early-exits; balance often should.

---

## 🏋️ Mini Challenge

### [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/)

**[→ Try Diameter on LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)**

Return the length of the **longest path** between any two nodes (edges count).

```
Input:       1
            / \
           2   3
          / \
         4   5

Output: 3
Explanation: Path 4 → 2 → 1 → 3 (or through 5) has 3 edges.
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "longest path" / "diameter" | ↑ height bubble + global update |
| "any two nodes" | Best path may not pass root — track global max |
| "combine child heights" | At node: `leftH + rightH` candidate |

**Before you code:** Same height return as #104 — what extra variable do you update at each combine?

> 💡 **Hint:** Return height upward; side-effect `diameter = max(diameter, leftH + rightH)`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Balanced Binary Tree #110](https://leetcode.com/problems/balanced-binary-tree/) | Easy | ↑ height + balance check |
| [Count Complete Tree Nodes #222](https://leetcode.com/problems/count-complete-tree-nodes/) | Medium | Spine heights + math |

---

*Day 4 complete! Tomorrow: two pointers on two trees — parallel vs mirror. →*
