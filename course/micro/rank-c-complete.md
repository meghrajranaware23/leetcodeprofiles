# 🏆 C-Rank Complete — Warrior Confirmed

> **Congratulations, Hunter.** You've learned to control complex state inside patterns.

---

## Your C-Rank Journey

You started with frequency maps inside windows and ended with greedy reasoning. Here's what you now command:

| Day | Pattern | Core Technique |
|-----|---------|---------------|
| 11 | Sliding Window + Hash Map | Frequency-controlled windows for anagrams, distinct limits, minimum window |
| 12 | Kadane's Algorithm | Extend-or-restart for maximum subarray and product variants |
| 13 | Difference Arrays | O(1) range updates, reconstruct with prefix sum |
| 14 | Sorting as Strategy | Sort first to reveal structure, then scan or merge |
| 15 | Interval Patterns | Insert, merge, and sweep-line concurrent event counting |
| 16 | Greedy on Arrays | Locally optimal choices that build global optima |

---

## Patterns Unlocked: 7

```
✅ Sliding Window + Hash Map  — frequency match, at-most-k distinct, minimum window
✅ Kadane's Algorithm         — maximum subarray, product variant, circular extension
✅ Difference Array           — bulk range updates, flight bookings, car pooling
✅ Sort-First Strategy        — merge intervals, non-overlapping selection, reveal structure
✅ Interval Merge/Insert      — three-phase insertion, overlap detection, linear merge
✅ Sweep Line Basics          — event timeline (+1 start, -1 end), meeting rooms
✅ Greedy on Arrays           — reachability, circular restart, minimum jumps
```

## 🧠 Your Pattern Recognition Cheat Sheet

When a new problem appears, scan for these signals — **18 patterns total** across E, D, and C-Rank:

### E-Rank Foundation (Days 1–5)

| If the problem says... | Reach for... |
|---|---|
| "in-place" / "move" / "remove" / "filter" | Read-write pointer |
| "palindrome" / "reverse" / "both ends" | Two pointers on string |
| "anagram" / "count" / "frequency" / "unique" | Frequency counting |
| "two sum" / "find pair" / "complement" | Hash map complement lookup |
| "duplicate" / "seen before" / "contains" | Hash set |
| "range sum" / "pivot" / "left = right" | Prefix sum |

### D-Rank Pointers (Days 6–10)

| If the problem says... | Reach for... |
|---|---|
| "sorted" + "pair" / "two sum" / "closest sum" | Opposite-end two pointers |
| "three numbers" / "triplet" / "k-sum" | Sort + fix-one + two pointers |
| "cycle" / "duplicate" / "middle" / "linked list" | Fast & slow pointers |
| "subarray of size k" / "permutation in string" | Fixed-size sliding window |
| "longest substring" / "minimum window" / "at most k" | Variable-size sliding window |

### C-Rank Control (Days 11–16)

| If the problem says... | Reach for... |
|---|---|
| "cover all characters" / "anagram in window" / "at most k distinct" | Sliding window + hash map |
| "maximum subarray" / "contiguous sum" / "maximum product" | Kadane's algorithm |
| "update range [i, j] by val" / "bulk range updates" / "bookings" | Difference array |
| "merge intervals" / "sort first" / "non-overlapping" | Sort-first strategy |
| "insert interval" / "merge overlapping" / "interval list" | Interval merge/insert |
| "meeting rooms" / "concurrent events" / "how many rooms" | Sweep line basics |
| "can you reach" / "minimum jumps" / "gas station" / "greedy" | Greedy on arrays |

> 💡 **The C-Rank skill:** Complex state inside simple structures. Before you write nested loops, ask: *can I sort first, maintain a frequency map in the window, or make a greedy local choice?*

---

## 🎯 How to Approach Unseen Problems

You've trained on 10 quests and 3 test problems. Real LeetCode won't label the pattern for you. Use this four-step loop on every new problem:

1. **Read for constraints, not details.** Frequency constraints? Range updates? Interval overlaps? Greedy reachability? These narrow the C-Rank family before you code.
2. **Scan the signal table.** Match keywords to your cheat sheet above. Say the pattern name out loud: *"minimum window containing all chars → sliding window + hash map."*
3. **Reject brute force in your head.** If your first instinct is nested loops, ask whether sorting first, a frequency map in the window, or Kadane's eliminates the inner loop.
4. **Check the skeleton, not the solution.** You need the structure: window + freq map with formed counter, diff[L]+=val diff[R+1]-=val, sort-then-merge, or greedy farthest-reachable.

If you can name the pattern in under 30 seconds, you've already won half the battle. The code is just filling in the template.

---

## Stats

- **Quests completed:** 10
- **Test problems solved:** 3
- **Total XP earned:** 1500+
- **Rank:** C → awaiting B-Rank

---

## What's Next: B-Rank Preview

B-Rank introduces **monotonic stacks, matrix traversal, 2D prefix sums, hash key design, and advanced interval patterns** — the structures that unlock harder Medium and Hard problems:

| Day | Topic |
|-----|-------|
| 17 | Monotonic Stack Fundamentals |
| 18 | Advanced Monotonic Stack |
| 19 | Matrix Traversal Patterns |
| 20 | 2D Prefix Sums |
| 21 | Advanced Hashing & Hash Key Design |
| 22 | Intervals & Sweep Line (Advanced) |

> 💡 These patterns stack on your C-Rank foundation. Monotonic stacks extend two-pointer thinking to "next greater" problems. 2D prefix sums extend Day 14's range queries to matrices. Hash key design combines your E-Rank hash maps with sorting strategy. Sweep line extends interval merging to concurrent event tracking.

---

## 🟡 B-Rank — Unlocked

You've earned B-Rank. Continue from **Day 17: Monotonic Stack Fundamentals** in the sidebar — your structure-building journey begins now.

> 💡 B-Rank teaches you to *build* specialized data structures: monotonic stacks for next-greater problems, 2D matrix traversal, 2D prefix sums, hash key design, and advanced sweep line. This is where Hard problems become your comfort zone.

---

> *"I alone level up." — You built the foundation. You learned to move. You learned to control. The ascension continues.*
