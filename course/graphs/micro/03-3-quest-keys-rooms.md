<!-- hand-authored -->
# ⚔ Quest: Keys and Rooms

> **Day 3** · [Keys and Rooms #841](https://leetcode.com/problems/keys-and-rooms/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Keys and Rooms on LeetCode](https://leetcode.com/problems/keys-and-rooms/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw rooms as nodes; draw arrows to keys held in each room. Trace DFS from room 0. The hints below are for *after* your attempt.

---

## The Problem

There are `n` rooms labeled `0` to `n-1`. `rooms[i]` lists keys (room numbers) found inside room `i`.

You start in room `0` (which is unlocked). Return `true` if you can enter **every** room, else `false`.

```
Input:  rooms = [[1],[2],[3],[]]
Output: true
Explanation: 0 → 1 → 2 → 3

Input:  rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: Room 2 never reachable from 0.
```

---

## 💡 Hints

Which pattern from today's concept applies? **DFS reachability** — one flood from node 0, then check if every room was visited.

**Hint 1:** `visited = [False]*n`. Call `dfs(0)`.

**Hint 2:** `dfs(u)`: set `visited[u]=True`. For each key `v` in `rooms[u]`, if not `visited[v]`, call `dfs(v)`.

**Hint 3:** Return `all(visited)` — not just "can I reach room n-1?"

**Hint 4:** Graph is **directed** — key in room `i` opens room `j` means edge `i → j` only.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DFS Reachability

**How to identify this from the problem statement:**
- Single start node `0` → one DFS, not component restart loop
- "Visit all rooms" → boolean visited array, check completeness
- Adjacency given explicitly as `rooms[i]` → neighbor list
- Directed edges (keys are one-way access)

| Keyword / phrase | What it signals |
|---|---|
| "can you visit all" / "enter every room" | Full reachability from start |
| `rooms[i]` = list of keys | `adj[i]` neighbors |
| Start at room 0 | `dfs(0)` only |
| Return true/false | `all(visited)` |
| Keys only open forward | Directed DFS |

**Why this pattern works:** DFS from 0 marks every room reachable along directed edges. If any room stays unvisited, it's impossible.

**How a strong solver thinks before coding:**
1. *"Graph: edge i→v for each key v in rooms[i]."*
2. *"dfs(0) with visited array."*
3. *"Return whether every index is True in visited."*
4. *"Example 2: room 2 never entered → false."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Follow keys greedily without visited** | Cycles (0→1→0) cause infinite loop |
| **Only check path to last room** | Middle rooms might be skipped |
| **BFS only from room 0 without visited** | Same cycle issue |
| **Treat keys as undirected edges** | Can't model one-way access |
| **Restart DFS from every unvisited room** | You can't enter locked rooms without keys — must start at 0 only |

**The insight brute force misses:** One DFS flood from 0 marks the **reachable set**. Answer = entire set equals all rooms.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Find if Path Exists #1971 (Day 1) | Undirected, two endpoints | Connectivity check |
| Number of Provinces #547 (Quest 1) | Count all components | Restart loop variant |
| Course Schedule (later) | Cycle detection on directed graph | DFS with state colors |

Same DFS skeleton — different stopping condition and graph direction.

---

## 📖 Walkthrough

**DFS from 0 — stack chases keys until exhausted.**

```
rooms = [[1], [2], [3], []]

Graph:  0 → 1 → 2 → 3

dfs(0): vis[0]=T → key 1 → dfs(1)
dfs(1): vis[1]=T → key 2 → dfs(2)
dfs(2): vis[2]=T → key 3 → dfs(3)
dfs(3): vis[3]=T → no keys

all(visited) = true ✓

rooms = [[1,3], [3,0,1], [2], [0]]
From 0: reach 1,3,0,… but room 2 never gets a key path → false ✓
```

> 💡 **The insight:** Keys define directed edges. DFS visit order shows the exploration path — depth-first, not level-by-level.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<vector<int>>& rooms, int u, vector<bool>& vis) {
        vis[u] = true;
        for (int v : rooms[u]) if (!vis[v]) dfs(rooms, v, vis);
    }
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
        vector<bool> vis(rooms.size());
        dfs(rooms, 0, vis);
        for (bool v : vis) if (!v) return false;
        return true;
    }
};
```

### Python
```python
class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        vis = [False] * len(rooms)
        def dfs(u):
            vis[u] = True
            for v in rooms[u]:
                if not vis[v]:
                    dfs(v)
        dfs(0)
        return all(vis)
```

### Java
```java
class Solution {
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        boolean[] vis = new boolean[rooms.size()];
        dfs(rooms, 0, vis);
        for (boolean v : vis) if (!v) return false;
        return true;
    }
    private void dfs(List<List<Integer>> rooms, int u, boolean[] vis) {
        vis[u] = true;
        for (int v : rooms.get(u)) if (!vis[v]) dfs(rooms, v, vis);
    }
}
```

**Complexity:** O(V + E) time · O(V) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Visit all from room 0"** → single DFS reachability, not component count.
- **`rooms[i]` is adj[i]** → Day 1 representation, Day 3 traversal.
- **`all(visited)`** → every room index must be True.
- **Directed graph** → can't restart from locked rooms.

Provinces counts groups; Keys and Rooms asks if **one** flood covers everything.

> 🎯 **Pattern Unlocked:** DFS from source — visited set proves reachability.

---

*Both quests complete. Head to the checkpoint. →*
