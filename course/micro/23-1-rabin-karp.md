# 📝 Rabin-Karp Rolling Hash

> **Day 23** · Rabin-Karp Rolling Hash · ★★★★★ · 20 XP · 15 min read

---

Welcome to A-Rank. On B-Rank Day 21 you designed **hash keys** — canonical fingerprints that group equivalent strings. On D-Rank Day 9 you slid a **fixed window** across an array, updating state in O(1) per step. Today those two ideas merge: a **rolling hash** that fingerprints every substring window without recomputing from scratch.

Rabin-Karp answers the question every substring search secretly asks: *"Can I compare this window to a target in O(1) instead of re-scanning every character?"*

---

## Part 1 — Learn the Pattern

### 1. What is rolling hash?

A **rolling hash** maintains a hash fingerprint of a sliding window. When the window moves one step right, you **subtract** the character leaving the left edge and **add** the character entering the right edge — total work O(1) per shift.

```
Fixed window of length L over string s:

window at i:     s[i .. i+L-1]
window at i+1:   s[i+1 .. i+L]

Instead of re-hashing all L characters:
  roll out s[i], roll in s[i+L]  →  new hash in O(1)
```

Think of it as a **moving fingerprint** — same spirit as sliding window frequency maps, but the "state" is a single integer hash instead of a character tally.

### 2. Polynomial hash formula

Treat the substring as a number in base `B` (often 256 for ASCII, or 26 for lowercase letters):

```
hash("abc") = a·B² + b·B¹ + c·B⁰

General window s[l..r]:
  H = s[l]·B^(r-l) + s[l+1]·B^(r-l-1) + ... + s[r]·B⁰
```

Use a large prime modulus `M` to keep values bounded:

```
H = (a·B² + b·B¹ + c·B⁰) mod M
```

**Why polynomial?** Removing the leftmost character is a division-like operation; appending a new right character is multiply-by-B plus add — both reducible to O(1) with precomputed `B^L mod M`.

### 3. O(1) roll operation

Precompute `powL = B^L mod M`. To slide from window starting at `i` to `i+1`:

```
Roll OUT left char s[i]:
  H_new = (H - s[i] · powL) mod M

Shift remaining digits (multiply by B):
  H_new = H_new · B mod M

Roll IN right char s[i+L]:
  H_new = (H_new + s[i+L]) mod M
```

```
Rolling hash slide — window length L=3, B=26, M=large prime

s = "abcde"

i=0  window="abc"  H₀ = hash("abc")
     roll out 'a', roll in 'd':
i=1  window="bcd"  H₁ = roll(H₀, 'a', 'd')   ← O(1), not O(L)

i=2  window="cde"  H₂ = roll(H₁, 'b', 'e')   ← O(1)
```

Each slide is **constant time** regardless of window length — the same amortized win as sliding window maps.

### 4. Cross-rank bridge — D-Rank Day 9 & B-Rank Day 21

**D-Rank Day 9 — Sliding Window:** A fixed window of length `k` advances one index at a time. You never rebuild the window from scratch — you update state incrementally:

| Day 9 Sliding Window | Rabin-Karp Rolling Hash |
|---|---|
| Window `[left..right]` moves right | Substring window `[i..i+L-1]` moves right |
| Add `s[right]`, remove `s[left]` from frequency map | Add `s[i+L]`, remove `s[i]` from hash |
| O(1) map update per step | O(1) hash roll per step |
| State = character counts | State = single integer fingerprint |

```
Day 9:   map[s[left]]--  ;  map[s[right]]++
Day 23:  H = roll(H, s[left], s[right])   // same slide, different state
```

**B-Rank Day 21 — Hash Key Design:** You learned to design canonical keys so equivalent items collide. Rolling hash is the **dynamic version** — the key updates as the window slides, and you store `hash → positions` in a map to find duplicates or matches:

```
Day 21 static key:  key = sort(word)           →  group anagrams
Day 23 rolling key: key = hash(s[i..i+L-1])   →  find repeated substrings
```

Both use a hash map for **collision grouping**. Day 21 groups by designed equivalence; Day 23 groups by substring fingerprint — with the caveat that hash collisions require verification.

### 5. What problems does this pattern solve?

