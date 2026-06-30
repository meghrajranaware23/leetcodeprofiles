<!-- hand-authored -->
# 📝 Guide: Pattern Recognition Basics

> **Day 11** · Basic Pattern Family Recognition · 10 XP · 8 min read

---

**Your mission today:** *Tag problems by **family**, not Ascension pattern names.*

**Learning objective:** Recognize Starter-level problem families before coding — array-transform, array-scan, string-parse, hash-lookup

**Bridge from Day 10:** You solved independently. Today you add **labels** — tagging by family makes tomorrow's problems feel familiar instead of random.

---

## Part 1 — Basic Pattern Family Recognition

### 1. Why family tags matter

"Another Easy" feels overwhelming until you notice: Shuffle and Build from Permutation are the same interleave family. Tags turn 30 random problems into 4 families you recognize.

### 2. The skill in one sentence

> **Tag before you code** — one family label beats memorizing 30 problem titles.

### 3. Problem family tags (Starter level)

| Tag | Feels like | Examples |
|-----|------------|----------|
| **array-transform** | rebuild / shuffle / permute | Shuffle, Build from Permutation |
| **array-scan** | one pass, count/track | Majority, Intersection |
| **string-parse** | walk chars with rules | Roman, Valid Parens |
| **hash-lookup** | seen before? | Two Sum, Contains Duplicate |

> Not "Kadane" or "BFS" yet — those live in Ascension packs.

### 4. "Feels like yesterday" bridge

Shuffle + Build from Permutation = same **interleave / index map** family.

```
Shuffle:     res[2*i] = nums[i],     res[2*i+1] = nums[i+n]
Permutation: ans[perm[i]] = nums[i]  (index map from permutation)
```

### 5. What strong taggers do

| Weak habit | Strong habit |
|---|---|
| Jump to code without tagging | Write family tag in journal first line |
| Look for "Ascension pattern name" | Use Starter tags only |
| Treat each quest as unrelated | "Feels like yesterday's shuffle" |
| Skip connection between quest 2 and 3 | Note same family before quest 3 |

### 6. The key insight

> **Recognition is half of solving** — if you've tagged the family, you already know the shape of the solution.

### 7. Common Day 11 mistakes

| Mistake | Fix |
|---|---|
| Jumped to code without tagging problem family | One tag before opening editor |
| Didn't connect Shuffle and Permutation as same family | Both are array-transform / index map |
| Looked for "Ascension pattern name" instead of Starter tag | array-transform, not "two pointers" |
| Assumed every Easy needs a new technique | Same family → similar loop structure |

### 8. Try it now (60 seconds)

Without coding: tag today's two quests — Shuffle and Build from Permutation — with one family label each.

---

*Tag before you code. →*
