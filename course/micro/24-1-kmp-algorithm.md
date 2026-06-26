# 📝 KMP Prefix Function

> **Day 24** · KMP Prefix Function · 20 XP · 15 min read

---

Welcome to A-Rank Day 24. Yesterday you fingerprinted substrings with **rolling hash** — fast on average, but collisions need verification. Today you learn **KMP** (Knuth-Morris-Pratt): a deterministic pattern matcher that never re-reads characters it already matched.

KMP's engine is the **prefix function** (also called the **failure function** or **LPS array**). It answers: *"When a mismatch happens, how far can I shift the pattern without missing a valid match?"*

---

## Part 1 — Learn the Pattern

### 1. What is the prefix function?

For a pattern `p` of length `m`, the prefix function `π` (pi) stores at each index `i`:

```
π[i] = length of the longest proper prefix of p[0..i]
       that is also a suffix of p[0..i]
```

"Proper" means the prefix is not the entire string `p[0..i]`.

```
p = "ababc"

index:  0   1   2   3   4
char:   a   b   a   b   c

π[0] = 0   "a"       — no proper prefix
π[1] = 0   "ab"      — "a" is prefix but not suffix of "ab"
π[2] = 1   "aba"     — "a" matches: prefix "a" = suffix "a"
π[3] = 2   "abab"    — "ab" matches: prefix "ab" = suffix "ab"
π[4] = 0   "ababc"   — no proper prefix = suffix (c ≠ a)
```

The π array is the **memory** of the pattern — it records how much of a partial match can be salvaged after a mismatch.

### 2. Failure function construction — step-by-step trace

Build π left to right. Maintain `j` = length of current longest border (candidate prefix-suffix match).

```
BUILD π for p = "aabaacaab"

i=0, p[0]='a':  no proper prefix → π[0]=0, j=0

i=1, p[1]='a':  p[1]='a' == p[j]='a'?  YES → j=1, π[1]=1
i=2, p[2]='b':  p[2]='b' == p[j]='a'?  NO  → j=π[j-1]=π[0]=0
                p[2]='b' == p[j]='a'?  NO  → j stays 0, π[2]=0
i=3, p[3]='a':  p[3]='a' == p[j]='a'?  YES → j=1, π[3]=1
i=4, p[4]='a':  p[4]='a' == p[j]='a'?  YES → j=2, π[4]=2
i=5, p[5]='c':  p[5]='c' == p[j]='a'?  NO  → j=π[j-1]=π[1]=1
                p[5]='c' == p[j]='a'?  NO  → j=π[j-1]=π[0]=0
                p[5]='c' == p[j]='a'?  NO  → π[5]=0
i=6, p[6]='a':  p[6]='a' == p[j]='a'?  YES → j=1, π[6]=1
i=7, p[7]='a':  p[7]='a' == p[j]='a'?  YES → j=2, π[7]=2
i=8, p[8]='b':  p[8]='b' == p[j]='b'?  YES → j=3, π[8]=3

Final π = [0, 1, 0, 1, 2, 0, 1, 2, 3]
```

**Build template:**

```
π[0] = 0, j = 0
for i = 1 to m-1:
    while j > 0 and p[i] != p[j]:
        j = π[j - 1]          // fall back to shorter border
    if p[i] == p[j]:
        j++
    π[i] = j
```

The `while` loop is the key — on mismatch during π construction, fall back through shorter borders until a match or `j = 0`.

### 3. Cross-rank bridge — E-Rank Day 5 prefix sums

**E-Rank Day 5 — Prefix Sums:** You precomputed cumulative totals so any range query became one subtraction:

```
prefix[i] = sum of everything before index i
range(l, r) = prefix[r+1] - prefix[l]     // O(1) query after O(n) prep
```

**KMP prefix function** is the string analogue — precompute border information so every mismatch recovery is O(1) amortized:

| Day 5 Prefix Sums | Day 24 Prefix Function |
|---|---|
| `prefix[i]` = cumulative sum up to `i` | `π[i]` = longest border of `p[0..i]` |
| Build in one left-to-right pass | Build in one left-to-right pass |
| Answer range queries without re-summing | Answer mismatch recovery without re-matching |
| `prefix[r+1] - prefix[l]` in O(1) | `j = π[j-1]` fallback in O(1) amortized |

```
Day 5:   "I already summed indices 0..k — don't add them again."
Day 24:  "I already matched p[0..j-1] — don't restart from p[0]."
```

Both patterns share: **preprocess once, reuse knowledge at query time.**

### 4. Search trace — mismatch recovery

Search pattern `p` in text `t` using π. Pointer `j` tracks how many pattern chars matched so far.

