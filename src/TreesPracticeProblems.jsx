import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreesPracticeProblems = () => {
    const [activeProblemId, setActiveProblemId] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [currentStepIdx, setCurrentStepIdx] = useState(-1);
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [nodeLabels, setNodeLabels] = useState({});
    const [activeLang, setActiveLang] = useState('python');
    const [traversalOutput, setTraversalOutput] = useState([]);
    const [statusMsg, setStatusMsg] = useState('');
    const [tick, setTick] = useState(0);
    const nodeRefs = useRef({});
    const containerRef = useRef(null);

    const tree = {
        id: "1", name: "Grandparent", val: 10, avatar: "🧙‍♂️",
        children: [
            {
                id: "2", name: "Parent A", val: 5, avatar: "👨‍💼",
                children: [
                    { id: "4", name: "Child A1", val: 2, avatar: "👶", children: [] },
                    { id: "5", name: "Child A2", val: 7, avatar: "👧", children: [] }
                ]
            },
            {
                id: "3", name: "Parent B", val: 15, avatar: "👩‍💼",
                children: [
                    { id: "6", name: "Child B1", val: 12, avatar: "👶", children: [] }
                ]
            }
        ]
    };

    const problems = [
        {
            id: 1, title: "Find Height of Tree", desc: "Calculate the height of the binary tree.",
            input: "Tree structure", output: "Height = 3",
            steps: [
                { id: "1", msg: "Highlight root node", labels: { "1": "H:?" } },
                { id: "2", msg: "Traverse left subtree", visited: ["2", "4", "5"], labels: { "2": "H:2" } },
                { id: "3", msg: "Traverse right subtree", visited: ["2", "4", "5", "3", "6"], labels: { "3": "H:1" } },
                { id: "4", msg: "Calculate height = max(2, 1) + 1", highlighted: ["1"], labels: { "1": "Height: 3" } }
            ],
            code: {
                python: "def get_height(node):\n    if not node: return 0\n    return 1 + max(get_height(node.left), get_height(node.right))",
                javascript: "function getHeight(node) {\n    if (!node) return 0;\n    return 1 + Math.max(getHeight(node.left), getHeight(node.right));\n}",
                cpp: "int getHeight(Node* node) {\n    if (node == NULL) return 0;\n    return 1 + max(getHeight(node->left), getHeight(node->right));\n}"
            }
        },
        {
            id: 2, title: "Count Total Nodes", desc: "Count how many nodes exist in the tree.",
            input: "Binary tree", output: "Total nodes = 6",
            steps: [
                { id: "1", msg: "Count: 1", visited: ["1"] },
                { id: "2", msg: "Count: 2", visited: ["1", "2"] },
                { id: "3", msg: "Count: 3", visited: ["1", "2", "4"] },
                { id: "4", msg: "Count: 4", visited: ["1", "2", "4", "5"] },
                { id: "5", msg: "Count: 5", visited: ["1", "2", "4", "5", "3"] },
                { id: "6", msg: "Count: 6", visited: ["1", "2", "4", "5", "3", "6"] }
            ],
            code: {
                python: "def get_size(node):\n    if not node: return 0\n    return 1 + get_size(node.left) + get_size(node.right)",
                javascript: "function getSize(node) {\n    if (!node) return 0;\n    return 1 + getSize(node.left) + getSize(node.right);\n}",
                cpp: "int getSize(Node* node) {\n    if (node == NULL) return 0;\n    return 1 + getSize(node->left) + getSize(node->right);\n}"
            }
        },
        {
            id: 3, title: "Count Leaf Nodes", desc: "Find how many leaf nodes exist.",
            input: "Binary tree", output: "Leaf nodes = 3",
            steps: [
                { id: "1", msg: "Visit Grandparent (Internal)", visited: ["1"] },
                { id: "2", msg: "Visit Parent A (Internal)", visited: ["1", "2"] },
                { id: "3", msg: "Found Leaf: Child A1", visited: ["1", "2", "4"], highlighted: ["4"] },
                { id: "4", msg: "Found Leaf: Child A2", visited: ["1", "2", "4", "5"], highlighted: ["4", "5"] },
                { id: "5", msg: "Visit Parent B (Internal)", visited: ["1", "2", "4", "5", "3"] },
                { id: "6", msg: "Found Leaf: Child B1", visited: ["1", "2", "4", "5", "3", "6"], highlighted: ["4", "5", "6"] }
            ],
            code: {
                python: "def count_leaves(node):\n    if not node: return 0\n    if not node.left and not node.right: return 1\n    return count_leaves(node.left) + count_leaves(node.right)",
                javascript: "function countLeaves(node) {\n    if (!node) return 0;\n    if (!node.left && !node.right) return 1;\n    return countLeaves(node.left) + countLeaves(node.right);\n}",
                cpp: "int countLeaves(Node* node) {\n    if (node == NULL) return 0;\n    if (!node->left && !node->right) return 1;\n    return countLeaves(node->left) + countLeaves(node->right);\n}"
            }
        },
        {
            id: 4, title: "Level Order Traversal", desc: "Traverse the tree level by level.",
            input: "Binary tree", output: "[Grandparent, Parent A, Parent B, Child A1, Child A2, Child B1]",
            steps: [
                { id: "1", msg: "Visit Level 0: Grandparent", visited: ["1"], output: ["Grandparent"] },
                { id: "2", msg: "Visit Level 1: Parent A", visited: ["1", "2"], output: ["Grandparent", "Parent A"] },
                { id: "3", msg: "Visit Level 1: Parent B", visited: ["1", "2", "3"], output: ["Grandparent", "Parent A", "Parent B"] },
                { id: "4", msg: "Visit Level 2: Child A1, Child A2, Child B1", visited: ["1", "2", "3", "4", "5", "6"], output: ["Grandparent", "Parent A", "Parent B", "Child A1", "Child A2", "Child B1"] }
            ],
            code: {
                python: "def level_order(root):\n    if not root: return\n    queue = [root]\n    while queue:\n        node = queue.pop(0)\n        print(node.val)\n        if node.left: queue.append(node.left)\n        if node.right: queue.append(node.right)",
                javascript: "function levelOrder(root) {\n    if (!root) return;\n    let queue = [root];\n    while (queue.length > 0) {\n        let node = queue.shift();\n        console.log(node.val);\n        if (node.left) queue.push(node.left);\n        if (node.right) queue.push(node.right);\n    }\n}",
                cpp: "void levelOrder(Node* root) {\n    if (root == NULL) return;\n    queue<Node*> q;\n    q.push(root);\n    while (!q.empty()) {\n        Node* node = q.front(); q.pop();\n        cout << node->data << \" \";\n        if (node->left) q.push(node->left);\n        if (node->right) q.push(node->right);\n    }\n}"
            }
        },
        {
            id: 5, title: "Find Lowest Common Ancestor", desc: "Find the closest shared ancestor of two nodes.",
            input: "Node1 = Child A1, Node2 = Child A2", output: "Parent A",
            steps: [
                { id: "1", msg: "Node 1 path: Child A1 -> Parent A -> Grandparent", visited: ["1", "2", "4"] },
                { id: "2", msg: "Node 2 path: Child A2 -> Parent A -> Grandparent", visited: ["1", "2", "5"] },
                { id: "3", msg: "LCA is Parent A!", highlighted: ["2"] }
            ],
            code: {
                python: "def find_lca(root, p, q):\n    if not root or root == p or root == q: return root\n    left = find_lca(root.left, p, q)\n    right = find_lca(root.right, p, q)\n    if left and right: return root\n    return left or right",
                javascript: "function findLCA(root, p, q) {\n    if (!root || root === p || root === q) return root;\n    let left = findLCA(root.left, p, q);\n    let right = findLCA(root.right, p, q);\n    if (left && right) return root;\n    return left || right;\n}",
                cpp: "Node* findLCA(Node* root, Node* p, Node* q) {\n    if (root == NULL || root == p || root == q) return root;\n    Node* left = findLCA(root->left, p, q);\n    Node* right = findLCA(root->right, p, q);\n    if (left && right) return root;\n    if (left) return left;\n    return right;\n}"
            }
        },
        {
            id: 6, title: "Find Tree Diameter", desc: "Find the longest path between any two nodes.",
            input: "Binary tree", output: "Diameter = 4",
            steps: [
                { id: "1", msg: "Left Height = 2, Right Height = 1", labels: { "1": "L:2, R:1" } },
                { id: "2", msg: "Diameter via Root = 2 + 1 + 1 = 4 nodes", highlighted: ["4", "2", "1", "3", "6"] },
                { id: "3", msg: "Diameter is 4", labels: { "1": "Diameter: 4" } }
            ],
            code: {
                python: "def diameter(root):\n    ans = 0\n    def depth(p):\n        nonlocal ans\n        if not p: return 0\n        left, right = depth(p.left), depth(p.right)\n        ans = max(ans, left + right)\n        return 1 + max(left, right)\n    depth(root)\n    return ans",
                javascript: "let ans = 0;\nfunction depth(p) {\n    if (!p) return 0;\n    let left = depth(p.left);\n    let right = depth(p.right);\n    ans = Math.max(ans, left + right);\n    return 1 + Math.max(left, right);\n}",
                cpp: "int ans = 0;\nint depth(Node* p) {\n    if (p == NULL) return 0;\n    int left = depth(p->left);\n    int right = depth(p->right);\n    ans = max(ans, left + right);\n    return 1 + max(left, right);\n}"
            }
        },
        {
            id: 7, title: "Root to Leaf Paths", desc: "List all root to leaf paths.",
            input: "Binary tree", output: "3 Paths found",
            steps: [
                { id: "1", msg: "Path 1: Grandparent → Parent A → Child A1", visited: ["1", "2", "4"], output: ["Grandparent → Parent A → Child A1"] },
                { id: "2", msg: "Path 2: Grandparent → Parent A → Child A2", visited: ["1", "2", "5"], output: ["Grandparent → Parent A → Child A1", "Grandparent → Parent A → Child A2"] },
                { id: "3", msg: "Path 3: Grandparent → Parent B → Child B1", visited: ["1", "3", "6"], output: ["Grandparent → Parent A → Child A1", "Grandparent → Parent A → Child A2", "Grandparent → Parent B → Child B1"] }
            ],
            code: {
                python: "def binaryTreePaths(root):\n    res = []\n    def dfs(node, path):\n        if not node: return\n        if not node.left and not node.right:\n            res.append(path + str(node.val))\n            return\n        dfs(node.left, path + str(node.val) + '->')\n        dfs(node.right, path + str(node.val) + '->')\n    dfs(root, \"\")\n    return res",
                javascript: "function binaryTreePaths(root) {\n    let res = [];\n    function dfs(node, path) {\n        if (!node) return;\n        if (!node.left && !node.right) {\n            res.push(path + node.val);\n            return;\n        }\n        dfs(node.left, path + node.val + '->');\n        dfs(node.right, path + node.val + '->');\n    }\n    dfs(root, \"\");\n    return res;\n}",
                cpp: "vector<string> binaryTreePaths(TreeNode* root) {\n    vector<string> res;\n    if (root) dfs(root, \"\", res);\n    return res;\n}"
            }
        },
        {
            id: 8, title: "Search Node in Tree", desc: "Search whether a value exists in the tree.",
            input: "Search value = 12", output: "Found",
            steps: [
                { id: "1", msg: "Visiting Grandparent (10)", visited: ["1"] },
                { id: "2", msg: "Visiting Parent B (15)", visited: ["1", "3"] },
                { id: "3", msg: "Found 12 at Child B1!", visited: ["1", "3", "6"], highlighted: ["6"] }
            ],
            code: {
                python: "def search(root, target):\n    if not root: return False\n    if root.val == target: return True\n    return search(root.left, target) or search(root.right, target)",
                javascript: "function search(root, target) {\n    if (!root) return false;\n    if (root.val === target) return true;\n    return search(root.left, target) || search(root.right, target);\n}",
                cpp: "bool search(Node* root, int target) {\n    if (root == NULL) return false;\n    if (root->data == target) return true;\n    return search(root->left, target) || search(root->right, target);\n}"
            }
        }
    ];

    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const playFullAnimation = async (problem) => {
        if (animating) return;
        setAnimating(true);
        setVisitedNodes([]);
        setHighlightedNodes([]);
        setNodeLabels({});
        setTraversalOutput([]);

        for (let i = 0; i < problem.steps.length; i++) {
            setCurrentStepIdx(i);
            const step = problem.steps[i];
            setStatusMsg(step.msg);
            if (step.visited) setVisitedNodes(step.visited);
            if (step.highlighted) setHighlightedNodes(step.highlighted);
            if (step.labels) setNodeLabels(step.labels);
            if (step.output) setTraversalOutput(step.output);
            await new Promise(r => setTimeout(r, 1000));
        }
        setAnimating(false);
    };

    const nextStep = () => {
        const problem = problems.find(p => p.id === activeProblemId);
        if (!problem) return;
        const nextIdx = currentStepIdx + 1;
        if (nextIdx >= problem.steps.length) return;

        setCurrentStepIdx(nextIdx);
        const step = problem.steps[nextIdx];
        setStatusMsg(step.msg);
        if (step.visited) setVisitedNodes(step.visited);
        if (step.highlighted) setHighlightedNodes(step.highlighted);
        if (step.labels) setNodeLabels(step.labels);
        if (step.output) setTraversalOutput(step.output);
    };

    const resetAnimation = () => {
        setVisitedNodes([]);
        setHighlightedNodes([]);
        setNodeLabels({});
        setCurrentStepIdx(-1);
        setStatusMsg('Ready to start');
        setTraversalOutput([]);
        setAnimating(false);
    };

    const ConnectionLines = ({ node }) => {
        return (
            <>
                {node.children.map((child) => {
                    const parentRef = nodeRefs.current[node.id];
                    const childRef = nodeRefs.current[child.id];
                    if (parentRef && childRef && containerRef.current) {
                        const parentRect = parentRef.getBoundingClientRect();
                        const childRect = childRef.getBoundingClientRect();
                        const containerRect = containerRef.current.getBoundingClientRect();
                        const x1 = (parentRect.left + parentRect.right) / 2 - containerRect.left;
                        const y1 = parentRect.bottom - containerRect.top;
                        const x2 = (childRect.left + childRect.right) / 2 - containerRect.left;
                        const y2 = childRect.top - containerRect.top;
                        const isPrimary = (visitedNodes.includes(child.id) && visitedNodes.includes(node.id)) ||
                            (highlightedNodes.includes(child.id) && highlightedNodes.includes(node.id));
                        return (
                            <motion.path
                                key={`path-${node.id}-${child.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1, stroke: isPrimary ? "#10b981" : "#cbd5e1" }}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none" strokeWidth="3" strokeLinecap="round"
                            />
                        );
                    }
                    return null;
                })}
                {node.children.map(child => <ConnectionLines key={`lines-${child.id}`} node={child} />)}
            </>
        );
    };

    const TreeNode = ({ node, level = 0 }) => {
        const isVisited = visitedNodes.includes(node.id);
        const isHighlighted = highlightedNodes.includes(node.id);
        return (
            <div style={{ ...styles.treeBranch, marginTop: level === 0 ? 0 : '40px' }}>
                <motion.div
                    ref={el => nodeRefs.current[node.id] = el}
                    animate={{
                        scale: isHighlighted ? 1.15 : 1,
                        backgroundColor: isHighlighted ? '#10b981' : isVisited ? '#1e293b' : '#fff',
                        borderColor: isHighlighted ? '#10b981' : isVisited ? '#1e293b' : '#e2e8f0',
                        color: isVisited || isHighlighted ? '#fff' : '#1e293b'
                    }}
                    style={styles.node}
                >
                    <div style={styles.avatar}>{node.avatar}</div>
                    <div style={styles.nodeName}>{node.name}</div>
                    {nodeLabels[node.id] && <div style={styles.nodeLabel}>{nodeLabels[node.id]}</div>}
                </motion.div>
                {node.children.length > 0 && (
                    <div style={styles.childrenContainer}>
                        {node.children.map(child => <TreeNode key={child.id} node={child} level={level + 1} />)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Tree Practice Problems</h2>
                <p style={styles.intro}>Practice important tree problems and watch animated solutions.</p>
            </div>

            <div style={styles.problemGrid}>
                {problems.map((p) => (
                    <div key={p.id} style={styles.card}>
                        <div style={styles.cardInfo}>
                            <h4 style={styles.problemTitle}>{p.id}. {p.title}</h4>
                            <p style={styles.desc}>{p.desc}</p>
                            <div style={styles.ioBox}>
                                <div><strong>Input:</strong> {p.input}</div>
                                <div><strong>Output:</strong> {p.output}</div>
                            </div>
                            <button
                                onClick={() => {
                                    if (activeProblemId === p.id) {
                                        setActiveProblemId(null);
                                        resetAnimation();
                                    } else {
                                        setActiveProblemId(p.id);
                                        resetAnimation();
                                    }
                                }}
                                style={{ ...styles.actionBtn, backgroundColor: activeProblemId === p.id ? '#64748b' : '#4f46e5' }}
                            >
                                {activeProblemId === p.id ? "Hide Solution" : "Show Animated Solution"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {activeProblemId === p.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={styles.solutionPanel}
                                >
                                    <div style={styles.controls}>
                                        <button onClick={() => playFullAnimation(p)} style={styles.stepBtn} disabled={animating}>Start Animation</button>
                                        <button onClick={nextStep} style={styles.stepBtn} disabled={animating}>Next Step</button>
                                        <button onClick={resetAnimation} style={{ ...styles.stepBtn, backgroundColor: '#ef4444' }}>Reset</button>
                                    </div>
                                    <div style={styles.statusLine}>{statusMsg}</div>

                                    <div style={styles.visualizer}>
                                        <div ref={containerRef} style={styles.visualizerContent}>
                                            <svg key={`svg-${tick}-${p.id}`} style={styles.svgLayer}>
                                                <ConnectionLines node={tree} />
                                            </svg>
                                            <div style={styles.treeWrapper}>
                                                <TreeNode node={tree} />
                                            </div>
                                        </div>
                                    </div>

                                    {traversalOutput.length > 0 && (
                                        <div style={styles.outputBox}>
                                            <div style={styles.outputTitle}>Current Output:</div>
                                            <div style={styles.outputList}>
                                                {traversalOutput.join(' → ')}
                                            </div>
                                        </div>
                                    )}

                                    <div style={styles.codeSection}>
                                        <div style={styles.langSelector}>
                                            {['python', 'javascript', 'cpp'].map(l => (
                                                <button
                                                    key={l}
                                                    onClick={() => setActiveLang(l)}
                                                    style={{ ...styles.langBtn, color: activeLang === l ? '#10b981' : '#64748b', borderBottom: activeLang === l ? '2px solid #10b981' : 'none' }}
                                                >
                                                    {l.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                        <div style={styles.codeContainer}>
                                            <pre style={styles.codeBox}>{p.code[activeLang]}</pre>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What defines the height of a tree?", a: "The number of edges on the longest path from root to a leaf." },
                        { q: "Which traversal uses a queue?", a: "Level Order Traversal (BFS)." },
                        { q: "What is a leaf node?", a: "A node with no children (degree 0)." },
                        { q: "What does tree diameter measure?", a: "The longest path (number of nodes or edges) between any two nodes." },
                        { q: "Why are tree paths important?", a: "They define the hierarchy and reachability between nodes." }
                    ].map((quiz, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {quiz.q}</p>
                            <p style={styles.answer}>{quiz.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#F8FAFC', borderRadius: '32px', border: '1px solid #e2e8f0', marginTop: '4rem' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.1rem' },
    problemGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' },
    card: { backgroundColor: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    cardInfo: { marginBottom: '0.5rem' },
    problemTitle: { margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.2rem', fontWeight: '800' },
    desc: { color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' },
    ioBox: { backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#475569', marginBottom: '1.5rem', border: '1px solid #f1f5f9' },
    actionBtn: { width: '100%', padding: '12px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    solutionPanel: { marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' },
    controls: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' },
    stepBtn: { padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' },
    statusLine: { textAlign: 'center', fontSize: '0.85rem', fontWeight: '800', color: '#4f46e5', marginBottom: '1rem' },
    visualizer: { backgroundColor: '#F1F5F9', borderRadius: '16px', padding: '2rem', position: 'relative', minHeight: '300px', display: 'flex', justifyContent: 'center', border: '1px solid #e2e8f0' },
    visualizerContent: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
    treeWrapper: { position: 'relative', zIndex: 2 },
    treeBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: { width: '60px', padding: '8px', borderRadius: '12px', border: '2px solid #e2e8f0', textAlign: 'center', backgroundColor: '#fff', position: 'relative' },
    nodeName: { fontSize: '0.6rem', fontWeight: '800' },
    nodeLabel: { position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '0.5rem', color: '#4f46e5', fontWeight: '800' },
    avatar: { fontSize: '1rem' },
    childrenContainer: { display: 'flex', gap: '1.5rem', position: 'relative' },
    outputBox: { marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' },
    outputTitle: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: '800', marginBottom: '4px' },
    outputList: { fontSize: '0.9rem', fontWeight: '800', color: '#10b981' },
    codeSection: { marginTop: '1.5rem' },
    langSelector: { display: 'flex', gap: '1rem', marginBottom: '0.5rem' },
    langBtn: { background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem', padding: '4px 0' },
    codeContainer: { backgroundColor: '#0f172a', padding: '1rem', borderRadius: '12px', overflowX: 'auto' },
    codeBox: { color: '#f8fafc', margin: 0, fontSize: '0.75rem', fontFamily: 'monospace' },
    quizSection: { marginTop: '4rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center' },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' },
    answer: { color: '#10b981', fontWeight: '800' }
};

export default TreesPracticeProblems;
