import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GPSNavigator = () => {
    // Fixed weighted graph structure
    const nodes = [
        { id: 'A', x: 350, y: 50, label: 'Origin A' },
        { id: 'B', x: 250, y: 150, label: 'City B' },
        { id: 'C', x: 450, y: 150, label: 'City C' },
        { id: 'D', x: 350, y: 250, label: 'City D' },
        { id: 'E', x: 450, y: 350, label: 'Destination E' },
    ];

    const edges = [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'A', to: 'C', weight: 2 },
        { from: 'B', to: 'D', weight: 5 },
        { from: 'C', to: 'D', weight: 8 },
        { from: 'C', to: 'E', weight: 10 },
        { from: 'D', to: 'E', weight: 2 },
    ];

    const [startCity, setStartCity] = useState('A');
    const [destCity, setDestCity] = useState('E');

    const [distances, setDistances] = useState({
        'A': Infinity, 'B': Infinity, 'C': Infinity, 'D': Infinity, 'E': Infinity
    });
    const [visited, setVisited] = useState(new Set());
    const [activeNode, setActiveNode] = useState(null);
    const [previous, setPrevious] = useState({});
    const [shortestPathNodes, setShortestPathNodes] = useState(new Set());
    const [shortestPathEdges, setShortestPathEdges] = useState(new Set());
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [activeLang, setActiveLang] = useState('python');

    const resetRoute = useCallback(() => {
        setDistances({
            'A': Infinity, 'B': Infinity, 'C': Infinity, 'D': Infinity, 'E': Infinity
        });
        setVisited(new Set());
        setActiveNode(null);
        setPrevious({});
        setShortestPathNodes(new Set());
        setShortestPathEdges(new Set());
        setIsRunning(false);
        setIsFinished(false);
    }, []);

    const startDijkstra = () => {
        resetRoute();
        const initialDistances = {
            'A': Infinity, 'B': Infinity, 'C': Infinity, 'D': Infinity, 'E': Infinity
        };
        initialDistances[startCity] = 0;
        setDistances(initialDistances);
        setIsRunning(true);
    };

    const nextStep = () => {
        if (isFinished) return;

        // Find the unvisited node with the smallest distance
        let minDistance = Infinity;
        let u = null;

        Object.keys(distances).forEach(nodeId => {
            if (!visited.has(nodeId) && distances[nodeId] < minDistance) {
                minDistance = distances[nodeId];
                u = nodeId;
            }
        });

        if (u === null || visited.size === nodes.length) {
            finishAlgorithm();
            return;
        }

        setActiveNode(u);
        const nextVisited = new Set([...visited, u]);

        // Relax edges
        const nextDistances = { ...distances };
        const nextPrevious = { ...previous };

        edges.forEach(edge => {
            if (edge.from === u) {
                const v = edge.to;
                if (!nextVisited.has(v)) {
                    const alt = nextDistances[u] + edge.weight;
                    if (alt < nextDistances[v]) {
                        nextDistances[v] = alt;
                        nextPrevious[v] = u;
                    }
                }
            }
        });

        setDistances(nextDistances);
        setPrevious(nextPrevious);
        setVisited(nextVisited);

        if (u === destCity) {
            finishAlgorithm(nextPrevious);
        }
    };

    const finishAlgorithm = (finalPrevious = previous) => {
        setIsRunning(false);
        setIsFinished(true);
        setActiveNode(null);

        // Reconstruct path
        const path = [];
        let curr = destCity;
        if (finalPrevious[curr] || curr === startCity) {
            while (curr !== undefined) {
                path.push(curr);
                curr = finalPrevious[curr];
            }
        }

        const pathSet = new Set(path);
        setShortestPathNodes(pathSet);

        const edgeSet = new Set();
        for (let i = 0; i < path.length - 1; i++) {
            edgeSet.add(`${path[i + 1]}-${path[i]}`);
        }
        setShortestPathEdges(edgeSet);
    };

    const getNodeColor = (nodeId) => {
        if (shortestPathNodes.has(nodeId)) return '#2563EB'; // Blue (Path)
        if (activeNode === nodeId) return '#FACC15'; // Yellow (Active)
        if (visited.has(nodeId)) return '#22C55E'; // Green (Visited)
        return '#fff';
    };

    const getStrokeColor = (nodeId) => {
        if (shortestPathNodes.has(nodeId)) return '#2563EB';
        if (activeNode === nodeId) return '#FACC15';
        if (visited.has(nodeId)) return '#22C55E';
        return '#2563EB';
    };

    const getEdgeColor = (from, to) => {
        if (shortestPathEdges.has(`${from}-${to}`)) return '#2563EB';
        return '#cbd5e1';
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: Dijkstra's Algorithm</h4>
            <div style={styles.algoGrid}>
                <div><strong>Time Complexity:</strong> O((V + E) log V)</div>
                <div><strong>Space Complexity:</strong> O(V)</div>
                <div><strong>Use Case:</strong> GPS Navigation, Network Routing (OSPF)</div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Shortest Path — GPS Navigator</h2>
                <div style={styles.description}>
                    <p>Imagine using a GPS to travel between cities. Each road has a distance.</p>
                    <p><strong>Dijkstra’s Algorithm</strong> calculates the shortest route from your start to all other cities.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <AlgorithmInfo />
                <div style={styles.controls}>
                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Start:</label>
                        <select
                            value={startCity}
                            onChange={(e) => { setStartCity(e.target.value); resetRoute(); }}
                            style={styles.select}
                            disabled={isRunning || isFinished}
                        >
                            {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                        </select>
                    </div>
                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Destination:</label>
                        <select
                            value={destCity}
                            onChange={(e) => { setDestCity(e.target.value); resetRoute(); }}
                            style={styles.select}
                            disabled={isRunning || isFinished}
                        >
                            {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                        </select>
                    </div>
                    <button onClick={startDijkstra} style={styles.controlBtn}>Find Shortest Route</button>
                    <button onClick={nextStep} style={{ ...styles.controlBtn, backgroundColor: '#10b981' }} disabled={!isRunning}>Next Step</button>
                    <button onClick={resetRoute} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Route</button>
                </div>

                <div style={styles.mainLayout}>
                    <div style={styles.canvasContainer}>
                        <div style={styles.canvas}>
                            <svg width="100%" height="100%" viewBox="0 0 700 400">
                                <defs>
                                    <marker id="arrowhead-gps" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
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

                                    const midX = (x1 + x2) / 2;
                                    const midY = (y1 + y2) / 2;

                                    return (
                                        <g key={`edge-${i}`}>
                                            <line
                                                x1={x1} y1={y1}
                                                x2={x1 + (x2 - x1) * 0.98}
                                                y2={y1 + (y2 - y1) * 0.98}
                                                stroke={getEdgeColor(edge.from, edge.to)}
                                                strokeWidth={shortestPathEdges.has(`${edge.from}-${edge.to}`) ? "4" : "2.5"}
                                                markerEnd="url(#arrowhead-gps)"
                                            />
                                            <rect x={midX - 10} y={midY - 10} width="20" height="20" fill="white" rx="4" />
                                            <text x={midX} y={midY + 5} textAnchor="middle" style={styles.edgeWeight}>{edge.weight}</text>
                                        </g>
                                    );
                                })}
                                {nodes.map(node => (
                                    <g key={node.id}>
                                        <motion.circle
                                            cx={node.x} cy={node.y} r="24"
                                            fill={getNodeColor(node.id)}
                                            stroke={getStrokeColor(node.id)}
                                            strokeWidth="2"
                                            animate={{ scale: activeNode === node.id ? 1.1 : 1 }}
                                        />
                                        <text x={node.x} y={node.y + 5} textAnchor="middle" style={{ ...styles.nodeId, fill: (shortestPathNodes.has(node.id) || visited.has(node.id)) && activeNode !== node.id ? '#fff' : '#2563EB' }}>{node.id}</text>
                                        <text x={node.x} y={node.y + 40} textAnchor="middle" style={styles.nodeLabel}>{node.label}</text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div style={styles.tableArea}>
                        <h4 style={styles.tableTitle}>Distance Table</h4>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>City</th>
                                    <th style={styles.th}>Distance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nodes.map(node => (
                                    <tr key={node.id} style={{
                                        backgroundColor: activeNode === node.id ? '#fef3c7' : visited.has(node.id) ? '#f0fdf4' : 'transparent'
                                    }}>
                                        <td style={styles.td}>{node.id}</td>
                                        <td style={styles.td}>{distances[node.id] === Infinity ? '∞' : distances[node.id]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Dijkstra’s Implementation</h3>
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
                            <code dangerouslySetInnerHTML={{ __html: `import heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n\n    while pq:\n        curr_dist, curr_node = heapq.heappop(pq)\n\n        if curr_dist > distances[curr_node]:\n            continue\n\n        for neighbor, weight in graph[curr_node].items():\n            distance = curr_dist + weight\n\n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(pq, (distance, neighbor))` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `function dijkstra(graph, start) {\n    let distances = {};\n    let visited = new Set();\n    let pq = new PriorityQueue();\n\n    for (let node in graph) {\n        distances[node] = Infinity;\n    }\n    distances[start] = 0;\n    pq.enqueue(start, 0);\n\n    while (!pq.isEmpty()) {\n        let { node: currNode } = pq.dequeue();\n        visited.add(currNode);\n\n        for (let neighbor in graph[currNode]) {\n            let newDist = distances[currNode] + graph[currNode][neighbor];\n            if (newDist < distances[neighbor]) {\n                distances[neighbor] = newDist;\n                pq.enqueue(neighbor, newDist);\n            }\n        }\n    }\n}` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;queue&gt;\n#include &lt;vector&gt;\n\nvoid dijkstra(int n, int start) {\n    vector&lt;int&gt; dist(n, INF);\n    priority_queue&lt;pair&lt;int, int&gt;, vector&lt;pair&lt;int, int&gt;&gt;, greater&lt;pair&lt;int, int&gt;&gt;&gt; pq;\n\n    dist[start] = 0;\n    pq.push({0, start});\n\n    while (!pq.empty()) {\n        int d = pq.top().first;\n        int u = pq.top().second; pq.pop();\n\n        if (d > dist[u]) continue;\n\n        for (auto& edge : adj[u]) {\n            if (dist[u] + edge.w < dist[edge.v]) {\n                dist[edge.v] = dist[u] + edge.w;\n                pq.push({dist[edge.v], edge.v});\n            }\n        }\n    }\n}` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What type of graph does Dijkstra work on?", a: "Dijkstra works on weighted graphs with non-negative edge weights." },
                        { q: "What does the algorithm compute?", a: "It computes the shortest distance from a source node to all other nodes in the graph." },
                        { q: "What data structure is commonly used in Dijkstra?", a: "A Priority Queue (or Min-Heap) is used to efficiently find the node with the minimum distance." },
                        { q: "Why are edge weights important?", a: "Weights represent the cost (distance, time, etc.) of traveling between nodes, allowing the algorithm to find the mathematically optimal path." }
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
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em', marginBottom: '1rem' },
    description: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' },
    visualizerArea: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '1.5rem', border: '1px solid #f1f5f9', marginBottom: '3rem' },
    controls: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    selectGroup: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    label: { fontWeight: '700', color: '#1e293b' },
    select: { padding: '0.4rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: '600' },
    controlBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', backgroundColor: '#4f46e5', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    mainLayout: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap' },
    canvasContainer: { flex: '1', minWidth: '400px' },
    canvas: { width: '100%', height: '400px', backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' },
    tableArea: { width: '250px', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' },
    tableTitle: { fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem', textAlign: 'center', textTransform: 'uppercase' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem' },
    td: { padding: '0.6rem 0.5rem', borderBottom: '1px solid #f1f5f9', fontWeight: '600', color: '#1e293b' },
    edgeWeight: { fontSize: '12px', fontWeight: '800', fill: '#4f46e5' },
    nodeLabel: { fontSize: '12px', fontWeight: '700', fill: '#64748b' },
    nodeId: { fontSize: '14px', fontWeight: '900' },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    codeSection: { marginBottom: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '20px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' },
    quizSection: { marginTop: '3rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: { backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9' },
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

export default GPSNavigator;
