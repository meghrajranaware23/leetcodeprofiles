<!-- hand-authored -->
# ⚔ Quest: Minimum Genetic Mutation

> **Day 10** · [Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Genetic Mutation on LeetCode](https://leetcode.com/problems/minimum-genetic-mutation/)**

> ⚔ **Hunter's rule:** Each 8-letter gene is one **state node**. Valid next states live in `bank`. Queue `(gene, steps)`. Not a grid. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Genetic Mutation #433](https://leetcode.com/problems/minimum-genetic-mutation/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **State Graph BFS** — same Day 10 skeleton as Open the Lock. Neighbor = change one position to A/C/G/T. Only enqueue if neighbor is still in `bank` (remove from bank when visited — bank doubles as allowed + visited).

If you're stuck after 5 minutes: if `endGene not in bank`, return -1 upfront. Check `endGene` when generating neighbor before removing from bank.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State Graph BFS

**How to identify this from the problem statement:**
- Strings of fixed length = states
- One mutation = one character change to valid letter
- `bank` = allowed intermediate states (dead-end complement: **not in bank** = blocked)
- Minimum mutations → BFS

| Keyword / phrase | What it signals |
|---|---|
| "minimum genetic mutation" | State-space BFS |
| "bank of valid genes" | Allowed set — shrink on visit |
| "one character different" | Generate 8×4 neighbors |
| "startGene" / "endGene" | BFS from start to end |

**Why this pattern works:** Each mutation costs 1. Implicit graph on bank strings. BFS first hit of `endGene` = minimum mutations.

**How a strong solver thinks before coding:**
1. *"words = set(bank); if endGene not in words: -1."*
2. *"q = [(startGene, 0)]; remove start from words."*
3. *"For i in 0..7, c in ACGT: nxt = gene with [i]=c."*
4. *"If nxt==endGene: return steps+1; if nxt in words: remove, enqueue."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Grid modeling of gene positions** | Wrong — no spatial grid |
| **DFS** | Not guaranteed minimum mutations |
| **Keep bank static, separate visited** | Works but removing from bank is clean |
| **Compare all pairs of bank words to build graph first** | O(n²) preprocessing — generate on the fly |

**The insight brute force misses:** Open the Lock with longer alphabet and bank filter — same `(state, steps)` queue.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) | 4 wheels 0-9, deadends | State-space BFS |
| [Word Ladder #127](https://leetcode.com/problems/word-ladder/) | WordDictionary neighbor check | Same BFS on strings |
| [Snakes and Ladders #909](https://leetcode.com/problems/snakes-and-ladders/) | Board position as state | Later rank |

---

## 📖 Walkthrough

**Gene strings as nodes; bank as allowed region.**

```
start = "AACCGGTT", end = "AACCGGTA", bank = {..., "AACCGGTA"}

("AACCGGTT", 0):
  try change each position to A,C,G,T
  "AACCGGTA" at some (i,c) → matches end → return steps+1 = 1

If longer chain needed:
  remove visited genes from bank so you never reuse a state
  queue expands (gene, steps) layer by layer
```

```
genes = "ACGT"
for i in 0..7:
  for c in genes:
    nxt = gene[:i] + c + gene[i+1:]
    if nxt == endGene: return steps + 1
    if nxt in bank: remove, enqueue (nxt, steps+1)
```

> 💡 **The insight:** Bank = valid states (like "open" cells); absent from bank = dead-end. No `(r,c)` anywhere.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minMutation(string startGene, string endGene, vector<string>& bank) {
        unordered_set<string> dict(bank.begin(), bank.end());
        if (!dict.count(endGene)) return -1;
        queue<pair<string, int>> q;
        q.push({startGene, 0});
        dict.erase(startGene);
        string genes = "ACGT";
        while (!q.empty()) {
            auto [gene, steps] = q.front(); q.pop();
            for (int i = 0; i < 8; i++) {
                string nxt = gene;
                for (char c : genes) {
                    nxt[i] = c;
                    if (nxt == endGene) return steps + 1;
                    if (dict.count(nxt)) {
                        dict.erase(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        words = set(bank)
        if endGene not in words: return -1
        q = deque([(startGene, 0)])
        words.discard(startGene)
        genes = 'ACGT'
        while q:
            gene, steps = q.popleft()
            for i in range(8):
                for c in genes:
                    nxt = gene[:i] + c + gene[i + 1:]
                    if nxt == endGene: return steps + 1
                    if nxt in words:
                        words.remove(nxt)
                        q.append((nxt, steps + 1))
        return -1
```

### Java
```java
class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        Set<String> dict = new HashSet<>(Arrays.asList(bank));
        if (!dict.contains(endGene)) return -1;
        Queue<String[]> q = new ArrayDeque<>();
        q.offer(new String[]{startGene, "0"});
        dict.remove(startGene);
        char[] genes = {'A','C','G','T'};
        while (!q.isEmpty()) {
            String[] cur = q.poll();
            String gene = cur[0];
            int steps = Integer.parseInt(cur[1]);
            char[] arr = gene.toCharArray();
            for (int i = 0; i < 8; i++) {
                char old = arr[i];
                for (char c : genes) {
                    arr[i] = c;
                    String nxt = new String(arr);
                    if (nxt.equals(endGene)) return steps + 1;
                    if (dict.contains(nxt)) {
                        dict.remove(nxt);
                        q.offer(new String[]{nxt, String.valueOf(steps + 1)});
                    }
                }
                arr[i] = old;
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n · 8 · 4) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Gene = state node"** → Open the Lock with ACGT alphabet.
- **"Bank shrinks on visit"** → Visited + allowed in one set.
- **"(gene, steps) queue"** → Day 10 template end-to-end.
- **"Not Day 2 grid"** → No directions array on a matrix.

> 🎯 **Pattern Unlocked:** State Graph BFS — mutate one letter, BFS to endGene.

---

*Both quests complete. Head to the checkpoint. →*
