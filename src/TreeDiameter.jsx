import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class TreeNode {
    constructor(value, label) {
        this.value = value;
        this.label = label;
        this.id = Math.random().toString(36).substr(2, 9);
        this.left = null;
        this.right = null;
    }
}

const TreeDiameter = () => {
    const [root, setRoot] = useState(null);
    const [message, setMessage] = useState('');
    const [activeLang, setActiveLang] = useState('python');
    const [isAnimating, setIsAnimating] = useState(false);
    const [nodeList, setNodeList] = useState([]);
    const [diameterData, setDiameterData] = useState({ value: 0, path: [], labelPath: "" });
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [highlightedEdges, setHighlightedEdges] = useState([]);
    const nodeRefs = useRef({});
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);

    const buildInitialTree = () => {
        const gp = new TreeNode(1, "Grandparent");
        const pa = new TreeNode(2, "Parent A");
        const pb = new TreeNode(3, "Parent B");
        const gca = new TreeNode(4, "Grandchild 1");
        const gcb = new TreeNode(5, "Grandchild 2");
        const gcc = new TreeNode(6, "Grandchild 3");

        gp.left = pa;
        gp.right = pb;
        pa.left = gca;
        pa.right = gcb;
        pb.right = gcc;

        return gp;
    };

    const getHeightPath = (node) => {
        if (!node) return { height: 0, path: [] };
        const left = getHeightPath(node.left);
        const right = getHeightPath(node.right);

        if (left.height > right.height) {
            return { height: left.height + 1, path: [node.id, ...left.path] };
        } else {
            return { height: right.height + 1, path: [node.id, ...right.path] };
        }
    };

    const getDiameter = (node) => {
        if (!node) return { diameter: 0, path: [] };

        const leftH = getHeightPath(node.left);
        const rightH = getHeightPath(node.right);
        const throughRoot = leftH.height + rightH.height + 1;
        const rootPath = [...leftH.path.reverse(), node.id, ...rightH.path];

        const leftD = getDiameter(node.left);
        const rightD = getDiameter(node.right);

        if (throughRoot >= leftD.diameter && throughRoot >= rightD.diameter) {
            return { diameter: throughRoot, path: rootPath };
        } else if (leftD.diameter >= throughRoot && leftD.diameter >= rightD.diameter) {
            return leftD;
        } else {
            return rightD;
        }
    };

    const runCalculation = async () => {
        if (!root || isAnimating) return;
        setIsAnimating(true);
        setMessage("Starting diameter analysis — checking subtrees first...");
        setHighlightedNodes([]);
        setHighlightedEdges([]);
        setDiameterData({ value: 0, path: [] });

        const result = getDiameter(root);

        // Step 1: Show left subtree path (0-5s)
        if (root.left) {
            const leftD = getDiameter(root.left);
            setHighlightedNodes(leftD.path);
            setMessage("Analyzing left subtree diameter...");
            await new Promise(r => setTimeout(r, 4500));
        }

        // Step 2: Show right subtree path (5-10s)
        if (root.right) {
            const rightD = getDiameter(root.right);
            setHighlightedNodes(rightD.path);
            setMessage("Analyzing right subtree diameter...");
            await new Promise(r => setTimeout(r, 4500));
        }

        // Step 3: Final Diameter Path (10-14s)
        setMessage(`Calculating final diameter... max(L, R, LH+RH+1)`);
        await new Promise(r => setTimeout(r, 1000));

        const pathLabels = result.path.map(id => nodeList.find(n => n.id === id)?.label || "Node");

        setHighlightedNodes(result.path);

        const edges = [];
        for (let i = 0; i < result.path.length - 1; i++) {
            edges.push(`${result.path[i]}-${result.path[i + 1]}`);
            edges.push(`${result.path[i + 1]}-${result.path[i]}`);
        }
        setHighlightedEdges(edges);
        setDiameterData({ ...result, labelPath: pathLabels.join(" → ") });
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('TreeDiameter');
        setMessage(`Success! Longest path found.`);
    };

    const clearTree = () => {
        setHighlightedNodes([]);
        setHighlightedEdges([]);
        setDiameterData({ value: 0, path: [] });
        setMessage("Path cleared.");
    };

    const fetchNodes = (node, acc = []) => {
        if (!node) return acc;
        acc.push(node);
        fetchNodes(node.left, acc);
        fetchNodes(node.right, acc);
        return acc;
    };

    useEffect(() => {
        const t = buildInitialTree();
        setRoot(t);
        setNodeList(fetchNodes(t));
        const timer = setTimeout(() => setTick(t => t + 1), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const Line = ({ parentId, childId }) => {
        const pRef = nodeRefs.current[parentId];
        const cRef = nodeRefs.current[childId];
        if (!pRef || !cRef || !containerRef.current) return null;

        const pRect = pRef.getBoundingClientRect();
        const cRect = cRef.getBoundingClientRect();
        const contRect = containerRef.current.getBoundingClientRect();

        const x1 = (pRect.left + pRect.right) / 2 - contRect.left;
        const y1 = (pRect.top + pRect.bottom) / 2 - contRect.top;
        const x2 = (cRect.left + cRect.right) / 2 - contRect.left;
        const y2 = (cRect.top + cRect.bottom) / 2 - contRect.top;

        const isHighlighted = highlightedEdges.includes(`${parentId}-${childId}`);

        return (
            <motion.path
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    stroke: isHighlighted ? '#ef4444' : '#cbd5e1',
                    strokeWidth: isHighlighted ? 4 : 2,
                }}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                fill="none"
            />
        );
    };

    const RenderTree = ({ node }) => {
        if (!node) return null;
        const isHighlighted = highlightedNodes.includes(node.id);

        return (
            <div style={styles.nodeContainer}>
                <motion.div
                    layout
                    id={node.id}
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={{ scale: 0 }}
                    animate={{
                        scale: 1,
                        borderColor: isHighlighted ? '#ef4444' : '#e2e8f0',
                        boxShadow: isHighlighted ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none',
                        backgroundColor: isHighlighted ? '#fef2f2' : '#fff'
                    }}
                    style={styles.node}
                >
                    <div style={styles.nodeLabel}>{node.label}</div>
                </motion.div>
                <div style={styles.children}>
                    {node.left && (
                        <div style={styles.childBranch}>
                            <RenderTree node={node.left} />
                        </div>
                    )}
                    {node.right && (
                        <div style={styles.childBranch}>
                            <RenderTree node={node.right} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const ConnectionLines = ({ node }) => {
        if (!node) return null;
        return (
            <>
                {node.left && <Line key={`l-${node.id}`} parentId={node.id} childId={node.left.id} />}
                {node.right && <Line key={`r-${node.id}`} parentId={node.id} childId={node.right.id} />}
                <ConnectionLines node={node.left} />
                <ConnectionLines node={node.right} />
            </>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Tree Diameter – Longest Family Path</h2>
                <p style={styles.intro}>
                    The diameter of a tree is the longest path between any two nodes — like finding the longest family connection chain across generations!
                </p>
            </div>

            <div style={styles.controls}>
                <button onClick={runCalculation} style={styles.controlBtn} disabled={isAnimating}>
                    Calculate Diameter
                </button>
                <button onClick={clearTree} style={{ ...styles.controlBtn, backgroundColor: '#64748b' }}>
                    Clear tree
                </button>
            </div>

            <div style={styles.visualizer}>
                <AnimatePresence>
                    {message && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.messageBanner}>
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    ref={containerRef}
                    style={styles.treeArea}
                >
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={root} />
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
                        <RenderTree node={root} />
                    </div>
                </div>

                {diameterData.value > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={styles.resultBox}
                    >
                        <div style={{ marginBottom: '5px', fontSize: '1.1rem' }}>
                            <strong>Longest Path Found!</strong> Diameter = {diameterData.value}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: '800' }}>
                            Path: {diameterData.labelPath}
                        </div>
                    </motion.div>
                )}
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is a tree diameter?", a: "The longest path between any two nodes in a tree." },
                        { q: "In a tree with only a root node, what is the diameter?", a: "The diameter is 1 (the path is just the root itself)." },
                        { q: "Is the diameter always a root-to-leaf path?", a: "No, it could be a path between two leaves that doesn't pass through the root." },
                        { q: "How is tree diameter related to heights?", a: "Diameter through a node = Height(Left) + Height(Right) + 1." },
                        { q: "What is the time complexity to find diameter using a simple recursive approach?", a: "O(n^2) if height is recalculated, or O(n) if optimized with memoization." }
                    ].map((quiz, idx) => (
                        <div key={idx} style={styles.quizCard}>
                            <div style={styles.quizIcon}>📏</div>
                            <p style={styles.question}><strong>Q:</strong> {quiz.q}</p>
                            <p style={styles.answer}>{quiz.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Diameter Calculation</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                                borderColor: activeLang === lang ? '#4f46e5' : '#e2e8f0',
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLang}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <pre style={styles.codeBox}>
                                {activeLang === 'python' && `def diameter(root):\n    if not root: return 0\n    l_height = height(root.left)\n    r_height = height(root.right)\n    through_root = l_height + r_height + 1\n    return max(through_root, diameter(root.left), diameter(root.right))`}
                                {activeLang === 'javascript' && `function getDiameter(node) {\n    if (!node) return 0;\n    let throughRoot = getHeight(node.left) + getHeight(node.right) + 1;\n    return Math.max(throughRoot, getDiameter(node.left), getDiameter(node.right));\n}`}
                                {activeLang === 'cpp' && `int diameter(Node* root) {\n    if (!root) return 0;\n    int throughRoot = height(root->left) + height(root->right) + 1;\n    return max({throughRoot, diameter(root->left), diameter(root->right)});\n}`}
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0' },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem' },
    controlBtn: { padding: '0.75rem 1.5rem', borderRadius: '16px', border: 'none', backgroundColor: '#4f46e5', color: 'white', fontWeight: '700', cursor: 'pointer' },
    visualizer: { position: 'relative', minHeight: '500px', backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2.5rem', border: '2px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    messageBanner: { position: 'absolute', top: '20px', padding: '10px 20px', backgroundColor: '#fff', color: '#ef4444', borderRadius: '16px', fontWeight: '800', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    treeArea: { position: 'relative', width: '100%', minHeight: '350px', display: 'flex', justifyContent: 'center' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
    nodeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: { width: '110px', height: '60px', borderRadius: '18px', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', zIndex: 10, textAlign: 'center', padding: '0 10px' },
    nodeLabel: { fontWeight: '800', fontSize: '0.85rem', color: '#1e293b' },
    children: { display: 'flex', gap: '40px', marginTop: '40px' },
    childBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    resultBox: { marginTop: '2.5rem', padding: '12px 24px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#475569', fontWeight: '700' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' },
    quizIcon: { fontSize: '2rem', marginBottom: '1rem' },
    question: { fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' },
    answer: { color: '#10b981', fontWeight: '800' },
    codeSection: { marginTop: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' },
    codeContainer: { maxWidth: '800px', width: '100%', margin: '0 auto' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '24px', fontSize: '0.85rem', lineHeight: '1.6', fontFamily: 'JetBrains Mono, monospace', overflowX: 'auto' }
};

export default TreeDiameter;
