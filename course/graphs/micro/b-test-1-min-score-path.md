# ⚔ B-Rank Test — Problem 1

> [Minimum Score of a Path Between Two Cities #2492](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Score of a Path Between Two Cities on LeetCode](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Score of a Path Between Two Cities #2492](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

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
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
public:
    int minScore(int n, vector<vector<int>>& roads) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& rd : roads) unite(rd[0] - 1, rd[1] - 1);
        int start = find(0), end = find(n - 1);
        if (start != end) return -1;
        int ans = INT_MAX;
        for (auto& rd : roads)
            if (find(rd[0] - 1) == start) ans = min(ans, rd[2]);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b, _ in roads:
            p[find(b - 1)] = find(a - 1)
        if find(0) != find(n - 1): return -1
        return min(w for a, b, w in roads if find(a - 1) == find(0))
```

### Java
```java
class Solution {
    private int[] p;
    public int minScore(int n, int[][] roads) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] rd : roads) unite(rd[0] - 1, rd[1] - 1);
        if (find(0) != find(n - 1)) return -1;
        int ans = Integer.MAX_VALUE;
        for (int[] rd : roads)
            if (find(rd[0] - 1) == find(0)) ans = Math.min(ans, rd[2]);
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(E · α(n)) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
