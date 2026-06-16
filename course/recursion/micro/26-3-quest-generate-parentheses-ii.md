<!-- hand-authored -->
# ⚔ Quest: Generate Parentheses (Revisited)

> **Day 26** · [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Generate Parentheses on LeetCode](https://leetcode.com/problems/generate-parentheses/)**

> ⚔ **Hunter's rule:** This is a **Day 8 revisit** — draw the n=2 open/close tree on paper. Code from memory for 5 minutes before reading hints.

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

> **Synthesis check:** This is the **constrained open/close tree** from Day 8 — same push/pop, different branch gates.

**Hint 1:** State = `(open, close)` + path. `open` = remaining `(` to place; `close` = `)` count so far.

**Hint 2:** Base when `len(path) == 2 * n` → record.

**Hint 3:** Add `(` if `open > 0`. Add `)` if `open > close` (more opens placed than closes).

**Hint 4:** Pop after each branch — same backtrack rhythm as phone pad.

**Hint 5:** Contrast with quest 1: here **branches are gated**. Invalid `")("` prefixes never exist in the tree.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Constrained Open/Close Generation (Day 8 revisit)

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

**Synthesis contrast with Letter Combinations #17:**

| Generate Parentheses #22 | Letter Combinations #17 |
|---|---|
| State: `(open, close)` | State: index `i` |
| ≤2 branches, pruned | 3–4 branches, all valid |
| Constraint on every prefix | No prefix constraint |
| Invalid strings never built | All paths are answers |

**How a strong solver thinks before coding:**
1. *"Day 8 parentheses — open/close counters, not 2^(2n) strings."*
2. *"Add `)` only when `open > close`."*
3. *"Add `(` when `open > 0`."*
4. *"Pop after each dfs — same rhythm as phone pad."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All 2^(2n) strings of ( and )** | Exponential waste — most invalid |
| **Generate then validate with stack** | Same waste — filter after build |
| **Add `)` when `close < n` only** | Allows invalid prefixes like `())` |
| **No pop after recurse** | Path leaks chars into sibling branches |

**The synthesis insight:** Phone pad fans out freely; parentheses **prunes at generation**. Same template — different gate function.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | open/close balance | Constrained DFS + pop |
| [Letter Combinations #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | multi-branch index | Same skeleton, no pruning |
| [Valid Parenthesis String #678](https://leetcode.com/problems/valid-parenthesis-string/) | `*` wildcard | DFS with lo/hi bounds |
| [Different Ways to Add Parentheses #241](https://leetcode.com/problems/different-ways-to-add-parentheses/) | Insert ops | Partition + recurse |

---

## 📖 Walkthrough

`n = 2` — constrained open/close tree (Day 8 revisit):

```
                    ""  open=2 close=0
                     |
                    "("  open=1 close=0
                   /         \
              "(("           "()"  open=1 close=1
             open=0           |
                |            "()(" open=0 close=1
             "(())" ✓          |
                            "()()" ✓

Pruned: ")" at root never appears — open > close fails.
```

Side-by-side with phone pad (`"23"`) from quest 1:

```
Parentheses n=2:              Phone pad "23":
  max 2 branches                 3 branches always
  gated by open/close            no gates
  2 valid leaves                 9 valid leaves
  depth = 4                      depth = 2
```

Code trace — `dfs(open=2, close=0, path="")`:

```
'(' → dfs(1,0,"(")
  '(' → dfs(0,0,"((")  ... eventually "(())" ✓
  ')' → dfs(1,1,"()") when open>close
    '(' → dfs(0,1,"()(")
      ')' → dfs(0,2,"()()") → RECORD ✓
```

> 💡 **The insight:** If you can explain why `")("` never appears in the tree, you understand synthesis. The code is the tree written in syntax.

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

- **"Day 8 revisit — open/close tree"** → Prune during DFS, not after.
- **"Same push/pop as phone pad"** → Only the branch gates differ.
- **"Well-formed = prefix constraint"** → `open > close` before every `)`.
- **"Synthesis complete"** → You can name both trees and code both cold.

If you mixed up the two templates, re-read today's concept page side-by-side diagram — then retry without notes.

> 🎯 **Pattern Unlocked:** Constrained Open/Close Generation — Day 8 synthesis confirmed.

---

*Both quests complete. Head to the checkpoint. →*
