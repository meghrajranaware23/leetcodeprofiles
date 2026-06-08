# ⚔ B-Rank Test — Problem 2

> [Maximum Total Importance of Roads #2285](https://leetcode.com/problems/maximum-total-importance-of-roads/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Total Importance of Roads on LeetCode](https://leetcode.com/problems/maximum-total-importance-of-roads/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Total Importance of Roads #2285](https://leetcode.com/problems/maximum-total-importance-of-roads/)**

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

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