```
t = "aabaacaabaa"
p = "aabaacaab"
π = [0,1,0,1,2,0,1,2,3]

i=0..8: characters match one by one, j grows 0→9
        at i=8: full pattern matched → report i - m + 1 = 0 ✓
        continue: j = π[j-1] = π[8] = 3 (seek overlapping match)

i=9: t[9]='a', p[3]='a' → match, j=4
i=10: t[10]='a', p[4]='a' → match, j=5
i=11: t[11]='b'... (continue scanning)
```

**Mismatch example within search:**

```
t = "aabaaX..."
p = "aabaab"
         ↑ mismatch at X vs 'b' (j was 5)

Don't restart j=0. Fall back:
  j = π[j-1] = π[4] = 2    // "aa" border salvaged
  retry t[i] vs p[2]       // compare X vs 'b' — still mismatch
  j = π[j-1] = π[1] = 0
  retry t[i] vs p[0]       // compare X vs 'a' — mismatch
  i++ (advance text), j stays 0
```

```
Brute force on mismatch:          KMP on mismatch:
  i -= j  (go back in text)         j = π[j-1]  (fall back in pattern)
  j = 0   (restart pattern)         i stays     (text never rewinds)
  O(n·m) worst case                 O(n + m) guaranteed
```

### 5. What problems does this pattern solve?

- **Pattern matching** — find first occurrence of needle in haystack (#28)
- **Repeated substring pattern** — is `s` built by repeating a unit? (#459)
- **Shortest palindrome** — prepend chars to make palindrome (#214)
- **String periodicity** — detect if string equals k copies of a prefix

All share: *"Exploit overlap structure in the pattern (or string) to avoid redundant comparisons."*

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| On mismatch at position `i`, restart pattern at `i - j + 1` | Re-compares characters already known to match |
| Worst case: `t = "aaaa...aab"`, `p = "aaab"` | O(n·m) — KMP is O(n+m) |
| Rolling hash collision verify | KMP has no collision — exact character compare with smart fallback |
| Rebuilding partial match from scratch | π encodes all salvageable borders — O(1) amortized per fallback step |

### 7. The key observation

When `p[0..j-1]` matches `t[i-j..i-1]` but `p[j] ≠ t[i]`, you know `t[i-j..i-1]` equals `p[0..j-1]`. Any new match starting at `t[i]` that reuses this suffix must also be a prefix of `p`. The longest such prefix is exactly `π[j-1]`.

```
Partial match:  t: ... [matched j chars] [mismatch]
                p:     [0 .. j-1]        [j]

Longest border of p[0..j-1] = π[j-1]
→ shift pattern so p[0..π[j-1]-1] aligns with t[i-π[j-1]..i-1]
→ no text pointer moves backward
```

### 8. Pattern signals & recognition clues

| When the problem says… | Think KMP |
|---|---|
| "find first occurrence of pattern in text" | Build π, scan text with fallback |
| "repeated substring pattern" / "built from copies of unit" | KMP on `s + # + s` or check `π[n-1]` |
| "shortest palindrome by prepending" | KMP on `s + # + reverse(s) |
| "never re-read characters" / "linear pattern match" | π failure function |
| mismatch recovery / border / prefix-suffix overlap | π[i] = longest border |

**Keywords:** `KMP` · `prefix function` · `failure function` · `LPS` · `border` · `pattern matching` · `π array`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Off-by-one in π definition | π[i] is length of border, not index — `p[0..π[i]-1]` is the border |
| Infinite loop in π build | Fallback: `j = π[j-1]`, not `j--` blindly |
| Restarting `j = 0` on every mismatch during search | Use `j = π[j-1]` — only advance `i` when no fallback left |
| Confusing π with Z-function | π is prefix-suffix on the pattern itself; Z is on the concatenated string |
| Not handling `j == m` (full match) | On match: record answer, then `j = π[j-1]` for overlapping matches |

### 10. Recognition drill

Read this problem aloud:

> *"Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not a substring."*

Before coding, say:

> *"Pattern matching → build π for needle. Scan haystack with pointer j. On match, advance both. On mismatch, j = π[j-1]. Text pointer never retreats. O(n+m)."*

---

## Part 2 — What's Next

Today you'll apply the prefix function to two classic forms:

1. **Direct pattern matching** — Find the Index of the First Occurrence (#28): build π, scan with fallback
2. **Creative KMP application** — Shortest Palindrome (#214): run KMP on `s + "#" + reverse(s)` to find longest palindromic prefix

The π build template doesn't change. The second quest concatenates strings to extract a border.

---

*You understand the failure function. First quest: KMP pattern matching on haystack and needle. →*
