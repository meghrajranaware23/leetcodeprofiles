# 📝 Greedy Strings

> **Day 26** · Greedy Stack String Construction · 20 XP · 18 min read

---

On B-Rank Day 17 you built strings **indirectly** — a monotonic stack resolved next-greater neighbors. On C-Rank Day 16 you made **greedy commitments** — discard doomed starts, move the shorter pointer, never reconsider. Today those two instincts merge: use a **monotonic stack to greedily construct the best string** under removal or uniqueness constraints.

The stack isn't finding neighbors anymore — it's the string itself, growing character by character while discarding anything that can't belong in the final answer.

---

## Part 1 — Learn the Pattern

### 1. What is greedy string construction?

**Greedy string construction** builds the answer left to right, deciding at each step whether to **keep** or **discard** the current character — with a stack (or append buffer) as the working string:

```
Greedy string template:

stack = empty (the answer under construction)
for each character c in input:
    while stack not empty AND should_pop(stack.top(), c):
        if removal_budget > 0:
            stack.pop()
            removal_budget--
        else:
            break
    if c not already committed (or always push):
        stack.push(c)
return stack as string
```

Two classic forms:

| Problem shape | Stack order | Pop when | Extra state |
|---|---|---|---|
| **Remove K digits** (#402) | Increasing (non-decreasing toward top) | `c < stack.top()` and budget > 0 | Removal count |
| **Remove duplicate letters** (#316) | Increasing + uniqueness | `c < stack.top()` AND `c` appears later AND `c` not in stack | Frequency map + seen set |
| **Smallest subsequence of distinct chars** (#1081) | Same as #316 | Same pop rule | Frequency + seen |

The goal is always the **lexicographically smallest** valid string — same greedy instinct as "pick the smallest available character that doesn't ruin the future."

### 2. Stack state evolution — remove K digits

```
num = "1432219",  k = 3

Goal: remove 3 digits so remaining number is smallest.

stack = [],  k = 3

'1': push → stack=[1]              greedy: keep 1
'4': 4 > 1 → push → stack=[1,4]   4 > 1, increasing OK
'3': 3 < 4, k>0 → pop 4, k=2
     3 > 1 → push → stack=[1,3]    removed '4' — smaller prefix wins
'2': 2 < 3, k>0 → pop 3, k=1
     2 > 1 → push → stack=[1,2]    removed '3'
'2': 2 ≥ 2 → push → stack=[1,2,2] equal OK (non-decreasing)
'1': 1 < 2, k>0 → pop 2, k=0
     1 < 2, k=0 → can't pop
     push → stack=[1,2,1]          budget exhausted, keep 1
'9': push → stack=[1,2,1,9]

k=0 exhausted. Result: "1219" ✓
```

Each pop removes a **larger leading digit** in favor of a smaller one arriving now — classic greedy exchange.

### 3. Cross-rank bridge — Day 17, Day 16, Day 3

**B-Rank Day 17 — Monotonic Stack** stored indices waiting for a greater neighbor. The **increasing stack** variant keeps elements in non-decreasing order:

| Day 17 Monotonic Stack | Day 26 Greedy String |
|---|---|
| Pop when `nums[i] > stack.top()` (decreasing stack) | Pop when `c < stack.top()` (increasing stack) |
| Stack holds unresolved indices | Stack **is** the answer string |
| Pop records next-greater answer | Pop removes a worse character for lexicographic gain |
| O(n) — each element pushed/popped once | O(n) — each character pushed/popped once |

```
Day 17:  "This index can't be next-greater → pop, record answer."
Day 26:  "This digit can't be part of smallest number → pop, spend budget."
```

**C-Rank Day 16 — Greedy on Arrays** taught the exchange argument: replace a worse local choice without hurting the global optimum. Remove K Digits is the purest string version:

> If `c < stack.top()`, keeping the top digit while a smaller `c` is available produces a larger number. Exchange top for `c` — the remaining suffix can only improve.

**E-Rank Day 3 — Frequency Counting** tallies how many of each character remain. Remove Duplicate Letters needs this: before popping a larger `stack.top()`, verify the popped character **appears again later** (freq > 0 after current position). Otherwise you'd lose that character forever.

```
Day 3 freq map:  "How many 'b's remain in the suffix?"
Day 26 combo:    "Can I pop 'b'? Only if another 'b' appears later."
```

### 4. The three-pattern combo — stack + frequency + seen

Remove Duplicate Letters (#316) combines three tools:

```
State:
  stack     = answer under construction (increasing)
  freq[c]   = remaining occurrences of c in suffix
  seen[c]   = is c already in stack? (O(1) membership)

For each c:
  freq[c]--                              // consumed one occurrence
  if c in seen: skip                     // already committed
  while stack not empty
        AND c < stack.top()
        AND freq[stack.top()] > 0:        // top char appears later
    pop stack.top() from seen
    stack.pop()
  push c, mark seen
```

| Tool | Role |
|---|---|
| **Increasing stack** | Lexicographically smallest — pop larger chars when safe |
| **Frequency map** | Safety check — only pop if that char appears later |
| **Seen set** | Skip duplicates — each char at most once in final string |

### 5. Exchange-argument proof sketch — remove K digits

**Claim:** Popping a larger digit `d` at the top when a smaller digit `c` arrives yields a smaller final number.

**Proof sketch:**
1. Suppose optimal solution keeps `d` at this position: prefix is `...d...`.
2. Greedy produces `...c...` with `c < d` at the same position.
3. All remaining digits are identical in both strings (same suffix processed).
4. At the first differing position, `c < d` → greedy string is lexicographically smaller.
5. Exchange: any solution with `d` here can swap to `c` without needing more removals — greedy is at least as good.

You don't need a formal proof on LeetCode — but this is why you **commit to the pop** without backtracking.

### 6. What problems does this pattern solve?

- **Remove K Digits** (#402) — increasing stack + removal budget
- **Remove Duplicate Letters** (#316) — stack + freq + seen
- **Smallest Subsequence of Distinct Characters** (#1081) — same as #316
- **Create Maximum Number** (#321) — greedy + stack variant (harder)
- **Remove All Adjacent Duplicates II** (#1209) — stack with run-count (related)

All share: *"Build the best string left to right, discarding characters that can't improve the result."*

### 7. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Try all C(n,k) subsets of digits to keep | O(C(n,k)) — stack greedy is O(n) |
| Sort characters and check validity | Loses original order constraint |
| Remove digits left to right without stack | Misses earlier larger digits that should be removed first |
| Pop without checking freq | Remove Duplicate Letters: pop a char that never reappears → invalid |

### 8. Pattern signals & recognition clues

| When the problem says… | Think greedy string stack |
|---|---|
| "remove k digits" / "smallest possible number" | Increasing stack, pop while `c < top` and budget > 0 |
| "smallest string" / "lexicographically smallest" | Increasing stack with pop rule |
| "each letter appears once" / "remove duplicates" | Stack + freq + seen |
| "every letter appears exactly once in result" | Can't skip chars — must include all, just reorder via pops |
| "monotonic" + "string" + "greedy" | Day 17 stack applied to construction |

**Keywords:** `lexicographically smallest` · `remove k` · `remove duplicates` · `distinct characters` · `smallest subsequence`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Decreasing stack instead of increasing | Smallest string → pop when `c < stack.top()` (increasing stack) |
| Popping without checking remaining freq | Only pop if `freq[stack.top()] > 0` — char must appear later |
| Not skipping chars already in seen | Duplicate letters → skip if `c in seen` |
| Forgetting trailing removal when budget remains | After scan, pop from end while `k > 0` |
| Sorting the string | Order is constrained by original positions — stack respects order |

### 10. Recognition drill

Read this problem aloud:

> *"Given a non-negative integer num and an integer k, remove k digits from num so that the remaining digits form the smallest possible integer."*

Before coding, say:

> *"Lexicographically smallest → increasing monotonic stack. Pop top while c < top and k > 0. Push c. Trim remaining k from end. O(n)."*

---

## Part 2 — What's Next

Today you'll apply greedy string construction to two Medium classics:

1. **Removal budget** — Remove K Digits (#402): increasing stack with k pops
2. **Three-pattern combo** — Remove Duplicate Letters (#316): stack + frequency + seen set

The checkpoint practices the same combo on Smallest Subsequence of Distinct Characters (#1081).

---

*You know the greedy stack. First quest: strip k digits for the smallest number. →*
