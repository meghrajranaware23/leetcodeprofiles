<!-- hand-authored -->
# ⚔ Quest: Smallest String With Swaps

> **Day 21** · [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Smallest String With Swaps on LeetCode](https://leetcode.com/problems/smallest-string-with-swaps/)**

> ⚔ **Hunter's rule:** Union every swap pair → each UF component can reorder chars freely. Sort chars **descending** in each bucket; pop when rebuilding left-to-right.

---

## The Problem

See the full problem statement on LeetCode: **[Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **UF for connected components** — indices are nodes; swap pairs are edges. Not MST edge sorting — group then sort characters.

Within each component, place smallest available letters at leftmost indices by sorting bucket descending and popping from end.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** UF for Connected Components

**How to identify this from the problem statement:**
- Swap any pair in `pairs` any number of times → indices in same component can permute freely
- Want lexicographically smallest string
- Not minimum swap count — unlimited swaps within component

| Keyword / phrase | What it signals |
|---|---|
| "smallest string with swaps" | UF on indices + sort chars |
| "pairs of indices" | Union each pair |
| "lexicographically smallest" | Greedy: smallest char at each index |
| "min cost connect" | MST — different problem |

**Why this pattern works:** Transitive swaps = connected components. Optimal: sort chars in each component ascending for left-to-right assignment (implement via descending bucket + pop).

**How a strong solver thinks before coding:**
1. *"UF size n; union all pairs."*
2. *"Bucket chars by find(i)."*
3. *"Sort each bucket descending."*
4. *"For i 0..n-1: res[i] = pop from bucket[find(i)]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate every swap** | Exponential |
| **BFS on string states** | State space huge |
| **Sort entire string** | Can only reorder within components |
| **MST/Kruskal** | No edge weights — grouping problem |

**The insight brute force misses:** UF finds swappable groups; sorting within each group is the greedy lex-min.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) | Email nodes | UF + group output |
| [Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/) (B-test) | Union min char | Custom unite |
| [Min Cost Connect Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) | MST weights | UF skip cycle |

Same UF grouping — **different post-processing (sort chars).**

---

## 📖 Walkthrough

```
s = "dcab", pairs = [[0,3],[1,2],[0,2]]

Union → {0,1,2,3} one component
Chars: d,c,a,b → sorted desc bucket [d,c,b,a]
Assign index 0..3: a,b,c,d → "abcd"
```

> 💡 **The insight:** Kruskal sorts edges; here UF groups indices and you sort **characters** inside each group.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(a)] = find(b); }
public:
    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
        int n = s.size();
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& pr : pairs) unite(pr[0], pr[1]);
        vector<string> buckets(n);
        for (int i = 0; i < n; i++) buckets[find(i)].push_back(s[i]);
        for (auto& b : buckets) sort(b.rbegin(), b.rend());
        string res(n, ' ');
        for (int i = 0; i < n; i++) {
            int root = find(i);
            res[i] = buckets[root].back();
            buckets[root].pop_back();
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        n = len(s)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        for a, b in pairs:
            unite(a, b)
        buckets = defaultdict(list)
        for i, ch in enumerate(s):
            buckets[find(i)].append(ch)
        for b in buckets.values():
            b.sort(reverse=True)
        res = []
        for i in range(n):
            root = find(i)
            res.append(buckets[root].pop())
        return ''.join(res)
```

### Java
```java
class Solution {
    private int[] p;
    public String smallestStringWithSwaps(String s, int[][] pairs) {
        int n = s.length();
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] pr : pairs) unite(pr[0], pr[1]);
        List<List<Character>> buckets = new ArrayList<>();
        for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
        for (int i = 0; i < n; i++) buckets.get(find(i)).add(s.charAt(i));
        for (List<Character> b : buckets) b.sort(Collections.reverseOrder());
        char[] res = new char[n];
        for (int i = 0; i < n; i++) {
            int root = find(i);
            res[i] = buckets.get(root).remove(buckets.get(root).size() - 1);
        }
        return new String(res);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(a)] = find(b); }
}
```

**Complexity:** O(n log n + k · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Unlimited swaps on pairs"** → UF connected indices.
- **"Lex smallest"** → sort chars in each component ascending.
- **"Not MST"** → no edge weights; grouping only.
- **"Descending sort + pop"** → greedy left-to-right fill.

If you tried to swap greedily one pair at a time, UF + sort is faster and correct.

> 🎯 **Pattern Unlocked:** UF for Connected Components

---

*Both quests complete. Head to the checkpoint. →*
