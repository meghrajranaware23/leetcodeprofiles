# 📝 Multi-Constraint Windows

> **Day 25** · Multi-Constraint Sliding Windows · ★★★★★ · 20 XP · 18 min read

---

Welcome to A-Rank. On C-Rank Day 11 you slid a window with a **frequency map** — at most k distinct, anagram matching, coverage checks. Today the constraints stack up: **exactly k** distinct integers, **word-sized chunks** instead of characters, and windows that must satisfy **multiple frequency budgets** at once.

The unlock is one decomposition trick and one granularity shift — both build directly on the expand/shrink loop you already know.

---

## Part 1 — Learn the Pattern

### 1. What is a multi-constraint window?

A **multi-constraint window** is still a contiguous range `[left..right]` — but validity depends on **more than one rule** at the same time:

| Constraint type | Example | Window state |
|---|---|---|
| **At most K** | Longest substring with ≤ k distinct (#340) | `len(freq_map) ≤ k` |
| **Exactly K** | Subarrays with exactly k distinct (#992) | `len(freq_map) == k` |
| **Full coverage** | Minimum window substring (#76) | Every char in `t` satisfied |
| **Fixed chunk size** | Concatenation of all words (#30) | Window advances in steps of `wordLen` |
| **Multiset match** | Find all anagrams (#438) | Window freq == pattern freq |

The expand/shrink skeleton from Day 11 **does not change**. Only the validity predicate and what you count as one "unit" change.

```
Multi-constraint template:

left = 0
for right in 0..n-1:
    ADD unit at right to window state     // EXPAND
    while window is INVALID (or TOO VALID):
        REMOVE unit at left from state    // SHRINK
        left++
    UPDATE answer
```

### 2. The exactly-K decomposition — atMost(K) − atMost(K−1)

Problems asking for **exactly k** distinct elements look harder than "at most k." They aren't — you already solved the easy half on Day 11.

```
exactly(k) = atMost(k) − atMost(k − 1)
```

**Why this works:** Every subarray belongs to exactly one bucket:

```
                    atMost(3) includes everything with 1, 2, OR 3 distinct
                    atMost(2) includes everything with 1 OR 2 distinct

    atMost(3)  ████████████████████████████████████
    atMost(2)  ████████████████████
    ────────────────────────────────────────────────
    exactly(3) ████████████████   ← only the 3-distinct subarrays
```

Count subarrays with **at most k** distinct → `countAtMost(k)`.  
Count subarrays with **at most k−1** distinct → `countAtMost(k-1)`.  
Subtract → subarrays with **exactly k** distinct.

```
nums = [1, 2, 1, 2, 3],  k = 2

atMost(2) counts: all subarrays with ≤ 2 distinct values
atMost(1) counts: all subarrays with ≤ 1 distinct value

exactly(2) = atMost(2) − atMost(1)

Walk atMost(2) with sliding window + freq map:
  expand right, shrink while len(map) > 2
  on each valid position, add (right − left + 1) subarrays ending at right

Repeat for atMost(1), subtract. Done. O(n) per pass.
```

**Recognition signal:** "exactly k distinct" / "exactly k different" → never brute-force count distinct per subarray. Write `atMost(k)` once, call it twice.

### 3. Word-level windows — shift the unit of expansion

Character-level windows treat each letter as one unit. **Word-level** problems treat each word (fixed length `L`) as one unit:

```
s   = "barfoothefoobarman"
words = ["foo","bar"]

wordLen = 3

Character indices:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17
                    b  a  r  f  o  o  t  h  e  f  o  o  b  a  r  m  a  n

Word-aligned chunks:
                    [bar] [foo] [the] [foo] [bar] [man]
                     ↑                       ↑
                  index 0               index 12  ← both start valid concatenations

Window slides in steps of wordLen:
  Start positions: 0, 3, 6, 9, 12, 15 ...
  At each start, read words s[i:i+L], s[i+L:i+2L], ...
```

```
Word-level window diagram:

s = "catdogcat"
words = ["cat","dog"]   wordLen = 3

Start at index 0:
  ┌─────┬─────┐
  │ cat │ dog │  ← window covers 2 words, matches need ✓
  └─────┴─────┘
   0     3     6

Start at index 3:
       ┌─────┬─────┐
       │ dog │ cat │  ← different word order, still valid ✓
       └─────┴─────┘
        3     6     9

Start at index 1 (misaligned):
    ┌─────┬─────┐
    │ atd │ ogc │  ← NOT a word boundary — skip or handle separately
    └─────┴─────┘
```

**Two approaches for word windows:**
1. **Aligned starts only** — only check indices `0, wordLen, 2×wordLen, ...` (works when all words same length).
2. **Sliding with offset** — run the window starting at each offset `0..wordLen-1` separately (handles misalignment in harder variants).

The frequency map tracks **word counts**, not character counts. `need["foo"] = 1`, window adds `s[i:i+3]` as a single token.

### 4. Cross-rank bridge — C-Rank Day 11

**C-Rank Day 11 — Sliding Window + Hash Map** gave you the core loop:

| Day 11 skill | Day 25 upgrade |
|---|---|
| `len(map) > k` → shrink | `len(map) > k` for atMost; call twice for exactly k |
| Character freq map | Word freq map (keys are substrings of length L) |
| Anagram match (multiset equality) | Concatenation match (all words present with correct counts) |
| Longest window (at most k) | Count subarrays (exactly k) via subtraction |

```
Day 11:  "How long can the window grow?"     → maximize length
Day 25:  "How many windows satisfy exactly k?" → count via atMost decomposition
         "Which starting indices form a valid word chain?" → word-level freq map
```

**C-Rank Day 12 — Variable Window** previewed minimum covering windows (#76). Day 25's checkpoint practices that capstone — expand until all of `t` is covered, shrink while covered, track minimum.

**D-Rank Day 10 — Hash Set Windows** used membership only. Day 11 upgraded to counts. Day 25 upgrades again: counts of **words** or **exactly-k** subarray counts via decomposition.

### 5. atMost(K) counting template — no solution code, just the shape

When the answer is **how many subarrays** satisfy a constraint (not the longest or shortest), each valid position contributes a count:

```
countAtMost(nums, k):
    left = 0, count = 0, freq = {}
    for right in 0..n-1:
        ADD nums[right] to freq
        while len(freq) > k:
            REMOVE nums[left] from freq
            left++
        count += (right - left + 1)   // all subarrays ending at right are valid
    return count
```

Why `right - left + 1`? Every subarray `[i..right]` where `left ≤ i ≤ right` has at most k distinct — and you just made `right` the new right boundary.

For exactly k: `countAtMost(nums, k) - countAtMost(nums, k-1)`.

### 6. What problems does this pattern solve?

- **Subarrays with K Different Integers** (#992) — exactly k via atMost decomposition
- **Subarray Product Less Than K** (#713) — atMost on product (different shrink rule, same counting shape)
- **Substring with Concatenation of All Words** (#30) — word-level freq map
- **Minimum Window Substring** (#76) — multi-char coverage (checkpoint)
- **Permutation in String** (#567) — fixed window + freq match (Day 11 cousin)

All share: *"Contiguous range + frequency state + expand/shrink until constraint holds."*

### 7. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Check every subarray, count distinct with a set | O(n²) distinct counts — sliding window is O(n) |
| Rescan all words in window on every shift | O(n × numWords) — word-level window updates O(1) per shift |
| Nested loops for exactly k without decomposition | Reinvents atMost — write one helper, call twice |
| Character-by-character for word problems | Misses alignment — words are atomic units of length L |

### 8. Pattern signals & recognition clues

| When the problem says… | Think multi-constraint window |
|---|---|
| "exactly k distinct" / "exactly k different" | atMost(k) − atMost(k−1) |
| "at most k distinct" + count subarrays | atMost(k) with `(right - left + 1)` accumulation |
| "concatenation of all words" / fixed word length | Word-level freq map, step by wordLen |
| "minimum window containing all of t" | Expand until covered, shrink while covered |
| "find all starting indices" | Record start positions when window becomes valid |

**Keywords:** `exactly k` · `at most k` · `concatenation` · `all words` · `word length` · `minimum window` · `count subarrays`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Trying to shrink until `len(map) == k` for exactly-k | Use decomposition — shrinking to exactly k is awkward; subtract two atMost counts |
| Forgetting to erase zero-count keys | `len(map)` lies — delete key when count hits 0 |
| Word window at every character index | Words have fixed length L — align starts or run L offset passes |
| Adding 1 instead of `(right - left + 1)` for counting | Each valid end position contributes a **range** of valid starts |
| Using a set for "exactly k" when counts matter | Distinct count needs map with proper key removal |

### 10. Recognition drill

Read this problem aloud:

> *"You are given an array of positive integers and an integer k. Return the number of subarrays with exactly k different integers."*

Before coding, say:

> *"Exactly k = atMost(k) − atMost(k−1). Sliding window + freq map. Expand right, shrink while distinct > bound. Accumulate (right − left + 1). O(n) per pass, two passes."*

---

## Part 2 — What's Next

Today you'll apply multi-constraint windows to two Hard classics:

1. **Word-level window** — Substring with Concatenation of All Words (#30): frequency map over words, not characters
2. **Exactly-k decomposition** — Subarrays with K Different Integers (#992): atMost(k) − atMost(k−1)

The checkpoint practices the coverage capstone: Minimum Window Substring (#76).

---

*You know the decomposition. First quest: match a chain of words in a haystack. →*
