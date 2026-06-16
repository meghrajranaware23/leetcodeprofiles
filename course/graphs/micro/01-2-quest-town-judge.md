<!-- hand-authored -->
# ⚔ Quest: Find the Town Judge

> **Day 1** · [Find the Town Judge #997](https://leetcode.com/problems/find-the-town-judge/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find the Town Judge on LeetCode](https://leetcode.com/problems/find-the-town-judge/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For each trust pair `[a,b]`, mark an arrow `a → b`. Count arrows in and out of every person. The hints below are for *after* your attempt.

---

## The Problem

In a town of `n` people labeled `1` to `n`, trust is **directed**: `[a, b]` means `a` trusts `b`.

The **town judge** exists iff:
- Everyone else trusts the judge (`n - 1` incoming trust edges)
- The judge trusts nobody (`0` outgoing trust edges)

Return the judge's label, or `-1` if no such person exists.

```
Input:  n = 3, trust = [[1,3],[2,3]]
Output: 3

Input:  n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
Explanation: Person 3 is trusted by 2 people but also trusts person 1.
```

---

## 💡 Hints

Which pattern from today's concept applies? **In-degree / out-degree counting** — no BFS needed.

**Hint 1:** Create two arrays `in[1…n]` and `out[1…n]`, initialized to zero.

**Hint 2:** For each `[a, b]` in `trust`: `out[a]++` and `in[b]++`.

**Hint 3:** Scan `i` from `1` to `n`. Candidate judge: `in[i] == n - 1` **and** `out[i] == 0`.

**Hint 4:** If multiple people could match (they can't both have `in = n-1` in a valid judge scenario), return the one you find — or `-1` if none.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Degree Analysis (directed graph)

**How to identify this from the problem statement:**
- Directed pairs `[a,b]` → one-way edges, not undirected adjacency
- "Everyone trusts X" → high **in-degree** on X
- "X trusts nobody" → zero **out-degree** on X
- No path/walk language → skip DFS/BFS entirely

| Keyword / phrase | What it signals |
|---|---|
| "trust" / "a trusts b" | Directed edge a → b |
| "everyone else trusts" | in-degree = n − 1 |
| "trusts nobody" | out-degree = 0 |
| "find the person" / single answer | Linear scan after counting |
| Small n, edge list input | O(E) count, O(n) scan |

**Why this pattern works:** The judge is defined purely by edge counts. Counting once over `trust` gives all the information — no graph traversal required.

**How a strong solver thinks before coding:**
1. *"Directed edges → in[] and out[] arrays."*
2. *"For [a,b]: out[a]++, in[b]++."*
3. *"Find i with in[i]=n-1 and out[i]=0."*
4. *"Trace Example 1: only node 3 qualifies."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build adjacency list + BFS from every node** | Massive overkill — degrees answer directly |
| **Check if each person is trusted by all others with nested loops** | O(n²) per candidate vs O(E) total count |
| **Treat trust as undirected** | `[3,1]` would wrongly boost 3's out-degree logic |
| **Only count in-degree, forget out-degree** | Example 2: node 3 has in=2 but out=1 — not a judge |
| **Return first person with in=n-1 without checking out** | Someone who trusts others fails the definition |

**The insight brute force misses:** The judge is a **degree signature**, not a reachability question. Two arrays, one pass.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Course Schedule (in-degree preview) | Count prerequisites per course | in-degree array from edges |
| Network Delay (later ranks) | Weighted edges | Still build structure from edge list first |
| Find Eventual Safe States | Out-edges to follow | Directed degree / reachability hybrid |

Same Day 1 habit: read edges → update counters → scan for the answer.

---

## 📖 Walkthrough

**Trust pairs → degree arrays → scan for judge.**

```
n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]

After counting:
  person | in | out
  -------+----+----
     1   |  0 |  2   (trusts 3 and 4)
     2   |  0 |  2   (trusts 3 and 4)
     3   |  3 |  0   (trusted by 1,2,4)  ← in=3=n-1, out=0 ✓
     4   |  0 |  1   (trusts 3 only)

Return 3.
```

> 💡 **The insight:** Trust is one-way. The judge sits at the sink of all trust arrows — everyone points in, nothing points out.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
        vector<int> in(n + 1), out(n + 1);
        for (auto& t : trust) { out[t[0]]++; in[t[1]]++; }
        for (int i = 1; i <= n; i++)
            if (in[i] == n - 1 && !out[i]) return i;
        return -1;
    }
};
```

### Python
```python
class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        indeg = [0] * (n + 1)
        outdeg = [0] * (n + 1)
        for a, b in trust:
            outdeg[a] += 1
            indeg[b] += 1
        for i in range(1, n + 1):
            if indeg[i] == n - 1 and outdeg[i] == 0:
                return i
        return -1
```

### Java
```java
class Solution {
    public int findJudge(int n, int[][] trust) {
        int[] in = new int[n + 1], out = new int[n + 1];
        for (int[] t : trust) { out[t[0]]++; in[t[1]]++; }
        for (int i = 1; i <= n; i++)
            if (in[i] == n - 1 && out[i] == 0) return i;
        return -1;
    }
}
```

**Complexity:** O(E) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Trust is directed"** → `out[a]++`, `in[b]++` on `[a,b]`.
- **"Everyone trusts the judge"** → `in[judge] == n - 1`.
- **"Judge trusts nobody"** → `out[judge] == 0`.
- **No traversal** → Day 1 degree pattern; save BFS for Day 2.

If you started building an adjacency list, that's good practice — but this problem stops at the counters.

> 🎯 **Pattern Unlocked:** Degree analysis — two arrays, one edge pass, one scan.

---

*One quest down. Next: same town, different question — can you walk from A to B? →*
