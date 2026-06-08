# ⚔ B-Rank Test — Problem 2

> [Flatten Nested List Iterator #341](https://leetcode.com/problems/flatten-nested-list-iterator/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Flatten Nested List Iterator on LeetCode](https://leetcode.com/problems/flatten-nested-list-iterator/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Flatten Nested List Iterator #341](https://leetcode.com/problems/flatten-nested-list-iterator/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class NestedIterator {
    vector<int> flat;
    int i = 0;
    void flatten(const vector<NestedInteger>& nested) {
        for (auto& ni : nested) {
            if (ni.isInteger()) flat.push_back(ni.getInteger());
            else flatten(ni.getList());
        }
    }
public:
    NestedIterator(vector<NestedInteger>& nestedList) { flatten(nestedList); }
    int next() { return flat[i++]; }
    bool hasNext() { return i < (int)flat.size(); }
};
```

### Python
```python
class NestedIterator:
    def __init__(self, nestedList: List[NestedInteger]):
        self.stack = nestedList[::-1]
    def next(self) -> int:
        return self.stack.pop().getInteger()
    def hasNext(self) -> bool:
        while self.stack and not self.stack[-1].isInteger():
            self.stack.extend(self.stack.pop().getList()[::-1])
        return bool(self.stack)
```

### Java
```java
public class NestedIterator implements Iterator<Integer> {
    Deque<NestedInteger> st;
    public NestedIterator(List<NestedInteger> nestedList) {
        st = new ArrayDeque<>();
        for (int i = nestedList.size() - 1; i >= 0; i--) st.push(nestedList.get(i));
    }
    public Integer next() { return st.pop().getInteger(); }
    public boolean hasNext() {
        while (!st.isEmpty() && !st.peek().isInteger()) {
            List<NestedInteger> list = st.pop().getList();
            for (int i = list.size() - 1; i >= 0; i--) st.push(list.get(i));
        }
        return !st.isEmpty();
    }
}
```

**Complexity:** O(n) total · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
