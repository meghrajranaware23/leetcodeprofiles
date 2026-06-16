<!-- hand-authored -->
# ⚔ Quest: Find All Possible Recipes

> **Day 12** · [Find All Possible Recipes from Given Supplies #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find All Possible Recipes from Given Supplies on LeetCode](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)**

> ⚔ **Hunter's rule:** Supplies are your initial in-degree-0 nodes. Each ingredient not in supplies adds to the recipe's in-degree. Peel forward.

---

## The Problem

See the full problem statement on LeetCode: **[Find All Possible Recipes from Given Supplies #2115](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Map strings to graph nodes. For each recipe, count ingredients **not** already in `have` (supplies). Edge: ingredient → recipe. When a recipe is crafted, add it to `have` — newly unlocked ingredient for other recipes.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Topological Dependency Chain (forward Kahn)

**How to identify this from the problem statement:**
- Items unlock other items over time
- Initial "free" items = supplies (indeg 0)
- Crafting order matters; no cycles in valid input

| Keyword / phrase | What it signals |
|---|---|
| "supplies" / "ingredients" | Seeds for Kahn queue |
| "recipes" depend on ingredients | Edge ing → recipe |
| "find all possible" | Peel until queue empty |

**Why this pattern works:** A recipe becomes craftable when all non-supply dependencies are satisfied — exactly when in-degree drops to 0.

**How a strong solver thinks before coding:**
1. *"have = set(supplies)."*
2. *"For each recipe, indeg = count of ings not in have."*
3. *"Queue recipes with indeg 0, craft, add to have, decrement."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try recipes in every order** | O(n!) |
| **Greedy without indeg tracking** | May attempt recipe before ingredient ready |
| **DFS without memo** | Re-explores same dependency chains |

**The insight:** Same Kahn skeleton as Course Schedule — nodes are just strings.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Course Schedule II #210](https://leetcode.com/problems/course-schedule-ii/) | Integer nodes | Forward Kahn |
| [Find Eventual Safe States #802](https://leetcode.com/problems/find-eventual-safe-states/) | Reverse peel | Previous quest |
| [Design Twitter #355](https://leetcode.com/problems/design-twitter/) | Different domain | Feed ordering — not Kahn |

---

## 📖 Walkthrough

```
recipes = ["bread"], ingredients = [["yeast","flour"]]
supplies = ["yeast","flour"]

have = {yeast, flour}
bread indeg = 0 (both ings in have) → queue [bread]
Craft bread → have += bread → output ["bread"]
```

> 💡 **The insight:** Crafting a recipe adds a new "supply" — may unlock further recipes in same peel chain.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {
        unordered_set<string> have(supplies.begin(), supplies.end());
        unordered_map<string, vector<string>> adj;
        unordered_map<string, int> indeg;
        for (int i = 0; i < (int)recipes.size(); i++) {
            indeg[recipes[i]] = 0;
            for (auto& ing : ingredients[i]) {
                if (!have.count(ing)) {
                    adj[ing].push_back(recipes[i]);
                    indeg[recipes[i]]++;
                }
            }
        }
        queue<string> q;
        for (auto& [r, d] : indeg)
            if (!d) q.push(r);
        vector<string> res;
        while (!q.empty()) {
            string u = q.front(); q.pop();
            res.push_back(u);
            have.insert(u);
            for (auto& v : adj[u])
                if (--indeg[v] == 0) q.push(v);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def findAllRecipes(self, recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:
        have = set(supplies)
        adj = defaultdict(list)
        indeg = {r: 0 for r in recipes}
        for r, ings in zip(recipes, ingredients):
            for ing in ings:
                if ing not in have:
                    adj[ing].append(r)
                    indeg[r] += 1
        q = deque(r for r in recipes if indeg[r] == 0)
        res = []
        while q:
            u = q.popleft()
            res.append(u)
            have.add(u)
            for v in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return res
```

### Java
```java
class Solution {
    public List<String> findAllRecipes(String[] recipes, List<List<String>> ingredients, String[] supplies) {
        Set<String> have = new HashSet<>(Arrays.asList(supplies));
        Map<String, List<String>> adj = new HashMap<>();
        Map<String, Integer> indeg = new HashMap<>();
        for (int i = 0; i < recipes.length; i++) {
            indeg.put(recipes[i], 0);
            for (String ing : ingredients.get(i)) {
                if (!have.contains(ing)) {
                    adj.computeIfAbsent(ing, k -> new ArrayList<>()).add(recipes[i]);
                    indeg.merge(recipes[i], 1, Integer::sum);
                }
            }
        }
        Queue<String> q = new ArrayDeque<>();
        for (String r : recipes) if (indeg.get(r) == 0) q.offer(r);
        List<String> res = new ArrayList<>();
        while (!q.isEmpty()) {
            String u = q.poll();
            res.add(u);
            have.add(u);
            for (String v : adj.getOrDefault(u, List.of()))
                if (indeg.merge(v, -1, Integer::sum) == 0) q.offer(v);
        }
        return res;
    }
}
```

**Complexity:** O(R + I) time · O(R + I) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Supplies = Day 11's indeg-0 courses."**
- **"Ingredient → recipe edges."** → forward Kahn.
- **"Add crafted recipe to have."** → dynamic new supplies.
- **"String hash map instead of int array."** → same algorithm, different labels.

> 🎯 **Pattern Unlocked:** Topological Dependency Chain

---

*Both quests complete. Head to the checkpoint. →*
