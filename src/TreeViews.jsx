import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeViews = () => {
    const [view, setView] = useState('none');
    const [activeNodes, setActiveNodes] = useState([]);
    const [message, setMessage] = useState("");
    const [activeLang, setActiveLang] = useState('python');
    const nodeRefs = useRef({});
    const containerRef = useRef(null);

    // Static tree structure for consistent visualization
    const tree = {
        id: "1",
        name: "Grandparent",
        role: "Root",
        avatar: "🧙‍♂️",
        level: 0,
        hd: 0,
        children: [
            {
                id: "2",
                name: "Parent A",
                role: "Left Child",
                avatar: "👨‍💼",
                level: 1,
                hd: -1,
                children: [
                    { id: "4", name: "Child 1", role: "Grandchild", avatar: "👶", level: 2, hd: -2, children: [] },
                    { id: "5", name: "Child 2", role: "Grandchild", avatar: "👧", level: 2, hd: 0, children: [] }
                ]
            },
            {
                id: "3",
                name: "Parent B",
                role: "Right Child",
                avatar: "👩‍💼",
                level: 1,
                hd: 1,
                children: [
                    { id: "6", name: "Child 3", role: "Grandchild", avatar: "👦", level: 2, hd: 0, children: [] },
                    { id: "7", name: "Child 4", role: "Grandchild", avatar: "👶", level: 2, hd: 2, children: [] }
                ]
            }
        ]
    };

    const getViewNodes = (type) => {
        const nodes = [];
        const flatNodes = [];
        const traverse = (node) => {
            flatNodes.push(node);
            node.children.forEach(traverse);
        };
        traverse(tree);

        if (type === 'left') {
            const levels = {};
            flatNodes.forEach(n => {
                if (levels[n.level] === undefined) levels[n.level] = n.id;
            });
            return Object.values(levels);
        } else if (type === 'right') {
            const levels = {};
            flatNodes.forEach(n => {
                levels[n.level] = n.id;
            });
            return Object.values(levels);
        } else if (type === 'top') {
            const hds = {};
            // Level order to ensure we see the highest node for each HD
            const queue = [tree];
            while (queue.length > 0) {
                const n = queue.shift();
                if (hds[n.hd] === undefined) hds[n.hd] = n.id;
                n.children.forEach(c => queue.push(c));
            }
            // Sort by HD key
            return Object.keys(hds).sort((a, b) => a - b).map(k => hds[k]);
        } else if (type === 'bottom') {
            const hds = {};
            const queue = [tree];
            while (queue.length > 0) {
                const n = queue.shift();
                hds[n.hd] = n.id; // Keep overwriting to get the deepest/last node
                n.children.forEach(c => queue.push(c));
            }
            return Object.keys(hds).sort((a, b) => a - b).map(k => hds[k]);
        }
        return [];
    };

    const getNodeName = (id) => {
        const find = (node) => {
            if (node.id === id) return node.name;
            for (let c of node.children) {
                const res = find(c);
                if (res) return res;
            }
            return null;
        };
        return find(tree);
    };

    const handleViewChange = (v) => {
        setView(v);
        if (v === 'none') {
            setActiveNodes([]);
            setMessage("");
        } else {
            const nodes = getViewNodes(v);
            setActiveNodes(nodes);
            const names = nodes.map(getNodeName).join(", ");
            setMessage(`${v.charAt(0).toUpperCase() + v.slice(1)} View: ${names}`);
        }
    };

    // Auto-play animation cycle
    useEffect(() => {
        const views = ['left', 'right', 'top', 'bottom'];
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            handleViewChange(views[currentIndex]);
            currentIndex = (currentIndex + 1) % views.length;
        }, 3000);

        const timer = setTimeout(() => {
            clearInterval(interval);
            handleViewChange('none');
        }, 13000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

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

                        const isPathVisible = activeNodes.includes(node.id) && activeNodes.includes(child.id);

                        return (
                            <motion.path
                                key={`path-${node.id}-${child.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none"
                                stroke={isPathVisible ? "#4f46e5" : "#cbd5e1"}
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
        const isVisible = activeNodes.includes(node.id);
        const isDimmed = view !== 'none' && !isVisible;

        return (
            <div style={{ ...styles.treeBranch, marginTop: level === 0 ? 0 : '40px' }}>
                <motion.div
                    ref={el => nodeRefs.current[node.id] = el}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isDimmed ? 0.3 : 1,
                        scale: isVisible ? 1.1 : 1,
                        backgroundColor: isVisible ? '#4f46e5' : '#fff',
                        borderColor: isVisible ? '#4f46e5' : '#e2e8f0',
                        boxShadow: isVisible ? '0 10px 15px -3px rgba(79, 70, 229, 0.4)' : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                    }}
                    style={styles.node}
                >
                    <motion.div
                        animate={isVisible ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: isVisible ? Infinity : 0, duration: 1.5 }}
                        style={{ ...styles.avatar, color: isVisible ? '#fff' : 'inherit' }}
                    >
                        {node.avatar}
                    </motion.div>
                    <div style={{ ...styles.nodeName, color: isVisible ? '#fff' : '#1e293b' }}>{node.name}</div>
                    <div style={{ ...styles.nodeRole, color: isVisible ? '#e0e7ff' : '#64748b' }}>{node.role}</div>
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

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Binary Tree Views – Left, Right & Top Sightseeing</h2>
                <p style={styles.intro}>
                    From different angles, you see different nodes of a tree — like sightseeing a family tree from left, right, top or bottom. Some relatives hide behind others!
                </p>
            </div>

            <div style={styles.controls}>
                <button onClick={() => handleViewChange('left')} style={{ ...styles.controlBtn, backgroundColor: view === 'left' ? '#4f46e5' : '#fff', color: view === 'left' ? '#fff' : '#4f46e5', border: '2px solid #4f46e5' }}>Left View</button>
                <button onClick={() => handleViewChange('right')} style={{ ...styles.controlBtn, backgroundColor: view === 'right' ? '#4f46e5' : '#fff', color: view === 'right' ? '#fff' : '#4f46e5', border: '2px solid #4f46e5' }}>Right View</button>
                <button onClick={() => handleViewChange('top')} style={{ ...styles.controlBtn, backgroundColor: view === 'top' ? '#4f46e5' : '#fff', color: view === 'top' ? '#fff' : '#4f46e5', border: '2px solid #4f46e5' }}>Top View</button>
                <button onClick={() => handleViewChange('bottom')} style={{ ...styles.controlBtn, backgroundColor: view === 'bottom' ? '#4f46e5' : '#fff', color: view === 'bottom' ? '#fff' : '#4f46e5', border: '2px solid #4f46e5' }}>Bottom View</button>
                <button onClick={() => handleViewChange('none')} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset</button>
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
                {message && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={styles.messageBanner}>{message}</motion.div>}
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Quiz Time!</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "In left view, which nodes are always visible?", a: "The leftmost node at each level." },
                        { q: "In right view, is the leftmost leaf ever visible?", a: "Only if it is also the rightmost node at its level (e.g., if it's the only node)." },
                        { q: "What is top view of a tree?", a: "Nodes that are not covered by any node above them when viewed from the top." },
                        { q: "For the current tree, list nodes in left view.", a: "Grandparent, Parent A, Child 1." },
                        { q: "How are left/right views useful in problems?", a: "Useful for level-order processing and hierarchy analysis." }
                    ].map((item, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {item.q}</p>
                            <p style={styles.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Implementation (Python)</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <pre style={styles.codeBox}>
                        {activeLang === 'python' && `def leftView(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.pop(0)
            if i == 0:
                result.append(node.value)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return result`}
                        {activeLang === 'javascript' && `function leftView(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    while (queue.length > 0) {
        let levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (i === 0) result.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}`}
                        {activeLang === 'cpp' && `vector<int> leftView(Node* root) {
    if (!root) return {};
    vector<int> res;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        int n = q.size();
        for (int i = 0; i < n; i++) {
            Node* temp = q.front();
            q.pop();
            if (i == 0) res.push_back(temp->data);
            if (temp->left) q.push(temp->left);
            if (temp->right) q.push(temp->right);
        }
    }
    return res;
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em' },
    intro: { color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' },
    controlBtn: { padding: '0.75rem 1.5rem', borderRadius: '16px', border: 'none', backgroundColor: '#4f46e5', color: 'white', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    visualizer: { position: 'relative', minHeight: '450px', backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2.5rem', border: '2px solid #f1f5f9', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    visualizerContent: { position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 },
    treeWrapper: { position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', width: '100%' },
    treeBranch: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    node: { width: '110px', padding: '16px 12px', borderRadius: '20px', border: '2px solid #e2e8f0', textAlign: 'center', cursor: 'pointer', position: 'relative', backgroundColor: '#fff', zIndex: 3, userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    avatar: { fontSize: '1.75rem', marginBottom: '6px' },
    nodeName: { fontWeight: '800', fontSize: '0.85rem' },
    nodeRole: { fontSize: '0.75rem', fontWeight: '600' },
    childrenContainer: { display: 'flex', gap: '40px', marginTop: '0px', position: 'relative' },
    messageBanner: { position: 'absolute', top: '20px', padding: '10px 20px', backgroundColor: '#fff', color: '#4f46e5', borderRadius: '16px', fontSize: '0.95rem', fontWeight: '700', zIndex: 5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    quizGrid: { display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' },
    quizCard: { flex: '1 1 300px', maxWidth: '450px', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', textAlign: 'center' },
    question: { fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' },
    answer: { color: '#10b981', fontWeight: '800' },
    codeSection: { marginTop: '3rem' },
    codeContainer: { width: '100%', maxWidth: '800px', margin: '0 auto' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '24px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.6', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }
};

export default TreeViews;
