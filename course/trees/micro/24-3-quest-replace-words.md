<!-- hand-authored -->
# ⚔ Quest: Replace Word

> **Day 24** · [Replace Word #648](https://leetcode.com/problems/replace-words/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Replace Word on LeetCode](https://leetcode.com/problems/replace-words/)**

> ⚔ **Hunter's rule:** Insert dictionary words into a trie. When inserting, **stop** if a shorter root already marked the path. When replacing, **stop at the first word marker** on the walk. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Replace Word #648](https://leetcode.com/problems/replace-words/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Trie prefix replace greedy** — shortest matching root wins because you halt at the first `isEnd`/stored word during the sentence walk.

If stuck: on insert, `if node.isEnd: break` before extending longer words through an existing root.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Trie Prefix Matching (Greedy Shortest Root)

**How to identify this from the problem statement:**
- "Replace words with roots" → dictionary words are prefixes
- "Shortest root" / "minimum prefix" → first marker on trie path
- Sentence of space-separated words → process each token independently

| Keyword / phrase | What it signals |
|---|---|
| "replace with root" | Trie walk, stop at first complete word |
| "dictionary of roots" | Batch insert before query |
| "shortest prefix" | Break insert if shorter root exists |
| "sentence" | Split by space, join results |

**Why this pattern works:** Trie paths encode all prefixes. Walking "cattle" hits `cat` marker before you'd need longer paths — greedy first-marker = shortest root by construction (if insert breaks on existing markers).

**How a strong solver thinks before coding:**
1. *"Build trie from dictionary."*
2. *"Insert: if marker exists mid-path, stop extending."*
3. *"For each sentence word: walk trie char by char."*
4. *"If marker at node: replace with stored root, break."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each word, scan all dictionary prefixes** | O(dict × words × len) — slow |
| **Sort dictionary by length, check each prefix** | Repeated work per token |
| **Insert all words fully without early break** | Longer word may overwrite shortest root logic |
| **Hash set of roots only** | Can't walk prefix char-by-char efficiently |

**The insight brute force misses:** One trie insert + one walk per token. First end-marker on path **is** the shortest matching root.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Implement Trie #208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Day 19 base | Same node structure |
| [Longest Word in Dictionary #720](https://leetcode.com/problems/longest-word-in-dictionary/) | Longest not shortest | Trie + end check |
| [Map Sum Pairs #677](https://leetcode.com/problems/map-sum-pairs/) | Prefix sums on trie | Walk with aggregation |

Same skeleton: insert dictionary, walk query.

---

## 📖 Walkthrough

**Dictionary: `["cat","bat","rat"]`, sentence: `"the cattle was rattled by the battery"`**

```
Trie: c→a→t[#], b→a→t[#], r→a→t[#]

"cattle"  → c,a,t,[#] → "cat"
"rattled" → r,a,t,[#] → "rat"
"battery" → b,a,t,[#] → "bat"

Output: "the cat was rat by the bat"
```

**Dictionary order matters for insert: `["a","aa"]`**

```
Insert "a": a[#]
Insert "aa": reach a[#] → break (don't extend to second 'a')
Word "aaa" → walk finds a[#] → replace with "a" ✓
```

> 💡 **The insight:** Greedy = stop walking the moment a root is recognized.

---

## Solution

### C++
```cpp
class Solution {
    struct TrieNode {
        TrieNode* ch[26] = {};
        string word;
    };
    TrieNode* root = new TrieNode();
public:
    string replaceWords(vector<string>& dictionary, string sentence) {
        for (auto& w : dictionary) {
            TrieNode* cur = root;
            for (char c : w) {
                int i = c - 'a';
                if (!cur->ch[i]) cur->ch[i] = new TrieNode();
                cur = cur->ch[i];
                if (!cur->word.empty()) break;
            }
            cur->word = w;
        }
        istringstream iss(sentence);
        string word, res;
        while (iss >> word) {
            if (!res.empty()) res += ' ';
            TrieNode* cur = root;
            for (char c : word) {
                int i = c - 'a';
                if (!cur->ch[i]) break;
                cur = cur->ch[i];
                if (!cur->word.empty()) { word = cur->word; break; }
            }
            res += word;
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        root = {}
        for w in dictionary:
            node = root
            for c in w:
                node = node.setdefault(c, {})
                if '#' in node: break
            node['#'] = w
        def replace(word):
            node = root
            for c in word:
                if c not in node: break
                node = node[c]
                if '#' in node: return node['#']
            return word
        return ' '.join(replace(w) for w in sentence.split())
```

### Java
```java
class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        Map<String,Object> trie = new HashMap<>();
        for (String w : dictionary) {
            Map<String,Object> node = trie;
            for (char c : w.toCharArray()) {
                node = (Map<String,Object>) node.computeIfAbsent(String.valueOf(c), k -> new HashMap<>());
                if (node.containsKey("#")) break;
            }
            node.put("#", w);
        }
        StringBuilder res = new StringBuilder();
        for (String word : sentence.split(" ")) {
            if (res.length() > 0) res.append(' ');
            Map<String,Object> node = trie;
            String found = word;
            for (char c : word.toCharArray()) {
                String key = String.valueOf(c);
                if (!node.containsKey(key)) break;
                node = (Map<String,Object>) node.get(key);
                if (node.containsKey("#")) { found = (String) node.get("#"); break; }
            }
            res.append(found);
        }
        return res.toString();
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Replace with shortest root"** → trie + first marker wins.
- **"Break insert on existing marker"** → shorter dictionary word blocks longer paths.
- **"Per-token walk"** → same as prefix search until `#`/word stored.
- **"Day 19 trie"** → extended insert and query rules only.

If you compared every dictionary word as prefix to every sentence word, refactor to trie greedy walk.

> 🎯 **Pattern Unlocked:** Trie prefix replace — greedy stop at shortest root marker.

---

*Both quests complete. Head to the checkpoint. →*
