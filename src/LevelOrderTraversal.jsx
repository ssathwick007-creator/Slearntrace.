import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LevelOrderTraversal = () => {
    const [tree] = useState({
        id: "1",
        name: "Grandparent",
        role: "Root",
        avatar: "🧙‍♂️",
        children: [
            {
                id: "2",
                name: "Parent A",
                role: "Level 1",
                avatar: "👨‍💼",
                children: [
                    { id: "4", name: "Child A1", role: "Level 2", avatar: "👶", children: [] },
                    { id: "5", name: "Child A2", role: "Level 2", avatar: "👧", children: [] }
                ]
            },
            {
                id: "3",
                name: "Parent B",
                role: "Level 1",
                avatar: "👩‍💼",
                children: [
                    { id: "6", name: "Child B1", role: "Level 2", avatar: "👶", children: [] }
                ]
            }
        ]
    });

    const [traversing, setTraversing] = useState(false);
    const [traversalPath, setTraversalPath] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(null);
    const [activeQueue, setActiveQueue] = useState([]);
    const [outputOrder, setOutputOrder] = useState([]);
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

    const runBFS = async () => {
        if (traversing) return;
        setTraversing(true);
        setTraversalPath([]);
        setActiveQueue([tree.name]);
        setOutputOrder([]);
        setCurrentLevel(0);

        const queue = [{ node: tree, level: 0 }];
        const levels = [];

        // Pre-calculate levels for visualization
        const tempQueue = [{ node: tree, level: 0 }];
        while (tempQueue.length > 0) {
            const { node, level } = tempQueue.shift();
            if (!levels[level]) levels[level] = [];
            levels[level].push(node);
            for (const child of node.children) {
                tempQueue.push({ node: child, level: level + 1 });
            }
        }

        const visualQueue = [tree.name];

        for (let l = 0; l < levels.length; l++) {
            setCurrentLevel(l);

            // Highlight nodes in current level
            const currentLevelNodes = levels[l];

            for (const node of currentLevelNodes) {
                // Remove from queue visualization
                visualQueue.shift();
                setActiveQueue([...visualQueue]);

                // Add to traversal path (for highlight)
                setTraversalPath(prev => [...prev, node.id]);

                // Add to output order
                setOutputOrder(prev => [...prev, node.name]);

                // Add children to queue visualization
                for (const child of node.children) {
                    visualQueue.push(child.name);
                }
                setActiveQueue([...visualQueue]);

                await new Promise(r => setTimeout(r, 1000));
            }

            if (l < levels.length - 1) {
                await new Promise(r => setTimeout(r, 500));
            }
        }

        setTraversing(false);
        setActiveQueue([]);
    };

    const reset = () => {
        setTraversalPath([]);
        setTraversing(false);
        setCurrentLevel(null);
        setActiveQueue([]);
        setOutputOrder([]);
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
                                    stroke: "#475569"
                                }}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
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
        const isCurrentLevel = currentLevel === level;
        const isVisited = traversalPath.includes(node.id);

        return (
            <div style={{ ...styles.treeBranch, marginTop: level === 0 ? 0 : '40px' }}>
                <motion.div
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: isCurrentLevel && traversing ? 1.1 : 1,
                        backgroundColor: isCurrentLevel && traversing ? '#065f46' : isVisited ? '#064e3b' : '#1e293b',
                        borderColor: isCurrentLevel && traversing ? '#10b981' : isVisited ? '#10b981' : '#334155',
                        boxShadow: isCurrentLevel && traversing ? '0 0 25px rgba(16, 185, 129, 0.6)' : '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={styles.node}
                >
                    <div style={styles.avatar}>{node.avatar}</div>
                    <div style={styles.nodeName}>{node.name}</div>
                    <div style={styles.nodeRole}>{node.role}</div>
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
                <h2 style={styles.title}>Level Order Traversal — Family Photo Day</h2>
                <p style={styles.intro}>
                    Level order traversal visits family members generation by generation — like taking a group photo for each generation.
                </p>
            </div>

            <div style={styles.controls}>
                <button onClick={runBFS} style={styles.controlBtn} disabled={traversing}>
                    Start Photo Session
                </button>
                <button onClick={reset} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }} disabled={traversing}>
                    Reset
                </button>
            </div>

            <div style={styles.queueDisplay}>
                <h4 style={styles.queueTitle}>Photo Line (Queue)</h4>
                <div style={styles.queueContainer}>
                    <span style={{ color: '#64748b', marginRight: '10px' }}>Queue:</span>
                    <div style={styles.queueItems}>
                        <AnimatePresence>
                            {activeQueue.length === 0 ? (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#94a3b8' }}>[Empty]</motion.span>
                            ) : (
                                <>
                                    <span style={{ color: '#10b981' }}>[</span>
                                    {activeQueue.map((name, i) => (
                                        <motion.span
                                            key={`${name}-${i}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            style={styles.queueItem}
                                        >
                                            {name}{i < activeQueue.length - 1 ? ', ' : ''}
                                        </motion.span>
                                    ))}
                                    <span style={{ color: '#10b981' }}>]</span>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div style={styles.visualizer}>
                <div style={styles.levelIndicator}>
                    {currentLevel !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={styles.indicatorText}
                        >
                            Current Generation: <strong>Level {currentLevel}</strong>
                        </motion.div>
                    )}
                </div>
                <div ref={containerRef} style={styles.visualizerContent}>
                    <svg key={`svg-${tick}`} style={styles.svgLayer}>
                        <ConnectionLines node={tree} />
                    </svg>
                    <div style={styles.treeWrapper}>
                        <TreeNode node={tree} />
                    </div>
                </div>
                <div style={styles.outputTrail}>
                    <h4 style={styles.outputTitle}>Traversal Order:</h4>
                    <div style={styles.outputList}>
                        {outputOrder.map((name, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={styles.outputItem}
                            >
                                {name} {i < outputOrder.length - 1 ? '→ ' : ''}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>BFS Implementation (Queue)</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#10b981' : '#fff',
                                color: activeLang === lang ? '#fff' : '#64748b',
                                borderColor: activeLang === lang ? '#10b981' : '#e2e8f0',
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
                                {activeLang === 'python' && `from collections import deque

def level_order(root):
    if not root:
        return
    
    queue = deque([root])
    
    while queue:
        # Number of nodes at current level
        level_size = len(queue)
        
        for _ in range(level_size):
            node = queue.popleft()
            print(node.value) # Take photo!
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)`}
                                {activeLang === 'javascript' && `function levelOrder(root) {
    if (!root) return;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            console.log(node.value); // Take photo!
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
}`}
                                {activeLang === 'cpp' && `void levelOrder(Node* root) {
    if (root == NULL) return;
    
    queue<Node*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        
        for (int i = 0; i < levelSize; i++) {
            Node* node = q.front();
            q.pop();
            cout << node->data << " "; // Take photo!
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
}`}
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What traversal strategy does level order use?", a: "Queue" },
                        { q: "In level order traversal, which node is visited first?", a: "The Root node (Grandparent)." },
                        { q: "Why is a queue used in BFS?", a: "To maintain the FIFO order so nodes are processed in the order they were discovered, level by level." },
                        { q: "What is the traversal order of the shown tree?", a: "Grandparent → Parent A → Parent B → Child A1 → Child A2 → Child B1" }
                    ].map((quiz, idx) => (
                        <div key={idx} style={styles.quizCard}>
                            <div style={styles.quizIcon}>🤔</div>
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
    container: {
        padding: '40px',
        backgroundColor: '#F8FAFC',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        color: '#1e293b',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em' },
    intro: { color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' },
    controlBtn: {
        padding: '0.75rem 1.5rem',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#10b981',
        color: 'white',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
    },
    queueDisplay: {
        backgroundColor: '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    queueTitle: { margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b', fontWeight: '700' },
    queueContainer: { display: 'flex', alignItems: 'center' },
    queueItems: { display: 'flex', gap: '4px', fontSize: '1.1rem', fontWeight: '700', fontFamily: 'monospace' },
    queueItem: { color: '#0f172a' },
    visualizer: {
        position: 'relative',
        minHeight: '500px',
        backgroundColor: '#F1F5F9',
        borderRadius: '16px',
        padding: '40px',
        border: '2px solid #e2e8f0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    levelIndicator: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10
    },
    indicatorText: {
        backgroundColor: '#ffffff',
        padding: '8px 16px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        fontSize: '0.9rem',
        color: '#64748b'
    },
    visualizerContent: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '40px' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 },
    treeWrapper: { position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', width: '100%' },
    treeBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: {
        width: '100px',
        padding: '12px',
        borderRadius: '20px',
        border: '2px solid #334155',
        textAlign: 'center',
        position: 'relative',
        backgroundColor: '#1e293b',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    },
    avatar: { fontSize: '1.5rem', marginBottom: '4px' },
    nodeName: { fontWeight: '800', fontSize: '0.8rem', color: '#f8fafc' },
    nodeRole: { fontSize: '0.7rem', color: '#94a3b8' },
    childrenContainer: { display: 'flex', gap: '30px', marginTop: '0px', position: 'relative' },
    outputTrail: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginTop: 'auto'
    },
    outputTitle: { margin: '0 0 8px 0', fontSize: '0.85rem', color: '#64748b', fontWeight: '700' },
    outputList: { display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '1rem', fontWeight: '800', color: '#10b981' },
    outputItem: { padding: '2px' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: {
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        fontSize: '0.9rem',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    quizIcon: { fontSize: '1.5rem', marginBottom: '0.75rem' },
    question: { fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' },
    answer: { color: '#10b981', fontWeight: '800' },
    codeSection: { marginTop: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: {
        backgroundColor: '#0f172a',
        color: '#10b981',
        padding: '1.5rem',
        borderRadius: '24px',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        whiteSpace: 'pre-wrap',
        overflowX: 'auto',
        border: '1px solid #1e293b'
    }
};

export default LevelOrderTraversal;
