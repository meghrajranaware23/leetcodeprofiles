<!-- hand-authored -->
# ⚔ Quest: Construct Quad Tree

> **Day 29** · [Construct Quad Tree #427](https://leetcode.com/problems/construct-quad-tree/) · Medium · 15 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Construct Quad Tree on LeetCode](https://leetcode.com/problems/construct-quad-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw a 4×4 grid and mark the four quadrants at each split. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Quad Tree #427](https://leetcode.com/problems/construct-quad-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Divide and Conquer Tree Build** — if entire region is uniform → leaf; else split into four `size/2` quadrants and recurse.

If you're stuck after 5 minutes: quadrant order is **topLeft, topRight, bottomLeft, bottomRight**. Off-by-one in `(r, c)` origins is the #1 bug.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Tree Build (4-quadrant unify/split)

**How to identify this from the problem statement:**
- **"Construct quad tree"** → 4-ary tree, not binary
- **"2^n × 2^n grid"** → always power-of-2 — clean halving
- **"Same value in subgrid"** → base case for leaf
- **"Merge if all four children are identical leaves"** → optional unify optimization

| Keyword / phrase | What it signals |
|---|---|
| "construct" / "build tree from grid" | Recursive spatial divide |
| "isLeaf" / "uniform region" | Scan subgrid → leaf if all equal |
| "topLeft, topRight, bottomLeft, bottomRight" | Fixed 4-child order |
| "represent with fewer nodes" | Collapse 4 same-value leaves |

**Why this pattern works:** Day 8 splits traversals to build binary trees. Here the input is spatial — each recursive call owns a square region and either unifies or quarters it.

**How a strong solver thinks before coding:**
1. *"build(r, c, size): scan region for uniform?"*
2. *"Yes → return Leaf(val)."*
3. *"No → half = size/2; build 4 quadrants."*
4. *"Optional: if 4 leaf children same val → merge to one leaf."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build full tree then prune** | Unify during build is cleaner |
| **Wrong quadrant coordinates** | Mixing TR/BL origins duplicates or skips cells |
| **Binary tree split (2-way only)** | Quad-tree requires 4 children |
| **Scan entire grid at every node O(n² log n)** | Scan only current region — still acceptable |
| **Leaf when size>1 but not uniform** | Must recurse until uniform or size=1 |

**The insight brute force misses:** Each cell belongs to exactly one recursive region — trust the quadrant boundaries.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Construct Binary Tree from Preorder and Inorder #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | 2-way split on indices | Day 8 divide + merge |
| [Construct Binary Tree from Inorder and Postorder #106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | Different split point | Same skeleton |
| [Region Cut by Slashes #959](https://leetcode.com/problems/regions-cut-by-slashes/) | Grid → connected components | Spatial reasoning on grid |

Quad-tree is Day 8 construction with **four** subproblems instead of two.

---

## 📖 Walkthrough

**4×4 grid — split mixed region, unify uniform ones.**

```
grid (1=true, 0=false):     Step 1 — whole 4×4 mixed → split

1 1 | 1 1                   build(0,0,4) → not uniform
1 1 | 0 0                   half=2
----+----                   TL: build(0,0,2) all 1 → Leaf(1)
1 1 | 0 0                   TR: build(0,2,2) mixed → split again
1 1 | 1 1                   BL: build(2,0,2) mixed → split
                            BR: build(2,2,2) all 1 → Leaf(1)

TR subgrid (0,2,2):          BL subgrid (2,0,2):
1 1                          1 1
0 0                          0 0
→ 4 leaves (1,0,0,1)         → 4 leaves (1,0,0,1)
```

**Unify optimization (Python quest approach):**

```
After building tl, tr, bl, br:
  if all are leaves AND tl.val == tr.val == bl.val == br.val:
      return Leaf(tl.val)    // one node instead of four
  else:
      return Internal(tl, tr, bl, br)
```

> 💡 **The insight:** `build(r, c, size)` is the spatial analog of Day 8's `build(preorder, inorder, lo, hi)`.

---

## Solution

### C++
```cpp
class Solution {
    Node* build(vector<vector<int>>& g, int r, int c, int sz) {
        bool allSame = true;
        int val = g[r][c];
        for (int i = r; i < r+sz && allSame; i++)
            for (int j = c; j < c+sz && allSame; j++)
                if (g[i][j] != val) allSame = false;
        if (allSame) return new Node(val == 1, true);
        int h = sz / 2;
        return new Node(true, false,
            build(g, r,   c,   h),
            build(g, r,   c+h, h),
            build(g, r+h, c,   h),
            build(g, r+h, c+h, h));
    }
public:
    Node* construct(vector<vector<int>>& grid) {
        return build(grid, 0, 0, grid.size());
    }
};
```

### Python
```python
class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def build(r, c, size):
            if size == 1:
                return Node(grid[r][c] == 1, True)
            h = size // 2
            tl = build(r,   c,   h)
            tr = build(r,   c+h, h)
            bl = build(r+h, c,   h)
            br = build(r+h, c+h, h)
            if all(n.isLeaf for n in [tl, tr, bl, br]) and tl.val == tr.val == bl.val == br.val:
                return Node(tl.val, True)
            return Node(True, False, tl, tr, bl, br)
        return build(0, 0, len(grid))
```

### Java
```java
class Solution {
    public Node construct(int[][] grid) { return build(grid, 0, 0, grid.length); }
    private Node build(int[][] g, int r, int c, int sz) {
        boolean allSame = true;
        int val = g[r][c];
        outer: for (int i = r; i < r+sz; i++)
            for (int j = c; j < c+sz; j++)
                if (g[i][j] != val) { allSame = false; break outer; }
        if (allSame) return new Node(val == 1, true);
        int h = sz / 2;
        return new Node(true, false,
            build(g, r,   c,   h),
            build(g, r,   c+h, h),
            build(g, r+h, c,   h),
            build(g, r+h, c+h, h));
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Uniform region"** → leaf base case — scan before split.
- **"Four quadrants TL TR BL BR"** → write coordinates on paper first.
- **"size=1"** → always leaf (Python path).
- **"Unify four same leaves"** → optional compression — fewer nodes.

If you confused top-right with bottom-left origins, redraw the grid with quadrant lines.

> 🎯 **Pattern Unlocked:** Divide and Conquer Tree Build — 4-quadrant unify/split.

---

*Both quests complete. Head to the checkpoint. →*
