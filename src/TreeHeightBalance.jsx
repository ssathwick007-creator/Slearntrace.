import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class TreeNode {
    constructor(value) {
        this.value = value;
        this.id = Math.random().toString(36).substr(2, 9);
        this.left = null;
        this.right = null;
        this.height = 1;
        this.balance = 0;
    }
}

const TreeHeightBalance = () => {
    const [root, setRoot] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [activeLang, setActiveLang] = useState('python');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showLabels, setShowLabels] = useState(true);
    const [calculatingNode, setCalculatingNode] = useState(null);
    const nodeRefs = useRef({});
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);

    const getHeight = (node) => (node ? node.height : 0);
    const getBalance = (node) => (node ? getHeight(node.left) - getHeight(node.right) : 0);

    const updateMetrics = (node) => {
        if (!node) return;
        updateMetrics(node.left);
        updateMetrics(node.right);
        node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
        node.balance = getBalance(node);
    };

    const insert = (node, value) => {
        if (!node) return new TreeNode(value);
        if (value < node.value) {
            node.left = insert(node.left, value);
        } else if (value > node.value) {
            node.right = insert(node.right, value);
        }
        return node;
    };

    const handleInsert = async (val) => {
        const num = parseInt(val || inputValue);
        if (isNaN(num)) return;

        setIsAnimating(true);
        setMessage(`Inserting ${num}...`);

        const newRoot = insert(root ? { ...root } : null, num);

        const clone = (n) => {
            if (!n) return null;
            const newNode = { ...n };
            newNode.left = clone(n.left);
            newNode.right = clone(n.right);
            return newNode;
        };

        const rootCopy = clone(newRoot);
        updateMetrics(rootCopy);

        setRoot(rootCopy);
        setInputValue('');
        setTimeout(() => setIsAnimating(false), 500);
    };

    const runCalculation = async () => {
        if (!root) return;
        setIsAnimating(true);
        setShowLabels(false);
        setMessage("Calculating Heights (Bottom-Up) → Height = max(left, right) + 1");

        const traverseBottomUp = async (node) => {
            if (!node) return;
            await traverseBottomUp(node.left);
            await traverseBottomUp(node.right);
            setCalculatingNode(node.id);
            await new Promise(r => setTimeout(r, 600));
        };

        await traverseBottomUp(root);

        setCalculatingNode(null);
        setShowLabels(true);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('TreeHeightBalance');
        setMessage("Calculation Complete! Balanced trees keep search at O(log n).");
    };

    const clearTree = () => {
        setRoot(null);
        setMessage('Tree cleared.');
        setShowLabels(true);
    };

    useEffect(() => {
        const runDemo = async () => {
            await handleInsert(50);
            await new Promise(r => setTimeout(r, 800));
            await handleInsert(30);
            await new Promise(r => setTimeout(r, 800));
            await handleInsert(70);
            await new Promise(r => setTimeout(r, 1500));
            setMessage("Adding nodes to the right side → Watch the ladder grow!");
            await handleInsert(80);
            await new Promise(r => setTimeout(r, 800));
            await handleInsert(90);
            await new Promise(r => setTimeout(r, 1500));
            runCalculation();
        };
        const timer = setTimeout(runDemo, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        const timer = setTimeout(() => setTick(t => t + 1), 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, [root]);

    const getBalanceColor = (balance) => {
        const b = Math.abs(balance);
        if (b <= 1) return '#10b981';
        if (b === 2) return '#fbbf24';
        return '#ef4444';
    };

    const ConnectionLines = ({ node }) => {
        if (!node) return null;
        return (
            <>
                {node.left && <Line key={`line-l-${node.id}`} parentId={node.id} childId={node.left.id} />}
                {node.right && <Line key={`line-r-${node.id}`} parentId={node.id} childId={node.right.id} />}
                <ConnectionLines node={node.left} />
                <ConnectionLines node={node.right} />
            </>
        );
    };

    const Line = ({ parentId, childId }) => {
        const pRef = nodeRefs.current[parentId];
        const cRef = nodeRefs.current[childId];
        if (!pRef || !cRef || !containerRef.current) return null;

        const pRect = pRef.getBoundingClientRect();
        const cRect = cRef.getBoundingClientRect();
        const contRect = containerRef.current.getBoundingClientRect();

        const x1 = (pRect.left + pRect.right) / 2 - contRect.left;
        const y1 = pRect.bottom - contRect.top;
        const x2 = (cRect.left + cRect.right) / 2 - contRect.left;
        const y2 = cRect.top - contRect.top;

        return (
            <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
            />
        );
    };

    const RenderNode = ({ node }) => {
        if (!node) return null;
        const balanceColor = getBalanceColor(node.balance);
        const isCalculating = calculatingNode === node.id;

        return (
            <div style={styles.nodeContainer}>
                <div style={styles.nodeWrapper}>
                    <AnimatePresence>
                        {(showLabels || isCalculating) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                style={{ ...styles.heightLabel, color: balanceColor }}
                            >
                                H: {node.height} | B: {node.balance}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div
                        layout
                        key={node.id}
                        ref={el => nodeRefs.current[node.id] = el}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isCalculating ? 1.1 : 1,
                            opacity: 1,
                            borderColor: balanceColor,
                            boxShadow: isCalculating
                                ? `0 0 25px ${balanceColor}`
                                : `0 0 10px ${balanceColor}33`,
                            backgroundColor: isCalculating ? `${balanceColor}11` : '#fff'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={styles.node}
                    >
                        <div style={styles.nodeValue}>{node.value}</div>
                    </motion.div>
                </div>
                <div style={styles.children}>
                    <RenderNode key={`left-${node.id}`} node={node.left} />
                    <RenderNode key={`right-${node.id}`} node={node.right} />
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Tree Height & Balance Check – Measuring the Family Ladder</h2>
                <p style={styles.intro}>
                    Tree height tells how deep the family tree goes, and balance factor shows if it's leaning too much — balanced trees are faster for search!
                </p>
            </div>

            <div style={styles.controls}>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Val"
                    style={styles.input}
                    onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
                />
                <button onClick={() => handleInsert()} style={styles.controlBtn} disabled={isAnimating}>
                    Insert value
                </button>
                <button onClick={runCalculation} style={{ ...styles.controlBtn, backgroundColor: '#10b981' }} disabled={isAnimating}>
                    Calculate heights & balance
                </button>
                <button onClick={clearTree} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>
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

                <div ref={containerRef} style={styles.treeArea}>
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={root} />
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
                        <RenderNode node={root} />
                    </div>
                </div>

                <div style={styles.legend}>
                    <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: '#10b981' }}></span> Balanced (0, ±1)</div>
                    <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: '#fbbf24' }}></span> Warning (±2)</div>
                    <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: '#ef4444' }}></span> Imbalanced (±3+)</div>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is the height of a tree with only root node?", a: "The height is 1 (calculated as 1 node deep)." },
                        { q: "If left subtree height = 3, right = 1 → what is balance factor of root?", a: "Balance factor = 3 - 1 = 2 (Unbalanced!)." },
                        { q: "Why do balanced trees have faster search than skewed ones?", a: "Balanced trees keep height at log(n), while skewed trees can go up to n (linear)." },
                        { q: "Insert 1,2,3,4,5 → what happens to balance factors?", a: "The balance factors will grow negatively (0, -1, -2, -3, -4) as the tree skews right." },
                        { q: "What is the maximum height of a balanced tree with 15 nodes?", a: "A perfectly balanced (complete) tree with 15 nodes has a height of 4." }
                    ].map((quiz, idx) => (
                        <div key={idx} style={styles.quizCard}>
                            <div style={styles.quizIcon}>🪜</div>
                            <p style={styles.question}><strong>Q:</strong> {quiz.q}</p>
                            <p style={styles.answer}>{quiz.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Calculating Height & Balance</h3>
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
                                {activeLang === 'python' && `def get_height(node):\n    if not node:\n        return 0\n    return 1 + max(get_height(node.left), get_height(node.right))\n\ndef get_balance(node):\n    if not node:\n        return 0\n    return get_height(node.left) - get_height(node.right)`}
                                {activeLang === 'javascript' && `function getHeight(node) {\n    if (!node) return 0;\n    return 1 + Math.max(getHeight(node.left), getHeight(node.right));\n}\n\nfunction getBalance(node) {\n    if (!node) return 0;\n    return getHeight(node.left) - getHeight(node.right);\n}`}
                                {activeLang === 'cpp' && `int getHeight(Node* node) {\n    if (!node) return 0;\n    return 1 + max(getHeight(node->left), getHeight(node->right));\n}\n\nint getBalance(Node* node) {\n    if (!node) return 0;\n    return getHeight(node->left) - getHeight(node->right);\n}`}
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
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        overflow: 'visible'
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em' },
    intro: { color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' },
    input: { padding: '0.75rem 1rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '80px', fontSize: '1rem' },
    controlBtn: {
        padding: '0.75rem 1.5rem',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
    },
    visualizer: {
        position: 'relative',
        minHeight: '520px',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '2rem',
        border: '2px solid #f1f5f9',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'
    },
    messageBanner: {
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        backgroundColor: '#fff',
        color: '#4f46e5',
        borderRadius: '16px',
        fontWeight: '700',
        zIndex: 50,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        whiteSpace: 'nowrap'
    },
    treeArea: { position: 'relative', width: '100%', minHeight: '400px', display: 'flex', justifyContent: 'center', overflow: 'visible' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 5 },
    nodeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'visible' },
    nodeWrapper: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: {
        width: '75px',
        height: '75px',
        borderRadius: '22px',
        border: '2px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex: 10,
        position: 'relative',
        transition: 'border-color 0.3s'
    },
    nodeValue: { fontWeight: '900', fontSize: '1.2rem', color: '#1e293b' },
    heightLabel: {
        position: 'absolute',
        top: '-35px',
        padding: '4px 8px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        fontSize: '0.8rem',
        fontWeight: '900',
        whiteSpace: 'nowrap',
        zIndex: 20
    },
    children: { display: 'flex', gap: '40px', marginTop: '50px', position: 'relative', overflow: 'visible' },
    legend: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        padding: '1.25rem',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        fontSize: '0.9rem',
        fontWeight: '800',
        color: '#475569',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        zIndex: 30
    },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px' },
    dot: { width: '10px', height: '10px', borderRadius: '50%' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: {
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #f1f5f9',
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
        overflowX: 'auto'
    }
};

export default TreeHeightBalance;
