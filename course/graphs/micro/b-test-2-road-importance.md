<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 2

> [Maximum Total Importance of Roads #2285](https://leetcode.com/problems/maximum-total-importance-of-roads/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Total Importance of Roads on LeetCode](https://leetcode.com/problems/maximum-total-importance-of-roads/)**

> ⚔ **Hunter's rule:** Assign importance 1..n to cities. Each road contributes **importance[u] + importance[v]**. Maximize total — give **higher numbers to higher-degree cities**.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Total Importance of Roads #2285](https://leetcode.com/problems/maximum-total-importance-of-roads/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Greedy degree sorting** — not UF, not Dijkstra, not BFS.

- Count degree of each city from `roads`.
- Sort degrees ascending; assign importance `1` to smallest degree, `2` to next, …, `n` to largest.
- Total importance = sum over roads of `(imp[u] + imp[v])` = sum of `degree[i] * imp[i]` after assignment.
- Equivalent: `ans = sum(deg[i] * (rank[i]))` where ranks are 1..n sorted by degree.

**Pattern name before coding:** *Degree count → sort → greedy rank assignment → sum deg×rank.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Assign distinct labels 1..n to nodes to maximize sum of endpoint labels over edges
- Each edge counted twice in node-degree view — sort degrees, multiply by rank
- No traversal — pure graph statistic + greedy

**How a strong solver thinks before coding:**
1. *"deg[u]++ for each road."*
2. *"Sort deg ascending."*
3. *"ans += deg[i] * (i+1) for i in 0..n-1 after sort."*
4. *"Not MST/Dijkstra — optimization by degree."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all n! assignments** | Factorial — greedy degree sort is optimal |
| **BFS/DFS traversal** | No path involved |
| **Union-Find** | Connectivity irrelevant — only degrees matter |
| **Assign importance randomly** | High-degree nodes must get high labels |

---

## 🎯 Transfer to Unseen Problems

Classic **rearrangement inequality** — pair largest values with largest coefficients (degrees). Related greedy graph problems assign weights by sorted degree or edge list.

Reference: contrasts with **Day 21 MST** (minimize connection cost) — here maximize label sum.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
public:
    long long maximumImportance(int n, vector<vector<int>>& roads) {
        vector<long long> deg(n);
        for (auto& r : roads) { deg[r[0]]++; deg[r[1]]++; }
        sort(deg.begin(), deg.end());
        long long ans = 0;
        for (int i = 0; i < n; i++) ans += deg[i] * (i + 1);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def maximumImportance(self, n: int, roads: List[List[int]]) -> int:
        deg = [0] * n
        for a, b in roads:
            deg[a] += 1; deg[b] += 1
        deg.sort()
        return sum(d * (i + 1) for i, d in enumerate(deg))
```

### Java
```java
class Solution {
    public long maximumImportance(int n, int[][] roads) {
        long[] deg = new long[n];
        for (int[] r : roads) { deg[r[0]]++; deg[r[1]]++; }
        Arrays.sort(deg);
        long ans = 0;
        for (int i = 0; i < n; i++) ans += deg[i] * (i + 1);
        return ans;
    }
}
```

**Complexity:** O(n log n + E) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Maximize sum of endpoint importances"** → high degree → high label.
- **"Sort degrees, assign 1..n"** → greedy optimal.
- **"Not a graph traversal"** → count degrees only.
- **"sum(deg[i]*rank[i])"** — compact formula.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    long long maximumImportance(int n, vector<vector<int>>& roads) {
        vector<long long> deg(n);
        for (auto& r : roads) { deg[r[0]]++; deg[r[1]]++; }
        sort(deg.begin(), deg.end());
        long long ans = 0;
        for (int i = 0; i < n; i++) ans += deg[i] * (i + 1);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def maximumImportance(self, n: int, roads: List[List[int]]) -> int:
        deg = [0] * n
        for a, b in roads:
            deg[a] += 1; deg[b] += 1
        deg.sort()
        return sum(d * (i + 1) for i, d in enumerate(deg))
```

### Java
```java
class Solution {
    public long maximumImportance(int n, int[][] roads) {
        long[] deg = new long[n];
        for (int[] r : roads) { deg[r[0]]++; deg[r[1]]++; }
        Arrays.sort(deg);
        long ans = 0;
        for (int i = 0; i < n; i++) ans += deg[i] * (i + 1);
        return ans;
    }
}
```

**Complexity:** O(n log n + E) time · O(n) space
