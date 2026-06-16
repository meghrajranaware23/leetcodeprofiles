<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 3

> [Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Split Array into Fibonacci Sequence on LeetCode](https://leetcode.com/problems/split-array-into-fibonacci-sequence/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Day 14 string partition + a numeric constraint. Trace `"123456579"` on paper.

---

## The Problem

Given a string `num` of digits, split it into any number of **non-empty** segments such that:

1. Each segment is a **positive integer** with no leading zeros (unless the segment is `"0"`).
2. The sequence forms a **Fibonacci-like** sequence: each segment after the first two equals the sum of the two before it.
3. Return **any one** valid split as an integer array, or `[]` if impossible.
4. Each segment must fit in a 32-bit signed integer.

```
Input:  num = "123456579"
Output: [123,456,579]
Explanation: 123 + 456 = 579

Input:  num = "11235813"
Output: [1,1,2,3,5,8,13]

Input:  num = "0123"
Output: []
Explanation: Leading zero on "0123" invalid
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 14 string partition cut loop + arithmetic constraint on segments.

**Hint 1:** Same cut skeleton as Palindrome Partition / Restore IP: loop end index `j` from `i`, extract `num[i..j]`, validate, push, `dfs(j+1)`, pop.

**Hint 2:** **Leading zero rule:** if `j > i && num[i] == '0'`, break the loop — longer segments also start with zero.

**Hint 3:** **Overflow guard:** stop extending segment when value exceeds `INT_MAX` (2³¹−1).

**Hint 4:** **Fibonacci constraint:** once `path` has at least 2 numbers, the next segment's value must equal `path[len-2] + path[len-1]`. If parsed value doesn't match, `continue` — don't push.

**Hint 5:** **Success condition:** consumed entire string (`i == len`) **and** at least 3 segments (`path.size() >= 3`). Return `true` early — any one valid sequence suffices.

**Hint 6:** First two segments have **no** Fibonacci constraint — any valid numbers work. The constraint kicks in from the third segment onward.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** String Partition Backtracking + Fibonacci Constraint (Day 14 variant)

| Clue in the problem | What it signals |
|---|---|
| "split" / "segment" a digit string | Cut loop from index i |
| "no leading zeros" | Break when `num[i]=='0'` and length > 1 |
| "Fibonacci-like" / "sum of previous two" | Validate segment value against path tail |
| "return any valid" | Boolean dfs — stop at first success |
| "at least 3 numbers" | Base case checks `path.size() >= 3` |

**How a strong solver thinks before coding:**
1. *"String partition — cut loop, push segment, dfs(j+1), pop."*
2. *"First two segments: free choice (with leading-zero and overflow rules)."*
3. *"Third+ segment: must equal sum of last two in path."*
4. *"Return true early when i==n and path.size()>=3."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Precompute all Fibonacci numbers, match string** | Doesn't handle arbitrary starting pairs like 123,456,579 |
| **Fixed-width splits (always 1-digit segments)** | Misses multi-digit segments |
| **Allow leading zeros** | `"0123"` would incorrectly try `"01"` |
| **Check Fibonacci on first two segments too** | Over-constrains — first pair defines the sequence |
| **Generate all partitions, filter** | Same work but harder to prune; constraint check during cut is cleaner |

**The insight brute force misses:** The first two segments **seed** the sequence. Every subsequent cut is forced — only one valid value per position once the seed is fixed. Early mismatch prunes entire subtrees.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Split digits into parts where each part equals the sum of all previous parts (not Fibonacci)."*

Same partition skeleton — different validator on the next segment.

**Scenario:** *"Split into arithmetic sequence segments (constant difference)."*

Seed first two, then each next segment must continue the diff.

**30-second check:** *"Day 14 cut loop. Leading zero break. From 3rd segment: val == path[-2]+path[-1]. Success: i==n and len>=3."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    vector<int> path;
    bool dfs(string& num, int i) {
        if (i == (int)num.size()) return path.size() >= 3;
        long long val = 0;
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            val = val * 10 + (num[j] - '0');
            if (val > INT_MAX) break;
            if (path.size() >= 2 && val != (long long)path[path.size()-2] + path.back()) continue;
            path.push_back((int)val);
            if (dfs(num, j + 1)) return true;
            path.pop_back();
        }
        return false;
    }
public:
    vector<int> splitIntoFibonacci(string num) {
        return dfs(num, 0) ? path : vector<int>{};
    }
};
```

### Python
```python
class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        path = []
        def dfs(i):
            if i == len(num): return len(path) >= 3
            val = 0
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = val * 10 + int(num[j])
                if val > 2**31 - 1: break
                if len(path) >= 2 and val != path[-2] + path[-1]: continue
                path.append(val)
                if dfs(j + 1): return True
                path.pop()
            return False
        return path if dfs(0) else []
```

### Java
```java
class Solution {
    private List<Integer> path = new ArrayList<>();
    public List<Integer> splitIntoFibonacci(String num) {
        return dfs(num, 0) ? path : List.of();
    }
    private boolean dfs(String num, int i) {
        if (i == num.length()) return path.size() >= 3;
        long val = 0;
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            val = val * 10 + (num.charAt(j) - '0');
            if (val > Integer.MAX_VALUE) break;
            if (path.size() >= 2 && val != (long) path.get(path.size() - 2) + path.get(path.size() - 1)) continue;
            path.add((int) val);
            if (dfs(num, j + 1)) return true;
            path.remove(path.size() - 1);
        }
        return false;
    }
}
```

**Complexity:** O(n^2) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Split digit string"** → Day 14 partition cut loop.
- **"Fibonacci-like"** → Third+ segment value forced by previous two — prune on mismatch.
- **"No leading zeros"** → Break inner loop, same as Restore IP (#93).
- **"Any one valid"** → Return `true` on first success; don't collect all partitions.
- **"At least 3 numbers"** → Two segments alone isn't enough even if they sum correctly.

This closes C-Rank: array push/pop, string cuts, grid marks, and constraint variants — all the same choose/explore/unchoose rhythm.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for B-Rank. |
| 2/3 solved | **Pass.** Advance to B-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 11–16 with focus. |

---

*3 of 3 test problems. C-Rank test complete. →*

## Solution

### C++
```cpp
class Solution {
    vector<int> path;
    bool dfs(string& num, int i) {
        if (i == (int)num.size()) return path.size() >= 3;
        long long val = 0;
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            val = val * 10 + (num[j] - '0');
            if (val > INT_MAX) break;
            if (path.size() >= 2 && val != (long long)path[path.size()-2] + path.back()) continue;
            path.push_back((int)val);
            if (dfs(num, j + 1)) return true;
            path.pop_back();
        }
        return false;
    }
public:
    vector<int> splitIntoFibonacci(string num) {
        return dfs(num, 0) ? path : vector<int>{};
    }
};
```

### Python
```python
class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        path = []
        def dfs(i):
            if i == len(num): return len(path) >= 3
            val = 0
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = val * 10 + int(num[j])
                if val > 2**31 - 1: break
                if len(path) >= 2 and val != path[-2] + path[-1]: continue
                path.append(val)
                if dfs(j + 1): return True
                path.pop()
            return False
        return path if dfs(0) else []
```

### Java
```java
class Solution {
    private List<Integer> path = new ArrayList<>();
    public List<Integer> splitIntoFibonacci(String num) {
        return dfs(num, 0) ? path : List.of();
    }
    private boolean dfs(String num, int i) {
        if (i == num.length()) return path.size() >= 3;
        long val = 0;
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            val = val * 10 + (num.charAt(j) - '0');
            if (val > Integer.MAX_VALUE) break;
            if (path.size() >= 2 && val != (long) path.get(path.size() - 2) + path.get(path.size() - 1)) continue;
            path.add((int) val);
            if (dfs(num, j + 1)) return true;
            path.remove(path.size() - 1);
        }
        return false;
    }
}
```

**Complexity:** O(n^2) time · O(n) space
