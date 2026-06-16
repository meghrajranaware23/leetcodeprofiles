<!-- hand-authored -->
# ⚔ Quest: Snakes and Ladders

> **Day 23** · [Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Snakes and Ladders on LeetCode](https://leetcode.com/problems/snakes-and-ladders/)**

> ⚔ **Hunter's rule:** Nodes are square numbers 1..n². One move = roll 1–6, then apply snake/ladder. BFS from square 1.

---

## The Problem

See the full problem statement on LeetCode: **[Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Board square BFS** — not a 4-directional grid walk.

- `dist[square]` = minimum rolls to reach that square; `-1` = unvisited.
- From square `s`, try `d = 1..6`: `ns = s + d` (cap at n²).
- Map `ns` → `(r,c)` via **zigzag label**; if `board[r][c] != -1`, replace `ns` with that value (snake/ladder).
- First BFS arrival at n² wins.

Helper `label(s)` converts square number to board coordinates.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Implicit Board Graph BFS

**How to identify this from the problem statement:**
- "Minimum moves" + dice → unweighted BFS
- Board has teleports (snakes/ladders) → apply after landing
- Squares numbered 1..n² in boustrophedon order

| Keyword / phrase | What it signals |
|---|---|
| "square labeled 1 to n²" | Node = square index, not (r,c) primary |
| "snake or ladder" | Post-process landing square |
| "roll 1 to 6" | Up to 6 edges per node |
| "return -1" if unreachable | Standard BFS failure |

**Why this pattern works:** Each roll is one edge cost. Teleport is part of the transition, not a separate BFS layer.

**How a strong solver thinks before coding:**
1. *"Write label(s) → (r,c) with zigzag rows."*
2. *"dist[1]=0; queue {1}."*
3. *"For d in 1..6: ns = min(s+d, n²); apply board teleport."*
4. *"If dist[ns]==-1: dist[ns]=dist[s]+1; push."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS** | No shortest-roll guarantee |
| **Treat (r,c) as BFS node without square logic** | Numbering is zigzag — off-by-one bugs |
| **Separate BFS for teleport** | Teleport follows landing in same move |
| **Revisit squares without dist[]** | Cycles through snakes possible |

**The insight:** One graph on **square indices**; zigzag map is only for reading the board array.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/) | This problem | Square BFS |
| [Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/) | Array indices, no dice | C-test — reachability BFS |
| [Word Ladder #127](https://leetcode.com/problems/word-ladder/) | Word neighbors | Same implicit BFS skeleton |

---

## 📖 Walkthrough

```
n=2 board (squares 1-4):
  After roll from 1 with d=1 → square 2
  After roll d=2 → square 3
  If square 3 has ladder to 4 → ns becomes 4 in same step

dist[1]=0
queue: 1 → expand rolls → mark dist for new squares
stop when square n² first reached
```

> 💡 **The insight:** Dice defines edges; board array only affects **where you land**.

---

## Solution

### C++
```cpp
class Solution {
public:
    int snakesAndLadders(vector<vector<int>>& board) {
        int n = board.size();
        auto label = [&](int s) {
            int r = (s - 1) / n, c = (s - 1) % n;
            if (r % 2) c = n - 1 - c;
            return make_pair(n - 1 - r, c);
        };
        vector<int> dist(n * n + 1, -1);
        queue<int> q;
        q.push(1); dist[1] = 0;
        while (!q.empty()) {
            int s = q.front(); q.pop();
            if (s == n * n) return dist[s];
            for (int d = 1; d <= 6; d++) {
                int ns = s + d;
                if (ns > n * n) break;
                auto [r, c] = label(ns);
                if (board[r][c] != -1) ns = board[r][c];
                if (dist[ns] == -1) { dist[ns] = dist[s] + 1; q.push(ns); }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        def label(s):
            r, c = divmod(s - 1, n)
            if r % 2: c = n - 1 - c
            return n - 1 - r, c
        dist = [-1] * (n * n + 1)
        q = deque([1])
        dist[1] = 0
        while q:
            s = q.popleft()
            if s == n * n: return dist[s]
            for d in range(1, 7):
                ns = s + d
                if ns > n * n: break
                r, c = label(ns)
                if board[r][c] != -1: ns = board[r][c]
                if dist[ns] == -1:
                    dist[ns] = dist[s] + 1
                    q.append(ns)
        return -1
```

### Java
```java
class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        int[] dist = new int[n * n + 1];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(1); dist[1] = 0;
        while (!q.isEmpty()) {
            int s = q.poll();
            if (s == n * n) return dist[s];
            for (int d = 1; d <= 6; d++) {
                int ns = s + d;
                if (ns > n * n) break;
                int r = (ns - 1) / n, c = (ns - 1) % n;
                if (r % 2 == 1) c = n - 1 - c;
                r = n - 1 - r;
                if (board[r][c] != -1) ns = board[r][c];
                if (dist[ns] == -1) { dist[ns] = dist[s] + 1; q.offer(ns); }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n²) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Dice + board teleports"** → BFS on square numbers.
- **"Zigzag labeling"** → helper function, test on n=2.
- **"Apply snake/ladder after landing"** → one transition per roll.
- **"dist[] not bool[]"** → need minimum rolls.
- **"Not word ladder, not lock"** → different neighbor generator, same BFS.

> 🎯 **Pattern Unlocked:** Implicit Board Graph BFS

---

*Both quests complete. Head to the checkpoint. →*
