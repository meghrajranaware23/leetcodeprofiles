<!-- hand-authored -->
# ✅ Day 26 Checkpoint

> **DP Pattern Synthesis** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 26 = **synthesize** local pattern detection + structural recurrence.

| When you see... | Think... | Why |
|---|---|---|
| "arithmetic slice" / constant gap | Running dp, ans += dp | #413 |
| "slices ending at i" | Centered count on extend | O(n) not O(n³) |
| "domino and tromino" / "2×n" | f(n)=2·f(n-1)+f(n-3) | #790 |
| "count tilings" mod MOD | Rolling 3-state recurrence | Tromino notch |
| "plain domino only" | Fibonacci f(n-1)+f(n-2) | Simpler variant |

### 🧠 Quick Recognition Test

1. *"Count arithmetic slices (contiguous, len≥3)?"* → **dp** = slices ending at i; continue → `dp++, ans+=dp`.
2. *"Tile 2×n with domino + tromino?"* → **f(n)=2·f(n-1)+f(n-3)**, roll (a,b,c).
3. *"Arithmetic subsequence (not subarray)?"* → **#446** — harder, map per index.
4. *"Climbing stairs?"* → **#70** — simpler 1D recurrence.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count subarrays with constant difference d (any d)."*

Which pattern? #413 fixes d implicitly from last two elements. Unknown d → check all j < i pairs or hash map (#446).

**Scenario 2:** *"Tile 3×n board with dominoes."*

Which pattern? Harder tiling — profile DP with exponential states. Day 26 #790 is the 2×n warm-up.

**Scenario 3:** *"Number of smooth descent periods (each step -1)."*

Which pattern? Same **running dp** as #413 — check consecutive decrease by 1.

> **Answer key:** Local contiguous property → running dp. Tiling 2×n → domino/tromino recurrence.

---

## ⚠ Common Mistakes

1. **ans += 1 instead of ans += dp** on #413 — misses extended slices.
2. **Forget dp = 0 on gap break** — stale run length.
3. **Fibonacci for #790** — tromino needs f(n-3) term.
4. **Wrong rolling init** — a=1,b=1,c=2 for n≥3 loop.
5. **Subsequence vs subarray** on arithmetic — #413 is contiguous only.

---

## 🏋️ Mini Challenge

**nums = [1,2,3,4,5]** — how many arithmetic slices?

> 💡 **Hint:** dp runs 1,2,3 at i=2,3,4 → ans = 1+2+3 = 6.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Arithmetic Slices #413](https://leetcode.com/problems/arithmetic-slices/) | Medium | Counting Sequences DP |
| [Domino and Tromino Tiling #790](https://leetcode.com/problems/domino-and-tromino-tiling/) | Medium | Tiling Recurrence DP |

---

*Day 26 complete! Tomorrow: interview simulation. →*
