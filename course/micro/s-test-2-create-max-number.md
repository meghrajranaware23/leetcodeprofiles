# ⚔ S-Rank Test — Problem 2

> [Create Maximum Number #321](https://leetcode.com/problems/create-maximum-number/) · **Hard** · 300 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Create Maximum Number on LeetCode](https://leetcode.com/problems/create-maximum-number/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **Three patterns in one:** Greedy decreasing stack (Day 26) to pick digits from each array, **lexicographic merge** of two sequences, and **exhaustive split** over how many digits come from each array.

---

## The Problem

Given two arrays of length `m` and `n` and integers `k`, where `k ≤ m + n`, find the **maximum number** you can form by choosing **exactly `k` digits** from the two arrays combined, preserving relative order within each array.

Return the answer as an integer array — the digits of the maximum number, most significant digit first.

```
Input:  nums1 = [3, 4, 6, 5], nums2 = [9, 1, 2, 5, 8, 3], k = 5
Output: [9, 8, 6, 5, 3]

Input:  nums1 = [6, 7], nums2 = [6, 0, 4], k = 5
Output: [6, 7, 6, 0, 4]

Input:  nums1 = [3, 9], nums2 = [8, 9], k = 3
Output: [9, 8, 9]
```

---

## 💡 Hints

**Hint 1 — Split the budget:** You must pick exactly `k` digits total. Try every split `i + j = k` where `i` digits come from `nums1` and `j` from `nums2` (with `0 ≤ i ≤ min(k, m)` and `0 ≤ j ≤ min(k, n)`). For each split, build the best subsequence from each array and merge.

**Hint 2 — Greedy stack per array:** To pick `t` digits from one array while preserving order, use a **monotonic decreasing stack** (Day 26 variant — maximize, not minimize). Drop digits while `stack.top() < current` and you still have enough remaining digits to fill `t` slots.

**Hint 3 — Drop budget:** From array of length `n`, picking `t` digits means dropping exactly `n − t` digits. Pop from stack while `top < current` and `drops_remaining > 0`.

**Hint 4 — Lexicographic merge:** Given two digit sequences `A` and `B` (each already optimal for its split), merge them into the largest combined sequence — same spirit as merge in merge sort, but pick the **lexicographically larger** head at each step. Compare `A[i:]` vs `B[j:]` when heads tie in value but order matters.

**Hint 5 — Take global max:** Among all valid splits, compare resulting merged sequences lexicographically. Return the largest. O(k × (m + n)) splits each doing O(m + n) work — acceptable for constraints.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy Monotonic Stack + Lexicographic Merge + Exhaustive Split (Day 26 × 3)

| Clue in the problem | What it signals |
|---|---|
| "maximum number" from subsequence | Decreasing greedy stack — pop smaller leading digits |
| "preserving relative order" | Subsequence, not sort — stack construction |
| two arrays combined, exactly k digits | Split k between arrays, merge results |
| "most significant digit first" | Lexicographic comparison on digit arrays |
| Hard + two arrays | Stack per array + merge + enumerate split |

**How to identify from the statement:** "Create maximum number from two arrays, k digits total, order preserved" → **for each split, greedy stack pick from each array, merge lexicographically, take max**.

**How a strong solver thinks before coding:**
1. *"k digits total → try i from nums1, k−i from nums2."*
2. *"Pick t from one array → decreasing stack with drop budget."*
3. *"Merge two picks greedily — larger lex head wins."*
4. *"Compare all splits, return best."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all C(m+n, k) index combinations** | Exponential/combinatorial explosion |
| **Sort all digits and take largest k** | Violates relative order within each array |
| **Greedy on combined array without split** | Can't freely interleave — must respect per-array order |
| **Merge without optimal per-array pick** | Suboptimal subsequences before merge — must stack-pick first |
| **Increasing stack (Remove K Digits style)** | Wrong direction — we want **maximum**, decreasing stack |

**The insight brute force misses:** The problem decomposes into independent **optimal subsequence picks** (stack) plus **optimal interleaving** (merge). Only the split count `i` is unknown — try all O(k) splits.

---

## 🎯 Transfer to Unseen Problems

Can you spot greedy-stack + merge thinking on unfamiliar wording?

**Scenario 1:** *"Pick k digits from one array (not two) to form the largest number."*

Which pattern? **Single-array decreasing stack** — Remove K Digits inverse (Day 26).

**Scenario 2:** *"Merge two sorted arrays into one sorted array."*

Which pattern? **Standard merge** — but Create Maximum Number uses **lexicographic** merge on subsequence picks, not sorted merge.

**Scenario 3:** *"Split array at one point, pick best subsequence from each half, concatenate."*

Which pattern? **Single split variant of #321** — one split instead of two arrays.

> **Answer key:** Scenario 1 → decreasing stack only. Scenario 2 → standard merge (different from #321). Scenario 3 → #321 with one array split.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
nums1 = [3, 9],  nums2 = [8, 9],  k = 3

Split i=1 from nums1, j=2 from nums2:
  pick( nums1, 1 ) → [9]
  pick( nums2, 2 ) → [9, 8]  (stack: drop 0 from [8,9] → take both, reorder via stack → [9,8])
  merge [9] + [9,8]: compare heads → [9,9,8]

Split i=2, j=1:
  pick( nums1, 2 ) → [9, 3] → actually [3,9] pick 2 → decreasing stack → [9,3]? 
  From [3,9] pick 2 digits: push 3, 9>3 no pop needed → [3,9] but we want max...
  Stack: 3, then 9 → [3,9]. merge with [9] from nums2...

Split i=0, j=3: pick [] + [9,8,9] → [9,8,9]  ← best lex

Answer: [9, 8, 9] ✓
```

### Helper: pick t digits with decreasing stack

```text
pick(nums, t):
  drop = len(nums) - t
  stack = []
  for c in nums:
    while drop > 0 and stack and stack[-1] < c:
      stack.pop(); drop--
    stack.append(c)
  return stack[:t]
```

### C++
```cpp
class Solution {
    vector<int> pick(vector<int>& nums, int t) {
        int drop = (int)nums.size() - t;
        vector<int> st;
        for (int c : nums) {
            while (drop > 0 && !st.empty() && st.back() < c) {
                st.pop_back();
                drop--;
            }
            st.push_back(c);
        }
        st.resize(t);
        return st;
    }

    vector<int> merge(vector<int>& a, vector<int>& b) {
        vector<int> res;
        int i = 0, j = 0;
        while (i < (int)a.size() || j < (int)b.size()) {
            if (lexicographical_compare(a.begin() + i, a.end(),
                                        b.begin() + j, b.end()))
                res.push_back(b[j++]);
            else
                res.push_back(a[i++]);
        }
        return res;
    }

public:
    vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
        vector<int> best;
        int m = nums1.size(), n = nums2.size();

        for (int i = max(0, k - n); i <= min(k, m); i++) {
            int j = k - i;
            vector<int> a = pick(nums1, i);
            vector<int> b = pick(nums2, j);
            vector<int> cur = merge(a, b);
            if (cur > best) best = cur;
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maxNumber(self, nums1: list[int], nums2: list[int], k: int) -> list[int]:
        def pick(nums, t):
            drop = len(nums) - t
            stack = []
            for c in nums:
                while drop > 0 and stack and stack[-1] < c:
                    stack.pop()
                    drop -= 1
                stack.append(c)
            return stack[:t]

        def merge(a, b):
            res = []
            i = j = 0
            while i < len(a) or j < len(b):
                if a[i:] > b[j:]:
                    res.append(a[i]); i += 1
                else:
                    res.append(b[j]); j += 1
            return res

        best = []
        for i in range(max(0, k - len(nums2)), min(k, len(nums1)) + 1):
            cur = merge(pick(nums1, i), pick(nums2, k - i))
            if cur > best:
                best = cur
        return best
```

### Java
```java
class Solution {
    private int[] pick(int[] nums, int t) {
        int drop = nums.length - t;
        List<Integer> st = new ArrayList<>();
        for (int c : nums) {
            while (drop > 0 && !st.isEmpty() && st.get(st.size() - 1) < c) {
                st.remove(st.size() - 1);
                drop--;
            }
            st.add(c);
        }
        int[] res = new int[t];
        for (int i = 0; i < t; i++) res[i] = st.get(i);
        return res;
    }

    private int[] merge(int[] a, int[] b) {
        List<Integer> res = new ArrayList<>();
        int i = 0, j = 0;
        while (i < a.length || j < b.length) {
            if (compareSuffix(a, i, b, j) < 0)
                res.add(b[j++]);
            else
                res.add(a[i++]);
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }

    private int compareSuffix(int[] a, int i, int[] b, int j) {
        while (i < a.length && j < b.length) {
            if (a[i] != b[j]) return Integer.compare(a[i], b[j]);
            i++; j++;
        }
        return Integer.compare(a.length - i, b.length - j);
    }

    public int[] maxNumber(int[] nums1, int[] nums2, int k) {
        int[] best = new int[0];
        int m = nums1.length, n = nums2.length;

        for (int i = Math.max(0, k - n); i <= Math.min(k, m); i++) {
            int[] cur = merge(pick(nums1, i), pick(nums2, k - i));
            if (compareArr(cur, best) > 0) best = cur;
        }
        return best;
    }

    private int compareArr(int[] a, int[] b) {
        if (a.length != b.length) return Integer.compare(a.length, b.length);
        for (int i = 0; i < a.length; i++)
            if (a[i] != b[i]) return Integer.compare(a[i], b[i]);
        return 0;
    }
}
```

**Complexity:** O(k × (m + n)) time · O(k) space per split

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Maximum number, order preserved"** → Decreasing monotonic stack (Day 26 inverse of Remove K Digits).
- **"Exactly k from two arrays"** → Enumerate split i + j = k.
- **"Combine two picks"** → Lexicographic merge — larger suffix wins on tie.
- **"Global maximum"** → Compare all split results.

Three patterns, one Hard. If Day 26's stack was muscle memory, #321 adds merge and split enumeration on top.

---

*Problem 2 complete. Proceed to Problem 3. →*
