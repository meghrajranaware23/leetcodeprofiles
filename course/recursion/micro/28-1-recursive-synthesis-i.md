<!-- hand-authored -->
# 📝 Recursive Synthesis I

> **Day 28** · Recursive Synthesis I · ★★★★★ · 25 XP · 18 min read

---

Day 14 taught **string partition backtracking** — cut the next segment, validate it, push → dfs → pop. You solved Restore IP (#93) and Palindrome Partitioning (#131) with a live palindrome check on every cut.

Today is **synthesis at S-Rank**: same skeleton, but you add **precomputation** and **length pruning** so dead branches never enter the stack. The quests are the **same LeetCode problems**. The skill is coding them cold with optimizations you now understand.

---

## Part 1 — Day 14 Revisit + S-Rank Upgrades

### 1. What you already know (Day 14)

Both problems share one template:

```
dfs(s, i, path, ...):
    if done: record path; return
    for j from i to n-1:          // try every cut ending at j
        seg = s[i..j]
        if valid(seg):            // PRUNE here
            path.push(seg)        // CHOOSE
            dfs(s, j+1, path)     // EXPLORE
            path.pop()            // UNCHOOSE
```

| | Palindrome Partition #131 | Restore IP #93 |
|---|---|---|
| **Validator** | `isPal(s, i, j)` | octet 0–255, no bad leading zero |
| **Stop** | `i == n` | `parts == 4 && i == n` |
| **Cut width** | unbounded | at most 3 chars |

You traced `"aab"` and `"25525511135"` on Day 14. Today you **upgrade the validator layer**, not the backtracking rhythm.

### 2. Precompute `isPal[i][j]` — O(1) palindrome checks

Day 14 called `isPal(l, r)` inside the cut loop — O(n) per check, O(n³) total worst case.

**S-Rank upgrade:** build a 2D table once in O(n²):

```
isPal[i][j] = true if s[i..j] is palindrome

Base:   isPal[i][i] = true
        isPal[i][i+1] = (s[i] == s[i+1])
Extend: isPal[i][j] = (s[i]==s[j]) && isPal[i+1][j-1]
```

Fill by **decreasing length** (or increasing `j-i`) so inner cells exist before outer ones:

```
s = "aab"

      j=0  j=1  j=2
i=0    T    F    F     "a"✓  "aa"✓  "aab"✗
i=1         T    F     "a"✓  "ab"✗
i=2              T     "b"✓
```

Now the cut loop becomes:

```
for j from i to n-1:
    if !isPal[i][j]: continue   // O(1) — skip entire branch
    ...
```

Same tree shape. Fewer frames. This is the bridge from Day 14 generate-all to **pruned partition** (Day 17 mindset applied to strings).

### 3. IP segment prune on `"25525511135"`

Restore IP has **two** prune layers beyond octet validation:

**Layer A — validity (Day 14):**
- length > 3 → skip
- leading zero on multi-digit → skip
- value > 255 → skip

**Layer B — remaining length (S-Rank):**

Exactly 4 octets must consume **all** digits. With `parts` placed and index `i`:

```
remaining_parts = 4 - parts
remaining_chars = n - i

Need: remaining_parts <= remaining_chars <= 3 * remaining_parts
```

If too few digits remain for the octets left → cut branch. If too many digits remain (even max-width cuts can't fit) → cut branch.

Trace `s = "25525511135"` (n=11):

```
dfs(i=0, parts=0)
  "255" valid, 3 parts left, 8 chars left → 3≤8≤9 ✓
    dfs(i=3, parts=1)
      "255" valid, 2 parts left, 5 chars left → 2≤5≤6 ✓
        dfs(i=6, parts=2)
          "11" valid → dfs(i=8, parts=3)
            "135" valid → parts=4, i=11 → "255.255.11.135" ✓
          "111" valid → dfs(i=9, parts=3)
            "35" valid → "255.255.111.35" ✓
          "1113" → len>3 ✗ (Layer A)
          "11135" → len>3 ✗
        "2551" → >255 ✗
      ...
```

The famous `"25525511135"` output has **exactly two** valid IPs — length pruning eliminates cuts like `"255255"` early (not enough room for 2 more octets).

### 4. Same skeleton, different prune hooks

| Problem | Precompute | Runtime prune |
|---|---|---|
| Palindrome Partition #131 | `isPal[i][j]` table | skip when `!isPal[i][j]` |
| Restore IP #93 | none needed (O(1) octet check) | validity + remaining length bounds |
| Palindrome Partition II #132 | same `isPal` table | DP min-cuts — different output goal |

### 5. Recognition in 10 seconds

Before coding, say one sentence:

| Signal | One-liner |
|---|---|
| "partition" + "palindrome" + generate all | *"Cut loop + isPal table, base i==n."* |
| "restore IP" / 4 octets | *"Cut max 3, valid octet, parts==4 && i==n, length prune."* |
| Revisit after Day 14 | *"Same push/pop — add precompute or bounds prune."* |

### 6. Common synthesis mistakes

| Mistake | Fix |
|---|---|
| Recompute palindrome by reversing substring every cut | Precompute `isPal[i][j]` once |
| IP: accept when parts==4 but i≠n | Must consume entire string |
| IP: skip length prune | Wastes dfs on impossible suffix lengths |
| Forget pop after explore | Stale segments leak to siblings |
| Fill `isPal` in wrong order | Extend from shorter substrings first |

### 7. Pattern signals — synthesis drill

| When the problem says… | Upgrade from Day 14 |
|---|---|
| "all palindrome partitions" | `isPal[i][j]` precompute |
| "restore IP" / exactly k segments | length-bounds prune per call |
| "minimum cuts" (#132) | same `isPal`, switch to DP not generate-all |
| slow on long strings | ask: can validation become O(1)? |

**Keywords:** `synthesis` · `revisit` · `isPal` · `precompute` · `length prune` · `partition`

### 8. Recognition drill

Read each problem aloud. Name the Day 14 base + S-Rank upgrade:

> *"Return all palindrome partitionings of a string."*
>
> → **Day 14 cut loop.** Upgrade: **`isPal[i][j]` table** — O(1) per cut check.

> *"Return all valid IP addresses from a digit string."*
>
> → **Day 14 fixed-4-partition.** Upgrade: **remaining-length prune** on top of octet validation. Trace `"25525511135"`.

---

*You know the Day 14 skeleton and the S-Rank prune layer. Quest 1 revisits Restore IP — code it with length pruning. →*
