---
# ⚔ Day 1: Array Fundamentals & Traversal Mastery

**Rank:** E-Rank | **XP:** 50 | **Time:** 45 min

---

## 🎯 Mission
Master the mental model of arrays — not just syntax, but how to THINK about array traversal patterns that form the backbone of every interview problem.

## 📝 Concept

Arrays are the most fundamental data structure in computer science — and the one most people underestimate. You already know what an array is. The question is: do you truly understand *why* it behaves the way it does, and how to exploit that behavior?

### Contiguous Memory: Why It Actually Matters

An array stores elements in **contiguous (adjacent) memory locations**. This isn't just a textbook fact — it's the reason arrays are fast.

```
Memory Address:  [100] [104] [108] [112] [116] [120]
Array Elements:  [ 3 ] [ 7 ] [ 1 ] [ 9 ] [ 4 ] [ 2 ]
Index:             0     1     2     3     4     5
```

When you access `arr[3]`, the CPU calculates the address instantly: `base_address + (3 × element_size)`. That's O(1) random access. No traversal. No pointer chasing. Just math.

This also means:
- **Cache performance is excellent.** When the CPU fetches `arr[0]` from memory, it pulls an entire cache line (typically 64 bytes). That means `arr[1]`, `arr[2]`, etc. are *already in the cache* when you need them. Sequential traversal is blazingly fast.
- **Insertion/deletion in the middle is expensive.** Every element after the insertion point must shift. That's O(n) work.
- **The size is (logically) fixed at allocation time.** Dynamic arrays (like `std::vector`, Python `list`, Java `ArrayList`) handle resizing by allocating a new, larger block and copying everything over — an O(n) operation that's amortized to O(1).

Understanding this memory layout is not optional. It's the reason certain patterns (like the two-pointer technique) work so efficiently — you're exploiting the fact that you can jump to any index for free.

### Forward, Backward, and Bidirectional Traversal

Most beginners default to forward traversal for everything. Stronger coders pick the traversal direction based on the problem's requirements.

**Forward traversal** (left to right):
```
Index:  0 → 1 → 2 → 3 → 4
        ──────────────────→
```
Use when: you're building results left-to-right, processing elements in order, or filling from the front.

