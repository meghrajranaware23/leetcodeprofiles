<!-- hand-authored -->
# ✅ Day 3 Checkpoint

> **Tabulation — Building Bottom-Up** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 3 = **bottom-up tables** that aren't Fib-shaped:

| When you see... | Think... | Why |
|---|---|---|
| "cell = sum of two above" | 2D Pascal tabulation | Row i from row i-1 |
| "popcount for 0..n" | dp[i]=dp[i>>1]+(i&1) | Bit halving — not i-1 |
| Fill grid top-to-bottom | Tabulation order | Parents ready before child |
| dp[i] depends on i/2 | Left-to-right 1D fill | i/2 < i |
| Days 1–2 linear recurrence | **Different geometry** | Day 3 breaks the Fib habit |

### 🧠 Quick Recognition Test

1. *"Generate Pascal's triangle with numRows"* → **2D; interior = left-above + above; borders 1**
2. *"Count 1-bits for every i from 0 to n"* → **dp[i]=dp[i>>1]+(i&1); dp[0]=0**
3. *"Can I use dp[i-1]+dp[i-2] for bits?"* → **No — wrong dependency**
4. *"Memo vs tabulate Pascal?"* → **Both work; row-by-row loop is natural**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Return only row index k of Pascal's triangle."*

Still same transition — but you don't need all rows stored forever (Day 4: one rolling row).

**Scenario 2:** *"For each i, count set bits using dp[i & (i-1)] + 1."*

Alternative bit recurrence — clears lowest set bit; also O(n) tabulation.

**Scenario 3:** *"Unique paths in grid — paths to (i,j) from left and up."*

2D tabulation like Pascal but paths **add from left + up**, not two above.

> **Answer key:** Day 3 = **draw the dependency arrow** on the table before coding.

---

## ⚠ Common Mistakes

1. **Using Fib recurrence by reflex** — Bits use i/2, Pascal uses two above.

2. **Wrong fill order on 2D** — Must complete row r-1 before row r.

3. **Forgetting Pascal borders** — j=0 and j=i are always 1.

4. **Starting bit loop at i=0 with formula** — dp[0]=0 base; loop from i=1.

5. **O(n log n) popcount per index** — Misses the O(n) DP insight.

---

## 🏋️ Mini Challenge

On paper, fill **Pascal row 6** and **dp[0..15]** for Counting Bits without a calculator.

Cross-check: sum of row 6 = 2^6? Binomial identity check.

> 💡 **Hint:** For bits, group by i>>1 — all even i share dp[i>>1] with i/2.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Pascal's Triangle #118](https://leetcode.com/problems/pascals-triangle/) | Easy | 2D Visual Tabulation |
| [Counting Bits #338](https://leetcode.com/problems/counting-bits/) | Easy | Bit-Based Tabulation |

---

*Day 3 complete! Tomorrow: the DP framework — state checklist and rolling Pascal. →*
