# ✅ Day 4 Checkpoint

> **Hash Maps** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals

| When you see... | Think... |
|---|---|
| "find pair / two numbers that sum" | Complement lookup (one-pass) |
| "check if exists" / "contains" / "duplicate" | Hash Set |
| "group by" / "categorize" | HashMap with list values |
| "O(n) time" with matching/finding | Hash map eliminates inner loop |
| "count" / "frequency" of arbitrary elements | HashMap counting |

---

## ⚠ Common Mistakes

1. **Inserting before checking in Two Sum** — You'll match an element with itself. Always check first, then insert.

2. **Using a list when a set works** — For pure membership testing ("is this in the collection?"), use a set, not a list. Sets give O(1) lookup; lists give O(n).

3. **Forgetting duplicates exist** — When building a frequency map, always handle the case where a key already exists. Use `getOrDefault` (Java) or `.get(key, 0)` (Python).

---

## 🏋️ Mini Challenge

**Intersection of Two Arrays** (LeetCode #349) — Return the unique intersection of two arrays using two hash sets.

> 💡 **Hint:** Add all elements of `nums1` to a set. Then check each element of `nums2` against that set.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Isomorphic Strings #205](https://leetcode.com/problems/isomorphic-strings/) | Easy | Bidirectional mapping |
| [Word Pattern #290](https://leetcode.com/problems/word-pattern/) | Easy | String ↔ char mapping |
| [Happy Number #202](https://leetcode.com/problems/happy-number/) | Easy | Cycle detection with set |
| [Intersection of Two Arrays II #350](https://leetcode.com/problems/intersection-of-two-arrays-ii/) | Easy | Frequency map matching |

---

*Day 4 complete! Tomorrow: prefix sums unlock range queries in O(1). →*
