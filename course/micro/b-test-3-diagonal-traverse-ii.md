# ⚔ B-Rank Test — Problem 3

> [Diagonal Traverse II #1424](https://leetcode.com/problems/diagonal-traverse-ii/) · **Medium** · 200 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Diagonal Traverse II on LeetCode](https://leetcode.com/problems/diagonal-traverse-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **Final B-Rank test.** This combines matrix traversal (Day 19) with hash key design (Day 21) — group cells by diagonal, then walk diagonals in order.

---

## The Problem

Given a 2D integer array `nums`, return **all elements** of `nums` in a diagonal order, starting from the top-left element.

```
Input:  nums = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,4,2,7,5,3,8,6,9]

Input:  nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
Output: [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]

Input:  nums = [[1,2,3],[4],[5,6],[7],[8],[9,10,11]]
Output: [1,4,2,5,3,6,7,8,9,10,11]
```

---

## 💡 Hints

> 🎯 **What's being tested:** Diagonal traversal (Day 19) + hash key grouping (Day 21) — cells on the same diagonal share `row + col`.

**Hint 1 — Diagonal key:** Elements on the same ↘ diagonal have the same `i + j` (row + col). Use `i + j` as the hash key to group cells.

**Hint 2 — Jagged rows:** `nums` is not necessarily rectangular — row lengths vary. Iterate each row `i`, and for each column `j` in that row, push `nums[i][j]` into bucket `groups[i + j]`.

**Hint 3 — Output order:** Diagonals are processed in increasing order of `i + j` (0, 1, 2, …). Within each diagonal bucket, elements appear in **top-to-bottom** order if you iterate rows outermost and append in row order.

**Hint 4 — Max diagonal index:** The largest key is `(rows - 1) + (max_col_len - 1)`. Loop `d` from `0` to `max_sum` and concatenate `groups[d]` if it exists.

**Hint 5 — Alternative:** A BFS from `(0,0)` also works — enqueue `(0,0)`, dequeue, push `(r+1,c)` and `(r,c+1)`. BFS naturally visits in diagonal order. The hash-key grouping approach is the Day 21 design pattern.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Diagonal Traversal + Hash Key Grouping (Day 19 + Day 21)

| Clue in the problem | What it signals |
|---|---|
| "diagonal order" / anti-diagonal walk | Group by `row + col` or BFS layer |
| 2D array with variable row lengths | Can't use simple `i, j` bounds — iterate each row independently |
| "starting from top-left" | Diagonal 0 is `(0,0)` alone; then `(1,0), (0,1)`; then `(2,0), (1,1), (0,2)` |
| output is flattened traversal order | Collect then concatenate — not in-place matrix mutation |
| Medium + matrix navigation | Hash map of diagonal index → list of values |

**How to identify from the statement:** "Diagonal traverse" on a matrix → cells with the same `i + j` lie on one diagonal. **Hash key = `i + j`**, values stored in lists, output diagonals in sorted key order.

**How a strong solver thinks before coding:**
1. *"Diagonal order → same i+j → hash key."*
2. *"Jagged array → loop rows, inner loop cols per row."*
3. *"Append in row order → top-to-bottom within each diagonal."*
4. *"Concatenate groups[0], groups[1], … → final answer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate pointer movement with complex (i,j) rules** | Easy to mishandle jagged rows and diagonal transitions — many off-by-one bugs |
| **Sort all cells by (i+j), then by i** | Works but O(N log N) — hash grouping is O(N) |
| **Treat matrix as rectangular with padding** | Jagged input has no fixed width — padding adds phantom cells |
| **Use `i - j` as key instead of `i + j`** | Groups anti-diagonals, not the ↘ diagonals this problem requires |
| **Reverse order within each bucket** | Produces bottom-to-top diagonals — wrong output order |

**The insight brute force misses:** Diagonal index `i + j` is a **natural hash key** — one pass groups all cells, one loop concatenates. No simulation of a moving pointer across irregular row lengths.

---

## 🎯 Transfer to Unseen Problems

Can you spot diagonal-key thinking on unfamiliar wording?

**Scenario 1:** *"Given a binary matrix, return elements in spiral order."*

Which pattern? **Spiral traversal** (Day 19). Boundary shrinking — not diagonal grouping. Different traversal geometry.

**Scenario 2:** *"Given a 2D grid, traverse all nodes in zigzag level order (BFS alternating direction)."*

Which pattern? **BFS + level tracking** (Day 19). Layer-by-layer, not `i + j` diagonals.

**Scenario 3:** *"Given a list of words in a 2D grid, find all words — cells in the same diagonal may be relevant for certain puzzles."*

Which pattern? **Hash key design** (Day 21) + DFS/backtracking (A-Rank). Diagonal grouping is a preprocessing step, not the full solution.

> **Answer key:** Scenario 1 → spiral (Day 19). Scenario 2 → BFS levels. Scenario 3 → hash/DFS combo. Signal: **"diagonal order traversal"** → group by `row + col`, concatenate in key order.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
nums = [[1,2,3],
        [4,5,6],
        [7,8,9]]
```

| Cell (i,j) | Value | Key i+j | Bucket after insert |
|------------|-------|---------|---------------------|
| (0,0) | 1 | 0 | {0: [1]} |
| (0,1) | 2 | 1 | {1: [2]} |
| (0,2) | 3 | 2 | {2: [3]} |
| (1,0) | 4 | 1 | {1: [2,4]} |
| (1,1) | 5 | 2 | {2: [3,5]} |
| (1,2) | 6 | 3 | {3: [6]} |
| (2,0) | 7 | 2 | {2: [3,5,7]} |
| (2,1) | 8 | 3 | {3: [6,8]} |
| (2,2) | 9 | 4 | {4: [9]} |

**Concatenate groups 0 → 4:**
`[1] + [2,4] + [3,5,7] + [6,8] + [9] = [1,4,2,7,5,3,8,6,9]` ✓

### Jagged array example

```
nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
```

Row 0 contributes keys 0–4, row 1 contributes keys 1–2, etc. Same grouping rule — only the inner loop bound changes per row.

### C++
```cpp
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& nums) {
        unordered_map<int, vector<int>> groups;
        int maxKey = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            for (int j = 0; j < (int)nums[i].size(); j++) {
                int key = i + j;
                groups[key].push_back(nums[i][j]);
                maxKey = max(maxKey, key);
            }
        }
        vector<int> ans;
        for (int d = 0; d <= maxKey; d++)
            for (int x : groups[d])
                ans.push_back(x);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def findDiagonalOrder(self, nums: list[list[int]]) -> list[int]:
        groups: dict[int, list[int]] = {}
        max_key = 0
        for i, row in enumerate(nums):
            for j, val in enumerate(row):
                key = i + j
                groups.setdefault(key, []).append(val)
                max_key = max(max_key, key)

        ans = []
        for d in range(max_key + 1):
            if d in groups:
                ans.extend(groups[d])
        return ans
```

### Java
```java
class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        Map<Integer, List<Integer>> groups = new HashMap<>();
        int maxKey = 0;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < nums.get(i).size(); j++) {
                int key = i + j;
                groups.computeIfAbsent(key, k -> new ArrayList<>()).add(nums.get(i).get(j));
                maxKey = Math.max(maxKey, key);
            }
        }
        List<Integer> ans = new ArrayList<>();
        for (int d = 0; d <= maxKey; d++)
            if (groups.containsKey(d))
                ans.addAll(groups.get(d));
        return ans.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

**Complexity:** O(N) time where N = total elements · O(N) space for groups and output

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Diagonal order"** → Cells share `row + col` on the same ↘ diagonal (Day 19).
- **"Group then flatten"** → Hash key design (Day 21) — `key = i + j`, value = list of cells on that diagonal.
- **Jagged rows** → Outer loop on rows, inner loop on `len(row)` — no fixed column bound.

You just completed the B-Rank test trilogy: stack-on-matrix, stack contribution counting, and hash-key diagonal grouping. Three different B-Rank patterns, three Medium-to-Hard problems — all built from Days 17–21.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for A-Rank. |
| 2/3 solved | **Pass.** Advance to A-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 17–22 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
