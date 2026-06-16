<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 1

> [Minimum Cost Tree From Leaf Values #1130](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Cost Tree From Leaf Values on LeetCode](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/)**

> ⚔ **Hunter's rule:** **Tree merge DP** — combine adjacent leaves; cost = product of max in each subtree. Monotonic stack finds next greater element for optimal merges.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Cost Tree From Leaf Values #1130](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Interval/tree merge DP from A-Rank — merging adjacent nodes with multiplicative cost.

Think of `arr` as leaves left-to-right. Each internal node cost = `(max left subtree) × (max right subtree)`. Optimal merge order = **monotonic stack**: when current `a` exceeds stack top, pop and accumulate `mid * min(stack.top, a)`.

Alternative: interval `dp[i][j]` = min cost to merge `arr[i..j]` — O(n³). Stack is O(n).

**Pattern link:** Similar spirit to **Burst Balloons (Day 30)** — merge intervals with multiplicative cost, but leaves are fixed order.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree Merge DP (monotonic stack)

**How to identify from the statement:**
- Array of leaf values, build binary tree by combining neighbors
- Merge cost = product of max values in each side
- Minimize total merge cost

**How a strong solver thinks before coding:**
1. *"Each merge combines two adjacent intervals."*
2. *"Cost uses max in each part — larger values should merge late."*
3. *"Monotonic decreasing stack — pop smaller when larger arrives."*
4. *"ans += popped * min(neighbors)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all merge orders** | Catalan O(4^n/n^3) — n up to 500 |
| **Greedy merge smallest pair first** | Wrong — max values dominate cost |
| **Plain interval dp without optimization** | O(n³) may TLE on n=500 |

**The insight:** Next-greater-element stack encodes optimal merge order in O(n) — each leaf merged exactly once when its containing interval closes.

---

## 🎯 Transfer to Unseen Problems

*"Minimum cost to merge stones in a row with k at a time"* → interval DP with different merge rule. Same **adjacent merge** family as #1130.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
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
};
```

### Python
```python
class Solution:
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
        return ans
```

### Java
```java
class Solution {
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
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Merge adjacent leaves"** — tree built from array order.
- **"Cost = max_left × max_right"** — large values merge late.
- **"Monotonic stack"** — O(n) optimal merge order.
- **"Tree merge DP"** — A-Rank interval synthesis (#1130).

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
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
};
```

### Python
```python
class Solution:
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
        return ans
```

### Java
```java
class Solution {
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
}
```

**Complexity:** O(n) time · O(n) space
