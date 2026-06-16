<!-- hand-authored -->
# ⚔ Quest: Restore IP Addresses (Revisited)

> **Day 28** · [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) · Medium · 15 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Restore IP Addresses on LeetCode](https://leetcode.com/problems/restore-ip-addresses/)**

> ⚔ **Hunter's rule:** Same Day 14 cut loop — but add **length pruning** before every dfs. Trace `"25525511135"` and count how many branches die early.

---

## The Problem

Given a string `s` containing only digits, return all possible valid IP addresses formed by inserting dots. You cannot reorder or drop digits.

A valid IP has exactly four integers (0–255) separated by dots, with no leading zeros except `"0"` itself.

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

**Hint 1:** Day 14 template unchanged: `dfs(i, parts, path)` — try cuts `s[i..j]` for `j` in `[i, min(i+2, n-1)]`.

**Hint 2:** `valid(seg)`: non-empty, len ≤ 3, no leading zero (unless `"0"`), `int(seg) ≤ 255`.

**Hint 3 (S-Rank):** Before the cut loop, check remaining length: with `rem_parts = 4 - parts` and `rem_chars = n - i`, require `rem_parts ≤ rem_chars ≤ 3 * rem_parts`. Otherwise return immediately.

**Hint 4:** Success only when `parts == 4 && i == len(s)`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed-Segment Partition + Length Pruning (Day 14 revisit)

| Clue | Signal |
|---|---|
| "restore IP" / insert dots | 4-part string partition |
| digits only, use all | `i == n` at leaf |
| max 3 chars per segment | bounded cut width |
| S-Rank revisit | add remaining-length bounds prune |

**How a strong solver thinks before coding:**
1. *"Day 14 skeleton — 4 parts, octet validator."*
2. *"Length prune: not enough / too many digits for remaining octets."*
3. *"Trace `25525511135` — only two valid splits exist."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Three nested loops for dot positions** | Doesn't generalize; misses early length prune |
| **No length bounds check** | Explores cuts that can't finish in 4 octets |
| **Accept leading zeros** | `"01.2.3.4"` invalid |
| **Record when parts==4 but i≠n** | Leftover digits |

**The insight brute force misses:** With `k` octets left, you need at least `k` digits and at most `3k`. Check that **before** trying any cut.

---

## 🔗 Same Pattern, Other Problems

| Problem | Segment rule |
|---|---|
| [Palindrome Partitioning #131](https://leetcode.com/problems/palindrome-partitioning/) | Palindrome + `isPal` precompute (today's quest 2) |
| [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) | 4 octets + length prune |
| [Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/) | C-Rank test — Fibonacci constraint |

---

## 📖 Walkthrough

`s = "25525511135"` — full prune trace:

```
dfs(i=0, parts=0, rem_chars=11, rem_parts=4)
  bounds: 4≤11≤12 ✓
  j=0..2 cuts:
    "2" valid → dfs(1,1) ...
    "25" valid → dfs(2,1) ...
    "255" valid → dfs(3,1, ["255"])
      rem_chars=8, rem_parts=3 → 3≤8≤9 ✓
      "255" valid → dfs(6,2, ["255","255"])
        rem_chars=5, rem_parts=2 → 2≤5≤6 ✓
        "11" valid → dfs(8,3, [..,"11"])
          rem_chars=3, rem_parts=1 → 1≤3≤3 ✓
          "135" valid → dfs(11,4) → i==11 ✓ → "255.255.11.135"
        "111" valid → dfs(9,3, [..,"111"])
          "35" valid → "255.255.111.35" ✓
        "1113" len=4 → skip (Layer A)
      "2551" → 2551>255 → skip
    "2552" → leading? value? ...
```

Only **two** leaves survive — both famous answers.

Length prune example: at `i=0, parts=0`, cut `"255255"` (6 chars) leaves 5 chars for 3 octets — max 9, min 3, OK. But cut `"2552551"` leaves 4 chars for 3 octets — need min 3, max 9, OK... until validity fails on octet value. The prune shines deeper in the tree when `rem_chars < rem_parts`.

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

Before writing code, a strong solver's internal monologue sounds like this:

- **"Day 14 revisit — same push/pop cut loop."** → Don't reinvent the template.
- **"Length prune before cuts."** → `rem_parts ≤ rem_chars ≤ 3*rem_parts`.
- **"Two answers for `25525511135`."** → If you found more, check octet validation.
- **"parts==4 && i==n."** → Must consume every digit.

If you tried brute force first, that's fine — the breakthrough is **naming the prune layer**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Fixed-Segment Partition + Length Pruning

---

*One quest down. Next: Palindrome Partition with `isPal` precompute. →*
