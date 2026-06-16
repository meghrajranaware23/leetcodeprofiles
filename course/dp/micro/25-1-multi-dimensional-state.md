<!-- hand-authored -->
# 📝 Multi-Dimensional State DP

> **Day 25** · Multi-Dimensional State DP · ★★★★★ · 20 XP · 15 min read

---

Day 12 ran **LIS on numbers** (`dp[i]` = chain ending at i). Day 11 walked **2D grids** (paths, falling sum). Day 25 adds a **third dimension** when the subproblem needs more than index + index: **word chains after sorting by length**, and **grid position + remaining steps** for boundary escape counting.

> **Preview contrast (Day 17 vs Day 25):** Day 17 knapsack = `(item, capacity)` with take/skip on **weights**. Day 25 **Longest String Chain** = sort words + LIS-style on **predecessor strings** (delete one char). **Out of Boundary** = `(row, col, stepsLeft)` — NOT a knapsack table.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Multi-Dimensional State DP** — two flagship shapes:

**A. Sort + LIS on words (`dp[word]`)**
- **Sort** words by length (shortest first)
- **State** — `dp[w]` = longest chain ending at word `w`
- **Transition** — for each `w`, try deleting one char → predecessor `pred`; if `pred` in map: `dp[w] = max(dp[w], dp[pred]+1)`
- **Predecessor check** — `pred` must differ by exactly one insertion (length diff 1, subsequence match)

**B. 3D boundary grid `(row, col, steps)`**
- **State** — `dp[i][j]` = ways to reach `(i,j)` after `t` moves (implicit third dim = loop over moves)
- **Transition** — from each in-bounds cell, spread to 4 neighbors; out-of-bounds adds to answer
- **Base** — `dp[startRow][startColumn] = 1` before first move

### 2. Simple explanation

**String chain:** Process words from short to long. A word can extend a chain only if some **shorter word** becomes it by adding one letter. That's one deletion backward — generate all `pred` by removing each char once, look up in hash map.

**Boundary paths:** You're on a grid with a move budget. After each step, track how many paths land on each cell. Any step that walks off the edge contributes to the answer immediately — you don't need a third array dimension if you loop moves outside and swap `dp`/`ndp`.

### 3. Visual — Sort + LIS on words

```
words = ["a","b","ba","bca","bda","bdca"]
sorted by length:

  a → dp=1
  b → dp=1
  ba → pred "a" exists → dp=2
  bca → pred "ca"? no. pred "ba" → dp=3
  ...

Chain: "a" → "ba" → "bca" → "bdca" (length 4)

Same LIS *spirit* as Day 12 — but edge test is
"pred differs by one char" not "nums[j] < nums[i]"
```

### 4. Visual — `(row, col, steps)` boundary memo

```
m=2, n=2, maxMove=2, start=(0,0)

Move 0: dp[0][0]=1

Move 1 from (0,0):
  → (1,0): ndp[1][0]+=1
  → (0,1): ndp[0][1]+=1
  → up/left: out → ans+=1 each? (from (0,0) up and left exit)

Move 2: spread from all in-bounds cells
  out-of-bounds hits accumulate in ans

Third dimension = move count (outer loop)
NOT knapsack (no capacity, no take/skip)
```

### 5. Day 12 vs Day 17 vs Day 25

| | **Day 12 — LIS** | **Day 17 — Knapsack** | **Day 25 — Today** |
|---|---|---|---|
| State | `dp[i]` ending at i | `dp[i][w]` item + weight | `dp[word]` or `dp[r][c]` per step |
| Prep | Sort values optional | Items + capacity | **Sort words by length** |
| Transition | `nums[j]<nums[i]` | take or skip | pred by one-char delete |
| Quest | #300 | #416, #494 | #1048, #576 |

### 6. The universal templates

```
// Longest string chain
sort(words by length)
dp = map word → 1
for w in words:
  for i in 0..len(w)-1:
    pred = w without char i
    if pred in dp:
      dp[w] = max(dp[w], dp[pred]+1)

// Out of boundary (steps as outer dim)
dp[start] = 1
for move in 1..maxMove:
  ndp = zeros
  for each cell (i,j) with dp[i][j]:
    for 4 dirs:
      if in bounds: ndp[ni][nj] += dp[i][j]
      else: ans += dp[i][j]
  dp = ndp
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "word chain" / "predecessor" / "one letter" | Sort by length + map lookup |
| "out of boundary" / "maxMove steps" | Grid + step loop, count exits |
| "knapsack" / "capacity" | **Day 17** — not today |
| "longest increasing subsequence" on numbers | **Day 12** — simpler 1D |

**Keywords:** `sort by length` · `pred` · `(row,col,steps)` · `ndp` · `MOD`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Knapsack template for string chain | No weights — predecessor string lookup |
| Skip sorting words | Longer words must come after shorter |
| O(n²) pairwise compare without length sort | Sort + hash map is O(n·L²) |
| 3D array for boundary when 2D rolling works | Outer move loop replaces step dimension |
| Forgetting mod on boundary paths | ans accumulates mod 10⁹+7 |

### 9. Recognition drill

Read this problem aloud:

> *"Find longest chain where each word is predecessor of next by adding one letter."*

Before coding, say:

> *"Sort by length. dp[w]=1. Remove each char → pred. If pred in map, extend chain. NOT knapsack."*

---

*String chain first. Quest 1: Longest String Chain. →*
