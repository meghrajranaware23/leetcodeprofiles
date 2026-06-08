# ⚔ C-Rank Test — Problem 1

> [Flower Planting With No Adjacent #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Flower Planting With No Adjacent on LeetCode](https://leetcode.com/problems/flower-planting-with-no-adjacent/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Flower Planting With No Adjacent #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/)**

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
public:
    vector<int> gardenNoAdj(int n, vector<vector<int>>& paths) {
        vector<vector<int>> adj(n);
        for (auto& p : paths) {
            adj[p[0] - 1].push_back(p[1] - 1);
            adj[p[1] - 1].push_back(p[0] - 1);
        }
        vector<int> ans(n);
        for (int i = 0; i < n; i++) {
            vector<bool> used(5);
            for (int nei : adj[i]) used[ans[nei]] = true;
            for (int c = 1; c <= 4; c++)
                if (!used[c]) { ans[i] = c; break; }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for a, b in paths:
            adj[a - 1].append(b - 1)
            adj[b - 1].append(a - 1)
        ans = [0] * n
        for i in range(n):
            used = {ans[nei] for nei in adj[i]}
            for c in range(1, 5):
                if c not in used:
                    ans[i] = c
                    break
        return ans
```

### Java
```java
class Solution {
    public int[] gardenNoAdj(int n, int[][] paths) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] p : paths) {
            adj.get(p[0] - 1).add(p[1] - 1);
            adj.get(p[1] - 1).add(p[0] - 1);
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            boolean[] used = new boolean[5];
            for (int nei : adj.get(i)) used[ans[nei]] = true;
            for (int c = 1; c <= 4; c++)
                if (!used[c]) { ans[i] = c; break; }
        }
        return ans;
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
