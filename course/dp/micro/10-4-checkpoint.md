<!-- hand-authored -->
# ✅ Day 10 Checkpoint

> **Multi-Option Decision DP** · 2 quests completed · ⭐ 65 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 10 = **inner loop** over choices at each state.

| When you see... | Think... | Why |
|---|---|---|
| "max product breaking n" | for j: max(j*(i-j), j*dp[i-j]) | Partition max |
| "fewest perfect squares sum to n" | for j²≤i: min(dp[i-j²]+1) | Min layers |
| "two branches only" | Days 6–9 | No inner loop |
| "count paths grid" | Day 7 | Fixed neighbors |
| "min path grid" | Day 8 | Two neighbors, min |

### 🧠 Quick Recognition Test

1. *"Integer break max product"* → **dp[i] inner j, max of two-term and j*dp[i-j]**
2. *"Least squares summing to n"* → **dp[i] inner j, min dp[i-j²]+1**
3. *"Circle rob max"* → **Day 9 two-pass**
4. *"Decode ways"* → **Day 7 prefix sum**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum coins to make amount n with unlimited coins of given denominations."*

Which pattern? **Day 10 min inner loop** — same skeleton as Perfect Squares with coin sizes instead of j².

**Scenario 2:** *"Split stick into pieces to maximize product (same as Integer Break)."*

Which pattern? **Partition maximization** — today's first quest.

**Scenario 3:** *"Can you jump to the end?"*

Which pattern? **D-Rank test #55** — greedy farthest reach OR reachability DP; not inner split loop.

> **Answer key:** Many choices at each i → inner loop. Two fixed branches → earlier days.

---

## ⚠ Common Mistakes

1. **Forgetting j*dp[i-j] in Integer Break** — Multi-part splits matter.
2. **j up to i in squares** — Stop when j*j > i.
3. **dp[0] wrong** — Squares: 0; Break: dp[1]=1 carefully.
4. **INF not reset** — Initialize dp[i] to max/min sentinel before inner loop.
5. **Confusing min layers with max product** — Operator matches problem.

---

## 🏋️ Mini Challenge

Solve [Coin Change #322](https://leetcode.com/problems/coin-change/) using today's min inner-loop template before attempting D-Rank tests.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Integer Break #343](https://leetcode.com/problems/integer-break/) | Medium | Partition Maximization DP |
| [Perfect Squares #279](https://leetcode.com/problems/perfect-squares/) | Medium | Minimization with Multiple Choices |

---

*Day 10 complete! D-Rank tests next — mix patterns from the whole rank. →*
