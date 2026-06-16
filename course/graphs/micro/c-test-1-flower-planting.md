<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 1

> [Flower Planting With No Adjacent #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Flower Planting With No Adjacent on LeetCode](https://leetcode.com/problems/flower-planting-with-no-adjacent/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the garden graph. Adjacent gardens share an edge — assign types so neighbors differ.

---

## The Problem

See the full problem statement on LeetCode: **[Flower Planting With No Adjacent #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Conflict-free assignment on an undirected graph — cousin of Day 13 bipartite, but **4 colors always suffice** for general garden graphs.

Build adjacency from paths. Process gardens 1..n in order: pick the smallest type 1–4 not used by already-assigned neighbors. No full 2-color check needed — greedy works here.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy Neighbor Coloring (C-Rank synthesis)

**How to identify from the statement:**
- Undirected edges between "gardens"
- Assign values 1–4 so adjacent differ
- Graph may not be bipartite — but 4 types are always enough

**How a strong solver thinks before coding:**
1. *"Build undirected adj from paths."*
2. *"For each garden i, see neighbor colors already set."*
3. *"Pick first type in {1,2,3,4} not used by neighbors."*

**C-Rank connection:** Day 13 taught 2-color detection; this problem **assigns** colors greedily. Trees need 2; general graphs need at most 4 (planar-ish constraint).

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 4^n assignments** | Exponential |
| **Strict 2-color only** | Fails on odd cycles — need up to 4 |
| **Random assignment** | May conflict with neighbors |

**The insight:** Local greedy — each node has ≤3 neighbors already colored when you process in order (since paths connect pairs), so one of 4 types always fits.

---

## 🎯 Transfer to Unseen Problems

*"Assign labels so conflicting pairs differ, at most k label types."*

If k is small and constraints are local, try **greedy in fixed order** before full graph coloring algorithms.

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

- **"Adjacent gardens = undirected conflict edges."** → Day 13 cousin.
- **"4 types always enough."** → greedy, not full chromatic number.
- **"Process in order, check neighbor colors."** → O(1) pick per node.
- **"Not course schedule, not Kahn."** → local coloring.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

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
