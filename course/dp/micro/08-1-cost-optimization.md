<!-- hand-authored -->
# 📝 Cost Optimization

> **Day 8** · Cost Optimization · 15 XP · 15 min read

---

Day 7 asked **"how many ways?"** — **`+`**. Today asks **"what's the cheapest?"** — **`min` + cost**. Same grid-neighbor shape as Unique Paths, but you accumulate **path cost**, not path count. Triangle adds a twist: fill **bottom-up** because the next row sits below.

> **Preview contrast (Day 7 vs Day 8):** Day 7 Unique Paths = `dp[i][j] = dp[i-1][j] + dp[i][j-1]`. Day 8 Min Path Sum = `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`. **Same grid; operator flips from sum to min.**

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Min/Max Cost DP** — optimize total cost to reach a cell or state by taking the best predecessor plus local cost.

- **State** — `dp[i][j]` = minimum cost to reach `(i,j)` (or min path sum ending there)
- **Transition** — `cost[i][j] + min/neighbor options` from already-solved cells
- **Grid fill** — usually top-left → bottom-right (depends on move directions)
- **Triangle** — bottom row → top: each cell picks min of **two children below**

### 2. Simple explanation

You're hiking on a grid where every tile charges a toll. To find the cheapest route to the southeast corner, you only need the cheapest way to reach the tile above you and the tile to your left — pick the cheaper of those, add today's toll. For a triangle, stand on the bottom row (cost known), then walk upward asking: *"Which of my two landing spots below is cheaper?"*

### 3. Visual — Day 7 count vs Day 8 min (same grid shape)

```
Same 3×3 grid, different question:

DAY 7 — COUNT paths:              DAY 8 — MIN cost (example costs):

  1  1  1                           1  3  1
  1  2  3      dp = sum             1  5  1   dp = min(top,left)+cell
  1  3  6                           4  2  1

  "how many routes?"                "cheapest route toll?"
  operator: +                       operator: min + cost
```

### 4. Visual — grid min-cost fill

```
grid:          dp (min cost to reach):

1  3  1        1  4  5
1  5  1   →    2  7  6
4  2  1        6  8  7

(1,1): 5 + min(4,2) = 7
(2,2): 1 + min(6,6) = 7  ← answer
First row/col: cumulative sum along edge
```

### 5. Visual — triangle bottom-up

```
Triangle:          Start dp from bottom row:

    2                  dp after bottom-up:
   3 4       →            11
  6 5 7                  9  10
 4 1 8 1               7  6  10

Bottom row copied → row i: dp[j] = tri[i][j] + min(dp[j], dp[j+1])
Answer: dp[0] at apex
```

**Fill direction matters:** triangle goes **up**; grid min-path goes **down-right**.

### 6. The universal templates

**Grid min-cost (top-left start, R/D moves):**
```
dp[0][0] = grid[0][0]
fill first row/col cumulatively
for i,j:
    dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
return dp[m-1][n-1]
```

**Triangle bottom-up:**
```
dp = last row of triangle
for i from n-2 down to 0:
    for j in 0..i:
        dp[j] = triangle[i][j] + min(dp[j], dp[j+1])
return dp[0]
```

### 7. Aggregation ladder (Days 6–8)

| Day | Operator | Example |
|---|---|---|
| Day 6 | `max` | House Robber |
| Day 7 | `+` | Unique Paths count |
| **Day 8** | **`min` + cost** | Minimum Path Sum |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum path sum" / "cheapest route" | Grid min-cost |
| "minimum total" on triangle | Bottom-up min |
| "how many paths" | **Day 7 +** |
| "maximum sum non-adjacent" | **Day 6 max** |
| "each cell has a cost/weight" | Add cost after min/max of predecessors |

**Keywords:** `minimum` · `min(top,left)` · `bottom-up` · `triangle` · `path sum`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using `+` like Unique Paths | Min-cost uses **`min`** |
| Top-down triangle without memo | Bottom-up 1D row is simpler |
| Forgetting first row/col base | Cumulative min along edges |
| Starting triangle from apex down | Start **last row**, move up |
| `min` without adding cell cost | `grid[i][j] + min(...)` |

### 10. Recognition drill

Read this problem aloud:

> *"Find a path from top-left to bottom-right minimizing the sum of cell values."*

Before coding, say:

> *"Day 8 grid min-cost: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Not Day 7 count — min, not sum of ways."*

---

*Optimize cost, not count. First quest: cheapest grid path. →*
