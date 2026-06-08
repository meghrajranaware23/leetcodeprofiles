# ✅ Day 24 Checkpoint

> **KMP Prefix Function** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "find first occurrence of pattern" | KMP: build π on pattern, scan text | O(n+m), no text backtracking |
| "shortest palindrome by prepending" | KMP on `s + "#" + reverse(s)` | π[last] = longest palindromic prefix |
| "repeated substring pattern" | KMP π on s: `n % (n - π[n-1]) == 0` | Border length reveals period |
| "longest proper prefix = suffix" | π[n-1] directly | Happy prefix / border query |
| mismatch during search | `j = π[j-1]`, not `j = 0` | Salvage longest matched border |
| π build mismatch | `j = π[j-1]` in while loop | Same fallback during construction |
| need guaranteed O(n+m) match | KMP over Rabin-Karp | No hash collisions |

### 🧠 Quick Recognition Test

1. *"Return index of first occurrence of needle in haystack"* → **KMP π + scan (#28)**
2. *"Shortest palindrome obtainable by prepending to s"* → **KMP on s + "#" + reverse(s) (#214)**
3. *"Is s composed of repeated unit substring?"* → **π[n-1] period check (#459)**
4. *"Longest happy prefix of s (proper prefix = suffix)"* → **Return π[n-1] (#1392)**

---

## 🎯 Transfer to Unseen Problems

You've studied Find the Index of the First Occurrence and Shortest Palindrome. Can you recognize KMP thinking on problems you've never walked through?

**Scenario 1:** *"Given a string s, determine if it can be constructed by taking a substring of s and appending multiple copies of it."*

Which pattern? **KMP period check.** Compute π for s. If `π[n-1] > 0` and `n % (n - π[n-1]) == 0`, the period is `n - π[n-1]` and s is a repeat (#459).

**Scenario 2:** *"Find the longest prefix of s that is also a suffix (proper)."*

Which pattern? **Direct π query.** Answer is `π[n-1]` — the last entry encodes the longest border of the entire string (#1392).

**Scenario 3:** *"Given a string, find the minimum number of characters to append (not prepend) to make it a palindrome."*

Which pattern? **KMP on `reverse(s) + "#" + s`.** π[last] gives longest palindromic suffix; append reverse of the unmatched prefix. Mirror trick of #214 with reversed concatenation order.

> **Answer key:** Scenario 1 → π period divisibility (#459). Scenario 2 → π[n-1] (#1392). Scenario 3 → KMP concatenation variant (reverse first). Signal: **"border / prefix-suffix overlap"** → prefix function.

---

## ⚠ Common Mistakes

1. **Restarting j = 0 on mismatch** — Use `j = π[j-1]`. Text pointer `i` never retreats.

2. **Forgetting "#" separator in concatenation tricks** — Without it, borders can falsely span s and reverse(s).

3. **Off-by-one on π length** — π[i] is a **length**, not an index. Palindromic prefix length = π[last], prefix is `s[0..π[last]-1]`.

4. **Infinite loop in π build** — Fallback is `j = π[j-1]`, not `j--`. The while loop must shrink j through the border chain.

5. **Confusing shortest palindrome with longest palindromic substring** — #214 needs longest palindromic **prefix**, not any substring. KMP concatenation targets prefix specifically.

---

## 🏋️ Mini Challenge

### [Repeated Substring Pattern #459](https://leetcode.com/problems/repeated-substring-pattern/)

**[→ Try Repeated Substring Pattern on LeetCode](https://leetcode.com/problems/repeated-substring-pattern/)**

Given a string `s`, return `true` if `s` can be constructed by taking a substring of `s` and appending multiple copies of the substring.

```
Input:  s = "abab"
Output: true    ("ab" repeated twice)

Input:  s = "aba"
Output: false

Input:  s = "abcabcabc"
Output: true    ("abc" repeated three times)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "constructed by repeating a substring" | Period / border structure |
| "multiple copies" | If period = p, then n % p == 0 |
| boolean check, not construction | π[n-1] gives longest border → derive period |

**Before you code:** *"Build π for s. Period = n - π[n-1]. If π[n-1] > 0 and n % period == 0, return true."*

> 💡 **Hint:** A border of length `π[n-1]` means `s[0..π[n-1]-1]` equals `s[n-π[n-1]..n-1]`. The repeating unit length is `n - π[n-1]`. Check divisibility.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Repeated Substring Pattern #459](https://leetcode.com/problems/repeated-substring-pattern/) | Easy | KMP π period check |
| [Longest Happy Prefix #1392](https://leetcode.com/problems/longest-happy-prefix/) | Hard | π[n-1] border query |
| [Find the Index of the First Occurrence #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Easy | Standard KMP search |
| [Shortest Palindrome #214](https://leetcode.com/problems/shortest-palindrome/) | Hard | KMP concatenation trick |
| [Minimum Time to Revert String to Initial State #3029](https://leetcode.com/problems/minimum-time-to-revert-string-to-initial-state-ii/) | Hard | KMP period + math |

---

*Day 24 complete! Tomorrow: multi-constraint sliding windows — when one counter isn't enough. →*
