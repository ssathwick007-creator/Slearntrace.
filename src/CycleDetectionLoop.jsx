import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CycleDetectionLoop = () => {
    // Initial nodes and edges for the city network
    const initialNodes = [
        { id: 'A', x: 350, y: 50, label: 'City A' },
        { id: 'B', x: 250, y: 150, label: 'City B' },
        { id: 'C', x: 450, y: 150, label: 'City C' },
        { id: 'D', x: 350, y: 250, label: 'City D' },
        { id: 'E', x: 550, y: 250, label: 'City E' },
    ];

    const initialEdges = [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'D' },
        { from: 'D', to: 'B' },
        { from: 'C', to: 'E' },
    ];

    const [nodes] = useState(initialNodes);
    const [edges] = useState(initialEdges);

    // Algorithm State
    const [visited, setVisited] = useState(new Set());
    const [recStack, setRecStack] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [cycleFound, setCycleFound] = useState(false);
    const [cycleEdges, setCycleEdges] = useState([]);
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);

    // UI State
    const [activeLang, setActiveLang] = useState('python');
    const [message, setMessage] = useState("Click 'Start Cycle Detection' to begin.");

    // Generate DFS steps for cycle detection
    const generateSteps = () => {
        const visitedNodes = new Set();
        const stack = [];
        const allSteps = [];

        const dfs = (u, p = null) => {
            visitedNodes.add(u);
            stack.push(u);

            allSteps.push({
                type: 'visit',
                node: u,
                visited: new Set(visitedNodes),
                recStack: [...stack],
                message: `Start DFS traversal from node ${u}.`
            });

            const neighbors = initialEdges.filter(e => e.from === u).map(e => e.to);

            for (const v of neighbors) {
                if (stack.includes(v)) {
                    // Cycle detected
                    const cycleNodeIdx = stack.indexOf(v);
                    const cyclePath = stack.slice(cycleNodeIdx);
                    const cycleEdgesList = [];
                    for (let i = 0; i < cyclePath.length; i++) {
                        cycleEdgesList.push({ from: cyclePath[i], to: cyclePath[(i + 1) % cyclePath.length] });
                    }

                    allSteps.push({
                        type: 'cycle',
                        node: v,
                        visited: new Set(visitedNodes),
                        recStack: [...stack],
                        cycleNodes: cyclePath,
                        cycleEdges: cycleEdgesList,
                        message: `Cycle Detected! Node ${v} is already in the recursion stack.`
                    });
                    return true;
                }

                if (!visitedNodes.has(v)) {
                    if (dfs(v, u)) return true;
                }
            }

            stack.pop();
            allSteps.push({
                type: 'backtrack',
                node: u,
                visited: new Set(visitedNodes),
                recStack: [...stack],
                message: `Backtracking from ${u}.`
            });
            return false;
        };

        // Start DFS from A as requested
        dfs('A');
        return allSteps;
    };

    const startDetection = () => {
        const newSteps = generateSteps();
        setSteps(newSteps);
        setCurrentStepIndex(0);
        setIsAnimating(true);
        applyStep(newSteps[0]);
    };

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            const nextIdx = currentStepIndex + 1;
            setCurrentStepIndex(nextIdx);
            applyStep(steps[nextIdx]);
        } else {
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('CycleDetectionLoop');
        }
    };

    const applyStep = (step) => {
        setCurrentNode(step.node);
        setVisited(step.visited);
        setRecStack(step.recStack);
        setMessage(step.message);

        if (step.type === 'cycle') {
            setCycleFound(true);
            setCycleEdges(step.cycleEdges);
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('CycleDetectionLoop');
        } else {
            setCycleFound(false);
            setCycleEdges([]);
        }
    };

    const resetGraph = () => {
        setVisited(new Set());
        setRecStack([]);
        setCurrentNode(null);
        setCycleFound(false);
        setCycleEdges([]);
        setSteps([]);
        setCurrentStepIndex(-1);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('CycleDetectionLoop');
        setMessage("Click 'Start Cycle Detection' to begin.");
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: DFS-based Cycle Detection</h4>
            <div style={styles.algoGrid}>
                <div><strong>Time Complexity:</strong> O(V + E)</div>
                <div><strong>Space Complexity:</strong> O(V) (Recursion Stack)</div>
                <div><strong>Use Case:</strong> Deadlock Detection, Dependency Resolution</div>
            </div>
        </div>
    );

    const renderEdge = (edge, index) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);

        if (!fromNode || !toNode) return null;

        const isCycleEdge = cycleEdges.some(ce => ce.from === edge.from && ce.to === edge.to);
        const nodeRadius = 24; // Standardized for 48px diameter

        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const angle = Math.atan2(dy, dx);

        const x1 = fromNode.x + nodeRadius * Math.cos(angle);
        const y1 = fromNode.y + nodeRadius * Math.sin(angle);
        const x2 = toNode.x - nodeRadius * Math.cos(angle);
        const y2 = toNode.y - nodeRadius * Math.sin(angle);

        return (
            <motion.line
                key={`edge-${index}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                x1={x1}
                y1={y1}
                x2={x1 + (x2 - x1) * 0.98}
                y2={y1 + (y2 - y1) * 0.98}
                stroke={isCycleEdge ? "#EF4444" : "#64748B"}
                strokeWidth={isCycleEdge ? "3" : "2.5"}
                markerEnd={`url(#arrowhead-${isCycleEdge ? 'red' : 'gray'})`}
            />
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Cycle Detection — Infinite Road Loop</h2>
                <div style={styles.description}>
                    <p>Imagine driving through a network of cities.</p>
                    <p>If the roads form a loop, the driver may end up traveling in circles forever.</p>
                    <p>Detecting such loops in a graph is called <strong>Cycle Detection</strong>. It helps prevent infinite loops in networks, operating systems, and dependency systems.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <AlgorithmInfo />
                <div style={styles.sidePanel}>
                    <h4 style={styles.panelTitle}>Recursion Stack</h4>
                    <div style={styles.stackContainer}>
                        {recStack.length === 0 ? (
                            <span style={styles.emptyStack}>[ Empty ]</span>
                        ) : (
                            <div style={styles.stackDisplay}>
                                [{recStack.join(', ')}]
                            </div>
                        )}
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={startDetection} disabled={isAnimating || steps.length > 0} style={styles.controlBtn}>Start Cycle Detection</button>
                    <button onClick={nextStep} disabled={!isAnimating && currentStepIndex >= steps.length - 1} style={styles.controlBtn}>Next Step</button>
                    <button onClick={resetGraph} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Graph</button>
                </div>

                <div style={styles.canvas}>
                    <svg width="100%" height="100%" viewBox="0 0 700 350">
                        <defs>
                            <marker id="arrowhead-gray" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
                            </marker>
                            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                            </marker>
                        </defs>
                        {edges.map((edge, i) => renderEdge(edge, i))}
                        {nodes.map(node => {
                            const isCurrent = currentNode === node.id;
                            const isVisited = visited.has(node.id);
                            const isInRecStack = recStack.includes(node.id);
                            const isCycleNode = cycleFound && (recStack.includes(node.id) || cycleEdges.some(ce => ce.from === node.id || ce.to === node.id));

                            let fillColor = '#fff';
                            let strokeColor = '#64748b';

                            if (isCycleNode) {
                                fillColor = '#fff';
                                strokeColor = '#EF4444';
                            } else if (isCurrent) {
                                fillColor = '#FACC15';
                                strokeColor = '#FACC15';
                            } else if (isVisited) {
                                fillColor = '#fff';
                                strokeColor = '#22C55E';
                            } else {
                                fillColor = '#fff';
                                strokeColor = '#2563EB';
                            }

                            return (
                                <motion.g key={node.id}>
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="24"
                                        fill={fillColor}
                                        stroke={strokeColor}
                                        strokeWidth="2"
                                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                                    />
                                    <text x={node.x} y={node.y + 5} textAnchor="middle" style={styles.nodeText}>{node.id}</text>
                                    <text x={node.x} y={node.y + 40} textAnchor="middle" style={styles.nodeLabel}>{node.label}</text>
                                </motion.g>
                            );
                        })}
                    </svg>
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                style={{
                                    ...styles.message,
                                    backgroundColor: cycleFound ? '#ef4444' : '#1e293b'
                                }}
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>DFS-based Cycle Detection</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#10b981' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <pre style={styles.codeBox}>
                        {activeLang === 'python' && (
                            <code>{`def has_cycle(u, visited, rec_stack):
    visited.add(u)
    rec_stack.add(u)

    for v in adj[u]:
        if v in rec_stack:
            return True # Cycle detected
        if v not in visited:
            if has_cycle(v, visited, rec_stack):
                return True
                
    rec_stack.remove(u)
    return False`}</code>
                        )}
                        {activeLang === 'javascript' && (
                            <code>{`function hasCycle(u, visited, recStack) {
    visited.add(u);
    recStack.add(u);

    for (let v of adj[u]) {
        if (recStack.has(v)) return true;
        if (!visited.has(v)) {
            if (hasCycle(v, visited, recStack)) return true;
        }
    }

    recStack.delete(u);
    return false;
}`}</code>
                        )}
                        {activeLang === 'cpp' && (
                            <code>{`bool hasCycle(int u, vector<bool>& visited, vector<bool>& recStack) {
    visited[u] = true;
    recStack[u] = true;

    for (int v : adj[u]) {
        if (recStack[v]) return true;
        if (!visited[v]) {
            if (hasCycle(v, visited, recStack)) return true;
        }
    }

    recStack[u] = false;
    return false;
}`}</code>
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is a cycle in a graph?", a: "A path of edges and vertices wherein a vertex is reachable from itself." },
                        { q: "Why can cycles be problematic in networks?", a: "They can cause infinite loops, deadlocks in operating systems, or routing issues." },
                        { q: "Which traversal algorithm is commonly used to detect cycles?", a: "DFS (Depth First Search) is most effective for cycle detection." },
                        { q: "What does the recursion stack track in DFS?", a: "It tracks nodes currently being explored in the active traversal path." }
                    ].map((item, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {item.q}</p>
                            <p style={styles.answer}>{item.a}</p>
                        </div>
                    ))}
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
        fontFamily: 'system-ui, sans-serif'
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    description: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' },
    visualizerArea: {
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid #f1f5f9',
        position: 'relative',
        marginBottom: '3rem'
    },
    sidePanel: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        zIndex: 5,
        minWidth: '150px'
    },
    panelTitle: { margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#64748b' },
    stackContainer: { fontSize: '1.1rem', fontWeight: '700', color: '#22C55E' },
    emptyStack: { color: '#94a3b8', fontStyle: 'italic' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
    controlBtn: {
        padding: '0.7rem 1.4rem',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#2563EB',
        color: '#fff',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    canvas: {
        width: '100%',
        height: '350px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        position: 'relative'
    },
    nodeText: { fontSize: '16px', fontWeight: '900', fill: '#1e293b' },
    nodeLabel: { fontSize: '12px', fontWeight: '600', fill: '#64748b' },
    message: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#fff',
        padding: '0.8rem 1.5rem',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        zIndex: 10
    },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    codeSection: { marginBottom: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: 'none',
        fontSize: '0.85rem',
        fontWeight: '700',
        cursor: 'pointer'
    },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: {
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '20px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6'
    },
    quizSection: { marginTop: '3rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: {
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '20px',
        border: '1px solid #f1f5f9'
    },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' },
    answer: { color: '#10b981', fontWeight: '600' },
    algoInfo: {
        backgroundColor: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    algoTitle: { margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1rem', fontWeight: '800' },
    algoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#64748b' }
};

export default CycleDetectionLoop;
