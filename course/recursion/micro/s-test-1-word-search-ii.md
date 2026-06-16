<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 1

> [Word Search II #212](https://leetcode.com/problems/word-search-ii/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Word Search II on LeetCode](https://leetcode.com/problems/word-search-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Name **Trie + Grid Backtracking** before coding. Trace `"oath"` on the classic board with trie node transitions.

---

## The Problem

Given an `m × n` board of characters and a list of strings `words`, return all words on the board.

Each word must be formed from **sequentially adjacent** cells (horizontal or vertical). Same cell may not be used twice per word.

```
Input:  board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
        words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 30 capstone — Trie + Day 16 grid mark/unmark.

**Hint 1:** Build trie from all words. Terminal node stores the word (or marker).

**Hint 2:** Outer loop: `dfs(r, c, trie_root)` from every cell.

**Hint 3:** Day 16 rule unchanged: save char → `'#'` → 4 dirs → restore char.

**Hint 4:** If `board[r][c]` not in current trie node → return (prefix prune).

**Hint 5:** At terminal: collect word. Optional: remove from trie to dedupe and prune.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie + Grid Backtracking (Day 30)

| Clue | Signal |
|---|---|
| multiple words, one grid | trie — not per-word Word Search |
| adjacent, no reuse | mark/unmark (Day 16) |
| shared prefixes | trie path collapse |
| find all | collect at terminals |

**Decision tree route:** Backtrack → Grid → Trie prune.

**How a strong solver thinks before coding:**
1. *"Trie build — O(total chars)."*
2. *"dfs(r,c,node) — trie replaces word index k."*
3. *"No child → prune before exploring neighbors."*
4. *"Mark/unmark even when collecting words."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Word Search #79 per dictionary word** | O(words × grid × 4^L) — TLE |
| **DFS without trie** | Explores paths no dictionary word continues |
| **Forget unmark** | `'#'` blocks valid paths |
| **Separate visited[][] not cleared** | In-place mark/unmark per path |

**The insight brute force misses:** Trie converts prefix validity to O(1) child lookup — mandatory at S-Rank scale.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Return all words + count how many times each appears."*

Same trie+grid — increment counter at terminal instead of set dedupe.

**Scenario:** *"Grid with wildcards in dictionary words."*

Trie match with branching on `?` — grid core unchanged.

**30-second check:** *"Trie build, dfs(r,c,node), mark #, 4 dirs, unmark, collect at terminal."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    struct TrieNode { TrieNode* ch[26] = {}; string word; };
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
        vector<string> res;
        for (int i = 0; i < (int)board.size(); i++)
            for (int j = 0; j < (int)board[0].size(); j++)
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

**Complexity:** O(m · n · 4^L) time · O(total chars) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **Day 30 capstone** — Trie + grid, not per-word search.
- **Day 16 mark/unmark** — `'#'` on enter, restore on exit.
- **Trie node = dfs state** — replaces `word[k]` index.
- **Prefix prune** — no trie child → return immediately.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    struct TrieNode { TrieNode* ch[26] = {}; string word; };
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
        vector<string> res;
        for (int i = 0; i < (int)board.size(); i++)
            for (int j = 0; j < (int)board[0].size(); j++)
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

**Complexity:** O(m · n · 4^L) time · O(total chars) space
