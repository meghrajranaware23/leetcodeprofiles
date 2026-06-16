<!-- hand-authored -->
# 📝 Top-Down State Recursion

> **Day 5** · Top-Down State · ★★☆☆☆ · 10 XP · 10 min read

---

Day 4 let **children report upward** — depth, sameness, counts built from the bottom. Today the important information travels **downward** through parameters.

The root doesn't wait for a magic number from below. It **narrows the problem** before calling children: *"Here's what's left to find"* or *"Here's the valid range — skip what can't matter."* Child calls inherit tighter state; the combine step often uses **`||`** or **conditional recursion** instead of aggregating child returns.

> **Contrast with Day 4:** Day 4 = returns bubble **up** (`1 + max(left, right)`). Day 5 = state flows **down** (`targetSum - root.val`, prune when `node.val > high`).

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Top-down state recursion** — pass accumulated or remaining constraints as parameters; each frame updates state before delegating.

- **Base case** — usually at a **leaf** or `null`, check if current state satisfies the goal
- **Recursive case** — compute `newState` from current node, recurse with `newState`
- **Combine** — often `OR` for existence (path sum), or **conditional calls** for pruning (BST range)

### 2. Simple explanation

You're hiking a trail with a **budget**. At each fork you subtract the cost of the current campsite and hand the **remaining budget** to the next hiker. You don't ask downstream *"what's your total depth?"* — you tell them *"you have $12 left; find a leaf where that hits zero."*

For a BST range sum, you hand down the same `[low, high]` but **skip entire subtrees** when the current value proves they can't contribute.

### 3. Visual walkthrough — remainder going down

```
Path Sum — target = 22

        5  (rem=22)
       / \
  rem=17   rem=17
   (4)       (8)
   / \       / \
 rem=13  rem=9  rem=2  rem=10
 (11)    (2)    (1)    (6)
  ✓ leaf  leaf   leaf   leaf
  11==13? 2==9?  1==2?  6==10?
  no      YES → true

State flows DOWN: each edge subtracts node.val from remainder.
Answer bubbles UP as bool OR (any path wins).
```

### 4. How the pattern works

**Path-style (accumulator / remainder):**
```
function hasPath(node, remaining):
    if node is null: return false
    if leaf: return node.val == remaining
    rem = remaining - node.val
    return hasPath(left, rem) || hasPath(right, rem)
```

**Prune-style (bounded search):**
```
function rangeSum(node, low, high):
    if node is null: return 0
    sum = inRange ? node.val : 0
    if node.val > low:  sum += rangeSum(left, low, high)
    if node.val < high: sum += rangeSum(right, low, high)
    return sum
```

### 5. What problem does this solve?

| Problem family | State passed down | Why not bottom-up? |
|---|---|---|
| Root-to-leaf path sum | Remaining target | Need path prefix; subtree alone doesn't know budget |
| Path sum II (all paths) | Remaining + path list | Collect paths, not aggregate height |
| Range sum BST | `[low, high]` bounds | BST order lets you prune left/right |
| Validate BST | `(min, max)` allowed | Each node tightens range for children |
| File path / prefix matching | Remaining suffix | Match character by character downward |

### 6. Day 4 vs Day 5 — same tree, opposite flow

| Question type | Direction | Example |
|---|---|---|
| "How deep?" / "Same shape?" | **Up** — child returns answer | Max depth, same tree |
| "Any path with sum K?" / "Sum in range?" | **Down** — pass remaining/bounds | Path sum, range sum BST |
| Combine at parent | `max`, `+`, `&&` of child returns | `||` or prune + sum returns |

**Rule of thumb:** If the problem mentions a **path from root**, **remaining**, **budget**, or **valid interval**, think top-down first.

### 7. The key observation

**Top-down recursion encodes "what we're still looking for."** The base case checks whether the current node finishes the job given the state that arrived from above — not whether children already solved an independent subproblem.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "root-to-leaf path" + target sum | Pass `target - val` down; leaf check |
| "has path sum" / "exists" | `||` across children |
| "range [low, high]" on BST | Prune left if `val <= low`, right if `val >= high` |
| "remaining" / "budget" / "prefix" | Top-down parameter |
| "return all paths" | Top-down + backtracking list |

**Keywords:** `remaining` · `targetSum -` · `low` · `high` · `||` · prune

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Checking `sum == target` at every node | Only at **leaves** for root-to-leaf paths |
| Using bottom-up sum for path existence | Subtree sum ≠ root-to-leaf path sum |
| Always visiting both BST children | Skip left when `val <= low`; skip right when `val >= high` |
| Subtracting at leaves twice | Subtract at each step going down, check equality at leaf |
| Confusing with Day 4 depth | Depth needs no downward state — returns up |

### 10. Recognition drill

Read this problem aloud:

> *"Given a BST, sum all values between low and high inclusive."*

Before coding, say:

> *"Top-down bounds [low, high]. Add val if in range. Recurse left only if val > low. Recurse right only if val < high. BST pruning."*

---

*State travels down the tree. First quest: does any root-to-leaf path spend the full target? →*
