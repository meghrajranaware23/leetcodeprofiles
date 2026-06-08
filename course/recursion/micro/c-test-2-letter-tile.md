# ⚔ C-Rank Test — Problem 2

> [Letter Tile Possibilities #1079](https://leetcode.com/problems/letter-tile-possibilities/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Letter Tile Possibilities on LeetCode](https://leetcode.com/problems/letter-tile-possibilities/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Letter Tile Possibilities #1079](https://leetcode.com/problems/letter-tile-possibilities/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

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

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
