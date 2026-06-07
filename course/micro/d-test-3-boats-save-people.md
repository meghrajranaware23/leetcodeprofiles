# ⚔ D-Rank Test — Problem 3

> [Boats to Save People #881](https://leetcode.com/problems/boats-to-save-people/) · Medium · 100 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Boats to Save People on LeetCode](https://leetcode.com/problems/boats-to-save-people/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given an array `people` where `people[i]` is the weight of the `i`th person, and a boat with weight limit `limit`, return the **minimum number of boats** to carry every person. Each boat carries at most two people, provided their combined weight is at most `limit`.

```
Input:  people = [1, 2], limit = 3
Output: 1

Input:  people = [3, 2, 2, 1], limit = 3
Output: 3
Explanation: Boat 1: (1, 2), Boat 2: (2), Boat 3: (3)

Input:  people = [3, 5, 3, 4], limit = 5
Output: 4
```

---

## 💡 Hints

> 🎯 **What's being tested:** Opposite-end two pointers (Day 6) + greedy pairing — sort weights, pair the lightest with the heaviest when possible.

Sort `people`. Place `left` at the lightest, `right` at the heaviest. If `people[left] + people[right] <= limit`, they share a boat — move both pointers inward. Otherwise, the heavy person goes alone — decrement `right` only. Count boats as you go.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sort + Opposite-End Two Pointers + Greedy (Day 6)

| Clue in the problem | What it signals |
|---|---|
| "at most two people per boat" | Pairing problem — match light with heavy |
| "minimum number of boats" | Greedy optimization — pair whenever possible |
| weight constraint on pairs | Check `lightest + heaviest <= limit` |
| unsorted weights | Sort first to enable opposite-end pointers |
| "carry every person" | Every person assigned exactly once — pointers only move inward |

**How to identify from the statement:** "Pair items with a capacity constraint, minimize groups" on sorted data → **greedy two-pointer pairing**. The heaviest person either pairs with the lightest or sails alone.

**How a strong solver thinks before coding:**
1. *"Max 2 per boat → try pairing lightest + heaviest."*
2. *"Minimize boats → greedy: pair whenever sum ≤ limit."*
3. *"Sort first → opposite-end pointers."*
4. *"Can't pair heavy with light? Heavy goes solo — right pointer moves alone."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every subset pairing with backtracking** | Exponential — overkill for a greedy problem |
| **Always pair consecutive sorted neighbors** | Wrong greedy — pairing (2,2) before trying (1,3) wastes boats |
| **Two pointers without sorting** | Can't know which end is lightest/heaviest |
| **Count pairs with nested loops** | O(n²) — greedy two-pointer solves in O(n) after sort |

**The insight brute force misses:** To minimize boats, always try to **rescue the heaviest person** by pairing them with the **lightest available**. If the lightest can't help, nobody can — the heavy person must go alone. Sorting makes this greedy choice obvious with two pointers.

---

## 🎯 Transfer to Unseen Problems

Can you spot greedy two-pointer pairing without the word "boats"?

**Scenario 1:** *"Given a sorted array, pair the smallest with the largest. Count pairs where the sum is at most k."*

Which pattern? **Sort + opposite-end two pointers** (Day 6). Identical mechanics — pair when sum ≤ k, otherwise move the larger pointer alone.

**Scenario 2:** *"Given an array of intervals, merge all overlapping intervals."*

Which pattern? **Sort + linear scan** (C-Rank preview). Different problem shape — overlap merging, not pairing. But sorting first is the shared instinct.

**Scenario 3:** *"Given cookies and children with greed factors, maximize satisfied children."*

Which pattern? **Sort + two pointers** (Assign Cookies). Smallest cookie that satisfies each child — same-direction pointers on sorted arrays, different greedy rule.

> **Answer key:** Scenarios 1 and 3 → two-pointer pairing/matching on sorted data. Scenario 2 → interval merge (C-Rank). Signal: **"pair lightest with heaviest" / "minimize groups with capacity"** → opposite-end greedy.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

Sort `people`. Pair the lightest with the heaviest when their combined weight fits. Otherwise, send the heaviest alone.

```
people = [3, 2, 2, 1], limit = 3
sorted: [1, 2, 2, 3]

left=0(1), right=3(3): 1+3=4 > 3 → boat for 3 alone, right--
left=0(1), right=2(2): 1+2=3 ≤ 3 → boat for (1,2), left++, right--
left=1(2), right=1(2): 2+2=4 > 3 → boat for 2 alone, right--

Total: 3 boats ✓
```

### C++
```cpp
class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {
        sort(people.begin(), people.end());
        int left = 0, right = people.size() - 1, boats = 0;
        while (left <= right) {
            if (people[left] + people[right] <= limit) left++;
            right--;
            boats++;
        }
        return boats;
    }
};
```

### Python
```python
class Solution:
    def numRescueBoats(self, people: list[int], limit: int) -> int:
        people.sort()
        left, right = 0, len(people) - 1
        boats = 0
        while left <= right:
            if people[left] + people[right] <= limit:
                left += 1
            right -= 1
            boats += 1
        return boats
```

### Java
```java
class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int left = 0, right = people.length - 1, boats = 0;
        while (left <= right) {
            if (people[left] + people[right] <= limit) left++;
            right--;
            boats++;
        }
        return boats;
    }
}
```

**Complexity:** O(n log n) time · O(1) extra space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"At most two per boat"** → Pairing problem — lightest + heaviest.
- **"Minimum boats"** → Greedy: pair whenever possible to save a boat.
- **"Sort + opposite ends"** → Day 6 converging pointers with a greedy rule.

This is the D-Rank capstone: two pointers aren't just for sorted pair sums — they're a greedy pairing engine. If Day 6 clicked, this is the natural extension.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for C-Rank. |
| 2/3 solved | **Pass.** Advance to C-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 6–10 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
