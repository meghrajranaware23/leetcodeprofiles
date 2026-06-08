export const SOLUTIONS = {
  94: {
    lc: 94,
    method: "inorderTraversal",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top(); st.pop();
            res.push_back(curr->val);
            curr = curr->right;
        }
        return res;
    }
};`,
    python: `class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res, stack, curr = [], [], root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            res.append(curr.val)
            curr = curr.right
        return res`,
    java: `class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.pop();
            res.add(curr.val);
            curr = curr.right;
        }
        return res;
    }
}`,
  },
  98: {
    lc: 98,
    method: "isValidBST",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    bool validate(TreeNode* node, long long lo, long long hi) {
        if (!node) return true;
        if (node->val <= lo || node->val >= hi) return false;
        return validate(node->left, lo, node->val) &&
               validate(node->right, node->val, hi);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LLONG_MIN, LLONG_MAX);
    }
};`,
    python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, lo, hi):
            if not node: return True
            if not (lo < node.val < hi): return False
            return validate(node.left, lo, node.val) and validate(node.right, node.val, hi)
        return validate(root, float('-inf'), float('inf'))`,
    java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean validate(TreeNode node, long lo, long hi) {
        if (node == null) return true;
        if (node.val <= lo || node.val >= hi) return false;
        return validate(node.left, lo, node.val) && validate(node.right, node.val, hi);
    }
}`,
  },
  99: {
    lc: 99,
    method: "recoverTree",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev && prev->val > node->val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        inorder(node->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
};`,
    python: `class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        self.first = self.second = self.prev = None
        def inorder(node):
            if not node: return
            inorder(node.left)
            if self.prev and self.prev.val > node.val:
                if not self.first: self.first = self.prev
                self.second = node
            self.prev = node
            inorder(node.right)
        inorder(root)
        self.first.val, self.second.val = self.second.val, self.first.val`,
    java: `class Solution {
    private TreeNode first, second, prev;
    public void recoverTree(TreeNode root) {
        inorder(root);
        int tmp = first.val; first.val = second.val; second.val = tmp;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && prev.val > node.val) {
            if (first == null) first = prev;
            second = node;
        }
        prev = node;
        inorder(node.right);
    }
}`,
  },
  100: {
    lc: 100,
    method: "isSameTree",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};`,
    python: `class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q: return True
        if not p or not q or p.val != q.val: return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
    java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
  },
  101: {
    lc: 101,
    method: "isSymmetric",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    bool mirror(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return mirror(a->left, b->right) && mirror(a->right, b->left);
    }
public:
    bool isSymmetric(TreeNode* root) {
        return !root || mirror(root->left, root->right);
    }
};`,
    python: `class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def mirror(a, b):
            if not a and not b: return True
            if not a or not b or a.val != b.val: return False
            return mirror(a.left, b.right) and mirror(a.right, b.left)
        return not root or mirror(root.left, root.right)`,
    java: `class Solution {
    private boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }
    public boolean isSymmetric(TreeNode root) {
        return root == null || mirror(root.left, root.right);
    }
}`,
  },
  102: {
    lc: 102,
    method: "levelOrder",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            res.push_back({});
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                res.back().push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res, q = [], deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res`,
    java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
  },
  103: {
    lc: 103,
    method: "zigzagLevelOrder",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int sz = q.size();
            deque<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                if (leftToRight) level.push_back(node->val);
                else             level.push_front(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(vector<int>(level.begin(), level.end()));
            leftToRight = !leftToRight;
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        res, q, left_to_right = [], deque([root]), True
        while q:
            level = deque()
            for _ in range(len(q)):
                node = q.popleft()
                if left_to_right: level.append(node.val)
                else:              level.appendleft(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            res.append(list(level))
            left_to_right = not left_to_right
        return res`,
    java: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        boolean leftToRight = true;
        while (!q.isEmpty()) {
            int sz = q.size();
            Deque<Integer> level = new ArrayDeque<>();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (leftToRight) level.addLast(node.val);
                else             level.addFirst(node.val);
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(new ArrayList<>(level));
            leftToRight = !leftToRight;
        }
        return res;
    }
}`,
  },
  104: {
    lc: 104,
    method: "maxDepth",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
    python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
  },
  105: {
    lc: 105,
    method: "buildTree",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_map<int,int> idx;
    int pre;
    TreeNode* build(vector<int>& preorder, int l, int r) {
        if (l > r) return nullptr;
        int val = preorder[pre++];
        TreeNode* node = new TreeNode(val);
        node->left  = build(preorder, l, idx[val] - 1);
        node->right = build(preorder, idx[val] + 1, r);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        pre = 0;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
};`,
    python: `class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        self.pre = 0
        def build(l, r):
            if l > r: return None
            val = preorder[self.pre]; self.pre += 1
            node = TreeNode(val)
            node.left  = build(l, idx[val] - 1)
            node.right = build(idx[val] + 1, r)
            return node
        return build(0, len(inorder) - 1)`,
    java: `class Solution {
    private Map<Integer,Integer> idx = new HashMap<>();
    private int pre = 0;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] preorder, int l, int r) {
        if (l > r) return null;
        int val = preorder[pre++];
        TreeNode node = new TreeNode(val);
        node.left  = build(preorder, l, idx.get(val) - 1);
        node.right = build(preorder, idx.get(val) + 1, r);
        return node;
    }
}`,
  },
  106: {
    lc: 106,
    method: "buildTree",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_map<int,int> idx;
    int post;
    TreeNode* build(vector<int>& postorder, int l, int r) {
        if (l > r) return nullptr;
        int val = postorder[post--];
        TreeNode* node = new TreeNode(val);
        node->right = build(postorder, idx[val] + 1, r);
        node->left  = build(postorder, l, idx[val] - 1);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        post = postorder.size() - 1;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(postorder, 0, inorder.size() - 1);
    }
};`,
    python: `class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        def build(l, r):
            if l > r: return None
            val = postorder.pop()
            node = TreeNode(val)
            node.right = build(idx[val] + 1, r)
            node.left  = build(l, idx[val] - 1)
            return node
        return build(0, len(inorder) - 1)`,
    java: `class Solution {
    private Map<Integer,Integer> idx = new HashMap<>();
    private int post;
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        post = postorder.length - 1;
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(postorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] postorder, int l, int r) {
        if (l > r) return null;
        int val = postorder[post--];
        TreeNode node = new TreeNode(val);
        node.right = build(postorder, idx.get(val) + 1, r);
        node.left  = build(postorder, l, idx.get(val) - 1);
        return node;
    }
}`,
  },
  109: {
    lc: 109,
    method: "sortedListToBST",
    time: "O(n log n)",
    space: "O(log n)",
    cpp: `class Solution {
    TreeNode* build(ListNode* head, ListNode* tail) {
        if (head == tail) return nullptr;
        ListNode *slow = head, *fast = head;
        while (fast != tail && fast->next != tail) {
            slow = slow->next;
            fast = fast->next->next;
        }
        TreeNode* node = new TreeNode(slow->val);
        node->left  = build(head, slow);
        node->right = build(slow->next, tail);
        return node;
    }
public:
    TreeNode* sortedListToBST(ListNode* head) {
        return build(head, nullptr);
    }
};`,
    python: `class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        def build(head, tail):
            if head is tail: return None
            slow = fast = head
            while fast is not tail and fast.next is not tail:
                slow = slow.next
                fast = fast.next.next
            node = TreeNode(slow.val)
            node.left  = build(head, slow)
            node.right = build(slow.next, tail)
            return node
        return build(head, None)`,
    java: `class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        return build(head, null);
    }
    private TreeNode build(ListNode head, ListNode tail) {
        if (head == tail) return null;
        ListNode slow = head, fast = head;
        while (fast != tail && fast.next != tail) {
            slow = slow.next; fast = fast.next.next;
        }
        TreeNode node = new TreeNode(slow.val);
        node.left  = build(head, slow);
        node.right = build(slow.next, tail);
        return node;
    }
}`,
  },
  110: {
    lc: 110,
    method: "isBalanced",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int height(TreeNode* node) {
        if (!node) return 0;
        int l = height(node->left);
        if (l == -1) return -1;
        int r = height(node->right);
        if (r == -1) return -1;
        if (abs(l - r) > 1) return -1;
        return 1 + max(l, r);
    }
public:
    bool isBalanced(TreeNode* root) {
        return height(root) != -1;
    }
};`,
    python: `class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def height(node):
            if not node: return 0
            l = height(node.left)
            if l == -1: return -1
            r = height(node.right)
            if r == -1: return -1
            if abs(l - r) > 1: return -1
            return 1 + max(l, r)
        return height(root) != -1`,
    java: `class Solution {
    private int height(TreeNode node) {
        if (node == null) return 0;
        int l = height(node.left);
        if (l == -1) return -1;
        int r = height(node.right);
        if (r == -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }
}`,
  },
  111: {
    lc: 111,
    method: "minDepth",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q;
        q.push(root);
        int depth = 1;
        while (!q.empty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode* node = q.front(); q.pop();
                if (!node->left && !node->right) return depth;
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            depth++;
        }
        return depth;
    }
};`,
    python: `from collections import deque
