---
# ⚔ Day 4: Hash Maps — The Swiss Army Knife

**Rank:** E-Rank | **XP:** 100 | **Time:** 55 min

---

## 🎯 Mission

Hash maps solve more interview problems than any other data structure. Master the four core patterns: lookup, grouping, counting, and index tracking.

## 📝 Concept

If arrays are the bread of DSA, hash maps are the butter. They appear in roughly 25-30% of all coding interview problems — more than trees, more than graphs, more than dynamic programming. The reason is simple: hash maps convert O(n) searches into O(1) lookups. That single upgrade transforms brute-force O(n²) solutions into elegant O(n) ones.

A hash map stores key-value pairs. You give it a key, it gives you back the value in constant time. Under the hood, it uses a hash function to convert keys into array indices — but you don't need to implement this yourself. What you *do* need is the ability to recognize which problems are hash map problems and which pattern to apply.

### The Four Core Hash Map Patterns

Every hash map interview problem falls into one of four categories. Learn these four patterns and you'll handle the vast majority of hash map questions with confidence.

### Pattern 1: Value → Index Mapping

**The idea:** Store elements as keys and their indices as values. When you need to find an element later, the map tells you exactly where it is.

**Classic problem:** Two Sum — "Given a target, find two numbers that add up to it."

```
nums = [2, 7, 11, 15], target = 9

As you scan:
  i=0: num=2, complement=7, map={}         → 7 not in map → store {2:0}
  i=1: num=7, complement=2, map={2:0}      → 2 IS in map! → return [0, 1]
```

The magic: instead of searching for the complement with a nested loop (O(n²)), you ask the map "have I seen this before?" in O(1).

### Pattern 2: Grouping by Key

**The idea:** Use the hash map to collect items that share a common property. The key represents the shared property; the value is a list of matching items.

**Classic problem:** Group Anagrams — "Group strings that are anagrams of each other."

```
Input:  ["eat", "tea", "tan", "ate", "nat", "bat"]

Key = sorted characters:
  "aet" → ["eat", "tea", "ate"]
  "ant" → ["tan", "nat"]
  "abt" → ["bat"]
```

This pattern generalizes beyond strings. Any time a problem says "group by" or "categorize," think hash map with list values.

### Pattern 3: Counting Pattern

**The idea:** Count occurrences of elements. This is the frequency counting pattern from Day 3, but generalized to any data type using a hash map.

```
Input:  [1, 1, 1, 2, 2, 3]

count_map = {1: 3, 2: 2, 3: 1}

"What appears most?"     → scan for max value → 1
"What appears exactly once?" → scan for value == 1 → 3
```

### Pattern 4: Seen/Visited Tracking

**The idea:** Use a hash set (a hash map with only keys, no values) to track what you've already processed. This is membership testing — "have I seen this element before?"

**Classic problem:** Contains Duplicate — "Are there any repeated elements?"

```
nums = [1, 2, 3, 1]

As you scan:
  1 → not in set → add 1 → {1}
  2 → not in set → add 2 → {1, 2}
  3 → not in set → add 3 → {1, 2, 3}
  1 → IN SET!    → return true
```

### Hash Set vs Hash Map

A hash set is a simplified hash map where you only care about keys, not values.

| Use Case | Data Structure |
|----------|---------------|
| "Does this element exist?" | Hash Set |
| "What is associated with this element?" | Hash Map |
| "How many times does this appear?" | Hash Map (key → count) |
| "Where did I last see this element?" | Hash Map (key → index) |

**Rule of thumb:** If you only need yes/no membership testing, use a set. If you need to store additional information about each element (index, count, list), use a map.

### Collision Awareness

Hash maps aren't actually O(1) in the worst case — they're O(1) *amortized*. When two different keys hash to the same bucket (a collision), the map must resolve the conflict, which can degrade to O(n) in pathological cases.

In interviews, you don't need to implement collision resolution. But you should be aware of two things:

