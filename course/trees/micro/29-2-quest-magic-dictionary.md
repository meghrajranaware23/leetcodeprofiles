<!-- hand-authored -->
# ⚔ Quest: Magic Dictionary

> **Day 29** · [Implement Magic Dictionary #676](https://leetcode.com/problems/implement-magic-dictionary/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Implement Magic Dictionary on LeetCode](https://leetcode.com/problems/implement-magic-dictionary/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For each search word, count mismatches against candidate dictionary words. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Implement Magic Dictionary #676](https://leetcode.com/problems/implement-magic-dictionary/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Trie + Wildcard Design** — Day 19 trie insert + Day 24 wildcard branching, constrained to **exactly one** mismatch.

If you're stuck after 5 minutes: filter by equal length first, then count `word[i] != searchWord[i]`. Return true only when count equals 1. Trie DFS is the scale-up when the dictionary is large.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie + Wildcard Design (exactly-one mismatch)

**How to identify this from the problem statement:**
- **"Magic" / "one character different"** → mismatch counter, not fuzzy distance
- **Design class** — `buildDict` + `search` → store structure, query many times
- Differs from Day 24 `WordDictionary` — no `.` in query; diff count is implicit

| Keyword / phrase | What it signals |
|---|---|
| "exactly one letter different" | `diff == 1` after char-by-char compare |
| "same length" | Skip words with `len != searchWord.len` |
| "buildDict" then "search" | Preprocess dictionary once |
| "implement" / design | Class with two methods |

**Why this pattern works:** The constraint is local — each position either matches or contributes to the one allowed mismatch. No subtree aggregation needed.

**How a strong solver thinks before coding:**
1. *"Store words in buildDict."*
2. *"search: same length only."*
3. *"Count index mismatches — return true iff diff == 1."*
4. *"Trie upgrade: dfs(node, i, used_mismatch) for large dicts."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Edit distance / Levenshtein** | Overkill — only ±1 substitution at one index |
| **Accept diff=0 (exact match)** | Problem requires **exactly** one difference |
| **Accept diff≥1 (any mismatch)** | Two mismatches must return false |
| **Compare different lengths** | Invalid by problem definition |
| **Hash without length filter** | Wastes work — filter length first |

**The insight brute force misses:** With equal length, a single pass counting mismatches is O(L) per word — sufficient for Medium. Trie wildcard is the Day 19/24 scale path.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Add and Search Word #211](https://leetcode.com/problems/add-and-search-word-data-structure-design/) | `.` wildcard in query | Trie DFS branch on `.` (Day 24) |
| [Implement Trie #208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Exact insert/search | Day 19 base |
| [Words Within Two Edits #2452](https://leetcode.com/problems/word-within-two-edits-of-dictionary/) | Up to 2 mismatches | Same compare, higher threshold |

Day 19 builds the tree. Day 24 adds wildcard branches. Day 29 constrains mismatch count.

---

## 📖 Walkthrough

**Mismatch count on equal-length strings.**

```
Dictionary after buildDict: ["hello", "leetcode"]

search("hello"):  vs "hello" diff=0, vs "leetcode" len≠5 → false
search("hallo"):   vs "hello" → h=h, a≠e, l=l, l=l, o=o → diff=1 → true ✓
search("hell"):    len=4 → skip all → false
search("leetcoded"): len=9 → false
search("lhello"):  vs "hello" diff=1 at index 0 → true ✓
search("hellp"):   vs "hello" diff=1 at last char → true ✓
search("heloo"):   vs "hello" diff=2 (e≠l, l≠o) → false
```

**Trie wildcard mental model (scale-up):**

```
search("hallo") via trie:
  h → a (match) → at 'l': try match 'l' OR use mismatch budget on 'e' path
  exactly one branch may consume the budget
```

> 💡 **The insight:** Exactly-one is a **hard constraint** — count, don't boolean-or all mismatches.

---

## Solution

### C++
```cpp
class MagicDictionary {
    vector<string> words;
public:
    void buildDict(vector<string> dictionary) { words = dictionary; }
    bool search(string searchWord) {
        for (auto& w : words) {
            if (w.size() != searchWord.size()) continue;
            int diff = 0;
            for (int i = 0; i < (int)w.size(); i++)
                if (w[i] != searchWord[i]) diff++;
            if (diff == 1) return true;
        }
        return false;
    }
};
```

### Python
```python
class MagicDictionary:
    def __init__(self):
        self.words = []

    def buildDict(self, dictionary: List[str]) -> None:
        self.words = dictionary

    def search(self, searchWord: str) -> bool:
        for word in self.words:
            if len(word) != len(searchWord): continue
            if sum(a != b for a, b in zip(word, searchWord)) == 1:
                return True
        return False
```

### Java
```java
class MagicDictionary {
    private String[] words;
    public void buildDict(String[] dictionary) { words = dictionary; }
    public boolean search(String searchWord) {
        for (String w : words) {
            if (w.length() != searchWord.length()) continue;
            int diff = 0;
            for (int i = 0; i < w.length(); i++)
                if (w.charAt(i) != searchWord.charAt(i)) diff++;
            if (diff == 1) return true;
        }
        return false;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Exactly one different"** → mismatch counter, not edit distance.
- **"Same length"** → first filter before char compare.
- **"Day 24 wildcard cousin"** → trie DFS when dict grows.
- **"diff == 1 only"** → diff=0 (exact) and diff≥2 both false.

If you built a trie with wildcard branches, that's the S-Rank design — today's solution is the direct compare shortcut.

> 🎯 **Pattern Unlocked:** Trie + Wildcard Design — exactly-one mismatch search.

---

*One quest down. Next: quad-tree unify/split on a grid. →*
