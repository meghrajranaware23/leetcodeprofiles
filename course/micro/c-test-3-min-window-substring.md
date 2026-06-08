# ⚔ C-Rank Test — Problem 3

> [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) · **Hard** · 150 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Window Substring on LeetCode](https://leetcode.com/problems/minimum-window-substring/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **This is your first Hard problem in the course.** Hard doesn't mean impossible — it means two patterns working together. You've trained for this.

---

## The Problem

Given two strings `s` and `t`, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return `""`.

The test cases are generated such that the answer is **unique**.

```
Input:  s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from t.

Input:  s = "a", t = "a"
Output: "a"

Input:  s = "a", t = "aa"
Output: ""
Explanation: t has two 'a's but s only has one.
```

---

## 💡 Hints

> 🎯 **What's being tested:** Variable-size sliding window (Day 12) + hash map frequency tracking (Day 13) — the capstone combo of C-Rank.

**Hint 1 — The skeleton:** Expand `right` to include characters until the window **covers all of t**. Then shrink `left` while the window still covers t, tracking the smallest valid window. This is the variable window template from Day 12 with a hash map constraint from Day 13.

**Hint 2 — Two maps, one counter:** Build `need[c]` = frequency of each char in `t`. Maintain `window[c]` = frequency in current window. Track `formed` = how many unique chars in `t` have their required count satisfied in the window. When `formed == required` (unique chars in t), the window is valid — try shrinking.

**Hint 3 — Shrink logic:** When valid, record `(right - left + 1)` if it's the new minimum, then decrement `window[s[left]]`. If `window[s[left]]` drops below `need[s[left]]`, decrement `formed` — the window is no longer valid. Increment `left`.

**Hint 4 — Don't rescan the whole window:** The `formed` counter lets you check validity in O(1). Only update `formed` when a character's count **exactly reaches** its required count (increment) or **drops below** it (decrement on shrink).

**Hint 5 — Edge cases:** If `len(s) < len(t)`, return `""` immediately. Duplicates in `t` matter — `need['a'] = 2` means the window needs two a's, not one.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Variable Sliding Window + Hash Map Frequency (Day 12 + Day 13)

| Clue in the problem | What it signals |
|---|---|
| "minimum window substring" | Variable window — shrink to find smallest valid window |
| "every character in t included" | Coverage constraint — frequency map, not just set membership |
| "including duplicates" | Count-based map, not boolean set |
| "substring of s" | Contiguous window — sliding window, not subsequence |
| Hard difficulty + string matching | Two-pattern combo: expand/shrink + frequency tracking |

**How to identify from the statement:** "Minimum window containing all of X" → **variable sliding window**. "All characters with counts" → **frequency map**. Together: expand until covered, shrink while covered, track minimum.

**How a strong solver thinks before coding:**
1. *"Cover all chars of t → frequency map need."*
2. *"Minimum window → expand right until valid, shrink left while valid."*
3. *"Track formed count — O(1) validity check per step."*
4. *"Record answer when valid and window length is new minimum."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring of s, compare frequencies to t** | O(n² × k) — rescanning frequencies for every substring |
| **Sort t and scan s for subsequence** | Subsequence ≠ substring — must be contiguous |
| **Fixed-size window of len(t)** | Window may need to be larger when t has duplicates or repeated chars in s |
| **Expand without shrinking** | Finds *a* valid window, not the *minimum* — miss the optimal left boundary |
| **Recount all 26 letters every step** | O(26) per step works but `formed` counter is cleaner and O(1) |

**The insight brute force misses:** Once the window is valid, **every character added to the left is wasted** — shrink until invalid, then expand again. The two-pointer window never backtracks on `right`, giving O(n) total movement.

---

## 🎯 Transfer to Unseen Problems

Can you spot minimum-window thinking on unfamiliar wording?

**Scenario 1:** *"Given a string s and an array of words, find the minimum substring of s that contains all words as contiguous substrings without overlap."*

Which pattern? **Sliding window + hash map** (Substring with Concatenation of All Words). Harder variant — fixed word length chunks inside the window.

**Scenario 2:** *"Given a string, find the length of the longest substring with at most k distinct characters."*

Which pattern? **Variable sliding window** (Day 12). Same expand/shrink skeleton — maximize instead of minimize, distinct count instead of exact frequency match.

**Scenario 3:** *"Given two strings, determine if t is a subsequence of s."*

Which pattern? **Two pointers** (E-Rank). Not a window — subsequence allows gaps, substring does not.

> **Answer key:** Scenario 1 → advanced sliding window + hash map (A-Rank). Scenario 2 → variable window (Day 12). Scenario 3 → two pointers, not window. Signal: **"minimum window containing all of X"** → variable window + frequency map.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough with Hash Map State

```
s = "ADOBECODEBANC",  t = "ABC"
need: {A:1, B:1, C:1}   required = 3 unique chars
```

| Step | Action | window state | formed | Valid? | Notes |
|------|--------|-------------|--------|--------|-------|
| r=0 | add 'A' | {A:1} | 1 | No | A satisfied |
| r=1 | add 'D' | {A:1, D:1} | 1 | No | D not in need |
| r=2 | add 'O' | {A:1, D:1, O:1} | 1 | No | |
| r=3 | add 'B' | {A:1, B:1, D:1, O:1} | 2 | No | B satisfied |
| r=4 | add 'E' | +E | 2 | No | |
| r=5 | add 'C' | {A:1, B:1, C:1, ...} | **3** | **Yes** | All covered! window="ADOBEC" len=6 |
| shrink | remove 'A' (l=0) | {A:0, B:1, C:1, ...} | 2 | No | A dropped below need |
| r=6 | add 'O' | | 2 | No | |
| r=7 | add 'D' | | 2 | No | |
| r=8 | add 'E' | | 2 | No | |
| r=9 | add 'B' | {B:2, C:1, ...} | 2 | No | B count > 1, already formed |
| r=10 | add 'A' | {A:1, B:2, C:1, ...} | **3** | **Yes** | window="CODEBA" len=6 |
| shrink | remove 'C' (l=5) | {C:0, ...} | 2 | No | |
| ... | continue | | | | |
| r=12 | add 'N' | | 2 | No | |
| r=13 | add 'C' | {A:1, B:1, C:1} | **3** | **Yes** | window="BANC" len=4 ← **minimum** |

**Answer: `"BANC"`** ✓

### Key invariant

- `formed` increments when `window[c]` reaches `need[c]` exactly.
- `formed` decrements when shrinking causes `window[c]` to drop below `need[c]`.
- Only compare `formed == required` for validity — never rescan the full map.

### C++
```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty() || s.size() < t.size()) return "";
        unordered_map<char, int> need, window;
        for (char c : t) need[c]++;
        int required = need.size(), formed = 0;
        int left = 0, minLen = INT_MAX, minStart = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            char c = s[right];
            window[c]++;
            if (need.count(c) && window[c] == need[c]) formed++;
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                char d = s[left];
                window[d]--;
                if (need.count(d) && window[d] < need[d]) formed--;
                left++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
    }
};
```

### Python
```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not s or not t or len(s) < len(t):
            return ""
        need, window = {}, {}
        for c in t:
            need[c] = need.get(c, 0) + 1
        required, formed = len(need), 0
        left, min_len, min_start = 0, float("inf"), 0
        for right, c in enumerate(s):
            window[c] = window.get(c, 0) + 1
            if c in need and window[c] == need[c]:
                formed += 1
            while left <= right and formed == required:
                if right - left + 1 < min_len:
                    min_len = right - left + 1
                    min_start = left
                d = s[left]
                window[d] -= 1
                if d in need and window[d] < need[d]:
                    formed -= 1
                left += 1
        return "" if min_len == float("inf") else s[min_start:min_start + min_len]
```

### Java
```java
class Solution {
    public String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty() || s.length() < t.length()) return "";
        Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();
        for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
        int required = need.size(), formed = 0;
        int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.merge(c, 1, Integer::sum);
            if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue())
                formed++;
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                char d = s.charAt(left);
                window.merge(d, -1, Integer::sum);
                if (need.containsKey(d) && window.get(d) < need.get(d))
                    formed--;
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
}
```

**Complexity:** O(|s| + |t|) time · O(k) space where k = unique chars in t

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Minimum window containing all of t"** → Variable window (Day 12): expand until valid, shrink while valid, track minimum.
- **"Every character including duplicates"** → Frequency map (Day 13): `need` counts, not a boolean set.
- **`formed` counter** → O(1) validity check — the difference between a TLE brute force and an O(n) solution.

**You just solved your first Hard.** That matters. Most candidates never build the window + hash map combo from scratch — they memorize it. You derived it from two patterns you already own. The Hard label is LeetCode's way of saying "combine what you know." You combined it.

If the expand/shrink skeleton felt familiar from Day 12 and the frequency tracking felt familiar from Day 13, your C-Rank training worked exactly as designed.

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
