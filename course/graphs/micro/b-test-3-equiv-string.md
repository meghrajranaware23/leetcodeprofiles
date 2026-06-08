# ⚔ B-Rank Test — Problem 3

> [Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Lexicographically Smallest Equivalent String on LeetCode](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which graph technique does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for graph structure clues
- Determine exploration strategy
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example graph."*
2. *"What are my nodes and edges?"*
3. *"BFS, DFS, Dijkstra, or Union-Find?"*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

Graph problems have natural O(V+E) traversal solutions. Brute force typically means exponential path enumeration or missing visited sets. Trust the exploration strategy.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

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

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
