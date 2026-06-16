<!-- hand-authored -->
# ⚔ Quest: Longest Path Different Chars

> **Day 25** · [Longest Path With Different Adjacent Characters #2246](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Path With Different Adjacent Characters on LeetCode](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/)**

> ⚔ **Hunter's rule:** Build children from `parent` array. At each node: Day 7 top-two branches — but **skip** child if `s[child] == s[node]`. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Path With Different Adjacent Characters #2246](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **N-ary diameter with letter state** — DFS returns longest valid downward chain; at each node combine top two valid child chains + 1 for global max.

If stuck: same letter on parent-child edge means that child's returned chain cannot extend through this node — treat as 0 contribution to top-two.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** N-ary Diameter Variant (Letter Filter)

**How to identify this from the problem statement:**
- `parent[i]` defines N-ary tree (node 0 root)
- `s` string — one letter per node
- "Longest path" where adjacent chars differ → filter on combine
- Path can start/end anywhere — global max like Day 7 diameter

| Keyword / phrase | What it signals |
|---|---|
| "parent array" | Build children adjacency list |
| "different adjacent characters" | Skip child when s[child]==s[node] |
| "longest path" | Top-two child chains + global |
| "directed tree" from parent | Root at 0, DFS downward only |

**Why this pattern works:** Day 7 diameter asks for top two **heights**. Here each child returns a downward chain length; only chains with different letters at the connecting edge qualify for top-two at the parent.

**How a strong solver thinks before coding:**
1. *"children[parent[i]].append(i) for i=1..n-1."*
2. *"dfs(node): get len from each child recursively."*
3. *"If s[child]==s[node]: skip for top-two."*
4. *"ans = max(ans, top1+top2+1); return top1+1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all paths** | O(n²) — too slow for n=10⁵ |
| **Day 7 binary template on left/right** | N-ary — loop all children |
| **Ignore letter constraint** | Wrong answer — must filter |
| **BFS from every node** | O(n²) |

**The insight brute force misses:** Still only **two best branches** matter at each node for the longest path through that node — same Day 7 combine, with a filter predicate on edges.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Day 7 — binary, no filter | top1 + top2 + 1 |
| [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Sum not count | Same dual role |
| [Tree Diameter #1245](https://leetcode.com/problems/tree-diameter/) | N-ary unweighted | No letter filter |

Same skeleton: return best downward, global cross combine.

---

## 📖 Walkthrough

**parent = [-1,0,0,1,1,2], s = "abacbe"**

```
        0(a)
       / \
      1(b) 2(a)   ← child 2 skipped at 0 (same 'a')
     / \
    3(a) 4(c)     ← 3 skipped at 1 (same 'a')
   /
  5(b)

At node 1: valid children 4(c→len?), 3 skipped
At node 0: child 1 valid, child 2 skipped
Global tracks best top1+top2+1 anywhere
```

> 💡 **The insight:** Day 7 diameter on an N-ary tree, with "edge valid only if letters differ."

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> children;
    string s;
    int ans = 1;
    int dfs(int node) {
        int top1 = 0, top2 = 0;
        for (int child : children[node]) {
            int len = dfs(child);
            if (s[child] != s[node]) {
                if (len > top1) { top2 = top1; top1 = len; }
                else if (len > top2) { top2 = len; }
            }
        }
        ans = max(ans, top1 + top2 + 1);
        return top1 + 1;
    }
public:
    int longestPath(vector<int>& parent, string s) {
        int n = parent.size();
        this->s = s;
        children.resize(n);
        for (int i = 1; i < n; i++) children[parent[i]].push_back(i);
        dfs(0);
        return ans;
    }
};
```

### Python
```python
from collections import defaultdict
class Solution:
    def longestPath(self, parent: List[int], s: str) -> int:
        n = len(parent)
        children = defaultdict(list)
        for i in range(1, n):
            children[parent[i]].append(i)
        ans = 1
        def dfs(node):
            nonlocal ans
            top1 = top2 = 0
            for child in children[node]:
                length = dfs(child)
                if s[child] != s[node]:
                    if length > top1: top2 = top1; top1 = length
                    elif length > top2: top2 = length
            ans = max(ans, top1 + top2 + 1)
            return top1 + 1
        dfs(0)
        return ans
```

### Java
```java
class Solution {
    private List<List<Integer>> children;
    private String s;
    private int ans = 1;
    public int longestPath(int[] parent, String s) {
        this.s = s;
        int n = parent.length;
        children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parent[i]).add(i);
        dfs(0);
        return ans;
    }
    private int dfs(int node) {
        int top1 = 0, top2 = 0;
        for (int child : children.get(node)) {
            int len = dfs(child);
            if (s.charAt(child) != s.charAt(node)) {
                if (len > top1) { top2 = top1; top1 = len; }
                else if (len > top2) { top2 = len; }
            }
        }
        ans = Math.max(ans, top1 + top2 + 1);
        return top1 + 1;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Longest path + parent array"** → N-ary tree, build children list.
- **"Different adjacent chars"** → filter before top-two update.
- **"Day 7 diameter"** → return top1+1, global top1+top2+1.
- **"ans starts at 1"** → single node is valid path.

If you used binary left/right, refactor to loop over `children[node]`.

> 🎯 **Pattern Unlocked:** N-ary diameter variant — top-two with letter state filter.

---

*Both quests complete. Head to the checkpoint. →*
