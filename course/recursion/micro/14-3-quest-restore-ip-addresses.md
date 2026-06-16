<!-- hand-authored -->
# ⚔ Quest: Restore IP Addresses

> **Day 14** · [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Restore IP Addresses on LeetCode](https://leetcode.com/problems/restore-ip-addresses/)**

> ⚔ **Hunter's rule:** Same cut loop as Palindrome Partition — but segments must be valid octets and you need **exactly 4**. Trace `"25525511135"`.

---

## The Problem

Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into `s`. You cannot reorder or drop digits.

A valid IP address consists of exactly four integers (0–255) separated by dots, with no leading zeros except `"0"` itself.

```
Input:  s = "25525511135"
Output: ["255.255.11.135", "255.255.111.35"]

Input:  s = "0000"
Output: ["0.0.0.0"]

Input:  s = "101023"
Output: ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"]
```

---

## 💡 Hints

**Hint 1:** Same partition skeleton: try cuts `s[i..j]` for `j` in `[i, min(i+2, n-1)]` — at most 3 digits per octet.

**Hint 2:** `valid(seg)`: non-empty, length ≤ 3, no leading zero (unless seg is `"0"`), value ≤ 255.

**Hint 3:** Track `parts` count. Success only when `parts == 4` **and** `i == len(s)` — all digits used, exactly four octets.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed-Segment Partition (4 parts)

| vs Palindrome Partition | Change |
|---|---|
| Variable parts until end | Exactly 4 parts |
| Palindrome validator | Numeric octet validator |
| Record when `i == n` | Record when `parts == 4 && i == n` |

**How a strong solver thinks before coding:**
1. *"Partition template — bounded cut width (max 3)."*
2. *"Reject '01', '256' before push."*
3. *"Must consume entire string in 4 cuts."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Three nested loops for dot positions** | Works for IP specifically but doesn't generalize; same O(1) search space here |
| **Allow 3 or 5 parts** | Invalid IP format |
| **Accept leading zeros** | `"01.2.3.4"` is not valid |
| **Stop at first valid IP** | Problem asks for all |

---

## 🔗 Same Pattern, Other Problems

| Problem | Segment rule |
|---|---|
| [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) | Palindrome substring |
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | 4 octets, 0–255 |
| [Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/) | C-Rank test — Fibonacci constraint on segments |

---

## 📖 Walkthrough

`s = "25525511135"` (partial):

```
dfs(i=0, parts=0, [])
  cut "255" valid → dfs(i=3, parts=1, ["255"])
    cut "255" valid → dfs(i=6, parts=2, ["255","255"])
      cut "11" valid → dfs(i=8, parts=3, ["255","255","11"])
        cut "135" valid → dfs(i=11, parts=4) → i==len → "255.255.11.135" ✓
      cut "111" valid → ...
        cut "35" → "255.255.111.35" ✓
```

---

## Solution

### C++
```cpp
class Solution {
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
};
```

### Python
```python
class Solution:
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
        return res
```

### Java
```java
class Solution {
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
}
```

**Complexity:** O(1) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Same cut loop as #131** → Different validator + fixed part count.
- **Max 3 chars per cut** → Loop bound `min(i+2, n-1)`.
- **parts==4 && i==n** → All digits used, valid IP shape.

> 🎯 **Pattern Unlocked:** Fixed-Segment Partition

---

*Both quests complete. Head to the checkpoint. →*
