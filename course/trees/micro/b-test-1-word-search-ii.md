<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 1

> [Word Search II #212](https://leetcode.com/problems/word-search-ii/) · Hard · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Word Search II on LeetCode](https://leetcode.com/problems/word-search-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Build the trie from Day 19, then DFS the grid following char edges. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Word Search II #212](https://leetcode.com/problems/word-search-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 19 **trie + grid DFS** — insert dictionary into trie with `isEnd`/word marker; from each cell, walk matching char edges; prune when trie has no edge; backtrack with visited mark.

- **Many words on board** → trie beats repeated single-word search.
- Build trie from `words`; store full word at terminal node for collection.
- DFS `(r,c,trieNode)`: if cell char missing from node → return; mark visited; on word end → push to result (dedupe/prune optional).
- Unmark cell after recursion — same backtrack as Word Search I.
- Start DFS from **every** cell — path can start anywhere.

**Pattern name before coding:** *Trie char edges + grid DFS with backtrack.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Find all words from dictionary on grid" → trie + DFS
- Multiple words → shared prefix compression in trie
- 4-direction movement + no reuse per path → `#` mark backtrack

**How a strong solver thinks before coding:**
1. *"Insert all words into trie — Day 19."*
2. *"For each (i,j), dfs(board, i, j, root)."*
3. *"Follow char edge; dead edge → prune."*
4. *"At word node → collect; optionally remove to prune duplicates."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Word Search I per word** | O(words · m · n · 4^L) — no prefix sharing |
| **HashSet of words only** | Can't prune partial paths |
| **No backtrack mark** | Reuses cell in same path |
| **Trie without word at end** | Can't collect matched strings |

---

## 🎯 Transfer to Unseen Problems

Same trie-from-Day-19 + grid/backtrack as Word Search I. If you mastered **Implement Trie #208**, this adds spatial DFS on top — the trie is the dictionary index, the grid is the search space.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    struct TrieNode {
        TrieNode* ch[26] = {};
        string word;
    };
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& res) {
        char ch = board[r][c];
        if (ch == '#' || !node->ch[ch-'a']) return;
        TrieNode* next = node->ch[ch-'a'];
        if (!next->word.empty()) { res.push_back(next->word); next->word = ""; }
        board[r][c] = '#';
        int m = board.size(), n = board[0].size();
        if (r>0)   dfs(board, r-1, c, next, res);
        if (r<m-1) dfs(board, r+1, c, next, res);
        if (c>0)   dfs(board, r, c-1, next, res);
        if (c<n-1) dfs(board, r, c+1, next, res);
        board[r][c] = ch;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) {
            TrieNode* cur = root;
            for (char c : w) {
                int i = c - 'a';
                if (!cur->ch[i]) cur->ch[i] = new TrieNode();
                cur = cur->ch[i];
            }
            cur->word = w;
        }
        int m = board.size(), n = board[0].size();
        vector<string> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dfs(board, i, j, root, res);
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
            for c in w: node = node.setdefault(c, {})
            node['#'] = w
        m, n = len(board), len(board[0])
        res = []
        def dfs(node, i, j):
            c = board[i][j]
            if c not in node: return
            nxt = node[c]
            if '#' in nxt: res.append(nxt.pop('#'))
            board[i][j] = '#'
            for di, dj in ((0,1),(0,-1),(1,0),(-1,0)):
                ni, nj = i+di, j+dj
                if 0<=ni<m and 0<=nj<n and board[ni][nj] != '#':
                    dfs(nxt, ni, nj)
            board[i][j] = c
        for i in range(m):
            for j in range(n): dfs(trie, i, j)
        return res
