<!-- hand-authored -->
# ⚔ Quest: Pascal's Triangle

> **Day 3** · [Pascal's Triangle #118](https://leetcode.com/problems/pascals-triangle/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Pascal's Triangle on LeetCode](https://leetcode.com/problems/pascals-triangle/)**

> ⚔ **Hunter's rule:** Draw rows 0–4 on paper. For each interior cell, draw arrows to its two parents above. This is your first **2D** DP — not Fib.

---

## The Problem

See the full problem statement on LeetCode: **[Pascal's Triangle #118](https://leetcode.com/problems/pascals-triangle/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** 2D Visual Tabulation — Day 3's flagship non-Fib visual.

**Hint 1:** Row `i` has `i+1` elements. First and last of every row = `1`.

**Hint 2:** Interior: `triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]` — two cells **above**, not i-1/i-2 on same row.

**Hint 3:** Fill row-by-row, top to bottom. Row `i` only reads row `i-1` (already complete).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 2D Visual Tabulation

**How to identify this from the problem statement:**
- Explicit grid structure — triangle of numbers
- Each cell defined by neighbors in **previous row**
- No Fibonacci index recurrence

| Keyword / phrase | What it signals |
|---|---|
| "Pascal's triangle" | Sum of two above |
| "numRows" / generate rows | 2D list, row-major fill |
| Interior vs border | Borders = 1; interior = sum |

**Why brute force fails:** Computing binomial coefficients with factorials overflows; recursive C(n,k) without memo repeats work — tabulation is O(n²) and stable.

**How a strong solver thinks before coding:**
1. *"2D structure — res[i][j]."*
2. *"Borders 1; interior from row above."*
3. *"Loop i=0..numRows-1, j=1..i-1 for interior."*
4. *"Return full triangle."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Factorial formula C(n,k)** | Overflow; floating error |
| **Naive recursive C(n,k) without memo** | Exponential overlap on shared sub-coefficients |
| **Row-by-row tabulation** | O(n²) — each cell computed once ✓ |

```
        1
       1 1
      1 2 1     ← 2 = 1+1: visual DP
     1 3 3 1
    1 4 6 4 1   ← 6 = 3+3

Not dp[i]=dp[i-1]+dp[i-2] — different geometry!
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Table shape | Transition |
|---|---|---|
| **Pascal's Triangle #118** | Full triangle | above-left + above |
| Pascal's Triangle II #119 (Day 4) | One row only | same, space-optimized |
| Unique Paths (later) | Grid paths | left + up |

---

## 📖 Walkthrough

**Build 5 rows (numRows=5):**

```
Row 0: [1]
Row 1: [1, 1]
Row 2: [1, 2, 1]           res[1][0]+res[1][1]=1+1=2
Row 3: [1, 3, 3, 1]        3=1+2, 3=2+1
Row 4: [1, 4, 6, 4, 1]     6=3+3

Dependency arrows for 6 at (4,2):
  (3,1)=3 and (3,2)=3 → 6 ✓
```

> 💡 **The insight:** The triangle **is** the DP table. If you can shade parents on paper, you can write the loops.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++)
                row[j] = res[i - 1][j - 1] + res[i - 1][j];
            res.push_back(row);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(row)
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
            }
            res.add(row);
        }
        return res;
    }
}
```

**Complexity:** O(n²) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Two above, not two behind"** → 2D tabulation — Day 3's break from Fib.
- **"Row i depends on row i-1 only"** → Space optimization possible (Day 4).
- **"Borders always 1"** → Base cases per row.
- **"Fill top-down"** → Classic bottom-up order.

> 🎯 **Pattern Unlocked:** 2D Visual Tabulation

---

*One quest down. Next: Counting Bits — 1D again, but dp[i] from dp[i/2]. →*
