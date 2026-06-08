export const SOLUTIONS = {
  5: {
    lc: 5,
    method: "longestPalindrome",
    time: "O(n²)",
    space: "O(1)",
    complexity: "O(n²) time · O(1) space",
    cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 0, n = s.size();
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
            if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
        };
        for (int i = 0; i < n; i++) { expand(i, i); expand(i, i + 1); }
        return s.substr(start, maxLen);
    }
};`,
    python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        start = maxLen = 0
        n = len(s)
        def expand(l, r):
            nonlocal start, maxLen
            while l >= 0 and r < n and s[l] == s[r]:
                l -= 1; r += 1
            if r - l - 1 > maxLen:
                start, maxLen = l + 1, r - l - 1
        for i in range(n):
            expand(i, i)
            expand(i, i + 1)
        return s[start:start + maxLen]`,
    java: `class Solution {
    int start = 0, maxLen = 0;
    public String longestPalindrome(String s) {
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return s.substring(start, start + maxLen);
    }
    private void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
    }
}`,
  },
  32: {
    lc: 32,
    method: "longestValidParentheses",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size(), ans = 0;
        vector<int> dp(n, 0);
        for (int i = 1; i < n; i++) {
            if (s[i] == ')') {
                if (s[i - 1] == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
                }
                ans = max(ans, dp[i]);
            }
        }
        return ans;
    }
};`,
    python: `class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        dp = [0] * n
        ans = 0
        for i in range(1, n):
            if s[i] == ')':
                if s[i - 1] == '(':
                    dp[i] = (dp[i - 2] if i >= 2 else 0) + 2
                elif i - dp[i - 1] - 1 >= 0 and s[i - dp[i - 1] - 1] == '(':
                    dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] if i - dp[i - 1] - 2 >= 0 else 0)
                ans = max(ans, dp[i])
        return ans`,
    java: `class Solution {
    public int longestValidParentheses(String s) {
        int n = s.length(), ans = 0;
        int[] dp = new int[n];
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == ')') {
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] - 1 >= 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
                }
                ans = Math.max(ans, dp[i]);
            }
        }
        return ans;
    }
}`,
  },
  45: {
    lc: 45,
    method: "jump",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < (int)nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            if (i == curEnd) { jumps++; curEnd = farthest; }
        }
        return jumps;
    }
};`,
    python: `class Solution:
    def jump(self, nums: List[int]) -> int:
        jumps = cur_end = farthest = 0
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == cur_end:
                jumps += 1
                cur_end = farthest
        return jumps`,
    java: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) { jumps++; curEnd = farthest; }
        }
        return jumps;
    }
}`,
  },
  53: {
    lc: 53,
    method: "maxSubArray",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], best = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur);
        }
        return best;
    }
};`,
    python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        cur = best = nums[0]
        for i in range(1, len(nums)):
            cur = max(nums[i], cur + nums[i])
            best = max(best, cur)
        return best`,
    java: `class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
  },
  55: {
    lc: 55,
    method: "canJump",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farthest = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (i > farthest) return false;
            farthest = max(farthest, i + nums[i]);
        }
        return true;
    }
};`,
    python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        farthest = 0
        for i in range(len(nums)):
            if i > farthest:
                return False
            farthest = max(farthest, i + nums[i])
        return True`,
    java: `class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) return false;
            farthest = Math.max(farthest, i + nums[i]);
        }
        return true;
    }
}`,
  },
  62: {
    lc: 62,
    method: "uniquePaths",
    time: "O(m · n)",
    space: "O(n)",
    complexity: "O(m · n) time · O(n) space",
    cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];
        return dp[n - 1];
    }
};`,
    python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[n - 1]`,
    java: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];
        return dp[n - 1];
    }
}`,
  },
  63: {
    lc: 63,
    method: "uniquePathsWithObstacles",
    time: "O(m · n)",
    space: "O(n)",
    complexity: "O(m · n) time · O(n) space",
    cpp: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int n = grid[0].size();
        vector<int> dp(n, 0);
        dp[0] = 1;
        for (int i = 0; i < (int)grid.size(); i++)
            for (int j = 0; j < n; j++) {
                if (grid[i][j]) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        return dp[n - 1];
    }
};`,
    python: `class Solution:
    def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
        n = len(grid[0])
        dp = [0] * n
        dp[0] = 1
        for row in grid:
            for j in range(n):
                if row[j]:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]
        return dp[n - 1]`,
    java: `class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = 1;
        for (int[] row : grid)
            for (int j = 0; j < n; j++) {
                if (row[j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        return dp[n - 1];
    }
}`,
  },
  64: {
    lc: 64,
    method: "minPathSum",
    time: "O(m · n)",
    space: "O(n)",
    complexity: "O(m · n) time · O(n) space",
    cpp: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n);
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = grid[i][j] + min(dp[j], dp[j - 1]);
        }
        return dp[n - 1];
    }
};`,
    python: `class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [0] * n
        dp[0] = grid[0][0]
        for j in range(1, n):
            dp[j] = dp[j - 1] + grid[0][j]
        for i in range(1, m):
            dp[0] += grid[i][0]
            for j in range(1, n):
                dp[j] = grid[i][j] + min(dp[j], dp[j - 1])
        return dp[n - 1]`,
    java: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
        }
        return dp[n - 1];
    }
}`,
  },
  70: {
    lc: 70,
    method: "climbStairs",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
};`,
    python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
    java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
}`,
  },
  72: {
    lc: 72,
    method: "minDistance",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        return dp[m][n];
    }
};`,
    python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i
        for j in range(n + 1): dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`,
    java: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        return dp[m][n];
    }
}`,
  },
  91: {
    lc: 91,
    method: "numDecodings",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        int prev2 = 1, prev1 = s[0] != '0' ? 1 : 0;
        for (int i = 2; i <= n; i++) {
            int curr = 0;
            if (s[i - 1] != '0') curr += prev1;
            int two = (s[i - 2] - '0') * 10 + (s[i - 1] - '0');
            if (two >= 10 && two <= 26) curr += prev2;
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
};`,
    python: `class Solution:
    def numDecodings(self, s: str) -> int:
        prev2, prev1 = 1, int(s[0] != '0')
        for i in range(2, len(s) + 1):
            curr = 0
            if s[i - 1] != '0':
                curr += prev1
            two = int(s[i - 2:i])
            if 10 <= two <= 26:
                curr += prev2
            prev2, prev1 = prev1, curr
        return prev1`,
    java: `class Solution {
    public int numDecodings(String s) {
        int prev2 = 1, prev1 = s.charAt(0) != '0' ? 1 : 0;
        for (int i = 2; i <= s.length(); i++) {
            int curr = 0;
            if (s.charAt(i - 1) != '0') curr += prev1;
            int two = Integer.parseInt(s.substring(i - 2, i));
            if (two >= 10 && two <= 26) curr += prev2;
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}`,
  },
  96: {
    lc: 96,
    method: "numTrees",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j <= i; j++)
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }
};`,
    python: `class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i + 1):
                dp[i] += dp[j - 1] * dp[i - j]
        return dp[n]`,
    java: `class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j <= i; j++)
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }
}`,
  },
  97: {
    lc: 97,
    method: "isInterleave",
    time: "O(m · n)",
    space: "O(n)",
    complexity: "O(m · n) time · O(n) space",
    cpp: `class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != (int)s3.size()) return false;
        vector<bool> dp(n + 1, false);
        for (int i = 0; i <= m; i++)
            for (int j = 0; j <= n; j++) {
                if (i == 0 && j == 0) dp[j] = true;
                else if (i == 0) dp[j] = dp[j - 1] && s2[j - 1] == s3[j - 1];
                else if (j == 0) dp[j] = dp[j] && s1[i - 1] == s3[i - 1];
                else dp[j] = (dp[j] && s1[i - 1] == s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] == s3[i + j - 1]);
            }
        return dp[n];
    }
};`,
    python: `class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [False] * (n + 1)
        for i in range(m + 1):
            for j in range(n + 1):
                if i == 0 and j == 0:
                    dp[j] = True
                elif i == 0:
                    dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
                elif j == 0:
                    dp[j] = dp[j] and s1[i - 1] == s3[i - 1]
                else:
                    dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
        return dp[n]`,
    java: `class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        boolean[] dp = new boolean[n + 1];
        for (int i = 0; i <= m; i++)
            for (int j = 0; j <= n; j++) {
                if (i == 0 && j == 0) dp[j] = true;
                else if (i == 0) dp[j] = dp[j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
                else if (j == 0) dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(i - 1);
                else dp[j] = (dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) || (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        return dp[n];
    }
}`,
  },
  115: {
    lc: 115,
    method: "numDistinct",
    time: "O(m · n)",
    space: "O(n)",
    complexity: "O(m · n) time · O(n) space",
    cpp: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<unsigned long long> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= m; i++)
            for (int j = min(i, n); j >= 1; j--)
                if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];
        return dp[n];
    }
};`,
    python: `class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, m + 1):
            for j in range(min(i, n), 0, -1):
                if s[i - 1] == t[j - 1]:
                    dp[j] += dp[j - 1]
        return dp[n]`,
    java: `class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        long[] dp = new long[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= m; i++)
            for (int j = Math.min(i, n); j >= 1; j--)
                if (s.charAt(i - 1) == t.charAt(j - 1)) dp[j] += dp[j - 1];
        return (int) dp[n];
    }
}`,
  },
  118: {
    lc: 118,
    method: "generate",
    time: "O(n²)",
    space: "O(n²)",
    complexity: "O(n²) time · O(n²) space",
    cpp: `class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++)
                row[j] = res[i - 1][j - 1] + res[i - 1][j];
            res.push_back(row);
        }
        return res;
    }
};`,
    python: `class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(row)
        return res`,
    java: `class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
            }
            res.add(row);
        }
        return res;
    }
}`,
  },
  119: {
    lc: 119,
    method: "getRow",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> row(rowIndex + 1, 1);
        for (int i = 2; i <= rowIndex; i++)
            for (int j = i - 1; j >= 1; j--)
                row[j] += row[j - 1];
        return row;
    }
};`,
    python: `class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        row = [1] * (rowIndex + 1)
        for i in range(2, rowIndex + 1):
            for j in range(i - 1, 0, -1):
                row[j] += row[j - 1]
        return row`,
    java: `class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>();
        for (int i = 0; i <= rowIndex; i++) row.add(1);
        for (int i = 2; i <= rowIndex; i++)
            for (int j = i - 1; j >= 1; j--)
                row.set(j, row.get(j) + row.get(j - 1));
        return row;
    }
}`,
  },
  120: {
    lc: 120,
    method: "minimumTotal",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle.back();
        for (int i = n - 2; i >= 0; i--)
            for (int j = 0; j <= i; j++)
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
        return dp[0];
    }
};`,
    python: `class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = triangle[-1][:]
        for i in range(len(triangle) - 2, -1, -1):
            for j in range(i + 1):
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])
        return dp[0]`,
    java: `class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int j = 0; j < n; j++) dp[j] = triangle.get(n - 1).get(j);
        for (int i = n - 2; i >= 0; i--)
            for (int j = 0; j <= i; j++)
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
        return dp[0];
    }
}`,
  },
  121: {
    lc: 121,
    method: "maxProfit",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};`,
    python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for p in prices:
            min_price = min(min_price, p)
            max_profit = max(max_profit, p - min_price)
        return max_profit`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int p : prices) {
            minPrice = Math.min(minPrice, p);
            maxProfit = Math.max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
}`,
  },
  123: {
    lc: 123,
    method: "maxProfit",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MAX, buy2 = INT_MAX;
        int sell1 = 0, sell2 = 0;
        for (int p : prices) {
            buy1 = min(buy1, p);
            sell1 = max(sell1, p - buy1);
            buy2 = min(buy2, p - sell1);
            sell2 = max(sell2, p - buy2);
        }
        return sell2;
    }
};`,
    python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buy1 = buy2 = float('inf')
        sell1 = sell2 = 0
        for p in prices:
            buy1 = min(buy1, p)
            sell1 = max(sell1, p - buy1)
            buy2 = min(buy2, p - sell1)
            sell2 = max(sell2, p - buy2)
        return sell2`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = Integer.MAX_VALUE, buy2 = Integer.MAX_VALUE;
        int sell1 = 0, sell2 = 0;
        for (int p : prices) {
            buy1 = Math.min(buy1, p);
            sell1 = Math.max(sell1, p - buy1);
            buy2 = Math.min(buy2, p - sell1);
            sell2 = Math.max(sell2, p - buy2);
        }
        return sell2;
    }
}`,
  },
  132: {
    lc: 132,
    method: "minCut",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n);
        iota(dp.begin(), dp.end(), 0);
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
};`,
    python: `class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = list(range(n))
        for c in range(n):
            l, r = c, c
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
            l, r = c, c + 1
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
        return dp[n - 1]`,
    java: `class Solution {
    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = i;
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
}`,
  },
  139: {
    lc: 139,
    method: "wordBreak",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && dict.count(s.substr(j, i - j))) { dp[i] = true; break; }
        return dp[n];
    }
};`,
    python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[n]`,
    java: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && dict.contains(s.substring(j, i))) { dp[i] = true; break; }
        return dp[n];
    }
}`,
  },
  152: {
    lc: 152,
    method: "maxProduct",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int ans = nums[0], maxP = nums[0], minP = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] < 0) swap(maxP, minP);
            maxP = max(nums[i], maxP * nums[i]);
            minP = min(nums[i], minP * nums[i]);
            ans = max(ans, maxP);
        }
        return ans;
    }
};`,
    python: `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        ans = max_p = min_p = nums[0]
        for i in range(1, len(nums)):
            if nums[i] < 0:
                max_p, min_p = min_p, max_p
            max_p = max(nums[i], max_p * nums[i])
            min_p = min(nums[i], min_p * nums[i])
            ans = max(ans, max_p)
        return ans`,
    java: `class Solution {
    public int maxProduct(int[] nums) {
        int ans = nums[0], maxP = nums[0], minP = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) { int t = maxP; maxP = minP; minP = t; }
            maxP = Math.max(nums[i], maxP * nums[i]);
            minP = Math.min(nums[i], minP * nums[i]);
            ans = Math.max(ans, maxP);
        }
        return ans;
    }
}`,
  },
  198: {
    lc: 198,
    method: "rob",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int curr = max(prev1, prev2 + num);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
};`,
    python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2 = prev1 = 0
        for num in nums:
            prev2, prev1 = prev1, max(prev1, prev2 + num)
        return prev1`,
    java: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int curr = Math.max(prev1, prev2 + num);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}`,
  },
  213: {
    lc: 213,
    method: "rob",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
    int robRange(vector<int>& nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        return max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
};`,
    python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        def rob_range(lo, hi):
            prev2 = prev1 = 0
            for i in range(lo, hi + 1):
                prev2, prev1 = prev1, max(prev1, prev2 + nums[i])
            return prev1
        return max(rob_range(0, len(nums) - 2), rob_range(1, len(nums) - 1))`,
    java: `class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
    private int robRange(int[] nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}`,
  },
  221: {
    lc: 221,
    method: "maximalSquare",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), maxSide = 0;
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]}) + 1;
                    maxSide = max(maxSide, dp[i][j]);
                }
            }
        return maxSide * maxSide;
    }
};`,
    python: `class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_side = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                    max_side = max(max_side, dp[i][j])
        return max_side * max_side`,
    java: `class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length, maxSide = 0;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        return maxSide * maxSide;
    }
}`,
  },
  264: {
    lc: 264,
    method: "nthUglyNumber",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> dp(n);
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = min({dp[i2] * 2, dp[i3] * 3, dp[i5] * 5});
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
};`,
    python: `class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [0] * n
        dp[0] = 1
        i2 = i3 = i5 = 0
        for i in range(1, n):
            nxt = min(dp[i2] * 2, dp[i3] * 3, dp[i5] * 5)
            dp[i] = nxt
            if nxt == dp[i2] * 2: i2 += 1
            if nxt == dp[i3] * 3: i3 += 1
            if nxt == dp[i5] * 5: i5 += 1
        return dp[n - 1]`,
    java: `class Solution {
    public int nthUglyNumber(int n) {
        int[] dp = new int[n];
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = Math.min(dp[i2] * 2, Math.min(dp[i3] * 3, dp[i5] * 5));
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
}`,
  },
  279: {
    lc: 279,
    method: "numSquares",
    time: "O(n · √n)",
    space: "O(n)",
    complexity: "O(n · √n) time · O(n) space",
    cpp: `class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j * j <= i; j++)
                dp[i] = min(dp[i], dp[i - j * j] + 1);
        return dp[n];
    }
};`,
    python: `class Solution:
    def numSquares(self, n: int) -> int:
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
        return dp[n]`,
    java: `class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j * j <= i; j++)
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        return dp[n];
    }
}`,
  },
  300: {
    lc: 300,
    method: "lengthOfLIS",
    time: "O(n log n)",
    space: "O(n)",
    complexity: "O(n log n) time · O(n) space",
    cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int num : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), num);
            if (it == tails.end()) tails.push_back(num);
            else *it = num;
        }
        return tails.size();
    }
};`,
    python: `class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []
        for num in nums:
            lo, hi = 0, len(tails)
            while lo < hi:
                mid = (lo + hi) // 2
                if tails[mid] < num: lo = mid + 1
                else: hi = mid
            if lo == len(tails): tails.append(num)
            else: tails[lo] = num
        return len(tails)`,
    java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int num : nums) {
            int pos = Collections.binarySearch(tails, num);
            if (pos < 0) pos = -(pos + 1);
            if (pos == tails.size()) tails.add(num);
            else tails.set(pos, num);
        }
        return tails.size();
    }
}`,
  },
  303: {
    lc: 303,
    method: "sumRange",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) build time · O(1) query time · O(n) space",
    cpp: `class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < (int)nums.size(); i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`,
    python: `class NumArray:
    def __init__(self, nums: List[int]):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)
    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
    java: `class NumArray {
    int[] prefix;
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
  },
  309: {
    lc: 309,
    method: "maxProfit",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int hold = -prices[0], sold = 0, rest = 0;
        for (int i = 1; i < (int)prices.size(); i++) {
            int prevHold = hold;
            hold = max(hold, rest - prices[i]);
            rest = max(rest, sold);
            sold = prevHold + prices[i];
        }
        return max(sold, rest);
    }
};`,
    python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        hold, sold, rest = -prices[0], 0, 0
        for i in range(1, len(prices)):
            prev_hold = hold
            hold = max(hold, rest - prices[i])
            rest = max(rest, sold)
            sold = prev_hold + prices[i]
        return max(sold, rest)`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        int hold = -prices[0], sold = 0, rest = 0;
        for (int i = 1; i < prices.length; i++) {
            int prevHold = hold;
            hold = Math.max(hold, rest - prices[i]);
            rest = Math.max(rest, sold);
            sold = prevHold + prices[i];
        }
        return Math.max(sold, rest);
    }
}`,
  },
  312: {
    lc: 312,
    method: "maxCoins",
    time: "O(n³)",
    space: "O(n²)",
    complexity: "O(n³) time · O(n²) space",
    cpp: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n + 2, 1);
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 1; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                for (int k = i; k <= j; k++)
                    dp[i][j] = max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + a[i - 1] * a[k] * a[j + 1]);
            }
        return dp[1][n];
    }
};`,
    python: `class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        a = [1] + nums + [1]
        n = len(nums)
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        for length in range(1, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                for k in range(i, j + 1):
                    dp[i][j] = max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + a[i - 1] * a[k] * a[j + 1])
        return dp[1][n]`,
    java: `class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] a = new int[n + 2];
        a[0] = a[n + 1] = 1;
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 1; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                for (int k = i; k <= j; k++)
                    dp[i][j] = Math.max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + a[i - 1] * a[k] * a[j + 1]);
            }
        return dp[1][n];
    }
}`,
  },
  322: {
    lc: 322,
    method: "coinChange",
    time: "O(n · amount)",
    space: "O(amount)",
    complexity: "O(n · amount) time · O(amount) space",
    cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins)
                if (c <= i) dp[i] = min(dp[i], dp[i - c] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
    python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if c <= i:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`,
    java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins)
                if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
  },
  329: {
    lc: 329,
    method: "longestIncreasingPath",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
    int m, n;
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    int dfs(vector<vector<int>>& mat, vector<vector<int>>& memo, int i, int j) {
        if (memo[i][j]) return memo[i][j];
        int best = 1;
        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && mat[ni][nj] > mat[i][j])
                best = max(best, 1 + dfs(mat, memo, ni, nj));
        }
        return memo[i][j] = best;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size(); n = matrix[0].size();
        vector<vector<int>> memo(m, vector<int>(n, 0));
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = max(ans, dfs(matrix, memo, i, j));
        return ans;
    }
};`,
    python: `class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        memo = {}
        def dfs(i, j):
            if (i, j) in memo: return memo[(i, j)]
            best = 1
            for di, dj in ((-1,0),(1,0),(0,-1),(0,1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] > matrix[i][j]:
                    best = max(best, 1 + dfs(ni, nj))
            memo[(i, j)] = best
            return best
        return max(dfs(i, j) for i in range(m) for j in range(n))`,
    java: `class Solution {
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    public int longestIncreasingPath(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] memo = new int[m][n];
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = Math.max(ans, dfs(matrix, memo, i, j));
        return ans;
    }
    private int dfs(int[][] mat, int[][] memo, int i, int j) {
        if (memo[i][j] != 0) return memo[i][j];
        int best = 1;
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < mat.length && nj >= 0 && nj < mat[0].length && mat[ni][nj] > mat[i][j])
                best = Math.max(best, 1 + dfs(mat, memo, ni, nj));
        }
        return memo[i][j] = best;
    }
}`,
  },
  338: {
    lc: 338,
    method: "countBits",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++)
            dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
};`,
    python: `class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp`,
    java: `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++)
            dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
}`,
  },
  343: {
    lc: 343,
    method: "integerBreak",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    int integerBreak(int n) {
        vector<int> dp(n + 1, 0);
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j < i; j++)
                dp[i] = max({dp[i], j * (i - j), j * dp[i - j]});
        return dp[n];
    }
};`,
    python: `class Solution:
    def integerBreak(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i):
                dp[i] = max(dp[i], j * (i - j), j * dp[i - j])
        return dp[n]`,
    java: `class Solution {
    public int integerBreak(int n) {
        int[] dp = new int[n + 1];
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j < i; j++)
                dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]));
        return dp[n];
    }
}`,
  },
  375: {
    lc: 375,
    method: "getMoneyAmount",
    time: "O(n³)",
    space: "O(n²)",
    complexity: "O(n³) time · O(n²) space",
    cpp: `class Solution {
public:
    int getMoneyAmount(int n) {
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                for (int k = i; k <= j; k++)
                    dp[i][j] = min(dp[i][j], k + max(dp[i][k - 1], dp[k + 1][j]));
            }
        return dp[1][n];
    }
};`,
    python: `class Solution:
    def getMoneyAmount(self, n: int) -> int:
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        for length in range(2, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                dp[i][j] = float('inf')
                for k in range(i, j + 1):
                    dp[i][j] = min(dp[i][j], k + max(dp[i][k - 1], dp[k + 1][j]))
        return dp[1][n]`,
    java: `class Solution {
    public int getMoneyAmount(int n) {
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k <= j; k++)
                    dp[i][j] = Math.min(dp[i][j], k + Math.max(dp[i][k - 1], dp[k + 1][j]));
            }
        return dp[1][n];
    }
}`,
  },
  376: {
    lc: 376,
    method: "wiggleMaxLength",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int up = 1, down = 1;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] > nums[i - 1]) up = down + 1;
            else if (nums[i] < nums[i - 1]) down = up + 1;
        }
        return max(up, down);
    }
};`,
    python: `class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        up = down = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]: up = down + 1
            elif nums[i] < nums[i - 1]: down = up + 1
        return max(up, down)`,
    java: `class Solution {
    public int wiggleMaxLength(int[] nums) {
        int up = 1, down = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) up = down + 1;
            else if (nums[i] < nums[i - 1]) down = up + 1;
        }
        return Math.max(up, down);
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
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned long long> dp(target + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= target; i++)
            for (int num : nums)
                if (num <= i) dp[i] += dp[i - num];
        return dp[target];
    }
};`,
    python: `class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = [0] * (target + 1)
        dp[0] = 1
        for i in range(1, target + 1):
            for num in nums:
                if num <= i:
                    dp[i] += dp[i - num]
        return dp[target]`,
    java: `class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int i = 1; i <= target; i++)
            for (int num : nums)
                if (num <= i) dp[i] += dp[i - num];
        return dp[target];
    }
}`,
  },
  392: {
    lc: 392,
    method: "isSubsequence",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0;
        for (int j = 0; j < (int)t.size() && i < (int)s.size(); j++)
            if (s[i] == t[j]) i++;
        return i == (int)s.size();
    }
};`,
    python: `class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for c in t:
            if i < len(s) and c == s[i]:
                i += 1
        return i == len(s)`,
    java: `class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0;
        for (int j = 0; j < t.length() && i < s.length(); j++)
            if (s.charAt(i) == t.charAt(j)) i++;
        return i == s.length();
    }
}`,
  },
  413: {
    lc: 413,
    method: "numberOfArithmeticSlices",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int dp = 0, ans = 0;
        for (int i = 2; i < (int)nums.size(); i++) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) { dp++; ans += dp; }
            else dp = 0;
        }
        return ans;
    }
};`,
    python: `class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        dp = ans = 0
        for i in range(2, len(nums)):
            if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
                dp += 1
                ans += dp
            else:
                dp = 0
        return ans`,
    java: `class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int dp = 0, ans = 0;
        for (int i = 2; i < nums.length; i++) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) { dp++; ans += dp; }
            else dp = 0;
        }
        return ans;
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
public:
    bool canPartition(vector<int>& nums) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % 2) return false;
        int target = total / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int num : nums)
            for (int j = target; j >= num; j--)
                dp[j] = dp[j] || dp[j - num];
        return dp[target];
    }
};`,
    python: `class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
        return dp[target]`,
    java: `class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums)
            for (int j = target; j >= num; j--)
                dp[j] = dp[j] || dp[j - num];
        return dp[target];
    }
}`,
  },
  474: {
    lc: 474,
    method: "findMaxForm",
    time: "O(l · m · n)",
    space: "O(m · n)",
    complexity: "O(l · m · n) time · O(m · n) space",
    cpp: `class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (const string& s : strs) {
            int zeros = count(s.begin(), s.end(), '0');
            int ones = s.size() - zeros;
            for (int i = m; i >= zeros; i--)
                for (int j = n; j >= ones; j--)
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1);
        }
        return dp[m][n];
    }
};`,
    python: `class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for s in strs:
            zeros = s.count('0')
            ones = len(s) - zeros
            for i in range(m, zeros - 1, -1):
                for j in range(n, ones - 1, -1):
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1)
        return dp[m][n]`,
    java: `class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        for (String s : strs) {
            int zeros = 0;
            for (char c : s.toCharArray()) if (c == '0') zeros++;
            int ones = s.length() - zeros;
            for (int i = m; i >= zeros; i--)
                for (int j = n; j >= ones; j--)
                    dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
        }
        return dp[m][n];
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
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > total || (total + target) % 2) return 0;
        int sum = (total + target) / 2;
        vector<int> dp(sum + 1, 0);
        dp[0] = 1;
        for (int num : nums)
            for (int j = sum; j >= num; j--)
                dp[j] += dp[j - num];
        return dp[sum];
    }
};`,
    python: `class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if abs(target) > total or (total + target) % 2:
            return 0
        s = (total + target) // 2
        dp = [0] * (s + 1)
        dp[0] = 1
        for num in nums:
            for j in range(s, num - 1, -1):
                dp[j] += dp[j - num]
        return dp[s]`,
    java: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int num : nums) total += num;
        if (Math.abs(target) > total || (total + target) % 2 != 0) return 0;
        int sum = (total + target) / 2;
        int[] dp = new int[sum + 1];
        dp[0] = 1;
        for (int num : nums)
            for (int j = sum; j >= num; j--)
                dp[j] += dp[j - num];
        return dp[sum];
    }
}`,
  },
  509: {
    lc: 509,
    method: "fib",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
};`,
    python: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`,
    java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
}`,
  },
  516: {
    lc: 516,
    method: "longestPalindromeSubseq",
    time: "O(n²)",
    space: "O(n²)",
    complexity: "O(n²) time · O(n²) space",
    cpp: `class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
};`,
    python: `class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]: dp[i][j] = dp[i + 1][j - 1] + 2
                else: dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1]`,
    java: `class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] dp = new int[n][n];
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
}`,
  },
  518: {
    lc: 518,
    method: "change",
    time: "O(n · amount)",
    space: "O(amount)",
    complexity: "O(n · amount) time · O(amount) space",
    cpp: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int c : coins)
            for (int j = c; j <= amount; j++)
                dp[j] += dp[j - c];
        return dp[amount];
    }
};`,
    python: `class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for c in coins:
            for j in range(c, amount + 1):
                dp[j] += dp[j - c]
        return dp[amount]`,
    java: `class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int c : coins)
            for (int j = c; j <= amount; j++)
                dp[j] += dp[j - c];
        return dp[amount];
    }
}`,
  },
  576: {
    lc: 576,
    method: "findPaths",
    time: "O(N · m · n)",
    space: "O(m · n)",
    complexity: "O(N · m · n) time · O(m · n) space",
    cpp: `class Solution {
public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const int MOD = 1e9 + 7;
        vector<vector<long>> dp(m, vector<long>(n, 0));
        dp[startRow][startColumn] = 1;
        long ans = 0;
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        for (int move = 1; move <= maxMove; move++) {
            vector<vector<long>> ndp(m, vector<long>(n, 0));
            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++) {
                    if (!dp[i][j]) continue;
                    for (auto& d : dirs) {
                        int ni = i + d[0], nj = j + d[1];
                        if (ni >= 0 && ni < m && nj >= 0 && nj < n)
                            ndp[ni][nj] = (ndp[ni][nj] + dp[i][j]) % MOD;
                        else ans = (ans + dp[i][j]) % MOD;
                    }
                }
            dp = ndp;
        }
        return ans;
    }
};`,
    python: `class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * n for _ in range(m)]
        dp[startRow][startColumn] = 1
        ans = 0
        for _ in range(maxMove):
            ndp = [[0] * n for _ in range(m)]
            for i in range(m):
                for j in range(n):
                    if not dp[i][j]: continue
                    for di, dj in ((-1,0),(1,0),(0,-1),(0,1)):
                        ni, nj = i + di, j + dj
                        if 0 <= ni < m and 0 <= nj < n:
                            ndp[ni][nj] = (ndp[ni][nj] + dp[i][j]) % MOD
                        else:
                            ans = (ans + dp[i][j]) % MOD
            dp = ndp
        return ans`,
    java: `class Solution {
    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        final int MOD = 1_000_000_007;
        long[][] dp = new long[m][n];
        dp[startRow][startColumn] = 1;
        long ans = 0;
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        for (int move = 0; move < maxMove; move++) {
            long[][] ndp = new long[m][n];
            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++) {
                    if (dp[i][j] == 0) continue;
                    for (int[] d : dirs) {
                        int ni = i + d[0], nj = j + d[1];
                        if (ni >= 0 && ni < m && nj >= 0 && nj < n)
                            ndp[ni][nj] = (ndp[ni][nj] + dp[i][j]) % MOD;
                        else ans = (ans + dp[i][j]) % MOD;
                    }
                }
            dp = ndp;
        }
        return (int) ans;
    }
}`,
  },
  583: {
    lc: 583,
    method: "minDistance",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        return m + n - 2 * dp[m][n];
    }
};`,
    python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1] + 1
                else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return m + n - 2 * dp[m][n]`,
    java: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        return m + n - 2 * dp[m][n];
    }
}`,
  },
  646: {
    lc: 646,
    method: "findLongestChain",
    time: "O(n log n)",
    space: "O(1)",
    complexity: "O(n log n) time · O(1) space",
    cpp: `class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
        int ans = 0, end = INT_MIN;
        for (auto& p : pairs)
            if (p[0] > end) { ans++; end = p[1]; }
        return ans;
    }
};`,
    python: `class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda x: x[1])
        ans = 0
        end = float('-inf')
        for a, b in pairs:
            if a > end:
                ans += 1
                end = b
        return ans`,
    java: `class Solution {
    public int findLongestChain(int[][] pairs) {
        Arrays.sort(pairs, (a, b) -> a[1] - b[1]);
        int ans = 0, end = Integer.MIN_VALUE;
        for (int[] p : pairs)
            if (p[0] > end) { ans++; end = p[1]; }
        return ans;
    }
}`,
  },
  647: {
    lc: 647,
    method: "countSubstrings",
    time: "O(n²)",
    space: "O(1)",
    complexity: "O(n²) time · O(1) space",
    cpp: `class Solution {
public:
    int countSubstrings(string s) {
        int ans = 0, n = s.size();
        for (int i = 0; i < n; i++) {
            for (int l = i, r = i; l >= 0 && r < n && s[l] == s[r]; l--, r++) ans++;
            for (int l = i, r = i + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++) ans++;
        }
        return ans;
    }
};`,
    python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        ans = 0
        n = len(s)
        for i in range(n):
            l = r = i
            while l >= 0 and r < n and s[l] == s[r]:
                ans += 1; l -= 1; r += 1
            l, r = i, i + 1
            while l >= 0 and r < n and s[l] == s[r]:
                ans += 1; l -= 1; r += 1
        return ans`,
    java: `class Solution {
    public int countSubstrings(String s) {
        int ans = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            for (int l = i, r = i; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++) ans++;
            for (int l = i, r = i + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++) ans++;
        }
        return ans;
    }
}`,
  },
  650: {
    lc: 650,
    method: "minSteps",
    time: "O(√n)",
    space: "O(1)",
    complexity: "O(√n) time · O(1) space",
    cpp: `class Solution {
public:
    int minSteps(int n) {
        int ans = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { ans += d; n /= d; }
            d++;
        }
        return ans;
    }
};`,
    python: `class Solution:
    def minSteps(self, n: int) -> int:
        ans, d = 0, 2
        while n > 1:
            while n % d == 0:
                ans += d
                n //= d
            d += 1
        return ans`,
    java: `class Solution {
    public int minSteps(int n) {
        int ans = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { ans += d; n /= d; }
            d++;
        }
        return ans;
    }
}`,
  },
  673: {
    lc: 673,
    method: "findNumberOfLIS",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size(), maxLen = 1;
        vector<int> len(n, 1), cnt(n, 1);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
                    else if (len[j] + 1 == len[i]) cnt[i] += cnt[j];
                }
            }
            maxLen = max(maxLen, len[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++)
            if (len[i] == maxLen) ans += cnt[i];
        return ans;
    }
};`,
    python: `class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        length = [1] * n
        count = [1] * n
        for i in range(1, n):
            for j in range(i):
                if nums[j] < nums[i]:
                    if length[j] + 1 > length[i]:
                        length[i] = length[j] + 1
                        count[i] = count[j]
                    elif length[j] + 1 == length[i]:
                        count[i] += count[j]
        max_len = max(length)
        return sum(c for l, c in zip(length, count) if l == max_len)`,
    java: `class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length, maxLen = 1;
        int[] len = new int[n], cnt = new int[n];
        Arrays.fill(len, 1); Arrays.fill(cnt, 1);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
                    else if (len[j] + 1 == len[i]) cnt[i] += cnt[j];
                }
            }
            maxLen = Math.max(maxLen, len[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++) if (len[i] == maxLen) ans += cnt[i];
        return ans;
    }
}`,
  },
  712: {
    lc: 712,
    method: "minimumDeleteSum",
    time: "O(m · n)",
    space: "O(m · n)",
    complexity: "O(m · n) time · O(m · n) space",
    cpp: `class Solution {
public:
    int minimumDeleteSum(string s1, string s2) {
        int m = s1.size(), n = s2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) dp[i][0] = dp[i - 1][0] + s1[i - 1];
        for (int j = 1; j <= n; j++) dp[0][j] = dp[0][j - 1] + s2[j - 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = min(dp[i - 1][j] + s1[i - 1], dp[i][j - 1] + s2[j - 1]);
            }
        return dp[m][n];
    }
};`,
    python: `class Solution:
    def minimumDeleteSum(self, s1: str, s2: str) -> int:
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1): dp[i][0] = dp[i - 1][0] + ord(s1[i - 1])
        for j in range(1, n + 1): dp[0][j] = dp[0][j - 1] + ord(s2[j - 1])
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = min(dp[i - 1][j] + ord(s1[i - 1]), dp[i][j - 1] + ord(s2[j - 1]))
        return dp[m][n]`,
    java: `class Solution {
    public int minimumDeleteSum(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) dp[i][0] = dp[i - 1][0] + s1.charAt(i - 1);
        for (int j = 1; j <= n; j++) dp[0][j] = dp[0][j - 1] + s2.charAt(j - 1);
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = Math.min(dp[i - 1][j] + s1.charAt(i - 1), dp[i][j - 1] + s2.charAt(j - 1));
            }
        return dp[m][n];
    }
}`,
  },
  714: {
    lc: 714,
    method: "maxProfit",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int cash = 0, hold = -prices[0];
        for (int i = 1; i < (int)prices.size(); i++) {
            cash = max(cash, hold + prices[i] - fee);
            hold = max(hold, cash - prices[i]);
        }
        return cash;
    }
};`,
    python: `class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        cash, hold = 0, -prices[0]
        for i in range(1, len(prices)):
            cash = max(cash, hold + prices[i] - fee)
            hold = max(hold, cash - prices[i])
        return cash`,
    java: `class Solution {
    public int maxProfit(int[] prices, int fee) {
        int cash = 0, hold = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            cash = Math.max(cash, hold + prices[i] - fee);
            hold = Math.max(hold, cash - prices[i]);
        }
        return cash;
    }
}`,
  },
  740: {
    lc: 740,
    method: "deleteAndEarn",
    time: "O(n + k)",
    space: "O(k)",
    complexity: "O(n + k) time · O(k) space",
    cpp: `class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int maxVal = *max_element(nums.begin(), nums.end());
        vector<int> earn(maxVal + 1, 0);
        for (int num : nums) earn[num] += num;
        int prev2 = 0, prev1 = earn[1];
        for (int i = 2; i <= maxVal; i++) {
            int curr = max(prev1, prev2 + earn[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
};`,
    python: `class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        max_val = max(nums)
        earn = [0] * (max_val + 1)
        for num in nums:
            earn[num] += num
        prev2, prev1 = 0, earn[1]
        for i in range(2, max_val + 1):
            prev2, prev1 = prev1, max(prev1, prev2 + earn[i])
        return prev1`,
    java: `class Solution {
    public int deleteAndEarn(int[] nums) {
        int maxVal = 0;
        for (int num : nums) maxVal = Math.max(maxVal, num);
        int[] earn = new int[maxVal + 1];
        for (int num : nums) earn[num] += num;
        int prev2 = 0, prev1 = earn[1];
        for (int i = 2; i <= maxVal; i++) {
            int curr = Math.max(prev1, prev2 + earn[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}`,
  },
  746: {
    lc: 746,
    method: "minCostClimbingStairs",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int a = 0, b = 0;
        for (int i = 2; i <= (int)cost.size(); i++) {
            int c = min(b + cost[i - 1], a + cost[i - 2]);
            a = b; b = c;
        }
        return b;
    }
};`,
    python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        a = b = 0
        for i in range(2, len(cost) + 1):
            a, b = b, min(b + cost[i - 1], a + cost[i - 2])
        return b`,
    java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int a = 0, b = 0;
        for (int i = 2; i <= cost.length; i++) {
            int c = Math.min(b + cost[i - 1], a + cost[i - 2]);
            a = b; b = c;
        }
        return b;
    }
}`,
  },
  790: {
    lc: 790,
    method: "numTilings",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int numTilings(int n) {
        if (n <= 2) return n;
        const int MOD = 1e9 + 7;
        long a = 1, b = 1, c = 2;
        for (int i = 3; i <= n; i++) {
            long d = (2 * c % MOD + a) % MOD;
            a = b; b = c; c = d;
        }
        return c;
    }
};`,
    python: `class Solution:
    def numTilings(self, n: int) -> int:
        if n <= 2:
            return n
        MOD = 10**9 + 7
        a, b, c = 1, 1, 2
        for _ in range(3, n + 1):
            a, b, c = b, c, (2 * c + a) % MOD
        return c`,
    java: `class Solution {
    public int numTilings(int n) {
        if (n <= 2) return n;
        final int MOD = 1_000_000_007;
        long a = 1, b = 1, c = 2;
        for (int i = 3; i <= n; i++) {
            long d = (2 * c % MOD + a) % MOD;
            a = b; b = c; c = d;
        }
        return (int) c;
    }
}`,
  },
  799: {
    lc: 799,
    method: "champagneTower",
    time: "O(r²)",
    space: "O(r²)",
    complexity: "O(r²) time · O(r²) space",
    cpp: `class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> dp(query_row + 1, vector<double>(query_row + 1, 0));
        dp[0][0] = poured;
        for (int i = 0; i < query_row; i++)
            for (int j = 0; j <= i; j++) {
                double overflow = (dp[i][j] - 1.0) / 2.0;
                if (overflow > 0) { dp[i + 1][j] += overflow; dp[i + 1][j + 1] += overflow; }
            }
        return min(1.0, dp[query_row][query_glass]);
    }
};`,
    python: `class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [[0.0] * (i + 1) for i in range(query_row + 1)]
        dp[0][0] = poured
        for i in range(query_row):
            for j in range(len(dp[i])):
                overflow = (dp[i][j] - 1.0) / 2.0
                if overflow > 0:
                    dp[i + 1][j] += overflow
                    dp[i + 1][j + 1] += overflow
        return min(1.0, dp[query_row][query_glass])`,
    java: `class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] dp = new double[query_row + 1][query_row + 1];
        dp[0][0] = poured;
        for (int i = 0; i < query_row; i++)
            for (int j = 0; j <= i; j++) {
                double overflow = (dp[i][j] - 1.0) / 2.0;
                if (overflow > 0) { dp[i + 1][j] += overflow; dp[i + 1][j + 1] += overflow; }
            }
        return Math.min(1.0, dp[query_row][query_glass]);
    }
}`,
  },
  877: {
    lc: 877,
    method: "stoneGame",
    time: "O(n²)",
    space: "O(n²)",
    complexity: "O(n²) time · O(n²) space",
    cpp: `class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) dp[i][i] = piles[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] > 0;
    }
};`,
    python: `class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = piles[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
        return dp[0][n - 1] > 0`,
    java: `class Solution {
    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = piles[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] > 0;
    }
}`,
  },
  918: {
    lc: 918,
    method: "maxSubarraySumCircular",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0, maxSum = INT_MIN, curMax = 0, minSum = INT_MAX, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = max(num, curMax + num);
            maxSum = max(maxSum, curMax);
            curMin = min(num, curMin + num);
            minSum = min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : max(maxSum, total - minSum);
    }
};`,
    python: `class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        total = 0
        max_sum = float('-inf'); cur_max = 0
        min_sum = float('inf'); cur_min = 0
        for num in nums:
            total += num
            cur_max = max(num, cur_max + num)
            max_sum = max(max_sum, cur_max)
            cur_min = min(num, cur_min + num)
            min_sum = min(min_sum, cur_min)
        return max_sum if max_sum < 0 else max(max_sum, total - min_sum)`,
    java: `class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0, maxSum = Integer.MIN_VALUE, curMax = 0;
        int minSum = Integer.MAX_VALUE, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = Math.max(num, curMax + num);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(num, curMin + num);
            minSum = Math.min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
    }
}`,
  },
  926: {
    lc: 926,
    method: "minFlipsMonoIncr",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int ones = 0, flips = 0;
        for (char c : s) {
            if (c == '1') ones++;
            else flips = min(flips + 1, ones);
        }
        return flips;
    }
};`,
    python: `class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        ones = flips = 0
        for c in s:
            if c == '1':
                ones += 1
            else:
                flips = min(flips + 1, ones)
        return flips`,
    java: `class Solution {
    public int minFlipsMonoIncr(String s) {
        int ones = 0, flips = 0;
        for (char c : s.toCharArray()) {
            if (c == '1') ones++;
            else flips = Math.min(flips + 1, ones);
        }
        return flips;
    }
}`,
  },
  931: {
    lc: 931,
    method: "minFallingPathSum",
    time: "O(n²)",
    space: "O(n)",
    complexity: "O(n²) time · O(n) space",
    cpp: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> dp = matrix[0];
        for (int i = 1; i < n; i++) {
            vector<int> ndp(n);
            for (int j = 0; j < n; j++) {
                ndp[j] = dp[j];
                if (j > 0) ndp[j] = min(ndp[j], dp[j - 1]);
                if (j < n - 1) ndp[j] = min(ndp[j], dp[j + 1]);
                ndp[j] += matrix[i][j];
            }
            dp = ndp;
        }
        return *min_element(dp.begin(), dp.end());
    }
};`,
    python: `class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        dp = matrix[0][:]
        for i in range(1, n):
            ndp = [0] * n
            for j in range(n):
                best = dp[j]
                if j > 0: best = min(best, dp[j - 1])
                if j < n - 1: best = min(best, dp[j + 1])
                ndp[j] = best + matrix[i][j]
            dp = ndp
        return min(dp)`,
    java: `class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] dp = matrix[0].clone();
        for (int i = 1; i < n; i++) {
            int[] ndp = new int[n];
            for (int j = 0; j < n; j++) {
                ndp[j] = dp[j];
                if (j > 0) ndp[j] = Math.min(ndp[j], dp[j - 1]);
                if (j < n - 1) ndp[j] = Math.min(ndp[j], dp[j + 1]);
                ndp[j] += matrix[i][j];
            }
            dp = ndp;
        }
        int ans = dp[0];
        for (int v : dp) ans = Math.min(ans, v);
        return ans;
    }
}`,
  },
  935: {
    lc: 935,
    method: "knightDialer",
    time: "O(n)",
    space: "O(1)",
    complexity: "O(n) time · O(1) space",
    cpp: `class Solution {
public:
    int knightDialer(int n) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> jumps = {{4,6},{6,8},{7,9},{4,8},{0,3,9},{},{0,1,7},{2,6},{1,3},{2,4}};
        vector<long> dp(10, 1);
        for (int step = 1; step < n; step++) {
            vector<long> ndp(10, 0);
            for (int d = 0; d < 10; d++)
                for (int prev : jumps[d])
                    ndp[d] = (ndp[d] + dp[prev]) % MOD;
            dp = ndp;
        }
        long ans = 0;
        for (long v : dp) ans = (ans + v) % MOD;
        return ans;
    }
};`,
    python: `class Solution:
    def knightDialer(self, n: int) -> int:
        MOD = 10**9 + 7
        jumps = {0:[4,6],1:[6,8],2:[7,9],3:[4,8],4:[0,3,9],5:[],6:[0,1,7],7:[2,6],8:[1,3],9:[2,4]}
        dp = [1] * 10
        for _ in range(n - 1):
            ndp = [0] * 10
            for d in range(10):
                for prev in jumps[d]:
                    ndp[d] = (ndp[d] + dp[prev]) % MOD
            dp = ndp
        return sum(dp) % MOD`,
    java: `class Solution {
    public int knightDialer(int n) {
        final int MOD = 1_000_000_007;
        int[][] jumps = {{4,6},{6,8},{7,9},{4,8},{0,3,9},{},{0,1,7},{2,6},{1,3},{2,4}};
        long[] dp = new long[10];
        Arrays.fill(dp, 1);
        for (int step = 1; step < n; step++) {
            long[] ndp = new long[10];
            for (int d = 0; d < 10; d++)
                for (int prev : jumps[d])
                    ndp[d] = (ndp[d] + dp[prev]) % MOD;
            dp = ndp;
        }
        long ans = 0;
        for (long v : dp) ans = (ans + v) % MOD;
        return (int) ans;
    }
}`,
  },
  983: {
    lc: 983,
    method: "mincostTickets",
    time: "O(n)",
    space: "O(n)",
    complexity: "O(n) time · O(n) space",
    cpp: `class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int lastDay = days.back();
        unordered_set<int> daySet(days.begin(), days.end());
        vector<int> dp(lastDay + 1, 0);
        for (int d = 1; d <= lastDay; d++) {
            if (!daySet.count(d)) { dp[d] = dp[d - 1]; continue; }
            dp[d] = min({dp[d - 1] + costs[0],
                         dp[max(0, d - 7)] + costs[1],
                         dp[max(0, d - 30)] + costs[2]});
        }
        return dp[lastDay];
    }
};`,
    python: `class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        last_day = days[-1]
        day_set = set(days)
        dp = [0] * (last_day + 1)
        for d in range(1, last_day + 1):
            if d not in day_set:
                dp[d] = dp[d - 1]
            else:
                dp[d] = min(dp[d - 1] + costs[0],
                            dp[max(0, d - 7)] + costs[1],
                            dp[max(0, d - 30)] + costs[2])
        return dp[last_day]`,
    java: `class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int lastDay = days[days.length - 1];
        Set<Integer> daySet = new HashSet<>();
        for (int d : days) daySet.add(d);
        int[] dp = new int[lastDay + 1];
        for (int d = 1; d <= lastDay; d++) {
            if (!daySet.contains(d)) { dp[d] = dp[d - 1]; continue; }
            dp[d] = Math.min(dp[d - 1] + costs[0],
                    Math.min(dp[Math.max(0, d - 7)] + costs[1],
                             dp[Math.max(0, d - 30)] + costs[2]));
        }
        return dp[lastDay];
    }
}`,
  },
  1025: {
    lc: 1025,
    method: "divisorGame",
    time: "O(1)",
    space: "O(1)",
    complexity: "O(1) time · O(1) space",
    cpp: `class Solution {
public:
    bool divisorGame(int n) {
        return n % 2 == 0;
    }
};`,
    python: `class Solution:
    def divisorGame(self, n: int) -> bool:
        return n % 2 == 0`,
    java: `class Solution {
    public boolean divisorGame(int n) {
        return n % 2 == 0;
    }
}`,
  },
  1137: {
    lc: 1137,
    method: "tribonacci",
    time: "O(n)",
    space: "O(1)",
    cpp: `class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int d = a + b + c;
            a = b; b = c; c = d;
        }
        return c;
    }
};`,
    python: `class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0: return 0
        if n <= 2: return 1
        a, b, c = 0, 1, 1
        for _ in range(3, n + 1):
            a, b, c = b, c, a + b + c
        return c`,
    java: `class Solution {
    public int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int d = a + b + c;
            a = b; b = c; c = d;
        }
        return c;
    }
}`,
    complexity: "O(n) time · O(1) space",
  },
  1646: {
    lc: 1646,
    method: "getMaximumGenerated",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int getMaximumGenerated(int n) {
        if (n == 0) return 0;
        vector<int> nums(n + 1);
        nums[1] = 1;
        int mx = 1;
        for (int i = 2; i <= n; i++) {
            nums[i] = (i % 2 == 0) ? nums[i / 2] : nums[i / 2] + nums[i / 2 + 1];
            mx = max(mx, nums[i]);
        }
        return mx;
    }
};`,
    python: `class Solution:
    def getMaximumGenerated(self, n: int) -> int:
        if n == 0: return 0
        nums = [0] * (n + 1)
        nums[1] = 1
        for i in range(2, n + 1):
            nums[i] = nums[i // 2] if i % 2 == 0 else nums[i // 2] + nums[i // 2 + 1]
        return max(nums)`,
    java: `class Solution {
    public int getMaximumGenerated(int n) {
        if (n == 0) return 0;
        int[] nums = new int[n + 1];
        nums[1] = 1;
        int mx = 1;
        for (int i = 2; i <= n; i++) {
            nums[i] = (i % 2 == 0) ? nums[i / 2] : nums[i / 2] + nums[i / 2 + 1];
            mx = Math.max(mx, nums[i]);
        }
        return mx;
    }
}`,
    complexity: "O(n) time · O(n) space",
  },
  1143: {
    lc: 1143,
    method: "longestCommonSubsequence",
    time: "O(m · n)",
    space: "O(m · n)",
    cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
};`,
    python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`,
    java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1))
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
}`,
    complexity: "O(m · n) time · O(m · n) space",
  },
  1035: {
    lc: 1035,
    method: "maxUncrossedLines",
    time: "O(m · n)",
    space: "O(m · n)",
    cpp: `class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (nums1[i - 1] == nums2[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
};`,
    python: `class Solution:
    def maxUncrossedLines(self, nums1: list[int], nums2: list[int]) -> int:
        m, n = len(nums1), len(nums2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if nums1[i - 1] == nums2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`,
    java: `class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (nums1[i - 1] == nums2[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
}`,
    complexity: "O(m · n) time · O(m · n) space",
  },
  1049: {
    lc: 1049,
    method: "lastStoneWeightII",
    time: "O(n · sum)",
    space: "O(sum)",
    cpp: `class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int total = 0;
        for (int s : stones) total += s;
        int target = total / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int s : stones) {
            for (int j = target; j >= s; j--) {
                dp[j] = dp[j] || dp[j - s];
            }
        }
        for (int j = target; j >= 0; j--) {
            if (dp[j]) return total - 2 * j;
        }
        return total;
    }
};`,
    python: `class Solution:
    def lastStoneWeightII(self, stones: list[int]) -> int:
        total = sum(stones)
        target = total // 2
        dp = {0}
        for s in stones:
            dp = {x + s for x in dp} | dp
        return min(abs(total - 2 * x) for x in dp if x <= target + 1)`,
    java: `class Solution {
    public int lastStoneWeightII(int[] stones) {
        int total = 0;
        for (int s : stones) total += s;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int s : stones) {
            for (int j = target; j >= s; j--) {
                dp[j] = dp[j] || dp[j - s];
            }
        }
        for (int j = target; j >= 0; j--) {
            if (dp[j]) return total - 2 * j;
        }
        return total;
    }
}`,
    complexity: "O(n · sum) time · O(sum) space",
  },
  1155: {
    lc: 1155,
    method: "numRollsToTarget",
    time: "O(n · k · target)",
    space: "O(target)",
    cpp: `class Solution {
public:
    int numRollsToTarget(int n, int k, int target) {
        const int MOD = 1e9 + 7;
        vector<int> dp(target + 1, 0);
        dp[0] = 1;
        for (int i = 0; i < n; i++) {
            vector<int> ndp(target + 1, 0);
            for (int j = 1; j <= target; j++) {
                for (int f = 1; f <= k && f <= j; f++) {
                    ndp[j] = (ndp[j] + dp[j - f]) % MOD;
                }
            }
            dp = ndp;
        }
        return dp[target];
    }
};`,
    python: `class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (target + 1)
        dp[0] = 1
        for _ in range(n):
            ndp = [0] * (target + 1)
            for j in range(1, target + 1):
                for f in range(1, min(k, j) + 1):
                    ndp[j] = (ndp[j] + dp[j - f]) % MOD
            dp = ndp
        return dp[target]`,
    java: `class Solution {
    public int numRollsToTarget(int n, int k, int target) {
        int MOD = 1_000_000_007;
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int i = 0; i < n; i++) {
            int[] ndp = new int[target + 1];
            for (int j = 1; j <= target; j++) {
                for (int f = 1; f <= k && f <= j; f++) {
                    ndp[j] = (int)((ndp[j] + (long)dp[j - f]) % MOD);
                }
            }
            dp = ndp;
        }
        return dp[target];
    }
}`,
    complexity: "O(n · k · target) time · O(target) space",
  },
  1048: {
    lc: 1048,
    method: "longestStrChain",
    time: "O(n · L²)",
    space: "O(n · L)",
    cpp: `class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });
        unordered_map<string, int> dp;
        int ans = 1;
        for (const string& w : words) {
            dp[w] = 1;
            for (int i = 0; i < w.size(); i++) {
                string pred = w.substr(0, i) + w.substr(i + 1);
                if (dp.count(pred)) {
                    dp[w] = max(dp[w], dp[pred] + 1);
                }
            }
            ans = max(ans, dp[w]);
        }
        return ans;
    }
};`,
    python: `class Solution:
    def longestStrChain(self, words: list[str]) -> int:
        words.sort(key=len)
        dp = {}
        ans = 1
        for w in words:
            dp[w] = 1
            for i in range(len(w)):
                pred = w[:i] + w[i+1:]
                if pred in dp:
                    dp[w] = max(dp[w], dp[pred] + 1)
            ans = max(ans, dp[w])
        return ans`,
    java: `class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, (a, b) -> a.length() - b.length());
        Map<String, Integer> dp = new HashMap<>();
        int ans = 1;
        for (String w : words) {
            dp.put(w, 1);
            for (int i = 0; i < w.length(); i++) {
                String pred = w.substring(0, i) + w.substring(i + 1);
                if (dp.containsKey(pred)) {
                    dp.put(w, Math.max(dp.get(w), dp.get(pred) + 1));
                }
            }
            ans = Math.max(ans, dp.get(w));
        }
        return ans;
    }
}`,
    complexity: "O(n · L²) time · O(n · L) space",
  },
  1043: {
    lc: 1043,
    method: "maxSumAfterPartitioning",
    time: "O(n · k)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int mx = 0;
            for (int j = 1; j <= min(i, k); j++) {
                mx = max(mx, arr[i - j]);
                dp[i] = max(dp[i], dp[i - j] + mx * j);
            }
        }
        return dp[n];
    }
};`,
    python: `class Solution:
    def maxSumAfterPartitioning(self, arr: list[int], k: int) -> int:
        n = len(arr)
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            mx = 0
            for j in range(1, min(i, k) + 1):
                mx = max(mx, arr[i - j])
                dp[i] = max(dp[i], dp[i - j] + mx * j)
        return dp[n]`,
    java: `class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int mx = 0;
            for (int j = 1; j <= Math.min(i, k); j++) {
                mx = Math.max(mx, arr[i - j]);
                dp[i] = Math.max(dp[i], dp[i - j] + mx * j);
            }
        }
        return dp[n];
    }
}`,
    complexity: "O(n · k) time · O(n) space",
  },
  1277: {
    lc: 1277,
    method: "countSquares",
    time: "O(m · n)",
    space: "O(1)",
    cpp: `class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]}) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
};`,
    python: `class Solution:
    def countSquares(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] and i > 0 and j > 0:
                    matrix[i][j] = min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1
                ans += matrix[i][j]
        return ans`,
    java: `class Solution {
    public int countSquares(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length, ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] > 0 && i > 0 && j > 0) {
                    matrix[i][j] = Math.min(Math.min(matrix[i-1][j], matrix[i][j-1]), matrix[i-1][j-1]) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
}`,
    complexity: "O(m · n) time · O(1) space",
  },
  1027: {
    lc: 1027,
    method: "longestArithSeqLength",
    time: "O(n²)",
    space: "O(n²)",
    cpp: `class Solution {
public:
    int longestArithSeqLength(vector<int>& nums) {
        int n = nums.size(), ans = 2;
        vector<unordered_map<int,int>> dp(n);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i][d] = (dp[j].count(d) ? dp[j][d] : 1) + 1;
                ans = max(ans, dp[i][d]);
            }
        }
        return ans;
    }
};`,
    python: `class Solution:
    def longestArithSeqLength(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [dict() for _ in range(n)]
        ans = 2
        for i in range(1, n):
            for j in range(i):
                d = nums[i] - nums[j]
                dp[i][d] = dp[j].get(d, 1) + 1
                ans = max(ans, dp[i][d])
        return ans`,
    java: `class Solution {
    public int longestArithSeqLength(int[] nums) {
        int n = nums.length, ans = 2;
        Map<Integer, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) dp[i] = new HashMap<>();
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i].put(d, dp[j].getOrDefault(d, 1) + 1);
                ans = Math.max(ans, dp[i].get(d));
            }
        }
        return ans;
    }
}`,
    complexity: "O(n²) time · O(n²) space",
  },
  1567: {
    lc: 1567,
    method: "getMaxLen",
    time: "O(n)",
    space: "O(1)",
    cpp: `class Solution {
public:
    int getMaxLen(vector<int>& nums) {
        int pos = 0, neg = 0, ans = 0;
        for (int x : nums) {
            if (x > 0) { pos++; neg = neg > 0 ? neg + 1 : 0; }
            else if (x < 0) { int t = pos; pos = neg > 0 ? neg + 1 : 0; neg = t + 1; }
            else { pos = 0; neg = 0; }
            ans = max(ans, pos);
        }
        return ans;
    }
};`,
    python: `class Solution:
    def getMaxLen(self, nums: list[int]) -> int:
        pos = neg = ans = 0
        for x in nums:
            if x > 0:
                pos += 1
                neg = neg + 1 if neg > 0 else 0
            elif x < 0:
                pos, neg = (neg + 1 if neg > 0 else 0), pos + 1
            else:
                pos = neg = 0
            ans = max(ans, pos)
        return ans`,
    java: `class Solution {
    public int getMaxLen(int[] nums) {
        int pos = 0, neg = 0, ans = 0;
        for (int x : nums) {
            if (x > 0) { pos++; neg = neg > 0 ? neg + 1 : 0; }
            else if (x < 0) { int t = pos; pos = neg > 0 ? neg + 1 : 0; neg = t + 1; }
            else { pos = 0; neg = 0; }
            ans = Math.max(ans, pos);
        }
        return ans;
    }
}`,
    complexity: "O(n) time · O(1) space",
  },
  1130: {
    lc: 1130,
    method: "mctFromLeafValues",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int mctFromLeafValues(vector<int>& arr) {
        int n = arr.size(), ans = 0;
        stack<int> st;
        st.push(INT_MAX);
        for (int a : arr) {
            while (st.top() <= a) {
                int mid = st.top(); st.pop();
                ans += mid * min(st.top(), a);
            }
            st.push(a);
        }
        while (st.size() > 2) {
            int top = st.top(); st.pop();
            ans += top * st.top();
        }
        return ans;
    }
};`,
    python: `class Solution:
    def mctFromLeafValues(self, arr: list[int]) -> int:
        ans = 0
        stack = [float('inf')]
        for a in arr:
            while stack[-1] <= a:
                mid = stack.pop()
                ans += mid * min(stack[-1], a)
            stack.append(a)
        while len(stack) > 2:
            ans += stack.pop() * stack[-1]
        return ans`,
    java: `class Solution {
    public int mctFromLeafValues(int[] arr) {
        int ans = 0;
        Deque<Integer> st = new ArrayDeque<>();
        st.push(Integer.MAX_VALUE);
        for (int a : arr) {
            while (st.peek() <= a) {
                int mid = st.pop();
                ans += mid * Math.min(st.peek(), a);
            }
            st.push(a);
        }
        while (st.size() > 2) {
            ans += st.pop() * st.peek();
        }
        return ans;
    }
}`,
    complexity: "O(n) time · O(n) space",
  },
  1335: {
    lc: 1335,
    method: "minDifficulty",
    time: "O(d · n²)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;
        vector<vector<int>> dp(d + 1, vector<int>(n, INT_MAX));
        dp[1][0] = jobDifficulty[0];
        for (int j = 1; j < n; j++)
            dp[1][j] = max(dp[1][j - 1], jobDifficulty[j]);
        for (int i = 2; i <= d; i++) {
            for (int j = i - 1; j < n; j++) {
                int mx = jobDifficulty[j];
                for (int k = j; k >= i - 1; k--) {
                    dp[i][j] = min(dp[i][j], dp[i - 1][k - 1] + mx);
                    if (k > 0) mx = max(mx, jobDifficulty[k - 1]);
                }
            }
        }
        return dp[d][n - 1];
    }
};`,
    python: `class Solution:
    def minDifficulty(self, jobDifficulty: list[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d: return -1
        dp = [[float('inf')] * n for _ in range(d + 1)]
        dp[1][0] = jobDifficulty[0]
        for j in range(1, n):
            dp[1][j] = max(dp[1][j - 1], jobDifficulty[j])
        for i in range(2, d + 1):
            for j in range(i - 1, n):
                mx = jobDifficulty[j]
                for k in range(j, i - 2, -1):
                    dp[i][j] = min(dp[i][j], dp[i - 1][k - 1] + mx)
                    if k > 0: mx = max(mx, jobDifficulty[k - 1])
        return dp[d][n - 1]`,
    java: `class Solution {
    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;
        int[][] dp = new int[d + 1][n];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE);
        dp[1][0] = jobDifficulty[0];
        for (int j = 1; j < n; j++)
            dp[1][j] = Math.max(dp[1][j - 1], jobDifficulty[j]);
        for (int i = 2; i <= d; i++) {
            for (int j = i - 1; j < n; j++) {
                int mx = jobDifficulty[j];
                for (int k = j; k >= i - 1; k--) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][k - 1] + mx);
                    if (k > 0) mx = Math.max(mx, jobDifficulty[k - 1]);
                }
            }
        }
        return dp[d][n - 1];
    }
}`,
    complexity: "O(d · n²) time · O(n) space",
  },
};
