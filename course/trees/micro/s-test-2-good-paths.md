# ⚔ S-Rank Test — Problem 2

> [Number of Good Paths #2421](https://leetcode.com/problems/number-of-good-paths/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Number of Good Paths on LeetCode](https://leetcode.com/problems/number-of-good-paths/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Good Paths #2421](https://leetcode.com/problems/number-of-good-paths/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the S-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    vector<int> p, cnt;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        p.resize(n); cnt.assign(n, 1);
        iota(p.begin(), p.end(), 0);
        vector<tuple<int,int,int>> es;
        for (auto& e : edges) es.push_back({max(vals[e[0]], vals[e[1]]), e[0], e[1]});
        sort(es.begin(), es.end());
        long long ans = n;
        for (auto [thr, u, v] : es) {
            int a = find(u), b = find(v);
            if (a == b) continue;
            ans += 1LL * cnt[a] * cnt[b];
            if (vals[a] > vals[b]) swap(a, b);
            p[b] = a;
            cnt[a] += cnt[b];
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        parent = list(range(n))
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x
        cnt = [1] * n
        es = sorted((max(vals[u], vals[v]), u, v) for u, v in edges)
        ans = n
        for _, u, v in es:
            pu, pv = find(u), find(v)
            if pu != pv:
                ans += cnt[pu] * cnt[pv]
                if vals[pu] > vals[pv]:
                    pu, pv = pv, pu
                parent[pv] = pu
                cnt[pu] += cnt[pv]
        return ans
```

### Java
```java
class Solution {
    int[] p, cnt;
    int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        p = new int[n]; cnt = new int[n];
        for (int i = 0; i < n; i++) { p[i] = i; cnt[i] = 1; }
        Integer[] idx = new Integer[edges.length];
        for (int i = 0; i < edges.length; i++) idx[i] = i;
        Arrays.sort(idx, Comparator.comparingInt(i -> Math.max(vals[edges[i][0]], vals[edges[i][1]])));
        long ans = n;
        for (int i : idx) {
            int u = edges[i][0], v = edges[i][1];
            int a = find(u), b = find(v);
            if (a == b) continue;
            ans += 1L * cnt[a] * cnt[b];
            if (vals[a] > vals[b]) { int t = a; a = b; b = t; }
            p[b] = a; cnt[a] += cnt[b];
        }
        return (int) ans;
    }
}
```

**Complexity:** O(n log n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
