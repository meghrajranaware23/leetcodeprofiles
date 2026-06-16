<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 2

> [Letter Tile Possibilities #1079](https://leetcode.com/problems/letter-tile-possibilities/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Letter Tile Possibilities on LeetCode](https://leetcode.com/problems/letter-tile-possibilities/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Count, don't list. Trace on paper with small input like `"AAB"`.

---

## The Problem

You have `n` tiles, each with a letter printed on it. Return the **number** of possible non-empty sequences you can make using the letters printed on those tiles.

```
Input:  tiles = "AAB"
Output: 8
Explanation: "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"

Input:  tiles = "AAABBC"
Output: 188

Input:  tiles = "V"
Output: 1
```

Every sequence length from 1 to n counts. Order matters — `"AB"` and `"BA"` are different.

---

## 💡 Hints

> 🎯 **What's being tested:** Permutation-style backtracking (Day 12) adapted to **count** sequences of **any length** with repeated characters.

**Hint 1:** Order matters → this is **not** a subset/combination problem. `"AB"` ≠ `"BA"`.

**Hint 2:** Count **non-empty** sequences of any length. At each dfs state, every pick you make contributes **1** (the sequence ending at that pick) plus whatever longer sequences branch from it.

**Hint 3:** Use a **frequency array** (26 counts) instead of `used[]` on indices — tiles are interchangeable except for duplicate letters. Decrement count on choose, increment on unchoose.

**Hint 4:** Loop over 26 letters with `cnt[i] > 0`. No sort+skip needed when iterating unique **character types** — each loop iteration picks a distinct letter identity, not a tile index.

**Hint 5:** Return value accumulates: `ways = 1 + sum(dfs after each pick))`. The `1` counts the non-empty prefix formed by this pick alone.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Permutation Backtracking with Frequency Counter (count, not generate)

| Clue in the problem | What it signals |
|---|---|
| "sequences" / order matters | Permutation family, not start-index combo |
| "tiles" with repeated letters | Frequency counter, not index-based used[] |
| "number of possible" (not list all) | Return accumulated count from dfs |
| "non-empty" | Add 1 per chosen character before recursing deeper |

**Contrast with Day 12:**

| Permutations #46 | Letter Tile #1079 |
|---|---|
| Fixed length n | Any length 1..n |
| used[] on indices | cnt[] on character types |
| Collect all paths | Sum counts |
| Distinct elements | Repeated letters via counter |

**How a strong solver thinks before coding:**
1. *"Order matters + repeats → permute character counts."*
2. *"Each pick adds 1 for the sequence ending here."*
3. *"push/pop on cnt[i] — decrement choose, increment unchoose."*
4. *"Trace AAB: pick A → 1 + ..., pick A again → ..., pick B → ..."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all permutations of full length n only** | Misses shorter sequences like `"A"` or `"AB"` |
| **Start-index combination** | `"BA"` would never appear |
| **Set dedup on generated strings** | TLE/MLE — n up to 7 but counts explode; count during dfs |
| **Factorial formula n!** | Repeated letters break naive factorial |

**The insight brute force misses:** You're counting a **prefix tree** where every node (every pick) is a valid non-empty sequence. The `1 + dfs()` recurrence counts that node plus its descendants.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"How many distinct strings can you form by rearranging letters in 'GOOG'?"*

Same frequency-counter backtracking — count during exploration, don't materialize strings.

**Scenario:** *"Return all permutations of a string with duplicates."*

Day 12 generates the list; this problem counts with variable length. Same choose/unchoose on availability.

**30-second check:** *"Permutation count, any length, freq counter, ways += 1 + dfs()."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int dfs(vector<int>& cnt) {
        int ways = 0;
        for (int i = 0; i < 26; i++) {
            if (!cnt[i]) continue;
            cnt[i]--;
            ways += 1 + dfs(cnt);
            cnt[i]++;
        }
        return ways;
    }
public:
    int numTilePossibilities(string tiles) {
        vector<int> cnt(26);
        for (char c : tiles) cnt[c - 'A']++;
        return dfs(cnt);
    }
};
```

### Python
```python
class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        from collections import Counter
        cnt = Counter(tiles)
        def dfs():
            ways = 0
            for c in list(cnt):
                if not cnt[c]: continue
                cnt[c] -= 1
                ways += 1 + dfs()
                cnt[c] += 1
            return ways
        return dfs()
```

### Java
```java
class Solution {
    public int numTilePossibilities(String tiles) {
        int[] cnt = new int[26];
        for (char c : tiles.toCharArray()) cnt[c - 'A']++;
        return dfs(cnt);
    }
    private int dfs(int[] cnt) {
        int ways = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == 0) continue;
            cnt[i]--;
            ways += 1 + dfs(cnt);
            cnt[i]++;
        }
        return ways;
    }
}
```

**Complexity:** O(n!) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Order matters"** → Permutation thinking, not combination.
- **"Count, not list"** → Return `ways` from dfs; no result vector.
- **`1 + dfs()`** → Every pick forms a valid non-empty sequence by itself.
- **Frequency counter push/pop** → Day 12 choose/unchoose on availability, not indices.

If Permutations (#46) clicked on Day 12, this is the counting extension with variable-length paths.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int dfs(vector<int>& cnt) {
        int ways = 0;
        for (int i = 0; i < 26; i++) {
            if (!cnt[i]) continue;
            cnt[i]--;
            ways += 1 + dfs(cnt);
            cnt[i]++;
        }
        return ways;
    }
public:
    int numTilePossibilities(string tiles) {
        vector<int> cnt(26);
        for (char c : tiles) cnt[c - 'A']++;
        return dfs(cnt);
    }
};
```

### Python
```python
class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        from collections import Counter
        cnt = Counter(tiles)
        def dfs():
            ways = 0
            for c in list(cnt):
                if not cnt[c]: continue
                cnt[c] -= 1
                ways += 1 + dfs()
                cnt[c] += 1
            return ways
        return dfs()
```

### Java
```java
class Solution {
    public int numTilePossibilities(String tiles) {
        int[] cnt = new int[26];
        for (char c : tiles.toCharArray()) cnt[c - 'A']++;
        return dfs(cnt);
    }
    private int dfs(int[] cnt) {
        int ways = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == 0) continue;
            cnt[i]--;
            ways += 1 + dfs(cnt);
            cnt[i]++;
        }
        return ways;
    }
}
```

**Complexity:** O(n!) time · O(n) space
