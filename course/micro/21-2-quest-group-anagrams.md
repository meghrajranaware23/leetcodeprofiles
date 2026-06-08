# ⚔ Quest: Group Anagrams

> **Day 21** · [Group Anagrams #49](https://leetcode.com/problems/group-anagrams/) · Medium · 35 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Group Anagrams on LeetCode](https://leetcode.com/problems/group-anagrams/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of strings `strs`, group the **anagrams** together. You can return the answer in any order.

An **anagram** is a word formed by rearranging the letters of another, using all original letters exactly once.

```
Input:  strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Input:  strs = [""]
Output: [[""]]

Input:  strs = ["a"]
Output: [["a"]]
```

---

## 💡 Hints

Anagrams share the **same multiset of characters**. If you sort the letters of any anagram, you get the same string — that's your **canonical key**.

Build a hash map: `sorted_key → list of original words`. After one pass, return all the lists.

Sorting `"eat"` gives `"aet"`. So do `"tea"` and `"ate"`. They collide in the same bucket.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Hash Key Design — Sorted String Key (Day 21)

**How to identify this from the problem statement:**
- "group anagrams" → equivalence = same character multiset
- strings can be in any order within groups → grouping, not sorting output
- need O(n) groups, not pairwise comparison

| Keyword / phrase | What it signals |
|---|---|
| "group anagrams" | Sorted string (or freq tuple) as hash key |
| "same letters, different order" | Canonical fingerprint — sort or count |
| "return grouped lists" | Hash map: key → vector of strings |
| multiple strings, equivalence classes | Key design + hash map (Day 4) |

**Why this pattern works:** Sorting a word of length k costs O(k log k). All anagrams produce the identical sorted key, so one map lookup groups them instantly. Total: O(n × k log k) — far better than comparing every pair.

**How a strong solver thinks before coding:**
1. *"Anagram = same multiset → sorted letters are the fingerprint."*
2. *"Hash map: sorted key → list of words."*
3. *"One pass, append each word to its bucket."*
4. *"Return all bucket values."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Compare every pair, sort both, check equality** | O(n² × k log k) — wasteful when a hash map groups in one pass |
| **Use raw string as hash key** | `"eat"` and `"tea"` never collide — no grouping happens |
| **Sort the entire output array** | Problem asks to group, not sort individual strings alphabetically |
| **Count frequencies per comparison** | O(n² × k) — rebuild counts for every pair instead of once per word |

**The insight brute force misses:** Anagram equivalence is a **property of the multiset**, not the string itself. Compress that property into a key once per word; let the hash map do the grouping.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Group Anagrams #49](https://leetcode.com/problems/group-anagrams/) | Group by sorted key | Canonical key → hash map bucket |
| [Valid Anagram #242](https://leetcode.com/problems/valid-anagram/) | Check if two strings are anagrams | Same multiset — freq compare (Day 3) |
| [Find All Anagrams #438](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Find anagram windows in s | Same multiset, sliding window (Day 11) |
| [Group Shifted Strings #249](https://leetcode.com/problems/group-shifted-strings/) | Shift equivalence, not anagram | Different key — difference encoding (next quest) |

Valid Anagram (Day 3) checks two strings. Group Anagrams checks **many** strings — same fingerprint idea, hash map scales it.

---

## 📖 Walkthrough

```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

"eat" → sort → "aet"  →  map["aet"] = ["eat"]
"tea" → sort → "aet"  →  map["aet"] = ["eat", "tea"]
"tan" → sort → "ant"  →  map["ant"] = ["tan"]
"ate" → sort → "aet"  →  map["aet"] = ["eat", "tea", "ate"]
"nat" → sort → "ant"  →  map["ant"] = ["tan", "nat"]
"bat" → sort → "abt"  →  map["abt"] = ["bat"]

Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]]  ✓
(order within/across groups may vary)
```

> 💡 **The insight:** `sort(word)` is the canonical key. One sort per word, one map insert — done.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;

        for (const string& word : strs) {
            string key = word;
            sort(key.begin(), key.end());
            groups[key].push_back(word);
        }

        vector<vector<string>> result;
        for (auto& [key, bucket] : groups)
            result.push_back(move(bucket));
        return result;
    }
};
```

### Python
```python
class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups: dict[str, list[str]] = {}

        for word in strs:
            key = ''.join(sorted(word))
            groups.setdefault(key, []).append(word)

        return list(groups.values())
```

### Java
```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String word : strs) {
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
        }

        return new ArrayList<>(groups.values());
    }
}
```

**Alternative key — frequency tuple (O(k) per word for lowercase a-z):**
```python
key = tuple(ord(c) - ord('a') for c in word)  # NO — use counts:
key = tuple(word.count(chr(ord('a') + i)) for i in range(26))
```

**Complexity:** O(n × k log k) time · O(n × k) space (n = number of strings, k = max word length)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Group anagrams"** → Same multiset → sorted string is the fingerprint (Day 21).
- **"Group"** → Hash map: key → list (Day 4 grouping, not complement lookup).
- **Raw string as key won't work** → `"eat"` ≠ `"tea"` even though they're anagrams.
- **Don't compare pairs** → One pass, one key per word, O(n × k log k).

If you nested loops comparing sorted versions of every pair, you found O(n²). The signal was "group by equivalence" — design the key, let the map collide.

> 🎯 **Hash Key Design:** Sorted letters = canonical anagram fingerprint. The map groups; you don't.

---

*Next: shifted strings — same grouping instinct, different key. →*
