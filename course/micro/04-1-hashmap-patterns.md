# 📝 Hash Map Core Patterns

> **Day 4** · Hash Maps · ★★☆☆☆ · 5 min read

---

Hash maps appear in ~30% of all coding interview problems — more than trees, graphs, or DP. They convert O(n) searches into O(1) lookups, transforming brute-force O(n²) solutions into elegant O(n) ones.

## The Four Core Patterns

Every hash map problem falls into one of these categories:

### Pattern 1: Complement Lookup

Store values as keys. When you need to find a match, check the map instead of looping.

```
Two Sum:  nums = [2, 7, 11, 15], target = 9

i=0: need 9-2=7, map={}     → no  → store {2:0}
i=1: need 9-7=2, map={2:0}  → YES → return [0, 1]
```

> 💡 **Key Insight:** Don't search for what you need — search for what *completes* what you need.

### Pattern 2: Grouping by Key

Collect items sharing a common property. The key = shared property, value = list of items.

```
Group Anagrams:
  "aet" → ["eat", "tea", "ate"]
  "ant" → ["tan", "nat"]
```

### Pattern 3: Counting

Generalized frequency counting for any data type:

```
{1: 3, 2: 2, 3: 1}
"What appears most?" → scan for max → 1
```

### Pattern 4: Seen/Visited Tracking

Use a **hash set** for pure membership testing — "have I seen this before?"

```
Contains Duplicate:
  1 → add → {1}
  2 → add → {1,2}
  1 → IN SET! → true
```

## Hash Set vs Hash Map

| Need | Use |
|---|---|
| "Does this exist?" | Hash Set |
| "Where / how many / what's associated?" | Hash Map |

> ⚡ **Pattern Signal:** When brute force has a nested loop doing linear search → hash map eliminates the inner loop. Look for keywords: "find pair", "complement", "group by", "count", "O(n) time".

---

*Time to solve the most famous interview problem of all time. →*
