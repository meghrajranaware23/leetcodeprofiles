# ⚔ Quest: Open the Lock

> **Day 10** · [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Open the Lock on LeetCode](https://leetcode.com/problems/open-the-lock/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Open the Lock #752](https://leetcode.com/problems/open-the-lock/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **State-Space BFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State-Space BFS

**How to identify this from the problem statement:**
- Look for graph structure keywords — "node", "edge", "connected", "adjacent", "grid"
- Ask: do I need **BFS** (shortest/levels), **DFS** (connectivity/cycles), or **Dijkstra** (weighted)?
- Check if the input is explicit graph, implicit grid, or abstract state space

| Keyword / phrase | What it signals |
|---|---|
| "shortest path" / "minimum steps" | BFS with visited set |
| "connected" / "reachable" | DFS/BFS from source |
| "grid" / "island" / "matrix" | Grid-as-graph traversal |
| "prerequisites" / "dependencies" | Topological sort |
| "bipartite" / "two teams" | Graph 2-coloring |
| "union" / "merge" / "equivalent" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |

**Why this pattern works:** Graphs model relationships. The pattern names how you explore those relationships — wavefront (BFS), deep dive (DFS), or group merging (UF).

**How a strong solver thinks before coding:**
1. *"What are my nodes? What are my edges?"*
2. *"BFS, DFS, Dijkstra, or Union-Find?"*
3. *"Draw a small example graph and trace by hand."*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all paths without pruning** | Exponential time — visited set is essential |
| **DFS for shortest unweighted path** | BFS guarantees minimum steps |
| **Dijkstra on unweighted graph** | BFS is simpler and equally correct |
| **Nested loops for connectivity** | O(n²) when O(n) BFS/DFS works |

**The insight brute force misses:** Name the exploration strategy. BFS for shortest, DFS for connectivity, Dijkstra for weighted — then add a visited set.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small graph before reading the code:

```
Graph:  A — B — C
        |       |
        D — E   F

Apply State-Space BFS step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end());
        if (dead.count("0000")) return -1;
        queue<pair<string, int>> q;
        q.push({"0000", 0});
        unordered_set<string> vis = {"0000"};
        while (!q.empty()) {
            auto [cur, steps] = q.front(); q.pop();
            if (cur == target) return steps;
            for (int i = 0; i < 4; i++) {
                for (int d : {-1, 1}) {
                    string nxt = cur;
                    int digit = (nxt[i] - '0' + d + 10) % 10;
                    nxt[i] = digit + '0';
                    if (!vis.count(nxt) && !dead.count(nxt)) {
                        vis.insert(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        dead = set(deadends)
        if '0000' in dead: return -1
        q = deque([('0000', 0)])
        vis = {'0000'}
        while q:
            cur, steps = q.popleft()
            if cur == target: return steps
            for i in range(4):
                for d in (-1, 1):
                    nxt = cur[:i] + str((int(cur[i]) + d) % 10) + cur[i + 1:]
                    if nxt not in vis and nxt not in dead:
                        vis.add(nxt)
                        q.append((nxt, steps + 1))
        return -1
```

### Java
```java
class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> dead = new HashSet<>(Arrays.asList(deadends));
        if (dead.contains("0000")) return -1;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{"0000", "0"});
        Set<String> vis = new HashSet<>();
        vis.add("0000");
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            if (cur[0].equals(target)) return Integer.parseInt(cur[1]);
            char[] arr = cur[0].toCharArray();
            for (int i = 0; i < 4; i++) {
                char old = arr[i];
                for (int d : new int[]{-1, 1}) {
                    arr[i] = (char) ('0' + (arr[i] - '0' + d + 10) % 10);
                    String nxt = new String(arr);
                    if (!vis.contains(nxt) && !dead.contains(nxt)) {
                        vis.add(nxt);
                        q.offer(new String[]{nxt, String.valueOf(Integer.parseInt(cur[1]) + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return -1;
    }
}
```

**Complexity:** O(10⁴) time · O(10⁴) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"State-Space BFS"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** State-Space BFS

---

*One quest down. The next one builds on this pattern. →*
