# ⚔ Quest: Magic Dictionary

> **Day 29** · [Implement Magic Dictionary #676](https://leetcode.com/problems/implement-magic-dictionary/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Implement Magic Dictionary on LeetCode](https://leetcode.com/problems/implement-magic-dictionary/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Implement Magic Dictionary #676](https://leetcode.com/problems/implement-magic-dictionary/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Trie + Wildcard Design**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie + Wildcard Design

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small tree before reading the code:

```
        3
       / \
      9    20
          /  \
         15   7

Apply Trie + Wildcard Design step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class MagicDictionary {
    unordered_map<int, vector<string>> buckets;
    bool diffOne(const string& a, const string& b) {
        if (a.size() != b.size()) return false;
        int cnt = 0;
        for (int i = 0; i < (int)a.size(); ++i)
            if (a[i] != b[i] && ++cnt > 1) return false;
        return cnt == 1;
    }
public:
    MagicDictionary() {}
    void buildDict(vector<string> dictionary) {
        for (auto& w : dictionary) buckets[w.size()].push_back(w);
    }
    bool search(string searchWord) {
        if (!buckets.count(searchWord.size())) return false;
        for (auto& w : buckets[searchWord.size()])
            if (diffOne(w, searchWord)) return true;
        return false;
    }
};
```

### Python
```python
class MagicDictionary:
    def __init__(self):
        self.words = defaultdict(list)
    def buildDict(self, dictionary: List[str]) -> None:
        for w in dictionary:
            self.words[len(w)].append(w)
    def search(self, searchWord: str) -> bool:
        for w in self.words[len(searchWord)]:
            if sum(a != b for a, b in zip(w, searchWord)) == 1:
                return True
        return False
```

### Java
```java
class MagicDictionary {
    Map<Integer, List<String>> buckets = new HashMap<>();
    public void buildDict(String[] dictionary) {
        for (String w : dictionary) buckets.computeIfAbsent(w.length(), k -> new ArrayList<>()).add(w);
    }
    public boolean search(String searchWord) {
        List<String> list = buckets.get(searchWord.length());
        if (list == null) return false;
        for (String w : list) {
            int diff = 0;
            for (int i = 0; i < w.length(); i++) if (w.charAt(i) != searchWord.charAt(i) && ++diff > 1) break;
            if (diff == 1) return true;
        }
        return false;
    }
}
```

**Complexity:** O(n·L) build · O(m·L) search · O(n·L) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Trie + Wildcard Design"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Trie + Wildcard Design

---

*One quest down. The next one builds on this pattern. →*
