<!-- hand-authored -->
# 📝 String Partition Backtracking

> **Day 14** · Backtracking on Strings · 20 XP · 15 min read

---

Days 11–13 chose from **arrays**. Today the decision space is a **string**: at each step, cut the next segment and recurse on what remains.

The skeleton is still push → dfs → pop. The loop tries **segment lengths** instead of array indices.

---

## Part 1 — Learn the Pattern

### 1. String partition template

```
dfs(s, index i, path):
    if i == len(s):           record path; return    // consumed entire string
    for j from i to n-1:      // try every cut ending at j
        segment = s[i..j]
        if segment is VALID:
            path.push(segment)       // CHOOSE
            dfs(s, j + 1, path)       // EXPLORE rest of string
            path.pop()                // UNCHOOSE
```

**What shrinks:** the unconsumed suffix `s[i..]`. Each recursive call starts at `j+1`.

### 2. Palindrome Partitioning (#131)

**Valid segment:** substring is a palindrome.

```
s = "aab"

i=0: try "a"(pal) → recurse on "ab"
       i=1: try "a"(pal) → recurse on "b"
              i=2: try "b"(pal) → done → record ["a","a","b"]
       i=1: try "ab"(not pal) → skip
       i=0: try "aa"(pal) → recurse on "b"
              → record ["aa","b"]
```

Two valid partitions: `[["a","a","b"], ["aa","b"]]`.

Palindrome check: two pointers `l, r` inward, or expand-around-center — O(n) per check, O(n²) total with memo (advanced).

### 3. Restore IP Addresses (#93)

**Valid segment:** 1–3 digits, value 0–255, no leading zeros (except `"0"` itself).

**Fixed segment count:** exactly **4 parts**. Track `parts` count alongside index.

```
dfs(s, i, parts, path):
    if parts == 4:
        if i == len(s): record joined path
        return
    for j from i to min(i+2, n-1):   // at most 3 chars per octet
        seg = s[i..j]
        if valid(seg):
            path.push(seg)
            dfs(s, j+1, parts+1, path)
            path.pop()
```

Key constraints:
- `len(seg) > 1 && seg[0]=='0'` → invalid (leading zero)
- `stoi(seg) > 255` → invalid
- Must use **entire** string — `i == len(s)` when `parts == 4`

### 4. Same skeleton, different validators

| Problem | Valid segment means | Stop condition |
|---|---|---|
| Palindrome Partition (#131) | Substring is palindrome | `i == n` |
| Restore IP (#93) | Octet 0–255, no bad leading zero | `parts == 4 && i == n` |
| Word Break II (#140) | Substring in dictionary (Day 21) | `i == n` |

The backtracking shape never changes — only the **validity function** and **base case** do.

### 5. Visual — Restore IP for s = "25525511135"

```
Part 1 choices: "2", "25", "255"
  "255" → remaining "25511135", parts=1
    "255" → "11135", parts=2
      "111" → "35", parts=3
        "35" → "", parts=4, i==end → "255.255.111.35" ✓
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Generate all splits, filter | Same work but harder to prune early |
| Check palindrome by reversing every substring from scratch | Acceptable for Medium; memo helps at scale |
| Allow fewer than 4 IP parts | Invalid — must consume full string in exactly 4 |
| `"01"` as IP segment | Leading zero rule rejects it |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "partition string" / "split string" | Try all cut positions from index `i` |
| "every substring palindrome" | Palindrome check before recurse |
| "restore IP" / "valid IP addresses" | Fixed 4 parts, octet validation |
| "decode string" / "segmentation" | Same cut loop, different validator |

**Keywords:** `partition` · `split` · `palindrome` · `restore IP` · `segment`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Recurse with `i` instead of `j+1` | Advance past the segment you just cut |
| Record before consuming full string | IP needs `parts==4 && i==n` |
| Accept `"01"` or `"256"` as octets | Validate segment before pushing |
| Forget pop after exploring cut | Standard backtrack bug |

### 9. Recognition drill

> *"Partition a string so every part is a palindrome."*

Say: *"Cut loop from i. Pal-check s[i..j]. push → dfs(j+1) → pop. Record when i==n."*

> *"Return all valid IP addresses from a digit string."*

Say: *"4 parts max. Cut 1–3 chars. Validate octet. push → dfs(j+1, parts+1) → pop."*

---

## Part 2 — What's Next

1. **Palindrome Partitioning #131** — variable segment count, palindrome validator
2. **Restore IP Addresses #93** — fixed 4 parts, numeric validator

Both are the same cut loop you traced on paper — only the `if valid(segment)` changes.

---

*Strings become decision trees. First quest: palindrome cuts. →*
