export const SOLUTIONS = {
  10: {
    lc: 10,
    method: "isMatch",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
    int m, n;
    vector<vector<int>> memo;
    bool dp(int i, int j, string& s, string& p) {
        if (j == n) return i == m;
        if (memo[i][j] != -1) return memo[i][j];
        bool match = (i < m && (s[i] == p[j] || p[j] == '.'));
        bool ans = false;
        if (j + 1 < n && p[j + 1] == '*') {
            ans = dp(i, j + 2, s, p) || (match && dp(i + 1, j, s, p));
        } else if (match) {
            ans = dp(i + 1, j + 1, s, p);
        }
        return memo[i][j] = ans;
    }
public:
    bool isMatch(string s, string p) {
        m = s.size(); n = p.size();
        memo.assign(m + 1, vector<int>(n + 1, -1));
        return dp(0, 0, s, p);
    }
};`,
    python: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        memo = {}
        def dp(i, j):
            if (i, j) in memo: return memo[(i, j)]
            if j == len(p): return i == len(s)
            match = i < len(s) and (s[i] == p[j] or p[j] == '.')
            if j + 1 < len(p) and p[j + 1] == '*':
                ans = dp(i, j + 2) or (match and dp(i + 1, j))
            else:
                ans = match and dp(i + 1, j + 1)
            memo[(i, j)] = ans
            return ans
        return dp(0, 0)`,
    java: `class Solution {
    Boolean[][] memo;
    public boolean isMatch(String s, String p) {
        memo = new Boolean[s.length() + 1][p.length() + 1];
        return dp(0, 0, s, p);
    }
    private boolean dp(int i, int j, String s, String p) {
        if (memo[i][j] != null) return memo[i][j];
        if (j == p.length()) return memo[i][j] = (i == s.length());
        boolean match = i < s.length() && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');
        boolean ans;
        if (j + 1 < p.length() && p.charAt(j + 1) == '*')
            ans = dp(i, j + 2, s, p) || (match && dp(i + 1, j, s, p));
        else
            ans = match && dp(i + 1, j + 1, s, p);
        return memo[i][j] = ans;
    }
}`,
  },
  17: {
    lc: 17,
    method: "letterCombinations",
    time: "O(4^n)",
    space: "O(n)",
    complexity: "O(4^n) time · O(n) space",
    cpp: `class Solution {
    vector<string> keys = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    void dfs(string& digits, int i, string& path, vector<string>& res) {
        if (i == (int)digits.size()) { res.push_back(path); return; }
        for (char c : keys[digits[i] - '0']) {
            path.push_back(c);
            dfs(digits, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.empty()) return res;
        string path;
        dfs(digits, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits: return []
        keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        res = []
        def dfs(i, path):
            if i == len(digits):
                res.append(''.join(path)); return
            for c in keys[int(digits[i])]:
                path.append(c); dfs(i + 1, path); path.pop()
        dfs(0, [])
        return res`,
    java: `class Solution {
    private static final String[] KEYS = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.isEmpty()) return res;
        dfs(digits, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(String digits, int i, StringBuilder path, List<String> res) {
        if (i == digits.length()) { res.add(path.toString()); return; }
        for (char c : KEYS[digits.charAt(i) - '0'].toCharArray()) {
            path.append(c);
            dfs(digits, i + 1, path, res);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`,
  },
  21: {
    lc: 21,
    method: "mergeTwoLists",
    time: "O(n + m)",
    space: "O(n + m)",
    complexity: "O(n + m) time · O(n + m) space",
    cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2;
        if (!l2) return l1;
        if (l1->val <= l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        }
        l2->next = mergeTwoLists(l1, l2->next);
        return l2;
    }
};`,
    python: `class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        if not l1: return l2
        if not l2: return l1
        if l1.val <= l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        l2.next = self.mergeTwoLists(l1, l2.next)
        return l2`,
    java: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        if (l1.val <= l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        }
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}`,
  },
  22: {
    lc: 22,
    method: "generateParenthesis",
    time: "O(4^n / √n)",
    space: "O(n)",
    complexity: "O(4^n / √n) time · O(n) space",
    cpp: `class Solution {
    void dfs(int open, int close, string& path, vector<string>& res) {
        if ((int)path.size() == open * 2) { res.push_back(path); return; }
        if (open > close) {
            path.push_back(')');
            dfs(open, close + 1, path, res);
            path.pop_back();
        }
        if (open > 0) {
            path.push_back('(');
            dfs(open - 1, close, path, res);
            path.pop_back();
        }
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string path;
        dfs(n, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def dfs(open_, close, path):
            if len(path) == 2 * n:
                res.append(''.join(path)); return
            if open_ > close:
                path.append(')'); dfs(open_, close + 1, path); path.pop()
            if open_ > 0:
                path.append('('); dfs(open_ - 1, close, path); path.pop()
        dfs(n, 0, [])
        return res`,
    java: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        dfs(n, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(int open, int close, StringBuilder path, List<String> res) {
        if (path.length() == open * 2) { res.add(path.toString()); return; }
        if (open > close) {
            path.append(')');
            dfs(open, close + 1, path, res);
            path.deleteCharAt(path.length() - 1);
        }
        if (open > 0) {
            path.append('(');
            dfs(open - 1, close, path, res);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`,
  },
  24: {
    lc: 24,
    method: "swapPairs",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* first = head;
        ListNode* second = head->next;
        first->next = swapPairs(second->next);
        second->next = first;
        return second;
    }
};`,
    python: `class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        first, second = head, head.next
        first.next = self.swapPairs(second.next)
        second.next = first
        return second`,
    java: `class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode first = head, second = head.next;
        first.next = swapPairs(second.next);
        second.next = first;
        return second;
    }
}`,
  },
  37: {
    lc: 37,
    method: "solveSudoku",
    time: "O(9^m)",
    space: "O(9)",
    complexity: "O(9^m) time · O(9) space",
    cpp: `class Solution {
    bool valid(vector<vector<char>>& b, int r, int c, char d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d) return false;
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (b[br + i][bc + j] == d) return false;
        return true;
    }
    bool dfs(vector<vector<char>>& b, int idx) {
        if (idx == 81) return true;
        int r = idx / 9, c = idx % 9;
        if (b[r][c] != '.') return dfs(b, idx + 1);
        for (char d = '1'; d <= '9'; d++) {
            if (!valid(b, r, c, d)) continue;
            b[r][c] = d;
            if (dfs(b, idx + 1)) return true;
            b[r][c] = '.';
        }
        return false;
    }
public:
    void solveSudoku(vector<vector<char>>& board) { dfs(board, 0); }
};`,
    python: `class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def valid(r, c, d):
            for i in range(9):
                if board[r][i] == d or board[i][c] == d: return False
            br, bc = (r // 3) * 3, (c // 3) * 3
            for i in range(3):
                for j in range(3):
                    if board[br + i][bc + j] == d: return False
            return True
        def dfs(idx):
            if idx == 81: return True
            r, c = divmod(idx, 9)
            if board[r][c] != '.': return dfs(idx + 1)
            for d in '123456789':
                if not valid(r, c, d): continue
                board[r][c] = d
                if dfs(idx + 1): return True
                board[r][c] = '.'
            return False
        dfs(0)`,
    java: `class Solution {
    public void solveSudoku(char[][] board) { dfs(board, 0); }
    private boolean dfs(char[][] b, int idx) {
        if (idx == 81) return true;
        int r = idx / 9, c = idx % 9;
        if (b[r][c] != '.') return dfs(b, idx + 1);
        for (char d = '1'; d <= '9'; d++) {
            if (!valid(b, r, c, d)) continue;
            b[r][c] = d;
            if (dfs(b, idx + 1)) return true;
            b[r][c] = '.';
        }
        return false;
    }
    private boolean valid(char[][] b, int r, int c, char d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d) return false;
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (b[br + i][bc + j] == d) return false;
        return true;
    }
}`,
  },
  39: {
    lc: 39,
    method: "combinationSum",
    time: "O(2^target)",
    space: "O(target)",
    complexity: "O(2^target) time · O(target) space",
    cpp: `class Solution {
    void dfs(vector<int>& c, int i, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (rem == 0) { res.push_back(path); return; }
        if (i == (int)c.size() || rem < 0) return;
        path.push_back(c[i]);
        dfs(c, i, rem - c[i], path, res);
        path.pop_back();
        dfs(c, i + 1, rem, path, res);
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(candidates, 0, target, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        def dfs(i, rem, path):
            if rem == 0: res.append(list(path)); return
            if i == len(candidates) or rem < 0: return
            path.append(candidates[i])
            dfs(i, rem - candidates[i], path)
            path.pop()
            dfs(i + 1, rem, path)
        dfs(0, target, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int i, int rem, List<Integer> path, List<List<Integer>> res) {
        if (rem == 0) { res.add(new ArrayList<>(path)); return; }
        if (i == c.length || rem < 0) return;
        path.add(c[i]);
        dfs(c, i, rem - c[i], path, res);
        path.remove(path.size() - 1);
        dfs(c, i + 1, rem, path, res);
    }
}`,
  },
  40: {
    lc: 40,
    method: "combinationSum2",
    time: "O(2^n)",
    space: "O(n)",
    complexity: "O(2^n) time · O(n) space",
    cpp: `class Solution {
    void dfs(vector<int>& c, int i, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (rem == 0) { res.push_back(path); return; }
        if (i == (int)c.size() || rem < 0) return;
        path.push_back(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.pop_back();
        while (i + 1 < (int)c.size() && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> path;
        dfs(candidates, 0, target, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def dfs(i, rem, path):
            if rem == 0: res.append(list(path)); return
            if i == len(candidates) or rem < 0: return
            path.append(candidates[i])
            dfs(i + 1, rem - candidates[i], path)
            path.pop()
            while i + 1 < len(candidates) and candidates[i + 1] == candidates[i]: i += 1
            dfs(i + 1, rem, path)
        dfs(0, target, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int i, int rem, List<Integer> path, List<List<Integer>> res) {
        if (rem == 0) { res.add(new ArrayList<>(path)); return; }
        if (i == c.length || rem < 0) return;
        path.add(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.remove(path.size() - 1);
        while (i + 1 < c.length && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
}`,
  },
  44: {
    lc: 44,
    method: "isMatch",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
    vector<vector<int>> memo;
    bool dp(int i, int j, string& s, string& p) {
        if (j == (int)p.size()) return i == (int)s.size();
        if (memo[i][j] != -1) return memo[i][j];
        bool match = i < (int)s.size() && (p[j] == '?' || s[i] == p[j]);
        bool ans = false;
        if (p[j] == '*')
            ans = dp(i, j + 1, s, p) || (i < (int)s.size() && dp(i + 1, j, s, p));
        else if (match)
            ans = dp(i + 1, j + 1, s, p);
        return memo[i][j] = ans;
    }
public:
    bool isMatch(string s, string p) {
        memo.assign(s.size() + 1, vector<int>(p.size() + 1, -1));
        return dp(0, 0, s, p);
    }
};`,
    python: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        memo = {}
        def dp(i, j):
            if (i, j) in memo: return memo[(i, j)]
            if j == len(p): return i == len(s)
            match = i < len(s) and (p[j] == '?' or s[i] == p[j])
            if p[j] == '*':
                ans = dp(i, j + 1) or (i < len(s) and dp(i + 1, j))
            else:
                ans = match and dp(i + 1, j + 1)
            memo[(i, j)] = ans
            return ans
        return dp(0, 0)`,
    java: `class Solution {
    Boolean[][] memo;
    public boolean isMatch(String s, String p) {
        memo = new Boolean[s.length() + 1][p.length() + 1];
        return dp(0, 0, s, p);
    }
    private boolean dp(int i, int j, String s, String p) {
        if (memo[i][j] != null) return memo[i][j];
        if (j == p.length()) return memo[i][j] = (i == s.length());
        boolean match = i < s.length() && (p.charAt(j) == '?' || s.charAt(i) == p.charAt(j));
        boolean ans;
        if (p.charAt(j) == '*')
            ans = dp(i, j + 1, s, p) || (i < s.length() && dp(i + 1, j, s, p));
        else
            ans = match && dp(i + 1, j + 1, s, p);
        return memo[i][j] = ans;
    }
}`,
  },
  46: {
    lc: 46,
    method: "permute",
    time: "O(n · n!)",
    space: "O(n)",
    complexity: "O(n · n!) time · O(n) space",
    cpp: `class Solution {
    void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
        if (path.size() == nums.size()) { res.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true; path.push_back(nums[i]);
            dfs(nums, path, used, res);
            path.pop_back(); used[i] = false;
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size());
        dfs(nums, path, used, res);
        return res;
    }
};`,
    python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        def dfs(path, used):
            if len(path) == len(nums):
                res.append(list(path)); return
            for i, x in enumerate(nums):
                if used[i]: continue
                used[i] = True; path.append(x)
                dfs(path, used)
                path.pop(); used[i] = False
        dfs([], [False] * len(nums))
        return res`,
    java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    private void dfs(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> res) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true; path.add(nums[i]);
            dfs(nums, path, used, res);
            path.remove(path.size() - 1); used[i] = false;
        }
    }
}`,
  },
  47: {
    lc: 47,
    method: "permuteUnique",
    time: "O(n · n!)",
    space: "O(n)",
    complexity: "O(n · n!) time · O(n) space",
    cpp: `class Solution {
    void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
        if (path.size() == nums.size()) { res.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
            used[i] = true; path.push_back(nums[i]);
            dfs(nums, path, used, res);
            path.pop_back(); used[i] = false;
        }
    }
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size());
        dfs(nums, path, used, res);
        return res;
    }
};`,
    python: `class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def dfs(path, used):
            if len(path) == len(nums):
                res.append(list(path)); return
            for i, x in enumerate(nums):
                if used[i] or (i and nums[i] == nums[i - 1] and not used[i - 1]): continue
                used[i] = True; path.append(x)
                dfs(path, used)
                path.pop(); used[i] = False
        dfs([], [False] * len(nums))
        return res`,
    java: `class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    private void dfs(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> res) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
            used[i] = true; path.add(nums[i]);
            dfs(nums, path, used, res);
            path.remove(path.size() - 1); used[i] = false;
        }
    }
}`,
  },
  50: {
    lc: 50,
    method: "myPow",
    time: "O(log n)",
    space: "O(log n)",
    complexity: "O(log n) time · O(log n) space",
    cpp: `class Solution {
    double powRec(double x, long n) {
        if (n == 0) return 1;
        double half = powRec(x, n / 2);
        if (n % 2 == 0) return half * half;
        return half * half * x;
    }
public:
    double myPow(double x, int n) {
        long N = n;
        if (N < 0) return 1.0 / powRec(x, -N);
        return powRec(x, N);
    }
};`,
    python: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        def pow_rec(x, n):
            if n == 0: return 1.0
            half = pow_rec(x, n // 2)
            return half * half if n % 2 == 0 else half * half * x
        if n < 0: return 1.0 / pow_rec(x, -n)
        return pow_rec(x, n)`,
    java: `class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) return 1.0 / powRec(x, -N);
        return powRec(x, N);
    }
    private double powRec(double x, long n) {
        if (n == 0) return 1.0;
        double half = powRec(x, n / 2);
        return (n % 2 == 0) ? half * half : half * half * x;
    }
}`,
  },
  51: {
    lc: 51,
    method: "solveNQueens",
    time: "O(n!)",
    space: "O(n^2)",
    complexity: "O(n!) time · O(n^2) space",
    cpp: `class Solution {
    bool valid(int r, int c, vector<int>& cols, vector<int>& diag1, vector<int>& diag2) {
        return !cols[c] && !diag1[r - c + 50] && !diag2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& diag1, vector<int>& diag2,
             vector<string>& board, vector<vector<string>>& res) {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, diag1, diag2)) continue;
            cols[c] = diag1[r - c + 50] = diag2[r + c] = 1;
            board[r][c] = 'Q';
            dfs(r + 1, n, cols, diag1, diag2, board, res);
            board[r][c] = '.';
            cols[c] = diag1[r - c + 50] = diag2[r + c] = 0;
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        vector<int> cols(n), diag1(100), diag2(100);
        dfs(0, n, cols, diag1, diag2, board, res);
        return res;
    }
};`,
    python: `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = [['.'] * n for _ in range(n)]
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n:
                res.append([''.join(row) for row in board]); return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                board[r][c] = 'Q'
                dfs(r + 1)
                board[r][c] = '.'
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return res`,
    java: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n], board, res);
        return res;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2,
                     char[][] board, List<List<String>> res) {
        if (r == n) {
            List<String> snap = new ArrayList<>();
            for (char[] row : board) snap.add(new String(row));
            res.add(snap);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            board[r][c] = 'Q';
            dfs(r + 1, n, cols, d1, d2, board, res);
            board[r][c] = '.';
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}`,
  },
  52: {
    lc: 52,
    method: "totalNQueens",
    time: "O(n!)",
    space: "O(n)",
    complexity: "O(n!) time · O(n) space",
    cpp: `class Solution {
    int ans = 0;
    bool valid(int r, int c, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        return !cols[c] && !d1[r - c + 50] && !d2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, d1, d2)) continue;
            cols[c] = d1[r - c + 50] = d2[r + c] = 1;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + 50] = d2[r + c] = 0;
        }
    }
public:
    int totalNQueens(int n) {
        vector<int> cols(n), d1(100), d2(100);
        dfs(0, n, cols, d1, d2);
        return ans;
    }
};`,
    python: `class Solution:
    def totalNQueens(self, n: int) -> int:
        self.ans = 0
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n: self.ans += 1; return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                dfs(r + 1)
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int totalNQueens(int n) {
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        return ans;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}`,
  },
  53: {
    lc: 53,
    method: "maxSubArray",
    time: "O(n log n)",
    space: "O(log n)",
    complexity: "O(n log n) time · O(log n) space",
    cpp: `class Solution {
    int cross(vector<int>& a, int lo, int mid, int hi) {
        int left = INT_MIN, sum = 0;
        for (int i = mid; i >= lo; i--) { sum += a[i]; left = max(left, sum); }
        int right = INT_MIN; sum = 0;
        for (int i = mid + 1; i <= hi; i++) { sum += a[i]; right = max(right, sum); }
        return left + right;
    }
    int dc(vector<int>& a, int lo, int hi) {
        if (lo == hi) return a[lo];
        int mid = lo + (hi - lo) / 2;
        return max({dc(a, lo, mid), dc(a, mid + 1, hi), cross(a, lo, mid, hi)});
    }
public:
    int maxSubArray(vector<int>& nums) { return dc(nums, 0, nums.size() - 1); }
};`,
    python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def cross(lo, mid, hi):
            left = float('-inf'); s = 0
            for i in range(mid, lo - 1, -1):
                s += nums[i]; left = max(left, s)
            right = float('-inf'); s = 0
            for i in range(mid + 1, hi + 1):
                s += nums[i]; right = max(right, s)
            return left + right
        def dc(lo, hi):
            if lo == hi: return nums[lo]
            mid = (lo + hi) // 2
            return max(dc(lo, mid), dc(mid + 1, hi), cross(lo, mid, hi))
        return dc(0, len(nums) - 1)`,
    java: `class Solution {
    public int maxSubArray(int[] nums) { return dc(nums, 0, nums.length - 1); }
    private int dc(int[] a, int lo, int hi) {
        if (lo == hi) return a[lo];
        int mid = lo + (hi - lo) / 2;
        return Math.max(Math.max(dc(a, lo, mid), dc(a, mid + 1, hi)), cross(a, lo, mid, hi));
    }
    private int cross(int[] a, int lo, int mid, int hi) {
        int left = Integer.MIN_VALUE, sum = 0;
        for (int i = mid; i >= lo; i--) { sum += a[i]; left = Math.max(left, sum); }
        int right = Integer.MIN_VALUE; sum = 0;
        for (int i = mid + 1; i <= hi; i++) { sum += a[i]; right = Math.max(right, sum); }
        return left + right;
    }
}`,
  },
  70: {
    lc: 70,
    method: "climbStairs",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
    unordered_map<int,int> memo;
    int dfs(int n) {
        if (n <= 2) return n;
        if (memo.count(n)) return memo[n];
        return memo[n] = dfs(n - 1) + dfs(n - 2);
    }
public:
    int climbStairs(int n) { return dfs(n); }
};`,
    python: `class Solution:
    def climbStairs(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 2: return k
            if k in memo: return memo[k]
            memo[k] = dfs(k - 1) + dfs(k - 2)
            return memo[k]
        return dfs(n)`,
    java: `class Solution {
    private Map<Integer, Integer> memo = new HashMap<>();
    public int climbStairs(int n) { return dfs(n); }
    private int dfs(int n) {
        if (n <= 2) return n;
        if (memo.containsKey(n)) return memo.get(n);
        int ans = dfs(n - 1) + dfs(n - 2);
        memo.put(n, ans);
        return ans;
    }
}`,
  },
  77: {
    lc: 77,
    method: "combine",
    time: "O(C(n,k) · k)",
    space: "O(k)",
    complexity: "O(C(n,k) · k) time · O(k) space",
    cpp: `class Solution {
    void dfs(int n, int k, int start, vector<int>& path, vector<vector<int>>& res) {
        if ((int)path.size() == k) { res.push_back(path); return; }
        for (int i = start; i <= n; i++) {
            path.push_back(i);
            dfs(n, k, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(n, k, 1, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []
        def dfs(start, path):
            if len(path) == k:
                res.append(list(path)); return
            for i in range(start, n + 1):
                path.append(i); dfs(i + 1, path); path.pop()
        dfs(1, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(n, k, 1, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int n, int k, int start, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i <= n; i++) {
            path.add(i);
            dfs(n, k, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
  },
  78: {
    lc: 78,
    method: "subsets",
    time: "O(n · 2^n)",
    space: "O(n)",
    complexity: "O(n · 2^n) time · O(n) space",
    cpp: `class Solution {
    void dfs(vector<int>& nums, int i, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int j = i; j < (int)nums.size(); j++) {
            path.push_back(nums[j]);
            dfs(nums, j + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(nums, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        def dfs(i, path):
            res.append(list(path))
            for j in range(i, len(nums)):
                path.append(nums[j]); dfs(j + 1, path); path.pop()
        dfs(0, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] nums, int i, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int j = i; j < nums.length; j++) {
            path.add(nums[j]);
            dfs(nums, j + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
  },
  79: {
    lc: 79,
    method: "exist",
    time: "O(m · n · 4^L)",
    space: "O(L)",
    complexity: "O(m · n · 4^L) time · O(L) space",
    cpp: `class Solution {
    int m, n;
    bool dfs(vector<vector<char>>& b, string& w, int i, int j, int k) {
        if (k == (int)w.size()) return true;
        if (i < 0 || j < 0 || i >= m || j >= n || b[i][j] != w[k]) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        bool found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1) ||
                     dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
        b[i][j] = tmp;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        m = board.size(); n = board[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
};`,
    python: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(i, j, k):
            if k == len(word): return True
            if i < 0 or j < 0 or i >= m or j >= n or board[i][j] != word[k]: return False
            tmp, board[i][j] = board[i][j], '#'
            found = any(dfs(i + di, j + dj, k + 1) for di, dj in ((1,0),(-1,0),(0,1),(0,-1)))
            board[i][j] = tmp
            return found
        return any(dfs(i, j, 0) for i in range(m) for j in range(n))`,
    java: `class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
    private boolean dfs(char[][] b, String w, int i, int j, int k) {
        if (k == w.length()) return true;
        if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] != w.charAt(k)) return false;
        char tmp = b[i][j]; b[i][j] = '#';
        boolean found = dfs(b, w, i + 1, j, k + 1) || dfs(b, w, i - 1, j, k + 1) ||
                        dfs(b, w, i, j + 1, k + 1) || dfs(b, w, i, j - 1, k + 1);
        b[i][j] = tmp;
        return found;
    }
}`,
  },
  90: {
    lc: 90,
    method: "subsetsWithDup",
    time: "O(n · 2^n)",
    space: "O(n)",
    complexity: "O(n · 2^n) time · O(n) space",
    cpp: `class Solution {
    void dfs(vector<int>& nums, int i, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int j = i; j < (int)nums.size(); j++) {
            if (j > i && nums[j] == nums[j - 1]) continue;
            path.push_back(nums[j]);
            dfs(nums, j + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        dfs(nums, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def dfs(i, path):
            res.append(list(path))
            for j in range(i, len(nums)):
                if j > i and nums[j] == nums[j - 1]: continue
                path.append(nums[j]); dfs(j + 1, path); path.pop()
        dfs(0, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] nums, int i, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int j = i; j < nums.length; j++) {
            if (j > i && nums[j] == nums[j - 1]) continue;
            path.add(nums[j]);
            dfs(nums, j + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
  },
  91: {
    lc: 91,
    method: "numDecodings",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
    vector<int> memo;
    int dfs(string& s, int i) {
        if (i == (int)s.size()) return 1;
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < (int)s.size()) {
            int two = stoi(s.substr(i, 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
public:
    int numDecodings(string s) {
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};`,
    python: `class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {}
        def dfs(i):
            if i == len(s): return 1
            if s[i] == '0': return 0
            if i in memo: return memo[i]
            ans = dfs(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i+2]) <= 26:
                ans += dfs(i + 2)
            memo[i] = ans
            return ans
        return dfs(0)`,
    java: `class Solution {
    private int[] memo;
    public int numDecodings(String s) {
        memo = new int[s.length()];
        Arrays.fill(memo, -1);
        return dfs(s, 0);
    }
    private int dfs(String s, int i) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < s.length()) {
            int two = Integer.parseInt(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
}`,
  },
  93: {
    lc: 93,
    method: "restoreIpAddresses",
    time: "O(1)",
    space: "O(1)",
    complexity: "O(1) time · O(1) space",
    cpp: `class Solution {
    bool valid(string& seg) {
        if (seg.empty() || seg.size() > 3) return false;
        if (seg.size() > 1 && seg[0] == '0') return false;
        return stoi(seg) <= 255;
    }
    void dfs(string& s, int i, int parts, vector<string>& path, vector<string>& res) {
        if (parts == 4) {
            if (i == (int)s.size()) res.push_back(path[0]+"."+path[1]+"."+path[2]+"."+path[3]);
            return;
        }
        for (int j = i; j < min(i + 3, (int)s.size()); j++) {
            string seg = s.substr(i, j - i + 1);
            if (!valid(seg)) continue;
            path.push_back(seg);
            dfs(s, j + 1, parts + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res, path;
        dfs(s, 0, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []
        def valid(seg):
            return seg and len(seg) <= 3 and (len(seg) == 1 or seg[0] != '0') and int(seg) <= 255
        def dfs(i, parts, path):
            if parts == 4:
                if i == len(s): res.append('.'.join(path))
                return
            for j in range(i, min(i + 3, len(s))):
                seg = s[i:j + 1]
                if not valid(seg): continue
                path.append(seg); dfs(j + 1, parts + 1, path); path.pop()
        dfs(0, 0, [])
        return res`,
    java: `class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new ArrayList<>();
        dfs(s, 0, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(String s, int i, int parts, List<String> path, List<String> res) {
        if (parts == 4) {
            if (i == s.length()) res.add(String.join(".", path));
            return;
        }
        for (int j = i; j < Math.min(i + 3, s.length()); j++) {
            String seg = s.substring(i, j + 1);
            if (!valid(seg)) continue;
            path.add(seg);
            dfs(s, j + 1, parts + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
    private boolean valid(String seg) {
        if (seg.isEmpty() || seg.length() > 3) return false;
        if (seg.length() > 1 && seg.charAt(0) == '0') return false;
        return Integer.parseInt(seg) <= 255;
    }
}`,
  },
  96: {
    lc: 96,
    method: "numTrees",
    time: "O(n^2)",
    space: "O(n)",
    complexity: "O(n^2) time · O(n) space",
    cpp: `class Solution {
    vector<int> memo;
    int dfs(int n) {
        if (n <= 1) return 1;
        if (memo[n]) return memo[n];
        int total = 0;
        for (int i = 1; i <= n; i++)
            total += dfs(i - 1) * dfs(n - i);
        return memo[n] = total;
    }
public:
    int numTrees(int n) {
        memo.assign(n + 1, 0);
        return dfs(n);
    }
};`,
    python: `class Solution:
    def numTrees(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 1: return 1
            if k in memo: return memo[k]
            total = sum(dfs(i - 1) * dfs(k - i) for i in range(1, k + 1))
            memo[k] = total
            return total
        return dfs(n)`,
    java: `class Solution {
    private int[] memo;
    public int numTrees(int n) {
        memo = new int[n + 1];
        return dfs(n);
    }
    private int dfs(int n) {
        if (n <= 1) return 1;
        if (memo[n] != 0) return memo[n];
        int total = 0;
        for (int i = 1; i <= n; i++)
            total += dfs(i - 1) * dfs(n - i);
        return memo[n] = total;
    }
}`,
  },
  98: {
    lc: 98,
    method: "isValidBST",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
    bool validate(TreeNode* node, long long lo, long long hi) {
        if (!node) return true;
        if (node->val <= lo || node->val >= hi) return false;
        return validate(node->left, lo, node->val) &&
               validate(node->right, node->val, hi);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LLONG_MIN, LLONG_MAX);
    }
};`,
    python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, lo, hi):
            if not node: return True
            if not (lo < node.val < hi): return False
            return validate(node.left, lo, node.val) and validate(node.right, node.val, hi)
        return validate(root, float('-inf'), float('inf'))`,
    java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean validate(TreeNode node, long lo, long hi) {
        if (node == null) return true;
        if (node.val <= lo || node.val >= hi) return false;
        return validate(node.left, lo, node.val) && validate(node.right, node.val, hi);
    }
}`,
  },
  100: {
    lc: 100,
    method: "isSameTree",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};`,
    python: `class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q: return True
        if not p or not q or p.val != q.val: return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
    java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
  },
  101: {
    lc: 101,
    method: "isSymmetric",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
    bool mirror(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return mirror(a->left, b->right) && mirror(a->right, b->left);
    }
public:
    bool isSymmetric(TreeNode* root) {
        return !root || mirror(root->left, root->right);
    }
};`,
    python: `class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def mirror(a, b):
            if not a and not b: return True
            if not a or not b or a.val != b.val: return False
            return mirror(a.left, b.right) and mirror(a.right, b.left)
        return not root or mirror(root.left, root.right)`,
    java: `class Solution {
    private boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }
    public boolean isSymmetric(TreeNode root) {
        return root == null || mirror(root.left, root.right);
    }
}`,
  },
  104: {
    lc: 104,
    method: "maxDepth",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
    python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
  },
  105: {
    lc: 105,
    method: "buildTree",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
    unordered_map<int,int> idx;
    int pre;
    TreeNode* build(vector<int>& preorder, int l, int r) {
        if (l > r) return nullptr;
        int val = preorder[pre++];
        TreeNode* node = new TreeNode(val);
        node->left  = build(preorder, l, idx[val] - 1);
        node->right = build(preorder, idx[val] + 1, r);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        pre = 0;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
};`,
    python: `class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        self.pre = 0
        def build(l, r):
            if l > r: return None
            val = preorder[self.pre]; self.pre += 1
            node = TreeNode(val)
            node.left  = build(l, idx[val] - 1)
            node.right = build(idx[val] + 1, r)
            return node
        return build(0, len(inorder) - 1)`,
    java: `class Solution {
    private Map<Integer,Integer> idx = new HashMap<>();
    private int pre = 0;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] preorder, int l, int r) {
        if (l > r) return null;
        int val = preorder[pre++];
        TreeNode node = new TreeNode(val);
        node.left  = build(preorder, l, idx.get(val) - 1);
        node.right = build(preorder, idx.get(val) + 1, r);
        return node;
    }
}`,
  },
  112: {
    lc: 112,
    method: "hasPathSum",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return root->val == targetSum;
        return hasPathSum(root->left,  targetSum - root->val) ||
               hasPathSum(root->right, targetSum - root->val);
    }
};`,
    python: `class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root: return False
        if not root.left and not root.right: return root.val == targetSum
        rem = targetSum - root.val
        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)`,
    java: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        int rem = targetSum - root.val;
        return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
    }
}`,
  },
  114: {
    lc: 114,
    method: "flatten",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
    TreeNode* prev = nullptr;
    void dfs(TreeNode* node) {
        if (!node) return;
        dfs(node->right);
        dfs(node->left);
        node->right = prev;
        node->left = nullptr;
        prev = node;
    }
public:
    void flatten(TreeNode* root) { dfs(root); }
};`,
    python: `class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        self.prev = None
        def dfs(node):
            if not node: return
            dfs(node.right)
            dfs(node.left)
            node.right = self.prev
            node.left = None
            self.prev = node
        dfs(root)`,
    java: `class Solution {
    private TreeNode prev;
    public void flatten(TreeNode root) {
        prev = null;
        dfs(root);
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.right);
        dfs(node.left);
        node.right = prev;
        node.left = null;
        prev = node;
    }
}`,
  },
  131: {
    lc: 131,
    method: "partition",
    time: "O(n · 2^n)",
    space: "O(n)",
    complexity: "O(n · 2^n) time · O(n) space",
    cpp: `class Solution {
    bool isPal(string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    }
    void dfs(string& s, int i, vector<string>& path, vector<vector<string>>& res) {
        if (i == (int)s.size()) { res.push_back(path); return; }
        for (int j = i; j < (int)s.size(); j++) {
            if (!isPal(s, i, j)) continue;
            path.push_back(s.substr(i, j - i + 1));
            dfs(s, j + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> path;
        dfs(s, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        def pal(l, r):
            return all(s[k] == s[r - (k - l)] for k in range(l, (l + r + 1) // 2))
        def dfs(i, path):
            if i == len(s):
                res.append(list(path)); return
            for j in range(i, len(s)):
                if not pal(i, j): continue
                path.append(s[i:j + 1]); dfs(j + 1, path); path.pop()
        dfs(0, [])
        return res`,
    java: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        dfs(s, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(String s, int i, List<String> path, List<List<String>> res) {
        if (i == s.length()) { res.add(new ArrayList<>(path)); return; }
        for (int j = i; j < s.length(); j++) {
            if (!isPal(s, i, j)) continue;
            path.add(s.substring(i, j + 1));
            dfs(s, j + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
    private boolean isPal(String s, int l, int r) {
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
}`,
  },
  139: {
    lc: 139,
    method: "wordBreak",
    time: "O(n^2)",
    space: "O(n)",
    complexity: "O(n^2) time · O(n) space",
    cpp: `class Solution {
    unordered_set<string> dict;
    vector<int> memo;
    bool dfs(string& s, int i) {
        if (i == (int)s.size()) return true;
        if (memo[i] != -1) return memo[i];
        for (int j = i + 1; j <= (int)s.size(); j++) {
            if (dict.count(s.substr(i, j - i)) && dfs(s, j))
                return memo[i] = true;
        }
        return memo[i] = false;
    }
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        for (auto& w : wordDict) dict.insert(w);
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};`,
    python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        memo = {}
        def dfs(i):
            if i == len(s): return True
            if i in memo: return memo[i]
            for j in range(i + 1, len(s) + 1):
                if s[i:j] in words and dfs(j):
                    memo[i] = True; return True
            memo[i] = False; return False
        return dfs(0)`,
    java: `class Solution {
    private Set<String> dict;
    private Boolean[] memo;
    public boolean wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        memo = new Boolean[s.length()];
        return dfs(s, 0);
    }
    private boolean dfs(String s, int i) {
        if (i == s.length()) return true;
        if (memo[i] != null) return memo[i];
        for (int j = i + 1; j <= s.length(); j++) {
            if (dict.contains(s.substring(i, j)) && dfs(s, j))
                return memo[i] = true;
        }
        return memo[i] = false;
    }
}`,
  },
  140: {
    lc: 140,
    method: "wordBreak",
    time: "O(n · 2^n)",
    space: "O(n)",
    complexity: "O(n · 2^n) time · O(n) space",
    cpp: `class Solution {
    unordered_set<string> dict;
    unordered_map<int, vector<string>> memo;
    vector<string> dfs(string& s, int i) {
        if (i == (int)s.size()) return {""};
        if (memo.count(i)) return memo[i];
        vector<string> res;
        for (int j = i + 1; j <= (int)s.size(); j++) {
            string w = s.substr(i, j - i);
            if (!dict.count(w)) continue;
            for (auto& tail : dfs(s, j)) {
                if (tail.empty()) res.push_back(w);
                else res.push_back(w + " " + tail);
            }
        }
        return memo[i] = res;
    }
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        for (auto& w : wordDict) dict.insert(w);
        return dfs(s, 0);
    }
};`,
    python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        words = set(wordDict)
        memo = {}
        def dfs(i):
            if i == len(s): return ['']
            if i in memo: return memo[i]
            res = []
            for j in range(i + 1, len(s) + 1):
                w = s[i:j]
                if w not in words: continue
                for tail in dfs(j):
                    res.append(w if not tail else w + ' ' + tail)
            memo[i] = res
            return res
        return dfs(0)`,
    java: `class Solution {
    private Set<String> dict;
    private Map<Integer, List<String>> memo = new HashMap<>();
    public List<String> wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        return dfs(s, 0);
    }
    private List<String> dfs(String s, int i) {
        if (i == s.length()) return List.of("");
        if (memo.containsKey(i)) return memo.get(i);
        List<String> res = new ArrayList<>();
        for (int j = i + 1; j <= s.length(); j++) {
            String w = s.substring(i, j);
            if (!dict.contains(w)) continue;
            for (String tail : dfs(s, j)) {
                res.add(tail.isEmpty() ? w : w + " " + tail);
            }
        }
        memo.put(i, res);
        return res;
    }
}`,
  },
  148: {
    lc: 148,
    method: "sortList",
    time: "O(n log n)",
    space: "O(log n)",
    complexity: "O(n log n) time · O(log n) space",
    cpp: `class Solution {
    ListNode* merge(ListNode* a, ListNode* b) {
        ListNode dummy(0); ListNode* tail = &dummy;
        while (a && b) {
            if (a->val <= b->val) { tail->next = a; a = a->next; }
            else { tail->next = b; b = b->next; }
            tail = tail->next;
        }
        tail->next = a ? a : b;
        return dummy.next;
    }
    pair<ListNode*,ListNode*> split(ListNode* head) {
        ListNode* slow = head; ListNode* fast = head; ListNode* prev = nullptr;
        while (fast && fast->next) { prev = slow; slow = slow->next; fast = fast->next->next; }
        if (prev) prev->next = nullptr;
        return {head, slow};
    }
    ListNode* sort(ListNode* head) {
        if (!head || !head->next) return head;
        auto [left, right] = split(head);
        return merge(sort(left), sort(right));
    }
public:
    ListNode* sortList(ListNode* head) { return sort(head); }
};`,
    python: `class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        slow, fast, prev = head, head, None
        while fast and fast.next:
            prev, slow = slow, slow.next
            fast = fast.next.next
        prev.next = None
        return self.merge(self.sortList(head), self.sortList(slow))
    def merge(self, a, b):
        dummy = ListNode(0); tail = dummy
        while a and b:
            if a.val <= b.val: tail.next, a = a, a.next
            else: tail.next, b = b, b.next
            tail = tail.next
        tail.next = a or b
        return dummy.next`,
    java: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow; slow = slow.next; fast = fast.next.next;
        }
        prev.next = null;
        return merge(sortList(head), sortList(slow));
    }
    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}`,
  },
  198: {
    lc: 198,
    method: "rob",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
    vector<int> memo;
    int dfs(vector<int>& nums, int i) {
        if (i >= (int)nums.size()) return 0;
        if (memo[i] != -1) return memo[i];
        return memo[i] = max(nums[i] + dfs(nums, i + 2), dfs(nums, i + 1));
    }
public:
    int rob(vector<int>& nums) {
        memo.assign(nums.size(), -1);
        return dfs(nums, 0);
    }
};`,
    python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        memo = {}
        def dfs(i):
            if i >= len(nums): return 0
            if i in memo: return memo[i]
            memo[i] = max(nums[i] + dfs(i + 2), dfs(i + 1))
            return memo[i]
        return dfs(0)`,
    java: `class Solution {
    private int[] memo;
    public int rob(int[] nums) {
        memo = new int[nums.length];
        Arrays.fill(memo, -1);
        return dfs(nums, 0);
    }
    private int dfs(int[] nums, int i) {
        if (i >= nums.length) return 0;
        if (memo[i] != -1) return memo[i];
        return memo[i] = Math.max(nums[i] + dfs(nums, i + 2), dfs(nums, i + 1));
    }
}`,
  },
  206: {
    lc: 206,
    method: "reverseList",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};`,
    python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head`,
    java: `class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}`,
  },
  212: {
    lc: 212,
    method: "findWords",
    time: "O(m · n · 4^L)",
    space: "O(total chars)",
    complexity: "O(m · n · 4^L) time · O(total chars) space",
    cpp: `class Solution {
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
};`,
    python: `class Solution:
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
        return res`,
    java: `class Solution {
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
}`,
  },
  216: {
    lc: 216,
    method: "combinationSum3",
    time: "O(C(9,k))",
    space: "O(k)",
    complexity: "O(C(9,k)) time · O(k) space",
    cpp: `class Solution {
    void dfs(int k, int n, int start, vector<int>& path, vector<vector<int>>& res) {
        if (k == 0 && n == 0) { res.push_back(path); return; }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            path.push_back(i);
            dfs(k - 1, n - i, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(k, n, 1, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        def dfs(start, k, rem, path):
            if k == 0 and rem == 0: res.append(list(path)); return
            if k == 0 or rem <= 0: return
            for i in range(start, 10):
                path.append(i); dfs(i + 1, k - 1, rem - i, path); path.pop()
        dfs(1, k, n, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(k, n, 1, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int k, int n, int start, List<Integer> path, List<List<Integer>> res) {
        if (k == 0 && n == 0) { res.add(new ArrayList<>(path)); return; }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            path.add(i);
            dfs(k - 1, n - i, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
  },
  226: {
    lc: 226,
    method: "invertTree",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,
    python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root: return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
    java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}`,
  },
  231: {
    lc: 231,
    method: "isPowerOfTwo",
    time: "O(log n)",
    space: "O(log n)",
    complexity: "O(log n) time · O(log n) space",
    cpp: `class Solution {
public:
    bool isPowerOfTwo(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }
};`,
    python: `class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n <= 0: return False
        if n == 1: return True
        if n % 2: return False
        return self.isPowerOfTwo(n // 2)`,
    java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }
}`,
  },
  241: {
    lc: 241,
    method: "diffWaysToCompute",
    time: "O(4^n / √n)",
    space: "O(n)",
    complexity: "O(4^n / √n) time · O(n) space",
    cpp: `class Solution {
public:
    vector<int> diffWaysToCompute(string expression) {
        vector<int> res;
        for (int i = 0; i < (int)expression.size(); i++) {
            char c = expression[i];
            if (c != '+' && c != '-' && c != '*') continue;
            vector<int> left  = diffWaysToCompute(expression.substr(0, i));
            vector<int> right = diffWaysToCompute(expression.substr(i + 1));
            for (int a : left)
                for (int b : right) {
                    if (c == '+') res.push_back(a + b);
                    else if (c == '-') res.push_back(a - b);
                    else res.push_back(a * b);
                }
        }
        if (res.empty()) res.push_back(stoi(expression));
        return res;
    }
};`,
    python: `class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        res = []
        for i, c in enumerate(expression):
            if c not in '+-*': continue
            for a in self.diffWaysToCompute(expression[:i]):
                for b in self.diffWaysToCompute(expression[i + 1:]):
                    if c == '+': res.append(a + b)
                    elif c == '-': res.append(a - b)
                    else: res.append(a * b)
        return res if res else [int(expression)]`,
    java: `class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c != '+' && c != '-' && c != '*') continue;
            for (int a : diffWaysToCompute(expression.substring(0, i)))
                for (int b : diffWaysToCompute(expression.substring(i + 1))) {
                    if (c == '+') res.add(a + b);
                    else if (c == '-') res.add(a - b);
                    else res.add(a * b);
                }
        }
        if (res.isEmpty()) res.add(Integer.parseInt(expression));
        return res;
    }
}`,
  },
  282: {
    lc: 282,
    method: "addOperators",
    time: "O(4^n)",
    space: "O(n)",
    complexity: "O(4^n) time · O(n) space",
    cpp: `class Solution {
    void dfs(string& num, int i, long target, long curr, long prev, string& path, vector<string>& res) {
        if (i == (int)num.size()) {
            if (curr == target) res.push_back(path);
            return;
        }
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            long val = stol(num.substr(i, j - i + 1));
            string nxt = num.substr(i, j - i + 1);
            if (i == 0) {
                dfs(num, j + 1, target, val, val, nxt, res);
            } else {
                dfs(num, j + 1, target, curr + val, val, path + "+" + nxt, res);
                dfs(num, j + 1, target, curr - val, -val, path + "-" + nxt, res);
                dfs(num, j + 1, target, curr - prev + prev * val, prev * val, path + "*" + nxt, res);
            }
        }
    }
public:
    vector<string> addOperators(string num, int target) {
        vector<string> res;
        string path;
        dfs(num, 0, target, 0, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        def dfs(i, curr, prev, path):
            if i == len(num):
                if curr == target: res.append(path)
                return
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = int(num[i:j + 1])
                if i == 0:
                    dfs(j + 1, val, val, str(val))
                else:
                    dfs(j + 1, curr + val, val, path + '+' + str(val))
                    dfs(j + 1, curr - val, -val, path + '-' + str(val))
                    dfs(j + 1, curr - prev + prev * val, prev * val, path + '*' + str(val))
        dfs(0, 0, 0, '')
        return res`,
    java: `class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> res = new ArrayList<>();
        dfs(num, 0, target, 0, 0, "", res);
        return res;
    }
    private void dfs(String num, int i, long target, long curr, long prev, String path, List<String> res) {
        if (i == num.length()) {
            if (curr == target) res.add(path);
            return;
        }
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            long val = Long.parseLong(num.substring(i, j + 1));
            if (i == 0) dfs(num, j + 1, target, val, val, String.valueOf(val), res);
            else {
                dfs(num, j + 1, target, curr + val, val, path + "+" + val, res);
                dfs(num, j + 1, target, curr - val, -val, path + "-" + val, res);
                dfs(num, j + 1, target, curr - prev + prev * val, prev * val, path + "*" + val, res);
            }
        }
    }
}`,
  },
  306: {
    lc: 306,
    method: "isAdditiveNumber",
    time: "O(n^2)",
    space: "O(n)",
    complexity: "O(n^2) time · O(n) space",
    cpp: `class Solution {
    bool dfs(string& s, int i, long long a, long long b) {
        if (i == (int)s.size()) return true;
        string nxt = s.substr(i);
        if (nxt.size() > 1 && nxt[0] == '0') return false;
        long long sum = a + b;
        if (nxt.size() > to_string(sum).size()) return false;
        if (nxt.substr(0, to_string(sum).size()) != to_string(sum)) return false;
        return dfs(s, i + to_string(sum).size(), b, sum);
    }
public:
    bool isAdditiveNumber(string num) {
        int n = num.size();
        for (int i = 1; i < n; i++) {
            if (num[0] == '0' && i > 1) break;
            for (int j = i + 1; j < n; j++) {
                if (num[i] == '0' && j > i + 1) break;
                long long a = stoll(num.substr(0, i));
                long long b = stoll(num.substr(i, j - i));
                if (dfs(num, j, a, b)) return true;
            }
        }
        return false;
    }
};`,
    python: `class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        def dfs(i, a, b):
            if i == len(num): return True
            nxt = num[i:]
            if len(nxt) > 1 and nxt[0] == '0': return False
            s = str(a + b)
            if not nxt.startswith(s): return False
            return dfs(i + len(s), b, a + b)
        n = len(num)
        for i in range(1, n):
            if num[0] == '0' and i > 1: break
            for j in range(i + 1, n):
                if num[i] == '0' and j > i + 1: break
                if dfs(j, int(num[:i]), int(num[i:j])): return True
        return False`,
    java: `class Solution {
    public boolean isAdditiveNumber(String num) {
        for (int i = 1; i < num.length(); i++) {
            if (num.charAt(0) == '0' && i > 1) break;
            for (int j = i + 1; j < num.length(); j++) {
                if (num.charAt(i) == '0' && j > i + 1) break;
                if (dfs(num, j, Long.parseLong(num.substring(0, i)), Long.parseLong(num.substring(i, j))))
                    return true;
            }
        }
        return false;
    }
    private boolean dfs(String s, int i, long a, long b) {
        if (i == s.length()) return true;
        String nxt = s.substring(i);
        if (nxt.length() > 1 && nxt.charAt(0) == '0') return false;
        long sum = a + b;
        String sumStr = String.valueOf(sum);
        if (!nxt.startsWith(sumStr)) return false;
        return dfs(s, i + sumStr.length(), b, sum);
    }
}`,
  },
  326: {
    lc: 326,
    method: "isPowerOfThree",
    time: "O(log n)",
    space: "O(log n)",
    complexity: "O(log n) time · O(log n) space",
    cpp: `class Solution {
public:
    bool isPowerOfThree(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 3 != 0) return false;
        return isPowerOfThree(n / 3);
    }
};`,
    python: `class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        if n <= 0: return False
        if n == 1: return True
        if n % 3: return False
        return self.isPowerOfThree(n // 3)`,
    java: `class Solution {
    public boolean isPowerOfThree(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 3 != 0) return false;
        return isPowerOfThree(n / 3);
    }
}`,
  },
  344: {
    lc: 344,
    method: "reverseString",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
    void rev(vector<char>& s, int l, int r) {
        if (l >= r) return;
        swap(s[l], s[r]);
        rev(s, l + 1, r - 1);
    }
public:
    void reverseString(vector<char>& s) { rev(s, 0, s.size() - 1); }
};`,
    python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        def rev(l, r):
            if l >= r: return
            s[l], s[r] = s[r], s[l]
            rev(l + 1, r - 1)
        rev(0, len(s) - 1)`,
    java: `class Solution {
    public void reverseString(char[] s) { rev(s, 0, s.length - 1); }
    private void rev(char[] s, int l, int r) {
        if (l >= r) return;
        char tmp = s[l]; s[l] = s[r]; s[r] = tmp;
        rev(s, l + 1, r - 1);
    }
}`,
  },
  377: {
    lc: 377,
    method: "combinationSum4",
    time: "O(n · target)",
    space: "O(target)",
    complexity: "O(n · target) time · O(target) space",
    cpp: `class Solution {
    vector<int> memo;
    int dfs(vector<int>& nums, int target) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        if (memo[target] != -1) return memo[target];
        int ways = 0;
        for (int x : nums) ways += dfs(nums, target - x);
        return memo[target] = ways;
    }
public:
    int combinationSum4(vector<int>& nums, int target) {
        memo.assign(target + 1, -1);
        return dfs(nums, target);
    }
};`,
    python: `class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        memo = {}
        def dfs(t):
            if t == 0: return 1
            if t < 0: return 0
            if t in memo: return memo[t]
            memo[t] = sum(dfs(t - x) for x in nums)
            return memo[t]
        return dfs(target)`,
    java: `class Solution {
    private int[] memo;
    public int combinationSum4(int[] nums, int target) {
        memo = new int[target + 1];
        Arrays.fill(memo, -1);
        return dfs(nums, target);
    }
    private int dfs(int[] nums, int target) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        if (memo[target] != -1) return memo[target];
        int ways = 0;
        for (int x : nums) ways += dfs(nums, target - x);
        return memo[target] = ways;
    }
}`,
  },
  416: {
    lc: 416,
    method: "canPartition",
    time: "O(n · sum)",
    space: "O(sum)",
    complexity: "O(n · sum) time · O(sum) space",
    cpp: `class Solution {
    vector<vector<int>> memo;
    bool dfs(vector<int>& nums, int i, int rem) {
        if (rem == 0) return true;
        if (i == (int)nums.size() || rem < 0) return false;
        if (memo[i][rem] != -1) return memo[i][rem];
        return memo[i][rem] = dfs(nums, i + 1, rem - nums[i]) || dfs(nums, i + 1, rem);
    }
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        memo.assign(nums.size(), vector<int>(sum / 2 + 1, -1));
        return dfs(nums, 0, sum / 2);
    }
};`,
    python: `class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2: return False
        target = total // 2
        memo = {}
        def dfs(i, rem):
            if rem == 0: return True
            if i == len(nums) or rem < 0: return False
            if (i, rem) in memo: return memo[(i, rem)]
            memo[(i, rem)] = dfs(i + 1, rem - nums[i]) or dfs(i + 1, rem)
            return memo[(i, rem)]
        return dfs(0, target)`,
    java: `class Solution {
    private Boolean[][] memo;
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 != 0) return false;
        memo = new Boolean[nums.length][sum / 2 + 1];
        return dfs(nums, 0, sum / 2);
    }
    private boolean dfs(int[] nums, int i, int rem) {
        if (rem == 0) return true;
        if (i == nums.length || rem < 0) return false;
        if (memo[i][rem] != null) return memo[i][rem];
        return memo[i][rem] = dfs(nums, i + 1, rem - nums[i]) || dfs(nums, i + 1, rem);
    }
}`,
  },
  473: {
    lc: 473,
    method: "makesquare",
    time: "O(4 · 2^n)",
    space: "O(n)",
    complexity: "O(4 · 2^n) time · O(n) space",
    cpp: `class Solution {
    bool dfs(vector<int>& ms, vector<int>& sides, int i, int target) {
        if (i == (int)ms.size()) {
            return sides[0] == target && sides[1] == target && sides[2] == target && sides[3] == target;
        }
        for (int j = 0; j < 4; j++) {
            if (sides[j] + ms[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += ms[i];
            if (dfs(ms, sides, i + 1, target)) return true;
            sides[j] -= ms[i];
        }
        return false;
    }
public:
    bool makesquare(vector<int>& matchsticks) {
        int sum = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (sum % 4) return false;
        sort(matchsticks.rbegin(), matchsticks.rend());
        vector<int> sides(4);
        return dfs(matchsticks, sides, 0, sum / 4);
    }
};`,
    python: `class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total = sum(matchsticks)
        if total % 4: return False
        target = total // 4
        matchsticks.sort(reverse=True)
        sides = [0] * 4
        def dfs(i):
            if i == len(matchsticks):
                return all(s == target for s in sides)
            for j in range(4):
                if sides[j] + matchsticks[i] > target: continue
                if j and sides[j] == sides[j - 1]: continue
                sides[j] += matchsticks[i]
                if dfs(i + 1): return True
                sides[j] -= matchsticks[i]
            return False
        return dfs(0)`,
    java: `class Solution {
    public boolean makesquare(int[] matchsticks) {
        int sum = 0;
        for (int x : matchsticks) sum += x;
        if (sum % 4 != 0) return false;
        int target = sum / 4;
        Integer[] boxed = new Integer[matchsticks.length];
        for (int i = 0; i < matchsticks.length; i++) boxed[i] = matchsticks[i];
        Arrays.sort(boxed, Collections.reverseOrder());
        for (int i = 0; i < matchsticks.length; i++) matchsticks[i] = boxed[i];
        return dfs(matchsticks, new int[4], 0, target);
    }
    private boolean dfs(int[] ms, int[] sides, int i, int target) {
        if (i == ms.length) return sides[0] == target && sides[1] == target && sides[2] == target;
        for (int j = 0; j < 4; j++) {
            if (sides[j] + ms[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += ms[i];
            if (dfs(ms, sides, i + 1, target)) return true;
            sides[j] -= ms[i];
        }
        return false;
    }
}`,
  },
  494: {
    lc: 494,
    method: "findTargetSumWays",
    time: "O(n · sum)",
    space: "O(sum)",
    complexity: "O(n · sum) time · O(sum) space",
    cpp: `class Solution {
    unordered_map<long long,int> memo;
    int dfs(vector<int>& nums, int i, int target) {
        if (i == (int)nums.size()) return target == 0 ? 1 : 0;
        long long key = ((long long)i << 32) | (target + 1000);
        if (memo.count(key)) return memo[key];
        return memo[key] = dfs(nums, i + 1, target - nums[i]) + dfs(nums, i + 1, target + nums[i]);
    }
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        return dfs(nums, 0, target);
    }
};`,
    python: `class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        memo = {}
        def dfs(i, t):
            if i == len(nums): return 1 if t == 0 else 0
            if (i, t) in memo: return memo[(i, t)]
            memo[(i, t)] = dfs(i + 1, t - nums[i]) + dfs(i + 1, t + nums[i])
            return memo[(i, t)]
        return dfs(0, target)`,
    java: `class Solution {
    private Map<String, Integer> memo = new HashMap<>();
    public int findTargetSumWays(int[] nums, int target) {
        return dfs(nums, 0, target);
    }
    private int dfs(int[] nums, int i, int target) {
        if (i == nums.length) return target == 0 ? 1 : 0;
        String key = i + "," + target;
        if (memo.containsKey(key)) return memo.get(key);
        int ans = dfs(nums, i + 1, target - nums[i]) + dfs(nums, i + 1, target + nums[i]);
        memo.put(key, ans);
        return ans;
    }
}`,
  },
  509: {
    lc: 509,
    method: "fib",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
    vector<int> memo;
    int dfs(int n) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = dfs(n - 1) + dfs(n - 2);
    }
public:
    int fib(int n) {
        memo.assign(n + 1, -1);
        return dfs(n);
    }
};`,
    python: `class Solution:
    def fib(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 1: return k
            if k in memo: return memo[k]
            memo[k] = dfs(k - 1) + dfs(k - 2)
            return memo[k]
        return dfs(n)`,
    java: `class Solution {
    private int[] memo;
    public int fib(int n) {
        memo = new int[n + 1];
        Arrays.fill(memo, -1);
        return dfs(n);
    }
    private int dfs(int n) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = dfs(n - 1) + dfs(n - 2);
    }
}`,
  },
  526: {
    lc: 526,
    method: "countArrangement",
    time: "O(n!)",
    space: "O(n)",
    complexity: "O(n!) time · O(n) space",
    cpp: `class Solution {
    int ans = 0;
    void dfs(int n, int pos, vector<bool>& used) {
        if (pos > n) { ans++; return; }
        for (int i = 1; i <= n; i++) {
            if (used[i] || (i % pos != 0 && pos % i != 0)) continue;
            used[i] = true;
            dfs(n, pos + 1, used);
            used[i] = false;
        }
    }
public:
    int countArrangement(int n) {
        vector<bool> used(n + 1);
        dfs(n, 1, used);
        return ans;
    }
};`,
    python: `class Solution:
    def countArrangement(self, n: int) -> int:
        self.ans = 0
        used = [False] * (n + 1)
        def dfs(pos):
            if pos > n: self.ans += 1; return
            for i in range(1, n + 1):
                if used[i] or (i % pos and pos % i): continue
                used[i] = True; dfs(pos + 1); used[i] = False
        dfs(1)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int countArrangement(int n) {
        dfs(n, 1, new boolean[n + 1]);
        return ans;
    }
    private void dfs(int n, int pos, boolean[] used) {
        if (pos > n) { ans++; return; }
        for (int i = 1; i <= n; i++) {
            if (used[i] || (i % pos != 0 && pos % i != 0)) continue;
            used[i] = true;
            dfs(n, pos + 1, used);
            used[i] = false;
        }
    }
}`,
  },
  559: {
    lc: 559,
    method: "maxDepth",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
public:
    int maxDepth(Node* root) {
        if (!root) return 0;
        int best = 0;
        for (Node* child : root->children)
            best = max(best, maxDepth(child));
        return best + 1;
    }
};`,
    python: `class Solution:
    def maxDepth(self, root: 'Node') -> int:
        if not root: return 0
        return 1 + max((self.maxDepth(c) for c in root.children), default=0)`,
    java: `class Solution {
    public int maxDepth(Node root) {
        if (root == null) return 0;
        int best = 0;
        for (Node child : root.children)
            best = Math.max(best, maxDepth(child));
        return best + 1;
    }
}`,
  },
  698: {
    lc: 698,
    method: "canPartitionKSubsets",
    time: "O(k · 2^n)",
    space: "O(n)",
    complexity: "O(k · 2^n) time · O(n) space",
    cpp: `class Solution {
    bool dfs(vector<int>& nums, vector<int>& sides, int i, int target) {
        if (i == (int)nums.size()) {
            for (int s : sides) if (s != target) return false;
            return true;
        }
        for (int j = 0; j < (int)sides.size(); j++) {
            if (sides[j] + nums[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += nums[i];
            if (dfs(nums, sides, i + 1, target)) return true;
            sides[j] -= nums[i];
        }
        return false;
    }
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k) return false;
        sort(nums.rbegin(), nums.rend());
        vector<int> sides(k);
        return dfs(nums, sides, 0, sum / k);
    }
};`,
    python: `class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k: return False
        target = total // k
        nums.sort(reverse=True)
        sides = [0] * k
        def dfs(i):
            if i == len(nums):
                return all(s == target for s in sides)
            for j in range(k):
                if sides[j] + nums[i] > target: continue
                if j and sides[j] == sides[j - 1]: continue
                sides[j] += nums[i]
                if dfs(i + 1): return True
                sides[j] -= nums[i]
            return False
        return dfs(0)`,
    java: `class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % k != 0) return false;
        int target = sum / k;
        Integer[] boxed = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) boxed[i] = nums[i];
        Arrays.sort(boxed, Collections.reverseOrder());
        for (int i = 0; i < nums.length; i++) nums[i] = boxed[i];
        return dfs(nums, new int[k], 0, target);
    }
    private boolean dfs(int[] nums, int[] sides, int i, int target) {
        if (i == nums.length) {
            for (int s : sides) if (s != target) return false;
            return true;
        }
        for (int j = 0; j < sides.length; j++) {
            if (sides[j] + nums[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += nums[i];
            if (dfs(nums, sides, i + 1, target)) return true;
            sides[j] -= nums[i];
        }
        return false;
    }
}`,
  },
  784: {
    lc: 784,
    method: "letterCasePermutation",
    time: "O(n · 2^n)",
    space: "O(n)",
    complexity: "O(n · 2^n) time · O(n) space",
    cpp: `class Solution {
    void dfs(string& s, int i, string& path, vector<string>& res) {
        if (i == (int)s.size()) { res.push_back(path); return; }
        if (isalpha(s[i])) {
            path.push_back(tolower(s[i]));
            dfs(s, i + 1, path, res);
            path.back() = toupper(s[i]);
            dfs(s, i + 1, path, res);
            path.pop_back();
        } else {
            path.push_back(s[i]);
            dfs(s, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<string> letterCasePermutation(string s) {
        vector<string> res;
        string path;
        dfs(s, 0, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def letterCasePermutation(self, s: str) -> List[str]:
        res = []
        def dfs(i, path):
            if i == len(s):
                res.append(''.join(path)); return
            if s[i].isalpha():
                path.append(s[i].lower()); dfs(i + 1, path); path.pop()
                path.append(s[i].upper()); dfs(i + 1, path); path.pop()
            else:
                path.append(s[i]); dfs(i + 1, path); path.pop()
        dfs(0, [])
        return res`,
    java: `class Solution {
    public List<String> letterCasePermutation(String s) {
        List<String> res = new ArrayList<>();
        dfs(s, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(String s, int i, StringBuilder path, List<String> res) {
        if (i == s.length()) { res.add(path.toString()); return; }
        char c = s.charAt(i);
        if (Character.isLetter(c)) {
            path.append(Character.toLowerCase(c));
            dfs(s, i + 1, path, res);
            path.setCharAt(path.length() - 1, Character.toUpperCase(c));
            dfs(s, i + 1, path, res);
            path.deleteCharAt(path.length() - 1);
        } else {
            path.append(c);
            dfs(s, i + 1, path, res);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`,
  },
  842: {
    lc: 842,
    method: "splitIntoFibonacci",
    time: "O(n^2)",
    space: "O(n)",
    complexity: "O(n^2) time · O(n) space",
    cpp: `class Solution {
    vector<int> path;
    bool dfs(string& num, int i) {
        if (i == (int)num.size()) return path.size() >= 3;
        long long val = 0;
        for (int j = i; j < (int)num.size(); j++) {
            if (j > i && num[i] == '0') break;
            val = val * 10 + (num[j] - '0');
            if (val > INT_MAX) break;
            if (path.size() >= 2 && val != (long long)path[path.size()-2] + path.back()) continue;
            path.push_back((int)val);
            if (dfs(num, j + 1)) return true;
            path.pop_back();
        }
        return false;
    }
public:
    vector<int> splitIntoFibonacci(string num) {
        return dfs(num, 0) ? path : vector<int>{};
    }
};`,
    python: `class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        path = []
        def dfs(i):
            if i == len(num): return len(path) >= 3
            val = 0
            for j in range(i, len(num)):
                if j > i and num[i] == '0': break
                val = val * 10 + int(num[j])
                if val > 2**31 - 1: break
                if len(path) >= 2 and val != path[-2] + path[-1]: continue
                path.append(val)
                if dfs(j + 1): return True
                path.pop()
            return False
        return path if dfs(0) else []`,
    java: `class Solution {
    private List<Integer> path = new ArrayList<>();
    public List<Integer> splitIntoFibonacci(String num) {
        return dfs(num, 0) ? path : List.of();
    }
    private boolean dfs(String num, int i) {
        if (i == num.length()) return path.size() >= 3;
        long val = 0;
        for (int j = i; j < num.length(); j++) {
            if (j > i && num.charAt(i) == '0') break;
            val = val * 10 + (num.charAt(j) - '0');
            if (val > Integer.MAX_VALUE) break;
            if (path.size() >= 2 && val != (long) path.get(path.size() - 2) + path.get(path.size() - 1)) continue;
            path.add((int) val);
            if (dfs(num, j + 1)) return true;
            path.remove(path.size() - 1);
        }
        return false;
    }
}`,
  },
  912: {
    lc: 912,
    method: "sortArray",
    time: "O(n log n)",
    space: "O(n)",
    complexity: "O(n log n) time · O(n) space",
    cpp: `class Solution {
    void merge(vector<int>& a, int lo, int mid, int hi, vector<int>& tmp) {
        int i = lo, j = mid + 1, k = lo;
        while (i <= mid && j <= hi)
            tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        for (int t = lo; t <= hi; t++) a[t] = tmp[t];
    }
    void sort(vector<int>& a, int lo, int hi, vector<int>& tmp) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, lo, mid, tmp);
        sort(a, mid + 1, hi, tmp);
        merge(a, lo, mid, hi, tmp);
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        vector<int> tmp(nums.size());
        sort(nums, 0, nums.size() - 1, tmp);
        return nums;
    }
};`,
    python: `class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def merge(lo, mid, hi):
            tmp = nums[lo:hi + 1]
            i, j, k = 0, mid - lo + 1, lo
            while i <= mid - lo and j <= hi - lo:
                if tmp[i] <= tmp[j]:
                    nums[k] = tmp[i]; i += 1
                else:
                    nums[k] = tmp[j]; j += 1
                k += 1
            while i <= mid - lo:
                nums[k] = tmp[i]; i += 1; k += 1
            while j <= hi - lo:
                nums[k] = tmp[j]; j += 1; k += 1
        def sort(lo, hi):
            if lo >= hi: return
            mid = (lo + hi) // 2
            sort(lo, mid); sort(mid + 1, hi); merge(lo, mid, hi)
        sort(0, len(nums) - 1)
        return nums`,
    java: `class Solution {
    public int[] sortArray(int[] nums) {
        int[] tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1, tmp);
        return nums;
    }
    private void sort(int[] a, int lo, int hi, int[] tmp) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, lo, mid, tmp);
        sort(a, mid + 1, hi, tmp);
        merge(a, lo, mid, hi, tmp);
    }
    private void merge(int[] a, int lo, int mid, int hi, int[] tmp) {
        int i = lo, j = mid + 1, k = lo;
        while (i <= mid && j <= hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        for (int t = lo; t <= hi; t++) a[t] = tmp[t];
    }
}`,
  },
  938: {
    lc: 938,
    method: "rangeSumBST",
    time: "O(n)",
    space: "O(h)",
    complexity: "O(n) time · O(h) space",
    cpp: `class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;
        int sum = (root->val >= low && root->val <= high) ? root->val : 0;
        if (root->val > low)  sum += rangeSumBST(root->left, low, high);
        if (root->val < high) sum += rangeSumBST(root->right, low, high);
        return sum;
    }
};`,
    python: `class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root: return 0
        s = root.val if low <= root.val <= high else 0
        if root.val > low:  s += self.rangeSumBST(root.left, low, high)
        if root.val < high: s += self.rangeSumBST(root.right, low, high)
        return s`,
    java: `class Solution {
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;
        int sum = (root.val >= low && root.val <= high) ? root.val : 0;
        if (root.val > low)  sum += rangeSumBST(root.left, low, high);
        if (root.val < high) sum += rangeSumBST(root.right, low, high);
        return sum;
    }
}`,
  },
  980: {
    lc: 980,
    method: "uniquePathsIII",
    time: "O(4^(m·n))",
    space: "O(m · n)",
    complexity: "O(4^(m·n)) time · O(m · n) space",
    cpp: `class Solution {
    int ans = 0, empty = 1, sr, sc, er, ec;
    void dfs(vector<vector<int>>& g, int r, int c, int left) {
        if (r < 0 || c < 0 || r >= (int)g.size() || c >= (int)g[0].size() || g[r][c] == -1) return;
        if (r == er && c == ec) { if (left == 0) ans++; return; }
        g[r][c] = -1;
        dfs(g, r + 1, c, left - 1);
        dfs(g, r - 1, c, left - 1);
        dfs(g, r, c + 1, left - 1);
        dfs(g, r, c - 1, left - 1);
        g[r][c] = 0;
    }
public:
    int uniquePathsIII(vector<vector<int>>& grid) {
        for (int i = 0; i < (int)grid.size(); i++)
            for (int j = 0; j < (int)grid[0].size(); j++) {
                if (grid[i][j] == 1) { sr = i; sc = j; }
                else if (grid[i][j] == 2) { er = i; ec = j; }
                else if (grid[i][j] == 0) empty++;
            }
        dfs(grid, sr, sc, empty);
        return ans;
    }
};`,
    python: `class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        empty = 1; sr = sc = er = ec = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1: sr, sc = i, j
                elif grid[i][j] == 2: er, ec = i, j
                elif grid[i][j] == 0: empty += 1
        self.ans = 0
        def dfs(r, c, left):
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == -1: return
            if r == er and c == ec:
                if left == 0: self.ans += 1
                return
            grid[r][c] = -1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)): dfs(r + dr, c + dc, left - 1)
            grid[r][c] = 0
        dfs(sr, sc, empty)
        return self.ans`,
    java: `class Solution {
    private int ans = 0, empty = 1, sr, sc, er, ec;
    public int uniquePathsIII(int[][] grid) {
        for (int i = 0; i < grid.length; i++)
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) { sr = i; sc = j; }
                else if (grid[i][j] == 2) { er = i; ec = j; }
                else if (grid[i][j] == 0) empty++;
            }
        dfs(grid, sr, sc, empty);
        return ans;
    }
    private void dfs(int[][] g, int r, int c, int left) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] == -1) return;
        if (r == er && c == ec) { if (left == 0) ans++; return; }
        g[r][c] = -1;
        dfs(g, r + 1, c, left - 1); dfs(g, r - 1, c, left - 1);
        dfs(g, r, c + 1, left - 1); dfs(g, r, c - 1, left - 1);
        g[r][c] = 0;
    }
}`,
  },
  1079: {
    lc: 1079,
    method: "numTilePossibilities",
    time: "O(n!)",
    space: "O(n)",
    complexity: "O(n!) time · O(n) space",
    cpp: `class Solution {
    int dfs(vector<int>& cnt) {
        int ways = 0;
        for (int i = 0; i < 26; i++) {
            if (!cnt[i]) continue;
            cnt[i]--;
            ways += 1 + dfs(cnt);
            cnt[i]++;
        }
        return ways;
    }
public:
    int numTilePossibilities(string tiles) {
        vector<int> cnt(26);
        for (char c : tiles) cnt[c - 'A']++;
        return dfs(cnt);
    }
};`,
    python: `class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        from collections import Counter
        cnt = Counter(tiles)
        def dfs():
            ways = 0
            for c in list(cnt):
                if not cnt[c]: continue
                cnt[c] -= 1
                ways += 1 + dfs()
                cnt[c] += 1
            return ways
        return dfs()`,
    java: `class Solution {
    public int numTilePossibilities(String tiles) {
        int[] cnt = new int[26];
        for (char c : tiles.toCharArray()) cnt[c - 'A']++;
        return dfs(cnt);
    }
    private int dfs(int[] cnt) {
        int ways = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == 0) continue;
            cnt[i]--;
            ways += 1 + dfs(cnt);
            cnt[i]++;
        }
        return ways;
    }
}`,
  },
  1219: {
    lc: 1219,
    method: "getMaximumGold",
    time: "O(m · n · 4^k)",
    space: "O(k)",
    complexity: "O(m · n · 4^k) time · O(k) space",
    cpp: `class Solution {
    int m, n, best = 0;
    void dfs(vector<vector<int>>& grid, int r, int c, int gold) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        int take = grid[r][c];
        gold += take; best = max(best, gold);
        grid[r][c] = 0;
        dfs(grid, r + 1, c, gold);
        dfs(grid, r - 1, c, gold);
        dfs(grid, r, c + 1, gold);
        dfs(grid, r, c - 1, gold);
        grid[r][c] = take;
    }
public:
    int getMaximumGold(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) dfs(grid, i, j, 0);
        return best;
    }
};`,
    python: `class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        self.best = 0
        def dfs(r, c, gold):
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == 0: return
            take = grid[r][c]
            gold += take; self.best = max(self.best, gold)
            grid[r][c] = 0
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)): dfs(r + dr, c + dc, gold)
            grid[r][c] = take
        for i in range(m):
            for j in range(n):
                if grid[i][j]: dfs(i, j, 0)
        return self.best`,
    java: `class Solution {
    private int m, n, best = 0;
    public int getMaximumGold(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] != 0) dfs(grid, i, j, 0);
        return best;
    }
    private void dfs(int[][] grid, int r, int c, int gold) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        int take = grid[r][c];
        gold += take; best = Math.max(best, gold);
        grid[r][c] = 0;
        dfs(grid, r + 1, c, gold); dfs(grid, r - 1, c, gold);
        dfs(grid, r, c + 1, gold); dfs(grid, r, c - 1, gold);
        grid[r][c] = take;
    }
}`,
  },
  1922: {
    lc: 1922,
    method: "countGoodNumbers",
    time: "O(log n)",
    space: "O(log n)",
    complexity: "O(log n) time · O(log n) space",
    cpp: `class Solution {
    const int MOD = 1e9 + 7;
    long long powMod(long long x, long long n) {
        if (n == 0) return 1;
        long long half = powMod(x, n / 2);
        half = half * half % MOD;
        if (n % 2) half = half * x % MOD;
        return half;
    }
public:
    int countGoodNumbers(long long n) {
        long long evens = (n + 1) / 2;
        long long odds  = n / 2;
        return (int)(powMod(5, evens) * powMod(4, odds) % MOD);
    }
};`,
    python: `class Solution:
    def countGoodNumbers(self, n: int) -> int:
        MOD = 10**9 + 7
        def pow_mod(x, k):
            if k == 0: return 1
            half = pow_mod(x, k // 2)
            half = half * half % MOD
            if k % 2: half = half * x % MOD
            return half
        evens = (n + 1) // 2
        odds = n // 2
        return pow_mod(5, evens) * pow_mod(4, odds) % MOD`,
    java: `class Solution {
    private static final int MOD = 1_000_000_007;
    public int countGoodNumbers(long long n) {
        long evens = (n + 1) / 2;
        long odds = n / 2;
        return (int) (powMod(5, evens) * powMod(4, odds) % MOD);
    }
    private long powMod(long x, long n) {
        if (n == 0) return 1;
        long half = powMod(x, n / 2);
        half = half * half % MOD;
        if (n % 2 != 0) half = half * x % MOD;
        return half;
    }
}`,
  },
  1980: {
    lc: 1980,
    method: "findDifferentBinaryString",
    time: "O(n^2)",
    space: "O(n)",
    complexity: "O(n^2) time · O(n) space",
    cpp: `class Solution {
    bool has(string& s, int i, vector<string>& nums) {
        for (auto& t : nums) if (t[i] == s[i]) return true;
        return false;
    }
    bool dfs(string& s, int i, vector<string>& nums) {
        if (i == (int)s.size()) return true;
        s[i] = '0';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        s[i] = '1';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        return false;
    }
public:
    string findDifferentBinaryString(vector<string>& nums) {
        int n = nums.size();
        string s(n, '0');
        dfs(s, 0, nums);
        return s;
    }
};`,
    python: `class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        n = len(nums)
        def has(s, i):
            return any(t[i] == s[i] for t in nums)
        def dfs(i, path):
            if i == n: return True
            for bit in '01':
                path.append(bit)
                if not has(path, i) and dfs(i + 1, path): return True
                path.pop()
            return False
        path = []
        dfs(0, path)
        return ''.join(path)`,
    java: `class Solution {
    public String findDifferentBinaryString(String[] nums) {
        int n = nums.length;
        char[] s = new char[n];
        return dfs(s, 0, nums) ? new String(s) : "";
    }
    private boolean dfs(char[] s, int i, String[] nums) {
        if (i == s.length) return true;
        s[i] = '0';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        s[i] = '1';
        if (!has(s, i, nums) && dfs(s, i + 1, nums)) return true;
        return false;
    }
    private boolean has(char[] s, int i, String[] nums) {
        for (String t : nums) if (t.charAt(i) == s[i]) return true;
        return false;
    }
}`,
  },
};
