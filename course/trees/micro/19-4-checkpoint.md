<!-- hand-authored -->
# ✅ Day 19 Checkpoint

> **N-ary Trees & Tries** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 19 is **char-edge tries** and **N-ary child loops**.

| When you see... | Think... | Why |
|---|---|---|
| "trie" / "prefix tree" | Char edges + isEnd | Not binary |
| "search word" vs "starts with" | isEnd required vs not | #208 distinction |
| "N-ary" / `children` list | Loop all children | No left/right |
| "max depth" on Node* N-ary | max(child depths)+1 | For-loop bubble |
| "grid + dictionary words" | **B-Rank test** trie+DFS | Day 19 trie base |

### 🧠 Quick Recognition Test

1. *"Implement insert/search/startsWith"* → **Trie** — isEnd on insert
2. *"Max depth of tree with arbitrary fan-out"* → **N-ary loop**
3. *"Max depth binary tree"* → **Day 4** — two children
4. *"BST search"* → **Day 11** — not trie

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Find shortest prefix replacing words in sentence."*

Which pattern? **Trie insert + early isEnd** — stop at first word end.

**Scenario 2:** *"Serialize N-ary tree to string and back."*

Which pattern? **N-ary BFS/DFS** — encode child count per node.

**Scenario 3:** *"Count words sharing prefix 'pre'."*

Which pattern? **Trie walk to prefix node, DFS count isEnd below**.

> **Answer key:** All three extend Day 19 trie or N-ary structures.

---

## ⚠ Common Mistakes

1. **Trie without isEnd** — Prefix nodes look like words.
2. **startsWith checking isEnd** — Only full search needs it.
3. **Modeling trie as binary tree** — 26 char branches, not 2.
4. **N-ary: using .left/.right** — Use `.children` vector.
5. **Leaf N-ary depth 0** — Single node depth is 1.

---

## 🏋️ Mini Challenge

Draw trie after inserting `"to"`, `"tea"`, `"ten"`. Circle isEnd nodes. Then draw a 3-level N-ary tree and write each node's returned depth bottom-up.

**Before coding:** Label one char edge explicitly — what character does it carry?

> 💡 **Hint:** Edge label = next character in the word path.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Implement Trie (Prefix Tree) #208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Medium | Trie Design |
| [Maximum Depth of N-ary Tree #559](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/) | Easy | N-ary Recursion |

---

*Day 19 complete! Tomorrow: tree DP — rob/skip and zigzag state. →*
