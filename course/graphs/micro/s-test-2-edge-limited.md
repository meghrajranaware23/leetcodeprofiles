# ⚔ S-Rank Test — Problem 2

> [Checking Existence of Edge Length Limited Paths #1697](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Checking Existence of Edge Length Limited Paths on LeetCode](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Checking Existence of Edge Length Limited Paths #1697](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/)**

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
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<bool> distanceLimitedPathsExist(int n, vector<vector<int>>& edgeList, vector<vector<int>>& queries) {
        for (int i = 0; i < (int)queries.size(); i++) queries[i].push_back(i);
        sort(edgeList.begin(), edgeList.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        sort(queries.begin(), queries.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        vector<bool> ans(queries.size());
        int j = 0;
        for (auto& q : queries) {
            while (j < (int)edgeList.size() && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def distanceLimitedPathsExist(self, n: int, edgeList: List[List[int]], queries: List[List[int]]) -> List[bool]:
        edgeList.sort(key=lambda e: e[2])
        indexed = sorted(enumerate(queries), key=lambda x: x[1][2])
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        ans = [False] * len(queries)
        j = 0
        for idx, (u, v, limit) in indexed:
            while j < len(edgeList) and edgeList[j][2] < limit:
                unite(edgeList[j][0], edgeList[j][1])
                j += 1
            ans[idx] = find(u) == find(v)
        return ans
```

### Java
```java
class Solution {
    private int[] p;
    public boolean[] distanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries) {
        int[][] qs = new int[queries.length][4];
        for (int i = 0; i < queries.length; i++) {
            qs[i][0] = queries[i][0]; qs[i][1] = queries[i][1];
            qs[i][2] = queries[i][2]; qs[i][3] = i;
        }
        Arrays.sort(edgeList, Comparator.comparingInt(a -> a[2]));
        Arrays.sort(qs, Comparator.comparingInt(a -> a[2]));
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        boolean[] ans = new boolean[queries.length];
        int j = 0;
        for (int[] q : qs) {
            while (j < edgeList.length && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O((E + Q) log(E + Q) · α(n)) time · O(n + Q) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
