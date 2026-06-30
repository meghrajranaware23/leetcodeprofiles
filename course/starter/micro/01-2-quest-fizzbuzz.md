<!-- hand-authored -->
# ⚔ Warmup Quest: FizzBuzz

> **Day 1** · [FizzBuzz #412](https://leetcode.com/problems/fizz-buzz/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open FizzBuzz on LeetCode](https://leetcode.com/problems/fizz-buzz/)**

> ⚔ **Mentor's rule:** Today's goal is **Accepted**, not optimal. Practice Run → fix → Submit. Spend at least 5 minutes before hints.

---

## The Problem

Given an integer `n`, return a string array `answer` where:
- `answer[i] == "FizzBuzz"` if `i` is divisible by 3 and 5
- `answer[i] == "Fizz"` if `i` is divisible by 3
- `answer[i] == "Buzz"` if `i` is divisible by 5
- `answer[i] == str(i)` otherwise

**Example 1:**
```
Input: n = 3
Output: ["1","2","Fizz"]
```

**Example 2:**
```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

**Example 3:**
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

**Constraints:** `1 <= n <= 10^4`

---

## 💡 Hints

1. Loop `i` from 1 to `n` inclusive — off-by-one on the upper bound is the #1 bug here
2. Check divisibility by **15 first** (both 3 and 5), then 3, then 5, else convert `i` to string
3. Use **Run** on Example 1 before Submit — confirm `["1","2","Fizz"]` exactly
4. Hidden tests include `n = 1` — your loop must start at 1, not 0

---

## 🔍 Strategy Breakdown

**Skill practiced today:** First Submission Workflow

**Why this problem:** Lowest-friction first AC; teaches submit/run flow, not algorithms

**Submit-flow checklist:**
1. Paste template → write loop skeleton
2. **Run** on Example 1
3. Fix any Wrong Answer → **Run** again
4. **Submit** when Examples pass
5. Log "First AC" in your journal

**How a mentor thinks (before coding):**
1. *"I don't need a clever algorithm — I need a correct loop and clean strings."*
2. *"Divisible by both 3 and 5 means check 15 before checking 3 or 5 alone."*
3. *"Run is my friend today — I'll use it on every quest until Submit is green."*

---

## ❌ Why Jumping to Code Fails

| Approach | Problem |
|---|---|
| Start at `i = 0` | Example 1 expects `"1"` first — immediate Wrong Answer |
| Check `% 3` before `% 15` | `15` becomes `"Fizz"` instead of `"FizzBuzz"` |
| Skip Run, Submit immediately | You waste submits on typos Run would catch |
| Over-engineer with maps/lookup tables | More code = more bugs on Day 1 |

> **The insight:** FizzBuzz is a **platform tutorial** disguised as a problem.

---

## 🔗 Problems That Build the Same Skill

| Problem | Difficulty | Skill |
|---|---|---|
| [Concatenation of Array #1929](https://leetcode.com/problems/concatenation-of-array/) | Easy | Easy loop warmup |
| [Richest Customer Wealth #1672](https://leetcode.com/problems/richest-customer-wealth/) | Easy | Simple loop warmup |
| [Running Sum of 1d Array #1480](https://leetcode.com/problems/running-sum-of-1d-array/) | Easy | Tomorrow's trace practice |

---

## 📖 Walkthrough

**Example 1:** `n = 3`

| i | i%3 | i%5 | i%15 | append |
|---|-----|-----|------|--------|
| 1 | 1 | 1 | 1 | `"1"` |
| 2 | 2 | 2 | 2 | `"2"` |
| 3 | 0 | 3 | 3 | `"Fizz"` |

**Plain English:** For each number 1..n, append the right label; check 15 before 3 or 5.

**Run** → expect `["1","2","Fizz"]` → **Submit**.

> 💡 **The code is just the table written in syntax.**

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<string> fizzBuzz(int n) {
        vector<string> res;
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) res.push_back("FizzBuzz");
            else if (i % 3 == 0) res.push_back("Fizz");
            else if (i % 5 == 0) res.push_back("Buzz");
            else res.push_back(to_string(i));
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        res = []
        for i in range(1, n + 1):
            if i % 15 == 0: res.append("FizzBuzz")
            elif i % 3 == 0: res.append("Fizz")
            elif i % 5 == 0: res.append("Buzz")
            else: res.append(str(i))
        return res
```

### Java
```java
class Solution {
    public List<String> fizzBuzz(int n) {
        List<String> res = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) res.add("FizzBuzz");
            else if (i % 3 == 0) res.add("Fizz");
            else if (i % 5 == 0) res.add("Buzz");
            else res.add(String.valueOf(i));
        }
        return res;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"My first AC matters more than my runtime percentile."*
- *"Checking 15 first would have saved me one Wrong Answer — I'll remember that pattern."*
- *"If Submit fails, I read the diff, fix one thing, Run again — not panic."*

> 🎯 **Skill practiced:** First Submission Workflow

---

*One quest down. Move to today's checkpoint. →*
