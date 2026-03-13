import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BinarySearchTree = () => {
    const [tree, setTree] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [searchPath, setSearchPath] = useState([]);
    const [foundNode, setFoundNode] = useState(null);
    const [status, setStatus] = useState("Ready to build your sorted library.");
    const [isAnimating, setIsAnimating] = useState(false);
    const nodeRefs = useRef({});
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);
    const [selectedNode, setSelectedNode] = useState(null);
    const [activeLang, setActiveLang] = useState('python');

    // Initial demo
    useEffect(() => {
        const demo = async () => {
            const values = [50, 30, 70, 20, 60, 80];
            for (let val of values) {
                await insertValue(val, true);
                await new Promise(r => setTimeout(r, 600));
            }
            await searchValue(60, true);
        };
        const timer = setTimeout(demo, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Re-render lines on mount, tree changes, or resize
    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        const timer = setTimeout(() => setTick(t => t + 1), 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, [tree]);

    const insertValue = (val, isDemo = false) => {
        return new Promise((resolve) => {
            const numVal = parseInt(val);
            if (isNaN(numVal)) { resolve(); return; }
            setStatus(`Inserting ${numVal}...`);
            setIsAnimating(true);
            setFoundNode(null);

            if (!tree) {
                setTree({ value: numVal, left: null, right: null, id: "root-" + Date.now() });
                setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('BinarySearchTree');
                setStatus(`Inserted ${numVal} as the library root.`);
                setInputValue("");
                resolve();
                return;
            }

            let path = [];
            const findInsertPoint = (node) => {
                path.push(node.id);
                if (numVal < node.value) {
                    if (node.left) return findInsertPoint(node.left);
                    return { parentId: node.id, side: 'left' };
                } else if (numVal > node.value) {
                    if (node.right) return findInsertPoint(node.right);
                    return { parentId: node.id, side: 'right' };
                }
                return null; // Duplicate
            };

            const result = findInsertPoint(tree);
            if (!result) {
                setStatus(`Book ${numVal} already exists on the shelf!`);
                setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('BinarySearchTree');
                resolve();
                return;
            }

            let currentStep = 0;
            const stepInterval = setInterval(() => {
                setSearchPath(path.slice(0, currentStep + 1));
                currentStep++;
                if (currentStep >= path.length) {
                    clearInterval(stepInterval);
                    setTimeout(() => {
                        const updateTree = (node) => {
                            if (node.id === result.parentId) {
                                return {
                                    ...node,
                                    [result.side]: {
                                        value: numVal,
                                        left: null,
                                        right: null,
                                        id: "node-" + Date.now(),
                                        isNew: true // Flag for entry animation
                                    }
                                };
                            }
                            const newNode = { ...node };
                            if (newNode.left) newNode.left = updateTree(newNode.left);
                            if (newNode.right) newNode.right = updateTree(newNode.right);
                            return newNode;
                        };
                        setTree(prev => updateTree(JSON.parse(JSON.stringify(prev))));
                        setSearchPath([]);
                        setStatus(`Placed book ${numVal} on the shelf.`);
                        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('BinarySearchTree');
                        setInputValue("");
                        resolve();
                    }, 400);
                }
            }, 250);
        });
    };

    const searchValue = (val, isDemo = false) => {
        return new Promise((resolve) => {
            const numVal = parseInt(val);
            if (isNaN(numVal)) { resolve(); return; }
            setStatus(`Searching for book ${numVal}...`);
            setIsAnimating(true);
            setFoundNode(null);

            let path = [];
            let current = tree;
            let found = false;

            while (current) {
                path.push(current.id);
                if (numVal === current.value) {
                    found = true;
                    break;
                }
                current = numVal < current.value ? current.left : current.right;
            }

            let currentStep = 0;
            const stepInterval = setInterval(() => {
                setSearchPath(path.slice(0, currentStep + 1));
                currentStep++;
                if (currentStep >= path.length) {
                    clearInterval(stepInterval);
                    setTimeout(() => {
                        if (found) {
                            setFoundNode(path[path.length - 1]);
                            setStatus(`Found book ${numVal}! O(log n) efficiency.`);
                        } else {
                            setStatus(`Book ${numVal} is not in the library.`);
                        }
                        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('BinarySearchTree');
                        resolve();
                    }, 400);
                }
            }, 300);
        });
    };

    const ConnectionLines = ({ node }) => {
        if (!node) return null;
        return (
            <>
                {[node.left, node.right].filter(Boolean).map((child) => {
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

                        return (
                            <motion.path
                                key={`path-${node.id}-${child.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none"
                                stroke={searchPath.includes(child.id) ? "#4f46e5" : "#cbd5e1"}
                                strokeWidth="3"
                                style={{ transition: 'stroke 0.3s ease' }}
                            />
                        );
                    }
                    return null;
                })}
                {node.left && <ConnectionLines node={node.left} />}
                {node.right && <ConnectionLines node={node.right} />}
            </>
        );
    };

    const TreeNodeComponent = ({ node, level = 0 }) => {
        if (!node) return null;
        const isActive = searchPath[searchPath.length - 1] === node.id;
        const isVisited = searchPath.includes(node.id);
        const isFound = foundNode === node.id;
        const isSelected = selectedNode === node.id;

        return (
            <div style={{ ...styles.treeBranch, marginTop: level === 0 ? 0 : '50px' }}>
                <motion.div
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={node.isNew ? { scale: 0, opacity: 0 } : false}
                    animate={{
                        scale: isFound ? 1.15 : (isActive || isSelected) ? 1.05 : 1,
                        opacity: 1,
                        backgroundColor: isFound ? '#10b981' : isActive ? '#4f46e5' : isVisited ? '#f1f5f9' : isSelected ? '#f0f9ff' : '#fff',
                        borderColor: isFound ? '#10b981' : isActive ? '#4f46e5' : isVisited ? '#4f46e5' : isSelected ? '#0ea5e9' : '#e2e8f0',
                        color: (isFound || isActive) ? '#fff' : '#1e293b',
                        boxShadow: isFound ? '0 10px 20px rgba(16, 185, 129, 0.4)' : isActive ? '0 10px 15px rgba(79, 70, 229, 0.4)' : '0 4px 6px rgba(0,0,0,0.05)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedNode(node.id); }}
                    style={styles.bookNode}
                >
                    <span style={styles.bookEmoji}>📖</span>
                    <div style={styles.bookValue}>{node.value}</div>
                </motion.div>

                {(node.left || node.right) && (
                    <div style={{ ...styles.childrenContainer, gap: `${Math.max(40, 160 / (level + 1.2))}px` }}>
                        <div style={styles.childSlot}>
                            {node.left ? <TreeNodeComponent node={node.left} level={level + 1} /> : <div style={styles.emptyLeaf} />}
                        </div>
                        <div style={styles.childSlot}>
                            {node.right ? <TreeNodeComponent node={node.right} level={level + 1} /> : <div style={styles.emptyLeaf} />}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Binary Search Tree – Sorted Family Library</h2>
                <p style={styles.intro}>
                    A Binary Search Tree keeps everything sorted — smaller values go left, larger go right — like books arranged alphabetically on a library shelf!
                </p>
            </div>

            <div style={styles.controls}>
                <div style={styles.inputGroup}>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Val"
                        style={styles.input}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); insertValue(inputValue); }}
                        style={styles.controlBtn}
                        disabled={isAnimating}
                    >
                        Insert book
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); searchValue(inputValue); }}
                        style={{ ...styles.controlBtn, backgroundColor: '#10b981' }}
                        disabled={isAnimating}
                    >
                        Search book
                    </button>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setTree(null);
                        setSearchPath([]);
                        setFoundNode(null);
                        setStatus("Library cleared.");
                        setSelectedNode(null);
                    }}
                    style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}
                >
                    Clear Library
                </button>
            </div>

            <div style={styles.statusPanel}>
                <motion.div
                    key={status}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={styles.statusText}
                >
                    {status}
                </motion.div>
            </div>

            <div style={styles.visualizer} onClick={(e) => e.stopPropagation()}>
                <div ref={containerRef} style={styles.visualizerContent}>
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={tree} />
                    </svg>
                    {tree ? (
                        <div style={styles.treeWrapper}>
                            <TreeNodeComponent node={tree} />
                        </div>
                    ) : (
                        <div style={styles.emptyState}>The library shelf is empty. Insert your first book!</div>
                    )}
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>🤔</div>
                        <p style={styles.question}><strong>Q1:</strong> Insert 50, 30, 70. Where will 40 be located?</p>
                        <p style={styles.answer}>As the right child of 30.</p>
                    </div>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>🔍</div>
                        <p style={styles.question}><strong>Q2:</strong> Search for 60 after inserts. What path is taken?</p>
                        <p style={styles.answer}>50 (root) &rarr; right (70) &rarr; left (60) &rarr; Found!</p>
                    </div>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>⚡</div>
                        <p style={styles.question}><strong>Q3:</strong> Why is search faster in BST than in a linked list?</p>
                        <p style={styles.answer}>It eliminates half the search space with each step (O(log n) vs O(n)).</p>
                    </div>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>⚠️</div>
                        <p style={styles.question}><strong>Q4:</strong> Insert 10, 20, 30 in order. What happens?</p>
                        <p style={styles.answer}>The tree becomes "skewed" like a linked list, losing efficiency.</p>
                    </div>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>💾</div>
                        <p style={styles.question}><strong>Q5:</strong> How do BST principles help in database indexing?</p>
                        <p style={styles.answer}>They allow very fast lookups even in massive datasets by following the O(log n) logic.</p>
                    </div>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Recursive Insert & Search</h3>
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
                                {activeLang === 'python' && (
                                    <>
                                        {`class `}<span style={styles.syntax.keyword}>{`TreeNode`}</span>{`:\n    def `}<span style={styles.syntax.builtin}>{`__init__`}</span>{`(`}<span style={styles.syntax.variable}>{`self`}</span>{`, value):\n        `}<span style={styles.syntax.variable}>{`self`}</span>{`.value = value\n        `}<span style={styles.syntax.variable}>{`self`}</span>{`.left = `}<span style={styles.syntax.keyword}>{`None`}</span>{`\n        `}<span style={styles.syntax.variable}>{`self`}</span>{`.right = `}<span style={styles.syntax.keyword}>{`None`}</span>{`\n\n`}<span style={styles.syntax.keyword}>{`def`}</span>{` `}<span style={styles.syntax.builtin}>{`insert`}</span>{`(root, value):\n    `}<span style={styles.syntax.keyword}>{`if not`}</span>{` root:\n        `}<span style={styles.syntax.keyword}>{`return`}</span>{` TreeNode(value)\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` value < root.value:\n        root.left = insert(root.left, value)\n    `}<span style={styles.syntax.keyword}>{`else`}</span>{`:\n        root.right = insert(root.right, value)\n    `}<span style={styles.syntax.keyword}>{`return`}</span>{` root\n\n`}<span style={styles.syntax.keyword}>{`def`}</span>{` `}<span style={styles.syntax.builtin}>{`search`}</span>{`(root, value):\n    `}<span style={styles.syntax.keyword}>{`if not`}</span>{` root `}<span style={styles.syntax.keyword}>{`or`}</span>{` root.value == value:\n        `}<span style={styles.syntax.keyword}>{`return`}</span>{` root\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` value < root.value:\n        `}<span style={styles.syntax.keyword}>{`return`}</span>{` search(root.left, value)\n    `}<span style={styles.syntax.keyword}>{`return`}</span>{` search(root.right, value)`}
                                    </>
                                )}
                                {activeLang === 'javascript' && (
                                    <>
                                        {`class `}<span style={styles.syntax.keyword}>{`TreeNode`}</span>{` {\n    `}<span style={styles.syntax.builtin}>{`constructor`}</span>{`(value) {\n        `}<span style={styles.syntax.variable}>{`this`}</span>{`.value = value;\n        `}<span style={styles.syntax.variable}>{`this`}</span>{`.left = `}<span style={styles.syntax.keyword}>{`null`}</span>{`;\n        `}<span style={styles.syntax.variable}>{`this`}</span>{`.right = `}<span style={styles.syntax.keyword}>{`null`}</span>{`;\n    }\n}\n\n`}<span style={styles.syntax.keyword}>{`function`}</span>{` `}<span style={styles.syntax.builtin}>{`insert`}</span>{`(root, value) {\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (!root) `}<span style={styles.syntax.keyword}>{`return`}</span>{` `}<span style={styles.syntax.keyword}>{`new`}</span>{` TreeNode(value);\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (value < root.value) {\n        root.left = insert(root.left, value);\n    } `}<span style={styles.syntax.keyword}>{`else`}</span>{` {\n        root.right = insert(root.right, value);\n    }\n    `}<span style={styles.syntax.keyword}>{`return`}</span>{` root;\n}\n\n`}<span style={styles.syntax.keyword}>{`function`}</span>{` `}<span style={styles.syntax.builtin}>{`search`}</span>{`(root, value) {\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (!root || root.value === value) `}<span style={styles.syntax.keyword}>{`return`}</span>{` root;\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (value < root.value) `}<span style={styles.syntax.keyword}>{`return`}</span>{` search(root.left, value);\n    `}<span style={styles.syntax.keyword}>{`return`}</span>{` search(root.right, value);\n}`}
                                    </>
                                )}
                                {activeLang === 'cpp' && (
                                    <>
                                        {<span style={styles.syntax.keyword}>{`struct`}</span>}{` `}<span style={styles.syntax.keyword}>{`TreeNode`}</span>{` {\n    `}<span style={styles.syntax.keyword}>{`int`}</span>{` value;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(`}<span style={styles.syntax.keyword}>{`int`}</span>{` val) : value(val), left(`}<span style={styles.syntax.keyword}>{`nullptr`}</span>{`), right(`}<span style={styles.syntax.keyword}>{`nullptr`}</span>{`) {}\n};\n\n`}<span style={styles.syntax.keyword}>{`TreeNode*`}</span>{` `}<span style={styles.syntax.builtin}>{`insert`}</span>{`(TreeNode* root, `}<span style={styles.syntax.keyword}>{`int`}</span>{` value) {\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (!root) `}<span style={styles.syntax.keyword}>{`return`}</span>{` `}<span style={styles.syntax.keyword}>{`new`}</span>{` TreeNode(value);\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (value < root->value) root->left = insert(root->left, value);\n    `}<span style={styles.syntax.keyword}>{`else`}</span>{` root->right = insert(root->right, value);\n    `}<span style={styles.syntax.keyword}>{`return`}</span>{` root;\n}\n\n`}<span style={styles.syntax.keyword}>{`TreeNode*`}</span>{` `}<span style={styles.syntax.builtin}>{`search`}</span>{`(TreeNode* root, `}<span style={styles.syntax.keyword}>{`int`}</span>{` value) {\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (!root || root->value == value) `}<span style={styles.syntax.keyword}>{`return`}</span>{` root;\n    `}<span style={styles.syntax.keyword}>{`if`}</span>{` (value < root->value) `}<span style={styles.syntax.keyword}>{`return`}</span>{` search(root->left, value);\n    `}<span style={styles.syntax.keyword}>{`return`}</span>{` search(root->right, value);\n}`}
                                    </>
                                )}
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', marginTop: '2rem' },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em' },
    intro: { color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' },
    inputGroup: { display: 'flex', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' },
    input: { padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', width: '70px', fontWeight: '800', outline: 'none' },
    controlBtn: {
        padding: '0.75rem 1.5rem',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontWeight: '800',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
    },
    statusPanel: { minHeight: '40px', display: 'flex', justifyContent: 'center', marginBottom: '2rem' },
    statusText: {
        padding: '8px 20px',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        borderRadius: '20px',
        fontWeight: '800',
        fontSize: '0.9rem',
        border: '1px solid #e2e8f0'
    },
    visualizer: {
        minHeight: '520px',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '2rem',
        border: '2px solid #f1f5f9',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    visualizerContent: { position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' },
    svgLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
    },
    emptyState: { color: '#94a3b8', fontSize: '1.2rem', fontWeight: '600', marginTop: '100px', textAlign: 'center' },
    treeWrapper: { display: 'flex', justifyContent: 'center', width: '100%' },
    treeBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' },
    bookNode: {
        width: '70px',
        height: '90px',
        borderRadius: '12px',
        border: '2px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex: 3,
        userSelect: 'none',
        cursor: 'default'
    },
    bookEmoji: { fontSize: '1.75rem', marginBottom: '4px' },
    bookValue: { fontWeight: '900', fontSize: '1.1rem' },
    childrenContainer: { display: 'flex', marginTop: '0px', position: 'relative', justifyContent: 'center' },
    childSlot: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    emptyLeaf: { width: '40px' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', letterSpacing: '-0.025em' },
    quizGrid: { display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' },
    quizCard: {
        flex: '1 1 300px',
        maxWidth: '450px',
        padding: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #f1f5f9',
        fontSize: '0.95rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
    },
    quizIcon: { fontSize: '2rem', marginBottom: '1rem' },
    question: { fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', lineHeight: '1.5' },
    answer: { color: '#10b981', fontWeight: '800', fontSize: '1.1rem', marginTop: '0.5rem' },
    codeSection: { marginTop: '3rem' },
    codeGrid: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' },
    codeColumn: { width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: {
        padding: '0.6rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        fontSize: '0.85rem',
        fontWeight: '800',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    codeContainer: { width: '100%', maxWidth: '800px', margin: '0 auto' },
    codeLabel: { fontSize: '0.8rem', fontWeight: '900', color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' },
    codeBox: {
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '24px',
        overflowX: 'auto',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        margin: 0,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #1e293b',
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    },
    syntax: {
        keyword: { color: '#c084fc', fontWeight: '700' },
        builtin: { color: '#60a5fa' },
        string: { color: '#10b981' },
        comment: { color: '#64748b', fontStyle: 'italic' },
        variable: { color: '#fbbf24' }
    }
};

export default BinarySearchTree;
