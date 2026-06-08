# ⚔ Quest: Restore IP Addresses (Revisited)

> **Day 28** · [Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/) · Medium · 15 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Restore IP Addresses on LeetCode](https://leetcode.com/problems/restore-ip-addresses/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Restore IP Addresses #93](https://leetcode.com/problems/restore-ip-addresses/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Partition Backtracking**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Partition Backtracking

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Draw the decision tree. Trace choose / explore / unchoose.

```
Apply Partition Backtracking step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

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

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Partition Backtracking"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Partition Backtracking

---

*One quest down. The next one builds on this pattern. →*
