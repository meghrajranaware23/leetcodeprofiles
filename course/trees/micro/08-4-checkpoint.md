<!-- hand-authored -->
# ✅ Day 8 Checkpoint

> **Tree Construction** · 2 quests completed · ⭐ 60 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 8 is **pick root → split inorder → recurse on ranges** — two arrays, one partition line.

| When you see... | Think... | Why |
|---|---|---|
| "preorder + inorder" | Root = `pre[0]`, leftSize = k - is | Forward construction |
| "inorder + postorder" | Root = `post[last]`, rightSize = ie - k | Reverse construction |
| "construct unique binary tree" | Hash inorder indices | O(1) root lookup |
| "build left and right subtree" | Range shrink on both arrays | Divide and conquer |
| "serialize/deserialize" | Often same split skeleton | Root + partition |

### 🧠 Quick Recognition Test

1. *"Build tree from preorder [3,9,20] and inorder [9,3,20]"* → **Pre+in** — root 3, left [9], right [20]
2. *"Root is last in postorder"* → **In+post** — build right subtree first
3. *"Find max depth"* → **Not Day 8** — bottom-up measure, not build
4. *"Construct from preorder and postorder only"* → **Variant** — need uniqueness / size check (#889)

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Construct maximum binary tree from array — max element is root."*

Which pattern? **Same split idea** — find max index in range, partition left/right, recurse. Root from array max instead of traversal order.

**Scenario 2:** *"Convert sorted array to balanced BST."*

Which pattern? **Mid as root** — like inorder split, but pick middle of sorted array as root.

**Scenario 3:** *"Validate BST with min/max bounds."*

Which pattern? **Day 5/11 top-down bounds** — NOT construction. Don't confuse traverse with build.

> **Answer key:** Scenarios 1–2 = divide-and-conquer partition. Scenario 3 = different pattern family.

---

## ⚠ Common Mistakes

1. **Off-by-one on preorder right segment** — Right starts at `ps + leftSize + 1`.
2. **Building left before right in postorder variant** — In+post: right first.
3. **Using leftSize in postorder variant** — Use `rightSize = ie - k`.
4. **Linear inorder scan each call** — Precompute hash map.
5. **Empty segment check wrong** — `ps > pe` → null, not `ps >= pe` with careful bounds.

---

## 🏋️ Mini Challenge

### [Construct from Preorder and Postorder #889](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

**[→ Try #889 on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)**

Build tree from preorder and postorder only — requires uniqueness assumption (no duplicate values).

**Before you code:** Say how you infer left subtree size when inorder isn't given. (Hint: postorder[pe-1] relates to left subtree root.)

> 💡 **Hint:** Same range-recursion skeleton — different root/sizing rule.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | Medium | Divide and Conquer Construction |
| [Construct Binary Tree from Inorder and Postorder Traversal #106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | Medium | Reverse Construction |

---

*Day 8 complete! Tomorrow: BFS variations on the Day 3 engine. →*
