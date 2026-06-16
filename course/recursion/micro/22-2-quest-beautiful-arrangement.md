<!-- hand-authored -->
# ⚔ Quest: Beautiful Arrangement

> **Day 22** · [Beautiful Arrangement #526](https://leetcode.com/problems/beautiful-arrangement/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Beautiful Arrangement on LeetCode](https://leetcode.com/problems/beautiful-arrangement/)**

> ⚔ **Hunter's rule:** Trace `n=3` on paper. At each `pos`, list which unused numbers pass the divisibility test before you recurse.

---

## The Problem

Suppose you have `n` integers labeled `1` through `n`. A permutation of those integers `perm` (1-indexed) is called a **beautiful arrangement** if:

- For every `i` where `1 <= i <= n`, **either** `perm[i] % i == 0` **or** `i % perm[i] == 0`.

Given `n`, return the **number** of beautiful arrangements.

```
Input:  n = 2
Output: 2
Explanation: [1,2] and [2,1] both valid

Input:  n = 1
Output: 1
```

---

## 💡 Hints

**Hint 1:** Fill positions `pos = 1, 2, ..., n` in order. At each level, try every unused number `i`.

**Hint 2:** **Constraint before choose:** skip `i` if `i % pos != 0` **and** `pos % i != 0`.

**Hint 3:** Use `used[i]` (Day 12 permutation style). Base: `pos > n` → increment global counter.

**Hint 4:** No need to store the path — only count. `used[]` push/pop is enough.

**Hint 5:** `n <= 15` — full backtrack with in-loop pruning is fast enough.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divisibility Constraint Permutation

| Clue | Signal |
|---|---|
| "permutation of 1..n" | `used[]` backtracking |
| rule ties **value to position** | Check `(i, pos)` before placing |
| "count" valid arrangements | Global `ans++` at leaf, no result vector |
| small n (≤ 15) | Prune in loop; no memo needed |

**Contrast with Day 12 Permutations:**

| Permutations #46 | Beautiful Arrangement |
|---|---|
| Any unused number at each level | Only numbers passing divisibility rule |
| Record full path at leaf | Count only |
| No positional constraint | `i % pos == 0 OR pos % i == 0` |

**How a strong solver thinks before coding:**
1. *"pos is 1-indexed — loop pos from 1 to n."*
2. *"For each unused i, divisibility check first."*
3. *"used[i] true → dfs(pos+1) → used[i] false."*
4. *"pos > n → ans++."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all n! permutations, then filter** | Correct but explores huge dead subtrees |
| **0-indexed pos without adjusting rule** | Off-by-one on divisibility check |
| **Check constraint after placement** | Wastes dfs calls on invalid branches |
| **Store every path in a vector** | Unnecessary — count only |

**The insight brute force misses:** The constraint eliminates most `(pos, i)` pairs **at the loop** — same skeleton as permutations, tighter branch factor.

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant |
|---|---|
| [Permutations #46](https://leetcode.com/problems/permutations/) | Day 12 — no positional constraint |
| [Beautiful Arrangement II](https://leetcode.com/problems/beautiful-arrangement-ii/) | Construct one arrangement, not count |
| [N-Queens #51](https://leetcode.com/problems/n-queens/) | Board constraint at each row — same "check before choose" |

---

## 📖 Walkthrough

`n = 3`:

```
dfs(pos=1, used=[])
  i=1: 1%1✓ → used[1]=T
    dfs(pos=2)
      i=2: 2%2✓ → used[2]=T
        dfs(pos=3)
          i=3: 3%3✓ → [1,2,3] ✓ ans++
      i=1: used, skip
      i=3: 3%2✗ and 2%3✗ → skip
  i=2: 2%1✓ → ...
  i=3: 3%1✓ → ...

Also [2,1,3], [3,2,1], etc. — total 3 arrangements for n=3
```

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    void dfs(int n, int pos, vector<bool>& used) {
        if (pos > n) { ans++; return; }
        for (int i = 1; i <= n; i++) {
            if (used[i] || (i % pos != 0 && pos % i != 0)) continue;
            used[i] = true;
            dfs(n, pos + 1, used);
            used[i] = false;
        }
    }
public:
    int countArrangement(int n) {
        vector<bool> used(n + 1);
        dfs(n, 1, used);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countArrangement(self, n: int) -> int:
        self.ans = 0
        used = [False] * (n + 1)
        def dfs(pos):
            if pos > n: self.ans += 1; return
            for i in range(1, n + 1):
                if used[i] or (i % pos and pos % i): continue
                used[i] = True; dfs(pos + 1); used[i] = False
        dfs(1)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int countArrangement(int n) {
        dfs(n, 1, new boolean[n + 1]);
        return ans;
    }
    private void dfs(int n, int pos, boolean[] used) {
        if (pos > n) { ans++; return; }
        for (int i = 1; i <= n; i++) {
            if (used[i] || (i % pos != 0 && pos % i != 0)) continue;
            used[i] = true;
            dfs(n, pos + 1, used);
            used[i] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Permutation + extra guard** — Day 12 skeleton, one `if` in the loop.
- **1-indexed positions** — `pos` starts at 1; divisibility uses `i` and `pos` directly.
- **Prune before choose** — invalid numbers never touch `used[]`.
- **Count at leaf** — no path vector needed.

> 🎯 **Pattern Unlocked:** Divisibility Constraint Permutation

---

*One quest down. Next: build a binary string column by column — Cantor diagonal style. →*
