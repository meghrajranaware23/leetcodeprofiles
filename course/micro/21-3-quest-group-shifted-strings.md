# ⚔ Quest: Group Shifted Strings

> **Day 21** · [Group Shifted Strings #249](https://leetcode.com/problems/group-shifted-strings/) · Medium · 45 XP · 22 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Group Shifted Strings on LeetCode](https://leetcode.com/problems/group-shifted-strings/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string array `strings`, group all **shifted strings** together. A shifted string is formed by shifting each character by the same number of positions (with wrap-around at `'z'`).

You can return the answer in any order.

```
Input:  strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

Input:  strings = [""]
Output: [[""]]
```

**Shift examples:**
- `"abc"` → `"bcd"` (each char +1)
- `"xyz"` → `"abc"` (wrap: x→y, y→z, z→a)
- `"az"` → `"ba"` (a→b, z→a with wrap)

---

## 💡 Hints

Two strings are shifted equivalents if their **relative differences** between consecutive characters match (modulo 26).

Build a key from consecutive character differences:

```
diff[i] = (s[i] - s[i-1] + 26) % 26   for i = 1..n-1
key("abc") = (3, 1, 1)   // b-a=1, c-b=1
key("bcd") = (3, 1, 1)   // same shape → same bucket
```

Include **string length** in the key — `"ab"` and `"abc"` must not share a key.

Single-character strings all shift to each other — give them a shared key like `(1,)` or `"#"`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Hash Key Design — Difference Encoding Key (Day 21)

**How to identify this from the problem statement:**
- "shifted strings" / "shift each character by same amount" → relative offsets, not absolute letters
- "group" → hash map with custom key
- wrap-around at alphabet boundary → modulo 26 on differences

| Keyword / phrase | What it signals |
|---|---|
| "shifted" / "Caesar shift" | Difference encoding from first char |
| "same shift sequence" | Canonical tuple of relative gaps |
| "group strings" | Hash map: diff key → list |
| wrap-around / 'z' to 'a' | `(s[i] - s[j] + 26) % 26` |

**Why this pattern works:** A uniform shift changes every absolute character but preserves every **gap** between neighbors. Encoding gaps (mod 26) strips the shift offset and exposes the structural fingerprint.

**How a strong solver thinks before coding:**
1. *"Shift = same relative gaps → difference key, not sorted letters."*
2. *"Include length — different lengths can't be shifts of each other."*
3. *"Single-char strings: all equivalent → special key."*
4. *"Hash map: diff tuple → list of strings."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 26 shifts for each string, compare** | O(n × 26 × k) — difference key is O(k) per string |
| **Sort letters (anagram key)** | `"abc"` sorted = `"abc"`, `"bcd"` sorted = `"bcd"` — different keys, but they ARE shifted equivalents |
| **Compare absolute characters** | `"abc"` and `"bcd"` look different — shift hides in relative gaps |
| **Forget modulo on negative diffs** | `"az"` → diff a→z is -25, not 1 — must normalize: `(-25 + 26) % 26 = 1` |

**The insight brute force misses:** Shift equivalence is about **shape**, not **content**. `"abc"`, `"bcd"`, and `"xyz"` are the same shape: each step is +1. Difference encoding captures shape; sorting captures multiset (wrong tool here).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Group Shifted Strings #249](https://leetcode.com/problems/group-shifted-strings/) | Shift equivalence | Difference tuple key |
| [Group Anagrams #49](https://leetcode.com/problems/group-anagrams/) | Multiset equivalence | Sorted string key (previous quest) |
| [Isomorphic Strings #205](https://leetcode.com/problems/isomorphic-strings/) | Structural relabeling | Pattern/rank key |
| [Ransom Note #383](https://leetcode.com/problems/ransom-note/) | Character availability | Frequency map (Day 3) — not grouping |

Anagram key = **what letters**. Shift key = **how letters relate**. Pick the key that matches the equivalence definition.

---

## 📖 Walkthrough

```
strings = ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"]

"abc" → len=3, diffs: (1,1)     → key = (3, 1, 1)
"bcd" → len=3, diffs: (1,1)     → key = (3, 1, 1)  ✓ same group
"xyz" → len=3, diffs: (1,1)     → key = (3, 1, 1)  ✓ same group

"acef" → len=4, diffs: (2,2,1)  → key = (4, 2, 2, 1)  → own group

"az"  → len=2, diffs: (25)      → key = (2, 25)   // z-a = 25 mod 26
"ba"  → len=2, diffs: (25)      → key = (2, 25)   ✓ same group

"a"   → len=1                   → key = (1,)
"z"   → len=1                   → key = (1,)      ✓ same group

map:
  (3,1,1)    → ["abc","bcd","xyz"]
  (4,2,2,1)  → ["acef"]
  (2,25)     → ["az","ba"]
  (1,)       → ["a","z"]
```

> 💡 **The insight:** Absolute letters differ by a constant shift; relative gaps are identical. Encode gaps + length as the hash key.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<string>> groupStrings(vector<string>& strings) {
        unordered_map<string, vector<string>> groups;

        for (const string& s : strings) {
            string key;
            if (s.size() == 1) {
                key = "#";
            } else {
                for (int i = 1; i < (int)s.size(); i++) {
                    int diff = (s[i] - s[i - 1] + 26) % 26;
                    key += to_string(diff) + ',';
                }
            }
            groups[key].push_back(s);
        }

        vector<vector<string>> result;
        for (auto& [k, bucket] : groups)
            result.push_back(move(bucket));
        return result;
    }
};
```

### Python
```python
class Solution:
    def groupStrings(self, strings: list[str]) -> list[list[str]]:
        groups: dict[tuple, list[str]] = {}

        for s in strings:
            if len(s) == 1:
                key = (0,)  # all single-char strings share one key
            else:
                key = tuple((ord(s[i]) - ord(s[i - 1])) % 26 for i in range(1, len(s)))
            groups.setdefault(key, []).append(s)

        return list(groups.values())
```

### Java
```java
class Solution {
    public List<List<String>> groupStrings(String[] strings) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String s : strings) {
            StringBuilder key = new StringBuilder();
            if (s.length() == 1) {
                key.append('#');
            } else {
                for (int i = 1; i < s.length(); i++) {
                    int diff = (s.charAt(i) - s.charAt(i - 1) + 26) % 26;
                    key.append(diff).append(',');
                }
            }
            groups.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(s);
        }

        return new ArrayList<>(groups.values());
    }
}
```

**Complexity:** O(n × k) time · O(n × k) space (n = number of strings, k = max length)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Shifted"** → Not anagrams. Sorted key fails. Use **difference encoding**.
- **"Same shift"** → Relative gaps preserved → `(s[i] - s[i-1] + 26) % 26`.
- **Single-character strings** → All shift to each other → one shared key.
- **"Group"** → Hash map with designed key (Day 21 + Day 4).

If you sorted each string like Group Anagrams, `"abc"` and `"bcd"` landed in different buckets — wrong equivalence class. The signal was "shift" — shape, not multiset.

> 🎯 **Hash Key Design:** Difference tuple = shift-invariant fingerprint. Anagrams sort; shifts diff.

---

*Checkpoint next: encode a string list without delimiter traps. →*
