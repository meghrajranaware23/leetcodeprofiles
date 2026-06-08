# ⚔ A-Rank Test — Problem 2

> [Minimum Operations to Convert Number #2059](https://leetcode.com/problems/minimum-operations-to-convert-number/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Operations to Convert Number on LeetCode](https://leetcode.com/problems/minimum-operations-to-convert-number/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Operations to Convert Number #2059](https://leetcode.com/problems/minimum-operations-to-convert-number/)**

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
    int minimumOperations(int start, int goal, vector<int>& nums) {
        if (start == goal) return 0;
        unordered_set<int> vis;
        queue<pair<int,int>> q;
        q.push({start, 0});
        vis.insert(start);
        while (!q.empty()) {
            auto [x, steps] = q.front(); q.pop();
            for (int d : {-1, 1}) {
                for (int n : nums) {
                    int nx = x + d * n;
                    if (nx == goal) return steps + 1;
                    if (nx >= 0 && nx <= 1000 && !vis.count(nx)) {
                        vis.insert(nx);
                        q.push({nx, steps + 1});
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
    def minimumOperations(self, start: int, goal: int, nums: List[int]) -> int:
        if start == goal: return 0
        vis = {start}
        q = deque([(start, 0)])
        while q:
            x, steps = q.popleft()
            for d in (-1, 1):
                for n in nums:
                    nx = x + d * n
                    if nx == goal: return steps + 1
                    if 0 <= nx <= 1000 and nx not in vis:
                        vis.add(nx)
                        q.append((nx, steps + 1))
        return -1
```

### Java
```java
class Solution {
    public int minimumOperations(int start, int goal, int[] nums) {
        if (start == goal) return 0;
        Set<Integer> vis = new HashSet<>();
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{start, 0});
        vis.add(start);
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int d : new int[]{-1, 1}) {
                for (int n : nums) {
                    int nx = cur[0] + d * n;
                    if (nx == goal) return cur[1] + 1;
                    if (nx >= 0 && nx <= 1000 && !vis.contains(nx)) {
                        vis.add(nx);
                        q.offer(new int[]{nx, cur[1] + 1});
                    }
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(1000 · k) time · O(1000) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
