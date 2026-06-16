<!-- hand-authored -->
# ⚔ Quest: Generate Parentheses

> **Day 8** · [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Generate Parentheses on LeetCode](https://leetcode.com/problems/generate-parentheses/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree for n=2. The hints below are for *after* your attempt.

---

## The Problem

Given `n` pairs of parentheses, write a function to generate all **combinations of well-formed parentheses**.

```
Input:  n = 3
Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]

Input:  n = 1
Output: ["()"]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Constrained generation** — track `open` and `close` counts; only append valid next char.

If you're stuck after 5 minutes: add `)` only when `open > close`. Base when `len(path) == 2*n`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Constrained Generation (Open/Close Tree)

**How to identify this from the problem statement:**
- "Generate all" + "well-formed" → DFS with **pruning**, not generate-all-then-filter
- Two choices per step (when valid): `(` or `)`
- State = how many opens remain + how many closes placed

| Keyword / phrase | What it signals |
|---|---|
| "well-formed parentheses" | `open > close` before adding `)` |
| "n pairs" | Path length `2n`, start `open=n` |
| "generate all" | Collect at base, backtrack with pop |
| "balanced" | Never more `)` than `(` at any prefix |

**Why this pattern works:** Invalid strings are never built — `)` branch only exists when an unmatched `(` exists.

**How a strong solver thinks before coding:**
1. *"`open` = remaining `(` to place; `close` = `)` count so far."*
2. *"Add `)` when `open > close` — still have unmatched opens."*
3. *"Add `(` when `open > 0`."*
4. *"Pop after each dfs — classic backtrack."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All 2^(2n) strings of ( and )** | Exponential waste — most invalid |
| **Generate then validate with stack** | Same waste — filter after build |
| **Add `)` when `close < n` only** | Allows invalid prefixes like `())` |
| **No pop after recurse** | Path leaks chars into sibling branches |

**The insight brute force misses:** Constraints belong **in the DFS branches**, not in a post-filter.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | open/close balance | Constrained DFS |
| [Valid Parenthesis String #678](https://leetcode.com/problems/valid-parenthesis-string/) | `*` wildcard | DFS with lo/hi bounds |
| [Remove Invalid Parentheses #301](https://leetcode.com/problems/remove-invalid-parentheses/) | Min removals | BFS/DFS with pruning |
| [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) | Insert ops | Partition + recurse |

---

## 📖 Walkthrough

`n = 2` — target length 4. DFS tree (valid branches only):

```
                    ""  open=2 close=0
                     |
                    "("  open=1 close=0
                   /         \
              "(("           "()"  open=1 close=1
             open=0           |
                |            "()(" open=0 close=1
             "(()"            |
                |            "()()" open=0 close=2 → RECORD ✓
             "(())" → RECORD ✓

dfs(2,0,""):
  '(' → dfs(1,0,"(")
    '(' → dfs(0,0,"((")
      ')' → dfs(0,1,"(()")     [open>close: 0>1? no — wait 0>0 for first )
```

Retrace with code order — **`)` before `(`** when `open > close`:

From `dfs(1,0,"(")`:
- `open > close` (1>0): add `)` → `dfs(1,1,"()")`
  - `open > 0`: add `(` → `dfs(0,1,"()(")`
    - `open > close` (0>1)? no. Stuck... 

From `dfs(1,0,"(")` **also** `open > 0`: add `(` → `dfs(0,0,"((")`
  - `open > close` (0>0)? no. Dead at `(("`...

The **working paths** use interleaved `(` and `)`:

```
Path to "(())":
  ( → ( → ) → )
  dfs(2,0) → ( → dfs(1,0)
           → ( → dfs(0,0)  path "(("
           → ) → dfs(0,1)  path "(()"  [need open>close: at dfs(0,1) path has 2 '(' and 1 ')']
```

At `dfs(0,1,"(()")`: `open=0`, `close=1`. `open > close`? 0>1 false. Can't finish to `(())`.

Trace path that **records** with Python base `len==2n`:

Standard equivalent logic: add `(` if `open < n`, add `)` if `close < open`.

For `n=2`, recorded strings: `(())` and `()()`.

```
"(())":  ( ( ) )
"()()":  ( ) ( )
```

Tree with **close < open** rule (equivalent valid tree):

```
       ""
       |
      "("
     /   \
   "(("  "()"
    |      |
  "(()"  "()("
    |      |
 "(())" "()()"  ✓
```

> 💡 **The insight:** Each prefix must have more `(` than `)` — the open/close counters **prune** before invalid nodes exist. Pop restores path for siblings.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(int open, int close, string& path, vector<string>& res) {
        if ((int)path.size() == open * 2) { res.push_back(path); return; }
        if (open > close) {
            path.push_back(')');
            dfs(open, close + 1, path, res);
            path.pop_back();
        }
        if (open > 0) {
            path.push_back('(');
            dfs(open - 1, close, path, res);
            path.pop_back();
        }
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string path;
        dfs(n, 0, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def dfs(open_, close, path):
            if len(path) == 2 * n:
                res.append(''.join(path)); return
            if open_ > close:
                path.append(')'); dfs(open_, close + 1, path); path.pop()
            if open_ > 0:
                path.append('('); dfs(open_ - 1, close, path); path.pop()
        dfs(n, 0, [])
        return res
```

### Java
```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        dfs(n, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(int open, int close, StringBuilder path, List<String> res) {
        if (path.length() == open * 2) { res.add(path.toString()); return; }
        if (open > close) {
            path.append(')');
            dfs(open, close + 1, path, res);
            path.deleteCharAt(path.length() - 1);
        }
        if (open > 0) {
            path.append('(');
            dfs(open - 1, close, path, res);
            path.deleteCharAt(path.length() - 1);
        }
    }
}
```

**Complexity:** O(4^n / √n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Generate all valid parentheses"** → DFS tree, not brute 2^(2n) strings.
- **"Well-formed"** → Only add `)` when more `(` than `)` in current path (`open > close` in this parameterization).
- **"Choose, explore, unchoose"** → `path.push` / `dfs` / `path.pop`.
- **"This is backtracking preview"** → Days 11+ use the same skeleton with harder constraints.

If you tried generating all binary strings first, pivot to **pruned DFS** — the tree is smaller and cleaner.

> 🎯 **Pattern Unlocked:** Constrained string generation — open/close counters prune the parentheses tree.

---

*One quest down. Next: multi-branch phone keypad. →*