- **Repeated substring detection** — find all 10-letter sequences appearing twice (#187)
- **Pattern matching** — find first occurrence of pattern in text (#28, also KMP on Day 24)
- **Longest duplicate substring** — binary search length + rolling hash to verify (#1044)
- **Substring anagram search** — rolling hash over character multisets (alternative to Day 11 map)

All share: *"Compare many substrings of the same length without O(L) work per comparison."*

### 6. Why brute force is inefficient

```
Brute force vs rolling hash — find all repeated 10-letter substrings in s (length n)

BRUTE FORCE:
  for i in 0..n-10:
    for j in i+1..n-10:
      compare s[i..i+9] with s[j..j+9]   // up to O(L) per pair
  Total: O(n² · L)  —  for n=10⁵, L=10 → billions of char comparisons

ROLLING HASH:
  for i in 0..n-10:
    H[i] = roll hash of s[i..i+9]      // O(1) per i after init
    map[H[i]].append(i)
  Report hashes with 2+ positions
  Total: O(n) average  —  one pass, one roll per index
```

| Brute force | Problem |
|---|---|
| Re-hash every window from scratch | O(n · L) just to build hashes |
| Compare all pairs of substrings | O(n² · L) — rolling hash cuts to O(n) |
| String equality on every candidate | Rolling hash + map groups candidates; verify only on collision |
| No early pruning on search space | Binary search on length + Rabin-Karp prunes (#1044) |

### 7. The key observation

A polynomial hash is a **compressed representation** of a substring. Two equal substrings → same hash (always). Two different substrings → usually different hash (collision possible).

```
hash collision handling:

if hash(s[i..i+L-1]) == hash(s[j..j+L-1]):
    verify s[i..i+L-1] == s[j..j+L-1]   // confirm, don't trust blindly
```

For contest and interview problems:
- Use a **large prime modulus** (e.g., 10⁹+7) to keep collision rate negligible
- On collision, do a **direct string compare** — cheap insurance
- For binary-search + Rabin-Karp (#1044), use **double hashing** (two moduli) to make false positives astronomically rare

### 8. Pattern signals & recognition clues

| When the problem says… | Think rolling hash |
|---|---|
| "find all repeated substrings of length L" | Fixed window L + hash map of hash → indices |
| "find longest substring that appears twice" | Binary search on length + Rabin-Karp verify |
| "search pattern in text" | Roll hash of pattern; roll hash over text windows |
| "compare many substrings of equal length" | O(1) roll beats O(L) recompute |
| fixed window size given (e.g., 10-letter DNA) | Classic Rabin-Karp fixed window |

**Keywords:** `repeated substring` · `rolling hash` · `Rabin-Karp` · `fixed window` · `substring search` · `hash collision` · `polynomial hash`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting modulo on subtraction | `(H - s[i]·powL % M + M) % M` — subtraction can go negative |
| Not precomputing `B^L mod M` | Needed for O(1) roll-out of left character |
| Trusting hash equality without verify | Collisions exist — confirm with string compare on match |
| Using 32-bit int without mod | Overflow corrupts hash — mod at every multiply/add |
| Rebuilding hash from scratch each slide | Defeats the purpose — use the roll formula |
| Wrong base or modulus | Use consistent B; pick large prime M (10⁹+7, 10⁹+9) |

### 10. Recognition drill

Read this problem aloud:

> *"All DNA sequences are 10-letter strings over {A, C, G, T}. Given a string s, return all the 10-letter sequences that occur more than once in s, in any order."*

Before coding, say:

> *"Fixed window of 10. Rolling hash with base 4 (or 256). Map hash → list of start indices. Report substrings where map has 2+ entries. O(n) average. Verify on collision."*

---

## Part 2 — What's Next

Today you'll apply rolling hash to two classic forms:

1. **Fixed-window duplicate detection** — Repeated DNA Sequences (#187): roll a length-10 fingerprint, group by hash
2. **Binary search + rolling hash** — Longest Duplicate Substring (#1044): search the answer length, verify with Rabin-Karp

The roll formula doesn't change. The second quest adds binary search on top.

---

*You understand the moving fingerprint. First quest: hunt repeated DNA sequences. →*
