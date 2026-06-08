# ⚔ A-Rank Test — Problem 3

> [Text Justification #68](https://leetcode.com/problems/text-justification/) · **Hard** · 250 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Text Justification on LeetCode](https://leetcode.com/problems/text-justification/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **Final A-Rank test.** This is an **implementation skill test** — greedy string construction (Day 26) under precise spacing rules. Pattern recognition gets you the skeleton; careful simulation earns the pass.

---

## The Problem

Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully justified.

You should pack your words in a greedy fashion; that is, pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly `maxWidth` characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly, the empty slots on the left are assigned more spaces than the slots on the right.

For the **last line** of text, it should be left-justified, and no extra space is inserted between words beyond what is necessary to fit them on one line. Single-word lines must be left-justified.

```
Input:  words = ["This", "is", "an", "example", "of", "text", "justification"], maxWidth = 16
Output: [
  "This    is    an",
  "example  of text",
  "justification   "
]

Input:  words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output: [
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]

Input:  words = ["Science","is","what","we","understand","well","enough","to","explain",
                "to","a","computer.","Art","is","what","we","do","not","understand",
                "well","enough","to","explain","to","a","computer."], maxWidth = 20
Output: [ ... 6 justified lines ... ]
```

---

## 💡 Hints

> 🎯 **What's being tested:** Greedy string construction (Day 26) — pack words greedily, then simulate spacing rules line by line.

**Hint 1 — Greedy packing:** Scan words left to right. Greedily add words to the current line while `sum(word lengths) + (word count - 1) ≤ maxWidth`. When the next word doesn't fit, finalize the current line and start a new one.

**Hint 2 — Full line vs last line:** If the line is **not** the last line **and** contains more than one word → fully justify (distribute extra spaces evenly, bias left). If it's the **last line** or a **single-word line** → left-justify with one space between words, pad trailing spaces on the right.

**Hint 3 — Space distribution math:** For a full line with `k` words and total word length `chars`, you need `maxWidth - chars` total spaces. With `k - 1` gaps: `spaces_per_gap = total_spaces / (k - 1)`, `extra = total_spaces % (k - 1)`. Assign `spaces_per_gap + 1` to the first `extra` gaps, then `spaces_per_gap` to the rest.

**Hint 4 — Build with a string builder:** For each gap `j` between words, append `word[j]` then append the correct number of `' '` characters. After the last word on a left-justified line, pad with spaces to reach `maxWidth`.

**Hint 5 — Off-by-one traps:** Don't forget the minimum one space between words on non-single-word lines. The last line uses single spaces only — no even distribution. Verify every output line has **exactly** `maxWidth` characters.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Greedy String Construction + Line Simulation (Day 26)

| Clue in the problem | What it signals |
|---|---|
| "pack as many words as you can" | Greedy line packing — not DP or backtracking |
| "fully justified" / exact width | String simulation with spacing arithmetic |
| "distribute spaces evenly, left gets more" | Integer division + remainder on gap count |
| "last line left-justified" | Two formatting modes — branch on last-line flag |
| Hard + string formatting | Implementation precision — rules are the challenge |

**How to identify from the statement:** "Format text with justification" → **greedy pack lines**, then **simulate spacing** per line type. No fancy algorithm — the Hard label is getting every spacing rule exactly right.

**How a strong solver thinks before coding:**
1. *"Greedy pack → determine line boundaries first."*
2. *"Full justify: compute total spaces, divide across gaps."*
3. *"Last line / single word: left-justify, pad right."*
4. *"Build each line character by character — verify length == maxWidth."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all possible line breaks (DP)** | Overkill — greedy packing is provably optimal for line count; adds complexity without benefit |
| **Pad all gaps with equal spaces, ignore remainder rule** | Wrong output — left gaps must get the extra space first |
| **Treat every line as fully justified** | Last line must be left-justified — fails on final row |
| **Join with `" ".join()` and pad once** | Doesn't control per-gap space distribution on full-justify lines |
| **Forget trailing spaces on last word** | Lines won't reach exactly `maxWidth` characters |

**The insight brute force misses:** The problem isn't about finding an optimal layout — greedy packing is fixed. The challenge is **correct simulation** of spacing rules. Write the packer, then write the formatter.

---

## 🎯 Transfer to Unseen Problems

Can you spot greedy string construction on unfamiliar wording?

**Scenario 1:** *"Given digits, remove k digits to form the smallest possible number."*

Which pattern? **Greedy stack / string construction** (Day 26). Monotonic stack removes larger leading digits — same greedy-build family, different rule.

**Scenario 2:** *"Given a list of words, return the minimum number of rows needed to print all words with a max row width."*

Which pattern? **Greedy packing** (this problem without justification). Same line-packing loop — no spacing simulation needed.

**Scenario 3:** *"Given a string, partition it so every part is a palindrome — return all partitions."*

Which pattern? **Backtracking / DP** (S-Rank). Not greedy — must explore all valid partitions.

> **Answer key:** Scenario 1 → greedy stack (Day 26). Scenario 2 → greedy packing (subset of this problem). Scenario 3 → backtracking. Signal: **"format/build a string under explicit layout rules"** → greedy construction + careful simulation.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
words = ["This", "is", "an", "example", "of", "text", "justification"]
maxWidth = 16
```

**Line 1 — greedy pack:** `"This"` (4) + `"is"` (2) + `"an"` (2) = 8 chars + 2 spaces = 10 ≤ 16. `"example"` (7) → 10 + 1 + 7 = 18 > 16. Line 1 = `["This", "is", "an"]`.

Full justify: chars = 4+2+2 = 8, total spaces = 16−8 = 8, gaps = 2. `8/2 = 4` each → `"This    is    an"` (4+4+2+4+2 = 16) ✓

**Line 2:** `"example"` (7) + `"of"` (2) + `"text"` (4) = 13 + 2 = 15 ≤ 16. Next word doesn't exist yet — but this isn't the last line. Full justify: chars = 13, spaces = 3, gaps = 2. `3/2 = 1` base, `1` extra → first gap gets 2, second gets 1 → `"example  of text"` ✓

**Line 3 — last line:** `["justification"]` → left-justify, pad right → `"justification   "` (15 + 1 = 16) ✓

### Formatting subroutine

```text
pack lines greedily (track start/end indices)

for each line [i, j]:
  if j is last line OR i == j:
    join words with single space, pad right to maxWidth
  else:
    compute chars, total_spaces, gaps
    distribute spaces: first (total_spaces % gaps) gaps get +1
```

### C++
```cpp
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res;
        int n = words.size(), i = 0;
        while (i < n) {
            int j = i, len = 0;
            while (j < n && len + (int)words[j].size() + (j - i) <= maxWidth) {
                len += words[j].size();
                j++;
            }
            string line;
            int gaps = j - i - 1;
            if (gaps == 0 || j == n) {
                for (int k = i; k < j; k++) {
                    line += words[k];
                    if (k < j - 1) line += ' ';
                }
                line += string(maxWidth - (int)line.size(), ' ');
            } else {
                int totalSpaces = maxWidth - len;
                int spacePer = totalSpaces / gaps;
                int extra = totalSpaces % gaps;
                for (int k = i; k < j; k++) {
                    line += words[k];
                    if (k < j - 1)
                        line += string(spacePer + (k - i < extra ? 1 : 0), ' ');
                }
            }
            res.push_back(line);
            i = j;
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def fullJustify(self, words: list[str], maxWidth: int) -> list[str]:
        res, i, n = [], 0, len(words)
        while i < n:
            j, length = i, 0
            while j < n and length + len(words[j]) + (j - i) <= maxWidth:
                length += len(words[j])
                j += 1

            gaps = j - i - 1
            if gaps == 0 or j == n:
                line = " ".join(words[i:j])
                line += " " * (maxWidth - len(line))
            else:
                total_spaces = maxWidth - length
                space_per, extra = divmod(total_spaces, gaps)
                line = ""
                for k in range(i, j):
                    line += words[k]
                    if k < j - 1:
                        line += " " * (space_per + (1 if k - i < extra else 0))
            res.append(line)
            i = j
        return res
```

### Java
```java
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<>();
        int n = words.length, i = 0;
        while (i < n) {
            int j = i, len = 0;
            while (j < n && len + words[j].length() + (j - i) <= maxWidth) {
                len += words[j].length();
                j++;
            }
            StringBuilder line = new StringBuilder();
            int gaps = j - i - 1;
            if (gaps == 0 || j == n) {
                for (int k = i; k < j; k++) {
                    line.append(words[k]);
                    if (k < j - 1) line.append(' ');
                }
                while (line.length() < maxWidth) line.append(' ');
            } else {
                int totalSpaces = maxWidth - len;
                int spacePer = totalSpaces / gaps;
                int extra = totalSpaces % gaps;
                for (int k = i; k < j; k++) {
                    line.append(words[k]);
                    if (k < j - 1) {
                        for (int s = 0; s < spacePer + (k - i < extra ? 1 : 0); s++)
                            line.append(' ');
                    }
                }
            }
            res.add(line.toString());
            i = j;
        }
        return res;
    }
}
```

**Complexity:** O(total characters) time · O(1) extra space beyond output

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Pack as many words as possible"** → Greedy line packing (Day 26) — scan and group.
- **"Fully justified"** → Distribute `(maxWidth - charCount)` spaces across gaps — left-biased remainder.
- **"Last line / single word"** → Left-justify only — different branch, same packer.

You just completed the A-Rank test trilogy: pattern selection on palindromes, in-place hashing on arrays, and string simulation under complex rules. Three different elite skills — all built from Days 23–27.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** Ready for S-Rank. |
| 2/3 solved | **Pass.** Advance to S-Rank. Revisit the one you missed. |
| 1/3 solved | **Retry.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Re-study.** Re-do Days 23–27 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
