# ⚔ B-Rank Test — Problem 1

> [Word Search II #212](https://leetcode.com/problems/word-search-ii/) · Hard · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Word Search II on LeetCode](https://leetcode.com/problems/word-search-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Word Search II #212](https://leetcode.com/problems/word-search-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    struct TrieNode { TrieNode* child[26]{}; string* word = nullptr; };
    void insert(TrieNode* root, const string& w) {
        TrieNode* node = root;
        for (char c : w) {
            int i = c - 'a';
            if (!node->child[i]) node->child[i] = new TrieNode();
            node = node->child[i];
        }
        node->word = new string(w);
    }
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& res) {
        char ch = board[r][c];
        if (ch == '#' || !node->child[ch - 'a']) return;
        node = node->child[ch - 'a'];
        if (node->word) { res.push_back(*node->word); node->word = nullptr; }
        board[r][c] = '#';
        int dr[4] = {1,-1,0,0}, dc[4] = {0,0,1,-1};
        for (int k = 0; k < 4; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nc >= 0 && nr < (int)board.size() && nc < (int)board[0].size())
                dfs(board, nr, nc, node, res);
        }
        board[r][c] = ch;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) insert(root, w);
        vector<string> res;
        for (int r = 0; r < (int)board.size(); ++r)
            for (int c = 0; c < (int)board[0].size(); ++c)
                dfs(board, r, c, root, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        trie = {}
        for w in words:
            node = trie
            for c in w:
                node = node.setdefault(c, {})
            node['#'] = w
        rows, cols = len(board), len(board[0])
        res = []
        def dfs(r, c, node):
            ch = board[r][c]
            if ch not in node:
                return
            nxt = node[ch]
            if '#' in nxt:
                res.append(nxt['#'])
                del nxt['#']
            board[r][c] = '#'
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    dfs(nr, nc, nxt)
            board[r][c] = ch
        for r in range(rows):
            for c in range(cols):
                dfs(r, c, trie)
        return res
```

### Java
```java
class Solution {
    static class Trie { Trie[] child = new Trie[26]; String word; }
    public List<String> findWords(char[][] board, String[] words) {
        Trie root = new Trie();
        for (String w : words) {
            Trie node = root;
            for (char c : w.toCharArray()) {
                int i = c - 'a';
                if (node.child[i] == null) node.child[i] = new Trie();
                node = node.child[i];
            }
            node.word = w;
        }
        List<String> res = new ArrayList<>();
        for (int r = 0; r < board.length; r++)
            for (int c = 0; c < board[0].length; c++)
                dfs(board, r, c, root, res);
        return res;
    }
    void dfs(char[][] b, int r, int c, Trie node, List<String> res) {
        char ch = b[r][c];
        if (ch == '#' || node.child[ch - 'a'] == null) return;
        node = node.child[ch - 'a'];
        if (node.word != null) { res.add(node.word); node.word = null; }
        b[r][c] = '#';
        int[] dr = {1,-1,0,0}, dc = {0,0,1,-1};
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nc >= 0 && nr < b.length && nc < b[0].length)
                dfs(b, nr, nc, node, res);
        }
        b[r][c] = ch;
    }
}
```

**Complexity:** O(m·n·4^L) time · O(W·L) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
