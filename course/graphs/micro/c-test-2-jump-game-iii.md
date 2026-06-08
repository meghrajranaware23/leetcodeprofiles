# ⚔ C-Rank Test — Problem 2

> [Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Jump Game III on LeetCode](https://leetcode.com/problems/jump-game-iii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Name the pattern before you code.

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
    bool canReach(vector<int>& arr, int start) {
        int n = arr.size();
        vector<bool> vis(n);
        queue<int> q;
        q.push(start);
        vis[start] = true;
        while (!q.empty()) {
            int i = q.front(); q.pop();
            if (!arr[i]) return true;
            for (int nxt : {i + arr[i], i - arr[i]}) {
                if (nxt >= 0 && nxt < n && !vis[nxt]) {
                    vis[nxt] = true;
                    q.push(nxt);
                }
            }
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def canReach(self, arr: List[int], start: int) -> bool:
        n = len(arr)
        vis = [False] * n
        q = deque([start])
        vis[start] = True
        while q:
            i = q.popleft()
            if arr[i] == 0: return True
            for nxt in (i + arr[i], i - arr[i]):
                if 0 <= nxt < n and not vis[nxt]:
                    vis[nxt] = True
                    q.append(nxt)
        return False
```

### Java
```java
class Solution {
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(start); vis[start] = true;
        while (!q.isEmpty()) {
            int i = q.poll();
            if (arr[i] == 0) return true;
            for (int nxt : new int[]{i + arr[i], i - arr[i]}) {
                if (nxt >= 0 && nxt < n && !vis[nxt]) {
                    vis[nxt] = true;
                    q.offer(nxt);
                }
            }
        }
        return false;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
