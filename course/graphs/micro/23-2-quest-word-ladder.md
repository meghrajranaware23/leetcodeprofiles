<!-- hand-authored -->
# ⚔ Quest: Word Ladder

> **Day 23** · [Word Ladder #127](https://leetcode.com/problems/word-ladder/) · Hard · 25 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Word Ladder on LeetCode](https://leetcode.com/problems/word-ladder/)**

> ⚔ **Hunter's rule:** Draw words as nodes, one-letter edges as implicit links. BFS `(word, steps)` — never pre-build the full adjacency list.

---

## The Problem

See the full problem statement on LeetCode: **[Word Ladder #127](https://leetcode.com/problems/word-ladder/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Implicit word graph BFS.** Nodes = valid dictionary words. Edge = change exactly one character.

- If `endWord` ∉ `wordList` → return `0`.
- Queue `(beginWord, 1)` — length counts start word.
- For each position `i` and letter `'a'..'z'`, form `nxt`; if `nxt == endWord` → return `steps + 1`.
- If `nxt` in dict: **remove it**, enqueue `(nxt, steps + 1)`.

Not Day 10 lock twists. Not grid `(r,c)`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Implicit Word Graph BFS

**How to identify this from the problem statement:**
- "Shortest transformation sequence" → unweighted BFS
- Words differ by one letter → implicit edges
- Only listed words are valid intermediates → dict shrinks as visited

| Keyword / phrase | What it signals |
|---|---|
| "beginWord / endWord" | BFS from start, goal check |
| "wordList" | Allowed nodes; remove on visit |
| "one letter changed" | Generate 26·L neighbors per dequeue |
| "sequence length" | Return count including beginWord |

**Why this pattern works:** All transformations cost 1. First time `endWord` is reached = minimum length.

**How a strong solver thinks before coding:**
1. *"endWord in set? If not, return 0."*
2. *"Queue (word, steps); remove beginWord from set."*
3. *"For i, c in a..z: build nxt; early return if nxt == endWord."*
4. *"Erase nxt from set when enqueue — visited + prune."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build adjacency for all word pairs** | O(n² · L) — unnecessary |
| **DFS** | Doesn't guarantee shortest sequence |
| **BFS without removing from dict** | Revisit same word at longer length |
| **Bidirectional BFS (unrequested)** | Valid optimization but standard BFS suffices at interview |

**The insight:** Generate neighbors on the fly; dictionary **is** the visited set.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Word Ladder II #126](https://leetcode.com/problems/word-ladder-ii/) | Reconstruct all paths | BFS layers + backtrack |
| [Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/) | 8-char gene, bank set | Day 10 cousin |
| [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) | Digit twists | Day 10 — different neighbor fn |

---

## 📖 Walkthrough

```
begin=hit  end=cog
dict = {hot, dot, dog, lot, log, cog}

Layer 0: hit (len=1)
Layer 1: hot, dot, lot (len=2)
Layer 2: dog, log (len=3)   [from dot→dog, lot→log]
Layer 3: cog (len=4)        [from dog→cog or log→cog]

Answer: 5  (hit→hot→dot→dog→cog)
```

> 💡 **The insight:** You never drew an adjacency list — each dequeue spawns up to 26·L candidates filtered by dict.

---

## Solution

### C++
```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        dict.erase(beginWord);
        while (!q.empty()) {
            auto [word, steps] = q.front(); q.pop();
            for (int i = 0; i < (int)word.size(); i++) {
                string nxt = word;
                for (char c = 'a'; c <= 'z'; c++) {
                    nxt[i] = c;
                    if (nxt == endWord) return steps + 1;
                    if (dict.count(nxt)) {
                        dict.erase(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        return 0;
    }
};
```

### Python
```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0
        q = deque([(beginWord, 1)])
        words.discard(beginWord)
        while q:
            word, steps = q.popleft()
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    nxt = word[:i] + c + word[i + 1:]
                    if nxt == endWord:
                        return steps + 1
                    if nxt in words:
                        words.remove(nxt)
                        q.append((nxt, steps + 1))
        return 0
```

### Java
```java
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(endWord)) return 0;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{beginWord, "1"});
        dict.remove(beginWord);
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            String word = cur[0];
            int steps = Integer.parseInt(cur[1]);
            char[] arr = word.toCharArray();
            for (int i = 0; i < arr.length; i++) {
                char old = arr[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    arr[i] = c;
                    String nxt = new String(arr);
                    if (nxt.equals(endWord)) return steps + 1;
                    if (dict.contains(nxt)) {
                        dict.remove(nxt);
                        q.offer(new String[]{nxt, String.valueOf(steps + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return 0;
    }
}
```

**Complexity:** O(n · m · 26) time · O(n · m) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"One letter at a time + word list"** → implicit graph, not explicit edges.
- **"Shortest sequence"** → BFS, not DFS.
- **"Remove word on enqueue"** → visited + avoid duplicate work.
- **"endWord must exist in list"** → guard before BFS.
- **"Not Day 10"** → neighbor = letter swap, not wheel twist.

> 🎯 **Pattern Unlocked:** Implicit Word Graph BFS

---

*One quest down. Next: board squares and dice rolls. →*
