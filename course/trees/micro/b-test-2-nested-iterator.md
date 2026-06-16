<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 2

> [Flatten Nested List Iterator #341](https://leetcode.com/problems/flatten-nested-list-iterator/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Flatten Nested List Iterator on LeetCode](https://leetcode.com/problems/flatten-nested-list-iterator/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Nested lists are an N-ary tree of integers; simulate preorder with a stack. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Flatten Nested List Iterator #341](https://leetcode.com/problems/flatten-nested-list-iterator/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Stack-based tree traversal** — nested list = tree node with either integer leaf or list of children. Push items in **reverse** order so stack top = next preorder integer.

- Design class: `next()`, `hasNext()`.
- Constructor: push all top-level items reversed onto stack.
- `hasNext()`: while stack top is list (not integer), pop and push its children reversed.
- `next()`: pop integer from stack top.
- Same lazy pattern as Day 12 BST Iterator — one step at a time, O(1) amortized.

**Pattern name before coding:** *Stack preorder on N-ary nested structure.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Nested integer" + iterator → implicit tree
- Lazy flatten → stack, not full array upfront
- `hasNext` drives expansion of nested lists

**How a strong solver thinks before coding:**
1. *"Stack of NestedInteger pointers."*
2. *"Push reversed list so leftmost integer on top."*
3. *"hasNext: expand lists until integer or empty."*
4. *"next: pop and return getInteger()."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Flatten all to array in constructor** | O(n) space — stack achieves lazy O(depth) |
| **Re-traverse from root each next()** | O(n) per call |
| **Push without reverse order** | Wrong visit sequence |
| **Recursive flatten upfront** | Works but misses lazy design intent |

---

## 🎯 Transfer to Unseen Problems

Same stack machinery as BST Iterator (C-Rank test), but children are list elements instead of `left`/`right`. Day 19 N-ary "loop children" becomes "pop list, push children reversed."

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class NestedIterator {
    stack<NestedInteger*> st;
    void push(vector<NestedInteger>& lst) {
        for (int i = lst.size()-1; i >= 0; i--) st.push(&lst[i]);
    }
public:
    NestedIterator(vector<NestedInteger>& nestedList) { push(nestedList); }
    int next() { int v = st.top()->getInteger(); st.pop(); return v; }
    bool hasNext() {
        while (!st.empty() && !st.top()->isInteger()) {
            vector<NestedInteger>& lst = st.top()->getList();
            st.pop();
            for (int i = lst.size()-1; i >= 0; i--) st.push(&lst[i]);
        }
        return !st.empty();
    }
};
```

### Python
```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.stack = []
        self._flatten(nestedList)

    def _flatten(self, lst):
        for item in reversed(lst):
            self.stack.append(item)

    def next(self) -> int:
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        while self.stack:
            if self.stack[-1].isInteger():
                return True
            top = self.stack.pop()
            self._flatten(top.getList())
        return False
```

### Java
```java
public class NestedIterator implements Iterator<Integer> {
    private Deque<NestedInteger> stack = new ArrayDeque<>();
    public NestedIterator(List<NestedInteger> nestedList) {
        for (int i = nestedList.size()-1; i >= 0; i--)
            stack.push(nestedList.get(i));
    }
    @Override
    public Integer next() { return stack.pop().getInteger(); }
    @Override
    public boolean hasNext() {
        while (!stack.isEmpty() && !stack.peek().isInteger()) {
            List<NestedInteger> lst = stack.pop().getList();
            for (int i = lst.size()-1; i >= 0; i--) stack.push(lst.get(i));
        }
        return !stack.isEmpty();
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Nested list iterator"** → stack preorder traversal.
- **"Reverse push"** → correct left-to-right order on stack.
- **"hasNext expands lists"** → lazy like BST Iterator.
- **"N-ary tree of integers"** → Day 19 child loop via stack.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class NestedIterator {
    stack<NestedInteger*> st;
    void push(vector<NestedInteger>& lst) {
        for (int i = lst.size()-1; i >= 0; i--) st.push(&lst[i]);
    }
public:
    NestedIterator(vector<NestedInteger>& nestedList) { push(nestedList); }
    int next() { int v = st.top()->getInteger(); st.pop(); return v; }
    bool hasNext() {
        while (!st.empty() && !st.top()->isInteger()) {
            vector<NestedInteger>& lst = st.top()->getList();
            st.pop();
            for (int i = lst.size()-1; i >= 0; i--) st.push(&lst[i]);
        }
        return !st.empty();
    }
};
```

### Python
```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.stack = []
        self._flatten(nestedList)

    def _flatten(self, lst):
        for item in reversed(lst):
            self.stack.append(item)

    def next(self) -> int:
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        while self.stack:
            if self.stack[-1].isInteger():
                return True
            top = self.stack.pop()
            self._flatten(top.getList())
        return False
```

### Java
```java
public class NestedIterator implements Iterator<Integer> {
    private Deque<NestedInteger> stack = new ArrayDeque<>();
    public NestedIterator(List<NestedInteger> nestedList) {
        for (int i = nestedList.size()-1; i >= 0; i--)
            stack.push(nestedList.get(i));
    }
    @Override
    public Integer next() { return stack.pop().getInteger(); }
    @Override
    public boolean hasNext() {
        while (!stack.isEmpty() && !stack.peek().isInteger()) {
            List<NestedInteger> lst = stack.pop().getList();
            for (int i = lst.size()-1; i >= 0; i--) stack.push(lst.get(i));
        }
        return !stack.isEmpty();
    }
}
```

**Complexity:** undefined
