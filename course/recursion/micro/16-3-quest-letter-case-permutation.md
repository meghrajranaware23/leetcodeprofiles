<!-- hand-authored -->
# ⚔ Quest: Letter Case Permutation

> **Day 16** · [Letter Case Permutation #784](https://leetcode.com/problems/letter-case-permutation/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Letter Case Permutation on LeetCode](https://leetcode.com/problems/letter-case-permutation/)**

> ⚔ **Hunter's rule:** Each letter is a binary fork — lower or upper. Digits are forced. Same push/pop as Day 11, two branches per letter.

---

## The Problem

Given a string `s`, return all possible strings from changing the case of **letters** only. Digits stay fixed.

```
Input:  s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]

Input:  s = "3z4"
Output: ["3z4","3Z4"]

Input:  s = "12345"
Output: ["12345"]
```

---

## 💡 Hints

**Hint 1:** `dfs(i, path)` — process character `s[i]`.

**Hint 2:** If `s[i]` is a letter: push lowercase, dfs; change to uppercase in place (or push upper), dfs; pop.

**Hint 3:** If digit: push as-is, dfs, pop. Base case: `i == len(s)` → record path.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Binary Choice Backtracking (index-based)

| Clue | Signal |
|---|---|
| "letter case" / "upper or lower" | 2 branches per alpha char |
| digits fixed | Single branch |
| generate all strings | Record at `i == n` |

**Contrast with Word Search:** no grid — pure index walk like Day 11, but **fixed 2 branches** per letter instead of a candidate loop.

**How a strong solver thinks before coding:**
1. *"Binary decision per letter — subset include/exclude vibe from Day 11."*
2. *"Digits: no choice, still push/pop for uniform structure."*
3. *"2^(#letters) outputs."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Bitmask over letter positions** | Works but interview expects backtracking trace |
| **Forget to pop after digit branch** | Path grows incorrectly |
| **Change case globally on string** | Need independent choice per position |

---

## 🔗 Same Pattern, Other Problems

| Problem | Branching |
|---|---|
| [Letter Case Permutation #784](https://leetcode.com/problems/letter-case-permutation/) | 2 per letter |
| [Subsets #78](https://leetcode.com/problems/subsets/) | include/exclude per element |
| [Generate Parentheses #22](https://leetcode.com/problems/generate-parentheses/) | add '(' or ')' with constraints |

---

## 📖 Walkthrough

`s = "a1b2"`:

```
dfs(0, [])
  'a' lower: dfs(1, ['a'])
    '1': dfs(2, ['a','1'])
      'b' lower: dfs(3, ['a','1','b'])
        '2': dfs(4, ['a','1','b','2']) → record "a1b2" ✓
      'b' upper: ... → "a1B2" ✓
  'a' upper: ... → "A1b2", "A1B2" ✓
```

4 strings = 2² letter choices.

---

## Solution

### C++
```cpp
class Solution {
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
};
```

### Python
```python
class Solution:
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
        return res
```

### Java
```java
class Solution {
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
}
```

**Complexity:** O(n · 2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Binary branch per letter** → Day 11 include/exclude on a string.
- **Digits unchanged** → Single path, still push/pop.
- **C-Rank capstone** → Same choose/explore/unchoose across array, string, and grid.

> 🎯 **Pattern Unlocked:** Binary Choice Backtracking

---

*Both quests complete. Head to the checkpoint — then the C-Rank test. →*
