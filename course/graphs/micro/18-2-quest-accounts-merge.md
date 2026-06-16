<!-- hand-authored -->
# ⚔ Quest: Accounts Merge

> **Day 18** · [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Accounts Merge on LeetCode](https://leetcode.com/problems/accounts-merge/)**

> ⚔ **Hunter's rule:** Each account row links all its emails into one UF group. Draw emails as nodes; union every pair sharing a row.

---

## The Problem

See the full problem statement on LeetCode: **[Accounts Merge #721](https://leetcode.com/problems/accounts-merge/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Equivalence class union** — emails are UF nodes; union `acc[1]` with every other email in the same account row.

After unions: bucket emails by `find(email)`, sort each bucket, prepend the owner name from any email in the group.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Equivalence Class Union

**How to identify this from the problem statement:**
- "Merge accounts" when they share an email → transitive closure (A shares with B, B with C → all one group)
- Implicit graph: edge between emails listed together
- Output grouped + sorted emails per person

| Keyword / phrase | What it signals |
|---|---|
| "accounts merge" / "common email" | UF on email strings |
| "return merged accounts" | Group by root, sort emails |
| "same name" on merged rows | Track owner per email |
| "a==b equations" | Same UF modeling — Day 18 |

**Why this pattern works:** Shared email = same person. UF captures transitive "same person" without explicit BFS between every pair.

**How a strong solver thinks before coding:**
1. *"Map each email → owner name; assign id or use email as UF key."*
2. *"For each account: union acc[1] with acc[2], acc[3], ..."*
3. *"Bucket emails by find(root); sort each list."*
4. *"Output [owner, ...sorted emails] per bucket."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS between every email pair** | O(k²) per account — UF unions in O(α) |
| **Build adjacency + DFS per email** | Works but heavier than direct UF modeling |
| **Merge only adjacent emails in row** | Must union first email with **all** others in row |
| **Forget to sort output emails** | Problem requires sorted email lists |

**The insight brute force misses:** Model emails as nodes; each account row is a clique — union star from `acc[1]`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Satisfiability of Equality Equations #990](https://leetcode.com/problems/satisfiability-of-equality-equations/) | `==` union, `!=` verify | Two-pass UF |
| [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) | Union index pairs | Group + sort chars |
| [Lexicographically Smallest Equivalent String #1061](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/) (B-test) | Union toward min char | Weighted merge rule |

Same skeleton: **union positive links → group by root.**

---

## 📖 Walkthrough

```
accounts = [
  ["John","j@d.com","j@d2.com"],
  ["John","j@d2.com","j@d3.com"],
  ["Mary","mary@mail.com"]
]

Union: j@d.com—j@d2.com; j@d2.com—j@d3.com  → one component
  Emails: j@d.com, j@d2.com, j@d3.com → sort → [j@d.com, j@d2.com, j@d3.com]
  Output row: ["John", ...]

mary@mail.com → separate component → ["Mary","mary@mail.com"]
```

> 💡 **The insight:** You never traverse the graph — you declare equivalence and read off components.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string, string> owner;
        unordered_map<string, int> id;
        int n = 0;
        for (auto& acc : accounts) {
            owner[acc[1]] = acc[0];
            for (int i = 1; i < (int)acc.size(); i++) {
                if (!id.count(acc[i])) id[acc[i]] = n++;
            }
        }
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& acc : accounts)
            for (int i = 2; i < (int)acc.size(); i++)
                unite(id[acc[1]], id[acc[i]]);
        unordered_map<int, set<string>> groups;
        for (auto& [email, idx] : id)
            groups[find(idx)].insert(email);
        vector<vector<string>> res;
        for (auto& [root, emails] : groups) {
            vector<string> row = {owner[*emails.begin()]};
            for (auto& e : emails) row.push_back(e);
            res.push_back(row);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        owner = {}
        p = {}
        def find(x):
            p.setdefault(x, x)
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]
        def unite(a, b):
            p[find(b)] = find(a)
        for acc in accounts:
            owner[acc[1]] = acc[0]
            for i in range(1, len(acc)):
                if i > 1:
                    unite(acc[1], acc[i])
        groups = defaultdict(set)
        for acc in accounts:
            for i in range(1, len(acc)):
                groups[find(acc[i])].add(acc[i])
        return [[owner[next(iter(emails))]] + sorted(emails) for emails in groups.values()]
```

### Java
```java
class Solution {
    private Map<String, String> owner = new HashMap<>();
    private Map<String, String> parent = new HashMap<>();
    private String find(String x) {
        parent.putIfAbsent(x, x);
        if (!parent.get(x).equals(x)) parent.put(x, find(parent.get(x)));
        return parent.get(x);
    }
    private void unite(String a, String b) { parent.put(find(b), find(a)); }
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        for (List<String> acc : accounts) {
            owner.put(acc.get(1), acc.get(0));
            for (int i = 2; i < acc.size(); i++) unite(acc.get(1), acc.get(i));
        }
        Map<String, TreeSet<String>> groups = new HashMap<>();
        for (List<String> acc : accounts)
            for (int i = 1; i < acc.size(); i++)
                groups.computeIfAbsent(find(acc.get(i)), k -> new TreeSet<>()).add(acc.get(i));
        List<List<String>> res = new ArrayList<>();
        for (var e : groups.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(owner.get(e.getValue().first()));
            row.addAll(e.getValue());
            res.add(row);
        }
        return res;
    }
}
```

**Complexity:** O(n · k · α(n) + n · k log k) time · O(n · k) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Shared email → same person"** → UF equivalence classes.
- **"Union star from first email"** → each account row links acc[1] to all others.
- **"Transitive merge"** → UF handles A-B and B-C automatically.
- **"Not BFS"** → model then group; no queue.

If you built an explicit adjacency list, UF is the cleaner model.

> 🎯 **Pattern Unlocked:** Equivalence Class Union

---

*One quest down. Next: equality and inequality constraints. →*
