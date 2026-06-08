# ⚔ B-Rank Test — Problem 1

> [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open N-Queens II on LeetCode](https://leetcode.com/problems/n-queens-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[N-Queens II #52](https://leetcode.com/problems/n-queens-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int ans = 0;
    bool valid(int r, int c, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        return !cols[c] && !d1[r - c + 50] && !d2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, d1, d2)) continue;
            cols[c] = d1[r - c + 50] = d2[r + c] = 1;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + 50] = d2[r + c] = 0;
        }
    }
public:
    int totalNQueens(int n) {
        vector<int> cols(n), d1(100), d2(100);
        dfs(0, n, cols, d1, d2);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.ans = 0
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n: self.ans += 1; return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                dfs(r + 1)
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int totalNQueens(int n) {
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        return ans;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
