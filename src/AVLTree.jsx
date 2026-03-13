import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class AVLNode {
    constructor(value) {
        this.value = value;
        this.id = Math.random().toString(36).substr(2, 9);
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

const AVLTree = () => {
    const [root, setRoot] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [activeLang, setActiveLang] = useState('python');
    const [isAnimating, setIsAnimating] = useState(false);
    const nodeRefs = useRef({});
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);

    const getHeight = (node) => (node ? node.height : 0);
    const getBalance = (node) => (node ? getHeight(node.left) - getHeight(node.right) : 0);

    const updateHeight = (node) => {
        if (!node) return;
        node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    };

    const rightRotate = (y) => {
        setMessage(`Performing Right Rotation on ${y.value}...`);
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        updateHeight(y);
        updateHeight(x);
        return x;
    };

    const leftRotate = (x) => {
        setMessage(`Performing Left Rotation on ${x.value}...`);
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        updateHeight(x);
        updateHeight(y);
        return y;
    };

    const insert = async (node, value) => {
        if (!node) return new AVLNode(value);

        if (value < node.value) {
            node.left = await insert(node.left, value);
        } else if (value > node.value) {
            node.right = await insert(node.right, value);
        } else {
            return node; // Duplicate values not allowed
        }

        updateHeight(node);
        const balance = getBalance(node);

        // LL Case
        if (balance > 1 && value < node.left.value) {
            await new Promise(r => setTimeout(r, 800));
            return rightRotate(node);
        }
        // RR Case
        if (balance < -1 && value > node.right.value) {
            await new Promise(r => setTimeout(r, 800));
            return leftRotate(node);
        }
        // LR Case
        if (balance > 1 && value > node.left.value) {
            await new Promise(r => setTimeout(r, 800));
            node.left = leftRotate(node.left);
            await new Promise(r => setTimeout(r, 800));
            return rightRotate(node);
        }
        // RL Case
        if (balance < -1 && value < node.right.value) {
            await new Promise(r => setTimeout(r, 800));
            node.right = rightRotate(node.right);
            await new Promise(r => setTimeout(r, 800));
            return leftRotate(node);
        }

        return node;
    };

    const handleInsert = async (val) => {
        const num = parseInt(val || inputValue);
        if (isNaN(num) || isAnimating) return;

        setIsAnimating(true);
        setMessage(`Inserting ${num}...`);
        const newRoot = await insert(root ? { ...root } : null, num);

        // Deep clone to trigger re-render properly with complex structure
        const clone = (n) => {
            if (!n) return null;
            const newNode = { ...n };
            newNode.left = clone(n.left);
            newNode.right = clone(n.right);
            return newNode;
        };

        setRoot(clone(newRoot));
        setInputValue('');
        setTimeout(() => {
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('AVLTree');
            setMessage('Balanced! O(log n) height guaranteed');
        }, 1000);
    };

    const clearTree = () => {
        setRoot(null);
        setMessage('Tree cleared.');
    };

    // Auto-play demo
    useEffect(() => {
        const runDemo = async () => {
            const vals = [1, 2, 3, 4, 5];
            for (const v of vals) {
                await new Promise(r => setTimeout(r, 2000));
                await handleInsert(v);
            }
        };
        const timer = setTimeout(runDemo, 1000);
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

    const ConnectionLines = ({ node }) => {
        if (!node) return null;
        return (
            <>
                {node.left && (
                    <Line parentId={node.id} childId={node.left.id} />
                )}
                {node.right && (
                    <Line parentId={node.id} childId={node.right.id} />
                )}
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
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
            />
        );
    };

    const RenderNode = ({ node, level = 0, xOffset = 0 }) => {
        if (!node) return null;
        const balance = getBalance(node);
        const isImbalanced = Math.abs(balance) > 1;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <motion.div
                    layout
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        borderColor: isImbalanced ? '#ef4444' : '#e2e8f0',
                        backgroundColor: isImbalanced ? '#fef2f2' : '#fff'
                    }}
                    style={styles.node}
                >
                    <div style={styles.nodeValue}>{node.value}</div>
                    <div style={{ ...styles.heightLabel, color: isImbalanced ? '#ef4444' : '#64748b' }}>
                        h={node.height} | b={balance}
                    </div>
                </motion.div>
                <div style={{ display: 'flex', marginTop: '40px', gap: '40px' }}>
                    <RenderNode node={node.left} level={level + 1} />
                    <RenderNode node={node.right} level={level + 1} />
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>AVL Tree Balancing – Self-Adjusting Family Tree</h2>
                <p style={styles.intro}>
                    AVL trees are smart binary search trees that automatically balance themselves with rotations — keeping the tree short and search fast even after many inserts!
                </p>
            </div>

            <div style={styles.controls}>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    style={styles.input}
                    onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
                />
                <button onClick={() => handleInsert()} style={styles.controlBtn} disabled={isAnimating}>
                    Insert value
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
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
                        <RenderNode node={root} />
                    </div>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "After inserting 1,2,3 in order → what happens without balancing?", a: "The tree becomes a linked list (right-skewed), losing O(log n) efficiency." },
                        { q: "What is the maximum height difference allowed in AVL tree?", a: "The balance factor must be -1, 0, or 1 (max difference of 1)." },
                        { q: "What rotation is used when left subtree is too heavy?", a: "A Right Rotation (or Left-Right depending on the child's balance)." },
                        { q: "Insert 10,20,30,40 → show the rotation step", a: "Inserting 30 triggers a left rotation on 10, then inserting 40 keeps it balanced until 50." },
                        { q: "Why is AVL tree better than normal BST for frequent inserts/searches?", a: "It guarantees a height of O(log n), preventing worst-case linear time complexity." }
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
                <h3 style={styles.subTitle}>AVL Implementation</h3>
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
                                {activeLang === 'python' && `class AVLNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n        self.height = 1\n\ndef get_height(node):\n    return node.height if node else 0\n\ndef right_rotate(y):\n    x = y.left\n    T2 = x.right\n    x.right = y\n    y.left = T2\n    y.height = max(get_height(y.left), get_height(y.right)) + 1\n    x.height = max(get_height(x.left), get_height(x.right)) + 1\n    return x`}
                                {activeLang === 'javascript' && `class AVLNode {\n    constructor(value) {\n        this.value = value;\n        this.left = null;\n        this.right = null;\n        this.height = 1;\n    }\n}\n\nfunction getHeight(node) {\n    return node ? node.height : 0;\n}\n\nfunction rightRotate(y) {\n    let x = y.left;\n    let T2 = x.right;\n    x.right = y;\n    y.left = T2;\n    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;\n    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;\n    return x;\n}`}
                                {activeLang === 'cpp' && `struct AVLNode {\n    int val;\n    AVLNode *left, *right;\n    int height;\n    AVLNode(int v) : val(v), left(nullptr), right(nullptr), height(1) {}\n};\n\nint height(AVLNode *n) { return n ? n->height : 0; }\n\nAVLNode* rightRotate(AVLNode *y) {\n    AVLNode *x = y->left;\n    AVLNode *T2 = x->right;\n    x->right = y;\n    y->left = T2;\n    y->height = max(height(y->left), height(y->right)) + 1;\n    x->height = max(height(x->left), height(x->right)) + 1;\n    return x;\n}`}
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
    input: { padding: '0.75rem 1rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100px', fontSize: '1rem' },
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
        minHeight: '500px',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '2rem',
        border: '2px solid #f1f5f9',
        overflow: 'hidden'
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
        zIndex: 10,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
    },
    treeArea: { position: 'relative', width: '100%', height: '100%' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
    node: {
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        border: '2px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        position: 'relative',
        backgroundColor: '#fff'
    },
    nodeValue: { fontWeight: '800', fontSize: '1.2rem', color: '#1e293b' },
    heightLabel: { fontSize: '0.65rem', fontWeight: '700' },
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

export default AVLTree;
