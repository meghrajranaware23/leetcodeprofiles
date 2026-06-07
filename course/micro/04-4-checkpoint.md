# ✅ Day 4 Checkpoint

> **Hash Maps** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "find pair" / "two numbers that sum" / "complement" | Complement lookup (one-pass map) | Replace inner search with O(1) lookup |
| "return indices" | Map: value → index | Need metadata, not just existence |
| "check if exists" / "contains" / "duplicate" | Hash set | Pure membership — set not map |
| "seen before" / "already visited" | Hash set | Early exit on first repeat |
| "group by" / "categorize" | HashMap with list values | Key = shared property |
| "O(n) time" with matching/finding | Hash map eliminates inner loop | Nested loop → hash lookup |
| "count" / "frequency" of arbitrary elements | HashMap counting | Keys aren't limited to letters |
| nested loop searching prior elements | Hash structure | Inner loop is the signal |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Does this array contain any duplicate?"* → **Hash set**
2. *"Find two numbers that add to target"* → **Complement map**
3. *"Find intersection of two arrays"* → **Set or frequency map** (E-Rank Test #2 preview)

---

## 🎯 Transfer to Unseen Problems

You've seen Two Sum and Contains Duplicate. Can you recognize hash patterns on problems you've never studied?

**Scenario 1:** *"Given an array of integers and a target, return true if any two distinct indices i and j exist such that nums[i] + nums[j] == target."* (Boolean version of Two Sum)

Which pattern? **Complement lookup.** For each num, check if `target - num` is in the map. Check before insert — same skeleton as Two Sum, just return true/false.

**Scenario 2:** *"Given an array, return true if any value appears at least twice within k indices of each other."*

Which pattern? **Hash set + sliding window.** Add nums[i] to set. If already present and within distance k, return true. Remove nums[i-k] when window exceeds k.

**Scenario 3:** *"Given two integer arrays, return their intersection. Each element in the result must appear in both arrays."*

Which pattern? **Set from first array, check second.** Add all of nums1 to a set. For each element in nums2, if in set, add to result and remove from set (unique intersection).

> **Answer key:** Scenarios 1 & 3 → hash map/set lookup. Scenario 2 → set with window management. The signal is always: *"Am I re-searching prior elements?"* → remember them in a hash structure.

---

## ⚠ Common Mistakes

1. **Inserting before checking in Two Sum** — You'll match an element with itself. Always check first, then insert.

2. **Using a list when a set works** — For pure membership testing ("is this in the collection?"), use a set, not a list. Sets give O(1) lookup; lists give O(n).

3. **Forgetting duplicates exist** — When building a frequency map, always handle the case where a key already exists. Use `getOrDefault` (Java) or `.get(key, 0)` (Python).

---

## 🏋️ Mini Challenge

### [Intersection of Two Arrays #349](https://leetcode.com/problems/intersection-of-two-arrays/)

**[→ Try Intersection of Two Arrays on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/)**

Return the unique intersection of two arrays using two hash sets.

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