1. **Average case is O(1).** This is what you should state in complexity analysis.
2. **Worst case is O(n).** If an interviewer asks, mention that a well-designed hash function minimizes collisions. In practice, language standard libraries handle this for you.

## 🔍 Pattern Recognition

**When to use this pattern:**
- The brute force involves a nested loop doing linear search — hash map eliminates the inner loop
- You need to find a complement, pair, or counterpart of the current element
- The problem asks you to group elements by a shared property
- You need to track which elements you've already processed
- The problem requires O(n) time but involves finding/matching elements
- You need to map between two related pieces of information (value↔index, character↔count)

**Keywords in interview questions:**
- "find a pair" or "two numbers that sum to"
- "check if exists" or "contains"
- "group by" or "categorize"
- "count unique" or "distinct elements"
- "O(n) time" or "single pass"
- "first occurrence" or "last occurrence"
- "complement" or "difference"
- "subsequence" or "subset" (sometimes)

**Common traps:**
- Using a hash map when sorting would be simpler and more readable (e.g., finding duplicates can also be done by sorting)
- Not considering that hash map operations have higher constant factors than array operations
- Assuming insertion order is preserved (it is in Python 3.7+ dicts, but not in C++ `unordered_map` or Java `HashMap`)
- Using mutable objects (like lists) as hash map keys — this causes errors in most languages
- Forgetting that hash sets don't store duplicates — inserting the same element twice still gives you one entry

**What beginners miss:**
- The "complement lookup" is the single most important hash map technique. Instead of searching for `x`, you compute `target - x` and check if *that* exists in the map
- You can often build and query the hash map in the *same* pass — no need for two passes
- Hash maps can store complex values: lists, sets, indices, counts, even other maps
- The key choice in grouping problems determines everything — choosing the wrong key means wrong groups
- When a problem says "O(1) extra space," hash maps are usually off the table — look for sorting or in-place solutions instead

**How stronger coders think:**
- They see O(n²) brute force and immediately ask: "Can I trade space for time with a hash map?"
- They think about the hash map as a "memory" — it remembers what the algorithm has seen so far
- They recognize the complement pattern instantly: "I don't search for what I need, I search for what *completes* what I need"
- They choose between set and map deliberately — using a set when a map would work but is unnecessary
- In contests, they immediately consider whether the problem can be reduced to "have I seen this before?" — if yes, hash set; if "where did I see this?", hash map

## 💻 Code Example 1: Two Sum (LeetCode #1)

**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`. Each input has exactly one solution, and you may not use the same element twice.

```
nums = [2, 7, 11, 15], target = 9

Brute Force (O(n²)):                One-Pass Hash Map (O(n)):
  for i in [0..3]:                    map = {}
    for j in [i+1..3]:                i=0: need 9-2=7, map={} → no  → map={2:0}
      if nums[i]+nums[j]==9           i=1: need 9-7=2, map={2:0} → YES!
                                      return [map[2], 1] = [0, 1]

                                    Hash Map State:
                                    ┌─────────┐
                                    │ Key:Val │
                                    │  2 : 0  │ ← stored at step i=0
                                    └─────────┘
                                    At i=1: complement = 9 - 7 = 2
                                    Lookup map[2] → found at index 0!
                                    Answer: [0, 1]
```

### C++

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Map from value → index
        unordered_map<int, int> seen;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            // Check if complement was seen in a previous iteration
            if (seen.count(complement)) {
                return {seen[complement], i};
            }

            // Store current value and its index for future lookups
            seen[nums[i]] = i;
        }

        return {};  // Problem guarantees a solution, so this won't execute
    }
};
```

### Python

```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Map from value → index
        seen = {}

        for i, num in enumerate(nums):
            complement = target - num

            # Check if complement was seen in a previous iteration
            if complement in seen:
                return [seen[complement], i]

            # Store current value and its index for future lookups
            seen[num] = i

        return []  # Problem guarantees a solution, so this won't execute
```

