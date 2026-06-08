# ⚔ Quest: Add and Search Words

> **Day 24** · [Design Add and Search Words Data Structure #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Design Add and Search Words Data Structure on LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Design Add and Search Words Data Structure #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Trie + Wildcard DFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie + Wildcard DFS

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small tree before reading the code:

```
        3
       / \
      9    20
          /  \
         15   7

Apply Trie + Wildcard DFS step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class WordDictionary {
    Trie* child[26]{};
    bool end = false;
public:
    WordDictionary() {}
    void addWord(string word) {
        WordDictionary* node = this;
        for (char c : word) {
            int i = c - 'a';
            if (!node->child[i]) node->child[i] = new WordDictionary();
            node = node->child[i];
        }
        node->end = true;
    }
    bool search(string word) {
        return dfs(word, 0, this);
    }
    bool dfs(const string& word, int i, WordDictionary* node) {
        if (!node) return false;
        if (i == (int)word.size()) return node->end;
        if (word[i] == '.') {
            for (int j = 0; j < 26; ++j)
                if (dfs(word, i + 1, node->child[j])) return true;
            return false;
        }
        return dfs(word, i + 1, node->child[word[i] - 'a']);
    }
};
```

### Python
```python
class WordDictionary:
    def __init__(self):
        self.children = {}
        self.end = False
    def addWord(self, word: str) -> None:
        node = self
        for c in word:
            node = node.children.setdefault(c, WordDictionary())
        node.end = True
    def search(self, word: str) -> bool:
        def dfs(i, node):
            if not node:
                return False
            if i == len(word):
                return node.end
            if word[i] == '.':
                return any(dfs(i + 1, ch) for ch in node.children.values())
            if word[i] not in node.children:
                return False
            return dfs(i + 1, node.children[word[i]])
        return dfs(0, self)
```

### Java
```java
class WordDictionary {
    WordDictionary[] child = new WordDictionary[26];
    boolean end;
    public void addWord(String word) {
        WordDictionary node = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (node.child[i] == null) node.child[i] = new WordDictionary();
            node = node.child[i];
        }
        node.end = true;
    }
    public boolean search(String word) {
        return dfs(word, 0, this);
    }
    boolean dfs(String word, int i, WordDictionary node) {
        if (node == null) return false;
        if (i == word.length()) return node.end;
        if (word.charAt(i) == '.') {
            for (WordDictionary c : node.child)
                if (c != null && dfs(word, i + 1, c)) return true;
            return false;
        }
        return dfs(word, i + 1, node.child[word.charAt(i) - 'a']);
    }
}
```

**Complexity:** O(m) add · O(26^m) search worst · O(n·m) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Trie + Wildcard DFS"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Trie + Wildcard DFS

---

*One quest down. The next one builds on this pattern. →*
