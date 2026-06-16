<!-- hand-authored -->
# ⚔ Quest: Satisfiability of Equality Equations

> **Day 18** · [Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equations/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Satisfiability of Equality Equations on LeetCode](https://leetcode.com/problems/satisfiability-of-equations/)**

> ⚔ **Hunter's rule:** Two passes only. Pass 1: union every `==`. Pass 2: if any `!=` has same root, return false.

---

## The Problem

See the full problem statement on LeetCode: **[Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equations/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Constraint Union-Find** — letters `a..z` are nodes; `a==b` unions; `a!=b` checks different roots.

**Not** Evaluate Division #399 — no ratios, just plain equality. Contrast Day 16 weighted graph if you see `a/b = k`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Constraint Union-Find

**How to identify this from the problem statement:**
- Equations over 26 letters with `==` and `!=`
- Must satisfy all — contradiction if equal and unequal forced simultaneously
- Order matters: process all `==` before any `!=`

| Keyword / phrase | What it signals |
|---|---|
| "equations possible" / "satisfiable" | UF + contradiction check |
| "a==b" | Union |
| "a!=b" | Verify find(a) ≠ find(b) |
| "a/b = 2.0" | **Day 16 #399** — weighted, not this |

**Why this pattern works:** `==` creates equivalence classes. `!=` demands two classes stay separate — impossible if UF merged them.

**How a strong solver thinks before coding:**
1. *"Init parent[26]; letters a-z."*
2. *"Loop equations: if '==' → union(e[0], e[3])."*
3. *"Loop again: if '!=' and find(a)==find(b) → false."*
4. *"Else true."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Assign values via brute force** | 26 letters still — UF is O(α(26)) |
| **Process != before ==** | Wrong order — may reject solvable cases incorrectly |
| **BFS for each != pair** | Overkill — one find per != |
| **Use weighted UF from #399** | No ratios here — plain merge |

**The insight brute force misses:** Two-pass UF — positives first, then validate negatives.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) | Email nodes | Union positives |
| [Evaluate Division #399](https://leetcode.com/problems/evaluate-division/) | Ratios — **different tool** | Weighted graph |
| [Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/) (B-test) | Union min char | Custom unite |

Same two-pass skeleton for #990: **== then !=.**

---

## 📖 Walkthrough

```
equations = ["a==b", "b!=a"]

Pass 1: union(a,b)  → {a,b} one set
Pass 2: b!=a → find(b)==find(a) → CONTRADICTION → false ✓

equations = ["a==b", "b==c", "a==c"]
Pass 1: all union → one set
Pass 2: no != → true ✓
```

> 💡 **The insight:** You're not assigning letter values — you're asking if equality constraints are mutually consistent.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(char a, char b) { p[find(a)] = find(b); }
public:
    bool equationsPossible(vector<string>& equations) {
        p.resize(26);
        iota(p.begin(), p.end(), 0);
        for (auto& e : equations)
            if (e[1] == '=') unite(e[0] - 'a', e[3] - 'a');
        for (auto& e : equations)
            if (e[1] == '!' && find(e[0] - 'a') == find(e[3] - 'a')) return false;
        return true;
    }
};
```

### Python
```python
class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        p = list(range(26))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for e in equations:
            if e[1] == '=':
                p[find(ord(e[0]) - 97)] = find(ord(e[3]) - 97)
        return all(find(ord(e[0]) - 97) != find(ord(e[3]) - 97) for e in equations if e[1] == '!')
```

### Java
```java
class Solution {
    private int[] p;
    public boolean equationsPossible(String[] equations) {
        p = new int[26];
        for (int i = 0; i < 26; i++) p[i] = i;
        for (String e : equations)
            if (e.charAt(1) == '=') unite(e.charAt(0) - 'a', e.charAt(3) - 'a');
        for (String e : equations)
            if (e.charAt(1) == '!' && find(e.charAt(0) - 'a') == find(e.charAt(3) - 'a'))
                return false;
        return true;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(a)] = find(b); }
}
```

**Complexity:** O(n · α(26)) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"== and != on letters"** → constraint UF, not algebra.
- **"Union all == first"** → then check != for same root.
- **"Not Evaluate Division"** → no weights; Day 16 is for ratios.
- **"26 nodes fixed"** → tiny UF, two loops.

If you tried to assign integers 0/1, UF is simpler and correct.

> 🎯 **Pattern Unlocked:** Constraint Union-Find

---

*Both quests complete. Head to the checkpoint. →*