### Java

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Map from value → index
        Map<Integer, Integer> seen = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // Check if complement was seen in a previous iteration
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }

            // Store current value and its index for future lookups
            seen.put(nums[i], i);
        }

        return new int[]{};  // Problem guarantees a solution
    }
}
```

### Why This Works

The brute force checks every pair (O(n²)). The hash map approach is smarter: for each element, compute what *other* value you'd need to reach the target (the complement), then check if you've already seen that value. Because hash map lookups are O(1), the entire algorithm runs in O(n).

The critical insight is **one-pass construction**: you check and insert in the same loop. This works because if `nums[i]` and `nums[j]` are the answer pair and `i < j`, then when you process `j`, `nums[i]` is already in the map.

### Complexity Analysis

- **Time:** O(n) — single pass through the array, each iteration does O(1) hash map operations.
- **Space:** O(n) — in the worst case, you store n-1 elements in the map before finding the answer.

## 💻 Code Example 2: Contains Duplicate (LeetCode #217)

**Problem:** Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.

```
nums = [1, 2, 3, 1]

Hash Set State:
  Process 1 → set = {1}
  Process 2 → set = {1, 2}
  Process 3 → set = {1, 2, 3}
  Process 1 → 1 already in set! → return true
```

### C++

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;

        for (int num : nums) {
            // If element already exists in set, we found a duplicate
            if (seen.count(num)) return true;
            seen.insert(num);
        }

        return false;  // All elements are unique
    }
};
```

### Python

```python
class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        seen = set()

        for num in nums:
            # If element already exists in set, we found a duplicate
            if num in seen:
                return True
            seen.add(num)

        return False  # All elements are unique
```

### Java

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();

        for (int num : nums) {
            // If element already exists in set, we found a duplicate
            if (seen.contains(num)) return true;
            seen.add(num);
        }

        return false;  // All elements are unique
    }
}
```

### Why This Works

This is the purest form of the "seen/visited tracking" pattern. A hash set gives you O(1) membership testing — just ask "have I seen this before?" as you scan. The moment you find a repeat, you're done.

### Complexity Analysis

- **Time:** O(n) — single pass, each iteration does O(1) set operations.
- **Space:** O(n) — worst case stores all n elements if no duplicates exist.

## 💻 Code Example 3: Longest Consecutive Sequence (LeetCode #128)

**Problem:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.

```
nums = [100, 4, 200, 1, 3, 2]

Step 1: Build hash set → {100, 4, 200, 1, 3, 2}

Step 2: Find sequence starts (elements with no predecessor):
  100 → 99 not in set → START! Count: 100 → length 1
    4 →  3 IS in set  → skip (not a start)
  200 → 199 not in set → START! Count: 200 → length 1
    1 →  0 not in set → START! Count: 1→2→3→4 → length 4
    3 →  2 IS in set  → skip
    2 →  1 IS in set  → skip

Longest = 4  (sequence: 1, 2, 3, 4)

Visualization of the "start detection" trick:
  ┌───┬───┬───┬───┬─────┬─────┐
  │ 1 │ 2 │ 3 │ 4 │ 100 │ 200 │   (sorted for clarity)
  └───┴───┴───┴───┴─────┴─────┘
    ↑ start          ↑ start ↑ start
    (0 not in set)   (99 ∉)  (199 ∉)
```

### C++

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // Build hash set for O(1) lookups
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;

        for (int num : numSet) {
            // Only start counting from the beginning of a sequence
            // A number is a sequence start if (num - 1) is NOT in the set
            if (!numSet.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                // Extend the sequence as far as possible
                while (numSet.count(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                longest = max(longest, currentStreak);
            }
        }

        return longest;
    }
};
```

### Python

```python
class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        # Build hash set for O(1) lookups
        num_set = set(nums)
        longest = 0

        for num in num_set:
            # Only start counting from the beginning of a sequence
            # A number is a sequence start if (num - 1) is NOT in the set
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1

                # Extend the sequence as far as possible
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                longest = max(longest, current_streak)

        return longest
```

### Java