class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        q, depth = deque([root]), 1
        while q:
            for _ in range(len(q)):
                node = q.popleft()
                if not node.left and not node.right:
                    return depth
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            depth += 1
        return depth`,
    java: `class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int depth = 1;
        while (!q.isEmpty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode node = q.poll();
                if (node.left == null && node.right == null) return depth;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            depth++;
        }
        return depth;
    }
}`,
  },
  112: {
    lc: 112,
    method: "hasPathSum",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return root->val == targetSum;
        return hasPathSum(root->left,  targetSum - root->val) ||
               hasPathSum(root->right, targetSum - root->val);
    }
};`,
    python: `class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root: return False
        if not root.left and not root.right: return root.val == targetSum
        rem = targetSum - root.val
        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)`,
    java: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        int rem = targetSum - root.val;
        return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
    }
}`,
  },
  113: {
    lc: 113,
    method: "pathSum",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    void dfs(TreeNode* node, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        rem -= node->val;
        if (!node->left && !node->right && rem == 0)
            res.push_back(path);
        dfs(node->left, rem, path, res);
        dfs(node->right, rem, path, res);
        path.pop_back();
    }
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }
};`,
    python: `class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        res = []
        def dfs(node, rem, path):
            if not node: return
            path.append(node.val)
            rem -= node.val
            if not node.left and not node.right and rem == 0:
                res.append(list(path))
            dfs(node.left, rem, path)
            dfs(node.right, rem, path)
            path.pop()
        dfs(root, targetSum, [])
        return res`,
    java: `class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(root, targetSum, new ArrayList<>(), res);
        return res;
    }
    private void dfs(TreeNode node, int rem, List<Integer> path, List<List<Integer>> res) {
        if (node == null) return;
        path.add(node.val);
        rem -= node.val;
        if (node.left == null && node.right == null && rem == 0)
            res.add(new ArrayList<>(path));
        dfs(node.left, rem, path, res);
        dfs(node.right, rem, path, res);
        path.remove(path.size() - 1);
    }
}`,
  },
  114: {
    lc: 114,
    method: "flatten",
    time: "O(n)",
    space: "O(1)",
    cpp: `class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        while (curr) {
            if (curr->left) {
                TreeNode* rightmost = curr->left;
                while (rightmost->right) rightmost = rightmost->right;
                rightmost->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};`,
    python: `class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        curr = root
        while curr:
            if curr.left:
                rightmost = curr.left
                while rightmost.right:
                    rightmost = rightmost.right
                rightmost.right = curr.right
                curr.right = curr.left
                curr.left = None
            curr = curr.right`,
    java: `class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.left != null) {
                TreeNode rightmost = curr.left;
                while (rightmost.right != null) rightmost = rightmost.right;
                rightmost.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`,
  },
  116: {
    lc: 116,
    method: "connect",
    time: "O(n)",
    space: "O(1)",
    cpp: `class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* leftmost = root;
        while (leftmost->left) {
            Node* curr = leftmost;
            while (curr) {
                curr->left->next = curr->right;
                if (curr->next) curr->right->next = curr->next->left;
                curr = curr->next;
            }
            leftmost = leftmost->left;
        }
        return root;
    }
};`,
    python: `class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        leftmost = root
        while leftmost and leftmost.left:
            curr = leftmost
            while curr:
                curr.left.next = curr.right
                if curr.next:
                    curr.right.next = curr.next.left
                curr = curr.next
            leftmost = leftmost.left
        return root`,
    java: `class Solution {
    public Node connect(Node root) {
        Node leftmost = root;
        while (leftmost != null && leftmost.left != null) {
            Node curr = leftmost;
            while (curr != null) {
                curr.left.next = curr.right;
                if (curr.next != null) curr.right.next = curr.next.left;
                curr = curr.next;
            }
            leftmost = leftmost.left;
        }
        return root;
    }
}`,
  },
  124: {
    lc: 124,
    method: "maxPathSum",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = INT_MIN;
    int gain(TreeNode* node) {
        if (!node) return 0;
        int l = max(0, gain(node->left));
        int r = max(0, gain(node->right));
        ans = max(ans, node->val + l + r);
        return node->val + max(l, r);
    }
public:
    int maxPathSum(TreeNode* root) {
        gain(root);
        return ans;
    }
};`,
    python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.ans = float('-inf')
        def gain(node):
            if not node: return 0
            l = max(0, gain(node.left))
            r = max(0, gain(node.right))
            self.ans = max(self.ans, node.val + l + r)
            return node.val + max(l, r)
        gain(root)
        return self.ans`,
    java: `class Solution {
    private int ans = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        gain(root);
        return ans;
    }
    private int gain(TreeNode node) {
        if (node == null) return 0;
        int l = Math.max(0, gain(node.left));
        int r = Math.max(0, gain(node.right));
        ans = Math.max(ans, node.val + l + r);
        return node.val + Math.max(l, r);
    }
}`,
  },
  129: {
    lc: 129,
    method: "sumNumbers",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int dfs(TreeNode* node, int curr) {
        if (!node) return 0;
        curr = curr * 10 + node->val;
        if (!node->left && !node->right) return curr;
        return dfs(node->left, curr) + dfs(node->right, curr);
    }
public:
    int sumNumbers(TreeNode* root) { return dfs(root, 0); }
};`,
    python: `class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node, curr):
            if not node: return 0
            curr = curr * 10 + node.val
            if not node.left and not node.right: return curr
            return dfs(node.left, curr) + dfs(node.right, curr)
        return dfs(root, 0)`,
    java: `class Solution {
    public int sumNumbers(TreeNode root) { return dfs(root, 0); }
    private int dfs(TreeNode node, int curr) {
        if (node == null) return 0;
        curr = curr * 10 + node.val;
        if (node.left == null && node.right == null) return curr;
        return dfs(node.left, curr) + dfs(node.right, curr);
    }
}`,
  },
  144: {
    lc: 144,
    method: "preorderTraversal",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        stack<TreeNode*> st;
        st.push(root);
        while (!st.empty()) {
            TreeNode* node = st.top(); st.pop();
            res.push_back(node->val);
            if (node->right) st.push(node->right);
            if (node->left)  st.push(node->left);
        }
        return res;
    }
};`,
    python: `class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res, stack = [], [root]
        while stack:
            node = stack.pop()
            res.append(node.val)
            if node.right: stack.append(node.right)
            if node.left:  stack.append(node.left)
        return res`,
    java: `class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            res.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null)  stack.push(node.left);
        }
        return res;
    }
}`,
  },
  145: {
    lc: 145,
    method: "postorderTraversal",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* prev = nullptr;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top();
            if (!curr->right || curr->right == prev) {
                res.push_back(curr->val);
                st.pop();
                prev = curr;
                curr = nullptr;
            } else {
                curr = curr->right;
            }
        }
        return res;
    }
};`,
    python: `class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res, stack, prev, curr = [], [], None, root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack[-1]
            if not curr.right or curr.right == prev:
                res.append(curr.val)
                stack.pop()
                prev = curr
                curr = None
            else:
                curr = curr.right
        return res`,
    java: `class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode prev = null, curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.peek();
            if (curr.right == null || curr.right == prev) {
                res.add(curr.val);
                stack.pop();
                prev = curr;
                curr = null;
            } else {
                curr = curr.right;
            }
        }
        return res;
    }
}`,
  },
  173: {
    lc: 173,
    method: "next",
    time: "O(1) amortized",
    space: "O(h)",
    cpp: `class BSTIterator {
    stack<TreeNode*> st;
    void pushLeft(TreeNode* node) {
        while (node) { st.push(node); node = node->left; }
    }
public:
    BSTIterator(TreeNode* root) { pushLeft(root); }
    int next() {
        TreeNode* node = st.top(); st.pop();
        if (node->right) pushLeft(node->right);
        return node->val;
    }
    bool hasNext() { return !st.empty(); }
};`,
    python: `class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        node = self.stack.pop()
        if node.right: self._push_left(node.right)
        return node.val

    def hasNext(self) -> bool:
        return bool(self.stack)`,
    java: `class BSTIterator {
    private Deque<TreeNode> stack = new ArrayDeque<>();
    public BSTIterator(TreeNode root) { pushLeft(root); }
    public int next() {
        TreeNode node = stack.pop();
        if (node.right != null) pushLeft(node.right);
        return node.val;
    }
    public boolean hasNext() { return !stack.isEmpty(); }
    private void pushLeft(TreeNode node) {
        while (node != null) { stack.push(node); node = node.left; }
    }
}`,
  },
  199: {
    lc: 199,
    method: "rightSideView",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == sz - 1) res.push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        res, q = [], deque([root])
        while q:
            n = len(q)
            for i in range(n):
                node = q.popleft()
                if i == n - 1: res.append(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
        return res`,
    java: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (i == sz - 1) res.add(node.val);
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return res;
    }
}`,
  },
  208: {
    lc: 208,
    method: "insert",
    time: "O(m)",
    space: "O(m*alphabet)",
    cpp: `class Trie {
    struct Node {
        Node* ch[26] = {};
        bool end = false;
    };
    Node* root;
public:
    Trie() : root(new Node()) {}
    void insert(string word) {
        Node* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (!cur->ch[i]) cur->ch[i] = new Node();
            cur = cur->ch[i];
        }
        cur->end = true;
    }
    bool search(string word) {
        Node* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (!cur->ch[i]) return false;
            cur = cur->ch[i];
        }
        return cur->end;
    }
    bool startsWith(string prefix) {
        Node* cur = root;
        for (char c : prefix) {
            int i = c - 'a';
            if (!cur->ch[i]) return false;
            cur = cur->ch[i];
        }
        return true;
    }
};`,
    python: `class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.setdefault(c, {})
        node['#'] = True

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            if c not in node: return False
            node = node[c]
        return '#' in node

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node: return False
            node = node[c]
        return True`,
    java: `class Trie {
    private Trie[] ch = new Trie[26];
    private boolean isEnd = false;
    public void insert(String word) {
        Trie cur = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) cur.ch[i] = new Trie();
            cur = cur.ch[i];
        }
        cur.isEnd = true;
    }
    public boolean search(String word) {
        Trie cur = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) return false;
            cur = cur.ch[i];
        }
        return cur.isEnd;
    }
    public boolean startsWith(String prefix) {
        Trie cur = this;
        for (char c : prefix.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) return false;
            cur = cur.ch[i];
        }
        return true;
    }
}`,
  },
  211: {
    lc: 211,
    method: "addWord",
    time: "O(m) add / O(m\u00b726^m) search worst",
    space: "O(total chars)",
    cpp: `class WordDictionary {
    struct Node {
        Node* ch[26] = {};
        bool end = false;
    };
    Node* root;
    bool search(const string& w, int i, Node* node) {
        if (!node) return false;
        if (i == (int)w.size()) return node->end;
        char c = w[i];
        if (c != '.') return search(w, i+1, node->ch[c-'a']);
        for (auto child : node->ch)
            if (search(w, i+1, child)) return true;
        return false;
    }
public:
    WordDictionary() : root(new Node()) {}
    void addWord(string word) {
        Node* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (!cur->ch[i]) cur->ch[i] = new Node();
            cur = cur->ch[i];
        }
        cur->end = true;
    }
    bool search(string word) { return search(word, 0, root); }
};`,
    python: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.setdefault(c, {})
        node['#'] = True

    def search(self, word: str) -> bool:
        def dfs(node, i):
            if i == len(word): return '#' in node
            c = word[i]
            if c != '.':
                return c in node and dfs(node[c], i+1)
            return any(dfs(node[k], i+1) for k in node if k != '#')
        return dfs(self.root, 0)`,
    java: `class WordDictionary {
    private WordDictionary[] ch = new WordDictionary[26];
    private boolean isEnd = false;
    public void addWord(String word) {
        WordDictionary cur = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) cur.ch[i] = new WordDictionary();
            cur = cur.ch[i];
        }
        cur.isEnd = true;
    }
    public boolean search(String word) { return search(word, 0); }
    private boolean search(String word, int idx) {
        if (idx == word.length()) return isEnd;
        char c = word.charAt(idx);
        if (c != '.') {
            int i = c - 'a';
            return ch[i] != null && ch[i].search(word, idx+1);
        }
        for (WordDictionary child : ch)
            if (child != null && child.search(word, idx+1)) return true;
        return false;
    }
}`,
  },
  212: {
    lc: 212,
    method: "findWords",
    time: "O(m\u00b7n\u00b74^L)",
    space: "O(total chars)",
    cpp: `class Solution {
    struct TrieNode {
        TrieNode* ch[26] = {};
        string word;
    };
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& res) {
        char ch = board[r][c];
        if (ch == '#' || !node->ch[ch-'a']) return;
        TrieNode* next = node->ch[ch-'a'];
        if (!next->word.empty()) { res.push_back(next->word); next->word = ""; }
        board[r][c] = '#';
        int m = board.size(), n = board[0].size();
        if (r>0)   dfs(board, r-1, c, next, res);
        if (r<m-1) dfs(board, r+1, c, next, res);
        if (c>0)   dfs(board, r, c-1, next, res);
        if (c<n-1) dfs(board, r, c+1, next, res);
        board[r][c] = ch;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) {
            TrieNode* cur = root;
            for (char c : w) {
                int i = c - 'a';
                if (!cur->ch[i]) cur->ch[i] = new TrieNode();
                cur = cur->ch[i];
            }
            cur->word = w;
        }
        int m = board.size(), n = board[0].size();
        vector<string> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dfs(board, i, j, root, res);
        return res;
    }
};`,
    python: `class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        trie = {}
        for w in words:
            node = trie
            for c in w: node = node.setdefault(c, {})
            node['#'] = w
        m, n = len(board), len(board[0])
        res = []
        def dfs(node, i, j):
            c = board[i][j]
            if c not in node: return
            nxt = node[c]
            if '#' in nxt: res.append(nxt.pop('#'))
            board[i][j] = '#'
            for di, dj in ((0,1),(0,-1),(1,0),(-1,0)):
                ni, nj = i+di, j+dj
                if 0<=ni<m and 0<=nj<n and board[ni][nj] != '#':
                    dfs(nxt, ni, nj)
            board[i][j] = c
        for i in range(m):
            for j in range(n): dfs(trie, i, j)
        return res`,
    java: `class Solution {
    char[][] board;
    int m, n;
    public List<String> findWords(char[][] board, String[] words) {
        this.board = board; m = board.length; n = board[0].length;
        Map<Character, Object> root = new HashMap<>();
        for (String w : words) {
            Map<Character, Object> node = root;
            for (char c : w.toCharArray())
                node = (Map<Character,Object>) node.computeIfAbsent(c, k -> new HashMap<>());
            node.put('#', w);
        }
        Set<String> res = new HashSet<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dfs(root, i, j, res);
        return new ArrayList<>(res);
    }
    private void dfs(Map<Character,Object> node, int i, int j, Set<String> res) {
        if (i<0||i>=m||j<0||j>=n||board[i][j]=='#') return;
        char c = board[i][j];
        if (!node.containsKey(c)) return;
        Map<Character,Object> nxt = (Map<Character,Object>) node.get(c);
        if (nxt.containsKey('#')) res.add((String) nxt.get('#'));
        board[i][j] = '#';
        dfs(nxt,i+1,j,res); dfs(nxt,i-1,j,res);
        dfs(nxt,i,j+1,res); dfs(nxt,i,j-1,res);
        board[i][j] = c;
    }
}`,
  },
  222: {
    lc: 222,
    method: "countNodes",
    time: "O(log^2 n)",
    space: "O(log n)",
    cpp: `class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int lh = 0, rh = 0;
        TreeNode *l = root, *r = root;
        while (l) { lh++; l = l->left; }
        while (r) { rh++; r = r->right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};`,
    python: `class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        lh = rh = 0
        l = r = root
        while l: lh += 1; l = l.left
        while r: rh += 1; r = r.right
        if lh == rh:
            return (1 << lh) - 1
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)`,
    java: `class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int lh = 0, rh = 0;
        TreeNode l = root, r = root;
        while (l != null) { lh++; l = l.left; }
        while (r != null) { rh++; r = r.right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
  },
  226: {
    lc: 226,
    method: "invertTree",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,
    python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
    java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}`,
  },
  230: {
    lc: 230,
    method: "kthSmallest",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top(); st.pop();
            if (--k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};`,
    python: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack, curr = [], root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0: return curr.val
            curr = curr.right
        return -1`,
    java: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.pop();
            if (--k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}`,
  },
  235: {
    lc: 235,
    method: "lowestCommonAncestor",
    time: "O(h)",
    space: "O(1)",
    cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) root = root->left;
            else if (p->val > root->val && q->val > root->val) root = root->right;
            else return root;
        }
        return nullptr;
    }
};`,
    python: `class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        while root:
            if p.val < root.val and q.val < root.val:
                root = root.left
            elif p.val > root.val and q.val > root.val:
                root = root.right
            else:
                return root
        return None`,
    java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val)      root = root.left;
            else if (p.val > root.val && q.val > root.val) root = root.right;
            else return root;
        }
        return null;
    }
}`,
  },
  236: {
    lc: 236,
    method: "lowestCommonAncestor",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left  = lowestCommonAncestor(root->left,  p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};`,
    python: `class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root is p or root is q:
            return root
        left  = self.lowestCommonAncestor(root.left,  p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right: return root
        return left or right`,
    java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left  = lowestCommonAncestor(root.left,  p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
  },
  257: {
    lc: 257,
    method: "binaryTreePaths",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> res;
        function<void(TreeNode*, string)> dfs = [&](TreeNode* node, string path) {
            if (!node->left && !node->right) { res.push_back(path); return; }
            if (node->left)  dfs(node->left,  path + "->" + to_string(node->left->val));
            if (node->right) dfs(node->right, path + "->" + to_string(node->right->val));
        };
        if (root) dfs(root, to_string(root->val));
        return res;
    }
};`,
    python: `class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        res = []
        def dfs(node, path):
            if not node.left and not node.right:
                res.append(path); return
            if node.left:  dfs(node.left,  path + '->' + str(node.left.val))
            if node.right: dfs(node.right, path + '->' + str(node.right.val))
        if root: dfs(root, str(root.val))
        return res`,
    java: `class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        if (root != null) dfs(root, String.valueOf(root.val), res);
        return res;
    }
    private void dfs(TreeNode node, String path, List<String> res) {
        if (node.left == null && node.right == null) { res.add(path); return; }
        if (node.left  != null) dfs(node.left,  path + "->" + node.left.val,  res);
        if (node.right != null) dfs(node.right, path + "->" + node.right.val, res);
    }
}`,
  },
  270: {
    lc: 270,
    method: "closestValue",
    time: "O(h)",
    space: "O(1)",
    cpp: `class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        int closest = root->val;
        while (root) {
            if (abs((double)root->val - target) < abs((double)closest - target))
                closest = root->val;
            root = target < root->val ? root->left : root->right;
        }
        return closest;
    }
};`,
    python: `class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        closest = root.val
        while root:
            if abs(root.val - target) < abs(closest - target):
                closest = root.val
            root = root.left if target < root.val else root.right
        return closest`,
    java: `class Solution {
    public int closestValue(TreeNode root, double target) {
        int closest = root.val;
        while (root != null) {
            if (Math.abs(root.val - target) < Math.abs(closest - target))
                closest = root.val;
            root = target < root.val ? root.left : root.right;
        }
        return closest;
    }
}`,
  },
  285: {
    lc: 285,
    method: "inorderSuccessor",
    time: "O(h)",
    space: "O(1)",
    cpp: `class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        TreeNode* res = nullptr;
        while (root) {
            if (p->val < root->val) { res = root; root = root->left; }
            else root = root->right;
        }
        return res;
    }
};`,
    python: `class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        res = None
        while root:
            if p.val < root.val:
                res  = root
                root = root.left
            else:
                root = root.right
        return res`,
    java: `class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode res = null;
        while (root != null) {
            if (p.val < root.val) { res = root; root = root.left; }
            else root = root.right;
        }
        return res;
    }
}`,
  },
  297: {
    lc: 297,
    method: "serialize",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Codec {
    TreeNode* build(queue<string>& q) {
        string val = q.front(); q.pop();
        if (val == "#") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left  = build(q);
        node->right = build(q);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        if (!root) return "#";
        return to_string(root->val) + "," +
               serialize(root->left) + "," +
               serialize(root->right);
    }
    TreeNode* deserialize(string data) {
        queue<string> q;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) q.push(token);
        return build(q);
    }
};`,
    python: `class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        if not root: return '#'
        return f'{root.val},{self.serialize(root.left)},{self.serialize(root.right)}'

    def deserialize(self, data: str) -> Optional[TreeNode]:
        vals = iter(data.split(','))
        def build():
            val = next(vals)
            if val == '#': return None
            node = TreeNode(int(val))
            node.left  = build()
            node.right = build()
            return node
        return build()`,
    java: `public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "#";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }
    public TreeNode deserialize(String data) {
        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));
        return build(q);
    }
    private TreeNode build(Queue<String> q) {
        String val = q.poll();
        if (val.equals("#")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left  = build(q);
        node.right = build(q);
        return node;
    }
}`,
  },
  298: {
    lc: 298,
    method: "longestConsecutive",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = 0;
    void dfs(TreeNode* node, int parentVal, int len) {
        if (!node) return;
        len = (node->val == parentVal + 1) ? len + 1 : 1;
        ans = max(ans, len);
        dfs(node->left,  node->val, len);
        dfs(node->right, node->val, len);
    }
public:
    int longestConsecutive(TreeNode* root) {
        if (!root) return 0;
        dfs(root, root->val - 1, 0);
        return ans;
    }
};`,
    python: `class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node, parent_val, length):
            if not node: return
            length = length + 1 if node.val == parent_val + 1 else 1
            self.ans = max(self.ans, length)
            dfs(node.left,  node.val, length)
            dfs(node.right, node.val, length)
        if root: dfs(root, root.val - 1, 0)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int longestConsecutive(TreeNode root) {
        if (root != null) dfs(root, root.val - 1, 0);
        return ans;
    }
    private void dfs(TreeNode node, int parentVal, int len) {
        if (node == null) return;
        len = (node.val == parentVal + 1) ? len + 1 : 1;
        ans = Math.max(ans, len);
        dfs(node.left,  node.val, len);
        dfs(node.right, node.val, len);
    }
}`,
  },
  314: {
    lc: 314,
    method: "verticalOrder",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        map<int, vector<int>> colMap;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        while (!q.empty()) {
            auto [node, col] = q.front(); q.pop();
            colMap[col].push_back(node->val);
            if (node->left)  q.push({node->left,  col - 1});
            if (node->right) q.push({node->right, col + 1});
        }
        vector<vector<int>> res;
        for (auto& [col, vals] : colMap) res.push_back(vals);
        return res;
    }
};`,
    python: `from collections import defaultdict, deque
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        col_map = defaultdict(list)
        q = deque([(root, 0)])
        while q:
            node, col = q.popleft()
            col_map[col].append(node.val)
            if node.left:  q.append((node.left,  col - 1))
            if node.right: q.append((node.right, col + 1))
        return [col_map[c] for c in sorted(col_map)]`,
    java: `class Solution {
    public List<List<Integer>> verticalOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        TreeMap<Integer, List<Integer>> colMap = new TreeMap<>();
        Queue<int[]> idxQ = new LinkedList<>();
        Queue<TreeNode> nodeQ = new LinkedList<>();
        nodeQ.offer(root); idxQ.offer(new int[]{0});
        while (!nodeQ.isEmpty()) {
            TreeNode node = nodeQ.poll();
            int col = idxQ.poll()[0];
            colMap.computeIfAbsent(col, k -> new ArrayList<>()).add(node.val);
            if (node.left != null)  { nodeQ.offer(node.left);  idxQ.offer(new int[]{col-1}); }
            if (node.right != null) { nodeQ.offer(node.right); idxQ.offer(new int[]{col+1}); }
        }
        return new ArrayList<>(colMap.values());
    }
}`,
  },
  337: {
    lc: 337,
    method: "rob",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto [ll, lr] = dfs(node->left);
        auto [rl, rr] = dfs(node->right);
        int rob    = node->val + ll + rl;
        int no_rob = max(ll, lr) + max(rl, rr);
        return {rob, no_rob};
    }
