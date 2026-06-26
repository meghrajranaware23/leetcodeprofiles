# 📝 Sliding Window + Hash Map

> **Day 11** · Sliding Window + Hash Map · 15 XP · 12 min read

---

Welcome to C-Rank. On Day 10 you paired a variable window with a **hash set** — membership only. Today the window carries a **frequency map**: not just *"is this character in the window?"* but *"how many times does each character appear?"*

That single upgrade unlocks anagrams, distinct-character budgets, minimum covering windows, and dozens of Medium problems.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **sliding window + hash map** maintains a contiguous range `[left..right]` and a frequency tally of everything inside it:

```
window state = hash map: { character → count in [left..right] }
```

Each step:
- **Expand right** — add `s[right]` to the map (`count[s[right]]++`)
- **Shrink left** — remove `s[left]` from the map (`count[s[left]]--`, erase if zero)
- **Query the map** — check validity (distinct count, anagram match, coverage) in O(1) average

```
s = "cbaebabacd",  p = "abc"

right=0 'c': map={c:1}                    window="c"
right=1 'b': map={c:1,b:1}                window="cb"
right=2 'a': map={c:1,b:1,a:1}            window="cba" ← anagram of "abc" ✓
right=3 'e': map={c:1,b:1,a:1,e:1}        window="cbae"
right=4 'b': map={c:1,b:2,a:1,e:1}        window="cbaeb"
right=5 'a': map={c:1,b:2,a:2,e:1}        window="cbaeba"
right=6 'b': map={c:1,b:3,a:2,e:1}        window="cbaebab"
right=7 'a': map={c:1,b:3,a:3,e:1}        window="cbaebaba"
right=8 'c': map={c:2,b:3,a:3,e:1}        window="cbaebabac"
right=9 'd': map={c:2,b:3,a:3,e:1,d:1}     window="cbaebabacd"
```

The map is a **live inventory** of the window — always in sync with `[left..right]`.

### 2. Set vs map — when counts matter

| Tool | Stores | Best for |
|---|---|---|
| **Hash set** (Day 10) | Presence only | "No duplicates" — is `s[right]` already in the window? |
| **Hash map** (Day 11) | Frequency counts | "Exact composition" — anagrams, k distinct, character budgets |
| **Fixed array `[26]`** (Day 3) | Frequency counts | Lowercase letters only — same logic, faster constant |

**Rule of thumb:** If the problem compares **multisets** (anagrams, permutations, "same character counts"), you need a map — a set loses count information.

### 3. Cross-rank bridge — Day 10, Day 3, Day 4

**D-Rank Day 10** gave you the skeleton:

```
left = 0
for right in 0..n-1:
    ADD s[right] to window state        // EXPAND
    while window is INVALID:
        REMOVE s[left] from window state // SHRINK
        left++
    UPDATE answer
```

Day 10's Longest Substring used a **set** as window state. Day 11 swaps the set for a **map** — the expand/shrink loop is identical. Only the validity check changes:

| Day 10 (set) | Day 11 (map) |
|---|---|
| Duplicate? `s[right] in set` | Too many distinct? `len(map) > k` |
| Remove on shrink: `set.erase(s[left])` | Remove on shrink: `map[s[left]]--`, erase key if zero |
| Max length when no duplicate | Max length when distinct ≤ k |

