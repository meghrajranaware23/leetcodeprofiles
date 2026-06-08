# ⚔ A-Rank Test — Problem 1

> [Minimum Cost Tree From Leaf Values #1130](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Cost Tree From Leaf Values on LeetCode](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Cost Tree From Leaf Values #1130](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Define the state and transition before you code.

Revisit your rank's cheat sheet. Is this linear DP, grid DP, knapsack, or state machine?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What is the state? What information describes a subproblem?
- What are the choices at each state?
- What's the transition formula?

**How a strong solver thinks before coding:**
1. *"What does dp[i] represent?"*
2. *"What's the base case?"*
3. *"Linear, grid, knapsack, or state machine?"*
4. *"Can I optimize the space?"*

---

## ❌ Why Brute Force Fails

DP problems have exponential recursion trees with massive overlap. Brute force means recomputing the same subproblems O(2^n) times. Define the state, cache it, and solve each subproblem exactly once.

---

## 🎯 Transfer to Unseen Problems

Can you define the state without the problem name telling you the pattern?

Read the statement once. Define dp[i] in one sentence. If you can write the transition in under 60 seconds, you're ready.

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

**Complexity:** Time: O(n), Space: O(n)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*1 of 3 test problems. Continue to the next. →*
