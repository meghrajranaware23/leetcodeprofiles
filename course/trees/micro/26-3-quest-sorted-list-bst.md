<!-- hand-authored -->
# ⚔ Quest: Sorted List to BST

> **Day 26** · [Convert Sorted List to Binary Search Tree #109](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Convert Sorted List to Binary Search Tree on LeetCode](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)**

> ⚔ **Hunter's rule:** Sorted list = inorder sequence. Use slow/fast to find mid in `[head, tail)` range — root at mid, recurse left and right halves. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Convert Sorted List to Binary Search Tree #109](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **List bisect BST build** — `build(head, tail)` with slow/fast mid; left subtree from `[head, mid)`, right from `[mid.next, tail)`.

If stuck: base case `head == tail` → null. Don't convert to array unless stuck — bisect is the target approach.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Balanced BST Construction (List Bisect)

**How to identify this from the problem statement:**
- Sorted linked list → BST height-balanced
- Same as sorted array #108 but linked list — find mid without indexing
- O(n log n) time typical for repeated mid-finds

| Keyword / phrase | What it signals |
|---|---|
| "sorted list to BST" | Inorder = list order; pick mid as root |
| "height-balanced" | Bisect halves — not skew insert |
| "linked list" | Slow/fast for mid |
| "convert" / "construct" | Divide and conquer |

**Why this pattern works:** Middle element of sorted sequence is BST root; left list half is left subtree inorder; right half is right subtree. Recursion on ranges `[head, tail)` builds balanced tree.

**How a strong solver thinks before coding:**
1. *"build(head, tail): if head==tail return null."*
2. *"slow/fast from head until fast reaches tail."*
3. *"Root = slow; left=build(head,slow); right=build(slow.next,tail)."*
4. *"Call build(head, null)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy to array, then #108** | O(n) extra space — acceptable but not list-native |
| **Insert one-by-one into BST** | O(n²) skew risk |
| **Always pick head as root** | Height O(n) — not balanced |
| **Mid by counting length each call** | Works O(n log n) but two-pass; slow/fast one-pass per call |

**The insight brute force misses:** Slow/fast finds mid in one forward scan per recursive call — no random access needed.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Convert Sorted Array to BST #108](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | Array indexing for mid | Same bisect logic |
| [Construct BST from Preorder #1008](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/) | Not sorted list | Upper bound divide |
| [Balance BST #1382](https://leetcode.com/problems/balance-a-binary-search-tree/) | Existing tree | Inorder + rebuild |

Same skeleton: sorted order → mid root → recurse halves.

---

## 📖 Walkthrough

**List: -10 → -3 → 0 → 5 → 9**

```
build(-10, null):
  slow/fast → mid at 0
  root=0
  left  = build(-10, 0)  → mid -3, then -10
  right = build(5, null) → mid 5, then 9

Result:
        0
       / \
     -3   5
     /     \
   -10      9
```

> 💡 **The insight:** `[head, tail)` half-open range — tail is never included as a node.

---

## Solution

### C++
```cpp
class Solution {
    TreeNode* build(ListNode* head, ListNode* tail) {
        if (head == tail) return nullptr;
        ListNode *slow = head, *fast = head;
        while (fast != tail && fast->next != tail) {
            slow = slow->next;
            fast = fast->next->next;
        }
        TreeNode* node = new TreeNode(slow->val);
        node->left  = build(head, slow);
        node->right = build(slow->next, tail);
        return node;
    }
public:
    TreeNode* sortedListToBST(ListNode* head) {
        return build(head, nullptr);
    }
};
```

### Python
```python
class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        def build(head, tail):
            if head is tail: return None
            slow = fast = head
            while fast is not tail and fast.next is not tail:
                slow = slow.next
                fast = fast.next.next
            node = TreeNode(slow.val)
            node.left  = build(head, slow)
            node.right = build(slow.next, tail)
            return node
        return build(head, None)
```

### Java
```java
class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        return build(head, null);
    }
    private TreeNode build(ListNode head, ListNode tail) {
        if (head == tail) return null;
        ListNode slow = head, fast = head;
        while (fast != tail && fast.next != tail) {
            slow = slow.next; fast = fast.next.next;
        }
        TreeNode node = new TreeNode(slow.val);
        node.left  = build(head, slow);
        node.right = build(slow.next, tail);
        return node;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Sorted list → BST"** → bisect — mid is root.
- **"slow/fast"** → find mid before tail sentinel.
- **"head==tail → null"** → empty half-open range.
- **"#108 array version"** → same logic, index instead of slow/fast.

If you copied to array first, try in-place range bisect on the list.

> 🎯 **Pattern Unlocked:** List bisect BST build — slow/fast mid, recurse `[head,tail)`.

---

*Both quests complete. Head to the checkpoint. →*
