<!-- hand-authored -->
# 📝 Morris Traversal & Space-Optimal Techniques

> **Day 26** · Morris Traversal · ★★★★★ · 20 XP · 15 min read

---

Day 12 inorder used O(h) stack space. **Morris traversal** achieves **O(1) extra space** by temporarily threading the tree — using null right pointers as return links. Today you apply that mindset to **inorder anomaly detection** (Recover BST — deeper than C-Rank #99) and **list bisection BST build** (sorted linked list → balanced tree).

> **Contrast (Day 12 / C-Rank #99):** Yesterday = stack inorder for violations. Today = **thread create → visit → remove** + **slow/fast bisect** on linked list.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Space-optimal tree techniques:**

| Technique | Space | Core move |
|---|---|---|
| Morris inorder | O(1) | Thread to predecessor; visit; unlink |
| Recover BST | O(h) or O(1) Morris | Inorder scan — find two dips in sorted sequence |
| Sorted list → BST | O(log n) recursion stack | Slow/fast find mid; bisect left/right |

### 2. Simple explanation

**Morris inorder — three phases per node:**

1. **Go left** as far as possible
2. **Thread or visit:**
   - If current has no left → **visit** current, go right
   - Else find **inorder predecessor** (left subtree's rightmost node):
     - If predecessor's right is null → **create thread** (predecessor.right = current), go current.left (first time)
     - If predecessor's right is current → **remove thread** (predecessor.right = null), **visit** current, go current.right (second time — left done)
3. Repeat until null

**Recover BST:** Inorder of valid BST is strictly increasing. Two swapped nodes create one or two "drops" where `prev.val > node.val`. First drop: `first = prev`. Every drop: `second = node`. Swap values — goes deeper than C-test because you must handle **adjacent vs non-adjacent** swap and optionally **Morris O(1)** follow-up.

**List bisect BST:** Sorted list = inorder sequence. Pick **middle** as root (slow/fast on `[head, tail)` range), recurse left half `[head, mid)`, right half `[mid.next, tail)`. O(n log n) time, O(log n) stack — no array copy.

### 3. Visual — Morris thread create / visit / remove

```
Tree:    1
        /
       2
        \
         3

Inorder target: 2, 1, 3

Step 1: curr=1, left exists → pred=3 (rightmost of left)
        pred.right is null → THREAD: 3.right=1, curr=1.left (go to 2)

Step 2: curr=2, no left → VISIT 2, curr=2.right=3

Step 3: curr=3, left exists → pred=2, pred.right==1 (thread!)
        REMOVE thread: 2.right=null, VISIT 1, curr=1.right=3

Step 4: curr=3, pred=2, pred.right null → THREAD 2→3, go left (done)
        curr=3, pred=2, pred.right==3 → REMOVE, VISIT 3, done

  ┌─────────────────────────────────────────────────────────┐
  │  CREATE: predecessor.right = curr (temporary back-link) │
  │  VISIT:  process curr when left subtree finished        │
  │  REMOVE: predecessor.right = null (restore tree)        │
  └─────────────────────────────────────────────────────────┘
```

### 4. Visual — Recover BST: adjacent vs non-adjacent swap

```
Valid inorder: 1, 2, 3, 4, 5

Swap 2 and 4 (non-adjacent):
  Inorder: 1, 4, 3, 2, 5
           ↑drop1  ↑drop2
  Drop at 4: first=2 (prev), second=4
  Drop at 2: second=2 (update)
  Swap first.val ↔ second.val

Swap 3 and 4 (adjacent):
  Inorder: 1, 2, 4, 3, 5
           ↑ one drop only
  first=4 (prev), second=3
  Swap ✓

C-test #99 covers basics; A-Rank adds Morris O(1) and structural reasoning.
```

### 5. Visual — List bisect BST build

```
List: -10 → -3 → 0 → 5 → 9

build(head, tail):
  slow=fast=head; advance until fast hits tail
  mid = slow → root = 0
  left  = build(head, mid)      → -10, -3
  right = build(mid.next, tail) → 5, 9

        0
       / \
     -3   5
     /     \
   -10      9

Height balanced — middle of each range is root.
Same idea as sorted array #108, but O(1) mid find per level via slow/fast.
```

### 6. The universal template

**Morris inorder:**
```
curr = root
while curr:
    if not curr.left:
        VISIT(curr)
        curr = curr.right
    else:
        pred = curr.left
        while pred.right and pred.right != curr:
            pred = pred.right
        if not pred.right:
            pred.right = curr          // CREATE thread
            curr = curr.left
        else:
            pred.right = null          // REMOVE thread
            VISIT(curr)
            curr = curr.right
```

**Recover BST (recursive inorder — C-test baseline):**
```
on inorder(node):
    if prev and prev.val > node.val:
        if not first: first = prev
        second = node
    prev = node
swap first.val, second.val
```

**Sorted list → BST:**
```
build(head, tail):
    if head == tail: return null
    slow = fast = head
    while fast != tail and fast.next != tail:
        slow = slow.next; fast = fast.next.next
    node = TreeNode(slow.val)
    node.left  = build(head, slow)
    node.right = build(slow.next, tail)
    return node
```

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Inorder to array, sort, rebuild | O(n log n) + O(n) space — swap two vals simpler |
| Copy list to array for BST build | O(n) extra space — bisect on list works |
| Morris without removing threads | Corrupts tree permanently |
| Recover: find swapped by value sort | Loses O(n) single-pass inorder |

**The insight:** Inorder order **is** the sorted sequence — violations are local comparisons. Morris simulates stack with threads — O(1) space for traversal-heavy problems.

### 8. Day 26 vs Day 12 vs C-Rank

| | **Day 12** | **C-Rank #99** | **Day 26** |
|---|---|---|---|
| Inorder | Stack O(h) | Violation scan | Morris O(1) optional |
| Recover BST | — | Test problem | Deeper + list bisect |
| List → BST | — | — | Slow/fast bisect |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "O(1) space inorder" | Morris traversal |
| "two nodes swapped in BST" | Inorder dip detection |
| "recover / fix BST" | first=prev on first dip |
| "sorted list to balanced BST" | Slow/fast mid bisect |
| "threaded binary tree" | Morris create/visit/remove |

**Keywords:** `predecessor.right` · `create thread` · `remove thread` · `first=prev` · `slow/fast mid`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Morris: infinite loop on thread | Check `pred.right != curr` in inner while |
| Forgetting to remove thread before visit | Second visit to node — must unlink |
| Recover: first = node on dip | first = **prev** on first violation |
| List bisect: wrong tail sentinel | Use `build(head, None)` — head==tail base |
| Slow/fast off-by-one on even length | Standard: stop when fast.next==tail |

### 11. Recognition drill

Read this problem aloud:

> *"Recover a BST where exactly two nodes were swapped."*

Before coding, say:

> *"Inorder scan: on prev > node, first=prev if unset, second=node. Swap vals. C-test #99 — optional Morris for O(1)."*

---

*Thread for O(1) inorder; bisect for balanced build. First quest: Recover BST. →*
