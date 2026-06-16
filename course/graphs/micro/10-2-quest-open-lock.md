<!-- hand-authored -->
# ⚔ Quest: Open the Lock

> **Day 10** · [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Open the Lock on LeetCode](https://leetcode.com/problems/open-the-lock/)**

> ⚔ **Hunter's rule:** Each lock string is one **abstract node**. Queue `(state, steps)`. Skip deadends. This is NOT a grid — do not draw `(r,c)`. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Open the Lock #752](https://leetcode.com/problems/open-the-lock/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **State-Space BFS** — start `"0000"`, target given, `deadends` = blocked states. For each wheel index `i` and delta `±1`, generate neighbor string. Queue **`(cur, steps)`**; return `steps` when `cur == target`.

If you're stuck after 5 minutes: 8 neighbors per state (4 wheels × 2 directions). Check `start in deadends` first. Visited = set of strings — not a 2D visited array.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State-Space BFS

**How to identify this from the problem statement:**
- Full lock configuration = state node
- One move = one wheel ±1 (mod 10)
- "Minimum turns" → BFS on state graph
- `deadends` list → dead-end set, never enqueue

| Keyword / phrase | What it signals |
|---|---|
| "combination lock" | String state, not grid |
| "deadends" | Forbidden set — permanent prune |
| "minimum turns to reach target" | BFS `(state, steps)` |
| "0000" start | Check if start is dead |

**Why this pattern works:** All moves cost 1. State graph is unweighted. First BFS arrival at target = minimum twists.

**How a strong solver thinks before coding:**
1. *"dead = set(deadends); if '0000' in dead: -1."*
2. *"q = [('0000', 0)]; vis = {'0000'}."*
3. *"For i in 0..3, d in {-1,1}: build nxt string."*
4. *"Skip if nxt in dead or vis; else enqueue (nxt, steps+1)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Grid BFS with (wheel, digit) coords** | Wrong model — state is full 4-char string |
| **DFS** | May not find minimum turns |
| **BFS without dead-end check** | Wastes queue space; may hit dead configs |
| **Precompute all 10⁴ edges** | Unnecessary — generate 8 neighbors on the fly |

**The insight brute force misses:** The graph is **implicit** — nodes are lock strings; generate edges per dequeue.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/) | 8-char gene, bank set | State-space BFS |
| [Word Ladder #127](https://leetcode.com/problems/word-ladder/) | Word graph | Later rank — same idea |
| [Sliding Puzzle #773](https://leetcode.com/problems/sliding-puzzle/) | Board as string state | Harder state-space |

All use **`(state, steps)`** — none use grid `(r,c)`.

---

## 📖 Walkthrough

**State transitions, not grid cells.**

```
deadends = {"0201"}
target = "0202"

("0000", 0) → generate:
  "1000","9000","0100","0900","0010","0090","0001","0009"
  none dead, all enqueue with steps=1

Continue BFS until "0202" dequeued...

State diagram (2 wheels simplified):
  "00" → "10","01",... (not a 2D grid — string edits)
```

```
for i in 0..3:
  for d in {-1, 1}:
    nxt[i] = (digit + d) % 10
    if nxt not in dead and nxt not in vis:
      vis.add(nxt); q.push((nxt, steps+1))
```

> 💡 **The insight:** `(lock_string, steps)` is Day 8's `(r,c,steps)` with coordinates replaced by configuration.

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

- **"Lock string = one node"** → Not grid BFS — abstract state graph.
- **"(state, steps) in queue"** → Same step logic as Day 8, different node type.
- **"deadends = walls"** → Check before enqueue; start can be dead.
- **"8 neighbors per pop"** → 4 wheels × ±1.

> 🎯 **Pattern Unlocked:** State-Space BFS — configurations as nodes, dead-end set, minimum twists.

---

*One quest down. Next: same pattern on gene strings. →*