```

### Java
```java
class Solution {
    char[][] board;
    int m, n;
    public List<String> findWords(char[][] board, String[] words) {
        this.board = board; m = board.length; n = board[0].length;
        Map<Character, Object> root = new HashMap<>();
        for (String w : words) {
            Map<Character, Object> node = root;
            for (char c : w.toCharArray())
                node = (Map<Character,Object>) node.computeIfAbsent(c, k -> new HashMap<>());
            node.put('#', w);
        }
        Set<String> res = new HashSet<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dfs(root, i, j, res);
        return new ArrayList<>(res);
    }
    private void dfs(Map<Character,Object> node, int i, int j, Set<String> res) {
        if (i<0||i>=m||j<0||j>=n||board[i][j]=='#') return;
        char c = board[i][j];
        if (!node.containsKey(c)) return;
        Map<Character,Object> nxt = (Map<Character,Object>) node.get(c);
        if (nxt.containsKey('#')) res.add((String) nxt.get('#'));
        board[i][j] = '#';
        dfs(nxt,i+1,j,res); dfs(nxt,i-1,j,res);
        dfs(nxt,i,j+1,res); dfs(nxt,i,j-1,res);
        board[i][j] = c;
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Word Search II"** → Day 19 trie + grid DFS.
- **"Char edge missing"** → prune — trie's power.
- **"Backtrack `#` mark"** → same as Word Search I.
- **"Many words"** → trie prefix sharing.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    struct TrieNode {
        TrieNode* ch[26] = {};
        string word;
    };
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& res) {
        char ch = board[r][c];
        if (ch == '#' || !node->ch[ch-'a']) return;
        TrieNode* next = node->ch[ch-'a'];
        if (!next->word.empty()) { res.push_back(next->word); next->word = ""; }
        board[r][c] = '#';
        int m = board.size(), n = board[0].size();
        if (r>0)   dfs(board, r-1, c, next, res);
        if (r<m-1) dfs(board, r+1, c, next, res);
        if (c>0)   dfs(board, r, c-1, next, res);
        if (c<n-1) dfs(board, r, c+1, next, res);
        board[r][c] = ch;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) {
            TrieNode* cur = root;
            for (char c : w) {
                int i = c - 'a';
                if (!cur->ch[i]) cur->ch[i] = new TrieNode();
                cur = cur->ch[i];
            }
            cur->word = w;
        }
        int m = board.size(), n = board[0].size();
        vector<string> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dfs(board, i, j, root, res);
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
            for c in w: node = node.setdefault(c, {})
            node['#'] = w
        m, n = len(board), len(board[0])
        res = []
        def dfs(node, i, j):
            c = board[i][j]
            if c not in node: return
            nxt = node[c]
            if '#' in nxt: res.append(nxt.pop('#'))
            board[i][j] = '#'
            for di, dj in ((0,1),(0,-1),(1,0),(-1,0)):
                ni, nj = i+di, j+dj
                if 0<=ni<m and 0<=nj<n and board[ni][nj] != '#':
                    dfs(nxt, ni, nj)
            board[i][j] = c
        for i in range(m):
            for j in range(n): dfs(trie, i, j)
        return res
```

### Java
```java
class Solution {
    char[][] board;
    int m, n;
    public List<String> findWords(char[][] board, String[] words) {
        this.board = board; m = board.length; n = board[0].length;
        Map<Character, Object> root = new HashMap<>();
        for (String w : words) {
            Map<Character, Object> node = root;
            for (char c : w.toCharArray())
                node = (Map<Character,Object>) node.computeIfAbsent(c, k -> new HashMap<>());
            node.put('#', w);
        }
        Set<String> res = new HashSet<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dfs(root, i, j, res);
        return new ArrayList<>(res);
    }
    private void dfs(Map<Character,Object> node, int i, int j, Set<String> res) {
        if (i<0||i>=m||j<0||j>=n||board[i][j]=='#') return;
        char c = board[i][j];
        if (!node.containsKey(c)) return;
        Map<Character,Object> nxt = (Map<Character,Object>) node.get(c);
        if (nxt.containsKey('#')) res.add((String) nxt.get('#'));
        board[i][j] = '#';
        dfs(nxt,i+1,j,res); dfs(nxt,i-1,j,res);
        dfs(nxt,i,j+1,res); dfs(nxt,i,j-1,res);
        board[i][j] = c;
    }
}
```

**Complexity:** undefined