**Backward traversal** (right to left):
```
Index:  4 → 3 → 2 → 1 → 0
        ←──────────────────
```
Use when: you need to modify elements without overwriting unprocessed data, merge from the end (like LeetCode #88), or when the problem involves "suffix" properties.

**Bidirectional traversal** (two pointers converging):
```
Index:  0 →             ← 4
        L →             ← R
```
Use when: you're checking palindromes, partitioning, or solving problems where elements at both ends interact (like Two Sum on a sorted array).

The direction you choose isn't arbitrary — it's a deliberate decision that prevents bugs and avoids needing extra space.

### In-Place Modification Patterns

"In-place" means you modify the array using O(1) extra space — no new array, no hashmap, no stack. Just the array and a few variables.

The most powerful in-place technique is the **read-write pointer pattern**:

```
Read pointer (r):   scans every element
Write pointer (w):  marks where the next "kept" element goes

Array:  [0, 1, 0, 3, 12]
         r
         w

Step 1: arr[r]=0, skip         → w stays at 0
Step 2: arr[r]=1, write to w   → arr[0]=1, w moves to 1
Step 3: arr[r]=0, skip         → w stays at 1
Step 4: arr[r]=3, write to w   → arr[1]=3, w moves to 2
Step 5: arr[r]=12, write to w  → arr[2]=12, w moves to 3
Fill:   arr[3]=0, arr[4]=0

Result: [1, 3, 12, 0, 0]
```

This pattern appears in dozens of LeetCode problems: Move Zeroes, Remove Element, Remove Duplicates. Master it once, and you've mastered them all.

### Index Manipulation: Off-by-One Mastery

Off-by-one errors are the #1 source of bugs in array problems. Here's how to think about them:

**The Loop Invariant Approach:**
Before writing any loop, state what should be true at each iteration:
- `for (int i = 0; i < n; i++)` → processes indices `0` to `n-1` (all `n` elements)
- `for (int i = 0; i < n - 1; i++)` → processes indices `0` to `n-2` (comparing adjacent pairs)
- `for (int i = n - 1; i >= 0; i--)` → processes indices `n-1` down to `0`

**Common pitfall:** Using `i <= n` when you mean `i < n`. With 0-based indexing, the last valid index is `n - 1`.

**The "Fence Post" Rule:**
If you have `n` elements, you have `n - 1` gaps between them. Problems involving adjacent pairs, substrings of length `k`, or sliding windows require you to stop `k - 1` steps early.

### When to Iterate from the End

Backward iteration isn't just a stylistic choice — sometimes it's the only way to avoid extra space.

**Rule of thumb:** If processing element `i` would overwrite data that element `j > i` still needs, iterate from the end.

Classic example: Merging two sorted arrays into the larger one (LeetCode #88). If you start from the front, you'd overwrite elements in the destination array. Starting from the back avoids this entirely.

Another example: Computing suffix sums or suffix products. You need right-to-left processing because each element depends on the elements to its right.

## 🔍 Pattern Recognition

**When to use this pattern:**
- The problem asks you to rearrange elements within the array itself
- You need to remove or move specific elements without extra space
- The problem involves comparing or processing adjacent elements
- You're given a sorted array and need to exploit that ordering
- The problem says "in-place" or "without allocating extra space"

**Keywords in interview questions:**
- "in-place"
- "without extra space" or "O(1) extra memory"
- "modify the array"
- "maintain relative order"
- "rearrange"
- "move all X to the end/beginning"
- "remove elements"

**Common traps:**
- Forgetting that array indices are 0-based, leading to off-by-one errors at boundaries
- Using `arr.length` instead of `arr.length - 1` for the last index
- Modifying the array while iterating with a single pointer (elements get skipped)
- Not handling the empty array `[]` or single-element `[x]` edge cases
- Assuming the array is non-null when the problem doesn't guarantee it

**What beginners miss:**
- The read-write pointer pattern is the skeleton key for in-place modification problems
- The direction of traversal often determines whether you need extra space or not
- "Maintain relative order" is a crucial constraint — it eliminates swap-to-end approaches
- You can often replace an explicit `fill zeros at end` step with swaps during traversal
- Edge cases (empty array, all same elements, already solved) should be checked first

**How stronger coders think:**
- They decide traversal direction *before* writing code by asking: "Will I overwrite data I still need?"
- They define the loop invariant (what `i` represents) before writing the loop
- They trace through 2-3 small examples mentally to catch off-by-one errors
- They think about the *write pointer* separately from the *read pointer*
- They ask: "What property does the array have AFTER index `w`?" to maintain clarity
- They test with: empty array, single element, all duplicates, already sorted, reverse sorted

## 💻 Code Example 1: Move Zeroes

**Problem:** Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements. You must do this **in-place** without making a copy of the array. *(LeetCode #283)*

```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

### Visual Walkthrough

```
Initial:    [0, 1, 0, 3, 12]
             w
             r

r=0: arr[0]=0 → skip
            [0, 1, 0, 3, 12]
             w     r

r=1: arr[1]=1 → swap(arr[0], arr[1]) → w++
            [1, 0, 0, 3, 12]
                w     r

r=2: arr[2]=0 → skip
            [1, 0, 0, 3, 12]
                w        r

r=3: arr[3]=3 → swap(arr[1], arr[3]) → w++
            [1, 3, 0, 0, 12]
                   w         r

r=4: arr[4]=12 → swap(arr[2], arr[4]) → w++
            [1, 3, 12, 0, 0]
                       w         r (done)

Result:     [1, 3, 12, 0, 0]  ✓
```

### C++
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int write = 0; // Position where next non-zero should go
        
        for (int read = 0; read < nums.size(); read++) {
            if (nums[read] != 0) {
                // Swap non-zero element to the write position
                swap(nums[write], nums[read]);
                write++;
            }
        }
        // Everything from index 'write' onward is already 0
        // because every non-zero was swapped forward
    }
};
```

### Python
```python
class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        write = 0  # Position where next non-zero should go

        for read in range(len(nums)):
            if nums[read] != 0:
                # Swap non-zero element to the write position
                nums[write], nums[read] = nums[read], nums[write]
                write += 1
        # Everything from index 'write' onward is already 0
```

### Java
```java
class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0; // Position where next non-zero should go
        
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                // Swap non-zero element to the write position
                int temp = nums[write];
                nums[write] = nums[read];
                nums[read] = temp;
                write++;
            }
        }
        // Everything from index 'write' onward is already 0
    }
}
```

### Why This Works
The write pointer always points to the leftmost position where a non-zero element should be placed. Every non-zero element gets swapped into position, and zeros naturally accumulate at the end. The swap ensures we don't lose any elements — we're just relocating them.

Notice that when `write == read` (no zeros encountered yet), the swap is a no-op — the element stays in place. This avoids unnecessary work.

### Complexity Analysis
- **Time:** O(n) — single pass through the array
- **Space:** O(1) — only two integer variables regardless of input size

---

## 💻 Code Example 2: Rotate Array

**Problem:** Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative. *(LeetCode #189)*

```
Input:  nums = [1, 2, 3, 4, 5, 6, 7], k = 3
Output: [5, 6, 7, 1, 2, 3, 4]
```

### The Three-Reverse Trick

This is one of the most elegant array tricks. Instead of actually rotating elements one by one (which is O(n×k)), you use three reversals:

```
Original:           [1, 2, 3, 4, 5, 6, 7]    k = 3

Step 1: Reverse ALL  [7, 6, 5, 4, 3, 2, 1]
                      ←─────────────────→

Step 2: Reverse      [5, 6, 7, 4, 3, 2, 1]
        first k       ←─────→
        elements

Step 3: Reverse      [5, 6, 7, 1, 2, 3, 4]   ✓
        remaining              ←─────────→
        elements
```

**Why does this work?**

Think of the array as two blocks: `[A | B]` where B is the last `k` elements.
- After rotation, you want `[B | A]`.
- Reversing everything gives you `[A_rev | B_rev]`.
- Reversing each block individually gives you `[A_rev_rev | B_rev_rev]` = `[B | A]`. ✓

**Important edge case:** If `k ≥ n`, rotating by `n` brings you back to the start. So always use `k = k % n`.

### C++
```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0) return;
        
        k = k % n; // Handle k >= n
        if (k == 0) return;
        
        // Three-reverse trick
        reverse(nums.begin(), nums.end());            // Reverse entire array
        reverse(nums.begin(), nums.begin() + k);      // Reverse first k elements
        reverse(nums.begin() + k, nums.end());        // Reverse remaining n-k elements
    }
};
```

### Python
```python
class Solution:
    def rotate(self, nums: list[int], k: int) -> None:
        n = len(nums)
        if n == 0:
            return
        
        k = k % n  # Handle k >= n
        if k == 0:
            return
        
        def reverse(left: int, right: int) -> None:
            """Reverse elements in nums[left..right] in-place."""
            while left < right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1
        
        reverse(0, n - 1)      # Reverse entire array
        reverse(0, k - 1)      # Reverse first k elements
        reverse(k, n - 1)      # Reverse remaining n-k elements
```

### Java
```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) return;
        
        k = k % n; // Handle k >= n
        if (k == 0) return;
        
        // Three-reverse trick
        reverse(nums, 0, n - 1);   // Reverse entire array
        reverse(nums, 0, k - 1);   // Reverse first k elements
        reverse(nums, k, n - 1);   // Reverse remaining n-k elements
    }
    
    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}
```

### Why This Works
The three-reverse trick transforms `[A | B]` into `[B | A]` using only in-place reversals. No extra array needed. The key insight is that reversing a reversed block restores the original order — but in the new position.

This trick generalizes: you can rotate left by `k` by reversing the first `k`, then the rest, then all. The pattern shows up in string rotation problems too.

### Complexity Analysis
- **Time:** O(n) — each element is visited exactly twice (once per relevant reversal)
- **Space:** O(1) — only a few pointer variables; all operations are in-place

## ⚠️ Common Mistakes

1. **Off-by-one errors in loop bounds** — The classic `for (int i = 0; i <= nums.length; i++)` accesses index `n`, which is out of bounds. Always use `< n` for 0-indexed arrays. When iterating backward, `for (int i = n - 1; i >= 0; i--)` is correct — using `i > 0` skips index 0. If you're unsure, mentally trace the first and last iterations.

2. **Modifying the array while iterating without a write pointer** — If you try to remove elements by shifting during a single forward pass without a separate write index, you'll skip elements. For example, deleting `arr[i]` and then incrementing `i` means the element that shifted into position `i` is never checked. The fix: use a read/write pointer pair, or iterate backward when removing.

3. **Not considering the empty array edge case** — Many solutions crash on `[]` because they access `nums[0]` or compute `nums.length - 1 = -1` before checking. Always guard with `if (n == 0) return;` at the top. Similarly, single-element arrays `[x]` are trivially solved — your algorithm should handle them without special logic, but verify it does.

4. **Forgetting `k = k % n` in rotation problems** — If `k` equals or exceeds the array length, you'll reverse incorrect segments or access out-of-bounds indices. Always normalize `k` first.

5. **Using O(n) extra space when O(1) is required** — Creating a new array and copying results back technically solves the problem, but fails the "in-place" constraint. Read the problem statement carefully. If it says "Do not allocate extra space," you need the read-write pointer or reversal approach.

## 🏋️ Mini Challenge

**Problem:** Remove Duplicates from Sorted Array (LeetCode #26)

Given a sorted integer array `nums`, remove the duplicates **in-place** such that each unique element appears only once. Return the number of unique elements `k`. The first `k` elements of `nums` should hold the result.

```
Input:  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: k = 5, nums = [0, 1, 2, 3, 4, ...]
```

**Hint:** Since the array is sorted, duplicates are always adjacent. Use a write pointer that only advances when you see a new value.

**Expected approach:** Read-write pointer. The write pointer marks the end of the "unique" prefix. The read pointer scans forward. When `nums[read] != nums[write]`, increment `write` and copy `nums[read]` to `nums[write]`. Return `write + 1`.

## 📚 Practice Problems

| Problem | Difficulty | Platform | Key Pattern |
|---------|-----------|----------|-------------|
| [Remove Element](https://leetcode.com/problems/remove-element/) | Easy | LeetCode #27 | Read-write pointer, in-place removal |
| [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) | Easy | LeetCode #88 | Backward traversal to avoid overwriting |
| [Duplicate Zeros](https://leetcode.com/problems/duplicate-zeros/) | Easy | LeetCode #1089 | Backward fill after counting shifts |
| [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Easy | LeetCode #26 | Read-write pointer on sorted input |
| [Plus One](https://leetcode.com/problems/plus-one/) | Easy | LeetCode #66 | Backward traversal with carry propagation |
