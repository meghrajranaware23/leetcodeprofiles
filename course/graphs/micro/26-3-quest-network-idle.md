<!-- hand-authored -->
# ⚔ Quest: Time When Network Becomes Idle

> **Day 26** · [The Time When the Network Becomes Idle #2039](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open The Time When the Network Becomes Idle on LeetCode](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/)**

> ⚔ **Hunter's rule:** BFS `dist[]` from server 0 on tree. Each node `i`: last resend + round-trip = bottleneck. Answer = max + 1.

---

## The Problem

See the full problem statement on LeetCode: **[The Time When the Network Becomes Idle #2039](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Tree BFS + bottleneck timing** — not Dijkstra, not DFS memo.

- BFS from 0 → `dist[i]` = hops to server (each edge = 1 sec one way).
- For node `i ≥ 1`: `roundTrip = 2 * dist[i]`.
- Last send before reply: `lastSend = ((roundTrip - 1) / patience[i]) * patience[i]`.
- Node `i` quiet at `lastSend + roundTrip`; answer = `max(...) + 1`.

Tree structure guarantees unique paths — BFS dist is exact.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree BFS + Bottleneck Max

**How to identify this from the problem statement:**
- Connected tree, server at node 0
- Each node retransmits on patience schedule until reply
- Ask when **all** nodes finished — max over bottlenecks

| Keyword / phrase | What it signals |
|---|---|
| "Tree" + "edges" | BFS dist from root |
| "patience[i]" | Resend interval math |
| "Network becomes idle" | Max finish time |
| Unit edge time | BFS not Dijkstra |

**Why this pattern works:** Nodes don't interfere after BFS — each has independent last-send timeline bounded by round-trip.

**How a strong solver thinks before coding:**
1. *"Build adj; BFS dist from 0."*
2. *"For i=1..n-1: rt=2*dist[i]."*
3. *"lastSend = ((rt-1)/patience[i])*patience[i]."*
4. *"ans = max(lastSend+rt); return ans+1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate every second globally** | Too slow — use closed form |
| **DFS for dist on tree** | BFS simpler for unweighted |
| **Dijkstra** | All weights 1 — overkill |
| **Forget +1 at end** | Off-by-one on idle second |

**The insight:** After BFS, problem is **arithmetic per node**, not graph traversal.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | Weighted general graph | Day 19 |
| [Inform Employees #1376](https://leetcode.com/problems/time-needed-to-inform-all-employees/) | Tree max depth + inform time | Day 15 |
| [Network Idle #2039](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/) | Patience bottleneck | Day 26 |

---

## 📖 Walkthrough

```
Tree: 0—1—2, patience[1]=2, patience[2]=3
dist[1]=1, dist[2]=2

Node 1: rt=2, lastSend=0, finish=2
Node 2: rt=4, lastSend=3, finish=7

ans = max(2,7)+1 = 8
```

> 💡 **The insight:** BFS gives geometry; patience formula gives schedule.

---

## Solution

### C++
```cpp
class Solution {
public:
    int networkBecomesIdle(vector<vector<int>>& edges, vector<int>& patience) {
        int n = patience.size();
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(0); dist[0] = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u])
                if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
        }
        int ans = 0;
        for (int i = 1; i < n; i++) {
            int roundTrip = 2 * dist[i];
            int lastSend = ((roundTrip - 1) / patience[i]) * patience[i];
            ans = max(ans, lastSend + roundTrip);
        }
        return ans + 1;
    }
};
```

### Python
```python
class Solution:
    def networkBecomesIdle(self, edges: List[List[int]], patience: List[int]) -> int:
        n = len(patience)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        dist = [-1] * n
        q = deque([0])
        dist[0] = 0
        while q:
            u = q.popleft()
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        ans = 0
        for i in range(1, n):
            rt = 2 * dist[i]
            last = ((rt - 1) // patience[i]) * patience[i]
            ans = max(ans, last + rt)
        return ans + 1
```

### Java
```java
class Solution {
    public int networkBecomesIdle(int[][] edges, int[] patience) {
        int n = patience.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(0); dist[0] = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u))
                if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); }
        }
        int ans = 0;
        for (int i = 1; i < n; i++) {
            int rt = 2 * dist[i];
            int last = ((rt - 1) / patience[i]) * patience[i];
            ans = Math.max(ans, last + rt);
        }
        return ans + 1;
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Tree + server at 0"** → BFS dist.
- **"Patience retransmission"** → lastSend formula.
- **"All nodes quiet"** → max bottleneck.
- **"+1 for idle second"** → easy off-by-one.
- **"Not matrix DAG quest"** → schedule math after one BFS.

> 🎯 **Pattern Unlocked:** Tree BFS + Bottleneck Max

---

*Both quests complete. Head to the checkpoint. →*