public:
    int rob(TreeNode* root) {
        auto [a, b] = dfs(root);
        return max(a, b);
    }
};`,
    python: `class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            # returns (rob_this, skip_this)
            if not node: return 0, 0
            ll, lr = dfs(node.left)
            rl, rr = dfs(node.right)
            return node.val + ll + rl, max(ll, lr) + max(rl, rr)
        return max(dfs(root))`,
    java: `class Solution {
    public int rob(TreeNode root) {
        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int rob   = node.val + l[0] + r[0];
        int noRob = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
        return new int[]{rob, noRob};
    }
}`,
  },
  341: {
    lc: 341,
    method: "next",
    time: "O(1) amortized",
    space: "O(n)",
    cpp: `class NestedIterator {
    stack<NestedInteger*> st;
    void push(vector<NestedInteger>& lst) {
        for (int i = lst.size()-1; i >= 0; i--) st.push(&lst[i]);
    }
public:
    NestedIterator(vector<NestedInteger>& nestedList) { push(nestedList); }
    int next() { int v = st.top()->getInteger(); st.pop(); return v; }
    bool hasNext() {
        while (!st.empty() && !st.top()->isInteger()) {
            vector<NestedInteger>& lst = st.top()->getList();
            st.pop();
            for (int i = lst.size()-1; i >= 0; i--) st.push(&lst[i]);
        }
        return !st.empty();
    }
};`,
    python: `class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.stack = []
        self._flatten(nestedList)

    def _flatten(self, lst):
        for item in reversed(lst):
            self.stack.append(item)

    def next(self) -> int:
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        while self.stack:
            if self.stack[-1].isInteger():
                return True
            top = self.stack.pop()
            self._flatten(top.getList())
        return False`,
    java: `public class NestedIterator implements Iterator<Integer> {
    private Deque<NestedInteger> stack = new ArrayDeque<>();
    public NestedIterator(List<NestedInteger> nestedList) {
        for (int i = nestedList.size()-1; i >= 0; i--)
            stack.push(nestedList.get(i));
    }
    @Override
    public Integer next() { return stack.pop().getInteger(); }
    @Override
    public boolean hasNext() {
        while (!stack.isEmpty() && !stack.peek().isInteger()) {
            List<NestedInteger> lst = stack.pop().getList();
            for (int i = lst.size()-1; i >= 0; i--) stack.push(lst.get(i));
        }
        return !stack.isEmpty();
    }
}`,
  },
  427: {
    lc: 427,
    method: "construct",
    time: "O(n^2 log n)",
    space: "O(log n)",
    cpp: `class Solution {
    Node* build(vector<vector<int>>& g, int r, int c, int sz) {
        bool allSame = true;
        int val = g[r][c];
        for (int i = r; i < r+sz && allSame; i++)
            for (int j = c; j < c+sz && allSame; j++)
                if (g[i][j] != val) allSame = false;
        if (allSame) return new Node(val == 1, true);
        int h = sz / 2;
        return new Node(true, false,
            build(g, r,   c,   h),
            build(g, r,   c+h, h),
            build(g, r+h, c,   h),
            build(g, r+h, c+h, h));
    }
public:
    Node* construct(vector<vector<int>>& grid) {
        return build(grid, 0, 0, grid.size());
    }
};`,
    python: `class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def build(r, c, size):
            if size == 1:
                return Node(grid[r][c] == 1, True)
            h = size // 2
            tl = build(r,   c,   h)
            tr = build(r,   c+h, h)
            bl = build(r+h, c,   h)
            br = build(r+h, c+h, h)
            if all(n.isLeaf for n in [tl, tr, bl, br]) and tl.val == tr.val == bl.val == br.val:
                return Node(tl.val, True)
            return Node(True, False, tl, tr, bl, br)
        return build(0, 0, len(grid))`,
    java: `class Solution {
    public Node construct(int[][] grid) { return build(grid, 0, 0, grid.length); }
    private Node build(int[][] g, int r, int c, int sz) {
        boolean allSame = true;
        int val = g[r][c];
        outer: for (int i = r; i < r+sz; i++)
            for (int j = c; j < c+sz; j++)
                if (g[i][j] != val) { allSame = false; break outer; }
        if (allSame) return new Node(val == 1, true);
        int h = sz / 2;
        return new Node(true, false,
            build(g, r,   c,   h),
            build(g, r,   c+h, h),
            build(g, r+h, c,   h),
            build(g, r+h, c+h, h));
    }
}`,
  },
  437: {
    lc: 437,
    method: "pathSum",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_map<long long, int> prefix;
    int target, res = 0;
    void dfs(TreeNode* node, long long curr) {
        if (!node) return;
        curr += node->val;
        res += prefix[curr - target];
        prefix[curr]++;
        dfs(node->left, curr);
        dfs(node->right, curr);
        prefix[curr]--;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        prefix[0] = 1;
        target = targetSum;
        dfs(root, 0);
        return res;
    }
};`,
    python: `from collections import defaultdict
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix = defaultdict(int)
        prefix[0] = 1
        self.res = 0
        def dfs(node, curr):
            if not node: return
            curr += node.val
            self.res += prefix[curr - targetSum]
            prefix[curr] += 1
            dfs(node.left, curr)
            dfs(node.right, curr)
            prefix[curr] -= 1
        dfs(root, 0)
        return self.res`,
    java: `class Solution {
    private Map<Long,Integer> prefix = new HashMap<>();
    private int target, res = 0;
    public int pathSum(TreeNode root, int targetSum) {
        prefix.put(0L, 1);
        target = targetSum;
        dfs(root, 0L);
        return res;
    }
    private void dfs(TreeNode node, long curr) {
        if (node == null) return;
        curr += node.val;
        res += prefix.getOrDefault(curr - target, 0);
        prefix.merge(curr, 1, Integer::sum);
        dfs(node.left, curr);
        dfs(node.right, curr);
        prefix.merge(curr, -1, Integer::sum);
    }
}`,
  },
  449: {
    lc: 449,
    method: "serialize",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Codec {
    TreeNode* build(queue<int>& q, int lo, int hi) {
        if (q.empty() || q.front() < lo || q.front() > hi) return nullptr;
        int val = q.front(); q.pop();
        TreeNode* node = new TreeNode(val);
        node->left  = build(q, lo, val - 1);
        node->right = build(q, val + 1, hi);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        string res = to_string(root->val);
        if (root->left)  res += "," + serialize(root->left);
        if (root->right) res += "," + serialize(root->right);
        return res;
    }
    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        queue<int> q;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) q.push(stoi(token));
        return build(q, INT_MIN, INT_MAX);
    }
};`,
    python: `class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        if not root: return ''
        parts = []
        def pre(node):
            if not node: return
            parts.append(str(node.val))
            pre(node.left); pre(node.right)
        pre(root)
        return ','.join(parts)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data: return None
        vals = iter(map(int, data.split(',')))
        def build(lo, hi):
            v = next(vals, None)
            if v is None or not (lo <= v <= hi): return None
            node = TreeNode(v)
            node.left  = build(lo, v - 1)
            node.right = build(v + 1, hi)
            return node
        # Need to peek; use a queue approach
        from collections import deque
        q = deque(map(int, data.split(',')))
        def build2(lo, hi):
            if not q or not (lo <= q[0] <= hi): return None
            v = q.popleft()
            node = TreeNode(v)
            node.left  = build2(lo, v - 1)
            node.right = build2(v + 1, hi)
            return node
        return build2(float('-inf'), float('inf'))`,
    java: `public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        preorder(root, sb);
        return sb.substring(0, sb.length()-1);
    }
    private void preorder(TreeNode node, StringBuilder sb) {
        if (node == null) return;
        sb.append(node.val).append(',');
        preorder(node.left, sb); preorder(node.right, sb);
    }
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Deque<Integer> q = new ArrayDeque<>();
        for (String s : data.split(",")) q.offer(Integer.parseInt(s));
        return build(q, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    private TreeNode build(Deque<Integer> q, int lo, int hi) {
        if (q.isEmpty() || q.peek() < lo || q.peek() > hi) return null;
        int val = q.poll();
        TreeNode node = new TreeNode(val);
        node.left  = build(q, lo, val-1);
        node.right = build(q, val+1, hi);
        return node;
    }
}`,
  },
  450: {
    lc: 450,
    method: "deleteNode",
    time: "O(h)",
    space: "O(h)",
    cpp: `class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->val)       root->left  = deleteNode(root->left,  key);
        else if (key > root->val)  root->right = deleteNode(root->right, key);
        else {
            if (!root->left)  return root->right;
            if (!root->right) return root->left;
            TreeNode* succ = root->right;
            while (succ->left) succ = succ->left;
            root->val   = succ->val;
            root->right = deleteNode(root->right, succ->val);
        }
        return root;
    }
};`,
    python: `class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root: return None
        if key < root.val:
            root.left  = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.left:  return root.right
            if not root.right: return root.left
            succ = root.right
            while succ.left: succ = succ.left
            root.val   = succ.val
            root.right = self.deleteNode(root.right, succ.val)
        return root`,
    java: `class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val)       root.left  = deleteNode(root.left,  key);
        else if (key > root.val)  root.right = deleteNode(root.right, key);
        else {
            if (root.left == null)  return root.right;
            if (root.right == null) return root.left;
            TreeNode succ = root.right;
            while (succ.left != null) succ = succ.left;
            root.val   = succ.val;
            root.right = deleteNode(root.right, succ.val);
        }
        return root;
    }
}`,
  },
  508: {
    lc: 508,
    method: "findFrequentTreeSum",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_map<int,int> cnt;
    int maxFreq = 0;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int s = node->val + dfs(node->left) + dfs(node->right);
        maxFreq = max(maxFreq, ++cnt[s]);
        return s;
    }
public:
    vector<int> findFrequentTreeSum(TreeNode* root) {
        dfs(root);
        vector<int> res;
        for (auto& [s, c] : cnt)
            if (c == maxFreq) res.push_back(s);
        return res;
    }
};`,
    python: `from collections import Counter
class Solution:
    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:
        counter = Counter()
        def dfs(node):
            if not node: return 0
            s = node.val + dfs(node.left) + dfs(node.right)
            counter[s] += 1
            return s
        dfs(root)
        max_freq = max(counter.values())
        return [s for s, c in counter.items() if c == max_freq]`,
    java: `class Solution {
    private Map<Integer,Integer> cnt = new HashMap<>();
    private int maxFreq = 0;
    public int[] findFrequentTreeSum(TreeNode root) {
        dfs(root);
        List<Integer> res = new ArrayList<>();
        for (Map.Entry<Integer,Integer> e : cnt.entrySet())
            if (e.getValue() == maxFreq) res.add(e.getKey());
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int s = node.val + dfs(node.left) + dfs(node.right);
        int c = cnt.merge(s, 1, Integer::sum);
        maxFreq = Math.max(maxFreq, c);
        return s;
    }
}`,
  },
  513: {
    lc: 513,
    method: "findBottomLeftValue",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int res = root->val;
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == 0) res = node->val;
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        q = deque([root])
        res = root.val
        while q:
            res = q[0].val
            for _ in range(len(q)):
                node = q.popleft()
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
        return res`,
    java: `class Solution {
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int res = root.val;
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (i == 0) res = node.val;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return res;
    }
}`,
  },
  538: {
    lc: 538,
    method: "convertBST",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int total = 0;
    void dfs(TreeNode* node) {
        if (!node) return;
        dfs(node->right);
        total += node->val;
        node->val = total;
        dfs(node->left);
    }
public:
    TreeNode* convertBST(TreeNode* root) {
        dfs(root);
        return root;
    }
};`,
    python: `class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        self.total = 0
        def dfs(node):
            if not node: return
            dfs(node.right)
            self.total += node.val
            node.val = self.total
            dfs(node.left)
        dfs(root)
        return root`,
    java: `class Solution {
    private int total = 0;
    public TreeNode convertBST(TreeNode root) {
        dfs(root);
        return root;
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.right);
        total += node.val;
        node.val = total;
        dfs(node.left);
    }
}`,
  },
  543: {
    lc: 543,
    method: "diameterOfBinaryTree",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = 0;
    int depth(TreeNode* node) {
        if (!node) return 0;
        int l = depth(node->left), r = depth(node->right);
        ans = max(ans, l + r);
        return 1 + max(l, r);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        depth(root);
        return ans;
    }
};`,
    python: `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def depth(node):
            if not node: return 0
            l, r = depth(node.left), depth(node.right)
            self.ans = max(self.ans, l + r)
            return 1 + max(l, r)
        depth(root)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return ans;
    }
    private int depth(TreeNode node) {
        if (node == null) return 0;
        int l = depth(node.left), r = depth(node.right);
        ans = Math.max(ans, l + r);
        return 1 + Math.max(l, r);
    }
}`,
  },
  545: {
    lc: 545,
    method: "boundaryOfBinaryTree",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    bool isLeaf(TreeNode* n) { return !n->left && !n->right; }
    void addLeft(TreeNode* node, vector<int>& res) {
        while (node) {
            if (!isLeaf(node)) res.push_back(node->val);
            node = node->left ? node->left : node->right;
        }
    }
    void addLeaves(TreeNode* node, vector<int>& res) {
        if (!node) return;
        if (isLeaf(node)) { res.push_back(node->val); return; }
        addLeaves(node->left, res);
        addLeaves(node->right, res);
    }
    void addRight(TreeNode* node, vector<int>& res) {
        vector<int> tmp;
        while (node) {
            if (!isLeaf(node)) tmp.push_back(node->val);
            node = node->right ? node->right : node->left;
        }
        for (int i = tmp.size()-1; i >= 0; i--) res.push_back(tmp[i]);
    }
public:
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        if (!root) return {};
        vector<int> res;
        if (!isLeaf(root)) res.push_back(root->val);
        addLeft(root->left, res);
        addLeaves(root, res);
        addRight(root->right, res);
        return res;
    }
};`,
    python: `class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        def is_leaf(n): return not n.left and not n.right
        def add_left(node):
            while node:
                if not is_leaf(node): res.append(node.val)
                node = node.left if node.left else node.right
        def add_leaves(node):
            if not node: return
            if is_leaf(node): res.append(node.val); return
            add_leaves(node.left); add_leaves(node.right)
        def add_right(node):
            tmp = []
            while node:
                if not is_leaf(node): tmp.append(node.val)
                node = node.right if node.right else node.left
            res.extend(reversed(tmp))
        res = []
        if not is_leaf(root): res.append(root.val)
        add_left(root.left)
        add_leaves(root)
        add_right(root.right)
        return res`,
    java: `class Solution {
    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        if (!isLeaf(root)) res.add(root.val);
        addLeft(root.left, res);
        addLeaves(root, res);
        addRight(root.right, res);
        return res;
    }
    private boolean isLeaf(TreeNode n) { return n.left == null && n.right == null; }
    private void addLeft(TreeNode node, List<Integer> res) {
        while (node != null) {
            if (!isLeaf(node)) res.add(node.val);
            node = node.left != null ? node.left : node.right;
        }
    }
    private void addLeaves(TreeNode node, List<Integer> res) {
        if (node == null) return;
        if (isLeaf(node)) { res.add(node.val); return; }
        addLeaves(node.left, res); addLeaves(node.right, res);
    }
    private void addRight(TreeNode node, List<Integer> res) {
        Deque<Integer> tmp = new ArrayDeque<>();
        while (node != null) {
            if (!isLeaf(node)) tmp.push(node.val);
            node = node.right != null ? node.right : node.left;
        }
        while (!tmp.isEmpty()) res.add(tmp.pop());
    }
}`,
  },
  559: {
    lc: 559,
    method: "maxDepth",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    int maxDepth(Node* root) {
        if (!root) return 0;
        int best = 0;
        for (Node* child : root->children)
            best = max(best, maxDepth(child));
        return best + 1;
    }
};`,
    python: `class Solution:
    def maxDepth(self, root: 'Node') -> int:
        if not root: return 0
        return 1 + max((self.maxDepth(c) for c in root.children), default=0)`,
    java: `class Solution {
    public int maxDepth(Node root) {
        if (root == null) return 0;
        int best = 0;
        for (Node child : root.children)
            best = Math.max(best, maxDepth(child));
        return best + 1;
    }
}`,
  },
  572: {
    lc: 572,
    method: "isSubtree",
    time: "O(m*n)",
    space: "O(m+n)",
    cpp: `class Solution {
    bool isSame(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return isSame(a->left, b->left) && isSame(a->right, b->right);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }
};`,
    python: `class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        def same(a, b):
            if not a and not b: return True
            if not a or not b or a.val != b.val: return False
            return same(a.left, b.left) and same(a.right, b.right)
        if not root: return False
        if same(root, subRoot): return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)`,
    java: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    private boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return isSame(a.left, b.left) && isSame(a.right, b.right);
    }
}`,
  },
  617: {
    lc: 617,
    method: "mergeTrees",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    TreeNode* mergeTrees(TreeNode* r1, TreeNode* r2) {
        if (!r1) return r2;
        if (!r2) return r1;
        r1->val  += r2->val;
        r1->left  = mergeTrees(r1->left,  r2->left);
        r1->right = mergeTrees(r1->right, r2->right);
        return r1;
    }
};`,
    python: `class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1: return root2
        if not root2: return root1
        root1.val  += root2.val
        root1.left  = self.mergeTrees(root1.left,  root2.left)
        root1.right = self.mergeTrees(root1.right, root2.right)
        return root1`,
    java: `class Solution {
    public TreeNode mergeTrees(TreeNode r1, TreeNode r2) {
        if (r1 == null) return r2;
        if (r2 == null) return r1;
        r1.val  += r2.val;
        r1.left  = mergeTrees(r1.left,  r2.left);
        r1.right = mergeTrees(r1.right, r2.right);
        return r1;
    }
}`,
  },
  637: {
    lc: 637,
    method: "averageOfLevels",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<double> averageOfLevels(TreeNode* root) {
        vector<double> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            double sum = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                sum += node->val;
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(sum / sz);
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        res, q = [], deque([root])
        while q:
            n = len(q)
            total = 0
            for _ in range(n):
                node = q.popleft()
                total += node.val
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            res.append(total / n)
        return res`,
    java: `class Solution {
    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            double sum = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                sum += node.val;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(sum / sz);
        }
        return res;
    }
}`,
  },
  648: {
    lc: 648,
    method: "replaceWords",
    time: "O(N\u00b7M)",
    space: "O(total chars)",
    cpp: `class Solution {
    struct TrieNode {
        TrieNode* ch[26] = {};
        string word;
    };
    TrieNode* root = new TrieNode();
public:
    string replaceWords(vector<string>& dictionary, string sentence) {
        for (auto& w : dictionary) {
            TrieNode* cur = root;
            for (char c : w) {
                int i = c - 'a';
                if (!cur->ch[i]) cur->ch[i] = new TrieNode();
                cur = cur->ch[i];
                if (!cur->word.empty()) break;
            }
            cur->word = w;
        }
        istringstream iss(sentence);
        string word, res;
        while (iss >> word) {
            if (!res.empty()) res += ' ';
            TrieNode* cur = root;
            for (char c : word) {
                int i = c - 'a';
                if (!cur->ch[i]) break;
                cur = cur->ch[i];
                if (!cur->word.empty()) { word = cur->word; break; }
            }
            res += word;
        }
        return res;
    }
};`,
    python: `class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        root = {}
        for w in dictionary:
            node = root
            for c in w:
                node = node.setdefault(c, {})
                if '#' in node: break
            node['#'] = w
        def replace(word):
            node = root
            for c in word:
                if c not in node: break
                node = node[c]
                if '#' in node: return node['#']
            return word
        return ' '.join(replace(w) for w in sentence.split())`,
    java: `class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        Map<String,Object> trie = new HashMap<>();
        for (String w : dictionary) {
            Map<String,Object> node = trie;
            for (char c : w.toCharArray()) {
                node = (Map<String,Object>) node.computeIfAbsent(String.valueOf(c), k -> new HashMap<>());
                if (node.containsKey("#")) break;
            }
            node.put("#", w);
        }
        StringBuilder res = new StringBuilder();
        for (String word : sentence.split(" ")) {
            if (res.length() > 0) res.append(' ');
            Map<String,Object> node = trie;
            String found = word;
            for (char c : word.toCharArray()) {
                String key = String.valueOf(c);
                if (!node.containsKey(key)) break;
                node = (Map<String,Object>) node.get(key);
                if (node.containsKey("#")) { found = (String) node.get("#"); break; }
            }
            res.append(found);
        }
        return res.toString();
    }
}`,
  },
  662: {
    lc: 662,
    method: "widthOfBinaryTree",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int res = 1;
        queue<pair<TreeNode*, unsigned long long>> q;
        q.push({root, 0ULL});
        while (!q.empty()) {
            int sz = q.size();
            unsigned long long start = q.front().second;
            unsigned long long end   = start;
            for (int i = 0; i < sz; i++) {
                auto [node, idx] = q.front(); q.pop();
                unsigned long long norm = idx - start;
                end = norm;
                if (node->left)  q.push({node->left,  2 * norm});
                if (node->right) q.push({node->right, 2 * norm + 1});
            }
            res = max(res, (int)(end + 1));
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        res, q = 1, deque([(root, 0)])
        while q:
            n = len(q)
            start = q[0][1]
            end = start
            for _ in range(n):
                node, idx = q.popleft()
                norm = idx - start
                end = norm
                if node.left:  q.append((node.left,  2 * norm))
                if node.right: q.append((node.right, 2 * norm + 1))
            res = max(res, end + 1)
        return res`,
    java: `class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int res = 1;
        Queue<long[]> idxQ = new LinkedList<>();
        Queue<TreeNode> nodeQ = new LinkedList<>();
        nodeQ.offer(root); idxQ.offer(new long[]{0});
        while (!nodeQ.isEmpty()) {
            int sz = nodeQ.size();
            long start = idxQ.peek()[0], end = start;
            for (int i = 0; i < sz; i++) {
                TreeNode node = nodeQ.poll();
                long norm = idxQ.poll()[0] - start;
                end = norm;
                if (node.left  != null) { nodeQ.offer(node.left);  idxQ.offer(new long[]{2*norm}); }
                if (node.right != null) { nodeQ.offer(node.right); idxQ.offer(new long[]{2*norm+1}); }
            }
            res = (int) Math.max(res, end + 1);
        }
        return res;
    }
}`,
  },
  676: {
    lc: 676,
    method: "search",
    time: "O(N) build / O(m) search",
    space: "O(total chars)",
    cpp: `class MagicDictionary {
    vector<string> words;
public:
    void buildDict(vector<string> dictionary) { words = dictionary; }
    bool search(string searchWord) {
        for (auto& w : words) {
            if (w.size() != searchWord.size()) continue;
            int diff = 0;
            for (int i = 0; i < (int)w.size(); i++)
                if (w[i] != searchWord[i]) diff++;
            if (diff == 1) return true;
        }
        return false;
    }
};`,
    python: `class MagicDictionary:
    def __init__(self):
        self.words = []

    def buildDict(self, dictionary: List[str]) -> None:
        self.words = dictionary

    def search(self, searchWord: str) -> bool:
        for word in self.words:
            if len(word) != len(searchWord): continue
            if sum(a != b for a, b in zip(word, searchWord)) == 1:
                return True
        return False`,
    java: `class MagicDictionary {
    private String[] words;
    public void buildDict(String[] dictionary) { words = dictionary; }
    public boolean search(String searchWord) {
        for (String w : words) {
            if (w.length() != searchWord.length()) continue;
            int diff = 0;
            for (int i = 0; i < w.length(); i++)
                if (w.charAt(i) != searchWord.charAt(i)) diff++;
            if (diff == 1) return true;
        }
        return false;
    }
}`,
  },
  687: {
    lc: 687,
    method: "longestUnivaluePath",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = 0;
    int dfs(TreeNode* node, int parentVal) {
        if (!node) return 0;
        int l = dfs(node->left,  node->val);
        int r = dfs(node->right, node->val);
        ans = max(ans, l + r);
        return node->val == parentVal ? max(l, r) + 1 : 0;
    }
public:
    int longestUnivaluePath(TreeNode* root) {
        dfs(root, -1);
        return ans;
    }
};`,
    python: `class Solution:
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node, parent_val):
            if not node: return 0
            l = dfs(node.left,  node.val)
            r = dfs(node.right, node.val)
            self.ans = max(self.ans, l + r)
            return max(l, r) + 1 if node.val == parent_val else 0
        dfs(root, None)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int longestUnivaluePath(TreeNode root) {
        dfs(root, -1001);
        return ans;
    }
    private int dfs(TreeNode node, int parentVal) {
        if (node == null) return 0;
        int l = dfs(node.left,  node.val);
        int r = dfs(node.right, node.val);
        ans = Math.max(ans, l + r);
        return node.val == parentVal ? Math.max(l, r) + 1 : 0;
    }
}`,
  },
  700: {
    lc: 700,
    method: "searchBST",
    time: "O(h)",
    space: "O(1)",
    cpp: `class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root) {
            if (val == root->val) return root;
            root = val < root->val ? root->left : root->right;
        }
        return nullptr;
    }
};`,
    python: `class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        while root:
            if val == root.val: return root
            root = root.left if val < root.val else root.right
        return None`,
    java: `class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        while (root != null) {
            if (val == root.val) return root;
            root = val < root.val ? root.left : root.right;
        }
        return null;
    }
}`,
  },
  834: {
    lc: 834,
    method: "sumOfDistancesInTree",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    vector<vector<int>> graph;
    vector<int> cnt, ans;
    int n;
    void dfs1(int node, int par) {
        for (int child : graph[node]) {
            if (child == par) continue;
            dfs1(child, node);
            cnt[node] += cnt[child];
            ans[node] += ans[child] + cnt[child];
        }
    }
    void dfs2(int node, int par) {
        for (int child : graph[node]) {
            if (child == par) continue;
            ans[child] = ans[node] - cnt[child] + (n - cnt[child]);
            dfs2(child, node);
        }
    }
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        this->n = n;
        graph.resize(n);
        cnt.assign(n, 1);
        ans.assign(n, 0);
        for (auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }
};`,
    python: `from collections import defaultdict
