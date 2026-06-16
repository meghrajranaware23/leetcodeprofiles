<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 1

> [Find Center of Star Graph #1791](https://leetcode.com/problems/find-center-of-star-graph/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Find Center of Star Graph on LeetCode](https://leetcode.com/problems/find-center-of-star-graph/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the star: one center node connected to every other. No peeking until you've genuinely tried.

---

## The Problem

There is an undirected **star graph** with `n` nodes labeled `1` to `n`. A star has one center connected to all `n - 1` other nodes.

Given `n` and an edge list of the star, return the **center** node.

```
Input:  edges = [[1,2],[2,3],[4,2]]
Output: 2

Input:  edges = [[1,2],[5,1],[1,4],[3,4]]
Output: 1
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 1 degree intuition — the center appears in **every** edge.

**Hint 1:** In a star, the center has degree **n − 1** (shows up in all `n − 1` edges).

**Hint 2:** You only need the **first two edges**. The center is the node shared by `edges[0]` and `edges[1]`.

**Hint 3:** Compare: is `edges[0][0]` in `edges[1]`? If yes, that's the center; else it's `edges[0][1]`.

**Hint 4:** No BFS/DFS required — O(1) after reading two edges.

**Hint 5:** Draw three edges all touching node 2 — that repetition *is* the star pattern.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Degree / common-node recognition (Day 1)

| Clue in the problem | What it signals |
|---|---|
| "star graph" | Exactly one node with degree n−1 |
| `n - 1` edges for `n` nodes | Tree-like; single hub |
| Center in every edge | Intersection of first two edges |
| Undirected edges | Center may appear as first or second in pair |
| No weights / no path query | Skip traversal entirely |

**Contrast with Day 1 quests:**

| Town Judge #997 | Star Graph #1791 |
|---|---|
| Directed trust | Undirected edges |
| in=n−1 **and** out=0 | Any node in all edges |
| Scan all people | Check first two edges only |

**How a strong solver thinks before coding:**
1. *"Star = one hub, n−1 spokes."*
2. *"Hub appears in every edge list entry."*
3. *"First two edges share exactly one node — that's center."*
4. *"O(1) — no adjacency list needed."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build full adjacency + count degrees for all n** | Works but slower than necessary |
| **BFS from every node** | Absurd for a graph defined by n−1 edges |
| **Assume center is always `edges[0][0]`** | Center can be second in the pair |
| **Union-Find all edges then find max degree** | Over-engineered |
| **Only look at one edge** | Need two edges to disambiguate which endpoint is hub |

**The insight brute force misses:** Star structure guarantees the center is the **common endpoint** of any two edges.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Find the node that appears in the most edge pairs in a guaranteed star."*

Same intersection trick — or count frequency across edges (center count = n−1).

**Scenario:** *"Given edges, is this graph a star?"*

Verify one node has degree n−1 and all others degree 1.

**30-second check:** *"Two edges → shared node = center."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
public:
    int findCenter(vector<vector<int>>& edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0];
        return edges[0][1];
    }
};
```

### Python
```python
class Solution:
    def findCenter(self, edges: List[List[int]]) -> int:
        a, b = edges[0]
        c, d = edges[1]
        return a if a in (c, d) else b
```

### Java
```java
class Solution {
    public int findCenter(int[][] edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0];
        return edges[0][1];
    }
}
```

**Complexity:** O(1) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Star graph"** → one center, all edges touch it.
- **Day 1 degrees** → center has degree n−1 without full count.
- **First two edges** → fast intersection — E-Rank synthesis.
- **No traversal** → representation insight beats BFS here.

If you over-built adjacency lists, remember: pattern recognition includes knowing when **not** to traverse.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int findCenter(vector<vector<int>>& edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0];
        return edges[0][1];
    }
};
```

### Python
```python
class Solution:
    def findCenter(self, edges: List[List[int]]) -> int:
        a, b = edges[0]
        c, d = edges[1]
        return a if a in (c, d) else b
```

### Java
```java
class Solution {
    public int findCenter(int[][] edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0];
        return edges[0][1];
    }
}
```

**Complexity:** O(1) time · O(1) space
