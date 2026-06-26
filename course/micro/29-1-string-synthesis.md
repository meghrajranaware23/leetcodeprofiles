# 📝 Multi-Pattern String Synthesis

> **Day 29** · Cross-Domain Pattern Transfer · 25 XP · 15 min read

---

Day 28 combined array patterns inside one scan. Day 29 asks the same synthesis question on **strings** — because every string technique you learned is an array technique in disguise, with extra structure (characters, frequencies, lexicographic order).

The unlock: **cross-domain transfer**. When a string problem mentions substrings, frequencies, or "all substrings," map it to the array pattern you already know, then add the string-specific bookkeeping.

---

## Part 1 — Learn the Meta-Strategy

### 1. Strings are arrays with character semantics

| Array concept | String equivalent | Rank where you learned it |
|---|---|---|
| Contiguous subarray | Contiguous substring | D-Rank Day 9 / Day 10 |
| Element frequency | Character count | E-Rank Day 3 |
| Index of last occurrence | Character position tracking | E-Rank Day 3 / Day 4 |
| Sum over all subarrays | Sum over all substrings | B-Rank Day 18 contribution |
| Window validity budget | `length − maxFreq ≤ k` | Day 29 synthesis |

**Cross-domain transfer** means: read the string problem, strip the word "character," and ask *"Which array pattern is this?"* Then re-add character-specific details (26-letter array vs hash map, case sensitivity, etc.).

### 2. Two string synthesis archetypes — today

