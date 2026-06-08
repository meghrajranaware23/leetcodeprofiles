# ⚔ Quest: Minimum Genetic Mutation

> **Day 10** · [Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Genetic Mutation on LeetCode](https://leetcode.com/problems/minimum-genetic-mutation/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **State Graph BFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State Graph BFS

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

Apply State Graph BFS step by step on this graph.
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
    int minMutation(string startGene, string endGene, vector<string>& bank) {
        unordered_set<string> dict(bank.begin(), bank.end());
        if (!dict.count(endGene)) return -1;
        queue<pair<string, int>> q;
        q.push({startGene, 0});
        dict.erase(startGene);
        string genes = "ACGT";
        while (!q.empty()) {
            auto [gene, steps] = q.front(); q.pop();
            for (int i = 0; i < 8; i++) {
                string nxt = gene;
                for (char c : genes) {
                    nxt[i] = c;
                    if (nxt == endGene) return steps + 1;
                    if (dict.count(nxt)) {
                        dict.erase(nxt);
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
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        words = set(bank)
        if endGene not in words: return -1
        q = deque([(startGene, 0)])
        words.discard(startGene)
        genes = 'ACGT'
        while q:
            gene, steps = q.popleft()
            for i in range(8):
                for c in genes:
                    nxt = gene[:i] + c + gene[i + 1:]
                    if nxt == endGene: return steps + 1
                    if nxt in words:
                        words.remove(nxt)
                        q.append((nxt, steps + 1))
        return -1
```

### Java
```java
class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        Set<String> dict = new HashSet<>(Arrays.asList(bank));
        if (!dict.contains(endGene)) return -1;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{startGene, "0"});
        dict.remove(startGene);
        char[] genes = {'A','C','G','T'};
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            String gene = cur[0];
            int steps = Integer.parseInt(cur[1]);
            char[] arr = gene.toCharArray();
            for (int i = 0; i < 8; i++) {
                char old = arr[i];
                for (char c : genes) {
                    arr[i] = c;
                    String nxt = new String(arr);
                    if (nxt.equals(endGene)) return steps + 1;
                    if (dict.contains(nxt)) {
                        dict.remove(nxt);
                        q.offer(new String[]{nxt, String.valueOf(steps + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n · 8 · 4) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"State Graph BFS"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** State Graph BFS

---

*Both quests complete. Head to the checkpoint. →*
