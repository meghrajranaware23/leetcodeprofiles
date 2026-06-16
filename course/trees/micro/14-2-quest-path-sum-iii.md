<!-- hand-authored -->
# ⚔ Quest: Path Sum III

> **Day 14** · [Path Sum III #437](https://leetcode.com/problems/path-sum-iii/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path Sum III on LeetCode](https://leetcode.com/problems/path-sum-iii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Track prefix sums on one root-to-leaf path. Mark when `prefix - target` exists in your map. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Path Sum III #437](https://leetcode.com/problems/path-sum-iii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Prefix-sum hashmap on tree DFS** — `cnt[sum - target]` at each node; backtrack `cnt[sum]` on unwind.

If you're stuck after 5 minutes: initialize `cnt[0] = 1`. Path can start at any node — the map captures all prefix sums on the current downward walk.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Sum on Trees

**How to identify this from the problem statement:**
- "Number of paths" with target sum — not listing paths
- Path must go **downward** (parent to child) but can start anywhere
- Negative values allowed → prefix sums need `long`

| Keyword / phrase | What it signals |
|---|---|
| "path sum" + "not necessarily from root" | Prefix map on DFS |
| "count paths" | Hashmap frequency — not backtracking path list |
| "downward path only" | Single DFS thread + map (not all pairs of nodes) |
| "target sum" | Look up `currentPrefix - target` |

**Why this pattern works:** Any downward path sum = difference of two prefix sums on the current root-to-here thread. Map counts how many earlier prefixes give the needed difference.

**How a strong solver thinks before coding:**
1. *"cnt[0]=1 before dfs."*
2. *"Enter node: sum+=val; ans+=cnt[sum-target]; cnt[sum]++."*
3. *"Recurse both children; sum counts paths from both."*
4. *"Leave node: cnt[sum]-- (backtrack)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every node as start, DFS to all descendants** | O(n²) — prefix map is O(n) |
| **Root-to-leaf only (Path Sum I logic)** | Misses paths starting at internal nodes |
| **Store all paths in list** | Counting problem — map suffices |
| **No backtrack on map** | Over-count across sibling branches |

**The insight brute force misses:** One DFS from root, carrying prefix sum, counts **all** downward paths in O(n) — same trick as subarray sum equals k on arrays.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Subarray Sum Equals K (array)](https://leetcode.com/problems/subarray-sum-equals-k/) | Linear structure | Identical prefix map |
| [Path Sum #112](https://leetcode.com/problems/path-sum/) | Root-to-leaf only | Day 6 — simpler |
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Today's second quest | Different combine — bottom-up arms |

Same prefix idea on trees; backtrack is the tree-specific twist.

---

## 📖 Walkthrough

**Target = 8, path 5→3 on sample tree:**

```
        10
       /  \
      5   -3
     / \
    3   2

DFS thread when at node 3 (via 10→5→3):
  Prefixes along thread: 0, 10, 15, 18
  At sum=18: need 18-8=10 → cnt[10]=1 → one path (5→3) ✓

Path starts at 5, not root — prefix map still catches it
because 15→18 segment has sum 3, and 10→15 had prefix 10.
```

> 💡 **The insight:** `cnt[0]=1` lets a path starting **at the current node** count itself when `node.val == target`.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<long long, int> prefix;
    int target, res = 0;
    void dfs(TreeNode* node, long long curr) {
        if (!node) return;
        curr += node->val;
        res += prefix[curr - target];
        prefix[curr]++;
        dfs(node->left, curr);
        dfs(node->right, curr);
        prefix[curr]--;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        prefix[0] = 1;
        target = targetSum;
        dfs(root, 0);
        return res;
    }
};
```

### Python
```python
from collections import defaultdict
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix = defaultdict(int)
        prefix[0] = 1
        self.res = 0
        def dfs(node, curr):
            if not node: return
            curr += node.val
            self.res += prefix[curr - targetSum]
            prefix[curr] += 1
            dfs(node.left, curr)
            dfs(node.right, curr)
            prefix[curr] -= 1
        dfs(root, 0)
        return self.res
```

### Java
```java
class Solution {
    private Map<Long,Integer> prefix = new HashMap<>();
    private int target, res = 0;
    public int pathSum(TreeNode root, int targetSum) {
        prefix.put(0L, 1);
        target = targetSum;
        dfs(root, 0L);
        return res;
    }
    private void dfs(TreeNode node, long curr) {
        if (node == null) return;
        curr += node.val;
        res += prefix.getOrDefault(curr - target, 0);
        prefix.merge(curr, 1, Integer::sum);
        dfs(node.left, curr);
        dfs(node.right, curr);
        prefix.merge(curr, -1, Integer::sum);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Path sum, any start, count paths"** → prefix hashmap — not O(n²) starts.
- **"cnt[0]=1"** → paths beginning at current node.
- **"Backtrack cnt[sum]"** → siblings don't share path prefixes.
- **"Not Path Sum I"** → any downward start, not root-to-leaf only.

If you nested loops over start nodes, compare to the map — same pattern as subarray sum k.

> 🎯 **Pattern Unlocked:** Prefix Sum on Trees — map + backtrack on DFS.

---

*One quest down. Next: univalue bottom-up arm combine. →*
