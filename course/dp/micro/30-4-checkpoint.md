<!-- hand-authored -->
# ✅ Day 30 Checkpoint

> **The Final Ascension** · 2 quests completed · ⭐ 170 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 30 is **Dynamic Legend capstone** — run the **Days 1–29 decision flowchart**, then execute.

| When you see... | Think... | Why |
|---|---|---|
| "longest increasing path" in matrix | DFS memo, strict `>` | DAG — #329 |
| "burst / merge" with neighbor cost | Interval last-burst | #312 |
| Any new DP problem | **Decision tree first** | Concept page flowchart |
| Grid path count / min sum | Days 7–11 | Not DFS memo unless increasing |
| 1D partition chunk ≤ k | Day 28 #1043 | Not interval |

### 🧠 Quick Recognition Test

1. *"Longest strictly increasing path in matrix"* → **DFS memo.** `memo[i][j]=1+max(neighbors)`.
2. *"Max coins bursting all balloons"* → **Interval DP.** Last burst k; pad `[1,...nums,1]`.
3. *"Maximal square of 1s"* → **Day 28** side-length — not Day 30.
4. *"Minimum difficulty, d days, partition jobs"* → **S-Test #1335** — 2D partition.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Longest path in DAG defined by grid values."*

Which pattern? **Same as #329** — DFS memo or topo + dp.

**Scenario 2:** *"Minimum cost to merge stones into one pile."*

Which pattern? **Interval DP cousin** — often last-merge or prefix merge variant.

**Scenario 3:** *"Can you reach last index?"*

Which pattern? **Greedy/DP reachability** — D-Rank #55, not capstone.

> **Answer key:** Scenario 1 = Day 30. Scenario 2 = interval family. Scenario 3 = D-Rank.

---

## ⚠ Common Mistakes

1. **LIP: allow equal neighbors** — must be strictly increasing.
2. **LIP: BFS without memo** — exponential without cache.
3. **Burst: first-burst thinking** — pick **last** burst in interval.
4. **Burst: no padding** — need virtual 1s at boundaries.
5. **Skip decision tree on S-Tests** — name pattern in 30 seconds first.

---

## 🏋️ Mini Challenge

You are ready for **S-Rank tests**. Review the capstone map:

| Test | Pattern | Day link |
|---|---|---|
| Job Schedule #1335 | 2D partition (days × jobs) | Day 28 + B partition |
| Longest Valid Parens #32 | Linear dp[i] length | Day 14 string |
| Palindrome Partition II #132 | dp[i] min cuts + expand | Day 14–15 |

**Before each test:** Run the decision flowchart. Say the day and pattern aloud.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest Increasing Path in a Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | Hard | Grid DFS + Memoization |
| [Burst Balloons #312](https://leetcode.com/problems/burst-balloons/) | Hard | Interval DP |

---

*Day 30 complete! S-Rank tests await — prove Dynamic Legend status. →*