```java
class Solution {
    public int longestConsecutive(int[] nums) {
        // Build hash set for O(1) lookups
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) numSet.add(num);

        int longest = 0;

        for (int num : numSet) {
            // Only start counting from the beginning of a sequence
            // A number is a sequence start if (num - 1) is NOT in the set
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                // Extend the sequence as far as possible
                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                longest = Math.max(longest, currentStreak);
            }
        }

        return longest;
    }
}
```

### Why This Works

The key insight is the **intelligent starting point**. Without it, you'd check every element as a potential sequence start, leading to redundant work. By checking `num - 1 not in set`, you ensure you only begin counting from the *first* element of each consecutive sequence. Each element is visited at most twice (once in the outer loop, once in the while loop), so the total work is O(n).

This problem beautifully combines two hash map patterns: *seen/visited tracking* (the set itself) and *membership testing* (checking predecessors and successors).

### Complexity Analysis

- **Time:** O(n) — despite the nested while loop, each element is processed at most twice across all iterations.
- **Space:** O(n) — the hash set stores all unique elements.

## ⚠️ Common Mistakes

1. **Checking if complement exists BEFORE inserting the current element (or vice versa at the wrong time)** — In Two Sum, if you insert `nums[i]` into the map *before* checking for its complement, you might match an element with itself. For example, with `nums = [3, 3]` and `target = 6`, inserting first means when you process the first `3`, you'd find `3` already in the map — but it's the same index! The one-pass approach avoids this: check first, then insert. This ordering guarantees the complement comes from a *different* index.

2. **Using the wrong key for grouping problems** — In Group Anagrams, if you use the original string as the key instead of a canonical form (sorted string or frequency tuple), you won't group anything. The key must capture the *shared property*, not the individual identity. Ask yourself: "What makes these items belong to the same group?" That answer is your key.

3. **Not handling duplicate keys correctly in counting problems** — When counting with a hash map, beginners sometimes use `map[key] = 1` instead of `map[key] += 1`, overwriting previous counts. In Python, use `collections.Counter` or `defaultdict(int)` to avoid key-existence checks. In Java, use `map.getOrDefault(key, 0) + 1`. In C++, `map[key]++` works because `operator[]` default-initializes to 0.

4. **Forgetting that hash sets eliminate duplicates silently** — If you build a set from `[1, 2, 2, 3]`, you get `{1, 2, 3}` with size 3, not 4. This is usually desired, but in problems where duplicate *count* matters (like finding the majority element), a set loses critical information. Use a map with counts instead.

5. **Iterating over the input array instead of the set in Longest Consecutive Sequence** — If `nums` has duplicates (e.g., `[1, 2, 2, 3]`), iterating over `nums` means you'll process `2` twice, doing redundant work. Iterate over the set instead to guarantee each value is processed exactly once.

## 🏋️ Mini Challenge

**Problem:** Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays. (LeetCode #350 — Intersection of Two Arrays II)

**Hint:** Build a frequency map from the smaller array. Then iterate the larger array: if the current element exists in the map with count > 0, add it to the result and decrement the count.

**Expected approach:** This combines the counting pattern (Pattern 3) with the membership testing pattern (Pattern 4). Use a hash map to store frequencies of the smaller array, then match against the larger array. Time: O(n + m). Space: O(min(n, m)). This is a great problem to practice choosing the right pattern — it's not pure membership (you care about counts), and it's not pure counting (you need to match across two arrays).

## 📚 Practice Problems

| Problem | Difficulty | Platform | Key Pattern |
|---------|-----------|----------|-------------|
| [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) | Easy | LeetCode #205 | Bidirectional value → index mapping |
| [Word Pattern](https://leetcode.com/problems/word-pattern/) | Easy | LeetCode #290 | Bidirectional mapping (string ↔ character) |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | LeetCode #560 | Prefix sum + hash map counting |
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Medium | LeetCode #49 | Grouping by canonical key |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | LeetCode #347 | Counting + sorting/bucket sort |
