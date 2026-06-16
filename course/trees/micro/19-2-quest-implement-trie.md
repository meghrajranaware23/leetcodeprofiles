<!-- hand-authored -->
# ⚔ Quest: Implement Trie

> **Day 19** · [Implement Trie (Prefix Tree) #208](https://leetcode.com/problems/implement-trie-prefix-tree/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Implement Trie (Prefix Tree) on LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/)**

> ⚔ **Hunter's rule:** Draw the char-edge diagram from today's concept. Mark `isEnd` on word-ending nodes. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Implement Trie (Prefix Tree) #208](https://leetcode.com/problems/implement-trie-prefix-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Trie design** — each step follows a **character edge**; terminal node sets **`isEnd = true`**. `search` requires isEnd; `startsWith` only checks path exists.

If you're stuck after 5 minutes: 26-array or hash map per node; loop `for c in word: cur = cur.next[c]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie Design

**How to identify this from the problem statement:**
- Design class with insert / search / startsWith
- Prefix sharing implied
- Lowercase English letters → 26-array works

| Keyword / phrase | What it signals |
|---|---|
| "prefix tree" / "trie" | Char-edge nodes |
| "search word" | Walk + check isEnd |
| "starts with prefix" | Walk only — no isEnd required |
| "insert string" | Create edges + isEnd at end |

**Why this pattern works:** Shared prefixes share path — one path for `"cat"` and `"car"` through `"ca"`. isEnd distinguishes word vs prefix node.

**How a strong solver thinks before coding:**
1. *"Root empty node, no char."*
2. *"insert: walk/create edges, isEnd on last."*
3. *"search: any missing edge → false; else isEnd."*
4. *"startsWith: missing edge → false; else true."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **HashSet of all words only** | startsWith scans all — O(n·L) |
| **No isEnd flag** | Prefix nodes mistaken for words |
| **Store full strings at every node** | Defeats prefix compression |
| **Binary tree per string** | Wrong structure |

**The insight brute force misses:** Char edges compress shared prefixes; isEnd marks word boundaries.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Word Search II #212](https://leetcode.com/problems/word-search-ii/) | B-Rank test — trie + grid | Same insert + isEnd |
| [Design Add and Search #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | '.' wildcard | Trie walk + branching |
| [Replace Words #648](https://leetcode.com/problems/replace-words/) | Shortest prefix root | Early isEnd stop |

---

## 📖 Walkthrough

```
insert("apple"), insert("app")

        root
          |
          a → p → p → l → e (isEnd)
                  ↑
               isEnd ("app")

search("app")   → true  (isEnd at 3rd p)
search("ap")    → false (path exists, no isEnd)
startsWith("ap")→ true
```

> 💡 **The insight:** Nodes are prefixes; isEnd says "a dictionary word ends here."

---

## Solution

### C++
```cpp
class Trie {
    struct Node {
        Node* ch[26] = {};
        bool end = false;
    };
    Node* root;
public:
    Trie() : root(new Node()) {}
    void insert(string word) {
        Node* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (!cur->ch[i]) cur->ch[i] = new Node();
            cur = cur->ch[i];
        }
        cur->end = true;
    }
    bool search(string word) {
        Node* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (!cur->ch[i]) return false;
            cur = cur->ch[i];
        }
        return cur->end;
    }
    bool startsWith(string prefix) {
        Node* cur = root;
        for (char c : prefix) {
            int i = c - 'a';
            if (!cur->ch[i]) return false;
            cur = cur->ch[i];
        }
        return true;
    }
};
```

### Python
```python
class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.setdefault(c, {})
        node['#'] = True

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            if c not in node: return False
            node = node[c]
        return '#' in node

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node: return False
            node = node[c]
        return True
```

### Java
```java
class Trie {
    private Trie[] ch = new Trie[26];
    private boolean isEnd = false;
    public void insert(String word) {
        Trie cur = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) cur.ch[i] = new Trie();
            cur = cur.ch[i];
        }
        cur.isEnd = true;
    }
    public boolean search(String word) {
        Trie cur = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) return false;
            cur = cur.ch[i];
        }
        return cur.isEnd;
    }
    public boolean startsWith(String prefix) {
        Trie cur = this;
        for (char c : prefix.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) return false;
            cur = cur.ch[i];
        }
        return true;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Prefix tree"** → char edges, not binary.
- **"isEnd / '#'"** → word vs prefix node.
- **"search vs startsWith"** → isEnd check only on search.
- **"Shared prefix"** → one path for common start.

> 🎯 **Pattern Unlocked:** Trie Design

---

*One quest down. Next: N-ary depth — loop children, bubble max. →*
