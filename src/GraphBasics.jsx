import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GraphBasics = () => {
    const [nodes, setNodes] = useState([
        { id: 'A', x: 350, y: 50, label: 'City A' },
        { id: 'B', x: 250, y: 150, label: 'City B' },
        { id: 'C', x: 450, y: 150, label: 'City C' },
        { id: 'D', x: 350, y: 250, label: 'City D' },
        { id: 'E', x: 450, y: 350, label: 'City E' },
    ]);

    const [edges, setEdges] = useState([
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'E' },
    ]);

    const [graphType, setGraphType] = useState('undirected'); // 'undirected' or 'directed'
    const [activeLang, setActiveLang] = useState('python');
    const [selectingFirst, setSelectingFirst] = useState(null);
    const [message, setMessage] = useState("");

    const containerRef = useRef(null);

    const resetNetwork = () => {
        setNodes([
            { id: 'A', x: 350, y: 50, label: 'City A' },
            { id: 'B', x: 250, y: 150, label: 'City B' },
            { id: 'C', x: 450, y: 150, label: 'City C' },
            { id: 'D', x: 350, y: 250, label: 'City D' },
            { id: 'E', x: 450, y: 350, label: 'City E' },
        ]);
        setEdges([
            { from: 'A', to: 'B' },
            { from: 'A', to: 'C' },
            { from: 'B', to: 'D' },
            { from: 'C', to: 'E' },
        ]);
        setSelectingFirst(null);
        setMessage("Network reset to original example.");
        setTimeout(() => setMessage(""), 3000);
    };

    const addCity = () => {
        const id = String.fromCharCode(65 + nodes.length);
        const newNode = {
            id,
            x: Math.random() * 600 + 50,
            y: Math.random() * 300 + 50,
            label: `City ${id}`
        };
        setNodes([...nodes, newNode]);
        setMessage(`Added ${newNode.label}`);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleNodeClick = (nodeId) => {
        if (selectingFirst === null) {
            setSelectingFirst(nodeId);
            setMessage("Select another city to connect with a road.");
        } else {
            if (selectingFirst === nodeId) {
                setSelectingFirst(null);
                setMessage("");
                return;
            }

            // Check if edge already exists
            const exists = edges.some(e =>
                (e.from === selectingFirst && e.to === nodeId) ||
                (graphType === 'undirected' && e.from === nodeId && e.to === selectingFirst)
            );

            if (exists) {
                setMessage("Road already exists!");
            } else {
                setEdges([...edges, { from: selectingFirst, to: nodeId }]);
                setMessage(`Connected ${selectingFirst} and ${nodeId}`);
            }
            setSelectingFirst(null);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const renderEdge = (edge, index) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);

        if (!fromNode || !toNode) return null;

        const isDirected = graphType === 'directed';
        const nodeRadius = 24; // Standardized for 48px diameter

        // Calculate angle between nodes
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const angle = Math.atan2(dy, dx);

        // Adjust endpoints to avoid overlap and align arrows at node boundaries
        const x1 = fromNode.x + nodeRadius * Math.cos(angle);
        const y1 = fromNode.y + nodeRadius * Math.sin(angle);
        const x2 = toNode.x - nodeRadius * Math.cos(angle);
        const y2 = toNode.y - nodeRadius * Math.sin(angle);

        return (
            <motion.line
                key={`edge-${index}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                x1={x1}
                y1={y1}
                x2={x1 + (x2 - x1) * 0.98} // Slightly shorten to ensure arrow visibility at boundary
                y2={y1 + (y2 - y1) * 0.98}
                stroke="#64748B"
                strokeWidth="2.5"
                strokeLinecap="round"
                markerEnd={isDirected ? "url(#arrowhead)" : ""}
            />
        );
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: Graph Representation</h4>
            <div style={styles.algoGrid}>
                <div><strong>Space Complexity:</strong> O(V + E) (Adj List)</div>
                <div><strong>Use Case:</strong> Social Networks, Maps, Web Crawling</div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Graph Basics — City Road Network</h2>
                <div style={styles.description}>
                    <p>Imagine a map of cities connected by roads.</p>
                    <ul style={styles.list}>
                        <li>Each city is a <strong>node (vertex)</strong>.</li>
                        <li>Each road connecting two cities is an <strong>edge</strong>.</li>
                    </ul>
                    <p>Graphs help represent networks such as transportation systems, social connections, and the internet.</p>
                </div>
            </div>

            <div style={styles.typeToggles}>
                <button
                    onClick={() => setGraphType('undirected')}
                    style={{
                        ...styles.toggleBtn,
                        backgroundColor: graphType === 'undirected' ? '#4f46e5' : '#f1f5f9',
                        color: graphType === 'undirected' ? '#fff' : '#64748b'
                    }}
                >
                    Undirected Graph
                </button>
                <button
                    onClick={() => setGraphType('directed')}
                    style={{
                        ...styles.toggleBtn,
                        backgroundColor: graphType === 'directed' ? '#4f46e5' : '#f1f5f9',
                        color: graphType === 'directed' ? '#fff' : '#64748b'
                    }}
                >
                    Directed Graph
                </button>
            </div>

            <div style={styles.visualizerArea}>
                <div style={styles.infoPanel}>
                    <div style={styles.infoItem}>Vertices (Cities): <strong>{nodes.length}</strong></div>
                    <div style={styles.infoItem}>Edges (Roads): <strong>{edges.length}</strong></div>
                </div>

                <AlgorithmInfo />

                <div style={styles.controls}>
                    <button onClick={addCity} style={styles.controlBtn}>Add City</button>
                    <button
                        onClick={() => {
                            setSelectingFirst(null);
                            setMessage("Click a city to start adding a road.");
                        }}
                        style={{
                            ...styles.controlBtn,
                            backgroundColor: selectingFirst !== null ? '#10b981' : '#4f46e5'
                        }}
                    >
                        {selectingFirst !== null ? "Selecting..." : "Add Road"}
                    </button>
                    <button onClick={resetNetwork} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Network</button>
                </div>

                <div ref={containerRef} style={styles.canvas}>
                    <svg width="100%" height="100%" viewBox="0 0 700 400">
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="7"
                                refX="10"
                                refY="3.5"
                                orient="auto"
                            >
                                <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
                            </marker>
                        </defs>
                        {edges.map((edge, i) => renderEdge(edge, i))}
                        {nodes.map(node => (
                            <motion.g
                                key={node.id}
                                onClick={() => handleNodeClick(node.id)}
                                cursor="pointer"
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="24"
                                    fill={selectingFirst === node.id ? '#FACC15' : '#fff'}
                                    stroke={selectingFirst === node.id ? '#FACC15' : '#2563EB'}
                                    strokeWidth="2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                                <text
                                    x={node.x}
                                    y={node.y + 40}
                                    textAnchor="middle"
                                    style={styles.nodeLabel}
                                >
                                    {node.label}
                                </text>
                                <text
                                    x={node.x}
                                    y={node.y + 5}
                                    textAnchor="middle"
                                    style={{
                                        ...styles.nodeId,
                                        fill: selectingFirst === node.id ? '#fff' : '#2563EB'
                                    }}
                                >
                                    {node.id}
                                </text>
                            </motion.g>
                        ))}
                    </svg>
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                style={styles.message}
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Adjacency List Representation</h3>
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
                    <pre style={styles.codeBox}>
                        {activeLang === 'python' && (
                            <code dangerouslySetInnerHTML={{ __html: `# Using a dictionary for Adjacency List\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D'],\n    'C': ['A', 'E'],\n    'D': ['B'],\n    'E': ['C']\n}\n\n# Adding a vertex\ndef add_node(v):\n    if v not in graph:\n        graph[v] = []\n\n# Adding an edge\ndef add_edge(v1, v2):\n    graph[v1].append(v2)\n    graph[v2].append(v1) # For undirected` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `// Using a Map for Adjacency List\nconst graph = new Map();\n\nconst nodes = ['A', 'B', 'C', 'D', 'E'];\n\nnodes.forEach(node => graph.set(node, []));\n\n// Adding edges\nfunction addEdge(v, w) {\n    graph.get(v).push(w);\n    graph.get(w).push(v); // For undirected\n}\n\naddEdge('A', 'B');\naddEdge('A', 'C');` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;iostream&gt;\n#include &lt;vector&gt;\n#include &lt;map&gt;\n\nusing namespace std;\n\nclass Graph {\n    map&lt;char, vector&lt;char&gt;&gt; adjList;\npublic:\n    void addEdge(char v, char w) {\n        adjList[v].push_back(w);\n        adjList[w].push_back(v); // For undirected\n    }\n};` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What does a node represent in a graph?", a: "A node (or vertex) represents an entity or point in a network, like a city, person, or computer." },
                        { q: "What is an edge in graph terminology?", a: "An edge is the connection or link between two nodes, representing a relationship like a road or friendship." },
                        { q: "What is the difference between directed and undirected graphs?", a: "In directed graphs, edges have a direction (one-way). In undirected graphs, edges are bidirectional." },
                        { q: "Where are graphs used in real life?", a: "Social networks (Facebook), GPS navigation (Google Maps), the Internet, and airline routes." }
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
    list: { listStyle: 'none', padding: 0, margin: '1rem 0' },
    typeToggles: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' },
    toggleBtn: {
        padding: '0.6rem 1.2rem',
        borderRadius: '12px',
        border: 'none',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    visualizerArea: {
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid #f1f5f9',
        position: 'relative',
        marginBottom: '3rem'
    },
    infoPanel: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        zIndex: 5
    },
    infoItem: { fontSize: '0.9rem', color: '#64748b', marginBottom: '0.2rem' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
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
    canvas: {
        width: '100%',
        height: '400px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        position: 'relative'
    },
    nodeLabel: { fontSize: '12px', fontWeight: '700', fill: '#64748b' },
    nodeId: { fontSize: '14px', fontWeight: '900' },
    message: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '0.6rem 1.2rem',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
    },
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
    algoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#64748b' }
};

export default GraphBasics;
