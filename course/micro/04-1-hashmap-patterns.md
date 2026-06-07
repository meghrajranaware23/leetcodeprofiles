# 📝 Hash Map Core Patterns

> **Day 4** · Hash Maps · ★★☆☆☆ · 8 min read

---

A hash map stores **key → value** pairs with O(1) average lookup. A hash set stores **unique keys** only. Together they eliminate the inner loops that make brute force slow.

Today you'll learn what they are, see how they work, then learn when to reach for them.

---

## Part 1 — Learn the Tools

### What is a hash map?

A dictionary for your program. You **store** something under a key, then **look it up** instantly:

```
store:  map[2] = 0        ← "the number 2 is at index 0"
lookup: is 7 in map?      ← O(1) average
```

A **hash set** is simpler — it only answers: *"Have I seen this before?"* Yes or no.

| Need | Use |
|---|---|
| "Does this exist?" | Hash **set** |
| "Where is it?" / "How many?" / "What's paired with it?" | Hash **map** |

---

## Part 2 — Four Core Techniques

### Technique 1: Complement Lookup

**What it is:** As you scan, remember each value. For the current number, check if its **complement** (what would complete the target) is already stored.

```
Two Sum — target = 9, nums = [2, 7, 11, 15]

i=0: num=2,  need 9-2=7,  map={}      → not found → store {2:0}
i=1: num=7,  need 9-7=2,  map={2:0}   → FOUND at index 0! → return [0,1]
```

> 💡 Don't search for what you need — search for what **completes** what you need.

---

### Technique 2: Seen / Visited Tracking (Hash Set)

**What it is:** Walk the array. Before adding a value, check if it's already in the set.

```
Contains Duplicate — nums = [1, 2, 3, 1]

1 → not in set → add {1}
2 → not in set → add {1,2}
3 → not in set → add {1,2,3}
1 → IN SET! → duplicate found ✓
```

The set replaces the inner "have I seen this?" loop.

---

### Technique 3: Counting (Hash Map)

**What it is:** Same idea as Day 3's frequency counting, but keys can be any type:

```
nums = [1, 2, 1, 3, 1]
map = {1:3, 2:1, 3:1}

"What appears most?" → scan map for max → 1
```

Use when the alphabet isn't limited to 26 letters.

---

### Technique 4: Grouping by Key

**What it is:** Items that share a property get the same key; the value is a list of those items.

```
Group Anagrams:
  key "aet" → ["eat", "tea", "ate"]
  key "ant" → ["tan", "nat"]
```

You'll see this more in later ranks. E-Rank focuses on Techniques 1 and 2.

---

## Part 3 — Recognition (After You Know the Pattern)

### What problems do hash maps solve?

- **Find a pair** that meets a condition (Two Sum → complement)
- **Detect duplicates** (Contains Duplicate → set)
- **Count arbitrary elements** (when `int[26]` isn't enough)
- **Group items** by a shared property

### Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Nested loops for every pair | O(n²) |
| Linear search through a list each step | O(n) per lookup → O(n²) total |
| Sort + binary search when hash works | O(n log n) — often unnecessary |

### The key observation

The inner loop in brute force almost always asks: *"Have I seen the thing I need?"* Store past elements as you go — that question becomes O(1).

### Pattern signals & recognition clues

| When the problem says… | Technique |
|---|---|
| "two numbers sum to target" / "find pair" | Complement lookup (map) |
| "contains duplicate" / "seen before" | Hash set |
| "return indices" | Map: value → index |
| nested loop searching prior elements | Replace with hash lookup |

**Keywords:** `two sum` · `complement` · `duplicate` · `seen before` · `find pair`

### Common beginner mistakes

| Mistake | Fix |
|---|---|
| Double for-loop for pairs | One pass + hash map |
| Insert into map **before** checking complement | Check first — avoid matching element with itself |
| Hash map when only yes/no is needed | Use a set — simpler |
| List instead of set for membership | List lookup is O(n) |

### Recognition drill

Read this problem aloud:

> *"Given an array and a target, find two numbers that add up to the target. Return their indices."*

Before coding, say:

> *"Need complement of each number → one-pass hash map, check before insert."*

---

*You understand the pattern. Time for the most famous interview problem of all time. →*
