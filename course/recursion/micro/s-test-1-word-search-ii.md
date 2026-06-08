# ⚔ S-Rank Test — Problem 1

> [Word Search II #212](https://leetcode.com/problems/word-search-ii/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Word Search II on LeetCode](https://leetcode.com/problems/word-search-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Word Search II #212](https://leetcode.com/problems/word-search-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the S-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

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

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
