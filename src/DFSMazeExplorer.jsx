import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DFSMazeExplorer = () => {
    // Fixed graph structure
    const nodes = [
        { id: 'A', x: 350, y: 50, label: 'Maze Entrance A' },
        { id: 'B', x: 250, y: 150, label: 'City B' },
        { id: 'C', x: 450, y: 150, label: 'City C' },
        { id: 'D', x: 350, y: 250, label: 'City D' },
        { id: 'E', x: 450, y: 350, label: 'City E' },
    ];

    const edges = [
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'E' },
    ];

    const adjList = {
        'A': ['B', 'C'],
        'B': ['D'],
        'C': ['E'],
        'D': [],
        'E': []
    };

    const [startCity, setStartCity] = useState('A');
    const [stack, setStack] = useState([]);
    const [visited, setVisited] = useState(new Set());
    const [backtracked, setBacktracked] = useState(new Set());
    const [activeNode, setActiveNode] = useState(null);
    const [visitedOrder, setVisitedOrder] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeLang, setActiveLang] = useState('python');

    const resetExploration = useCallback(() => {
        setStack([]);
        setVisited(new Set());
        setBacktracked(new Set());
        setActiveNode(null);
        setVisitedOrder([]);
        setIsRunning(false);
    }, []);

    const startDFS = () => {
        resetExploration();
        setStack([startCity]);
        setIsRunning(true);
    };

    const nextStep = () => {
        if (stack.length === 0) {
            setIsRunning(false);
            setActiveNode(null);
            return;
        }

        const currentStack = [...stack];
        const currentNodeId = currentStack[currentStack.length - 1];

        // If this is the first time we see this node
        if (!visited.has(currentNodeId)) {
            setVisited(prev => new Set([...prev, currentNodeId]));
            setVisitedOrder(prev => [...prev, currentNodeId]);
            setActiveNode(currentNodeId);
            return;
        }

        // Look for unvisited neighbor
        const neighbors = adjList[currentNodeId] || [];
        const nextNeighbor = neighbors.find(n => !visited.has(n));

        if (nextNeighbor) {
            // Explore deeper
            setStack([...currentStack, nextNeighbor]);
            setActiveNode(nextNeighbor);
        } else {
            // Backtrack
            setBacktracked(prev => new Set([...prev, currentNodeId]));
            const newStack = [...currentStack];
            newStack.pop();
            setStack(newStack);

            if (newStack.length > 0) {
                setActiveNode(newStack[newStack.length - 1]);
            } else {
                setActiveNode(null);
                setIsRunning(false);
            }
        }
    };

    const getNodeColor = (nodeId) => {
        if (activeNode === nodeId) return '#FACC15'; // Yellow (Current)
        if (backtracked.has(nodeId)) return '#94a3b8'; // Gray (Backtracked - keep for maze clarity)
        if (visited.has(nodeId)) return '#22C55E'; // Green (Visited)
        return '#fff'; // White (Default)
    };

    const getStrokeColor = (nodeId) => {
        if (activeNode === nodeId) return '#FACC15';
        if (backtracked.has(nodeId)) return '#94a3b8';
        if (visited.has(nodeId)) return '#22C55E';
        return '#2563EB';
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: Depth-First Search (DFS)</h4>
            <div style={styles.algoGrid}>
                <div><strong>Time Complexity:</strong> O(V + E)</div>
                <div><strong>Space Complexity:</strong> O(V) (Stack)</div>
                <div><strong>Use Case:</strong> Pathfinding, Topological Sort, Solving Puzzles (Mazes)</div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Depth First Search — Maze Explorer</h2>
                <div style={styles.description}>
                    <p>Imagine exploring a maze.</p>
                    <p>Instead of checking all nearby paths first, the explorer chooses one path and goes as deep as possible.</p>
                    <p>If the path ends, the explorer goes back and tries another route. This strategy is called <strong>Depth First Search (DFS)</strong>.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <AlgorithmInfo />
                <div style={styles.controls}>
                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Start City:</label>
                        <select
                            value={startCity}
                            onChange={(e) => {
                                setStartCity(e.target.value);
                                resetExploration();
                            }}
                            style={styles.select}
                            disabled={isRunning || visitedOrder.length > 0}
                        >
                            {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                        </select>
                    </div>
                    <button onClick={startDFS} style={styles.controlBtn}>Start Exploration</button>
                    <button onClick={nextStep} style={{ ...styles.controlBtn, backgroundColor: '#10b981' }} disabled={!isRunning && visitedOrder.length === 0}>Next Step</button>
                    <button onClick={resetExploration} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Exploration</button>
                </div>

                <div style={styles.mainLayout}>
                    <div style={styles.canvasContainer}>
                        <div style={styles.canvas}>
                            <svg width="100%" height="100%" viewBox="0 0 700 400">
                                <defs>
                                    <marker
                                        id="arrowhead-dfs"
                                        markerWidth="10"
                                        markerHeight="7"
                                        refX="10"
                                        refY="3.5"
                                        orient="auto"
                                    >
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
                                    </marker>
                                </defs>
                                {edges.map((edge, i) => {
                                    const fromNode = nodes.find(n => n.id === edge.from);
                                    const toNode = nodes.find(n => n.id === edge.to);
                                    const nodeRadius = 24; // Standardized for 48px diameter
                                    const dx = toNode.x - fromNode.x;
                                    const dy = toNode.y - fromNode.y;
                                    const angle = Math.atan2(dy, dx);
                                    const x1 = fromNode.x + nodeRadius * Math.cos(angle);
                                    const y1 = fromNode.y + nodeRadius * Math.sin(angle);
                                    const x2 = toNode.x - nodeRadius * Math.cos(angle);
                                    const y2 = toNode.y - nodeRadius * Math.sin(angle);

                                    return (
                                        <line
                                            key={`edge-${i}`}
                                            x1={x1} y1={y1}
                                            x2={x1 + (x2 - x1) * 0.98}
                                            y2={y1 + (y2 - y1) * 0.98}
                                            stroke="#64748B"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            markerEnd="url(#arrowhead-dfs)"
                                        />
                                    );
                                })}
                                {nodes.map(node => (
                                    <g key={node.id}>
                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r="24"
                                            fill={getNodeColor(node.id)}
                                            stroke={getStrokeColor(node.id)}
                                            strokeWidth="2"
                                            animate={{
                                                fill: getNodeColor(node.id),
                                                stroke: getStrokeColor(node.id),
                                                scale: activeNode === node.id ? 1.1 : 1
                                            }}
                                        />
                                        <text x={node.x} y={node.y + 5} textAnchor="middle" style={{ ...styles.nodeId, fill: activeNode === node.id ? '#1e293b' : (backtracked.has(node.id) ? '#fff' : getStrokeColor(node.id)) }}>{node.id}</text>
                                        <text x={node.x} y={node.y + 40} textAnchor="middle" style={styles.nodeLabel}>{node.label}</text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div style={styles.stackArea}>
                        <span style={styles.statusLabel}>Stack (Current Path):</span>
                        <div style={styles.stackContainer}>
                            <AnimatePresence>
                                {[...stack].reverse().map((id, i) => (
                                    <motion.div
                                        key={`stack-${id}-${stack.length - 1 - i}`}
                                        initial={{ scale: 0, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, y: -20 }}
                                        style={{
                                            ...styles.stackItem,
                                            backgroundColor: activeNode === id ? '#fbbf24' : '#4f46e5'
                                        }}
                                    >
                                        {id}
                                        {i === 0 && <span style={styles.topLabel}>TOP</span>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {stack.length === 0 && <span style={styles.emptyText}>Empty Stack</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.traversalPanel}>
                    <span style={styles.statusLabel}>Traversal Order:</span>
                    <div style={styles.orderList}>
                        {visitedOrder.map((id, i) => (
                            <span key={i}>
                                {id}{i < visitedOrder.length - 1 ? ' → ' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>DFS Implementation (Recursive)</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b'
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <pre style={styles.codeBox}>
                        {activeLang === 'python' && (
                            <code dangerouslySetInnerHTML={{ __html: `def dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    \n    visited.add(node)\n    print(node, end=" ")\n\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n\n# The call stack acts as the implicit stack\ndfs(graph, 'A')` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `function dfs(graph, node, visited = new Set()) {\n    visited.add(node);\n    console.log(node);\n\n    graph[node].forEach(neighbor => {\n        if (!visited.has(neighbor)) {\n            dfs(graph, neighbor, visited);\n        }\n    });\n}\n\n// Each recursive call adds a frame to the stack\ndfs(graph, 'A');` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;iostream&gt;\n#include &lt;vector&gt;\n#include &lt;set&gt;\n\nvoid dfs(map&lt;char, vector&lt;char&gt;&gt;& adj, char node, set&lt;char&gt;& visited) {\n    visited.insert(node);\n    cout << node << " ";\n\n    for (char neighbor : adj[node]) {\n        if (visited.find(neighbor) == visited.end()) {\n            dfs(adj, neighbor, visited);\n        }\n    }\n}` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What strategy does DFS use?", a: "DFS uses a Depth-First strategy, exploring as far as possible along each branch before backtracking." },
                        { q: "What data structure is used in DFS?", a: "DFS uses a Stack. In recursion, the system's call stack is utilized automatically." },
                        { q: "What happens when DFS reaches a dead end?", a: "It backtracks to the most recent node that has unvisited neighbors and continues exploration from there." },
                        { q: "What is the time complexity of DFS?", a: "Similar to BFS, the time complexity is O(V + E) for a graph with V vertices and E edges." }
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
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'system-ui, sans-serif'
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em', marginBottom: '1rem' },
    description: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' },
    visualizerArea: {
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid #f1f5f9',
        marginBottom: '3rem'
    },
    controls: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    selectGroup: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    label: { fontWeight: '700', color: '#1e293b' },
    select: { padding: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: '600' },
    controlBtn: {
        padding: '0.7rem 1.4rem',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: '#fff',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    mainLayout: { display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' },
    canvasContainer: { flex: '1', minWidth: '300px' },
    canvas: {
        width: '100%',
        height: '400px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0'
    },
    stackArea: {
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '20px',
        border: '1px solid #e2e8f0'
    },
    stackContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: 'center',
        padding: '1rem 0',
        minHeight: '300px',
        justifyContent: 'flex-end',
        borderTop: '4px solid #4f46e5',
        borderRadius: '0 0 12px 12px'
    },
    stackItem: {
        width: '80%',
        color: '#fff',
        padding: '0.6rem',
        borderRadius: '8px',
        fontWeight: '700',
        textAlign: 'center',
        position: 'relative'
    },
    topLabel: {
        position: 'absolute',
        right: '-40px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '0.7rem',
        color: '#4f46e5',
        fontWeight: '900'
    },
    statusLabel: { fontWeight: '800', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' },
    emptyText: { color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' },
    nodeLabel: { fontSize: '12px', fontWeight: '700', fill: '#64748b' },
    nodeId: { fontSize: '14px', fontWeight: '900' },
    visitedOrder: {
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    orderList: { fontWeight: '700', color: '#22C55E', fontSize: '1.1rem' },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    codeSection: { marginBottom: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
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
    algoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#64748b' },
    traversalPanel: {
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1rem'
    }
};

export default DFSMazeExplorer;
