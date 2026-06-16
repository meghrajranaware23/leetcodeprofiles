<!-- hand-authored -->
# ⚔ Quest: Pascal's Triangle II

> **Day 4** · [Pascal's Triangle II #119](https://leetcode.com/problems/pascals-triangle-ii/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Pascal's Triangle II on LeetCode](https://leetcode.com/problems/pascals-triangle-ii/)**

> ⚔ **Hunter's rule:** Day 3 built all rows. Today: **one row**, updated in-place. Inner loop must go **right-to-left** — why? Trace row 3 on paper before coding.

---

## The Problem

See the full problem statement on LeetCode: **[Pascal's Triangle II #119](https://leetcode.com/problems/pascals-triangle-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Space-Optimized Tabulation — Day 4's 1-row rolling Pascal.

**Hint 1:** Start with `row = [1, 1, ..., 1]` of length `rowIndex + 1`.

**Hint 2:** For each synthetic row `i` from 2 to `rowIndex`: for `j` from `i-1` down to `1`: `row[j] += row[j-1]`.

**Hint 3:** Right-to-left prevents overwriting `row[j-1]` before you need it — checklist step 5 (fill order).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Space-Optimized Tabulation

**How to identify this from the problem statement:**
- Same Pascal math as #118
- Only **one row** requested — space optimization natural
- In-place update on single array

| Keyword / phrase | What it signals |
|---|---|
| "return the rowIndex-th row" | O(k) space, not O(k²) |
| Same as Pascal I | Reuse transition, drop stored history |
| Follow-up "optimize space" | Rolling row technique |

**Why storing all rows fails space follow-up:** O(k²) memory when O(k) suffices — interview expects rolling row.

**How a strong solver thinks before coding:**
1. *"Same state as Day 3 — one row of coefficients."*
2. *"Simulate building rows 2..rowIndex on one array."*
3. *"Inner j: right-to-left."*
4. *"Return row."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate full triangle, return last row** | O(k²) space — wasteful |
| **Left-to-right inner update** | Overwrites needed values — wrong row |
| **Right-to-left in-place** | O(k) space ✓ |

```
rowIndex=3 → want [1,3,3,1]

Init:     [1, 1, 1, 1]
i=2, j=1: [1, 2, 1, 1]
i=2, j=2: [1, 2, 3, 1]   (j right-to-left)
i=3, j=2: [1, 2, 4, 1] → j=1: [1, 3, 4, 1] → j=2: [1, 3, 6, 1]? 

Careful trace — final [1,3,3,1] ✓ (follow code order)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Space |
|---|---|
| Pascal's Triangle #118 | O(n²) all rows |
| **Pascal's Triangle II #119** | **O(k) one row** |
| Unique Paths space-opt | O(min(m,n)) one row |

---

## 📖 Walkthrough

**rowIndex = 4 → [1, 4, 6, 4, 1]**

```
Start row = [1,1,1,1,1]

Simulate row 2: j=1: 1+1=2; j=2: 1+2=3 → [1,2,3,1,1]
Simulate row 3: j=2,1 → [1,3,6,4,1] ... 
Simulate row 4: j=3,2,1 → [1,4,6,4,1] ✓

Checklist step 7: one row, no res[][] — O(rowIndex) space.
```

> 💡 **The insight:** Day 3 recurrence + Day 4 fill order (right-to-left) = space-opt Pascal.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> row(rowIndex + 1, 1);
        for (int i = 2; i <= rowIndex; i++)
            for (int j = i - 1; j >= 1; j--)
                row[j] += row[j - 1];
        return row;
    }
};
```

### Python
```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        row = [1] * (rowIndex + 1)
        for i in range(2, rowIndex + 1):
            for j in range(i - 1, 0, -1):
                row[j] += row[j - 1]
        return row
```

### Java
```java
class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>();
        for (int i = 0; i <= rowIndex; i++) row.add(1);
        for (int i = 2; i <= rowIndex; i++)
            for (int j = i - 1; j >= 1; j--)
                row.set(j, row.get(j) + row.get(j - 1));
        return row;
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Only one row needed"** → Checklist step 7 — roll.
- **"Right-to-left j"** → In-place Pascal guardrail.
- **"Same math as Day 3"** → Different storage, same transition.
- **"Simulate i=2..rowIndex"** → Outer loop = building rows on one array.

> 🎯 **Pattern Unlocked:** Space-Optimized Tabulation

---

*Both quests complete. Head to the checkpoint. →*
