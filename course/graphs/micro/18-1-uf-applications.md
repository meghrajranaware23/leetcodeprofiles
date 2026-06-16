<!-- hand-authored -->
# 📝 UF Application Modeling

> **Day 18** · Union-Find Applications · ★★★★☆ · 25 XP · 15 min read

---

Day 17 taught the DSU skeleton. Today you **model real objects as UF nodes** — emails linked in an account, letters linked by `==`. The graph is implicit: edges come from "these two things must be the same group." Process constraints in the right order, then read off components.

> **Preview contrast (equality vs weighted UF):** Day 18 uses **unweighted equivalence** (`a == b` → union). Day 16's Evaluate Division #399 uses **weighted ratios** (`a/b = 2` → different structure). Same "connect things" instinct — different math.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**UF application modeling** — map problem entities to UF nodes, then:

1. **Build nodes** — assign each distinct entity an id (email → int, letter → 0..25)
2. **Union on positive constraints** — `a == b`, shared account emails, equivalent pairs
3. **Verify negative constraints** — `a != b` → if `find(a) == find(b)`, impossible
4. **Extract components** — group by `find(i)`, sort/merge per problem rules

Two quest flavors today:
- **Accounts Merge** — emails in the same account form a clique; union all pairs in each account
- **Equality Equations** — pass 1: union all `==`; pass 2: reject any `!=` with same root

### 2. Simple explanation

Think of UF as a filing system. Every item gets a folder tab. "These two emails belong together" → staple their folders into one pile. "These letters must be equal" → same pile. After all stapling, each pile is one connected component. For accounts, dump every email in a pile into one merged account. For equations, if `a != b` but they're in the same pile, the rules contradict.

### 3. Visual — Accounts Merge as UF graph

```
accounts = [
  ["John","j@d.com","j@d2.com"],
  ["John","j@d2.com","j@d3.com"],
  ["Mary","mary@mail.com"]
]

Emails as nodes; union within each account row:
  j@d.com — j@d2.com — j@d3.com   (one component, owner John)
  mary@mail.com                    (separate component)

After union: group by root → sort emails → prepend owner name
```

### 4. Visual — Equality equations: = first, then !=

```
equations = ["a==b", "b==c", "a!=c"]

Pass 1 (==):  union(a,b), union(b,c)  →  {a,b,c} one set

Pass 2 (!=):  find(a) == find(c)?  YES → return false ✗

If last were "a==c" instead → all consistent ✓
```

### 5. The universal template

```
// Modeling phase
map entity → id
for each positive constraint (same group):
    union(id[a], id[b])

// Verification phase (if != constraints exist)
for each negative constraint (different group):
    if find(id[a]) == find(id[b]): return false

// Output phase
groups = map root → list of entities
for each group: apply problem-specific sort/merge
```

**Accounts variant:** union `acc[1]` with every other email in the same row.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS between every email pair | O(k²) per account — UF unions in O(α) |
| Build full graph + DFS for equations | Works but heavier — UF is the direct model |
| Process `!=` before `==` | Wrong order — must union positives first |
| Treat Evaluate Division like equality UF | Ratios need weighted propagation, not plain union |

**The insight:** "Same group" constraints → union first. "Different group" → check roots after all unions.

### 7. Day 18 vs Day 16 Evaluate Division #399

| | **Day 18 — Equality UF (#990)** | **Day 16 — Weighted (#399)** |
|---|---|---|
| Constraint | `a == b` (same value) | `a/b = k` (ratio) |
| Union | Plain merge | Store weight along parent edge |
| Query | `find(a) != find(b)?` | `dist(a)/dist(b) == k?` |
| Negative | `a != b` → same root bad | Contradictory ratio chain |
| Tool | DSU + two passes | DFS/BFS on weighted graph or extended UF |

If the problem gives **ratios or divisions**, reach for Day 16 — not today's plain UF.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "merge accounts" / "same person" / shared identifier | UF on emails; union per account row |
| "equations" / "a==b" / "a!=b" | Two-pass UF: union `==`, verify `!=` |
| "smallest equivalent string" / "lexicographically smallest" | UF + union toward smaller char (B-test #1061) |
| "a/b = 2.0" / "division" | **Day 16 weighted** — not plain UF |
| "can you satisfy all constraints?" | Often UF + contradiction check |

**Keywords:** `model entities` · `union positives first` · `verify negatives` · `group by root` · `equivalence class`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Unioning on `!=` equations | Only union `==`; check `!=` in second pass |
| Forgetting to map strings → ids | Accounts Merge needs email→id or email-as-key UF |
| Not collecting all nodes before output | Loop all entities, bucket by `find(i)` |
| Using weighted UF for `==` only | Plain union suffices for #990 |
| Skipping sort in output | Accounts: sort emails; Smallest String: sort chars per component |

### 10. Recognition drill

Read this problem aloud:

> *"Given equations like `a==b` and `c!=d`, return true if you can assign values satisfying all of them."*

Before coding, say:

> *"UF application: pass 1 union every `==`; pass 2 if any `!=` has same find root → false. Not BFS. Not weighted — no ratios."*

---

*Model the objects, union the yes-rules, check the no-rules. First quest: Accounts Merge #721. →*
