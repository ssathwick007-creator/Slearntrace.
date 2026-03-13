import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BFSDeliveryRoute = () => {
    // Fixed graph structure based on optimized layout
    const nodes = [
        { id: 'A', x: 350, y: 50, label: 'Warehouse City A' },
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
    const [queue, setQueue] = useState([]);
    const [visited, setVisited] = useState(new Set());
    const [activeNode, setActiveNode] = useState(null);
    const [visitedOrder, setVisitedOrder] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeLang, setActiveLang] = useState('python');

    const resetTraversal = useCallback(() => {
        setQueue([]);
        setVisited(new Set());
        setActiveNode(null);
        setVisitedOrder([]);
        setIsRunning(false);
    }, []);

    const startBFS = () => {
        resetTraversal();
        setQueue([startCity]);
        setIsRunning(true);
    };

    const nextStep = () => {
        if (queue.length === 0) {
            setIsRunning(false);
            setActiveNode(null);
            return;
        }

        const nextQueue = [...queue];
        const currentNodeId = nextQueue.shift();

        // If already visited, skip (though in this DAG it won't happen)
        if (visited.has(currentNodeId)) {
            setQueue(nextQueue);
            return;
        }

        setActiveNode(currentNodeId);
        setVisited(prev => new Set([...prev, currentNodeId]));
        setVisitedOrder(prev => [...prev, currentNodeId]);

        // Add neighbors to queue
        const neighbors = adjList[currentNodeId] || [];
        const unvisitedNeighbors = neighbors.filter(n => !visited.has(n) && !nextQueue.includes(n));

        setQueue([...nextQueue, ...unvisitedNeighbors]);
    };

    useEffect(() => {
        if (!isRunning) return;
        // Optional: Auto run if needed, but manual Next Step is often better for learning
    }, [isRunning]);

    const getNodeColor = (nodeId) => {
        if (activeNode === nodeId) return '#FACC15'; // Yellow (Current)
        if (visited.has(nodeId)) return '#22C55E'; // Green (Visited)
        return '#fff'; // White (Default)
    };

    const getStrokeColor = (nodeId) => {
        if (activeNode === nodeId) return '#FACC15';
        if (visited.has(nodeId)) return '#22C55E';
        return '#2563EB';
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: Breadth-First Search (BFS)</h4>
            <div style={styles.algoGrid}>
                <div><strong>Time Complexity:</strong> O(V + E)</div>
                <div><strong>Space Complexity:</strong> O(V)</div>
                <div><strong>Use Case:</strong> Shortest Path in Unweighted Graphs, Level Order Traversal</div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Breadth First Search — Delivery Route</h2>
                <div style={styles.description}>
                    <p>Imagine a delivery truck starting from a warehouse city.</p>
                    <p>The truck always delivers packages to the closest cities first before traveling farther away.</p>
                    <p>This strategy is called <strong>Breadth-First Search (BFS)</strong>. BFS explores a graph level by level using a <strong>queue</strong>.</p>
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
                                resetTraversal();
                            }}
                            style={styles.select}
                            disabled={isRunning || visitedOrder.length > 0}
                        >
                            {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                        </select>
                    </div>
                    <button onClick={startBFS} style={styles.controlBtn}>Start Delivery Route</button>
                    <button onClick={nextStep} style={{ ...styles.controlBtn, backgroundColor: '#10b981' }} disabled={!isRunning && visitedOrder.length === 0}>Next Step</button>
                    <button onClick={resetTraversal} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Route</button>
                </div>

                <div style={styles.queueDisplay}>
                    <span style={styles.statusLabel}>Queue:</span>
                    <div style={styles.queueContainer}>
                        <AnimatePresence>
                            {queue.map((id, i) => (
                                <motion.div
                                    key={`q-${id}-${i}`}
                                    initial={{ scale: 0, x: -20 }}
                                    animate={{ scale: 1, x: 0 }}
                                    exit={{ scale: 0, x: 20 }}
                                    style={styles.queueItem}
                                >
                                    {id}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {queue.length === 0 && <span style={styles.emptyText}>Empty</span>}
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

                <div style={styles.canvas}>
                    <svg width="100%" height="100%" viewBox="0 0 700 400">
                        <defs>
                            <marker
                                id="arrowhead-bfs"
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

                            return <line
                                key={`edge-${i}`}
                                x1={x1} y1={y1}
                                x2={x1 + (x2 - x1) * 0.98}
                                y2={y1 + (y2 - y1) * 0.98}
                                stroke="#64748B"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                markerEnd="url(#arrowhead-bfs)"
                            />
                                ;
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
                                <text x={node.x} y={node.y + 5} textAnchor="middle" style={{ ...styles.nodeId, fill: activeNode === node.id ? '#1e293b' : getStrokeColor(node.id) }}>{node.id}</text>
                                <text x={node.x} y={node.y + 40} textAnchor="middle" style={styles.nodeLabel}>{node.label}</text>
                            </g>
                        ))}
                    </svg>
                </div>

            </div >

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>BFS Implementation</h3>
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
                            <code dangerouslySetInnerHTML={{ __html: `from collections import deque\n\ndef bfs(graph, start_node):\n    visited = set()\n    queue = deque([start_node])\n    visited.add(start_node)\n\n    while queue:\n        node = queue.popleft()\n        print(node, end=" ")\n\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `function bfs(graph, startNode) {\n    const visited = new Set();\n    const queue = [startNode];\n    visited.add(startNode);\n\n    while (queue.length > 0) {\n        const node = queue.shift();\n        console.log(node);\n\n        graph[node].forEach(neighbor => {\n            if (!visited.has(neighbor)) {\n                visited.add(neighbor);\n                queue.push(neighbor);\n            }\n        });\n    }\n}` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;iostream&gt;\n#include &lt;vector&gt;\n#include &lt;queue&gt;\n#include &lt;set&gt;\n\nvoid bfs(map&lt;char, vector&lt;char&gt;&gt; adj, char start) {\n    set&lt;char&gt; visited;\n    queue&lt;char&gt; q;\n    q.push(start);\n    visited.insert(start);\n\n    while (!q.empty()) {\n        char node = q.front(); q.pop();\n        cout << node << " ";\n        for (char neighbor : adj[node]) {\n            if (visited.find(neighbor) == visited.end()) {\n                visited.insert(neighbor);\n                q.push(neighbor);\n            }\n        }\n    }\n}` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What data structure does BFS use?", a: "BFS uses a Queue (First-In-First-Out) to manage the nodes to be explored next." },
                        { q: "How does BFS explore nodes?", a: "BFS explores nodes level by level, visiting all neighbors of a node before moving to the neighbors' neighbors." },
                        { q: "What is the time complexity of BFS?", a: "The time complexity is O(V + E), where V is the number of vertices and E is the number of edges." },
                        { q: "Where is BFS used in real life?", a: "Finding the shortest path in unweighted graphs (GPS), social networking (friends of friends), and web crawling." }
                    ].map((item, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {item.q}</p>
                            <p style={styles.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
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
        marginBottom: '3rem',
        position: 'relative'
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
    queueDisplay: {
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    queueContainer: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
    queueItem: {
        backgroundColor: '#4f46e5',
        color: '#fff',
        padding: '0.4rem 0.8rem',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '0.9rem'
    },
    statusLabel: { fontWeight: '800', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' },
    emptyText: { color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' },
    canvas: {
        width: '100%',
        height: '400px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        marginBottom: '1rem'
    },
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

export default BFSDeliveryRoute;
