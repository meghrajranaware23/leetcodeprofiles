# ⚔ Quest: Replace Words

> **Day 24** · [Replace Words #648](https://leetcode.com/problems/replace-words/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Replace Words on LeetCode](https://leetcode.com/problems/replace-words/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Replace Words #648](https://leetcode.com/problems/replace-words/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Trie Prefix Matching**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie Prefix Matching

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

Apply Trie Prefix Matching step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    struct TrieNode { unordered_map<char, TrieNode*> next; string word; };
    TrieNode* root = new TrieNode();
    void insert(const string& w) {
        TrieNode* node = root;
        for (char c : w) {
            if (!node->next.count(c)) node->next[c] = new TrieNode();
            node = node->next[c];
        }
        node->word = w;
    }
public:
    string replaceWords(vector<string>& dictionary, string sentence) {
        for (auto& w : dictionary) insert(w);
        stringstream ss(sentence);
        string tok, res;
        while (ss >> tok) {
            TrieNode* node = root;
            string prefix;
            for (char c : tok) {
                if (!node->next.count(c)) break;
                node = node->next[c];
                if (!node->word.empty()) { prefix = node->word; break; }
            }
            if (!res.empty()) res += ' ';
            res += prefix.empty() ? tok : prefix;
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        root = {}
        for w in dictionary:
            node = root
            for c in w:
                node = node.setdefault(c, {})
            node['#'] = w
        def prefix(word):
            node, path = root, ''
            for c in word:
                if c not in node:
                    return word
                path += c
                node = node[c]
                if '#' in node:
                    return node['#']
            return word
        return ' '.join(prefix(w) for w in sentence.split())
```

### Java
```java
class Solution {
    static class Trie { Map<Character, Trie> next = new HashMap<>(); String word; }
    public String replaceWords(List<String> dict, String sentence) {
        Trie root = new Trie();
        for (String w : dict) {
            Trie node = root;
            for (char c : w.toCharArray()) node = node.next.computeIfAbsent(c, k -> new Trie());
            node.word = w;
        }
        StringBuilder res = new StringBuilder();
        for (String tok : sentence.split(" ")) {
            if (res.length() > 0) res.append(' ');
            Trie node = root;
            String pref = null;
            for (char c : tok.toCharArray()) {
                if (!node.next.containsKey(c)) break;
                node = node.next.get(c);
                if (node.word != null) { pref = node.word; break; }
            }
            res.append(pref == null ? tok : pref);
        }
        return res.toString();
    }
}
```

**Complexity:** O(n·L + m) time · O(n·L) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Trie Prefix Matching"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Trie Prefix Matching

---

*Both quests complete. Head to the checkpoint. →*
