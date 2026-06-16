<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 1

> [Get Watched Videos by Your Friends #1311](https://leetcode.com/problems/get-watched-videos-by-your-friends/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Get Watched Videos by Your Friends on LeetCode](https://leetcode.com/problems/get-watched-videos-by-your-friends/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. BFS exactly `level` hops from `id`; then aggregate videos from everyone still in the queue. Sort by frequency then name.

---

## The Problem

See the full problem statement on LeetCode: **[Get Watched Videos by Your Friends #1311](https://leetcode.com/problems/get-watched-videos-by-your-friends/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Level-limited BFS** on friend graph — not full reachable set, not Dijkstra.

- Build undirected adjacency from `friends`.
- BFS from `id`; repeat `level` times expanding one BFS layer (mark visited on enqueue).
- After `level` expansions, **everyone left in queue** is at distance exactly `level`.
- Count video titles across those users; sort by `(freq asc, title asc)`.

**Pattern name before coding:** *BFS level expansion + aggregation.*

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Level-Limited BFS + Frequency Sort

**How to identify from the statement:**
- Social graph (friends = edges)
- "Level k friends" = BFS depth k, not ≤ k
- Collect and sort metadata from nodes at that depth

**How a strong solver thinks before coding:**
1. *"Build adj; queue [id]; vis[id]=true."*
2. *"Repeat level times: process entire frontier, push unvisited neighbors."*
3. *"Freq map over watchedVideos[u] for u still in queue."*
4. *"Sort pairs; return [[title], ...]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS to depth level** | Harder to batch "exactly level" |
| **Include friends closer than level** | Problem wants distance == level only |
| **Skip visited on enqueue** | Revisit same friend at shorter distance |
| **Sort by title only** | Primary key is frequency |

---

## 🎯 Transfer to Unseen Problems

*"Collect properties of all nodes exactly k hops away in unweighted graph."*

Template: BFS `k` layers → process remaining queue/set. Same skeleton as [Rotting Oranges #994](https://leetcode.com/problems/rotting-oranges/) layer counting — but collect instead of propagate.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
public:
    vector<vector<string>> watchedVideosByFriends(vector<vector<string>>& watchedVideos, vector<vector<int>>& friends, int id, int level) {
        int n = watchedVideos.size();
        vector<vector<int>> adj(n);
        for (auto& f : friends) {
            adj[f[0]].push_back(f[1]);
            adj[f[1]].push_back(f[0]);
        }
        vector<bool> vis(n);
        queue<int> q;
        q.push(id); vis[id] = true;
        while (level-- && !q.empty()) {
            int sz = q.size();
            while (sz--) {
                int u = q.front(); q.pop();
                for (int v : adj[u])
                    if (!vis[v]) { vis[v] = true; q.push(v); }
            }
        }
        map<string, int> freq;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& v : watchedVideos[u]) freq[v]++;
        }
        vector<pair<string,int>> items(freq.begin(), freq.end());
        sort(items.begin(), items.end());
        vector<vector<string>> res;
        for (auto& p : items) res.push_back({p.first});
        return res;
    }
};
```

### Python
```python
class Solution:
    def watchedVideosByFriends(self, watchedVideos: List[List[str]], friends: List[List[int]], id: int, level: int) -> List[List[str]]:
        n = len(watchedVideos)
        adj = [[] for _ in range(n)]
        for a, b in friends:
            adj[a].append(b); adj[b].append(a)
        vis = [False] * n
        q = deque([id])
        vis[id] = True
        for _ in range(level):
            for _ in range(len(q)):
                u = q.popleft()
                for v in adj[u]:
                    if not vis[v]:
                        vis[v] = True
                        q.append(v)
        freq = Counter()
        for u in q:
            freq.update(watchedVideos[u])
        return [[v] for v, _ in sorted(freq.items())]
```

### Java
```java
class Solution {
    public List<List<String>> watchedVideosByFriends(List<List<String>> watchedVideos, int[][] friends, int id, int level) {
        int n = watchedVideos.size();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] f : friends) { adj.get(f[0]).add(f[1]); adj.get(f[1]).add(f[0]); }
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(id); vis[id] = true;
        for (int l = 0; l < level; l++) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                int u = q.poll();
                for (int v : adj.get(u))
                    if (!vis[v]) { vis[v] = true; q.offer(v); }
            }
        }
        Map<String, Integer> freq = new TreeMap<>();
        for (int u : q)
            for (String v : watchedVideos.get(u))
                freq.merge(v, 1, Integer::sum);
        List<List<String>> res = new ArrayList<>();
        for (String v : freq.keySet()) res.add(List.of(v));
        return res;
    }
}
```

**Complexity:** O(n + E + v log v) time · O(n + v) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Level k friends"** → BFS exactly k layers, not ≤ k.
- **"Undirected friend edges"** → standard adjacency BFS.
- **"Sort by frequency then title"** → aggregation after graph step.
- **"Not Dijkstra / not DFS memo"** → unweighted social graph.
- **"Queue after k expansions = answer set"** → key implementation detail.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<string>> watchedVideosByFriends(vector<vector<string>>& watchedVideos, vector<vector<int>>& friends, int id, int level) {
        int n = watchedVideos.size();
        vector<vector<int>> adj(n);
        for (auto& f : friends) {
            adj[f[0]].push_back(f[1]);
            adj[f[1]].push_back(f[0]);
        }
        vector<bool> vis(n);
        queue<int> q;
        q.push(id); vis[id] = true;
        while (level-- && !q.empty()) {
            int sz = q.size();
            while (sz--) {
                int u = q.front(); q.pop();
                for (int v : adj[u])
                    if (!vis[v]) { vis[v] = true; q.push(v); }
            }
        }
        map<string, int> freq;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& v : watchedVideos[u]) freq[v]++;
        }
        vector<pair<string,int>> items(freq.begin(), freq.end());
        sort(items.begin(), items.end());
        vector<vector<string>> res;
        for (auto& p : items) res.push_back({p.first});
        return res;
    }
};
```

### Python
```python
class Solution:
    def watchedVideosByFriends(self, watchedVideos: List[List[str]], friends: List[List[int]], id: int, level: int) -> List[List[str]]:
        n = len(watchedVideos)
        adj = [[] for _ in range(n)]
        for a, b in friends:
            adj[a].append(b); adj[b].append(a)
        vis = [False] * n
        q = deque([id])
        vis[id] = True
        for _ in range(level):
            for _ in range(len(q)):
                u = q.popleft()
                for v in adj[u]:
                    if not vis[v]:
                        vis[v] = True
                        q.append(v)
        freq = Counter()
        for u in q:
            freq.update(watchedVideos[u])
        return [[v] for v, _ in sorted(freq.items())]
```

### Java
```java
class Solution {
    public List<List<String>> watchedVideosByFriends(List<List<String>> watchedVideos, int[][] friends, int id, int level) {
        int n = watchedVideos.size();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] f : friends) { adj.get(f[0]).add(f[1]); adj.get(f[1]).add(f[0]); }
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(id); vis[id] = true;
        for (int l = 0; l < level; l++) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                int u = q.poll();
                for (int v : adj.get(u))
                    if (!vis[v]) { vis[v] = true; q.offer(v); }
            }
        }
        Map<String, Integer> freq = new TreeMap<>();
        for (int u : q)
            for (String v : watchedVideos.get(u))
                freq.merge(v, 1, Integer::sum);
        List<List<String>> res = new ArrayList<>();
        for (String v : freq.keySet()) res.add(List.of(v));
        return res;
    }
}
```

**Complexity:** O(n + E + v log v) time · O(n + v) space
