<!-- hand-authored -->
# ✅ Day 5 Checkpoint

> **Component Exploration** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 5 extends components: **measure size during flood** and **clone nodes with a map**.

| When you see... | Think... | Why |
|---|---|---|
| "max area" / "largest island" | #200 + dfs returns size | Track max across floods |
| "clone" / "copy graph" | `map[old]=new` | One copy per original node |
| Grid `1` cells, size question | Returning dfs area | Same 4-dir as Day 4 |
| `Node` with `neighbors` | Graph traversal + map | Not a matrix |
| Cycles in graph | Map before recurse | Prevents infinite clone |
| "deep copy" | New objects + same edges | Shallow copy fails |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 5 pattern fires first?

1. *"Largest connected land region in binary grid"* → **Component area counter**
2. *"Duplicate a graph with cycles"* → **Clone with old→new map**
3. *"Number of Islands but return max size not count"* → **Max area template**
4. *"When cloning, neighbor points to already-copied node"* → **Return map[old] immediately**

---

## 🎯 Transfer to Unseen Problems

You've done Max Area and Clone Graph. Can you apply **Day 5 patterns** to new problems?

**Scenario 1:** *"Return the number of cells in each island, sorted descending."*

Which pattern? **Restart + returning dfs** — collect areas in a list.

**Scenario 2:** *"Copy a linked list with random pointers."*

Which pattern? **Old→new map** — same clone idea, different node type.

**Scenario 3:** *"Two grids — count islands in grid2 that exactly match islands in grid1."*

Which pattern? **Matched flood** — E-Rank Test #1905; dfs both grids in sync.

> **Answer key:** Sized floods use **returning dfs**; copy problems use **map before expand**.

---

## ⚠ Common Mistakes

1. **Max area: void dfs like #200** — Must return or accumulate area correctly.

2. **Clone: wire neighbors before registering copy** — Map entry must exist for back-edges.

3. **Clone: no null check on input node** — Empty graph → return null.

4. **Max area: global count without per-island boundary** — Only count one flood at a time.

5. **Confuse clone with invert/reverse** — Structure preserved, new node objects.

---

## 🏋️ Mini Challenge

### E-Rank Test Prep

You are ready for the rank tests when you can name the pattern in 30 seconds:

- **Star center** → degree / common node in first edges
- **Sub-islands** → dual-grid matching flood
- **Surrounded regions** → border DFS, flip interior

Review Day 1 degrees, Day 4 grid flood, Day 3 DFS before opening test 1.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Max Area of Island #695](https://leetcode.com/problems/max-area-of-island/) | Medium | Component Size Tracking |
| [Clone Graph #133](https://leetcode.com/problems/clone-graph/) | Medium | Graph Copy via BFS/DFS |

---

*Day 5 complete! E-Rank tests next — prove the full foundation. →*
