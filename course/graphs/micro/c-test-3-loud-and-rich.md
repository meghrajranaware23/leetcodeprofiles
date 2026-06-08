# ⚔ C-Rank Test — Problem 3

> [Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Loud and Rich on LeetCode](https://leetcode.com/problems/loud-and-rich/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which graph technique does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for graph structure clues
- Determine exploration strategy
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example graph."*
2. *"What are my nodes and edges?"*
3. *"BFS, DFS, Dijkstra, or Union-Find?"*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

Graph problems have natural O(V+E) traversal solutions. Brute force typically means exponential path enumeration or missing visited sets. Trust the exploration strategy.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<int> quiet, ans;
    int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj[u]) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
        int n = quiet.size();
        this->quiet = quiet;
        adj.assign(n, {});
        for (auto& r : richer) adj[r[1]].push_back(r[0]);
        ans.assign(n, -1);
        vector<int> res(n);
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
};
```

### Python
```python
class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        n = len(quiet)
        adj = [[] for _ in range(n)]
        for a, b in richer:
            adj[b].append(a)
        memo = {}
        def dfs(u):
            if u in memo: return memo[u]
            best = u
            for v in adj[u]:
                cand = dfs(v)
                if quiet[cand] < quiet[best]:
                    best = cand
            memo[u] = best
            return best
        return [dfs(i) for i in range(n)]
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private int[] quiet, ans;
    public int[] loudAndRich(int[][] richer, int[] quiet) {
        int n = quiet.length;
        this.quiet = quiet;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : richer) adj.get(r[1]).add(r[0]);
        ans = new int[n];
        Arrays.fill(ans, -1);
        int[] res = new int[n];
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
    private int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj.get(u)) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
}
```

**Complexity:** O(n + E) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
