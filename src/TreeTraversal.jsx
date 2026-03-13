import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeTraversal = () => {
    const [tree] = useState({
        id: "1",
        name: "Grandparent",
        role: "Root",
        avatar: "🧙‍♂️",
        children: [
            {
                id: "2",
                name: "Parent A",
                role: "Left Child",
                avatar: "👨‍💼",
                children: [
                    { id: "4", name: "Grandchild X", role: "Leaf", avatar: "👶", children: [] },
                    { id: "5", name: "Grandchild Y", role: "Leaf", avatar: "👶", children: [] }
                ]
            },
            {
                id: "3",
                name: "Parent B",
                role: "Right Child",
                avatar: "👩‍💼",
                children: [
                    { id: "6", name: "Grandchild Z", role: "Leaf", avatar: "👶", children: [] }
                ]
            }
        ]
    });

    const [traversing, setTraversing] = useState(false);
    const [traversalPath, setTraversalPath] = useState([]);
    const [traversalOrder, setTraversalOrder] = useState([]);
    const [activeLang, setActiveLang] = useState('python');
    const nodeRefs = useRef({});
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        const timer = setTimeout(() => setTick(t => t + 1), 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    // Auto-play demo on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            runTraversal('pre-order');
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const runTraversal = async (type) => {
        if (traversing) return;
        setTraversing(true);
        setTraversalPath([]);
        setTraversalOrder([]);

        const order = [];
        const generateOrder = (node) => {
            if (!node) return;

            if (type === 'pre-order') order.push(node);
            if (node.children[0]) generateOrder(node.children[0]);
            if (type === 'in-order') order.push(node);
            if (node.children[1]) generateOrder(node.children[1]);
            if (type === 'post-order') order.push(node);
        };

        generateOrder(tree);

        for (let i = 0; i < order.length; i++) {
            const currentNode = order[i];
            setTraversalPath(prev => [...prev, currentNode.id]);
            setTraversalOrder(prev => [...prev, `${i + 1}. ${currentNode.name}`]);
            await new Promise(r => setTimeout(r, 1200));
        }

        setTraversing(false);
    };

    const reset = () => {
        setTraversalPath([]);
        setTraversalOrder([]);
        setTraversing(false);
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

                        const isVisited = traversalPath.includes(child.id) && traversalPath.includes(node.id);

                        return (
                            <motion.path
                                key={`path-${node.id}-${child.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: 1,
                                    stroke: isVisited ? "#4f46e5" : "#cbd5e1"
                                }}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none"
                                strokeWidth="3"
                                style={{ transition: 'stroke 0.3s ease' }}
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
        const indexInPath = traversalPath.indexOf(node.id);
        const isActive = traversalPath[traversalPath.length - 1] === node.id;
        const isVisited = traversalPath.includes(node.id);

        return (
            <div style={{ ...styles.treeBranch, marginTop: level === 0 ? 0 : '40px' }}>
                <motion.div
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: isActive ? 1.15 : 1,
                        backgroundColor: isActive ? '#4f46e5' : isVisited ? '#f1f5f9' : '#fff',
                        borderColor: isActive ? '#4f46e5' : isVisited ? '#4f46e5' : '#e2e8f0',
                        boxShadow: isActive ? '0 10px 15px -3px rgba(79, 70, 229, 0.4)' : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={styles.node}
                >
                    {isVisited && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={styles.visitBadge}
                        >
                            {indexInPath + 1}
                        </motion.div>
                    )}
                    <motion.div
                        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: isActive ? Infinity : 0, duration: 0.8 }}
                        style={{ ...styles.avatar, color: isVisited && !isActive ? '#4f46e5' : isActive ? '#fff' : 'inherit' }}
                    >
                        {node.avatar}
                    </motion.div>
                    <div style={{ ...styles.nodeName, color: isActive ? '#fff' : '#1e293b' }}>{node.name}</div>
                    <div style={{ ...styles.nodeRole, color: isActive ? '#e0e7ff' : '#64748b' }}>{node.role}</div>
                </motion.div>

                {node.children.length > 0 && (
                    <div style={styles.childrenContainer}>
                        {node.children.map(child => (
                            <TreeNode key={child.id} node={child} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Tree Traversal Walkthrough – Family Reunion Tour</h2>
                <p style={styles.intro}>
                    Tree traversal is like touring a family reunion — you visit everyone in a specific order: pre-order (meet parents first), in-order (meet in age order), post-order (kids first, then parents).
                </p>
            </div>

            <div style={styles.controls}>
                <button onClick={() => runTraversal('pre-order')} style={styles.controlBtn} disabled={traversing}>
                    Pre-order
                </button>
                <button onClick={() => runTraversal('in-order')} style={styles.controlBtn} disabled={traversing}>
                    In-order
                </button>
                <button onClick={() => runTraversal('post-order')} style={styles.controlBtn} disabled={traversing}>
                    Post-order
                </button>
                <button onClick={reset} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }} disabled={traversing}>
                    Reset
                </button>
            </div>

            <div style={styles.visualizer}>
                <div ref={containerRef} style={styles.visualizerContent}>
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={tree} />
                    </svg>
                    <div style={styles.treeWrapper}>
                        <TreeNode node={tree} />
                    </div>
                </div>

                <div style={styles.orderPanel}>
                    <h4 style={styles.orderTitle}>Visit Order Sequence:</h4>
                    <div style={styles.orderList}>
                        {traversalOrder.map((item, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={styles.orderItem}
                            >
                                {item} {i < traversalOrder.length - 1 ? '→ ' : ''}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "In pre-order traversal, which node is visited first?", a: "The Root node (Grandparent)." },
                        { q: "In in-order traversal, when is the root visited?", a: "After the entire left subtree but before the right subtree." },
                        { q: "In post-order, why are leaves visited before internal nodes?", a: "Because post-order visits children first, and leaves are the 'youngest' nodes with no children." },
                        { q: "For the current tree, list the pre-order visit sequence", a: "1. Grandparent → 2. Parent A → 3. Grandchild X → 4. Grandchild Y → 5. Parent B → 6. Grandchild Z." },
                        { q: "Which traversal gives nodes in sorted order if the tree is a BST? Why?", a: "In-order traversal. It visits nodes in increasing order of their values in a BST." }
                    ].map((quiz, idx) => (
                        <div key={idx} style={styles.quizCard}>
                            <div style={styles.quizIcon}>🤔</div>
                            <p style={styles.question}><strong>Q:</strong> {quiz.q}</p>
                            <p style={styles.answer}>{quiz.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Traversal Implementation</h3>
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
                            transition={{ duration: 0.2 }}
                        >
                            <pre style={styles.codeBox}>
                                {activeLang === 'python' && `def pre_order(node):\n    if node:\n        print(node.value)          # visit root\n        pre_order(node.left)\n        pre_order(node.right)\n\ndef in_order(node):\n    if node:\n        in_order(node.left)\n        print(node.value)\n        in_order(node.right)\n\ndef post_order(node):\n    if node:\n        post_order(node.left)\n        post_order(node.right)\n        print(node.value)`}
                                {activeLang === 'javascript' && `function preOrder(node) {\n    if (node) {\n        console.log(node.value);    // visit root\n        preOrder(node.left);\n        preOrder(node.right);\n    }\n}\n\nfunction inOrder(node) {\n    if (node) {\n        inOrder(node.left);\n        console.log(node.value);\n        inOrder(node.right);\n    }\n}\n\nfunction postOrder(node) {\n    if (node) {\n        postOrder(node.left);\n        postOrder(node.right);\n        console.log(node.value);\n    }\n}`}
                                {activeLang === 'cpp' && `void preOrder(TreeNode* node) {\n    if (node) {\n        cout << node->value << " "; // visit root\n        preOrder(node->left);\n        preOrder(node->right);\n    }\n}\n\nvoid inOrder(TreeNode* node) {\n    if (node) {\n        inOrder(node->left);\n        cout << node->value << " ";\n        inOrder(node->right);\n    }\n}\n\nvoid postOrder(TreeNode* node) {\n    if (node) {\n        postOrder(node->left);\n        postOrder(node->right);\n        cout << node->value << " ";\n    }\n}`}
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em' },
    intro: { color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem' },
    controlBtn: {
        padding: '0.75rem 1.5rem',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
    },
    visualizer: {
        position: 'relative',
        minHeight: '500px',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '2px solid #f1f5f9',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    visualizerContent: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 },
    treeWrapper: { position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', width: '100%' },
    treeBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: {
        width: '110px',
        padding: '16px 12px',
        borderRadius: '20px',
        border: '2px solid #e2e8f0',
        textAlign: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    visitBadge: {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        backgroundColor: '#10b981',
        color: '#fff',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        zIndex: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    avatar: { fontSize: '1.75rem', marginBottom: '6px' },
    nodeName: { fontWeight: '800', fontSize: '0.85rem' },
    nodeRole: { fontSize: '0.75rem', fontWeight: '600' },
    childrenContainer: { display: 'flex', gap: '40px', marginTop: '0px', position: 'relative' },
    orderPanel: { marginTop: '2.5rem', width: '100%', padding: '1rem', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' },
    orderTitle: { margin: '0 0 10px 0', fontSize: '0.9rem', color: '#64748b', fontWeight: '700' },
    orderList: { display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '1rem', fontWeight: '700', color: '#4f46e5' },
    orderItem: { padding: '4px 8px' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: {
        padding: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #f1f5f9',
        fontSize: '0.95rem',
        textAlign: 'center'
    },
    quizIcon: { fontSize: '2rem', marginBottom: '1rem' },
    question: { fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem' },
    answer: { color: '#10b981', fontWeight: '800' },
    codeSection: { marginTop: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: {
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '24px',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        whiteSpace: 'pre-wrap',
        overflowX: 'auto'
    }
};

export default TreeTraversal;
