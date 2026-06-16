<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 2

> [Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Jump Game III on LeetCode](https://leetcode.com/problems/jump-game-iii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Nodes are **indices**; from `i` you can jump to `i + arr[i]` or `i - arr[i]` if in bounds.

---

## The Problem

See the full problem statement on LeetCode: **[Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Reachability** on an implicit graph — Day 15's core question without an explicit edge list.

BFS or DFS from `start`. Visited array prevents loops. Return true if any reached index has `arr[i] == 0`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Implicit Graph BFS/DFS Reachability

**How to identify from the statement:**
- State space = array indices 0..n-1
- Transitions defined by rule, not input edges
- Goal state: index where value is 0

**How a strong solver thinks before coding:**
1. *"Nodes = indices, edges = i±arr[i] in bounds."*
2. *"BFS from start with visited[n]."*
3. *"If arr[i]==0 at pop → true."*

**C-Rank connection:** Day 15 transitive closure on explicit graphs; here the graph is **implicit** — generate neighbors on the fly.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Recursion without visited** | Infinite loop on cycles |
| **Try all jump sequences** | Exponential |
| **Greedy single path** | May miss alternate route to zero |

**The insight:** Standard reachability — only the neighbor generation is custom.

---

## 🎯 Transfer to Unseen Problems

*"Can you reach a target state by rule-based moves?"*

Model states as nodes, valid moves as edges, BFS/DFS with visited. Same skeleton as grid BFS — different neighbor function.

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

- **"Indices are nodes."** → implicit graph.
- **"±arr[i] are edges."** → generate neighbors, check bounds.
- **"visited prevents cycles."** → standard BFS.
- **"arr[i]==0 is goal."** → not "reach end of array."

---

*2 of 3 test problems. Continue to the next. →*

## Solution

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
