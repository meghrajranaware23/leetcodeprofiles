<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 2

> [Minimum Operations to Convert Number #2059](https://leetcode.com/problems/minimum-operations-to-convert-number/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Operations to Convert Number on LeetCode](https://leetcode.com/problems/minimum-operations-to-convert-number/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. State = integer in [0,1000]. BFS `(value, steps)` with +/- each nums[i]. Not Day 10 lock strings.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Operations to Convert Number #2059](https://leetcode.com/problems/minimum-operations-to-convert-number/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Bounded integer state-space BFS** — Day 23/27 cousin.

- If `start == goal` → return 0.
- Queue `(x, steps)`; visited set of integers.
- From each `x`, for each `n` in `nums` and each sign `±1`: `nx = x + d*n`.
- If `nx == goal` → return `steps+1`.
- Enqueue only if `0 <= nx <= 1000` and unseen.

**Pattern name before coding:** *Bounded state BFS on integer line.*

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bounded State-Space BFS

**How to identify from the statement:**
- Minimum operations to reach target
- Each operation adds/subtracts a fixed set of values
- State space bounded [0,1000] → finite BFS

**How a strong solver thinks before coding:**
1. *"Edge case start==goal."*
2. *"BFS (start, 0); vis={start}."*
3. *"Neighbors: x ± nums[i] for all i."*
4. *"Check goal before enqueue; bound nx."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS** | Not minimum operations |
| **Unbounded BFS** | Values can grow — must cap at 1000 |
| **Greedy +/- toward goal** | nums[] set may not allow greedy |
| **Day 10 lock template literally** | State is int, not string |

---

## 🎯 Transfer to Unseen Problems

*"Minimum steps to reach target using ± fixed jumps, bounded domain."*

Same family as [Minimum Jumps to Reach Home #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/) — but simpler state (no back flag). If domain is small, **always consider BFS on state**.

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

- **"Minimum operations" + small integer range** → bounded BFS.
- **"± each nums[i]"** → generate neighbors on the fly.
- **"0..1000 constraint"** → visited set size bounded.
- **"start==goal early return"** → before BFS.
- **"Not weighted"** → not Dijkstra.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

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
