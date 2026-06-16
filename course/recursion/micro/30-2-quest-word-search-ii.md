<!-- hand-authored -->
# ⚔ Quest: Word Search II

> **Day 30** · [Word Search II #212](https://leetcode.com/problems/word-search-ii/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Search II on LeetCode](https://leetcode.com/problems/word-search-ii/)**

> ⚔ **Hunter's rule:** Day 16 mark/unmark + trie navigation. Trace finding `"oath"` and `"oathf"` on the classic board — watch shared `"oath"` prefix collapse in the trie.

---

## The Problem

Given an `m × n` board of characters and a list of strings `words`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells (horizontal or vertical). Same cell may not be used twice per word.

```
Input:  board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
        words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

Input:  board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
```

---

## 💡 Hints

**Hint 1:** Build a trie from all words. Each node stores optional `word` at terminal.

**Hint 2:** Outer loop: start dfs from every cell with `trie_root`.

**Hint 3:** Day 16 core: save char → mark `'#'` → 4 directions → restore char.

**Hint 4:** At each step: if `board[r][c]` not in current trie node → return (prefix prune). If node has word → add to result.

**Hint 5 (optimization):** Remove found word from trie node to avoid duplicates and prune dead branches.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie + Grid Backtracking (Day 16 + prefix tree)

| Clue | Signal |
|---|---|
| multiple words on grid | trie — not single-word DFS |
| adjacent cells, no reuse | mark/unmark (Day 16) |
| prefix shared across words | trie collapse |
| find all matching | collect at terminal nodes |

**Day 16 vs Day 30:**

| Word Search #79 | Word Search II #212 |
|---|---|
| one target word | dictionary of words |
| match `word[k]` explicitly | walk trie by board char |
| return on first find | collect all terminal hits |
| no trie | trie mandatory at scale |

**How a strong solver thinks before coding:**
1. *"Trie build first — O(total chars)."*
2. *"dfs(r,c,node) — node moves through trie, not k index."*
3. *"Mark/unmark identical to Day 16."*
4. *"No trie child → prune before dfs."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Run Word Search #79 per word** | O(words × m × n × 4^L) — TLE |
| **DFS without trie prune** | Explores paths that can't form any dictionary prefix |
| **Forget unmark** | `'#'` blocks valid cross-paths |
| **Global visited across starts** | Must unmark per path, not per search |

**The insight brute force misses:** Trie turns "is any word in the dictionary continuing with prefix `pre`?" into O(1) child lookup.

---

## 🔗 Same Pattern, Other Problems

| Problem | Twist |
|---|---|
| [Word Search #79](https://leetcode.com/problems/word-search/) | Single word (Day 16) |
| [Word Search II #212](https://leetcode.com/problems/word-search-ii/) | Trie + all words |
| [Design Add and Search Words #211](https://leetcode.com/problems/design-add-and-search-word-data-structure/) | Trie with wildcard search |

---

## 📖 Walkthrough

Classic board + `words = ["oath","pea","eat","rain"]`:

```
Board:          Trie (partial):
o a a n         root
e t a e          └─ o → a → t → h (word: "oath")
i h k r              └─ f (continues "oathf" if present)
i f l v          └─ e → a → t (word: "eat")
                 └─ p → e → a (word: "pea")
                 └─ r → a → i → n (word: "rain")
```

**Finding `"oath"` — start (1,1) = `'t'`? No — start (0,0) = `'o'`:**

```
dfs(0,0, root)
  board[0][0]='o' → trie child 'o' exists → node = root.o
  mark (0,0) '#'
  dfs(0,1, node.o): 'a' → node.o.a ✓ mark
    dfs(0,2, node.o.a): 'a' → dead (need 't' next, board has 'a') → backtrack
    dfs(1,1, node.o.a): 't' → node.o.a.t ✓ mark
      dfs(1,2, ...): 'a' ✓
        dfs(0,2,...): already '#' — skip
        dfs(2,1,...): 'h' ✓ → node.o.a.t.h has word="oath" → ADD ✓
      unmark each level...
```

**Finding `"eat"` — start (1,2) = `'a'` or trace from (1,1):**

```
dfs(1,1): 't' — not 'e', fail from here for "eat"
dfs(1,2): 'a' → trie 'e'.'a' needs 'e' first — try (1,1):
  (1,1) 't' — no. Start (0,3) 'n' — no.
  
Path for "eat": (1,2) via (1,1)? 
(1,1)='t' — wrong start.

Correct "eat" path:
(1,2)='a' — need prefix "e" first
(0,0)='o' — no
(1,0)='e' → trie.e ✓
  (1,1)='t' → trie.e.t — but 'a' needed not 't'

Actually: (1,0)='e' → (1,1)='t'? "et" not in trie as prefix to eat
(1,0)='e' → (0,1)='a' → trie.e.a ✓ → (1,2)='t' → trie.e.a.t = "eat" ✓ ADD
```

**Prefix prune example:** dfs reaches prefix `"oa"` on board but trie has no `'a'` child after `"o"` at that path → return immediately without exploring 4 directions.

**Shared prefix `"oath"` / `"oathf"`:** if both in dictionary, they share nodes `o→a→t→h`. At `'h'` node, collect `"oath"`. Continue to `'f'` child for `"oathf"`. One dfs path finds both.

---

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
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Day 16 grid dfs — mark/unmark unchanged."** → `'#'` enter, restore exit.
- **"Trie replaces word[k] index."** → node = prefix so far.
- **"No trie child → prune."** → don't dfs into dead prefixes.
- **"Collect at terminal, optionally pop word."** → dedupe + prune found words.

If you tried per-word Word Search first, that's fine — the breakthrough is **trie as the dfs state**, not a separate search per word.

> 🎯 **Pattern Unlocked:** Trie + Grid Backtracking

---

*One quest down. Next: N-Queens — full board generation. →*
