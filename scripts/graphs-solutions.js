export const SOLUTIONS = {
  127: {
    cpp: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        dict.erase(beginWord);
        while (!q.empty()) {
            auto [word, steps] = q.front(); q.pop();
            for (int i = 0; i < (int)word.size(); i++) {
                string nxt = word;
                for (char c = 'a'; c <= 'z'; c++) {
                    nxt[i] = c;
                    if (nxt == endWord) return steps + 1;
                    if (dict.count(nxt)) {
                        dict.erase(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        return 0;
    }
};`,
    python: `class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0
        q = deque([(beginWord, 1)])
        words.discard(beginWord)
        while q:
            word, steps = q.popleft()
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    nxt = word[:i] + c + word[i + 1:]
                    if nxt == endWord:
                        return steps + 1
                    if nxt in words:
                        words.remove(nxt)
                        q.append((nxt, steps + 1))
        return 0`,
    java: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(endWord)) return 0;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{beginWord, "1"});
        dict.remove(beginWord);
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            String word = cur[0];
            int steps = Integer.parseInt(cur[1]);
            char[] arr = word.toCharArray();
            for (int i = 0; i < arr.length; i++) {
                char old = arr[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    arr[i] = c;
                    String nxt = new String(arr);
                    if (nxt.equals(endWord)) return steps + 1;
                    if (dict.contains(nxt)) {
                        dict.remove(nxt);
                        q.offer(new String[]{nxt, String.valueOf(steps + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return 0;
    }
}`,
    complexity: 'O(n · m · 26) time · O(n · m) space',
  },
  130: {
    cpp: `class Solution {
    int m, n;
    void dfs(vector<vector<char>>& board, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] != 'O') return;
        board[r][c] = '#';
        dfs(board, r + 1, c); dfs(board, r - 1, c);
        dfs(board, r, c + 1); dfs(board, r, c - 1);
    }
public:
    void solve(vector<vector<char>>& board) {
        m = board.size(); if (!m) return;
        n = board[0].size();
        for (int i = 0; i < m; i++) {
            dfs(board, i, 0); dfs(board, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(board, 0, j); dfs(board, m - 1, j);
        }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                board[i][j] = board[i][j] == '#' ? 'O' : (board[i][j] == 'O' ? 'X' : board[i][j]);
    }
};`,
    python: `class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board: return
        m, n = len(board), len(board[0])
        def dfs(r, c):
            if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != 'O': return
            board[r][c] = '#'
            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
        for i in range(m):
            dfs(i, 0); dfs(i, n - 1)
        for j in range(n):
            dfs(0, j); dfs(m - 1, j)
        for i in range(m):
            for j in range(n):
                board[i][j] = 'O' if board[i][j] == '#' else ('X' if board[i][j] == 'O' else board[i][j])`,
    java: `class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) { dfs(board, i, 0); dfs(board, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(board, 0, j); dfs(board, m - 1, j); }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                board[i][j] = board[i][j] == '#' ? 'O' : (board[i][j] == 'O' ? 'X' : board[i][j]);
    }
    private void dfs(char[][] board, int r, int c) {
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != 'O') return;
        board[r][c] = '#';
        dfs(board, r + 1, c); dfs(board, r - 1, c);
        dfs(board, r, c + 1); dfs(board, r, c - 1);
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  133: {
    cpp: `class Solution {
    unordered_map<Node*, Node*> mp;
    Node* clone(Node* node) {
        if (!node) return nullptr;
        if (mp.count(node)) return mp[node];
        Node* copy = new Node(node->val);
        mp[node] = copy;
        for (Node* nei : node->neighbors)
            copy->neighbors.push_back(clone(nei));
        return copy;
    }
public:
    Node* cloneGraph(Node* node) { return clone(node); }
};`,
    python: `class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node: return None
        mp = {}
        def clone(n):
            if n in mp: return mp[n]
            copy = Node(n.val)
            mp[n] = copy
            for nei in n.neighbors:
                copy.neighbors.append(clone(nei))
            return copy
        return clone(node)`,
    java: `class Solution {
    private Map<Node, Node> mp = new HashMap<>();
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (mp.containsKey(node)) return mp.get(node);
        Node copy = new Node(node.val);
        mp.put(node, copy);
        for (Node nei : node.neighbors) copy.neighbors.add(cloneGraph(nei));
        return copy;
    }
}`,
    complexity: 'O(V + E) time · O(V) space',
  },
  200: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<char>>& g, int r, int c) {
        g[r][c] = '0';
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc] == '1')
                dfs(g, nr, nc);
        }
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        m = grid.size(); if (!m) return 0;
        n = grid[0].size();
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
        return count;
    }
};`,
    python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = '0'
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                    dfs(nr, nc)
        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(i, j)
        return count`,
    java: `class Solution {
    private int m, n;
    public int numIslands(char[][] grid) {
        m = grid.length; n = grid[0].length;
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        grid[r][c] = '0';
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == '1')
                dfs(grid, nr, nc);
        }
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  207: {
    cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indeg[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (!indeg[i]) q.push(i);
        int seen = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            seen++;
            for (int v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return seen == numCourses;
    }
};`,
    python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        indeg = [0] * numCourses
        for a, b in prerequisites:
            adj[b].append(a)
            indeg[a] += 1
        q = deque(i for i in range(numCourses) if indeg[i] == 0)
        seen = 0
        while q:
            u = q.popleft()
            seen += 1
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return seen == numCourses`,
    java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indeg[p[0]]++; }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.offer(i);
        int seen = 0;
        while (!q.isEmpty()) {
            int u = q.poll(); seen++;
            for (int v : adj.get(u)) if (--indeg[v] == 0) q.offer(v);
        }
        return seen == numCourses;
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  210: {
    cpp: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indeg[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (!indeg[i]) q.push(i);
        vector<int> order;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return (int)order.size() == numCourses ? order : vector<int>{};
    }
};`,
    python: `class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(numCourses)]
        indeg = [0] * numCourses
        for a, b in prerequisites:
            adj[b].append(a)
            indeg[a] += 1
        q = deque(i for i in range(numCourses) if indeg[i] == 0)
        order = []
        while q:
            u = q.popleft()
            order.append(u)
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return order if len(order) == numCourses else []`,
    java: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indeg[p[0]]++; }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.offer(i);
        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int u = q.poll(); order[idx++] = u;
            for (int v : adj.get(u)) if (--indeg[v] == 0) q.offer(v);
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  310: {
    cpp: `class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        vector<vector<int>> adj(n);
        vector<int> deg(n);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
            deg[e[0]]++; deg[e[1]]++;
        }
        queue<int> q;
        for (int i = 0; i < n; i++)
            if (deg[i] == 1) q.push(i);
        int rem = n;
        while (rem > 2) {
            int sz = q.size();
            rem -= sz;
            while (sz--) {
                int u = q.front(); q.pop();
                for (int v : adj[u])
                    if (--deg[v] == 1) q.push(v);
            }
        }
        vector<int> res;
        while (!q.empty()) { res.push_back(q.front()); q.pop(); }
        return res;
    }
};`,
    python: `class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1: return [0]
        adj = [[] for _ in range(n)]
        deg = [0] * n
        for a, b in edges:
            adj[a].append(b); adj[b].append(a)
            deg[a] += 1; deg[b] += 1
        q = deque(i for i in range(n) if deg[i] == 1)
        rem = n
        while rem > 2:
            sz = len(q)
            rem -= sz
            for _ in range(sz):
                u = q.popleft()
                for v in adj[u]:
                    deg[v] -= 1
                    if deg[v] == 1:
                        q.append(v)
        return list(q)`,
    java: `class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) return List.of(0);
        List<List<Integer>> adj = new ArrayList<>();
        int[] deg = new int[n];
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]);
            deg[e[0]]++; deg[e[1]]++;
        }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (deg[i] == 1) q.offer(i);
        int rem = n;
        while (rem > 2) {
            int sz = q.size(); rem -= sz;
            for (int i = 0; i < sz; i++) {
                int u = q.poll();
                for (int v : adj.get(u)) if (--deg[v] == 1) q.offer(v);
            }
        }
        return new ArrayList<>(q);
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  329: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int dfs(vector<vector<int>>& mat, vector<vector<int>>& dp, int r, int c) {
        if (dp[r][c]) return dp[r][c];
        int best = 1;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && mat[nr][nc] > mat[r][c])
                best = max(best, 1 + dfs(mat, dp, nr, nc));
        }
        return dp[r][c] = best;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size(); if (!m) return 0;
        n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n));
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = max(ans, dfs(matrix, dp, i, j));
        return ans;
    }
};`,
    python: `class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * n for _ in range(m)]
        def dfs(r, c):
            if dp[r][c]: return dp[r][c]
            best = 1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            dp[r][c] = best
            return best
        return max(dfs(i, j) for i in range(m) for j in range(n))`,
    java: `class Solution {
    private int m, n;
    private int[][] dp;
    public int longestIncreasingPath(int[][] matrix) {
        m = matrix.length; n = matrix[0].length;
        dp = new int[m][n];
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = Math.max(ans, dfs(matrix, i, j));
        return ans;
    }
    private int dfs(int[][] matrix, int r, int c) {
        if (dp[r][c] != 0) return dp[r][c];
        int best = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && matrix[nr][nc] > matrix[r][c])
                best = Math.max(best, 1 + dfs(matrix, nr, nc));
        }
        return dp[r][c] = best;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  332: {
    cpp: `class Solution {
    unordered_map<string, multiset<string>> g;
    vector<string> route;
    void visit(string u) {
        while (g[u].size()) {
            string v = *g[u].begin();
            g[u].erase(g[u].begin());
            visit(v);
        }
        route.push_back(u);
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& t : tickets) g[t[0]].insert(t[1]);
        visit("JFK");
        reverse(route.begin(), route.end());
        return route;
    }
};`,
    python: `class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        g = defaultdict(list)
        for a, b in tickets:
            g[a].append(b)
        for k in g:
            g[k].sort(reverse=True)
        route = []
        def visit(u):
            while g[u]:
                visit(g[u].pop())
            route.append(u)
        visit('JFK')
        return route[::-1]`,
    java: `class Solution {
    private Map<String, PriorityQueue<String>> g = new HashMap<>();
    private LinkedList<String> route = new LinkedList<>();
    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> t : tickets)
            g.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).offer(t.get(1));
        visit("JFK");
        return new ArrayList<>(route);
    }
    private void visit(String u) {
        PriorityQueue<String> pq = g.getOrDefault(u, new PriorityQueue<>());
        while (!pq.isEmpty()) visit(pq.poll());
        route.addFirst(u);
    }
}`,
    complexity: 'O(E log E) time · O(E) space',
  },
  399: {
    cpp: `class Solution {
    unordered_map<string, unordered_map<string, double>> g;
    bool dfs(string& cur, string& target, unordered_set<string>& vis, double val, double& ans) {
        if (cur == target) { ans = val; return true; }
        vis.insert(cur);
        for (auto& [nxt, w] : g[cur])
            if (!vis.count(nxt) && dfs(nxt, target, vis, val * w, ans))
                return true;
        vis.erase(cur);
        return false;
    }
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        for (int i = 0; i < (int)equations.size(); i++) {
            g[equations[i][0]][equations[i][1]] = values[i];
            g[equations[i][1]][equations[i][0]] = 1.0 / values[i];
        }
        vector<double> res;
        for (auto& q : queries) {
            if (!g.count(q[0]) || !g.count(q[1])) { res.push_back(-1.0); continue; }
            unordered_set<string> vis;
            double ans = -1.0;
            dfs(q[0], q[1], vis, 1.0, ans);
            res.push_back(ans);
        }
        return res;
    }
};`,
    python: `class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        g = defaultdict(dict)
        for (a, b), v in zip(equations, values):
            g[a][b] = v
            g[b][a] = 1 / v
        def dfs(cur, target, vis, val):
            if cur == target: return val
            vis.add(cur)
            for nxt, w in g[cur].items():
                if nxt not in vis:
                    res = dfs(nxt, target, vis, val * w)
                    if res != -1: return res
            vis.remove(cur)
            return -1
        out = []
        for a, b in queries:
            if a not in g or b not in g:
                out.append(-1.0)
            else:
                out.append(dfs(a, b, set(), 1.0))
        return out`,
    java: `class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Map<String, Double>> g = new HashMap<>();
        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0), b = equations.get(i).get(1);
            g.computeIfAbsent(a, k -> new HashMap<>()).put(b, values[i]);
            g.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1.0 / values[i]);
        }
        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String a = queries.get(i).get(0), b = queries.get(i).get(1);
            if (!g.containsKey(a) || !g.containsKey(b)) res[i] = -1.0;
            else res[i] = dfs(g, a, b, new HashSet<>(), 1.0);
        }
        return res;
    }
    private double dfs(Map<String, Map<String, Double>> g, String cur, String target, Set<String> vis, double val) {
        if (cur.equals(target)) return val;
        vis.add(cur);
        for (var e : g.get(cur).entrySet())
            if (!vis.contains(e.getKey())) {
                double ans = dfs(g, e.getKey(), target, vis, val * e.getValue());
                if (ans != -1) return ans;
            }
        vis.remove(cur);
        return -1;
    }
}`,
    complexity: 'O(Q · (V + E)) time · O(V + E) space',
  },
  417: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& reach, int r, int c) {
        reach[r][c] = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && !reach[nr][nc] && h[nr][nc] >= h[r][c])
                dfs(h, reach, nr, nc);
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        m = heights.size(); n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n)), atl(m, vector<bool>(n));
        for (int i = 0; i < m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m - 1, j); }
        vector<vector<int>> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
        return res;
    }
};`,
    python: `class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])
        pac, atl = set(), set()
        def dfs(r, c, seen, prev):
            if (r, c) in seen or r < 0 or c < 0 or r >= m or c >= n or heights[r][c] < prev:
                return
            seen.add((r, c))
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                dfs(r + dr, c + dc, seen, heights[r][c])
        for i in range(m):
            dfs(i, 0, pac, heights[i][0]); dfs(i, n - 1, atl, heights[i][n - 1])
        for j in range(n):
            dfs(0, j, pac, heights[0][j]); dfs(m - 1, j, atl, heights[m - 1][j])
        return [[i, j] for i in range(m) for j in range(n) if (i, j) in pac and (i, j) in atl]`,
    java: `class Solution {
    private int m, n;
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        m = heights.length; n = heights[0].length;
        boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];
        for (int i = 0; i < m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m - 1, j); }
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j]) res.add(List.of(i, j));
        return res;
    }
    private void dfs(int[][] h, boolean[][] reach, int r, int c) {
        reach[r][c] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && !reach[nr][nc] && h[nr][nc] >= h[r][c])
                dfs(h, reach, nr, nc);
        }
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  433: {
    cpp: `class Solution {
public:
    int minMutation(string startGene, string endGene, vector<string>& bank) {
        unordered_set<string> dict(bank.begin(), bank.end());
        if (!dict.count(endGene)) return -1;
        queue<pair<string, int>> q;
        q.push({startGene, 0});
        dict.erase(startGene);
        string genes = "ACGT";
        while (!q.empty()) {
            auto [gene, steps] = q.front(); q.pop();
            for (int i = 0; i < 8; i++) {
                string nxt = gene;
                for (char c : genes) {
                    nxt[i] = c;
                    if (nxt == endGene) return steps + 1;
                    if (dict.count(nxt)) {
                        dict.erase(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        words = set(bank)
        if endGene not in words: return -1
        q = deque([(startGene, 0)])
        words.discard(startGene)
        genes = 'ACGT'
        while q:
            gene, steps = q.popleft()
            for i in range(8):
                for c in genes:
                    nxt = gene[:i] + c + gene[i + 1:]
                    if nxt == endGene: return steps + 1
                    if nxt in words:
                        words.remove(nxt)
                        q.append((nxt, steps + 1))
        return -1`,
    java: `class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        Set<String> dict = new HashSet<>(Arrays.asList(bank));
        if (!dict.contains(endGene)) return -1;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{startGene, "0"});
        dict.remove(startGene);
        char[] genes = {'A','C','G','T'};
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            String gene = cur[0];
            int steps = Integer.parseInt(cur[1]);
            char[] arr = gene.toCharArray();
            for (int i = 0; i < 8; i++) {
                char old = arr[i];
                for (char c : genes) {
                    arr[i] = c;
                    String nxt = new String(arr);
                    if (nxt.equals(endGene)) return steps + 1;
                    if (dict.contains(nxt)) {
                        dict.remove(nxt);
                        q.offer(new String[]{nxt, String.valueOf(steps + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return -1;
    }
}`,
    complexity: 'O(n · 8 · 4) time · O(n) space',
  },
  463: {
    cpp: `class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), peri = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) {
                    peri += 4;
                    if (i > 0 && grid[i-1][j]) peri -= 2;
                    if (j > 0 && grid[i][j-1]) peri -= 2;
                }
        return peri;
    }
};`,
    python: `class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        peri = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j]:
                    peri += 4
                    if i > 0 and grid[i - 1][j]: peri -= 2
                    if j > 0 and grid[i][j - 1]: peri -= 2
        return peri`,
    java: `class Solution {
    public int islandPerimeter(int[][] grid) {
        int m = grid.length, n = grid[0].length, peri = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) {
                    peri += 4;
                    if (i > 0 && grid[i - 1][j] == 1) peri -= 2;
                    if (j > 0 && grid[i][j - 1] == 1) peri -= 2;
                }
        return peri;
    }
}`,
    complexity: 'O(m · n) time · O(1) space',
  },
  542: {
    cpp: `class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        queue<pair<int,int>> q;
        vector<vector<int>> dist(m, vector<int>(n, -1));
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (!mat[i][j]) { q.push({i,j}); dist[i][j] = 0; }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return dist;
    }
};`,
    python: `class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        dist = [[-1] * n for _ in range(m)]
        q = deque()
        for i in range(m):
            for j in range(n):
                if mat[i][j] == 0:
                    dist[i][j] = 0
                    q.append((i, j))
        while q:
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))
        return dist`,
    java: `class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[][] dist = new int[m][n];
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (mat[i][j] == 0) { dist[i][j] = 0; q.offer(new int[]{i, j}); }
                else dist[i][j] = -1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return dist;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  547: {
    cpp: `class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (isConnected[i][j]) unite(i, j);
        int comps = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) comps++;
        return comps;
    }
};`,
    python: `class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            ra, rb = find(a), find(b)
            if ra != rb: p[rb] = ra
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j]:
                    unite(i, j)
        return sum(find(i) == i for i in range(n))`,
    java: `class Solution {
    private int[] p, r;
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        p = new int[n]; r = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (isConnected[i][j] == 1) unite(i, j);
        int comps = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) comps++;
        return comps;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) { int t = a; a = b; b = t; }
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
}`,
    complexity: 'O(n² · α(n)) time · O(n) space',
  },
  684: {
    cpp: `class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        p.resize(n + 1); r.assign(n + 1, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges)
            if (!unite(e[0], e[1])) return e;
        return {};
    }
};`,
    python: `class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        p = list(range(n + 1))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra == rb: return [a, b]
            p[rb] = ra
        return []`,
    java: `class Solution {
    private int[] p;
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        p = new int[n + 1];
        for (int i = 0; i <= n; i++) p[i] = i;
        for (int[] e : edges) {
            if (!unite(e[0], e[1])) return e;
        }
        return new int[0];
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private boolean unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        p[b] = a;
        return true;
    }
}`,
    complexity: 'O(n · α(n)) time · O(n) space',
  },
  695: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        int area = 1;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc])
                area += dfs(g, nr, nc);
        }
        return area;
    }
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        int best = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) best = max(best, dfs(grid, i, j));
        return best;
    }
};`,
    python: `class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            area = 1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc]:
                    area += dfs(nr, nc)
            return area
        return max((dfs(i, j) for i in range(m) for j in range(n) if grid[i][j]), default=0)`,
    java: `class Solution {
    private int m, n;
    public int maxAreaOfIsland(int[][] grid) {
        m = grid.length; n = grid[0].length;
        int best = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) best = Math.max(best, dfs(grid, i, j));
        return best;
    }
    private int dfs(int[][] grid, int r, int c) {
        grid[r][c] = 0;
        int area = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1)
                area += dfs(grid, nr, nc);
        }
        return area;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  721: {
    cpp: `class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string, string> owner;
        unordered_map<string, int> id;
        int n = 0;
        for (auto& acc : accounts) {
            owner[acc[1]] = acc[0];
            for (int i = 1; i < (int)acc.size(); i++) {
                if (!id.count(acc[i])) id[acc[i]] = n++;
            }
        }
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& acc : accounts)
            for (int i = 2; i < (int)acc.size(); i++)
                unite(id[acc[1]], id[acc[i]]);
        unordered_map<int, set<string>> groups;
        for (auto& [email, idx] : id)
            groups[find(idx)].insert(email);
        vector<vector<string>> res;
        for (auto& [root, emails] : groups) {
            vector<string> row = {owner[*emails.begin()]};
            for (auto& e : emails) row.push_back(e);
            res.push_back(row);
        }
        return res;
    }
};`,
    python: `class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        owner = {}
        p = {}
        def find(x):
            p.setdefault(x, x)
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]
        def unite(a, b):
            p[find(b)] = find(a)
        for acc in accounts:
            owner[acc[1]] = acc[0]
            for i in range(1, len(acc)):
                if i > 1:
                    unite(acc[1], acc[i])
        groups = defaultdict(set)
        for acc in accounts:
            for i in range(1, len(acc)):
                groups[find(acc[i])].add(acc[i])
        return [[owner[next(iter(emails))]] + sorted(emails) for emails in groups.values()]`,
    java: `class Solution {
    private Map<String, String> owner = new HashMap<>();
    private Map<String, String> parent = new HashMap<>();
    private String find(String x) {
        parent.putIfAbsent(x, x);
        if (!parent.get(x).equals(x)) parent.put(x, find(parent.get(x)));
        return parent.get(x);
    }
    private void unite(String a, String b) { parent.put(find(b), find(a)); }
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        for (List<String> acc : accounts) {
            owner.put(acc.get(1), acc.get(0));
            for (int i = 2; i < acc.size(); i++) unite(acc.get(1), acc.get(i));
        }
        Map<String, TreeSet<String>> groups = new HashMap<>();
        for (List<String> acc : accounts)
            for (int i = 1; i < acc.size(); i++)
                groups.computeIfAbsent(find(acc.get(i)), k -> new TreeSet<>()).add(acc.get(i));
        List<List<String>> res = new ArrayList<>();
        for (var e : groups.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(owner.get(e.getValue().first()));
            row.addAll(e.getValue());
            res.add(row);
        }
        return res;
    }
}`,
    complexity: 'O(n · k · α(n) + n · k log k) time · O(n · k) space',
  },
  733: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<int>>& img, int r, int c, int src, int color) {
        if (r < 0 || c < 0 || r >= m || c >= n || img[r][c] != src) return;
        img[r][c] = color;
        for (auto& d : dirs) dfs(img, r + d[0], c + d[1], src, color);
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        m = image.size(); n = image[0].size();
        int src = image[sr][sc];
        if (src != color) dfs(image, sr, sc, src, color);
        return image;
    }
};`,
    python: `class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        src = image[sr][sc]
        if src == color: return image
        m, n = len(image), len(image[0])
        def dfs(r, c):
            if r < 0 or c < 0 or r >= m or c >= n or image[r][c] != src: return
            image[r][c] = color
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                dfs(r + dr, c + dc)
        dfs(sr, sc)
        return image`,
    java: `class Solution {
    private int m, n;
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        m = image.length; n = image[0].length;
        int src = image[sr][sc];
        if (src != color) dfs(image, sr, sc, src, color);
        return image;
    }
    private void dfs(int[][] image, int r, int c, int src, int color) {
        if (r < 0 || c < 0 || r >= m || c >= n || image[r][c] != src) return;
        image[r][c] = color;
        dfs(image, r + 1, c, src, color); dfs(image, r - 1, c, src, color);
        dfs(image, r, c + 1, src, color); dfs(image, r, c - 1, src, color);
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  743: {
    cpp: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int,int>>> adj(n + 1);
        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        pq.push({0, k});
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto [v, w] : adj[u])
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++) ans = max(ans, dist[i]);
        return ans == INT_MAX ? -1 : ans;
    }
};`,
    python: `class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v, w in times:
            adj[u].append((v, w))
        dist = [float('inf')] * (n + 1)
        dist[k] = 0
        pq = [(0, k)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]: continue
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))
        ans = max(dist[1:])
        return -1 if ans == float('inf') else ans`,
    java: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<int[]>[] adj = new List[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();
        for (int[] t : times) adj[t[0]].add(new int[]{t[1], t[2]});
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, k});
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            if (cur[0] > dist[cur[1]]) continue;
            for (int[] e : adj[cur[1]]) {
                int nd = cur[0] + e[1];
                if (nd < dist[e[0]]) {
                    dist[e[0]] = nd;
                    pq.offer(new int[]{nd, e[0]});
                }
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}`,
    complexity: 'O((V + E) log V) time · O(V + E) space',
  },
  752: {
    cpp: `class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end());
        if (dead.count("0000")) return -1;
        queue<pair<string, int>> q;
        q.push({"0000", 0});
        unordered_set<string> vis = {"0000"};
        while (!q.empty()) {
            auto [cur, steps] = q.front(); q.pop();
            if (cur == target) return steps;
            for (int i = 0; i < 4; i++) {
                for (int d : {-1, 1}) {
                    string nxt = cur;
                    int digit = (nxt[i] - '0' + d + 10) % 10;
                    nxt[i] = digit + '0';
                    if (!vis.count(nxt) && !dead.count(nxt)) {
                        vis.insert(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        dead = set(deadends)
        if '0000' in dead: return -1
        q = deque([('0000', 0)])
        vis = {'0000'}
        while q:
            cur, steps = q.popleft()
            if cur == target: return steps
            for i in range(4):
                for d in (-1, 1):
                    nxt = cur[:i] + str((int(cur[i]) + d) % 10) + cur[i + 1:]
                    if nxt not in vis and nxt not in dead:
                        vis.add(nxt)
                        q.append((nxt, steps + 1))
        return -1`,
    java: `class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> dead = new HashSet<>(Arrays.asList(deadends));
        if (dead.contains("0000")) return -1;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{"0000", "0"});
        Set<String> vis = new HashSet<>();
        vis.add("0000");
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            if (cur[0].equals(target)) return Integer.parseInt(cur[1]);
            char[] arr = cur[0].toCharArray();
            for (int i = 0; i < 4; i++) {
                char old = arr[i];
                for (int d : new int[]{-1, 1}) {
                    arr[i] = (char) ('0' + (arr[i] - '0' + d + 10) % 10);
                    String nxt = new String(arr);
                    if (!vis.contains(nxt) && !dead.contains(nxt)) {
                        vis.add(nxt);
                        q.offer(new String[]{nxt, String.valueOf(Integer.parseInt(cur[1]) + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return -1;
    }
}`,
    complexity: 'O(10⁴) time · O(10⁴) space',
  },
  778: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool can(vector<vector<int>>& g, int t) {
        if (g[0][0] > t) return false;
        vector<vector<bool>> vis(m, vector<bool>(n));
        queue<pair<int,int>> q;
        q.push({0,0}); vis[0][0] = true;
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            if (r == m - 1 && c == n - 1) return true;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && !vis[nr][nc] && g[nr][nc] <= t) {
                    vis[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
        return false;
    }
public:
    int swimInWater(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        int lo = max(grid[0][0], grid[m-1][n-1]), hi = 0;
        for (auto& row : grid) for (int v : row) hi = max(hi, v);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(grid, mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};`,
    python: `class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def can(t):
            if grid[0][0] > t: return False
            vis = set()
            q = deque([(0, 0)])
            vis.add((0, 0))
            while q:
                r, c = q.popleft()
                if r == m - 1 and c == n - 1: return True
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in vis and grid[nr][nc] <= t:
                        vis.add((nr, nc)); q.append((nr, nc))
            return False
        lo, hi = max(grid[0][0], grid[-1][-1]), max(max(row) for row in grid)
        while lo < hi:
            mid = (lo + hi) // 2
            if can(mid): hi = mid
            else: lo = mid + 1
        return lo`,
    java: `class Solution {
    private int m, n;
    public int swimInWater(int[][] grid) {
        m = grid.length; n = grid[0].length;
        int lo = Math.max(grid[0][0], grid[m - 1][n - 1]), hi = 0;
        for (int[] row : grid) for (int v : row) hi = Math.max(hi, v);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(grid, mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
    private boolean can(int[][] grid, int t) {
        if (grid[0][0] > t) return false;
        boolean[][] vis = new boolean[m][n];
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0}); vis[0][0] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == m - 1 && cur[1] == n - 1) return true;
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && !vis[nr][nc] && grid[nr][nc] <= t) {
                    vis[nr][nc] = true; q.offer(new int[]{nr, nc});
                }
            }
        }
        return false;
    }
}`,
    complexity: 'O(n² log n) time · O(n²) space',
  },
  785: {
    cpp: `class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] != -1) continue;
            queue<int> q;
            q.push(i); color[i] = 0;
            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : graph[u]) {
                    if (color[v] == -1) {
                        color[v] = color[u] ^ 1;
                        q.push(v);
                    } else if (color[v] == color[u]) return false;
                }
            }
        }
        return true;
    }
};`,
    python: `class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        color = [-1] * n
        for i in range(n):
            if color[i] != -1: continue
            q = deque([i])
            color[i] = 0
            while q:
                u = q.popleft()
                for v in graph[u]:
                    if color[v] == -1:
                        color[v] = color[u] ^ 1
                        q.append(v)
                    elif color[v] == color[u]:
                        return False
        return True`,
    java: `class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] != -1) continue;
            Queue<Integer> q = new ArrayDeque<>();
            q.offer(i); color[i] = 0;
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : graph[u]) {
                    if (color[v] == -1) { color[v] = color[u] ^ 1; q.offer(v); }
                    else if (color[v] == color[u]) return false;
                }
            }
        }
        return true;
    }
}`,
    complexity: 'O(V + E) time · O(V) space',
  },
  787: {
    cpp: `class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            vector<int> tmp = dist;
            for (auto& f : flights) {
                int u = f[0], v = f[1], w = f[2];
                if (dist[u] != INT_MAX && dist[u] + w < tmp[v])
                    tmp[v] = dist[u] + w;
            }
            dist = tmp;
        }
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};`,
    python: `class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[src] = 0
        for _ in range(k + 1):
            tmp = dist[:]
            for u, v, w in flights:
                if dist[u] != float('inf') and dist[u] + w < tmp[v]:
                    tmp[v] = dist[u] + w
            dist = tmp
        return -1 if dist[dst] == float('inf') else dist[dst]`,
    java: `class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            int[] tmp = dist.clone();
            for (int[] f : flights) {
                if (dist[f[0]] != Integer.MAX_VALUE && dist[f[0]] + f[2] < tmp[f[1]])
                    tmp[f[1]] = dist[f[0]] + f[2];
            }
            dist = tmp;
        }
        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }
}`,
    complexity: 'O(k · E) time · O(n) space',
  },
  797: {
    cpp: `class Solution {
    vector<vector<int>> adj, path, cur;
    void dfs(int u, int target) {
        cur.push_back(u);
        if (u == target) path.push_back(cur);
        else for (int v : adj[u]) dfs(v, target);
        cur.pop_back();
    }
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        int n = graph.size();
        adj = graph;
        dfs(0, n - 1);
        return path;
    }
};`,
    python: `class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        target = len(graph) - 1
        res, cur = [], []
        def dfs(u):
            cur.append(u)
            if u == target:
                res.append(cur[:])
            else:
                for v in graph[u]:
                    dfs(v)
            cur.pop()
        dfs(0)
        return res`,
    java: `class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> cur = new ArrayList<>();
    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        dfs(graph, 0, graph.length - 1);
        return res;
    }
    private void dfs(int[][] graph, int u, int target) {
        cur.add(u);
        if (u == target) res.add(new ArrayList<>(cur));
        else for (int v : graph[u]) dfs(graph, v, target);
        cur.remove(cur.size() - 1);
    }
}`,
    complexity: 'O(2^n · n) time · O(n) space',
  },
  802: {
    cpp: `class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<vector<int>> rev(n);
        vector<int> outdeg(n);
        for (int u = 0; u < n; u++)
            for (int v : graph[u]) {
                rev[v].push_back(u);
                outdeg[u]++;
            }
        queue<int> q;
        vector<bool> safe(n);
        for (int i = 0; i < n; i++)
            if (!outdeg[i]) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            safe[u] = true;
            for (int p : rev[u])
                if (--outdeg[p] == 0) q.push(p);
        }
        vector<int> res;
        for (int i = 0; i < n; i++) if (safe[i]) res.push_back(i);
        return res;
    }
};`,
    python: `class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        rev = [[] for _ in range(n)]
        outdeg = [0] * n
        for u in range(n):
            for v in graph[u]:
                rev[v].append(u)
                outdeg[u] += 1
        q = deque(i for i in range(n) if outdeg[i] == 0)
        safe = [False] * n
        while q:
            u = q.popleft()
            safe[u] = True
            for p in rev[u]:
                outdeg[p] -= 1
                if outdeg[p] == 0:
                    q.append(p)
        return [i for i in range(n) if safe[i]]`,
    java: `class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        List<List<Integer>> rev = new ArrayList<>();
        int[] outdeg = new int[n];
        for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
        for (int u = 0; u < n; u++)
            for (int v : graph[u]) { rev.get(v).add(u); outdeg[u]++; }
        Queue<Integer> q = new ArrayDeque<>();
        boolean[] safe = new boolean[n];
        for (int i = 0; i < n; i++) if (outdeg[i] == 0) q.offer(i);
        while (!q.isEmpty()) {
            int u = q.poll(); safe[u] = true;
            for (int p : rev.get(u)) if (--outdeg[p] == 0) q.offer(p);
        }
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) if (safe[i]) res.add(i);
        return res;
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  841: {
    cpp: `class Solution {
    void dfs(vector<vector<int>>& rooms, int u, vector<bool>& vis) {
        vis[u] = true;
        for (int v : rooms[u]) if (!vis[v]) dfs(rooms, v, vis);
    }
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
        vector<bool> vis(rooms.size());
        dfs(rooms, 0, vis);
        for (bool v : vis) if (!v) return false;
        return true;
    }
};`,
    python: `class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        vis = [False] * len(rooms)
        def dfs(u):
            vis[u] = True
            for v in rooms[u]:
                if not vis[v]:
                    dfs(v)
        dfs(0)
        return all(vis)`,
    java: `class Solution {
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        boolean[] vis = new boolean[rooms.size()];
        dfs(rooms, 0, vis);
        for (boolean v : vis) if (!v) return false;
        return true;
    }
    private void dfs(List<List<Integer>> rooms, int u, boolean[] vis) {
        vis[u] = true;
        for (int v : rooms.get(u)) if (!vis[v]) dfs(rooms, v, vis);
    }
}`,
    complexity: 'O(V + E) time · O(V) space',
  },
  847: {
    cpp: `class Solution {
public:
    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size();
        if (n == 1) return 0;
        queue<tuple<int,int,int>> q;
        vector<vector<int>> dist(n, vector<int>(1 << n, -1));
        for (int i = 0; i < n; i++) {
            int mask = 1 << i;
            q.push({i, mask, 0});
            dist[i][mask] = 0;
        }
        while (!q.empty()) {
            auto [u, mask, d] = q.front(); q.pop();
            for (int v : graph[u]) {
                int nmask = mask | (1 << v);
                if (nmask == (1 << n) - 1) return d + 1;
                if (dist[v][nmask] == -1) {
                    dist[v][nmask] = d + 1;
                    q.push({v, nmask, d + 1});
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def shortestPathLength(self, graph: List[List[int]]) -> int:
        n = len(graph)
        if n == 1: return 0
        full = (1 << n) - 1
        q = deque()
        dist = [[-1] * (1 << n) for _ in range(n)]
        for i in range(n):
            mask = 1 << i
            q.append((i, mask, 0))
            dist[i][mask] = 0
        while q:
            u, mask, d = q.popleft()
            for v in graph[u]:
                nmask = mask | (1 << v)
                if nmask == full: return d + 1
                if dist[v][nmask] == -1:
                    dist[v][nmask] = d + 1
                    q.append((v, nmask, d + 1))
        return -1`,
    java: `class Solution {
    public int shortestPathLength(int[][] graph) {
        int n = graph.length;
        if (n == 1) return 0;
        int full = (1 << n) - 1;
        int[][] dist = new int[n][1 << n];
        for (int[] row : dist) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            int mask = 1 << i;
            q.offer(new int[]{i, mask, 0});
            dist[i][mask] = 0;
        }
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int v : graph[cur[0]]) {
                int nmask = cur[1] | (1 << v);
                if (nmask == full) return cur[2] + 1;
                if (dist[v][nmask] == -1) {
                    dist[v][nmask] = cur[2] + 1;
                    q.offer(new int[]{v, nmask, cur[2] + 1});
                }
            }
        }
        return -1;
    }
}`,
    complexity: 'O(n² · 2^n) time · O(n · 2^n) space',
  },
  851: {
    cpp: `class Solution {
    vector<vector<int>> adj;
    vector<int> quiet, ans;
    int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj[u]) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
        int n = quiet.size();
        this->quiet = quiet;
        adj.assign(n, {});
        for (auto& r : richer) adj[r[1]].push_back(r[0]);
        ans.assign(n, -1);
        vector<int> res(n);
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
};`,
    python: `class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        n = len(quiet)
        adj = [[] for _ in range(n)]
        for a, b in richer:
            adj[b].append(a)
        memo = {}
        def dfs(u):
            if u in memo: return memo[u]
            best = u
            for v in adj[u]:
                cand = dfs(v)
                if quiet[cand] < quiet[best]:
                    best = cand
            memo[u] = best
            return best
        return [dfs(i) for i in range(n)]`,
    java: `class Solution {
    private List<List<Integer>> adj;
    private int[] quiet, ans;
    public int[] loudAndRich(int[][] richer, int[] quiet) {
        int n = quiet.length;
        this.quiet = quiet;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : richer) adj.get(r[1]).add(r[0]);
        ans = new int[n];
        Arrays.fill(ans, -1);
        int[] res = new int[n];
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
    private int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj.get(u)) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
}`,
    complexity: 'O(n + E) time · O(n) space',
  },
  886: {
    cpp: `class Solution {
    vector<int> color;
    bool dfs(vector<vector<int>>& g, int u, int c) {
        color[u] = c;
        for (int v : g[u]) {
            if (color[v] == -1) { if (!dfs(g, v, c ^ 1)) return false; }
            else if (color[v] == color[u]) return false;
        }
        return true;
    }
public:
    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
        vector<vector<int>> g(n + 1);
        for (auto& d : dislikes) { g[d[0]].push_back(d[1]); g[d[1]].push_back(d[0]); }
        color.assign(n + 1, -1);
        for (int i = 1; i <= n; i++)
            if (color[i] == -1 && !dfs(g, i, 0)) return false;
        return true;
    }
};`,
    python: `class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        g = [[] for _ in range(n + 1)]
        for a, b in dislikes:
            g[a].append(b); g[b].append(a)
        color = [-1] * (n + 1)
        def dfs(u, c):
            color[u] = c
            for v in g[u]:
                if color[v] == -1:
                    if not dfs(v, c ^ 1): return False
                elif color[v] == color[u]:
                    return False
            return True
        return all(dfs(i, 0) for i in range(1, n + 1) if color[i] == -1)`,
    java: `class Solution {
    private int[] color;
    public boolean possibleBipartition(int n, int[][] dislikes) {
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i <= n; i++) g.add(new ArrayList<>());
        for (int[] d : dislikes) { g.get(d[0]).add(d[1]); g.get(d[1]).add(d[0]); }
        color = new int[n + 1];
        Arrays.fill(color, -1);
        for (int i = 1; i <= n; i++)
            if (color[i] == -1 && !dfs(g, i, 0)) return false;
        return true;
    }
    private boolean dfs(List<List<Integer>> g, int u, int c) {
        color[u] = c;
        for (int v : g.get(u)) {
            if (color[v] == -1) { if (!dfs(g, v, c ^ 1)) return false; }
            else if (color[v] == color[u]) return false;
        }
        return true;
    }
}`,
    complexity: 'O(n + E) time · O(n + E) space',
  },
  909: {
    cpp: `class Solution {
public:
    int snakesAndLadders(vector<vector<int>>& board) {
        int n = board.size();
        auto label = [&](int s) {
            int r = (s - 1) / n, c = (s - 1) % n;
            if (r % 2) c = n - 1 - c;
            return make_pair(n - 1 - r, c);
        };
        vector<int> dist(n * n + 1, -1);
        queue<int> q;
        q.push(1); dist[1] = 0;
        while (!q.empty()) {
            int s = q.front(); q.pop();
            if (s == n * n) return dist[s];
            for (int d = 1; d <= 6; d++) {
                int ns = s + d;
                if (ns > n * n) break;
                auto [r, c] = label(ns);
                if (board[r][c] != -1) ns = board[r][c];
                if (dist[ns] == -1) { dist[ns] = dist[s] + 1; q.push(ns); }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        def label(s):
            r, c = divmod(s - 1, n)
            if r % 2: c = n - 1 - c
            return n - 1 - r, c
        dist = [-1] * (n * n + 1)
        q = deque([1])
        dist[1] = 0
        while q:
            s = q.popleft()
            if s == n * n: return dist[s]
            for d in range(1, 7):
                ns = s + d
                if ns > n * n: break
                r, c = label(ns)
                if board[r][c] != -1: ns = board[r][c]
                if dist[ns] == -1:
                    dist[ns] = dist[s] + 1
                    q.append(ns)
        return -1`,
    java: `class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        int[] dist = new int[n * n + 1];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(1); dist[1] = 0;
        while (!q.isEmpty()) {
            int s = q.poll();
            if (s == n * n) return dist[s];
            for (int d = 1; d <= 6; d++) {
                int ns = s + d;
                if (ns > n * n) break;
                int r = (ns - 1) / n, c = (ns - 1) % n;
                if (r % 2 == 1) c = n - 1 - c;
                r = n - 1 - r;
                if (board[r][c] != -1) ns = board[r][c];
                if (dist[ns] == -1) { dist[ns] = dist[s] + 1; q.offer(ns); }
            }
        }
        return -1;
    }
}`,
    complexity: 'O(n²) time · O(n²) space',
  },
  934: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void mark(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 2;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc] == 1)
                mark(g, nr, nc);
        }
    }
public:
    int shortestBridge(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        queue<pair<int,int>> q;
        bool found = false;
        for (int i = 0; i < m && !found; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { mark(grid, i, j); found = true; break; }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.push({i, j});
        int steps = 0;
        while (!q.empty()) {
            int sz = q.size();
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] == 2) continue;
                    if (grid[nr][nc] == 1) return steps;
                    grid[nr][nc] = 2;
                    q.push({nr, nc});
                }
            }
            steps++;
        }
        return -1;
    }
};`,
    python: `class Solution:
    def shortestBridge(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def mark(r, c):
            grid[r][c] = 2
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    mark(nr, nc)
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    mark(i, j)
                    break
            else: continue
            break
        q = deque((i, j) for i in range(m) for j in range(n) if grid[i][j] == 2)
        steps = 0
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != 2:
                        if grid[nr][nc] == 1: return steps
                        grid[nr][nc] = 2
                        q.append((nr, nc))
            steps += 1
        return -1`,
    java: `class Solution {
    private int m, n;
    public int shortestBridge(int[][] grid) {
        m = grid.length; n = grid[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        outer:
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { mark(grid, i, j); break outer; }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.offer(new int[]{i, j});
        int steps = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] == 2) continue;
                    if (grid[nr][nc] == 1) return steps;
                    grid[nr][nc] = 2;
                    q.offer(new int[]{nr, nc});
                }
            }
            steps++;
        }
        return -1;
    }
    private void mark(int[][] grid, int r, int c) {
        grid[r][c] = 2;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1)
                mark(grid, nr, nc);
        }
    }
}`,
    complexity: 'O(n²) time · O(n²) space',
  },
  990: {
    cpp: `class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(char a, char b) { p[find(a)] = find(b); }
public:
    bool equationsPossible(vector<string>& equations) {
        p.resize(26);
        iota(p.begin(), p.end(), 0);
        for (auto& e : equations)
            if (e[1] == '=') unite(e[0] - 'a', e[3] - 'a');
        for (auto& e : equations)
            if (e[1] == '!' && find(e[0] - 'a') == find(e[3] - 'a')) return false;
        return true;
    }
};`,
    python: `class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        p = list(range(26))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for e in equations:
            if e[1] == '=':
                p[find(ord(e[0]) - 97)] = find(ord(e[3]) - 97)
        return all(find(ord(e[0]) - 97) != find(ord(e[3]) - 97) for e in equations if e[1] == '!')`,
    java: `class Solution {
    private int[] p;
    public boolean equationsPossible(String[] equations) {
        p = new int[26];
        for (int i = 0; i < 26; i++) p[i] = i;
        for (String e : equations)
            if (e.charAt(1) == '=') unite(e.charAt(0) - 'a', e.charAt(3) - 'a');
        for (String e : equations)
            if (e.charAt(1) == '!' && find(e.charAt(0) - 'a') == find(e.charAt(3) - 'a'))
                return false;
        return true;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(a)] = find(b); }
}`,
    complexity: 'O(n · α(26)) time · O(1) space',
  },
  994: {
    cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), fresh = 0;
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
        int mins = 0, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty() && fresh) {
            int sz = q.size();
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
            mins++;
        }
        return fresh ? -1 : mins;
    }
};`,
    python: `class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 2: q.append((i, j))
                elif grid[i][j] == 1: fresh += 1
        mins = 0
        while q and fresh:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
            mins += 1
        return -1 if fresh else mins`,
    java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length, fresh = 0;
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.offer(new int[]{i, j});
                else if (grid[i][j] == 1) fresh++;
        int mins = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty() && fresh > 0) {
            int sz = q.size();
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
            mins++;
        }
        return fresh > 0 ? -1 : mins;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  997: {
    cpp: `class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
        vector<int> in(n + 1), out(n + 1);
        for (auto& t : trust) { out[t[0]]++; in[t[1]]++; }
        for (int i = 1; i <= n; i++)
            if (in[i] == n - 1 && !out[i]) return i;
        return -1;
    }
};`,
    python: `class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        indeg = [0] * (n + 1)
        outdeg = [0] * (n + 1)
        for a, b in trust:
            outdeg[a] += 1
            indeg[b] += 1
        for i in range(1, n + 1):
            if indeg[i] == n - 1 and outdeg[i] == 0:
                return i
        return -1`,
    java: `class Solution {
    public int findJudge(int n, int[][] trust) {
        int[] in = new int[n + 1], out = new int[n + 1];
        for (int[] t : trust) { out[t[0]]++; in[t[1]]++; }
        for (int i = 1; i <= n; i++)
            if (in[i] == n - 1 && out[i] == 0) return i;
        return -1;
    }
}`,
    complexity: 'O(E) time · O(n) space',
  },
  1020: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc])
                dfs(g, nr, nc);
        }
    }
public:
    int numEnclaves(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++) { dfs(grid, i, 0); dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(grid, 0, j); dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) count += grid[i][j];
        return count;
    }
};`,
    python: `class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc]:
                    dfs(nr, nc)
        for i in range(m):
            dfs(i, 0); dfs(i, n - 1)
        for j in range(n):
            dfs(0, j); dfs(m - 1, j)
        return sum(sum(row) for row in grid)`,
    java: `class Solution {
    private int m, n;
    public int numEnclaves(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++) { dfs(grid, i, 0); dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(grid, 0, j); dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) count += grid[i][j];
        return count;
    }
    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        grid[r][c] = 0;
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1042: {
    cpp: `class Solution {
public:
    vector<int> gardenNoAdj(int n, vector<vector<int>>& paths) {
        vector<vector<int>> adj(n);
        for (auto& p : paths) {
            adj[p[0] - 1].push_back(p[1] - 1);
            adj[p[1] - 1].push_back(p[0] - 1);
        }
        vector<int> ans(n);
        for (int i = 0; i < n; i++) {
            vector<bool> used(5);
            for (int nei : adj[i]) used[ans[nei]] = true;
            for (int c = 1; c <= 4; c++)
                if (!used[c]) { ans[i] = c; break; }
        }
        return ans;
    }
};`,
    python: `class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for a, b in paths:
            adj[a - 1].append(b - 1)
            adj[b - 1].append(a - 1)
        ans = [0] * n
        for i in range(n):
            used = {ans[nei] for nei in adj[i]}
            for c in range(1, 5):
                if c not in used:
                    ans[i] = c
                    break
        return ans`,
    java: `class Solution {
    public int[] gardenNoAdj(int n, int[][] paths) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] p : paths) {
            adj.get(p[0] - 1).add(p[1] - 1);
            adj.get(p[1] - 1).add(p[0] - 1);
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            boolean[] used = new boolean[5];
            for (int nei : adj.get(i)) used[ans[nei]] = true;
            for (int c = 1; c <= 4; c++)
                if (!used[c]) { ans[i] = c; break; }
        }
        return ans;
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  1061: {
    cpp: `class Solution {
    vector<int> p;
    char find(char x) { return p[x - 'a'] == x ? x : p[x - 'a'] = find(p[x - 'a']); }
    void unite(char a, char b) {
        char ra = find(a), rb = find(b);
        if (ra < rb) p[rb - 'a'] = ra;
        else p[ra - 'a'] = rb;
    }
public:
    string smallestEquivalentString(string s1, string s2, string baseStr) {
        p.resize(26);
        iota(p.begin(), p.end(), 'a');
        for (int i = 0; i < (int)s1.size(); i++) unite(s1[i], s2[i]);
        string res;
        for (char c : baseStr) res.push_back(find(c));
        return res;
    }
};`,
    python: `class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        p = list('abcdefghijklmnopqrstuvwxyz')
        def find(x):
            if p[ord(x) - 97] != x:
                p[ord(x) - 97] = find(p[ord(x) - 97])
            return p[ord(x) - 97]
        def unite(a, b):
            ra, rb = find(a), find(b)
            if ra < rb: p[ord(rb) - 97] = ra
            else: p[ord(ra) - 97] = rb
        for a, b in zip(s1, s2):
            unite(a, b)
        return ''.join(find(c) for c in baseStr)`,
    java: `class Solution {
    private char[] p;
    public String smallestEquivalentString(String s1, String s2, String baseStr) {
        p = new char[26];
        for (int i = 0; i < 26; i++) p[i] = (char) ('a' + i);
        for (int i = 0; i < s1.length(); i++) unite(s1.charAt(i), s2.charAt(i));
        StringBuilder sb = new StringBuilder();
        for (char c : baseStr.toCharArray()) sb.append(find(c));
        return sb.toString();
    }
    private char find(char x) {
        if (p[x - 'a'] != x) p[x - 'a'] = find(p[x - 'a']);
        return p[x - 'a'];
    }
    private void unite(char a, char b) {
        char ra = find(a), rb = find(b);
        if (ra < rb) p[rb - 'a'] = ra;
        else p[ra - 'a'] = rb;
    }
}`,
    complexity: 'O((n + m) · α(26)) time · O(1) space',
  },
  1091: {
    cpp: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] || grid[n-1][n-1]) return -1;
        if (n == 1) return 1;
        queue<pair<int,int>> q;
        q.push({0,0});
        grid[0][0] = 1;
        int dirs[8][2] = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        int steps = 1;
        while (!q.empty()) {
            int sz = q.size();
            steps++;
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc]) continue;
                    if (nr == n - 1 && nc == n - 1) return steps;
                    grid[nr][nc] = 1;
                    q.push({nr, nc});
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        n = len(grid)
        if grid[0][0] or grid[-1][-1]: return -1
        if n == 1: return 1
        q = deque([(0, 0)])
        grid[0][0] = 1
        steps = 0
        dirs = [(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]
        while q:
            steps += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and not grid[nr][nc]:
                        if nr == n - 1 and nc == n - 1: return steps
                        grid[nr][nc] = 1
                        q.append((nr, nc))
        return -1`,
    java: `class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        if (n == 1) return 1;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        grid[0][0] = 1;
        int steps = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        while (!q.isEmpty()) {
            int sz = q.size();
            steps++;
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] == 1) continue;
                    if (nr == n - 1 && nc == n - 1) return steps;
                    grid[nr][nc] = 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return -1;
    }
}`,
    complexity: 'O(n²) time · O(n²) space',
  },
  1129: {
    cpp: `class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<pair<int,int>>> adj(n);
        for (auto& e : redEdges) adj[e[0]].push_back({e[1], 0});
        for (auto& e : blueEdges) adj[e[0]].push_back({e[1], 1});
        vector<vector<int>> dist(n, vector<int>(2, -1));
        queue<tuple<int,int,int>> q;
        q.push({0, -1, 0});
        dist[0][0] = dist[0][1] = 0;
        while (!q.empty()) {
            auto [u, prev, d] = q.front(); q.pop();
            for (auto [v, color] : adj[u]) {
                if (color == prev) continue;
                if (dist[v][color] == -1) {
                    dist[v][color] = d + 1;
                    q.push({v, color, d + 1});
                }
            }
        }
        vector<int> ans(n);
        for (int i = 0; i < n; i++) {
            if (dist[i][0] == -1 && dist[i][1] == -1) ans[i] = -1;
            else if (dist[i][0] == -1) ans[i] = dist[i][1];
            else if (dist[i][1] == -1) ans[i] = dist[i][0];
            else ans[i] = min(dist[i][0], dist[i][1]);
        }
        return ans;
    }
};`,
    python: `class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in redEdges: adj[u].append((v, 0))
        for u, v in blueEdges: adj[u].append((v, 1))
        dist = [[-1, -1] for _ in range(n)]
        q = deque([(0, -1, 0)])
        dist[0][0] = dist[0][1] = 0
        while q:
            u, prev, d = q.popleft()
            for v, color in adj[u]:
                if color == prev: continue
                if dist[v][color] == -1:
                    dist[v][color] = d + 1
                    q.append((v, color, d + 1))
        ans = []
        for i in range(n):
            if dist[i][0] == -1 and dist[i][1] == -1: ans.append(-1)
            elif dist[i][0] == -1: ans.append(dist[i][1])
            elif dist[i][1] == -1: ans.append(dist[i][0])
            else: ans.append(min(dist[i][0], dist[i][1]))
        return ans`,
    java: `class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<int[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : redEdges) adj[e[0]].add(new int[]{e[1], 0});
        for (int[] e : blueEdges) adj[e[0]].add(new int[]{e[1], 1});
        int[][] dist = new int[n][2];
        for (int[] row : dist) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, -1, 0});
        dist[0][0] = dist[0][1] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] e : adj[cur[0]]) {
                if (e[1] == cur[1]) continue;
                if (dist[e[0]][e[1]] == -1) {
                    dist[e[0]][e[1]] = cur[2] + 1;
                    q.offer(new int[]{e[0], e[1], cur[2] + 1});
                }
            }
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            if (dist[i][0] == -1 && dist[i][1] == -1) ans[i] = -1;
            else if (dist[i][0] == -1) ans[i] = dist[i][1];
            else if (dist[i][1] == -1) ans[i] = dist[i][0];
            else ans[i] = Math.min(dist[i][0], dist[i][1]);
        }
        return ans;
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  1162: {
    cpp: `class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) q.push({i, j});
        if (q.empty() || (int)q.size() == m * n) return -1;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}}, dist = -1;
        while (!q.empty()) {
            int sz = q.size();
            dist++;
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && !grid[nr][nc]) {
                        grid[nr][nc] = 1;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return dist;
    }
};`,
    python: `class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque((i, j) for i in range(m) for j in range(n) if grid[i][j])
        if not q or len(q) == m * n: return -1
        dist = -1
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not grid[nr][nc]:
                        grid[nr][nc] = 1
                        q.append((nr, nc))
            dist += 1
        return dist`,
    java: `class Solution {
    public int maxDistance(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) q.offer(new int[]{i, j});
        if (q.isEmpty() || q.size() == m * n) return -1;
        int dist = -1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int sz = q.size();
            dist++;
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
        }
        return dist;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1192: {
    cpp: `class Solution {
    vector<vector<int>> adj;
    vector<int> disc, low;
    vector<vector<int>> res;
    int timer = 0;
    void dfs(int u, int parent) {
        disc[u] = low[u] = ++timer;
        for (int v : adj[u]) {
            if (!disc[v]) {
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] > disc[u]) res.push_back({u, v});
            } else if (v != parent) {
                low[u] = min(low[u], disc[v]);
            }
        }
    }
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        adj.resize(n);
        for (auto& c : connections) {
            adj[c[0]].push_back(c[1]);
            adj[c[1]].push_back(c[0]);
        }
        disc.assign(n, 0);
        low.assign(n, 0);
        for (int i = 0; i < n; i++)
            if (!disc[i]) dfs(i, -1);
        return res;
    }
};`,
    python: `class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v); adj[v].append(u)
        disc = [0] * n
        low = [0] * n
        res = []
        timer = 0
        def dfs(u, parent):
            nonlocal timer
            timer += 1
            disc[u] = low[u] = timer
            for v in adj[u]:
                if not disc[v]:
                    dfs(v, u)
                    low[u] = min(low[u], low[v])
                    if low[v] > disc[u]:
                        res.append(sorted([u, v]))
                elif v != parent:
                    low[u] = min(low[u], disc[v])
        for i in range(n):
            if not disc[i]:
                dfs(i, -1)
        return res`,
    java: `class Solution {
    private List<List<Integer>> adj;
    private int[] disc, low;
    private int timer = 0;
    private List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (List<Integer> c : connections) {
            adj.get(c.get(0)).add(c.get(1));
            adj.get(c.get(1)).add(c.get(0));
        }
        disc = new int[n];
        low = new int[n];
        for (int i = 0; i < n; i++)
            if (disc[i] == 0) dfs(i, -1);
        return res;
    }
    private void dfs(int u, int parent) {
        disc[u] = low[u] = ++timer;
        for (int v : adj.get(u)) {
            if (disc[v] == 0) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) res.add(List.of(u, v));
            } else if (v != parent) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  1202: {
    cpp: `class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(a)] = find(b); }
public:
    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
        int n = s.size();
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& pr : pairs) unite(pr[0], pr[1]);
        vector<string> buckets(n);
        for (int i = 0; i < n; i++) buckets[find(i)].push_back(s[i]);
        for (auto& b : buckets) sort(b.rbegin(), b.rend());
        string res(n, ' ');
        for (int i = 0; i < n; i++) {
            int root = find(i);
            res[i] = buckets[root].back();
            buckets[root].pop_back();
        }
        return res;
    }
};`,
    python: `class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        n = len(s)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        for a, b in pairs:
            unite(a, b)
        buckets = defaultdict(list)
        for i, ch in enumerate(s):
            buckets[find(i)].append(ch)
        for b in buckets.values():
            b.sort(reverse=True)
        res = []
        for i in range(n):
            root = find(i)
            res.append(buckets[root].pop())
        return ''.join(res)`,
    java: `class Solution {
    private int[] p;
    public String smallestStringWithSwaps(String s, int[][] pairs) {
        int n = s.length();
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] pr : pairs) unite(pr[0], pr[1]);
        List<List<Character>> buckets = new ArrayList<>();
        for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
        for (int i = 0; i < n; i++) buckets.get(find(i)).add(s.charAt(i));
        for (List<Character> b : buckets) b.sort(Collections.reverseOrder());
        char[] res = new char[n];
        for (int i = 0; i < n; i++) {
            int root = find(i);
            res[i] = buckets.get(root).remove(buckets.get(root).size() - 1);
        }
        return new String(res);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(a)] = find(b); }
}`,
    complexity: 'O(n log n + k · α(n)) time · O(n) space',
  },
  1254: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        bool closed = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) closed = false;
            else if (g[nr][nc]) closed &= dfs(g, nr, nc);
        }
        return closed;
    }
