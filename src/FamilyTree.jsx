import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FamilyTree = () => {
    const [tree, setTree] = useState({
        id: "1",
        name: "Grandparent",
        role: "Root",
        avatar: "🧙‍♂️",
        children: [
            { id: "2", name: "Parent A", role: "Child", avatar: "👨‍💼", children: [] },
            { id: "3", name: "Parent B", role: "Child", avatar: "👩‍💼", children: [] }
        ]
    });

    const [selectedNode, setSelectedNode] = useState(null);
    const [traversing, setTraversing] = useState(false);
    const [traversalPath, setTraversalPath] = useState([]);
    const [message, setMessage] = useState("");
    const [showCycleError, setShowCycleError] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const nodeRefs = useRef({});
    const containerRef = useRef(null);

    // Auto-play animation cycle
    useEffect(() => {
        const timer = setTimeout(() => {
            startAutoDemo();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const startAutoDemo = async () => {
        // 0–4s: Pre-order traversal
        await runTraversal();

        // 4–8s: Add child demo
        await new Promise(r => setTimeout(r, 1000));
        setMessage("Adding a new member to the family...");
        const newNodeId = "new-" + Date.now();
        const newNode = { id: newNodeId, name: "New Child", role: "Grandchild", avatar: "👶", children: [] };
        setTree(prev => {
            const next = JSON.parse(JSON.stringify(prev));
            if (next.children[0] && next.children[0].children.length < 2) {
                next.children[0].children.push(newNode);
            }
            return next;
        });

        // 8–12s: Cycle attempt demo
        await new Promise(r => setTimeout(r, 2000));
        setShowCycleError(true);
        setMessage("Oops! Trees cannot have cycles - every node has exactly one parent.");
        setTimeout(() => {
            setShowCycleError(false);
            setMessage("");
        }, 3000);
    };

    const runTraversal = async () => {
        setTraversing(true);
        const path = [];
        const traverse = (node) => {
            path.push(node.id);
            node.children.forEach(traverse);
        };
        traverse(tree);

        for (let i = 0; i <= path.length; i++) {
            setTraversalPath(path.slice(0, i));
            await new Promise(r => setTimeout(r, 400)); // Smoother, faster delay
        }
        setTraversing(false);
        setTraversalPath([]);
    };

    const addChild = (parentId) => {
        const newNodeName = prompt("Enter name for the new member:");
        if (!newNodeName) return;

        const newNode = {
            id: String(Date.now()),
            name: newNodeName,
            role: "Member",
            avatar: "👶",
            children: []
        };

        const updateTree = (node) => {
            if (node.id === parentId) {
                if (node.children.length >= 2) {
                    alert("This is a binary tree metaphor - max 2 children!");
                    return node;
                }
                return { ...node, children: [...node.children, newNode] };
            }
            return { ...node, children: node.children.map(updateTree) };
        };

        setTree(updateTree(tree));
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

                        return (
                            <motion.path
                                key={`path-${node.id}-${child.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none"
                                stroke={traversalPath.includes(child.id) ? "#4f46e5" : "#cbd5e1"}
                                strokeWidth="3"
                                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
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
        const isActive = traversalPath[traversalPath.length - 1] === node.id;
        const isVisited = traversalPath.includes(node.id);
        const isSelected = selectedNode === node.id;

        return (
            <div style={{ ...styles.treeBranch, marginTop: level === 0 ? 0 : '40px' }}>
                <motion.div
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: isActive ? 1.1 : 1, // Slight scale for highlight
                        backgroundColor: isActive ? '#4f46e5' : isVisited ? '#f1f5f9' : isSelected ? '#f0f9ff' : '#fff',
                        borderColor: isActive ? '#4f46e5' : isVisited ? '#4f46e5' : isSelected ? '#0ea5e9' : '#e2e8f0',
                        boxShadow: isActive ? '0 10px 15px -3px rgba(79, 70, 229, 0.4)' : isSelected ? '0 0 15px rgba(14, 165, 233, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        backgroundColor: { duration: 0.2 },
                        borderColor: { duration: 0.2 }
                    }}
                    onClick={() => setSelectedNode(node.id)}
                    style={{
                        ...styles.node,
                        // Ensure background color transition is smooth
                        transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s'
                    }}
                >
                    <motion.div
                        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: isActive ? Infinity : 0, duration: 0.8 }}
                        style={{ ...styles.avatar, color: isVisited && !isActive ? '#4f46e5' : isActive ? '#fff' : 'inherit' }}
                    >
                        {node.avatar}
                    </motion.div>
                    <div style={{ ...styles.nodeName, color: isActive ? '#fff' : '#1e293b' }}>{node.name}</div>
                    <div style={{ ...styles.nodeRole, color: isActive ? '#e0e7ff' : '#64748b' }}>{node.role}</div>

                    <AnimatePresence>
                        {isSelected && !traversing && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onClick={(e) => { e.stopPropagation(); addChild(node.id); }}
                                style={styles.addBtn}
                            >
                                + Add Member
                            </motion.button>
                        )}
                    </AnimatePresence>
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

    // Re-render lines on mount, when tree changes, or window resizes
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        // Small delay to ensure DOM is ready for getBoundingClientRect
        const timer = setTimeout(() => setTick(t => t + 1), 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, [tree]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Trees – Family Tree Hierarchy</h2>
                <p style={styles.intro}>
                    Trees organize data like a family tree — each node has up to two children, no cycles!
                </p>
            </div>

            <div style={styles.controls}>
                <button onClick={runTraversal} style={styles.controlBtn} disabled={traversing}>
                    {traversing ? "Traversing..." : "Traverse (Pre-order)"}
                </button>
                <button onClick={() => {
                    setTree({ id: "1", name: "Grandparent", role: "Root", avatar: "🧙‍♂️", children: [] });
                    setSelectedNode(null);
                }} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>
                    Reset Tree
                </button>
            </div>

            <div style={styles.visualizer}>
                <div
                    ref={containerRef}
                    className="visualizer-content"
                    style={styles.visualizerContent}
                >
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={tree} />
                    </svg>
                    <div style={styles.treeWrapper}>
                        <TreeNode node={tree} />
                    </div>
                </div>

                <AnimatePresence>
                    {showCycleError && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            style={styles.errorOverlay}
                        >
                            <div style={styles.errorIcon}>🚫</div>
                            <div style={styles.errorText}>Trees cannot have cycles!</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>Every node must have exactly one parent.</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {message && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={styles.messageBanner}>{message}</motion.div>}
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>🤔</div>
                        <p style={styles.question}><strong>Q:</strong> If a root has two children, how many nodes are in the tree total?</p>
                        <p style={styles.answer}>3 nodes (Root + 2 Children)</p>
                    </div>
                    <div style={styles.quizCard}>
                        <div style={styles.quizIcon}>🚫</div>
                        <p style={styles.question}><strong>Q:</strong> Can a node in a tree have two different parents?</p>
                        <p style={styles.answer}>No. In a tree, every node (except the root) has exactly one parent.</p>
                    </div>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>TreeNode Definition</h3>
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
                                        {`class `}<span style={styles.syntax.keyword}>{`TreeNode`}</span>{`:\n    def `}<span style={styles.syntax.builtin}>{`__init__`}</span>{`(`}<span style={styles.syntax.variable}>{`self`}</span>{`, value):\n        `}<span style={styles.syntax.variable}>{`self`}</span>{`.value = value\n        `}<span style={styles.syntax.variable}>{`self`}</span>{`.left = `}<span style={styles.syntax.keyword}>{`None`}</span>{`\n        `}<span style={styles.syntax.variable}>{`self`}</span>{`.right = `}<span style={styles.syntax.keyword}>{`None`}</span>{`\n\n`}<span style={styles.syntax.comment}>{`# Example`}</span>{`\nroot = TreeNode(`}<span style={styles.syntax.string}>{`"Grandparent"`}</span>{`)`}
                                    </>
                                )}
                                {activeLang === 'javascript' && (
                                    <>
                                        {`class `}<span style={styles.syntax.keyword}>{`TreeNode`}</span>{` {\n    `}<span style={styles.syntax.builtin}>{`constructor`}</span>{`(value) {\n        `}<span style={styles.syntax.variable}>{`this`}</span>{`.value = value;\n        `}<span style={styles.syntax.variable}>{`this`}</span>{`.left = `}<span style={styles.syntax.keyword}>{`null`}</span>{`;\n        `}<span style={styles.syntax.variable}>{`this`}</span>{`.right = `}<span style={styles.syntax.keyword}>{`null`}</span>{`;\n    }\n}\n\n`}<span style={styles.syntax.comment}>{`// Example`}</span>{`\n`}<span style={styles.syntax.keyword}>{`const`}</span>{` root = `}<span style={styles.syntax.keyword}>{`new`}</span>{` TreeNode(`}<span style={styles.syntax.string}>{`"Grandparent"`}</span>{`);`}
                                    </>
                                )}
                                {activeLang === 'cpp' && (
                                    <>
                                        {<span style={styles.syntax.keyword}>{`struct`}</span>}{` `}<span style={styles.syntax.keyword}>{`TreeNode`}</span>{` {\n    `}<span style={styles.syntax.keyword}>{`int`}</span>{` value;\n    TreeNode* left;\n    TreeNode* right;\n    \n    TreeNode(`}<span style={styles.syntax.keyword}>{`int`}</span>{` val) : value(val), left(`}<span style={styles.syntax.keyword}>{`nullptr`}</span>{`), right(`}<span style={styles.syntax.keyword}>{`nullptr`}</span>{`) {}\n};\n\n`}<span style={styles.syntax.comment}>{`// Example`}</span>{`\nTreeNode* root = `}<span style={styles.syntax.keyword}>{`new`}</span>{` TreeNode(`}<span style={styles.syntax.variable}>{`50`}</span>{`);`}
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
        minHeight: '450px',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '2px solid #f1f5f9',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    visualizerContent: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    svgLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
    },
    messageBanner: {
        position: 'absolute',
        top: '20px',
        padding: '10px 20px',
        backgroundColor: '#fff',
        color: '#4f46e5',
        borderRadius: '16px',
        fontSize: '0.95rem',
        fontWeight: '700',
        zIndex: 5,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
    },
    errorOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '2.5rem',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.2)',
        textAlign: 'center',
        zIndex: 10,
        border: '2px solid #fee2e2'
    },
    errorIcon: { fontSize: '3.5rem', marginBottom: '12px' },
    errorText: { color: '#ef4444', fontWeight: '900', fontSize: '1.2rem' },
    treeWrapper: { position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', width: '100%' },
    treeBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: {
        width: '110px',
        padding: '16px 12px',
        borderRadius: '20px',
        border: '2px solid #e2e8f0',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#fff',
        zIndex: 3,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: { fontSize: '1.75rem', marginBottom: '6px' },
    nodeName: { fontWeight: '800', fontSize: '0.85rem', color: '#1e293b' },
    nodeRole: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },
    addBtn: {
        position: 'absolute',
        bottom: '-35px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '6px 12px',
        fontSize: '0.75rem',
        fontWeight: '800',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
    },
    childrenContainer: {
        display: 'flex',
        gap: '60px',
        marginTop: '0px',
        position: 'relative'
    },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', letterSpacing: '-0.025em' },
    quizGrid: {
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
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
    answer: { color: '#10b981', fontWeight: '800', fontSize: '1rem', marginTop: '0.5rem' },
    codeSection: { marginTop: '3rem' },
    codeGrid: {
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    codeColumn: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
    },
    langSelector: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '1.25rem'
    },
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
    codeContainer: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
    },
    codeLabel: {
        fontSize: '0.8rem',
        fontWeight: '900',
        color: '#64748b',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        textAlign: 'center'
    },
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

export default FamilyTree;
