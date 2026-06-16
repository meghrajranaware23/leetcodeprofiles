<!-- hand-authored -->
# ⚔ Quest: Step-by-Step Directions

> **Day 27** · [Step-by-Step Directions from a Binary Tree Node to Another #2096](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Step-by-Step Directions from a Binary Tree Node to Another on LeetCode](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)**

> ⚔ **Hunter's rule:** Get path strings from root to start and dest (L/R only). Strip common prefix = path through LCA. Answer = U×(remaining start) + dest suffix. Bridges Day 13 LCA. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Step-by-Step Directions from a Binary Tree Node to Another #2096](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **LCA + path construction** — two DFS path finds with backtracking; longest common prefix of L/R strings locates LCA; ups then dest remainder.

If stuck: you don't need to name the LCA node — prefix length `i` is enough.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** LCA + Path Construction (U/L/R)

**How to identify this from the problem statement:**
- Unique values — find by `startValue` / `destValue`
- Moves: L, R from parent to child; U to parent
- Shortest path in tree = up to LCA, down to dest

| Keyword / phrase | What it signals |
|---|---|
| "directions from node to node" | Path via LCA |
| "U" move to parent | Start path suffix becomes U's |
| "L" / "R" moves | Record during root→target DFS |
| Unique node values | Search by val not pointer |

**Why this pattern works:** Root→start and root→dest paths share prefix exactly through LCA. Divergence after prefix: ascend from start (`U`), descend along dest suffix (`L`/`R`).

**How a strong solver thinks before coding:**
1. *"find(root, start, sp) with backtrack L/R."*
2. *"find(root, dest, dp)."*
3. *"i = common prefix length."*
4. *"return 'U'*(len(sp)-i) + dp[i:]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Explicit LCA then three path segments** | More code — prefix trick is shorter |
| **BFS for shortest path** | Works but heavier than two DFS strings |
| **No backtracking in path DFS** | Wrong L/R string on failed branches |
| **Parent map + BFS from start** | Works but path-string method is direct |

**The insight brute force misses:** Day 13 LCA split is implicit in **longest common prefix** of two root-path strings.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [LCA #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | Day 13 — return node | Prefix encodes same split |
| [Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/) | Root to leaf strings | Same DFS append |
| [Distance K #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) | Different goal | Parent map alternative |

Same skeleton: paths from root encode tree geometry.

---

## 📖 Walkthrough

**Tree: `[5,1,2,3,null,6,4]`, start=3, dest=6**

```
        5
       / \
      1   2
     /   / \
    3   6   4

root→3: "LL"
root→6: "RL"

Common prefix "L" → LCA is 1? 
  sp="LL", dp="RL" — first char L vs R → i=0
  Answer: "UU" + "RL" = "UURL"? 

Trace: 3→5 (UU) then 5→2→6 (RL) = UURL ✓
```

> 💡 **The insight:** Common prefix length = steps from root to LCA on both paths.

---

## Solution

### C++
```cpp
class Solution {
    bool find(TreeNode* node, int target, string& path) {
        if (!node) return false;
        if (node->val == target) return true;
        path += 'L';
        if (find(node->left, target, path)) return true;
        path.pop_back();
        path += 'R';
        if (find(node->right, target, path)) return true;
        path.pop_back();
        return false;
    }
public:
    string getDirections(TreeNode* root, int startValue, int destValue) {
        string sp, dp;
        find(root, startValue, sp);
        find(root, destValue, dp);
        int i = 0;
        while (i < (int)sp.size() && i < (int)dp.size() && sp[i] == dp[i]) i++;
        return string(sp.size() - i, 'U') + dp.substr(i);
    }
};
```

### Python
```python
class Solution:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        def find(node, target, path):
            if not node: return False
            if node.val == target: return True
            path.append('L')
            if find(node.left, target, path): return True
            path.pop()
            path.append('R')
            if find(node.right, target, path): return True
            path.pop()
            return False
        sp, dp = [], []
        find(root, startValue, sp)
        find(root, destValue, dp)
        i = 0
        while i < len(sp) and i < len(dp) and sp[i] == dp[i]:
            i += 1
        return 'U' * (len(sp) - i) + ''.join(dp[i:])
```

### Java
```java
class Solution {
    public String getDirections(TreeNode root, int startValue, int destValue) {
        StringBuilder sp = new StringBuilder(), dp = new StringBuilder();
        find(root, startValue, sp);
        find(root, destValue, dp);
        int i = 0;
        while (i < sp.length() && i < dp.length() && sp.charAt(i) == dp.charAt(i)) i++;
        return "U".repeat(sp.length() - i) + dp.substring(i);
    }
    private boolean find(TreeNode node, int target, StringBuilder path) {
        if (node == null) return false;
        if (node.val == target) return true;
        path.append('L');
        if (find(node.left, target, path)) return true;
        path.deleteCharAt(path.length()-1);
        path.append('R');
        if (find(node.right, target, path)) return true;
        path.deleteCharAt(path.length()-1);
        return false;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Directions A to B"** → LCA path = common prefix of root-paths.
- **"Ups then downs"** → U×len(start suffix) + dest suffix.
- **"Day 13 LCA"** → split without naming node.
- **"Backtrack DFS"** → pop on failed L/R branch.

If you computed LCA node explicitly, the prefix method is equivalent and often shorter.

> 🎯 **Pattern Unlocked:** LCA + path construction — U/L/R via common prefix strip.

---

*Both quests complete. Head to the checkpoint. →*
