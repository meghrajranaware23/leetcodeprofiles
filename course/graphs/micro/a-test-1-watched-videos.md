# ⚔ A-Rank Test — Problem 1

> [Get Watched Videos by Your Friends #1311](https://leetcode.com/problems/get-watched-videos-by-your-friends/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Get Watched Videos by Your Friends on LeetCode](https://leetcode.com/problems/get-watched-videos-by-your-friends/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Get Watched Videos by Your Friends #1311](https://leetcode.com/problems/get-watched-videos-by-your-friends/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Name the pattern before you code.

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

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
