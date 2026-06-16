<!-- hand-authored -->
# ⚔ Quest: Minimum Jumps to Reach Home

> **Day 27** · [Minimum Jumps to Reach Home #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Jumps to Reach Home on LeetCode](https://leetcode.com/problems/minimum-jumps-to-reach-home/)**

> ⚔ **Hunter's rule:** State = `(position, justMovedBack)`. Forward always; backward only if `back==0`. Skip `forbidden` cell.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Jumps to Reach Home #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**BFS with forbidden positions + expanded state.**

- Queue `(pos, back)` — `back=1` if last move was backward.
- Forward: `pos+a` if in bounds, not forbidden, unvisited.
- Backward: only if `back==0`, to `pos-b`.
- Cap `pos` at `2*6000` (safe upper bound); x ≤ 6000.
- `dist[pos]` or 2D visited — first reach of `x` wins.

Not plain number-line BFS — need back flag.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS with Forbidden States

**How to identify this from the problem statement:**
- Minimum jumps on line → unweighted BFS
- One forbidden coordinate → skip in neighbor gen
- "Cannot jump backward twice in a row" → expand state

| Keyword / phrase | What it signals |
|---|---|
| "Minimum jumps" | BFS layers |
| "Forbidden integer" | Hard block node |
| "Backward consecutively" | `(pos, back)` state |
| "+a forward, -b backward" | Two move types |

**Why this pattern works:** Without back flag, BFS would allow illegal sequences; expanded state restores correct move grammar.

**How a strong solver thinks before coding:**
1. *"Queue (0,0); dist[0]=0."*
2. *"Forward → (pos+a, 0)."*
3. *"If !back: backward → (pos-b, 1)."*
4. *"Skip forbidden; bound pos."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS on position only** | Allows double-back |
| **DFS** | Not minimum jumps |
| **Dijkstra** | Unweighted |
| **Ignore 6000 bound** | May TLE on infinite forward drift |

**The insight:** Constraint is **move history**, not just location — state must include flag.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) | String state | Day 10 |
| [Minimum Jumps #1654](https://leetcode.com/problems/minimum-jumps-to-reach-home/) | (pos, back) | Day 27 |
| [Visit All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | Bitmask state | S30 preview |

---

## 📖 Walkthrough

```
a=6, b=3, forbidden=14, x=16

(0,0) → forward 6 → (6,0) → forward 12 → (12,0) → forward 18...
Also backward paths when back==0

BFS finds minimum layers to (16, *)
Cannot land on 14 ever
```

> 💡 **The insight:** Same BFS queue as Day 10 — different state tuple.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minimumJumps(int forbidden, int a, int b, int x) {
        const int MAX = 6000;
        vector<int> dist(2 * MAX + 1, -1);
        queue<pair<int,int>> q;
        q.push({0, 0});
        dist[0] = 0;
        while (!q.empty()) {
            auto [pos, back] = q.front(); q.pop();
            if (pos == x) return dist[pos];
            int fwd = pos + a;
            if (fwd <= 2 * MAX && fwd != forbidden && dist[fwd] == -1) {
                dist[fwd] = dist[pos] + 1;
                q.push({fwd, 0});
            }
            if (!back) {
                int bwd = pos - b;
                if (bwd >= 0 && bwd != forbidden && dist[bwd] == -1) {
                    dist[bwd] = dist[pos] + 1;
                    q.push({bwd, 1});
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
    def minimumJumps(self, forbidden: int, a: int, b: int, x: int) -> int:
        MAX = 6000
        dist = [-1] * (2 * MAX + 1)
        q = deque([(0, 0)])
        dist[0] = 0
        while q:
            pos, back = q.popleft()
            if pos == x: return dist[pos]
            fwd = pos + a
            if fwd <= 2 * MAX and fwd != forbidden and dist[fwd] == -1:
                dist[fwd] = dist[pos] + 1
                q.append((fwd, 0))
            if not back:
                bwd = pos - b
                if bwd >= 0 and bwd != forbidden and dist[bwd] == -1:
                    dist[bwd] = dist[pos] + 1
                    q.append((bwd, 1))
        return -1
```

### Java
```java
class Solution {
    public int minimumJumps(int forbidden, int a, int b, int x) {
        final int MAX = 6000;
        int[] dist = new int[2 * MAX + 1];
        Arrays.fill(dist, -1);
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        dist[0] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == x) return dist[cur[0]];
            int fwd = cur[0] + a;
            if (fwd <= 2 * MAX && fwd != forbidden && dist[fwd] == -1) {
                dist[fwd] = dist[cur[0]] + 1;
                q.offer(new int[]{fwd, 0});
            }
            if (cur[1] == 0) {
                int bwd = cur[0] - b;
                if (bwd >= 0 && bwd != forbidden && dist[bwd] == -1) {
                    dist[bwd] = dist[cur[0]] + 1;
                    q.offer(new int[]{bwd, 1});
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(MAX) time · O(MAX) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"No consecutive backward"** → `(pos, back)` BFS.
- **"Forbidden cell"** → skip in both move types.
- **"Minimum jumps"** → BFS not DFS.
- **"Bound search"** → 2×6000 safe cap.
- **"S30 preview"** → expanded state when move rules depend on history.

> 🎯 **Pattern Unlocked:** BFS with Forbidden States

---

*One quest down. Next: static rank — no traversal. →*
