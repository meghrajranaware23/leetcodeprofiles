<!-- hand-authored -->
# ⚔ Quest: Add and Search Words

> **Day 24** · [Design Add and Search Words Data Structure #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Design Add and Search Words Data Structure on LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)**

> ⚔ **Hunter's rule:** `addWord` is Day 19 insert. `search` with `'.'` = DFS branching at each dot. Trace `search(".a")` on a small trie before coding. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Design Add and Search Words Data Structure #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Trie + wildcard DFS** — letter moves to one child; `'.'` tries every existing child recursively.

If stuck: base case `i == len(word)` → return `node.isEnd`. Null node → false.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie + Wildcard DFS

**How to identify this from the problem statement:**
- "Add word" + "search word" → design class with trie backend
- `'.'` matches any letter → branching, not single path
- Lowercase a-z only → 26-array or hash children

| Keyword / phrase | What it signals |
|---|---|
| "add and search" | Insert + query on same structure |
| "'.' can match any letter" | DFS multi-branch at dot |
| "data structure design" | Separate addWord (path) from search (DFS) |
| Exact letters otherwise | Single-child descent |

**Why this pattern works:** Trie encodes all words sharing prefixes. Wildcard at position i asks "does **any** stored word match word[i+1:] from here?" — exactly one DFS level per character.

**How a strong solver thinks before coding:**
1. *"addWord = Day 19 insert to isEnd."*
2. *"search(word, i, node) recursive helper."*
3. *"c != '.': one child. c == '.': loop children."*
4. *"Return true on first successful branch."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all words in list, regex each search** | O(n × m) per query — no prefix sharing |
| **Wildcard: pick random child** | Must try all — one miss doesn't mean fail |
| **Build new trie per search** | Wasteful — persist one trie |
| **BFS instead of DFS on '.'** | Works but DFS is natural for word index walk |

**The insight brute force misses:** Trie prunes wildcard branches — only existing edges are explored, not all 26^k strings.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Implement Trie #208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Day 19 — no wildcard | Same insert |
| [Word Search II #212](https://leetcode.com/problems/word-search-ii/) | Grid + trie | DFS on both |
| [Regular Expression Matching #10](https://leetcode.com/problems/regular-expression-matching/) | Full regex | Harder — today's '.' is one char |

Same skeleton: trie node + conditional DFS.

---

## 📖 Walkthrough

**After addWord("bad"), addWord("dad"), addWord("mad"):**

```
search("pad")  → 'p' no child → false
search("bad")  → b→a→d→isEnd → true
search(".ad")  → dot at root → try b,d,m → each reaches a→d→end → true
search("b..")  → b→a→ dot at d leaf? only d child, dot at end → check isEnd
```

> 💡 **The insight:** Dot = OR over children. Letter = AND with single path.

---

## Solution

### C++
```cpp
class WordDictionary {
    struct Node {
        Node* ch[26] = {};
        bool end = false;
    };
    Node* root;
    bool search(const string& w, int i, Node* node) {
        if (!node) return false;
        if (i == (int)w.size()) return node->end;
        char c = w[i];
        if (c != '.') return search(w, i+1, node->ch[c-'a']);
        for (auto child : node->ch)
            if (search(w, i+1, child)) return true;
        return false;
    }
public:
    WordDictionary() : root(new Node()) {}
    void addWord(string word) {
        Node* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (!cur->ch[i]) cur->ch[i] = new Node();
            cur = cur->ch[i];
        }
        cur->end = true;
    }
    bool search(string word) { return search(word, 0, root); }
};
```

### Python
```python
class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.setdefault(c, {})
        node['#'] = True

    def search(self, word: str) -> bool:
        def dfs(node, i):
            if i == len(word): return '#' in node
            c = word[i]
            if c != '.':
                return c in node and dfs(node[c], i+1)
            return any(dfs(node[k], i+1) for k in node if k != '#')
        return dfs(self.root, 0)
```

### Java
```java
class WordDictionary {
    private WordDictionary[] ch = new WordDictionary[26];
    private boolean isEnd = false;
    public void addWord(String word) {
        WordDictionary cur = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) cur.ch[i] = new WordDictionary();
            cur = cur.ch[i];
        }
        cur.isEnd = true;
    }
    public boolean search(String word) { return search(word, 0); }
    private boolean search(String word, int idx) {
        if (idx == word.length()) return isEnd;
        char c = word.charAt(idx);
        if (c != '.') {
            int i = c - 'a';
            return ch[i] != null && ch[i].search(word, idx+1);
        }
        for (WordDictionary child : ch)
            if (child != null && child.search(word, idx+1)) return true;
        return false;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Word Dictionary"** → Day 19 trie + dot DFS.
- **"'.' at index i"** → try every non-null child for word[i+1:].
- **"addWord unchanged"** → standard insert.
- **"Return on first true branch"** → short-circuit OR.

If you linear-scanned a word list for search, refactor to trie + DFS.

> 🎯 **Pattern Unlocked:** Trie + wildcard DFS — dot branches, letter descends.

---

*One quest down. Next: greedy prefix replace. →*
