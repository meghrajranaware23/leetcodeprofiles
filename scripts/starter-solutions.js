export const SOLUTIONS = {
  1: {
    lc: 1, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];
            if (seen.count(need)) return {seen[need], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, n in enumerate(nums):
            if target - n in seen:
                return [seen[target - n], i]
            seen[n] = i
        return []`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
  },
  9: {
    lc: 9, complexity: 'O(log n) time · O(1) space',
    cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }
        return x == rev || x == rev / 10;
    }
};`,
    python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0): return False
        rev = 0
        while x > rev:
            rev = rev * 10 + x % 10
            x //= 10
        return x == rev or x == rev // 10`,
    java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }
        return x == rev || x == rev / 10;
    }
}`,
  },
  13: {
    lc: 13, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char,int> m = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
        int ans = 0;
        for (int i = 0; i < s.size(); i++) {
            if (i + 1 < s.size() && m[s[i]] < m[s[i+1]]) ans -= m[s[i]];
            else ans += m[s[i]];
        }
        return ans;
    }
};`,
    python: `class Solution:
    def romanToInt(self, s: str) -> int:
        m = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
        ans = 0
        for i, ch in enumerate(s):
            if i + 1 < len(s) and m[ch] < m[s[i+1]]: ans -= m[ch]
            else: ans += m[ch]
        return ans`,
    java: `class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> m = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
        int ans = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && m.get(s.charAt(i)) < m.get(s.charAt(i+1))) ans -= m.get(s.charAt(i));
            else ans += m.get(s.charAt(i));
        }
        return ans;
    }
}`,
  },
  20: {
    lc: 20, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty()) return false;
                char t = st.top(); st.pop();
                if ((c==')'&&t!='(')||(c==']'&&t!='[')||(c=='}'&&t!='{')) return false;
            }
        }
        return st.empty();
    }
};`,
    python: `class Solution:
    def isValid(self, s: str) -> bool:
        st = []
        pairs = {')':'(', ']':'[', '}':'{'}
        for c in s:
            if c in '([{': st.append(c)
            elif not st or st.pop() != pairs[c]: return False
        return not st`,
    java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> st = new ArrayDeque<>();
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        for (char c : s.toCharArray()) {
            if ("([{".indexOf(c) >= 0) st.push(c);
            else if (st.isEmpty() || st.pop() != pairs.get(c)) return false;
        }
        return st.isEmpty();
    }
}`,
  },
  26: {
    lc: 26, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int w = 1;
        for (int r = 1; r < nums.size(); r++)
            if (nums[r] != nums[r-1]) nums[w++] = nums[r];
        return w;
    }
};`,
    python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums: return 0
        w = 1
        for r in range(1, len(nums)):
            if nums[r] != nums[r-1]:
                nums[w] = nums[r]
                w += 1
        return w`,
    java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int w = 1;
        for (int r = 1; r < nums.length; r++)
            if (nums[r] != nums[r-1]) nums[w++] = nums[r];
        return w;
    }
}`,
  },
  27: {
    lc: 27, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int w = 0;
        for (int r = 0; r < nums.size(); r++)
            if (nums[r] != val) nums[w++] = nums[r];
        return w;
    }
};`,
    python: `class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        w = 0
        for r in range(len(nums)):
            if nums[r] != val:
                nums[w] = nums[r]
                w += 1
        return w`,
    java: `class Solution {
    public int removeElement(int[] nums, int val) {
        int w = 0;
        for (int r = 0; r < nums.length; r++)
            if (nums[r] != val) nums[w++] = nums[r];
        return w;
    }
}`,
  },
  35: {
    lc: 35, complexity: 'O(log n) time · O(1) space',
    cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int lo = 0, hi = nums.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
};`,
    python: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target: lo = mid + 1
            else: hi = mid
        return lo`,
    java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
  },
  53: {
    lc: 53, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur);
        }
        return best;
    }
};`,
    python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        best = cur = nums[0]
        for n in nums[1:]:
            cur = max(n, cur + n)
            best = max(best, cur)
        return best`,
    java: `class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
  },
  58: {
    lc: 58, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int lengthOfLastWord(string s) {
        int i = s.size() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        int end = i;
        while (i >= 0 && s[i] != ' ') i--;
        return end - i;
    }
};`,
    python: `class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        words = s.split()
        return len(words[-1]) if words else 0`,
    java: `class Solution {
    public int lengthOfLastWord(String s) {
        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') i--;
        int end = i;
        while (i >= 0 && s.charAt(i) != ' ') i--;
        return end - i;
    }
}`,
  },
  66: {
    lc: 66, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};`,
    python: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits)-1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits`,
    java: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}`,
  },
  67: {
    lc: 67, complexity: 'O(max(m,n)) time · O(1) space',
    cpp: `class Solution {
public:
    string addBinary(string a, string b) {
        string res;
        int i = a.size()-1, j = b.size()-1, carry = 0;
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';
            res.push_back('0' + sum % 2);
            carry = sum / 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
    python: `class Solution:
    def addBinary(self, a: str, b: str) -> str:
        i, j, carry, res = len(a)-1, len(b)-1, 0, []
        while i >= 0 or j >= 0 or carry:
            s = carry
            if i >= 0: s += int(a[i]); i -= 1
            if j >= 0: s += int(b[j]); j -= 1
            res.append(str(s % 2))
            carry = s // 2
        return ''.join(reversed(res))`,
    java: `class Solution {
    public String addBinary(String a, String b) {
        StringBuilder res = new StringBuilder();
        int i = a.length()-1, j = b.length()-1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += a.charAt(i--) - '0';
            if (j >= 0) sum += b.charAt(j--) - '0';
            res.append(sum % 2);
            carry = sum / 2;
        }
        return res.reverse().toString();
    }
}`,
  },
  70: {
    lc: 70, complexity: 'O(n) time · O(1) space',
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
        if n <= 2: return n
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
  88: {
    lc: 88, complexity: 'O(m+n) time · O(1) space',
    cpp: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
};`,
    python: `class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]; i -= 1
            else:
                nums1[k] = nums2[j]; j -= 1
            k -= 1`,
    java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
}`,
  },
  121: {
    lc: 121, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minP = INT_MAX, best = 0;
        for (int p : prices) {
            minP = min(minP, p);
            best = max(best, p - minP);
        }
        return best;
    }
};`,
    python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_p, best = float('inf'), 0
        for p in prices:
            min_p = min(min_p, p)
            best = max(best, p - min_p)
        return best`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        int minP = Integer.MAX_VALUE, best = 0;
        for (int p : prices) {
            minP = Math.min(minP, p);
            best = Math.max(best, p - minP);
        }
        return best;
    }
}`,
  },
  125: {
    lc: 125, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`,
    python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum(): l += 1
            while l < r and not s[r].isalnum(): r -= 1
            if s[l].lower() != s[r].lower(): return False
            l += 1; r -= 1
        return True`,
    java: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}`,
  },
  136: {
    lc: 136, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int x = 0;
        for (int n : nums) x ^= n;
        return x;
    }
};`,
    python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        x = 0
        for n in nums: x ^= n
        return x`,
    java: `class Solution {
    public int singleNumber(int[] nums) {
        int x = 0;
        for (int n : nums) x ^= n;
        return x;
    }
}`,
  },
  169: {
    lc: 169, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int cand = 0, count = 0;
        for (int n : nums) {
            if (count == 0) { cand = n; count = 1; }
            else if (n == cand) count++;
            else count--;
        }
        return cand;
    }
};`,
    python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        cand, count = 0, 0
        for n in nums:
            if count == 0: cand, count = n, 1
            elif n == cand: count += 1
            else: count -= 1
        return cand`,
    java: `class Solution {
    public int majorityElement(int[] nums) {
        int cand = 0, count = 0;
        for (int n : nums) {
            if (count == 0) { cand = n; count = 1; }
            else if (n == cand) count++;
            else count--;
        }
        return cand;
    }
}`,
  },
  217: {
    lc: 217, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`,
    python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for n in nums:
            if n in seen: return True
            seen.add(n)
        return False`,
    java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}`,
  },
  242: {
    lc: 242, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int cnt[26] = {};
        for (char c : s) cnt[c-'a']++;
        for (char c : t) if (--cnt[c-'a'] < 0) return false;
        return true;
    }
};`,
    python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)`,
    java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c-'a']++;
        for (char c : t.toCharArray()) if (--cnt[c-'a'] < 0) return false;
        return true;
    }
}`,
  },
  268: {
    lc: 268, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size(), sum = n * (n + 1) / 2;
        for (int x : nums) sum -= x;
        return sum;
    }
};`,
    python: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)`,
    java: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length, sum = n * (n + 1) / 2;
        for (int x : nums) sum -= x;
        return sum;
    }
}`,
  },
  283: {
    lc: 283, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int w = 0;
        for (int n : nums) if (n != 0) nums[w++] = n;
        while (w < nums.size()) nums[w++] = 0;
    }
};`,
    python: `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        w = 0
        for n in nums:
            if n != 0:
                nums[w] = n
                w += 1
        while w < len(nums):
            nums[w] = 0
            w += 1`,
    java: `class Solution {
    public void moveZeroes(int[] nums) {
        int w = 0;
        for (int n : nums) if (n != 0) nums[w++] = n;
        while (w < nums.length) nums[w++] = 0;
    }
}`,
  },
  344: {
    lc: 344, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) swap(s[l++], s[r--]);
    }
};`,
    python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        s.reverse()`,
    java: `class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while (l < r) { char t = s[l]; s[l++] = s[r]; s[r--] = t; }
    }
}`,
  },
  349: {
    lc: 349, complexity: 'O(n+m) time · O(n) space',
    cpp: `class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> s(nums1.begin(), nums1.end());
        unordered_set<int> res;
        for (int n : nums2) if (s.count(n)) res.insert(n);
        return vector<int>(res.begin(), res.end());
    }
};`,
    python: `class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list(set(nums1) & set(nums2))`,
    java: `class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> s = new HashSet<>();
        for (int n : nums1) s.add(n);
        Set<Integer> res = new HashSet<>();
        for (int n : nums2) if (s.contains(n)) res.add(n);
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}`,
  },
  412: {
    lc: 412, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    vector<string> fizzBuzz(int n) {
        vector<string> res;
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) res.push_back("FizzBuzz");
            else if (i % 3 == 0) res.push_back("Fizz");
            else if (i % 5 == 0) res.push_back("Buzz");
            else res.push_back(to_string(i));
        }
        return res;
    }
};`,
    python: `class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        res = []
        for i in range(1, n + 1):
            if i % 15 == 0: res.append("FizzBuzz")
            elif i % 3 == 0: res.append("Fizz")
            elif i % 5 == 0: res.append("Buzz")
            else: res.append(str(i))
        return res`,
    java: `class Solution {
    public List<String> fizzBuzz(int n) {
        List<String> res = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) res.add("FizzBuzz");
            else if (i % 3 == 0) res.add("Fizz");
            else if (i % 5 == 0) res.add("Buzz");
            else res.add(String.valueOf(i));
        }
        return res;
    }
}`,
  },
  724: {
    lc: 724, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int n : nums) total += n;
        int left = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
};`,
    python: `class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total, left = sum(nums), 0
        for i, n in enumerate(nums):
            if left == total - left - n: return i
            left += n
        return -1`,
    java: `class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int n : nums) total += n;
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
}`,
  },
  1108: {
    lc: 1108, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    string defangIPaddr(string address) {
        string res;
        for (char c : address) res += (c == '.') ? "[.]" : string(1, c);
        return res;
    }
};`,
    python: `class Solution:
    def defangIPaddr(self, address: str) -> str:
        return address.replace('.', '[.]')`,
    java: `class Solution {
    public String defangIPaddr(String address) {
        return address.replace(".", "[.]");
    }
}`,
  },
  1470: {
    lc: 1470, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> res(2 * n);
        for (int i = 0; i < n; i++) {
            res[2*i] = nums[i];
            res[2*i+1] = nums[i+n];
        }
        return res;
    }
};`,
    python: `class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        return [x for pair in zip(nums[:n], nums[n:]) for x in pair]`,
    java: `class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] res = new int[2 * n];
        for (int i = 0; i < n; i++) {
            res[2*i] = nums[i];
            res[2*i+1] = nums[i+n];
        }
        return res;
    }
}`,
  },
  1480: {
    lc: 1480, complexity: 'O(n) time · O(1) space',
    cpp: `class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) nums[i] += nums[i-1];
        return nums;
    }
};`,
    python: `class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        for i in range(1, len(nums)):
            nums[i] += nums[i-1]
        return nums`,
    java: `class Solution {
    public int[] runningSum(int[] nums) {
        for (int i = 1; i < nums.length; i++) nums[i] += nums[i-1];
        return nums;
    }
}`,
  },
  1512: {
    lc: 1512, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int,int> cnt;
        long long ans = 0;
        for (int n : nums) {
            ans += cnt[n];
            cnt[n]++;
        }
        return ans;
    }
};`,
    python: `class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        cnt = {}
        ans = 0
        for n in nums:
            ans += cnt.get(n, 0)
            cnt[n] = cnt.get(n, 0) + 1
        return ans`,
    java: `class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> cnt = new HashMap<>();
        int ans = 0;
        for (int n : nums) {
            ans += cnt.getOrDefault(n, 0);
            cnt.put(n, cnt.getOrDefault(n, 0) + 1);
        }
        return ans;
    }
}`,
  },
  1672: {
    lc: 1672, complexity: 'O(m·n) time · O(1) space',
    cpp: `class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts) {
        int best = 0;
        for (auto& row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            best = max(best, sum);
        }
        return best;
    }
};`,
    python: `class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        return max(sum(row) for row in accounts)`,
    java: `class Solution {
    public int maximumWealth(int[][] accounts) {
        int best = 0;
        for (int[] row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            best = Math.max(best, sum);
        }
        return best;
    }
}`,
  },
  1920: {
    lc: 1920, complexity: 'O(n) time · O(n) space',
    cpp: `class Solution {
public:
    vector<int> buildArray(vector<int>& nums) {
        vector<int> res(nums.size());
        for (int i = 0; i < nums.size(); i++) res[i] = nums[nums[i]];
        return res;
    }
};`,
    python: `class Solution:
    def buildArray(self, nums: List[int]) -> List[int]:
        return [nums[nums[i]] for i in range(len(nums))]`,
    java: `class Solution {
    public int[] buildArray(int[] nums) {
        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) res[i] = nums[nums[i]];
        return res;
    }
}`,
  },
};
