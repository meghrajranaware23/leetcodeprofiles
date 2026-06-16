<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 3

> [Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Lexicographically Smallest Equivalent String on LeetCode](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/)**

> ⚔ **Hunter's rule:** Each pair in `s1[i]==s2[i]` means letters are **equivalent**. Union with rule: **always point to the smaller letter** as root. Map each char in `baseStr` through `find`.

---

## The Problem

See the full problem statement on LeetCode: **[Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Day 18 UF with custom unite** — not two-pass != check; only equality pairs from parallel strings.

- 26 letter nodes; `unite(s1[i], s2[i])` for all i.
- **Critical:** when merging, set parent of larger char to smaller char (lex-min representative).
- Output: `find(c)` for each char in `baseStr`.
- Contrast #990: no `!=` constraints. Contrast Smallest String With Swaps: indices not letters.

**Pattern name before coding:** *UF on alphabet; unite toward min char; map baseStr through find.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Equivalent letters form groups; want smallest letter in each class
- Parallel strings s1, s2 give equality constraints pairwise
- Result string = replace each baseStr char with its class minimum

**How a strong solver thinks before coding:**
1. *"parent[a..z] init to self."*
2. *"unite: ra=find(a), rb=find(b); attach larger to smaller."*
3. *"For c in baseStr: append find(c)."*
4. *"Not Day 16 weighted division."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Plain union without min-char rule** | Wrong representative — not lex-smallest |
| **BFS on letter graph** | UF with custom merge is O(α(26)) |
| **Process like Accounts Merge emails** | Letters not strings — 26 fixed nodes |
| **Sort entire baseStr** | Only equivalent letters interchangeable |

---

## 🎯 Transfer to Unseen Problems

Same family as [Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equality-equations/) and [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) — UF equivalence with custom output rule.

Reference: **Day 18** constraint UF — here unite always picks lex-min root.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    vector<int> p;
    char find(char x) { return p[x - 'a'] == x ? x : p[x - 'a'] = find(p[x - 'a']); }
    void unite(char a, char b) {
        char ra = find(a), rb = find(b);
        if (ra < rb) p[rb - 'a'] = ra;
        else p[ra - 'a'] = rb;
    }
public:
    string smallestEquivalentString(string s1, string s2, string baseStr) {
        p.resize(26);
        iota(p.begin(), p.end(), 'a');
        for (int i = 0; i < (int)s1.size(); i++) unite(s1[i], s2[i]);
        string res;
        for (char c : baseStr) res.push_back(find(c));
        return res;
    }
};
```

### Python
```python
class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        p = list('abcdefghijklmnopqrstuvwxyz')
        def find(x):
            if p[ord(x) - 97] != x:
                p[ord(x) - 97] = find(p[ord(x) - 97])
            return p[ord(x) - 97]
        def unite(a, b):
            ra, rb = find(a), find(b)
            if ra < rb: p[ord(rb) - 97] = ra
            else: p[ord(ra) - 97] = rb
        for a, b in zip(s1, s2):
            unite(a, b)
        return ''.join(find(c) for c in baseStr)
```

### Java
```java
class Solution {
    private char[] p;
    public String smallestEquivalentString(String s1, String s2, String baseStr) {
        p = new char[26];
        for (int i = 0; i < 26; i++) p[i] = (char) ('a' + i);
        for (int i = 0; i < s1.length(); i++) unite(s1.charAt(i), s2.charAt(i));
        StringBuilder sb = new StringBuilder();
        for (char c : baseStr.toCharArray()) sb.append(find(c));
        return sb.toString();
    }
    private char find(char x) {
        if (p[x - 'a'] != x) p[x - 'a'] = find(p[x - 'a']);
        return p[x - 'a'];
    }
    private void unite(char a, char b) {
        char ra = find(a), rb = find(b);
        if (ra < rb) p[rb - 'a'] = ra;
        else p[ra - 'a'] = rb;
    }
}
```

**Complexity:** O((n + m) · α(26)) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Equivalent letters"** → UF on 26 chars.
- **"Lexicographically smallest"** → unite toward smaller root always.
- **"Map baseStr through find"** → output one char at a time.
- **"Day 18 cousin"** — equality only, custom merge rule.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    char find(char x) { return p[x - 'a'] == x ? x : p[x - 'a'] = find(p[x - 'a']); }
    void unite(char a, char b) {
        char ra = find(a), rb = find(b);
        if (ra < rb) p[rb - 'a'] = ra;
        else p[ra - 'a'] = rb;
    }
public:
    string smallestEquivalentString(string s1, string s2, string baseStr) {
        p.resize(26);
        iota(p.begin(), p.end(), 'a');
        for (int i = 0; i < (int)s1.size(); i++) unite(s1[i], s2[i]);
        string res;
        for (char c : baseStr) res.push_back(find(c));
        return res;
    }
};
```

### Python
```python
class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        p = list('abcdefghijklmnopqrstuvwxyz')
        def find(x):
            if p[ord(x) - 97] != x:
                p[ord(x) - 97] = find(p[ord(x) - 97])
            return p[ord(x) - 97]
        def unite(a, b):
            ra, rb = find(a), find(b)
            if ra < rb: p[ord(rb) - 97] = ra
            else: p[ord(ra) - 97] = rb
        for a, b in zip(s1, s2):
            unite(a, b)
        return ''.join(find(c) for c in baseStr)
```

### Java
```java
class Solution {
    private char[] p;
    public String smallestEquivalentString(String s1, String s2, String baseStr) {
        p = new char[26];
        for (int i = 0; i < 26; i++) p[i] = (char) ('a' + i);
        for (int i = 0; i < s1.length(); i++) unite(s1.charAt(i), s2.charAt(i));
        StringBuilder sb = new StringBuilder();
        for (char c : baseStr.toCharArray()) sb.append(find(c));
        return sb.toString();
    }
    private char find(char x) {
        if (p[x - 'a'] != x) p[x - 'a'] = find(p[x - 'a']);
        return p[x - 'a'];
    }
    private void unite(char a, char b) {
        char ra = find(a), rb = find(b);
        if (ra < rb) p[rb - 'a'] = ra;
        else p[ra - 'a'] = rb;
    }
}
```

**Complexity:** O((n + m) · α(26)) time · O(1) space
