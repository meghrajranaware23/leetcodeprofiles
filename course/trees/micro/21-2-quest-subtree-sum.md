<!-- hand-authored -->
# ⚔ Quest: Most Frequent Subtree Sum

> **Day 21** · [Most Frequent Subtree Sum #508](https://leetcode.com/problems/most-frequent-subtree-sum/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Most Frequent Subtree Sum on LeetCode](https://leetcode.com/problems/most-frequent-subtree-sum/)**

> ⚔ **Hunter's rule:** For each node, compute subtree sum bottom-up. Track frequencies in a map. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Most Frequent Subtree Sum #508](https://leetcode.com/problems/most-frequent-subtree-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Subtree sum + frequency map** — postorder returns sum; after children, `freq[sum]++`; return sum to parent.

If you're stuck after 5 minutes: one DFS. After it finishes, find max count and collect all sums with that count.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Subtree Sum + Frequency

**How to identify this from the problem statement:**
- "Subtree sum" for every node
- "Most frequent" → hashmap count
- Return all modes (may tie)

| Keyword / phrase | What it signals |
|---|---|
| "subtree sum" | Postorder: val + left + right |
| "most frequent" | Map sum → count |
| "return all values with highest frequency" | Tie collection |
| "may include negative" | Sums can be negative — map handles |

**Why this pattern works:** Each node's subtree sum is computed once from child returns — O(n). Map aggregates frequencies in same pass.

**How a strong solver thinks before coding:**
1. *"dfs returns int sum."*
2. *"null → 0."*
3. *"s = val + dfs(L) + dfs(R); cnt[s]++; return s."*
4. *"Scan map for maxFreq keys."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Re-sum subtree per node** | O(n²) |
| **Separate passes for sum then freq** | One postorder pass suffices |
| **Sort all sums** | Map is O(1) average per update |
| **Top-down for subtree total** | Subtree sum needs child answers first |

**The insight brute force misses:** Return value = subtree sum; map = side effect at each node.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Subtree of Another Tree #572](https://leetcode.com/problems/subtree-of-another-tree/) | Compare structure | Subtree focus |
| [Count Univalue Subtrees #250](https://leetcode.com/problems/count-univalue-subtrees/) | Postorder bool | Same bubble shape |
| [Path Sum III #437](https://leetcode.com/problems/path-sum-iii/) | Prefix map on paths | Different aggregate |

---

## 📖 Walkthrough

```
        5
       / \
      2  -3

Postorder:
  dfs(2):  s=2,  cnt{2:1}
  dfs(-3): s=-3, cnt{2:1,-3:1}
  dfs(5):  s=4,  cnt{2:1,-3:1,4:1}

maxFreq=1 → return [2,-3,4] (all tie)
```

> 💡 **The insight:** Every node is root of a subtree — one postorder visit records each subtree sum exactly once.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<int,int> cnt;
    int maxFreq = 0;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int s = node->val + dfs(node->left) + dfs(node->right);
        maxFreq = max(maxFreq, ++cnt[s]);
        return s;
    }
public:
    vector<int> findFrequentTreeSum(TreeNode* root) {
        dfs(root);
        vector<int> res;
        for (auto& [s, c] : cnt)
            if (c == maxFreq) res.push_back(s);
        return res;
    }
};
```

### Python
```python
from collections import Counter
class Solution:
    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:
        counter = Counter()
        def dfs(node):
            if not node: return 0
            s = node.val + dfs(node.left) + dfs(node.right)
            counter[s] += 1
            return s
        dfs(root)
        max_freq = max(counter.values())
        return [s for s, c in counter.items() if c == max_freq]
```

### Java
```java
class Solution {
    private Map<Integer,Integer> cnt = new HashMap<>();
    private int maxFreq = 0;
    public int[] findFrequentTreeSum(TreeNode root) {
        dfs(root);
        List<Integer> res = new ArrayList<>();
        for (Map.Entry<Integer,Integer> e : cnt.entrySet())
            if (e.getValue() == maxFreq) res.add(e.getKey());
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int s = node.val + dfs(node.left) + dfs(node.right);
        int c = cnt.merge(s, 1, Integer::sum);
        maxFreq = Math.max(maxFreq, c);
        return s;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Subtree sum"** → postorder return.
- **"Most frequent"** → hashmap side effect.
- **"Return sum to parent"** → not the freq map.
- **"Ties return all"** → scan for maxFreq.

> 🎯 **Pattern Unlocked:** Subtree Sum + Frequency

---

*One quest down. Next: good nodes — top-down max from Day 6. →*
