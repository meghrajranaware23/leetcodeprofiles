<!-- hand-authored -->
# ⚔ Quest: Distribute Coins

> **Day 30** · [Distribute Coins in Binary Tree #979](https://leetcode.com/problems/distribute-coins-in-binary-tree/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Distribute Coins in Binary Tree on LeetCode](https://leetcode.com/problems/distribute-coins-in-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node post-order, write the excess flowing up to parent. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Distribute Coins in Binary Tree #979](https://leetcode.com/problems/distribute-coins-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's capstone applies? **Post-order excess/deficit** — `dfs` returns net coins to push to parent; `ans += abs(excess)` counts edge crossings.

If you're stuck after 5 minutes: each node must end with exactly 1 coin. Surplus (+) or deficit (−) **must** cross the parent edge — that's one move per coin transferred.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Greedy Moves (post-order excess)

**How to identify this from the problem statement:**
- **"Redistribute" / "move one coin per edge"** → count edge crossings, not simulation
- **"Every node has exactly one coin"** → each node keeps 1; rest flows
- **Moves are on edges** → post-order: children settle first, then parent

| Keyword / phrase | What it signals |
|---|---|
| "minimum moves" / "distribute coins" | Greedy post-order — no top-down simulation |
| "move along edge" | `abs(excess)` = coins crossing that edge |
| "each node has one coin" | `excess = coins + left + right - 1` |
| "return total moves" | Global `ans` accumulates on unwind |

**Why this pattern works:** After subtrees report their excess, the current node knows exactly how many coins must flow through its parent edge. Greedy is optimal — every excess coin must cross that edge exactly once.

**How a strong solver thinks before coding:**
1. *"dfs(node) → net excess to parent (can be negative)."*
2. *"null → return 0."*
3. *"excess = node.coins + dfs(L) + dfs(R) - 1."*
4. *"ans += abs(excess); return excess."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate coin moves step by step** | Complex state — post-order math is O(n) |
| **Top-down assignment of targets** | Doesn't count minimal edge crossings cleanly |
| **BFS level-by-level redistribution** | Moves are tree-edge constrained — DFS post-order fits |
| **Count node.coins as moves** | Only **edge crossings** count — use excess magnitude |
| **Try all permutations of moves** | Exponential — greedy excess is provably minimal |

**The insight brute force misses:** `excess` at a node is the **net flow** through the edge to its parent. `abs(excess)` is the move count for that edge.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/) | 3-state coverage, not coins | Post-order child reports (S-Test) |
| [Sum of Left Leaves #404](https://leetcode.com/problems/sum-of-left-leaves/) | Collect specific nodes | Post-order trust children |
| Day 7 Diameter | Return height, global path | Dual-role post-order — different combine |

Same unwind direction (↑), different return semantics.

---

## 📖 Walkthrough

**Excess bubbles up; moves = edge crossings.**

```
        3(1 coin)
       / \
    0(0)  2(2)

Post-order:
  dfs(0): excess = 0 + 0 + 0 - 1 = -1  ans += 1  (need 1 coin from parent)
  dfs(2): excess = 2 + 0 + 0 - 1 = +1  ans += 2  (send 1 coin up)
  dfs(3): excess = 1 + (-1) + (+1) - 1 = 0  ans stays 2

Interpretation:
  Node 0 deficit 1 → 1 coin crosses edge 3→0
  Node 2 surplus 1 → 1 coin crosses edge 2→3
  Total: 2 moves ✓
```

**Why greedy works:**

```
Every coin that must leave a subtree crosses the root edge of that subtree exactly once.
No reordering can reduce crossings — excess is forced.
```

> 💡 **The insight:** Think **accounting**, not animation. Post-order settles children before parent counts.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int excess = node->coins + dfs(node->left) + dfs(node->right) - 1;
        ans += abs(excess);
        return excess;
    }
public:
    int distributeCoins(TreeNode* root) {
        dfs(root);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node: return 0
            excess = node.coins + dfs(node.left) + dfs(node.right) - 1
            self.ans += abs(excess)
            return excess
        dfs(root)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int distributeCoins(TreeNode root) {
        dfs(root);
        return ans;
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int excess = node.val + dfs(node.left) + dfs(node.right) - 1;
        ans += Math.abs(excess);
        return excess;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Each node ends with 1 coin"** → subtract 1 in excess formula.
- **"Moves = edge crossings"** → `abs(excess)` on unwind, not top-down.
- **"Negative excess = deficit"** → parent must send coins down through edge.
- **"Decision tree routed here"** → post-order greedy, Day 30 capstone.

If you tried simulating moves, compare — one post-order pass is the interview answer.

> 🎯 **Pattern Unlocked:** Bottom-Up Greedy Moves — post-order excess/deficit.

---

*One quest down. Next: subtree gene-set aggregation for MEX. →*