class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v); graph[v].append(u)
        cnt = [1] * n
        ans = [0] * n
        def dfs1(node, par):
            for child in graph[node]:
                if child == par: continue
                dfs1(child, node)
                cnt[node] += cnt[child]
                ans[node] += ans[child] + cnt[child]
        def dfs2(node, par):
            for child in graph[node]:
                if child == par: continue
                ans[child] = ans[node] - cnt[child] + (n - cnt[child])
                dfs2(child, node)
        dfs1(0, -1)
        dfs2(0, -1)
        return ans`,
    java: `class Solution {
    private List<List<Integer>> graph;
    private int[] cnt, ans;
    private int n;
    public int[] sumOfDistancesInTree(int n, int[][] edges) {
        this.n = n;
        graph = new ArrayList<>();
        cnt = new int[n]; ans = new int[n];
        Arrays.fill(cnt, 1);
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (int[] e : edges) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }
    private void dfs1(int node, int par) {
        for (int child : graph.get(node)) {
            if (child == par) continue;
            dfs1(child, node);
            cnt[node] += cnt[child];
            ans[node] += ans[child] + cnt[child];
        }
    }
    private void dfs2(int node, int par) {
        for (int child : graph.get(node)) {
            if (child == par) continue;
            ans[child] = ans[node] - cnt[child] + (n - cnt[child]);
            dfs2(child, node);
        }
    }
}`,
  },
  863: {
    lc: 863,
    method: "distanceK",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_map<int, vector<int>> graph;
    void buildGraph(TreeNode* node, int par) {
        if (!node) return;
        if (par != -1) {
            graph[node->val].push_back(par);
            graph[par].push_back(node->val);
        }
        buildGraph(node->left,  node->val);
        buildGraph(node->right, node->val);
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        buildGraph(root, -1);
        unordered_set<int> visited;
        queue<int> q;
        q.push(target->val); visited.insert(target->val);
        for (int dist = 0; !q.empty(); dist++) {
            if (dist == k) {
                vector<int> res;
                while (!q.empty()) { res.push_back(q.front()); q.pop(); }
                return res;
            }
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.front(); q.pop();
                for (int nb : graph[curr]) {
                    if (!visited.count(nb)) { visited.insert(nb); q.push(nb); }
                }
            }
        }
        return {};
    }
};`,
    python: `from collections import defaultdict, deque
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:
        graph = defaultdict(list)
        def build(node, par):
            if not node: return
            if par is not None:
                graph[node.val].append(par.val)
                graph[par.val].append(node.val)
            build(node.left, node); build(node.right, node)
        build(root, None)
        visited, q = {target.val}, deque([target.val])
        dist = 0
        while q:
            if dist == k: return list(q)
            for _ in range(len(q)):
                curr = q.popleft()
                for nb in graph[curr]:
                    if nb not in visited:
                        visited.add(nb); q.append(nb)
            dist += 1
        return []`,
    java: `class Solution {
    private Map<Integer, List<Integer>> graph = new HashMap<>();
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        buildGraph(root, -1);
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        q.offer(target.val); visited.add(target.val);
        int dist = 0;
        while (!q.isEmpty()) {
            if (dist == k) return new ArrayList<>(q);
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.poll();
                for (int nb : graph.getOrDefault(curr, new ArrayList<>())) {
                    if (!visited.contains(nb)) { visited.add(nb); q.offer(nb); }
                }
            }
            dist++;
        }
        return new ArrayList<>();
    }
    private void buildGraph(TreeNode node, int par) {
        if (node == null) return;
        if (par != -1) {
            graph.computeIfAbsent(node.val, k -> new ArrayList<>()).add(par);
            graph.computeIfAbsent(par, k -> new ArrayList<>()).add(node.val);
        }
        buildGraph(node.left, node.val); buildGraph(node.right, node.val);
    }
}`,
  },
  968: {
    lc: 968,
    method: "minCameraCover",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    // 0=not covered, 1=has camera, 2=covered (no camera)
    int cameras = 0;
    int dfs(TreeNode* node) {
        if (!node) return 2;
        int l = dfs(node->left), r = dfs(node->right);
        if (l == 0 || r == 0) { cameras++; return 1; }
        if (l == 1 || r == 1) return 2;
        return 0;
    }
public:
    int minCameraCover(TreeNode* root) {
        if (dfs(root) == 0) cameras++;
        return cameras;
    }
};`,
    python: `class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        self.cameras = 0
        NOT_COVERED, HAS_CAMERA, COVERED = 0, 1, 2
        def dfs(node):
            if not node: return COVERED
            l, r = dfs(node.left), dfs(node.right)
            if l == NOT_COVERED or r == NOT_COVERED:
                self.cameras += 1; return HAS_CAMERA
            if l == HAS_CAMERA or r == HAS_CAMERA: return COVERED
            return NOT_COVERED
        if dfs(root) == NOT_COVERED: self.cameras += 1
        return self.cameras`,
    java: `class Solution {
    private static final int NOT_COVERED=0, HAS_CAMERA=1, COVERED=2;
    private int cameras = 0;
    public int minCameraCover(TreeNode root) {
        if (dfs(root) == NOT_COVERED) cameras++;
        return cameras;
    }
    private int dfs(TreeNode node) {
        if (node == null) return COVERED;
        int l = dfs(node.left), r = dfs(node.right);
        if (l == NOT_COVERED || r == NOT_COVERED) { cameras++; return HAS_CAMERA; }
        if (l == HAS_CAMERA || r == HAS_CAMERA) return COVERED;
        return NOT_COVERED;
    }
}`,
  },
  979: {
    lc: 979,
    method: "distributeCoins",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = 0;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int excess = node->coins + dfs(node->left) + dfs(node->right) - 1;
        ans += abs(excess);
        return excess;
    }
public:
    int distributeCoins(TreeNode* root) {
        dfs(root);
        return ans;
    }
};`,
    python: `class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node: return 0
            excess = node.coins + dfs(node.left) + dfs(node.right) - 1
            self.ans += abs(excess)
            return excess
        dfs(root)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int distributeCoins(TreeNode root) {
        dfs(root);
        return ans;
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int excess = node.val + dfs(node.left) + dfs(node.right) - 1;
        ans += Math.abs(excess);
        return excess;
    }
}`,
  },
  987: {
    lc: 987,
    method: "verticalTraversal",
    time: "O(n log n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        vector<tuple<int,int,int>> nodes;
        function<void(TreeNode*,int,int)> dfs = [&](TreeNode* node, int row, int col) {
            if (!node) return;
            nodes.emplace_back(col, row, node->val);
            dfs(node->left,  row+1, col-1);
            dfs(node->right, row+1, col+1);
        };
        dfs(root, 0, 0);
        sort(nodes.begin(), nodes.end());
        vector<vector<int>> res;
        int prevCol = INT_MIN;
        for (auto& [col, row, val] : nodes) {
            if (col != prevCol) { res.push_back({}); prevCol = col; }
            res.back().push_back(val);
        }
        return res;
    }
};`,
    python: `class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        nodes = []
        def dfs(node, row, col):
            if not node: return
            nodes.append((col, row, node.val))
            dfs(node.left,  row+1, col-1)
            dfs(node.right, row+1, col+1)
        dfs(root, 0, 0)
        nodes.sort()
        res, prev_col = [], None
        for col, row, val in nodes:
            if col != prev_col:
                res.append([])
                prev_col = col
            res[-1].append(val)
        return res`,
    java: `class Solution {
    private List<int[]> nodes = new ArrayList<>();
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        dfs(root, 0, 0);
        nodes.sort((a,b) -> a[0]!=b[0] ? a[0]-b[0] : a[1]!=b[1] ? a[1]-b[1] : a[2]-b[2]);
        List<List<Integer>> res = new ArrayList<>();
        int prevCol = Integer.MIN_VALUE;
        for (int[] n : nodes) {
            if (n[0] != prevCol) { res.add(new ArrayList<>()); prevCol = n[0]; }
            res.get(res.size()-1).add(n[2]);
        }
        return res;
    }
    private void dfs(TreeNode node, int row, int col) {
        if (node == null) return;
        nodes.add(new int[]{col, row, node.val});
        dfs(node.left,  row+1, col-1);
        dfs(node.right, row+1, col+1);
    }
}`,
  },
  993: {
    lc: 993,
    method: "isCousins",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    bool isCousins(TreeNode* root, int x, int y) {
        int xDepth, yDepth; TreeNode *xPar = nullptr, *yPar = nullptr;
        function<void(TreeNode*, TreeNode*, int)> dfs = [&](TreeNode* node, TreeNode* par, int d) {
            if (!node) return;
            if (node->val == x) { xDepth = d; xPar = par; }
            if (node->val == y) { yDepth = d; yPar = par; }
            dfs(node->left, node, d+1);
            dfs(node->right, node, d+1);
        };
        dfs(root, nullptr, 0);
        return xDepth == yDepth && xPar != yPar;
    }
};`,
    python: `class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        info = {}
        def dfs(node, parent, depth):
            if not node: return
            if node.val in (x, y):
                info[node.val] = (parent, depth)
            dfs(node.left,  node, depth + 1)
            dfs(node.right, node, depth + 1)
        dfs(root, None, 0)
        return info[x][1] == info[y][1] and info[x][0] is not info[y][0]`,
    java: `class Solution {
    private int xDepth, yDepth;
    private TreeNode xPar, yPar;
    public boolean isCousins(TreeNode root, int x, int y) {
        dfs(root, null, 0, x, y);
        return xDepth == yDepth && xPar != yPar;
    }
    private void dfs(TreeNode node, TreeNode par, int d, int x, int y) {
        if (node == null) return;
        if (node.val == x) { xDepth = d; xPar = par; }
        if (node.val == y) { yDepth = d; yPar = par; }
        dfs(node.left,  node, d+1, x, y);
        dfs(node.right, node, d+1, x, y);
    }
}`,
  },
  1008: {
    lc: 1008,
    method: "bstFromPreorder",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    int i = 0;
    TreeNode* build(vector<int>& pre, int lo, int hi) {
        if (i == (int)pre.size() || pre[i] < lo || pre[i] > hi) return nullptr;
        TreeNode* node = new TreeNode(pre[i++]);
        node->left  = build(pre, lo, node->val - 1);
        node->right = build(pre, node->val + 1, hi);
        return node;
    }
public:
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        return build(preorder, INT_MIN, INT_MAX);
    }
};`,
    python: `class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        self.i = 0
        def build(lo, hi):
            if self.i == len(preorder) or not (lo <= preorder[self.i] <= hi):
                return None
            val = preorder[self.i]; self.i += 1
            node = TreeNode(val)
            node.left  = build(lo, val - 1)
            node.right = build(val + 1, hi)
            return node
        return build(float('-inf'), float('inf'))`,
    java: `class Solution {
    private int i = 0;
    public TreeNode bstFromPreorder(int[] preorder) {
        return build(preorder, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    private TreeNode build(int[] pre, int lo, int hi) {
        if (i == pre.length || pre[i] < lo || pre[i] > hi) return null;
        TreeNode node = new TreeNode(pre[i++]);
        node.left  = build(pre, lo, node.val - 1);
        node.right = build(pre, node.val + 1, hi);
        return node;
    }
}`,
  },
  1110: {
    lc: 1110,
    method: "delNodes",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_set<int> del;
    vector<TreeNode*> res;
    TreeNode* dfs(TreeNode* node, bool isRoot) {
        if (!node) return nullptr;
        bool deleted = del.count(node->val);
        if (isRoot && !deleted) res.push_back(node);
        node->left  = dfs(node->left,  deleted);
        node->right = dfs(node->right, deleted);
        return deleted ? nullptr : node;
    }
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        del = unordered_set<int>(to_delete.begin(), to_delete.end());
        dfs(root, true);
        return res;
    }
};`,
    python: `class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[Optional[TreeNode]]:
        to_del = set(to_delete)
        res = []
        def dfs(node, is_root):
            if not node: return None
            deleted = node.val in to_del
            if is_root and not deleted: res.append(node)
            node.left  = dfs(node.left,  deleted)
            node.right = dfs(node.right, deleted)
            return None if deleted else node
        dfs(root, True)
        return res`,
    java: `class Solution {
    private Set<Integer> del;
    private List<TreeNode> res = new ArrayList<>();
    public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
        del = new HashSet<>();
        for (int v : to_delete) del.add(v);
        dfs(root, true);
        return res;
    }
    private TreeNode dfs(TreeNode node, boolean isRoot) {
        if (node == null) return null;
        boolean deleted = del.contains(node.val);
        if (isRoot && !deleted) res.add(node);
        node.left  = dfs(node.left,  deleted);
        node.right = dfs(node.right, deleted);
        return deleted ? null : node;
    }
}`,
  },
  1302: {
    lc: 1302,
    method: "deepestLeavesSum",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    int deepestLeavesSum(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int res = 0;
        while (!q.empty()) {
            res = 0;
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode* node = q.front(); q.pop();
                res += node->val;
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,
    python: `from collections import deque
class Solution:
    def deepestLeavesSum(self, root: Optional[TreeNode]) -> int:
        q = deque([root])
        while q:
            level_sum = 0
            for _ in range(len(q)):
                node = q.popleft()
                level_sum += node.val
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
        return level_sum`,
    java: `class Solution {
    public int deepestLeavesSum(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int res = 0;
        while (!q.isEmpty()) {
            res = 0;
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode node = q.poll();
                res += node.val;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return res;
    }
}`,
  },
  1372: {
    lc: 1372,
    method: "longestZigZag",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = 0;
    // l = zigzag len if we arrived going left, r = if going right
    void dfs(TreeNode* node, int l, int r) {
        ans = max(ans, max(l, r));
        if (node->left)  dfs(node->left,  r + 1, 0);
        if (node->right) dfs(node->right, 0, l + 1);
    }
public:
    int longestZigZag(TreeNode* root) {
        dfs(root, 0, 0);
        return ans;
    }
};`,
    python: `class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node, l, r):
            self.ans = max(self.ans, l, r)
            if node.left:  dfs(node.left,  r + 1, 0)
            if node.right: dfs(node.right, 0, l + 1)
        dfs(root, 0, 0)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int longestZigZag(TreeNode root) {
        dfs(root, 0, 0);
        return ans;
    }
    private void dfs(TreeNode node, int l, int r) {
        ans = Math.max(ans, Math.max(l, r));
        if (node.left  != null) dfs(node.left,  r + 1, 0);
        if (node.right != null) dfs(node.right, 0, l + 1);
    }
}`,
  },
  1373: {
    lc: 1373,
    method: "maxSumBST",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int ans = 0;
    // returns {isBST, minVal, maxVal, sum}
    tuple<bool,int,int,int> dfs(TreeNode* node) {
        if (!node) return {true, INT_MAX, INT_MIN, 0};
        auto [lb, lmin, lmax, lsum] = dfs(node->left);
        auto [rb, rmin, rmax, rsum] = dfs(node->right);
        if (lb && rb && lmax < node->val && node->val < rmin) {
            int total = lsum + rsum + node->val;
            ans = max(ans, total);
            return {true, min(lmin, node->val), max(rmax, node->val), total};
        }
        return {false, 0, 0, 0};
    }
public:
    int maxSumBST(TreeNode* root) {
        dfs(root);
        return ans;
    }
};`,
    python: `class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node:
                return True, float('inf'), float('-inf'), 0
            lb, lmin, lmax, lsum = dfs(node.left)
            rb, rmin, rmax, rsum = dfs(node.right)
            if lb and rb and lmax < node.val < rmin:
                total = lsum + rsum + node.val
                self.ans = max(self.ans, total)
                return True, min(lmin, node.val), max(rmax, node.val), total
            return False, 0, 0, 0
        dfs(root)
        return self.ans`,
    java: `class Solution {
    private int ans = 0;
    public int maxSumBST(TreeNode root) {
        dfs(root);
        return ans;
    }
    // returns int[]{isBST(1/0), min, max, sum}
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{1, Integer.MAX_VALUE, Integer.MIN_VALUE, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        if (l[0]==1 && r[0]==1 && l[2] < node.val && node.val < r[1]) {
            int total = l[3] + r[3] + node.val;
            ans = Math.max(ans, total);
            return new int[]{1, Math.min(l[1], node.val), Math.max(r[2], node.val), total};
        }
        return new int[]{0, 0, 0, 0};
    }
}`,
  },
  1448: {
    lc: 1448,
    method: "goodNodes",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
public:
    int goodNodes(TreeNode* root) {
        function<int(TreeNode*, int)> dfs = [&](TreeNode* node, int maxSoFar) -> int {
            if (!node) return 0;
            int good = node->val >= maxSoFar ? 1 : 0;
            maxSoFar = max(maxSoFar, node->val);
            return good + dfs(node->left, maxSoFar) + dfs(node->right, maxSoFar);
        };
        return dfs(root, INT_MIN);
    }
};`,
    python: `class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        def dfs(node, max_so_far):
            if not node: return 0
            good = 1 if node.val >= max_so_far else 0
            max_so_far = max(max_so_far, node.val)
            return good + dfs(node.left, max_so_far) + dfs(node.right, max_so_far)
        return dfs(root, float('-inf'))`,
    java: `class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root, Integer.MIN_VALUE);
    }
    private int dfs(TreeNode node, int maxSoFar) {
        if (node == null) return 0;
        int good = node.val >= maxSoFar ? 1 : 0;
        maxSoFar = Math.max(maxSoFar, node.val);
        return good + dfs(node.left, maxSoFar) + dfs(node.right, maxSoFar);
    }
}`,
  },
  2003: {
    lc: 2003,
    method: "smallestMissingValueSubtree",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
public:
    vector<int> smallestMissingValueSubtree(vector<int>& parents, vector<int>& nums) {
        int n = parents.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) children[parents[i]].push_back(i);
        vector<int> ans(n, 1);
        int nodeWith1 = -1;
        for (int i = 0; i < n; i++) if (nums[i] == 1) { nodeWith1 = i; break; }
        if (nodeWith1 == -1) return ans;
        unordered_set<int> visited, vals;
        int mex = 1;
        int cur = nodeWith1;
        while (cur != -1) {
            stack<int> st;
            st.push(cur);
            while (!st.empty()) {
                int v = st.top(); st.pop();
                if (visited.count(v)) continue;
                visited.insert(v);
                vals.insert(nums[v]);
                for (int child : children[v])
                    if (!visited.count(child)) st.push(child);
            }
            while (vals.count(mex)) mex++;
            ans[cur] = mex;
            cur = cur == 0 ? -1 : parents[cur];
        }
        return ans;
    }
};`,
    python: `from collections import defaultdict
class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(parents)
        children = defaultdict(list)
        for i in range(1, n):
            children[parents[i]].append(i)
        ans = [1] * n
        node_with_1 = next((i for i in range(n) if nums[i] == 1), -1)
        if node_with_1 == -1: return ans
        visited, vals, mex = set(), set(), 1
        cur = node_with_1
        while cur != -1:
            stack = [cur]
            while stack:
                v = stack.pop()
                if v in visited: continue
                visited.add(v)
                vals.add(nums[v])
                for child in children[v]:
                    if child not in visited: stack.append(child)
            while mex in vals: mex += 1
            ans[cur] = mex
            cur = parents[cur] if cur != 0 else -1
        return ans`,
    java: `class Solution {
    public int[] smallestMissingValueSubtree(int[] parents, int[] nums) {
        int n = parents.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parents[i]).add(i);
        int[] ans = new int[n];
        Arrays.fill(ans, 1);
        int nodeWith1 = -1;
        for (int i = 0; i < n; i++) if (nums[i] == 1) { nodeWith1 = i; break; }
        if (nodeWith1 == -1) return ans;
        Set<Integer> visited = new HashSet<>(), vals = new HashSet<>();
        int mex = 1, cur = nodeWith1;
        while (cur != -1) {
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(cur);
            while (!stack.isEmpty()) {
                int v = stack.pop();
                if (visited.contains(v)) continue;
                visited.add(v); vals.add(nums[v]);
                for (int child : children.get(v))
                    if (!visited.contains(child)) stack.push(child);
            }
            while (vals.contains(mex)) mex++;
            ans[cur] = mex;
            cur = cur == 0 ? -1 : parents[cur];
        }
        return ans;
    }
}`,
  },
  2096: {
    lc: 2096,
    method: "getDirections",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    bool find(TreeNode* node, int target, string& path) {
        if (!node) return false;
        if (node->val == target) return true;
        path += 'L';
        if (find(node->left, target, path)) return true;
        path.pop_back();
        path += 'R';
        if (find(node->right, target, path)) return true;
        path.pop_back();
        return false;
    }
public:
    string getDirections(TreeNode* root, int startValue, int destValue) {
        string sp, dp;
        find(root, startValue, sp);
        find(root, destValue, dp);
        int i = 0;
        while (i < (int)sp.size() && i < (int)dp.size() && sp[i] == dp[i]) i++;
        return string(sp.size() - i, 'U') + dp.substr(i);
    }
};`,
    python: `class Solution:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        def find(node, target, path):
            if not node: return False
            if node.val == target: return True
            path.append('L')
            if find(node.left, target, path): return True
            path.pop()
            path.append('R')
            if find(node.right, target, path): return True
            path.pop()
            return False
        sp, dp = [], []
        find(root, startValue, sp)
        find(root, destValue, dp)
        i = 0
        while i < len(sp) and i < len(dp) and sp[i] == dp[i]:
            i += 1
        return 'U' * (len(sp) - i) + ''.join(dp[i:])`,
    java: `class Solution {
    public String getDirections(TreeNode root, int startValue, int destValue) {
        StringBuilder sp = new StringBuilder(), dp = new StringBuilder();
        find(root, startValue, sp);
        find(root, destValue, dp);
        int i = 0;
        while (i < sp.length() && i < dp.length() && sp.charAt(i) == dp.charAt(i)) i++;
        return "U".repeat(sp.length() - i) + dp.substring(i);
    }
    private boolean find(TreeNode node, int target, StringBuilder path) {
        if (node == null) return false;
        if (node.val == target) return true;
        path.append('L');
        if (find(node.left, target, path)) return true;
        path.deleteCharAt(path.length()-1);
        path.append('R');
        if (find(node.right, target, path)) return true;
        path.deleteCharAt(path.length()-1);
        return false;
    }
}`,
  },
  2246: {
    lc: 2246,
    method: "longestPath",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    vector<vector<int>> children;
    string s;
    int ans = 1;
    int dfs(int node) {
        int top1 = 0, top2 = 0;
        for (int child : children[node]) {
            int len = dfs(child);
            if (s[child] != s[node]) {
                if (len > top1) { top2 = top1; top1 = len; }
                else if (len > top2) { top2 = len; }
            }
        }
        ans = max(ans, top1 + top2 + 1);
        return top1 + 1;
    }
public:
    int longestPath(vector<int>& parent, string s) {
        int n = parent.size();
        this->s = s;
        children.resize(n);
        for (int i = 1; i < n; i++) children[parent[i]].push_back(i);
        dfs(0);
        return ans;
    }
};`,
    python: `from collections import defaultdict
class Solution:
    def longestPath(self, parent: List[int], s: str) -> int:
        n = len(parent)
        children = defaultdict(list)
        for i in range(1, n):
            children[parent[i]].append(i)
        ans = 1
        def dfs(node):
            nonlocal ans
            top1 = top2 = 0
            for child in children[node]:
                length = dfs(child)
                if s[child] != s[node]:
                    if length > top1: top2 = top1; top1 = length
                    elif length > top2: top2 = length
            ans = max(ans, top1 + top2 + 1)
            return top1 + 1
        dfs(0)
        return ans`,
    java: `class Solution {
    private List<List<Integer>> children;
    private String s;
    private int ans = 1;
    public int longestPath(int[] parent, String s) {
        this.s = s;
        int n = parent.length;
        children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parent[i]).add(i);
        dfs(0);
        return ans;
    }
    private int dfs(int node) {
        int top1 = 0, top2 = 0;
        for (int child : children.get(node)) {
            int len = dfs(child);
            if (s.charAt(child) != s.charAt(node)) {
                if (len > top1) { top2 = top1; top1 = len; }
                else if (len > top2) { top2 = len; }
            }
        }
        ans = Math.max(ans, top1 + top2 + 1);
        return top1 + 1;
    }
}`,
  },
  2265: {
    lc: 2265,
    method: "averageOfSubtree",
    time: "O(n)",
    space: "O(h)",
    cpp: `class Solution {
    int res = 0;
    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto [ls, lc] = dfs(node->left);
        auto [rs, rc] = dfs(node->right);
        int s = ls + rs + node->val, c = lc + rc + 1;
        if (s / c == node->val) res++;
        return {s, c};
    }
public:
    int averageOfSubtree(TreeNode* root) { dfs(root); return res; }
};`,
    python: `class Solution:
    def averageOfSubtree(self, root: Optional[TreeNode]) -> int:
        self.res = 0
        def dfs(node):
            if not node: return 0, 0
            ls, lc = dfs(node.left)
            rs, rc = dfs(node.right)
            s, c = ls + rs + node.val, lc + rc + 1
            if s // c == node.val: self.res += 1
            return s, c
        dfs(root)
        return self.res`,
    java: `class Solution {
    private int res = 0;
    public int averageOfSubtree(TreeNode root) { dfs(root); return res; }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int s = l[0] + r[0] + node.val, c = l[1] + r[1] + 1;
        if (s / c == node.val) res++;
        return new int[]{s, c};
    }
}`,
  },
  2385: {
    lc: 2385,
    method: "amountOfTime",
    time: "O(n)",
    space: "O(n)",
    cpp: `class Solution {
    unordered_map<int, vector<int>> graph;
    void buildGraph(TreeNode* node, int par) {
        if (!node) return;
        if (par != -1) {
            graph[node->val].push_back(par);
            graph[par].push_back(node->val);
        }
        buildGraph(node->left,  node->val);
        buildGraph(node->right, node->val);
    }
public:
    int amountOfTime(TreeNode* root, int start) {
        buildGraph(root, -1);
        unordered_set<int> visited;
        queue<int> q;
        q.push(start); visited.insert(start);
        int minutes = -1;
        while (!q.empty()) {
            minutes++;
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.front(); q.pop();
                for (int nb : graph[curr]) {
                    if (!visited.count(nb)) {
                        visited.insert(nb); q.push(nb);
                    }
                }
            }
        }
        return minutes;
    }
};`,
    python: `from collections import defaultdict, deque
class Solution:
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        graph = defaultdict(list)
        def build(node, par):
            if not node: return
            if par is not None:
                graph[node.val].append(par)
                graph[par].append(node.val)
            build(node.left,  node.val)
            build(node.right, node.val)
        build(root, None)
        visited, q, minutes = {start}, deque([start]), -1
        while q:
            minutes += 1
            for _ in range(len(q)):
                curr = q.popleft()
                for nb in graph[curr]:
                    if nb not in visited:
                        visited.add(nb); q.append(nb)
        return minutes`,
    java: `class Solution {
    private Map<Integer, List<Integer>> graph = new HashMap<>();
    public int amountOfTime(TreeNode root, int start) {
        buildGraph(root, -1);
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        q.offer(start); visited.add(start);
        int minutes = -1;
        while (!q.isEmpty()) {
            minutes++;
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.poll();
                for (int nb : graph.getOrDefault(curr, new ArrayList<>())) {
                    if (!visited.contains(nb)) { visited.add(nb); q.offer(nb); }
                }
            }
        }
        return minutes;
    }
    private void buildGraph(TreeNode node, int par) {
        if (node == null) return;
        if (par != -1) {
            graph.computeIfAbsent(node.val, k -> new ArrayList<>()).add(par);
            graph.computeIfAbsent(par, k -> new ArrayList<>()).add(node.val);
        }
        buildGraph(node.left,  node.val);
        buildGraph(node.right, node.val);
    }
}`,
  },
  2421: {
    lc: 2421,
    method: "numberOfGoodPaths",
    time: "O(n log n)",
    space: "O(n)",
    cpp: `class Solution {
    vector<int> parent, rnk;
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rnk[px] < rnk[py]) swap(px, py);
        parent[py] = px;
        if (rnk[px] == rnk[py]) rnk[px]++;
    }
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        parent.resize(n); rnk.assign(n, 0);
        iota(parent.begin(), parent.end(), 0);
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        map<int, vector<int>> groups;
        for (int i = 0; i < n; i++) groups[vals[i]].push_back(i);
        int res = n;
        for (auto& [val, nodes] : groups) {
            for (int node : nodes)
                for (int nb : adj[node])
                    if (vals[nb] <= val) unite(node, nb);
            unordered_map<int,int> comp;
            for (int node : nodes) comp[find(node)]++;
            for (auto& [root, k] : comp) res += k * (k-1) / 2;
        }
        return res;
    }
};`,
    python: `from collections import defaultdict
class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        parent = list(range(n))
        rank = [0] * n
        def find(x):
            while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
            return x
        def union(x, y):
            px, py = find(x), find(y)
            if px == py: return
            if rank[px] < rank[py]: px, py = py, px
            parent[py] = px
            if rank[px] == rank[py]: rank[px] += 1
        adj = defaultdict(list)
        for u, v in edges: adj[u].append(v); adj[v].append(u)
        groups = defaultdict(list)
        for i, v in enumerate(vals): groups[v].append(i)
        res = n
        for val in sorted(groups):
            for node in groups[val]:
                for nb in adj[node]:
                    if vals[nb] <= val: union(node, nb)
            comp = defaultdict(int)
            for node in groups[val]: comp[find(node)] += 1
            for k in comp.values(): res += k * (k-1) // 2
        return res`,
    java: `class Solution {
    private int[] parent, rank;
    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    private void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rank[px] < rank[py]) { int t=px; px=py; py=t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
    }
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        parent = new int[n]; rank = new int[n];
        for (int i=0;i<n;i++) parent[i]=i;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i=0;i<n;i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        TreeMap<Integer,List<Integer>> groups = new TreeMap<>();
        for (int i=0;i<n;i++) groups.computeIfAbsent(vals[i], k->new ArrayList<>()).add(i);
        int res = n;
        for (Map.Entry<Integer,List<Integer>> entry : groups.entrySet()) {
            int val = entry.getKey();
            for (int node : entry.getValue())
                for (int nb : adj.get(node))
                    if (vals[nb] <= val) union(node, nb);
            Map<Integer,Integer> comp = new HashMap<>();
            for (int node : entry.getValue()) comp.merge(find(node), 1, Integer::sum);
            for (int k : comp.values()) res += k*(k-1)/2;
        }
        return res;
    }
}`,
  },
};
