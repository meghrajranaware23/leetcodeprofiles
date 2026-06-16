<!-- hand-authored -->
# ✅ Day 8 Checkpoint

> **String Generation** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 8 is **choose → explore → unchoose** along a path. Branch count and constraints vary.

| When you see... | Think... | Why |
|---|---|---|
| "generate all" strings/combos | DFS on path + index/state | Record at base |
| "parentheses" / "balanced" | open/close counters | Prune `)` when `open <= close` |
| "phone keypad" / digit → letters | Multi-branch per digit | Loop KEY chars, `i+1` |
| "append and remove" / backtrack | `push` / `pop` | Siblings need clean path |
| "path length == n" / `i == len` | Base case | Snapshot path to results |
| empty input string | Return `[]` | No digit → no combo |

### 🧠 Quick Recognition Test

1. *"Generate all valid n-pair parentheses"* → **Constrained 2-branch DFS** — open/close
2. *"All letter combos for phone digits"* → **Multi-branch index DFS**
3. *"All subsets of array"* → **Backtracking preview** — include/skip (Day 11)
4. *"Pow(x,n) efficiently"* → **Day 6** — halving, not generation

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Binary watch: represent time with n LEDs on — return all valid times."*

Which pattern? **Constrained generation** — prune invalid hour/minute like parentheses prune invalid prefixes.

**Scenario 2:** *"Given digits 1-9 mapping to letters, generate words with dictionary filter."*

Which pattern? **Multi-branch DFS** — same as #17, prune when prefix not in dictionary (Day 17).

**Scenario 3:** *"Generate all length-n strings using only 'a' and 'b'."*

Which pattern? **2-branch index DFS** — identical skeleton to phone pad with 2 letters per "digit."

> **Answer key:** All three = **path + dfs + pop**. Constraints change which branches exist.

---

## ⚠ Common Mistakes

1. **No `pop()` after recurse** — Wrong combinations on sibling branches.

2. **Filter after generating all strings** — Prune during DFS when possible.

3. **Store mutable path reference** — Copy at base: `''.join(path)`.

4. **Wrong `)` rule for parentheses** — Need unmatched `(` before adding `)`.

5. **Return `[""]` for empty digits** — Correct answer is `[]`.

---

## 🏋️ Mini Challenge

### [Binary Watch #401](https://leetcode.com/problems/binary-watch/)

**[→ Try Binary Watch on LeetCode](https://leetcode.com/problems/binary-watch/)**

Given `turnedOn` LEDs lit, return all valid times the watch can represent.

```
Input:  turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "all valid times" | Generate + prune invalid hour/minute |
| "n LEDs on" | Choose positions / count bits — DFS or combinatorics |
| "leading zero allowed" | String formatting at base case |

**Before you code:** Say *"constrained generation."* Which hours are valid? Which minutes?

> 💡 **Hint:** Pick which LEDs are on (subset of 10 positions) or DFS hour/minute with LED count — prune when hour > 11 or minute > 59.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | Medium | Constrained generation |
| [Letter Combinations #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Medium | Multi-branch generation |
| [Binary Watch #401](https://leetcode.com/problems/binary-watch/) | Easy | Constrained generation (stretch) |

---

*Day 8 complete! Tomorrow: tree recursion — invert and mirror. →*
