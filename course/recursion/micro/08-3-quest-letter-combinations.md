<!-- hand-authored -->
# ⚔ Quest: Letter Combinations

> **Day 8** · [Letter Combinations of a Phone Number #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Letter Combinations of a Phone Number on LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Branch `"23"` on paper. The hints below are for *after* your attempt.

---

## The Problem

Given a string `digits` containing digits from `2-9`, return all possible letter combinations that the number could represent on a phone keypad. Mapping: `2→abc`, `3→def`, `4→ghi`, `5→jkl`, `6→mno`, `7→pqrs`, `8→tuv`, `9→wxyz`.

```
Input:  digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Input:  digits = ""
Output: []

Input:  digits = "2"
Output: ["a","b","c"]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Multi-branch generation** — one branch per letter on the current digit.

If you're stuck after 5 minutes: base when `i == len(digits)`. Loop letters on `KEYS[digits[i]]`, push, dfs(i+1), pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Branch Generation

**How to identify this from the problem statement:**
- "All letter combinations" → Cartesian product via DFS
- Each digit → **3 or 4 branches** (not binary like parentheses)
- Index `i` shrinks: process digit `i`, then `i+1`

| Keyword / phrase | What it signals |
|---|---|
| "letter combinations" / "phone keypad" | Multi-branch DFS per digit |
| "mapping" 2-9 → letters | `KEYS` table, loop chars |
| "all possible" | Record at `i == n` |
| empty `digits` | Return `[]` immediately |

**Why this pattern works:** Each digit contributes independently — recursion walks index forward, branching over that digit's letter set.

**How a strong solver thinks before coding:**
1. *"Base: i == len(digits) → record path."*
2. *"For each letter on current digit: choose, dfs(i+1), pop."*
3. *"Empty input → no combinations."*
4. *"3×3 = 9 combos for two 3-letter digits."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops hard-coded for length** | Fails for variable `digits` length |
| ** itertools.product without recursion** | Works in Python but misses tree/backtrack practice |
| **Append without pop** | Later branches get polluted prefix |
| **Skip empty check** | `""` may need `[]` not `[""]` |

**The insight brute force misses:** Index-driven DFS generalizes to any length — same template as parentheses, different branch count.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Letter Combinations #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | 3–4 branches | Index DFS |
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | 2 branches + constraints | Same choose/pop |
| [Subsets #78](https://leetcode.com/problems/subsets/) | include/skip binary | Index backtracking (Day 11) |
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | numeric branches | Multi-branch with pruning |

---

## 📖 Walkthrough

`digits = "23"`:

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

`digits = "2"` → 3 branches only: `a`, `b`, `c`.

> 💡 **The insight:** Branching factor = letters on current digit. Depth = `len(digits)`. Total leaves = product of branch sizes.

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

- **"All combinations from digits"** → Index DFS, not nested loops per length.
- **"Each digit maps to letters"** → Loop branch letters, recurse on `i+1`.
- **"Same as parentheses without balance rule"** → Multi-branch choose/pop.
- **"Foreshadow backtracking"** → Subsets/permutations swap index for different constraints.

If you tried Cartesian product manually, the breakthrough is **one recursive index** with push/pop per branch.

> 🎯 **Pattern Unlocked:** Multi-branch generation — fan out over current digit's letters, advance index.

---

*Both quests complete. Head to the checkpoint. →*
