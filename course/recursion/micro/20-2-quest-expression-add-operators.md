<!-- hand-authored -->
# ⚔ Quest: Expression Add Operators

> **Day 20** · [Expression Add Operators #282](https://leetcode.com/problems/expression-add-operators/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Expression Add Operators on LeetCode](https://leetcode.com/problems/expression-add-operators/)**

> ⚔ **Hunter's rule:** Draw the decision tree for `num = "123", target = 6`. Track `curr` and `prev` columns beside each branch. The hints below are for *after* your attempt.

---

## The Problem

Given a string `num` containing only digits and an integer `target`, insert `'+'`, `'-'`, or `'*'` between digits so the expression evaluates to `target`. Return all valid expressions.

```
Input:  num = "123", target = 6
Output: ["1+2+3", "1*2*3"]

Input:  num = "232", target = 8
Output: ["2*3+2", "2+3*2"]

Input:  num = "105", target = 5
Output: ["1*0+5", "10-5"]
```

You may not reorder digits. Unary minus is not allowed — only binary operators between numbers.

---

## 💡 Hints

**Hint 1:** Outer loop — `j` from `i` to `n-1` picks the next number `num[i..j]`. Break (not continue) if `j > i && num[i]=='0'`.

**Hint 2:** First number (`i==0`): set `curr = prev = val`, path = `"val"`. No operator yet.

**Hint 3:** Three branches for `+`, `-`, `*`:
- `+`: `curr + val`, `prev = val`
- `-`: `curr - val`, `prev = -val`
- `*`: `curr - prev + prev * val`, `prev = prev * val`

**Hint 4:** Base case: `i == n`. If `curr == target`, push `path` to result.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Operator Insertion Backtracking

| Clue in the problem | What it signals |
|---|---|
| "insert operators" between digits | Cut loop + operator branches |
| "expression evaluates to target" | Track running `curr`, check at end |
| `*` operator present | Multiply carry trick with `prev` |
| generate all valid expressions | Don't return early except on collect |
| digit string, no reorder | Index `i` only moves forward |

**Why this pattern works:** Each cut appends a number and updates numeric state incrementally. The `prev` field lets `*` undo the last term without reparsing.

**How a strong solver thinks before coding:**
1. *"Cut string like Day 14 — but add operator state."*
2. *"First number special — seeds curr and prev."*
3. *"Multiply: curr - prev + prev*val."*
4. *"Use long — products overflow int."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build string, eval with shunting-yard each time** | Correct but heavy; incremental curr/prev is cleaner |
| **`curr *= val` on multiply** | Gives 9 for `1+2*3`, not 7 |
| **`continue` on leading zero** | Must `break` — longer cuts also invalid |
| **Forget `prev` on subtraction** | Next `*` undo breaks — need `prev = -val` |
| **int arithmetic** | LeetCode hides overflow cases — use long |

**The insight brute force misses:** `*` is not `curr * val`. It replaces the last operand — `prev` stores that operand for O(1) undo.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Additive Number #306](https://leetcode.com/problems/additive-number/) | No operators — next term fixed | Cut loop + dfs (today's quest 2) |
| [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) | Parentheses, not insertion | Divide + combine results |
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | Cut + validator, no operators | Day 14 string partition |

---

## 📖 Walkthrough

`num = "123"`, `target = 6`:

```
dfs(i=0, curr=0, prev=0, path="")
│
├─ j=0: val=1 (first) → dfs(1, curr=1, prev=1, "1")
│   ├─ j=1: val=2, "+" → dfs(2, curr=3, prev=2, "1+2")
│   │   └─ j=2: val=3, "+" → dfs(3, curr=6, prev=3, "1+2+3") → i==n, curr==6 ✓ RECORD
│   │   └─ j=2: val=3, "*" → curr=3-2+2*3=7 ✗
│   └─ j=1: val=2, "*" → dfs(2, curr=2, prev=2, "1*2")
│       └─ j=2: val=3, "+" → curr=5 ✗
│       └─ j=2: val=3, "*" → curr=2-2+2*3=6 ✓ RECORD "1*2*3"
│
├─ j=1: val=12 → "12+3"=15, etc. ✗
└─ j=2: val=123 ✗
```

Multiply row detail for `"1*2*3"` at the final step:
```
curr=2, prev=2, val=3
curr = 2 - 2 + 2*3 = 6
prev = 2 * 3 = 6
```

> 💡 **The insight:** The path string is for output. `curr`/`prev` are for math. Never eval the path string mid-dfs.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(string& num, int i, long target, long curr, long prev, string& path, vector<string>& res) {
        if (i == (int)num.size()) {
            if (curr == target) res.push_back(path);
            return;
        }
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            long val = stol(num.substr(i, j - i + 1));
            string nxt = num.substr(i, j - i + 1);
            if (i == 0) {
                dfs(num, j + 1, target, val, val, nxt, res);
            } else {
                dfs(num, j + 1, target, curr + val, val, path + "+" + nxt, res);
                dfs(num, j + 1, target, curr - val, -val, path + "-" + nxt, res);
                dfs(num, j + 1, target, curr - prev + prev * val, prev * val, path + "*" + nxt, res);
            }
        }
    }
public:
    vector<string> addOperators(string num, int target) {
        vector<string> res;
        string path;
        dfs(num, 0, target, 0, 0, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        def dfs(i, curr, prev, path):
            if i == len(num):
                if curr == target: res.append(path)
                return
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = int(num[i:j + 1])
                if i == 0:
                    dfs(j + 1, val, val, str(val))
                else:
                    dfs(j + 1, curr + val, val, path + '+' + str(val))
                    dfs(j + 1, curr - val, -val, path + '-' + str(val))
                    dfs(j + 1, curr - prev + prev * val, prev * val, path + '*' + str(val))
        dfs(0, 0, 0, '')
        return res
```

### Java
```java
class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> res = new ArrayList<>();
        dfs(num, 0, target, 0, 0, "", res);
        return res;
    }
    private void dfs(String num, int i, long target, long curr, long prev, String path, List<String> res) {
        if (i == num.length()) {
            if (curr == target) res.add(path);
            return;
        }
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            long val = Long.parseLong(num.substring(i, j + 1));
            if (i == 0) dfs(num, j + 1, target, val, val, String.valueOf(val), res);
            else {
                dfs(num, j + 1, target, curr + val, val, path + "+" + val, res);
                dfs(num, j + 1, target, curr - val, -val, path + "-" + val, res);
                dfs(num, j + 1, target, curr - prev + prev * val, prev * val, path + "*" + val, res);
            }
        }
    }
}
```

**Complexity:** O(4^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Cut loop like Day 14"** — but three operator branches instead of one validator.
- **"First number is special"** — no operator, seed curr and prev.
- **"Multiply needs prev"** — `curr - prev + prev*val`, not `curr * val`.
- **"Break on leading zero"** — same rule as IP restore and additive number.

If you got `1+2*3 = 9`, you missed the carry trick — that's the whole lesson of this quest.

> 🎯 **Pattern Unlocked:** Operator Insertion Backtracking

---

*One quest down. Next: no operators at all — the next term is forced by the previous two. →*
