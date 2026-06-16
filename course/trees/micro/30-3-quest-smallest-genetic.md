<!-- hand-authored -->
# ⚔ Quest: Smallest Missing Genetic Value

> **Day 30** · [Smallest Missing Genetic Value in Each Subtree #2003](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Smallest Missing Genetic Value in Each Subtree on LeetCode](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Find the node with value 1. Walk up to root, aggregating gene sets at each step. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Smallest Missing Genetic Value in Each Subtree #2003](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's capstone applies? **Subtree gene-set aggregation** — collect all `nums` values in the subtree into a set; MEX = smallest positive integer not in set.

If you're stuck after 5 minutes: if no node has value `1`, every answer is `1`. Otherwise only ancestors of the `1`-node need real computation — walk `cur = node_with_1`, then `cur = parent[cur]` up to root.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Subtree Set Aggregation (path-to-root optimization)

**How to identify this from the problem statement:**
- **"Smallest missing genetic value" / MEX** → need set of all values in subtree
- **"Each subtree"** → naive O(n²) — optimize via ancestry structure
- **Values are permutations of 1..n** → at most one node with value `1`

| Keyword / phrase | What it signals |
|---|---|
| "smallest missing" / MEX | Scan 1, 2, 3… until not in set |
| "each subtree" | DFS collect values per subtree |
| "parents array" | Build children adjacency list |
| "permutation of 1..n" | Unique `1` unlocks path optimization |

**Why this pattern works:** MEX > 1 for node `u` requires value `1` in `u`'s subtree. Only ancestors of the unique `1`-node can have MEX > 1. All other nodes answer `1` immediately.

**How a strong solver thinks before coding:**
1. *"Build children from parents."*
2. *"Find node_with_1; if none → return all 1s."*
3. *"Global visited + vals sets; cur = node_with_1."*
4. *"While cur valid: DFS-collect unvisited subtree nodes into vals."*
5. *"Advance mex while in vals; ans[cur] = mex; cur = parent[cur]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Fresh DFS from every node** | O(n²) — TLE on large trees |
| **Recompute set from scratch per ancestor** | Overlapping subtrees — reuse global visited |
| **Ignore the unique-1 property** | Wastes work on nodes whose subtree lacks 1 |
| **MEX scan from scratch each node** | Increment global `mex` — sets only grow up the path |
| **Return set from every dfs call** | Heavy copying — global visited + vals is lighter |

**The insight brute force misses:** Subtrees along the path from `1`-node to root are **nested**. One global visited set accumulates values once; `mex` only increases.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Average of Subtree #2265](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/) | Sum+count tuple, not set | Bottom-up aggregation (S-Test) |
| [Maximum Sum BST #1373](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/) | Validity tuple | Day 28 multi-value return |
| [Collect Coins in Tree #2607](https://leetcode.com/problems/find-the-substring-with-max-cost/) | Different domain | Tree path aggregation |

Set aggregation is the capstone when the question asks about **all values in subtree**.

---

## 📖 Walkthrough

**Only ancestors of node-with-1 matter.**

```
parents = [-1, 0, 0, 2, 2, 0, 2]
nums    = [4, 6, 1, 5, 2, 3, 7]

Tree:          node_with_1 = index 2

       0(4)
     /  |  \
   1(6) 5(3) (none)
   /
  2(1)
 / \
3(5) 4(2)
      \
      6(7)

Walk cur from 2 → 0:
  cur=2: collect subtree {1,5,2,7} → vals={1,2,5,7} → mex=3 → ans[2]=3
  cur=0: collect {4,6,3,...} → vals grows → mex=8 → ans[0]=8

Nodes not on path (1, 3, 4, 5, 6): ans stays 1 (no 1 in their subtrees)
```

**Why others stay 1:**

```
Node 1's subtree = {6} — no value 1 → MEX is always 1
Node 5's subtree = {3} — no value 1 → MEX is always 1
```

> 💡 **The insight:** Gene set **aggregates** as you walk up — visited prevents re-DFS of shared subtrees.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> smallestMissingValueSubtree(vector<int>& parents, vector<int>& nums) {
        int n = parents.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) children[parents[i]].push_back(i);
        vector<int> ans(n, 1);
        int nodeWith1 = -1;
        for (int i = 0; i < n; i++) if (nums[i] == 1) { nodeWith1 = i; break; }
        if (nodeWith1 == -1) return ans;
        unordered_set<int> visited, vals;
        int mex = 1;
        int cur = nodeWith1;
        while (cur != -1) {
            stack<int> st;
            st.push(cur);
            while (!st.empty()) {
                int v = st.top(); st.pop();
                if (visited.count(v)) continue;
                visited.insert(v);
                vals.insert(nums[v]);
                for (int child : children[v])
                    if (!visited.count(child)) st.push(child);
            }
            while (vals.count(mex)) mex++;
            ans[cur] = mex;
            cur = cur == 0 ? -1 : parents[cur];
        }
        return ans;
    }
};
```

### Python
```python
from collections import defaultdict
class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(parents)
        children = defaultdict(list)
        for i in range(1, n):
            children[parents[i]].append(i)
        ans = [1] * n
        node_with_1 = next((i for i in range(n) if nums[i] == 1), -1)
        if node_with_1 == -1: return ans
        visited, vals, mex = set(), set(), 1
        cur = node_with_1
        while cur != -1:
            stack = [cur]
            while stack:
                v = stack.pop()
                if v in visited: continue
                visited.add(v)
                vals.add(nums[v])
                for child in children[v]:
                    if child not in visited: stack.append(child)
            while mex in vals: mex += 1
            ans[cur] = mex
            cur = parents[cur] if cur != 0 else -1
        return ans
```

### Java
```java
class Solution {
    public int[] smallestMissingValueSubtree(int[] parents, int[] nums) {
        int n = parents.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parents[i]).add(i);
        int[] ans = new int[n];
        Arrays.fill(ans, 1);
        int nodeWith1 = -1;
        for (int i = 0; i < n; i++) if (nums[i] == 1) { nodeWith1 = i; break; }
        if (nodeWith1 == -1) return ans;
        Set<Integer> visited = new HashSet<>(), vals = new HashSet<>();
        int mex = 1, cur = nodeWith1;
        while (cur != -1) {
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(cur);
            while (!stack.isEmpty()) {
                int v = stack.pop();
                if (visited.contains(v)) continue;
                visited.add(v); vals.add(nums[v]);
                for (int child : children.get(v))
                    if (!visited.contains(child)) stack.push(child);
            }
            while (vals.contains(mex)) mex++;
            ans[cur] = mex;
            cur = cur == 0 ? -1 : parents[cur];
        }
        return ans;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"MEX in subtree"** → need set of all values — aggregation pattern.
- **"Unique 1 in permutation"** → only path to root needs work.
- **"Global visited"** → nested subtrees share nodes — don't re-collect.
- **"mex only increases"** → scan forward as set grows.

If you DFS'd from every node, the capstone fix is the **ancestry shortcut** via node-with-1.

> 🎯 **Pattern Unlocked:** Subtree Set Aggregation — gene MEX on path to root.

---

*Both quests complete. Head to the checkpoint. →*
