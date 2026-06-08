# ✅ Day 16 Checkpoint

> **Greedy on Arrays** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "can you reach the last index" | Farthest reachable greedy | Track max index reachable in O(n) |
| "minimum jumps to reach end" | Greedy layer / range edge | Count jumps when current range exhausted |
| "circular route" + "starting index" | Greedy restart on negative tank | Abandon doomed start range in one pass |
| "minimum boats" / "pair lightest + heaviest" | Sort + greedy pairing (Day 6 / D-Rank) | Locally optimal pair saves resources |
| "move shorter pointer" in max area | Greedy boundary move (Container) | Shorter side can't improve if width shrinks |
| "pick locally best, never backtrack" | Greedy candidate | Sketch exchange argument to verify |
| local best can block global optimum | DP, not greedy | Greedy fails — need to remember subproblems |

### 🧠 Quick Recognition Test

1. *"Can you reach the last index with max jumps at each step?"* → **Farthest reachable — Jump Game I**
2. *"Minimum jumps to reach the last index (always reachable)"* → **Greedy layers — Jump Game II**
3. *"Find starting gas station to complete circular circuit"* → **Greedy restart + total gas ≥ cost**
4. *"Minimum boats, at most 2 per boat, weight limit"* → **Sort + pair light + heavy (Boats)**

---

## 🎯 Transfer to Unseen Problems

You've studied Jump Game and Gas Station. Can you recognize greedy thinking on problems you've never walked through?

**Scenario 1:** *"Given an array of tasks with durations and a cooldown period, find the minimum time to complete all tasks if identical tasks must be separated by at least n intervals."*

Which pattern? **Greedy scheduling with frequency** — not pure array greedy. Sort/count task frequencies, interleave most frequent first. Related greedy family, different mechanics.

**Scenario 2:** *"Given array nums, start at index 0. At each step you may jump 1 to nums[i] steps. Find the minimum number of jumps to reach the last index. Guaranteed reachable."*

Which pattern? **Greedy jump layers (Jump Game II).** Track current jump range `[curEnd]` and next range `[nextEnd]`. When `i == curEnd`, increment jumps and extend to `nextEnd`.

**Scenario 3:** *"Given cookies and children with greed factors, assign one cookie per child to maximize satisfied children."*

Which pattern? **Sort + two pointers (Assign Cookies).** Smallest cookie that satisfies each child — same-direction greedy on sorted arrays, like Boats but with a different pairing rule.

> **Answer key:** Scenario 2 → Jump Game II (checkpoint below). Scenario 3 → sort + greedy two pointers. Scenario 1 → frequency greedy. Signal: **"minimum count with forward-only choices"** → greedy layers or restart.

---

## ⚠ Common Mistakes

1. **Jump Game I vs II** — I asks *can you reach?* (boolean, farthest). II asks *minimum jumps* (count, layer greedy). Different algorithms on similar statements.

2. **Early return on farthest in Jump Game I** — Return `true` when `farthest >= n - 1`. But still check `i <= farthest` at each step — a high farthest from an unreachable index doesn't help.

3. **Skipping total gas check in Gas Station** — Always verify `sum(gas) >= sum(cost)` before trusting greedy `start`.

4. **Wrong restart index** — When tank < 0 at station `i`, restart at `i + 1`, not `i` or `0`.

5. **Using greedy when DP is required** — If the problem asks for maximum score with conflicting choices (e.g., pick left or right from both ends), greedy often fails. Jump Game works because the frontier is monotonic.

---

## 🏋️ Mini Challenge

### [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/)

**[→ Try Jump Game II on LeetCode](https://leetcode.com/problems/jump-game-ii/)**

Given a **0-indexed** array of integers `nums` where each element is your maximum jump length, return the **minimum number of jumps** to reach the last index. You may assume you **always** can reach it.

```
Input:  nums = [2, 3, 1, 1, 4]
Output: 2
Explanation: Jump 1 step (0→1), then 3 steps (1→4).

Input:  nums = [2, 3, 0, 1, 4]
Output: 2
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "minimum number of jumps" | Count layers, not just reachability |
| "always can reach" | No feasibility check — pure optimization |
| "maximum jump length" | Greedy: extend range with each index in current layer |

**Before you code:** *"Track current jump boundary `curEnd` and farthest reachable in next layer `nextEnd`. When `i == curEnd`, increment jumps and set `curEnd = nextEnd`."*

> 💡 **Hint:** This is Jump Game I's farthest tracking upgraded to count **layers**. Each "jump" covers a range; when you exhaust the current range, you must jump again.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Jump Game II #45](https://leetcode.com/problems/jump-game-ii/) | Medium | Greedy jump layers |
| [Boats to Save People #881](https://leetcode.com/problems/boats-to-save-people/) | Medium | Sort + greedy pairing (D-Rank revisit) |
| [Assign Cookies #455](https://leetcode.com/problems/assign-cookies/) | Easy | Sort + greedy match |
| [Candy #135](https://leetcode.com/problems/candy/) | Hard | Two-pass greedy |

---

*Days 15–16 complete! C-Rank interval and greedy patterns are yours. The C-Rank Test awaits. →*
