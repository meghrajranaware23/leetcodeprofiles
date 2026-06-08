# ⚔ S-Rank Test — Problem 3

> [Minimum Fuel Cost to Report to the Capital #2477](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/) · Medium · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Fuel Cost to Report to the Capital on LeetCode](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Fuel Cost to Report to the Capital #2477](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the S-Rank curriculum. Name the pattern before you code.

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
    int seats;
    long long fuel = 0;
    int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj[u]) {
            if (v == parent) continue;
            int sub = dfs(v, u);
            size += sub;
            fuel += (sub + seats - 1) / seats;
        }
        return size;
    }
public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        adj.assign(n, {});
        this->seats = seats;
        fuel = 0;
        for (auto& r : roads) { adj[r[0]].push_back(r[1]); adj[r[1]].push_back(r[0]); }
        dfs(0, -1);
        return fuel;
    }
};
```

### Python
```python
class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        adj = [[] for _ in range(n)]
        for a, b in roads:
            adj[a].append(b); adj[b].append(a)
        fuel = 0
        def dfs(u, parent):
            nonlocal fuel
            size = 1
            for v in adj[u]:
                if v == parent: continue
                sub = dfs(v, u)
                size += sub
                fuel += (sub + seats - 1) // seats
            return size
        dfs(0, -1)
        return fuel
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) { adj.get(r[0]).add(r[1]); adj.get(r[1]).add(r[0]); }
        long total = 0;
        for (int v : adj.get(0)) {
            int sub = dfs(v, 0);
            total += (sub + seats - 1) / seats;
        }
        return total;
    }
    private int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            size += dfs(v, u);
        }
        return size;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
