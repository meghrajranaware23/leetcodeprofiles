<!-- hand-authored -->
# ⚔ Quest: Letter Combinations (Revisited)

> **Day 26** · [Letter Combinations of a Phone Number #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Letter Combinations of a Phone Number on LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)**

> ⚔ **Hunter's rule:** This is a **Day 8 revisit** — code from memory. Draw the `"23"` tree on paper first. No peeking at old notes until you've tried for 5 minutes.

---

## The Problem

Given a string `digits` containing digits from `2-9`, return all possible letter combinations that the number could represent on a phone keypad.

```
Input:  digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Input:  digits = ""
Output: []

Input:  digits = "2"
Output: ["a","b","c"]
```

Mapping: `2→abc`, `3→def`, `4→ghi`, `5→jkl`, `6→mno`, `7→pqrs`, `8→tuv`, `9→wxyz`.

---

## 💡 Hints

> **Synthesis check:** This is the **multi-branch index tree** from Day 8 — not a new pattern.

**Hint 1:** State = index `i` + path. Base when `i == len(digits)` → record path.

**Hint 2:** At each level, loop every letter on `KEYS[digits[i]]`. Branch count is 3 or 4 — **no pruning**.

**Hint 3:** Classic backtrack: `path.push(c)` → `dfs(i+1)` → `path.pop()`.

**Hint 4:** Empty `digits` → return `[]` immediately.

**Hint 5:** Contrast with today's second quest (parentheses): here **every branch is valid**. Parentheses gates branches with `open`/`close`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Branch Index Generation (Day 8 revisit)

**How to identify this from the problem statement:**
- "All letter combinations" + phone keypad → index-driven DFS
- Each digit → 3 or 4 branches (variable fan-out)
- No prefix validity rule → unconstrained tree

| Keyword / phrase | What it signals |
|---|---|
| "letter combinations" / "phone keypad" | Multi-branch DFS per digit |
| "mapping" 2-9 → letters | `KEYS` table, loop chars |
| "all possible" | Record at `i == n` |
| empty `digits` | Return `[]` immediately |

**Synthesis contrast with Generate Parentheses #22:**

| Letter Combinations #17 | Generate Parentheses #22 |
|---|---|
| State: index `i` | State: `(open, close)` |
| 3–4 branches, all valid | ≤2 branches, pruned |
| Depth = `len(digits)` | Depth = `2n` |
| No constraint on prefix | `)` only when `open > close` |

**How a strong solver thinks before coding:**
1. *"Day 8 phone pad — index tree, not nested loops."*
2. *"Base: i == len(digits) → record path."*
3. *"For each letter on current digit: choose, dfs(i+1), pop."*
4. *"Total leaves = product of branch sizes per digit."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops hard-coded for length** | Fails for variable `digits` length |
| **Generate all strings, filter later** | No invalid strings to filter — waste |
| **Append without pop** | Later branches get polluted prefix |
| **Skip empty check** | `""` needs `[]`, not `[""]` |

**The synthesis insight:** Same choose/pop skeleton as parentheses — but here you never skip a branch. The tree is wider, not harder.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Letter Combinations #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | 3–4 branches per digit | Index DFS + pop |
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | 2 branches + balance | Same skeleton, add pruning |
| [Subsets #78](https://leetcode.com/problems/subsets/) | include/skip binary | Index backtracking |
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | numeric branches + target | Multi-branch with pruning |

---

## 📖 Walkthrough

`digits = "23"` — multi-branch index tree (Day 8 revisit):

```
KEYS: '2'→abc, '3'→def

                    dfs(i=0, path="")
                   /    |    \
                  a     b     c
                 /      |      \
           dfs(i=1)  dfs(i=1)  dfs(i=1)
            /|\      /|\      /|\
          ad ae af  bd be bf  cd ce cf

9 leaves — all recorded at i=2 (base)

Frame trace for path "ae":
┌────────────────────────────┐
│ dfs(0,"")  pick 'a'        │
├────────────────────────────┤
│ dfs(1,"a") pick 'e'        │
├────────────────────────────┤
│ dfs(2,"ae") i==2 → RECORD  │
└────────────────────────────┘
pop 'e' → explore 'f' → "af"
pop 'a' → explore 'b' → ...
```

Side-by-side reminder — **parentheses tree for n=2** prunes invalid `)`:

```
Phone pad: 3 branches always     Parentheses: at most 2, gated
     ""                              ""  open=2
    /|\                               /
   a b c                             "("
  (all valid)                       /     \
                                  "(("    "()"
```

> 💡 **The insight:** If you can draw the phone pad tree, you already have the code. The revisit tests whether Day 8 stuck.

---

## Solution

### C++
```cpp
class Solution {
    vector<string> keys = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    void dfs(string& digits, int i, string& path, vector<string>& res) {
        if (i == (int)digits.size()) { res.push_back(path); return; }
        for (char c : keys[digits[i] - '0']) {
            path.push_back(c);
            dfs(digits, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.empty()) return res;
        string path;
        dfs(digits, 0, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits: return []
        keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        res = []
        def dfs(i, path):
            if i == len(digits):
                res.append(''.join(path)); return
            for c in keys[int(digits[i])]:
                path.append(c); dfs(i + 1, path); path.pop()
        dfs(0, [])
        return res
```

### Java
```java
class Solution {
    private static final String[] KEYS = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.isEmpty()) return res;
        dfs(digits, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(String digits, int i, StringBuilder path, List<String> res) {
        if (i == digits.length()) { res.add(path.toString()); return; }
        for (char c : KEYS[digits.charAt(i) - '0'].toCharArray()) {
            path.append(c);
            dfs(digits, i + 1, path, res);
            path.deleteCharAt(path.length() - 1);
        }
    }
}
```

**Complexity:** O(4^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Day 8 revisit — phone pad tree"** → Index DFS, not nested loops.
- **"Multi-branch, no pruning"** → Every letter on current digit gets a branch.
- **"Same skeleton as parentheses"** → push / dfs / pop — constraints differ, rhythm doesn't.
- **"Draw `"23"` first"** → 9 leaves = 3 × 3 confirms your tree.

If you hesitated, re-read today's concept page side-by-side trees — then code without looking at Day 8.

> 🎯 **Pattern Unlocked:** Multi-Branch Index Generation — Day 8 synthesis confirmed.

---

*One quest down. Next: parentheses revisit — the constrained tree. →*
