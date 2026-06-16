<!-- hand-authored -->
# ⚔ Quest: Get Maximum in Generated Array

> **Day 4** · [Get Maximum in Generated Array #1646](https://leetcode.com/problems/get-maximum-in-generated-array/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Get Maximum in Generated Array on LeetCode](https://leetcode.com/problems/get-maximum-in-generated-array/)**

> ⚔ **Hunter's rule:** Run the Day 4 checklist on scratch paper before coding. Write the state sentence. Fill nums[0..7] by hand for n=7.

---

## The Problem

See the full problem statement on LeetCode: **[Get Maximum in Generated Array #1646](https://leetcode.com/problems/get-maximum-in-generated-array/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Formula-Driven Tabulation — recurrence is **given** in the problem.

**Hint 1:** Checklist state: `nums[i]` = value at index i in the generated array.

**Hint 2:** Bases: `nums[0]=0`, `nums[1]=1`. For `i ≥ 2`: if i even → `nums[i]=nums[i/2]`; if i odd → `nums[i]=nums[i/2]+nums[i/2+1]`.

**Hint 3:** Answer is **max** over all nums[0..n] — track running max while tabulating.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Formula-Driven Tabulation

**How to identify this from the problem statement:**
- Explicit generation rules (even/odd split)
- Build array 0..n sequentially
- Return aggregate (max), not last cell

| Keyword / phrase | What it signals |
|---|---|
| "generated array" / rules for even and odd i | Given recurrence — tabulate |
| "maximum value" | Track max during fill, not return nums[n] |
| Small n (≤ 100) | O(n) tabulation trivial |

**Why brute force fails:** Simulating without array repeats index lookups — still O(n) but tabulation makes dependencies explicit for learning.

**How a strong solver thinks before coding:**
1. *"Checklist: state = nums[i]."*
2. *"i/2 and i/2+1 always < i for i≥2 — left-to-right safe."*
3. *"Even vs odd branch in loop."*
4. *"mx = max(mx, nums[i]) each step."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Recompute nums[i] recursively without memo** | Overlap on i/2 — unnecessary |
| **Tabulate 0..n with formula** | O(n) each index once ✓ |
| **Return nums[n] instead of max** | Wrong answer extraction |

```
n=6 example trace:
i: 0  1  2  3  4  5  6
   0  1  1  2  1  3  2
              ↑     ↑
         even:1  odd:1+2=3

max = 3
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Given formula? | Answer cell |
|---|---|---|
| **Generated Array #1646** | Yes (even/odd) | max(nums) |
| Fib / Trib | Yes (recurrence) | nums[n] |
| Pascal row | Yes (two above) | full row |

---

## 📖 Walkthrough

**n=4 — fill checklist then table:**

```
□ STATE: nums[i] = value at i
□ TRANSITION: even → nums[i/2]; odd → nums[i/2]+nums[i/2+1]
□ BASE: nums[0]=0, nums[1]=1
□ ORDER: i=2..4 left-to-right

i=2 (even): nums[1]=1
i=3 (odd):  nums[1]+nums[2]=1+1=2
i=4 (even): nums[2]=1

nums = [0,1,1,2,1]  max=2 ✓
```

> 💡 **The insight:** Day 4 checklist turns a wordy problem into a 5-line loop.

---

## Solution

### C++
```cpp
class Solution {
public:
    int getMaximumGenerated(int n) {
        if (n == 0) return 0;
        vector<int> nums(n + 1);
        nums[1] = 1;
        int mx = 1;
        for (int i = 2; i <= n; i++) {
            nums[i] = (i % 2 == 0) ? nums[i / 2] : nums[i / 2] + nums[i / 2 + 1];
            mx = max(mx, nums[i]);
        }
        return mx;
    }
};
```

### Python
```python
class Solution:
    def getMaximumGenerated(self, n: int) -> int:
        if n == 0: return 0
        nums = [0] * (n + 1)
        nums[1] = 1
        for i in range(2, n + 1):
            nums[i] = nums[i // 2] if i % 2 == 0 else nums[i // 2] + nums[i // 2 + 1]
        return max(nums)
```

### Java
```java
class Solution {
    public int getMaximumGenerated(int n) {
        if (n == 0) return 0;
        int[] nums = new int[n + 1];
        nums[1] = 1;
        int mx = 1;
        for (int i = 2; i <= n; i++) {
            nums[i] = (i % 2 == 0) ? nums[i / 2] : nums[i / 2] + nums[i / 2 + 1];
            mx = Math.max(mx, nums[i]);
        }
        return mx;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Day 4 checklist first"** → State sentence before loop.
- **"Even/odd = two transitions"** → Branch inside tabulation loop.
- **"max, not nums[n]"** → Answer extraction step 6.
- **"i/2 dependencies"** → Like Counting Bits — smaller index first.

> 🎯 **Pattern Unlocked:** Formula-Driven Tabulation

---

*One quest down. Next: Pascal row only — 1-row rolling from Day 4 visual. →*
