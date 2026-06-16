<!-- hand-authored -->
# 📝 Knapsack Variants

> **Day 19** · Knapsack Variants · ★★★★☆ · 25 XP · 15 min read

---

Day 17 had **one** capacity dimension (weight or sum). Day 19 adds a **second constraint** — count of 0s and 1s in strings, or disguise partition as **minimize difference**. Still 0/1 take/skip per item; the table grows to **`dp[c0][c1]`** or you compress with **double reverse loops**.

> **Preview contrast (Day 17 vs Day 19):** Day 17 = `dp[w]` one budget. Day 19 = **`dp[m][n]`** two budgets (zeros/ones), or subset sum where answer is **`total - 2·bestHalf`** — partition min-diff in disguise.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Multi-Dimensional 0/1 Knapsack** — each item costs multiple resources; maximize count or minimize leftover.

- **2D state** — `dp[i][j]` = best answer using at most `i` resource A and `j` resource B
- **Transition** — for each string/item: skip, or take if `(zeros, ones)` fit: `dp[i][j] = max(dp[i][j], dp[i-z][j-o]+1)`
- **Fill order** — both dimensions **reverse** when processing each item (0/1)
- **Partition min-diff disguise** — smash stones = split into two piles closest to `total/2`; answer `total - 2·maxReachableHalf`

### 2. Simple explanation

**Ones and Zeroes:** Each string is an item with "weight" `(count0, count1)` and value `1` (one more string in the knapsack). How many strings fit in budget `(m, n)`?

**Last Stone Weight II:** Every stone goes left or right pile. Difference after pairing is `|sumA - sumB|`. Minimize by making the smaller pile as large as possible — i.e. largest subset sum ≤ `total/2`. That's Day 17 boolean knapsack; answer transforms algebraically.

### 3. Visual — 2D knapsack table (Ones and Zeroes)

```
strs = ["10","0001","111001","1","0"], m=3 zeros budget, n=3 ones budget

dp[i][j] = max strings using i zeros and j ones

Process each string (z=zeros, o=ones in string), reverse both i,j:

  Start dp[0][0]=0, rest 0
  After all strings: dp[3][3] = 4  (pick "10","0001","1","0" etc.)

Cell update:
  SKIP: dp[i][j] unchanged
  TAKE: dp[i][j] = max(dp[i][j], dp[i-z][j-o] + 1)  if i>=z, j>=o
```

### 4. Visual — partition min-diff disguise

```
stones = [2, 7, 4, 1, 8], total=22, target=11

Boolean dp[j] = can make sum j?
Reachable: 0,1,2,3,4,5,6,7,8,9,10,11...

Largest j <= 11 reachable: e.g. 10 (2+8) or 11 (2+4+1+4)?

Best half = 10 → answer = 22 - 2*10 = 2

Intuition: piles 10 and 12 → smash to diff 2
Same table as Partition #416 — different answer extraction
```

### 5. Templates

**2D 0/1 (strings with two costs):**
```
dp = 2D zeros, fill 0
for each item (z, o):
  for i from m down to z:
    for j from n down to o:
      dp[i][j] = max(dp[i][j], dp[i-z][j-o] + 1)
return dp[m][n]
```

**Min diff via subset sum:**
```
target = total/2
boolean dp[0..target]
// standard 0/1 fill
for j from target down to 0:
  if dp[j]: return total - 2*j
```

### 6. Day 17 vs Day 19

| | **Day 17** | **Day 19** |
|---|---|---|
| Capacity | 1D `w` or sum | 2D `(m,n)` or sum + extract |
| Item cost | weight / value | `(zeros, ones)` or stone weight |
| Goal | max / bool / count | max count / min diff |
| Loop | reverse 1D | reverse **both** dims |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "at most m zeros and n ones" | 2D knapsack |
| "maximize number of items" | Value = 1 per item |
| "minimize stone difference" | Subset sum to `total/2` |
| "partition into two groups" | **Day 17** if equal; min-diff if optimize gap |
| "unlimited supply" | **Day 18**, not 2D 0/1 |

**Keywords:** `dp[m][n]` · `double reverse` · `total - 2*best` · `multi-constraint`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forward loop on 2D | Same item twice — reverse both |
| Last stone: return dp[target] bool | Return **`total - 2*max j`** where dp[j] |
| Ones and Zeroes: count wrong | Precompute zeros/ones per string |
| Using unbounded forward | Strings are 0/1 items |
| 1D only for two constraints | Need 2D or iterate dimensions carefully |

### 9. Recognition drill

Read this problem aloud:

> *"Max strings you can pick with at most m 0s and n 1s total."*

Before coding, say:

> *"2D 0/1 knapsack: dp[i][j]=max strings, item cost (z,o), reverse i and j per string."*

Read this one:

> *"Minimize leftover weight when smashing stones in pairs."*

Before coding, say:

> *"Partition min-diff: boolean dp to total/2, answer total-2*bestReachableHalf. Day 17 table, new extraction."*

---

*Two budgets or one disguised partition. First quest: 2D knapsack on bit counts. →*