Longest Repeating Character Replacement (#424) was your Day 10 checkpoint preview — it already used frequency counts. Today you formalize that combo.

**E-Rank Day 3 — Frequency Counting:** You learned to tally characters and compare multisets (Valid Anagram). The sliding window map is the **same tally**, scoped to a moving range:

```
Full-string anagram (Day 3):     count all of s, count all of t, compare
Window anagram (Day 11):         count s[left..right], compare to fixed p
```

**E-Rank Day 4 — Hash Maps:** Two Sum stored `value → index`. Here the map stores `character → count in window`. When you shrink, **decrement and delete zero-count keys** — otherwise `len(map)` lies about distinct count.

### 4. Small visual example — at most 2 distinct

```
s = "eceba",  k = 2

Goal: longest substring with at most 2 distinct characters

right=0 'e': map={e:1}           distinct=1  len=1  max=1
right=1 'c': map={e:1,c:1}       distinct=2  len=2  max=2
right=2 'e': map={e:2,c:1}       distinct=2  len=3  max=3
right=3 'b': map={e:2,c:1,b:1}   distinct=3  → INVALID, shrink
  left=1 remove 'e': map={e:1,c:1,b:1}  distinct=3  shrink
  left=2 remove 'c': map={e:1,b:1}      distinct=2  len=2  max=3
right=4 'a': map={e:1,b:1,a:1}   distinct=3  → shrink
  left=3 remove 'b': map={e:1,a:1}      distinct=2  len=2  max=3

max = 3  ("ece") ✓
```

**Distinct count = number of keys in the map** (only if you erase keys when count hits zero).

### 5. What problem does this pattern solve?

- **Anagram search** — find all windows matching a target multiset (#438)
- **Distinct budget** — longest substring with at most k distinct chars (#340)
- **Character replacement budget** — longest uniform substring after k swaps (#424)
- **Minimum covering window** — smallest substring containing all target chars (#76)
- **Permutation in fixed window** — same as anagram with window size locked (Day 9 #567, now with map logic)

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Check every substring, count chars each time | O(n² × alphabet) or O(n³) |
| Rebuild frequency map from scratch after each shrink | Wastes work — only two chars change per step |
| Use set when counts matter | Anagram detection fails — `"aab"` vs `"abb"` both have unique chars {a,b} |

Each character enters the map once (at `right`) and exits at most once (at `left`) → **O(n)** total pointer movement, **O(alphabet)** map size.

### 7. The key observation

The map always mirrors `[left..right]`. On expand, increment one key. On shrink, decrement one key and **remove the key if count reaches zero** — this keeps `len(map)` equal to the true distinct count.

Two common validity checks:

| Constraint | Valid when | Shrink when |
|---|---|---|
| At most k distinct | `len(map) ≤ k` | `len(map) > k` |
| Exact anagram match | window map == target map | (fixed window size — shrink every step) |
| All targets covered | every needed char count met | (minimum window — shrink while still covered) |

### 8. Pattern signals & recognition clues

| When the problem says… | Think window + hash map |
|---|---|
| "anagram" / "permutation" / "same character count" | Frequency map vs fixed target |
| "at most k distinct" / "exactly k distinct" | Track `len(map)`, shrink when over budget |
| "contains all characters of t" | Map tracks coverage of target multiset |
| "longest substring with … characters" + multiset constraint | Variable window + map (Day 10 skeleton) |
| "find all starting indices" + composition match | Fixed or variable window + map comparison |

**Keywords:** `anagram` · `permutation` · `distinct characters` · `frequency` · `character count` · `cover all` · `at most k`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting to erase keys at count zero | `if (--map[c] == 0) map.erase(c)` — keeps distinct count accurate |
| Comparing full maps every step with O(alphabet) copy | Use a `matched` counter or fixed-size diff array |
| Using a set for anagram problems | Sets ignore multiplicity — `"aab"` ≠ `"abb"` |
| Shrinking before adding `s[right]` | Always expand first, then shrink |
| Not syncing map with window on shrink | Remove `s[left]` before `left++` |

### 10. Recognition drill

Read this problem aloud:

> *"Given strings s and p, return all start indices of substrings in s that are anagrams of p."*

Before coding, say:

> *"Anagram = same multiset → window + frequency map. Compare window counts to p's counts. Slide with expand/shrink or fixed window of size len(p)."*

---

## Part 2 — What's Next

Today you'll apply the window + map combo to two classic Medium problems:

1. **Anagram search** — Find All Anagrams in a String (#438)
2. **Distinct budget** — Longest Substring with At Most K Distinct Characters (#340)

The template from Day 10 doesn't change. The window state upgrades from set to map.

---

*You understand the inventory window. First quest: hunt anagrams in a string. →*
