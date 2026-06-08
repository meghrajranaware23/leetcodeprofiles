# ⚔ C-Rank Test — Problem 2

> [Partition Labels #763](https://leetcode.com/problems/partition-labels/) · Medium · 150 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Partition Labels on LeetCode](https://leetcode.com/problems/partition-labels/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

You are given a string `s` consisting of lowercase English letters. We want to **partition** the string into as many parts as possible so that each letter appears in **at most one part**.

Return an array of integers representing the size of each partition.

```
Input:  s = "ababcbacadefegdehijhklij"
Output: [9, 7, 8]
Explanation: "ababcbaca", "defegde", "hijhklij" are valid partitions.

Input:  s = "eccbbbbdec"
Output: [10]
Explanation: The entire string is one partition.
```

---

## 💡 Hints

> 🎯 **What's being tested:** Greedy on arrays + last-occurrence hash map — track where each character last appears, then greedily extend partition boundaries.

**Hint 1:** If `'a'` appears at index 0 and again at index 8, every partition containing index 0 must also contain index 8. Build a map: `last[c] = last index of character c`.

**Hint 2:** Scan left to right. Track `end = max(last[s[i]])` for every character seen so far. When `i == end`, the current partition is complete — record its size and start a new partition.

**Hint 3:** You never need to backtrack. Once you know each character's last occurrence, a single left-to-right pass with a running `end` boundary gives the answer in O(n).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy + Last-Occurrence Map (Day 13 hash map + greedy strategy)

| Clue in the problem | What it signals |
|---|---|
| "each letter in at most one part" | Characters define boundaries — a letter can't be split across partitions |
| "as many parts as possible" | Greedy — cut as soon as a valid partition closes |
| "partition the string" | Contiguous segments — scan left to right, extend until safe to cut |
| lowercase English letters | Hash map or int[26] for last occurrence |
| single pass expected | Precompute last positions, then one greedy scan |

**How to identify from the statement:** "Partition so each element appears in only one group" + "as many groups as possible" → **greedy boundary extension**. Precompute last occurrence of each element, extend the current group's end to cover all last occurrences seen so far.

**How a strong solver thinks before coding:**
1. *"Letter can't be in two parts → if I include index i, I must include last occurrence of s[i]."*
2. *"Precompute last[c] for every character."*
3. *"Running end = max of all last occurrences in current partition."*
4. *"When i reaches end, cut here — that's the earliest valid split."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every possible partition split with backtracking** | Exponential — greedy cut is provably optimal |
| **Check all characters in a candidate partition with nested loops** | O(n²) per partition — last-occurrence map + single scan is O(n) |
| **Cut at every position without tracking last occurrences** | Invalid partitions — later occurrences of earlier characters get orphaned |
| **Sort characters first** | Destroys index order — partitions must respect original string positions |

**The insight brute force misses:** The **last occurrence** of every character seen in the current partition defines the **minimum end index** for that partition. Once your scan index reaches that end, no earlier cut is valid — and cutting immediately gives the maximum number of partitions.

---

## 🎯 Transfer to Unseen Problems

Can you spot greedy boundary extension without the word "partition"?

**Scenario 1:** *"Given a string, split it into the fewest segments so each segment is a palindrome."*

Which pattern? **Backtracking / DP** (A-Rank territory). Not greedy last-occurrence — palindrome segments require checking each candidate, not a single boundary map.

**Scenario 2:** *"Given tasks labeled A–Z, merge intervals so each label appears in one contiguous block."*

Which pattern? **Greedy + last-occurrence map** — identical skeleton to Partition Labels. Precompute last index, extend boundary, cut when scan reaches end.

**Scenario 3:** *"Given an array of intervals, merge all overlapping intervals."*

Which pattern? **Interval merge** (B-Rank, Day 22). Sort by start, merge by comparing ends — different greedy, but same "extend boundary" instinct.

> **Answer key:** Scenario 2 → greedy last-occurrence (this problem). Scenario 3 → interval merge (B-Rank). Signal: **"each element in exactly one contiguous group" / "partition string"** → last-occurrence greedy.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

Precompute last occurrence, then greedily extend and cut.

```
s = "ababcbacadefegdehijhklij"

last: a→8, b→5, c→7, d→14, e→15, f→11, g→13, h→19, i→22, j→23, k→20, l→21

i=0 'a': end = max(8) = 8
i=1 'b': end = max(8,5) = 8
i=2 'a': end = 8
...
i=8 'a': i == end → partition size = 9 ✓

i=9 'd': end = max(14) = 14
i=10 'e': end = max(14,15) = 15
...
i=15 'e': i == end → partition size = 7 ✓

i=16 'h': end = max(19) = 19
...
i=23 'j': i == end → partition size = 8 ✓

Answer: [9, 7, 8] ✓
```

### C++
```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        int last[26] = {};
        for (int i = 0; i < (int)s.size(); i++)
            last[s[i] - 'a'] = i;
        vector<int> result;
        int start = 0, end = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            end = max(end, last[s[i] - 'a']);
            if (i == end) {
                result.push_back(i - start + 1);
                start = i + 1;
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def partitionLabels(self, s: str) -> list[int]:
        last = {c: i for i, c in enumerate(s)}
        result, start, end = [], 0, 0
        for i, c in enumerate(s):
            end = max(end, last[c])
            if i == end:
                result.append(i - start + 1)
                start = i + 1
        return result
```

### Java
```java
class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++)
            last[s.charAt(i) - 'a'] = i;
        List<Integer> result = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                result.add(i - start + 1);
                start = i + 1;
            }
        }
        return result;
    }
}
```

**Complexity:** O(n) time · O(1) extra space (26-letter alphabet)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Each letter in at most one part"** → A character's first and last occurrence must live in the same partition.
- **"As many parts as possible"** → Greedy: cut the moment the partition is valid — don't extend further than necessary.
- **"Last occurrence map"** → Day 13 hash map skill applied to index tracking, not frequency counting.

This is greedy thinking with a hash map — no sorting, no window, just a single scan with a running boundary. If you precomputed last positions without being told to, your pattern recognition is sharp.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for B-Rank. |
| 2/3 solved | **Pass.** Advance to B-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 11–16 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