| Synthesis | Pattern A | Pattern B | Canonical problem |
|---|---|---|---|
| **Window + frequency budget** | Variable sliding window (D-Rank Day 10) | Character frequency map (E-Rank Day 3) | Longest Repeating Character Replacement (#424) |
| **Contribution counting on characters** | Per-element contribution (B-Rank Day 18) | Character position tracking (E-Rank Day 3/4) | Count Unique Characters of All Substrings (#828) |

**Window + frequency budget:** Expand the window, track char counts. Valid when you can make all chars match the dominant one with at most `k` replacements — equivalently `windowLen − maxFreq ≤ k`.

**Contribution counting:** Don't enumerate all O(n²) substrings. For each character position, compute how many substrings it **uniquely contributes to** using previous/next occurrence boundaries.

### 3. Window + frequency budget — the validity rule

```
Longest Repeating Character Replacement (#424):

Window [left..right] is valid when:
    (right - left + 1) - maxFreq ≤ k

    window length  −  count of most frequent char  ≤  replacements allowed

Example: s = "AABABBA", k = 1

Expand until invalid:
  window "AABAB" → len=5, maxFreq(A)=3 → 5−3=2 > 1  INVALID
  shrink left until valid again

Track max valid window length — NOT the final window state.
```

```
Frequency budget diagram:

s = "ABAB", k = 2

right→
  [A]           len=1, maxF=1, 1−1=0 ≤ 2  ✓  best=1
  [A,B]         len=2, maxF=1, 2−1=1 ≤ 2  ✓  best=2
  [A,B,A]       len=3, maxF=2, 3−2=1 ≤ 2  ✓  best=3
  [A,B,A,B]     len=4, maxF=2, 4−2=2 ≤ 2  ✓  best=4

The "budget" is replacements — freq map (Day 3) tracks maxFreq;
variable window (Day 10) expands and shrinks.
```

### 4. Contribution counting on strings

B-Rank Day 18 taught: *"Don't sum over all subarrays — sum each element's contribution."*

On strings, each **character occurrence** at index `i` contributes to the global unique-character count in exactly those substrings where `s[i]` is the **only** occurrence of that letter:

```
contribution(i) = (i - prevSame) × (nextSame - i)

prevSame = index of previous occurrence of s[i]  (or −1 if none)
nextSame = index of next occurrence of s[i]      (or n if none)
```

```
s = "ABC"   (n = 3)

Index 0 ('A'): prevSame=−1, nextSame=3
  contribution = (0−(−1)) × (3−0) = 1×3 = 3
  substrings: "A", "AB", "ABC" — each counts A once

Index 1 ('B'): prevSame=−1, nextSame=3
  contribution = (1−(−1)) × (3−1) = 2×2 = 4
  substrings: "AB", "B", "ABC", "BC" — each counts B once

Index 2 ('C'): prevSame=−1, nextSame=3
  contribution = (2−(−1)) × (3−2) = 3×1 = 3
  substrings: "ABC", "BC", "C"

Total = 3 + 4 + 3 = 10 ✓
(matches brute-force sum of unique chars over all substrings)
```

Character position tracking (Day 3/4) supplies `prevSame` and `nextSame` — either one forward pass with a `last` map, or precompute `next` with a backward pass.

### 5. Cross-rank bridges

**D-Rank Day 10 — Variable Sliding Window** gave you expand/shrink for longest/shortest valid substring. Day 29's first quest (#424) uses the same loop — validity is `len − maxFreq ≤ k` instead of sum ≥ target.

**E-Rank Day 3 — Frequency Pattern** gave you character count maps and `maxFreq` tracking. Combined with Day 10, the freq map is the **budget meter** inside the window.

**B-Rank Day 18 — Contribution Counting** gave you "each element contributes `value × count` to the global sum." On strings, each **position** contributes `(i − prev) × (next − i)` to the unique-character total — same inversion of the loop, different formula.

**E-Rank Day 4 — Character Position Tracking** gave you last-seen indices and next-occurrence boundaries — the exact inputs the contribution formula needs.

```
Rank journey for #424 (Longest Repeating Character Replacement):

Day 10:  "Expand right, shrink left while invalid"           → window skeleton
Day 3:   "Track char frequencies, find dominant count"       → maxFreq
Day 29:  "Valid when len − maxFreq ≤ k"                      → synthesis

Rank journey for #828 (Count Unique Characters):

Day 18:  "Sum over all subarrays → sum each element's contribution"  → inversion
Day 3/4: "Track prev and next occurrence of each character"            → boundaries
Day 29:  "contribution(i) = (i−prev)×(next−i)"                         → synthesis
```

### 6. The string synthesis checklist

```
1. Is it a SUBSTRING problem?     → window family (Day 9 or 10)
2. Does validity use FREQUENCIES?   → freq map (Day 3) + budget rule
3. Does it sum over ALL substrings? → contribution counting (Day 18)
4. Need position boundaries?       → prev/next occurrence (Day 3/4)
5. Array technique applies?         → transfer first, then add char details
```

### 7. Why brute force fails

| Brute force | Synthesis wins |
|---|---|
| Check every substring, count unique chars | O(n²) substrings — contribution is O(n) |
| Try every replacement combination | Exponential — freq budget is O(1) check per step |
| Rebuild freq map from scratch each window | O(26) or O(n) per step — update incrementally |
| Enumerate all substrings for #828 | O(n²) — one pass with prev/next is O(n) |

### 8. Pattern signals — combination recognition

| When the problem says… | Combine… |
|---|---|
| "longest substring after replacing k chars" | Variable window (Day 10) + freq budget (Day 3) |
| "count unique characters in all substrings" | Contribution counting (Day 18) + position tracking (Day 3/4) |
| "at least k repeating characters" | Divide & conquer or freq pruning (checkpoint #395) |
| "longest with at most k distinct" | Variable window + distinct map (Day 11 cousin) |
| "all substrings" + aggregate | Almost always contribution or inversion — never enumerate |

**Keywords:** `repeating character replacement` · `unique characters` · `all substrings` · `frequency budget` · `maxFreq` · `contribution` · `prev occurrence`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Shrinking until `maxFreq` drops | Track **global max length** — maxFreq can stay high after shrink |
| Rebuilding freq map each step | Increment on expand, decrement on shrink — O(1) amortized |
| Enumerating all substrings for #828 | Contribution formula — O(n) one or two passes |
| Using wrong prev boundary | `prevSame` = previous index of **same character**, not `i−1` |
| Forgetting cross-domain transfer | Ask "what array pattern is this?" before coding string logic |

### 10. Recognition drill

Read this problem aloud:

> *"Given a string s and integer k, return the length of the longest substring containing the same letter after replacing at most k characters."*

Before coding, say:

> *"Variable window (Day 10). Freq map (Day 3) tracks maxFreq. Valid when len − maxFreq ≤ k. Expand right, shrink left while invalid. Track max length. O(n)."*

---

## Part 2 — What's Next

Today you'll transfer array synthesis to strings on two classics:

1. **Window + freq budget** — Longest Repeating Character Replacement (#424)
2. **Contribution + position tracking** — Count Unique Characters of All Substrings (#828)

The checkpoint applies frequency analysis to at-least-k repeating characters.

---

*Array patterns speak string fluently. First quest: k replacements, longest uniform substring. →*
