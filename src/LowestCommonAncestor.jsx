import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class TreeNode {
    constructor(value, label) {
        this.value = value;
        this.label = label;
        this.id = Math.random().toString(36).substr(2, 9);
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

const LowestCommonAncestor = () => {
    const [root, setRoot] = useState(null);
    const [nodeList, setNodeList] = useState([]);
    const [node1, setNode1] = useState('');
    const [node2, setNode2] = useState('');
    const [message, setMessage] = useState('');
    const [activeLang, setActiveLang] = useState('python');
    const [isAnimating, setIsAnimating] = useState(false);
    const [lcaNode, setLcaNode] = useState(null);
    const [path1, setPath1] = useState([]);
    const [path2, setPath2] = useState([]);
    const nodeRefs = useRef({});
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);

    const buildTree = () => {
        const gp = new TreeNode(1, "Grandparent");
        const pa = new TreeNode(2, "Parent A");
        const pb = new TreeNode(3, "Parent B");
        const gca = new TreeNode(4, "Child A1");
        const gcb = new TreeNode(5, "Child A2");
        const gcc = new TreeNode(6, "Child B1");
        const gcd = new TreeNode(7, "Child B2");

        gp.left = pa; gp.right = pb;
        pa.parent = gp; pb.parent = gp;

        pa.left = gca; pa.right = gcb;
        gca.parent = pa; gcb.parent = pa;

        pb.left = gcc; pb.right = gcd;
        gcc.parent = pb; gcd.parent = pb;

        return gp;
    };

    const getAllNodes = (node, acc = []) => {
        if (!node) return acc;
        acc.push(node);
        getAllNodes(node.left, acc);
        getAllNodes(node.right, acc);
        return acc;
    };

    useEffect(() => {
        const tree = buildTree();
        setRoot(tree);
        setNodeList(getAllNodes(tree));
        const timer = setTimeout(() => setTick(t => t + 1), 500);
        return () => clearTimeout(timer);
    }, []);

    const findPathToRoot = (nodeId) => {
        const path = [];
        let curr = nodeList.find(n => n.id === nodeId);
        while (curr) {
            path.push(curr.id);
            curr = curr.parent;
        }
        return path;
    };

    const findLCA = async () => {
        if (!node1 || !node2 || isAnimating) return;
        setIsAnimating(true);
        setLcaNode(null);
        setPath1([]);
        setPath2([]);
        setMessage(`Finding the reunion meeting point for ${nodeList.find(n => n.id === node1).label} and ${nodeList.find(n => n.id === node2).label}...`);

        const p1 = findPathToRoot(node1);
        const p2 = findPathToRoot(node2);

        // Animate paths upward
        for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
            if (i < p1.length) setPath1(p1.slice(0, i + 1));
            if (i < p2.length) setPath2(p2.slice(0, i + 1));
            await new Promise(r => setTimeout(r, 400));
        }

        let lca = null;
        for (let id of p1) {
            if (p2.includes(id)) {
                lca = id;
                break;
            }
        }

        setLcaNode(lca);
        const lcaLabel = nodeList.find(n => n.id === lca).label;
        setMessage(`Lowest Common Ancestor found: ${lcaLabel}!`);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('LowestCommonAncestor');
    };

    const clearSelection = () => {
        setNode1('');
        setNode2('');
        setPath1([]);
        setPath2([]);
        setLcaNode(null);
        setMessage('Selection cleared.');
    };

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

        const inPath1 = path1.includes(parentId) && path1.includes(childId);
        const inPath2 = path2.includes(parentId) && path2.includes(childId);
        const isHighlighted = inPath1 || inPath2;

        return (
            <motion.path
                animate={{
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
        const inPath1 = path1.includes(node.id);
        const inPath2 = path2.includes(node.id);
        const isLCA = lcaNode === node.id;
        const isSelected = node1 === node.id || node2 === node.id;

        return (
            <div style={styles.nodeContainer}>
                <motion.div
                    layout
                    id={node.id}
                    ref={el => nodeRefs.current[node.id] = el}
                    animate={{
                        scale: isLCA ? 1.2 : 1,
                        borderColor: isLCA ? '#ef4444' : (inPath1 || inPath2 ? '#f87171' : '#e2e8f0'),
                        backgroundColor: isLCA ? '#fee2e2' : (isSelected ? '#eff6ff' : '#fff'),
                        boxShadow: isLCA ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none'
                    }}
                    style={styles.node}
                    onClick={() => {
                        if (!node1) setNode1(node.id);
                        else if (!node2 && node1 !== node.id) setNode2(node.id);
                    }}
                >
                    <div style={styles.nodeLabel}>{node.label}</div>
                    {isLCA && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={styles.lcaBadge}
                        >
                            LCA
                        </motion.div>
                    )}
                </motion.div>
                <div style={styles.children}>
                    <div style={styles.branch}><RenderTree node={node.left} /></div>
                    <div style={styles.branch}><RenderTree node={node.right} /></div>
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
                <h2 style={styles.title}>Lowest Common Ancestor – Family Reunion Meeting Point</h2>
                <p style={styles.intro}>
                    The Lowest Common Ancestor is the deepest family member who is ancestor to both people — like the meeting point when two relatives search for each other!
                </p>
            </div>

            <div style={styles.controls}>
                <select
                    value={node1}
                    onChange={(e) => setNode1(e.target.value)}
                    style={styles.select}
                    disabled={isAnimating}
                >
                    <option value="">Select Person 1</option>
                    {nodeList.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                </select>
                <select
                    value={node2}
                    onChange={(e) => setNode2(e.target.value)}
                    style={styles.select}
                    disabled={isAnimating}
                >
                    <option value="">Select Person 2</option>
                    {nodeList.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                </select>
                <button onClick={findLCA} style={styles.controlBtn} disabled={!node1 || !node2 || isAnimating}>
                    Find LCA
                </button>
                <button onClick={clearSelection} style={{ ...styles.controlBtn, backgroundColor: '#64748b' }}>
                    Clear
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

                <div ref={containerRef} style={styles.treeArea}>
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={root} />
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
                        <RenderTree node={root} />
                    </div>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is the LCA of two sibling nodes?", a: "Their immediate parent node." },
                        { q: "What is the LCA of a node with itself?", a: "The node itself is its own lowest ancestor." },
                        { q: "In a Binary Search Tree (BST), how can LCA be found faster?", a: "If both values are smaller than root, go left. If both are larger, go right. Otherwise, root is LCA!" },
                        { q: "Can a node be an ancestor of itself?", a: "Yes, in LCA definitions, a node can be an ancestor of itself." },
                        { q: "Why is LCA useful in file systems?", a: "It helps find the nearest common directory of two files for shared resource access." }
                    ].map((quiz, idx) => (
                        <div key={idx} style={styles.quizCard}>
                            <div style={styles.quizIcon}>🤝</div>
                            <p style={styles.question}><strong>Q:</strong> {quiz.q}</p>
                            <p style={styles.answer}>{quiz.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>LCA Implementation</h3>
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
                                {activeLang === 'python' && `def getLCA(root, p, q):\n    if not root or root == p or root == q: return root\n    left = getLCA(root.left, p, q)\n    right = getLCA(root.right, p, q)\n    if left and right: return root\n    return left or right`}
                                {activeLang === 'javascript' && `function lowestCommonAncestor(root, p, q) {\n    if (!root || root === p || root === q) return root;\n    const left = lowestCommonAncestor(root.left, p, q);\n    const right = lowestCommonAncestor(root.right, p, q);\n    if (left && right) return root;\n    return left || right;\n}`}
                                {activeLang === 'cpp' && `Node* lowestCommonAncestor(Node* root, Node* p, Node* q) {\n    if (!root || root == p || root == q) return root;\n    Node* left = lowestCommonAncestor(root->left, p, q);\n    Node* right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}`}
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
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' },
    select: { padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' },
    controlBtn: { padding: '0.75rem 1.5rem', borderRadius: '16px', border: 'none', backgroundColor: '#4f46e5', color: 'white', fontWeight: '700', cursor: 'pointer' },
    visualizer: { position: 'relative', minHeight: '450px', backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2rem', border: '2px solid #f1f5f9', overflow: 'hidden' },
    messageBanner: { position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: '#fff', color: '#4f46e5', borderRadius: '16px', fontWeight: '800', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', whiteSpace: 'nowrap' },
    treeArea: { position: 'relative', width: '100%', minHeight: '350px', display: 'flex', justifyContent: 'center' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
    nodeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: { width: '100px', height: '60px', borderRadius: '18px', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', zIndex: 10, cursor: 'pointer', position: 'relative' },
    nodeLabel: { fontWeight: '800', fontSize: '0.8rem', color: '#1e293b', textAlign: 'center' },
    lcaBadge: { position: 'absolute', top: '-15px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '6px', fontWeight: '900' },
    children: { display: 'flex', gap: '30px', marginTop: '40px' },
    branch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
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

export default LowestCommonAncestor;
