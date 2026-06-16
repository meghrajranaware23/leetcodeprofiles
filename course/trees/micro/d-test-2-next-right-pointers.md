<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 2

> [Populating Next Right Pointers in Each Node #116](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Populating Next Right Pointers in Each Node on LeetCode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw level waves. Ask: how do I link nodes without a separate queue? No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Populating Next Right Pointers in Each Node #116](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 9 BFS level linking — connect nodes within each level; **O(1) extra space** using already-established `next` pointers.

- **Perfect binary tree** → every level is full; `leftmost` pointer drops one level each outer iteration.
- Within a level, `head` walks via `head = head.next` **after** you wire its children.
- Core links: `head.left.next = head.right`; if `head.next` exists, `head.right.next = head.next.left`.
- This is BFS logic without a queue — the previous level's `next` chain IS your level-order traversal.

**Pattern name before coding:** *BFS level linking via next pointers — Day 9 variation, O(1) space.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Connect nodes at the same level" → level-order processing (Day 3 / Day 9)
- "Perfect binary tree" → every node has two children until leaf level — simplifies traversal
- "O(1) memory" → no queue; reuse `next` as horizontal iterator

**How a strong solver thinks before coding:**
1. *"Outer loop: while leftmost.left exists (deeper level available)."*
2. *"Inner loop: head walks current level left-to-right via next."*
3. *"Wire left child to right child; bridge to neighbor's left child."*
4. *"Drop leftmost = leftmost.left for next level."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS queue of nodes** | O(n) space — violates O(1) follow-up |
| **DFS with depth map** | Doesn't naturally set horizontal links |
| **Store levels in 2D array, link after** | Extra space |
| **Forget cross-link `head.right.next = head.next.left`** | Breaks connection between subtrees |

---

## 🎯 Transfer to Unseen Problems

[#117 Populating Next Right Pointers II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/) — non-perfect tree — needs a dummy head to track next level. Same BFS-linking idea, harder pointer bookkeeping.

Links to Day 9: horizontal level processing without storing all nodes.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* leftmost = root;
        while (leftmost->left) {
            Node* head = leftmost;
            while (head) {
                head->left->next = head->right;
                if (head->next) head->right->next = head->next->left;
                head = head->next;
            }
            leftmost = leftmost->left;
        }
        return root;
    }
};
```

### Python
```python
class Solution:
    def connect(self, root: Optional[Node]) -> Optional[Node]:
        if not root:
            return None
        leftmost = root
        while leftmost.left:
            head = leftmost
            while head:
                head.left.next = head.right
                if head.next:
                    head.right.next = head.next.left
                head = head.next
            leftmost = leftmost.left
        return root
```

### Java
```java
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Node leftmost = root;
        while (leftmost.left != null) {
            Node head = leftmost;
            while (head != null) {
                head.left.next = head.right;
                if (head.next != null) head.right.next = head.next.left;
                head = head.next;
            }
            leftmost = leftmost.left;
        }
        return root;
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Connect same-level neighbors"** → Day 9 BFS family — horizontal wave.
- **"O(1) space perfect tree"** → Walk level via `next`, no queue.
- **"Two inner links per head"** → left→right within node; right→next.left across nodes.
- **"leftmost drops each level"** → Outer loop descends one depth at a time.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* leftmost = root;
        while (leftmost->left) {
            Node* curr = leftmost;
            while (curr) {
                curr->left->next = curr->right;
                if (curr->next) curr->right->next = curr->next->left;
                curr = curr->next;
            }
            leftmost = leftmost->left;
        }
        return root;
    }
};
```

### Python
```python
class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        leftmost = root
        while leftmost and leftmost.left:
            curr = leftmost
            while curr:
                curr.left.next = curr.right
                if curr.next:
                    curr.right.next = curr.next.left
                curr = curr.next
            leftmost = leftmost.left
        return root
```

### Java
```java
class Solution {
    public Node connect(Node root) {
        Node leftmost = root;
        while (leftmost != null && leftmost.left != null) {
            Node curr = leftmost;
            while (curr != null) {
                curr.left.next = curr.right;
                if (curr.next != null) curr.right.next = curr.next.left;
                curr = curr.next;
            }
            leftmost = leftmost.left;
        }
        return root;
    }
}
```

**Complexity:** undefined