public:
    int closedIsland(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++) { if (grid[i][0]) dfs(grid, i, 0); if (grid[i][n-1]) dfs(grid, i, n-1); }
        for (int j = 0; j < n; j++) { if (grid[0][j]) dfs(grid, 0, j); if (grid[m-1][j]) dfs(grid, m-1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] && dfs(grid, i, j)) count++;
        return count;
    }
};`,
    python: `class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            closed = True
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if nr < 0 or nc < 0 or nr >= m or nc >= n:
                    closed = False
                elif grid[nr][nc]:
                    closed &= dfs(nr, nc)
            return closed
        for i in range(m):
            if grid[i][0]: dfs(i, 0)
            if grid[i][n - 1]: dfs(i, n - 1)
        for j in range(n):
            if grid[0][j]: dfs(0, j)
            if grid[m - 1][j]: dfs(m - 1, j)
        return sum(1 for i in range(m) for j in range(n) if grid[i][j] and dfs(i, j))`,
    java: `class Solution {
    private int m, n;
    public int closedIsland(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++) { if (grid[i][0] == 1) dfs(grid, i, 0); if (grid[i][n - 1] == 1) dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { if (grid[0][j] == 1) dfs(grid, 0, j); if (grid[m - 1][j] == 1) dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1 && dfsClosed(grid, i, j)) count++;
        return count;
    }
    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        grid[r][c] = 0;
        dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
    private boolean dfsClosed(int[][] grid, int r, int c) {
        grid[r][c] = 0;
        boolean closed = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) closed = false;
            else if (grid[nr][nc] == 1) closed &= dfsClosed(grid, nr, nc);
        }
        return closed;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1293: {
    cpp: `class Solution {
public:
    int shortestPath(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<vector<bool>>> vis(m, vector<vector<bool>>(n, vector<bool>(k + 1)));
        queue<tuple<int,int,int,int>> q;
        q.push({0, 0, k, 0});
        vis[0][0][k] = true;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r, c, rem, d] = q.front(); q.pop();
            if (r == m - 1 && c == n - 1) return d;
            for (auto& dr : dirs) {
                int nr = r + dr[0], nc = c + dr[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int nrem = rem - grid[nr][nc];
                if (nrem < 0 || vis[nr][nc][nrem]) continue;
                vis[nr][nc][nrem] = true;
                q.push({nr, nc, nrem, d + 1});
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        vis = [[[False] * (k + 1) for _ in range(n)] for _ in range(m)]
        q = deque([(0, 0, k, 0)])
        vis[0][0][k] = True
        while q:
            r, c, rem, d = q.popleft()
            if r == m - 1 and c == n - 1: return d
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    nrem = rem - grid[nr][nc]
                    if nrem >= 0 and not vis[nr][nc][nrem]:
                        vis[nr][nc][nrem] = True
                        q.append((nr, nc, nrem, d + 1))
        return -1`,
    java: `class Solution {
    public int shortestPath(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;
        boolean[][][] vis = new boolean[m][n][k + 1];
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0, k, 0});
        vis[0][0][k] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == m - 1 && cur[1] == n - 1) return cur[3];
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int nrem = cur[2] - grid[nr][nc];
                if (nrem < 0 || vis[nr][nc][nrem]) continue;
                vis[nr][nc][nrem] = true;
                q.offer(new int[]{nr, nc, nrem, cur[3] + 1});
            }
        }
        return -1;
    }
}`,
    complexity: 'O(m · n · k) time · O(m · n · k) space',
  },
  1306: {
    cpp: `class Solution {
public:
    bool canReach(vector<int>& arr, int start) {
        int n = arr.size();
        vector<bool> vis(n);
        queue<int> q;
        q.push(start);
        vis[start] = true;
        while (!q.empty()) {
            int i = q.front(); q.pop();
            if (!arr[i]) return true;
            for (int nxt : {i + arr[i], i - arr[i]}) {
                if (nxt >= 0 && nxt < n && !vis[nxt]) {
                    vis[nxt] = true;
                    q.push(nxt);
                }
            }
        }
        return false;
    }
};`,
    python: `class Solution:
    def canReach(self, arr: List[int], start: int) -> bool:
        n = len(arr)
        vis = [False] * n
        q = deque([start])
        vis[start] = True
        while q:
            i = q.popleft()
            if arr[i] == 0: return True
            for nxt in (i + arr[i], i - arr[i]):
                if 0 <= nxt < n and not vis[nxt]:
                    vis[nxt] = True
                    q.append(nxt)
        return False`,
    java: `class Solution {
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(start); vis[start] = true;
        while (!q.isEmpty()) {
            int i = q.poll();
            if (arr[i] == 0) return true;
            for (int nxt : new int[]{i + arr[i], i - arr[i]}) {
                if (nxt >= 0 && nxt < n && !vis[nxt]) {
                    vis[nxt] = true;
                    q.offer(nxt);
                }
            }
        }
        return false;
    }
}`,
    complexity: 'O(n) time · O(n) space',
  },
  1311: {
    cpp: `class Solution {
public:
    vector<vector<string>> watchedVideosByFriends(vector<vector<string>>& watchedVideos, vector<vector<int>>& friends, int id, int level) {
        int n = watchedVideos.size();
        vector<vector<int>> adj(n);
        for (auto& f : friends) {
            adj[f[0]].push_back(f[1]);
            adj[f[1]].push_back(f[0]);
        }
        vector<bool> vis(n);
        queue<int> q;
        q.push(id); vis[id] = true;
        while (level-- && !q.empty()) {
            int sz = q.size();
            while (sz--) {
                int u = q.front(); q.pop();
                for (int v : adj[u])
                    if (!vis[v]) { vis[v] = true; q.push(v); }
            }
        }
        map<string, int> freq;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& v : watchedVideos[u]) freq[v]++;
        }
        vector<pair<string,int>> items(freq.begin(), freq.end());
        sort(items.begin(), items.end());
        vector<vector<string>> res;
        for (auto& p : items) res.push_back({p.first});
        return res;
    }
};`,
    python: `class Solution:
    def watchedVideosByFriends(self, watchedVideos: List[List[str]], friends: List[List[int]], id: int, level: int) -> List[List[str]]:
        n = len(watchedVideos)
        adj = [[] for _ in range(n)]
        for a, b in friends:
            adj[a].append(b); adj[b].append(a)
        vis = [False] * n
        q = deque([id])
        vis[id] = True
        for _ in range(level):
            for _ in range(len(q)):
                u = q.popleft()
                for v in adj[u]:
                    if not vis[v]:
                        vis[v] = True
                        q.append(v)
        freq = Counter()
        for u in q:
            freq.update(watchedVideos[u])
        return [[v] for v, _ in sorted(freq.items())]`,
    java: `class Solution {
    public List<List<String>> watchedVideosByFriends(List<List<String>> watchedVideos, int[][] friends, int id, int level) {
        int n = watchedVideos.size();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] f : friends) { adj.get(f[0]).add(f[1]); adj.get(f[1]).add(f[0]); }
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(id); vis[id] = true;
        for (int l = 0; l < level; l++) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                int u = q.poll();
                for (int v : adj.get(u))
                    if (!vis[v]) { vis[v] = true; q.offer(v); }
            }
        }
        Map<String, Integer> freq = new TreeMap<>();
        for (int u : q)
            for (String v : watchedVideos.get(u))
                freq.merge(v, 1, Integer::sum);
        List<List<String>> res = new ArrayList<>();
        for (String v : freq.keySet()) res.add(List.of(v));
        return res;
    }
}`,
    complexity: 'O(n + E + v log v) time · O(n + v) space',
  },
  1319: {
    cpp: `class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
public:
    int makeConnected(int n, vector<vector<int>>& connections) {
        if ((int)connections.size() < n - 1) return -1;
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        int comps = n;
        for (auto& c : connections)
            if (find(c[0]) != find(c[1])) { unite(c[0], c[1]); comps--; }
        return connections.size() - (n - comps);
    }
};`,
    python: `class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        if len(connections) < n - 1: return -1
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        comps = n
        for a, b in connections:
            ra, rb = find(a), find(b)
            if ra != rb:
                p[rb] = ra
                comps -= 1
        return len(connections) - (n - comps)`,
    java: `class Solution {
    private int[] p, r;
    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) return -1;
        p = new int[n]; r = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        int comps = n;
        for (int[] c : connections)
            if (find(c[0]) != find(c[1])) { unite(c[0], c[1]); comps--; }
        return connections.length - (n - comps);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) { int t = a; a = b; b = t; }
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
}`,
    complexity: 'O(E · α(n)) time · O(n) space',
  },
  1334: {
    cpp: `class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> dist(n, vector<int>(n, 1e9));
        for (int i = 0; i < n; i++) dist[i][i] = 0;
        for (auto& e : edges) dist[e[0]][e[1]] = dist[e[1]][e[0]] = e[2];
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
        int best = -1, minReach = n + 1;
        for (int i = 0; i < n; i++) {
            int reach = 0;
            for (int j = 0; j < n; j++)
                if (dist[i][j] <= distanceThreshold) reach++;
            if (reach <= minReach) { minReach = reach; best = i; }
        }
        return best;
    }
};`,
    python: `class Solution:
    def findTheCity(self, n: int, edges: List[List[int]], distanceThreshold: int) -> int:
        dist = [[float('inf')] * n for _ in range(n)]
        for i in range(n): dist[i][i] = 0
        for u, v, w in edges:
            dist[u][v] = dist[v][u] = w
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
        best, min_reach = -1, n + 1
        for i in range(n):
            reach = sum(1 for j in range(n) if dist[i][j] <= distanceThreshold)
            if reach <= min_reach:
                min_reach = reach
                best = i
        return best`,
    java: `class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        int[][] dist = new int[n][n];
        for (int[] row : dist) Arrays.fill(row, 1_000_000_000);
        for (int i = 0; i < n; i++) dist[i][i] = 0;
        for (int[] e : edges) { dist[e[0]][e[1]] = e[2]; dist[e[1]][e[0]] = e[2]; }
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        int best = -1, minReach = n + 1;
        for (int i = 0; i < n; i++) {
            int reach = 0;
            for (int j = 0; j < n; j++) if (dist[i][j] <= distanceThreshold) reach++;
            if (reach <= minReach) { minReach = reach; best = i; }
        }
        return best;
    }
}`,
    complexity: 'O(n³) time · O(n²) space',
  },
  1368: {
    cpp: `class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        deque<pair<int,int>> dq;
        dist[0][0] = 0;
        dq.push_front({0, 0});
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!dq.empty()) {
            auto [r, c] = dq.front(); dq.pop_front();
            for (int d = 0; d < 4; d++) {
                int nr = r + dirs[d][0], nc = c + dirs[d][1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int cost = dist[r][c] + (grid[r][c] != d + 1);
                if (cost < dist[nr][nc]) {
                    dist[nr][nc] = cost;
                    if (grid[r][c] == d + 1) dq.push_front({nr, nc});
                    else dq.push_back({nr, nc});
                }
            }
        }
        return dist[m-1][n-1];
    }
};`,
    python: `class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dist = [[float('inf')] * n for _ in range(m)]
        dq = deque([(0, 0)])
        dist[0][0] = 0
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        while dq:
            r, c = dq.popleft()
            for d, (dr, dc) in enumerate(dirs):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    cost = dist[r][c] + (grid[r][c] != d + 1)
                    if cost < dist[nr][nc]:
                        dist[nr][nc] = cost
                        if grid[r][c] == d + 1:
                            dq.appendleft((nr, nc))
                        else:
                            dq.append((nr, nc))
        return dist[-1][-1]`,
    java: `class Solution {
    public int minCost(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        Deque<int[]> dq = new ArrayDeque<>();
        dist[0][0] = 0;
        dq.offerFirst(new int[]{0, 0});
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!dq.isEmpty()) {
            int[] cur = dq.pollFirst();
            for (int d = 0; d < 4; d++) {
                int nr = cur[0] + dirs[d][0], nc = cur[1] + dirs[d][1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int cost = dist[cur[0]][cur[1]] + (grid[cur[0]][cur[1]] != d + 1 ? 1 : 0);
                if (cost < dist[nr][nc]) {
                    dist[nr][nc] = cost;
                    if (grid[cur[0]][cur[1]] == d + 1) dq.offerFirst(new int[]{nr, nc});
                    else dq.offerLast(new int[]{nr, nc});
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1376: {
    cpp: `class Solution {
    vector<vector<int>> adj;
    int dfs(int u, vector<int>& informTime) {
        int best = 0;
        for (int v : adj[u])
            best = max(best, informTime[u] + dfs(v, informTime));
        return best;
    }
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        adj.assign(n, {});
        for (int i = 0; i < n; i++)
            if (manager[i] != -1) adj[manager[i]].push_back(i);
        return dfs(headID, informTime);
    }
};`,
    python: `class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        adj = [[] for _ in range(n)]
        for i, m in enumerate(manager):
            if m != -1:
                adj[m].append(i)
        def dfs(u):
            return max((informTime[u] + dfs(v) for v in adj[u]), default=0)
        return dfs(headID)`,
    java: `class Solution {
    private List<List<Integer>> adj;
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < n; i++)
            if (manager[i] != -1) adj.get(manager[i]).add(i);
        return dfs(headID, informTime);
    }
    private int dfs(int u, int[] informTime) {
        int best = 0;
        for (int v : adj.get(u)) best = Math.max(best, informTime[u] + dfs(v, informTime));
        return best;
    }
}`,
    complexity: 'O(n) time · O(n) space',
  },
  1391: {
    cpp: `class Solution {
    int m, n;
    bool dfs(vector<vector<int>>& grid, int r, int c, int prev) {
        if (r == m - 1 && c == n - 1) return true;
        int cell = grid[r][c];
        grid[r][c] = 0;
        bool ok = false;
        if ((cell == 1 || cell == 4 || cell == 6) && prev != 1 && r + 1 < m && grid[r+1][c])
            ok |= dfs(grid, r + 1, c, 3);
        if ((cell == 2 || cell == 5 || cell == 6) && prev != 3 && r - 1 >= 0 && grid[r-1][c])
            ok |= dfs(grid, r - 1, c, 1);
        if ((cell == 1 || cell == 3 || cell == 5) && prev != 4 && c + 1 < n && grid[r][c+1])
            ok |= dfs(grid, r, c + 1, 2);
        if ((cell == 2 || cell == 3 || cell == 4) && prev != 2 && c - 1 >= 0 && grid[r][c-1])
            ok |= dfs(grid, r, c - 1, 4);
        grid[r][c] = cell;
        return ok;
    }
public:
    bool hasValidPath(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        return dfs(grid, 0, 0, -1);
    }
};`,
    python: `class Solution:
    def hasValidPath(self, grid: List[List[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        def dfs(r, c, prev):
            if r == m - 1 and c == n - 1: return True
            cell = grid[r][c]
            grid[r][c] = 0
            ok = False
            if cell in (1, 4, 6) and prev != 1 and r + 1 < m and grid[r + 1][c]:
                ok |= dfs(r + 1, c, 3)
            if cell in (2, 5, 6) and prev != 3 and r - 1 >= 0 and grid[r - 1][c]:
                ok |= dfs(r - 1, c, 1)
            if cell in (1, 3, 5) and prev != 4 and c + 1 < n and grid[r][c + 1]:
                ok |= dfs(r, c + 1, 2)
            if cell in (2, 3, 4) and prev != 2 and c - 1 >= 0 and grid[r][c - 1]:
                ok |= dfs(r, c - 1, 4)
            grid[r][c] = cell
            return ok
        return dfs(0, 0, -1)`,
    java: `class Solution {
    private int m, n;
    public boolean hasValidPath(int[][] grid) {
        m = grid.length; n = grid[0].length;
        return dfs(grid, 0, 0, -1);
    }
    private boolean dfs(int[][] grid, int r, int c, int prev) {
        if (r == m - 1 && c == n - 1) return true;
        int cell = grid[r][c];
        grid[r][c] = 0;
        boolean ok = false;
        if ((cell == 1 || cell == 4 || cell == 6) && prev != 1 && r + 1 < m && grid[r + 1][c] != 0)
            ok |= dfs(grid, r + 1, c, 3);
        if ((cell == 2 || cell == 5 || cell == 6) && prev != 3 && r - 1 >= 0 && grid[r - 1][c] != 0)
            ok |= dfs(grid, r - 1, c, 1);
        if ((cell == 1 || cell == 3 || cell == 5) && prev != 4 && c + 1 < n && grid[r][c + 1] != 0)
            ok |= dfs(grid, r, c + 1, 2);
        if ((cell == 2 || cell == 3 || cell == 4) && prev != 2 && c - 1 >= 0 && grid[r][c - 1] != 0)
            ok |= dfs(grid, r, c - 1, 4);
        grid[r][c] = cell;
        return ok;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1443: {
    cpp: `class Solution {
    vector<vector<int>> adj;
    vector<bool> has;
    pair<int,int> dfs(int u, int parent, vector<int>& cost) {
        int total = has[u] ? 1 : 0, trips = 0;
        for (int v : adj[u]) {
            if (v == parent) continue;
            auto [sub, t] = dfs(v, u, cost);
            total += sub;
            trips += t + (sub ? 2 : 0);
        }
        return {total, trips};
    }
public:
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        adj.assign(n, {});
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        has = hasApple;
        vector<int> dummy;
        return dfs(0, -1, dummy).second;
    }
};`,
    python: `class Solution:
    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b); adj[b].append(a)
        def dfs(u, parent):
            total = 1 if hasApple[u] else 0
            trips = 0
            for v in adj[u]:
                if v == parent: continue
                sub, t = dfs(v, u)
                total += sub
                trips += t + (2 if sub else 0)
            return total, trips
        return dfs(0, -1)[1]`,
    java: `class Solution {
    private List<List<Integer>> adj;
    private boolean[] hasApple;
    public int minTime(int n, int[][] edges, boolean[] hasApple) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        this.hasApple = hasApple;
        return dfs(0, -1)[1];
    }
    private int[] dfs(int u, int parent) {
        int total = hasApple[u] ? 1 : 0, trips = 0;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            int[] sub = dfs(v, u);
            total += sub[0];
            trips += sub[1] + (sub[0] > 0 ? 2 : 0);
        }
        return new int[]{total, trips};
    }
}`,
    complexity: 'O(n) time · O(n) space',
  },
  1462: {
    cpp: `class Solution {
    vector<vector<int>> adj;
    vector<vector<bool>> reach;
    void dfs(int src, int u) {
        for (int v : adj[u]) {
            if (!reach[src][v]) {
                reach[src][v] = true;
                dfs(src, v);
            }
        }
    }
public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        adj.assign(numCourses, {});
        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
        reach.assign(numCourses, vector<bool>(numCourses));
        for (int i = 0; i < numCourses; i++) dfs(i, i);
        vector<bool> res;
        for (auto& q : queries) res.push_back(reach[q[0]][q[1]]);
        return res;
    }
};`,
    python: `class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        adj = [[] for _ in range(numCourses)]
        for a, b in prerequisites:
            adj[b].append(a)
        reach = [[False] * numCourses for _ in range(numCourses)]
        def dfs(src, u):
            for v in adj[u]:
                if not reach[src][v]:
                    reach[src][v] = True
                    dfs(src, v)
        for i in range(numCourses):
            dfs(i, i)
        return [reach[u][v] for u, v in queries]`,
    java: `class Solution {
    private List<List<Integer>> adj;
    private boolean[][] reach;
    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) adj.get(p[1]).add(p[0]);
        reach = new boolean[numCourses][numCourses];
        for (int i = 0; i < numCourses; i++) dfs(i, i);
        List<Boolean> res = new ArrayList<>();
        for (int[] q : queries) res.add(reach[q[0]][q[1]]);
        return res;
    }
    private void dfs(int src, int u) {
        for (int v : adj.get(u)) {
            if (!reach[src][v]) {
                reach[src][v] = true;
                dfs(src, v);
            }
        }
    }
}`,
    complexity: 'O(V² + V · E) time · O(V²) space',
  },
  1466: {
    cpp: `class Solution {
    vector<vector<pair<int,int>>> adj;
    int dfs(int u, int parent) {
        int flips = 0;
        for (auto [v, cost] : adj[u]) {
            if (v != parent) flips += cost + dfs(v, u);
        }
        return flips;
    }
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        adj.assign(n, {});
        for (auto& c : connections) {
            adj[c[0]].push_back({c[1], 1});
            adj[c[1]].push_back({c[0], 0});
        }
        return dfs(0, -1);
    }
};`,
    python: `class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        for a, b in connections:
            adj[a].append((b, 1))
            adj[b].append((a, 0))
        def dfs(u, parent):
            return sum(cost + dfs(v, u) for v, cost in adj[u] if v != parent)
        return dfs(0, -1)`,
    java: `class Solution {
    private List<List<int[]>> adj;
    public int minReorder(int n, int[][] connections) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] c : connections) {
            adj.get(c[0]).add(new int[]{c[1], 1});
            adj.get(c[1]).add(new int[]{c[0], 0});
        }
        return dfs(0, -1);
    }
    private int dfs(int u, int parent) {
        int flips = 0;
        for (int[] e : adj.get(u))
            if (e[0] != parent) flips += e[1] + dfs(e[0], u);
        return flips;
    }
}`,
    complexity: 'O(n) time · O(n) space',
  },
  1514: {
    cpp: `class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        vector<vector<pair<int,double>>> adj(n);
        for (int i = 0; i < (int)edges.size(); i++) {
            adj[edges[i][0]].push_back({edges[i][1], succProb[i]});
            adj[edges[i][1]].push_back({edges[i][0], succProb[i]});
        }
        vector<double> prob(n, 0.0);
        prob[start_node] = 1.0;
        priority_queue<pair<double,int>> pq;
        pq.push({1.0, start_node});
        while (!pq.empty()) {
            auto [p, u] = pq.top(); pq.pop();
            if (p < prob[u]) continue;
            for (auto [v, w] : adj[u]) {
                double np = p * w;
                if (np > prob[v]) {
                    prob[v] = np;
                    pq.push({np, v});
                }
            }
        }
        return prob[end_node];
    }
};`,
    python: `class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        adj = [[] for _ in range(n)]
        for (a, b), p in zip(edges, succProb):
            adj[a].append((b, p)); adj[b].append((a, p))
        prob = [0.0] * n
        prob[start_node] = 1.0
        pq = [(-1.0, start_node)]
        while pq:
            p, u = heapq.heappop(pq)
            p = -p
            if p < prob[u]: continue
            for v, w in adj[u]:
                np = p * w
                if np > prob[v]:
                    prob[v] = np
                    heapq.heappush(pq, (-np, v))
        return prob[end_node]`,
    java: `class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<double[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int i = 0; i < edges.length; i++) {
            adj[edges[i][0]].add(new double[]{edges[i][1], succProb[i]});
            adj[edges[i][1]].add(new double[]{edges[i][0], succProb[i]});
        }
        double[] prob = new double[n];
        prob[start_node] = 1.0;
        PriorityQueue<double[]> pq = new PriorityQueue<>((a, b) -> Double.compare(b[0], a[0]));
        pq.offer(new double[]{1.0, start_node});
        while (!pq.isEmpty()) {
            double[] cur = pq.poll();
            if (cur[0] < prob[(int) cur[1]]) continue;
            for (double[] e : adj[(int) cur[1]]) {
                double np = cur[0] * e[1];
                if (np > prob[(int) e[0]]) {
                    prob[(int) e[0]] = np;
                    pq.offer(new double[]{np, e[0]});
                }
            }
        }
        return prob[end_node];
    }
}`,
    complexity: 'O((V + E) log V) time · O(V + E) space',
  },
  1557: {
    cpp: `class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<bool> hasIn(n);
        for (auto& e : edges) hasIn[e[1]] = true;
        vector<int> res;
        for (int i = 0; i < n; i++)
            if (!hasIn[i]) res.push_back(i);
        return res;
    }
};`,
    python: `class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        has_in = [False] * n
        for _, v in edges:
            has_in[v] = True
        return [i for i in range(n) if not has_in[i]]`,
    java: `class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        boolean[] hasIn = new boolean[n];
        for (List<Integer> e : edges) hasIn[e.get(1)] = true;
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) if (!hasIn[i]) res.add(i);
        return res;
    }
}`,
    complexity: 'O(V + E) time · O(V) space',
  },
  1579: {
    cpp: `class UF {
    vector<int> p, r;
    int comps;
public:
    UF(int n) : p(n + 1), r(n + 1), comps(n) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        comps--;
        return true;
    }
    bool connected() { return comps == 1; }
};
class Solution {
public:
    int maxNumEdgesToRemove(int n, vector<vector<int>>& edges) {
        UF alice(n), bob(n);
        int used = 0;
        for (auto& e : edges)
            if (e[0] == 3 && (alice.unite(e[1], e[2]) | bob.unite(e[1], e[2]))) used++;
        for (auto& e : edges)
            if (e[0] == 1 && alice.unite(e[1], e[2])) used++;
        for (auto& e : edges)
            if (e[0] == 2 && bob.unite(e[1], e[2])) used++;
        if (!alice.connected() || !bob.connected()) return -1;
        return (int)edges.size() - used;
    }
};`,
    python: `class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: List[List[int]]) -> int:
        class UF:
            def __init__(self, n):
                self.p = list(range(n + 1))
                self.comps = n
            def find(self, x):
                while self.p[x] != x:
                    self.p[x] = self.p[self.p[x]]
                    x = self.p[x]
                return x
            def unite(self, a, b):
                ra, rb = self.find(a), self.find(b)
                if ra == rb: return False
                self.p[rb] = ra
                self.comps -= 1
                return True
        alice, bob = UF(n), UF(n)
        used = 0
        for t, u, v in edges:
            if t == 3 and (alice.unite(u, v) or bob.unite(u, v)):
                used += 1
        for t, u, v in edges:
            if t == 1 and alice.unite(u, v):
                used += 1
        for t, u, v in edges:
            if t == 2 and bob.unite(u, v):
                used += 1
        if alice.comps != 1 or bob.comps != 1:
            return -1
        return len(edges) - used`,
    java: `class Solution {
    public int maxNumEdgesToRemove(int n, int[][] edges) {
        UF alice = new UF(n), bob = new UF(n);
        int used = 0;
        for (int[] e : edges)
            if (e[0] == 3 && alice.unite(e[1], e[2]) | bob.unite(e[1], e[2])) used++;
        for (int[] e : edges)
            if (e[0] == 1 && alice.unite(e[1], e[2])) used++;
        for (int[] e : edges)
            if (e[0] == 2 && bob.unite(e[1], e[2])) used++;
        if (!alice.connected() || !bob.connected()) return -1;
        return edges.length - used;
    }
    static class UF {
        int[] p, r; int comps;
        UF(int n) { p = new int[n + 1]; r = new int[n + 1]; comps = n; for (int i = 0; i <= n; i++) p[i] = i; }
        int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
        boolean unite(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (r[a] < r[b]) { int t = a; a = b; b = t; }
            p[b] = a; if (r[a] == r[b]) r[a]++; comps--; return true;
        }
        boolean connected() { return comps == 1; }
    }
}`,
    complexity: 'O(E · α(n)) time · O(n) space',
  },
  1584: {
    cpp: `class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
    int manhattan(vector<vector<int>>& pts, int i, int j) {
        return abs(pts[i][0] - pts[j][0]) + abs(pts[i][1] - pts[j][1]);
    }
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        for (int i = 1; i < n; i++) pq.push({manhattan(points, 0, i), i});
        int cost = 0, used = 1;
        while (used < n) {
            auto [w, v] = pq.top(); pq.pop();
            if (find(0) == find(v)) continue;
            unite(0, v);
            cost += w;
            used++;
            for (int i = 0; i < n; i++)
                if (find(i) != find(v)) pq.push({manhattan(points, v, i), i});
        }
        return cost;
    }
};`,
    python: `class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        def dist(i, j):
            return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
        pq = [(dist(0, i), i) for i in range(1, n)]
        heapq.heapify(pq)
        cost = used = 0
        while used < n - 1:
            w, v = heapq.heappop(pq)
            if find(v) == find(0):
                continue
            unite(0, v)
            cost += w
            used += 1
            for i in range(n):
                if find(i) != find(v):
                    heapq.heappush(pq, (dist(v, i), i))
        return cost`,
    java: `class Solution {
    private int[] p;
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        for (int i = 1; i < n; i++) pq.offer(new int[]{dist(points, 0, i), i});
        int cost = 0, used = 0;
        while (used < n - 1) {
            int[] cur = pq.poll();
            if (find(cur[1]) == find(0)) continue;
            unite(0, cur[1]);
            cost += cur[0];
            used++;
            for (int i = 0; i < n; i++)
                if (find(i) != find(cur[1])) pq.offer(new int[]{dist(points, cur[1], i), i});
        }
        return cost;
    }
    private int dist(int[][] pts, int i, int j) {
        return Math.abs(pts[i][0] - pts[j][0]) + Math.abs(pts[i][1] - pts[j][1]);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}`,
    complexity: 'O(n² log n) time · O(n²) space',
  },
  1615: {
    cpp: `class Solution {
public:
    int maximalNetworkRank(int n, vector<vector<int>>& roads) {
        vector<int> deg(n);
        vector<vector<bool>> edge(n, vector<bool>(n));
        for (auto& r : roads) {
            deg[r[0]]++; deg[r[1]]++;
            edge[r[0]][r[1]] = edge[r[1]][r[0]] = true;
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int rank = deg[i] + deg[j] - (edge[i][j] ? 1 : 0);
                best = max(best, rank);
            }
        return best;
    }
};`,
    python: `class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        deg = [0] * n
        edge = set()
        for a, b in roads:
            deg[a] += 1; deg[b] += 1
            edge.add((min(a, b), max(a, b)))
        return max(deg[i] + deg[j] - ((min(i, j), max(i, j)) in edge)
                   for i in range(n) for j in range(i + 1, n))`,
    java: `class Solution {
    public int maximalNetworkRank(int n, int[][] roads) {
        int[] deg = new int[n];
        boolean[][] edge = new boolean[n][n];
        for (int[] r : roads) {
            deg[r[0]]++; deg[r[1]]++;
            edge[r[0]][r[1]] = edge[r[1]][r[0]] = true;
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                best = Math.max(best, deg[i] + deg[j] - (edge[i][j] ? 1 : 0));
        return best;
    }
}`,
    complexity: 'O(n² + E) time · O(n²) space',
  },
  1631: {
    cpp: `class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
        pq.push({0, 0, 0});
        dist[0][0] = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.empty()) {
            auto [eff, r, c] = pq.top(); pq.pop();
            if (r == m - 1 && c == n - 1) return eff;
            if (eff > dist[r][c]) continue;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int ne = max(eff, abs(heights[r][c] - heights[nr][nc]));
                if (ne < dist[nr][nc]) {
                    dist[nr][nc] = ne;
                    pq.push({ne, nr, nc});
                }
            }
        }
        return 0;
    }
};`,
    python: `class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        m, n = len(heights), len(heights[0])
        dist = [[float('inf')] * n for _ in range(m)]
        pq = [(0, 0, 0)]
        dist[0][0] = 0
        while pq:
            eff, r, c = heapq.heappop(pq)
            if r == m - 1 and c == n - 1: return eff
            if eff > dist[r][c]: continue
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    ne = max(eff, abs(heights[r][c] - heights[nr][nc]))
                    if ne < dist[nr][nc]:
                        dist[nr][nc] = ne
                        heapq.heappush(pq, (ne, nr, nc))
        return 0`,
    java: `class Solution {
    public int minimumEffortPath(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, 0, 0});
        dist[0][0] = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            if (cur[1] == m - 1 && cur[2] == n - 1) return cur[0];
            if (cur[0] > dist[cur[1]][cur[2]]) continue;
            for (int[] d : dirs) {
                int nr = cur[1] + d[0], nc = cur[2] + d[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int ne = Math.max(cur[0], Math.abs(heights[cur[1]][cur[2]] - heights[nr][nc]));
                if (ne < dist[nr][nc]) {
                    dist[nr][nc] = ne;
                    pq.offer(new int[]{ne, nr, nc});
                }
            }
        }
        return 0;
    }
}`,
    complexity: 'O(m · n log(m · n)) time · O(m · n) space',
  },
  1654: {
    cpp: `class Solution {
public:
    int minimumJumps(int forbidden, int a, int b, int x) {
        const int MAX = 6000;
        vector<int> dist(2 * MAX + 1, -1);
        queue<pair<int,int>> q;
        q.push({0, 0});
        dist[0] = 0;
        while (!q.empty()) {
            auto [pos, back] = q.front(); q.pop();
            if (pos == x) return dist[pos];
            int fwd = pos + a;
            if (fwd <= 2 * MAX && fwd != forbidden && dist[fwd] == -1) {
                dist[fwd] = dist[pos] + 1;
                q.push({fwd, 0});
            }
            if (!back) {
                int bwd = pos - b;
                if (bwd >= 0 && bwd != forbidden && dist[bwd] == -1) {
                    dist[bwd] = dist[pos] + 1;
                    q.push({bwd, 1});
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def minimumJumps(self, forbidden: int, a: int, b: int, x: int) -> int:
        MAX = 6000
        dist = [-1] * (2 * MAX + 1)
        q = deque([(0, 0)])
        dist[0] = 0
        while q:
            pos, back = q.popleft()
            if pos == x: return dist[pos]
            fwd = pos + a
            if fwd <= 2 * MAX and fwd != forbidden and dist[fwd] == -1:
                dist[fwd] = dist[pos] + 1
                q.append((fwd, 0))
            if not back:
                bwd = pos - b
                if bwd >= 0 and bwd != forbidden and dist[bwd] == -1:
                    dist[bwd] = dist[pos] + 1
                    q.append((bwd, 1))
        return -1`,
    java: `class Solution {
    public int minimumJumps(int forbidden, int a, int b, int x) {
        final int MAX = 6000;
        int[] dist = new int[2 * MAX + 1];
        Arrays.fill(dist, -1);
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        dist[0] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == x) return dist[cur[0]];
            int fwd = cur[0] + a;
            if (fwd <= 2 * MAX && fwd != forbidden && dist[fwd] == -1) {
                dist[fwd] = dist[cur[0]] + 1;
                q.offer(new int[]{fwd, 0});
            }
            if (cur[1] == 0) {
                int bwd = cur[0] - b;
                if (bwd >= 0 && bwd != forbidden && dist[bwd] == -1) {
                    dist[bwd] = dist[cur[0]] + 1;
                    q.offer(new int[]{bwd, 1});
                }
            }
        }
        return -1;
    }
}`,
    complexity: 'O(MAX) time · O(MAX) space',
  },
  1697: {
    cpp: `class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<bool> distanceLimitedPathsExist(int n, vector<vector<int>>& edgeList, vector<vector<int>>& queries) {
        for (int i = 0; i < (int)queries.size(); i++) queries[i].push_back(i);
        sort(edgeList.begin(), edgeList.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        sort(queries.begin(), queries.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        vector<bool> ans(queries.size());
        int j = 0;
        for (auto& q : queries) {
            while (j < (int)edgeList.size() && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
};`,
    python: `class Solution:
    def distanceLimitedPathsExist(self, n: int, edgeList: List[List[int]], queries: List[List[int]]) -> List[bool]:
        edgeList.sort(key=lambda e: e[2])
        indexed = sorted(enumerate(queries), key=lambda x: x[1][2])
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        ans = [False] * len(queries)
        j = 0
        for idx, (u, v, limit) in indexed:
            while j < len(edgeList) and edgeList[j][2] < limit:
                unite(edgeList[j][0], edgeList[j][1])
                j += 1
            ans[idx] = find(u) == find(v)
        return ans`,
    java: `class Solution {
    private int[] p;
    public boolean[] distanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries) {
        int[][] qs = new int[queries.length][4];
        for (int i = 0; i < queries.length; i++) {
            qs[i][0] = queries[i][0]; qs[i][1] = queries[i][1];
            qs[i][2] = queries[i][2]; qs[i][3] = i;
        }
        Arrays.sort(edgeList, Comparator.comparingInt(a -> a[2]));
        Arrays.sort(qs, Comparator.comparingInt(a -> a[2]));
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        boolean[] ans = new boolean[queries.length];
        int j = 0;
        for (int[] q : qs) {
            while (j < edgeList.length && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}`,
    complexity: 'O((E + Q) log(E + Q) · α(n)) time · O(n + Q) space',
  },
  1765: {
    cpp: `class Solution {
public:
    vector<vector<int>> highestPeak(vector<vector<int>>& isWater) {
        int m = isWater.size(), n = isWater[0].size();
        vector<vector<int>> height(m, vector<int>(n, -1));
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j]) { height[i][j] = 0; q.push({i, j}); }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && height[nr][nc] == -1) {
                    height[nr][nc] = height[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return height;
    }
};`,
    python: `class Solution:
    def highestPeak(self, isWater: List[List[int]]) -> List[List[int]]:
        m, n = len(isWater), len(isWater[0])
        height = [[-1] * n for _ in range(m)]
        q = deque()
        for i in range(m):
            for j in range(n):
                if isWater[i][j]:
                    height[i][j] = 0
                    q.append((i, j))
        while q:
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and height[nr][nc] == -1:
                    height[nr][nc] = height[r][c] + 1
                    q.append((nr, nc))
        return height`,
    java: `class Solution {
    public int[][] highestPeak(int[][] isWater) {
        int m = isWater.length, n = isWater[0].length;
        int[][] height = new int[m][n];
        for (int[] row : height) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j] == 1) { height[i][j] = 0; q.offer(new int[]{i, j}); }
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && height[nr][nc] == -1) {
                    height[nr][nc] = height[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return height;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1791: {
    cpp: `class Solution {
public:
    int findCenter(vector<vector<int>>& edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0];
        return edges[0][1];
    }
};`,
    python: `class Solution:
    def findCenter(self, edges: List[List[int]]) -> int:
        a, b = edges[0]
        c, d = edges[1]
        return a if a in (c, d) else b`,
    java: `class Solution {
    public int findCenter(int[][] edges) {
        if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) return edges[0][0];
        return edges[0][1];
    }
}`,
    complexity: 'O(1) time · O(1) space',
  },
  1905: {
    cpp: `class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool dfs(vector<vector<int>>& g1, vector<vector<int>>& g2, int r, int c) {
        if (g1[r][c] != g2[r][c]) return false;
        g1[r][c] = g2[r][c] = 0;
        bool ok = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g1[nr][nc] && g2[nr][nc])
                ok &= dfs(g1, g2, nr, nc);
        }
        return ok;
    }
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        m = grid1.size(); n = grid1[0].size();
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid1[i][j] && grid2[i][j] && dfs(grid1, grid2, i, j)) count++;
        return count;
    }
};`,
    python: `class Solution:
    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        m, n = len(grid1), len(grid1[0])
        def dfs(r, c):
            if grid1[r][c] != grid2[r][c]: return False
            grid1[r][c] = grid2[r][c] = 0
            ok = True
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid1[nr][nc] and grid2[nr][nc]:
                    ok &= dfs(nr, nc)
            return ok
        return sum(1 for i in range(m) for j in range(n)
                   if grid1[i][j] and grid2[i][j] and dfs(i, j))`,
    java: `class Solution {
    private int m, n;
    public int countSubIslands(int[][] grid1, int[][] grid2) {
        m = grid1.length; n = grid1[0].length;
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid1[i][j] == 1 && grid2[i][j] == 1 && dfs(grid1, grid2, i, j)) count++;
        return count;
    }
    private boolean dfs(int[][] g1, int[][] g2, int r, int c) {
        if (g1[r][c] != g2[r][c]) return false;
        g1[r][c] = 0; g2[r][c] = 0;
        boolean ok = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g1[nr][nc] == 1 && g2[nr][nc] == 1)
                ok &= dfs(g1, g2, nr, nc);
        }
        return ok;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1926: {
    cpp: `class Solution {
public:
    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        int m = maze.size(), n = maze[0].size();
        queue<tuple<int,int,int>> q;
        q.push({entrance[0], entrance[1], 0});
        maze[entrance[0]][entrance[1]] = '+';
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c,d] = q.front(); q.pop();
            for (auto& dr : dirs) {
                int nr = r + dr[0], nc = c + dr[1], steps = 0;
                while (nr >= 0 && nc >= 0 && nr < m && nc < n && maze[nr][nc] == '.') {
                    if (nr == 0 || nc == 0 || nr == m - 1 || nc == n - 1) return d + steps + 1;
                    nr += dr[0]; nc += dr[1]; steps++;
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        er, ec = entrance
        maze[er][ec] = '+'
        q = deque([(er, ec, 0)])
        while q:
            r, c, d = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc, steps = r + dr, c + dc, 0
                while 0 <= nr < m and 0 <= nc < n and maze[nr][nc] == '.':
                    if nr == 0 or nc == 0 or nr == m - 1 or nc == n - 1:
                        return d + steps + 1
                    nr += dr; nc += dc; steps += 1
        return -1`,
    java: `class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int m = maze.length, n = maze[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{entrance[0], entrance[1], 0});
        maze[entrance[0]][entrance[1]] = '+';
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1], steps = 0;
                while (nr >= 0 && nc >= 0 && nr < m && nc < n && maze[nr][nc] == '.') {
                    if (nr == 0 || nc == 0 || nr == m - 1 || nc == n - 1) return cur[2] + steps + 1;
                    nr += d[0]; nc += d[1]; steps++;
                }
            }
        }
        return -1;
    }
}`,
    complexity: 'O(m · n) time · O(m · n) space',
  },
  1971: {
    cpp: `class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges) unite(e[0], e[1]);
        return find(source) == find(destination);
    }
};`,
    python: `class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            p[find(b)] = find(a)
        return find(source) == find(destination)`,
    java: `class Solution {
    private int[] p;
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] e : edges) unite(e[0], e[1]);
        return find(source) == find(destination);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}`,
    complexity: 'O(E · α(n)) time · O(n) space',
  },
  1976: {
    cpp: `class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        const int MOD = 1e9 + 7;
        vector<vector<pair<int,int>>> adj(n);
        for (auto& r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }
        vector<long long> dist(n, LLONG_MAX), ways(n);
        ways[0] = 1;
        dist[0] = 0;
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
        pq.push({0, 0});
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto [v, w] : adj[u]) {
                long long nd = d + w;
                if (nd < dist[v]) {
                    dist[v] = nd;
                    ways[v] = ways[u];
                    pq.push({nd, v});
                } else if (nd == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        return ways[n - 1];
    }
};`,
    python: `class Solution:
    def countPaths(self, n: int, roads: List[List[int]]) -> int:
        MOD = 10**9 + 7
        adj = [[] for _ in range(n)]
        for u, v, w in roads:
            adj[u].append((v, w)); adj[v].append((u, w))
        dist = [float('inf')] * n
        ways = [0] * n
        dist[0] = 0
        ways[0] = 1
        pq = [(0, 0)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]: continue
            for v, w in adj[u]:
                nd = d + w
                if nd < dist[v]:
                    dist[v] = nd
                    ways[v] = ways[u]
                    heapq.heappush(pq, (nd, v))
                elif nd == dist[v]:
                    ways[v] = (ways[v] + ways[u]) % MOD
        return ways[-1]`,
    java: `class Solution {
    public int countPaths(int n, int[][] roads) {
        final int MOD = 1_000_000_007;
        List<long[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] r : roads) {
            adj[r[0]].add(new long[]{r[1], r[2]});
            adj[r[1]].add(new long[]{r[0], r[2]});
        }
        long[] dist = new long[n];
        long[] ways = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[0] = 0; ways[0] = 1;
        PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingLong(a -> a[0]));
        pq.offer(new long[]{0, 0});
        while (!pq.isEmpty()) {
            long[] cur = pq.poll();
            if (cur[0] > dist[(int) cur[1]]) continue;
            for (long[] e : adj[(int) cur[1]]) {
                long nd = cur[0] + e[1];
                if (nd < dist[(int) e[0]]) {
                    dist[(int) e[0]] = nd;
                    ways[(int) e[0]] = ways[(int) cur[1]];
                    pq.offer(new long[]{nd, e[0]});
                } else if (nd == dist[(int) e[0]]) {
                    ways[(int) e[0]] = (ways[(int) e[0]] + ways[(int) cur[1]]) % MOD;
                }
            }
        }
        return (int) ways[n - 1];
    }
}`,
    complexity: 'O((V + E) log V) time · O(V + E) space',
  },
  2039: {
    cpp: `class Solution {
public:
    int networkBecomesIdle(vector<vector<int>>& edges, vector<int>& patience) {
        int n = patience.size();
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(0); dist[0] = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u])
                if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
        }
        int ans = 0;
        for (int i = 1; i < n; i++) {
            int roundTrip = 2 * dist[i];
            int lastSend = ((roundTrip - 1) / patience[i]) * patience[i];
            ans = max(ans, lastSend + roundTrip);
        }
        return ans + 1;
    }
};`,
    python: `class Solution:
    def networkBecomesIdle(self, edges: List[List[int]], patience: List[int]) -> int:
        n = len(patience)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v); adj[v].append(u)
        dist = [-1] * n
        q = deque([0])
        dist[0] = 0
        while q:
            u = q.popleft()
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        ans = 0
        for i in range(1, n):
            rt = 2 * dist[i]
            last = ((rt - 1) // patience[i]) * patience[i]
            ans = max(ans, last + rt)
        return ans + 1`,
    java: `class Solution {
    public int networkBecomesIdle(int[][] edges, int[] patience) {
        int n = patience.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(0); dist[0] = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u))
                if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); }
        }
        int ans = 0;
        for (int i = 1; i < n; i++) {
            int rt = 2 * dist[i];
            int last = ((rt - 1) / patience[i]) * patience[i];
            ans = Math.max(ans, last + rt);
        }
        return ans + 1;
    }
}`,
    complexity: 'O(V + E) time · O(V + E) space',
  },
  2059: {
    cpp: `class Solution {
public:
    int minimumOperations(int start, int goal, vector<int>& nums) {
        if (start == goal) return 0;
        unordered_set<int> vis;
        queue<pair<int,int>> q;
        q.push({start, 0});
        vis.insert(start);
        while (!q.empty()) {
            auto [x, steps] = q.front(); q.pop();
            for (int d : {-1, 1}) {
                for (int n : nums) {
                    int nx = x + d * n;
                    if (nx == goal) return steps + 1;
                    if (nx >= 0 && nx <= 1000 && !vis.count(nx)) {
                        vis.insert(nx);
                        q.push({nx, steps + 1});
                    }
                }
            }
        }
        return -1;
    }
};`,
    python: `class Solution:
    def minimumOperations(self, start: int, goal: int, nums: List[int]) -> int:
        if start == goal: return 0
        vis = {start}
        q = deque([(start, 0)])
        while q:
            x, steps = q.popleft()
            for d in (-1, 1):
                for n in nums:
                    nx = x + d * n
                    if nx == goal: return steps + 1
                    if 0 <= nx <= 1000 and nx not in vis:
                        vis.add(nx)
                        q.append((nx, steps + 1))
        return -1`,
    java: `class Solution {
    public int minimumOperations(int start, int goal, int[] nums) {
        if (start == goal) return 0;
        Set<Integer> vis = new HashSet<>();
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{start, 0});
        vis.add(start);
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int d : new int[]{-1, 1}) {
                for (int n : nums) {
                    int nx = cur[0] + d * n;
                    if (nx == goal) return cur[1] + 1;
                    if (nx >= 0 && nx <= 1000 && !vis.contains(nx)) {
                        vis.add(nx);
                        q.offer(new int[]{nx, cur[1] + 1});
                    }
                }
            }
        }
        return -1;
    }
}`,
    complexity: 'O(1000 · k) time · O(1000) space',
  },
  2101: {
    cpp: `class Solution {
    bool overlap(vector<int>& a, vector<int>& b) {
        long long dx = a[0] - b[0], dy = a[1] - b[1];
        long long r = (long long)a[2] + b[2];
        return dx * dx + dy * dy <= r * r;
    }
    void dfs(int u, vector<vector<int>>& bombs, vector<bool>& vis) {
        vis[u] = true;
        for (int v = 0; v < (int)bombs.size(); v++)
            if (!vis[v] && overlap(bombs[u], bombs[v])) dfs(v, bombs, vis);
    }
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int best = 0;
        for (int i = 0; i < (int)bombs.size(); i++) {
            vector<bool> vis(bombs.size());
            dfs(i, bombs, vis);
            best = max(best, (int)count(vis.begin(), vis.end(), true));
        }
        return best;
    }
};`,
    python: `class Solution:
    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        def overlap(a, b):
            dx, dy = a[0] - b[0], a[1] - b[1]
            r = a[2] + b[2]
            return dx * dx + dy * dy <= r * r
        def dfs(u, vis):
            vis[u] = True
            for v in range(len(bombs)):
                if not vis[v] and overlap(bombs[u], bombs[v]):
                    dfs(v, vis)
        best = 0
        for i in range(len(bombs)):
            vis = [False] * len(bombs)
            dfs(i, vis)
            best = max(best, sum(vis))
        return best`,
    java: `class Solution {
    public int maximumDetonation(int[][] bombs) {
        int best = 0;
        for (int i = 0; i < bombs.length; i++) {
            boolean[] vis = new boolean[bombs.length];
            dfs(i, bombs, vis);
            int cnt = 0;
            for (boolean v : vis) if (v) cnt++;
            best = Math.max(best, cnt);
        }
        return best;
    }
    private void dfs(int u, int[][] bombs, boolean[] vis) {
        vis[u] = true;
        for (int v = 0; v < bombs.length; v++)
            if (!vis[v] && overlap(bombs[u], bombs[v])) dfs(v, bombs, vis);
    }
    private boolean overlap(int[] a, int[] b) {
        long dx = a[0] - b[0], dy = a[1] - b[1], r = (long) a[2] + b[2];
        return dx * dx + dy * dy <= r * r;
    }
}`,
    complexity: 'O(n²) time · O(n) space',
  },
  2115: {
    cpp: `class Solution {
public:
    vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {
        unordered_set<string> have(supplies.begin(), supplies.end());
        unordered_map<string, vector<string>> adj;
        unordered_map<string, int> indeg;
        for (int i = 0; i < (int)recipes.size(); i++) {
            indeg[recipes[i]] = 0;
            for (auto& ing : ingredients[i]) {
                if (!have.count(ing)) {
                    adj[ing].push_back(recipes[i]);
                    indeg[recipes[i]]++;
                }
            }
        }
        queue<string> q;
        for (auto& [r, d] : indeg)
            if (!d) q.push(r);
        vector<string> res;
        while (!q.empty()) {
            string u = q.front(); q.pop();
            res.push_back(u);
            have.insert(u);
            for (auto& v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return res;
    }
};`,
    python: `class Solution:
    def findAllRecipes(self, recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:
        have = set(supplies)
        adj = defaultdict(list)
        indeg = {r: 0 for r in recipes}
        for r, ings in zip(recipes, ingredients):
            for ing in ings:
                if ing not in have:
                    adj[ing].append(r)
                    indeg[r] += 1
        q = deque(r for r in recipes if indeg[r] == 0)
        res = []
        while q:
            u = q.popleft()
            res.append(u)
            have.add(u)
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return res`,
    java: `class Solution {
    public List<String> findAllRecipes(String[] recipes, List<List<String>> ingredients, String[] supplies) {
        Set<String> have = new HashSet<>(Arrays.asList(supplies));
        Map<String, List<String>> adj = new HashMap<>();
        Map<String, Integer> indeg = new HashMap<>();
        for (int i = 0; i < recipes.length; i++) {
            indeg.put(recipes[i], 0);
            for (String ing : ingredients.get(i)) {
                if (!have.contains(ing)) {
                    adj.computeIfAbsent(ing, k -> new ArrayList<>()).add(recipes[i]);
                    indeg.merge(recipes[i], 1, Integer::sum);
                }
            }
        }
        Queue<String> q = new ArrayDeque<>();
        for (String r : recipes) if (indeg.get(r) == 0) q.offer(r);
        List<String> res = new ArrayList<>();
        while (!q.isEmpty()) {
            String u = q.poll();
            res.add(u);
            have.add(u);
            for (String v : adj.getOrDefault(u, List.of()))
                if (indeg.merge(v, -1, Integer::sum) == 0) q.offer(v);
        }
        return res;
    }
}`,
    complexity: 'O(R + I) time · O(R + I) space',
  },
  2192: {
    cpp: `class Solution {
    vector<vector<int>> adj, ancestors;
    void dfs(int src, int u, vector<bool>& vis) {
        for (int v : adj[u]) {
            if (!vis[v]) {
                vis[v] = true;
                ancestors[src].push_back(v);
                dfs(src, v, vis);
            }
        }
    }
public:
    vector<vector<int>> getAncestors(int n, vector<vector<int>>& edges) {
        adj.assign(n, {});
        for (auto& e : edges) adj[e[0]].push_back(e[1]);
        ancestors.assign(n, {});
        for (int i = 0; i < n; i++) {
            vector<bool> vis(n);
            dfs(i, i, vis);
            sort(ancestors[i].begin(), ancestors[i].end());
        }
        return ancestors;
    }
};`,
    python: `class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
        res = []
        for i in range(n):
            vis = [False] * n
            anc = []
            def dfs(u):
                for v in adj[u]:
                    if not vis[v]:
                        vis[v] = True
                        anc.append(v)
                        dfs(v)
            dfs(i)
            res.append(sorted(anc))
        return res`,
    java: `class Solution {
    private List<List<Integer>> adj;
    public List<List<Integer>> getAncestors(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) adj.get(e[0]).add(e[1]);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            boolean[] vis = new boolean[n];
            List<Integer> anc = new ArrayList<>();
            dfs(i, vis, anc);
            Collections.sort(anc);
            res.add(anc);
        }
        return res;
    }
    private void dfs(int u, boolean[] vis, List<Integer> anc) {
        for (int v : adj.get(u)) {
            if (!vis[v]) {
                vis[v] = true;
                anc.add(v);
                dfs(v, vis, anc);
            }
        }
    }
}`,
    complexity: 'O(n · (V + E)) time · O(n²) space',
  },
  2285: {
    cpp: `class Solution {
public:
    long long maximumImportance(int n, vector<vector<int>>& roads) {
        vector<long long> deg(n);
        for (auto& r : roads) { deg[r[0]]++; deg[r[1]]++; }
        sort(deg.begin(), deg.end());
        long long ans = 0;
        for (int i = 0; i < n; i++) ans += deg[i] * (i + 1);
        return ans;
    }
};`,
    python: `class Solution:
    def maximumImportance(self, n: int, roads: List[List[int]]) -> int:
        deg = [0] * n
        for a, b in roads:
            deg[a] += 1; deg[b] += 1
        deg.sort()
        return sum(d * (i + 1) for i, d in enumerate(deg))`,
    java: `class Solution {
    public long maximumImportance(int n, int[][] roads) {
        long[] deg = new long[n];
        for (int[] r : roads) { deg[r[0]]++; deg[r[1]]++; }
        Arrays.sort(deg);
        long ans = 0;
        for (int i = 0; i < n; i++) ans += deg[i] * (i + 1);
        return ans;
    }
}`,
    complexity: 'O(n log n + E) time · O(n) space',
  },
  2316: {
    cpp: `class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
public:
    long long countPairs(int n, vector<vector<int>>& edges) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges) unite(e[0], e[1]);
        unordered_map<int, long long> size;
        for (int i = 0; i < n; i++) size[find(i)]++;
        long long unreachable = 0;
        for (auto& [root, cnt] : size)
            unreachable += cnt * (n - cnt);
        return unreachable / 2;
    }
};`,
    python: `class Solution:
    def countPairs(self, n: int, edges: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            p[find(b)] = find(a)
        from collections import Counter
        sizes = Counter(find(i) for i in range(n))
        unreachable = sum(c * (n - c) for c in sizes.values())
        return unreachable // 2`,
    java: `class Solution {
    private int[] p;
    public long countPairs(int n, int[][] edges) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] e : edges) unite(e[0], e[1]);
        Map<Integer, Long> size = new HashMap<>();
        for (int i = 0; i < n; i++) size.merge(find(i), 1L, Long::sum);
        long unreachable = 0;
        for (long cnt : size.values()) unreachable += cnt * (n - cnt);
        return unreachable / 2;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}`,
    complexity: 'O(E · α(n)) time · O(n) space',
  },
  2477: {
    cpp: `class Solution {
    vector<vector<int>> adj;
    int seats;
    long long fuel = 0;
    int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj[u]) {
            if (v == parent) continue;
            int sub = dfs(v, u);
            size += sub;
            fuel += (sub + seats - 1) / seats;
        }
        return size;
    }
public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        adj.assign(n, {});
        this->seats = seats;
        fuel = 0;
        for (auto& r : roads) { adj[r[0]].push_back(r[1]); adj[r[1]].push_back(r[0]); }
        dfs(0, -1);
        return fuel;
    }
};`,
    python: `class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        adj = [[] for _ in range(n)]
        for a, b in roads:
            adj[a].append(b); adj[b].append(a)
        fuel = 0
        def dfs(u, parent):
            nonlocal fuel
            size = 1
            for v in adj[u]:
                if v == parent: continue
                sub = dfs(v, u)
                size += sub
                fuel += (sub + seats - 1) // seats
            return size
        dfs(0, -1)
        return fuel`,
    java: `class Solution {
    private List<List<Integer>> adj;
    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) { adj.get(r[0]).add(r[1]); adj.get(r[1]).add(r[0]); }
        long total = 0;
        for (int v : adj.get(0)) {
            int sub = dfs(v, 0);
            total += (sub + seats - 1) / seats;
        }
        return total;
    }
    private int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            size += dfs(v, u);
        }
        return size;
    }
}`,
    complexity: 'O(n) time · O(n) space',
  },
  2492: {
    cpp: `class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
public:
    int minScore(int n, vector<vector<int>>& roads) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& rd : roads) unite(rd[0] - 1, rd[1] - 1);
        int start = find(0), end = find(n - 1);
        if (start != end) return -1;
        int ans = INT_MAX;
        for (auto& rd : roads)
            if (find(rd[0] - 1) == start) ans = min(ans, rd[2]);
        return ans;
    }
};`,
    python: `class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b, _ in roads:
            p[find(b - 1)] = find(a - 1)
        if find(0) != find(n - 1): return -1
        return min(w for a, b, w in roads if find(a - 1) == find(0))`,
    java: `class Solution {
    private int[] p;
    public int minScore(int n, int[][] roads) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] rd : roads) unite(rd[0] - 1, rd[1] - 1);
        if (find(0) != find(n - 1)) return -1;
        int ans = Integer.MAX_VALUE;
        for (int[] rd : roads)
            if (find(rd[0] - 1) == find(0)) ans = Math.min(ans, rd[2]);
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}`,
    complexity: 'O(E · α(n)) time · O(n) space',
  },
};
