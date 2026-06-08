# ⚔ Quest: Remove Duplicate Letters

> **Day 26** · [Remove Duplicate Letters #316](https://leetcode.com/problems/remove-duplicate-letters/) · Medium · 50 XP · 22 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove Duplicate Letters on LeetCode](https://leetcode.com/problems/remove-duplicate-letters/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a string `s`, remove duplicate letters so that every letter appears **once and only once**. Return the **smallest in lexicographical order** among all possible results.

```
Input:  s = "cbacdcbc"
Output: "acdb"

Input:  s = "bcabc"
Output: "abc"

Input:  s = "ecbacba"
Output: "eacb"
```

---

## 💡 Hints

**Hint 1 — Same skeleton as Remove K Digits:** Increasing monotonic stack. Pop `stack.top()` when `c < stack.top()` — but only if you can safely discard the top character.

**Hint 2 — Frequency map (E-Rank Day 3):** Precompute `freq[c]` = total count of each character. As you scan, decrement `freq[c]`. Before popping `stack.top()`, check `freq[stack.top()] > 0` — the popped char must appear again later, or you'd lose it forever.

**Hint 3 — Seen set:** If `c` is already in the stack, skip it — each character appears at most once in the result. Use a boolean array or set for O(1) membership.

**Hint 4 — Pop condition (all three must hold):** Pop while `stack not empty AND c < stack.top() AND freq[stack.top()] > 0`. Then push `c` and mark it seen.

**Hint 5 — Every character must appear:** Unlike Remove K Digits, you can't leave characters out — the freq check ensures pops are safe, and the scan includes every character exactly once in the result.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Increasing Stack + Frequency Map + Seen Set

**How to identify this from the problem statement:**
- "smallest in lexicographical order" → increasing stack with pop rule
- "every letter appears once" → seen set prevents duplicates
- "remove duplicate letters" → stack discards redundant larger chars
- must include all unique chars → freq map gates pops

| Keyword / phrase | What it signals |
|---|---|
| "smallest lexicographical order" | Increasing stack — pop larger chars when safe |
| "every letter once and only once" | Seen set + must include all unique chars |
| "remove duplicate letters" | Stack construction, not sorting |
| "among all possible results" | Greedy — exchange argument from Day 16 |
| Medium + string + uniqueness | 3-pattern combo: stack + freq + seen |

**Why this pattern works:** The increasing stack builds the smallest valid prefix. The freq map ensures we only pop a character we'll see again. The seen set skips re-adding characters already committed. Together: O(n) greedy construction.

**How a strong solver thinks before coding:**
1. *"Smallest string, each char once → increasing stack + freq + seen."*
2. *"Pop top while c < top AND freq[top] > 0."*
3. *"Skip c if already in seen. Decrement freq[c] each visit."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sort unique characters** | Ignores order constraint — must be subsequence of s |
| **Try all subsequences with unique chars** | O(2^n) — stack greedy is O(n) |
| **Pop without freq check** | Remove a character that never reappears → invalid result |
| **No seen set — push duplicates** | Same char added twice — violates "once and only once" |

**The insight brute force misses:** The three tools each guard one failure mode. Stack → smallest order. Freq → don't lose characters. Seen → no duplicates. All three are necessary.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Remove Duplicate Letters #316](https://leetcode.com/problems/remove-duplicate-letters/) | All unique chars, smallest | Stack + freq + seen |
| [Smallest Subsequence of Distinct Characters #1081](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/) | Identical pattern | Same solution |
| [Remove K Digits #402](https://leetcode.com/problems/remove-k-digits/) | Budget instead of freq | Stack only, no seen |
| [Create Maximum Number #321](https://leetcode.com/problems/create-maximum-number/) | Maximize, k-length | Decreasing stack variant |

#316 is the flagship three-pattern combo — stack + frequency + seen working together.

---

## 📖 Walkthrough

```
s = "cbacdcbc"

Precompute freq: {c:3, b:2, a:2, d:1}

stack=[], seen={}

'c': freq[c]=2, not seen → push → stack=[c], seen={c}
'b': freq[b]=1, b < c, freq[c]=2>0 → pop c, seen={}
     push b → stack=[b], seen={b}
'a': freq[a]=1, a < b, freq[b]=1>0 → pop b
     a < ... stack empty → push a → stack=[a], seen={a}
'c': freq[c]=1, c > a → push → stack=[a,c], seen={a,c}
'd': freq[d]=0, d > c → push → stack=[a,c,d], seen={a,c,d}
'c': freq[c]=0, c in seen → skip
'b': freq[b]=0, b < d, freq[d]=0 → can't pop d (gone forever)
     push b → stack=[a,c,d,b]... 

(continue — final stack settles to "acdb")

Result: "acdb" ✓
```

> 💡 **The insight:** Three guards, one construction. Stack picks smallest order. Freq ensures safe pops. Seen prevents duplicates. Remove any one guard and the solution breaks.

---

## Solution

### C++
```cpp
class Solution {
public:
    string removeDuplicateLetters(string s) {
        vector<int> freq(26, 0);
        for (char c : s) freq[c - 'a']++;

        string stack;
        vector<bool> seen(26, false);

        for (char c : s) {
            freq[c - 'a']--;
            if (seen[c - 'a']) continue;

            while (!stack.empty() && c < stack.back() && freq[stack.back() - 'a'] > 0) {
                seen[stack.back() - 'a'] = false;
                stack.pop_back();
            }
            stack.push_back(c);
            seen[c - 'a'] = true;
        }
        return stack;
    }
};
```

### Python
```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        freq = {}
        for c in s:
            freq[c] = freq.get(c, 0) + 1

        stack = []
        seen = set()

        for c in s:
            freq[c] -= 1
            if c in seen:
                continue

            while stack and c < stack[-1] and freq[stack[-1]] > 0:
                seen.discard(stack.pop())

            stack.append(c)
            seen.add(c)

        return ''.join(stack)
```

### Java
```java
class Solution {
    public String removeDuplicateLetters(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;

        StringBuilder stack = new StringBuilder();
        boolean[] seen = new boolean[26];

        for (char c : s.toCharArray()) {
            freq[c - 'a']--;
            if (seen[c - 'a']) continue;

            while (stack.length() > 0
                    && c < stack.charAt(stack.length() - 1)
                    && freq[stack.charAt(stack.length() - 1) - 'a'] > 0) {
                char top = stack.charAt(stack.length() - 1);
                seen[top - 'a'] = false;
                stack.deleteCharAt(stack.length() - 1);
            }
            stack.append(c);
            seen[c - 'a'] = true;
        }
        return stack.toString();
    }
}
```

**Complexity:** O(n) time · O(1) space (26-char alphabet)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Smallest lexicographical order"** → Increasing monotonic stack (Day 26).
- **"Every letter once"** → Seen set — skip if already in stack.
- **"Remove duplicate letters"** → Pop larger stack tops when a smaller char arrives.
- **"Must include all unique chars"** → Freq map — only pop if `freq[top] > 0` (E-Rank Day 3).
- **3-pattern combo** → Stack (order) + Freq (safety) + Seen (uniqueness).

If you sorted unique characters, you ignored order. If you popped without checking freq, you lost characters forever. The signal was "smallest" + "each letter once" — three tools together.

> 🎯 **Pattern Combo:** Increasing stack + frequency map + seen set. Pop while `c < top` and `freq[top] > 0`; skip if `c in seen`.

---

*Checkpoint: same three-pattern combo on a subsequence variant. →*
