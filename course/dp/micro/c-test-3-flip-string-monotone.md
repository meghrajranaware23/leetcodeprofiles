<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 3

> [Flip String to Monotone Increasing #926](https://leetcode.com/problems/flip-string-to-monotone-increasing/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Flip String to Monotone Increasing on LeetCode](https://leetcode.com/problems/flip-string-to-monotone-increasing/)**

> ⚔ **Hunter's rule:** **Prefix flip cost** — monotone = all 0s then all 1s. At each position, cost = flips to fix prefix OR flip this char. Track `ones` prefix count.

---

## The Problem

See the full problem statement on LeetCode: **[Flip String to Monotone Increasing #926](https://leetcode.com/problems/flip-string-to-monotone-increasing/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Prefix decision DP — at each `'0'`, either flip it (`flips+1`) or treat all prior 1s as needing flip (`ones` count).

`flips` = min cost for prefix processed so far. `ones` = count of 1s seen. On `'0'`: `flips = min(flips+1, ones)`.

C-Rank connection: Day 15 prefix thinking — boolean/string prefix state, O(n) rolling scalars.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Flip Cost DP (Day 15 synthesis)

**How to identify from the statement:**
- Binary string, monotone non-decreasing = 0…0 then 1…1
- Flip minimum chars
- Prefix property — decision at each index affects split point

**How a strong solver thinks before coding:**
1. *"Split point: all left should be 0, all right should be 1."*
2. *"ones = 1s in prefix — cost to flip them all to 0."*
3. *"On 0: flip this 0 OR flip all prior 1s — take min."*
4. *"On 1: just increment ones."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every split position explicitly** | O(n²) — rolling min is O(n) |
| **Flip all 0s or all 1s globally** | Split point varies |
| **Greedy without prefix state** | Need min over all implicit split points |

**The insight:** `flips` at each step = min flips for **some** valid split in prefix — `min(flips+1, ones)` encodes both choices at a `'0'`.

---

## 🎯 Transfer to Unseen Problems

*"Min flips to make binary string all 0s or all 1s"* → `min(count0, count1)`. Monotone increasing = **one** split — harder, needs this prefix DP.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int ones = 0, flips = 0;
        for (char c : s) {
            if (c == '1') ones++;
            else flips = min(flips + 1, ones);
        }
        return flips;
    }
};
```

### Python
```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        ones = flips = 0
        for c in s:
            if c == '1':
                ones += 1
            else:
                flips = min(flips + 1, ones)
        return flips
```

### Java
```java
class Solution {
    public int minFlipsMonoIncr(String s) {
        int ones = 0, flips = 0;
        for (char c : s.toCharArray()) {
            if (c == '1') ones++;
            else flips = Math.min(flips + 1, ones);
        }
        return flips;
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Prefix DP"** — State summarizes all valid splits so far.
- **"ones = flip cost for left part"** — Turn all prefix 1s to 0.
- **"flips+1 = flip this 0"** — Alternative at each zero.
- **"Day 15 cousin"** — Prefix decision, not interval palindrome.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int ones = 0, flips = 0;
        for (char c : s) {
            if (c == '1') ones++;
            else flips = min(flips + 1, ones);
        }
        return flips;
    }
};
```

### Python
```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        ones = flips = 0
        for c in s:
            if c == '1':
                ones += 1
            else:
                flips = min(flips + 1, ones)
        return flips
```

### Java
```java
class Solution {
    public int minFlipsMonoIncr(String s) {
        int ones = 0, flips = 0;
        for (char c : s.toCharArray()) {
            if (c == '1') ones++;
            else flips = Math.min(flips + 1, ones);
        }
        return flips;
    }
}
```

**Complexity:** O(n) time · O(1) space
